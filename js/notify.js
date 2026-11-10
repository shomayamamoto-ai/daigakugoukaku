/*
 * 通知(連続記録が切れそうなときのリマインド)
 * ------------------------------------------------------------
 * ・アプリを開いている間:1分ごとにチェックし、
 *   設定時刻を過ぎても今日の学習がまだなら通知します。
 *   さらに夜22時以降は「記録が切れそう」通知を出します。
 * ・ホーム画面に追加(インストール)した場合:
 *   対応ブラウザ(Android版Chromeなど)では、
 *   アプリを閉じていてもバックグラウンドでチェックします(Periodic Background Sync)。
 * ・どの端末でも確実に届けたい人向けに、
 *   毎日のリマインドをカレンダー(.ics)に登録する機能もあります。
 */
window.WPS = window.WPS || {};

WPS.Notify = (function () {
  var LAST_CALL_HOUR = 22; // この時刻を過ぎたら「記録が切れそう」通知

  function supported() { return 'Notification' in window; }
  function permission() { return supported() ? Notification.permission : 'unsupported'; }

  function registration() {
    if (!('serviceWorker' in navigator)) return Promise.resolve(null);
    return navigator.serviceWorker.getRegistration().then(function (r) { return r || null; }).catch(function () { return null; });
  }

  function show(title, body, tag) {
    if (permission() !== 'granted') return Promise.resolve(false);
    var opt = { body: body, tag: tag || 'wps', icon: 'icons/icon.svg', badge: 'icons/icon.svg', renotify: true };
    return registration().then(function (reg) {
      if (reg && reg.showNotification) return reg.showNotification(title, opt).then(function () { return true; });
      try { new Notification(title, opt); return true; } catch (e) { return false; }
    });
  }

  function request() {
    if (!supported()) return Promise.resolve('unsupported');
    return Notification.requestPermission().then(function (p) {
      if (p === 'granted') {
        registerPeriodic();
        syncToSW();
      }
      return p;
    });
  }

  function registerPeriodic() {
    registration().then(function (reg) {
      if (!reg || !('periodicSync' in reg)) return;
      reg.periodicSync.register('wps-streak', { minInterval: 60 * 60 * 1000 }).catch(function () { /* 未対応・未インストールなら何もしない */ });
    });
  }

  function minutesOf(hhmm) {
    var p = (hhmm || '20:00').split(':');
    return (+p[0]) * 60 + (+p[1] || 0);
  }

  // 通知の文面(ピンポの口調)
  function messages() {
    var n = WPS.Streak.count();
    var h = Math.ceil(WPS.Streak.hoursLeft());
    var soft = WPS.Mind && WPS.Mind.notifyLine ? WPS.Mind.notifyLine() : null; // 休みが続いている・つらそうなときは、やさしい言い方にする
    return {
      remind: soft || {
        title: 'ピンポより 🦉',
        body: n > 0
          ? n + '日連続の記録、今日もいっしょにつなごう！ カード5枚だけでも大丈夫だよ。'
          : '今日の5分、いっしょにやってみない？ 小さな一歩が、合格への近道だよ。'
      },
      last: {
        title: n > 0 ? '🔥 あと' + h + '時間で記録が切れちゃう…！' : '🦉 今日の分、まだ間に合うよ',
        body: n > 0
          ? n + '日間がんばってきた記録、ここで止めるのはもったいないよ。1分だけ、単語帳を開いてみよう！'
          : '寝る前に単語帳を3枚だけ。明日のきみが、きっと楽になるよ。'
      }
    };
  }

  // 1分ごとに呼ばれる
  function tick() {
    var s = WPS.Store.get();
    if (!s.profile.notify || permission() !== 'granted') return;
    if (WPS.Streak.studiedToday()) return;
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = WPS.date.today();
    var flags = s.notified[today] || (s.notified[today] = {});
    var msg = messages();
    if (mins >= LAST_CALL_HOUR * 60 && !flags.last) {
      flags.last = true; flags.remind = true;
      WPS.Store.save();
      show(msg.last.title, msg.last.body, 'wps-last');
    } else if (mins >= minutesOf(s.profile.reminder) && !flags.remind) {
      flags.remind = true;
      WPS.Store.save();
      show(msg.remind.title, msg.remind.body, 'wps-remind');
    }
  }

  // Service Worker(バックグラウンド)が読めるよう、最小限の状態を IndexedDB に保存
  function syncToSW() {
    if (!('indexedDB' in window)) return;
    try {
      var s = WPS.Store.get();
      var studied = WPS.Streak.studiedDays();
      var last = Object.keys(studied).filter(function (d) { return studied[d] === 'study'; }).sort().pop() || '';
      var req = indexedDB.open('wps', 1);
      req.onupgradeneeded = function () { req.result.createObjectStore('kv'); };
      req.onsuccess = function () {
        var db = req.result;
        var tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put({
          notify: !!s.profile.notify,
          reminder: s.profile.reminder,
          lastCallHour: LAST_CALL_HOUR,
          lastStudy: last,
          streak: WPS.Streak.count(),
          name: s.profile.name
        }, 'status');
        tx.oncomplete = function () { db.close(); };
      };
    } catch (e) { /* 失敗しても通常機能には影響しない */ }
  }

  // Googleカレンダーの予定作成ページを、時刻と「毎日くり返し」を入れた状態で開くURL
  function gcal() {
    var s = WPS.Store.get(), p = (s.profile.reminder || '20:00').split(':');
    var st = new Date(); st.setHours(+p[0], +p[1] || 0, 0, 0);
    var en = new Date(st.getTime() + 15 * 60000);
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function fmt(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; }
    var app = location.href.split('#')[0].split('?')[0];
    var q = { action: 'TEMPLATE', text: 'Aqualium 今日の勉強', dates: fmt(st) + '/' + fmt(en), details: '連続記録をつなごう! 単語帳5枚だけでもOK。\nアプリを開く: ' + app, recur: 'RRULE:FREQ=DAILY', ctz: 'Asia/Tokyo' };
    return 'https://calendar.google.com/calendar/render?' + Object.keys(q).map(function (k) { return k + '=' + encodeURIComponent(q[k]); }).join('&');
  }
  // カレンダー用の毎日リマインド(.ics)
  function ics() {
    var s = WPS.Store.get();
    var p = (s.profile.reminder || '20:00').split(':');
    var start = new Date();
    start.setHours(+p[0], +p[1] || 0, 0, 0);
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function fmt(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; }
    var end = new Date(start.getTime() + 15 * 60000);
    var now = new Date();
    var stamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + 'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + '00Z';
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Aqualium//JP', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:wps-daily-' + Date.now() + '@aqualium',
      'DTSTAMP:' + stamp,
      'DTSTART:' + fmt(start),
      'DTEND:' + fmt(end),
      'RRULE:FREQ=DAILY',
      'SUMMARY:🦉 Aqualium 今日の勉強',
      'DESCRIPTION:連続記録をつなごう！ 単語帳5枚だけでもOK。',
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:今日の勉強の時間だよ', 'TRIGGER:PT0M', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
  }

  function start() {
    syncToSW();
    tick();
    setInterval(tick, 60 * 1000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) tick(); });
    if (permission() === 'granted') registerPeriodic();
  }

  return { supported: supported, permission: permission, request: request, show: show, tick: tick, syncToSW: syncToSW, ics: ics, gcal: gcal, start: start, messages: messages };
})();
