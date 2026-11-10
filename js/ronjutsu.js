/*
 * 論述カットイン(#ronjutsu)
 * 問い → 自分で答えを考える(書いてもよい) → 模範解答のキーワードをタップして自己採点 → 完成度。
 * 完成度70%以上で「定着」。記録は state.ron に保存。
 */
window.WPS = window.WPS || {};
WPS.makeRonjutsu = function (ctx) {
  var h = ctx.h, toast = ctx.toast, S = WPS.Store;
  var SUBJ = { jh: '日本史', wh: '世界史', geo: '地理', seikei: '政経', rinri: '倫理', phys: '物理', chem: '化学', bio: '生物', earth: '地学' };
  var LV = { 1: 'Lv1 共通テスト向けの基礎', 2: 'Lv2 私大・国公立の標準', 3: 'Lv3 難関大の論述' };
  var st = { s: 'jh', lv: 0, run: null };
  function rec() { var s = S.get(); return s.ron || (s.ron = {}); }
  function kws(q) { var out = []; q.a.replace(/【([^】]+)】/g, function (_, k) { out.push(k); }); return out; }
  function stateOf(q) { var r = rec()[q.id]; return !r ? 'new' : r.best >= 70 ? 'ok' : 'try'; }
  function pool() { return WPS.RONJUTSU.filter(function (q) { return q.s === st.s && (!st.lv || q.lv === st.lv); }); }
  function shuffle(a) { return ctx.shuffle(a); }

  function top() {
    var all = pool(), c = { ok: 0, try: 0, new: 0 };
    all.forEach(function (q) { c[stateOf(q)]++; });
    var html = '<section class="card"><h2>論述カットイン</h2><p class="muted small">問いに答えを考えてから模範解答を開き、書けたキーワードをタップして採点します。キーワードの7割以上が書けたら「定着」です。</p>' +
      '<div class="filter-row"><span class="f-label">科目</span><div class="seg">' + Object.keys(SUBJ).filter(function (k) { return WPS.RONJUTSU.some(function (q) { return q.s === k; }); }).map(function (k) { return '<button type="button" class="seg-btn' + (st.s === k ? ' on' : '') + '" data-rs="' + k + '">' + SUBJ[k] + '</button>'; }).join('') + '</div></div>' +
      '<div class="filter-row"><span class="f-label">レベル</span><div class="seg">' + [[0, 'すべて']].concat([1, 2, 3].map(function (n) { return [n, 'Lv' + n]; })).map(function (o) { return '<button type="button" class="seg-btn' + (st.lv === o[0] ? ' on' : '') + '" data-rl="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div>' +
      '<div class="rj-sum"><span class="ok">定着 <b>' + c.ok + '</b></span><span class="try">練習中 <b>' + c.try + '</b></span><span>未挑戦 <b>' + c.new + '</b></span><span class="muted">全' + all.length + '問</span></div>' +
      '<button type="button" class="btn primary big" id="rjGo"' + (all.length ? '' : ' disabled') + '>10問はじめる</button>' +
      '<p class="hint">未挑戦・練習中の問いから先に出します。</p></section>';
    html += '<section class="card"><h2>問いの一覧</h2><ul class="rj-list">' + all.map(function (q) {
      var r = rec()[q.id], s = stateOf(q);
      return '<li><button type="button" data-rq="' + q.id + '"><span class="rj-lv">Lv' + q.lv + '</span><b>' + h(q.q) + '</b><em class="st-' + s + '">' + (s === 'ok' ? '定着' : s === 'try' ? r.best + '%' : '未') + '</em></button></li>';
    }).join('') + '</ul></section>';
    return html;
  }
  function start(list) {
    st.run = { list: list, i: 0, open: false, hit: {}, text: '' };
  }
  function quiz() {
    var r = st.run, q = r.list[r.i], K = kws(q), n = Object.keys(r.hit).filter(function (k) { return r.hit[k]; }).length;
    var pct = Math.round(n / K.length * 100);
    var ans = q.a.split(/(【[^】]+】)/).map(function (seg) {
      var m = seg.match(/^【([^】]+)】$/);
      if (!m) return h(seg);
      if (!r.open) return '<span class="rj-blank">' + '＿'.repeat(Math.min(6, m[1].length)) + '</span>';
      return '<button type="button" class="rj-kw' + (r.hit[m[1]] ? ' on' : '') + '" data-rk="' + h(m[1]) + '">' + h(m[1]) + '</button>';
    }).join('');
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="rjQuit">中断</button><b>' + SUBJ[q.s] + ' 論述<small> ' + (r.i + 1) + ' / ' + r.list.length + '</small></b><span></span></div>' +
      '<div class="progress"><i style="width:' + Math.round(r.i / r.list.length * 100) + '%"></i></div>' +
      '<section class="card rj-card"><div class="rj-top"><span class="rj-topic">' + h(q.topic) + ' からつながる論述</span><span class="rj-state">' + ({ new: '新規', try: '練習中', ok: '定着' })[stateOf(q)] + '</span></div>' +
      '<p class="rj-q">' + h(q.q) + '</p>' +
      (r.open ? (r.text ? '<div class="rj-mine"><small>あなたの答え</small><p>' + h(r.text) + '</p></div>' : '') +
        '<p class="rj-label">模範解答（書けたキーワードをタップして採点）</p><p class="rj-ans">' + ans + '</p>' +
        '<div class="rj-meter' + (pct >= 70 ? ' ok' : '') + '"><b>完成度 ' + pct + '%</b><span>（書けた ' + n + ' / ' + K.length + '）</span><small>70%以上で定着</small></div>' +
        '<button type="button" class="btn primary big vt-next" id="rjNext">' + (r.i + 1 >= r.list.length ? '結果を見る' : '次へ') + '</button>'
        : '<label class="rj-write">答えを書いてみよう（書かずに頭の中で考えてもOK）<textarea id="rjText" rows="4" placeholder="キーワードを入れて、2〜3文で">' + h(r.text) + '</textarea></label>' +
        '<p class="rj-ans dim">' + ans + '</p><button type="button" class="btn primary big" id="rjOpen">模範解答を見る</button>') +
      '<p class="rj-lvtag">' + LV[q.lv] + '</p></section>';
  }
  function result() {
    var r = st.run, done = r.list.map(function (q) { return { q: q, p: (rec()[q.id] || {}).last || 0 }; });
    var ok = done.filter(function (x) { return x.p >= 70; }).length;
    return '<section class="card center"><h2>論述カットイン おわり</h2><p>' + done.length + '問のうち <b>' + ok + '問</b> が完成度70%以上でした。</p>' +
      '<ul class="rj-list rj-res">' + done.map(function (x) { return '<li><span class="rj-lv">' + x.p + '%</span><b>' + h(x.q.q) + '</b></li>'; }).join('') + '</ul>' +
      '<div class="btns" style="justify-content:center"><button type="button" class="btn primary" id="rjAgain">70%未満の問いをもう一度</button><button type="button" class="btn" id="rjBack">戻る</button></div></section>';
  }
  function render() {
    if (st.run && st.run.i >= st.run.list.length) return result();
    if (st.run) return quiz();
    return top();
  }
  function after() {
    var view = document.getElementById('view');
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    if (!st.run) {
      view.querySelectorAll('[data-rs]').forEach(function (b) { b.addEventListener('click', function () { st.s = b.getAttribute('data-rs'); re(); }); });
      view.querySelectorAll('[data-rl]').forEach(function (b) { b.addEventListener('click', function () { st.lv = +b.getAttribute('data-rl'); re(); }); });
      var go = view.querySelector('#rjGo');
      if (go) go.addEventListener('click', function () {
        var all = pool(), first = shuffle(all.filter(function (q) { return stateOf(q) !== 'ok'; })), rest = shuffle(all.filter(function (q) { return stateOf(q) === 'ok'; }));
        start(first.concat(rest).slice(0, 10)); ctx.render(); window.scrollTo(0, 0);
      });
      view.querySelectorAll('[data-rq]').forEach(function (b) { b.addEventListener('click', function () { var id = b.getAttribute('data-rq'); start(WPS.RONJUTSU.filter(function (q) { return q.id === id; })); ctx.render(); window.scrollTo(0, 0); }); });
      return;
    }
    var r = st.run;
    if (r.i >= r.list.length) {
      view.querySelector('#rjBack').addEventListener('click', function () { st.run = null; ctx.render(); });
      view.querySelector('#rjAgain').addEventListener('click', function () {
        var again = r.list.filter(function (q) { return ((rec()[q.id] || {}).last || 0) < 70; });
        if (!again.length) { toast('すべて70%以上でした'); return; }
        start(again); ctx.render(); window.scrollTo(0, 0);
      });
      return;
    }
    var q = r.list[r.i];
    view.querySelector('#rjQuit').addEventListener('click', function () { st.run = null; ctx.render(); });
    var tx = view.querySelector('#rjText'); if (tx) tx.addEventListener('input', function () { r.text = tx.value; });
    var op = view.querySelector('#rjOpen');
    if (op) op.addEventListener('click', function () {
      r.open = true;
      // 書いた答えに含まれるキーワードは、最初から「書けた」にしておく
      var t = (r.text || '').replace(/\s/g, '');
      kws(q).forEach(function (k) { if (t && t.indexOf(k.replace(/[=・（）()]/g, '')) >= 0) r.hit[k] = true; });
      re();
    });
    view.querySelectorAll('[data-rk]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-rk'); r.hit[k] = !r.hit[k]; re(); }); });
    var nx = view.querySelector('#rjNext');
    if (nx) nx.addEventListener('click', function () {
      var K = kws(q), n = K.filter(function (k) { return r.hit[k]; }).length, p = Math.round(n / K.length * 100);
      if (!S.isView()) {
        var o = rec()[q.id] || { best: 0, n: 0 };
        o.last = p; o.best = Math.max(o.best, p); o.n++; o.t = Date.now(); rec()[q.id] = o;
        var xr = WPS.Quest ? WPS.Quest.onAnswer(p >= 70, { extra: true }) : null;
        if (xr && xr.msg) xr.msg.forEach(function (m, i) { setTimeout(function () { toast(m); }, 600 + i * 2400); });
        S.save();
      }
      r.i++; r.open = false; r.hit = {}; r.text = '';
      ctx.render(); window.scrollTo(0, 0);
    });
  }
  function inMode() { return !!st.run; }
  return { render: render, after: after, inMode: inMode };
};
