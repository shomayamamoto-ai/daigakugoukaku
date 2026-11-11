/*
 * ログイン(アプリの入口にかける鍵)
 * - パスワードそのものは保存しない。PBKDF2(SHA-256・60万回)で作った「鍵」を、さらに SHA-256 にかけた
 *   確認用の値(v)だけをソースに置く。ソースを読んでも鍵は分からない。
 * - ログインすると、その端末に鍵を保存する。開くたびに「鍵 → 確認用の値」を計算して照合するので、
 *   ブラウザの保存領域を書きかえただけではログイン状態を作れない(パスワードを知っている必要がある)。
 * - パスワードは大文字・小文字を区別する(全角→半角、前後の空白は吸収する)。IDは区別しない。
 * - まちがいが続くと、待ち時間がだんだん長くなる(5回で1分、10回で5分、15回で30分、それ以降は1時間)。
 * - ログインの有効期間は14日。期限は署名して保存するので、書きかえて延ばすことはできない。
 * - 注意:サーバーを使わない仕組みなので、アプリのプログラム自体を書きかえられる人は回避できる。
 *   本格的に守るには、サーバー側の認証(データもサーバーから配る)が必要。
 * - アカウントを足すときは USERS に { id, salt, it, v } を追加する(作り方は下の makeUser の説明を参照)。
 *   node -e で crypto.pbkdf2Sync(id + ':' + パスワード, salt, it, 32, 'sha256') を base64 にし、その SHA-256(16進)を v にする。
 */
