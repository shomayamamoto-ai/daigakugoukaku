/* 無料診断テスト(登録・ログイン不要)
 * 学年と教科を選ぶ → 15問(教科ごとに均等)→ 結果(教科ごとの到達レベル・つまずき単元・さかのぼって確認したい前の単元)
 * ・難しさは答えに合わせて変える(正解で1段上、不正解で1段下)
 * ・高校生が高校の問題をまちがえたら、次はその単元の土台(前の単元)から出して、原因をさかのぼる
 * ・学習アプリ(ログインが必要なページ)へのリンクは置かない。結果はこの端末だけに保存
 */
(function () {
  'use strict';
  var D = window.SHINDAN, root = document.getElementById('sd');
  if (!D || !root) return;
  var KEY = 'aqShindan', TOTAL = 15;
  var LV = { 1: '基礎', 2: '標準', 3: '難関' };
  var st = { grade: '', subs: ['eng', 'math', 'jpn'] }, run = null;

  function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function U(id) { var u = D.units[id]; return u ? { id: id, name: u[0], stage: u[1], subj: u[2], pre: u[3] } : null; }
  function sIdx(s) { return D.stages.indexOf(s); }
  function gIdx() { return st.grade === '既卒' ? 5 : sIdx(st.grade); }
  function isJH() { return gIdx() <= 2; }
  /* ---------- 結果の保存 ----------
   * 1) この端末に履歴として保存(最大10回分)  2) PDF・印刷  3) 保存用リンク(結果を URL の # 以降に入れる。サーバーには送らない) */
  var HKEY = 'aqShindanHist';
  function hist() {
    var a = [];
    try { a = JSON.parse(localStorage.getItem(HKEY) || '[]') || []; } catch (e) { a = []; }
    if (!a.length) { try { var old = JSON.parse(localStorage.getItem(KEY) || 'null'); if (old) a = [old]; } catch (e) { /* 無視 */ } }
    return a;
  }
  function save(v) {
    if (!v.id) v.id = Date.now().toString(36);
    var a = hist().filter(function (x) { return x.id !== v.id; }); a.unshift(v); a = a.slice(0, 10);
    try { localStorage.setItem(HKEY, JSON.stringify(a)); localStorage.setItem(KEY, JSON.stringify(v)); return true; } catch (e) { return false; }
  }
  function load() { return hist()[0] || null; }
  function delHist(id) { var a = hist().filter(function (x) { return x.id !== id; }); try { localStorage.setItem(HKEY, JSON.stringify(a)); if (!a.length) localStorage.removeItem(KEY); else localStorage.setItem(KEY, JSON.stringify(a[0])); } catch (e) { /* 無視 */ } }
  // 結果を短い文字列にする(リンク用)
  function pack(res) {
    var o = { v: 1, d: res.date, g: res.grade, s: {}, w: res.weak.map(function (x) { return x[0]; }), r: res.roots.map(function (x) { return x[0]; }), l: res.log || [] };
    Object.keys(res.subs).forEach(function (k) { var x = res.subs[k]; o.s[k] = [x.n, x.ok, x.rate, x.level, [x.byLv[1], x.byLv[2], x.byLv[3]]]; });
    var j = JSON.stringify(o);
    return btoa(unescape(encodeURIComponent(j))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unpack(str) {
    try {
      var j = decodeURIComponent(escape(atob(str.replace(/-/g, '+').replace(/_/g, '/')))), o = JSON.parse(j);
      if (!o || o.v !== 1) return null;
      var res = { date: o.d, grade: o.g, subs: {}, weak: [], roots: [], log: o.l || [], shared: true };
      Object.keys(o.s).forEach(function (k) { var x = o.s[k]; if (!D.subj[k]) return; res.subs[k] = { n: x[0], ok: x[1], rate: x[2], level: x[3], byLv: { 1: x[4][0], 2: x[4][1], 3: x[4][2] } }; });
      function row(id) { var u = U(id); return u ? [u.id, u.name, u.stage, u.subj] : null; }
      res.weak = (o.w || []).map(row).filter(Boolean); res.roots = (o.r || []).map(row).filter(Boolean);
      return res;
    } catch (e) { return null; }
  }
  function linkOf(res) { return location.href.split('#')[0].split('?')[0] + '#r=' + pack(res); }
  function copy(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    else { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; } t.remove(); done(ok); }
  }
  function toast(msg) { var t = document.getElementById('sdToast'); if (!t) { t = document.createElement('div'); t.id = 'sdToast'; t.className = 'sd-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = msg; t.classList.add('on'); clearTimeout(toast.tm); toast.tm = setTimeout(function () { t.classList.remove('on'); }, 2400); }
  function top() { window.scrollTo(0, 0); }
  function band(en, title, lead, crumbs) {
    var e = document.getElementById('sdEn'), t = document.getElementById('sdTitle'), l = document.getElementById('sdLead'), c = document.getElementById('sdCrumb');
    if (e) e.textContent = en; if (t) t.textContent = title; if (l) l.innerHTML = lead || '';
    if (c) c.innerHTML = '<li><a href="home.html">Aqualium</a></li>' + crumbs.map(function (x, i) { return '<li>' + (x[1] ? '<a href="' + x[1] + '">' + x[0] + '</a>' : x[0]) + '</li>'; }).join('');
  }
  function ttl(en, ja) { return '<h2 class="ttl"><span class="en">' + en + '</span><span class="ja">' + ja + '</span></h2>'; }

  // 出題できる問題(学年までの単元)
  function pool(subj, level, opt) {
    opt = opt || {};
    var g = gIdx();
    return D.q.filter(function (x) {
      var u = U(x[0]); if (!u || u.subj !== subj || x[1] !== level) return false;
      var si = sIdx(u.stage);
      if (si > g) return false;
      if (opt.units) return opt.units.indexOf(u.id) >= 0;
      if (opt.track === 'jh') return si <= 2;
      if (opt.track === 'hs') return si >= 3;
      return isJH() ? true : si >= 3;
    }).filter(function (x) { return run.used.indexOf(x[2]) < 0; });
  }
  function pick(subj) {
    var r = run.by[subj], lv = r.lv, cand = [];
    if (r.dig && r.dig.length) { cand = pool(subj, 1, { units: r.dig }).concat(pool(subj, 2, { units: r.dig })); r.dig = null; if (cand.length) { var c0 = cand[Math.floor(Math.random() * cand.length)].slice(); c0.dug = 1; c0.from = r.from; return c0; } }
    for (var k = 0; k < 3 && !cand.length; k++) {
      var l = [lv, lv - 1, lv + 1][k]; if (l < 1 || l > 3) continue;
      cand = pool(subj, l);
      if (!cand.length && !isJH()) cand = pool(subj, l, { track: 'jh' });
    }
    if (!cand.length) cand = pool(subj, 1).concat(pool(subj, 2), pool(subj, 3));
    return cand.length ? cand[Math.floor(Math.random() * cand.length)] : null;
  }

  /* ---------- はじめ ---------- */
  function start() {
    var prev = load();
    var grades = ['中1', '中2', '中3', '高1', '高2', '高3', '既卒'];
    band('Free Diagnosis', '無料診断テスト', '学年と教科を選んで、<b>15問</b>に答えるだけ。教科ごとの到達レベルと、<b>本当につまずいている単元</b>が分かります。<span class="sd-badges"><i>約10分</i><i>登録・ログイン不要</i><i>無料</i></span>', [['無料診断テスト']]);
    root.innerHTML = ttl('Start', '診断をはじめる') +
      '<section class="sd-card"><h2>1. 学年を選んでください</h2><div class="sd-grid" role="radiogroup" aria-label="学年">' + grades.map(function (g) {
        return '<button type="button" class="sd-opt' + (st.grade === g ? ' on' : '') + '" data-g="' + g + '" aria-pressed="' + (st.grade === g) + '">' + g + '</button>'; }).join('') + '</div>' +
      '<h2>2. 診断する教科を選んでください<small>(1〜5教科)</small></h2><div class="sd-grid" aria-label="教科">' + Object.keys(D.subj).filter(function (k) { return k !== 'info'; }).map(function (k) {
        var on = st.subs.indexOf(k) >= 0; return '<button type="button" class="sd-opt' + (on ? ' on' : '') + '" data-s="' + k + '" aria-pressed="' + on + '">' + h(D.subj[k]) + '</button>'; }).join('') + '</div>' +
      '<button type="button" class="sd-go" id="sdGo"' + (st.grade && st.subs.length ? '' : ' disabled') + '>診断をはじめる</button>' +
      '<p class="sd-note">答えはこの端末だけに保存され、送信されることはありません。</p></section>' +
      (prev ? histHTML() : '');
    root.querySelectorAll('[data-g]').forEach(function (b) { b.addEventListener('click', function () { st.grade = b.getAttribute('data-g'); start(); }); });
    root.querySelectorAll('[data-s]').forEach(function (b) { b.addEventListener('click', function () {
      var k = b.getAttribute('data-s'), i = st.subs.indexOf(k);
      if (i >= 0) st.subs.splice(i, 1); else if (st.subs.length < 5) st.subs.push(k);
      start();
    }); });
    var go = root.querySelector('#sdGo'); if (go) go.addEventListener('click', begin);
    bindHist();
  }

  function avgRate(r) { var ks = Object.keys(r.subs); return ks.length ? Math.round(ks.reduce(function (a, k) { return a + r.subs[k].rate; }, 0) / ks.length) : 0; }
  function histHTML() {
    var a = hist(); if (!a.length) return '';
    return ttl('History', '保存した診断結果') + '<section class="sd-card sd-hist"><ul>' + a.map(function (r, i) {
      var ks = Object.keys(r.subs), av = avgRate(r), prev = a[i + 1], diff = prev ? av - avgRate(prev) : null;
      return '<li><button type="button" class="sd-hist-open" data-hopen="' + h(r.id || i) + '"><b>' + h(r.date) + '<small>' + h(r.grade) + '</small></b><span>' + ks.map(function (k) { return h(D.subj[k]); }).join('・') + '</span>' +
        '<em>平均 ' + av + '%' + (diff !== null && diff !== 0 ? '<i class="' + (diff > 0 ? 'up' : 'dn') + '">' + (diff > 0 ? '+' : '') + diff + '</i>' : '') + '</em></button>' +
        '<button type="button" class="sd-hist-del" data-hdel="' + h(r.id || i) + '" aria-label="' + h(r.date) + 'の結果を削除">削除</button></li>';
    }).join('') + '</ul><p class="sd-note">この端末のブラウザに、最大10回分まで保存されます。ほかの端末で見るときは、結果画面の「保存用リンク」を使ってください。</p></section>';
  }
  function bindHist() {
    root.querySelectorAll('[data-hopen]').forEach(function (b) { b.addEventListener('click', function () { var id = b.getAttribute('data-hopen'), r = hist().filter(function (x, i) { return String(x.id || i) === id; })[0]; if (r) result(r); }); });
    root.querySelectorAll('[data-hdel]').forEach(function (b) { b.addEventListener('click', function () { if (!confirm('この診断結果を削除しますか?')) return; delHist(b.getAttribute('data-hdel')); toast('削除しました'); start(); }); });
  }

  /* ---------- 出題 ---------- */
  function begin() {
    run = { i: 0, used: [], ans: [], by: {}, order: [] };
    var per = Math.floor(TOTAL / st.subs.length), extra = TOTAL - per * st.subs.length;
    st.subs.forEach(function (k, i) { run.by[k] = { lv: isJH() ? 1 : 2 }; for (var n = 0; n < per + (i < extra ? 1 : 0); n++) run.order.push(k); });
    // 教科をまぜて出す(同じ教科が3問以上続かないように)
    var o = [], rest = run.order.slice();
    while (rest.length) { var cands = rest.filter(function (k) { return !(o.length >= 2 && o[o.length - 1] === k && o[o.length - 2] === k); }); var k2 = (cands.length ? cands : rest)[Math.floor(Math.random() * (cands.length || rest.length))]; o.push(k2); rest.splice(rest.indexOf(k2), 1); }
    run.order = o;
    next();
  }
  function next() {
    if (run.i >= run.order.length) return finish();
    var subj = run.order[run.i], q = pick(subj);
    if (!q) { run.order.splice(run.i, 1); return next(); }
    run.used.push(q[2]);
    var u = U(q[0]), ch = shuffle(q[3]);
    run.cur = { q: q, subj: subj, u: u, ch: ch, dug: !!q.dug, dugFrom: q.from || null };
    band('Question ' + (run.i + 1), '第' + (run.i + 1) + '問 / 全' + run.order.length + '問', 'わからないときは「わからない」を選ぶと、診断が正確になります。', [['無料診断テスト', 'shindan.html'], ['出題中']]);
    root.innerHTML = '<div class="sd-bar"><span>' + (run.i + 1) + ' / ' + run.order.length + '</span><i style="width:' + Math.round(run.i / run.order.length * 100) + '%"></i></div>' +
      '<section class="sd-card sd-q"><p class="sd-meta"><b>' + h(D.subj[subj]) + '</b>' + h(u.stage) + '・' + h(u.name) + '<em>' + LV[q[1]] + '</em>' + (run.cur.dug ? '<em class="dig">前の単元をたしかめる問題</em>' : '') + '</p>' +
      '<p class="sd-text">' + h(q[2]).replace(/\n/g, '<br>') + '</p><div class="sd-choices">' +
      ch.map(function (c, i) { return '<button type="button" class="sd-c" data-c="' + i + '"><span>' + 'ABCD'[i] + '</span>' + h(c) + '</button>'; }).join('') +
      '<button type="button" class="sd-c sd-skip" data-c="-1">わからない</button></div></section>' +
      '';
    root.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function () { answer(+b.getAttribute('data-c')); }); });
    top();
  }
  function answer(i) {
    var c = run.cur, ok = i >= 0 && c.ch[i] === c.q[3][0], r = run.by[c.subj];
    run.ans.push({ s: c.subj, u: c.u.id, lv: c.q[1], ok: ok, skip: i < 0, dug: c.dug, pre: c.dugFrom || null });
    if (ok) r.lv = Math.min(3, r.lv + 1);
    else {
      r.lv = Math.max(1, r.lv - 1);
      // 高校の単元をまちがえたら、その土台の単元を次に確かめる(さかのぼり)
      if (c.u.pre && c.u.pre.length) { r.dig = c.u.pre.slice(); r.from = c.u.id; }
    }
    root.querySelectorAll('[data-c]').forEach(function (b) {
      var k = +b.getAttribute('data-c'); b.disabled = true;
      if (k >= 0 && c.ch[k] === c.q[3][0]) b.classList.add('ok'); else if (k === i) b.classList.add('ng');
    });
    var fb = document.createElement('div'); fb.className = 'sd-fb ' + (ok ? 'ok' : 'ng');
    fb.innerHTML = '<b>' + (ok ? '正解！' : i < 0 ? '正解は「' + h(c.q[3][0]) + '」' : '不正解。正解は「' + h(c.q[3][0]) + '」') + '</b>' + (c.q[4] ? '<p>' + h(c.q[4]) + '</p>' : '') +
      '<button type="button" class="sd-go" id="sdNext">' + (run.i + 1 >= run.order.length ? '結果を見る' : '次の問題へ') + '</button>';
    root.querySelector('.sd-q').appendChild(fb);
    root.querySelector('#sdNext').addEventListener('click', function () { run.i++; next(); });
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- 結果 ---------- */
  function finish() {
    var res = { date: new Date().toLocaleDateString('ja-JP'), grade: st.grade, subs: {}, weak: [], roots: [], log: run.ans.map(function (x) { return [x.s, x.u, x.lv, x.ok ? 1 : 0, x.dug ? 1 : 0, x.pre]; }) };
    st.subs.forEach(function (k) {
      var a = run.ans.filter(function (x) { return x.s === k; }); if (!a.length) return;
      var w = { 1: 1, 2: 1.4, 3: 1.9 }, sc = 0, mx = 0;
      a.forEach(function (x) { mx += w[x.lv]; if (x.ok) sc += w[x.lv]; });
      var okHi = a.filter(function (x) { return x.ok && x.lv >= 2; }).length, okAll = a.filter(function (x) { return x.ok; }).length;
      // 到達レベル:難しさで重みをつけた正答率で決める(難関は難関の問題に正解していることが条件)
      var rate = sc / mx, okHard = a.some(function (x) { return x.ok && x.lv === 3; });
      var level = rate >= 0.75 && okHard ? 3 : rate >= 0.5 && okHi >= 1 ? 2 : 1;
      var byLv = { 1: [0, 0], 2: [0, 0], 3: [0, 0] }; a.forEach(function (x) { byLv[x.lv][1]++; if (x.ok) byLv[x.lv][0]++; });
      res.subs[k] = { n: a.length, ok: okAll, rate: Math.round(sc / mx * 100), level: level, byLv: byLv };
    });
    var seenW = {}, seenR = {};
    run.ans.forEach(function (x) {
      if (x.ok) return; var u = U(x.u);
      if (!seenW[u.id]) { seenW[u.id] = 1; res.weak.push([u.id, u.name, u.stage, x.s]); }
      if (x.dug && !seenR[u.id]) { seenR[u.id] = 1; res.roots.push([u.id, u.name, u.stage, x.s]); }
    });
    var saved = save(res); result(res); toast(saved ? '診断結果をこの端末に保存しました' : 'この端末には保存できませんでした。保存用リンクかPDFで保存してください');
  }
  /* ---------- グラフ(学習アプリと同じ形) ---------- */
  // 教科バランスのレーダーチャート(3教科以上)/横棒グラフ(1〜2教科)
  function radar(res, ks) {
    if (ks.length < 3) {
      return '<div class="sd-bars">' + ks.map(function (k) { var v = res.subs[k].rate; return '<div class="sd-bar-row"><b style="color:' + D.col[k] + '">' + h(D.subj[k]) + '</b><span class="sd-hbar"><i style="width:' + v + '%;background:' + D.col[k] + '"></i><em style="left:80%"></em></span><strong>' + v + '%</strong></div>'; }).join('') + '</div>';
    }
    var W = 340, H = 300, cx = W / 2, cy = H / 2 + 4, R0 = 96, n = ks.length;
    function pt(i, v) { var a = -Math.PI / 2 + i * 2 * Math.PI / n, r = R0 * v / 100; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    function poly(vs) { return vs.map(function (v, i) { var p = pt(i, v); return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
    var g = '';
    [20, 40, 60, 80, 100].forEach(function (lv) { g += '<polygon class="rd-grid' + (lv === 80 ? ' goal' : '') + '" points="' + poly(ks.map(function () { return lv; })) + '"/>'; });
    ks.forEach(function (k, i) { var p = pt(i, 100); g += '<line class="rd-ax" x1="' + cx + '" y1="' + cy + '" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '"/>'; });
    [0, 40, 80].forEach(function (lv) { var p = pt(0, lv); g += '<text class="rd-tick" x="' + (p[0] + 4) + '" y="' + (p[1] + 4) + '">' + lv + '</text>'; });
    var vs = ks.map(function (k) { return res.subs[k].rate; });
    g += '<polygon class="rd-cur" points="' + poly(vs) + '"/>';
    vs.forEach(function (v, i) { var p = pt(i, v); g += '<circle class="rd-dot" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4"/>'; });
    ks.forEach(function (k, i) {
      var p = pt(i, 122), anc = Math.abs(p[0] - cx) < 10 ? 'middle' : p[0] > cx ? 'start' : 'end';
      g += '<text class="rd-lab" x="' + p[0].toFixed(1) + '" y="' + (p[1] - 2).toFixed(1) + '" text-anchor="' + anc + '"><tspan fill="' + D.col[k] + '">' + h(D.subj[k]) + '</tspan><tspan class="rd-v" x="' + p[0].toFixed(1) + '" dy="14">' + vs[i] + '%</tspan></text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="radar" role="img" aria-label="教科ごとの得点率のレーダーチャート">' + g + '</svg>' +
      '<p class="rd-leg"><span class="cur">あなた</span><span class="goal">得意の目安 80%</span></p>';
  }
  // 到達レベルのものさし(基礎・標準・難関)
  function ruler(res, ks) {
    return '<div class="sd-rulers">' + ks.map(function (k) {
      var s = res.subs[k], pos = Math.max(4, Math.min(96, s.rate));
      return '<div class="sd-ruler"><div class="sd-ruler-h"><b style="color:' + D.col[k] + '">' + h(D.subj[k]) + '</b><span class="lv lv' + s.level + '">' + LV[s.level] + 'レベル</span></div>' +
        '<div class="sd-track"><i class="z1"></i><i class="z2"></i><i class="z3"></i><span class="pin" style="left:' + pos + '%;background:' + D.col[k] + '"><em>' + s.rate + '%</em></span></div>' +
        '<div class="sd-zone"><span>基礎</span><span>標準</span><span>難関</span></div>' +
        '<p class="sd-lvtab">' + [1, 2, 3].map(function (l) { var x = s.byLv[l]; return x[1] ? LV[l] + ' <b>' + x[0] + '/' + x[1] + '</b>' : ''; }).filter(Boolean).join('<span>・</span>') + '</p></div>';
    }).join('') + '</div>';
  }
  // 解答のあゆみ(難しさの上がり下がり)
  function path(res) {
    var L = res.log || []; if (!L.length) return '';
    var W = Math.max(320, L.length * 34 + 40), H = 150, x = function (i) { return 30 + i * (W - 50) / Math.max(1, L.length - 1); }, y = function (l) { return 120 - (l - 1) * 45; };
    var g = [1, 2, 3].map(function (l) { return '<line x1="24" x2="' + (W - 10) + '" y1="' + y(l) + '" y2="' + y(l) + '" class="ph-grid"/><text x="0" y="' + (y(l) + 4) + '" class="ph-lab">' + LV[l] + '</text>'; }).join('');
    g += '<polyline class="ph-line" points="' + L.map(function (a, i) { return x(i).toFixed(1) + ',' + y(a[2]); }).join(' ') + '"/>';
    g += L.map(function (a, i) { return '<g><circle cx="' + x(i).toFixed(1) + '" cy="' + y(a[2]) + '" r="9" fill="' + (a[3] ? '#2d9b6a' : '#d0342c') + '" stroke="' + D.col[a[0]] + '" stroke-width="2.5"/><text x="' + x(i).toFixed(1) + '" y="' + (y(a[2]) + 4) + '" class="ph-mk">' + (a[3] ? '○' : '×') + '</text>' + (a[4] ? '<text x="' + x(i).toFixed(1) + '" y="' + (y(a[2]) - 14) + '" class="ph-dig">さかのぼり</text>' : '') + '<text x="' + x(i).toFixed(1) + '" y="146" class="ph-n">' + (i + 1) + '</text></g>'; }).join('');
    return '<div class="sd-path"><svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="解答のあゆみ">' + g + '</svg></div>' +
      '<p class="sd-grp">' + Object.keys(res.subs).map(function (k) { return '<span><i style="background:' + D.col[k] + '"></i>' + h(D.subj[k]) + '</span>'; }).join('') + '<span><i style="background:#2d9b6a"></i>正解</span><span><i style="background:#d0342c"></i>不正解</span></p>';
  }
  // さかのぼりマップ(まちがえた単元 ← 土台の単元)
  function rootMap(res) {
    var L = res.log || [], pairs = [];
    L.forEach(function (a) { if (a[4] && a[5]) { var top = U(a[5]), base = U(a[1]); if (top && base) pairs.push([top, base, a[3], a[0]]); } });
    if (!pairs.length) return '';
    return '<div class="sd-map">' + pairs.map(function (p) {
      return '<div class="sd-chain"><div class="node ng"><small>' + h(D.subj[p[3]]) + '・' + h(p[0].stage) + '</small><b>' + h(p[0].name) + '</b><span>×まちがえた</span></div><div class="arrow" aria-hidden="true">土台をたしかめる ▼</div>' +
        '<div class="node ' + (p[2] ? 'ok' : 'ng root') + '"><small>' + h(p[1].stage) + '</small><b>' + h(p[1].name) + '</b><span>' + (p[2] ? '○できた ― 原因は上の単元そのもの' : '×ここが「根っこ」かもしれない') + '</span></div></div>';
    }).join('') + '</div>';
  }
  function result(res) {
    var ks = Object.keys(res.subs);
    var lowest = ks.slice().sort(function (a, b) { return res.subs[a].rate - res.subs[b].rate; })[0];
    var best = ks.slice().sort(function (a, b) { return res.subs[b].rate - res.subs[a].rate; })[0];
    band('Result', '診断の結果', h(res.grade) + '・' + h(res.date) + ' ／ 答えた問題 ' + (res.log ? res.log.length : '') + '問', [['無料診断テスト', 'shindan.html'], ['結果']]);
    var html = '<section class="sd-card sd-save no-print"><h2>この結果を保存する</h2><div class="sd-save-btns">' +
      (res.shared ? '<button type="button" class="btn btn-line" id="sdKeep">この端末に保存</button>' : '<span class="sd-saved">この端末に保存済み</span>') +
      '<button type="button" class="btn btn-line" id="sdPdf">PDF・印刷で保存</button><button type="button" class="btn btn-line" id="sdLink">保存用リンクをコピー</button>' +
      (navigator.share ? '<button type="button" class="btn btn-line" id="sdShare">保護者などに送る</button>' : '') + '</div>' +
      '<p class="sd-note">保存用リンクには結果だけが入っています(名前などの個人情報はふくみません)。開くと、ほかの端末でもこの結果を見られます。</p></section>' +
      ttl('Balance', '教科ごとの得点率') + '<section class="sd-card">' + radar(res, ks) +
      '<p class="sd-msg">' + (best && lowest && best !== lowest ? 'いちばん得意なのは<b>' + h(D.subj[best]) + '(' + res.subs[best].rate + '%)</b>、伸びしろが大きいのは<b>' + h(D.subj[lowest]) + '(' + res.subs[lowest].rate + '%)</b>です。' : '') +
      '<small>得点率は、難しい問題ほど重みをつけて計算しています(基礎1・標準1.4・難関1.9)。</small></p></section>';
    html += ttl('Level', '到達レベル(目安)') + '<section class="sd-card">' + ruler(res, ks) + '<p class="sd-note">基礎=教科書の基本/標準=入試の標準問題/難関=難関校レベル。問題数が少ないため、あくまで目安です。</p></section>';
    if (res.log) html += ttl('Path', '解答のあゆみ') + '<section class="sd-card"><p class="sd-desc">正解すると次は難しく、まちがえるとやさしくなります。高校の単元をまちがえたときは、その土台の単元を出して原因を「さかのぼり」ました。</p>' + path(res) + '</section>';
    var map = res.log ? rootMap(res) : '';
    if (map) html += ttl('Root cause', 'さかのぼりマップ') + '<section class="sd-card"><p class="sd-desc">まちがえた単元の「土台」も確かめました。土台でもまちがえた単元が、つまずきの根っこかもしれません。</p>' + map + '</section>';
    else if (res.roots.length) html += ttl('Root cause', 'つまずきの根っこかもしれない単元') + '<section class="sd-card"><ul class="sd-weak">' + res.roots.map(function (x) { return '<li><b>' + h(x[1]) + '</b><small>' + h(D.subj[x[3]]) + '・' + h(x[2]) + '</small></li>'; }).join('') + '</ul></section>';
    html += ttl('Weak points', 'まちがえた単元') + '<section class="sd-card">' + (res.weak.length ? '<ul class="sd-weak">' + res.weak.map(function (x) {
      var u = U(x[0]), pre = (u.pre || []).map(U).filter(Boolean);
      return '<li style="border-left-color:' + D.col[x[3]] + '"><b>' + h(x[1]) + '</b><small>' + h(D.subj[x[3]]) + '・' + h(x[2]) + '</small>' + (pre.length ? '<span class="sd-pre">土台になる単元:' + pre.map(function (p) { return h(p.name) + '(' + h(p.stage) + ')'; }).join('、') + '</span>' : '') + '</li>'; }).join('') + '</ul>' : '<p class="sd-desc">まちがえた問題はありませんでした。すばらしい！ より難しい問題で、伸ばせるところを探していきましょう。</p>') + '</section>';
    html += ttl('Next step', '次にやること') + '<section class="sd-card sd-next"><ol>' +
      (lowest ? '<li>いちばん伸びしろが大きいのは<b>' + h(D.subj[lowest]) + '</b>です。</li>' : '') +
      (res.roots.length ? '<li>まずは「根っこ」の単元(' + h(res.roots[0][1]) + ')を、基本から確かめましょう。</li>' : res.weak.length ? '<li>まちがえた単元の「土台になる単元」から確かめると、原因が見つかりやすくなります。</li>' : '') +
      '<li>15問の診断で分かることには限りがあります。Aqualium の受講では、全286単元の診断と、あなた専用の教材・1回30分の個別指導で、弱点を一つずつ解消していきます。</li></ol>' +
      '<div class="sd-ctas"><a class="btn btn-grad" href="home.html#contact">受講について相談する</a><a class="btn btn-line" href="home.html#price">料金を見る</a><button type="button" class="btn btn-line" id="sdAgain">もう一度診断する</button></div>' +
      '<p class="sd-note">この結果は、この端末だけに保存されています。</p></section>' +
      ttl('Column', 'あわせて読みたい') + '<section class="sd-card"><ul class="sd-links"><li><a href="guide/nigate.html">本当の苦手単元の見つけ方</a></li><li><a href="guide/plan.html">志望校から逆算する受験勉強の計画の立て方</a></li></ul></section>';
    root.innerHTML = html;
    root.querySelector('#sdAgain').addEventListener('click', function () { if (location.hash) history.replaceState(null, '', location.pathname); st.grade = res.grade; start(); });
    var pdf = root.querySelector('#sdPdf'); if (pdf) pdf.addEventListener('click', function () { var t = document.title; document.title = 'Aqualium 診断結果 ' + res.date; window.print(); setTimeout(function () { document.title = t; }, 500); });
    var lk = root.querySelector('#sdLink'); if (lk) lk.addEventListener('click', function () { copy(linkOf(res), function (ok) { toast(ok ? '保存用リンクをコピーしました。メモやLINEに貼って保存してください' : 'コピーできませんでした'); }); });
    var sh = root.querySelector('#sdShare'); if (sh) sh.addEventListener('click', function () { navigator.share({ title: 'Aqualium 無料診断テストの結果', text: res.date + ' ' + res.grade + ' の診断結果', url: linkOf(res) }).catch(function () { /* 取り消し */ }); });
    var kp = root.querySelector('#sdKeep'); if (kp) kp.addEventListener('click', function () { delete res.shared; var ok = save(res); toast(ok ? 'この端末に保存しました' : '保存できませんでした'); kp.outerHTML = '<span class="sd-saved">この端末に保存済み</span>'; });
    top();
  }

  var m = location.hash.match(/^#r=([A-Za-z0-9_-]+)/), shared = m ? unpack(m[1]) : null;
  if (shared) { var dup = hist().filter(function (x) { return x.date === shared.date && x.grade === shared.grade && JSON.stringify(x.log) === JSON.stringify(shared.log); })[0]; result(dup || shared); }
  else start();
})();
