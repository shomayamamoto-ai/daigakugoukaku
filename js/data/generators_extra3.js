/* 追加単元(第2弾)の自動生成問題。正解は choices[0]。 */
(function () {
  var H = WPS.GENH, G = WPS.GEN;
  var ri = H.ri, pk = H.pk, shuffle = H.shuffle, frac = H.frac, choices = H.choices, numChoices = H.numChoices, Q = H.Q, fact = H.fact, mix = H.mix, num = H.num;
  function PI(f) { return f === '1' ? 'π' : f.indexOf('/') > 0 ? f.split('/')[0] + 'π/' + f.split('/')[1] : f + 'π'; }

  /* ---------- 数学:平面・空間図形 ---------- */
  G.m_space = function (r) {
    var t = ri(r, 0, 5), R = ri(r, 2, 9), A = pk(r, [30, 45, 60, 90, 120, 135, 150, 180, 240, 270]), h = ri(r, 2, 10);
    if (t === 0) return Q(2, '半径 ' + R + 'cm、中心角 ' + A + '° のおうぎ形の弧の長さは?', choices(PI(frac(2 * R * A, 360)) + 'cm', [PI(frac(R * R * A, 360)) + 'cm', PI(frac(R * A, 360)) + 'cm', PI(String(2 * R)) + 'cm']), '弧の長さ＝2πr×(中心角/360)＝2π×' + R + '×' + A + '/360＝' + PI(frac(2 * R * A, 360)) + 'cm');
    if (t === 1) return Q(2, '半径 ' + R + 'cm、中心角 ' + A + '° のおうぎ形の面積は?', choices(PI(frac(R * R * A, 360)) + 'cm²', [PI(frac(2 * R * A, 360)) + 'cm²', PI(String(R * R)) + 'cm²', PI(frac(R * R * A, 180)) + 'cm²']), '面積＝πr²×(中心角/360)＝π×' + (R * R) + '×' + A + '/360＝' + PI(frac(R * R * A, 360)) + 'cm²');
    if (t === 2) return Q(1, '底面の半径 ' + R + 'cm、高さ ' + h + 'cm の円柱の体積は?', choices(PI(String(R * R * h)) + 'cm³', [PI(frac(R * R * h, 3)) + 'cm³', PI(String(2 * R * h)) + 'cm³', PI(String(R * h)) + 'cm³']), '柱の体積＝底面積×高さ＝π×' + R + '²×' + h + '＝' + PI(String(R * R * h)) + 'cm³');
    if (t === 3) { var hh = ri(r, 1, 4) * 3; return Q(2, '底面の半径 ' + R + 'cm、高さ ' + hh + 'cm の円すいの体積は?', choices(PI(String(R * R * hh / 3)) + 'cm³', [PI(String(R * R * hh)) + 'cm³', PI(frac(R * hh, 3)) + 'cm³', PI(String(R * R * hh / 3 * 2)) + 'cm³']), '錐の体積＝底面積×高さ×1/3＝π×' + (R * R) + '×' + hh + '÷3＝' + PI(String(R * R * hh / 3)) + 'cm³\n💡 同じ底面・高さの円柱の1/3。'); }
    if (t === 4) { var r3 = ri(r, 1, 6) * 3; return Q(3, '半径 ' + r3 + 'cm の球の体積は?', choices(PI(String(4 * r3 * r3 * r3 / 3)) + 'cm³', [PI(String(4 * r3 * r3)) + 'cm³', PI(String(r3 * r3 * r3)) + 'cm³', PI(String(4 * r3 * r3 * r3)) + 'cm³']), '球の体積＝4/3πr³＝4/3×π×' + r3 + '³＝' + PI(String(4 * r3 * r3 * r3 / 3)) + 'cm³'); }
    var a = ri(r, 2, 9), b = ri(r, 2, 9);
    return Q(1, '底面が縦 ' + a + 'cm・横 ' + b + 'cm の長方形で、高さ ' + h + 'cm の四角すいの体積は?', numChoices(a * b * h / 3, [a * b * h, a * b * h / 2, (a + b) * h]), '錐の体積＝底面積×高さ×1/3＝' + (a * b) + '×' + h + '÷3＝' + num(a * b * h / 3) + 'cm³');
  };

  /* ---------- 理科:運動とエネルギー ---------- */
  G.s_motion = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var d = ri(r, 2, 30) * 10, s = pk(r, [2, 4, 5, 10]); return Q(1, d + 'cm を ' + s + ' 秒で移動した物体の平均の速さは?', numChoices(d / s, [d * s, s / d, d]), '速さ＝移動距離÷時間＝' + d + '÷' + s + '＝' + num(d / s) + 'cm/s'); }
    if (t === 1) { var m = ri(r, 1, 20) * 100, h = ri(r, 1, 5); return Q(2, m + 'g の物体を ' + h + 'm 持ち上げたときの仕事は?(100g の物体にはたらく重力を1Nとする)', numChoices(m / 100 * h, [m * h, m / 100, m / 100 + h]), '物体にはたらく重力 ' + (m / 100) + 'N\n仕事＝力×距離＝' + (m / 100) + '×' + h + '＝' + (m / 100 * h) + 'J'); }
    if (t === 2) { var W = ri(r, 2, 30) * 10, sec = pk(r, [2, 4, 5, 10]); return Q(2, W + 'J の仕事を ' + sec + ' 秒でしたときの仕事率は?', numChoices(W / sec, [W * sec, sec / W, W]), '仕事率＝仕事÷時間＝' + W + '÷' + sec + '＝' + num(W / sec) + 'W'); }
    if (t === 3) { var v = pk(r, [36, 54, 72, 90, 108]); return Q(2, '時速 ' + v + 'km は秒速何m?', numChoices(v / 3.6, [v * 3.6, v / 60, v * 1000 / 60]), '1時間＝3600秒、1km＝1000m\n' + v + '×1000÷3600＝' + (v / 3.6) + 'm/s'); }
    var C = pk(r, [['斜面を下る台車の速さ', 'だんだん速くなる', ['一定のまま', 'だんだん遅くなる', '止まる']], ['摩擦のない水平面を動く物体', '等速直線運動を続ける', ['だんだん遅くなる', 'だんだん速くなる', 'すぐ止まる']], ['高い所にある物体ほど', '位置エネルギーが大きい', ['運動エネルギーが大きい', '質量が大きい', '速さが大きい']], ['速さが大きい物体ほど', '運動エネルギーが大きい', ['位置エネルギーが大きい', '質量が小さい', '重力が大きい']], ['ふりこの最下点では', '運動エネルギーが最大', ['位置エネルギーが最大', '速さが0', '力学的エネルギーが0']], ['動滑車を使うと、引く力は', '半分になる(引く距離は2倍)', ['2倍になる', '変わらない', '4分の1になる']]]);
    return Q(1, C[0] + 'はどうなる?', [C[1]].concat(C[2]), C[0] + ' → ' + C[1] + '。\n💡 摩擦などがなければ、位置エネルギーと運動エネルギーの和(力学的エネルギー)は一定。');
  };

  /* ---------- 理科:水溶液・密度・状態変化 ---------- */
  G.s_sol = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var so = ri(r, 1, 10) * 5, w = ri(r, 2, 19) * 10, tot = so + w; return Q(2, '食塩 ' + so + 'g を水 ' + w + 'g に溶かした食塩水の質量パーセント濃度は?', choices(num(Math.round(so / tot * 1000) / 10) + '%', [num(Math.round(so / w * 1000) / 10) + '%', num(so) + '%', num(Math.round(w / tot * 1000) / 10) + '%']), '濃度＝溶質÷溶液×100＝' + so + '÷(' + so + '＋' + w + ')×100≒' + num(Math.round(so / tot * 1000) / 10) + '%\n💡 分母は「水」ではなく「水＋食塩」。'); }
    if (t === 1) { var sol = pk(r, [100, 200, 250, 300, 400, 500]), c = pk(r, [2, 4, 5, 10, 15, 20]); return Q(1, c + '% の食塩水 ' + sol + 'g に溶けている食塩は何g?', numChoices(sol * c / 100, [c, sol - sol * c / 100, sol * c / 10]), '溶質＝溶液×濃度÷100＝' + sol + '×' + c + '÷100＝' + num(sol * c / 100) + 'g'); }
    if (t === 2) { var M = pk(r, [[2.7, 'アルミニウム'], [7.9, '鉄'], [8.9, '銅'], [1.0, '水'], [19.3, '金'], [11.3, '鉛']]), V = ri(r, 2, 10), mass = Math.round(M[0] * V * 10) / 10; return Q(2, '体積 ' + V + 'cm³ で質量 ' + mass + 'g の物質の密度は?', choices(num(M[0]) + 'g/cm³', [num(Math.round(V / mass * 100) / 100) + 'g/cm³', num(mass) + 'g/cm³', num(Math.round(M[0] * 2 * 10) / 10) + 'g/cm³']), '密度＝質量÷体積＝' + mass + '÷' + V + '＝' + num(M[0]) + 'g/cm³(' + M[1] + 'の密度)'); }
    if (t === 3) { var S = pk(r, [['ロウを冷やして固体にする', '体積は小さくなり、質量は変わらない'], ['水を冷やして氷にする', '体積は大きくなり、質量は変わらない'], ['水を加熱して水蒸気にする', '体積は非常に大きくなり、質量は変わらない'], ['エタノールを加熱して気体にする', '体積は大きくなり、質量は変わらない']]);
      return Q(2, S[0] + 'と、体積と質量はどうなる?', [S[1]].concat(['体積も質量も大きくなる', '体積も質量も小さくなる', '体積は変わらず、質量が変わる'].filter(function (x) { return x !== S[1]; }).slice(0, 3)), S[1] + '。\n状態変化では、粒子の数は変わらない(質量は一定)が、粒子の間隔が変わる(体積が変わる)。' + (S[0].indexOf('氷') >= 0 ? '\n💡 水は例外で、固体(氷)のほうが体積が大きい。' : '')); }
    var T = pk(r, [['融点', '固体が液体になる温度'], ['沸点', '液体が沸騰して気体になる温度'], ['溶解度', '100g の水に溶ける物質の最大の質量'], ['飽和水溶液', 'それ以上物質が溶けない水溶液'], ['再結晶', '溶解度の差を利用して、結晶を取り出すこと'], ['溶質', '水溶液に溶けている物質'], ['溶媒', '物質を溶かしている液体'], ['蒸留', '液体を加熱し、出てきた気体を冷やして分けること'], ['昇華', '固体が液体を経ずに気体になる(またはその逆の)変化']]);
    return Q(1, '「' + T[0] + '」とは?', [T[1]].concat(shuffle(r, ['固体が液体になる温度', '液体が沸騰して気体になる温度', '100g の水に溶ける物質の最大の質量', '物質を溶かしている液体', '水溶液に溶けている物質', 'それ以上物質が溶けない水溶液']).filter(function (x) { return x !== T[1]; }).slice(0, 3)), '「' + T[0] + '」＝' + T[1], { fact: 1, point: '' });
  };

  /* ---------- 物理基礎:熱・波・電気 ---------- */
  G.s_wave = function (r) {
    var t = ri(r, 0, 4);
    if (t === 0) { var f = pk(r, [100, 200, 250, 340, 440, 500, 680, 850]), l = pk(r, [0.5, 1, 2, 0.2, 0.4]); return Q(2, '振動数 ' + f + 'Hz、波長 ' + l + 'm の波の速さは?', numChoices(f * l, [f / l, l / f, f + l]), 'v＝fλ＝' + f + '×' + l + '＝' + num(f * l) + 'm/s'); }
    if (t === 1) { var v = 340, f2 = pk(r, [170, 340, 680, 850, 100, 200]); return Q(2, '音速 340m/s のとき、振動数 ' + f2 + 'Hz の音の波長は?', numChoices(Math.round(v / f2 * 100) / 100, [v * f2, Math.round(f2 / v * 100) / 100, v - f2 > 0 ? v - f2 : f2 - v]), 'λ＝v÷f＝340÷' + f2 + '＝' + num(Math.round(v / f2 * 100) / 100) + 'm'); }
    if (t === 2) { var m = pk(r, [50, 100, 200, 250, 500]), dT = ri(r, 2, 20); return Q(2, '水 ' + m + 'g の温度を ' + dT + 'K 上げるのに必要な熱量は?(水の比熱 4.2J/(g·K))', numChoices(Math.round(m * 4.2 * dT), [m * dT, Math.round(m * 4.2), Math.round(4.2 * dT)]), 'Q＝mcΔT＝' + m + '×4.2×' + dT + '＝' + Math.round(m * 4.2 * dT) + 'J'); }
    if (t === 3) { var V = pk(r, [100, 200, 12, 6, 3]), I = pk(r, [0.5, 1, 2, 3, 4]); return Q(1, '電圧 ' + V + 'V で電流 ' + I + 'A が流れる電気器具の消費電力は?', numChoices(V * I, [V / I, I / V, V + I]), 'P＝VI＝' + V + '×' + I + '＝' + num(V * I) + 'W'); }
    var P = pk(r, [100, 200, 500, 600, 1000, 1200]), hr = pk(r, [0.5, 1, 2, 3, 4]); return Q(2, P + 'W の電気器具を ' + hr + ' 時間使ったときの電力量は?', choices(num(P * hr) + 'Wh', [num(P / hr) + 'Wh', num(P) + 'Wh', num(P * hr * 60) + 'Wh']), '電力量＝電力×時間＝' + P + '×' + hr + '＝' + num(P * hr) + 'Wh\n(' + num(P * hr * 3600) + 'J)');
  };

  G.s_life = H.fact('seikatsukagaku');

  /* ---------- 社会 ---------- */
  var chizuFact = H.fact('chizu', { q0: function (it) { return '「' + it.t + '」の説明として正しいものは?'; }, q1: function (it) { return '「' + it.m + '」にあてはまるのは?'; } });
  function scaleCalc(r) {
    var sc = pk(r, [25000, 50000]), cm = pk(r, [2, 3, 4, 5, 6, 8, 10, 12]), m = cm * sc / 100, t = ri(r, 0, 1);
    if (t === 0) return Q(2, sc === 25000 ? '2万5千分の1の地形図で ' + cm + 'cm の長さは、実際には何m?' : '5万分の1の地形図で ' + cm + 'cm の長さは、実際には何m?', choices(m + 'm', [(m / 10) + 'm', (m * 10) + 'm', (cm * sc) + 'm']), '実際の距離＝地図上の長さ×縮尺の分母＝' + cm + 'cm×' + sc + '＝' + (cm * sc) + 'cm＝' + m + 'm');
    return Q(1, (sc === 25000 ? '2万5千分の1' : '5万分の1') + 'の地形図で、計曲線は何mごとに引かれている?', choices(sc === 25000 ? '50m' : '100m', sc === 25000 ? ['10m', '20m', '100m'] : ['20m', '50m', '10m']), sc === 25000 ? '2万5千分の1:主曲線10mごと、計曲線50mごと' : '5万分の1:主曲線20mごと、計曲線100mごと');
  }
  G.c_chizu = mix([chizuFact, chizuFact, scaleCalc]);
  G.c_gendai = H.fact('gendaishakai');
  G.c_kokusai = H.fact('kokusaishakai');

  /* ---------- 国語 ---------- */
  G.j_kobun_m = H.fact('kobun_m', { q0: function (it) { return '「' + it.t + '」の説明・読み方として正しいものは?'; }, q1: function (it) { return '「' + it.m + '」にあてはまるのは?'; } });
  // 返り点:漢字の並びと返り点から、読む順を答える
  var KR = [
    { m: ['', 'レ', ''], o: [0, 2, 1] }, { m: ['レ', ''], o: [1, 0] }, { m: ['レ', 'レ', ''], o: [2, 1, 0] }, { m: ['二', '', '一'], o: [1, 2, 0] },
    { m: ['二', '一', ''], o: [1, 0, 2] }, { m: ['', '二', '', '一'], o: [0, 2, 3, 1] }, { m: ['三', '', '二', '', '一'], o: [1, 3, 4, 2, 0] }, { m: ['下', '', '上'], o: [1, 2, 0] },
    { m: ['', 'レ', '', 'レ', ''], o: [0, 2, 1, 4, 3] }, { m: ['二', '', 'レ一', ''], o: [1, 3, 2, 0] }, { m: ['', '', 'レ', ''], o: [0, 1, 3, 2] }
  ];
  var KANJI = '学読書見聞行来知言思食飲入出登山水花月風雪人道天地';
  function kaeriten(r) {
    var p = pk(r, KR), chars = shuffle(r, KANJI.split('')).slice(0, p.m.length);
    var shown = chars.map(function (c, i) { return c + (p.m[i] ? '(' + p.m[i] + ')' : ''); }).join(' ');
    var right = p.o.map(function (i) { return chars[i]; }).join('→');
    var wrong = [chars.join('→'), chars.slice().reverse().join('→'), shuffle(r, chars.slice()).join('→'), p.o.slice().reverse().map(function (i) { return chars[i]; }).join('→')];
    return Q(2, '次の漢字を、返り点にしたがって読む順に並べると?\n' + shown + '\n(( )内が返り点)', choices(right, wrong), '【読む順】' + right + '\nレ点:すぐ下の1字を先に読んでから返る。\n一・二点:「一」の字まで読んでから「二」の字に返る(上・下点も同じ)。');
  }
  G.j_kanbun_m = mix([kaeriten, H.fact('koji', { q0: function (it) { return '故事成語「' + it.t + '」の意味は?'; }, q1: function (it) { return '「' + it.m + '」を表す故事成語は?'; } })]);
  G.j_shiika = H.fact('shiika');
  G.j_dokkai = H.fact('dokkai');
  G.j_shinjo = H.fact('shinjo', { q0: function (it) { return '心情語「' + it.t + '」の意味は?'; }, q1: function (it) { return '「' + it.m + '」を表すことばは?'; } });
  G.j_hyogen = H.fact('hyogenron');

  /* ---------- 英語 ---------- */
  function cloze(list) { return function (r, seed) { var it = list[seed % list.length]; return Q(it[4] || 2, it[0], [it[1]].concat(it[2]), it[3], { say: it[0].replace(/\(\s*\)/, it[1]) }); }; }
  G.e_inf = cloze([
    ['I want (   ) abroad someday.', 'to study', ['studying', 'study', 'studied'], 'want の後ろは to不定詞(これからしたいこと)。'],
    ['She enjoys (   ) the piano.', 'playing', ['to play', 'play', 'played'], 'enjoy の後ろは動名詞(〜ing)。'],
    ['He finished (   ) his homework.', 'doing', ['to do', 'do', 'done'], 'finish の後ろは動名詞。'],
    ['We decided (   ) a new car.', 'to buy', ['buying', 'buy', 'bought'], 'decide の後ろは to不定詞。'],
    ['Remember (   ) the door when you leave.', 'to lock', ['locking', 'lock', 'locked'], 'remember to do＝「(これから)忘れずに〜する」。'],
    ['I remember (   ) him at the party last year.', 'meeting', ['to meet', 'meet', 'met'], 'remember doing＝「(過去に)〜したことを覚えている」。'],
    ['Don\'t forget (   ) this letter.', 'to send', ['sending', 'send', 'sent'], 'forget to do＝「〜するのを忘れる」。'],
    ['I will never forget (   ) Mt. Fuji for the first time.', 'seeing', ['to see', 'see', 'saw'], 'forget doing＝「〜したことを忘れる」。'],
    ['He stopped (   ) because it was bad for his health.', 'smoking', ['to smoke', 'smoke', 'smoked'], 'stop doing＝「〜するのをやめる」。'],
    ['She stopped (   ) a picture of the sunset.', 'to take', ['taking', 'take', 'taken'], 'stop to do＝「〜するために立ち止まる」(to は目的)。'],
    ['I tried (   ) the window, but it didn\'t open.', 'to open', ['opening', 'open', 'opened'], 'try to do＝「〜しようとする(努力する)」。'],
    ['Try (   ) this cake. It\'s delicious.', 'eating', ['to eat', 'eat', 'ate'], 'try doing＝「試しに〜してみる」。'],
    ['He avoided (   ) the question.', 'answering', ['to answer', 'answer', 'answered'], 'avoid の後ろは動名詞。'],
    ['I hope (   ) you again soon.', 'to see', ['seeing', 'see', 'saw'], 'hope の後ろは to不定詞。'],
    ['Would you mind (   ) the window?', 'opening', ['to open', 'open', 'opened'], 'mind の後ろは動名詞。'],
    ['She gave up (   ) to be a singer.', 'trying', ['to try', 'try', 'tried'], 'give up の後ろは動名詞。'],
    ['I am looking forward to (   ) you.', 'seeing', ['see', 'to see', 'saw'], 'look forward to の to は前置詞なので、後ろは動名詞。'],
    ['There are many places (   ) in Kyoto.', 'to visit', ['visiting', 'visit', 'visited'], '名詞を後ろから説明する不定詞(形容詞的用法)。'],
    ['He went to the library (   ) books.', 'to borrow', ['borrowing', 'borrow', 'borrowed'], '目的を表す不定詞(副詞的用法)「〜するために」。'],
    ['I was surprised (   ) the news.', 'to hear', ['hearing', 'hear', 'heard'], '感情の原因を表す不定詞「〜して(驚いた)」。'],
    ['It is important (   ) every day.', 'to practice', ['practicing', 'practice', 'practiced'], 'It is 〜 to do＝「…することは〜だ」(名詞的用法)。'],
    ['It is kind (   ) you to help me.', 'of', ['for', 'to', 'with'], '人の性質を表す形容詞(kind・nice)のときは of 人。'],
    ['It is difficult (   ) me to solve this problem.', 'for', ['of', 'to', 'with'], 'ふつうは for 人 to do。'],
    ['I don\'t know what (   ) next.', 'to do', ['doing', 'do', 'did'], '疑問詞＋to do＝「何を〜すべきか」。'],
    ['Please tell me how (   ) this machine.', 'to use', ['using', 'use', 'used'], 'how to do＝「〜のしかた」。'],
    ['My father told me (   ) harder.', 'to study', ['studying', 'study', 'studied'], 'tell 人 to do＝「人に〜するように言う」。'],
    ['I want you (   ) with me.', 'to come', ['coming', 'come', 'came'], 'want 人 to do＝「人に〜してほしい」。'],
    ['My mother made me (   ) my room.', 'clean', ['to clean', 'cleaning', 'cleaned'], 'make 人 原形＝「人に〜させる」(使役)。to は付けない。'],
    ['She let me (   ) her bike.', 'use', ['to use', 'using', 'used'], 'let 人 原形＝「人に〜させてあげる」。'],
    ['I had my hair (   ) yesterday.', 'cut', ['cutting', 'to cut', 'cuts'], 'have ＋ 物 ＋ 過去分詞＝「物を〜してもらう」。'],
    ['I saw him (   ) the street.', 'cross', ['to cross', 'crossed', 'crosses'], '知覚動詞 see 人 原形(または〜ing)＝「人が〜するのを見る」。'],
    ['I heard my name (   ).', 'called', ['call', 'calling', 'to call'], 'hear ＋ 物 ＋ 過去分詞＝「〜されるのを聞く」。'],
    ['Look at the (   ) baby.', 'sleeping', ['slept', 'sleep', 'to sleep'], '名詞の前に置いて「〜している」(現在分詞)。'],
    ['This is a car (   ) in Japan.', 'made', ['making', 'make', 'to make'], '名詞を後ろから説明し「〜された」(過去分詞)。'],
    ['The boy (   ) under the tree is my brother.', 'standing', ['stood', 'stands', 'to stand'], '名詞を後ろから説明し「〜している」(現在分詞)。'],
    ['The game was (   ).', 'exciting', ['excited', 'excite', 'to excite'], '物事が人をわくわくさせる → exciting。'],
    ['I was (   ) at the game.', 'excited', ['exciting', 'excite', 'to excite'], '人がわくわくさせられる → excited。'],
    ['The movie was (   ). I almost fell asleep.', 'boring', ['bored', 'bore', 'to bore'], '物事が退屈させる → boring。'],
    ['He is used to (   ) alone.', 'living', ['live', 'to live', 'lived'], 'be used to 〜ing＝「〜に慣れている」。'],
    ['It is no use (   ) over spilt milk.', 'crying', ['to cry', 'cry', 'cried'], 'It is no use 〜ing＝「〜してもむだだ」。'],
    ['I feel like (   ) a walk.', 'taking', ['to take', 'take', 'took'], 'feel like 〜ing＝「〜したい気がする」。'],
    ['This book is worth (   ).', 'reading', ['to read', 'read', 'reads'], 'be worth 〜ing＝「〜する価値がある」。'],
    ['He seems (   ) rich.', 'to be', ['being', 'be', 'been'], 'seem to do＝「〜のようだ」。'],
    ['She is too young (   ) a car.', 'to drive', ['driving', 'drive', 'drove'], 'too 〜 to do＝「〜すぎて…できない」。'],
    ['He is rich enough (   ) the house.', 'to buy', ['buying', 'buy', 'bought'], '〜 enough to do＝「…するのに十分〜」。'],
    ['I got up early so as (   ) the first train.', 'to catch', ['catching', 'catch', 'caught'], 'so as to do＝「〜するために」。'],
    ['To tell the (   ), I don\'t like coffee.', 'truth', ['true', 'truly', 'trust'], 'To tell the truth＝「実を言うと」(独立不定詞)。'],
    ['I am sorry for (   ) late.', 'being', ['be', 'to be', 'been'], '前置詞の後ろは動名詞。'],
    ['Thank you for (   ) me.', 'helping', ['help', 'to help', 'helped'], 'Thank you for 〜ing。'],
    ['He left the room without (   ) a word.', 'saying', ['say', 'to say', 'said'], 'without 〜ing＝「〜しないで」。']
  ]);
  G.e_emph = cloze([
    ['It was Tom (   ) broke the window.', 'that', ['what', 'which', 'how'], '強調構文 It is 〜 that …「…したのは〜だ」。人なら who も可。'],
    ['It was in this room (   ) the meeting was held.', 'that', ['which', 'what', 'where it'], '強調構文。It was と that を消しても文が成り立つ。'],
    ['It is not money (   ) makes us happy.', 'that', ['what', 'how', 'whose'], '強調構文「私たちを幸せにするのはお金ではない」。'],
    ['It was not until last week (   ) I knew the truth.', 'that', ['when', 'which', 'what'], 'It was not until 〜 that …＝「〜して初めて…した」。'],
    ['What (   ) is your help.', 'I need', ['do I need', 'need I', 'I needing'], 'What S V is 〜＝「S が V するのは〜だ」(強調)。'],
    ['I (   ) love this song.', 'do', ['am', 'did', 'does'], '動詞の前の do は強調「本当に〜する」。'],
    ['She (   ) come to the party yesterday.', 'did', ['does', 'do', 'was'], '過去の強調は did ＋ 原形。'],
    ['Never (   ) such a beautiful sunset.', 'have I seen', ['I have seen', 'I saw', 'seen I have'], '否定語が文頭 → 倒置(疑問文の語順)。'],
    ['Little (   ) that he would win.', 'did I dream', ['I dreamed', 'I did dream', 'dreamed I'], 'Little が文頭 → 倒置「〜とは夢にも思わなかった」。'],
    ['Not only (   ) English, but she also speaks French.', 'does she speak', ['she speaks', 'speaks she', 'she does speak'], 'Not only が文頭 → 倒置。'],
    ['Hardly (   ) home when it began to rain.', 'had I got', ['I had got', 'I got', 'got I'], 'Hardly had S 過去分詞 when …＝「〜するとすぐに…」。'],
    ['No sooner (   ) left than it started to snow.', 'had he', ['he had', 'did he', 'he did'], 'No sooner had S 過去分詞 than …＝「〜するとすぐに…」。'],
    ['Only then (   ) the meaning of his words.', 'did I understand', ['I understood', 'I did understand', 'understood I'], 'Only ＋副詞が文頭 → 倒置。'],
    ['Seldom (   ) late for school.', 'is he', ['he is', 'does he', 'he does'], 'Seldom が文頭 → 倒置。'],
    ['"I am tired." "So (   )."', 'am I', ['I am', 'do I', 'I do'], 'So ＋ V ＋ S＝「S もそうだ」。'],
    ['"I don\'t like natto." "Neither (   )."', 'do I', ['I do', 'am I', 'I am'], 'Neither ＋ V ＋ S＝「S もそうではない」。'],
    ['Here (   ) the bus.', 'comes', ['come', 'is coming it', 'it comes'], 'Here comes ＋名詞＝倒置。代名詞なら Here it comes.'],
    ['Happy (   ) those who have true friends.', 'are', ['is', 'be', 'being'], '補語(Happy)が文頭 → 倒置。主語は those(複数)。'],
    ['Should you (   ) any questions, please call me.', 'have', ['had', 'having', 'to have'], 'If を省略した倒置 Should S 原形＝If S should 〜。'],
    ['Had I known it, I (   ) have told you.', 'would', ['will', 'can', 'shall'], 'If を省略した倒置 Had I known＝If I had known。'],
    ['Were I you, I (   ) accept the offer.', 'would', ['will', 'can', 'shall'], 'Were I you＝If I were you(倒置)。'],
    ['When (   ) young, he lived in Osaka.', 'he was', ['was he', 'he is', 'is he'], '時の接続詞の後では主語と be動詞を省略できる(When young も可)。'],
    ['Though (   ) tired, she kept working.', 'very', ['was', 'is', 'being'], 'Though (she was) very tired の省略。'],
    ['If (   ), please call me.', 'necessary', ['necessity', 'necessarily', 'need'], 'If necessary＝If it is necessary の省略。'],
    ['She is, (   ) to speak, a walking dictionary.', 'so', ['as', 'such', 'too'], 'so to speak＝「いわば」(挿入)。'],
    ['He is, (   ) I know, an honest man.', 'as far as', ['as long as', 'as soon as', 'as well as'], 'as far as I know＝「私の知る限り」(挿入)。'],
    ['This is the man (   ) I think is honest.', 'who', ['whom', 'which', 'what'], '関係代名詞の後に I think が挿入。who is honest の who。'],
    ['He said, "I am busy." → He said that (   ) busy.', 'he was', ['I was', 'he is', 'I am'], '直接話法→間接話法:I → he、時制を一致させて am → was。'],
    ['She said to me, "I will help you." → She told me that she (   ) help me.', 'would', ['will', 'shall', 'should'], 'will → would(時制の一致)、you → me。'],
    ['He said, "I bought this book yesterday." → He said that he had bought that book the day (   ).', 'before', ['after', 'ago', 'yesterday'], 'yesterday → the day before(前日)。過去形 → 過去完了。'],
    ['She said, "I am here now." → She said that she was (   ) then.', 'there', ['here', 'this', 'that'], 'here → there、now → then。'],
    ['He said to me, "Are you hungry?" → He asked me (   ) I was hungry.', 'if', ['that', 'what', 'which'], 'Yes/No 疑問文 → ask 人 if(whether) S V。'],
    ['She said to me, "Where do you live?" → She asked me where (   ).', 'I lived', ['did I live', 'do I live', 'I live'], '疑問詞の疑問文 → ask 人 疑問詞 S V(ふつうの語順・時制の一致)。'],
    ['He said to me, "Open the door." → He told me (   ) the door.', 'to open', ['open', 'opening', 'that open'], '命令文 → tell 人 to do。'],
    ['He said to me, "Don\'t be late." → He told me (   ) late.', 'not to be', ['to not be', 'don\'t be', 'not being'], '否定の命令文 → tell 人 not to do。'],
    ['She said to me, "Please help me." → She asked me (   ) her.', 'to help', ['help', 'helping', 'that help'], '依頼(Please 〜) → ask 人 to do。'],
    ['He said, "Let\'s go out." → He suggested that we (   ) out.', 'go', ['went', 'going', 'to go'], 'Let\'s 〜 → suggest that S (should) 原形。'],
    ['The earth goes around the sun. → My teacher said that the earth (   ) around the sun.', 'goes', ['went', 'has gone', 'is going'], '不変の真理は時制の一致を受けない。'],
    ['It is you (   ) are to blame.', 'who', ['which', 'whom', 'whose'], '強調構文で、強調するのが人なら that の代わりに who も使える。動詞は強調される you に合わせて are。'],
    ['Under no circumstances (   ) open this door.', 'should you', ['you should', 'you do', 'do you'], '否定の副詞句が文頭 → 倒置。'],
    ['So tired (   ) that she fell asleep at once.', 'was she', ['she was', 'did she', 'she did'], 'So 形容詞 が文頭 → 倒置(so 〜 that 構文)。'],
    ['On the hill (   ) an old castle.', 'stands', ['stand', 'standing', 'is stand'], '場所の副詞句が文頭 → 倒置(V ＋ S)。主語は an old castle。'],
    ['Not a single word (   ) say.', 'did he', ['he did', 'he', 'does he'], 'Not a single 〜 が文頭 → 倒置「一言も言わなかった」。'],
    ['Rarely (   ) see such a talented player.', 'do we', ['we do', 'we', 'are we'], 'Rarely が文頭 → 倒置。'],
    ['It is this book (   ) I want to buy.', 'that', ['what', 'how', 'where'], '強調構文。物を強調するときは that(which も可)。'],
    ['It was because he was ill (   ) he was absent.', 'that', ['so', 'which', 'why it'], '理由の節を強調した強調構文。'],
    ['All (   ) have to do is wait.', 'you', ['what you', 'that what', 'which'], 'All (that) you have to do is (to) do＝「〜しさえすればよい」。'],
    ['I said I would come, and I (   ).', 'will', ['do', 'am', 'have'], '後ろの動詞句(come)を省略。will come の come を省いた形。'],
    ['"Will it rain tomorrow?" "I hope (   )."', 'not', ['no', 'don\'t', 'never'], 'I hope not.＝I hope it will not rain.(省略)'],
    ['"Is he coming?" "I think (   )."', 'so', ['it', 'that', 'yes'], 'I think so.＝I think he is coming.(so が節の代わり)']
  ]);
})();
