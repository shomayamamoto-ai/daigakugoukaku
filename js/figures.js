/*
 * 解説の図(SVG)
 * 問題データの fig から、数直線・グラフ・図形などを描きます。
 * 色は CSS の変数を使うので、ダークモードでも読みやすく表示されます。
 */
window.WPS = window.WPS || {};
WPS.Fig = (function () {
  function svg(w, h, body, label) {
    return '<svg class="fig" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (label || '解説の図') + '">' + body + '</svg>';
  }
  function t(x, y, s, cls, anchor) { return '<text x="' + x + '" y="' + y + '" class="' + (cls || 'fg-t') + '" text-anchor="' + (anchor || 'middle') + '">' + s + '</text>'; }
  function ln(x1, y1, x2, y2, cls) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + (cls || 'fg-l') + '"/>'; }
  function r1(n) { return Math.round(n * 10) / 10; }

  // 座標平面(x,y の範囲を指定して、関数や点を描く)
  function plane(xr, yr, draw) {
    var W = 300, H = 220, P = 24;
    function X(x) { return P + (x - xr[0]) / (xr[1] - xr[0]) * (W - 2 * P); }
    function Y(y) { return H - P - (y - yr[0]) / (yr[1] - yr[0]) * (H - 2 * P); }
    var b = '';
    for (var gx = Math.ceil(xr[0]); gx <= xr[1]; gx++) b += ln(X(gx), Y(yr[0]), X(gx), Y(yr[1]), 'fg-grid');
    var step = Math.max(1, Math.ceil((yr[1] - yr[0]) / 12));
    for (var gy = Math.ceil(yr[0] / step) * step; gy <= yr[1]; gy += step) b += ln(X(xr[0]), Y(gy), X(xr[1]), Y(gy), 'fg-grid');
    if (yr[0] <= 0 && yr[1] >= 0) b += ln(X(xr[0]), Y(0), X(xr[1]), Y(0), 'fg-axis') + t(X(xr[1]) - 4, Y(0) - 6, 'x', 'fg-s');
    if (xr[0] <= 0 && xr[1] >= 0) b += ln(X(0), Y(yr[0]), X(0), Y(yr[1]), 'fg-axis') + t(X(0) + 8, Y(yr[1]) + 10, 'y', 'fg-s') + t(X(0) - 8, Y(0) + 14, 'O', 'fg-s');
    b += draw(X, Y);
    return svg(W, H, b, 'グラフ');
  }
  function curve(f, xr, X, Y, yr, cls) {
    var d = '', first = true;
    for (var i = 0; i <= 80; i++) {
      var x = xr[0] + (xr[1] - xr[0]) * i / 80, y = f(x);
      if (y < yr[0] - 1 || y > yr[1] + 1) { first = true; continue; }
      d += (first ? 'M' : 'L') + r1(X(x)) + ' ' + r1(Y(y)) + ' ';
      first = false;
    }
    return '<path d="' + d + '" class="' + (cls || 'fg-c') + '"/>';
  }
  function dot(x, y, X, Y, label) { return '<circle cx="' + X(x) + '" cy="' + Y(y) + '" r="4" class="fg-dot"/>' + (label ? t(X(x) + 6, Y(y) - 8, label, 'fg-s', 'start') : ''); }

  var R = {};
  R.numberline = function (f) {
    var a = f.a, b = f.a + f.d, lo = Math.min(a, b, 0) - 2, hi = Math.max(a, b, 0) + 2, W = 320, H = 90;
    function X(x) { return 16 + (x - lo) / (hi - lo) * (W - 32); }
    var s = ln(X(lo), 55, X(hi), 55, 'fg-axis');
    for (var i = Math.ceil(lo); i <= hi; i++) s += ln(X(i), 50, X(i), 60, 'fg-l') + (i % Math.max(1, Math.round((hi - lo) / 10)) === 0 ? t(X(i), 76, i, 'fg-s') : '');
    s += '<path d="M' + X(a) + ' 40 Q' + ((X(a) + X(b)) / 2) + ' 8 ' + X(b) + ' 40" class="fg-c" marker-end="url(#fgArrow)"/>';
    s += '<circle cx="' + X(a) + '" cy="55" r="5" class="fg-dot2"/><circle cx="' + X(b) + '" cy="55" r="5" class="fg-dot"/>';
    s += t((X(a) + X(b)) / 2, 18, (f.d > 0 ? '+' : '') + f.d, 'fg-t');
    return svg(W, H, '<defs><marker id="fgArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" class="fg-fill"/></marker></defs>' + s, '数直線');
  };
  R.balance = function (f) {
    var s = ln(160, 30, 160, 110, 'fg-l') + '<path d="M140 110 L180 110 L160 95z" class="fg-fill"/>' + ln(50, 40, 270, 40, 'fg-axis');
    s += '<rect x="20" y="52" width="110" height="34" rx="6" class="fg-box"/><rect x="190" y="52" width="110" height="34" rx="6" class="fg-box"/>';
    s += ln(75, 40, 75, 52, 'fg-l') + ln(245, 40, 245, 52, 'fg-l') + t(75, 74, f.l, 'fg-t') + t(245, 74, f.r, 'fg-t') + t(160, 22, '＝', 'fg-t');
    return svg(320, 120, s, 'てんびん');
  };
  R.line = function (f) {
    var xs = (f.pts || []).map(function (p) { return p[0]; }), ys = (f.pts || []).map(function (p) { return p[1]; });
    var xr = [Math.min(-5, Math.min.apply(null, xs.concat([0])) - 1), Math.max(5, Math.max.apply(null, xs.concat([0])) + 1)];
    var yr = [Math.min(-6, Math.min.apply(null, ys.concat([f.b])) - 2), Math.max(6, Math.max.apply(null, ys.concat([f.b])) + 2)];
    return plane(xr, yr, function (X, Y) {
      var s = curve(function (x) { return f.m * x + f.b; }, xr, X, Y, yr);
      if (f.m2 !== undefined) s += curve(function (x) { return f.m2 * x + f.b2; }, xr, X, Y, yr, 'fg-c2');
      s += dot(0, f.b, X, Y, '切片 ' + f.b);
      (f.pts || []).forEach(function (p) { s += dot(p[0], p[1], X, Y, '(' + p[0] + ', ' + p[1] + ')'); });
      return s;
    });
  };
  R.parabola = function (f) {
    var a = f.a, h = f.h, k = f.k, fx = function (x) { return a * (x - h) * (x - h) + k; };
    var xr = [h - 5, h + 5];
    if (f.range) xr = [Math.min(xr[0], f.range[0] - 1), Math.max(xr[1], f.range[1] + 1)];
    if (f.area) xr = [Math.min(xr[0], -1), Math.max(xr[1], f.area[1] + 1)];
    var vals = [k, fx(xr[0] + 1), fx(xr[1] - 1), 0];
    var yr = [Math.min.apply(null, vals) - 2, Math.max.apply(null, vals) + 2];
    if (yr[1] - yr[0] > 60) yr = a > 0 ? [k - 3, k + 50] : [k - 50, k + 3];
    return plane(xr, yr, function (X, Y) {
      var s = '';
      if (f.area) {
        var d = 'M' + X(f.area[0]) + ' ' + Y(0);
        for (var i = 0; i <= 30; i++) { var x = f.area[0] + (f.area[1] - f.area[0]) * i / 30; d += ' L' + r1(X(x)) + ' ' + r1(Y(fx(x))); }
        s += '<path d="' + d + ' L' + X(f.area[1]) + ' ' + Y(0) + 'z" class="fg-area"/>';
      }
      if (f.range) s += '<rect x="' + X(f.range[0]) + '" y="' + Y(yr[1]) + '" width="' + (X(f.range[1]) - X(f.range[0])) + '" height="' + (Y(yr[0]) - Y(yr[1])) + '" class="fg-band"/>';
      s += curve(fx, xr, X, Y, yr);
      s += dot(h, k, X, Y, '頂点(' + r1(h) + ', ' + r1(k) + ')');
      (f.roots || []).forEach(function (x) { s += dot(x, 0, X, Y, String(x)); });
      (f.pts || []).forEach(function (p) { s += dot(p[0], p[1], X, Y); });
      return s;
    });
  };
  R.polygon = function (f) {
    var n = f.n, cx = 110, cy = 100, rr = 80, pts = [];
    for (var i = 0; i < n; i++) { var ang = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push([cx + rr * Math.cos(ang), cy + rr * Math.sin(ang)]); }
    var s = '<polygon points="' + pts.map(function (p) { return r1(p[0]) + ',' + r1(p[1]); }).join(' ') + '" class="fg-box"/>';
    for (var j = 2; j < n - 1; j++) s += ln(pts[0][0], pts[0][1], pts[j][0], pts[j][1], 'fg-dash');
    s += t(270, 90, n + '角形', 'fg-t') + t(270, 116, '三角形 ' + (n - 2) + '個', 'fg-s');
    return svg(330, 200, s, n + '角形を三角形に分けた図');
  };
  R.area = function (f) {
    var p = Math.abs(f.p), q = Math.abs(f.q), W = 300, X0 = 40, Y0 = 20, a = 120, bw = Math.max(20, p * 12), bh = Math.max(20, q * 12);
    var s = '<rect x="' + X0 + '" y="' + Y0 + '" width="' + a + '" height="' + a + '" class="fg-box"/>' +
      '<rect x="' + (X0 + a) + '" y="' + Y0 + '" width="' + bw + '" height="' + a + '" class="fg-box2"/>' +
      '<rect x="' + X0 + '" y="' + (Y0 + a) + '" width="' + a + '" height="' + bh + '" class="fg-box2"/>' +
      '<rect x="' + (X0 + a) + '" y="' + (Y0 + a) + '" width="' + bw + '" height="' + bh + '" class="fg-box3"/>';
    s += t(X0 + a / 2, Y0 + a / 2 + 5, 'x²') + t(X0 + a + bw / 2, Y0 + a / 2 + 5, f.p + 'x', 'fg-s') + t(X0 + a / 2, Y0 + a + bh / 2 + 5, f.q + 'x', 'fg-s') + t(X0 + a + bw / 2, Y0 + a + bh / 2 + 5, String(f.p * f.q), 'fg-s');
    s += t(X0 + a / 2, 14, 'x', 'fg-s') + t(X0 + a + bw / 2, 14, String(f.p), 'fg-s') + t(28, Y0 + a / 2, 'x', 'fg-s') + t(28, Y0 + a + bh / 2 + 4, String(f.q), 'fg-s');
    return svg(W, Y0 + a + bh + 10, s, '展開の面積図');
  };
  R.righttri = function (f) {
    var s = '<polygon points="40,170 260,170 40,40" class="fg-box"/><rect x="40" y="156" width="14" height="14" class="fg-l2"/>';
    s += t(150, 190, f.ask === 'theta' ? 'となりの辺 ' + f.a : String(f.a), 'fg-t') + t(22, 110, f.ask === 'theta' ? '' : String(f.b), 'fg-t') + t(165, 98, f.ask === 'c' ? '? ' : String(f.c), 'fg-t', 'start');
    if (f.ask === 'theta') s += t(46, 110, '向かいの辺 ' + f.b, 'fg-s', 'start') + t(232, 162, 'θ', 'fg-t');
    if (f.ask === 'b') s = s.replace('>' + f.b + '<', '>?<');
    s += t(165, 116, '斜辺', 'fg-s', 'start');
    return svg(300, 200, s, '直角三角形');
  };
  R.unitcircle = function (f) {
    var cx = 120, cy = 110, rr = 80, a = f.deg * Math.PI / 180, px = cx + rr * Math.cos(a), py = cy - rr * Math.sin(a);
    var s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + rr + '" class="fg-c"/>' + ln(20, cy, 220, cy, 'fg-axis') + ln(cx, 15, cx, 205, 'fg-axis');
    s += ln(cx, cy, px, py, 'fg-l') + ln(px, py, px, cy, 'fg-dash') + ln(px, py, cx, py, 'fg-dash') + '<circle cx="' + px + '" cy="' + py + '" r="5" class="fg-dot"/>';
    s += '<path d="M' + (cx + 22) + ' ' + cy + ' A22 22 0 ' + (f.deg > 180 ? 1 : 0) + ' 0 ' + (cx + 22 * Math.cos(a)) + ' ' + (cy - 22 * Math.sin(a)) + '" class="fg-c2"/>';
    s += t(cx + 34, cy - 10, f.deg + '°', 'fg-s', 'start') + t(250, 60, 'x座標 → cos', 'fg-s', 'start') + t(250, 84, 'y座標 → sin', 'fg-s', 'start') + t(250, 108, '半径 1', 'fg-s', 'start');
    return svg(340, 220, s, '単位円');
  };
  R.dice = function (f) {
    var c = 26, x0 = 40, y0 = 30, s = '';
    for (var i = 1; i <= 6; i++) { s += t(x0 + (i - 0.5) * c, y0 - 8, i, 'fg-s') + t(x0 - 12, y0 + (i - 0.5) * c + 4, i, 'fg-s'); }
    for (var a = 1; a <= 6; a++) for (var b = 1; b <= 6; b++) {
      var hit = a + b === f.s;
      s += '<rect x="' + (x0 + (b - 1) * c) + '" y="' + (y0 + (a - 1) * c) + '" width="' + c + '" height="' + c + '" class="' + (hit ? 'fg-hit' : 'fg-cell') + '"/>' + t(x0 + (b - 0.5) * c, y0 + (a - 0.5) * c + 4, a + b, hit ? 'fg-ht' : 'fg-s');
    }
    s += t(x0 + 3 * c, y0 + 6 * c + 22, '和が ' + f.s + ' のマス:色つき', 'fg-s');
    return svg(220, y0 + 6 * c + 30, s, 'さいころ2個の表');
  };
  R.bits = function (f) {
    var b = f.b, n = b.length, w = 44, s = '';
    for (var i = 0; i < n; i++) {
      var x = 10 + i * w, wt = Math.pow(2, n - 1 - i), on = b[i] === '1';
      s += '<rect x="' + x + '" y="34" width="' + (w - 6) + '" height="36" rx="6" class="' + (on ? 'fg-hit' : 'fg-cell') + '"/>' + t(x + (w - 6) / 2, 58, b[i], on ? 'fg-ht' : 'fg-t') + t(x + (w - 6) / 2, 24, wt, 'fg-s');
    }
    s += t(10 + n * w / 2, 92, '1 の位の重みをたす → ' + parseInt(b, 2), 'fg-s');
    return svg(Math.max(240, 20 + n * w), 100, s, '2進数の位');
  };
  R.ohm = function (f) {
    var s = '<circle cx="90" cy="80" r="66" class="fg-box"/>' + ln(30, 80, 150, 80, 'fg-l') + ln(90, 80, 90, 146, 'fg-l');
    s += t(90, 62, 'V', f.hl === 'V' ? 'fg-big fg-hl' : 'fg-big') + t(60, 118, 'R', f.hl === 'R' ? 'fg-big fg-hl' : 'fg-big') + t(120, 118, 'I', f.hl === 'I' ? 'fg-big fg-hl' : 'fg-big');
    s += t(250, 60, '求めたい文字を', 'fg-s') + t(250, 82, '指でかくすと式になる', 'fg-s') + t(250, 112, 'V＝R×I', 'fg-t') + t(250, 134, 'I＝V÷R', 'fg-t');
    return svg(330, 160, s, 'オームの法則の図');
  };
  R.vt = function (f) {
    var vmax = f.a * f.t;
    return plane([0, f.t + 1], [0, vmax + 2], function (X, Y) {
      return '<path d="M' + X(0) + ' ' + Y(0) + ' L' + X(f.t) + ' ' + Y(vmax) + ' L' + X(f.t) + ' ' + Y(0) + 'z" class="fg-area"/>' +
        curve(function (x) { return f.a * x; }, [0, f.t], X, Y, [0, vmax + 2]) + dot(f.t, vmax, X, Y, vmax + 'm/s') + t(X(f.t * 0.66), Y(vmax * 0.25), '面積＝距離', 'fg-s');
    });
  };
  R.similar = function (f) {
    var u = 26, s = '<rect x="20" y="' + (110 - f.m * u) + '" width="' + f.m * u + '" height="' + f.m * u + '" class="fg-box"/><rect x="' + (40 + f.m * u) + '" y="' + (110 - f.n * u) + '" width="' + f.n * u + '" height="' + f.n * u + '" class="fg-box2"/>';
    s += t(20 + f.m * u / 2, 128, '辺 ' + f.m, 'fg-s') + t(40 + f.m * u + f.n * u / 2, 128, '辺 ' + f.n, 'fg-s');
    return svg(Math.max(200, 60 + (f.m + f.n) * u), 140, s, '相似な図形');
  };
  R.vec = function (f) {
    var all = [f.a, f.b, [f.a[0] + f.b[0], f.a[1] + f.b[1]]], m = 1;
    all.forEach(function (p) { m = Math.max(m, Math.abs(p[0]), Math.abs(p[1])); });
    var lim = m + 1;
    return plane([-lim, lim], [-lim, lim], function (X, Y) {
      function arrow(p, cls, label) { return ln(X(0), Y(0), X(p[0]), Y(p[1]), cls) + dot(p[0], p[1], X, Y, label); }
      return arrow(f.a, 'fg-c', 'a') + arrow(f.b, 'fg-c2', 'b') + arrow(all[2], 'fg-dash', 'a＋b');
    });
  };
  R.globe = function (f) {
    var W = 320, s = '', lon = function (L) { return 20 + ((L + 180) / 360) * (W - 40); };
    s += '<rect x="20" y="20" width="' + (W - 40) + '" height="70" rx="8" class="fg-cell"/>';
    [-180, -90, 0, 90, 180].forEach(function (L) { s += ln(lon(L), 20, lon(L), 90, 'fg-grid') + t(lon(L), 106, L === 0 ? '0°' : (L < 0 ? '西' + (-L) : '東' + L), 'fg-s'); });
    s += '<circle cx="' + lon(f.a) + '" cy="55" r="6" class="fg-dot"/>' + t(lon(f.a), 46, '日本', 'fg-s') + '<circle cx="' + lon(f.b) + '" cy="55" r="6" class="fg-dot2"/>' + t(lon(f.b), 76, f.name, 'fg-s');
    s += t(W / 2, 124, '15°ごとに1時間ずれる(東ほど進んでいる)', 'fg-s');
    return svg(W, 132, s, '経度と時差');
  };

  function draw(fig) {
    if (!fig || !R[fig.type]) return '';
    try { return '<div class="fig-wrap">' + R[fig.type](fig) + '</div>'; } catch (e) { return ''; }
  }
  return { draw: draw };
})();
