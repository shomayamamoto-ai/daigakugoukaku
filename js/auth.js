/*
 * かんたんログイン(アプリの入口にかける鍵)
 * - パスワードそのものは保存せず、PBKDF2(SHA-256)でハッシュ化した値だけを置いています。
 * - 注意:サーバーを使わない仕組みなので、ブラウザの開発者ツールを使える人なら回避できます。
 *   「関係者以外が気軽に入れないようにする目隠し」です。本格的に守るにはサーバー側の認証が必要です。
 * - アカウントを足すときは USERS に { id, salt, it, hash } を追加します(作り方は README を参照)。
 */
window.WPS = window.WPS || {};
(function () {
  var USERS = [
    { id: 'shoma', salt: 'W+wiBjVug5bMQRUsv09cIA==', it: 210000, hash: '+phtPICQs72g8TF2zf9vWFC5XbeeNMlDqaB/aoxxXQI=' }
  ];
  var KEY = 'wps_auth_v1', DAYS = 30, LOCK = 'wps_auth_lock';
  function b64(buf) { var s = '', a = new Uint8Array(buf); for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function set(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  function sha(text) { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(b64); }
  function derive(u, pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(u.id + ':' + pw), 'PBKDF2', false, ['deriveBits'])
      .then(function (k) { return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unb64(u.salt), iterations: u.it }, k, 256); })
      .then(b64);
  }
  // 入力のゆれを吸収する(全角→半角・前後の空白・大文字小文字・長音やダッシュ類→半角ハイフン)
  function norm(t) { t = (t || '').normalize ? (t || '').normalize('NFKC') : (t || ''); return t.trim().toLowerCase().replace(/[\u2010-\u2015\u2212\u30fc\uff70]/g, '-').replace(/\s+/g, ''); }
  var okCache = null;
  var Auth = {
    // 同期で判定できるように、ログイン時に「ユーザーのハッシュ+期限」から作った印を保存しておく
    ok: function () {
      if (okCache !== null) return okCache;
      var s = get(KEY), u = s && USERS.filter(function (x) { return x.id === s.id; })[0];
      okCache = !!(u && s.exp > Date.now() && s.sig && s.sig.length > 20 && s.h === u.hash.slice(0, 8));
      return okCache;
    },
    user: function () { var s = get(KEY); return Auth.ok() && s ? s.id : ''; },
    login: function (id, pw) {
      var lk = get(LOCK) || { n: 0, until: 0 };
      if (lk.until > Date.now()) return Promise.reject({ wait: Math.ceil((lk.until - Date.now()) / 1000) });
      id = norm(id); pw = norm(pw);
      var u = USERS.filter(function (x) { return x.id === id; })[0];
      var fail = function () { lk.n++; if (lk.n >= 5) { lk.until = Date.now() + 60000; lk.n = 0; } set(LOCK, lk); return Promise.reject({}); };
      if (!u || !pw) return fail();
      return derive(u, pw).then(function (h) {
        if (h !== u.hash) return fail();
        var exp = Date.now() + DAYS * 864e5;
        return sha(h + ':' + exp).then(function (sig) { set(KEY, { id: id, exp: exp, sig: sig, h: u.hash.slice(0, 8) }); set(LOCK, null); okCache = true; return id; });
      });
    },
    logout: function () { set(KEY, null); okCache = false; },
    screen: function () {
      return '<section class="login-wrap"><div class="login-card">' +
        '<p class="brand brand-lg"><b class="brand-word">Aqualium</b><small class="brand-sub">個別最適化オンライン家庭教師</small></p><h1>ログイン</h1><p class="muted small">IDとパスワードを入力してください。大文字・小文字は区別しません。</p>' +
        '<form id="loginForm" autocomplete="on" novalidate>' +
        '<label>ID<input name="id" autocomplete="username" autocapitalize="off" spellcheck="false" required></label>' +
        '<label>パスワード<span class="pw-row"><input name="pw" type="password" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false" required><button type="button" class="pw-eye" aria-label="パスワードを表示" aria-pressed="false">表示</button></span></label>' +
        '<p class="login-err" role="alert" aria-live="assertive"></p>' +
        '<button type="submit" class="btn primary big">ログイン</button></form>' +
        '<p class="login-note small muted">ログインは、この端末で' + DAYS + '日間保たれます。<br><a href="home.html">サービス紹介</a>・<a href="manual.html">使い方マニュアル</a></p></div></section>';
    },
    bind: function (done) {
      var f = document.getElementById('loginForm'); if (!f) return;
      var err = f.querySelector('.login-err'), btn = f.querySelector('button[type=submit]'), eye = f.querySelector('.pw-eye');
      eye.addEventListener('click', function () { var on = f.pw.type === 'password'; f.pw.type = on ? 'text' : 'password'; eye.textContent = on ? '隠す' : '表示'; eye.setAttribute('aria-pressed', on); });
      f.id.focus();
      f.addEventListener('submit', function (e) {
        e.preventDefault(); err.textContent = '';
        if (!f.id.value.trim() || !f.pw.value) { err.textContent = 'IDとパスワードを入力してください。'; return; }
        btn.disabled = true; btn.textContent = '確認しています…';
        Auth.login(f.id.value, f.pw.value).then(function () { done(); }, function (x) {
          btn.disabled = false; btn.textContent = 'ログイン';
          err.textContent = x && x.wait ? '何度もまちがえたため、' + x.wait + '秒ほど待ってからお試しください。' : 'IDかパスワードがちがいます。';
          f.pw.select();
        });
      });
    }
  };
  WPS.Auth = Auth;
})();
