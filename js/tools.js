/*
 * 資料パネル(元素の周期表・世界地図)
 * ・どのページの上にも開ける。ページを移動しても閉じない。
 * ・「最小化」で画面の下の小さなボタンになり、押すと元に戻る。
 * ・データはパネルを初めて開いたときに読み込む。
 */
(function () {
  window.WPS = window.WPS || {};
  var VER = '20261110p';
  var KINDS = {
    ptable: { g: '理科', title: '元素の周期表', icon: '⚗️', file: 'elements', ready: function () { return !!WPS.ELEMENTS; } },
    chem: { g: '理科', title: '化学の基本データ', icon: '🧪', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    phys: { g: '理科', title: '物理の公式集', icon: '🧲', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    organic: { g: '理科', title: '有機化合物の官能基', icon: '⚛️', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    biocell: { g: '理科', title: '細胞とホルモン', icon: '🧬', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    units: { g: '理科', title: '単位と定数', icon: '🔬', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    math: { g: '数学', title: '数学の公式集', icon: '📐', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    trig: { g: '数学', title: '三角比の表', icon: '📏', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    sqrt: { g: '数学', title: '平方・平方根の表', icon: '√', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    prime: { g: '数学', title: '素数表', icon: '🔢', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    tense: { g: '英語', title: '英語の時制', icon: '⏳', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    verbs: { g: '英語', title: '英語の不規則動詞', icon: '🔤', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    kogo: { g: '国語', title: '古文単語の一覧', icon: '🌸', ready: function () { return !!(WPS.BANK && WPS.BANK.kobun_bk); } },
    kobun: { g: '国語', title: '古文の助動詞', icon: '📖', file: 'refs', ready: function () { return !!(WPS.REFS && WPS.REFS.math); } },
    keigo: { g: '国語', title: '古文の敬語', icon: '🎎', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    kanbun: { g: '国語', title: '漢文の句形', icon: '📜', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    map: { g: '社会', title: '世界地図', icon: '🌏', file: 'worldmap', ready: function () { return !!WPS.WORLDMAP; } },
    jmap: { g: '社会', title: '日本史の地図', icon: '⛩️', file: 'jmap', ready: function () { return !!WPS.JMAP; } },
    hmap: { g: '社会', title: '世界史の地図', icon: '🗺️', file: 'histmap/index', ready: function () { return !!WPS.HISTMAP; } },
    koppen: { g: '社会', title: 'ケッペンの気候区分', icon: '🌦️', file: 'refs3', ready: function () { return !!(WPS.REFS && WPS.REFS.trig); } },
    pref: { g: '社会', title: '都道府県と所在地', icon: '🗾', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    chrono: { g: '社会', title: '日本史・世界史の年表', icon: '🗓️', ready: function () { return !!(WPS.BANK && WPS.BANK.jhistory); } },
    era: { g: '社会', title: '時代区分と中国王朝', icon: '🏯', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } },
    kenpo: { g: '社会', title: '日本国憲法', icon: '⚖️', file: 'refs2', ready: function () { return !!(WPS.REFS && WPS.REFS.phys); } }
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
  function minimize(kind) { var o = open[kind]; if (!o) return; if (o.el.classList.contains('full')) setFull(o.el, kind, false); o.min = true; o.el.hidden = true; dock(); save(); }
  function restore(kind) {
    Object.keys(open).forEach(function (k) { if (k !== kind && !open[k].min) minimize(k); }); // 開くのは1つずつ
    var o = open[kind]; if (!o) return; o.min = false; o.el.hidden = false; dock(); save();
    if ((kind === 'map' || kind === 'hmap' || kind === 'jmap') && o.fit) o.fit();
  }
  function close(kind) { var o = open[kind]; if (!o) return; o.el.remove(); delete open[kind]; document.body.classList.toggle('tl-full', !!document.querySelector('.tl-panel.full:not([hidden])')); dock(); save(); }

  function setFull(el, kind, on) {
    el.classList.toggle('full', on); document.body.classList.toggle('tl-full', !!document.querySelector('.tl-panel.full:not([hidden])'));
    var b = el.querySelector('.tl-big'); b.textContent = on ? '⤡' : '⤢'; b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? '全画面をやめる' : '全画面で表示'); b.title = b.getAttribute('aria-label');
    if (open[kind] && open[kind].fit) open[kind].fit();
  }
  document.addEventListener('keydown', function (ev) { if (ev.key !== 'Escape') return; var f = document.querySelector('.tl-panel.full:not([hidden])'); if (!f) return; var k = Object.keys(open).filter(function (x) { return open[x].el === f; })[0]; if (k) { ev.stopPropagation(); setFull(f, k, false); } }, true);
  function openTool(kind, startMin) {
    if (document.body.classList.contains('no-tools')) return;
    if (!KINDS[kind]) return;
    if (open[kind]) { if (startMin) return; return restore(kind); }
    var el = document.createElement('section');
    el.className = 'tl-panel tl-' + kind; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', KINDS[kind].title);
    el.innerHTML = '<header class="tl-hd"><b>' + KINDS[kind].icon + ' ' + KINDS[kind].title + '</b>' +
      '<button type="button" class="tl-big" aria-label="全画面で表示" title="全画面で表示" aria-pressed="false">⤢</button>' +
      '<button type="button" class="tl-min" aria-label="最小化" title="最小化(下に小さくしまう)">—</button>' +
      '<button type="button" class="tl-x" aria-label="閉じる" title="閉じる">×</button></header><div class="tl-body"><p class="muted center" style="padding:24px">読み込み中…</p></div>';
    if (kind === 'hmap' || kind === 'jmap') el.classList.add('tall'); // 地図は大きく開く
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
    // ⤢ で全画面表示、もう一度押すと元の大きさに戻る(Esc でも戻る)
    el.querySelector('.tl-big').onclick = function () { setFull(el, kind, !el.classList.contains('full')); };
    if (startMin) { open[kind].min = true; el.hidden = true; } else Object.keys(open).forEach(function (k) { if (k !== kind && !open[k].min) minimize(k); });
    dock(); save();
    load(kind, function (err) {
      var body = el.querySelector('.tl-body');
      if (err) { body.innerHTML = '<p class="muted center" style="padding:24px">読み込めませんでした。通信状態を確かめて、もう一度開いてください。</p>'; return; }
      if (kind === 'ptable') ptable(body); else if (kind === 'map') map(body, open[kind]); else if (kind === 'hmap') hmap(body, open[kind]); else if (kind === 'jmap') jmap(body, open[kind]); else if (kind === 'chrono') chrono(body); else if (kind === 'kogo') kogo(body); else refTable(body, (WPS.REFS || {})[kind], kind);
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

  /* ---------- 日本史の地図(旧国名・政権と領土・戦国大名。政権と戦国は1年ごと) ---------- */
  function jmap(body, st) {
    var J = WPS.JMAP, NS = 'http://www.w3.org/2000/svg', P = pref('jmap'), JP = J.jp, T = J.terr, SG = J.sengoku, META = JP.meta;
    var mode = ['kuni', 'sei', 'sen'].indexOf(P.mode) >= 0 ? P.mode : 'kuni', hide = !!P.hide;
    var GC = { '畿内': '#f2b5b5', '東海道': '#f6d38f', '東山道': '#b9dba3', '北陸道': '#a9cdea', '山陰道': '#c9b6e4', '山陽道': '#f3b996', '南海道': '#9fd6cf', '西海道': '#e5c3a0', '蝦夷地': '#e3e0d6', '琉球': '#d9d2ec', 'その他': '#e3e0d6' };
    var C = { core: ['#f0a35e', '中央の政権の支配・日本の領土'], out: ['#e3e0d6', '支配の外'], fuji: ['#86c5a4', '奥州藤原氏'], wajin: ['#e46d57', '和人の住む地域(松前氏)'], ryu: ['#b39ddb', '琉球王国'], ryuS: ['#cbb8ef', '琉球(薩摩藩の支配下・琉球藩)'], sat: ['#d98c6a', '薩摩藩の直接支配'], ainu: ['#d8e3c8', 'アイヌの人々の土地'], us: ['#9ec5e8', 'アメリカの統治下'], occ: ['#c9c3d6', 'ソ連(ロシア)が占拠'] };
    function band(u) { return u[1] ? parseFloat(u[1]) : 0; }
    var OUT = /蝦夷地|琉球|奄美|小笠原/;
    // 政権の範囲:年ごとの区分(前近代は旧国・緯度で判定)
    var ERA = [
      [250, 699, '古墳〜飛鳥時代 ヤマト政権', '前方後円墳が北は岩手県南部、南は鹿児島県まで広がる。ヤマト政権の影響が及んだおおよその範囲。', function (pv, u) { if (pv === '陸奥') return band(u) < 39.25 ? 'core' : 'out'; if (pv === '出羽') return band(u) < 38.5 ? 'core' : 'out'; return OUT.test(pv) ? 'out' : 'core'; }],
      [700, 801, '奈良時代 多賀城・秋田城', '712年に出羽国、724年に多賀城、733年に秋田城。東北の蝦夷(えみし)と向き合った。', function (pv, u) { if (pv === '陸奥') return band(u) < 38.5 ? 'core' : 'out'; if (pv === '出羽') return band(u) < 39 ? 'core' : 'out'; return OUT.test(pv) ? 'out' : 'core'; }],
      [802, 1086, '平安時代 胆沢城・志波城', '802年に坂上田村麻呂がアテルイを降伏させ、支配を岩手県中部まで広げた。', function (pv, u) { if (pv === '陸奥') return band(u) < 39.75 ? 'core' : 'out'; if (pv === '出羽') return band(u) < 40 ? 'core' : 'out'; return OUT.test(pv) ? 'out' : 'core'; }],
      [1087, 1188, '平安時代後期 奥州藤原氏', '後三年合戦ののち、平泉を拠点に奥州藤原氏が陸奥・出羽を支配した(1189年に源頼朝がほろぼす)。', function (pv) { if (pv === '陸奥' || pv === '出羽') return 'fuji'; return OUT.test(pv) ? 'out' : 'core'; }],
      [1189, 1428, '鎌倉・室町時代', '奥州藤原氏がほろび、本州から九州までが幕府と朝廷の支配下に入った。', function (pv) { return OUT.test(pv) ? 'out' : 'core'; }],
      [1429, 1608, '室町・戦国時代 琉球王国と和人の進出', '1429年に琉球王国が成立。蝦夷地の南部には和人の館がつくられ、1457年にコシャマインの戦いがおきた。', function (pv, u) { if (pv === '蝦夷地') return u[1] === '和人地' ? 'wajin' : 'ainu'; if (pv === '琉球' || pv === '奄美') return 'ryu'; return pv === '小笠原' ? 'out' : 'core'; }],
      [1609, 1868, '江戸時代 松前藩・薩摩藩の琉球支配', '松前藩がアイヌとの交易を独占。1609年から薩摩藩が琉球王国を支配下に置き、奄美を直接治めた。', function (pv, u) { if (pv === '蝦夷地') return u[1] === '和人地' ? 'wajin' : 'ainu'; if (pv === '琉球') return 'ryuS'; if (pv === '奄美') return 'sat'; return pv === '小笠原' ? 'out' : 'core'; }],
      [1869, 2024, '明治時代から現在', '', function (pv, u, y) {
        if (pv === '琉球') return y < 1879 ? 'ryuS' : y >= 1946 && y < 1972 ? 'us' : 'core';
        if (pv === '奄美') return y >= 1946 && y < 1953 ? 'us' : 'core';
        if (pv === '小笠原') return y < 1876 ? 'out' : y >= 1946 && y < 1968 ? 'us' : 'core';
        if (pv === '蝦夷地' && u[1] === '千島南部') return y >= 1945 ? 'occ' : 'core';
        return 'core'; }]
    ];
    var MOD = [[1869, '蝦夷地を北海道と改め、開拓使を置いた。'], [1872, '琉球王国を琉球藩とした。'], [1875, '樺太・千島交換条約:樺太をロシア領、千島列島すべてを日本領とした。'], [1876, '小笠原諸島を日本の領土とした。'], [1879, '琉球藩を廃して沖縄県を置いた(琉球処分)。'], [1895, '下関条約:日清戦争に勝ち、台湾・澎湖諸島を得た。'], [1905, 'ポーツマス条約:北緯50度以南の樺太、旅順・大連(関東州)を得た。'], [1910, '韓国併合:朝鮮を植民地とし、朝鮮総督府を置いた。'], [1914, '第一次世界大戦:ドイツ領の山東半島・南洋諸島を占領した。'], [1920, '旧ドイツ領の南洋諸島を委任統治した。'], [1922, '山東半島の旧ドイツ権益を中国に返した。'], [1932, '満州国の建国(日本が実権をにぎる)。地図は日本の勢力範囲として表示。'], [1937, '日中戦争が始まり、中国の各地を占領した。'], [1941, '太平洋戦争が始まった。'], [1942, '東南アジア・太平洋の島々を占領し、最大の範囲になった(占領地をふくむ)。'], [1945, 'ポツダム宣言を受け入れて降伏。領土は本州・北海道・九州・四国と周辺の島々に。千島列島はソ連が占拠した。'], [1946, '連合国(GHQ)による占領の時代。沖縄・奄美・小笠原はアメリカの統治下に置かれた。'], [1952, 'サンフランシスコ平和条約が発効し、主権を回復した。'], [1953, '奄美群島が返還された。'], [1968, '小笠原諸島が返還された。'], [1972, '沖縄が返還された。北方領土はロシアが占拠を続けている。']];
    var SEV = [[300, '古墳の広がり'], [724, '多賀城'], [802, '胆沢城'], [1100, '奥州藤原氏'], [1192, '鎌倉幕府'], [1429, '琉球王国の成立'], [1609, '薩摩の琉球支配'], [1869, '北海道'], [1879, '沖縄県'], [1895, '台湾'], [1905, '南樺太'], [1910, '韓国併合'], [1932, '満州国'], [1942, '最大の範囲'], [1945, '敗戦'], [1952, '主権の回復'], [1972, '沖縄返還']];
    var SY0 = 1560, SY1 = 1600, hasY = !!SG.yearly;
    var sy = +P.sy >= SY0 && +P.sy <= SY1 ? +P.sy : 1560, seki = !!P.seki, yy = +P.yy >= 250 && +P.yy <= 2024 ? +P.yy : 300, stepN = [1, 10, 100].indexOf(P.jstep) >= 0 ? P.jstep : 10, playT = null;
    // 大名ごとの色:治めた国の多い家から順に、ちがう色を割りあてる(どの年でも同じ家は同じ色)
    var CLP2 = ['#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8', '#4db6ac', '#f06292', '#a1887f', '#7986cb', '#c0ca33', '#ff8a65', '#4dd0e1', '#9ccc65', '#9575cd', '#ffd54f', '#90a4ae', '#d4a373', '#e6a5c8', '#6fbf9f', '#c97b84', '#8fb3e0', '#e0c068', '#b39ddb', '#80cbc4'];
    var CLI = {}; (function () { var cnt = {}; var YS = SG.yearly || SG.years; Object.keys(YS).forEach(function (y) { var Y = YS[y]; Object.keys(Y).forEach(function (pv) { cnt[Y[pv]] = (cnt[Y[pv]] || 0) + 1; }); }); Object.keys(cnt).filter(function (c) { return !/^(東軍|西軍|中立|諸勢力)$/.test(c); }).sort(function (a, b) { return cnt[b] - cnt[a]; }).forEach(function (c, i) { CLI[c] = CLP2[i % CLP2.length]; }); })();
    function clanCol(c) { if (c === '東軍') return '#4f8ed6'; if (c === '西軍') return '#e0665a'; if (c === '中立' || c === '諸勢力') return '#cfcabb'; return CLI[c === '羽柴' ? '豊臣' : c] || CLI[c] || '#cfcabb'; }
    function bar(id, label) { return '<div class="hm-top"><button type="button" class="wm-b" data-jy="-1" aria-label="前へ">‹</button><div class="hm-year jm-year"><b id="' + id + 'Y"></b><small id="' + id + 'C"></small></div><button type="button" class="wm-b" data-jy="1" aria-label="次へ">›</button><button type="button" class="wm-b hm-play jm-play" aria-pressed="false">▶ 再生</button></div>'; }
    body.innerHTML = '<div class="jm-tabs" role="tablist">' + [['kuni', '旧国名'], ['sei', '政権と領土'], ['sen', '戦国大名']].map(function (t) { return '<button type="button" role="tab" data-jmode="' + t[0] + '" aria-selected="' + (mode === t[0]) + '" class="' + (mode === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div class="jm-ctl" id="jmCtl"></div>' +
      '<div class="wm-bar"><input type="search" id="jmQ" placeholder="旧国名で探す(例:武蔵)" aria-label="旧国名で探す" list="jmList"><datalist id="jmList">' + META.map(function (m) { return '<option value="' + h(m[0]) + '">'; }).join('') + '</datalist>' +
      '<button type="button" class="wm-b" data-z="1" aria-label="拡大">＋</button><button type="button" class="wm-b" data-z="-1" aria-label="縮小">−</button><button type="button" class="wm-b" data-z="0" aria-label="全体を表示">全体</button></div>' +
      '<p class="wm-info" id="jmInfo"></p>' +
      '<div class="wm-wrap hm-wrap jm-wrap"><svg class="wm hm jm" role="img" aria-label="日本史の地図"><rect class="wm-sea" x="-20000" y="-20000" width="60000" height="60000"/>' +
      '<g transform="scale(.2)"><path class="jm-other" d="' + T.landW + '"/><path class="jm-terr" d=""/><g class="jm-u"></g><path class="jm-line" d=""/></g><g class="wm-lab jm-lab"></g></svg></div>' +
      '<div class="jm-leg" id="jmLeg"></div>' +
      '<details class="hm-src"><summary>使い方・出典</summary>国を押すと、名前・読み方・今の都道府県(戦国大名では大名)を表示します。「政権と領土」と「戦国大名」は、‹ › や再生で1年ずつ進められます。海外の領土がある年は、地図を自動で縮小します。<br>境界はおおよその目安です。旧国は、今の市区町村をそれぞれの大部分がふくまれる国に割りふって作ったため、国境が実際と少しずれる所があります。市区町村の形:国土地理院「地球地図日本」(jpn-atlas)。近代の領土:Cliopatria(Seshat Global History Databank, CC BY 4.0)。周りの陸地:Natural Earth。政権の範囲・戦国大名の勢力は、教科書の地図を参考にしたおおよその図です。</details>';
    var wrap = body.querySelector('.jm-wrap'), svg = body.querySelector('svg'), gu = svg.querySelector('.jm-u'), lab = svg.querySelector('.jm-lab'), info = body.querySelector('#jmInfo'), ctl = body.querySelector('#jmCtl'), leg = body.querySelector('#jmLeg'), terr = svg.querySelector('.jm-terr'), line = svg.querySelector('.jm-line');
    var paths = JP.units.map(function (u, k) { var p = document.createElementNS(NS, 'path'); p.setAttribute('d', u[5]); p.setAttribute('data-k', k); gu.appendChild(p); return p; });
    var labels = [], W = 1000, H = JP.H, vb = { x: 0, y: 0, w: W, h: H }, ext = null, terrBox = null, unitVal = [];
    function pvOf(k) { return META[JP.units[k][0]][0]; }
    // 塗りと同じ色でふちを描いて、となりの形とのすき間(細い線)を消す
    function paint(p, c) { p.setAttribute('fill', c); p.style.stroke = c; }
    // 色がちがう「となりどうし」の境目だけに線を引く
    function drawLines() { line.setAttribute('d', JP.pairs.filter(function (r) { return unitVal[r[0]] !== unitVal[r[1]]; }).map(function (r) { return r[2]; }).join('')); }
    function makeLabels(list) { lab.textContent = ''; labels = list.map(function (L) { var t = document.createElementNS(NS, 'text'); t.setAttribute('x', L[0]); t.setAttribute('y', L[1]); t.textContent = L[2]; lab.appendChild(t); return [t, L]; }); apply(); }
    function legend(items) { leg.innerHTML = items.map(function (it) { return '<span><i style="background:' + it[0] + '"></i>' + h(it[1]) + '</span>'; }).join(''); }
    function yr(y) { return y + '年'; }
    function stop() { if (playT) { clearInterval(playT); playT = null; } var b = ctl.querySelector('.jm-play'); if (b) { b.textContent = '▶ 再生'; b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); } }
    function play(lo, hi, step, fn) {
      if (playT) return stop();
      var b = ctl.querySelector('.jm-play'); b.textContent = '❚❚ 停止'; b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
      playT = setInterval(function () { if (!document.body.contains(body)) return stop(); var r = fn(step()); if (!r) stop(); }, 700);
    }
    function render() {
      stop(); P.mode = mode; savePref();
      body.querySelectorAll('[data-jmode]').forEach(function (b) { var on = b.getAttribute('data-jmode') === mode; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      paths.forEach(function (p) { p.classList.remove('on'); });
      if (mode === 'kuni') {
        ctl.innerHTML = '<label class="jm-chk"><input type="checkbox" id="jmHide"' + (hide ? ' checked' : '') + '> 国名をかくして覚える(押すと名前が出ます)</label>';
        terr.setAttribute('d', ''); terrBox = null;
        unitVal = JP.units.map(function (u) { return u[0]; });
        paths.forEach(function (p, k) { paint(p, GC[META[JP.units[k][0]][2]] || '#ddd'); });
        drawLines();
        makeLabels(hide ? [] : META.map(function (m, i) { var L = JP.provLab[i]; return L && !/小笠原/.test(m[0]) ? [L[0], L[1], m[0], L[2]] : null; }).filter(Boolean));
        legend(['畿内', '東海道', '東山道', '北陸道', '山陰道', '山陽道', '南海道', '西海道'].map(function (g) { return [GC[g], g]; }));
        info.innerHTML = '';
        bindCtl(); whole(); return;
      }
      if (mode === 'sei') {
        ctl.innerHTML = bar('jmS') + '<div class="hm-range"><input type="range" id="jmR" min="250" max="2024" step="1" aria-label="年を選ぶ"><div class="hm-ticks" aria-hidden="true">' + [[300, '300'], [800, '800'], [1200, '1200'], [1600, '1600'], [2000, '2000']].map(function (t) { return '<span style="left:' + ((t[0] - 250) / (2024 - 250) * 100).toFixed(2) + '%">' + t[1] + '</span>'; }).join('') + '</div></div>' +
          '<div class="hm-ctl"><div class="hm-step" role="group" aria-label="1回で進む年数">' + [1, 10, 100].map(function (n) { return '<button type="button" data-jstep="' + n + '" class="' + (n === stepN ? 'on' : '') + '" aria-pressed="' + (n === stepN) + '">' + n + '年</button>'; }).join('') + '</div><select id="jmEv" aria-label="できごとから選ぶ"><option value="">できごとから選ぶ</option>' + SEV.map(function (e) { return '<option value="' + e[0] + '">' + e[0] + '年 ' + e[1] + '</option>'; }).join('') + '</select></div><p class="jm-note" id="jmNote"></p>';
        bindCtl(); showSei(yy, true); return;
      }
      ctl.innerHTML = bar('jmG') + (hasY ? '<div class="hm-range"><input type="range" id="jmR" min="' + SY0 + '" max="' + SY1 + '" step="1" aria-label="年を選ぶ"><div class="hm-ticks" aria-hidden="true">' + [1560, 1570, 1580, 1590, 1600].map(function (y) { return '<span style="left:' + ((y - SY0) / (SY1 - SY0) * 100).toFixed(2) + '%">' + y + '</span>'; }).join('') + '</div></div>' : '') +
        '<label class="jm-chk"><input type="checkbox" id="jmSeki"' + (seki ? ' checked' : '') + '> 関ヶ原の戦い(1600年)の東軍・西軍で色分けする</label><p class="jm-note" id="jmNote"></p>';
      bindCtl(); showSen(sy);
    }
    function showSei(y, refit) {
      y = Math.max(250, Math.min(2024, y)); yy = y; P.yy = y; savePref();
      var e = ERA.filter(function (x) { return x[0] <= y && y <= x[1]; })[0] || ERA[0], R = ctl.querySelector('#jmR'); if (R) R.value = y;
      ctl.querySelector('#jmSY').textContent = yr(y); ctl.querySelector('#jmSC').textContent = e[2];
      var note = e[3]; if (y >= 1869) { var m = MOD.filter(function (x) { return x[0] <= y; }).pop(); note = m ? m[0] + '年:' + m[1] : ''; }
      ctl.querySelector('#jmNote').textContent = note;
      var used = {};
      unitVal = JP.units.map(function (u, k) { var c = e[4](pvOf(k), u, y); used[c] = 1; return c; });
      paths.forEach(function (p, k) { paint(p, C[unitVal[k]][0]); });
      drawLines(); makeLabels([]);
      // 近代の領土(台湾・朝鮮など)は、その年の形を重ねる
      var tr = null; if (y >= 1868) { var yq = y >= 1946 && y <= 1952 ? 1953 : y; tr = T.rows.filter(function (r) { return r[0] <= yq && yq <= r[1]; })[0] || null; }
      terr.setAttribute('d', tr ? tr[3] : ''); if (tr) used.core = 1;
      legend(Object.keys(C).filter(function (c) { return used[c]; }).map(function (c) { return C[c]; }));
      info.innerHTML = '';
      // 海外の領土がある年だけ縮小して全体を見せる
      var box = tr ? tr[2] : null, wide = box && (box[0] < -20 || box[1] < -20 || box[2] > W + 20 || box[3] > H + 20);
      var key = wide ? box.join(',') : 'jp';
      if (refit || key !== terrBox) { terrBox = key; if (wide) { ext = [Math.min(0, box[0]) - 40, Math.min(0, box[1]) - 40, Math.max(W, box[2]) + 40, Math.max(H, box[3]) + 40]; fitBox([box[0] - 30, box[1] - 30, box[2] - box[0] + 60, box[3] - box[1] + 60]); } else { ext = null; whole(); } }
      return y < 2024;
    }
    function senState(y) {
      if (seki && y === 1600) return { Y: SG.years['1600'], SP: (SG.split || {})['1600'] || {} };
      if (hasY) return { Y: SG.yearly[y], SP: (SG.splitYearly || {})[y] || {} };
      var ks = Object.keys(SG.years).map(Number).filter(function (k) { return k <= y && k < 1600; }); var k = ks.length ? Math.max.apply(null, ks) : 1560; return { Y: SG.years[k], SP: (SG.split || {})[k] || {} };
    }
    function showSen(y) {
      y = Math.max(SY0, Math.min(SY1, y)); if (!hasY) { var ks = Object.keys(SG.years).map(Number); y = ks.reduce(function (a, b) { return Math.abs(b - y) < Math.abs(a - y) ? b : a; }); }
      if (seki) y = 1600;
      sy = y; P.sy = y; savePref(); var R = ctl.querySelector('#jmR'); if (R) R.value = y;
      ctl.querySelector('#jmGY').textContent = yr(y); ctl.querySelector('#jmGC').textContent = seki ? '関ヶ原の戦い(東軍・西軍)' : '戦国大名の勢力';
      ctl.querySelector('#jmNote').textContent = seki ? ((SG.notes || {})['1600'] || '') : (((SG.notesYearly || {})[y]) || (SG.notes || {})[y] || '');
      var S = senState(y), owners = {};
      terr.setAttribute('d', ''); ext = null;
      unitVal = JP.units.map(function (u, k) {
        var pv = pvOf(k), c = S.Y[pv];
        if (S.SP[pv] && u[1]) { var la = parseFloat(u[1]) + 0.125; S.SP[pv].forEach(function (b) { if (la >= b[1] && la <= b[2]) c = b[0]; }); }
        return c || '';
      });
      paths.forEach(function (p, k) {
        var c = unitVal[k], u = JP.units[k];
        if (!c) { paint(p, '#e3e0d6'); p.removeAttribute('data-c'); return; }
        paint(p, clanCol(c)); p.setAttribute('data-c', c);
        if (!owners[c] || u[4] > owners[c][3]) owners[c] = [u[2], u[3], c, u[4]];
      });
      drawLines();
      makeLabels(Object.keys(owners).map(function (c) { return owners[c]; }));
      legend(Object.keys(owners).sort(function (a, b) { return owners[b][3] - owners[a][3]; }).map(function (c) { return [clanCol(c), c]; }));
      info.innerHTML = '';
      if (terrBox !== 'jp') { terrBox = 'jp'; whole(); }
      return y < SY1 && !seki;
    }
    function bindCtl() {
      var hc = ctl.querySelector('#jmHide'); if (hc) hc.addEventListener('change', function () { hide = hc.checked; P.hide = hide ? 1 : 0; savePref(); render(); });
      var sk = ctl.querySelector('#jmSeki'); if (sk) sk.addEventListener('change', function () { seki = sk.checked; P.seki = seki ? 1 : 0; savePref(); stop(); showSen(seki ? 1600 : sy); });
      var R = ctl.querySelector('#jmR'); if (R) R.addEventListener('input', function () { stop(); if (mode === 'sei') showSei(+R.value); else { if (seki) { seki = false; P.seki = 0; ctl.querySelector('#jmSeki').checked = false; } showSen(+R.value); } });
      ctl.querySelectorAll('[data-jy]').forEach(function (b) { b.addEventListener('click', function () { stop(); var d = +b.getAttribute('data-jy'); if (mode === 'sei') showSei(yy + d * stepN); else { if (seki) { seki = false; P.seki = 0; ctl.querySelector('#jmSeki').checked = false; } showSen(hasY ? sy + d : nextSnap(sy, d)); } }); });
      var pb = ctl.querySelector('.jm-play'); if (pb) pb.addEventListener('click', function () {
        if (mode === 'sei') { if (yy >= 2024) showSei(250); play(0, 0, function () { return yy + stepN; }, function (v) { return showSei(v); }); }
        else { if (seki) { seki = false; P.seki = 0; ctl.querySelector('#jmSeki').checked = false; } if (sy >= SY1) showSen(SY0); play(0, 0, function () { return hasY ? sy + 1 : nextSnap(sy, 1); }, function (v) { return showSen(v); }); }
      });
      ctl.querySelectorAll('[data-jstep]').forEach(function (b) { b.addEventListener('click', function () { stepN = +b.getAttribute('data-jstep'); P.jstep = stepN; savePref(); ctl.querySelectorAll('[data-jstep]').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); }); }); });
      var ev = ctl.querySelector('#jmEv'); if (ev) ev.addEventListener('change', function () { var v = +ev.value; if (v) { stop(); showSei(v); } ev.value = ''; });
    }
    function nextSnap(y, d) { var ks = Object.keys(SG.years).map(Number).filter(function (k) { return k < 1600 || d > 0; }).sort(function (a, b) { return a - b; }); var i = ks.indexOf(y); return ks[Math.max(0, Math.min(ks.length - 1, i + d))]; }
    function showProv(k, zoom) {
      var mi = JP.units[k][0], m = META[mi];
      paths.forEach(function (p, j) { p.classList.toggle('on', JP.units[j][0] === mi); });
      var extra = '';
      if (mode === 'sen') {
        var c = paths[k].getAttribute('data-c'), cl = (SG.clans || {})[c], ps = ((SG.persons || {})[sy] || {})[c], n16 = seki ? (SG.notes1600 || {})[m[0]] : '';
        extra = c ? ' <span class="jm-clan" style="background:' + clanCol(c) + '">' + h(c) + '</span>' + (n16 ? ' ' + h(n16) : (ps || (cl && cl.full)) ? ' ' + h(ps || cl.full) : '') : '';
      } else if (mode === 'sei') { extra = ' <span class="jm-clan" style="background:' + C[unitVal[k]][0] + '">' + h(C[unitVal[k]][1]) + '</span>'; }
      info.innerHTML = '<b>' + h(m[0]) + '</b>(' + h(m[1]) + ')' + (/道|畿内/.test(m[2]) ? ' <span class="small">' + h(m[2]) + '</span>' : '') + ' <span class="small muted">今の' + h(m[3]) + '</span>' + extra;
      if (zoom) { var bb = paths[k].getBBox(); fitBox([bb.x / 5, bb.y / 5, bb.width / 5, bb.height / 5], 3); }
    }
    function ar() { var w = wrap.clientWidth, hh = wrap.clientHeight; return w && hh ? hh / w : H / W; }
    function bounds() { return ext || [0, 0, W, H]; }
    function clamp() { var B = bounds(), bw = B[2] - B[0], bh = B[3] - B[1]; vb.w = Math.min(Math.max(bw, bh / ar()), Math.max(W / 30, vb.w)); vb.h = vb.w * ar(); var mx = Math.max(0, (vb.w - bw) / 2), my = Math.max(0, (vb.h - bh) / 2); vb.x = Math.min(B[2] - vb.w + mx, Math.max(B[0] - mx, vb.x)); vb.y = Math.min(B[3] - vb.h + my, Math.max(B[1] - my, vb.y)); }
    function apply() {
      svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h);
      var k = W / vb.w, scr = svg.clientWidth ? svg.clientWidth / W : 1, fs = 11 / (k * scr);
      labels.forEach(function (L) { var side = Math.sqrt(L[1][3]) * k * scr, on = side > 11 * L[1][2].length * (mode === 'kuni' ? 0.85 : 0.5) || k >= 8; L[0].style.display = on ? '' : 'none'; if (on) L[0].setAttribute('font-size', fs.toFixed(2)); });
    }
    function fitBox(F, mul) { var a = ar(); mul = mul || 1; var w = Math.max(F[2], F[3] / a) * mul; vb.w = Math.max(w, W / 30); vb.h = vb.w * a; vb.x = F[0] + F[2] / 2 - vb.w / 2; vb.y = F[1] + F[3] / 2 - vb.h / 2; clamp(); apply(); }
    var mainBox = null;
    function whole() {
      if (!mainBox) { var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; paths.forEach(function (p, k) { if (/琉球|奄美|小笠原/.test(pvOf(k))) return; var b = p.getBBox(); if (!b.width) return; x0 = Math.min(x0, b.x / 5); y0 = Math.min(y0, b.y / 5); x1 = Math.max(x1, (b.x + b.width) / 5); y1 = Math.max(y1, (b.y + b.height) / 5); }); if (x1 > x0) mainBox = [x0 - 15, y0 - 15, x1 - x0 + 30, y1 - y0 + 30]; }
      if (ext) { fitBox([ext[0], ext[1], ext[2] - ext[0], ext[3] - ext[1]]); return; }
      fitBox(mainBox || [230, 0, 770, H]);
    }
    function zoomAt(f, cx, cy) { var nw = vb.w / f; vb.x = cx - (cx - vb.x) * nw / vb.w; vb.y = cy - (cy - vb.y) * nw / vb.w; vb.w = nw; clamp(); apply(); }
    function toSvg(ev) { var r = svg.getBoundingClientRect(); return [vb.x + (ev.clientX - r.left) / r.width * vb.w, vb.y + (ev.clientY - r.top) / r.height * vb.h]; }
    st.fit = function () { setTimeout(whole, 30); };
    body.querySelector('.jm-tabs').addEventListener('click', function (ev) { var b = ev.target.closest('[data-jmode]'); if (b) { mode = b.getAttribute('data-jmode'); terrBox = null; render(); } });
    body.querySelector('.wm-bar').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-z]'); if (!b) return;
      var z = +b.getAttribute('data-z'); if (z === 0) { whole(); return; }
      zoomAt(z > 0 ? 1.6 : 1 / 1.6, vb.x + vb.w / 2, vb.y + vb.h / 2);
    });
    body.querySelector('#jmQ').addEventListener('change', function (ev) {
      var q = ev.target.value.trim(); if (!q) return;
      var mi = META.findIndex(function (m) { return m[0] === q || m[1] === q; }); if (mi < 0) mi = META.findIndex(function (m) { return m[0].indexOf(q) >= 0 || m[1].indexOf(q) >= 0 || m[3].indexOf(q) >= 0; });
      var best = -1, ba = -1; JP.units.forEach(function (u, k) { if (u[0] === mi && u[4] > ba) { ba = u[4]; best = k; } });
      if (best >= 0) showProv(best, true); else info.textContent = '「' + q + '」は見つかりませんでした。';
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
        var el = document.elementFromPoint(ev.clientX, ev.clientY), k = el && el.getAttribute && el.getAttribute('data-k');
        if (k !== null && k !== undefined) showProv(+k);
      }
    }
    svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    render();
    if (window.ResizeObserver) new ResizeObserver(function () { if (!st.min) { clamp(); apply(); } }).observe(wrap);
  }

  /* ---------- 世界史の地図(前3400年〜2024年の領土の変遷。1年ごとに見られる) ---------- */
  function hmap(body, st) {
    var M = WPS.HISTMAP, NS = 'http://www.w3.org/2000/svg', P = pref('hmap');
    var Y0 = -3400, Y1 = 2024;
    var EV = [[-3000, 'エジプト古王国のころ'], [-1300, 'ヒッタイト・新王国'], [-500, 'アケメネス朝の最大領域'], [-323, 'アレクサンドロス大王の死'], [-221, '秦の中国統一'], [-27, 'ローマ帝政の始まり'], [1, '紀元1年'], [117, 'ローマ帝国の最大領域'], [395, 'ローマ帝国の東西分裂'], [618, '唐の成立'], [750, 'アッバース朝の成立'], [1096, '第1回十字軍'], [1206, 'チンギス・ハンの即位'], [1279, '元が南宋をほろぼす'], [1453, 'ビザンツ帝国の滅亡'], [1492, 'コロンブスの到達'], [1648, 'ウェストファリア条約'], [1815, 'ウィーン会議'], [1914, '第一次世界大戦'], [1939, '第二次世界大戦'], [1991, 'ソ連の解体']];
    var year = typeof P.y === 'number' && P.y >= Y0 && P.y <= Y1 && P.y !== 0 ? P.y : 1, stepN = [1, 10, 100].indexOf(P.step) >= 0 ? P.step : 10;
    var selName = typeof P.sel === 'string' ? P.sel : '', labOn = P.lab !== 0;
    function nm(i) { return M.ja[i] ? M.ja[i].replace(/\*$/, '') : M.n[i]; }
    function yr(y) { return y < 0 ? '前' + (-y) + '年' : y + '年'; }
    function phase(y) {
      var a = Math.abs(y), c = Math.ceil(a / 100) || 1, pos = y < 0 ? (c * 100 - a) / 99 : (a - (c - 1) * 100 - 1) / 99;
      return (y < 0 ? '前' : '') + c + '世紀' + (pos < 0.2 ? 'のはじめ' : pos < 0.4 ? 'の前半' : pos < 0.6 ? 'の半ば' : pos < 0.8 ? 'の後半' : 'の終わり');
    }
    var PAL = ['#e8a3a3', '#a3c4e8', '#b5dba0', '#f0cf8a', '#c9b0e3', '#95d4cc', '#f2b48c', '#c2c98c', '#e7aecf', '#9fb7d9', '#d9c19f', '#a8d8b0', '#e0a98f', '#b7b0dc'];
    function col(i) { var s = M.n[i], x = 7; for (var k = 0; k < s.length; k++) x = (x * 31 + s.charCodeAt(k)) % 100003; return PAL[x % PAL.length]; }
    function pct(v) { return ((v - Y0) / (Y1 - Y0) * 100).toFixed(2); }
    var ticks = [[-3000, '前3000'], [-2000, '前2000'], [-1000, '前1000'], [1, '1'], [1000, '1000'], [2000, '2000']].map(function (t) { return '<span style="left:' + pct(t[0]) + '%">' + t[1] + '</span>'; }).join('');
    body.innerHTML = '<div class="hm-top"><button type="button" class="wm-b" data-hy="-1" aria-label="前へ">‹</button><button type="button" class="hm-year" id="hmYb" aria-label="年を入力する"><b id="hmY"></b><small id="hmC"></small></button><button type="button" class="wm-b" data-hy="1" aria-label="次へ">›</button><button type="button" class="wm-b hm-play" aria-pressed="false">▶ 再生</button></div>' +
      '<form class="hm-jump" id="hmJump" hidden><select id="hmEra" aria-label="紀元前か紀元後か"><option value="-1">紀元前</option><option value="1">西暦</option></select><input type="number" id="hmYin" min="1" max="3400" inputmode="numeric" aria-label="年"><span>年</span><button type="submit" class="wm-b">移動</button></form>' +
      '<div class="hm-range"><input type="range" id="hmR" min="' + Y0 + '" max="' + Y1 + '" step="1" aria-label="年を選ぶ"><div class="hm-ticks" aria-hidden="true">' + ticks + '</div></div>' +
      '<div class="hm-ctl"><div class="hm-step" role="group" aria-label="1回で進む年数">' + [1, 10, 100].map(function (n) { return '<button type="button" data-hstep="' + n + '" class="' + (n === stepN ? 'on' : '') + '" aria-pressed="' + (n === stepN) + '">' + n + '年</button>'; }).join('') + '</div>' +
      '<select id="hmEv" aria-label="できごとから選ぶ"><option value="">できごとから選ぶ</option>' + EV.map(function (e) { return '<option value="' + e[0] + '">' + yr(e[0]) + ' ' + e[1] + '</option>'; }).join('') + '</select></div>' +
      '<div class="wm-bar"><input type="search" id="hmQ" placeholder="国名で探す(例:ローマ帝国)" aria-label="この年の国を名前で探す" list="hmList"><datalist id="hmList"></datalist>' +
      '<button type="button" class="wm-b hm-labb' + (labOn ? ' on' : '') + '" aria-pressed="' + labOn + '">国名</button><button type="button" class="wm-b" data-z="1" aria-label="拡大">＋</button><button type="button" class="wm-b" data-z="-1" aria-label="縮小">−</button><button type="button" class="wm-b" data-z="0" aria-label="全体を表示">全体</button></div>' +
      '<p class="wm-info" id="hmInfo"></p>' +
      '<div class="wm-wrap hm-wrap"><svg class="wm hm" viewBox="0 0 1000 520" role="img" aria-label="世界史の地図"><path class="wm-sea" d="' + M.sphere + '"/><path class="wm-grat" d="' + M.grat + '"/><g transform="scale(.2)"><path class="hm-land" d="' + M.land + '"/><g class="hm-pol"></g></g><g class="wm-lab hm-lab"></g></svg><p class="hm-load" hidden>読み込み中…</p><p class="hm-empty" hidden>この年の地図には、国のデータがありません</p></div>' +
      '<details class="hm-src"><summary>出典・注意</summary>国境はおおよその目安です。古い時代ほど、データのある国が少なくなります。同じ国は、どの年でも同じ色で表示します。' + h(M.src) + '。日本語名の「*」は、教科書に決まった呼び方がない国の仮の読みです。</details>';
    var wrap = body.querySelector('.hm-wrap'), svg = body.querySelector('svg'), pol = svg.querySelector('.hm-pol'), lab = svg.querySelector('.hm-lab'), info = body.querySelector('#hmInfo'), rng = body.querySelector('#hmR'), ld = body.querySelector('.hm-load'), emp = body.querySelector('.hm-empty');
    var rows = [], paths = [], labels = [], sig = '', W = 1000, H = 520, vb = { x: 0, y: 0, w: W, h: H }, playT = null, loading = {};
    function chunkOf(y) { for (var i = M.starts.length - 1; i >= 0; i--) if (M.starts[i] <= y) return M.starts[i]; return M.starts[0]; }
    function loadChunk(c, cb) {
      WPS.HISTMAP_C = WPS.HISTMAP_C || {};
      if (WPS.HISTMAP_C[c]) return cb && cb();
      if (loading[c]) { if (cb) loading[c].push(cb); return; }
      loading[c] = cb ? [cb] : [];
      var s = document.createElement('script'); s.src = 'js/data/histmap/c' + c + '.js?v=' + VER;
      s.onload = function () { var q = loading[c]; delete loading[c]; q.forEach(function (f) { f(); }); };
      s.onerror = function () { delete loading[c]; ld.hidden = true; info.textContent = '地図を読み込めませんでした。通信状態を確かめてください。'; stop(); };
      document.head.appendChild(s);
    }
    function show(y) {
      y = Math.max(Y0, Math.min(Y1, Math.round(y))); if (y === 0) y = year < 0 ? 1 : -1;
      year = y; P.y = y; savePref(); rng.value = y;
      body.querySelector('#hmY').textContent = yr(y); body.querySelector('#hmC').textContent = phase(y);
      var c = chunkOf(y);
      if (!(WPS.HISTMAP_C && WPS.HISTMAP_C[c])) ld.hidden = false;
      loadChunk(c, function () {
        if (year !== y) return; ld.hidden = true;
        var all = WPS.HISTMAP_C[c], R = [], ks = [];
        all.forEach(function (r, k) { if (r[1] <= y && r[2] >= y) { R.push(r); ks.push(k); } });
        var ns = c + ':' + ks.join(','); if (ns !== sig) { sig = ns; rows = R; draw(); }
        // 先の時代を前もって読みこんでおく(再生がとぎれないように)
        var i = M.starts.indexOf(c); if (i >= 0 && i + 1 < M.starts.length) loadChunk(M.starts[i + 1]);
      });
    }
    function draw() {
      pol.textContent = ''; lab.textContent = ''; paths = []; labels = [];
      rows.forEach(function (r, k) {
        var p = document.createElementNS(NS, 'path'); p.setAttribute('d', r[7]); p.setAttribute('data-k', k); p.setAttribute('fill', col(r[0])); pol.appendChild(p); paths.push(p);
        var t = document.createElementNS(NS, 'text'); t.setAttribute('x', r[4]); t.setAttribute('y', r[5]); t.textContent = nm(r[0]); lab.appendChild(t); labels.push([t, r]);
      });
      emp.hidden = !!rows.length;
      body.querySelector('#hmList').innerHTML = rows.map(function (r) { return '<option value="' + h(nm(r[0])) + '">'; }).join('');
      mark(); apply();
    }
    // 選んだ国を、どの年でも目立たせる(領土の変化を追える)
    function mark() {
      var hit = -1;
      paths.forEach(function (p, k) { var on = !!selName && nm(rows[k][0]) === selName; p.classList.toggle('on', on); if (on && hit < 0) hit = k; });
      svg.classList.toggle('hm-sel', !!selName);
      if (!selName) { info.innerHTML = '国を押すと名前と年代を表示し、年を変えても色をつけたまま追いかけます。'; return; }
      var r = rows[hit];
      info.innerHTML = '<b>' + h(selName) + '</b>' + (r && M.ja[r[0]] ? ' <span class="muted small">' + h(M.n[r[0]]) + '</span>' : '') +
        (r ? ' <span class="small">この形:' + yr(r[1]) + '〜' + yr(r[2]) + '・面積 約' + area(r[3]) + '</span>' : ' <span class="small hm-none">この年の地図にはありません</span>') +
        ' <button type="button" class="hm-clear">選択を解除</button>';
    }
    function area(k) { return k >= 10 ? Math.round(k / 10) + '万km²' : (k * 1000).toLocaleString() + 'km²'; }
    function ar() { var w = wrap.clientWidth, hh = wrap.clientHeight; return w && hh ? hh / w : H / W; }
    function maxW() { return Math.min(W, H / ar()); }
    function clamp() { vb.w = Math.min(maxW(), Math.max(W / 40, vb.w)); vb.h = vb.w * ar(); vb.x = Math.min(W - vb.w, Math.max(0, vb.x)); vb.y = Math.min(H - vb.h, Math.max(0, vb.y)); }
    function apply() {
      svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h);
      var k = W / vb.w, scr = svg.clientWidth ? svg.clientWidth / W : 1, fs = 11 / (k * scr);
      labels.forEach(function (L) {
        var r = L[1], len = L[0].textContent.length, side = Math.sqrt(r[6]) * k * scr, on = labOn && (side > 11 * len * 0.55 || (k >= 10 && side > 14) || nm(r[0]) === selName);
        L[0].style.display = on ? '' : 'none'; if (on) L[0].setAttribute('font-size', fs.toFixed(2));
      });
    }
    function whole() { vb.w = maxW(); vb.h = vb.w * ar(); vb.x = 560 - vb.w * 0.5; vb.y = (H - vb.h) / 2 - 40; clamp(); apply(); } // ユーラシア中心
    function zoomAt(f, cx, cy) { var nw = vb.w / f; vb.x = cx - (cx - vb.x) * nw / vb.w; vb.y = cy - (cy - vb.y) * nw / vb.w; vb.w = nw; clamp(); apply(); }
    function toSvg(ev) { var r = svg.getBoundingClientRect(); return [vb.x + (ev.clientX - r.left) / r.width * vb.w, vb.y + (ev.clientY - r.top) / r.height * vb.h]; }
    function stop() { if (playT) { clearInterval(playT); playT = null; } var b = body.querySelector('.hm-play'); b.textContent = '▶ 再生'; b.setAttribute('aria-pressed', 'false'); b.classList.remove('on'); }
    function play() {
      if (playT) return stop();
      if (year >= Y1) show(Y0);
      var b = body.querySelector('.hm-play'); b.textContent = '❚❚ 停止'; b.setAttribute('aria-pressed', 'true'); b.classList.add('on');
      playT = setInterval(function () { if (!document.body.contains(body)) return stop(); if (year >= Y1) return stop(); if (!ld.hidden) return; show(year + stepN); }, stepN === 1 ? 220 : stepN === 10 ? 500 : 1100);
    }
    st.fit = function () { setTimeout(whole, 30); };
    body.querySelector('.hm-top').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-hy]'); if (b) { stop(); show(year + stepN * +b.getAttribute('data-hy')); return; }
      if (ev.target.closest('.hm-play')) return play();
      if (ev.target.closest('#hmYb')) { var f = body.querySelector('#hmJump'); f.hidden = !f.hidden; if (!f.hidden) { body.querySelector('#hmEra').value = year < 0 ? '-1' : '1'; var yi = body.querySelector('#hmYin'); yi.value = Math.abs(year); yi.focus(); yi.select(); } }
    });
    body.querySelector('#hmJump').addEventListener('submit', function (ev) {
      ev.preventDefault(); var v = parseInt(body.querySelector('#hmYin').value, 10); if (!v) return;
      stop(); show(v * +body.querySelector('#hmEra').value); this.hidden = true;
    });
    rng.addEventListener('input', function () { stop(); show(+rng.value); });
    body.querySelector('.hm-step').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-hstep]'); if (!b) return;
      stepN = +b.getAttribute('data-hstep'); P.step = stepN; savePref();
      body.querySelectorAll('[data-hstep]').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
      if (playT) { stop(); play(); }
    });
    body.querySelector('#hmEv').addEventListener('change', function (ev) { var v = +ev.target.value; if (v) { stop(); show(v); } ev.target.value = ''; });
    body.querySelector('.wm-bar').addEventListener('click', function (ev) {
      if (ev.target.closest('.hm-labb')) { labOn = !labOn; P.lab = labOn ? 1 : 0; savePref(); var lb = ev.target.closest('.hm-labb'); lb.classList.toggle('on', labOn); lb.setAttribute('aria-pressed', labOn); apply(); return; }
      var b = ev.target.closest('[data-z]'); if (!b) return;
      var z = +b.getAttribute('data-z'); if (z === 0) { whole(); return; }
      zoomAt(z > 0 ? 1.6 : 1 / 1.6, vb.x + vb.w / 2, vb.y + vb.h / 2);
    });
    function unsel() { selName = ''; delete P.sel; savePref(); mark(); apply(); }
    info.addEventListener('click', function (ev) { if (ev.target.closest('.hm-clear')) unsel(); });
    function select(k, zoom) {
      selName = nm(rows[k][0]); P.sel = selName; savePref(); mark(); apply();
      if (zoom) { var bb = paths[k].getBBox(), bx = bb.x / 5, by = bb.y / 5, bw = bb.width / 5, bh = bb.height / 5, w = Math.max(bw, bh / ar()) * 1.8; vb.w = Math.max(w, W / 40); vb.h = vb.w * ar(); vb.x = bx + bw / 2 - vb.w / 2; vb.y = by + bh / 2 - vb.h / 2; clamp(); apply(); }
    }
    body.querySelector('#hmQ').addEventListener('change', function (ev) {
      var q = ev.target.value.trim(); if (!q) return;
      var k = rows.findIndex(function (r) { return nm(r[0]) === q; });
      if (k < 0) k = rows.findIndex(function (r) { return nm(r[0]).indexOf(q) >= 0 || M.n[r[0]].toLowerCase().indexOf(q.toLowerCase()) >= 0; });
      if (k >= 0) select(k, true); else info.textContent = '「' + q + '」は、この年の地図にはありません。';
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
        var el = document.elementFromPoint(ev.clientX, ev.clientY), k = el && el.getAttribute && el.getAttribute('data-k');
        if (k !== null && k !== undefined) select(+k); else if (selName) unsel();
      }
    }
    svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    // キーボード:← → で前後、スペースで再生
    body.addEventListener('keydown', function (ev) {
      if (/INPUT|SELECT|TEXTAREA/.test(ev.target.tagName)) return;
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') { ev.preventDefault(); stop(); show(year + stepN * (ev.key === 'ArrowRight' ? 1 : -1)); }
    });
    whole(); show(year);
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
  // 科目別テストの最中(body.no-tools)は、資料を開けない
  function locked() { return document.body.classList.contains('no-tools'); }
  function closeAll() { Object.keys(open).forEach(function (k) { close(k); }); var m = document.getElementById('tlMenu'); if (m) m.remove(); }
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (locked() && t.closest && t.closest('.tb-tools, [data-tlopen], [data-tlrestore]')) { ev.preventDefault(); ev.stopPropagation(); if (WPS.appToast) WPS.appToast('テスト中は資料を開けません'); return; }
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
  // 指定した年・モードで地図を開く(教科書・問題の「地図で見る」ボタンから使う)
  function openAt(kind, o) {
    var P = pref(kind); o = o || {};
    if (kind === 'hmap' && typeof o.y === 'number') { P.y = o.y; delete P.sel; }
    if (kind === 'jmap') { if (o.mode) P.mode = o.mode; if (o.yy) P.yy = o.yy; if (o.sy) { P.sy = o.sy; P.seki = 0; } }
    savePref(); if (open[kind]) close(kind); openTool(kind);
  }
  // 年から、開く地図を決める(日本:250年以降。1560〜1600年は戦国大名)
  function mapFor(y, where) {
    if (where === 'jp') { if (y >= 1560 && y <= 1600) return ['jmap', { mode: 'sen', sy: y }, '戦国大名の地図']; if (y >= 250 && y <= 2024) return ['jmap', { mode: 'sei', yy: y }, '日本の地図']; return null; }
    if (y >= -3400 && y <= 2024 && y !== 0) return ['hmap', { y: y }, '世界の地図'];
    return null;
  }
  function yLabel(y) { return y < 0 ? '前' + (-y) + '年' : y + '年'; }
  // 文から最初の年を取り出す(「前221年」「1192年」など。「〜年間」「〜年生」は除く)
  function findYear(t) {
    var m = String(t || '').match(/(紀元前|前)?\s?(\d{1,4})\s?年(?!間|生|目|後|前|ぶり|以上|以内|ごと)/);
    if (!m) return null; var y = +m[2]; if (!y) return null; return m[1] ? -y : y;
  }
  // 単元が日本史・世界史のどちらか(歴史総合・中学歴史は両方)
  var UNIT_HIST = null;
  function histOf(uid) {
    if (!UNIT_HIST) { UNIT_HIST = {}; var K = { soc_wh: 'w', soc_jh: 'j', soc_hsogo: 'b', soc_jhis: 'b' }; (WPS.CURRICULUM || []).forEach(function (g) { (g.courses || []).forEach(function (c) { var k = K[c.id]; if (!k) return; var add = function (id) { UNIT_HIST[id] = UNIT_HIST[id] && UNIT_HIST[id] !== k ? 'b' : k; }; (c.units || []).forEach(add); (c.areas || []).forEach(function (a) { (a.units || []).forEach(add); }); }); }); }
    return UNIT_HIST[uid] || null;
  }
  // 「地図で見る」ボタンのHTML。where: 'w'(世界)・'j'(日本)・'b'(両方)
  function mapLinks(y, where) {
    if (y === null || y === undefined || !where) return '';
    var list = [];
    if (where === 'j' || where === 'b') { var a = mapFor(y, 'jp'); if (a) list.push(a); }
    if (where === 'w' || where === 'b') { var b = mapFor(y, 'w'); if (b) list.push(b); }
    return list.length ? '<span class="map-links">' + list.map(function (m) { return '<button type="button" class="map-link" data-mapk="' + m[0] + '" data-mapo="' + h(JSON.stringify(m[1])) + '">🗺️ ' + yLabel(y) + 'の' + m[2] + '</button>'; }).join('') + '</span>' : '';
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-mapk]'); if (!b) return;
    ev.preventDefault(); ev.stopPropagation();
    if (locked()) { if (WPS.appToast) WPS.appToast('テスト中は資料を開けません'); return; }
    var o = {}; try { o = JSON.parse(b.getAttribute('data-mapo') || '{}'); } catch (e) { }
    openAt(b.getAttribute('data-mapk'), o);
  });
  WPS.Tools = { open: openTool, openAt: openAt, minimize: minimize, restore: restore, close: close, closeAll: closeAll, findYear: findYear, histOf: histOf, mapLinks: mapLinks };
})();
