/* テキスト拡充・第2弾(担当:中学英語 25単元) */
(function (L) {
  function add(id, o) { var x = L[id]; if (!x) return; ['rx', 'essay', 'test'].forEach(function (k) { if (o[k]) x[k] = (x[k] || []).concat(o[k]); }); if (o.link) x.link = o.link; }

  /* ===== be動詞 ===== */
  add('e_m1', {
    rx: [
      { err: '日本語の「〜は…です」を見ると、どんな文でも is や are を入れてしまう(× I am go to school. × I am like dogs.)。',
        why: '「です・ます」を be動詞の訳語だと思いこんでいるからです。日本語の「です」はていねいさを表すだけで、英語の be動詞とは1対1に対応していません。',
        fix: '書く前に「主語は何をする?(動作・気持ち)」か「主語は何?どんな様子?(=でつなぐ)」かを考えます。動作や気持ちなら一般動詞だけ、イコールの関係なら be動詞だけ、と1文に動詞は1つにします。',
        q: '「私はネコが好きです」を英語にしよう。', a: 'I like cats.',
        exp: '「好き」は like という一般動詞で表すので、be動詞はいりません。I am like cats. とすると動詞が2つ並んでしまいます。「です」が付いていても、英語では like 1語が動詞の役目を全部はたします。' },
      { err: '主語が長くなると、いちばん近い語に合わせて be動詞を選んでしまう(× The boys in the park is my friends.)。',
        why: '英語の文を前から1語ずつ読んで、be動詞の直前の名詞(park)を主語だと思ってしまうからです。主語は「かたまり」で考える必要があります。',
        fix: 'be動詞の前のかたまりを he・she・it・they のどれか1語に置きかえてみます。The boys in the park は they になるので are です。',
        q: '( )に am・is・are のどれかを入れよう。My sister and her friend ( ) in the music room now.', a: 'are',
        exp: 'My sister and her friend は「姉と友だち」の2人なので they に置きかえられます。room の直前に friend(単数)がありますが、主語は and で結ばれたかたまり全体です。主語が複数なので are を使います。' },
      { err: '否定文や疑問文になると、一般動詞と同じように do を使ってしまう(× Do you hungry? × I don\'t busy.)。',
        why: '先に習った一般動詞の作り方と、be動詞の作り方を区別せずに覚えているからです。do は一般動詞のための助っ人なので、be動詞の文には登場しません。',
        fix: '文の中に be動詞があるかを最初に確認します。あれば「be動詞を前に出す=疑問文」「be動詞の後ろに not=否定文」と、be動詞だけを動かします。',
        q: 'Ken is in his room. を疑問文にして、Yes で答えよう。', a: 'Is Ken in his room? — Yes, he is.',
        exp: 'be動詞 is を主語 Ken の前に出すだけで疑問文になります。答えでは Ken を代名詞 he に置きかえ、Yes, he is. と is を使って答えます。Does Ken in his room? のように does を使うのはまちがいです。' }
    ],
    essay: [{ q: 'あなたが英語の授業で、ペアの相手に「自分の好きな場所」を紹介することになりました。場所の名前、その場所の様子、そこでのあなたの気持ちを、be動詞を3回以上使って英語で書きなさい。', limit: '20〜30語',
      hint: 'My favorite place is 〜. で始め、It is 〜(様子).、There are 〜. や I am 〜 there.(気持ち)の形で文を続けます。形容詞(quiet, big, happy など)を使うと be動詞が生きます。',
      model: 'My favorite place is the library near my house. It is very quiet and clean. There are many books about animals there. I am always happy in the library.',
      points: [['場所の名前を正しく示している', 2], ['様子・気持ちを含め、条件の内容をすべて書いている', 3], ['主語に合った be動詞を3回以上正しく使っている', 3], ['語数を守り、名詞の単数・複数などのつづりが正しい', 2]],
      ng: 'I am like the library. のように be動詞と一般動詞を重ねる答えや、There is many books. のように後ろの名詞の数と be動詞が合わない答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。Tom and I ( ) classmates.', choices: ['am', 'is', 'are', 'be'], a: 'C(are)', exp: 'Tom and I は2人なので we に置きかえられます。主語が複数なので are です。I の直前だからといって am にしないようにしましょう。' },
      { q: '( )に入る語を選ぼう。This bag ( ) not mine.', choices: ['am', 'is', 'are', 'do'], a: 'B(is)', exp: 'This bag は1つのもので it に置きかえられるので is です。否定文は be動詞の後ろに not を置きます。do は使いません。' },
      { q: '次の文の誤りを1か所直そう。Are your brother a teacher?', a: 'Are → Is(Is your brother a teacher?)', exp: 'your brother は1人なので he に置きかえられ、be動詞は is です。your が付いていても主語は brother 1人です。' },
      { q: '「私たちは今、空腹ではありません」を英語にしよう。', a: 'We are not(aren\'t) hungry now.', exp: 'hungry は「空腹の」という形容詞なので be動詞でつなぎます。否定は are の後ろに not です。We don\'t hungry とはしません。' },
      { q: '( )に入る語を選ぼう。"Is that your cat?" "No, ( ) isn\'t."', choices: ['that', 'it', 'he', 'this'], a: 'B(it)', exp: 'that や this でたずねられたら、答えでは it を使うのが決まりです。動物(ペット)を「もの」として it で受けるのがふつうです。' },
      { q: '( )に入る語を選ぼう。Those ( ) my new shoes.', choices: ['is', 'am', 'are', 'be'], a: 'C(are)', exp: 'those は that の複数形で「あれら」という意味です。複数を表す主語なので are を使います。後ろの shoes が複数形になっているのも手がかりです。' },
      { q: '次の2文をほぼ同じ意味にするとき、( )に1語入れよう。This is an easy question. = This question ( ) easy.', a: 'is', exp: '「これは簡単な問題です」を「この問題は簡単です」と言いかえます。形容詞 easy だけを後ろに置くときは、名詞が付かないので a・an は不要になり、be動詞 is でつなぎます。' },
      { q: '下線部をたずねる疑問文を作ろう。My father is in the kitchen.(下線:in the kitchen)', a: 'Where is your father?', exp: '場所をたずねるので where を文頭に置き、is your father と疑問文の語順を続けます。答えの my は、たずねる側から見ると your に変わります。' },
      { q: '( )に入る語の組み合わせを選ぼう。( ) Ms. Sato and Mr. Ito from Osaka? — Yes, ( ) are.', choices: ['Is / they', 'Are / they', 'Are / we', 'Is / she'], a: 'B(Are / they)', exp: 'Ms. Sato and Mr. Ito は2人なので be動詞は are です。答えでは2人を代名詞 they で受け、Yes, they are. と答えます。名前のままでは答えません。' },
      { q: '次の英文の誤りをすべて直そう。My cat and my dog is very cute. It are good friend.', a: 'My cat and my dog are very cute. They are good friends.', exp: '主語「ネコとイヌ」は複数なので are、次の文の主語も2匹を指す They にします。「仲のよい友だち」も2匹なので friends と複数形にそろえます。主語・be動詞・後ろの名詞の数をすべて合わせることが大切です。' }
    ],
    link: { prev: '小学校で使った I am 〜. や This is 〜. などのあいさつ表現が土台です。日本語の「AはBです」という文の形も、英語の文の骨組みを考える手がかりになります。',
      next: 'be動詞は、このあと学ぶ進行形(be + ing)、受動態(be + 過去分詞)、be going to など、たくさんの文法の「部品」になります。am・is・are の使い分けが、そのまま中学英語全体の土台になります。',
      cross: [['国語', '日本語の「AはBだ」の文(名詞文・形容詞文)と比べると、英語では「つなぎ役」の動詞が必ず必要だという違いがよくわかります。'], ['数学', 'be動詞は「=」に近い役目をします。My name is Ken. は「私の名前 = Ken」と、等式のように左右を結んでいます。']],
      univ: '大学の言語学では、be動詞のような「つなぎの語」をコピュラ(連結詞)と呼んで研究します。世界には、ロシア語の現在形のように、ふだんはつなぎの語を言わない言語もあります。',
      readT: 'be動詞は「ばらばらの家族」',
      read: 'am・is・are・was・were・be・been。見た目がまったく違うのに、すべて同じ「be動詞」の仲間です。なぜこんなにばらばらなのでしょうか。じつは英語の be動詞は、もともと別々だった複数の動詞が、長い歴史の中で1つの家族にまとまったものだと考えられています。am や is は「ある・いる」を表す古い動詞から、was や were はまた別の「とどまる」に近い意味の動詞から来ています。be や been も、さらに別の流れを受けついでいます。ふだんよく使う語ほど、古い形が残りやすく、不規則になりやすいのです。go の過去形が went なのも同じ理由です。フランス語やドイツ語でも、「ある・いる」を表す動詞はやはり不規則です。英語を学ぶとき、不規則な形は「覚えにくいやっかいもの」に見えますが、言葉の長い歴史が残した化石だと思うと、少しおもしろく感じられるかもしれません。' }
  });

  /* ===== 一般動詞の現在形・三単現 ===== */
  add('e_pres', {
    rx: [
      { err: '「三単現の s」を「主語が1人(1つ)なら s」と覚えていて、I や you のときにも s をつけてしまう(× I likes music.)。',
        why: '「3人称」の意味をあいまいにしたまま「単数」だけに注目しているからです。I は話し手(1人称)、you は聞き手(2人称)なので、1人でも3人称ではありません。',
        fix: '主語が I・you 以外で、しかも1人・1つのときだけ s をつけます。迷ったら「その主語は he・she・it に置きかえられるか」を確かめます。',
        q: '( )内の語を正しい形にしよう。You (have) a nice bag.', a: 'have',
        exp: 'you は聞き手を表す2人称なので、1人に話しかけていても三単現にはなりません。has にはならず have のままです。s が付くのは he・she・it に置きかえられる主語だけです。' },
      { err: '主語が「1つのかたまり」でも、中に複数形の語があると s をつけない(× Every student have a tablet. × One of my friends live in Kobe.)。',
        why: '動詞のすぐ前やまわりにある名詞の形にまどわされて、本当の主語を確かめていないからです。every のあとの名詞や one of 〜 の「one」は単数です。',
        fix: '主語のかたまりの「中心の語」を1語さがします。every student の中心は student(1人)、one of my friends の中心は one(1人)です。中心が単数なら s をつけます。',
        q: '( )内の語を正しい形にしよう。Each of the girls (play) the guitar.', a: 'plays',
        exp: 'each of 〜 は「〜のそれぞれ」という意味で、中心は each(1人ずつ)です。後ろの the girls は複数形ですが、主語の中心は単数なので、動詞は plays になります。' },
      { err: 'have の三単現を haves としたり、does の否定文で has を残したりする(× She doesn\'t has a pen.)。',
        why: 'have → has は「s をつける」ではなく形そのものが変わるため、ルールの外にあることを意識していないからです。そのうえで does のあとは原形、というルールとまざってしまいます。',
        fix: 'has は「have の三単現」と1セットで覚え、does・doesn\'t が出てきたら、動詞をいったん辞書の形(原形)に戻します。has → have、goes → go、studies → study です。',
        q: 'My brother has a bike. を否定文にしよう。', a: 'My brother doesn\'t(does not) have a bike.',
        exp: 'does not を使うと、三単現の印は does のほうに移ります。そのため動詞は原形の have に戻します。doesn\'t has とすると、三単現の印が2つになってしまいます。' }
    ],
    essay: [{ q: '外国の友だちに、あなたの家族の1人の「ふだんの1日」を紹介するメールを書きます。その人がいつも何をするかを、三人称単数の主語で3つ以上の動作を入れて英語で書きなさい。', limit: '25〜35語',
      hint: 'My mother / My father / My sister などを主語にし、gets up・goes・watches・studies など、s・es・ies のつけ方がちがう動詞をまぜると、正確さを示せます。usually・every day などの頻度の語も使いましょう。',
      model: 'Let me tell you about my mother. She gets up at six every day. She makes breakfast for us and goes to work by bus. She usually watches the news after dinner.',
      points: [['家族の1人を紹介するというメールの目的に合っている', 2], ['三人称単数の動詞を3つ以上正しい形で使っている(es・ies なども含む)', 4], ['every day・usually など、ふだんの習慣であることが伝わる', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'She get up at six. のように s を落とした答えや、She is make breakfast. のように be動詞を重ねる答えは、目立つ減点になります。' }],
    test: [
      { q: '( )に入る語を選ぼう。My uncle ( ) in Canada.', choices: ['live', 'lives', 'living', 'is live'], a: 'B(lives)', exp: 'my uncle は1人で he に置きかえられるので、三単現の s をつけて lives にします。is live のように be動詞を重ねるのはまちがいです。' },
      { q: 'watch の三単現の形を書こう。', a: 'watches', exp: 'ch で終わる語は es をつけます。s・x・sh・ch・o で終わる語は es と覚えましょう。発音は「ウォッチズ」のように最後に音がふえます。' },
      { q: '( )に入る語を選ぼう。( ) your sister like soccer?', choices: ['Do', 'Does', 'Is', 'Are'], a: 'B(Does)', exp: 'your sister は she に置きかえられる三人称単数なので Does を使います。動詞 like があるので be動詞の Is は使いません。' },
      { q: '「彼らは日曜日に学校へ行きません」を英語にしよう。', a: 'They don\'t(do not) go to school on Sunday(s).', exp: '主語 they は複数なので don\'t を使います。三単現ではないので doesn\'t は使いません。曜日の前には on をつけます。' },
      { q: '次の文の誤りを1か所直そう。Mr. Brown teachs English at our school.', a: 'teachs → teaches', exp: 'teach は ch で終わるので es をつけて teaches です。主語の Mr. Brown が三人称単数であることは正しくとらえられていますが、つづりのルールに注意が必要です。' },
      { q: '( )に入る語を選ぼう。"Does Yuki play the piano?" "Yes, she ( )."', choices: ['do', 'does', 'is', 'plays'], a: 'B(does)', exp: 'Does でたずねられたら、答えも does を使います。Yes, she does. / No, she doesn\'t. の形です。' },
      { q: '下線部をたずねる疑問文を作ろう。Kenta usually eats rice for breakfast.(下線:rice)', a: 'What does Kenta usually eat for breakfast?', exp: '「何を」をたずねるので What を文頭に置き、does Kenta 〜 と続けます。does を使ったので、eats は原形の eat に戻します。' },
      { q: '( )に入る語を選ぼう。My dog and my cat ( ) on the sofa every afternoon.', choices: ['sleep', 'sleeps', 'sleeping', 'is sleep'], a: 'A(sleep)', exp: 'イヌとネコの2匹が主語なので they に置きかえられます。複数の主語なので s はつけず、sleep のままです。cat の直前の形にまどわされないようにしましょう。' },
      { q: '( )内の語を正しい形にしよう。My grandfather (enjoy) walking, and he (study) history at home.', a: 'enjoys / studies', exp: 'enjoy は「母音字 o + y」で終わるので、そのまま s をつけて enjoys です。study は「子音字 d + y」で終わるので、y を i に変えて es をつけ studies です。y の前の文字で分かれます。' },
      { q: '次の英文の誤りを2か所直そう。Everyone in my class know her, but she don\'t know me.', a: 'know → knows / don\'t → doesn\'t', exp: 'everyone は「みんな」と訳しますが、文法上は三人称単数として扱うので knows です。また、後半の主語 she も三人称単数なので doesn\'t にします。意味と文法上の数がずれる語に注意しましょう。' }
    ],
    link: { prev: 'be動詞の単元で学んだ「主語を代名詞に置きかえて考える」方法が、そのまま三単現の判断に使えます。I・you・he・she・it・we・they の区別が土台です。',
      next: '「do・does を使って否定文・疑問文を作る」しくみは、過去形の did や、助動詞 can・will の文にも同じ考え方で広がります。三単現の s は、現在完了の has などにも登場します。',
      cross: [['国語', '日本語の動詞は主語が「私」でも「彼」でも形が変わりませんが、英語は主語によって形を変えます。主語と述語の関係を意識するよい練習になります。'], ['社会', '世界の言語には、スペイン語のように主語ごとに動詞の形が6通りに変わる言語もあります。英語は変化がかなり少ない言語です。']],
      univ: '言語学では、主語と動詞の形を合わせることを「一致(agreement)」と呼びます。コンピュータが英文を作る技術でも、この一致を正しく処理することが大切な課題の1つです。',
      readT: 'なぜ「彼」のときだけ s がつくのか',
      read: '英語では He plays. のように、三人称単数の現在形にだけ s がつきます。I や you、they には何もつかないのに、なぜ he・she・it だけ特別なのでしょうか。昔の英語(古英語)では、動詞は主語に合わせて今よりずっと細かく形を変えていました。「私は」「あなたは」「彼は」「私たちは」で、それぞれ語尾がちがったのです。ところが時代とともに語尾の多くがすり減って消え、ほとんどの形が原形と同じになりました。その中で、三人称単数の語尾だけが s として生き残ったのです。シェークスピアの時代の英語では、he loveth のように -th の語尾も使われていました。つまり三単現の s は、英語がかつてもっていた複雑な変化の「最後の生き残り」なのです。そう考えると、小さな s にも長い歴史がつまっていることがわかります。' }
  });

  /* ===== 現在進行形 ===== */
  add('e_prog', {
    rx: [
      { err: '日本語の「〜している」を見ると、いつも進行形にしてしまう(× I am living in Nagoya for ten years.(「住んでいる」)、× He is knowing her.)。',
        why: '日本語の「〜している」には「今まさに動作の途中」のほかに「その状態にある」「習慣」という意味もあるのに、すべて be + ing だと思っているからです。',
        fix: '「〜している」を見たら、①今この瞬間に動いている途中か、②ずっと続く状態や習慣か、を区別します。①なら進行形、②なら現在形(または現在完了)を考えます。',
        q: '「私の兄はその答えを知っています」を英語にしよう。', a: 'My brother knows the answer.',
        exp: 'know(知っている)は「知っている状態」を表す動詞で、動作の途中というものがありません。そのため進行形にせず、三単現の knows を使います。日本語の「〜している」にまどわされないことが大切です。' },
      { err: '進行形の疑問文に、答えを do・does で返してしまう(× Are you studying? — Yes, I do.)。',
        why: '「疑問文には do で答える」という一般動詞のくせが残っていて、質問に使われた語を確かめていないからです。',
        fix: '答えるときは、質問の最初の語をそのまま使います。Are でたずねられたら am・are、Is なら is で答えます。「質問の頭の語で答える」と覚えます。',
        q: '"Is your father cooking now?" に「いいえ」で答えよう。', a: 'No, he isn\'t(he is not).',
        exp: '質問は Is で始まっているので、答えも is を使います。your father は he に置きかえます。No, he doesn\'t. とすると、一般動詞の質問への答えになってしまいます。' },
      { err: 'have をいつも「持っている」と考え、「昼食をとっている」の意味でも進行形にできないと思いこむ(または逆に、「持っている」の意味で進行形にする)。',
        why: '「状態動詞は進行形にしない」というルールを、動詞ごとに覚えているからです。実際には同じ動詞でも、意味によって状態にも動作にもなります。',
        fix: '動詞そのものではなく「その文での意味」で判断します。have が「持っている」なら状態(進行形不可)、「食べる・過ごす」なら動作(進行形可)です。',
        q: '( )内から正しいほうを選ぼう。We (have / are having) lunch in the park now.', a: 'are having',
        exp: 'ここでの have は「(昼食を)食べる」という動作の意味で、now(今)があるので進行形にできます。We are having a good time. も同じです。「持っている」の have は進行形にしません。' }
    ],
    essay: [{ q: 'あなたは今、学校の休み時間の教室にいます。教室の中の3人(またはグループ)が、それぞれ今何をしているかを、写真を見ていない友だちに伝えるつもりで英語で書きなさい。', limit: '25〜35語',
      hint: 'Some students are 〜ing. / Ken is 〜ing. のように、主語ごとに be動詞を合わせます。場所(by the window など)を加えると、様子がいきいきと伝わります。',
      model: 'It is lunch break now. Two boys are playing cards at the back of the room. Mika is reading a book by the window. Our teacher is talking with some students near the door.',
      points: [['3人(グループ)の「今している動作」を伝えている', 3], ['主語に合った be動詞 + ing形を正しく使っている', 4], ['場所などを加え、様子が具体的に伝わる', 1], ['語数を守り、ing形のつづりが正しい', 2]],
      ng: 'Two boys is playing のように主語と be動詞が合わない答えや、Mika reading a book. のように be動詞を落とした答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。Listen! Someone ( ) the piano.', choices: ['play', 'plays', 'is playing', 'are playing'], a: 'C(is playing)', exp: 'Listen!(聞いて!)は「今まさに起きていること」を示す合図です。someone は三人称単数として扱うので is playing になります。' },
      { q: 'swim の ing形を書こう。', a: 'swimming', exp: 'swim は「短母音 + 子音字1つ」で終わるので、最後の m を重ねて ing をつけます。run → running、sit → sitting も同じです。' },
      { q: '次の文を進行形の否定文にしよう。I write a letter.', a: 'I\'m not(I am not) writing a letter.', exp: '進行形の否定文は be動詞の後ろに not を置きます。write は e で終わるので e をとって writing にします。' },
      { q: '( )に入る語を選ぼう。"What ( ) you doing?" "I\'m looking for my key."', choices: ['do', 'are', 'is', 'does'], a: 'B(are)', exp: '答えが I\'m looking 〜 という進行形なので、質問も進行形の What are you doing? です。doing の前に be動詞が必要です。' },
      { q: '( )内から正しいほうを選ぼう。This bag (belongs / is belonging) to my sister.', a: 'belongs', exp: 'belong to 〜(〜のものである)は所有の状態を表す動詞なので、進行形にしません。主語 this bag が三人称単数なので belongs です。' },
      { q: '( )に入る語を選ぼう。Look at those birds. They ( ) over the lake.', choices: ['fly', 'flies', 'are flying', 'is flying'], a: 'C(are flying)', exp: 'Look at 〜 は「今見えていること」を表す合図です。主語 they は複数なので are flying です。fly は y で終わってもそのまま ing をつけます。' },
      { q: '「彼女は今、自分の部屋でテレビを見ているのですか」を英語にしよう。', a: 'Is she watching TV in her room now?', exp: '進行形の疑問文は be動詞を主語の前に出します。she なので Is を使い、watching TV と続けます。' },
      { q: '下線部をたずねる疑問文を作ろう。Taro is waiting for Jim.(下線:Taro)', a: 'Who is waiting for Jim?', exp: '下線部は主語なので、Who を主語にして、そのあとはふつうの語順で is waiting for Jim と続けます。Who is Taro waiting for? とすると「太郎はだれを待っているの?」になってしまいます。' },
      { q: '2つの文の意味のちがいを説明しよう。(a) My father drives to work. (b) My father is driving to work.', a: '(a)は父がふだん車で通勤しているという習慣。(b)は今まさに車で仕事に向かっている途中であること。', exp: '現在形は「いつもそうする」という習慣、進行形は「今その動作の途中にある」ことを表します。(b)は「今日はたまたま車で行っている」という一時的な様子にも使えます。' },
      { q: '次の英文の誤りを2か所直そう。Look! The children is runing in the rain.', a: 'is → are / runing → running', exp: 'children は child の複数形なので be動詞は are です。run は「短母音 + 子音字1つ」で終わる語なので、n を重ねて running とします。主語の数とつづりの両方に注意が必要です。' }
    ],
    link: { prev: 'be動詞(am・is・are)の使い分けと、一般動詞の現在形が土台です。進行形は「be動詞」と「一般動詞の ing形」を組み合わせた形です。',
      next: '過去進行形(was・were + ing)、未来の予定を表す進行形、現在完了進行形(have been + ing)へと発展します。ing形は動名詞や現在分詞としても使われます。',
      cross: [['国語', '日本語の「〜ている」は、「走っている(動作の途中)」と「結婚している(結果の状態)」の2つの意味をもちます。英語の進行形と比べると、日本語の性質もよくわかります。'], ['理科', '実験の観察記録では、「今、水が沸騰している」のような途中の変化と、「水は100℃で沸騰する」のような一般的な性質を区別します。英語でもこの区別が時制に表れます。']],
      univ: '言語学では、動作の「途中」「完了」などのとらえ方を「アスペクト(相)」と呼びます。時制(いつのことか)とは別のものとして研究されています。',
      readT: 'I\'m lovin\' it はまちがい?',
      read: 'あるハンバーガー店のキャッチコピーに I\'m lovin\' it という言葉があります。love は「好きだ」という状態を表すので、教科書では進行形にしないと習います。では、このコピーはまちがいなのでしょうか。じつは、状態動詞をあえて進行形にすると、「今まさに、その気持ちが高まっている」という生き生きとした感じが出ます。ずっと変わらない気持ちではなく、「食べている今この瞬間、最高だ!」という一時的で強い感情を表しているのです。日常会話でも、I\'m loving this song.(この曲、今すごく気に入ってる)のような言い方が聞かれます。ただし、これはくだけた話し言葉の特別な表現です。テストや作文では「状態動詞は進行形にしない」という基本を守りましょう。ルールを知ったうえで、あえて外すから効果があるのです。' }
  });

  /* ===== can・命令文 ===== */
  add('e_can', {
    rx: [
      { err: '「〜できる」とあれば何でも can を使い、未来や完了の文でも can を重ねてしまう(× I will can swim. × I want to can speak English.)。',
        why: 'can を「できる」という意味の動詞だと思っているからです。can は助動詞で、will など他の助動詞と並べたり、to のあとに置いたりはできません。',
        fix: '助動詞が2つ並びそうなとき、または to のあとで「できる」と言いたいときは、be able to を使います。will be able to、to be able to の形にします。',
        q: '「あなたはすぐに上手に泳げるようになるでしょう」を英語にしよう。', a: 'You will be able to swim well soon.',
        exp: 'will と can はどちらも助動詞なので並べられません。そこで can を be able to に置きかえ、will のあとなので原形の be を使って will be able to とします。' },
      { err: 'Can you 〜? をいつも「あなたは〜できますか」と能力の質問だと受けとり、頼まれているのに Yes, I can. とだけ答えて動かない。',
        why: 'can の意味を「能力」1つだけで覚えているからです。会話の Can you 〜? は、多くの場合「〜してくれますか」という依頼です。',
        fix: 'Can you 〜? を聞いたら、場面を考えます。相手が何かを必要としている場面なら依頼なので、Sure. / All right. / Sorry, I can\'t. など、引き受けるかどうかで答えます。',
        q: '重い荷物を持った先生が "Can you open the door for me?" と言いました。ふさわしい応答を選ぼう。(ア)Yes, I can open. (イ)Sure. (ウ)No, you can\'t.', a: '(イ)Sure.',
        exp: '先生は「ドアを開けてくれる?」と頼んでいるので、引き受ける Sure.(いいですよ)が自然です。(ア)は能力の答えで、しかも open のあとに目的語がなく不自然です。(ウ)は許可の質問への答えです。' },
      { err: '命令文に主語 You をつけたり、Please を入れる位置を誤ったりする(× You open the window please now. × Please, don\'t to run.)。',
        why: '「英語の文には主語が必要」というルールを、命令文にもそのまま当てはめてしまうからです。命令文は相手に直接言うので、主語を言わないのが基本です。',
        fix: '命令文は「動詞の原形から始める」と決めておきます。Please は文の最初か、コンマをつけて最後に置きます。Don\'t のあとも原形です。',
        q: '「ここで走らないでください」を、please を使って英語にしよう。', a: 'Please don\'t run here.(Don\'t run here, please.)',
        exp: '否定の命令文は Don\'t + 原形で始めます。please は文の最初に置くか、文の最後にコンマをつけて置きます。Don\'t のあとに to はつけません。' }
    ],
    essay: [{ q: 'あなたの学校の図書室に、日本語がまだ得意でない留学生が来ます。図書室の利用ルールを伝える英語の案内を書きなさい。命令文(否定の命令文を含む)と can を、それぞれ1回以上使うこと。', limit: '25〜35語',
      hint: 'Welcome to our library. で始め、Please 〜. / Don\'t 〜. でルールを、You can 〜. でできることを伝えます。何冊・何日など数字を入れると具体的になります。',
      model: 'Welcome to our library. You can borrow three books for two weeks. Please be quiet in this room. Don\'t eat or drink here. If you have a question, ask the staff at the desk.',
      points: [['図書室の案内という目的に合った内容である', 2], ['命令文(否定を含む)を正しく使っている', 3], ['can を使ってできることを正しく伝えている', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'You don\'t eat here. のように命令文に主語を入れたり、Don\'t eating. のように Don\'t のあとを ing形にしたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。My sister can ( ) three languages.', choices: ['speak', 'speaks', 'speaking', 'to speak'], a: 'A(speak)', exp: 'can のあとは主語にかかわらず動詞の原形です。my sister が三人称単数でも speaks にはしません。' },
      { q: '「私の弟は自転車に乗れません」を英語にしよう。', a: 'My brother can\'t(cannot) ride a bike.', exp: 'can の否定は can\'t または cannot です。can not と2語に分けるより、cannot と1語で書くのが一般的です。' },
      { q: '( )に入る語を選ぼう。"( ) I use your pencil?" "Sure. Here you are."', choices: ['Can', 'Do', 'Am', 'Let\'s'], a: 'A(Can)', exp: 'Can I 〜? は「〜してもいいですか」と許可を求める表現です。Here you are.(はい、どうぞ)と物を渡す応答と合っています。' },
      { q: '( )に入る語を選ぼう。( ) careful. The road is wet.', choices: ['Are', 'Is', 'Be', 'Being'], a: 'C(Be)', exp: 'careful(注意深い)は形容詞なので be動詞が必要です。命令文は原形で始めるので、be動詞の原形 Be を使います。' },
      { q: '次の文を「〜しましょう」という文に書きかえよう。We play soccer after school.', a: 'Let\'s play soccer after school.', exp: '「〜しましょう」と誘うときは Let\'s + 動詞の原形です。主語 we は Let\'s の中にふくまれているので書きません。' },
      { q: '( )に入る語を選ぼう。"Let\'s go to the zoo." "( ) I\'m free today."', choices: ['Yes, let\'s.', 'No, I can\'t.', 'Yes, I do.', 'No, let\'s not.'], a: 'A(Yes, let\'s.)', exp: '後ろに「今日はひまだ」と続くので、誘いに賛成する Yes, let\'s. が合います。断るなら No, let\'s not. ですが、ひまだという理由と合いません。' },
      { q: '2文がほぼ同じ意味になるように( )に1語入れよう。Don\'t talk in the library. = You ( ) talk in the library.', a: 'can\'t', exp: '「話してはいけない」は You can\'t 〜(〜してはいけない)で表せます。can の否定には「できない」のほかに「してはいけない」という意味もあります。' },
      { q: '下線部をたずねる疑問文を作ろう。Kumi can play the flute.(下線:the flute)', a: 'What can Kumi play?', exp: '「何を」をたずねるので What を文頭に置き、can Kumi play と疑問文の語順を続けます。can があるので does は使いません。' },
      { q: '( )に入る語を選ぼう。I couldn\'t sleep well last night, ( ) I\'m very tired now.', choices: ['but', 'so', 'or', 'because'], a: 'B(so)', exp: '「よく眠れなかった」が原因で、「今とても疲れている」が結果なので、結果をつなぐ so が合います。couldn\'t は can\'t の過去形です。' },
      { q: '次の英文の誤りを2か所直そう。Do your brother can cook? Yes, he does.', a: 'Do your brother can cook? → Can your brother cook? / Yes, he does. → Yes, he can.', exp: 'can の疑問文は、can を主語の前に出すだけで、do・does は使いません。答えも質問と同じ can を使って Yes, he can. とします。助動詞の文に do を混ぜないことがポイントです。' }
    ],
    link: { prev: '一般動詞の現在形と、「動詞の原形」の考え方が土台です。三単現の s をつけない場面として、can のあとの原形が登場します。',
      next: 'can は助動詞の入り口です。このあと will・must・may・should など、ほかの助動詞を学びます。can → could の変化は、仮定法(I wish I could 〜)にもつながります。',
      cross: [['国語', '日本語では「〜してください」「〜しなさい」「〜しよう」など、ていねいさに合わせて語尾を変えます。英語では please や Could you 〜? などの言葉でていねいさを調節します。'], ['技術・家庭', '機械の取扱説明書や安全の注意書きは、Do not touch. のような命令文で書かれることが多いです。短く、はっきり伝えるのに向いているからです。']],
      univ: '安全標識や取扱説明書の英語は、誤解がないように短い命令文で書く工夫がされています。航空や医療の現場でも、まちがいを防ぐために言い方を統一した英語が使われています。',
      readT: '「Wet Paint」と「Mind the Gap」',
      read: '英語圏の街を歩くと、短い命令文の表示がたくさん目に入ります。たとえばロンドンの地下鉄では、電車とホームのすき間に注意してほしいときに Mind the gap.(すき間に注意)というアナウンスが流れることで有名です。mind は「気をつける」という意味の動詞で、文は原形から始まる命令文です。また、塗ったばかりのペンキのそばには Wet Paint(ペンキぬりたて)という札が立ちます。こちらは命令文ではなく、名詞のかたまりだけで注意をうながす言い方です。Keep Out(立ち入り禁止)、No Smoking(禁煙)など、表示の英語はとても短く、主語も please もありません。急いでいる人や遠くにいる人にも一目で伝わるように、必要な語だけにしぼっているのです。表示の英語を観察すると、命令文がもつ「短く、はっきり」という力がよくわかります。' }
  });

  /* ===== 疑問詞 ===== */
  add('e_wh', {
    rx: [
      { err: '日本語の語順のまま疑問詞を文の最後に置いてしまう(× You live where? × Your birthday is when?)。',
        why: '日本語では「あなたはどこに住んでいますか」のように、疑問詞を文の中に置いたままたずねるからです。英語では、疑問詞を必ず文の先頭に出すのが基本です。',
        fix: 'まず Yes/No の疑問文(Do you live in 〜?)を作り、たずねたい部分を疑問詞に変えて先頭へ出す、という2段階で組み立てます。',
        q: '「あなたのお姉さんはいつピアノを練習しますか」を英語にしよう。', a: 'When does your sister practice the piano?',
        exp: 'まず Does your sister practice the piano? という疑問文を作り、時をたずねる When を先頭に置きます。your sister は三人称単数なので does を使い、practice は原形のままです。' },
      { err: 'Which・What・Whose のあとに名詞がくっつく形を知らず、1語だけで使ってしまう(× What do you like sport? × Whose is this bag?)。',
        why: '疑問詞を「1語でたずねる言葉」とだけ覚えていて、What sport / Whose bag のように名詞といっしょに「1つのかたまり」で動くことを知らないからです。',
        fix: '名詞をつけてたずねたいときは、「疑問詞 + 名詞」をまとめて文の先頭に出します。後ろに同じ名詞を残さないよう、元の文から1つのかたまりを抜き出すイメージで考えます。',
        q: '「あなたはどの季節がいちばん好きですか」を英語にしよう。', a: 'Which season do you like (the) best?',
        exp: '「どの季節」は Which season で1つのかたまりです。これを先頭に出し、do you like best と続けます。What do you like season best? のように、名詞だけ後ろに残すのはまちがいです。' },
      { err: 'How old・How many・How long などのかたまりを分けて使い、意味のずれた答え方をする(× How many is this? と値段をたずねる、How long に「3回」と答える)。',
        why: 'How の後ろの語によって「何をたずねているか」が変わることを、意味の上で整理できていないからです。',
        fix: 'How のあとの語を「年齢・数・量(値段)・長さ・回数」の何をたずねるかと結びつけて覚えます。答える前に「質問の単位(歳・個・円・時間・回)」を確かめます。',
        q: '「この帽子はいくらですか」を英語にしよう。', a: 'How much is this hat?',
        exp: '値段は How much でたずねます。How many は数えられるものの「数」をたずねるときに使い、後ろに複数形の名詞が来ます。答えは It\'s 20 dollars. のように値段で答えます。' }
    ],
    essay: [{ q: '来月、外国の中学生があなたの学校を訪問します。歓迎会の前に、その生徒について知りたいことを、疑問詞を使ったちがう種類の質問を4つ以上ふくむメールにして英語で書きなさい。', limit: '30〜40語',
      hint: 'What・Where・When・How・Which などを、たずねる内容(好きなもの・住んでいる場所・来日の日・通学方法など)に合わせて使い分けます。最初に一言あいさつを入れましょう。',
      model: 'Hello, I am Aya. I am happy to meet you soon. Where do you live? What sports do you like? How do you go to school? When is your birthday? Which Japanese food do you want to try?',
      points: [['相手を歓迎するメールとしての目的と、自然な流れがある', 2], ['ちがう種類の疑問詞を4つ以上使っている', 3], ['疑問詞の後ろの語順(do・does・be動詞)が正しい', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'Where you live? のように do を落とした答えや、What do you like sports? のように名詞を後ろに残した答えは、語順のミスとして減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。"( ) is your English teacher?" "Ms. Green is."', choices: ['What', 'Who', 'Whose', 'Where'], a: 'B(Who)', exp: '答えが人の名前なので、「だれ」をたずねる Who が入ります。Ms. Green is. と主語で答えているのも Who の質問の答え方です。' },
      { q: '( )に入る語を選ぼう。"( ) umbrella is this?" "It\'s mine."', choices: ['Who', 'Which', 'Whose', 'What'], a: 'C(Whose)', exp: '答えが mine(私のもの)なので、持ち主をたずねる Whose が入ります。Whose umbrella で「だれのかさ」というかたまりです。' },
      { q: '「あなたは何時に寝ますか」を英語にしよう。', a: 'What time do you go to bed?', exp: '時刻は What time でたずねます。When でもまちがいではありませんが、「何時」とはっきり時刻を聞くなら What time が自然です。' },
      { q: '( )に入る語を選ぼう。"( ) do you have lunch?" "In the classroom."', choices: ['When', 'Where', 'Why', 'How'], a: 'B(Where)', exp: '答えが In the classroom.(教室で)と場所なので、Where が入ります。' },
      { q: '下線部をたずねる疑問文を作ろう。She has two cats.(下線:two)', a: 'How many cats does she have?', exp: '数をたずねるので How many cats をひとかたまりにして先頭に置き、does she have と続けます。has は does があるので have に戻します。' },
      { q: '( )に入る語を選ぼう。"( ) are you late?" "Because the bus didn\'t come."', choices: ['What', 'How', 'Why', 'Which'], a: 'C(Why)', exp: '答えが Because 〜(なぜなら〜)なので、理由をたずねる Why が入ります。' },
      { q: '( )に入る語を選ぼう。"How ( ) do you visit your grandparents?" "Twice a month."', choices: ['long', 'many', 'often', 'much'], a: 'C(often)', exp: '答えの Twice a month.(月に2回)は回数・頻度です。頻度をたずねるのは How often です。How many times でも同じ内容をたずねられます。' },
      { q: '下線部をたずねる疑問文を作ろう。Mr. Tanaka teaches science.(下線:Mr. Tanaka)', a: 'Who teaches science?', exp: '主語をたずねるときは、Who が主語になるので do・does は使いません。Who は三人称単数として扱うので teaches の形のままです。' },
      { q: '( )に入る語を選ぼう。"What is the weather ( ) in Sapporo?" "It\'s snowing."', choices: ['how', 'like', 'about', 'of'], a: 'B(like)', exp: 'What is 〜 like? は「〜はどんな様子ですか」という表現です。How is the weather in Sapporo? と同じ意味になります。この like は「〜のような」という前置詞です。' },
      { q: '答えの文に合う疑問文を作ろう。"I usually talk with my friends about music."(music をたずねる)', a: 'What do you usually talk with your friends about?', exp: 'talk about music の music をたずねるので What を先頭に置き、前置詞 about は文の最後に残ります。英語では前置詞が文末に取り残される形がよく使われます。my friends は your friends に変えます。' }
    ],
    link: { prev: 'be動詞と一般動詞の疑問文の作り方(Is 〜? / Do 〜?)が土台です。疑問詞の文は、Yes/No の疑問文の前に疑問詞を置いた形です。',
      next: '中3で学ぶ間接疑問文(I know where he lives.)では、疑問詞のあとが「ふつうの語順」に戻ります。関係代名詞の who・which も、疑問詞と同じ語が別の働きをするものです。',
      cross: [['国語', '新聞記事や報告文で大切な「5W1H(いつ・どこで・だれが・何を・なぜ・どのように)」は、英語の疑問詞 When・Where・Who・What・Why・How から来た言葉です。'], ['社会', '調べ学習では、5W1H を使って問いを立てると、出来事を整理しやすくなります。歴史の出来事も「いつ・どこで・だれが・なぜ」で整理できます。']],
      univ: '社会調査や新聞の取材、警察の聞き取りなどでは、5W1H をもれなく確かめることが基本です。インタビューの技術では、Yes/No では答えられない疑問詞の質問を「開かれた質問」と呼び、相手の考えを引き出すのに使います。',
      readT: 'wh で始まるのに how だけちがう?',
      read: 'what・who・where・when・why・which・whose。英語の疑問詞は、ほとんどが wh で始まります。そのため英語では、疑問詞をまとめて「wh 語」と呼ぶことがあります。ところが how だけは h で始まっています。じつはこれも、もともとは同じ仲間です。昔の英語では、これらの疑問詞はみな hw という文字の組み合わせで書かれていました。のちにつづりの習慣が変わって wh と書かれるようになりましたが、how は早くから w の音が消えて、今の形になったと考えられています。また、who や whose は今では「フー」のように w を発音しません。wh のつづりは、発音が変わっても文字が昔のまま残った例なのです。また、where と there、when と then のように、疑問詞と形がよく似た「対」になる語もあります。単語のつづりは、言葉の歴史を知るための手がかりになります。' }
  });

  /* ===== 過去形 ===== */
  add('e_m2', {
    rx: [
      { err: '過去の話を書いている途中で、知っている動詞だけ過去形にし、あとは現在形がまざってしまう(× Yesterday I went to the park and play tennis.)。',
        why: '1文ずつ「時」を確かめず、最初の動詞だけで「過去にした」と安心してしまうからです。and や but のあとの動詞も、同じ時の話なら過去形が必要です。',
        fix: '書き終えたら、動詞に1つずつ印をつけ、すべて同じ時になっているか確かめます。とくに and・but・then のあとの動詞を見直します。',
        q: '誤りを直そう。Last Sunday I visited my aunt and eat lunch with her.', a: 'eat → ate',
        exp: 'Last Sunday(この前の日曜日)の話なので、and のあとの「食べた」も過去形にします。eat は不規則動詞で過去形は ate です。visited だけ過去形にして安心しないように注意しましょう。' },
      { err: '否定文で、過去形と did を両方使ったり、didn\'t のあとを過去形にしたりする(× I didn\'t went there.)のを、「did は過去の印」と分かっていても何度もくり返す。',
        why: '「過去なら動詞は過去形」という思いこみが強く、did が「過去の印」を引き受けていることを手の動きとして身につけていないからです。',
        fix: 'did・didn\'t を書いたら、その直後の動詞を「辞書に出ている形」に戻すことをルール化します。書いたあとに「did のあとは原形」と声に出して確かめるのも効果的です。',
        q: '否定文にしよう。Mika bought a new dictionary.', a: 'Mika didn\'t(did not) buy a new dictionary.',
        exp: '否定文では didn\'t が過去を表す役目を引き受けるので、bought は原形の buy に戻します。bought のまま残すと、過去の印が2つになってしまいます。' },
      { err: '規則動詞の -ed のつづりを、最後の文字だけ見て決めてしまう(× plaied、× visitted、× stoped)。',
        why: '「y は i に変える」「子音字を重ねる」というルールを、どんな語にも当てはめているからです。y の前の文字や、アクセントの位置まで確かめていません。',
        fix: '① e で終わる → d だけ ② 子音字 + y → ied、母音字 + y → yed ③ 短い母音 + 子音字1つで終わる短い語 → 子音字を重ねる、の順に確かめます。visit のように最後にアクセントがない語は重ねません。',
        q: '過去形にしよう。(1) enjoy (2) carry (3) plan', a: '(1) enjoyed (2) carried (3) planned',
        exp: 'enjoy は y の前が母音字 o なので、そのまま ed をつけます。carry は y の前が子音字 r なので、y を i に変えて ied です。plan は短い母音 + n で終わるので、n を重ねて planned になります。' }
    ],
    essay: [{ q: '「最近の休日にしたこと」について、英語の日記を書きなさい。いつ・どこで・だれと・何をしたか・どう感じたかをふくめ、規則動詞と不規則動詞の過去形をそれぞれ1つ以上使うこと。', limit: '25〜35語',
      hint: 'Last Saturday, 〜. で始め、went・saw・ate などの不規則動詞と、visited・enjoyed などの規則動詞を混ぜます。気持ちは It was 〜. や I was 〜. で表せます。',
      model: 'Last Saturday, I went to the zoo with my family. We saw a baby panda there. I took many pictures of it. We also enjoyed lunch in the park. It was a wonderful day.',
      points: [['いつ・どこで・だれと・何を・感想がふくまれている', 3], ['規則動詞・不規則動詞の過去形を正しく使っている', 3], ['すべての動詞が過去の時にそろっている', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'We see a panda. のように途中で現在形にもどる答えや、It is fun. のように感想だけ現在形にする答えは、時制のミスとして減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。I ( ) my homework two hours ago.', choices: ['finish', 'finished', 'finishes', 'am finishing'], a: 'B(finished)', exp: 'two hours ago(2時間前)は過去を表すので、過去形の finished を使います。' },
      { q: 'write・come・make の過去形をそれぞれ書こう。', a: 'wrote / came / made', exp: 'どれも不規則動詞です。write - wrote、come - came、make - made と、原形と過去形をセットで覚えましょう。' },
      { q: '( )に入る語を選ぼう。"Were you at home last night?" "No, I ( )."', choices: ['wasn\'t', 'weren\'t', 'didn\'t', 'don\'t'], a: 'A(wasn\'t)', exp: 'Were you 〜? には、主語が I になるので was を使って答えます。No, I wasn\'t. です。you に合わせて weren\'t にしないよう注意しましょう。' },
      { q: '疑問文にしよう。Ken left home at seven.', a: 'Did Ken leave home at seven?', exp: '一般動詞の過去の疑問文は Did を主語の前に置き、動詞を原形に戻します。left は leave の過去形です。' },
      { q: '( )に入る語を選ぼう。My parents ( ) very busy yesterday.', choices: ['was', 'were', 'are', 'did'], a: 'B(were)', exp: 'my parents(両親)は2人なので、be動詞の過去形は were です。yesterday があるので過去形にします。' },
      { q: '下線部をたずねる疑問文を作ろう。They arrived at the station at noon.(下線:at noon)', a: 'When(What time) did they arrive at the station?', exp: '時をたずねるので When(または What time)を先頭に置き、did they arrive と続けます。arrived は原形の arrive に戻します。' },
      { q: '( )に入る語を選ぼう。I called you at nine, but you ( ) answer.', choices: ['don\'t', 'didn\'t', 'weren\'t', 'wasn\'t'], a: 'B(didn\'t)', exp: 'answer(答える)は一般動詞で、過去の話なので didn\'t を使います。be動詞の否定 weren\'t は一般動詞の前には置けません。' },
      { q: '「私は昨日その本を読みました」を英語にしよう。', a: 'I read the book yesterday.', exp: 'read の過去形は、つづりは同じ read ですが、発音は「レッド」に変わります。主語が I なので、三単現の s がないことからも過去形だとわかります。' },
      { q: '次の文の read は現在形と過去形のどちらか。理由も答えよう。She read the letter and smiled.', a: '過去形。主語が三人称単数なのに s がなく、and のあとの smiled も過去形だから。', exp: '現在形なら She reads となるはずです。s がないことと、同じ文の smiled が過去形であることから、read は過去形(発音はレッド)だと判断できます。' },
      { q: '次の英文の誤りを2か所直そう。I was go to the library last week, and I study there for two hours.', a: 'was go → went / study → studied', exp: '一般動詞の過去は be動詞を使わず、go の過去形 went 1語で表します。and のあとの study も同じ過去の話なので studied にします。y の前が子音字 d なので ied です。' }
    ],
    link: { prev: '一般動詞の現在形と、do・does を使った否定文・疑問文の作り方が土台です。過去形では do・does が did に1本化されます。',
      next: '過去形は、過去進行形・現在完了(過去形と過去分詞の区別)・受動態(過去分詞)につながります。不規則動詞の原形・過去形・過去分詞の3つの形を覚えることが、中2・中3の文法のかぎになります。',
      cross: [['国語', '日記や作文では、時間の順に書くことが大切です。英語でも first・then・after that などのつなぎことばと過去形を組み合わせると、出来事の順序がはっきり伝わります。'], ['社会', '歴史の教科書を英語で書くと、ほとんどの文が過去形になります。Columbus reached America in 1492. のように、歴史の出来事は過去形で表します。']],
      univ: '言語学では、規則動詞と不規則動詞を人の脳がどう処理しているかが研究されてきました。子どもが言葉を覚えるとき、一度覚えた went を、ルールを覚えたあとに goed と言いまちがえる時期があることが知られています。',
      readT: '子どもはなぜ goed と言うのか',
      read: '英語を母語とする子どもは、小さいころ went と正しく言えていたのに、あるとき急に goed や comed と言い始めることがあります。これは成長が後戻りしたのではありません。最初は went を「1つの単語」としてそのまま覚えていた子どもが、「過去のことには -ed をつける」というルールに自分で気づき、それをあらゆる動詞に当てはめるようになった証拠なのです。この現象は「過剰一般化」と呼ばれ、言葉の発達の研究でよく知られています。その後、子どもは「go だけは went」という例外を覚えなおし、正しい形にもどっていきます。つまり、まちがいの中にも、ルールを見つけ出す人間の頭のはたらきが表れているのです。みなさんが studyed と書いてしまうのも、ルールを使おうとしている証拠です。まちがいを怖がらず、どのルールをどう当てはめたのかを見直すことが上達の近道です。' }
  });

  /* ===== 過去進行形 ===== */
  add('e_pprog', {
    rx: [
      { err: '過去の出来事はすべて過去進行形のほうが「くわしい」と思い、物語の中の出来事を次々に was 〜ing で書いてしまう(× He was opening the door and was going out.)。',
        why: '過去進行形を「〜していた」という日本語訳だけで覚え、「ある時点で途中だった」という意味を意識していないからです。',
        fix: '物語で「それから〜した」と出来事が順に進むところは過去形、「そのとき〜している途中だった」という背景は過去進行形と、役割を分けます。',
        q: '( )内から正しいほうを選ぼう。He (opened / was opening) the door and went out.', a: 'opened',
        exp: '「ドアを開けて、外へ出た」と出来事が順に進んでいるので、どちらも過去形にします。過去進行形は「ある時点でその動作の途中だった」という背景を表すときに使います。' },
      { err: 'when のあとの文と主節の文で、どちらを進行形にするかを逆にしてしまう(× When I was coming home, my mother cooked dinner.(帰ったら母が料理中だった、のつもり))。',
        why: '日本語の「〜したとき、…していた」という順番だけを見て、どちらの動作が長く続いていたのかを考えていないからです。',
        fix: '2つの出来事を時間の線にかいて、「長く続いていた動作(線)」と「一瞬の出来事(点)」を分けます。線のほうを過去進行形、点のほうを過去形にします。',
        q: '「私が帰宅したとき、母は夕食を作っていました」を英語にしよう。', a: 'My mother was cooking dinner when I came home.(When I came home, my mother was cooking dinner.)',
        exp: '「帰宅した」は一瞬の出来事なので過去形 came、「夕食を作っていた」は帰宅の時点で続いていた動作なので過去進行形 was cooking です。when のあとは一瞬の出来事のほうになります。' },
      { err: '過去進行形の疑問文で、答えを did で返したり、主語を変えずに答えたりする(× Were you sleeping? — Yes, you were.)。',
        why: '質問の主語 you を、答える自分の立場に置きかえていないからです。過去進行形では be動詞の形も主語によって変わるので、二重にずれやすくなります。',
        fix: '答えるときは、①主語を自分の立場に置きかえる(you → I、your father → he)、②その主語に合う be動詞(was・were)を選ぶ、の順に確かめます。',
        q: '"Were you and your sister playing a game at that time?" に「はい」で答えよう。', a: 'Yes, we were.',
        exp: '質問の主語 you and your sister は、答える側から見ると「私と姉」なので we になります。we に合う be動詞の過去形は were です。Yes, I was. としないよう、主語のかたまり全体を考えましょう。' }
    ],
    essay: [{ q: '昨日の夜8時ごろ、大きな地震(または停電)が起きたとします。そのとき、あなたと家族がそれぞれ何をしていて、その後どうしたかを英語で書きなさい。過去進行形と過去形の両方を使うこと。', limit: '25〜35語',
      hint: 'At eight last night, I was 〜ing. / My father was 〜ing. で「そのとき途中だった動作」を書き、When the lights went out, we 〜. のように一瞬の出来事と、その後の行動を過去形で書きます。',
      model: 'At eight last night, I was doing my homework in my room. My parents were watching TV. Suddenly the lights went out. We found a flashlight and waited quietly for an hour.',
      points: [['そのとき途中だった動作を過去進行形で正しく書いている', 3], ['一瞬の出来事やその後の行動を過去形で書き分けている', 3], ['主語に合った was・were を使っている', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'Suddenly the lights were going out. のように一瞬の出来事まで進行形にしたり、My parents was watching のように be動詞が主語と合わなかったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。I ( ) a bath at ten last night.', choices: ['take', 'am taking', 'was taking', 'were taking'], a: 'C(was taking)', exp: 'at ten last night(昨夜10時)というある時点で途中だった動作なので、過去進行形です。主語 I に合うのは was です。' },
      { q: '「彼らはそのとき公園を走っていました」を英語にしよう。', a: 'They were running in the park then(at that time).', exp: '主語 they は複数なので were を使います。run は n を重ねて running にします。' },
      { q: '否定文にしよう。Emi was talking on the phone.', a: 'Emi wasn\'t(was not) talking on the phone.', exp: '過去進行形の否定文は、was の後ろに not を置きます。did は使いません。' },
      { q: '( )に入る語を選ぼう。"What ( ) your brother doing at that time?" "He was studying."', choices: ['did', 'was', 'were', 'is'], a: 'B(was)', exp: '答えが He was studying. なので、質問も過去進行形です。your brother は三人称単数なので was を使います。' },
      { q: '( )内の語を正しい形にしよう。It (rain) when I left home this morning.', a: 'was raining', exp: '「家を出た(left)」という一瞬の時点で、雨は降っている途中だったので、過去進行形 was raining にします。天気の文の主語は it です。' },
      { q: '( )に入る語を選ぼう。While I ( ) dinner, the phone rang.', choices: ['cook', 'cooked', 'was cooking', 'am cooking'], a: 'C(was cooking)', exp: 'while は「〜している間に」という意味で、長く続く動作を表す文によく使われます。電話が鳴った(点)ときに料理の途中だった(線)ので、過去進行形です。' },
      { q: '2つの文の意味のちがいを説明しよう。(a) I read a book last night. (b) I was reading a book at ten last night.', a: '(a)は昨夜本を読んだという出来事を1つのまとまりとして述べている。(b)は昨夜10時という時点で、本を読んでいる途中だったことを表す。', exp: '過去形は出来事をひとまとまりの「点」として、過去進行形はある時点で続いていた「線」として表します。(b)は読み終えたかどうかについては何も言っていません。' },
      { q: '下線部をたずねる疑問文を作ろう。Yuta was waiting for the bus.(下線:Yuta)', a: 'Who was waiting for the bus?', exp: '主語をたずねるので、Who を主語にしてそのまま was waiting for the bus と続けます。Who は単数として扱うので was です。' },
      { q: '( )に入る語の組み合わせを選ぼう。When Tom ( ) into the room, his friends ( ).', choices: ['came / was singing', 'was coming / sang', 'came / were singing', 'was coming / were singing'], a: 'C(came / were singing)', exp: 'トムが部屋に入ってきたのは一瞬の出来事なので過去形 came です。そのとき友だちは歌っている途中だったので過去進行形にし、主語 his friends は複数なので were singing です。' },
      { q: '次の英文の誤りを2か所直そう。I was knowing her name when she was calling me.', a: 'was knowing → knew / was calling → called', exp: 'know は状態を表す動詞なので進行形にせず knew にします。また「彼女が電話してきた」は一瞬の出来事なので、過去形 called にします。進行形にできるかどうかと、点か線かの2点を確かめましょう。' }
    ],
    link: { prev: '現在進行形(be + ing)と、be動詞の過去形(was・were)の2つを組み合わせた形です。進行形にしない状態動詞のルールもそのまま使います。',
      next: 'when・while などの接続詞を使った文、現在完了進行形(have been 〜ing)へとつながります。物語文の読解では、過去形と過去進行形の使い分けで場面の背景と出来事を読み分けます。',
      cross: [['国語', '物語文では、「雨が降っていた。そのとき、ドアが開いた。」のように、背景の描写と出来事を書き分けます。英語では、これを過去進行形と過去形で区別します。'], ['社会', '歴史で「〇〇年に地震が起きたとき、人々は〜していた」という記録を読むと、出来事の時点と、そのときの人々の暮らしを結びつけて考えられます。']],
      univ: '文章を分析する研究では、物語の「前景(出来事の流れ)」と「背景(場面の様子)」を、動詞の時制や相で区別する考え方があります。作家はこの使い分けで、読者に場面を思いうかべさせています。',
      readT: '物語は「背景」と「出来事」でできている',
      read: '英語の物語を読むと、最初の数文に過去進行形がよく出てきます。たとえば It was raining hard. A dog was sleeping under a tree. のように、場面の様子をえがくのです。これは、映画で最初にカメラが町の景色を映すのに似ています。そこへ Suddenly, a girl ran out of the house. のような過去形の文が来ると、物語が動き始めます。過去進行形は「すでに続いている背景」、過去形は「その上で起きる出来事」を表しているのです。読むときに、この2つを意識すると、どこからが話の本筋なのかがわかりやすくなります。書くときも、まず過去進行形で場面をえがき、次に過去形で出来事を順に並べると、生き生きとした文章になります。時制の選び方は、文法のルールであると同時に、物語を組み立てるための道具でもあるのです。' }
  });

  /* ===== 未来表現 ===== */
  add('e_fut', {
    rx: [
      { err: '未来のことはすべて will で書き、すでに決めてある予定や準備中の計画まで will にしてしまう(友だちに「来週、京都に行く予定だよ。チケットも買った」と言うのに I will go to Kyoto next week.)。',
        why: '日本語の「〜するつもり」「〜する予定」「〜するよ」をすべて will と結びつけ、「いつ決めたのか」を考えていないからです。',
        fix: '前から決めていた予定や計画は be going to、その場で決めたことや予想・申し出は will と考えます。「その話をする前から決まっていたか」を自分にたずねて選びます。',
        q: '場面に合うほうを選ぼう。(電話が鳴って)"Oh, the phone is ringing." "I (will / am going to) get it."', a: 'will',
        exp: '電話が鳴ったのを聞いて、その場で「ぼくが出るよ」と決めているので will が自然です。前から決めていた予定ではないので、be going to は合いません。' },
      { err: '「明日〜したら」の if・when の文に will を入れてしまう、または主節の will まで消してしまう(× If it will be sunny, we go. のように逆にする)。',
        why: '「if の中は現在形」というルールを、文全体に当てはめたり、どちらが if の中なのかを確かめていなかったりするからです。',
        fix: 'まず if・when が付いている部分を囲みます。囲みの中は現在形、囲みの外(主節)は未来の will、と場所ごとに分けて考えます。',
        q: '( )内の語を正しい形にしよう。When my father (come) home tomorrow, I (give) him this present.', a: 'comes / will give',
        exp: 'when のついた部分は、未来のことでも現在形で表すので comes です。主節「プレゼントをあげる」は未来のことなので will give にします。' },
      { err: 'be going to の疑問文・否定文で、going を動かしたり、do を加えたりする(× Do you going to visit 〜? × I don\'t going to 〜.)。',
        why: 'be going to を1つの長い動詞のように覚えていて、中に be動詞がふくまれていることを意識していないからです。',
        fix: 'be going to の中の be動詞(am・is・are)だけを動かします。疑問文は be動詞を前へ、否定文は be動詞のあとに not。going to 以下はそのまま残します。',
        q: '疑問文にしよう。Your sister is going to study abroad.', a: 'Is your sister going to study abroad?',
        exp: 'be going to の文では、be動詞の is を主語の前に出すだけで疑問文になります。going to study abroad の部分はそのままです。do・does は使いません。' }
    ],
    essay: [{ q: '中学校を卒業したあとの春休みに、あなたがしたいこと・する予定のことを英語で書きなさい。予定を1つ以上 be going to で、予想や決意を1つ以上 will で書き、理由もふくめること。', limit: '25〜35語',
      hint: 'I\'m going to 〜 during the spring vacation. で予定を示し、I think it will be 〜. / I will 〜. で予想や決意を述べます。because を使って理由を加えましょう。',
      model: 'I\'m going to visit my grandmother in Okinawa during the spring vacation. I will swim in the sea with my cousins because I love the ocean. I think it will be a great trip.',
      points: [['予定を be going to、予想・決意を will で書き分けている', 4], ['理由が書かれ、内容に一貫性がある', 2], ['will・be going to のあとを原形にしている', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'I going to visit のように be動詞を落としたり、I will swimming のように原形にしなかったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。My brother will ( ) fifteen next month.', choices: ['is', 'be', 'being', 'are'], a: 'B(be)', exp: 'will のあとは動詞の原形です。be動詞の原形は be なので、will be fifteen(15歳になる)とします。' },
      { q: '否定文にしよう。We will have a test tomorrow.', a: 'We won\'t(will not) have a test tomorrow.', exp: 'will の否定は will not、短縮形は won\'t です。willn\'t とはしないので注意しましょう。' },
      { q: '( )に入る語を選ぼう。"Are you going to play tennis this afternoon?" "Yes, I ( )."', choices: ['will', 'am', 'do', 'going'], a: 'B(am)', exp: 'Are you going to 〜? には、be動詞を使って Yes, I am. / No, I\'m not. と答えます。' },
      { q: '「明日は雨が降るでしょう」を will を使って英語にしよう。', a: 'It will rain tomorrow.(It will be rainy tomorrow.)', exp: '天気の予想は will で表せます。天気の文の主語は it です。rain は動詞として使えるので It will rain. と言えます。' },
      { q: '( )に入る語を選ぼう。Look at those dark clouds. It ( ) rain soon.', choices: ['is going to', 'goes to', 'will be', 'is'], a: 'A(is going to)', exp: '目の前の黒い雲という根拠から「もうすぐ降りそうだ」と予想するときは、be going to がよく使われます。will be rain という形はありません。' },
      { q: '下線部をたずねる疑問文を作ろう。They are going to stay in London for a week.(下線:for a week)', a: 'How long are they going to stay in London?', exp: '期間をたずねるので How long を先頭に置き、are they going to stay と be going to の疑問文の語順を続けます。' },
      { q: '( )に入る語を選ぼう。"This bag is too heavy for me." "OK. I ( ) carry it for you."', choices: ['am', 'will', 'am going', 'do'], a: 'B(will)', exp: '相手の言葉を聞いて、その場で「ぼくが運ぶよ」と申し出ているので will が自然です。前から決めていた予定ではありません。' },
      { q: '( )内の語を正しい形にしよう。If you (be) free next Sunday, let\'s go fishing.', a: 'are', exp: 'if の中は、未来のことでも現在形で表します。主語 you に合わせて are にします。will be にはしません。' },
      { q: '( )に入る語を選ぼう。The next train ( ) at 10:15, so we have to hurry.', choices: ['leave', 'leaves', 'leaving', 'is leave'], a: 'B(leaves)', exp: '時刻表で決まっている出発時刻のように、変わらない予定は現在形で表すことができます。主語 the next train は三人称単数なので leaves です。' },
      { q: '次の英文の誤りを2か所直そう。I am going to visiting my uncle tomorrow, and he will takes me to the museum.', a: 'visiting → visit / takes → take', exp: 'be going to の to は不定詞の to なので、後ろは原形の visit です。will も助動詞なので、主語が he でも原形の take を使います。どちらも「後ろは原形」というルールで直せます。' }
    ],
    link: { prev: '助動詞 can の「後ろは原形」というルール、be動詞の使い分け、不定詞の to のイメージが土台です。',
      next: 'will の過去形 would は、丁寧な依頼(Would you 〜?)や仮定法(I would 〜 if …)につながります。if・when の中の現在形は、接続詞の単元でさらに深く学びます。',
      cross: [['国語', '日本語には英語の will のような「未来形」がなく、「明日行く」のように現在の形で未来を表します。英語と比べることで、日本語の時の表し方の特徴が見えてきます。'], ['理科', '天気予報の英語では、It will be sunny. のように will で予想を表します。科学的な予測を述べるときにも、確信の度合いに合わせて will や may を使い分けます。']],
      univ: '言語学では、英語にはじつは「未来時制」という動詞の変化がなく、will などの助動詞で未来を表している、という考え方があります。経済の予測や科学の論文でも、確かさに応じた未来の言い方の選び方が大切です。',
      readT: 'will と「意志」の深い関係',
      read: 'will という単語は、助動詞のほかに名詞としても使われ、「意志」という意味をもちます。Where there is a will, there is a way.(意志あるところに道は開ける)ということわざがあります。じつは助動詞の will は、もともと「〜したいと思う」「〜しようと望む」という意味の動詞でした。それが長い時間をかけて「〜するだろう」という未来を表す言葉に変わっていったと考えられています。だから今でも、I will help you.(手伝うよ)のように、話し手の意志がこもった使い方が残っているのです。また、名詞の will には「遺言」という意味もあります。亡くなった人が「こうしてほしい」と望んだことを書き残したもの、という意味で、やはり「意志」とつながっています。1つの単語の意味の広がりをたどると、言葉が生き物のように変わってきたことがわかります。' }
  });

  /* ===== 助動詞 ===== */
  add('e_m3', {
    rx: [
      { err: '助動詞を「意味だけ」で選び、その場面の強さや相手との関係を考えずに使う(先生に対して You must check my answer. と頼む)。',
        why: 'must を「〜しなければならない」と訳語だけで覚えていて、話し手が強く命じる言い方だという「気持ちの強さ」を意識していないからです。',
        fix: '助動詞を選ぶときは、意味に加えて「どのくらい強い言い方か」「相手はだれか」を考えます。目上の人に頼むときは Could you 〜? / Would you 〜? を使います。',
        q: '先生に「私の答えを確認していただけますか」とていねいに頼む英文を書こう。', a: 'Could(Would) you check my answer?',
        exp: '目上の人に頼むときは、過去形の助動詞を使った Could you 〜? / Would you 〜? が、ていねいな言い方です。You must 〜 は相手に強く命じる言い方なので、頼むときには使いません。' },
      { err: 'have to を助動詞と同じように扱い、否定文・疑問文で have を動かしてしまう(× Have you to go? × She hasn\'t to work.)。',
        why: 'must = have to と意味で結びつけて覚えたため、形も must と同じように扱えると思っているからです。have to の have は一般動詞です。',
        fix: 'have to は「一般動詞 have + to」と考え、否定文は don\'t・doesn\'t、疑問文は Do・Does を使います。過去なら didn\'t・Did です。',
        q: '疑問文にしよう。Your brother has to get up early.', a: 'Does your brother have to get up early?',
        exp: 'has to の has は一般動詞なので、疑問文では Does を主語の前に置き、has を原形の have に戻します。Has your brother to 〜? とはしません。' },
      { err: 'should を「〜すべきだ」という強い義務だと思い、友だちへの軽いアドバイスや自分の意見に使うのをためらう、または逆に must で強く言いすぎる。',
        why: '日本語の「〜すべきだ」が強い響きをもつため、should も同じ強さだと思っているからです。英語の should は「〜したほうがいい」という、おだやかな助言によく使われます。',
        fix: '助言・提案なら should、規則や強い必要なら must / have to、と強さで使い分けます。I think you should 〜. とすると、さらにやわらかい助言になります。',
        q: '風邪ぎみの友だちに「今夜は早く寝たほうがいいよ」と助言する英文を書こう。', a: 'You should go to bed early tonight.',
        exp: '友だちへの助言には should が自然です。must を使うと「早く寝なさい」という強い命令の響きになります。I think you should 〜 と言えば、さらにやわらかく伝えられます。' }
    ],
    essay: [{ q: 'あなたの学校で「授業中のスマートフォンの使い方」についてルールを作ることになりました。生徒が守るべきこと、してはいけないこと、してもよいことを、助動詞(must・must not・should・can など)を3種類以上使って英語で提案しなさい。', limit: '30〜40語',
      hint: 'Students must 〜. / Students must not 〜. / They can 〜. / We should 〜. のように、強さのちがう助動詞を使い分けます。最後に理由を一言加えると説得力が出ます。',
      model: 'I have three ideas for the rules. Students must turn off their phones during class. They must not send messages to friends. They can use them in an emergency. We should follow these rules to study well.',
      points: [['ルールの提案として内容がまとまり、理由がある', 2], ['3種類以上の助動詞を意味に合わせて正しく使い分けている', 4], ['助動詞の後ろを原形にしている', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'Students must not to use 〜 のように助動詞のあとに to を入れたり、don\'t have to を「してはいけない」の意味で使ったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。You ( ) be quiet in the hospital.', choices: ['must', 'can\'t', 'don\'t have to', 'may not'], a: 'A(must)', exp: '病院の中では静かにしなければならないので、強い義務を表す must が合います。be quiet の be は be動詞の原形です。' },
      { q: '「あなたは今日、制服を着る必要はありません」を英語にしよう。', a: 'You don\'t have to wear your(a) school uniform today.', exp: '「〜する必要はない」は don\'t have to です。must not にすると「着てはいけない」という禁止の意味になってしまいます。' },
      { q: '( )に入る語を選ぼう。"May I come in?" "Yes, ( )."', choices: ['you may', 'I may', 'you must', 'I do'], a: 'A(you may)', exp: 'May I 〜? には、許可を与える側として Yes, you may. と答えます。友だちどうしなら Sure. などでもかまいません。' },
      { q: '( )内の語を正しい形にしよう。Yesterday I (have to) clean my room.', a: 'had to', exp: 'must には過去形がないので、過去の義務は have to の過去形 had to で表します。' },
      { q: '( )に入る語を選ぼう。"Must I finish this today?" "No, you ( )."', choices: ['mustn\'t', 'don\'t have to', 'can\'t', 'shouldn\'t'], a: 'B(don\'t have to)', exp: 'Must I 〜? に「いいえ、その必要はない」と答えるときは、No, you don\'t have to. を使います。No, you mustn\'t. だと「してはいけない」という意味になってしまいます。' },
      { q: '2文がほぼ同じ意味になるように( )に1語入れよう。Don\'t swim in this river. = You ( ) not swim in this river.', a: 'must', exp: '否定の命令文 Don\'t 〜 は、「〜してはいけない」という強い禁止の must not で言いかえられます。' },
      { q: '( )に入る語を選ぼう。( ) I open the window? — Yes, please.', choices: ['Shall', 'Must', 'Will', 'Should'], a: 'A(Shall)', exp: 'Shall I 〜? は「(私が)〜しましょうか」と申し出る表現です。Yes, please.(はい、お願いします)という応答と合います。' },
      { q: '( )に入る語を選ぼう。He ran for two hours without a break. He ( ) be tired.', choices: ['must', 'can\'t', 'doesn\'t have to', 'shall'], a: 'A(must)', exp: '休まずに2時間走ったという根拠から「疲れているにちがいない」と強く推量しているので、must が合います。この must は義務ではなく推量の意味です。' },
      { q: '次の文を、意味を変えずに have to を使って書きかえよう。My sister must leave home at seven.', a: 'My sister has to leave home at seven.', exp: '肯定文の must は have to で言いかえられます。主語 my sister は三人称単数なので has to になります。' },
      { q: '次の英文の誤りを2か所直そう。You don\'t must eat here, but you can to drink water.', a: 'don\'t must → must not(mustn\'t) / can to drink → can drink', exp: '助動詞 must の否定は must not で、do は使いません。can も助動詞なので、後ろに to をつけず原形 drink を置きます。助動詞の文には do も to も入れないことがポイントです。' }
    ],
    link: { prev: 'can と will で学んだ「助動詞 + 原形」「助動詞を前に出して疑問文」のルールが、そのまま must・may・should にも当てはまります。',
      next: '助動詞は、受動態(must be done)、現在完了(must have done:高校)、仮定法(would・could)へと広がります。Could you 〜? などのていねいな依頼は、会話表現の単元で使います。',
      cross: [['国語', '日本語の敬語のように、英語でも助動詞の選び方でていねいさが変わります。Can you 〜? より Could you 〜? のほうがていねいなのは、日本語の「〜して」「〜していただけますか」の差に似ています。'], ['社会', '法律や校則の英語では、must や shall で義務を、may で許可を表します。条文の書き方には、まちがいなく伝えるための決まりがあります。']],
      univ: '規格や契約書では、shall や must(必須)・should(推奨)・may(任意)のように、助動詞ごとに義務の強さを決めて書く習慣があります。',
      readT: 'must と should のちがいが命を守る',
      read: 'インターネットのしくみを決める技術文書の中には、助動詞の意味を厳密に決めているものがあります。たとえば MUST は「必ず守らなければならない」、SHOULD は「特別な理由がなければ守るべき」、MAY は「してもしなくてもよい」という意味です。こうした文書では、大文字で書いて意味をはっきりさせることもあります。ふだんの会話では、must と should のちがいを少しまちがえても大きな問題にはなりません。しかし、世界中の技術者が同じ機械やしくみを作るときに、「必須」と「推奨」をとりちがえると、機器どうしがうまくつながらなかったり、安全にかかわる問題が起きたりするおそれがあります。小さな助動詞1つにも、「どのくらい強く求めているのか」という大切な情報がつまっているのです。助動詞の強さを意識して使い分けることは、正確に伝えるための第一歩です。' }
  });

  /* ===== 不定詞 ===== */
  add('e_m4', {
    rx: [
      { err: '「やるべき〜」「〜するための〜」のように名詞を説明する不定詞を、名詞から離れた位置に置いてしまう(× I have to do a lot of homework.(=やるべき宿題がたくさんある、のつもり))。',
        why: '不定詞の3用法を「訳し方」だけで覚えていて、「どの語を説明しているか」という文の中での位置を見ていないからです。have to は「〜しなければならない」という別の表現になってしまいます。',
        fix: '形容詞的用法の不定詞は、説明する名詞のすぐ後ろに置きます。「名詞 + to 〜」の並びになっているかを確かめます。',
        q: '「私にはやるべき宿題がたくさんあります」を英語にしよう。', a: 'I have a lot of homework to do.',
        exp: '「やるべき」は homework を説明する形容詞的用法なので、homework の直後に to do を置きます。I have to do a lot of homework. とすると「たくさん宿題をしなければならない」という別の意味になります。' },
      { err: '不定詞の後ろに「〜について書くための紙」「〜といっしょに遊ぶ友だち」の前置詞を落としてしまう(× a friend to play、× a pen to write)。',
        why: '日本語では「書くペン」「遊ぶ友だち」と言えるため、英語でも名詞と動詞の間の関係(何で書く?だれと遊ぶ?)を意識しないからです。',
        fix: '名詞を不定詞の後ろに戻して文にしてみます。write with a pen、play with a friend となるなら、前置詞 with を不定詞の後ろに残します。',
        q: '「私には話す相手がいません」を英語にしよう。', a: 'I have no one(nobody) to talk with(to).(I don\'t have anyone to talk with.)',
        exp: '「相手と話す」は talk with(to)someone です。名詞を後ろに戻すと前置詞が必要になるので、to talk with と前置詞を残します。to talk だけだと「話すための人」の関係があいまいになります。' },
      { err: 'It is 〜 to … の文で、「人にとって」の部分を of と for で迷ったり、文の最後に置いてしまったりする(× It is difficult to read this book for me.)。',
        why: '「〜にとって」をあとから付け足す日本語の感覚で書くため、for 〜 が「不定詞の意味上の主語」として to の直前に入ることを知らないからです。',
        fix: 'It is + 形容詞 + for 人 + to 〜. の語順を型として覚えます。「だれがするのか」を表す for 人 は、to の直前に置きます。',
        q: '「彼にとって早起きするのは簡単です」を英語にしよう。', a: 'It is easy for him to get up early.',
        exp: '「早起きする」のは彼なので、for him を to get up の直前に置きます。for のあとは目的格 him です。「for 人 to 〜」をひとまとまりの型として覚えましょう。' }
    ],
    essay: [{ q: '「中学生のうちに海外旅行をするべきか」について、あなたの考えを英語で書きなさい。理由を2つ挙げ、不定詞(to + 動詞の原形)を異なる用法で2回以上使うこと。', limit: '30〜40語',
      hint: 'I think junior high school students should 〜. で意見を示し、First, 〜. Second, 〜. で理由を2つ述べます。It is important to 〜. や to learn 〜(目的)などを入れると不定詞を自然に使えます。',
      model: 'I think junior high school students should travel abroad. First, it is a good chance to learn about other cultures. Second, they can use English to talk with many people. They will want to study harder.',
      points: [['意見をはっきり述べ、理由を2つ挙げている', 3], ['不定詞を異なる用法で2回以上、正しく使っている', 3], ['理由が意見を支え、論理がつながっている', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'to traveled や to studies のように to のあとを原形にしない答えや、理由が「楽しいから」の1つだけで2つ目がない答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。I want ( ) a doctor in the future.', choices: ['be', 'to be', 'being', 'to being'], a: 'B(to be)', exp: 'want は後ろに不定詞をとる動詞です。「医者になりたい」は want to be a doctor です。be動詞の原形 be を使います。' },
      { q: '次の文の不定詞の用法を答えよう。She went to the library to borrow some books.', a: '副詞的用法(目的:〜するために)', exp: 'to borrow some books は「本を借りるために」と、図書館に行った目的を表しています。動詞 went を説明する副詞的用法です。' },
      { q: '( )に入る語を選ぼう。Do you have anything ( )?', choices: ['drink', 'to drink', 'drinking', 'drank'], a: 'B(to drink)', exp: '「何か飲むもの」は anything を後ろから説明する形容詞的用法 to drink で表します。' },
      { q: '「私はその知らせを聞いて悲しかった」を英語にしよう。', a: 'I was sad to hear the news.', exp: '感情を表す形容詞(sad・happy・surprised など)のあとの不定詞は、「〜して」と感情の原因を表します。副詞的用法の1つです。' },
      { q: '2文がほぼ同じ意味になるように( )に1語ずつ入れよう。Playing the guitar is fun. = It is fun ( ) ( ) the guitar.', a: 'to play', exp: '動名詞の主語は、It is 〜 to … の形で言いかえられます。It は仮の主語で、本当の主語は to play the guitar です。' },
      { q: '( )に入る語を選ぼう。My dream is ( ) around the world.', choices: ['travel', 'to travel', 'traveled', 'travels'], a: 'B(to travel)', exp: '「私の夢は世界を旅することです」の「〜すること」は、be動詞のあとに置く名詞的用法(補語)です。' },
      { q: '下線部の不定詞と同じ用法のものを選ぼう。I have a lot of things to do today.', choices: ['I like to read books.', 'He came here to see me.', 'Give me something to eat.', 'I was glad to meet you.'], a: 'C(Give me something to eat.)', exp: '問題文の to do は things を説明する形容詞的用法です。C の to eat も something を説明しているので同じ用法です。A は名詞的用法、B と D は副詞的用法です。' },
      { q: '( )内の語を並べかえよう。(to / for / is / necessary / us / it) save water.', a: 'It is necessary for us to save water.', exp: 'It is + 形容詞 + for 人 + to 〜 の型です。「私たちにとって水を節約することは必要だ」という意味になります。' },
      { q: '「彼は私に駅まで車で送ってくれるよう頼みました」となるように、( )に適語を入れよう。He asked me ( ) ( ) him to the station.', a: 'to drive(to take)', exp: 'ask 人 to 〜 で「人に〜するよう頼む」という意味です。「車で送る」は drive 人 to 〜 で表せます。to の後ろは原形で、人は ask の直後に置きます。' },
      { q: '次の英文の誤りを2か所直そう。I went to the park for play tennis, and it was exciting for me play there.', a: 'for play → to play / for me play → for me to play', exp: '「〜するために」という目的は to + 原形で表し、for + 原形とはしません。また It is 〜 for 人 to … の型では、for me のあとに to を置く必要があります。' }
    ],
    link: { prev: '動詞の原形と、will・can など助動詞の後ろに原形を置くルールが土台です。want to 〜、like to 〜 などの表現は中1から使ってきました。',
      next: '不定詞は、動名詞との使い分け、疑問詞 + to 〜(how to 〜)、want 人 to 〜、too 〜 to …、enough to 〜 などへ発展します。高校では完了不定詞や独立不定詞も学びます。',
      cross: [['国語', '日本語の「〜すること」「〜するための」「〜するために」は、それぞれ名詞・連体修飾・連用修飾のはたらきです。不定詞の3用法は、国語の文法で学ぶ品詞のはたらきと重なります。'], ['社会', '目的を述べる to 〜(〜するために)は、政策や活動の説明でよく使われます。The government built a dam to prevent floods.(洪水を防ぐためにダムを作った)のように、目的と手段を結びます。']],
      univ: '論文や報告書では、The purpose of this study is to 〜.(この研究の目的は〜することだ)のように、不定詞を使って目的を示すのが定番です。大学で英語の論文を読むときにも、不定詞は欠かせません。',
      readT: '「to」はもともと「〜へ」だった',
      read: '不定詞の to と、前置詞の to(〜へ)は同じつづりです。これは偶然ではありません。昔の英語では、動詞を名詞のように使う形があり、その前に「〜へ向かって」を表す to を置いて、「〜することに向かって」という意味を表していました。これが今の不定詞のもとになったと考えられています。だから不定詞には、今でも「これから〜する方向へ」という感じが残っています。I want to go.(行くことのほうへ気持ちが向いている)や、I went there to study.(勉強するという目的に向かって行った)を思いうかべると、イメージがつかみやすいでしょう。一方、enjoy や finish が to をとらないのは、「すでにしていること」を表すからだと説明されることがあります。to の歴史を知ると、不定詞と動名詞の使い分けも、少し理屈で考えられるようになります。' }
  });

  /* ===== 動名詞 ===== */
  add('e_ger', {
    rx: [
      { err: '文の最初に動詞を置いて「〜することは」の意味にしようとし、原形のまま主語にしてしまう(× Read books is fun. × Swim in the sea is dangerous.)。',
        why: '日本語では「本を読むのは楽しい」と動詞をそのまま主語にできるため、英語でも動詞の形を変えずに主語にできると思っているからです。',
        fix: '動詞を主語にしたいときは、ing をつけて名詞の仲間(動名詞)にします。または It is 〜 to … の形を使います。文の最初が動詞の原形になっていたら、命令文になっていないか確かめます。',
        q: '「海で泳ぐことは危険なことがあります」を、動名詞を主語にして英語にしよう。', a: 'Swimming in the sea can be dangerous.',
        exp: '「泳ぐこと」を主語にするので、swim に ing をつけて Swimming にします(m を重ねます)。原形 Swim で始めると「泳ぎなさい」という命令文に見えてしまいます。can be は「〜なこともある」という意味です。' },
      { err: '「〜するのを楽しみにしている」の look forward to のあとを原形にしてしまう(× I\'m looking forward to see you.)。',
        why: 'to を見ると、すぐに「to + 原形(不定詞)」だと判断してしまうからです。この to は「〜へ」という前置詞の to です。',
        fix: 'to のあとに名詞(the party など)を置けるかを試します。置けるなら前置詞の to なので、動詞は ing形にします。look forward to the party → look forward to seeing you です。',
        q: '( )内の語を正しい形にしよう。We are looking forward to (visit) your school.', a: 'visiting',
        exp: 'look forward to the trip のように to のあとに名詞が置けるので、この to は前置詞です。前置詞のあとの動詞は動名詞にするので、visiting になります。' },
      { err: '動名詞を「進行形の ing」と同じものだと考え、be動詞のあとの ing をすべて「〜している」と訳してしまう(My hobby is collecting stamps. を「私の趣味は切手を集めている」と訳す)。',
        why: 'ing形が出てくるたびに「〜している」と訳す習慣がついていて、その文で ing形が「名詞」として使われているのか、「進行形」なのかを見分けていないからです。',
        fix: '主語と ing形を「=」で結べるか確かめます。My hobby = collecting stamps(趣味=切手集め)のように、主語が人以外で ing形が主語の中身を説明しているなら、動名詞「〜すること」と訳します。',
        q: '次の文を日本語にしよう。Her job is teaching music to children.', a: '彼女の仕事は、子どもたちに音楽を教えることです。',
        exp: '主語 her job(仕事)は自分で教える動作をしないので、進行形ではありません。her job = teaching music の関係なので、teaching は「教えること」という動名詞です。' }
    ],
    essay: [{ q: '「放課後の時間の使い方」について、あなたがいちばん大切だと思う過ごし方とその理由を英語で書きなさい。動名詞を2回以上使い、そのうち1回は前置詞のあとに置くこと。', limit: '30〜40語',
      hint: 'I think spending time 〜 is important. / I am interested in 〜ing. / by 〜ing などを使います。理由は because や For example で具体的にしましょう。',
      model: 'I think reading books is the best way to spend time after school. By reading many books, we can learn new words and ideas. I am also interested in writing my own stories in the future.',
      points: [['意見と理由が明確で、内容に一貫性がある', 3], ['動名詞を2回以上使い、前置詞のあとにも正しく使っている', 4], ['主語の動名詞に合わせた動詞の形(is)が正しい', 1], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'Read books is important. のように原形を主語にしたり、interested in write のように前置詞のあとを原形にしたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。My father stopped ( ) three years ago.', choices: ['smoke', 'smoking', 'to smoke', 'smoked'], a: 'B(smoking)', exp: '「たばこを吸うのをやめた」は stop 〜ing です。stop to smoke にすると「たばこを吸うために立ち止まった」という別の意味になります。' },
      { q: '「英語を話すことは私にとって簡単ではありません」を、動名詞を主語にして英語にしよう。', a: 'Speaking English is not easy for me.', exp: '動名詞 Speaking English が主語です。動名詞の主語は単数として扱うので is を使います。' },
      { q: '( )に入る語を選ぼう。Thank you for ( ) me.', choices: ['help', 'to help', 'helping', 'helped'], a: 'C(helping)', exp: 'for は前置詞なので、後ろの動詞は動名詞 helping にします。Thank you for 〜ing で「〜してくれてありがとう」です。' },
      { q: '( )に入る語を選ぼう。I hope ( ) you again soon.', choices: ['seeing', 'to see', 'see', 'saw'], a: 'B(to see)', exp: 'hope はこれから先のことを望む動詞で、後ろに不定詞をとります。hope 〜ing とはしません。' },
      { q: '( )内の語を正しい形にしよう。How about (go) to the movies tonight?', a: 'going', exp: 'How about 〜? の about は前置詞なので、後ろは動名詞 going にします。「〜するのはどうですか」と誘う表現です。' },
      { q: '2文がほぼ同じ意味になるように( )に1語入れよう。She can skate well. = She is good at ( ).', a: 'skating', exp: '「〜が上手だ」は be good at 〜ing で表せます。at は前置詞なので skating です。skate は e をとって ing をつけます。' },
      { q: '( )に入る語を選ぼう。Don\'t forget ( ) the door when you go out.', choices: ['lock', 'locking', 'to lock', 'locked'], a: 'C(to lock)', exp: '「(これから)忘れずにかぎをかける」は forget to 〜 です。forget 〜ing は「(すでに)〜したことを忘れる」という意味になります。' },
      { q: '次の2文の下線部のうち、動名詞はどちらか。(a) He is watching TV. (b) His hobby is watching birds.', a: '(b)', exp: '(a)は彼が今テレビを見ている途中という進行形です。(b)は「彼の趣味=鳥を観察すること」なので、watching は名詞のはたらきをする動名詞です。' },
      { q: '( )内の語を並べかえよう。She left (saying / without / anything).', a: 'She left without saying anything.', exp: 'without 〜ing で「〜しないで」という意味です。without は前置詞なので後ろは動名詞です。「彼女は何も言わずに去った」となります。' },
      { q: '次の英文の誤りを2か所直そう。I finished to write the report, and I\'m thinking about go to bed.', a: 'to write → writing / go → going', exp: 'finish は動名詞をとる動詞なので finished writing にします。about は前置詞なので、後ろの動詞は going にします。動詞が何をとるかと、前置詞のあとの形の2点を確かめましょう。' }
    ],
    link: { prev: '進行形で学んだ ing形の作り方と、不定詞の名詞的用法(〜すること)が土台です。前置詞の後ろに名詞を置くというルールも使います。',
      next: '高校では、動名詞の意味上の主語(my coming)、完了動名詞(having done)、動名詞を使った慣用表現(There is no 〜ing など)を学びます。ing形は分詞の単元で「形容詞のはたらき」も学びます。',
      cross: [['国語', '日本語でも「読む」に「こと」をつけて「読むこと」とすると名詞のように使えます。英語の動名詞は、この「こと」を ing が担っていると考えるとわかりやすくなります。'], ['保健体育', 'スポーツの名前の多くは swimming・skiing・running のように動名詞の形をしています。「泳ぐこと」がそのまま競技の名前になっているのです。']],
      univ: '文法の研究では、動名詞は「動詞の性質(目的語をとる)」と「名詞の性質(主語になる)」の両方をもつ、境界上の語として注目されてきました。',
      readT: 'ing は2つの道から来た',
      read: '現在分詞(〜している)と動名詞(〜すること)は、今ではどちらも ing のつづりです。しかし、昔の英語では形がちがっていました。動作の名前を表す名詞の語尾は -ung や -ing、現在分詞の語尾は -ende などで、別のものだったのです。それが時代とともに発音が近づき、最後には同じ -ing にまとまったと考えられています。英語の歴史を研究する人たちは、この2つの合流が、英語の進行形の発達にもかかわったのではないかと考えています。たとえば昔の英語には、He is on hunting.(彼は狩りの最中だ)のような言い方があり、on が弱まって消えて He is hunting. になった、という説明もあります。今、動名詞と進行形の見分けに苦労するのは、もとは別々だった2つが同じ形になってしまったからなのです。' }
  });

  /* ===== 比較 ===== */
  add('e_m5', {
    rx: [
      { err: '比べる2つのものの「種類」がそろっていないのに、そのまま比べてしまう(× My bag is bigger than you.(私のかばんはあなたのより大きい、のつもり))。',
        why: '日本語では「あなたより大きい」と言っても、文脈で「あなたのかばんより」とわかるため、英語でも比べる相手を省略しても通じると思っているからです。',
        fix: '比較の文を書いたら、than のあとに来るものが主語と同じ種類か確かめます。かばんとかばん、人と人をそろえます。かばんなら yours(あなたのもの)とします。',
        q: '「この町の人口は私の町の人口より多い」を英語にしよう。', a: 'The population of this town is larger than that of my town.',
        exp: '比べるのは「人口」と「人口」です。2回目の population は that に置きかえて that of my town とします。また、人口の多い少ないは many ではなく large・small で表します。' },
      { err: '「〜の中でいちばん」の in と of を、後ろの語を見ずにどちらか一方に決めて使ってしまう(× the tallest of my class、× the best in all the songs)。',
        why: '「in は場所、of は数」というルールを知っていても、class や family が「場所・集団」、all・the three が「仲間の数」であることを、語ごとに判断していないからです。',
        fix: 'of のあとには「仲間の数」(all, the three, us など、そのグループのメンバーを並べられるもの)、in のあとには「範囲・集団」(my class, Japan, the world など)が来る、と後ろの語で確かめます。',
        q: '( )に in か of を入れよう。(1) This is the oldest temple ( ) Kyoto. (2) Ken runs the fastest ( ) the five boys.', a: '(1) in (2) of',
        exp: '(1)の Kyoto は範囲を表す場所なので in です。(2)の the five boys は「5人の少年」という仲間の数なので of です。後ろが複数のメンバーを表すかどうかで判断しましょう。' },
      { err: '「…倍」「…分の1」の言い方を、日本語の順番どおりに並べてしまう(× This box is as twice heavy as that one.)。',
        why: '日本語では「2倍重い」と言うので、twice を形容詞の直前に置きたくなるからです。英語では倍数は as 〜 as のかたまりの前に置きます。',
        fix: '倍数(twice、three times など)は、as 〜 as のかたまり全体の前に置きます。「倍数 + as + 形容詞 + as + 比べる相手」の型で書きます。',
        q: '「この川はあの川の3倍の長さです」を英語にしよう。', a: 'This river is three times as long as that one.',
        exp: '倍数 three times を as long as のかたまりの前に置きます。「2倍」は twice、「半分」は half を同じ位置に置きます。that one は that river のことです。' }
    ],
    essay: [{ q: '「本で調べる」と「インターネットで調べる」では、どちらが中学生の調べ学習に向いていると思いますか。比較級を2回以上使って比べながら、あなたの考えを英語で書きなさい。', limit: '30〜40語',
      hint: 'I think 〜 is better than … for students. で意見を示し、faster・easier・more useful・more reliable などの比較級で理由を2つ述べます。than のあとの比べる相手をそろえましょう。',
      model: 'I think using books is better than using the Internet for school research. Information in books is usually more reliable. Also, we can read more carefully when we use books, so we can understand the topic better.',
      points: [['どちらがよいかをはっきり示し、理由が2つある', 3], ['比較級を2回以上正しい形で使っている', 3], ['than のあとの比べる対象がそろっている', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'more easier のように more と -er を重ねたり、books are better than the Internet なのか using books なのか比べる対象がぶれたりする答えは減点されます。' }],
    test: [
      { q: 'big の比較級・最上級を書こう。', a: 'bigger / biggest', exp: 'big は「短い母音 + 子音字1つ」で終わるので、g を重ねて er・est をつけます。hot - hotter - hottest も同じです。' },
      { q: '( )に入る語を選ぼう。This question is ( ) than that one.', choices: ['difficult', 'more difficult', 'most difficult', 'difficulter'], a: 'B(more difficult)', exp: 'difficult のような長い語は、前に more をつけて比較級にします。than があるので比較級です。' },
      { q: '「私の姉は母と同じくらいの背の高さです」を英語にしよう。', a: 'My sister is as tall as my mother.', exp: '「同じくらい〜」は as + 形容詞の原級 + as で表します。間の tall は比較級にしません。' },
      { q: '( )に入る語を選ぼう。Which do you like ( ), dogs or cats?', choices: ['good', 'well', 'better', 'best'], a: 'C(better)', exp: '2つのうち「どちらのほうが好きか」は like 〜 better です。3つ以上なら like 〜 (the) best を使います。' },
      { q: '2文がほぼ同じ意味になるように( )に1語ずつ入れよう。Tom is taller than Mike. = Mike is not ( ) tall ( ) Tom.', a: 'as / as', exp: '「マイクはトムほど背が高くない」は not as 〜 as で表します。not as 〜 as は「〜ほど…ではない」という意味です。' },
      { q: '( )に入る語を選ぼう。Mt. Fuji is higher than ( ) other mountain in Japan.', choices: ['all', 'any', 'many', 'some'], a: 'B(any)', exp: '比較級 + than any other + 単数名詞 で「ほかのどの〜よりも…」という意味になり、最上級と同じ内容を表します。other のあとの mountain が単数形であることにも注意しましょう。' },
      { q: '( )に入る語を選ぼう。This is one of the most famous ( ) in the world.', choices: ['picture', 'pictures', 'a picture', 'the picture'], a: 'B(pictures)', exp: 'one of the + 最上級 + 複数名詞 で「最も〜なものの1つ」です。いくつかある中の1つなので、名詞は複数形にします。' },
      { q: '( )内の語を正しい形にしよう。My new computer works (well) than my old one.', a: 'better', exp: 'well(上手に、よく)の比較級は better です。good と同じ形になる不規則変化です。works を説明する副詞なので well をもとにします。' },
      { q: '下の表を見て、( )に適語を入れよう。〔A市の人口:20万人、B市の人口:10万人〕 A city has ( ) as many people as B city.', a: 'twice', exp: 'A市の人口は B市の2倍なので、twice as many people as と表します。倍数は as 〜 as の前に置きます。' },
      { q: '次の英文の誤りを2か所直そう。This is the most hottest day of this year, and it is more hotter than yesterday.', a: 'most hottest → hottest / more hotter → hotter', exp: 'hot の最上級は hottest、比較級は hotter です。-est・-er の形にさらに most・more を重ねることはしません。「どちらか一方だけ」がルールです。' }
    ],
    link: { prev: '形容詞と副詞のはたらき、be動詞と一般動詞の文の形が土台です。比較の文は、ふつうの文の形容詞・副詞の部分を変化させて作ります。',
      next: '高校では、the + 比較級, the + 比較級(〜すればするほど…)、no more than などの比較の慣用表現を学びます。表やグラフの英語を読むときにも、比較の表現は欠かせません。',
      cross: [['数学', 'A > B、A = B、A < B という不等号・等号の関係は、比較級・as 〜 as・not as 〜 as にそれぞれ対応します。倍数の表現は、割合の考え方そのものです。'], ['社会', '人口や面積、生産量などの統計グラフを英語で説明するときは、larger than・the largest・twice as 〜 as などの比較表現を使います。']],
      univ: 'データの分析を英語で発表するときは、比較の表現が中心になります。科学の論文でも、実験結果を significantly higher than 〜(〜よりはっきり高い)のように比較で表すことがよくあります。',
      readT: 'なぜ good の比較級は better なのか',
      read: 'good - better - best、bad - worse - worst、many - more - most。よく使う形容詞ほど、比較級・最上級の形が不規則です。good と better は、つづりも音もまったく似ていません。これは、better や best がもともと good とは別の語から来ているためだと考えられています。古い時代の英語では、「よい」を表す形容詞の原級と、「よりよい」を表す比較級が、別々の言葉の組み合わせで使われていたのです。こうした現象は、ほかの言語にもよく見られます。たとえばフランス語でも、bon(よい)の比較級は meilleur という別の形になります。よく使われる語は人々の口に何度ものぼるため、古い形がすり減らずに残ったり、別の語と組み合わさったりしやすいのです。be動詞や go - went と同じように、不規則な形は、言葉がよく使われてきた証拠だといえます。' }
  });

  /* ===== 受動態 ===== */
  add('e_m6', {
    rx: [
      { err: '受動態にするとき、能動態の目的語がない文(自動詞の文)まで無理に受動態にしてしまう(× The accident was happened yesterday. × He was died.)。',
        why: '「〜された」「〜が起きた」のような日本語の訳から考えて、もとの動詞が目的語をとる動詞かどうかを確かめていないからです。happen・die・arrive などは目的語をとりません。',
        fix: '受動態にできるのは、能動態で「〜を」にあたる目的語がある動詞だけです。もとの文で「(何か)を+動詞」と言えるかを確かめます。言えないなら、能動態のままにします。',
        q: '「その事故は昨日起きました」を英語にしよう。', a: 'The accident happened yesterday.',
        exp: 'happen(起こる)は目的語をとらない動詞なので、受動態にできません。「起きた」は過去形 happened だけで表します。was happened とするのはよくあるまちがいです。' },
      { err: '受動態の時制を be動詞で表すことを忘れ、過去分詞のほうで時を変えようとする(× This house is built ten years ago.)。',
        why: '過去分詞と過去形の形が似ているため、過去分詞を使えば過去を表せると思っているからです。受動態の「時」は be動詞が表します。',
        fix: '受動態の文では、まず時を表す語(ago・yesterday・now など)を見て、be動詞の形(is・are / was・were / will be)を決めます。過去分詞はいつも同じ形のままです。',
        q: '( )内の語を使って正しい受動態の文にしよう。This bridge (build) about 100 years ago.', a: 'This bridge was built about 100 years ago.',
        exp: 'about 100 years ago(約100年前)なので、be動詞を過去形 was にします。built は build の過去分詞で、時制にかかわらずこの形です。is built だと「今作られている」という意味になります。' },
      { err: '受動態に書きかえるとき、能動態の動詞の時制や助動詞を落としてしまう(Many people will visit the museum. → × The museum is visited by many people.)。',
        why: '「be動詞 + 過去分詞」の型にあてはめることに集中して、もとの文にあった will や過去の時制を引きつがないからです。',
        fix: '書きかえる前に、もとの文の時制(現在・過去・未来)と助動詞に印をつけます。受動態でも同じ時・同じ助動詞を使い、助動詞のあとは be(原形)にします。',
        q: '受動態に書きかえよう。Many people will visit the museum.', a: 'The museum will be visited by many people.',
        exp: 'もとの文に will があるので、受動態でも will を残します。助動詞のあとは原形なので、be動詞は be になり、will be visited となります。時制や助動詞は書きかえても変わりません。' }
    ],
    essay: [{ q: 'あなたの住む地域(または日本)の有名なもの(建物・食べ物・祭りなど)を1つ選び、外国の人に紹介する文を英語で書きなさい。受動態を2回以上使い、その特徴がわかるようにすること。', limit: '30〜40語',
      hint: '〜 was built in …. / 〜 is made from …. / 〜 is loved by …. / 〜 is held every 〜. などの受動態が使えます。いつ・何から・だれに、などの情報を加えましょう。',
      model: 'Let me introduce Himeji Castle. It was built about four hundred years ago. It is also called White Heron Castle because it looks white and beautiful. It is visited by many people from all over the world.',
      points: [['紹介する対象とその特徴が具体的に伝わる', 3], ['受動態を2回以上、時制に合わせて正しく使っている', 4], ['過去分詞の形が正しい', 1], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'It built 400 years ago. のように be動詞を落としたり、It was build のように過去分詞をまちがえたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。English is ( ) in many countries.', choices: ['speak', 'spoke', 'spoken', 'speaking'], a: 'C(spoken)', exp: '「英語は多くの国で話されている」なので受動態 is spoken です。speak の過去分詞は spoken です。' },
      { q: 'take・give・see の過去分詞をそれぞれ書こう。', a: 'taken / given / seen', exp: 'どれも不規則動詞です。take - took - taken、give - gave - given、see - saw - seen と3つの形をセットで覚えましょう。' },
      { q: '受動態に書きかえよう。My mother made this cake.', a: 'This cake was made by my mother.', exp: 'もとの文が過去形なので was を使います。目的語 this cake を主語にし、もとの主語は by my mother とします。' },
      { q: '( )に入る語を選ぼう。The top of the mountain is covered ( ) snow.', choices: ['by', 'with', 'in', 'from'], a: 'B(with)', exp: '「〜でおおわれている」は be covered with 〜 です。by 以外の前置詞をとる受動態の決まった言い方です。' },
      { q: '「この部屋は毎日そうじされますか」を英語にしよう。', a: 'Is this room cleaned every day?', exp: '受動態の疑問文は、be動詞を主語の前に出します。every day なので現在形の Is を使います。Does は使いません。' },
      { q: '( )に入る語を選ぼう。Butter is made ( ) milk.', choices: ['of', 'from', 'by', 'with'], a: 'B(from)', exp: 'バターは牛乳から作られ、もとの材料の形が変わっています。このように原料が変化するときは be made from 〜 を使います。形が残る材料なら of です。' },
      { q: '下線部をたずねる疑問文を作ろう。This letter was written by Natsume Soseki.(下線:Natsume Soseki)', a: 'Who was this letter written by?(By whom was this letter written?)', exp: '「だれによって」をたずねるので Who を先頭に置き、was this letter written by と受動態の疑問文の語順にします。前置詞 by は文の最後に残ります。' },
      { q: '受動態に書きかえよう。We call this flower "sakura."', a: 'This flower is called "sakura" (by us).', exp: 'call A B(A を B と呼ぶ)の受動態は A is called B です。一般の人を表す we・they が主語のときは、by us などはふつう省略します。' },
      { q: '( )内の語を正しい形にしよう。These pictures were (take) by my grandfather when he was young.', a: 'taken', exp: 'be動詞 were のあとに過去分詞を置いて受動態にします。take の過去分詞は taken です。' },
      { q: '次の英文の誤りを2か所直そう。This song is knowing by everyone, and it was sing at the festival last year.', a: 'is knowing by → is known to / was sing → was sung', exp: '「知られている」は be known to 〜 で、by ではなく to をとるのがふつうです。sing の過去分詞は sung なので was sung にします。過去分詞の形と前置詞の両方に注意が必要です。' }
    ],
    link: { prev: 'be動詞の使い分けと、過去形・不規則動詞の変化が土台です。受動態では、過去形と並んで「過去分詞」を使えることがかぎになります。',
      next: '過去分詞は、現在完了(have + 過去分詞)や分詞の形容詞的用法(a broken window)でも使われます。高校では、進行形の受動態(is being built)や完了形の受動態も学びます。',
      cross: [['理科', '実験レポートの英語では、Water was heated to 100℃.(水は100℃まで加熱された)のように、だれがしたかより「何が起きたか」を伝えるために受動態がよく使われます。'], ['社会', '歴史の説明では、The temple was built in the 8th century. のように、建てた人より建物を話題にしたいときに受動態を使います。ニュースでも、犯人がわからない事件は受動態で伝えます。']],
      univ: '科学論文では、伝統的に受動態が多く使われてきました。最近は We measured 〜 のように能動態で書くことを勧める学術誌も増えています。どちらで書くかは、何を主語にして話題の中心にしたいかで決まります。',
      readT: '受動態は「話題」を選ぶ道具',
      read: '「ダ・ヴィンチがモナ・リザを描いた」と「モナ・リザはダ・ヴィンチによって描かれた」。どちらも同じ出来事を表していますが、話題の中心がちがいます。前の文はダ・ヴィンチについての話、後ろの文は絵についての話です。英語には「すでに話に出てきた情報を文の前のほうに、新しい情報を後ろに置く」という傾向があると言われます。たとえば、美術館で絵の説明を読むとき、まず目の前の絵が話題になっているので、This painting was painted by 〜. と受動態で書くほうが自然です。また、だれがしたかわからないときや、言う必要がないときにも受動態は便利です。My bike was stolen.(自転車が盗まれた)では、盗んだ人がわからないので、by 〜 はありません。受動態は、能動態の書きかえ問題のための形ではなく、何を話題にするかを選ぶための大切な道具なのです。' }
  });

  /* ===== 接続詞 ===== */
  add('e_conj', {
    rx: [
      { err: '日本語の「〜けれど」「〜ので」をそのまま but・so に置きかえ、1つの文を but や so で始める短い文の連続にしてしまう(× I like soccer. But I can\'t play it well. So I practice every day.)。',
        why: '日本語では「でも」「だから」で文を始めるのが自然なため、英語でも接続詞を文頭に置けばよいと思っているからです。会話ではありますが、書き言葉では2つの文を1文につなぐのが基本です。',
        fix: '書き言葉では、and・but・so はコンマのあとに置いて2つの文を1文にします。文を分けたまま前の文とつなぎたいときは、However,(しかし)や Therefore,(だから)のような副詞を使う方法もあります。',
        q: '2文を but を使って1文にしよう。I like soccer. I can\'t play it well.', a: 'I like soccer, but I can\'t play it well.',
        exp: 'but は2つの文の間に置き、前にコンマをつけて1文にします。I like soccer. But 〜 と文を分けると、会話では通じても、作文では文が細切れになり、つながりが弱く見えます。' },
      { err: 'if と when を同じ意味だと思い、「必ず起きること」にも if を、「起きるかどうかわからないこと」にも when を使ってしまう(× If I become an adult, I will 〜.)。',
        why: 'どちらも「〜するとき・〜したら」と訳せるので、確かさのちがいを意識していないからです。',
        fix: '「その出来事が起きるのは確実か」を考えます。必ず起きること(大人になる・家に着く)は when、起きるかどうかわからないこと(雨が降る・時間がある)は if を使います。',
        q: '( )に if か when を入れよう。(1) ( ) I grow up, I want to be a nurse. (2) ( ) you have time, please help me.', a: '(1) When (2) If',
        exp: '(1)「大人になる」はいつか必ず起きることなので When です。(2)「時間があれば」はあるかどうかわからないので If です。日本語の訳だけでなく、出来事の確かさで選びましょう。' },
      { err: 'that 節の中の時制を、主節に合わせずに日本語の感覚で決めてしまう(× I thought that he is busy.(彼は忙しいと思った))。',
        why: '日本語では「彼は忙しいと思った」と、中身の「忙しい」を現在の形で言うため、英語でも that のあとを現在形にしたくなるからです。',
        fix: '主節の動詞が過去形(thought・knew・said など)のときは、that のあとの動詞も過去形にそろえるのが基本です。「思ったその時点で忙しかった」と考えます。',
        q: '「私は彼女が正しいとわかっていました」を英語にしよう。', a: 'I knew (that) she was right.',
        exp: '主節の knew が過去形なので、that 節の中も was にそろえます。日本語の「正しい」に引っぱられて is にしないよう注意しましょう。この that は省略することもできます。' }
    ],
    essay: [{ q: '「中学校に制服は必要か」について、賛成か反対かの立場を決め、あなたの考えを英語で書きなさい。because・if・but などの接続詞を3種類以上使い、反対の意見にもふれること。', limit: '35〜45語',
      hint: 'I think 〜 because …. で意見と理由を述べ、Some people say 〜, but …. で反対意見にふれて反論します。if を使って「もし〜なら」という例を入れると論理が深まります。',
      model: 'I think school uniforms are necessary because students don\'t have to think about clothes every morning. Some people say uniforms are expensive, but students can wear them for three years. If we have uniforms, we can also feel united as a school.',
      points: [['立場が明確で、理由が意見を支えている', 3], ['反対意見にふれ、それに反論している', 2], ['3種類以上の接続詞を意味に合わせて正しく使っている', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'Because students 〜. だけの文を独立させたり、because と so を1文の中でいっしょに使ったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。Hurry up, ( ) you\'ll miss the bus.', choices: ['and', 'or', 'so', 'because'], a: 'B(or)', exp: '命令文 + or 〜 で「〜しなさい、さもないと…」という意味です。命令文 + and 〜 なら「〜しなさい、そうすれば…」になります。' },
      { q: '( )に入る語を選ぼう。I stayed home ( ) I had a cold.', choices: ['so', 'but', 'because', 'if'], a: 'C(because)', exp: '「風邪をひいていた」は家にいた理由なので、原因を導く because を使います。' },
      { q: '「彼はとても親切だと思います」を that を使って英語にしよう。', a: 'I think (that) he is very kind.', exp: 'think のあとに that 節を置いて「〜だと思う」と表します。この that は省略されることがよくあります。' },
      { q: '( )に入る語を選ぼう。( ) I was walking in the park, I met an old friend.', choices: ['While', 'Because', 'If', 'But'], a: 'A(While)', exp: '「公園を歩いている間に」という時の流れなので、while が合います。while は進行形の文といっしょによく使われます。' },
      { q: '2文がほぼ同じ意味になるように( )に1語入れよう。Study hard, and you will pass the exam. = ( ) you study hard, you will pass the exam.', a: 'If', exp: '命令文 + and 〜(〜しなさい、そうすれば…)は、If 〜, you will … で言いかえられます。' },
      { q: '( )に入る語を選ぼう。I\'ll call you when I ( ) at the station.', choices: ['arrive', 'will arrive', 'arrived', 'arriving'], a: 'A(arrive)', exp: '時を表す when の中は、未来のことでも現在形で表します。主語 I に合わせて arrive です。' },
      { q: '( )に入る語を選ぼう。Not only Ken ( ) also his brothers ( ) good at singing.', choices: ['and / is', 'but / are', 'but / is', 'or / are'], a: 'B(but / are)', exp: 'not only A but also B は「A だけでなく B も」の意味です。動詞は B(his brothers)に合わせるので are になります。' },
      { q: '( )内の語を並べかえよう。I was (that / so / tired / I) went to bed early.', a: 'I was so tired that I went to bed early.', exp: 'so 〜 that … で「とても〜なので…」という意味です。so のあとに形容詞、that のあとに結果を置きます。' },
      { q: '( )に入る語を選ぼう。I\'m sure ( ) you will like this book.', choices: ['that', 'if', 'but', 'because'], a: 'A(that)', exp: 'be sure that 〜 で「きっと〜だと確信している」という意味です。感情や確信を表す形容詞のあとに that 節を置く形です。' },
      { q: '次の英文の誤りを2か所直そう。If it will be sunny tomorrow, we go hiking.', a: 'will be → is / go → will go', exp: 'if の中は未来のことでも現在形なので is にします。一方、主節の「ハイキングに行く」は明日のことなので will go にします。if の内側と外側で時制の考え方が逆になることに注意しましょう。' }
    ],
    link: { prev: '文の基本の形(主語+動詞)と、各時制の文の作り方が土台です。接続詞は、これまで1つずつ作ってきた文をつなぐための道具です。',
      next: '関係代名詞、間接疑問文など、文の中に文を入れる表現につながります。高校では、though・unless・as long as などの接続詞や、分詞構文での書きかえも学びます。',
      cross: [['国語', '論理的な文章では「だから」「しかし」「なぜなら」などの接続語が、段落と段落の関係を示します。英語の接続詞を正しく使うことは、国語の論理的な文章の読み書きと同じ力を育てます。'], ['数学', '「もし p ならば q」という条件の文(命題)は、if を使って表します。数学の証明で使う論理の考え方と、英語の if の文は深くつながっています。']],
      univ: 'プログラミングでは、if(もし〜なら)、and・or・not などの言葉で処理の条件を書きます。論理学やコンピュータ科学では、こうした接続の言葉の意味を厳密に定めて使います。',
      readT: 'プログラムの中の if と and',
      read: 'コンピュータのプログラムを見ると、英語の接続詞がそのまま使われていることに気づきます。たとえば「もし気温が30度以上なら、エアコンをつける」という命令は、多くのプログラミング言語で if を使って書きます。「雨が降っていて、かつ風が強いなら」は and、「土曜日か日曜日なら」は or で表します。ただし、プログラムの or には注意が必要です。日常の英語で Tea or coffee? と聞かれたら、ふつうはどちらか一方を選びます。ところがプログラムの or は「どちらか一方、または両方」が当てはまれば成り立つのです。このように、ふだんの言葉ではあいまいなところを、コンピュータの世界では1つの意味にきっちり決めています。19世紀のイギリスの数学者ジョージ・ブールは、and・or・not を使った論理を計算のように扱う方法を考えました。この考え方は、今のコンピュータのしくみの土台の1つになっています。' }
  });

  /* ===== 現在完了 ===== */
  add('e_m7', {
    rx: [
      { err: '「もう〜した」「〜したことがある」という日本語を見ると、すべて現在完了にし、When 〜? の疑問文にまで現在完了を使ってしまう(× When have you finished your homework?)。',
        why: '現在完了を「完了・経験の訳語」で覚えていて、現在完了が「今とのつながり」を表す形であり、過去の一点(いつ)をたずねる when とは合わないことを知らないからです。',
        fix: '「いつ」をはっきり言う・たずねる文は過去形にします。when・yesterday・〜 ago・last 〜 があれば過去形、とセットで判断します。',
        q: '「あなたはいつ宿題を終えたのですか」を英語にしよう。', a: 'When did you finish your homework?',
        exp: 'when は過去の一点をたずねる疑問詞なので、現在完了ではなく過去形の疑問文 When did you 〜? にします。現在完了は「今の状態」に目を向けた形なので、時点をはっきりさせる語とはいっしょに使いません。' },
      { err: '「〜に住んで3年になる」「知り合って5年」を、現在形や過去形で書いてしまう(× I live here for three years. × I knew him for five years.)。',
        why: '日本語では「住んでいる」「知っている」と現在の形で言うため、英語でも現在形でよいと思うからです。英語では「過去から今まで続いている期間」を言うと、現在完了が必要になります。',
        fix: 'for(期間)や since(始まり)をつけて「今まで続いている」ことを言うときは、have + 過去分詞にします。現在形は「今」だけ、過去形は「過去」だけを表すと区別します。',
        q: '「私は彼を5年間知っています」を英語にしよう。', a: 'I have known him for five years.',
        exp: '5年前から今まで「知っている状態」が続いているので、現在完了の継続 have known を使います。know は状態動詞なので、have been knowing のような進行形にはしません。' },
      { err: 'just・already・yet・ever・never の置き場所と使い分けをまちがえる(× I have finished already my homework. × Have you finished it already yet?)。',
        why: 'それぞれの語を「意味」だけで覚えていて、「肯定文か、否定文・疑問文か」「文のどこに置くか」というルールを整理していないからです。',
        fix: 'just・already・ever・never は have と過去分詞の間に置く、yet は文の最後に置く(否定文「まだ」・疑問文「もう」)、と位置で覚えます。',
        q: '( )内の語を入れて書きかえよう。I have read the book.(already)/ Have you read the book?(yet)', a: 'I have already read the book. / Have you read the book yet?',
        exp: 'already は have と過去分詞 read の間に置きます。yet は疑問文の最後に置き、「もう〜しましたか」という意味になります。already を疑問文に使うと「もう読んだの?」という驚きの意味が加わります。' }
    ],
    essay: [{ q: 'あなたがこれまでに続けてきたこと(習いごと・部活動・趣味など)について、英語で紹介しなさい。いつから・どのくらい続けているか、その中で経験したことを、現在完了の継続と経験の用法をそれぞれ1回以上使って書くこと。', limit: '30〜40語',
      hint: 'I have played 〜 for … years. / I have 〜 since I was …. で継続を、I have been to 〜 / I have won 〜 once. で経験を表します。最後に今の気持ちや目標を加えましょう。',
      model: 'I have played the piano since I was five years old. I have practiced it almost every day for ten years. I have taken part in a contest twice. I want to keep playing the piano in high school.',
      points: [['続けてきたことの内容と期間が伝わる', 2], ['継続と経験の用法をそれぞれ正しく使っている', 4], ['for と since、過去分詞の形が正しい', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'I have played the piano when I was five. のように過去の一点を表す語と現在完了をいっしょに使ったり、for と since を取りちがえたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。We have lived in this town ( ) 2015.', choices: ['for', 'since', 'from', 'in'], a: 'B(since)', exp: '2015 は「住み始めた時点」なので since(〜以来)を使います。for は「〜の間」という期間の長さに使います。' },
      { q: '「私は一度も富士山に登ったことがありません」を英語にしよう。', a: 'I have never climbed Mt. Fuji.', exp: '経験の否定は never を have と過去分詞の間に置きます。「一度も〜ない」という意味になります。' },
      { q: '( )に入る語を選ぼう。"Have you ever eaten sushi?" "Yes, I ( )."', choices: ['do', 'did', 'have', 'am'], a: 'C(have)', exp: '現在完了の疑問文 Have you 〜? には、have を使って Yes, I have. / No, I haven\'t. と答えます。' },
      { q: '( )内の語を正しい形にしよう。The train has just (leave).', a: 'left', exp: 'has just のあとには過去分詞を置きます。leave の過去分詞は left です。「電車はちょうど出発したところだ」という完了の意味です。' },
      { q: '( )に入る語を選ぼう。My sister has ( ) to Canada three times.', choices: ['gone', 'went', 'been', 'go'], a: 'C(been)', exp: '「カナダに3回行ったことがある」は経験なので have been to 〜 です。has gone to 〜 は「行ってしまって今ここにいない」という意味になります。' },
      { q: '下線部をたずねる疑問文を作ろう。They have been friends for ten years.(下線:for ten years)', a: 'How long have they been friends?', exp: '期間をたずねるので How long を先頭に置き、have they been と現在完了の疑問文の語順を続けます。' },
      { q: '2文がほぼ同じ意味になるように( )に適語を入れよう。My father went to Osaka, and he is not here now. = My father ( ) ( ) to Osaka.', a: 'has gone', exp: '「行ってしまって、今ここにいない」という結果を表すときは has gone to 〜 を使います。現在完了の完了(結果)の用法です。' },
      { q: '( )に入る語を選ぼう。I ( ) my key yesterday, but I found it this morning.', choices: ['lose', 'have lost', 'lost', 'has lost'], a: 'C(lost)', exp: 'yesterday という過去の一点があり、しかも今朝見つかって「今はなくしていない」ので、過去形 lost を使います。have lost だと「なくして今も見つかっていない」という意味になります。' },
      { q: '( )内の語を並べかえよう。(you / how / have / times / many) visited Kyoto?', a: 'How many times have you visited Kyoto?', exp: '回数をたずねるときは How many times を先頭に置き、have you visited と続けます。経験の用法の疑問文です。' },
      { q: '次の英文の誤りを2か所直そう。I have saw that movie last week, and I have know the actor for a long time.', a: 'have saw → saw / have know → have known', exp: 'last week は過去の一点を表すので、現在完了ではなく過去形 saw にします。後半は「長い間知っている」という継続なので、現在完了にし、know の過去分詞 known を使います。' }
    ],
    link: { prev: '過去形と過去分詞の形(不規則動詞の3つの形)、受動態で学んだ過去分詞の作り方が土台です。for(〜の間)や since(〜以来)などの前置詞・接続詞も使います。',
      next: '現在完了進行形(have been 〜ing)、高校の過去完了(had + 過去分詞)、未来完了(will have + 過去分詞)へと発展します。完了の考え方は、仮定法過去完了にもつながります。',
      cross: [['国語', '日本語の「〜たことがある」「〜てしまった」「ずっと〜ている」は、それぞれ英語の現在完了の経験・完了・継続の用法に近い言い方です。日本語には英語の現在完了にあたる1つの形はなく、いろいろな表現で言い分けています。'], ['社会', '「この寺は1000年以上の間ここに立っている」のように、歴史の遺産が今まで残っていることを説明するときに、現在完了の継続が使われます。']],
      univ: '言語学では、英語の現在完了は「過去の出来事が現在とかかわりをもつこと」を表す形として説明されます。ヨーロッパの言語の中には、ドイツ語やフランス語のように同じような形を、ふつうの過去の出来事を言うときにもよく使う言語があります。',
      readT: 'イギリス英語とアメリカ英語の現在完了',
      read: '同じ英語でも、イギリスとアメリカでは現在完了の使い方に少しちがいがあると言われます。たとえば「もう昼ごはん食べた?」と聞くとき、イギリス英語では Have you had lunch yet? と現在完了を使うのがふつうです。一方、アメリカ英語のくだけた会話では、Did you have lunch yet? のように過去形と yet をいっしょに使うことがあります。また、「ちょうど〜したところだ」も、アメリカでは I just finished it. と過去形で言うことがよくあります。教科書では「yet や just は現在完了といっしょに使う」と習いますが、それはおもにイギリス英語や、書き言葉での標準的な使い方なのです。ただし、テストや作文では教科書どおりの現在完了を使うのが安全です。ちがいを知っておくと、映画やドラマで過去形の yet を聞いても、「まちがいではなく、地域や話し方のちがいなのだ」と理解できます。' }
  });

  /* ===== 現在完了進行形 ===== */
  add('e_pperfprog', {
    rx: [
      { err: '現在完了進行形を「今もしている最中」の意味だけだと思い、「さっきまでしていて、その結果が今に表れている」場面で使えない(雨上がりに「ずっと雨が降っていたんだ」と言えない)。',
        why: '現在完了進行形を「〜し続けている」という訳語だけで覚え、動作が今ちょうど終わったばかりの場合にも使えることを知らないからです。',
        fix: '「ついさっきまで続いていた動作の結果が、今目に見えている」場面でも現在完了進行形を使えると覚えます。道がぬれている、息が切れている、などの手がかりがあるかを見ます。',
        q: '息を切らした友だちに「走ってきたの?」とたずねる英文を、現在完了進行形で書こう。', a: 'Have you been running?',
        exp: '友だちが息を切らしているという「今の結果」から、「(ついさっきまで)ずっと走っていたの?」とたずねています。今は走っていなくても、直前まで続いていた動作には現在完了進行形が使えます。' },
      { err: '現在完了進行形にすると、for や since を必ず付けなければならないと思い、How long に答える文以外では使えないと考える。',
        why: '教科書の例文の多くが for・since とセットになっているため、それが形の一部だと思いこんでいるからです。',
        fix: '現在完了進行形は、for・since がなくても「最近ずっと〜している」「このところ〜し続けている」という意味で使えます。lately・recently などの語とも相性がよいと覚えます。',
        q: '「最近、彼女は毎晩英語を勉強しています」を、現在完了進行形で英語にしよう。', a: 'She has been studying English every night recently(lately).',
        exp: 'for・since がなくても、recently(最近)を加えれば「このところずっと続けている」という意味を表せます。主語 she なので has been studying です。' },
      { err: '動作の継続なのに現在完了(have + 過去分詞)だけで書いて、「〜し終えた」という完了の意味にとられる文にしてしまう(「2時間ずっと本を読んでいる」を I have read the book for two hours. とする)。',
        why: 'read のような動作動詞を現在完了にすると、「読み終えた」という完了の意味が強く出ることを意識していないからです。',
        fix: '動作動詞で「〜の間ずっと…している」と言いたいときは、現在完了進行形 have been 〜ing を使います。状態動詞(live・know など)なら現在完了でよい、と動詞の種類で分けます。',
        q: '「私は2時間ずっとその本を読んでいます」を英語にしよう。', a: 'I have been reading the book for two hours.',
        exp: 'read は「読む」という動作の動詞なので、続けている途中であることをはっきり示すには have been reading を使います。I have read the book. だと「その本を読み終えた」という意味にとられやすくなります。' }
    ],
    essay: [{ q: 'あなたが最近ずっと取り組んでいること(練習・勉強・調べものなど)について、どのくらいの間続けているか、なぜ続けているか、その結果どうなったかを英語で書きなさい。現在完了進行形を2回以上使うこと。', limit: '30〜40語',
      hint: 'I have been 〜ing for … / since …. で継続の期間を、because で理由を書きます。結果は Now I can 〜. などで表しましょう。動作動詞を選ぶのがポイントです。',
      model: 'I have been practicing the guitar for six months. I started it because I wanted to play my favorite song. I have been watching videos to learn new chords. Now I can play three songs.',
      points: [['取り組みの内容・期間・理由・結果が伝わる', 3], ['現在完了進行形を2回以上、正しい形で使っている', 4], ['for・since の使い分けが正しい', 1], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'I have been practice のように ing をつけ忘れたり、I have been knowing のように状態動詞を進行形にしたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。It has been ( ) since this morning.', choices: ['rain', 'rained', 'raining', 'rains'], a: 'C(raining)', exp: '現在完了進行形は have(has) been + ing形です。「今朝からずっと雨が降っている」という動作の継続を表します。' },
      { q: '「私たちは1時間ずっと待っています」を英語にしよう。', a: 'We have been waiting for an hour.', exp: '待つという動作が1時間続いているので have been waiting を使います。hour は母音で始まる音なので an をつけます。' },
      { q: '疑問文にしよう。Ken has been playing video games since noon.', a: 'Has Ken been playing video games since noon?', exp: '現在完了進行形の疑問文は、has を主語の前に出します。been playing 以下はそのまま残します。' },
      { q: '( )に入る語を選ぼう。"How long have you been ( ) here?" "For ten minutes."', choices: ['wait', 'waited', 'waiting', 'to wait'], a: 'C(waiting)', exp: 'How long have you been 〜ing? で「どのくらいの間〜し続けているか」をたずねます。been のあとは ing形です。' },
      { q: '( )内から正しいほうを選ぼう。I (have known / have been knowing) Mr. Ito since I was a child.', a: 'have known', exp: 'know は状態動詞なので進行形にしません。状態の継続は現在完了 have known で表します。' },
      { q: '( )に入る語を選ぼう。She has been studying ( ) three hours.', choices: ['since', 'for', 'from', 'during'], a: 'B(for)', exp: 'three hours は期間の長さなので for を使います。始まった時点を言うなら since three o\'clock のようにします。' },
      { q: '2つの文を1つにまとめよう。I started cleaning my room two hours ago. I am still cleaning it.', a: 'I have been cleaning my room for two hours.', exp: '2時間前に始めて、今もそうじを続けているので、現在完了進行形と for two hours で1文にまとめます。' },
      { q: '2つの文の意味のちがいを説明しよう。(a) I have written three letters today. (b) I have been writing letters all day.', a: '(a)は今日手紙を3通書き終えたという、終えた数(結果)に注目している。(b)は一日中ずっと手紙を書き続けているという、動作の続いた時間に注目している。', exp: '「いくつ・何回」終えたかを言うときは現在完了、「どのくらいの時間」続けているかを言うときは現在完了進行形を使います。' },
      { q: '( )に入る語を選ぼう。"Your eyes are red." "I ( ) for a long time."', choices: ['cry', 'have cried', 'have been crying', 'am crying'], a: 'C(have been crying)', exp: '目が赤いという今の結果から、「長い間泣いていた」ことがわかります。直前まで続いた動作と、その結果を表すのに現在完了進行形が合います。' },
      { q: '次の英文の誤りを2か所直そう。My brother have been play soccer since he was eight.', a: 'have → has / play → playing', exp: '主語 my brother は三人称単数なので has、been のあとは ing形 playing にします。since のあとの「8歳だったとき」は過去のことなので was のままで正しい形です。' }
    ],
    link: { prev: '現在完了(継続)と、現在進行形の2つを組み合わせた形です。状態動詞は進行形にしないというルールも、そのまま当てはまります。',
      next: '高校では、過去完了進行形(had been 〜ing)や未来完了進行形を学びます。時制と「相(途中か完了か)」の組み合わせが整理できると、英語の時の表し方の全体像が見えてきます。',
      cross: [['保健体育', 'トレーニングの記録を英語で書くとき、I have been running every morning for a month.(1か月毎朝走り続けている)のように、継続して取り組んでいることを表せます。'], ['理科', '長期間の観察では、「気温が10年間ずっと上がり続けている」のような変化を表す文が出てきます。英語では have been rising のように現在完了進行形で表します。']],
      univ: '気候変動やデータの推移を説明する英語では、Temperatures have been rising. のように、続いている変化を現在完了進行形で表すことがよくあります。',
      readT: '英語の「時制」はいくつある?',
      read: '英語の動詞の時を表す形は、全部でいくつあるでしょうか。時を「過去・現在・未来」の3つに分け、それぞれに「ふつうの形」「進行形」「完了形」「完了進行形」の4つを組み合わせると、3×4で12通りになります。たとえば現在だけでも、I study(現在形)、I am studying(現在進行形)、I have studied(現在完了)、I have been studying(現在完了進行形)の4つがあります。この単元で学んだ現在完了進行形は、12通りの中でも、いちばん部品の多い形の1つです。have・been・ing と3つの部品を組み合わせて、「過去から今まで」「ずっと途中である」という2つの情報を同時に伝えています。ただし、言語学では「時制は過去と現在の2つだけで、未来は助動詞で表す」と考える立場もあります。数え方は見方によって変わりますが、部品の組み合わせで時を表すしくみを知っておくと、新しい形にも落ち着いて向き合えます。' }
  });

  /* ===== 分詞の形容詞的用法 ===== */
  add('e_partm', {
    rx: [
      { err: '分詞を使った名詞のかたまりを、文の動詞とまちがえて「文」として訳してしまう(The girl dancing on the stage を「その女の子はステージで踊っている」と訳して文を終えてしまう)。',
        why: '-ing や -ed を見ると、すぐに「進行形」や「過去形」の動詞だと思ってしまうからです。be動詞がないことに注目していません。',
        fix: '-ing の前に be動詞があるかを確かめます。なければ、その -ing は名詞を説明する分詞で、「〜している(名詞)」というかたまりの一部です。文の本当の動詞を別にさがします。',
        q: '文の動詞(述語動詞)を答えよう。The girl dancing on the stage is my sister.', a: 'is',
        exp: 'dancing の前に be動詞がないので、dancing on the stage は girl を説明する分詞のかたまりです。文の骨組みは The girl is my sister. で、動詞は is です。' },
      { err: '過去形と過去分詞が同じ形の動詞(called・made・used など)で、名詞を説明する過去分詞を文の動詞(過去形)だと思いこみ、文の意味を取りちがえる(The man called Ken is my uncle. を「その男はケンに電話した」と読む)。',
        why: 'called・used・made などは過去形と過去分詞が同じ形なので、見た目だけでは区別できないからです。',
        fix: 'その語のあとに文の動詞(is・was など)がもう1つあるかを確かめます。もう1つあるなら、called は名詞を説明する過去分詞(〜と呼ばれる)です。',
        q: '次の文を日本語にしよう。The bag made in Italy was very expensive.', a: 'イタリアで作られたそのかばんは、とても高価でした。',
        exp: '文の動詞は was なので、made in Italy は bag を後ろから説明する過去分詞のかたまり(イタリアで作られた)です。made を過去形と考えると、「かばんがイタリアで作った」という意味の通らない文になってしまいます。' },
      { err: '感情を表す分詞(surprising / surprised など)を、主語が人かものかだけで機械的に決め、「人を〜させる性質の人」の場合にもまちがえる(× He is a bored person.(あの人は退屈な人だ、のつもり))。',
        why: '「人には -ed、ものには -ing」と単純に覚えているからです。本当は「感情を与える側なら -ing、感情を受ける側なら -ed」という関係で決まります。',
        fix: '「その人(もの)は感情を与える側か、受ける側か」をたずねます。他人を退屈させる人なら boring、自分が退屈している人なら bored です。',
        q: '( )内から正しいほうを選ぼう。His speech was so long that everyone looked (boring / bored).', a: 'bored',
        exp: 'みんなは長いスピーチによって退屈させられた側なので bored です。スピーチそのものは退屈させる側なので、His speech was boring. となります。人かものかではなく、感情を与えるか受けるかで決めます。' }
    ],
    essay: [{ q: '下のような写真を見ている外国の友だちに、写真の中の人やものを説明する英文を書きなさい。〔写真:公園。ベンチで本を読んでいる女性、木の下で寝ているイヌ、地面に落ちている赤い葉〕 現在分詞と過去分詞をそれぞれ1回以上、名詞を後ろから説明する形で使うこと。', limit: '30〜40語',
      hint: 'The woman reading a book on the bench is 〜. / Look at the dog sleeping under 〜. / the red leaves lying on the ground などの形が使えます。人物との関係(my aunt など)を加えると自然になります。',
      model: 'This is a picture taken in the park near my house. The woman reading a book on the bench is my aunt. The dog sleeping under the tree is hers. The ground is covered with red leaves.',
      points: [['写真の人やものを説明する内容になっている', 2], ['現在分詞を名詞の後ろに置いて正しく使っている', 3], ['過去分詞を名詞の後ろに置いて正しく使っている', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'The reading a book woman のように2語以上の分詞を名詞の前に置いたり、a picture taking のように「する側・される側」を逆にしたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。Who is the boy ( ) with Emi?', choices: ['talk', 'talks', 'talking', 'talked'], a: 'C(talking)', exp: '「エミと話している少年」は、少年が話している側なので現在分詞 talking を使い、boy の後ろに置きます。' },
      { q: '( )に入る語を選ぼう。I bought a ( ) car.', choices: ['use', 'used', 'using', 'uses'], a: 'B(used)', exp: '「使われた車」=中古車は、車が使われた側なので過去分詞 used です。1語なので名詞の前に置きます。' },
      { q: '「英語で書かれた手紙」を英語にしよう。', a: 'a letter written in English', exp: '手紙は書かれた側なので過去分詞 written を使います。in English と2語以上になるので、letter の後ろに置きます。' },
      { q: '( )内の語を正しい形にしよう。Look at the (sleep) baby.', a: 'sleeping', exp: '「眠っている赤ちゃん」は、赤ちゃんが眠っている側なので現在分詞 sleeping です。1語なので名詞の前に置きます。' },
      { q: '( )内の語を並べかえよう。The (standing / man / the door / by) is our teacher.', a: 'The man standing by the door is our teacher.', exp: '「ドアのそばに立っている男性」は man の後ろに standing by the door を置きます。文の動詞は is です。' },
      { q: '( )に入る語を選ぼう。The movie was very ( ). I want to see it again.', choices: ['excite', 'excited', 'exciting', 'excitement'], a: 'C(exciting)', exp: '映画は人をわくわくさせる側なので exciting を使います。わくわくした人の気持ちなら excited です。' },
      { q: '2文を分詞を使って1文にしよう。I have a friend. He lives in Australia.', a: 'I have a friend living in Australia.', exp: '「オーストラリアに住んでいる友だち」を、現在分詞 living を使って friend の後ろから説明します。関係代名詞を使えば a friend who lives in Australia とも言えます。' },
      { q: '( )に入る語を選ぼう。The languages ( ) in this country are English and French.', choices: ['speak', 'spoke', 'spoken', 'speaking'], a: 'C(spoken)', exp: '「この国で話されている言語」は言語が話される側なので過去分詞 spoken です。文の動詞は are です。' },
      { q: '2つの表現の意味のちがいを説明しよう。(a) a falling leaf (b) a fallen leaf', a: '(a)は今まさに落ちている途中の葉。(b)はすでに落ちてしまった葉(落ち葉)。', exp: 'fall は目的語をとらない動詞なので、過去分詞 fallen は「される」ではなく「〜してしまった(完了)」の意味になります。現在分詞は進行中、過去分詞は完了を表します。' },
      { q: '次の英文の誤りを2か所直そう。The students invited to the party was very exciting.', a: 'was → were / exciting → excited', exp: '主語の中心は students(複数)なので were にします。また、生徒たちはパーティーでわくわくした側なので excited を使います。長い主語の中心と、感情を与える側か受ける側かの2点を確かめましょう。' }
    ],
    link: { prev: '進行形の ing形と、受動態の過去分詞が土台です。分詞は「be動詞のない進行形・受動態」が名詞にくっついたものと考えることができます。',
      next: '関係代名詞(who・which・that)を使った後置修飾につながります。高校では、分詞構文(Walking along the street, I met 〜)や、SVOC の C に分詞を置く形(I saw him running)を学びます。',
      cross: [['国語', '日本語では「ベンチで本を読んでいる女性」のように、説明はいつも名詞の前に来ます。英語では長い説明は名詞の後ろに来るので、日本語と語順が逆になります。'], ['美術', '作品の説明では、a statue made of bronze(青銅で作られた像)、a painting drawn in 1889(1889年に描かれた絵)のように、過去分詞を使って作品を説明することがよくあります。']],
      univ: '言語学では、修飾語が名詞の前に来るか後ろに来るかは、言語ごとの特徴として研究されています。翻訳の仕事では、英語の後置修飾を自然な日本語の語順に直す技術がとても大切です。',
      readT: '英語は「頭でっかち」をきらう',
      read: '日本語では「昨日駅前の新しい店で買った赤いかばん」のように、名詞の前にいくらでも説明を重ねられます。ところが英語では、名詞の前に置けるのはふつう短い語だけで、長い説明は名詞の後ろに回します。a red bag(赤いかばん)は名詞の前でよいのですが、「昨日買った」のような長い説明は a bag bought yesterday のように後ろに置くのです。英語には、重くて長い情報を文の後ろのほうに置く傾向がある、とよく言われます。主語が長くなりすぎると、聞き手は文の動詞が出てくるまで長く待たなければなりません。そこで英語では、まず中心となる名詞を言ってから、その説明をあとに続けるのです。分詞や関係代名詞が名詞の後ろに来るのは、英語が「頭でっかち」をきらう言語だからだと考えると、語順のちがいも覚えやすくなるでしょう。' }
  });

  /* ===== 関係代名詞 ===== */
  add('e_m8', {
    rx: [
      { err: '関係代名詞を使った文を前から順に訳してしまい、どこまでが名詞の説明なのか区切れない(The man who helped me yesterday is a doctor. を「その男の人は昨日私を助けて、医者です」と訳す)。',
        why: '日本語の語順で前から訳そうとして、関係代名詞のかたまりが名詞を後ろから説明していることを意識していないからです。',
        fix: '関係代名詞が出てきたら、そこから「説明の終わり」までをかっこでくくります。終わりは、文の本当の動詞(is など)の直前です。かっこの中を先に訳して、名詞にかけます。',
        q: '次の文を日本語にしよう。The book which my teacher gave me was very interesting.', a: '先生が私にくれた本は、とてもおもしろかった。',
        exp: 'which my teacher gave me までをかっこでくくると、文の骨組みは The book was very interesting. です。かっこの中「先生が私にくれた」を book にかけて訳します。' },
      { err: '先行詞が「人とそれ以外」の両方にまたがる場合や、all・the only・最上級がつく場合にも、人なら who、ものなら which と機械的に選んでしまう(× the boy and his dog which are running)。',
        why: '「人は who、ものは which」というルールしか持っていないため、例外的に that が好まれる場面を知らないからです。',
        fix: '先行詞に「人+動物(もの)」「the only・the first・最上級・all・every」があるときは、that を使うのがふつうだと覚えます。迷ったら that が使えるかを先に考えます。',
        q: '( )に入る関係代名詞を選ぼう。This is the best movie ( ) I have ever seen.(who / which / that)', a: 'that',
        exp: '先行詞に最上級 the best がついているので、関係代名詞は that が好まれます。which でもまちがいとまでは言えませんが、テストでは that を選ぶのが基本です。' },
      { err: '主格の関係代名詞のあとの動詞を、文全体の主語や、すぐ前の語に合わせてしまう(× I know some students who plays the guitar.)。',
        why: '関係代名詞 who が何を指しているかを確かめずに、近くの語や文全体の主語 I などで動詞の形を決めてしまうからです。',
        fix: '主格の関係代名詞のあとの動詞は、先行詞に合わせます。先行詞(some students)を who の位置に入れて「students play」と言えるかを確かめます。',
        q: '( )内の語を正しい形にしよう。She is one of the girls who (be) in the brass band.', a: 'are',
        exp: 'who の先行詞は the girls(複数)です。「吹奏楽部に入っている少女たち」の1人という意味なので、who are となります。one に合わせて is にしないよう注意しましょう。' }
    ],
    essay: [{ q: 'あなたが「尊敬する人」または「大切にしているもの」を1つ選び、それを紹介する英文を書きなさい。主格と目的格の関係代名詞をそれぞれ1回以上使い、なぜ大切なのかがわかるようにすること。', limit: '30〜40語',
      hint: 'My grandmother is a person who 〜. / The watch which my father gave me is 〜. のように使います。目的格の関係代名詞は省略してもかまいませんが、1回は書きましょう。',
      model: 'I respect my grandmother. She is a person who always helps people in need. The cooking that she taught me is very important to me. I want to be someone who can make others happy like her.',
      points: [['尊敬する人(大切なもの)とその理由が伝わる', 3], ['主格の関係代名詞を正しく使っている', 2], ['目的格の関係代名詞を正しく使っている', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'The watch which my father gave me it のように目的語を残したり、a person who help のように動詞を先行詞に合わせなかったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。I have a friend ( ) can speak Chinese.', choices: ['who', 'which', 'whose', 'what'], a: 'A(who)', exp: '先行詞 a friend は人で、後ろに can speak と動詞が続くので、主格の who を使います。' },
      { q: '( )に入る語を選ぼう。This is the pen ( ) I lost last week.', choices: ['who', 'which', 'whose', 'where'], a: 'B(which)', exp: '先行詞 the pen はもので、後ろが I lost(主語+動詞)と目的語が欠けた形なので、目的格の which です。that でも同じ意味になります。' },
      { q: '「これは父が作ったいすです」を英語にしよう。', a: 'This is the(a) chair (which / that) my father made.', exp: '目的格の関係代名詞 which(that)を使い、chair を後ろから説明します。目的格なので省略しても正しい文です。' },
      { q: '次の文で省略できる関係代名詞はどれか。(a) The girl who is singing is Aya. (b) The cake that she made was good.', a: '(b)の that', exp: '(b)の that は、後ろに she made と主語が続く目的格なので省略できます。(a)の who は主格なので省略できません。' },
      { q: '2文を関係代名詞を使って1文にしよう。The woman is a nurse. She lives next door.', a: 'The woman who(that) lives next door is a nurse.', exp: '2文目の She が The woman を指しているので、主格の who に変えて woman の直後に置きます。文の骨組みは The woman is a nurse. です。' },
      { q: '( )に入る語を選ぼう。I know a girl ( ) father is a pilot.', choices: ['who', 'which', 'whose', 'that'], a: 'C(whose)', exp: '「父親がパイロットである少女」で、father は girl の父です。「〜の」を表す所有格の関係代名詞 whose を使います。' },
      { q: '( )内の語を並べかえよう。The pictures (by / taken / were / him) beautiful.(関係代名詞を1語加えて書こう)', a: 'The pictures which(that) were taken by him were beautiful.', exp: '「彼によって撮られた写真」は、主格の関係代名詞 which(that)+受動態 were taken by him で表します。文の動詞は後ろの were beautiful の were です。' },
      { q: '( )に入る語を選ぼう。The man and his dog ( ) are walking in the park look happy.', choices: ['who', 'which', 'that', 'whose'], a: 'C(that)', exp: '先行詞が「人と動物」の両方をふくむときは、関係代名詞 that を使うのがふつうです。' },
      { q: '分詞を使って同じ意味の文に書きかえよう。The boy who is playing the piano is Taro.', a: 'The boy playing the piano is Taro.', exp: '主格の関係代名詞 + be動詞(who is)を取り去ると、現在分詞の後置修飾の形になります。関係代名詞と分詞は、どちらも名詞を後ろから説明できます。' },
      { q: '次の英文の誤りを2か所直そう。The museum who we visited it last year was built in 1900.', a: 'who → which(that) / it を削除する', exp: '先行詞 the museum はものなので which か that を使います。また、関係代名詞が visited の目的語の役目をしているので、後ろの it は不要です。目的語を2回言わないことが大切です。' }
    ],
    link: { prev: '分詞による後置修飾(名詞を後ろから説明する)と、疑問詞の who・which が土台です。接続詞と代名詞のはたらきを1語で兼ねるのが関係代名詞です。',
      next: '高校では、関係副詞(where・when・why)、前置詞 + 関係代名詞(in which)、what(〜すること・もの)、コンマをつける非制限用法を学びます。長文読解では、関係代名詞のかたまりを見抜く力が欠かせません。',
      cross: [['国語', '日本語の「私が昨日買った本」の「私が昨日買った」は連体修飾です。英語では同じ説明を関係代名詞で名詞の後ろに置きます。国語の文法で学ぶ「修飾・被修飾」の関係と同じです。'], ['情報', 'データベースで「年齢が15歳である生徒」をさがす操作は、条件で名詞をしぼりこむという点で、関係代名詞が名詞を説明するはたらきに似ています。']],
      univ: '辞書の英英定義は、a person who 〜、a thing which 〜 のように関係代名詞を使って書かれていることが多いです。法律や契約書の英語でも、条件を正確に示すために関係代名詞が多く使われます。',
      readT: '英英辞典は関係代名詞のかたまり',
      read: '英語で書かれた英語の辞書(英英辞典)を開くと、関係代名詞があちこちに出てきます。たとえば teacher(先生)なら、a person who teaches, especially in a school(特に学校で、教える人)のように説明されています。dictionary なら a book that gives a list of words and their meanings(語とその意味の一覧を示す本)のような書き方です。ものごとを説明するとき、「どんな種類のものか(a person・a book)」を先に言い、そのあとに関係代名詞で「どういう点で特別なのか」を加えるのが、英語の定義の基本的な形なのです。この形は、みなさんが英作文で知らない単語を言いかえるときにも役立ちます。「消防士」という単語を忘れても、a person who puts out fires と書けば、相手に伝わります。関係代名詞は、言葉の意味を自分で説明するための強い道具なのです。' }
  });

  /* ===== 間接疑問文 ===== */
  add('e_indq', {
    rx: [
      { err: '間接疑問の文全体の最後に、いつも ? をつけてしまう、または ? をつけるべき文でつけない(× I don\'t know where he lives?)。',
        why: '中に疑問詞が入っているので、文全体も疑問文だと思ってしまうからです。文の終わりの記号は、外側の文が何かで決まります。',
        fix: '外側の文(I know / Do you know など)だけを見て、それが疑問文なら ?、ふつうの文なら . をつけます。中の疑問詞の部分は記号に関係しません。',
        q: '文の終わりに . か ? をつけよう。(1) I wonder what she is doing ( ) (2) Can you tell me when the shop opens ( )', a: '(1) . (2) ?',
        exp: '(1)の外側の文 I wonder 〜 はふつうの文なのでピリオドです。(2)の外側の文 Can you tell me 〜 は疑問文なのでクエスチョンマークです。中に疑問詞があっても、外側の文の種類で決まります。' },
      { err: '疑問詞のない Yes/No の疑問文を間接疑問にするとき、そのまま文をつないでしまう(× I don\'t know he is coming.(彼が来るかどうか、のつもり))。',
        why: '疑問詞の間接疑問は練習していても、疑問詞がない場合に「〜かどうか」を表す語が必要だと知らないからです。',
        fix: 'もとの疑問文が Is 〜? / Does 〜? のように疑問詞なしで始まるときは、if(または whether)を入れて「〜かどうか」とし、そのあとをふつうの語順にします。',
        q: '1文にしよう。I don\'t know. + Will Ken come to the party?', a: 'I don\'t know if(whether) Ken will come to the party.',
        exp: 'もとの文に疑問詞がないので、「〜かどうか」を表す if を入れます。そのあとは Ken will come とふつうの語順にします。「来るかどうか」の if の中では、未来のことは will で表します。' },
      { err: '疑問詞が主語の疑問文(Who broke the window? など)を間接疑問にするとき、語順を変えようとしてかえっておかしくしてしまう(× I know who the window broke.)。',
        why: '「間接疑問は疑問詞 + 主語 + 動詞」というルールを、疑問詞が主語のときにも当てはめようとするからです。',
        fix: '疑問詞が主語のときは、もとの疑問文がすでに「疑問詞(主語)+ 動詞」の語順なので、そのままつなげます。もとの文で疑問詞のすぐあとに動詞があるかを確かめます。',
        q: '1文にしよう。Do you know? + Who broke this window?', a: 'Do you know who broke this window?',
        exp: 'Who broke this window? の who は主語で、すでに「主語 + 動詞」の語順になっています。そのため、そのまま Do you know のあとにつなげます。語順を入れかえる必要はありません。' }
    ],
    essay: [{ q: 'あなたは来週、地域の図書館で職場体験をします。担当の人にあらかじめ質問するメールを英語で書きなさい。間接疑問文を3つ以上使い、ていねいにたずねること。', limit: '30〜40語',
      hint: 'Could you tell me 〜? / I would like to know 〜. / I\'m not sure 〜. などのていねいな表現に、what time・what to bring・whether 〜 などを組み合わせます。',
      model: 'Hello, my name is Rina. I will work at your library next week. Could you tell me what time I should come? I would also like to know what I need to bring. Please tell me where I should wait.',
      points: [['職場体験の質問メールとしての目的と、ていねいさがある', 2], ['間接疑問文を3つ以上使っている', 3], ['間接疑問の中の語順が正しい(疑問詞 + 主語 + 動詞)', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'Could you tell me what time should I come? のように中を疑問文の語順にしたり、文の終わりの記号をまちがえたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語順を選ぼう。I don\'t know ( ).', choices: ['where does he live', 'where he lives', 'where lives he', 'he lives where'], a: 'B(where he lives)', exp: '間接疑問では、疑問詞のあとをふつうの語順(主語 + 動詞)にします。does は消して、動詞に s をつけます。' },
      { q: '1文にしよう。Do you know? + What is her name?', a: 'Do you know what her name is?', exp: 'What is her name? の is を主語 her name のあとに移して、what her name is とします。' },
      { q: '「私は彼が昨日何を買ったのか知りたい」を英語にしよう。', a: 'I want to know what he bought yesterday.', exp: 'What did he buy yesterday? を間接疑問にすると、did を消して buy を過去形 bought にした what he bought になります。' },
      { q: '( )に入る語を選ぼう。Please tell me ( ) to use this machine.', choices: ['what', 'how', 'which', 'who'], a: 'B(how)', exp: 'how to 〜 で「〜のしかた」という意味です。「この機械の使い方を教えてください」となります。疑問詞 + to 〜 も間接疑問に近いはたらきをします。' },
      { q: '( )内の語を並べかえよう。Can you tell me (the station / is / where)?', a: 'Can you tell me where the station is?', exp: 'Where is the station? を間接疑問にすると、where the station is とふつうの語順になります。外側が疑問文なので最後は ? です。' },
      { q: '"Do you know how old Mr. Smith is?" に、「はい、50歳です」と答えよう。', a: 'Yes, I do. He is fifty (years old).', exp: 'Do you know 〜? は「知っていますか」という Yes/No の質問なので、まず Yes, I do. と答えてから、中身の年齢を答えます。' },
      { q: '( )内の語を正しい形にしよう。I wonder why Mike (look) so sad this morning.', a: 'looked', exp: 'Why did Mike look so sad this morning? を間接疑問にした形です。did を消すので、look を過去形 looked にします。' },
      { q: '2文がほぼ同じ意味になるように( )に1語ずつ入れよう。I don\'t know what I should say. = I don\'t know what ( ) ( ).', a: 'to say', exp: '「何を言うべきか」は what I should say とも、what to say とも表せます。疑問詞 + to 〜 で「何を〜すべきか」を表します。' },
      { q: '( )に入る語を選ぼう。I\'m not sure ( ) it will be sunny tomorrow.', choices: ['what', 'that', 'if', 'how'], a: 'C(if)', exp: '「明日晴れるかどうか」なので、「〜かどうか」を表す if を使います。間接疑問の if の中では、未来のことは will で表します。' },
      { q: '次の英文の誤りを2か所直そう。Do you know when does the concert start. I want to know who will sings first.', a: 'when does the concert start → when the concert starts(最後を ? にする) / who will sings → who will sing', exp: '間接疑問の中はふつうの語順にし、does を消して starts とします。外側が Do you know 〜 なので文末は ? です。また、will のあとは原形なので sing にします。' }
    ],
    link: { prev: '疑問詞を使った疑問文(Where do you live?)と、接続詞 that の「〜ということ」が土台です。間接疑問は、疑問文が名詞のかたまりになって文の中に入ったものです。',
      next: '高校では、間接疑問を使った複雑な文(I have no idea what to do)、関係代名詞の what(what I want = 私がほしいもの)、話法の書きかえ(He asked me where I lived.)を学びます。',
      cross: [['国語', '日本語では「彼がどこに住んでいるか知らない」のように、「か」をつけるだけで疑問の内容を文に入れられます。英語では語順を変える必要があるのが大きなちがいです。'], ['社会', '観光案内や窓口の会話では、Could you tell me where 〜 is? のような間接疑問を使うと、ていねいにたずねられます。'] ],
      univ: '接客や国際的な仕事の場面では、直接の質問より、間接疑問を使った Could you tell me 〜? や I was wondering if 〜 のほうが、ていねいで角の立たない言い方として好まれます。',
      readT: 'なぜ間接疑問はていねいに聞こえるのか',
      read: 'Where is the restroom?(トイレはどこですか)と、Could you tell me where the restroom is?(トイレがどこか教えていただけますか)。どちらも同じことをたずねていますが、後ろの文のほうがていねいに聞こえます。これは、間接疑問を使うと、相手に直接答えをせまるのではなく、「教えてもらえるかどうか」を相手に選んでもらう形になるからです。答えを強く求めず、相手に断る余地を残しているのです。英語には、I was wondering if you could help me.(手伝っていただけないかと思っていたのですが)のように、さらに遠回しな言い方もあります。日本語でも「〜はどこ?」より「〜がどこか、教えていただけますか」のほうがていねいですね。言葉は、伝える内容だけでなく、相手との距離のとり方も表しているのです。間接疑問を身につけると、英語でも相手に気をつかった話し方ができるようになります。' }
  });

  /* ===== 語彙の増やし方 ===== */
  add('e_vocab_m', {
    rx: [
      { err: '単語を「英語1語 = 日本語1語」で覚え、ほかの意味や使い方を知らないまま文に当てはめて意味が通らなくなる(I can\'t stand this noise. を「この音の中で立てない」と訳す)。',
        why: '単語帳の最初の訳だけを覚えて、1つの単語が場面によっていくつもの意味をもつことを意識していないからです。stand には「がまんする」という意味もあります。',
        fix: '訳がしっくりこないときは「ほかの意味はないか」と疑い、辞書の2番目以降の意味も見ます。覚えるときは、基本のイメージ(stand =その場にしっかり立つ → 持ちこたえる)と結びつけます。',
        q: '次の文の下線部の意味を答えよう。Please keep the change.(change)', a: 'おつり',
        exp: 'change は「変化・変える」という意味がよく知られていますが、お金について使うと「おつり・小銭」という意味になります。「おつりはとっておいてください」という文です。意味が通らないときは、ほかの意味を考えましょう。' },
      { err: '品詞を意識せずに単語を覚え、同じ形の語を動詞・名詞の両方に使えることや、語尾で品詞が変わることに気づかない(× I have a happy.(幸せがある、のつもり))。',
        why: '意味だけで単語を覚えていて、「その語が文のどの位置に置ける語か」という品詞の情報をいっしょに覚えていないからです。',
        fix: '新しい単語は、意味と品詞をセットで覚えます。happy(形容詞)→ happiness(名詞)→ happily(副詞)のように、語尾で品詞を変えた「家族」もまとめて覚えます。',
        q: '( )に、happy を適切な形に変えて入れよう。Money cannot buy ( ).', a: 'happiness',
        exp: 'buy の目的語になるのは名詞なので、形容詞 happy を名詞 happiness に変えます。-ness は形容詞を名詞にする語尾です。y を i に変えることにも注意しましょう。' },
      { err: '単語は単独で覚えれば十分だと考え、いっしょに使う語の組み合わせ(コロケーション)をまちがえる(× do a mistake、× strong rain、× make homework)。',
        why: '日本語の「ミスをする」「強い雨」「宿題をする」をそのまま英語の単語に置きかえているからです。英語では、名詞ごとに相性のよい動詞や形容詞が決まっています。',
        fix: '名詞を覚えるときは、よく組み合わさる動詞や形容詞といっしょに「かたまり」で覚えます。make a mistake、heavy rain、do my homework のように、例文ごと声に出して覚えます。',
        q: '( )に make か do を入れよう。(1) ( ) a mistake (2) ( ) the dishes (3) ( ) a plan', a: '(1) make (2) do (3) make',
        exp: '「まちがいをする」は make a mistake、「皿洗いをする」は do the dishes、「計画を立てる」は make a plan です。make は何かを作り出すとき、do は作業や仕事をするときによく使います。ただし例外も多いので、かたまりで覚えるのが確実です。' }
    ],
    essay: [{ q: 'あなたが英単語を覚えるために実際にしている(または、これから試したい)方法を1つ紹介し、その方法がよいと思う理由を英語で書きなさい。理由は2つ書くこと。', limit: '30〜40語',
      hint: 'The best way for me to learn new words is to 〜. で方法を示し、First, 〜. Also, 〜. で理由を2つ書きます。例文・音読・ノート・アプリなど、具体的な方法にしましょう。',
      model: 'The best way for me to learn new words is to make my own example sentences. First, I can remember how to use the words. Also, writing sentences about my life makes the words easier to remember.',
      points: [['覚え方の方法が具体的に示されている', 3], ['理由が2つあり、方法とつながっている', 3], ['不定詞・動名詞などの語法が正しい', 2], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'The best way is make 〜 のように to を落としたり、理由が「楽しいから」の1つだけで終わったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。My father ( ) me a story every night when I was small.', choices: ['said', 'spoke', 'told', 'talked'], a: 'C(told)', exp: '「人に話を語る」は tell 人 a story です。say・speak・talk は、この形(人 + もの)をとりません。' },
      { q: '「借りる」と「貸す」をそれぞれ英語で書こう。', a: '借りる:borrow / 貸す:lend', exp: 'borrow は「(持ち帰るものを)借りる」、lend は「貸す」です。物が自分のほうへ来るのが borrow、相手のほうへ行くのが lend です。' },
      { q: 'care の形容詞(注意深い)と、その反対の意味の形容詞を書こう。', a: 'careful / careless', exp: '-ful は「〜に満ちた」、-less は「〜がない」という意味の語尾です。help → helpful / helpless のように、同じ組み合わせがほかにもあります。' },
      { q: '次の定義に合う単語を書こう。a room or building where people can borrow books', a: 'library', exp: '「人々が本を借りることのできる部屋や建物」なので、library(図書館)です。英語の定義を読む問題は入試でもよく出ます。' },
      { q: '( )に入る語を選ぼう。It\'s raining ( ). Take an umbrella.', choices: ['strongly', 'heavily', 'hardly', 'largely'], a: 'B(heavily)', exp: '「激しく雨が降る」は rain heavily(heavy rain)と表します。strong rain とは言わないのがふつうです。hardly は「ほとんど〜ない」という別の意味です。' },
      { q: 'un- をつけて反対の意味になる語を、次から2つ選ぼう。(happy / possible / kind / regular)', a: 'happy(unhappy)/ kind(unkind)', exp: 'unhappy・unkind になります。possible の反対は impossible(im-)、regular の反対は irregular(ir-)です。語によって使う接頭辞がちがいます。' },
      { q: '下線部の語の意味を、文脈から推測しよう。The room was so tiny that only one person could sleep in it.(tiny)', a: 'とても小さい', exp: '「1人しか眠れないほど」とあるので、部屋がとても小さいことがわかります。知らない単語も、前後の内容から意味を推測できます。' },
      { q: '( )に入る語を選ぼう。Can you ( ) Japanese?', choices: ['say', 'tell', 'speak', 'talk'], a: 'C(speak)', exp: '「〜語を話す」は speak を使います。言語を目的語にとるのは speak です。' },
      { q: '同じ発音でつづりがちがう語を書こう。(1) right と同じ発音で「書く」 (2) meat と同じ発音で「会う」', a: '(1) write (2) meet', exp: 'right と write、meat と meet は、発音が同じでつづりと意味がちがう語です。例文の中で覚えると、取りちがえにくくなります。' },
      { q: 'success の動詞形と形容詞形をそれぞれ書き、形容詞形を使って「彼は成功した歌手だ」を英語にしよう。', a: '動詞:succeed / 形容詞:successful / He is a successful singer.', exp: 'success(名詞:成功)、succeed(動詞:成功する)、successful(形容詞:成功した)は同じ家族の語です。語尾で品詞が変わるので、まとめて覚えると効率的です。' }
    ],
    link: { prev: 'これまでの単元で学んだ品詞(名詞・動詞・形容詞・副詞)の区別と、動詞の形の変化が土台です。単語は文法と結びついてはじめて使えるようになります。',
      next: '高校では、接頭辞・接尾辞・語根(ラテン語由来の部品)を使って、知らない単語の意味を推測する力が大切になります。長文読解や英作文の力は、使える単語の数に大きく左右されます。',
      cross: [['国語', '漢字の「へん」や「つくり」で意味を推測するように、英語の単語も接頭辞・接尾辞で意味を推測できます。un-(〜でない)は、漢字の「不」や「無」に似たはたらきです。'], ['理科', '理科の用語には、photosynthesis(光合成)の photo-(光)のように、ギリシャ語やラテン語の部品からできた語が多くあります。部品を知ると、科学の英語が読みやすくなります。']],
      univ: '言語学や心理学では、人がどのように単語を覚え、忘れていくかが研究されています。時間をあけてくり返し復習すると記憶に残りやすいことが知られており、学習アプリなどにも取り入れられています。',
      readT: '忘却曲線と「間をあけた復習」',
      read: '19世紀のドイツの心理学者エビングハウスは、意味のない文字の並びを自分で覚え、時間がたつとどれくらい忘れるのかを調べました。その結果、覚えた直後から急速に忘れていき、その後はゆるやかに忘れていくことがわかりました。この忘れ方をグラフにしたものは「忘却曲線」と呼ばれています。大切なのは、一度忘れかけたことでも、もう一度覚えなおすと、最初よりずっと短い時間で覚えられたという点です。そして、復習をくり返すたびに忘れにくくなっていきます。この考えをもとに、「翌日、数日後、1週間後」のように、間をあけて復習する方法が勧められています。英単語も、一晩で何十語もつめこむより、少しずつ何度も見直すほうが長く記憶に残ります。忘れるのは失敗ではなく、復習のタイミングを教えてくれる合図だと考えて、気長に続けましょう。' }
  });

  /* ===== 中3 総合:並べかえ・文の骨組み ===== */
  add('ex_jh3', {
    rx: [
      { err: '並べかえで、日本語の語順どおりに語を置いていき、最後に動詞が余ったり足りなかったりする(「私が昨日読んだ本はおもしろかった」を The book I yesterday read 〜 と並べる)。',
        why: '日本語の文を前から1語ずつ英語に置きかえているからです。英語の骨組み(主語 + 動詞)を先に決めないと、修飾の部分の位置が決まりません。',
        fix: 'まず「だれが・どうする」の骨組み(The book was interesting.)を作り、次に修飾の部分(I read yesterday)を説明する名詞の後ろに入れる、という2段階で並べます。',
        q: '並べかえよう。「私が昨日読んだ本はおもしろかった」(read / the book / interesting / I / yesterday / was).', a: 'The book I read yesterday was interesting.',
        exp: '骨組みは The book was interesting. です。「私が昨日読んだ」は book を説明するので、book の直後に I read yesterday を入れます(目的格の関係代名詞が省略された形)。' },
      { err: '語群に「余分な語」が1つ入っている問題で、すべての語を使おうとして文をこわしてしまう。',
        why: '「並べかえはすべての語を使う」と思いこみ、問題の指示(1語不要、1語補う など)を読み落としているからです。',
        fix: '並べかえる前に、指示文の「不要な語が1つ」「1語補って」などに線を引きます。文を作ったあと、使わなかった語・足した語が指示どおりの数かを数えて確かめます。',
        q: '1語不要な語がある。並べかえて、不要な語を答えよう。「彼はとても疲れていたので歩けなかった」He was (tired / to / too / walk / so).', a: 'He was too tired to walk. 不要な語:so',
        exp: 'too 〜 to … で「あまりに〜で…できない」という意味になります。so を使うなら so tired that he couldn\'t walk となり、that などが必要です。この語群では so が不要です。' },
      { err: 'SVOO と SVOC の文で、目的語と補語の順番を逆にしたり、to・for を勝手に足したりする(× My friends call Tama me. × Please make happy him.)。',
        why: '動詞ごとにとる文の型(give 人 もの、call A B、make A 形容詞)を区別せず、「動詞のあとに名詞を並べる」とだけ覚えているからです。',
        fix: '動詞を見たら、「人にものを〜する」型(give・show・teach)か、「A を B にする・呼ぶ」型(make・call・name)かを考えます。後者は「A = B」の関係が成り立つかで確かめます。',
        q: '並べかえよう。「その知らせは私たちを悲しくさせた」(us / the news / sad / made).', a: 'The news made us sad.',
        exp: 'make A B で「A を B(の状態)にする」という SVOC の文です。us = sad(私たちが悲しい)という関係が成り立ちます。made sad us の順にはしません。' }
    ],
    essay: [{ q: '次の日本語の内容を、30〜40語の英語で表しなさい。直訳でなくてよいが、内容をすべてふくめること。\n「私が去年カナダでホームステイをしたときにお世話になった家族は、とても親切でした。彼らは私に、英語を話すことを恐れないでと言ってくれました。その言葉のおかげで、私は英語を学ぶことがもっと好きになりました。」', limit: '30〜40語',
      hint: '「お世話になった家族」は the family I stayed with、「〜しないでと言った」は told me not to 〜、「〜のおかげで…になった」は 〜 made me … や Because of 〜, I … を使うと書けます。',
      model: 'The family I stayed with in Canada last year was very kind. They told me not to be afraid of speaking English. Their words made me like learning English more than before.',
      points: [['日本語の内容(家族・言われたこと・変化)をすべてふくんでいる', 3], ['後置修飾(関係代名詞・接触節)を正しく使っている', 2], ['tell 人 not to 〜 / make 人 〜 などの文型を正しく使っている', 3], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'The family which I stayed in Canada のように前置詞 with を落としたり、told me don\'t be afraid のように命令文をそのまま入れたりする答えは減点されます。' }],
    test: [
      { q: '並べかえよう。「あなたは彼がどこに住んでいるか知っていますか」(you / where / know / do / lives / he)?', a: 'Do you know where he lives?', exp: '外側の文 Do you know のあとに、間接疑問 where he lives をふつうの語順で置きます。' },
      { q: '並べかえよう。「私はあなたにこの本を読んでほしい」(want / read / to / you / I) this book.', a: 'I want you to read this book.', exp: 'want 人 to 〜 で「人に〜してほしい」です。人(you)は to の前に置きます。' },
      { q: '並べかえよう。「これは私が今までに見た中でいちばん美しい花です」This is (the / flower / have / most / beautiful / I) ever seen.', a: 'This is the most beautiful flower I have ever seen.', exp: '最上級の the most beautiful flower のあとに、I have ever seen(私がこれまでに見た)を続けます。関係代名詞 that が省略されています。' },
      { q: '並べかえよう。「彼女は私にその写真を見せてくれた」She (the picture / me / showed).', a: 'She showed me the picture.', exp: 'show 人 もの で「人にものを見せる」という SVOO の文です。showed the picture to me とも言えます。' },
      { q: '並べかえよう。「何か温かい飲み物はいかがですか」Would you like (hot / drink / to / something)?', a: 'Would you like something hot to drink?', exp: 'something を説明するときは、形容詞 hot を後ろに置き、さらに to drink を続けます。something hot to drink の語順です。' },
      { q: '並べかえよう。「この机は私が使うには大きすぎる」This desk is (for / to / me / big / too) use.', a: 'This desk is too big for me to use.', exp: 'too 〜 for 人 to … で「人が…するには〜すぎる」です。for me は to の直前に置きます。' },
      { q: '並べかえよう。「私たちはその犬をポチと名づけた」(the dog / named / we / Pochi).', a: 'We named the dog Pochi.', exp: 'name A B で「A を B と名づける」という SVOC の文です。the dog = Pochi という関係になります。' },
      { q: '1語補って並べかえよう。「ギターを弾いている男の子は私の弟です」The boy (the guitar / is / brother / my).', a: 'The boy playing the guitar is my brother.(補う語:playing)', exp: '「ギターを弾いている」は boy を後ろから説明する現在分詞 playing the guitar で表します。文の動詞は is です。' },
      { q: '並べかえよう。「私はこの町に10年間住んでいます」(this town / lived / I / in / have) for ten years.', a: 'I have lived in this town for ten years.', exp: '「10年間住んでいる」は現在完了の継続 have lived で表します。live in 〜 なので in を town の前に置きます。' },
      { q: '1語不要な語がある。並べかえよう。「彼女が描いた絵は美術館に展示されています」The picture (she / was / which / painted / is) shown in the museum.', a: 'The picture which she painted is shown in the museum.(不要:was)', exp: '骨組みは The picture is shown in the museum.(受動態)です。「彼女が描いた」は which she painted で picture を説明します。文の動詞は is なので、was は不要です。' }
    ],
    link: { prev: '中1〜中3で学んだ文法すべて(be動詞・一般動詞・時制・助動詞・不定詞・動名詞・比較・受動態・現在完了・分詞・関係代名詞・間接疑問)が土台です。',
      next: '高校の英文法では、5文型を軸にして、関係副詞・分詞構文・仮定法などのより長く複雑な文を読み書きします。文の骨組みを先に見抜く力は、高校の長文読解・英作文でもそのまま使えます。',
      cross: [['国語', '国語で学ぶ「主語・述語・修飾語」の関係を見つける力は、英語の並べかえでも同じように使えます。日本語の文の骨組みをつかむ練習が、英語の力にもつながります。'], ['数学', '並べかえは、条件を満たす並べ方をさがすパズルのようなものです。「動詞は1つ」「修飾は後ろ」などの条件から可能性をしぼっていく考え方は、数学の場合分けに似ています。']],
      univ: '言語学では、文の中の語がどのようにかたまり(句)を作り、組み合わさって文になるかを「統語論」として研究します。自動翻訳や文法チェックの技術も、こうした文の構造の分析にもとづいています。',
      readT: '文は「入れ子」でできている',
      read: '英語の文は、小さなかたまりを大きなかたまりの中に入れる「入れ子」のしくみでできています。たとえば The boy who is playing the guitar in the park is my brother. という文を見てみましょう。いちばん外側の骨組みは The boy is my brother. です。その中の the boy を、who is playing the guitar というかたまりが説明し、さらにその中の playing を in the park が説明しています。マトリョーシカ人形のように、かたまりの中にかたまりが入っているのです。言語学者のチョムスキーは、こうした入れ子のしくみが、人間の言葉の大きな特徴だと考えました。このしくみのおかげで、人は限られた単語から、いくらでも長く新しい文を作ることができます。並べかえ問題で「まず骨組み、次に説明のかたまり」と考えるのは、この入れ子の構造を外側からほどいていく作業なのです。' }
  });

  /* ===== 会話表現 ===== */
  add('e_talk', {
    rx: [
      { err: 'Would you mind 〜? に、引き受けるつもりで Yes. と答えてしまう(Would you mind opening the window? — Yes, sure.)。',
        why: 'mind が「気にする・いやだと思う」という意味だと意識せず、「頼まれたら Yes」と答える習慣のまま反応しているからです。',
        fix: 'mind の質問は「〜するのはいやですか」とたずねていると考えます。引き受けるなら「いやではない」ので No, not at all. / Of course not. と答えます。',
        q: '"Do you mind if I sit here?" に「どうぞ(かまいません)」と答える英語を書こう。', a: 'No, not at all.(Of course not. / No, go ahead.)',
        exp: 'Do you mind if 〜? は「〜したらいやですか」という意味なので、かまわないときは No で答えます。Yes と答えると「いやです」という意味になってしまいます。' },
      { err: '会話文の空所補充で、空所の直前の文だけを見て答えを選び、直後の応答と合わなくなる。',
        why: '会話の流れを「質問と答えの1組」だけで考え、空所の後ろにある相手の反応までを手がかりにしていないからです。',
        fix: '空所のある文の前後2〜3文を読み、空所の直後の応答(Sure. / That\'s too bad. など)から「空所はどんな種類の発言か(依頼・誘い・報告)」を逆算します。',
        q: '( )に入る文を選ぼう。A: ( ) B: That\'s too bad. I hope you get well soon. (ア)I have a cold. (イ)I won the game. (ウ)Let\'s play tennis.', a: '(ア)I have a cold.',
        exp: 'B の That\'s too bad.(それはお気の毒に)と I hope you get well soon.(早くよくなるといいね)から、A は体調が悪いことを伝えたとわかります。直後の応答から、空所の内容を逆算するのがコツです。' },
      { err: '「〜はどうですか」「〜しませんか」の提案の表現で、相手との関係や場面を考えずに Let\'s 〜 / You should 〜 を使い、押しつけがましく聞こえてしまう。',
        why: '提案の表現を意味だけで覚えていて、Let\'s は「いっしょにしよう」と決めてしまう強い言い方、Why don\'t you 〜? や How about 〜? はやわらかい提案、というちがいを意識していないからです。',
        fix: '自分もいっしょにするなら Let\'s / Shall we、相手にだけ勧めるなら Why don\'t you 〜? / How about 〜?、と「だれがするか」で選びます。目上の人には Would you like to 〜? を使います。',
        q: '先生に「いっしょに昼食を食べませんか」とていねいに誘う英文を書こう。', a: 'Would you like to have lunch with us(me)?',
        exp: 'Would you like to 〜? は「〜なさりたいですか」という、ていねいな誘いの表現です。先生のような目上の人には、Let\'s have lunch. よりも Would you like to 〜? のほうが失礼になりません。' }
    ],
    essay: [{ q: '次の場面で、あなたが言う英語を書きなさい。〔場面〕あなたは駅で、困った様子の外国人旅行者に声をかけます。旅行者は「市立美術館」への行き方を知りたがっています。美術館は、この駅から2つ目の駅で降りて、徒歩5分のところにあります。声のかけ方・道案内・最後のひとこと、をふくめること。', limit: '30〜40語',
      hint: 'May I help you? / Are you looking for 〜? で声をかけ、Take the train and get off at the second station. / It takes about five minutes on foot. などで説明します。最後に Have a nice day. などを加えましょう。',
      model: 'Excuse me. May I help you? The City Art Museum is not far. Take this train and get off at the second station. Then walk for about five minutes. Have a nice day!',
      points: [['声のかけ方として自然で、ていねいである', 2], ['電車の乗り方と降りる駅を正しく伝えている', 3], ['降りたあとの時間(徒歩5分)を正しく伝えている', 2], ['最後のひとことがあり、語数・文法・つづりを守っている', 3]],
      ng: 'Get off at two station. のように「2つ目の駅」を数字のままにしたり、It takes five minutes by walk. のように on foot を誤ったりする答えは減点されます。' }],
    test: [
      { q: '( )に入る文を選ぼう。A: Thank you for your help. B: ( )', choices: ['You\'re welcome.', 'Yes, please.', 'That\'s right.', 'Me too.'], a: 'A(You\'re welcome.)', exp: 'お礼を言われたときは You\'re welcome.(どういたしまして)と返します。No problem. や My pleasure. とも言えます。' },
      { q: '( )に入る文を選ぼう。A: Shall we go shopping? B: ( ) Where shall we go?', choices: ['No, thank you.', 'Yes, let\'s.', 'Yes, you shall.', 'No, you don\'t.'], a: 'B(Yes, let\'s.)', exp: 'Shall we 〜?(いっしょに〜しませんか)には、賛成なら Yes, let\'s. と答えます。直後に「どこへ行こうか」と続くので賛成の応答です。' },
      { q: '電話で「ケンさんをお願いできますか」と言う英文を書こう。', a: 'May I speak to Ken, please?(Can I speak to Ken?)', exp: '電話で相手を呼び出してもらうときは May I speak to 〜? を使います。May を使うとていねいになります。' },
      { q: '( )に入る文を選ぼう。(店で)A: ( ) B: Yes, I\'m looking for a T-shirt.', choices: ['How much is it?', 'May I help you?', 'Here you are.', 'I\'ll take it.'], a: 'B(May I help you?)', exp: '店員が客に声をかけるときは May I help you?(いらっしゃいませ、何かおさがしですか)です。B が「Tシャツをさがしています」と答えているのと合います。' },
      { q: '( )に入る文を選ぼう。A: Could you pass me the salt? B: ( )', choices: ['Sure. Here you are.', 'Yes, I could.', 'No, I\'m not.', 'You\'re welcome.'], a: 'A(Sure. Here you are.)', exp: 'Could you 〜? は依頼なので、引き受けて物を渡すときは Sure. Here you are. と答えます。Yes, I could. は能力の答えで不自然です。' },
      { q: '「駅への道を教えていただけますか」を英語にしよう。', a: 'Could you tell me the way to the station?', exp: 'the way to 〜 で「〜への道」です。道を「教える」には、口で伝える tell を使います。地図をかいて示すなら show も使えます。' },
      { q: '( )に入る文を選ぼう。A: I don\'t like carrots. B: ( ) I like potatoes better.', choices: ['Me too.', 'Me neither.', 'So do I.', 'Yes, I do.'], a: 'B(Me neither.)', exp: '否定文「〜が好きではない」に「私も(好きではない)」と言うときは、Me neither. や Neither do I. を使います。Me too. は肯定文への応答です。' },
      { q: '( )に入る文を選ぼう。A: Aren\'t you hungry? B: ( ) I had a big lunch.', choices: ['Yes, I am.', 'No, I\'m not.', 'Yes, I\'m not.', 'No, I am.'], a: 'B(No, I\'m not.)', exp: '否定の疑問文でも、答えの内容が否定(空腹ではない)なら No で答えます。「たくさん昼食を食べた」ので空腹ではないとわかります。' },
      { q: '( )に入る文を選ぼう。A: Can I leave a message? B: ( ) A: Please tell him to call me back.', choices: ['Sure.', 'Hold on, please.', 'Speaking.', 'You have the wrong number.'], a: 'A(Sure.)', exp: '伝言を残したいと言われ、そのあと A が伝言の内容を言っているので、受け入れる Sure. が入ります。Hold on, please. は「お待ちください」です。' },
      { q: '会話の流れに合うように、( )に4語以上の英文を書こう。A: Let\'s go to the movies this Sunday. B: Sorry, I can\'t. ( ) A: OK. How about Saturday?', a: '(例)I have to visit my grandmother.(I have a piano lesson that day.)', exp: '誘いを断ったあとには、その理由を言うのが自然です。A がそれに応じて別の日を提案しているので、「日曜日は都合が悪い理由」を書きます。理由の内容が合っていれば正解です。' }
    ],
    link: { prev: '助動詞(can・will・may・shall)の意味と疑問文の作り方、命令文、Let\'s の文が土台です。会話表現の多くは、これらの文法を決まった言い方として使ったものです。',
      next: '高校では、より自然な会話の表現(I was wondering if 〜 など)や、ディスカッション・プレゼンテーションの表現を学びます。リスニング試験でも、会話の流れをつかむ力が重要です。',
      cross: [['国語', '日本語の敬語(尊敬語・謙譲語・ていねい語)のように、英語でも Can you → Could you → Would you mind 〜? の順にていねいさが変わります。相手や場面で言葉を選ぶ点は同じです。'], ['社会', '観光地では、外国からの旅行者に道案内をする場面がふえています。地域の案内を英語でできることは、国際交流や観光の仕事にも役立ちます。']],
      univ: '言語学の一分野「語用論」では、言葉が場面の中でどのような意味をもつかを研究します。Can you pass me the salt? が能力の質問ではなく依頼になるのも、語用論で説明される現象です。',
      readT: '「塩を取れますか?」は質問ではない',
      read: '食卓で Can you pass me the salt? と言われて、Yes, I can. とだけ答えて何もしなかったら、相手はとまどうでしょう。文の形は「あなたは塩を渡すことができますか」という能力の質問ですが、本当の意味は「塩を取ってください」という依頼だからです。言葉の文字どおりの意味と、話し手が伝えたい意味がずれることは、日常会話ではよくあります。日本語でも、「窓、開いてるね」が「窓を閉めてほしい」という意味になることがありますね。こうした「遠回しな言い方」の研究は、言語学では語用論と呼ばれます。哲学者のオースティンやサールは、言葉を話すことは、情報を伝えるだけでなく「頼む」「約束する」「謝る」といった行為をすることでもある、と考えました。会話表現を覚えるときは、文の形だけでなく、その言葉で何をしているのかを考えると、使い方が深く身につきます。' }
  });

  /* ===== 前置詞・代名詞 ===== */
  add('e_prep', {
    rx: [
      { err: '日本語の「〜で」「〜に」をいつも同じ前置詞に置きかえてしまう(「駅で会う」も「バスで行く」も「英語で書く」も at にする)。',
        why: '日本語の助詞「で」は場所・手段・言語など多くの意味をもつのに、英語では意味ごとに前置詞を使い分けることを意識していないからです。',
        fix: '「で」を見たら、それが「場所」「手段・道具」「言語」「材料」のどれかを考えます。場所なら at・in、乗り物なら by、道具なら with、言語なら in と、意味で選びます。',
        q: '( )に前置詞を入れよう。(1) Let\'s meet ( ) the station. (2) I go to school ( ) bus. (3) Write your name ( ) English.', a: '(1) at (2) by (3) in',
        exp: '(1)は待ち合わせの「地点」なので at、(2)は交通手段なので by、(3)は使う言語なので in です。日本語ではすべて「で」ですが、英語では意味によって前置詞が変わります。' },
      { err: '「〜の中へ」と「〜の中で」、「〜へ」と「〜に向かって」など、動きの有無で前置詞を使い分けない(× He jumped in the river.(川に飛びこんだ、のつもり)× I arrived to Tokyo.)。',
        why: '前置詞を「場所を表す語」としてまとめて覚え、「止まっている場所」か「動いていく方向」かを区別していないからです。',
        fix: '動作が「外から中へ移動する」なら into、「中にいる」なら in、と動きの絵を思いうかべます。arrive は「到着した地点」に注目するので、at・in を使い、to は使いません。',
        q: '( )に前置詞を入れよう。(1) The cat ran ( ) the box. (2) We arrived ( ) the airport at noon.', a: '(1) into (2) at',
        exp: '(1)ネコが箱の外から中へ入りこむ動きなので into です。in だと「箱の中で走った」という意味にもとれます。(2)arrive は着いた地点に注目するので、空港のような地点には at を使います。' },
      { err: '「〜の」をいつも所有格や of で表そうとし、「私の友だちの1人」を my one friend や one of my friend としてしまう。',
        why: '日本語の「の」が1種類なので、英語でも所有格を重ねたり、of のあとを単数にしたりしてよいと思っているからです。',
        fix: '「〜の1人(1つ)」は one of + 所有格 + 複数名詞、「私の友だちである〜」は a friend of mine と覚えます。a my friend のように冠詞と所有格を並べないことも確かめます。',
        q: '「彼はぼくの友だちの1人です」を2通りの英語にしよう。', a: 'He is one of my friends. / He is a friend of mine.',
        exp: 'one of my friends は、何人かいる友だちの中の1人という意味なので friends と複数形にします。a friend of mine は、a と my を並べられないために mine(所有代名詞)を使う言い方です。' }
    ],
    essay: [{ q: 'あなたの部屋(または教室)の様子を、見たことのない人に英語で説明しなさい。家具やものの位置を、ちがう種類の前置詞を5つ以上使って説明すること。', limit: '40〜50語',
      hint: 'There is a desk by the window. / My bed is next to 〜. / There is a picture on the wall. / My bag is under the desk. / between A and B などを使います。位置関係がはっきりわかるように書きましょう。',
      model: 'Let me tell you about my room. There is a desk by the window. My bed is next to the desk. There is a picture of my family on the wall. I keep my bag under the bed and some books between the desk and the door.',
      points: [['部屋の様子が具体的に伝わる', 2], ['ちがう種類の前置詞を5つ以上、意味に合わせて正しく使っている', 5], ['There is / are と名詞の数が合っている', 1], ['語数を守り、文法・つづりのミスが少ない', 2]],
      ng: 'There are a desk のように be動詞と名詞の数が合わなかったり、on the wall を in the wall としたりする答えは減点されます。' }],
    test: [
      { q: '( )に入る語を選ぼう。My birthday is ( ) May 5.', choices: ['in', 'on', 'at', 'for'], a: 'B(on)', exp: '日付には on を使います。月だけなら in May、時刻なら at five です。' },
      { q: '( )に入る語を選ぼう。I usually get up ( ) six thirty.', choices: ['in', 'on', 'at', 'by'], a: 'C(at)', exp: '時刻には at を使います。「6時半に」は at six thirty です。' },
      { q: '( )に入る語を選ぼう。Please finish this work ( ) Friday.', choices: ['until', 'by', 'for', 'during'], a: 'B(by)', exp: '「金曜日までに(終える)」という期限は by です。until は「〜までずっと(続ける)」という継続を表します。' },
      { q: '「彼はその夏の間、3週間ハワイにいました」の( )に適語を入れよう。He stayed in Hawaii ( ) three weeks ( ) the summer.', a: 'for / during', exp: '「3週間」という期間の長さには for、「夏の間に」という特定の期間には during を使います。' },
      { q: '( )内の代名詞を正しい形にしよう。This is a present for (she). The idea was (she), too.', a: 'her / hers', exp: '前置詞 for のあとは目的格の her です。2文目は「その考えも彼女のもの」なので、所有代名詞 hers を使います。' },
      { q: '( )に入る語を選ぼう。The dog wagged ( ) tail.', choices: ['it', 'its', 'it\'s', 'their'], a: 'B(its)', exp: '「その犬のしっぽ」なので、it の所有格 its を使います。it\'s は it is(または it has)の短縮形です。' },
      { q: '( )に入る語を選ぼう。The bookstore is ( ) the bank and the post office.', choices: ['among', 'between', 'next', 'across'], a: 'B(between)', exp: '「A と B の間に」は between A and B です。3つ以上のものの間なら among を使います。' },
      { q: '( )に入る語を選ぼう。I\'ll be back ( ) ten minutes.', choices: ['for', 'in', 'after', 'by'], a: 'B(in)', exp: '「今から10分後に」は in ten minutes で表します。この in は「〜たったら」という時間の経過を表します。' },
      { q: '「私たちは公園を通りぬけて駅まで歩いた」の( )に前置詞を入れよう。We walked ( ) the park ( ) the station.', a: 'through / to', exp: '「〜を通りぬけて」は through、「〜まで(行き先)」は to を使います。through は中を通って反対側へ出るイメージです。' },
      { q: '次の英文の誤りを2か所直そう。I visited my uncle in last Sunday, and he gave a present to I.', a: 'in last Sunday → last Sunday(in を取る) / to I → to me', exp: 'last・next・this などがつくと、前置詞をつけずに last Sunday とします。前置詞 to のあとの代名詞は目的格 me にします。' }
    ],
    link: { prev: '名詞と代名詞のはたらき、主格・目的格の区別が土台です。これまでの単元でも、in the park・at seven・by bus など、前置詞はたくさん使ってきました。',
      next: '高校では、前置詞をふくむ熟語(look after・depend on など)や、前置詞 + 関係代名詞(the house in which I live)を学びます。前置詞の基本イメージを知っておくと、熟語の意味も推測しやすくなります。',
      cross: [['国語', '日本語の格助詞(が・を・に・で・へ・と・から・より)は、名詞のあとについて意味を表します。英語の前置詞は名詞の前に置くので、位置は逆ですが、はたらきはよく似ています。'], ['数学', '座標や図形の問題で使う「線分 AB の間の点」「円の内側・外側」などの位置関係は、between・inside・outside などの前置詞で表せます。']],
      univ: '言語学の一分野「認知言語学」では、前置詞の意味の広がりを、空間のイメージ(たとえば over の「上をこえる」)から説明します。1つの前置詞の多くの意味が、1つのイメージからつながっていると考えるのです。',
      readT: 'on は「くっついている」',
      read: 'on はよく「〜の上に」と訳されます。でも、a picture on the wall(壁にかかった絵)や a fly on the ceiling(天井にとまったハエ)では、絵もハエも「上」にはありません。では on の本当の意味は何でしょうか。認知言語学では、on の中心のイメージは「何かの表面にくっついている」ことだと考えます。机の上でも、壁でも、天井でも、表面に接していれば on なのです。このイメージから、on Monday(月曜日という日にくっついて)や、turn on the light(電気のスイッチを「くっつけて」入れる)、go on(とぎれずにつながって続ける)のような使い方も理解しやすくなります。前置詞の意味を日本語の訳だけで覚えると、たくさんの意味がばらばらに見えます。しかし、中心のイメージを1つつかむと、それぞれの使い方が一本の線でつながって見えてくるのです。' }
  });

  /* ===== 長文読解 ===== */
  add('e_read', {
    rx: [
      { err: '知らない単語が出てくるたびに読むのを止めてしまい、時間が足りなくなる、または文全体の意味を見失う。',
        why: '「すべての単語がわからないと読めない」と思いこみ、前後の文脈から意味を推測したり、わからない語を飛ばしたりする方法を練習していないからです。',
        fix: '知らない単語は、まず品詞(名詞か動詞か)だけ見当をつけて読み進めます。前後に言いかえや例(for example、or、that is)がないかを見て、意味を推測します。設問にかかわらない語は気にしません。',
        q: '下線部の意味を推測しよう。Some animals, such as bears and squirrels, hibernate. They sleep through the cold winter.(hibernate)', a: '冬眠する',
        exp: '直後の文に「寒い冬の間ずっと眠る」という説明があり、クマやリスという例も挙がっています。ここから hibernate は「冬眠する」という意味だと推測できます。後ろの文が言いかえになっていることに気づくのがポイントです。' },
      { err: '内容一致問題で、本文に書かれていない「常識」や自分の考えで正解を選んでしまう。',
        why: '選択肢の内容が「正しそう」かどうかで判断し、本文のどこに書かれているかを確かめていないからです。一般的に正しくても、本文になければ不正解です。',
        fix: '選択肢を選ぶ前に、その根拠になる本文の文に線を引きます。根拠となる文が見つからない選択肢は、どんなに正しそうでも選びません。',
        q: '本文:Ken started running every morning last month. He wants to join the city marathon next year. 選択肢:(ア)Running is good for your health. (イ)Ken plans to take part in a marathon. 本文の内容に合うのはどちらか。', a: '(イ)',
        exp: '(ア)は一般的には正しい内容ですが、本文には書かれていません。(イ)は「来年の市民マラソンに参加したい」という本文の内容を言いかえたものです。本文に根拠がある選択肢を選びます。' },
      { err: '段落の「主題文」を見つけようとせず、目についた具体例やエピソードを段落の要点だと考えてしまう。',
        why: '具体例は印象に残りやすく、くわしく書かれているので、それが筆者のいちばん言いたいことだと思ってしまうからです。',
        fix: '段落を読んだら「この段落を1文でまとめると?」と自分にたずねます。具体例は主張を支える材料なので、その例が何を説明するために出されたのかを考えます。主題文は段落の最初か最後にあることが多いです。',
        q: '次の段落の主題を日本語で答えよう。Many people think that cats don\'t like people. However, cats show love in their own ways. For example, they bring "presents" to their owners or follow them from room to room.', a: 'ネコは自分なりの方法で(人への)愛情を示す。',
        exp: 'However のあとの「ネコは自分なりの方法で愛情を示す」が筆者の主張です。For example 以下の「プレゼントを持ってくる」「部屋から部屋へついてくる」は、主張を支える具体例です。' }
    ],
    essay: [{ q: '次の英文を読んで、筆者の主張とその理由を、日本語で60〜80字にまとめなさい。\nMany students study until late at night before a test. However, sleep is an important part of learning. While we sleep, our brain organizes what we learned during the day. Students who sleep well often remember more. So, getting enough sleep may be a better way to prepare for a test than staying up late.', limit: '60〜80字',
      hint: 'However のあとが筆者の主張の始まりです。While we sleep 〜 と Students who sleep well 〜 が理由にあたります。最後の So 〜 の文が結論です。',
      model: 'テスト前は夜ふかしするより十分に眠るほうがよい。なぜなら、眠っている間に脳がその日に学んだことを整理し、よく眠る生徒のほうが多くを覚えていることが多いからだ。',
      points: [['筆者の主張(十分な睡眠のほうがよい)を正しく示している', 4], ['理由(睡眠中に脳が学んだことを整理する)をふくんでいる', 3], ['よく眠る生徒は多くを覚えている点をふくんでいる', 1], ['字数を守り、主張と理由の関係がわかる日本語である', 2]],
      ng: '「多くの生徒が夜遅くまで勉強する」という前置きの部分を主張としてまとめたり、「眠ると必ず成績が上がる」のように本文より言い過ぎたりする答えは減点されます。' }],
    test: [
      { q: '( )に入るつなぎことばを選ぼう。I wanted to go out. ( ), it was raining hard, so I stayed home.', choices: ['For example', 'However', 'Also', 'First'], a: 'B(However)', exp: '「出かけたかった」と「雨が強く降っていた」は反対の流れなので、逆接の However を使います。' },
      { q: '下線部 it が指すものを答えよう。My grandfather gave me an old watch. It was made in Switzerland.', a: 'an old watch(古い腕時計)', exp: '指示語 it は、ふつう前に出てきた単数のものを指します。直前の文の an old watch が、スイスで作られたものです。' },
      { q: '次の文は「事実」と「意見」のどちらか答えよう。(1) Tokyo Skytree is 634 meters tall. (2) Tokyo Skytree is the most beautiful tower in Japan.', a: '(1) 事実 (2) 意見', exp: '(1)の高さは調べて確かめられるので事実です。(2)の「いちばん美しい」は人によって感じ方がちがうので意見です。' },
      { q: '( )に入るつなぎことばを選ぼう。Plastic bags are useful. ( ), they cause problems for sea animals.', choices: ['So', 'Because', 'On the other hand', 'For example'], a: 'C(On the other hand)', exp: '「便利だ」という良い面に対して「海の動物に問題を起こす」という別の面を示しているので、On the other hand(一方で)が合います。' },
      { q: '本文:The museum is open from 9 a.m. to 5 p.m. It is closed on Mondays. 質問:Can you visit the museum at 10 a.m. on Monday? 英語で答えよう。', a: 'No, I(we) can\'t.(No, you can\'t.)', exp: '月曜日は休館日なので、午前10時でも入れません。Can 〜? には can を使って答えます。営業時間だけを見て Yes と答えないように注意しましょう。' },
      { q: '次の文と同じ内容を表すものを選ぼう。Tom is not as tall as Ken.', choices: ['Tom is taller than Ken.', 'Ken is taller than Tom.', 'Tom and Ken are the same height.', 'Ken is not tall.'], a: 'B(Ken is taller than Tom.)', exp: '「トムはケンほど背が高くない」は「ケンはトムより背が高い」と言いかえられます。読解では、こうした言いかえを見抜く力が問われます。' },
      { q: '下線部 this が指す内容を日本語で答えよう。Some people throw away food that they can still eat. We should stop this.', a: 'まだ食べられる食べ物を捨てること', exp: 'this は、直前の文の内容全体「まだ食べられる食べ物を捨てること」を指しています。this は名詞1語だけでなく、前の文全体の内容を指すこともあります。' },
      { q: '文章の順番として正しいものを選ぼう。(a) Then, she practiced every day. (b) At first, Yumi could not swim. (c) Finally, she swam 100 meters.', choices: ['(a)-(b)-(c)', '(b)-(a)-(c)', '(b)-(c)-(a)', '(c)-(a)-(b)'], a: 'B((b)-(a)-(c))', exp: 'At first(最初は)、Then(それから)、Finally(ついに)という時の順序を表す語が手がかりです。' },
      { q: '本文:Ms. Sato has lived in Kyoto for twenty years. She came there from Hokkaido. 質問:Where did Ms. Sato live before she moved to Kyoto? 英語で答えよう。', a: 'She lived in Hokkaido.', exp: '「北海道から京都に来た」とあるので、京都に移る前は北海道に住んでいました。質問が did を使った過去の文なので、答えも過去形 lived にします。' },
      { q: '次の英文の筆者がいちばん言いたいことを選ぼう。Reading books has many good points. It gives us new knowledge. It also helps us understand other people\'s feelings. So I think everyone should read books.', choices: ['本から新しい知識が得られる。', '他人の気持ちを理解することは大切だ。', 'だれもが本を読むべきだ。', '本にはよい点も悪い点もある。'], a: 'C(だれもが本を読むべきだ。)', exp: 'So I think 〜 のあとが筆者の結論です。「知識が得られる」「気持ちを理解できる」は、その結論を支える理由です。' }
    ],
    link: { prev: 'これまで学んだすべての文法と単語が土台です。とくに、接続詞・代名詞・関係代名詞の知識は、文と文のつながりを読みとるのに欠かせません。',
      next: '高校の長文読解では、500語をこえる論説文や物語文を読み、要約・内容説明・英問英答に答えます。パラグラフの構成をつかむ読み方は、大学入試の英語でもそのまま使えます。',
      cross: [['国語', '説明文で「筆者の主張」と「具体例」を区別する読み方や、指示語・接続語に注目する読み方は、国語の読解とまったく同じ考え方です。'], ['社会', '新聞記事やグラフつきの資料を英語で読むときは、事実と意見を区別し、数値の根拠を確かめる力が必要です。これは社会科の資料読解でも大切な力です。']],
      univ: '大学では、英語で書かれた論文や資料を大量に読みます。全部を精読するのではなく、要旨をつかむ「速読」と、大切な部分をくわしく読む「精読」を使い分ける力が求められます。',
      readT: '英語の段落は「結論が先」',
      read: '英語の説明文を読むと、多くの段落が、その段落でいちばん言いたいこと(主題文)から始まっていることに気づきます。そのあとに理由や具体例が続き、最後にもう一度まとめる、という形です。この書き方は英語の作文教育でよく教えられていて、英語圏の学生は、段落の最初の文で要点を示すように練習します。そのため、各段落の最初の1文だけをつなげて読むと、文章全体の要旨がおおまかにつかめることがよくあります。これは「スキミング」と呼ばれる速読の方法の1つです。一方、日本語の文章では、理由や経緯を説明してから最後に結論を述べる書き方もよく見られます。どちらが良い・悪いではなく、書き方の習慣のちがいです。ただし、すべての英文がこの形とは限りません。物語文や、問いかけから始まる文章もあるので、「最初の文に注目しつつ、全体の流れで確かめる」ことが大切です。' }
  });

  /* ===== 英作文 ===== */
  add('e_write', {
    rx: [
      { err: '書きたい日本語を先に完成させ、それを1文ずつ直訳しようとして、知らない単語や複雑な構文で行きづまる。',
        why: '日本語で考えた内容が、自分の書ける英語のレベルをこえていることに気づかず、「訳せない文」を作ってしまうからです。',
        fix: '書く前に、言いたいことを「中学生の英語で書ける内容」にかみくだきます。「充実した毎日を送る」→「毎日が楽しい」(Every day is fun.)のように、まず簡単な日本語に言いかえてから英語にします。',
        q: '「私は環境問題に関心を持っています」を、中学で習った簡単な英語で書こう。', a: 'I am interested in environmental problems.(I am interested in problems of the earth.)',
        exp: '「関心を持っている」は be interested in 〜 で表せます。environmental が書けなければ、problems of the earth(地球の問題)のように、知っている語で言いかえれば十分伝わります。' },
      { err: '理由を書くときに、意見と関係の薄い理由や、意見をくり返しただけの理由を書いてしまう(「スマホは必要だ。なぜならスマホは大切だから。」)。',
        why: '「理由を1つ書く」という形式を満たすことに気をとられ、その理由が意見を本当に支えているかを確かめていないからです。',
        fix: '書いた理由に「だから〜だ」と意見をつなげて読んでみます。「スマホは大切だ。だから必要だ」では同じことのくり返しです。「すぐに家族と連絡がとれる。だから必要だ」のように、具体的な事実や場面を理由にします。',
        q: '「I think students should have smartphones.」に続ける理由として、より適切なものを選ぼう。(ア)Smartphones are important. (イ)They can contact their families quickly in an emergency.', a: '(イ)',
        exp: '(ア)は「スマホは大切だ」と意見を言いかえただけで、理由になっていません。(イ)は「緊急時にすぐ家族と連絡がとれる」という具体的な場面を示しているので、意見を支える理由になります。' },
      { err: '語数を増やそうとして、同じ内容を言い方だけ変えてくり返したり、条件と関係のない話を加えたりする。',
        why: '語数を満たすことが目的になり、「内容の深さ」で語数を増やす方法を知らないからです。採点では、くり返しや無関係な内容は評価されません。',
        fix: '語数が足りないときは、理由に「具体例(For example, 〜)」や「その結果どうなるか(So, 〜)」を1文足します。意見→理由→具体例→まとめ、の順で、それぞれの文に新しい情報を入れます。',
        q: 'I like summer because I can swim in the sea. に、具体例を加える英文を1文書こう。', a: '(例)For example, I swam in the sea in Okinawa with my family last year.',
        exp: 'For example を使って、実際の体験を具体的に書くと、新しい情報を加えながら語数を増やせます。過去の体験を書くときは、動詞を過去形にすることに注意しましょう。' }
    ],
    essay: [{ q: '「中学生がアルバイトやボランティアなど、学校の外で活動することは大切だ」という意見について、あなたの考えを英語で書きなさい。賛成か反対かをはっきり示し、理由を2つ、具体例を1つ以上ふくめること。', limit: '40〜50語',
      hint: 'I agree(disagree) with this idea. で立場を示し、First, 〜. Second, 〜. で理由、For example, 〜. で具体例を書きます。最後に So I think 〜. でまとめましょう。',
      model: 'I agree with this idea. First, students can meet people of different ages outside school. Second, they can learn how to work with others. For example, I joined a beach cleanup last summer and talked with many adults. So I think these activities are important.',
      points: [['立場が明確で、最後にまとめがある', 2], ['理由が2つあり、意見をしっかり支えている', 3], ['具体例が理由とつながっている', 2], ['語数を守り、文法・つづりのミスが少ない', 3]],
      ng: '理由が「大切だから」のように意見のくり返しになっていたり、具体例が理由と関係のない話になっていたりする答えは減点されます。' }],
    test: [
      { q: '次の文の誤りを直そう。I am agree with you.', a: 'I agree with you.', exp: 'agree(賛成する)は一般動詞なので、be動詞はいりません。「〜に賛成だ」は agree with 〜 です。' },
      { q: '次の文の誤りを直そう。Because I like animals.', a: '(例)I want to be a vet because I like animals.', exp: 'because 〜 だけでは文として完成していません。主張の文と because 〜 を1文につなげて書きます。' },
      { q: '「私は将来、先生になりたいです」を英語にしよう。', a: 'I want to be(become) a teacher in the future.', exp: 'want to be 〜 で「〜になりたい」です。a teacher の a を忘れないようにしましょう。' },
      { q: '( )に入るつなぎことばを選ぼう。I like reading. ( ), I read about three books a month.', choices: ['However', 'For example', 'But', 'Or'], a: 'B(For example)', exp: '「読書が好き」という内容を、「月に3冊ほど読む」という具体的な例で説明しているので For example が合います。' },
      { q: '次の文の誤りを直そう。I enjoyed to talk with my friends.', a: 'I enjoyed talking with my friends.', exp: 'enjoy は動名詞をとる動詞なので、to talk ではなく talking にします。' },
      { q: '「彼女は友だちがたくさんいます」を英語にしよう。', a: 'She has a lot of(many) friends.', exp: '「〜がいる」は have で表せます。主語 she なので has です。friends は複数形にします。' },
      { q: '次の2文を、自然な1文につなげよう。It was rainy. We didn\'t play soccer.', a: 'It was rainy, so we didn\'t play soccer.(We didn\'t play soccer because it was rainy.)', exp: '「雨だった」が原因、「サッカーをしなかった」が結果なので、so または because でつなげます。' },
      { q: '次の文の誤りを2か所直そう。Last summer, I go to Hokkaido and eat delicious seafood.', a: 'go → went / eat → ate', exp: 'Last summer(去年の夏)の体験なので、動詞はすべて過去形にします。and のあとの eat も過去形 ate にします。' },
      { q: '和文英訳:「その本は私にとって読むのが難しかった」', a: 'It was difficult for me to read the book.(The book was difficult for me to read.)', exp: 'It is 〜 for 人 to … の型を使うと書けます。過去のことなので was を使います。' },
      { q: '次の英文を、条件「理由を1つ加える」に合うように1文足そう。I think winter is the best season.', a: '(例)I can enjoy skiing with my friends in winter.', exp: '冬がいちばん良い季節だと考える理由を、具体的な活動で示します。意見をくり返すのではなく、新しい情報になる理由を書くことが大切です。' }
    ],
    link: { prev: '中学で学んだ文法すべてと、会話表現・つなぎことばが土台です。とくに、be動詞と一般動詞の区別、時制、動詞の後ろの形(to 〜 / 〜ing)は、英作文で減点を防ぐかぎになります。',
      next: '高校では、50〜100語の意見文、グラフの説明、メールの返信などを書きます。大学入試では、自由英作文や要約が出題されることが多く、「意見→理由→具体例→まとめ」の型がそのまま使えます。',
      cross: [['国語', '意見文を書くときの「主張・根拠・結論」という組み立ては、国語の作文や小論文とまったく同じです。日本語で論理的に書く力が、英作文の土台になります。'], ['社会', '「中学生にスマホは必要か」のような身近な問題について、賛成・反対の両方の立場を考えることは、社会科の討論やディベートでも大切な力です。']],
      univ: '大学では、英語でレポートや論文を書く機会があります。英語の論文には、序論・本論・結論という決まった組み立てがあり、中学で学ぶ「意見→理由→まとめ」はその小さな形です。',
      readT: 'パラグラフ・ライティングの「ハンバーガー」',
      read: '英語の作文の書き方を教えるとき、「ハンバーガー」にたとえることがあります。上のパンは、言いたいことを最初に示す主題文(トピック・センテンス)です。間にはさまる肉や野菜は、主張を支える理由や具体例(サポート)です。そして下のパンは、もう一度まとめる結論の文(コンクルーディング・センテンス)です。パンだけでは中身がありませんし、具がばらばらではハンバーガーになりません。上と下のパンが同じ方向を向き、具がしっかりはさまっていることが大切なのです。この型は単純ですが、読み手にとって「何が言いたいのか」がすぐにわかるという大きな利点があります。中学の英作文で学ぶ「意見→理由→まとめ」は、まさにこのハンバーガーの形です。高校や大学で長い英文を書くときも、段落ごとにこのハンバーガーを積み重ねていけば、論理の通った文章になります。' }
  });

})(WPS.LESSONS);
