/*
 * トロッコゲーム:問題を読んで、A と B のどちらの線路に進むかを選ぶ2択ゲーム。
 * 正しい答えの線路に進むと得点。まちがえるか、分かれ道までに選べないとライフが1つ減る。全20問でゴール。
 * 遊ぶ画面は全画面で、奥へのびる線路をキャンバスに描く(セミ3D)。
 * 問題は、アプリの単元の問題(正解+まちがいの選択肢1つ)と、単語帳(英単語・古文単語・漢字の読み)から作る。
 * 2択なので、学習の記録(正答率の分析)には入れない。記録:S.get().torokko = { best: { コース: 点 }, plays: 回数 }
 */
WPS.makeTorokko = function (ctx) {
  var S = WPS.Store, h = ctx.h, shuffle = ctx.shuffle;
  var LIVES = 3, T_START = 12, T_MIN = 6, GOAL = 20, LIFE_BONUS = 20, GO_MS = 900;
  var COURSES = [
    ['all', '全教科ミックス', '5教科の問題からまんべんなく'],
    ['eng', '英語(文法)', '時制・関係詞・語法など'],
    ['math', '数学', '計算・公式・考え方'],
    ['jpn', '国語', '現代文・古文・漢文の知識'],
    ['sci', '理科', '物理・化学・生物・地学'],
    ['soc', '社会', '歴史・地理・公民'],
    ['w:en_jhb', '英単語(中学)', '英語 → 日本語の意味'],
    ['w:en_h', '英単語(高校)', '英語 → 日本語の意味'],
    ['w:kogo', '古文単語', '古語 → 現代語の意味'],
    ['w:kanji', '漢字の読み', '漢字 → 読み方']
  ];
  var g = null;      // 進行中のゲーム
  var last = null;   // 直前の結果
  var raf = 0;

  function rec() { var s = S.get(); s.torokko = s.torokko || { best: {}, plays: 0 }; s.torokko.best = s.torokko.best || {}; return s.torokko; }
  function courseName(id) { var c = COURSES.filter(function (x) { return x[0] === id; })[0]; return c ? c[1] : ''; }
  function isJh() { return /^中/.test((S.get().profile || {}).grade || ''); }

  // コースの問題を作る。1問 = { t: 問題文, ok: 正解, ng: まちがい, exp: 解説 }
  function pool(id) {
    var out = [];
    if (id.indexOf('w:') === 0) {
      var bank = (WPS.BANK || {})[id.slice(2)] || [];
      var ms = bank.map(function (x) { return x.m; });
      bank.forEach(function (x) {
        if (!x.t || !x.m || x.m.length > 18) return;
        var ng = '', k = 0;
        while (k++ < 12) { ng = ms[Math.floor(Math.random() * ms.length)]; if (ng && ng !== x.m && ng.length <= 18) break; ng = ''; }
        if (ng) out.push({ t: x.t, ok: x.m, ng: ng, exp: '', word: 1 });
      });
      return out;
    }
    var jh = isJh();
    WPS.UNITS.forEach(function (u) {
      if (id !== 'all' && u.subj !== id) return;
      if (id === 'all' && u.subj === 'info') return;
      if (jh && !/^中/.test(u.stage)) return;
      u.questions.forEach(function (q) {
        if (q.fig || q.text.length > 70) return;
        var wrong = q.choices.filter(function (c) { return c !== q.answer && String(c).length <= 18; });
        if (!wrong.length || String(q.answer).length > 18) return;
        out.push({ t: q.text, ok: String(q.answer), ng: String(wrong[Math.floor(Math.random() * wrong.length)]), exp: q.exp || '', subj: u.subj });
      });
    });
    return out;
  }

  /* ---------- 画面 ---------- */
  function menu() {
    var r = rec();
    var html = (last ? result() : '') + '<section class="card trk-intro"><h2>トロッコゲーム</h2>' +
      '<p>問題を読んで、<b>A</b> と <b>B</b> のどちらの線路に進むかを選ぼう。<b>全' + GOAL + '問</b>。' + GOAL + '問目の分かれ道をこえると<b>ゴール</b>です。</p>' +
      '<ul class="trk-rule"><li>1問の制限時間は' + T_START + '秒。残りの秒数は、画面の上に出ます。5問正解するごとに1秒ずつ短くなります(最短' + T_MIN + '秒)。</li>' +
      '<li>正解すると得点。連続で正解したり、早く答えたりすると、ボーナスがつきます。</li>' +
      '<li>まちがい・時間切れは' + LIVES + '回まで。' + LIVES + '回目で脱線して、そこで終わりです。</li>' +
      '<li>ゴールすると、残ったライフ1つにつき' + LIFE_BONUS + '点のボーナスがつきます。</li>' +
      '<li>全画面で遊びます。パソコンでは、← と → のキーでも選べます。</li></ul></section>';
    html += '<section class="card"><h2>コースを選ぶ</h2><div class="trk-courses">' + COURSES.map(function (c) {
      var b = r.best[c[0]];
      return '<button type="button" class="trk-course" data-tkgo="' + c[0] + '"><b>' + h(c[1]) + '</b><small>' + h(c[2]) + '</small>' + (b ? '<em>ベスト ' + b + '点</em>' : '') + '</button>';
    }).join('') + '</div><p class="hint">2択のゲームなので、ここでの正解・不正解は、正答率の分析には入りません。</p></section>';
    return html;
  }

  function result() {
    var r = last, html = '<section class="card trk-result"><h2>' + (r.goal ? 'ゴール!' : '脱線…') + ' ' + h(courseName(r.course)) + '</h2>' +
      '<p class="trk-score"><b>' + r.score + '</b><span>点</span>' + (r.newBest ? '<em>ベスト更新</em>' : '') + '</p>' +
      '<p class="muted">' + (r.goal ? '全' + GOAL + '問を走りきりました' + (r.bonus ? '(ライフのボーナス +' + r.bonus + '点)' : '') + '。' : GOAL + '問中 ' + r.n + '問目で終わりました。') + '正解 ' + r.okN + '問 / 最高 ' + r.maxCombo + '連続</p>' +
      '<div class="btn-row"><button type="button" class="btn primary" data-tkgo="' + r.course + '">もう一度</button></div>';
    if (r.miss.length) html += '<h3>まちがえた問題</h3><ul class="trk-miss">' + r.miss.map(function (m) {
      return '<li><p>' + h(m.t) + '</p><p><span class="trk-ans">' + h(m.ok) + '</span>' + (m.exp ? '<small>' + h(m.exp) + '</small>' : '') + '</p></li>';
    }).join('') + '</ul>';
    return html + '</section>';
  }

  function stage() {
    var fs = document.documentElement.requestFullscreen ? '<button type="button" class="trk-hbtn" id="tkFs">全画面</button>' : '';
    return '<div class="trk-full" id="tkGame">' +
      '<canvas class="trk-cv" id="tkCv" aria-label="奥へのびる線路と、AとBの分かれ道"></canvas>' +
      '<div class="trk-top">' +
      '<div class="trk-hud"><span class="trk-lives" id="tkLives" aria-label="のこりライフ"></span><span class="trk-pts"><b id="tkScore">0</b>点</span><span class="trk-combo" id="tkCombo"></span>' + fs + '<button type="button" class="trk-hbtn" id="tkQuit">やめる</button></div>' +
      '<div class="trk-prog"><span class="trk-prog-t"><b id="tkNo">1</b> / ' + GOAL + '問<small>(' + GOAL + '問でゴール)</small></span><span class="trk-bar"><i id="tkProg"></i></span><span class="trk-flag" aria-hidden="true">GOAL</span></div>' +
      '<div class="trk-time"><span class="trk-sec" aria-label="残り時間">残り <b id="tkSec">0</b> 秒</span><span class="trk-bar trk-tbar"><i id="tkTime"></i></span></div>' +
      '<section class="trk-q"><p class="trk-kind" id="tkKind"></p><p class="trk-text" id="tkText" aria-live="polite"></p></section>' +
      '<div class="trk-ab"><button type="button" class="trk-btn" id="tkA"><i>A</i><span></span><em>← 左の線路</em></button><button type="button" class="trk-btn" id="tkB"><i>B</i><span></span><em>右の線路 →</em></button></div>' +
      '</div>' +
      '<p class="trk-mark" id="tkMark" aria-hidden="true"></p>' +
      '<p class="trk-fb" id="tkFb" aria-live="polite"></p></div>';
  }

  /* ---------- セミ3Dの絵(キャンバス) ----------
   * 線路の上の位置 s(0 = 出発、F = 分かれ道、F+L = ゲート)。カメラはトロッコの少し後ろから前を見る。
   * 世界の座標 (x: 左右, z: 奥行き) を、遠いものほど小さく・地平線に近く描く。 */
  var F = 36, L = 16, W = 6, GAUGE = 0.75, BACK = 7.5, CAMH = 3.6;
  var cv = null, c2 = null, vw = 0, vh = 0, fl = 0, hy = 0, camX = 0, camZ = 0;
  function ease(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
  function px(s, side) { return s <= F ? 0 : side * W * ease((s - F) / L); }
  function pj(x, z, y) { var d = z - camZ; if (d < 0.7) return null; var k = fl / d; return [vw / 2 + (x - camX) * k, hy + (CAMH - (y || 0)) * k, k]; }
  function size() {
    if (!cv) return;
    var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    vw = Math.max(200, r.width); vh = Math.max(200, r.height);
    cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
    c2.setTransform(dpr, 0, 0, dpr, 0, 0);
    var top = document.querySelector('.trk-top'), th = top ? top.getBoundingClientRect().height : vh * 0.4;
    // 地平線は、上の問題パネルのすぐ下あたりに置く(パネルが大きいときも、線路が見えるように)
    hy = Math.min(vh * 0.62, th + (vh - th) * 0.16);
    fl = Math.min((vh - hy) * 1.75, vw * 1.9);
  }
  function quad(a, b, c, d, col) { if (!a || !b || !c || !d) return; c2.fillStyle = col; c2.beginPath(); c2.moveTo(a[0], a[1]); c2.lineTo(b[0], b[1]); c2.lineTo(c[0], c[1]); c2.lineTo(d[0], d[1]); c2.closePath(); c2.fill(); }
  function ties(from, to, side) {
    for (var s = Math.floor(to / 2) * 2; s >= from; s -= 2) {
      if (s - camZ < 0.8) break;
      var x = px(s, side);
      quad(pj(x - 1.25, s), pj(x + 1.25, s), pj(x + 1.25, s + 0.42), pj(x - 1.25, s + 0.42), '#8a6b4a');
    }
  }
  function rails(from, to, side, col) {
    [-GAUGE, GAUGE].forEach(function (o) {
      var prev = null;
      for (var s = Math.max(from, camZ + 0.8); s <= to + 0.01; s += 1) {
        var p = pj(px(s, side) + o, s, 0.12);
        if (p && prev) { c2.strokeStyle = col; c2.lineWidth = Math.max(1.2, 0.13 * (p[2] + prev[2]) / 2); c2.lineCap = 'round'; c2.beginPath(); c2.moveTo(prev[0], prev[1]); c2.lineTo(p[0], p[1]); c2.stroke(); }
        prev = p;
      }
    });
  }
  function gate(side, label) {
    var z = F + L, x = px(z, side), a = pj(x - 1.9, z), b = pj(x + 1.9, z), ta = pj(x - 1.9, z, 3.6), tb = pj(x + 1.9, z, 3.6);
    if (!a || !b || !ta || !tb) return;
    var k = a[2], st = g.phase === 'show' || g.phase === 'end' ? (side === (g.okSide ? 1 : -1) ? 'ok' : (g.side >= 0 && side === (g.side ? 1 : -1) ? 'ng' : '')) : (g.side >= 0 && side === (g.side ? 1 : -1) ? 'sel' : '');
    var col = st === 'ok' ? '#16a34a' : st === 'ng' ? '#dc2626' : st === 'sel' ? '#2f5bd3' : '#475569';
    c2.strokeStyle = '#3f3f46'; c2.lineWidth = Math.max(2, 0.22 * k); c2.lineCap = 'butt';
    c2.beginPath(); c2.moveTo(a[0], a[1]); c2.lineTo(ta[0], ta[1]); c2.moveTo(b[0], b[1]); c2.lineTo(tb[0], tb[1]); c2.stroke();
    var bh = 1.5 * k, by = ta[1] - bh * 0.25;
    c2.fillStyle = col; c2.fillRect(ta[0] - 0.2 * k, by, tb[0] - ta[0] + 0.4 * k, bh);
    c2.fillStyle = '#fff'; c2.font = '700 ' + Math.max(10, bh * 0.78) + 'px sans-serif'; c2.textAlign = 'center'; c2.textBaseline = 'middle';
    c2.fillText(label, (ta[0] + tb[0]) / 2, by + bh / 2 + 1);
  }
  function tree(x, z) {
    var b = pj(x, z), t = pj(x, z, 3.4); if (!b || !t) return;
    var k = b[2];
    c2.fillStyle = '#6b4f35'; c2.fillRect(b[0] - 0.12 * k, b[1] - 0.9 * k, 0.24 * k, 0.9 * k);
    c2.fillStyle = '#2f8f5b'; c2.beginPath(); c2.moveTo(b[0] - 1.1 * k, b[1] - 0.7 * k); c2.lineTo(b[0] + 1.1 * k, b[1] - 0.7 * k); c2.lineTo(t[0], t[1]); c2.closePath(); c2.fill();
    c2.fillStyle = '#3aa66c'; c2.beginPath(); c2.moveTo(b[0] - 0.8 * k, b[1] - 1.7 * k); c2.lineTo(b[0] + 0.8 * k, b[1] - 1.7 * k); c2.lineTo(t[0], t[1] - 0.5 * k); c2.closePath(); c2.fill();
  }
  function cart(now) {
    var side = g.side >= 0 ? (g.side ? 1 : -1) : 0, x = px(g.s, side), p = pj(x, g.s); if (!p) return;
    var k = p[2], lean = (px(g.s + 1.5, side) - px(g.s - 1.5, side)) * 0.05, bob = g.phase === 'show' || g.phase === 'end' ? 0 : Math.sin(now / 70) * 0.012 * k;
    c2.save(); c2.translate(p[0], p[1] + bob); c2.rotate(lean);
    c2.fillStyle = 'rgba(0,0,0,.22)'; c2.beginPath(); c2.ellipse(0, 0.02 * k, 1.05 * k, 0.16 * k, 0, 0, 6.3); c2.fill();
    c2.fillStyle = '#27272a'; c2.fillRect(-GAUGE * k - 0.13 * k, -0.42 * k, 0.26 * k, 0.42 * k); c2.fillRect(GAUGE * k - 0.13 * k, -0.42 * k, 0.26 * k, 0.42 * k);
    // 箱(うしろの面と、少し見える上の面)
    c2.fillStyle = '#1f7a5c'; c2.beginPath(); c2.moveTo(-0.95 * k, -1.35 * k); c2.lineTo(0.95 * k, -1.35 * k); c2.lineTo(0.8 * k, -0.3 * k); c2.lineTo(-0.8 * k, -0.3 * k); c2.closePath(); c2.fill();
    c2.fillStyle = '#145a43'; c2.beginPath(); c2.moveTo(-0.95 * k, -1.35 * k); c2.lineTo(0.95 * k, -1.35 * k); c2.lineTo(0.78 * k, -1.56 * k); c2.lineTo(-0.78 * k, -1.56 * k); c2.closePath(); c2.fill();
    c2.fillStyle = '#0f172a'; c2.fillRect(-1.02 * k, -1.42 * k, 2.04 * k, 0.15 * k);
    c2.fillStyle = 'rgba(255,255,255,.16)'; c2.fillRect(-0.62 * k, -1.2 * k, 0.16 * k, 0.8 * k); c2.fillRect(0.46 * k, -1.2 * k, 0.16 * k, 0.8 * k);
    c2.restore();
  }
  function draw(now) {
    if (!c2) return;
    var side = g.side >= 0 ? (g.side ? 1 : -1) : 0, i, z;
    camZ = g.s - BACK; camX = px(g.s - BACK * 0.18, side);
    var sky = c2.createLinearGradient(0, 0, 0, hy); sky.addColorStop(0, '#7cc4f2'); sky.addColorStop(1, '#dff2fb');
    c2.fillStyle = sky; c2.fillRect(0, 0, vw, hy + 1);
    // 遠くの山(カメラが横に動くと、少しだけずれる)
    c2.fillStyle = '#9fcfb4'; c2.beginPath(); c2.moveTo(0, hy);
    for (i = 0; i <= 12; i++) { var mx = i / 12 * vw; c2.lineTo(mx, hy - (18 + 26 * Math.abs(Math.sin(i * 1.7 + 0.6))) * (vh / 700) - 0); }
    c2.lineTo(vw, hy); c2.closePath(); c2.fill();
    var gr = c2.createLinearGradient(0, hy, 0, vh); gr.addColorStop(0, '#a8d8a0'); gr.addColorStop(1, '#6dbb74');
    c2.fillStyle = gr; c2.fillRect(0, hy, vw, vh - hy);
    // 砂利の道床
    [[0, F, 0]].concat(side <= 0 ? [[F, F + L + 14, -1]] : []).concat(side >= 0 ? [[F, F + L + 14, 1]] : []).forEach(function (seg) {
      for (var s = seg[1]; s > Math.max(seg[0], camZ + 0.8); s -= 1) { var x0 = px(s, seg[2]), x1 = px(s - 1, seg[2]); quad(pj(x0 - 1.7, s), pj(x0 + 1.7, s), pj(x1 + 1.7, s - 1), pj(x1 - 1.7, s - 1), '#c9bfae'); }
    });
    // 木(遠いものから)
    for (z = Math.floor((camZ + 70) / 7) * 7; z > camZ + 1; z -= 7) { var hsh = Math.abs(Math.sin(z * 12.9898)) * 5; tree(-10.5 - hsh, z); tree(10.5 + hsh, z + 3); }
    if (side <= 0) { ties(F, F + L + 14, -1); rails(F, F + L + 14, -1, '#52525b'); }
    if (side >= 0) { ties(F, F + L + 14, 1); rails(F, F + L + 14, 1, '#52525b'); }
    ties(camZ, F, 0); rails(camZ, F, 0, '#52525b');
    if (g.side >= 0) rails(Math.max(camZ, g.s), F + L, side, '#2f5bd3');
    if (side <= 0) gate(-1, 'A'); if (side >= 0) gate(1, 'B');
    cart(now);
    if (g.fade > 0) { c2.fillStyle = 'rgba(255,255,255,' + g.fade.toFixed(2) + ')'; c2.fillRect(0, 0, vw, vh); }
  }

  /* ---------- 進行 ---------- */
  function start(course) {
    var qs = shuffle(pool(course));
    if (qs.length < 4) { ctx.toast('このコースは、出せる問題がまだありません'); return; }
    g = { course: course, qs: qs, i: -1, n: 0, score: 0, combo: 0, maxCombo: 0, okN: 0, lives: LIVES, miss: [], phase: 'idle', s: 0, side: -1, fade: 0 };
    last = null;
    ctx.render();
  }
  function el(id) { return document.getElementById(id); }
  function hud() {
    var l = '', i; for (i = 0; i < LIVES; i++) l += '<i class="' + (i < g.lives ? 'on' : '') + '"></i>';
    el('tkLives').innerHTML = l; el('tkScore').textContent = g.score;
    el('tkCombo').textContent = g.combo >= 2 ? g.combo + '連続' : '';
    el('tkNo').textContent = Math.min(GOAL, g.n);
    el('tkProg').style.width = Math.round((g.n - (g.phase === 'run' || g.phase === 'go' ? 1 : 0)) / GOAL * 100) + '%';
  }
  function clock(left) {
    var sec = el('tkSec'), bar = el('tkTime'); if (!sec) return;
    left = Math.max(0, left);
    sec.textContent = Math.ceil(left / 1000);
    bar.style.width = (left / g.limit * 100).toFixed(1) + '%';
    var low = left <= 3000; sec.parentNode.classList.toggle('low', low); bar.classList.toggle('low', low);
  }
  function next() {
    if (!g) return;
    g.i++; g.n++;
    if (g.i >= g.qs.length) { g.qs = shuffle(g.qs); g.i = 0; }
    var q = g.qs[g.i];
    g.okSide = Math.random() < 0.5 ? 0 : 1;
    g.side = -1; g.phase = 'run'; g.s = 0; g.fade = g.n > 1 ? 1 : 0; g.t0 = performance.now();
    g.limit = Math.max(T_MIN, T_START - Math.floor(g.okN / 5)) * 1000;
    el('tkKind').textContent = q.word ? '意味はどっち?' : (g.n === GOAL ? 'さいごの問題' : '');
    var tx = el('tkText'); tx.textContent = q.t; tx.className = 'trk-text' + (q.word ? ' word' : '');
    [el('tkA'), el('tkB')].forEach(function (b, k) { b.querySelector('span').textContent = k === g.okSide ? q.ok : q.ng; b.className = 'trk-btn'; b.disabled = false; });
    var m = el('tkMark'); m.textContent = ''; m.className = 'trk-mark'; el('tkFb').textContent = '';
    hud(); clock(g.limit); size(); loop();
  }
  function choose(side) {
    if (!g || g.phase !== 'run') return;
    var now = performance.now();
    g.side = side; g.phase = 'go'; g.t1 = now; g.s1 = g.s;
    g.left = g.limit - (now - g.t0);
    el(side ? 'tkB' : 'tkA').classList.add('sel');
    el('tkA').disabled = el('tkB').disabled = true;
  }
  function loop() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function step(now) {
      if (!g || !el('tkGame')) return;                      // ほかの画面に移ったら止める
      if (g.fade > 0) g.fade = Math.max(0, g.fade - 0.06);
      if (g.phase === 'run') {
        var e = now - g.t0;
        g.s = Math.min(F - 1.5, e / g.limit * (F - 1.5));    // 制限時間ちょうどで、分かれ道の手前に着く
        clock(g.limit - e);
        if (e >= g.limit) { draw(now); judge(false, true); }
      } else if (g.phase === 'go') {
        var t = Math.min(1, (now - g.t1) / GO_MS);           // 選んだら、ゲートまで一気に走る
        g.s = g.s1 + (F + L - 9 - g.s1) * (t * t * (3 - 2 * t));
        if (t >= 1) { draw(now); judge(g.side === g.okSide, false); }
      }
      draw(now);
      raf = requestAnimationFrame(step);                     // 判定を見せているあいだも、絵は描きつづける
    });
  }
  function judge(ok, timeout) {
    var q = g.qs[g.i]; g.phase = 'show';
    el('tkA').disabled = el('tkB').disabled = true;
    el(g.okSide ? 'tkB' : 'tkA').classList.add('ok');
    if (!ok && g.side >= 0) el(g.side ? 'tkB' : 'tkA').classList.add('ng');
    var mark = el('tkMark'), fb = el('tkFb');
    if (ok) {
      g.combo++; g.okN++; g.maxCombo = Math.max(g.maxCombo, g.combo);
      var gain = 10 + Math.min(10, (g.combo - 1) * 2) + Math.round(Math.max(0, g.left) / g.limit * 5);
      g.score += gain;
      mark.textContent = '○'; mark.className = 'trk-mark ok'; fb.textContent = '正解! +' + gain + '点';
    } else {
      g.combo = 0; g.lives--; g.miss.push(q);
      mark.textContent = '✕'; mark.className = 'trk-mark ng';
      fb.textContent = (timeout ? '時間切れ。' : '') + '正解は「' + q.ok + '」';
      el('tkGame').classList.add('shake'); setTimeout(function () { var x = el('tkGame'); if (x) x.classList.remove('shake'); }, 400);
    }
    hud();
    var goal = g.n >= GOAL && g.lives > 0;
    if (goal) { g.bonus = g.lives * LIFE_BONUS; g.score += g.bonus; }
    setTimeout(function () {
      if (!g || !el('tkGame')) return;
      if (goal) { g.phase = 'end'; mark.textContent = 'GOAL'; mark.className = 'trk-mark goal'; fb.textContent = 'ゴール! ライフのボーナス +' + g.bonus + '点'; hud(); setTimeout(function () { if (g && el('tkGame')) finish(true); }, 1500); }
      else if (g.lives <= 0) { g.phase = 'end'; mark.textContent = '脱線'; mark.className = 'trk-mark ng small'; setTimeout(function () { if (g && el('tkGame')) finish(false); }, 1100); }
      else next();
    }, ok ? 850 : 2000);
  }
  function finish(goal) {
    cancelAnimationFrame(raf);
    if (!g) return;
    var r = rec(), old = r.best[g.course] || 0, played = g.okN + g.miss.length;
    last = { course: g.course, score: g.score, okN: g.okN, n: g.n, goal: goal === true, bonus: goal === true ? g.bonus : 0, maxCombo: g.maxCombo, miss: g.miss.slice(0, 20), newBest: g.score > old && g.score > 0 };
    if (played) { r.plays = (r.plays || 0) + 1; if (g.score > old) r.best[g.course] = g.score; S.save(); }
    else last = null;
    g = null; cv = c2 = null;
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { }
    ctx.render();
  }

  document.addEventListener('keydown', function (e) {
    if (!g || !el('tkGame')) return;
    if (e.key === 'Escape' && !document.fullscreenElement) { finish(); return; }
    if (g.phase !== 'run') return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); choose(0); }
    else if (e.key === 'ArrowRight' || e.key === 'b' || e.key === 'B') { e.preventDefault(); choose(1); }
  });
  window.addEventListener('resize', function () { if (g && el('tkGame')) size(); });

  function renderFn() { return g ? stage() : menu(); }
  renderFn.after = function () {
    document.querySelectorAll('[data-tkgo]').forEach(function (b) { b.addEventListener('click', function () { start(b.getAttribute('data-tkgo')); }); });
    if (!g) return;
    if (g.phase !== 'idle') { g = null; ctx.render(); return; }   // 画面を作り直したときは、メニューにもどす
    cv = el('tkCv'); c2 = cv.getContext('2d');
    el('tkA').addEventListener('click', function () { choose(0); });
    el('tkB').addEventListener('click', function () { choose(1); });
    el('tkQuit').addEventListener('click', function () { finish(); });
    // 絵の左半分・右半分を押しても選べる
    cv.addEventListener('click', function (e) { var r = cv.getBoundingClientRect(); choose(e.clientX - r.left < r.width / 2 ? 0 : 1); });
    var fs = el('tkFs');
    if (fs) fs.addEventListener('click', function () { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (e) { } });
    next();
  };
  return { render: renderFn, inMode: function () { return !!g; }, pool: pool, courses: COURSES, goal: GOAL };
};
