/* ホームページの動き(メニュー開閉・カルーセル・スクロール表示) */
(function () {
  // スマホのメニュー開閉
  var btn = document.querySelector('.hd-menu');
  var nav = document.getElementById('gnav');
  function close() { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function () {
    var open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });

  // カルーセル(矢印・ドット・スワイプ)
  document.querySelectorAll('[data-carousel]').forEach(function (car) {
    var track = car.querySelector('.car-track');
    var items = track.children;
    var dots = car.querySelector('.car-dots');
    function step() { return items[0].getBoundingClientRect().width + 18; }
    function pages() { return Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / step()) + 1); }
    function build() {
      dots.innerHTML = '';
      for (var i = 0; i < pages(); i++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('aria-label', (i + 1) + '枚目へ');
        (function (k) { d.addEventListener('click', function () { track.scrollTo({ left: k * step(), behavior: 'smooth' }); }); })(i);
        dots.appendChild(d);
      }
      update();
    }
    function update() {
      var idx = Math.round(track.scrollLeft / step());
      Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === idx); });
    }
    car.querySelector('.prev').addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    car.querySelector('.next').addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', build);
    build();
  });

  // スクロールでふわっと表示
  var els = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
})();

// 3Dのピンポ(機械じかけのフクロウ)。WebGL が使えないときは、もとの絵のまま
(function () {
  function go() {
    if (!window.WPS || !WPS.Owl3D) return;
    [['owlHero', false, 7.6], ['owlProf', true, 8.4]].forEach(function (x) {
      var el = document.getElementById(x[0]); if (!el) return;
      var fb = el.innerHTML; el.innerHTML = '';
      WPS.Owl3D.mount(el, { explode: x[1], fallback: fb, dist: x[2] });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();

// 「ページの先頭へ」(▲)とロゴ:ヘッダーは画面に固定されているため、#top へのリンクだけではスクロールしない。明示的に一番上へ戻す
(function () {
  // タップ直後に反応するよう pointerup でも動かす(click が遅れたり、取りこぼされたりする端末向け)
  var lastUp = 0;
  document.addEventListener('pointerup', function (e) {
    var a = e.target.closest && e.target.closest('.float-top');
    if (!a || e.pointerType === 'mouse') return;
    lastUp = Date.now(); e.preventDefault();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#top"]');
    if (a && Date.now() - lastUp < 600) { e.preventDefault(); return; }
    if (!a) return;
    e.preventDefault();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  });
})();

// ハイライト:丸いアイコン/一覧を押すと、実際の画面をストーリー形式で表示する
(function () {
  var dataEl = document.getElementById('hlData'); if (!dataEl) return;
  var HL; try { HL = JSON.parse(dataEl.textContent); } catch (e) { return; }
  var DUR = 5000, hi = 0, si = 0, timer = null, start = 0, left = DUR, paused = false, lastFocus = null;
  var sv = document.createElement('div'); sv.className = 'sv'; sv.hidden = true;
  sv.setAttribute('role', 'dialog'); sv.setAttribute('aria-modal', 'true'); sv.setAttribute('aria-label', 'アプリの画面');
  sv.innerHTML = '<div class="sv-box"><div class="sv-bars"></div><div class="sv-head"><img alt=""><b></b><button type="button" class="sv-x" aria-label="閉じる">×</button></div>' +
    '<div class="sv-stage"><img alt=""></div><div class="sv-cap" aria-live="polite"><b></b><p></p></div>' +
    '<button type="button" class="sv-tap prev" aria-label="前の画面"></button><button type="button" class="sv-tap next" aria-label="次の画面"></button><p class="sv-hint">右をタップで次へ・左で前へ・長押しで一時停止</p></div>';
  document.body.appendChild(sv);
  var bars = sv.querySelector('.sv-bars'), img = sv.querySelector('.sv-stage img'), headImg = sv.querySelector('.sv-head img'), headT = sv.querySelector('.sv-head b'), capT = sv.querySelector('.sv-cap b'), capP = sv.querySelector('.sv-cap p');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function preload(h) { (HL[h] || { slides: [] }).slides.forEach(function (x) { var i = new Image(); i.src = x.img; }); }
  function show() {
    var h = HL[hi], x = h.slides[si];
    bars.innerHTML = h.slides.map(function (_, k) { return '<i class="' + (k < si ? 'done' : '') + '"><b></b></i>'; }).join('');
    headImg.src = h.slides[0].img.replace('.webp', '_s.webp');
    headT.innerHTML = ''; headT.appendChild(document.createTextNode(h.name)); var sm = document.createElement('small'); sm.textContent = (si + 1) + ' / ' + h.slides.length; headT.appendChild(sm);
    img.src = x.img; img.alt = h.name + ':' + x.t; capT.textContent = x.t; capP.textContent = x.d;
    var btn = document.querySelector('.hlc[data-hl="' + hi + '"]'); if (btn) btn.classList.add('seen');
    left = DUR; run();
    if (si === 0) preload(hi + 1);
  }
  function run() {
    clearTimeout(timer); var bar = bars.children[si] && bars.children[si].firstChild; if (!bar) return;
    start = Date.now();
    var done = (DUR - left) / DUR * 100;
    bar.style.transition = 'none'; bar.style.width = done + '%';
    if (paused) return;
    void bar.offsetWidth;
    bar.style.transition = reduce ? 'none' : 'width ' + left + 'ms linear'; bar.style.width = '100%';
    timer = setTimeout(next, left);
  }
  function pause() { if (paused) return; paused = true; clearTimeout(timer); left = Math.max(0, left - (Date.now() - start)); var bar = bars.children[si] && bars.children[si].firstChild; if (bar) { var w = getComputedStyle(bar).width; bar.style.transition = 'none'; bar.style.width = w; } }
  function resume() { if (!paused) return; paused = false; run(); }
  function next() { var h = HL[hi]; if (si < h.slides.length - 1) { si++; show(); } else if (hi < HL.length - 1) { hi++; si = 0; show(); } else close(); }
  function prev() { if (si > 0) { si--; show(); } else if (hi > 0) { hi--; si = HL[hi].slides.length - 1; show(); } else show(); }
  function open(h) { lastFocus = document.activeElement; hi = h; si = 0; paused = false; sv.hidden = false; document.body.classList.add('sv-open'); show(); sv.querySelector('.sv-x').focus(); }
  function close() { clearTimeout(timer); sv.hidden = true; document.body.classList.remove('sv-open'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-hl]'); if (b) open(+b.getAttribute('data-hl')); });
  sv.querySelector('.sv-x').addEventListener('click', close);
  var holdT = null, held = false;
  ['prev', 'next'].forEach(function (k) {
    var b = sv.querySelector('.sv-tap.' + k);
    b.addEventListener('pointerdown', function () { held = false; holdT = setTimeout(function () { held = true; pause(); }, 250); });
    b.addEventListener('pointerup', function () { clearTimeout(holdT); if (held) { resume(); } });
    b.addEventListener('pointerleave', function () { clearTimeout(holdT); if (held) { held = false; resume(); } });
    b.addEventListener('click', function () { if (held) { held = false; return; } paused = false; (k === 'next' ? next : prev)(); });
  });
  sv.addEventListener('click', function (e) { if (e.target === sv) close(); });
  document.addEventListener('keydown', function (e) {
    if (sv.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') { paused = false; next(); } else if (e.key === 'ArrowLeft') { paused = false; prev(); }
    else if (e.key === 'Tab') { var f = [].slice.call(sv.querySelectorAll('button')); var i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus(); }
  });
  // 下にスワイプで閉じる
  var y0 = null;
  sv.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; }, { passive: true });
  sv.addEventListener('touchend', function (e) { if (y0 !== null && e.changedTouches[0].clientY - y0 > 90) close(); y0 = null; }, { passive: true });
  document.addEventListener('visibilitychange', function () { if (!sv.hidden) { if (document.hidden) pause(); else resume(); } });
})();
