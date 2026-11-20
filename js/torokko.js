/*
 * トロッコゲーム:問題を読んで、どの線路に進むかを選ぶゲーム。遊ぶ画面は全画面で、奥へのびる線路をキャンバスに描く(セミ3D)。
 *  ・ゲーム(2択):A・B の2本の線路。全20問でゴール。まちがい・時間切れ3回で脱線。コースは教科書別と単語帳別。
 *     2択なので、学習の記録(正答率の分析)には入れない。記録:S.get().torokko = { best: { コース: 点 }, plays: 回数 }
 *  ・単元クリアテスト(4択):A〜D の4本の線路。10問を最後まで解き、8割で合格。こちらは学習の記録に入れる
 *     (記録と合否は app.js 側の ctx.test.answer / ctx.test.done が受け持つ)。
 */
WPS.makeTorokko = function (ctx) {
  var S = WPS.Store, h = ctx.h, shuffle = ctx.shuffle;
  var LIVES = 3, T_START = 12, T_MIN = 6, GOAL = 20, LIFE_BONUS = 20, GO_MS = 900;
  var T_TEST = { 1: 20, 2: 30, 3: 45 };   // クリアテストの制限時間(秒):知識・理解・応用
  var IQ_BOOK = { soc_geo: 'geo', soc_kokyo: 'seikei', soc_rinri: 'rinri', sci_phy: 'phys', sci_chem: 'chem', sci_bio: 'bio', sci_geo: 'earth' };
  var g = null;      // 進行中のゲーム
  var last = null;   // 直前の結果
  var raf = 0;
  var pick = { book: '', unit: '' };   // クリアテストの選びかけ

  function rec() { var s = S.get(); s.torokko = s.torokko || { best: {}, plays: 0 }; s.torokko.best = s.torokko.best || {}; return s.torokko; }
  function isJh() { return /^中/.test((S.get().profile || {}).grade || ''); }
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  function unitsOf(cid) {
    var out = [];
    (WPS.CURRICULUM || []).forEach(function (gr) { gr.courses.forEach(function (c) { if (c.id === cid) out = WPS.courseUnits(gr, c); }); });
    return out;
  }

  /* ---------- 問題を作る(2択のゲーム用)。1問 = { t: 問題文, ok: 正解, ng: まちがい, exp: 解説 } ---------- */
  function fromQ(q, out) {
    if (!q || q.fig || q.text.length > 70 || String(q.answer).length > 18) return;
    var wrong = q.choices.filter(function (c) { return c !== q.answer && String(c).length <= 18; });
    if (wrong.length) out.push({ t: q.text, ok: String(q.answer), ng: String(rnd(wrong)), exp: q.exp || '' });
  }
  function fromUnits(units, out) {
    units.forEach(function (u) {
      u.questions.forEach(function (q) { fromQ(q, out); });
      if (WPS.GEN && WPS.GEN[u.id]) for (var k = 0; k < 8; k++) fromQ(WPS.Q(WPS.genId(u.id)), out);   // 自動で作る問題も少し足す
    });
  }
  // 一問一答(答えが1語の問題):同じ分野のほかの答えを、まちがいの選択肢にする
  function fromIq(list, out) {
    var by = {};
    list.forEach(function (x) { (by[x.yo] = by[x.yo] || []).push(x.a); });
    list.forEach(function (x) {
      if (!x.q || !x.a || x.q.length > 70 || x.a.length > 18) return;
      var ng = '', k = 0, src = by[x.yo].length > 3 ? by[x.yo] : list.map(function (y) { return y.a; });
      while (k++ < 12) { ng = rnd(src); if (ng && ng !== x.a && ng.length <= 18) break; ng = ''; }
      if (ng) out.push({ t: x.q, ok: x.a, ng: ng, exp: '' });
    });
  }
  function fromBank(bank, out) {
    var ms = bank.map(function (x) { return x.m; });
    bank.forEach(function (x) {
      if (!x.t || !x.m || x.m.length > 18 || x.t.length > 40) return;
      var ng = '', k = 0;
      while (k++ < 12) { ng = rnd(ms); if (ng && ng !== x.m && ng.length <= 18) break; ng = ''; }
      if (ng) out.push({ t: x.t, ok: x.m, ng: ng, exp: '', word: 1 });
    });
  }
  function pool(id) {
    var out = [], key = id.slice(id.indexOf(':') + 1);
    if (id.indexOf('w:') === 0) fromBank((WPS.BANK || {})[key] || [], out);
    else if (id.indexOf('iq:') === 0) fromIq((WPS.IQ || {})[key] || [], out);
    else if (id.indexOf('c:') === 0) {
      fromUnits(unitsOf(key), out);
      if (key === 'soc_wh') fromIq(WPS.WHQ || [], out);
      if (key === 'soc_jh') fromIq(WPS.JHQ || [], out);
      if (IQ_BOOK[key]) fromIq((WPS.IQ || {})[IQ_BOOK[key]] || [], out);
    } else {
      var jh = isJh();
      fromUnits(WPS.UNITS.filter(function (u) { return u.subj !== 'info' && (!jh || /^中/.test(u.stage)); }), out);
    }
    return out;
  }
  // 教科書の本棚と同じ分け方(教科 → 教科書)。問題が作れない教科書は出さない
  var shelfCache = null;
  function shelf() {
    if (shelfCache) return shelfCache;
    var groups = [];
    (WPS.CURRICULUM || []).forEach(function (gr) {
      if (!gr.subj) return;
      var items = [];
      gr.courses.forEach(function (c) {
        var n = unitsOf(c.id).length, extra = c.id === 'soc_wh' || c.id === 'soc_jh' || IQ_BOOK[c.id];
        if (!n && !extra) return;
        if (pool('c:' + c.id).length >= 8) items.push(['c:' + c.id, c.short || c.name, c.name]);
      });
      if (gr.id === 'jpn' && ((WPS.IQ || {}).bungaku || []).length) items.push(['iq:bungaku', '文学史', '作品と作者(一問一答より)']);
      if (items.length) groups.push({ name: gr.name, items: items });
    });
    var words = [];
    (WPS.VBOOKS || []).forEach(function (b) { if (b.bank && ((WPS.BANK || {})[b.bank] || []).length >= 8 && !words.some(function (w) { return w[0] === 'w:' + b.bank; })) words.push(['w:' + b.bank, b.name, 'ことば → 意味']); });
    [['kogo', '古文単語(基本)'], ['kanji', '漢字の読み']].forEach(function (x) { if (((WPS.BANK || {})[x[0]] || []).length >= 8 && !words.some(function (w) { return w[0] === 'w:' + x[0]; })) words.push(['w:' + x[0], x[1], 'ことば → 意味・読み']); });
    if (words.length) groups.push({ name: '単語帳', items: words });
    return (shelfCache = groups);
  }
  function courseName(id) {
    if (id === 'all') return '全教科ミックス';
    var n = '';
    shelf().forEach(function (gr) { gr.items.forEach(function (c) { if (c[0] === id) n = c[1]; }); });
    return n;
  }
  // クリアテストを選ぶ欄:教科書(単元がある本)と、その単元
  function testBooks() {
    var out = [];
    (WPS.CURRICULUM || []).forEach(function (gr) { if (gr.subj) gr.courses.forEach(function (c) { var us = unitsOf(c.id); if (us.length) out.push({ id: c.id, name: (c.short || c.name), group: gr.name, units: us }); }); });
    return out;
  }

  /* ---------- 画面 ---------- */
  function menu() {
    var r = rec(), books = testBooks();
    if (!pick.book && books.length) { var jh = isJh(); pick.book = (books.filter(function (b) { return jh ? /^中学/.test(b.name) : !/^中学/.test(b.name); })[0] || books[0]).id; }
    var cur = books.filter(function (b) { return b.id === pick.book; })[0] || books[0];
    var html = last ? result() : '';
    html += '<section class="card trk-intro"><h2>トロッコゲーム</h2>' +
      '<p>問題を読んで、正しい答えの線路に進もう。遊び方は2つあります。</p>' +
      '<div class="trk-two"><div><b>単元クリアテスト(4択)</b><small>A〜D の4本の線路。10問のうち8問以上で、その単元は「合格」。学習の記録に入ります。</small></div>' +
      '<div><b>ゲーム(2択)</b><small>A・B の2本の線路。全' + GOAL + '問でゴール。ミス' + LIVES + '回で脱線。記録には入りません。</small></div></div>' +
      '<p class="hint">どちらも全画面で、残りの秒数が画面の上に出ます。パソコンでは、キーボードでも選べます(2択は ← →、4択は 1〜4)。</p></section>';
    // 単元クリアテスト(4択)
    if (cur) html += '<section class="card trk-test"><h2>単元クリアテスト(4択)</h2>' +
      '<p class="muted small">教科書と単元を選んで、はじめます。10問のうち8問以上で合格。1問の制限時間は、問題のむずかしさで ' + T_TEST[1] + '〜' + T_TEST[3] + '秒です。</p>' +
      '<div class="trk-pick"><label>教科書<select id="tkBook">' + books.map(function (b) { return '<option value="' + b.id + '"' + (b.id === cur.id ? ' selected' : '') + '>' + h(b.group + ':' + b.name) + '</option>'; }).join('') + '</select></label>' +
      '<label>単元<select id="tkUnit">' + cur.units.map(function (u) { var c = ctx.clearOf ? ctx.clearOf(u.id) : null; return '<option value="' + u.id + '"' + (u.id === pick.unit ? ' selected' : '') + '>' + h(u.name) + (c ? '(合格 ' + c.c + '/' + c.n + ')' : '') + '</option>'; }).join('') + '</select></label></div>' +
      '<div class="btn-row"><button type="button" class="btn primary" id="tkTestGo">クリアテストをはじめる</button></div>' +
      '<p class="hint">各単元のページの「単元クリアテスト」からも、同じテストを受けられます。</p></section>';
    // ゲーム(2択):教科書別
    html += '<section class="card"><h2>ゲーム(2択):教科書を選ぶ</h2>' +
      '<p class="muted small">全' + GOAL + '問でゴール。1問の制限時間は' + T_START + '秒で、5問正解するごとに1秒ずつ短くなります(最短' + T_MIN + '秒)。ゴールすると、残ったライフ1つにつき' + LIFE_BONUS + '点のボーナス。</p>' +
      '<div class="trk-courses">' + course(['all', '全教科ミックス', '5教科の問題からまんべんなく'], r) + '</div>' +
      shelf().map(function (gr) { return '<h3 class="trk-gh">' + h(gr.name) + '</h3><div class="trk-courses">' + gr.items.map(function (c) { return course(c, r); }).join('') + '</div>'; }).join('') +
      '<p class="hint">2択のゲームなので、ここでの正解・不正解は、正答率の分析には入りません。</p></section>';
    return html;
  }
  function course(c, r) {
    var b = r.best[c[0]];
    return '<button type="button" class="trk-course" data-tkgo="' + c[0] + '"><b>' + h(c[1]) + '</b><small>' + h(c[2]) + '</small>' + (b ? '<em>ベスト ' + b + '点</em>' : '') + '</button>';
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
    var test = g.mode !== 'game', goalTxt = g.mode === 'test' ? g.pass + '問以上で合格' : g.mode === 'drv' ? h(g.drv.title || '') : g.goal + '問でゴール';
    return '<div class="trk-full' + (g.k === 4 ? ' k4' : '') + '" id="tkGame">' +
      '<canvas class="trk-cv" id="tkCv" aria-label="奥へのびる線路と、分かれ道"></canvas>' +
      '<div class="trk-top">' +
      '<div class="trk-hud">' + (test ? '<span class="trk-pts">正解 <b id="tkScore">0</b>問</span>' : '<span class="trk-lives" id="tkLives" aria-label="のこりライフ"></span><span class="trk-pts"><b id="tkScore">0</b>点</span>') + '<span class="trk-combo" id="tkCombo"></span>' + fs + '<button type="button" class="trk-hbtn" id="tkQuit">やめる</button></div>' +
      '<div class="trk-prog"><span class="trk-prog-t"><b id="tkNo">1</b> / <span id="tkGoal">' + g.goal + '</span>問<small>(' + goalTxt + ')</small></span><span class="trk-bar"><i id="tkProg"></i></span><span class="trk-flag" aria-hidden="true">GOAL</span></div>' +
      '<div class="trk-time"><span class="trk-sec" aria-label="残り時間">残り <b id="tkSec">0</b> 秒</span><span class="trk-bar trk-tbar"><i id="tkTime"></i></span></div>' +
      '<section class="trk-q"><p class="trk-kind" id="tkKind"></p><p class="trk-text" id="tkText" aria-live="polite"></p></section>' +
      '<div class="trk-ab">' + g.lanes.map(function (o, i) { return '<button type="button" class="trk-btn" data-lane="' + i + '"><i>' + 'ABCD'[i] + '</i><span></span>' + (g.k === 2 ? '<em>' + (i ? '右の線路 →' : '← 左の線路') + '</em>' : '') + '</button>'; }).join('') + '</div>' +
      '</div>' +
      '<p class="trk-mark" id="tkMark" aria-hidden="true"></p>' +
      '<p class="trk-fb" id="tkFb" aria-live="polite"></p></div>';
  }

  /* ---------- セミ3Dの絵(キャンバス) ----------
   * 線路の上の位置 s(0 = 出発、F = 分かれ道、F+L = ゲート)。カメラはトロッコの少し後ろから前を見る。
   * 世界の座標 (x: 左右, z: 奥行き) を、遠いものほど小さく・地平線に近く描く。
   * 線路は g.lanes(ゲートでの左右の位置)の本数だけ分かれる。 */
  var F = 36, L = 16, GAUGE = 0.75, BACK = 7.5, CAMH = 3.6;
  var cv = null, c2 = null, vw = 0, vh = 0, fl = 0, hy = 0, camX = 0, camZ = 0;
  function ease(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
  function px(s, o) { return s <= F ? 0 : o * ease((s - F) / L); }
  function pj(x, z, y) { var d = z - camZ; if (d < 0.7) return null; var k = fl / d; return [vw / 2 + (x - camX) * k, hy + (CAMH - (y || 0)) * k, k]; }
  function size() {
    if (!cv) return;
    var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    vw = Math.max(200, r.width); vh = Math.max(200, r.height);
    cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
    c2.setTransform(dpr, 0, 0, dpr, 0, 0);
    var top = document.querySelector('.trk-top'), th = top ? top.getBoundingClientRect().height : vh * 0.4;
    // 地平線は、上の問題パネルのすぐ下あたりに置く(パネルが大きいときも、線路が見えるように)
    hy = Math.min(vh * 0.7, th + (vh - th) * 0.16);
    fl = Math.min((vh - hy) * 1.75, vw * (g && g.k === 4 ? 1.35 : 1.9));
  }
  function quad(a, b, c, d, col) { if (!a || !b || !c || !d) return; c2.fillStyle = col; c2.beginPath(); c2.moveTo(a[0], a[1]); c2.lineTo(b[0], b[1]); c2.lineTo(c[0], c[1]); c2.lineTo(d[0], d[1]); c2.closePath(); c2.fill(); }
  function bed(from, to, o) {
    for (var s = to; s > Math.max(from, camZ + 0.8); s -= 1) { var x0 = px(s, o), x1 = px(s - 1, o); quad(pj(x0 - 1.7, s), pj(x0 + 1.7, s), pj(x1 + 1.7, s - 1), pj(x1 - 1.7, s - 1), '#c9bfae'); }
  }
  function ties(from, to, o) {
    for (var s = Math.floor(to / 2) * 2; s >= from; s -= 2) {
      if (s - camZ < 0.8) break;
      var x = px(s, o);
      quad(pj(x - 1.25, s), pj(x + 1.25, s), pj(x + 1.25, s + 0.42), pj(x - 1.25, s + 0.42), '#8a6b4a');
    }
  }
  function rails(from, to, o, col) {
    [-GAUGE, GAUGE].forEach(function (d) {
      var prev = null;
      for (var s = Math.max(from, camZ + 0.8); s <= to + 0.01; s += 1) {
        var p = pj(px(s, o) + d, s, 0.12);
        if (p && prev) { c2.strokeStyle = col; c2.lineWidth = Math.max(1.2, 0.13 * (p[2] + prev[2]) / 2); c2.lineCap = 'round'; c2.beginPath(); c2.moveTo(prev[0], prev[1]); c2.lineTo(p[0], p[1]); c2.stroke(); }
        prev = p;
      }
    });
  }
  function gate(i) {
    var z = F + L, x = g.lanes[i], hw = g.k === 4 ? 1.7 : 1.9, a = pj(x - hw, z), b = pj(x + hw, z), ta = pj(x - hw, z, 3.6), tb = pj(x + hw, z, 3.6);
    if (!a || !b || !ta || !tb) return;
    var k = a[2], shown = g.phase === 'show' || g.phase === 'end';
    var st = shown ? (i === g.okLane ? 'ok' : (i === g.side ? 'ng' : '')) : (i === g.side ? 'sel' : '');
    var col = st === 'ok' ? '#16a34a' : st === 'ng' ? '#dc2626' : st === 'sel' ? '#2f5bd3' : '#475569';
    c2.strokeStyle = '#3f3f46'; c2.lineWidth = Math.max(2, 0.22 * k); c2.lineCap = 'butt';
    c2.beginPath(); c2.moveTo(a[0], a[1]); c2.lineTo(ta[0], ta[1]); c2.moveTo(b[0], b[1]); c2.lineTo(tb[0], tb[1]); c2.stroke();
    var bh = 1.5 * k, by = ta[1] - bh * 0.25;
    c2.fillStyle = col; c2.fillRect(ta[0] - 0.2 * k, by, tb[0] - ta[0] + 0.4 * k, bh);
    c2.fillStyle = '#fff'; c2.font = '700 ' + Math.max(10, bh * 0.78) + 'px sans-serif'; c2.textAlign = 'center'; c2.textBaseline = 'middle';
    c2.fillText('ABCD'[i], (ta[0] + tb[0]) / 2, by + bh / 2 + 1);
  }
  function tree(x, z) {
    var b = pj(x, z), t = pj(x, z, 3.4); if (!b || !t) return;
    var k = b[2];
    c2.fillStyle = '#6b4f35'; c2.fillRect(b[0] - 0.12 * k, b[1] - 0.9 * k, 0.24 * k, 0.9 * k);
    c2.fillStyle = '#2f8f5b'; c2.beginPath(); c2.moveTo(b[0] - 1.1 * k, b[1] - 0.7 * k); c2.lineTo(b[0] + 1.1 * k, b[1] - 0.7 * k); c2.lineTo(t[0], t[1]); c2.closePath(); c2.fill();
    c2.fillStyle = '#3aa66c'; c2.beginPath(); c2.moveTo(b[0] - 0.8 * k, b[1] - 1.7 * k); c2.lineTo(b[0] + 0.8 * k, b[1] - 1.7 * k); c2.lineTo(t[0], t[1] - 0.5 * k); c2.closePath(); c2.fill();
  }
  function cart(now, o) {
    var x = px(g.s, o), p = pj(x, g.s); if (!p) return;
    var k = p[2], lean = Math.max(-0.35, Math.min(0.35, (px(g.s + 1.5, o) - px(g.s - 1.5, o)) * 0.05)), bob = g.phase === 'show' || g.phase === 'end' ? 0 : Math.sin(now / 70) * 0.012 * k;
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
    var o = g.side >= 0 ? g.lanes[g.side] : 0, i, z, far = F + L + 14;
    var show = g.side >= 0 ? [g.side] : g.lanes.map(function (_, k) { return k; });   // 選んだあとは、その線路だけを描く
    camZ = g.s - BACK; camX = px(g.s - BACK * 0.18, o);
    var sky = c2.createLinearGradient(0, 0, 0, hy); sky.addColorStop(0, '#7cc4f2'); sky.addColorStop(1, '#dff2fb');
    c2.fillStyle = sky; c2.fillRect(0, 0, vw, hy + 1);
    c2.fillStyle = '#9fcfb4'; c2.beginPath(); c2.moveTo(0, hy);
    for (i = 0; i <= 12; i++) c2.lineTo(i / 12 * vw, hy - (18 + 26 * Math.abs(Math.sin(i * 1.7 + 0.6))) * (vh / 700));
    c2.lineTo(vw, hy); c2.closePath(); c2.fill();
    var gr = c2.createLinearGradient(0, hy, 0, vh); gr.addColorStop(0, '#a8d8a0'); gr.addColorStop(1, '#6dbb74');
    c2.fillStyle = gr; c2.fillRect(0, hy, vw, vh - hy);
    show.forEach(function (k) { bed(F, far, g.lanes[k]); }); bed(0, F, 0);
    var edge = Math.abs(g.lanes[0]) + 5;
    for (z = Math.floor((camZ + 70) / 7) * 7; z > camZ + 1; z -= 7) { var hsh = Math.abs(Math.sin(z * 12.9898)) * 5; tree(-edge - 1 - hsh, z); tree(edge + 1 + hsh, z + 3); }
    show.forEach(function (k) { ties(F, far, g.lanes[k]); rails(F, far, g.lanes[k], '#52525b'); });
    ties(camZ, F, 0); rails(camZ, F, 0, '#52525b');
    if (g.side >= 0) rails(Math.max(camZ, g.s), F + L, o, '#2f5bd3');
    show.forEach(gate);
    cart(now, o);
    if (g.fade > 0) { c2.fillStyle = 'rgba(255,255,255,' + g.fade.toFixed(2) + ')'; c2.fillRect(0, 0, vw, vh); }
  }

  /* ---------- 進行 ---------- */
  function lanesFor(k) { return k === 4 ? [-7.8, -2.6, 2.6, 7.8] : [-6, 6]; }
  function start(course) {
    var qs = shuffle(pool(course));
    if (qs.length < 4) { ctx.toast('この教科書は、出せる問題がまだありません'); return; }
    qs.forEach(function (q) { q.opts = [q.ok, q.ng]; });
    g = { mode: 'game', k: 2, lanes: lanesFor(2), goal: GOAL, course: course, qs: qs, i: -1, n: 0, score: 0, combo: 0, maxCombo: 0, okN: 0, lives: LIVES, miss: [], phase: 'idle', s: 0, side: -1, fade: 0 };
    last = null;
    ctx.render();
  }
  // 単元クリアテスト(4択)。ids は問題のID。記録と合否は ctx.test が受け持つ
  function startTest(ids, title, pass) {
    var qs = ids.map(function (id) { var q = WPS.Q(id); return q ? { id: id, t: q.text, ok: String(q.answer), opts: q.choices.slice(0, 4).map(String), exp: q.exp || '', lv: q.level || 2 } : null; }).filter(Boolean);
    if (!qs.length) return false;
    g = { mode: 'test', k: 4, lanes: lanesFor(4), goal: qs.length, pass: pass, title: title, qs: qs, i: -1, n: 0, score: 0, combo: 0, maxCombo: 0, okN: 0, lives: 1, miss: [], phase: 'idle', s: 0, side: -1, fade: 0 };
    last = null;
    return true;
  }
  // ほかの画面(単語帳の4択テストなど)が問題を出し、記録も受け持つ形。drv = { title, total(), q(), limit(), shown(), answer(lane, timeout), more(), done(), quit(silent) }
  function startDrive(drv) {
    g = { mode: 'drv', drv: drv, k: 4, lanes: lanesFor(4), goal: drv.total(), qs: [], i: -1, n: 0, score: 0, combo: 0, maxCombo: 0, okN: 0, lives: 1, miss: [], phase: 'idle', s: 0, side: -1, fade: 0 };
    last = null;
    return true;
  }
  function el(id) { return document.getElementById(id); }
  function btns() { return [].slice.call(document.querySelectorAll('#tkGame .trk-btn')); }
  function hud() {
    if (g.mode === 'game') { var l = '', i; for (i = 0; i < LIVES; i++) l += '<i class="' + (i < g.lives ? 'on' : '') + '"></i>'; el('tkLives').innerHTML = l; }
    el('tkScore').textContent = g.mode !== 'game' ? g.okN : g.score;
    var gl = el('tkGoal'); if (gl) gl.textContent = g.goal;
    el('tkCombo').textContent = g.combo >= 2 ? g.combo + '連続' : '';
    el('tkNo').textContent = Math.min(g.goal, g.n);
    el('tkProg').style.width = Math.round((g.n - (g.phase === 'run' || g.phase === 'go' ? 1 : 0)) / g.goal * 100) + '%';
  }
  function clock(left) {
    var sec = el('tkSec'), bar = el('tkTime'); if (!sec) return;
    left = Math.max(0, left);
    sec.textContent = Math.ceil(left / 1000);
    bar.style.width = (left / g.limit * 100).toFixed(1) + '%';
    var low = left <= (g.mode === 'test' ? 5000 : 3000) && left < g.limit; sec.parentNode.classList.toggle('low', low); bar.classList.toggle('low', low);
  }
  function next() {
    if (!g) return;
    g.i++; g.n++;
    var q, opts;
    if (g.drv) { q = g.drv.q(); opts = q.opts; g.okLane = q.okIdx; g.goal = g.drv.total(); }
    else {
      if (g.i >= g.qs.length) { g.qs = shuffle(g.qs); g.i = 0; }
      q = g.qs[g.i]; opts = shuffle(q.opts.slice()); g.okLane = opts.indexOf(q.ok);
    }
    g.q = q; g.opts = opts;
    g.side = -1; g.phase = 'run'; g.s = 0; g.fade = g.n > 1 ? 1 : 0; g.t0 = performance.now();
    g.limit = (g.drv ? g.drv.limit() : g.mode === 'test' ? (T_TEST[q.lv] || 30) + (q.t.length > 80 ? 10 : 0) : Math.max(T_MIN, T_START - Math.floor(g.okN / 5))) * 1000;
    el('tkKind').textContent = q.kind || (q.word ? '意味はどっち?' : (g.n === g.goal ? 'さいごの問題' : ''));
    var tx = el('tkText'); tx.textContent = q.t; tx.className = 'trk-text' + (q.word ? ' word' : '') + (q.t.length > 60 ? ' long' : '');
    var longOpt = opts.some(function (o) { return o.length > 14; });
    btns().forEach(function (b, k) { b.querySelector('span').textContent = opts[k]; b.className = 'trk-btn' + (longOpt ? ' sm' : ''); b.disabled = false; });
    var m = el('tkMark'); m.textContent = ''; m.className = 'trk-mark'; el('tkFb').textContent = '';
    hud(); clock(g.limit); size(); loop();
    if (g.drv && g.drv.shown) g.drv.shown();
  }
  function choose(lane) {
    if (!g || g.phase !== 'run' || !(lane >= 0 && lane < g.k)) return;
    var now = performance.now();
    g.side = lane; g.phase = 'go'; g.t1 = now; g.s1 = g.s;
    g.left = g.limit - (now - g.t0);
    btns().forEach(function (b, k) { b.disabled = true; if (k === lane) b.classList.add('sel'); });
  }
  function loop() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function step(now) {
      if (!g || !el('tkGame')) return;                      // ほかの画面に移ったら止める
      if (g.fade > 0) g.fade = Math.max(0, g.fade - 0.06);
      if (cv && (Math.abs(cv.clientWidth - vw) > 1 || Math.abs(cv.clientHeight - vh) > 1)) size();   // 画面の大きさが変わったら、絵を合わせ直す
      if (g.phase === 'run') {
        var e = now - g.t0;
        g.s = Math.min(F - 1.5, e / g.limit * (F - 1.5));    // 制限時間ちょうどで、分かれ道の手前に着く
        clock(g.limit - e);
        if (e >= g.limit) { draw(now); judge(false, true); }
      } else if (g.phase === 'go') {
        var t = Math.min(1, (now - g.t1) / GO_MS);           // 選んだら、ゲートの手前まで一気に走る
        g.s = g.s1 + (F + L - 9 - g.s1) * (t * t * (3 - 2 * t));
        if (t >= 1) { draw(now); judge(g.side === g.okLane, false); }
      }
      if (!g) return;
      draw(now);
      raf = requestAnimationFrame(step);                     // 判定を見せているあいだも、絵は描きつづける
    });
  }
  function judge(ok, timeout) {
    var q = g.q, test = g.mode !== 'game'; g.phase = 'show';
    btns().forEach(function (b, k) { b.disabled = true; if (k === g.okLane) b.classList.add('ok'); else if (k === g.side) b.classList.add('ng'); });
    var mark = el('tkMark'), fb = el('tkFb');
    if (g.mode === 'test' && ctx.test) ctx.test.answer(q.id, g.side >= 0 ? g.opts[g.side] : null);
    if (g.drv) g.drv.answer(g.side, timeout);
    if (ok) {
      g.combo++; g.okN++; g.maxCombo = Math.max(g.maxCombo, g.combo);
      var gain = 10 + Math.min(10, (g.combo - 1) * 2) + Math.round(Math.max(0, g.left) / g.limit * 5);
      g.score += gain;
      mark.textContent = '○'; mark.className = 'trk-mark ok'; fb.textContent = test ? '正解!' : '正解! +' + gain + '点';
    } else {
      g.combo = 0; if (!test) g.lives--; g.miss.push(q);
      mark.textContent = '✕'; mark.className = 'trk-mark ng';
      fb.textContent = (timeout ? '時間切れ。' : '') + '正解は ' + 'ABCD'[g.okLane] + '「' + g.opts[g.okLane] + '」';
      el('tkGame').classList.add('shake'); setTimeout(function () { var x = el('tkGame'); if (x) x.classList.remove('shake'); }, 400);
    }
    hud();
    var goal = !g.drv && g.n >= g.goal && g.lives > 0;
    if (goal && !test) { g.bonus = g.lives * LIFE_BONUS; g.score += g.bonus; }
    setTimeout(function () {
      if (!g || !el('tkGame')) return;
      if (g.drv) { var d = g.drv; if (d.more()) next(); else { leave(); d.done(); } return; }
      if (goal && test) {
        var pass = g.okN >= g.pass; g.phase = 'end';
        mark.textContent = pass ? '合格' : 'もう一歩'; mark.className = 'trk-mark ' + (pass ? 'goal' : 'ng small'); fb.textContent = g.goal + '問中 ' + g.okN + '問 正解';
        setTimeout(function () { if (g && el('tkGame')) endTest(true); }, 1400);
      }
      else if (goal) { g.phase = 'end'; mark.textContent = 'GOAL'; mark.className = 'trk-mark goal'; fb.textContent = 'ゴール! ライフのボーナス +' + g.bonus + '点'; hud(); setTimeout(function () { if (g && el('tkGame')) finish(true); }, 1500); }
      else if (g.lives <= 0) { g.phase = 'end'; mark.textContent = '脱線'; mark.className = 'trk-mark ng small'; setTimeout(function () { if (g && el('tkGame')) finish(false); }, 1100); }
      else next();
    }, ok ? 850 : (test ? 2400 : 2000));
  }
  function leave() { cancelAnimationFrame(raf); g = null; cv = c2 = null; try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { } }
  function finish(goal) {
    if (!g) return;
    if (g.mode === 'test') { endTest(false); return; }
    if (g.drv) { var d = g.drv; leave(); d.quit(); return; }
    var r = rec(), old = r.best[g.course] || 0, played = g.okN + g.miss.length;
    last = { course: g.course, score: g.score, okN: g.okN, n: g.n, goal: goal === true, bonus: goal === true ? g.bonus : 0, maxCombo: g.maxCombo, miss: g.miss.slice(0, 20), newBest: g.score > old && g.score > 0 };
    if (played) { r.plays = (r.plays || 0) + 1; if (g.score > old) r.best[g.course] = g.score; S.save(); }
    else last = null;
    leave(); ctx.render();
  }
  // クリアテストの終わり。done = 最後まで解いた(合否を出す)/ false = とちゅうでやめた(合否は出さない)
  function endTest(done) {
    leave();
    if (ctx.test) { if (done) ctx.test.done(); else ctx.test.quit(); }
  }

  document.addEventListener('keydown', function (e) {
    if (!g || !el('tkGame')) return;
    if (e.key === 'Escape' && !document.fullscreenElement) { finish(); return; }
    if (g.phase !== 'run') return;
    var k = e.key, lane = -1;
    if (g.k === 2) lane = k === 'ArrowLeft' ? 0 : k === 'ArrowRight' ? 1 : -1;
    if (lane < 0 && /^[1-4]$/.test(k)) lane = +k - 1;
    if (lane < 0 && /^[a-dA-D]$/.test(k)) lane = 'abcd'.indexOf(k.toLowerCase());
    if (lane >= 0 && lane < g.k) { e.preventDefault(); choose(lane); }
  });
  window.addEventListener('resize', function () { if (g && el('tkGame')) size(); });

  function renderFn() { return g ? stage() : menu(); }
  renderFn.after = function () {
    document.querySelectorAll('[data-tkgo]').forEach(function (b) { b.addEventListener('click', function () { start(b.getAttribute('data-tkgo')); }); });
    if (!g) {
      var bk = el('tkBook'), un = el('tkUnit'), go = el('tkTestGo');
      if (bk) bk.addEventListener('change', function () { pick.book = bk.value; pick.unit = ''; ctx.render(); });
      if (un) un.addEventListener('change', function () { pick.unit = un.value; });
      if (go) go.addEventListener('click', function () { if (un && un.value) location.hash = '#jtest/clear:' + un.value; });
      return;
    }
    if (g.phase !== 'idle') { var wasTest = g.mode === 'test', od = g.drv; leave(); if (wasTest && ctx.test) ctx.test.quit(true); if (od) od.quit(true); ctx.render(); return; }   // 画面を作り直したときは、メニューにもどす
    cv = el('tkCv'); c2 = cv.getContext('2d');
    btns().forEach(function (b) { b.addEventListener('click', function () { choose(+b.getAttribute('data-lane')); }); });
    el('tkQuit').addEventListener('click', function () { finish(); });
    // 絵を押しても選べる(画面を線路の本数で等分して、押した位置の線路)
    cv.addEventListener('click', function (e) { var r = cv.getBoundingClientRect(); choose(Math.min(g.k - 1, Math.floor((e.clientX - r.left) / r.width * g.k))); });
    var fs = el('tkFs');
    if (fs) fs.addEventListener('click', function () { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (e) { } });
    next();
  };
  return { render: renderFn, inMode: function () { return !!g; }, startTest: startTest, startDrive: startDrive, pool: pool, shelf: shelf, goal: GOAL };
};
