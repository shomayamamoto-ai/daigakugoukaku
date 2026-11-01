/* 難関レベル(偏差値65以上)の自動生成問題。すべて思考レベル3。正解は choices[0]。 */
(function () {
  var H = WPS.GENH, G = WPS.GEN;
  var ri = H.ri, nz = H.nz, pk = H.pk, shuffle = H.shuffle, frac = H.frac, poly = H.poly, sgn = H.sgn, choices = H.choices, numChoices = H.numChoices, Q = H.Q, num = H.num, mix = H.mix, gcd = H.gcd;
  function sup(n) { return String(n).replace(/\d/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]; }); }
  function PI(f) { return f === '1' ? 'π' : f === '-1' ? '−π' : f.indexOf('/') > 0 ? f.split('/')[0] + 'π/' + f.split('/')[1] : f + 'π'; }

  /* ================= 数Ⅰ・A ================= */
  G.hd_m1 = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var n = ri(r, 1, 6), c = n * (n + 1), neg = ri(r, 0, 1);
      return Q(3, 'x の2次方程式 x²−2ax＋a＋' + c + '＝0 が、異なる2つの' + (neg ? '負' : '正') + 'の解をもつような a の範囲は?', choices(neg ? (-c) + '＜a＜' + (-n) : 'a＞' + (n + 1), neg ? ['a＜' + (-n), (-c) + '≦a≦' + (-n), 'a＜' + (-c)] : ['a＜' + (-n) + ', ' + (n + 1) + '＜a', 'a＞' + (-c), 'a≧' + (n + 1)]),
        '【解の配置】3つの条件を同時に満たす\n①判別式 D/4＝a²−a−' + c + '＝(a＋' + n + ')(a−' + (n + 1) + ')＞0 → a＜' + (-n) + ', a＞' + (n + 1) + '\n②2解の和 2a ' + (neg ? '＜0 → a＜0' : '＞0 → a＞0') + '\n③2解の積 a＋' + c + '＞0 → a＞' + (-c) + '\n→ 共通部分 ' + (neg ? (-c) + '＜a＜' + (-n) : 'a＞' + (n + 1))); }
    if (t === 1) { var a = pk(r, [2, 3, 4, 5]), b = pk(r, [3, 5, 7]), cc = ri(r, 20, 60), cnt = 0;
      if (a === b) b++;
      for (var x = 1; a * x < cc; x++) if ((cc - a * x) % b === 0 && cc - a * x > 0) cnt++;
      return Q(3, a + 'x＋' + b + 'y＝' + cc + ' を満たす自然数の組 (x, y) は何組?', numChoices(cnt, [cnt + 1, cnt > 0 ? cnt - 1 : cnt + 2, Math.floor(cc / (a + b)) === cnt ? cnt + 3 : Math.floor(cc / (a + b))]),
        'y＝(' + cc + '−' + a + 'x)÷' + b + ' が自然数になる x を、x＝1 から順に調べる(' + b + 'で割り切れるか)\n→ ' + cnt + '組\n💡 1組見つかれば、x を ' + b + ' ずつ、y を ' + a + ' ずつ変えると次の組が出る。'); }
    if (t === 2) { var A1 = ri(r, 1, 4), A2 = ri(r, 1, 4), B1 = ri(r, 1, 4), B2 = ri(r, 1, 4); if (A1 * (B1 + B2) === B1 * (A1 + A2)) B2++; var nA = A1 + A2, nB = B1 + B2;
      var pA = A1 / nA, pB = B1 / nB, ans = frac(A1 * nB, A1 * nB + B1 * nA);
      return Q(3, '袋A には赤玉 ' + A1 + ' 個・白玉 ' + A2 + ' 個、袋B には赤玉 ' + B1 + ' 個・白玉 ' + B2 + ' 個が入っている。さいころを投げて偶数なら A、奇数なら B から1個取り出したら赤玉だった。それが袋A からである確率は?', choices(ans, [frac(A1, nA), frac(A1, A1 + B1), frac(B1 * nA, A1 * nB + B1 * nA)]),
        '【原因の確率】P(A かつ 赤)÷P(赤)\nP(A かつ 赤)＝1/2×' + A1 + '/' + nA + '、P(B かつ 赤)＝1/2×' + B1 + '/' + nB + '\n→ (' + A1 + '/' + nA + ')÷(' + A1 + '/' + nA + '＋' + B1 + '/' + nB + ')＝' + ans); }
    if (t === 3) { var s = [ri(r, 2, 8), ri(r, 2, 8), ri(r, 2, 8), ri(r, 2, 8)], nu = s[0] * s[0] + s[1] * s[1] - s[2] * s[2] - s[3] * s[3], de = 2 * (s[0] * s[1] + s[2] * s[3]);
      if (Math.abs(nu) >= de) { s[2] = s[0]; s[3] = s[1]; nu = 0; }
      return Q(3, '円に内接する四角形 ABCD で、AB＝' + s[0] + '、BC＝' + s[1] + '、CD＝' + s[2] + '、DA＝' + s[3] + ' のとき、cos B の値は?', choices(frac(nu, de), [frac(-nu || 1, de), frac(nu, de / 2), frac(s[0] * s[0] + s[1] * s[1], de)]),
        '【対角線 AC を2通りに表す】D＝180°−B なので cos D＝−cos B\n△ABC:AC²＝' + (s[0] * s[0]) + '＋' + (s[1] * s[1]) + '−2×' + s[0] + '×' + s[1] + 'cos B\n△ACD:AC²＝' + (s[2] * s[2]) + '＋' + (s[3] * s[3]) + '＋2×' + s[2] + '×' + s[3] + 'cos B\n→ cos B＝' + nu + '/' + de + '＝' + frac(nu, de)); }
    var g = pk(r, [12, 14, 18, 21, 24, 27, 36, 45]), m1 = pk(r, [7, 11, 13, 17, 19, 23]), m2 = pk(r, [5, 8, 9, 10, 29, 31].filter(function (v) { return gcd(v, m1) === 1; }));
    return Q(3, '2つの数 ' + (g * m1) + ' と ' + (g * m2) + ' の最大公約数は?(ユークリッドの互除法)', numChoices(g, [g * 2, g * 3, g / 3 % 1 ? g + 6 : g / 3]), '大きい方を小さい方で割った余りで割る操作をくり返す\n→ 余りが0になる直前の割る数 ' + g + ' が最大公約数');
  };

  /* ================= 数Ⅱ・B ================= */
  G.hd_m2 = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var tt = nz(r, -3, 3), a = ri(r, 0, 6), m = 3 * tt * tt - a, b = -2 * tt * tt * tt;
      return Q(3, '曲線 y＝x³' + (a ? '−' + a + 'x' : '') + ' 上の x＝' + tt + ' の点における接線の方程式は?', choices('y＝' + poly([[m, 'x'], [b, '']]), ['y＝' + poly([[m, 'x'], [-b, '']]), 'y＝' + poly([[3 * tt * tt, 'x'], [b, '']]), 'y＝' + poly([[m, 'x'], [tt * tt * tt - a * tt, '']])]),
        '①接点 (' + tt + ', ' + (tt * tt * tt - a * tt) + ')、傾き f′(' + tt + ')＝3×' + (tt * tt) + (a ? '−' + a : '') + '＝' + m + '\n②y−(' + (tt * tt * tt - a * tt) + ')＝' + m + '(x−(' + tt + ')) → y＝' + poly([[m, 'x'], [b, '']])); }
    if (t === 1) { var k = ri(r, 1, 6);
      return Q(3, '2つの放物線 y＝x² と y＝−x²＋' + (2 * k) + 'x で囲まれた部分の面積は?', choices(frac(k * k * k, 3), [frac(k * k * k, 6), frac(2 * k * k * k, 3), String(k * k)]),
        '①交点:x²＝−x²＋' + (2 * k) + 'x → x＝0, ' + k + '\n②S＝∫[0→' + k + '](−2x²＋' + (2 * k) + 'x)dx＝2×(' + k + ')³/6＝' + frac(k * k * k, 3) + '\n💡 2放物線の差の係数が −2 なので (β−α)³/6 の2倍'); }
    if (t === 2) { var n = ri(r, 3, 10), S = (n - 1) * Math.pow(2, n) + 1;
      return Q(3, 'Σ[k＝1→' + n + '] k·2^(k−1) の値は?', numChoices(S, [n * Math.pow(2, n), (n - 1) * Math.pow(2, n), S + n]),
        'S＝1＋2·2＋3·2²＋…、2S をずらして引くと\nS−2S＝(1＋2＋…＋2^(n−1))−n·2ⁿ → S＝(n−1)·2ⁿ＋1\n→ (' + (n - 1) + ')×' + Math.pow(2, n) + '＋1＝' + S); }
    if (t === 3) { var p = ri(r, 1, 4), q = p + pk(r, [2, 4, 6]), e = 0, prod = 0;
      // log2(x−p)＋log2(x−q)＝c、解 x0 は x0−p, x0−q が2の累乗
      var X = pk(r, [[1, 2], [2, 4], [1, 4], [2, 8], [4, 8]]).slice(); var x0 = q + X[0]; p = x0 - X[1];
      var c = Math.log2(X[0] * X[1]);
      return Q(3, '方程式 log₂(x−' + p + ')＋log₂(x−' + q + ')＝' + c + ' を解くと?', choices('x＝' + x0, ['x＝' + x0 + ', ' + (p + q - x0), 'x＝' + (p + q - x0), 'x＝' + (x0 + 1)]),
        '①真数条件:x＞' + q + '\n②log₂{(x−' + p + ')(x−' + q + ')}＝' + c + ' → (x−' + p + ')(x−' + q + ')＝' + (X[0] * X[1]) + '\n③解くと x＝' + x0 + ', ' + (p + q - x0) + ' のうち、真数条件を満たすのは x＝' + x0 + '\n💡 真数条件を忘れると、余分な解が残る。'); }
    var F = pk(r, [['x³−3x', [-1, 2], [1, -2], function (x) { return x * x * x - 3 * x; }], ['x³−12x', [-2, 16], [2, -16], function (x) { return x * x * x - 12 * x; }], ['x³−3x²', [0, 0], [2, -4], function (x) { return x * x * x - 3 * x * x; }]]);
    var lo = F[1][0] - ri(r, 1, 2), hi = F[2][0] + ri(r, 0, 2), vals = [lo, F[1][0], F[2][0], hi].map(F[3]), mx = Math.max.apply(null, vals);
    return Q(3, 'f(x)＝' + F[0] + '(' + lo + '≦x≦' + hi + ')の最大値は?', numChoices(mx, [F[1][1], F[3](hi), F[3](lo)].filter(function (v) { return v !== mx; })),
      '①極値:x＝' + F[1][0] + ' で極大 ' + F[1][1] + '、x＝' + F[2][0] + ' で極小 ' + F[2][1] + '\n②端点:f(' + lo + ')＝' + F[3](lo) + '、f(' + hi + ')＝' + F[3](hi) + '\n③極値と端点の値を比べて、最大値は ' + mx + '\n💡 区間の最大は「極大値」とは限らない。');
  };

  /* ================= 数Ⅲ・C ================= */
  G.hd_m3 = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var k = ri(r, 1, 9), sgnK = k % 2 ? 1 : -1;
      return Q(3, '∫[0→π] x sin' + (k === 1 ? '' : k) + 'x dx の値は?', choices(PI(frac(sgnK, k)), [PI(frac(-sgnK, k)), k === 1 ? '2π' : PI(frac(sgnK, k * k)), '0']),
        '【部分積分】∫x sin kx dx＝−(x/k)cos kx＋(1/k²)sin kx\n[ ] を 0〜π で:−(π/' + k + ')cos(' + k + 'π)＝' + PI(frac(sgnK, k)) + '(sin の項は0)'); }
    if (t === 1) { var a = nz(r, -3, 4), b = ri(r, 1, 4);
      return Q(3, 'lim(n→∞) (1' + (a < 0 ? '−' + (-a) : '＋' + a) + '/n)^(' + (b === 1 ? '' : b) + 'n) の値は?', choices('e' + (a * b === 1 ? '' : sup(a * b).replace('⁻', '').length && a * b < 0 ? '^(' + (a * b) + ')' : sup(a * b)), ['e' + (a + b === 1 ? '' : '^(' + (a + b) + ')'), '1', '∞']),
        '(1＋a/n)^(bn)＝{(1＋a/n)^(n/a)}^(ab) → e^(ab)\nab＝' + (a * b) + ' → e^(' + (a * b) + ')'); }
    if (t === 2) { // 交点の位置ベクトル:M は OA を r:s、N は OB を p:q に内分。AN と BM の交点 P
      var R1 = ri(r, 1, 3), S1 = ri(r, 1, 3), P1 = ri(r, 1, 3), Q1 = ri(r, 1, 3);
      var m = R1 / (R1 + S1), n = P1 / (P1 + Q1); // OM＝m a、ON＝n b
      // P＝(1−u)a＋u n b ＝ v m a ＋(1−v) b → 1−u＝v m、u n＝1−v → u n＝1−(1−u)/m → u(n−1/m)＝1−1/m
      var u = (1 - 1 / m) / (n - 1 / m), xa = 1 - u, yb = u * n;
      function fr(x) { var d = 1; while (Math.abs(Math.round(x * d) - x * d) > 1e-9 && d < 400) d++; return frac(Math.round(x * d), d); }
      return Q(3, '△OAB で、辺 OA を ' + R1 + ':' + S1 + ' に内分する点を M、辺 OB を ' + P1 + ':' + Q1 + ' に内分する点を N とする。線分 AN と BM の交点を P とするとき、OP を OA＝a、OB＝b で表すと?', choices('OP＝' + fr(xa) + 'a＋' + fr(yb) + 'b', ['OP＝' + fr(yb) + 'a＋' + fr(xa) + 'b', 'OP＝' + fr(m) + 'a＋' + fr(n) + 'b', 'OP＝' + fr(xa / 2) + 'a＋' + fr(yb) + 'b']),
        '①P は AN 上:OP＝(1−s)a＋s·' + fr(n) + 'b\n②P は BM 上:OP＝t·' + fr(m) + 'a＋(1−t)b\n③a, b は1次独立なので係数を比べて s, t を求める\n→ OP＝' + fr(xa) + 'a＋' + fr(yb) + 'b'); }
    if (t === 3) { var n2 = ri(r, 2, 9), ang = (60 * n2) % 360, mod = Math.pow(2, n2), cs = { 0: [1, 0], 60: [0.5, 'h'], 120: [-0.5, 'h'], 180: [-1, 0], 240: [-0.5, '-h'], 300: [0.5, '-h'] }[ang];
      var re = mod * cs[0], im = cs[1] === 0 ? '' : (cs[1] === 'h' ? '＋' : '−') + (mod / 2 === 1 ? '' : mod / 2) + '√3i';
      var ans = (re === 0 ? '' : String(re)) + im || '0';
      return Q(3, '(1＋√3 i)' + sup(n2) + ' を計算すると?', choices(ans, [String(mod), String(-mod), (re === 0 ? '' : String(-re)) + (im ? (im[0] === '＋' ? '−' : '＋') + im.slice(1) : '') || '1']),
        '1＋√3 i＝2(cos60°＋i sin60°)\nド・モアブル:2^' + n2 + '(cos' + (60 * n2) + '°＋i sin' + (60 * n2) + '°)＝' + mod + '(cos' + ang + '°＋i sin' + ang + '°)＝' + ans); }
    var E = pk(r, [[18, 8, 3, 2], [8, 2, 2, 1], [12, 3, 3, 1], [20, 5, 4, 1], [25, 9, 3, 2.4], [50, 8, 5, 2], [45, 5, 6, 1], [32, 8, 4, 2]]);
    var y0 = E[3], c1 = function (v) { return v === 1 ? '' : num(v); };
    return Q(3, '楕円 x²/' + E[0] + '＋y²/' + E[1] + '＝1 上の点 (' + E[2] + ', ' + num(y0) + ') における接線の方程式は?', choices(c1(E[2]) + 'x/' + E[0] + '＋' + c1(y0) + 'y/' + E[1] + '＝1', [c1(E[2]) + 'x/' + E[1] + '＋' + c1(y0) + 'y/' + E[0] + '＝1', 'x/' + E[2] + '＋y/' + num(y0) + '＝1', c1(E[2]) + 'x/' + E[0] + '−' + c1(y0) + 'y/' + E[1] + '＝1']),
      '楕円 x²/a²＋y²/b²＝1 上の点 (x₀, y₀) における接線は x₀x/a²＋y₀y/b²＝1\n→ ' + E[2] + 'x/' + E[0] + '＋' + num(y0) + 'y/' + E[1] + '＝1');
  };

  /* ================= 英語 ================= */
  var HE = [
    ['Scarcely had the meeting begun (   ) the fire alarm went off.', 'when', ['than', 'that', 'then'], 'Scarcely had S 過去分詞 when …「〜するとすぐに」。'],
    ['The professor insisted that the report (   ) by Friday.', 'be submitted', ['was submitted', 'is submitted', 'would submit'], '要求の that 節は (should)＋原形。受け身なので be submitted。'],
    ['Little (   ) that his decision would change history.', 'did he realize', ['he realized', 'he did realize', 'realized he'], '否定語 Little が文頭 → 倒置。'],
    ['She is, (   ) I know, the most reliable person in the team.', 'as far as', ['as long as', 'as soon as', 'as well as'], 'as far as I know「私の知る限り」(挿入)。'],
    ['Were it not for the internet, our lives (   ) quite different.', 'would be', ['will be', 'would have been', 'are'], 'Were it not for＝If it were not for(仮定法過去)。'],
    ['(   ) the circumstances, his response was quite reasonable.', 'Given', ['Giving', 'To give', 'Having given'], 'Given 〜「〜を考慮すると」(前置詞的に使う過去分詞)。'],
    ['It is not so much what you say (   ) how you say it that matters.', 'as', ['than', 'but', 'so'], 'not so much A as B「A というよりむしろ B」。'],
    ['The novel is said (   ) into more than thirty languages.', 'to have been translated', ['to be translating', 'having translated', 'to translate'], 'is said（今）より前の受け身 → 完了受動不定詞。'],
    ['He made it a rule (   ) for a walk before breakfast.', 'to go', ['going', 'go', 'gone'], 'make it a rule to do「〜することにしている」。it は形式目的語。'],
    ['Not until the 19th century (   ) widely accepted.', 'was the theory', ['the theory was', 'did the theory', 'the theory did'], 'Not until 〜 が文頭 → 倒置。be動詞の文なので was the theory。'],
    ['The data (   ) by the research team proved invaluable.', 'collected', ['collecting', 'to collect', 'collects'], 'データは「集められた」側 → 過去分詞で後置修飾。'],
    ['I would have helped you if you (   ) me.', 'had asked', ['asked', 'would ask', 'have asked'], '仮定法過去完了:if S had 過去分詞, S would have 過去分詞。'],
    ['No sooner (   ) the station than the train left.', 'had I reached', ['I had reached', 'did I reach', 'I reached'], 'No sooner had S 過去分詞 than …。'],
    ['She speaks English as fluently as (   ) in her class.', 'anyone', ['someone', 'no one', 'everyone'], 'as 〜 as anyone「だれにも劣らず〜」(最上級に近い意味)。'],
    ['The reason (   ) he gave for his absence was unconvincing.', 'that', ['why', 'what', 'how'], 'gave の目的語が欠けている → 関係代名詞 that(which)。関係副詞 why は使えない。'],
    ['This is the house (   ) my grandfather was born.', 'in which', ['which', 'that', 'what'], 'was born は自動詞的 → 場所の前置詞＋which(＝where)。'],
    ['He is (   ) a scholar than a politician.', 'more', ['less', 'rather', 'better'], 'more A than B「B というより A」。'],
    ['You should have your eyes (   ) regularly.', 'examined', ['examine', 'examining', 'to examine'], 'have＋O＋過去分詞「O を〜してもらう」。'],
    ['There is no (   ) what she will say next.', 'telling', ['to tell', 'tell', 'told'], 'There is no 〜ing「〜することはできない」。'],
    ['Hardly (   ) a word when the teacher came in.', 'had we said', ['we had said', 'did we say', 'we said'], 'Hardly had S 過去分詞 when …。'],
    ['The man (   ) car was stolen reported it to the police.', 'whose', ['who', 'whom', 'which'], '所有格の関係代名詞 whose。'],
    ['It was not until he lost his job (   ) he realized its value.', 'that', ['when', 'which', 'what'], 'It was not until 〜 that …「〜して初めて…」。'],
    ['Under no circumstances (   ) this door be left unlocked.', 'should', ['will', 'can it', 'does'], '否定の副詞句が文頭 → 倒置(助動詞＋S＋V)。'],
    ['The more I learn, the more I realize how (   ) I know.', 'little', ['few', 'less', 'much'], 'how little I know「自分がいかに知らないか」。'],
    ['Only after the war ended (   ) to his hometown.', 'did he return', ['he returned', 'he did return', 'returned he'], 'Only＋副詞節が文頭 → 主節で倒置。'],
    ['She cannot have (   ) the news yet.', 'heard', ['hear', 'hearing', 'to hear'], 'cannot have 過去分詞「〜したはずがない」。'],
    ['Whatever (   ) may say, I will stick to my plan.', 'others', ['the other', 'another', 'other'], 'others「ほかの人々」(代名詞)。'],
    ['I object to (   ) like a child.', 'being treated', ['be treated', 'treat', 'treating'], 'object to 〜ing。受け身の動名詞 being treated。'],
    ['The book was (   ) interesting that I read it in one sitting.', 'so', ['such', 'too', 'very'], 'so 形容詞 that …「とても〜なので…」。'],
    ['It was (   ) an exciting game that nobody left early.', 'such', ['so', 'too', 'very'], 'such a(n) 形容詞＋名詞 that …。'],
    ['He failed, (   ) was expected.', 'as', ['what', 'that', 'it'], '前の文全体を受ける関係代名詞 as(「予想されたとおり」)。'],
    ['Mary, (   ) is often the case with her, was late again.', 'as', ['which', 'what', 'that'], 'as is often the case with 〜「〜にはよくあることだが」。'],
    ['The problem is (   ) to solve without a computer.', 'impossible', ['impossibly', 'impossibility', 'unable'], 'be impossible to do。unable は人が主語。'],
    ['I am not used to (   ) in public.', 'speaking', ['speak', 'spoken', 'be speaking'], 'be used to 〜ing「〜に慣れている」。'],
    ['She went to Paris with a view to (   ) art.', 'studying', ['study', 'studied', 'be studying'], 'with a view to 〜ing「〜する目的で」。to は前置詞。'],
    ['You had better (   ) about it.', 'not worry', ['not to worry', 'don\'t worry', 'not worrying'], 'had better not＋原形。'],
    ['It is high time the government (   ) action.', 'took', ['takes', 'take', 'will take'], 'It is high time＋仮定法過去。'],
    ['I\'d rather you (   ) anything about this to anyone.', 'didn\'t say', ['don\'t say', 'not say', 'won\'t say'], 'would rather S＋過去形(仮定法)。'],
    ['But for his advice, I (   ) failed.', 'would have', ['will have', 'would', 'had'], 'But for＝If it had not been for(過去の仮定) → would have 過去分詞。'],
    ['The population of Tokyo is about ten times (   ) of my city.', 'that', ['it', 'this', 'those'], 'the population のくり返しを that で受ける。'],
    ['He is the last person (   ) I would ask for help.', 'whom', ['whose', 'which', 'what'], '目的格の関係代名詞(ask 人 for help)。'],
    ['What do you say (   ) a break?', 'to taking', ['to take', 'taking', 'for take'], 'What do you say to 〜ing?「〜するのはどうですか」。'],
    ['She is anything (   ) a good cook.', 'but', ['than', 'except', 'without'], 'anything but「決して〜ではない」。'],
    ['He is nothing (   ) a liar.', 'but', ['than', 'without', 'except for'], 'nothing but「〜にすぎない」。'],
    ['So (   ) was the storm that the flights were canceled.', 'violent', ['violently', 'violence', 'more violent'], 'So 形容詞 が文頭の倒置(so 〜 that)。'],
    ['Seldom (   ) such a beautiful sunset.', 'have I seen', ['I have seen', 'I saw', 'seen I have'], 'Seldom が文頭 → 倒置。'],
    ['Should anything (   ), please call me at once.', 'happen', ['happens', 'happened', 'happening'], 'Should S 原形＝If S should 〜(倒置)。'],
    ['The (   ) the house is, the more it costs to heat.', 'larger', ['large', 'largest', 'more large'], 'the 比較級, the 比較級。'],
    ['She would sooner die (   ) apologize to him.', 'than', ['as', 'to', 'but'], 'would sooner A than B「B するくらいなら A する」。'],
    ['This is (   ) by far the best book on the subject.', 'by far', ['very', 'much more', 'so'], 'by far＋最上級「ずば抜けて」。']
  ];
  var ADV = WPS.parseBank(`
ambiguous|あいまいな
meticulous|細心の
ubiquitous|どこにでもある
inevitable|避けられない
plausible|もっともらしい
pragmatic|実用的な
resilient|回復力のある
scrutinize|精査する
undermine|徐々に弱める
alleviate|和らげる
exacerbate|悪化させる
reconcile|和解させる・両立させる
substantiate|立証する
contemplate|熟考する
deteriorate|悪化する
facilitate|容易にする
perpetuate|永続させる
mitigate|軽減する
prerequisite|前提条件
paradigm|理論的枠組み
dichotomy|二分法
hypothesis|仮説
anomaly|例外・異常
consensus|合意
discrepancy|食い違い
precedent|前例
repercussion|影響・反響
spontaneous|自発的な
superficial|表面的な
tentative|仮の・ためらいがちな
unprecedented|前例のない
vulnerable|傷つきやすい
arbitrary|恣意的な
coherent|首尾一貫した
comprehensive|包括的な
conspicuous|目立つ
detrimental|有害な
indispensable|不可欠な
intrinsic|本質的な
obsolete|時代遅れの
prevalent|広く行き渡った
profound|深い・重大な
redundant|余分な
skeptical|懐疑的な
tangible|具体的な
ambivalent|相反する感情をもつ
benevolent|善意の
candid|率直な
diligent|勤勉な
eloquent|雄弁な
`);
  function heCloze(r, seed) { var it = HE[seed % HE.length]; return Q(3, it[0], [it[1]].concat(it[2]), it[3], { say: it[0].replace(/\(\s*\)/, it[1]) }); }
  function heOrder(r, seed) {
    var it = HE[seed % HE.length], full = it[0].replace(/\(\s*\)/, it[1]).replace(/[.?!]$/, ''), end = it[0].slice(-1);
    var w = full.split(' '), n = w.length, cut = [0, Math.round(n / 4), Math.round(n / 2), Math.round(n * 3 / 4), n], parts = [];
    for (var i = 0; i < 4; i++) parts.push(w.slice(cut[i], cut[i + 1]).join(' '));
    var labels = 'ABCD', perm = shuffle(r, [0, 1, 2, 3]), shown = perm.map(function (pi, k) { return labels[k] + ') ' + parts[pi]; }).join('\n');
    var right = [0, 1, 2, 3].map(function (pi) { return labels[perm.indexOf(pi)]; }).join('-');
    var others = []; while (others.length < 3) { var o = shuffle(r, ['A', 'B', 'C', 'D']).join('-'); if (o !== right && others.indexOf(o) < 0) others.push(o); }
    return Q(3, '次の A〜D を並べかえて、正しい英文にすると?(文末は「' + end + '」)\n' + shown, [right].concat(others), '正しい文:' + full + end + '\n' + it[3], { say: full + end });
  }
  G.hd_eng = mix([heCloze, heOrder, (function () { WPS.BANK.en_adv = ADV; return H.fact('en_adv', { en: true }); })()]);

  /* ================= 国語 ================= */
  var NANGO = WPS.parseBank(`
恣意的|自分勝手で、論理的な必然性がないさま
止揚(アウフヘーベン)|対立するものを、より高い次元で統一すること
相対化|絶対的なものではないと、ほかと比べて位置づけること
パラダイム|ある時代の考え方を支える枠組み
アイロニー|皮肉。逆説的な表現
アナロジー|類推。似ている点をもとに推し量ること
メタファー|隠喩
ステレオタイプ|紋切り型の固定観念
アイデンティティ|自己同一性。自分が自分であるという感覚
エスノセントリズム|自民族中心主義
ニヒリズム|虚無主義。価値や意味を否定する考え
レトリック|修辞。効果的な表現の技法
カタルシス|浄化。心の中のわだかまりが解き放たれること
表象|イメージとして心に思い浮かべること・表現すること
捨象|共通しない性質を切り捨てること|抽象の反対の働き
敷衍|意味をおし広げて、くわしく説明すること
逆説|一見矛盾しているようで、真理を含む表現
蓋然性|ある事柄が起こる確からしさ
形而上|形をこえた、精神的・抽象的なもの
所与|あらかじめ与えられたもの
普遍|すべてのものに共通すること|特殊・個別の反対
内在|内部に存在すること|超越の反対
自明|証明しなくても明らかなこと
帰結|最終的に落ち着く結果
二項対立|2つの概念を対立させてとらえる考え方
`);
  WPS.BANK.nango = NANGO;
  function jodo(r) {
    var B = WPS.BANK.jodoushi, it = pk(r, B), ask = ri(r, 0, 1), others = shuffle(r, B.filter(function (x) { return (ask ? x.c : x.m) !== (ask ? it.c : it.m); }));
    var opts = [ask ? it.c : it.m]; others.forEach(function (o) { var v = ask ? o.c : o.m; if (opts.length < 4 && opts.indexOf(v) < 0) opts.push(v); });
    return Q(3, '古文の助動詞「' + it.t + '」の' + (ask ? '接続' : '意味') + 'として正しいものは?', opts, '「' + it.t + '」:意味=' + it.m + '/接続=' + it.c + '\n💡 意味と接続をセットで覚えると、識別問題で迷わない。');
  }
  function keigo(r) {
    var B = WPS.BANK.kokeigo, it = pk(r, B), ask = ri(r, 0, 1);
    if (ask) return Q(3, '古文の「' + it.t + '」は、どの種類の敬語?', [it.k].concat(['尊敬語', '謙譲語', '丁寧語'].filter(function (x) { return x !== it.k; })), '「' + it.t + '」＝' + it.k + '(' + it.m + ')\n💡 尊敬語は動作をする人、謙譲語は動作を受ける人、丁寧語は聞き手(読み手)への敬意。');
    var others = shuffle(r, B.filter(function (x) { return x.m !== it.m; })).slice(0, 3);
    return Q(3, '古文の敬語「' + it.t + '」の意味(もとの動詞)は?', [it.m].concat(others.map(function (o) { return o.m; })), '「' + it.t + '」＝' + it.k + '、' + it.m);
  }
  G.hd_jpn = mix([jodo, keigo, H.fact('nango', { q0: function (it) { return '評論語「' + it.t + '」の意味は?'; }, q1: function (it) { return '「' + it.m + '」を表す評論語は?'; } })]);

  /* ================= 理科 ================= */
  G.hd_sci = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var g = pk(r, [8, 16, 32, 4, 24, 40]), mol = g / 16, co2 = mol * 44, h2o = mol * 2 * 18, ask = ri(r, 0, 1);
      return Q(3, 'メタン CH₄ ' + g + 'g を完全燃焼させた。生じる' + (ask ? '水' : '二酸化炭素') + 'は何g?(H＝1, C＝12, O＝16)', choices(num(ask ? h2o : co2) + 'g', ask ? [num(mol * 18) + 'g', num(co2) + 'g', num(h2o * 2) + 'g'] : [num(mol * 22) + 'g', num(h2o) + 'g', num(co2 * 2) + 'g']),
        'CH₄＋2O₂ → CO₂＋2H₂O\n①CH₄ ' + g + 'g＝' + num(mol) + 'mol\n②係数比 CH₄:CO₂:H₂O＝1:1:2\n→ ' + (ask ? 'H₂O ' + num(mol * 2) + 'mol×18＝' + num(h2o) + 'g' : 'CO₂ ' + num(mol) + 'mol×44＝' + num(co2) + 'g')); }
    if (t === 1) { var pH = ri(r, 1, 3), f = pk(r, [10, 100, 1000]), np = Math.min(7, pH + Math.log10(f)), acid = ri(r, 0, 1);
      return Q(3, 'pH ' + (acid ? pH : 14 - pH) + ' の' + (acid ? '塩酸' : '水酸化ナトリウム水溶液') + 'を、水で ' + f + ' 倍にうすめると pH はいくつ?(25℃、電離度1)', numChoices(acid ? np : 14 - np, [acid ? pH * f : 14 - pH, acid ? pH - Math.log10(f) : 14 - pH + Math.log10(f), 7]),
        (acid ? '[H⁺] が 1/' + f + ' になる → pH は ' + Math.log10(f) + ' 上がる → ' + np : '[OH⁻] が 1/' + f + ' になる → pOH が ' + Math.log10(f) + ' 上がる → pH＝14−pOH＝' + (14 - np)) + '\n💡 うすめても、酸性・塩基性が逆転することはない(pH 7 をこえない)。'); }
    if (t === 2) { var m1 = ri(r, 1, 5), v1 = ri(r, 2, 10), m2 = ri(r, 1, 5), v = Math.round(m1 * v1 / (m1 + m2) * 100) / 100, ke = Math.round((0.5 * m1 * v1 * v1 - 0.5 * m1 * m1 * v1 * v1 / (m1 + m2)) * 100) / 100, ask = ri(r, 0, 1);
      return Q(3, '質量 ' + m1 + 'kg の物体が速さ ' + v1 + 'm/s で、静止している質量 ' + m2 + 'kg の物体に衝突し、一体となって動いた。' + (ask ? '衝突で失われた運動エネルギーは?' : '衝突後の速さは?'), ask ? choices(num(ke) + 'J', [num(0.5 * m1 * v1 * v1) + 'J', '0J', num(Math.round(ke / 2 * 100) / 100) + 'J']) : choices(num(v) + 'm/s', [num(v1) + 'm/s', num(Math.round(v1 / 2 * 100) / 100) + 'm/s', num(Math.round(m2 * v1 / (m1 + m2) * 100) / 100) + 'm/s']),
        '【運動量保存】' + m1 + '×' + v1 + '＝(' + m1 + '＋' + m2 + ')v → v＝' + num(v) + 'm/s' + (ask ? '\n失われた運動エネルギー＝½×' + m1 + '×' + v1 + '²−½×' + (m1 + m2) + '×' + num(v) + '²＝' + num(ke) + 'J' : '') + '\n💡 一体となる衝突(完全非弾性衝突)では、運動量は保存されるが運動エネルギーは減る。'); }
    if (t === 3) { var V0 = pk(r, [9.8, 19.6, 29.4, 14.7, 24.5]), ang = pk(r, [30, 90]), vy = ang === 90 ? V0 : V0 / 2, Hm = Math.round(vy * vy / (2 * 9.8) * 100) / 100;
      return Q(3, '地面から、初速 ' + V0 + 'm/s で' + (ang === 90 ? '真上' : '水平と30°の向き') + 'に投げた物体の最高点の高さは?(重力加速度 9.8m/s²)', choices(num(Hm) + 'm', [num(Math.round(V0 * V0 / (2 * 9.8) * 100) / 100 * (ang === 90 ? 2 : 1)) + 'm', num(Math.round(vy / 9.8 * 100) / 100) + 'm', num(Math.round(Hm * 2 * 100) / 100) + 'm']),
        '鉛直方向の初速 ' + num(vy) + 'm/s(' + (ang === 90 ? '真上なので初速そのもの' : '30°なので V₀sin30°') + ')\n最高点では鉛直方向の速さ0:0²−' + num(vy) + '²＝−2×9.8×H → H＝' + num(Hm) + 'm'); }
    var R1 = pk(r, [2, 3, 4, 6]), R2 = pk(r, [3, 6, 12]), R3 = pk(r, [1, 2, 5]), Rp = R1 * R2 / (R1 + R2), Rt = Math.round((Rp + R3) * 100) / 100;
    return Q(3, R1 + 'Ω と ' + R2 + 'Ω を並列につなぎ、それに ' + R3 + 'Ω を直列につないだ。全体の合成抵抗は?', choices(num(Rt) + 'Ω', [num(R1 + R2 + R3) + 'Ω', num(Math.round(Rp * 100) / 100) + 'Ω', num(Math.round(1 / (1 / R1 + 1 / R2 + 1 / R3) * 100) / 100) + 'Ω']),
      '①並列部分:1/R＝1/' + R1 + '＋1/' + R2 + ' → R＝' + num(Math.round(Rp * 100) / 100) + 'Ω\n②直列にたす:' + num(Math.round(Rp * 100) / 100) + '＋' + R3 + '＝' + num(Rt) + 'Ω');
  };

  /* ================= 社会 ================= */
  function sameTime(r) {
    var J = WPS.BANK.jhistory, W = WPS.BANK.whistory, j = pk(r, J), near = W.filter(function (w) { return Math.abs(w.t - j.t) <= 15; });
    if (!near.length) { j = pk(r, J.filter(function (x) { return W.some(function (w) { return Math.abs(w.t - x.t) <= 15; }); })); near = W.filter(function (w) { return Math.abs(w.t - j.t) <= 15; }); }
    var ans = pk(r, near), far = shuffle(r, W.filter(function (w) { return Math.abs(w.t - j.t) > 60; })).slice(0, 3);
    return Q(3, '「' + j.m + '」(日本)と、ほぼ同じ時期(±15年以内)の世界のできごとは?', [ans.m].concat(far.map(function (f) { return f.m; })), '「' + j.m + '」は ' + j.t + '年、「' + ans.m + '」は ' + ans.t + '年。\nほかの選択肢:' + far.map(function (f) { return f.m + '(' + f.t + '年)'; }).join('/') + '\n💡 日本と世界を1本の年表でつなげて覚えよう。');
  }
  function closeOrder(r) {
    var J = WPS.BANK.jhistory.slice().sort(function (a, b) { return a.t - b.t; }), i = ri(r, 0, J.length - 4), four = J.slice(i, i + 4);
    var lab = function (x) { return x.m.length > 16 ? x.m.slice(0, 16) + '…' : x.m; }, right = four.map(lab).join(' → ');
    var perms = [[1, 0, 2, 3], [0, 2, 1, 3], [0, 1, 3, 2], [3, 2, 1, 0], [2, 0, 1, 3]].map(function (p) { return p.map(function (k) { return lab(four[k]); }).join(' → '); });
    return Q(3, '次の4つのできごとを、古い順に並べたものは?(年代が近いできごとです)', [right].concat(shuffle(r, perms).slice(0, 3)), '古い順:\n' + four.map(function (x) { var c = (WPS.HCTX || {})['j:' + x.t]; return '・' + x.t + '年 ' + x.m + (c ? '\n　→ ' + c[1].slice(0, 50) + (c[1].length > 50 ? '…' : '') : ''); }).join('\n'));
  }
  G.hd_soc = mix([sameTime, closeOrder]);

  /* ================= 情報 ================= */
  G.hd_info = function (r) {
    var t = ri(r, 0, 2);
    if (t === 0) { var n = ri(r, 5, 20), k = ri(r, 2, 5), s = 0; for (var i = 1; i <= n; i++) if (i % k === 0) s += i;
      return Q(3, '次のプログラムを実行したとき、表示される s の値は?\ns ← 0\ni を 1 から ' + n + ' まで1ずつ増やしながら:\n　もし i を ' + k + ' で割った余りが 0 ならば s ← s＋i\ns を表示', numChoices(s, [n * (n + 1) / 2, s + k, Math.floor(n / k)]), k + ' の倍数(' + k + ', ' + (2 * k) + ', …)だけを足す\n→ ' + s + '\n💡 トレース表(i と s の値の変化)を書いて確かめよう。'); }
    if (t === 1) { var v = ri(r, 1, 100), b = (256 - v).toString(2);
      return Q(3, '8ビットの2の補数表現で −' + v + ' を表すと?', choices(b, [('00000000' + v.toString(2)).slice(-8), ('00000000' + (255 - v).toString(2)).slice(-8), ('00000000' + (256 - v - 1).toString(2)).slice(-8) === b ? ('00000000' + (256 - v + 1).toString(2)).slice(-8) : ('00000000' + (256 - v - 1).toString(2)).slice(-8)]),
        '①' + v + ' を8ビットで:' + ('00000000' + v.toString(2)).slice(-8) + '\n②ビットを反転:' + ('00000000' + (255 - v).toString(2)).slice(-8) + '\n③1を足す:' + b); }
    var a = ri(r, 2, 9), m = ri(r, 3, 8), x = 1, cnt = 0; while (x < m * 10) { x *= a; cnt++; }
    return Q(3, '次のプログラムで、表示される c の値は?\nx ← 1、c ← 0\nx が ' + (m * 10) + ' 未満のあいだ、くり返す:\n　x ← x×' + a + '\n　c ← c＋1\nc を表示', numChoices(cnt, [cnt + 1, cnt - 1 > 0 ? cnt - 1 : cnt + 2, Math.floor(m * 10 / a)]), 'x は ' + a + ' 倍ずつ増える:1 → ' + a + ' → ' + (a * a) + ' → …\n' + (m * 10) + ' 以上になるまでの回数 → ' + cnt);
  };
})();
(function () {
  var H = WPS.GENH, G = WPS.GEN, ri = H.ri, pk = H.pk, shuffle = H.shuffle, Q = H.Q, mix = H.mix, fact = H.fact;
  function kuhoQ(r) {
    var B = WPS.BANK.kuho, it = pk(r, B), ask = ri(r, 0, 1), key = ask ? 'r' : 'm';
    var opts = [it[key]]; shuffle(r, B).forEach(function (o) { if (opts.length < 4 && opts.indexOf(o[key]) < 0) opts.push(o[key]); });
    return Q(3, '漢文の句形「' + it.f + '」の' + (ask ? '読み方(書き下し)' : '意味') + 'は?', opts, '「' + it.f + '」:読み=' + it.r + '/意味=' + it.m + '(' + it.k + ')');
  }
  function keigoQ(r) {
    var B = WPS.BANK.keigo, it = pk(r, B), who = ri(r, 0, 1);
    var right = who ? it.s : it.k, others = shuffle(r, B.filter(function (x) { return x !== it; })).slice(0, 2).map(function (x) { return who ? x.s : x.k; });
    return Q(3, (who ? '先生が' : '(わたしが)先生に対して') + '「' + it.v + '」とき、ふさわしい敬語は?', [right, who ? it.k : it.s].concat(others), (who ? '動作をするのが先生(目上) → 尊敬語「' + it.s + '」' : '動作をするのが自分 → 謙譲語「' + it.k + '」') + '\n💡 尊敬語は相手の動作、謙譲語は自分の動作に使う。');
  }
  G.jx_std = mix([fact('kogo', { q0: function (it) { return '古文単語「' + it.t + '」の意味として最も適当なものは?'; } }), fact('hyoron'), kuhoQ]);
  G.jx_jh2 = mix([fact('koji'), fact('kobun_m'), fact('shiika'), keigoQ]);
  G.sx_jh2 = mix([G.s_motion, G.s_sol, G.s_m1]);
  // 中学英語の並べかえ:中学の文法単元の英文を4つに分け、正しい語順を選ぶ
  var JE = ['e_m2', 'e_pres', 'e_m3', 'e_m4', 'e_m5', 'e_m6', 'e_m7', 'e_m8', 'e_partm', 'e_indq', 'e_conj', 'e_ger', 'e_fut', 'e_pperfprog'];
  G.ex_jh3 = function (r, seed) {
    var full = '';
    for (var k = 0; k < 8 && full.split(' ').length < 5; k++) { var id = JE[(seed + k) % JE.length]; if (!G[id]) continue; var q0 = G[id](WPS.rng(seed * 7 + k), seed + k); full = (q0 && q0.say) || ''; }
    if (!full) full = 'I have lived in this town for ten years.';
    var end = /[.?!]$/.test(full) ? full.slice(-1) : '.', body = full.replace(/[.?!]$/, ''), w = body.split(' '), n = w.length, cut = [0, Math.round(n / 4), Math.round(n / 2), Math.round(n * 3 / 4), n], parts = [];
    for (var i = 0; i < 4; i++) parts.push(w.slice(cut[i], cut[i + 1]).join(' '));
    if (parts.some(function (x) { return !x; })) { parts = [w.slice(0, 1).join(' '), w.slice(1, 2).join(' '), w.slice(2, n - 1).join(' '), w.slice(n - 1).join(' ')]; }
    var L = 'ABCD', perm = shuffle(r, [0, 1, 2, 3]), shown = perm.map(function (pi, k) { return L[k] + ') ' + parts[pi]; }).join('\n');
    var right = [0, 1, 2, 3].map(function (pi) { return L[perm.indexOf(pi)]; }).join('-'), others = [];
    while (others.length < 3) { var o = shuffle(r, ['A', 'B', 'C', 'D']).join('-'); if (o !== right && others.indexOf(o) < 0) others.push(o); }
    return Q(3, '次の A〜D を並べかえて、正しい英文にすると?(文末は「' + end + '」)\n' + shown, [right].concat(others), '正しい文:' + body + end + '\n💡 主語と動詞を先に決め、残りをかたまりでつなぐ。', { say: body + end });
  };
  function goiQ(r) { return fact('goi')(r, ri(r, 0, 1000)); }
  G.jx_jh3 = mix([keigoQ, fact('goi'), kuhoQ, fact('koji', { q1: function (it) { return '「' + it.m + '」を表す故事成語は?'; } })]);
  function jhOrder(r) {
    var J = WPS.BANK.jhistory.slice().sort(function (a, b) { return a.t - b.t; }), i = ri(r, 0, J.length - 4), four = J.slice(i, i + 4);
    var lab = function (x) { return x.m.length > 16 ? x.m.slice(0, 16) + '…' : x.m; }, right = four.map(lab).join(' → ');
    var perms = [[1, 0, 2, 3], [0, 2, 1, 3], [0, 1, 3, 2], [3, 2, 1, 0], [2, 0, 1, 3]].map(function (p) { return p.map(function (k) { return lab(four[k]); }).join(' → '); });
    return Q(3, '次の4つのできごとを、古い順に並べたものは?', [right].concat(shuffle(r, perms).slice(0, 3)), '古い順:\n' + four.map(function (x) { return '・' + x.t + '年 ' + x.m; }).join('\n'));
  }
  function jhResult(r, seed) {
    var C = WPS.HCTX || {}, all = WPS.BANK.jhistory.filter(function (x) { return C['j:' + x.t]; }), it = all[seed % all.length], cut = function (s) { return s.length > 55 ? s.slice(0, 53) + '…' : s; };
    var others = shuffle(r, all.filter(function (x) { return x !== it; })).slice(0, 3);
    return Q(3, '「' + it.m + '」の結果として正しいものは?', [cut(C['j:' + it.t][1])].concat(others.map(function (o) { return cut(C['j:' + o.t][1]); })), '背景:' + C['j:' + it.t][0] + '\n結果:' + C['j:' + it.t][1]);
  }
  G.cx_jh3 = mix([jhOrder, jhResult]);
})();
