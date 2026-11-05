/* オープニングムービー(約9.5秒)— 映画・広告のような「実写的な水」
 * 暗いスタジオの水面を、やわらかい照明が照らす。水面は WebGL で1画素ずつ計算し、
 * 反射(フレネル)・照明のハイライト・波紋・映りこみのゆがみを表現する。
 * 輪郭だけ光る(リムライト)水瓶から、ガラスのような水が1本注がれ、波紋が広がる。
 * 最後に AQUALIUM の文字が浮かび、その映りこみが波でゆらぐ。光が1回だけ文字の上を走る。
 * サイトを開くたび(読みこむたび)に必ず流す。?nointro・?notour のときだけ流さない。
 * タップ/SKIP/Esc で飛ばせる。動きを減らす設定・WebGL が使えない端末では、静止したロゴを短く出す。
 */
(function () {
  'use strict';
  window.WPS = window.WPS || {};

  function shouldPlay(force) {
    if (force) return true;
    var q = location.search;
    if (/[?&](nointro|notour)\b/.test(q)) return false;
    return true; // 開くたびに必ず流す(画面の切りかえでは流れない)
  }

  var CSS = [
    'html.aq-intro-on, html.aq-intro-on body { overflow: hidden; }',
    '.aq-intro { position: fixed; inset: 0; z-index: 9999; background: #000; cursor: pointer; transition: opacity 1.1s cubic-bezier(.4, 0, .2, 1); -webkit-tap-highlight-color: transparent; }',
    '.aq-intro.out { opacity: 0; pointer-events: none; }',
    '.aq-intro canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }',
    '.aq-tag { position: absolute; left: 0; right: 0; margin: 0; text-align: center; pointer-events: none; opacity: 0; transition: opacity 2.4s ease; }',
    '.aq-tag.on { opacity: 1; }',
    '.aq-tag b { display: block; font-family: "Shippori Mincho", "Noto Serif JP", serif; font-weight: 400; font-size: clamp(.8rem, 3.3vw, 1rem); letter-spacing: .55em; text-indent: .55em; color: rgba(232, 236, 240, .82); text-shadow: 0 1px 12px rgba(0, 0, 0, .9); }',
    '.aq-tag small { display: block; margin-top: 12px; font-family: "Cormorant Garamond", serif; font-size: clamp(.58rem, 2.3vw, .7rem); letter-spacing: .62em; text-indent: .62em; color: rgba(214, 190, 140, .75); }',
    '.aq-fallback { position: absolute; left: 0; right: 0; top: 44%; text-align: center; font-family: "Cormorant Garamond", serif; font-weight: 300; font-size: clamp(2rem, 9vw, 4.2rem); letter-spacing: .34em; text-indent: .34em; color: #e7d3a4; opacity: 0; transition: opacity 1s ease; }',
    '.aq-fallback.on { opacity: 1; }',
    '.aq-skip { position: absolute; right: max(18px, env(safe-area-inset-right)); bottom: max(22px, env(safe-area-inset-bottom)); padding: 8px 4px; border: 0; border-bottom: 1px solid rgba(214, 190, 140, .45); background: none; color: rgba(232, 220, 190, .8); font-family: "Cormorant Garamond", serif; font-size: .78rem; letter-spacing: .42em; text-indent: .42em; cursor: pointer; opacity: 0; transition: opacity 1.2s ease .8s; }',
    '.aq-intro.ready .aq-skip { opacity: 1; }'
  ].join('\n');
  function addAssets() {
    if (!document.getElementById('aqIntroCSS')) { var st = document.createElement('style'); st.id = 'aqIntroCSS'; st.textContent = CSS; document.head.appendChild(st); }
    if (!document.getElementById('aqIntroFont')) {
      var ln = document.createElement('link'); ln.id = 'aqIntroFont'; ln.rel = 'stylesheet';
      ln.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Shippori+Mincho:wght@400&display=swap';
      document.head.appendChild(ln);
    }
  }

  // ---------- 水面のシェーダー ----------
  var VS = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }';
  var FS = [
    'precision highp float;',
    'uniform vec2 R; uniform float T, YH, FADE, GL, RIP, SON, CA, UA; uniform vec4 UB; uniform sampler2D O;',
    'uniform vec4 ST;',  // 水の柱:x, 上端y, 先端y, 太さ
    'uniform vec2 IMP;', // 波紋の中心(水面の座標 x, z)
    'float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }',
    'float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);',
    '  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }',
    'float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * vn(p); p = p * 2.03 + 7.1; a *= .5; } return s; }',
    'float H(vec2 p){',
    '  float h = ((fbm(p * .9 + vec2(T * .05, T * .08)) - .5) * .03 + sin(p.x * 1.1 + T * .5 + p.y * .4) * .005) * CA;',
    '  float d = length(p - IMP);',
    '  h += RIP * .024 * sin(d * 11. - T * 5.5) * exp(-d * .7);',
    '  return h; }',
    '// ---- 水瓶:昔の星図で水瓶座が傾けている壺(アンフォラ)を手本にした回転体。取っ手は2つで、注ぐ向きと直角(手前と奥)につく ----',
    '// 黒釉(アッティカの黒い光沢)+縦の溝彫り(フルーティング)+素焼きの帯。釉のむら・溝の陰・広くやわらかい反射で、本物の質感を出す',
    'float cr(float p0, float p1, float p2, float p3, float t){ return .5 * (2. * p1 + (-p0 + p2) * t + (2. * p0 - 5. * p1 + 4. * p2 - p3) * t * t + (-p0 + 3. * p1 - 3. * p2 + p3) * t * t * t); }',
    'float prof(float y){',
    '  if (y < 0. || y > 1.) return 0.;',
    '  if (y <= 0.022) return cr(0.115, 0.115, 0.125, 0.085, (y - 0.000) / 0.022);',
    '  if (y <= 0.045) return cr(0.115, 0.125, 0.085, 0.105, (y - 0.022) / 0.023);',
    '  if (y <= 0.085) return cr(0.125, 0.085, 0.105, 0.240, (y - 0.045) / 0.040);',
    '  if (y <= 0.200) return cr(0.085, 0.105, 0.240, 0.350, (y - 0.085) / 0.115);',
    '  if (y <= 0.400) return cr(0.105, 0.240, 0.350, 0.355, (y - 0.200) / 0.200);',
    '  if (y <= 0.530) return cr(0.240, 0.350, 0.355, 0.310, (y - 0.400) / 0.130);',
    '  if (y <= 0.640) return cr(0.350, 0.355, 0.310, 0.210, (y - 0.530) / 0.110);',
    '  if (y <= 0.710) return cr(0.355, 0.310, 0.210, 0.120, (y - 0.640) / 0.070);',
    '  if (y <= 0.760) return cr(0.310, 0.210, 0.120, 0.098, (y - 0.710) / 0.050);',
    '  if (y <= 0.800) return cr(0.210, 0.120, 0.098, 0.094, (y - 0.760) / 0.040);',
    '  if (y <= 0.900) return cr(0.120, 0.098, 0.094, 0.110, (y - 0.800) / 0.100);',
    '  if (y <= 0.945) return cr(0.098, 0.094, 0.110, 0.150, (y - 0.900) / 0.045);',
    '  if (y <= 0.975) return cr(0.094, 0.110, 0.150, 0.158, (y - 0.945) / 0.030);',
    '  if (y <= 1.000) return cr(0.110, 0.150, 0.158, 0.158, (y - 0.975) / 0.025);',
    '  return 0.;',
    '}',
    'vec3 envU(vec3 R3){',
    '  float g = smoothstep(-.4, .9, -R3.x * .55 + R3.y * .6);',
    '  vec3 c = mix(vec3(.006, .007, .009), vec3(.16, .13, .10), g);',
    '  c += vec3(1., .86, .66) * exp(-pow((R3.x + .55) / .24, 2.)) * smoothstep(-.4, .5, R3.y) * 26.;',
    '  c += vec3(.55, .72, 1.) * exp(-pow((R3.x - .85) / .16, 2.)) * smoothstep(-.3, .5, R3.y) * 12.;',
    '  c += vec3(.9, .88, .84) * smoothstep(.55, .95, R3.y) * 4.;',
    '  return c;',
    '}',
    'vec3 shadeU(vec3 N, vec2 q, float clay, float occ, float cs, float sn){',
    '  vec3 Nw = vec3(cs * N.x + sn * N.y, -sn * N.x + cs * N.y, N.z);',
    '  vec3 Rf = reflect(vec3(0., 0., 1.), Nw);',
    '  float nz = fbm(q * vec2(6., 14.)), nz2 = vn(q * 60.);',
    '  float cv = max(0., -Nw.z), F = .04 + .96 * pow(1. - cv, 5.);',
    '  vec3 L1 = normalize(vec3(-.62, .52, -.6)), L2 = normalize(vec3(.85, .25, .45));',
    '  float dif = max(dot(Nw, L1), 0.);',
    '  float rim = pow(max(dot(Nw, L2), 0.), 2.) * pow(1. - cv, 1.5);',
    '  // 黒釉:釉の厚い所は深い黒、うすい所(ふち・溝の山)はこげ茶。光沢にむら',
    '  vec3 glazeC = mix(vec3(.010, .011, .013), vec3(.05, .028, .016), smoothstep(.55, .9, nz) * .6);',
    '  float gloss = .75 + .25 * nz2;',
    '  float sp = pow(max(dot(Rf, L1), 0.), mix(28., 70., nz)) * 1.6;',
    '  vec3 glaze = glazeC * (.25 + dif) + (envU(Rf) * F * 1.15 + vec3(1., .93, .82) * sp * .5) * gloss * occ + vec3(.45, .62, .9) * rim * .35;',
    '  // 素焼き(赤土):つやのない土の色',
    '  vec3 clayC = vec3(.58, .30, .16) * (.82 + .3 * nz);',
    '  vec3 clayS = clayC * (.06 + 1.05 * dif) * occ + vec3(1., .8, .6) * rim * .12 + envU(Rf) * .015;',
    '  vec3 o = mix(glaze, clayS, clay);',
    '  return o / (1. + o);',
    '}',
    'vec4 urn(vec2 uv){',
    '  if (UA <= 0.) return vec4(0.);',
    '  float ar = R.x / R.y, cs = cos(UB.w), sn = sin(UB.w);',
    '  vec2 d = uv - UB.xy; d.x *= ar;',
    '  vec2 p = vec2(cs * d.x - sn * d.y, sn * d.x + cs * d.y) / UB.z;',
    '  if (p.y < -.03 || p.y > 1.05 || abs(p.x) > .45) return vec4(0.);',
    '  float px = 1.4 / (R.y * UB.z);',
    '  vec4 col = vec4(0.);',
    '  // 本体(口は丸く、ふちから注ぐ)',
    '  float r = prof(p.y);',
    '  float rr = r;',
    '  if (rr > 0. && abs(p.x) < rr + px) {',
    '    float e = .004, dr = (prof(p.y + e) - prof(p.y - e)) / (2. * e);',
    '    float sx = clamp(p.x / rr, -.999, .999), th = asin(sx), cz = -sqrt(1. - sx * sx);',
    '    vec3 N = normalize(vec3(sx, -dr, cz));',
    '    // 縦の溝彫り(胴の部分)',
    '    float fz = smoothstep(.12, .16, p.y) * (1. - smoothstep(.6, .64, p.y));',
    '    float fl = sin(th * 24.), occ = 1. - fz * .35 * smoothstep(-.2, -1., cos(th * 24.));',
    '    vec3 Tg = vec3(cos(th), 0., sin(th));',
    '    N = normalize(N + Tg * fl * .32 * fz);',
    '    // 素焼きの部分:足の外側・肩の細い帯・口の上のふち',
    '    float clay = (1. - smoothstep(.042, .05, p.y)) * smoothstep(.0, .01, p.y)',
    '      + smoothstep(.004, 0., abs(p.y - .70) - .006) + smoothstep(.004, 0., abs(p.y - .79) - .004) + smoothstep(.988, .996, p.y);',
    '    vec3 cc = shadeU(N, vec2(th, p.y), clamp(clay, 0., 1.), occ, cs, sn);',
    '    float a = clamp((rr - abs(p.x)) / px + .5, 0., 1.) * clamp(p.y / px + .5, 0., 1.) * clamp((1. - p.y) / px + .5, 0., 1.);',
    '    col = vec4(mix(col.rgb, cc, a), max(col.a, a));',
    '  }',
    '  // 手前の取っ手:首から肩へ、耳のような輪。少しななめから見ているので、左寄りに見える',
    '  float cf = -.42;',
    '  vec2 P0 = vec2(.098, .905), P1 = vec2(.30, .99), P2 = vec2(.42, .80), P3 = vec2(.25, .70);',
    '  float hd = 9., hr = .024, ht = 0.; vec2 hc = vec2(0.), pb = vec2(P0.x * cf, P0.y);',
    '  for (int i = 0; i <= 24; i++) { float t = float(i) / 24., u = 1. - t;',
    '    vec2 b = u * u * u * P0 + 3. * u * u * t * P1 + 3. * u * t * t * P2 + t * t * t * P3; b.x *= cf;',
    '    if (i > 0) { vec2 ab = b - pb; float h = clamp(dot(p - pb, ab) / dot(ab, ab), 0., 1.); vec2 q = pb + ab * h; float dd = length(p - q); if (dd < hd) { hd = dd; hc = q; ht = t; } } pb = b; }',
    '  if (hd < hr + px) {',
    '    float k = min(hd / hr, 1.); vec2 nx = (p - hc) / max(hd, 1e-4);',
    '    vec3 N = normalize(vec3(nx * k, -sqrt(max(0., 1. - k * k))));',
    '    vec3 hcol = shadeU(N, vec2(ht * 3., hd * 20.), 0., .95, cs, sn);',
    '    float ha = clamp((hr - hd) / px + .5, 0., 1.);',
    '    col = vec4(mix(col.rgb, hcol, ha), max(col.a, ha));',
    '  }',
    '  return col;',
    '}',
    'vec3 sky(vec2 uv){',
    '  float ar = R.x / R.y;',
    '  vec3 c = vec3(.006, .008, .014);',
    '  vec2 q = (uv - vec2(.5, YH + .16)) * vec2(ar * .9, 2.2);',
    '  c += vec3(.085, .07, .052) * exp(-dot(q, q) * 1.6);',
    '  c += vec3(.02, .035, .06) * exp(-pow((uv.y - YH) * 9., 2.));',
    '  vec4 uu = urn(uv); c = mix(c, uu.rgb, uu.a * UA);',
    '  vec4 o = texture2D(O, vec2(uv.x, 1. - uv.y));',
    '  float gl = smoothstep(.05, 0., abs(uv.x - GL - (uv.y - YH) * .35)) * o.a;',
    '  c = mix(c, o.rgb + gl * vec3(1., .93, .78) * .9, o.a);',
    '  if (SON > 0. && uv.y < ST.y && uv.y > ST.z) {',
    '    float wob = sin(uv.y * 38. + T * 7.) * .0005 + sin(uv.y * 13. - T * 4.) * .0009;',
    '    float dx = (uv.x - ST.x - wob) / ST.w;',
    '    if (abs(dx) < 1.) {',
    '      float edge = pow(abs(dx), 5.);',
    '      float str = vn(vec2(dx * 2.5, uv.y * 55. + T * 30.));',
    '      float body = 1. - smoothstep(.85, 1., abs(dx));',
    '      vec3 sc = mix(vec3(.30, .42, .50) * (.7 + .3 * str), vec3(1., .95, .86), edge) + vec3(.9, .95, 1.) * smoothstep(.25, 0., abs(dx + .35)) * .35;',
    '      c = mix(c, sc, body * (.55 + .45 * edge) * SON);',
    '    }',
    '  }',
    '  return c; }',
    'void main(){',
    '  vec2 uv = gl_FragCoord.xy / R; float ar = R.x / R.y;',
    '  vec3 col;',
    '  if (uv.y > YH) { col = sky(uv); }',
    '  else {',
    '    float ch = .14;',
    '    vec3 rd = normalize(vec3((uv.x - .5) * ar, uv.y - YH, 1.));',
    '    float t = ch / max(1e-4, -rd.y);',
    '    vec2 p = vec2(rd.x * t, rd.z * t);',
    '    float e = .012 * t;',
    '    float hx = (H(p + vec2(e, 0)) - H(p - vec2(e, 0))) / (2. * e);',
    '    float hz = (H(p + vec2(0, e)) - H(p - vec2(0, e))) / (2. * e);',
    '    vec3 n = normalize(vec3(-hx, 1., -hz));',
    '    vec3 r = reflect(rd, n);',
    '    vec2 ruv = vec2(.5 + r.x / max(.05, r.z) / ar, YH + max(.0005, r.y / max(.05, r.z)));',
    '    vec3 refl = sky(ruv);',
    '    float fr = .03 + .97 * pow(1. - max(0., dot(-rd, n)), 5.);',
    '    vec3 water = vec3(.002, .006, .014) + vec3(.004, .012, .02) * fbm(p * 3.);',
    '    float lx = min(1., ar * .6); vec3 L1 = normalize(vec3(-.55 * lx, .16, 1.)), L2 = normalize(vec3(.6 * lx, .11, 1.));',
    '    float s1 = pow(max(dot(r, L1), 0.), 380.), s2 = pow(max(dot(r, L2), 0.), 420.);',
    '    col = mix(water, refl, clamp(fr * 1.35, 0., 1.)) + s1 * vec3(1., .82, .55) * 1.4 + s2 * vec3(.6, .78, 1.) * 1.1;',
    '    col = mix(col, vec3(.02, .03, .05), smoothstep(6., 22., t) * .8);',
    '  }',
    '  vec2 v = uv - .5; col *= 1. - dot(v * vec2(1.1, 1.3), v * vec2(1.1, 1.3)) * 1.25;',
    '  col += (h21(gl_FragCoord.xy + fract(T * 7.31) * 100.) - .5) * .028;',
    '  col = pow(max(col, 0.), vec3(.92));',
    '  gl_FragColor = vec4(col * FADE, 1.);',
    '}'
  ].join('\n');

  function build(gl) {
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { if (window.console) console.warn('intro shader', gl.getShaderInfoLog(s)); return null; } return s; }
    var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS); if (!v || !f) return null;
    var p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
    gl.useProgram(p);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(p, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    return p;
  }

  function play(opt) {
    opt = opt || {};
    if (!shouldPlay(opt.force)) { if (opt.done) opt.done(); return; }
    addAssets();
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    var ov = document.createElement('div');
    ov.className = 'aq-intro';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'オープニング:Aqualium');
    ov.innerHTML = '<canvas aria-hidden="true"></canvas><p class="aq-tag" aria-hidden="true"><b>知性が、あふれ出す。</b><small>PERSONALIZED LEARNING</small></p>' +
      '<div class="aq-fallback" aria-hidden="true">AQUALIUM</div><button type="button" class="aq-skip">SKIP</button>';
    document.body.appendChild(ov);
    document.documentElement.classList.add('aq-intro-on');
    setTimeout(function () { ov.classList.add('ready'); }, 50);
    var cv = ov.querySelector('canvas'), tag = ov.querySelector('.aq-tag');

    var ended = false, raf = 0, T0 = 0, DUR = 9.6, size = function () {};
    function end() {
      if (ended) return; ended = true;
      ov.classList.add('out');
      setTimeout(function () {
        cancelAnimationFrame(raf); removeEventListener('resize', size); document.removeEventListener('keydown', onKey);
        ov.remove(); document.documentElement.classList.remove('aq-intro-on');
        if (opt.done) opt.done();
      }, 1100);
    }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') end(); }
    ov.querySelector('.aq-skip').addEventListener('click', function (e) { e.stopPropagation(); end(); });
    ov.addEventListener('click', function () { if (T0 && (performance.now() - T0) > 900) end(); });
    document.addEventListener('keydown', onKey);

    var gl = null;
    try { gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false }) || cv.getContext('experimental-webgl'); } catch (e) { gl = null; }
    var prog = gl && build(gl);
    if (!prog) {
      cv.style.background = '#05070c';
      ov.querySelector('.aq-fallback').classList.add('on');
      tag.style.top = '58%'; tag.classList.add('on');
      T0 = performance.now(); setTimeout(end, 2800);
      return;
    }

    // 水瓶と文字は 2D のキャンバスに描き、シェーダーにわたす(水面への映りこみも自動でできる)
    var oc = document.createElement('canvas'), ox = oc.getContext('2d');
    var W, H, OD, YH = 0.5;
    size = function () {
      W = innerWidth; H = innerHeight;
      var D = Math.min(1.5, window.devicePixelRatio || 1); if (W * H * D * D > 2.4e6) D = Math.sqrt(2.4e6 / (W * H));
      cv.width = Math.round(W * D); cv.height = Math.round(H * D);
      OD = Math.min(1.5, window.devicePixelRatio || 1); if (W * OD > 1600) OD = 1600 / W;
      oc.width = Math.round(W * OD); oc.height = Math.round(H * OD);
      YH = W > H ? 0.42 : 0.40;
      gl.viewport(0, 0, cv.width, cv.height);
      tag.style.top = Math.round(H * (1 - YH) + Math.min(H * 0.17, 140)) + 'px';
    };
    size(); addEventListener('resize', size);

    var U = {}; ['R', 'T', 'YH', 'FADE', 'GL', 'RIP', 'SON', 'CA', 'UA', 'UB', 'O', 'ST', 'IMP'].forEach(function (k) { U[k] = gl.getUniformLocation(prog, k); });
    var tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(U.O, 0);

    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function eio(t) { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function eout(t) { t = clamp(t); return 1 - Math.pow(1 - t, 3); }
    function sq(t) { t = clamp(t); return t * t; }
    function seg(t, a, b, f) { return (f || eio)((t - a) / (b - a)); }

    // 水瓶(アンフォラ):暗い本体に、右から金・左から青の光が当たり、輪郭だけが光る(リムライト)
    function urnPath(c, s) {
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-0.07 * s, 0, -0.12 * s, -0.02 * s, -0.13 * s, -0.06 * s);
      c.bezierCurveTo(-0.30 * s, -0.20 * s, -0.36 * s, -0.42 * s, -0.33 * s, -0.58 * s);
      c.bezierCurveTo(-0.30 * s, -0.72 * s, -0.16 * s, -0.78 * s, -0.10 * s, -0.83 * s);
      c.lineTo(-0.09 * s, -0.95 * s); c.quadraticCurveTo(-0.15 * s, -0.97 * s, -0.16 * s, -1.0 * s);
      c.lineTo(0.12 * s, -1.0 * s); c.quadraticCurveTo(0.2 * s, -1.0 * s, 0.24 * s, -1.03 * s); c.quadraticCurveTo(0.17 * s, -0.95 * s, 0.09 * s, -0.95 * s);
      c.lineTo(0.10 * s, -0.83 * s);
      c.bezierCurveTo(0.16 * s, -0.78 * s, 0.30 * s, -0.72 * s, 0.33 * s, -0.58 * s);
      c.bezierCurveTo(0.36 * s, -0.42 * s, 0.30 * s, -0.20 * s, 0.13 * s, -0.06 * s);
      c.bezierCurveTo(0.12 * s, -0.02 * s, 0.07 * s, 0, 0, 0);
      c.closePath();
    }
    function drawUrn(x, y, s, ang, a) {
      if (a <= 0) return;
      var c = ox; c.save(); c.translate(x, y); c.rotate(ang); c.globalAlpha = a;
      // 取っ手は1つだけ、注ぎ口の反対側(左)。注ぐ側(右)には取っ手を付けない
      c.lineCap = 'round';
      c.lineWidth = 0.03 * s; c.strokeStyle = '#100e0b';
      c.beginPath(); c.moveTo(-0.095 * s, -0.90 * s); c.bezierCurveTo(-0.34 * s, -0.95 * s, -0.42 * s, -0.70 * s, -0.30 * s, -0.60 * s); c.stroke();
      c.lineWidth = Math.max(1, 0.006 * s); c.strokeStyle = 'rgba(170, 200, 235, .65)';
      c.beginPath(); c.moveTo(-0.10 * s, -0.918 * s); c.bezierCurveTo(-0.355 * s, -0.97 * s, -0.44 * s, -0.70 * s, -0.315 * s, -0.592 * s); c.stroke();
      urnPath(c, s);
      var body = c.createRadialGradient(0.16 * s, -0.6 * s, 0.02 * s, 0, -0.5 * s, 0.52 * s);
      body.addColorStop(0, '#4a3c26'); body.addColorStop(0.45, '#17130d'); body.addColorStop(1, '#040404');
      c.fillStyle = body; c.fill();
      c.save(); urnPath(c, s); c.clip();
      var rimR = c.createLinearGradient(0.37 * s, 0, 0.16 * s, 0);
      rimR.addColorStop(0, 'rgba(255, 232, 185, 1)'); rimR.addColorStop(0.28, 'rgba(214, 172, 100, .5)'); rimR.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = rimR; c.fillRect(0, -1.05 * s, 0.4 * s, 1.1 * s);
      var rimL = c.createLinearGradient(-0.36 * s, 0, -0.24 * s, 0);
      rimL.addColorStop(0, 'rgba(160, 200, 240, .7)'); rimL.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = rimL; c.fillRect(-0.4 * s, -1.05 * s, 0.2 * s, 1.1 * s);
      var sh = c.createRadialGradient(0.2 * s, -0.66 * s, 0, 0.2 * s, -0.66 * s, 0.15 * s);
      sh.addColorStop(0, 'rgba(255, 240, 210, .8)'); sh.addColorStop(1, 'rgba(255, 238, 205, 0)');
      c.fillStyle = sh; c.fillRect(0, -0.85 * s, 0.4 * s, 0.4 * s);
      c.restore();
      c.lineWidth = Math.max(1, 0.005 * s); c.strokeStyle = 'rgba(236, 210, 158, .7)'; urnPath(c, s); c.stroke();
      c.restore();
    }
    // AQUALIUM:1文字ずつ現れ、広い字間がゆっくり締まる
    var LET = 'AQUALIUM'.split('');
    function drawWord(t) {
      if (t < 6.0) return;
      var p = seg(t, 6.0, 8.8, eout);
      var fs = Math.min(W * 0.092, H * 0.085, 76) * OD;
      ox.font = '300 ' + fs + 'px "Cormorant Garamond", "Times New Roman", serif';
      ox.textBaseline = 'alphabetic';
      var sp = fs * (0.62 - 0.28 * p), ws = LET.map(function (c) { return ox.measureText(c).width; });
      var total = ws.reduce(function (a, b) { return a + b; }, 0) + sp * (LET.length - 1);
      var x = oc.width / 2 - total / 2, base = oc.height * (1 - YH) - Math.min(H * 0.075, 54) * OD;
      var g = ox.createLinearGradient(0, base - fs * 0.75, 0, base);
      g.addColorStop(0, '#fbf3df'); g.addColorStop(0.55, '#e2c68b'); g.addColorStop(1, '#a8803f');
      LET.forEach(function (c, i) {
        var a = seg(t, 6.0 + i * 0.12, 7.4 + i * 0.12, eout);
        if (a > 0) { ox.globalAlpha = a; ox.fillStyle = g; ox.fillText(c, x, base + (1 - a) * fs * 0.12); }
        x += ws[i] + sp;
      });
      ox.globalAlpha = 1;
    }

    var tagOn = false, FIX = +((location.search.match(/[?&]introT=([\d.]+)/) || [])[1] || -1); // 確認用:その秒で止める
    if (reduce && FIX < 0) { FIX = 8.8; DUR = 3.4; } // 動きを減らす設定:最後の場面を、動かさずに見せる
    function frame(now) {
      if (!T0) T0 = now;
      var t = FIX >= 0 ? FIX : (now - T0) / 1000;
      ox.clearRect(0, 0, oc.width, oc.height);
      var S = Math.min(W * 0.30, H * 0.27) * OD, tilt = 0.7 * seg(t, 2.4, 3.9);
      var baseY = oc.height * (1 - YH) - Math.min(H * 0.19, 170) * OD;
      var ux = oc.width * (W > H ? 0.42 : 0.38);
      var urnA = seg(t, 0.9, 2.6) * (1 - seg(t, 5.3, 6.6));
      var bY = baseY + (1 - seg(t, 0.9, 2.6)) * 18 * OD; // 水瓶はシェーダーで立体として描く
      drawWord(t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, oc);
      // 水の柱:口から水面まで
      var c = Math.cos(tilt), sn = Math.sin(tilt);
      var mx = ux + 0.158 * S * c + 1.0 * S * sn, my = baseY + 0.158 * S * sn - 1.0 * S * c;
      var sx = mx / oc.width, sTop = 1 - my / oc.height;
      var on = seg(t, 3.5, 3.8) * (1 - seg(t, 5.7, 6.1));
      var sHead = sTop - (sTop - (YH - 0.015)) * seg(t, 3.5, 4.1, sq);
      var sTail = t > 5.3 ? sTop - (sTop - YH) * seg(t, 5.3, 5.9, sq) : sTop;
      // 波紋の中心:水の柱が落ちる点を、水面の座標になおす
      var impY = YH - 0.015, tt = 0.14 / (YH - impY), ar = W / H;
      var rip = seg(t, 4.0, 4.6) * (1 - 0.9 * seg(t, 6.0, 8.2));
      gl.uniform2f(U.R, cv.width, cv.height);
      gl.uniform1f(U.T, t);
      gl.uniform1f(U.YH, YH);
      var rt = (now - T0) / 1000;
      gl.uniform1f(U.FADE, reduce ? seg(rt, 0, 0.8) : seg(t, 0, 1.8) * (1 - seg(t, DUR - 0.6, DUR)));
      gl.uniform1f(U.GL, -0.3 + 1.6 * seg(t, 7.6, 9.0));
      gl.uniform1f(U.RIP, rip);
      gl.uniform1f(U.SON, on);
      gl.uniform1f(U.UA, urnA);
      gl.uniform4f(U.UB, ux / oc.width, 1 - bY / oc.height, S / oc.height, tilt);
      gl.uniform1f(U.CA, 1 - 0.55 * seg(t, 5.8, 7.6)); // 文字が出るころ水面を静める(映りこみを読みやすく)
      gl.uniform4f(U.ST, sx, sTail, sHead, Math.max(0.0035, 3.2 / W));
      gl.uniform2f(U.IMP, (sx - 0.5) * ar * tt, tt);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (t > 7.0 && !tagOn) { tagOn = true; tag.classList.add('on'); }
      if (reduce && rt > DUR) { end(); return; }
      if (t > DUR && FIX < 0) { end(); return; }
      raf = requestAnimationFrame(frame);
    }
    var fontsReady = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('300 40px "Cormorant Garamond"'), document.fonts.load('16px "Shippori Mincho"')]) : Promise.resolve();
    Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 900); })]).then(function () { raf = requestAnimationFrame(frame); });
  }

  WPS.Intro = { play: play };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { play(); }); else play();
})();
