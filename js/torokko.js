/*
 * トロッコゲーム:問題を読んで、A と B のどちらの線路に進むかを選ぶ2択ゲーム。
 * 正しい答えの線路に進むと得点。まちがえるか、分かれ道までに選べないとライフが1つ減る。
 * 問題は、アプリの単元の問題(正解+まちがいの選択肢1つ)と、単語帳(英単語・古文単語・漢字の読み)から作る。
 * 2択なので、学習の記録(正答率の分析)には入れない。記録:S.get().torokko = { best: { コース: 点 }, plays: 回数 }
 */
WPS.makeTorokko = function (ctx) {
  var S = WPS.Store, h = ctx.h, shuffle = ctx.shuffle;
  var LIVES = 3, T_START = 12, T_MIN = 6;
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
      '<p>問題を読んで、<b>A</b> と <b>B</b> のどちらの線路に進むかを選ぼう。トロッコが分かれ道に着くまでに選べないと、ミスになります。</p>' +
      '<ul class="trk-rule"><li>正解すると得点。連続で正解すると、ボーナスがつきます。</li><li>ミスは' + LIVES + '回まで。進むほど、トロッコが速くなります。</li><li>パソコンでは、← と → のキーでも選べます。</li></ul></section>';
    html += '<section class="card"><h2>コースを選ぶ</h2><div class="trk-courses">' + COURSES.map(function (c) {
      var b = r.best[c[0]];
      return '<button type="button" class="trk-course" data-tkgo="' + c[0] + '"><b>' + h(c[1]) + '</b><small>' + h(c[2]) + '</small>' + (b ? '<em>ベスト ' + b + '点</em>' : '') + '</button>';
    }).join('') + '</div><p class="hint">2択のゲームなので、ここでの正解・不正解は、正答率の分析には入りません。</p></section>';
    return html;
  }

  function result() {
    var r = last, html = '<section class="card trk-result"><h2>結果:' + h(courseName(r.course)) + '</h2>' +
      '<p class="trk-score"><b>' + r.score + '</b><span>点</span>' + (r.newBest ? '<em>ベスト更新</em>' : '') + '</p>' +
      '<p class="muted">正解 ' + r.okN + '問 / 最高 ' + r.maxCombo + '連続</p>' +
      '<div class="btn-row"><button type="button" class="btn primary" data-tkgo="' + r.course + '">もう一度</button></div>';
    if (r.miss.length) html += '<h3>まちがえた問題</h3><ul class="trk-miss">' + r.miss.map(function (m) {
      return '<li><p>' + h(m.t) + '</p><p><span class="trk-ans">' + h(m.ok) + '</span>' + (m.exp ? '<small>' + h(m.exp) + '</small>' : '') + '</p></li>';
    }).join('') + '</ul>';
    return html + '</section>';
  }

  function stage() {
    return '<div class="trk-game" id="tkGame">' +
      '<div class="trk-hud"><span class="trk-lives" id="tkLives" aria-label="のこりライフ"></span><span class="trk-pts"><b id="tkScore">0</b>点</span><span class="trk-combo" id="tkCombo"></span><button type="button" class="btn small" id="tkQuit">やめる</button></div>' +
      '<section class="card trk-q"><p class="trk-no" id="tkNo"></p><p class="trk-text" id="tkText" aria-live="polite"></p></section>' +
      '<div class="trk-ab"><button type="button" class="trk-btn" id="tkA" data-side="0"><i>A</i><span></span></button><button type="button" class="trk-btn" id="tkB" data-side="1"><i>B</i><span></span></button></div>' +
      '<svg class="trk-rail" viewBox="0 0 320 220" role="img" aria-label="トロッコと、AとBに分かれる線路">' +
      '<g class="trk-ties">' + ties() + '</g>' +
      '<path class="trk-line" d="M160 220 L160 120 L70 10"/><path class="trk-line" d="M160 220 L160 120 L250 10"/>' +
      '<path class="trk-sel" id="tkSel" d=""/>' +
      '<g id="tkCart" transform="translate(160 205)"><rect x="-17" y="-13" width="34" height="22" rx="5" class="trk-body"/><rect x="-21" y="-17" width="42" height="7" rx="3" class="trk-rim"/><circle cx="-10" cy="11" r="5" class="trk-wheel"/><circle cx="10" cy="11" r="5" class="trk-wheel"/></g>' +
      '<text id="tkMark" x="160" y="80" text-anchor="middle" class="trk-mark"></text>' +
      '</svg>' +
      '<p class="trk-fb" id="tkFb" aria-live="polite"></p></div>';
  }
  // まくら木(線路の横木)
  function ties() {
    var s = '', i, t, x, y;
    for (i = 0; i < 5; i++) { y = 210 - i * 20; s += '<line x1="148" y1="' + y + '" x2="172" y2="' + y + '"/>'; }
    for (i = 1; i <= 5; i++) { t = i / 5.5; y = 120 - 110 * t; x = 160 - 90 * t; s += '<line x1="' + (x - 11) + '" y1="' + (y - 5) + '" x2="' + (x + 11) + '" y2="' + (y + 5) + '"/>'; x = 160 + 90 * t; s += '<line x1="' + (x - 11) + '" y1="' + (y + 5) + '" x2="' + (x + 11) + '" y2="' + (y - 5) + '"/>'; }
    return s;
  }

  /* ---------- 進行 ---------- */
  function start(course) {
    var qs = shuffle(pool(course));
    if (qs.length < 4) { ctx.toast('このコースは、出せる問題がまだありません'); return; }
    g = { course: course, qs: qs, i: -1, score: 0, combo: 0, maxCombo: 0, okN: 0, lives: LIVES, miss: [], phase: 'idle' };
    last = null;
    ctx.render();
  }
  function el(id) { return document.getElementById(id); }
  function hud() {
    var l = '', i; for (i = 0; i < LIVES; i++) l += '<i class="' + (i < g.lives ? 'on' : '') + '"></i>';
    el('tkLives').innerHTML = l; el('tkScore').textContent = g.score;
    el('tkCombo').textContent = g.combo >= 2 ? g.combo + '連続' : '';
  }
  function next() {
    if (!g) return;
    g.i++;
    if (g.i >= g.qs.length) { g.qs = shuffle(g.qs); g.i = 0; }
    var q = g.qs[g.i];
    g.okSide = Math.random() < 0.5 ? 0 : 1;
    g.side = -1; g.phase = 'run'; g.t0 = performance.now();
    g.limit = Math.max(T_MIN, T_START - Math.floor(g.okN / 5)) * 1000;
    el('tkNo').textContent = (g.okN + g.miss.length + 1) + '問目' + (q.word ? '・意味はどっち?' : '');
    var tx = el('tkText'); tx.textContent = q.t; tx.className = 'trk-text' + (q.word ? ' word' : '');
    [el('tkA'), el('tkB')].forEach(function (b, k) { b.querySelector('span').textContent = k === g.okSide ? q.ok : q.ng; b.className = 'trk-btn'; b.disabled = false; });
    el('tkSel').setAttribute('d', ''); el('tkMark').textContent = ''; el('tkFb').textContent = '';
    hud(); loop();
  }
  function choose(side) {
    if (!g || g.phase !== 'run') return;
    g.side = side; g.phase = 'go'; g.t1 = performance.now(); g.p1 = g.pos || 0;
    g.left = g.limit - (g.t1 - g.t0);
    el(side ? 'tkB' : 'tkA').classList.add('sel');
    el('tkA').disabled = el('tkB').disabled = true;
    el('tkSel').setAttribute('d', 'M160 220 L160 120 L' + (side ? 250 : 70) + ' 10');
  }
  // 線路の上の位置。p は 0(スタート)〜1(分かれ道)〜2(線路の終わり)
  function place(p, side) {
    var x = 160, y, a = 0;
    if (p <= 1) y = 205 - 85 * p;
    else { var t = Math.min(1, p - 1); x = 160 + (side ? 1 : -1) * 78 * t; y = 120 - 92 * t; a = (side ? 1 : -1) * 38 * Math.min(1, t * 4); }
    el('tkCart').setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + a.toFixed(1) + ')');
  }
  function loop() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function step(now) {
      if (!g || !el('tkGame')) return;                      // ほかの画面に移ったら止める
      if (g.phase === 'run') {
        g.pos = Math.min(1, (now - g.t0) / g.limit); place(g.pos, 0);
        if (g.pos >= 1) { judge(false, true); return; }
      } else if (g.phase === 'go') {
        var p = g.p1 + (now - g.t1) / 450;                    // 選んだら、一気に走る
        place(p, g.side);
        if (p >= 2) { judge(g.side === g.okSide, false); return; }
      } else return;
      raf = requestAnimationFrame(step);
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
      mark.textContent = '○'; mark.setAttribute('class', 'trk-mark ok'); fb.textContent = '正解! +' + gain + '点';
    } else {
      g.combo = 0; g.lives--; g.miss.push(q);
      mark.textContent = '✕'; mark.setAttribute('class', 'trk-mark ng');
      fb.textContent = (timeout ? '時間切れ。' : '') + '正解は「' + q.ok + '」';
      el('tkGame').classList.add('shake'); setTimeout(function () { var x = el('tkGame'); if (x) x.classList.remove('shake'); }, 400);
    }
    hud();
    setTimeout(function () { if (!g || !el('tkGame')) return; if (g.lives <= 0) finish(); else next(); }, ok ? 800 : 2000);
  }
  function finish() {
    cancelAnimationFrame(raf);
    if (!g) return;
    var r = rec(), old = r.best[g.course] || 0, played = g.okN + g.miss.length;
    last = { course: g.course, score: g.score, okN: g.okN, maxCombo: g.maxCombo, miss: g.miss.slice(0, 20), newBest: g.score > old && g.score > 0 };
    if (played) { r.plays = (r.plays || 0) + 1; if (g.score > old) r.best[g.course] = g.score; S.save(); }
    else last = null;
    g = null; ctx.render();
  }

  document.addEventListener('keydown', function (e) {
    if (!g || g.phase !== 'run' || !el('tkGame')) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); choose(0); }
    else if (e.key === 'ArrowRight' || e.key === 'b' || e.key === 'B') { e.preventDefault(); choose(1); }
  });

  function renderFn() { return g ? stage() : menu(); }
  renderFn.after = function () {
    document.querySelectorAll('[data-tkgo]').forEach(function (b) { b.addEventListener('click', function () { start(b.getAttribute('data-tkgo')); }); });
    if (!g) return;
    el('tkA').addEventListener('click', function () { choose(0); });
    el('tkB').addEventListener('click', function () { choose(1); });
    el('tkQuit').addEventListener('click', finish);
    if (g.phase === 'idle') next(); else { g = null; ctx.render(); }   // 画面を作り直したときは、メニューにもどす
  };
  return { render: renderFn, inMode: function () { return !!g; }, pool: pool, courses: COURSES };
};
