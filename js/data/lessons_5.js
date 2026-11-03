/*
 * テキストの本文(中学英語の文法)。書式は lessons_1.js と同じ。
 * 【 】でかこんだ語は太字で表示する。
 */
window.WPS = window.WPS || {};
WPS.LESSONS = WPS.LESSONS || {};
(function (L) {
  // ===== 中1の文法 =====
  L.e_m1 = {
    goal: 'be動詞(am・is・are)を主語に合わせて使い分け、be動詞の肯定文・否定文・疑問文を正しく作れるようになる。',
    intro: 'be動詞は、英語でいちばん最初に出会う動詞です。意味はおもに「【〜です】(イコール)」と「【〜にいる・ある】」の2つ。たとえば I am Ken.(私はケンです。)は「私=ケン」という関係を表しています。主語によって am・is・are と形が変わるので、まずはその組み合わせを覚えましょう。',
    secs: [
      { h: '主語でかわる am・is・are', t: '現在の文では、be動詞は主語に合わせて3つの形を使い分けます。\n【I → am】 I am a student.(私は生徒です。)\n【you・複数 → are】 You are kind.(あなたは親切です。)/We are friends.(私たちは友だちです。)\n【he・she・it など、自分と相手以外の1人・1つ → is】 She is my sister.(彼女は私の姉[妹]です。)/This is a pen.(これはペンです。)\nKen and I(ケンと私)のように2人以上なら複数なので are です。\n会話では短縮形もよく使います:I am → I\'m、you are → you\'re、he is → he\'s、it is → it\'s。' },
      { h: 'be動詞の2つの意味', t: '①【イコール(〜です)】…主語と後ろのことばが「同じもの」や「そのようす」であることを表します。\nTom is a doctor.(トムは医者です。)→ Tom = a doctor\nThe cat is cute.(そのねこはかわいいです。)→ the cat = cute(ようす)\n②【いる・ある】…後ろに場所を表すことばがきます。\nMy mother is in the kitchen.(母は台所にいます。)\nYour bag is on the desk.(あなたのかばんは机の上にあります。)' },
      { h: '肯定文・否定文・疑問文の作り方', t: '【肯定文】主語 + be動詞 + 〜.\n例:He is busy.(彼はいそがしいです。)\n【否定文】be動詞の後ろに not を入れる。\n例:He is not busy.(彼はいそがしくありません。)\n短縮形は is not → isn\'t、are not → aren\'t。am not は短縮せず、I\'m not とします。\n【疑問文】be動詞を主語の前に出し、最後に ? をつける。\n例:Is he busy?(彼はいそがしいですか。)\n【答え方】be動詞を使って答える。\nYes, he is.(はい、いそがしいです。)/No, he isn\'t.(いいえ、いそがしくありません。)\n答えでは、人の名前や this・that を代名詞(he・she・it など)にかえます。Is this your bike?(これはあなたの自転車ですか。)→ Yes, it is.',
        ex: [{ q: 'Ken is in the gym.(ケンは体育館にいます。)を、否定文と疑問文にしよう。', steps: ['主語 Ken は自分と相手以外の1人なので、be動詞は is。', '否定文:is の後ろに not を入れる → Ken is not in the gym.', '疑問文:is を主語 Ken の前に出す → Is Ken in the gym?', '答え方:Ken を he にかえて、Yes, he is. / No, he isn\'t.'], a: '否定文:Ken is not(isn\'t) in the gym.(ケンは体育館にいません。)/疑問文:Is Ken in the gym?(ケンは体育館にいますか。)' }] },
      { h: 'be動詞と一般動詞を区別する', t: 'play(する)、like(好きだ)、go(行く)のように、動作や気持ちを表す動詞を【一般動詞】といいます。\n【1つの文に、動詞は原則1つ】です。be動詞と一般動詞を並べてはいけません。\n× I am play tennis. → ○ I play tennis.(私はテニスをします。)\n見分け方:「イコールの文」「いる・あるの文」なら be動詞、「動作・気持ちの文」なら一般動詞。\n疑問文の作り方も別々です。be動詞の文は Are you 〜?、一般動詞の文は Do you 〜? で始めます(一般動詞の文は次の単元でくわしく学びます)。\nAre you hungry?(あなたはおなかがすいていますか。)/Do you like music?(あなたは音楽が好きですか。)',
        ex: [{ q: '( )に入る語は? (1) She (   ) a student. (2) (   ) you play tennis?', steps: ['(1) 「彼女=生徒」というイコールの文なので be動詞。主語 She には is を使う。', '(2) play は一般動詞。一般動詞の疑問文は Do で始める。Are を使うと be動詞と一般動詞が並んでしまう。'], a: '(1) is(彼女は生徒です。) (2) Do(あなたはテニスをしますか。)' }] }
    ],
    terms: [['be動詞', 'am・is・are(過去形は was・were)。「〜です」「〜にいる・ある」を表す'], ['一般動詞', 'be動詞以外の動詞。play・like・go など動作や気持ちを表す'], ['主語', '文の中で「〜は・〜が」にあたることば'], ['短縮形', 'I\'m や isn\'t のように、2語をちぢめて書く形'], ['代名詞', 'he・she・it・they など、名詞のかわりに使うことば']],
    miss: ['be動詞と一般動詞を並べてしまう(× He is play soccer. → ○ He plays soccer.)。', 'Ken and I のような2人の主語に is を使う(正しくは are)。', '疑問文の答えで Yes, Ken is. と名前のまま答える(Yes, he is. とする)。', 'am not を amn\'t と短縮する(I\'m not とする)。'],
    sum: ['I → am、you・複数 → are、それ以外の1人・1つ → is。', 'be動詞の意味は「イコール」と「いる・ある」。', '否定文は be動詞の後ろに not、疑問文は be動詞を主語の前へ。答えも be動詞で。', '1つの文に be動詞と一般動詞を並べない。']
  };
  L.e_pres = {
    goal: '一般動詞の現在形で、主語が3人称単数のときに s をつけ、do・does を使った否定文・疑問文を作れるようになる。',
    intro: 'I play tennis. と He plays tennis.。主語が he になると、動詞に s がつきます。これは「話し手(I)でも聞き手(you)でもない、ほかの1人・1つ」が主語だという目じるしです。この s を【3単現の s】といいます。しくみが分かれば、否定文・疑問文も同じ考え方で作れます。',
    secs: [
      { h: '「3人称単数」とはだれのこと?', t: '【1人称】話し手自身:I(私)、we(私たち)\n【2人称】聞き手:you(あなた・あなたたち)\n【3人称】それ以外のすべて:he、she、it、Ken、my mother、this dog など\nこのうち、3人称で【1人・1つ】(単数)のものが主語で、現在の文のとき、一般動詞に s をつけます。\nKen plays soccer.(ケンはサッカーをします。)\nMy sister likes cats.(姉[妹]はねこが好きです。)\n主語が Ken and Tom(2人)や they なら複数なので、s はつけません:They play soccer.(彼らはサッカーをします。)' },
      { h: 's のつけ方', t: '①ふつうは【s】:play → plays、like → likes\n②s・x・sh・ch・o で終わる語は【es】:watch → watches、wash → washes、go → goes、do → does\n③「子音字 + y」で終わる語は、y を i にかえて【ies】:study → studies、try → tries\n(「母音字 + y」はそのまま s:play → plays、enjoy → enjoys)\n④特別な形:【have → has】\n例:He goes to school by bus.(彼はバスで学校に行きます。)/She studies English every day.(彼女は毎日英語を勉強します。)',
        ex: [{ q: '( )内の動詞を正しい形にしよう。(1) Mika (watch) TV after dinner. (2) My father (have) a car.', steps: ['主語 Mika・My father は、どちらも3人称単数。現在の文なので s をつける。', '(1) watch は ch で終わるので es をつけて watches。', '(2) have は特別な形で has になる。'], a: '(1) watches(ミカは夕食後にテレビを見ます。) (2) has(父は車を持っています。)' }] },
      { h: '肯定文・否定文・疑問文の作り方', t: '【肯定文】主語 + 動詞(3単現なら s).\nI like dogs.(私は犬が好きです。)/She likes dogs.(彼女は犬が好きです。)\n【否定文】動詞の前に do not(don\'t)、3単現なら does not(doesn\'t)。後ろの動詞は【原形】。\nI don\'t like dogs.(私は犬が好きではありません。)/She doesn\'t like dogs.(彼女は犬が好きではありません。)\n【疑問文】文の最初に Do、3単現なら Does。後ろの動詞は【原形】。\nDo you like dogs?(あなたは犬が好きですか。)/Does she like dogs?(彼女は犬が好きですか。)\n【答え方】do・does を使って答える。\nYes, I do. / No, I don\'t.  Yes, she does. / No, she doesn\'t.\nなぜ原形にもどすのでしょうか。それは、does の中にすでに s(3単現のしるし)が入っているからです。s は1つの文に1回だけ、と考えましょう。',
        ex: [{ q: 'Tom plays the guitar.(トムはギターをひきます。)を否定文と疑問文にしよう。', steps: ['主語 Tom は3人称単数なので、does を使う。', '否定文:動詞の前に doesn\'t を置き、plays を原形 play にもどす → Tom doesn\'t play the guitar.', '疑問文:文の最初に Does を置き、動詞は原形 → Does Tom play the guitar?', '答え方:Tom を he にかえて Yes, he does. / No, he doesn\'t.'], a: '否定文:Tom doesn\'t play the guitar.(トムはギターをひきません。)/疑問文:Does Tom play the guitar?(トムはギターをひきますか。)' }] },
      { h: '現在形が表すこと', t: '一般動詞の現在形は、「今この瞬間」よりも、【ふだんの習慣・くり返すこと】や【変わらない事実】を表します。\nI get up at six every morning.(私は毎朝6時に起きます。)\nThe sun rises in the east.(太陽は東からのぼります。)\nevery day(毎日)、usually(ふつうは)、often(よく)、sometimes(ときどき)などの語といっしょによく使われます。usually・often・sometimes は、ふつう一般動詞の前に置きます。\nHe usually walks to school.(彼はふだん歩いて学校へ行きます。)' }
    ],
    terms: [['3人称単数', '自分(I)と相手(you)以外の、1人・1つ'], ['3単現の s', '主語が3人称・単数で、現在の文のときに一般動詞につける s・es'], ['原形', 's も ed もつかない、動詞のもとの形'], ['do・does', '一般動詞の否定文・疑問文を作るときに使う語']],
    miss: ['否定文・疑問文で s を残す(× Does he plays? → ○ Does he play?)。', 'He don\'t 〜 としてしまう(3単現は doesn\'t)。', 'study を studys、go を gos とする(正しくは studies、goes)。', '主語が They や Ken and Tom なのに s をつける。'],
    sum: ['主語が3人称単数・現在なら、一般動詞に s・es をつける。', 'have は has、study は studies、go は goes。', '否定文は don\'t・doesn\'t + 原形、疑問文は Do・Does + 主語 + 原形。', '答えも do・does を使う。']
  };
  L.e_prog = {
    goal: '「今〜しているところ」を be動詞 + ing形で表し、ing形を正しく作って、肯定文・否定文・疑問文を書けるようになる。',
    intro: 'I play tennis. は「(ふだん)テニスをする」、I am playing tennis. は「(今まさに)テニスをしているところ」。同じ play でも、形を変えると伝わる場面が変わります。今ちょうど動作の途中であることを表すのが【現在進行形】です。',
    secs: [
      { h: '現在形と現在進行形のちがい', t: 'I play tennis.(現在形)…ふだんテニスをする(習慣)。\nI am playing tennis now.(現在進行形)…今まさにテニスをしているところ。\n現在進行形は【be動詞 + 動詞の ing形】で作ります。be動詞は主語に合わせて am・is・are を使い分けます。\nHe is reading a book.(彼は本を読んでいます。)\nThey are swimming in the pool.(彼らはプールで泳いでいます。)\nnow(今)、right now(ちょうど今)、Look!(見て)、Listen!(聞いて)などが目じるしになります。' },
      { h: 'ing形の作り方', t: '①ふつうはそのまま【ing】:play → playing、read → reading、study → studying\n②e で終わる語は【e をとって ing】:make → making、write → writing、use → using\n③「短い母音 + 子音字1つ」で終わる語は【最後の文字を重ねて ing】:run → running、swim → swimming、sit → sitting、get → getting\n④ie で終わる語は【ie を y にかえて ing】:lie → lying、die → dying\nswim の m を重ねるのは、swiming だと「スワイミング」のように読まれやすく、短い「イ」の音を残すためです。',
        ex: [{ q: '次の動詞を ing形にしよう。(1) dance (2) cut (3) cook', steps: ['(1) dance は e で終わる → e をとって dancing。', '(2) cut は「短い母音 u + 子音字 t」で終わる → t を重ねて cutting。', '(3) cook は母音字が2つ(oo)続いているので重ねない → そのまま cooking。'], a: '(1) dancing (2) cutting (3) cooking' }] },
      { h: '肯定文・否定文・疑問文の作り方', t: 'be動詞の文と同じしくみです。\n【肯定文】主語 + be動詞 + ing形.\nShe is cooking dinner.(彼女は夕食を作っています。)\n【否定文】be動詞の後ろに not。\nShe is not(isn\'t) cooking dinner.(彼女は夕食を作っていません。)\n【疑問文】be動詞を主語の前に出す。\nIs she cooking dinner?(彼女は夕食を作っていますか。)\n【答え方】Yes, she is. / No, she isn\'t.\n疑問詞を使うと:What are you doing?(あなたは何をしていますか。)— I\'m doing my homework.(宿題をしています。)',
        ex: [{ q: 'They play baseball. を「今〜している」の文にし、さらに疑問文にしよう。', steps: ['be動詞 + ing形にする。主語 They は複数なので are。', 'play はそのまま ing をつけて playing → They are playing baseball now.', '疑問文:are を主語 They の前に出す → Are they playing baseball now?'], a: 'They are playing baseball now.(彼らは今野球をしています。)/Are they playing baseball now?(彼らは今野球をしていますか。)— Yes, they are. / No, they aren\'t.' }] },
      { h: '進行形にしない動詞', t: 'like(好きだ)、know(知っている)、want(ほしい)、have(持っている)のように、【状態や気持ち】を表す動詞は、ふつう進行形にしません。もともと「続いている状態」を表しているので、ing にする必要がないのです。\n× I am knowing him. → ○ I know him.(私は彼を知っています。)\n× She is liking cats. → ○ She likes cats.(彼女はねこが好きです。)\nただし have が「食べる」の意味のときは動作なので、進行形にできます:We are having lunch.(私たちは昼食を食べています。)' }
    ],
    terms: [['現在進行形', 'be動詞 + ing形。「今〜しているところ」'], ['ing形', '動詞の後ろに ing をつけた形(現在分詞)'], ['状態動詞', 'like・know・want など、状態や気持ちを表す動詞。ふつう進行形にしない'], ['動作動詞', 'play・run・eat など、動作を表す動詞。進行形にできる']],
    miss: ['be動詞を忘れる(× I playing tennis.)。', 'be動詞と原形を並べる(× I am play tennis.)。', 'make を makeing、run を runing とする(making、running)。', 'know・like を進行形にする。'],
    sum: ['現在進行形 = be動詞 + ing形で「今〜している」。', 'e で終わる語は e をとる、短い母音 + 子音字は重ねる。', '否定文は be動詞の後ろに not、疑問文は be動詞を前へ。', 'like・know・want などの状態動詞は進行形にしない。']
  };
  L.e_can = {
    goal: 'can を使った「〜できる」の文と、命令文・Don\'t・Let\'s の文を正しい語順で作れるようになる。',
    intro: 'can は、動詞の前に置くだけで「〜できる」という意味を足せる便利なことばです。また、相手に「〜しなさい」「〜しないで」「〜しよう」と働きかける文(命令文)も、この単元で学びます。どちらも【後ろの動詞は原形】という共通のルールがあります。',
    secs: [
      { h: 'can は「〜できる」', t: 'can のように動詞の前に置いて意味をつけ足すことばを【助動詞】といいます。\n【can の後ろは、必ず動詞の原形】です。主語が3人称単数でも、can にも動詞にも s はつけません。\nI can swim.(私は泳げます。)\nHe can swim.(彼は泳げます。)× He cans swim. × He can swims.\n助動詞がつくと、動詞はいつも原形にもどる、と覚えておきましょう。' },
      { h: 'can の肯定文・否定文・疑問文', t: '【肯定文】主語 + can + 動詞の原形.\nShe can play the piano.(彼女はピアノをひくことができます。)\n【否定文】can の後ろに not。ふつう cannot(1語)か can\'t と書きます。\nShe cannot(can\'t) play the piano.(彼女はピアノをひけません。)\n【疑問文】can を主語の前に出す。do・does は使いません。\nCan she play the piano?(彼女はピアノをひけますか。)\n【答え方】Yes, she can. / No, she can\'t.\n会話では、Can you 〜?(〜してくれますか)は【依頼】、Can I 〜?(〜してもいいですか)は【許可】を求める表現にもなります。\nCan you help me?(手伝ってくれますか。)/Can I use this pen?(このペンを使ってもいいですか。)',
        ex: [{ q: 'Ken can ski.(ケンはスキーができます。)を否定文と疑問文にしよう。', steps: ['can の文なので、do・does は使わない。', '否定文:can の後ろに not → Ken cannot(can\'t) ski.', '疑問文:can を Ken の前に出す → Can Ken ski?', '答え方:Yes, he can. / No, he can\'t.'], a: '否定文:Ken cannot(can\'t) ski.(ケンはスキーができません。)/疑問文:Can Ken ski?(ケンはスキーができますか。)' }] },
      { h: '命令文:「〜しなさい」', t: '目の前の相手に「〜しなさい」と言うときは、【主語を省いて、動詞の原形で文を始めます】。言う相手(you)が分かりきっているので、主語を言わないのです。\nOpen the window.(窓を開けなさい。)\nBe quiet.(静かにしなさい。)← be動詞の命令文は、原形の Be で始める\nていねいにしたいときは please をつけます:Please sit down. / Sit down, please.(すわってください。)' },
      { h: '「〜するな」「〜しよう」', t: '【〜するな(禁止)】Don\'t + 動詞の原形.\nDon\'t run in the hallway.(ろうかを走ってはいけません。)\nDon\'t be late.(遅れないでね。)\n【〜しよう(さそい)】Let\'s + 動詞の原形.\nLet\'s play soccer.(サッカーをしよう。)— Yes, let\'s.(うん、そうしよう。)/ OK.(いいよ。)\n命令文・Don\'t・Let\'s の後ろは、どれも動詞の原形です。',
        ex: [{ q: '次の日本文を英語にしよう。(1) この部屋で写真をとってはいけません。(2) いっしょに昼食を食べよう。', steps: ['(1)「〜してはいけない」は Don\'t + 原形。「写真をとる」は take pictures。', '場所「この部屋で」は文の最後に in this room。', '(2)「〜しよう」は Let\'s + 原形。「昼食を食べる」は have lunch。「いっしょに」は together を最後に。'], a: '(1) Don\'t take pictures in this room. (2) Let\'s have lunch together.' }] }
    ],
    terms: [['助動詞', 'can・will・must など、動詞の前に置いて意味をつけ足すことば'], ['cannot(can\'t)', 'can の否定形。「〜できない」'], ['命令文', '主語を省いて動詞の原形で始める文。「〜しなさい」'], ['Let\'s 〜', '「〜しよう」とさそう表現']],
    miss: ['can の後ろの動詞に s をつける(× He can plays.)。', 'Do you can 〜? のように do と can を並べる(○ Can you 〜?)。', 'be動詞の命令文を Are quiet. とする(○ Be quiet.)。', 'Don\'t の後ろを ing形にする(× Don\'t running.)。'],
    sum: ['can + 動詞の原形で「〜できる」。主語が何でも形は同じ。', '否定文は cannot・can\'t、疑問文は Can を主語の前へ。', '命令文は動詞の原形で始める。be動詞なら Be。', 'Don\'t + 原形で「〜するな」、Let\'s + 原形で「〜しよう」。']
  };
  L.e_wh = {
    goal: '何をたずねたいか(もの・人・場所・時・理由・数など)に合わせて疑問詞を選び、正しい語順で疑問文を作れるようになる。',
    intro: 'Do you live in Osaka?(大阪に住んでいますか。)には Yes・No で答えられます。でも「どこに住んでいるの?」と知りたいときは、Where(どこ)のような【疑問詞】を使います。疑問詞の文を作るコツは、【答えの文から逆算すること】です。',
    secs: [
      { h: '疑問詞の種類', t: '【What】何:What is this?(これは何ですか。)— It\'s a map.(地図です。)\n【Who】だれ:Who is that boy?(あの男の子はだれですか。)— He\'s my brother.(私の兄[弟]です。)\n【Whose】だれの:Whose bag is this?(これはだれのかばんですか。)— It\'s mine.(私のです。)\n【Which】どちら・どれ:Which do you like, tea or coffee?(紅茶とコーヒーでは、どちらが好きですか。)— I like tea.\n【Where】どこ:Where do you live?(どこに住んでいますか。)— I live in Osaka.\n【When】いつ:When is your birthday?(誕生日はいつですか。)— It\'s May 5.\n【Why】なぜ:Why do you like summer?(なぜ夏が好きなのですか。)— Because I can swim in the sea.(海で泳げるからです。)\n【How】どのように・どうやって:How do you go to school?(どうやって学校に行きますか。)— By bike.(自転車です。)' },
      { h: '語順のルール', t: '基本は【疑問詞 + ふつうの疑問文の語順】です。疑問詞を文の先頭に置き、その後ろは Yes・No でたずねる疑問文と同じ形にします。\nbe動詞の文:Is this a map? → What is this?\n一般動詞の文:Do you live in Osaka? → Where do you live?\n3単現の文:Does he play tennis? → What does he play?(彼は何をしますか。)\n疑問詞の文には Yes・No で答えず、たずねられた内容を答えます。\n例外:【疑問詞が主語】のとき(「だれが〜するか」)は、疑問詞のすぐ後ろに動詞を置きます。疑問詞は3人称単数として扱います。\nWho plays the piano?(だれがピアノをひきますか。)— Mary does.(メアリーです。)',
        ex: [{ q: '【 】の部分をたずねる疑問文を作ろう。(1) I play 【tennis】 after school. (2) He lives 【in Kyoto】.', steps: ['(1) tennis は「何」にあたる → What。一般動詞の文なので What + do + you + play 〜? の語順。', '(2) in Kyoto は「場所」にあたる → Where。', '主語 He は3人称単数なので does を使い、lives は原形 live にもどす。'], a: '(1) What do you play after school?(あなたは放課後に何をしますか。) (2) Where does he live?(彼はどこに住んでいますか。)' }] },
      { h: 'How を使ったいろいろな疑問文', t: '【How many + 名詞の複数形】いくつ(数):How many pens do you have?(ペンを何本持っていますか。)— I have three.(3本です。)\n【How much】いくら(値段)・どのくらい(量):How much is this cap?(この帽子はいくらですか。)— It\'s 2,000 yen.(2000円です。)\n【How old】何歳:How old are you?(あなたは何歳ですか。)— I\'m thirteen.(13歳です。)\n【How long】どのくらいの長さ:How long is this river?(この川はどのくらいの長さですか。)\n【How tall】どのくらいの高さ:How tall is your father?(お父さんの身長はどのくらいですか。)\nほかに、【What time】何時:What time is it?(何時ですか。)— It\'s seven.(7時です。)、【What + 名詞】何の〜:What sport do you like?(何のスポーツが好きですか。)もよく使います。\nHow many と How much のちがい:数えられるもの(ペン・本・人など)の「数」は How many、値段や数えられないもの(水・お金など)の「量」は How much です。',
        ex: [{ q: '( )に入る2語は? (1) (   ) (   ) brothers do you have? — I have two. (2) (   ) (   ) is this bag? — It\'s 3,000 yen.', steps: ['(1) 答えが「2人」という数。brothers は数えられる名詞の複数形 → How many。', '(2) 答えが「3000円」という値段 → How much。'], a: '(1) How many(兄弟は何人いますか。— 2人です。) (2) How much(このかばんはいくらですか。— 3000円です。)' }] }
    ],
    terms: [['疑問詞', 'what・who・where など、具体的な内容をたずねることば'], ['How many', '数をたずねる。後ろの名詞は複数形'], ['How much', '値段や量をたずねる'], ['Whose', '「だれの」と持ち主をたずねる']],
    miss: ['Where you live? のように do・does を忘れる(○ Where do you live?)。', 'How many の後ろの名詞を単数にする(× How many book → ○ How many books)。', '疑問詞の文に Yes・No で答える。', '疑問詞が主語なのに do を入れる(× Who does play the piano? → ○ Who plays the piano?)。'],
    sum: ['疑問詞は文の先頭。後ろはふつうの疑問文の語順。', '答えの文を見て、何をたずねているかを考えて疑問詞を選ぶ。', 'How many + 複数名詞は数、How much は値段・量。', '疑問詞が主語なら「疑問詞 + 動詞」の順。']
  };
  L.e_m2 = {
    goal: '一般動詞と be動詞の過去形を正しく作り、did・was・were を使った否定文・疑問文を書けるようになる。',
    intro: '「きのうテニスをした」のように過去のことを言うときは、動詞を【過去形】にします。日本語の「〜した」にあたる部分です。一般動詞の過去の否定文・疑問文では【did】が「過去」の役目を引き受けるので、動詞は原形にもどります。この役割分担がこの単元のいちばんのポイントです。',
    secs: [
      { h: '一般動詞の過去形の作り方', t: '【規則動詞】は語の最後に ed をつけます。\n・ふつうは ed:play → played、watch → watched\n・e で終わる語は d だけ:live → lived、use → used\n・「子音字 + y」は y を i にかえて ed:study → studied、try → tried\n・「短い母音 + 子音字1つ」は最後の文字を重ねて ed:stop → stopped、plan → planned\n【不規則動詞】は1語ずつ覚えます。\ngo → went、come → came、see → saw、have → had、eat → ate、get → got、make → made、buy → bought、read → read(つづりは同じで、発音が「レッド」に変わる)\n過去形は、主語が何でも同じ形です(3単現の s のような変化はありません)。\nI went to Kyoto yesterday.(私はきのう京都へ行きました。)/She went to Kyoto last week.(彼女は先週京都へ行きました。)',
        ex: [{ q: '次の動詞を過去形にしよう。(1) stop (2) study (3) see', steps: ['(1) stop は「短い母音 o + 子音字 p」→ p を重ねて stopped。', '(2) study は「子音字 d + y」→ y を i にかえて studied。', '(3) see は不規則動詞 → saw。'], a: '(1) stopped (2) studied (3) saw' }] },
      { h: 'be動詞の過去形 was・were', t: 'am・is の過去形は【was】、are の過去形は【were】です。\nI was busy yesterday.(私はきのういそがしかった。)\nThey were in the park then.(彼らはそのとき公園にいました。)\n否定文:be動詞の後ろに not → was not(wasn\'t)/were not(weren\'t)\nI wasn\'t busy yesterday.(私はきのういそがしくなかった。)\n疑問文:be動詞を主語の前へ → Was he at home?(彼は家にいましたか。)— Yes, he was. / No, he wasn\'t.' },
      { h: '一般動詞の過去の否定文・疑問文', t: '【肯定文】主語 + 過去形.\nHe watched TV last night.(彼は昨夜テレビを見ました。)\n【否定文】主語 + did not(didn\'t) + 動詞の原形。主語が何でも did です。\nHe didn\'t watch TV last night.(彼は昨夜テレビを見ませんでした。)\n【疑問文】Did + 主語 + 動詞の原形 〜?\nDid he watch TV last night?(彼は昨夜テレビを見ましたか。)\n【答え方】Yes, he did. / No, he didn\'t.\n疑問詞を使うと:What did you do yesterday?(きのうは何をしましたか。)— I played tennis.(テニスをしました。)\n原形にもどす理由:【did が「過去」を引き受けてくれる】ので、動詞はもとの形でよいのです。',
        ex: [{ q: 'Mai bought a new bag.(マイは新しいかばんを買いました。)を否定文と疑問文にしよう。', steps: ['bought は buy の過去形。一般動詞の過去の文なので did を使う。', '否定文:didn\'t + 原形 buy → Mai didn\'t buy a new bag.', '疑問文:Did + Mai + buy 〜? → Did Mai buy a new bag?', '答え方:Yes, she did. / No, she didn\'t.'], a: '否定文:Mai didn\'t buy a new bag.(マイは新しいかばんを買いませんでした。)/疑問文:Did Mai buy a new bag?(マイは新しいかばんを買いましたか。)' }] },
      { h: '過去を表すことば', t: '次のことばがあれば、過去形を使う目じるしです。\n【yesterday】きのう、【last 〜】この前の〜(last night 昨夜、last week 先週、last Sunday この前の日曜日)、【〜 ago】〜前(two days ago 2日前、three years ago 3年前)、【then / at that time】そのとき、【in + 過去の年】(in 2020 など)\nlast や ago の前には in・on をつけません。× on last Sunday → ○ last Sunday' }
    ],
    terms: [['過去形', '過去のことを表す動詞の形'], ['規則動詞', 'ed をつけて過去形を作る動詞'], ['不規則動詞', 'go → went のように、形が不規則に変わる動詞'], ['did', '一般動詞の過去の否定文・疑問文で使う語。後ろの動詞は原形']],
    miss: ['Did you went? のように、did の後ろも過去形にする(○ Did you go?)。', 'study を studyed、stop を stoped とする(studied、stopped)。', 'You was 〜 とする(you・複数には were)。', 'be動詞の過去の文に did を使う(× Did he busy? → ○ Was he busy?)。'],
    sum: ['規則動詞は ed、不規則動詞は1語ずつ覚える。', 'am・is → was、are → were。', '一般動詞の否定文は didn\'t + 原形、疑問文は Did + 主語 + 原形。', 'yesterday・last 〜・〜 ago は過去形の目じるし。']
  };

  // ===== 中2の文法 =====
  L.e_pprog = {
    goal: '「(過去のある時に)〜しているところだった」を was・were + ing形で表し、過去形との意味のちがいを説明できるようになる。',
    intro: '友だちに「きのうの夜9時、何してた?」と聞かれたら、「テレビを見ているところだった」と答えますよね。このように、過去のある時点で【動作の途中だった】ことを表すのが【過去進行形】です。現在進行形の be動詞を過去形にするだけで作れます。',
    secs: [
      { h: '過去進行形の形', t: '【was・were + 動詞の ing形】で「(そのとき)〜しているところだった」を表します。\nI・he・she・it など1人・1つの主語 → 【was】、you・複数の主語 → 【were】。\nI was studying at eight last night.(私は昨夜8時に勉強していました。)\nThey were playing soccer then.(彼らはそのときサッカーをしていました。)\ning形の作り方は現在進行形と同じです(make → making、run → running)。' },
      { h: '過去形とのちがい', t: '【過去形】I watched TV last night.(私は昨夜テレビを見ました。)\n→ テレビを見たという動作を、ひとまとまりの「終わったこと」として言っています。\n【過去進行形】I was watching TV at nine last night.(私は昨夜9時にテレビを見ていました。)\n→ 9時という時点で、テレビを見ている「途中」だったことを言っています。その前から見ていて、その後も続いていたかもしれません。\n時間の線で考えると、過去形は「その動作をした」という事実、過去進行形は「ある時点をはさんで続いていた途中の場面」です。then(そのとき)、at that time(そのとき)、at 〜 o\'clock(〜時に)といっしょによく使われます。' },
      { h: '肯定文・否定文・疑問文の作り方', t: '【肯定文】主語 + was・were + ing形.\nShe was cooking dinner.(彼女は夕食を作っていました。)\n【否定文】was・were の後ろに not。\nShe was not(wasn\'t) cooking dinner.(彼女は夕食を作っていませんでした。)\n【疑問文】was・were を主語の前に出す。\nWas she cooking dinner?(彼女は夕食を作っていましたか。)\n【答え方】Yes, she was. / No, she wasn\'t.\n疑問詞を使うと:What were you doing at seven?(あなたは7時に何をしていましたか。)— I was taking a bath.(おふろに入っていました。)',
        ex: [{ q: 'They were running in the park.(彼らは公園で走っていました。)を否定文と疑問文にしよう。', steps: ['be動詞は were(主語 They は複数)。did は使わない。', '否定文:were の後ろに not → They were not(weren\'t) running in the park.', '疑問文:were を They の前に出す → Were they running in the park?', '答え方:Yes, they were. / No, they weren\'t.'], a: '否定文:They weren\'t running in the park.(彼らは公園で走っていませんでした。)/疑問文:Were they running in the park?(彼らは公園で走っていましたか。)' }] },
      { h: 'when といっしょに使う', t: '「〜したとき、…していた」という文では、【長く続いていた動作】を過去進行形、【そこに割りこんだ短い出来事】を過去形で表します。\nI was taking a bath when he called me.(彼が電話をかけてきたとき、私はおふろに入っていました。)\n→ おふろ(続いていた動作)の途中に、電話(短い出来事)が割りこんだ。\nWhen 〜 を文の前に置くときは、区切りにコンマをつけます:When he called me, I was taking a bath.',
        ex: [{ q: '( )内の動詞を正しい形にしよう。When I got home, my brother (watch) TV.(私が家に帰ったとき、弟はテレビを見ていました。)', steps: ['「帰った」は短い出来事で、すでに過去形 got になっている。', '「テレビを見ていた」は、帰ったときに途中だった動作 → 過去進行形。', '主語 my brother は1人なので was。watch → watching。'], a: 'was watching' }] }
    ],
    terms: [['過去進行形', 'was・were + ing形。「(過去のある時に)〜しているところだった」'], ['then', 'そのとき'], ['at that time', 'そのとき(then と同じ意味)']],
    miss: ['be動詞を現在形のままにする(× I am watching TV last night.)。', '主語が複数なのに was を使う(○ They were 〜)。', 'Did you watching 〜? のように did を使う(○ Were you watching 〜?)。', 'know・like などの状態動詞を進行形にする。'],
    sum: ['過去進行形 = was・were + ing形。', '過去形は「した」、過去進行形は「その時点でしている途中だった」。', '否定文は was・were + not、疑問文は was・were を前へ。', 'when の文では、続いていた動作が過去進行形、割りこんだ出来事が過去形。']
  };
  L.e_fut = {
    goal: 'will と be going to を使って未来のことを表し、それぞれの肯定文・否定文・疑問文を作れるようになる。',
    intro: '英語の動詞には「未来形」という形の変化はありません。そのかわりに、【will + 動詞の原形】や【be going to + 動詞の原形】を使って、これから先のことを表します。どちらも後ろは原形。be going to は be動詞を忘れやすいので注意しましょう。',
    secs: [
      { h: 'will + 動詞の原形', t: 'will は助動詞です。主語が何でも will の形は変わらず、後ろの動詞は原形です。\n①【予想】〜だろう:It will be sunny tomorrow.(あしたは晴れるでしょう。)\n②【意志】〜します・〜するつもりだ:I will call you tonight.(今夜あなたに電話します。)\n× He wills come. × He will comes. → ○ He will come.(彼は来るでしょう。)\n短縮形:I will → I\'ll、you will → you\'ll、he will → he\'ll、it will → it\'ll。' },
      { h: 'be going to + 動詞の原形', t: '①【前から決めていた予定】〜するつもりだ・〜する予定だ\nI am going to visit my aunt next week.(私は来週おばを訪ねる予定です。)\nShe is going to play tennis tomorrow.(彼女はあしたテニスをするつもりです。)\nbe動詞は主語に合わせて am・is・are を使い分けます。\n②【今の様子から考えて】〜しそうだ\nLook at those clouds. It is going to rain.(あの雲を見て。雨が降りそうだよ。)' },
      { h: '肯定文・否定文・疑問文の作り方', t: '【will の文】\n肯定文:He will come.(彼は来るでしょう。)\n否定文:will の後ろに not → He will not(won\'t) come.(彼は来ないでしょう。)\n疑問文:will を主語の前へ → Will he come?(彼は来るでしょうか。)— Yes, he will. / No, he won\'t.\n【be going to の文】be動詞の文と同じしくみです。\n肯定文:They are going to swim.(彼らは泳ぐつもりです。)\n否定文:be動詞の後ろに not → They are not going to swim.(彼らは泳ぐつもりはありません。)\n疑問文:be動詞を主語の前へ → Are they going to swim?(彼らは泳ぐつもりですか。)— Yes, they are. / No, they aren\'t.\n疑問詞を使うと:What are you going to do tomorrow?(あしたは何をするつもりですか。)— I\'m going to see a movie.(映画を見るつもりです。)',
        ex: [{ q: 'Ken is going to buy a new bike.(ケンは新しい自転車を買うつもりです。)を否定文と疑問文にしよう。', steps: ['be going to の文なので、be動詞 is を使って作る。', '否定文:is の後ろに not → Ken is not going to buy a new bike.', '疑問文:is を Ken の前に出す → Is Ken going to buy a new bike?', '答え方:Yes, he is. / No, he isn\'t.'], a: '否定文:Ken isn\'t going to buy a new bike.(ケンは新しい自転車を買うつもりはありません。)/疑問文:Is Ken going to buy a new bike?(ケンは新しい自転車を買うつもりですか。)' }] },
      { h: 'will と be going to の使い分け', t: '【前から決めていた予定】→ be going to が自然です。\nI\'m going to visit Kyoto this summer.(この夏、京都を訪れる予定です。)\n【その場で決めたこと】→ will が自然です。\nThe phone is ringing. — OK, I\'ll get it.(電話が鳴っているよ。— わかった、ぼくが出るよ。)\n【ただの予想】→ どちらも使えます。It will rain tomorrow. / It is going to rain tomorrow.(あしたは雨が降るでしょう。)\n未来を表すことば:tomorrow(あした)、next 〜(次の〜)、this evening(今晩)、soon(まもなく)、someday(いつか)、in the future(将来)。',
        ex: [{ q: 'I will clean my room this afternoon. を、be going to を使った文に書きかえよう。', steps: ['will を be going to にかえる。', '主語 I に合う be動詞は am。', '後ろの動詞は原形 clean のまま。'], a: 'I am(I\'m) going to clean my room this afternoon.(私は今日の午後、部屋をそうじするつもりです。)' }] }
    ],
    terms: [['will', '未来の予想・意志を表す助動詞。後ろは原形'], ['be going to', '予定・様子から考えた未来を表す。be は主語に合わせる'], ['won\'t', 'will not の短縮形']],
    miss: ['be going to の be動詞を忘れる(× I going to play.)。', 'will の後ろに s や ing をつける(× He will plays.)。', 'going to の後ろを ing形にする(× I\'m going to playing.)。', 'Will you 〜? に Yes, I do. と答える(○ Yes, I will.)。'],
    sum: ['will + 原形、be going to + 原形で未来を表す。', 'will の否定は won\'t、疑問文は Will を前へ。', 'be going to は be動詞の文と同じしくみで否定文・疑問文を作る。', '前からの予定は be going to、その場で決めたことは will。']
  };
  L.e_m3 = {
    goal: 'must・have to・may・should などの助動詞の意味と使い方が分かり、肯定文・否定文・疑問文や会話表現を正しく使えるようになる。',
    intro: '「宿題をしなければならない」「入ってもいいですか」「早く寝たほうがいい」。こうした話し手の気持ちや判断は、【助動詞】で表します。助動詞のルールはどれも共通で、【助動詞 + 動詞の原形】。意味を正しく覚えれば、使い方はかんたんです。',
    secs: [
      { h: '助動詞の共通ルールと意味', t: '①後ろは必ず動詞の原形 ②主語が何でも形は変わらない ③否定文は後ろに not ④疑問文は主語の前へ。can・will も助動詞の仲間です。\n【must】〜しなければならない/〜にちがいない\nYou must wear a helmet.(ヘルメットをかぶらなければなりません。)\n【may】〜してもよい/〜かもしれない\nMay I come in?(入ってもいいですか。)/It may rain this afternoon.(午後は雨が降るかもしれません。)\n【should】〜すべきだ・〜したほうがよい\nYou should go to bed early.(早く寝たほうがいいですよ。)' },
      { h: 'must と have to', t: '【have to + 原形】も「〜しなければならない」という意味で、肯定文では must とほぼ同じです。\nhave to は主語や時制に合わせて形が変わります。\n・3人称単数 → has to:She has to get up early.(彼女は早起きしなければなりません。)\n・過去 → had to:I had to wait for an hour.(私は1時間待たなければなりませんでした。)\nmust には過去形がないので、過去のことは had to で表します。\n否定文では意味が大きく変わります。\n【must not】(mustn\'t)〜してはいけない(禁止)\nYou must not swim here.(ここで泳いではいけません。)\n【don\'t have to】〜しなくてもよい(必要がない)\nYou don\'t have to hurry.(急がなくてもいいですよ。)' },
      { h: '否定文・疑問文の作り方', t: '【must】\n否定文:You must not 〜.(〜してはいけない)\n疑問文:Must I 〜?(〜しなければなりませんか。)— Yes, you must. / No, you don\'t have to.(いいえ、その必要はありません。)\n【have to】一般動詞の文と同じく do・does を使います。\n否定文:He doesn\'t have to come.(彼は来なくてもよい。)\n疑問文:Do I have to 〜? / Does he have to 〜? — Yes, he does. / No, he doesn\'t.\n【should】\n否定文:You should not(shouldn\'t) eat too much.(食べすぎるべきではありません。)\n疑問文:Should I call him?(彼に電話すべきですか。)— Yes, you should.',
        ex: [{ q: 'Ken must clean the room.(ケンは部屋をそうじしなければなりません。)を have to を使って書きかえ、さらに疑問文にしよう。', steps: ['must = have to。主語 Ken は3人称単数なので has to にする。', '書きかえ:Ken has to clean the room.', '疑問文:has to は一般動詞と同じように Does を使う。has は原形 have にもどす。', '→ Does Ken have to clean the room? — Yes, he does. / No, he doesn\'t.'], a: 'Ken has to clean the room. / Does Ken have to clean the room?(ケンは部屋をそうじしなければなりませんか。)' }] },
      { h: '会話でよく使う表現', t: '【Shall I 〜?】(私が)〜しましょうか(申し出)\nShall I open the window?(窓を開けましょうか。)— Yes, please.(はい、お願いします。)/ No, thank you.(いいえ、けっこうです。)\n【Shall we 〜?】(いっしょに)〜しましょうか(さそい。Let\'s 〜 とほぼ同じ)\nShall we dance?(おどりましょうか。)— Yes, let\'s.(はい、そうしましょう。)\n【Will you 〜?】〜してくれますか(依頼)\nWill you help me?(手伝ってくれますか。)— Sure.(いいですよ。)\n【Could you 〜?】〜していただけますか(ていねいな依頼)\nCould you tell me the way to the station?(駅への道を教えていただけますか。)\n【May I 〜?】〜してもよろしいですか(ていねいな許可)',
        ex: [{ q: '( )に入る語は? (1) (   ) I carry your bag?(かばんを運びましょうか。) (2) You (   ) (   ) to bring lunch. We have a party.(お弁当を持ってくる必要はありません。パーティーがあるからです。)', steps: ['(1)「(私が)〜しましょうか」と申し出る → Shall I 〜?。', '(2)「〜する必要はない」は don\'t have to。must not にすると「持ってきてはいけない」になってしまう。'], a: '(1) Shall (2) don\'t have' }] }
    ],
    terms: [['must', '〜しなければならない/〜にちがいない'], ['have to', '〜しなければならない。主語・時制で has to・had to になる'], ['may', '〜してもよい/〜かもしれない'], ['should', '〜すべきだ・〜したほうがよい'], ['must not と don\'t have to', '「〜してはいけない(禁止)」と「〜しなくてよい(不必要)」']],
    miss: ['must not と don\'t have to を同じ意味だと思う。', '主語が3人称単数なのに have to のままにする(○ She has to 〜)。', 'must を過去形にしようとして musted とする(○ had to)。', 'Shall I 〜?(申し出)と Shall we 〜?(さそい)を取りちがえる。'],
    sum: ['助動詞 + 動詞の原形。主語が何でも助動詞の形は同じ。', 'must ≒ have to。過去は had to。', 'must not は禁止、don\'t have to は不必要。', 'Shall I は申し出、Shall we はさそい、Will you・Could you は依頼。']
  };
  L.e_m4 = {
    goal: 'to + 動詞の原形(不定詞)の3つの用法(名詞的・形容詞的・副詞的)を見分け、意味を正しくとれるようになる。',
    intro: '【不定詞】は「to + 動詞の原形」の形をしたことばのかたまりです。同じ形なのに、文の中での働きによって「〜すること」「〜するための」「〜するために」と意味が変わります。どの働きかは、【文のどこにあるか】と【何を説明しているか】で決まります。',
    secs: [
      { h: '不定詞の形', t: '不定詞は【to + 動詞の原形】です。主語が3人称単数でも、過去の文でも、to の後ろはいつも原形です。\n× He wants to plays. × I wanted to played. → ○ He wants to play. / I wanted to play.\n働きは次の3つです。\n①【名詞的用法】〜すること\n②【形容詞的用法】〜するための・〜すべき(名詞を説明)\n③【副詞的用法】〜するために(目的)/〜して(感情の原因)' },
      { h: '名詞的用法:〜すること', t: '動詞の目的語になる:I like to read books.(私は本を読むことが好きです。)\nよく使う形:【want to 〜】〜したい、【hope to 〜】〜することを望む、【try to 〜】〜しようとする、【start(begin) to 〜】〜し始める、【decide to 〜】〜することに決める\nI want to be a doctor.(私は医者になりたい。)\n補語になる:My dream is to travel around the world.(私の夢は世界中を旅することです。)\n主語の役目:「〜することは…だ」は、ふつう【It is … (for 人) to 〜.】の形にします。It は仮の主語で、本当の主語は to 以下です。\nIt is important for us to study.(私たちにとって勉強することは大切です。)\n注意:enjoy・finish・stop の後ろには不定詞ではなく ing形(動名詞)を使います。× I enjoyed to play. → ○ I enjoyed playing.',
        ex: [{ q: '日本文に合うように英語にしよう。「私は将来、先生になりたい。」', steps: ['「〜したい」は want to + 原形。', '「先生になる」は be a teacher(be動詞の原形 be を使う)。', '「将来」は in the future を最後に。'], a: 'I want to be a teacher in the future.' }] },
      { h: '形容詞的用法:〜するための・〜すべき', t: '不定詞が【すぐ前の名詞】を後ろから説明します。\nI have a lot of homework to do.(私にはやるべき宿題がたくさんあります。)→ to do が homework を説明\nI want something to drink.(何か飲むものがほしい。)→ to drink が something を説明\nThere are many places to visit in Kyoto.(京都には訪れるべき場所がたくさんあります。)\n見分け方:to の直前が名詞で、「〜するための(名詞)」「〜すべき(名詞)」と訳すと自然なら形容詞的用法です。' },
      { h: '副詞的用法:〜するために/〜して', t: '【目的】〜するために:動詞を説明します。\nI went to the library to study.(私は勉強するために図書館へ行きました。)\nWhy did you go there? — To see my friend.(なぜそこへ行ったのですか。— 友だちに会うためです。)\n【感情の原因】〜して:glad・happy・sad・surprised など、気持ちを表す語の後ろに置きます。\nI am glad to see you.(あなたに会えてうれしいです。)\nI was surprised to hear the news.(私はその知らせを聞いておどろきました。)',
        ex: [{ q: '下の文の不定詞は、名詞的・形容詞的・副詞的のどれ? (1) She went to Canada to study English. (2) I need a pen to write with. (3) He started to run.', steps: ['(1) 「英語を勉強するために」カナダへ行った → 目的を表す副詞的用法。', '(2) 直前の名詞 a pen を説明し、「書くためのペン」→ 形容詞的用法。', '(3) started の目的語で「走ること」を始めた → 名詞的用法。'], a: '(1) 副詞的用法(彼女は英語を勉強するためにカナダへ行った。) (2) 形容詞的用法(私は書くためのペンが必要だ。) (3) 名詞的用法(彼は走り始めた。)' }] }
    ],
    terms: [['不定詞', 'to + 動詞の原形'], ['名詞的用法', '「〜すること」。動詞の目的語・補語・主語になる'], ['形容詞的用法', '「〜するための・〜すべき」。前の名詞を説明する'], ['副詞的用法', '「〜するために(目的)」「〜して(感情の原因)」'], ['仮の主語 It', 'It is … to 〜. の It。本当の主語は to 以下']],
    miss: ['to の後ろに s や ed をつける(× to plays、to played)。', 'enjoy・finish の後ろに不定詞を使う(× enjoy to play)。', 'homework to do を「するために宿題」と副詞的用法で訳す(○ やるべき宿題)。'],
    sum: ['不定詞 = to + 動詞の原形。to の後ろはいつも原形。', '名詞的「〜すること」、形容詞的「〜するための」、副詞的「〜するために/〜して」。', '前に名詞があり、それを説明していれば形容詞的用法。', '「〜することは…だ」は It is … (for 人) to 〜.']
  };
  L.e_ger = {
    goal: '動名詞(〜ing)の使い方が分かり、ing をとる動詞・to をとる動詞・前置詞の後ろの形を正しく選べるようになる。',
    intro: '動詞に ing をつけると、「〜すること」という名詞のような働きをします。これを【動名詞】といいます。不定詞の名詞的用法(to 〜)と意味は似ていますが、【動詞によってどちらを後ろにとるかが決まっている】のがポイントです。',
    secs: [
      { h: '動名詞とは', t: '【動詞の ing形】で「〜すること」を表し、名詞と同じように文の中で使います。\n主語:Playing soccer is fun.(サッカーをすることは楽しい。)→ 動名詞の主語は単数あつかいなので is\n目的語:I like playing the piano.(私はピアノをひくことが好きです。)\n補語:My hobby is taking pictures.(私の趣味は写真をとることです。)\n進行形の ing と同じ形ですが、My hobby is taking pictures. は「趣味=写真をとること」というイコールの文なので動名詞です。「〜している」と訳して意味が通るなら進行形、「〜すること」なら動名詞です。' },
      { h: 'ing をとる動詞・to をとる動詞', t: '【ing(動名詞)だけをとる】enjoy(楽しむ)、finish(終える)、stop(やめる)、practice(練習する)、give up(あきらめる)、mind(気にする)\nI enjoyed talking with her.(私は彼女と話して楽しかった。)\nI finished writing the report.(私はレポートを書き終えました。)\n【to(不定詞)だけをとる】want(〜したい)、hope(望む)、decide(決める)、plan(計画する)、wish(願う)\nHe decided to study abroad.(彼は留学することに決めました。)\n【どちらもとれて意味がほぼ同じ】like、love、start、begin\nIt started raining. = It started to rain.(雨が降り始めた。)\n覚え方のイメージ:want・hope・decide は「まだしていない、これからのこと」なので to。enjoy・finish・stop は「実際にしていること」が前提なので ing。',
        ex: [{ q: '( )内の動詞を正しい形にしよう。(1) We enjoyed (sing) songs. (2) I hope (see) you again.', steps: ['(1) enjoy は ing をとる動詞 → singing。', '(2) hope は to をとる動詞 → to see。'], a: '(1) singing(私たちは歌を歌って楽しみました。) (2) to see(またあなたに会いたいです。)' }] },
      { h: '前置詞の後ろは動名詞', t: 'at・in・of・for・about・without・before・after などの【前置詞の後ろに動詞を置くときは、必ず ing形】にします。前置詞の後ろには名詞がくるので、動詞を名詞の形(動名詞)にするのです。\nHe is good at swimming.(彼は泳ぐのが得意です。)\nThank you for helping me.(手伝ってくれてありがとう。)\nHow about going to the movies?(映画に行くのはどうですか。)\nI am interested in learning Chinese.(私は中国語を学ぶことに興味があります。)\nBefore going to bed, I brush my teeth.(寝る前に、私は歯をみがきます。)\n× good at swim、× for help me のように原形を置くのはまちがいです。',
        ex: [{ q: '日本文に合うように英語にしよう。「さよならを言わずに、彼は帰った。」', steps: ['「〜せずに」は前置詞 without。', '前置詞の後ろなので、say を動名詞 saying にする。', '「さよなら」は goodbye。「帰った」は went home。'], a: 'He went home without saying goodbye.' }] },
      { h: 'stop 〜ing と stop to 〜', t: 'stop の後ろは、ing か to かで意味がまったくちがいます。\nHe stopped talking.(彼は話すのをやめた。)→ talking は stop の目的語(動名詞)\nHe stopped to talk.(彼は話すために立ち止まった[手を止めた]。)→ to talk は「話すために」という目的(不定詞の副詞的用法)\n「〜するのをやめる」と言いたいときは、必ず stop 〜ing です。' }
    ],
    terms: [['動名詞', '動詞の ing形で「〜すること」を表すもの'], ['前置詞', 'at・in・for など、名詞の前に置くことば。後ろに動詞がくるときは ing形'], ['How about 〜ing?', '「〜するのはどうですか」とさそう表現']],
    miss: ['enjoy to play、finish to read のように to を使う。', 'want playing のように、to をとる動詞に ing を使う。', '前置詞の後ろに原形を置く(× good at play → ○ good at playing)。', '動名詞の主語に are を使う(× Playing games are fun. → ○ is)。'],
    sum: ['動名詞 = 動詞の ing形で「〜すること」。主語なら単数あつかい。', 'enjoy・finish・stop は ing、want・hope・decide は to。', '前置詞の後ろの動詞は必ず ing形。', 'stop 〜ing は「やめる」、stop to 〜 は「〜するために立ち止まる」。']
  };
  L.e_m5 = {
    goal: '比較級・最上級の作り方と使い方、as 〜 as の文が分かり、2つや3つ以上のものを比べる文を書けるようになる。',
    intro: '「トムはケンより背が高い」「富士山は日本で一番高い山だ」。ものを比べるとき、英語では形容詞や副詞の形を変えます。2つを比べるなら【比較級】、3つ以上の中で一番なら【最上級】、同じくらいなら【as 〜 as】。まずは形の作り方から整理しましょう。',
    secs: [
      { h: '比較級・最上級の作り方', t: '①ふつうは【er・est】:tall → taller → tallest、old → older → oldest\n②e で終わる語は【r・st】:large → larger → largest、nice → nicer → nicest\n③「子音字 + y」は y を i にかえて【ier・iest】:easy → easier → easiest、busy → busier → busiest\n④「短い母音 + 子音字1つ」は最後の文字を重ねる:big → bigger → biggest、hot → hotter → hottest\n⑤beautiful・interesting・difficult・popular などの長い語は、前に【more・most】:interesting → more interesting → most interesting\n⑥不規則に変わる語:good・well → better → best、many・much → more → most、bad → worse → worst' },
      { h: '2つを比べる:比較級 + than', t: '【A + 動詞 + 比較級 + than B】で「A は B より〜だ」。\nTom is taller than Ken.(トムはケンより背が高い。)\nThis book is more interesting than that one.(この本はあの本よりおもしろい。)\n【Which is + 比較級, A or B?】で「A と B ではどちらが〜ですか」。\nWhich is bigger, the sun or the moon?(太陽と月では、どちらが大きいですか。)— The sun is.(太陽です。)\n「B より A が好き」は like A better than B を使います。\nI like summer better than winter.(私は冬より夏が好きです。)\nWhich do you like better, tea or coffee?(紅茶とコーヒーでは、どちらが好きですか。)— I like tea better.' },
      { h: '3つ以上で一番:the + 最上級', t: '【the + 最上級 + in・of 〜】で「〜の中で一番…だ」。\nTom is the tallest in his class.(トムはクラスで一番背が高い。)\nThis is the most interesting of the three.(これは3つの中で一番おもしろい。)\nin と of の使い分け:\n【in + 場所・範囲・集団】in Japan、in my family、in the class\n【of + 複数を表すことば】of the three、of all、of the five boys\n「〜が一番好き」は like 〜 the best を使います。\nI like spring the best of all seasons.(私はすべての季節の中で春が一番好きです。)',
        ex: [{ q: '( )内の語を正しい形にし、[ ]から in か of を選ぼう。Mt. Fuji is the (high) mountain [ in / of ] Japan.', steps: ['the があり「日本で一番」なので最上級。high → highest。', 'Japan は場所・範囲を表すので in。'], a: 'highest、in(富士山は日本で一番高い山です。)' }] },
      { h: 'as 〜 as:同じくらい', t: '【as + 原級(元の形) + as】で「…と同じくらい〜」。\nMy bag is as big as yours.(私のかばんはあなたのと同じくらい大きい。)\n【not as + 原級 + as】で「…ほど〜ではない」。\nI am not as tall as my brother.(私は兄ほど背が高くない。)\nこれは、My brother is taller than I am.(兄は私より背が高い。)と同じ内容です。\nas と as の間には、比較級ではなく必ず原級を入れます(× as bigger as)。',
        ex: [{ q: 'Ken is not as old as Tom.(ケンはトムほど年上ではない。)を、ほぼ同じ意味になるように Tom で始まる比較級の文にしよう。', steps: ['「ケンはトムほど年上ではない」→ トムのほうが年上。', 'Tom を主語にして、old の比較級 older + than を使う。', 'than の後ろは比べる相手 Ken。'], a: 'Tom is older than Ken.(トムはケンより年上です。)' }] }
    ],
    terms: [['原級', '形容詞・副詞のもとの形(tall・big など)'], ['比較級', '-er・more 〜 の形。2つを比べて「より〜」'], ['最上級', '-est・most 〜 の形。3つ以上の中で「一番〜」'], ['as 〜 as', '「…と同じくらい〜」。間は原級']],
    miss: ['more taller のように、more と er を両方つける。', 'good の比較級を gooder とする(○ better)。', 'in と of を取りちがえる(× of Japan、× in the three)。', 'as 〜 as の間に比較級を入れる(× as bigger as)。'],
    sum: ['短い語は -er・-est、長い語は more・most。good → better → best。', '2つなら比較級 + than、3つ以上なら the + 最上級。', '範囲・場所は in、複数を表すことばは of。', 'as + 原級 + as は「同じくらい」、not as 〜 as は「…ほど〜ない」。']
  };
  L.e_m6 = {
    goal: '受動態(be動詞 + 過去分詞)の意味と作り方が分かり、能動態の文を受動態に書きかえたり、否定文・疑問文にしたりできるようになる。',
    intro: '「母がこの部屋をそうじする」を、部屋の立場から言うと「この部屋は(母によって)そうじされる」になります。このように「〜される」という形を【受動態(受け身)】といいます。作り方は【be動詞 + 過去分詞】。be動詞の文なので、否定文・疑問文も be動詞のルールで作れます。',
    secs: [
      { h: '受動態の形と意味', t: '【be動詞 + 過去分詞】で「〜される・〜されている」を表します。be動詞は主語と時制に合わせて am・is・are・was・were を使い分けます。\nThis room is cleaned every day.(この部屋は毎日そうじされます。)\nEnglish is spoken in many countries.(英語は多くの国で話されています。)\n「〜によって」と、だれがしたかを言うときは【by 〜】を使います。\nThis picture was painted by my sister.(この絵は姉によってかかれました。)' },
      { h: '過去分詞の形', t: '規則動詞の過去分詞は、過去形と同じ ed の形です:clean → cleaned → cleaned、use → used → used\n不規則動詞は「原形 ― 過去形 ― 過去分詞」をセットで覚えます。\nmake ― made ― made/build ― built ― built/write ― wrote ― written/speak ― spoke ― spoken/take ― took ― taken/see ― saw ― seen/know ― knew ― known/give ― gave ― given/eat ― ate ― eaten/sing ― sang ― sung/read ― read ― read\n受動態で点を落とす原因の多くは、過去分詞の覚えちがいです。' },
      { h: '能動態を受動態にする手順', t: '例:Many people love this song.(多くの人がこの歌を愛しています。)\n①もとの文の目的語(this song)を主語にする。\n②動詞を「be動詞 + 過去分詞」にする。主語 this song は単数で現在の文なので is loved。\n③もとの主語を by の後ろに置く → This song is loved by many people.(この歌は多くの人に愛されています。)\nby の後ろに代名詞がくるときは目的格(him・her・them など)にします:He wrote this letter. → This letter was written by him.\nだれがしたかが分からない・重要でないときは、by 〜 を省きます。\nThis temple was built 500 years ago.(この寺は500年前に建てられました。)\n助動詞といっしょに使うときは【助動詞 + be + 過去分詞】です:Stars can be seen at night.(星は夜に見ることができます。)',
        ex: [{ q: 'Natsume Soseki wrote this book.(夏目漱石がこの本を書きました。)を受動態にしよう。', steps: ['目的語 this book を主語にする。', '過去の文で主語が単数なので be動詞は was。write の過去分詞は written → was written。', 'もとの主語を by の後ろへ → by Natsume Soseki。'], a: 'This book was written by Natsume Soseki.(この本は夏目漱石によって書かれました。)' }] },
      { h: '肯定文・否定文・疑問文の作り方', t: '受動態は be動詞の文なので、be動詞のルールで作ります。\n【肯定文】This car is made in Japan.(この車は日本で作られています。)\n【否定文】be動詞の後ろに not → This car is not made in Japan.(この車は日本で作られていません。)\n【疑問文】be動詞を主語の前へ → Is this car made in Japan?(この車は日本で作られていますか。)\n【答え方】Yes, it is. / No, it isn\'t.\n疑問詞を使うと:When was this temple built?(この寺はいつ建てられましたか。)/What language is spoken in Brazil?(ブラジルでは何語が話されていますか。)— Portuguese is.(ポルトガル語です。)\n文の動詞は be動詞なので、過去の疑問文でも did は使いません。',
        ex: [{ q: '( )に入る語は? When (   ) this temple built?', steps: ['built は build の過去分詞。「建てられた」という受動態の疑問文。', '受動態の疑問文は be動詞を前に出す。did は使わない。', 'this temple は単数で過去のことなので was。'], a: 'was(この寺はいつ建てられましたか。)' }] }
    ],
    terms: [['受動態(受け身)', 'be動詞 + 過去分詞。「〜される」'], ['能動態', '「〜する」というふつうの文'], ['過去分詞', '受動態や現在完了で使う動詞の形(written・made など)'], ['by 〜', '「〜によって」。動作をした人やものを表す']],
    miss: ['be動詞を忘れる(× This room cleaned every day.)。', '過去分詞をまちがえる(× writed → ○ written)。', '受動態の疑問文に did を使う(× Did this temple built? → ○ Was this temple built?)。', 'by の後ろの代名詞を主格にする(× by he → ○ by him)。'],
    sum: ['受動態 = be動詞 + 過去分詞で「〜される」。', '能動態の目的語を主語にし、もとの主語は by の後ろへ。', '否定文は be動詞 + not、疑問文は be動詞を前へ。did は使わない。', '不規則動詞の過去分詞は、原形・過去形とセットで覚える。']
  };
  L.e_conj = {
    goal: '2つの文の関係(つけ足し・逆接・理由・結果・時・条件)を考えて、and・but・so・because・when・if・that などの接続詞を正しく使えるようになる。',
    intro: '「雨が降っていた。だから家にいた。」「ひまなら、遊びに行こう。」。文と文をつなぐことばを【接続詞】といいます。どの接続詞を使うかは、まず日本語で【2つの文がどんな関係か】を考えると決まります。',
    secs: [
      { h: '対等につなぐ and・but・or・so', t: '【and】そして・〜と…:I went to the park and played tennis.(私は公園へ行って、テニスをしました。)\n【but】しかし・〜だが:I like dogs, but my sister doesn\'t.(私は犬が好きですが、妹は好きではありません。)\n【or】または・それとも:Which do you want, tea or coffee?(紅茶とコーヒー、どちらがほしいですか。)\n【so】だから(後ろに結果):It was raining, so we stayed home.(雨が降っていたので、私たちは家にいました。)\n命令文の後ろでは、and と or が特別な意味になります。\nHurry up, and you will catch the bus.(急ぎなさい、そうすればバスに間に合います。)\nHurry up, or you will be late.(急ぎなさい、さもないと遅れますよ。)' },
      { h: '時・理由・条件を表す when・because・if', t: '【when】〜するとき:When I got home, my mother was cooking.(私が家に帰ったとき、母は料理をしていました。)\n【because】〜なので(理由):I stayed home because I was sick.(具合が悪かったので、私は家にいました。)\n【if】もし〜なら(条件):If you are free, let\'s go shopping.(もしひまなら、買い物に行こう。)\nwhen・if の文は、前にも後ろにも置けます。前に置くときは区切りにコンマをつけます。\nI was happy when I saw him. = When I saw him, I was happy.(彼に会ったとき、私はうれしかった。)\n【that】〜ということ:I think (that) he is right.(私は彼が正しいと思います。)のように、think・know・hope などの後ろで「文」をまとめます。この that はよく省略されます。' },
      { h: 'because と so のちがい', t: '同じ内容を2通りに言えます。\nI was tired, so I went to bed early.(私は疲れていたので、早く寝ました。)\n= I went to bed early because I was tired.\n【because の後ろは原因・理由】、【so の後ろは結果】です。日本語にすると同じ「〜ので」になりやすいので、どちらが原因かを考えて選びます。\nWhy で聞かれたら、Because 〜. で答えられます。\nWhy were you late?(なぜ遅れたのですか。)— Because I missed the bus.(バスに乗りおくれたからです。)\nふつうの文章で Because 〜. だけを1つの文として書くのは、この Why の答えのときだけにしましょう。',
        ex: [{ q: 'It was cold, so I wore a coat.(寒かったので、私はコートを着ました。)を because を使って同じ意味の文にしよう。', steps: ['原因は「寒かった」(It was cold)、結果は「コートを着た」(I wore a coat)。', 'because の後ろには原因を置く。', '結果 + because + 原因 の順にする。'], a: 'I wore a coat because it was cold.' }] },
      { h: 'if・when の中は、未来のことでも現在形', t: '「時」や「条件」を表す if・when の文の中では、【未来のことでも現在形】を使います。\nIf it rains tomorrow, I will stay home.(あした雨が降ったら、私は家にいます。)× If it will rain tomorrow\nWhen he comes, I will tell him.(彼が来たら、私が伝えます。)× When he will come\n文の後半(I will stay home)は未来の will を使いますが、if・when の中だけは現在形にする、と覚えておきましょう。',
        ex: [{ q: '( )に入るものを選ぼう。If it (   ) sunny tomorrow, we will go to the beach.  [ be / is / will be ]', steps: ['if は「もし〜なら」という条件を表している。', '条件の if の中は、未来のことでも現在形。', '主語 it に合う be動詞の現在形は is。'], a: 'is(あした晴れたら、私たちは海辺へ行きます。)' }] }
    ],
    terms: [['接続詞', '語と語、文と文をつなぐことば'], ['because', '〜なので(後ろに理由)'], ['so', 'だから(後ろに結果)'], ['if', 'もし〜なら(条件)'], ['that', '「〜ということ」と文をまとめる。省略されることが多い']],
    miss: ['because と so を1つの文でいっしょに使う(× Because I was tired, so I went to bed.)。', 'because と so の後ろに置く内容(原因と結果)を逆にする。', 'if・when の中で will を使う(× If it will rain tomorrow, 〜)。'],
    sum: ['まず日本語で2つの文の関係を考えてから、接続詞を選ぶ。', 'because の後ろは理由、so の後ろは結果。', 'when・if の文を前に置くときはコンマで区切る。', '時・条件の if・when の中は、未来のことでも現在形。']
  };

  // ===== 中3の文法 =====
  L.e_m7 = {
    goal: '現在完了(have・has + 過去分詞)の3つの意味(継続・経験・完了)を見分け、過去形とのちがいを説明できるようになる。',
    intro: '過去形は「過去のある時のこと」だけを言い、今どうなっているかは言いません。それに対して【現在完了】は、【過去から今へつながっている】ことを表します。「ずっと〜している(継続)」「〜したことがある(経験)」「もう〜した(完了)」の3つの意味があり、いっしょに使われることばで見分けられます。',
    secs: [
      { h: '現在完了の形と考え方', t: '【have + 過去分詞】で作ります。主語が3人称単数なら【has】です。\n短縮形:I have → I\'ve、he has → he\'s、have not → haven\'t、has not → hasn\'t\n過去形との比較:\nI lived in Tokyo for five years.(私は5年間東京に住んでいました。)→ 過去の話。今は住んでいない。\nI have lived in Tokyo for five years.(私は5年間ずっと東京に住んでいます。)→ 今も住んでいる。\n現在完了は「今」に視点があるので、yesterday・last 〜・〜 ago・When 〜? など、はっきり過去の時を表すことばとはいっしょに使えません。\n× I have seen him yesterday. → ○ I saw him yesterday.(私はきのう彼に会いました。)' },
      { h: '継続:ずっと〜している', t: '過去に始まった状態が今も続いていることを表します。\n【for + 期間】〜の間:for three years(3年間)、for a long time(長い間)\n【since + 始まった時点】〜から・〜以来:since 2020(2020年から)、since last Monday(この前の月曜日から)、since I was a child(子どものころから)\nShe has been sick since last Monday.(彼女はこの前の月曜日からずっと具合が悪い。)\nHow long 〜? で期間をたずねます。\nHow long have you lived here?(ここにどのくらい住んでいますか。)— For ten years.(10年間です。)/ Since 2015.(2015年からです。)',
        ex: [{ q: '( )に for か since を入れよう。(1) I have known him (   ) ten years. (2) It has been cold (   ) yesterday.', steps: ['(1) ten years は「期間」→ for。', '(2) yesterday は「始まった時点」→ since。'], a: '(1) for(私は10年間彼を知っています。) (2) since(きのうからずっと寒い。)' }] },
      { h: '経験:〜したことがある', t: '今までに経験したことを表します。\n目じるし:ever(今までに)、never(一度も〜ない)、before(以前に)、once(1回)、twice(2回)、〜 times(〜回)\nI have visited Kyoto twice.(私は京都を2回訪れたことがあります。)\nHave you ever seen a koala?(あなたは今までにコアラを見たことがありますか。)\nI have never eaten natto.(私は一度も納豆を食べたことがありません。)\nHow many times 〜? で回数をたずねます。\n【have been to 〜】〜へ行ったことがある(経験)\nI have been to Hokkaido.(私は北海道へ行ったことがあります。)\n【have gone to 〜】〜へ行ってしまった(今ここにいない)\nHe has gone to America.(彼はアメリカへ行ってしまいました。→ 今はここにいない)' },
      { h: '完了:ちょうど〜したところだ・もう〜した', t: '動作が今までに終わったこと、その結果が今に残っていることを表します。\n目じるし:just(ちょうど)、already(もう・すでに)、yet(疑問文で「もう」、否定文で「まだ」)\nI have just finished my homework.(私はちょうど宿題を終えたところです。)\nShe has already left.(彼女はもう出発しました。)\nHave you eaten lunch yet?(もう昼食を食べましたか。)\nI haven\'t eaten lunch yet.(まだ昼食を食べていません。)\njust・already は have と過去分詞の間、yet は文の最後に置きます。' },
      { h: '肯定文・否定文・疑問文の作り方', t: '【肯定文】主語 + have・has + 過去分詞.\nHe has read this book.(彼はこの本を読んだことがあります[もう読みました]。)\n【否定文】have・has の後ろに not。\nHe has not(hasn\'t) read this book.(彼はこの本を読んだことがありません[まだ読んでいません]。)\n【疑問文】have・has を主語の前へ。\nHas he read this book?(彼はこの本を読んだことがありますか[もう読みましたか]。)\n【答え方】Yes, he has. / No, he hasn\'t.\ndo・does・did は使いません。',
        ex: [{ q: '2つの文を、現在完了を使って1つの文にしよう。I lost my key. I still don\'t have it.(私はかぎをなくした。今もまだ見つかっていない。)', steps: ['「なくした」結果が今も続いている → 現在完了(完了・結果)を使う。', 'have + 過去分詞。lose の過去分詞は lost。', '主語 I なので have lost。'], a: 'I have lost my key.(私はかぎをなくしてしまいました。)' }] }
    ],
    terms: [['現在完了', 'have・has + 過去分詞。過去から今へのつながりを表す'], ['継続', 'ずっと〜している(for・since・How long)'], ['経験', '〜したことがある(ever・never・once・〜 times)'], ['完了', 'ちょうど〜した・もう〜した(just・already・yet)'], ['have been to と have gone to', '「行ったことがある」と「行ってしまった」']],
    miss: ['yesterday・〜 ago など過去を表すことばといっしょに現在完了を使う。', '経験の「行ったことがある」を have gone to とする(○ have been to)。', 'for と since を取りちがえる。', 'have の後ろを過去形にする(× have went → ○ have gone)。'],
    sum: ['現在完了 = have・has + 過去分詞。過去形とちがい、今とつながる。', '継続は for・since、経験は ever・never・回数、完了は just・already・yet。', '否定文は have・has + not、疑問文は have・has を前へ。', '過去を表すことばとは使えない。']
  };
  L.e_pperfprog = {
    goal: '現在完了進行形(have・has been + ing形)で「ずっと〜し続けている」を表し、現在完了(継続)との使い分けが分かるようになる。',
    intro: '「2時間ずっと勉強している」「けさからずっと雨が降り続いている」。過去に始まった【動作】が今も続いているときは、【現在完了進行形】を使います。現在完了(have + 過去分詞)と進行形(be + ing)を合体させた形です。',
    secs: [
      { h: '現在完了進行形の形と意味', t: '【have・has been + 動詞の ing形】で「(過去から今まで)ずっと〜し続けている」を表します。been は be の過去分詞です。\nhave + been(現在完了) + 〜ing(進行形)= have been 〜ing、と組み立てを覚えましょう。\nI have been studying English for two hours.(私は2時間ずっと英語を勉強しています。)\nIt has been raining since this morning.(けさからずっと雨が降り続いています。)\n期間の for、始まった時点の since をよくいっしょに使います。' },
      { h: '現在完了(継続)との使い分け', t: '「ずっと〜している」は、動詞の種類で形を使い分けます。\n【状態】を表す動詞(be・know・like・want・have(持っている)など)→ 現在完了\nI have known him for ten years.(私は10年間彼を知っています。)× I have been knowing him.\nI have been busy since yesterday.(私はきのうからずっといそがしい。)\n【動作】を表す動詞(study・play・run・read・wait・rain など)→ 現在完了進行形\nHe has been playing the game for three hours.(彼は3時間ずっとそのゲームをしています。)\nlive・work・stay・teach のように、状態とも動作とも考えられる動詞は、どちらの形も使えます。\nI have lived here for ten years. / I have been living here for ten years.(どちらも「私は10年間ここに住んでいます」)\n進行形のほうが、「今まさに続いている」感じが強く出ます。',
        ex: [{ q: '( )内の動詞を「ずっと〜している」の形にしよう。(1) She (wait) for the bus for twenty minutes. (2) We (know) each other since we were children.', steps: ['(1) wait(待つ)は動作 → 現在完了進行形。主語 She なので has been waiting。', '(2) know(知っている)は状態 → 進行形にせず現在完了。主語 We なので have known。'], a: '(1) has been waiting(彼女は20分間ずっとバスを待っています。) (2) have known(私たちは子どものころからおたがいを知っています。)' }] },
      { h: '肯定文・否定文・疑問文の作り方', t: '現在完了と同じく、have・has を使って作ります。\n【肯定文】主語 + have・has been + ing形.\nThey have been running for an hour.(彼らは1時間ずっと走っています。)\n【否定文】have・has の後ろに not。\nI have not(haven\'t) been sleeping well recently.(私は最近ずっとよく眠れていません。)\n【疑問文】have・has を主語の前へ。\nHave they been running for an hour?(彼らは1時間ずっと走っているのですか。)\n【答え方】Yes, they have. / No, they haven\'t.\nHow long でたずねると:How long have you been waiting?(どのくらい待っていますか。)— For thirty minutes.(30分です。)/ Since three o\'clock.(3時からです。)',
        ex: [{ q: '「あなたはどのくらい(の時間)ピアノを練習していますか。」を英語にしよう。', steps: ['期間をたずねるので How long で始める。', 'practice(練習する)は動作 → 現在完了進行形の疑問文。have を主語 you の前に出す。', 'How long + have + you + been + practicing + the piano?'], a: 'How long have you been practicing the piano?' }] }
    ],
    terms: [['現在完了進行形', 'have・has been + ing形。動作が今までずっと続いている'], ['been', 'be の過去分詞'], ['状態動詞', 'know・like・be など。「ずっと」は現在完了で表す'], ['動作動詞', 'study・play・wait など。「ずっと」は現在完了進行形で表す']],
    miss: ['been を忘れる(× I have studying.)。', 'been を be にする(× I have be studying.)。', 'know・like を現在完了進行形にする(× I have been knowing him.)。', '主語が3人称単数なのに have を使う(○ He has been 〜)。'],
    sum: ['現在完了進行形 = have・has been + ing形。', '動作の「ずっと」は現在完了進行形、状態の「ずっと」は現在完了。', 'live・work などはどちらの形も使える。', 'How long have you been 〜ing? で期間をたずねる。']
  };
  L.e_partm = {
    goal: '現在分詞(ing形)と過去分詞を使って名詞を説明し、どちらを使うか・名詞の前か後ろかを正しく判断できるようになる。',
    intro: '「眠っている赤ちゃん」「割れた窓」「テニスをしている男の子」。このように名詞をくわしく説明するとき、英語では動詞の ing形や過去分詞を形容詞のように使います。これを分詞の【形容詞的用法】といいます。判断のポイントは2つ、【する側か、される側か】と【何語か】です。',
    secs: [
      { h: '現在分詞か過去分詞か', t: '説明される名詞と、動詞との関係を考えます。\n【名詞が「〜している」(する側)】→ 現在分詞(ing形)\na sleeping baby(眠っている赤ちゃん)→ 赤ちゃんが眠る(する側)\n【名詞が「〜される・〜された」(される側)】→ 過去分詞\na broken window(割られた窓 → 割れた窓)→ 窓が割られる(される側)\n迷ったら、「名詞 + is + 分詞」の文を作ってみましょう。The baby is sleeping.(進行形)なら ing形、The window is broken.(受動態)なら過去分詞です。' },
      { h: '1語なら前、2語以上なら後ろ', t: '【分詞1語だけ】→ 名詞の前に置きます。\na running dog(走っている犬)、used cars(中古車=使われた車)\n【分詞に語句がついて2語以上】→ 名詞の後ろに置きます。\nthe boy playing tennis(テニスをしている男の子)\na car made in Japan(日本で作られた車)\na letter written in English(英語で書かれた手紙)\n文の中では、名詞 + 分詞のかたまり全体が1つの名詞のように働きます。\nThe boy playing tennis is my brother.(テニスをしている男の子は私の兄です。)→ 主語は The boy playing tennis、動詞は is。',
        ex: [{ q: '日本文に合うように[ ]の語を並べかえよう。「ドアのそばに立っている女の子はユミです。」 [ standing / the / girl / by ] the door is Yumi.', steps: ['「女の子」は立っている側 → 現在分詞 standing。', 'standing by the door は2語以上なので、名詞 the girl の後ろに置く。', 'The girl standing by the door が主語、is が動詞。'], a: 'The girl standing by the door is Yumi.' }] },
      { h: '練習:どちらの分詞を使う?', t: '手順は、①説明される名詞を見つける ②その名詞が「する側」か「される側」かを考える ③分詞の位置(前か後ろか)を決める、の3つです。\nLook at the dancing girls.(おどっている女の子たちを見て。)\nThis is a picture taken by my father.(これは父がとった写真です。)\nThe language spoken in Brazil is Portuguese.(ブラジルで話されている言語はポルトガル語です。)',
        ex: [{ q: '( )内の動詞を正しい形にしよう。(1) Look at the (sleep) cat. (2) I have a bag (make) in Italy.', steps: ['(1) ねこは眠っている(する側)→ 現在分詞 sleeping。1語なので名詞の前。', '(2) かばんはイタリアで作られた(される側)→ 過去分詞 made。in Italy がついているので名詞の後ろ。'], a: '(1) sleeping(眠っているねこを見て。) (2) made(私はイタリアで作られたかばんを持っています。)' }] },
      { h: '関係代名詞との関係', t: '後ろから説明する分詞は、関係代名詞を使った文から「関係代名詞 + be動詞」を取ったものと考えられます。\nthe boy who is playing tennis = the boy playing tennis(テニスをしている男の子)\na car which was made in Japan = a car made in Japan(日本で作られた車)\nつまり、進行形の文(The boy is playing tennis.)から be動詞を取ると現在分詞、受動態の文(The car was made in Japan.)から be動詞を取ると過去分詞の形になります。' }
    ],
    terms: [['分詞', '現在分詞(ing形)と過去分詞をまとめた呼び名'], ['現在分詞', 'ing形。名詞を説明するときは「〜している」'], ['過去分詞', '名詞を説明するときは「〜される・〜された」'], ['形容詞的用法', '分詞が名詞を説明する使い方']],
    miss: ['2語以上なのに名詞の前に置く(× a playing tennis boy → ○ a boy playing tennis)。', 'する側・される側を逆にする(× a breaking window → ○ a broken window)。', '主語が長くなって動詞の形をまちがえる(× The boy playing tennis are 〜)。', '「わくわくさせる」exciting と「(人が)わくわくした」excited を取りちがえる(The game was exciting. / I was excited.)。'],
    sum: ['名詞が「する側」なら ing形、「される側」なら過去分詞。', '分詞1語なら名詞の前、2語以上なら名詞の後ろ。', '名詞 + 分詞のかたまり全体が、1つの名詞の働きをする。', '「関係代名詞 + be動詞」を取ると、分詞の形になる。']
  };
  L.e_m8 = {
    goal: '関係代名詞(who・which・that)を使って名詞を後ろから説明し、主格と目的格を見分けられるようになる。',
    intro: '「カナダに住んでいる友だち」「私がきのう買った本」。日本語では説明が名詞の前にきますが、英語では【名詞の後ろに文をつなげて説明】します。そのつなぎ役が【関係代名詞】です。判断は「説明される名詞は人か物か」「後ろの文で何が欠けているか」の2段階です。',
    secs: [
      { h: '関係代名詞のはたらき', t: '2つの文を1つにまとめて、名詞を後ろからくわしく説明します。\nI have a friend. + He lives in Canada.\n→ I have a friend who lives in Canada.(私にはカナダに住んでいる友だちがいます。)\n説明される名詞(ここでは a friend)を【先行詞】といいます。who 以下が a friend を説明しています。\n関係代名詞は、2つ目の文の he のかわりになっています。だから、後ろの文から he は消えます。' },
      { h: '主格の who・which・that', t: '関係代名詞が、後ろの文の【主語】のかわりをするものを【主格】といいます。後ろにはすぐ動詞がきます。\n先行詞が人 → 【who】(that も可)\nThe man who is talking with Ken is our teacher.(ケンと話している男性は私たちの先生です。)\n先行詞が物・動物 → 【which】(that も可)\nThis is a bus which goes to the station.(これは駅へ行くバスです。)\n後ろの動詞の形は、先行詞に合わせます。a friend who lives(先行詞が単数なので s がつく)/friends who live(複数なので s なし)',
        ex: [{ q: '( )に入る語は? (1) I have a friend (   ) lives in Canada. (2) Look at the dog (   ) is running over there.', steps: ['(1) 先行詞 a friend は人。後ろがすぐ動詞 lives → 主格 → who。', '(2) 先行詞 the dog は動物。後ろがすぐ動詞 is → 主格 → which(that も可)。'], a: '(1) who(私にはカナダに住んでいる友だちがいます。) (2) which(あそこで走っている犬を見て。)' }] },
      { h: '目的格の which・that と省略', t: '関係代名詞が、後ろの文の【目的語】のかわりをするものを【目的格】といいます。後ろには「主語 + 動詞」が続き、動詞の目的語がぬけています。\nThis is the book. + I bought it yesterday.\n→ This is the book which(that) I bought yesterday.(これは私がきのう買った本です。)\nbought の後ろにあった it は、which になって前に移動したので、もう書きません。\n先行詞が人のときは that を使います:The girl that I met yesterday was kind.(私がきのう会った女の子は親切でした。)\n【目的格の関係代名詞は省略できます】:This is the book I bought yesterday.\n見分け方:関係代名詞の後ろが「動詞」で始まれば主格(省略できない)、「主語 + 動詞」なら目的格(省略できる)。',
        ex: [{ q: '2つの文を、関係代名詞を使って1つにしよう。This is the picture. + My father took it in Kyoto.', steps: ['先行詞は the picture(物)。', 'it は took の目的語 → 目的格 → which(that)。', 'it を which にかえて、the picture の直後に置く。it は書かない。'], a: 'This is the picture which(that) my father took in Kyoto.(これは父が京都でとった写真です。)※which・that は省略して This is the picture my father took in Kyoto. としてもよい。' }] },
      { h: 'whose と that のよく使う場面', t: '【whose】「その〜の」と持ち主を表します(発展)。\nI know a girl whose father is a pilot.(私は、お父さんがパイロットをしている女の子を知っています。)→ a girl の father\n【that がよく使われる場面】先行詞に the first・the only・最上級・all・every などがつくときや、先行詞が「人と物(動物)」の両方のとき。\nThis is the best movie that I have ever seen.(これは私が今までに見た中で一番よい映画です。)\nAll that glitters is not gold.(光るもの必ずしも金ならず。)のようなことわざもあります。' }
    ],
    terms: [['関係代名詞', '名詞の後ろに文をつなげて説明するつなぎのことば'], ['先行詞', '関係代名詞が説明する名詞'], ['主格', '関係代名詞が後ろの文の主語のかわり。後ろはすぐ動詞'], ['目的格', '関係代名詞が後ろの文の目的語のかわり。後ろは「主語 + 動詞」。省略できる']],
    miss: ['目的格なのに、後ろの文に目的語を残す(× the book which I bought it)。', '先行詞と動詞の形を合わせない(× a friend who live)。', '先行詞が人なのに which を使う。', '主格の関係代名詞を省略する(× I have a friend lives in Canada.)。'],
    sum: ['先行詞が人なら who、物なら which、that はどちらにも使える。', '後ろがすぐ動詞なら主格、「主語 + 動詞」なら目的格。', '目的格は省略できる。主格は省略できない。', '関係代名詞のかわりになった語は、後ろの文から消す。']
  };
  L.e_indq = {
    goal: '疑問文を文の中に入れた「間接疑問文」を、「疑問詞 + 主語 + 動詞」の語順で正しく作れるようになる。',
    intro: '「彼はどこに住んでいますか。」をそのまま聞くかわりに、「彼がどこに住んでいるか知っていますか。」と聞くこともあります。このように、疑問文が別の文の一部になったものを【間接疑問文】といいます。最大のポイントは、【文の中に入ると、ふつうの文の語順にもどる】ことです。',
    secs: [
      { h: '間接疑問文の語順', t: 'Where does he live?(彼はどこに住んでいますか。)\n→ Do you know where he lives?(彼がどこに住んでいるか知っていますか。)\n文の中に入った疑問文は、【疑問詞 + 主語 + 動詞】のふつうの語順になります。\ndo・does・did はなくなり、動詞は主語や時制に合った形にもどります。上の例では、does にふくまれていた3単現の s が live にもどって lives になります。' },
      { h: '作り方の手順', t: '①元の疑問文から疑問詞を取り出す。\n②残りを「主語 + 動詞」のふつうの文の語順にする(do・does・did は消し、動詞の形を直す)。\n③know・tell me・ask などの後ろに「疑問詞 + 主語 + 動詞」を置く。\nbe動詞の文:What is this? → I don\'t know what this is.(これが何なのか分かりません。)\n一般動詞の過去の文:When did she come? → Tell me when she came.(彼女がいつ来たか教えてください。)\n助動詞の文:What can I do? → I don\'t know what I can do.(私に何ができるか分かりません。)',
        ex: [{ q: '2つの文を1つにしよう。I know. + Where does Ken live?', steps: ['疑問詞 where を取り出す。', '残り does Ken live を「主語 + 動詞」にする。does を消し、Ken が3人称単数なので live → lives。', 'I know の後ろに where Ken lives を置く。'], a: 'I know where Ken lives.(私はケンがどこに住んでいるか知っています。)' }] },
      { h: '疑問詞が主語のとき・疑問詞のかたまり', t: '【疑問詞が主語】のときは、元の疑問文がもともと「疑問詞(主語) + 動詞」の語順なので、そのまま入れます。\nWho broke the window? → I know who broke the window.(だれが窓を割ったか知っています。)\n【How many 〜・What time などのかたまり】は、かたまりのまま前に置きます。\nHow many books does he have? → I know how many books he has.(彼が何冊本を持っているか知っています。)\nWhat time is it? → Do you know what time it is?(今何時か分かりますか。)',
        ex: [{ q: '日本文に合うように[ ]の語を並べかえよう。「この本がいくらか教えてください。」 Please tell me [ is / much / this book / how ].', steps: ['元の疑問文は How much is this book?。', 'How much はかたまりのまま前に置く。', '残りを「主語(this book) + 動詞(is)」の順にする。'], a: 'Please tell me how much this book is.' }] },
      { h: '文全体の形(肯定・否定・疑問)', t: '文全体が肯定文・否定文・疑問文のどれになるかは、【外側の文】で決まります。中の「疑問詞 + 主語 + 動詞」の部分は変わりません。\n【肯定文】I know where he lives.(私は彼がどこに住んでいるか知っています。)\n【否定文】I don\'t know where he lives.(私は彼がどこに住んでいるか知りません。)\n【疑問文】Do you know where he lives?(彼がどこに住んでいるか知っていますか。)\n【答え方】外側の Do you know 〜? に答えるので、Yes, I do. / No, I don\'t. で答えます。\n文の最後の記号も外側で決まります。I don\'t know 〜 は「.」、Do you know 〜 は「?」です。' }
    ],
    terms: [['間接疑問文', '疑問文が別の文の一部になったもの'], ['語順', '間接疑問文の中は「疑問詞 + 主語 + 動詞」'], ['外側の文', 'I know・Do you know などの部分。文全体の形を決める']],
    miss: ['疑問文の語順のまま入れる(× Do you know where does he live?)。', 'does を消したのに s をつけ忘れる(× where he live → ○ where he lives)。', '疑問詞が主語なのに do を入れる(× I know who did break 〜)。', 'Do you know 〜? に、中の内容だけで答えて Yes・No を言わない。'],
    sum: ['間接疑問文の中は「疑問詞 + 主語 + 動詞」。', 'do・does・did は消し、動詞の形を主語・時制に合わせる。', '疑問詞が主語なら、そのままの語順で入れる。', '文全体の形と最後の記号は、外側の文で決まる。']
  };

  // ===== 中学英単語 =====
  L.e_vocab_m = {
    goal: '中学英単語を、2段階の確認とくり返しで効率よく覚え、品詞・語形変化・反対語などで整理して使えるようになる。',
    intro: '中学校で学ぶ英単語は、およそ1600〜1800語です。一度に全部覚えようとすると、すぐに忘れてしまいます。大切なのは【少しずつ、何度も】見ることと、ばらばらに覚えずに【仲間ごとに整理する】ことです。この単元では、忘れにくい覚え方を紹介します。',
    secs: [
      { h: '覚え方は「2段階」と「くり返し」', t: '単語は次の2段階で確認します。\n①英語を見て、意味が言える(読める)\n②意味を見て、英語が言える・書ける(使える)\n①ができても②ができないことはよくあります。両方を確認しましょう。\n人は覚えたことを時間とともに忘れていきます。1日目に覚えたら、次の日、3日後、1週間後と、間をあけて何度も見直すと記憶に残りやすくなります。\nまた、【音を聞いて、声に出す】こと、【例文の中で覚える】ことも効果的です。I\'m hungry.(おなかがすいた。)のように、短い文ごと覚えると使い方も身につきます。' },
      { h: '品詞で整理する', t: '単語は働きによって【品詞】に分けられます。\n【名詞】もの・人・ことの名前:book、teacher、music\n【動詞】動作・状態:run、eat、know\n【形容詞】名詞のようす:big、happy、beautiful\n【副詞】動詞や形容詞をくわしくする:fast、very、slowly\n語尾が品詞の目じるしになることがあります。\n・-tion・-ment・-ness は名詞が多い:information(情報)、kindness(親切)\n・-ful・-ous は形容詞が多い:useful(役に立つ)、famous(有名な)\n・-ly は副詞が多い:quickly(すばやく)、slowly(ゆっくりと)(ただし friendly(親しみやすい)は形容詞)\n同じ仲間の語をまとめて覚えると、1語から何語も広がります。happy(幸せな)→ happily(幸せに)→ happiness(幸せ)' },
      { h: '形が変わる単語', t: '【名詞の複数形】ふつうは s。不規則なものに注意します。\nbox → boxes、city → cities、child → children、man → men、woman → women、foot → feet、tooth → teeth、leaf → leaves\n【不規則動詞】原形 ― 過去形 ― 過去分詞 をセットで声に出して覚えます。\ngo ― went ― gone/see ― saw ― seen/take ― took ― taken/buy ― bought ― bought/think ― thought ― thought/teach ― taught ― taught\n【形容詞の比較変化】good ― better ― best/bad ― worse ― worst',
        ex: [{ q: '次の名詞を複数形にしよう。(1) child (2) dictionary (3) foot', steps: ['(1) child は不規則に変わる → children。', '(2) dictionary は「子音字 r + y」で終わる → y を i にかえて es → dictionaries。', '(3) foot は不規則に変わる → feet。'], a: '(1) children (2) dictionaries (3) feet' }] },
      { h: 'セットで覚える:反対語・同じ発音の語', t: '【反対の意味の語】はペアで覚えると2倍速く覚えられます。\nlong(長い)⇔ short(短い)/old(古い・年をとった)⇔ new(新しい)・young(若い)/easy(やさしい)⇔ difficult(むずかしい)/buy(買う)⇔ sell(売る)/borrow(借りる)⇔ lend(貸す)/remember(覚えている)⇔ forget(忘れる)\n【発音が同じでつづりがちがう語】は、つづりと意味をしっかり区別します。\nhear(聞く)/here(ここに)、know(知っている)/no(いいえ)、write(書く)/right(右・正しい)、meet(会う)/meat(肉)、son(息子)/sun(太陽)\n【つづりをまちがえやすい語】February(2月)、Wednesday(水曜日)、library(図書館)、beautiful(美しい)。曜日と月の名前は、文の途中でも大文字で書き始めます。',
        ex: [{ q: '( )に、前の語と反対の意味の語を入れよう。(1) This question is not easy. It is (   ). (2) Can you lend me your pen? — Sure. You can (   ) it.', steps: ['(1) easy(やさしい)の反対は difficult(むずかしい)。', '(2) lend は「貸す」。相手の立場から言うと「借りる」なので borrow。'], a: '(1) difficult(この問題はやさしくない。むずかしい。) (2) borrow(ペンを貸してくれる?— いいよ。借りていいよ。)' }] }
    ],
    terms: [['品詞', '名詞・動詞・形容詞・副詞など、単語の働きによる分類'], ['複数形', '2つ・2人以上を表す名詞の形'], ['不規則動詞', '過去形・過去分詞が ed にならない動詞'], ['反対語(反意語)', '意味が反対になる語のペア']],
    miss: ['英語 → 意味の確認だけで終わり、意味 → 英語(書ける)の確認をしない。', '一度覚えたら見直さず、すぐ忘れてしまう。', 'borrow(借りる)と lend(貸す)を取りちがえる。', 'hear と here、write と right のように、発音が同じ語のつづりをまちがえる。'],
    sum: ['「見て意味が言える」→「意味から英語が言える」の2段階で確認する。', '間をあけて何度も見直す。音と例文もいっしょに。', '品詞・語形変化・反対語など、仲間ごとに整理して覚える。', '曜日・月は大文字で始める。']
  };

  // ===== 難関:中学英語の並べかえ =====
  L.ex_jh3 = {
    goal: '並べかえ問題で、主語と動詞を先に決め、名詞の後置修飾・不定詞・間接疑問などの語順の型を使って、正しい英文を組み立てられるようになる。',
    intro: '並べかえ問題は、ばらばらの語をなんとなく並べると時間ばかりかかります。英語の文には決まった【骨組み(主語 → 動詞 → 目的語・補語 → 場所 → 時)】があり、その上に「名詞を後ろから説明する」「to 〜」「疑問詞 + 主語 + 動詞」などの【型】が乗っています。骨組みと型を知っていれば、迷わず並べられます。',
    secs: [
      { h: '並べかえの基本手順', t: '①日本文から【主語】と【動詞】を決める(「だれが」「どうする」)。\n②動詞の後ろに【目的語・補語】を置く。\n③残りの語(場所・時など)を最後に置く。英語では「場所 → 時」の順が基本です。\n④日本文の「〜する(名詞)」「〜された(名詞)」の部分は、名詞の後ろから説明する型を使う。\n⑤最後に、使っていない語・2回使った語がないか、文頭が大文字か、動詞の形(3単現・時制)が合っているかを確認する。\n主語が長いときは要注意です。The boy playing tennis is my brother. のように、主語のかたまりが終わったところに動詞がきます。' },
      { h: '型1:名詞を後ろから説明する', t: '【名詞 + 関係代名詞 + 文】the book which I bought(私が買った本)\n【名詞 + 主語 + 動詞(関係代名詞の省略)】the woman I met yesterday(私がきのう会った女性)\n【名詞 + 分詞 + 語句】the boy sitting on the bench(ベンチにすわっている男の子)/a car made in Japan(日本製の車)\n【名詞 + to + 原形】something to drink(何か飲むもの)\n日本語で名詞の前にある長い説明は、英語では名詞の後ろにきます。',
        ex: [{ q: '日本文に合うように[ ]の語を並べかえよう。「私がきのう会った女性は先生です。」 [ yesterday / the / met / I / woman ] is a teacher.', steps: ['文全体の主語は「女性」、動詞は is(すでに書いてある)。', '「私がきのう会った」は woman を説明 → 名詞の後ろに「主語 + 動詞」を置く(関係代名詞の省略)。', 'the woman + I met + yesterday の順にし、その後ろに is a teacher。'], a: 'The woman I met yesterday is a teacher.' }, { q: '「ベンチにすわっている男の子はだれですか。」 Who [ on / is / boy / the / sitting ] the bench?', steps: ['疑問詞 Who の後ろに be動詞 is を置く(Who is 〜?)。', '「男の子」はすわっている側 → 現在分詞 sitting。語句がつくので名詞の後ろ。', 'Who is + the boy + sitting on + the bench。'], a: 'Who is the boy sitting on the bench?' }] },
      { h: '型2:不定詞を使う', t: '【It is … (for 人) to 〜】〜することは(人にとって)…だ\nIt is difficult for me to speak English.(英語を話すことは私にとってむずかしい。)\n【want 人 to 〜】人に〜してほしい/【ask 人 to 〜】人に〜するよう頼む/【tell 人 to 〜】人に〜するよう言う\nI want you to help me.(私はあなたに手伝ってほしい。)\n【how to 〜】〜のしかた/【what to 〜】何を〜すべきか\nI don\'t know how to use this computer.(私はこのコンピューターの使い方が分かりません。)\n「人」は to の前、「動作」は to の後ろ、と位置を決めてから並べます。',
        ex: [{ q: '「彼にもう一度来るように頼んでください。」 Please [ him / come / ask / to ] again.', steps: ['Please の後ろは動詞の原形 → ask。', '「人に〜するよう頼む」は ask + 人 + to + 原形。', 'ask + him + to + come の順。'], a: 'Please ask him to come again.' }] },
      { h: '型3:間接疑問・現在完了・比較・SVOC', t: '【間接疑問】疑問詞 + 主語 + 動詞:Do you know when he came to Japan?(彼がいつ日本に来たか知っていますか。)\n【現在完了】ever・never・just・already は have と過去分詞の間:I have never seen such a big fish.(私はそんなに大きな魚を一度も見たことがありません。)\n【比較】one of the + 最上級 + 複数名詞:Tokyo is one of the largest cities in the world.(東京は世界で最も大きな都市の1つです。)\n【the + 最上級 + 名詞 + (that) I have ever + 過去分詞】今までに〜した中で一番…な(名詞)\n【make・call + 目的語 + 補語】The news made me happy.(その知らせは私を幸せにした。)/We call him Ken.(私たちは彼をケンと呼びます。)',
        ex: [{ q: '「彼がいつ日本に来たか知っていますか。」 Do [ when / came / he / know / you ] to Japan?', steps: ['外側の文は Do you know 〜?。', '間接疑問は「疑問詞 + 主語 + 動詞」→ when he came。did は使わず、過去形 came を使う。', 'Do you know + when he came + to Japan?'], a: 'Do you know when he came to Japan?' }, { q: '「これは私が今までに読んだ中で一番おもしろい本です。」 This is [ have / book / I / interesting / the / most / ever ] read.', steps: ['interesting は長い語 → 最上級は the most interesting。その後ろに名詞 book。', '「私が今までに読んだ」は book を後ろから説明(関係代名詞 that の省略)→ I have ever read。', 'ever は have と過去分詞 read の間。'], a: 'This is the most interesting book I have ever read.' }] }
    ],
    terms: [['後置修飾', '名詞を後ろから説明すること(関係代名詞・分詞・不定詞)'], ['間接疑問', '文の中の疑問文。「疑問詞 + 主語 + 動詞」の語順'], ['SVOC', '「目的語 = 補語」の関係がある文(make me happy など)'], ['want 人 to 〜', '「人に〜してほしい」。人は to の前']],
    miss: ['主語のかたまりを見落とし、途中に動詞を置いてしまう。', '間接疑問を疑問文の語順にする(× when did he come)。', 'want to you help のように、人と to の位置を逆にする。', 'ever・never を文の最後に置く(have と過去分詞の間に置く)。'],
    sum: ['まず主語と動詞を決め、「主語 → 動詞 → 目的語・補語 → 場所 → 時」で並べる。', '日本語で名詞の前にある長い説明は、英語では名詞の後ろ。', '人 + to + 原形、疑問詞 + 主語 + 動詞 などの型を使う。', '最後に、語の数・大文字・動詞の形を確認する。']
  };
})(WPS.LESSONS);
