/*
 * データ共有・クラウド同期
 * ------------------------------------------------------------
 * 1. 共有リンク(サーバー不要)
 *    学習データを圧縮してURLに埋め込みます。先生はリンクを開くだけで
 *    分析レポートを見られます(その時点のデータ。閲覧のみ)。
 * 2. クラウド同期(server/ を動かした場合のみ)
 *    ・複数の端末で同じデータを使える
 *    ・先生用リンクで、いつでも最新のレポートを見られる
 *    ・アプリを閉じていてもプッシュ通知が届く
 */
window.WPS = window.WPS || {};

/* ========== 1. 共有リンク ========== */
WPS.Share = (function () {
  var MAX_ATTEMPTS = 1500;

  function b64url(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unb64url(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    var bin = atob(str), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function pipe(bytes, stream) {
    return new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }

  // 先生が分析に使う部分だけを、小さくまとめる
  function compact(state) {
    var p = Object.assign({}, state.profile);
    delete p.notify;
    return {
      v: 1,
      p: p,
      a: state.attempts.slice(-MAX_ATTEMPTS).map(function (a) {
        return [a.q || '', a.u, a.ok ? 1 : 0, a.ch || '', a.unsure ? 1 : 0, a.src || '', a.t || 0, a.d || ''];
      }),
      m: (state.memos || []).filter(function (m) { return !m.done; }).slice(-20).map(function (m) { return [m.unit || '', m.text]; }),
      r: state.records || [],
      x: state.extraUnits || []
    };
  }
  function expand(c) {
    return {
      v: 1, profile: c.p, cards: {}, days: {}, freezes: 0, frozen: [], notified: {},
      attempts: (c.a || []).map(function (a) {
        var u = WPS.UNIT_MAP[a[1]];
        return { q: a[0] || null, u: a[1], s: u ? u.subj : '', ok: !!a[2], ch: a[3] || null, unsure: !!a[4], src: a[5], t: a[6], d: a[7] };
      }),
      memos: (c.m || []).map(function (m, i) { return { id: i, unit: m[0] || null, text: m[1], done: false }; }),
      records: c.r || [], extraUnits: c.x || []
    };
  }

  function encode(state) {
    var json = JSON.stringify(compact(state));
    var bytes = new TextEncoder().encode(json);
    if (typeof CompressionStream === 'undefined') return Promise.resolve('j' + b64url(bytes));
    return pipe(bytes, new CompressionStream('deflate-raw')).then(function (z) { return 'z' + b64url(z); });
  }
  function decode(str) {
    var kind = str[0], bytes = unb64url(str.slice(1));
    var p = kind === 'z' ? pipe(bytes, new DecompressionStream('deflate-raw')) : Promise.resolve(bytes);
    return p.then(function (b) { return expand(JSON.parse(new TextDecoder().decode(b))); });
  }
  function baseUrl() { return location.href.split('#')[0]; }
  function link() {
    return encode(WPS.Store.get()).then(function (d) { return baseUrl() + '#share/' + d; });
  }
  return { encode: encode, decode: decode, link: link, baseUrl: baseUrl };
})();

/* ========== 2. クラウド同期 ========== */
WPS.Sync = (function () {
  var KEY = 'wps_sync_v1';
  var timer = null;
  var busy = false;

  function cfg() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function setCfg(c) { if (c) localStorage.setItem(KEY, JSON.stringify(c)); else localStorage.removeItem(KEY); }
  function enabled() { return !!cfg(); }
  function clean(url) { return String(url || '').trim().replace(/\/+$/, ''); }

  function req(method, path, body, token, server) {
    var c = cfg() || {};
    var headers = { 'Content-Type': 'application/json' };
    if (token || c.token) headers.Authorization = 'Bearer ' + (token || c.token);
    return fetch(clean(server || c.server) + path, { method: method, headers: headers, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok) throw new Error(j.error || ('HTTP ' + r.status));
          return j;
        });
      });
  }

  function meta() {
    var s = WPS.Store.get();
    var studied = WPS.Streak.studiedDays();
    var last = Object.keys(studied).filter(function (d) { return studied[d] === 'study'; }).sort().pop() || '';
    return { notify: !!s.profile.notify, reminder: s.profile.reminder, tz: new Date().getTimezoneOffset(), lastStudy: last, streak: WPS.Streak.count(), name: s.profile.name };
  }

  // 同じ場所でサーバーが動いているか(アプリをサーバーから開いている場合は自動で見つかる)
  function detect() {
    if (location.protocol === 'file:') return Promise.resolve('');
    return fetch(location.origin + '/api/health').then(function (r) { return r.ok ? location.origin : ''; }).catch(function () { return ''; });
  }

  function setup(server) {
    server = clean(server);
    return req('GET', '/api/health', null, null, server).then(function () {
      return req('POST', '/api/register', {}, null, server);
    }).then(function (r) {
      setCfg({ server: server, id: r.id, token: r.token, tutorCode: r.tutorCode, last: 0 });
      return push().then(subscribePush);
    });
  }

  // 引き継ぎコード:別の端末で同じデータを使うためのコード
  function transferCode() {
    var c = cfg();
    return c ? btoa(unescape(encodeURIComponent(JSON.stringify({ s: c.server, i: c.id, t: c.token, c: c.tutorCode })))) : '';
  }
  function useTransferCode(code) {
    var o = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (!o.s || !o.i || !o.t) throw new Error('コードが正しくありません');
    setCfg({ server: o.s, id: o.i, token: o.t, tutorCode: o.c, last: 0 });
    return pull(true).then(subscribePush);
  }

  function push() {
    var c = cfg();
    if (!c || busy) return Promise.resolve();
    busy = true;
    return req('PUT', '/api/data/' + c.id, { state: WPS.Store.get(), meta: meta() }).then(function () {
      c.last = Date.now(); setCfg(c);
    }).finally(function () { busy = false; });
  }

  // サーバーの方が新しければ取り込む
  function pull(force) {
    var c = cfg();
    if (!c) return Promise.resolve(false);
    return req('GET', '/api/data/' + c.id).then(function (r) {
      var local = WPS.Store.get();
      if (r.state && (force || (+r.updatedAt || 0) > (+local.updatedAt || 0))) {
        WPS.Store.importJSON(JSON.stringify(r.state), true);
        c.last = Date.now(); setCfg(c);
        return true;
      }
      return false;
    });
  }

  function onSave() {
    if (!enabled()) return;
    clearTimeout(timer);
    timer = setTimeout(function () { push().catch(function () { /* オフライン時は次回に再送 */ }); }, 2000);
  }

  function urlB64ToUint8(base64) {
    var pad = '='.repeat((4 - base64.length % 4) % 4);
    var raw = atob((base64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  // プッシュ通知の登録(通知がオンで、同期もオンのとき)
  function subscribePush() {
    var c = cfg();
    var s = WPS.Store.get();
    if (!c || !s.profile.notify || !('serviceWorker' in navigator) || !('PushManager' in window)) return Promise.resolve(false);
    if (WPS.Notify.permission() !== 'granted') return Promise.resolve(false);
    return navigator.serviceWorker.ready.then(function (reg) {
      return req('GET', '/api/vapid').then(function (v) {
        return reg.pushManager.getSubscription().then(function (sub) {
          return sub || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8(v.publicKey) });
        });
      }).then(function (sub) {
        return req('POST', '/api/push/' + c.id, { subscription: sub.toJSON(), meta: meta() });
      }).then(function () { return true; });
    }).catch(function () { return false; });
  }

  function tutorLink() {
    var c = cfg();
    return c ? WPS.Share.baseUrl() + '#cloud/' + c.tutorCode + '@' + encodeURIComponent(c.server) : '';
  }
  function fetchShared(code, server) {
    return req('GET', '/api/share/' + code, null, 'none', server).then(function (r) { return r.state; });
  }
  function disable() { setCfg(null); }

  function boot() {
    if (!enabled()) return Promise.resolve(false);
    return pull(false).catch(function () { return false; });
  }

  return {
    enabled: enabled, cfg: cfg, detect: detect, setup: setup, push: push, pull: pull, onSave: onSave,
    transferCode: transferCode, useTransferCode: useTransferCode, subscribePush: subscribePush,
    tutorLink: tutorLink, fetchShared: fetchShared, disable: disable, boot: boot
  };
})();
