/* 入試レベル(複数単元の総合)の自動生成問題。すべて思考レベル3(応用)。正解は choices[0]。 */
(function () {
  var H = WPS.GENH, G = WPS.GEN;
  var ri = H.ri, nz = H.nz, pk = H.pk, shuffle = H.shuffle, frac = H.frac, poly = H.poly, sgn = H.sgn, choices = H.choices, numChoices = H.numChoices, Q = H.Q, num = H.num, mix = H.mix;
  function C(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function PI(f) { return f === '1' ? 'π' : f.indexOf('/') > 0 ? f.split('/')[0] + 'π/' + f.split('/')[1] : f + 'π'; }
  function sq3(f) { return f === '1' ? '√3' : f.indexOf('/') > 0 ? f.split('/')[0] + '√3/' + f.split('/')[1] : f + '√3'; }
  function U(q, unit) { q.choices = q.choices.map(function (c) { return c + unit; }); return q; }

  /* ---------- 中学数学の総合 ---------- */
  G.mx_jh = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { // 放物線 y＝ax² と直線の交点 A(−p), B(q)、△OAB の面積
      var a = pk(r, [1, 1, 0.5]), p = ri(r, 1, 4) * (a === 0.5 ? 2 : 1), q = ri(r, 1, 4) * (a === 0.5 ? 2 : 1);
      var b = a * p * q, slope = a * (q - p), S = b * (p + q) / 2;
      var A = '(' + (-p) + ', ' + num(a * p * p) + ')', B = '(' + q + ', ' + num(a * q * q) + ')';
      return Q(3, '放物線 y＝' + (a === 1 ? '' : '1/2') + 'x² 上に、x座標が ' + (-p) + ' の点 A と ' + q + ' の点 B がある。原点を O とするとき、△OAB の面積は?', numChoices(S, [b * (p + q), a * p * q, S + b]),
        '①A' + A + '、B' + B + '\n②直線 AB の傾き＝(' + num(a * q * q) + '−' + num(a * p * p) + ')÷(' + q + '−(' + (-p) + '))＝' + num(slope) + '、切片＝' + num(b) + '\n③△OAB を y軸で2つに分けると、面積＝切片×(左右の幅)÷2＝' + num(b) + '×(' + p + '＋' + q + ')÷2＝' + num(S) + '\n【使う単元】関数 y＝ax²、一次関数(直線の式)、三角形の面積'); }
    if (t === 1) { // 円すい:母線と半径 → 高さ(三平方) → 体積
      var T = pk(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]]);
      return Q(3, '底面の半径 ' + T[0] + 'cm、母線の長さ ' + T[2] + 'cm の円すいの体積は?', choices(PI(String(T[0] * T[0] * T[1] / 3 % 1 ? frac(T[0] * T[0] * T[1], 3) : T[0] * T[0] * T[1] / 3)) + 'cm³', [PI(String(T[0] * T[0] * T[1])) + 'cm³', PI(String(T[0] * T[0] * T[2] / 3 % 1 ? frac(T[0] * T[0] * T[2], 3) : T[0] * T[0] * T[2] / 3)) + 'cm³', PI(String(T[0] * T[1])) + 'cm³']),
        '①三平方の定理で高さ:√(' + T[2] + '²−' + T[0] + '²)＝' + T[1] + 'cm\n②体積＝π×' + T[0] + '²×' + T[1] + '÷3\n【使う単元】三平方の定理、空間図形(錐の体積)'); }
    if (t === 2) { // 2直線の交点と y軸で囲まれた三角形
      var m1 = nz(r, 1, 3), m2 = -nz(r, 1, 3), x0 = ri(r, 1, 4), y0 = ri(r, 1, 6), b1 = y0 - m1 * x0, b2 = y0 - m2 * x0, S2 = Math.abs(b1 - b2) * x0 / 2;
      return Q(3, '2直線 y＝' + poly([[m1, 'x'], [b1, '']]) + ' と y＝' + poly([[m2, 'x'], [b2, '']]) + ' と y軸で囲まれた三角形の面積は?', numChoices(S2, [Math.abs(b1 - b2) * x0, Math.abs(b1 - b2), x0 * y0]),
        '①連立方程式で交点を求める:' + poly([[m1, 'x'], [b1, '']]) + '＝' + poly([[m2, 'x'], [b2, '']]) + ' → x＝' + x0 + '、y＝' + y0 + '\n②底辺(y軸上)＝切片の差 ' + Math.abs(b1 - b2) + '、高さ＝交点の x座標 ' + x0 + '\n③面積＝' + Math.abs(b1 - b2) + '×' + x0 + '÷2＝' + num(S2) + '\n【使う単元】連立方程式、一次関数、三角形の面積'); }
    // 確率×関数:大小2つのさいころの目 (a, b) が直線 y＝x＋k 上
    var k = ri(r, -3, 3), cnt = 0; for (var a2 = 1; a2 <= 6; a2++) for (var b2 = 1; b2 <= 6; b2++) if (b2 === a2 + k) cnt++;
    return Q(3, '大小2つのさいころを投げ、大の目を a、小の目を b とする。点 (a, b) が直線 y＝x' + (k > 0 ? '＋' + k : k < 0 ? '−' + (-k) : '') + ' 上にある確率は?', choices(frac(cnt, 36), [frac(cnt + 1, 36), frac(cnt, 6), frac(6 - Math.abs(k) + 1, 36)]),
      'b＝a' + (k > 0 ? '＋' + k : k < 0 ? '−' + (-k) : '') + ' を満たす (a, b) を数える → ' + cnt + '通り\n全部で 6×6＝36通りなので ' + cnt + '/36＝' + frac(cnt, 36) + '\n【使う単元】確率、一次関数');
  };

  /* ---------- 数Ⅰ・Aの総合 ---------- */
  G.mx_h1 = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { // 判別式:x²−2mx＋n(n＋1)＝m … 実数解をもつ m の範囲
      var n = ri(r, 1, 6), c = n * (n + 1);
      return Q(3, 'x の2次方程式 x²−2mx＋m＋' + c + '＝0 が実数解をもつような定数 m の値の範囲は?', choices('m≦' + (-n) + ', ' + (n + 1) + '≦m', [(-n) + '≦m≦' + (n + 1), 'm＜' + (-n) + ', ' + (n + 1) + '＜m', 'm≦' + (-(n + 1)) + ', ' + n + '≦m']),
        '①実数解をもつ ⇔ 判別式 D≧0\nD/4＝m²−(m＋' + c + ')＝m²−m−' + c + '＝(m＋' + n + ')(m−' + (n + 1) + ')≧0\n②2次不等式を解く → m≦' + (-n) + ', ' + (n + 1) + '≦m\n【使う単元】判別式、因数分解、2次不等式'); }
    if (t === 1) { // f(x)＝x²−2ax＋3(0≦x≦2)の最小値(場合分け)
      var a = pk(r, [-3, -2, -1, 0.5, 1, 1.5, 3, 4]), mn = a < 0 ? 3 : a <= 2 ? 3 - a * a : 7 - 4 * a;
      return Q(3, 'a＝' + num(a) + ' のとき、f(x)＝x²−2ax＋3(0≦x≦2)の最小値は?(軸と定義域の位置で場合分け)', numChoices(mn, [3 - a * a, 3, 7 - 4 * a].filter(function (v) { return v !== mn; })),
        '①平方完成:f(x)＝(x−a)²＋3−a²、軸は x＝a\n②' + (a < 0 ? '軸が定義域より左(a＜0) → x＝0 で最小:f(0)＝3' : a <= 2 ? '軸が定義域の中(0≦a≦2) → 頂点で最小:3−a²＝' + num(3 - a * a) : '軸が定義域より右(a＞2) → x＝2 で最小:f(2)＝7−4a＝' + num(7 - 4 * a)) + '\n【使う単元】2次関数の最大・最小、場合分け'); }
    if (t === 2) { // 反復試行
      var nn = ri(r, 3, 5), kk = ri(r, 1, nn - 1), P = pk(r, [[1, 6, 'さいころで1の目'], [1, 2, '硬貨で表'], [1, 3, 'さいころで3の倍数の目']]);
      var numr = C(nn, kk) * Math.pow(P[0], kk) * Math.pow(P[1] - P[0], nn - kk), den = Math.pow(P[1], nn);
      return Q(3, P[2] + 'が出る確率を考える。' + nn + '回くり返すとき、ちょうど ' + kk + ' 回出る確率は?', choices(frac(numr, den), [frac(Math.pow(P[0], kk) * Math.pow(P[1] - P[0], nn - kk), den), frac(C(nn, kk) * Math.pow(P[0], kk), Math.pow(P[1], kk)), frac(numr * 2, den)]),
        '【反復試行】ₙCₖ×p^k×(1−p)^(n−k)\n＝' + nn + 'C' + kk + '×(' + P[0] + '/' + P[1] + ')^' + kk + '×(' + (P[1] - P[0]) + '/' + P[1] + ')^' + (nn - kk) + '＝' + frac(numr, den) + '\n【使う単元】場合の数(組合せ)、確率'); }
    // 余弦定理×面積
    var A = pk(r, [60, 120]), b = ri(r, 2, 8), c = ri(r, 2, 8), a2 = A === 60 ? b * b + c * c - b * c : b * b + c * c + b * c;
    return Q(3, '△ABC で b＝' + b + '、c＝' + c + '、A＝' + A + '° のとき、a² の値と面積の組として正しいものは?', choices('a²＝' + a2 + '、面積 ' + sq3(frac(b * c, 4)), ['a²＝' + (b * b + c * c) + '、面積 ' + sq3(frac(b * c, 4)), 'a²＝' + a2 + '、面積 ' + sq3(frac(b * c, 2)), 'a²＝' + (A === 60 ? b * b + c * c + b * c : b * b + c * c - b * c) + '、面積 ' + sq3(frac(b * c, 4))]),
      '①余弦定理:a²＝b²＋c²−2bc cosA＝' + (b * b) + '＋' + (c * c) + (A === 60 ? '−' : '＋') + (b * c) + '＝' + a2 + '\n②面積＝½bc sinA＝½×' + b + '×' + c + '×√3/2＝' + sq3(frac(b * c, 4)) + '\n【使う単元】余弦定理、三角比、三角形の面積');
  };

  /* ---------- 数Ⅱ・Bの総合 ---------- */
  var CUB = [['x³−3x', -1, 2, 1, -2], ['x³−12x', -2, 16, 2, -16], ['x³−3x²', 0, 0, 2, -4], ['x³−3x²−9x', -1, 5, 3, -27], ['2x³−3x²−12x', -1, 7, 2, -20], ['x³−6x²＋9x', 1, 4, 3, 0], ['−x³＋3x', 1, 2, -1, -2], ['x³−27x', -3, 54, 3, -54]];
  G.mx_h2 = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var F = pk(r, CUB), k = ri(r, -9, 9), ask = ri(r, 0, 1);
      return Q(3, 'f(x)＝' + F[0] + (k ? (k > 0 ? '＋' + k : '−' + (-k)) : '') + ' の' + (ask ? '極小値' : '極大値') + 'は?', numChoices(ask ? F[4] + k : F[2] + k, [ask ? F[2] + k : F[4] + k, ask ? F[4] : F[2], ask ? F[3] : F[1]]),
        '①f′(x)＝0 を解いて、極値をとる x を求める → x＝' + F[1] + '(極大)、x＝' + F[3] + '(極小)\n②代入:極大値 ' + (F[2] + k) + '、極小値 ' + (F[4] + k) + '\n【使う単元】微分(導関数・増減表)'); }
    if (t === 1) { var F2 = pk(r, CUB.filter(function (f) { return f[2] !== f[4]; }));
      return Q(3, '方程式 ' + F2[0] + '＋k＝0 が異なる3つの実数解をもつような定数 k の範囲は?', choices((-F2[2]) + '＜k＜' + (-F2[4]), [F2[4] + '＜k＜' + F2[2], (-F2[2]) + '≦k≦' + (-F2[4]), 'k＜' + (-F2[2]) + ', ' + (-F2[4]) + '＜k']),
        '①y＝' + F2[0] + ' の極大値 ' + F2[2] + '、極小値 ' + F2[4] + '\n②異なる3つの実数解 ⇔ 極大値＋k＞0 かつ 極小値＋k＜0\n→ ' + (-F2[2]) + '＜k＜' + (-F2[4]) + '\n【使う単元】微分(極値)、グラフと方程式の解'); }
    if (t === 2) { var n = ri(r, 3, 8), sum = Math.pow(2, n + 1) - 2 - n;
      return Q(3, 'a₁＝1、aₙ₊₁＝2aₙ＋1 で決まる数列の、初項から第 ' + n + ' 項までの和は?', numChoices(sum, [Math.pow(2, n) - 1, Math.pow(2, n + 1) - 2, sum + n]),
        '①aₙ₊₁＋1＝2(aₙ＋1) より、aₙ＋1 は初項2・公比2の等比数列 → aₙ＝2ⁿ−1\n②Σ(2^k−1)＝(2^(n＋1)−2)−n＝' + sum + '\n【使う単元】漸化式、等比数列の和、Σ'); }
    var m = ri(r, 1, 4), cc = pk(r, [1, 2, 3, 4, 5]), T2 = Math.pow(2, m);
    // t² −(T2−cc)t − T2·cc ＝ 0 → (t−T2)(t＋cc)＝0
    var B = T2 - cc, Cc = T2 * cc;
    return Q(3, '方程式 4ˣ' + (B === 0 ? '' : (B > 0 ? '−' + (B === 1 ? '' : B) : '＋' + (-B === 1 ? '' : -B)) + '·2ˣ') + '−' + Cc + '＝0 を解くと?', choices('x＝' + m, ['x＝' + T2, 'x＝' + (m + 1), 'x＝' + m + ', ' + (-cc)]),
      '①2ˣ＝t とおくと(t＞0)、t²' + (B === 0 ? '' : (B > 0 ? '−' + B : '＋' + (-B)) + 't') + '−' + Cc + '＝0 → (t−' + T2 + ')(t＋' + cc + ')＝0\n②t＞0 なので t＝' + T2 + ' → 2ˣ＝' + T2 + ' → x＝' + m + '\n【使う単元】指数関数、置きかえ、2次方程式');
  };

  /* ---------- 数Ⅲ・Cの総合 ---------- */
  G.mx_h3 = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var m = ri(r, 1, 5), c = ri(r, 1, 6);
      return Q(3, 'lim(n→∞) (1/n)Σ[k＝1→n] ' + (c === 1 ? '' : c) + '(k/n)' + (m === 1 ? '' : '^' + m) + ' の値は?', choices(frac(c, m + 1), [frac(c, m), String(c), frac(c * (m + 1), 1)]),
        '【区分求積法】lim(1/n)Σf(k/n)＝∫[0→1]f(x)dx\n＝∫[0→1]' + (c === 1 ? '' : c) + 'x' + (m === 1 ? '' : '^' + m) + 'dx＝' + c + '/' + (m + 1) + '\n【使う単元】数列の和の極限、定積分'); }
    if (t === 1) { var a = ri(r, 1, 4), b = ri(r, 1, 4), ab = pk(r, [0, 1, 2, -1, 3]), m2 = ri(r, 1, 3), n2 = ri(r, 1, 3), s = m2 + n2;
      var numr = n2 * n2 * a * a + 2 * m2 * n2 * ab + m2 * m2 * b * b;
      return Q(3, '|a|＝' + a + '、|b|＝' + b + '、a・b＝' + ab + ' のとき、OA＝a、OB＝b とし、AB を ' + m2 + ':' + n2 + ' に内分する点を P とする。|OP|² は?', choices(frac(numr, s * s), [frac(n2 * n2 * a * a + m2 * m2 * b * b, s * s), frac(numr, s), frac(numr + 2, s * s)]),
        '①OP＝(' + n2 + 'a＋' + m2 + 'b)/' + s + '\n②|OP|²＝(' + n2 + '²|a|²＋2×' + n2 + '×' + m2 + 'a・b＋' + m2 + '²|b|²)/' + s + '²＝' + numr + '/' + (s * s) + '＝' + frac(numr, s * s) + '\n【使う単元】ベクトルの内分点、内積'); }
    if (t === 2) { var k = nz(r, 2, 9), m3 = ri(r, 1, 4);
      return Q(3, 'lim(x→0) (e^(' + k + 'x)−1)/(' + (m3 === 1 ? '' : m3) + 'x) の値は?', choices(frac(k, m3), [frac(m3, k), '1', '0']),
        'lim(x→0)(eˣ−1)/x＝1 を使う\n(e^(' + k + 'x)−1)/(' + (m3 === 1 ? '' : m3) + 'x)＝(' + k + '/' + m3 + ')×(e^(' + k + 'x)−1)/(' + k + 'x) → ' + frac(k, m3) + '\n💡 e^(kx) の x＝0 での微分係数 k と同じ。\n【使う単元】関数の極限、微分係数の定義'); }
    var A = ri(r, 1, 8);
    return Q(3, '曲線 y＝√x(0≦x≦' + A + ')と x軸の間の部分を、x軸のまわりに1回転してできる立体の体積は?', choices(PI(frac(A * A, 2)), [PI(frac(A * A, 3)), PI(String(A * A)), PI(frac(2 * A * Math.sqrt(A) % 1 ? A : A, 3))]),
      'V＝π∫[0→' + A + '](√x)²dx＝π∫[0→' + A + ']x dx＝π×' + A + '²/2＝' + PI(frac(A * A, 2)) + '\n【使う単元】定積分、回転体の体積');
  };

  /* ---------- 中学理科の総合 ---------- */
  G.sx_jh = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var R1 = pk(r, [2, 3, 4, 5, 6]), R2 = pk(r, [2, 4, 6, 10]), I = pk(r, [0.5, 1, 1.5, 2]), V = (R1 + R2) * I;
      return U(Q(3, R1 + 'Ω と ' + R2 + 'Ω の抵抗を直列につなぎ、' + num(V) + 'V の電源につないだ。' + R1 + 'Ω の抵抗の消費電力は?', numChoices(I * I * R1, [V * I, I * R1, I * I * R2]),
        '①全体の抵抗 ' + (R1 + R2) + 'Ω → 電流＝' + num(V) + '÷' + (R1 + R2) + '＝' + num(I) + 'A(直列なのでどこも同じ)\n②' + R1 + 'Ω にかかる電圧＝' + num(I) + '×' + R1 + '＝' + num(I * R1) + 'V\n③電力＝電圧×電流＝' + num(I * R1) + '×' + num(I) + '＝' + num(I * I * R1) + 'W\n【使う単元】オームの法則、直列回路、電力'), 'W'); }
    if (t === 1) { var P = pk(r, [6, 9, 12, 18, 24]), min = pk(r, [2, 5, 7, 10]), m = pk(r, [100, 150, 200]), Qj = P * min * 60, dT = Math.round(Qj / (4.2 * m) * 10) / 10;
      return Q(3, P + 'W の電熱線で水 ' + m + 'g を ' + min + ' 分間温めた。発生した熱がすべて水に使われたとすると、水の温度は約何℃上がる?(水1gを1℃上げる熱量 4.2J)', choices('約' + num(dT) + '℃', ['約' + num(Math.round(P * min / (4.2 * m) * 10) / 10) + '℃', '約' + num(Math.round(Qj / m * 10) / 10) + '℃', '約' + num(Math.round(dT * 2 * 10) / 10) + '℃']),
        '①発熱量＝電力×時間(秒)＝' + P + '×' + (min * 60) + '＝' + Qj + 'J\n②上昇温度＝熱量÷(4.2×質量)＝' + Qj + '÷(4.2×' + m + ')≒' + num(dT) + '℃\n【使う単元】電力・熱量、単位の換算'); }
    if (t === 2) { var kg = pk(r, [2, 3, 4, 5, 6, 8, 10]), a = pk(r, [10, 20, 25, 50]), b = pk(r, [10, 20, 40]), N = kg * 10, area = a * b / 10000, Pa = Math.round(N / area);
      return U(Q(3, '質量 ' + kg + 'kg の直方体を、縦 ' + a + 'cm・横 ' + b + 'cm の面を下にして置いた。床が受ける圧力は?(100g にはたらく重力を1Nとする)', numChoices(Pa, [Math.round(N / area / 10), Math.round(kg * 1000 / area), Pa * 10]),
        '①力＝' + kg + 'kg → ' + N + 'N\n②面積＝' + (a * b) + 'cm²＝' + num(area) + 'm²\n③圧力＝力÷面積＝' + N + '÷' + num(area) + '＝' + Pa + 'Pa\n【使う単元】力と重さ、圧力、単位の換算'), 'Pa'); }
    var w = pk(r, [100, 200]), Sv = pk(r, [[60, 109, 31.6, '硝酸カリウム'], [40, 64, 23.0, '硝酸カリウム'], [80, 169, 31.6, '硝酸カリウム']]), x = Math.round((Sv[1] - Sv[2]) * w / 100 * 10) / 10;
    return Q(3, Sv[0] + '℃の水 ' + w + 'g に' + Sv[3] + 'をとけるだけとかした飽和水溶液を、20℃まで冷やすと、何gの結晶が出てくる?(100g の水にとける量:' + Sv[0] + '℃で ' + Sv[1] + 'g、20℃で ' + Sv[2] + 'g)', choices(num(x) + 'g', [num(Sv[1] - Sv[2]) + 'g', num(Sv[1] * w / 100) + 'g', num(x / 2) + 'g']),
      '①水 ' + w + 'g に、' + Sv[0] + '℃では ' + num(Sv[1] * w / 100) + 'g、20℃では ' + num(Sv[2] * w / 100) + 'g までとける\n②出てくる結晶＝その差＝' + num(x) + 'g\n【使う単元】溶解度、再結晶、比例');
  };

  /* ---------- 物理基礎・化学基礎の総合 ---------- */
  G.sx_h = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var c1 = pk(r, [0.1, 0.2, 0.05]), v1 = pk(r, [10, 20, 25]), val = pk(r, [1, 2]), c2 = pk(r, [0.1, 0.2]), v2 = Math.round(val * c1 * v1 / c2 * 100) / 100, acid = val === 2 ? '硫酸(2価)' : '塩酸(1価)';
      return Q(3, num(c1) + 'mol/L の' + acid + ' ' + v1 + 'mL を、' + num(c2) + 'mol/L の水酸化ナトリウム水溶液で中和するのに必要な体積は?', choices(num(v2) + 'mL', [num(Math.round(c1 * v1 / c2 * 100) / 100 * (val === 2 ? 1 : 2)) + 'mL', num(v1) + 'mL', num(v2 * 2) + 'mL']),
        '【中和】酸の価数×濃度×体積＝塩基の価数×濃度×体積\n' + val + '×' + num(c1) + '×' + v1 + '＝1×' + num(c2) + '×V → V＝' + num(v2) + 'mL\n【使う単元】物質量(mol)、酸と塩基、中和'); }
    if (t === 1) { var g = pk(r, [4, 8, 10, 20, 2]), M = 40, V = pk(r, [100, 200, 250, 500]), c = Math.round(g / M / (V / 1000) * 1000) / 1000;
      return Q(3, '水酸化ナトリウム(NaOH、式量40)' + g + 'g を水にとかして ' + V + 'mL にした水溶液のモル濃度は?', choices(num(c) + 'mol/L', [num(Math.round(g / M * 1000) / 1000) + 'mol/L', num(Math.round(g / V * 1000) / 1000) + 'mol/L', num(Math.round(c * 10 * 1000) / 1000) + 'mol/L']),
        '①物質量＝' + g + '÷40＝' + num(g / M) + 'mol\n②モル濃度＝物質量÷体積(L)＝' + num(g / M) + '÷' + num(V / 1000) + '＝' + num(c) + 'mol/L\n【使う単元】物質量(mol)、溶液の濃度'); }
    if (t === 2) { var H0 = pk(r, [[2.5, 7], [10, 14], [22.5, 21], [40, 28], [62.5, 35]]);
      return U(Q(3, '高さ ' + num(H0[0]) + 'm の位置から物体を静かに落とした。地面に達する直前の速さは?(重力加速度 9.8m/s²、空気抵抗は無視)', numChoices(H0[1], [Math.round(9.8 * H0[0]), H0[1] * 2, Math.round(H0[1] / 2)]),
        '【力学的エネルギー保存】mgh＝½mv² → v＝√(2gh)\n＝√(2×9.8×' + num(H0[0]) + ')＝√' + num(2 * 9.8 * H0[0]) + '＝' + H0[1] + 'm/s\n【使う単元】運動、仕事とエネルギー'), 'm/s'); }
    var m = pk(r, [1, 2, 4, 5]), F = pk(r, [2, 4, 6, 10]), tt = pk(r, [2, 3, 4, 5]), a = F / m, x = a * tt * tt / 2;
    return U(Q(3, 'なめらかな水平面上で、質量 ' + m + 'kg の静止した物体に ' + F + 'N の力を加え続けた。' + tt + ' 秒間に進む距離は?', numChoices(x, [a * tt, F * tt * tt / 2, a * tt * tt]),
      '①運動方程式 ma＝F → a＝' + F + '÷' + m + '＝' + num(a) + 'm/s²\n②等加速度運動 x＝½at²＝½×' + num(a) + '×' + tt + '²＝' + num(x) + 'm\n【使う単元】運動の法則、等加速度直線運動'), 'm');
  };

  /* ---------- 歴史の因果関係 ---------- */
  function causeGen(bankKey, pre) {
    return function (r, seed) {
      var C = WPS.HCTX || {}, all = WPS.BANK[bankKey].filter(function (x) { return C[pre + x.t]; });
      var it = all[seed % all.length], c = C[pre + it.t], others = shuffle(r, all.filter(function (x) { return x !== it; })).slice(0, 3), type = Math.floor(seed / all.length) % 2;
      var cut = function (s) { return s.length > 60 ? s.slice(0, 58) + '…' : s; };
      if (type === 0) return Q(3, '「' + it.m + '」の結果、どうなった?', [cut(c[1])].concat(others.map(function (o) { return cut(C[pre + o.t][1]); })),
        '【' + it.m + '(' + (it.t < 0 ? '紀元前' + (-it.t) : it.t) + '年)】\nなぜ起きた?:' + c[0] + '\nどうなった?:' + c[1] + '\n💡 ほかの選択肢は、それぞれ別のできごとの結果です。');
      return Q(3, '次の「背景」から起きたできごとは?\n「' + cut(c[0]) + '」', [it.m].concat(others.map(function (o) { return o.m; })),
        '背景:' + c[0] + '\n→ ' + it.m + '(' + (it.t < 0 ? '紀元前' + (-it.t) : it.t) + '年)\nその結果:' + c[1]);
    };
  }
  G.hx_jhist = causeGen('jhistory', 'j:');
  function century(r, seed) {
    var W = WPS.BANK.whistory, it = W[seed % W.length], y = it.t, c = y > 0 ? Math.ceil(y / 100) : Math.ceil(-y / 100);
    var lab = function (n, bc) { return (bc ? '紀元前' : '') + n + '世紀'; }, bc = y < 0;
    var opts = [lab(c, bc)]; [c - 1, c + 1, c + 2, c - 2].forEach(function (n) { if (n > 0 && opts.length < 4) opts.push(lab(n, bc)); });
    var C = (WPS.HCTX || {})['w:' + y];
    return Q(3, '「' + it.m + '」が起きたのは何世紀?', opts, (bc ? '紀元前' + (-y) : y) + '年 → ' + lab(c, bc) + '(' + (bc ? '' : (c - 1) + '01〜' + c + '00年') + ')' + (C ? '\n背景:' + C[0] + '\n結果:' + C[1] : '') + '\n💡 1世紀は100年。1801〜1900年が19世紀。');
  }
  G.hx_whist = mix([causeGen('whistory', 'w:'), century]);

  /* ---------- 情報Ⅰの総合 ---------- */
  G.ix_info = function (r) {
    var t = ri(r, 0, 3);
    if (t === 0) { var W = pk(r, [640, 800, 1024, 1280, 1920]), Hh = pk(r, [480, 600, 720, 1080]), bit = pk(r, [8, 16, 24]), B = W * Hh * bit / 8, MB = Math.round(B / 1000000 * 100) / 100;
      return Q(3, '横 ' + W + '・縦 ' + Hh + ' 画素で、1画素を ' + bit + 'ビットで表す画像のデータ量は約何MB?(1MB＝100万バイトとする)', choices('約' + num(MB) + 'MB', ['約' + num(Math.round(W * Hh * bit / 1000000 * 100) / 100) + 'MB', '約' + num(Math.round(MB / 8 * 100) / 100) + 'MB', '約' + num(Math.round(W * Hh / 1000000 * 100) / 100) + 'MB']),
        '①ビット数＝画素数×1画素のビット＝' + W + '×' + Hh + '×' + bit + '\n②バイトに直す(÷8)＝' + B + 'バイト\n③MB に直す(÷100万)≒' + num(MB) + 'MB\n【使う単元】情報のデジタル化、データ量の単位'); }
    if (t === 1) { var a = ri(r, 5, 60), b = ri(r, 5, 60), bin = function (n) { return n.toString(2); };
      return Q(3, '2進数 ' + bin(a) + ' と ' + bin(b) + ' の和を、10進数で表すと?', numChoices(a + b, [parseInt(bin(a) + bin(b), 2) % 200, Math.abs(a - b), a + b + 1]),
        bin(a) + '(2)＝' + a + '、' + bin(b) + '(2)＝' + b + '\n和＝' + (a + b) + '(2進数では ' + bin(a + b) + ')\n【使う単元】2進数と10進数の変換、2進数の計算'); }
    if (t === 2) { var A2 = ri(r, 0, 1), B2 = ri(r, 0, 1), Cc = ri(r, 0, 1), f = pk(r, [['(A AND B) OR C', function (x, y, z) { return (x & y) | z; }], ['A AND (B OR C)', function (x, y, z) { return x & (y | z); }], ['NOT A AND B', function (x, y, z) { return (1 - x) & y; }], ['(A OR B) AND NOT C', function (x, y, z) { return (x | y) & (1 - z); }], ['A XOR B', function (x, y) { return x ^ y; }]]);
      var v = f[1](A2, B2, Cc);
      return Q(3, 'A＝' + A2 + '、B＝' + B2 + '、C＝' + Cc + ' のとき、論理式 ' + f[0] + ' の値は?', [String(v), String(1 - v)],
        '真理値:AND は両方1のとき1、OR はどちらかが1なら1、NOT は反転、XOR はちがうとき1\n→ ' + f[0] + '＝' + v + '\n【使う単元】論理演算、アルゴリズム'); }
    var hx = ri(r, 16, 255);
    return Q(3, '10進数 ' + hx + ' を16進数で表すと?', choices(hx.toString(16).toUpperCase(), [(hx + 1).toString(16).toUpperCase(), hx.toString(8), (hx ^ 15).toString(16).toUpperCase()]),
      hx + '÷16＝' + Math.floor(hx / 16) + ' あまり ' + (hx % 16) + '\n→ 16進数では ' + hx.toString(16).toUpperCase() + '(10〜15 は A〜F)\n2進数では ' + hx.toString(2) + '(4ビットずつ区切ると16進数の1けたになる)\n【使う単元】2進数・16進数');
  };

  /* ---------- 英語:入試レベルの文法・語法 ---------- */
  function cloze(list) { return function (r, seed) { var it = list[seed % list.length]; return Q(3, it[0], [it[1]].concat(it[2]), it[3], { say: it[0].replace(/\(\s*\)/, it[1]) }); }; }
  G.ex_eng = cloze([
    ['If I had taken his advice then, I (   ) in trouble now.', 'would not be', ['would not have been', 'will not be', 'had not been'], '混合仮定法:if 節は過去(had taken)、主節は今(now)→ would＋原形。【時制・仮定法】'],
    ['(   ) for your help, I could not have finished the work.', 'Had it not been', ['If it were not', 'Were it not', 'Without it had been'], 'If it had not been for の if を省いた倒置。過去の内容なので had been。【仮定法・倒置】'],
    ['This is the town (   ) I visited ten years ago.', 'which', ['where', 'what', 'when'], 'visit は他動詞で目的語が必要 → 関係代名詞 which。where は使えない。【関係詞】'],
    ['This is the town (   ) I lived ten years ago.', 'where', ['which', 'what', 'that'], 'live は自動詞 → 場所を表す関係副詞 where(＝in which)。【関係詞】'],
    ['She is the only person (   ) I believe can solve the problem.', 'who', ['whom', 'which', 'whose'], '関係詞の後に I believe が挿入。who can solve の主格。【関係詞・挿入】'],
    ['By the time you arrive, we (   ) dinner.', 'will have finished', ['finish', 'will finish', 'have finished'], 'By the time＋現在形(未来の意味)、主節は未来完了。【時制】'],
    ['I have been waiting here since I (   ) at noon.', 'arrived', ['have arrived', 'arrive', 'had arrived'], 'since の後ろは過去の一点 → 過去形。主節は現在完了進行形。【時制】'],
    ['It is high time you (   ) to bed.', 'went', ['go', 'will go', 'have gone'], 'It is (high) time S＋過去形＝「もう〜する時間だ」(仮定法)。【仮定法】'],
    ['I wish I (   ) harder when I was young.', 'had studied', ['studied', 'have studied', 'would study'], '過去の事実に反する願望 → I wish＋過去完了。【仮定法・時制】'],
    ['He talks as if he (   ) everything about it.', 'knew', ['knows', 'has known', 'will know'], 'as if＋仮定法過去＝「まるで〜であるかのように」。【仮定法】'],
    ['Not until he lost his health (   ) the value of it.', 'did he realize', ['he realized', 'he did realize', 'realized he'], 'Not until 〜 が文頭 → 倒置。【倒置・時制】'],
    ['The book, (   ) cover is red, is mine.', 'whose', ['which', 'that', 'of which the'], '所有格の関係代名詞 whose。非制限用法。【関係詞】'],
    ['(   ) he says is not always true.', 'What', ['That', 'Which', 'Whom'], '先行詞を含む関係代名詞 what＝the thing which。【関係詞】'],
    ['Whatever (   ), don\'t give up.', 'happens', ['happen', 'happened to', 'will happens'], 'whatever＝no matter what「何が起ころうとも」。三単現。【関係詞・譲歩】'],
    ['The more you practice, (   ) mistakes you will make.', 'the fewer', ['the less', 'fewer', 'the few'], 'the 比較級, the 比較級。mistakes は可算名詞 → fewer。【比較・語法】'],
    ['She is no more a genius (   ) I am.', 'than', ['as', 'that', 'so'], 'A is no more B than C is＝「A が B でないのは C が B でないのと同じ」。【比較】'],
    ['I would rather you (   ) here.', 'stayed', ['stay', 'to stay', 'staying'], 'would rather S＋過去形＝「S に〜してほしい」(仮定法)。【仮定法・助動詞】'],
    ['I regret (   ) you that your application was rejected.', 'to tell', ['telling', 'to have told', 'tell'], 'regret to do＝「残念ながら〜する」。regret doing は「〜したことを後悔する」。【準動詞】'],
    ['He denied (   ) the money.', 'having stolen', ['to steal', 'to have stolen', 'steal'], 'deny の後ろは動名詞。過去のことなので完了動名詞 having stolen。【準動詞・時制】'],
    ['He seems (   ) ill last week.', 'to have been', ['to be', 'being', 'having been'], 'seem の時点(今)より前のこと → 完了不定詞 to have been。【準動詞・時制】'],
    ['(   ) from the hill, the town looks beautiful.', 'Seen', ['Seeing', 'To see', 'Having seen'], '主語 the town は「見られる」側 → 過去分詞の分詞構文。【分詞構文】'],
    ['(   ) finished my homework, I went out.', 'Having', ['Being', 'Have', 'Had'], '主節より前のこと → 完了形の分詞構文 Having＋過去分詞。【分詞構文・時制】'],
    ['The weather (   ) fine, we went on a picnic.', 'being', ['been', 'was', 'to be'], '主節と主語が違うとき、分詞の前に主語を置く(独立分詞構文)。【分詞構文】'],
    ['With his eyes (   ), he listened to the music.', 'closed', ['closing', 'close', 'to close'], 'with＋O＋過去分詞「O が〜された状態で」。目は「閉じられる」側。【分詞】'],
    ['I had my wallet (   ) on the train.', 'stolen', ['steal', 'stealing', 'to steal'], 'have＋O＋過去分詞「O を〜される(被害)」。【使役・分詞】'],
    ['I couldn\'t make myself (   ) in English.', 'understood', ['understand', 'understanding', 'to understand'], 'make oneself understood「自分の言うことを分からせる」。【使役・分詞】'],
    ['It was not long (   ) he came back.', 'before', ['after', 'until', 'since'], 'It was not long before＝「まもなく〜した」。【構文】'],
    ['It goes without (   ) that health is important.', 'saying', ['to say', 'say', 'said'], 'It goes without saying that＝「〜は言うまでもない」。【構文・準動詞】'],
    ['There is no (   ) what will happen.', 'telling', ['to tell', 'tell', 'told'], 'There is no 〜ing＝「〜することはできない」。【構文・準動詞】'],
    ['Not only you but also he (   ) wrong.', 'is', ['are', 'am', 'be'], 'not only A but also B は B に動詞を合わせる → he is。【一致】'],
    ['Either you or I (   ) to go.', 'am', ['are', 'is', 'be'], 'either A or B は B に動詞を合わせる → I am。【一致】'],
    ['The number of students (   ) decreasing.', 'is', ['are', 'have', 'were'], 'The number of 〜(〜の数)は単数扱い。A number of は複数扱い。【一致】'],
    ['Ten years (   ) a long time.', 'is', ['are', 'were', 'have'], '時間・距離・金額のひとまとまりは単数扱い。【一致】'],
    ['He suggested that she (   ) a doctor.', 'see', ['sees', 'saw', 'will see'], '提案・要求の that 節は (should)＋原形。【仮定法現在】'],
    ['I\'m looking forward (   ) from you.', 'to hearing', ['to hear', 'hearing', 'for hearing'], 'look forward to 〜ing。to は前置詞。【語法・準動詞】'],
    ['You had better not (   ) such a thing.', 'say', ['to say', 'saying', 'said'], 'had better not＋原形。【助動詞】'],
    ['He must (   ) the train. He isn\'t here yet.', 'have missed', ['miss', 'missed', 'be missing'], '過去の推量 must have＋過去分詞。【助動詞・時制】'],
    ['She was made (   ) the room by her mother.', 'to clean', ['clean', 'cleaning', 'cleaned'], '使役 make の受動態では to が必要:be made to do。【受動態・使役】'],
    ['He was seen (   ) the building.', 'to enter', ['enter', 'entered', 'to entering'], '知覚動詞 see の受動態では to が必要:be seen to do。【受動態・知覚動詞】'],
    ['This problem is too difficult for me (   ).', 'to solve', ['to solve it', 'solving', 'solve'], 'too 〜 for 人 to do の文で、主語(this problem)と同じものを目的語に置かない。【不定詞】'],
    ['Hardly had I left home (   ) it began to rain.', 'when', ['than', 'then', 'that'], 'Hardly had S 過去分詞 when(before)…。No sooner なら than。【倒置・構文】'],
    ['The reason (   ) he was absent is not clear.', 'why', ['which', 'what', 'how'], 'The reason why＝理由の関係副詞。【関係詞】'],
    ['Tell me the way (   ) you solved the problem.', 'in which', ['how which', 'which', 'what'], 'the way how とは言わない。the way in which、the way、how のどれか。【関係詞】'],
    ['He is the last man (   ) a lie.', 'to tell', ['telling', 'told', 'tells'], 'the last 人 to do＝「最も〜しそうにない人」。【不定詞・構文】'],
    ['I object (   ) treated like a child.', 'to being', ['to be', 'being', 'for being'], 'object to 〜ing の to は前置詞。受け身の動名詞 being treated。【語法・準動詞】'],
    ['So small (   ) that I couldn\'t read it.', 'was the letter', ['the letter was', 'did the letter', 'the letter is'], 'So 形容詞 が文頭 → 倒置。【倒置・構文】'],
    ['She is the cleverer (   ) the two.', 'of', ['in', 'than', 'between'], 'the 比較級 of the two。【比較】'],
    ['He came home earlier than (   ).', 'usual', ['usually', 'use', 'used'], 'than usual＝「いつもより」。【比較・語法】'],
    ['I found it hard (   ) him.', 'to persuade', ['persuading', 'persuade', 'persuaded'], 'find it 形容詞 to do。it は形式目的語。【構文・不定詞】'],
    ['Little (   ) that he would become famous.', 'did they imagine', ['they imagined', 'they did imagine', 'imagined they'], 'Little が文頭 → 倒置「〜とは思いもしなかった」。【倒置】']
  ]);
})();
