/*
 * テキスト(#books):科目ごとの「教科書・参考書」。
 *   本棚(表紙の一覧) → 本(表紙・目次) → 単元のページ(要点・学ぶこと・板書の例題・説明チェック・練習)
 * 中身は各単元のデータ(要点・学ぶ項目・問題と解説・口頭試問)から組み立てる。
 * 読んだページ・しおりは state.books に保存。
 */
window.WPS = window.WPS || {};
WPS.makeBooks = function (ctx) {
  var h = ctx.h, S = WPS.Store;
  var st = { lv: null, q: '', sort: 'order', grid: false, subj: '' };
  var SUBJ_ORDER = ['jpn', 'math', 'eng', 'sci', 'soc', 'info', 'exam'];
  // 教科ではない本(入試対策)の段
  var EXTRA_SUBJ = { exam: { name: '入試対策', color: '#7c3aed' } };
  function subjInfo(k) { return WPS.SUBJECTS[k] || EXTRA_SUBJ[k] || {}; }
  // 面接対策の本:入試情報の面接データ(exam_info.js)から、章とページを組み立てる
  function li(x) { return '<li>' + h(x) + '</li>'; }
  function keyBox(title, rows) { return '<div class="guide-key"><b>' + h(title) + '</b><ol class="steps">' + rows.map(function (k) { return '<li><b>' + h(k[0]) + '</b>:' + h(k[1]) + '</li>'; }).join('') + '</ol></div>'; }
  function secs(list) { return list.map(function (f) { return { t: f.name, body: '<ul class="bullets">' + f.steps.map(li).join('') + '</ul>' }; }); }
  function extraBooks() {
    var M = WPS.INTERVIEW_MANNER, I = WPS.EXAM_INFO && WPS.EXAM_INFO.interview;
    if (!M || !I) return [];
    var R = M.suisen || null, pages = {}, chapters = [];
    function add(ch, id, name, lead, sections) {
      pages[id] = { name: name, lead: lead, secs: sections };
      var c = chapters.filter(function (x) { return x.name === ch; })[0]; if (!c) chapters.push(c = { name: ch, units: [] }); c.units.push(id);
    }
    add('面接の基本', 'iv_basic', '面接はどんな入試で課されるか・準備の進め方', '', [{ t: 'どんな入試で課されるか', body: '<ul class="bullets">' + I.when.map(li).join('') + '</ul>' }, { t: '面接の準備', body: '<ol class="steps">' + I.mensetsu.map(li).join('') + '</ol>' }]);
    if (M.truth) add('面接の基本', 'iv_truth', '面接官の本音とよくある誤解', keyBox('好印象を与える4つのポイント', M.truthKey), secs(M.truth));
    if (R) {
      add('推薦入試(総合型選抜など)の面接', 'iv_brand', '本質的な勝ち方と「大学のブランドを上げる人」', '<p>' + h(R.lead) + '</p>' + keyBox('合格のための3つの要素', R.keys),
        (R.brand ? [{ t: '大学のブランドを上げる人とは', body: '<p>' + h(R.brand.def) + '</p><p>具体的には、次の2つを兼ね備えた人が高く評価されます。</p><ul class="bullets">' + R.brand.elems.map(function (k) { return '<li><b>' + h(k[0]) + '</b>:' + h(k[1]) + '</li>'; }).join('') + '</ul><p>' + h(R.brand.investor) + '</p>' }] : [])
          .concat([{ t: '結論', body: '<div class="guide-key"><p>' + h(R.conclusion) + '</p></div>' }]));
      add('推薦入試(総合型選抜など)の面接', 'iv_suisen', '控え室・「良い子」・オタク戦略・意地悪な質問', '', secs(R.tips));
    }
    if (WPS.INTERVIEW_WEB && WPS.ivWebHTML) {
      var W = WPS.INTERVIEW_WEB, wsec = function (ids) { return ids.filter(function (i) { return W.sections[i]; }).map(function (i) { return { t: W.sections[i].name, body: WPS.ivWebHTML('sec', [i]).replace(/^<details class="guide-mini"><summary>[^<]*<\/summary>/, '').replace(/<\/details>$/, '') }; }); };
      add('形式・評価・練習(公開情報より)', 'iv_types', '面接の形式と対策', WPS.ivWebHTML('note'), wsec([0, 1, 2]));
      add('形式・評価・練習(公開情報より)', 'iv_eval', '面接の評価と志望理由・自己PR', '', wsec([3, 4, 5]));
      add('形式・評価・練習(公開情報より)', 'iv_qa', 'よく聞かれる質問と答え方', '<p>タップすると、答え方のコツとNG例が開きます。</p>', [{ t: '質問と答え方', body: WPS.ivWebHTML('qa') }]);
      add('形式・評価・練習(公開情報より)', 'iv_practice', '練習のやり方・オンライン面接・動画', '', wsec([6, 7, 8]).concat([{ t: '出典', body: WPS.ivWebHTML('sources') }]));
    }
    add('マナーと身だしなみ', 'iv_flow', '入室から退室までのマナー', '', secs(M.flow));
    add('マナーと身だしなみ', 'iv_talk', '話し方・ふるまい', '', secs(M.tips));
    add('マナーと身だしなみ', 'iv_dress', '服装・おじぎ・言葉づかい', '', M.dress.map(function (g) { return { t: g.name, body: '<ul class="bullets">' + g.items.map(li).join('') + '</ul>' }; }).concat([
      { t: 'おじぎの使い分け', body: '<div class="table-scroll"><table class="grid cmp"><thead><tr><th>おじぎ</th><th>使う場面</th></tr></thead><tbody>' + M.bow.map(function (b) { return '<tr><th>' + h(b[0]) + '</th><td>' + h(b[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' },
      { t: '避けたい言い方と言いかえ', body: '<div class="table-scroll"><table class="grid cmp"><thead><tr><th>避けたい言い方</th><th>言いかえ</th></tr></thead><tbody>' + M.words.map(function (b) { return '<tr><td>' + h(b[0]) + '</td><td>' + h(b[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' }]));
    var units = []; chapters.forEach(function (c) { units = units.concat(c.units); });
    return tbBooks().concat([{ id: 'mensetsu', name: '面接対策', short: '面接対策', subj: 'exam', stage: 'hs', chapters: chapters, units: units, extra: true, pages: pages }]);
  }
  // 歴史の教科書(世界史 世紀別・国別、日本史 通史)。目次は tb_meta.js、本文は開いたときに js/books/<本ID>.js を読み込む
  function tbBooks() {
    return (WPS.TB_META || []).map(function (m) {
      var pages = {}, units = [];
      m.chapters.forEach(function (c) { c.units.forEach(function (id) { pages[id] = { name: m.titles[id] }; units.push(id); }); });
      return { id: m.id, name: m.name, short: m.short, subj: m.subj, stage: 'hs', chapters: m.chapters, units: units, extra: true, tb: true, pages: pages };
    });
  }
  var TBV = '20261110a', tbLoading = {}, tbFail = {};
  function loadTb(bid, pid) {
    if (tbLoading[bid]) return; tbLoading[bid] = 1;
    var sc = document.createElement('script'); sc.src = 'js/books/' + bid + '.js?v=' + TBV;
    function done() { if (location.hash.indexOf('/' + pid) >= 0) ctx.render(); }
    sc.onload = done; sc.onerror = function () { tbFail[bid] = 1; tbLoading[bid] = 0; done(); };
    document.head.appendChild(sc);
  }
  function tbLink(id) {
    var bk = tbBooks().filter(function (x) { return x.pages[id]; })[0];
    return bk ? '<a class="tb-rel" href="#books/' + bk.id + '/' + id + '"><small>' + h(bk.short) + '</small>' + h(bk.pages[id].name) + '</a>' : '';
  }
  function tbPage(b, id) {
    var pg = WPS.TB_PAGES[id], i = b.units.indexOf(id), prev = b.units[i - 1], next = b.units[i + 1];
    var ch = b.chapters.filter(function (c) { return c.units.indexOf(id) >= 0; })[0], n = 0;
    function sec(t, cls) { n++; return '<section class="bk-sec' + (cls ? ' ' + cls : '') + '" id="bks-' + n + '"><h2><span>' + n + '</span>' + h(t) + '</h2>'; }
    var where = b.id === 'jh_flow' ? 'j' : 'w';
    var html = '<div class="bk-reader bk-fs-' + fontSize() + '"><div class="bk-tb"><a href="#books/' + b.id + '" aria-label="目次へ">‹ 目次</a><b>' + h(b.short) + '</b><span></span></div>' +
      '<article class="bk-page tb-page"><p class="bk-crumb">' + h(ch ? ch.name : '') + '</p><h1>' + h(pg.title) + '</h1><p class="bk-sub">' + h(pg.span || '') + '</p>' +
      (typeof pg.year === 'number' && WPS.Tools && WPS.Tools.mapLinks ? '<p class="tb-map">' + WPS.Tools.mapLinks(pg.year, where) + '</p>' : '') +
      (pg.lead ? '<div class="guide-key"><b>このページのまとめ</b><p>' + rt(pg.lead) + '</p></div>' : '');
    if (pg.flow && pg.flow.length) html += sec('流れの図') + '<ol class="tb-flow">' + pg.flow.map(function (x) { return '<li>' + rt(x) + '</li>'; }).join('') + '</ol></section>';
    if (pg.sync && pg.sync.length) html += sec('同じころの世界') + '<div class="table-scroll"><table class="grid cmp tb-sync"><thead><tr><th>地域</th><th>おもなできごと</th></tr></thead><tbody>' + pg.sync.map(function (r) { return '<tr><th>' + h(r[0]) + '</th><td>' + rt(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div></section>';
    pg.secs.forEach(function (x) { html += sec(x.t) + x.p.map(function (t) { return '<p>' + rt(t) + '</p>'; }).join('') + '</section>'; });
    if (pg.points && pg.points.length) html += sec('入試で問われるポイント', 'tb-pts') + '<ul class="bullets">' + pg.points.map(function (x) { return '<li>' + rt(x) + '</li>'; }).join('') + '</ul></section>';
    if (pg.check && pg.check.length) html += sec('確認テスト') + '<p class="muted small">問いを読んで答えを考えてから、タップして確かめましょう。</p><ol class="tb-check">' + pg.check.map(function (q) { return '<li><details><summary>' + rt(q[0]) + '</summary><p>答え:<b>' + h(q[1]) + '</b></p></details></li>'; }).join('') + '</ol></section>';
    var rel = (pg.related || []).map(tbLink).filter(Boolean);
    if (rel.length) html += sec('あわせて読む') + '<div class="tb-rels">' + rel.join('') + '</div></section>';
    html += '</article><nav class="bk-pn"><a ' + (prev ? 'href="#books/' + b.id + '/' + prev + '"' : 'aria-disabled="true" class="off"') + '>‹ 前のページ</a><a href="#books/' + b.id + '">目次</a><a ' + (next ? 'href="#books/' + b.id + '/' + next + '"' : 'aria-disabled="true" class="off"') + '>次のページ ›</a></nav></div>';
    return html;
  }
  function extraPage(b, id) {
    var pg = b.pages[id], i = b.units.indexOf(id), prev = b.units[i - 1], next = b.units[i + 1];
    var ch = b.chapters.filter(function (c) { return c.units.indexOf(id) >= 0; })[0];
    var html = '<div class="bk-reader bk-fs-' + fontSize() + '"><div class="bk-tb"><a href="#books/' + b.id + '" aria-label="目次へ">‹ 目次</a><b>' + h(b.short) + '</b><span></span></div>' +
      '<article class="bk-page"><p class="bk-crumb">' + h(ch ? ch.name : '') + '</p><h1>' + h(pg.name) + '</h1><p class="bk-sub">入試対策・面接</p>' + (pg.lead || '');
    pg.secs.forEach(function (x, k) { html += '<section class="bk-sec" id="bks-' + (k + 1) + '"><h2><span>' + (k + 1) + '</span>' + h(x.t) + '</h2>' + x.body + '</section>'; });
    html += '<div class="bk-act"><a class="btn" href="#exam/interview">入試情報の面接・小論文ページ</a></div>';
    html += '</article><nav class="bk-pn"><a ' + (prev ? 'href="#books/' + b.id + '/' + prev + '"' : 'aria-disabled="true" class="off"') + '>‹ 前のページ</a><a href="#books/' + b.id + '">目次</a><a ' + (next ? 'href="#books/' + b.id + '/' + next + '"' : 'aria-disabled="true" class="off"') + '>次のページ ›</a></nav></div>';
    return html;
  }
  function B() { var s = S.get(); if (!s.books) s.books = { read: {}, bm: {}, last: null }; return s.books; }
  function allowed(u) { var p = S.get().profile; return WPS.unitVisible(u, p.grade); }

  // 本 = 科目(コース)。目次 = 分野 → 単元
  function books() {
    var out = [];
    (WPS.CURRICULUM || []).forEach(function (g) {
      if (g.guideOnly) return;
      (g.courses || []).forEach(function (c) {
        if (c.guide) return;
        var chapters = c.areas && c.areas.length ? c.areas.map(function (a) { return { name: a.name, topics: a.topics || [], units: (a.units || []).filter(function (id) { return WPS.UNIT_MAP[id]; }) }; })
          : [{ name: c.name, topics: [], units: (c.units || []).filter(function (id) { return WPS.UNIT_MAP[id]; }) }];
        chapters = chapters.filter(function (ch) { return ch.units.length; });
        var units = []; chapters.forEach(function (ch) { ch.units.forEach(function (id) { if (units.indexOf(id) < 0) units.push(id); }); });
        if (!units.length) return; // 学年に関係なく、すべての本を本棚に出す(中学・高校は上の列で切りかえ)
        out.push({ id: c.id, name: c.name, short: c.short, subj: g.subj, stage: c.stage, chapters: chapters, units: units });
      });
    });
    return out.concat(extraBooks());
  }
  function bookOf(id) { return books().filter(function (b) { return b.id === id; })[0]; }
  function readCount(b) { var r = B().read; return b.units.filter(function (id) { return r[id]; }).length; }

  // 表紙(科目の色と、図形の模様)
  function cover(b, big) {
    var col = subjInfo(b.subj).color || '#1146d6';
    var seed = 0; for (var i = 0; i < b.id.length; i++) seed = (seed * 31 + b.id.charCodeAt(i)) % 997;
    var rot = seed % 4 * 90, shapes = '';
    for (var k = 0; k < 6; k++) { var x = 20 + (k % 3) * 22, y = 18 + Math.floor(k / 3) * 22 + (k % 2) * 8; shapes += '<rect x="' + x + '" y="' + y + '" width="20" height="20" rx="2" fill="' + (k % 2 ? col : '#e8a7a0') + '" opacity="' + (k % 2 ? .9 : .75) + '" transform="rotate(' + (25 + rot) + ' ' + (x + 10) + ' ' + (y + 10) + ')"/>'; }
    return '<div class="bk-cover' + (big ? ' big' : '') + '" style="--c:' + col + '"><p class="bk-top">Aqualium テキスト</p><svg viewBox="0 0 110 80" aria-hidden="true">' + shapes + '</svg><b>' + h(b.name) + '</b><small>' + h((subjInfo(b.subj).name || '')) + '</small></div>';
  }

  /* ---------- 本棚 ---------- */
  function shelf() {
    var bs = books();
    // 上の列で「中学」「高校」を切りかえる(はじめは学年に合わせる)
    var jhGrade = WPS.isJHStudent && WPS.isJHStudent(S.get().profile.grade);
    if (!st.lv) st.lv = jhGrade ? 'jh' : 'hs';
    var isJH = function (b) { return b.stage === 'jh'; };
    var q = st.q.trim();
    var inLv = bs.filter(function (b) { return st.lv === 'jh' ? isJH(b) : !isJH(b); });
    var subjs = SUBJ_ORDER.filter(function (k) { return inLv.some(function (b) { return b.subj === k; }); });
    if (st.subj && subjs.indexOf(st.subj) < 0) st.subj = '';
    var list = bs.filter(function (b) { return (st.lv === 'jh' ? isJH(b) : !isJH(b)) && (!st.subj || b.subj === st.subj) && (!q || (b.name + b.short).indexOf(q) >= 0 || b.units.some(function (id) { var u = b.extra ? b.pages[id] : WPS.UNIT_MAP[id]; return u && u.name.indexOf(q) >= 0; })); });
    if (st.sort === 'recent') { var t = B().t || {}; list.sort(function (a, c) { return (t[c.id] || 0) - (t[a.id] || 0); }); }
    var last = B().last && WPS.UNIT_MAP[B().last.u] ? B().last : null;
    var html = '';
    if (last) { var lb = bookOf(last.b); if (lb) html += '<section class="card bk-resume"><a href="#books/' + lb.id + '/' + last.u + '"><span>続きから読む</span><b>' + h(lb.name) + '・' + h(WPS.UNIT_MAP[last.u].name) + '</b></a></section>'; }
    html += '<div class="bk-bar"><div class="bk-lv" role="tablist" aria-label="中学・高校">' + [['jh', '中学'], ['hs', '高校']].map(function (o) { return '<button type="button" role="tab" class="bk-lv-btn' + (st.lv === o[0] ? ' on' : '') + '" aria-selected="' + (st.lv === o[0]) + '" data-bklv="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<div class="bk-subj" role="group" aria-label="教科でしぼりこむ">' + [''].concat(subjs).map(function (k) { var c = k ? inLv.filter(function (b) { return b.subj === k; }).length : inLv.length; return '<button type="button" class="bk-subj-btn' + (st.subj === k ? ' on' : '') + '" aria-pressed="' + (st.subj === k) + '" data-bksubj="' + k + '"' + (k ? ' style="--c:' + (subjInfo(k).color || '#1146d6') + '"' : '') + '>' + (k ? h(subjInfo(k).name) : 'すべて') + '<small>' + c + '</small></button>'; }).join('') + '</div>' +
      '<div class="bk-tools"><input id="bkq" type="search" value="' + h(st.q) + '" placeholder="本・単元を検索" aria-label="本・単元を検索"></div></div>';
    // 木の本棚:教科ごとに1段。段の上に教科名の帯、本は表紙を立てて並べる
    var rowsB = SUBJ_ORDER.map(function (k) { return [k, list.filter(function (b) { return b.subj === k; })]; }).filter(function (r) { return r[1].length; });
    html += '<section class="card ws-card bk-shelf">' + (list.length ? '<div class="wshelf">' + rowsB.map(function (r) {
      return '<div class="ws-row"><h3 class="ws-h">' + h(subjInfo(r[0]).name || r[0]) + '<small>' + r[1].length + '冊</small></h3><div class="ws-board">' + r[1].map(function (b) {
        var n = readCount(b), pc = Math.round(n / b.units.length * 100);
        return '<a class="bk-item ws-book" href="#books/' + b.id + '" aria-label="' + h(b.name) + '(' + b.units.length + '単元・読んだ ' + n + ')"><p class="ws-t">' + h(b.short || b.name) + '</p>' + cover(b) +
          '<span class="ws-prog" title="読んだ ' + n + ' / ' + b.units.length + '"><i style="width:' + pc + '%"></i></span><small class="ws-n">' + b.units.length + (b.extra ? 'ページ' : '単元') + (n ? '・' + pc + '%' : '') + '</small></a>';
      }).join('') + '</div></div>';
    }).join('') + '</div>' : '<p class="muted">見つかりませんでした。</p>') + '</section>';
    return html;
  }

  /* ---------- 本(表紙と目次) ---------- */
  function toc(b) {
    var r = B().read, bm = B().bm, stats = ctx.stats(), n = 1;
    var html = '<div class="bk-reader"><div class="bk-tb"><a href="#books" aria-label="本棚へ戻る">‹ 本棚</a><b>' + h(b.short) + '</b><span></span></div>' +
      '<div class="bk-page bk-front">' + cover(b, true) + '<p class="muted small">' + b.chapters.length + '章・' + b.units.length + (b.extra ? 'ページ' : '単元') + '。最後の方まで読んだページには✓がつきます。</p></div>' +
      '<section class="card bk-toc"><h2>目次</h2>' + b.chapters.map(function (ch, ci) {
        return '<div class="bk-ch"><h3>第' + (ci + 1) + '章 ' + h(ch.name) + '</h3><ol start="' + n + '" style="--start:' + (n - 1) + '">' + ch.units.map(function (id) {
          n++; var u = b.extra ? b.pages[id] : WPS.UNIT_MAP[id], ok = b.extra || allowed(u), s = stats[id] ? stats[id].status : 'untested';
          return '<li class="' + (ok ? '' : 'off') + '"><a href="#books/' + b.id + '/' + id + '"><span>' + h(u.name) + '</span>' + (bm[id] ? '<em class="bk-bm">しおり</em>' : '') + (r[id] ? '<em class="bk-ok">✓</em>' : '') + (s === 'weak' ? '<em class="bk-weak">苦手</em>' : '') + '</a></li>';
        }).join('') + '</ol></div>';
      }).join('') + '</section></div>';
    return html;
  }

  // 文字の大きさ(この端末に保存)と、どこまで読んだか
  function fontSize() { try { return localStorage.getItem('wpsBkFs') || 'm'; } catch (e) { return 'm'; } }
  function resumePos(id) { var p = (B().pos || {})[id]; return p && p.pct >= 8 && p.pct <= 92 ? p.pct : 0; }

  /* ---------- 単元のページ ---------- */
  function examples(u) {
    var qs = (u.questions || []).slice(), out = [];
    [1, 2, 3].forEach(function (lv) { var q = qs.filter(function (x) { return x.level === lv; })[0]; if (q) out.push(q); });
    if (out.length < 2 && u.hasGen) for (var sd = 1; out.length < 3 && sd < 40; sd += 7) { var q = WPS.Q(WPS.genId(u.id, sd)); if (q && !out.some(function (x) { return x.text === q.text; })) out.push(q); }
    if (out.length < 2) qs.forEach(function (x) { if (out.length < 3 && out.indexOf(x) < 0) out.push(x); });
    return out.slice(0, 3).sort(function (a, c) { return (a.level || 1) - (c.level || 1); });
  }
  function mistakes(u) {
    var s = S.get(), last = {};
    s.attempts.forEach(function (a) { if (a.u === u.id && a.q) last[a.q] = a; });
    return Object.keys(last).filter(function (id) { return !last[id].ok; }).slice(-3).map(function (id) { return { q: WPS.Q(id), a: last[id] }; }).filter(function (x) { return x.q; });
  }
  // 【 】を太字にして表示(先にエスケープする)
  // 数学の例題の「別の解き方」
  function altEx(key) { var slot = WPS.altSlot('data-altk="' + key + '"'); return slot !== null ? slot : WPS.altHTML(WPS.QALT[key]); }
  function rt(t) { return h(t || '').replace(/【([^】]*)】/g, '<b>$1</b>'); }
  function paras(t) { return (t || '').split('\n').map(function (x) { return '<p>' + rt(x) + '</p>'; }).join(''); }
  function preLinks(u) {
    return '<p class="bk-pre">わからないときは、先にこの単元へ:' + u.prereq.map(function (pid) { var pb = books().filter(function (x) { return x.units.indexOf(pid) >= 0; })[0]; return pb ? '<a href="#books/' + pb.id + '/' + pid + '">' + h(WPS.UNIT_MAP[pid].name) + '</a>' : '<a href="#study/' + pid + '">' + h(WPS.UNIT_MAP[pid].name) + '</a>'; }).join('、') + '</p>';
  }
  // 図解(色ブロックの流れ図・模式地図・因果の鎖)。ラベルはすべてエスケープする
  function legend(lg) { return lg && lg.length ? '<p class="zk-lg">' + lg.map(function (x) { return '<span><i class="z-' + x[0] + '"></i>' + h(x[1]) + '</span>'; }).join('') + '</p>' : ''; }
  function cellIn(c) { return '<b>' + h(c[0]) + '</b>' + (c[3] ? '<small>' + h(c[3]) + '</small>' : ''); }
  function zukai(x) {
    var out = '';
    if (x.flow) {
      var f = x.flow, cols = f.cols || 4;
      out += '<figure class="zk"><figcaption>' + h(f.title || '') + '</figcaption><div class="zk-flow' + (cols >= 5 ? ' sm' : '') + '" style="grid-template-columns:repeat(' + cols + ',minmax(0,1fr))">' +
        (f.head ? f.head.map(function (t) { return '<span class="zk-hd">' + h(t) + '</span>'; }).join('') : '') +
        f.rows.map(function (r) { return r.map(function (c) { return '<div class="zk-c z-' + c[1] + '" style="grid-column:span ' + (c[2] || 1) + '">' + cellIn(c) + '</div>'; }).join(''); }).join('') +
        '</div>' + legend(f.legend) + '</figure>';
    }
    if (x.tmap) {
      var m = x.tmap;
      out += '<figure class="zk"><figcaption>' + h(m.title || '') + '</figcaption><div class="zk-map" style="grid-template-columns:repeat(' + m.cols + ',minmax(0,1fr));grid-template-rows:repeat(' + m.rows + ',minmax(52px,auto))">' +
        m.cells.map(function (c) { return '<div class="zk-c z-' + c[1] + '" style="grid-column:' + c[2] + ' / span ' + (c[4] || 1) + ';grid-row:' + c[3] + ' / span ' + (c[5] || 1) + '"><b>' + h(c[0]) + '</b>' + (c[6] ? '<small>' + h(c[6]) + '</small>' : '') + '</div>'; }).join('') +
        '</div>' + legend(m.legend) + (m.note ? '<p class="zk-note">' + h(m.note) + '</p>' : '') + '</figure>';
    }
    if (x.chain) {
      var c = x.chain;
      out += '<figure class="zk"><figcaption>' + h(c.title || '') + '</figcaption><ol class="zk-chain">' + c.items.map(function (it) {
        return '<li class="k-' + h(it[0]) + '"><em>' + h(it[0]) + '</em><b>' + h(it[1]) + '</b>' + (it[2] ? '<small>' + h(it[2]) + '</small>' : '') + '</li>';
      }).join('') + '</ol></figure>';
    }
    return out;
  }
  function page(b, id) {
    var u = WPS.UNIT_MAP[id], i = b.units.indexOf(id), prev = b.units[i - 1], next = b.units[i + 1];
    var ch = b.chapters.filter(function (c) { return c.units.indexOf(id) >= 0; })[0], bm = !!B().bm[id];
    var stt = ctx.stats()[id], ex = examples(u), ms = mistakes(u);
    var html = '<div class="bk-reader bk-fs-' + fontSize() + '"><div class="bk-tb"><a href="#books/' + b.id + '" aria-label="目次へ">‹ 目次</a><b>' + h(b.short) + '</b><span class="bk-tb-r"><button type="button" class="bk-jumpb" id="bkJumpBtn" aria-expanded="false" aria-controls="bkJump" aria-label="この単元の見出し・文字の大きさ"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg></button><button type="button" class="bk-bmb' + (bm ? ' on' : '') + '" id="bkBm" aria-pressed="' + bm + '" aria-label="しおり"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 3h12v18l-6-4.5L6 21z" fill="currentColor"/></svg></button></span><span class="bk-prog-top" aria-hidden="true"><i id="bkProg"></i></span></div>' +
      '<div class="bk-jump" id="bkJump" hidden><div class="bk-jump-bg" data-jclose></div><div class="bk-jump-in" role="dialog" aria-modal="true" aria-label="この単元の見出し"><p class="bk-jump-h">この単元の見出し<button type="button" class="bk-jump-x" data-jclose aria-label="閉じる">×</button></p>' +
      '<div class="bk-fs" role="group" aria-label="文字の大きさ"><span>文字の大きさ</span>' + [['s', '小'], ['m', '中'], ['l', '大'], ['xl', '特大']].map(function (f) { return '<button type="button" data-bkfs="' + f[0] + '" aria-pressed="' + (fontSize() === f[0]) + '"' + (fontSize() === f[0] ? ' class="on"' : '') + '>' + f[1] + '</button>'; }).join('') + '</div>' +
      '<ol class="bk-jump-list" id="bkJumpList"></ol></div></div>' +
      (resumePos(id) ? '<p class="bk-resume-pos" id="bkResume">前回は <b>' + resumePos(id) + '%</b> まで読みました<button type="button" class="btn small" id="bkResumeGo">続きへ</button><button type="button" class="bk-resume-x" id="bkResumeX" aria-label="閉じる">×</button></p>' : '');
    html += '<article class="bk-page"><p class="bk-crumb">' + h(ch ? ch.name : '') + '</p><h1>' + h(u.name) + '</h1><p class="bk-sub">' + h(WPS.SUBJECTS[u.subj].name) + '・' + h(u.stage) + (stt && stt.n ? '・正答率 ' + Math.round(stt.acc * 100) + '%' : '') + '</p>';
    var L = (WPS.LESSONS || {})[id], n = 0;
    function sec(t, cls) { n++; return '<section class="bk-sec' + (cls ? ' ' + cls : '') + '" id="bks-' + n + '"><h2><span>' + n + '</span>' + h(t) + '</h2>'; }
    if (L) {
      html += '<div class="lz-goal"><b>この単元でできるようになること</b><p>' + rt(L.goal) + '</p></div>';
      if (u.prereq && u.prereq.length) html += preLinks(u);
      // この単元の地図(節の見出しの一覧)
      html += '<nav class="lz-map" aria-label="この単元の流れ"><b>この単元の流れ</b><ol>' + L.secs.map(function (x) { return '<li>' + h(x.h) + '</li>'; }).join('') + '</ol></nav>';
      html += sec('まずはイメージ', 'lz-intro') + paras(L.intro) + '</section>';
      if (L.pre) html += sec('まずは前提のおさらい', 'lz-pre') + paras(L.pre) + '</section>';
      L.secs.forEach(function (x, si) {
        var hk = WPS.Tools && WPS.Tools.histOf ? WPS.Tools.histOf(u.id) : null, my = hk ? WPS.Tools.findYear(x.h) : null; if (hk && my === null) my = WPS.Tools.findYear(x.t);
        html += sec(x.h) + paras(x.t) + (hk ? WPS.Tools.mapLinks(my, hk) : '') + (x.key ? '<p class="lz-key"><b>ここが大事</b>' + rt(x.key) + '</p>' : '') + (x.fig ? '<figure class="lz-figw">' + x.fig + '</figure>' : '') + zukai(x) + (x.ex || []).map(function (e, k) {
          return '<div class="bk-board lz-ex"><div class="bk-bh"><b>やってみよう' + (x.ex.length > 1 ? (k + 1) : '') + '</b><em>例題</em></div><div class="bk-bb"><p class="bk-q">' + rt(e.q) + '</p>' +
            (e.hint ? '<p class="lz-hint">ヒント:' + rt(e.hint) + '</p>' : '') + '<ol class="lz-steps">' + e.steps.map(function (st) { return '<li>' + rt(st) + '</li>'; }).join('') + '</ol><p class="bk-ans">答え:<b>' + rt(e.a) + '</b></p>' + (e.check ? '<p class="lz-check">確かめ:' + rt(e.check) + '</p>' : '') + (u.subj === 'math' ? altEx(u.id + ':' + si + ':' + k) : '') + '</div></div>';
        }).join('') + '</section>';
      });
      // つまずきの処方箋:よくあるまちがい → なぜ → 直し方 → 確認問題
      if (L.rx && L.rx.length) html += sec('つまずきの処方箋', 'lz-rx') + '<p class="muted small">よくあるまちがい方と、その直し方です。自分に当てはまるものがないか確かめましょう。</p>' + L.rx.map(function (r, k) {
        return '<div class="rx-card"><p class="rx-err"><b>つまずき ' + (k + 1) + '</b>' + rt(r.err) + '</p><p class="rx-why"><b>なぜ起きる?</b>' + rt(r.why) + '</p><p class="rx-fix"><b>処方箋(直し方)</b>' + rt(r.fix) + '</p>' +
          (r.q ? '<details class="rx-q"><summary><b>確認問題</b>' + rt(r.q) + '</summary><p class="lz-da">答え:<b>' + rt(r.a) + '</b></p>' + (r.exp ? paras(r.exp) : '') + '</details>' : '') + '</div>';
      }).join('') + '</section>';
      // 難関レベルの記述・論述:模範解答と採点基準
      if (L.essay && L.essay.length) html += sec(/^中/.test(u.stage) ? '難関高校レベルの記述問題' : '難関大レベルの記述・論述', 'lz-essay') + L.essay.map(function (e) {
        var tot = (e.points || []).reduce(function (a, p) { return a + (+p[1] || 0); }, 0);
        return '<div class="bk-board lz-ex"><div class="bk-bh"><b>記述問題</b><em>' + (e.limit ? h(e.limit) : '難関') + '</em></div><div class="bk-bb"><p class="bk-q">' + rt(e.q) + '</p>' + (e.hint ? '<p class="lz-hint">考え方:' + rt(e.hint) + '</p>' : '') +
          '<details><summary>模範解答と採点基準</summary><p class="bk-ans">模範解答</p>' + paras(e.model) + (e.points && e.points.length ? '<table class="es-pt"><thead><tr><th>採点の要素</th><th>点</th></tr></thead><tbody>' + e.points.map(function (p) { return '<tr><td>' + rt(p[0]) + '</td><td>' + h(p[1]) + '</td></tr>'; }).join('') + '</tbody><tfoot><tr><td>合計</td><td>' + tot + '</td></tr></tfoot></table>' : '') + (e.ng ? '<p class="lz-check">減点されやすい答え:' + rt(e.ng) + '</p>' : '') + '</details></div></div>';
      }).join('') + '</section>';
      if (L.drill && L.drill.length) html += sec('練習問題', 'lz-drill') + '<p class="muted small">まず自分で解いてから、「答えと解き方」を押して確かめましょう。</p><ol class="lz-dl">' + L.drill.map(function (d) {
        return '<li><p class="lz-dq"><em class="lv' + (d.lv || 1) + '">' + ['', '基本', '標準', '発展'][d.lv || 1] + '</em>' + rt(d.q) + '</p><details><summary>答えと解き方</summary><p class="lz-da">答え:<b>' + rt(d.a) + '</b></p>' + paras(d.exp) + (WPS.wordNoteHTML ? WPS.wordNoteHTML(WPS.noteTerm(d.q)) : '') + '</details></li>';
      }).join('') + '</ol></section>';
      // 単元まとめテスト(10問)
      if (L.test && L.test.length) html += sec('単元まとめテスト', 'lz-test') + '<p class="muted small">全' + L.test.length + '問。紙に答えを書いてから、1問ずつ「答え」を開いて丸つけしましょう。8問以上で合格です。</p><ol class="lz-dl lz-tl">' + L.test.map(function (t) {
        return '<li><p class="lz-dq">' + rt(t.q) + '</p>' + (t.choices && t.choices.length ? '<ol class="tl-ch" type="A">' + t.choices.map(function (c) { return '<li>' + rt(c) + '</li>'; }).join('') + '</ol>' : '') + '<details><summary>答え</summary><p class="lz-da">答え:<b>' + rt(t.a) + '</b></p>' + (t.exp ? paras(t.exp) : '') + '</details></li>';
      }).join('') + '</ol></section>';
      // 入試の頻出テーマと解法パターン
      if (L.pat && L.pat.length) html += sec('入試の頻出テーマと解法', 'lz-pat') + '<p class="muted small">この単元で入試によく出る問題の「型」と、型ごとの解き方です。問題を見たら、まずどの型かを見分けましょう。</p>' + L.pat.map(function (pt, k) {
        return '<div class="pat-card"><p class="pat-h"><span>型' + (k + 1) + '</span>' + rt(pt.name) + (pt.freq ? '<em>' + h(pt.freq) + '</em>' : '') + '</p>' + (pt.when ? '<p class="pat-w"><b>見分け方</b>' + rt(pt.when) + '</p>' : '') +
          (pt.how && pt.how.length ? '<ol class="pat-how">' + pt.how.map(function (x) { return '<li>' + rt(x) + '</li>'; }).join('') + '</ol>' : '') +
          (pt.ex ? '<details class="rx-q"><summary><b>例題</b>' + rt(pt.ex.q) + '</summary><p class="lz-da">答え:<b>' + rt(pt.ex.a) + '</b></p>' + paras(pt.ex.exp || '') + '</details>' : '') + '</div>';
      }).join('') + '</section>';
      // 演習問題集(レベル別)
      if (L.more && L.more.length) {
        var LVN = ['', '基礎', '標準', '難関'];
        html += sec('演習問題集(' + L.more.length + '問)', 'lz-more') + '<div class="mq-tabs" role="group" aria-label="レベル">' + [0, 1, 2, 3].map(function (v) { var n = v ? L.more.filter(function (m) { return (m.lv || 1) === v; }).length : L.more.length; return '<button type="button" data-mqlv="' + v + '"' + (v ? '' : ' class="on"') + '>' + (v ? LVN[v] : 'すべて') + '<small>' + n + '</small></button>'; }).join('') + '</div><ol class="lz-dl mq-list">' + L.more.map(function (m) {
          return '<li data-lv="' + (m.lv || 1) + '"><p class="lz-dq"><em class="lv' + (m.lv || 1) + '">' + LVN[m.lv || 1] + '</em>' + rt(m.q) + '</p>' + (m.choices && m.choices.length ? '<ol class="tl-ch" type="A">' + m.choices.map(function (c) { return '<li>' + rt(c) + '</li>'; }).join('') + '</ol>' : '') + '<details><summary>答えと解説</summary><p class="lz-da">答え:<b>' + rt(m.a) + '</b></p>' + paras(m.exp || '') + '</details></li>';
        }).join('') + '</ol></section>';
      }
      // 思考問題・探究(資料・会話・実験を読んで考える)
      if (L.think && L.think.length) html += sec('思考問題・探究', 'lz-think') + '<p class="muted small">資料や会話を読んで考える、共通テストの思考力問題に近い形式です。</p>' + L.think.map(function (t, k) {
        return '<div class="bk-board lz-ex"><div class="bk-bh"><b>思考問題' + (k + 1) + '</b><em>' + h(t.kind || '探究') + '</em></div><div class="bk-bb">' + (t.ctx ? '<div class="th-ctx">' + paras(t.ctx) + '</div>' : '') + '<p class="bk-q">' + rt(t.q) + '</p>' +
          (t.choices && t.choices.length ? '<ol class="tl-ch th-ch" type="1">' + t.choices.map(function (c) { return '<li>' + rt(String(c).replace(/^\s*[①-⑥]\s*/, '')) + '</li>'; }).join('') + '</ol>' : '') +
          '<details><summary>答えと考え方</summary><p class="bk-ans">答え:<b>' + rt(t.a) + '</b></p>' + paras(t.exp || '') + '</details></div></div>';
      }).join('') + '</section>';
      // 暗記カード(押すと裏返る。覚えたものは印をつけて、次から後ろへ)
      if (L.cards && L.cards.length) html += sec('暗記カード', 'lz-cards') + '<p class="muted small">カードを押すと答えが出ます。「覚えた」を押したカードは、次から後回しになります。</p><div class="ac" id="acBox" data-u="' + id + '"></div></section>';
      // 1ページまとめ
      if (L.sheet) {
        var sh = L.sheet;
        html += sec('1ページまとめ', 'lz-sheet') + '<div class="sheet"><p class="sheet-t">' + h(sh.title || u.name) + '</p><div class="sheet-g">' + (sh.blocks || []).map(function (b) {
          return '<div class="sheet-b"><b>' + rt(b.h) + '</b><ul>' + (b.items || []).map(function (x) { return '<li>' + rt(x) + '</li>'; }).join('') + '</ul></div>';
        }).join('') + '</div>' + (sh.key ? '<p class="sheet-k"><b>これだけは</b>' + rt(sh.key) + '</p>' : '') + '<button type="button" class="btn small sheet-p" onclick="document.body.classList.add(\'print-sheet\');window.print();document.body.classList.remove(\'print-sheet\')">印刷する</button></div></section>';
      }
      // つながる知識
      if (L.link) {
        var lk = L.link;
        html += sec('つながる知識', 'lz-link') + '<div class="lk-grid">' + (lk.prev ? '<div class="lk-c"><b>前に学んだこと</b>' + paras(lk.prev) + '</div>' : '') + (lk.next ? '<div class="lk-c"><b>この先で学ぶこと</b>' + paras(lk.next) + '</div>' : '') + '</div>' +
          (lk.cross && lk.cross.length ? '<p class="lk-h">ほかの教科とのつながり</p><ul class="lk-cross">' + lk.cross.map(function (c) { return '<li><em>' + h(c[0]) + '</em>' + rt(c[1]) + '</li>'; }).join('') + '</ul>' : '') +
          (lk.univ ? '<p class="lk-h">大学・社会では</p>' + paras(lk.univ) : '') +
          (lk.read ? '<details class="lk-read"><summary>発展の読み物' + (lk.readT ? ':' + h(lk.readT) : '') + '</summary>' + paras(lk.read) + '</details>' : '') + '</section>';
      }
      if (L.faq && L.faq.length) html += sec('よくある疑問', 'lz-faq') + L.faq.map(function (f) { return '<details><summary>' + rt(f[0]) + '</summary>' + paras(f[1]) + '</details>'; }).join('') + '</section>';
      if (L.terms && L.terms.length) html += sec('ことばの整理') + '<dl class="lz-terms">' + L.terms.map(function (t) { return '<div><dt>' + h(t[0]) + '</dt><dd>' + rt(t[1]) + '</dd></div>'; }).join('') + '</dl></section>';
      if (L.miss && L.miss.length) html += sec('よくあるまちがい', 'lz-miss') + '<ul>' + L.miss.map(function (t) { return '<li>' + rt(t) + '</li>'; }).join('') + '</ul></section>';
      if (L.sum && L.sum.length) html += sec('まとめ', 'lz-sum') + '<ul>' + L.sum.map(function (t) { return '<li>' + rt(t) + '</li>'; }).join('') + '</ul></section>';
      if (L.next) html += '<p class="lz-next"><b>次に学ぶこと</b>' + rt(L.next) + '</p>';
    } else {
      html += sec('この単元の要点') + '<p class="bk-point">' + h(u.point) + '</p>' + (u.tip ? '<p class="lz-tip">' + h(u.tip) + '</p>' : '') + '</section>';
      if (ch && ch.topics && ch.topics.length) html += sec('この章で学ぶこと') + '<ul class="bk-topics">' + ch.topics.map(function (t) { return '<li>' + h(t) + '</li>'; }).join('') + '</ul></section>';
      if (u.prereq && u.prereq.length) html += preLinks(u);
      html += '<p class="lz-wip">この単元の「ゼロから読める解説」は準備中です。</p>';
    }
    html += sec(L ? '確認問題' : '例題で確かめよう') + (L ? '<p class="muted small">本文を読んだら、解いて確かめましょう。</p>' : '') + ex.map(function (q, k) {
      return '<div class="bk-board"><div class="bk-bh"><b>' + (L ? '確認問題' : '例題') + (k + 1) + '</b><em>' + ['', '基本', '標準', '発展'][q.level || 1] + '</em></div>' +
        '<div class="bk-bb"><p class="bk-q">' + h(q.text) + '</p>' + (q.choices && q.choices.length > 2 ? '<ol class="bk-ch4" type="A">' + q.choices.slice().sort().map(function (c) { return '<li>' + h(c) + '</li>'; }).join('') + '</ol>' : '') +
        '<details><summary>答えと解説を見る</summary><p class="bk-ans">答え:<b>' + h(q.answer) + '</b></p><p class="bk-exp">' + h(q.exp || '') + '</p></details></div></div>';
    }).join('') + '</section>';
    if (u.oral && u.oral.length) html += '<section class="bk-sec"><h2><span>✓</span>説明できるかチェック</h2><p class="muted small">声に出して説明できたら、理解できています。</p><ul class="bk-oral">' + u.oral.map(function (o) { return '<li>' + h(o) + '</li>'; }).join('') + '</ul></section>';
    if (ms.length) html += '<section class="bk-sec bk-mine"><h2><span>!</span>あなたがまちがえた問題</h2>' + ms.map(function (x) { return '<div class="bk-mq"><p>' + h(x.q.text) + '</p><p class="small">正解:<b>' + h(x.q.answer) + '</b>' + (x.a.ch ? '　あなたの答え:' + h(x.a.ch) : '') + '</p></div>'; }).join('') + '</section>';
    html += '<div class="bk-act"><button type="button" class="btn primary big" id="bkPractice">この単元の問題を解く</button><a class="btn" href="#study/' + id + '">単元の学習ページ</a></div>';
    html += '</article><nav class="bk-pn"><a ' + (prev ? 'href="#books/' + b.id + '/' + prev + '"' : 'aria-disabled="true" class="off"') + '>‹ 前の単元</a><a href="#books/' + b.id + '">目次</a><a ' + (next ? 'href="#books/' + b.id + '/' + next + '"' : 'aria-disabled="true" class="off"') + '>次の単元 ›</a></nav></div>';
    return html;
  }

  // 本文データ(約2MB)は、テキストを開いたときに初めて読み込む(アプリの起動を軽くするため)
  var LV = '20261110a';
  // テキスト本文は、開いた単元のファイル(js/lessons/<単元ID>.js)だけを読み込む
  var lFail = {}, lLoading = {};
  function lessonReady(id) { return !!(WPS.LESSONS && WPS.LESSONS[id]) || lFail[id] === 1; }
  function loadLesson(id) {
    if (lLoading[id]) return; lLoading[id] = 1;
    var sc = document.createElement('script'); sc.src = 'js/lessons/' + id + '.js?v=' + LV;
    function done() { if (location.hash.indexOf('/' + id) >= 0) ctx.render(); }
    sc.onload = done;
    sc.onerror = function () { lFail[id] = 1; lLoading[id] = 0; done(); };
    document.head.appendChild(sc);
  }
  function render(arg) {
    var p = (arg || '').split('/'), b = p[0] ? bookOf(p[0]) : null;
    if (b && b.tb && p[1] && b.pages[p[1]]) {
      if ((WPS.TB_PAGES || {})[p[1]]) return tbPage(b, p[1]);
      if (tbFail[b.id]) { tbFail[b.id] = 0; return '<p class="card muted small">本文を読み込めませんでした。通信の状態を確かめて、ページを開き直してください。</p>'; }
      loadTb(b.id, p[1]); return '<section class="card bk-loading" aria-busy="true"><p>テキストを読み込んでいます…</p></section>';
    }
    if (b && b.extra && p[1] && b.pages[p[1]]) return extraPage(b, p[1]);
    if (b && p[1] && WPS.UNIT_MAP[p[1]]) {
      if (!lessonReady(p[1])) { loadLesson(p[1]); return '<section class="card bk-loading" aria-busy="true"><p>テキストを読み込んでいます…</p></section>'; }
      var out = page(b, p[1]);
      if (lFail[p[1]] === 1) { lFail[p[1]] = 2; out = '<p class="card muted small">解説の本文を読み込めませんでした。通信の状態を確かめて、ページを開き直してください。</p>' + out; }
      return out;
    }
    if (b) return toc(b);
    return shelf();
  }
  // 読む画面の道具:見出しへジャンプ・進み具合のバー・続きから・読み終わりの記録・文字の大きさ
  var scrollFn = null;
  function readerTools(view, id) {
    var article = view.querySelector('.bk-page'), bar = document.getElementById('bkProg'), list = document.getElementById('bkJumpList'), jump = document.getElementById('bkJump'), jb = document.getElementById('bkJumpBtn');
    if (!article) return;
    var secs = [].slice.call(article.querySelectorAll('.bk-sec')).filter(function (x) { return x.querySelector('h2'); });
    list.innerHTML = secs.map(function (x) { var t = x.querySelector('h2').textContent.replace(/^\d+/, '').trim(); return '<li><a href="#' + x.id + '" data-jump="' + x.id + '">' + h(t) + '</a></li>'; }).join('');
    // 「この単元の流れ」も、押すとその節へ移動できるようにする
    var map = article.querySelector('.lz-map ol');
    if (map) [].slice.call(map.children).forEach(function (li) { var t = li.textContent.trim(), hit = secs.filter(function (x) { return x.querySelector('h2').textContent.replace(/^\d+/, '').trim() === t; })[0]; if (hit) li.innerHTML = '<a href="#' + hit.id + '" data-jump="' + hit.id + '">' + h(t) + '</a>'; });
    function topOffset() { var tb = view.querySelector('.bk-tb'); return (tb ? tb.offsetHeight : 0) + 12; }
    // 遠いときは一瞬で、近いときはなめらかに移動する
    function scrollTop(y) { window.scrollTo({ top: y, behavior: Math.abs(y - window.scrollY) > window.innerHeight * 2.5 ? 'auto' : 'smooth' }); }
    function go(sid) { var el = document.getElementById(sid); if (el) scrollTop(el.getBoundingClientRect().top + window.scrollY - topOffset()); }
    function open(o) { jump.hidden = !o; jb.setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.classList.toggle('sheet-open', o); if (o) { var cur = list.querySelector('.cur a') || list.querySelector('a'); if (cur) { cur.focus(); cur.scrollIntoView({ block: 'center' }); } } }
    jb.addEventListener('click', function () { open(jump.hidden); });
    jump.addEventListener('click', function (e) { if (e.target.closest('[data-jclose]')) { open(false); jb.focus(); } });
    jump.addEventListener('keydown', function (e) { if (e.key === 'Escape') { open(false); jb.focus(); } });
    var onJump = function (e) { var a = e.target.closest('[data-jump]'); if (!a) return; e.preventDefault(); open(false); go(a.getAttribute('data-jump')); };
    article.addEventListener('click', onJump); list.addEventListener('click', onJump);
    view.querySelectorAll('[data-bkfs]').forEach(function (x) { x.addEventListener('click', function () {
      var f = x.getAttribute('data-bkfs'), rd = view.querySelector('.bk-reader'), mid = window.scrollY / Math.max(1, document.documentElement.scrollHeight);
      try { localStorage.setItem('wpsBkFs', f); } catch (e) { }
      rd.className = rd.className.replace(/bk-fs-\w+/, 'bk-fs-' + f);
      view.querySelectorAll('[data-bkfs]').forEach(function (y) { y.classList.toggle('on', y === x); y.setAttribute('aria-pressed', y === x); });
      window.scrollTo(0, mid * document.documentElement.scrollHeight);
    }); });
    // 前回の続きへ
    var rs = document.getElementById('bkResume'), saved = ((B().pos || {})[id] || {}).pct || 0;
    if (rs) {
      document.getElementById('bkResumeGo').addEventListener('click', function () { rs.remove(); scrollTop(saved / 100 * (document.documentElement.scrollHeight - window.innerHeight)); });
      document.getElementById('bkResumeX').addEventListener('click', function () { rs.remove(); });
    }
    // 進み具合・今いる節・読み終わり
    if (scrollFn) window.removeEventListener('scroll', scrollFn);
    var tm = null, marked = !!B().read[id], first = true;
    scrollFn = function () {
      if (!document.body.contains(article)) { window.removeEventListener('scroll', scrollFn); scrollFn = null; return; }
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight), pct = Math.min(100, Math.round(window.scrollY / max * 100));
      if (bar) bar.style.width = pct + '%';
      var cur = null, off = topOffset() + 20; secs.forEach(function (x) { if (x.getBoundingClientRect().top <= off) cur = x; });
      [].slice.call(list.children).forEach(function (li, i) { li.classList.toggle('cur', secs[i] === cur); });
      // 開いた直後(まだ動かしていないとき)は、前回の位置を上書きしない
      if (S.isView() || first) { first = false; return; }
      clearTimeout(tm); tm = setTimeout(function () {
        var bb = B(); bb.pos = bb.pos || {}; bb.pos[id] = { pct: pct, t: Date.now() };
        // 最後の方(85%)まで読んだら「読んだ」にする
        if (pct >= 85 && !marked) { marked = true; bb.read[id] = Date.now(); ctx.toast && ctx.toast('この単元を「読んだ」にしました'); }
        S.save();
      }, 400);
    };
    window.addEventListener('scroll', scrollFn, { passive: true }); scrollFn();
  }
  function after(arg) {
    var view = document.getElementById('view'), p = (arg || '').split('/'), b = p[0] ? bookOf(p[0]) : null;
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    if (b && b.extra && p[1] && b.pages[p[1]]) { if (b.tb && !(WPS.TB_PAGES || {})[p[1]]) return; if (!S.isView()) { var eb = B(); eb.read[p[1]] = 1; eb.t = eb.t || {}; eb.t[b.id] = Date.now(); S.save(); } return; }
    if (b && p[1] && WPS.UNIT_MAP[p[1]]) {
      var id = p[1];
      if (!view.querySelector('#bkBm')) return; // 読み込み中
      view.querySelectorAll('[data-mqlv]').forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-mqlv'); view.querySelectorAll('[data-mqlv]').forEach(function (x) { x.classList.toggle('on', x === b); }); view.querySelectorAll('.mq-list > li').forEach(function (li) { li.style.display = v === '0' || li.getAttribute('data-lv') === v ? '' : 'none'; }); }); });
      var ac = view.querySelector('#acBox'), LL = WPS.LESSONS[id];
      if (ac && LL && LL.cards) {
        var KEY = 'wpsCards', known = (function () { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } })(), kk = known[id] = known[id] || {};
        var order = LL.cards.map(function (_, i) { return i; }).sort(function (a, b) { return (kk[a] ? 1 : 0) - (kk[b] ? 1 : 0); }), pos = 0, flip = false;
        var drawCard = function () {
          var i = order[pos], c = LL.cards[i], n = Object.keys(kk).length;
          ac.innerHTML = '<div class="ac-top"><span>' + (pos + 1) + ' / ' + order.length + '</span><span>覚えた ' + n + '枚</span></div>' +
            '<button type="button" class="ac-card' + (flip ? ' flip' : '') + (kk[i] ? ' known' : '') + '" aria-label="カードを裏返す"><span class="ac-side">' + (flip ? '答え' : '問題') + '</span><span class="ac-txt">' + rt(flip ? c[1] : c[0]) + '</span>' + (flip ? '' : '<small>押すと答え</small>') + '</button>' +
            '<div class="ac-btns"><button type="button" class="btn" data-ac="prev">‹ 前へ</button><button type="button" class="btn' + (kk[i] ? '' : ' primary') + '" data-ac="ok">' + (kk[i] ? '覚えたを外す' : '覚えた ✓') + '</button><button type="button" class="btn" data-ac="next">次へ ›</button></div>' +
            '<div class="ac-btns2"><button type="button" class="btn ghost small" data-ac="shuf">シャッフル</button><button type="button" class="btn ghost small" data-ac="list">一覧で見る</button></div>';
        };
        var saveK = function () { try { localStorage.setItem(KEY, JSON.stringify(known)); } catch (e) { } };
        ac.addEventListener('click', function (ev) {
          if (ev.target.closest('.ac-card')) { flip = !flip; drawCard(); return; }
          var b = ev.target.closest('[data-ac]'); if (!b) return; var k = b.getAttribute('data-ac'), i = order[pos];
          if (k === 'prev') { pos = (pos + order.length - 1) % order.length; flip = false; }
          else if (k === 'next') { pos = (pos + 1) % order.length; flip = false; }
          else if (k === 'ok') { if (kk[i]) delete kk[i]; else { kk[i] = 1; pos = (pos + 1) % order.length; flip = false; } saveK(); }
          else if (k === 'shuf') { for (var j = order.length - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)), t = order[j]; order[j] = order[r]; order[r] = t; } pos = 0; flip = false; }
          else if (k === 'list') { ac.innerHTML = '<dl class="ac-list">' + LL.cards.map(function (c, j) { return '<dt>' + (kk[j] ? '✓ ' : '') + rt(c[0]) + '</dt><dd>' + rt(c[1]) + '</dd>'; }).join('') + '</dl><button type="button" class="btn small" data-ac="back">カードにもどる</button>'; return; }
          drawCard();
        });
        drawCard();
      }
      if (!S.isView()) { var bb = B(); bb.last = { b: b.id, u: id }; bb.t = bb.t || {}; bb.t[b.id] = Date.now(); S.save(); }
      readerTools(view, id);
      view.querySelector('#bkBm').addEventListener('click', function () { var m = B().bm; if (m[id]) delete m[id]; else m[id] = Date.now(); S.save(); this.classList.toggle('on', !!m[id]); this.setAttribute('aria-pressed', !!m[id]); });
      view.querySelector('#bkPractice').addEventListener('click', function () { ctx.practice(id); });
      return;
    }
    if (b) return;
    view.querySelectorAll('[data-bklv]').forEach(function (x) { x.addEventListener('click', function () { st.lv = x.getAttribute('data-bklv'); re(); }); });
    view.querySelectorAll('[data-bksubj]').forEach(function (x) { x.addEventListener('click', function () { st.subj = x.getAttribute('data-bksubj'); re(); }); });
    var q = view.querySelector('#bkq'), tm;
    q.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { st.q = q.value; re(); var el = document.getElementById('bkq'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 250); });
  }
  return { render: render, after: after };
};
