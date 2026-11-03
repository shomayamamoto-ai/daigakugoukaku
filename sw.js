/*
 * Service Worker
 *  ・オフラインでも使えるように、アプリのファイルをキャッシュします。
 *  ・対応ブラウザでは、アプリを閉じていても1時間ごとに連続記録をチェックし、
 *    学習がまだなら通知します(Periodic Background Sync)。
 */
var CACHE = 'wps-v127';
var FILES = [
  './', './index.html', './manual.html', './home.html', './css/style.css', './css/home.css', './js/home.js',
  './js/data/units.js', './js/data/units_extra.js', './js/data/units_more.js', './js/data/units_math.js', './js/data/units_extra2.js', './js/data/units_extra3.js', './js/data/units_adv.js', './js/data/units_hard.js', './js/data/banks_lang.js', './js/data/banks_sci_soc.js', './js/data/banks_more.js', './js/data/vocab_jh.js', './js/data/vocab_idiom.js', './js/data/vocab_idiom2.js', './js/data/vocab_sci.js', './js/data/vocab_merge.js', './js/data/vocab_kobun.js', './js/data/vocab_books.js', './js/data/emoji.js', './js/data/history_ctx.js',
  './js/data/generators.js', './js/data/generators_more.js', './js/data/generators_math.js', './js/data/generators_extra2.js', './js/data/generators_extra3.js', './js/data/generators_adv.js', './js/data/generators_hard.js', './js/data/build.js', './js/data/schools.js', './js/data/exam_info.js', './js/data/methods.js', './js/data/curriculum.js',
  './js/data/univ_2027.js', './js/data/univ_2027_region.js', './js/data/univ_2027_private.js', './js/data/univ_2027_summary.js',
  './js/engine.js', './js/figures.js', './js/notify.js', './js/sync.js', './js/owl3d.js', './js/data/ronjutsu.js', './js/ronjutsu.js', './js/data/whq.js', './js/data/jhq.js', './js/whq.js', './js/data/lessons_1.js', './js/data/lessons_2.js', './js/data/lessons_6.js', './js/data/lessons_10.js', './js/data/lessons_3.js', './js/data/lessons_7.js', './js/data/lessons_5.js', './js/data/lessons_8.js', './js/data/lessons_4.js', './js/data/lessons_9.js', './js/data/lessons_zukai.js', './js/books.js', './js/data/units_new_hsogo.js', './js/data/lessons_new_hsogo.js', './js/data/units_new_geo.js', './js/data/lessons_new_geo.js', './js/data/units_new_rinri.js', './js/data/lessons_new_rinri.js', './js/data/units_new_phys.js', './js/data/lessons_new_phys.js', './js/data/units_new_chem.js', './js/data/lessons_new_chem.js', './js/data/units_new_bio.js', './js/data/lessons_new_bio.js', './js/data/units_new_earth.js', './js/data/lessons_new_earth.js', './js/data/units_new_kyotsu.js', './js/data/lessons_new_kyotsu.js', './js/data/units_new_englis.js', './js/data/lessons_new_englis.js', './js/data/units_new_life.js', './js/data/lessons_new_life.js', './js/data/units_new_jhlang.js', './js/data/lessons_new_jhlang.js', './js/data/units_new_jhmss.js', './js/data/lessons_new_jhmss.js', './js/data/prereq_why.js', './js/data/notes_core.js', './js/data/wordnote_en_h2.js', './js/data/wordnote_scisoc.js', './js/data/wordnote_jp.js', './js/data/wordnote_ko.js', './js/data/units_new_jhist.js', './js/data/lessons_new_jhist.js', './js/data/units_new_whista.js', './js/data/lessons_new_whista.js', './js/data/units_new_whistb.js', './js/data/lessons_new_whistb.js', './js/data/units_new_civics.js', './js/data/lessons_new_civics.js', './js/data/units_new_geob.js', './js/data/lessons_new_geob.js', './js/data/curriculum_new.js', './js/mock.js', './js/quest.js', './js/data/conversation.js', './js/vocab.js', './js/vendor/three.min.js', './js/tools.js', './js/data/elements.js', './js/data/worldmap.js', './js/auth.js', './js/app.js',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './manifest.webmanifest'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// ネットワーク優先(最新版を使い、つながらないときはキャッシュ)
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () { return caches.match(e.request, { ignoreSearch: true }); })
  );
});

function ymd(d) {
  var m = d.getMonth() + 1, day = d.getDate();
  return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
}

function idb(mode, fn) {
  return new Promise(function (resolve) {
    var req = indexedDB.open('wps', 1);
    req.onupgradeneeded = function () { req.result.createObjectStore('kv'); };
    req.onsuccess = function () {
      var db = req.result;
      var tx = db.transaction('kv', mode);
      var out = fn(tx.objectStore('kv'));
      tx.oncomplete = function () { db.close(); resolve(out && out.result); };
      tx.onerror = function () { resolve(null); };
    };
    req.onerror = function () { resolve(null); };
  });
}

function checkStreak() {
  return idb('readonly', function (st) { return st.get('status'); }).then(function (s) {
    if (!s || !s.notify) return;
    var now = new Date();
    var today = ymd(now);
    if (s.lastStudy === today) return;
    var p = (s.reminder || '20:00').split(':');
    var mins = now.getHours() * 60 + now.getMinutes();
    if (mins < (+p[0]) * 60 + (+p[1] || 0)) return;
    var kind = now.getHours() >= (s.lastCallHour || 22) ? 'last' : 'remind';
    return idb('readonly', function (st) { return st.get('bg-notified'); }).then(function (flag) {
      if (flag === today + ':' + kind || flag === today + ':last') return;
      var y = new Date(now); y.setDate(y.getDate() - 1);
      var alive = s.lastStudy === ymd(y) && s.streak > 0;
      var hours = 24 - now.getHours();
      var title = kind === 'last' && alive ? '🔥 あと' + hours + '時間で記録が切れちゃう…！' : 'ピンポより 🦉';
      var body = alive
        ? s.streak + '日連続の記録、今日もつなごう！ 単語帳を1分開くだけでOKだよ。'
        : '今日の5分、いっしょにやってみない？ 小さな一歩が合格への近道だよ。';
      return self.registration.showNotification(title, { body: body, tag: 'wps-' + kind, icon: 'icons/icon.svg' }).then(function () {
        return idb('readwrite', function (st) { return st.put(today + ':' + kind, 'bg-notified'); });
      });
    });
  });
}

self.addEventListener('periodicsync', function (e) {
  if (e.tag === 'wps-streak') e.waitUntil(checkStreak());
});

// サーバーからのプッシュ通知(server/ を動かしている場合)
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'ピンポより 🦉', {
    body: d.body || '今日の勉強、いっしょにやろう！', tag: d.tag || 'wps-push', icon: 'icons/icon.svg', renotify: true
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow('./#cards');
  }));
});
