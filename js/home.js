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
