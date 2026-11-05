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

  add('e_m2', {
    sheet: {
      title: '過去形 1ページまとめ',
      blocks: [
        { h: '規則動詞', items: ['ふつう:ed(played・watched)', 'e で終わる:d だけ(used・liked)', '子音字+y:y→i+ed(studied・tried)', '短母音+子音字:重ねて ed(stopped・planned)'] },
        { h: '-ed の発音', items: ['[t]:asked・washed・helped', '[d]:played・lived・opened', '[id]:wanted・visited・needed(t・d で終わる語)'] },
        { h: '不規則動詞(よく出る)', items: ['go→went / come→came / see→saw', 'eat→ate / have→had / make→made', 'buy→bought / take→took / get→got / read→read(発音[red])'] },
        { h: 'be動詞の過去', items: ['I・3人称単数 → was', 'you・複数 → were', '否定:wasn\'t / weren\'t、疑問:Was he 〜?'] },
        { h: '一般動詞の否定・疑問', items: ['否定:did not(didn\'t)+原形', '疑問:Did+主語+原形 〜? → Yes, 〜 did. / No, 〜 didn\'t.', 'did を使ったら動詞は原形(×Did you went)'] },
        { h: '過去の合図', items: ['yesterday / last 〜 / 〜 ago / then / in 2020', 'ago=今から〜前、before=(その時より)前に'] }
      ],
      key: '【過去は動詞の形を変えるか、did を使うかのどちらか1回】。不規則動詞は「原形→過去形」をセットで声に出して覚えます。'
    },
    cards: [
      ['study の過去形は?', 'studied'],
      ['stop の過去形は?', 'stopped'],
      ['go の過去形は?', 'went'],
      ['buy の過去形は?', 'bought'],
      ['see の過去形は?', 'saw'],
      ['take の過去形は?', 'took'],
      ['read の過去形とその発音は?', 'read(発音は[red])'],
      ['wanted の ed の発音は?', '[id]'],
      ['I・he の be動詞の過去形は?', 'was'],
      ['you・they の be動詞の過去形は?', 'were'],
      ['一般動詞の過去の否定に使う語は?', 'did not(didn\'t)'],
      ['Did you 〜? に「はい」で答えると?', 'Yes, I did.'],
      ['「3日前」を英語で?', 'three days ago'],
      ['「先週」を英語で?', 'last week'],
      ['×Did she came? を直すと?', 'Did she come?(did の後ろは原形)']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: 'Haruto の英語の日記です。(架空の資料)\nLast Sunday, I ( ア ) to the zoo with my family. We ( イ ) a lot of animals. The pandas were very cute. I wanted to see the lions, but they ( ウ ) sleeping. We ( エ ) lunch at the zoo restaurant. I had a great time.',
        q: '( ア )〜( エ )に入る語を、go / see / be / eat を適切な形にかえて書きなさい。',
        a: 'ア went / イ saw / ウ were / エ ate',
        exp: 'Last Sunday(この前の日曜日)とあるので、すべて過去形にします。go・see・eat は不規則動詞で、それぞれ went・saw・ate。ウは主語 they(ライオンたち)が複数で、sleeping が続く過去進行形なので were を使います。不規則動詞は形をそのまま覚えておく必要があります。'
      },
      {
        kind: '会話文',
        ctx: 'Meg: You look tired, Shota.\nShota: Yes. I ( ア ) sleep well last night.\nMeg: Why?\nShota: I watched a soccer game on TV. It ( イ ) at midnight.\nMeg: ( ウ ) your team win?\nShota: Yes, it did! So I was very happy.',
        q: '( ア )〜( ウ )に入る語の組み合わせとして正しいものを選びなさい。',
        choices: ['ア didn\'t / イ started / ウ Did', 'ア don\'t / イ starts / ウ Does', 'ア wasn\'t / イ started / ウ Was', 'ア didn\'t / イ start / ウ Was'],
        a: '①(ア didn\'t / イ started / ウ Did)',
        exp: 'last night(昨夜)なので過去の文です。アは後ろに原形 sleep があるので、一般動詞の過去の否定 didn\'t。イは過去の出来事なので started。ウは後ろに原形 win があり、答えが Yes, it did. なので Did で始まる疑問文です。答えの did が、疑問文に何を使うかのヒントになります。'
      }
    ]
  });

  add('e_pprog', {
    sheet: {
      title: '過去進行形 1ページまとめ',
      blocks: [
        { h: '形と意味', items: ['was / were+動詞の ing 形', '意味:(その時)〜しているところだった', 'I・3人称単数 → was、you・複数 → were'] },
        { h: '否定文・疑問文', items: ['否定:was not(wasn\'t)/ were not(weren\'t)+ing', '疑問:Was / Were+主語+ing 〜?', '答え:Yes, I was. / No, they weren\'t.', 'What were you doing then?=その時何をしていた?'] },
        { h: '過去形とのちがい', items: ['過去形=出来事を「点」でとらえる', '過去進行形=その時の途中を「線」でとらえる', '過去進行形は、終わったかどうかは言っていない'] },
        { h: 'when との組み合わせ', items: ['When I called him, he was taking a bath.', '長い動作=過去進行形、短い出来事=過去形', 'when 〜 を後ろに置いてもよい(コンマ不要)'] },
        { h: '合図', items: ['then / at that time / at eight last night', 'at 7:00 yesterday など、過去の一時点'] }
      ],
      key: '【過去のある一点で「途中だった」ことは was / were+ing】。割りこんだ短い出来事は過去形で書きます。'
    },
    cards: [
      ['過去進行形の形は?', 'was / were+ing 形'],
      ['過去進行形の意味は?', '(その時)〜しているところだった'],
      ['they のときの be動詞は?', 'were'],
      ['she のときの be動詞は?', 'was'],
      ['was not の短縮形は?', 'wasn\'t'],
      ['「その時何をしていたの?」を英語で?', 'What were you doing then?'],
      ['Were you sleeping? に「いいえ」で答えると?', 'No, I wasn\'t.'],
      ['過去形は「点」、過去進行形は?', '「線」(途中の状態)'],
      ['when の文で長く続く動作に使う形は?', '過去進行形'],
      ['when の文で短い出来事に使う形は?', '過去形'],
      ['過去進行形の合図になる語句を2つ', 'then・at that time など'],
      ['「電話が鳴ったとき私は料理をしていた」', 'I was cooking when the phone rang.'],
      ['過去進行形にしない動詞の例は?', 'know・like など状態を表す動詞'],
      ['「昨夜8時に勉強していた」を英語で?', 'I was studying at eight last night.'],
      ['×I was study then. を直すと?', 'I was studying then.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: '朝の教室で、Ryo と Kate が話しています。\nKate: I called you at nine last night, but you didn\'t answer.\nRyo: Sorry. I ( ア ) a bath then.\nKate: I see. What ( イ ) your sister doing?\nRyo: She ( ウ ) her homework in her room, I think.\nKate: OK. I wanted to tell you about the test.',
        q: '( ア )〜( ウ )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['ア was taking / イ was / ウ was doing', 'ア took / イ did / ウ did', 'ア was taking / イ were / ウ were doing', 'ア am taking / イ is / ウ is doing'],
        a: '①(ア was taking / イ was / ウ was doing)',
        exp: 'at nine last night(昨夜9時)という過去の一点で「途中だったこと」を話しているので過去進行形を使います。アは主語 I なので was taking。イは後ろに doing があり、主語 your sister は3人称単数なので was。ウも主語 She なので was doing です。主語ごとに was と were を選び分けます。'
      },
      {
        kind: '資料読解',
        ctx: '中学生が書いた物語の一部です。(架空の資料)\nIt was a rainy day. Mika ( ア ) along the river when she ( イ ) a small sound. She looked down. A little cat ( ウ ) under a tree. It was shaking. Mika picked it up and took it home.',
        q: '( ア )〜( ウ )に、walk / hear / sit を適切な形にかえて入れなさい。また、ア と イ で形がちがう理由を説明しなさい。',
        a: 'ア was walking / イ heard / ウ was sitting。理由:歩いていたのは続いていた動作(線)で、音が聞こえたのはその途中で起きた短い出来事(点)だから。',
        exp: 'when の文では、背景として続いていた長い動作を過去進行形、その途中に起きた短い出来事を過去形で表します。Mika は川沿いを歩いている途中(was walking)に音を聞いた(heard)のです。ウの猫は、見下ろした時点ですわっていた状態の途中なので was sitting です。hear は過去進行形にしにくい動詞でもあります。'
      }
    ]
  });

  add('e_fut', {
    sheet: {
      title: '未来の表し方 1ページまとめ',
      blocks: [
        { h: 'will', items: ['will+動詞の原形=〜するだろう・〜します', '主語が何でも will の形は同じ', '否定:will not(won\'t)+原形', '疑問:Will+主語+原形 〜? → Yes, 〜 will. / No, 〜 won\'t.'] },
        { h: 'be going to', items: ['be動詞+going to+原形=〜するつもりだ・〜しそうだ', 'be動詞は主語に合わせる(I\'m / He\'s going to)', '否定:be動詞+not going to', '疑問:Are you going to 〜? → Yes, I am.'] },
        { h: '使い分け', items: ['その場で決めた・意志:will(I\'ll help you.)', '前から決めていた予定:be going to', '今の様子から確実な予想:be going to(It\'s going to rain.)'] },
        { h: 'そのほかの未来', items: ['時刻表・決まった予定:現在形(The train leaves at 7.)', '近い予定:現在進行形(I\'m leaving tomorrow.)', '「〜するつもりだった」:was going to'] },
        { h: '合図', items: ['tomorrow / next 〜 / this weekend / soon / someday', 'in the future=将来'] }
      ],
      key: '【will も be going to も後ろは原形】。その場の決心なら will、前からの予定なら be going to と覚えます。'
    },
    cards: [
      ['will の後ろの動詞の形は?', '原形'],
      ['will not の短縮形は?', 'won\'t'],
      ['I will の短縮形は?', 'I\'ll'],
      ['Will it rain? に「いいえ」で答えると?', 'No, it won\'t.'],
      ['be going to の意味は?', '〜するつもりだ・〜しそうだ'],
      ['「彼は泳ぐつもりだ」を英語で?', 'He is going to swim.'],
      ['Are you going to 〜? に「はい」で答えると?', 'Yes, I am.'],
      ['その場で決めたことに使うのは?', 'will'],
      ['前から決めていた予定に使うのは?', 'be going to'],
      ['時刻表の未来を表す時制は?', '現在形'],
      ['「〜するつもりだった」は?', 'was / were going to+原形'],
      ['「来週」を英語で?', 'next week'],
      ['「将来」を英語で?', 'in the future'],
      ['×He will plays. を直すと?', 'He will play.'],
      ['「手伝いましょう(その場の申し出)」は?', 'I\'ll help you.']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '修学旅行のしおりの一部です。(架空の資料)\n【Day 1 Schedule】\n8:00 Meet at Tokyo Station\n8:30 The train leaves for Kyoto\n11:00 Arrive at Kyoto\n13:00 Visit Kinkakuji\n18:00 Dinner at the hotel\nこれを見て、生徒が英文を書きました。\nA. The train leaves at eight thirty.\nB. We are going to visit Kinkakuji in the afternoon.\nC. We will have dinner at the hotel at seven.',
        q: 'A〜C のうち、しおりの内容と合わないものを1つ選び、その理由を書きなさい。',
        a: 'C(夕食は7時ではなく18時=午後6時だから)',
        exp: 'A は時刻表の決まった予定を現在形 leaves で表した正しい文で、8:30 とも合います。B は13時(午後)に金閣寺を訪れる予定で、内容も合っています。C は will を使った文の形は正しいですが、18:00 は six(午後6時)なので seven は誤りです。24時間表記を12時間表記に直すときに注意しましょう。'
      },
      {
        kind: '会話文',
        ctx: '家で Aki と母親が話しています。\nMother: Aki, look at those dark clouds.\nAki: Oh, it ( ア ) rain soon.\nMother: Can you bring the clothes in?\nAki: OK, I ( イ ) do it now.\nMother: Thanks. By the way, what are your plans for tomorrow?\nAki: I ( ウ ) see a movie with Yui. We decided it last week.',
        q: '( ア )〜( ウ )に入る語句の組み合わせとして最も適切なものを選びなさい。',
        choices: ['ア is going to / イ will / ウ am going to', 'ア will / イ am going to / ウ will', 'ア is going to / イ am going to / ウ will', 'ア will / イ will / ウ will'],
        a: '①(ア is going to / イ will / ウ am going to)',
        exp: 'アは「黒い雲」という今の様子から確実に予想しているので is going to が自然です。イは母に頼まれてその場で決めたことなので will(I\'ll do it.)。ウは We decided it last week(先週決めた)とあり、前からの予定なので be going to です。どちらも文法上は誤りではない場合もありますが、場面に最も合うものを選びます。'
      }
    ]
  });

  add('e_m3', {
    sheet: {
      title: '助動詞(must・have to・may・should)1ページまとめ',
      blocks: [
        { h: '共通ルール', items: ['助動詞+動詞の原形', '主語が何でも形は変わらない', '否定は助動詞の後ろに not、疑問は助動詞を前に'] },
        { h: '意味の一覧', items: ['must=〜しなければならない/〜にちがいない', 'have to=〜しなければならない(3単現は has to)', 'may=〜してもよい/〜かもしれない', 'should=〜すべきだ・〜したほうがよい'] },
        { h: '否定で意味が変わる', items: ['must not=〜してはいけない(禁止)', 'don\'t have to=〜しなくてよい(不要)', 'should not=〜すべきではない'] },
        { h: '過去・未来', items: ['must の過去 → had to', 'must の未来 → will have to', '×will must とは言わない(助動詞は2つ並べない)'] },
        { h: '会話表現', items: ['May I 〜?=〜してもよろしいですか', 'Shall I 〜?=〜しましょうか → Yes, please. / No, thank you.', 'Shall we 〜?=〜しませんか → Yes, let\'s.', 'Must I 〜? → No, you don\'t have to.'] }
      ],
      key: '【must not は「禁止」、don\'t have to は「不要」】。否定にすると意味が大きく分かれる点がいちばん出ます。'
    },
    cards: [
      ['must の2つの意味は?', '〜しなければならない/〜にちがいない'],
      ['He ( ) to go. の空所は?', 'has'],
      ['must not の意味は?', '〜してはいけない(禁止)'],
      ['don\'t have to の意味は?', '〜しなくてよい'],
      ['must の過去の言い方は?', 'had to'],
      ['「〜しなければならないだろう」は?', 'will have to+原形'],
      ['may の2つの意味は?', '〜してもよい/〜かもしれない'],
      ['should の意味は?', '〜すべきだ・〜したほうがよい'],
      ['May I 〜? の意味は?', '〜してもよろしいですか'],
      ['Shall I 〜? の意味は?', '〜しましょうか'],
      ['Shall I 〜? に「お願いします」と答えると?', 'Yes, please.'],
      ['Shall we 〜? の意味は?', '〜しませんか(誘い)'],
      ['Must I go? に「その必要はない」と答えると?', 'No, you don\'t have to.'],
      ['「彼は疲れているにちがいない」を英語で?', 'He must be tired.'],
      ['×She musts go. を直すと?', 'She must go.']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: 'ある市民プールの英語の案内です。(架空の資料)\n【Pool Rules】\n1. You must take a shower before you swim.\n2. You must not run around the pool.\n3. You don\'t have to bring a towel. We have towels for you.\n4. Children under 8 must swim with an adult.',
        q: '案内の内容に合うものを1つ選びなさい。',
        choices: ['タオルは必ず持ってこなければならない。', 'プールのまわりを走ってもよい。', '泳ぐ前にシャワーを浴びる必要がある。', '7歳の子どもは1人で泳いでよい。'],
        a: '③(泳ぐ前にシャワーを浴びる必要がある。)',
        exp: '1の must take a shower が③と一致します。①は don\'t have to bring a towel(持ってこなくてよい)なので誤り。②は must not run(走ってはいけない)なので誤り。④は under 8(8歳未満)は大人と泳がなければならないので、7歳は1人では泳げません。must not と don\'t have to のちがいがポイントです。'
      },
      {
        kind: '会話文',
        ctx: '駅前で、Daisuke が困っている旅行者に話しかけます。\nDaisuke: ( ア ) I help you?\nTraveler: Yes, please. I want to go to Green Hotel.\nDaisuke: It\'s far from here. You ( イ ) take a taxi.\nTraveler: Thank you. ( ウ ) I pay by card in a taxi?\nDaisuke: Yes, you can. Most taxis here take cards.',
        q: '( ア )〜( ウ )に入る語の組み合わせとして最も適切なものを選びなさい。',
        choices: ['ア Shall / イ should / ウ Can', 'ア Must / イ may / ウ Shall', 'ア Shall / イ must not / ウ Must', 'ア Will / イ don\'t have to / ウ Should'],
        a: '①(ア Shall / イ should / ウ Can)',
        exp: 'アは「手伝いましょうか」と申し出る場面で、Yes, please. と答えているので Shall I 〜? が合います(May I help you? も同じ意味で使えます)。イは「遠いのでタクシーに乗ったほうがよい」という助言なので should。ウは「カードで払えますか」とたずね、Yes, you can. と答えているので Can です。'
      }
    ]
  });

  add('e_m4', {
    sheet: {
      title: '不定詞(to+動詞の原形)1ページまとめ',
      blocks: [
        { h: '形', items: ['to+動詞の原形(主語や時制で形は変わらない)', '×to plays / ×to played', '3つの用法:名詞的・形容詞的・副詞的'] },
        { h: '名詞的用法「〜すること」', items: ['動詞の目的語:I want to be a doctor.', '補語:My dream is to travel.', '主語:To read books is fun.(It is fun to read books.)', 'want / like / hope / begin / decide+to 〜'] },
        { h: '形容詞的用法「〜するための・〜すべき」', items: ['名詞のすぐ後ろに置く:something to drink', 'a lot of work to do / time to go', '-thing+形容詞+to 〜:something cold to drink'] },
        { h: '副詞的用法', items: ['目的「〜するために」:I went to the park to play tennis.', '感情の原因「〜して」:I\'m glad to see you.', 'Why 〜? の答え:To 〜.(〜するためです)'] },
        { h: '見分け方', items: ['want など動詞の後ろ → 名詞的', '名詞の後ろで名詞を説明 → 形容詞的', '文が完成していて「なぜ」に答える・感情の後ろ → 副詞的'] }
      ],
      key: '【to の後ろは必ず原形】。用法は「to 〜 の直前に何があるか」(動詞/名詞/完成した文や感情)で見分けます。'
    },
    cards: [
      ['不定詞の形は?', 'to+動詞の原形'],
      ['名詞的用法の訳は?', '〜すること'],
      ['形容詞的用法の訳は?', '〜するための・〜すべき'],
      ['副詞的用法の2つの訳は?', '〜するために/〜して'],
      ['「何か飲むもの」を英語で?', 'something to drink'],
      ['「何か冷たい飲み物」を英語で?', 'something cold to drink'],
      ['I\'m happy to hear that. の用法は?', '副詞的用法(感情の原因)'],
      ['I want to be a teacher. の用法は?', '名詞的用法'],
      ['I have a lot of homework to do. の用法は?', '形容詞的用法'],
      ['To read books is fun. を It で始めると?', 'It is fun to read books.'],
      ['Why did you go there? に「〜するため」と答えると?', 'To 〜.(例:To buy a book.)'],
      ['decide の後ろは to 〜 と 〜ing のどちら?', 'to 〜(decide to go)'],
      ['「〜する時間」を英語で?', 'time to 〜'],
      ['×I want to plays. を直すと?', 'I want to play.'],
      ['「彼女に会えてうれしい」を英語で?', 'I\'m glad to see her.']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '英語の授業で、3人の生徒が自分について話しました。(架空の資料)\nAoi: I went to the library yesterday to borrow some books about space.\nKoji: My dream is to work in a foreign country.\nRin: I didn\'t have time to eat breakfast this morning.',
        q: '3人の発言にある不定詞の用法の組み合わせとして正しいものを選びなさい。',
        choices: ['Aoi 副詞的 / Koji 名詞的 / Rin 形容詞的', 'Aoi 名詞的 / Koji 形容詞的 / Rin 副詞的', 'Aoi 形容詞的 / Koji 名詞的 / Rin 副詞的', 'Aoi 副詞的 / Koji 形容詞的 / Rin 名詞的'],
        a: '①(Aoi 副詞的 / Koji 名詞的 / Rin 形容詞的)',
        exp: 'Aoi は I went to the library yesterday で文が完成しており、to borrow は「借りるために」と目的を表す副詞的用法です。Koji は My dream is のあとで「働くこと」と補語になる名詞的用法。Rin は名詞 time のすぐ後ろで「食べるための時間」と説明しているので形容詞的用法です。直前の語に注目します。'
      },
      {
        kind: '会話文',
        ctx: 'Yuta: Mom, I\'m thirsty. Is there anything ( ア ) in the fridge?\nMother: There is some orange juice.\nYuta: Thanks. Oh, I have to go out now.\nMother: Where are you going?\nYuta: To the park. I\'m going there ( イ ) soccer with Ken.\nMother: OK. Come back by six.\nYuta: I will. I\'m happy ( ウ ) Ken after a long time.',
        q: '( ア )〜( ウ )に、to と drink / play / see のどれかを組み合わせて入れなさい。',
        a: 'ア to drink / イ to play / ウ to see',
        exp: 'アは anything(何か)を後ろから説明する形容詞的用法で「何か飲むもの」。イは「サッカーをするために」公園へ行くという目的を表す副詞的用法。ウは happy(うれしい)の原因「ケンに会えて」を表す副詞的用法です。文の中で to 〜 がどんな役割をしているかを考えると、合う動詞も決まります。'
      }
    ]
  });

  add('e_ger', {
    sheet: {
      title: '動名詞(〜ing)1ページまとめ',
      blocks: [
        { h: '定義', items: ['動詞の ing 形で「〜すること」を表す', '名詞と同じく主語・目的語・補語になる', '主語の動名詞は単数扱い(Reading books is fun.)'] },
        { h: '進行形との見分け', items: ['be動詞+ing で「〜している」→ 進行形', 'My hobby is playing tennis.=趣味は〜すること(動名詞)', '「主語=ing」と言いかえられるかで判断'] },
        { h: '動詞との組み合わせ', items: ['〜ing だけ:enjoy・finish・stop・mind・practice・give up', 'to 〜 だけ:want・hope・decide・plan・wish', 'どちらも可:like・love・begin・start'] },
        { h: '前置詞の後ろ', items: ['前置詞の後ろは動名詞(×to 不定詞)', 'be good at 〜ing / be interested in 〜ing', 'How about 〜ing? / Thank you for 〜ing.', 'without 〜ing=〜しないで / before 〜ing=〜する前に'] },
        { h: '意味が変わる動詞', items: ['stop 〜ing=〜するのをやめる / stop to 〜=〜するために立ち止まる', 'remember 〜ing=〜したことを覚えている / remember to 〜=忘れずに〜する', 'forget to 〜=〜するのを忘れる'] }
      ],
      key: '【enjoy・finish・stop の後ろと、前置詞の後ろは〜ing】。〜ing は「すでにしている・したこと」、to 〜 は「これからすること」のイメージです。'
    },
    cards: [
      ['動名詞の形と意味は?', '動詞の ing 形/〜すること'],
      ['enjoy の後ろは to 〜 と 〜ing のどちら?', '〜ing'],
      ['finish の後ろは?', '〜ing'],
      ['want の後ろは?', 'to 〜'],
      ['decide の後ろは?', 'to 〜'],
      ['like・begin の後ろは?', 'to 〜 と 〜ing のどちらも可'],
      ['前置詞の後ろの動詞の形は?', '動名詞(〜ing)'],
      ['「〜が得意だ」を英語で?', 'be good at 〜ing'],
      ['「〜してくれてありがとう」は?', 'Thank you for 〜ing.'],
      ['「〜するのはどう?」は?', 'How about 〜ing?'],
      ['stop 〜ing の意味は?', '〜するのをやめる'],
      ['stop to 〜 の意味は?', '〜するために立ち止まる・手を止める'],
      ['remember to 〜 の意味は?', '忘れずに〜する'],
      ['Reading books ( ) fun. の be動詞は?', 'is(動名詞の主語は単数扱い)'],
      ['「朝食を食べずに家を出た」を英語で?', 'I left home without eating breakfast.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'Lucy: What are you going to do this weekend, Taku?\nTaku: I\'m planning ( ア ) a cake for my mother\'s birthday.\nLucy: Nice! Are you good at ( イ )?\nTaku: Not really. But I enjoy ( ウ ) new things.\nLucy: How about ( エ ) a video for her, too?',
        q: '( ア )〜( エ )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['ア to make / イ cooking / ウ trying / エ making', 'ア making / イ to cook / ウ to try / エ make', 'ア to make / イ cook / ウ to try / エ making', 'ア making / イ cooking / ウ trying / エ to make'],
        a: '①(ア to make / イ cooking / ウ trying / エ making)',
        exp: 'アは plan の後ろなので to 不定詞(plan to 〜)。イは前置詞 at の後ろなので動名詞 cooking。ウは enjoy の後ろなので動名詞 trying。エは How about の about が前置詞なので動名詞 making です。動詞ごとにとる形を覚え、前置詞の後ろはいつも〜ing と判断します。'
      },
      {
        kind: '資料読解',
        ctx: '中学生の英作文です。(架空の資料)\nMy grandfather is seventy. Last year, he stopped ( ア ) because it was bad for his health. Now he walks for an hour every morning. Yesterday, he stopped ( イ ) a beautiful flower on his way and took a picture of it. He says, "Don\'t forget ( ウ ) the window before you leave home."',
        q: '( ア )〜( ウ )に、smoke / look at / close を適切な形(to 〜 か 〜ing)にして入れなさい。',
        a: 'ア smoking / イ to look at / ウ to close',
        exp: 'アは「健康に悪いので、たばこを吸うのをやめた」なので stop 〜ing。イは散歩の途中で「花を見るために立ち止まった」ので stop to 〜(目的)。ウは「出かける前に窓を閉めるのを忘れないで」と、これからすることなので forget to 〜 です。stop と forget は後ろの形で意味が変わるので、文脈で判断します。'
      }
    ]
  });

  add('e_m5', {
    sheet: {
      title: '比較(比較級・最上級・as 〜 as)1ページまとめ',
      blocks: [
        { h: '3つの比べ方', items: ['2つで差がある:比較級+than', '3つ以上で一番:the+最上級+in / of', '同じくらい:as+原級+as'] },
        { h: '形の作り方', items: ['ふつう:er / est(tall-taller-tallest)', 'e で終わる:r / st(large-larger-largest)', '子音字+y:ier / iest(easy-easier-easiest)', '短母音+子音字:重ねる(big-bigger-biggest)', '長い語:more / most(more beautiful)'] },
        { h: '不規則変化', items: ['good / well → better → best', 'many / much → more → most', 'bad → worse → worst'] },
        { h: 'in と of の使い分け', items: ['in+場所・集団(in my class / in Japan)', 'of+数・複数(of the three / of all)'] },
        { h: 'よく出る形', items: ['not as 〜 as=…ほど〜ではない', 'like A better than B / like A the best', 'Which is 〜er, A or B?', 'much+比較級=ずっと〜 / 倍数:twice as 〜 as'] }
      ],
      key: '【than があれば比較級、in / of と the があれば最上級、as 〜 as には原級】。合図の語から形を決めます。'
    },
    cards: [
      ['big の比較級・最上級は?', 'bigger / biggest'],
      ['easy の比較級・最上級は?', 'easier / easiest'],
      ['good の比較級・最上級は?', 'better / best'],
      ['many の比較級・最上級は?', 'more / most'],
      ['bad の比較級・最上級は?', 'worse / worst'],
      ['beautiful の比較級は?', 'more beautiful'],
      ['最上級で「クラスで」は in と of のどちら?', 'in(in my class)'],
      ['最上級で「3人の中で」は?', 'of the three'],
      ['as 〜 as の間の形は?', '原級(もとの形)'],
      ['not as tall as の意味は?', '…ほど背が高くない'],
      ['「AよりBが好き」を英語で?', 'like B better than A'],
      ['「〜が一番好き」を英語で?', 'like 〜 the best'],
      ['比較級を強める「ずっと」は?', 'much(much bigger)'],
      ['「2倍の大きさ」を英語で?', 'twice as large as'],
      ['「どちらが古いですか、AとB」を英語で?', 'Which is older, A or B?']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: 'あるクラス30人に「一番好きな季節」をたずねた結果です。(架空の資料)\n【表】\nspring|9人\nsummer|12人\nfall|6人\nwinter|3人',
        q: '表の内容に合う英文を1つ選びなさい。',
        choices: ['Spring is the most popular season in the class.', 'Fall is as popular as winter.', 'Summer is twice as popular as fall.', 'Winter is more popular than spring.'],
        a: '③(Summer is twice as popular as fall.)',
        exp: '一番人数が多いのは summer(12人)なので①は誤り。fall は6人、winter は3人で同じではないので②も誤り。summer の12人は fall の6人の2倍(12÷6=2)なので③が正しい。winter の3人は spring の9人より少ないので④も誤りです。twice as 〜 as は「〜の2倍…」を表します。'
      },
      {
        kind: '会話文',
        ctx: 'Mana と留学生の Alex が日本の山について話しています。(山の高さは実際のおおよその値)\nAlex: Which is ( ア ), Mt. Fuji or Mt. Kita?\nMana: Mt. Fuji is. It\'s about 3,776 meters high. It\'s the ( イ ) mountain in Japan.\nAlex: How high is Mt. Kita?\nMana: About 3,193 meters. It\'s the second highest.\nAlex: So Mt. Kita isn\'t ( ウ ) high ( ウ ) Mt. Fuji.',
        q: '( ア )〜( ウ )に入る語を書きなさい(ウは同じ語が2回入る)。',
        a: 'ア higher / イ highest / ウ as',
        exp: 'アは「富士山と北岳のどちらが高いか」と2つを比べているので比較級 higher。イは in Japan(日本で)という範囲の中で一番なので最上級 highest。ウは「北岳は富士山ほど高くない」という意味の not as 〜 as の形で、as を2回使います。2つを比べるか、範囲の中で一番かで形を選びます。'
      }
    ]
  });

  add('e_m6', {
    sheet: {
      title: '受動態(〜される)1ページまとめ',
      blocks: [
        { h: '形と意味', items: ['be動詞+過去分詞=〜される・〜されている', '「する側」ではなく「される側」が主語', '行為者を言うときは by 〜(〜によって)'] },
        { h: '過去分詞', items: ['規則動詞:過去形と同じ(used・visited)', 'speak-spoke-spoken / write-wrote-written', 'make-made-made / build-built-built / see-saw-seen / take-took-taken'] },
        { h: '能動態→受動態', items: ['① 目的語を主語にする', '② be動詞を主語と時制に合わせる', '③ 動詞を過去分詞にする', '④ もとの主語を by 〜 に(代名詞は目的格:by him)'] },
        { h: '否定・疑問・助動詞', items: ['否定:be動詞+not+過去分詞', '疑問:be動詞を前に(Is English spoken 〜?)', '助動詞:can be seen / will be held'] },
        { h: 'by 以外の前置詞', items: ['be known to 〜=〜に知られている', 'be covered with 〜=〜でおおわれている', 'be made of(材料)/ be made from(原料)', 'be interested in 〜=〜に興味がある'] }
      ],
      key: '【be動詞+過去分詞】で「される」。時制は be動詞で表し、過去分詞はいつも同じ形です。'
    },
    cards: [
      ['受動態の形は?', 'be動詞+過去分詞'],
      ['speak の過去分詞は?', 'spoken'],
      ['write の過去分詞は?', 'written'],
      ['build の過去分詞は?', 'built'],
      ['take の過去分詞は?', 'taken'],
      ['see の過去分詞は?', 'seen'],
      ['受動態で行為者を表す前置詞は?', 'by'],
      ['by he はどう直す?', 'by him(目的格)'],
      ['「〜に知られている」は?', 'be known to 〜'],
      ['「〜でおおわれている」は?', 'be covered with 〜'],
      ['材料が見てわかるとき「〜でできている」は?', 'be made of 〜'],
      ['「見られることができる」(can の受動態)は?', 'can be seen'],
      ['「〜で開かれるだろう」は?', 'will be held'],
      ['「この寺は〜年に建てられた」の be動詞は?', 'was'],
      ['Is this book read by many people? に「はい」で答えると?', 'Yes, it is.']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '観光パンフレットの英文です。(架空の資料)\nThis old castle ( ア ) about 400 years ago. Today, it ( イ ) by many tourists from all over the world. In spring, the castle is ( ウ ) with cherry blossoms. You can ( エ ) a great view of the city from the top.',
        q: '( ア )〜( エ )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['ア was built / イ is visited / ウ covered / エ enjoy', 'ア built / イ visits / ウ covering / エ enjoyed', 'ア is built / イ was visited / ウ covered / エ be enjoyed', 'ア was built / イ is visiting / ウ cover / エ enjoy'],
        a: '①(ア was built / イ is visited / ウ covered / エ enjoy)',
        exp: 'アは城が「建てられた」のは400年前なので過去の受動態 was built。イは今「多くの観光客に訪れられている」ので現在の受動態 is visited。ウは be covered with 〜(〜でおおわれている)で過去分詞 covered。エは You が主語で「あなたは楽しめる」という能動態なので can enjoy です。主語が「する側」か「される側」かを考えます。'
      },
      {
        kind: '会話文',
        ctx: 'Kenji: This is a nice picture. Who painted it?\nMs. Brown: It ( ア ) by a famous Japanese artist.\nKenji: What is it made ( イ )? Is it paper?\nMs. Brown: No, it\'s silk. And this vase is made ( ウ ) clay.\nKenji: Wow. Is this museum known ( エ ) many people?\nMs. Brown: Yes, it is.',
        q: '( ア )〜( エ )に入る語(句)を書きなさい。ウは of と from のどちらかを選びなさい。',
        a: 'ア was painted / イ of / ウ from / エ to',
        exp: 'アは絵が「描かれた」過去の受動態なので was painted。イは絵の材料(紙か絹か)が見てわかるので made of。ウの花びんは粘土(clay)を焼いて作られ、もとの材料の形が残らないので made from を選びます。エは「〜に知られている」の be known to です。by 以外の前置詞をとる受動態はセットで覚えましょう。'
      }
    ]
  });

  add('e_conj', {
    sheet: {
      title: '接続詞 1ページまとめ',
      blocks: [
        { h: '対等につなぐ', items: ['and=そして・〜と / but=しかし', 'or=または / so=だから(結果)', '命令文, and 〜=そうすれば / 命令文, or 〜=さもないと'] },
        { h: '主と従でつなぐ', items: ['when=〜するとき / if=もし〜なら', 'because=なぜなら〜だから(理由)', 'before / after / until / while', '従属節は前にも後ろにも置ける(前ならコンマ)'] },
        { h: 'because と so', items: ['because の後ろ=理由', 'so の後ろ=結果', 'I was tired, so I went to bed.=I went to bed because I was tired.'] },
        { h: '時・条件の中は現在形', items: ['If it rains tomorrow, I will stay home.', 'When he comes, I\'ll tell him.', '×If it will rain'] },
        { h: 'that とセットの表現', items: ['I think that 〜 / I know that 〜(that は省略可)', 'both A and B / either A or B', 'not only A but also B', 'so 〜 that …=とても〜なので…'] }
      ],
      key: '【because のあとは理由、so のあとは結果】。if・when の中は、未来のことでも現在形で書きます。'
    },
    cards: [
      ['理由を表す接続詞は?', 'because'],
      ['結果を表す接続詞は?', 'so'],
      ['「もし〜なら」を表す接続詞は?', 'if'],
      ['If it ( ) tomorrow の空所(rain)は?', 'rains(未来でも現在形)'],
      ['命令文, and 〜 の意味は?', '〜しなさい、そうすれば…'],
      ['命令文, or 〜 の意味は?', '〜しなさい、さもないと…'],
      ['both A and B の意味は?', 'AもBも両方'],
      ['either A or B の意味は?', 'AかBのどちらか'],
      ['not only A but also B の意味は?', 'AだけでなくBも'],
      ['so 〜 that … の意味は?', 'とても〜なので…'],
      ['I think that 〜 の that は省略できる?', 'できる'],
      ['「〜する間に」を表す接続詞は?', 'while'],
      ['「〜するまで」を表す接続詞は?', 'until'],
      ['When 〜 を文の前に置くと何が必要?', 'コンマ(,)'],
      ['「彼は病気だったので学校を休んだ」を because で', 'He was absent from school because he was sick.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'Miki: Are you going to the festival tomorrow?\nSam: I want to, ( ア ) I have a lot of homework.\nMiki: Finish it today, ( イ ) you can go with us.\nSam: OK. I\'ll try. ( ウ ) it rains, will the festival be held?\nMiki: No, it won\'t. ( エ ) let\'s check the weather tonight.',
        q: '( ア )〜( エ )に入る語の組み合わせとして正しいものを選びなさい。',
        choices: ['ア but / イ and / ウ If / エ So', 'ア so / イ or / ウ When / エ But', 'ア but / イ or / ウ Because / エ So', 'ア and / イ and / ウ If / エ Because'],
        a: '①(ア but / イ and / ウ If / エ So)',
        exp: 'アは「行きたい。しかし宿題が多い」と反対の内容をつなぐので but。イは「今日終わらせなさい、そうすれば行ける」なので命令文, and 〜。ウは「もし雨が降ったら」という条件なので If(後ろは rains と現在形)。エは「雨なら中止になる。だから今夜天気を確かめよう」と結果を述べるので So です。'
      },
      {
        kind: '資料読解',
        ctx: '生徒会が作った英語のお知らせです。(架空の資料)\n【Clean-up Day】\nWe will clean the park near our school on June 10. ( ア ) you want to join us, please come to the school gate at 8:00 a.m. Bring both gloves ( イ ) a towel. ( ウ ) it is hot, please bring something to drink, too. We will finish ( エ ) it gets too hot, at about 10:00 a.m.',
        q: '( ア )〜( エ )に、and / because / before / if のどれかを1回ずつ入れなさい。',
        a: 'ア If / イ and / ウ Because / エ before',
        exp: 'アは「参加したいなら」という条件なので If。イは both A and B(AもBも)の形なので and。ウは「暑いので飲み物も持ってきて」と理由を述べているので Because。エは「暑くなりすぎる前に、10時ごろ終える」なので before です。before の中も、未来のことですが現在形 gets になっている点に注目しましょう。'
      }
    ]
  });

  add('e_m7', {
    sheet: {
      title: '現在完了 1ページまとめ',
      blocks: [
        { h: '形', items: ['have / has+過去分詞', '主語が3人称単数なら has', '短縮形:I\'ve / he\'s / haven\'t / hasn\'t'] },
        { h: '3つの意味と合図', items: ['継続「ずっと〜している」:for 〜 / since 〜 / How long', '経験「〜したことがある」:ever / never / before / 〜 times', '完了「〜したところだ・もう〜した」:just / already / yet'] },
        { h: '否定文・疑問文', items: ['否定:have not+過去分詞(I haven\'t finished it yet.)', '疑問:Have you ever 〜? → Yes, I have. / No, I haven\'t.', '経験の否定:I have never 〜.', 'yet:疑問文で「もう」、否定文で「まだ」'] },
        { h: '過去形とのちがい', items: ['過去形=過去のことだけを言う', '現在完了=過去から今につながっている', '×yesterday / last 〜 / 〜 ago / When とは使わない'] },
        { h: 'まぎらわしい表現', items: ['have been to 〜=〜へ行ったことがある', 'have gone to 〜=〜へ行ってしまった(今いない)', 'for+期間(for three years)/ since+起点(since 2020)'] }
      ],
      key: '【have / has+過去分詞で「過去→今」をつなぐ】。合図の語で継続・経験・完了を見分け、yesterday など過去の一点を表す語とは使いません。'
    },
    cards: [
      ['現在完了の形は?', 'have / has+過去分詞'],
      ['継続の合図の語を2つ', 'for・since'],
      ['経験の合図の語を2つ', 'ever・never など'],
      ['完了の合図の語を3つ', 'just・already・yet'],
      ['for と since のちがいは?', 'for+期間、since+始まりの時点'],
      ['yet の疑問文と否定文での意味は?', '疑問文=もう、否定文=まだ'],
      ['「〜へ行ったことがある」は?', 'have been to 〜'],
      ['have gone to 〜 の意味は?', '〜へ行ってしまった(今ここにいない)'],
      ['「何回」とたずねる表現は?', 'How many times 〜?'],
      ['「どのくらいの間」とたずねる表現は?', 'How long 〜?'],
      ['Have you ever 〜? に「いいえ」で答えると?', 'No, I haven\'t.'],
      ['現在完了と使えない語の例は?', 'yesterday・〜 ago・last 〜'],
      ['「1回」「2回」を英語で?', 'once / twice'],
      ['「私はちょうど宿題を終えた」を英語で?', 'I have just finished my homework.'],
      ['「彼は3年間東京に住んでいる」を英語で?', 'He has lived in Tokyo for three years.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'Nick: Have you ( ア ) been to Hokkaido, Rina?\nRina: Yes. I\'ve been there ( イ ). The first time was when I was five.\nNick: Wow. I\'ve ( ウ ) been there. I want to go someday.\nRina: Are you interested in Japan?\nNick: Yes. I\'ve studied Japanese ( エ ) I was ten.',
        q: '( ア )〜( エ )に入る語の組み合わせとして正しいものを選びなさい。',
        choices: ['ア ever / イ twice / ウ never / エ since', 'ア ever / イ two / ウ not / エ for', 'ア yet / イ twice / ウ never / エ for', 'ア already / イ once / ウ ever / エ since'],
        a: '①(ア ever / イ twice / ウ never / エ since)',
        exp: 'アは経験をたずねる Have you ever 〜?。イは The first time was 〜 と「1回目」があるので2回以上と考えられ、「2回」は twice。ウは「一度も行ったことがない」なので never。エは後ろが I was ten(10歳のとき)という始まりの時点なので since です。for は for five years のように期間の前に置きます。'
      },
      {
        kind: '資料読解',
        ctx: 'ある英語クラブの部員について、先生がまとめたメモです。(架空の資料)\n【メモ】\nAya:2023年に入部、今も在籍\nShun:アメリカに2回行った\nYuto:先週、カナダへ引っこした\nこのメモをもとに英文を作りました。\nA. Aya has been in the club since 2023.\nB. Shun has been to America twice.\nC. Yuto has been to Canada last week.',
        q: 'A〜C のうち、文法的に誤っているものを選び、正しい文に直しなさい。',
        a: 'C:Yuto moved to Canada last week.(last week は現在完了と使えないので過去形にする。Yuto has gone to Canada. も可)',
        exp: 'A は「2023年からずっと在籍している」継続で、起点を表す since が正しく使われています。B は「2回行ったことがある」経験で正しい文です。C は last week(先週)という過去の一点を表す語があるので現在完了は使えません。過去形の moved にするか、last week を除いて「行ってしまった(今いない)」の has gone to にします。'
      }
    ]
  });

  add('e_pperfprog', {
    sheet: {
      title: '現在完了進行形 1ページまとめ',
      blocks: [
        { h: '形と意味', items: ['have / has been+動詞の ing 形', '意味:(今まで)ずっと〜し続けている', '動作が過去に始まり、今も続いている'] },
        { h: '現在完了(継続)との使い分け', items: ['状態の継続(know・live・be・like)→ 現在完了', '動作の継続(run・study・wait・rain)→ 現在完了進行形', 'live・work・study は両方使えることも多い'] },
        { h: '否定文・疑問文', items: ['疑問:Have you been 〜ing? → Yes, I have. / No, I haven\'t.', 'How long have you been 〜ing?', '「ずっと〜していない」は現在完了の否定がふつう(I haven\'t seen him for a week.)'] },
        { h: '時間か回数か', items: ['「どのくらいの時間」続けた → 現在完了進行形', '「いくつ・何回」した → 現在完了', 'I\'ve been writing for two hours. / I\'ve written three letters.'] },
        { h: '合図', items: ['for+期間 / since+起点', 'all day / all morning / How long', 'It has been raining since this morning.'] }
      ],
      key: '【have been+ing で「動作がずっと続いている」】。know・like などの状態は進行形にせず、現在完了で表します。'
    },
    cards: [
      ['現在完了進行形の形は?', 'have / has been+ing 形'],
      ['現在完了進行形の意味は?', '(今まで)ずっと〜し続けている'],
      ['主語が he のとき使うのは have と has のどちら?', 'has'],
      ['状態の継続に使う形は?', '現在完了(have+過去分詞)'],
      ['動作の継続に使う形は?', '現在完了進行形'],
      ['know を「ずっと知っている」にすると?', 'have known(進行形にしない)'],
      ['「朝からずっと雨が降っている」を英語で?', 'It has been raining since this morning.'],
      ['「どのくらい待っているの?」を英語で?', 'How long have you been waiting?'],
      ['「2時間ずっと勉強している」を英語で?', 'I have been studying for two hours.'],
      ['「手紙を3通書いた」は進行形を使う?', '使わない(I have written three letters.)'],
      ['Have you been running? に「はい」で答えると?', 'Yes, I have.'],
      ['for の後ろに来るのは?', '期間(for an hour)'],
      ['since の後ろに来るのは?', '起点(since 9:00 / since I was a child)'],
      ['「一日中」を英語で?', 'all day'],
      ['×I have been knowing him. を直すと?', 'I have known him.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: '駅の前で、Jun と Olivia が待ち合わせをしています。\nOlivia: Sorry I\'m late, Jun. How long have you ( ア )?\nJun: For about twenty minutes.\nOlivia: I\'m so sorry. The bus was late because of the snow.\nJun: That\'s OK. It ( イ ) snowing since last night.\nOlivia: I know. And I ( ウ ) you for five years, but you\'re never angry!',
        q: '( ア )〜( ウ )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['ア been waiting / イ has been / ウ have known', 'ア waited / イ is / ウ have been knowing', 'ア been waiting / イ was / ウ know', 'ア been wait / イ has been / ウ have known'],
        a: '①(ア been waiting / イ has been / ウ have known)',
        exp: 'アは「待つ」という動作が20分ずっと続いているので、How long have you been waiting? の現在完了進行形。イは雪が昨夜から今まで降り続いているので It has been snowing。ウの know は状態を表す動詞なので進行形にせず、現在完了 have known で「5年間ずっと知っている」と表します。動作か状態かで形を選びます。'
      },
      {
        kind: '資料読解',
        ctx: 'Koharu の夏休みの読書記録です。(架空の資料)\n【記録】\n7月21日:読書を始める\n8月10日(今日):これまでに本を6冊読み終えた。今も毎日読んでいる。\nKoharu はこの記録をもとに、英語で2つの文を書こうとしています。',
        q: '「7月21日からずっと本を読んでいる」と「これまでに6冊読んだ」の2文を、それぞれ英語で書きなさい。',
        a: 'I have been reading books since July 21. / I have read six books.',
        exp: '1文目は「読む」という動作が7月21日から今日まで続いていることを言うので、現在完了進行形 have been reading と起点を表す since を使います。2文目は読んだ冊数(いくつ)を言うので、現在完了 have read を使います。「どのくらいの時間」なら進行形、「いくつ・何回」なら現在完了というちがいがポイントです。'
      }
    ]
  });

  add('e_partm', {
    sheet: {
      title: '分詞の形容詞的用法 1ページまとめ',
      blocks: [
        { h: '2つの分詞', items: ['現在分詞(〜ing)=〜している(能動・進行中)', '過去分詞=〜された・〜されている(受け身・完了)', 'a running boy / a broken window'] },
        { h: '置く位置', items: ['1語なら名詞の前:a sleeping baby', '2語以上なら名詞の後ろ:the baby sleeping in the bed', 'the book written by Soseki(漱石によって書かれた本)'] },
        { h: '見分け方', items: ['名詞が「する側」→ 現在分詞', '名詞が「される側」→ 過去分詞', 'boiling water(沸いている湯)/ boiled eggs(ゆでられた卵)'] },
        { h: '長い主語の文', items: ['The boy playing the guitar is my brother.', '動詞は分詞のまとまりの後ろ(is)', '動詞の形は先頭の名詞(The boy)に合わせる'] },
        { h: '感情を表す分詞', items: ['exciting=(物が)わくわくさせる', 'excited=(人が)わくわくしている', 'interesting / interested、surprising / surprised も同じ'] }
      ],
      key: '【名詞が「する側」なら〜ing、「される側」なら過去分詞】。2語以上のかたまりは名詞の後ろに置きます。'
    },
    cards: [
      ['現在分詞の意味は?', '〜している'],
      ['過去分詞の意味は?', '〜された・〜されている'],
      ['分詞が1語のとき置く位置は?', '名詞の前'],
      ['分詞が2語以上のとき置く位置は?', '名詞の後ろ'],
      ['「眠っている赤ちゃん」を英語で?', 'a sleeping baby'],
      ['「割れた窓」を英語で?', 'a broken window'],
      ['「英語で書かれた手紙」を英語で?', 'a letter written in English'],
      ['「公園で走っている男の子」を英語で?', 'the boy running in the park'],
      ['boiling water の意味は?', '沸騰している湯'],
      ['boiled eggs の意味は?', 'ゆで卵(ゆでられた卵)'],
      ['The girls dancing there ( ) my friends. の空所は?', 'are(主語 The girls に合わせる)'],
      ['exciting と excited のちがいは?', 'exciting=物がわくわくさせる、excited=人がわくわくする'],
      ['「その知らせに驚いた」の驚いた(surprise)は?', 'surprised'],
      ['「日本で作られた車」を英語で?', 'a car made in Japan'],
      ['分詞と関係代名詞の書きかえ:the man standing there =', 'the man who is standing there']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: 'クラスの集合写真について、Yuka が説明しています。(架空の資料)\nLook at this picture. The boy ( ア ) a ball is Takeshi. The girl ( イ ) next to him is Mei. The picture ( ウ ) on the wall of our classroom was taken by our teacher. Everyone looks ( エ ) in it.',
        q: '( ア )〜( エ )に入る語の組み合わせとして正しいものを選びなさい。',
        choices: ['ア holding / イ standing / ウ put / エ excited', 'ア held / イ stood / ウ putting / エ exciting', 'ア holding / イ stood / ウ put / エ exciting', 'ア held / イ standing / ウ putting / エ excited'],
        a: '①(ア holding / イ standing / ウ put / エ excited)',
        exp: 'アは男の子がボールを「持っている」する側なので holding。イは女の子が「立っている」する側なので standing。ウは写真が壁に「はられている」される側なので過去分詞 put(put-put-put)。エは「みんな(人)がわくわくしているように見える」ので excited です。名詞が「する側」か「される側」かで判断します。'
      },
      {
        kind: '会話文',
        ctx: 'Rei: What are you reading, Ben?\nBen: It\'s a book (written / by / a Japanese writer).\nRei: Is it interesting?\nBen: Yes. The story about a boy ( ア ) in a small town ( イ ) very moving.\nRei: I want to read it after you.',
        q: '( ア )に live を適切な形にして入れなさい。また、( イ )に入る be動詞を書き、その理由を説明しなさい。',
        a: 'ア living / イ is(主語の中心は The story という単数の名詞だから)',
        exp: 'アは男の子が小さな町に「住んでいる」する側なので現在分詞 living です。イの文の主語は The story about a boy living in a small town という長いかたまりですが、中心の名詞は先頭の The story(単数)です。すぐ前の town につられず、is を選びます。長い主語の文では、まず中心となる名詞を見つけることが大切です。'
      }
    ]
  });

  add('e_m8', {
    sheet: {
      title: '関係代名詞 1ページまとめ',
      blocks: [
        { h: 'はたらき', items: ['名詞(先行詞)を後ろから文で説明する', '2つの文をつなぐ接続詞と代名詞の2役', 'I have a friend who lives in Osaka.'] },
        { h: '主格(後ろに動詞)', items: ['人 → who / that', 'もの・動物 → which / that', 'the girl who plays tennis / the bus which goes to Kyoto', '後ろの動詞は先行詞に合わせる(a friend who lives)'] },
        { h: '目的格(後ろに主語+動詞)', items: ['人 → that(who も使う)/ もの → which / that', 'the book which I bought yesterday', '目的格は省略できる(the book I bought)'] },
        { h: '見分け方', items: ['関係代名詞の直後が動詞 → 主格', '直後が主語+動詞 → 目的格(省略可)', '後ろの文には、先行詞にあたる語がぬけている'] },
        { h: 'that を使う場面・whose', items: ['先行詞に the first / the only / all / 最上級がつくとき that が多い', '人+もの の先行詞も that', 'whose=「その〜の」(a friend whose father is a doctor)'] }
      ],
      key: '【関係代名詞の後ろが動詞なら主格、主語+動詞なら目的格】。先行詞が人なら who、ものなら which、どちらでも that が使えます。'
    },
    cards: [
      ['先行詞が人のときの主格は?', 'who(that)'],
      ['先行詞がもののときの主格は?', 'which(that)'],
      ['主格の関係代名詞の後ろに来るのは?', '動詞'],
      ['目的格の関係代名詞の後ろに来るのは?', '主語+動詞'],
      ['省略できるのは主格と目的格のどちら?', '目的格'],
      ['「その〜の」を表す関係代名詞は?', 'whose'],
      ['先行詞に最上級があるときよく使う関係代名詞は?', 'that'],
      ['「京都へ行くバス」を英語で?', 'the bus which goes to Kyoto'],
      ['「私が昨日買った本」を英語で?', 'the book (which) I bought yesterday'],
      ['a friend who ( ) in Osaka(live)の空所は?', 'lives(先行詞 a friend に合わせる)'],
      ['The man who is standing there を分詞で言うと?', 'The man standing there'],
      ['関係代名詞の後ろの文の特徴は?', '先行詞にあたる語が1つぬけている'],
      ['「父親が医者の友だち」を英語で?', 'a friend whose father is a doctor'],
      ['「私が今まで見た中で一番よい映画」を英語で?', 'the best movie that I have ever seen'],
      ['×the book which I read it を直すと?', 'the book which I read(it は不要)']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '英語クラブの新聞に、3人の生徒が紹介されています。(架空の資料)\nA. Kana is a student ( ア ) can speak three languages.\nB. This is the trophy ( イ ) Daiki won at the speech contest.\nC. Hiro has a sister ( ウ ) dream is to be a pilot.',
        q: '( ア )〜( ウ )に入る関係代名詞の組み合わせとして正しいものを選びなさい。',
        choices: ['ア who / イ which / ウ whose', 'ア which / イ who / ウ whose', 'ア who / イ whose / ウ which', 'ア whose / イ which / ウ who'],
        a: '①(ア who / イ which / ウ whose)',
        exp: 'アは先行詞 a student が人で、後ろが can speak と動詞から始まるので主格の who。イは先行詞 the trophy がもので、後ろが Daiki won と主語+動詞なので目的格の which(that でも可・省略も可)。ウは「その姉の夢が」と所有を表し、後ろが dream という名詞から始まるので whose です。後ろの形と先行詞を見て選びます。'
      },
      {
        kind: '会話文',
        ctx: 'Sara: Who is that man?\nToru: He is the man. He made this cake.\nSara: Wow. The cake is delicious.\nToru: Yes. This is the shop. I visit it every week.\n先生は「2組の文を、関係代名詞を使って1文にしてみよう」と言いました。',
        q: '①He is the man. He made this cake. と②This is the shop. I visit it every week. を、それぞれ関係代名詞を使って1文にしなさい。',
        a: '① He is the man who made this cake. ② This is the shop which I visit every week.(① は that、② は that でも可、② は which を省略してもよい)',
        exp: '①は2文目の He が the man を指し、文の主語なので主格の who(人)を使います。②は2文目の it が the shop を指し、visit の目的語なので目的格の which(もの)を使います。このとき、もとの it は関係代名詞に置きかわるので消すことを忘れないようにします。×the shop which I visit it は誤りです。'
      }
    ]
  });

  add('e_indq', {
    sheet: {
      title: '間接疑問文 1ページまとめ',
      blocks: [
        { h: '定義', items: ['疑問文を文の一部(目的語)として入れたもの', 'I know where he lives.=彼がどこに住んでいるか知っている', '疑問詞からあとは名詞のかたまりになる'] },
        { h: '語順', items: ['疑問詞+主語+動詞(ふつうの文の語順)', 'Where does he live? → where he lives', 'What is this? → what this is'] },
        { h: '作り方の手順', items: ['① 疑問詞をそのまま置く', '② do / does / did を消す', '③ 動詞をもとの時制・人称に合わせる(does→lives、did→went)', '④ be動詞は主語の後ろへ'] },
        { h: '疑問詞が主語のとき', items: ['語順はそのまま:Who made this? → who made this', 'I don\'t know who broke the window.', '疑問詞のかたまりは分けない(how many books he has)'] },
        { h: '文全体の形・関連表現', items: ['疑問文:Do you know where he lives?(Yes / No で答える)', '文末は全体の形で ? か .', 'if 〜=〜かどうか(I don\'t know if he will come.)', '疑問詞+to 〜:I don\'t know what to do.'] }
      ],
      key: '【疑問詞のあとは「主語+動詞」のふつうの語順】。do・does・did は消して、その分を動詞の形に移します。'
    },
    cards: [
      ['間接疑問文の語順は?', '疑問詞+主語+動詞'],
      ['Where does he live? を I know に続けると?', 'I know where he lives.'],
      ['What is this? を I don\'t know に続けると?', 'I don\'t know what this is.'],
      ['When did she come? を Tell me に続けると?', 'Tell me when she came.'],
      ['間接疑問文で消す語は?', 'do / does / did'],
      ['Who made this? を間接疑問にすると語順は?', 'who made this(そのまま)'],
      ['Do you know where he lives? の答え方は?', 'Yes / No で答える'],
      ['「〜かどうか」を表す語は?', 'if(whether)'],
      ['「何をすればよいか」を英語で?', 'what to do'],
      ['「どこへ行けばよいか」を英語で?', 'where to go'],
      ['How many books does he have? を間接疑問にすると?', 'how many books he has'],
      ['I wonder 〜 の意味は?', '〜だろうかと思う'],
      ['「彼が何歳か知っていますか」を英語で?', 'Do you know how old he is?'],
      ['×I know where does he live. を直すと?', 'I know where he lives.'],
      ['「駅への行き方を教えて」を how to で', 'Please tell me how to get to the station.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: '空港で、旅行者が Haruka に話しかけています。\nTraveler: Excuse me. Do you know ( ア )?\nHaruka: It leaves at 3:15.\nTraveler: Thanks. And could you tell me ( イ )?\nHaruka: Sure. It\'s on the second floor.\n旅行者が知りたかったのは「バスが何時に出発するか」と「チケット売り場がどこにあるか」です。',
        q: '( ア )と( イ )に入る語句の組み合わせとして正しいものを選びなさい。',
        choices: ['ア what time the bus leaves / イ where the ticket office is', 'ア what time does the bus leave / イ where is the ticket office', 'ア what time the bus leave / イ where is the ticket office', 'ア the bus leaves what time / イ the ticket office is where'],
        a: '①(ア what time the bus leaves / イ where the ticket office is)',
        exp: 'Do you know や tell me のあとに疑問文を入れる間接疑問では、疑問詞(のかたまり)のあとを「主語+動詞」のふつうの語順にします。アは does を消して leaves(3単現の s)にします。イは be動詞 is を主語 the ticket office の後ろに移します。④は疑問詞を後ろに置いているので誤りです。'
      },
      {
        kind: '資料読解',
        ctx: '生徒が書いたメモと英文です。(架空の資料)\n【メモ】\n・新しい ALT の先生はどこの出身? → まだ知らない\n・先生は来週来る? → 来るかどうかわからない\n・歓迎会で何を歌えばいい? → わからない\n【英文】\nA. I don\'t know where the new ALT is from.\nB. I don\'t know if the new ALT will come next week.\nC. I don\'t know what should sing at the party.',
        q: 'A〜C のうち、誤っている文を1つ選び、「疑問詞+to 〜」を使って正しく直しなさい。',
        a: 'C:I don\'t know what to sing at the party.',
        exp: 'A は Where is the new ALT from? を間接疑問にしたもので、is が主語の後ろに来ており正しい文です。B は「来るかどうか」を if で表していて正しい文です。C は what のあとに主語がなく誤りです。「何を歌えばよいか」は what to sing と表せます(what I should sing でも可)。疑問詞+to 〜 は「〜すればよいか」の意味です。'
      }
    ]
  });

  add('e_vocab_m', {
    sheet: {
      title: '中学英単語の覚え方 1ページまとめ',
      blocks: [
        { h: '覚え方の2段階', items: ['① 英語→日本語がわかる(読める)', '② 日本語→英語が書ける(つづり)', 'まず①を全体に、次に②を重要語に'] },
        { h: '忘れにくくするコツ', items: ['間をあけてくり返す(翌日・3日後・1週間後)', '声に出して発音といっしょに覚える', '例文の中で使い方ごと覚える'] },
        { h: '語尾と品詞', items: ['-tion / -ment / -ness → 名詞(information・happiness)', '-ful / -ous / -al → 形容詞(useful・famous)', '-ly → 副詞が多い(slowly)/ friendly は形容詞'] },
        { h: '形が変わる単語', items: ['名詞の複数:child→children / man→men / leaf→leaves', '動詞:原形-過去形-過去分詞(go-went-gone)', '形容詞:good-better-best'] },
        { h: '使い分けの語', items: ['say=言葉を言う / tell=人に伝える / speak=言語を話す / talk=話し合う', 'borrow=借りる / lend=貸す', 'see=自然に見える / look at=見ようとして見る'] }
      ],
      key: '【単語は「意味・つづり・使い方」をセットで、間をあけてくり返す】。語尾から品詞を推測できると、知らない語にも強くなります。'
    },
    cards: [
      ['child の複数形は?', 'children'],
      ['leaf の複数形は?', 'leaves'],
      ['-tion で終わる語の品詞は?', '名詞が多い'],
      ['-ful で終わる語の品詞は?', '形容詞が多い'],
      ['happy の名詞形は?', 'happiness'],
      ['friendly の品詞は?', '形容詞(-ly でも副詞ではない)'],
      ['borrow と lend のちがいは?', 'borrow=借りる、lend=貸す'],
      ['「人に〜を伝える」に使う動詞は?', 'tell(tell 人 〜)'],
      ['「英語を話す」に使う動詞は?', 'speak'],
      ['hear と同じ発音の語は?', 'here'],
      ['right と同じ発音の語は?', 'write'],
      ['expensive の反対語は?', 'cheap'],
      ['remember の反対の意味の語は?', 'forget'],
      ['「12月」のつづりは?', 'December'],
      ['単語を忘れにくくするくり返し方は?', '間をあけて何度もくり返す']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '英語の授業で、次の英文の下線部の意味を考えました。(架空の資料)\nMy grandmother lives in a small village. There are no shops near her house, so she grows her own vegetables. She says, "Fresh vegetables are【delicious】and good for your health." I always feel 【peaceful】 there because it is very quiet.\n先生:「peaceful は知らない人も多いでしょう。語尾と前後の文から考えてみよう」',
        q: 'peaceful の意味として最も適切なものを選びなさい。',
        choices: ['おだやかな・心が落ち着いた', 'さわがしい', '危険な', 'いそがしい'],
        a: '①(おだやかな・心が落ち着いた)',
        exp: 'peaceful は peace(平和)に -ful がついた形容詞で、「平和に満ちた・おだやかな」という意味です。また、後ろに because it is very quiet(とても静かなので)とあり、静かな場所で感じる気持ちとして「落ち着いた」が合います。②〜④は quiet とつながりません。語のつくりと文脈の両方から意味を推測するのがコツです。'
      },
      {
        kind: '会話文',
        ctx: 'Aki: I forgot my pencil case. Can I ( ア ) your pen?\nTim: Sure. I can ( イ ) you two pens.\nAki: Thanks. By the way, did Mr. Sato ( ウ ) you about the test?\nTim: Yes. He ( エ ), "The test will be next Friday."',
        q: '( ア )〜( エ )に、borrow / lend / tell / said のどれかを1回ずつ入れなさい。',
        a: 'ア borrow / イ lend / ウ tell / エ said',
        exp: 'アは Aki がペンを「借りる」側なので borrow。イは Tim が「貸す」側なので lend(lend 人 もの=人にものを貸す)。ウは「あなたにテストについて伝えた」と、後ろに人(you)が来るので tell。エは後ろに発言の言葉がそのまま続くので say の過去形 said です。日本語では似ていても、だれが何をするかで語を使い分けます。'
      }
    ]
  });

  add('ex_jh3', {
    sheet: {
      title: '並べかえ問題 1ページまとめ',
      blocks: [
        { h: '基本手順', items: ['① 主語と動詞を見つけて骨組みを作る', '② 動詞の後ろの型(SVO・SVOO・SVOC)を決める', '③ 修飾語(前置詞句・to 〜・分詞・関係詞)を名詞の後ろへ', '④ 余る語・足りない語がないか確かめる'] },
        { h: '語群の目印', items: ['who / which / that → 関係代名詞で名詞を後ろから説明', '〜ing・過去分詞+語句 → 名詞の後ろに分詞', 'to+原形 → 不定詞(want to / something to drink)', '疑問詞が文の途中 → 間接疑問(主語+動詞の語順)'] },
        { h: 'よく出る型', items: ['It is 〜 for 人 to …(…することは人にとって〜だ)', 'want 人 to 〜 / tell 人 to 〜 / ask 人 to 〜', 'make A B(AをBにする)/ call A B(AをBと呼ぶ)', 'show 人 もの / give 人 もの'] },
        { h: '置き場所に注意', items: ['too 〜 to …=〜すぎて…できない', '形容詞+enough to 〜(old enough to drive)', 'always・often は一般動詞の前、be動詞の後ろ', '-thing+形容詞+to 〜(something hot to drink)'] },
        { h: '確かめ方', items: ['完成した文を日本語に訳して意味が通るか', '動詞の数=主語+動詞のまとまりの数', '3単現・時制など語の形がそろっているか'] }
      ],
      key: '【まず主語と動詞で骨組み、次に修飾は名詞の後ろへ】。語群の who・to・〜ing・疑問詞が、どの型かを教えてくれます。'
    },
    cards: [
      ['並べかえで最初に決めるのは?', '主語と動詞(文の骨組み)'],
      ['語群に who があるときの型は?', '関係代名詞で名詞を後ろから説明'],
      ['疑問詞が文の途中に来たら?', '間接疑問(疑問詞+主語+動詞)'],
      ['It is 〜 for 人 to … の意味は?', '…することは人にとって〜だ'],
      ['「人に〜してほしい」の型は?', 'want 人 to 〜'],
      ['「人に〜するように言う」の型は?', 'tell 人 to 〜'],
      ['「AをBにする」の型は?', 'make A B'],
      ['「AをBと呼ぶ」の型は?', 'call A B'],
      ['too 〜 to … の意味は?', '〜すぎて…できない'],
      ['enough の位置は形容詞の前と後ろのどちら?', '後ろ(old enough)'],
      ['often の位置(一般動詞の文)は?', '一般動詞の前'],
      ['often の位置(be動詞の文)は?', 'be動詞の後ろ'],
      ['「何か温かい飲み物」の語順は?', 'something hot to drink'],
      ['「人にものを見せる」の語順は?', 'show 人 もの'],
      ['並べかえの最後の確認は?', '訳して意味が通るか・語の形・余りの語']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'Mio: Look at this photo. This is the park (( A )) last Sunday.\nKai: It looks nice. What did you do there?\nMio: I played badminton with my brother. He (( B )).\n( A ) の語群:[ I / with / visited / my family ]\n( B ) の語群:[ me / to / play / asked / with / him ]',
        q: '( A )と( B )の語群を並べかえて、意味の通る英文にしなさい。',
        a: '(A) I visited with my family(This is the park I visited with my family last Sunday.)/(B) asked me to play with him(He asked me to play with him.)',
        exp: '(A)は the park のあとに主語+動詞 I visited が続いており、目的格の関係代名詞が省略された形で「私が家族と訪れた公園」となります。with my family は visited の後ろに置きます。(B)は ask 人 to 〜(人に〜するよう頼む)の型で、He asked me to play with him. です。語群の to や代名詞の形が型を見つける手がかりになります。'
      },
      {
        kind: '資料読解',
        ctx: '英語の授業で、日本語の文を英語にする並べかえ問題に取り組みました。(架空の資料)\n日本語:「このかばんは重すぎて、私には運べません。」\n語群:[ this / is / bag / heavy / for / carry / to / too / me ]\n生徒の答案:This bag is heavy too for me to carry.\n先生:「1か所だけ語順がちがいます。」',
        q: '正しい英文に直し、まちがっていた点を説明しなさい。',
        a: 'This bag is too heavy for me to carry.(too は形容詞 heavy の前に置く)',
        exp: '「〜すぎて…できない」は too+形容詞+to …の型で、too は形容詞の前に置きます。「私には」は for me で、to 不定詞の前に入れて「私が運ぶには」という意味になります。生徒の答案は heavy too の語順になっていました。enough は形容詞の後ろ(heavy enough)、too は前、と対にして覚えると置き場所をまちがえにくくなります。'
      }
    ]
  });

  add('e_talk', {
    sheet: {
      title: '会話表現 1ページまとめ',
      blocks: [
        { h: '依頼と許可', items: ['依頼:Can you 〜? / Could you 〜? / Will you 〜?', '許可:Can I 〜? / May I 〜?', '受ける:Sure. / Of course. / No problem.', '断る:Sorry, I can\'t. / I\'m afraid 〜.'] },
        { h: '提案・申し出', items: ['Let\'s 〜. / Shall we 〜? / How about 〜ing? / Why don\'t we 〜?', 'Shall I 〜?=〜しましょうか → Yes, please. / No, thank you.', 'Would you like 〜?=〜はいかがですか'] },
        { h: '電話・買い物', items: ['This is 〜 (speaking).=こちらは〜です', 'May I speak to 〜? / Hold on, please.', 'May I help you? / I\'m looking for 〜.', 'How much is it? / I\'ll take it.'] },
        { h: '道案内', items: ['Could you tell me the way to 〜?', 'Go straight. / Turn right at the second corner.', 'It\'s on your left. / You can\'t miss it.'] },
        { h: '相づち・聞き返し', items: ['That\'s a good idea. / That sounds nice.', 'Pardon? / Excuse me?=もう一度お願いします', 'Me, too.(肯定)/ Me, neither.(否定)', '否定疑問への答え:Yes=肯定の内容、No=否定の内容'] }
      ],
      key: '【会話の空所は、直後の返事を見て決める】。Yes, please. なら申し出、Sure. なら依頼か許可、と返事が手がかりです。'
    },
    cards: [
      ['「〜してくれませんか」をていねいに?', 'Could you 〜?'],
      ['「〜してもよろしいですか」は?', 'May I 〜?'],
      ['依頼を快く受けることばを2つ', 'Sure. / No problem.'],
      ['「〜しましょうか」(申し出)は?', 'Shall I 〜?'],
      ['Shall I 〜? を断るときは?', 'No, thank you.'],
      ['「〜はいかがですか」(すすめる)は?', 'Would you like 〜?'],
      ['電話で「こちらは〜です」は?', 'This is 〜 (speaking).'],
      ['電話で「少々お待ちください」は?', 'Hold on, please.'],
      ['店員の「いらっしゃいませ」は?', 'May I help you?'],
      ['「〜をさがしています」は?', 'I\'m looking for 〜.'],
      ['「それをください(買います)」は?', 'I\'ll take it.'],
      ['「2つ目の角を右に曲がって」は?', 'Turn right at the second corner.'],
      ['聞き返すときのことばは?', 'Pardon?'],
      ['I don\'t like it. に「私も」と言うと?', 'Me, neither.'],
      ['Don\'t you like it? に「いいえ、好きです」と答えると?', 'Yes, I do.']
    ],
    think: [
      {
        kind: '会話文',
        ctx: 'デパートで、Emi が店員と話しています。\nClerk: ( ア )\nEmi: Yes. I\'m looking for a T-shirt for my brother.\nClerk: How about this blue one?\nEmi: It\'s nice. ( イ )\nClerk: It\'s 2,000 yen.\nEmi: OK. ( ウ )\nClerk: Thank you very much.',
        q: '( ア )〜( ウ )に入る英文の組み合わせとして正しいものを選びなさい。',
        choices: ['ア May I help you? / イ How much is it? / ウ I\'ll take it.', 'ア How are you? / イ What color is it? / ウ Here you are.', 'ア May I help you? / イ How many do you have? / ウ No, thank you.', 'ア Can you help me? / イ How much is it? / ウ I\'ll take it.'],
        a: '①(ア May I help you? / イ How much is it? / ウ I\'ll take it.)',
        exp: 'アは店員の最初のことばで、Emi が Yes. と答えて探しているものを伝えているので May I help you?(いらっしゃいませ・何かおさがしですか)。イは店員が値段(2,000 yen)を答えているので How much is it?。ウは店員が Thank you very much. とお礼を言っているので、買うことを伝える I\'ll take it. が合います。'
      },
      {
        kind: '会話文',
        ctx: '昼休み、Nao と留学生の Leo が話しています。\nLeo: Nao, you didn\'t eat your lunch. Aren\'t you hungry?\nNao: ( ア ). I had a big breakfast.\nLeo: I see. I\'m going to the library after school. ( イ ) come with me?\nNao: I\'d love to. But I have club practice today.\nLeo: OK. Then how about tomorrow?\nNao: ( ウ )',
        q: '( ア )〜( ウ )に入る英語として最も適切なものを選びなさい。',
        choices: ['ア No, I\'m not / イ Why don\'t you / ウ That sounds good.', 'ア Yes, I\'m not / イ Shall I / ウ Me, neither.', 'ア Yes, I am / イ Why don\'t you / ウ No, thank you.', 'ア No, I\'m not / イ May I / ウ Pardon?'],
        a: '①(ア No, I\'m not / イ Why don\'t you / ウ That sounds good.)',
        exp: 'アは否定の疑問文 Aren\'t you hungry?(おなかがすいていないの?)への答えで、朝食をたくさん食べたので「すいていない」という否定の内容です。英語では内容が否定なら No, I\'m not. と答えます。イは「いっしょに来ない?」と誘う Why don\'t you 〜?。ウは「明日はどう?」という提案に賛成する That sounds good. です。'
      }
    ]
  });

  add('e_prep', {
    sheet: {
      title: '前置詞・代名詞 1ページまとめ',
      blocks: [
        { h: '時の at・on・in', items: ['at+時刻(at seven)', 'on+曜日・日付(on Monday / on May 5)', 'in+月・季節・年(in July / in summer / in 2025)', 'in the morning / on Sunday morning(特定の日なら on)'] },
        { h: '場所の前置詞', items: ['at=地点(at the station)/ in=中・広い場所(in Japan)', 'on=接して上(on the wall も on)', 'under / near / by(そば)/ between A and B / in front of'] },
        { h: 'まぎらわしい前置詞', items: ['by=〜までに(期限)/ until=〜までずっと(継続)', 'for+期間の長さ / during+特定の期間', 'for three days / during the summer vacation'] },
        { h: '人称代名詞', items: ['I-my-me-mine / you-your-you-yours', 'he-his-him-his / she-her-her-hers', 'it-its-it / we-our-us-ours / they-their-them-theirs', '前置詞・動詞の後ろは目的格(with him)'] },
        { h: '前置詞がいる・いらない動詞', items: ['いる:listen to / look at / wait for / arrive at・in', 'いらない:visit / enter / discuss / reach', '×visit to Kyoto → ○visit Kyoto / go to Kyoto'] }
      ],
      key: '【時は at(点)→ on(日)→ in(長い期間)の順に広くなる】。前置詞の後ろの代名詞は目的格です。'
    },
    cards: [
      ['時刻の前の前置詞は?', 'at'],
      ['曜日・日付の前の前置詞は?', 'on'],
      ['月・季節・年の前の前置詞は?', 'in'],
      ['「日曜日の朝に」を英語で?', 'on Sunday morning'],
      ['「〜までに(期限)」の前置詞は?', 'by'],
      ['「〜までずっと(継続)」の前置詞は?', 'until'],
      ['for と during のちがいは?', 'for=期間の長さ、during=特定の期間の間'],
      ['「AとBの間に」を英語で?', 'between A and B'],
      ['「〜の前に(場所)」を英語で?', 'in front of 〜'],
      ['she の目的格・所有代名詞は?', 'her / hers'],
      ['they の所有格・目的格は?', 'their / them'],
      ['「彼といっしょに」を英語で?', 'with him'],
      ['visit の後ろに to はいる?', 'いらない(visit Kyoto)'],
      ['「〜を待つ」を英語で?', 'wait for 〜'],
      ['「駅に着く」を英語で?', 'arrive at the station']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '英語の招待状です。(架空の資料)\nDear Ms. Lee,\nWe will have a welcome party ( ア ) Saturday, April 12. It will start ( イ ) 2:00 p.m. ( ウ ) the music room. The music room is ( エ ) the library and the gym. Please let us know ( オ ) April 10 if you can come.\nClass 3-A',
        q: '( ア )〜( オ )に入る語の組み合わせとして正しいものを選びなさい。',
        choices: ['ア on / イ at / ウ in / エ between / オ by', 'ア in / イ on / ウ at / エ among / オ until', 'ア on / イ in / ウ on / エ between / オ until', 'ア at / イ at / ウ in / エ near / オ by'],
        a: '①(ア on / イ at / ウ in / エ between / オ by)',
        exp: 'アは曜日・日付の前なので on。イは時刻の前なので at。ウは「音楽室の中で」なので in。エは the library and the gym の2つにはさまれた場所なので between。オは「4月10日までに知らせて」という期限なので by です。until は「〜までずっと続ける」場合に使うので、期限にはふつう使いません。'
      },
      {
        kind: '会話文',
        ctx: 'Tom: Whose bag is this? Is it ( ア ), Yui?\nYui: No, it isn\'t ( イ ). I think it\'s Ken\'s.\nTom: Ken? I saw ( ウ ) in the gym a few minutes ago.\nYui: Then let\'s take it to ( ウ ). He is waiting ( エ ) his friends there.\nTom: OK. Let\'s go.',
        q: '( ア )〜( エ )に入る語を書きなさい(2つの( ウ )には同じ語が入る)。',
        a: 'ア yours / イ mine / ウ him / エ for',
        exp: 'アは Tom が Yui に「あなたのものか」とたずねているので所有代名詞 yours。イは Yui が「私のものではない」と答えるので mine。ウは動詞 saw の後ろと前置詞 to の後ろで「彼を・彼に」なので目的格 him。エは「〜を待つ」の wait for です。代名詞は文の中の位置(主語か、動詞・前置詞の後ろか、「〜のもの」か)で形が決まります。'
      }
    ]
  });

  add('e_read', {
    sheet: {
      title: '英語長文の読み方 1ページまとめ',
      blocks: [
        { h: '段落の型', items: ['主題(トピック・センテンス)→ 説明・例 → まとめ', '段落の最初の1文に主題が多い', '筆者の主張は最初か最後の段落に出やすい'] },
        { h: 'つなぎことば', items: ['逆接:but / however → 後ろが大事', '例:for example / such as', '結論:so / in short / finally', '追加:also / in addition / besides'] },
        { h: '指示語', items: ['it / they / this / that が指すものは前を見る', 'this は直前の文の内容全体を指すことも多い', '見つけたら、代入して意味が通るか確かめる'] },
        { h: '設問の解き方', items: ['先に設問を読み、何を探すか決める', '内容一致:本文の言いかえ(パラフレーズ)を探す', '本文にない・言いすぎ(always / all)の選択肢に注意', '理由を問う設問:because・so の前後を見る'] },
        { h: '事実と意見', items: ['事実=数字・出来事など確かめられること', '意見=I think / should / important など筆者の考え', '要旨=意見のまとまりをつかむ'] }
      ],
      key: '【but / however の後ろと、段落の最初・最後の文に大事なことが書かれている】。選択肢は本文の「言いかえ」を探して判断します。'
    },
    cards: [
      ['段落の主題が書かれやすい位置は?', '段落の最初の1文'],
      ['however の意味は?', 'しかしながら(逆接)'],
      ['逆接の後ろと前、大事なのは?', '後ろ'],
      ['for example の意味は?', 'たとえば'],
      ['in addition の意味は?', 'さらに・加えて'],
      ['in short の意味は?', '要するに'],
      ['指示語の指すものはどこにある?', 'ふつう前の部分'],
      ['指示語を見つけたらどう確かめる?', '代入して意味が通るか'],
      ['パラフレーズとは?', '同じ内容を別のことばで言いかえること'],
      ['内容一致で注意する語は?', 'always・all・never など言いすぎの語'],
      ['長文の前に読むとよいのは?', '設問'],
      ['事実とは?', '数字・出来事など確かめられること'],
      ['意見を表す目印の語は?', 'I think / should / important など'],
      ['筆者の主張が出やすい段落は?', '最初か最後の段落'],
      ['理由を問う設問で見るところは?', 'because・so の前後']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '次の英文を読んで答えなさい。(架空の資料)\nMany students in our school use smartphones every day. A survey in our class showed that 28 of the 35 students use them for more than two hours a day. Smartphones are useful. For example, we can look up words quickly. However, I think we should decide our own rules. If we use them too long, we will have less time for studying and sleeping.',
        q: '筆者の主張として最も適切なものを選びなさい。',
        choices: ['スマートフォンは自分たちでルールを決めて使うべきだ。', 'スマートフォンはまったく使うべきではない。', 'クラスの全員がスマートフォンを2時間以上使っている。', 'スマートフォンは単語を調べるときにしか役立たない。'],
        a: '①(スマートフォンは自分たちでルールを決めて使うべきだ。)',
        exp: 'However の後ろの I think we should decide our own rules が筆者の意見(主張)です。②は「まったく使うべきでない」とは書かれておらず言いすぎです。③は35人中28人なので「全員」は誤りで、しかもこれは事実の部分です。④は For example で挙げた例の1つにすぎず、「〜しか」も本文にありません。逆接の後ろに注目します。'
      },
      {
        kind: '資料読解',
        ctx: '次の英文を読んで答えなさい。(架空の資料)\nLast summer, I joined a volunteer program at a nursing home. At first, I was nervous because I didn\'t know how to talk with elderly people. Then an old woman smiled and showed me how to fold paper cranes. 【This】 made me relaxed, and we talked a lot. Now I visit her every month.',
        q: '【This】が指す内容を日本語で書きなさい。',
        a: '高齢の女性がほほえんで、折りづるの折り方を教えてくれたこと。',
        exp: 'This は、直前の文の内容全体を指すことが多い指示語です。直前の文は an old woman smiled and showed me how to fold paper cranes(年配の女性がほほえんで、折りづるの折り方を見せてくれた)です。これを This に入れると「そのことで私はリラックスした」となり、緊張していた前の内容ともつながります。指示語は前を見て、代入して確かめます。'
      }
    ]
  });

  add('e_write', {
    sheet: {
      title: '英作文 1ページまとめ',
      blocks: [
        { h: '条件を読む', items: ['語数・文の数・テーマを必ず確認', '「理由を2つ」など指定をすべて満たす', '問いの形(賛成か反対か・どちらがよいか)に答える'] },
        { h: '意見文の型', items: ['① 意見:I think 〜. / I agree with 〜.', '② 理由:First, 〜. Second, 〜.', '③ まとめ:So I think 〜. / For these reasons, 〜.'] },
        { h: '書ける英語で書く', items: ['むずかしい日本語は簡単な内容に言いかえる', '知っている単語・文法だけで組み立てる', '「便利だ」→ It is useful. / It helps us.'] },
        { h: '減点されやすいミス', items: ['主語・動詞のぬけ、3単現の s', '時制のずれ、名詞の複数形・a / the', 'because だけの文(×Because it is fun.)', 'つづり・大文字・ピリオド'] },
        { h: 'つなぎことば', items: ['First / Second / Also / In addition', 'For example / However / So', '比べるとき:A is better than B because 〜.'] }
      ],
      key: '【条件を守り、意見→理由→まとめの型で、書ける英語で書く】。最後に主語・動詞・語の形を見直します。'
    },
    cards: [
      ['英作文で最初に確認することは?', '条件(語数・テーマ・指定)'],
      ['意見文の3つの型は?', '意見→理由→まとめ'],
      ['意見を書き始める表現は?', 'I think 〜. / I agree with 〜.'],
      ['理由を2つ並べるつなぎことばは?', 'First, 〜. Second, 〜.'],
      ['まとめの書き出しの例は?', 'For these reasons, 〜. / So 〜.'],
      ['「〜に賛成する」を英語で?', 'agree with 〜'],
      ['「〜に反対する」を英語で?', 'disagree with 〜'],
      ['×Because it is fun. を正すには?', '主節とつなぐ(I like it because it is fun.)'],
      ['むずかしい日本語はどうする?', '簡単な内容に言いかえる'],
      ['「たとえば」を英語で?', 'For example'],
      ['比べる意見を書く型は?', 'A is better than B because 〜.'],
      ['見直しで確認する3つは?', '主語・動詞、語の形、つづり・記号'],
      ['文の最初の文字は?', '大文字'],
      ['「〜することは大切だ」を英語で?', 'It is important to 〜.'],
      ['「さらに」を英語で?', 'In addition / Also']
    ],
    think: [
      {
        kind: '資料読解',
        ctx: '英語の授業で、次のテーマで書きました。(架空の資料)\nテーマ:Which do you like better, summer or winter?(条件:理由を2つ、30語程度)\n生徒の英文:\nI like summer better than winter. First, I can swim in the sea. Second, summer vacation is long, so I have many time to travel with my family. So I like summer.',
        q: 'この英文には文法の誤りが1か所あります。その部分を正しく直しなさい。また、この英文が条件を満たしているかどうか、理由とともに答えなさい。',
        a: '誤り:many time → much time(a lot of time)。条件:満たしている(意見・理由2つ・まとめがあり、32語で30語程度の範囲)。',
        exp: 'time は「時間」の意味では数えられない名詞なので、many ではなく much か a lot of を使います。条件については、最初の文で意見(夏のほうが好き)を述べ、First・Second で理由を2つあげ、最後の So I like summer. でまとめています。語数を数えると32語で、「30語程度」の範囲と考えられます。'
      },
      {
        kind: '探究',
        ctx: 'ALT の先生からの質問です。\nMs. White: I\'m going to stay in Japan for one year. I want to learn Japanese culture. What should I do? Please give me one idea and the reason.\nあなたは先生に、アドバイスを英語で書くことにしました(条件:2〜3文、20語程度)。',
        q: '条件に合うアドバイスを英語で書きなさい。',
        a: '(解答例)I think you should join a summer festival. You can wear a yukata and dance with local people. It is a good way to learn Japanese culture.',
        exp: '問いは「何をすべきか、アイデア1つと理由」なので、you should 〜 でアイデアを示し、その後に理由を続けます。解答例は、1文目でアイデア(夏祭りに参加する)、2文目で具体的にできること、3文目で文化を学べるという理由を書いています。むずかしい日本語(伝統行事を体験するなど)は、知っている単語で言いかえると書きやすくなります。'
      }
    ]
  });

})(WPS.LESSONS);
