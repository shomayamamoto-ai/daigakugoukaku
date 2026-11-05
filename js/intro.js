/* オープニングムービー(約8秒)
 * 「水瓶座の水瓶から、知性の水があふれ出す」を、高級ブランドの映像の作法で表現する。
 *  ・色は3つだけ:墨に近い紺(背景)/シャンパンゴールド(線)/淡い水色の光(水)
 *  ・要素を引き算し、画面のまん中に1つだけ焦点を置く。余白を大きくとる
 *  ・線は1pxの細い線で「描かれていく」。動きはゆっくり減速し、はねない
 *  ・文字は細いセリフ体の大文字を広い字間で。1文字ずつ現れ、字間がゆっくり締まる
 *  ・水面は静かな1本の線。しずくが落ちた点から、波紋と金の粒(知性)が広がる
 * 同じタブでは1回だけ。?intro=1 で強制再生、?nointro・?notour で再生しない。
 * どこかをタップ/SKIP/Esc で飛ばせる。動きを減らす設定の端末では、静止したロゴを短く出す。
 */
(function () {
  'use strict';
  window.WPS = window.WPS || {};
  var KEY = 'wpsIntroSeen';
  var GOLD = '201, 169, 110', GOLD_HI = '236, 214, 160', AQUA = '200, 232, 242';

  function shouldPlay(force) {
    if (force) return true;
    var q = location.search;
    if (/[?&](nointro|notour)\b/.test(q)) return false;
    if (/[?&]intro=1\b/.test(q)) return true;
    try { if (sessionStorage.getItem(KEY)) return false; } catch (e) { return false; }
    return true;
  }

  var CSS = [
    'html.aq-intro-on, html.aq-intro-on body { overflow: hidden; }',
    '.aq-intro { position: fixed; inset: 0; z-index: 9999; background: #04070e; cursor: pointer; transition: opacity 1s cubic-bezier(.4, 0, .2, 1); -webkit-tap-highlight-color: transparent; }',
    '.aq-intro.out { opacity: 0; pointer-events: none; }',
    '.aq-intro canvas { position: absolute; inset: 0; display: block; }',
    '.aq-l { position: absolute; left: 0; right: 0; top: var(--aq-sy, 62%); pointer-events: none; text-align: center; }',
    '.aq-word { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); white-space: nowrap; font-family: "Cormorant Garamond", "Shippori Mincho", serif; font-weight: 300; font-size: clamp(1.9rem, 9.5vw, 4.4rem); line-height: 1; color: rgb(' + GOLD_HI + '); letter-spacing: .62em; margin-right: -.62em; transition: letter-spacing 3.2s cubic-bezier(.16, 1, .3, 1), margin 3.2s cubic-bezier(.16, 1, .3, 1); }',
    '.aq-l.on .aq-word { letter-spacing: .34em; margin-right: -.34em; }',
    '.aq-word span { display: inline-block; opacity: 0; filter: blur(6px); transform: translateY(6px); transition: opacity 1.6s cubic-bezier(.16, 1, .3, 1), filter 1.6s cubic-bezier(.16, 1, .3, 1), transform 1.6s cubic-bezier(.16, 1, .3, 1); }',
    '.aq-l.on .aq-word span { opacity: 1; filter: blur(0); transform: none; }',
    '.aq-word.rf { bottom: auto; top: 18px; transform: translateX(-50%) scaleY(-1); opacity: .16; -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 70%); mask-image: linear-gradient(to top, #000 0%, transparent 70%); }',
    '.aq-tag { position: absolute; left: 0; right: 0; top: clamp(58px, 11vw, 96px); margin: 0; font-family: "Shippori Mincho", "Noto Serif JP", serif; font-weight: 400; font-size: clamp(.78rem, 3.3vw, .98rem); letter-spacing: .5em; text-indent: .5em; color: rgba(' + AQUA + ', .78); opacity: 0; transition: opacity 2s ease 1.4s; }',
    '.aq-sub { display: block; margin-top: 14px; font-family: "Cormorant Garamond", serif; font-size: clamp(.6rem, 2.4vw, .72rem); letter-spacing: .6em; text-indent: .6em; color: rgba(' + GOLD + ', .7); }',
    '.aq-l.on .aq-tag { opacity: 1; }',
    '.aq-skip { position: absolute; right: max(18px, env(safe-area-inset-right)); bottom: max(22px, env(safe-area-inset-bottom)); padding: 8px 4px; border: 0; border-bottom: 1px solid rgba(' + GOLD + ', .45); background: none; color: rgba(' + GOLD_HI + ', .8); font-family: "Cormorant Garamond", serif; font-size: .78rem; letter-spacing: .42em; text-indent: .42em; cursor: pointer; opacity: 0; transition: opacity 1.2s ease .6s; }',
    '.aq-intro.ready .aq-skip { opacity: 1; }',
    '@media (prefers-reduced-motion: reduce) { .aq-word, .aq-word span, .aq-tag { transition: opacity .8s ease !important; filter: none !important; transform: translateX(-50%) !important; } .aq-word span { transform: none !important; } .aq-word.rf { transform: translateX(-50%) scaleY(-1) !important; } }'
  ].join('\n');
  function addAssets() {
    if (!document.getElementById('aqIntroCSS')) { var st = document.createElement('style'); st.id = 'aqIntroCSS'; st.textContent = CSS; document.head.appendChild(st); }
    if (!document.getElementById('aqIntroFont')) {
      var ln = document.createElement('link'); ln.id = 'aqIntroFont'; ln.rel = 'stylesheet';
      ln.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Shippori+Mincho:wght@400&display=swap';
      document.head.appendChild(ln);
    }
  }

  function play(opt) {
    opt = opt || {};
    if (!shouldPlay(opt.force)) { if (opt.done) opt.done(); return; }
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 無視 */ }
    addAssets();
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var word = 'AQUALIUM'.split('').map(function (c, i) { return '<span style="transition-delay:' + (i * 0.11).toFixed(2) + 's">' + c + '</span>'; }).join('');

    var ov = document.createElement('div');
    ov.className = 'aq-intro';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'オープニング:Aqualium');
    ov.innerHTML = '<canvas aria-hidden="true"></canvas>' +
      '<div class="aq-l" aria-hidden="true"><div class="aq-word">' + word + '</div><div class="aq-word rf">' + word + '</div>' +
      '<p class="aq-tag">知性が、あふれ出す。<span class="aq-sub">PERSONALIZED LEARNING</span></p></div>' +
      '<button type="button" class="aq-skip">SKIP</button>';
    document.body.appendChild(ov);
    document.documentElement.classList.add('aq-intro-on');
    var cv = ov.querySelector('canvas'), cx = cv.getContext('2d'), L = ov.querySelector('.aq-l');
    var W, H, D = Math.min(2, window.devicePixelRatio || 1), SY;
    function size() {
      W = innerWidth; H = innerHeight; SY = H * (W > H ? 0.64 : 0.6);
      cv.width = W * D; cv.height = H * D; cv.style.width = W + 'px'; cv.style.height = H + 'px'; cx.setTransform(D, 0, 0, D, 0, 0);
      L.style.setProperty('--aq-sy', SY + 'px');
    }
    size(); addEventListener('resize', size);
    setTimeout(function () { ov.classList.add('ready'); }, 50);

    var ended = false, raf = 0, T0 = 0, last = 0, DUR = reduce ? 2.6 : 8.8;
    function end() {
      if (ended) return; ended = true;
      ov.classList.add('out');
      setTimeout(function () {
        cancelAnimationFrame(raf); removeEventListener('resize', size); document.removeEventListener('keydown', onKey);
        ov.remove(); document.documentElement.classList.remove('aq-intro-on');
        if (opt.done) opt.done();
      }, 1000);
    }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') end(); }
    ov.querySelector('.aq-skip').addEventListener('click', function (e) { e.stopPropagation(); end(); });
    ov.addEventListener('click', function () { if (T0 && (performance.now() - T0) > 900) end(); });
    document.addEventListener('keydown', onKey);

    // ---------- 描画の道具 ----------
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function eio(t) { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; } // ゆっくり出てゆっくり止まる
    function eout(t) { t = clamp(t); return 1 - Math.pow(1 - t, 4); }
    function seg(t, a, b, f) { return (f || eio)((t - a) / (b - a)); }
    // フィルムの粒子(ほんのわずか)
    var grain = document.createElement('canvas'); grain.width = grain.height = 160;
    (function () { var g = grain.getContext('2d'), im = g.createImageData(160, 160); for (var i = 0; i < im.data.length; i += 4) { var v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } g.putImageData(im, 0, 0); })();
    var stars = []; for (var i = 0; i < 70; i++) stars.push({ x: Math.random(), y: Math.random() * 0.55, r: Math.random() * 0.9 + 0.2, p: Math.random() * 6.28 });

    // 水瓶(アンフォラ)の輪郭。原点=底の中心、高さ s
    function urn(s) {
      var p = new Path2D();
      p.moveTo(0, 0);
      p.bezierCurveTo(-0.07 * s, 0, -0.12 * s, -0.02 * s, -0.13 * s, -0.06 * s);
      p.bezierCurveTo(-0.30 * s, -0.20 * s, -0.36 * s, -0.42 * s, -0.33 * s, -0.58 * s);
      p.bezierCurveTo(-0.30 * s, -0.72 * s, -0.16 * s, -0.78 * s, -0.10 * s, -0.83 * s);
      p.lineTo(-0.09 * s, -0.95 * s);
      p.quadraticCurveTo(-0.15 * s, -0.97 * s, -0.16 * s, -1.0 * s);
      p.lineTo(0.16 * s, -1.0 * s);
      p.quadraticCurveTo(0.15 * s, -0.97 * s, 0.09 * s, -0.95 * s);
      p.lineTo(0.10 * s, -0.83 * s);
      p.bezierCurveTo(0.16 * s, -0.78 * s, 0.30 * s, -0.72 * s, 0.33 * s, -0.58 * s);
      p.bezierCurveTo(0.36 * s, -0.42 * s, 0.30 * s, -0.20 * s, 0.13 * s, -0.06 * s);
      p.bezierCurveTo(0.12 * s, -0.02 * s, 0.07 * s, 0, 0, 0);
      return p;
    }
    function handles(s) {
      var p = new Path2D();
      p.moveTo(-0.095 * s, -0.90 * s); p.bezierCurveTo(-0.30 * s, -0.94 * s, -0.36 * s, -0.74 * s, -0.27 * s, -0.68 * s);
      p.moveTo(0.095 * s, -0.90 * s); p.bezierCurveTo(0.30 * s, -0.94 * s, 0.36 * s, -0.74 * s, 0.27 * s, -0.68 * s);
      p.moveTo(-0.30 * s, -0.50 * s); p.quadraticCurveTo(0, -0.46 * s, 0.30 * s, -0.50 * s);
      return p;
    }
    // 線を「描いていく」(破線のずらしで、線の長さ p の割合だけ見せる)
    function drawLine(path, p, len, w, a) {
      if (p <= 0) return;
      cx.setLineDash([len * p, len]); cx.lineDashOffset = 0;
      cx.lineWidth = w; cx.strokeStyle = 'rgba(' + GOLD_HI + ',' + a + ')'; cx.stroke(path);
      cx.setLineDash([]);
    }

    var drops = [], ripples = [], dust = [], lastRip = 0;
    function frame(now) {
      if (!T0) { T0 = last = now; }
      var t = (now - T0) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now;
      // 背景:墨色に近い紺。中央をわずかに明るく、四すみを落とす
      cx.fillStyle = '#04070e'; cx.fillRect(0, 0, W, H);
      var bgA = seg(t, 0, 1.6);
      var rg = cx.createRadialGradient(W / 2, SY * 0.8, 0, W / 2, SY * 0.8, Math.max(W, H) * 0.75);
      rg.addColorStop(0, 'rgba(22, 40, 74,' + (0.85 * bgA) + ')'); rg.addColorStop(0.55, 'rgba(9, 16, 32,' + (0.9 * bgA) + ')'); rg.addColorStop(1, 'rgba(4, 7, 14, 1)');
      cx.fillStyle = rg; cx.fillRect(0, 0, W, H);
      // 星(ごくかすかに)
      stars.forEach(function (s) { cx.globalAlpha = bgA * (0.18 + 0.22 * Math.sin(t * 0.8 + s.p)); cx.fillStyle = '#e8eefc'; cx.fillRect(s.x * W, s.y * H, s.r, s.r); });
      cx.globalAlpha = 1;

      // 水面:まん中から左右へ、細い金の線が伸びる
      var ln = seg(t, 1.4, 3.6, eout), half = W * 0.42 * ln;
      if (ln > 0) {
        var lg = cx.createLinearGradient(W / 2 - half, 0, W / 2 + half, 0);
        lg.addColorStop(0, 'rgba(' + GOLD + ',0)'); lg.addColorStop(0.5, 'rgba(' + GOLD_HI + ',.85)'); lg.addColorStop(1, 'rgba(' + GOLD + ',0)');
        cx.fillStyle = lg; cx.fillRect(W / 2 - half, SY, half * 2, 1);
      }

      // 水瓶:線で描かれ、ゆっくり傾く。ロゴが出るころに静かに消える
      var S = Math.min(W * 0.34, H * 0.30), tilt = 0.62 * seg(t, 2.6, 4.0);
      var uy = SY - S * 0.62 - S * 0.25, VX = 40, VY = 8, G = 330, SP = 0.8;
      // 注いだ水が、ちょうど画面のまん中に落ちるように水瓶の位置を決める(最後の傾きで計算)
      var cF = Math.cos(0.62), sF = Math.sin(0.62), moyF = uy + 0.15 * S * sF - 1.0 * S * cF;
      var tauF = (-VY + Math.sqrt(VY * VY + 2 * G * Math.max(1, SY - moyF))) / G;
      var ux = W / 2 - (0.15 * S * cF + 1.0 * S * sF) - VX * tauF;
      // せまい画面では、水瓶が左にはみ出さないようにする(水の落ちる点が少し右へずれてもよい)
      var minX = 0.42 * S + Math.max(16, W * 0.06); if (ux < minX) ux = minX;
      var drawP = seg(t, 0.5, 2.8), urnA = (1 - seg(t, 5.2, 6.6));
      cx.save(); cx.translate(ux, uy); cx.rotate(tilt); cx.globalAlpha = urnA;
      cx.shadowColor = 'rgba(' + GOLD + ', .5)'; cx.shadowBlur = 8;
      var up = urn(S), hp = handles(S);
      drawLine(up, drawP, S * 3.4, 1.1, 0.95);
      drawLine(hp, seg(t, 1.6, 3.2), S * 2.2, 0.9, 0.7);
      // 内側のごく淡い光
      if (drawP > 0.9) { var ig = cx.createLinearGradient(-0.35 * S, 0, 0.35 * S, 0); ig.addColorStop(0, 'rgba(' + GOLD + ',0)'); ig.addColorStop(0.55, 'rgba(' + GOLD + ',' + (0.07 * (drawP - 0.9) * 10) + ')'); ig.addColorStop(1, 'rgba(' + GOLD + ',0)'); cx.fillStyle = ig; cx.fill(up); }
      cx.restore(); cx.shadowBlur = 0; cx.globalAlpha = 1;

      // 口の位置(回転後)
      var c = Math.cos(tilt), sn = Math.sin(tilt), mx = 0.15 * S, my = -1.0 * S;
      var mox = ux + mx * c - my * sn, moy = uy + mx * sn + my * c;
      // 水:口から水面まで、1本の光の糸(放物線)として注ぐ。先端が下り、最後は上から細くなって消える
      var tauHit = (-VY + Math.sqrt(VY * VY + 2 * G * Math.max(1, SY - moy))) / G;
      var head = Math.min(tauHit, Math.max(0, (t - 3.5) * SP)), tail = Math.max(0, (t - 5.0) * SP);
      if (head > tail) {
        cx.save(); cx.globalCompositeOperation = 'lighter';
        [[5, 0.06], [2.2, 0.16], [0.9, 0.75]].forEach(function (L2) {
          cx.beginPath();
          for (var k = 0; k <= 40; k++) { var tau = tail + (head - tail) * k / 40, px = mox + VX * tau, py = moy + VY * tau + 0.5 * G * tau * tau; if (!k) cx.moveTo(px, py); else cx.lineTo(px, py); }
          cx.lineWidth = L2[0]; cx.lineCap = 'round'; cx.strokeStyle = 'rgba(' + AQUA + ',' + L2[1] + ')'; cx.stroke();
        });
        cx.restore();
        // 糸の上を流れる小さな光
        if (Math.random() < 0.6) drops.push({ tau: tail, r: 0.6 + Math.random() * 0.8 });
      }
      var hitX = mox + VX * tauHit;
      if (head >= tauHit && head > tail && now - lastRip > 520) { ripples.push({ x: hitX, r: 2, a: 0.75 }); lastRip = now; }
      if (head >= tauHit && head > tail && Math.random() < 0.5) dust.push({ x: hitX + (Math.random() - 0.5) * 16, y: SY - 2, vx: (Math.random() - 0.5) * 12, vy: -10 - Math.random() * 20, a: 0.9, r: 0.4 + Math.random() * 0.9 });
      cx.globalCompositeOperation = 'lighter';
      for (var d = drops.length - 1; d >= 0; d--) {
        var p = drops[d]; p.tau += dt * SP;
        if (p.tau >= Math.min(head, tauHit)) { drops.splice(d, 1); continue; }
        var px2 = mox + VX * p.tau, py2 = moy + VY * p.tau + 0.5 * G * p.tau * p.tau;
        cx.fillStyle = 'rgba(255, 255, 255, .8)'; cx.beginPath(); cx.arc(px2, py2, p.r, 0, 6.283); cx.fill();
      }
      // 波紋(水面の上下に、うすい楕円)
      for (var r = ripples.length - 1; r >= 0; r--) {
        var q = ripples[r]; q.r += 70 * dt; q.a -= 0.22 * dt;
        if (q.a <= 0) { ripples.splice(r, 1); continue; }
        cx.strokeStyle = 'rgba(' + GOLD_HI + ',' + q.a * 0.55 + ')'; cx.lineWidth = 0.8;
        cx.beginPath(); cx.ellipse(q.x, SY, q.r, q.r * 0.09, 0, 0, 6.283); cx.stroke();
      }
      // 金の粒(知性):水面から立ちのぼって消える
      for (var u = dust.length - 1; u >= 0; u--) {
        var g = dust[u]; g.x += g.vx * dt; g.y += g.vy * dt; g.vy *= 0.995; g.a -= 0.22 * dt;
        if (g.a <= 0) { dust.splice(u, 1); continue; }
        cx.fillStyle = 'rgba(' + GOLD_HI + ',' + g.a * 0.8 + ')'; cx.beginPath(); cx.arc(g.x, g.y, g.r, 0, 6.283); cx.fill();
      }
      cx.globalCompositeOperation = 'source-over';

      // 文字:水瓶が消えはじめるころ、水面の上に現れる(下には映りこみ)
      if (t > 5.9 && !L.classList.contains('on')) L.classList.add('on');
      // 四すみを落とす+フィルムの粒子
      var vg = cx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)');
      cx.fillStyle = vg; cx.fillRect(0, 0, W, H);
      cx.globalAlpha = 0.035; cx.globalCompositeOperation = 'overlay';
      var ox = Math.random() * 160, oy = Math.random() * 160;
      for (var gx = -ox; gx < W; gx += 160) for (var gy = -oy; gy < H; gy += 160) cx.drawImage(grain, gx, gy);
      cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over';

      if (t > DUR) { end(); return; }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduce) {
        cx.fillStyle = '#04070e'; cx.fillRect(0, 0, W, H);
        cx.fillStyle = 'rgba(' + GOLD_HI + ',.8)'; cx.fillRect(W * 0.2, SY, W * 0.6, 1);
        L.classList.add('on'); T0 = performance.now();
        setTimeout(end, DUR * 1000);
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    // 書体の読みこみを少しだけ待つ(最大0.8秒)
    var fontsReady = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('300 40px "Cormorant Garamond"'), document.fonts.load('16px "Shippori Mincho"')]) : Promise.resolve();
    Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 800); })]).then(start, start);
  }

  WPS.Intro = { play: play };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { play(); }); else play();
})();
