/*
 * 資料パネル(元素の周期表・世界地図)
 * ・どのページの上にも開ける。ページを移動しても閉じない。
 * ・「最小化」で画面の下の小さなボタンになり、押すと元に戻る。
 * ・データはパネルを初めて開いたときに読み込む。
 */
(function () {
  window.WPS = window.WPS || {};
  var VER = '20261108a';
  var KINDS = {
    ptable: { g: '理科', title: '元素の周期表', icon: '⚗️', file: 'elements', ready: function () { return !!WPS.ELEMENTS; } },
    chem: { g: '理科', title: '化学の基本データ', icon: '🧪', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    phys: { g: '理科', title: '物理の公式集', icon: '🧲', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    organic: { g: '理科', title: '有機化合物の官能基', icon: '⚛️', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    biocell: { g: '理科', title: '細胞のつくりとホルモン', icon: '🧬', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    units: { g: '理科', title: '単位と定数', icon: '🔬', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    math: { g: '数学', title: '数学の公式集', icon: '📐', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    trig: { g: '数学', title: '三角比の表', icon: '📏', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    sqrt: { g: '数学', title: '平方・平方根の表', icon: '√', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    prime: { g: '数学', title: '素数表', icon: '🔢', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    tense: { g: '英語', title: '英語の時制のまとめ', icon: '⏳', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    verbs: { g: '英語', title: '英語の不規則動詞', icon: '🔤', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    kogo: { g: '国語', title: '古文単語の一覧', icon: '🌸', ready: function () { return !!(WPS.BANK && WPS.BANK.kobun_bk); } },
    kobun: { g: '国語', title: '古文の助動詞', icon: '📖', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    keigo: { g: '国語', title: '古文の敬語', icon: '🎎', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    kanbun: { g: '国語', title: '漢文の句形', icon: '📜', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    map: { g: '社会', title: '世界地図', icon: '🌏', file: 'worldmap', ready: function () { return !!WPS.WORLDMAP; } },
    koppen: { g: '社会', title: 'ケッペンの気候区分', icon: '🌦️', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    pref: { g: '社会', title: '都道府県と所在地', icon: '🗾', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    chrono: { g: '社会', title: '日本史・世界史の年表', icon: '🗓️', ready: function () { return !!(WPS.BANK && WPS.BANK.jhistory); } },
    era: { g: '社会', title: '時代区分と中国の王朝', icon: '🏯', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    kenpo: { g: '社会', title: '日本国憲法の主な条文', icon: '⚖️', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } }
  };


  var open = {}; // kind -> { el, min }
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function save() { try { var o = {}; Object.keys(open).forEach(function (k) { o[k] = open[k].min ? 1 : 0; }); sessionStorage.setItem('wpsTools', JSON.stringify(o)); } catch (e) { } }
  // 資料ごとの設定(最後に開いたタブ・検索語・暗記モード・位置)と、最近使った資料を覚えておく
  var PREF = (function () { try { return JSON.parse(localStorage.getItem('wpsToolPref') || '{}'); } catch (e) { return {}; } })();
  function pref(kind) { PREF[kind] = PREF[kind] || {}; return PREF[kind]; }
  function savePref() { try { localStorage.setItem('wpsToolPref', JSON.stringify(PREF)); } catch (e) { } }
  function touchRecent(kind) { var r = (PREF._recent || []).filter(function (k) { return k !== kind; }); r.unshift(kind); PREF._recent = r.slice(0, 4); savePref(); }
  function load(kind, cb) {
    var K = KINDS[kind];
    if (K.ready()) return cb();
    var s = document.createElement('script');
    s.src = 'js/data/' + K.file + '.js?v=' + VER;
    s.onload = function () { cb(); }; s.onerror = function () { cb('err'); };
    document.head.appendChild(s);
  }
  function dock() {
    var d = document.getElementById('tlDock');
    if (!d) { d = document.createElement('div'); d.id = 'tlDock'; d.className = 'tl-dock'; document.body.appendChild(d); }
    d.innerHTML = Object.keys(open).filter(function (k) { return open[k].min; }).map(function (k) {
      return '<button type="button" class="tl-pill" data-tlrestore="' + k + '" aria-label="' + KINDS[k].title + 'を開く">' + KINDS[k].icon + ' ' + KINDS[k].title + '<span data-tlclose="' + k + '" role="button" aria-label="閉じる">×</span></button>';
    }).join('');
    document.body.classList.toggle('tl-hasdock', !!d.children.length);
    document.body.classList.toggle('tl-open', Object.keys(open).some(function (k) { return !open[k].min; }));
  }
  function minimize(kind) { var o = open[kind]; if (!o) return; o.min = true; o.el.hidden = true; dock(); save(); }
  function restore(kind) {
    Object.keys(open).forEach(function (k) { if (k !== kind && !open[k].min) minimize(k); }); // 開くのは1つずつ
    var o = open[kind]; if (!o) return; o.min = false; o.el.hidden = false; dock(); save();
    if (kind === 'map' && o.fit) o.fit();
  }
  function close(kind) { var o = open[kind]; if (!o) return; o.el.remove(); delete open[kind]; dock(); save(); }

  function openTool(kind, startMin) {
    if (!KINDS[kind]) return;
    if (open[kind]) { if (startMin) return; return restore(kind); }
    var el = document.createElement('section');
    el.className = 'tl-panel tl-' + kind; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', KINDS[kind].title);
    el.innerHTML = '<header class="tl-hd"><b>' + KINDS[kind].icon + ' ' + KINDS[kind].title + '</b>' +
      '<button type="button" class="tl-big" aria-label="大きさを切りかえる" title="大きさを切りかえる">⤢</button>' +
      '<button type="button" class="tl-min" aria-label="最小化" title="最小化(下に小さくしまう)">—</button>' +
      '<button type="button" class="tl-x" aria-label="閉じる" title="閉じる">×</button></header><div class="tl-body"><p class="muted center" style="padding:24px">読み込み中…</p></div>';
    document.body.appendChild(el);
    open[kind] = { el: el, min: false };
    touchRecent(kind);
    // パソコンでは、見出しをドラッグしてパネルを好きな場所へ動かせる(位置は覚えておく)
    var pp = pref(kind).pos; if (pp && innerWidth >= 900) { el.style.left = Math.min(pp[0], innerWidth - 200) + 'px'; el.style.top = Math.min(pp[1], innerHeight - 120) + 'px'; el.style.right = 'auto'; el.style.bottom = 'auto'; el.classList.add('moved'); }
    el.querySelector('.tl-hd').addEventListener('pointerdown', function (ev) {
      if (innerWidth < 900 || ev.target.closest('button')) return;
      var r = el.getBoundingClientRect(), dx = ev.clientX - r.left, dy = ev.clientY - r.top;
      el.classList.add('moved', 'dragging'); el.style.right = 'auto'; el.style.bottom = 'auto';
      function mv(e) { var x = Math.max(0, Math.min(innerWidth - 120, e.clientX - dx)), y = Math.max(56, Math.min(innerHeight - 60, e.clientY - dy)); el.style.left = x + 'px'; el.style.top = y + 'px'; }
      function up() { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); el.classList.remove('dragging'); pref(kind).pos = [parseInt(el.style.left, 10), parseInt(el.style.top, 10)]; savePref(); }
      document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); ev.preventDefault();
    });
    el.querySelector('.tl-min').onclick = function () { minimize(kind); };
    el.querySelector('.tl-x').onclick = function () { close(kind); };
    el.querySelector('.tl-big').onclick = function () { el.classList.toggle('tall'); if (open[kind].fit) open[kind].fit(); };
    if (startMin) { open[kind].min = true; el.hidden = true; } else Object.keys(open).forEach(function (k) { if (k !== kind && !open[k].min) minimize(k); });
    dock(); save();
    load(kind, function (err) {
      var body = el.querySelector('.tl-body');
      if (err) { body.innerHTML = '<p class="muted center" style="padding:24px">読み込めませんでした。通信状態を確かめて、もう一度開いてください。</p>'; return; }
      if (kind === 'ptable') ptable(body); else if (kind === 'map') map(body, open[kind]); else if (kind === 'chrono') chrono(body); else if (kind === 'kogo') kogo(body); else refTable(body, (WPS.REFS || {})[kind], kind);
    });
  }

  /* ---------- 表の資料(公式集・不規則動詞・助動詞・単位) ---------- */
  function refTable(body, R, kind) {
    if (!R) { body.innerHTML = '<p class="muted">資料を読み込めませんでした。</p>'; return; }
    var P = pref(kind || 'x'), cur = typeof P.tab === 'number' && P.tab < R.sections.length ? P.tab : -1; // -1 = すべて
    body.innerHTML = (R.note ? '<p class="rf-note">' + h(R.note) + '</p>' : '') +
      '<div class="rf-bar"><input type="search" class="rf-q" placeholder="ことばで探す" aria-label="資料の中を探す" value="' + h(P.q || '') + '"><button type="button" class="rf-memo' + (P.memo ? ' on' : '') + '" aria-pressed="' + !!P.memo + '" title="答えの列をかくして、自分で思い出す練習ができます">' + (P.memo ? '👀 暗記中' : '🙈 暗記モード') + '</button></div>' +
      '<div class="rf-tabs" role="tablist">' + ['すべて'].concat(R.sections.map(function (x) { return x.h; })).map(function (t, i) { var on = i - 1 === cur; return '<button type="button" role="tab" data-rft="' + (i - 1) + '"' + (on ? ' class="on"' : '') + ' aria-selected="' + on + '">' + h(t) + '</button>'; }).join('') + '</div>' +
      '<p class="rf-memohint"' + (P.memo ? '' : ' hidden') + '>かくれたところを押すと答えが見えます。</p><div class="rf-body' + (P.memo ? ' memo' : '') + (R.memoFirst ? ' memo-first' : '') + '"></div>';
    var out = body.querySelector('.rf-body'), q = body.querySelector('.rf-q');
    function draw() {
      var w = q.value.trim().toLowerCase(), n = 0;
      out.innerHTML = R.sections.map(function (sec, si) {
        if (cur >= 0 && si !== cur) return '';
        var secHit = w && sec.h.toLowerCase().indexOf(w) >= 0, rows = sec.rows.filter(function (r) { return !w || secHit || r.join(' ').toLowerCase().indexOf(w) >= 0; });
        n += rows.length; if (!rows.length) return '';
        return '<h4 class="rf-h">' + h(sec.h) + '<small>' + rows.length + '</small></h4><div class="rf-scroll"><table class="rf-t"><thead><tr>' + sec.head.map(function (c) { return '<th>' + h(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          rows.map(function (r) { return '<tr>' + r.map(function (c, ci) { return ci === 0 ? '<th scope="row">' + h(c) + '</th>' : '<td' + (c === '' ? ' class="e"' : '') + '>' + h(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      }).join('') || '<p class="muted small">見つかりませんでした。</p>';
    }
    body.querySelector('.rf-tabs').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-rft]'); if (!b) return; cur = +b.getAttribute('data-rft'); P.tab = cur; savePref();
      body.querySelectorAll('.rf-tabs button').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); }); draw();
    });
    // 暗記モード:答えの列をぼかす。押した所だけ見える
    body.querySelector('.rf-memo').addEventListener('click', function () {
      P.memo = !P.memo; savePref(); this.classList.toggle('on', P.memo); this.setAttribute('aria-pressed', P.memo); this.textContent = P.memo ? '👀 暗記中' : '🙈 暗記モード';
      out.classList.toggle('memo', P.memo); body.querySelector('.rf-memohint').hidden = !P.memo; out.querySelectorAll('.shown').forEach(function (x) { x.classList.remove('shown'); });
    });
    out.addEventListener('click', function (ev) { var c = ev.target.closest('td, tbody th'); if (c && out.classList.contains('memo')) c.classList.toggle('shown'); });
    q.addEventListener('input', function () { P.q = q.value; savePref(); draw(); }); draw();
  }
  // 古文単語:アプリの古文単語帳と古典常識のデータから作る
  function kogo(body) {
    var B = WPS.BANK.kobun_bk || [], P = (WPS.KOBUN_BOOK && WPS.KOBUN_BOOK.parts) || [], secs = [];
    P.forEach(function (pt, i) { var rows = B.filter(function (x) { return x.part === i + 1; }).map(function (x) { return [x.t, x.m]; }); if (rows.length) secs.push({ h: pt[2] || ('Part ' + (i + 1)), head: ['古語', '意味'], rows: rows }); });
    var J = (WPS.BANK.kobun_jo || []).map(function (x) { return [x.t, x.m]; }); if (J.length) secs.push({ h: '古典常識', head: ['ことば', '意味'], rows: J });
    refTable(body, { note: '古文単語 ' + B.length + '語と古典常識 ' + J.length + '語。暗記モードで意味をかくして、思い出す練習ができます。', sections: secs }, 'kogo');
  }
  // 年表:アプリの年号データ(日本史・世界史)から作る。紀元前は「前○○年」
  function chrono(body) {
    function yr(t) { t = +t; return t < 0 ? '前' + (-t) + '年' : t + '年'; }
    function rows(bank, tag) { return (WPS.BANK[bank] || []).slice().sort(function (a, b) { return a.t - b.t; }).map(function (x) { return [yr(x.t), x.m, (tag ? tag + '・' : '') + (x.h || '')]; }); }
    var J = rows('jhistory', ''), W = rows('whistory', '');
    var both = (WPS.BANK.jhistory || []).map(function (x) { return [+x.t, x.m, '日本史']; }).concat((WPS.BANK.whistory || []).map(function (x) { return [+x.t, x.m, '世界史']; })).sort(function (a, b) { return a[0] - b[0]; }).map(function (x) { return [yr(x[0]), x[1], x[2]]; });
    refTable(body, { memoFirst: 1, note: '日本史 ' + J.length + '件・世界史 ' + W.length + '件。「日本と世界」は同じ年代のできごとを並べて比べられます。', sections: [
      { h: '日本史', head: ['年', 'できごと', '時代'], rows: J }, { h: '世界史', head: ['年', 'できごと', '時代'], rows: W }, { h: '日本と世界', head: ['年', 'できごと', ''], rows: both }] }, 'chrono');
  }

  /* ---------- 周期表 ---------- */
  var CAT = { am: 'アルカリ金属', ae: 'アルカリ土類金属', tm: '遷移元素', ln: 'ランタノイド', an: 'アクチノイド', mt: '典型元素の金属', ml: '半金属', nm: '非金属', hl: 'ハロゲン', ng: '貴ガス', uk: '性質が未確定' };
  function pos(z) { // [族, 周期, 表の行]
    if (z === 1) return [1, 1, 1]; if (z === 2) return [18, 1, 1];
    var P = [[3, 10, 2], [11, 18, 3], [19, 36, 4], [37, 54, 5], [55, 86, 6], [87, 118, 7]];
    for (var i = 0; i < P.length; i++) {
      var a = P[i][0], b = P[i][1], per = P[i][2];
      if (z < a || z > b) continue;
      var k = z - a;
      if (per <= 3) return [k < 2 ? k + 1 : k + 11, per, per];
      if (per <= 5) return [k + 1, per, per];
      if (k < 2) return [k + 1, per, per];
      if (k <= 16) return [3, per, per === 6 ? 9 : 10, k - 2]; // ランタノイド・アクチノイド(下の行)
      return [k - 13, per, per];
    }
  }
  function ptable(body) {
    var E = WPS.ELEMENTS, R = WPS.ELEM_ROUND || {}, ST = WPS.ELEM_STATE || {}, NT = WPS.ELEM_NOTE || {};
    var cells = E.map(function (e) {
      var p = pos(e[0]), col = p[3] !== undefined ? 3 + p[3] : p[0], row = p[2];
      var st = ST[e[1]];
      return '<button type="button" class="pt-c c-' + e[4] + (st ? ' st-' + (st === '気体' ? 'g' : 'l') : '') + '" style="grid-column:' + col + ';grid-row:' + (row >= 9 ? row + 1 : row) + '" data-z="' + e[0] + '"><i>' + e[0] + '</i><b>' + e[1] + '</b><span>' + h(e[2]) + '</span></button>';
    }).join('');
    var heads = '';
    for (var g = 1; g <= 18; g++) heads += '<i class="pt-g" style="grid-column:' + g + ';grid-row:1">' + g + '</i>';
    var html = '<div class="pt-info" id="ptInfo"><p class="muted small">元素を押すと、くわしく表示します。</p></div>' +
      '<div class="pt-tools"><input type="search" id="ptQ" placeholder="名前・記号で探す(例:鉄、Fe)" aria-label="元素を探す"></div>' +
      '<div class="pt-scroll"><div class="pt-grid">' + heads + cells.replace(/grid-row:(\d+)/g, function (m, r) { return 'grid-row:' + (+r + 1); }) +
      '<span class="pt-lnmark" style="grid-column:3;grid-row:7">57〜71</span><span class="pt-lnmark" style="grid-column:3;grid-row:8">89〜103</span>' +
      '<span class="pt-per" style="grid-row:11;grid-column:1 / span 2">ランタノイド</span><span class="pt-per" style="grid-row:12;grid-column:1 / span 2">アクチノイド</span></div></div>' +
      '<div class="pt-legend">' + Object.keys(CAT).map(function (k) { return '<button type="button" class="pt-lg c-' + k + '" data-cat="' + k + '">' + CAT[k] + '</button>'; }).join('') + '</div>' +
      '<p class="muted small pt-foot">文字が青い元素は常温で気体、緑は液体(それ以外は固体)。原子量の( )は安定な同位体がない元素で、代表的な同位体の質量数です。新しい教科書では12族も遷移元素に含めます。</p>';
    body.innerHTML = html;
    var grid = body.querySelector('.pt-grid'), info = body.querySelector('#ptInfo');
    function show(z) {
      var e = E[z - 1], p = pos(z);
      grid.querySelectorAll('.pt-c.on').forEach(function (x) { x.classList.remove('on'); });
      var c = grid.querySelector('[data-z="' + z + '"]'); if (c) c.classList.add('on');
      info.innerHTML = '<div class="pt-big c-' + e[4] + '"><i>' + e[0] + '</i><b>' + e[1] + '</b></div><div><p class="pt-name">' + h(e[2]) + '</p>' +
        '<p class="small">原子量 <b>' + e[3] + '</b>' + (R[e[1]] ? '(計算では ' + R[e[1]] + ')' : '') + '</p>' +
        (function () {
          // 電子配置(原子番号20まで)と価電子の数(典型元素)
          var z = e[0], out = '';
          if (z <= 20) { var cap = [2, 8, 8, 2], sh = [], r = z; for (var i = 0; i < 4 && r > 0; i++) { var c = Math.min(cap[i], r); sh.push('KLMN'[i] + c); r -= c; } out += '電子配置 ' + sh.join(' ') + '　'; }
          var g = p[0], val = g === 1 || g === 2 ? g : g >= 13 && g <= 17 ? g - 10 : g === 18 ? 0 : null;
          if (val !== null && p[3] === undefined && e[4] !== 'uk') out += '価電子 ' + val + '個';
          return out ? '<p class="small">' + out + '</p>' : '';
        })() +
        '<p class="small">' + p[0] + '族・第' + p[1] + '周期' + (p[3] !== undefined ? '(' + (p[1] === 6 ? 'ランタノイド' : 'アクチノイド') + ')' : '') + '/' + CAT[e[4]] + '/常温で' + (ST[e[1]] || '固体') + '</p>' +
        (NT[e[1]] ? '<p class="small pt-note">' + h(NT[e[1]]) + '</p>' : '') + '</div>';
    }
    grid.addEventListener('click', function (ev) { var b = ev.target.closest('.pt-c'); if (b) show(+b.getAttribute('data-z')); });
    body.querySelector('.pt-legend').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-cat]'); if (!b) return;
      var on = !b.classList.contains('on');
      body.querySelectorAll('.pt-lg').forEach(function (x) { x.classList.remove('on'); });
      grid.classList.toggle('dim', on);
      grid.querySelectorAll('.pt-c').forEach(function (x) { x.classList.toggle('hl', on && x.classList.contains('c-' + b.getAttribute('data-cat'))); });
      if (on) b.classList.add('on');
    });
    body.querySelector('#ptQ').addEventListener('input', function (ev) {
      var q = ev.target.value.trim().toLowerCase();
      grid.classList.toggle('dim', !!q);
      var hit = null;
      grid.querySelectorAll('.pt-c').forEach(function (x) {
        var e = E[+x.getAttribute('data-z') - 1], m = q && (e[1].toLowerCase() === q || e[2].indexOf(q) >= 0 || String(e[0]) === q);
        x.classList.toggle('hl', !!m); if (m && !hit) hit = e[0];
      });
      if (hit) { show(hit); var c = grid.querySelector('[data-z="' + hit + '"]'); if (c && c.scrollIntoView) c.scrollIntoView({ block: 'nearest', inline: 'center' }); }
    });
  }

  /* ---------- 世界地図 ---------- */
  function map(body, st) {
    var M = WPS.WORLDMAP, NS = 'http://www.w3.org/2000/svg';
    body.innerHTML = '<div class="wm-bar"><input type="search" id="wmQ" placeholder="国名で探す(例:ブラジル)" aria-label="国名で探す" list="wmList"><datalist id="wmList">' +
      M.c.filter(function (c) { return c.n; }).map(function (c) { return '<option value="' + h(c.n) + '">'; }).join('') + '</datalist>' +
      '<button type="button" class="wm-b wm-cityb on" aria-pressed="true" aria-label="都市を表示">都市</button><button type="button" class="wm-b" data-z="1" aria-label="拡大">＋</button><button type="button" class="wm-b" data-z="-1" aria-label="縮小">−</button><button type="button" class="wm-b" data-z="0" aria-label="全体を表示">全体</button></div>' +
      '<p class="wm-info" id="wmInfo">国を押すと名前を表示します。指でつまむ・ホイールで拡大、ドラッグで移動。<span class="wm-leg"><i class="cap"></i>首都 <i></i>主な都市(拡大すると増えます)</span></p>' +
      '<div class="wm-wrap"><svg class="wm" viewBox="0 0 ' + M.w + ' ' + M.h + '" role="img" aria-label="世界地図(日本中心)"><path class="wm-sea" d="' + M.sphere + '"/><path class="wm-grat" d="' + M.grat + '"/><g class="wm-land"></g><g class="wm-lab"></g><g class="wm-city"></g></svg></div>';
    var wrap = body.querySelector('.wm-wrap'), svg = body.querySelector('svg'), land = svg.querySelector('.wm-land'), lab = svg.querySelector('.wm-lab'), info = body.querySelector('#wmInfo');
    var paths = [], labels = [], cities = [], cg = svg.querySelector('.wm-city');
    (M.city || []).forEach(function (c) {
      var g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'wc' + (c[4] ? ' cap' : ''));
      var dot = document.createElementNS(NS, c[4] ? 'rect' : 'circle'), t = document.createElementNS(NS, 'text');
      t.textContent = c[0]; g.appendChild(dot); g.appendChild(t); cg.appendChild(g); cities.push([g, dot, t, c]);
    });
    M.c.forEach(function (c, i) {
      var p = document.createElementNS(NS, 'path'); p.setAttribute('d', c.d); p.setAttribute('data-i', i);
      if (c.n === '日本') p.classList.add('jp');
      land.appendChild(p); paths.push(p);
      if (c.n && c.e !== 'Antarctica') { var t = document.createElementNS(NS, 'text'); t.setAttribute('x', c.x); t.setAttribute('y', c.y); t.textContent = c.n.replace(/\(.*\)/, ''); lab.appendChild(t); labels.push([t, c]); }
    });
    var vb = { x: 0, y: 0, w: M.w, h: M.h };
    function apply() {
      svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h);
      var k = M.w / vb.w, scr = svg.clientWidth ? svg.clientWidth / M.w : 1, fs = 11 / (k * scr);
      labels.forEach(function (L) {
        // 国の面積(画面上)が、国名の文字の大きさにくらべて十分に広いときだけ名前を出す
        var c = L[1], len = c.n.replace(/\(.*\)/, '').length, side = Math.sqrt(c.a) * k * scr, showIt = side > 11 * len * 0.42 || k >= 12;
        L[0].style.display = showIt ? '' : 'none'; L[0].setAttribute('font-size', fs.toFixed(2));
      });
      svg.style.setProperty('--sw', (0.6 / k).toFixed(3));
      // 都市:拡大するほど多く出す(段階1=いつも、2=約2倍、3=約3.5倍から)
      var px = k * scr, r = 2.6 / px, cf = 10 / px;
      cities.forEach(function (C) {
        var c = C[3], show = cityOn && (c[3] === 1 || (c[3] === 2 && px >= 1.7) || (c[3] === 3 && px >= 3) || (c[3] === 4 && px >= 6));
        C[0].style.display = show ? '' : 'none'; if (!show) return;
        if (c[4]) { C[1].setAttribute('x', c[1] - r); C[1].setAttribute('y', c[2] - r); C[1].setAttribute('width', 2 * r); C[1].setAttribute('height', 2 * r); }
        else { C[1].setAttribute('cx', c[1]); C[1].setAttribute('cy', c[2]); C[1].setAttribute('r', r * 0.85); }
        // 名前の位置:ふつうは右。近くの都市と重なるものは上・下・左に出す
        var ps = c[5], tx = ps === 'l' ? c[1] - r * 1.6 : ps === 'u' || ps === 'd' ? c[1] - r * 0.6 : c[1] + r * 1.6, ty = ps === 'u' ? c[2] - r * 2.6 : ps === 'd' ? c[2] + r * 2.8 : c[2];
        C[2].setAttribute('x', tx); C[2].setAttribute('y', ty); C[2].setAttribute('text-anchor', ps === 'l' ? 'end' : 'start'); C[2].setAttribute('font-size', cf.toFixed(2));
      });
    }
    // 表示わくの縦横比に合わせる(スマホの縦長の画面でも、地図がわくいっぱいに出るように)
    function ar() { var w = wrap.clientWidth, hh = wrap.clientHeight; return w && hh ? hh / w : M.h / M.w; }
    function maxW() { return Math.min(M.w, M.h / ar()); }
    function clamp() {
      vb.w = Math.min(maxW(), Math.max(M.w / 40, vb.w)); vb.h = vb.w * ar();
      vb.x = Math.min(M.w - vb.w, Math.max(0, vb.x)); vb.y = Math.min(M.h - vb.h, Math.max(0, vb.y));
    }
    var JPX = (M.c.filter(function (c) { return c.n === '日本'; })[0] || { x: M.w / 2 }).x;
    function whole() { vb.w = maxW(); vb.h = vb.w * ar(); vb.x = JPX - vb.w * 0.55; vb.y = (M.h - vb.h) / 2; clamp(); apply(); }
    function zoomAt(f, cx, cy) { var nw = vb.w / f; vb.x = cx - (cx - vb.x) * nw / vb.w; vb.y = cy - (cy - vb.y) * nw / vb.w; vb.w = nw; clamp(); apply(); }
    function toSvg(ev) { var r = svg.getBoundingClientRect(); return [vb.x + (ev.clientX - r.left) / r.width * vb.w, vb.y + (ev.clientY - r.top) / r.height * vb.h]; }
    st.fit = function () { setTimeout(whole, 30); };
    var cityOn = true;
    body.querySelector('.wm-bar').addEventListener('click', function (ev) {
      var cb = ev.target.closest('.wm-cityb'); if (cb) { cityOn = !cityOn; cb.classList.toggle('on', cityOn); cb.setAttribute('aria-pressed', cityOn); apply(); return; }
      var b = ev.target.closest('[data-z]'); if (!b) return;
      var z = +b.getAttribute('data-z');
      if (z === 0) { whole(); return; }
      zoomAt(z > 0 ? 1.6 : 1 / 1.6, vb.x + vb.w / 2, vb.y + vb.h / 2);
    });
    svg.addEventListener('wheel', function (ev) { ev.preventDefault(); var p = toSvg(ev); zoomAt(ev.deltaY < 0 ? 1.25 : 0.8, p[0], p[1]); }, { passive: false });
    var pts = {}, drag = null, moved = false;
    svg.addEventListener('pointerdown', function (ev) { svg.setPointerCapture(ev.pointerId); pts[ev.pointerId] = [ev.clientX, ev.clientY]; drag = { x: ev.clientX, y: ev.clientY, vb: Object.assign({}, vb) }; moved = false; });
    svg.addEventListener('pointermove', function (ev) {
      if (!pts[ev.pointerId]) return;
      var ids = Object.keys(pts);
      if (ids.length === 2) {
        var o = pts[ids[0]], q = pts[ids[1]], d0 = Math.hypot(o[0] - q[0], o[1] - q[1]);
        pts[ev.pointerId] = [ev.clientX, ev.clientY];
        var o2 = pts[ids[0]], q2 = pts[ids[1]], d1 = Math.hypot(o2[0] - q2[0], o2[1] - q2[1]);
        if (d0 > 0) { var mid = toSvg({ clientX: (o2[0] + q2[0]) / 2, clientY: (o2[1] + q2[1]) / 2 }); zoomAt(d1 / d0, mid[0], mid[1]); }
        moved = true; return;
      }
      pts[ev.pointerId] = [ev.clientX, ev.clientY];
      var r = svg.getBoundingClientRect(), dx = (ev.clientX - drag.x) / r.width * vb.w, dy = (ev.clientY - drag.y) / r.height * vb.h;
      if (Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y) > 4) moved = true;
      if (moved) { vb.x = drag.vb.x - dx; vb.y = drag.vb.y - dy; clamp(); apply(); }
    });
    function up(ev) {
      var wasTap = !moved && Object.keys(pts).length === 1;
      delete pts[ev.pointerId];
      if (Object.keys(pts).length === 1) { var id = Object.keys(pts)[0]; drag = { x: pts[id][0], y: pts[id][1], vb: Object.assign({}, vb) }; }
      if (wasTap && ev.type === 'pointerup') {
        var el = document.elementFromPoint(ev.clientX, ev.clientY), i = el && el.getAttribute && el.getAttribute('data-i');
        if (i !== null && i !== undefined) select(+i);
      }
    }
    svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    function select(i, zoom) {
      paths.forEach(function (p) { p.classList.remove('on'); });
      var c = M.c[i]; paths[i].classList.add('on');
      info.innerHTML = '<b>' + h(c.n || c.e) + '</b>' + (c.n ? '<span class="muted small"> ' + h(c.e) + '</span>' : '');
      if (zoom) {
        var bb = paths[i].getBBox(), w = Math.max(bb.width, bb.height / ar()) * 2.2;
        vb.w = Math.max(w, M.w / 40); vb.h = vb.w * ar(); vb.x = bb.x + bb.width / 2 - vb.w / 2; vb.y = bb.y + bb.height / 2 - vb.h / 2; clamp(); apply();
      }
    }
    body.querySelector('#wmQ').addEventListener('change', function (ev) {
      var q = ev.target.value.trim(); if (!q) return;
      var i = M.c.findIndex(function (c) { return c.n === q; });
      if (i < 0) i = M.c.findIndex(function (c) { return c.n && c.n.indexOf(q) >= 0; });
      if (i >= 0) select(i, true); else info.textContent = '「' + q + '」は見つかりませんでした。';
    });
    whole();
    if (window.ResizeObserver) new ResizeObserver(function () { if (!st.min) { clamp(); apply(); } }).observe(wrap);
  }

  /* ---------- 呼び出し用のメニュー ---------- */
  function menu(btn) {
    var m = document.getElementById('tlMenu');
    if (m) { m.remove(); return; }
    m = document.createElement('div'); m.id = 'tlMenu'; m.className = 'tl-menu'; m.setAttribute('role', 'menu');
    var gs = []; Object.keys(KINDS).forEach(function (k) { if (gs.indexOf(KINDS[k].g) < 0) gs.push(KINDS[k].g); });
    var rec = (PREF._recent || []).filter(function (k) { return KINDS[k]; }).slice(0, 4);
    var item = function (k) { return '<button type="button" role="menuitem" data-tlopen="' + k + '">' + KINDS[k].icon + ' ' + KINDS[k].title + '</button>'; };
    m.innerHTML = '<input type="search" class="tl-ms" placeholder="すべての資料から探す(例:加法定理・炎色)" aria-label="すべての資料から探す"><div class="tl-mres"></div>' +
      (rec.length ? '<p class="tl-mg">最近使った資料</p>' + rec.map(item).join('') : '') + gs.map(function (g) { return '<p class="tl-mg">' + g + '</p>' + Object.keys(KINDS).filter(function (k) { return KINDS[k].g === g; }).map(function (k) { return '<button type="button" role="menuitem" data-tlopen="' + k + '">' + KINDS[k].icon + ' ' + KINDS[k].title + '</button>'; }).join(''); }).join('');
    document.body.appendChild(m);
    // すべての資料をまとめて検索(表の資料は、はじめて検索したときに読み込む)
    var ms = m.querySelector('.tl-ms'), res = m.querySelector('.tl-mres');
    ms.addEventListener('input', function () {
      var w = ms.value.trim().toLowerCase();
      if (!w) { res.innerHTML = ''; return; }
      if (!(WPS.REFS && WPS.REFS.math && WPS.REFS.phys && WPS.REFS.trig)) { load('math', function () { load('phys', function () { load('trig', function () { ms.dispatchEvent(new Event('input')); }); }); }); res.innerHTML = '<p class="tl-mg">読み込み中…</p>'; return; }
      var hits = [];
      Object.keys(WPS.REFS).forEach(function (k) { if (!KINDS[k]) return; WPS.REFS[k].sections.forEach(function (sec) { sec.rows.forEach(function (r) { if (hits.length < 40 && (sec.h + ' ' + r.join(' ')).toLowerCase().indexOf(w) >= 0) hits.push([k, r, sec.h]); }); }); });
      ((WPS.BANK || {}).kobun_bk || []).forEach(function (x) { if (hits.length < 40 && (x.t + ' ' + x.m).toLowerCase().indexOf(w) >= 0) hits.push(['kogo', [x.t, x.m]]); });
      ['jhistory', 'whistory'].forEach(function (b) { ((WPS.BANK || {})[b] || []).forEach(function (x) { if (hits.length < 40 && (x.m + ' ' + x.t).toLowerCase().indexOf(w) >= 0) hits.push(['chrono', [(+x.t < 0 ? '前' + (-x.t) : x.t) + '年', x.m]]); }); });
      (WPS.ELEMENTS || []).forEach(function (e) { if (hits.length < 40 && (e[1].toLowerCase() === w || e[2].indexOf(w) >= 0)) hits.push(['ptable', [e[1], e[2] + '(原子番号' + e[0] + ')']]); });
      res.innerHTML = hits.length ? hits.map(function (x) { return '<button type="button" class="tl-hit" data-tlopen="' + x[0] + '" data-tlq="' + h(ms.value.trim()) + '"><em>' + KINDS[x[0]].icon + ' ' + h(KINDS[x[0]].title) + '</em><b>' + h(x[1][0]) + '</b><span>' + h(x[1].slice(1).filter(Boolean).join(' / ')) + '</span></button>'; }).join('') : '<p class="tl-mg">見つかりませんでした</p>';
    });
    setTimeout(function () { if (innerWidth >= 900) ms.focus(); }, 0);
    var r = btn.getBoundingClientRect();
    m.style.top = (r.bottom + 6) + 'px'; m.style.right = Math.max(8, innerWidth - r.right) + 'px';
    setTimeout(function () { document.addEventListener('click', function off(ev) { if (!m.contains(ev.target)) { m.remove(); document.removeEventListener('click', off); } }); }, 0);
  }
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    var m = document.getElementById('tlMenu'); if (m) { m.remove(); return; }
    var k = Object.keys(open).filter(function (x) { return !open[x].min; })[0]; if (k) minimize(k);
  });
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var c = t.closest && t.closest('[data-tlclose]'); if (c) { ev.stopPropagation(); close(c.getAttribute('data-tlclose')); return; }
    var r = t.closest && t.closest('[data-tlrestore]'); if (r) { restore(r.getAttribute('data-tlrestore')); return; }
    var o = t.closest && t.closest('[data-tlopen]'); if (o) {
      var m = document.getElementById('tlMenu'); if (m) m.remove(); var k = o.getAttribute('data-tlopen'), q = o.getAttribute('data-tlq');
      if (q !== null && k !== 'ptable') { pref(k).q = q; pref(k).tab = -1; savePref(); if (open[k]) close(k); }
      openTool(k); if (q !== null && k === 'ptable') setTimeout(function () { var i = document.getElementById('ptQ'); if (i) { i.value = q; i.dispatchEvent(new Event('input')); } }, 400); return;
    }
    var b = t.closest && t.closest('.tb-tools'); if (b) { ev.preventDefault(); menu(b); }
  });
  // 前に開いていたパネルを、ページを読み直したあとも戻す
  try { var saved = JSON.parse(sessionStorage.getItem('wpsTools') || '{}'); Object.keys(saved).forEach(function (k) { openTool(k, true); }); Object.keys(saved).forEach(function (k) { if (!saved[k]) restore(k); }); } catch (e) { }
  WPS.Tools = { open: openTool, minimize: minimize, restore: restore, close: close };
})();
