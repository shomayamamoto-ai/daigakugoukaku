/* テキスト拡充・第3弾(担当:中学英語 e_m1〜e_write) */
(function (L) {
  function add(id, o) { var x = L[id]; if (!x) return; if (o.sheet) x.sheet = o.sheet; ['cards', 'think'].forEach(function (k) { if (o[k]) x[k] = (x[k] || []).concat(o[k]); }); }

  add('e_m1', {
    sheet: {
      title: 'be動詞(am・is・are)1ページまとめ',
      blocks: [
        { h: '定義', items: ['be動詞=主語と後ろのことばを「=」でつなぐ動詞', '意味は2つ:「〜です」と「(〜に)いる・ある」', '現在形は am・is・are の3つ'] },
        { h: '主語との組み合わせ', items: ['I → am', 'you・複数(we / they / Ken and Mai)→ are', 'he・she・it・1人/1つのもの → is', '短縮形:I\'m / you\'re / he\'s / it\'s / they\'re'] },
        { h: '否定文・疑問文', items: ['否定:be動詞の後ろに not(is not = isn\'t)', '疑問:be動詞を主語の前へ(Is he 〜?)', '答え:Yes, he is. / No, he isn\'t.(主語は代名詞にかえる)', 'Yes の答えでは短縮しない(×Yes, he\'s.)'] },
        { h: '後ろに来ることば', items: ['名詞(a student)・形容詞(happy)・場所(in the park)', '主語が複数なら名詞も複数形(They are students.)', '形容詞だけなら a はつけない(She is kind.)'] },
        { h: 'まちがえやすい点', items: ['be動詞と一般動詞を同時に使わない(×I am play)', 'my sister は he / she にかえると is', 'This is 〜 の疑問への答えは it を使う'] }
      ],
      key: '【主語を見て am・is・are を決める】。否定は後ろに not、疑問は前に出す、の2つの動きだけで文が作れます。'
    },
    cards: [
      ['I のときの be動詞は?', 'am'],
      ['you のときの be動詞は?', 'are(1人でも are)'],
      ['he・she・it のときの be動詞は?', 'is'],
      ['Ken and I のときの be動詞は?', 'are(2人なので複数)'],
      ['is not の短縮形は?', 'isn\'t'],
      ['are not の短縮形は?', 'aren\'t'],
      ['am not の短縮形はある?', 'ふつう使わない(I\'m not を使う)'],
      ['be動詞の2つの意味は?', '「〜です」と「(〜に)いる・ある」'],
      ['be動詞の疑問文の作り方は?', 'be動詞を主語の前に出す'],
      ['Is your father a doctor? に「はい」で答えると?', 'Yes, he is.'],
      ['Are you hungry? に「いいえ」で答えると?', 'No, I\'m not.'],
      ['Is this your bag? の答えの主語は?', 'it(Yes, it is.)'],
      ['They are 〜 の後ろの名詞の形は?', '複数形(students など)'],
      ['She is a kind. はどこが誤り?', '形容詞だけなら a は不要 → She is kind.'],
      ['「私の本は机の上にある」を英語で?', 'My book is on the desk.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: '留学生の Tom と中学生の Yuki が写真を見ながら話しています。\nTom: Who is this girl?\nYuki: She ( ア ) my cousin, Emi. She is ten.\nTom: Are these dogs hers?\nYuki: No, they ( イ ). They are my dogs. Their names are Pochi and Kuro.\nTom: They ( ウ ) very cute!',
        q: '( ア )〜( ウ )に入る語の組み合わせとして正しいものを選びなさい。',
        choices: ['ア is / イ aren\'t / ウ are', 'ア is / イ isn\'t / ウ is', 'ア are / イ aren\'t / ウ are', 'ア am / イ don\'t / ウ is'],
        a: '①(ア is / イ aren\'t / ウ are)',
        exp: 'アの主語は She なので is。イは Are these dogs 〜? への答えで、these dogs は they にかわり、否定なので aren\'t。ウの主語 They は Pochi と Kuro の2匹を指す複数なので are。be動詞の疑問文には do ではなく be動詞で答えることも確認しましょう。'
      },
      {
        kind: '資料読解',
        ctx: '英語の授業で、生徒が自分の班のメンバーを紹介するカードを書きました。(架空の資料)\n【カード】\nThis is our group. Mika is from Osaka. She is good at tennis. Ryo and Daiki is in the art club. I am the leader of this group. We are all fourteen.\n先生は「1か所だけ be動詞のまちがいがあります」と言いました。',
        q: 'まちがっている部分を見つけ、正しく直しなさい。また、そう判断した理由を書きなさい。',
        a: 'Ryo and Daiki is → Ryo and Daiki are(主語が2人なので複数の are を使う)',
        exp: '各文の主語を確認します。This → is、Mika → is、She → is、I → am、We → are はすべて正しい形です。Ryo and Daiki は and で2人をつないでいるので複数扱いになり、are が正解です。and でつながった主語は、すぐ前の語(Daiki)だけを見て is にしやすいので注意します。'
      }
    ]
  });

  add('e_pres', {
    sheet: {
      title: '一般動詞の現在形(三単現)1ページまとめ',
      blocks: [
        { h: '3人称単数とは', items: ['I・you 以外の「1人・1つ」の主語', 'he / she / it / Ken / my mother / this dog など', 'we・they・Ken and Mai は複数なので s はつけない'] },
        { h: 's のつけ方', items: ['ふつう:s(plays・likes)', 's・x・sh・ch・o で終わる:es(watches・goes)', '子音字+y:y を i にかえて es(studies)', '特別:have → has'] },
        { h: '否定文・疑問文', items: ['否定:does not(doesn\'t)+原形', '疑問:Does + 主語 + 原形 〜?', '答え:Yes, he does. / No, he doesn\'t.', 'does を使ったら動詞は原形にもどす'] },
        { h: '現在形が表すこと', items: ['習慣(毎朝走る)', 'ずっと変わらない状態(東京に住んでいる)', '一般的な事実(太陽は東からのぼる)'] },
        { h: 'まちがえやすい点', items: ['×Does he plays → ○Does he play', 'plays の発音は[z]、watches は[iz]', 'every day・usually などは現在形の合図'] }
      ],
      key: '【主語が3人称単数なら、動詞に s か does のどちらか1回だけ】。s と does を両方つけることはありません。'
    },
    cards: [
      ['3人称単数の主語の例を3つ', 'he・she・it(Ken, my mother なども)'],
      ['play の三単現は?', 'plays'],
      ['study の三単現は?', 'studies(y→i+es)'],
      ['watch の三単現は?', 'watches'],
      ['go の三単現は?', 'goes'],
      ['have の三単現は?', 'has'],
      ['enjoy の三単現は?', 'enjoys(母音字+y は s だけ)'],
      ['三単現の否定文に使う語は?', 'does not(doesn\'t)'],
      ['does not の後ろの動詞の形は?', '原形'],
      ['Does she like dogs? に「はい」で答えると?', 'Yes, she does.'],
      ['We は三単現?', 'いいえ。複数なので s をつけない'],
      ['現在形が表す3つのことは?', '習慣・変わらない状態・一般的な事実'],
      ['「彼は毎朝走る」を英語で?', 'He runs every morning.'],
      ['My brothers play tennis. の s がない理由は?', '主語が複数だから'],
      ['「父は車を持っていない」を英語で?', 'My father doesn\'t have a car.']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: 'ある中学校で、生徒の「平日の朝の習慣」を調べました。(架空の資料)\n【表】\n名前|起きる時刻|朝ごはん|通学\nAya|6:00|bread|walks\nKen|6:30|rice|by bike\nSota|7:00|食べない|by bus\nこの表をもとに、英文を作りました。',
        q: '表の内容に合う英文を1つ選びなさい。',
        choices: ['Aya gets up at six and goes to school by bike.', 'Ken eats rice and goes to school by bike.', 'Sota eat breakfast every day.', 'Aya and Ken gets up at seven.'],
        a: '②(Ken eats rice and goes to school by bike.)',
        exp: '①はAyaは歩いて通学するので誤り。②は表のとおりで、主語 Ken に合わせて eats・goes になっているので正解。③はSotaは朝ごはんを食べないうえ、eat に s がなく文法も誤り。④は2人とも7時ではなく、主語が複数なのに gets も誤りです。内容と形の両方を確かめます。'
      },
      {
        kind: '会話文',
        ctx: 'Mai: My brother likes music very much.\nBob: Does he play the guitar?\nMai: No, he ( ア ). But he ( イ ) the piano every evening.\nBob: Wow. Do you play it, too?\nMai: Yes, I ( ウ ). We sometimes play together.',
        q: '( ア )〜( ウ )に入る語を書きなさい。',
        a: 'ア doesn\'t / イ plays / ウ do',
        exp: 'アは Does he 〜? への答えで「いいえ」なので doesn\'t。イは主語 he で、every evening(毎晩)という習慣を表すので三単現の plays。ウは Do you 〜? に I で答えるので do を使います。疑問文で使った助動詞(do / does)を、答えでもそのまま使うのがルールです。'
      }
    ]
  });

  add('e_prog', {
    sheet: {
      title: '現在進行形 1ページまとめ',
      blocks: [
        { h: '形', items: ['be動詞(am / is / are)+ 動詞の ing 形', '意味:(今)〜しているところだ', '主語に合わせて be動詞を選ぶ'] },
        { h: 'ing 形の作り方', items: ['ふつう:ing(play → playing)', 'e で終わる:e をとって ing(make → making)', '短母音+子音字:子音字を重ねる(run → running / swim → swimming)', 'ie で終わる:ie → y+ing(lie → lying)'] },
        { h: '否定文・疑問文', items: ['否定:be動詞+not+ing(I\'m not watching TV.)', '疑問:be動詞を前に(Are you studying?)', '答え:Yes, I am. / No, I\'m not.', '疑問詞:What are you doing?(何をしているの?)'] },
        { h: '現在形とのちがい', items: ['現在形=いつもすること(習慣)', '進行形=今まさに途中のこと', '合図:now / Look! / Listen! は進行形'] },
        { h: '進行形にしない動詞', items: ['状態を表す動詞:know・like・want・have(持っている)', '感覚:see・hear(自然に見える・聞こえる)', 'have が「食べる」の意味なら進行形にできる(having lunch)'] }
      ],
      key: '【be動詞+ing】の2点セット。どちらか一方が欠けると文になりません。like・know などの「状態」は進行形にしません。'
    },
    cards: [
      ['現在進行形の形は?', 'be動詞+動詞の ing 形'],
      ['make の ing 形は?', 'making'],
      ['run の ing 形は?', 'running'],
      ['swim の ing 形は?', 'swimming'],
      ['sit の ing 形は?', 'sitting'],
      ['write の ing 形は?', 'writing'],
      ['lie(横になる)の ing 形は?', 'lying'],
      ['進行形の合図になる語を2つ', 'now・Look! など'],
      ['「何をしているの?」を英語で?', 'What are you doing?'],
      ['Is he sleeping? に「いいえ」で答えると?', 'No, he isn\'t.'],
      ['進行形にしない動詞の例を3つ', 'know・like・want など'],
      ['×I am knowing him. を直すと?', 'I know him.'],
      ['have を進行形にできるのはどんな意味のとき?', '「食べる・過ごす」の意味のとき'],
      ['習慣を表すのは現在形と進行形のどちら?', '現在形'],
      ['「私は今テレビを見ていない」を英語で?', 'I\'m not watching TV now.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'Kenta が電話で友だちの Lisa と話しています。\nLisa: Hi, Kenta. What are you doing now?\nKenta: I ( ア ) my homework. It\'s very difficult.\nLisa: Oh, I see. My mother ( イ ) dinner now, so I can\'t talk long.\nKenta: OK. By the way, I ( ウ ) your brother. He is in my club.',
        q: '( ア )〜( ウ )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['ア am doing / イ is cooking / ウ know', 'ア do / イ cooks / ウ am knowing', 'ア am doing / イ is cooking / ウ am knowing', 'ア doing / イ cooking / ウ know'],
        a: '①(ア am doing / イ is cooking / ウ know)',
        exp: 'アとイは now があり「今している途中」の動作なので be動詞+ing の進行形。ウの know(知っている)は状態を表す動詞なので進行形にせず、現在形のままにします。④は be動詞が抜けているので文になりません。動作か状態かを見分けることがポイントです。'
      },
      {
        kind: '資料読解',
        ctx: '公園のイラストを説明する英文です。(架空の資料)\n【イラストの説明】\n・ベンチで女性が本を読んでいる\n・男の子2人がサッカーをしている\n・犬が木の下で寝ている\n生徒が書いた英文:\nA. A woman is reading a book on the bench.\nB. Two boys are play soccer.\nC. A dog is sleeping under the tree.',
        q: 'A〜C のうち、文法的に誤っているものを選び、正しく直しなさい。',
        a: 'B:Two boys are playing soccer.(be動詞の後ろは ing 形にする)',
        exp: 'A は主語 A woman に is、reading で正しい形です。C も A dog に is、sleeping で正しい形です。B は主語が Two boys(複数)なので are は正しいですが、その後ろが原形 play のままです。進行形は be動詞と ing 形の両方がそろって初めて成り立つので、playing に直します。'
      }
    ]
  });

  add('e_can', {
    sheet: {
      title: 'can・命令文 1ページまとめ',
      blocks: [
        { h: 'can の基本', items: ['can+動詞の原形=〜できる', '主語が何でも can の形は変わらない(×cans)', '否定:cannot / can\'t+原形', '疑問:Can+主語+原形 〜? → Yes, 〜 can. / No, 〜 can\'t.'] },
        { h: '会話の can', items: ['Can you 〜?=〜してくれませんか(依頼)', 'Can I 〜?=〜してもいいですか(許可)', '答え方:Sure. / OK. / Sorry, I can\'t.', 'Could you 〜? はよりていねいな依頼'] },
        { h: '命令文', items: ['主語をはぶき、動詞の原形で始める(Open the door.)', 'be動詞なら Be で始める(Be quiet.)', 'Please をつけるとていねい(Please sit down.)'] },
        { h: '否定命令・誘い', items: ['Don\'t+原形=〜するな(Don\'t run here.)', 'Don\'t be 〜=〜してはいけない(Don\'t be late.)', 'Let\'s+原形=〜しよう → Yes, let\'s. / No, let\'s not.'] },
        { h: '書きかえ', items: ['can = be able to(He is able to swim.)', 'can の過去 = could / was able to', '未来の「できるだろう」= will be able to'] }
      ],
      key: '【can の後ろも、命令文の最初も、動詞は原形】。Can you は「お願い」、Can I は「許可」と区別しましょう。'
    },
    cards: [
      ['can の後ろの動詞の形は?', '原形'],
      ['can not を1語で書くと?', 'cannot'],
      ['Can you swim? に「はい」で答えると?', 'Yes, I can.'],
      ['Can you 〜? の会話での意味は?', '〜してくれませんか(依頼)'],
      ['Can I 〜? の意味は?', '〜してもいいですか(許可)'],
      ['依頼をていねいにする言い方は?', 'Could you 〜?'],
      ['命令文は何で始める?', '動詞の原形(主語をはぶく)'],
      ['「静かにしなさい」を英語で?', 'Be quiet.'],
      ['「ここで走ってはいけない」を英語で?', 'Don\'t run here.'],
      ['「〜しよう」と誘う表現は?', 'Let\'s+原形'],
      ['Let\'s 〜. に断るときの答えは?', 'No, let\'s not.'],
      ['can と同じ意味の3語の表現は?', 'be able to'],
      ['can の過去形は?', 'could'],
      ['「〜できるだろう」(未来)は?', 'will be able to+原形'],
      ['「遅れてはいけない」を英語で?', 'Don\'t be late.']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '市立図書館の入口に、次の英語の掲示がありました。(架空の資料)\n【City Library Rules】\n・You can borrow five books for two weeks.\n・Don\'t eat or drink in the library.\n・You can use the computers for 30 minutes.\n・Please be quiet. You can talk in the Lounge.',
        q: 'この掲示の内容に合うものを1つ選びなさい。',
        choices: ['図書館の中ならどこで飲み物を飲んでもよい。', '本は一度に5冊まで、2週間借りられる。', 'コンピューターは1時間使える。', '図書館では話すことはまったくできない。'],
        a: '②(本は一度に5冊まで、2週間借りられる。)',
        exp: '1行目の can borrow five books for two weeks が②と一致します。①は Don\'t eat or drink(飲食禁止)に反します。③は30 minutes(30分)なので誤り。④は You can talk in the Lounge とあり、ラウンジでは話せるので誤りです。can(できる)と Don\'t(禁止)を区別して読むのがポイントです。'
      },
      {
        kind: '会話文',
        ctx: '放課後の教室で、Saki と ALT の Ms. Green が話しています。\nSaki: Ms. Green, ( ア ) I use this dictionary?\nMs. Green: Sure. Here you are.\nSaki: Thank you. And ( イ ) you help me with my speech? It\'s for the contest.\nMs. Green: Of course. ( ウ ) practice together after school tomorrow.\nSaki: Yes, ( エ ).',
        q: '( ア )〜( エ )に入る語として正しい組み合わせを選びなさい。',
        choices: ['ア Can / イ Can / ウ Let\'s / エ let\'s', 'ア Do / イ Are / ウ Let\'s / エ I do', 'ア Can / イ Do / ウ Please / エ I can', 'ア May / イ Let\'s / ウ Can / エ let\'s'],
        a: '①(ア Can / イ Can / ウ Let\'s / エ let\'s)',
        exp: 'アは Sure. Here you are.(どうぞ)と答えているので「使ってもいいですか」=Can I。イは手伝いを頼むので「〜してくれませんか」=Can you。ウは「いっしょに練習しよう」という誘いなので Let\'s、エはそれに賛成する Yes, let\'s. です。相手の返事から、許可・依頼・誘いのどれかを判断します。'
      }
    ]
  });

  add('e_wh', {
    sheet: {
      title: '疑問詞の疑問文 1ページまとめ',
      blocks: [
        { h: '疑問詞の種類', items: ['what=何 / who=だれ / whose=だれの / which=どちら', 'where=どこ / when=いつ / why=なぜ / how=どのように', '答えは Yes / No ではなく、具体的な内容'] },
        { h: '語順のルール', items: ['疑問詞+ふつうの疑問文の形', 'What do you have? / Where is he?', '疑問詞+名詞はひとかたまり(What sport do you like?)', '疑問詞が主語なら、後ろはふつうの文の形(Who cooks lunch?)'] },
        { h: 'How のかたまり', items: ['How many+複数名詞=いくつ', 'How much=いくら', 'How old=何歳 / How long=どのくらい(長さ・期間)', 'How often=どのくらいの頻度 / How far=どのくらいの距離'] },
        { h: 'What のかたまり', items: ['What time=何時', 'What day=何曜日 / What\'s the date=何日', 'What is 〜 like?=〜はどんな様子?'] },
        { h: '答え方のコツ', items: ['Why → Because 〜.(理由)/ To 〜.(目的)', 'Who cooks? → My mother does.', 'Whose bag? → It\'s mine.'] }
      ],
      key: '【疑問詞を文の先頭に置き、残りはふつうの疑問文】。疑問詞が主語のときだけ、do / does を使いません。'
    },
    cards: [
      ['「だれの」をたずねる疑問詞は?', 'whose'],
      ['「どちら」をたずねる疑問詞は?', 'which'],
      ['「いくつ」は?', 'How many+複数名詞'],
      ['値段をたずねる表現は?', 'How much 〜?'],
      ['期間・長さをたずねる表現は?', 'How long 〜?'],
      ['頻度をたずねる表現は?', 'How often 〜?'],
      ['距離をたずねる表現は?', 'How far 〜?'],
      ['曜日をたずねる表現は?', 'What day is it today?'],
      ['「天気はどう?」を英語で2通り', 'How is the weather? / What is the weather like?'],
      ['Why 〜? に理由で答えるときの語は?', 'Because'],
      ['Who plays the piano? に「姉です」と答えると?', 'My sister does.'],
      ['疑問詞が主語のとき do を使う?', '使わない(Who knows? など)'],
      ['「何のスポーツが好き?」を英語で?', 'What sport do you like?'],
      ['What is Kyoto like? の意味は?', '京都はどんなところですか'],
      ['「どこの出身?」を英語で?', 'Where are you from?']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'Jim と Nana が週末の予定について話しています。\nJim: ( A ) are you going to do this Sunday?\nNana: I\'m going to visit my grandmother.\nJim: ( B ) does she live?\nNana: In Nara. I go there by train.\nJim: ( C ) does it take?\nNana: About one hour.\nJim: ( D ) do you visit her?\nNana: Once a month.',
        q: '( A )〜( D )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['A What / B Where / C How long / D How often', 'A What / B Where / C How far / D When', 'A How / B Which / C How long / D How many', 'A What / B When / C How much / D How often'],
        a: '①(A What / B Where / C How long / D How often)',
        exp: '答えから逆算します。A は予定の中身(祖母を訪ねる)を答えているので What。B は In Nara と場所を答えているので Where。C は About one hour と時間の長さなので How long(How far は距離)。D は Once a month(月に1回)と頻度を答えているので How often です。'
      },
      {
        kind: '資料読解',
        ctx: '学校の文化祭のポスターです。(架空の資料)\n【School Festival】\nDate: October 15 (Saturday)\nTime: 9:30 a.m. − 3:00 p.m.\nPlace: Midori Junior High School\nTicket: Free\nEvent: Chorus contest in the gym at 1:00 p.m.\n留学生の Emma がこのポスターを見て、質問を英語で書こうとしています。',
        q: '「合唱コンクールはどこで行われますか」という意味の英文を、疑問詞を使って書きなさい。また、ポスターをもとにその答えも英語で書きなさい。',
        a: '問い:Where is the chorus contest? / 答え:It is in the gym.(It\'s held in the gym. なども可)',
        exp: '場所をたずねるので疑問詞は Where を使い、後ろは be動詞の疑問文の形(is the chorus contest)にします。ポスターの Event の行に in the gym とあるので、答えは It is in the gym. です。時刻をたずねるなら What time、日付なら When を使うなど、知りたい情報に合わせて疑問詞を選びます。'
      }
    ]
  });

})(WPS.LESSONS);
