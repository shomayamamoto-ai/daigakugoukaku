/*
 * ピンポ(フクロウ)の3Dモデル
 * ------------------------------------------------------------
 * 機械じかけ(スチームパンク)のフクロウが、時計の文字盤の台座にとまっているモデル。
 * three.js(js/vendor/three.min.js・MITライセンス)を使い、形はすべてプログラムで作っています(画像ファイルなし)。
 *  ・ドラッグで回転、ゆっくり自動回転
 *  ・「分解する」で部品ごとに分かれ、部品名(頭部・翼・尾羽…)を表示
 *  ・WebGL が使えない環境では、ふつうの絵(SVG)を表示
 * 使い方:WPS.Owl3D.mount(要素, { explode: true, labels: true })
 */
window.WPS = window.WPS || {};
WPS.Owl3D = (function () {
  var loading = null;
  function loadThree() {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      var s = document.createElement('script');
      var base = (document.querySelector('script[src*="owl3d.js"]') || {}).src || '';
      s.src = base ? base.replace(/owl3d\.js.*$/, 'vendor/three.min.js') : 'js/vendor/three.min.js';
      s.onload = function () { res(window.THREE); };
      s.onerror = function () { rej(new Error('three.js を読み込めませんでした')); };
      document.head.appendChild(s);
    });
    return loading;
  }
  function webglOK() {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; }
  }

  /* ---------- テクスチャ(キャンバスで描く) ---------- */
  function canvasTex(T, w, h, draw) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    var t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = 4;
    if (T.sRGBEncoding) t.encoding = T.sRGBEncoding;
    return t;
  }
  // 青緑のうろこ(重なった丸い羽)
  function scaleTex(T, base, light, dark) {
    return canvasTex(T, 512, 512, function (g, w, h) {
      g.fillStyle = dark; g.fillRect(0, 0, w, h);
      var r = 22;
      for (var row = -1; row < h / (r * 0.9) + 1; row++) {
        for (var col = -1; col < w / (r * 1.6) + 1; col++) {
          var x = col * r * 1.6 + (row % 2 ? r * 0.8 : 0), y = row * r * 0.9;
          var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.4, r * 0.1, x, y, r);
          gr.addColorStop(0, light); gr.addColorStop(0.55, base); gr.addColorStop(1, dark);
          g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
          g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1.5; g.stroke();
        }
      }
      // 細かい網目(革のような質感)
      g.globalAlpha = 0.12; g.strokeStyle = '#000';
      for (var i = 0; i < w; i += 6) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke(); g.beginPath(); g.moveTo(i, h); g.lineTo(i + h, 0); g.stroke(); }
      g.globalAlpha = 1;
    });
  }
  // 銅色の胸(細かいひし形の網目)
  function copperTex(T) {
    return canvasTex(T, 256, 256, function (g, w, h) {
      var gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#8a3b1c'); gr.addColorStop(0.5, '#b4572b'); gr.addColorStop(1, '#6e2a12');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1;
      for (var i = -h; i < w; i += 7) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke(); g.beginPath(); g.moveTo(i + h, 0); g.lineTo(i, h); g.stroke(); }
    });
  }
  // 台座の文字盤(金のリングにローマ数字)
  function dialTex(T) {
    return canvasTex(T, 1024, 1024, function (g, w, h) {
      var cx = w / 2, cy = h / 2;
      g.fillStyle = '#16181d'; g.fillRect(0, 0, w, h);
      var gr = g.createRadialGradient(cx, cy, 200, cx, cy, 500); gr.addColorStop(0, '#e9c46a'); gr.addColorStop(0.6, '#c99a3b'); gr.addColorStop(1, '#8c6420');
      g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, 470, 0, Math.PI * 2); g.arc(cx, cy, 250, 0, Math.PI * 2, true); g.fill();
      g.strokeStyle = '#5a3d0c'; g.lineWidth = 3;
      [470, 440, 300, 250].forEach(function (rr) { g.beginPath(); g.arc(cx, cy, rr, 0, Math.PI * 2); g.stroke(); });
      for (var k = 0; k < 60; k++) { var a = k / 60 * Math.PI * 2; g.lineWidth = k % 5 ? 2 : 5; g.beginPath(); g.moveTo(cx + Math.cos(a) * 440, cy + Math.sin(a) * 440); g.lineTo(cx + Math.cos(a) * (k % 5 ? 425 : 410), cy + Math.sin(a) * (k % 5 ? 425 : 410)); g.stroke(); }
      var R = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
      g.fillStyle = '#3d2a08'; g.font = 'bold 54px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      R.forEach(function (t, i) { var a = i / 12 * Math.PI * 2 - Math.PI / 2; g.save(); g.translate(cx + Math.cos(a) * 360, cy + Math.sin(a) * 360); g.rotate(a + Math.PI / 2); g.fillText(t, 0, 0); g.restore(); });
    });
  }

  /* ---------- 部品 ---------- */
  function gearShape(T, rOut, rIn, teeth, hole) {
    var s = new T.Shape(), n = teeth * 2;
    for (var i = 0; i <= n; i++) {
      var a0 = (i / n) * Math.PI * 2, a1 = ((i + 0.5) / n) * Math.PI * 2, r = i % 2 ? rIn : rOut;
      if (i === 0) s.moveTo(Math.cos(a0) * r, Math.sin(a0) * r); else s.lineTo(Math.cos(a0) * r, Math.sin(a0) * r);
      s.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
    }
    var h = new T.Path(); h.absarc(0, 0, hole, 0, Math.PI * 2, true); s.holes.push(h);
    // スポーク穴
    for (var k = 0; k < 6; k++) { var a = k / 6 * Math.PI * 2 + 0.26, p = new T.Path(); p.absarc(Math.cos(a) * (rIn * 0.6), Math.sin(a) * (rIn * 0.6), rIn * 0.18, 0, Math.PI * 2, true); s.holes.push(p); }
    return s;
  }

  function rep(t, x, y) { t.repeat.set(x, y); return t; }
  function build(T, scene) {
    var M = {
      teal: new T.MeshStandardMaterial({ map: rep(scaleTex(T, '#1e8f86', '#7fe0cf', '#0b3f3d'), 3, 2), metalness: 0.55, roughness: 0.35 }),
      tealHead: new T.MeshStandardMaterial({ map: rep(scaleTex(T, '#22a094', '#9df0de', '#0c4a46'), 3, 2), metalness: 0.55, roughness: 0.32 }),
      face: new T.MeshStandardMaterial({ color: 0xbfe0d6, metalness: 0.35, roughness: 0.4 }),
      copper: new T.MeshStandardMaterial({ map: rep(copperTex(T), 2, 2), metalness: 0.7, roughness: 0.35 }),
      gold: new T.MeshStandardMaterial({ color: 0xd4a646, metalness: 1, roughness: 0.22 }),
      brass: new T.MeshStandardMaterial({ color: 0xe0b04a, metalness: 0.9, roughness: 0.25, emissive: 0x2a1a00 }),
      dark: new T.MeshStandardMaterial({ color: 0x15171c, metalness: 0.6, roughness: 0.4 }),
      eye: new T.MeshStandardMaterial({ color: 0x050608, metalness: 0.2, roughness: 0.05 }),
      iris: new T.MeshStandardMaterial({ color: 0xe0782a, metalness: 0.4, roughness: 0.3 }),
      white: new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }),
      wood: new T.MeshStandardMaterial({ color: 0x4a2a16, metalness: 0.3, roughness: 0.55 }),
      dial: new T.MeshStandardMaterial({ map: dialTex(T), metalness: 0.65, roughness: 0.35 })
    };
    var root = new T.Group(), parts = [];
    function part(name, en, explodeVec) { var g = new T.Group(); g.userData = { name: name, en: en, ex: explodeVec, home: new T.Vector3() }; root.add(g); parts.push(g); return g; }
    function mesh(geo, mat, x, y, z, parent) { var m = new T.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); m.castShadow = true; (parent || root).add(m); return m; }

    // 台座(文字盤つき)
    var ped = part('台座', 'PEDESTAL', new T.Vector3(0, -0.5, 0));
    mesh(new T.CylinderGeometry(1.55, 1.65, 0.18, 64), M.dark, 0, -1.72, 0, ped);
    mesh(new T.CylinderGeometry(1.32, 1.4, 0.55, 64), M.dark, 0, -1.38, 0, ped);
    mesh(new T.TorusGeometry(1.36, 0.025, 8, 80), M.gold, 0, -1.2, 0, ped).rotation.x = Math.PI / 2;
    mesh(new T.TorusGeometry(1.6, 0.02, 8, 80), M.gold, 0, -1.63, 0, ped).rotation.x = Math.PI / 2;
    mesh(new T.CylinderGeometry(1.45, 1.45, 0.1, 64), M.dark, 0, -1.06, 0, ped);
    var dial = mesh(new T.CircleGeometry(1.38, 64), M.dial, 0, -1.0, 0, ped); dial.rotation.x = -Math.PI / 2;
    var key = new T.Group(); key.position.set(1.42, -1.38, 0.2); ped.add(key);
    mesh(new T.CylinderGeometry(0.03, 0.03, 0.2, 12), M.gold, 0.08, 0, 0, key).rotation.z = Math.PI / 2;
    var kt = mesh(new T.TorusGeometry(0.07, 0.02, 8, 20), M.gold, 0.22, 0.04, 0, key); kt.rotation.y = Math.PI / 2;
    var kt2 = mesh(new T.TorusGeometry(0.07, 0.02, 8, 20), M.gold, 0.22, -0.06, 0, key); kt2.rotation.y = Math.PI / 2;

    // 歯車
    var gearP = part('歯車', 'GEAR', new T.Vector3(-0.9, 0.2, 0.8));
    var gearGeo = new T.ExtrudeGeometry(gearShape(T, 0.55, 0.47, 20, 0.08), { depth: 0.07, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 1 });
    var gear = mesh(gearGeo, M.brass, -0.45, -0.94, 0.35, gearP); gear.rotation.x = -Math.PI / 2;
    mesh(new T.CylinderGeometry(0.1, 0.1, 0.1, 24), M.gold, -0.45, -0.88, 0.35, gearP);
    var gear2 = mesh(new T.ExtrudeGeometry(gearShape(T, 0.24, 0.2, 12, 0.05), { depth: 0.06, bevelEnabled: false }), M.gold, 0.3, -0.94, 0.5, gearP); gear2.rotation.x = -Math.PI / 2;

    // 止まり木
    var perch = part('止まり木', 'PERCH', new T.Vector3(0.6, -0.2, 0.3));
    var curve = new T.CatmullRomCurve3([new T.Vector3(0.3, -0.98, 0.5), new T.Vector3(0.25, -0.6, 0.3), new T.Vector3(0.05, -0.3, 0.12), new T.Vector3(-0.1, -0.15, 0.05)]);
    mesh(new T.TubeGeometry(curve, 30, 0.07, 10, false), M.wood, 0, 0, 0, perch);
    mesh(new T.SphereGeometry(0.1, 16, 12), M.gold, 0.3, -0.98, 0.5, perch);

    // 胴体
    var body = part('胴体', 'BODY', new T.Vector3(-0.35, 0, -0.5));
    var b = mesh(new T.SphereGeometry(0.62, 48, 36), M.teal, 0, 0.35, 0, body); b.scale.set(0.95, 1.15, 0.9);
    mesh(new T.TorusGeometry(0.48, 0.025, 10, 60), M.gold, 0, 0.98, 0.02, body).rotation.x = Math.PI / 2;
    // 胸のぞき窓(歯車)
    var port = mesh(new T.CylinderGeometry(0.12, 0.12, 0.04, 24), M.gold, 0.5, 0.32, 0.25, body); port.rotation.z = Math.PI / 2; port.rotation.y = 0.5;
    var pg = mesh(new T.ExtrudeGeometry(gearShape(T, 0.09, 0.075, 10, 0.02), { depth: 0.02, bevelEnabled: false }), M.brass, 0.53, 0.32, 0.27, body); pg.rotation.y = Math.PI / 2 + 0.5;

    // 胸(銅)
    var chest = part('胸部', 'CHEST', new T.Vector3(0, -0.1, 0.9));
    var c = mesh(new T.SphereGeometry(0.6, 40, 30, Math.PI / 2 - Math.PI * 0.3, Math.PI * 0.6, Math.PI * 0.3, Math.PI * 0.55), M.copper, 0, 0.35, 0.02, chest); c.scale.set(0.97, 1.16, 0.93);
    // 足
    [-0.14, 0.14].forEach(function (x) { mesh(new T.CylinderGeometry(0.035, 0.03, 0.22, 10), M.gold, x, -0.25, 0.12, chest); mesh(new T.TorusGeometry(0.05, 0.015, 8, 16, Math.PI), M.gold, x, -0.37, 0.12, chest).rotation.x = Math.PI; });

    // 翼(左右)
    var wings = part('翼', 'WING', new T.Vector3(0, 0.15, 0));
    [-1, 1].forEach(function (s) {
      var wg = new T.Group(); wg.position.set(0.5 * s, 0.38, -0.05); wg.rotation.z = 0.12 * s; wg.userData.side = s; wings.add(wg);
      var shell = mesh(new T.SphereGeometry(0.45, 32, 24, 0, Math.PI, 0, Math.PI), M.teal, 0, 0, 0, wg); shell.scale.set(0.38, 1.3, 0.95); shell.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2;
      for (var i = 0; i < 5; i++) { var f = mesh(new T.BoxGeometry(0.05, 0.32, 0.12), M.teal, 0.04 * s, -0.5 - i * 0.04, -0.15 - i * 0.07, wg); f.rotation.x = 0.35 + i * 0.05; }
    });
    wings.userData.labelObj = wings.children[1];

    // 尾羽
    var tail = part('尾羽', 'TAIL', new T.Vector3(0, -0.3, -0.9));
    for (var j = -2; j <= 2; j++) { var tf = mesh(new T.BoxGeometry(0.11, 0.55, 0.03), j % 2 ? M.teal : M.tealHead, j * 0.07, -0.25, -0.5, tail); tf.rotation.set(-0.55, 0, j * 0.12); }

    // 頭部
    var head = part('頭部', 'HEAD', new T.Vector3(0, 0.6, 0.25));
    var hg = new T.Group(); hg.position.set(0, 1.28, 0.02); head.add(hg);
    var hd = mesh(new T.SphereGeometry(0.52, 48, 36), M.tealHead, 0, 0, 0, hg); hd.scale.set(1.12, 0.95, 1);
    var faceDisc = mesh(new T.SphereGeometry(0.535, 40, 30, Math.PI / 2 - Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.2, Math.PI * 0.55), M.face, 0, -0.02, 0, hg); faceDisc.scale.set(1.12, 0.95, 1);
    // 耳の羽(角)
    [-1, 1].forEach(function (s) { var ear = mesh(new T.ConeGeometry(0.13, 0.36, 16), M.tealHead, 0.36 * s, 0.42, -0.02, hg); ear.rotation.z = -0.45 * s; mesh(new T.TorusGeometry(0.11, 0.012, 6, 20), M.gold, 0.31 * s, 0.31, -0.02, hg).rotation.set(Math.PI / 2, 0, -0.45 * s); });
    // 目(金のふち・オレンジの虹彩・黒いレンズ)
    var eyes = [];
    [-1, 1].forEach(function (s) {
      var eg = new T.Group(); eg.position.set(0.22 * s, 0.06, 0.5); eg.rotation.y = 0.38 * s; hg.add(eg);
      mesh(new T.TorusGeometry(0.15, 0.03, 12, 40), M.gold, 0, 0, 0, eg);
      mesh(new T.CircleGeometry(0.14, 32), M.iris, 0, 0, 0.005, eg);
      var pupil = mesh(new T.SphereGeometry(0.09, 24, 16), M.eye, 0, 0, 0.01, eg); pupil.scale.z = 0.5;
      mesh(new T.SphereGeometry(0.025, 10, 8), M.white, 0.03, 0.035, 0.06, eg);
      var lid = mesh(new T.SphereGeometry(0.155, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.tealHead, 0, 0, 0, eg); lid.rotation.x = Math.PI / 2; lid.scale.set(1, 1, 0.01); eyes.push(lid);
    });
    // くちばし
    var beak = mesh(new T.ConeGeometry(0.07, 0.22, 16), M.dark, 0, -0.12, 0.58, hg); beak.rotation.x = Math.PI / 2 + 0.5;
    mesh(new T.TorusGeometry(0.065, 0.014, 8, 20), M.gold, 0, -0.09, 0.53, hg).rotation.x = 0.4;

    parts.forEach(function (p) { p.userData.home.copy(p.position); });
    root.position.y = 0.15;
    scene.add(root);
    return { root: root, parts: parts, head: hg, eyes: eyes, gear: gear, gear2: gear2, wings: wings };
  }

  function mount(el, opts) {
    opts = opts || {};
    if (!el) return;
    var fallback = opts.fallback || '';
    if (!webglOK()) { el.innerHTML = fallback; return; }
    el.classList.add('owl3d');
    el.innerHTML = '<div class="owl3d-stage"></div>';
    var stage = el.querySelector('.owl3d-stage');
    loadThree().then(function (T) {
      var w = stage.clientWidth || 200, h = stage.clientHeight || 220;
      var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(w, h);
      if (T.sRGBEncoding) renderer.outputEncoding = T.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      stage.appendChild(renderer.domElement);
      var scene = new T.Scene(), cam = new T.PerspectiveCamera(32, w / h, 0.1, 50);
      cam.position.set(0, 1.0, opts.dist || 8.4); cam.lookAt(0, 0.1, 0);
      scene.add(new T.HemisphereLight(0xdfefff, 0x2a1d10, 0.75));
      var key = new T.DirectionalLight(0xfff1d6, 1.7); key.position.set(3, 5, 4); key.castShadow = true; scene.add(key);
      var rim = new T.DirectionalLight(0x6fd6ff, 0.9); rim.position.set(-4, 2, -3); scene.add(rim);
      var fill = new T.PointLight(0xffc27a, 0.6, 12); fill.position.set(-2, 0, 3); scene.add(fill);
      var m = build(T, scene), rotY = 0.35, vel = 0.004, drag = null, exploded = 0, target = 0, t0 = performance.now(), alive = true, visible = true, blinkT = 2;
      // 分解ラベル
      function setExplode(on) { target = on ? 1 : 0; el.classList.toggle('is-exploded', on); }
      // ドラッグで回転
      var cv = renderer.domElement; cv.style.touchAction = 'pan-y';
      // ドラッグで回転/動かさずにタップ(クリック)すると分解・組み立て
      cv.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, r: rotY, moved: false }; cv.setPointerCapture(e.pointerId); });
      cv.addEventListener('pointermove', function (e) { if (drag) { if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 6) drag.moved = true; if (drag.moved) { rotY = drag.r + (e.clientX - drag.x) * 0.012; vel = 0; } } });
      cv.addEventListener('pointerup', function () { var tap = drag && !drag.moved; drag = null; vel = 0.004; if (tap && opts.tapExplode !== false) setExplode(target === 0); });
      cv.setAttribute('role', 'button'); cv.setAttribute('aria-label', 'ピンポ(タップで分解・組み立て、ドラッグで回転)'); cv.tabIndex = 0;
      cv.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExplode(target === 0); } });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(el);
      function frame(now) {
        if (!alive) return;
        if (!document.body.contains(el)) { alive = false; renderer.dispose(); return; }
        requestAnimationFrame(frame);
        if (!visible) return;
        var dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
        if (!drag) rotY += vel;
        exploded += (target - exploded) * Math.min(1, dt * 5);
        m.root.rotation.y = rotY;
        var dz = (opts.dist || 8.4) * (1 + exploded * 0.35); cam.position.set(0, 1.0 + exploded * 0.6, dz); cam.lookAt(0, 0.1 + exploded * 0.25, 0);
        m.parts.forEach(function (p) { p.position.copy(p.userData.home).addScaledVector(p.userData.ex, exploded); });
        m.wings.children.forEach(function (wg) { wg.position.x = 0.5 * wg.userData.side * (1 + exploded * 0.9); wg.rotation.z = (0.12 + exploded * 0.5) * wg.userData.side; });
        var tt = now / 1000;
        m.head.rotation.z = Math.sin(tt * 0.9) * 0.06; m.head.rotation.y = Math.sin(tt * 0.5) * 0.15;
        m.gear.rotation.z = tt * 0.5; m.gear2.rotation.z = -tt * 1.1;
        blinkT -= dt; var lid = 0.01; if (blinkT < 0.15) lid = 1; if (blinkT < 0) blinkT = 2 + Math.random() * 3;
        m.eyes.forEach(function (l) { l.scale.z = lid; });
        renderer.render(scene, cam);
      }
      requestAnimationFrame(frame);
      window.addEventListener('resize', function () { var W = stage.clientWidth, Hh = stage.clientHeight; if (!W || !Hh) return; renderer.setSize(W, Hh); cam.aspect = W / Hh; cam.updateProjectionMatrix(); });
    }).catch(function () { el.innerHTML = fallback; el.classList.remove('owl3d'); });
  }
  return { mount: mount, webglOK: webglOK };
})();
