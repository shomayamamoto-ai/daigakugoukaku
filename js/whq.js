/*
 * 世界史 一問一答(#whq)
 * 出題軸:ヨコ(時代・地域)/タテ(国・地域 → 時代)/年号/論述(論述カットインへ)
 * モード:すべて/暗記(未習得のみ)/ニガテのみ/未学習、レベル Lv1〜3、正解N連で「習得」。
 * 記録は state.whq に保存。
 */
window.WPS = window.WPS || {};
WPS.makeWhq = function (ctx, DS) {
  DS = DS || { key: 'whq', route: '#whq', name: '世界史', rs: 'wh', Q: function () { return WPS.WHQ; }, M: function () { return WPS.WHQ_META; }, yb: 'whistory' };
  var h = ctx.h, toast = ctx.toast, shuffle = ctx.shuffle, judgeMark = ctx.judgeMark, S = WPS.Store;
  var M = DS.M(), QS = DS.Q(), YK = {}, TA = {}, GR = {};
  M.yoko.forEach(function (y) { YK[y[0]] = y[1]; });
  M.tate.forEach(function (g) { GR[g[0]] = g; g[2].forEach(function (t) { TA[t[0]] = { name: t[1], g: g[0] }; }); });
  var COLORS = ['#e8a33d', '#3ba7e8', '#e0457b', '#e5484d', '#3fb27f', '#6b7bd6', '#2bb3a8', '#4a63e8', '#7c8a9a', '#8b5cf6', '#c2417a'];

  function W() { var s = S.get(); if (!s[DS.key]) s[DS.key] = { r: {}, cfg: {} }; var c = s[DS.key].cfg, d = { axis: 'yoko', yo: 'all', grp: 'weu', ta: 'all', sub: 'all', mode: 'all', lv: [1, 2, 3], n: 1, cnt: 10 }; Object.keys(d).forEach(function (k) { if (c[k] === undefined) c[k] = d[k]; }); return s[DS.key]; }
  function cfg() { var c = W().cfg; if (!GR[c.grp]) { c.grp = M.tate[0][0]; c.ta = 'all'; c.sub = 'all'; } if (c.yo !== 'all' && !YK[c.yo]) c.yo = 'all'; return c; }
  function save() { S.save(); }
  function rec(id) { return W().r[id]; }
  function mastered(q) { var r = rec(q.id); return !!(r && r.s >= +cfg().n); }
  function nigate(q) { var r = rec(q.id); return !!(r && r.w); }

  // 年号の問題:一問一答の年つき問題+年表データ
  var YEARQ = null;
  function yearPool() {
    if (YEARQ) return YEARQ;
    YEARQ = QS.filter(function (q) { return q.y !== null; }).map(function (q) { return { id: q.id + 'y', yo: q.yo, ta: q.ta, lv: q.lv, q: q.q, a: q.a, y: q.y, yr: 1 }; });
    var seen = {};
    YEARQ.forEach(function (q) { seen[q.y + q.a] = 1; });
    (WPS.BANK[DS.yb] || []).forEach(function (b, i) {
      var y = +b.t; if (isNaN(y) || seen[y + b.m]) return;
      YEARQ.push({ id: 'wy' + i, yo: 'all', ta: 'intl', lv: 1, q: b.m, a: b.m, y: y, yr: 1, plain: 1 });
    });
    return YEARQ;
  }
  // 答えの年の地図を開くボタン(年号がない問題は、問題文の年を使う)
  function mapBtn(q) { if (!WPS.Tools || !WPS.Tools.mapLinks) return ''; var y = q.y !== null && q.y !== undefined ? q.y : WPS.Tools.findYear(q.q + ' ' + q.a); return WPS.Tools.mapLinks(y, DS.rs === 'wh' ? 'w' : 'j'); }
  function yStr(y) { return y < 0 ? '紀元前' + (-y) + '年' : y + '年'; }

  // 範囲でしぼった問題(モード・レベルの前)
  function scoped() {
    var c = cfg(), base = c.axis === 'year' ? yearPool() : QS;
    if (c.axis === 'tate') {
      var g = GR[c.grp], tas = g[2].map(function (t) { return t[0]; });
      base = base.filter(function (q) { return c.ta === 'all' ? tas.indexOf(q.ta) >= 0 : q.ta === c.ta; });
      if (c.ta !== 'all' && c.sub !== 'all') base = base.filter(function (q) { return q.yo === c.sub; });
    } else if (c.yo !== 'all') {
      base = base.filter(function (q) { return q.yo === c.yo; });
      if (c.axis === 'yoko' && c.th && c.th !== 'all') base = base.filter(function (q) { return q.th === c.th; });
    }
    return base;
  }
  function filtered() {
    var c = cfg();
    return scoped().filter(function (q) {
      if (c.lv.indexOf(q.lv) < 0) return false;
      if (c.mode === 'learn') return !mastered(q);
      if (c.mode === 'nigate') return nigate(q);
      if (c.mode === 'new') return !rec(q.id);
      return true;
    });
  }
  function title() {
    var c = cfg();
    if (c.axis === 'tate') return 'タテ・' + GR[c.grp][1] + '・' + (c.ta === 'all' ? 'すべて' : TA[c.ta].name) + (c.ta !== 'all' && c.sub !== 'all' ? '・' + YK[c.sub] : '');
    return (c.axis === 'year' ? '年号・' : 'ヨコ・') + (c.yo === 'all' ? 'すべて' : YK[c.yo]) + (c.axis === 'yoko' && c.yo !== 'all' && c.th && c.th !== 'all' ? '・' + c.th : '');
  }
  function chip(attr, val, label, n, on, color) {
    return '<button type="button" class="wq-chip' + (on ? ' on' : '') + '" ' + attr + '="' + val + '"' + (color ? ' style="--dot:' + color + '"' : '') + '>' + (color ? '<i></i>' : '') + h(label) + '<em>' + n + '</em></button>';
  }

  /* ========== 設定画面 ========== */
  function top() {
    var c = cfg(), sc = scoped(), done = sc.filter(mastered).length, tried = sc.filter(function (q) { return rec(q.id); }).length, N = sc.length, list = filtered();
    var pct = N ? Math.round(done / N * 100) : 0;
    var html = '';
    var weakAll = QS.filter(nigate);
    html += '<section class="card wq-listen"><button type="button" class="wq-play" id="wqListen"' + (weakAll.length && 'speechSynthesis' in window ? '' : ' disabled') + ' aria-label="苦手の聞き流し"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button><div><b>苦手の聞き流し</b><small>' + (weakAll.length ? 'ニガテの ' + weakAll.length + '問を、問い→答えの順に読み上げ' : 'まちがえた問題がたまると使えます') + '</small></div></section>';
    html += '<section class="card wq-prog"><div class="wq-ph"><b>' + h(title()) + '</b><span>習得 ' + done + '/' + N + '・' + pct + '%</span></div>' +
      '<div class="wq-bar"><i style="width:' + pct + '%"></i><s style="width:' + (N ? Math.round(tried / N * 100) : 0) + '%"></s></div>' +
      '<p class="wq-sub">着手 ' + tried + '/' + N + '</p>' +
      '<div class="wq-streak"><span>習得の条件</span>' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" class="wq-pill' + (+c.n === n ? ' on' : '') + '" data-wn="' + n + '">' + n + '連</button>'; }).join('') + '</div>' +
      '<p class="hint">「' + c.n + '連」= ' + c.n + '回続けて正解すると習得。まちがえると連続はリセットされます。</p></section>';
    // 出題軸
    html += '<h3 class="wq-h">出題軸</h3><div class="wq-seg">' + [['yoko', 'ヨコ'], ['tate', 'タテ'], ['year', '年号'], ['ron', '論述']].map(function (o) { return '<button type="button" class="' + (c.axis === o[0] ? 'on' : '') + '" data-wa="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<p class="wq-axhint">' + (DS.key === 'jhq' ? { yoko: 'ヨコ:時代ごとに、政治・外交・社会・文化をまとめて。時代の流れで覚える', tate: 'タテ:政治・外交・社会・文化の分野ごとに、古い順に。テーマの流れで覚える', year: '年号:できごとの年を4択で', ron: '' } : { yoko: 'ヨコ:同じ時代の世界を地域ごとに。時代の流れで覚える', tate: 'タテ:一つの国・地域の歴史を古い順に。国ごとの流れで覚える', year: '年号:できごとの年を4択で', ron: '' })[c.axis] + '</p>';
    // 範囲
    html += '<h3 class="wq-h">範囲</h3>';
    if (c.axis === 'tate') {
      html += '<div class="wq-scroll">' + M.tate.map(function (g, i) { var n = QS.filter(function (q) { return g[2].some(function (t) { return t[0] === q.ta; }); }).length; return chip('data-wg', g[0], g[1], n, c.grp === g[0], COLORS[(i * 3) % COLORS.length]); }).join('') + '</div>';
      var g = GR[c.grp];
      html += '<div class="wq-scroll wq-l2">' + chip('data-wt', 'all', 'すべて', QS.filter(function (q) { return g[2].some(function (t) { return t[0] === q.ta; }); }).length, c.ta === 'all') + g[2].map(function (t) { return chip('data-wt', t[0], t[1], QS.filter(function (q) { return q.ta === t[0]; }).length, c.ta === t[0]); }).join('') + '</div>';
      if (c.ta !== 'all') {
        var inT = QS.filter(function (q) { return q.ta === c.ta; });
        html += '<div class="wq-box">' + chip('data-wsub', 'all', 'すべて', inT.length, c.sub === 'all') + M.yoko.filter(function (y) { return inT.some(function (q) { return q.yo === y[0]; }); }).map(function (y) { return chip('data-wsub', y[0], y[1], inT.filter(function (q) { return q.yo === y[0]; }).length, c.sub === y[0]); }).join('') + '</div>';
      }
    } else if (c.axis !== 'ron') {
      var src = c.axis === 'year' ? yearPool() : QS;
      html += '<div class="wq-scroll">' + chip('data-wy', 'all', 'すべて', src.length, c.yo === 'all') + M.yoko.map(function (y, i) { var n = src.filter(function (q) { return q.yo === y[0]; }).length; return n ? chip('data-wy', y[0], y[1], n, c.yo === y[0], COLORS[i % COLORS.length]) : ''; }).join('') + '</div>';
      if (c.axis === 'yoko' && c.yo !== 'all') {
        var inY = src.filter(function (q) { return q.yo === c.yo; }), ths = [];
        inY.forEach(function (q) { if (q.th && ths.indexOf(q.th) < 0) ths.push(q.th); });
        if (ths.length) html += '<div class="wq-box">' + chip('data-wth', 'all', 'すべて', inY.length, !c.th || c.th === 'all') + ths.map(function (t) { return chip('data-wth', t, t, inY.filter(function (q) { return q.th === t; }).length, c.th === t); }).join('') + '</div>';
      }
    }
    if (c.axis === 'ron') {
      var rn = (WPS.RONJUTSU || []).filter(function (q) { return q.s === DS.rs; }).length;
      html += '<section class="card"><p>' + DS.name + 'の論述問題（' + rn + '問）を「論述カットイン」で練習します。問いに答えて、模範解答のキーワードで自己採点します。</p><a class="btn primary big" href="#ronjutsu" id="wqRon">論述カットインを開く</a></section>';
      return html;
    }
    // モード・レベル
    html += '<h3 class="wq-h">モード</h3><div class="wq-seg">' + [['all', 'すべて'], ['learn', '暗記モード'], ['nigate', 'ニガテのみ'], ['new', '未学習']].map(function (o) { return '<button type="button" class="' + (c.mode === o[0] ? 'on' : '') + '" data-wm="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<p class="wq-axhint">' + ({ all: 'すべての問題から出題', learn: '暗記モード:まだ習得していない問題だけ', nigate: 'ニガテのみ:最後にまちがえた問題だけ', 'new': '未学習:まだ一度も解いていない問題だけ' })[c.mode] + '</p>';
    html += '<h3 class="wq-h">レベル</h3><div class="wq-lv">' + [[1, '共テ基礎'], [2, '標準'], [3, '難関']].map(function (o) { return '<button type="button" class="' + (c.lv.indexOf(o[0]) >= 0 ? 'on' : '') + '" data-wl="' + o[0] + '"><b>Lv' + o[0] + '</b><small>' + o[1] + '</small></button>'; }).join('') + '</div>';
    html += '<h3 class="wq-h">問題数</h3><div class="wq-seg sm">' + [[10, '10問'], [20, '20問'], [0, 'すべて']].map(function (o) { return '<button type="button" class="' + (+c.cnt === o[0] ? 'on' : '') + '" data-wc="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>';
    html += '<button type="button" class="btn primary big wq-go" id="wqGo"' + (list.length ? '' : ' disabled') + '>この範囲ではじめる<small>' + list.length + '問から出題</small></button>';
    if (!list.length) html += '<p class="hint center">この条件にあう問題がありません。モードやレベルを変えてください。</p>';
    return html;
  }

  /* ========== 出題 ========== */
  var run = null;
  function start() {
    var c = cfg(), list = shuffle(filtered());
    if (c.mode === 'all' || c.mode === 'learn') { // 習得していない問題を先に
      list = list.filter(function (q) { return !mastered(q); }).concat(list.filter(mastered));
    }
    if (+c.cnt) list = list.slice(0, +c.cnt);
    run = { list: list, i: 0, ans: null, res: [], self: false, t0: Date.now() };
    prep();
  }
  function prep() {
    var q = run.list[run.i];
    if (q.yr) {
      var ys = {}; ys[q.y] = 1; var ch = [q.y], cand = shuffle([-40, -20, -10, -5, -3, 3, 5, 10, 20, 40]);
      for (var k = 0; ch.length < 4 && k < cand.length; k++) { var v = q.y + cand[k]; if (!ys[v] && v !== 0) { ys[v] = 1; ch.push(v); } }
      run.ch = shuffle(ch).map(function (v) { return { t: yStr(v), ok: v === q.y }; });
    } else {
      var same = QS.filter(function (x) { return x.id !== q.id && x.a !== q.a && x.yo === q.yo; });
      if (same.length < 3) same = QS.filter(function (x) { return x.id !== q.id && x.a !== q.a; });
      run.ch = shuffle([{ t: q.a, ok: true }].concat(shuffle(same).slice(0, 3).map(function (x) { return { t: x.a, ok: false }; })));
    }
    run.ans = null; run.open = false; run.t = Date.now();
  }
  function quizHTML() {
    var q = run.list[run.i], r = rec(q.id), done = !!run.ans;
    var meta = q.yr ? '年号' : (YK[q.yo] || '') + '・' + (TA[q.ta] ? TA[q.ta].name : '');
    var html = '<div class="vt-qhead"><button type="button" class="vt-link" id="wqQuit">中断</button><b>' + DS.name + ' 一問一答<small> ' + (run.i + 1) + ' / ' + run.list.length + '</small></b><button type="button" class="vt-link" id="wqSelf">' + (run.self ? '4択にする' : '見て答える') + '</button></div>' +
      '<div class="progress"><i style="width:' + Math.round(run.i / run.list.length * 100) + '%"></i></div>' +
      '<section class="card wq-q"><div class="wq-qm"><span>' + h(meta) + '</span><span>Lv' + q.lv + '</span>' + (r ? '<span>' + (r.s >= +cfg().n ? '習得' : '連続 ' + r.s) + '</span>' : '<span>新規</span>') + '</div>' +
      (q.yr ? '<p class="wq-qt">' + (q.plain ? h(q.q) : h(q.a) + '<small>' + h(q.q) + '</small>') + '</p><p class="wq-ask">何年のできごと?</p>' : '<p class="wq-qt">' + h(q.q) + '</p>');
    if (run.self && !done) {
      html += run.open ? '<p class="wq-ans">' + h(q.yr ? yStr(q.y) : q.a) + '</p>' + mapBtn(q) + '<div class="wq-selfb"><button type="button" class="btn sw-no" data-wself="0">✕ まちがえた</button><button type="button" class="btn sw-yes" data-wself="1">○ 正解だった</button></div>'
        : '<button type="button" class="btn primary big" id="wqOpen">答えを見る</button>';
      html += '</section>';
      return html;
    }
    html += (done ? '<p class="vt-reveal ' + (run.ans.ok ? 'ok' : 'ng') + '"><b>' + (run.ans.ok ? '○ 正解' : '✕ 不正解') + '</b>' + h(q.yr ? yStr(q.y) : q.a) + '</p>' + mapBtn(q) : '') + '</section>';
    if (!run.self) html += '<div class="vt-choices">' + run.ch.map(function (c, i) {
      var cls = done ? (c.ok ? ' right' : run.ans.pick === i ? ' wrong' : ' dim') : '';
      return '<button type="button" class="vt-ch' + cls + '" data-wch="' + i + '"' + (done ? ' disabled' : '') + '>' + h(c.t) + '</button>';
    }).join('') + '</div>';
    if (done) html += '<button type="button" class="btn primary big vt-next" id="wqNext">' + (run.i + 1 >= run.list.length ? '結果を見る' : '次へ') + '</button>';
    return html;
  }
  function grade(ok, pick) {
    var q = run.list[run.i];
    run.ans = { ok: ok, pick: pick };
    if (!S.isView()) {
      var r = W().r[q.id] || (W().r[q.id] = { s: 0, n: 0, ok: 0 });
      r.n++; if (ok) { r.ok++; r.s++; delete r.w; } else { r.s = 0; r.w = 1; } r.l = Date.now();
      var xr = WPS.Quest ? WPS.Quest.onAnswer(ok, { extra: true, hard: q.lv === 3 }) : null;
      if (xr && xr.msg) xr.msg.forEach(function (m, i) { setTimeout(function () { toast(m); }, 900 + i * 2400); });
      save();
    }
    run.res.push({ q: q, ok: ok });
    judgeMark(ok ? 'ok' : 'ng');
  }
  function resultHTML() {
    var ok = run.res.filter(function (x) { return x.ok; }).length, n = run.res.length, ng = run.res.filter(function (x) { return !x.ok; });
    var sc = scoped(), done = sc.filter(mastered).length;
    return '<section class="card center"><h2>結果</h2><div class="big-num">' + ok + '<small> / ' + n + ' 問正解</small></div>' +
      '<p>この範囲の習得:<b>' + done + ' / ' + sc.length + '</b></p>' +
      '<div class="btns" style="justify-content:center">' + (ng.length ? '<button type="button" class="btn primary" id="wqRetry">まちがえた' + ng.length + '問をもう一度</button>' : '') + '<button type="button" class="btn" id="wqBack">戻る</button></div></section>' +
      (ng.length ? '<section class="card"><h2 class="vt-rh ng">覚え直す問題</h2><ul class="wq-rl">' + ng.map(function (x) { return '<li><span>' + h(x.q.yr ? (x.q.plain ? x.q.q : x.q.a) : x.q.q) + '</span><b>' + h(x.q.yr ? yStr(x.q.y) : x.q.a) + '</b></li>'; }).join('') + '</ul></section>' : '');
  }

  /* ========== 苦手の聞き流し ========== */
  var lg = 0;
  function listen() {
    var list = shuffle(QS.filter(nigate)), i = 0, g = ++lg;
    if (!list.length) return;
    toast('苦手の聞き流しを始めます(画面を移ると止まります)');
    function say(t, cb) { try { var u = new SpeechSynthesisUtterance(t); u.lang = 'ja-JP'; u.rate = 1; u.onend = cb; u.onerror = cb; speechSynthesis.speak(u); } catch (e) { cb(); } }
    (function step() {
      if (g !== lg || i >= list.length || location.hash !== DS.route) return;
      var q = list[i++];
      say(q.q, function () { setTimeout(function () { say('答え、' + q.a, function () { setTimeout(step, 900); }); }, 600); });
    })();
  }
  window.addEventListener('hashchange', function () { if (location.hash !== DS.route) { lg++; try { speechSynthesis.cancel(); } catch (e) { /* 無視 */ } } });

  function render() {
    if (run && run.i >= run.list.length) return resultHTML();
    if (run) return quizHTML();
    return top();
  }
  function after() {
    var view = document.getElementById('view');
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    var c = cfg();
    if (!run) {
      var on = function (sel, fn) { view.querySelectorAll(sel).forEach(function (b) { b.addEventListener('click', function () { fn(b); save(); re(); }); }); };
      on('[data-wn]', function (b) { c.n = +b.getAttribute('data-wn'); });
      on('[data-wa]', function (b) { c.axis = b.getAttribute('data-wa'); });
      on('[data-wy]', function (b) { c.yo = b.getAttribute('data-wy'); c.th = 'all'; });
      on('[data-wth]', function (b) { c.th = b.getAttribute('data-wth'); });
      on('[data-wg]', function (b) { c.grp = b.getAttribute('data-wg'); c.ta = 'all'; c.sub = 'all'; });
      on('[data-wt]', function (b) { c.ta = b.getAttribute('data-wt'); c.sub = 'all'; });
      on('[data-wsub]', function (b) { c.sub = b.getAttribute('data-wsub'); });
      on('[data-wm]', function (b) { c.mode = b.getAttribute('data-wm'); });
      on('[data-wc]', function (b) { c.cnt = +b.getAttribute('data-wc'); });
      on('[data-wl]', function (b) { var v = +b.getAttribute('data-wl'), i = c.lv.indexOf(v); if (i >= 0) { if (c.lv.length > 1) c.lv.splice(i, 1); } else c.lv.push(v); });
      var go = view.querySelector('#wqGo'); if (go) go.addEventListener('click', function () { start(); ctx.render(); window.scrollTo(0, 0); });
      var ls = view.querySelector('#wqListen'); if (ls) ls.addEventListener('click', listen);
      var rj = view.querySelector('#wqRon'); if (rj) rj.addEventListener('click', function () { WPS.RJ_PRESET = DS.rs; });
      // 選んでいるチップを見える位置へ
      view.querySelectorAll('.wq-scroll').forEach(function (s) { var o = s.querySelector('.on'); if (o) s.scrollLeft = o.offsetLeft - 16; });
      return;
    }
    if (run.i >= run.list.length) {
      view.querySelector('#wqBack').addEventListener('click', function () { run = null; ctx.render(); });
      var rt = view.querySelector('#wqRetry');
      if (rt) rt.addEventListener('click', function () { var ng = run.res.filter(function (x) { return !x.ok; }).map(function (x) { return x.q; }); run = { list: shuffle(ng), i: 0, res: [], self: run.self }; prep(); ctx.render(); window.scrollTo(0, 0); });
      return;
    }
    view.querySelector('#wqQuit').addEventListener('click', function () { run = run.res.length ? (run.list = run.list.slice(0, run.i), run.i = run.list.length, run) : null; ctx.render(); });
    view.querySelector('#wqSelf').addEventListener('click', function () { if (run.ans) return; run.self = !run.self; run.open = false; re(); });
    view.querySelectorAll('[data-wch]').forEach(function (b) { b.addEventListener('click', function () { if (run.ans) return; var i = +b.getAttribute('data-wch'); grade(run.ch[i].ok, i); re(); }); });
    var op = view.querySelector('#wqOpen'); if (op) op.addEventListener('click', function () { run.open = true; re(); });
    view.querySelectorAll('[data-wself]').forEach(function (b) { b.addEventListener('click', function () { grade(b.getAttribute('data-wself') === '1', -1); run.i++; if (run.i < run.list.length) prep(); ctx.render(); window.scrollTo(0, 0); }); });
    var nx = view.querySelector('#wqNext'); if (nx) nx.addEventListener('click', function () { run.i++; if (run.i < run.list.length) prep(); ctx.render(); window.scrollTo(0, 0); });
  }
  function inMode() { return !!run; }
  return { render: render, after: after, inMode: inMode };
};
