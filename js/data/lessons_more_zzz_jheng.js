/* テキスト拡充・第4弾(担当:jheng) */
(function (L) {
  function add(id, o) { var x = L[id]; if (!x) return; ['pat', 'more'].forEach(function (k) { if (o[k]) x[k] = (x[k] || []).concat(o[k]); }); }

  add('e_m1', {
    pat: [
      { name: '長い主語に合わせて be動詞を選ぶ', freq: 'とてもよく出る', when: '空所の前の主語が「名詞 + in 〜 / on 〜」や「A and B」のように長いとき。空所のすぐ前の語が単数か複数かでまどわせる問題です。', how: ['主語のかたまりの中で、いちばん中心になる名詞(「何が」にあたる語)を探します。', 'in・on・of などの前置詞の後ろの名詞は、主語の中心ではないので数に入れません。', 'A and B は2人・2つなので複数と考えます。', '中心の名詞が1つなら is、複数なら are、I なら am を選びます。'], ex: { q: '( )に am・is・are から1つ選ぼう。The flowers in this vase ( ) from my garden.', a: 'are', exp: '主語の中心は flowers(花)で複数です。すぐ前の vase(花びん)は in の後ろの名詞なので、数を決める語ではありません。近い語に引っぱられて is にしないことが大切です。' } },
      { name: '否定文・疑問文への書きかえと答え方', freq: 'とてもよく出る', when: '「否定文にしなさい」「疑問文にして Yes / No で答えなさい」という指示があるとき。', how: ['文の中の be動詞(am・is・are)を見つけます。', '否定文なら be動詞のすぐ後ろに not を置きます。', '疑問文なら be動詞を主語の前に出し、文の最後を ? にします。', '答えでは主語を代名詞(he・she・it・they など)にかえ、同じ be動詞を使います。'], ex: { q: 'Your aunt is a pilot. を疑問文にして、Yes で答えよう。', a: 'Is your aunt a pilot? — Yes, she is.', exp: 'be動詞 is を主語 your aunt の前に出します。答えでは your aunt(おば)を女性の代名詞 she にかえます。Yes の答えでは she\'s のように短縮しない点にも注意しましょう。' } },
      { name: 'be動詞と一般動詞の重ね使い(誤文訂正)', freq: 'よく出る', when: '英文の中に am・is・are と play・like などの動詞が並んでいるとき。「誤りを直しなさい」という問題でねらわれます。', how: ['文の中の動詞の数を数えます。英語の文では、ふつう動詞は1つです。', '「〜です・〜にいる」というイコールや場所の関係なら be動詞だけにします。', '「〜する・〜が好き」などの動作や気持ちなら一般動詞だけにします。', '主語が3人称単数なら、一般動詞に s をつけるのを忘れないようにします。'], ex: { q: '誤りを直そう。My brother is like baseball.', a: 'My brother likes baseball.', exp: 'like(好きである)は一般動詞なので、is はいりません。is を消すと主語が3人称単数になるので、like に s をつけて likes にします。「です」という日本語につられて be動詞を入れるのがよくあるミスです。' } },
      { name: '主語と名詞の数をそろえる', freq: 'よく出る', when: 'be動詞の後ろが名詞で、選択肢に a〜・〜s のちがいがあるとき。', how: ['主語が1人・1つか、2人・2つ以上かを確かめます。', '主語が単数なら、後ろの数えられる名詞に a・an をつけます。', '主語が複数なら、後ろの名詞も複数形にし、a はつけません。', '後ろが形容詞だけなら、a も s もつけません。'], ex: { q: '( )に入るものを選ぼう。Mika and Ryo are ( ).  ア a good singer  イ good singer  ウ good singers  エ a good singers', a: 'ウ good singers', exp: '主語の Mika and Ryo は2人なので、イコールでつながる名詞も複数形 singers にします。a は「1人の」という意味なので、複数形にはつけません。形容詞 good には s をつけません。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。My mother ( ) a nurse.', choices: ['am', 'is', 'are', 'be'], a: 'B(is)', exp: '主語の my mother(私の母)は1人で、I でも you でもないので is を使います。「母 = 看護師」というイコールの関係です。' },
      { lv: 1, q: '( )に入る語を選ぼう。Ken and I ( ) in the gym now.', choices: ['am', 'is', 'are', 'be'], a: 'C(are)', exp: 'Ken and I は2人なので we と同じ扱いになり、are を使います。すぐ前の I につられて am にしないように注意しましょう。' },
      { lv: 1, q: '次の文を否定文にしよう。This box is heavy.', a: 'This box is not heavy.(This box isn\'t heavy.)', exp: '否定文は be動詞のすぐ後ろに not を置きます。is not は短縮して isn\'t とも書けます。' },
      { lv: 1, q: '次の文を疑問文にしよう。They are from Kenya.', a: 'Are they from Kenya?', exp: '疑問文は be動詞 are を主語 they の前に出し、最後に ? をつけます。from 〜 は「〜出身」という意味です。' },
      { lv: 1, q: 'Is this your cap? に No で答えよう。', a: 'No, it isn\'t.(No, it is not.)', exp: 'this(これ)でたずねられたら、答えでは it にかえます。No の答えは is の後ろに not をつけます。' },
      { lv: 1, q: '次の短縮形を書こう。(1) I am (2) they are (3) is not', a: '(1) I\'m (2) they\'re (3) isn\'t', exp: '短縮形はアポストロフィ(\')で文字を省いたしるしをつけます。(3)は is はそのままで not の o が消えます。' },
      { lv: 1, q: '( )に入る語を選ぼう。Our cat ( ) under the bed.(私たちのネコはベッドの下にいます。)', choices: ['am', 'is', 'are', 'be'], a: 'B(is)', exp: 'be動詞には「〜にいる・ある」という意味もあります。主語の our cat は1ぴきなので is を使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。The students in my class ( ) very kind.', choices: ['am', 'is', 'are', 'be'], a: 'C(are)', exp: '主語の中心は students(生徒たち)で複数なので are です。in my class の class は主語の中心ではないので、is にしません。' },
      { lv: 2, q: '誤りを直そう。Mana is like music very much.', a: 'Mana likes music very much.', exp: 'like は一般動詞なので is はいりません。is を消すと主語 Mana が3人称単数なので、like を likes にします。' },
      { lv: 2, q: 'Are your sisters at home? に No で答えよう。', a: 'No, they aren\'t.(No, they are not.)', exp: 'your sisters(あなたの姉妹たち)は複数なので、答えでは they にかえます。be動詞も are のまま使います。' },
      { lv: 2, q: 'Emi is hungry. の Emi を Emi and Yuta にかえて、全文を書きなおそう。', a: 'Emi and Yuta are hungry.', exp: '主語が2人になるので、be動詞を is から are にかえます。hungry は形容詞なので形はかわりません。' },
      { lv: 2, q: '( )に入るものを選ぼう。We are ( ).', choices: ['a doctor', 'doctor', 'doctors', 'a doctors'], a: 'C(doctors)', exp: '主語 we は複数なので、イコールでつながる名詞も複数形 doctors にします。複数形には a をつけません。' },
      { lv: 2, q: '「あの古い建物は博物館ではありません」を英語にしよう。', a: 'That old building is not a museum.(That old building isn\'t a museum.)', exp: '主語は that old building(あの古い建物)で1つなので is を使い、否定は is not です。museum は数えられる名詞なので a をつけます。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Is Mr. Sato your science teacher? — ( )', choices: ['Yes, he is.', 'Yes, he\'s.', 'Yes, it is.', 'Yes, he does.'], a: 'A(Yes, he is.)', exp: 'Mr. Sato は男性なので he で答えます。be動詞の疑問文には be動詞で答え、Yes の答えでは he\'s と短縮しません。' },
      { lv: 2, q: '( )に a か an を入れよう。(1) He is ( ) English teacher. (2) It is ( ) useful book.', a: '(1) an (2) a', exp: 'a・an はすぐ後ろの語の最初の「音」で決めます。English は母音の音で始まるので an、useful は「ユ」という子音の音で始まるので a です。' },
      { lv: 3, q: '( )に be動詞を入れよう。Ken and his brother ( ) not in the room now. One of them ( ) in the garden.', a: 'are / is', exp: '1つ目の主語 Ken and his brother は2人なので are です。2つ目の主語は one of them(彼らのうちの1人)で、中心は one なので is になります。' },
      { lv: 3, q: '誤りを直そう。This is my friends, Ken and Ryo.', a: 'These are my friends, Ken and Ryo.', exp: '紹介しているのは Ken と Ryo の2人なので、主語は複数の these(これらの人たち)、be動詞は are にします。This is のままでは数が合いません。' },
      { lv: 3, q: '( )に be動詞を入れよう。Hello. I ( ) Aya. My parents ( ) teachers. My dog Kuro ( ) five years old.', a: 'am / are / is', exp: '主語ごとに判断します。I には am、my parents(両親)は2人なので are、my dog Kuro は1ぴきなので is です。紹介文では主語が次々とかわる点に注意しましょう。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['My shoes is new.', 'The boy and the girl is tall.', 'Everyone in the class is happy.', 'These pencil are mine.'], a: 'C(Everyone in the class is happy.)', exp: 'everyone(みんな)は意味は大勢でも、文法では単数として扱うので is です。A は shoes が複数で are、B は2人で are、D は pencils にする必要があります。' },
      { lv: 3, q: '「あなたのお兄さんと私は同じチームにいます」を英語にしよう。', a: 'Your brother and I are on the same team.', exp: '主語 your brother and I は2人なので are を使います。「チームに所属している」は on the team と表すのがふつうです(in the team とも言います)。I は and の後ろに置くのが礼儀です。' }
    ]
  });

  add('e_pres', {
    pat: [
      { name: '主語を見て三単現の s をつける', freq: 'とてもよく出る', when: '( )内の動詞を適切な形にする問題で、現在の文の主語が he・she・it や「1人・1つの名詞」のとき。', how: ['文の時(現在・過去)を確かめます。every day・usually などがあれば現在です。', '主語が I・you・複数かどうかを確かめます。そうでなければ3人称単数です。', '3人称単数なら動詞に s・es をつけます(have は has)。', '主語が長いときは、中心の名詞で単数か複数かを決めます。'], ex: { q: '( )内の語を適切な形にしよう。My uncle ( live ) in Hokkaido.', a: 'lives', exp: '主語 my uncle(私のおじ)は1人で、I でも you でもないので3人称単数です。現在の文なので live に s をつけて lives にします。' } },
      { name: 'does を使う否定文・疑問文', freq: 'とてもよく出る', when: '主語が3人称単数で、動詞に s がついている文を否定文・疑問文にするとき。', how: ['動詞についた s・es を見つけます。', '否定文は動詞の前に does not(doesn\'t)を置きます。', '疑問文は Does を文の先頭に置きます。', 'どちらも、does の後ろの動詞は s をとった原形にもどします。'], ex: { q: 'Kenta plays the drums. を否定文にしよう。', a: 'Kenta does not play the drums.(Kenta doesn\'t play the drums.)', exp: 'does が「3人称単数・現在」のしるしを引き受けるので、後ろの動詞は原形 play にもどします。× doesn\'t plays は、しるしを2回つけたことになるのでまちがいです。' } },
      { name: 's・es・ies のつけ分け', freq: 'よく出る', when: '動詞の3人称単数現在形を書かせる問題や、つづりの正しいものを選ぶ問題。', how: ['ふつうの動詞は s をつけます(play → plays)。', 's・x・sh・ch・o で終わる語は es をつけます(watch → watches、go → goes)。', '「子音字 + y」で終わる語は y を i にかえて es(study → studies)。母音 + y はそのまま s(enjoy → enjoys)。', 'have は has になる、特別な形として覚えます。'], ex: { q: '3人称単数現在形にしよう。(1) fix (2) carry (3) stay', a: '(1) fixes (2) carries (3) stays', exp: '(1) x で終わるので es をつけます。(2) carry は r(子音字)+ y なので y を i にかえて es。(3) stay は a(母音字)+ y なので、そのまま s をつけます。' } },
      { name: '頻度を表す副詞の位置', freq: 'よく出る', when: 'always・usually・often・sometimes などを正しい位置に入れる問題や、並べかえ問題。', how: ['文の動詞が be動詞か一般動詞かを確かめます。', 'be動詞の文なら、be動詞のすぐ後ろに置きます。', '一般動詞の文なら、一般動詞のすぐ前に置きます(s はそのまま動詞につけます)。', '否定文では doesn\'t の後ろ(doesn\'t always など)に置くこともあります。'], ex: { q: 'usually を正しい位置に入れよう。My father drives to work.', a: 'My father usually drives to work.', exp: 'drives は一般動詞なので、usually はそのすぐ前に置きます。usually が入っても、主語は3人称単数のままなので drives の s は残ります。be動詞の文なら is usually の順です。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。Tom ( ) basketball every Sunday.', choices: ['play', 'plays', 'playing', 'is play'], a: 'B(plays)', exp: '主語 Tom は3人称単数で、every Sunday(毎週日曜日)があるので現在の習慣です。play に s をつけます。' },
      { lv: 1, q: '3人称単数現在形にしよう。(1) wash (2) try (3) say', a: '(1) washes (2) tries (3) says', exp: '(1) sh で終わるので es。(2) 子音字 + y なので y を i にかえて es。(3) say は母音字 a + y なので、そのまま s です。' },
      { lv: 1, q: '次の文を否定文にしよう。My father drinks tea.', a: 'My father does not drink tea.(My father doesn\'t drink tea.)', exp: '主語が3人称単数なので does not を使い、動詞は s をとって原形 drink にもどします。' },
      { lv: 1, q: '次の文を疑問文にしよう。Mai speaks Korean.', a: 'Does Mai speak Korean?', exp: '主語が3人称単数なので Does を文の先頭に置きます。speaks は原形 speak にもどします。' },
      { lv: 1, q: '( )に入る語を選ぼう。Do you ( ) a smartphone?', choices: ['has', 'have', 'having', 'to have'], a: 'B(have)', exp: 'Do で始まる疑問文では、動詞は原形にします。主語は you なので、もともと has にはなりません。' },
      { lv: 1, q: 'Does your brother cook dinner? に Yes で答えよう。', a: 'Yes, he does.', exp: 'Does 〜? の疑問文には does を使って答えます。your brother は男性なので he にかえます。' },
      { lv: 1, q: '( )に入る語を選ぼう。My sister and I ( ) to the same school.', choices: ['go', 'goes', 'going', 'is go'], a: 'A(go)', exp: '主語 my sister and I は2人なので複数です。3人称単数ではないので s はつけず、go のままです。' },
      { lv: 2, q: '誤りを直そう。She doesn\'t likes carrots.', a: 'She doesn\'t like carrots.', exp: 'doesn\'t の後ろの動詞は原形です。does が3人称単数のしるしを受けもっているので、likes の s はとります。' },
      { lv: 2, q: '( )に入る語を選ぼう。Who ( ) this room every day? — Ken does.', choices: ['clean', 'cleans', 'do clean', 'does clean'], a: 'B(cleans)', exp: '疑問詞 who が主語のとき、ふつう3人称単数として扱い、動詞に s をつけます。答えの Ken does. も does です。' },
      { lv: 2, q: 'Yumi has a rabbit. を疑問文にし、No で答えよう。', a: 'Does Yumi have a rabbit? — No, she doesn\'t.', exp: 'has は have の3人称単数現在形です。疑問文では Does を前に出し、has を原形 have にもどします。' },
      { lv: 2, q: '「私の祖母は毎朝5時半に起きます」を英語にしよう。', a: 'My grandmother gets up at five thirty every morning.', exp: '主語 my grandmother は3人称単数なので get に s をつけて gets up です。時刻の前には at を使います。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。Ken eats 【rice】 for breakfast.', a: 'What does Ken eat for breakfast?', exp: '「何を」は what で文の先頭に置き、その後ろは does Ken eat と疑問文の語順にします。eats は原形 eat にもどします。' },
      { lv: 2, q: '( )に入る語を選ぼう。Everyone in my family ( ) baseball.', choices: ['like', 'likes', 'liking', 'are like'], a: 'B(likes)', exp: 'everyone は文法では単数として扱うので、動詞に s がつきます。family につられず、主語の中心 everyone で考えます。' },
      { lv: 2, q: 'often を正しい位置に入れよう。(1) Aki is busy on Mondays. (2) Aki cooks on Sundays.', a: '(1) Aki is often busy on Mondays. (2) Aki often cooks on Sundays.', exp: '頻度の副詞は、be動詞の文では be動詞の後ろ、一般動詞の文では一般動詞の前に置きます。(2)の cooks の s はそのままです。' },
      { lv: 2, q: '3人称単数現在形にしよう。(1) teach (2) fly (3) enjoy', a: '(1) teaches (2) flies (3) enjoys', exp: '(1) ch で終わるので es。(2) 子音字 l + y なので flies。(3) 母音字 o + y なので s だけで enjoys です。' },
      { lv: 3, q: '( )内の語を適切な形にしよう。This is my friend Lucy. She ( come ) from Australia. She ( not / eat ) natto. Her brothers ( play ) rugby.', a: 'comes / doesn\'t eat / play', exp: 'She は3人称単数なので comes、否定は doesn\'t + 原形 eat です。最後の主語 her brothers は複数なので、play に s はつけません。' },
      { lv: 3, q: '誤りを直そう。Does your parents work in Tokyo?', a: 'Do your parents work in Tokyo?', exp: '主語 your parents(両親)は2人で複数です。3人称単数ではないので Does ではなく Do を使います。your につられないようにしましょう。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['My dog run fast.', 'Does she has a pen?', 'He watches TV after dinner.', 'Jim don\'t know me.'], a: 'C(He watches TV after dinner.)', exp: 'C は主語 he に合わせて watches と es がついています。A は runs、B は have、D は doesn\'t にする必要があります。' },
      { lv: 3, q: '「私の兄は自分の部屋をそうじしませんが、私の姉は毎日します」を英語にしよう。', a: 'My brother doesn\'t clean his room, but my sister does every day.', exp: '後半の「します」は clean her room のくり返しなので、does 1語で代わりにできます。どちらの主語も3人称単数なので doesn\'t・does を使います。' },
      { lv: 3, q: '答えの文に合う疑問文を書こう。— She teaches English at a junior high school.(職業をたずねる)', a: 'What does she do?', exp: 'What does 〜 do? は「〜は(仕事として)何をしていますか」と職業をたずねる決まった言い方です。今していることではなく、ふだんの仕事を表します。' }
    ]
  });

  add('e_prog', {
    pat: [
      { name: '合図のことばで現在形か進行形かを決める', freq: 'とてもよく出る', when: '文に now・Look!・Listen!・right now や、every day・usually・on Sundays などの語があるとき。', how: ['文の中の「時の合図」を探します。', 'now・Look!・Listen! は「今まさにしている」の合図なので進行形にします。', 'every 〜・usually・often は「ふだんの習慣」の合図なので現在形にします。', '進行形にするときは、主語に合わせて am・is・are を選び、動詞を ing 形にします。'], ex: { q: '( )内の語を適切な形にしよう。Look! A cat ( sleep ) on the car.', a: 'is sleeping', exp: 'Look!(見て!)は目の前で今起きていることを示す合図なので、現在進行形にします。主語 a cat は1ぴきなので is sleeping です。' } },
      { name: '進行形にしない動詞(状態動詞)', freq: 'よく出る', when: 'know・like・want・have(持っている)・see・hear など、気持ちや状態を表す動詞が出てきて、選択肢に ing 形があるとき。', how: ['動詞が「動作(動いている途中がある)」か「状態(ずっとそうである)」かを考えます。', 'know・like・love・want・need・have(持っている)などは状態なので、now があっても現在形にします。', 'have が「食べる・過ごす」の意味なら動作なので、進行形にできます。'], ex: { q: '誤りを直そう。He is knowing a lot about trains.', a: 'He knows a lot about trains.', exp: 'know(知っている)は「知っている状態」を表す動詞で、途中というものがないため、ふつう進行形にしません。主語 he に合わせて現在形 knows を使います。' } },
      { name: 'ing 形のつづり', freq: 'よく出る', when: '動詞を ing 形にして書く問題や、つづりの正しいものを選ぶ問題。', how: ['ふつうはそのまま ing をつけます(read → reading)。', '発音しない e で終わる語は e をとって ing(make → making)。', '「短い母音 + 子音字1つ」で終わり、そこを強く読む語は、最後の字を重ねます(run → running)。', 'ie で終わる語は ie を y にかえて ing(lie → lying)。'], ex: { q: 'ing 形にしよう。(1) swim (2) write (3) die', a: '(1) swimming (2) writing (3) dying', exp: '(1) swim は短い母音 i + 子音字 m なので m を重ねます。(2) write は最後の e をとります。(3) die は ie を y にかえて dying です。' } },
      { name: 'What are you doing? の対話', freq: 'よく出る', when: '対話の中で「今何をしているか」をたずねる・答える文があるとき。', how: ['疑問詞 what を先頭に、be動詞 + 主語 + doing の語順にします。', '答えは「主語 + be動詞 + 動詞の ing 形」で、具体的な動作を言います。', 'Yes・No では答えません(疑問詞の疑問文だからです)。'], ex: { q: '( )に適切な語を入れよう。— What is your brother doing? — He ( ) ( ) the dishes.(皿を洗っています)', a: 'is washing', exp: 'what でたずねられているので Yes・No ではなく、していることを答えます。主語 he に合わせて is、wash を ing 形にして is washing です。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。Ken ( ) a video now.', choices: ['watch', 'watches', 'is watching', 'are watching'], a: 'C(is watching)', exp: 'now があるので「今〜している」の進行形にします。主語 Ken は1人なので is watching です。' },
      { lv: 1, q: 'ing 形にしよう。(1) play (2) take (3) sit', a: '(1) playing (2) taking (3) sitting', exp: '(1) そのまま ing。(2) e で終わるので e をとって taking。(3) 短い母音 + t なので t を重ねて sitting です。' },
      { lv: 1, q: '現在進行形の文にしよう。I read a magazine.', a: 'I am reading a magazine.', exp: '現在進行形は「am・is・are + 動詞の ing 形」です。主語が I なので am を使います。' },
      { lv: 1, q: '次の文を否定文にしよう。They are running in the park.', a: 'They are not running in the park.(They aren\'t running in the park.)', exp: '進行形の否定文は be動詞の後ろに not を置きます。ing 形はそのまま使います。' },
      { lv: 1, q: '次の文を疑問文にしよう。Mari is making lunch.', a: 'Is Mari making lunch?', exp: '進行形は be動詞を使う文なので、疑問文は be動詞 is を主語の前に出します。do・does は使いません。' },
      { lv: 1, q: 'Are you studying now? に No で答えよう。', a: 'No, I\'m not.(No, I am not.)', exp: 'Are you 〜? と聞かれたら、自分のことなので I am で答えます。No のときは I\'m not です。' },
      { lv: 1, q: '( )に入る語を選ぼう。We ( ) soccer every Friday.', choices: ['play', 'are playing', 'plays', 'playing'], a: 'A(play)', exp: 'every Friday(毎週金曜日)はふだんの習慣を表す合図なので、現在形にします。主語 we は複数なので play です。' },
      { lv: 2, q: '( )に入る語を選ぼう。Listen! Someone ( ) the piano.', choices: ['play', 'plays', 'is playing', 'are playing'], a: 'C(is playing)', exp: 'Listen!(聞いて!)は今起きていることの合図なので進行形です。someone(だれか)は単数扱いなので is playing になります。' },
      { lv: 2, q: '誤りを直そう。She is having two sisters.', a: 'She has two sisters.', exp: 'have が「持っている・いる」の意味のときは状態を表すので、進行形にしません。主語 she に合わせて has にします。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。Taro is waiting for 【Yuka】 at the station.', a: 'Who is Taro waiting for at the station?', exp: '「だれを」は who で先頭に置き、is Taro waiting と疑問文の語順にします。wait for の for は最後に残ります。' },
      { lv: 2, q: '( )に入るものを選ぼう。I ( ) your idea very much.', choices: ['am liking', 'like', 'likes', 'am like'], a: 'B(like)', exp: 'like(好きである)は気持ちの状態なので、ふつう進行形にしません。主語 I なので s もつけません。' },
      { lv: 2, q: '「私の両親は今、台所で夕食を作っています」を英語にしよう。', a: 'My parents are making dinner in the kitchen now.', exp: '主語 my parents は複数なので are です。make は e をとって making にします。now は文の最後に置くのがふつうです。' },
      { lv: 2, q: '( )に入るものを選ぼう。— What are you doing? — ( )', choices: ['Yes, I am.', 'I\'m drawing a picture.', 'I draw pictures.', 'I did my homework.'], a: 'B(I\'m drawing a picture.)', exp: '今していることを what でたずねているので、進行形で動作を答えます。疑問詞の疑問文なので Yes・No では答えません。' },
      { lv: 2, q: 'ing 形にしよう。(1) begin (2) visit (3) lie', a: '(1) beginning (2) visiting (3) lying', exp: 'begin は後ろの gin を強く読むので n を重ねます。visit は前の vi を強く読むので重ねません。lie は ie を y にかえます。' },
      { lv: 2, q: '正しい英文を1つ選ぼう。', choices: ['I am having a dog.', 'We are having lunch now.', 'He is having a big house.', 'They are having blue eyes.'], a: 'B(We are having lunch now.)', exp: 'have が「食べる」の意味のときは動作なので進行形にできます。ほかの3つは「持っている」という状態なので、進行形にしません。' },
      { lv: 3, q: '( )に適切な語を入れよう。A: Where is Ken? B: He ( ) in his room. He ( ) ( ) a game.(ゲームをしています)', a: 'is / is playing', exp: '1つ目は「部屋にいる」なので be動詞 is だけです。2つ目は「今ゲームをしている」なので is playing の進行形になります。' },
      { lv: 3, q: '誤りを2か所直そう。Look! Two dogs is run in the park.', a: 'Look! Two dogs are running in the park.', exp: '主語 two dogs は複数なので is を are に、進行形なので run を running にします。run は短い母音 + n なので n を重ねます。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['I am wanting a new bike.', 'She is resembling her mother.', 'He usually walks to school, but today he is taking a bus.', 'They are knowing the answer.'], a: 'C(He usually walks to school, but today he is taking a bus.)', exp: 'C は「ふだん(現在形)」と「今日だけ(進行形)」を正しく使い分けています。want・resemble(似ている)・know は状態動詞なので、進行形にしません。' },
      { lv: 3, q: '「今、雨が降っていますか」「いいえ。でも、とても寒いです」を英語にしよう。', a: 'Is it raining now? — No, it isn\'t. But it is very cold.', exp: '天気の文は主語に it を使います。「雨が降っている」は rain の進行形 is raining です。答えも it で受けて No, it isn\'t. とします。' },
      { lv: 3, q: 'I hear music. と I am listening to music. のちがいを説明しよう。', a: 'hear は「(自然に)聞こえる」という状態なので進行形にしない。listen to は「(意識して)聞く」という動作なので進行形にできる。', exp: 'hear は耳に入ってくる状態、listen to は自分から耳をかたむける動作です。動作かどうかで進行形にできるかが決まります。see と look at も同じ関係です。' }
    ]
  });

  add('e_can', {
    pat: [
      { name: 'can の後ろは動詞の原形', freq: 'とてもよく出る', when: 'can の後ろの動詞の形を選ぶ問題や、主語が3人称単数の can の文。', how: ['can を見つけたら、すぐ後ろの動詞に注目します。', '主語が he・she でも、can の後ろは s のない原形にします。', 'can 自体にも s はつけません(× cans)。', '否定は cannot(can\'t)、疑問は Can を主語の前に出します。'], ex: { q: '( )に入る語を選ぼう。Mike can ( ) Japanese very well.  ア speak  イ speaks  ウ speaking  エ to speak', a: 'ア speak', exp: 'can のような助動詞の後ろは、主語が3人称単数でも動詞の原形にします。三単現の s は can があるとつけません。to もはさみません。' } },
      { name: '依頼・許可への応じ方', freq: 'とてもよく出る', when: '対話文で Can you 〜?(〜してくれる?)・Can I 〜?(〜してもいい?)のあとが空所になっているとき。', how: ['Can you 〜? は「相手に頼む」、Can I 〜? は「許可を求める」と区別します。', '引き受ける・許すときは Sure. / OK. / Of course. などを使います。', '断るときは Sorry, I can\'t. のあとに理由を続けるのが自然です。', '空所の後ろの文(理由や Here you are. など)もヒントにします。'], ex: { q: '( )に入るものを選ぼう。— Can I use your ruler? — ( ) Here you are.  ア Sure.  イ No, thank you.  ウ You\'re welcome.  エ Yes, I do.', a: 'ア Sure.', exp: '後ろの Here you are.(はい、どうぞ)から、許可したとわかります。許可には Sure.(いいですよ)が合います。No, thank you. は申し出を断るときの言い方です。' } },
      { name: '命令文・否定の命令文・Let\'s の文', freq: 'よく出る', when: '「〜しなさい」「〜してはいけない」「〜しましょう」という日本語を英語にする問題。', how: ['命令文は主語を言わず、動詞の原形で始めます。', 'be動詞の命令文は Be で始めます(Be quiet.)。', '否定の命令文は Don\'t + 原形(Don\'t be 〜 も同じ)。', '誘う文は Let\'s + 原形にします。'], ex: { q: '「この部屋で食べてはいけません」を英語にしよう。', a: 'Don\'t eat in this room.', exp: '「〜してはいけない」は Don\'t + 動詞の原形で始めます。命令文は相手(you)に言うのが明らかなので、主語は置きません。' } },
      { name: 'can と be able to の書きかえ', freq: 'よく出る', when: '「ほぼ同じ意味になるように」と2文の書きかえを求められ、片方に can、もう片方に able がある問題。', how: ['can = be able to と覚えます。', 'be の部分は主語に合わせて am・is・are にします。', 'to の後ろは動詞の原形です。', '未来なら will be able to、過去なら was・were able to(または could)にします。'], ex: { q: 'ほぼ同じ意味になるように( )に入れよう。Yuki can swim fast. = Yuki ( ) ( ) ( ) swim fast.', a: 'is able to', exp: 'can は be able to で言いかえられます。主語 Yuki は3人称単数で現在の文なので is を使い、is able to swim とします。to の後ろは原形のままです。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。My sister can ( ) the violin.', choices: ['play', 'plays', 'playing', 'to play'], a: 'A(play)', exp: 'can の後ろは動詞の原形です。主語 my sister が3人称単数でも、s はつけません。' },
      { lv: 1, q: '次の文を否定文にしよう。Ken can ride a horse.', a: 'Ken cannot ride a horse.(Ken can\'t ride a horse.)', exp: 'can の否定は cannot(短縮形は can\'t)です。cannot は1語でつなげて書くのがふつうです。' },
      { lv: 1, q: '次の文を疑問文にして、Yes で答えよう。Your father can make pizza.', a: 'Can your father make pizza? — Yes, he can.', exp: 'can の疑問文は Can を主語の前に出します。答えも can を使い、your father は he にかえます。' },
      { lv: 1, q: '次の文を命令文にしよう。You open the door.', a: 'Open the door.', exp: '命令文は主語 you をとり、動詞の原形で始めます。ていねいにしたいときは Please をつけます。' },
      { lv: 1, q: '( )に入る語を選ぼう。( ) kind to old people.', choices: ['Be', 'Are', 'Is', 'Do'], a: 'A(Be)', exp: 'kind(親切な)は形容詞なので、be動詞が必要です。命令文では be動詞の原形 Be で始めます。「お年寄りに親切にしなさい」という意味です。' },
      { lv: 1, q: '「いっしょに昼ごはんを食べましょう」を英語にしよう。', a: 'Let\'s eat lunch together.', exp: '「〜しましょう」と誘うときは Let\'s + 動詞の原形を使います。together(いっしょに)は文の最後に置きます。' },
      { lv: 1, q: '( )に入るものを選ぼう。— Can you help me? — ( )', choices: ['Sure.', 'Yes, I do.', 'No, thank you.', 'You\'re welcome.'], a: 'A(Sure.)', exp: 'Can you 〜? は「〜してくれますか」という依頼です。引き受けるときは Sure.(いいですよ)と答えます。' },
      { lv: 2, q: '「遅れないでね」を英語にしよう。', a: 'Don\'t be late.', exp: 'late(遅れた)は形容詞なので be が必要です。否定の命令文は Don\'t の後ろに be を置いて Don\'t be late. とします。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Let\'s go fishing tomorrow. — ( ) That sounds fun.', choices: ['Yes, let\'s.', 'Yes, I can.', 'Yes, I am.', 'Yes, we do.'], a: 'A(Yes, let\'s.)', exp: 'Let\'s 〜. の誘いに賛成するときは Yes, let\'s. と答えます。断るときは No, let\'s not. です。' },
      { lv: 2, q: 'ほぼ同じ意味になるように( )に入れよう。Can you ski? = ( ) you ( ) to ski?', a: 'Are / able', exp: 'can = be able to です。主語 you の疑問文なので、be動詞 Are を主語の前に出して Are you able to ski? とします。' },
      { lv: 2, q: '誤りを直そう。Mai cans dance very well.', a: 'Mai can dance very well.', exp: 'can は助動詞なので、主語が3人称単数でも s をつけません。後ろの dance も原形のままです。' },
      { lv: 2, q: '「窓を閉めてもいいですか」を英語にしよう。', a: 'Can I close the window?(May I close the window?)', exp: '許可を求めるときは Can I 〜? を使います。May I 〜? にすると、よりていねいになります。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Can you come to my party on Sunday? — ( ) I have to visit my aunt.', choices: ['Sorry, I can\'t.', 'Yes, I can.', 'Sure.', 'Here you are.'], a: 'A(Sorry, I can\'t.)', exp: '後ろに「おばを訪ねなければならない」という理由があるので、断っているとわかります。Sorry, I can\'t. が合います。' },
      { lv: 2, q: '「彼女は何語を話すことができますか」を英語にしよう。', a: 'What languages can she speak?', exp: '「何語を」は what languages として先頭に置き、その後ろは can she speak と疑問文の語順にします。speak は原形です。' },
      { lv: 2, q: '「どうぞおかけください」を Please を使って英語にしよう。', a: 'Please sit down.(Sit down, please.)', exp: 'please を命令文の前につけると、ていねいな言い方になります。文の最後に置くときは , please とコンマを入れます。' },
      { lv: 3, q: 'ほぼ同じ意味になるように( )に入れよう。Don\'t swim in this river. = You ( ) swim in this river.', a: 'can\'t(cannot)', exp: 'can\'t には「〜できない」のほかに「〜してはいけない」という意味もあります。must not(〜してはいけない)を使って書くこともできます。' },
      { lv: 3, q: '( )に入る語を選ぼう。Yesterday I ( ) find my key, but this morning I found it.', choices: ['can\'t', 'couldn\'t', 'don\'t', 'wasn\'t'], a: 'B(couldn\'t)', exp: 'yesterday があるので過去の文です。can の過去形 could を使い、否定は couldn\'t になります。後ろの find は原形です。' },
      { lv: 3, q: '「来年は上手に泳げるようになるでしょう」を英語にしよう。', a: 'I will be able to swim well next year.', exp: 'will と can のような助動詞は2つ並べられないので、can を be able to にかえて will be able to とします。will の後ろなので be は原形です。' },
      { lv: 3, q: '掲示の文「館内では写真をとらないでください」を英語にしよう。', a: 'Please don\'t take pictures in the museum.', exp: '否定の命令文 Don\'t + 原形に please をつけて、ていねいにします。「写真をとる」は take pictures(photos)です。' },
      { lv: 3, q: '( )に入るものを選ぼう。A: I\'m hungry. B: Me, too. ( ) make some sandwiches.', choices: ['Let\'s', 'Can I', 'Please', 'Don\'t'], a: 'A(Let\'s)', exp: '2人ともおなかがすいているので「サンドイッチを作ろう」と誘う Let\'s が合います。Don\'t では流れに合いません。' }
    ]
  });

  add('e_wh', {
    pat: [
      { name: '答えの文から疑問詞を逆算する', freq: 'とてもよく出る', when: '対話の答えだけが示されていて、問いの文の疑問詞が空所になっているとき。', how: ['答えの文の中で、新しい情報(人・場所・時・理由・方法・数)を見つけます。', '人なら who、場所なら where、時なら when、理由(Because 〜)なら why を選びます。', '方法(By bus など)・様子・数量なら how や how many などを選びます。', '疑問詞の後ろの語順(do・does・did / be動詞)も確かめます。'], ex: { q: '( )に入る疑問詞を書こう。( ) do you go to the library? — By bus.', a: 'How', exp: '答えの By bus.(バスで)は交通手段、つまり「方法」を表しています。方法をたずねる疑問詞は how です。where と答えるのはよくあるまちがいです。' } },
      { name: '疑問詞が主語になる疑問文', freq: 'よく出る', when: '「だれが〜しますか」「何が〜ですか」とたずねる文や、答えが Ken does. / My mother did. の形になっている問題。', how: ['疑問詞が「〜が」(主語)にあたるかを確かめます。', '主語になるときは、疑問詞の後ろにそのまま動詞を続けます(do・does は使いません)。', '現在の文なら、疑問詞は3人称単数扱いで動詞に s をつけます。', '答えは「主語 + do・does・did」の短い形が基本です。'], ex: { q: '( )内の語を適切な形にしよう。Who ( play ) the piano in your family? — My sister does.', a: 'plays', exp: 'who が「だれが」という主語になっています。この場合は does を使わず、疑問詞のすぐ後ろに動詞を置きます。who は3人称単数扱いなので plays です。' } },
      { name: 'How + 形容詞・副詞のかたまり', freq: 'とてもよく出る', when: '答えが数・値段・年れい・長さ・回数などになっていて、How の後ろが空所のとき。', how: ['答えの中の単位を見ます(冊・円・才・分・回など)。', '数なら How many + 複数名詞、量や値段なら How much を使います。', '年れいは How old、長さ・期間は How long、回数は How often、距離は How far を使います。', 'How 〜 のかたまり全体を文の先頭に置きます。'], ex: { q: '( )に入る語を書こう。How ( ) do you go to the gym? — Three times a week.', a: 'often', exp: '答えの Three times a week.(週に3回)は回数・頻度を表しています。頻度をたずねるのは How often です。How many times もありますが、ここでは空所が1つなので often が入ります。' } },
      { name: '下線部をたずねる疑問文を作る', freq: 'とてもよく出る', when: '英文の一部に下線があり、「下線部をたずねる疑問文にしなさい」という指示があるとき。', how: ['下線部が人・もの・場所・時などのどれかを判断し、疑問詞を決めます。', '下線部を消し、疑問詞を文の先頭に置きます。', '残りを疑問文の語順にします(一般動詞なら do・does・did を入れ、動詞を原形に)。', '下線部が主語なら、語順はそのままで疑問詞を主語の位置に置きます。'], ex: { q: '下線部をたずねる疑問文にしよう。She practices tennis 【in the park】.', a: 'Where does she practice tennis?', exp: 'in the park は場所なので where を使います。practices は一般動詞で主語が3人称単数なので does を入れ、practice を原形にもどします。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。( ) is your birthday? — It\'s July 20.', choices: ['What', 'When', 'Where', 'Who'], a: 'B(When)', exp: '答えが日付なので「いつ」をたずねる when を使います。What is the date 〜? という言い方もありますが、ここでは When です。' },
      { lv: 1, q: '( )に入る語を選ぼう。( ) is that tall boy? — He is my cousin.', choices: ['Who', 'What', 'Whose', 'Which'], a: 'A(Who)', exp: '答えが「いとこです」と人を説明しているので、「だれ」をたずねる who を使います。' },
      { lv: 1, q: '( )に入る語を選ぼう。( ) umbrella is this? — It\'s Aya\'s.', choices: ['Who', 'Whose', 'Which', 'What'], a: 'B(Whose)', exp: '答えの Aya\'s(アヤのもの)から、持ち主をたずねているとわかります。「だれの」は whose です。' },
      { lv: 1, q: '( )に入る語を選ぼう。( ) are you tired? — Because I ran a lot today.', choices: ['What', 'How', 'Why', 'When'], a: 'C(Why)', exp: '答えが Because 〜(なぜなら)で始まっているので、理由をたずねる why を使います。' },
      { lv: 1, q: '( )に入る語を書こう。( ) old is your grandfather? — He is seventy-two.', a: 'How', exp: '年れいは How old 〜? でたずねます。How は old とセットで「どのくらい年をとっているか」を表します。' },
      { lv: 1, q: '( )に入る語を選ぼう。( ) time is it now? — It\'s eleven.', choices: ['What', 'When', 'How', 'Which'], a: 'A(What)', exp: '時刻をたずねるときは What time is it? と言います。What time でひとかたまりです。' },
      { lv: 1, q: '「あなたはどこに住んでいますか」を英語にしよう。', a: 'Where do you live?', exp: '「どこに」は where で先頭に置き、その後ろは do you live と一般動詞の疑問文の語順にします。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Which do you like better, tea or coffee? — ( )', choices: ['Yes, I do.', 'I like coffee better.', 'I like it.', 'It\'s tea.'], a: 'B(I like coffee better.)', exp: 'which は「どちら」をたずねる疑問詞なので Yes・No では答えません。2つのうち好きなほうを I like 〜 better. で答えます。' },
      { lv: 2, q: '( )に入るものを選ぼう。— How much is this T-shirt? — ( )', choices: ['It\'s 1,500 yen.', 'It\'s blue.', 'I have two.', 'It\'s large.'], a: 'A(It\'s 1,500 yen.)', exp: 'How much 〜? は値段をたずねる言い方です。色やサイズ、持っている数を答えるのは合いません。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。【Ms. Brown】 teaches music.', a: 'Who teaches music?', exp: '下線部は主語です。主語をたずねるときは does を使わず、who をそのまま主語の位置に置きます。who は3人称単数扱いなので teaches です。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。I usually get up 【at six thirty】.', a: 'What time do you usually get up?', exp: '時刻は what time でたずねます。I は you にかえて、do you usually get up と疑問文の語順にします。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。There are 【thirty】 students in this class.', a: 'How many students are there in this class?', exp: '数は How many + 複数名詞でたずねます。There are 〜 の疑問文は are there の語順になります。' },
      { lv: 2, q: '誤りを直そう。Where your brother works?', a: 'Where does your brother work?', exp: '疑問詞の後ろは疑問文の語順にします。一般動詞の文で主語が3人称単数なので does を入れ、works は原形 work にもどします。' },
      { lv: 2, q: '( )に入る語を選ぼう。How ( ) does it take from here to the station? — About ten minutes.', choices: ['many', 'much', 'long', 'often'], a: 'C(long)', exp: '答えが「約10分」という時間の長さなので How long を使います。How long does it take 〜? は「〜にどのくらい時間がかかりますか」です。' },
      { lv: 2, q: '( )に入るものを選ぼう。— How often do you play tennis? — ( )', choices: ['For two hours.', 'Twice a week.', 'Three rackets.', 'At the park.'], a: 'B(Twice a week.)', exp: 'How often は頻度(どのくらいの回数)をたずねる言い方です。Twice a week.(週に2回)が合います。For two hours. は時間の長さです。' },
      { lv: 3, q: 'What is your new teacher like? の意味を書き、答えの例を1つ英語で書こう。', a: '意味:あなたの新しい先生はどんな人ですか。 答えの例:She is kind and funny.', exp: 'この like は「好き」ではなく「〜のような」という前置詞です。What is 〜 like? で人やものの様子・性格をたずねます。Yes・No では答えません。' },
      { lv: 3, q: '下線部をたずねる疑問文にしよう。I am looking for 【my cat】.', a: 'What are you looking for?', exp: '「何を」は what で先頭に置きます。look for(〜をさがす)の for は動詞とセットなので、文の最後に残ります。' },
      { lv: 3, q: '( )に適切な語を入れよう。A: ( ) ( ) is it from here to the zoo? B: About two kilometers.', a: 'How far', exp: '答えが距離(約2キロメートル)なので、How far でたずねます。How long でも時間をたずねることはできますが、距離には far を使います。' },
      { lv: 3, q: '誤りを直そう。Who does cook dinner in your family?', a: 'Who cooks dinner in your family?', exp: 'who が主語の疑問文では、ふつう does を使わず、who の後ろに直接動詞を置きます。who は3人称単数扱いなので cooks です。' },
      { lv: 3, q: '「あなたはどの季節がいちばん好きですか」を英語にしよう。', a: 'Which season do you like (the) best?', exp: '「どの季節」は which season とひとまとまりで先頭に置きます。「いちばん好き」は like 〜 the best(the は省略可)です。What season でも表せます。' }
    ]
  });

  add('e_m2', {
    pat: [
      { name: '時の合図を見て過去形にする', freq: 'とてもよく出る', when: '( )内の動詞の形をかえる問題で、文に yesterday・last 〜・〜 ago・then などがあるとき。', how: ['文の中から時を表すことばを探します。', 'yesterday・last 〜・〜 ago・in 2020 などがあれば過去形にします。', '規則動詞なら ed をつけ、不規則動詞なら覚えた形を書きます。', '過去形は主語が3人称単数でも同じ形です(s はつけません)。'], ex: { q: '( )内の語を適切な形にしよう。My family ( visit ) Nagasaki last summer.', a: 'visited', exp: 'last summer(去年の夏)という過去の合図があるので過去形にします。visit は規則動詞なので ed をつけます。主語が単数でも複数でも、過去形の形は同じです。' } },
      { name: 'did の後ろは原形(否定文・疑問文)', freq: 'とてもよく出る', when: '一般動詞の過去の文を否定文・疑問文にする問題や、did の後ろの動詞の形を選ぶ問題。', how: ['一般動詞の過去形を見つけます(bought・went など)。', '否定文は did not(didn\'t)を動詞の前に置きます。', '疑問文は Did を主語の前に置きます。', 'did が「過去」のしるしを受けもつので、後ろの動詞は原形にもどします。'], ex: { q: 'Aki bought a new bag. を否定文にしよう。', a: 'Aki didn\'t buy a new bag.(Aki did not buy a new bag.)', exp: 'bought は buy の過去形です。did not を前に置くと、過去のしるしは did が受けもつので、bought は原形 buy にもどします。× didn\'t bought は過去を2回表したことになります。' } },
      { name: '不規則動詞の過去形', freq: 'とてもよく出る', when: '過去形を書かせる問題や、文中で不規則動詞を使う問題。', how: ['その動詞が規則動詞か不規則動詞かを思い出します。', '不規則動詞は形のグループで覚えます(come → came、become → became など)。', 'read のように、つづりは同じで発音だけかわる語にも注意します。', '書いたら、ed をつけていないか(× goed)を確かめます。'], ex: { q: '過去形にしよう。(1) go (2) see (3) make', a: '(1) went (2) saw (3) made', exp: '3つとも不規則動詞で、ed はつけません。go → went はもとの形と全くちがうので特に注意が必要です。make → made のように1字だけかわるものもあります。' } },
      { name: 'was と were の使い分け', freq: 'よく出る', when: 'be動詞の過去の文で、主語に合う形を選ぶ問題。', how: ['主語が I か、3人称単数(he・she・it・1人・1つ)かを確かめます。', 'I と3人称単数なら was を使います。', 'you と複数の主語なら were を使います。', 'A and B は複数なので were です。'], ex: { q: '( )に was か were を入れよう。My brother and I ( ) at home yesterday.', a: 'were', exp: '主語の my brother and I は2人なので複数です。現在なら are、過去なら were を使います。すぐ前の I につられて was にしないように気をつけましょう。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。I ( ) badminton yesterday.', choices: ['play', 'plays', 'played', 'playing'], a: 'C(played)', exp: 'yesterday(昨日)があるので過去の文です。play は規則動詞なので ed をつけて played にします。' },
      { lv: 1, q: '過去形にしよう。(1) stop (2) study (3) like', a: '(1) stopped (2) studied (3) liked', exp: '(1) 短い母音 + p なので p を重ねます。(2) 子音字 + y なので y を i にかえて ed。(3) e で終わるので d だけつけます。' },
      { lv: 1, q: '過去形にしよう。(1) eat (2) come (3) write', a: '(1) ate (2) came (3) wrote', exp: '3つとも不規則動詞です。ed をつけた × eated・× comed・× writed はまちがいです。' },
      { lv: 1, q: '次の文を否定文にしよう。Ken watched a movie last night.', a: 'Ken didn\'t watch a movie last night.(Ken did not watch 〜)', exp: '一般動詞の過去の否定文は didn\'t を動詞の前に置き、watched を原形 watch にもどします。' },
      { lv: 1, q: '次の文を疑問文にしよう。They cleaned the classroom.', a: 'Did they clean the classroom?', exp: 'Did を主語 they の前に置きます。cleaned は原形 clean にもどします。主語が何でも Did を使います。' },
      { lv: 1, q: '( )に入る語を選ぼう。I ( ) very busy last week.', choices: ['am', 'was', 'were', 'did'], a: 'B(was)', exp: 'last week(先週)なので過去です。主語 I の be動詞の過去形は was です。busy は形容詞なので be動詞が必要です。' },
      { lv: 1, q: 'Did you enjoy the festival? に Yes で答えよう。', a: 'Yes, I did.', exp: 'Did 〜? の疑問文には did を使って答えます。Yes, I did. / No, I didn\'t. です。' },
      { lv: 2, q: '誤りを直そう。Did she went to the library?', a: 'Did she go to the library?', exp: 'Did で始まる疑問文では、動詞は原形にします。did が過去を表しているので、went ではなく go です。' },
      { lv: 2, q: '( )に入る語を選ぼう。We ( ) in Fukuoka three years ago.', choices: ['live', 'lives', 'lived', 'are living'], a: 'C(lived)', exp: 'three years ago(3年前)は過去の合図です。現在形や進行形ではなく、過去形 lived を使います。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。I met Yuka 【at the bookstore】.', a: 'Where did you meet Yuka?', exp: '場所なので where を先頭に置きます。I は you にかえ、did you meet と疑問文の語順にして met を原形 meet にもどします。' },
      { lv: 2, q: '「昨日は雨でした」を英語にしよう。', a: 'It was rainy yesterday.(It rained yesterday.)', exp: '天気は it を主語にします。rainy(雨の)は形容詞なので be動詞 was を使います。rain(雨が降る)を動詞にして rained としても表せます。' },
      { lv: 2, q: '次の文を疑問文にして、No で答えよう。Your parents were in Hawaii last month.', a: 'Were your parents in Hawaii last month? — No, they weren\'t.', exp: 'be動詞の過去の文なので、were を主語の前に出します。your parents は they で受けて、No, they weren\'t. と答えます。' },
      { lv: 2, q: '( )に入るものを選ぼう。— What did you do last Sunday? — ( )', choices: ['I go shopping.', 'I went shopping.', 'Yes, I did.', 'I am going shopping.'], a: 'B(I went shopping.)', exp: '過去のことを what でたずねているので、過去形で具体的に答えます。go の過去形は went です。' },
      { lv: 2, q: '過去形にしよう。(1) buy (2) take (3) read', a: '(1) bought (2) took (3) read', exp: 'すべて不規則動詞です。read の過去形はつづりが同じ read ですが、発音は「レッド」にかわります。' },
      { lv: 2, q: '次の語の -ed の発音を「ト・ド・イド」から選ぼう。(1) helped (2) played (3) wanted', a: '(1) ト (2) ド (3) イド', exp: 'p・k・s などのにごらない音で終わる語は「ト」、にごる音や母音で終わる語は「ド」、t・d で終わる語は「イド」と発音します。' },
      { lv: 3, q: '( )内の語を適切な形にしよう。Yesterday I ( get ) up late. I ( not / have ) breakfast. I ( run ) to school.', a: 'got / didn\'t have / ran', exp: '日記は過去のことを書くので、すべて過去の形にします。get → got、run → ran は不規則動詞です。否定は didn\'t + 原形 have です。' },
      { lv: 3, q: '誤りを直そう。Was you at home last night?', a: 'Were you at home last night?', exp: '主語が you のとき、be動詞の過去形は were です。you は1人の相手でも were を使います。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['He didn\'t came yesterday.', 'Did they were busy?', 'She wasn\'t hungry then.', 'I was go to bed at ten.'], a: 'C(She wasn\'t hungry then.)', exp: 'C は be動詞の過去の否定文で正しい形です。A は come、B は Were they busy?、D は I went to bed とする必要があります。' },
      { lv: 3, q: '( )に入る語を選ぼう。I visited Nara three years ( ).', choices: ['ago', 'before', 'last', 'since'], a: 'A(ago)', exp: '「(今から)〜前に」は期間 + ago で表します。before は「(その時より)前に」の意味で、three years before とすると基準が今ではなくなります。' },
      { lv: 3, q: '「あなたは昨日の夜、何時に寝ましたか」を英語にしよう。', a: 'What time did you go to bed last night?', exp: '時刻は what time でたずね、その後ろは did you go の語順です。「寝る」は go to bed で、did の後ろなので go は原形のままです。' }
    ]
  });

  add('e_pprog', {
    pat: [
      { name: '「その時」の合図で過去進行形にする', freq: 'とてもよく出る', when: '文に at that time・then・at nine last night など、過去のある時点を表すことばがあるとき。', how: ['過去の「1つの時点」を表す合図を探します。', 'その時点で「〜しているところだった」なら過去進行形にします。', '主語に合わせて was か were を選びます。', '動詞を ing 形にします(つづりに注意)。'], ex: { q: '( )内の語を適切な形にしよう。I ( take ) a bath at nine last night.', a: 'was taking', exp: 'at nine last night(昨夜9時に)は過去の1つの時点です。その時点で「入っている途中だった」ので過去進行形にします。主語 I なので was、take は e をとって taking です。' } },
      { name: 'when の文:続いている動作と短い出来事', freq: 'とてもよく出る', when: 'when 〜 の文で、2つの動詞のうちどちらを過去進行形にするか迷う問題。', how: ['2つの出来事のうち、「途中だった長い動作」と「途中で起きた短い出来事」を分けます。', '長い動作(読んでいた・歩いていた)を過去進行形にします。', '短い出来事(電話が鳴った・帰ってきた)を過去形にします。', 'when の後ろは短い出来事になることが多いです。'], ex: { q: '( )内の語を適切な形にしよう。When Ken ( call ) me, I ( read ) a book.', a: 'called / was reading', exp: '電話がかかってきたのは一瞬の出来事なので過去形 called です。本を読んでいたのはその前から続いていた動作なので、過去進行形 was reading にします。' } },
      { name: 'What were you doing 〜? の対話', freq: 'よく出る', when: '対話で、過去のある時点に何をしていたかをたずねる・答える文。', how: ['What + was・were + 主語 + doing の語順でたずねます。', '答えは「主語 + was・were + ing 形」で、そのときの動作を言います。', 'Yes・No では答えません。', '答えの主語に合わせて was・were を選びます。'], ex: { q: '( )に適切な語を入れよう。— What were you doing at three yesterday? — I ( ) ( ) the guitar.(ギターをひいていました)', a: 'was playing', exp: '過去の時点にしていたことを答えるので、過去進行形にします。答えの主語は I なので was を使い、play は ing 形 playing にします。' } },
      { name: '過去進行形の否定文・疑問文', freq: 'よく出る', when: '過去進行形の文を否定文・疑問文にする問題や、Were you 〜ing? に答える問題。', how: ['文の中の was・were を見つけます。', '否定文は was・were の後ろに not を置きます。', '疑問文は was・were を主語の前に出します(did は使いません)。', '答えも was・were で答えます。'], ex: { q: 'Were your friends swimming then? に No で答えよう。', a: 'No, they weren\'t.', exp: 'be動詞 were を使った疑問文なので、答えも were で答えます。your friends は複数なので they にかえて No, they weren\'t. とします。did を使うのはまちがいです。' } }
    ],
    more: [
      { lv: 1, q: '( )に入るものを選ぼう。I ( ) dinner at seven last night.', choices: ['am eating', 'was eating', 'were eating', 'eat'], a: 'B(was eating)', exp: 'at seven last night(昨夜7時に)は過去の時点です。その時「食べていた」ので過去進行形、主語 I なので was eating です。' },
      { lv: 1, q: '過去進行形の文にしよう。She reads a magazine.', a: 'She was reading a magazine.', exp: '過去進行形は「was・were + ing 形」です。主語 she なので was を使い、read を reading にします。' },
      { lv: 1, q: '( )に入るものを選ぼう。They ( ) soccer then.', choices: ['was playing', 'were playing', 'are playing', 'play'], a: 'B(were playing)', exp: 'then(そのとき)は過去の時点です。主語 they は複数なので were playing を使います。' },
      { lv: 1, q: '次の文を否定文にしよう。Tom was sleeping at ten.', a: 'Tom was not sleeping at ten.(Tom wasn\'t sleeping at ten.)', exp: '過去進行形の否定文は was の後ろに not を置きます。ing 形はそのままです。' },
      { lv: 1, q: '次の文を疑問文にしよう。You were watching TV.', a: 'Were you watching TV?', exp: '過去進行形の疑問文は were を主語の前に出します。Did は使いません。' },
      { lv: 1, q: 'Was your brother studying? に No で答えよう。', a: 'No, he wasn\'t.', exp: 'was を使った疑問文なので、was で答えます。your brother は he にかえます。' },
      { lv: 1, q: '( )に入る語を選ぼう。What ( ) you doing at that time?', choices: ['was', 'were', 'are', 'did'], a: 'B(were)', exp: 'at that time(そのとき)なので過去です。主語 you の be動詞の過去形は were です。' },
      { lv: 2, q: '( )に入るものを選ぼう。When I got home, my mother ( ) dinner.', choices: ['cooks', 'cooked', 'was cooking', 'is cooking'], a: 'C(was cooking)', exp: '私が帰ったとき、母はすでに料理の途中でした。続いていた動作なので過去進行形にします。' },
      { lv: 2, q: '誤りを直そう。I was knowing the answer then.', a: 'I knew the answer then.', exp: 'know(知っている)は状態を表す動詞なので、過去でも進行形にしません。過去形 knew を使います。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。Mika was talking with 【her teacher】.', a: 'Who was Mika talking with?', exp: '人なので who を先頭に置き、was Mika talking と疑問文の語順にします。with は最後に残ります。' },
      { lv: 2, q: '「私が駅に着いたとき、雨が降っていました」を英語にしよう。', a: 'It was raining when I got to the station.(When I arrived at the station, it was raining.)', exp: '雨が降っていたのは続いていた状態の動作なので was raining です。駅に着いたのは一瞬なので過去形 got(arrived)にします。' },
      { lv: 2, q: '( )に入るものを選ぼう。Ken ( ) a shower when the phone rang.', choices: ['take', 'took', 'was taking', 'is taking'], a: 'C(was taking)', exp: '電話が鳴ったとき、シャワーを浴びている途中だったので過去進行形にします。rang(鳴った)は短い出来事です。' },
      { lv: 2, q: 'We are running now. の now を at that time にかえて、全文を書きなおそう。', a: 'We were running at that time.', exp: 'at that time は過去の時点なので、are を過去形の were にかえて過去進行形にします。running はそのままです。' },
      { lv: 2, q: '( )に入るものを選ぼう。— What were you doing at eight? — ( )', choices: ['I was doing my homework.', 'Yes, I was.', 'I do my homework.', 'I am doing it at eight.'], a: 'A(I was doing my homework.)', exp: '過去の時点にしていたことを what でたずねているので、過去進行形で答えます。Yes・No では答えません。' },
      { lv: 2, q: '誤りを直そう。Were you play the guitar then?', a: 'Were you playing the guitar then?', exp: 'were の疑問文で「〜していた」をたずねるには、動詞を ing 形にします。were + 原形という形はありません。' },
      { lv: 3, q: '( )内の語を適切な形にしよう。Last night I ( walk ) home. Suddenly a dog ( run ) to me.', a: 'was walking / ran', exp: '家へ歩いていたのは続いていた動作なので過去進行形です。突然犬が走ってきたのは一瞬の出来事なので過去形 ran にします。' },
      { lv: 3, q: 'when を使って1文にしよう。I was reading. My father came home.', a: 'I was reading when my father came home.(When my father came home, I was reading.)', exp: '短い出来事 came home を when の後ろに置きます。when のかたまりを前に出すときは、後ろにコンマを入れます。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['I was having a cat.', 'They was swimming.', 'While I was cooking, my sister cleaned the room.', 'He were sleeping.'], a: 'C(While I was cooking, my sister cleaned the room.)', exp: 'while(〜している間に)の後ろには続いている動作がくるので、進行形が合います。A は had、B は were、D は was にする必要があります。' },
      { lv: 3, q: 'I read the book yesterday. と I was reading the book yesterday. の意味のちがいを説明しよう。', a: '前の文は「昨日その本を読んだ」(ふつう読み終えたと受け取れる)。後の文は「昨日その本を読んでいるところだった」(読み終えたかどうかは言っていない)。', exp: '過去形は出来事をひとまとまりの「点」として、過去進行形はその途中の「線」として表します。進行形は終わったかどうかまでは示しません。' },
      { lv: 3, q: '「あなたが電話をくれたとき、私はおふろに入っていました」を英語にしよう。', a: 'I was taking a bath when you called me.', exp: 'おふろに入っていたのは続いていた動作なので過去進行形 was taking、電話は一瞬の出来事なので過去形 called にします。' }
    ]
  });

  add('e_fut', {
    pat: [
      { name: 'will の後ろは原形', freq: 'とてもよく出る', when: 'will の後ろの動詞の形を選ぶ問題。特に主語が3人称単数のときや、be動詞の文。', how: ['will を見つけたら、すぐ後ろの動詞に注目します。', '主語が he・she でも s はつけず、原形にします。', 'is・am・are の文を未来にするときは will be にします。', '否定は will not(won\'t)、疑問は Will を主語の前に出します。'], ex: { q: '( )に入る語を選ぼう。My sister will ( ) fifteen next month.  ア is  イ be  ウ being  エ was', a: 'イ be', exp: 'will の後ろは動詞の原形です。is・am・are の原形は be なので、will be になります。「15才になる」のように、be動詞の文を未来にするときによく出ます。' } },
      { name: 'will と be going to の書きかえ', freq: 'よく出る', when: '「ほぼ同じ意味に」という書きかえ問題で、片方に will、もう片方に going がある問題。', how: ['will + 原形 ≒ be going to + 原形 と考えます。', 'be の部分は主語に合わせて am・is・are にします。', 'to の後ろの動詞は原形のままです。', '否定・疑問は be動詞の部分を使って作ります。'], ex: { q: 'ほぼ同じ意味になるように( )に入れよう。I will wash the car. = I ( ) ( ) ( ) wash the car.', a: 'am going to', exp: 'will は be going to で言いかえられます。主語が I なので be動詞は am を使い、I am going to wash とします。to の後ろは原形の wash のままです。' } },
      { name: 'その場で決めた will と前からの予定 be going to', freq: '難関校で出る', when: '対話文で will と be going to の両方が選択肢にあり、話の流れで使い分けを問われるとき。', how: ['その発言の前に、もう決めていた予定かどうかを読み取ります。', '相手の言葉を聞いて、その場で「じゃあ〜するよ」と決めたなら will を使います。', '前から決めていた予定や、目の前の様子から確実に起こりそうなことは be going to を使います。'], ex: { q: '( )に入るものを選ぼう。A: The phone is ringing. B: OK. I ( ) answer it.  ア will  イ am going  ウ was  エ did', a: 'ア will', exp: '電話が鳴っているのに気づいて、その場で「出るよ」と決めているので will が合います。イは going の後ろに to がないので形の上でもまちがいです。' } },
      { name: '未来の文の疑問文と答え方', freq: 'よく出る', when: 'Will 〜? / Are you going to 〜? に答える問題や、疑問詞を使って予定をたずねる問題。', how: ['Will 〜? には will(won\'t)で答えます。', 'Are you going to 〜? には be動詞で答えます(Yes, I am.)。', '疑問詞の疑問文には具体的な予定を答えます。', '天気の文は主語 it で受けて答えます。'], ex: { q: 'Will it be cold tomorrow? に No で答えよう。', a: 'No, it won\'t.(No, it will not.)', exp: 'Will 〜? の疑問文には will を使って答えます。天気をたずねる文の主語は it なので、答えも it を使います。won\'t は will not の短縮形です。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。I ( ) visit my aunt next week.', choices: ['will', 'am', 'do', 'was'], a: 'A(will)', exp: 'next week(来週)の予定なので will を使います。will の後ろは原形 visit です。' },
      { lv: 1, q: '( )に入る語を選ぼう。Ken will ( ) a doctor in the future.', choices: ['be', 'is', 'being', 'was'], a: 'A(be)', exp: 'will の後ろは原形です。is の原形は be なので will be になります。' },
      { lv: 1, q: '次の文を否定文にしよう。We will play baseball tomorrow.', a: 'We will not play baseball tomorrow.(We won\'t play baseball tomorrow.)', exp: 'will の否定は will not で、短縮形は won\'t です。後ろの play は原形のままです。' },
      { lv: 1, q: '次の文を疑問文にしよう。He is going to buy a car.', a: 'Is he going to buy a car?', exp: 'be going to の疑問文は、be動詞 is を主語の前に出します。going to buy はそのままです。' },
      { lv: 1, q: 'Will you be free tomorrow? に Yes で答えよう。', a: 'Yes, I will.', exp: 'Will you 〜? には will で答えます。you でたずねられたので、I で答えます。' },
      { lv: 1, q: '( )に入る語を選ぼう。They are going to ( ) Okinawa next month.', choices: ['visit', 'visits', 'visiting', 'visited'], a: 'A(visit)', exp: 'be going to の to の後ろは動詞の原形です。主語が they でも3人称単数でも、visit の形はかわりません。' },
      { lv: 1, q: '短縮形を書こう。(1) I will (2) will not', a: '(1) I\'ll (2) won\'t', exp: 'I will は I\'ll、will not は won\'t になります。won\'t は × willn\'t としないよう注意しましょう。' },
      { lv: 2, q: 'ほぼ同じ意味になるように( )に入れよう。My sister will study abroad. = My sister ( ) ( ) ( ) study abroad.', a: 'is going to', exp: 'will = be going to です。主語 my sister は3人称単数なので is を使います。' },
      { lv: 2, q: '誤りを直そう。It will rains tomorrow.', a: 'It will rain tomorrow.', exp: 'will の後ろは原形です。主語が it でも、will があれば s はつけません。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。I\'m going to stay in London 【for a week】.', a: 'How long are you going to stay in London?', exp: '期間は How long でたずねます。I\'m は you are にかえ、are you going to の疑問文の語順にします。' },
      { lv: 2, q: '「明日は晴れるでしょう」を英語にしよう。', a: 'It will be sunny tomorrow.', exp: '天気の文の主語は it です。sunny は形容詞なので be が必要で、will be sunny とします。' },
      { lv: 2, q: '( )に入るものを選ぼう。— What are you going to do this weekend? — ( )', choices: ['I\'m going to see a movie.', 'Yes, I am.', 'I saw a movie.', 'I will.'], a: 'A(I\'m going to see a movie.)', exp: 'これからの予定を what でたずねているので、be going to を使って具体的に答えます。' },
      { lv: 2, q: '( )に入るものを選ぼう。A: It\'s very hot in this room. B: OK. I ( ) open the window.', choices: ['will', 'am going', 'was', 'did'], a: 'A(will)', exp: '相手の言葉を聞いて、その場で「窓を開けるよ」と決めているので will が合います。' },
      { lv: 2, q: 'be going to を使って「私たちは今日テニスをするつもりはありません」を英語にしよう。', a: 'We are not going to play tennis today.(We aren\'t going to play tennis today.)', exp: 'be going to の否定文は be動詞 are の後ろに not を置きます。to の後ろは原形の play です。' },
      { lv: 2, q: '( )に入るものを選ぼう。Be careful! That cup ( ) fall off the table.', choices: ['is going to', 'will be', 'was', 'is'], a: 'A(is going to)', exp: 'カップがテーブルのはしにあるのが見えていて「落ちそうだ」と言うときは、目の前の根拠にもとづく be going to が合います。will be fall は形がまちがいです。' },
      { lv: 3, q: 'エミの予定表(月曜:水泳、火曜:ピアノのレッスン)を見て答えよう。What is Emi going to do on Tuesday?', a: 'She is going to have a piano lesson.(She is going to take a piano lesson.)', exp: '火曜日の予定はピアノのレッスンです。be going to でたずねられているので、She is going to 〜 で答えます。Emi は she にかえます。' },
      { lv: 3, q: '誤りを直そう。I will can swim soon.', a: 'I will be able to swim soon.', exp: 'will と can はどちらも助動詞なので、2つ並べられません。can を be able to にかえて will be able to とします。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['Will she comes?', 'Are you going to went?', 'He won\'t be late.', 'I\'m going to busy.'], a: 'C(He won\'t be late.)', exp: 'C は won\'t の後ろに原形 be があり正しい形です。A は come、B は go、D は I\'m going to be busy とする必要があります。' },
      { lv: 3, q: '( )に入る語を選ぼう。The train ( ) at 9:15 tomorrow morning.', choices: ['leave', 'leaves', 'leaving', 'left'], a: 'B(leaves)', exp: '時刻表のように決まっている予定は、未来のことでも現在形で表せます。主語 the train は3人称単数なので leaves です。' },
      { lv: 3, q: '「あなたは何時に家を出るつもりですか」を英語にしよう。', a: 'What time are you going to leave home?', exp: 'what time を先頭に置き、are you going to leave と疑問文の語順にします。「家を出る」は leave home です。' }
    ]
  });

  add('e_m3', {
    pat: [
      { name: 'must not と don\'t have to の区別', freq: 'とてもよく出る', when: '「〜してはいけない」と「〜しなくてよい」の意味を選ぶ問題や、空所に must not か don\'t have to を入れる問題。', how: ['日本語や前後の文から「禁止」か「不要」かを判断します。', '禁止(してはいけない)なら must not(mustn\'t)を使います。', '不要(しなくてよい・する必要はない)なら don\'t have to を使います。', '主語が3人称単数なら doesn\'t have to にします。'], ex: { q: '( )に適切な語を入れよう。You ( ) ( ) ( ) come to school tomorrow. It\'s a holiday.', a: 'don\'t have to', exp: '明日は休日なので「来なくてよい」という意味になります。不要を表すのは don\'t have to です。must not にすると「来てはいけない」という禁止になってしまいます。' } },
      { name: 'must と have to の書きかえ', freq: 'よく出る', when: '「ほぼ同じ意味に」という書きかえで、must の文を have to で表す問題。主語や時がかわることが多いです。', how: ['must ≒ have to(〜しなければならない)と考えます。', '主語が3人称単数なら has to にします。', '過去は had to、未来は will have to にします(must には過去形がありません)。', 'to の後ろは原形です。'], ex: { q: 'ほぼ同じ意味になるように( )に入れよう。Ken must finish the report today. = Ken ( ) ( ) finish the report today.', a: 'has to', exp: 'must は have to で言いかえられます。主語 Ken は3人称単数なので have を has にかえます。to の後ろの finish は原形のままです。' } },
      { name: '推量の must・may', freq: 'よく出る', when: '助動詞の後ろが be で、「〜にちがいない」「〜かもしれない」という意味を選ぶ問題。', how: ['その文が「義務」ではなく「話し手の推測」かどうかを確かめます(後ろに be が多い)。', '強い確信(〜にちがいない)なら must を使います。', '半分くらいの可能性(〜かもしれない)なら may を使います。', '前の文の根拠の強さをヒントにします。'], ex: { q: '( )に入る語を選ぼう。Tom ran twenty kilometers today. He ( ) be very tired.  ア must  イ must not  ウ has to  エ doesn\'t have to', a: 'ア must', exp: '20キロも走ったという強い根拠があるので、「とても疲れているにちがいない」と推測する must が合います。has to には推測の意味はふつうありません。' } },
      { name: 'Must I 〜? / Do I have to 〜? の答え方', freq: 'よく出る', when: '義務をたずねる疑問文に No で答える問題。', how: ['Yes なら Yes, you must. / Yes, you do. と答えます。', 'No のときに「しなくてよい」と言うには No, you don\'t have to. を使います。', 'No, you must not. は「してはいけない」になり、意味がかわるので注意します。'], ex: { q: '( )に適切な語を入れよう。— Must I go now? — No, you ( ) have to. You can stay here.', a: 'don\'t', exp: '後ろの「ここにいていいよ」から、「行かなくてよい」と答えているとわかります。No, you don\'t have to. が正しい形です。No, you must not. だと「行ってはいけない」になります。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。You ( ) wash your hands before lunch.', choices: ['must', 'are', 'do', 'does'], a: 'A(must)', exp: '「〜しなければならない」という義務を表す must を入れます。後ろの wash は原形です。' },
      { lv: 1, q: '( )に入る語を選ぼう。She has to ( ) her room.', choices: ['clean', 'cleans', 'cleaning', 'cleaned'], a: 'A(clean)', exp: 'has to の to の後ろは動詞の原形です。主語が she でも s はつけません。' },
      { lv: 1, q: '「あなたは早く寝るべきです」を英語にしよう。', a: 'You should go to bed early.', exp: '「〜するべきだ」「〜したほうがよい」は should + 原形で表します。' },
      { lv: 1, q: '( )に入るものを選ぼう。— May I use your phone? — ( )', choices: ['Sure.', 'Yes, you may not.', 'No, I don\'t.', 'Yes, I may.'], a: 'A(Sure.)', exp: 'May I 〜? は「〜してもいいですか」と許可を求める言い方です。許すときは Sure. や Of course. と答えます。' },
      { lv: 1, q: 'must を使って「ここで泳いではいけません」を英語にしよう。', a: 'You must not swim here.(You mustn\'t swim here.)', exp: 'must not は「〜してはいけない」という禁止を表します。短縮形は mustn\'t です。' },
      { lv: 1, q: 'I have to get up at six. の I を He にかえて、全文を書きなおそう。', a: 'He has to get up at six.', exp: '主語が3人称単数になるので、have to を has to にかえます。get は原形のままです。' },
      { lv: 1, q: '( )に入る語を選ぼう。You ( ) not run in the hallway.', choices: ['must', 'have', 'do', 'are'], a: 'A(must)', exp: 'must not で「〜してはいけない」という禁止になります。have not run や are not run という形はここでは使えません。' },
      { lv: 2, q: '( )に入るものを選ぼう。You ( ) to bring lunch. We will eat at a restaurant.', choices: ['don\'t have', 'must not', 'mustn\'t', 'can\'t'], a: 'A(don\'t have)', exp: 'レストランで食べるので、お弁当は「持ってこなくてよい」という意味です。空所の後ろに to があるので don\'t have が入ります。' },
      { lv: 2, q: 'ほぼ同じ意味になるように( )に入れよう。Don\'t talk here. = You ( ) ( ) talk here.', a: 'must not', exp: '否定の命令文 Don\'t 〜. は「〜するな」という禁止です。must not で書きかえられます。' },
      { lv: 2, q: '「私は昨日、母を手伝わなければなりませんでした」を英語にしよう。', a: 'I had to help my mother yesterday.', exp: 'must には過去形がないので、have to の過去形 had to を使います。' },
      { lv: 2, q: 'Do I have to wait here? に No で答えよう。', a: 'No, you don\'t (have to).', exp: 'Do I 〜? の疑問文には do で答えます。No, you don\'t (have to). は「待たなくてよい」という意味です。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Shall I carry your bag? — ( ) Thank you.', choices: ['Yes, please.', 'Yes, I shall.', 'No, you shall not.', 'Yes, let\'s.'], a: 'A(Yes, please.)', exp: 'Shall I 〜? は「(私が)〜しましょうか」という申し出です。お願いするときは Yes, please. と答えます。' },
      { lv: 2, q: '誤りを直そう。She musts study hard.', a: 'She must study hard.', exp: 'must は助動詞なので、主語が3人称単数でも s をつけません。後ろの study も原形です。' },
      { lv: 2, q: '( )に入るものを選ぼう。Kumi isn\'t at school today. She ( ) be sick.', choices: ['may', 'mustn\'t', 'doesn\'t have to', 'shall'], a: 'A(may)', exp: '学校に来ていないことから「病気かもしれない」と推測しています。推量の may(〜かもしれない)が合います。' },
      { lv: 2, q: '「あなたはそのことを心配する必要はありません」を英語にしよう。', a: 'You don\'t have to worry about it.', exp: '「〜する必要はない」は don\'t have to + 原形で表します。worry about 〜 は「〜について心配する」です。' },
      { lv: 3, q: '「あなたは来週、もう一度来なければならないでしょう」を英語にしよう。', a: 'You will have to come again next week.', exp: 'will と must は並べられないので、must を have to にかえて will have to とします。will の後ろなので have は原形です。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['He has to goes.', 'You must to study.', 'We had to wait for an hour.', 'She doesn\'t must come.'], a: 'C(We had to wait for an hour.)', exp: 'C は had to + 原形で正しい形です。A は go、B は to が不要、D は doesn\'t have to にする必要があります。' },
      { lv: 3, q: '( )に適切な語を入れよう。That ( ) be Tom. He is in America now.(あれがトムのはずがない)', a: 'can\'t(cannot)', exp: '「〜のはずがない」という強い否定の推量は can\'t(cannot)で表します。must の反対の意味だと考えましょう。' },
      { lv: 3, q: 'You must not eat here. と You don\'t have to eat here. の意味のちがいを説明しよう。', a: '前の文は「ここで食べてはいけない」(禁止)。後の文は「ここで食べなくてもよい」(不要。食べてもかまわない)。', exp: 'must not は禁止、don\'t have to は「その必要はない」という意味です。肯定文では似た意味でも、否定にすると大きく意味がかわります。' },
      { lv: 3, q: '「窓を開けましょうか」「はい、お願いします」を英語にしよう。', a: 'Shall I open the window? — Yes, please.', exp: '自分がすることを申し出るときは Shall I 〜? を使います。Shall we 〜? にすると「(いっしょに)〜しましょうか」という誘いになります。' }
    ]
  });

  add('e_m4', {
    pat: [
      { name: '不定詞の3用法の識別', freq: 'とてもよく出る', when: '「下線部と同じ用法の不定詞を含む文を選びなさい」という問題。', how: ['to 〜 が文の中でどんな役目をしているかを考えます。', '「〜すること」と訳せて、動詞の目的語・主語・補語になっていれば名詞的用法です。', 'すぐ前の名詞を「〜するための・〜すべき」と説明していれば形容詞的用法です。', '「〜するために」「〜して(うれしい等)」と動作や感情の理由を表していれば副詞的用法です。'], ex: { q: 'I got up early to catch the first train. の to catch と同じ用法を選ぼう。  ア I want to catch fish.  イ She went out to buy some eggs.  ウ I have a lot of things to do.  エ To read books is fun.', a: 'イ', exp: '問題文の to catch は「始発に乗るために」と目的を表す副詞的用法です。イの to buy も「卵を買うために」と目的を表しています。アとエは名詞的用法、ウは形容詞的用法です。' } },
      { name: '名詞 + to 〜 で後ろから説明する(形容詞的用法)', freq: 'よく出る', when: '「〜するための…」「〜すべき…」「何か〜するもの」という日本語を英語にする問題や並べかえ。', how: ['説明される名詞(books・time・something など)を先に置きます。', 'その後ろに to + 動詞の原形を続けます。', 'something・anything の場合も、後ろに to 〜 を置きます(something to drink)。', '日本語の語順(〜する本)とは逆になることを意識します。'], ex: { q: '「私には今日するべき宿題がたくさんあります」を英語にしよう。', a: 'I have a lot of homework to do today.', exp: '「するべき宿題」は、名詞 homework の後ろに to do を置いて後ろから説明します。日本語では「するべき」が前にきますが、英語では名詞が先、to 〜 が後になります。' } },
      { name: '感情の原因を表す to 〜', freq: 'よく出る', when: 'glad・happy・sad・surprised などの形容詞の後ろに空所や to 〜 があるとき。', how: ['感情を表す形容詞(happy・sad・surprised・sorry)を見つけます。', 'その後ろの to 〜 は「〜して」と感情の原因を表します。', 'be動詞 + 感情の形容詞 + to + 原形の語順にします。'], ex: { q: '( )に適切な語を入れよう。I was very sad ( ) ( ) the news.(その知らせを聞いてとても悲しかった)', a: 'to hear', exp: 'sad(悲しい)という感情の後ろに to hear を置くと、「聞いて悲しい」と感情の原因を表します。これは副詞的用法の一つです。to の後ろは原形 hear にします。' } },
      { name: '不定詞を使う並べかえ', freq: 'とてもよく出る', when: '語群に to と動詞の原形が入っている並べかえ問題。', how: ['まず主語と文の中心の動詞を決めます。', 'to の後ろに置く動詞の原形を決めます(to の後ろは必ず原形)。', 'to 〜 が「〜すること・〜するための・〜するために」のどれになるかで、置く位置を決めます。', '最後に日本語の意味と合っているかを確かめます。'], ex: { q: '並べかえよう。私にはテレビを見る時間がありません。(to / time / no / have / I / watch) TV.', a: 'I have no time to watch TV.', exp: '文の中心は I have no time(時間がない)です。「テレビを見る時間」なので、time の後ろに to watch TV を置いて後ろから説明します。no time で「時間がない」という意味になります。' } }
    ],
    more: [
      { lv: 1, q: '( )に入るものを選ぼう。I want ( ) a nurse in the future.', choices: ['be', 'to be', 'being', 'is'], a: 'B(to be)', exp: 'want to 〜 で「〜したい」です。to の後ろは原形なので、be動詞は be になります。' },
      { lv: 1, q: '「私は英語の歌を歌うのが好きです」を英語にしよう。', a: 'I like to sing English songs.', exp: 'like to 〜 で「〜することが好きだ」という意味です。この to sing は名詞的用法です。' },
      { lv: 1, q: '( )に入るものを選ぼう。She went to the park ( ) tennis.', choices: ['play', 'to play', 'plays', 'played'], a: 'B(to play)', exp: '「テニスをするために」と目的を表すので、to + 原形 to play を使います(副詞的用法)。' },
      { lv: 1, q: '「何か飲むもの」を英語にしよう。', a: 'something to drink', exp: 'something の後ろに to drink を置いて、「飲むための何か」と後ろから説明します(形容詞的用法)。' },
      { lv: 1, q: '( )に適切な2語を入れよう。My dream is ( ) ( ) a pilot.(私の夢はパイロットになることです)', a: 'to be(to become)', exp: '「〜になること」を表すので、to be(to become)を使います。is の後ろで補語になる名詞的用法です。' },
      { lv: 1, q: '( )に入るものを選ぼう。He began ( ) a letter.', choices: ['write', 'to write', 'wrote', 'writes'], a: 'B(to write)', exp: 'begin to 〜 で「〜し始める」です。began は begin の過去形です。' },
      { lv: 1, q: '( )に適切な語を入れよう。— Why did you go to the library? — ( ) study for the test.', a: 'To', exp: 'Why 〜? に「〜するためです」と目的を答えるとき、To + 原形で答えることができます。' },
      { lv: 2, q: 'Please give me something to eat. の to eat は何用法か答えよう。', a: '形容詞的用法(何か食べるもの)', exp: 'to eat はすぐ前の something を「食べるための」と後ろから説明しています。名詞を説明するので形容詞的用法です。' },
      { lv: 2, q: 'To swim in this river is dangerous. の to swim は何用法か答えよう。', a: '名詞的用法(主語になっている)', exp: 'To swim in this river(この川で泳ぐこと)が文の主語になっています。「〜すること」なので名詞的用法です。' },
      { lv: 2, q: '日本語にしよう。We were sad to say goodbye to our teacher.', a: '私たちは先生にさよならを言って悲しかった。', exp: 'sad(悲しい)という感情の後ろの to say は、「言って」と感情の原因を表しています。副詞的用法の一つです。' },
      { lv: 2, q: '並べかえよう。私は大きな家を買いたい。(a / want / to / house / buy / I / big).', a: 'I want to buy a big house.', exp: 'I want to 〜(〜したい)の形を作り、to の後ろに buy a big house を続けます。big は house の前に置きます。' },
      { lv: 2, q: '( )に入るものを選ぼう。Do you have time ( ) with me?', choices: ['to talk', 'talk', 'talked', 'talks'], a: 'A(to talk)', exp: 'time(時間)を「私と話すための」と後ろから説明するので、to talk を使います(形容詞的用法)。' },
      { lv: 2, q: '「京都には訪れるべき場所がたくさんあります」を英語にしよう。', a: 'There are many places to visit in Kyoto.', exp: 'places の後ろに to visit を置いて「訪れるべき場所」とします。many places は複数なので There are を使います。' },
      { lv: 2, q: '誤りを直そう。I decided to went abroad.', a: 'I decided to go abroad.', exp: 'to の後ろは動詞の原形です。過去の文でも、to の後ろは過去形にしません。過去は decided だけで表します。' },
      { lv: 2, q: 'I went to the shop to buy a pen. の to buy と同じ用法のものを選ぼう。', choices: ['I want to sleep.', 'I have no time to sleep.', 'He came here to see me.', 'To read is fun.'], a: 'C(He came here to see me.)', exp: '問題文の to buy は「買うために」と目的を表す副詞的用法です。C の to see も「会うために」と目的を表しています。' },
      { lv: 3, q: '「私には書くもの(ペンなど)がありません」を英語にしよう。', a: 'I don\'t have anything to write with.', exp: '「ペンで書く」は write with a pen なので、「書くための道具」は anything to write with と最後に with が残ります。with を落とすと「書く内容」の意味になります。' },
      { lv: 3, q: '「住むための家」を英語にしよう。', a: 'a house to live in', exp: '「家に住む」は live in a house です。house を前に出して後ろから説明すると、in が最後に残り a house to live in になります。' },
      { lv: 3, q: '不定詞を使って1文にしよう。He went to Canada. He wanted to study English there.', a: 'He went to Canada to study English.', exp: '2文目は「カナダへ行った目的」を表しているので、目的を表す副詞的用法 to study でつなぎます。there はカナダと重なるので省きます。' },
      { lv: 3, q: 'Her job is to take care of animals. の to take と同じ用法のものを選ぼう。', choices: ['I need something to eat.', 'He got up early to catch the train.', 'My hope is to travel around the world.', 'I\'m happy to meet you.'], a: 'C(My hope is to travel around the world.)', exp: '問題文の to take は is の後ろで「〜すること」と補語になる名詞的用法です。C の to travel も同じ形です。' },
      { lv: 3, q: '「私は彼に会うためにそこへ行きましたが、彼はいませんでした」を英語にしよう。', a: 'I went there to see him, but he wasn\'t there.', exp: '「会うために」は目的を表す副詞的用法 to see him です。後半は but でつなぎ、「いなかった」は be動詞の過去の否定 wasn\'t で表します。' }
    ]
  });

  add('e_ger', {
    pat: [
      { name: '動詞ごとに ing か to 〜 かを決める', freq: 'とてもよく出る', when: 'enjoy・finish・want・hope などの動詞の後ろに空所があり、選択肢に ing 形と to 〜 が並んでいるとき。', how: ['空所の前の動詞を確かめます。', 'enjoy・finish・stop・mind・give up は ing 形だけをとります(すでにしていることを表す動詞)。', 'want・hope・decide・plan は to 〜 だけをとります(これからすることを表す動詞)。', 'like・begin・start はどちらもとれます。'], ex: { q: '( )内の語を適切な形にしよう。I finished ( read ) the book last night.', a: 'reading', exp: 'finish(〜し終える)は後ろに動名詞(ing 形)をとる動詞です。「読むことを終えた」なので reading にします。× finished to read とは言いません。' } },
      { name: '前置詞の後ろは動名詞', freq: 'とてもよく出る', when: 'at・for・of・about・without・before などの前置詞の後ろに動詞を入れる問題。', how: ['空所の直前が前置詞かどうかを確かめます。', '前置詞の後ろには名詞のなかまがくるので、動詞は ing 形(動名詞)にします。', 'look forward to 〜 の to も前置詞なので、後ろは ing 形です。'], ex: { q: '( )内の語を適切な形にしよう。Thank you for ( help ) me with my homework.', a: 'helping', exp: 'for は前置詞です。前置詞の後ろには名詞のはたらきをする語がくるので、help を動名詞 helping にします。Thank you for 〜ing. は「〜してくれてありがとう」です。' } },
      { name: 'stop 〜ing と stop to 〜', freq: 'よく出る', when: 'stop の後ろの形を選ぶ問題や、stop を含む文の意味を答える問題。', how: ['stop + ing 形は「〜するのをやめる」です。', 'stop + to 〜 は「〜するために立ち止まる(手を止める)」で、to は目的を表します。', '前後の文からどちらの意味が合うかを判断します。'], ex: { q: '( )内の語を適切な形にしよう。Ken stopped ( talk ) and listened to the teacher.', a: 'talking', exp: '話すのをやめて先生の話を聞いた、という流れなので「〜するのをやめる」の stop 〜ing にします。stopped to talk だと「話すために立ち止まった」になり、意味が合いません。' } },
      { name: '動名詞が主語の文', freq: 'よく出る', when: '文の最初に ing 形がきている文や、「〜することは…だ」を英語にする問題。', how: ['「〜すること」を ing 形で表し、文の先頭に置きます。', '動名詞のかたまりは1つのこととして単数扱いになります。', 'be動詞は is(過去なら was)にします。'], ex: { q: '( )内の語を適切な形にしよう。( Play ) video games too much ( be ) bad for your eyes.', a: 'Playing / is', exp: '「ゲームをしすぎること」が主語なので、play を動名詞 Playing にします。主語の中心は動名詞で、games が複数でも単数扱いなので be動詞は is になります。' } }
    ],
    more: [
      { lv: 1, q: '( )に入るものを選ぼう。I enjoyed ( ) with my friends.', choices: ['talk', 'to talk', 'talking', 'talked'], a: 'C(talking)', exp: 'enjoy は後ろに動名詞をとる動詞です。enjoy 〜ing で「〜して楽しむ」になります。' },
      { lv: 1, q: '( )内の語を適切な形にしよう。He is good at ( draw ) pictures.', a: 'drawing', exp: 'at は前置詞なので、後ろの動詞は動名詞にします。be good at 〜ing で「〜するのが得意だ」です。' },
      { lv: 1, q: '( )に入るものを選ぼう。We want ( ) the museum.', choices: ['visit', 'to visit', 'visiting', 'visited'], a: 'B(to visit)', exp: 'want は後ろに to 〜 をとる動詞です。want 〜ing とは言いません。' },
      { lv: 1, q: '「料理をすることは楽しい」を動名詞を使って英語にしよう。', a: 'Cooking is fun.', exp: '「料理をすること」は動名詞 cooking で表せます。動名詞の主語は単数扱いなので is を使います。' },
      { lv: 1, q: '( )に入るものを選ぼう。Please stop ( ) a noise.', choices: ['make', 'making', 'to make', 'made'], a: 'B(making)', exp: '「音を立てるのをやめて」という意味なので stop 〜ing です。make は e をとって making になります。' },
      { lv: 1, q: '( )内の語を適切な形にしよう。How about ( go ) shopping?', a: 'going', exp: 'How about 〜? の about は前置詞なので、後ろの動詞は ing 形にします。「〜するのはどうですか」と提案する言い方です。' },
      { lv: 1, q: '( )内の語を適切な形にしよう。My hobby is ( collect ) stamps.', a: 'collecting(to collect)', exp: '「私の趣味は切手を集めることです」という意味です。is の後ろに「〜すること」を置くので、動名詞 collecting にします。to collect でも表せます。' },
      { lv: 2, q: '( )に入るものを選ぼう。She finished ( ) her homework before dinner.', choices: ['do', 'to do', 'doing', 'did'], a: 'C(doing)', exp: 'finish は動名詞だけをとる動詞です。to do にしないように注意しましょう。' },
      { lv: 2, q: '誤りを直そう。We are looking forward to visit Hawaii.', a: 'We are looking forward to visiting Hawaii.', exp: 'look forward to 〜 の to は前置詞なので、後ろは動詞の原形ではなく動名詞にします。不定詞の to と区別が必要です。' },
      { lv: 2, q: '( )内の語を適切な形にしよう。Thank you for ( invite ) me to the party.', a: 'inviting', exp: 'for は前置詞なので invite を動名詞にします。e で終わる語は e をとって ing をつけます。' },
      { lv: 2, q: '次の2文のうち、ing 形が動名詞のほうを選び、理由を書こう。(ア) My father is washing the car. (イ) My job is washing cars.', a: 'イ。is の後ろで「車を洗うこと」と主語の内容を説明しており、主語 = 洗うこと の関係だから。', exp: 'アは「父が車を洗っている」という動作の途中を表す進行形です。イは「私の仕事 = 車を洗うこと」で、ing 形が名詞のはたらきをしています。' },
      { lv: 2, q: '( )に入るものを選ぼう。Do you mind ( ) the window?', choices: ['open', 'to open', 'opening', 'opened'], a: 'C(opening)', exp: 'mind(気にする・いやがる)は動名詞をとる動詞です。Do you mind 〜ing? は「〜していただけませんか」というていねいな依頼です。' },
      { lv: 2, q: '「彼は何も言わずに出ていきました」を英語にしよう。', a: 'He went out without saying anything.', exp: 'without(〜なしで)は前置詞なので、後ろの say を動名詞 saying にします。否定の意味なので something ではなく anything を使います。' },
      { lv: 2, q: '( )に入るものを選ぼう。I hope ( ) you again soon.', choices: ['see', 'to see', 'seeing', 'saw'], a: 'B(to see)', exp: 'hope(望む)は「これから先のこと」を表すので、to 〜 をとります。hope 〜ing とは言いません。' },
      { lv: 2, q: '「英語を話すのは難しくありません」を動名詞で始めて英語にしよう。', a: 'Speaking English is not difficult.(Speaking English isn\'t difficult.)', exp: 'Speaking English(英語を話すこと)が主語です。動名詞の主語は単数扱いなので、is not を使います。' },
      { lv: 3, q: '日本語にしよう。He stopped to drink some water.', a: '彼は水を飲むために立ち止まった(手を止めた)。', exp: 'stop の後ろの to 〜 は目的を表す不定詞なので、「〜するために止まる」です。stopped drinking なら「水を飲むのをやめた」になります。' },
      { lv: 3, q: '( )に入るものを選ぼう。Please remember ( ) this letter tomorrow.', choices: ['to send', 'sending', 'send', 'sent'], a: 'A(to send)', exp: 'tomorrow があるので、これからすることです。remember to 〜 は「(これから)忘れずに〜する」、remember 〜ing は「(前に)〜したことを覚えている」です。' },
      { lv: 3, q: '( )に入るものを選ぼう。I\'ll never forget ( ) the sea for the first time.', choices: ['to see', 'seeing', 'see', 'saw'], a: 'B(seeing)', exp: '「初めて海を見たこと」はすでに起きた過去の出来事です。forget 〜ing で「(前に)〜したことを忘れる」になります。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['I enjoyed to swim.', 'He decided going there.', 'They gave up looking for it.', 'She wants playing the piano.'], a: 'C(They gave up looking for it.)', exp: 'give up は動名詞をとるので C が正しいです。enjoy は swimming、decide と want は to 〜 をとります。' },
      { lv: 3, q: '「寝る前に歯をみがきなさい」を英語にしよう。', a: 'Brush your teeth before going to bed.(Brush your teeth before you go to bed.)', exp: 'before を前置詞として使うなら後ろは動名詞 going です。接続詞として使うなら before you go と主語と動詞を続けます。' }
    ]
  });

  add('e_m5', {
    pat: [
      { name: '比較級 + than と the + 最上級', freq: 'とてもよく出る', when: '( )内の形容詞・副詞を適切な形にする問題。than があるか、the や in・of があるかがヒントです。', how: ['文に than があれば比較級(-er / more 〜)にします。', 'the があり、後ろに in 〜・of 〜 があれば最上級(-est / most 〜)にします。', 'as 〜 as にはさまれていれば、もとの形(原級)のままです。', 'つづりのかわる語(heavy → heavier、big → bigger)や不規則な語(good → better → best)に注意します。'], ex: { q: '( )内の語を適切な形にしよう。This box is ( heavy ) than that one.', a: 'heavier', exp: 'than があるので比較級にします。heavy は子音字 v + y で終わるので、y を i にかえて er をつけ heavier です。that one の one は box のくり返しをさけた語です。' } },
      { name: '最上級の in と of の使い分け', freq: 'よく出る', when: '最上級の文の最後に「〜の中で」を表す in か of を入れる問題。', how: ['「〜の中で」の後ろの語を見ます。', '場所や集団(my class・Japan・the family)なら in を使います。', '数や同じなかま(the five・all・the three boys)なら of を使います。'], ex: { q: '( )に in か of を入れよう。Ken is the tallest ( ) the five boys.', a: 'of', exp: 'the five boys(5人の少年)は「同じなかまの数」なので of を使います。もし「クラスの中で」なら、集団を表すので in my class になります。' } },
      { name: '比較の書きかえ(反対語・not as 〜 as)', freq: 'とてもよく出る', when: '「ほぼ同じ意味になるように」と、比較級の文を主語を入れかえて書きかえる問題。', how: ['2つのものの関係(どちらが上か)をはっきりさせます。', '主語を入れかえるなら、反対の意味の語(taller ↔ shorter)を使います。', 'A is not as 〜 as B は「A は B ほど〜ではない」= B のほうが〜、と考えます。', '書いた文で、どちらが上かが元の文と同じかを確かめます。'], ex: { q: 'ほぼ同じ意味になるように( )に入れよう。Tom is taller than Bob. = Bob is not ( ) ( ) ( ) Tom.', a: 'as tall as', exp: '元の文は「トムのほうが背が高い」です。Bob を主語にすると「ボブはトムほど背が高くない」となり、not as tall as を使います。as と as の間はもとの形 tall のままです。' } },
      { name: '最上級を比較級で表す(any other)', freq: '難関校で出る', when: '最上級の文と同じ意味を、比較級を使って書きかえる問題。', how: ['「いちばん〜」は「ほかのどの…よりも〜」と言いかえられます。', '比較級 + than any other + 単数名詞 の形にします。', 'other の後ろの名詞は単数形にする点に注意します。'], ex: { q: 'ほぼ同じ意味になるように( )に入れよう。The Shinano River is the longest river in Japan. = The Shinano River is longer than ( ) ( ) river in Japan.', a: 'any other', exp: '「日本でいちばん長い」は「日本のほかのどの川よりも長い」と言いかえられます。than any other の後ろの river は単数形のままです。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。My bag is ( ) than yours.', choices: ['big', 'bigger', 'biggest', 'more big'], a: 'B(bigger)', exp: 'than があるので比較級です。big は短い母音 + g なので g を重ねて bigger になります。' },
      { lv: 1, q: '比較級・最上級を書こう。(1) long (2) easy (3) good', a: '(1) longer・longest (2) easier・easiest (3) better・best', exp: '(1) そのまま er・est。(2) 子音字 + y なので y を i にかえます。(3) good は不規則で better・best です。' },
      { lv: 1, q: '( )に入る語を選ぼう。This is the ( ) building in our city.', choices: ['tall', 'taller', 'tallest', 'most tall'], a: 'C(tallest)', exp: 'the と in our city があるので、「いちばん高い」の最上級 tallest にします。' },
      { lv: 1, q: '( )内の語を適切な形にしよう。Ken runs as ( fast ) as Taro.', a: 'fast', exp: 'as 〜 as の間は、比較級や最上級にせず、もとの形(原級)のままにします。' },
      { lv: 1, q: '( )に入る語を選ぼう。This book is ( ) interesting than that one.', choices: ['more', 'most', 'very', 'much'], a: 'A(more)', exp: 'interesting のような長い語は、er ではなく more をつけて比較級にします。than があるので more です。' },
      { lv: 1, q: '「私の姉は私より年上です」を英語にしよう。', a: 'My sister is older than me.(My sister is older than I am.)', exp: '「年上」は old の比較級 older で表します。than の後ろは me でも I am でもかまいません。' },
      { lv: 1, q: '( )に入る語を選ぼう。Which do you like ( ), dogs or cats?', choices: ['good', 'well', 'better', 'best'], a: 'C(better)', exp: '2つのうち「どちらがより好きか」は like 〜 better でたずねます。better は well の比較級です。' },
      { lv: 2, q: '( )に入る語を選ぼう。Mike is the youngest ( ) the four.', choices: ['in', 'of', 'than', 'as'], a: 'B(of)', exp: 'the four(4人)は同じなかまの数を表すので of を使います。my class や Japan のような場所・集団なら in です。' },
      { lv: 2, q: '( )に入る語を選ぼう。Soccer is the most popular sport ( ) my class.', choices: ['in', 'of', 'than', 'at'], a: 'A(in)', exp: 'my class(私のクラス)は集団・範囲を表すので in を使います。of の後ろには the three や all のような数・なかまがきます。' },
      { lv: 2, q: 'ほぼ同じ意味になるように( )に入れよう。My room is smaller than yours. = Your room is ( ) than mine.', a: 'bigger(larger)', exp: '主語を入れかえるので、small の反対の big(large)の比較級を使います。「あなたの部屋のほうが大きい」となります。' },
      { lv: 2, q: 'ほぼ同じ意味になるように( )に入れよう。This bike is not as new as that one. = That bike is ( ) ( ) this one.', a: 'newer than', exp: '「この自転車はあの自転車ほど新しくない」は「あの自転車のほうが新しい」と同じ意味です。' },
      { lv: 2, q: 'beautiful の比較級・最上級を書こう。', a: 'more beautiful・most beautiful', exp: 'beautiful は長い語なので、er・est ではなく前に more・most をつけます。× beautifuler とは言いません。' },
      { lv: 2, q: '「この問題はすべての中でいちばん難しい」を英語にしよう。', a: 'This question is the most difficult of all.', exp: 'difficult は長い語なので最上級は the most difficult です。「すべての中で」は of all を使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。This bridge is ( ) longer than that one.', choices: ['very', 'much', 'more', 'most'], a: 'B(much)', exp: '比較級を強めて「ずっと〜」と言うときは much を使います。very は比較級には使えません。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Who is the tallest in your family? — ( )', choices: ['My father is.', 'My father does.', 'Yes, he is.', 'He is tall.'], a: 'A(My father is.)', exp: 'who が主語の be動詞の文なので、「主語 + is.」で答えます。疑問詞の疑問文なので Yes・No では答えません。' },
      { lv: 3, q: 'ほぼ同じ意味になるように( )に入れよう。Lake Biwa is the largest lake in Japan. = Lake Biwa is larger than ( ) ( ) ( ) in Japan.', a: 'any other lake', exp: '最上級は「比較級 + than any other + 単数名詞」で言いかえられます。other の後ろの lake は単数形です。' },
      { lv: 3, q: '( )に適切な語を入れよう。This room is ( ) ( ) large as that one.(この部屋はあの部屋の2倍の広さです)', a: 'twice as', exp: '「〜の2倍…」は twice as … as 〜 で表します。3倍なら three times as … as です。' },
      { lv: 3, q: '身長の表(A:150cm、B:158cm、C:162cm)に合う英文を選ぼう。', choices: ['A is taller than B.', 'B is the tallest of the three.', 'C is taller than A and B.', 'A is as tall as C.'], a: 'C(C is taller than A and B.)', exp: 'C は162cmでいちばん高いので、A と B のどちらよりも背が高いです。A は B より低く、いちばん高いのは C なので、ほかはあやまりです。' },
      { lv: 3, q: '誤りを直そう。The population of Tokyo is larger than Osaka.', a: 'The population of Tokyo is larger than that of Osaka.', exp: '比べているのは「東京の人口」と「大阪の人口」です。Osaka だけだと都市そのものと比べたことになるので、the population を that で受けて that of Osaka とします。' },
      { lv: 3, q: '「彼は日本で最も有名な歌手の一人です」を英語にしよう。', a: 'He is one of the most famous singers in Japan.', exp: '「最も〜な…の一人」は one of the + 最上級 + 複数名詞で表します。singers を複数形にするのを忘れないようにしましょう。' }
    ]
  });

  add('e_m6', {
    pat: [
      { name: 'be動詞 + 過去分詞の形を作る', freq: 'とてもよく出る', when: '( )内の動詞を適切な形にする問題で、主語が「される側」になっているとき。', how: ['主語が動作を「する側」か「される側」かを考えます。', 'される側なら受動態にし、主語と時に合わせて be動詞を選びます。', '動詞を過去分詞にします(不規則動詞に注意)。', '「〜によって」は by 〜 で後ろに置きます。'], ex: { q: '( )内の語を適切な形にしよう。This classroom ( clean ) by the students every day.', a: 'is cleaned', exp: '教室はそうじを「される側」なので受動態です。every day があるので現在、主語は1つなので is、clean は規則動詞なので過去分詞は cleaned です。' } },
      { name: '能動態を受動態に書きかえる', freq: 'とてもよく出る', when: '「受動態の文に書きかえなさい」という問題。', how: ['もとの文の目的語(動詞の後ろの名詞)を主語にします。代名詞なら主格にします(him → he)。', 'もとの文の時に合わせて be動詞を選び、動詞を過去分詞にします。', 'もとの主語を by の後ろに置きます。代名詞なら目的格にします(he → him)。'], ex: { q: '受動態の文にしよう。Many young people love this song.', a: 'This song is loved by many young people.', exp: '目的語 this song を主語にします。現在の文で主語は1つなので is を使い、love の過去分詞 loved を続けます。もとの主語 many young people は by の後ろに置きます。' } },
      { name: '受動態の否定文・疑問文', freq: 'よく出る', when: '受動態の文を否定文・疑問文にする問題や、受動態の疑問文に答える問題。', how: ['受動態は be動詞の文なので、do・does・did は使いません。', '否定文は be動詞の後ろに not を置きます。', '疑問文は be動詞を主語の前に出し、答えも be動詞で答えます。'], ex: { q: 'Was this picture painted by your sister? に No で答えよう。', a: 'No, it wasn\'t.(No, it was not.)', exp: '受動態の疑問文は be動詞 was を使っているので、答えも was で答えます。this picture は it にかえます。did で答えるのはよくあるまちがいです。' } },
      { name: 'by 以外の前置詞をとる受動態', freq: 'よく出る', when: 'be known・be covered・be made などの後ろの前置詞を選ぶ問題。', how: ['be known to 〜(〜に知られている)', 'be covered with 〜(〜におおわれている)・be filled with 〜(〜でいっぱいだ)', 'be made of 〜(材料が見てわかる)/ be made from 〜(原料の形がかわっている)', 'be interested in 〜(〜に興味がある)なども、セットで覚えます。'], ex: { q: '( )に入る前置詞を書こう。The street was covered ( ) red leaves.', a: 'with', exp: 'be covered with 〜 で「〜におおわれている」です。道が赤い葉でおおわれていた状態を表すので with を使います。by ではなく with を使うセットの表現として覚えましょう。' } }
    ],
    more: [
      { lv: 1, q: '( )に入るものを選ぼう。English ( ) in many countries.', choices: ['speaks', 'is spoken', 'is speaking', 'spoke'], a: 'B(is spoken)', exp: '英語は「話される」側なので受動態です。speak の過去分詞は spoken です。' },
      { lv: 1, q: '過去分詞を書こう。(1) write (2) build (3) use', a: '(1) written (2) built (3) used', exp: '(1) write → wrote → written、(2) build → built → built です。(3) use は規則動詞なので used です。' },
      { lv: 1, q: '( )に入る語を選ぼう。This bag was ( ) by my mother.', choices: ['make', 'made', 'making', 'makes'], a: 'B(made)', exp: 'was + 過去分詞で「〜された」という過去の受動態です。make の過去分詞は made です。' },
      { lv: 1, q: '受動態の文にしよう。Ken opens the door.', a: 'The door is opened by Ken.', exp: '目的語 the door を主語にし、現在なので is opened とします。Ken は by の後ろに置きます。' },
      { lv: 1, q: '次の文を否定文にしよう。This car is washed every week.', a: 'This car is not washed every week.(This car isn\'t washed every week.)', exp: '受動態の否定文は be動詞の後ろに not を置きます。過去分詞 washed はそのままです。' },
      { lv: 1, q: '次の文を疑問文にしよう。The letter was written in English.', a: 'Was the letter written in English?', exp: '受動態の疑問文は be動詞 was を主語の前に出します。Did は使いません。' },
      { lv: 1, q: 'Is Chinese taught at this school? に Yes で答えよう。', a: 'Yes, it is.', exp: 'be動詞 is の疑問文なので is で答えます。Chinese(中国語)は it にかえます。' },
      { lv: 2, q: '受動態の文にしよう。My grandfather built this house.', a: 'This house was built by my grandfather.', exp: 'もとの文が過去なので was を使います。build の過去分詞は built です。' },
      { lv: 2, q: '( )に入る語を選ぼう。This song is known ( ) everyone in Japan.', choices: ['by', 'to', 'with', 'of'], a: 'B(to)', exp: 'be known to 〜 で「〜に知られている」です。by ではなく to を使う決まった言い方です。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。This temple was built 【in 1601】.', a: 'When was this temple built?', exp: '年なので when でたずねます。その後ろは was this temple built と受動態の疑問文の語順にします。' },
      { lv: 2, q: '「この本は多くの子どもたちに読まれています」を英語にしよう。', a: 'This book is read by many children.', exp: 'read の過去分詞はつづりが同じ read です(発音は「レッド」)。本は1冊なので is を使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。Cheese is made ( ) milk.', choices: ['of', 'from', 'by', 'with'], a: 'B(from)', exp: 'チーズを見ても牛乳の形はわからないので、原料を表す from を使います。材料が見てわかるときは of です。' },
      { lv: 2, q: '受動態の文にしよう。We can see many stars from here.', a: 'Many stars can be seen from here.', exp: '助動詞のある受動態は「助動詞 + be + 過去分詞」です。can の後ろなので be動詞は原形 be になります。by us はふつう省きます。' },
      { lv: 2, q: '誤りを直そう。The window was broke by Tom.', a: 'The window was broken by Tom.', exp: '受動態には過去分詞を使います。break → broke → broken なので、broken が正しい形です。broke は過去形です。' },
      { lv: 2, q: '( )に入るものを選ぼう。What language ( ) in Brazil?', choices: ['is spoken', 'speaks', 'is speaking', 'spoken'], a: 'A(is spoken)', exp: '「ブラジルでは何語が話されていますか」という意味です。言語は話される側なので受動態 is spoken です(答えはポルトガル語)。' },
      { lv: 3, q: '受動態の文にしよう。They sell stamps at that shop.', a: 'Stamps are sold at that shop.', exp: 'they は「(その店の)人々」というばくぜんとした主語なので、by them は省くのがふつうです。sell の過去分詞は sold です。' },
      { lv: 3, q: '受動態の文にしよう。We call this dog Pochi.', a: 'This dog is called Pochi (by us).', exp: '「A を B と呼ぶ」call A B は、A を主語にして A is called B とします。Pochi は called の後ろに残ります。' },
      { lv: 3, q: 'us を主語にして受動態の文にしよう。Ms. Green teaches us English.', a: 'We are taught English by Ms. Green.', exp: 'us を主語にするときは主格 we にかえ、are taught とします。English は taught の後ろに残ります。teach の過去分詞は taught です。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['The bridge was build in 1990.', 'This desk is made of wood.', 'Was the cake made by she?', 'These photos was taken by Ken.'], a: 'B(This desk is made of wood.)', exp: '机を見れば木だとわかるので of が正しいです。A は built、C は by her、D は photos が複数なので were にする必要があります。' },
      { lv: 3, q: '「その祭りは毎年8月に開かれます」を英語にしよう。', a: 'The festival is held every August.', exp: '「(行事を)開く」は hold で、過去分詞は held です。祭りは開かれる側なので is held とします。every August の前に in はいりません。' }
    ]
  });

  add('e_conj', {
    pat: [
      { name: 'because と so(原因と結果の向き)', freq: 'とてもよく出る', when: '2つの文をつなぐ空所に because か so を選ぶ問題。', how: ['2つの文のどちらが「原因」で、どちらが「結果」かを考えます。', 'because の後ろには原因(理由)を置きます。', 'so の後ろには結果を置きます。', '「〜なので…」を左から順に「原因, so 結果」と読めるか確かめます。'], ex: { q: '( )に because か so を入れよう。I was very tired, ( ) I went to bed early.', a: 'so', exp: '「とても疲れていた」が原因、「早く寝た」が結果です。空所の後ろが結果なので so を使います。because を使うなら I went to bed early because I was very tired. の順になります。' } },
      { name: 'if・when の中は未来でも現在形', freq: 'とてもよく出る', when: 'if 〜・when 〜 の中に未来のこと(tomorrow など)があり、動詞の形を問われるとき。', how: ['if・when のかたまりがどこまでかを確かめます。', '「時」や「条件」を表す if・when の中では、未来のことでも現在形を使います(will は使いません)。', '主語が3人称単数なら s をつけます。', '文の後半(主になる文)には will を使えます。'], ex: { q: '( )内の語を適切な形にしよう。If it ( rain ) tomorrow, we will stay home.', a: 'rains', exp: 'tomorrow は未来ですが、if(もし〜なら)の中は現在形で表します。主語 it は3人称単数なので rains です。後半の we will stay home には will を使います。' } },
      { name: '命令文, and / or 〜', freq: 'よく出る', when: '命令文の後ろにコンマと空所があり、and か or を選ぶ問題。', how: ['命令文の内容を「したら」どうなるか、「しなかったら」どうなるかを考えます。', '「〜しなさい、そうすれば…」なら and を使います。', '「〜しなさい、さもないと…」なら or を使います。', '後半がよい結果か悪い結果かがヒントになります。'], ex: { q: '( )に and か or を入れよう。Get up now, ( ) you will be late for school.', a: 'or', exp: '後半の「学校に遅れるよ」は悪い結果です。「今起きなさい、さもないと遅れるよ」という意味になるので or を使います。and だと「起きれば遅れる」になってしまいます。' } },
      { name: 'both A and B・not only A but also B', freq: 'よく出る', when: 'both・either・not only などが文中にあり、組み合わせる語や動詞の形を問われるとき。', how: ['both A and B は「A も B も」で、主語なら複数扱いです。', 'either A or B は「A か B のどちらか」です。', 'not only A but also B は「A だけでなく B も」です。', 'A と B には同じ種類の語(名詞と名詞など)を置きます。'], ex: { q: '( )に is か are を入れよう。Both Ken and Mai ( ) good at English.', a: 'are', exp: 'both A and B は「A も B も」で2人を表すので、主語は複数扱いになり are を使います。Mai が単数だからといって is にしないようにしましょう。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。I like apples ( ) bananas.', choices: ['and', 'but', 'so', 'or'], a: 'A(and)', exp: '「リンゴとバナナが好き」と、同じ種類のものを並べるので and です。' },
      { lv: 1, q: '( )に入る語を選ぼう。Which is your bag, the red one ( ) the black one?', choices: ['and', 'but', 'or', 'so'], a: 'C(or)', exp: 'Which 〜, A or B? で「A と B のどちらが〜」とたずねます。選ぶときは or を使います。' },
      { lv: 1, q: '( )に入る語を選ぼう。He is rich, ( ) he isn\'t happy.', choices: ['and', 'but', 'or', 'so'], a: 'B(but)', exp: '「お金持ちだ」と「幸せではない」は反対の向きの内容なので、but(しかし)でつなぎます。' },
      { lv: 1, q: '( )に入る語を選ぼう。( ) I got home, my sister was sleeping.', choices: ['When', 'Because', 'If', 'But'], a: 'A(When)', exp: '「私が帰宅したとき」と時を表すので when を使います。when のかたまりを文の前に置くときは、後ろにコンマを入れます。' },
      { lv: 1, q: 'because を使って「雨が降っていたので、私は家にいました」を英語にしよう。', a: 'I stayed home because it was raining.', exp: 'because の後ろに理由(雨が降っていた)を置きます。結果の I stayed home を先に書きます。' },
      { lv: 1, q: '( )に入る語を選ぼう。It was cold, ( ) I put on my coat.', choices: ['but', 'or', 'so', 'because'], a: 'C(so)', exp: '「寒かった」が原因、「コートを着た」が結果なので so(だから)でつなぎます。' },
      { lv: 1, q: '( )に適切な語を入れよう。I know ( ) he likes music.(私は彼が音楽を好きだということを知っています)', a: 'that', exp: '「〜ということ」を表す接続詞 that を使います。この that は省略することもできます。' },
      { lv: 2, q: '誤りを直そう。If it will be sunny tomorrow, let\'s go hiking.', a: 'If it is sunny tomorrow, let\'s go hiking.', exp: '条件を表す if の中では、未来のことでも現在形を使います。will be を is にします。' },
      { lv: 2, q: 'ほぼ同じ意味になるように( )に入れよう。I was hungry, so I ate a sandwich. = I ate a sandwich ( ) I was hungry.', a: 'because', exp: '後ろの I was hungry は理由なので because を使います。so と because では、つなぐ順番が逆になります。' },
      { lv: 2, q: '( )に入る語を選ぼう。Hurry up, ( ) you will miss the bus.', choices: ['and', 'or', 'but', 'so'], a: 'B(or)', exp: '「急ぎなさい、さもないとバスに乗り遅れるよ」という意味なので or を使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。Study hard, ( ) you will pass the test.', choices: ['and', 'or', 'but', 'because'], a: 'A(and)', exp: '「一生けんめい勉強しなさい、そうすれば合格するよ」とよい結果が続くので and を使います。' },
      { lv: 2, q: '「私は彼女がすぐに来ると思います」を英語にしよう。', a: 'I think (that) she will come soon.', exp: 'I think の後ろに「彼女はすぐ来る」という文を続けます。that は省略できます。来るのはこれからなので will come です。' },
      { lv: 2, q: '( )に入る語を選ぼう。Let\'s start the meeting when Ms. Kato ( ).', choices: ['comes', 'will come', 'came', 'coming'], a: 'A(comes)', exp: '時を表す when の中では、未来のことでも現在形を使います。主語 Ms. Kato は3人称単数なので comes です。' },
      { lv: 2, q: 'both を使って「ケンもユミも犬が好きです」を英語にしよう。', a: 'Both Ken and Yumi like dogs.', exp: 'both A and B は複数扱いなので、動詞 like に s はつけません。' },
      { lv: 2, q: '( )に入る語を選ぼう。I was very busy yesterday. ( ), I couldn\'t watch TV.', choices: ['So', 'But', 'Or', 'Because'], a: 'A(So)', exp: '「忙しかった」が原因、「テレビを見られなかった」が結果なので So(だから)が合います。' },
      { lv: 3, q: '「彼は英語だけでなくフランス語も話せます」を英語にしよう。', a: 'He can speak not only English but also French.', exp: '「A だけでなく B も」は not only A but also B で表します。A と B には同じ種類の語(ここでは言語名)を置きます。' },
      { lv: 3, q: '( )に入る語を選ぼう。Please wait here ( ) I come back.', choices: ['until', 'by', 'during', 'while'], a: 'A(until)', exp: '「私がもどるまで(ずっと)待って」なので until を使います。by は前置詞で後ろに文を置けません。I come back は未来でも現在形です。' },
      { lv: 3, q: '( )に入る語を選ぼう。I thought that he ( ) busy.', choices: ['is', 'was', 'be', 'being'], a: 'B(was)', exp: '前の動詞が thought と過去なので、that の後ろも過去に合わせて was にします(時制の一致)。「彼は忙しいと思った」という意味です。' },
      { lv: 3, q: '誤りを直そう。Because I was sick. I didn\'t go to school.', a: 'Because I was sick, I didn\'t go to school.', exp: 'Because 〜 のかたまりは理由を表すだけなので、それだけで1つの文にはできません。コンマで後ろの文とつなぎます。' },
      { lv: 3, q: '( )に入る語を選ぼう。Kana practiced hard every day. ( ) she didn\'t win the game, she was proud of herself.', choices: ['Because', 'Though', 'If', 'So'], a: 'B(Though)', exp: '「試合に勝てなかった」と「自分をほこりに思った」は反対の向きなので、「〜けれども」の Though を使います。' }
    ]
  });

  add('e_m7', {
    pat: [
      { name: 'for と since の使い分け', freq: 'とてもよく出る', when: '現在完了(継続)の文の最後に for か since を入れる問題。', how: ['後ろの語句が「期間の長さ」か「始まった時点」かを見ます。', 'three years・a long time のような長さなら for を使います。', '2019・last year・I was a child のような始まりの時点なら since を使います。'], ex: { q: '( )に for か since を入れよう。I have lived here ( ) 2019.', a: 'since', exp: '2019 は「住み始めた時点」なので since(〜以来)を使います。もし「7年間」なら長さなので for seven years です。' } },
      { name: '合図のことばで3つの意味を見分ける', freq: 'とてもよく出る', when: '現在完了の文の意味(継続・経験・完了)を答える問題や、同じ用法を選ぶ問題。', how: ['for・since・How long があれば「継続」です。', 'ever・never・before・once・〜 times があれば「経験」です。', 'just・already・yet があれば「完了」です。', '合図がないときは、日本語にしてどれが自然かを考えます。'], ex: { q: 'Have you ever been to Kyoto? の現在完了の意味(継続・経験・完了)を答えよう。', a: '経験(今までに京都へ行ったことがありますか)', exp: 'ever(今までに)は経験の合図です。have been to 〜 は「〜へ行ったことがある」という経験を表す決まった言い方です。' } },
      { name: '過去形との区別', freq: 'とてもよく出る', when: 'yesterday・〜 ago・last 〜・When 〜? などがある文で、現在完了か過去形かを選ぶ問題。', how: ['文の中の時を表すことばを探します。', 'yesterday・〜 ago・last 〜・in 2015 など、過去の1点をはっきり示す語があれば過去形にします。', 'When でたずねる文も過去形にします。', '今とのつながり(今までに・ずっと・もう)を言うときに現在完了を使います。'], ex: { q: '( )内の語を適切な形にしよう。I ( finish ) my homework an hour ago.', a: 'finished', exp: 'an hour ago(1時間前)は過去の1点を示すことばなので、現在完了ではなく過去形にします。× I have finished 〜 an hour ago. は入試でよくねらわれるまちがいです。' } },
      { name: 'have been to と have gone to', freq: 'よく出る', when: '「〜へ行ったことがある」「〜へ行ってしまった(今いない)」の意味を問う問題や書きかえ。', how: ['have been to 〜 は「〜へ行ったことがある」(経験)や「〜へ行ってきたところだ」です。', 'have gone to 〜 は「〜へ行ってしまった(今ここにいない)」です。', '主語が I・you の文で have gone to はふつう使いません(話している本人はここにいるため)。'], ex: { q: '日本語にしよう。My father has gone to Osaka.', a: '私の父は大阪へ行ってしまいました(今ここにはいません)。', exp: 'has gone to 〜 は「行ってしまって、今はここにいない」という完了の意味です。has been to Osaka なら「大阪へ行ったことがある」という経験になります。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。I have ( ) this movie before.', choices: ['see', 'saw', 'seen', 'seeing'], a: 'C(seen)', exp: '現在完了は have + 過去分詞です。see の過去分詞は seen です。' },
      { lv: 1, q: '( )に入る語を選ぼう。She has lived in Kobe ( ) five years.', choices: ['for', 'since', 'from', 'ago'], a: 'A(for)', exp: 'five years(5年間)は期間の長さなので for を使います。' },
      { lv: 1, q: 'never を使って否定文にしよう。I have eaten sushi.', a: 'I have never eaten sushi.', exp: 'never(一度も〜ない)は have と過去分詞の間に置きます。not を使わなくても、never だけで否定の意味になります。' },
      { lv: 1, q: '次の文を疑問文にしよう。You have finished lunch.', a: 'Have you finished lunch?', exp: '現在完了の疑問文は have を主語の前に出します。do は使いません。' },
      { lv: 1, q: 'Have you ever visited Hokkaido? に No で答えよう。', a: 'No, I haven\'t.(No, I have not.)', exp: 'Have you 〜? には have で答えます。No のときは No, I haven\'t. です。' },
      { lv: 1, q: '過去分詞を書こう。(1) go (2) write (3) know', a: '(1) gone (2) written (3) known', exp: '3つとも不規則動詞です。go → went → gone、write → wrote → written、know → knew → known。' },
      { lv: 1, q: '( )に入る語を選ぼう。We have ( ) arrived at the station.(ちょうど着いたところです)', choices: ['just', 'yet', 'ever', 'since'], a: 'A(just)', exp: '「ちょうど〜したところだ」は just を have と過去分詞の間に置いて表します(完了)。' },
      { lv: 2, q: '( )に入る語を選ぼう。Have you cleaned your room ( )?', choices: ['already', 'yet', 'just', 'ever'], a: 'B(yet)', exp: '疑問文で「もう〜しましたか」とたずねるときは、文の最後に yet を置きます。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。I have stayed in this hotel 【for three days】.', a: 'How long have you stayed in this hotel?', exp: '期間をたずねるので How long を先頭に置き、have you stayed と現在完了の疑問文の語順にします。' },
      { lv: 2, q: '誤りを直そう。I have visited Okinawa last year.', a: 'I visited Okinawa last year.', exp: 'last year は過去の1点をはっきり示すことばなので、現在完了とはいっしょに使えません。過去形 visited にします。' },
      { lv: 2, q: '「私はこの町に10年間住んでいます」を英語にしよう。', a: 'I have lived in this town for ten years.', exp: '過去から今まで住み続けているので、現在完了(継続)を使います。期間の長さなので for を使います。' },
      { lv: 2, q: '( )に入るものを選ぼう。— How many times have you been to Tokyo? — ( )', choices: ['Three times.', 'For three years.', 'Yes, I have.', 'Since 2020.'], a: 'A(Three times.)', exp: 'How many times は「何回」と回数をたずねる言い方です。Three times.(3回)が合います。' },
      { lv: 2, q: 'She has already left home. の現在完了の意味(継続・経験・完了)を答え、日本語にしよう。', a: '完了。彼女はもう家を出ました。', exp: 'already(もう・すでに)は完了の合図です。leave の過去分詞は left です。' },
      { lv: 2, q: '「私は一度もパンダを見たことがありません」を英語にしよう。', a: 'I have never seen a panda.', exp: '経験の否定は never を使います。see の過去分詞 seen を続けます。' },
      { lv: 2, q: '( )に入るものを選ぼう。Ken ( ) busy since last week.', choices: ['has been', 'is', 'was', 'have been'], a: 'A(has been)', exp: 'since last week(先週から)があるので、現在完了(継続)です。主語 Ken は3人称単数なので has been を使います。' },
      { lv: 3, q: '( )に適切な語を入れよう。It ( ) ( ) three years ( ) I last saw her.(最後に彼女に会ってから3年になります)', a: 'has been / since', exp: '「〜してから…になる」は It has been 〜 since …. で表します。since の後ろは過去の文(I last saw her)です。' },
      { lv: 3, q: 'ほぼ同じ意味になるように( )に入れよう。My uncle went to Canada and he is not here now. = My uncle ( ) ( ) to Canada.', a: 'has gone', exp: '「行ってしまって今ここにいない」は have gone to 〜 で表します。主語 my uncle は3人称単数なので has です。' },
      { lv: 3, q: '1文にしよう。I came to Japan two years ago. I still live here.', a: 'I have lived in Japan for two years.', exp: '2年前から今までずっと住んでいるので、現在完了(継続)にまとめます。ago は使えなくなるので、期間 for two years で表します。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['When have you visited Rome?', 'I have seen him yesterday.', 'I haven\'t eaten anything since this morning.', 'She has went home.'], a: 'C(I haven\'t eaten anything since this morning.)', exp: 'C は「今朝から何も食べていない」という継続の否定で正しいです。A は When did you visit、B は I saw him、D は has gone にします。' },
      { lv: 3, q: '「あなたは今までに英語で手紙を書いたことがありますか」を英語にしよう。', a: 'Have you ever written a letter in English?', exp: '経験をたずねるので Have you ever + 過去分詞を使います。write の過去分詞は written です。' }
    ]
  });

  add('e_pperfprog', {
    pat: [
      { name: '状態は現在完了、動作は現在完了進行形', freq: 'とてもよく出る', when: 'for・since がある文で、have + 過去分詞 か have been 〜ing かを選ぶ問題。', how: ['動詞が「状態」(know・like・be・have(持つ)など)か、「動作」(study・run・wait など)かを考えます。', '状態がずっと続いているなら現在完了(have known など)にします。', '動作がずっと続いているなら現在完了進行形(have been studying など)にします。', '主語が3人称単数なら has を使います。'], ex: { q: '( )内の語を適切な形にしよう。I ( know ) Mr. Hill for ten years.', a: 'have known', exp: 'know(知っている)は状態を表す動詞なので、進行形にしません。10年間ずっと知っている状態が続いているので、現在完了(継続)の have known を使います。' } },
      { name: 'have been 〜ing の形を作る', freq: 'よく出る', when: '「(今まで)ずっと〜している」という日本語を英語にする問題や、動詞の形をかえる問題。', how: ['have(has)+ been + 動詞の ing 形 の3つの部品をそろえます。', '主語が3人称単数なら has been にします。', 'for(期間の長さ)・since(始まりの時点)を後ろに置きます。'], ex: { q: '( )内の語を適切な形にしよう。It ( rain ) since this morning.', a: 'has been raining', exp: '雨が降るという動作が今朝から今まで続いているので、現在完了進行形にします。主語 it は3人称単数なので has been raining です。since は始まりの時点を表します。' } },
      { name: '2文を現在完了進行形で1文にする', freq: 'よく出る', when: '「〜前に始めた」「今もまだしている」という2文を1文にまとめる問題。', how: ['1文目から、始まった時点や期間(〜 ago なら期間)を読み取ります。', '2文目の still(まだ)から、今も続いていることを確かめます。', 'have been 〜ing にして、〜 ago なら for 〜、時点なら since 〜 で表します。'], ex: { q: '1文にしよう。Ken started studying two hours ago. He is still studying.', a: 'Ken has been studying for two hours.', exp: '2時間前に始めて今も勉強しているので、「2時間ずっと勉強している」と現在完了進行形にまとめます。ago は現在完了と使えないので、two hours ago を for two hours にかえます。' } },
      { name: '時間の長さか、回数・量か', freq: '難関校で出る', when: 'since this morning などがある文で、「何時間」ではなく「いくつ・何回」を言っているとき。', how: ['文の中に数や量(three letters・five times など)があるかを確かめます。', '「どれだけの時間しているか」なら現在完了進行形を使います。', '「いくつ・何回したか(したことの結果)」なら現在完了を使います。'], ex: { q: '( )に入るものを選ぼう。I ( ) three pictures since this morning.  ア have painted  イ have been painting', a: 'ア have painted', exp: 'three pictures(3枚の絵)という「仕上げた数」を言っているので、現在完了を使います。「今朝からずっと絵をかいている」と時間の長さを言うなら have been painting になります。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。I have been ( ) for an hour.', choices: ['read', 'reading', 'to read', 'reads'], a: 'B(reading)', exp: '現在完了進行形は have been + ing 形です。been の後ろは reading になります。' },
      { lv: 1, q: '( )に入る語を選ぼう。She ( ) been playing tennis since noon.', choices: ['have', 'has', 'is', 'was'], a: 'B(has)', exp: '主語 she は3人称単数なので has been を使います。since noon は「正午から」です。' },
      { lv: 1, q: 'for two hours を加えて、現在完了進行形の文にしよう。I study English.', a: 'I have been studying English for two hours.', exp: '「2時間ずっと英語を勉強している」なので、have been studying とし、期間を for two hours で表します。' },
      { lv: 1, q: '( )に入る語を選ぼう。They have been ( ) TV since lunch.', choices: ['watch', 'watched', 'watching', 'watches'], a: 'C(watching)', exp: 'have been の後ろは ing 形です。watched にすると形がくずれます。' },
      { lv: 1, q: '( )に適切な語を入れよう。— How long have you been studying? — ( ) two hours.', a: 'For', exp: 'How long(どのくらいの間)には期間で答えます。「2時間です」は For two hours. と for を使います。' },
      { lv: 1, q: '( )に入る語を選ぼう。It has been raining ( ) Monday.', choices: ['for', 'since', 'from', 'ago'], a: 'B(since)', exp: 'Monday(月曜日)は降り始めた時点なので since(〜から)を使います。' },
      { lv: 1, q: '次の文を疑問文にしよう。He has been sleeping since ten.', a: 'Has he been sleeping since ten?', exp: '現在完了進行形の疑問文は has を主語の前に出します。been sleeping はそのままです。' },
      { lv: 2, q: '( )に入るものを選ぼう。I ( ) Yuki since we were children.', choices: ['have known', 'have been knowing', 'am knowing', 'knew'], a: 'A(have known)', exp: 'know は状態を表す動詞なので進行形にしません。子どものころから今まで知っている状態が続くので have known です。' },
      { lv: 2, q: '1文にしよう。It began to rain at noon. It is still raining.', a: 'It has been raining since noon.', exp: '正午に降り始めて今も降っているので、現在完了進行形にします。at noon は始まりの時点なので since noon にします。' },
      { lv: 2, q: '下線部をたずねる疑問文にしよう。My sister has been practicing the piano 【for three hours】.', a: 'How long has your sister been practicing the piano?', exp: '期間は How long でたずねます。has を主語の前に出し、my は your にかえます。' },
      { lv: 2, q: 'Has Tom been waiting for a long time? に Yes で答えよう。', a: 'Yes, he has.', exp: 'Has 〜? の疑問文には has で答えます。been waiting までくり返す必要はありません。' },
      { lv: 2, q: '「私たちは1時間ずっと歩いています」を英語にしよう。', a: 'We have been walking for an hour.', exp: '歩くという動作が続いているので have been walking です。an hour は h を発音しないので an を使います。' },
      { lv: 2, q: '誤りを直そう。She has been liking dogs since she was a child.', a: 'She has liked dogs since she was a child.', exp: 'like(好きである)は気持ちの状態を表すので、進行形にしません。状態の継続は現在完了 has liked で表します。' },
      { lv: 2, q: '( )に入る語を選ぼう。How long ( ) you been living here?', choices: ['have', 'are', 'did', 'do'], a: 'A(have)', exp: 'been living があるので現在完了進行形の疑問文です。How long の後ろに have you を置きます。' },
      { lv: 2, q: '日本語にしよう。I have been looking for my key since this morning.', a: '私は今朝からずっとかぎをさがしています。', exp: 'look for 〜 は「〜をさがす」です。have been looking で「(今まで)ずっとさがしている」という動作の継続を表します。' },
      { lv: 3, q: '( )に入るものを選ぼう。I ( ) five e-mails this morning, and now I\'m writing the sixth.', choices: ['have written', 'have been writing', 'am writing', 'write'], a: 'A(have written)', exp: 'five e-mails(5通)と書き終えた数を言っているので、現在完了 have written を使います。時間の長さではない点がポイントです。' },
      { lv: 3, q: '( )に入るものを選ぼう。A: You look tired. B: Yes. I ( ) since eight o\'clock.', choices: ['have been working', 'has been working', 'am worked', 'have work'], a: 'A(have been working)', exp: '8時から今までずっと働いているので、現在完了進行形にします。主語は I なので have been working です。' },
      { lv: 3, q: '( )内の語を適切な形にしよう。Mika ( be ) in the hospital for a week. She ( read ) a long novel since Monday.', a: 'has been / has been reading', exp: '1つ目は「入院している」という状態なので現在完了 has been です。2つ目は「読む」という動作が続いているので has been reading にします。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['I have been knowing her for years.', 'He has been running since an hour.', 'They have been talking for an hour.', 'She is been waiting.'], a: 'C(They have been talking for an hour.)', exp: 'C は動作 talk の継続を正しく表しています。A は have known、B は for an hour、D は has been waiting にします。' },
      { lv: 3, q: '「あなたはどのくらい日本語を勉強していますか」「3年間です」を英語にしよう。', a: 'How long have you been studying Japanese? — For three years.', exp: '勉強という動作が続いている期間をたずねるので、How long have you been studying 〜? とします。答えは for で期間を言います。' }
    ]
  });

  add('e_partm', {
    pat: [
      { name: '現在分詞か過去分詞か(する・される)', freq: 'とてもよく出る', when: '名詞を説明する分詞の形(〜ing か過去分詞か)を選ぶ問題。', how: ['説明される名詞と、動詞の関係を考えます。', '名詞が「〜している」(する側)なら現在分詞(〜ing)にします。', '名詞が「〜された・〜される」(される側)なら過去分詞にします。', '不規則動詞の過去分詞に注意します(take → taken など)。'], ex: { q: '( )内の語を適切な形にしよう。This is a picture ( take ) by my grandfather.', a: 'taken', exp: '写真は祖父に「撮られた」側なので過去分詞にします。take の過去分詞は taken です。by my grandfather(祖父によって)も、される側であることのヒントになります。' } },
      { name: '分詞の位置(1語なら前、2語以上なら後ろ)', freq: 'とてもよく出る', when: '語群に分詞と名詞が入っている並べかえ問題。', how: ['分詞が1語だけで名詞を説明するときは、名詞の前に置きます(a sleeping cat)。', '分詞に語句がつくとき(sleeping under the tree)は、名詞の後ろに置きます。', 'まず「名詞 + 分詞のかたまり」で大きな主語や目的語を作り、それから動詞を置きます。'], ex: { q: '並べかえよう。木の下で眠っているネコは私のネコです。(the / under / sleeping / cat / tree / the) is mine.', a: 'The cat sleeping under the tree is mine.', exp: 'sleeping under the tree は2語以上のかたまりなので、名詞 the cat の後ろに置きます。「The cat 〜 tree」全体が主語で、その後ろに is mine が続きます。' } },
      { name: '分詞で長くなった主語の動詞', freq: 'よく出る', when: '主語の名詞の後ろに分詞のかたまりがあり、その後ろの be動詞・動詞を選ぶ問題。', how: ['文の最初の名詞(主語の中心)を見つけます。', '分詞のかたまり(playing 〜 / taken by 〜)は説明の部分なので、かっこでくくって考えます。', '中心の名詞が単数か複数かで、動詞の形を決めます。'], ex: { q: '( )に is か are を入れよう。The pictures painted by the girl ( ) beautiful.', a: 'are', exp: '主語の中心は the pictures(絵)で複数です。painted by the girl は「その少女にかかれた」という説明なので、すぐ前の girl につられて is にしないよう注意します。' } },
      { name: 'exciting と excited のような感情の分詞', freq: 'よく出る', when: 'interesting / interested、surprising / surprised などのどちらかを選ぶ問題。', how: ['主語が「人に気持ちを起こさせるもの」なら -ing(exciting = わくわくさせる)にします。', '主語が「気持ちを起こされた人」なら過去分詞(excited = わくわくした)にします。', '主語が人かものかだけでなく、「気持ちを感じているのはだれか」を確かめます。'], ex: { q: '( )内の語を適切な形にしよう。The news was very ( surprise ).', a: 'surprising', exp: '主語の the news(その知らせ)は、人を驚かせるものです。「驚かせるような」という意味になるので -ing 形の surprising を使います。人が驚いたなら I was surprised. です。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。Look at that ( ) dog.', choices: ['run', 'running', 'ran', 'runs'], a: 'B(running)', exp: '犬は「走っている」側なので現在分詞 running です。1語なので名詞 dog の前に置きます。' },
      { lv: 1, q: '( )に入る語を選ぼう。My father has a car ( ) in Germany.', choices: ['make', 'making', 'made', 'makes'], a: 'C(made)', exp: '車は「作られた」側なので過去分詞 made です。in Germany がつくので名詞の後ろに置きます。' },
      { lv: 1, q: '( )内の語を適切な形にしよう。Be careful. There is a ( break ) window.', a: 'broken', exp: '窓は「割られた」側なので過去分詞 broken です。1語なので window の前に置きます。' },
      { lv: 1, q: '「泳いでいる少年」を英語にしよう。', a: 'a swimming boy(the swimming boy)', exp: '少年は「泳いでいる」側なので現在分詞 swimming です。swim は m を重ねます。' },
      { lv: 1, q: '( )に入る語を選ぼう。This is a letter ( ) in English.', choices: ['write', 'writing', 'written', 'wrote'], a: 'C(written)', exp: '手紙は「書かれた」側なので過去分詞 written です。write の過去形 wrote と区別しましょう。' },
      { lv: 1, q: '「ベンチにすわっている女の人」を英語にしよう。', a: 'the woman sitting on the bench', exp: 'sitting on the bench は2語以上なので、名詞 the woman の後ろに置きます。sit は t を重ねて sitting です。' },
      { lv: 1, q: '( )に入る語を選ぼう。The game was very ( ), and everyone cheered.', choices: ['exciting', 'excited', 'excite', 'excites'], a: 'A(exciting)', exp: '試合は人をわくわくさせるものなので exciting です。人がわくわくしたなら We were excited. のように過去分詞を使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。The boy ( ) with Ken is my brother.', choices: ['talk', 'talking', 'talked', 'talks'], a: 'B(talking)', exp: '少年は「話している」側なので現在分詞です。talking with Ken が the boy を後ろから説明しています。' },
      { lv: 2, q: '( )に入る語を選ぼう。English is a language ( ) all over the world.', choices: ['speaking', 'spoken', 'speak', 'spoke'], a: 'B(spoken)', exp: '言語は「話される」側なので過去分詞 spoken です。spoken all over the world が a language を後ろから説明しています。' },
      { lv: 2, q: '( )に入る語を選ぼう。The students playing soccer in the park ( ) my classmates.', choices: ['is', 'are', 'was', 'be'], a: 'B(are)', exp: '主語の中心は the students で複数です。playing soccer in the park は説明の部分なので、park につられないようにします。' },
      { lv: 2, q: '並べかえよう。これは母が作ったかばんです。(made / bag / my / is / this / by / mother / a).', a: 'This is a bag made by my mother.', exp: '「母によって作られたかばん」なので、a bag の後ろに made by my mother を置きます。' },
      { lv: 2, q: '「私はケンが撮った写真が好きです」を分詞を使って英語にしよう。', a: 'I like the pictures taken by Ken.', exp: '写真はケンに「撮られた」側なので、the pictures の後ろに taken by Ken を置きます。' },
      { lv: 2, q: '( )に入る語を選ぼう。I was ( ) at the news.', choices: ['surprising', 'surprised', 'surprise', 'to surprise'], a: 'B(surprised)', exp: '主語の I は「驚かされた」人なので過去分詞 surprised を使います。be surprised at 〜 で「〜に驚く」です。' },
      { lv: 2, q: '分詞を使って書きかえよう。Look at the man who is standing by the door.', a: 'Look at the man standing by the door.', exp: 'who is standing の who is を省くと、現在分詞 standing が後ろから名詞を説明する形になります。' },
      { lv: 2, q: '誤りを直そう。The singing songs girl is my sister.', a: 'The girl singing songs is my sister.', exp: 'singing songs は2語のかたまりなので、名詞 girl の後ろに置きます。1語の分詞だけが名詞の前にきます。' },
      { lv: 3, q: 'boiling water と boiled eggs のちがいを説明しよう。', a: 'boiling water は「わいている(今わいている途中の)お湯」、boiled eggs は「ゆでられた(ゆで終わった)卵」。', exp: '現在分詞は「〜している途中」、過去分詞は「〜されてその状態になった」を表します。水はわいている側、卵はゆでられた側です。' },
      { lv: 3, q: '「ロンドンで買われたそのかばんは、とても高かった」を英語にしよう。', a: 'The bag bought in London was very expensive.', exp: 'かばんは「買われた」側なので過去分詞 bought を使い、the bag の後ろに置きます。主語は the bag 1つなので was です。' },
      { lv: 3, q: '正しい英文を1つ選ぼう。', choices: ['The man stood there is my teacher.', 'I know the girl called Momo.', 'A sleeped baby is cute.', 'The books writing by him are popular.'], a: 'B(I know the girl called Momo.)', exp: 'B は「モモと呼ばれている少女」で正しいです。A は standing、C は sleeping、D は written にする必要があります。' },
      { lv: 3, q: '並べかえよう。赤いぼうしをかぶっている少年を知っていますか。Do you know the boy (wearing / cap / a / red)?', a: 'Do you know the boy wearing a red cap?', exp: '少年は「かぶっている」側なので wearing を使い、wearing a red cap のかたまりを the boy の後ろに置きます。' },
      { lv: 3, q: '( )に入るものを選ぼう。We were ( ) because the game was ( ).', choices: ['excited / exciting', 'exciting / excited', 'excited / excited', 'exciting / exciting'], a: 'A(excited / exciting)', exp: '私たちは「わくわくさせられた」側なので excited、試合は人を「わくわくさせる」ものなので exciting です。' }
    ]
  });

  add('e_m8', {
    pat: [
      { name: '先行詞で who・which・that を選ぶ', freq: 'とてもよく出る', when: '名詞の後ろの空所に関係代名詞を入れる問題。', how: ['空所のすぐ前の名詞(先行詞)が「人」か「人以外」かを確かめます。', '人なら who、もの・動物なら which を使います。', 'that は人にもものにも使えます。', '先行詞に最上級・the only・all などがつくときや、「人 + 動物」のときは that がよく使われます。'], ex: { q: '( )に who か which を入れよう。I have a friend ( ) lives in Canada.', a: 'who', exp: '先行詞の a friend(友達)は人なので who を使います。後ろに主語がなく、すぐ動詞 lives が続くので、主格の関係代名詞です。that を使うこともできます。' } },
      { name: '主格か目的格か(後ろに主語があるか)', freq: 'よく出る', when: '関係代名詞を省略できるかどうかを問う問題や、2文を1文にする問題。', how: ['関係代名詞のすぐ後ろを見ます。', 'すぐ後ろが動詞なら主格です(省略できません)。', 'すぐ後ろが「主語 + 動詞」なら目的格です(省略できます)。', '目的格の which・that を省くと、「名詞 + 主語 + 動詞」の形になります。'], ex: { q: 'This is the book which I bought yesterday. の which は省略できるか、理由とともに答えよう。', a: '省略できる。which の後ろに主語 I と動詞 bought が続く目的格だから。', exp: 'which は bought の目的語の役目をしています(I bought the book)。目的格の関係代名詞は省略でき、This is the book I bought yesterday. としても同じ意味になります。' } },
      { name: '関係代名詞の後ろの動詞は先行詞に合わせる', freq: 'よく出る', when: '主格の関係代名詞の後ろの動詞の形(s をつけるか)を問う問題。', how: ['主格の who・which の後ろの動詞の主語は、先行詞です。', '先行詞が単数なら、現在の文では動詞に s をつけます。', '先行詞が複数なら s をつけません。'], ex: { q: '( )内の語を適切な形にしよう。I know a boy who ( speak ) three languages.', a: 'speaks', exp: 'who の後ろの動詞の主語は先行詞 a boy です。a boy は3人称単数で、現在の文なので speaks にします。文全体の主語 I に合わせて speak にしないよう注意しましょう。' } },
      { name: '関係代名詞で長くなった主語の動詞', freq: 'とてもよく出る', when: '主語の名詞の後ろに who・which のかたまりがあり、文全体の動詞を選ぶ問題。', how: ['文頭の名詞(主語の中心)を見つけます。', 'who・which から始まる説明のかたまりがどこで終わるかを見つけます。', 'そのかたまりの後ろにある動詞が文全体の動詞です。', '主語の中心に合わせて動詞の形を決めます。'], ex: { q: '( )に入る語を選ぼう。The man who is talking with Ms. Ito ( ) our new coach.  ア is  イ are  ウ be  エ being', a: 'ア is', exp: '主語の中心は the man で、who is talking with Ms. Ito は説明のかたまりです。その後ろの空所が文全体の動詞なので、the man に合わせて is にします。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。I have an uncle ( ) is a pilot.', choices: ['who', 'which', 'what', 'whose'], a: 'A(who)', exp: '先行詞 an uncle は人で、すぐ後ろが動詞 is なので主格の who を使います。' },
      { lv: 1, q: '( )に入る語を選ぼう。This is the train ( ) goes to Sendai.', choices: ['who', 'which', 'where', 'when'], a: 'B(which)', exp: '先行詞 the train はものなので which を使います。後ろが動詞 goes なので主格です。' },
      { lv: 1, q: '関係代名詞を使って1文にしよう。I know a girl. She can play the flute.', a: 'I know a girl who(that) can play the flute.', exp: 'She は a girl のことなので、主格の who にかえて a girl の後ろにつなぎます。' },
      { lv: 1, q: '関係代名詞を使って1文にしよう。This is a cake. My mother made it.', a: 'This is a cake which(that) my mother made.', exp: 'it は a cake を指す目的語なので、目的格の which にかえて先頭に出します。which は省略もできます。' },
      { lv: 1, q: '( )に入る語を選ぼう。The boy ( ) is running there is Ken.', choices: ['who', 'which', 'what', 'he'], a: 'A(who)', exp: '先行詞 the boy は人なので who です。he を入れると文が2つつながったままになってしまいます。' },
      { lv: 1, q: '「これは私が昨日読んだ本です」を英語にしよう。', a: 'This is the book (which / that) I read yesterday.', exp: 'the book の後ろに「私が昨日読んだ」を置きます。目的格なので which・that は省略できます。' },
      { lv: 1, q: '( )に入る語を選ぼう。Look at the house ( ) has a red roof.', choices: ['who', 'which', 'what', 'it'], a: 'B(which)', exp: '先行詞 the house はものなので which を使います。後ろが動詞 has なので主格です。' },
      { lv: 2, q: '関係代名詞を省略できる文を1つ選ぼう。', choices: ['The girl who lives next door is kind.', 'The movie that I saw last night was fun.', 'I have a cat which runs fast.', 'He is the man who helped me.'], a: 'B(The movie that I saw last night was fun.)', exp: 'B の that の後ろは「主語 I + 動詞 saw」なので目的格で、省略できます。ほかは後ろがすぐ動詞の主格なので省略できません。' },
      { lv: 2, q: '( )に入る語を選ぼう。I have a friend who ( ) in Paris.', choices: ['live', 'lives', 'living', 'to live'], a: 'B(lives)', exp: 'who の後ろの動詞の主語は a friend(3人称単数)なので lives です。' },
      { lv: 2, q: '( )に入る語を選ぼう。The pictures which Ken took ( ) beautiful.', choices: ['is', 'are', 'was', 'be'], a: 'B(are)', exp: '主語の中心は the pictures で複数です。which Ken took は説明のかたまりなので、Ken につられて is にしません。' },
      { lv: 2, q: '「あなたがいちばん会いたい人はだれですか」を英語にしよう。', a: 'Who is the person (that) you want to see the most?', exp: 'the person の後ろに「あなたが会いたい」を置きます。目的格なので that は省略できます。疑問詞 who との重なりをさけるため、that がよく使われます。' },
      { lv: 2, q: '( )に入る語を選ぼう。This is the most interesting book ( ) I have ever read.', choices: ['who', 'that', 'what', 'whose'], a: 'B(that)', exp: '先行詞に最上級 the most interesting がつくときは、関係代名詞 that がよく使われます。' },
      { lv: 2, q: '誤りを直そう。The man which is standing there is my father.', a: 'The man who(that) is standing there is my father.', exp: '先行詞 the man は人なので、which ではなく who(または that)を使います。' },
      { lv: 2, q: '関係代名詞を使って1文にしよう。The woman is a doctor. She is talking with Mai.', a: 'The woman who(that) is talking with Mai is a doctor.', exp: 'the woman を説明するかたまり who is talking with Mai を、主語 the woman のすぐ後ろに入れます。文全体の動詞 is a doctor は最後にきます。' },
      { lv: 2, q: '( )に入る語を選ぼう。Look at the girl and her dog ( ) are walking in the park.', choices: ['who', 'which', 'that', 'whose'], a: 'C(that)', exp: '先行詞が「人(the girl)+ 動物(her dog)」のときは、どちらにも使える that を使います。' },
      { lv: 3, q: '関係代名詞を使って1文にしよう。This is the house. I lived in it ten years ago.', a: 'This is the house (which / that) I lived in ten years ago.', exp: 'it は in の目的語なので、目的格の which にかえて the house の後ろに出します。前置詞 in は動詞の後ろに残ります。' },
      { lv: 3, q: '関係代名詞を使って1文にしよう。I have a friend. Her father is a famous singer.', a: 'I have a friend whose father is a famous singer.', exp: 'Her(彼女の)は所有を表すので、whose(その人の)にかえてつなぎます。whose の後ろにはすぐ名詞 father がきます。' },
      { lv: 3, q: '並べかえよう。私は彼がくれた本をなくしてしまいました。(the / he / book / gave / me / lost / I).', a: 'I lost the book he gave me.', exp: 'the book の後ろに目的格の関係代名詞が省略された he gave me を置きます。文全体の動詞は lost です。' },
      { lv: 3, q: '( )に入る語を選ぼう。Is there anything ( ) I can do for you?', choices: ['who', 'that', 'whose', 'what'], a: 'B(that)', exp: '先行詞が anything のときは、関係代名詞 that を使うのがふつうです。what は先行詞をふくむ語なので、ここでは使えません。' },
      { lv: 3, q: '「私がロンドンで会った少女は日本語を話すことができました」を英語にしよう。', a: 'The girl (that / who) I met in London could speak Japanese.', exp: '主語 the girl の後ろに「私がロンドンで会った」を置き、その後ろに文全体の動詞 could speak を続けます。目的格なので関係代名詞は省略できます。' }
    ]
  });

  add('e_indq', {
    pat: [
      { name: '間接疑問の語順(疑問詞 + 主語 + 動詞)', freq: 'とてもよく出る', when: 'Do you know・I don\'t know・Tell me などの後ろに疑問詞が続く文。並べかえでよく出ます。', how: ['疑問詞の後ろを、ふつうの文と同じ「主語 + 動詞」の順にします。', 'be動詞の文なら、be動詞を主語の後ろにもどします(where he is)。', '文全体が疑問文なら最後は ?、そうでなければ . にします。'], ex: { q: '並べかえよう。Do you know where (lives / he)?', a: 'Do you know where he lives?', exp: 'Do you know の後ろに疑問を入れると、間接疑問になり「疑問詞 + 主語 + 動詞」の語順にかわります。where does he live? のままにはしません。' } },
      { name: 'do・does・did を消して動詞の形をかえる', freq: 'とてもよく出る', when: '一般動詞の疑問文(Where does 〜? / What did 〜?)を間接疑問にする問題。', how: ['もとの疑問文の do・does・did を取りのぞきます。', 'does があったなら動詞に s をつけます(三単現)。', 'did があったなら動詞を過去形にします。', '疑問詞 + 主語 + 動詞の順に並べます。'], ex: { q: 'What did she buy? を I don\'t know に続けて1文にしよう。', a: 'I don\'t know what she bought.', exp: 'did を取りのぞくと、過去の意味は動詞が受けもつので buy を過去形 bought にします。語順は what + she + bought です。× what did she buy にしないことがポイントです。' } },
      { name: '疑問詞が主語の間接疑問', freq: 'よく出る', when: 'Who broke 〜? / What happened? のように、疑問詞が主語になっている疑問文を間接疑問にする問題。', how: ['疑問詞が主語かどうかを確かめます(すぐ後ろが動詞)。', '主語なら、語順はかえずにそのまま続けます。', 'do・does・did はもともと使われていないので、動詞の形もそのままです。'], ex: { q: 'Who ate my cake? を I want to know に続けて1文にしよう。', a: 'I want to know who ate my cake.', exp: 'who は「だれが」という主語なので、もとの疑問文がすでに「主語 + 動詞」の順になっています。そのまま続けるだけで間接疑問になります。' } },
      { name: 'if(〜かどうか)を使う間接疑問', freq: '難関校で出る', when: '疑問詞のない Yes / No 疑問文(Is he 〜? / Does she 〜?)を間接疑問にする問題。', how: ['疑問詞がない疑問文は、if(〜かどうか)を使ってつなぎます。', 'if の後ろは「主語 + 動詞」のふつうの語順にします。', 'do・does・did は取りのぞき、動詞の形をかえます。'], ex: { q: 'Is Ken busy now? を I don\'t know に続けて1文にしよう。', a: 'I don\'t know if Ken is busy now.', exp: '疑問詞がないので「〜かどうか」を表す if でつなぎます。if の後ろは Ken is と、主語 + be動詞の順にもどします。whether を使うこともできます。' } }
    ],
    more: [
      { lv: 1, q: '( )に入るものを選ぼう。I know where ( ).', choices: ['does he live', 'he lives', 'lives he', 'he does live'], a: 'B(he lives)', exp: '間接疑問は「疑問詞 + 主語 + 動詞」の順です。does を取りのぞいて、live に s をつけます。' },
      { lv: 1, q: '( )に入るものを選ぼう。Do you know what ( )?', choices: ['is this', 'this is', 'this', 'is'], a: 'B(this is)', exp: 'What is this? を Do you know に続けると、be動詞を主語の後ろにもどして what this is になります。' },
      { lv: 1, q: 'Where is the city hall? を I don\'t know に続けて1文にしよう。', a: 'I don\'t know where the city hall is.', exp: 'be動詞の疑問文を間接疑問にするときは、be動詞を主語 the city hall の後ろにもどします。' },
      { lv: 1, q: '( )に入るものを選ぼう。Please tell me when ( ).', choices: ['your birthday is', 'is your birthday', 'your birthday', 'does your birthday'], a: 'A(your birthday is)', exp: 'tell me の後ろに疑問を入れるので、when + 主語 + 動詞 の順にします。' },
      { lv: 1, q: 'What time is it? を Do you know に続けて1文にしよう。', a: 'Do you know what time it is?', exp: 'what time のかたまりはそのまま前に置き、その後ろを it is の順にします。文全体は疑問文なので ? をつけます。' },
      { lv: 1, q: '( )に入るものを選ぼう。I don\'t know how old ( ).', choices: ['is she', 'she is', 'does she', 'she does'], a: 'B(she is)', exp: 'how old のかたまりの後ろを、主語 she + be動詞 is の順にします。' },
      { lv: 1, q: '「私は彼がだれか知っています」を英語にしよう。', a: 'I know who he is.', exp: 'Who is he? を I know に続けるので、who + he + is の順にします。' },
      { lv: 2, q: 'What does Ken want? を I know に続けて1文にしよう。', a: 'I know what Ken wants.', exp: 'does を取りのぞき、主語 Ken が3人称単数なので want に s をつけて wants にします。' },
      { lv: 2, q: 'Where did you go? を Tell me に続けて1文にしよう。', a: 'Tell me where you went.', exp: 'did を取りのぞき、過去の意味を残すために go を過去形 went にします。' },
      { lv: 2, q: '並べかえよう。バスがなぜ遅れているのか知っていますか。Do you know (is / the / why / late / bus)?', a: 'Do you know why the bus is late?', exp: 'why の後ろを、主語 the bus + be動詞 is の順にします。late は is の後ろです。' },
      { lv: 2, q: '( )に入るものを選ぼう。Do you know who ( ) this picture?', choices: ['painted', 'did paint', 'was painted', 'painting'], a: 'A(painted)', exp: 'Who painted this picture? の who は主語なので、語順も動詞の形もそのまま続けます。' },
      { lv: 2, q: '誤りを直そう。I wonder what is his name.', a: 'I wonder what his name is.', exp: 'I wonder の後ろは間接疑問なので、主語 his name の後ろに is を置きます。I wonder 〜 は「〜だろうかと思う」です。' },
      { lv: 2, q: 'How many books does she have? を I don\'t know に続けて1文にしよう。', a: 'I don\'t know how many books she has.', exp: 'how many books のかたまりはそのまま前に置きます。does を取りのぞき、have を has にします。' },
      { lv: 2, q: '「あなたはその店がいつ開くか知っていますか」を英語にしよう。', a: 'Do you know when the shop opens?', exp: 'when の後ろを the shop opens の順にします。主語 the shop は3人称単数なので opens です。' },
      { lv: 2, q: 'Will it rain tomorrow? を I don\'t know に続けて1文にしよう。', a: 'I don\'t know if it will rain tomorrow.', exp: '疑問詞がないので if(〜かどうか)を使います。この if は「〜かどうか」の意味なので、未来のことは will を使って表します。' },
      { lv: 3, q: 'ほぼ同じ意味になるように( )に入れよう。Can you tell me how I can get to the station? = Can you tell me ( ) ( ) ( ) to the station?', a: 'how to get', exp: '「どうやって〜すればよいか」は how to 〜 で表せます。how I can get を how to get と短くできます。' },
      { lv: 3, q: '( )に入るものを選ぼう。— Do you know where Mai is? — ( )', choices: ['Yes, she is in the library.', 'Yes, I do. She\'s in the library.', 'Where is she?', 'No, she isn\'t.'], a: 'B(Yes, I do. She\'s in the library.)', exp: '文全体は Do you know 〜?(知っていますか)なので、まず Yes, I do. と答え、そのあとで場所を伝えるのが自然です。' },
      { lv: 3, q: '「あなたは彼がどこに住んでいると思いますか」を英語にしよう。', a: 'Where do you think he lives?', exp: 'do you think の文では、Yes・No ではなく場所を答えてほしいので、疑問詞 where を文の先頭に出します。その後ろは do you think he lives の順です。' },
      { lv: 3, q: '( )内の語を適切な形にしよう。I asked him where he ( live ).', a: 'lived', exp: '文全体の動詞 asked が過去なので、間接疑問の中の動詞も過去形 lived に合わせます(時制の一致)。' },
      { lv: 3, q: '( )に入るものを選ぼう。A: Excuse me. Could you tell me ( )? B: Sure. It\'s on the third floor.', choices: ['where the bookstore is', 'where is the bookstore', 'the bookstore where is', 'where does the bookstore'], a: 'A(where the bookstore is)', exp: 'Could you tell me の後ろは間接疑問なので、where + 主語 + 動詞 の順にします。答えから場所をたずねているとわかります。' }
    ]
  });

  add('e_vocab_m', {
    pat: [
      { name: '語形変化(品詞をかえる)', freq: 'よく出る', when: '「( )内の語を適切な形にしなさい」で、動詞の変化ではなく名詞・形容詞・副詞への変化が必要なとき。', how: ['空所の前後から、どの品詞が入るかを決めます(a・the の後ろは名詞、be動詞の後ろは形容詞、動詞のあとで様子を言うなら副詞)。', '名詞にするなら -ness・-er・-tion などの語尾を考えます。', '形容詞にするなら -ful・-ous・-y、副詞にするなら -ly をつけます。', 'y で終わる語は i にかえるなど、つづりに注意します。'], ex: { q: '( )内の語を適切な形にしよう。Health is more important than ( happy ).', a: 'happiness', exp: 'than の後ろで health(健康)と比べられているので、名詞が入ります。happy を名詞にするには -ness をつけ、y を i にかえて happiness にします。' } },
      { name: '英語の説明(定義文)から単語を当てる', freq: 'よく出る', when: '「次の説明に合う語を書きなさい」と、英語で語の意味が書かれている問題。', how: ['説明の最初の語(a place・a person・a thing・the day など)で、答えの種類をしぼります。', 'where・who・which の後ろの説明から、具体的な場面を思いうかべます。', '最初の文字が示されていればそれに合う語を選び、つづりを確かめます。'], ex: { q: '次の説明に合う語を書こう。a place where people borrow and read books', a: 'library', exp: 'a place(場所)で、人々が本を借りて読む場所なので library(図書館)です。where 以下が場所の説明になっています。つづりは r が2つ入る点に注意しましょう。' } },
      { name: 'say・tell・speak・talk の使い分け', freq: 'よく出る', when: '「言う・話す」を表す4つの動詞から1つを選ぶ問題。', how: ['後ろに「人」が直接くるなら tell(tell me the way)を考えます。', '後ろに「言葉の中身」がくるなら say(say hello・say that 〜)を使います。', '言語を話す能力なら speak(speak English)を使います。', '相手とやりとりして話すなら talk(talk with 〜・talk about 〜)を使います。'], ex: { q: '( )に入る語を選ぼう。Could you ( ) me the way to the station?  ア say  イ tell  ウ speak  エ talk', a: 'イ tell', exp: '空所の後ろに me(人)と the way(道)が続いています。「人に〜を教える・伝える」は tell 人 もの の形で表します。say me とは言いません。' } },
      { name: 'borrow と lend(借りる・貸す)', freq: 'よく出る', when: '「借りる」「貸す」を表す語を選ぶ問題や、Can I 〜? / Can you 〜? の文。', how: ['主語がものを「受け取る」側なら borrow(借りる)です。', '主語がものを「わたす」側なら lend(貸す)です。lend 人 もの の形をとります。', 'Can I 〜? なら自分が借りる、Can you 〜 me? なら相手が貸す、と考えます。'], ex: { q: '( )に borrow か lend を入れよう。Can I ( ) your umbrella?', a: 'borrow', exp: 'Can I 〜? で、かさを受け取るのは「私」なので「借りる」の borrow です。相手を主語にすれば Can you lend me your umbrella? となり、ほぼ同じ意味になります。' } }
    ],
    more: [
      { lv: 1, q: '反対の意味の語を書こう。(1) hot (2) early (3) open', a: '(1) cold (2) late (3) close(shut)', exp: '反対語はセットで覚えると定着します。early(早い)の反対は late(遅い)です。' },
      { lv: 1, q: '同じ発音の語を書こう。(1) meet (2) write', a: '(1) meat (2) right', exp: 'meet(会う)と meat(肉)、write(書く)と right(右・正しい)は、つづりはちがいますが発音は同じです。' },
      { lv: 1, q: '( )に入る曜日を英語で書こう。Monday → ( ) → Wednesday', a: 'Tuesday', exp: '月曜日の次は火曜日 Tuesday です。曜日は大文字で書き始めます。つづりの ue に注意しましょう。' },
      { lv: 1, q: '次の説明に合う語を書こう。the month after March', a: 'April', exp: 'March(3月)の次の月なので April(4月)です。月の名前も大文字で書き始めます。' },
      { lv: 1, q: 'beautiful の品詞を答えよう。', a: '形容詞', exp: 'beautiful は「美しい」と、ものや人の様子を表す形容詞です。-ful は形容詞を作る語尾の一つです。' },
      { lv: 1, q: '複数形にしよう。(1) child (2) knife (3) tooth', a: '(1) children (2) knives (3) teeth', exp: 'どれも s をつけるだけではない形です。knife は f を v にかえて es、tooth は oo が ee にかわります。' },
      { lv: 1, q: '( )に入る語を選ぼう。I usually eat ( ) at seven in the morning.', choices: ['breakfast', 'lunch', 'dinner', 'supper'], a: 'A(breakfast)', exp: 'in the morning(朝)に食べる食事なので breakfast(朝食)です。lunch は昼食、dinner・supper は夕食です。' },
      { lv: 2, q: '( )に入る語を選ぼう。Can you ( ) me your dictionary?', choices: ['borrow', 'lend', 'rent', 'take'], a: 'B(lend)', exp: '相手(you)が私に辞書をわたすので「貸す」の lend です。lend 人 もの の形になっています。' },
      { lv: 2, q: '( )に入る語を選ぼう。She ( ) Chinese very well.', choices: ['says', 'tells', 'speaks', 'talks'], a: 'C(speaks)', exp: '言語を話すときは speak を使います。say Chinese・talk Chinese とは言いません。' },
      { lv: 2, q: '指示どおりに語の形をかえよう。(1) kind の名詞形 (2) danger の形容詞形 (3) careful の副詞形', a: '(1) kindness (2) dangerous (3) carefully', exp: '-ness は名詞、-ous は形容詞、-ly は副詞を作る語尾です。careful は l で終わるので、ly をつけると l が2つ並びます。' },
      { lv: 2, q: '次の説明に合う語を書こう。a person who takes care of sick people in a hospital', a: 'nurse(doctor も可)', exp: '病院で病気の人の世話をする人なので nurse(看護師)が最もよく合います。who 以下が人の説明です。' },
      { lv: 2, q: '下線部の意味を推測しよう。The road was very 【slippery】 because of the ice, so I fell down.', a: 'すべりやすい', exp: '「氷のせいで道が〜だったので、私は転んだ」という前後関係から、「すべりやすい」と推測できます。because of と so が手がかりです。' },
      { lv: 2, q: '( )に入る語を選ぼう。He ( ) me that he was busy.', choices: ['said', 'told', 'spoke', 'talked'], a: 'B(told)', exp: '後ろに me(人)が直接きているので told を使います。said なら He said that he was busy. と人を置きません。' },
      { lv: 2, q: '序数(〜番目)を書こう。(1) twelve (2) twenty (3) nine', a: '(1) twelfth (2) twentieth (3) ninth', exp: 'twelve は ve を f にかえて th、twenty は y を ie にかえて th、nine は e をとって th をつけます。' },
      { lv: 2, q: '反対の意味の語にしよう。(1) happy (2) kind (3) possible', a: '(1) unhappy (2) unkind (3) impossible', exp: 'un- や im- は「〜でない」という反対の意味を作ります。possible は p で始まるので im- がつきます。' },
      { lv: 3, q: '次の説明に合う語を書こう。the season between summer and winter', a: 'fall(autumn)', exp: '夏と冬の間の季節なので秋です。アメリカでは fall、イギリスでは autumn を多く使います。' },
      { lv: 3, q: '下線部に近い意味のものを選ぼう。Tom was so 【exhausted】 after the marathon that he slept for twelve hours.', choices: ['very tired', 'very happy', 'very hungry', 'very angry'], a: 'A(very tired)', exp: 'マラソンのあとに12時間も眠ったことから、「とても疲れた」という意味だと推測できます。so 〜 that … は「とても〜なので…」です。' },
      { lv: 3, q: '( )に入る語を選ぼう。Mr. Lee ( ) about his trip to Kenya for an hour.', choices: ['said', 'told', 'talked', 'spoke to'], a: 'C(talked)', exp: '「〜について話した」は talk about 〜 で表します。said の後ろには言った内容、told と spoke to の後ろには人が必要なので、ここでは合いません。' },
      { lv: 3, q: '( )内の語を適切な形にしよう。The ( win ) of the speech contest got a prize.', a: 'winner', exp: 'the の後ろで「優勝した人」を表す名詞にします。win は n を重ねて er をつけ winner です。' },
      { lv: 3, q: '( )に入る語を選ぼう。Please ( ) at the blackboard.', choices: ['see', 'look', 'watch', 'find'], a: 'B(look)', exp: '「〜を(意識して)見る」で、後ろに at がくるのは look です。see は自然に目に入る、watch は動くものをじっと見るときに使います。' }
    ]
  });

  add('ex_jh3', {
    pat: [
      { name: '名詞を後ろから説明する並べかえ', freq: 'とてもよく出る', when: '語群に分詞(〜ing・過去分詞)、関係代名詞(who・which・that)、to + 原形のどれかがあり、日本語に「〜している…」「〜した…」があるとき。', how: ['日本語の「〜な○○」の○○(中心の名詞)を見つけます。', 'その名詞を先に置き、説明のかたまり(分詞・関係代名詞・to 〜)をすぐ後ろに続けます。', '「名詞 + 説明」全体を1つの主語(目的語)として扱います。', '主語なら、説明のかたまりの後ろに文全体の動詞を置きます。'], ex: { q: '並べかえよう。あそこで歌っている女の子は私の妹です。(singing / girl / is / the / there / my sister).', a: 'The girl singing there is my sister.', exp: '中心の名詞は the girl です。「あそこで歌っている」は2語以上のかたまりなので後ろに置き、The girl singing there で主語を作ります。その後ろに文全体の動詞 is my sister を続けます。' } },
      { name: 'It is 〜 for 人 to …', freq: 'とてもよく出る', when: '語群に it・for・to があり、日本語が「(人)にとって…することは〜だ」のとき。', how: ['文の頭に It is を置きます(it は仮の主語で、本当の主語は to 以下です)。', 'is の後ろに、easy・important などの形容詞を置きます。', '「だれにとって」は for + 人(目的格)で表します。', '最後に to + 動詞の原形 + 残りの語を続けます。'], ex: { q: '並べかえよう。私にとって速く泳ぐことは簡単ではありません。(is / for / to / it / me / not / easy) swim fast.', a: 'It is not easy for me to swim fast.', exp: 'It is not easy で「簡単ではない」を先に言い、for me で「私にとって」を加え、to swim fast で本当の主語(速く泳ぐこと)を示します。for の後ろは目的格 me です。' } },
      { name: '動詞 + 人 + to 〜(want・ask・tell)', freq: 'よく出る', when: '語群に want・ask・tell と to があり、日本語が「(人)に〜してほしい・〜するように頼む・言う」のとき。', how: ['文の主語と動詞(want・ask・tell)を置きます。', '動詞のすぐ後ろに、行動する「人」を目的格で置きます。', 'その後ろに to + 動詞の原形を続けます。', '「〜しないように」なら not to 〜 にします。'], ex: { q: '並べかえよう。私はあなたに手伝ってほしい。(you / want / I / to / help) me.', a: 'I want you to help me.', exp: '「あなたに〜してほしい」は want 人 to 〜 の形です。手伝うのは you なので、want の後ろに you を置き、to help me を続けます。I want to help you. とすると「私があなたを手伝いたい」になり意味がかわります。' } },
      { name: 'make・call などの SVOC', freq: 'よく出る', when: '語群に make・call・name と、名詞と形容詞(または名詞2つ)があるとき。', how: ['主語と動詞を置きます。', '動詞の後ろに「O(人・もの)」を置きます。', 'その後ろに「C(O がどうなるか・O の名前)」を置きます。O = C の関係になっているか確かめます。'], ex: { q: '並べかえよう。その知らせは私たちを幸せにした。(made / the news / happy / us).', a: 'The news made us happy.', exp: 'make O C は「O を C(の状態)にする」です。us = happy(私たちが幸せ)という関係なので、made の後ろに us、その後ろに happy を置きます。make が過去形 made になっている点も見ておきましょう。' } },
      { name: 'too 〜 to … と 〜 enough to …', freq: '難関校で出る', when: '語群に too と to、または enough と to があるとき。', how: ['too + 形容詞 + to 〜 は「あまりに…なので〜できない」です。', '形容詞 + enough to 〜 は「〜するのに十分…」で、enough は形容詞の後ろに置きます。', 'be動詞の後ろにこのかたまりを続けます。'], ex: { q: '並べかえよう。私は疲れすぎて歩けませんでした。(too / to / tired / was / I / walk).', a: 'I was too tired to walk.', exp: 'too tired to walk で「疲れすぎて歩けない」という意味になります。not を使わなくても「できない」という否定の意味をふくむ点がポイントです。too は形容詞 tired の前に置きます。' } }
    ],
    more: [
      { lv: 1, q: '並べかえよう。これは私が昨日買ったかばんです。(is / this / a / I / bought / bag) yesterday.', a: 'This is a bag I bought yesterday.', exp: 'a bag の後ろに「私が昨日買った」を置きます。目的格の関係代名詞が省略された形です。' },
      { lv: 1, q: '並べかえよう。あなたはギターをひけますか。(play / you / can / the guitar)?', a: 'Can you play the guitar?', exp: 'can の疑問文は Can を主語の前に出し、後ろに動詞の原形を続けます。' },
      { lv: 1, q: '並べかえよう。私は先生になりたい。(to / want / I / be / a teacher).', a: 'I want to be a teacher.', exp: 'want to 〜 で「〜したい」です。to の後ろは原形なので be を置きます。' },
      { lv: 1, q: '並べかえよう。ケンはトムより背が高い。(taller / Ken / than / is / Tom).', a: 'Ken is taller than Tom.', exp: '「比較級 + than 〜」で「〜より…」です。主語 Ken の後ろに is taller than Tom と続けます。' },
      { lv: 1, q: '並べかえよう。あなたは今までに沖縄へ行ったことがありますか。(have / been / you / ever / to / Okinawa)?', a: 'Have you ever been to Okinawa?', exp: '経験をたずねる現在完了の疑問文です。Have you ever の後ろに been to Okinawa を置きます。' },
      { lv: 1, q: '並べかえよう。英語は多くの国で話されています。(is / English / in / spoken / many countries).', a: 'English is spoken in many countries.', exp: '受動態「be動詞 + 過去分詞」です。English is spoken の後ろに場所 in many countries を置きます。' },
      { lv: 1, q: '並べかえよう。彼がどこに住んでいるか知っていますか。(you / do / where / know / he / lives)?', a: 'Do you know where he lives?', exp: 'Do you know の後ろに間接疑問を置き、where + 主語 + 動詞の順にします。' },
      { lv: 2, q: '並べかえよう。あなたのノートを私に見せてください。(me / show / your / please / notebook).', a: 'Please show me your notebook.', exp: 'show 人 もの で「人にものを見せる」です。人 me が先、もの your notebook が後になります。' },
      { lv: 2, q: '並べかえよう。私たちにとって英語を勉強することは大切です。(is / for / it / us / important / to / study) English.', a: 'It is important for us to study English.', exp: 'It is 〜 for 人 to … の形です。for の後ろは目的格 us を置きます。' },
      { lv: 2, q: '並べかえよう。私たちはそのネコをタマと呼んでいます。(call / we / Tama / the cat).', a: 'We call the cat Tama.', exp: 'call A B で「A を B と呼ぶ」です。the cat = Tama の関係になるように並べます。' },
      { lv: 2, q: '並べかえよう。あそこで走っている少年は私の兄です。(the / is / running / boy / there / my brother).', a: 'The boy running there is my brother.', exp: 'running there が the boy を後ろから説明します。主語のかたまりの後ろに is my brother を続けます。' },
      { lv: 2, q: '並べかえよう。彼女は私にドアを開けるように頼んだ。(asked / me / she / to / the door / open).', a: 'She asked me to open the door.', exp: 'ask 人 to 〜 で「人に〜するように頼む」です。開けるのは me なので、asked の後ろに me を置きます。' },
      { lv: 2, q: '並べかえよう。私は何をすればよいかわかりません。(what / do / I / know / don\'t / to).', a: 'I don\'t know what to do.', exp: 'what to do で「何をすればよいか」です。I don\'t know の目的語として後ろに置きます。' },
      { lv: 2, q: '並べかえよう。私には大阪に住んでいる友達がいます。(have / a friend / who / I / lives) in Osaka.', a: 'I have a friend who lives in Osaka.', exp: '先行詞 a friend の後ろに、主格の who lives in Osaka を置きます。lives の s は a friend に合わせたものです。' },
      { lv: 2, q: '並べかえよう。この寺はあの寺と同じくらい古い。(as / is / as / this / that one / old / temple).', a: 'This temple is as old as that one.', exp: 'as 〜 as … で「…と同じくらい〜」です。as と as の間にもとの形 old を入れます。' },
      { lv: 3, q: '1語不要な語があります。並べかえよう。その知らせは私を悲しくさせた。(made / me / the / sad / news / was).', a: 'The news made me sad.(不要:was)', exp: 'make O C の形で The news made me sad. です。made が文の動詞なので、be動詞 was は不要になります。' },
      { lv: 3, q: '並べかえよう。そのスープは熱すぎて飲めなかった。(too / to / was / hot / the soup / eat).', a: 'The soup was too hot to eat.', exp: 'too 〜 to … で「あまりに〜で…できない」です。スープは「飲む」ものですが、英語では eat soup と言うことが多いです。' },
      { lv: 3, q: '並べかえよう。彼は車を運転できる年れいです。(old / enough / is / to / he / drive) a car.', a: 'He is old enough to drive a car.', exp: '形容詞 + enough to 〜 で「〜するのに十分…」です。enough は形容詞 old の後ろに置きます。' },
      { lv: 3, q: '並べかえよう。私はおばがくれた本が気に入っています。(the / I / book / gave / me / which / my aunt / like).', a: 'I like the book which my aunt gave me.', exp: '文の中心は I like the book です。the book の後ろに目的格の which my aunt gave me を置きます。' },
      { lv: 3, q: '並べかえよう。博物館への行き方を教えていただけますか。(tell / you / me / could / to / how / get) to the museum?', a: 'Could you tell me how to get to the museum?', exp: 'Could you tell me 〜? の後ろに how to get(どうやって行けばよいか)を置きます。tell 人 もの の形です。' }
    ]
  });

  add('e_talk', {
    pat: [
      { name: '依頼への応じ方(Could you 〜?)', freq: 'とてもよく出る', when: '対話の中で Could you 〜? / Will you 〜? のあとの応答が空所になっているとき。', how: ['相手が自分に「〜してくれますか」と頼んでいるかを確かめます。', '引き受けるなら Sure. / Of course. / No problem. を選びます。', '断るなら I\'m sorry, but 〜. と理由を続けます。', 'Yes, I could. のように could で答えるのはふつうではない点に注意します。'], ex: { q: '( )に入るものを選ぼう。— Could you carry this box with me? — ( )  ア Sure.  イ Yes, I could.  ウ You\'re welcome.  エ Here you are.', a: 'ア Sure.', exp: 'Could you 〜? はていねいな依頼です。引き受けるときは Sure.(いいですよ)が自然です。could は「ていねいさ」を表しているだけなので、Yes, I could. とは答えません。' } },
      { name: '提案・誘いへの応じ方', freq: 'とてもよく出る', when: 'Shall we 〜? / How about 〜? / Why don\'t we 〜? のあとの応答を選ぶ問題。', how: ['相手が「いっしょに〜しよう」と誘っているかを確かめます。', 'Shall we 〜? には Yes, let\'s. / No, let\'s not. で答えます。', 'How about 〜? / Why don\'t we 〜? には That\'s a good idea. / Sounds good. などで答えます。', '断るときは Sorry, I can\'t. のあとに理由を続けます。'], ex: { q: '( )に入るものを選ぼう。— Shall we play tennis after school? — ( )  ア Yes, let\'s.  イ Yes, I shall.  ウ No, I don\'t.  エ You\'re welcome.', a: 'ア Yes, let\'s.', exp: 'Shall we 〜? は「(いっしょに)〜しましょうか」という誘いです。Let\'s 〜. と同じような意味なので、Yes, let\'s. と答えます。Yes, we shall. はほとんど使われません。' } },
      { name: '電話の決まり文句', freq: 'よく出る', when: '対話の場面が電話(Hello. This is 〜. / May I speak to 〜?)のとき。', how: ['名乗るときは This is 〜. を使います(I am 〜. は使いません)。', '「〜さんをお願いします」は May I speak to 〜? です。', '本人が出たときは Speaking. と答えます。', '「お待ちください」は Hold on, please.、「伝言をうかがいましょうか」は Shall I take a message? です。'], ex: { q: '( )に入るものを選ぼう。A: Hello. May I speak to Emma? B: ( ) Who\'s calling, please?  ア Speaking.  イ Hold on, please.  ウ You have the wrong number.  エ I\'m Emma\'s.', a: 'ア Speaking.', exp: '「エマさんをお願いします」に対し、本人が出たときは Speaking.(私です)と答えます。家族が出て取りつぐなら Hold on, please. です。後ろの Who\'s calling? は「どちらさまですか」です。' } },
      { name: '否定の疑問文への Yes・No', freq: '難関校で出る', when: 'Don\'t you 〜? / Aren\'t you 〜? / Didn\'t you 〜? などに答える問題。', how: ['質問の形(否定かどうか)ではなく、答えの内容だけを考えます。', '答えの内容が肯定(〜する・〜だ)なら Yes にします。', '答えの内容が否定(〜しない・〜でない)なら No にします。', '日本語の「はい・いいえ」と逆になることがあるので注意します。'], ex: { q: '( )に Yes か No を入れよう。— Don\'t you like milk? — ( ), I don\'t. I don\'t like it.', a: 'No', exp: '答えの内容は「好きではない」という否定なので No を使います。日本語では「はい、好きではありません」となりますが、英語では後ろが否定なら必ず No です。' } }
    ],
    more: [
      { lv: 1, q: '( )に入るものを選ぼう。— Thank you very much. — ( )', choices: ['You\'re welcome.', 'Yes, please.', 'No, thank you.', 'I\'m fine.'], a: 'A(You\'re welcome.)', exp: 'お礼を言われたときは You\'re welcome.(どういたしまして)と答えます。' },
      { lv: 1, q: '( )に入るものを選ぼう。— How are you? — ( )', choices: ['I\'m fine, thank you.', 'I\'m Ken.', 'Yes, I am.', 'I\'m twelve.'], a: 'A(I\'m fine, thank you.)', exp: 'How are you? は「元気ですか」という調子をたずねるあいさつです。名前や年れいを答えるのではありません。' },
      { lv: 1, q: 'ものをわたすときの Here you are. の意味を書こう。', a: 'はい、どうぞ。', exp: '相手に何かを手わたすときの決まった言い方です。Here it is. とも言います。' },
      { lv: 1, q: 'May I help you? がよく使われる場面を選ぼう。', choices: ['店員が客に話しかけるとき', '電話を切るとき', '道を教えてもらったとき', '初めて会った人にあいさつするとき'], a: 'A(店員が客に話しかけるとき)', exp: 'May I help you? は「いらっしゃいませ・何かおさがしですか」という意味で、店員が客に声をかけるときによく使います。' },
      { lv: 1, q: '( )に入るものを選ぼう。— I\'m sorry I\'m late. — ( )', choices: ['That\'s all right.', 'You\'re welcome.', 'Nice to meet you.', 'Me, too.'], a: 'A(That\'s all right.)', exp: 'あやまられたときは That\'s all right.(いいですよ)や No problem. と答えます。' },
      { lv: 1, q: '( )に入るものを選ぼう。— Would you like some cookies? — ( )', choices: ['Yes, please.', 'Yes, I would like.', 'Yes, I do.', 'Here you are.'], a: 'A(Yes, please.)', exp: 'Would you like 〜? は「〜はいかがですか」という申し出です。受けるときは Yes, please.、断るときは No, thank you. です。' },
      { lv: 1, q: '( )に入るものを選ぼう。— Nice to meet you. — ( )', choices: ['Nice to meet you, too.', 'You\'re welcome.', 'Yes, I do.', 'See you.'], a: 'A(Nice to meet you, too.)', exp: '初めて会ったときのあいさつには、同じ言葉に too をつけて返します。' },
      { lv: 2, q: '電話で使う Can I leave a message? の意味を書こう。', a: '伝言をお願いできますか。', exp: '相手が不在のときに、電話をかけた側が言う表現です。受けた側が言うなら Shall I take a message?(伝言をうかがいましょうか)です。' },
      { lv: 2, q: '( )に入るものを選ぼう。— How about going to the zoo on Sunday? — ( ) I love animals.', choices: ['That\'s a good idea.', 'No, I\'m not.', 'You\'re welcome.', 'I\'m sorry to hear that.'], a: 'A(That\'s a good idea.)', exp: '後ろの「動物が大好き」から賛成していることがわかります。提案への賛成は That\'s a good idea. です。' },
      { lv: 2, q: '( )に入るものを選ぼう。— Excuse me. Where is the post office? — ( ) I\'m a stranger here.', choices: ['I\'m sorry, I don\'t know.', 'Here you are.', 'Go straight.', 'Of course.'], a: 'A(I\'m sorry, I don\'t know.)', exp: 'I\'m a stranger here.(このあたりは不案内です)から、道を知らないとわかります。' },
      { lv: 2, q: '洋服店で使う Can I try it on? の意味を書こう。', a: '試着してもいいですか。', exp: 'try on は「試しに着てみる」という意味です。it のような代名詞は try と on の間に置きます。' },
      { lv: 2, q: '( )に入るものを選ぼう。— I have a bad cold. — ( )', choices: ['That\'s too bad.', 'Good for you.', 'You\'re welcome.', 'Sounds fun.'], a: 'A(That\'s too bad.)', exp: '相手のよくない知らせには That\'s too bad.(それはお気の毒に)や I\'m sorry to hear that. と答えます。' },
      { lv: 2, q: 'A: I like soccer. に「私もです」と答えよう(2通り)。', a: 'Me, too. / So do I.', exp: '肯定の文に「私も」と言うときは Me, too. や So do I. を使います。So do I. の do は like のくり返しをさけた語です。' },
      { lv: 2, q: 'A: I don\'t like coffee. に「私も好きではありません」と答えよう(2通り)。', a: 'Me, neither. / Neither do I.', exp: '否定の文に「私も〜ない」と言うときは too ではなく neither を使います。× Me, too. はここでは使いません。' },
      { lv: 2, q: 'Why don\'t we have lunch together? の意味を書こう。', a: 'いっしょにお昼を食べませんか。', exp: 'Why don\'t we 〜? は「なぜ〜しないのか」ではなく、「(いっしょに)〜しませんか」という誘いの決まった言い方です。' },
      { lv: 3, q: '( )に Yes か No を入れよう。— Aren\'t you tired? — ( ), I am. I walked for three hours.', a: 'Yes', exp: '答えの内容は「疲れている」という肯定なので Yes を使います。日本語では「いいえ、疲れています」となる点に注意しましょう。' },
      { lv: 3, q: '( )に Yes か No を入れよう。— Didn\'t you go to school yesterday? — ( ), I didn\'t. I was sick.', a: 'No', exp: '答えの内容は「行かなかった」という否定なので No を使います。後ろの I didn\'t. と Yes・No を一致させます。' },
      { lv: 3, q: '( )に入るものを選ぼう。A: Let\'s meet at the station at 3:15. B: ( ) A: At 3:15. B: OK.', choices: ['Sorry? What time?', 'Sure, at three.', 'How about you?', 'That\'s right.'], a: 'A(Sorry? What time?)', exp: 'A が At 3:15. と時刻をくり返していることから、B は時刻を聞き返したとわかります。Sorry? や Pardon? は聞き返しの表現です。' },
      { lv: 3, q: '( )に入るものを選ぼう。A: Can I speak to Ken? B: Sorry, he isn\'t home now. ( ) A: Yes, please. Please tell him to call me.', choices: ['Shall I take a message?', 'Can I leave a message?', 'Who\'s calling?', 'Hold on, please.'], a: 'A(Shall I take a message?)', exp: 'A が「彼に電話するよう伝えて」と伝言を頼んでいるので、B は「伝言をうかがいましょうか」とたずねたとわかります。leave a message はかけた側が言う表現です。' },
      { lv: 3, q: '道案内で「2つ目の角を右に曲がってください。左側に見えますよ」を英語にしよう。', a: 'Turn right at the second corner. You\'ll see it on your left.', exp: '「〜で曲がる」は turn right(left)at 〜 です。「左側に」は on your left と表します。' }
    ]
  });

  add('e_prep', {
    pat: [
      { name: '時を表す at・on・in', freq: 'とてもよく出る', when: '時刻・曜日・日付・月・年・季節の前の前置詞を選ぶ問題。', how: ['時刻などの「点」には at を使います(at seven・at noon)。', '曜日・日付など「特定の日」には on を使います(on Monday・on May 5)。', '月・年・季節など「幅のある期間」には in を使います(in April・in 2010・in summer)。', '「特定の日の朝」は on the morning of 〜 のように on にかわる点に注意します。'], ex: { q: '( )に at・on・in のどれかを入れよう。I was born ( ) May 5.', a: 'on', exp: 'May 5(5月5日)は特定の日付なので on を使います。May(5月)だけなら月なので in May です。日付がつくかどうかで前置詞がかわります。' } },
      { name: 'by(〜までに)と until(〜までずっと)', freq: 'よく出る', when: '「〜までに」「〜まで」を表す語を選ぶ問題。', how: ['動作がその時までに1回終わればよい(締め切り)なら by を使います。', '動作や状態がその時までずっと続くなら until(till)を使います。', '動詞が finish・come・return なら by、wait・stay・sleep なら until になりやすいです。'], ex: { q: '( )に by か until を入れよう。Please finish this report ( ) Friday.', a: 'by', exp: 'レポートを「金曜日までに」仕上げればよいので、締め切りを表す by を使います。「金曜日までずっと待つ」なら until Friday です。' } },
      { name: 'for(〜の間:長さ)と during(〜の間:特定の期間)', freq: 'よく出る', when: '「〜の間」を表す語を選ぶ問題。', how: ['後ろが数字のついた長さ(three days・two weeks)なら for を使います。', '後ろが特定の期間の名前(the summer vacation・my stay)なら during を使います。', '後ろに「主語 + 動詞」が続くなら接続詞 while を使います。'], ex: { q: '( )に for か during を入れよう。I stayed with my grandparents ( ) the winter vacation.', a: 'during', exp: 'the winter vacation(冬休み)は特定の期間の名前なので during を使います。「10日間」のような長さなら for ten days です。' } },
      { name: '人称代名詞の変化(主格・所有格・目的格・所有代名詞)', freq: 'とてもよく出る', when: '代名詞の形をかえて空所に入れる問題や、書きかえ問題。', how: ['空所が主語なら主格(I・he・they)を使います。', '名詞の前なら所有格(my・his・their)を使います。', '動詞や前置詞の後ろなら目的格(me・him・them)を使います。', '「〜のもの」と1語で言うなら所有代名詞(mine・his・theirs)を使います。'], ex: { q: 'ほぼ同じ意味になるように( )に入れよう。This is Ken\'s bag. = This bag is ( ).', a: 'his', exp: '「ケンのかばん」を「このかばんは彼のものです」と言いかえます。「彼のもの」は所有代名詞 his です。his は所有格と所有代名詞が同じ形なので、位置で役目を判断します。' } },
      { name: '前置詞のいらない動詞', freq: '難関校で出る', when: '誤文訂正や空所補充で、visit・enter・reach・discuss・marry の後ろに前置詞があるとき。', how: ['その動詞が後ろに直接名詞をとる動詞かどうかを思い出します。', 'visit・enter・reach・discuss・marry・approach は前置詞なしで目的語をとります。', '同じ意味の go to・arrive at・talk about とまぜないように注意します。'], ex: { q: '誤りを直そう。We reached at the station at noon.', a: 'We reached the station at noon.', exp: 'reach(〜に着く)は後ろに直接場所をとる動詞なので at はいりません。同じ意味の arrive を使うなら arrived at the station と at が必要になります。' } }
    ],
    more: [
      { lv: 1, q: '( )に入る語を選ぼう。School starts ( ) April in Japan.', choices: ['at', 'on', 'in', 'by'], a: 'C(in)', exp: 'April(4月)は月なので in を使います。月・年・季節のような幅のある期間には in を使います。' },
      { lv: 1, q: '( )に入る語を選ぼう。Let\'s meet ( ) ten o\'clock.', choices: ['at', 'on', 'in', 'for'], a: 'A(at)', exp: '時刻は「点」なので at を使います。曜日なら on Monday、月なら in April のように前置詞がかわります。' },
      { lv: 1, q: '( )に入る語を選ぼう。The cat is ( ) the desk.(机の下に)', choices: ['on', 'in', 'under', 'by'], a: 'C(under)', exp: '「〜の下に」は under です。on は「〜の上に(接して)」、by は「〜のそばに」です。' },
      { lv: 1, q: '( )に適切な代名詞を入れよう。— Do you know Mr. Sato? — Yes, I know ( ) well.', a: 'him', exp: 'Mr. Sato は男性で、動詞 know の後ろにくるので目的格 him にします。' },
      { lv: 1, q: '指示どおりの形を書こう。(1) I の所有格 (2) they の目的格 (3) she の所有代名詞', a: '(1) my (2) them (3) hers', exp: '所有格は名詞の前、目的格は動詞・前置詞の後ろ、所有代名詞は「〜のもの」を1語で表します。' },
      { lv: 1, q: '( )に入る語を選ぼう。My father goes to work ( ) train.', choices: ['in', 'by', 'on', 'with'], a: 'B(by)', exp: '交通手段は by + 乗り物で表します。このとき train に a や the はつけません。' },
      { lv: 1, q: '( )に入る語を選ぼう。There is a picture ( ) the wall.', choices: ['in', 'on', 'at', 'under'], a: 'B(on)', exp: 'on は上にあるときだけでなく、かべなどの面に「接している」ときにも使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。I have been in this room ( ) two hours.', choices: ['for', 'during', 'since', 'in'], a: 'A(for)', exp: 'two hours(2時間)は数字のついた長さなので for を使います。' },
      { lv: 2, q: '( )に入る語を選ぼう。Please wait here ( ) five o\'clock.', choices: ['by', 'until', 'in', 'for'], a: 'B(until)', exp: '「5時までずっと待つ」なので、継続を表す until を使います。by は「〜までに」と締め切りを表します。' },
      { lv: 2, q: '( )に入る語を選ぼう。We visited many places ( ) our stay in London.', choices: ['for', 'during', 'while', 'since'], a: 'B(during)', exp: 'our stay(滞在)は特定の期間の名前なので during です。while の後ろには主語と動詞が必要です。' },
      { lv: 2, q: '( )に入る語を選ぼう。He was born ( ) the morning of July 7.', choices: ['in', 'on', 'at', 'by'], a: 'B(on)', exp: 'ただの in the morning ではなく、「7月7日の朝」と特定の日がつくので on を使います。' },
      { lv: 2, q: '( )に適切な語を入れよう。This pen is not mine. It\'s ( ).(ユミのもの)', a: 'Yumi\'s', exp: '人の名前で「〜のもの」を表すときは、名前に \'s をつけます。後ろに pen を置かなくても「ユミのもの」の意味になります。' },
      { lv: 2, q: '誤りを直そう。Let\'s discuss about the plan.', a: 'Let\'s discuss the plan.', exp: 'discuss(〜について話し合う)は「について」の意味をふくむので about はいりません。talk about the plan なら about が必要です。' },
      { lv: 2, q: '( )に入る語を選ぼう。My house is ( ) the school and the park.', choices: ['between', 'among', 'across', 'along'], a: 'A(between)', exp: 'between A and B で「A と B の間に」です。2つのものの間には between を使います。' },
      { lv: 2, q: '「私は窓のそばにすわりました」を英語にしよう。', a: 'I sat by the window.', exp: '「〜のそばに」は by(または near)で表します。sit の過去形は sat です。' },
      { lv: 3, q: '( )に入るものを選ぼう。Ken arrived ( ) Tokyo in the afternoon, and then he arrived ( ) the hotel.', choices: ['in / at', 'at / in', 'in / in', 'at / at'], a: 'A(in / at)', exp: 'arrive は、都市や国のような広い場所には in、建物や駅のような1地点には at を使います。' },
      { lv: 3, q: '( )に入る語を選ぼう。She is popular ( ) the students in her class.', choices: ['between', 'among', 'during', 'across'], a: 'B(among)', exp: '3人以上の集団の中では among(〜の間で)を使います。2つのものの間なら between です。' },
      { lv: 3, q: '「彼らの家は私たちの家より大きい」を英語にしよう。', a: 'Their house is bigger than ours.', exp: '「私たちの家」は our house ですが、house のくり返しをさけて所有代名詞 ours を使います。' },
      { lv: 3, q: '誤りを直そう。I\'ll call you in Monday morning.', a: 'I\'ll call you on Monday morning.', exp: 'morning だけなら in the morning ですが、Monday がついて特定の日の朝になると on を使います。' },
      { lv: 3, q: '( )に入る語を選ぼう。He went out ( ) an umbrella, so he got wet.', choices: ['with', 'without', 'by', 'for'], a: 'B(without)', exp: '後半の「ぬれた」から、傘を「持たずに」出かけたとわかります。without は「〜なしで」です。' }
    ]
  });

  add('e_read', {
    pat: [
      { name: '指示語(it・this・they)が指すものを答える', freq: 'とてもよく出る', when: '「下線部の it(this・they)が指すものを答えなさい」という設問。', how: ['指示語より前の文に答えがあると考え、すぐ前の文から順にさかのぼります。', 'it は単数のもの、they・them は複数、this は前の文の内容全体を指すことが多いです。', '見つけた語句を指示語の場所に入れて読み、意味が通るか確かめます。', '答えるときは、日本語なら「〜こと」とまとめます。'], ex: { q: '下線部 this が指す内容を日本語で答えよう。My brother gets up at five and runs in the park every day. 【This】 makes him healthy.', a: '兄が毎日5時に起きて公園で走ること', exp: 'this は前の文の内容全体を指しています。「これが彼を健康にしている」に当てはめると、「毎日5時に起きて公園で走ること」で意味が通ります。答えは「〜こと」で終えます。' } },
      { name: 'つなぎことばで話の向きを読む', freq: 'とてもよく出る', when: '文と文の間の空所に、However・For example・So などのつなぎことばを入れる問題や、つなぎことばの後ろの内容を選ぶ問題。', how: ['空所の前と後ろの文を読み、内容の関係を考えます。', '反対の向き(よい ↔ よくない)なら However・But を選びます。', '前の内容の具体例なら For example を選びます。', '前の内容の結果なら So を選びます。'], ex: { q: '( )に入るものを選ぼう。Many people think cats don\'t like water. ( ), some cats enjoy swimming.  ア However  イ For example  ウ So  エ Also', a: 'ア However', exp: '前の文は「ネコは水が好きではないと考えられている」、後ろは「泳ぐのが好きなネコもいる」と反対の向きです。反対の内容をつなぐのは However(しかし)です。' } },
      { name: '内容一致は「言いかえ」を見抜く', freq: 'とてもよく出る', when: '「本文の内容に合うものを選びなさい」という設問。', how: ['選択肢の主語・動詞・数字を本文で探します。', '本文の表現がそのまま使われていない選択肢でも、同じ意味の言いかえ(couldn\'t = was not able to など)なら正解になりえます。', '本文の語がそのまま入っていても、数字・時・否定が少しかわっていないか確かめます。', '書かれていないこと(推測しすぎ)を言っている選択肢は選びません。'], ex: { q: '本文に合うものを選ぼう。Rina started playing the violin when she was eight. She is fourteen now.  ア Rina started the violin at fourteen.  イ Rina has played the violin for about six years.  ウ Rina stopped playing the violin.  エ Rina is eight years old.', a: 'イ', exp: '8才で始めて今14才なので、約6年間続けていることになります。本文には for six years という言葉はありませんが、イは本文の内容を言いかえたものです。アとエは数字の入れかえです。' } },
      { name: '事実と意見を区別する', freq: 'よく出る', when: '「筆者の意見を表しているものを選びなさい」「筆者が最も伝えたいこと」を問う設問。', how: ['調べれば正しいかどうかが確かめられる文は「事実」です。', 'I think・I believe・should・best など、筆者の考えや評価をふくむ文は「意見」です。', '筆者の主張は、意見の文(特に最初か最後)にまとまっていることが多いです。'], ex: { q: '意見を表している文を選ぼう。  ア Mt. Fuji is 3,776 meters high.  イ Many people climb Mt. Fuji every summer.  ウ Mt. Fuji is the most beautiful mountain in the world.  エ Mt. Fuji is in Shizuoka and Yamanashi.', a: 'ウ', exp: 'ウの「世界でいちばん美しい」は人によって感じ方がちがう評価なので意見です。ア・イ・エは高さや場所など、調べて確かめられる事実です。' } }
    ],
    more: [
      { lv: 1, q: '下線部 It が指すものを答えよう。Ken has a dog. 【It】 is white and very big.', a: 'ケンの犬(Ken\'s dog)', exp: 'It はすぐ前の文の単数の名詞 a dog を指しています。「それは白くてとても大きい」で意味が通ります。' },
      { lv: 1, q: '筆者が夏を好きな理由を日本語で答えよう。I like summer because I can swim in the sea.', a: '海で泳げるから。', exp: 'because の後ろが理由です。I can swim in the sea を日本語にします。' },
      { lv: 1, q: '( )に入るものを選ぼう。Mai got up late this morning. ( ), she was late for school.', choices: ['So', 'But', 'For example', 'However'], a: 'A(So)', exp: '「寝ぼうした」が原因、「学校に遅れた」が結果なので So(だから)が合います。' },
      { lv: 1, q: '質問に英語で答えよう。Tom went to the library and read some books about space. — What did Tom read about?', a: 'He read about space.', exp: '本文の books about space(宇宙についての本)から答えます。Tom は he にかえて答えます。' },
      { lv: 1, q: '( )に入るものを選ぼう。I like fruits. ( ), I like apples and grapes.', choices: ['For example', 'But', 'So', 'However'], a: 'A(For example)', exp: 'apples と grapes は fruits(果物)の具体例なので、For example(たとえば)でつなぎます。' },
      { lv: 1, q: '質問に英語で答えよう。Yuki usually walks to school, but today she went by bus because it was raining. — How did Yuki go to school today?', a: 'She went by bus.(By bus.)', exp: 'usually(ふだん)は歩きですが、today(今日)はバスです。質問は today についてなので、時を表す語に注意して答えます。' },
      { lv: 1, q: '筆者の家族は何人か答えよう。There are four people in my family: my father, my mother, my sister and me.', a: '4人', exp: 'four people と書かれているうえ、コロンの後ろに父・母・姉(妹)・私の4人が並べられています。' },
      { lv: 2, q: '下線部 they が指すものを答えよう。Many people use plastic bags. However, 【they】 are bad for the sea.', a: 'ビニール袋(plastic bags)', exp: 'they は複数のものを指します。前の文の複数名詞のうち、「海に悪い」で意味が通るのは plastic bags です。people ではありません。' },
      { lv: 2, q: '本文に合うものを選ぼう。Aya started learning the piano when she was six. Now she is fifteen and practices every day.', choices: ['Aya started the piano at fifteen.', 'Aya has played the piano for about nine years.', 'Aya doesn\'t practice now.', 'Aya is six years old.'], a: 'B(Aya has played the piano for about nine years.)', exp: '6才で始めて今15才なので、約9年間続けています。本文の内容を現在完了で言いかえた B が合います。' },
      { lv: 2, q: 'Sam was not able to sleep last night. と同じ内容のものを選ぼう。', choices: ['Sam slept well.', 'Sam couldn\'t sleep last night.', 'Sam went to bed early.', 'Sam didn\'t go to bed.'], a: 'B(Sam couldn\'t sleep last night.)', exp: 'was not able to 〜 は couldn\'t 〜 と同じ意味です。言いかえを見抜くことが内容一致のポイントです。' },
      { lv: 2, q: '意見を表している文を選ぼう。', choices: ['Tokyo is the capital of Japan.', 'Kyoto has many old temples.', 'Kyoto is the most wonderful city to visit.', 'Kyoto is in the Kansai region.'], a: 'C(Kyoto is the most wonderful city to visit.)', exp: '「いちばんすばらしい」は人によって考えがちがう評価なので意見です。ほかは確かめられる事実です。' },
      { lv: 2, q: '( )に入るものを選ぼう。Smartphones are very useful. However, ( ).', choices: ['we can use them anywhere', 'using them too much is not good for our health', 'they have many useful apps', 'many people have them'], a: 'B(using them too much is not good for our health)', exp: 'However(しかし)の後ろには、前の「便利だ」と反対の向きの内容がきます。よくない面を言っている B が合います。' },
      { lv: 2, q: 'この段落の主題を選ぼう。Breakfast is important. It gives us energy for the morning. Students who eat breakfast can study better.', choices: ['朝食の大切さ', '昼食のメニュー', '勉強の方法', '朝早く起きること'], a: 'A(朝食の大切さ)', exp: '最初の文 Breakfast is important. が主題で、後ろの2文はその理由の説明になっています。英語の段落は最初に主題がくることが多いです。' },
      { lv: 2, q: '質問に英語で答えよう。I stayed home yesterday because I had a fever. — Why did the writer stay home yesterday?', a: 'Because he(she) had a fever.', exp: 'Why の質問には Because 〜 で理由を答えます。本文の because の後ろを使い、I を筆者にあたる he(she)にかえます。' },
      { lv: 2, q: 'バスの時刻表(8:10・8:40・9:10 発)。駅までは15分かかります。9時までに駅に着くには、遅くとも何時発のバスに乗ればよいか答えよう。', a: '8時40分発', exp: '8:40 発なら 8:55 に着くので間に合います。9:10 発では間に合いません。資料つきの問題は計算して確かめましょう。' },
      { lv: 3, q: '要約文の( )に入る1語を本文から書こう。本文:In the past, people in the town threw away a lot of garbage. Then students started a recycling project. Now the town has less garbage. 要約:Thanks to the students\' ( ) project, the town has less garbage now.', a: 'recycling', exp: 'ごみが減ったのは生徒が始めたリサイクル計画のおかげです。本文の a recycling project から1語をぬき出します。' },
      { lv: 3, q: '筆者の主張を選ぼう。Some people say that reading books is old-fashioned. I don\'t think so. Books let us experience many different lives. I believe everyone should read more books.', choices: ['本を読むのは古くさい', 'みんながもっと本を読むべきだ', '本は値段が高い', '映画のほうが本よりよい'], a: 'B(みんながもっと本を読むべきだ)', exp: '最初の文は他の人の意見で、筆者は I don\'t think so. と反対しています。主張は最後の I believe 〜 の文にまとまっています。' },
      { lv: 3, q: '下線部 this が指す内容を日本語で答えよう。My grandmother grows vegetables in her garden. She says 【this】 is the happiest time of her day.', a: '(祖母が)庭で野菜を育てること', exp: 'this は前の文の内容全体を指します。「これが1日でいちばん幸せな時間だ」に当てはめると、野菜を育てることで意味が通ります。' },
      { lv: 3, q: '本文に合うものを選ぼう。Lisa is from Canada. She came to Japan two years ago. At first, she couldn\'t read kanji, but now she can read about 500.', choices: ['Lisa has been in Japan for two years.', 'Lisa could read kanji when she came to Japan.', 'Lisa can read about 2,000 kanji.', 'Lisa is going back to Canada next year.'], a: 'A(Lisa has been in Japan for two years.)', exp: '2年前に来日したので、日本に2年間いることになります。B は At first, she couldn\'t と反対、C は数字がちがい、D は書かれていません。' },
      { lv: 3, q: '本文の内容に合うものを選ぼう。The festival is popular not only with children but also with adults.', choices: ['Only children enjoy the festival.', 'Both children and adults like the festival.', 'Adults don\'t like the festival.', 'The festival is new.'], a: 'B(Both children and adults like the festival.)', exp: 'not only A but also B は「A だけでなく B も」なので、子どもにも大人にも人気があるという意味です。both A and B で言いかえた B が合います。' }
    ]
  });

  add('e_write', {
    pat: [
      { name: '条件(語数・文数・内容)を守る', freq: 'とてもよく出る', when: '「〜語以上で」「2文で」「理由を2つ書きなさい」など、条件が問題文に書かれている英作文。', how: ['書き始める前に、条件(語数・文数・ふくめる内容・使う語)に線を引きます。', '条件に合わせて、何文で何を書くかを先に決めます。', '書き終えたら語数を数えます(短縮形は1語、コンマやピリオドは数えません)。', '条件を1つでも落とすと大きく減点されることを意識します。'], ex: { q: '「あなたの好きな季節とその理由を1つ、10語以上の英語で書きなさい」に答えよう。', a: '(例)I like spring the best because I can see beautiful cherry blossoms.', exp: '好きな季節(spring)と理由(because 〜)の2つの条件をふくめています。語数は I・like・spring・the・best・because・I・can・see・beautiful・cherry・blossoms の12語で、10語以上の条件を満たしています。' } },
      { name: '意見文は「意見 → 理由 → まとめ」の型', freq: 'とてもよく出る', when: '「〜に賛成か反対か」「AとBのどちらがよいか」を理由とともに書く問題。', how: ['最初の1文で、自分の立場をはっきり書きます(I think 〜. / I agree.)。', 'First, 〜. Second, 〜. のように理由を順に書きます。', '理由には具体例を1つ加えると説得力が増します。', '最後に So, 〜. で意見をもう一度まとめます(語数に余裕があれば)。'], ex: { q: '「中学生は毎日日記を書くべきか」について、賛成の立場で、理由を1つふくめて2文で書こう。', a: '(例)I think junior high school students should write a diary every day. It helps them remember what they learned.', exp: '1文目で意見(賛成)をはっきり書き、2文目で理由を書いています。It は「日記を書くこと」を指し、what they learned(学んだこと)のように知っている表現で具体的にしています。' } },
      { name: '日本語を「書ける英語」に言いかえる', freq: 'よく出る', when: '和文英訳で、日本語の言い方をそのまま英語にしにくいとき(「〜が上手だ」「〜が苦手だ」など)。', how: ['日本語の意味を「だれが・どうする」の形に言いかえます。', '自分が確実に使える文型(be good at 〜ing / can 〜 well など)にあてはめます。', '難しい単語を知らなければ、やさしい語の組み合わせで表します。', '書いた英文の主語と動詞がそろっているかを確かめます。'], ex: { q: '「私の父は料理が上手です」を英語にしよう。', a: 'My father is good at cooking.(My father cooks well. / My father can cook well.)', exp: '「料理が上手」は「料理をするのが得意だ」と言いかえて be good at cooking と表せます。「上手に料理する」と考えれば cooks well でも表せます。主語が3人称単数なので cooks の s に注意します。' } },
      { name: '見直しでねらう3つのミス', freq: 'よく出る', when: '英作文を書き終えたあとの見直しや、誤文訂正の問題。', how: ['主語が3人称単数で現在の文なら、動詞に s がついているか確かめます。', '過去のことを書いた文の動詞が、すべて過去形になっているか確かめます。', '名詞の数(a・複数形)と、There is / are の使い分けを確かめます。'], ex: { q: '誤りを1か所直そう。Last Sunday I went to the zoo with my family and we see many animals.', a: 'see → saw', exp: 'Last Sunday(この前の日曜日)のことなので、後半の動詞も過去形にする必要があります。and の後ろの文で時制をうっかりもどしてしまうのは、英作文で最も多いミスの一つです。' } }
    ],
    more: [
      { lv: 1, q: '「私は毎朝7時に朝ごはんを食べます」を英語にしよう。', a: 'I eat(have) breakfast at seven every morning.', exp: '「朝ごはんを食べる」は eat(have)breakfast です。breakfast には a をつけません。時刻は at seven です。' },
      { lv: 1, q: '「これは私のお気に入りの本です」を英語にしよう。', a: 'This is my favorite book.', exp: '「お気に入りの」は favorite で、名詞の前に置きます。my があるので a はつけません。' },
      { lv: 1, q: '誤りを直そう。She play tennis every day.', a: 'She plays tennis every day.', exp: '主語 she は3人称単数で、every day があるので現在の文です。play に s をつけます。' },
      { lv: 1, q: '「私は夏が好きです。泳げるからです」を because を使って1文の英語にしよう。', a: 'I like summer because I can swim.', exp: 'because の後ろに理由の文(I can swim)を続けます。because だけの文を独立させないようにします。' },
      { lv: 1, q: '誤りを直そう。I went to Tokyo last week, and I visit Asakusa.', a: 'I went to Tokyo last week, and I visited Asakusa.', exp: 'last week の話なので、and の後ろの動詞も過去形 visited にそろえます。' },
      { lv: 1, q: '「あなたの趣味は何ですか」を英語にしよう。', a: 'What is your hobby?', exp: '「何ですか」は What is 〜? でたずねます。hobby は「趣味」です。' },
      { lv: 1, q: '「私には兄が2人います」を英語にしよう。', a: 'I have two brothers.(I have two older brothers.)', exp: '「〜がいる」は have で表せます。2人なので brothers と複数形にします。年上をはっきり言うなら older をつけます。' },
      { lv: 2, q: '「彼女は料理をするのが上手です」を英語にしよう。', a: 'She is good at cooking.(She cooks well.)', exp: 'be good at 〜ing で「〜するのが得意だ」です。at の後ろは動名詞 cooking にします。' },
      { lv: 2, q: '「私は、中学生はスマートフォンを持つべきだと思います」を英語にしよう。', a: 'I think (that) junior high school students should have smartphones.', exp: 'I think の後ろに意見の文を続けます。「〜するべきだ」は should + 原形です。' },
      { lv: 2, q: '誤りを直そう。There is many students in the gym.', a: 'There are many students in the gym.', exp: 'There is / are の後ろの名詞 many students が複数なので、are を使います。' },
      { lv: 2, q: '理由を2つ順に述べるときの書き出しとして、最も適切な組み合わせを選ぼう。', choices: ['First, / Second,', 'But, / So,', 'However, / Because,', 'Then / Yesterday'], a: 'A(First, / Second,)', exp: '理由を順番に並べるときは First,(第一に)と Second,(第二に)を使うと、読み手に構成が伝わります。' },
      { lv: 2, q: '「その知らせを聞いて、私はうれしかった」を英語にしよう。', a: 'I was happy to hear the news.', exp: '感情の原因は「形容詞 + to 〜」で表せます。happy to hear で「聞いてうれしい」です。' },
      { lv: 2, q: '「私は泳ぐのが苦手です」を、知っている表現に言いかえて英語にしよう。', a: 'I\'m not good at swimming.(I can\'t swim well.)', exp: '「苦手」は「得意ではない」と言いかえて not good at 〜ing、または「上手に泳げない」と考えて can\'t swim well で表せます。' },
      { lv: 2, q: '誤りを直そう。Yesterday I go to the park with my friend.', a: 'Yesterday I went to the park with my friend.', exp: 'Yesterday があるので過去形にします。go の過去形は went です。' },
      { lv: 2, q: 'メールの結びで使う「お返事を楽しみにしています」を英語にしよう。', a: 'I\'m looking forward to hearing from you.', exp: 'look forward to 〜ing で「〜を楽しみに待つ」です。to は前置詞なので hearing と ing 形にします。hear from 〜 は「〜から連絡をもらう」です。' },
      { lv: 3, q: 'Which do you like better, reading books or watching movies? に、理由を1つふくめて15語程度の英語で答えよう。', a: '(例)I like reading books better than watching movies because I can imagine the story freely.', exp: '最初に好きなほうを better than で示し、because で理由を加えています。語数は15語です。比べる2つはどちらも動名詞(reading・watching)でそろえます。' },
      { lv: 3, q: '日本に来る留学生に向けて、「日本でするとよいこと」を should を使って1文でアドバイスしよう。', a: '(例)You should try Japanese food like sushi and ramen.', exp: 'アドバイスは You should 〜. で書きます。like 〜(〜のような)で具体例を加えると、内容がはっきりします。' },
      { lv: 3, q: '「この写真を見ると、私はいつも楽しかった夏を思い出します」を英語にしよう。', a: 'When I see this picture, I always remember the fun summer.(This picture always reminds me of the fun summer.)', exp: '「〜すると」は when で表せます。always は一般動詞 remember の前に置きます。remind A of B(A に B を思い出させる)を使う書き方もあります。' },
      { lv: 3, q: '誤りを2か所直そう。My brother have lived in Osaka since three years.', a: 'My brother has lived in Osaka for three years.', exp: '主語 my brother は3人称単数なので has です。three years は期間の長さなので since ではなく for を使います。' },
      { lv: 3, q: 'Should students wear school uniforms? に Yes の立場で、理由を2つふくめて25語程度の英語で答えよう。', a: '(例)Yes, I think so. First, we don\'t have to choose clothes every morning. Second, uniforms make us feel like members of the school.', exp: '最初に立場を示し、First, と Second, で理由を2つ並べています。語数は23語です。make us feel 〜 は「私たちに〜と感じさせる」という表現です。' }
    ]
  });
})(WPS.LESSONS);
