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

  // 量の多いノートは、起動のあとで読み込む
  WPS.NOTE_FILES = ['qdeep_ejm', 'qdeep_sci', 'wordnote_jp2', 'wordnote_en_jh', 'wordnote_en_h1', 'wordnote_en_h2', 'wordnote_scisoc'];
  var state = 0, VER = '20261106c';
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
