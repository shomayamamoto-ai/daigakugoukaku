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