window.WPS = window.WPS || {};
(function () {
  var USERS = [
    { id: 'shoma', salt: 'D8Yk2iw4VYXMHXPsOpUe4A==', it: 600000, v: '8964352a51ad1bc9a21cb8a6bb3660ce9644f0604f578ebbbecae45423310d95' }
  ];
  var KEY = 'wps_auth_v2', DAYS = 14, LOCK = 'wps_auth_lock2';
  try { localStorage.removeItem('wps_auth_v1'); localStorage.removeItem('wps_auth_lock'); } catch (e) { /* 古い形式の印は使わない */ }
  function b64(buf) { var s = '', a = new Uint8Array(buf); for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function set(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  // 同期で使える SHA-256(16進)。起動時のログイン確認に使う
  function sha256(str) {
    var K = [], H = [], i, j, isP = function (n) { for (var f = 2; f * f <= n; f++) if (n % f === 0) return false; return true; }, fr = function (x) { return ((x - (x | 0)) * 4294967296) | 0; };
    for (i = 2, j = 0; j < 64; i++) if (isP(i)) { if (j < 8) H[j] = fr(Math.pow(i, 1 / 2)); K[j++] = fr(Math.pow(i, 1 / 3)); }
    var bytes = unescape(encodeURIComponent(str)), l = bytes.length, w = [], m = [];
    for (i = 0; i < l; i++) m[i >> 2] |= bytes.charCodeAt(i) << (24 - (i % 4) * 8);
    m[l >> 2] |= 0x80 << (24 - (l % 4) * 8); m[((l + 8) >> 6) * 16 + 15] = l * 8;
    var rr = function (x, n) { return (x >>> n) | (x << (32 - n)); };
    for (j = 0; j < m.length; j += 16) {
      var a = H.slice(0);
      for (i = 0; i < 64; i++) {
        if (i < 16) w[i] = m[j + i] | 0;
        else { var x = w[i - 15], y = w[i - 2]; w[i] = (w[i - 16] + (rr(x, 7) ^ rr(x, 18) ^ (x >>> 3)) + w[i - 7] + (rr(y, 17) ^ rr(y, 19) ^ (y >>> 10))) | 0; }
        var t1 = (a[7] + (rr(a[4], 6) ^ rr(a[4], 11) ^ rr(a[4], 25)) + ((a[4] & a[5]) ^ (~a[4] & a[6])) + K[i] + w[i]) | 0;
        var t2 = ((rr(a[0], 2) ^ rr(a[0], 13) ^ rr(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2]))) | 0;
        a = [(t1 + t2) | 0].concat(a.slice(0, 7)); a[4] = (a[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) H[i] = (H[i] + a[i]) | 0;
    }
    return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  }
  function derive(u, pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(u.id + ':' + pw), 'PBKDF2', false, ['deriveBits'])
      .then(function (k) { return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unb64(u.salt), iterations: u.it }, k, 256); })
      .then(b64);
  }
  // 入力のゆれを吸収する(全角→半角・前後の空白・長音やダッシュ類→半角ハイフン)。パスワードは大文字・小文字を区別する
  function norm(t) { t = (t || '').normalize ? (t || '').normalize('NFKC') : (t || ''); return t.trim().replace(/[\u2010-\u2015\u2212\u30fc\uff70]/g, '-').replace(/\s+/g, ''); }
  function waitFor(n) { return n >= 15 ? (n >= 20 ? 3600 : 1800) : n >= 10 ? 300 : n >= 5 ? 60 : 0; }
  var okCache = null;
  var Auth = {
    // 保存した鍵から確認用の値を計算し、ソースの値と一致するか・期限の署名が正しいかを確かめる
    ok: function () {
      if (okCache !== null) return okCache;
      var s = get(KEY), u = s && USERS.filter(function (x) { return x.id === s.id; })[0];
      okCache = !!(u && s.k && s.exp > Date.now() && s.exp - Date.now() <= DAYS * 864e5 + 6e4 && sha256(s.k) === u.v && sha256(s.k + ':' + s.id + ':' + s.exp) === s.sig);
      if (!okCache && s) set(KEY, null);
      return okCache;
    },
    user: function () { var s = get(KEY); return Auth.ok() && s ? s.id : ''; },
    login: function (id, pw) {
      var lk = get(LOCK) || { n: 0, until: 0 };
      if (lk.until > Date.now()) return Promise.reject({ wait: Math.ceil((lk.until - Date.now()) / 1000) });
      id = norm(id).toLowerCase(); pw = norm(pw);
      var u = USERS.filter(function (x) { return x.id === id; })[0];
      var fail = function () { lk.n++; var w = waitFor(lk.n); if (w && lk.n % 5 === 0) lk.until = Date.now() + w * 1000; set(LOCK, lk); return Promise.reject(lk.until > Date.now() ? { wait: Math.ceil((lk.until - Date.now()) / 1000) } : { left: 5 - lk.n % 5 }); };
      // IDが存在しないときも同じだけ時間をかけて、IDの有無を見分けにくくする
      if (!u || !pw) return derive(u || USERS[0], (pw || '') + '#').then(fail);
      return derive(u, pw).then(function (k) {
        if (sha256(k) !== u.v) return fail();
        var exp = Date.now() + DAYS * 864e5;
        set(KEY, { id: id, k: k, exp: exp, sig: sha256(k + ':' + id + ':' + exp) }); set(LOCK, null); okCache = true; return id;
      });
    },
    logout: function () { set(KEY, null); okCache = false; },
    screen: function () {
      return '<section class="login-wrap"><div class="login-card">' +
        '<p class="brand brand-lg"><b class="brand-word">Aqualium</b><small class="brand-sub">個別最適化オンライン家庭教師</small></p><h1>ログイン</h1><p class="muted small">IDとパスワードを入力してください。<br>パスワードは大文字・小文字を区別します。</p>' +
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
          err.textContent = x && x.wait ? '何度もまちがえたため、' + (x.wait >= 120 ? Math.ceil(x.wait / 60) + '分' : x.wait + '秒') + 'ほど待ってからお試しください。' : 'IDかパスワードがちがいます。' + (x && x.left && x.left <= 2 ? '(あと' + x.left + '回まちがえると、しばらく入力できなくなります)' : '') + 'パスワードは大文字・小文字を区別します。';
          f.pw.select();
        });
      });
    }
  };
  WPS.Auth = Auth;
})();
