/*
 * 資料パネル(元素の周期表・世界地図)
 * ・どのページの上にも開ける。ページを移動しても閉じない。
 * ・「最小化」で画面の下の小さなボタンになり、押すと元に戻る。
 * ・データはパネルを初めて開いたときに読み込む。
 */
(function () {
  window.WPS = window.WPS || {};
  var VER = '20261106a';
  var KINDS = {
    ptable: { title: '元素の周期表', file: 'elements', ready: function () { return !!WPS.ELEMENTS; } },
    map: { title: '世界地図', file: 'worldmap', ready: function () { return !!WPS.WORLDMAP; } }
  };
  var open = {}; // kind -> { el, min }
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function save() { try { var o = {}; Object.keys(open).forEach(function (k) { o[k] = open[k].min ? 1 : 0; }); sessionStorage.setItem('wpsTools', JSON.stringify(o)); } catch (e) { } }
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
      return '<button type="button" class="tl-pill" data-tlrestore="' + k + '" aria-label="' + KINDS[k].title + 'を開く">' + (k === 'map' ? '🌏' : '⚗️') + ' ' + KINDS[k].title + '<span data-tlclose="' + k + '" role="button" aria-label="閉じる">×</span></button>';
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
    el.innerHTML = '<header class="tl-hd"><b>' + (kind === 'map' ? '🌏 ' : '⚗️ ') + KINDS[kind].title + '</b>' +
      '<button type="button" class="tl-big" aria-label="大きさを切りかえる" title="大きさを切りかえる">⤢</button>' +
      '<button type="button" class="tl-min" aria-label="最小化" title="最小化(下に小さくしまう)">—</button>' +
      '<button type="button" class="tl-x" aria-label="閉じる" title="閉じる">×</button></header><div class="tl-body"><p class="muted center" style="padding:24px">読み込み中…</p></div>';
    document.body.appendChild(el);
    open[kind] = { el: el, min: false };
    el.querySelector('.tl-min').onclick = function () { minimize(kind); };
    el.querySelector('.tl-x').onclick = function () { close(kind); };
    el.querySelector('.tl-big').onclick = function () { el.classList.toggle('tall'); if (open[kind].fit) open[kind].fit(); };
    if (startMin) { open[kind].min = true; el.hidden = true; } else Object.keys(open).forEach(function (k) { if (k !== kind && !open[k].min) minimize(k); });
    dock(); save();
    load(kind, function (err) {
      var body = el.querySelector('.tl-body');
      if (err) { body.innerHTML = '<p class="muted center" style="padding:24px">読み込めませんでした。通信状態を確かめて、もう一度開いてください。</p>'; return; }
      if (kind === 'ptable') ptable(body); else map(body, open[kind]);
    });
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
      '<button type="button" class="wm-b" data-z="1" aria-label="拡大">＋</button><button type="button" class="wm-b" data-z="-1" aria-label="縮小">−</button><button type="button" class="wm-b" data-z="0" aria-label="全体を表示">全体</button></div>' +
      '<p class="wm-info" id="wmInfo">国を押すと名前を表示します。指でつまむ・ホイールで拡大、ドラッグで移動。</p>' +
      '<div class="wm-wrap"><svg class="wm" viewBox="0 0 ' + M.w + ' ' + M.h + '" role="img" aria-label="世界地図(日本中心)"><path class="wm-sea" d="' + M.sphere + '"/><path class="wm-grat" d="' + M.grat + '"/><g class="wm-land"></g><g class="wm-lab"></g></svg></div>';
    var wrap = body.querySelector('.wm-wrap'), svg = body.querySelector('svg'), land = svg.querySelector('.wm-land'), lab = svg.querySelector('.wm-lab'), info = body.querySelector('#wmInfo');
    var paths = [], labels = [];
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
    body.querySelector('.wm-bar').addEventListener('click', function (ev) {
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
    m.innerHTML = '<button type="button" role="menuitem" data-tlopen="ptable">⚗️ 元素の周期表</button><button type="button" role="menuitem" data-tlopen="map">🌏 世界地図</button>';
    document.body.appendChild(m);
    var r = btn.getBoundingClientRect();
    m.style.top = (r.bottom + 6) + 'px'; m.style.right = Math.max(8, innerWidth - r.right) + 'px';
    setTimeout(function () { document.addEventListener('click', function off(ev) { if (!m.contains(ev.target)) { m.remove(); document.removeEventListener('click', off); } }); }, 0);
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var c = t.closest && t.closest('[data-tlclose]'); if (c) { ev.stopPropagation(); close(c.getAttribute('data-tlclose')); return; }
    var r = t.closest && t.closest('[data-tlrestore]'); if (r) { restore(r.getAttribute('data-tlrestore')); return; }
    var o = t.closest && t.closest('[data-tlopen]'); if (o) { var m = document.getElementById('tlMenu'); if (m) m.remove(); openTool(o.getAttribute('data-tlopen')); return; }
    var b = t.closest && t.closest('.tb-tools'); if (b) { ev.preventDefault(); menu(b); }
  });
  // 前に開いていたパネルを、ページを読み直したあとも戻す
  try { var saved = JSON.parse(sessionStorage.getItem('wpsTools') || '{}'); Object.keys(saved).forEach(function (k) { openTool(k, true); }); Object.keys(saved).forEach(function (k) { if (!saved[k]) restore(k); }); } catch (e) { }
  WPS.Tools = { open: openTool, minimize: minimize, restore: restore, close: close };
})();
