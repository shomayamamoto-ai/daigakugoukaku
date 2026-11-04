/* テキスト拡充・第2弾(担当:高校英語 23単元) */
(function (L) {
  function add(id, o) { var x = L[id]; if (!x) return; ['rx', 'essay', 'test'].forEach(function (k) { if (o[k]) x[k] = (x[k] || []).concat(o[k]); }); if (o.link) x.link = o.link; }

  /* ===== e_h1 文型 ===== */
  add('e_h1', {
    rx: [
      { err: 'He remained a good friend of mine. の a good friend を、「〜を」と訳せそうなので O だと決めてしまう。日本語の助詞「を」「に」で O か C かを判断するくせ。', why: '日本語の「〜を」「〜に」と、英語の O・C は1対1で対応していません。訳語の助詞で決めると、同じ形の文でも判定がゆれてしまいます。', fix: '名詞が O か C か迷ったら、【S = その名詞】が成り立つかを確かめます。成り立てば C(SVC)、成り立たず「S が その名詞に何かをする」関係なら O(SVO)です。', q: '下線部は O か C か答えよう。\n(1) He remained 【a good friend of mine】.\n(2) He met 【a good friend of mine】.', a: '(1) C (2) O', exp: '(1) は「彼 = 私のよい友人」が成り立ち、remain は「〜のままである」という SVC の動詞なので C です。(2) は「彼 = 友人」ではなく、彼が友人に「会った」ので O です。動詞と S = C の関係で決めます。' },
      { err: 'The way she spoke to the children made everyone smile. を読むとき、最初に出てきた動詞 spoke を文全体の V だと思いこむ。', why: '「最初の動詞が V」という読み方は短い文では当たりますが、主語の中に関係詞節などが入ると、その中の動詞が先に出てきます。主語の範囲を決めずに読むくせが原因です。', fix: '動詞に印をつけて数え、【接続詞・関係詞の数 + 1 = 動詞の数】になっているか確かめます。(省略された関係詞にも注意します。)主語の中の動詞をかっこでくくると、残った動詞が文の V です。', q: '次の文の V(文全体の動詞)と文型を答えよう。\nThe way she spoke to the children made everyone in the room smile.', a: 'V は made。第5文型(SVOC)。', exp: 'she spoke to the children は the way を説明する部分(関係詞が省略された形)で、主語は The way … children までです。made everyone smile は O = everyone、C = smile(原形)の SVOC です。' },
      { err: 'There is two cats under the table. のように、There を主語だと考えて、be動詞を There に合わせてしまう。', why: 'ふつうの文では文頭が主語なので、There 構文でも同じように考えてしまいます。実際の主語は be動詞の後ろの名詞です。', fix: 'There 構文では、【be動詞の後ろの名詞】に線を引き、その数で is / are を決めます。疑問文 Are there …? の語順になることも、後ろの名詞が主語である証拠です。', q: '( ) に is か are を入れよう。\nThere ( ) some students waiting outside the gym.', a: 'are', exp: '主語は some students(複数)なので are です。There は「そこに」という意味がほとんどない語で、主語の位置を後ろに回すための目印です。waiting outside the gym は students を説明しています。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「この本を読めば、歴史がずっと身近に感じられるようになるだろう。」', limit: '英訳せよ(1文で)', hint: '「この本を読めば」を主語にして、【無生物主語 + make O C】の形にすると、1文で引きしまった英文になります。C には原形 feel を使えます。', model: 'This book will make history feel much closer to you.\n(別解:Reading this book will make you feel that history is much closer to you.)', points: [['無生物主語(This book / Reading this book)で文を組み立てている', 3], ['make O 原形(feel)または make O C の形が正しい', 3], ['「ずっと身近に」を比較級の強調(much closer)などで表している', 2], ['時制(will)・つづりなど文法の誤りがない', 2]], ng: 'If you read this book, you can feel history closely. のように closely(副詞)を使うと「近くで感じる」という別の意味になり、「身近に感じられる」が伝わりません。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nShe looks ( ) today.', choices: ['happily', 'happy', 'happiness', 'to be happily'], a: 'B(happy)', exp: 'look は「〜に見える」という SVC の動詞なので、C には形容詞が入ります。副詞の happily は C になれません。' },
      { q: '次の文の文型を答えよう。\nThe baby slept peacefully on the sofa.', a: '第1文型(SV)', exp: 'S = The baby、V = slept で文が完成しています。peacefully(副詞)と on the sofa(前置詞 + 名詞)はどちらも M です。' },
      { q: '( ) に入る前置詞を選ぼう。\nMy father cooked us dinner.\n= My father cooked dinner ( ) us.', choices: ['to', 'for', 'of', 'with'], a: 'B(for)', exp: 'cook は「(人のために)作ってあげる」動詞なので for を使います。give・send など「相手に届ける」動詞は to、cook・buy・make など「相手のためにする」動詞は for です。' },
      { q: '次の文の誤りを直そう。\nThe plane reached to Narita on time.', a: 'reached to → reached(reached Narita)', exp: 'reach は「〜に着く」という他動詞なので、前置詞なしで目的語をとります。同じ意味の arrive は自動詞なので arrive at / in が必要です。' },
      { q: '文型を答え、和訳しよう。\nWe found the new manager very reliable.', a: '第5文型(SVOC)。私たちは、新しい部長がとても信頼できると分かった。', exp: 'O = the new manager、C = very reliable で、「部長 = 信頼できる」の関係があります。find O C は「O が C だと分かる・思う」です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nPlease keep the windows ( ) while the air conditioner is on.', choices: ['closed', 'closing', 'close to', 'to close'], a: 'A(closed)', exp: 'keep O C で「O を C の状態にしておく」。窓は「閉められた」状態なので過去分詞 closed です。the windows are closed の関係が成り立ちます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe ( ) his bag on the table and sat down.', choices: ['lay', 'laid', 'lied', 'lain'], a: 'B(laid)', exp: '「〜を置く」は他動詞 lay(lay-laid-laid)です。自動詞 lie(横になる)は lie-lay-lain なので、lay は lie の過去形です。目的語 his bag があるので他動詞を選びます。' },
      { q: '次の文の文型を答え、和訳しよう。\nThe teacher handed each of us a sheet of paper.', a: '第4文型(SVOO)。先生は私たち一人ひとりに1枚の紙を手渡した。', exp: 'O₁ = each of us(人)、O₂ = a sheet of paper(物)です。hand は「手渡す」という動詞で、give と同じく SVOO をとれます。' },
      { q: '次の文を、人を主語にしてほぼ同じ意味の文に書きかえよう。\nWhat made you change your mind?', a: 'Why did you change your mind?', exp: '無生物主語 What + make O 原形 は「何があなたに考えを変えさせたのか」=「なぜ考えを変えたのか」です。日本語に訳すときも、理由をたずねる自然な形に直します。' },
      { q: '文型を答え、和訳しよう。\nThe professor considered it his duty to answer every e-mail from his students.', a: '第5文型(SVOC)。その教授は、学生からのすべてのメールに返事をすることを自分の義務だと考えていた。', exp: 'it は形式目的語で、本当の目的語は to answer … students です。C = his duty で、「メールに返事をすること = 自分の義務」の関係があります。長い O を後ろに回すために it を置いています。' }
    ],
    link: {
      prev: '中学で学んだ「主語・動詞・目的語」と、名詞・形容詞・副詞などの品詞の区別が土台です。品詞が分かると、どの語が C や O になれるかが判断できます。',
      next: '文型は、準動詞(C に不定詞・分詞がくる形)、関係詞(節の中の欠けた要素)、長文の下線部和訳や英作文の組み立てに、そのままつながります。',
      cross: [['国語', '日本語は主語を省略しやすく、述語が文の最後に来ます。英語は S と V をはっきり置き、語順で役割を示します。この違いを知ると、和訳や英作文で語順を組みかえる理由が分かります。'], ['情報', 'プログラミング言語にも決まった並び方(構文)があり、コンピュータは「構文解析」で文の構造を読み取ります。英文の文型をとる作業は、人が行う構文解析だといえます。']],
      univ: '大学の言語学では、文の構造を研究する分野を「統語論」といいます。機械翻訳や AI の自然言語処理でも、文のどこが主語でどこが目的語かを見分けることが、正しい訳を作る出発点になっています。',
      readT: '「5文型」はどこから来たのか',
      read: '日本の英語の授業でおなじみの5文型は、イギリスの文法学者 C.T.オニオンズが20世紀の初めに示した分類がもとになったといわれます。日本ではこの考え方が英語教育に広く取り入れられ、今も文の骨組みをつかむ道具として使われています。\nところが、英語圏の学校では5文型という言い方はあまり教えられません。英語を母語とする人は、文の型を意識しなくても語順で意味が分かるからです。\nまた、より詳しい英文法の研究書には、5つでは足りないと考えるものもあります。たとえば She is in the garden. の in the garden や、He put the book on the table. の on the table は、取ると文が成り立ちません。5文型ではこれらを M(修飾語)としますが、実際には動詞にとって欠かせない要素です。そこで「SVA」「SVOA」(A は副詞的な要素)を加えた7つの型で整理する考え方もあります。\n5文型は万能ではありませんが、「動詞が後ろに何を必要とするか」を考える習慣をつけるには、とても役に立つ枠組みです。'
    }
  });

  /* ===== e_pastperf 過去完了 ===== */
  add('e_pastperf', {
    rx: [
      { err: '過去完了を「大過去=ずっと昔のこと」と思いこみ、数分前の出来事には使えないと考えてしまう。', why: '「大過去」という呼び名から、時間が遠いことを表す形だと誤解しやすいからです。過去完了が表すのは時間の遠さではなく、【過去の基準点より前かどうか】です。', fix: '過去完了を見たら「基準点はどこか」「その基準より前か」だけを確かめます。基準の1分前でも10年前でも、前であれば過去完了が使えます。', q: '次の文は正しいか。\nWhen I arrived at 9:00, the meeting had started five minutes earlier.', a: '正しい', exp: '基準点は「私が着いた9時」です。会議が始まったのはその5分前なので、基準より前の出来事として had started が使えます。時間の差が短くても、基準より前なら過去完了です。' },
      { err: 'She had had the same bicycle for ten years. の had had を、印刷のまちがいだと思って1つ読みとばしてしまう。', why: 'had が2つ並ぶ形を見なれていないため、片方を余分だと感じてしまいます。1つ目と2つ目で、はたらきがちがうことに気づいていません。', fix: '1つ目の had は完了形を作る【助動詞】、2つ目の had は本動詞 have(持っている・食べるなど)の【過去分詞】と分けて考えます。have had(現在完了)と同じしくみです。', q: '和訳しよう。\nShe had had the same bicycle for ten years when it was stolen.', a: 'その自転車が盗まれたとき、彼女は同じ自転車を10年間持っていた。', exp: '基準点は「盗まれたとき」です。had had は「(基準点までずっと)持っていた」という継続を表します。1つ目の had が助動詞、2つ目の had が have(持っている)の過去分詞です。' },
      { err: '時制の一致で、主節が過去なら that 節の中を何でも過去完了にしてしまい、今も変わらない事実まで had + 過去分詞にする。', why: '「主節が過去なら1つ前へずらす」という規則を、内容を考えずに機械的に当てはめているからです。', fix: '時制をずらす前に、【その内容が今も正しいか(変わらない事実・習慣か)】を考えます。今も成り立つ事実なら、現在形のままにしてよいと覚えます。', q: '( ) 内の動詞を正しい形にしよう。\nOur teacher told us that light ( travel ) faster than sound.', a: 'travels', exp: '「光は音より速く進む」は今も変わらない科学的な事実なので、時制の一致を受けずに現在形 travels のままにします。had traveled にすると、過去のある時までの出来事のように聞こえてしまいます。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「20年ぶりにその町を訪れると、子どものころに遊んだ公園はすでになくなっていた。」', limit: '英訳せよ', hint: '基準点は「町を訪れたとき(過去)」です。公園がなくなったのはそれより前なので過去完了を使います。「20年ぶりに」は for the first time in twenty years で表せます。', model: 'When I visited the town for the first time in twenty years, I found that the park where I had played as a child had already disappeared.', points: [['「20年ぶりに」を for the first time in twenty years などで正しく表している', 2], ['基準点(訪れたとき)より前の出来事に過去完了 had disappeared を使っている', 3], ['「子どものころに遊んだ公園」を関係詞(where / that … in)で正しく表している', 3], ['冠詞・前置詞など全体の文法の誤りがない', 2]], ng: 'the park has disappeared のように現在完了にすると、基準点が「今」になり、過去に訪れた場面と時がずれてしまいます。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nWhen I called her, she ( ) already gone to bed.', choices: ['had', 'has', 'have', 'was'], a: 'A(had)', exp: '基準点は「電話したとき(過去)」で、寝たのはそれより前なので過去完了 had gone です。already は完了の意味を強めています。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nHe showed me a letter that he ( write ) the night before.', a: 'had written', exp: '手紙を見せた(過去)より前の「前の晩」に書いたので、過去完了 had written です。the night before は「(基準の日の)前の晩」で、過去の基準点を前提にした表現です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI ( ) never been abroad before I entered college.', choices: ['had', 'have', 'was', 'did'], a: 'A(had)', exp: '基準点は「大学に入ったとき」です。その時までの経験を表すので過去完了 had been です。現在完了は基準が「今」のときに使います。' },
      { q: '和訳しよう。\nThe rain had stopped by the time we left the cafe.', a: '私たちがカフェを出るころには、雨はやんでいた。', exp: 'by the time 〜 は「〜するころには(もう)」で、基準点はカフェを出たときです。雨がやんだのはそれより前なので had stopped になっています。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nShe was out of breath because she ( run ) for an hour.', a: 'had been running', exp: '息が切れていた(過去)時点まで1時間ずっと走り続けていたので、過去完了進行形 had been running です。動作が基準点まで続いていたことを表します。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe said that he ( ) the movie the week before.', choices: ['has seen', 'had seen', 'sees', 'will see'], a: 'B(had seen)', exp: '言った(過去)より前の「その前の週」に見たので、had seen です。直接話法なら He said, "I saw the movie last week." となり、last week が the week before に変わります。' },
      { q: '和訳しよう。\nI recognized him at once, though I had not seen him for years.', a: '何年も会っていなかったが、私はすぐに彼だと分かった。', exp: '基準点は「彼だと分かったとき」です。had not seen him for years は、その時までの何年もの間「会っていなかった」という継続を表します。' },
      { q: '次の文の誤りを直そう。\nAfter she has finished her homework, she watched TV.', a: 'has finished → had finished(または finished)', exp: '主節が過去形 watched なので、基準は過去です。現在完了 has finished は基準が「今」の形なので使えません。after で前後が明らかなので、過去形 finished でもかまいません。' },
      { q: '次の日本文を英訳しよう。\n「その手紙を読んで初めて、彼がどれほど苦労していたかを知った。」', a: 'It was not until I read the letter that I realized how hard he had worked.\n(how much he had suffered なども可)', exp: '「〜して初めて」は It was not until 〜 that … で表せます。苦労していたのは「知ったとき」より前から続いていたことなので、過去完了 had worked を使います。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nBy the time the firefighters arrived, the fire ( ) for two hours.', choices: ['had been burning', 'has been burning', 'was burnt', 'burns'], a: 'A(had been burning)', exp: '消防士が着いた(過去)時点まで、火は2時間燃え続けていたので過去完了進行形です。has been burning は基準が「今」なので、arrived と合いません。' }
    ],
    link: {
      prev: '現在完了(have + 過去分詞)のしくみと、過去形の使い方が土台です。過去完了は、現在完了の基準点を「今」から「過去のある時」へ移したものです。',
      next: '未来完了、仮定法過去完了(If I had known …)、時制の一致と話法、完了形の分詞構文(Having done …)で、「基準より前」という同じ考え方が使われます。',
      cross: [['国語', '日本語の「た」は、「昨日食べた」(過去)と「もう食べた」(完了)の両方を表します。英語は過去と完了を形で分けるので、日本語の「た」をそのまま過去形にしないよう注意が必要です。'], ['日本史・世界史', '歴史の文章では、ある出来事を基準にして「それ以前に何が起きていたか」を説明する場面が多くあります。英語の歴史の文章では、そうした部分に過去完了がよく使われます。']],
      univ: '言語学では、時制(テンス)と、動作の完了や継続のとらえ方(アスペクト)を分けて研究します。歴史学や法律の英語文献では、出来事の前後関係を正確に読みとる力が欠かせません。',
      readT: '英語の「時制」はいくつある?',
      read: '学校では「現在・過去・未来」と、それぞれの進行形・完了形・完了進行形を合わせて「12の時制」と整理することがあります。覚えるにはとても便利な整理です。\nところが、多くの言語学者は、英語の時制は【現在と過去の2つだけ】だと考えます。動詞そのものの形が変わって時を表すのは、play と played のような現在形と過去形だけだからです。未来を表す will は、can や may と同じ助動詞の仲間として扱われます。\nでは、完了形や進行形は何なのでしょうか。これらは「相(アスペクト)」と呼ばれ、出来事を「完了したもの」として見るか、「進行中のもの」として見るかという、とらえ方を表すと考えます。\nこの見方では、過去完了は「過去時制」と「完了相」の組み合わせです。had の部分が過去を表し、had + 過去分詞の組み合わせが「基準までに完了している」ことを表します。そう考えると、過去完了が「基準点の移った現在完了」だという説明とも、ぴったり重なります。'
    }
  });

  /* ===== e_futperf 未来完了 ===== */
  add('e_futperf', {
    rx: [
      { err: 'I will have finished the work when you get here. を「私は仕事を終えるだろう」と訳し、「君が着くころには」という基準点を落としてしまう。', why: '未来完了を「未来形の一種」とだけとらえ、【未来の基準点】とセットで使う形だという意識がないからです。', fix: '未来完了を見たら、まず基準点(by 〜 / when 〜 / by the time 〜 など)に線を引き、訳には必ず「〜するころには(もう)」を入れます。', q: '和訳しよう。\nI will have cleaned the whole house when my parents come home.', a: '両親が帰ってくるころには、私は家中の掃除を終えているだろう。', exp: '基準点は「両親が帰ってくるとき」です。未来完了は、その時点で掃除が完了している状態を表します。when 節が時の副詞節なので、come は現在形になっています。' },
      { err: 'By noon, she will have been waiting for three hours. を見て、「正午にはもう待つのを終えている」と考えてしまう。', why: '「完了形=終わったこと」と思いこんでいるためです。完了進行形は、基準点まで【続いてきて、その時点でもまだ続いている】ことを表します。', fix: '完了形に進行形(been 〜ing)がついていたら、「基準点の時点でもまだ続いている」と読みます。終わったかどうかではなく、続いた期間に注目します。', q: '次の文から分かることとして正しいほうを選ぼう。\nBy noon, she will have been waiting for three hours.\n① 正午には待つのを終えている ② 正午の時点でも待ち続けている', a: '②', exp: '未来完了進行形は、基準点(正午)まで3時間待ち続け、その時点でも待っていることを表します。「正午で3時間待ったことになる」という継続の期間に重点があります。' },
      { err: 'already を入れるとき、They already will have left. のように、助動詞の前に置いてしまう。', why: 'already の位置を「動詞の前」とだけ覚えていて、助動詞が2つ以上ある文での位置を意識していないからです。', fix: 'already・never・always などの副詞は、原則として【最初の助動詞の後ろ】に置きます。will already have left が基本の形です。', q: 'already を正しい位置に入れよう。\nThey will have left by then.', a: 'They will already have left by then.(will have already left も可)', exp: '頻度・完了を表す副詞は最初の助動詞(will)の後ろに置くのが基本です。have の後ろに置く will have already left も、実際にはよく使われます。will の前には置きません。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「来年の春で、私たちがこの研究を始めてからちょうど10年になるが、それまでに答えが見つかっているかどうかは、だれにも分からない。」', limit: '英訳せよ', hint: '前半は未来の基準点(来年の春)までの継続なので未来完了(進行形)を使います。後半の「〜かどうか」は know の目的語になる名詞節なので、未来のことは will を使って表します。', model: 'By next spring, we will have been working on this research for exactly ten years, but nobody knows whether we will have found the answer by then.', points: [['「来年の春で〜年になる」を By next spring + 未来完了(進行形)で表している', 3], ['for exactly ten years など、期間を正しく表している', 2], ['「〜かどうか」を whether / if の名詞節で表し、未来のことに will を使っている', 3], ['語順・時制など全体の文法の誤りがない', 2]], ng: 'whether we find the answer のように名詞節を現在形にすると、時・条件の副詞節の規則を名詞節にまで当てはめた誤りになります。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nI ( ) this report by five o\'clock.', choices: ['will have finished', 'have finished', 'had finished', 'finish'], a: 'A(will have finished)', exp: 'by five o\'clock(5時までに)が未来の基準点なので、未来完了 will have finished です。' },
      { q: '( ) に by か until を入れよう。\nYou must hand in the form ( ) Friday.', a: 'by', exp: '「金曜日までに提出する」は期限なので by です。until は「金曜日までずっと」のように、その時まで続く状態に使います。' },
      { q: '和訳しよう。\nWe will have lived here for ten years next month.', a: '来月で、私たちはここに10年住んでいることになる。', exp: '基準点は next month(来月)で、そこまでの継続を未来完了で表しています。「来月で〜年になる」と訳すと自然です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe movie ( ) by the time we get to the theater.', choices: ['will have started', 'has started', 'started', 'had started'], a: 'A(will have started)', exp: '映画館に着く(未来)ころには、映画はもう始まっているという意味なので未来完了です。by the time 節の中は現在形 get になっています。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nWhen you wake up tomorrow morning, I ( leave ) Japan.', a: 'will have left', exp: '「君が明日の朝起きるころには、私はもう日本をたっているだろう」という未来の完了です。when 節(副詞節)は現在形 wake up、主節が未来完了です。' },
      { q: '次の日本文を英訳しよう。\n「来年の今ごろには、兄は大学を卒業しているだろう。」', a: 'By this time next year, my brother will have graduated from university.', exp: '「来年の今ごろには」は by this time next year です。その時点で卒業が完了していることを未来完了で表します。graduate from 〜 の from を落とさないようにします。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nDon\'t call me at nine tonight. I ( ) dinner with my family then.', choices: ['will be having', 'will have had', 'have had', 'had'], a: 'A(will be having)', exp: '「今夜9時には家族と夕食をとっている最中だ」なので未来進行形です。will have had だと「9時にはもう食べ終えている」となり、電話をしないでほしい理由になりません。' },
      { q: '( ) に入る最も適切なものを選ぼう。\n( ) the end of this month, the old shop will have closed.', choices: ['By', 'Until', 'Since', 'For'], a: 'A(By)', exp: '「今月末までには閉店しているだろう」は期限を表すので By です。Since は過去の起点、For は期間に使います。' },
      { q: '和訳し、will have heard の意味を説明しよう。\nYou will have heard the news by now, I suppose.', a: '君はもうその知らせを聞いているだろうね。(未来のことではなく、「今ごろはもう〜しただろう」という現在の完了についての推量)', exp: 'by now(今ごろは)があるので、未来ではなく「今」についての推量です。will には「〜だろう」という推量の意味があり、will have + 過去分詞で「(今までに)〜しただろう」となります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe new library ( ) by the time the next school year begins.', choices: ['will have been built', 'will have built', 'has been built', 'will build'], a: 'A(will have been built)', exp: '図書館は「建てられる」側なので受動態、さらに「新学年が始まるころには」完了しているので未来完了の受動態 will have been built です。' }
    ],
    link: {
      prev: '現在完了・過去完了と、will を使った未来の表し方が土台です。完了形は、基準点を「今・過去・未来」のどこに置くかが変わるだけで、しくみは同じです。',
      next: '時・条件の副詞節の時制、仮定法、期限や期間を正確に伝える英作文(ビジネスの英語、予定の説明)につながります。',
      cross: [['数学', 'by と until のちがいは、数直線で「ある点までに(1回起これば達成)」と「ある点までの区間ずっと」を区別するのに似ています。区間のはしを含むかどうかを考えるのと同じ感覚です。'], ['家庭・情報', '計画を立てるときは、締め切り(by)と作業期間(for)を分けて考えます。「いつまでに何が終わっているか」を表す未来完了は、計画表や工程表の考え方そのものです。']],
      univ: '仕事のメールや企画書では、By the end of March, we will have completed …(3月末までに〜を完了している予定です)のような表現で、達成の見通しを伝えます。研究計画書でも、期限までの到達点を示すのによく使われます。',
      readT: 'will と shall のふしぎな由来',
      read: '未来を表す will と shall は、もともと未来の意味をもつ語ではありませんでした。\nwill は、古い英語(古英語)の willan という動詞から来ていて、「〜したいと思う・望む」という意味でした。今でも名詞の will には「意志」という意味があり、また「遺言(書)」も will といいます。亡くなった人の「望み」を書いたものだからです。I will help you. の「〜するつもりだ」という意志の意味は、この「望む」の名残です。\n一方 shall は、sculan という動詞から来ていて、「〜する義務がある・〜を借りている」という意味でした。現代でも、契約書や法律の英語では The tenant shall pay the rent …(借り手は家賃を支払うものとする)のように、shall が「義務・決まり」を表すのに使われています。\n「〜したい」「〜すべきだ」という気持ちは、どちらも「まだ起きていないこと」に向いています。そこから少しずつ、単純な未来を表す使い方が広がりました。言葉の意味は、長い時間をかけてこのように変わっていくのです。'
    }
  });

  /* ===== e_tense 時制の総合 ===== */
  add('e_tense', {
    rx: [
      { err: '「when・if の副詞節は現在形」と丸暗記して、過去の話の中でも She promised to call me as soon as she arrives. のように現在形を使ってしまう。', why: 'この規則の本当の意味は「未来のことを、現在形で表す」です。基準が過去に移ると、「過去から見た未来」は過去形で表します。規則の中身ではなく形だけを覚えていることが原因です。', fix: '副詞節の動詞を決めるときは、【主節の時制(基準)】を先に見ます。主節が現在・未来なら現在形、主節が過去(would など)なら過去形にそろえます。', q: '( ) 内の動詞を正しい形にしよう。\nShe promised that she would call me as soon as she ( arrive ) in Paris.', a: 'arrived', exp: '基準は「約束した」過去で、パリに着くのは過去から見た未来です。would call にそろえて、副詞節の中は過去形 arrived にします。will を過去にした would と同じく、現在形も1つ過去へずらします。' },
      { err: 'if 節が名詞節か副詞節かを、文の中での「位置」で決めてしまう(文頭なら副詞節、文の途中なら名詞節など)。', why: '例文で見た位置の印象で判断しているからです。名詞節か副詞節かは位置ではなく、【文の中でのはたらき】で決まります。', fix: 'if 節を取り除いて、残りが文として完成しているかを確かめます。完成していれば副詞節(「もし〜なら」)、動詞の目的語が足りなくなれば名詞節(「〜かどうか」)です。', q: 'if 節は名詞節か副詞節かを答え、( ) 内の動詞を正しい形にしよう。\nI will be very glad if you ( join ) us tomorrow.', a: '副詞節。join', exp: 'if 節を取ると I will be very glad. で文が完成するので副詞節(もし〜なら)です。文の途中にあっても副詞節なので、未来のことでも現在形 join を使います。' },
      { err: 'The shop won\'t open until the owner comes back. を「店主が戻るまで、店は開かないだろう」と訳したあと、「では、戻ったらどうなるのか」まで考えない。', why: 'not … until 〜 を単語ごとに訳しているため、「〜して初めて…する」という、ある時点を境に状態が変わる意味をつかんでいないからです。', fix: 'not … until 〜 は「〜までは…しない=〜して初めて…する」と、2通りに言いかえて確かめます。until 節は時の副詞節なので、未来のことでも現在形です。', q: '和訳しよう。\nThe game won\'t start until all the players arrive.', a: '選手が全員そろうまで、試合は始まらない。(全員がそろって初めて試合が始まる)', exp: 'not … until 〜 は「〜するまで…しない」で、全員がそろった時点で試合が始まることを表します。until 節は時の副詞節なので、未来のことでも arrive と現在形です。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「今度彼女に会ったら、この前のことを謝るつもりだが、彼女が許してくれるかどうかは分からない。」', limit: '英訳せよ', hint: '「今度〜したら」は The next time 〜(接続詞のはたらき)で表せます。この中は時の副詞節なので現在形です。「許してくれるかどうか」は名詞節なので、未来のことに will を使います。', model: 'The next time I see her, I am going to apologize to her for what happened the other day, but I am not sure whether she will forgive me.', points: [['「今度〜したら」を The next time / When … next で表し、節の中を現在形にしている', 3], ['「謝るつもりだ」を be going to / will などで正しく表している(apologize to 人 for 事)', 2], ['「〜かどうか」を whether / if の名詞節にし、will forgive としている', 3], ['「この前のこと」など全体の表現と文法に誤りがない', 2]], ng: 'The next time I will see her のように副詞節に will を入れたり、whether she forgives me と名詞節を現在形にしたりすると、節の種類の区別ができていないと判断されます。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nWait here until I ( ) back.', choices: ['come', 'will come', 'came', 'coming'], a: 'A(come)', exp: 'until 節は時の副詞節なので、未来のこと(私が戻ること)でも現在形 come を使います。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI\'ll be surprised if he ( ) the race.', choices: ['wins', 'will win', 'won', 'win'], a: 'A(wins)', exp: 'if 節を取っても I\'ll be surprised. で文が完成するので条件の副詞節です。未来のことでも現在形 wins です。' },
      { q: '和訳しよう。\nOnce you start the project, you have to finish it.', a: 'いったんその計画を始めたら、最後までやり終えなければならない。', exp: 'once は接続詞で「いったん〜すると」という意味です。時・条件の副詞節を作るので、中の動詞は現在形 start になっています。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nI wonder if it ( be ) sunny tomorrow.', a: 'will be', exp: 'if 節は wonder の目的語で「〜かどうか」という名詞節です。名詞節の中の未来のことは will で表します。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nBy the time she ( ) here, the meeting will have ended.', choices: ['gets', 'will get', 'got', 'has got'], a: 'A(gets)', exp: 'by the time 〜 は時の副詞節を作るので、中は現在形 gets です。主節には未来完了 will have ended が入っています。' },
      { q: '次の日本文を英訳しよう。\n「彼が戻ってきたら、すぐに出発しよう。」', a: 'Let\'s leave as soon as he comes back.', exp: 'as soon as 〜 は時の副詞節なので、未来のことでも comes back と現在形にします。主語が he なので -s を忘れないようにします。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nThe question is when the new station ( open ).', a: 'will open', exp: 'when 節は is の補語になる名詞節(新しい駅がいつ開業するか)です。名詞節なので、未来のことは will で表します。' },
      { q: '( ) 内の動詞を、完了の意味がはっきりするように正しい形にしよう。\nI\'ll return the book after I ( finish ) reading it.', a: 'have finished(finish でもよい)', exp: '「読み終えたら返す」という完了の意味は、副詞節の中では現在完了 have finished で表せます。after があれば順序が明らかなので、finish でもかまいません。' },
      { q: '( ) 内の動詞を正しい形にし、和訳しよう。\nIt will not be long before he ( find ) out the truth.', a: 'finds。まもなく彼は真実を知るだろう。', exp: 'It will not be long before 〜 は「まもなく〜するだろう」という表現です。before 節は時の副詞節なので、未来のことでも現在形 finds になります。' },
      { q: '次の文の誤りを2か所直そう。\nI\'m sure that our team wins the final next Sunday, and I\'ll be very happy when it will.', a: 'wins → will win、when it will → when it does', exp: 'that 節は sure の内容を表す名詞節なので、未来のことは will win です。一方 when 節は時の副詞節なので、will ではなく現在形の代動詞 does(= wins)を使います。' }
    ],
    link: {
      prev: '現在形・未来の表し方と、接続詞(when・if・until など)、名詞節・形容詞節・副詞節という節の種類の区別が土台です。',
      next: '「実際に起こりうる条件(直説法)」と「現実とちがう想像(仮定法)」の区別、関係副詞の形容詞節、英作文での正確な時制選びにつながります。',
      cross: [['数学', '「p ならば q」という条件文では、p が成り立つ場合だけを考えます。英語の条件の副詞節も、「その条件が成り立った場合」を事実のように現在形で表すという点で、数学の条件命題と似た発想です。'], ['国語', '日本語の「雨が降ったら中止です」の「たら」は、過去を表しているわけではありません。英語の副詞節の現在形と同じく、日本語でも条件の部分では、未来の形をわざわざ使わないことに気づくと面白いです。']],
      univ: '契約書や利用規約の英語では、If the buyer fails to pay …(買い手が支払いを怠った場合は)のように、条件の副詞節が多く使われます。プログラミングの if 文も、条件によって処理を分ける考え方です。',
      readT: 'going to が gonna になるまで',
      read: 'be going to は、もともと文字どおり「〜しに行くところだ」という、移動を表す言い方でした。I am going to buy some bread. は、昔は「パンを買いに(どこかへ)向かっている」という意味だったのです。\nパンを買いに向かっている人は、これから買うことになります。そこから「移動」の意味がだんだん薄れ、「これから〜する予定だ」という未来の意味が強くなりました。今では I\'m going to stay home. のように、移動しない場面でも使えます。\nこのように、具体的な意味をもっていた語が、意味を薄めながら文法の道具になっていく変化を、言語学では「文法化」と呼びます。意味が薄れるとよく使われるようになり、発音も短くなります。こうして話し言葉では going to が gonna と発音されるようになりました。want to → wanna、have to → hafta なども同じような変化です。\nただし gonna などはくだけた話し言葉の形なので、試験の英作文では going to と書きましょう。'
    }
  });

  /* ===== e_aux 助動詞と受動態 ===== */
  add('e_aux', {
    rx: [
      { err: 'It might rain this afternoon. を、might が may の過去形なので「午後に雨が降ったかもしれない」と過去のことに訳してしまう。', why: '「might = may の過去形」と形だけで覚えているからです。推量の might は過去を表すのではなく、may より【可能性を低め・控えめに言う】形です。', fix: '推量の might・could を見たら、まず「今・これからのこと」と考えます。過去についての推量なら、might have + 過去分詞の形になっているはずです。', q: '和訳しよう。\nTake an umbrella with you. It might rain this afternoon.', a: '傘を持って行きなさい。午後は雨が降るかもしれないから。', exp: 'this afternoon(今日の午後)というこれからのことについて、「ひょっとすると降るかもしれない」と控えめに推量しています。might は過去の意味ではありません。' },
      { err: 'must not(〜してはいけない)と don\'t have to(〜しなくてよい)を、どちらも「〜しなくてもいい」や「〜してはいけない」と同じ意味にとってしまう。', why: 'must と have to が肯定文ではほぼ同じ意味なので、否定文でも同じだろうと考えてしまうからです。not が否定する範囲がちがうことに気づいていません。', fix: 'must not は「〜しないことが必要」=禁止、don\'t have to は「〜する必要がない」=不要、と not が何を打ち消しているかで区別します。', q: '和訳しよう。\nYou don\'t have to come early, but you must not be late.', a: '早く来る必要はないが、遅刻してはいけない。', exp: 'don\'t have to は「〜する必要はない」(しても、しなくてもよい)、must not は「〜してはいけない」(禁止)です。1つの文に並べると、意味のちがいがよく分かります。' },
      { err: '助動詞をふくむ文を受動態にするとき、The road should repair soon. のように be を落としてしまう。', why: '受動態を「動詞を過去分詞にすること」とだけ考え、【be + 過去分詞】の be が助動詞の後ろでは原形 be として残ることを意識していないからです。', fix: '受動態は必ず「be + 過去分詞」のセットです。助動詞がある文では、【助動詞 + be + 過去分詞】の3つがそろっているかを指で確かめます。', q: '受動態に書きかえよう。\nThey should repair the road soon.', a: 'The road should be repaired soon.', exp: '助動詞 should の後ろは原形なので、be動詞は be になります。should be repaired で「修理されるべきだ」です。by them は、だれがするかが重要でないので省きます。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「彼が約束の時間に遅れるのは珍しい。電車が遅れているのかもしれないし、約束を忘れてしまったのかもしれない。」', limit: '英訳せよ', hint: '「遅れているのかもしれない」は今のことへの推量なので may / might + 原形、「忘れてしまったのかもしれない」は過去のことへの推量なので may / might have + 過去分詞を使います。', model: 'It is unusual for him to be late for an appointment. His train may be running late, or he might have forgotten about it.', points: [['「彼が遅れるのは珍しい」を It is unusual for him to … などで正しく表している', 2], ['現在の推量を may / might + 原形(be running late など)で表している', 3], ['過去の推量を may / might have + 過去分詞で表している', 3], ['全体の語法・文法に誤りがない', 2]], ng: 'He may forget the appointment. のように過去の推量を may + 原形で書くと、「(これから)忘れるかもしれない」という意味になり、時がずれます。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nThat ( ) be Tom. He is in London now.', choices: ["can't", 'must', 'may', 'should'], a: "A(can't)", exp: 'トムは今ロンドンにいるので「あれがトムのはずがない」です。強い否定の推量は can\'t を使います。' },
      { q: '( ) に1語を入れよう。\nYou ( ) better see a doctor.', a: 'had', exp: 'had better + 原形で「〜したほうがよい(そうしないと困る)」です。目上の人には強く聞こえることがあるので、使う相手に注意します。' },
      { q: '和訳しよう。\nHe must have left his bag on the train.', a: '彼は電車にかばんを置き忘れたにちがいない。', exp: 'must have + 過去分詞で「〜したにちがいない」という過去への強い推量です。' },
      { q: '受動態に書きかえよう。\nWe can see the tower from here.', a: 'The tower can be seen from here.', exp: '助動詞 can の後ろに be + 過去分詞を置きます。主語が一般の人(we)なので、by us は省くのがふつうです。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nYou ( ) have told me earlier. Then I could have helped you.', choices: ['should', 'must', "can't", "needn't"], a: 'A(should)', exp: 'should have + 過去分詞で「〜すべきだったのに(しなかった)」という非難・後悔を表します。後ろの文から、実際には教えてもらえなかったことが分かります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI would rather ( ) at home today.', choices: ['stay', 'to stay', 'staying', 'stayed'], a: 'A(stay)', exp: 'would rather + 原形で「(どちらかといえば)〜したい」です。would rather は助動詞のはたらきをするので、後ろは原形です。' },
      { q: '和訳しよう。\nYou may well be surprised at the news.', a: '君がその知らせに驚くのも、もっともだ。', exp: 'may well + 原形は「〜するのももっともだ」または「たぶん〜だろう」という意味です。ここでは驚くのが当然だという意味で使われています。' },
      { q: '受動態に書きかえよう。\nI saw her enter the building.', a: 'She was seen to enter the building.', exp: '知覚動詞 see + O + 原形を受動態にすると、原形が to 不定詞に変わります。進行中の動作に注目して She was seen entering the building. とすることもできます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe ( ) have been at the party yesterday; I was with him all day.', choices: ["can't", 'must', 'should', 'would'], a: "A(can't)", exp: '「私は一日中彼と一緒にいた」ので、パーティーにいたはずがありません。過去への強い否定の推量は can\'t have + 過去分詞です。' },
      { q: '和訳しよう。\nYou might as well throw your money away as lend it to him.', a: '彼にお金を貸すくらいなら、捨てるほうがましだ。', exp: 'might as well A as B は「B するくらいなら A するほうがましだ」です。貸してもどうせ返ってこない、という皮肉をこめた言い方です。' }
    ],
    link: {
      prev: '中学で学んだ can・must・may・should の基本の意味と、受動態(be + 過去分詞)、現在完了(have + 過去分詞)の形が土台です。',
      next: '仮定法(would have・could have)、提案・要求の that 節の should、話法の転換、英作文での控えめな言い方(ヘッジ)につながります。',
      cross: [['古文', '古文にも「む(〜だろう)」「らむ(今ごろ〜しているだろう)」「けむ(〜しただろう)」という推量の助動詞があります。「けむ」は過去への推量で、英語の may have + 過去分詞と役割がよく似ています。'], ['数学', '確率では、起こる可能性の大きさを0から1の数で表します。助動詞の must・may・might は、話し手が感じている可能性の大きさを、ことばで段階的に表しているといえます。']],
      univ: '科学論文では、This result may suggest …(この結果は〜を示しているかもしれない)のように、助動詞で主張の強さを調整します。法律や規則の英語では must や shall が義務を表し、意味の取りちがえが大きな問題になることもあります。',
      readT: 'can はもともと「知っている」だった',
      read: '助動詞の多くは、昔はふつうの動詞でした。can は、古英語の cunnan という動詞から来ていて、「知っている」という意味でした。「やり方を知っている」から「〜できる」という意味が生まれたのです。cunning(ずる賢い。もとは「知識のある」)という語も、同じ仲間だと考えられています。\ncould の l は発音しませんね。じつは could には、もともと l の文字はありませんでした。should や would には古くから l があったため、それに形をそろえて、後から l が書き加えられたといわれています。\nmay も、古くは「力がある・できる」という意味の動詞でした。名詞の might(力)は、may と同じ根っこから来たことばです。\nmust は、もともとは別の動詞の過去形でした。今では現在のことにも使いますが、must に過去形がなく、過去を表すときは had to を使うのは、この歴史と関係があります。'
    }
  });

  /* ===== e_inf 不定詞・動名詞・分詞 ===== */
  add('e_inf', {
    rx: [
      { err: '「彼が書いた手紙」を a written by him letter のように、2語以上のかたまりになった分詞まで名詞の前に置いてしまう。', why: '日本語では修飾語がどんなに長くても名詞の前に置くため、その感覚のまま英語を組み立ててしまうからです。', fix: '分詞が【1語だけなら名詞の前】、【ほかの語を連れて2語以上なら名詞の後ろ】と決めます。書いたあと、名詞の後ろに「どんな〜かの説明」が続いているかを確かめます。', q: '( ) 内の語句を並べかえよう。\nShe showed me ( a / written / letter / in French ).', a: 'She showed me a letter written in French.', exp: 'written は in French を連れた2語以上のかたまりなので、名詞 letter の後ろに置きます。「フランス語で書かれた手紙」で、手紙は「書かれる」側なので過去分詞です。' },
      { err: 'Do you mind opening the window? と Do you mind my opening the window? を同じ意味だと思い、だれが窓を開けるのかを考えない。', why: '動名詞の意味上の主語は、書かれていないときは文の主語(または一般の人)になります。この「書かれていない主語」を意識しないくせが原因です。', fix: '動名詞・不定詞を見たら「その動作をするのはだれか」を必ず確かめます。前に所有格・目的格(my・me など)があれば、それが意味上の主語です。', q: '2文の意味のちがいを答えよう。\n(1) Do you mind opening the window?\n(2) Do you mind my opening the window?', a: '(1) 窓を開けていただけませんか。(開けるのは相手)\n(2) 窓を開けてもかまいませんか。(開けるのは自分)', exp: '(1) は意味上の主語が書かれていないので、文の主語 you が開けます。(2) は my が意味上の主語なので、話し手が開けます。mind は「気にする」なので、答えが「いいですよ」なら No, not at all. などと否定で答えます。' },
      { err: '「母は私に医者になってほしいと思っている」を My mother wants that I become a doctor. と、日本語の「〜と思う」につられて that 節で書いてしまう。', why: '日本語の「〜してほしいと思う」を「think that 〜」と同じ形で考えてしまうからです。want は that 節をとらない動詞です。', fix: '「(人)に〜してほしい」は【want + 人 + to 不定詞】の形で書きます。would like・ask・tell・expect も同じ形をとれる動詞としてまとめて覚えます。', q: '英訳しよう。\n「母は私に医者になってほしいと思っている。」', a: 'My mother wants me to become a doctor.', exp: 'want + 人 + to 不定詞で「(人)に〜してほしい」です。me は to become の意味上の主語になっています。want that 〜 の形は使いません。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「外国語を学ぶいちばんの目的は、試験でよい点をとることではなく、異なる文化をもつ人々と理解し合えるようになることだ。」', limit: '英訳せよ', hint: '主語は「外国語を学ぶ目的」なので、The purpose of learning … と動名詞を使います。補語には名詞的用法の to 不定詞を置き、not A but B で対比します。', model: 'The main purpose of learning a foreign language is not to get good scores on tests but to be able to understand people from different cultures and be understood by them.', points: [['主語を The (main) purpose of learning … と動名詞で正しく表している', 2], ['not A but B で「〜ではなく…」を表し、A と B の形(to 不定詞)をそろえている', 3], ['補語を名詞的用法の to 不定詞で表している', 3], ['「理解し合う」「異なる文化をもつ人々」の表現が自然で、文法の誤りがない', 2]], ng: 'not getting good scores but to be able to … のように A と B の形がそろっていないと、並べる形の不一致として減点されます。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nI\'m looking for something cold ( ).', choices: ['to drink', 'drinking', 'drink', 'drunk'], a: 'A(to drink)', exp: 'something cold to drink で「何か冷たい飲み物」です。to drink は something を説明する形容詞的用法の不定詞です。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nShe gave up ( smoke ) last year.', a: 'smoking', exp: 'give up は「〜するのをやめる」で、後ろに動名詞をとります。すでにしていたことをやめるので、ing と相性がよい動詞です。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nHe went to the library ( borrow ) some books.', a: 'to borrow', exp: '「本を借りるために」図書館へ行ったので、目的を表す副詞的用法の不定詞 to borrow です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nBe careful. Don\'t touch the ( ) glass.', choices: ['broken', 'breaking', 'break', 'to break'], a: 'A(broken)', exp: 'ガラスは「割られた」状態なので過去分詞 broken です。1語の分詞なので名詞の前に置いています。' },
      { q: '( ) 内の動詞を正しい形にし、和訳しよう。\nWe regret ( inform ) you that your application was not accepted.', a: 'to inform。残念ながら、あなたの申し込みは受理されなかったことをお知らせします。', exp: 'regret to do は「残念ながら〜する」、regret doing は「〜したことを後悔する」です。これから知らせることなので to inform です。改まった手紙でよく使われます。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nMy bike needs ( repair ).', a: 'repairing(to be repaired も可)', exp: 'need doing で「〜される必要がある」という受動の意味になります。自転車は修理「される」側なので、need to be repaired と書くこともできます。' },
      { q: '和訳しよう。\nShe was the first woman to climb the mountain alone.', a: '彼女は、その山に一人で登った最初の女性だった。', exp: 'to climb は the first woman を説明する形容詞的用法です。the first・the last・the only などの後ろの不定詞は「〜した最初の人」のように訳します。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI have no idea what ( ) next.', choices: ['to do', 'doing', 'do', 'done'], a: 'A(to do)', exp: '疑問詞 + to 不定詞で「何を〜すべきか」です。what to do next で「次に何をすべきか」となります。' },
      { q: '次の日本文を英訳しよう。\n「寝坊しないように、目覚まし時計を2つセットした。」', a: 'I set two alarm clocks so as not to oversleep.\n(in order not to oversleep も可)', exp: '「〜しないように」は so as not to / in order not to + 原形で表します。not は to の直前に置きます。set の過去形は set のままです。' },
      { q: '和訳しよう。\nTo hear him speak English, you would take him for an American.', a: '彼が英語を話すのを聞けば、だれでも彼をアメリカ人だと思うだろう。', exp: '文頭の To hear … は「〜を聞けば」という条件を表す不定詞です。主節の would は仮定法で、take A for B は「A を B だと思う(まちがえる)」です。' }
    ],
    link: {
      prev: '中学で学んだ不定詞の3用法・動名詞の基本と、文型(C になる形・O になる形)の考え方が土台です。',
      next: '分詞構文、関係詞(名詞を後ろから説明するしくみ)、仮定法(不定詞が条件を表す形)、英作文での目的や理由の表し方につながります。',
      cross: [['国語', '日本語では「赤い」「昨日買った」「フランス語で書かれた」など、どんなに長い修飾語も名詞の前に置きます。英語は長い修飾語を名詞の後ろに置くので、和訳では語順の組みかえが必要になります。'], ['漢文', '漢文の「読書」は「書を読む」と返り点を使って読みます。漢文は動詞が目的語の前に来る点で英語に似ていて、語順のちがう言語を日本語に直す練習は、英文和訳にも通じています。']],
      univ: '翻訳や通訳の仕事では、名詞を後ろから説明する長い修飾語を、日本語として自然な順に組みかえる力が欠かせません。言語学では、言語ごとの語順のちがいを比べる研究も行われています。',
      readT: '「to」はもともと「〜へ向かって」',
      read: '不定詞の to と、前置詞の to(〜へ)は、同じ語から来ています。\n古い英語(古英語)では、動詞の原形は eat ではなく etan のように -an で終わる形でした。そして「〜するために」「〜することに向かって」という意味を表すときは、前置詞 to の後ろに、さらに語尾を変えた動詞を置いて tō etanne(食べることへ)のように言っていました。\nやがて語尾の変化は消え、to だけが残って、動詞の原形の前に置く目印になりました。これが今の to 不定詞です。\nこの歴史を知ると、to 不定詞に「これから先のことへ向かう」イメージがある理由が分かります。I want to go. の「行きたい」も、I decided to study abroad. の「留学することに決めた」も、まだ実現していない未来に向かっています。\n一方、動名詞の ing は「実際にしていること・したこと」を表しやすい形です。remember to do(忘れずに〜する)と remember doing(〜したことを覚えている)のちがいも、この2つのイメージの差から説明できます。'
    }
  });

  /* ===== e_h4 関係詞 ===== */
  add('e_h4', {
    rx: [
      { err: '関係詞節がどこで終わるかを決めないまま読み進め、主節の動詞まで関係詞節にふくめてしまう。', why: '関係詞の後ろを「終わりの見えないかたまり」として読んでいるからです。関係詞節の中の動詞と、主節の動詞を区別する意識がありません。', fix: '動詞にすべて印をつけ、関係詞節の動詞の【次に出てくる動詞】を主節の V と考えます。関係詞節を( )でくくり、残りで文が完成するかを確かめます。', q: '次の文の主節の V を答え、和訳しよう。\nThe book that I borrowed from the teacher who lives next door is very interesting.', a: 'V は is。隣に住んでいる先生から借りた本は、とても面白い。', exp: 'that I borrowed from the teacher と who lives next door の2つの関係詞節を( )でくくると The book is very interesting. が残ります。動詞は3つで、関係詞2つ + 1 と数が合います。' },
      { err: 'The girl who I met her at the party was kind. のように、関係代名詞の後ろに、先行詞を指す代名詞をもう一度入れてしまう。', why: '関係代名詞そのものが、節の中で主語や目的語の役目をしていることを意識していないからです。日本語には関係代名詞がないため、「彼女に会った」と目的語を入れたくなります。', fix: '関係詞節を元の文に戻して確かめます。I met her at the party. の her が関係代名詞 who(m) に変わって前に出たので、her はもう書きません。', q: '次の文の誤りを直そう。\nThis is the camera which my uncle gave it to me.', a: 'it を取る(This is the camera which my uncle gave to me.)', exp: 'もとの文は My uncle gave it to me. で、it が関係代名詞 which になって前に出ています。which と it が同じものを指して重なっているので、it を消します。' },
      { err: '「前置詞 + 関係代名詞」の前置詞を、先行詞の名詞の感じだけで決めてしまう(the pen at which … など)。', why: '前置詞は先行詞ではなく、【関係詞節の中の動詞や表現】と結びついていることを意識していないからです。', fix: '関係詞節を元の文に戻し、先行詞を入れてみます。I wrote the letter with the pen. のように元の文で必要な前置詞が、which の前に来ます。', q: '( ) に入る前置詞を答えよう。\nThis is the pen ( ) which I wrote the letter.', a: 'with', exp: '元の文は I wrote the letter with the pen.(そのペンで手紙を書いた)です。道具を表す with が which の前に出ています。先行詞 pen だけを見ても前置詞は決まりません。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「私たちが子どものころに当たり前だと思っていたことの多くは、今ではもう当たり前ではなくなっている。」', limit: '英訳せよ', hint: '「〜こと」は what や the things that で表せます。「当たり前だと思う」は take 〜 for granted、「もう〜ない」は no longer です。', model: 'Much of what we took for granted when we were children is no longer taken for granted today.\n(別解:Many of the things that we took for granted as children are no longer considered normal today.)', points: [['「〜こと」を what / the things that などの関係詞で正しく表している', 3], ['「当たり前だと思う」を take 〜 for granted などで表している', 2], ['「もう〜ない」を no longer / not … any longer で表している', 3], ['主語と動詞の数の一致(Much … is / Many … are)など文法の誤りがない', 2]], ng: 'Many of what we took for granted are … のように、what の前に many of を置くと数の扱いがあいまいになります。Much of what … is か Many of the things that … are にそろえます。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nThis is the town ( ) I was born.', choices: ['where', 'which', 'what', 'who'], a: 'A(where)', exp: '後ろの I was born は欠けた要素のない完全な文なので、関係副詞 where を使います。in which でも同じ意味です。' },
      { q: '( ) に1語を入れよう。\n( ) I want now is a long vacation.', a: 'What', exp: 'what は先行詞をふくむ関係代名詞で、「〜すること・もの」を表します。What I want now が主語のかたまりです。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe woman ( ) car was stolen called the police.', choices: ['whose', 'who', 'which', 'whom'], a: 'A(whose)', exp: '「その女性の車」が盗まれたので、所有を表す whose を使います。whose の後ろには冠詞のない名詞(car)が続きます。' },
      { q: '和訳しよう。\nThat\'s why I didn\'t go to the party.', a: 'そういうわけで、私はパーティーに行かなかった。', exp: 'That\'s why 〜 は「そういうわけで〜だ」で、前に理由、後ろに結果がきます。That\'s because 〜(それは〜だからだ)とは、理由と結果の順番が逆です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThis is the museum ( ) we visited last summer.', choices: ['which', 'where', 'when', 'what'], a: 'A(which)', exp: 'visit は他動詞で、後ろの文は visited の目的語が欠けた不完全な文です。目的語の役目をする関係代名詞 which(that)を選びます。' },
      { q: '和訳しよう。\nWhatever happens, I will be on your side.', a: '何が起ころうとも、私は君の味方だ。', exp: 'whatever は「何が〜しようとも」という譲歩を表します。No matter what happens と言いかえられます。' },
      { q: '2つの文を、関係詞を使って1つの文にしよう(コンマを使う)。\nI talked to Ms. Sato. She is our new teacher.', a: 'I talked to Ms. Sato, who is our new teacher.', exp: '佐藤先生は1人に決まる固有名詞なので、補足説明として非制限用法(コンマ + who)を使います。コンマの後ろに that は使えません。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe is not ( ) he used to be.', choices: ['what', 'which', 'that', 'who'], a: 'A(what)', exp: 'what he used to be で「以前の彼(の姿)」です。He is not what he was. と同じように、人がらや状態の変化を表す決まった言い方です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe reason ( ) he gave for being late was hard to believe.', choices: ['which', 'why', 'what', 'where'], a: 'A(which)', exp: '先行詞が reason でも、後ろの he gave は gave の目的語が欠けた不完全な文です。そのため関係副詞 why ではなく、関係代名詞 which(that)を使います。' },
      { q: '和訳しよう。\nReading is to the mind what exercise is to the body.', a: '読書と精神の関係は、運動と身体の関係と同じだ。', exp: 'A is to B what C is to D は「A と B の関係は C と D の関係と同じだ」という表現です。運動が体をきたえるように、読書は心をきたえる、という意味です。' }
    ],
    link: {
      prev: '中学で学んだ who・which・that の基本と、文型(後ろの文が完全か不完全か)の考え方が土台です。',
      next: '分詞の後置修飾、強調構文(It is 〜 that …)、難関大の長文読解や下線部和訳、英作文で名詞を詳しく説明する力につながります。',
      cross: [['国語', '日本語の「私が昨日読んだ本」の「私が昨日読んだ」は、文法では連体修飾節と呼ばれます。英語の関係詞節は、それを名詞の後ろに置いたものだと考えると理解しやすくなります。'], ['数学', '集合を {x | x > 0}(0より大きい x 全体)のように「条件をみたすもの」で表す書き方は、the students who passed the test(試験に合格した生徒)のように、条件で名詞をしぼる関係詞と似た考え方です。']],
      univ: '法律や契約書、学術論文の英語では、関係詞を重ねた長い名詞のかたまりがよく出てきます。どこからどこまでが1つの名詞かを正確に見ぬく力は、専門書を読むときの基本になります。',
      readT: 'whom は消えていく?',
      read: '学校では、目的格の関係代名詞は whom だと習います。ところが、英語を母語とする人の会話では、the man who I met yesterday のように、目的格でも who を使うことがよくあります。さらに多いのは、関係詞をまるごと省いて the man I met yesterday と言う形です。\n疑問文でも同じです。Whom did you meet? は文法的には正しい形ですが、会話では Who did you meet? のほうがずっと自然に聞こえます。\nでは、whom はもう使われないのでしょうか。そうではありません。to whom・with whom のように前置詞の直後では、今でも whom が使われます。また、論文や公式の文書のような改まった文章でも whom がよく使われます。\nことばの決まりは、時代とともに少しずつ変わります。話し言葉で起こった変化が、何十年もかけて書き言葉にも広がることもあります。試験や改まった英作文では、教科書どおりの whom を正しく使えるようにしておき、話し言葉の変化も知っておくと、生きた英語が見えてきます。'
    }
  });

  /* ===== e_h3 分詞構文 ===== */
  add('e_h3', {
    rx: [
      { err: '自分で分詞構文を書くとき、意味があいまいになっても接続詞をすべて消してしまう。', why: '「分詞構文=接続詞を消す」と覚えているためです。実際には、意味をはっきりさせたいときは【接続詞を残した分詞構文】を使うことができます。', fix: '「〜している間に」「〜した後で」などの意味を確実に伝えたいときは、while・after・when などを分詞の前に残します。英作文では、あいまいさを減らすことを優先します。', q: '接続詞 while を残した分詞構文を使って英訳しよう。\n「駅まで歩いている間に、彼女は財布を落とした。」', a: 'She dropped her wallet while walking to the station.', exp: 'while walking … は、While she was walking … の she was を省いた形です。主節の主語と同じなので省略でき、while を残すことで「歩いている間に」という意味がはっきりします。' },
      { err: '文末の「, 〜ing」を、すぐ前の名詞を説明する分詞だと読み、主節の結果として起きたことだと気づかない。', why: '「名詞の後ろの分詞は名詞を説明する」という読み方が強く残っているためです。コンマの後ろの分詞は、文全体につながることが多いのです。', fix: 'コンマの後ろの 〜ing を見たら、「そして〜した(結果)」と前から順に訳してみます。意味が自然につながれば、結果を表す分詞構文です。', q: '和訳しよう。\nThe company introduced a new system, making it easier for workers to take holidays.', a: 'その会社は新しい制度を導入し、その結果、社員が休みをとりやすくなった。', exp: 'making 以下は system を説明しているのではなく、「新しい制度を導入した」ことの結果を表す分詞構文です。make it easier for 人 to do は「人が〜するのを容易にする」です。' },
      { err: 'Left alone in the room, the child began to cry. の Left を、文の動詞(過去形)だと思い、「部屋に一人で残した」と訳してしまう。', why: '過去形と過去分詞が同じ形の動詞が多いため、文頭の Left を見て文の述語だと思いこみやすいのです。文の V が後ろにあることを確かめていません。', fix: '文頭の過去分詞の後ろにコンマがあり、その後ろに S + V が続いていたら、【受動の分詞構文】(Being が省略された形)だと考えます。主節の主語が「〜される」側かを確かめます。', q: '和訳しよう。\nLeft alone in the room, the child began to cry.', a: '部屋に一人で残されて、その子は泣き出した。', exp: '文の V は began です。Left は Being left の Being が省略された受動の分詞構文で、子どもが「残された」ことを表します。As he(she) was left alone … と同じ意味です。' }
    ],
    essay: [
      { q: '次の日本文を、分詞構文を1か所以上用いて英訳せよ。\n「駅で財布をなくしたことに気づいた彼は、来た道を引き返したが、どこにも見つからなかった。」', limit: '英訳せよ(分詞構文を用いる)', hint: '「気づいた彼は」は Realizing … で始める分詞構文にできます。財布をなくしたのは気づくより前なので過去完了を使います。「来た道を引き返す」は go back the way he had come です。', model: 'Realizing that he had lost his wallet at the station, he went back the way he had come, but he could not find it anywhere.', points: [['Realizing … などの分詞構文を正しく使い、主語が主節と一致している', 3], ['気づくより前の出来事に過去完了(had lost)を使っている', 3], ['「来た道を引き返す」を go back the way he had come などで表している', 2], ['not … anywhere など全体の文法・語法に誤りがない', 2]], ng: 'Realizing that he lost his wallet, the wallet could not be found. のように主節の主語を変えると、「財布が気づいた」ことになってしまい、大きく減点されます。' }
    ],
    test: [
      { q: '分詞構文を使って書きかえよう。\nAs I was tired, I went to bed early.', a: 'Being tired, I went to bed early.(Tired, I went to bed early. も可)', exp: '接続詞 As と主語 I を消し、was を Being にします。Being は省略されることが多く、Tired, … の形も自然です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\n( ) along the river, I saw a big bird.', choices: ['Walking', 'Walked', 'To walk', 'Walk'], a: 'A(Walking)', exp: '主節の主語 I が「歩いている」ので、能動の現在分詞 Walking です。「川沿いを歩いていると」と訳します。' },
      { q: '和訳しよう。\nGenerally speaking, Japanese trains are very punctual.', a: '一般的に言えば、日本の電車はとても時間に正確だ。', exp: 'Generally speaking は「一般的に言えば」という慣用的な分詞構文です。話し手(一般の人)が主語なので、主節の主語と一致していなくても使えます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nShe sat on the sofa with her eyes ( ).', choices: ['closed', 'closing', 'close', 'to close'], a: 'A(closed)', exp: '付帯状況の with + O + C です。目は「閉じられた」状態なので過去分詞 closed を使います。「目を閉じて」と訳します。' },
      { q: '( ) に入る最も適切なものを選ぼう。\n( ) by the noise, the baby started crying.', choices: ['Woken', 'Waking', 'Woke', 'To wake'], a: 'A(Woken)', exp: '赤ちゃんは物音に「起こされた」側なので、受動の分詞構文 (Being) woken です。wake の過去分詞は woken です。' },
      { q: '分詞構文を使って書きかえよう。\nSince I had lived in Canada for three years, I could speak English well.', a: 'Having lived in Canada for three years, I could speak English well.', exp: '住んでいたのは主節(話せた)より前からなので、完了形の分詞構文 Having + 過去分詞を使います。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe weather ( ) fine, we went hiking.', choices: ['being', 'is', 'was', 'been'], a: 'A(being)', exp: '分詞の主語 The weather と主節の主語 we がちがうので、主語を残した独立分詞構文にします。「天気がよかったので」という意味です。' },
      { q: '和訳しよう。\nJudging from his accent, he must be from Osaka.', a: '彼のなまりから判断すると、彼は大阪の出身にちがいない。', exp: 'Judging from 〜 は「〜から判断すると」という慣用的な分詞構文です。must be は「〜にちがいない」という推量です。' },
      { q: '和訳しよう。\nOther things being equal, the cheaper product will sell better.', a: 'ほかの条件が同じなら、安いほうの製品がよく売れるだろう。', exp: 'Other things being equal は「ほかの条件が同じなら」という独立分詞構文で、比べるときの前提を示します。sell は「売れる」という自動詞です。' },
      { q: '次の文の誤りを直そう。\nHaving not finished the work, he couldn\'t go home.', a: 'Having not finished → Not having finished', exp: '分詞構文の否定は、分詞の前に not を置きます。完了形の場合は Not having + 過去分詞の語順になります。' }
    ],
    link: {
      prev: '分詞(現在分詞・過去分詞)の能動・受動の区別、接続詞(when・because・while など)、完了形の考え方が土台です。',
      next: '長文読解で文の骨組みをとる力、英作文での表現の幅、新聞・物語などの書き言葉の読み取りにつながります。',
      cross: [['国語', '日本語の「駅に着いて、電話をかけた」の「〜て」は、時・理由・順序などいろいろな意味を表します。分詞構文も同じく、つなぎ方の意味を文脈にまかせる書き方です。'], ['世界史・日本史', '英語の伝記や歴史の文章では、Born in 1867, he … のように、人物の生まれや経歴を分詞構文で短くまとめる書き方がよく使われます。']],
      univ: '新聞記事や小説、学術論文など、英語の書き言葉では分詞構文が多く使われます。限られた字数で情報をつめこむ報道の英語を読むとき、分詞構文の理解は欠かせません。',
      readT: '「歩いていたら、木がきれいだった」? ― ぶら下がり分詞',
      read: 'Walking down the street, the trees looked beautiful. という文は、一見よさそうに見えます。ところが文法どおりに読むと、分詞 Walking の主語は主節の主語 the trees になり、「通りを歩いていた木々が美しく見えた」という、おかしな意味になってしまいます。\nこのような分詞構文を「ぶら下がり分詞(懸垂分詞)」と呼び、文章の書き方の手引きでは避けるよう注意されることが多くあります。正しくは、Walking down the street, I thought the trees looked beautiful. のように、主節の主語を「歩いていた人」にします。\nただし、例外もあります。Generally speaking(一般的に言えば)や Judging from 〜(〜から判断すると)、Considering 〜(〜を考えると)は、主語が「話し手や一般の人」とはっきりしているので、慣用表現として広く認められています。\n分詞構文を自分で書くときは、「この分詞の動作をしているのはだれか」を必ず確かめましょう。'
    }
  });

  /* ===== e_comp 比較 ===== */
  add('e_comp', {
    rx: [
      { err: 'She sings as beautiful as her mother. のように、as 〜 as の間に、形容詞か副詞かを考えずに語を入れてしまう。', why: 'as 〜 as を「決まった枠」として覚え、間に入る語が文の中でどんなはたらきをしているかを考えていないからです。', fix: 'as 〜 as と比べる相手を消して、元の文に戻します。She sings beautifully. なら副詞、She is beautiful. なら形容詞です。元の文で正しい形が、そのまま as と as の間に入ります。', q: '正しいほうを選ぼう。\nShe sings as (beautiful / beautifully) as her mother.', a: 'beautifully', exp: '元の文は She sings beautifully.(彼女は美しく歌う)です。sing という動詞を説明するので副詞が必要です。as … as の中でも、この形は変わりません。' },
      { err: 'There were much more people than I expected. のように、数えられる名詞の複数形の前でも much more を使ってしまう。', why: '「比較級の強調は much」と覚えたため、名詞の前の more にも much をつけてしまいます。more の後ろの名詞が数えられるかどうかを見ていません。', fix: 'more の後ろに【数えられる名詞の複数形】があるなら many more、【数えられない名詞】や形容詞・副詞の比較級なら much more と決めます。', q: '( ) に入る最も適切なものを選ぼう。\nThere were ( ) people at the concert than I expected.\n① much more ② many more ③ very more', a: '② many more', exp: 'people は数えられる名詞の複数として扱うので、many more people です。much more は much more money(数えられない名詞)や much more difficult(形容詞)に使います。' },
      { err: '「難しい問題を解けば解くほど」を The more you solve difficult problems のように書き、比較級と名詞を切り離してしまう。', why: 'the 比較級, the 比較級 の構文では、比較級をふくむかたまりを文頭に出すことを意識せず、more だけを前に出してしまうからです。', fix: '先にふつうの文 You solve more difficult problems. を作り、【比較級 + 名詞のかたまりごと】the をつけて文頭に出します。', q: '英訳しよう。\n「難しい問題を解けば解くほど、自信がつく。」', a: 'The more difficult problems you solve, the more confident you become.', exp: '元の文 You solve more difficult problems. の more difficult problems を、かたまりのまま前に出します。the more you solve difficult problems では「たくさん解くほど」という別の意味になります。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「インターネットのおかげで、私たちは以前とは比べものにならないほど多くの情報を手に入れられるようになったが、だからこそ、正しい情報を選ぶ力がいっそう大切になっている。」', limit: '英訳せよ', hint: '「比べものにならないほど多くの」は far more 〜 than ever before、「だからこそいっそう」は all the more で表せます。', model: 'Thanks to the Internet, we can now get far more information than ever before, but this makes the ability to choose reliable information all the more important.', points: [['「比べものにならないほど多く」を far / much more … than ever (before) で表している', 3], ['「だからこそいっそう大切」を all the more important などで表している', 3], ['「正しい情報を選ぶ力」を the ability to choose … などで表している', 2], ['information を数えられない名詞として扱うなど、文法の誤りがない', 2]], ng: 'many more informations のように information を複数形にするのは典型的な誤りです。information は数えられない名詞なので much / far more information とします。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nThis bag is three times as ( ) as that one.', choices: ['heavy', 'heavier', 'heaviest', 'heavily'], a: 'A(heavy)', exp: '倍数表現は「〜倍 + as + 原級 + as」です。as と as の間は原級 heavy になります。' },
      { q: '( ) に1語を入れよう。\nMt. Fuji is higher than any other ( ) in Japan.', a: 'mountain', exp: 'than any other の後ろは単数名詞です。「ほかのどの山よりも高い」=「日本でいちばん高い」という最上級の意味になります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThis plan is ( ) better than that one.', choices: ['much', 'very', 'more', 'many'], a: 'A(much)', exp: '比較級を強めるのは much・far・even などです。very は原級を強める語なので、比較級の前には使いません。' },
      { q: '和訳しよう。\nThe sooner, the better.', a: '早ければ早いほどよい。', exp: 'the 比較級, the 比較級 の省略された形です。主語や動詞を省いても意味が分かる、よく使われる決まり文句です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nKen is the ( ) of the two brothers.', choices: ['taller', 'tallest', 'tall', 'more tall'], a: 'A(taller)', exp: '2人のうちで「背が高いほう」は1人に決まるので、the + 比較級 + of the two を使います。3人以上なら the tallest です。' },
      { q: '次の文を、Time を主語にしてほぼ同じ意味に書きかえよう。\nNothing is more precious than time.', a: 'Time is more precious than anything else.(Time is the most precious thing of all. も可)', exp: 'Nothing is more 〜 than A は「A ほど〜なものはない」で、最上級の意味です。than anything else を使うと、比較級で同じ意味を表せます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe climate of Japan is milder than ( ) of Canada.', choices: ['that', 'those', 'it', 'one'], a: 'A(that)', exp: '比べているのは「日本の気候」と「カナダの気候」です。climate のくり返しをさけるために that を使います。複数名詞なら those です。' },
      { q: '和訳しよう。\nShe is not so much a singer as an actress.', a: '彼女は歌手というよりむしろ女優だ。', exp: 'not so much A as B は「A というよりむしろ B」です。B のほうに重点があることに注意します。' },
      { q: '和訳しよう。\nThis problem is less difficult than it looks.', a: 'この問題は、見た目ほど難しくない。', exp: 'less + 原級 + than は「…ほど〜ない」です。not as difficult as it looks と同じ意味になります。' },
      { q: '次の日本文を英訳しよう。\n「このパソコンの大きさは、私の古いものの半分しかない。」', a: 'This computer is only half as large as my old one.\n(only half the size of my old one も可)', exp: '「半分」は half as 〜 as で表します。the size of 〜 を使って half the size of my old one と言うこともできます。one は computer のくり返しをさけています。' }
    ],
    link: {
      prev: '中学で学んだ比較級・最上級・as 〜 as の基本と、形容詞と副詞の区別、数えられる名詞・数えられない名詞の区別が土台です。',
      next: '長文で筆者が何と何を比べて主張しているかを読む力、グラフや統計を説明する英作文、リスニングの数値問題につながります。',
      cross: [['数学', '「A は B の3倍」は割合の考え方そのものです。比較の英文を読むときは、何を基準(B)にして何倍なのかを、数式 A = 3B のように書いて確かめるとまちがえません。'], ['理科・社会', '実験結果や統計を比べるとき、「〜より多い」「〜の半分」という表現が欠かせません。英語の資料やグラフを読む問題では、比較の表現が正確に読めるかがそのまま得点に関わります。']],
      univ: '統計学や経済学、医学研究の論文では、比較の表現で結果を報告します。ニュースでも、数値の比較を正確に読みとる力は、情報をうのみにしないために大切です。',
      readT: '「いちばん不親切な一撃」― シェイクスピアの二重比較',
      read: 'シェイクスピアの劇『ジュリアス・シーザー』には、This was the most unkindest cut of all. というせりふがあります。シーザーを刺した人々の中に、信頼していたブルータスがいたことを嘆く場面で、「これこそ、すべての中で最も無情な一撃だった」という意味です。\n今の文法では、most unkindest のように最上級を重ねるのは誤りです。しかしシェイクスピアの時代には、強調のために比較級や最上級を重ねる言い方が使われることがありました。\nその後、18世紀ごろから英語の文法を整えようとする動きが強まり、二重の比較は「誤り」とされるようになりました。現在では、more better のような言い方は正しい英語とは認められていません。\nちなみに、-er・-est と more・most の使い分けにも目安があります。1音節の語は -er(taller)、3音節以上の語は more(more beautiful)、2音節の語は語によって分かれます(happier・more careful)。迷ったら辞書で確かめるのが確実です。'
    }
  });

  /* ===== e_h2 仮定法 ===== */
  add('e_h2', {
    rx: [
      { err: 'If I had more time, I will learn Chinese. のように、if 節を過去形にしたのに、主節の助動詞を現在形のままにしてしまう。', why: '仮定法を「if 節を過去形にすること」とだけ覚え、主節も【助動詞の過去形(would・could・might)】にして「現実からの距離」を示す必要があることを忘れているからです。', fix: '仮定法の文を書いたら、if 節と主節の両方を指でさして、「if 節は過去形、主節は would / could / might + 原形」がそろっているかを確かめます。', q: '( ) に入る最も適切なものを選ぼう。\nIf I had more time, I ( ) learn Chinese.\n① will ② would ③ am going to', a: '② would', exp: '「(実際は時間がないが)もっと時間があれば中国語を学ぶのに」という仮定法過去です。主節は would + 原形にして、現実とはちがう想像であることを示します。' },
      { err: 'If he comes, I will tell him. と If he came, I would tell him. を、どちらも「もし彼が来たら伝える」と同じ意味だと考えてしまう。', why: '日本語の訳が同じになるため、形のちがいが表す【話し手の見こみ】のちがいに気づかないからです。', fix: '条件文を見たら、「話し手はそれが起こりそうだと思っているか」を考えます。現在形なら実際に起こりうる条件、過去形なら起こる見こみが低い・現実とちがう想像です。', q: '2文の意味のちがいを説明しよう。\n(1) If he comes, I will tell him.\n(2) If he came, I would tell him.', a: '(1) は彼が来る可能性が十分あると考えた、ふつうの条件。(2) は彼が来る可能性は低い(または来ない)と話し手が考えたうえでの想像。', exp: '(1) は直説法で、実際に起こりうることとして述べています。(2) は仮定法過去で、過去形が現実からの距離を表し、「まず来ないだろうが、もし来たら」という気持ちになります。' },
      { err: '「もっと上手にピアノが弾けたらいいのに」を I wish I can play the piano better. と書いてしまう。', why: '「今のことだから現在形」と考えてしまうからです。I wish の後ろは実現しない願いなので、仮定法にする必要があります。', fix: 'I wish の後ろは、【今のこと → 過去形】【過去のこと → had + 過去分詞】と決めます。can なら could にします。', q: '英訳しよう。\n「もっと上手にピアノが弾けたらいいのに。」', a: 'I wish I could play the piano better.', exp: '今の事実(上手に弾けない)に反する願いなので、仮定法過去を使い can を could にします。過去のことなら I wish I had practiced more.(もっと練習しておけばよかった)のようになります。' }
    ],
    essay: [
      { q: 'If you could live in any period of history, which period would you choose? Explain your reasons in English.', limit: '60〜80語', hint: '最初の文で時代をはっきり答えます。理由は2つにしぼり、仮定法(would・could)を最後まで一貫して使います。', model: 'If I could live in any period of history, I would choose the Edo period in Japan. First, I would like to see how people lived without electricity or cars. If I lived then, I would walk everywhere and enjoy the quiet streets. Second, I am interested in ukiyo-e. If I were an artist in Edo, I could learn directly from great masters like Hokusai. That would be a wonderful experience for me.', points: [['最初に、問いに対してどの時代を選ぶかをはっきり答えている', 2], ['重ならない理由を2つ、具体的な内容とともに述べている', 3], ['仮定法(If I could / were …, I would / could …)を正しく一貫して使っている', 3], ['語数(60〜80語)を守り、語法・つづりの誤りが少ない', 2]], ng: 'If I can live in the Edo period, I will … のように直説法で書くと、問いの could(ありえない想像)に合わず、仮定法が使えていないと判断されます。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nIf I ( ) you, I would apologize to her.', choices: ['were', 'am', 'will be', 'have been'], a: 'A(were)', exp: '「私があなたなら」は現実にはありえない仮定なので仮定法過去です。be動詞は主語に関係なく were を使うのが基本です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nIf she had left earlier, she ( ) the train.', choices: ['would have caught', 'would catch', 'will catch', 'caught'], a: 'A(would have caught)', exp: 'if 節が had left(仮定法過去完了)で、過去の事実に反する想像です。主節は would have + 過去分詞になります。' },
      { q: '和訳しよう。\nI wish it were Sunday today.', a: '今日が日曜日ならいいのに。', exp: 'I wish + 仮定法過去で、今の事実(今日は日曜日ではない)に反する願いを表します。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nWithout water, nothing ( ) live.', choices: ['could', 'can', 'will', 'does'], a: 'A(could)', exp: 'Without 〜 は「〜がなければ」という if 節のはたらきをします。実際には水はあるので、仮定法の could を使います。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe talks as if he ( ) everything about it, but he actually knows very little.', choices: ['knew', 'knows', 'has known', 'will know'], a: 'A(knew)', exp: '実際にはほとんど知らないので、「まるで何でも知っているかのように」は事実に反する想像です。as if の後ろを仮定法過去 knew にします。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nIt\'s already eleven. It\'s time you ( ) to bed.', choices: ['went', 'go', 'will go', 'going'], a: 'A(went)', exp: 'It\'s time + 仮定法過去で「もう〜してもいいころだ(なのにまだしていない)」という気持ちを表します。' },
      { q: 'if を使わずに、ほぼ同じ意味の文に書きかえよう。\nIf I had known her address, I would have written to her.', a: 'Had I known her address, I would have written to her.', exp: 'if を省略すると、had が主語の前に出て疑問文と同じ語順になります。改まった文章でよく使われる形です。' },
      { q: '( ) 内の語句を正しい形にしよう。\nIf he had taken the medicine last night, he ( be ) well now.', a: 'would be', exp: 'if 節は過去(昨夜)の仮定、主節は今(now)の結果を表す混合型です。主節は would + 原形になります。' },
      { q: '和訳しよう。\nA true friend would not say such a thing.', a: '本当の友人なら、そんなことは言わないだろう。', exp: 'if 節はありませんが、主語 A true friend に「本当の友人なら」という条件がこめられています。would が仮定法の目印です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nIf it ( ) for his help, I would have failed.', choices: ['had not been', 'were not', 'is not', 'has not been'], a: 'A(had not been)', exp: '主節が would have failed なので過去の仮定です。「彼の助けがなかったら」は If it had not been for 〜 で表します。But for / Without 〜 でも言いかえられます。' }
    ],
    link: {
      prev: '助動詞の過去形(would・could・might)、時制の考え方、過去完了(had + 過去分詞)が土台です。',
      next: 'ていねいな依頼(Would you …? / I was wondering if …)、長文で「実際にあったこと」と「想像」を区別する読み方、英作文での提案や仮定の表現につながります。',
      cross: [['古文', '古文の「ましかば〜まし」(もし〜だったら…だろうに)は、現実に反することを想像する反実仮想の表現です。英語の仮定法と同じく、現実とちがう世界を想像することばのしくみです。'], ['日本史・世界史', '「もしこの戦いの結果がちがっていたら」と考えることは、歴史の流れや原因を考える手がかりになります。英語の歴史の文章でも、仮定法でこうした議論がされることがあります。']],
      univ: '経済学や医学の研究では、「もしその政策(治療)がなかったらどうなっていたか」という反実仮想を、データを使って推定します。因果関係を調べるための大切な考え方です。',
      readT: '「If I were」と「If I was」',
      read: '仮定法では、主語が I でも If I were you … と were を使うと習います。この were は、昔の英語にあった「仮定法(叙想法)」という動詞の形の名残です。昔の英語では、事実を述べるときと、想像や願いを述べるときで、動詞の形がはっきり分かれていました。\n現代の英語では、この区別はほとんど消えています。くだけた会話では If I was rich … のように was が使われることも多く、辞書や文法書でも話し言葉の形として紹介されています。ただし、If I were you(私があなたなら)は決まり文句として根強く残っていますし、試験や改まった文章では were を使うのが安全です。\nもう1つの名残が、I suggest that he go home. の go のような、提案・要求の that 節の原形です。この形はアメリカ英語でよく使われ、イギリス英語では I suggest that he should go home. のように should を使うことも多いといわれます。\n仮定法は、英語の中に残った「古い形の化石」のようなものなのです。'
    }
  });

  /* ===== e_emph 強調・倒置・省略・話法 ===== */
  add('e_emph', {
    rx: [
      { err: 'It is kind that he is. のように、強調構文の It is と that の間に、形容詞を入れて強調しようとしてしまう。', why: '「強調したい語を It is 〜 that で挟めばよい」と考え、強調構文で挟めるのが【名詞(句)と副詞(句・節)】であることを知らないからです。', fix: '強調構文を作ったら、It is と that を外して元の文に戻るかを確かめます。形容詞や動詞を強めたいときは、very や do(did)など別の方法を使います。', q: 'yesterday を強調する強調構文に書きかえよう。\nKen broke the window yesterday.', a: 'It was yesterday that Ken broke the window.', exp: 'yesterday は副詞なので、It was と that の間に入れられます。過去の出来事なので It was を使います。It was と that を外すと、元の文 Ken broke the window yesterday. に戻ります。' },
      { err: '「昨日になって初めてその知らせを知った」を Only yesterday I learned the news. と書き、倒置を忘れてしまう。', why: '倒置が起こるのは never・little などの「否定語」だけだと考え、only が「〜しかない・〜になって初めて」という否定に近い意味をもつことに気づいていないからです。', fix: '文頭に【only + 副詞(句・節)】を出したら、never と同じように後ろを疑問文の語順(did I learn)にします。only が主語を修飾しているとき(Only Ken knew …)は倒置しません。', q: '英訳しよう(Only を文頭に置く)。\n「昨日になって初めて、私はその知らせを知った。」', a: 'Only yesterday did I learn the news.', exp: 'Only yesterday(昨日になって初めて)が文頭に出ているので、後ろは did I learn と疑問文の語順になります。It was not until yesterday that I learned the news. とも言えます。' },
      { err: 'I did call you, but you didn\'t answer. の did を、疑問文や否定文のときの do と同じだと思い、意味を読みとばしてしまう。', why: 'do が「疑問文・否定文を作る道具」というイメージしかないためです。肯定文の do + 原形は【動詞の意味を強める】はたらきをします。', fix: '肯定文で do・does・did の後ろに原形が来ていたら強調だと考え、「本当に・確かに〜した」と訳に強さを出します。', q: '和訳しよう。\nI did call you last night, but you didn\'t answer.', a: '昨夜、確かに君に電話したんだけど、君は出なかった。', exp: 'did call は「確かに電話した」という強調です。相手が「電話してこなかった」と思っていることに対して、事実を強く主張しています。' }
    ],
    essay: [
      { q: '次の日本文を、強調構文を用いて英訳せよ。\n「私が英語を本気で勉強しようと決めたのは、海外の友人と話したかったからではなく、自分の考えを世界に伝えたかったからだ。」', limit: '英訳せよ(強調構文を用いる)', hint: '強調したいのは「理由」の部分です。not because A but because B を It was と that の間に入れます。', model: 'It was not because I wanted to talk with friends abroad but because I wanted to share my ideas with the world that I decided to study English seriously.', points: [['It was 〜 that … の強調構文の形が正しい(時制も過去で一致)', 3], ['not because A but because B で理由を対比している', 3], ['「本気で勉強しようと決めた」を decided to study … seriously などで表している', 2], ['「自分の考えを世界に伝える」など全体の表現と文法に誤りがない', 2]], ng: 'It was because … that の部分で not と but の対比をくずし、It was not because …, it was because … のように2文に分けると、強調構文の形として不完全になります。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nIt was in this room ( ) the meeting was held.', choices: ['that', 'which', 'what', 'where'], a: 'A(that)', exp: 'in this room を強調した強調構文です。It was と that を外すと The meeting was held in this room. に戻ります。where は使いません。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nNever ( ) such a beautiful sunset.', choices: ['have I seen', 'I have seen', 'I saw', 'did I saw'], a: 'A(have I seen)', exp: '否定語 Never が文頭に来ると、後ろは疑問文の語順になります。have I seen で「これほど美しい夕日は見たことがない」です。' },
      { q: '( ) に1語を入れよう。\n"I like cats." "So ( ) I."', a: 'do', exp: '「私も好き」は So + V + S の倒置で表します。like は一般動詞なので do を使います。' },
      { q: '和訳しよう。\nIt is not what you say but how you say it that matters.', a: '大切なのは、何を言うかではなく、どう言うかだ。', exp: 'not A but B を It is 〜 that で強調した文です。matter は「重要である」という動詞です。' },
      { q: '間接話法に書きかえよう。\nHe said to me, "Are you busy now?"', a: 'He asked me if(whether)I was busy then.', exp: 'Yes / No で答える疑問文は if・whether でつなぎ、語順は S + V にします。時制の一致で are → was、now → then に変えます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nLittle ( ) that he was watching us.', choices: ['did we know', 'we knew', 'we did know', 'knew we'], a: 'A(did we know)', exp: 'Little は「ほとんど〜ない」という否定の意味をもつので、文頭に出ると倒置が起こります。「彼が見ているとは思いもしなかった」です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\n"I don\'t like coffee." "( ) do I."', choices: ['Neither', 'So', 'Either', 'Too'], a: 'A(Neither)', exp: '否定文に対して「私も〜ない」と言うときは Neither(Nor)+ V + S です。I don\'t, either. とも言えます。' },
      { q: '省略されている語を補おう。\nThough tired, she kept working.', a: 'Though she was tired, she kept working.', exp: '副詞節の主語が主節の主語と同じとき、副詞節の主語と be動詞をまとめて省略できます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nNot until the next morning ( ) that his bag was missing.', choices: ['did he notice', 'he noticed', 'noticed he', 'he did notice'], a: 'A(did he notice)', exp: 'Not until 〜 が文頭に出ると、主節は倒置されます。「翌朝になって初めて、彼はかばんがないことに気づいた」です。' },
      { q: '和訳しよう。\nSo great was the shock that she could not speak for a while.', a: 'そのショックはあまりにも大きく、彼女はしばらく口がきけなかった。', exp: 'The shock was so great that … の so great を文頭に出した倒置です。後ろは was the shock と V + S の語順になります。' }
    ],
    link: {
      prev: '基本の語順(S + V)、疑問文の語順、否定の表し方、時制の一致が土台です。',
      next: '長文で筆者がどこに重点を置いているかを読む力、英作文で伝えたいことを目立たせる書き方、リスニングでの文の強勢の聞き取りにつながります。',
      cross: [['古文', '古文の係り結び(「ぞ・なむ・や・か・こそ」があると文末の形が変わる)は、強調や疑問のために文の形を変えるしくみです。英語で否定語が文頭に来ると語順が変わる倒置と、発想が似ています。'], ['国語', '「大切なのは〜だ」「〜こそが…だ」のように、日本語でも強調したいことを文の特定の位置に置きます。英語の強調構文 It is 〜 that … と比べると、言語ごとの強調のしかたのちがいが見えてきます。']],
      univ: '言語学の「談話分析」では、文の中で情報がどの順に並ぶかを研究します。スピーチや広告の文章でも、聞き手に残したい情報を文末や強調構文で目立たせる工夫が使われています。',
      readT: '新しい情報は文の後ろへ ― 文末焦点の原則',
      read: '英語には、【すでに知っている情報を先に、新しい情報を後に】置くという傾向があります。文の終わりに大事な情報が来ることを「文末焦点」と呼びます。\nたとえば「だれが窓を割ったの?」と聞かれたとき、答えの中心は「割った人」です。そこで、It was Ken that broke the window. のように、強調構文で Ken を目立つ位置に置いたり、The window was broken by Ken. のように受動態で Ken を文末に回したりします。\nまた、長くて重い要素も文の後ろに回すのが自然とされ、これを「文末重心」といいます。To learn a foreign language well is difficult. よりも It is difficult to learn a foreign language well. のほうが自然に聞こえるのはそのためです。形式主語の it は、重い主語を後ろに回すための工夫なのです。\n倒置や強調構文は、ただの例外的な形ではありません。「どの情報をどこに置けば伝わりやすいか」という英語の考え方から生まれた、意味のある形なのです。'
    }
  });

  /* ===== ex_eng 文法・語法問題の解き方 ===== */
  add('ex_eng', {
    rx: [
      { err: 'The number of students ( ) increasing. のような問題で、すぐ前の students につられて are を選んでしまう。空所のすぐ前の名詞だけを見て動詞の形を決めるくせ。', why: '主語が「名詞 + of + 名詞」のように長いと、動詞に近い名詞を主語だと感じてしまうからです。本当の主語(文の中心の名詞)を探していません。', fix: '動詞の形を決める前に、【of 〜 や関係詞節などの修飾部分をかっこでくくり】、残った中心の名詞を主語として確かめます。the number of 〜(〜の数)は number が中心なので単数、a number of 〜(多くの〜)は複数扱いです。', q: '( ) に is か are を入れよう。\nThe number of students who study abroad ( ) increasing.', a: 'is', exp: '主語の中心は The number(数)なので単数扱いで is です。of students と who study abroad はかっこでくくれる修飾部分です。A number of students(多くの学生)なら are になります。' },
      { err: 'I lost my pen, so I have to buy it. のように、同じ種類の「別のもの」を指すときにも it を使ってしまう。', why: 'it と one をどちらも「それ」と訳して覚えているため、指しているものが【同じ1つのもの】か【同じ種類の別のもの】かを区別していないからです。', fix: '代名詞を選ぶ前に「前に出た物そのもの」を指すのか、「同じ種類のどれか1つ」を指すのかを考えます。そのものなら it、同じ種類の別の1つなら one(複数なら ones)です。', q: '( ) に入る最も適切なものを選ぼう。\nI lost my pen, so I have to buy ( ).\n① it ② one ③ that ④ them', a: '② one', exp: 'なくしたペンそのものを買うことはできないので、「同じ種類のペンを1本」という意味の one を使います。I found it.(なくしたペンを見つけた)なら、そのものを指すので it です。' },
      { err: 'It was so a cold day that we stayed inside. のように、so と such の後ろの語順を混同してしまう。', why: 'so と such がどちらも「とても・そんなに」と訳されるため、後ろに来る品詞(so は形容詞・副詞、such は名詞のかたまり)のちがいを意識していないからです。', fix: '後ろに【a + 形容詞 + 名詞】が来るなら such a cold day、【形容詞だけ】なら so cold と決めます。迷ったら名詞があるかないかを確かめます。', q: '( ) に入る最も適切なものを選ぼう。\nIt was ( ) that we stayed inside all day.\n① such a cold day ② so a cold day ③ such cold a day ④ so cold day', a: '① such a cold day', exp: '名詞 day があるので such a cold day です。so を使うなら so cold a day(so + 形容詞 + a + 名詞)という少し改まった語順になります。④は冠詞がないので誤りです。' }
    ],
    essay: [
      { q: '次の英文には誤りが1か所ある。誤りを指摘して正しく直し、その理由を日本語で説明せよ。\nEach of the students who took part in the program were given a certificate.', limit: '理由は80字以内', hint: '文の主語の中心の語を探し、関係詞節(who took part in the program)を一度かっこでくくってみます。', model: '誤り:were → was\n理由:主語の中心は Each であり、each は「それぞれ」を表すので単数として扱う。of the students や関係詞節に引かれて複数の動詞にしない。', points: [['誤りの箇所(were)を正しく指摘している', 3], ['was に正しく直している', 2], ['主語の中心が Each で、単数扱いであることを説明している', 3], ['of the students や関係詞節が主語と動詞の間に入っていることにふれている', 2]], ng: '「students が複数だから」と主語を取りちがえた説明や、took を誤りとする答えは得点になりません。' }
    ],
    test: [
      { q: '( ) に入る最も適切なものを選ぼう。\nI\'m looking forward to ( ) you again.', choices: ['seeing', 'see', 'saw', 'seen'], a: 'A(seeing)', exp: 'look forward to の to は前置詞なので、後ろは動名詞 seeing です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nShe suggested that he ( ) a doctor.', choices: ['see', 'sees', 'saw', 'seeing'], a: 'A(see)', exp: 'suggest(提案する)の that 節では、動詞は原形(または should + 原形)にします。主語が he でも -s はつけません。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI have ( ) homework to do today.', choices: ['a lot of', 'many', 'a few', 'several'], a: 'A(a lot of)', exp: 'homework は数えられない名詞なので、many・a few・several は使えません。a lot of は数えられる名詞にも数えられない名詞にも使えます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe is used to ( ) up early.', choices: ['getting', 'get', 'got', 'gets'], a: 'A(getting)', exp: 'be used to 〜ing で「〜することに慣れている」です。この to は前置詞なので、後ろは動名詞になります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHardly anybody came to the party, ( )?', choices: ['did they', "didn't they", 'did he', "didn't he"], a: 'A(did they)', exp: 'hardly(ほとんど〜ない)は否定の意味をもつので、付加疑問は肯定の形になります。anybody は付加疑問では they で受けるのがふつうです。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe police ( ) looking for the missing boy.', choices: ['are', 'is', 'was', 'has'], a: 'A(are)', exp: 'the police は「警察(の人々)」を表し、つねに複数扱いです。そのため be動詞は are になります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nNeither you nor I ( ) to blame.', choices: ['am', 'are', 'is', 'be'], a: 'A(am)', exp: 'neither A nor B が主語のとき、動詞は B(動詞に近いほう)に合わせます。B が I なので am です。' },
      { q: '( ) 内の動詞を正しい形にしよう。\nIt is important that everyone ( follow ) the rules.', a: 'follow(should follow も可)', exp: 'important・necessary などの後ろの that 節では、動詞を原形(または should + 原形)にすることがあります。主語が everyone でも -s はつけません。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI\'d appreciate it if you ( ) me a call tomorrow.', choices: ['would give', 'will give', 'gives', 'have given'], a: 'A(would give)', exp: 'I would appreciate it if you would(could)〜 は「〜していただけるとありがたいです」というていねいな依頼です。主節の would に合わせ、仮定法の形で控えめに頼んでいます。' },
      { q: '次の文の誤りを直そう。\nDespite of the heavy rain, the game went on.', a: 'Despite of → Despite(または In spite of)', exp: 'despite は前置詞なので、of は不要です。of を使うなら in spite of にします。意味はどちらも「〜にもかかわらず」です。' }
    ],
    link: {
      prev: '時制・助動詞・準動詞・関係詞・比較など、高校で学ぶ文法事項のすべてが土台です。',
      next: '長文読解や英作文で、文法を「知っている」から「正確に使える」へと高めることにつながります。文法の誤りに気づく力は、自分の英作文の見直しにそのまま使えます。',
      cross: [['数学', '誤りの選択肢を1つずつ「なぜだめか」で消していく方法は、数学で反例を探して命題が成り立たないことを示す考え方と同じです。根拠を言えない選択はしない、という姿勢が共通しています。'], ['国語', '現代文の選択肢問題でも、本文と照らし合わせて「言いすぎ」「すりかえ」を見ぬきます。文法問題で根拠を探す練習は、国語の選択肢を吟味する力とも通じています。']],
      univ: '出版社の校正・編集の仕事や、翻訳の品質チェックでは、文法の誤りを見つけて直す力がそのまま求められます。言語学では、「どう使うべきか」を示す規範文法と、「実際にどう使われているか」を調べる記述文法の両方が研究されています。',
      readT: '「to boldly go」は誤り? ― 規範文法と記述文法',
      read: 'アメリカのSFドラマ『スター・トレック』のオープニングには、to boldly go where no man has gone before(これまでだれも行ったことのない場所へ大胆に向かう)という有名な一節があります。\nこの to boldly go のように、to と動詞の原形の間に副詞を入れる形は「分離不定詞」と呼ばれます。19世紀ごろの文法家たちの中には、これを誤りだとして強く批判する人がいました。ラテン語では不定詞が1語なので間に何も入れられない、という考えも影響したといわれます。\nしかし、実際には分離不定詞は昔から多くの書き手に使われてきました。現代の多くの辞書や語法の手引きでは、意味をはっきりさせるためなら使ってよいと考えられています。「文を前置詞で終えてはいけない」という決まりも、同じように根拠のうすい「迷信」として紹介されることがあります。\n「こう使うべきだ」という規範文法と、「実際にこう使われている」という記述文法。入試の問題は規範文法にもとづいて作られますが、ことばは生きて変化していることも知っておくと、文法の学習がもっと面白くなります。'
    }
  });

  /* ===== hd_eng 難関大の英文解釈・語法 ===== */
  add('hd_eng', {
    rx: [
      { err: '下線部和訳で、英語の語順のまま単語を日本語に置きかえ、「彼の突然の辞職はみんなを驚かせた」のような、意味は通るが不自然な訳で終えてしまう。', why: '「英語の単語に1つずつ訳語を当てれば和訳になる」と考え、日本語として自然かどうかを読み直す段階をとばしているからです。', fix: '構造をとって直訳を作ったあと、【だれが・何をしたのか】が見えるように日本語を組み直します。名詞のかたまりは「〜が…したこと」と文に戻し、無生物主語は「〜のために・〜によって」と理由や原因に言いかえます。', q: '自然な日本語に訳そう。\nHis sudden resignation surprised everyone in the office.', a: '彼が突然辞めたので、職場のみんなが驚いた。', exp: 'His sudden resignation は「彼が突然辞めたこと」と文に戻せます。無生物主語の文なので、「〜したので、…が驚いた」と原因と結果の形にすると自然な日本語になります。' },
      { err: 'this・that・it・they を、何を指しているか確かめないまま「これ」「それ」とだけ訳し、答案の意味が伝わらなくなる。', why: '指示語をそのまま訳しても文の形は整うため、指している中身を確かめる習慣がないからです。難関大の和訳や内容説明では、指示内容を明らかにすることが採点のポイントになります。', fix: '指示語を見たら、前の文から指している内容に線を引き、その内容を代入しても意味が通るかを確かめます。内容説明問題では、指示語のまま答えずに中身を具体的に書きます。', q: '下線部 This が指す内容を日本語で答えよう。\nSome people say that money cannot buy happiness. 【This】 may be true, but money can certainly make life easier.', a: 'お金で幸福は買えないということ。', exp: 'This は前の文の that 節の内容(money cannot buy happiness)を指しています。「これは本当かもしれないが、お金で生活が楽になるのは確かだ」という譲歩と逆接の流れです。' },
      { err: 'as を見ると、いつも「〜として」や「〜なので」と1つの訳で済ませ、文脈に合わない訳になってしまう。', why: 'as は前置詞にも接続詞にもなり、「理由・時・比例(〜につれて)・様態(〜のように)・譲歩」など多くの意味をもつのに、最初に覚えた意味だけを当てはめているからです。', fix: 'as の後ろが名詞だけなら前置詞(〜として)、S + V なら接続詞と見分けます。接続詞なら、比較級や変化を表す語(become・grow)があれば「〜につれて」、主節と内容が似ていれば「〜のように」など、文脈で意味を決めます。', q: '和訳しよう。\nAs we went up the mountain, it became colder and colder.', a: '山を登るにつれて、だんだん寒くなった。', exp: 'as の後ろが S + V なので接続詞です。主節に became colder and colder(変化)があるので、「〜につれて」という比例の意味になります。「登ったので寒くなった」では因果が不自然です。' }
    ],
    essay: [
      { q: '次の英文を和訳せよ。\nWhat makes a good teacher, many experienced educators would agree, is not so much the amount of knowledge he or she has as the ability to make students want to keep learning on their own.', limit: '全文を和訳せよ', hint: '主語は What makes a good teacher(よい教師を作るもの=よい教師の条件)、動詞は is です。コンマで挟まれた many … agree は挿入です。not so much A as B(A というよりむしろ B)をつかみます。', model: 'よい教師の条件は、経験豊かな教育者の多くが同意するだろうが、持っている知識の量というよりもむしろ、生徒に自分から学び続けたいと思わせる力である。', points: [['What makes a good teacher を主語として「よい教師の条件(よい教師をよい教師たらしめるもの)」と訳している', 3], ['not so much A as B を「A というよりむしろ B」と正しく訳している', 3], ['make O 原形(want to keep learning)を「〜したいと思わせる」と訳している', 2], ['挿入部分を正しく処理し、日本語として自然である', 2]], ng: 'not so much A as B を「A ほど B ではない」と逆に訳すと、筆者の主張が正反対になり大きく減点されます。' }
    ],
    test: [
      { q: '下線部の that のはたらきを答えよう。\nThe fact 【that】 he lied to us surprised everyone.', a: '同格の接続詞(the fact の内容を表す)', exp: 'that の後ろ he lied to us は欠けた要素のない完全な文です。そのため関係代名詞ではなく、the fact の中身を説明する同格の that です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThis song reminds me ( ) my school days.', choices: ['of', 'about', 'for', 'with'], a: 'A(of)', exp: 'remind 人 of 〜 で「人に〜を思い出させる」です。無生物主語なので「この歌を聞くと、学生時代を思い出す」と訳すと自然です。' },
      { q: '自然な日本語に訳そう。\nThis medicine will make you feel better.', a: 'この薬を飲めば、気分がよくなるだろう。', exp: '無生物主語 + make O 原形の文です。「この薬があなたを〜にする」と直訳せず、「この薬を飲めば」と条件に言いかえると自然です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI can\'t afford ( ) a new car.', choices: ['to buy', 'buying', 'buy', 'bought'], a: 'A(to buy)', exp: 'afford to do で「〜する(金銭的・時間的)余裕がある」です。can\'t と一緒に使われることがほとんどです。' },
      { q: '和訳しよう。\nNot all students like math.', a: 'すべての生徒が数学を好きなわけではない。', exp: 'not all は「すべてが〜というわけではない」という部分否定です。「どの生徒も数学が好きではない」(全否定)とはちがいます。' },
      { q: '日本語に合うように、( ) 内の語を並べかえよう。\n「彼が何を言おうとしているのか、さっぱり分からない。」\nI ( idea / have / what / no ) he is trying to say.', a: 'I have no idea what he is trying to say.', exp: 'have no idea + 疑問詞節で「〜か全く分からない」です。what he is trying to say は間接疑問なので S + V の語順になります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThe letter ( ) him that his plan had been accepted.', choices: ['told', 'said', 'spoke', 'talked'], a: 'A(told)', exp: 'tell は tell 人 that 〜 の形をとれます。say は say to 人 that 〜 となり、人を直後に置けません。無生物主語の文で「手紙によって、計画が受け入れられたことを知った」という意味です。' },
      { q: '自然な日本語に訳そう。\nThe heavy rain prevented us from going out.', a: '大雨のせいで、私たちは外出できなかった。', exp: 'prevent O from 〜ing は「O が〜するのをさまたげる」です。無生物主語なので「大雨のせいで〜できなかった」と訳すのが自然です。' },
      { q: '和訳しよう。\nHard as he tried, he could not solve the problem.', a: 'どんなに一生懸命やってみても、彼はその問題を解けなかった。', exp: '形容詞・副詞 + as + S + V で「〜だけれども・どんなに〜しても」という譲歩を表します。Though he tried hard と言いかえられます。' },
      { q: '和訳しよう。\nThe importance of sleep cannot be overemphasized.', a: '睡眠の大切さは、いくら強調しても強調しすぎることはない。', exp: 'cannot + over-(しすぎる)は「いくら〜してもしすぎることはない」という意味です。cannot 〜 too … と同じ発想の表現です。' }
    ],
    link: {
      prev: '文型・関係詞・準動詞・比較・否定など、文の構造をとるための文法知識すべてが土台です。',
      next: '難関大の長文読解・内容説明問題、要約、自由英作文につながります。大学に入ってからは、英語の専門書や論文を正確に読むための基礎になります。',
      cross: [['国語', '現代文の「傍線部を分かりやすく説明せよ」という問題では、指示語や比喩を具体的な内容に言いかえます。英文和訳や内容説明でも、同じように「中身を明らかにして書く」ことが求められます。'], ['古文', '古文の品詞分解で、助動詞や助詞を1つずつ確かめてから訳すのと同じように、英文も構造(S・V・O・C と修飾関係)を分解してから訳すと、誤訳が大きく減ります。']],
      univ: '翻訳者や通訳者、外交官や国際機関の職員は、英文の構造と意味を正確にとらえる力を日々使っています。大学の研究でも、英語の論文を正確に読むことは、どの分野でも出発点になります。',
      readT: '直訳と意訳のあいだ ― 翻訳者が考えていること',
      read: '英語を日本語に訳すとき、翻訳者はいつも2つの力のあいだでバランスをとっています。1つは、原文の意味や形をできるだけ忠実に写そうとする力(直訳)。もう1つは、日本語として自然に読めるようにしようとする力(意訳)です。\nたとえば The news made her happy. を「そのニュースは彼女を幸せにした」と訳すと、原文の形には忠実ですが、日本語としては少しかたい感じがします。「その知らせを聞いて、彼女は喜んだ」と訳すと自然ですが、主語が入れかわっています。どちらがよいかは、訳す目的や読み手によって変わります。\n入試の下線部和訳では、「構文が正しくとれていることを示す」ことと、「日本語として意味が通ること」の両方が求められます。そのため、まず構造に忠実な訳を作り、次に日本語として不自然な部分だけを直す、という2段階の方法が役に立ちます。\nことばを訳すことは、単語を置きかえることではなく、意味を別のことばで作り直すことなのです。'
    }
  });

  /* ===== e_h5 単語の覚え方・語彙 ===== */
  add('e_h5', {
    rx: [
      { err: '単語帳で「英語 → 日本語」の方向だけを練習し、英作文や会話で、知っているはずの単語を使えない。', why: '英語を見て意味が分かること(受容語彙)と、自分で使えること(発信語彙)は別の力です。片方向だけの練習では、日本語から英語を思い出す道ができていません。', fix: '覚えた単語の一部は、【日本語 → 英語】でも思い出す練習をします。そのとき単語1つではなく、よく一緒に使われる語(make a decision など)とセットで、短い例文ごと声に出します。', q: '英語にしよう。\n「重要な役割を果たす」', a: 'play an important role', exp: 'role(役割)は play(果たす)と組み合わせて使います。「果たす」を do や make にしないよう、動詞とのセットで覚えておくと英作文ですぐに使えます。' },
      { err: 'succeed・success・successful を区別せずに覚え、The project was a great succeed. のように品詞をまちがえて使ってしまう。', why: '単語の「意味」だけを覚え、【品詞(名詞・動詞・形容詞)】を意識していないからです。文の中でどの位置に置けるかは品詞で決まります。', fix: '単語を覚えるときは、品詞と語尾(-ion・-ment・-ful・-ive など)もセットで確認します。空所に入れるときは、まず「ここに入るのは名詞か形容詞か」を文の形から決めます。', q: '( ) 内の語を正しい形にしよう。\nThe project was a great ( succeed ).', a: 'success', exp: 'a great の後ろなので、名詞が入ります。succeed(動詞)の名詞形は success です。形容詞は successful(成功した)です。' },
      { err: 'He claimed that he had seen a UFO. を「彼は UFO を見たと文句を言った」と訳すなど、カタカナ語の意味で英単語を理解してしまう。', why: '日本語のカタカナ語(クレーム・スマート・マンションなど)は、英語から入ったあとで意味が変わったものが多くあります。なじみのあるカタカナ語の意味を、そのまま英語に当てはめてしまうからです。', fix: 'カタカナ語として知っている単語ほど、一度辞書で英語での意味を確かめます。claim(主張する)、smart(頭のよい)、mansion(大邸宅)など、ずれやすい語を自分でリストにしておきます。', q: '和訳しよう。\nHe claimed that he had seen a UFO.', a: '彼は UFO を見たと主張した。', exp: 'claim の中心の意味は「(事実だと)主張する」です。日本語の「クレーム(苦情)」の意味は、英語では complaint や complain で表すのがふつうです。' }
    ],
    essay: [
      { q: 'Which is better for learning English vocabulary: using a word book or reading a lot of English? Give your opinion with reasons.', limit: '60〜80語', hint: '最初にどちらの立場かをはっきり書きます。理由は「覚えやすさ」「使える力」など観点を変えて2つ選び、自分の経験などの具体例を1つ入れると説得力が増します。', model: 'I think reading a lot of English is better for learning vocabulary. First, when we read, we see how words are used in real sentences, so we can understand their meanings more deeply. Second, we meet the same words many times in different stories, which helps us remember them naturally. For example, I learned the word "however" by seeing it in many articles. Therefore, reading is more effective than just using a word book.', points: [['最初に、どちらがよいかという立場をはっきり示している', 2], ['観点の異なる理由を2つ挙げている', 3], ['理由を支える具体例や説明がある', 2], ['語数(60〜80語)を守り、語法・文法の誤りが少ない', 3]], ng: '「どちらにもよい点がある」とだけ書いて立場を決めない答えや、理由が2つとも「覚えやすいから」の言いかえになっている答えは、評価が下がります。' }
    ],
    test: [
      { q: 'unbelievable の意味を、接頭辞と接尾辞から考えて答えよう。', a: '信じられない(un-:〜でない、believe:信じる、-able:〜できる)', exp: 'un-(否定)+ believe(信じる)+ -able(〜できる)で「信じることができない」です。部品に分けると、初めて見る語でも意味を推測できます。' },
      { q: 'decide の名詞形として正しいものを選ぼう。', choices: ['decision', 'decisive', 'decided', 'deciding'], a: 'A(decision)', exp: '-sion は名詞を作る語尾です。decisive は「決定的な」という形容詞です。make a decision(決定する)のように使います。' },
      { q: 'increase(増える)の反対の意味の語を答えよう。', a: 'decrease(減る)', exp: 'in-(中へ)と de-(下へ)が対になっています。どちらも名詞としても動詞としても使えます。' },
      { q: '和訳しよう。\nIt was careless of him to leave the door unlocked.', a: 'ドアに鍵をかけずにおいたとは、彼は不注意だった。', exp: 'careless は care(注意)+ -less(〜がない)で「不注意な」です。-ful をつけた careful(注意深い)と対になります。' },
      { q: '下線部の意味を答えよう。\nHer father 【runs】 three hotels in Kyoto.', a: '経営する', exp: 'run の中心のイメージは「(止まらずに)動かし続ける」です。そこから「(会社や店を)経営する・運営する」という意味が生まれます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nI can\'t ( ) the noise any longer.', choices: ['stand', 'stay', 'stop', 'start'], a: 'A(stand)', exp: 'can\'t stand 〜 で「〜に我慢できない」です。stand には「立つ」のほかに「耐える」という意味があり、否定文・疑問文でよく使われます。' },
      { q: 'postpone の意味を、接頭辞 post- から推測して答えよう。', a: '延期する(post-:後に)', exp: 'post- は「後に」という意味の接頭辞です(post-war:戦後)。「後に置く」から「延期する」という意味になります。put off と同じ意味です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nIt was ( ) of you to bring an umbrella.', choices: ['sensible', 'sensitive', 'sensational', 'sensory'], a: 'A(sensible)', exp: 'sensible は「分別のある・賢明な」、sensitive は「敏感な」です。「傘を持ってきたのは賢明だった」なので sensible です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nThis medicine had no ( ) on me.', choices: ['effect', 'affect', 'effort', 'efficient'], a: 'A(effect)', exp: 'have an effect on 〜 で「〜に影響(効果)をおよぼす」です。effect は名詞、affect は「影響する」という動詞なので、no の後ろには名詞の effect が入ります。' },
      { q: 'spect が「見る」という意味の語根であることを使って、spectator の意味を推測しよう。', a: '観客(見る人)', exp: 'spect(見る)+ -ator(〜する人)で「見る人=観客」です。inspect(中を見る→検査する)、respect(振り返って見る→尊敬する)も同じ語根をもちます。' }
    ],
    link: {
      prev: '中学で学んだ基本単語と、名詞・動詞・形容詞・副詞などの品詞の考え方が土台です。',
      next: '長文読解・リスニング・英作文・スピーキングのすべての土台になります。語彙が増えるほど、文脈から未知の語を推測する力も伸びていきます。',
      cross: [['国語', '漢字の部首(さんずい=水に関係する、など)や熟語の組み立てから意味を推測する方法は、英単語を接頭辞・語根・接尾辞に分けて考える方法とよく似ています。'], ['世界史', '1066年のノルマン・コンクエスト(フランス北部のノルマンディー公による英国征服)のあと、英語にはフランス語の単語が大量に入りました。英単語の成り立ちは、イギリスの歴史と深く結びついています。'], ['生物・化学', 'bio-(生命)、photo-(光)、-logy(学問)のように、理科の用語の多くはギリシャ語やラテン語の部品でできています。photosynthesis(光合成)も photo(光)+ synthesis(合成)です。']],
      univ: '医学・法学・生物学などの専門用語には、ラテン語・ギリシャ語由来の部品が数多く使われています。語源の知識は、大学で専門用語を覚えるときに大きな助けになります。',
      readT: '牛は cow、牛肉は beef ― 英単語の2つのルーツ',
      read: '英語では、生きている動物と、その肉を別の単語で呼ぶことがあります。牛は cow、牛肉は beef。豚は pig、豚肉は pork。羊は sheep、羊肉は mutton です。\nこのちがいの背景には、1066年のノルマン・コンクエストがあります。フランス北部のノルマンディー公ウィリアムがイングランドを征服したあと、しばらくの間、支配階級の人々はフランス語を話していました。そのため、政治・法律・料理など、上流の暮らしに関わる分野に、多くのフランス語の単語が入りました。\nbeef・pork・mutton は、どれもフランス語から来た語です。家畜を育てる人々は昔からの英語で動物を呼び、食卓でその肉を食べる人々はフランス語由来の語で呼んだ、という説明がよくされます。\n同じような「2つの顔」は、ほかの語にも見られます。begin と commence(開始する)、ask と inquire(問い合わせる)では、前者が昔からの英語、後者がフランス語・ラテン語由来で、より改まった響きをもちます。英単語の「格式の差」には、歴史が刻まれているのです。'
    }
  });

  /* ===== e_idiom 熟語 ===== */
  add('e_idiom', {
    rx: [
      { err: 'I can\'t put up with his rudeness. を「彼の失礼さと一緒に上に置けない」のように、熟語を単語ごとに訳してつなげてしまう。', why: '熟語は、単語の意味をたし算したものとはちがう意味をもつことが多いのに、1語ずつの意味から全体を組み立てようとしているからです。', fix: '熟語は【まとまり】で覚え、できれば1語の動詞(put up with = tolerate / stand)に言いかえておきます。文の中で見つけたら、まず熟語として登録されていないかを疑います。', q: '和訳しよう。\nI can\'t put up with his rudeness any longer.', a: '彼の失礼な態度には、もう我慢できない。', exp: 'put up with 〜 は「〜を我慢する」で、tolerate や stand と同じ意味です。単語ごとに訳すと意味が通らないので、まとまりで覚えておく必要があります。' },
      { err: 'be made of と be made from を区別せず、Cheese is made of milk. と書いてしまう。', why: 'どちらも「〜でできている」と訳されるため、材料の【見た目が残っているか】というちがいを意識していないからです。', fix: '製品を見て材料がそのまま分かるなら of(This desk is made of wood.)、材料が変化して見た目では分からないなら from と決めます。材料 → 製品の向きなら be made into です。', q: '( ) に入る前置詞を答えよう。\nCheese is made ( ) milk.', a: 'from', exp: 'チーズを見ても、元の牛乳の形はもう分かりません。材料が変化しているので from を使います。Milk is made into cheese.(牛乳はチーズに加工される)とも言えます。' },
      { err: 'It depends of the weather. や be interested about のように、日本語訳の「〜の」「〜について」から前置詞を推測してしまう。', why: '前置詞を、日本語の助詞と対応させて決めているからです。英語の前置詞は、動詞や形容詞ごとに結びつきが決まっているものが多くあります。', fix: '動詞・形容詞は【前置詞までセット】で覚えます(depend on・be interested in・be proud of)。前置詞の中心イメージ(on = 接触・支え、in = 中)と結びつけると忘れにくくなります。', q: '( ) に入る前置詞を答えよう。\nWhether we go or not depends ( ) the weather.', a: 'on', exp: 'depend on 〜 は「〜しだいである・〜に頼る」です。on の「支えられて上にのっている」イメージから、「〜に支えられている=〜しだい」と理解できます。' }
    ],
    essay: [
      { q: '次の日本文を英訳せよ。\n「彼は新しい環境にすぐに慣れたが、昔の友人たちと連絡を取り続けることを決して忘れなかった。」', limit: '英訳せよ', hint: '「〜に慣れる」は get used to 〜、「〜と連絡を取り合う」は keep in touch with 〜、「必ず〜する」は never fail to 〜 で表せます。', model: 'He soon got used to his new environment, but he never failed to keep in touch with his old friends.\n(never forgot to keep in touch with … も可)', points: [['「〜に慣れる」を get used to(become accustomed to)で正しく表している', 3], ['「連絡を取り続ける」を keep in touch with などで表している', 3], ['「決して忘れなかった」を never failed to / never forgot to で表している', 2], ['時制・冠詞など全体の文法に誤りがない', 2]], ng: 'He used to his new environment のように be(get)を落とすと、「以前はよく〜した」の used to と混同した誤りになります。' }
    ],
    test: [
      { q: '( ) に1語を入れよう。\nIf you don\'t know the word, look it ( ) in the dictionary.', a: 'up', exp: 'look up 〜 で「(辞書などで)〜を調べる」です。目的語が代名詞(it)のときは、look it up のように動詞と副詞の間に置きます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nPlease ( ) your shoes here.', choices: ['take off', 'take on', 'take after', 'take in'], a: 'A(take off)', exp: 'take off は「(服・靴などを)脱ぐ」です。off は「離れて」というイメージで、体から離すことを表します。' },
      { q: '( ) に1語を入れよう。\nShe takes ( ) her mother; they both have big eyes.', a: 'after', exp: 'take after 〜 で「(親など)に似ている」です。resemble と同じ意味ですが、血縁のある年上の人に似ているときに使います。' },
      { q: '和訳しよう。\nI ran into an old friend at the station yesterday.', a: '昨日、駅で昔の友人にばったり会った。', exp: 'run into 〜 は「〜に偶然出会う」です。come across 〜 も同じ意味で使えます。' },
      { q: '下線部を1語の動詞で言いかえよう。\nThe game was 【put off】 because of the rain.', a: 'postponed', exp: 'put off は「延期する」で、postpone と同じ意味です。受動態なので、過去分詞 postponed にします。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nWe have to ( ) the problem right away.', choices: ['deal with', 'deal in', 'deal out', 'deal for'], a: 'A(deal with)', exp: 'deal with 〜 で「〜に対処する・〜を扱う」です。deal in 〜 は「(商品)を商う」という別の意味になります。' },
      { q: '受動態に書きかえよう。\nEveryone looks up to him.', a: 'He is looked up to by everyone.', exp: 'look up to 〜(〜を尊敬する)は3語で1つの動詞のはたらきをするので、受動態でも up to を残します。by と並ぶので、up to by となります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nWhat do you say to ( ) for a walk?', choices: ['going', 'go', 'went', 'gone'], a: 'A(going)', exp: 'What do you say to 〜ing? は「〜するのはどうですか」という提案です。to は前置詞なので、後ろは動名詞です。' },
      { q: '和訳しよう。\nIt goes without saying that health is more important than wealth.', a: '健康が富よりも大切なのは、言うまでもない。', exp: 'It goes without saying that 〜 で「〜は言うまでもない」です。Needless to say, 〜 と言いかえることもできます。' },
      { q: '次の日本文を英訳しよう。\n「失った時間を取り戻すために、彼は一生懸命働いた。」', a: 'He worked hard to make up for the lost time.', exp: 'make up for 〜 は「〜の埋め合わせをする・〜を取り戻す」です。the lost time(失った時間)は、time I lost と言うこともできます。' }
    ],
    link: {
      prev: '基本動詞(get・take・put・look など)と、前置詞・副詞の基本の意味が土台です。',
      next: '長文読解の速さ、リスニングでの聞き取り、英作文や会話での自然な表現につながります。熟語の知識は、同意表現の問題や言いかえ(パラフレーズ)の見ぬきにも役立ちます。',
      cross: [['国語', '日本語の慣用句「手を焼く」「顔が広い」も、単語の意味をたしただけでは意味が分かりません。英語の熟語も同じく、まとまりで1つの意味をもつ表現です。'], ['情報', '翻訳ソフトや AI は、熟語を1語ずつ訳すと誤訳してしまいます。そのため、熟語や決まった言い回しを「まとまり」として扱うしくみが工夫されています。']],
      univ: '翻訳・通訳や、自然言語処理(コンピュータでことばを扱う研究)では、熟語や句動詞の扱いが大きな課題です。ビジネスの英語では、場面に合わせて句動詞と1語の動詞を使い分ける力が求められます。',
      readT: 'put off と postpone ― 2つの顔をもつ英語の動詞',
      read: '英語では、同じ意味を「基本動詞 + 副詞・前置詞」の句動詞でも、1語の動詞でも表せることがよくあります。put off と postpone(延期する)、find out と discover(発見する)、come back と return(戻る)、look into と investigate(調べる)などです。\n多くの場合、句動詞のほうは古くから英語にある短い基本動詞でできています。一方、1語の動詞にはフランス語やラテン語から入ってきた語が多くあります。\nこの由来のちがいは、使われる場面のちがいにもつながっています。句動詞は日常会話でよく使われ、親しみのある響きをもちます。1語の動詞は、論文やニュース、公式の文書などで好まれ、改まった響きをもちます。友達との約束なら Let\'s put it off. が自然ですが、会社の公式のお知らせなら The meeting has been postponed. がふさわしいでしょう。\n熟語を覚えるとき、1語の動詞とセットにしておくと、同意表現の問題に強くなるだけでなく、場面に合った英語を選べるようになります。'
    }
  });

  /* ===== e_h6 論理と段落構成 ===== */
  add('e_h6', {
    rx: [
      { err: '段落が Why do people keep pets? のような疑問文で始まると、それを読みとばすか、疑問文そのものが筆者の主張だと考えてしまう。', why: '「主張は段落の最初の文」と覚えているため、疑問文で始まる段落でも最初の文に主張を探してしまうからです。疑問文は、答えを示すための【問題提起】です。', fix: '段落の最初が疑問文なら、「この問いへの答えはどこか」を探しながら読みます。However や In fact の後ろなどに出てくる答えが、筆者の主張です。', q: '筆者の主張を日本語で答えよう。\nWhy do people keep pets? Some say it is simply for fun. However, studies suggest that pets can also reduce stress and improve our health.', a: 'ペットはストレスを減らし、健康を改善することもできる。(人がペットを飼うのは楽しさのためだけではない)', exp: '最初の疑問文は問題提起です。Some say … は一般論で、However の後ろが筆者の答え(主張)です。疑問文 → 一般論 → However → 主張、という典型的な流れです。' },
      { err: 'This habit・such an approach のような「this / such + 名詞」を、新しい話題が始まったと考え、前の内容とのつながりを見落とす。', why: '指示語の後ろの名詞(habit・approach・problem など)は、前の文の内容を【短い名詞でまとめた言いかえ】であることが多いのに、それに気づいていないからです。', fix: '「this / these / such + 名詞」を見たら、前の文から指している内容を探して線で結びます。その名詞は、前の内容に筆者がつけた「名前」だと考えます。', q: '下線部 This habit が指す内容を日本語で答えよう。\nMany students stay up late using their smartphones. 【This habit】 can harm their health and their performance at school.', a: '(多くの生徒が)スマートフォンを使って夜ふかしすること。', exp: 'This habit は、前の文の stay up late using their smartphones をまとめた言いかえです。habit(習慣)という名詞で、前の内容を「よくない習慣」としてまとめています。' },
      { err: 'This is why 〜 と This is because 〜 を区別せず、原因と結果を逆に読んでしまう。', why: 'どちらも「理由」に関係する表現なので、まとめて「だから」と訳してしまうからです。前と後ろのどちらが原因なのかを確かめていません。', fix: '【This is why 〜:前が原因、後ろが結果(だから〜だ)】【This is because 〜:前が結果、後ろが原因(それは〜だからだ)】と、矢印を書いて確かめます。', q: '次の英文で、原因にあたる内容を日本語で答えよう。\nThe price of bread went up last month. This is because the cost of wheat rose sharply.', a: '小麦の値段が急に上がったこと。', exp: 'This is because 〜 は「それは〜だからだ」で、後ろに原因がきます。パンの値上がり(結果)の原因が、小麦の値上がりです。This is why なら前が原因になります。' }
    ],
    essay: [
      { q: '次の英文を読み、筆者の主張を日本語で要約せよ。\nMany people believe that talent is something we are born with. Of course, some people seem to learn faster than others. However, research on experts in fields such as music and sports suggests that what matters most is not natural ability but the way people practice. Experts do not simply repeat what they can already do. Instead, they focus on their weak points, get advice from others, and set small, clear goals. In other words, talent is not just given to us; it is built through a certain kind of effort.', limit: '70〜90字', hint: 'Many people believe 〜 は一般論、However の後ろと In other words の後ろに筆者の主張があります。具体的な練習のしかた(弱点・助言・目標)を短くまとめて入れます。', model: '才能は生まれつきのものだと思われがちだが、本当に大切なのは練習のしかたである。弱点に集中し、他人の助言を受け、小さく明確な目標を立てる努力によって、才能は作られていく。', points: [['「才能は生まれつき」という一般論を否定する流れが示されている', 2], ['「大切なのは生まれつきの能力ではなく練習のしかた」という主張を書いている', 3], ['弱点に集中する・助言を受ける・目標を立てる、という具体的な努力の内容をまとめている', 3], ['字数(70〜90字)を守り、日本語として自然にまとまっている', 2]], ng: '「才能のある人は速く学べる」(Of course の譲歩の部分)を主張として書くと、筆者の考えと逆の要約になります。' }
    ],
    test: [
      { q: '次のうち、「逆接」を表す語句を選ぼう。', choices: ['However', 'Moreover', 'For example', 'Therefore'], a: 'A(However)', exp: 'However は「しかし」で、前の内容と反対・対立する内容を導きます。Moreover は追加、For example は例示、Therefore は結論・結果です。' },
      { q: 'In addition の後ろには、どのような内容が来るか答えよう。', a: '前の内容に、同じ方向の情報を付け加える内容(追加)', exp: 'In addition は「さらに・加えて」で、前と同じ方向の理由や情報を追加します。Besides・Moreover・Furthermore も同じ仲間です。' },
      { q: '文章の結論を示す語句を選ぼう。', choices: ['In conclusion', 'For instance', 'Similarly', 'Instead'], a: 'A(In conclusion)', exp: 'In conclusion は「結論として」で、文章の最後にまとめを示します。In short・To sum up も同じはたらきです。' },
      { q: 'For instance の後ろには、どのような内容が来るか答えよう。', a: '前に述べた抽象的な内容の具体例', exp: 'For instance は For example と同じく「たとえば」です。後ろは具体例なので、筆者の主張はその前の抽象的な文にあると考えます。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nHe studied very hard for the exam. ( ), he failed it.', choices: ['Nevertheless', 'Therefore', 'Besides', 'Similarly'], a: 'A(Nevertheless)', exp: '「一生懸命勉強した」と「不合格だった」は予想に反する関係なので、「それにもかかわらず」の Nevertheless が入ります。' },
      { q: '下線部の意味を答えよう。\nHe didn\'t take the bus. 【Instead】, he walked to school.', a: 'その代わりに', exp: 'Instead は「その代わりに」で、前に否定された内容に代わるものを示します。「バスに乗らず、その代わりに歩いた」という流れです。' },
      { q: '次の2文のうち、「事実」はどちらか答えよう。\n(1) Tokyo is the capital of Japan.\n(2) Tokyo is the most exciting city in the world.', a: '(1)', exp: '(1) は確かめることができる事実です。(2) の most exciting(いちばんわくわくする)は、人によって感じ方がちがう評価なので「意見」です。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nSome people prefer living in cities; ( ), others prefer living in the countryside.', choices: ['on the other hand', 'for example', 'as a result', 'in addition'], a: 'A(on the other hand)', exp: '都会を好む人と田舎を好む人を対比しているので、on the other hand(一方で)が入ります。' },
      { q: '( ) に入る最も適切なものを選ぼう。\nExercise improves our mood. For example, a short walk can make us feel happier. Exercise also helps us sleep well. ( ), regular exercise is good for both body and mind.', choices: ['In short', 'However', 'For instance', 'Instead'], a: 'A(In short)', exp: '主張 → 具体例 → 追加の理由のあと、最後にまとめている文なので In short(要するに)が入ります。' },
      { q: '次の文章の筆者の主張を日本語で答えよう。\nIt is often said that reading on paper is old-fashioned. Yet when we read on paper, we tend to remember the content better than when we read on a screen. Paper, therefore, still has an important role in learning.', a: '紙で読むことは、今でも学習において大切な役割をもっている。', exp: 'It is often said 〜 は一般論、Yet(しかし)の後ろで反論し、therefore で結論を示しています。最後の文が筆者の主張です。' }
    ],
    link: {
      prev: '中学で学んだ接続詞(and・but・so・because)と、国語の説明文・評論文で学ぶ「段落の役割」の考え方が土台です。',
      next: '長文読解の内容一致・要約問題、自由英作文の組み立て、講義形式のリスニング(el_long)につながります。',
      cross: [['国語', '評論文では「一般論 → 反論 → 筆者の主張」「抽象 → 具体」という流れがよく使われます。英文の論理マーカーを追う読み方は、現代文の読み方とそのまま共通しています。'], ['小論文', '小論文でも、主張・理由・具体例・結論という構成が求められます。英語のパラグラフ・ライティングの型を知ると、日本語の小論文も書きやすくなります。']],
      univ: '大学では、論文の要旨(アブストラクト)を読んで内容をつかんだり、自分でレポートを論理的に組み立てたりする力が求められます。英語の論文は段落ごとの役割がはっきりしているので、構成を知っていると速く正確に読めます。',
      readT: '読み手の責任、書き手の責任',
      read: '文章が分かりにくいとき、その責任はだれにあるのでしょうか。アメリカの言語学者ジョン・ハインズは、1980年代に、言語によってこの考え方がちがうのではないかと論じました。\n彼によれば、英語の文章では、分かりやすく書く責任は主に【書き手】にあるとされます。そのため、最初に主張を示し、However・For example などのことばで流れをはっきりさせ、最後にもう一度まとめる、という書き方が好まれます。\n一方、日本語の文章では、行間を読みとる責任が【読み手】にもあると考えられやすいといいます。結論をはっきり書かずに、読み手に考えさせる文章が「味わいがある」と評価されることもあります。\nもちろん、これはおおまかな傾向で、すべての文章に当てはまるわけではありません。この考え方には単純すぎるという批判もあります。それでも、英文を読むときに「筆者は論理マーカーで流れを示してくれているはずだ」と考えて読むと、文章の構造がぐっと見えやすくなります。英語で書くときも、読み手を迷わせない工夫を意識しましょう。'
    }
  });

  /* ===== el_sound 音の変化 ===== */
  add('el_sound', {
    rx: [
      { err: '聞き取れない原因を「速すぎるから」だけだと考え、ゆっくりした音声をくり返し聞くことしかしない。', why: '音の変化(連結・脱落・同化など)を知らないと、ゆっくり聞いても実際の速さの英語の音と結びつきません。自分で発音できない音は、聞き取ることも難しいのです。', fix: '聞き取れなかった部分をスクリプトで確かめ、どんな音の変化が起きていたかを書きこみます。そのうえで、音声をまねして【自分でも同じように発音】してみます(音読・シャドーイング)。', q: 'くだけた会話で、I want to go. の want to は、どのように聞こえることが多いか答えよう。', a: 'wanna(ワナ)のように聞こえる。', exp: 'want to は、/t/ が続くことで音がつながり、くだけた会話では wanna のように聞こえることがよくあります。自分でもそのように発音してみると、聞き取れるようになります。' },
      { err: 'つづりの文字をすべて発音するものと考え、Wednesday のように読まない文字がある単語を、聞いても分からない。', why: '英語のつづりと発音は一致しないことが多いのに、ローマ字のように文字から音を作っているからです。', fix: '新しい単語は、つづりだけでなく【辞書の発音記号や音声】で確かめます。黙字(書いても発音しない文字)をふくむ語は、まとめてリストにします。', q: 'Wednesday で、ふつう発音しない文字を1つ答えよう。', a: '最初の d(Wed の d)', exp: 'Wednesday はふつう「ウェンズデイ」のように発音し、最初の d は発音しません。知っている単語でも、つづりどおりに覚えていると聞き取れないことがあります。' },
      { err: 'hotel を「ホ」に強勢を置いて覚えていたため、ho-TEL と後ろを強く発音されると、別の単語だと思ってしまう。', why: 'カタカナ語の発音(ホテル)のくせで、強勢の位置を覚えていないからです。英語では強勢の位置が変わると、同じ単語に聞こえないことがあります。', fix: '単語を覚えるときは、意味やつづりと一緒に【どこを強く読むか】も確かめます。カタカナ語と強勢の位置がずれる語(hotel・event・percent など)は特に注意します。', q: 'hotel はどこを強く読むか答えよう。', a: '後ろ(-tel)。ho-TEL', exp: 'hotel は2つめの音節 -tel に強勢があります。カタカナの「ホテル」とは強く読む位置がちがうので、注意しないと聞き取れません。' }
    ],
    essay: [
      { q: '英語の音の変化(連結・脱落・同化など)を知っていると、なぜ英文の書き取り(ディクテーション)で正しく書ける語が増えるのか。具体例を1つ挙げて説明せよ。', limit: '100〜120字', hint: '「聞こえた音」と「書くべき単語」がずれる理由を説明し、そのずれを元に戻す手がかりとして音の変化の知識が役立つ、という流れで書きます。', model: '自然な速さの英語では、単語どうしがつながったり音が変化したりするため、聞こえた音と単語のつづりが一致しない。たとえば Did you は「ディジュ」と聞こえるが、同化の知識があれば元の2語に戻せる。そのため正しく書ける語が増える。', points: [['自然な英語では、聞こえる音と単語のつづりがずれることを説明している', 3], ['音の変化の具体例を正しく挙げている', 3], ['音の変化の知識によって、聞こえた音を元の単語に戻せることを説明している', 2], ['字数(100〜120字)を守り、論理的にまとまっている', 2]], ng: '「たくさん聞けば慣れるから」のように、音の変化の知識がどう役立つのかにふれない答えは、問いに答えていないとされます。' }
    ],
    test: [
      { q: 'Check it out. が「チェキラウト」のように聞こえるのは、主にどの音の変化によるものか。', choices: ['連結', '脱落', '同化', '弱形'], a: 'A(連結)', exp: '子音で終わる語(check・it)の後ろに母音で始まる語(it・out)が来ると、音がつながります。これが連結です。' },
      { q: 'good morning の good の /d/ が、ほとんど聞こえないのはどの音の変化か。', choices: ['脱落', '連結', '同化', '強勢'], a: 'A(脱落)', exp: '/d/ の後ろに子音 /m/ が続くため、/d/ がほとんど発音されなくなります。これが脱落です。' },
      { q: 'Did you が「ディジュ」のように聞こえるのは、どの音の変化か答えよう。', a: '同化', exp: '/d/ と /j/ が混ざり合って、「ジュ」のような1つの音になります。となりの音どうしが影響し合う変化を同化といいます。' },
      { q: 'rock and roll の and は、ふつうどのように弱く発音されるか答えよう。', a: 'n(「ン」)だけのように弱く短く発音される。', exp: 'and のような機能語は、文の中では弱形で発音されることが多く、/n/ だけのように聞こえることもあります。' },
      { q: '文の中でふつう強く読まれやすいものを選ぼう。', choices: ['名詞', '冠詞', '前置詞', '代名詞'], a: 'A(名詞)', exp: '名詞・動詞・形容詞・副詞などの内容語は、意味の中心なので強く読まれます。冠詞・前置詞・代名詞などの機能語は弱く読まれやすくなります。' },
      { q: '肯定文 I can do it. の can と、否定文 I can\'t do it. の can\'t を聞き分ける手がかりを答えよう。', a: '肯定文の can は弱く短く(クン のように)発音されることが多く、can\'t は強めにはっきり発音されることが多い。', exp: 'can\'t の /t/ は聞こえにくいので、/t/ だけで判断せず、can の部分の強さと母音の長さに注目します。' },
      { q: 'record を「記録する」という動詞として使うとき、どこを強く読むか答えよう。', a: '後ろ(re-CORD)', exp: 'record は名詞(記録)なら前(RE-cord)、動詞(記録する)なら後ろ(re-CORD)を強く読みます。強勢の位置で品詞が変わる語の例です。' },
      { q: 'アメリカ英語で Not at all. が「ナラロー」のように聞こえるのは、どの音が変化しているからか答えよう。', a: '母音にはさまれた /t/ が、ラ行に近い音(はじき音)に変わっているから。', exp: 'アメリカ英語では、母音にはさまれた /t/ が舌で軽くはじく音になり、日本語のラ行に近く聞こえることがあります(water が「ワラ」に聞こえるなど)。' },
      { q: '次の文で HE を強く読んだとき、どのような意味になるか答えよう。\nI didn\'t say HE stole the money.', a: '「お金を盗んだのが彼だとは言っていない(盗んだのは別の人かもしれない)」という意味。', exp: '英語では、どの語を強く読むかで、文の焦点(打ち消したい部分)が変わります。HE を強く読むと、「盗んだ人」が否定の焦点になります。' },
      { q: 'You\'re coming? を文末を上げて言ったとき、話し手はどんな気持ちを表しているか答えよう。', a: '「来るんだよね?」と確認したり、驚いたりする気持ち。', exp: '肯定文の形でも文末を上げて言うと、疑問や確認、驚きを表します。疑問文の形でなくても、イントネーションで意味が変わります。' }
    ],
    link: {
      prev: '中学で学んだ単語の発音と、文の区切り方・アクセントの基本が土台です。',
      next: '短い対話・長い会話・講義のリスニング、スピーキングの発音や音読、英検などの面接試験につながります。',
      cross: [['音楽', '英語の強弱のリズムは、音楽の拍子と似ています。強く読む音節が一定の間隔で現れ、その間の弱い音節は速く短く読まれます。歌の歌詞で英語の音のつながりを練習する方法もあります。'], ['国語', '日本語は「か・な・が」のように、ほぼ同じ長さの音(モーラ)を並べて話す言語です。英語のように強弱で音の長さが変わる言語とのちがいを知ると、聞き取りにくい理由が分かります。'], ['生物', '耳から入った音は、内耳で電気信号に変えられて脳に送られます。どの音を区別して聞くかは、耳だけでなく脳の学習によって決まる部分も大きいと考えられています。']],
      univ: '大学の音声学では、ことばの音のしくみを科学的に研究します。言語聴覚士の仕事や、音声認識 AI の開発でも、音の変化の知識が使われています。',
      readT: '赤ちゃんは「どんな言語の音」も聞き分けられる?',
      read: '日本語を話す人の多くは、英語の l と r の区別に苦労します。では、生まれたばかりの赤ちゃんも同じなのでしょうか。\nカナダの心理学者ジャネット・ワーカーらの研究などによって、生後半年ほどの赤ちゃんは、自分の母語にはない音の区別にも反応できることが分かってきました。ところが、生後1年に近づくころには、母語で区別する音にはより敏感になる一方、母語で区別しない音には反応しにくくなっていくといいます。\nこれは「能力が落ちる」というより、赤ちゃんの脳が、周りで話されている言語に合わせて音の聞き方を調整していると考えられています。必要な区別に集中することで、母語を効率よく身につけられるのです。\n大人になってからでも、意識的な練習で聞き分ける力は伸ばせることが、多くの研究で示されています。英語の音の聞き取りは、才能ではなく、練習によって脳の聞き方を調整していく作業だといえるでしょう。'
    }
  });

  /* ===== el_short 短い対話のリスニング ===== */
  add('el_short', {
    rx: [
      { err: '質問が What will the woman do? なのに、対話で男性がすると言ったことを選んでしまう。質問の主語を確かめないくせ。', why: '対話の内容が聞き取れると安心してしまい、【だれについての質問か】を確かめる前に、聞こえた行動を答えにしてしまうからです。', fix: '先読みの段階で、質問文の主語(the man / the woman)と疑問詞(what・where・when)に丸をつけます。放送中は、その人物の発言だけに注意を集中させます。', q: '対話を読み、質問に答えよう。\nM: Shall I pick you up at the station?\nW: Thanks, but my sister will drive me there.\nQ: How will the woman get there?', a: '姉(妹)に車で送ってもらう。', exp: '男性は駅まで迎えに行くと申し出ていますが、女性は Thanks, but … と断り、姉(妹)が車で送ってくれると言っています。質問の主語は the woman なので、男性の申し出を答えにしないよう注意します。' },
      { err: 'Don\'t you like it? と聞かれて Yes. と答えた人を、日本語の感覚で「好きではない」と解釈してしまう。', why: '日本語では「好きじゃないの?」に「はい(好きじゃない)」と答えるため、その感覚で英語の Yes / No を読んでしまうからです。', fix: '英語の Yes / No は、質問の形ではなく【答えの内容が肯定か否定か】で決まります。Yes の後ろには I do(好き)、No の後ろには I don\'t(好きではない)が省略されていると考えます。', q: '対話を読み、B がこの料理をどう思っているか答えよう。\nA: Don\'t you like this soup?\nB: Yes, I do. It\'s delicious.', a: '好きだと思っている(おいしいと思っている)。', exp: 'Yes の後ろの I do は I like it のことです。否定疑問文でも、好きなら Yes、好きでなければ No で答えます。続く It\'s delicious. も、好きであることを示しています。' },
      { err: 'I was going to go to the party. を聞いて、その人はパーティーに行ったのだと判断してしまう。', why: 'go という動詞が聞こえたことで、行動が実際に起きたと思いこむからです。was going to は「〜するつもりだった」で、【実現しなかった予定】を表すことが多い形です。', fix: 'was going to・was planning to・had hoped to を聞いたら、「その予定は実現しなかったのでは」と考え、後ろに but が続かないかを待ちます。', q: '対話を読み、女性がパーティーに行ったかどうか答えよう。\nM: How was the party last night?\nW: I was going to go, but I had to finish my report.', a: '行かなかった。', exp: 'I was going to go は「行くつもりだった」で、but 以下で行けなかった理由(レポートを終わらせなければならなかった)を述べています。予定が実現しなかったことを表す典型的な言い方です。' }
    ],
    essay: [
      { q: '次の対話を読み、B の発言の意図と、それを受けた A の最後の発言がなぜ自然な応答になっているのかを、日本語で説明せよ。\nA: Would you like to go to the movies tonight?\nB: I\'d love to, but I have to finish my report by tomorrow morning.\nA: How about Saturday, then?', limit: '80字以内', hint: 'B は「行きたい」と言いつつ、but の後ろで行けない理由を述べています。A はその理由を理解したうえで、どう返しているかを考えます。', model: 'B は誘いを喜びつつ、明朝が締め切りのレポートがあるため今夜は行けないと断っている。A はその事情を理解し、都合がつきそうな別の日を提案しているので自然である。', points: [['B が誘いを断っていることを説明している', 3], ['断った理由(明朝締め切りのレポート)にふれている', 2], ['A が B の事情を理解し、別の日を提案していることを説明している', 3], ['字数(80字以内)を守り、簡潔にまとまっている', 2]], ng: '「B は映画に行きたいと思っている」とだけ書くと、I\'d love to の前半だけを聞いて、断っていることを読み落とした答えになります。' }
    ],
    test: [
      { q: '放送の内容から、2人が会う時刻を答えよう。\nW: The concert starts at seven, but let\'s meet thirty minutes before that.', a: '6時30分', exp: '開演は7時で、その30分前に会おうと言っています。聞こえた数字(seven)をそのまま答えず、計算が必要かどうかを考えます。' },
      { q: 'Why don\'t we take a break? という発言のはたらきとして最も適切なものを選ぼう。', choices: ['提案', '理由の質問', '苦情', '謝罪'], a: 'A(提案)', exp: 'Why don\'t we 〜? は「〜しませんか」という提案の決まった言い方です。文字どおり「なぜ〜しないのか」と理由をたずねているわけではありません。' },
      { q: '対話を読み、女性がすることを答えよう。\nM: Can I borrow your pen for a minute?\nW: Sure, go ahead.', a: '男性にペンを貸す。', exp: 'Sure, go ahead. は「いいですよ、どうぞ」という許可の表現なので、女性はペンを貸します。' },
      { q: '放送の内容から、支払う金額を答えよう。\nM: Tickets are 1,200 yen each, and we need three.', a: '3,600円', exp: '1枚1,200円のチケットを3枚買うので、1,200 × 3 = 3,600円です。' },
      { q: '対話を読み、2人が会う曜日を答えよう。\nM: Let\'s meet at the library on Monday.\nW: I can\'t make it on Monday. How about Tuesday?\nM: Tuesday is fine with me.', a: '火曜日', exp: '最初は月曜日でしたが、女性の都合で火曜日に変わりました。最後に決まった内容が答えになります。' },
      { q: 'I couldn\'t agree more. の意味として最も適切なものを選ぼう。', choices: ['大賛成だ', '全く賛成できない', '少しだけ賛成だ', 'よく分からない'], a: 'A(大賛成だ)', exp: '「これ以上賛成することはできない」=「完全に賛成だ」という意味です。couldn\'t が聞こえても、反対しているわけではありません。' },
      { q: '対話を読み、今本屋が開いているかどうか答えよう。\nW: Is the bookstore still open?\nM: It usually closes at eight, but today it closed at six. It\'s seven now.', a: '閉まっている。', exp: 'ふだんは8時閉店ですが、今日は6時に閉まりました。今は7時なので、もう閉まっています。「ふだん」と「今日」の条件のちがいに注意します。' },
      { q: '次の発言が聞こえる場所として最も適切なものを答えよう。\nMay I see your boarding pass and passport, please?', a: '空港(の搭乗手続きや出国審査など)', exp: 'boarding pass(搭乗券)と passport(パスポート)から、空港での会話だと分かります。場所の問題では、その場所でしか使わない語を手がかりにします。' },
      { q: '対話を読み、女性の気持ちとして最も適切なものを答えよう。\nM: Do you mind if I open the window?\nW: Actually, I\'m a little cold.', a: '窓を開けてほしくない。', exp: '女性は「実は少し寒い」と言うことで、遠回しに窓を開けないでほしいと伝えています。Yes / No を言わない答え方で、意図を読み取ります。' },
      { q: '放送の内容から、シャツを2枚買うときの代金を答えよう。\nM: These shirts are 3,000 yen each, but if you buy two, you get 20% off the total.', a: '4,800円', exp: '2枚で6,000円、その20%引きなので 6,000 × 0.8 = 4,800円です。「合計から20%引き」なので、1枚ごとに計算しても同じ結果になります。' }
    ],
    link: {
      prev: '中学で学んだ会話表現(誘い・依頼・提案)と、疑問文の形と答え方が土台です。',
      next: '長い会話や講義のリスニング、スピーキングで相手の意図をくみ取って答える力、実際の英語でのコミュニケーションにつながります。',
      cross: [['国語', '日本語でも「今日はちょっと…」と言えば、はっきり言わなくても断っていることが伝わります。英語の短い対話で、遠回しな表現から意図を読み取るのと同じしくみです。'], ['倫理', '「言ったこと」と「伝えたいこと」のずれは、哲学でも研究されてきました。下の読み物で紹介するグライスの考え方は、ことばの哲学の分野で今も議論されています。']],
      univ: '大学の言語学には、ことばが場面の中でどう解釈されるかを研究する「語用論」という分野があります。接客業やビジネスの交渉、医療の現場でも、相手の発言の意図を正しくくみ取る力は大切です。',
      readT: '「言っていないこと」が伝わるしくみ ― グライスの会話の含意',
      read: '「今夜、映画に行かない?」と誘われて「明日テストなんだ」と答えたら、相手は「行けないんだな」と分かります。でも、答えた人は一度も「行けない」とは言っていません。なぜ伝わるのでしょうか。\nイギリスの哲学者ポール・グライスは、会話をする人どうしは、互いに協力して会話を進めようとしているという前提をもっている、と考えました。これを「協調の原理」といいます。さらに、会話では「必要なだけの情報を言う」「本当だと思うことを言う」「関係のあることを言う」「分かりやすく言う」ことが期待されている、と整理しました。\n誘いに対する答えとして「明日テストだ」というのは、一見関係がないように見えます。しかし、聞き手は「相手は関係のあることを言っているはずだ」と考えて、「テスト勉強があるから映画には行けない」という意味を推論します。このように、言われていないのに伝わる意味を「含意」と呼びます。\nリスニングの「発言の意図」を問う問題は、まさにこの推論の力を試しているのです。'
    }
  });

  /* ===== el_long 長い会話・講義のリスニング ===== */
  add('el_long', {
    rx: [
      { err: '講義の最初の1〜2文を「まだ前置きだから」と聞き流し、何についての話で、いくつの部分に分かれるのかをつかまないまま聞き進めてしまう。', why: '英語の講義では、冒頭で話題と構成(いくつの点を話すか)が予告されることが多いのに、その重要さを知らないからです。', fix: '放送が始まったら、最初の数文に集中して【話題】と【数(three ways など)】をメモします。構成が分かれば、First・Second などの合図を待ちながら聞けます。', q: '次の講義の冒頭から、話題といくつの部分に分かれるかを答えよう。\nToday I\'d like to talk about three ways cities can reduce traffic.', a: '話題:都市が交通量を減らす方法。3つの部分に分かれる。', exp: 'three ways(3つの方法)と予告しているので、この後 First・Second・Finally などで3つの方法が順に説明されると予測できます。冒頭の予告は、メモの枠組みを作る手がかりになります。' },
      { err: '話し手が言い直したり訂正したりしても、最初に聞こえた数字や情報をそのままメモして答えにしてしまう。', why: '一度メモしたことを正しい情報だと思いこむため、sorry・I mean・or rather などの【訂正の合図】に反応できないからです。', fix: 'sorry・I mean・actually・or rather が聞こえたら、直前のメモに線を引き、その後ろの情報に書きかえる準備をします。', q: '次の発言から、博物館が開館した年を答えよう。\nThe museum opened in 1985 — sorry, I mean 1995.', a: '1995年', exp: 'sorry, I mean … は言い直しの合図です。最初の1985年はまちがいで、正しくは1995年です。訂正の後ろの情報が答えになります。' },
      { err: 'nearly a third of 〜・less than half of 〜 のような、分数やあいまいな量の表現を、具体的な数字に直せない。', why: '数字そのもの(30%など)を聞き取る練習はしていても、分数やおおよその量を表すことばに慣れていないからです。', fix: 'a third(3分の1)、a quarter(4分の1)、half(半分)、nearly(〜近く・〜弱)、over / more than(〜より多い)などを、数字とセットで覚えます。メモでは「1/3弱」のように記号で書きます。', q: '次の発言の内容を数字で表そう。\nNearly a third of the students walk to school.', a: '生徒の3分の1近く(約30%前後で、3分の1よりやや少ない)が歩いて通学している。', exp: 'a third は「3分の1」、nearly は「〜近く(わずかに足りない)」という意味です。グラフの問題では、33%よりやや小さい値を選ぶ手がかりになります。' }
    ],
    essay: [
      { q: '次の講義の一部を読み、話し手の主張を日本語でまとめよ。\nToday I want to talk about why cities should plant more trees. You might think trees are just for decoration. But they actually do much more. First, trees provide shade and can lower the temperature of streets on hot summer days. Second, they help reduce stress; people who can see green spaces often say they feel more relaxed. Of course, trees cost money to plant and take care of. However, considering these benefits, planting trees is a smart investment for any city.', limit: '80〜100字', hint: '「飾りにすぎない」という予想される考えを否定し、2つの利点を示し、費用の問題にふれたうえで結論を述べる、という講義の構成をそのまま生かしてまとめます。', model: '木は飾りにすぎないと思われがちだが、夏の街の気温を下げ、人々のストレスを減らす効果がある。植えて手入れする費用はかかるものの、その利点を考えれば、木を植えることは都市にとって賢い投資である。', points: [['「都市はもっと木を植えるべきだ(賢い投資だ)」という結論を書いている', 3], ['気温を下げる効果とストレスを減らす効果の2つの利点をまとめている', 3], ['費用がかかるという反対の要素にもふれている', 2], ['字数(80〜100字)を守り、日本語として自然にまとまっている', 2]], ng: '「木には費用がかかる」(Of course の譲歩の部分)を中心にまとめると、話し手の主張と逆の要約になります。' }
    ],
    test: [
      { q: '講義で First, … Second, … Finally, … が聞こえたとき、話はどのような構成になっていると考えられるか答えよう。', a: 'いくつかの項目を順番に挙げて説明する構成(列挙・順序)', exp: 'First・Second・Finally は、要点を順番に並べる合図です。メモでは ① ② ③ と番号をふって整理します。' },
      { q: 'For example が聞こえたとき、その後ろに来る内容として最も適切なものを選ぼう。', choices: ['直前の内容の具体例', '反対の意見', '話全体の結論', '新しい話題'], a: 'A(直前の内容の具体例)', exp: 'For example の後ろは具体例です。「何の例なのか」を直前の内容で確かめておくと、要点を見失いません。' },
      { q: '次の発言の内容から、来場者が何人増えたか答えよう。\nThe number of visitors increased from 200 to 500.', a: '300人', exp: 'from 200 to 500 は「200人から500人へ」なので、増えた人数は 500 − 200 = 300人です。' },
      { q: 'In other words の意味を答えよう。', a: '言いかえれば・つまり', exp: 'In other words は、直前の内容を別のことばで言いかえる合図です。後ろに、より分かりやすい要点が来ることが多くあります。' },
      { q: '次の発言の内容から、今年の売上を答えよう。\nLast year our sales were 100 million yen. This year, they doubled.', a: '2億円', exp: 'double は「2倍になる」です。1億円の2倍なので、今年の売上は2億円です。' },
      { q: '講義で The key point is … が聞こえたとき、その後ろに来るものとして最も適切なものを選ぼう。', choices: ['話し手が最も伝えたい要点', '具体例', '冗談', '質問'], a: 'A(話し手が最も伝えたい要点)', exp: 'The key point is …(重要な点は〜)は、強調の合図です。この後ろはメモに必ず残すべき内容です。' },
      { q: '次の発言の内容から、現在の会員数を答えよう。\nWe had 800 members five years ago, but the number has decreased by half.', a: '400人', exp: 'decrease by half は「半分だけ減る」=「半分になる」です。800人の半分なので400人です。' },
      { q: '会話を読み、B の考えとして最も適切なものを答えよう。\nA: So, what do you think of the plan?\nB: It\'s not that I don\'t like the plan. It\'s just that we don\'t have enough time.', a: '計画そのものが嫌なわけではないが、時間が足りないことを心配している。', exp: 'It\'s not that 〜. It\'s just that … は「〜というわけではない。ただ…なのだ」という言い方です。本当の理由は It\'s just that の後ろにあります。' },
      { q: '次の発言から、売上の変化を日本語で説明しよう。\nSales rose sharply in spring, remained steady in summer, and then fell slightly in autumn.', a: '春に急に増え、夏はほぼ横ばいで、秋に少し減った。', exp: 'rose sharply(急に増えた)、remained steady(横ばいだった)、fell slightly(少し減った)のように、変化の向きと大きさを表す語をセットで聞き取ります。グラフ問題でよく問われる表現です。' },
      { q: '次の発言の内容から、歩いて通学している生徒の人数を答えよう。\nOf the 400 students surveyed, one in five said they walk to school.', a: '80人', exp: 'one in five は「5人に1人」です。400人の5分の1なので、400 ÷ 5 = 80人です。' }
    ],
    link: {
      prev: '音の変化(el_sound)と短い対話の聞き取り(el_short)、論理マーカー(e_h6)の知識が土台です。',
      next: 'リスニング試験全体の戦略(el_strategy)、英語で行われる大学の講義の理解、英語でのプレゼンテーションや議論につながります。',
      cross: [['国語', '説明文の「序論・本論・結論」という構成は、英語の講義の「予告 → 説明 → まとめ」とよく似ています。構成を意識すると、日本語でも英語でも要点がつかみやすくなります。'], ['数学・理科', '講義の数値問題では、増加・減少・割合をすばやく計算する力が必要です。グラフの読み取りも、理科の実験データや数学の資料の分析と同じ考え方です。']],
      univ: '大学では、英語で行われる講義や、留学生と英語で議論する授業も増えています。講義を聞きながら要点をメモする力は、どの学部でも欠かせません。',
      readT: 'コーネル式ノート ― 聞きながら書くための工夫',
      read: '講義を聞きながらメモをとるのは、意外と難しいものです。すべてを書こうとすると次の話を聞き逃し、何も書かないと後で思い出せません。\nこの問題を解決する方法の1つとして知られているのが「コーネル式ノート」です。アメリカのコーネル大学で学生の学習指導をしていたウォルター・ポークが広めた方法で、1950年代ごろから使われてきました。\nコーネル式では、ノートの1ページを3つに分けます。右側の広い部分には、講義中にキーワードや要点を短く書きます。左側の細い欄には、講義の後で、その内容についての「問い」やキーワードを書きこみます。そしてページの下には、そのページの内容を数行でまとめます。\nこの方法のよいところは、書くことを「聞きながらのメモ」と「後での整理」に分けている点です。講義中は短く書くことに集中し、後で問いとまとめを作ることで、内容が記憶に残りやすくなります。\nリスニング試験のメモも、「その場では短く」が基本です。キーワードと数字と記号だけを書き、考えるのは後に回しましょう。'
    }
  });

  /* ===== el_strategy リスニング試験の戦略 ===== */
  add('el_strategy', {
    rx: [
      { err: '先読みで、選択肢の英文をすべて日本語に訳そうとして、放送が始まるまでに読み終わらない。', why: '先読みの目的を「選択肢を理解すること」だと考えているからです。本当の目的は、【どこに注意して聞けばよいか】を決めることです。', fix: '選択肢を見比べて、【ちがっている部分】だけに丸をつけます。主語や動詞が同じなら読みとばし、ちがう語(交通手段・時刻・場所など)を「聞くべきポイント」としてつかみます。', q: '次の選択肢を先読みしたとき、放送で特に注意して聞くべき点を答えよう。\n(A) He will take a bus. (B) He will take a taxi. (C) He will walk. (D) He will ride a bike.', a: '彼がどの交通手段を使うか。', exp: '4つの選択肢は He will までが共通で、ちがうのは交通手段だけです。訳さなくても、「交通手段を聞けばよい」と分かれば先読みは十分です。' },
      { err: '2回読みの問題で、1回目に聞き取れなかった部分を、2回目もただ同じように全体を聞き直してしまう。', why: '2回目を「もう一度聞くチャンス」としか考えず、1回目の結果をもとに聞き方を変えるという発想がないからです。', fix: '1回目で選択肢を2つ程度にしぼり、【その2つのちがい】を確かめることを2回目の目標にします。1回目のあとに、「何を確かめるか」を一言メモしておきます。', q: '2回読みの問題で、1回目に答えを (A) と (C) の2つにしぼった。2回目はどのように聞くとよいか答えよう。', a: '(A) と (C) のちがっている部分に注意をしぼって聞き、どちらが放送の内容と合うかを確かめる。', exp: '2回目は全体を聞き直すのではなく、しぼりこんだ選択肢のちがいに集中します。目的をはっきりさせると、同じ音声でも聞き取れる情報が増えます。' },
      { err: '放送の Most of the members agreed. を聞いて、選択肢 All the members agreed. を正解に選んでしまう。all・only・never などの強い語を見落とすくせ。', why: '選択肢の中に放送と同じ語(members・agreed)があると、内容が一致していると感じてしまうからです。量や範囲を表す語の小さなちがいに注意していません。', fix: '先読みのとき、選択肢の中の【all・every・only・never・always など、範囲を言い切る語】に丸をつけます。放送がその範囲まで言っているかを確かめます。', q: '放送と選択肢の内容は一致しているか答えよう。\n放送:Most of the members agreed with the plan.\n選択肢:All the members agreed with the plan.', a: '一致しない。', exp: '放送は「ほとんどのメンバーが賛成した」で、賛成しなかった人もいることになります。選択肢の All(全員)は言いすぎです。範囲を表す語は、ひっかけによく使われます。' }
    ],
    essay: [
      { q: 'What do you think is the most effective way to improve your English listening skills? Explain your opinion with reasons and examples.', limit: '60〜80語', hint: '方法を1つにしぼって最初に示します。なぜ効果があるのかという理由と、自分ならどう実践するかという具体例をそろえると、説得力のある答えになります。', model: 'I think the most effective way is to listen to the same audio many times and check the script. First, when we read the script, we can find out which sounds we could not catch and why. Second, after that, we can repeat the audio and copy the speaker\'s rhythm. For example, I practice with a short news story every day. As a result, I can now catch linked sounds much better.', points: [['最初に、最も効果的だと考える方法を1つ明確に示している', 2], ['その方法が効果的である理由を説明している', 3], ['自分の経験などの具体例を挙げている', 2], ['語数(60〜80語)を守り、語法・文法の誤りが少ない', 3]], ng: '「たくさん聞く」「毎日聞く」のように方法があいまいで、なぜ効果があるのかを説明していない答えは、内容の評価が低くなります。' }
    ],
    test: [
      { q: '質問文 Where will they meet? を先読みしたとき、放送で特に注意すべき情報を答えよう。', a: '2人が会う場所', exp: '疑問詞 Where から、場所が問われていると分かります。放送では、場所を表す語と、その場所が変更されないかに注意します。' },
      { q: '放送と選択肢の内容が一致しているか答えよう。\n放送:I\'m starving.\n選択肢:He is very hungry.', a: '一致している。', exp: 'starving は「とてもおなかがすいている」という意味で、very hungry の言いかえです。正解の選択肢は、放送とちがう語で同じ内容を表すことが多くあります。' },
      { q: 'purchase と同じ意味の基本語を答えよう。', a: 'buy', exp: 'purchase は「購入する」という、やや改まった語です。放送で buy と言い、選択肢で purchase と書くような言いかえがよく使われます。' },
      { q: '放送と選択肢の内容が一致しているか答えよう。\n放送:The train was delayed because of the snow.\n選択肢:The train didn\'t arrive on time.', a: '一致している。', exp: 'was delayed(遅れた)を didn\'t arrive on time(時間どおりに着かなかった)と言いかえています。表現がちがっても内容は同じです。' },
      { q: '放送と選択肢の内容が一致しているか答えよう。\n放送:Not everyone came to the party.\n選択肢:Some people didn\'t come to the party.', a: '一致している。', exp: 'Not everyone は「全員が〜したわけではない」という部分否定で、「来なかった人もいる」という意味です。「だれも来なかった」ではありません。' },
      { q: '1回しか読まれない問題で、答えが分からなかった。最も適切な行動を選ぼう。', choices: ['仮の答えを選んで印をつけ、すぐ次の問題の先読みに移る', '分かるまでその問題を考え続ける', '答えを空らんにしたまま待つ', '前の問題にもどって見直す'], a: 'A(仮の答えを選んで印をつけ、すぐ次の問題の先読みに移る)', exp: '1回読みでは、考え続けると次の問題の先読みができなくなります。仮の答えを選んで切りかえ、時間が残れば後で見直します。' },
      { q: '放送の内容から、12月の月曜日に店が開いているか答えよう。\n放送:The store is closed on Mondays, except in December.', a: '開いている。', exp: 'except in December は「12月を除いて」です。月曜定休ですが、12月だけは例外なので、12月の月曜日は開いています。' },
      { q: '放送の内容から、話し手がどうしたいか答えよう。\n放送:I\'d rather walk than take the bus.', a: 'バスに乗るより歩きたい。', exp: 'would rather A than B は「B するより A したい」です。walk(歩く)のほうを選んでいます。' },
      { q: '放送の内容に合うものを選ぼう。\n放送:The meeting, originally planned for Tuesday, has been moved to Thursday, and the room has changed from 201 to 305.', choices: ['木曜日・305号室', '火曜日・305号室', '木曜日・201号室', '火曜日・201号室'], a: 'A(木曜日・305号室)', exp: '会議は火曜日から木曜日に、部屋は201号室から305号室に変わりました。変更前と変更後の両方が読まれるので、「変更後」の情報を選びます。' },
      { q: '放送の内容に合うものを答えよう。\n放送:Hardly any students failed the test.', a: 'ほとんどの生徒がテストに合格した。', exp: 'hardly any は「ほとんど〜ない」です。「不合格の生徒はほとんどいなかった」=「ほとんどの生徒が合格した」となります。' }
    ],
    link: {
      prev: '音の変化(el_sound)、短い対話(el_short)、長い会話・講義(el_long)の聞き方が土台です。',
      next: '大学入学共通テストや個別試験のリスニング、英検などの資格試験、留学先での授業や生活につながります。',
      cross: [['国語', '現代文で、設問を先に読んでから本文を読むと、どこに注意すればよいかが分かります。リスニングの先読みも同じ考え方です。'], ['数学', '試験全体の得点を最大にするには、解けない問題に時間をかけすぎない判断が必要です。リスニングの「見切り」は、数学の試験での時間配分の考え方と同じです。']],
      univ: '心理学では、人が一度に頭の中にとどめておける情報の量(ワーキングメモリ)が研究されています。同時通訳者は、この限られた記憶を工夫して使いながら、聞くことと話すことを同時に行っています。',
      readT: '「マジカルナンバー7」とチャンク',
      read: '電話番号を覚えるとき、09012345678 とひと続きで覚えるより、090-1234-5678 と区切ったほうが覚えやすいですね。これには、人の記憶のしくみが関係しています。\n1956年、アメリカの心理学者ジョージ・ミラーは「マジカルナンバー7、プラスマイナス2」という論文を発表しました。人が短い時間に覚えておける情報のまとまりは、だいたい7個前後だ、という内容です。その後の研究では、実際にはもっと少なく、4個前後ではないかという考えも出されています。\nここで大切なのは、「まとまり(チャンク)」という考え方です。数字1つ1つではなく、意味のあるかたまりにすると、同じ記憶の容量でたくさんの情報をあつかえます。\nリスニングでも同じことがいえます。英語を1語ずつ聞くと、すぐに記憶があふれてしまいます。in front of the station や as soon as possible のような語のかたまりを、1つのチャンクとして聞き取れるようになると、長い英文でも内容を保ちやすくなります。熟語や決まった言い回しを覚えることは、リスニングの力にも直結しているのです。'
    }
  });

  /* ===== ek_eiken 英検とCEFR ===== */
  add('ek_eiken', {
    rx: [
      { err: 'CEFR を英検のような「試験の名前」だと思い、「CEFR を受験する」と考えてしまう。', why: '要項で「英検」「CEFR」が並んで書かれていることが多いため、同じ種類のものだと思いこみやすいからです。CEFR は試験ではなく、【言語の力を表すための共通のものさし】です。', fix: 'CEFR は、さまざまな試験の結果を同じ基準で比べるための「枠組み」だと覚えます。要項で CEFR の条件を見たら、「自分の受けた試験の結果が、CEFR のどのレベルに当たるか」を公式の対応表で確かめます。', q: 'CEFR について正しいものを選ぼう。\n① 英語だけを対象にした試験の名前である ② 言語の力のレベルを示す共通の枠組みである', a: '②', exp: 'CEFR(ヨーロッパ言語共通参照枠)は、試験ではなく、言語を使う力を段階的に表すための枠組みです。英語に限らず、さまざまな言語の学習や評価に使われています。' },
      { err: 'CEFR のレベルを、A1 がいちばん上で C2 がいちばん下だと逆に覚えてしまう。', why: '「1位がいちばん上」「A ランクが最高」という日常の感覚から、A1 が最も高いレベルだと思いこむからです。', fix: 'CEFR は【A(基礎)→ B(自立)→ C(熟達)】の順に上がり、それぞれの中で 1 → 2 と上がると覚えます。A1 が出発点、C2 が最も高いレベルです。', q: 'CEFR の A2 と B1 では、どちらが高いレベルか答えよう。', a: 'B1', exp: 'CEFR は A1 → A2 → B1 → B2 → C1 → C2 の順に高くなります。A は基礎段階、B は自立した言語使用者の段階なので、B1 のほうが A2 より上です。' },
      { err: '英検の結果を合格か不合格かだけで見て、技能ごとのスコアを次の学習に生かさない。', why: '「級に受かったかどうか」が目標になってしまい、結果の表に書かれた技能ごとのスコアを、自分の弱点を知る手がかりとして見ていないからです。', fix: '結果が届いたら、読む・聞く・書く・話すのスコアを比べ、いちばん低い技能を次の重点にします。弱点の技能の練習方法を決め、次の受験までの計画に入れます。', q: '英検の結果で、リーディングとリスニングのスコアは高かったが、ライティングのスコアが低かった。次の受験までに力を入れるべきことを答えよう。', a: 'ライティング(英作文)の練習。意見の型に沿って書き、だれかに添削してもらうなど。', exp: '技能ごとのスコアを比べると、どこを伸ばせば全体のスコアが上がるかが分かります。高い技能をさらに伸ばすより、低い技能を補うほうが効果が大きいことが多いです。' }
    ],
    essay: [
      { q: 'Some people say that high school students should take English proficiency tests such as the Eiken test. Do you agree with this opinion? Give two reasons to support your answer.', limit: '80〜100語', hint: '最初に賛成か反対かをはっきり示します。理由は「学習の目標になる」「自分の弱点が分かる」「将来に役立つ」など、観点の異なるものを2つ選び、それぞれに具体的な説明を加えます。', model: 'I agree that high school students should take English proficiency tests. First, these tests give students a clear goal. When students know the date of the test, they can make a study plan and keep studying every day. Second, the results show students their strong and weak points. For example, if a student gets a low score in writing, he or she can spend more time practicing it. For these reasons, I believe that taking such tests is a good way for high school students to improve their English.', points: [['最初に、賛成か反対かの立場をはっきり示している', 2], ['観点の異なる理由を2つ挙げている', 3], ['それぞれの理由に、具体的な説明や例を加えている', 3], ['語数(80〜100語)を守り、語法・文法の誤りが少ない', 2]], ng: '「大学入試に必ず必要だから」のように、事実として確かでない内容を理由にすると、説得力が下がります。入試での扱いは大学や方式によって異なります。' }
    ],
    test: [
      { q: 'CEFR は、全部でいくつのレベルに分かれているか答えよう。', a: '6つ(A1・A2・B1・B2・C1・C2)', exp: 'CEFR は A・B・C の3つの段階を、それぞれ2つに分けた6つのレベルで言語の力を表します。' },
      { q: 'CEFR で最も高いレベルを選ぼう。', choices: ['C2', 'A1', 'B2', 'C1'], a: 'A(C2)', exp: 'C2 が最も高く、A1 が最も基礎的なレベルです。C は「熟達した言語使用者」の段階です。' },
      { q: 'CEFR を作成・公表した組織を選ぼう。', choices: ['欧州評議会(Council of Europe)', '国際連合', 'ユネスコ', '日本の文部科学省'], a: 'A(欧州評議会)', exp: 'CEFR はヨーロッパの国際機関である欧州評議会がまとめ、2001年に公表しました。欧州評議会は、EU(欧州連合)とは別の組織です。' },
      { q: 'CEFR の B レベルは、どのような段階の言語使用者とされているか答えよう。', a: '自立した言語使用者', exp: 'CEFR では、A を「基礎段階の言語使用者」、B を「自立した言語使用者」、C を「熟達した言語使用者」と位置づけています。' },
      { q: '「英語の4技能」とは、どの4つの力のことか答えよう。', a: '読む(リーディング)・聞く(リスニング)・書く(ライティング)・話す(スピーキング)', exp: '受け取る力(読む・聞く)と、発信する力(書く・話す)の4つです。英検やほかの多くの外部試験は、この4技能を測ることを目指しています。' },
      { q: '英検3級以上の二次試験では、主にどの技能が測られるか答えよう。', a: '話す力(スピーキング)。面接の形で行われる。', exp: '英検3級以上では、一次試験に合格すると、面接形式の二次試験でスピーキングの力が測られます。' },
      { q: 'CEFR のレベルの説明には、「〜できる」という形の文が多く使われる。このような記述を何と呼ぶか答えよう。', a: 'Can-do(キャンドゥー)記述(能力記述文)', exp: 'CEFR は「身近な話題について簡単な会話ができる」のように、そのレベルの人が言語を使って何ができるかを示します。点数ではなく、できることで力を表すのが特徴です。' },
      { q: '次の要項(例)を読み、答えよう。\n「英語外部試験の結果は、2025年4月1日以降に受験したものに限り有効とする。」\nAさんは2025年3月に英検を受験した。この結果は使えるか。', a: '使えない。', exp: '有効なのは2025年4月1日以降に受験したものです。2025年3月の受験はその前なので、この要項の条件では使えません。受験日と有効期間は必ず要項で確かめます。' },
      { q: '次の要項(例)を読み、答えよう。\n「CEFR B2 以上:20点加点/B1:10点加点/A2 以下:加点なし」\nBさんの試験結果は CEFR B1 に相当する。加点は何点か。', a: '10点', exp: 'B1 に当たるので10点の加点です。自分の結果がどのレベルに相当するかは、各試験の公式の対応表で確認します。' },
      { q: '次の要項(例)を読み、答えよう。\n方式X:本学の英語の試験(200点)の得点に、外部試験の結果に応じて最大20点を加点。\n方式Y:CEFR B2 以上の結果があれば、本学の英語の試験を200点とみなす。\nCさんは CEFR B2 の結果をもち、本学の英語の試験では150点ほどとれる見こみである。方式X で最大の加点を受けた場合と比べて、どちらが有利か。', a: '方式Y(方式X は150 + 20 = 170点、方式Y は200点)', exp: '方式X で最大の20点が加点されても170点ですが、方式Y なら200点とみなされます。このような比較は架空の例で、実際の方式は大学・学部ごとに異なるので、必ず最新の要項で確かめます。' }
    ],
    link: {
      prev: 'これまで学んできた英語の4技能(読む・聞く・書く・話す)の学習が土台です。自分の力を客観的に知る道具として、資格試験と CEFR を位置づけます。',
      next: '大学入試での外部試験の活用、大学入学後の留学や英語の授業、就職活動での英語力の証明につながります。',
      cross: [['公共・政治経済', 'CEFR を作った欧州評議会は、人権・民主主義・法の支配を守ることを目的とする国際機関です。EU(欧州連合)とは別の組織であることも、国際関係を学ぶうえで知っておきたい知識です。'], ['数学', '英検の CSE スコアのように、試験の結果を共通の数値の尺度で表すと、異なる級や試験の結果を比べやすくなります。データを同じものさしにそろえて比べるのは、統計の基本的な考え方です。']],
      univ: '大学では、交換留学の応募条件として英語の試験のスコアが求められることがあります。国際的な仕事でも、CEFR のような共通の基準で語学力を示す場面があります。',
      readT: 'CEFR はなぜ生まれたのか',
      read: 'ヨーロッパには、たくさんの言語があります。国境をこえて働いたり学んだりする人が増えると、「この人はフランス語がどのくらいできるのか」「この国の資格は、あの国の資格のどのくらいに当たるのか」を比べる必要が出てきました。\nそこで、欧州評議会は長い時間をかけて、言語の力を共通のものさしで表す枠組みを作り、2001年に公表しました。これが CEFR(ヨーロッパ言語共通参照枠)です。\nCEFR の特徴は、「何点とれたか」ではなく、「その言語を使って何ができるか」で力を表すことです。たとえば「自分の興味のある話題について、まとまった説明ができる」のような「Can-do」の文で、レベルごとの目安が示されています。\nもう1つの大切な考え方が「複言語主義」です。これは、1人の人が複数の言語を、目的に応じて部分的にでも使えることに価値を認める考え方です。母語話者のように完璧でなくても、その言語でできることが増えていくこと自体を大切にするのです。\nCEFR は今ではヨーロッパの外でも広く参考にされ、日本でも英語の資格試験の結果を比べる目安として使われています。'
    }
  });

  /* ===== ek_writing 英作文の書き方 ===== */
  add('ek_writing', {
    rx: [
      { err: '「この町は住みやすい」を This town is easy to live. のように、日本語を1語ずつ英語に置きかえて書き、英語として成り立たない文を作ってしまう。', why: '日本語の文の形(〜は…だ)を、そのまま英語の S + V の形に当てはめようとするからです。日本語と英語では、文の組み立て方がちがいます。', fix: '英語にする前に、日本語を【英語にしやすい日本語】に言いかえます(「この町は住むのによい場所だ」など)。そのうえで、確実に書ける S + V の形を選びます。', q: '英訳しよう。\n「この町は住みやすい。」', a: 'This town is a good place to live (in).(It is easy to live in this town. も可)', exp: '「住みやすい」は「住むのによい場所だ」と言いかえると、a good place to live の形で書けます。easy を使うなら、live in の in が必要です(This town is easy to live in.)。' },
      { err: '難しい単語や長い文を使おうとして、Smartphones are very useful for to get information. のような文法の誤りを増やしてしまう。', why: '「難しい表現を使ったほうが評価が高い」と考えているからです。実際の採点では、内容が伝わることと文法の正確さが重視され、誤りが多いと減点されます。', fix: '書く前に「確実に正しく書ける表現」を選びます。書いたあとに、前置詞の後ろの形(名詞・動名詞)、動詞の形、主語と動詞の一致を1文ずつ見直します。', q: '次の文の誤りを直そう。\nSmartphones are very useful for to get information.', a: 'for to get → for getting(または to get)', exp: '前置詞 for の後ろには名詞か動名詞が来ます。for getting information、または for を取って useful to get information とします。' },
      { err: '具体例として For example, online classes are useful. のように、主張をくり返しただけの文を書いてしまう。', why: '「For example と書けば具体例になる」と思っているからです。具体例には、【だれが・どんな場面で・どうなるか】という具体的な内容が必要です。', fix: '具体例を書いたら、「人・場面・数字」のどれかが入っているかを確かめます。入っていなければ、「たとえばどんな人が、どんなときに?」と自分に問いかけて書き直します。', q: '次の文を、具体的な内容のある例に書き直そう。\nFor example, online classes are useful.', a: '(例)For example, a student who lives far from school can take classes at home and save two hours of travel time a day.', exp: '「学校から遠くに住む生徒」(人)、「家で授業を受ける」(場面)、「1日2時間」(数字)が入ったことで、オンライン授業がなぜ便利なのかが具体的に伝わります。' }
    ],
    essay: [
      { q: 'Some people think that it is better for students to study abroad while they are in high school, while others think it is better to do so at university. Which do you think is better? Give two reasons.', limit: '80〜100語', hint: '最初にどちらがよいかを決めて書きます。理由は「語学の吸収」「専門の学び」「費用」「将来の進路」など、観点の異なるものを2つ選び、それぞれに説明を加えます。最後に立場をもう一度まとめます。', model: 'I think it is better to study abroad at university. First, university students can choose a subject they really want to study and take classes in it abroad. This experience can help them in their future careers. Second, university students are more independent than high school students. They can manage their own money and schedules, so they can deal with problems in a foreign country more easily. For these two reasons, I believe that university is the best time to study abroad.', points: [['最初に、どちらがよいかという立場をはっきり示している', 2], ['観点の異なる理由を2つ挙げ、それぞれに説明を加えている', 3], ['Introduction・Body・Conclusion の構成が整い、つなぎのことばが適切である', 2], ['語数(80〜100語)を守り、語法・文法の誤りが少ない', 3]], ng: '理由の1つめと2つめが「大学生は大人だから」「大学生は成熟しているから」のように同じ内容のくり返しになると、理由が1つしかないと判断されます。' }
    ],
    test: [
      { q: '「高校生はアルバイトをすべきか」という問いに対し、最初の1文として最も適切なものを選ぼう。', choices: ['I think that high school students should not have part-time jobs.', 'Part-time jobs are a very interesting topic.', 'There are many kinds of part-time jobs.', 'Some people have part-time jobs.'], a: 'A(I think that high school students should not have part-time jobs.)', exp: '最初の1文では、問いに対する自分の立場をはっきり示します。ほかの選択肢は話題にふれているだけで、立場を示していません。' },
      { q: '正しい英文を選ぼう。', choices: ['I agree with this opinion.', 'I am agree with this opinion.', 'I agreeing this opinion.', 'I am agreed with this opinion.'], a: 'A(I agree with this opinion.)', exp: 'agree は一般動詞なので、be動詞はつけません。「〜に賛成する」は agree with 〜 です。' },
      { q: '次の文の問題点を説明しよう。\nBecause I was tired.', a: '主節がなく、文として完成していない。', exp: 'Because 〜 は理由を表す従属節で、単独では文になりません。I went to bed early because I was tired. のように主節をつけます。' },
      { q: '要約問題で、書いてはいけないものを答えよう。', a: '本文にない自分の意見や感想', exp: '要約は、本文の内容を短くまとめるものです。「私はこの考えに賛成だ」のような自分の意見は入れません。' },
      { q: '「A だけでなく B も」を英語で表すとき、( ) に入る語を答えよう。\nReading is ( ) only fun ( ) also useful.', a: 'not / but', exp: 'not only A but (also) B で「A だけでなく B も」です。A と B には同じ形(ここでは形容詞)をそろえます。' },
      { q: '( ) に入るつなぎのことばとして最も適切なものを選ぼう。\nOnline shopping is convenient. ( ), it can be difficult to check the quality of products.', choices: ['However', 'For example', 'In addition', 'As a result'], a: 'A(However)', exp: '前の文は利点、後ろの文は欠点なので、逆接の However を使います。つなぎのことばは、文と文の関係に合わせて選びます。' },
      { q: '英訳しよう。\n「スマートフォンのおかげで、私たちはいつでも情報を得られる。」', a: 'Thanks to smartphones, we can get information at any time.', exp: '「〜のおかげで」は thanks to 〜 です。information は数えられない名詞なので、複数形にしません。' },
      { q: '( ) に is か are を入れよう。\nReading books ( ) important for young people.', a: 'is', exp: '動名詞のかたまり Reading books が主語で、「本を読むこと」という1つのことを表すので単数扱いです。books につられて are にしないよう注意します。' },
      { q: '英訳しよう。\n「健康の大切さは、失って初めて分かる。」', a: 'We do not realize the importance of health until we lose it.\n(It is not until we lose our health that we realize how important it is. も可)', exp: '「〜して初めて…する」は not … until 〜 や It is not until 〜 that … で表します。一般の人を主語にするときは we を使うと自然です。' },
      { q: '次の英文の内容を、1文に要約しよう。\nMany students say that they cannot concentrate at home because of noise. They also say that the library is quieter.', a: '(例)Many students prefer to study in the library because it is quieter than their homes.', exp: '「家では集中できない」と「図書館は静か」の2つの内容を、「図書館のほうが静かなので好む」という1つの文にまとめています。本文の語をそのまま並べず、関係をつかんで言いかえます。' }
    ],
    link: {
      prev: '文法全般(時制・準動詞・関係詞など)の正確な知識と、論理マーカーや段落の構成(e_h6)の理解が土台です。',
      next: '難関大の自由英作文・和文英訳・要約問題、英検のライティング、大学でのレポートや英語の論文の執筆につながります。',
      cross: [['国語', '小論文では、主張・根拠・具体例・結論という構成で書くことが求められます。英作文の Introduction・Body・Conclusion の型は、日本語の小論文にもそのまま使えます。'], ['情報', 'プレゼンテーションの資料作りやメールの文章でも、「最初に要点を示し、根拠を挙げ、最後にまとめる」という構成が伝わりやすさを左右します。']],
      univ: '大学では、英語で要旨(アブストラクト)を書いたり、レポートを書いたりする機会があります。仕事でも、英語のメールや報告書を、短く分かりやすく書く力が求められます。',
      readT: 'オーウェルの「6つの規則」',
      read: '『動物農場』や『一九八四年』で知られるイギリスの作家ジョージ・オーウェルは、1946年に「政治と英語」というエッセイを書きました。その中で彼は、分かりやすい英語を書くための6つの規則を示しています。\n1. 印刷物で見なれた比喩は使わない。\n2. 短い語で済むところに、長い語を使わない。\n3. 削れる語は、必ず削る。\n4. 能動態が使えるところに、受動態を使わない。\n5. 日常の英語で言えるなら、外国語の言い回しや専門用語を使わない。\n6. ひどい文を書くくらいなら、これらの規則のどれでも破ってよい。\nオーウェルが問題にしたのは、もったいぶった言い回しやあいまいな表現が、考えをごまかすために使われることでした。だからこそ、短く、具体的で、はっきりした文を書くべきだと主張したのです。\nこの考え方は、入試の英作文にも当てはまります。難しい単語を並べるより、正しく書ける短い文で、具体的な内容をはっきり伝えるほうが、読み手にずっと伝わります。最後の規則が示すように、大切なのは規則を守ることではなく、伝わる文章を書くことなのです。'
    }
  });

  /* ===== ek_speaking 面接・スピーキング ===== */
  add('ek_speaking', {
    rx: [
      { err: '答える前に、頭の中で日本語の完璧な文を作ってから英語に直そうとして、長い沈黙が続いてしまう。', why: '「まちがえずに答えなければ」という気持ちから、一度にすべてを考えようとするからです。面接では、沈黙が長いと「答えられない」と判断されやすくなります。', fix: 'まず Well, let me see. などのつなぎのことばで考える時間をとり、短い文を1つずつ重ねて答えます。「結論 → 理由」の順に、確実に言える英語から話し始めます。', q: '面接で質問に答える前に、考える時間をとるためのつなぎのことばを1つ英語で答えよう。', a: '(例)Well, let me see. / That\'s a good question.', exp: 'つなぎのことばを使うと、だまりこまずに考える時間をとれます。ただし、つなぎのことばばかりにならないよう、すぐに短い文で答え始めます。' },
      { err: '音読のとき、すべての単語を同じ強さ・同じ速さで読んでしまい、意味が伝わりにくい。', why: '単語を1つずつ正しく読むことに集中し、英語の文には強く読む語と弱く読む語があることを意識していないからです。', fix: '本文の【意味のまとまり】ごとにスラッシュ(/)を入れ、名詞・動詞・形容詞などの内容語を強く読みます。まとまりの間で軽く区切ると、聞き手に意味が伝わりやすくなります。', q: '次の文で、強く読むとよい語をすべて答えよう。\nMany people / enjoy reading books / on the train.', a: 'Many・people・enjoy・reading・books・train', exp: '名詞・動詞・形容詞などの内容語を強く読み、on・the のような機能語は弱く短く読みます。スラッシュの位置で軽く区切ると、意味のまとまりが伝わります。' },
      { err: '意見を聞かれて、I think so. It is good. のように、理由の中身がない答えで終えてしまう。', why: '「理由を言う」ことは意識していても、good・nice などの一般的な語だけで済ませ、【だれにとって・どのようによいのか】を考えていないからです。', fix: '理由を言うときは、「だれにとって」「どうなるのか」を必ず入れます。because のあとに、具体的な人や場面、結果を表す文を続ける練習をします。', q: '次の質問への答えを、理由の中身が伝わるように書き直そう。\nQ: Do you think more people will use electric cars in the future?\nA: I think so. It is good.', a: '(例)I think so. Electric cars do not produce exhaust gas, so they are better for the environment.', exp: '「排気ガスを出さない」「環境によい」と、何がどうよいのかを具体的に述べています。結論(I think so)のあとに、理由の中身を1〜2文で加えるのが基本です。' }
    ],
    essay: [
      { q: '面接で次の質問をされたと考え、英語で答えよ。\nSome people say that learning in a classroom is better than learning online. What do you think?', limit: '60〜80語(話して答える内容として)', hint: '最初に立場を一言で示し、理由を2つ、話し言葉として自然な短い文で述べます。最後に結論をくり返すと、話がまとまって聞こえます。', model: 'I agree that learning in a classroom is better. First, in a classroom, students can ask the teacher questions right away. If they do not understand something, they can get help immediately. Second, students can learn from each other. For example, when we discuss a topic in groups, we can hear many different ideas. So I think classroom learning is better, although online learning is also useful sometimes.', points: [['最初に、質問に対する立場をはっきり示している', 2], ['観点の異なる理由を2つ述べている', 3], ['理由を具体的な場面や例で説明している', 3], ['話し言葉として自然で、語法・文法の誤りが少ない', 2]], ng: 'I agree. のあとに理由を言わずに終えたり、Yes, I do. のように質問の形に合わない答え方をしたりすると、評価が大きく下がります。' }
    ],
    test: [
      { q: 'Could you say that again, please? という表現のはたらきを答えよう。', a: '聞き返し(もう一度言ってほしいと頼む)', exp: '質問が聞き取れなかったときは、だまりこまずにこのように聞き返します。英語でコミュニケーションをとろうとする姿勢も評価されます。' },
      { q: 'イラストの中で女性が絵をかいている。( ) に入る語を答えよう。\nA woman is ( ) a picture.', a: 'drawing', exp: '今まさに行われている動作は、現在進行形(is + 〜ing)で表します。draw の ing 形は drawing です。' },
      { q: 'Do you like reading books? という質問への答えとして最も適切なものを選ぼう。', choices: ['Yes, I do. I often read novels before going to bed.', 'Yes.', 'Yes, I am.', 'Reading books.'], a: 'A(Yes, I do. I often read novels before going to bed.)', exp: 'Do you 〜? には Yes, I do. と答え、その後ろに具体的な内容を1文加えます。1語だけの答えや、形の合わない答えは避けます。' },
      { q: '次の文を音読するとき、意味のまとまりで1か所区切るとすればどこか答えよう。\nThe man who lives next door is a doctor.', a: 'door の後ろ(The man who lives next door / is a doctor.)', exp: 'The man who lives next door までが主語のかたまりです。主語と動詞の間で区切ると、文の構造が聞き手に伝わりやすくなります。' },
      { q: 'Why do you think so? と聞かれたとき、答えの始め方として最も適切なものを選ぼう。', choices: ['That\'s because …', 'So …', 'For example …', 'In conclusion …'], a: 'A(That\'s because …)', exp: '理由を聞かれたら、That\'s because …(それは〜だからです)や Because … で答え始めます。' },
      { q: '自分の意見を述べるときの始め方として最も適切なものを選ぼう。', choices: ['In my opinion, …', 'For example, …', 'By the way, …', 'Finally, …'], a: 'A(In my opinion, …)', exp: 'In my opinion(私の意見では)は、自分の考えを述べるときの決まった言い方です。I think … や I believe … も使えます。' },
      { q: 'イラストで、男性がプールに飛びこもうとしている。( ) に入る語句を答えよう。\nThe man is ( ) ( ) jump into the pool.', a: 'going to', exp: '「これから〜しようとしている」動作は be going to + 原形で表します。イラストの説明では、今の動作と、これからの動作を区別します。' },
      { q: '面接官に Why not? と聞かれるのは、ふつうどのようなときか答えよう。', a: 'No と答えたとき(否定の答えの理由をたずねられている)', exp: 'Yes と答えれば Why?、No と答えれば Why not? と理由をたずねられます。どちらの場合も、理由を具体的に述べる準備をしておきます。' },
      { q: '次の抽象的な質問に、身近な具体例を使って1文で答えよう。\nDo you think technology makes people\'s lives better?', a: '(例)Yes. For example, thanks to smartphones, we can easily contact our family when we are away from home.', exp: '「技術」という抽象的な話題を、スマートフォンで家族と連絡をとるという身近な場面に引き寄せると、具体的で分かりやすい答えになります。' },
      { q: '自分の意見を述べたあと、反対の面にもふれて話を広げるときに使う表現を選ぼう。', choices: ['On the other hand, …', 'For example, …', 'As a result, …', 'First, …'], a: 'A(On the other hand, …)', exp: 'On the other hand(その一方で)を使うと、利点を述べたあとに欠点にもふれるなど、話を広げることができます。最後に自分の立場にもどってまとめます。' }
    ],
    link: {
      prev: '音の変化(el_sound)の知識と、意見を述べるための英作文の型(ek_writing)が土台です。書けることは、話せることの準備になります。',
      next: '英検などの面接試験、大学入試のスピーキング、留学先での授業や生活、仕事での英語の会議やプレゼンテーションにつながります。',
      cross: [['音楽', '歌を歌うときと同じように、はっきり声を出すには、姿勢や呼吸が大切です。英語の強弱のリズムを意識して音読することは、歌のリズムを体で覚えることにも似ています。'], ['国語', 'スピーチや話し合いでは、「結論を先に言う」「理由を挙げる」「具体例で説明する」と、聞き手が理解しやすい順に話すことが大切です。これは英語の面接でも同じです。']],
      univ: '同時通訳の訓練では、聞いた英語をすぐに声に出してまねる練習が行われます。大学のゼミや国際会議、仕事のプレゼンテーションでも、英語で考えを述べる力が求められます。',
      readT: 'シャドーイングは通訳者の訓練から',
      read: '聞こえてくる英語を、少し遅れて影(シャドー)のようについていきながら、そのまま声に出してまねる練習を「シャドーイング」といいます。もともとは、通訳者を育てる訓練の1つとして使われてきた方法です。\n通訳者は、話し手の英語を聞きながら、同時に別の言語で話さなければなりません。シャドーイングは、聞くことと話すことを同時に行う力をきたえるのに役立ちます。\nこの練習は、英語を学ぶ人にも広く取り入れられるようになりました。音声をまねることで、英語のリズムや音のつながり、イントネーションが体で身につきやすくなるからです。自分で発音できるようになった音は、聞き取りやすくもなります。\nただし、最初から難しい教材で始めると、ついていけずに口が止まってしまいます。まずはスクリプトを見ながら音声に合わせて読む練習(オーバーラッピング)から始め、内容を理解できる短い文章でシャドーイングに進むのがおすすめです。\n声に出して練習することは、面接で落ち着いて話すための、いちばんの準備になります。'
    }
  });

})(WPS.LESSONS);
