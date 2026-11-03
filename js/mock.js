/*
 * 模試モード(#mock):本番と同じように、時間を計って最後まで解き、最後にまとめて採点する。
 * ・志望校の配点(教科の重み)に合わせて問題を配分
 * ・途中で答えは出さない/問題の見直しマーク(あとで見る)/問題番号の一覧から移動
 * ・結果:得点率・教科別・難易度別・1問あたりの時間、見直し、推移グラフ
 * 記録は state.mocks に保存(最新30回)。
 */
window.WPS = window.WPS || {};
WPS.makeMock = function (ctx) {
  var h = ctx.h, toast = ctx.toast, shuffle = ctx.shuffle, S = WPS.Store, D = WPS.date;
  var DIFF = { 1: '基礎', 2: '標準', 3: '難関' };
  var SIZES = [[10, 15], [20, 30], [30, 45]]; // 問題数, 分
  var st = { size: 1, diff: 1 };
  var run = null, tick = null, last = null;

  function mocks() { var s = S.get(); return s.mocks || (s.mocks = []); }
  function subjects() {
    var t = WPS.Roadmap.target(), w = t.weights;
    return Object.keys(w).filter(function (k) { return w[k] > 0 && WPS.SUBJECTS[k]; }).map(function (k) { return { k: k, w: w[k] }; });
  }
  // 配点の割合で問題数を配分(各教科1問以上)
  function plan(n) {
    var ss = subjects(), sum = ss.reduce(function (a, x) { return a + x.w; }, 0), out = {}, used = 0;
    ss.forEach(function (x) { out[x.k] = Math.max(1, Math.floor(n * x.w / sum)); used += out[x.k]; });
    var order = ss.slice().sort(function (a, b) { return b.w - a.w; }), i = 0;
    while (used < n && order.length) { out[order[i % order.length].k]++; used++; i++; }
    while (used > n) { var big = order.filter(function (x) { return out[x.k] > 1; })[0]; if (!big) break; out[big.k]--; used--; }
    return out;
  }
  function start() {
    var sz = SIZES[st.size], pl = plan(sz[0]), ids = [];
    Object.keys(pl).forEach(function (k) {
      var got = ctx.levelPick(st.diff, k, pl[k]);
      if (got.length < pl[k] && st.diff > 1) got = got.concat(ctx.levelPick(st.diff - 1, k, pl[k] - got.length));
      ids = ids.concat(got);
    });
    if (!ids.length) { toast('問題が見つかりませんでした。受験で使う教科を確認してください'); return false; }
    ids = shuffle(ids);
    run = { ids: ids, i: 0, ans: {}, flag: {}, sec: {}, order: {}, t0: Date.now(), limit: sz[1] * 60, enter: Date.now(), diff: st.diff };
    ids.forEach(function (id) { var q = WPS.Q(id); run.order[id] = shuffle(q.choices.map(function (_, i) { return i; })); });
    return true;
  }
  function left() { return Math.max(0, run.limit - Math.floor((Date.now() - run.t0) / 1000)); }
  function mmss(s) { return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
  function leave() { var id = run.ids[run.i]; run.sec[id] = (run.sec[id] || 0) + (Date.now() - run.enter) / 1000; run.enter = Date.now(); }

  /* ---------- 画面 ---------- */
  function top() {
    var ss = subjects(), pl = plan(SIZES[st.size][0]), ms = mocks();
    var html = '<section class="card"><h2>模試モード</h2><p class="muted small">本番と同じように、時間を計って最後まで解きます。答え合わせは最後にまとめて行います。問題は志望校の配点に合わせて教科ごとに配分します。</p>' +
      '<h3 class="wq-h">問題数と時間</h3><div class="wq-seg">' + SIZES.map(function (z, i) { return '<button type="button" class="' + (st.size === i ? 'on' : '') + '" data-msz="' + i + '">' + z[0] + '問・' + z[1] + '分</button>'; }).join('') + '</div>' +
      '<h3 class="wq-h">レベル</h3><div class="wq-seg">' + [1, 2, 3].map(function (d) { return '<button type="button" class="' + (st.diff === d ? 'on' : '') + '" data-mdf="' + d + '">' + DIFF[d] + '</button>'; }).join('') + '</div>' +
      '<p class="mk-plan">' + ss.map(function (x) { return '<span>' + WPS.SUBJECTS[x.k].name + ' ' + pl[x.k] + '問</span>'; }).join('') + '</p>' +
      '<button type="button" class="btn primary big wq-go" id="mkGo">模試をはじめる<small>途中でやめると記録は残りません</small></button></section>';
    if (ms.length) html += historyCard(ms);
    return html;
  }
  function historyCard(ms) {
    var rec = ms.slice(-10), W = 300, H = 120, n = rec.length;
    var pts = rec.map(function (m, i) { return [n === 1 ? W / 2 : 20 + i * (W - 40) / (n - 1), H - 15 - m.pct / 100 * (H - 30)]; });
    var path = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    return '<section class="card"><h2>模試の記録</h2><svg class="mk-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="得点率の推移">' +
      [0, 50, 100].map(function (v) { var y = H - 15 - v / 100 * (H - 30); return '<line x1="14" x2="' + (W - 6) + '" y1="' + y + '" y2="' + y + '" class="g"/><text x="0" y="' + (y + 4) + '">' + v + '</text>'; }).join('') +
      '<path d="' + path + '" class="l"/>' + pts.map(function (p, i) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5"/><text x="' + p[0] + '" y="' + (p[1] - 8) + '" text-anchor="middle" class="v">' + rec[i].pct + '</text>'; }).join('') + '</svg>' +
      '<ul class="mk-hist">' + ms.slice(-5).reverse().map(function (m) { return '<li><span>' + h(m.d.slice(5).replace('-', '/')) + '</span><span>' + m.n + '問・' + DIFF[m.diff] + '</span><b>' + m.pct + '%</b><small>' + mmss(m.used) + '</small></li>'; }).join('') + '</ul></section>';
  }
  function quiz() {
    var id = run.ids[run.i], q = WPS.Q(id), u = WPS.UNIT_MAP[q.unit], done = Object.keys(run.ans).length, l = left();
    return '<div class="mk-bar"><button type="button" class="vt-link" id="mkQuit">中断</button><b class="mk-time' + (l <= 60 ? ' warn' : '') + '" id="mkTime">' + mmss(l) + '</b><button type="button" class="vt-link" id="mkEnd">提出する</button></div>' +
      '<div class="progress"><i style="width:' + Math.round(done / run.ids.length * 100) + '%"></i></div>' +
      '<section class="card question"><div class="q-meta"><span>第' + (run.i + 1) + '問 / ' + run.ids.length + '</span><span>' + WPS.SUBJECTS[u.subj].name + '</span>' +
      '<button type="button" class="mk-flag' + (run.flag[id] ? ' on' : '') + '" id="mkFlag" aria-pressed="' + !!run.flag[id] + '">あとで見直す</button></div>' +
      '<p class="q-text">' + h(q.text) + '</p><div class="choices">' + run.order[id].map(function (ci, k) {
        return '<button class="choice' + (run.ans[id] === ci ? ' picked' : '') + '" data-mci="' + ci + '"><b>' + 'ABCD'[k] + '</b><span>' + h(q.choices[ci]) + '</span></button>';
      }).join('') + '</div></section>' +
      '<div class="mk-nav"><button type="button" class="btn" id="mkPrev"' + (run.i ? '' : ' disabled') + '>前の問題</button><button type="button" class="btn primary" id="mkNext">' + (run.i + 1 < run.ids.length ? '次の問題' : '一覧で確認') + '</button></div>' +
      '<section class="card"><h3>問題の一覧</h3><div class="mk-grid">' + run.ids.map(function (x, i) {
        return '<button type="button" class="mk-cell' + (run.ans[x] !== undefined ? ' done' : '') + (run.flag[x] ? ' fl' : '') + (i === run.i ? ' cur' : '') + '" data-mgo="' + i + '">' + (i + 1) + '</button>';
      }).join('') + '</div><p class="muted small">色つき=解答済み、赤い点=あとで見直す</p></section>';
  }
  function finish(auto) {
    leave(); clearInterval(tick);
    var res = run.ids.map(function (id) { var q = WPS.Q(id); return { id: id, q: q, ok: run.ans[id] === 0, pick: run.ans[id], sec: Math.round(run.sec[id] || 0) }; });
    var used = Math.min(run.limit, Math.round((Date.now() - run.t0) / 1000)), ok = res.filter(function (x) { return x.ok; }).length;
    var bySub = {}, byDiff = {};
    res.forEach(function (x) {
      var s = WPS.UNIT_MAP[x.q.unit].subj, d = ctx.diffOf(x.q);
      (bySub[s] = bySub[s] || [0, 0])[1]++; if (x.ok) bySub[s][0]++;
      (byDiff[d] = byDiff[d] || [0, 0])[1]++; if (x.ok) byDiff[d][0]++;
    });
    var m = { d: D.today(), t: Date.now(), n: res.length, ok: ok, pct: Math.round(ok / res.length * 100), used: used, diff: run.diff, sub: bySub };
    if (!S.isView()) {
      var s = S.get();
      res.forEach(function (x) { s.attempts.push({ q: x.id, u: x.q.unit, s: x.q.subj, ok: x.ok, ch: x.pick === undefined ? null : x.q.choices[x.pick], unsure: x.pick === undefined, mode: 'choice', src: 'mock', t: Date.now(), d: D.today() }); });
      mocks().push(m); if (mocks().length > 30) mocks().shift();
      if (WPS.Streak) WPS.Streak.touch();
      S.save();
    }
    last = { m: m, res: res, bySub: bySub, byDiff: byDiff, auto: auto };
    run = null;
  }
  function result() {
    var m = last.m, res = last.res, slow = res.slice().sort(function (a, b) { return b.sec - a.sec; })[0];
    var avg = Math.round(m.used / m.n), C = 2 * Math.PI * 70;
    var html = (last.auto ? '<p class="info">時間になったので、自動で提出しました。</p>' : '') +
      '<section class="card vt-result"><h2>模試の結果</h2><div class="vt-ring"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="70" class="bg"/><circle cx="80" cy="80" r="70" class="fg" style="stroke-dasharray:' + (C * m.pct / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><div><small>得点率</small><b>' + m.pct + '<small>%</small></b><span>' + m.ok + ' / ' + m.n + '問</span></div></div>' +
      '<div class="lc-tiles"><div class="lc lc-time"><span>かかった時間</span><b>' + mmss(m.used) + '</b></div><div class="lc lc-acc"><span>1問あたり</span><b>' + avg + '秒</b></div><div class="lc lc-xp"><span>未解答</span><b>' + res.filter(function (x) { return x.pick === undefined; }).length + '</b></div></div></section>';
    html += '<section class="card"><h2>教科別・レベル別</h2><div class="why-bars">' + Object.keys(last.bySub).map(function (k) { var v = last.bySub[k], p = Math.round(v[0] / v[1] * 100); return '<div class="why-row"><span>' + WPS.SUBJECTS[k].name + '</span><div class="why-track"><i style="width:' + p + '%"></i></div><b>' + p + '%</b></div>'; }).join('') +
      Object.keys(last.byDiff).map(function (k) { var v = last.byDiff[k], p = Math.round(v[0] / v[1] * 100); return '<div class="why-row"><span>' + DIFF[k] + 'レベル</span><div class="why-track"><i style="width:' + p + '%"></i></div><b>' + p + '%</b></div>'; }).join('') + '</div>' +
      (slow && slow.sec > avg * 2 ? '<p class="why-tip"><b>時間配分</b>第' + (res.indexOf(slow) + 1) + '問に' + slow.sec + '秒かかりました(平均の' + Math.round(slow.sec / Math.max(1, avg)) + '倍)。本番では、迷ったら印をつけて先へ進み、最後に戻るのがおすすめです。</p>' : '') + '</section>';
    html += '<section class="card"><h2>見直し</h2><ol class="mk-rev">' + res.map(function (x) {
      return '<li class="' + (x.ok ? 'ok' : 'ng') + '"><p><b>' + (x.ok ? '○' : '✕') + '</b> ' + h(x.q.text) + '</p><p class="small">正解:<b>' + h(x.q.answer) + '</b>' + (!x.ok ? '　あなた:' + (x.pick === undefined ? '未解答' : h(x.q.choices[x.pick])) : '') + '<span class="muted">(' + x.sec + '秒)</span></p>' + (!x.ok && x.q.exp ? '<details><summary>解説</summary><p class="small">' + h(x.q.exp) + '</p></details>' : '') + '</li>';
    }).join('') + '</ol><div class="btns"><button type="button" class="btn primary" id="mkAgain">もう一度受ける</button><a class="btn" href="#home">ホームへ</a></div></section>';
    return html;
  }
  function render() { if (run) return quiz(); if (last) return result(); return top(); }
  function after() {
    var view = document.getElementById('view');
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    if (!run && !last) {
      view.querySelectorAll('[data-msz]').forEach(function (b) { b.addEventListener('click', function () { st.size = +b.getAttribute('data-msz'); re(); }); });
      view.querySelectorAll('[data-mdf]').forEach(function (b) { b.addEventListener('click', function () { st.diff = +b.getAttribute('data-mdf'); re(); }); });
      view.querySelector('#mkGo').addEventListener('click', function () { if (start()) { ctx.render(); window.scrollTo(0, 0); } });
      return;
    }
    if (last && !run) {
      view.querySelector('#mkAgain').addEventListener('click', function () { last = null; ctx.render(); window.scrollTo(0, 0); });
      return;
    }
    clearInterval(tick);
    tick = setInterval(function () {
      if (!run || location.hash !== '#mock') { clearInterval(tick); return; }
      var l = left(), el = document.getElementById('mkTime');
      if (el) { el.textContent = mmss(l); el.classList.toggle('warn', l <= 60); }
      if (l <= 0) { finish(true); ctx.render(); window.scrollTo(0, 0); }
    }, 1000);
    function go(i) { leave(); run.i = Math.max(0, Math.min(run.ids.length - 1, i)); ctx.render(); window.scrollTo(0, 0); }
    view.querySelectorAll('[data-mci]').forEach(function (b) { b.addEventListener('click', function () { run.ans[run.ids[run.i]] = +b.getAttribute('data-mci'); re(); }); });
    view.querySelector('#mkFlag').addEventListener('click', function () { var id = run.ids[run.i]; run.flag[id] = !run.flag[id]; re(); });
    view.querySelector('#mkPrev').addEventListener('click', function () { go(run.i - 1); });
    view.querySelector('#mkNext').addEventListener('click', function () { if (run.i + 1 < run.ids.length) go(run.i + 1); else view.querySelector('.mk-grid').scrollIntoView({ behavior: 'smooth' }); });
    view.querySelectorAll('[data-mgo]').forEach(function (b) { b.addEventListener('click', function () { go(+b.getAttribute('data-mgo')); }); });
    view.querySelector('#mkQuit').addEventListener('click', function () { ctx.confirm('模試を中断します。ここまでの解答は記録されません。よろしいですか?', function () { clearInterval(tick); run = null; ctx.render(); }, '中断する'); });
    view.querySelector('#mkEnd').addEventListener('click', function () {
      var rest = run.ids.length - Object.keys(run.ans).length;
      ctx.confirm(rest ? 'まだ' + rest + '問、解答していません。提出しますか?' : '提出して採点します。よろしいですか?', function () { finish(false); ctx.render(); window.scrollTo(0, 0); }, '提出する');
    });
  }
  return { render: render, after: after, inMode: function () { return !!run; }, history: function () { return mocks(); }, historyCard: function () { var ms = mocks(); return ms.length ? historyCard(ms) : ''; } };
};
