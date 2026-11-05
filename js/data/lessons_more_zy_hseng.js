/* テキスト拡充・第3弾(担当:高校英語 23単元) */
(function (L) {
  function add(id, o) { var x = L[id]; if (!x) return; if (o.sheet) x.sheet = o.sheet; ['cards', 'think'].forEach(function (k) { if (o[k]) x[k] = (x[k] || []).concat(o[k]); }); }

  /* ===== e_h1 文型 ===== */
  add('e_h1', {
    sheet: {
      title: '文型(5文型)1ページまとめ',
      blocks: [
        { h: '文の要素', items: ['S(主語)・V(動詞)・O(目的語)・C(補語)が骨組み', 'M(修飾語)は文型に数えない:副詞・前置詞 + 名詞など', 'C は S や O の「状態・正体」を説明する語'] },
        { h: '5つの型', items: ['第1文型 SV:V で文が完成(+M が多い)', '第2文型 SVC:S = C(be・become・look・seem など)', '第3文型 SVO:S が O に動作をする', '第4文型 SVOO:O1(人)に O2(物)を', '第5文型 SVOC:O = C(make・find・keep・call など)'] },
        { h: '見分けのポイント', items: ['S = 名詞 なら C、成り立たなければ O', 'SVOO は O1 ≠ O2、SVOC は O = C', 'C に入るのは名詞・形容詞(副詞は入らない)', '前置詞 + 名詞 は原則 M(O にはならない)'] },
        { h: '動詞の語法', items: ['他動詞(前置詞不要):reach・discuss・enter・marry・approach', '自動詞(前置詞必要):arrive at・talk about・apologize to', 'SVOO → SVO + to:give・send・show・tell', 'SVOO → SVO + for:buy・cook・make・find'] },
        { h: 'まちがえやすい点', items: ['look happily ×→ look happy ○(C は形容詞)', 'There 構文の主語は be動詞の後ろの名詞', '同じ動詞でも型が変わる:make・get・find は要注意', '長い主語の中の動詞を文全体の V と思いこまない'] }
      ],
      key: '文型は「動詞」が決める。O か C かは【S(O)= その語】が成り立つかで判定する。'
    },
    cards: [
      ['文型に数えない要素は?', 'M(修飾語)。副詞や前置詞 + 名詞など'],
      ['C(補語)になれる品詞は?', '名詞と形容詞(副詞はなれない)'],
      ['第2文型をとる代表的な動詞(5つ)', 'be・become・look・seem・remain など'],
      ['O と C の見分け方', 'S = その語 が成り立てば C、成り立たなければ O'],
      ['SVOO と SVOC の見分け方', 'O1 ≠ O2 なら SVOO、O = C なら SVOC'],
      ['give O1 O2 を前置詞で書きかえると?', 'give O2 to O1(相手に届く動詞は to)'],
      ['buy O1 O2 を前置詞で書きかえると?', 'buy O2 for O1(相手のためにする動詞は for)'],
      ['ask O1 O2 の書きかえで使う前置詞', 'of(ask a question of him)'],
      ['「〜に着く」reach と arrive のちがい', 'reach は他動詞、arrive は自動詞(arrive at / in)'],
      ['discuss about は正しい?', '誤り。discuss は他動詞で discuss the plan'],
      ['find O C の意味', 'O が C だと分かる・思う'],
      ['keep O C の意味', 'O を C の状態に保つ'],
      ['The milk went bad. の文型', '第2文型(SVC)。went = 〜になった'],
      ['There are many books. の主語', 'many books(be動詞の後ろの名詞)'],
      ['lie と lay のちがい', 'lie は自動詞「横になる」、lay は他動詞「〜を横たえる」']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】高校の掲示板のお知らせです。\nLibrary Notice\nThe school library will remain open until 7 p.m. during exam week. Students may find the study room on the second floor quiet and comfortable. Please keep the room clean, and leave your bags in the lockers near the entrance. The librarian will give each student a seat card at the counter. Show this card to the staff when you enter the study room.', q: 'このお知らせの内容と合うものを1つ選びなさい。', choices: ['①試験期間中、図書館は午後7時に開館する。', '②学習室では、かばんを座席の横に置いてよい。', '③座席カードはカウンターで受け取り、学習室に入るときに見せる。', '④学習室は1階の入口の近くにある。'], a: '③(座席カードはカウンターで受け取り、学習室に入るときに見せる。)', exp: 'remain open until 7 p.m. は SVC で「午後7時まで開いたままである」なので①は誤りです。leave your bags in the lockers より②も誤り。The librarian will give each student a seat card(SVOO)と Show this card to the staff when you enter から③が正解です。study room は on the second floor なので④も誤りです。' },
      { kind: '会話文', ctx: 'Ken と留学生の Amy が話しています。\nKen: I read your report. Your conclusion made me really curious.\nAmy: Thanks! But my teacher said my first paragraph sounds strange.\nKen: Let me see... "The results seemed clearly." Hmm, I think that is the problem.\nAmy: Really? I wanted to say the results were easy to understand.\nKen: Then you need a different word after "seemed."', q: 'Ken が指摘した問題点を最もよく表すものを1つ選びなさい。', choices: ['①seem は SVO の動詞なので、後ろに目的語が必要である。', '②seem は SVC の動詞なので、後ろには副詞の clearly ではなく形容詞の clear が必要である。', '③results は単数なので、seemed を seems にする必要がある。', '④文の最後に to me を入れないと、文が完成しない。'], a: '②(seem は SVC の動詞なので、後ろには副詞の clearly ではなく形容詞の clear が必要である。)', exp: 'seem は「〜のように見える・思われる」という第2文型の動詞で、後ろには C が来ます。C になれるのは名詞・形容詞なので、副詞 clearly は使えず The results seemed clear. が正しい形です。Ken の Then you need a different word after "seemed." がヒントで、seemed の後ろの語の品詞が問題だと分かります。' }
    ]
  });

  /* ===== e_pastperf 過去完了 ===== */
  add('e_pastperf', {
    sheet: {
      title: '過去完了 1ページまとめ',
      blocks: [
        { h: '形', items: ['had + 過去分詞(主語に関係なく had)', '進行形:had been + ~ing', '受動態:had been + 過去分詞', '否定:had not(hadn\'t)+ 過去分詞'] },
        { h: '4つの用法', items: ['完了・結果:過去のある時点までに〜してしまっていた', '経験:過去のある時点までに〜したことがあった', '継続:過去のある時点までずっと〜だった', '大過去:過去の2つの出来事のうち、先に起きたほう'] },
        { h: '基準の見つけ方', items: ['when / by the time + 過去形 の節が基準', 'before・after があれば順序が明らかなので過去形でも可', '物語では「それより前」の回想に入ると過去完了'] },
        { h: 'よく出る形', items: ['Hardly / Scarcely had S 過去分詞 when 〜(〜するとすぐ)', 'No sooner had S 過去分詞 than 〜', 'I had hoped to 〜:〜したかったのに(実現せず)', 'It had been 期間 since 〜'] },
        { h: 'まちがえやすい点', items: ['基準の「過去の時点」がないのに過去完了を使わない', '動作の継続は過去完了進行形 had been ~ing', '現在完了は「今」が基準、過去完了は「過去」が基準'] }
      ],
      key: '過去完了は「基準が過去に移った現在完了」。まず基準となる過去の時点を探す。'
    },
    cards: [
      ['過去完了の形', 'had + 過去分詞'],
      ['過去完了進行形の形', 'had been + ~ing'],
      ['過去完了の受動態の形', 'had been + 過去分詞'],
      ['過去完了の基準になるのは?', '過去のある時点(when 節・by the time 節など)'],
      ['「大過去」とは?', '過去の2つの出来事のうち、先に起きたほうを表す用法'],
      ['before があると過去完了は必須?', '必須ではない。順序が明らかなので過去形でも可'],
      ['Hardly had S p.p. when 〜 の意味', 'S が〜するとすぐに…'],
      ['No sooner had S p.p. の後ろに来る語', 'than(No sooner 〜 than …)'],
      ['I had hoped to come. の含み', '来たかったのに来られなかった'],
      ['過去完了の継続を表す目印', 'for 期間・since 時点(+ 過去の基準)'],
      ['過去完了の経験を表す目印', 'never・before・once・ever など'],
      ['過去完了の完了を表す目印', 'already・just・yet など'],
      ['現在完了と過去完了の基準のちがい', '現在完了は今、過去完了は過去のある時点'],
      ['物語で過去完了が出てくる場面', 'それより前の出来事を回想するとき'],
      ['「〜しないうちに」の英語', 'Before S had p.p. / S had not p.p. before 〜']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】ブログの一部です。\nLast Saturday, I finally visited the new art museum downtown. I had wanted to go there since it opened in spring, but I had been too busy with club activities. When I arrived, a long line had already formed at the entrance. Luckily, my friend Yui had bought tickets online the night before, so we did not have to wait. By the time we left, the sun had set and the city lights were shining.', q: 'ブログの内容について、出来事が起きた順に並べたとき、最も早いものを1つ選びなさい。', choices: ['①入口に長い列ができた。', '②美術館が開館した。', '③Yui がオンラインでチケットを買った。', '④日が沈んだ。'], a: '②(美術館が開館した。)', exp: 'had wanted to go there since it opened in spring から、開館は春で、筆者が訪れた土曜日よりかなり前です。チケット購入は the night before(前の晩)、列ができたのは到着時までの当日、日没は帰るまでの当日です。過去完了は「基準(土曜日の行動)より前」を示しますが、その中でも since it opened in spring がいちばん古い出来事です。' },
      { kind: '会話文', ctx: '英語の授業で、生徒が書いた文について話しています。\nTeacher: Look at this sentence. "When I got to the station, the train left."\nRyo: I wanted to say that I missed the train.\nTeacher: Then the sentence means something different now. In your sentence, the two actions happen almost at the same time.\nRyo: Oh, I see. I should change one verb.', q: 'Ryo が言いたい内容(電車に乗り遅れた)を正しく表す文を1つ選びなさい。', choices: ['①When I got to the station, the train has left.', '②When I got to the station, the train had left.', '③When I had got to the station, the train left.', '④When I get to the station, the train had left.'], a: '②(When I got to the station, the train had left.)', exp: '「駅に着いた」(過去)を基準にして、それより前に「電車が出てしまっていた」ことを表すには、left を過去完了 had left にします。①は現在完了で、過去の基準と合いません。③は着いたほうが先になってしまい、意味が逆です。④は get が現在形で時制がそろっていません。' }
    ]
  });

  /* ===== e_futperf 未来完了 ===== */
  add('e_futperf', {
    sheet: {
      title: '未来完了 1ページまとめ',
      blocks: [
        { h: '形', items: ['will have + 過去分詞', '進行形:will have been + ~ing', '否定:will not(won\'t)have + 過去分詞', '疑問:Will S have + 過去分詞 …?'] },
        { h: '3つの用法', items: ['完了:未来のある時点までに〜してしまっているだろう', '経験:未来のある時点で〜したことになる', '継続:未来のある時点まで〜していることになる'] },
        { h: 'by と until', items: ['by:〜までに(期限。その時までに1回終わる)', 'until / till:〜までずっと(継続)', 'by the time S V:S が V するまでには(接続詞)'] },
        { h: '時制のルール', items: ['by the time・when の副詞節の中は現在形', '例:By the time you arrive, I will have finished.', '期間の計算:今までの年数 + 未来までの年数'] },
        { h: 'まちがえやすい点', items: ['by の後ろに until の意味を入れない', '副詞節の中に will を入れない', 'next year・tomorrow など未来の基準を確認'] }
      ],
      key: '未来完了は「未来のある時点」を基準にした完了形。基準を表す by 〜 / by the time 〜 をまず探す。'
    },
    cards: [
      ['未来完了の形', 'will have + 過去分詞'],
      ['未来完了進行形の形', 'will have been + ~ing'],
      ['未来完了の基準', '未来のある時点'],
      ['by の意味', '〜までに(期限)'],
      ['until の意味', '〜までずっと(継続)'],
      ['by the time S V の意味', 'S が V するまでには'],
      ['by the time 節の中の時制', '現在形(未来のことでも will は使わない)'],
      ['「来年で3回目の訪問になる」の用法', '経験(will have visited three times)'],
      ['「来月で10年住んだことになる」の用法', '継続(will have lived for ten years)'],
      ['「明日までに終えているだろう」の用法', '完了(will have finished by tomorrow)'],
      ['未来完了の目印になる語句', 'by + 時点・by the time・by then など'],
      ['I will have read it by Monday. の和訳', '月曜までにはそれを読み終えているだろう'],
      ['3つの完了形に共通するしくみ', '基準の時点までの「つながり」を表す'],
      ['未来完了と未来進行形のちがい', '完了は「終わっている」、進行形は「最中」'],
      ['until を使えない文の例', 'I will finish it until five. ×(by five ○)']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】市民マラソン大会の案内です。\nGreen City Marathon\nStart time: 8:00 a.m.\nThe course will close at 2:00 p.m. Runners must pass the 30 km point by 12:00 p.m. Runners who have not reached that point by then will be asked to stop. Shuttle buses will run from the finish area until 4:00 p.m.\nMessage from the organizer: "By the time the last runner crosses the finish line, our volunteers will have served over 5,000 cups of water."', q: 'この案内から分かることとして正しいものを1つ選びなさい。', choices: ['①シャトルバスは午後4時に運行を始める。', '②正午の時点で30km地点に着いていないランナーは走るのをやめるよう求められる。', '③コースは正午に閉鎖される。', '④ボランティアは大会の前に5,000杯以上の水を配り終える。'], a: '②(正午の時点で30km地点に着いていないランナーは走るのをやめるよう求められる。)', exp: 'by 12:00 p.m. は「正午までに」という期限なので、それまでに30km地点を通過していない人は止められます(②)。until 4:00 p.m. は「午後4時までずっと」運行なので①は誤り。コースの閉鎖は2:00 p.m. なので③も誤り。will have served は「最後のランナーがゴールするまでに配り終えている」という未来完了で、大会の前ではないので④も誤りです。' },
      { kind: '会話文', ctx: 'Mika と Tom が話しています。\nMika: How long have you been learning the piano?\nTom: I started when I was eight. I am fourteen now.\nMika: Wow. And you are going to study in Vienna?\nTom: Yes, two years from now. Then I\'ll take a special course there.', q: '2年後に Tom がウィーンへ行くとき、彼は何年間ピアノを習っていることになりますか。それを表す英文として最も適切なものを1つ選びなさい。', choices: ['①He will have learned the piano for six years.', '②He will have learned the piano for eight years.', '③He has learned the piano for eight years.', '④He had learned the piano for six years.'], a: '②(He will have learned the piano for eight years.)', exp: '8歳で始めて今14歳なので、今までに6年です。2年後には 6 + 2 = 8年になります。未来の時点(2年後)を基準にした継続なので未来完了を使い、②が正解です。①は今の時点の年数を未来完了にしてしまった誤り、③は現在完了で今の基準、④は過去完了で過去の基準になってしまいます。' }
    ]
  });

  /* ===== e_tense 時制の注意点 ===== */
  add('e_tense', {
    sheet: {
      title: '時制の注意点 1ページまとめ',
      blocks: [
        { h: '基本ルール', items: ['時・条件の副詞節の中は、未来でも現在形', '時:when・before・after・until・as soon as・by the time', '条件:if・unless・in case・once・as long as'] },
        { h: '完了の意味なら現在完了', items: ['副詞節で「〜し終えたら」は現在完了', '例:I\'ll call you when I have finished.', '未来完了 will have は副詞節では使わない'] },
        { h: 'will を使う場合', items: ['名詞節の if・when(〜かどうか・いつ〜か)', '例:I don\'t know if it will rain tomorrow.', '形容詞節の when(the day when 〜)', '主語の意志を表す will(If you will help me, …)'] },
        { h: '見分け方の手順', items: ['① 節をかっこでくくる', '② その節が文の中で何の役割か(名詞・副詞・形容詞)', '③ 副詞節だけ現在形、名詞節・形容詞節は will も可'] },
        { h: '注意する接続詞', items: ['unless = if 〜 not(〜しない限り)', 'in case:〜する場合に備えて', 'once:いったん〜すると', 'as long as:〜する限り(条件)'] }
      ],
      key: '「副詞節なら現在形、名詞節なら will」。節の役割を見てから時制を決める。'
    },
    cards: [
      ['時・条件の副詞節の中の時制', '未来のことでも現在形'],
      ['名詞節の if の意味', '〜かどうか'],
      ['名詞節の if の中で will は使える?', '使える(未来なら will を使う)'],
      ['副詞節で「〜し終えたら」の形', '現在完了(when I have finished)'],
      ['unless の意味', '〜しない限り(= if 〜 not)'],
      ['in case の意味', '〜する場合に備えて'],
      ['once(接続詞)の意味', 'いったん〜すると'],
      ['as soon as の意味', '〜するとすぐに'],
      ['the day when 〜 の when の節の種類', '形容詞節(will を使える)'],
      ['副詞節か名詞節かの判断基準', '節を取り除いても文が成り立てば副詞節'],
      ['ask・know の後ろの if 節', '名詞節(目的語)'],
      ['If you will help me の will の意味', '主語の意志「手伝ってくれるなら」'],
      ['by the time S V の中の時制', '現在形'],
      ['as long as の意味', '〜する限り(条件)'],
      ['I\'ll wait until he ( ). の答え', 'comes(副詞節なので現在形)']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】交換留学生の受け入れに関するメールです。\nDear host families,\nOur students will arrive at the airport on July 20. Please wait in the arrival lobby until the group leader calls your name. If the flight is delayed, we will send you a text message. We do not know yet when the bus will leave the airport, but we will tell you as soon as we decide. Please keep your phone with you in case we need to contact you.', q: 'このメールの英文についての説明として正しいものを1つ選びなさい。', choices: ['①until the group leader calls は名詞節なので、will を使ってもよい。', '②when the bus will leave は know の目的語となる名詞節なので、will が使われている。', '③If the flight is delayed は名詞節なので現在形になっている。', '④in case we need は「〜する場合に限り」という意味である。'], a: '②(when the bus will leave は know の目的語となる名詞節なので、will が使われている。)', exp: 'We do not know の後ろの when 節は「いつ〜か」という know の目的語(名詞節)なので、未来なら will を使います(②)。①の until 節と③の if 節は時・条件の副詞節なので、未来でも現在形を使います。④の in case は「〜する場合に備えて」という意味で、「〜する場合に限り」ではありません。' },
      { kind: '会話文', ctx: '部活のミーティングでの会話です。\nCoach: We\'ll start practice again ( A ) the gym repair is finished.\nSaki: Do you know ( B ) the repair will be finished?\nCoach: Not yet. The company will tell us next week.\nSaki: OK. Until then, can we use the field?\nCoach: Yes, ( C ) it rains.', q: '( A )〜( C ) に入る語の組み合わせとして最も適切なものを1つ選びなさい。', choices: ['① A: once B: when C: unless', '② A: unless B: once C: when', '③ A: when B: unless C: once', '④ A: once B: unless C: when'], a: '①(A: once B: when C: unless)', exp: '(A) は「修理がいったん終わったら」で once が合います。(B) は know の目的語で「いつ終わるか」を尋ねる名詞節なので when が入り、名詞節なので will be finished が使われています。(C) は「雨が降らない限り」使えるという意味で unless が入ります。unless の節は条件の副詞節なので rains と現在形です。' }
    ]
  });

  /* ===== e_aux 助動詞・受動態 ===== */
  add('e_aux', {
    sheet: {
      title: '助動詞・受動態 1ページまとめ',
      blocks: [
        { h: '推量の強さ(強い順)', items: ['must(〜にちがいない)・cannot(〜のはずがない)', 'should / ought to(〜のはず)', 'may(〜かもしれない)', 'might / could(ひょっとすると〜かもしれない)'] },
        { h: '過去への推量・後悔', items: ['must have p.p.:〜したにちがいない', 'cannot have p.p.:〜したはずがない', 'may have p.p.:〜したかもしれない', 'should have p.p.:〜すべきだったのに(しなかった)', 'need not have p.p.:〜する必要はなかったのに(した)'] },
        { h: '慣用表現', items: ['may well 〜:〜するのももっともだ/たぶん〜だろう', 'may as well 〜:〜したほうがよい', 'cannot help ~ing:〜せずにはいられない', 'would rather A than B:B より A したい', 'used to 〜:以前はよく〜した/以前は〜だった'] },
        { h: '受動態の形', items: ['SVOO:He was given a book. / A book was given to him.', 'SVOC:She is called Meg.(C はそのまま残す)', '助動詞:can be p.p.・must be p.p.', '使役 make:He was made to wait.(to が復活)'] },
        { h: 'まちがえやすい点', items: ['過去の推量は must + 過去形 ではなく must have p.p.', 'must の否定推量は must not ではなく cannot', '知覚・使役動詞の受動態は to 不定詞になる'] }
      ],
      key: '推量は「確信の強さ」で選び、過去への推量は【助動詞 + have + 過去分詞】。'
    },
    cards: [
      ['must の推量の意味', '〜にちがいない(確信が強い)'],
      ['「〜のはずがない」の助動詞', 'cannot / can\'t'],
      ['must have p.p. の意味', '〜したにちがいない'],
      ['cannot have p.p. の意味', '〜したはずがない'],
      ['should have p.p. の意味', '〜すべきだったのに(実際はしなかった)'],
      ['need not have p.p. の意味', '〜する必要はなかったのに(実際はした)'],
      ['may well 〜 の意味', '〜するのももっともだ/たぶん〜だろう'],
      ['may as well 〜 の意味', '〜したほうがよい(ほかにないから)'],
      ['cannot help ~ing の意味', '〜せずにはいられない'],
      ['would rather A than B の意味', 'B するより A したい'],
      ['used to 〜 の意味', '以前はよく〜した/以前は〜だった'],
      ['be used to ~ing の意味', '〜することに慣れている'],
      ['They made him wait. の受動態', 'He was made to wait.(to が必要)'],
      ['助動詞をふくむ受動態の形', '助動詞 + be + 過去分詞'],
      ['They call her Meg. の受動態', 'She is called Meg.']
    ],
    think: [
      { kind: '会話文', ctx: '放課後の教室での会話です。\nAoi: Whose umbrella is this? It was left under my desk.\nRen: It ( A ) be Mr. Sato\'s. He always carries a blue one, and this is blue.\nAoi: But he was in Osaka all day today. He ( B ) left it here.\nRen: You\'re right. Then it ( C ) belong to someone in the soccer club. They used this room this morning.\nAoi: I\'ll ask the captain.', q: '( A )〜( C ) に入る語句の組み合わせとして最も適切なものを1つ選びなさい。', choices: ['① A: must B: cannot have C: may', '② A: may B: must have C: cannot', '③ A: cannot B: may have C: must', '④ A: must B: should have C: cannot'], a: '①(A: must B: cannot have C: may)', exp: '(A) は Ren が「いつも青い傘を持っている」と強い根拠を挙げているので must(〜にちがいない)。(B) は先生が一日中大阪にいたという事実から「置いたはずがない」なので cannot have left。(C) は「サッカー部が朝この部屋を使った」という弱めの根拠で、Aoi が確認しに行くので may(〜かもしれない)が自然です。根拠の強さで助動詞を選びます。' },
      { kind: '資料読解', ctx: '【架空の資料】学校の HP に載った報告です。\nOur Volunteer Day\nLast Sunday, 40 students cleaned the beach near our school. The beach was covered with plastic bottles and bags. We were told by a local fisherman that most of the trash is carried by the wind from the town. Many students said, "We should have brought more gloves." Some students had to work without them. However, all the trash was collected by noon, and it will be used for an art project next month.', q: 'この報告の内容と合うものを1つ選びなさい。', choices: ['①生徒たちは手袋を十分に持っていった。', '②ごみの多くは風によって町から運ばれてくると、漁師から聞いた。', '③ごみは夕方までかかって集められた。', '④集めたごみは先月の美術作品に使われた。'], a: '②(ごみの多くは風によって町から運ばれてくると、漁師から聞いた。)', exp: 'We were told by a local fisherman that … is carried by the wind from the town から②が正解です。We should have brought more gloves は「もっと持ってくるべきだったのに(持ってこなかった)」という後悔なので、①は誤り。collected by noon は「正午までに」なので③も誤り。will be used … next month は来月使われる予定なので④も誤りです。' }
    ]
  });

  /* ===== e_inf 不定詞・動名詞・分詞 ===== */
  add('e_inf', {
    sheet: {
      title: '準動詞 1ページまとめ',
      blocks: [
        { h: '不定詞の3用法', items: ['名詞的:〜すること(To read is fun.)', '形容詞的:〜するための・〜すべき(something to drink)', '副詞的:目的・感情の原因・結果・判断の根拠'] },
        { h: 'to と ing の相性', items: ['to をとる(これから):want・hope・decide・plan・promise', 'ing をとる(すでに・実際に):enjoy・finish・avoid・mind・stop', 'remember / forget to 〜:これから〜すること', 'remember / forget ~ing:(過去に)〜したこと', 'try to 〜:〜しようとする/try ~ing:試しに〜する'] },
        { h: '分詞の基本', items: ['現在分詞(~ing):〜している(能動)', '過去分詞(p.p.):〜された(受動)', '1語なら名詞の前、2語以上なら名詞の後ろ', 'exciting(わくわくさせる)/excited(わくわくした)'] },
        { h: '意味上の主語・否定', items: ['不定詞:for 人 to 〜(性質なら of 人)', '動名詞:所有格または目的格 + ~ing', '否定:not to 〜・not ~ing(not は直前)'] },
        { h: 'よく出る形', items: ['too 〜 to …:〜すぎて…できない', '〜 enough to …:…するのに十分〜', 'be to 不定詞:予定・義務・可能・運命・意図', 'a house to live in(前置詞が残る)'] }
      ],
      key: 'to は「これから向かう」、ing は「すでに・実際にしている」。動詞との相性はこのイメージで覚える。'
    },
    cards: [
      ['不定詞の3用法', '名詞的・形容詞的・副詞的'],
      ['enjoy の後ろは to か ing か', 'ing(enjoy swimming)'],
      ['decide の後ろは to か ing か', 'to(decide to go)'],
      ['remember to 〜 の意味', '忘れずに〜する(これから)'],
      ['remember ~ing の意味', '〜したことを覚えている(過去)'],
      ['stop ~ing と stop to 〜 のちがい', '〜するのをやめる/〜するために立ち止まる'],
      ['try ~ing の意味', '試しに〜してみる'],
      ['It is kind ( ) you to help me. の前置詞', 'of(人の性質を表す形容詞)'],
      ['不定詞の否定の位置', 'to の直前(not to 〜)'],
      ['too 〜 to … の意味', '〜すぎて…できない'],
      ['a surprising result と surprised people', 'surprising は驚かせる、surprised は驚いた'],
      ['分詞が名詞の後ろに置かれるのは?', '分詞が2語以上のかたまりのとき'],
      ['be to 不定詞の5つの意味', '予定・義務・可能・運命・意図'],
      ['a chair to sit ( ) に入る語', 'on(sit on a chair の on が残る)'],
      ['mind ~ing の意味', '〜するのを気にする・いやがる']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】英語のポスターです。\nJoin the Reading Challenge!\nThe goal of this challenge is to read ten books by the end of March. You can choose any books written in English. Remember to write a short comment on the card after finishing each book. Students wishing to join should sign up at the library. Don\'t forget to bring your student ID. Prizes will be given to students completing the challenge.', q: 'このポスターの内容と合うものを1つ選びなさい。', choices: ['①参加したい生徒は、図書館で申し込む必要がある。', '②読む本は図書館が指定したものに限られる。', '③感想は10冊を読み終えた後にまとめて書く。', '④賞品は申し込んだ生徒全員にもらえる。'], a: '①(参加したい生徒は、図書館で申し込む必要がある。)', exp: 'Students wishing to join should sign up at the library から①が正解です(wishing to join が students を後ろから説明)。any books written in English なので②は誤り。Remember to write a short comment … after finishing each book は「1冊読み終えるごとに忘れずに書く」なので③も誤り。賞品は students completing the challenge(達成した生徒)なので④も誤りです。' },
      { kind: '会話文', ctx: 'Nao と Ben が話しています。\nNao: I stopped to buy a drink on my way here, so I\'m a little late. Sorry.\nBen: No problem. By the way, did you finish the essay?\nNao: Not yet. I tried writing it on my computer, but I\'m not used to typing in English.\nBen: I remember having the same problem last year. Practicing a little every day really helped me.', q: '会話の内容と合うものを1つ選びなさい。', choices: ['①Nao は飲み物を買うのをやめて急いで来た。', '②Nao はパソコンで作文を書いてみたが、英語の入力に慣れていない。', '③Ben はこれから同じ問題に取り組むつもりである。', '④Ben は練習しても効果がなかったと言っている。'], a: '②(Nao はパソコンで作文を書いてみたが、英語の入力に慣れていない。)', exp: 'stopped to buy は「買うために立ち止まった」なので①は誤りです。tried writing は「試しに書いてみた」、not used to typing は「入力することに慣れていない」で②が正解。remember having は「(過去に)同じ問題があったことを覚えている」なので③は誤り。Practicing … really helped me から④も誤りです。to と ing の意味のちがいが読解の決め手になります。' }
    ]
  });

  /* ===== e_h4 関係副詞・what・複合関係詞 ===== */
  add('e_h4', {
    sheet: {
      title: '関係詞(発展)1ページまとめ',
      blocks: [
        { h: '関係副詞', items: ['where:場所(the town where I was born)', 'when:時(the day when we met)', 'why:理由(the reason why 〜)', 'how:方法(the way と how は並べない)'] },
        { h: '関係副詞か関係代名詞か', items: ['後ろが完全な文 → 関係副詞', '後ろに S や O が欠けている → 関係代名詞', '例:the city which I visited(visit の O が欠ける)', '関係副詞 = 前置詞 + which(where = in which)'] },
        { h: 'what', items: ['先行詞をふくむ:〜するもの・こと', 'what S is:今の S の姿/what S was:昔の S', 'what is called:いわゆる', 'what is more:さらに'] },
        { h: '非制限用法', items: ['コンマ + 関係詞:補足説明(そして・しかし)', ', which は前の文全体も受けられる', 'that と what は非制限用法で使えない'] },
        { h: '複合関係詞', items: ['whoever:〜する人はだれでも/だれが〜しても', 'whatever:〜するものは何でも/何を〜しても', 'whenever・wherever・however', 'however + 形容詞 + S V:どんなに〜でも'] }
      ],
      key: '関係副詞か関係代名詞かは、先行詞ではなく【後ろの文が完全か不完全か】で決める。'
    },
    cards: [
      ['関係副詞の4種類', 'where・when・why・how'],
      ['関係副詞の後ろの文の特徴', '完全な文(S・O が欠けていない)'],
      ['関係代名詞の後ろの文の特徴', 'S や O が欠けた不完全な文'],
      ['where を前置詞 + which で表すと?', 'in which / at which など'],
      ['the way how は正しい?', '誤り。the way か how のどちらか一方'],
      ['what の意味', '〜するもの・こと(先行詞をふくむ)'],
      ['what he is の意味', '今の彼(の姿・人格)'],
      ['what is called の意味', 'いわゆる'],
      [', which が受けられるもの', '前の名詞または前の文全体'],
      ['非制限用法で使えない関係詞', 'that と what'],
      ['whoever の2つの意味', '〜する人はだれでも/だれが〜しても'],
      ['whatever の2つの意味', '〜するものは何でも/何を〜しても'],
      ['however + 形容詞 + S V の意味', 'どんなに〜でも'],
      ['all of whom の意味', '(その人たち)全員が'],
      ['whose の後ろに来るもの', '名詞(whose + 名詞)']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】観光案内のウェブサイトです。\nWelcome to Minami Town\nMinami Town is a small town where old wooden houses still stand. Visit the Sato House, which was built in 1850. It is the place where a famous poet spent his childhood. The museum next to it shows what life was like 150 years ago. Spring is the season when the town is most crowded, so we recommend visiting in autumn. Whoever buys a one-day pass can enter both buildings.', q: 'このウェブサイトの内容と合うものを1つ選びなさい。', choices: ['①佐藤家は、有名な詩人が晩年を過ごした場所である。', '②博物館では、150年前の生活の様子を知ることができる。', '③町が最も混雑するのは秋である。', '④1日券を持っていても、入れるのは1つの建物だけである。'], a: '②(博物館では、150年前の生活の様子を知ることができる。)', exp: 'shows what life was like 150 years ago は「150年前の生活がどのようであったか」を示すという意味で②が正解。spent his childhood は「子ども時代を過ごした」なので①は誤り。the season when the town is most crowded は春なので③も誤り。Whoever buys a one-day pass can enter both buildings(1日券を買う人はだれでも両方に入れる)から④も誤りです。' },
      { kind: '会話文', ctx: '英作文の添削をしています。\nStudent: I wrote, "This is the library where I often visit."\nTeacher: Hmm. Think about the verb "visit." Do you visit a place, or visit to a place?\nStudent: We say "visit the library." So "visit" needs an object.\nTeacher: Right. Now look at the part after "the library" again.', q: '先生の助言にしたがって直した文として最も適切なものを1つ選びなさい。', choices: ['①This is the library where I often visit it.', '②This is the library which I often visit.', '③This is the library when I often visit.', '④This is the library what I often visit.'], a: '②(This is the library which I often visit.)', exp: 'visit は他動詞で目的語が必要です。I often visit の後ろには目的語が欠けているので、不完全な文を導く関係代名詞 which(または that)を使います。①は関係副詞のあとに it を入れていて不自然で、関係詞の文としては誤りです。③の when は時の先行詞に使い、④の what は先行詞をふくむので the library と並べられません。' }
    ]
  });

  /* ===== e_h3 分詞構文 ===== */
  add('e_h3', {
    sheet: {
      title: '分詞構文 1ページまとめ',
      blocks: [
        { h: '作り方', items: ['① 接続詞を消す', '② 主節と同じ主語なら主語を消す', '③ 動詞を ~ing にする', '例:When I opened the door → Opening the door'] },
        { h: '表す意味', items: ['時(〜するとき)・理由(〜なので)', '付帯状況(〜しながら)・連続(〜して、そして)', '条件(〜すれば)・譲歩(〜だけれども)はまれ', '意味は文脈で決める(書かれていない)'] },
        { h: 'いろいろな形', items: ['受動:(Being) Written in English, the book …', '完了:Having finished 〜(主節より前)', '否定:Not knowing 〜(not は分詞の直前)', '独立分詞構文:It being fine, we …(主語が別)'] },
        { h: '慣用表現', items: ['generally speaking:一般的に言えば', 'judging from 〜:〜から判断すると', 'considering 〜:〜を考えると', 'weather permitting:天気がよければ'] },
        { h: '付帯状況の with', items: ['with + O + 分詞/形容詞/前置詞句', 'with his eyes closed:目を閉じて', 'with the TV on:テレビをつけたまま'] }
      ],
      key: '分詞構文の主語は主節の主語と同じ。ちがう場合は分詞の前に主語を残す(独立分詞構文)。'
    },
    cards: [
      ['分詞構文の作り方3ステップ', '接続詞を消す→同じ主語を消す→~ing にする'],
      ['分詞構文の主な意味', '時・理由・付帯状況・連続'],
      ['Having p.p. の分詞構文が表す時', '主節より前の出来事'],
      ['分詞構文の否定の位置', '分詞の直前(Not knowing 〜)'],
      ['受動の分詞構文の形', '(Being) + 過去分詞'],
      ['独立分詞構文とは?', '主節と主語がちがうので主語を残した分詞構文'],
      ['There being no bus の意味', 'バスがなかったので'],
      ['generally speaking の意味', '一般的に言えば'],
      ['judging from 〜 の意味', '〜から判断すると'],
      ['considering 〜 の意味', '〜を考慮すると'],
      ['weather permitting の意味', '天気がよければ'],
      ['with his arms folded の意味', '腕を組んで'],
      ['with the light on の意味', '明かりをつけたまま'],
      ['付帯状況の with の形', 'with + O + 分詞・形容詞・副詞・前置詞句'],
      ['Seen from the sky の Seen の意味', '(〜から)見られると=見ると(受動)']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】ある生徒の日記です。\nHaving lost my wallet on the train, I went to the station office. The staff member, smiling kindly, asked me some questions. Not knowing the exact time, I could only say "around five." Surprisingly, my wallet was found an hour later, with all the money left inside. Judging from this experience, people in this city seem very honest.', q: 'この日記の内容と合うものを1つ選びなさい。', choices: ['①駅事務所に行った後で、財布をなくした。', '②筆者は財布をなくした正確な時刻を答えることができた。', '③財布はお金が入ったままの状態で見つかった。', '④筆者は、この町の人は正直ではないと感じている。'], a: '③(財布はお金が入ったままの状態で見つかった。)', exp: 'Having lost は主節より前の出来事なので、財布をなくしたのが先で①は誤り。Not knowing the exact time は「正確な時刻が分からなかったので」なので②も誤り。with all the money left inside は付帯状況の with で「お金が全部中に残ったまま」なので③が正解。Judging from 〜, people … seem very honest から④も誤りです。' },
      { kind: '会話文', ctx: '英語の授業での会話です。\nTeacher: What do you think of this sentence? "Walking along the river, a beautiful bird appeared."\nHana: It sounds strange. It means the bird was walking!\nTeacher: Exactly. So how can we fix it?\nHana: We need to make it clear who was walking.', q: 'Hana の考えにしたがって直した文として最も適切なものを1つ選びなさい。', choices: ['①Walking along the river, a beautiful bird was appeared.', '②Walked along the river, a beautiful bird appeared.', '③Walking along the river, I saw a beautiful bird.', '④Being walked along the river, I saw a beautiful bird.'], a: '③(Walking along the river, I saw a beautiful bird.)', exp: '分詞構文の意味上の主語は主節の主語と同じになります。もとの文は主節の主語が a beautiful bird なので、鳥が歩いていたことになります。歩いていたのは「私」なので、主節の主語を I にした③が正解です。①は appear が自動詞で受動態にできず、②は過去分詞で「歩かれた」となり、④も受動の形で不自然です。' }
    ]
  });

  /* ===== e_comp 比較 ===== */
  add('e_comp', {
    sheet: {
      title: '比較(発展)1ページまとめ',
      blocks: [
        { h: '倍数表現', items: ['X times as 〜 as …:…の X 倍〜', 'twice as 〜 as(2倍)・half as 〜 as(半分)', 'X times the 名詞 of …(size・number など)'] },
        { h: 'the 比較級', items: ['The 比較級 S V, the 比較級 S V:〜すればするほど…', '比較級の強調:much・far・even・still・a lot', 'very は比較級を強調できない'] },
        { h: '最上級の意味の言いかえ', items: ['No other 名詞 is as 〜 as A', 'No other 名詞 is 比較級 than A', 'A is 比較級 than any other 単数名詞', 'Nothing is more 〜 than A'] },
        { h: 'no more / no less', items: ['no more than:〜しか(= only)', 'no less than:〜も(= as many/much as)', 'not more than:多くても(= at most)', 'not less than:少なくとも(= at least)', 'A is no more B than C is D:クジラの構文'] },
        { h: 'まちがえやすい点', items: ['比べるものをそろえる:that of・those of', 'than any other の後ろは単数名詞', 'superior / inferior / prefer は than ではなく to'] }
      ],
      key: '比較はまず「何と何を比べているか」をそろえる。no は「ゼロ=差がない・逆の気持ち」と考える。'
    },
    cards: [
      ['「〜の3倍の大きさ」の形', 'three times as large as 〜'],
      ['「〜の半分」の形', 'half as 〜 as …'],
      ['比較級の強調に使える語', 'much・far・even・still・a lot'],
      ['The 比較級, the 比較級 の意味', '〜すればするほど…'],
      ['than any other の後ろの名詞の数', '単数'],
      ['no more than の意味', '〜しか(= only)'],
      ['no less than の意味', '〜も(多さを強調)'],
      ['not more than の意味', '多くても(= at most)'],
      ['not less than の意味', '少なくとも(= at least)'],
      ['no longer の意味', 'もはや〜ない'],
      ['superior の後ろの前置詞', 'to(superior to 〜)'],
      ['prefer A to B の意味', 'B より A を好む'],
      ['比べる対象をそろえる代名詞', 'that of(単数)・those of(複数)'],
      ['all the 比較級 for 〜 の意味', '〜のためにかえっていっそう'],
      ['none the 比較級 for 〜 の意味', '〜だからといって少しも…ない']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】クラスで調べた「1週間の平均読書時間」の表です。\n・1年生:60分\n・2年生:90分\n・3年生:120分\nReport: The third-year students read twice as long as the first-year students. The second-year students read 30 minutes longer than the first-year students. No other grade reads as long as the third-year students.', q: 'レポート(Report)の英文の内容について、表と照らし合わせて正しいものを1つ選びなさい。', choices: ['①3つの文はすべて表と合っている。', '②1文目だけが表と合っていない。', '③2文目だけが表と合っていない。', '④3文目だけが表と合っていない。'], a: '①(3つの文はすべて表と合っている。)', exp: '1文目:3年生120分は1年生60分の2倍で、twice as long as と合います。2文目:90 − 60 = 30分なので、30 minutes longer than も合います(差は比較級の前に置く)。3文目:No other grade reads as long as は「3年生ほど長く読む学年はほかにない」=3年生が最も長いという最上級の意味で、表と合います。したがって①が正解です。' },
      { kind: '会話文', ctx: 'Yuki と Leo が買い物の相談をしています。\nYuki: This bag costs no more than 2,000 yen. It\'s a good deal!\nLeo: Really? I thought it was expensive.\nYuki: No, it\'s cheap for this quality. The one in the next shop costs no less than 6,000 yen.\nLeo: Wow. Then this bag is far better.', q: '会話の内容と合うものを1つ選びなさい。', choices: ['①Yuki は2,000円のかばんを高いと感じている。', '②となりの店のかばんは6,000円もする。', '③となりの店のかばんは少なくとも2,000円はする。', '④Leo はとなりの店のかばんのほうがよいと考えている。'], a: '②(となりの店のかばんは6,000円もする。)', exp: 'no more than 2,000 yen は「2,000円しか」で安いという気持ちなので①は誤り。no less than 6,000 yen は「6,000円も」と高さを強調する表現で②が正解です。③は「少なくとも」を表す not less than の意味と取りちがえた選択肢で、金額も合いません。Leo は this bag is far better(このかばんのほうがずっとよい)と言っているので④も誤りです。' }
    ]
  });

  /* ===== e_h2 仮定法 ===== */
  add('e_h2', {
    sheet: {
      title: '仮定法 1ページまとめ',
      blocks: [
        { h: '基本の2つの形', items: ['仮定法過去:If S 過去形, S would 原形(今の反対)', '仮定法過去完了:If S had p.p., S would have p.p.(過去の反対)', 'be動詞は were が基本(主語に関係なく)'] },
        { h: '混合型', items: ['If S had p.p.(過去), S would 原形 now(今)', '目印:主節の now・today', '「あのとき〜していたら、今ごろ…だろう」'] },
        { h: '願望・様子・時期', items: ['I wish S 過去形:今〜ならいいのに', 'I wish S had p.p.:あのとき〜だったらよかったのに', 'as if S 過去形 / had p.p.:まるで〜かのように', 'It is time S 過去形:もう〜する時間だ'] },
        { h: 'if のない仮定法', items: ['Without / But for 〜:〜がなければ', 'If it were not for 〜(今)/ If it had not been for 〜(過去)', '倒置:Were I 〜 / Had I p.p. / Should S 原形', '主語・副詞句(otherwise・in 〜)に仮定がふくまれる'] },
        { h: 'should と were to', items: ['If S should 原形:万一〜なら(命令文も可)', 'If S were to 原形:仮に〜としたら', '提案・要求の that 節は(should)原形'] }
      ],
      key: '仮定法は「時制を1つ過去にずらす」=現実と距離があるという合図。ずれた時制から本当の事実を読み取る。'
    },
    cards: [
      ['仮定法過去が表す時', '現在(今の事実の反対)'],
      ['仮定法過去完了が表す時', '過去(過去の事実の反対)'],
      ['仮定法過去の主節の形', 'S would / could / might + 原形'],
      ['仮定法過去完了の主節の形', 'S would / could / might have p.p.'],
      ['混合型の目印', '主節の now・today など'],
      ['I wish I had p.p. の意味', 'あのとき〜だったらよかったのに'],
      ['as if の意味', 'まるで〜かのように'],
      ['It is time S 過去形 の意味', 'もう〜する時間だ'],
      ['But for 〜 の意味', '〜がなければ/なかったら'],
      ['If it had not been for 〜 の意味', '(過去に)〜がなかったら'],
      ['If I were you の倒置', 'Were I you'],
      ['If I had known の倒置', 'Had I known'],
      ['If S should 〜 の意味', '万一〜なら'],
      ['If S were to 〜 の意味', '仮に〜としたら'],
      ['otherwise の意味(仮定法で)', 'さもなければ']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】ある選手のインタビュー記事です。\nAfter the final game, Mai said, "If I had not hurt my leg last year, I might be playing for the national team now. But I don\'t regret it. Without the support of my coach, I would have quit soccer. Thanks to him, I learned to enjoy the game again. If I were to give advice to young players, I would say, \'Take care of your body first.\'"', q: '記事の内容から分かる事実として正しいものを1つ選びなさい。', choices: ['①Mai は昨年、足をけがしなかった。', '②Mai は今、代表チームでプレーしている。', '③Mai はコーチの支えがあったので、サッカーをやめなかった。', '④Mai は若い選手に助言をしたことがない、と言っている。'], a: '③(Mai はコーチの支えがあったので、サッカーをやめなかった。)', exp: 'If I had not hurt my leg … I might be playing now は混合型の仮定法で、事実は「けがをした」「今は代表でプレーしていない」なので①②は誤りです。Without the support of my coach, I would have quit soccer. は「支えがなければやめていた」=実際は支えがあってやめなかったので③が正解。If I were to give advice は「仮に助言するとしたら」で、助言の経験の有無は述べていないので④も誤りです。' },
      { kind: '会話文', ctx: 'Kai と姉の Rina が話しています。\nKai: I can\'t find my bike key. I wish I had put it in the drawer.\nRina: You always say that. It\'s time you made a special place for your keys.\nKai: You\'re right. Should you see it somewhere, please tell me.\nRina: OK. But if I were you, I would check your jacket pocket first.', q: '会話の内容と合うものを1つ選びなさい。', choices: ['①Kai はかぎを引き出しに入れておいた。', '②Rina は、Kai がすでにかぎの置き場所を決めていると言っている。', '③Kai は、万一かぎを見かけたら教えてほしいと頼んでいる。', '④Rina は Kai のジャケットのポケットを調べた。'], a: '③(Kai は、万一かぎを見かけたら教えてほしいと頼んでいる。)', exp: 'I wish I had put it in the drawer は「入れておけばよかった」で、実際は入れていないので①は誤り。It\'s time you made 〜 は「もう〜を作ってもいいころだ」=まだ作っていないので②も誤り。Should you see it は If you should see it の倒置で「万一見かけたら」なので③が正解。if I were you, I would check は助言で、Rina が調べたわけではないので④も誤りです。' }
    ]
  });

  /* ===== e_emph 強調・倒置・省略・話法 ===== */
  add('e_emph', {
    sheet: {
      title: '特殊構文 1ページまとめ',
      blocks: [
        { h: '強調構文', items: ['It is A that 〜:〜なのは A だ', 'A に入るのは名詞・副詞(句・節)', '見分け方:It is と that を消して文が完成すれば強調構文', 'What 〜 is A:〜なのは A だ(強調の別の形)', 'do / does / did + 原形:本当に〜する'] },
        { h: '否定語が文頭の倒置', items: ['Never / Little / Hardly / Seldom + 疑問文の語順', 'Not until 〜 did S …:〜して初めて…した', 'Only + 副詞句 + 疑問文の語順', 'Not only 〜 but also … の倒置'] },
        { h: 'その他の倒置', items: ['So do I.(私も)/ Neither do I.(私も〜ない)', 'No sooner had S p.p. than 〜', '場所の倒置:On the hill stands a castle.', 'So 形容詞 is S that 〜'] },
        { h: '省略・挿入', items: ['when / while などの後ろの S + be の省略', '代不定詞:I\'d like to.(to のあとを省略)', '挿入:, I think, ・, however, など'] },
        { h: '話法の転換', items: ['直接話法 → 間接話法で時制・代名詞・時の語を変える', 'now → then / today → that day / here → there', 'yesterday → the day before', '命令文 → tell O to 〜'] }
      ],
      key: '倒置・強調・省略はどれも「伝えたい情報を目立たせる」ためのしくみ。もとの語順に戻すと意味が分かる。'
    },
    cards: [
      ['強調構文の形', 'It is A that 〜'],
      ['強調構文の見分け方', 'It is と that を消して文が成り立つか'],
      ['動詞を強調する方法', 'do / does / did + 原形'],
      ['Never have I seen 〜 の意味', '一度も〜を見たことがない'],
      ['Not until 〜 did S … の意味', '〜して初めて S は…した'],
      ['Little did I know 〜 の意味', '〜とは少しも知らなかった'],
      ['So do I. の意味', '私もそうです(肯定)'],
      ['Neither do I. の意味', '私もそうではありません(否定)'],
      ['否定語が文頭に来たときの語順', '疑問文と同じ語順'],
      ['Only then did I 〜 の意味', 'そのとき初めて〜した'],
      ['When young の省略されている語', 'S + be(When I was young)'],
      ['間接話法で today は?', 'that day'],
      ['間接話法で yesterday は?', 'the day before / the previous day'],
      ['命令文の間接話法の形', 'tell / ask O to 〜'],
      ['It was in 2020 that 〜 の意味', '〜したのは2020年だった']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】科学雑誌のコラムです。\nFor many years, people believed that the plant needed a lot of water. It was not until 2015 that a young researcher found the truth. Only in very dry places does the plant produce its bright flowers. Never had scientists imagined that dryness could help a plant bloom. What surprised them most was that the plant grew faster with less water.', q: 'コラムの内容と合うものを1つ選びなさい。', choices: ['①その植物はたくさんの水が必要だと、2015年に分かった。', '②その植物は、とても乾燥した場所でのみ明るい色の花を咲かせる。', '③科学者たちは昔から、乾燥が開花を助けると考えていた。', '④その植物は水が多いほど速く育つ。'], a: '②(その植物は、とても乾燥した場所でのみ明るい色の花を咲かせる。)', exp: 'It was not until 2015 that 〜 は「2015年になって初めて〜」で、分かったのは「多くの水が必要」ではない本当のことなので①は誤り。Only in very dry places does the plant produce は倒置で、もとの語順は The plant produces … only in very dry places なので②が正解。Never had scientists imagined は「想像したことがなかった」なので③は誤り。grew faster with less water から④も誤りです。' },
      { kind: '会話文', ctx: '昼休みの会話です。\nMeg: I didn\'t like the movie we saw yesterday.\nSota: ( A ). The story was too long.\nMeg: But the music was great. I really enjoyed it.\nSota: ( B ). I bought the soundtrack this morning!', q: '( A )( B ) に入る表現の組み合わせとして最も適切なものを1つ選びなさい。', choices: ['① A: So did I B: Neither did I', '② A: Neither did I B: So did I', '③ A: So didn\'t I B: Neither I did', '④ A: Neither I did B: So I did'], a: '②(A: Neither did I B: So did I)', exp: '(A) は Meg の否定文 I didn\'t like 〜 に同意して「私も好きではなかった」なので Neither did I。(B) は肯定文 I really enjoyed it に同意して「私も楽しんだ」なので So did I です。どちらも Neither / So の後ろは疑問文と同じ語順(助動詞 + 主語)になります。時制は過去なので did を使います。' }
    ]
  });

  /* ===== ex_eng 正誤・文法問題の解き方 ===== */
  add('ex_eng', {
    sheet: {
      title: '文法問題の解き方 1ページまとめ',
      blocks: [
        { h: '4ステップ', items: ['① 選択肢を見て、何が問われているかを決める', '② 空所の前後と文全体の構造をつかむ', '③ 目印(時・節・語法)を探す', '④ 選んだら全文を読み直して確認'] },
        { h: '時制・仮定法の目印', items: ['since・for → 完了形/ago・yesterday → 過去形', 'by the time + 現在形 → 未来完了', 'now があれば混合型の仮定法', 'suggest・insist・demand that S(should)原形'] },
        { h: '関係詞・準動詞の目印', items: ['後ろが完全な文 → 関係副詞・接続詞', '後ろが不完全 → 関係代名詞・what', '動詞の後ろの to / ing の相性', '名詞と分詞の関係:能動なら ~ing、受動なら p.p.'] },
        { h: '数・一致', items: ['each・every + 単数名詞 + 単数動詞', 'information・advice・furniture は数えられない', 'either A or B・neither A nor B は B に合わせる', 'The number of 〜 is(単数)/ A number of 〜 are(複数)'] },
        { h: '時間の使い方', items: ['1問30秒を目安に、迷ったら印をつけて次へ', '語法・熟語は知識問題:考えこまない', '最後に見直す時間を残す'] }
      ],
      key: '文法問題は「選択肢から問われている事項を決め、文中の目印で判定する」。勘ではなく根拠で選ぶ。'
    },
    cards: [
      ['文法問題でまずすること', '選択肢を見て問われている事項を決める'],
      ['since・for があれば?', '完了形を考える'],
      ['ago があれば?', '過去形(完了形は使えない)'],
      ['suggest that S の後ろの動詞', '(should)+ 原形'],
      ['each の後ろの名詞と動詞', '単数名詞・単数動詞'],
      ['information は数えられる?', '数えられない(an information ×)'],
      ['advice を数えるときの形', 'a piece of advice'],
      ['either A or B の動詞の一致', 'B に合わせる'],
      ['The number of students の動詞', '単数(is)'],
      ['A number of students の動詞', '複数(are)'],
      ['both A and B の動詞', '複数'],
      ['A as well as B の動詞の一致', 'A に合わせる'],
      ['many と much の使い分け', 'many は数えられる名詞、much は数えられない名詞'],
      ['few と a few のちがい', 'few はほとんどない、a few は少しある'],
      ['誤りの選択肢によくある作り方', '日本語訳に引きずられた語・似た語法の混同']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】留学生が学校新聞に書いた記事の下書きです。\n(1) Each student in our class has a tablet.\n(2) We use them to get many informations about the world.\n(3) The number of students who study online is increasing.\n(4) Neither my friends nor I am tired of studying this way.', q: '英文(1)〜(4)のうち、文法的に誤りをふくむものを1つ選びなさい。', choices: ['①(1)', '②(2)', '③(3)', '④(4)'], a: '②((2))', exp: 'information は数えられない名詞なので、many informations ではなく much information や a lot of information にします。(1) は Each student が単数なので has で正しく、(3) は The number of 〜 が「〜の数」で単数扱いなので is で正しいです。(4) は neither A nor B の動詞が B(I)に合わせて am になっており正しい文です。' },
      { kind: '会話文', ctx: '文法問題の解き方を話し合っています。\nQuestion: I have lived in this town ( ) I was ten.\n(a) since (b) for (c) when (d) ago\nRio: I chose "when," because it means "〜のとき" in Japanese.\nTaku: But look at the verb "have lived." It\'s a perfect form.\nRio: Oh, so I should look for a word that goes with that form.\nTaku: Also, what follows the blank is "I was ten," not a period of time.', q: 'Taku の考え方にしたがって選んだ答えとその根拠として最も適切なものを1つ選びなさい。', choices: ['①(a)since:現在完了と合い、後ろが「時点」を表す節だから', '②(b)for:現在完了と合い、後ろが「期間」を表すから', '③(c)when:日本語の「〜のとき」に当たるから', '④(d)ago:過去の時点を表すから'], a: '①((a)since:現在完了と合い、後ろが「時点」を表す節だから)', exp: 'have lived は継続を表す現在完了で、since か for が候補になります。後ろが I was ten という「時点」を表す節なので、接続詞としても使える since が入ります。for は期間(for ten years)に使います。when は完了形の継続とは合わず、ago は過去形とともに使い、接続詞として節を導けません。Taku の2つの指摘(動詞の形・後ろの形)が根拠になります。' }
    ]
  });

  /* ===== hd_eng 難関大の英文法・和訳 ===== */
  add('hd_eng', {
    sheet: {
      title: '並べかえ・和訳 1ページまとめ',
      blocks: [
        { h: '並べかえの手順', items: ['① 動詞を見つけて S と V を決める', '② 動詞の語法(後ろの形)を当てはめる', '③ 熟語・決まった語順を先に組む', '④ 余った語を修飾語として置く'] },
        { h: '構造をつかむコツ', items: ['動詞の数 = 接続詞・関係詞の数 + 1', 'that の種類:接続詞・関係代名詞・同格・強調', '同格の that の後ろは完全な文', '補語の倒置:Happy is the man who 〜'] },
        { h: '和訳の手順', items: ['① 文構造を書きこむ(S・V・O・C)', '② 直訳を作る', '③ 日本語として自然に直す(意味は変えない)', '④ 指示語・代名詞の中身を確認'] },
        { h: '訳し方のくふう', items: ['無生物主語:「〜によって」「〜のおかげで」と訳す', '名詞構文:名詞を動詞・形容詞に戻して訳す', '部分否定:not all = すべてが〜とは限らない', '二重否定:not … without 〜 = 〜すれば必ず'] },
        { h: '注意する否定表現', items: ['anything but 〜:決して〜ではない', 'nothing but 〜:〜だけ', 'far from 〜:〜どころではない', 'the last 名詞 to 〜:最も〜しそうにない'] }
      ],
      key: '並べかえも和訳も、まず「動詞」を見つけて文の骨組みを決める。訳は構造に忠実に、日本語は自然に。'
    },
    cards: [
      ['並べかえで最初に探すもの', '動詞(V)'],
      ['動詞の数と接続詞の数の関係', '動詞の数 = 接続詞・関係詞の数 + 1'],
      ['同格の that の後ろの文', '完全な文'],
      ['関係代名詞 that の後ろの文', '不完全な文(S や O が欠ける)'],
      ['同格の that をとる代表的な名詞', 'fact・news・idea・belief・possibility'],
      ['not all の意味', 'すべてが〜とは限らない(部分否定)'],
      ['not always の意味', 'いつも〜とは限らない'],
      ['never … without ~ing の意味', '…すれば必ず〜する'],
      ['anything but 〜 の意味', '決して〜ではない'],
      ['nothing but 〜 の意味', '〜だけ・〜にすぎない'],
      ['far from 〜 の意味', '決して〜ではない・〜どころではない'],
      ['the last person to 〜 の意味', '最も〜しそうにない人'],
      ['無生物主語の訳し方', '主語を「〜によって・〜のおかげで」と訳す'],
      ['名詞構文の訳し方', '名詞を動詞・形容詞に戻して文のように訳す'],
      ['His arrival surprised us. の自然な訳', '彼が来たので私たちは驚いた']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】ある評論の一節です。\nThe idea that technology always makes our lives easier is far from true. Not all new devices save us time; some of them make us busier than before. The rapid spread of smartphones, for example, has led many people to check messages even late at night. We should be the last people to accept every new invention without thinking.', q: '筆者の主張に最も近いものを1つ選びなさい。', choices: ['①技術は常に生活を楽にするので、新しい発明は積極的に受け入れるべきだ。', '②新しい機器のすべてが時間を節約するわけではないので、よく考えずに受け入れるべきではない。', '③スマートフォンは夜遅くに使うのでなければ、生活を楽にしてくれる。', '④新しい機器は、どれも人をより忙しくするだけである。'], a: '②(新しい機器のすべてが時間を節約するわけではないので、よく考えずに受け入れるべきではない。)', exp: 'The idea that … is far from true は「〜という考えは決して正しくない」で①を否定しています(that は同格)。Not all new devices save us time は部分否定で「すべてが時間を節約するわけではない」なので、「どれも」とする④は言いすぎです。最終文 the last people to accept … without thinking は「考えずに受け入れることを最もしそうにない人であるべきだ」=よく考えずに受け入れるべきではない、なので②が正解です。' },
      { kind: '探究', ctx: '和訳の練習で、生徒が次の文を訳しました。\n英文:A careful reading of the report will show you the cause of the problem.\n生徒の訳:「報告書の注意深い読書は、あなたに問題の原因を見せるだろう。」\n先生:意味は大きくまちがっていませんが、日本語として不自然ですね。【無生物主語】と【名詞構文】に注目して直してみましょう。', q: '先生の助言にしたがった訳として最も適切なものを1つ選びなさい。', choices: ['①報告書を注意深く読めば、問題の原因が分かるだろう。', '②報告書は注意深いので、問題の原因を見せるだろう。', '③注意深い報告書の読者は、問題の原因を見るだろう。', '④報告書を読むことは、問題を注意深く起こすだろう。'], a: '①(報告書を注意深く読めば、問題の原因が分かるだろう。)', exp: 'A careful reading of the report は名詞構文で、read the report carefully(報告書を注意深く読む)と動詞に戻せます。これが主語(無生物主語)なので「〜すれば」と条件のように訳し、show you 〜 は「あなたに〜を示す」→「〜が分かる」と自然にします。②は careful を報告書の性質と誤解し、③は reading を「読者」と取りちがえ、④は意味が変わっています。' }
    ]
  });

  /* ===== e_h5 語彙の覚え方 ===== */
  add('e_h5', {
    sheet: {
      title: '語彙の覚え方 1ページまとめ',
      blocks: [
        { h: '覚え方の基本', items: ['1回で完ぺきより、短時間で何度もくり返す', '忘れかけたころに復習する(間をあけて復習)', '音・つづり・意味・例文をセットで覚える'] },
        { h: '接頭辞', items: ['un- / in- / dis-:否定(unhappy・impossible・dislike)', 're-:再び(rebuild)', 'pre-:前に(preview)', 'inter-:間に(international)', 'trans-:越えて(transport)'] },
        { h: '語根', items: ['port:運ぶ(export・import)', 'spect:見る(inspect・respect)', 'dict:言う(predict・dictionary)', 'vis / vid:見る(visible・video)'] },
        { h: '接尾辞と品詞', items: ['名詞:-tion・-ment・-ness・-ity', '形容詞:-ful・-less・-able・-ous・-ive', '動詞:-en・-ize・-ify', '副詞:-ly(ただし friendly は形容詞)'] },
        { h: '多義語・相性', items: ['中心の意味から広げる:run=動く→経営する', 'コロケーション:make a mistake・take a photo', '長文では文脈に合う意味を選ぶ'] }
      ],
      key: '単語は「何度も・セットで・パーツで」。多義語は中心のイメージから文脈で意味を決める。'
    },
    cards: [
      ['un- / dis- の意味', '否定(〜でない)'],
      ['re- の意味', '再び・もとへ'],
      ['pre- の意味', '前に'],
      ['inter- の意味', '間に・相互に'],
      ['trans- の意味', '越えて・向こうへ'],
      ['port の意味(語根)', '運ぶ'],
      ['spect の意味(語根)', '見る'],
      ['dict の意味(語根)', '言う'],
      ['-ness・-ity をつけると何詞?', '名詞'],
      ['-able の意味', '〜できる(形容詞)'],
      ['-less の意味', '〜がない(careless・useless)'],
      ['-ify・-ize をつけると何詞?', '動詞'],
      ['friendly の品詞', '形容詞(-ly でも副詞ではない)'],
      ['run a company の run の意味', '経営する'],
      ['「まちがえる」のコロケーション', 'make a mistake']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】科学記事の一部です。\nScientists have developed a new kind of plastic that is biodegradable. Unlike ordinary plastic, it breaks down naturally in soil within a few months. The material is also reusable: it can be melted and shaped again several times. Researchers predict that this invention will reduce the amount of plastic waste in the ocean.', q: '語 biodegradable の意味として、文脈と語の成り立ちから最も適切なものを1つ選びなさい。', choices: ['①何度でも作り直せる', '②生物の働きで自然に分解される', '③海の中でだけ使える', '④熱に強くとけない'], a: '②(生物の働きで自然に分解される)', exp: 'bio- は「生命・生物」、degrade は「分解する・質を落とす」、-able は「〜できる」で、語の成り立ちから「生物によって分解されうる」と推測できます。さらに直後の it breaks down naturally in soil(土の中で自然に分解される)がその言いかえになっています。①は reusable の説明、④は melted(とかされる)と矛盾します。' },
      { kind: '会話文', ctx: '単語の意味について話しています。\nEmi: This sentence says, "The movie ran for three hours." Does it mean the movie was running?\nMr. Lee: Think about the core image of "run." It means something moves smoothly and continues.\nEmi: So the movie continued for three hours?\nMr. Lee: Exactly. Now, what about "She runs a small bakery"?', q: 'Mr. Lee の説明にもとづいて、She runs a small bakery. の意味として最も適切なものを1つ選びなさい。', choices: ['①彼女は小さなパン屋まで走る。', '②彼女は小さなパン屋を経営している。', '③彼女は小さなパン屋から逃げる。', '④彼女は小さなパン屋で売り切れる。'], a: '②(彼女は小さなパン屋を経営している。)', exp: 'run の中心のイメージは「なめらかに動き続ける」です。お店を「動かし続ける」と考えると「経営する」という意味になります。runs a small bakery は他動詞で、目的語 a small bakery を直接とっているので「〜まで走る」(run to 〜)の意味にはなりません。多義語は中心のイメージと、後ろの形(目的語の有無)から意味を決めます。' }
    ]
  });

  /* ===== e_idiom 熟語 ===== */
  add('e_idiom', {
    sheet: {
      title: '熟語 1ページまとめ',
      blocks: [
        { h: '熟語の型', items: ['動詞 + 前置詞:look for・depend on', '動詞 + 副詞:give up・put off', '動詞 + 副詞 + 前置詞:look forward to・put up with', 'be + 形容詞 + 前置詞:be proud of・be good at'] },
        { h: '1語の言いかえ', items: ['put off = postpone(延期する)', 'put up with = tolerate / stand(がまんする)', 'look into = investigate(調べる)', 'call off = cancel(中止する)', 'make up for = compensate for(埋め合わせる)'] },
        { h: 'to の後ろが ~ing', items: ['look forward to ~ing:〜を楽しみに待つ', 'be used to ~ing:〜に慣れている', 'object to ~ing:〜に反対する', 'when it comes to ~ing:〜のことになると'] },
        { h: '代名詞の位置', items: ['動詞 + 副詞の熟語は代名詞を間にはさむ', 'turn it off ○ / turn off it ×', '名詞なら turn off the TV も turn the TV off も可'] },
        { h: '副詞のイメージ', items: ['up:上へ・完全に(eat up・use up)', 'off:離れる(take off・put off)', 'out:外へ・最後まで(find out・carry out)', 'down:下へ・弱まる(turn down・calm down)'] }
      ],
      key: '熟語は「前置詞・副詞のイメージ」で理解し、1語の言いかえとセットで覚える。'
    },
    cards: [
      ['put off の意味と1語の言いかえ', '延期する = postpone'],
      ['put up with の意味', 'がまんする(= tolerate)'],
      ['call off の意味', '中止する(= cancel)'],
      ['look into の意味', '調べる(= investigate)'],
      ['carry out の意味', '実行する'],
      ['turn down の意味', '断る/音量を下げる'],
      ['make up for の意味', '埋め合わせる'],
      ['look forward to の後ろの形', '名詞または ~ing'],
      ['be used to ~ing の意味', '〜することに慣れている'],
      ['when it comes to 〜 の意味', '〜のことになると'],
      ['turn off it は正しい?', '誤り。turn it off'],
      ['take after の意味', '(親など)に似ている'],
      ['run out of の意味', '〜を使い果たす'],
      ['get rid of の意味', '〜を取り除く'],
      ['up の中心イメージ', '上へ・完全に・最後まで']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】学校から保護者へのお知らせです。\nDear Parents,\nBecause of the typhoon, we have decided to put off the sports festival until next Saturday. The school trip to the science museum has been called off, but we will make up for it with a special science class in December. We are looking into other dates for the music event. We look forward to seeing you at the festival.', q: 'このお知らせの内容と合うものを1つ選びなさい。', choices: ['①体育祭は中止になり、代わりに12月に特別授業がある。', '②科学館への遠足は延期になり、来週の土曜日に行われる。', '③音楽イベントの別の日程について、学校が調べている。', '④保護者は体育祭に参加できない。'], a: '③(音楽イベントの別の日程について、学校が調べている。)', exp: 'put off the sports festival until next Saturday は「体育祭を来週の土曜日まで延期する」で、中止ではないので①は誤り。遠足は called off(中止)で、make up for it with a special science class in December(12月の特別授業で埋め合わせる)なので②も誤り。We are looking into other dates for the music event から③が正解。We look forward to seeing you at the festival より④も誤りです。' },
      { kind: '会話文', ctx: 'Ryo とホストマザーの Mrs. Brown が話しています。\nMrs. Brown: The TV is too loud. Could you turn ( )?\nRyo: Sorry! ... Is this OK?\nMrs. Brown: Yes, thanks. By the way, are you getting used to ( ) breakfast so early?\nRyo: Yes. At first it was hard, but now I\'m fine.', q: '2つの( )に入る語句の組み合わせとして最も適切なものを1つ選びなさい。', choices: ['① down it / eat', '② it down / eating', '③ it down / eat', '④ down it / eating'], a: '②(it down / eating)', exp: '1つ目:turn down は「動詞 + 副詞」の熟語で、目的語が代名詞 it のときは turn it down のように動詞と副詞の間にはさみます。2つ目:get used to 〜 の to は前置詞なので、後ろは動名詞 eating になります。used to eat(以前は食べた)と混同しないように注意します。' }
    ]
  });

  /* ===== e_h6 長文読解の論理 ===== */
  add('e_h6', {
    sheet: {
      title: '論理的な読み方 1ページまとめ',
      blocks: [
        { h: '論理マーカー', items: ['逆接:however・but・yet・on the other hand', '因果:because・therefore・as a result・so', '例示:for example・for instance・such as', '追加:also・moreover・in addition', '言いかえ・結論:in other words・in short・in conclusion'] },
        { h: '主張の見つけ方', items: ['逆接の後ろに筆者の主張が来やすい', '一般論(Many people think 〜)→ But → 主張', 'should・must・important などの語に注目', '最初と最後の段落に主張がまとまりやすい'] },
        { h: '段落の構造', items: ['トピックセンテンス(段落の要点)は多くが冒頭', '具体例・データはトピックセンテンスを支える', '段落の要点を一言でメモしながら読む'] },
        { h: '設問への対応', items: ['先に設問を読み、探す情報を決める', '本文の言いかえになっている選択肢が正解になりやすい', '本文の語をそのまま使った選択肢はひっかけに注意', '事実(データ)と意見(筆者の考え)を区別'] },
        { h: '文章の型', items: ['主張 → 理由 → 例 → 再主張', '問題 → 原因 → 解決策', '比較・対照(A と B)', '時系列(昔 → 今 → 未来)'] }
      ],
      key: '逆接の後ろと段落の冒頭が要点。選択肢は「本文の言いかえ」を探す。'
    },
    cards: [
      ['逆接のマーカー(3つ)', 'however・but・on the other hand'],
      ['因果のマーカー(3つ)', 'therefore・as a result・because'],
      ['例示のマーカー', 'for example・for instance・such as'],
      ['in other words の役割', '言いかえ(つまり)'],
      ['moreover の意味', 'さらに(追加)'],
      ['筆者の主張が来やすい場所', '逆接の後ろ・最初と最後の段落'],
      ['トピックセンテンスとは?', '段落の要点を述べた文(多くは冒頭)'],
      ['事実と意見の見分け方', '事実は確かめられる、意見は判断・評価をふくむ'],
      ['意見を表す目印の語', 'should・I think・important・better など'],
      ['正解の選択肢の特徴', '本文の内容を別の語で言いかえている'],
      ['ひっかけの選択肢の特徴', '本文の語をそのまま使い、内容をずらす'],
      ['「問題→原因→解決策」の型で大事な部分', '解決策(筆者の提案)'],
      ['nevertheless の意味', 'それにもかかわらず(逆接)'],
      ['in contrast の役割', '対比(それに対して)'],
      ['一般論 → But の流れの意味', 'But の後ろで筆者が反論・主張する']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】ある評論文です。\nMany people believe that reading on screens is just as good as reading on paper. It is true that screens are convenient; we can carry hundreds of books in one device. However, several studies suggest that readers remember details better when they read on paper. In one survey (架空の資料), 70% of students said they focused more easily on printed texts. Therefore, schools should not replace all paper textbooks with digital ones.', q: '筆者の主張として最も適切なものを1つ選びなさい。', choices: ['①画面での読書は紙と同じくらいよい。', '②画面は持ち運びに便利なので、教科書はすべて電子化すべきだ。', '③学校は紙の教科書をすべて電子版に置きかえるべきではない。', '④生徒の70%は電子版のほうが集中できると答えた。'], a: '③(学校は紙の教科書をすべて電子版に置きかえるべきではない。)', exp: '1文目は Many people believe 〜 という一般論、2文目の It is true that 〜 は相手の意見をいったん認める「譲歩」です。However の後ろで紙の利点を述べ、Therefore と should で結論を示しています。したがって③が主張です。①は一般論、②は譲歩の内容を言いすぎたもの、④は調査結果を逆にしたものです。' },
      { kind: '会話文', ctx: '授業で、ある文章の段落について話し合っています。\nTeacher: The paragraph starts with "Bees are important for our food supply." What comes next?\nAi: It says bees carry pollen from flower to flower, and that many fruits, such as apples, need this help.\nTeacher: Good. And the last sentence?\nAi: "In short, without bees, our tables would look very different."', q: 'この段落の構造の説明として最も適切なものを1つ選びなさい。', choices: ['①問題を示し、その原因を述べ、解決策を提案している。', '②要点を述べ、具体例で支え、最後に要点をまとめ直している。', '③2つのものを比較し、ちがいを述べている。', '④出来事を起きた順に説明している。'], a: '②(要点を述べ、具体例で支え、最後に要点をまとめ直している。)', exp: '冒頭の「ハチは食料の供給に重要だ」がトピックセンテンス(要点)です。続いて花粉を運ぶことやリンゴ(such as apples)という具体例で支え、最後の In short(要するに)で要点を言いかえてまとめています。問題と解決策、比較、時系列の流れは見られないので②が正解です。' }
    ]
  });

  /* ===== el_sound 音の変化 ===== */
  add('el_sound', {
    sheet: {
      title: '英語の音の変化 1ページまとめ',
      blocks: [
        { h: '連結', items: ['子音で終わる語 + 母音で始まる語がつながる', 'check it out → チェキラウ', 'an apple → アナポー'] },
        { h: '脱落', items: ['同じ・似た子音が続くと前の音が消えやすい', 'good day → グッデイ', '語末の t・d が聞こえにくい(next time → ネクスタイム)'] },
        { h: '同化', items: ['となりの音と混ざって別の音になる', 'did you → ディジュ', 'would you → ウッジュ', 'meet you → ミーチュ'] },
        { h: '弱形', items: ['機能語(冠詞・前置詞・代名詞・助動詞)は弱く短い', 'can → クン/ to → タ/ and → ン', 'them → アム、of → ア', '内容語(名詞・動詞・形容詞)ははっきり強い'] },
        { h: '強勢・数字', items: ['thirteen は後ろ、thirty は前に強勢', '英語は強い音がほぼ一定の間隔で来るリズム', '\'d は had か would、\'s は is か has を文法で判断'] }
      ],
      key: '聞き取れない原因の多くは「音の変化」と「弱形」。強く読まれる内容語を軸に聞く。'
    },
    cards: [
      ['連結とは?', '子音で終わる語と母音で始まる語がつながる現象'],
      ['脱落とは?', '音が弱くなって聞こえなくなる現象'],
      ['同化とは?', 'となりの音と混ざって別の音になる現象'],
      ['did you の聞こえ方', 'ディジュ(同化)'],
      ['meet you の聞こえ方', 'ミーチュ(同化)'],
      ['good day の聞こえ方', 'グッデイ(d の脱落)'],
      ['機能語の例', '冠詞・前置詞・代名詞・助動詞・接続詞'],
      ['内容語の例', '名詞・動詞・形容詞・副詞'],
      ['弱く読まれるのはどちら?', '機能語'],
      ['thirteen の強勢の位置', '後ろ(-teen)'],
      ['thirty の強勢の位置', '前(thir-)'],
      ['can と can\'t の聞き分けのポイント', 'can は弱く短く、can\'t は強くはっきり'],
      ['He\'d gone の \'d は?', 'had(後ろが過去分詞)'],
      ['He\'d go の \'d は?', 'would(後ろが原形)'],
      ['音の変化に強くなる練習法', 'シャドーイング・ディクテーション']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】リスニングの練習で、生徒が放送文を書き取りました(ディクテーション)。\n放送文:Did you check it out? The new shop opens at ten, and it\'ll be crowded.\n生徒のメモ:Digyu check it out? The new shop open set ten, and it be crowded.', q: '生徒のメモのまちがいの原因の説明として最も適切なものを1つ選びなさい。', choices: ['①Did you を同化で聞きまちがえ、opens at の連結や it\'ll の弱い音を聞き落とした。', '②check it out を脱落で聞き落とした。', '③ten の強勢を thirteen と聞きまちがえた。', '④The new shop を内容語として弱く聞いた。'], a: '①(Did you を同化で聞きまちがえ、opens at の連結や it\'ll の弱い音を聞き落とした。)', exp: 'Did you は同化で「ディジュ」と聞こえ、メモでは Digyu になっています。opens at は s と a が連結して「オウプンザッ」のように聞こえ、open set と区切りをまちがえています。it\'ll の \'ll は弱く短いので聞き落とされています。check it out は正しく書けており、ten も合っているので②③は誤り。shop は内容語で強く読まれるので④も不適切です。' },
      { kind: '会話文', ctx: '放送で次のように聞こえました。\nMan: I\'d already bought the tickets when I heard about the sale.\nWoman: Oh, that\'s too bad.\n先生:I\'d の \'d は何の短縮形か、後ろの形から考えましょう。', q: '男性の発言の意味として最も適切なものを1つ選びなさい。', choices: ['①セールのことを聞いたときには、すでにチケットを買ってしまっていた。', '②セールのことを聞いたら、チケットを買うつもりだ。', '③セールのことを聞く前に、チケットを買いたかった。', '④セールのことを聞いたので、チケットを買うのをやめた。'], a: '①(セールのことを聞いたときには、すでにチケットを買ってしまっていた。)', exp: 'I\'d の後ろが already bought(過去分詞)なので、\'d は would ではなく had で、過去完了 had bought です。「セールのことを聞いた(過去)」より前に「すでに買ってしまっていた」ことを表します。女性の that\'s too bad(それは残念)も、安く買えなかったという状況と合います。' }
    ]
  });

  /* ===== el_short 短い対話の聞き取り ===== */
  add('el_short', {
    sheet: {
      title: '短い対話のリスニング 1ページまとめ',
      blocks: [
        { h: '放送の前に', items: ['イラストや選択肢のちがいを見つけておく', 'ちがいの点(数・場所・物)を聞く準備をする', '設問の疑問詞(What・Where・Who)を確認'] },
        { h: '聞くときのポイント', items: ['最後の発言・最後の決定が答えになりやすい', 'Actually・Oh, wait・Instead など訂正の合図', '数は計算が必要なことがある(割引・人数の増減)'] },
        { h: '意図の読み取り', items: ['答えをはっきり言わない返事が多い', 'I\'d love to, but 〜 → 断り', 'Why don\'t we 〜? → 提案', 'I wish I could. → できない'] },
        { h: '言いかえ', items: ['放送の語と選択肢の語は別の表現になる', 'buy → purchase・get', 'not expensive → reasonable', 'on foot → walk'] },
        { h: '聞き取れなかったら', items: ['分かった語から場面を推測する', '1問にこだわらず次の問題の先読みへ', '2回目の放送で残りを確認する(2回読みの場合)'] }
      ],
      key: '短い対話は「最後の決定」と「条件の変化」が答え。選択肢は放送の言いかえで書かれる。'
    },
    cards: [
      ['短い対話で答えになりやすい部分', '最後の発言・最後の決定'],
      ['訂正の合図になる語句', 'Actually・Oh, wait・Instead・On second thought'],
      ['I\'d love to, but 〜 の意図', '断り'],
      ['Why don\'t we 〜? の意図', '提案(〜しませんか)'],
      ['I wish I could. の意図', '(できたらいいが)できない'],
      ['Sounds good. の意図', '賛成・了承'],
      ['I\'m afraid 〜 の意図', '残念なことを丁寧に伝える'],
      ['放送前にイラストで確認すること', '絵どうしのちがい(数・場所・物)'],
      ['buy の言いかえの例', 'purchase・get'],
      ['on foot の言いかえ', 'walk'],
      ['Let me check. の後に来やすいこと', '確認した結果の訂正・変更'],
      ['数の問題でよくある操作', '割引・増減などの計算'],
      ['Where 問題で聞くべきもの', '場所を表す名詞や場面に特有の語'],
      ['Could you 〜? の意図', '依頼'],
      ['聞き取れなかったときの対処', '分かった語から推測し、次の先読みに切りかえ']
    ],
    think: [
      { kind: '会話文', ctx: '放送文(英文を読んで考えます)\nW: Let\'s meet at the station at 9:30 on Saturday.\nM: Hmm, the bus to the lake leaves at 9:40. That\'s a little tight.\nW: You\'re right. How about 9:15, then?\nM: Actually, I have to take my sister to her piano lesson first. Can we take the next bus at 10:10 instead and meet 15 minutes later than your first idea?\nW: Sure, no problem.', q: '2人は何時に待ち合わせますか。', choices: ['①9:15', '②9:30', '③9:40', '④9:45'], a: '④(9:45)', exp: 'はじめの案は9:30、次に9:15が提案されますが、男性が Actually と事情を述べて「最初の案より15分遅く」と頼み、女性が了承しています。最初の案9:30の15分後なので9:45です。途中の9:15や、バスの時刻9:40にまどわされないようにします。次のバス(10:10)に乗ることにしたので、9:45で間に合います。' },
      { kind: '会話文', ctx: '放送文(英文を読んで考えます)\nM: Are you coming to the barbecue on Sunday?\nW: I\'d love to, but my grandparents are visiting us that day.\nM: That\'s too bad. Maybe next time, then.\nW: Definitely. Could you send me some photos?', q: '女性について正しいものを1つ選びなさい。', choices: ['①日曜日のバーベキューに参加する。', '②日曜日に祖父母の家を訪ねる。', '③バーベキューの写真を送ってほしいと頼んだ。', '④次のバーベキューには行かないつもりだ。'], a: '③(バーベキューの写真を送ってほしいと頼んだ。)', exp: 'I\'d love to, but 〜 は「行きたいけれど〜」という断りなので①は誤りです。my grandparents are visiting us は「祖父母が私たちの家に来る」なので②も誤り。Maybe next time に Definitely(ぜひ)と答えているので④も誤りです。Could you send me some photos? は依頼なので③が正解です。' }
    ]
  });

  /* ===== el_long 長い英語の聞き取り ===== */
  add('el_long', {
    sheet: {
      title: '長いリスニング 1ページまとめ',
      blocks: [
        { h: '構成で聞く', items: ['最初に話題(テーマ)が示される', '全体 → 具体 → まとめ の順が多い', '最初の1〜2文で「何の話か」をつかむ'] },
        { h: '談話標識', items: ['順序:First・Second・Finally', '逆接:However・But', '例:For example', '結論:In conclusion・To sum up', '強調:The most important point is 〜'] },
        { h: 'メモの取り方', items: ['単語・数字・記号(↑↓→)だけ書く', '文は書かない、日本語でも英語でもよい', 'ワークシートの空所に合わせて書く'] },
        { h: '先読みと予測', items: ['ワークシート・図表の項目を先に確認', '空所に入る品詞・数・単位を予測', 'グラフは「増減」「最大・最小」に注目'] },
        { h: '議論の聞き取り', items: ['人物ごとに賛成・反対をメモする', '途中で意見が変わる人に注意', 'I see your point, but 〜 は反対の合図', '最後にだれが何を主張したかを整理'] }
      ],
      key: '長い英語は「構成」と「談話標識」で聞く。先読みで探す情報を決め、メモは最小限。'
    },
    cards: [
      ['講義の最初の1〜2文で聞きとること', '話題(テーマ)'],
      ['順序を表す談話標識', 'First・Second・Next・Finally'],
      ['結論を表す談話標識', 'In conclusion・To sum up・Overall'],
      ['強調の合図', 'The most important point is 〜・Remember that 〜'],
      ['定義の合図', 'X is defined as 〜・X refers to 〜・By X, I mean 〜'],
      ['メモで使うと便利なもの', '数字・記号(↑↓→)・キーワード'],
      ['ワークシート問題で先にすること', '項目・空所の内容を先読みする'],
      ['グラフ問題で注目すること', '増減・最大・最小・順位'],
      ['increase の言いかえ', 'rise・go up・grow'],
      ['decrease の言いかえ', 'fall・drop・decline・go down'],
      ['I see your point, but 〜 の意図', '相手を認めつつ反対する'],
      ['議論の問題で整理すること', '人物ごとの賛成・反対と理由'],
      ['英語の説明の順序の特徴', '全体(結論)→ 具体'],
      ['double の意味', '2倍になる'],
      ['remain stable の意味', '安定している・変わらない']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】講義を聞きながら生徒がうめるワークシートと、講義の一部です。\nWorksheet: Food waste at home\n・Main cause: ( 1 )\n・Change from 2015 to 2025: ( 2 )\nLecture: Today, I\'ll talk about food waste at home. Many people think it happens because of cooking too much. Actually, the main cause is buying more than we need. The good news is that household food waste fell from about 10 kg to 8 kg per person a year between 2015 and 2025.', q: '( 1 )( 2 ) に入るものの組み合わせとして最も適切なものを1つ選びなさい。', choices: ['① 1: 作りすぎ 2: 約2kg 増加', '② 1: 必要以上に買うこと 2: 約2kg 減少', '③ 1: 作りすぎ 2: 約2kg 減少', '④ 1: 必要以上に買うこと 2: 約8kg 減少'], a: '②(1: 必要以上に買うこと 2: 約2kg 減少)', exp: 'Many people think 〜 は一般的な考えで、Actually の後ろが講師の説明です。主な原因は buying more than we need(必要以上に買うこと)です。fell from about 10 kg to 8 kg は「約10kgから8kgに減った」なので、変化は 10 − 8 = 約2kg の減少です。④は減少後の量(8kg)を変化の量と取りちがえています。' },
      { kind: '会話文', ctx: '4人の学生が「制服は必要か」について話し合っています。\nAnna: I think uniforms are good. We don\'t need to worry about what to wear.\nBen: I see your point, but they\'re expensive for families.\nChris: At first I agreed with Anna, but Ben is right. Students should be able to choose.\nDiana: Well, uniforms make students feel part of the school. I support them.', q: '最終的に制服に賛成している人をすべて選んだものとして最も適切なものを1つ選びなさい。', choices: ['①Anna だけ', '②Anna と Diana', '③Anna と Chris と Diana', '④Ben と Chris'], a: '②(Anna と Diana)', exp: 'Anna は uniforms are good で賛成です。Ben は I see your point, but 〜 と認めつつ費用を理由に反対しています。Chris は At first I agreed with Anna(最初は賛成)ですが、Ben is right と意見を変え、生徒が選ぶべきだと反対側に回りました。Diana は I support them で賛成です。途中で意見が変わる人物に注意すると②になります。' }
    ]
  });

  /* ===== el_strategy リスニングの戦略 ===== */
  add('el_strategy', {
    sheet: {
      title: 'リスニング戦略 1ページまとめ',
      blocks: [
        { h: '試験の流れ', items: ['共通テストは2回読みと1回読みの問題がある', '後半は1回読みが中心で、長さも増える', '放送の合間の時間を先読みに使う'] },
        { h: '先読み', items: ['設問の疑問詞と主語を確認', '選択肢のちがい(数・人物・場所)に印をつける', '図表は項目と単位を確認'] },
        { h: '2回読み・1回読み', items: ['2回読み:1回目で大筋、2回目で確認', '1回読み:聞いたその場で判断し、即決する', '迷ったら仮の答えを選び、次の先読みへ'] },
        { h: 'ひっかけの見分け方', items: ['放送と同じ語を使った選択肢は要注意', '一部だけ合っていて一部がちがう選択肢', '話の途中で変わった条件(変更・訂正)', '正解は言いかえで書かれることが多い'] },
        { h: '練習計画', items: ['毎日少しでも英語を聞く', 'スクリプトを見て聞けなかった原因を確認', 'シャドーイング・音読で音と意味を結びつける', '本番形式の時間配分で演習する'] }
      ],
      key: '先読みで「何を聞くか」を決め、1回読みは即決。同じ語の選択肢より、言いかえの選択肢を疑わずに選ぶ。'
    },
    cards: [
      ['先読みで確認すること', '設問の疑問詞・主語・選択肢のちがい'],
      ['2回読みの1回目の役割', '大筋をつかむ'],
      ['2回読みの2回目の役割', '細部の確認'],
      ['1回読みで大切な姿勢', 'その場で判断して即決する'],
      ['迷ったときの対処', '仮の答えを選んで次の先読みに切りかえる'],
      ['放送と同じ語を使った選択肢', 'ひっかけのことが多い'],
      ['正解の選択肢の特徴', '放送の内容の言いかえ'],
      ['変更を表す合図の語', 'Actually・Instead・However・changed'],
      ['シャドーイングとは?', '音声を聞きながら少し遅れてまねして言う練習'],
      ['ディクテーションとは?', '聞いた英語を書き取る練習'],
      ['スクリプトを使った復習の目的', '聞けなかった原因(音・語彙・文法)を知る'],
      ['返り読みしない聞き方とは?', '英語の語順のまま意味をとる聞き方'],
      ['postpone の言いかえ', 'put off・delay'],
      ['案内放送で特に注意する情報', '変更・時刻・場所'],
      ['図表問題の先読みで見ること', '項目・単位・増減']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】駅の案内放送(英文を読んで考えます)\nAttention, please. The 10:20 express train to Kita City will leave from Platform 3, not Platform 5 as announced earlier. Due to heavy rain, the train will depart about fifteen minutes behind schedule. Passengers going to the airport should change trains at Minami Station.', q: '放送の内容と合うものを1つ選びなさい。', choices: ['①急行列車は5番線から出発する。', '②急行列車は10時35分ごろに出発する予定である。', '③急行列車は大雨のため運休になった。', '④空港へ行く人は北市駅で乗りかえる。'], a: '②(急行列車は10時35分ごろに出発する予定である。)', exp: 'Platform 3, not Platform 5 as announced earlier は「先ほどの案内の5番線ではなく3番線」という変更なので①は誤りです。about fifteen minutes behind schedule は「予定より約15分遅れて」なので、10:20 + 15分 = 10:35ごろの出発で②が正解。運休ではないので③は誤り、乗りかえは Minami Station なので④も誤りです。①は放送と同じ語(Platform 5)を使ったひっかけです。' },
      { kind: '会話文', ctx: '先生と生徒がリスニングの勉強法について話しています。\nStudent: I listen to English news every day, but my score doesn\'t go up.\nTeacher: Do you check the script after listening?\nStudent: No, I just listen.\nTeacher: That\'s the problem. You need to find out why you couldn\'t catch some parts. Was it the sound, the words, or the grammar?\nStudent: I see. Then I should also practice repeating after the audio.', q: '先生がすすめている勉強法の要点として最も適切なものを1つ選びなさい。', choices: ['①聞く量をさらに増やすことだけが大切である。', '②聞いた後にスクリプトを確認し、聞き取れなかった原因を分析する。', '③文法の勉強はリスニングには関係がない。', '④ニュースではなく音楽を聞くほうがよい。'], a: '②(聞いた後にスクリプトを確認し、聞き取れなかった原因を分析する。)', exp: '先生は Do you check the script after listening? と尋ね、That\'s the problem. と、聞きっぱなしにしていることが問題だと指摘しています。さらに、聞けなかった原因を「音・語彙・文法」のどれかを確かめるよう助言しているので②が正解です。①は先生の指摘と逆、③は grammar も原因の候補に挙げているので誤り、④は話題になっていません。' }
    ]
  });

  /* ===== ek_eiken 英検・CEFR ===== */
  add('ek_eiken', {
    sheet: {
      title: '英検・CEFR 1ページまとめ',
      blocks: [
        { h: '英検の級', items: ['5級・4級・3級・準2級・2級・準1級・1級', '高校卒業程度の目安は2級', '大学中級程度の目安は準1級'] },
        { h: '試験のしくみ', items: ['一次試験:筆記(読む・書く)とリスニング', '二次試験:面接(3級以上)', '結果は技能ごとの CSE スコアでも示される', '合否だけでなく、スコアで力の位置が分かる'] },
        { h: 'CEFR', items: ['ヨーロッパで作られた外国語の力の共通の基準', 'A1・A2・B1・B2・C1・C2 の6段階', '「〜ができる」という能力記述で示される'] },
        { h: '英検と CEFR の目安', items: ['3級:A1/準2級:A2', '2級:B1/準1級:B2', '1級:C1', '同じ級でもスコアによって CEFR が変わることがある'] },
        { h: '大学入試での活用', items: ['出願資格・得点換算・加点などの方式がある', '必要な級・スコア・有効期限は大学ごとにちがう', '必ず最新の募集要項で確認する'] }
      ],
      key: '英検は級とCSEスコア、CEFRはA1〜C2の6段階。入試での使い方は大学ごとにちがうので要項で確認する。'
    },
    cards: [
      ['英検の級(下から順に)', '5級・4級・3級・準2級・2級・準1級・1級'],
      ['高校卒業程度の目安の級', '2級'],
      ['英検の一次試験の内容', '筆記(読む・書く)とリスニング'],
      ['英検の二次試験の内容', '面接(スピーキング)'],
      ['二次試験があるのは何級から?', '3級以上'],
      ['CSE スコアとは?', '英検の技能ごとの成績を示す共通の尺度のスコア'],
      ['CEFR とは?', 'ヨーロッパで作られた外国語能力の共通基準'],
      ['CEFR の段階の数', '6段階(A1〜C2)'],
      ['CEFR の最も上の段階', 'C2'],
      ['英検2級の CEFR の目安', 'B1'],
      ['英検準1級の CEFR の目安', 'B2'],
      ['英検1級の CEFR の目安', 'C1'],
      ['大学入試での主な活用方法', '出願資格・得点換算・加点'],
      ['外部試験利用で必ず確認すること', '必要な級・スコア・有効期限(要項で)'],
      ['CEFR の能力の示し方', '「〜ができる」という能力記述']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】ある大学の入試要項の一部です。\n英語外部試験の利用について\n・英検 CSE スコア 2300以上:英語の試験を満点(100点)とみなす。\n・英検 CSE スコア 2000以上2300未満:英語の試験を80点とみなす。\n・ただし、英語の試験を受けた場合は、みなし得点と実際の得点のうち高いほうを採用する。\n・出願の2年前の4月1日以降に受けた試験のみ有効とする。', q: 'CSE スコア2150の受験生が、当日の英語の試験で85点をとった場合、英語の得点は何点として扱われますか。', choices: ['①80点', '②85点', '③100点', '④165点'], a: '②(85点)', exp: 'CSE スコア2150は「2000以上2300未満」に当たるので、みなし得点は80点です。ただし書きにより、英語の試験を受けた場合は「みなし得点と実際の得点のうち高いほう」を採用します。80点と85点では85点のほうが高いので、②が正解です。④のように2つを足すことはありません。要項では「ただし」以下の条件を見落とさないことが大切です。' },
      { kind: '会話文', ctx: '進路相談での会話です。\nStudent: 私は英検2級に合格しました。CEFR でいうと B1 ですよね。\nTeacher: 目安としてはそうですね。ただ、志望大学の条件は「CEFR B2 相当以上」です。\nStudent: それなら、もっと上の級をめざす必要があるんですね。\nTeacher: そうです。それに、資格には有効期限が決められていることが多いので、受ける時期にも気をつけましょう。', q: '会話の内容から考えて、この生徒がまずめざすべき目標として最も適切なものを1つ選びなさい。', choices: ['①英検3級に合格し直す。', '②英検準1級の合格(B2 相当)をめざし、出願に間に合う時期に受ける。', '③英検2級をもう一度受けて、同じ級でより早く合格する。', '④有効期限は気にせず、できるだけ早い時期に1級を受ける。'], a: '②(英検準1級の合格(B2 相当)をめざし、出願に間に合う時期に受ける。)', exp: '英検2級は CEFR B1 が目安で、志望大学の条件 B2 には届きません。B2 の目安は準1級なので、準1級をめざすのが適切です。また先生は有効期限に注意するよう言っているので、出願に有効な時期に受ける必要があります。③は同じ級では条件を満たせず、④は有効期限への注意を無視しています。' }
    ]
  });

  /* ===== ek_writing 英作文 ===== */
  add('ek_writing', {
    sheet: {
      title: '英作文 1ページまとめ',
      blocks: [
        { h: '採点の観点', items: ['内容:問いに答え、理由が適切か', '構成:流れが論理的か', '語彙:場面に合った語を使えているか', '文法:正しい文法で書けているか'] },
        { h: '意見論述の型', items: ['I(Introduction):自分の立場をはっきり書く', 'B(Body):理由を2つ、それぞれ具体例で支える', 'C(Conclusion):立場をくり返してまとめる'] },
        { h: '使える表現', items: ['立場:I agree / disagree with the idea that 〜', '理由:First, 〜. Second, 〜.', '例:For example, 〜', 'まとめ:For these reasons, 〜'] },
        { h: '要約問題', items: ['段落ごとの要点を1文にまとめる', '具体例・数字は省いて一般化する', '本文の語句をそのまま写さず言いかえる', '自分の意見は入れない'] },
        { h: '見直しの点', items: ['主語と動詞の一致・三単現の s', '時制のずれ・冠詞・単複', '語数の条件を守っているか', '言いすぎ(all・always)を避け、often・many を使う'] }
      ],
      key: '意見論述は「立場 → 理由2つ + 具体例 → まとめ」。要約は自分の意見を入れずに言いかえる。'
    },
    cards: [
      ['英作文の採点の4観点', '内容・構成・語彙・文法'],
      ['意見論述の型', 'Introduction → Body → Conclusion'],
      ['Introduction で書くこと', '自分の立場(賛成・反対)'],
      ['Body で書くこと', '理由と具体例'],
      ['Conclusion で書くこと', '立場のくり返しとまとめ'],
      ['理由を並べる表現', 'First, 〜. Second, 〜.'],
      ['まとめの表現', 'For these reasons, 〜 / In conclusion, 〜'],
      ['要約で省くもの', '具体例・細かい数字'],
      ['要約で入れてはいけないもの', '自分の意見'],
      ['要約で語句をどう扱う?', '本文の語句を言いかえる(写さない)'],
      ['言いすぎを避ける語', 'often・many・tend to・may'],
      ['「〜とは限らない」の英語', 'not always / not necessarily'],
      ['「〜するようになった」の英語', 'come to 〜 / begin to 〜'],
      ['見直しで確認する文法', '主語と動詞の一致・時制・冠詞・単複'],
      ['一貫性とは?', '最初から最後まで同じ立場で書くこと']
    ],
    think: [
      { kind: '資料読解', ctx: '【架空の資料】「高校生はアルバイトをするべきか」という問いに、生徒が書いた英作文です。\nI agree that high school students should have part-time jobs. First, they can learn how to work with other people. For example, at a restaurant, they must cooperate with staff members of different ages. Second, students who work always get bad grades because they have less time to study. For these reasons, I think part-time jobs are good for students.', q: 'この英作文の問題点として最も適切なものを1つ選びなさい。', choices: ['①最初に自分の立場を示していない。', '②2つ目の理由が自分の立場と矛盾し、しかも always で言いすぎている。', '③具体例が1つもない。', '④まとめの文がない。'], a: '②(2つ目の理由が自分の立場と矛盾し、しかも always で言いすぎている。)', exp: '書き手は I agree と賛成の立場を示していますが、2つ目の理由「働く生徒はいつも成績が悪い」はアルバイトの欠点で、賛成の理由になっていません(一貫性の欠如)。また always は言いすぎで、根拠もありません。立場(I agree)、具体例(For example, at a restaurant)、まとめ(For these reasons)はそろっているので①③④は誤りです。' },
      { kind: '探究', ctx: '和文英訳の練習です。\n日本文:「インターネットの情報が正しいとは限らない。」\n生徒A:Information on the Internet is not correct.\n生徒B:Information on the Internet is not always correct.\n生徒C:All information on the Internet is not correct at all.\n生徒D:Information on the Internet is never correct.', q: '日本文の意味を最も正しく表している生徒の英文を1つ選びなさい。', choices: ['①生徒A', '②生徒B', '③生徒C', '④生徒D'], a: '②(生徒B)', exp: '「〜とは限らない」は「正しいこともあるが、いつも正しいわけではない」という部分否定で、not always で表します。生徒Aは「正しくない」と全面的に否定し、生徒Dの never も「決して正しくない」という全否定です。生徒Cは not … at all で「まったく正しくない」という強い全否定になります。日本文の意味を正しく表すのは生徒Bです。' }
    ]
  });

  /* ===== ek_speaking スピーキング・面接 ===== */
  add('ek_speaking', {
    sheet: {
      title: 'スピーキング・面接 1ページまとめ',
      blocks: [
        { h: '評価されること', items: ['質問に合った内容を答えているか', '発音・声の大きさ・速さ', 'アティチュード(積極的に伝えようとする態度)', '文法・語彙の正確さ'] },
        { h: '音読のコツ', items: ['意味のまとまり(句・節)で区切って読む', '内容語は強く、機能語は弱く', 'タイトルや固有名詞をはっきり読む'] },
        { h: '答え方の型', items: ['結論 → 理由 → 具体例の順で答える', 'Yes / No の後に必ず理由をつける', '質問の主語・時制に合わせて答える', 'イラスト説明は人物ごとに現在進行形で'] },
        { h: '聞き返し・つなぎ', items: ['Could you say that again, please?', 'Pardon?(短く聞き返す)', 'Let me see. / Well, …(考える時間をつくる)', '黙りこまず、簡単な英語で言いかえる'] },
        { h: '話を広げる', items: ['Why not? には反対の理由を述べる', '抽象的な質問は身近な例に引き寄せる', 'For example, in my school, … と具体化', 'Also, … で理由を追加'] }
      ],
      key: '面接は「結論 → 理由 → 例」で答え、分からなければ聞き返す。黙りこむのがいちばんの減点。'
    },
    cards: [
      ['面接の答え方の基本の順序', '結論 → 理由 → 具体例'],
      ['アティチュードとは?', '積極的にコミュニケーションをとろうとする態度'],
      ['音読で区切る単位', '意味のまとまり(句・節)'],
      ['音読で強く読む語', '内容語(名詞・動詞・形容詞など)'],
      ['ていねいに聞き返す表現', 'Could you say that again, please?'],
      ['短く聞き返す表現', 'Pardon?'],
      ['考える時間をつくる表現', 'Let me see. / Well, …'],
      ['イラスト説明で使う時制', '現在進行形(A man is ~ing)'],
      ['Yes / No で答えた後にすること', '理由をつけ加える'],
      ['Why not? と聞かれたら?', 'No と答えた理由を述べる'],
      ['抽象的な質問への対処', '身近な具体例に引き寄せて答える'],
      ['理由を追加する表現', 'Also, 〜 / In addition, 〜'],
      ['意見を述べる表現', 'I think 〜 because …'],
      ['面接でいちばん避けるべきこと', '黙りこんでしまうこと'],
      ['スピーキング力を伸ばす練習', '音読・シャドーイング・独り言で英語にする']
    ],
    think: [
      { kind: '会話文', ctx: '英語の面接の練習です。\nExaminer: Do you think more people will use bicycles in the future?\nStudent A: Yes.\nStudent B: Yes. I think so because bicycles are good for the environment. For example, they don\'t produce CO2. Also, many cities are making more bike lanes.\nStudent C: Bicycles are... um... (黙りこむ)\nStudent D: Yes. I like bicycles. My bicycle is red.', q: '面接の答え方として最も評価が高いと考えられるのはだれですか。', choices: ['①Student A', '②Student B', '③Student C', '④Student D'], a: '②(Student B)', exp: 'Student B は Yes と結論を言い、because で理由、For example で具体例、Also で理由の追加をしており、「結論 → 理由 → 例」の型になっています。Student A は理由がなく、Student C は黙りこんでいます。Student D は自転車について話していますが、「将来使う人が増えるか」という質問への理由になっていません。質問に合った内容かどうかが大切です。' },
      { kind: '会話文', ctx: '面接の続きです。\nExaminer: Do you think students should study abroad?\nStudent: No.\nExaminer: Why not?\nStudent: ( ).', q: '( ) に入る答えとして最も適切なものを1つ選びなさい。', choices: ['①Yes, because studying abroad is a great experience', '②Studying abroad costs a lot of money, so not all families can afford it. Students can also learn a lot in their own country', '③I don\'t know', '④Because I went to Canada last summer and enjoyed it'], a: '②(Studying abroad costs a lot of money, so not all families can afford it. Students can also learn a lot in their own country)', exp: 'Why not? は「なぜそう思わないのですか」と、No と答えた理由を尋ねています。②は費用という理由と、国内でも学べるという追加の理由を述べており、No の立場と一致しています。①は Yes と立場が変わっていて一貫性がなく、③は答えになっていません。④は留学を楽しんだという話で、No の理由と矛盾します。' }
    ]
  });
})(WPS.LESSONS);
