/*
 * 科目別テスト(#ctest):数学Ⅰ・物理・日本史などの「科目」を選んで、時間を計って解き、最後にまとめて採点する。
 * ・問題は「教科ごと」にまとめて出す(国語 → 数学 → 外国語 → 理科 → 地理歴史 → 公民 → 情報 の順。教科の中は選んだ科目ごと)
 * ・テスト中は「資料」(元素表・地図・公式集など)を開けない(body.no-tools。tools.js が見て止める)
 * ・途中で答えは出さない/あとで見直す印/問題番号の一覧(教科ごと)から移動
 * ・結果:得点率・教科別・科目別・レベル別・見直し。記録は state.ctests に保存(最新30回)
 */
window.WPS = window.WPS || {};
WPS.makeCtest = function (ctx) {
  var h = ctx.h, toast = ctx.toast, shuffle = ctx.shuffle, S = WPS.Store, D = WPS.date;
  var LV = { 0: 'ミックス', 1: '基礎', 2: '標準', 3: '難関' };
  var SIZES = [[10, 15], [20, 30], [30, 45], [50, 75]]; // 問題数, 分
  var ORDER = ['jpn', 'math', 'eng', 'sci', 'soc', 'info'];
  var st = { size: 1, lv: 0, sel: null, tab: null };
  var run = null, tick = null, last = null;

  function rec() { var s = S.get(); return s.ctests || (s.ctests = []); }
  function isJH() { var g = S.get().profile.grade; return WPS.isJHStudent ? WPS.isJHStudent(g) : /^中/.test(g || ''); }

  /* ---------- 科目の一覧(教科ごと) ---------- */
  function unitsOf(c) {
    var us = [];
    (c.areas || []).forEach(function (a) { (a.units || []).forEach(function (id) { if (us.indexOf(id) < 0) us.push(id); }); });
    (c.units || []).forEach(function (id) { if (us.indexOf(id) < 0) us.push(id); });
    return us.filter(function (id) { return WPS.UNIT_MAP[id]; });
  }
  // 画面に文字だけで出せる問題(音声・図が必要なものは除く)
  function usable(q) { return q && q.choices && q.choices.length >= 3 && !q.say && !q.sayChoices && !q.fig; }
  var poolCache = {};
  function pool(c) {
    if (poolCache[c.id]) return poolCache[c.id];
    var out = [];
    unitsOf(c).forEach(function (uid) {
      var u = WPS.UNIT_MAP[uid];
      (u.questions || []).forEach(function (q) { if (usable(q)) out.push(q.id); });
      if (u.hasGen) for (var sd = 1; sd <= 40; sd += 3) { var id = WPS.genId(uid, sd), q = WPS.Q(id); if (usable(q)) out.push(id); }
    });
    // 同じ文面の問題は1つにする
    var seen = {};
    out = out.filter(function (id) { var t = WPS.Q(id).text; if (seen[t]) return false; seen[t] = 1; return true; });
    return (poolCache[c.id] = out);
  }
  function groups() {
    var jh = isJH(), out = [];
    (WPS.CURRICULUM || []).forEach(function (g) {
      if (g.guideOnly || !g.subj) return;
      var cs = (g.courses || []).filter(function (c) { return !c.guide && (c.stage === 'jh') === jh && pool(c).length >= 5; });
      if (cs.length) out.push({ name: g.name, subj: g.subj, courses: cs });
    });
    out.sort(function (a, b) { return ORDER.indexOf(a.subj) - ORDER.indexOf(b.subj); });
    return out;
  }
  // 科目の表示名:短い正式名(数学Ⅰ など)はそのまま、長いものは略称(現代文 など)
  function cname(c) { return c.name.length <= 8 ? c.name : (c.short || c.name); }
  function courseOf(id) { var r = null; groups().forEach(function (g) { g.courses.forEach(function (c) { if (c.id === id) r = { g: g, c: c }; }); }); return r; }
  function selected() {
    if (!st.sel) { var s = S.get(); st.sel = (s.ctestSel || []).slice(); }
    st.sel = st.sel.filter(function (id) { return courseOf(id); });
    return st.sel;
  }

  /* ---------- 出題を作る ---------- */
  function lvOf(id) { var q = WPS.Q(id); return q.level || 1; }
  function start() {
    var sel = selected(), n = SIZES[st.size][0];
    if (!sel.length) { toast('科目を1つ以上選んでください'); return false; }
    // 科目ごとに均等に配分(余りは前から)
    var per = Math.floor(n / sel.length), extra = n - per * sel.length, items = [];
    sel.forEach(function (cid, i) {
      var x = courseOf(cid), want = per + (i < extra ? 1 : 0), p = shuffle(pool(x.c).slice());
      var pick = st.lv ? p.filter(function (id) { return lvOf(id) === st.lv; }) : p;
      if (pick.length < want) pick = pick.concat(p.filter(function (id) { return pick.indexOf(id) < 0; })); // 足りないときは他のレベルで補う
      pick.slice(0, want).forEach(function (id) { items.push({ id: id, c: cid, g: x.g.name, subj: x.g.subj }); });
    });
    // 教科ごと → 科目ごと(選んだ順)に並べる。科目の中はやさしい順
    items.sort(function (a, b) { return ORDER.indexOf(a.subj) - ORDER.indexOf(b.subj) || a.g.localeCompare(b.g) || sel.indexOf(a.c) - sel.indexOf(b.c) || lvOf(a.id) - lvOf(b.id); });
    if (!items.length) { toast('問題が見つかりませんでした'); return false; }
    var s = S.get(); s.ctestSel = sel.slice(); S.save();
    run = { items: items, i: 0, ans: {}, flag: {}, sec: {}, order: {}, t0: Date.now(), limit: SIZES[st.size][1] * 60, enter: Date.now(), lv: st.lv };
    items.forEach(function (it) { var q = WPS.Q(it.id); run.order[it.id] = shuffle(q.choices.map(function (_, i) { return i; })); });
    lockTools(true);
    return true;
  }
  function left() { return Math.max(0, run.limit - Math.floor((Date.now() - run.t0) / 1000)); }
  function mmss(s) { return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
  function leave() { var id = run.items[run.i].id; run.sec[id] = (run.sec[id] || 0) + (Date.now() - run.enter) / 1000; run.enter = Date.now(); }
  // テスト中は資料を開けない
  function lockTools(on) {
    document.body.classList.toggle('no-tools', !!on);
    if (on && WPS.Tools && WPS.Tools.closeAll) WPS.Tools.closeAll();
  }

  /* ---------- 画面:はじめ ---------- */
  function top() {
    var gs = groups(), sel = selected(), n = SIZES[st.size][0];
    if (!gs.length) return '<section class="card"><p class="muted">選べる科目がありません。</p></section>';
    if (!st.tab || !gs.some(function (g) { return g.name === st.tab; })) st.tab = gs[0].name;
    var html = '<section class="card ct-top"><h2>科目別テスト</h2><p class="muted small">科目を選んで、時間を計って解きます。問題は<b>教科ごと</b>にまとめて出ます。答え合わせは最後にまとめて行います。<br>テスト中は「資料」(元素表・地図・公式集など)は開けません。</p>' +
      '<h3 class="wq-h">1. 科目を選ぶ<small>(いくつでも)</small></h3>' +
      '<div class="ct-gtabs" role="tablist" aria-label="教科">' + gs.map(function (g) {
        var k = g.courses.filter(function (c) { return sel.indexOf(c.id) >= 0; }).length;
        return '<button type="button" role="tab" class="ct-gtab' + (st.tab === g.name ? ' on' : '') + '" aria-selected="' + (st.tab === g.name) + '" data-ctg="' + h(g.name) + '" style="--c:' + ((WPS.SUBJECTS[g.subj] || {}).color || '#1146d6') + '">' + h(g.name) + (k ? '<em>' + k + '</em>' : '') + '</button>';
      }).join('') + '</div>' +
      gs.filter(function (g) { return g.name === st.tab; }).map(function (g) {
        return '<div class="ct-courses" role="group" aria-label="' + h(g.name) + 'の科目">' + g.courses.map(function (c) {
          var on = sel.indexOf(c.id) >= 0;
          return '<button type="button" class="ct-course' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-ctc="' + c.id + '"><b>' + h(cname(c)) + '</b>' + (cname(c) === c.name ? '' : '<small>' + h(c.name) + '</small>') + '</button>';
        }).join('') + '</div>';
      }).join('') +
      '<div class="ct-picked">' + (sel.length ? '<p>選んだ科目(' + sel.length + ')</p><ul>' + gs.map(function (g) {
        var cs = g.courses.filter(function (c) { return sel.indexOf(c.id) >= 0; });
        return cs.length ? '<li><span>' + h(g.name) + '</span>' + cs.map(function (c) { return '<button type="button" data-ctc="' + c.id + '" aria-label="' + h(cname(c)) + 'を外す">' + h(cname(c)) + ' ×</button>'; }).join('') + '</li>' : '';
      }).join('') + '</ul>' : '<p class="muted small">まだ選んでいません。上の教科を切りかえて、科目を押してください。</p>') + '</div>' +
      '<h3 class="wq-h">2. 問題数と時間</h3><div class="wq-seg">' + SIZES.map(function (z, i) { return '<button type="button" class="' + (st.size === i ? 'on' : '') + '" data-ctsz="' + i + '">' + z[0] + '問・' + z[1] + '分</button>'; }).join('') + '</div>' +
      '<h3 class="wq-h">3. レベル</h3><div class="wq-seg">' + [0, 1, 2, 3].map(function (d) { return '<button type="button" class="' + (st.lv === d ? 'on' : '') + '" data-ctlv="' + d + '">' + LV[d] + '</button>'; }).join('') + '</div>' +
      (sel.length ? '<p class="mk-plan">' + sel.map(function (cid, i) { var x = courseOf(cid), per = Math.floor(n / sel.length) + (i < n % sel.length ? 1 : 0); return '<span>' + h(cname(x.c)) + ' ' + per + '問</span>'; }).join('') + '</p>' : '') +
      '<button type="button" class="btn primary big wq-go" id="ctGo"' + (sel.length ? '' : ' disabled') + '>テストをはじめる<small>途中でやめると記録は残りません</small></button></section>';
    var rs = rec(); if (rs.length) html += historyCard(rs);
    return html;
  }
  function historyCard(rs) {
    return '<section class="card"><h2>科目別テストの記録</h2><ul class="mk-hist">' + rs.slice(-6).reverse().map(function (m) {
      return '<li><span>' + h(m.d.slice(5).replace('-', '/')) + '</span><span>' + h(m.names.join('・')) + '</span><b>' + m.pct + '%</b><small>' + m.n + '問</small></li>';
    }).join('') + '</ul></section>';
  }

  /* ---------- 画面:解答中 ---------- */
  function quiz() {
    var it = run.items[run.i], q = WPS.Q(it.id), x = courseOf(it.c), done = Object.keys(run.ans).length, l = left();
    var first = !run.i || run.items[run.i - 1].g !== it.g;
    return '<div class="mk-bar ct-bar"><button type="button" class="vt-link" id="ctQuit">中断</button><b class="mk-time' + (l <= 60 ? ' warn' : '') + '" id="ctTime">' + mmss(l) + '</b><button type="button" class="vt-link" id="ctEnd">提出する</button></div>' +
      '<div class="progress"><i style="width:' + Math.round(done / run.items.length * 100) + '%"></i></div>' +
      '<p class="ct-lock" role="note">テスト中は「資料」を開けません</p>' +
      (first ? '<p class="ct-part" style="--c:' + ((WPS.SUBJECTS[it.subj] || {}).color || '#1146d6') + '">' + h(it.g) + 'の問題</p>' : '') +
      '<section class="card question"><div class="q-meta"><span>第' + (run.i + 1) + '問 / ' + run.items.length + '</span><span class="ct-tag" style="--c:' + ((WPS.SUBJECTS[it.subj] || {}).color || '#1146d6') + '">' + h(it.g) + ' ・ ' + h(x ? cname(x.c) : '') + '</span>' +
      '<button type="button" class="mk-flag' + (run.flag[it.id] ? ' on' : '') + '" id="ctFlag" aria-pressed="' + !!run.flag[it.id] + '">あとで見直す</button></div>' +
      '<p class="q-text">' + h(q.text) + '</p><div class="choices">' + run.order[it.id].map(function (ci, k) {
        return '<button class="choice' + (run.ans[it.id] === ci ? ' picked' : '') + '" data-ctci="' + ci + '"><b>' + 'ABCD'[k] + '</b><span>' + h(q.choices[ci]) + '</span></button>';
      }).join('') + '</div></section>' +
      '<div class="mk-nav"><button type="button" class="btn" id="ctPrev"' + (run.i ? '' : ' disabled') + '>前の問題</button><button type="button" class="btn primary" id="ctNext">' + (run.i + 1 < run.items.length ? '次の問題' : '一覧で確認') + '</button></div>' +
      '<section class="card ct-map"><h3>問題の一覧</h3>' + partList().map(function (p) {
        return '<div class="ct-mapg"><p style="--c:' + ((WPS.SUBJECTS[p.subj] || {}).color || '#1146d6') + '">' + h(p.g) + '</p><div class="mk-grid">' + p.idx.map(function (i) {
          var y = run.items[i]; return '<button type="button" class="mk-cell' + (run.ans[y.id] !== undefined ? ' done' : '') + (run.flag[y.id] ? ' fl' : '') + (i === run.i ? ' cur' : '') + '" data-ctgo="' + i + '" aria-label="第' + (i + 1) + '問">' + (i + 1) + '</button>';
        }).join('') + '</div></div>';
      }).join('') + '<p class="muted small">色つき=解答済み、赤い点=あとで見直す</p></section>';
  }
  function partList() {
    var out = [];
    run.items.forEach(function (it, i) { var p = out[out.length - 1]; if (!p || p.g !== it.g) out.push(p = { g: it.g, subj: it.subj, idx: [] }); p.idx.push(i); });
    return out;
  }

  /* ---------- 採点 ---------- */
  function finish(auto) {
    leave(); clearInterval(tick); lockTools(false);
    var res = run.items.map(function (it) { var q = WPS.Q(it.id); return { it: it, q: q, ok: run.ans[it.id] === 0, pick: run.ans[it.id], sec: Math.round(run.sec[it.id] || 0) }; });
    var used = Math.min(run.limit, Math.round((Date.now() - run.t0) / 1000)), ok = res.filter(function (x) { return x.ok; }).length;
    var byG = {}, byC = {}, byL = {};
    res.forEach(function (x) {
      var g = x.it.g, c = x.it.c, l = x.q.level || 1;
      (byG[g] = byG[g] || [0, 0, x.it.subj])[1]++; if (x.ok) byG[g][0]++;
      (byC[c] = byC[c] || [0, 0])[1]++; if (x.ok) byC[c][0]++;
      (byL[l] = byL[l] || [0, 0])[1]++; if (x.ok) byL[l][0]++;
    });
    var names = [], seen = {}; res.forEach(function (x) { if (!seen[x.it.c]) { seen[x.it.c] = 1; var cx = courseOf(x.it.c); names.push(cx ? cname(cx.c) : x.it.c); } });
    var m = { d: D.today(), t: Date.now(), n: res.length, ok: ok, pct: Math.round(ok / res.length * 100), used: used, lv: run.lv, names: names, byC: byC };
    if (!S.isView()) {
      var s = S.get();
      res.forEach(function (x) { s.attempts.push({ q: x.it.id, u: x.q.unit, s: x.q.subj, ok: x.ok, ch: x.pick === undefined ? null : x.q.choices[x.pick], unsure: x.pick === undefined, mode: 'choice', src: 'ctest', t: Date.now(), d: D.today() }); });
      rec().push(m); if (rec().length > 30) rec().shift();
      if (WPS.Streak) WPS.Streak.touch();
      S.save();
    }
    last = { m: m, res: res, byG: byG, byC: byC, byL: byL, auto: auto };
    run = null;
  }
  function bar(label, v, col) { var p = Math.round(v[0] / v[1] * 100); return '<div class="why-row"><span>' + label + '</span><div class="why-track"><i style="width:' + p + '%' + (col ? ';background:' + col : '') + '"></i></div><b>' + p + '%</b><small class="ct-n">' + v[0] + '/' + v[1] + '</small></div>'; }
  function result() {
    var m = last.m, res = last.res, C = 2 * Math.PI * 70, avg = Math.round(m.used / m.n);
    var html = (last.auto ? '<p class="info">時間になったので、自動で提出しました。</p>' : '') +
      '<section class="card vt-result"><h2>科目別テストの結果</h2><div class="vt-ring"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="70" class="bg"/><circle cx="80" cy="80" r="70" class="fg" style="stroke-dasharray:' + (C * m.pct / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><div><small>得点率</small><b>' + m.pct + '%</b><small>' + m.ok + ' / ' + m.n + '問</small></div></div>' +
      '<div class="lc-tiles"><div class="lc lc-time"><span>かかった時間</span><b>' + mmss(m.used) + '</b></div><div class="lc lc-acc"><span>1問あたり</span><b>' + avg + '秒</b></div><div class="lc lc-xp"><span>未解答</span><b>' + res.filter(function (x) { return x.pick === undefined; }).length + '</b></div></div></section>';
    html += '<section class="card"><h2>教科別</h2><div class="why-bars">' + Object.keys(last.byG).map(function (g) { var v = last.byG[g]; return bar(h(g), v, (WPS.SUBJECTS[v[2]] || {}).color); }).join('') + '</div>' +
      '<h3 class="wq-h">科目別</h3><div class="why-bars">' + Object.keys(last.byC).map(function (c) { var x = courseOf(c); return bar(h(x ? cname(x.c) : c), last.byC[c]); }).join('') + '</div>' +
      '<h3 class="wq-h">レベル別</h3><div class="why-bars">' + Object.keys(last.byL).map(function (l) { return bar(LV[l], last.byL[l]); }).join('') + '</div></section>';
    var weak = Object.keys(last.byC).map(function (c) { return [c, last.byC[c][0] / last.byC[c][1]]; }).sort(function (a, b) { return a[1] - b[1]; })[0];
    if (weak && weak[1] < 0.7) { var wx = courseOf(weak[0]); if (wx) html += '<p class="why-tip"><b>次にやること</b>いちばん伸びしろが大きいのは<b>' + h(cname(wx.c)) + '</b>です。テキストで読み直してから、もう一度受けてみましょう。<a href="#books/' + wx.c.id + '">' + h(cname(wx.c)) + 'のテキストを開く</a></p>'; }
    var cur = '';
    html += '<section class="card"><h2>見直し</h2><ol class="mk-rev">' + res.map(function (x) {
      var head = x.it.g !== cur ? '<li class="ct-revh">' + h(x.it.g) + '</li>' : ''; cur = x.it.g;
      return head + '<li class="' + (x.ok ? 'ok' : 'ng') + '"><p><b>' + (x.ok ? '○' : '✕') + '</b> ' + h(x.q.text) + '</p><p class="small">正解:<b>' + h(x.q.answer) + '</b>' + (!x.ok ? '　あなた:' + (x.pick === undefined ? '未解答' : h(x.q.choices[x.pick])) : '') + '<span class="muted">(' + x.sec + '秒)</span></p>' + (!x.ok && x.q.exp ? '<p class="small muted">' + h(x.q.exp) + '</p>' : '') + '</li>';
    }).join('') + '</ol><div class="btns"><button type="button" class="btn primary" id="ctAgain">もう一度受ける</button><a class="btn" href="#test">診断・練習へ</a></div></section>';
    return html;
  }

  function render() {
    if (run && left() <= 0) finish(true); // 別の画面にいるあいだに時間切れになった
    if (run) return quiz(); if (last) return result(); return top();
  }
  function after() {
    var view = document.getElementById('view');
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    if (!run && !last) {
      view.querySelectorAll('[data-ctg]').forEach(function (b) { b.addEventListener('click', function () { st.tab = b.getAttribute('data-ctg'); re(); }); });
      view.querySelectorAll('[data-ctc]').forEach(function (b) { b.addEventListener('click', function () { var id = b.getAttribute('data-ctc'), sel = selected(), i = sel.indexOf(id); if (i >= 0) sel.splice(i, 1); else sel.push(id); re(); }); });
      view.querySelectorAll('[data-ctsz]').forEach(function (b) { b.addEventListener('click', function () { st.size = +b.getAttribute('data-ctsz'); re(); }); });
      view.querySelectorAll('[data-ctlv]').forEach(function (b) { b.addEventListener('click', function () { st.lv = +b.getAttribute('data-ctlv'); re(); }); });
      var go = view.querySelector('#ctGo'); if (go) go.addEventListener('click', function () { if (start()) { ctx.render(); window.scrollTo(0, 0); } });
      return;
    }
    if (last && !run) { view.querySelector('#ctAgain').addEventListener('click', function () { last = null; ctx.render(); window.scrollTo(0, 0); }); return; }
    clearInterval(tick);
    tick = setInterval(function () {
      if (!run || location.hash !== '#ctest') { clearInterval(tick); return; }
      var l = left(), el = document.getElementById('ctTime');
      if (el) { el.textContent = mmss(l); el.classList.toggle('warn', l <= 60); }
      if (l <= 0) { finish(true); ctx.render(); window.scrollTo(0, 0); }
    }, 1000);
    function go(i) { leave(); run.i = Math.max(0, Math.min(run.items.length - 1, i)); ctx.render(); window.scrollTo(0, 0); }
    view.querySelectorAll('[data-ctci]').forEach(function (b) { b.addEventListener('click', function () { run.ans[run.items[run.i].id] = +b.getAttribute('data-ctci'); re(); }); });
    view.querySelector('#ctFlag').addEventListener('click', function () { var id = run.items[run.i].id; run.flag[id] = !run.flag[id]; re(); });
    view.querySelector('#ctPrev').addEventListener('click', function () { go(run.i - 1); });
    view.querySelector('#ctNext').addEventListener('click', function () { if (run.i + 1 < run.items.length) go(run.i + 1); else view.querySelector('.ct-map').scrollIntoView({ behavior: 'smooth' }); });
    view.querySelectorAll('[data-ctgo]').forEach(function (b) { b.addEventListener('click', function () { go(+b.getAttribute('data-ctgo')); }); });
    view.querySelector('#ctQuit').addEventListener('click', function () { ctx.confirm('テストを中断します。ここまでの解答は記録されません。よろしいですか?', function () { clearInterval(tick); run = null; lockTools(false); ctx.render(); }, '中断する'); });
    view.querySelector('#ctEnd').addEventListener('click', function () {
      var rest = run.items.length - Object.keys(run.ans).length;
      ctx.confirm(rest ? 'まだ' + rest + '問、解答していません。提出しますか?' : '提出して採点します。よろしいですか?', function () { finish(false); ctx.render(); window.scrollTo(0, 0); }, '提出する');
    });
  }
  return { render: render, after: after, inMode: function () { return !!run; }, history: function () { return rec(); } };
};
