/* 追加単元(円周角・箱ひげ図・標本調査・英語の助動詞・比較)の自動生成問題。正解は choices[0]。 */
(function () {
  var H = WPS.GENH, G = WPS.GEN;
  var ri = H.ri, pk = H.pk, shuffle = H.shuffle, frac = H.frac, choices = H.choices, numChoices = H.numChoices, Q = H.Q;

  G.m_circ = function (r) {
    var t = ri(r, 0, 3), x = ri(r, 10, 80);
    if (t === 0) return Q(1, '円 O で、弧 AB に対する中心角 ∠AOB が ' + (2 * x) + '° のとき、円周角 ∠ACB は?', numChoices(x, [2 * x, 180 - 2 * x, 90 - x / 2]), '円周角は中心角の半分 → ' + (2 * x) + '÷2＝' + x + '°');
    if (t === 1) return Q(1, '同じ弧 AB に対する円周角 ∠ACB＝' + x + '° のとき、∠ADB は?(C、D は同じ側の円周上)', numChoices(x, [2 * x, 180 - x, x / 2]), '同じ弧に対する円周角は等しい → ' + x + '°');
    if (t === 2) { var y = ri(r, 15, 70); return Q(2, 'AB が円の直径で、点 C は円周上の点。∠CAB＝' + y + '° のとき、∠CBA は?', numChoices(90 - y, [y, 180 - y, 2 * y]), '直径に対する円周角 ∠ACB＝90°\n三角形の内角の和から ∠CBA＝180°−90°−' + y + '°＝' + (90 - y) + '°'); }
    var a = ri(r, 30, 80), b = ri(r, 30, 80);
    return Q(3, '円に内接する四角形 ABCD で、∠A＝' + a + '° のとき、∠C は?', numChoices(180 - a, [a, 360 - a, 90 + a / 2]), '円に内接する四角形の向かい合う角の和は180° → 180°−' + a + '°＝' + (180 - a) + '°');
  };
  G.m_box = function (r) {
    var arr = shuffle(r, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).slice(0, 7).sort(function (a, b) { return a - b; });
    var q1 = arr[1], med = arr[3], q3 = arr[5], t = ri(r, 0, 3);
    var shown = shuffle(r, arr.slice()).join(', ');
    if (t === 0) return Q(1, '7個のデータ ' + shown + ' の中央値は?', numChoices(med, [q1, q3, Math.round((arr[0] + arr[6]) / 2)]), '小さい順:' + arr.join(', ') + '\n真ん中(4番目)の ' + med + ' が中央値');
    if (t === 1) return Q(2, '7個のデータ ' + shown + ' の第1四分位数は?', numChoices(q1, [arr[0], med, arr[2]]), '小さい順:' + arr.join(', ') + '\n中央値より下の3個(' + arr.slice(0, 3).join(', ') + ')の真ん中 → ' + q1);
    if (t === 2) return Q(2, '7個のデータ ' + shown + ' の四分位範囲は?', numChoices(q3 - q1, [arr[6] - arr[0], q3, med - q1]), 'Q1＝' + q1 + '、Q3＝' + q3 + '(中央値より上の3個 ' + arr.slice(4).join(', ') + ' の真ん中)\n四分位範囲＝Q3−Q1＝' + (q3 - q1));
    var parts = pk(r, [['箱(第1四分位数〜第3四分位数)', '約50%'], ['左のひげ(最小値〜第1四分位数)', '約25%'], ['右のひげ(第3四分位数〜最大値)', '約25%'], ['最小値〜中央値', '約50%'], ['第1四分位数〜最大値', '約75%']]);
    return Q(1, '箱ひげ図で、' + parts[0] + 'の範囲には、データのおよそ何%が入る?', choices(parts[1], ['約25%', '約50%', '約75%', '約100%']), '四分位数はデータを4等分する値。1区間に約25%ずつ入る\n→ ' + parts[0] + ' は ' + parts[1]);
  };
  G.m_sample = function (r) {
    var t = ri(r, 0, 2);
    if (t === 0) { var N = pk(r, [500, 600, 800, 1000, 1200, 1500, 2000]), n = pk(r, [20, 25, 40, 50]), k = ri(r, 1, n / 2), ans = N * k / n;
      if (ans % 1) { n = 20; k = ri(r, 1, 10); ans = N * k / n; }
      return Q(2, '袋に白玉と赤玉が合わせて ' + N + ' 個ある。無作為に ' + n + ' 個取り出すと、赤玉が ' + k + ' 個だった。袋の中の赤玉はおよそ何個?', numChoices(ans, [k * 10, N - ans, ans * 2]), '標本の赤玉の割合 ' + k + '/' + n + ' が、全体でも同じと考える\n' + N + '×' + k + '/' + n + '＝' + ans + '(個)'); }
    if (t === 1) { var mark = pk(r, [30, 40, 50, 60, 80, 100]), cap = pk(r, [20, 25, 40, 50]), m = ri(r, 2, 10), est = Math.round(mark * cap / m);
      return Q(3, '池の魚 ' + mark + ' 匹に印をつけて戻した。後日 ' + cap + ' 匹とったら、印のついた魚が ' + m + ' 匹いた。池の魚はおよそ何匹?', numChoices(est, [mark + cap, Math.round(mark * m / cap), mark * 2]), '印の割合が全体でも同じと考える\n全体:' + mark + '＝' + cap + ':' + m + ' → 全体＝' + mark + '×' + cap + '÷' + m + '≒' + est + '(匹)'); }
    var L = pk(r, [['テレビの視聴率調査', '標本調査', '全部の家庭を調べるのは現実的でないため'], ['学校の健康診断', '全数調査', '一人ひとりの結果が必要なため'], ['国勢調査', '全数調査', '国の全員の実態を正確に知るため'], ['缶詰の品質検査', '標本調査', '全部開けると売る商品がなくなるため'], ['世論調査', '標本調査', '全員に聞くのは時間と費用がかかりすぎるため'], ['入学試験', '全数調査', '受験者全員の得点が必要なため'], ['電球の寿命の検査', '標本調査', '調べると製品が使えなくなるため'], ['クラスの出欠確認', '全数調査', '一人ひとりの状況が必要なため']]);
    return Q(1, '「' + L[0] + '」は、全数調査と標本調査のどちらがふさわしい?', [L[1], L[1] === '全数調査' ? '標本調査' : '全数調査'], L[1] + 'がふさわしい。理由:' + L[2]);
  };

  // 英語:穴埋め文 [英文( )入り, 正解, 誤答3つ, 解説]
  function cloze(list) {
    return function (r, seed) {
      var it = list[seed % list.length], q = Q(it[4] || 2, it[0], [it[1]].concat(it[2]), it[3], { say: it[0].replace(/\(\s*\)/, it[1]) });
      return q;
    };
  }
  G.e_aux = cloze([
    ['He (   ) be tired. He worked all night.', 'must', ['can\'t', 'may not', 'need'], 'must＝「〜にちがいない」(強い確信)。一晩中働いたので、疲れているにちがいない。'],
    ['She (   ) be at home. I saw her at the station a minute ago.', 'can\'t', ['must', 'should', 'will'], 'can\'t＝「〜のはずがない」。今駅で見たので、家にいるはずがない。'],
    ['It (   ) rain this afternoon, so take an umbrella.', 'may', ['must not', 'can\'t', 'need not'], 'may＝「〜かもしれない」。雨かもしれないので傘を持って行って。'],
    ['I (   ) have studied harder. I failed the test.', 'should', ['must', 'can\'t', 'would'], 'should have＋過去分詞＝「〜すべきだったのに(しなかった)」という後悔。'],
    ['He (   ) have left already. His bag is gone.', 'must', ['can\'t', 'should', 'need'], 'must have＋過去分詞＝「〜したにちがいない」(過去の推量)。'],
    ['She (   ) have said such a thing. She is always kind.', 'can\'t', ['must', 'should', 'would'], 'can\'t have＋過去分詞＝「〜したはずがない」。'],
    ['You (   ) not have come so early. The meeting starts at ten.', 'need', ['must', 'can', 'should'], 'need not have＋過去分詞＝「〜する必要はなかったのに(してしまった)」。'],
    ['He (   ) have missed the train. He is not here yet.', 'may', ['must not', 'cannot', 'need not'], 'may have＋過去分詞＝「〜したかもしれない」。'],
    ['You (   ) better see a doctor.', 'had', ['would', 'should', 'have'], 'had better＋原形＝「〜したほうがよい(強い忠告)」。'],
    ['I would (   ) stay home than go out today.', 'rather', ['better', 'like', 'prefer'], 'would rather A than B＝「B するよりむしろ A したい」。'],
    ['You (   ) not to tell lies.', 'ought', ['should', 'must', 'had'], 'ought to＝should と同じ「〜すべき」。否定は ought not to。'],
    ['When I was a child, I (   ) often play in this park.', 'would', ['will', 'should', 'must'], 'would often＝「(過去に)よく〜したものだ」という過去の習慣。'],
    ['There (   ) to be a big tree here.', 'used', ['would', 'was', 'had'], 'used to＝「以前は〜だった」。状態の過去には would ではなく used to を使う。'],
    ['You (   ) not park here. It is against the rules.', 'must', ['need', 'may', 'would'], 'must not＝「〜してはいけない」(禁止)。'],
    ['You (   ) not finish it today. Tomorrow is fine.', 'need', ['must', 'should', 'may'], 'need not＝don\'t have to＝「〜する必要はない」。must not(禁止)と区別する。'],
    ['It is natural that she (   ) get angry.', 'should', ['must', 'would', 'can'], '感情・判断を表す it is natural that … の中では should を使うことがある(「〜するのも当然だ」)。'],
    ['I suggested that he (   ) go to the hospital.', 'should', ['would', 'must', 'could'], 'suggest that ＋ S ＋(should)＋原形。提案・要求の that 節では should または原形。'],
    ['(   ) you like another cup of tea?', 'Would', ['Will', 'Shall', 'Must'], 'Would you like 〜?＝「〜はいかがですか」(ていねいなすすめ)。'],
    ['(   ) I open the window?', 'Shall', ['Will', 'Must', 'Would'], 'Shall I 〜?＝「(私が)〜しましょうか」(申し出)。'],
    ['He (   ) not have known the truth then.', 'might', ['must', 'should', 'need'], 'might not have＋過去分詞＝「〜しなかったかもしれない」。'],
    ['You (   ) as well start now.', 'may', ['must', 'can', 'need'], 'may as well＋原形＝「〜したほうがよい(〜してもいいだろう)」。'],
    ['She cannot (   ) laughing at the joke.', 'help', ['stop', 'avoid', 'keep'], 'cannot help 〜ing＝「〜せずにはいられない」。'],
    ['You cannot be (   ) careful when you drive.', 'too', ['very', 'so', 'much'], 'cannot be too 〜＝「いくら〜してもしすぎることはない」。'],
    ['He (   ) to get up early when he was a student.', 'used', ['would', 'was', 'had'], 'used to＋原形＝「以前はよく〜したものだ(今はしない)」。'],
    ['I am used to (   ) up early.', 'getting', ['get', 'got', 'gets'], 'be used to 〜ing＝「〜に慣れている」。used to＋原形(以前は〜した)と区別。'],
    ['They (   ) be brothers. They look exactly alike.', 'must', ['can\'t', 'need', 'shall'], 'must＝「〜にちがいない」。そっくりなので兄弟にちがいない。'],
    ['That (   ) be true. It sounds impossible.', 'can\'t', ['must', 'should', 'will'], 'can\'t＝「〜のはずがない」。'],
    ['He (   ) know the answer. He is a math teacher.', 'should', ['can\'t', 'need', 'shall'], 'should＝「〜のはずだ」(当然の推量)。'],
    ['You (   ) have told me earlier. I could have helped you.', 'should', ['must', 'can\'t', 'need'], 'should have＋過去分詞＝「〜すべきだったのに」(相手への非難・後悔)。'],
    ['The road is wet. It (   ) have rained last night.', 'must', ['can\'t', 'should', 'need'], 'must have＋過去分詞＝「〜したにちがいない」。道がぬれている → 雨が降ったにちがいない。'],
    ['He (   ) have been sick. He looked fine yesterday.', 'can\'t', ['must', 'should', 'would'], 'can\'t have＋過去分詞＝「〜だったはずがない」。'],
    ['I (   ) have gone to the party. It was boring.', 'shouldn\'t', ['mustn\'t', 'can\'t', 'needn\'t'], 'shouldn\'t have＋過去分詞＝「〜すべきではなかったのに(してしまった)」。'],
    ['You (   ) have bought milk. We still have some.', 'needn\'t', ['mustn\'t', 'can\'t', 'shouldn\'t'], 'needn\'t have＋過去分詞＝「〜する必要はなかったのに」。'],
    ['She (   ) have forgotten our meeting. She is late.', 'may', ['must not', 'needn\'t', 'shall'], 'may have＋過去分詞＝「〜したかもしれない」。'],
    ['You (   ) better not go out tonight.', 'had', ['would', 'should', 'have'], 'had better not＋原形＝「〜しないほうがよい」。not の位置に注意。'],
    ['I would rather not (   ) about it.', 'talk', ['to talk', 'talking', 'talked'], 'would rather (not)＋原形。to は付けない。'],
    ['He (   ) not to have said that.', 'ought', ['should', 'must', 'would'], 'ought not to have＋過去分詞＝「〜すべきではなかった」。'],
    ['My grandfather (   ) often tell me old stories.', 'would', ['will', 'shall', 'must'], 'would often＝過去の習慣「よく〜したものだ」。'],
    ['There (   ) to be a castle on this hill.', 'used', ['would', 'was', 'had'], '状態の過去の習慣は used to。'],
    ['Students (   ) not use phones during the test.', 'must', ['need', 'would', 'shall'], 'must not＝禁止「〜してはいけない」。'],
    ['You (   ) not bring lunch. It will be provided.', 'need', ['must', 'would', 'shall'], 'need not＝不必要「〜する必要はない」。'],
    ['It is necessary that he (   ) attend the meeting.', 'should', ['would', 'could', 'might'], '必要・要求を表す that 節では (should)＋原形。'],
    ['She insisted that he (   ) there alone.', 'go', ['goes', 'went', 'going'], 'insist that S (should)＋原形。should を省くと原形の go。'],
    ['(   ) you mind opening the door?', 'Would', ['Shall', 'Must', 'May'], 'Would you mind 〜ing?＝「〜していただけませんか」。'],
    ['(   ) we go for a walk?', 'Shall', ['Will', 'Must', 'Would'], 'Shall we 〜?＝「(いっしょに)〜しましょうか」(誘い)。'],
    ['It (   ) be cold in the mountains even in summer.', 'can', ['must not', 'need', 'shall'], 'can＝「(時には)〜することがある」(可能性)。'],
    ['You might as well (   ) the truth.', 'tell', ['to tell', 'telling', 'told'], 'might as well＋原形＝「〜したほうがましだ」。'],
    ['I could not (   ) crying when I heard the news.', 'help', ['stop to', 'avoid to', 'keep'], 'could not help 〜ing＝「〜せずにはいられなかった」。'],
    ['You cannot be too (   ) with fire.', 'careful', ['carefully', 'care', 'caring'], 'cannot be too 形容詞＝「いくら〜してもしすぎることはない」。'],
    ['He may (   ) be proud of his son.', 'well', ['good', 'better', 'much'], 'may well＋原形＝「〜するのももっともだ」。']
  ]);
  G.e_comp = cloze([
    ['This room is three times as (   ) as that one.', 'large', ['larger', 'largest', 'largely'], 'X times as 原級 as ＝「〜の X 倍…」。as と as の間は原級。'],
    ['This bridge is twice as (   ) as that one.', 'long', ['longer', 'longest', 'length'], 'twice as 原級 as ＝「〜の2倍…」。'],
    ['The (   ) you practice, the better you will play.', 'more', ['most', 'much', 'many'], 'the 比較級, the 比較級＝「〜すればするほど、ますます…」。'],
    ['The older he grew, the (   ) he became.', 'wiser', ['wise', 'wisest', 'more wise'], 'the 比較級, the 比較級。wise の比較級は wiser。'],
    ['He has no (   ) than 1,000 yen.', 'more', ['less', 'most', 'much'], 'no more than＝only「たった〜しか」。'],
    ['She has no (   ) than ten cats.', 'less', ['more', 'least', 'little'], 'no less than＝as many/much as「〜も(多くの)」。'],
    ['Mt. Fuji is higher than (   ) other mountain in Japan.', 'any', ['all', 'some', 'every'], '比較級＋than any other＋単数名詞＝「ほかのどの〜よりも」(最上級の意味)。'],
    ['No other student in the class is (   ) than Ken.', 'taller', ['tall', 'tallest', 'as tall'], 'No other＋単数名詞＋比較級＋than＝最上級の意味。'],
    ['It is getting (   ) and colder.', 'colder', ['cold', 'coldest', 'more cold'], '比較級 and 比較級＝「ますます〜」。'],
    ['This is the (   ) interesting book I have ever read.', 'most', ['more', 'much', 'very'], 'the 最上級＋(that) S have ever 過去分詞＝「今までに〜した中で最も…」。'],
    ['He is not so much a teacher (   ) a scholar.', 'as', ['than', 'but', 'so'], 'not so much A as B＝「A というよりむしろ B」。'],
    ['I like coffee much (   ) than tea.', 'better', ['more', 'best', 'well'], 'like A better than B＝「B より A が好き」。'],
    ['Please answer as soon as (   ).', 'possible', ['possibly', 'able', 'can'], 'as 〜 as possible＝「できるだけ〜」(as 〜 as S can)。'],
    ['This box is (   ) heavier than that one.', 'much', ['very', 'more', 'most'], '比較級を強めるのは much・far・even など。very は使えない。'],
    ['She is the (   ) of the two sisters.', 'taller', ['tallest', 'tall', 'more tall'], 'the 比較級 of the two＝「2人のうちで〜なほう」。'],
    ['He is senior (   ) me by three years.', 'to', ['than', 'from', 'of'], 'senior・junior・superior・inferior は than ではなく to を使う。'],
    ['I prefer walking (   ) driving.', 'to', ['than', 'from', 'over'], 'prefer A to B＝「B より A を好む」。'],
    ['She is as kind as (   ).', 'ever', ['never', 'always', 'usual'], 'as 〜 as ever＝「相変わらず〜」。'],
    ['The population of Tokyo is larger than (   ) of Osaka.', 'that', ['it', 'this', 'one'], '比べるものをそろえる。the population をくり返す代わりに that を使う。'],
    ['He knows better (   ) to believe such a story.', 'than', ['as', 'that', 'so'], 'know better than to 〜＝「〜するほどばかではない」。'],
    ['This is by (   ) the best movie of the year.', 'far', ['very', 'much more', 'so'], 'by far＋最上級＝「ずば抜けて〜」。'],
    ['Nothing is (   ) important than health.', 'more', ['most', 'much', 'very'], 'Nothing is 比較級 than A＝「A ほど〜なものはない」(最上級の意味)。'],
    ['He is the last person (   ) tell a lie.', 'to', ['who', 'for', 'that'], 'the last person to 〜＝「最も〜しそうにない人」。'],
    ['The sooner, the (   ).', 'better', ['good', 'best', 'more'], 'The sooner, the better.＝「早ければ早いほどよい」。'],
    ['My bag is half as (   ) as yours.', 'big', ['bigger', 'biggest', 'bigly'], 'half as 原級 as＝「〜の半分の…」。'],
    ['This tower is four times as (   ) as that building.', 'tall', ['taller', 'tallest', 'tallness'], 'X times as 原級 as ＝「〜の X 倍…」。'],
    ['The population of this city is three times (   ) than that of my town.', 'larger', ['large', 'largest', 'as large'], 'X times 比較級 than ＝「〜の X 倍…」(as 原級 as と同じ意味)。'],
    ['The more you read, the (   ) you learn.', 'more', ['most', 'much', 'many'], 'the 比較級, the 比較級＝「〜すればするほど…」。'],
    ['The harder you work, the (   ) your results will be.', 'better', ['good', 'best', 'well'], 'the 比較級, the 比較級。good の比較級は better。'],
    ['I have no (   ) than three days to finish this.', 'more', ['less', 'most', 'much'], 'no more than＝「たった〜しか」。'],
    ['He paid no (   ) than 10,000 yen for the ticket.', 'less', ['more', 'least', 'little'], 'no less than＝「〜も(の大金を)」。'],
    ['Tokyo is larger than any other (   ) in Japan.', 'city', ['cities', 'a city', 'the city'], 'than any other＋単数名詞。'],
    ['No other river in Japan is (   ) than the Shinano River.', 'longer', ['long', 'longest', 'as long'], 'No other＋単数名詞＋比較級＋than。'],
    ['More and (   ) people are using smartphones.', 'more', ['most', 'much', 'many'], '比較級 and 比較級＝「ますます〜」。'],
    ['This is the (   ) movie I have ever seen.', 'best', ['better', 'good', 'most'], 'the 最上級＋I have ever 過去分詞。good の最上級は best。'],
    ['She is not so much a singer (   ) an actress.', 'as', ['than', 'but', 'so'], 'not so much A as B＝「A というよりむしろ B」。'],
    ['Which do you like (   ), summer or winter?', 'better', ['more', 'best', 'well'], '2つを比べて「どちらが好き?」は like better。'],
    ['Come back as early as you (   ).', 'can', ['are', 'do', 'will'], 'as 〜 as S can＝「できるだけ〜」。'],
    ['This question is (   ) more difficult than that one.', 'far', ['very', 'so', 'too'], '比較級の強調は far・much・even。'],
    ['Ken is the (   ) of the two boys.', 'older', ['oldest', 'old', 'more old'], 'the 比較級 of the two。'],
    ['This model is superior (   ) the old one.', 'to', ['than', 'from', 'of'], 'superior to＝「〜より優れている」。'],
    ['She prefers tea (   ) coffee.', 'to', ['than', 'from', 'over'], 'prefer A to B。'],
    ['He is as busy as (   ).', 'ever', ['never', 'always', 'usual'], 'as 〜 as ever＝「相変わらず〜」。'],
    ['The climate of Japan is milder than (   ) of Canada.', 'that', ['it', 'this', 'one'], 'the climate のくり返しを that で受ける。'],
    ['The prices of vegetables are higher than (   ) of last year.', 'those', ['that', 'it', 'them'], '複数形(prices)のくり返しは those。'],
    ['She is by (   ) the fastest runner in our school.', 'far', ['very', 'much more', 'so'], 'by far＋最上級＝「ずば抜けて〜」。'],
    ['Nothing is (   ) precious than time.', 'more', ['most', 'much', 'very'], 'Nothing is 比較級 than A＝「A ほど〜なものはない」。'],
    ['He would be the last person (   ) break a promise.', 'to', ['who', 'for', 'that'], 'the last person to 〜＝「最も〜しそうにない人」。'],
    ['The (   ) you start, the earlier you will finish.', 'earlier', ['early', 'earliest', 'more early'], 'the 比較級, the 比較級。'],
    ['This lake is one third as (   ) as that one.', 'deep', ['deeper', 'deepest', 'depth'], 'one third as 原級 as＝「〜の3分の1の…」。']
  ]);
})();
