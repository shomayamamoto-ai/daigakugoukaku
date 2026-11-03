/* テキストの「さらに深く」拡充(担当:高校英語) */
(function (L) {
  function add(id, o) {
    var x = L[id]; if (!x) return;
    ['secs', 'drill', 'faq'].forEach(function (k) { if (o[k]) x[k] = (x[k] || []).concat(o[k]); });
  }

  /* ===== e_h1 文型 ===== */
  add('e_h1', {
    secs: [
      {
        h: 'さらに深く:C になれる形の広がりと、SVOO をとれない動詞',
        t: '第5文型の C には、形容詞・名詞のほかに、【原形不定詞・分詞・to 不定詞】も来ます。どの場合も、O と C の間に「主語と述語」の関係がかくれている点は同じです。\n例:I saw a boy cross the street.(少年が通りを渡るのを見た)→ a boy crossed the street の関係。\n例:I heard my name called.(自分の名前が呼ばれるのが聞こえた)→ my name was called の関係。\n例:The teacher kept us waiting.(先生は私たちを待たせた)→ we were waiting の関係。\n例:My parents allowed me to study abroad.(両親は私が留学するのを許してくれた)→ I study abroad の関係。\nつまり、O の後ろの形は【O と C の関係】で決まります。O が動作を「する」側なら原形・〜ing・to 不定詞、「される」側なら過去分詞です。この考え方は、知覚動詞・使役動詞・分詞の単元でもそのまま使えます。\n次に、日本語では「(人)に〜を説明する」と言えるのに、英語では SVOO にできない動詞があります。【explain・suggest・introduce・describe・announce】などです。\n× He explained me the rule. → ○ He explained the rule to me.(彼は私にその規則を説明してくれた)\n○ Let me introduce my friend to you.(あなたに友人を紹介させてください)\nこれらの動詞は「〜を説明する・紹介する」という SVO の型しかもたないので、相手は to 〜 で表すしかありません。文型は日本語の訳で決まるのではなく、【動詞ごとの型】で決まる、というよい例です。',
        key: 'SVOC の C は形容詞・名詞だけでなく、原形・分詞・to 不定詞にもなり、どれも O と「主語・述語」の関係にある。explain・suggest などは SVOO の型をもたない。',
        ex: [{
          q: '次の文の誤りを直し、理由を説明しよう。\nShe suggested me a good restaurant.',
          hint: 'suggest が、どんな型をとる動詞かを考えよう。',
          steps: [
            'まず動詞 suggest に注目します。「〜を提案する・勧める」という意味で、give のような SVOO の型をもたない動詞です。',
            'そのため、me と a good restaurant の2つの O を並べることはできません。',
            '相手は「to + 人」で表し、She suggested a good restaurant to me. とします。',
            '和訳は「彼女は私によいレストランを勧めてくれた」です。'
          ],
          a: 'She suggested a good restaurant to me.(彼女は私によいレストランを勧めてくれた)',
          check: '「日本語で『〜に…を』と言えるから SVOO」とは限りません。新しい動詞に出会ったら、SVOO の型をもつかどうかを辞書の例文で確かめるくせをつけましょう。'
        }]
      },
      {
        h: '実戦演習:形式目的語と、多くの型をもつ動詞',
        t: '入試の和訳では、M が多く、O と C が離れた文がよく出ます。戦略は、①述語動詞を見つける、②その動詞がとれる型(SVO・SVOO・SVOC など)を思い出す、③後ろの語句がどの型にはまるかを、be動詞を入れて「O=C」が成り立つかで試す、の順です。\n落とし穴は、【O が長いので後ろに回り、代わりに it が置かれる】形です。make it possible for 〜 to …、find it difficult to … のように、make・find・think・consider の後ろの it は【形式目的語】のことがよくあります。it を見たら、後ろの to 不定詞や that 節が本当の O ではないかを疑いましょう。\nもう1つの落とし穴は、leave・make・get のように、SVO・SVOO・SVOC のどれもとれる動詞です。後ろの2つの語句が「=」になるかどうかで型を決めます。',
        key: 'find・make・think などの後ろの it は形式目的語のことが多い。多くの型をもつ動詞は、後ろの2つの語句が「=」になるかで型を決める。',
        ex: [
          {
            q: '文型を答え、和訳しよう。\nThe Internet has made it easy for people in different countries to share information.',
            hint: 'made の後ろの it は、何の代わりに置かれている?',
            steps: [
              '述語動詞は has made です。make は SVOC の型(O を C にする)をとれる動詞です。',
              'made の後ろに it、その後ろに形容詞 easy が来ています。「it が easy だ」という O=C の関係が見えます。',
              'ただし it だけでは、何がやさしいのか分かりません。後ろの to share information が本当の O で、it はその代わりに置かれた【形式目的語】です。',
              'for people in different countries は、to share の意味上の主語(だれが共有するのか)です。',
              '骨組みは「インターネットは、ちがう国の人々が情報を共有することを、やさしくした」です。無生物主語なので、自然な日本語に直します。'
            ],
            a: '第5文型(SVOC)。O=it(本当の O は to share information)、C=easy。\n和訳:インターネットのおかげで、ちがう国の人々が情報を共有しやすくなった。',
            check: '直訳「インターネットは…をやさしくした」を、「インターネットのおかげで〜しやすくなった」と言いかえると自然です。O が長いとき、make O easy の O の位置に it を置く、と覚えておきましょう。'
          },
          {
            q: '次の2文の文型を答え、意味のちがいを説明しよう。\n(1) She left her son a large house.\n(2) She left her son alone.',
            hint: 'her son の後ろの語句と her son が「=」になるかを試そう。',
            steps: [
              'どちらも動詞は left(leave の過去形)です。leave は、SVO・SVOO・SVOC のどれもとれる動詞です。',
              '(1) her son と a large house は、「息子=家」にはなりません。O が2つ並んだ SVOO で、「(人)に(物)を残す」という意味です。',
              '(2) her son と alone は、「息子が一人だ(her son was alone)」という関係になります。O=C の SVOC で、「O を C のままにしておく」という意味です。',
              'したがって、(1) は財産などを息子に残した、(2) は息子を一人にしておいた(かまわずにおいた)、という意味になります。'
            ],
            a: '(1) SVOO:彼女は息子に大きな家を残した。\n(2) SVOC:彼女は息子を一人にしておいた(ほうっておいた)。',
            check: 'be動詞を入れて「her son is a large house」は成り立たないので (1) は SVOO、「her son is alone」は成り立つので (2) は SVOC、と確かめられます。Leave me alone.(ほうっておいて)も同じ SVOC です。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '次の文の文型を答え、和訳しよう。\nI heard someone calling my name.', a: '第5文型(SVOC)。だれかが私の名前を呼んでいるのが聞こえた。', exp: 'hear は「O が〜するのを聞く」という SVOC の型をとる知覚動詞です。O=someone、C=calling my name で、「someone was calling my name」という関係がかくれています。O が動作を「している」側で、その最中を聞いたので、現在分詞 calling になります。原形を使って heard someone call my name とすると、「呼ぶのを(ひととおり)聞いた」という感じになります。また、my name を O にして I heard my name called. とすれば、名前は「呼ばれる」側なので過去分詞です。どの形でも、O と C の関係から形が決まります。' },
      { lv: 3, q: '次の文の誤りを直そう。\nCould you explain me how to use this machine?', a: 'Could you explain to me how to use this machine?', exp: 'explain は「〜を説明する」という SVO の型だけをもつ動詞で、give のように「人 + 物」を並べる SVOO にはできません。相手は to me で表します。ふつうは explain + 物 + to + 人(explain the rule to me)の順ですが、この文のように、説明する内容(how to use this machine)が長いときは、to me を先に置き、長いものを文末に回すのが自然です。suggest・introduce・describe・announce も同じ型の動詞なので、まとめて覚えておきましょう。' },
      { lv: 3, q: '次の2文の angry が、それぞれだれのようすを表しているかに注意して和訳しよう。\n(1) She made him angry.\n(2) She left the room angry.', a: '(1) 彼女は彼を怒らせた。\n(2) 彼女は怒って部屋を出ていった。', exp: '(1) は SVOC で、him=angry(彼が怒っている)という関係です。make が「O を C にする」の意味になります。(2) は、the room=angry(部屋が怒っている)では意味が通りません。angry が説明しているのは主語の she で、「彼女は怒った状態で部屋を出た」という意味です。文型としては、SVO(left the room)に、主語のようすを補う形容詞がついた形と考えます。このように、形容詞が O ではなく S を説明していることもあるので、「だれが angry なのか」を必ず確かめましょう。leave には「〜を去る」(SVO)と「O を C のままにしておく」(SVOC)の両方の意味がある点にも注意です。' }
    ],
    faq: [
      ['SVOO を SVO に書きかえるとき、物が代名詞なら語順はどうなるの?', '物が it・them などの代名詞のときは、He gave it to me. のように「物 + to(for)+ 人」の形にするのがふつうです。He gave me it. のような形は、英作文では避けるのが安全です。英語には、すでに話に出た情報(代名詞)を前に、新しい情報を後ろに置く傾向があるので、代名詞の it を先に出し、to me を後ろに置く形が自然になるのです。'],
      ['文型は、本当に5つしかないの?', '5文型は、日本の学校文法で広く使われている整理のしかたで、英語のすべての文をきれいに分けられるわけではありません。たとえば、He lives in Tokyo. や She put the book on the desk. の場所の語句は、なくすと文が成り立ちません。こうした「欠かせない副詞的な語句」を A と呼び、SVA・SVOA を加えた7つの型で整理する考え方もあります。入試では5文型で十分ですが、「場所の語句が欠かせない動詞もある」と知っておくと、put や live の使い方でまちがえにくくなります。']
    ]
  });

  /* ===== e_pastperf 過去完了 ===== */
  add('e_pastperf', {
    secs: [
      {
        h: 'さらに深く:物語の中の過去完了 ― 回想の「入口」と「出口」',
        t: '小説やエッセイでは、過去の出来事を語っている途中で、それより前の出来事を思い出す場面(回想)がよく出てきます。このとき過去完了は、【回想の場面に入る入口】の役割を果たします。\n例文:Mika stood in front of the old school. She had studied there for six years. She had often played in the yard with her friends, and her teacher had once praised her drawing in front of the whole class. She smiled and walked in.\n(和訳:ミカは古い学校の前に立った。彼女はそこで6年間学んだのだった。友だちとよく校庭で遊んだし、先生がクラス全員の前で彼女の絵をほめてくれたこともあった。彼女はほほえんで、中に入っていった。)\n1文目の stood が「今の場面」の基準です。2・3文目は過去完了なので、基準より前の思い出だと分かります。最後の smiled と walked は過去形に戻っているので、【回想が終わり、今の場面に戻った】と読めます。\n長い回想では、最初の1〜2文だけを過去完了にして、その後は過去形で語ることもよくあります。毎回 had をつけると文が重くなるからです。そのときは、years before・when she was a child などの時の表現や、今の場面の動作が再び出てくるところが目印になります。\n読解では、【過去完了が出たら「ここから基準より前の話」】、【今の場面の動作が過去形で出たら「回想の終わり」】と、時間の線を引きながら読むと、出来事の順番をまちがえません。',
        key: '物語文の過去完了は、回想に入る合図。今の場面の動作が過去形で出てきたところが回想の終わりで、出来事の順番はこの「入口と出口」で決まる。',
        ex: [{
          q: '次の英文を読み、①〜③の出来事を起きた順に並べよう。\nWhen Ken opened the box, he found the watch. His grandfather had bought it in London many years before, and had given it to Ken\'s father on his twentieth birthday.\n(和訳:ケンが箱を開けると、その腕時計が見つかった。祖父が何年も前にロンドンで買い、ケンの父の20歳の誕生日に贈ったものだった。)\n① ケンが箱を開けた ② 祖父がロンドンで時計を買った ③ 祖父がケンの父に時計を贈った',
          hint: '過去形の動詞と、過去完了の動詞を分けて見よう。',
          steps: [
            'まず過去形の動詞を探します。opened と found で、これが物語の「今の場面」(基準)です。',
            '次に、過去完了の had bought と had given を見ます。どちらも基準より前の出来事です。',
            '過去完了どうしの順番は、形からは決まりません。内容から考えると、買ってからでないと贈れないので、買ったのが先です。',
            'したがって、② → ③ → ① の順になります。'
          ],
          a: '② → ③ → ①',
          check: '書かれた順(①→②→③)と、起きた順がちがう点が大切です。過去完了が2つ続くときは「どちらも基準より前」というだけなので、その2つの前後は内容(論理)で決めます。'
        }]
      },
      {
        h: '実戦演習:「〜しないうちに」と時間の線',
        t: '入試では、過去完了を「過去の過去」と訳せるかだけでなく、【慣用的な形】や、【複数の動詞の時制を決める問題】として出題されます。\nよく出るのが、【S had not 過去分詞 … before S 過去形】で「…しないうちに〜した」という形です。had not の部分が先、before の節が後の出来事です。直訳の「〜する前に、…していなかった」から、自然な日本語に直す力が問われます。\n戦略は、①基準になる過去の場面を決める、②それぞれの動詞が基準より前か、同時か、後かを時間の線の上に置く、③前なら had + 過去分詞、続いていたなら had been 〜ing、起きた順に書いているなら過去形、と決める、の3段階です。落とし穴は、過去の動詞を全部過去完了にしてしまうことです。',
        key: 'had not 過去分詞 … before 〜 は「…しないうちに〜した」。複数の動詞があるときは、時間の線に1つずつ置いてから時制を決める。',
        ex: [
          {
            q: '和訳しよう。\nWe had not walked ten minutes before it began to rain.',
            hint: 'had not walked と began のどちらが先か考えよう。',
            steps: [
              '過去形の began が基準で、過去完了の had not walked は、それより前の状態を表します。',
              '直訳すると、「雨が降り始める前に、私たちは10分も歩いていなかった」となります。',
              'つまり、「歩き始めて10分たたないうちに、雨が降り始めた」ということです。',
              'not … before 〜 を「…しないうちに〜」と訳すと、自然な日本語になります。'
            ],
            a: '私たちが10分も歩かないうちに、雨が降り出した。',
            check: '同じ内容は、It began to rain before we had walked ten minutes. とも書けます。「10分歩く前に雨が降り始めた」と考えて、意味が同じになることを確かめましょう。'
          },
          {
            q: '( ) 内の動詞を正しい形にしよう。\nThe girl was crying because she ( lose ) her way. A police officer ( take ) her to her parents, who ( look ) for her for an hour.',
            hint: '基準は was crying の場面。それぞれの動詞を時間の線に置いてみよう。',
            steps: [
              '基準は、was crying(泣いていた)という過去の場面です。',
              '道に迷ったのは泣いていた理由で、それより前なので had lost にします。',
              '警察官が両親のところへ連れていったのは、話の流れの中で次に起きた出来事です。起きた順に書いているので、過去形 took で十分です。',
              '両親は、その時点まで1時間ずっと探し続けていたので、過去完了進行形 had been looking にします。',
              'for an hour という期間の語が、継続の目印になります。'
            ],
            a: 'had lost / took / had been looking',
            check: '出来事の順は、「道に迷う → 泣く(両親は探し続ける)→ 警察官が連れていく」です。時間の線を書いて、それぞれの動詞を置いてみると確かめられます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) 内の動詞を正しい形にしよう。\nIt was the first time that I ( see ) a koala.', a: 'had seen', exp: '「それは、私がコアラを見た初めてのときだった」と、過去の時点(It was)を基準にして、それまでの経験を表すので、過去完了 had seen にします。今を基準にするなら、This is the first time (that) I have seen a koala.(コアラを見るのはこれが初めてだ)と現在完了になります。日本語では「初めて見た」と過去形で言うので、saw を選びやすいのが落とし穴です。the first time の後ろは「それまでに経験したか」を表す完了形、と覚えておきましょう。' },
      { lv: 3, q: '次の2文の意味のちがいを説明しよう。\n(1) When I got home, my mother had cooked dinner.\n(2) When I got home, my mother cooked dinner.', a: '(1) 私が帰宅したときには、母はもう夕食を作り終えていた。\n(2) 私が帰宅すると、母は夕食を作った。', exp: '(1) は過去完了なので、夕食を作ったのは帰宅より前です。家に着いたら、夕食がもうできていたという場面です。(2) は過去形どうしなので、帰宅の後に母が夕食を作った、という順番に読まれます。過去形が2つ並ぶと、ふつうは「書かれた順に起きた」と受け取られるからです。たった1語の had で出来事の順番が入れかわる、という点が大切です。when を「〜したとき」と訳すだけで終わらせず、どちらが先かを時間の線で確かめましょう。' },
      { lv: 3, q: '次の文の誤りを直し、理由を説明しよう。\nShe told me that she had met him three years ago.', a: 'ago → before(earlier も可)', exp: 'ago は「今から〜前」という意味で、基準が【今】の語です。そのため、過去の時点(she told me)を基準にした過去完了とは合いません。過去のある時点から見て「その〜前」と言うときは before を使い、three years before(その3年前)とします。直接話法 She said to me, "I met him three years ago." を間接話法にするときも、ago → before、yesterday → the day before、tomorrow → the next day のように、今を基準にした語を書きかえます。' }
    ],
    faq: [
      ['過去完了の受動態は、どんな形になるの?', '【had been + 過去分詞】です。had の後ろに完了の been、その後ろに受動の過去分詞を置きます。例:When we arrived, the bridge had been destroyed by the storm.(私たちが着いたとき、橋はあらしで壊されていた)。過去完了進行形 had been 〜ing と形が似ているので、been の後ろが 〜ing(〜し続けていた)か、過去分詞(〜されていた)かで見分けましょう。'],
      ['過去完了は、会話ではあまり使わないの?', '会話でも使います。とくに、「(行ってみたら)もう〜だった」と状況を説明するときによく出てきます。例:When I got to the shop, it had already closed.(店に着いたら、もう閉まっていた)。ただし、before や after で順番がはっきりしているときは、会話では過去形だけで済ませることも多くあります。読解では「順番の目印」として読み、英作文では「順番を誤解されそうなときに使う」と考えるとよいでしょう。']
    ]
  });

  /* ===== e_futperf 未来完了 ===== */
  add('e_futperf', {
    secs: [
      {
        h: 'さらに深く:未来の一点を「進行中」で見るか「完了済み」で見るか',
        t: '未来の表し方には、will + 原形のほかに、【未来進行形 will be 〜ing】と【未来完了 will have + 過去分詞】があります。どちらも「未来のある時点」を基準にしますが、その時点で動作がどの段階にあるかがちがいます。\n例:This time tomorrow, I will be flying to London.(明日の今ごろは、ロンドンに向けて飛んでいるだろう)→ 基準の時点で、動作は【進行中】です。\n例:By this time tomorrow, I will have arrived in London.(明日の今ごろまでには、ロンドンに着いているだろう)→ 基準の時点で、動作は【完了済み】です。\n見分ける目印になるのは、時を表す語句です。at five・this time tomorrow・then のような【一点】なら未来進行形、by five・by the time 〜 のような【期限】なら未来完了になりやすい、と考えられます。\nさらに、未来完了の「継続」では、期間の計算がよく問われます。始まりの時点が過去にあっても、基準が未来なら未来完了です。期間は【基準の時点 − 始まりの時点】で求めます。今から数えてしまうのがよくあるまちがいです。\n時の線を1本書き、「今」「基準になる未来の点」「始まりの点」の3つに印をつけると、現在完了・未来完了・未来進行形のどれを使うかがはっきりします。',
        key: '未来の一点で「進行中」なら will be 〜ing、「もう終わっている」なら will have + 過去分詞。一点(at・then)か期限(by)かが目印になる。',
        ex: [{
          q: '日本語に合うように、( ) 内の動詞を正しい形にしよう。\n(1) 明日の午後3時には、私は数学の試験を受けているだろう。\nI ( take ) a math test at three tomorrow afternoon.\n(2) 明日の午後3時までには、私は数学の試験を終えているだろう。\nI ( finish ) my math test by three tomorrow afternoon.',
          hint: '「3時に」は一点、「3時までに」は期限。',
          steps: [
            '(1) は at three(3時ちょうど)という未来の一点で、そのとき試験の最中であることを言っています。',
            '進行中の動作なので、未来進行形 will be taking にします。',
            '(2) は by three(3時までに)という期限で、その時点では試験がもう終わっていることを言っています。',
            '完了済みの状態なので、未来完了 will have finished にします。'
          ],
          a: '(1) will be taking (2) will have finished',
          check: '時の線に「3時」の点を打ち、(1) は点の上に試験が重なっている、(2) は点より前に試験が終わっている、と図にすると確かめられます。'
        }]
      },
      {
        h: '実戦演習:期間の計算と、完了形の選び分け',
        t: '入試の未来完了の問題は、形を選ぶだけでなく、【期間を計算させる】形や、【現在完了・過去完了と並べて選ばせる】形でも出ます。\n戦略は、①基準の時点(今・過去・未来)を決める、②始まりの時点を探す、③基準 − 始まり で期間を出す、の順です。\n落とし穴は、「今」を基準にして期間を数えてしまうことです。基準が来年なら、来年までの期間を数えます。また、next year や by then のような未来の目印がある文で、現在完了を選ばないよう注意しましょう。\n副詞節(by the time 〜 など)の中は現在形でも、主節まで現在形にはなりません。「副詞節は現在形、主節は意味どおり」と分けて考えます。',
        key: '期間の問題は、基準の時点から始まりの時点を引く。基準が未来なら未来完了で「〜年間…していることになる」。',
        ex: [
          {
            q: '今は2026年である。( ) に入る語句と数を答えよう。\nMy grandfather started working at this shop in 1990. If he works here until 2030, he ( ) here for ( ) years by then.',
            hint: '基準になるのは何年?',
            steps: [
              'まず基準の時点を探します。by then の then は、if 節の2030年を指します。未来の時点なので、未来完了を使います。',
              '始まりの時点は、started working … in 1990 の1990年です。',
              '期間は 2030 − 1990 = 40 年です。今(2026年)ではなく、基準の2030年から数えるのがポイントです。',
              '継続の意味なので、will have worked … for forty years とします。'
            ],
            a: 'will have worked / 40(forty)',
            check: '今を基準にすると 2026 − 1990 = 36 年で、これは現在完了 has worked here for 36 years の答えになります。基準によって、数字も動詞の形も変わることを確かめましょう。'
          },
          {
            q: '( ) に入る最も適切なものを選ぼう。\nBy the time the guests arrive this evening, we ( ) the room.\n① have decorated ② will have decorated ③ had decorated ④ will decorate',
            hint: '基準は今晩、客が着く時点。',
            steps: [
              'By the time the guests arrive は時の副詞節なので、未来のことでも現在形 arrive になっています。',
              '主節は、「客が着くころまでに」部屋の飾りつけが終わっていることを言う文です。基準は今晩(未来)です。',
              '期限(by the time)までの完了なので、未来完了の ② will have decorated が入ります。',
              '① は基準が今、③ は基準が過去なので合いません。④ は「(そのとき)飾りつける」という動作だけで、期限までの完了を表せません。'
            ],
            a: '② will have decorated(今晩お客さんが着くころまでには、部屋の飾りつけを終えているだろう)',
            check: '時の線に「今」と「今晩(客の到着)」を書き、飾りつけが到着より前に終わる、と置けば、未来完了だと確かめられます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) 内の動詞を、未来進行形か未来完了のどちらかにしよう。\n(1) Don\'t call me at nine tonight. I ( have ) dinner with my family then.\n(2) Call me after ten. I ( finish ) dinner by then.', a: '(1) will be having (2) will have finished', exp: '(1) は then(=今夜9時)という一点で「夕食の最中」なので、未来進行形 will be having にします。have は「持っている」の意味では進行形にしませんが、「食べる」の意味なら進行形にできます。(2) は by then(=10時までに)という期限なので、未来完了 will have finished です。同じ then でも、前に by がつくと「その時までに」という期限になります。一点か期限かを見分けるのがポイントです。' },
      { lv: 3, q: '英語にしよう。\n「来月で、姉はこの病院で看護師として5年間働き続けていることになる。」', a: 'Next month, my sister will have been working at this hospital as a nurse for five years.(will have worked も可)', exp: '「来月で」という未来の基準と、「5年間」という期間がそろっているので、未来完了の継続です。「働き続けている」と動作の継続を強調しているので、未来完了進行形 will have been working がぴったりです。will have worked としても誤りではありません。will be working(未来進行形)にすると、「来月、働いている最中だろう」という意味になり、5年間の継続が表せません。as a nurse の as は「〜として」という意味の前置詞で、接続詞の as(〜なので・〜するとき)とは別のはたらきです。' },
      { lv: 3, q: '次の文を、より正確な文にするために2か所直そう。\nBy the time we will get to the theater, the movie will start.', a: 'will get → get / will start → will have started', exp: '1つ目は、by the time 〜 が時の副詞節なので、未来のことでも現在形 get にします。2つ目は、「劇場に着くころまでには、映画は始まってしまっているだろう」という期限までの完了なので、主節は未来完了 will have started にします。will start のままでは、「着くころまでに」という期限の意味とかみ合いません。副詞節と主節の両方に手を入れる問題では、片方だけ直して満足しないことが大切です。' }
    ],
    faq: [
      ['未来進行形 will be 〜ing には、「〜している最中だろう」以外の使い方もあるの?', 'あります。「(自然な流れで)〜することになっている」という予定の使い方です。例:I will be seeing him tomorrow anyway, so I can give him the letter.(どうせ明日彼に会うことになっているから、手紙を渡しておけるよ)。will see だと「会うつもりだ」と意志が前に出ることがありますが、will be seeing は予定の流れを伝えるだけなので、やわらかく聞こえます。Will you be using the car tonight?(今夜、車を使う予定はある?)のように、相手の予定をていねいにたずねるときにも使われます。'],
      ['by then だけでも、未来完了を使っていいの?', '使えます。by then(そのときまでに)、by that time(その時点までに)、by the end of 〜(〜の終わりまでに)は、どれも期限を表すので、未来完了とよくいっしょに使われます。大切なのは、then がどの時点を指しているかを、前の文から確かめることです。I\'ll leave Tokyo next year. I will have lived here for ten years by then. なら、then は「来年(東京を離れるとき)」です。then が過去を指していれば、過去完了になります。']
    ]
  });

  /* ===== e_tense 時・条件の副詞節と時制 ===== */
  add('e_tense', {
    secs: [
      {
        h: 'さらに深く:未来を表す5つの形と、その「気持ち」のちがい',
        t: '英語で未来を表す形は will だけではありません。それぞれに、話し手がその未来をどうとらえているかという【気持ち】のちがいがあります。\n①【will + 原形】その場で決めた意志や、話し手の予測。例:"The phone is ringing." "I\'ll get it."(電話が鳴ってるよ。—ぼくが出るよ)\n②【be going to + 原形】前から決めていた予定や、今の兆候からの予測。例:Look at those clouds. It\'s going to rain.(あの雲を見て。雨が降りそうだ)\n③【現在進行形】すでに手配が済んでいる、近い未来の個人的な予定。例:I\'m meeting Ken at five.(5時にケンと会うことになっている)\n④【現在形】時刻表・カレンダーのように、個人の気持ちでは変わらない確定した予定。例:The train leaves at 7:10.(電車は7時10分に出る)\n⑤【be about to + 原形】まさに〜しようとしている、ごく近い未来。例:The game is about to start.(試合がもうすぐ始まる)\nここで、本文で学んだ「副詞節は現在形」とつながる点があります。④の現在形は、「確定している事実」を表すはたらきをもっています。副詞節で If it rains tomorrow と現在形を使うのも、雨が降ることを「仮に確定したもの」として前提に置いているからです。\nつまり、現在形が未来を表せるのは特別な例外ではなく、【確定しているもの・前提として置くものには現在形を使う】という1つの原理から出てくるのです。',
        key: 'will は意志・予測、be going to は予定・兆候、進行形は手配済みの予定、現在形は確定した予定。現在形の「確定」のはたらきが、副詞節の現在形ともつながっている。',
        ex: [{
          q: '文脈に合うほうを選び、理由を答えよう。\n(1) A: We have no milk. B: Really? Then I (will buy / am buying) some on my way home.\n(2) Look! That man (will fall / is going to fall) off the ladder!',
          hint: '(1) はいつ決めたか、(2) は目の前に根拠があるか、を考えよう。',
          steps: [
            '(1) は、牛乳がないと今聞いて、その場で「じゃあ帰りに買うよ」と決めた場面です。',
            'その場で決めた意志は will で表すので、will buy が自然です。am buying は、前から手配していた予定に使う形なので合いません。',
            '(2) は、はしごの上の男性の様子を見て、「今にも落ちそうだ」と言っている場面です。',
            '目の前の兆候にもとづく予測なので、is going to fall が自然です。'
          ],
          a: '(1) will buy(牛乳がないの?じゃあ帰りに買うよ) (2) is going to fall(見て!あの人、はしごから落ちそうだ)',
          check: '「いつ決めたか」(今その場か、前からか)と、「根拠があるか」(目の前の兆候があるか)の2つを確かめると、will と be going to を選び分けられます。ただし、単なる予測の文では will もまちがいとは言い切れないので、文脈の手がかりをよく見ましょう。'
        }]
      },
      {
        h: '実戦演習:1つの文に複数の節がある時制の問題',
        t: '入試では、副詞節と名詞節が1つの文に同時に入った問題がよく出ます。1つの if・when だけを見て答えると、もう片方でまちがえるように作られています。\n戦略は、①文の中の接続詞(if・when・while・until・as soon as・as long as など)にすべて印をつける、②それぞれの節を「取り除いても文が成り立つか」「動詞などの目的語になっているか」「名詞の直後にあるか」で、副詞節・名詞節・形容詞節に分ける、③副詞節だけを現在形(完了の意味なら現在完了)にする、の3段階です。\n落とし穴は、同じ文の中に tomorrow・next month などの未来の語があるので、全部を will にしてしまうことです。未来の語は「どの節に入っているか」まで確かめましょう。',
        key: '接続詞ごとに節の種類を判定してから時制を決める。1文に2つの節があれば、答えが「現在形」と「will」に分かれることが多い。',
        ex: [
          {
            q: '( ) 内の動詞を正しい形にしよう。\nI\'m not sure when he ( reply ) to my e-mail, but I\'ll let you know as soon as I ( hear ) from him.',
            hint: '接続詞が2つある。それぞれの節の種類は?',
            steps: [
              'この文には、when と as soon as の2つの接続詞があります。',
              'when の節は I\'m not sure の後ろにあり、「いつ返事をするか(は分からない)」と、分からない内容を表す名詞節です。名詞節の中の未来は will を使うので、will reply にします。',
              'as soon as の節は、取り除いても I\'ll let you know が文として完成するので副詞節です。',
              '副詞節の中は、未来のことでも現在形なので hear にします。'
            ],
            a: 'will reply / hear(彼がいつメールに返事をくれるかは分からないけれど、連絡があったらすぐに知らせるね)',
            check: '訳し方でも確かめられます。名詞節は「いつ〜か」、副詞節は「〜したらすぐに」と訳せます。訳し方がちがえば、節の種類もちがいます。'
          },
          {
            q: '( ) に入る最も適切な組み合わせを選ぼう。\nYou can use my bike while I ( ) abroad next month, as long as you ( ) it back by the time I return.\n① will be — will bring ② am — bring ③ will be — bring ④ am — will bring',
            hint: 'while と as long as の節は、どちらも取り除いても文が成り立つ?',
            steps: [
              'while の節は「私が来月海外にいる間」と時を表す副詞節です。未来のことでも現在形 am にします。',
              'as long as(〜しさえすれば・〜する限り)は条件を表す接続詞で、その節も副詞節です。',
              'したがって、as long as の節も現在形 bring にします。',
              'by the time I return も時の副詞節なので、return が現在形になっている点も確認できます。',
              '両方とも現在形の ② が正解です。'
            ],
            a: '② am — bring(来月私が海外にいる間、私が帰るまでに返してくれさえすれば、自転車を使っていいよ)',
            check: 'next month につられて will を選ばないことが大切です。初めて見る接続詞でも、「時・条件を表し、取り除いても文が成り立つ」なら副詞節と判断できます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '日本語に合うように、( ) に適語を入れよう。\n「急いで! 電車がもうすぐ出発するよ。」\nHurry up! The train is ( ) ( ) leave.', a: 'about to', exp: 'be about to + 原形 は「まさに〜しようとしている」という、ごく近い未来を表します。about to 自体に「すぐに」の意味がふくまれているので、soon などをつけ加える必要はありません。The train leaves at 7:10. の現在形は「時刻表で決まった予定」、The train is going to leave. は「今の様子から出発しそうだ」という予測を表し、ニュアンスが少しずつちがいます。about には「〜について」のほか、「およそ」(about ten people)などの意味もあります。' },
      { lv: 3, q: '次の2文の意味のちがいを説明しよう。\n(1) I\'ll ask him when he comes back.\n(2) I\'ll ask him when he will come back.', a: '(1) 彼が戻ってきたら、彼にたずねます。\n(2) 彼がいつ戻ってくるのか、彼にたずねます。', exp: '(1) の when he comes back は、取り除いても I\'ll ask him. が成り立つ副詞節で、「〜したら・〜するとき」の意味です。中は未来のことでも現在形 comes です。(2) の when he will come back は、ask him の後ろで「何をたずねるか」を表す名詞節で、「いつ〜か」の意味です。中は will を使います。同じ when でも、comes か will come かという動詞の形が、節の種類を見分ける手がかりになります。読解では、動詞の形から逆に節の種類を判断できる、ということも覚えておきましょう。' },
      { lv: 3, q: '( ) 内の動詞を正しい形にし、和訳しよう。\nThe next time you ( come ) to Kyoto, I will show you around.', a: 'come/今度あなたが京都に来たときには、案内してあげます。', exp: 'the next time は名詞のかたまりですが、この文では後ろに S + V(you come …)を続けて、「今度〜するときには」という接続詞のようなはたらきをしています。時を表す副詞節を作るので、未来のことでも現在形 come にします。every time(〜するたびに)、the moment(〜するとすぐに)も同じように使えます。一方、I don\'t know the next time he will come.(彼が次にいつ来るのか分からない)のように、名詞として動詞の目的語になる場合は、副詞節ではありません。show 人 around は「(人)を案内して回る」という意味です。' }
    ],
    faq: [
      ['未来のことを現在形で言える場合と、言えない場合の境目はどこ?', '目安は、【個人の気持ちで変わらない、確定した予定かどうか】です。時刻表・営業時間・学校の行事・カレンダーなどは現在形で言えます。例:School starts on April 8.(学校は4月8日に始まる)。一方、天気や人の行動の予測のように、まだ確定していないことを現在形だけで言うことはふつうできません。× It rains tomorrow. は不自然で、It will rain tomorrow. か It is going to rain tomorrow. にします。'],
      ['be going to と will の意味が、ほとんど同じになることもあるの?', 'あります。単なる未来の予測では、It will be cold tomorrow. と It is going to be cold tomorrow. はどちらも自然で、意味の差は小さくなります。はっきり差が出るのは、①その場で決めた意志(I\'ll get it.)は will、②前から決めていた予定(I\'m going to visit my aunt this weekend.)は be going to、という場面です。入試では、「いつ決めたのか」が分かる文脈の手がかりを探して選びましょう。']
    ]
  });


  /* ===== e_aux 助動詞 ===== */
  add('e_aux', {
    secs: [
      {
        h: 'さらに深く:could have・might have の「2つの読み」',
        t: '助動詞 + have + 過去分詞 のうち、could have と might have には、【2つの読み方】があります。どちらの読みかは、文脈で決まります。\n1つ目は、【過去についての推量】です。「(ひょっとすると)〜したかもしれない」という意味で、may have とほぼ同じです。\n例:He could have taken the wrong bus.(彼はバスを乗りまちがえたのかもしれない)\n例:She might have forgotten our appointment.(彼女は約束を忘れたのかもしれない)\n2つ目は、【実現しなかった過去の可能性】です。「(やろうと思えば)〜できたのに・〜したかもしれないのに(実際はそうならなかった)」という意味で、仮定法過去完了の主節と同じはたらきです。\n例:You could have called me. I was home all evening.(電話してくれてもよかったのに。一晩中家にいたんだから)→ 実際には電話がなかったことへの不満。\n例:You might have been killed!(死んでいたかもしれないんだよ!)→ 実際には助かった。\nなぜ2つの読みが生まれるのでしょうか。could・might は、もともと can・may の過去形で、「現実から一歩離れた」可能性を表します(仮定法の単元で学ぶ「過去形=距離」の考え方です)。その距離が「確信が弱い」の方向に向けば推量、「実際とはちがう」の方向に向けば実現しなかった可能性、と読めるのです。\n読み分けの手がかりは、【実際に起きたことが文脈に書かれているか】です。「実際はこうだった」と分かる文(I was home all evening. など)が近くにあれば、2つ目の読みです。',
        key: 'could have・might have は「〜したかもしれない(推量)」と「〜できたのに・〜したかもしれないのに(実現しなかった可能性)」の2通りに読める。実際にどうだったかが文脈にあれば後者。',
        ex: [{
          q: '下線部に注意して、2つの文を和訳しよう。\n(1) I can\'t find my key. I might have dropped it on the way home.\n(2) Why did you drive so fast on the icy road? You might have had an accident.',
          hint: 'それぞれ、実際に起きたことが分かっているか、分かっていないかを考えよう。',
          steps: [
            '(1) では、かぎがどこにあるかはまだ分かっていません。「帰り道に落としたのかもしれない」と、分からない過去を推量しています。',
            'したがって (1) は【推量】の読みです。',
            '(2) では、話し相手はもう車の運転を終えていて、事故は起きていません。「凍った道でそんなに飛ばして」と責めています。',
            '実際には起きなかった事故の可能性を言っているので、(2) は【実現しなかった可能性】の読みで、「事故を起こしていたかもしれないよ」となります。'
          ],
          a: '(1) かぎが見つからない。帰り道に落としたのかもしれない。\n(2) どうして凍った道であんなにスピードを出したの? 事故を起こしていたかもしれないんだよ。',
          check: '(2) は If you had been unlucky, you might have had an accident. のように、仮定法の if 節を補って読めます。if 節を補えるなら「実現しなかった可能性」、補えないなら「推量」と確かめられます。'
        }]
      },
      {
        h: '実戦演習:根拠を組み合わせて助動詞を選ぶ',
        t: '難しい助動詞の問題では、【根拠が2つ以上】あり、その組み合わせで答えが決まります。1つ目の根拠だけで答えると、2つ目の根拠と矛盾するように作られています。\n戦略は、①根拠になる事実の文をすべて探す、②それぞれの空所について「ほぼ確実(must)・ありえない(can\'t)・ありうる(may・might・could)」のどれかを決める、③時が過去なら have + 過去分詞 にする、の3段階です。\nもう1つ差がつくのが、【助動詞 + 受動態の完了形】(should have been + 過去分詞 など)です。長い形でも、「助動詞 → have → been → 過去分詞」の順に意味を足していけば、正確に訳せます。',
        key: '根拠が2つあるときは、両方と矛盾しない助動詞を選ぶ。助動詞 + have been + 過去分詞 は、前から順に意味を足して訳す。',
        ex: [
          {
            q: '( A )・( B ) に入る組み合わせとして最も適切なものを選ぼう。\nThe street is wet this morning, but the weather report says it was clear all night. So it ( A ) rained last night. A street-cleaning truck ( B ) passed by early this morning.\n① A: must have B: can\'t have\n② A: can\'t have B: may have\n③ A: should have B: must not have\n④ A: may have B: needn\'t have',
            hint: '根拠は「道がぬれている」と「一晩中晴れていた」の2つ。',
            steps: [
              '根拠1は「今朝、道がぬれている」、根拠2は「天気予報によると、一晩中晴れていた」です。',
              '( A ) は、根拠2から「雨が降ったはずがない」と強く否定できます。過去の推量なので can\'t have が入ります。',
              '( B ) は、道がぬれている理由として別の可能性を考えています。清掃車が通ったかどうかは確かではないので、「〜したのかもしれない」の may have が自然です。',
              'この組み合わせは ② です。① の must have rained は根拠2と矛盾します。'
            ],
            a: '②(今朝、道がぬれているが、天気予報では一晩中晴れていたと言っている。だから、昨夜雨が降ったはずはない。早朝に道路清掃車が通ったのかもしれない。)',
            check: '「ありえない → can\'t have」「ありうる → may have」と、根拠の強さと助動詞の強さが対応しているかを確かめましょう。④ の needn\'t have は「〜する必要はなかったのに」で、推量の意味になりません。'
          },
          {
            q: '日本語に合うように、( ) 内の語を並べかえよう。\n「その問題は、もっと早く解決されているべきだった。」\nThe problem ( been / have / should / solved ) earlier.',
            hint: '助動詞 → have → been → 過去分詞 の順。',
            steps: [
              '「〜されているべきだった(のに、されなかった)」は、過去への後悔・非難なので should have + 過去分詞 の形を使います。',
              'さらに「解決される」と受動態なので、過去分詞の部分が been + solved になります。',
              '順番は、should(〜すべき)→ have(過去のこと)→ been(受動)→ solved(解決する)です。',
              'できあがりは、The problem should have been solved earlier. です。'
            ],
            a: 'The problem should have been solved earlier.',
            check: '前から順に意味を足すと、「すべきだった(should have)」+「される(been 過去分詞)」=「解決されるべきだった」となり、日本語と一致します。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '日本語に合うように、( ) に適語を入れよう。\n「彼はもうその知らせを聞いたかもしれない。」\nHe ( ) ( ) already ( ) the news.', a: 'may have / heard(might have heard も可)', exp: '「〜したかもしれない」という過去への推量なので、may have + 過去分詞 にします。助動詞の後ろは原形しか置けないので、「過去」の意味は have + 過去分詞で表します。already はふつう have と過去分詞の間に置きます。might have heard としても、確信が少し弱くなるだけで同じ意味です。must have heard(聞いたにちがいない)にすると確信が強くなりすぎ、日本語と合いません。' },
      { lv: 3, q: '次の文を和訳し、would rather の後ろの動詞が過去形になっている理由を説明しよう。\nI\'d rather you didn\'t tell anyone about this.', a: 'このことは、だれにも言わないでもらいたいのですが。/would rather の後ろに「主語 + 動詞」が来ると、実現していない願望を表す仮定法になり、今のことでも過去形を使うから。', exp: 'would rather は、本文で学んだ would rather A (than B)(B するよりむしろ A したい)の形のほかに、【would rather + S + 過去形】(S に〜してほしい)の形があります。後ろの部分は、まだ実現していないことへの願望なので、I wish と同じく仮定法になり、今や未来のことでも過去形を使います。過去形にすることで、相手への要求をやわらかく伝える効果もあります。I\'d は I would の短縮形です(I had の短縮形と同じつづりなので、後ろの形で区別します)。' },
      { lv: 3, q: '( ) に入る最も適切なものを選ぼう。\nShe looks very happy. She ( ) the exam.\n① must pass ② must have passed ③ should pass ④ had to pass', a: '② must have passed', exp: '根拠は「今、とてもうれしそうだ」という現在の様子で、そこから「試験に合格したにちがいない」と過去のことを推量しています。過去の推量は助動詞 + have + 過去分詞 なので、② must have passed です。① must pass は「合格しなければならない」(義務)の意味になります。④ had to pass は「合格しなければならなかった」で、過去の義務を表します。義務の過去は had to、推量の過去は must have + 過去分詞、と形が分かれる点をセットで覚えましょう。' }
    ],
    faq: [
      ['「〜できるだろう」は、will can と言えるの?', '言えません。英語では、助動詞を2つ続けて並べることができないからです。will の後ろには原形が来るので、can の代わりに be able to を使い、will be able to 〜 とします。例:You will be able to swim soon.(すぐに泳げるようになるよ)。「〜しなければならないだろう」も、will must ではなく will have to 〜 です。have been able to(ずっと〜できている)のように、完了形と組み合わせるときも be able to を使います。'],
      ['must have + 過去分詞 の否定は、must not have + 過去分詞 なの?', '「〜したはずがない」と言いたいときは、ふつう can\'t(cannot・couldn\'t)have + 過去分詞 を使います。例:He can\'t have said such a thing.(彼がそんなことを言ったはずがない)。must not have + 過去分詞 という形もありますが、こちらは主にアメリカ英語で「〜しなかったにちがいない」という意味になり、「〜したはずがない」とは少しちがいます。入試では、must have の反対は can\'t have、と覚えておくのが安全です。']
    ]
  });

  /* ===== e_inf 不定詞・動名詞・分詞 ===== */
  add('e_inf', {
    secs: [
      {
        h: 'さらに深く:名詞 + to 不定詞 の3つの関係と、残る前置詞',
        t: '形容詞的用法の不定詞は「〜する(ための)名詞」と訳しますが、名詞と不定詞の間には、実は【3種類の関係】があります。\n①【名詞が不定詞の主語】a friend to help me → A friend helps me.(私を助けてくれる友だち)\n②【名詞が不定詞の目的語】a book to read → I read a book.(読むための本)\n③【不定詞が名詞の内容を説明する(同格)】his decision to leave → He decided to leave.(去るという彼の決心)\nこの見方をすると、【前置詞が残る理由】が分かります。「住むための家」は、もとの文が live in a house なので、a house to live in と in が必要です。in がないと「家を住む」という意味の通らない文になってしまいます。\n例:a chair to sit on(座るためのいす ← sit on a chair)/a pen to write with(書くためのペン ← write with a pen)/someone to talk to(話し相手 ← talk to someone)\n同じしくみは、【It is 形容詞 to 〜】の文にもあります。This river is dangerous to swim in.(この川は泳ぐのが危険だ)は、It is dangerous to swim in this river. の this river を主語に出した形です。in this river の in は残るので、文末の in を落とすとまちがいになります。\n③の同格の関係をとれる名詞は、decision・plan・promise・ability・attempt など、もとの動詞や形容詞が to 不定詞をとるものが多い、という特徴もあります(decide to・promise to・be able to)。',
        key: '名詞 + to 不定詞 には「主語・目的語・同格」の3つの関係がある。もとの文に前置詞があれば、不定詞の後ろに前置詞が残る。',
        ex: [{
          q: '次の文の誤りを直し、理由を説明しよう。\nShe has no friends to talk.',
          hint: '「友だちと話す」をもとの文にすると?',
          steps: [
            'friends と to talk の関係を、もとの文に戻して考えます。「友だちと話す」は talk with(to)friends です。',
            'talk は「〜と話す」と言うとき、前置詞 with か to が必要な自動詞です。',
            'そのため、名詞の後ろに不定詞を置くときも、前置詞を残して friends to talk with(to)とします。',
            '和訳は「彼女には話し相手になる友だちがいない」です。'
          ],
          a: 'She has no friends to talk with(to).(彼女には話し相手がいない)',
          check: '不定詞の後ろに名詞を戻して、talk with friends と文になるかを確かめます。talk friends では文にならないので、前置詞が必要だと分かります。'
        }]
      },
      {
        h: '実戦演習:be to 不定詞を文脈で訳し分ける',
        t: 'be動詞 + to 不定詞(【be to 不定詞】)は、入試の和訳でよくねらわれる形です。主な意味は、【予定】(〜することになっている)、【義務】(〜すべきだ)、【可能】(〜できる)、【運命】(〜する運命だった)、【意図】(〜するつもりなら)の5つです。\nどの意味も、「これから先に〜する方向にある」という to のイメージから出てきます。そのため、意味の決め方には型があります。\n戦略:①if 節の中なら【意図】(If you are to 〜:〜したいなら)。②否定文で、受動の不定詞(to be + 過去分詞)なら【可能】が多い。③過去の物語の中で、その後の人生を述べるなら【運命】。④命令・規則の文脈なら【義務】。⑤公式な予定・発表なら【予定】。\n落とし穴は、My dream is to be a doctor.(私の夢は医者になることだ)のような、名詞的用法の補語と混同することです。主語が「夢・目標」など内容を表す名詞なら、名詞的用法です。',
        key: 'be to 不定詞は、if 節なら意図、否定+受動なら可能、過去の物語なら運命、と文脈の型で決める。主語が「夢・目的」なら名詞的用法の補語。',
        ex: [
          {
            q: '和訳しよう。\n(1) If you are to succeed, you must work harder.\n(2) Not a sound was to be heard in the room.',
            hint: '(1) は if 節の中、(2) は否定+受動の不定詞。',
            steps: [
              '(1) は if 節の中の be to 不定詞なので、【意図】の意味で「成功するつもりなら・成功したいなら」と訳します。',
              '主節は must work harder(もっと努力しなければならない)なので、全体は「成功したいなら、もっと努力しなければならない」となります。',
              '(2) は否定(Not a sound)と受動の不定詞(to be heard)が組み合わさっているので、【可能】の意味です。',
              'was to be heard は could be heard とほぼ同じで、「物音ひとつ聞こえなかった」となります。'
            ],
            a: '(1) 成功したいなら、もっと努力しなければならない。\n(2) 部屋の中では、物音ひとつ聞こえなかった。',
            check: '(2) は Not a sound could be heard in the room. と書きかえて意味が通ることで確かめられます。(1) は If you want to succeed, … と言いかえられます。'
          },
          {
            q: '下線部の be to 不定詞の意味を答え、和訳しよう。\nThe young man left his village in 1920. He was never to see his parents again.',
            hint: '過去の物語で、その後のことを述べている。',
            steps: [
              '1文目は、1920年に若者が村を出たという過去の出来事です。',
              '2文目の was never to see は、村を出た後のことを、物語の語り手がふり返って述べています。',
              '本人の意志や予定ではなく、結果としてそうなった、という意味なので【運命】の用法です。',
              '「二度と両親に会うことはなかった(会えない運命だった)」と訳します。'
            ],
            a: '運命。その若者は1920年に村を出た。彼は二度と両親に会うことはなかった。',
            check: '「予定」と読んで「会うことになっていなかった」と訳すと、意味が通りません。過去の物語の中で、その後の人生を述べる be to は「運命」と覚えておきましょう。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '和訳し、文末の in が必要な理由を説明しよう。\nThis river is dangerous to swim in.', a: 'この川は泳ぐのが危険だ。/もとの文 It is dangerous to swim in this river. の this river を主語に出した形で、swim in this river の in が残るから。', exp: 'It is dangerous to swim in this river. の不定詞の中の名詞(this river)を、文の主語に出した形です。このとき、名詞だけが前に出て、前置詞 in は不定詞の後ろに残ります。in がないと「川を泳ぐ」という形になり、swim の使い方として不自然です。easy・hard・difficult・dangerous・impossible などの形容詞は、この形をよくとります。This book is easy to read.(この本は読みやすい)では、もとが read this book なので前置詞は残りません。' },
      { lv: 3, q: '和訳しよう。\nHe is the last person to tell a lie.', a: '彼は決してうそをつくような人ではない。', exp: 'the last person to 〜 は、直訳すると「〜する最後の人」です。うそをつく人を順に並べたとき、彼はいちばん最後、つまり「最もうそをつきそうにない人」だ、という意味になります。そこから「決して〜しない人」と訳します。to tell a lie は person を説明する形容詞的用法で、person が tell の主語になる関係(The person tells a lie.)です。last には「最後の」のほかに、「この前の」(last week)、「最も〜しそうにない」の意味があります。' },
      { lv: 3, q: 'ほぼ同じ意味になるように、( ) に適語を入れよう。\nThis box is too heavy for me to carry.\n= This box is ( ) heavy ( ) I can\'t carry ( ).', a: 'so / that / it', exp: 'too 〜 for 人 to …(あまりに〜なので、人は…できない)は、so 〜 that 人 can\'t …に書きかえられます。ここで大切なのは、文末の it です。不定詞の文 to carry の目的語は、主語の this box と同じなので書きません。しかし that 節は独立した文なので、carry の目的語として it(=this box)が必要になります。it を落とすと、「何を運べないのか」が欠けた不完全な文になります。逆に that 節から不定詞に書きかえるときは、it を消すのを忘れないようにしましょう。' }
    ],
    faq: [
      ['to really understand のように、to と原形の間に副詞を入れてもいいの?', 'このような形を【分離不定詞】といいます。昔は避けるべきだとされることもありましたが、現代の英語では、意味をはっきりさせるためにふつうに使われています。例:I want to really understand this theory.(この理論を本当に理解したい)。ただし、副詞の位置で意味が変わることもあるので注意しましょう。英作文では、not の位置(not to 〜)のように、決まった形が求められるところを正確に書くことが大切です。'],
      ['be to 不定詞の5つの意味は、全部覚えないといけないの?', '覚えておくと和訳で役に立ちますが、丸暗記よりも「これから先に〜する方向にある」という中心の意味から考えるほうが確実です。予定(〜する方向に決まっている)、義務(〜する方向に向けられている)、可能(否定文で、〜される方向にない=できない)、運命(結果として〜する方向にあった)、意図(if 節で、〜する方向をめざすなら)と、すべて中心の意味から広がっています。迷ったら、文脈に当てはめて自然な訳を選びましょう。']
    ]
  });

  /* ===== e_h4 関係副詞・what・非制限・複合関係詞 ===== */
  add('e_h4', {
    secs: [
      {
        h: 'さらに深く:all of whom・whose ― 関係詞の前に名詞が「くっつく」形',
        t: 'コンマのある関係詞(非制限用法)では、関係代名詞の前に【数量を表す語 + of】がつく形がよく使われます。\n例:He has three sons, all of whom are doctors.(彼には3人の息子がいて、その全員が医者だ)\nもとは2つの文です。He has three sons. + All of them are doctors. の them を whom に変え、all of whom のかたまりごと前に出しています。前置詞 of の後ろなので、who ではなく目的格の whom を使います。物なら which です。\n例:I bought five books, two of which were very difficult.(私は本を5冊買ったが、そのうち2冊はとても難しかった)\nall・most・some・none・both・two などが、このかたまりの先頭に来ます。\nもう1つ、名詞が関係詞と結びつく形が【whose + 名詞】です。whose は「その〜が(を)」という意味で、先行詞と後ろの名詞が「持ち主と持ち物」の関係にあるときに使います。\n例:I met a girl whose father is a famous pianist.(父親が有名なピアニストである女の子に会った)→ Her father is a famous pianist. の her が whose に変わった形です。\nwhose は、人だけでなく物にも使えます。例:a house whose roof is red(屋根が赤い家)。かたい書き言葉では、a house the roof of which is red という形もあります。\nどの形も、【もとの2つの文に戻すと、代名詞がどこに入っていたか】で考えると、正しい関係詞を選べます。',
        key: '「数量 + of whom(which)」は、もとの文の「数量 + of them」の them を関係詞に変えた形。whose は持ち主と持ち物の関係で、人にも物にも使える。',
        ex: [{
          q: '2つの文を、関係詞を使って1つの文にしよう。\nThe club has thirty members. Most of them are first-year students.',
          hint: 'Most of them の them を関係代名詞に変えよう。',
          steps: [
            '2つ目の文の them は、1つ目の文の thirty members を指しています。',
            'them は人を指す目的格(of の後ろ)なので、関係代名詞は whom にします。',
            'most of whom のかたまりを先行詞の後ろに置き、情報を付け足す非制限用法なので、前にコンマをつけます。',
            'できあがりは、The club has thirty members, most of whom are first-year students. です。'
          ],
          a: 'The club has thirty members, most of whom are first-year students.(その部には30人の部員がいて、そのほとんどが1年生だ)',
          check: 'most of who とすると、前置詞 of の後ろに主格が来てしまうので誤りです。また、コンマなしで … members most of whom … とはしません。この形は非制限用法で使います。'
        }]
      },
      {
        h: '実戦演習:関係詞を選ぶ ― 前置詞・数量語・whose が混ざった問題',
        t: '難関大の関係詞の問題では、選択肢に which・whom・whose・where・what が並び、さらに前置詞や数量語がからみます。\n戦略は、①空所の直前に前置詞や数量語(all of など)があるかを見る。あれば whom・which にしぼられます(that・who は前置詞の後ろに置けません)。②空所の直後が「名詞 + 動詞」で、その名詞に冠詞がないなら whose を疑う。③空所の後ろが完全な文なら関係副詞、不完全なら関係代名詞、と本文の判定法を使う。④先行詞がなければ what。\n落とし穴は、直後に名詞があるだけで whose を選ぶことです。whose の後ろの名詞は、先行詞の「持ち物」でなければなりません。もとの文に戻して、his・her・its が入るかを確かめましょう。',
        key: '前置詞・数量語の後ろなら whom・which、直後の名詞が先行詞の持ち物なら whose。もとの文に戻して代名詞の形で確かめる。',
        ex: [
          {
            q: '( ) に入る最も適切なものを選ぼう。\nThe scientist, ( ) research changed the way we think about sleep, will give a lecture at our school.\n① who ② whom ③ whose ④ which',
            hint: '空所の直後の research と、the scientist の関係は?',
            steps: [
              '空所の直後は research changed …(名詞 + 動詞)で、research に冠詞がついていません。whose の可能性を考えます。',
              'もとの文に戻すと、His research changed the way we think about sleep. となり、「その科学者の研究」という持ち主と持ち物の関係が成り立ちます。',
              'したがって、his を whose に変えた ③ が入ります。',
              '① who にすると、後ろに research changed … と S + V がそろっているのに who の役割がなくなり、文が成り立ちません。'
            ],
            a: '③ whose(睡眠についての私たちの考え方を変える研究をしたその科学者が、私たちの学校で講演をする予定だ)',
            check: 'もとの文に戻して His research changed … と his を入れ、意味が通るかどうかで確かめましょう。whose の後ろの research は、changed の主語になっています。'
          },
          {
            q: '( ) に入る最も適切なものを選ぼう。\nI have two brothers, both of ( ) live in Tokyo.\n① them ② whom ③ who ④ which',
            hint: 'コンマの後ろで、2つの文をつないでいる語は?',
            steps: [
              'この文には、have と live の2つの動詞があります。2つの節をつなぐには、接続詞か関係詞が必要です。',
              '① them を入れると、接続詞なしで2つの文がつながってしまうので誤りです(I have two brothers, and both of them live … なら正しい)。',
              '前置詞 of の後ろなので、主格の who ではなく目的格が入ります。人を指すので whom です。',
              'したがって ② whom が正解で、both of whom が「その2人とも」を表します。'
            ],
            a: '② whom(私には兄弟が2人いて、2人とも東京に住んでいる)',
            check: '① them がひっかけです。「動詞の数 − 1 = 接続詞・関係詞の数」を確かめると、つなぐ語が必要だと分かります。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に適切な関係代名詞を入れよう。\nThis is the bridge ( ) design won an international prize.', a: 'whose', exp: '空所の後ろは design won …(名詞 + 動詞)で、design に冠詞がありません。もとの文に戻すと、Its design won an international prize.(その設計は国際的な賞をとった)となり、「橋の設計」という持ち主と持ち物の関係です。its を関係詞に変えるので whose を使います。whose は人だけでなく物にも使えます。which を入れると、後ろが design won … で S・V がそろった完全な文になり、which の役割がなくなってしまいます。design には「設計・デザイン」のほか、動詞で「〜を設計する」の意味もあります。' },
      { lv: 3, q: '2つの文を、関係詞を使って1つの文にしよう。\nI read three novels last month. None of them was interesting.', a: 'I read three novels last month, none of which was interesting.(were も可)', exp: 'None of them の them は three novels を指す物の代名詞で、前置詞 of の後ろにあるので、関係代名詞 which に変えます。none of which のかたまりを先行詞の後ろに置き、コンマのある非制限用法にします。none は「1つも〜ない」という意味で、none of の後ろに複数名詞が来るとき、動詞は単数でも複数でもかまいません(かたい書き言葉では単数が好まれることがあります)。物なので whom ではなく which を使う点、前置詞の後ろなので that は使えない点にも注意しましょう。' },
      { lv: 3, q: '和訳しよう。\nShe wrote a book, the title of which I can\'t remember.', a: '彼女は本を1冊書いたが、その題名を私は思い出せない。', exp: 'the title of which は、whose title と同じ意味の、かたい書き言葉の形です。もとの文は I can\'t remember the title of it. で、it(=a book)を which に変え、the title of which のかたまりごと前に出しています。かたまりは remember の目的語なので、後ろの I can\'t remember には目的語が欠けています。非制限用法なので、「〜だが、その…」と前から順に訳すと自然です。of which を見たら、「その(先行詞)の〜」と読めるかを確かめましょう。' }
    ],
    faq: [
      ['whose は物にも使えるのに、which を使った言い方もあるのはなぜ?', 'whose は、もともと who の所有格なので、物に使うと少しかたい・不自然だと感じる人もいます。そのため、かたい書き言葉では the roof of which のような形も使われます。ただし現代の英語では、a house whose roof is red のように物に whose を使うのは、正しい用法として広く認められています。入試では、どちらの形も読めるようにし、英作文では、より簡単な with を使った a house with a red roof のような言いかえも考えるとよいでしょう。'],
      ['I don\'t know what he said. の what は、関係代名詞と疑問詞のどちら?', 'どちらとも考えられます。関係代名詞なら「彼が言ったこと(を知らない)」、疑問詞なら「彼が何を言ったのか(知らない)」で、意味はほとんど同じです。区別が大切になるのは、意味がはっきり分かれるときです。What he said was true.(彼が言ったことは本当だった)は「〜こと」の関係代名詞で、「何を言ったのかは本当だった」とは訳せません。know・ask・wonder の後ろなら疑問詞の訳、主語の位置なら関係代名詞の訳が自然なことが多い、と考えましょう。']
    ]
  });

  /* ===== e_h3 分詞構文 ===== */
  add('e_h3', {
    secs: [
      {
        h: 'さらに深く:文頭のかたまりの正体を見分ける',
        t: '長文では、文の最初にコンマまでのかたまりがあると、それが分詞構文かどうかを見分ける力が必要になります。文頭の 〜ing には、【動名詞の主語】と【分詞構文】の2つの可能性があるからです。\n例1:Reading books is fun.(本を読むことは楽しい)→ Reading books の直後に動詞 is があります。かたまり全体が主語の動名詞です。\n例2:Reading the letter, she smiled.(手紙を読みながら、彼女はほほえんだ)→ コンマの後ろに、別の主語 she と動詞 smiled があります。これは分詞構文です。\n見分け方は、【かたまりの後ろに、すぐ動詞が来るか、コンマ + 主語 + 動詞が来るか】です。\nさらに、分詞構文では Being が省略されるので、文頭が【形容詞・名詞・過去分詞】で始まることもあります。\n例3:Unable to sleep, I got up and read a book.(眠れなかったので、起きて本を読んだ)→ (Being) unable to sleep の Being が省略された形です。\n例4:A kind man, he helped the old woman with her bags.(親切な人だったので、彼はおばあさんの荷物を運ぶのを手伝った)→ (Being) a kind man の省略です。\n例5:Born in Canada, she speaks both English and French.(カナダで生まれたので、彼女は英語とフランス語の両方を話す)→ (Being) born の省略です。\nどの形も、【コンマの後ろの主語が、かたまりの意味上の主語】になっています。形容詞や名詞で文が始まって見慣れなくても、「(Being) を補えるか」「後ろの主語の説明になっているか」を確かめれば、正体が分かります。',
        key: '文頭の〜ing は、直後が動詞なら動名詞の主語、コンマ + S + V なら分詞構文。形容詞・名詞・過去分詞で始まるかたまりは、Being が省略された分詞構文のことが多い。',
        ex: [{
          q: '次の文の文頭のかたまりのはたらきを答え、和訳しよう。\n(1) Walking in the forest early in the morning makes me feel relaxed.\n(2) Tired of waiting, the children began to play games.',
          hint: 'かたまりの後ろに、すぐ動詞が来ているか、コンマ + 主語 + 動詞か。',
          steps: [
            '(1) のかたまり Walking in the forest early in the morning の直後には、動詞 makes が来ています。',
            'したがって、このかたまりは makes の主語になる動名詞です。「朝早く森を歩くことは、私をリラックスさせる」が直訳です。',
            '(2) の Tired of waiting の後ろには、コンマ + the children(主語)+ began(動詞)が来ています。',
            '文頭が過去分詞 Tired で始まるのは、(Being) tired of waiting の Being が省略された分詞構文だからです。意味上の主語は the children で、「待ちくたびれたので」と理由を表します。'
          ],
          a: '(1) 動名詞(文の主語):朝早く森の中を歩くと、私はリラックスした気分になる。\n(2) 分詞構文(理由):待ちくたびれて、子どもたちはゲームを始めた。',
          check: '(1) は無生物主語の文なので、「〜すると、私は…」と人を主語にして訳すと自然です。(2) は As they were tired of waiting, … と接続詞のある文に戻せるかで確かめられます。'
        }]
      },
      {
        h: '実戦演習:独立分詞構文と完了形を組み合わせる',
        t: '難しい分詞構文の問題では、【独立分詞構文(主語を残す)】と【完了形(Having + 過去分詞)】や【受動】が、1つの文の中で組み合わされます。\n戦略は、①接続詞のある文に戻して、主節の主語と従属節の主語が同じかを確かめる。ちがえば主語を残す。②従属節の動詞が主節より前のことなら Having + 過去分詞、同じ時なら 〜ing。③従属節の主語が「される」側なら、過去分詞(または having been + 過去分詞)。この3つを順番に確かめます。\n落とし穴は、主語を残すのを忘れることと、主語を残したのに there や it を消してしまうことです。また、和訳では、分詞構文に接続詞を補って「〜したので」「〜すると」と、文脈に合う意味を選びます。',
        key: '主語の一致 → 時のずれ → 能動・受動 の3点を順に確かめる。主語がちがえば、分詞の前に主語を残す。',
        ex: [
          {
            q: '分詞構文を使って書きかえよう。\nBecause the last train had already left, we had to take a taxi.',
            hint: '主語は同じ?時のずれはある?',
            steps: [
              '従属節の主語は the last train、主節の主語は we で、ちがいます。そのため、主語 the last train を分詞の前に残します(独立分詞構文)。',
              '従属節の動詞 had left は、主節の had to take より前のことです。時のずれがあるので、Having + 過去分詞 の形にします。',
              'already はそのまま having と過去分詞の間に置けます。接続詞 Because を消して、The last train having already left, とします。',
              'できあがりは、The last train having already left, we had to take a taxi. です。'
            ],
            a: 'The last train having already left, we had to take a taxi.(終電がもう出てしまっていたので、私たちはタクシーに乗らなければならなかった)',
            check: '主語を消して Having already left, we had to … とすると、「私たちがもう出発していたので」という意味になってしまいます。主語がちがうことを必ず確かめましょう。'
          },
          {
            q: '和訳しよう。\nBorn into a poor family, he had to start working at an early age.',
            hint: '文頭の Born の前に、何が省略されている?',
            steps: [
              '文頭が過去分詞 Born で始まっているので、(Being) born into a poor family の Being が省略された分詞構文だと考えます。',
              '意味上の主語は、コンマの後ろの he です。「彼は貧しい家に生まれた」という関係になります。',
              '主節は「幼いうちから働き始めなければならなかった」で、生まれた家が貧しいことはその理由になっています。',
              'そこで、分詞構文を「〜なので」と理由の意味で訳します。'
            ],
            a: '貧しい家に生まれたので、彼は幼いころから働き始めなければならなかった。',
            check: '接続詞のある文に戻すと、Because he was born into a poor family, he had to start working at an early age. となり、意味が通ることで確かめられます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '次の2文の Reading 〜 のはたらきのちがいを答えよう。\n(1) Reading comics is my favorite way to relax.\n(2) Reading the e-mail, he suddenly stood up.', a: '(1) 動名詞(文の主語):漫画を読むことは、私のお気に入りのリラックス法だ。\n(2) 分詞構文(時):メールを読んでいると、彼は突然立ち上がった。', exp: '(1) は Reading comics の直後に動詞 is が来ているので、このかたまりは文の主語で、「〜すること」と訳す動名詞です。(2) は Reading the e-mail の後ろに、コンマ + he(主語)+ stood(動詞)が続いているので、分詞構文です。意味上の主語は he で、「メールを読んでいると(読んでいるときに)」という時の意味になります。同じ 〜ing でも、後ろの形でまったくちがうはたらきになるので、かたまりの直後を必ず見ましょう。' },
      { lv: 3, q: '和訳し、文の構造を説明しよう。\nUnable to find a seat, he stood all the way to Osaka.', a: '席が見つからなかったので、彼は大阪までずっと立っていた。/(Being) unable to find a seat の Being が省略された分詞構文で、意味上の主語は he、理由を表す。', exp: '文頭が形容詞 unable で始まっていますが、これは Being unable to find a seat の Being が省略された分詞構文です。Being + 形容詞・名詞 の Being は、ふつう省略されます。be unable to 〜 は「〜できない」(be able to の反対)で、意味上の主語は he です。主節の「ずっと立っていた」の理由になっているので、「〜なので」と訳します。all the way は「(途中ずっと)はるばる」という意味で、to Osaka とつながって「大阪までずっと」となります。' },
      { lv: 3, q: '日本語に合うように、( ) 内の語を並べかえよう。\n「すべてを考えると、その計画は成功だった。」\n( considered / all / things ), the plan was a success.', a: 'All things considered, the plan was a success.', exp: 'All things considered は「すべてを考慮すると」という意味の、独立分詞構文の慣用表現です。もとは When all things are considered で、主語 all things を残し、are を being に変えて省略した形です。all things は「考慮される」側なので、過去分詞 considered になります。主節の主語 the plan とは別の主語なので、all things を消すことはできません。似た形に、Weather permitting(天気がよければ)、Other things being equal(ほかの条件が同じなら)などもあります。' }
    ],
    faq: [
      ['形容詞や名詞で始まる文頭のかたまりは、全部分詞構文なの?', 'ほとんどの場合、Being が省略された分詞構文と考えて読めます。ただし、名詞のかたまりが主語の言いかえ(同格)としてはたらいているだけのこともあります。例:A doctor by profession, he knows a lot about health.(職業は医者なので、彼は健康にくわしい)は、「医者なので」と理由に読めます。一方、意味がはっきりしないときは、無理に「〜なので」と訳さず、「〜である彼は」と主語を説明するように訳すと、文脈に合いやすくなります。'],
      ['Having + 過去分詞 は、いつ使わないといけないの?', '分詞構文の内容が、主節より【前】に起きたことを、はっきり示したいときに使います。例:Having lost my wallet, I couldn\'t buy lunch.(財布をなくしていたので、昼食を買えなかった)。ただし、順番が文脈から明らかなら、Opening the door, I found a cat. のように 〜ing だけで書くこともあります。入試の書きかえ問題では、もとの文が過去完了(had + 過去分詞)や、主節より前の過去形なら Having + 過去分詞、と判断すると確実です。']
    ]
  });

})(WPS.LESSONS);
