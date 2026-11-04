/*
 * 英語トレーニング:リスニング(読み上げ音声で4択)とライティング(書いて、模範解答とチェックリストで自己採点)
 * データ:js/data/eng_listen.js(WPS.LISTEN)・js/data/eng_write.js(WPS.WRITE)。はじめて開いたときに読み込む。
 * 記録:S.get().eng = { L: { 問題ID: { ok, n, t } }, W: { 問題ID: { sc, t, x } } }
 */
WPS.makeEtrain = function (ctx) {
  var S = WPS.Store, h = ctx.h, VER = '20261107b';
  var LV = { 1: '中学・高校入試', 2: '共通テスト', 3: '難関大' };
  var TY = { short: '短い対話', dialog: '会話', talk: '説明・講義', announce: 'アナウンス', trans: '和文英訳', free: '自由英作文', email: 'メール', graph: '図表の説明', summary: '要約' };
  var st = { tab: 'listen', lv: 0, run: null, wid: null, rate: 1, showJa: false };
  var loadState = 0;
  function rec() { var s = S.get(); s.eng = s.eng || { L: {}, W: {} }; s.eng.L = s.eng.L || {}; s.eng.W = s.eng.W || {}; return s.eng; }
  function ensure() {
    if (WPS.LISTEN && WPS.WRITE) return true;
    if (loadState) return false; loadState = 1;
    var files = ['eng_listen', 'eng_write'], left = files.length;
    files.forEach(function (f) {
      var sc = document.createElement('script'); sc.src = 'js/data/' + f + '.js?v=' + VER;
      sc.onload = sc.onerror = function () { if (--left === 0) { loadState = 2; WPS.LISTEN = WPS.LISTEN || []; WPS.WRITE = WPS.WRITE || []; if (/^#etrain/.test(location.hash)) ctx.render(); } };
      document.head.appendChild(sc);
    });
    return false;
  }

  /* ---------- 読み上げ ---------- */
  var playing = false;
  function voices() { try { return speechSynthesis.getVoices().filter(function (v) { return /^en(-|_)(US|GB)/i.test(v.lang); }); } catch (e) { return []; } }
  function play(script, onDone) {
    if (!('speechSynthesis' in window)) { ctx.toast('この端末では読み上げが使えません'); return; }
    try { speechSynthesis.cancel(); } catch (e) { }
    var vs = voices(), who = {}, n = 0;
    playing = true;
    script.forEach(function (line, i) {
      var sp = line[0]; if (!(sp in who)) who[sp] = n++;
      var u = new SpeechSynthesisUtterance(line[1]);
      u.lang = 'en-US'; u.rate = 0.92 * st.rate;
      // 話し手ごとに声(または声の高さ)を変える
      var k = who[sp];
      if (vs.length > 1) u.voice = vs[k % vs.length]; else if (vs[0]) u.voice = vs[0];
      var PIT = { M: 0.8, W: 1.35, A: 0.9, B: 1.3, N: 1 }; u.pitch = sp in PIT ? PIT[sp] : (k % 2 ? 1.3 : 0.9); // 男性は低め・女性は高め
      if (i === script.length - 1) u.onend = u.onerror = function () { playing = false; if (onDone) onDone(); };
      speechSynthesis.speak(u);
    });
  }
  function stop() { try { speechSynthesis.cancel(); } catch (e) { } playing = false; }

  /* ---------- 画面 ---------- */
  function tabs() {
    return '<div class="et-tabs" role="tablist"><a href="#etrain/listen" role="tab" class="' + (st.tab === 'listen' ? 'on' : '') + '" aria-selected="' + (st.tab === 'listen') + '">🎧 リスニング</a><a href="#etrain/write" role="tab" class="' + (st.tab === 'write' ? 'on' : '') + '" aria-selected="' + (st.tab === 'write') + '">✍️ ライティング</a></div>';
  }
  function lvSeg(list) {
    return '<div class="et-lv" role="group" aria-label="レベル">' + [[0, 'すべて']].concat([1, 2, 3].map(function (k) { return [k, LV[k]]; })).map(function (x) {
      var n = list.filter(function (q) { return !x[0] || q.lv === x[0]; }).length;
      return '<button type="button" data-etlv="' + x[0] + '" class="' + (st.lv === x[0] ? 'on' : '') + '" aria-pressed="' + (st.lv === x[0]) + '">' + x[1] + '<small>' + n + '</small></button>';
    }).join('') + '</div>';
  }
  function render(arg) {
    st.tab = arg === 'write' ? 'write' : 'listen';
    if (!ensure()) return '<section class="card"><p>問題を読み込んでいます…</p></section>';
    if (st.tab === 'listen') return st.run ? listenQ() : listenHome();
    return st.wid ? writeQ() : writeHome();
  }

  // リスニング:一覧
  function listenHome() {
    var L = WPS.LISTEN, R = rec().L, list = L.filter(function (q) { return !st.lv || q.lv === st.lv; });
    var done = list.filter(function (q) { return R[q.id]; }).length, ok = list.filter(function (q) { return R[q.id] && R[q.id].ok; }).length;
    return tabs() + '<section class="card"><h2>リスニング</h2><p class="muted small">英語の音声を聞いて、4つの選択肢から答えます。音声は端末の読み上げ機能を使います。答えたあとに、英文(スクリプト)・和訳・聞き取りのコツが出ます。</p>' + lvSeg(L) +
      '<div class="et-sum"><span>解いた <b>' + done + '</b>/' + list.length + '</span><span>正解 <b>' + ok + '</b></span><span>正答率 <b>' + (done ? Math.round(ok / done * 100) : 0) + '%</b></span></div>' +
      '<div class="btns"><button type="button" class="btn primary big" data-etgo="new">まだ解いていない問題から10問</button><button type="button" class="btn big" data-etgo="ng">まちがえた問題をやり直す</button><button type="button" class="btn" data-etgo="all">ランダムに10問</button></div></section>' +
      '<section class="card"><h2>問題の一覧</h2><ul class="et-list">' + list.map(function (q) {
        var r = R[q.id];
        return '<li><button type="button" data-etone="' + q.id + '"><span class="et-mk ' + (r ? (r.ok ? 'ok' : 'ng') : '') + '">' + (r ? (r.ok ? '○' : '✕') : '・') + '</span><span class="et-t"><b>' + h(q.title || q.q) + '</b><small>' + LV[q.lv] + '・' + (TY[q.type] || '') + '</small></span></button></li>';
      }).join('') + '</ul></section>';
  }
  function startListen(ids) {
    if (!ids.length) { ctx.toast('対象の問題がありません'); return; }
    st.run = { ids: ids, i: 0, ans: null, plays: 0, ok: 0 }; st.showJa = false; ctx.render();
  }
  function listenQ() {
    var r = st.run, q = WPS.LISTEN.filter(function (x) { return x.id === r.ids[r.i]; })[0];
    if (!q) { st.run = null; return listenHome(); }
    var answered = r.ans !== null;
    var html = tabs() + '<section class="card et-q"><div class="et-top"><span>' + (r.i + 1) + ' / ' + r.ids.length + '</span><span>' + LV[q.lv] + '・' + (TY[q.type] || '') + '</span><button type="button" class="btn ghost small" id="etQuit">やめる</button></div>' +
      '<div class="et-player"><button type="button" class="et-play" id="etPlay" aria-label="音声を再生"><svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg></button><div><b>音声を聞く</b><small>再生 ' + r.plays + '回' + (q.lv >= 2 ? '(本番は1〜2回)' : '') + '</small></div>' +
      '<div class="et-rate" role="group" aria-label="速さ">' + [[0.8, 'ゆっくり'], [1, 'ふつう'], [1.15, '速め']].map(function (x) { return '<button type="button" data-etrate="' + x[0] + '" class="' + (st.rate === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div></div>' +
      '<p class="et-qq">' + h(q.q) + '</p><div class="et-ch">' + q.choices.map(function (c, i) {
        var cls = answered ? (i === q.a ? ' ok' : i === r.ans ? ' ng' : ' dim') : '';
        return '<button type="button" class="choice' + cls + '" data-etch="' + i + '"' + (answered ? ' disabled' : '') + '><span class="et-no">' + 'ABCD'[i] + '</span>' + h(c) + '</button>';
      }).join('') + '</div>';
    if (answered) {
      var ok = r.ans === q.a;
      html += '<div class="feedback ' + (ok ? 'ok' : 'ng') + '"><b class="fb-title">' + (ok ? '<span class="mk-big ok">○</span>正解!' : '<span class="mk-big ng">✕</span>正解は ' + 'ABCD'[q.a] + '「' + h(q.choices[q.a]) + '」') + '</b>' +
        '<div class="fb-exp"><small>くわしい解説</small><p>' + h(q.exp) + '</p></div>' +
        '<div class="et-script"><small>スクリプト(英文)</small>' + q.script.map(function (l) { return '<p><b>' + h(l[0]) + '</b>' + h(l[1]) + '</p>'; }).join('') + '<button type="button" class="btn small" id="etJa">' + (st.showJa ? '和訳をかくす' : '和訳を見る') + '</button>' + (st.showJa ? '<p class="et-ja">' + h(q.ja).replace(/\n/g, '<br>') + '</p>' : '') + '</div>' +
        (q.tip ? '<p class="et-tip"><b>聞き取りのコツ</b>' + h(q.tip) + '</p>' : '') + '</div>' +
        '<button type="button" class="btn primary big" id="etNext">' + (r.i + 1 < r.ids.length ? '次の問題' : '結果を見る') + '</button>';
    } else html += '<p class="hint">先に音声を聞いてから答えましょう。何回でも聞き直せます。</p>';
    return html + '</section>';
  }
  function listenResult() {
    var r = st.run;
    return tabs() + '<section class="card center"><h2>おつかれさま!</h2><p class="et-big">' + r.ok + ' / ' + r.ids.length + '</p><p class="muted">まちがえた問題は、一覧の「✕」から、もう一度聞き直せます。</p><div class="btns" style="justify-content:center"><button type="button" class="btn primary" data-etgo="new">続けて10問</button><button type="button" class="btn" id="etBack">一覧へ</button></div></section>';
  }

  // ライティング:一覧
  function writeHome() {
    var W = WPS.WRITE, R = rec().W, list = W.filter(function (q) { return !st.lv || q.lv === st.lv; });
    return tabs() + '<section class="card"><h2>ライティング</h2><p class="muted small">英文を書いてから「模範解答を見る」を押し、チェックリストで自己採点します。書いた答えは、この端末に保存されます。</p>' + lvSeg(W) + '</section>' +
      '<section class="card"><ul class="et-list">' + list.map(function (q) {
        var r = R[q.id];
        return '<li><button type="button" data-etw="' + q.id + '"><span class="et-mk ' + (r ? (r.sc >= 80 ? 'ok' : 'mid') : '') + '">' + (r ? r.sc : '・') + '</span><span class="et-t"><b>' + h(q.title || '') + '</b><small>' + LV[q.lv] + '・' + (TY[q.type] || '') + (q.words ? '・' + h(q.words) : '') + '</small></span></button></li>';
      }).join('') + '</ul></section>';
  }
  function words(t) { return (t.trim().match(/[A-Za-z0-9'’-]+/g) || []).length; }
  function writeQ() {
    var q = WPS.WRITE.filter(function (x) { return x.id === st.wid; })[0]; if (!q) { st.wid = null; return writeHome(); }
    var R = rec().W[q.id] || {}, shown = !!st.wShow;
    var html = tabs() + '<section class="card et-w"><div class="et-top"><span>' + LV[q.lv] + '・' + (TY[q.type] || '') + '</span><button type="button" class="btn ghost small" id="etWBack">一覧へ</button></div><h2>' + h(q.title || '') + '</h2>' +
      '<p class="et-prompt">' + h(q.prompt).replace(/\n/g, '<br>') + '</p>' + (q.words ? '<p class="et-words">語数:' + h(q.words) + '</p>' : '') +
      '<textarea id="etText" rows="' + (q.type === 'trans' ? 3 : 8) + '" placeholder="ここに英語で書きましょう" spellcheck="false" autocapitalize="sentences">' + h(st.wText != null ? st.wText : (R.x || '')) + '</textarea><p class="et-count" id="etCount">' + words(st.wText != null ? st.wText : (R.x || '')) + ' 語</p>';
    if (!shown) html += '<button type="button" class="btn primary big" id="etShow">模範解答を見る</button>';
    else {
      html += '<div class="et-model"><small>模範解答</small><p class="et-en">' + h(q.model) + '</p>' + (q.alt && q.alt.length ? '<p class="et-alt"><b>ほかの正解例</b>' + q.alt.map(h).join('<br>') + '</p>' : '') + (q.ja && q.type !== 'trans' ? '<p class="et-ja">' + h(q.ja) + '</p>' : '') + '</div>' +
        (q.points && q.points.length ? '<div class="et-pts"><small>使える表現・考え方</small><ul>' + q.points.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></div>' : '') +
        (q.miss && q.miss.length ? '<div class="et-miss"><small>よくあるミス</small><ul>' + q.miss.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="et-check"><small>自己チェック(できたものに✓)</small>' + q.check.map(function (c, i) { return '<label><input type="checkbox" data-etck="' + i + '"' + ((st.wChk || [])[i] ? ' checked' : '') + '><span>' + h(c) + '</span></label>'; }).join('') + '</div>' +
        '<button type="button" class="btn primary big" id="etSave">採点して保存</button>';
    }
    return html + '</section>';
  }

  function after(arg) {
    var view = document.getElementById('view');
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelectorAll('[data-etlv]').forEach(function (b) { b.addEventListener('click', function () { st.lv = +b.getAttribute('data-etlv'); re(); }); });
    view.querySelectorAll('[data-etgo]').forEach(function (b) { b.addEventListener('click', function () {
      var L = WPS.LISTEN.filter(function (q) { return !st.lv || q.lv === st.lv; }), R = rec().L, k = b.getAttribute('data-etgo'), pool;
      if (k === 'new') pool = L.filter(function (q) { return !R[q.id]; }); else if (k === 'ng') pool = L.filter(function (q) { return R[q.id] && !R[q.id].ok; }); else pool = L;
      if (k !== 'new' || !pool.length) pool = ctx.shuffle(pool.length ? pool : L);
      startListen(pool.slice(0, 10).map(function (q) { return q.id; }));
    }); });
    view.querySelectorAll('[data-etone]').forEach(function (b) { b.addEventListener('click', function () { startListen([b.getAttribute('data-etone')]); }); });
    var r = st.run;
    if (st.tab === 'listen' && r) {
      var q = WPS.LISTEN.filter(function (x) { return x.id === r.ids[r.i]; })[0];
      var pb = document.getElementById('etPlay');
      if (pb) pb.addEventListener('click', function () { if (playing) { stop(); pb.classList.remove('on'); return; } r.plays++; pb.classList.add('on'); var sm = pb.parentNode.querySelector('small'); if (sm) sm.textContent = '再生 ' + r.plays + '回' + (q.lv >= 2 ? '(本番は1〜2回)' : ''); play(q.script, function () { pb.classList.remove('on'); }); });
      view.querySelectorAll('[data-etrate]').forEach(function (b) { b.addEventListener('click', function () { st.rate = +b.getAttribute('data-etrate'); stop(); re(); }); });
      view.querySelectorAll('[data-etch]').forEach(function (b) { b.addEventListener('click', function () {
        if (r.ans !== null) return; r.ans = +b.getAttribute('data-etch'); var ok = r.ans === q.a; if (ok) r.ok++;
        var R = rec().L, o = R[q.id] || { n: 0 }; o.n++; o.ok = ok; o.t = Date.now(); R[q.id] = o;
        var s = S.get(); s.attempts.push({ s: 'eng', u: 'el_short', ok: ok, t: Date.now(), d: WPS.date.today(), src: 'listen' }); WPS.Streak.touch(); S.save(); stop(); re();
      }); });
      var ja = document.getElementById('etJa'); if (ja) ja.addEventListener('click', function () { st.showJa = !st.showJa; re(); });
      var nx = document.getElementById('etNext'); if (nx) nx.addEventListener('click', function () { stop(); if (r.i + 1 < r.ids.length) { r.i++; r.ans = null; r.plays = 0; st.showJa = false; ctx.render(); } else { view.innerHTML = listenResult(); after(arg); } });
      var qt = document.getElementById('etQuit'); if (qt) qt.addEventListener('click', function () { stop(); st.run = null; ctx.render(); });
    }
    var bk = document.getElementById('etBack'); if (bk) bk.addEventListener('click', function () { st.run = null; ctx.render(); });
    view.querySelectorAll('[data-etw]').forEach(function (b) { b.addEventListener('click', function () { st.wid = b.getAttribute('data-etw'); st.wShow = false; st.wText = null; st.wChk = []; ctx.render(); }); });
    var ta = document.getElementById('etText');
    if (ta) ta.addEventListener('input', function () { st.wText = ta.value; document.getElementById('etCount').textContent = words(ta.value) + ' 語'; });
    var sh = document.getElementById('etShow'); if (sh) sh.addEventListener('click', function () { if (ta) st.wText = ta.value; st.wShow = true; re(); });
    view.querySelectorAll('[data-etck]').forEach(function (c) { c.addEventListener('change', function () { st.wChk = st.wChk || []; st.wChk[+c.getAttribute('data-etck')] = c.checked; }); });
    var sv = document.getElementById('etSave'); if (sv) sv.addEventListener('click', function () {
      var q = WPS.WRITE.filter(function (x) { return x.id === st.wid; })[0], n = q.check.length, c = (st.wChk || []).filter(Boolean).length, sc = Math.round(c / n * 100);
      rec().W[q.id] = { sc: sc, t: Date.now(), x: (st.wText || '').slice(0, 2000) };
      var s = S.get(); s.attempts.push({ s: 'eng', u: 'ek_writing', ok: sc >= 80, t: Date.now(), d: WPS.date.today(), src: 'write' }); WPS.Streak.touch(); S.save();
      ctx.toast('自己採点 ' + sc + '点(' + c + '/' + n + ')を保存しました'); st.wid = null; ctx.render();
    });
    var wb = document.getElementById('etWBack'); if (wb) wb.addEventListener('click', function () { if (ta) st.wText = ta.value; st.wid = null; ctx.render(); });
  }
  function inMode() { return !!(st.run || st.wid); }
  return { render: render, after: after, inMode: inMode, stop: stop };
};
