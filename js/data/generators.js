/*
 * 問題の自動生成
 * ------------------------------------------------------------
 * 数学・情報・理科の計算・地理の時差などは、数字を変えて
 * 何問でも作れるようにしています。
 * 同じ「種(シード)」からは必ず同じ問題が作られるため、
 * 単語帳で「忘れかけた頃に同じ問題をもう一度」出すこともできます。
 *
 * 各関数は [思考レベル, 問題文, [選択肢(1つ目が正解)], 解説] を返します。
 */
window.WPS = window.WPS || {};

(function () {
  /* ---------- 道具 ---------- */
  function rng(seed) { // mulberry32
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function nz(r, a, b) { var v; do { v = ri(r, a, b); } while (v === 0); return v; }
  function pk(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function num(n) { return String(Math.round(n * 1000) / 1000).replace('-', '-'); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function frac(n, d) { var g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; }
  // 係数つきの項(先頭かどうかで符号の書き方を変える)
  function term(c, v, first) {
    if (c === 0) return '';
    var abs = Math.abs(c);
    var body = (abs === 1 && v) ? v : abs + v;
    if (first) return (c < 0 ? '-' : '') + body;
    return (c < 0 ? '-' : '＋') + body;
  }
  function poly(list) { // [[係数, 文字], ...]
    var out = '', first = true;
    list.forEach(function (p) { var t = term(p[0], p[1], first); if (t) { out += t; first = false; } });
    return out || '0';
  }
  // 正解＋候補から、重複のない4択を作る
  function choices(correct, cands, fallback) {
    var out = [String(correct)];
    cands.concat(fallback || []).forEach(function (c) {
      c = String(c);
      if (out.length < 4 && out.indexOf(c) < 0) out.push(c);
    });
    // 足りなければ、正解の中の数字を少しずらした「もっともらしい誤答」で補う
    var shifts = [1, -1, 2, -2, 3, -3, 5, 10, -10, 20];
    for (var k = 0; out.length < 4 && k < shifts.length * 3; k++) {
      var sh = shifts[k % shifts.length], idx = Math.floor(k / shifts.length);
      var cnt = -1;
      var f = String(correct).replace(/\d+(\.\d+)?/g, function (m) {
        cnt++;
        return cnt === idx ? String(Math.abs(Math.round((+m + sh) * 1000) / 1000)) : m;
      });
      if (out.indexOf(f) < 0 && f !== String(correct)) out.push(f);
    }
    return out;
  }
  function numChoices(ans, cands) {
    return choices(num(ans), cands.map(num), [num(ans + 1), num(ans - 1), num(ans + 2), num(ans * 2 + 1)]);
  }

  var G = {};

  /* ---------- 中学数学 ---------- */
  G.m_m1 = function (r) {
    var a = nz(r, -9, 9), b = nz(r, -9, 9), op = pk(r, ['＋', '-', '×']);
    var ans = op === '＋' ? a + b : op === '-' ? a - b : a * b;
    var alt = op === '＋' ? a - b : op === '-' ? a + b : -(a * b);
    return [1, '(' + a + ')' + op + '(' + b + ') を計算すると?', numChoices(ans, [-ans, alt, Math.abs(a) + Math.abs(b)]),
      op === '×' ? '符号は、マイナスが偶数個ならプラス、奇数個ならマイナスです。答えは ' + ans + ' です。'
        : 'かっこを外して符号を整理します。答えは ' + ans + ' です。'];
  };
  G.m_m2 = function (r) {
    var x = ri(r, -6, 6), a = ri(r, 3, 8), c = ri(r, 1, a - 1), b = ri(r, -9, 9);
    var d = (a - c) * x + b;
    return [2, poly([[a, 'x'], [b, '']]) + '＝' + poly([[c, 'x'], [d, '']]) + ' を解くと?',
      choices('x＝' + x, ['x＝' + (-x), 'x＝' + (x + 1), 'x＝' + (x - 1), 'x＝' + (x + 2)]),
      'x の項を左辺、数を右辺に移項すると ' + poly([[a - c, 'x']]) + '＝' + (d - b) + '。両辺を ' + (a - c) + ' でわって x＝' + x + ' です。'];
  };
  G.m_m3 = function (r) {
    var a = nz(r, -5, 5), x0 = ri(r, 1, 5), x1;
    do { x1 = nz(r, -6, 6); } while (x1 === x0);
    var y0 = a * x0;
    return [2, 'y は x に比例し、x＝' + x0 + ' のとき y＝' + y0 + '。x＝' + x1 + ' のときの y は?',
      numChoices(a * x1, [-a * x1, y0 + x1, a + x1]),
      'y＝ax に代入して a＝' + a + '。y＝' + a + '×(' + x1 + ')＝' + (a * x1) + ' です。'];
  };
  G.m_m4 = function (r) {
    var x = ri(r, -5, 5), y = ri(r, -5, 5);
    var a1 = ri(r, 1, 4), b1 = ri(r, 1, 4), a2 = ri(r, 1, 4), b2 = -ri(r, 1, 4);
    var c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    function s(xx, yy) { return 'x＝' + xx + ', y＝' + yy; }
    return [2, poly([[a1, 'x'], [b1, 'y']]) + '＝' + c1 + '、' + poly([[a2, 'x'], [b2, 'y']]) + '＝' + c2 + ' を解くと?',
      choices(s(x, y), [s(y, x), s(-x, y), s(x, -y), s(x + 1, y - 1)]),
      'どちらかの文字の係数をそろえて消去(加減法)すると、x＝' + x + '、y＝' + y + ' になります。代入して確かめましょう。'];
  };
  G.m_m5 = function (r) {
    var m = nz(r, -4, 4), b = ri(r, -6, 6), x1 = ri(r, -3, 1), x2 = x1 + ri(r, 1, 4);
    var y1 = m * x1 + b, y2 = m * x2 + b;
    function f(mm, bb) { return 'y＝' + poly([[mm, 'x'], [bb, '']]); }
    return [2, '2点(' + x1 + ', ' + y1 + ')、(' + x2 + ', ' + y2 + ')を通る直線の式は?',
      choices(f(m, b), [f(-m, b), f(m, -b), f(m, b + 1), f(m + 1, b)]),
      '傾きは (' + y2 + '-(' + y1 + '))÷(' + x2 + '-(' + x1 + '))＝' + m + '。1点を代入して切片 ' + b + ' を求めます。'];
  };
  G.m_m7 = function (r) {
    var p = nz(r, -8, 8), q = nz(r, -8, 8);
    var f1 = function (pp, qq) { return poly([[1, 'x²'], [pp + qq, 'x'], [pp * qq, '']]); };
    var fac = function (pp, qq) { return '(' + poly([[1, 'x'], [pp, '']]) + ')(' + poly([[1, 'x'], [qq, '']]) + ')'; };
    if (r() < 0.5) {
      return [2, fac(p, q) + ' を展開すると?', choices(f1(p, q), [f1(-p, -q), poly([[1, 'x²'], [p * q, '']]), poly([[1, 'x²'], [p + q, 'x'], [-(p * q), '']])]),
        '(x＋a)(x＋b)＝x²＋(a＋b)x＋ab を使います。'];
    }
    return [2, f1(p, q) + ' を因数分解すると?', choices(fac(p, q), [fac(-p, -q), fac(p, -q), fac(-p, q)]),
      'たして ' + (p + q) + '、かけて ' + (p * q) + ' になる2数は ' + p + ' と ' + q + ' です。'];
  };
  G.m_m8 = function (r) {
    var k = ri(r, 2, 6), m = pk(r, [2, 3, 5, 6, 7]);
    return [2, '√' + (k * k * m) + ' を簡単にすると?', choices(k + '√' + m, [m + '√' + k, (k * k) + '√' + m, (k + 1) + '√' + m, k + '√' + (m + 1)]),
      (k * k * m) + '＝' + (k * k) + '×' + m + ' なので、√ の外に ' + k + ' を出して ' + k + '√' + m + ' です。'];
  };
  G.m_m9 = function (r) {
    var p = nz(r, -7, 7), q;
    do { q = nz(r, -7, 7); } while (q === p);
    var lo = Math.min(p, q), hi = Math.max(p, q);
    function s(a, b) { return 'x＝' + Math.min(a, b) + ', ' + Math.max(a, b); }
    return [2, poly([[1, 'x²'], [-(p + q), 'x'], [p * q, '']]) + '＝0 を解くと?',
      choices(s(lo, hi), [s(-lo, -hi), s(lo + 1, hi + 1), s(lo, -hi), s(-lo, hi)]),
      '(' + poly([[1, 'x'], [-p, '']]) + ')(' + poly([[1, 'x'], [-q, '']]) + ')＝0 と因数分解できるので、' + s(lo, hi) + ' です。'];
  };
  G.m_m10 = function (r) {
    var a = nz(r, -3, 3), x1 = ri(r, -4, 2), x2 = x1 + ri(r, 1, 3);
    var ans = a * (x1 + x2);
    return [2, 'y＝' + poly([[a, 'x²']]) + ' で、x が ' + x1 + ' から ' + x2 + ' まで増えるときの変化の割合は?',
      numChoices(ans, [-ans, a * (x2 - x1), a * x2 * x2]),
      '(y の増加量)÷(x の増加量)＝(' + (a * x2 * x2) + '-(' + (a * x1 * x1) + '))÷' + (x2 - x1) + '＝' + ans + ' です。'];
  };
  G.m_m11 = function (r) {
    var t = pk(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25]]), k = ri(r, 1, 3);
    var a = t[0] * k, b = t[1] * k, c = t[2] * k;
    if (r() < 0.5) {
      return [2, '直角をはさむ2辺が ' + a + ' と ' + b + ' の直角三角形。斜辺の長さは?', numChoices(c, [a + b, c + k, b + 1]),
        a + '²＋' + b + '²＝' + (c * c) + '＝' + c + '² なので、斜辺は ' + c + ' です。'];
    }
    return [3, '斜辺が ' + c + '、1辺が ' + a + ' の直角三角形。残りの1辺の長さは?', numChoices(b, [c - a, b + k, a + 1]),
      c + '²-' + a + '²＝' + (b * b) + ' なので、残りの辺は ' + b + ' です。'];
  };
  G.m_m12 = function (r) {
    var s = ri(r, 3, 11), n = 6 - Math.abs(s - 7);
    return [2, 'さいころを2個投げて、目の和が ' + s + ' になる確率は?',
      choices(frac(n, 36), [frac(n, 6), frac(n + 1, 36), frac(s, 36), frac(1, 6)].filter(function (x) { return x !== frac(n, 36); })),
      '目の出方は全部で36通り。和が ' + s + ' になるのは ' + n + ' 通りなので ' + frac(n, 36) + ' です。'];
  };

  /* ---------- 高校数学 ---------- */
  G.m_h1 = function (r) {
    var h = ri(r, -5, 5), k = ri(r, -9, 9);
    function v(a, b) { return '(' + a + ', ' + b + ')'; }
    return [2, 'y＝' + poly([[1, 'x²'], [-2 * h, 'x'], [h * h + k, '']]) + ' の頂点は?',
      choices(v(h, k), [v(-h, k), v(h, -k), v(-h, -k), v(h + 1, k), v(h, k + 1)]),
      '平方完成すると y＝(' + poly([[1, 'x'], [-h, '']]) + ')²' + (k === 0 ? '' : (k > 0 ? '＋' : '') + k) + '。頂点は ' + v(h, k) + ' です。'];
  };
  G.m_h3 = function (r) {
    var n = ri(r, 5, 9), k = ri(r, 2, 4);
    var P = 1, C;
    for (var i = 0; i < k; i++) P *= (n - i);
    var fk = 1; for (var j = 2; j <= k; j++) fk *= j;
    C = P / fk;
    if (r() < 0.5) {
      return [2, n + '人から ' + k + '人を選ぶ方法は何通り?', choices(C + '通り', [P + '通り', (n * k) + '通り', (C + n) + '通り']),
        '選ぶだけなので組合せ ' + n + 'C' + k + '＝' + C + ' です。'];
    }
    return [2, n + '人から ' + k + '人を選んで1列に並べる方法は何通り?', choices(P + '通り', [C + '通り', (n * k) + '通り', Math.pow(n, k) + '通り']),
      '並べるので順列 ' + n + 'P' + k + '＝' + P + ' です。'];
  };
  G.m_h4 = function (r) {
    var a = pk(r, [2, 3, 5]), k = ri(r, 2, 5), sub = { 2: '₂', 3: '₃', 5: '₅' }[a];
    var v = Math.pow(a, k);
    return [1, 'log' + sub + v + ' の値は?', numChoices(k, [k + 1, k - 1, v / a]),
      a + ' を ' + k + ' 乗すると ' + v + ' なので、答えは ' + k + ' です。'];
  };
  G.m_h6 = function (r) {
    var a = ri(r, 1, 3), b = ri(r, -4, 4), c = ri(r, -5, 5), t = ri(r, -2, 3);
    var d = 3 * a * t * t + 2 * b * t + c, f = a * t * t * t + b * t * t + c * t;
    return [2, 'f(x)＝' + poly([[a, 'x³'], [b, 'x²'], [c, 'x']]) + ' のとき、f′(' + t + ') の値は?',
      numChoices(d, [f, -d, d + 3 * a]),
      "f′(x)＝" + poly([[3 * a, 'x²'], [2 * b, 'x'], [c, '']]) + " に x＝" + t + " を代入して " + d + " です。"];
  };
  G.m_h7 = function (r) {
    var a = ri(r, 1, 3), b = ri(r, -4, 4), k = ri(r, 1, 4);
    var ans = a * k * k + b * k;
    return [2, '∫₀^' + k + ' (' + poly([[2 * a, 'x'], [b, '']]) + ')dx の値は?',
      numChoices(ans, [2 * a * k + b, a * k * k, ans + b]),
      '[' + poly([[a, 'x²'], [b, 'x']]) + ']₀^' + k + '＝' + ans + ' です。'];
  };
  G.m_h8 = function (r) {
    if (r() < 0.6) {
      var a = ri(r, -5, 9), d = nz(r, -4, 5), n = ri(r, 5, 15);
      var ans = a + (n - 1) * d;
      return [1, '初項 ' + a + '・公差 ' + d + ' の等差数列の第 ' + n + ' 項は?', numChoices(ans, [a + n * d, a + (n - 2) * d, a * d + n]),
        a + '＋(' + n + '-1)×(' + d + ')＝' + ans + ' です。'];
    }
    var g = ri(r, 1, 4), q = pk(r, [2, 3, -2]), m = ri(r, 3, 5);
    var ans2 = g * Math.pow(q, m - 1);
    return [1, '初項 ' + g + '・公比 ' + q + ' の等比数列の第 ' + m + ' 項は?', numChoices(ans2, [g * Math.pow(q, m), g * q * m, -ans2]),
      g + '×(' + q + ')^' + (m - 1) + '＝' + ans2 + ' です。'];
  };
  G.m_h9 = function (r) {
    var a1 = ri(r, -4, 4), a2 = ri(r, -4, 4), b1 = ri(r, -4, 4), b2 = ri(r, -4, 4);
    var ans = a1 * b1 + a2 * b2;
    return [2, 'a＝(' + a1 + ', ' + a2 + ')、b＝(' + b1 + ', ' + b2 + ') のとき、内積 a・b は?',
      numChoices(ans, [a1 * b1 - a2 * b2, a1 * b2 + a2 * b1, a1 + b1 + a2 + b2]),
      a1 + '×(' + b1 + ')＋' + a2 + '×(' + b2 + ')＝' + ans + ' です。'];
  };

  /* ---------- 情報 ---------- */
  G.i_h1 = function (r) {
    var n = ri(r, 5, 31), b = n.toString(2);
    if (r() < 0.5) {
      return [1, '10進数の ' + n + ' を2進数で表すと?',
        choices(b, [(n + 1).toString(2), (n - 1).toString(2), b.split('').reverse().join(''), (n ^ 1).toString(2)]),
        n + ' を2でわり続け、余りを下から読むと ' + b + ' です。'];
    }
    return [2, '2進数の ' + b + ' を10進数で表すと?', numChoices(n, [n + 1, n - 1, parseInt(b.split('').reverse().join(''), 2)]),
      '各桁に 1, 2, 4, 8, 16 … の重みをかけてたすと ' + n + ' です。'];
  };
  G.i_h2 = function (r) {
    var a = ri(r, 1, 9), b = ri(r, 1, 9), c = ri(r, 2, 4), lim = ri(r, 10, 30);
    var x = (a + b) * c;
    var y = x > lim ? x - 5 : x + 5;
    return [3, 'x＝' + a + ' → x＝x＋' + b + ' → x＝x×' + c + ' → もし x＞' + lim + ' なら x＝x-5、そうでなければ x＝x＋5。最後の x は?',
      numChoices(y, [x, x > lim ? x + 5 : x - 5, a + b * c]),
      '1行ずつ追うと、' + (a + b) + ' → ' + x + '。' + x + (x > lim ? '＞' : '≦') + lim + ' なので ' + y + ' です。'];
  };

  /* ---------- 理科 ---------- */
  G.s_m1 = function (r) {
    var R = pk(r, [2, 4, 5, 10, 20, 30]), I = pk(r, [0.5, 1, 1.5, 2, 3]), V = R * I;
    if (r() < 0.5) {
      return [1, R + 'Ωの抵抗に ' + I + 'A の電流が流れているとき、電圧は?', choices(num(V) + 'V', [num(R / I) + 'V', num(R + I) + 'V', num(V * 2) + 'V']),
        'V＝RI＝' + R + '×' + I + '＝' + num(V) + 'V です。'];
    }
    return [2, R + 'Ωの抵抗に ' + num(V) + 'V の電圧をかけたとき、流れる電流は?', choices(num(I) + 'A', [num(V * R) + 'A', num(R / V) + 'A', num(I * 2) + 'A']),
      'I＝V÷R＝' + num(V) + '÷' + R + '＝' + num(I) + 'A です。'];
  };
  G.s_h1 = function (r) {
    var c = pk(r, [['H₂O', 18], ['CO₂', 44], ['O₂', 32], ['CH₄', 16], ['NaCl', 58.5], ['NH₃', 17]]);
    var n = pk(r, [0.5, 1, 2, 3]), m = c[1] * n;
    return [2, c[0] + ' ' + num(m) + ' g は何 mol?(H＝1、C＝12、N＝14、O＝16、Na＝23、Cl＝35.5)',
      choices(num(n) + ' mol', [num(n * 2) + ' mol', num(n / 2) + ' mol', num(m) + ' mol', num(n + 1) + ' mol']),
      c[0] + ' のモル質量は ' + c[1] + ' g/mol。' + num(m) + '÷' + c[1] + '＝' + num(n) + ' mol です。'];
  };
  G.s_h2 = function (r) {
    var a = ri(r, 1, 5), t = ri(r, 2, 6);
    if (r() < 0.5) {
      return [2, '静止状態から加速度 ' + a + ' m/s² で動き出した物体の、' + t + ' 秒後の速さは?', choices((a * t) + ' m/s', [(a + t) + ' m/s', (a * t * t) + ' m/s', (a * t / 2) + ' m/s']),
        'v＝at＝' + a + '×' + t + '＝' + (a * t) + ' m/s です。'];
    }
    var a2 = a * 2, x = a * t * t;
    return [3, '静止状態から加速度 ' + a2 + ' m/s² で動き出した物体が、' + t + ' 秒間に進む距離は?', choices(x + ' m', [(a2 * t) + ' m', (a2 * t * t) + ' m', (x / 2) + ' m']),
      'x＝(1/2)at²＝(1/2)×' + a2 + '×' + t + '²＝' + x + ' m です。'];
  };

  /* ---------- 社会 ---------- */
  G.c_m1 = function (r) {
    // 経度は、その都市が使っている標準時の基準となる経線
    var places = [['ロンドン', 0], ['ニューヨーク', -75], ['ロサンゼルス', -120], ['パリ', 15], ['シンガポール', 120], ['シドニー', 150]];
    var p = pk(r, places), diff = (135 - p[1]) / 15;
    var dir = p[1] < 135 ? '進んでいる' : '遅れている';
    return [2, '日本(東経135度)と ' + p[0] + '(標準時の経線 ' + (p[1] < 0 ? '西経' + (-p[1]) : '東経' + p[1]) + '度)の時差は何時間?(サマータイムは考えない)',
      choices(Math.abs(diff) + '時間', [(Math.abs(diff) + 1) + '時間', (Math.abs(diff) - 1 || 2) + '時間', (24 - Math.abs(diff)) + '時間']),
      '経度差 ' + Math.abs(135 - p[1]) + '度 ÷ 15 ＝ ' + Math.abs(diff) + '時間。日本の方が ' + dir + 'ことになります。'];
  };

  WPS.GEN = G;
  WPS.rng = rng;
})();
