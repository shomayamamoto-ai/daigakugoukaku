/*
 * 高校数学(数Ⅰ・A・Ⅱ・B・C)の追加単元の自動生成問題
 * 数字を変えて作るので、各単元50問以上になります。正解は choices[0]。
 */
(function () {
  var H = WPS.GENH, G = WPS.GEN;
  var ri = H.ri, nz = H.nz, pk = H.pk, shuffle = H.shuffle, frac = H.frac, poly = H.poly, sgn = H.sgn, choices = H.choices, numChoices = H.numChoices, Q = H.Q, gcd = H.gcd;
  function C(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function bin(a, b) { return '(' + poly([[1, 'x'], [a, '']]) + ')(' + poly([[1, 'x'], [b, '']]) + ')'; }
  function ratio(a, b) { var g = gcd(a, b); return (a / g) + ':' + (b / g); }
  var TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]];

  /* ---------- 数学Ⅰ ---------- */
  G.m1_expand = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var a = nz(r, -7, 7), b = nz(r, -7, 7);
      return Q(1, bin(a, b) + ' を展開すると?', choices(poly([[1, 'x²'], [a + b, 'x'], [a * b, '']]), [poly([[1, 'x²'], [a * b, 'x'], [a + b, '']]), poly([[1, 'x²'], [a - b, 'x'], [-a * b, '']]), poly([[1, 'x²'], [a + b, 'x'], [-a * b, '']])]),
        '(x＋a)(x＋b)＝x²＋(a＋b)x＋ab\na＋b＝' + (a + b) + '、ab＝' + (a * b)); }
    if (t === 1) { var p = nz(r, -8, 8), q = nz(r, -8, 8);
      return Q(2, poly([[1, 'x²'], [p + q, 'x'], [p * q, '']]) + ' を因数分解すると?', choices(bin(p, q), [bin(-p, -q), bin(p, -q), bin(p + q, 1)]),
        'かけて ' + (p * q) + '、たして ' + (p + q) + ' になる2数は ' + p + ' と ' + q + '\n→ ' + bin(p, q)); }
    if (t === 2) { var m = pk(r, [2, 3, 5]), u = nz(r, -5, 5), v = nz(r, -5, 5);
      // (mx＋u)(x＋v)＝mx²＋(mv＋u)x＋uv
      var ans = '(' + poly([[m, 'x'], [u, '']]) + ')(' + poly([[1, 'x'], [v, '']]) + ')';
      return Q(3, poly([[m, 'x²'], [m * v + u, 'x'], [u * v, '']]) + ' を因数分解すると?', choices(ans, ['(' + poly([[m, 'x'], [v, '']]) + ')(' + poly([[1, 'x'], [u, '']]) + ')', '(' + poly([[m, 'x'], [-u, '']]) + ')(' + poly([[1, 'x'], [-v, '']]) + ')', '(' + poly([[1, 'x'], [u, '']]) + ')(' + poly([[m, 'x'], [-v, '']]) + ')']),
        '【たすき掛け】x² の係数 ' + m + '＝' + m + '×1、定数項 ' + (u * v) + '＝' + u + '×' + sgn(v) + '\n斜めにかけてたす:' + m + '×' + sgn(v) + '＋1×' + sgn(u) + '＝' + (m * v + u) + '(x の係数と一致)\n→ ' + ans); }
    var c = nz(r, -4, 4), n3 = 3 * c * c;
    return Q(2, '(' + poly([[1, 'x'], [c, '']]) + ')³ を展開したときの x の係数は?', numChoices(n3, [c * c, 3 * c, c * c * c]),
      '(x＋a)³＝x³＋3a x²＋3a² x＋a³\nx の係数は 3a²＝3×' + sgn(c) + '²＝' + n3);
  };
  G.m1_abs = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var a = ri(r, -9, 9), b = nz(r, 1, 6);
      return Q(2, '方程式 |x' + (a < 0 ? '＋' + (-a) : a > 0 ? '−' + a : '') + '|＝' + b + ' の解は?', choices('x＝' + (a - b) + ', ' + (a + b), ['x＝' + (a + b), 'x＝' + (-a - b) + ', ' + (-a + b), 'x＝' + (a - b)]),
        '|x−(' + a + ')|＝' + b + ' は「x と ' + a + ' の距離が ' + b + '」\n→ x＝' + a + '±' + b + ' → x＝' + (a - b) + ', ' + (a + b)); }
    if (t === 1) { var k = nz(r, -5, 5), m = ri(r, -9, 9), n = ri(r, -9, 9), rhs = n - m;
      var cmp = k > 0 ? '＞' : '＜', bnd = frac(rhs, k);
      return Q(2, '1次不等式 ' + poly([[k, 'x'], [m, '']]) + '＞' + n + ' を解くと?', choices('x' + cmp + bnd, ['x' + (k > 0 ? '＜' : '＞') + bnd, 'x' + cmp + frac(-rhs, k), 'x' + cmp + frac(n + m, k)]),
        '①' + m + ' を右辺に移す:' + poly([[k, 'x']]) + '＞' + rhs + '\n②' + k + ' で割る' + (k < 0 ? '(負の数で割るので不等号の向きが逆になる)' : '') + ' → x' + cmp + bnd); }
    if (t === 2) { var P = pk(r, [[2, 3], [2, 5], [3, 5], [3, 7], [2, 7], [5, 7], [6, 5], [7, 6]]), d = P[1] - P[0];
      var ans = d === 1 ? '√' + P[1] + '−√' + P[0] : d === -1 ? '√' + P[0] + '−√' + P[1] : '(√' + P[1] + '−√' + P[0] + ')/' + d;
      return Q(3, '1/(√' + P[1] + '＋√' + P[0] + ') の分母を有理化すると?', choices(ans, ['√' + P[1] + '＋√' + P[0], '(√' + P[1] + '＋√' + P[0] + ')/' + (P[0] + P[1]), '(√' + P[1] + '−√' + P[0] + ')/' + (P[0] + P[1])]),
        '分母と分子に (√' + P[1] + '−√' + P[0] + ') をかける\n分母:(√' + P[1] + ')²−(√' + P[0] + ')²＝' + P[1] + '−' + P[0] + '＝' + d + '\n→ ' + ans); }
    var x = ri(r, -9, 9), y = ri(r, -9, 9);
    return Q(1, '|' + x + '|＋|' + y + '| の値は?', numChoices(Math.abs(x) + Math.abs(y), [x + y, Math.abs(x + y), Math.abs(x - y)]),
      '絶対値は 0 からの距離なので、いつも 0 以上\n|' + x + '|＝' + Math.abs(x) + '、|' + y + '|＝' + Math.abs(y) + ' → ' + (Math.abs(x) + Math.abs(y)));
  };
  G.m1_set = function (r) {
    var t = ri(r, 0, 2);
    var L = ['十分条件だが必要条件ではない', '必要条件だが十分条件ではない', '必要十分条件', '必要条件でも十分条件でもない'];
    if (t === 0) { var a = ri(r, -5, 8), b = ri(r, -5, 8), ans = a > b ? L[0] : a < b ? L[1] : L[2];
      return Q(2, 'x＞' + a + ' は x＞' + b + ' であるための何条件?', [ans].concat(L.filter(function (x) { return x !== ans; })),
        (a > b ? 'x＞' + a + ' ならば必ず x＞' + b + '(正しい)。逆は成り立たない。\n→ 小さい範囲(p)は、大きい範囲(q)の十分条件' : a < b ? 'x＞' + b + ' ならば x＞' + a + ' だが、x＞' + a + ' でも x＞' + b + ' とは限らない(例:x＝' + b + ')。\n→ 大きい範囲(p)は、小さい範囲(q)の必要条件' : '2つは同じ条件 → 必要十分条件') + '\n💡 範囲を数直線にかき、「せまい方 ⇒ 広い方」が成り立つと考える。'); }
    if (t === 1) { var A = shuffle(r, [1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4).sort(function (x, y) { return x - y; }), B = shuffle(r, [1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4).sort(function (x, y) { return x - y; });
      var I = A.filter(function (x) { return B.indexOf(x) >= 0; }), U = A.concat(B.filter(function (x) { return A.indexOf(x) < 0; })).sort(function (x, y) { return x - y; });
      var f = function (s) { return s.length ? '{' + s.join(', ') + '}' : '∅(空集合)'; }, q = ri(r, 0, 1);
      return Q(1, 'A＝' + f(A) + '、B＝' + f(B) + ' のとき、' + (q ? 'A∪B' : 'A∩B') + ' は?', choices(q ? f(U) : f(I), [q ? f(I) : f(U), f(A), f(B)]),
        (q ? 'A∪B(和集合)は、A か B の少なくとも一方に入っている要素' : 'A∩B(共通部分)は、A と B の両方に入っている要素') + '\n→ ' + (q ? f(U) : f(I))); }
    var k = ri(r, 2, 9), form = ri(r, 0, 2), names = ['逆', '裏', '対偶'];
    var orig = 'x＝' + k + ' ならば x²＝' + (k * k), opts = ['x²＝' + (k * k) + ' ならば x＝' + k, 'x≠' + k + ' ならば x²≠' + (k * k), 'x²≠' + (k * k) + ' ならば x≠' + k];
    return Q(2, '命題「' + orig + '」の' + names[form] + 'は?', [opts[form]].concat(opts.filter(function (_, i) { return i !== form; })).concat(['x＝−' + k + ' ならば x²＝' + (k * k)]),
      '「p ならば q」に対して\n逆:q ならば p ／ 裏:p でない ならば q でない ／ 対偶:q でない ならば p でない\n→ ' + opts[form] + '\n💡 もとの命題と真偽が必ず一致するのは対偶だけ。');
  };
  G.m1_data = function (r) {
    var t = ri(r, 0, 3), m = ri(r, 3, 12) * 5;
    if (t === 0 || t === 1) { var P = pk(r, [[[-2, -1, 0, 1, 2], 2], [[-3, -1, 0, 1, 3], 4], [[-4, -2, 0, 2, 4], 8], [[-3, 0, 0, 0, 3], 3.6], [[-1, -1, 0, 1, 1], 0.8], [[-5, -1, 0, 1, 5], 10.4]]), k = ri(r, 1, 2);
      var data = shuffle(r, P[0].map(function (d) { return m + d * k; })), V = Math.round(P[1] * k * k * 100) / 100;
      if (t === 0) return Q(1, 'データ ' + data.join(', ') + ' の平均値は?', numChoices(m, [m + k, m - k, data[2]]), '合計 ' + (m * 5) + ' ÷ 5 ＝ ' + m);
      return Q(3, 'データ ' + data.join(', ') + ' の分散は?', numChoices(V, [Math.round(Math.sqrt(V) * 100) / 100, V * 5, V / 2]),
        '①平均 ' + m + '\n②偏差(値−平均):' + data.map(function (x) { return x - m; }).join(', ') + '\n③偏差の2乗の平均 ＝ ' + V + '\n💡 標準偏差は分散の正の平方根。'); }
    if (t === 2) { var s = ri(r, 1, 6), V2 = 4 * s * s, d2 = shuffle(r, [m - 2 * s, m - 2 * s, m + 2 * s, m + 2 * s]);
      return Q(2, 'データ ' + d2.join(', ') + ' の標準偏差は?', numChoices(2 * s, [V2, s, 4 * s]), '平均 ' + m + '、偏差はすべて ±' + (2 * s) + '\n分散 ＝ ' + V2 + ' → 標準偏差 ＝ √' + V2 + ' ＝ ' + (2 * s)); }
    var arr = shuffle(r, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, 8).sort(function (a, b) { return a - b; });
    var q1 = (arr[1] + arr[2]) / 2, q3 = (arr[5] + arr[6]) / 2;
    return Q(3, '8個のデータ ' + arr.join(', ') + ' の四分位範囲(Q3−Q1)は?', numChoices(q3 - q1, [arr[7] - arr[0], q3, (arr[3] + arr[4]) / 2]),
      '①小さい順に並べて前半4個・後半4個に分ける\n②Q1＝前半の中央値＝(' + arr[1] + '＋' + arr[2] + ')÷2＝' + q1 + '\n③Q3＝後半の中央値＝(' + arr[5] + '＋' + arr[6] + ')÷2＝' + q3 + '\n→ 四分位範囲＝' + (q3 - q1));
  };

  /* ---------- 数学A ---------- */
  G.ma_geo = function (r) {
    var t = ri(r, 0, 3), a = ri(r, 10, 40) * 2;
    if (t === 0) { var A = Math.min(a, 88);
      return Q(2, '△ABC の外心を O とする。∠A＝' + A + '° のとき、∠BOC は?', numChoices(2 * A, [A, 90 + A / 2, 180 - A]), '外心 O は外接円の中心。∠BOC は弧 BC に対する中心角なので、円周角 ∠A の2倍\n→ 2×' + A + '°＝' + (2 * A) + '°'); }
    if (t === 1) return Q(3, '△ABC の内心を I とする。∠A＝' + a + '° のとき、∠BIC は?', numChoices(90 + a / 2, [2 * a, 180 - a, 90 - a / 2]),
      '内心 I は角の二等分線の交点。∠IBC＋∠ICB＝(180°−' + a + '°)÷2＝' + ((180 - a) / 2) + '°\n∠BIC＝180°−' + ((180 - a) / 2) + '°＝' + (90 + a / 2) + '°(＝90°＋A/2)');
    if (t === 2) { var c = ri(r, 20, 80) * 2;
      return Q(1, '円の中心角が ' + c + '° のとき、同じ弧に対する円周角は?', numChoices(c / 2, [c, c * 2, 180 - c]), '円周角は、同じ弧に対する中心角の半分 → ' + c + '÷2＝' + (c / 2) + '°'); }
    var g = ri(r, 2, 15) * 3;
    return Q(2, '△ABC の重心を G、辺 BC の中点を M とする。AM＝' + g + ' のとき、AG は?', numChoices(g * 2 / 3, [g / 3, g / 2, g]), '重心は中線を 2:1 に分ける → AG＝' + g + '×2/3＝' + (g * 2 / 3));
  };
  G.ma_ceva = function (r) {
    var t = ri(r, 0, 2);
    if (t === 2) { var pc = ri(r, 2, 6), pd = ri(r, 3, 9), pa = pk(r, [1, 2, 3, 4, 6].filter(function (x) { return (pc * pd) % x === 0 && x < pc * pd; }));
      var pb = pc * pd / pa;
      return Q(2, '点 P を通る2本の直線が円と A、B および C、D で交わる。PA＝' + pa + '、PB＝' + pb + '、PC＝' + pc + ' のとき、PD は?', numChoices(pd, [pa * pb + pc, pb - pa + pc, pd + 1]),
        '【方べきの定理】PA×PB＝PC×PD\n' + pa + '×' + pb + '＝' + pc + '×PD → PD＝' + (pa * pb) + '÷' + pc + '＝' + pd); }
    var a = ri(r, 1, 5), b = ri(r, 1, 5), c = ri(r, 1, 5), d = ri(r, 1, 5);
    var ans = ratio(b * d, a * c);
    if (t === 0) return Q(3, '△ABC で、3本の線分 AD・BE・CF が1点で交わる。AF:FB＝' + a + ':' + b + '、BD:DC＝' + c + ':' + d + ' のとき、CE:EA は?', choices(ans, [ratio(a * c, b * d), ratio(a * d, b * c), ratio(b * c, a * d)]),
      '【チェバの定理】(AF/FB)×(BD/DC)×(CE/EA)＝1\n(' + a + '/' + b + ')×(' + c + '/' + d + ')×(CE/EA)＝1\n→ CE/EA＝' + (b * d) + '/' + (a * c) + ' → CE:EA＝' + ans);
    return Q(3, '△ABC の辺 AB 上に F、辺 BC の延長上に D、辺 CA 上に E があり、D・E・F は一直線上にある。AF:FB＝' + a + ':' + b + '、BD:DC＝' + c + ':' + d + ' のとき、CE:EA は?', choices(ans, [ratio(a * c, b * d), ratio(a * d, b * c), ratio(b * c, a * d)]),
      '【メネラウスの定理】(AF/FB)×(BD/DC)×(CE/EA)＝1(頂点→分点→頂点…と一周)\n→ CE/EA＝' + (b * d) + '/' + (a * c) + ' → CE:EA＝' + ans);
  };
  G.ma_cond = function (r) {
    var t = ri(r, 0, 1);
    if (t === 0) { var red = ri(r, 2, 7), wh = ri(r, 1, 6), n = red + wh;
      return Q(3, '赤玉 ' + red + ' 個、白玉 ' + wh + ' 個が入った袋から、玉を1個ずつ2回取り出す(戻さない)。1回目が赤玉だったとき、2回目も赤玉である確率は?', choices(frac(red - 1, n - 1), [frac(red, n), frac(red * (red - 1), n * (n - 1)), frac(red - 1, n)]),
        '1回目に赤を取った後、袋の中は 赤 ' + (red - 1) + ' 個・全部 ' + (n - 1) + ' 個\n→ P＝' + (red - 1) + '/' + (n - 1) + '＝' + frac(red - 1, n - 1) + '\n💡 条件付き確率は「その条件が起きた後の世界」で考える。'); }
    var N = ri(r, 4, 9) * 10, boys = ri(r, 2, N / 10 - 1) * 10, like = ri(r, 1, boys / 2);
    return Q(2, 'ある学年 ' + N + ' 人のうち男子は ' + boys + ' 人で、そのうち ' + like + ' 人が数学部員。1人選んだら男子だったとき、その人が数学部員である確率は?', choices(frac(like, boys), [frac(like, N), frac(boys, N), frac(like, N - boys)]),
      'P_男子(部員)＝P(男子かつ部員)÷P(男子)＝(' + like + '/' + N + ')÷(' + boys + '/' + N + ')＝' + like + '/' + boys + '＝' + frac(like, boys));
  };

  /* ---------- 数学Ⅱ ---------- */
  G.m2_proof = function (r) {
    var t = ri(r, 0, 2);
    if (t === 0) { var n = ri(r, 3, 7), a = ri(r, 1, 3), k = ri(r, 1, n - 1), coef = C(n, k) * Math.pow(a, n - k);
      return Q(3, '(x＋' + a + ')' + n.toString().replace(/\d/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]; }) + ' を展開したときの x' + k.toString().replace(/\d/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]; }) + ' の係数は?', numChoices(coef, [C(n, k), C(n, k) * a, coef + C(n, k)]),
        '【二項定理】x^' + k + ' の項は ₙCₖ×x^' + k + '×' + a + '^' + (n - k) + '\n＝' + n + 'C' + k + '×' + a + '^' + (n - k) + '＝' + C(n, k) + '×' + Math.pow(a, n - k) + '＝' + coef); }
    if (t === 1) { var s = ri(r, 1, 9), c = s * s;
      return Q(3, 'x＞0 のとき、x＋' + c + '/x の最小値は?', numChoices(2 * s, [s, c, 2 * c]),
        '【相加平均≧相乗平均】x＋' + c + '/x ≧ 2√(x×' + c + '/x)＝2√' + c + '＝' + (2 * s) + '\n等号は x＝' + c + '/x つまり x＝' + s + ' のとき → 最小値 ' + (2 * s)); }
    var n2 = ri(r, 3, 8), k2 = ri(r, 0, n2);
    return Q(1, '₍' + n2 + '₎C₍' + k2 + '₎ の値は?(' + n2 + 'C' + k2 + ')', numChoices(C(n2, k2), [C(n2, k2) + n2, n2 * k2, C(n2, Math.min(n2, k2 + 1)) + 1]), n2 + 'C' + k2 + '＝' + n2 + '!÷(' + k2 + '!×' + (n2 - k2) + '!)＝' + C(n2, k2) + '\n💡 パスカルの三角形の ' + n2 + ' 段目の数。');
  };
  G.m2_complex = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var a = nz(r, -4, 4), b = nz(r, -4, 4), c = nz(r, -4, 4), d = nz(r, -4, 4), re = a * c - b * d, im = a * d + b * c;
      var f = function (x, y) { return x + (y < 0 ? '−' + (y === -1 ? '' : -y) : '＋' + (y === 1 ? '' : y)) + 'i'; };
      return Q(2, '(' + f(a, b) + ')(' + f(c, d) + ') を計算すると?', choices(f(re, im), [f(a * c + b * d, im), f(re, a * d - b * c), f(a * c, b * d)]),
        '展開して i²＝−1 を使う\n実部:' + a + '×' + sgn(c) + '−' + sgn(b) + '×' + sgn(d) + '＝' + re + '\n虚部:' + a + '×' + sgn(d) + '＋' + sgn(b) + '×' + sgn(c) + '＝' + im); }
    if (t === 1) { var p = ri(r, -5, 5), q = ri(r, -6, 6), A = nz(r, -3, 3), val = A * A * A + p * A + q;
      return Q(2, 'P(x)＝' + poly([[1, 'x³'], [p, 'x'], [q, '']]) + ' を x' + (A < 0 ? '＋' + (-A) : '−' + A) + ' で割った余りは?', numChoices(val, [-val, val + A, A * A + p * A + q]),
        '【剰余の定理】x−(' + A + ') で割った余りは P(' + A + ')\n＝' + sgn(A) + '³＋' + sgn(p) + '×' + sgn(A) + '＋' + sgn(q) + '＝' + val); }
    if (t === 2) { var al = nz(r, -6, 6), be = nz(r, -6, 6);
      return Q(2, 'x²＋kx＋' + sgn(al * be) + '＝0 の1つの解が x＝' + al + ' のとき、k の値は?(もう1つの解は整数)', numChoices(-(al + be), [al + be, al * be, -al]),
        '【因数定理】x＝' + al + ' を代入すると0:' + (al * al) + '＋' + al + 'k＋' + sgn(al * be) + '＝0\n→ k＝' + (-(al + be)) + '\n(もう1つの解は ' + be + '。解と係数の関係 α＋β＝−k でも確かめられる)'); }
    var s = ri(r, -6, 6), pr = nz(r, -9, 9);
    return Q(2, '2次方程式 ' + poly([[1, 'x²'], [-s, 'x'], [pr, '']]) + '＝0 の2つの解を α、β とするとき、α²＋β² は?', numChoices(s * s - 2 * pr, [s * s + 2 * pr, s * s - pr, s - 2 * pr]),
      '【解と係数の関係】α＋β＝' + s + '、αβ＝' + pr + '\nα²＋β²＝(α＋β)²−2αβ＝' + (s * s) + '−2×' + sgn(pr) + '＝' + (s * s - 2 * pr));
  };
  G.m2_line = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var T = pk(r, TRI.slice(0, 4)), k = ri(r, 1, 2), x1 = ri(r, -5, 5), y1 = ri(r, -5, 5), sx = pk(r, [1, -1]), sy = pk(r, [1, -1]);
      return Q(1, '2点 (' + x1 + ', ' + y1 + ')、(' + (x1 + sx * T[0] * k) + ', ' + (y1 + sy * T[1] * k) + ') の距離は?', numChoices(T[2] * k, [(T[0] + T[1]) * k, T[1] * k, T[2] * k + 1]),
        '距離＝√{(x の差)²＋(y の差)²}＝√(' + (T[0] * k) + '²＋' + (T[1] * k) + '²)＝' + (T[2] * k)); }
    if (t === 1) { var a = ri(r, -5, 5), b = ri(r, -5, 5), R = ri(r, 1, 6), D = -2 * a, E = -2 * b, F = a * a + b * b - R * R;
      return Q(3, '円 ' + poly([[1, 'x²'], [1, 'y²'], [D, 'x'], [E, 'y'], [F, '']]) + '＝0 の中心と半径は?', choices('中心(' + a + ', ' + b + ')、半径 ' + R, ['中心(' + (-a) + ', ' + (-b) + ')、半径 ' + R, '中心(' + a + ', ' + b + ')、半径 ' + (R * R), '中心(' + D + ', ' + E + ')、半径 ' + R]),
        '平方完成:(x' + (a < 0 ? '＋' + (-a) : '−' + a) + ')²＋(y' + (b < 0 ? '＋' + (-b) : '−' + b) + ')²＝' + (R * R) + '\n→ 中心(' + a + ', ' + b + ')、半径 √' + (R * R) + '＝' + R); }
    if (t === 2) { var x0 = ri(r, -5, 5), y0 = ri(r, -5, 5), N = pk(r, [[3, 4], [4, 3], [5, 12], [12, 5], [-3, 4], [3, -4]]), L = pk(r, [5, 5, 13])
      ; var nn = Math.sqrt(N[0] * N[0] + N[1] * N[1]), dd = ri(r, 1, 4), c = dd * nn - N[0] * x0 - N[1] * y0;
      return Q(3, '点 (' + x0 + ', ' + y0 + ') と直線 ' + poly([[N[0], 'x'], [N[1], 'y'], [c, '']]) + '＝0 の距離は?', numChoices(dd, [dd * nn, dd + 1, Math.abs(c)]),
        '【点と直線の距離】|ax₀＋by₀＋c|÷√(a²＋b²)\n＝|' + N[0] + '×' + sgn(x0) + '＋' + sgn(N[1]) + '×' + sgn(y0) + '＋' + sgn(c) + '|÷√' + (nn * nn) + '＝' + (dd * nn) + '÷' + nn + '＝' + dd); }
    var p1 = ri(r, -6, 6), q1 = ri(r, -6, 6), p2 = p1 + nz(r, -4, 4) * 2, q2 = q1 + ri(r, -4, 4) * 2;
    return Q(1, '2点 (' + p1 + ', ' + q1 + ')、(' + p2 + ', ' + q2 + ') を結ぶ線分の中点は?', choices('(' + ((p1 + p2) / 2) + ', ' + ((q1 + q2) / 2) + ')', ['(' + (p2 - p1) + ', ' + (q2 - q1) + ')', '(' + (p1 + p2) + ', ' + (q1 + q2) + ')', '(' + ((p2 - p1) / 2) + ', ' + ((q2 - q1) / 2) + ')']),
      '中点＝(x の平均, y の平均)＝((' + p1 + '＋' + sgn(p2) + ')÷2, (' + q1 + '＋' + sgn(q2) + ')÷2)');
  };
  G.m2_addth = function (r) {
    var t = ri(r, 0, 2);
    if (t === 0) { var F = pk(r, [['sin75°', '(√6＋√2)/4', '45°＋30°'], ['cos75°', '(√6−√2)/4', '45°＋30°'], ['sin15°', '(√6−√2)/4', '45°−30°'], ['cos15°', '(√6＋√2)/4', '45°−30°'], ['sin105°', '(√6＋√2)/4', '60°＋45°'], ['cos105°', '(√2−√6)/4', '60°＋45°'], ['sin165°', '(√6−√2)/4', '120°＋45°'], ['cos165°', '−(√6＋√2)/4', '120°＋45°']]);
      return Q(2, F[0] + ' の値は?', choices(F[1], ['(√6＋√2)/4', '(√6−√2)/4', '(√2−√6)/4', '−(√6＋√2)/4', '√3/2']), F[0].slice(0, 3) + '(' + F[2] + ') として加法定理を使う\n→ ' + F[1]); }
    var T = pk(r, TRI), sc = ri(r, 0, 1), s = sc ? T[0] : T[1], c = sc ? T[1] : T[0], h = T[2];
    if (t === 1) { var ask = ri(r, 0, 1);
      return Q(3, 'sinα＝' + s + '/' + h + '(0°＜α＜90°)のとき、' + (ask ? 'cos2α' : 'sin2α') + ' の値は?', ask ? choices(frac(c * c - s * s, h * h), [frac(2 * s * c, h * h), frac(s * s - c * c, h * h), frac(2 * c, h)]) : choices(frac(2 * s * c, h * h), [frac(c * c - s * s, h * h), frac(2 * s, h), frac(s * c, h * h)]),
        'cosα＝' + c + '/' + h + '(sin²α＋cos²α＝1 と鋭角から)\n' + (ask ? 'cos2α＝cos²α−sin²α＝(' + (c * c) + '−' + (s * s) + ')/' + (h * h) + '＝' + frac(c * c - s * s, h * h) : 'sin2α＝2sinαcosα＝2×' + s + '×' + c + '/' + (h * h) + '＝' + frac(2 * s * c, h * h))); }
    var kk = ri(r, 1, 3), A0 = T[sc] * kk, B0 = T[1 - sc] * kk, mn = ri(r, 0, 1);
    return Q(3, A0 + 'sinθ＋' + B0 + 'cosθ の' + (mn ? '最小値' : '最大値') + 'は?', numChoices(mn ? -T[2] * kk : T[2] * kk, [mn ? -(A0 + B0) : A0 + B0, mn ? T[2] * kk : -T[2] * kk, T[2] * kk * T[2]]),
      '【合成】a sinθ＋b cosθ＝√(a²＋b²) sin(θ＋α)\n√(' + (A0 * A0) + '＋' + (B0 * B0) + ')＝' + (T[2] * kk) + '\nsin は −1〜1 の値をとるので、' + (mn ? '最小値は −' + (T[2] * kk) : '最大値は ' + (T[2] * kk)));
  };

  /* ---------- 数学B ---------- */
  G.mb_rec = function (r) {
    var t = ri(r, 0, 2), a1 = ri(r, -3, 5);
    if (t === 0) { var d = nz(r, -4, 5), n = ri(r, 5, 20), an = a1 + (n - 1) * d;
      return Q(1, 'a₁＝' + a1 + '、aₙ₊₁＝aₙ＋' + sgn(d) + ' で決まる数列の第 ' + n + ' 項は?', numChoices(an, [a1 + n * d, a1 * n * d, an + d]), '公差 ' + d + ' の等差数列 → aₙ＝' + a1 + '＋(n−1)×' + sgn(d) + '\na' + n + '＝' + a1 + '＋' + (n - 1) + '×' + sgn(d) + '＝' + an); }
    if (t === 1) { var b1 = nz(r, 1, 4), q = pk(r, [2, 3, -2]), m = ri(r, 3, 6), bm = b1 * Math.pow(q, m - 1);
      return Q(2, 'a₁＝' + b1 + '、aₙ₊₁＝' + q + 'aₙ で決まる数列の第 ' + m + ' 項は?', numChoices(bm, [b1 * Math.pow(q, m), b1 * q * m, bm + q]), '公比 ' + q + ' の等比数列 → aₙ＝' + b1 + '×' + sgn(q) + '^(n−1)\na' + m + '＝' + b1 + '×' + sgn(q) + '^' + (m - 1) + '＝' + bm); }
    var p = pk(r, [2, 3]), c = nz(r, -3, 4), x = a1, seq = [x];
    for (var i = 0; i < 3; i++) { x = p * x + c; seq.push(x); }
    return Q(2, 'a₁＝' + a1 + '、aₙ₊₁＝' + p + 'aₙ' + (c < 0 ? '−' + (-c) : '＋' + c) + ' のとき、a₄ は?', numChoices(seq[3], [seq[2], seq[3] + c, p * seq[3]]),
      '順に代入して計算する\na₂＝' + p + '×' + sgn(seq[0]) + (c < 0 ? '−' + (-c) : '＋' + c) + '＝' + seq[1] + '\na₃＝' + seq[2] + '\na₄＝' + seq[3] + '\n💡 一般項は aₙ₊₁−α＝' + p + '(aₙ−α) の形(α は α＝' + p + 'α' + (c < 0 ? '−' + (-c) : '＋' + c) + ' の解)に直して求める。');
  };
  G.mb_stat = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var n = pk(r, [10, 20, 50, 100, 200, 400, 600]), P = pk(r, [[1, 2], [1, 4], [1, 5], [1, 10], [3, 5], [1, 3]]), mean = n * P[0] / P[1], V = mean * (P[1] - P[0]) / P[1];
      if (mean % 1 || V % 1) { n = P[1] * P[1] * ri(r, 1, 6); mean = n * P[0] / P[1]; V = mean * (P[1] - P[0]) / P[1]; }
      var ask = ri(r, 0, 1);
      return Q(2, '二項分布 B(' + n + ', ' + P[0] + '/' + P[1] + ') に従う確率変数 X の' + (ask ? '分散' : '平均(期待値)') + 'は?', numChoices(ask ? V : mean, ask ? [mean, Math.sqrt(V) * 2, V + 1] : [V, n / 2, mean + 1]),
        'B(n, p) の平均＝np、分散＝np(1−p)\n平均＝' + n + '×' + P[0] + '/' + P[1] + '＝' + mean + '、分散＝' + mean + '×' + (P[1] - P[0]) + '/' + P[1] + '＝' + V); }
    if (t === 1) { var E = ri(r, 2, 9), V2 = ri(r, 1, 6), a = nz(r, -3, 4), b = ri(r, -5, 5), ask2 = ri(r, 0, 1);
      return Q(2, 'E(X)＝' + E + '、V(X)＝' + V2 + ' のとき、Y＝' + poly([[a, 'X'], [b, '']]) + ' の' + (ask2 ? '分散 V(Y)' : '期待値 E(Y)') + 'は?', numChoices(ask2 ? a * a * V2 : a * E + b, ask2 ? [a * V2, a * a * V2 + b, a * V2 + b] : [a * E, E + b, a * (E + b)]),
        'E(aX＋b)＝aE(X)＋b、V(aX＋b)＝a²V(X)(b は分散に関係しない)\n→ ' + (ask2 ? sgn(a) + '²×' + V2 + '＝' + (a * a * V2) : a + '×' + E + '＋' + sgn(b) + '＝' + (a * E + b))); }
    if (t === 2) { var m = ri(r, 4, 14) * 5, s = pk(r, [2, 4, 5, 10]), z = pk(r, [1, 1.5, 2, -1, -2, 0.5]), x = m + z * s;
      return Q(2, '平均 ' + m + '、標準偏差 ' + s + ' の正規分布で、X＝' + x + ' を標準化した値 Z は?', numChoices(z, [z * s, (x - m) * s, z + 1]), 'Z＝(X−平均)÷標準偏差＝(' + x + '−' + m + ')÷' + s + '＝' + z); }
    var vals = [ri(r, 0, 3), ri(r, 4, 7), ri(r, 8, 12)], pr = pk(r, [[1, 2, 1], [1, 1, 2], [2, 1, 1], [3, 2, 1], [1, 3, 2]]), tot = pr[0] + pr[1] + pr[2];
    var Ev = (vals[0] * pr[0] + vals[1] * pr[1] + vals[2] * pr[2]) / tot;
    return Q(2, 'X が ' + vals[0] + '、' + vals[1] + '、' + vals[2] + ' をとる確率がそれぞれ ' + frac(pr[0], tot) + '、' + frac(pr[1], tot) + '、' + frac(pr[2], tot) + ' のとき、期待値 E(X) は?', choices(frac(vals[0] * pr[0] + vals[1] * pr[1] + vals[2] * pr[2], tot), [frac(vals[0] + vals[1] + vals[2], 3), String(vals[1]), frac(vals[0] * pr[0] + vals[1] * pr[1] + vals[2] * pr[2] + tot, tot)]),
      'E(X)＝Σ(値×確率)＝(' + vals[0] + '×' + pr[0] + '＋' + vals[1] + '×' + pr[1] + '＋' + vals[2] + '×' + pr[2] + ')÷' + tot + '＝' + frac(vals[0] * pr[0] + vals[1] * pr[1] + vals[2] * pr[2], tot));
  };
  G.mb_soc = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var before = ri(r, 2, 20) * 50, pct = pk(r, [-40, -25, -20, -10, -5, 5, 10, 20, 25, 30, 50, 60]), after = before * (100 + pct) / 100;
      return Q(1, 'ある商品の売上が ' + before + ' 個から ' + after + ' 個になった。増加率は?', choices(pct + '%', [(-pct) + '%', Math.round((after - before) / after * 1000) / 10 + '%', (pct * 2) + '%']), '増加率＝(後−前)÷前×100＝(' + after + '−' + before + ')÷' + before + '×100＝' + pct + '%\n💡 マイナスなら減少。'); }
    if (t === 1) { var P0 = ri(r, 1, 10) * 10000, rt = pk(r, [10, 20]), y = ri(r, 2, 3), F = P0 * Math.pow(1 + rt / 100, y);
      return Q(2, P0 + ' 円を年利 ' + rt + '% の複利で ' + y + ' 年預けると、元利合計はいくら?', choices(Math.round(F) + '円', [Math.round(P0 * (1 + rt * y / 100)) + '円', Math.round(P0 * rt * y / 100) + '円', Math.round(F + P0 * rt / 100) + '円']),
        '複利は「元金×(1＋利率)^年数」\n＝' + P0 + '×' + (1 + rt / 100) + '^' + y + '＝' + Math.round(F) + '円\n(単利だと ' + Math.round(P0 * (1 + rt * y / 100)) + '円。利息にも利息がつくぶん複利が多い)'); }
    if (t === 2) { var p = ri(r, 2, 30) * 100, u = pk(r, [10, 20, 25, 30, 50]), d = pk(r, [10, 20, 25, 50]), fin = p * (100 + u) / 100 * (100 - d) / 100;
      return Q(2, p + ' 円の商品を ' + u + '% 値上げした後、' + d + '% 値下げすると何円?', numChoices(fin, [p * (100 + u - d) / 100, p, p * (100 - d) / 100]), p + '×' + (1 + u / 100) + '＝' + (p * (100 + u) / 100) + '円 → ×' + (1 - d / 100) + '＝' + fin + '円\n💡 割合は「もとにする量」が変わるので、同じ%でも元にはもどらない。'); }
    var total = ri(r, 4, 20) * 50, part = ri(r, 1, total / 50 - 1) * 25;
    return Q(1, '全体 ' + total + ' 人のうち ' + part + ' 人が「はい」と答えた。割合は何%?', choices(Math.round(part / total * 1000) / 10 + '%', [Math.round(total / part * 100) / 100 + '%', part + '%', Math.round((total - part) / total * 1000) / 10 + '%']), '割合＝部分÷全体×100＝' + part + '÷' + total + '×100＝' + (Math.round(part / total * 1000) / 10) + '%');
  };

  /* ---------- 数学C ---------- */
  G.mc_vec = function (r) {
    var t = ri(r, 0, 2), P = function (v) { return '(' + v[0] + ', ' + v[1] + ')'; };
    if (t === 0) { var m = ri(r, 1, 4), n = ri(r, 1, 4), a = [ri(r, -4, 4) * (m + n), ri(r, -4, 4) * (m + n)], b = [ri(r, -4, 4) * (m + n), ri(r, -4, 4) * (m + n)];
      var p = [(n * a[0] + m * b[0]) / (m + n), (n * a[1] + m * b[1]) / (m + n)], wrong = [(m * a[0] + n * b[0]) / (m + n), (m * a[1] + n * b[1]) / (m + n)];
      return Q(3, 'A' + P(a) + '、B' + P(b) + ' のとき、線分 AB を ' + m + ':' + n + ' に内分する点の座標は?', choices(P(p), [P(wrong), P([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]), P([b[0] - a[0], b[1] - a[1]])]),
        '内分点＝(n×A＋m×B)÷(m＋n)\n＝(' + n + '×A＋' + m + '×B)÷' + (m + n) + '＝' + P(p) + (m === n ? '(中点)' : '\n💡 m:n の「m」は B 側の重みにかける(A に近いほど A の重みが大きい)。')); }
    if (t === 1) { var A = [ri(r, -6, 6), ri(r, -6, 6)], B = [ri(r, -6, 6), ri(r, -6, 6)], Cc = [ri(r, -6, 6), ri(r, -6, 6)], sx = A[0] + B[0] + Cc[0], sy = A[1] + B[1] + Cc[1];
      Cc[0] -= sx % 3; Cc[1] -= sy % 3; sx = A[0] + B[0] + Cc[0]; sy = A[1] + B[1] + Cc[1];
      return Q(2, 'A' + P(A) + '、B' + P(B) + '、C' + P(Cc) + ' のとき、△ABC の重心の座標は?', choices(P([sx / 3, sy / 3]), [P([sx, sy]), P([sx / 2, sy / 2]), P([(A[0] + B[0]) / 2, (A[1] + B[1]) / 2])]), '重心＝(3点の x の平均, y の平均)＝(' + sx + '÷3, ' + sy + '÷3)＝' + P([sx / 3, sy / 3])); }
    var a1 = nz(r, -4, 4), a2 = nz(r, -4, 4), b2 = nz(r, -3, 3) * a1, k = -a2 * b2 / a1;
    return Q(2, 'a＝' + P([a1, a2]) + '、b＝(k, ' + b2 + ') が垂直になるとき、k の値は?', numChoices(k, [-k, a2 * b2 / a1 + 1, b2]), '垂直 ⇔ 内積＝0\n' + a1 + '×k＋' + sgn(a2) + '×' + sgn(b2) + '＝0 → k＝' + k);
  };
  G.mc_curve = function (r) {
    var t = ri(r, 0, 2);
    if (t === 0) { var p = nz(r, -6, 6), ask = ri(r, 0, 1);
      return Q(2, '放物線 y²＝' + (4 * p) + 'x の' + (ask ? '準線' : '焦点') + 'は?', ask ? choices('x＝' + (-p), ['x＝' + p, 'y＝' + (-p), 'x＝' + (-4 * p)]) : choices('(' + p + ', 0)', ['(' + (4 * p) + ', 0)', '(0, ' + p + ')', '(' + (-p) + ', 0)']),
        'y²＝4px と比べて 4p＝' + (4 * p) + ' → p＝' + p + '\n焦点 (p, 0)＝(' + p + ', 0)、準線 x＝−p＝' + (-p)); }
    var T = pk(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), k = ri(r, 1, 2);
    if (t === 1) { var a = T[2] * k, b = T[1] * k, c = T[0] * k; if (ri(r, 0, 1)) { b = T[0] * k; c = T[1] * k; }
      return Q(3, '楕円 x²/' + (a * a) + '＋y²/' + (b * b) + '＝1 の焦点は?', choices('(±' + c + ', 0)', ['(±' + Math.round(Math.sqrt(a * a + b * b) * 100) / 100 + ', 0)', '(0, ±' + c + ')', '(±' + a + ', 0)']),
        '楕円(a＞b)の焦点は (±√(a²−b²), 0)\n√(' + (a * a) + '−' + (b * b) + ')＝√' + (c * c) + '＝' + c); }
    var A2 = T[0] * k, B2 = T[1] * k, Cf = T[2] * k, ask2 = ri(r, 0, 1), g = gcd(A2, B2);
    return Q(3, '双曲線 x²/' + (A2 * A2) + '−y²/' + (B2 * B2) + '＝1 の' + (ask2 ? '漸近線' : '焦点') + 'は?', ask2 ? choices('y＝±' + frac(B2, A2) + 'x', ['y＝±' + frac(A2, B2) + 'x', 'y＝±' + (B2 / g) + 'x', 'x＝±' + A2]) : choices('(±' + Cf + ', 0)', ['(±' + Math.round(Math.sqrt(Math.abs(A2 * A2 - B2 * B2)) * 100) / 100 + ', 0)', '(0, ±' + Cf + ')', '(±' + A2 + ', 0)']),
      '双曲線 x²/a²−y²/b²＝1 の焦点は (±√(a²＋b²), 0)、漸近線は y＝±(b/a)x\na＝' + A2 + '、b＝' + B2 + ' → ' + (ask2 ? 'y＝±' + frac(B2, A2) + 'x' : '√(' + (A2 * A2) + '＋' + (B2 * B2) + ')＝' + Cf));
  };
  G.mc_cplane = function (r) {
    var t = ri(r, 0, 2);
    if (t === 0) { var T = pk(r, TRI), k = ri(r, 1, 2), a = T[0] * k * pk(r, [1, -1]), b = T[1] * k * pk(r, [1, -1]);
      return Q(1, '複素数 ' + a + (b < 0 ? '−' + (-b) : '＋' + b) + 'i の絶対値は?', numChoices(T[2] * k, [Math.abs(a) + Math.abs(b), T[2] * k * T[2] * k, Math.abs(b)]), '|a＋bi|＝√(a²＋b²)＝√(' + (a * a) + '＋' + (b * b) + ')＝' + (T[2] * k)); }
    if (t === 1) { var n = ri(r, 2, 12), z = [[1, 0], [0, 1], [-1, 0], [0, -1]][n % 4], amp = Math.pow(2, n / 2), m4 = n % 2;
      if (m4) { n = n + 1; }
      var re = Math.round(Math.pow(2, n / 2) * Math.cos(n * Math.PI / 4)), im = Math.round(Math.pow(2, n / 2) * Math.sin(n * Math.PI / 4));
      var f = function (x, y) { return y === 0 ? String(x) : x === 0 ? (y === 1 ? '' : y === -1 ? '−' : y) + 'i' : x + (y < 0 ? '−' + (-y) : '＋' + y) + 'i'; };
      return Q(3, '(1＋i)' + String(n).replace(/\d/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]; }) + ' を計算すると?', choices(f(re, im), [f(-re, -im), f(im, re), f(re === 0 ? Math.pow(2, n / 2) : re * 2, im)]),
        '1＋i＝√2(cos45°＋i sin45°)\nド・モアブルの定理:(1＋i)^' + n + '＝(√2)^' + n + '(cos' + (45 * n) + '°＋i sin' + (45 * n) + '°)\n＝' + Math.pow(2, n / 2) + '×(cos' + (45 * n % 360) + '°＋i sin' + (45 * n % 360) + '°)＝' + f(re, im)); }
    var r1 = ri(r, 1, 5), r2 = ri(r, 1, 5), t1 = pk(r, [30, 45, 60, 90, 120]), t2 = pk(r, [30, 45, 60, 90, 150]);
    return Q(2, '絶対値 ' + r1 + '・偏角 ' + t1 + '° の複素数と、絶対値 ' + r2 + '・偏角 ' + t2 + '° の複素数の積の絶対値と偏角は?', choices('絶対値 ' + (r1 * r2) + '、偏角 ' + ((t1 + t2) % 360) + '°', ['絶対値 ' + (r1 + r2) + '、偏角 ' + ((t1 + t2) % 360) + '°', '絶対値 ' + (r1 * r2) + '、偏角 ' + (t1 * t2 % 360) + '°', '絶対値 ' + (r1 * r2) + '、偏角 ' + Math.abs(t1 - t2) + '°']),
      '複素数のかけ算は「絶対値はかけ算、偏角はたし算」\n→ 絶対値 ' + r1 + '×' + r2 + '＝' + (r1 * r2) + '、偏角 ' + t1 + '°＋' + t2 + '°＝' + ((t1 + t2) % 360) + '°\n💡 複素数平面では、回転と拡大を表す。');
  };
  G.mc_matrix = function (r) {
    var a = ri(r, -3, 4), b = ri(r, -3, 4), c = ri(r, -3, 4), d = ri(r, -3, 4), t = ri(r, 0, 2), M = function (p, q, s, u) { return '(' + p + ' ' + q + ' ／ ' + s + ' ' + u + ')'; };
    if (t === 0) { var D = a * d - b * c;
      return Q(2, '行列 ' + M(a, b, c, d) + ' の行列式 ad−bc は?(「／」の前が1行目)', numChoices(D, [a * d + b * c, a * b - c * d, a + d]), 'ad−bc＝' + a + '×' + sgn(d) + '−' + sgn(b) + '×' + sgn(c) + '＝' + D + '\n💡 0 でなければ逆行列がある。'); }
    if (t === 1) { var e = ri(r, -3, 3), f = ri(r, -3, 3);
      return Q(2, '行列 ' + M(a, b, c, d) + ' と列ベクトル (' + e + ', ' + f + ') の積は?', choices('(' + (a * e + b * f) + ', ' + (c * e + d * f) + ')', ['(' + (a * e + c * f) + ', ' + (b * e + d * f) + ')', '(' + (a * e) + ', ' + (d * f) + ')', '(' + (a + b) * e + ', ' + (c + d) * f + ')']),
        '「行×列」:1行目 ' + a + '×' + sgn(e) + '＋' + sgn(b) + '×' + sgn(f) + '＝' + (a * e + b * f) + '、2行目 ' + c + '×' + sgn(e) + '＋' + sgn(d) + '×' + sgn(f) + '＝' + (c * e + d * f)); }
    var p = ri(r, -2, 3), q = ri(r, -2, 3), s = ri(r, -2, 3), u = ri(r, -2, 3);
    return Q(3, 'A＝' + M(a, b, c, d) + '、B＝' + M(p, q, s, u) + ' のとき、積 AB の (1,1) 成分は?(「／」の前が1行目)', numChoices(a * p + b * s, [a * p + b * q, a * p + c * s, a * p * b * s]), 'AB の (1,1) 成分＝A の1行目 × B の1列目\n＝' + a + '×' + sgn(p) + '＋' + sgn(b) + '×' + sgn(s) + '＝' + (a * p + b * s) + '\n💡 一般に AB と BA は等しくない。');
  };
})();
