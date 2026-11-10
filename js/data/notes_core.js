/*
 * 解答を深くするためのデータのしくみ(ことばのノート・問題ごとのくわしい解説)
 *
 * ・WPS.addNotes({ '語句': { alt, use, ex, syn, ant } })
 *     alt … ほかの意味(配列)。「意味 ― 例」の形で1つずつ書く
 *     use … 使い方・ニュアンス / ex … 例文(配列) / syn … 類義語(配列) / ant … 対義語(配列)
 *   同じ語句が複数のファイルにあれば、まだ無い項目だけを足す(alt・ex は重ならないものを足す)。
 * ・WPS.addDeep({ '問題ID': { d, steps, alt, tip } })
 *     d … 深い解説(\n で段落) / steps … 解き方の手順(配列)
 *     alt … ことばの問題なら、ほかの意味(配列) / tip … 覚え方・関連知識
 * 量が多いデータ(英単語など)は、起動を遅くしないよう、あとから読み込む(WPS.loadNotes)。
 */
window.WPS = window.WPS || {};
WPS.WORDNOTE = WPS.WORDNOTE || {};
WPS.QDEEP = WPS.QDEEP || {};
(function () {
  function uniq(a, b) { (b || []).forEach(function (x) { if (a.indexOf(x) < 0) a.push(x); }); return a; }
  WPS.addNotes = function (o) {
    Object.keys(o).forEach(function (k) {
      var n = o[k], cur = WPS.WORDNOTE[k];
      if (!cur) { WPS.WORDNOTE[k] = n; return; }
      ['use'].forEach(function (f) { if (!cur[f] && n[f]) cur[f] = n[f]; });
      ['alt', 'ex', 'syn', 'ant'].forEach(function (f) { if (n[f] && n[f].length) cur[f] = uniq((cur[f] || []).slice(), n[f]); });
    });
  };
  WPS.addDeep = function (o) { Object.keys(o).forEach(function (k) { WPS.QDEEP[k] = o[k]; }); };

  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function list(a) { return '<ul>' + a.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>'; }
  function paras(t) { return String(t).split('\n').filter(Boolean).map(function (x) { return '<p>' + h(x) + '</p>'; }).join(''); }

  // 問題文の「…」から、ノートのある語句を探す(はじめに見つかったもの)
  WPS.noteTerm = function (text) {
    var re = /「([^」]{1,20})」/g, m;
    while ((m = re.exec(text || ''))) if (WPS.WORDNOTE[m[1]]) return m[1];
    return null;
  };
  // ことばのノート(ほかの意味・使い方・例文・類義語・対義語)
  WPS.wordNoteHTML = function (term, skipAlt) {
    var wn = term && WPS.WORDNOTE[term];
    if (!wn) return '';
    var alt = skipAlt ? [] : (wn.alt || []);
    var body = (alt.length ? '<p class="fw-h">ほかの意味</p>' + list(alt) : '') +
      (wn.use ? '<p class="fw-h">使い方</p><p>' + h(wn.use) + '</p>' : '') +
      (wn.ex && wn.ex.length ? '<p class="fw-h">例文</p>' + list(wn.ex) : '') +
      ((wn.syn && wn.syn.length) || (wn.ant && wn.ant.length) ? '<p class="fw-rel">' + (wn.syn && wn.syn.length ? '<span><b>類義語</b>' + wn.syn.map(h).join('・') + '</span>' : '') + (wn.ant && wn.ant.length ? '<span><b>対義語</b>' + wn.ant.map(h).join('・') + '</span>' : '') + '</p>' : '');
    return body ? '<div class="fb-word"><small>「' + h(term) + '」をもっと知る</small>' + body + '</div>' : '';
  };
  // 問題ごとのくわしい解説
  WPS.deepHTML = function (id) {
    var d = id && WPS.QDEEP[id];
    if (!d) return '';
    return '<div class="fb-deep"><small>もっとくわしく</small>' + (d.d ? paras(d.d) : '') +
      (d.steps && d.steps.length ? '<p class="fw-h">考え方の手順</p><ol>' + d.steps.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ol>' : '') +
      (d.alt && d.alt.length ? '<p class="fw-h">ほかの意味</p>' + list(d.alt) : '') +
      (d.tip ? '<p class="fd-tip"><b>覚え方・関連</b>' + h(d.tip) + '</p>' : '') + '</div>';
  };

  // ---- 数学の「別の解き方」(js/data/qalt_math.js) ----
  // WPS.QALT[問題ID] / [単元ID:節:例題] = [{ n:名前, steps:[...], a:答え }]、['unit:単元ID'] = [{ n, d:使いどころ, ex:計算例 }]
  WPS.QALT = WPS.QALT || null;
  var altCbs = null;
  WPS.loadAlt = function (cb) {
    if (WPS.QALT) return cb && cb();
    if (altCbs) { if (cb) altCbs.push(cb); return; }
    altCbs = cb ? [cb] : [];
    var s = document.createElement('script'); s.src = 'js/data/qalt_math.js?v=' + VER;
    s.onload = s.onerror = function () { var q = altCbs; altCbs = null; WPS.QALT = WPS.QALT || {}; q.forEach(function (f) { f(); }); };
    document.head.appendChild(s);
  };
  function rt2(t) { return h(t || '').replace(/【([^】]*)】/g, '<b>$1</b>').replace(/\n/g, '<br>'); }
  WPS.altHTML = function (list, unitList) {
    var L = list && list.length ? list : null, UL = !L && unitList && unitList.length ? unitList : null;
    if (!L && !UL) return '';
    var body = L ? L.map(function (x, i) { return '<div class="alt-one"><p class="alt-n">別解' + (L.length > 1 ? (i + 1) : '') + ':' + h(x.n) + '</p><ol class="lz-steps">' + (x.steps || []).map(function (st) { return '<li>' + rt2(st) + '</li>'; }).join('') + '</ol>' + (x.a ? '<p class="bk-ans">答え:<b>' + rt2(x.a) + '</b></p>' : '') + '</div>'; }).join('')
      : UL.map(function (x) { return '<div class="alt-one"><p class="alt-n">' + h(x.n) + '</p>' + (x.d ? '<p>' + rt2(x.d) + '</p>' : '') + (x.ex ? '<p class="alt-ex">' + rt2(x.ex) + '</p>' : '') + '</div>'; }).join('');
    return '<details class="alt-sol"><summary>💡 ' + (L ? '別の解き方' + (L.length > 1 ? '(' + L.length + 'つ)' : '') : 'この型の問題の、別の考え方') + '</summary>' + body + '</details>';
  };
  // ---- 単語帳:むずかしい日本語訳の国語辞典ふう説明(js/data/jgloss.js) ----
  WPS.JGLOSS = WPS.JGLOSS || null;
  var jgCbs = null;
  WPS.loadGloss = function (cb) {
    if (WPS.JGLOSS) return cb && cb();
    if (jgCbs) { if (cb) jgCbs.push(cb); return; }
    jgCbs = cb ? [cb] : [];
    var s = document.createElement('script'); s.src = 'js/data/jgloss.js?v=' + VER;
    s.onload = s.onerror = function () { var q = jgCbs; jgCbs = null; WPS.JGLOSS = WPS.JGLOSS || {}; q.forEach(function (f) { f(); }); };
    document.head.appendChild(s);
  };
  // 訳語を1つずつに分け、辞典にある語を探す(「促進する」→「促進」のように語尾を落としても探す)
  WPS.glossTerms = function (m) {
    var G = WPS.JGLOSS || {}, out = [], seen = {};
    String(m || '').split(/[、,;；／/]/).forEach(function (t) {
      t = t.replace(/[(（][^)）]*[)）]/g, '').replace(/[〜~…]/g, '').trim(); if (!t) return;
      var b = t.replace(/(する|させる|される|な|の|に|と|だ|である)$/, '');
      var k = G[b] ? b : G[t] ? t : null;
      if (k && !seen[k]) { seen[k] = 1; out.push(k); }
    });
    return out;
  };
  WPS.glossHTML = function (m) {
    var ks = WPS.glossTerms(m); if (!ks.length) return '';
    var G = WPS.JGLOSS;
    return '<details class="jg-box"><summary>📖 ことばの意味:' + ks.map(h).join('・') + '</summary><dl>' + ks.map(function (k) { var g = G[k]; return '<div><dt>' + h(k) + (g.r ? '<small>' + h(g.r) + '</small>' : '') + '</dt><dd>' + h(g.d) + (g.e ? '<span class="jg-e">例:' + h(g.e) + '</span>' : '') + '</dd></div>'; }).join('') + '</dl></details>';
  };


  // 画面に置いた「あとで埋める場所」を埋める
  WPS.fillLazy = function () {
    if (WPS.QALT) document.querySelectorAll('[data-altq],[data-altk]').forEach(function (el) {
      var A = WPS.QALT, k = el.getAttribute('data-altk'), q = el.getAttribute('data-altq'), u = el.getAttribute('data-altu');
      el.outerHTML = k ? WPS.altHTML(A[k]) : WPS.altHTML(A[q], A['unit:' + u]);
    });
    if (WPS.JGLOSS) document.querySelectorAll('[data-jgm]').forEach(function (el) { el.outerHTML = WPS.glossHTML(el.getAttribute('data-jgm')); });
  };
  WPS.altSlot = function (attrs) { if (WPS.QALT) return null; setTimeout(function () { WPS.loadAlt(WPS.fillLazy); }, 0); return '<span class="lazy-slot" ' + attrs + '></span>'; };
  WPS.glossSlot = function (m) { if (WPS.JGLOSS) return WPS.glossHTML(m); setTimeout(function () { WPS.loadGloss(WPS.fillLazy); }, 0); return '<span class="lazy-slot" data-jgm="' + h(m) + '"></span>'; };
  // 量の多いノートは、起動のあとで読み込む
  WPS.NOTE_FILES = ['qdeep_ejm', 'qdeep_sci', 'qdeep_soc', 'wordnote_jp2', 'wordnote_en_jh', 'wordnote_en_h1', 'wordnote_en_h2', 'wordnote_scisoc'];
  var state = 0, VER = '20261110b';
  WPS.loadNotes = function () {
    if (state) return; state = 1;
    var files = WPS.NOTE_FILES.slice();
    (function next() {
      var f = files.shift();
      if (!f) { state = 2; return; }
      var s = document.createElement('script');
      s.src = 'js/data/' + f + '.js?v=' + VER; s.onload = s.onerror = next;
      document.head.appendChild(s);
    })();
  };
})();
