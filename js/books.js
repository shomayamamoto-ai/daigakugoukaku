/*
 * テキスト(#books):科目ごとの「教科書・参考書」。
 *   本棚(表紙の一覧) → 本(表紙・目次) → 単元のページ(要点・学ぶこと・板書の例題・説明チェック・練習)
 * 中身は各単元のデータ(要点・学ぶ項目・問題と解説・口頭試問)から組み立てる。
 * 読んだページ・しおりは state.books に保存。
 */
window.WPS = window.WPS || {};
WPS.makeBooks = function (ctx) {
  var h = ctx.h, S = WPS.Store;
  var st = { lv: null, q: '', sort: 'order', grid: false };
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
    return out;
  }
  function bookOf(id) { return books().filter(function (b) { return b.id === id; })[0]; }
  function readCount(b) { var r = B().read; return b.units.filter(function (id) { return r[id]; }).length; }

  // 表紙(科目の色と、図形の模様)
  function cover(b, big) {
    var col = (WPS.SUBJECTS[b.subj] || {}).color || '#1146d6';
    var seed = 0; for (var i = 0; i < b.id.length; i++) seed = (seed * 31 + b.id.charCodeAt(i)) % 997;
    var rot = seed % 4 * 90, shapes = '';
    for (var k = 0; k < 6; k++) { var x = 20 + (k % 3) * 22, y = 18 + Math.floor(k / 3) * 22 + (k % 2) * 8; shapes += '<rect x="' + x + '" y="' + y + '" width="20" height="20" rx="2" fill="' + (k % 2 ? col : '#e8a7a0') + '" opacity="' + (k % 2 ? .9 : .75) + '" transform="rotate(' + (25 + rot) + ' ' + (x + 10) + ' ' + (y + 10) + ')"/>'; }
    return '<div class="bk-cover' + (big ? ' big' : '') + '" style="--c:' + col + '"><p class="bk-top">Aqualium テキスト</p><svg viewBox="0 0 110 80" aria-hidden="true">' + shapes + '</svg><b>' + h(b.name) + '</b><small>' + h(WPS.SUBJECTS[b.subj].name) + '</small></div>';
  }

  /* ---------- 本棚 ---------- */
  function shelf() {
    var bs = books();
    // 上の列で「中学」「高校」を切りかえる(はじめは学年に合わせる)
    var jhGrade = WPS.isJHStudent && WPS.isJHStudent(S.get().profile.grade);
    if (!st.lv) st.lv = jhGrade ? 'jh' : 'hs';
    var isJH = function (b) { return b.stage === 'jh'; };
    var q = st.q.trim();
    var list = bs.filter(function (b) { return (st.lv === 'jh' ? isJH(b) : !isJH(b)) && (!q || (b.name + b.short).indexOf(q) >= 0 || b.units.some(function (id) { return WPS.UNIT_MAP[id].name.indexOf(q) >= 0; })); });
    if (st.sort === 'recent') { var t = B().t || {}; list.sort(function (a, c) { return (t[c.id] || 0) - (t[a.id] || 0); }); }
    var last = B().last && WPS.UNIT_MAP[B().last.u] ? B().last : null;
    var html = '';
    if (last) { var lb = bookOf(last.b); if (lb) html += '<section class="card bk-resume"><a href="#books/' + lb.id + '/' + last.u + '"><span>続きから読む</span><b>' + h(lb.name) + '・' + h(WPS.UNIT_MAP[last.u].name) + '</b></a></section>'; }
    html += '<div class="bk-bar"><div class="bk-lv" role="tablist" aria-label="中学・高校">' + [['jh', '中学'], ['hs', '高校']].map(function (o) { return '<button type="button" role="tab" class="bk-lv-btn' + (st.lv === o[0] ? ' on' : '') + '" aria-selected="' + (st.lv === o[0]) + '" data-bklv="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<div class="bk-tools"><input id="bkq" type="search" value="' + h(st.q) + '" placeholder="本・単元を検索" aria-label="本・単元を検索"></div></div>';
    html += '<section class="card bk-shelf' + (st.grid ? ' grid' : '') + '">' + (list.length ? list.map(function (b) {
      var n = readCount(b);
      return '<a class="bk-item" href="#books/' + b.id + '">' + cover(b) + '<div class="bk-meta"><b>' + h(b.name) + '</b><small>' + b.chapters.length + '章・' + b.units.length + '単元</small><span class="bk-prog"><i style="width:' + Math.round(n / b.units.length * 100) + '%"></i></span><small>読んだ ' + n + ' / ' + b.units.length + '</small></div></a>';
    }).join('') : '<p class="muted">見つかりませんでした。</p>') + '</section>';
    return html;
  }

  /* ---------- 本(表紙と目次) ---------- */
  function toc(b) {
    var r = B().read, bm = B().bm, stats = ctx.stats(), n = 1;
    var html = '<div class="bk-reader"><div class="bk-tb"><a href="#books" aria-label="本棚へ戻る">‹ 本棚</a><b>' + h(b.short) + '</b><span></span></div>' +
      '<div class="bk-page bk-front">' + cover(b, true) + '<p class="muted small">' + b.chapters.length + '章・' + b.units.length + '単元。読んだページには✓がつきます。</p></div>' +
      '<section class="card bk-toc"><h2>目次</h2>' + b.chapters.map(function (ch, ci) {
        return '<div class="bk-ch"><h3>第' + (ci + 1) + '章 ' + h(ch.name) + '</h3><ol start="' + n + '" style="--start:' + (n - 1) + '">' + ch.units.map(function (id) {
          n++; var u = WPS.UNIT_MAP[id], ok = allowed(u), s = stats[id] ? stats[id].status : 'untested';
          return '<li class="' + (ok ? '' : 'off') + '"><a href="#books/' + b.id + '/' + id + '"><span>' + h(u.name) + '</span>' + (bm[id] ? '<em class="bk-bm">しおり</em>' : '') + (r[id] ? '<em class="bk-ok">✓</em>' : '') + (s === 'weak' ? '<em class="bk-weak">苦手</em>' : '') + '</a></li>';
        }).join('') + '</ol></div>';
      }).join('') + '</section></div>';
    return html;
  }

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
    var html = '<div class="bk-reader"><div class="bk-tb"><a href="#books/' + b.id + '" aria-label="目次へ">‹ 目次</a><b>' + h(b.short) + '</b><button type="button" class="bk-bmb' + (bm ? ' on' : '') + '" id="bkBm" aria-pressed="' + bm + '" aria-label="しおり"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 3h12v18l-6-4.5L6 21z" fill="currentColor"/></svg></button></div>';
    html += '<article class="bk-page"><p class="bk-crumb">' + h(ch ? ch.name : '') + '</p><h1>' + h(u.name) + '</h1><p class="bk-sub">' + h(WPS.SUBJECTS[u.subj].name) + '・' + h(u.stage) + (stt && stt.n ? '・正答率 ' + Math.round(stt.acc * 100) + '%' : '') + '</p>';
    var L = (WPS.LESSONS || {})[id], n = 0;
    function sec(t, cls) { n++; return '<section class="bk-sec' + (cls ? ' ' + cls : '') + '"><h2><span>' + n + '</span>' + h(t) + '</h2>'; }
    if (L) {
      html += '<div class="lz-goal"><b>この単元でできるようになること</b><p>' + rt(L.goal) + '</p></div>';
      if (u.prereq && u.prereq.length) html += preLinks(u);
      // この単元の地図(節の見出しの一覧)
      html += '<nav class="lz-map" aria-label="この単元の流れ"><b>この単元の流れ</b><ol>' + L.secs.map(function (x) { return '<li>' + h(x.h) + '</li>'; }).join('') + '</ol></nav>';
      html += sec('まずはイメージ', 'lz-intro') + paras(L.intro) + '</section>';
      if (L.pre) html += sec('まずは前提のおさらい', 'lz-pre') + paras(L.pre) + '</section>';
      L.secs.forEach(function (x) {
        html += sec(x.h) + paras(x.t) + (x.key ? '<p class="lz-key"><b>ここが大事</b>' + rt(x.key) + '</p>' : '') + (x.fig ? '<figure class="lz-figw">' + x.fig + '</figure>' : '') + zukai(x) + (x.ex || []).map(function (e, k) {
          return '<div class="bk-board lz-ex"><div class="bk-bh"><b>やってみよう' + (x.ex.length > 1 ? (k + 1) : '') + '</b><em>例題</em></div><div class="bk-bb"><p class="bk-q">' + rt(e.q) + '</p>' +
            (e.hint ? '<p class="lz-hint">ヒント:' + rt(e.hint) + '</p>' : '') + '<ol class="lz-steps">' + e.steps.map(function (st) { return '<li>' + rt(st) + '</li>'; }).join('') + '</ol><p class="bk-ans">答え:<b>' + rt(e.a) + '</b></p>' + (e.check ? '<p class="lz-check">確かめ:' + rt(e.check) + '</p>' : '') + '</div></div>';
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
          (t.choices && t.choices.length ? '<ol class="tl-ch th-ch" type="1">' + t.choices.map(function (c) { return '<li>' + rt(c) + '</li>'; }).join('') + '</ol>' : '') +
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
  var LV = '20261108b';
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
    if (b && p[1] && WPS.UNIT_MAP[p[1]]) {
      if (!lessonReady(p[1])) { loadLesson(p[1]); return '<section class="card bk-loading" aria-busy="true"><p>テキストを読み込んでいます…</p></section>'; }
      var out = page(b, p[1]);
      if (lFail[p[1]] === 1) { lFail[p[1]] = 2; out = '<p class="card muted small">解説の本文を読み込めませんでした。通信の状態を確かめて、ページを開き直してください。</p>' + out; }
      return out;
    }
    if (b) return toc(b);
    return shelf();
  }
  function after(arg) {
    var view = document.getElementById('view'), p = (arg || '').split('/'), b = p[0] ? bookOf(p[0]) : null;
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
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
      if (!S.isView()) { var bb = B(); bb.read[id] = Date.now(); bb.last = { b: b.id, u: id }; bb.t = bb.t || {}; bb.t[b.id] = Date.now(); S.save(); }
      view.querySelector('#bkBm').addEventListener('click', function () { var m = B().bm; if (m[id]) delete m[id]; else m[id] = Date.now(); S.save(); this.classList.toggle('on', !!m[id]); this.setAttribute('aria-pressed', !!m[id]); });
      view.querySelector('#bkPractice').addEventListener('click', function () { ctx.practice(id); });
      return;
    }
    if (b) return;
    view.querySelectorAll('[data-bklv]').forEach(function (x) { x.addEventListener('click', function () { st.lv = x.getAttribute('data-bklv'); re(); }); });
    var q = view.querySelector('#bkq'), tm;
    q.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { st.q = q.value; re(); var el = document.getElementById('bkq'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 250); });
  }
  return { render: render, after: after };
};
