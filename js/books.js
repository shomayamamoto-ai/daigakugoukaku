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
  function allowed(u) { var p = S.get().profile; return WPS.unitAllowed(u, p.grade, ctx.stats()); }

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
      if (L.drill && L.drill.length) html += sec('練習問題', 'lz-drill') + '<p class="muted small">まず自分で解いてから、「答えと解き方」を押して確かめましょう。</p><ol class="lz-dl">' + L.drill.map(function (d) {
        return '<li><p class="lz-dq"><em class="lv' + (d.lv || 1) + '">' + ['', '基本', '標準', '発展'][d.lv || 1] + '</em>' + rt(d.q) + '</p><details><summary>答えと解き方</summary><p class="lz-da">答え:<b>' + rt(d.a) + '</b></p>' + paras(d.exp) + '</details></li>';
      }).join('') + '</ol></section>';
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
  var LV = '20261105h', LFILES = ['lessons_1', 'lessons_2', 'lessons_3', 'lessons_4', 'lessons_5', 'lessons_6', 'lessons_7', 'lessons_8', 'lessons_9', 'lessons_10', 'lessons_new_hsogo', 'lessons_new_geo', 'lessons_new_rinri', 'lessons_new_phys', 'lessons_new_chem', 'lessons_new_bio', 'lessons_new_earth', 'lessons_new_kyotsu', 'lessons_new_englis', 'lessons_new_life', 'lessons_new_jhlang', 'lessons_new_jhmss', 'lessons_new_jhist', 'lessons_new_whista', 'lessons_new_whistb', 'lessons_new_civics', 'lessons_new_geob', 'lessons_zukai'];
  var lState = 0; // 0:未読込 1:読込中 2:完了 3:失敗
  function ensureLessons() {
    if (lState === 2) return true;
    if (lState === 1) return false;
    lState = 1;
    var i = 0;
    (function nextFile() {
      if (i >= LFILES.length) { lState = 2; if (/^#books/.test(location.hash)) ctx.render(); return; }
      var sc = document.createElement('script'); sc.src = 'js/data/' + LFILES[i++] + '.js?v=' + LV;
      sc.onload = nextFile;
      sc.onerror = function () { lState = 3; if (/^#books/.test(location.hash)) ctx.render(); };
      document.head.appendChild(sc);
    })();
    return false;
  }
  function render(arg) {
    if (!ensureLessons()) {
      if (lState === 3) { lState = 0; return '<section class="card"><p>テキストの読み込みに失敗しました。通信の状態を確かめて、もう一度開いてください。</p><a class="btn" href="#books">もう一度読み込む</a></section>'; }
      return '<section class="card bk-loading" aria-busy="true"><p>テキストを読み込んでいます…</p></section>';
    }
    var p = (arg || '').split('/'), b = p[0] ? bookOf(p[0]) : null;
    if (b && p[1] && WPS.UNIT_MAP[p[1]]) return page(b, p[1]);
    if (b) return toc(b);
    return shelf();
  }
  function after(arg) {
    if (lState !== 2) return;
    var view = document.getElementById('view'), p = (arg || '').split('/'), b = p[0] ? bookOf(p[0]) : null;
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    if (b && p[1] && WPS.UNIT_MAP[p[1]]) {
      var id = p[1];
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
