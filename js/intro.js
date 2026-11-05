/* オープニングムービー:水瓶座の水瓶から、知性の水があふれ出す(約7秒)
 * ・同じタブでは1回だけ流す(sessionStorage)。?intro=1 で強制再生、?nointro で再生しない
 * ・どこかをタップ/「スキップ」/Esc で飛ばせる。動きを減らす設定の端末では、ロゴだけを短く出す
 */
(function () {
  'use strict';
  window.WPS = window.WPS || {};
  var KEY = 'wpsIntroSeen';
  var GLYPHS = ['A', 'π', 'Σ', 'あ', '文', '√', 'x²', '∞', 'e', 'Δ', '漢', 'α', 'H₂O', '∫', '史', 'λ', 'ε', 'Ω', '詩', '?'];
  // 水瓶座の星(画面に合わせてならべた模式図)
  var STARS = [[0.70, 0.16], [0.76, 0.12], [0.82, 0.15], [0.86, 0.22], [0.79, 0.27], [0.74, 0.33], [0.80, 0.39], [0.88, 0.36], [0.68, 0.24]];
  var LINES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8], [8, 4]];

  function shouldPlay(force) {
    if (force) return true;
    var q = location.search;
    if (/[?&]nointro\b/.test(q) || /[?&]notour\b/.test(q)) return false;
    if (/[?&]intro=1\b/.test(q)) return true;
    try { if (sessionStorage.getItem(KEY)) return false; } catch (e) { /* 使えない環境では毎回流さない */ return false; }
    return true;
  }

  var CSS = 'html.aq-intro-on, html.aq-intro-on body { overflow: hidden; } .aq-intro { position: fixed; inset: 0; z-index: 9999; background: #020b1f; cursor: pointer; transition: opacity .6s ease; } .aq-intro.out { opacity: 0; pointer-events: none; } .aq-intro canvas { position: absolute; inset: 0; display: block; } .aq-intro-logo { position: absolute; left: 50%; top: 84%; transform: translate(-50%, -50%) scale(.96); text-align: center; color: #fff; opacity: 0; transition: opacity 1.1s ease, transform 1.4s cubic-bezier(.2, .8, .2, 1); pointer-events: none; width: min(92vw, 640px); } .aq-intro-logo.on { opacity: 1; transform: translate(-50%, -50%) scale(1); } .aq-intro-logo b { display: block; font-family: \'Allura\', cursive; font-weight: 400; font-size: clamp(3.6rem, 17vw, 7.5rem); line-height: 1.05; letter-spacing: .01em;   background: linear-gradient(100deg, #ffffff 0%, #bfe9ff 35%, #ffffff 50%, #8fd6ff 70%, #ffffff 100%); background-size: 220% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;   filter: drop-shadow(0 0 18px rgba(120, 210, 255, .55)); animation: aqShine 2.6s ease-in-out .4s infinite; } .aq-intro-logo small { display: block; margin-top: 6px; font-size: clamp(.85rem, 3.6vw, 1.05rem); letter-spacing: .32em; color: #cfe6ff; font-weight: 500; } @keyframes aqShine { 0% { background-position: 100% 0; } 100% { background-position: -120% 0; } } .aq-intro-skip { position: absolute; right: max(14px, env(safe-area-inset-right)); bottom: max(18px, env(safe-area-inset-bottom)); padding: 8px 18px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .35); background: rgba(2, 11, 31, .45); color: #e6f0ff; font: inherit; font-size: .85rem; letter-spacing: .1em; cursor: pointer; } @media (prefers-reduced-motion: reduce) { .aq-intro-logo b { animation: none; } }';
  function addCSS() { if (document.getElementById('aqIntroCSS')) return; var st = document.createElement('style'); st.id = 'aqIntroCSS'; st.textContent = CSS; document.head.appendChild(st); }
  function play(opt) {
    opt = opt || {};
    if (!shouldPlay(opt.force)) { if (opt.done) opt.done(); return; }
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 無視 */ }
    addCSS();
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    var ov = document.createElement('div');
    ov.className = 'aq-intro';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'オープニング');
    ov.innerHTML = '<canvas aria-hidden="true"></canvas>' +
      '<div class="aq-intro-logo"><b>Aqualium</b><small>知性が、あふれ出す。</small></div>' +
      '<button type="button" class="aq-intro-skip">スキップ</button>';
    document.body.appendChild(ov);
    document.documentElement.classList.add('aq-intro-on');
    var cv = ov.querySelector('canvas'), cx = cv.getContext('2d'), logo = ov.querySelector('.aq-intro-logo');
    var W = 0, H = 0, D = Math.min(2, window.devicePixelRatio || 1);
    function size() { W = innerWidth; H = innerHeight; cv.width = W * D; cv.height = H * D; cv.style.width = W + 'px'; cv.style.height = H + 'px'; cx.setTransform(D, 0, 0, D, 0, 0); }
    size(); addEventListener('resize', size);

    var ended = false, raf = 0, T0 = performance.now(), DUR = reduce ? 1.8 : 7.2;
    function end() {
      if (ended) return; ended = true;
      ov.classList.add('out');
      setTimeout(function () {
        cancelAnimationFrame(raf); removeEventListener('resize', size); document.removeEventListener('keydown', onKey);
        ov.remove(); document.documentElement.classList.remove('aq-intro-on');
        if (opt.done) opt.done();
      }, 600);
    }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') end(); }
    ov.querySelector('.aq-intro-skip').addEventListener('click', function (e) { e.stopPropagation(); end(); });
    ov.addEventListener('click', function () { if ((performance.now() - T0) > 800) end(); });
    document.addEventListener('keydown', onKey);

    if (reduce) {
      cx.fillStyle = '#04143a'; cx.fillRect(0, 0, W, H);
      logo.classList.add('on');
      setTimeout(end, DUR * 1000);
      return;
    }

    // 背景の星
    var bg = []; for (var i = 0; i < 140; i++) bg.push({ x: Math.random(), y: Math.random() * 0.8, r: Math.random() * 1.3 + 0.2, p: Math.random() * 6.28 });
    var drops = [], glyphs = [], last = T0;
    function ease(t) { return t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t); }
    function seg(t, a, b) { return ease((t - a) / (b - a)); }

    // 水瓶(アンフォラ)の形。原点=底の中心、高さ1
    function urnPath(s) {
      cx.beginPath();
      cx.moveTo(-0.16 * s, 0);
      cx.bezierCurveTo(-0.20 * s, -0.08 * s, -0.42 * s, -0.30 * s, -0.40 * s, -0.55 * s);
      cx.bezierCurveTo(-0.38 * s, -0.75 * s, -0.20 * s, -0.80 * s, -0.13 * s, -0.84 * s);
      cx.lineTo(-0.12 * s, -0.95 * s); cx.lineTo(-0.20 * s, -1.0 * s); cx.lineTo(0.20 * s, -1.0 * s); cx.lineTo(0.12 * s, -0.95 * s);
      cx.lineTo(0.13 * s, -0.84 * s);
      cx.bezierCurveTo(0.20 * s, -0.80 * s, 0.38 * s, -0.75 * s, 0.40 * s, -0.55 * s);
      cx.bezierCurveTo(0.42 * s, -0.30 * s, 0.20 * s, -0.08 * s, 0.16 * s, 0);
      cx.closePath();
    }
    function drawUrn(x, y, s, ang, alpha) {
      cx.save(); cx.translate(x, y); cx.rotate(ang); cx.globalAlpha = alpha;
      var g = cx.createLinearGradient(-0.4 * s, 0, 0.4 * s, 0);
      g.addColorStop(0, '#7a5a1e'); g.addColorStop(0.45, '#e7c46a'); g.addColorStop(0.6, '#fff1c2'); g.addColorStop(1, '#8a6624');
      urnPath(s); cx.fillStyle = g; cx.shadowColor = 'rgba(255, 210, 120, .55)'; cx.shadowBlur = 24; cx.fill(); cx.shadowBlur = 0;
      // 取っ手
      cx.strokeStyle = '#d8b25a'; cx.lineWidth = 0.035 * s;
      cx.beginPath(); cx.moveTo(-0.14 * s, -0.88 * s); cx.bezierCurveTo(-0.38 * s, -0.95 * s, -0.46 * s, -0.70 * s, -0.36 * s, -0.66 * s); cx.stroke();
      cx.beginPath(); cx.moveTo(0.14 * s, -0.88 * s); cx.bezierCurveTo(0.38 * s, -0.95 * s, 0.46 * s, -0.70 * s, 0.36 * s, -0.66 * s); cx.stroke();
      // 模様(細い金の帯と、口のふちの光)
      cx.strokeStyle = 'rgba(120, 84, 24, .55)'; cx.lineWidth = 0.012 * s;
      [-0.62, -0.47, -0.24].forEach(function (yy, k) { var w = [0.385, 0.405, 0.33][k]; cx.beginPath(); cx.moveTo(-w * s, yy * s); cx.quadraticCurveTo(0, (yy + 0.03) * s, w * s, yy * s); cx.stroke(); });
      cx.strokeStyle = 'rgba(255, 246, 214, .85)'; cx.lineWidth = 0.018 * s;
      cx.beginPath(); cx.moveTo(-0.2 * s, -1.0 * s); cx.lineTo(0.2 * s, -1.0 * s); cx.stroke();
      cx.restore();
    }
    // 回転したときの、口の位置と向き
    function mouth(x, y, s, ang) {
      var mx = 0.20 * s, my = -1.0 * s, c = Math.cos(ang), sn = Math.sin(ang);
      return { x: x + mx * c - my * sn, y: y + mx * sn + my * c, dx: c, dy: sn };
    }

    function frame(now) {
      var t = (now - T0) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now;
      // 夜空
      var sky = cx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#020b1f'); sky.addColorStop(0.55, '#04143a'); sky.addColorStop(1, '#0a2a6a');
      cx.fillStyle = sky; cx.fillRect(0, 0, W, H);
      bg.forEach(function (b) { cx.globalAlpha = 0.35 + 0.35 * Math.sin(t * 2 + b.p); cx.fillStyle = '#cfe3ff'; cx.beginPath(); cx.arc(b.x * W, b.y * H, b.r, 0, 6.28); cx.fill(); });
      cx.globalAlpha = 1;
      // 水瓶座の線と星
      var cs = seg(t, 0.2, 1.6);
      cx.strokeStyle = 'rgba(140, 190, 255, ' + (0.45 * cs) + ')'; cx.lineWidth = 1;
      LINES.forEach(function (l, j) {
        var p = Math.min(1, Math.max(0, cs * LINES.length - j));
        if (p <= 0) return;
        var a = STARS[l[0]], b = STARS[l[1]];
        cx.beginPath(); cx.moveTo(a[0] * W, a[1] * H); cx.lineTo((a[0] + (b[0] - a[0]) * p) * W, (a[1] + (b[1] - a[1]) * p) * H); cx.stroke();
      });
      STARS.forEach(function (s0) { cx.globalAlpha = cs; cx.fillStyle = '#fff'; cx.shadowColor = '#8fd0ff'; cx.shadowBlur = 10; cx.beginPath(); cx.arc(s0[0] * W, s0[1] * H, 2.2, 0, 6.28); cx.fill(); });
      cx.shadowBlur = 0; cx.globalAlpha = 1;

      // 水面(だんだん上がる)
      var level = H * (0.97 - 0.27 * seg(t, 2.4, 5.6));
      // 水瓶
      var S = Math.min(W, H) * 0.34, ux = W * (W > H ? 0.36 : 0.30), uy = H * 0.50;
      var ang = 0.95 * seg(t, 1.0, 2.2);
      drawUrn(ux, uy + (1 - seg(t, 0.6, 1.6)) * 30, S, ang, seg(t, 0.6, 1.6) * (1 - 0.35 * seg(t, 4.6, 5.8)));
      // 水の流れを出す
      if (t > 1.9 && t < 5.4) {
        var m = mouth(ux, uy, S, ang), n = Math.round(110 * dt * 60 / 60 * (t < 2.3 ? (t - 1.9) / 0.4 : 1));
        for (var q = 0; q < n; q++) {
          var sp = 140 + Math.random() * 90;
          drops.push({ x: m.x + (Math.random() - 0.5) * 8, y: m.y + (Math.random() - 0.5) * 6, vx: m.dx * sp * 0.55 + (Math.random() - 0.5) * 25, vy: m.dy * sp * 0.3 + Math.random() * 20, r: Math.random() * 2.4 + 1, life: 1 });
        }
        if (Math.random() < dt * 9) glyphs.push({ ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x: m.x, y: m.y, vx: 60 + Math.random() * 50, vy: -10 + Math.random() * 20, a: 0, s: 12 + Math.random() * 12, state: 0 });
      }
      // しずく
      cx.globalCompositeOperation = 'lighter';
      for (var d = drops.length - 1; d >= 0; d--) {
        var p0 = drops[d];
        p0.vy += 520 * dt; p0.x += p0.vx * dt; p0.y += p0.vy * dt;
        if (p0.y > level) {
          if (!p0.sp && Math.random() < 0.25) { for (var z = 0; z < 2; z++) drops.push({ x: p0.x, y: level, vx: (Math.random() - 0.5) * 120, vy: -120 - Math.random() * 120, r: 1 + Math.random(), life: 0.6, sp: 1 }); }
          drops.splice(d, 1); continue;
        }
        if (p0.sp) { p0.life -= dt; if (p0.life <= 0) { drops.splice(d, 1); continue; } }
        cx.fillStyle = 'rgba(90, 200, 255, ' + (p0.sp ? p0.life : 0.55) + ')';
        cx.beginPath(); cx.arc(p0.x, p0.y, p0.r, 0, 6.28); cx.fill();
      }
      cx.globalCompositeOperation = 'source-over';
      // 水面と波
      var wg = cx.createLinearGradient(0, level - 20, 0, H);
      wg.addColorStop(0, 'rgba(56, 189, 248, .85)'); wg.addColorStop(0.4, 'rgba(17, 70, 214, .9)'); wg.addColorStop(1, 'rgba(4, 20, 58, 1)');
      cx.fillStyle = wg; cx.beginPath(); cx.moveTo(0, H);
      for (var x = 0; x <= W; x += 8) cx.lineTo(x, level + Math.sin(x * 0.018 + t * 2.4) * 6 + Math.sin(x * 0.041 - t * 3.1) * 3);
      cx.lineTo(W, H); cx.closePath(); cx.fill();
      cx.strokeStyle = 'rgba(200, 240, 255, .6)'; cx.lineWidth = 1.5; cx.beginPath();
      for (var x2 = 0; x2 <= W; x2 += 8) { var yy = level + Math.sin(x2 * 0.018 + t * 2.4) * 6 + Math.sin(x2 * 0.041 - t * 3.1) * 3; if (!x2) cx.moveTo(x2, yy); else cx.lineTo(x2, yy); }
      cx.stroke();
      // 知性の文字:水といっしょに落ち、水面から光ってうかび上がる
      cx.textAlign = 'center'; cx.textBaseline = 'middle';
      for (var gI = glyphs.length - 1; gI >= 0; gI--) {
        var g = glyphs[gI];
        if (g.state === 0) { g.vy += 480 * dt; g.x += g.vx * dt; g.y += g.vy * dt; g.a = Math.min(1, g.a + dt * 3); if (g.y > level) { g.state = 1; g.vy = -30 - Math.random() * 30; g.vx = (Math.random() - 0.5) * 30; } }
        else { g.y += g.vy * dt; g.x += g.vx * dt; g.vy -= 6 * dt; g.a -= dt * 0.35; if (g.a <= 0) { glyphs.splice(gI, 1); continue; } }
        cx.globalAlpha = Math.max(0, g.a); cx.fillStyle = '#e9f7ff'; cx.shadowColor = '#7fdcff'; cx.shadowBlur = 14;
        cx.font = '700 ' + g.s + 'px "Zen Kaku Gothic New", sans-serif'; cx.fillText(g.ch, g.x, g.y);
      }
      cx.shadowBlur = 0; cx.globalAlpha = 1;
      // ロゴの前に、まわりを少し暗くして光を当てる
      var lo = seg(t, 4.3, 5.4);
      if (lo > 0) {
        var rg = cx.createRadialGradient(W / 2, H * 0.84, 0, W / 2, H * 0.84, Math.max(W, H) * 0.6);
        rg.addColorStop(0, 'rgba(120, 200, 255, ' + (0.18 * lo) + ')'); rg.addColorStop(1, 'rgba(2, 11, 31, ' + (0.45 * lo) + ')');
        cx.fillStyle = rg; cx.fillRect(0, 0, W, H);
      }
      if (t > 4.3 && !logo.classList.contains('on')) logo.classList.add('on');
      if (t > DUR) { end(); return; }
      raf = requestAnimationFrame(frame);
    }
    var go = function () { T0 = last = performance.now(); raf = requestAnimationFrame(frame); };
    if (document.fonts && document.fonts.load) Promise.race([document.fonts.load('64px Allura'), new Promise(function (r) { setTimeout(r, 400); })]).then(go, go); else go();
  }

  WPS.Intro = { play: play };
  function boot() { play(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
