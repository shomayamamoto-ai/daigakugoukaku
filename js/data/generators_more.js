/*
 * 問題の自動生成(追加分)
 * 50問に届かなかった単元に、問題のパターンを追加しています。
 */
window.WPS = window.WPS || {};
(function () {
  var G = WPS.GEN, rng = WPS.rng;
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function pk(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function shuffle(r, a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function frac(n, d) { var g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; }
  function uniq(a) { return a.filter(function (x, i) { return x !== undefined && a.indexOf(x) === i; }); }
  function fill(ch, ans) {
    var out = uniq(ch.map(String));
    for (var k = 1; out.length < 4 && k < 30; k++) { var f = String(ans).replace(/\d+/, function (m) { return String(+m + k); }); if (out.indexOf(f) < 0) out.push(f); }
    return out;
  }
  function Q(lv, text, ch, exp, extra) { var o = { lv: lv, text: text, choices: fill(ch, ch[0]), exp: exp, why: {} }; if (extra) for (var k in extra) o[k] = extra[k]; return o; }
  function mix(list) { return function (r, seed) { return list[seed % list.length](r, Math.floor(seed / list.length)); }; }
  function sqrtForm(n) { // √n を簡単にした文字列
    var out = 1, inside = n;
    for (var f = 2; f * f <= inside; f++) while (inside % (f * f) === 0) { inside /= f * f; out *= f; }
    return inside === 1 ? String(out) : (out === 1 ? '' : out) + '√' + inside;
  }

  /* ---------- 受動態:否定文・疑問文を追加 ---------- */
  var old_e_m6 = G.e_m6;
  var PO = [['This room', 's', 'clean', 'cleaned'], ['These books', 'p', 'read', 'read'], ['The letter', 's', 'write', 'written'], ['English', 's', 'speak', 'spoken'], ['The cake', 's', 'make', 'made'],
    ['These cars', 'p', 'make', 'made'], ['The song', 's', 'sing', 'sung'], ['The window', 's', 'break', 'broken'], ['The pictures', 'p', 'take', 'taken'], ['This bag', 's', 'use', 'used']];
  G.e_m6 = mix([old_e_m6, function (r, seed) {
    var o = PO[seed % PO.length], past = (seed >> 4) % 2 === 1;
    var bv = past ? (o[1] === 'p' ? 'were' : 'was') : (o[1] === 'p' ? 'are' : 'is');
    if (Math.floor(seed / PO.length) % 2 === 0) {
      var q = Q(2, o[0] + ' (   ) not ' + o[3] + (past ? ' yesterday' : ' here') + '.', [bv, past ? 'did' : (o[1] === 'p' ? 'do' : 'does'), past ? (o[1] === 'p' ? 'are' : 'is') : (o[1] === 'p' ? 'were' : 'was'), 'have'],
        '受け身の否定文は「be動詞 ＋ not ＋ 過去分詞」。\n主語(' + o[0] + ')が' + (o[1] === 'p' ? '複数' : '単数') + '、' + (past ? '過去' : '現在') + 'なので be動詞は「' + bv + '」。', { say: o[0] + ' ' + bv + ' not ' + o[3] + (past ? ' yesterday' : ' here') + '.' });
      q.why[q.choices[1]] = 'do・does・did は一般動詞の否定文で使います。受け身は be動詞を使います。';
      return q;
    }
    var B = bv.charAt(0).toUpperCase() + bv.slice(1);
    var q2 = Q(2, '(   ) ' + o[0].charAt(0).toLowerCase() + o[0].slice(1) + ' ' + o[3] + (past ? ' yesterday' : ' every day') + '?', [B, past ? 'Did' : (o[1] === 'p' ? 'Do' : 'Does'), 'Have', past ? (o[1] === 'p' ? 'Are' : 'Is') : (o[1] === 'p' ? 'Were' : 'Was')],
      '受け身の疑問文は、be動詞を主語の前に出します。\n→ ' + B + ' ＋ 主語 ＋ 過去分詞 〜?', { say: B + ' ' + o[0].toLowerCase() + ' ' + o[3] + (past ? ' yesterday' : ' every day') + '?' });
    q2.why[q2.choices[1]] = '受け身の疑問文では Do・Does・Did は使いません。';
    return q2;
  }]);

  /* ---------- 多角形:対角線の数・外角から何角形か ---------- */
  var old_m_m6 = G.m_m6;
  G.m_m6 = mix([old_m_m6, function (r) {
    var n = ri(r, 4, 20);
    return Q(2, n + '角形の対角線の本数は?', [String(n * (n - 3) / 2), String(n * (n - 3)), String(n * (n - 1) / 2), String(n - 3)], '1つの頂点から引ける対角線は(' + n + '−3)本。\n全部で ' + n + '×(' + n + '−3) 本だが、同じ線を2回数えているので ÷2。\n→ ' + (n * (n - 3) / 2) + '本', { fig: { type: 'polygon', n: Math.min(n, 12) } });
  }, function (r) {
    var n = pk(r, [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]), ext = 360 / n;
    return Q(2, '1つの外角が ' + ext + '° の正多角形は何角形?', ['正' + n + '角形', '正' + (n + 1) + '角形', '正' + (n * 2) + '角形', '正' + Math.max(3, n - 2) + '角形'], '外角の和はいつも360°。\n360÷' + ext + '＝' + n + ' → 正' + n + '角形');
  }]);

  /* ---------- 確率(中学):くじ・さいころ1個 ---------- */
  var old_m_m12 = G.m_m12;
  G.m_m12 = mix([old_m_m12, function (r) {
    var t = ri(r, 5, 15), a = ri(r, 1, t - 1);
    return Q(1, t + '本のくじの中に当たりが ' + a + '本ある。1本引いて当たる確率は?', [frac(a, t), frac(t - a, t), frac(1, t), frac(a, t - a)], '確率＝(当たりの数)÷(全部の数)＝' + a + '/' + t + (frac(a, t) !== a + '/' + t ? '＝' + frac(a, t) : ''));
  }, function (r) {
    var k = ri(r, 2, 6);
    return Q(1, 'さいころを1個投げて、' + k + '以上の目が出る確率は?', [frac(7 - k, 6), frac(k, 6), frac(6 - k, 6), frac(1, 6)].filter(function (x) { return x !== '0'; }), k + '以上の目は ' + (7 - k) + '通り(' + Array.from({ length: 7 - k }, function (_, i) { return k + i; }).join('・') + ')。\n→ ' + (7 - k) + '/6' + (frac(7 - k, 6) !== (7 - k) + '/6' ? '＝' + frac(7 - k, 6) : ''));
  }]);

  /* ---------- 三平方:特別な直角三角形 ---------- */
  var old_m_m11 = G.m_m11;
  G.m_m11 = mix([old_m_m11, function (r) {
    var k = ri(r, 1, 9);
    if (ri(r, 0, 1)) return Q(2, '45°・45°・90°の直角三角形で、等しい2辺が ' + k + ' のとき、斜辺は?', [(k === 1 ? '' : k) + '√2', String(2 * k), (k === 1 ? '' : k) + '√3', String(k)], '45°・45°・90°の三角形の辺の比は 1:1:√2。\n→ 斜辺＝' + k + '×√2', { fig: { type: 'righttri', a: k, b: k, c: Math.round(k * 1.414 * 10) / 10, ask: 'c' } });
    return Q(2, '30°・60°・90°の直角三角形で、斜辺が ' + (2 * k) + ' のとき、いちばん短い辺と残りの辺は?', [k + ' と ' + (k === 1 ? '' : k) + '√3', (2 * k) + ' と ' + k + '√2', k + ' と ' + (2 * k), (k === 1 ? '' : k) + '√3 と ' + (2 * k)], '30°・60°・90°の三角形の辺の比は 1:√3:2。\n斜辺 ' + (2 * k) + ' が「2」にあたるので、1にあたる辺は ' + k + '、√3にあたる辺は ' + k + '√3。');
  }]);

  /* ---------- 三角比:角度を増やす ---------- */
  var ANG = [[0, '0', '1', '0'], [30, '1/2', '√3/2', '1/√3'], [45, '√2/2', '√2/2', '1'], [60, '√3/2', '1/2', '√3'], [90, '1', '0', 'なし'], [120, '√3/2', '-1/2', '-√3'], [135, '√2/2', '-√2/2', '-1'], [150, '1/2', '-√3/2', '-1/√3'], [180, '0', '-1', '0']];
  var POOL = ['0', '1', '-1', '1/2', '-1/2', '√2/2', '-√2/2', '√3/2', '-√3/2', '√3', '-√3', '1/√3', '-1/√3'];
  var old_m_h2 = G.m_h2;
  G.m_h2 = mix([old_m_h2, function (r, seed) {
    var a = ANG[seed % ANG.length], f = Math.floor(seed / ANG.length) % 3;
    if (a[0] === 90 && f === 2) f = 0;
    var names = ['sin', 'cos', 'tan'], v = a[f + 1];
    return Q(1, names[f] + a[0] + '° の値は?', [v].concat(shuffle(r, POOL.filter(function (x) { return x !== v; })).slice(0, 3)), '単位円で ' + a[0] + '° の点の座標は (' + a[2] + ', ' + a[1] + ')。\nsin＝y座標、cos＝x座標、tan＝y÷x\n→ ' + names[f] + a[0] + '°＝' + v, { fig: { type: 'unitcircle', deg: a[0] } });
  }, function (r) {
    var a = pk(r, [30, 45, 60]), b = 180 - a, v = { 30: ['1/2', '√3/2'], 45: ['√2/2', '√2/2'], 60: ['√3/2', '1/2'] }[a];
    return Q(2, 'sin' + b + '° と同じ値になるのは?', ['sin' + a + '°', 'cos' + a + '°', '−sin' + a + '°', 'tan' + a + '°'], 'sin(180°−θ)＝sinθ なので、sin' + b + '°＝sin' + a + '°＝' + v[0] + '\n💡 単位円で、' + a + '° と ' + b + '° の点は y座標(高さ)が同じ。', { fig: { type: 'unitcircle', deg: b } });
  }]);

  /* ---------- 場合の数:円順列・重複順列 ---------- */
  var old_m_h3 = G.m_h3;
  function fact(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }
  G.m_h3 = mix([old_m_h3, function (r) {
    var n = ri(r, 4, 8);
    return Q(2, n + '人が円形のテーブルに座る方法は何通り?', [fact(n - 1) + '通り', fact(n) + '通り', (fact(n) / 2) + '通り', (n * n) + '通り'], '円順列は (n−1)!。\n1人を固定して、残り ' + (n - 1) + '人を並べると考える。\n→ ' + (n - 1) + '!＝' + fact(n - 1) + '通り\n💡 回転して同じになる並び方を1つと数えるため。');
  }, function (r) {
    var n = ri(r, 2, 5), k = ri(r, 2, 5);
    return Q(2, n + '種類の文字から、同じ文字を何回使ってもよいとして ' + k + '文字並べる方法は何通り?', [Math.pow(n, k) + '通り', Math.pow(k, n) + '通り', (n * k) + '通り', (fact(n) / fact(Math.max(0, n - k)) || n) + '通り'], '重複順列は n^k。1文字ごとに ' + n + '通りの選び方があるので ' + n + 'を' + k + '回かける。\n→ ' + n + '^' + k + '＝' + Math.pow(n, k) + '通り');
  }, function (r) {
    var n = ri(r, 4, 10), k = ri(r, 2, Math.min(5, n - 1)), C = fact(n) / (fact(k) * fact(n - k));
    return Q(2, n + '人から ' + k + '人の委員を選ぶ方法は何通り?', [C + '通り', (fact(n) / fact(n - k)) + '通り', (n * k) + '通り', (C + 1) + '通り'], '選ぶだけなので組合せ ' + n + 'C' + k + '＝' + C);
  }]);

  /* ---------- 正弦定理・余弦定理:数値を増やす ---------- */
  G.m_sincos = mix([function (r) {
    var b = ri(r, 2, 9), c = ri(r, 2, 9), A = pk(r, [60, 90, 120]);
    var a2 = b * b + c * c - (A === 60 ? b * c : A === 120 ? -b * c : 0);
    var ans = sqrtForm(a2), wrong = sqrtForm(b * b + c * c + (A === 60 ? b * c : A === 120 ? -b * c : 0));
    return Q(3, 'b＝' + b + '、c＝' + c + '、A＝' + A + '° の三角形で、a は?', [ans, wrong, String(b + c), sqrtForm(b * b + c * c + 1)], '【余弦定理】a²＝b²＋c²−2bc cosA\ncos' + A + '°＝' + (A === 60 ? '1/2' : A === 120 ? '−1/2' : '0') + '\na²＝' + (b * b) + '＋' + (c * c) + (A === 90 ? '' : (A === 60 ? '−' : '＋') + (b * c)) + '＝' + a2 + '\n→ a＝' + ans + '\n💡 2辺とその間の角がわかるときは余弦定理。');
  }, function (r) {
    var R = ri(r, 1, 9), A = pk(r, [[30, '1/2', String(R)], [45, '√2/2', (R === 1 ? '' : R) + '√2'], [60, '√3/2', (R === 1 ? '' : R) + '√3'], [90, '1', String(2 * R)], [120, '√3/2', (R === 1 ? '' : R) + '√3'], [150, '1/2', String(R)]]);
    return Q(3, '外接円の半径が ' + R + ' の三角形で、A＝' + A[0] + '° のとき、a は?', [A[2], String(2 * R + 1), (R === 1 ? '' : R) + '√5', String(R * 3)], '【正弦定理】a/sinA＝2R\n→ a＝2×' + R + '×sin' + A[0] + '°＝2×' + R + '×' + A[1] + '＝' + A[2] + '\n💡 外接円の半径が出てきたら正弦定理。');
  }]);

  /* ---------- 確率(数学A):少なくとも1つ ---------- */
  var old_m_prob = G.m_prob;
  G.m_prob = mix([old_m_prob, function (r) {
    var red = ri(r, 2, 7), white = ri(r, 2, 6), t = red + white;
    var all = t * (t - 1) / 2, ww = white * (white - 1) / 2;
    return Q(3, '赤玉' + red + '個・白玉' + white + '個の袋から2個同時に取り出すとき、少なくとも1個が赤の確率は?', [frac(all - ww, all), frac(ww, all), frac(red, t), frac(red * (red - 1) / 2, all)], '「少なくとも1個赤」の反対は「2個とも白」。\n2個とも白:' + white + 'C2＝' + ww + '通り、全体:' + t + 'C2＝' + all + '通り\n→ 1−' + ww + '/' + all + '＝' + frac(all - ww, all) + '\n💡「少なくとも」は反対(余事象)から求めると速い。');
  }]);

  /* ---------- 対数:底・値を増やす ---------- */
  var old_m_h4 = G.m_h4;
  var SUB = { 2: '₂', 3: '₃', 4: '₄', 5: '₅', 7: '₇', 10: '₁₀' };
  G.m_h4 = mix([old_m_h4, function (r) {
    var a = pk(r, [2, 3, 4, 5, 7, 10]), k = ri(r, 0, 4), v = Math.pow(a, k);
    if (r() < 0.3) return Q(2, 'log' + SUB[a] + '(1/' + Math.pow(a, k || 1) + ') の値は?', [String(-(k || 1)), String(k || 1), '1/' + (k || 1), '0'], '1/' + a + '^' + (k || 1) + '＝' + a + '^(−' + (k || 1) + ') なので答えは −' + (k || 1));
    return Q(1, 'log' + SUB[a] + v + ' の値は?', [String(k), String(k + 1), String(v), String(Math.max(0, k - 1) === k ? k + 2 : Math.max(0, k - 1))], a + ' を何乗すると ' + v + ' になるか → ' + a + '^' + k + '＝' + v + ' なので ' + k + (k === 0 ? '\n💡 どんな数も0乗は1なので、log(1)＝0。' : ''));
  }, function (r) {
    var b = pk(r, [2, 3, 5]), m = pk(r, [9, 27, 25, 8, 16, 32, 81]), n = pk(r, [3, 9, 5, 2, 4]);
    var p1 = Math.round(Math.log(m) / Math.log(b) * 1000) / 1000, p2 = Math.round(Math.log(n) / Math.log(b) * 1000) / 1000;
    if (p1 % 1 || p2 % 1) { m = Math.pow(b, 3); n = b; p1 = 3; p2 = 1; }
    return Q(2, 'log' + SUB[b] + m + ' − log' + SUB[b] + n + ' を計算すると?', [String(p1 - p2), String(p1 + p2), String(p1 * p2), String(m - n)], 'log の引き算は、中身のわり算:log' + SUB[b] + '(' + m + '÷' + n + ')＝log' + SUB[b] + (m / n) + '＝' + (p1 - p2));
  }]);

  /* ---------- 三角関数:cos・tan、弧度法の逆 ---------- */
  var old_m_h5 = G.m_h5;
  var RAD = [[30, 'π/6', '1/2', '√3/2'], [45, 'π/4', '√2/2', '√2/2'], [60, 'π/3', '√3/2', '1/2'], [90, 'π/2', '1', '0'], [120, '2π/3', '√3/2', '-1/2'], [135, '3π/4', '√2/2', '-√2/2'], [150, '5π/6', '1/2', '-√3/2'], [180, 'π', '0', '-1'], [210, '7π/6', '-1/2', '-√3/2'], [225, '5π/4', '-√2/2', '-√2/2'], [240, '4π/3', '-√3/2', '-1/2'], [270, '3π/2', '-1', '0'], [300, '5π/3', '-√3/2', '1/2'], [315, '7π/4', '-√2/2', '√2/2'], [330, '11π/6', '-1/2', '√3/2']];
  G.m_h5 = mix([old_m_h5, function (r, seed) {
    var a = RAD[seed % RAD.length];
    return Q(2, 'cos(' + a[1] + ') の値は?', [a[3]].concat(shuffle(r, POOL.filter(function (x) { return x !== a[3]; })).slice(0, 3)), a[1] + '＝' + a[0] + '°。単位円の x座標が cos → ' + a[3], { fig: { type: 'unitcircle', deg: a[0] } });
  }, function (r, seed) {
    var a = RAD[seed % RAD.length];
    return Q(1, a[1] + ' は何度?', [a[0] + '°'].concat(shuffle(r, RAD.filter(function (x) { return x[0] !== a[0]; })).slice(0, 3).map(function (x) { return x[0] + '°'; })), 'π＝180° なので、' + a[1] + '＝180°×' + a[1].replace('π', '1') + '＝' + a[0] + '°');
  }]);
  /* ---------- 追加:三角比の相互関係・長方形の対角線 ---------- */
  var TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
  var m_h2b = G.m_h2;
  G.m_h2 = mix([m_h2b, function (r, seed) {
    var t = TRI[seed % TRI.length], type = Math.floor(seed / TRI.length) % 3;
    if (type === 0) return Q(2, 'cosθ＝' + t[1] + '/' + t[2] + '(0°＜θ＜90°)のとき、sinθ は?', [t[0] + '/' + t[2], t[0] + '/' + t[1], t[1] + '/' + t[0], (t[2] - t[1]) + '/' + t[2]], 'sin²θ＋cos²θ＝1 より sin²θ＝1−' + (t[1] * t[1]) + '/' + (t[2] * t[2]) + '＝' + (t[0] * t[0]) + '/' + (t[2] * t[2]) + '\nθ は鋭角なので sinθ＞0 → ' + t[0] + '/' + t[2], { fig: { type: 'righttri', a: t[1], b: t[0], c: t[2], ask: 'theta' } });
    if (type === 1) return Q(2, 'sinθ＝' + t[0] + '/' + t[2] + '(0°＜θ＜90°)のとき、tanθ は?', [t[0] + '/' + t[1], t[1] + '/' + t[0], t[0] + '/' + t[2], t[1] + '/' + t[2]], 'まず cosθ＝' + t[1] + '/' + t[2] + '(sin²θ＋cos²θ＝1 から)\ntanθ＝sinθ÷cosθ＝' + t[0] + '/' + t[1] + '\n💡 直角三角形を描くと、tan＝向かいの辺÷となりの辺 ですぐ出せる。', { fig: { type: 'righttri', a: t[1], b: t[0], c: t[2], ask: 'theta' } });
    return Q(2, 'tanθ＝' + t[0] + '/' + t[1] + '(0°＜θ＜90°)のとき、cosθ は?', [t[1] + '/' + t[2], t[0] + '/' + t[2], t[2] + '/' + t[1], t[1] + '/' + t[0]], 'tanθ＝' + t[0] + '/' + t[1] + ' → 向かいの辺 ' + t[0] + '、となりの辺 ' + t[1] + ' の直角三角形を考える。\n斜辺は三平方の定理で ' + t[2] + '\n→ cosθ＝' + t[1] + '/' + t[2], { fig: { type: 'righttri', a: t[1], b: t[0], c: t[2], ask: 'theta' } });
  }]);
  var m_m11b = G.m_m11;
  G.m_m11 = mix([m_m11b, function (r, seed) {
    var t = TRI[seed % TRI.length], k = 1 + Math.floor(seed / TRI.length) % 4;
    return Q(2, 'たて ' + (t[0] * k) + 'cm、よこ ' + (t[1] * k) + 'cm の長方形の対角線の長さは?', [(t[2] * k) + 'cm', ((t[0] + t[1]) * k) + 'cm', (t[2] * k + 1) + 'cm', ((t[1] - t[0]) * k) + 'cm'], '対角線で切ると直角三角形が2つできる。\n対角線²＝' + (t[0] * k) + '²＋' + (t[1] * k) + '²＝' + (t[2] * t[2] * k * k) + '\n→ ' + (t[2] * k) + 'cm', { fig: { type: 'righttri', a: t[1] * k, b: t[0] * k, c: t[2] * k, ask: 'c' } });
  }]);

})();
