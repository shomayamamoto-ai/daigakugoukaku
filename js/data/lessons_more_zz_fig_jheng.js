/* 図解・第2弾(担当:jheng) */
(function (L) {
  function put(id, idx, key, val) { var x = L[id]; if (!x || !x.secs[idx]) return; var s = x.secs[idx]; if (s.fig || s.flow || s.tmap || s.chain) return; s[key] = val; }

  // ---------- e_m1 ----------
  put('e_m1', 6, 'flow', { title: 'be動詞の後ろに来る3種類', cols: 3, rows: [
    [['名詞', 'b'], ['形容詞', 'gr'], ['場所を表すことば', 'o']],
    [['a student・my sister', 'b', 1, 'She is my sister.'], ['happy・tall', 'gr', 1, 'She is happy.(× She happy.)'], ['in the room・here', 'o', 1, 'He is in the room.']],
    [['主語 = 名詞', 'k', 1, 'イコールの関係'], ['主語 = ようす', 'k', 1, 'イコールの関係'], ['〜にいる・ある', 'k', 1, 'There is / are 〜 でも表せる']]
  ] });
  put('e_m1', 8, 'flow', { title: 'be動詞の後ろ:名詞か形容詞か', cols: 3, head: ['後ろの語', '主語が単数', '主語が複数'], rows: [
    [['名詞', 'b', 1, 'a・an/複数形で数をそろえる'], ['I am a student.', 'g'], ['We are students.', 'g', 1, '× We are student.']],
    [['形容詞', 'gr', 1, 'a も s もつけない'], ['She is kind.', 'g', 1, '× She is a kind.'], ['They are kind.', 'g', 1, '× They are kinds.']],
    [['形容詞 + 名詞', 'o', 1, 'a は形容詞の前'], ['She is a kind girl.', 'g'], ['They are kind girls.', 'g']],
    [['a か an かは「すぐ後ろの語の最初の音」で決める', 'r', 3, 'an old car・an hour / a new car・a uniform']]
  ] });

  // ---------- e_pres ----------
  put('e_pres', 5, 'flow', { title: '三単現の s の発音は3通り', cols: 3, rows: [
    [['/s/(ス)', 'b'], ['/z/(ズ)', 'gr'], ['/iz/(イズ)', 'r']],
    [['likes・stops', 'b'], ['plays・goes', 'gr'], ['watches・washes・uses', 'r', 1, 'es がつく語・se で終わる語の多く']],
    [['Does she like music? — s は does に移り、後ろの動詞は原形にもどる', 'k', 3, 's は1つの文に1回だけ']]
  ] });
  put('e_pres', 7, 'flow', { title: '「〜している」は現在形か進行形か', cols: 2, head: ['ふだんからそう → 現在形', '今この瞬間だけ → 進行形'], rows: [
    [['My father works at a hospital.', 'b', 1, '父は病院で働いています'], ['He is reading the newspaper.', 'r', 1, '新聞を読んでいるところです']],
    [['What does your father do?', 'b', 1, 'お父さんのお仕事は何ですか'], ['What is your father doing?', 'r', 1, 'お父さんは今何をしていますか']],
    [['I live in Osaka. / He knows my sister.', 'b', 1, '住んでいる・知っている(状態)'], ['今だけの動作', 'r', 1, 'be動詞 + ing形']]
  ] });

  // ---------- e_prog ----------
  put('e_prog', 5, 'flow', { title: '進行形にできるか:動作か状態か', cols: 2, head: ['状態(ふつう進行形にしない)', '動作・一時的(進行形にできる)'], rows: [
    [['know・like・want・have(持っている)', 'k'], ['have(食べる)', 'r', 1, 'I am having lunch.']],
    [['I know him.', 'k', 1, '× I am knowing him.'], ['一時的なようす', 'r', 1, 'I am living with my aunt this month.']],
    [['I live in Tokyo.', 'b', 1, 'ふだん住んでいる'], ['I am reading a book.', 'r', 1, '動作の途中']]
  ] });
  put('e_prog', 7, 'flow', { title: '「見る」「聞く」の2つのタイプ', cols: 3, head: ['', '見る', '聞く'], rows: [
    [['自分から意識して(動作)', 'r', 1, '進行形にできる'], ['look at・watch', 'r'], ['listen to', 'r']],
    [['自然に入ってくる(状態)', 'b', 1, 'ふつう進行形にしない'], ['see(〜が見える)', 'b'], ['hear(〜が聞こえる)', 'b']],
    [['例', 'k'], ['They are watching a soccer game.', 'g'], ['I can hear a bird.', 'g', 1, '× I am hearing a bird.']]
  ] });

  // ---------- e_can ----------
  put('e_can', 5, 'flow', { title: 'can の3つの意味と be able to', cols: 3, rows: [
    [['能力', 'b', 1, '〜できる'], ['許可', 'gr', 1, '〜してもいい'], ['依頼', 'o', 1, '〜してくれる']],
    [['She can swim.', 'b', 1, '= She is able to swim.'], ['Can I use this pen?', 'gr'], ['Can you help me?', 'o']],
    [['助動詞は2つ並べない:× will can → ○ will be able to', 'r', 3, 'You will be able to ski next winter.']]
  ] });
  put('e_can', 7, 'flow', { title: 'can の「時」の表し方', cols: 3, head: ['現在', '過去', '未来'], rows: [
    [['can', 'b'], ['could', 'b', 1, 'I could swim when I was five.'], ['× will can', 'k']],
    [['am・is・are able to', 'gr'], ['was・were able to', 'gr'], ['will be able to', 'gr']],
    [['1回だけ実際にやりとげた → was able to が自然', 'r', 3, 'I was able to catch the last train.(否定なら couldn\'t でもよい)']]
  ] });

  // ---------- e_wh ----------
  put('e_wh', 7, 'flow', { title: '答えの情報から疑問詞を決める', cols: 3, rows: [
    [['What time', 'b', 1, '時刻'], ['When', 'b', 1, '日付・時'], ['Where', 'b', 1, '場所']],
    [['How', 'r', 1, '手段(By bus.)'], ['Why', 'r', 1, '理由(Because 〜.)'], ['How many + 複数名詞', 'r', 1, '数(Two.)']],
    [['How much', 'gr', 1, '値段'], ['How long', 'gr', 1, '期間(For two hours.)'], ['How often', 'gr', 1, '回数(Three times a week.)']],
    [['次に時と主語を合わせる:過去 → did / 3人称単数 → does / be動詞の文 → be動詞', 'k', 3]]
  ] });
  put('e_wh', 8, 'flow', { title: '前置詞が残る疑問文と What is 〜 like?', cols: 2, rows: [
    [['What are you looking for?', 'b', 1, '← look for your key'], ['Who is she talking with?', 'b', 1, '← talk with Ken']],
    [['疑問詞だけ前に出し、前置詞はもとの場所に残す', 'k', 2]],
    [['What is your new teacher like?', 'r', 1, 'どんな人?(like は「〜のような」)— She is kind.'], ['What do you like?', 'gr', 1, '何が好き?(do がある・like は動詞)']]
  ] });

  // ---------- e_m2 ----------
  put('e_m2', 6, 'flow', { title: '規則動詞の -ed の発音は3通り', cols: 3, rows: [
    [['/id/(イド)', 'r'], ['/t/(ト)', 'b'], ['/d/(ド)', 'gr']],
    [['t・d の音で終わる', 'r'], ['k・p・s・ch・sh などにごらない音', 'b'], ['にごる音・母音で終わる', 'gr']],
    [['wanted・needed・visited', 'r'], ['looked・stopped・watched', 'b'], ['played・lived・used', 'gr']]
  ] });
  put('e_m2', 8, 'flow', { title: 'ago・before・then のちがい', cols: 3, rows: [
    [['ago', 'b'], ['before', 'gr'], ['then', 'o']],
    [['(今から)〜前に', 'b', 1, '期間の語の後ろ・過去形と'], ['以前に', 'gr', 1, 'ふつう単独で使う'], ['そのとき/それから', 'o', 1, '2つの意味']],
    [['I visited Nara three years ago.', 'b'], ['I have seen this movie before.', 'gr'], ['I was in Tokyo then.', 'o', 1, 'Then I went shopping.']]
  ] });

  // ---------- e_pprog ----------
  put('e_pprog', 5, 'flow', { title: '背景は過去進行形、できごとは過去形', cols: 2, rows: [
    [['When I came home, …', 'k', 2, '「帰った」は点(過去形)']],
    [['my sister was cooking dinner.', 'r', 1, '帰ったとき、作っている途中だった'], ['my sister cooked dinner.', 'b', 1, '帰ってから作った(順番に起きた)']],
    [['While I was walking in the park,', 'r', 1, '長く続く背景(線)'], ['I met Ken.', 'b', 1, '短いできごと(点)']]
  ] });
  put('e_pprog', 7, 'flow', { title: '終わったかどうか', cols: 2, rows: [
    [['I wrote a letter.', 'b', 1, '過去形'], ['I was writing a letter.', 'r', 1, '過去進行形']],
    [['書き終えたことをふくむ', 'b'], ['書いている途中(終えたかは不明)', 'r']],
    [['× I wrote a letter, but I didn\'t finish it.', 'k', 1, '意味がぶつかる'], ['○ I was writing a letter, but I didn\'t finish it.', 'gr']]
  ] });

  // ---------- e_fut ----------
  put('e_fut', 6, 'flow', { title: '未来を表す4つの形', cols: 4, rows: [
    [['will', 'r'], ['be going to', 'b'], ['現在進行形', 'gr'], ['現在形', 'o']],
    [['その場で決めた意思・予想', 'r'], ['前からの予定・今のようすからの予想', 'b'], ['準備が進んでいる近い予定', 'gr'], ['時刻表・予定表で決まっていること', 'o']],
    [['I\'ll get it.', 'r'], ['It\'s going to rain.', 'b'], ['I\'m leaving for Osaka tomorrow.', 'gr'], ['The train leaves at 7:10.', 'o']]
  ] });
  put('e_fut', 8, 'flow', { title: '時刻表の現在形と was going to', cols: 2, rows: [
    [['時刻表の現在形', 'o', 1, '決まりとして述べる'], ['was・were going to', 'k', 1, '〜するつもりだった']],
    [['Our school festival starts on October 5.', 'o', 1, '3人称単数なら s'], ['I was going to call you, but I forgot.', 'k', 1, 'つもりだったが、しなかった']]
  ] });

  // ---------- e_m3 ----------
  put('e_m3', 6, 'flow', { title: '1つの助動詞に2つの意味', cols: 3, rows: [
    [['must', 'r'], ['義務:〜しなければならない', 'b', 1, 'You must go.'], ['確信:〜にちがいない', 'gr', 1, 'He must be tired.']],
    [['may', 'r'], ['許可:〜してもよい', 'b', 1, 'May I 〜?'], ['推量:〜かもしれない', 'gr', 1, 'It may rain.']],
    [['must の過去・未来', 'k'], ['had to', 'o'], ['will have to', 'o']]
  ] });
  put('e_m3', 8, 'flow', { title: '推量の強さ(強い → 弱い)', cols: 3, rows: [
    [['must', 'r', 1, '〜にちがいない(ほぼ確実)'], ['will', 'o', 1, '〜だろう(かなり確か)'], ['may', 'g', 1, '〜かもしれない(半分くらい)']],
    [['He must be tired.', 'r', 1, '根拠:一日中働いた'], ['Ken will come soon.', 'o'], ['She may be at home.', 'g']],
    [['〜のはずがない', 'k'], ['can\'t(must not ではない)', 'b', 2, 'That can\'t be true.(must not は禁止)']]
  ] });

  // ---------- e_m4 ----------
  put('e_m4', 6, 'flow', { title: '不定詞の広がり', cols: 2, rows: [
    [['a house to live in', 'b', 1, '← live in a house(in が必要)'], ['something cold to drink', 'b', 1, 'something + 形容詞 + to 〜']],
    [['副詞的用法:目的', 'gr', 1, '〜するために'], ['副詞的用法:感情の原因', 'o', 1, '〜して']],
    [['I went to the park to play tennis.', 'gr'], ['I\'m glad to see you.', 'o', 1, 'She was surprised to hear the news.']]
  ] });
  put('e_m4', 8, 'flow', { title: '形容詞的用法:名詞を動詞のどこに入れるか', cols: 3, rows: [
    [['名詞が主語', 'b'], ['名詞が目的語', 'gr'], ['名詞が前置詞の後ろ', 'r']],
    [['a friend to help me', 'b'], ['a book to read', 'gr'], ['a chair to sit on', 'r']],
    [['← a friend helps me', 'k'], ['← read a book', 'k'], ['← sit on a chair', 'k']],
    [['the first person to climb the mountain', 'b'], ['something to eat', 'gr'], ['something to write with', 'r', 1, '← write with a pen']]
  ] });

  // ---------- e_ger ----------
  put('e_ger', 5, 'flow', { title: 'remember の後ろで意味が変わる', cols: 2, head: ['〜ing(すでにしたこと)', 'to 〜(これからすること)'], rows: [
    [['remember 〜ing', 'b', 1, '〜したことを覚えている'], ['remember to 〜', 'r', 1, '忘れずに〜する']],
    [['I remember meeting him.', 'b'], ['Remember to call me.', 'r']],
    [['前置詞の後ろは動名詞:look forward to seeing you', 'k', 2, 'Thank you for helping me. / good at singing']]
  ] });
  put('e_ger', 7, 'flow', { title: 'forget と try も意味が変わる', cols: 2, head: ['to 〜(これから向かうこと)', '〜ing(実際にしたこと)'], rows: [
    [['forget to 〜', 'r', 1, '〜するのを忘れる(=しなかった)'], ['forget 〜ing', 'b', 1, '〜したことを忘れる']],
    [['I forgot to call her.', 'r'], ['I\'ll never forget visiting Kyoto.', 'b']],
    [['try to 〜', 'r', 1, '〜しようと努力する'], ['try 〜ing', 'b', 1, '試しに〜してみる']],
    [['I tried to open the window, but I couldn\'t.', 'r'], ['Try adding some sugar.', 'b']]
  ] });

  // ---------- e_m5 ----------
  put('e_m5', 6, 'flow', { title: '比べる範囲と強め方', cols: 2, rows: [
    [['in + 場所・集団(単数)', 'b', 1, 'in my class・in Japan'], ['of + 複数・数', 'gr', 1, 'of the three・of all']],
    [['ずっと〜(比較級)', 'k'], ['much taller', 'r', 1, '× very taller']],
    [['最も〜なものの1つ', 'k'], ['one of the largest cities', 'r', 1, '名詞は複数形']],
    [['〜の2倍', 'k'], ['twice as large as 〜', 'r']]
  ] });
  put('e_m5', 8, 'flow', { title: '比べるものをそろえる・答え方', cols: 2, rows: [
    [['× My bag is bigger than you.', 'k', 1, 'かばんと人を比べている'], ['○ My bag is bigger than yours.', 'gr', 1, 'かばん同士を比べる']],
    [['Who runs faster, Ken or Tom?', 'b', 1, '一般動詞の文'], ['— Tom does.', 'r', 1, 'does で受ける']],
    [['Who is the tallest in your family?', 'b', 1, 'be動詞の文'], ['— My father is.', 'r', 1, 'is で受ける']]
  ] });

  // ---------- e_m6 ----------
  put('e_m6', 6, 'flow', { title: 'by 以外の前置詞と結びつく受動態', cols: 2, rows: [
    [['be known to 〜', 'b'], ['〜に知られている', 'k']],
    [['be covered with 〜', 'b'], ['〜でおおわれている', 'k']],
    [['be interested in 〜', 'b'], ['〜に興味がある', 'k']],
    [['be surprised at 〜', 'b'], ['〜におどろく', 'k']],
    [['be made of 〜', 'r', 1, '見て材料が分かる:made of wood'], ['be made from 〜', 'gr', 1, '原料の形が変わる:made from milk']]
  ] });
  put('e_m6', 8, 'flow', { title: '目的語が2つに見える文の受動態', cols: 2, head: ['能動態', '受動態'], rows: [
    [['We call this dog Shiro.', 'b'], ['This dog is called Shiro.', 'r', 1, '× Shiro is called this dog.']],
    [['My aunt gave me this watch.', 'b', 2, '人・ものの2つを主語にできる']],
    [['I was given this watch by my aunt.', 'r', 1, '人が主語'], ['This watch was given to me by my aunt.', 'r', 1, 'ものが主語(人の前に to)']],
    [['A foreigner spoke to me.', 'b'], ['I was spoken to by a foreigner.', 'r', 1, 'to と by が並ぶ']]
  ] });

  // ---------- e_conj ----------
  put('e_conj', 6, 'flow', { title: '対等につなぐか、主と従でつなぐか', cols: 2, rows: [
    [['and・but・or・so', 'b', 1, '対等につなぐ'], ['when・if・because・that', 'r', 1, '主と従でつなぐ']],
    [['どちらの文も独立して成り立つ', 'b'], ['中心の文の一部(時・条件・理由・内容)になる', 'r', 1, 'Because it was cold. だけでは文として完成しない']],
    [['命令文, and 〜', 'gr', 1, 'Hurry up, and you\'ll catch the bus.(そうすれば)'], ['命令文, or 〜', 'o', 1, 'Hurry up, or you\'ll be late.(さもないと)']]
  ] });
  put('e_conj', 8, 'flow', { title: 'ペアで使う接続詞と動詞の形', cols: 3, head: ['形', '意味', '主語のときの動詞'], rows: [
    [['both A and B', 'b'], ['A も B も', 'k'], ['複数あつかい', 'r', 1, 'Both Ken and Tom are 〜']],
    [['either A or B', 'b'], ['A か B のどちらか', 'k'], ['B に合わせる', 'r', 1, 'Either you or Ken has to go.']],
    [['not only A but also B', 'b'], ['A だけでなく B も', 'k'], ['B に合わせる', 'r']],
    [['not A but B', 'b'], ['A ではなく B', 'k'], ['B に合わせる', 'r']],
    [['A と B には同じ種類の語(名詞なら名詞、動詞なら動詞)を置く', 'gr', 3]]
  ] });

  // ---------- e_m7 ----------
  put('e_m7', 6, 'flow', { title: '現在完了といっしょに使える語・使えない語', cols: 2, head: ['○ 現在完了と使える', '× 使えない(過去形を使う)'], rows: [
    [['for three years', 'b', 1, 'for = 期間'], ['yesterday・last 〜', 'k']],
    [['since 2020・since I was a child', 'b', 1, 'since = 起点'], ['three years ago', 'k']],
    [['just・already・yet・ever・never', 'b'], ['When 〜?・just now', 'k']],
    [['I have lost my key.', 'r', 1, 'なくして今もない'], ['I lost my key.', 'k', 1, 'なくした(過去の事実だけ)']]
  ] });
  put('e_m7', 8, 'flow', { title: '「〜してから3年になる」の言い方', cols: 3, rows: [
    [['過去形', 'k'], ['My grandfather died three years ago.', 'b', 2, '「いつ」亡くなったかを言う']],
    [['現在完了', 'k'], ['My grandfather has been dead for three years.', 'b', 2, 'dead(死んでいる)という状態が続く']],
    [['It has been 〜 since …', 'k'], ['It has been three years since my grandfather died.', 'b', 2, 'since の後ろは過去形の文']],
    [['× He has died for three years.', 'r', 3, 'die は一瞬の動作なので、継続の現在完了にできない']]
  ] });

  // ---------- e_pperfprog ----------
  put('e_pperfprog', 7, 'chain', { title: '2つの文を現在完了進行形にまとめる', items: [
    ['もとの文1', 'I started studying two hours ago.', '〜前に始めた'],
    ['もとの文2', 'I am still studying.', '今もまだしている'],
    ['for か since か', 'two hours ago → for two hours', 'at one(1時に)なら since one'],
    ['完成', 'I have been studying for two hours.', 'been をぬかさない・3人称単数なら has']
  ] });
  put('e_pperfprog', 8, 'flow', { title: '時間の長さか、結果の量か', cols: 2, head: ['時間の長さ → 現在完了進行形', 'いくつ・何回 → 現在完了'], rows: [
    [['I have been writing letters since this morning.', 'r'], ['I have written five letters so far.', 'b', 1, '× have been writing five letters']],
    [['How long have you been reading this book?', 'r', 1, '— For two hours.'], ['How many pages have you read?', 'b', 1, '— About 80 pages.']],
    [['まだ終わっていない感じ', 'r', 1, 'I have been painting the wall.'], ['終えた感じ', 'b', 1, 'I have painted the wall.']]
  ] });

  // ---------- e_partm ----------
  put('e_partm', 6, 'flow', { title: '分詞は関係代名詞 + be動詞の省略', cols: 2, rows: [
    [['the boy playing tennis', 'r'], ['= the boy who is playing tennis', 'k']],
    [['a car made in Japan', 'b'], ['= a car which(that)was made in Japan', 'k']],
    [['exciting', 'r', 1, '(人を)わくわくさせる:The game was exciting.'], ['excited', 'b', 1, '(人が)わくわくした:We were excited.']]
  ] });
  put('e_partm', 8, 'flow', { title: '「している途中」と「されて(して)しまった結果」', cols: 2, head: ['現在分詞:途中', '過去分詞:結果'], rows: [
    [['boiling water', 'r', 1, '沸騰している湯'], ['boiled eggs', 'b', 1, 'ゆでた卵']],
    [['a falling leaf', 'r', 1, '落ちていく葉'], ['fallen leaves', 'b', 1, '落ち葉(落ちてしまった葉)']],
    [['a developing country', 'r', 1, '発展途上国'], ['a developed country', 'b', 1, '先進国']],
    [['並べる順:分詞 → 目的語 → 場所・方法 → 時', 'k', 2, 'the letter written in English by Tom last week']]
  ] });

  // ---------- e_m8 ----------
  put('e_m8', 6, 'flow', { title: '関係代名詞のよくあるまちがい', cols: 2, rows: [
    [['a friend who lives in Canada', 'b', 1, '先行詞が単数 → s'], ['friends who live in Canada', 'b', 1, '先行詞が複数 → s なし']],
    [['× the picture that my father took it', 'k', 1, 'ぬけた所に it を入れない'], ['○ the picture (that) my father took', 'gr', 1, 'took の目的語がぬけている']],
    [['that がよく使われる:最上級・the first・the only・all・every がつくとき', 'r', 2, 'the best movie that I have ever seen']]
  ] });
  put('e_m8', 8, 'flow', { title: '前置詞が後ろに残る関係代名詞', cols: 2, rows: [
    [['the house (which) I live in', 'b'], ['← live in the house', 'k']],
    [['the girl (who) I talked with', 'b'], ['← talk with the girl', 'k']],
    [['the music (which) we listened to', 'b'], ['← listen to the music', 'k']],
    [['かたい形:the house in which I live', 'gr', 1, 'この形では that は使えない'], ['関係副詞(高校):the house where I live', 'o']]
  ] });

  // ---------- e_indq ----------
  put('e_indq', 5, 'flow', { title: 'do・does・did の情報を動詞にもどす', cols: 2, head: ['疑問文', '間接疑問(名詞のかたまり)'], rows: [
    [['Where does he live?', 'k'], ['where he lives', 'b', 1, 's がもどる']],
    [['What did you buy?', 'k'], ['what you bought', 'b', 1, '過去形にもどる']],
    [['中心の動詞が過去形', 'k'], ['I didn\'t know where he lived.', 'b', 1, '中も過去形にそろえる']],
    [['Yes・No の疑問文', 'k'], ['I don\'t know if he will come.', 'r', 1, 'if = 〜かどうか']]
  ] });
  put('e_indq', 7, 'flow', { title: '疑問詞 + to 〜 への書きかえ', cols: 2, rows: [
    [['what I should do', 'b'], ['what to do', 'r']],
    [['where I should go', 'b'], ['where to go', 'r']],
    [['how I can get to the station', 'b'], ['how to get to the station', 'r']],
    [['I don\'t know what he should do. は what to do にできない', 'k', 2, '文全体の主語 I と中の主語 he がちがう']],
    [['Is he at home? → I don\'t know if he is at home.', 'gr', 2, '「〜かどうか」の if は未来なら will を使う']]
  ] });

  // ---------- e_vocab_m ----------
  put('e_vocab_m', 6, 'flow', { title: 'セットで覚える語・数えられない名詞', cols: 3, rows: [
    [['take a picture', 'b', 1, '写真をとる'], ['make a mistake', 'b', 1, 'まちがいをする'], ['have a good time', 'b', 1, '楽しい時を過ごす']],
    [['listen to 〜', 'gr'], ['look at 〜', 'gr'], ['wait for 〜', 'gr']],
    [['数えられない名詞:water・money・information・homework・advice', 'r', 3, 'a も s もつけない。「たくさん」は a lot of・much']]
  ] });
  put('e_vocab_m', 8, 'flow', { title: '日本語では同じでも使い分ける語', cols: 3, head: ['語', '中心の意味', '後ろの形'], rows: [
    [['say', 'b'], ['言葉そのものを言う', 'k'], ['say (that) 〜', 'g', 1, '× say me the story']],
    [['tell', 'b'], ['人に情報を伝える', 'k'], ['tell 人 about 〜 / tell 人 to 〜', 'g']],
    [['speak', 'b'], ['言語を話す・声を出す', 'k'], ['speak English / speak to 人', 'g']],
    [['talk', 'b'], ['会話する', 'k'], ['talk with(to)人 / talk about 〜', 'g']],
    [['borrow', 'r'], ['(持ち運べるものを)借りる', 'k'], ['borrow A from 人', 'g']],
    [['lend', 'r'], ['貸す', 'k'], ['lend 人 A / lend A to 人', 'g']],
    [['use', 'r'], ['(その場で)使わせてもらう', 'k'], ['Can I use your bathroom?', 'g']]
  ] });

  // ---------- ex_jh3 ----------
  put('ex_jh3', 6, 'flow', { title: '動詞ごとの型', cols: 3, head: ['動詞', '後ろの型', '例'], rows: [
    [['give', 'r'], ['人 + もの', 'b'], ['give him a book', 'g']],
    [['make', 'r'], ['A + B(A を B にする)', 'b'], ['make her happy', 'g']],
    [['tell', 'r'], ['人 + to 〜', 'b'], ['tell him to come', 'g']],
    [['want', 'r'], ['人 + to 〜', 'b'], ['want you to help me', 'g']],
    [['help', 'r'], ['人 + 動詞の原形', 'b'], ['helped my mother cook dinner', 'g']]
  ] });
  put('ex_jh3', 8, 'flow', { title: '副詞・enough・too の置き場所', cols: 2, rows: [
    [['always・often など頻度', 'r', 1, 'also も同じ位置'], ['一般動詞の前/be動詞・助動詞の後ろ', 'b', 1, 'She often goes 〜. / He is always kind.']],
    [['現在完了のとき', 'r'], ['have と過去分詞の間', 'b', 1, 'I have never seen it.']],
    [['only', 'r'], ['限定する語の直前', 'b', 1, 'I have only 100 yen.']],
    [['enough', 'r'], ['形容詞・副詞の後ろ/名詞の前', 'b', 1, 'old enough to drive / enough money']],
    [['too … to 〜', 'r'], ['too は形容詞・副詞の前', 'b', 1, 'too heavy for me to carry']]
  ] });

  // ---------- e_talk ----------
  put('e_talk', 6, 'flow', { title: 'ていねいな言い方と、答え方に注意する表現', cols: 2, rows: [
    [['Can you 〜? → Could you 〜?', 'b', 1, '過去形でひかえめに'], ['I want 〜. → I\'d like 〜.', 'b', 1, 'I\'d like a cup of tea.']],
    [['Would you like 〜?', 'gr', 1, '〜はいかがですか'], ['Would you like to 〜?', 'gr', 1, '〜しませんか']],
    [['Would you mind 〜ing?', 'r', 1, '引き受ける:No, not at all. / Of course not.'], ['Why don\'t you 〜? / Why don\'t we 〜?', 'o', 1, '〜したらどう?/〜しませんか']]
  ] });
  put('e_talk', 8, 'flow', { title: '否定の疑問文への答え方と「私も」', cols: 2, rows: [
    [['Don\'t you like cats?', 'k', 2, '答えの中身が肯定なら Yes、否定なら No']],
    [['好き → Yes, I do.', 'b', 1, '(いいえ、好きです)'], ['好きでない → No, I don\'t.', 'r', 1, '(はい、好きではありません)']],
    [['I like music.', 'k', 1, '肯定の文に同意'], ['I don\'t like math.', 'k', 1, '否定の文に同意']],
    [['So do I. / Me too.', 'b'], ['Neither do I. / Me neither.', 'r']]
  ] });

  // ---------- e_prep ----------
  put('e_prep', 5, 'flow', { title: '前置詞の中心イメージで考える', cols: 3, head: ['on = 接触', 'in = 囲まれた中', 'at = 点'], rows: [
    [['a clock on the wall', 'b', 1, '横に接していても on'], ['in the box・in Japan', 'gr'], ['at the station', 'o', 1, '駅を地図上の点に']],
    [['on Sunday morning', 'b', 1, '特定の日の朝'], ['in five minutes', 'gr', 1, '(今から)5分たったら'], ['at 7:00', 'o']],
    [['前置詞の後ろ:代名詞は目的格(with me)、動詞は 〜ing(for helping me)', 'k', 3]]
  ] });
  put('e_prep', 7, 'flow', { title: '前置詞が「いる動詞」「いらない動詞」', cols: 2, head: ['前置詞いらない', '前置詞いる'], rows: [
    [['visit Kyoto', 'b', 1, '× visit to'], ['go to school', 'r']],
    [['reach the station', 'b', 1, '× reach to'], ['arrive at the station / get to the station', 'r', 1, '広い地域なら arrive in']],
    [['enter the room', 'b', 1, '× enter into'], ['listen to music・look at 〜', 'r']],
    [['discuss the problem', 'b', 1, '× discuss about'], ['wait for the bus', 'r']],
    [['go home・go there・study abroad', 'gr', 1, 'home・there は副詞'], ['at home', 'o', 1, '「家で」は名詞として at']]
  ] });

  // ---------- e_read ----------
  put('e_read', 5, 'flow', { title: 'よく出る言いかえ', cols: 2, head: ['本文', '選択肢'], rows: [
    [['not easy', 'b'], ['difficult', 'r']],
    [['didn\'t remember', 'b'], ['forgot', 'r']],
    [['twice a week', 'b'], ['two times a week', 'r']],
    [['half of 〜', 'b'], ['50% of 〜', 'r']],
    [['apples, oranges and bananas', 'b'], ['fruit', 'r']],
    [['同じ単語が多いのに主語・時・数・否定が入れかわった選択肢はひっかけ', 'k', 2]]
  ] });
  put('e_read', 7, 'flow', { title: '「事実」と「意見」', cols: 2, head: ['事実(確かめられる)', '意見(筆者の考え)'], rows: [
    [['数字・日付・できごと', 'b'], ['I think 〜 / In my opinion 〜', 'r']],
    [['There are about 1,000 students in our school.', 'b'], ['We should 〜 / It is important to 〜', 'r']],
    [['The festival started in 1990.', 'b'], ['best・better・good・bad など評価の語', 'r']],
    [['意見は段落の最初か最後、But・However の後ろに多い。事実は主張の根拠', 'k', 2]]
  ] });

  // ---------- e_write ----------
  put('e_write', 5, 'flow', { title: '英作文の採点の3つの観点', cols: 3, rows: [
    [['内容', 'b'], ['構成', 'gr'], ['言語', 'o']],
    [['問いに答え、条件を守る', 'b'], ['意見と理由がつながる', 'gr'], ['文法・つづりが正しい', 'o']],
    [['A か B かをはっきり選ぶ', 'b'], ['理由は具体的に(たとえば何?)', 'gr'], ['ミスのない簡単な英語', 'o']]
  ] });
  put('e_write', 7, 'flow', { title: '流れを示すつなぎことば', cols: 2, rows: [
    [['順番', 'b'], ['First, / Second, / Finally,', 'b']],
    [['つけ加え', 'gr'], ['Also, / In addition,', 'gr']],
    [['具体例', 'o'], ['For example,', 'o']],
    [['反対', 'r'], ['However, / But', 'r']],
    [['結果・まとめ', 'k'], ['So / That\'s why', 'k', 1, '最後のまとめに1回くらい']],
    [['つなぎことばの後ろにはコンマ(First, / For example, / However,)', 'g', 2]]
  ] });
})(WPS.LESSONS);
