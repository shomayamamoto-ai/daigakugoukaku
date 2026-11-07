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
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* 無視 */ } }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function top() { window.scrollTo(0, 0); }

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
    if (r.dig && r.dig.length) { cand = pool(subj, 1, { units: r.dig }).concat(pool(subj, 2, { units: r.dig })); r.dig = null; if (cand.length) { var c0 = cand[Math.floor(Math.random() * cand.length)]; c0.dug = 1; return c0; } }
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
    root.innerHTML = '<ol class="g-crumb"><li><a href="home.html">Aqualium</a></li><li>無料診断テスト</li></ol>' +
      '<section class="sd-hero"><p class="sd-en">Free Diagnosis</p><h1>無料診断テスト</h1><p>学年と教科を選んで、<b>15問</b>に答えるだけ。教科ごとの到達レベルと、<b>本当につまずいている単元</b>が分かります。</p>' +
      '<ul class="sd-badges"><li>約10分</li><li>登録・ログイン不要</li><li>無料</li></ul></section>' +
      '<section class="sd-card"><h2>1. 学年を選んでください</h2><div class="sd-grid" role="radiogroup" aria-label="学年">' + grades.map(function (g) {
        return '<button type="button" class="sd-opt' + (st.grade === g ? ' on' : '') + '" data-g="' + g + '" aria-pressed="' + (st.grade === g) + '">' + g + '</button>'; }).join('') + '</div>' +
      '<h2>2. 診断する教科を選んでください<small>(1〜5教科)</small></h2><div class="sd-grid" aria-label="教科">' + Object.keys(D.subj).filter(function (k) { return k !== 'info'; }).map(function (k) {
        var on = st.subs.indexOf(k) >= 0; return '<button type="button" class="sd-opt' + (on ? ' on' : '') + '" data-s="' + k + '" aria-pressed="' + on + '">' + h(D.subj[k]) + '</button>'; }).join('') + '</div>' +
      '<button type="button" class="sd-go" id="sdGo"' + (st.grade && st.subs.length ? '' : ' disabled') + '>診断をはじめる</button>' +
      '<p class="sd-note">答えはこの端末だけに保存され、送信されることはありません。</p></section>' +
      (prev ? '<p class="sd-prev">前回の結果(' + h(prev.date) + ')を<button type="button" class="sd-link" id="sdPrev">もう一度見る</button></p>' : '');
    root.querySelectorAll('[data-g]').forEach(function (b) { b.addEventListener('click', function () { st.grade = b.getAttribute('data-g'); start(); }); });
    root.querySelectorAll('[data-s]').forEach(function (b) { b.addEventListener('click', function () {
      var k = b.getAttribute('data-s'), i = st.subs.indexOf(k);
      if (i >= 0) st.subs.splice(i, 1); else if (st.subs.length < 5) st.subs.push(k);
      start();
    }); });
    var go = root.querySelector('#sdGo'); if (go) go.addEventListener('click', begin);
    var pv = root.querySelector('#sdPrev'); if (pv) pv.addEventListener('click', function () { result(prev); });
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
    run.cur = { q: q, subj: subj, u: u, ch: ch, dug: !!q.dug };
    root.innerHTML = '<div class="sd-bar"><span>' + (run.i + 1) + ' / ' + run.order.length + '</span><i style="width:' + Math.round(run.i / run.order.length * 100) + '%"></i></div>' +
      '<section class="sd-card sd-q"><p class="sd-meta"><b>' + h(D.subj[subj]) + '</b>' + h(u.stage) + '・' + h(u.name) + '<em>' + LV[q[1]] + '</em>' + (run.cur.dug ? '<em class="dig">前の単元をたしかめる問題</em>' : '') + '</p>' +
      '<p class="sd-text">' + h(q[2]).replace(/\n/g, '<br>') + '</p><div class="sd-choices">' +
      ch.map(function (c, i) { return '<button type="button" class="sd-c" data-c="' + i + '"><span>' + 'ABCD'[i] + '</span>' + h(c) + '</button>'; }).join('') +
      '<button type="button" class="sd-c sd-skip" data-c="-1">わからない</button></div></section>' +
      '<p class="sd-note">わからないときは、当てずっぽうより「わからない」を選ぶと、診断が正確になります。</p>';
    root.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function () { answer(+b.getAttribute('data-c')); }); });
    top();
  }
  function answer(i) {
    var c = run.cur, ok = i >= 0 && c.ch[i] === c.q[3][0], r = run.by[c.subj];
    run.ans.push({ s: c.subj, u: c.u.id, lv: c.q[1], ok: ok, skip: i < 0, dug: c.dug });
    if (ok) r.lv = Math.min(3, r.lv + 1);
    else {
      r.lv = Math.max(1, r.lv - 1);
      // 高校の単元をまちがえたら、その土台の単元を次に確かめる(さかのぼり)
      if (c.u.pre && c.u.pre.length) r.dig = c.u.pre.slice();
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
    var res = { date: new Date().toLocaleDateString('ja-JP'), grade: st.grade, subs: {}, weak: [], roots: [] };
    st.subs.forEach(function (k) {
      var a = run.ans.filter(function (x) { return x.s === k; }); if (!a.length) return;
      var w = { 1: 1, 2: 1.4, 3: 1.9 }, sc = 0, mx = 0;
      a.forEach(function (x) { mx += w[x.lv]; if (x.ok) sc += w[x.lv]; });
      var okHi = a.filter(function (x) { return x.ok && x.lv >= 2; }).length, okAll = a.filter(function (x) { return x.ok; }).length;
      // 到達レベル:難しさで重みをつけた正答率で決める(難関は難関の問題に正解していることが条件)
      var rate = sc / mx, okHard = a.some(function (x) { return x.ok && x.lv === 3; });
      var level = rate >= 0.75 && okHard ? 3 : rate >= 0.5 && okHi >= 1 ? 2 : 1;
      res.subs[k] = { n: a.length, ok: okAll, rate: Math.round(sc / mx * 100), level: level };
    });
    var seenW = {}, seenR = {};
    run.ans.forEach(function (x) {
      if (x.ok) return; var u = U(x.u);
      if (!seenW[u.id]) { seenW[u.id] = 1; res.weak.push([u.id, u.name, u.stage, x.s]); }
      if (x.dug && !seenR[u.id]) { seenR[u.id] = 1; res.roots.push([u.id, u.name, u.stage, x.s]); }
    });
    save(res); result(res);
  }
  function result(res) {
    var ks = Object.keys(res.subs);
    var lowest = ks.slice().sort(function (a, b) { return res.subs[a].rate - res.subs[b].rate; })[0];
    var html = '<ol class="g-crumb"><li><a href="home.html">Aqualium</a></li><li>無料診断テスト</li><li>結果</li></ol>' +
      '<section class="sd-hero"><p class="sd-en">Result</p><h1>診断の結果</h1><p>' + h(res.grade) + '・' + h(res.date) + '</p></section>' +
      '<section class="sd-card"><h2>教科ごとの到達レベル(目安)</h2><div class="sd-subs">' + ks.map(function (k) {
        var s = res.subs[k];
        return '<div class="sd-sub"><b>' + h(D.subj[k]) + '</b><div class="sd-meter" aria-label="到達レベル ' + LV[s.level] + '"><i class="' + (s.level >= 1 ? 'on' : '') + '"></i><i class="' + (s.level >= 2 ? 'on' : '') + '"></i><i class="' + (s.level >= 3 ? 'on' : '') + '"></i></div>' +
          '<span>' + LV[s.level] + 'レベル</span><small>' + s.ok + ' / ' + s.n + '問 正解</small></div>'; }).join('') + '</div>' +
      '<p class="sd-note">基礎=教科書の基本、標準=入試の標準問題、難関=難関校レベル。問題数が少ないため、あくまで目安です。</p></section>';
    if (res.roots.length) html += '<section class="sd-card sd-root"><h2>つまずきの「根っこ」かもしれない単元</h2><p>まちがえた問題の土台になっている前の単元でも、まちがいがありました。上の単元より先に、ここから学び直すと伸びやすくなります。</p><ul>' +
      res.roots.map(function (x) { return '<li><b>' + h(x[1]) + '</b><small>' + h(D.subj[x[3]]) + '・' + h(x[2]) + '</small></li>'; }).join('') + '</ul></section>';
    html += '<section class="sd-card"><h2>まちがえた単元</h2>' + (res.weak.length ? '<ul class="sd-weak">' + res.weak.map(function (x) {
      var u = U(x[0]), pre = (u.pre || []).map(U).filter(Boolean);
      return '<li><b>' + h(x[1]) + '</b><small>' + h(D.subj[x[3]]) + '・' + h(x[2]) + '</small>' + (pre.length ? '<span class="sd-pre">土台になる単元:' + pre.map(function (p) { return h(p.name) + '(' + h(p.stage) + ')'; }).join('、') + '</span>' : '') + '</li>'; }).join('') + '</ul>' : '<p>まちがえた問題はありませんでした。すばらしい！ より難しい問題で、伸ばせるところを探していきましょう。</p>') + '</section>';
    html += '<section class="sd-card sd-next"><h2>次にやること</h2><ol>' +
      (lowest ? '<li>いちばん伸びしろが大きいのは<b>' + h(D.subj[lowest]) + '</b>です。</li>' : '') +
      (res.roots.length ? '<li>まずは「根っこ」の単元(' + h(res.roots[0][1]) + ')を、基本から確かめましょう。</li>' : res.weak.length ? '<li>まちがえた単元の「土台になる単元」から確かめると、原因が見つかりやすくなります。</li>' : '') +
      '<li>15問の診断では分かることに限りがあります。Aqualium の受講では、全286単元の診断と、あなた専用の教材・1回30分の個別指導で、弱点を一つずつ解消していきます。</li></ol>' +
      '<div class="sd-ctas"><a class="sd-go" href="home.html#contact">受講について相談する</a><a class="sd-go sub" href="home.html#price">料金を見る</a><button type="button" class="sd-go sub" id="sdAgain">もう一度診断する</button></div>' +
      '<p class="sd-note">この結果は、この端末だけに保存されています。</p></section>' +
      '<section class="sd-card"><h2>あわせて読みたい</h2><ul class="sd-links"><li><a href="guide/nigate.html">本当の苦手単元の見つけ方</a></li><li><a href="guide/plan.html">志望校から逆算する受験勉強の計画の立て方</a></li></ul></section>';
    root.innerHTML = html;
    root.querySelector('#sdAgain').addEventListener('click', function () { st.grade = res.grade; start(); });
    top();
  }

  start();
})();
