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

  /* ===== e_comp 比較 ===== */
  add('e_comp', {
    secs: [
      {
        h: 'さらに深く:than の後ろで起こる「省略・代動詞・倒置」',
        t: 'than の後ろは、もともと【節(S + V)】です。ただ、くり返しになる部分が省略されたり、別の語に置きかえられたりするので、形が見えにくくなります。than の後ろを「もとの節」に戻せると、比較の文を正確に読めるようになります。\n①【省略】He is taller than I (am).(彼は私より背が高い)→ am が省略されています。\n②【代動詞 do】She sings better than her sister does.(彼女は姉より歌がうまい)→ does は sings の代わりです。\n③【時をずらした比較】The town is quieter than it was ten years ago.(その町は10年前より静かだ)→ 同じものの「今」と「昔」を比べています。than it used to be も同じです。\n④【過去分詞・形容詞だけが残る】The exam was easier than (I had) expected.(試験は思っていたよりやさしかった)/He came home later than usual.(彼はいつもより遅く帰宅した)/She is busier than ever.(彼女はこれまでになく忙しい)\n⑤【倒置】かたい書き言葉では、than の後ろで主語と動詞が入れかわることがあります。He ran faster than did any other runner.(彼はほかのどの走者よりも速く走った)→ 主語 any other runner が長いので、後ろに回っています。\n⑥【than 以下ごとの省略】I need a bigger bag.(もっと大きいかばんが必要だ)→ than this one(これより)が、文脈から分かるので省略されています。\n読解では、than の後ろに何が省略されているかを補うと、【何と何を比べているか】がはっきりします。とくに③の時の比較や④の than expected は、内容一致問題で「予想とちがった」「昔とちがう」という意味をとらえるカギになります。',
        key: 'than の後ろはもともと節。省略・代動詞・時のずれ・倒置を「もとの節」に戻すと、何と何を比べているかが分かる。',
        ex: [{
          q: '何と何を比べているかを明らかにして、和訳しよう。\nThe problem turned out to be more serious than most people had thought.',
          hint: 'than の後ろの had thought の目的語を補ってみよう。',
          steps: [
            'than の後ろは most people had thought で、thought の目的語が欠けています。',
            'もとの形を補うと、than most people had thought (it would be) で、「多くの人が思っていた(問題の深刻さの)程度」と比べています。',
            'つまり、「実際の深刻さ」と「人々が予想していた深刻さ」の比較です。had thought は、turned out(分かった)より前に思っていたことなので、過去完了になっています。',
            '全体は「その問題は、多くの人が思っていたより深刻だと分かった」となります。'
          ],
          a: 'その問題は、多くの人が思っていたよりも深刻だということが分かった。(実際の深刻さと、人々の予想を比べている)',
          check: '同じ内容は The problem was more serious than expected. とも言えます。than expected・than thought を見たら「予想と実際の比較」と読むくせをつけましょう。'
        }]
      },
      {
        h: '実戦演習:the を使う比較の慣用表現(all the 比較級・none the 比較級)',
        t: '入試の和訳では、【all the + 比較級 + for(because)〜】(〜なので、それだけいっそう…)と、【none the + 比較級 + for 〜】(〜だからといって少しも…ない)がよくねらわれます。\nここで比較級の前につく the は、冠詞ではなく「その分だけ」という意味の副詞です。for 〜 や because 〜 が「その分」の理由を表し、all は強め、none は「まったく〜ない」の否定です。\n戦略は、①比較級の前の the を見つけたら、後ろに for・because があるかを探す、②「その理由の分だけ、いっそう〜」と直訳してから、③自然な日本語に整える、の3段階です。\n落とし穴は、all を「すべて」、none を「だれも〜ない」と訳してしまうことです。また、the 比較級, the 比較級(〜すればするほど)と形が似ているので、the が2つあるか1つかも確かめましょう。',
        key: '比較級の前の the は「その分だけ」。all the 比較級 for 〜 は「〜なのでいっそう」、none the 比較級 for 〜 は「〜だからといって少しも…ない」。',
        ex: [
          {
            q: '和訳しよう。\nI like her all the more because she is honest about her weaknesses.',
            hint: 'all the more の the は「その分だけ」。その理由はどこ?',
            steps: [
              'all the more の後ろに because 〜 があるので、【all the + 比較級 + because 〜】の形です。',
              'the は「その分だけ」、because 以下がその理由です。理由は「自分の弱点について正直だから」です。',
              '直訳は「彼女が自分の弱点について正直なので、その分だけいっそう、私は彼女が好きだ」です。',
              '自然な日本語に整えると、「自分の弱点を正直に認めるので、私はいっそう彼女が好きだ」となります。'
            ],
            a: '彼女は自分の弱点に正直なので、私はそれだけいっそう彼女のことが好きだ。',
            check: '「もともと好きだが、その理由でさらに好きになる」という意味であることを確かめましょう。all を「すべて」と訳すと、「すべてもっと好き」という意味の通らない日本語になります。'
          },
          {
            q: '和訳しよう。\nI listened to his long explanation, but I was none the wiser.',
            hint: 'none the + 比較級 は「少しも〜ない」。',
            steps: [
              'none the wiser は【none the + 比較級】の形で、「その分だけ賢くなることがまったくない」という意味です。',
              'ここでは for 〜 が省略されていますが、前の部分から「彼の長い説明を聞いたのに」が、その「分」にあたります。',
              '直訳は「彼の長い説明を聞いたが、私は少しも賢くならなかった」です。',
              'wiser は「事情が分かった」という意味で使われているので、「ちっとも分からなかった」と訳すと自然です。'
            ],
            a: '私は彼の長い説明を聞いたが、ちっとも分からなかった(前より少しも分かるようにならなかった)。',
            check: 'none the wiser は、説明などを聞いた後も「前と同じで、分からないまま」という意味の決まった言い方です。none the less(それでもやはり)も同じしくみで、nonetheless と1語でも書きます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に入る最も適切なものを選ぼう。\nPrices are much higher than ( ) last year.\n① they were ② it was ③ those ④ them', a: '① they were', exp: '比べているのは「今の物価」と「昨年の物価」で、同じものの時のずれを比べる形です。than の後ろはもとの節で、prices を代名詞にすると they、過去のことなので were になります。② it was は、主語の prices(複数)と数が合いません。③ those は than those of last year のように of 〜 をともなう形なら使えますが、those last year とはふつう言いません。④ them は節の主語になれません。比較級の前の much は「ずっと」と差の大きさを強める語です。' },
      { lv: 3, q: '和訳し、less のはたらきを説明しよう。\nShe is less shy than she used to be.', a: '彼女は以前ほど内気ではない。/less + 原級 + than は「〜ほど…ではない」という、程度が低いほうを表す比較(劣等比較)。', exp: 'less は little の比較級で、less + 形容詞 + than 〜 は「〜より…の程度が低い」、つまり「〜ほど…ではない」という意味です。than she used to be は、同じ人の「今」と「昔」を比べる時のずれの比較で、「以前の彼女」と比べています。直訳の「以前より少なく内気だ」では不自然なので、「以前ほど内気ではない」と訳します。同じ内容は、She is not as shy as she used to be. とも書けます。less は「より少ない量」(less money)の意味でも使われます。' },
      { lv: 3, q: '和訳しよう。\nI like him all the better for his faults.', a: '彼には欠点があるので、私はかえっていっそう彼が好きだ。', exp: '【all the + 比較級 + for 〜】の形で、for his faults が「その分」の理由を表します。better は well の比較級で、like 〜 better は「〜のほうが好きだ・〜がもっと好きだ」の意味です。直訳は「彼の欠点の分だけ、いっそう彼が好きだ」です。ふつう欠点は好きになる理由にはなりにくいので、「欠点があるからこそ、かえって」と訳すと、筆者の気持ちがよく伝わります。faults には「欠点」のほか、「(過失の)責任」(It\'s my fault.:私のせいだ)の意味もあります。' }
    ],
    faq: [
      ['「ますます〜」は、比較級でどう表すの?', '【比較級 and 比較級】で表します。例:It is getting colder and colder.(ますます寒くなってきている)。more を使う長い形容詞では、more and more + 原級 にします。例:English is becoming more and more important.(英語はますます重要になっている)。× more important and more important とはしません。get・become・grow などの「〜になる」動詞といっしょに、進行形でよく使われます。'],
      ['as 〜 as possible と as 〜 as S can は、同じ意味なの?', 'どちらも「できるだけ〜」で、ほぼ同じ意味です。例:Come as soon as possible. = Come as soon as you can.(できるだけ早く来て)。as 〜 as S can では、can を文の時制に合わせる必要があります。過去の文なら、He ran as fast as he could.(彼はできるだけ速く走った)と could にします。possible は形容詞なので、時制によって形が変わることはありません。']
    ]
  });

  /* ===== e_h2 仮定法 ===== */
  add('e_h2', {
    secs: [
      {
        h: 'さらに深く:仮定法でていねいにお願いする・控えめに言う',
        t: '仮定法は、事実に反する想像だけでなく、【ていねいな依頼】や【控えめな意見】を言うときにも、毎日のように使われています。if 節で「もし可能なら」という仮定を置き、相手に断る余地を残すことで、押しつけがましさを消しているのです。\n①【I would appreciate it if you could 〜】〜していただけるとありがたいのですが。例:I would appreciate it if you could send me the file by Friday.(金曜日までにファイルを送っていただけるとありがたいのですが)→ it は if 節の内容を指します。\n②【It would be + 形容詞 + if 〜】〜ならうれしい(助かる)のですが。例:It would be great if you could join us.(参加していただけたらうれしいです)\n③【Would you mind if I + 過去形 〜?】〜してもかまいませんか。例:Would you mind if I opened the window?(窓を開けてもかまいませんか)→ 答えは、かまわないなら Not at all. など否定の形になります。\n④【I would say 〜・I would think 〜】(私としては)〜だと思います。例:I would say this plan is a little risky.(この計画は少し危ないように思います)→ 意見を少しやわらかくします。\nこれらの表現では、主節の would と if 節の could(過去形)が、ふつうの仮定法と同じ形でそろっています。「現実から一歩離れた形で言う」という仮定法のしくみが、そのまま「相手との距離をとる=ていねいさ」につながっているのです。\n英作文のメールや手紙の問題では、命令文(Send me 〜.)より、こうした表現を使うと、場面に合った書き方として評価されやすくなります。',
        key: 'I would appreciate it if you could 〜 などのていねいな表現は、仮定法の「現実から一歩離れる」しくみを使って、相手に断る余地を残している。',
        ex: [{
          q: '次の文を、I would appreciate it if 〜 を使って、ていねいな依頼の文に書きかえよう。\nTell me your schedule for next week.',
          hint: '主節は would appreciate it、if 節は could + 原形。',
          steps: [
            'もとの文は命令文なので、目上の人やお客さんに使うと強すぎる言い方です。',
            'I would appreciate it(〜ならありがたい)を主節にします。it は、後ろの if 節の内容を指します。',
            'if 節は「あなたが教えてくれるなら」で、仮定法の形に合わせて could + 原形 にします。if you could tell me 〜 です。',
            'できあがりは、I would appreciate it if you could tell me your schedule for next week. です。'
          ],
          a: 'I would appreciate it if you could tell me your schedule for next week.(来週のご予定を教えていただけるとありがたいのですが)',
          check: 'it を落とした I would appreciate if 〜 は誤りです。appreciate は他動詞なので目的語が必要で、その位置に it を置きます。'
        }]
      },
      {
        h: '実戦演習:長文の仮定法から「本当にあったこと」を読み取る',
        t: '長文読解の内容一致問題では、仮定法の文が出てくると、その【裏返しの事実】が問われることがよくあります。仮定法の文は「実際にはそうではなかった」ことを述べているので、書かれた内容をそのまま事実として選ぶと、まちがえるように作られています。\n戦略は、①would・could・might + have + 過去分詞 や、if 節の had + 過去分詞 を見つけたら、仮定法だと気づく、②if 節と主節の両方を、肯定・否定を逆にして「実際にあったこと」に書きかえる、③書きかえた事実と選択肢を照らし合わせる、の3段階です。\n落とし穴は、if 節が否定(had not 〜)のときです。否定の仮定の裏返しは肯定の事実になるので、頭の中で二重に逆にする必要があります。また、混合型(過去の仮定 + 今の結果)では、裏返しの事実も「過去」と「今」に分かれます。',
        key: '仮定法の文は「事実の裏返し」。if 節と主節の肯定・否定を逆にして、実際にあったことを書き出してから選択肢を選ぶ。',
        ex: [
          {
            q: '次の英文の内容に合うものを1つ選ぼう。\nMr. Sato opened a small bakery in 2015. If a new station had not been built near his shop the next year, he would have closed the bakery within a few years. Today, his bread is so popular that people come from other towns to buy it.\n(和訳:佐藤さんは2015年に小さなパン屋を開いた。もし翌年、店の近くに新しい駅ができていなかったら、彼は数年のうちに店を閉めていただろう。今では彼のパンはとても人気があり、ほかの町からも人々が買いに来る。)\n① The new station was built before the bakery opened.\n② A new station was built near the bakery in 2016.\n③ Mr. Sato closed the bakery within a few years.\n④ People in other towns do not know about the bakery.',
          hint: 'If 〜 had not been built の裏返しの事実は?',
          steps: [
            '2文目は、if 節が had not been built、主節が would have closed なので、仮定法過去完了です。',
            'if 節の裏返しは「実際には、翌年(2016年)店の近くに新しい駅ができた」です。否定の仮定なので、事実は肯定になります。',
            '主節の裏返しは「実際には、店を閉めなかった」です。',
            'したがって、② が本文に合います。① は「翌年」と合わず、③ は事実の逆、④ は3文目(ほかの町からも買いに来る)と矛盾します。'
          ],
          a: '②',
          check: '③ は、仮定法の主節 he would have closed the bakery の語をそのまま使ったひっかけです。仮定法の主節は「実際には起きなかったこと」だと確かめましょう。the next year は2015年の翌年なので2016年です。'
        },
          {
            q: '和訳しよう。\nHad it not been for the map you drew, we would still be lost in the mountains.',
            hint: 'Had で始まる倒置と、主節の still be(今のこと)に注目。',
            steps: [
              '文頭の Had it not been for 〜 は、If it had not been for 〜(〜がなかったら)の if を省略した倒置の形です。過去のことの仮定です。',
              '主節は would still be lost で、would + 原形 なので「今」のことです。過去の仮定と今の結果を組み合わせた混合型です。',
              'the map you drew は、map と you の間に関係代名詞が省略された形で、「あなたが描いてくれた地図」です。',
              '全体は「あなたが描いてくれた地図がなかったら、私たちは今もまだ山の中で迷っているだろう」となります。'
            ],
            a: 'あなたが描いてくれた地図がなかったら、私たちは今もまだ山の中で迷っているだろう。',
            check: '裏返しの事実は、「(過去に)地図があったので、(今は)山で迷っていない」です。still と be が「今の状態」を表していることから、混合型だと確かめられます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に入る最も適切なものを選ぼう。\nI would appreciate it if you ( ) reply by Friday.\n① can ② could ③ will ④ shall', a: '② could', exp: '主節に would があるので、if 節も仮定法の形(過去形)にそろえて could を使います。「もし可能なら返事をいただけるとありがたい」という、ていねいな依頼の表現です。日常の会話やメールでは if you can 〜 が使われることもありますが、仮定法の形にそろえた could のほうが、よりていねいで、文法問題でも正解になります。③ will や ④ shall は、仮定法の形と合いません。appreciate には「感謝する」のほか、「(価値を)正しく理解する・よさが分かる」の意味もあります。' },
      { lv: 3, q: '次の2文の意味のちがいを説明しよう。\n(1) He looks as if he is sick.\n(2) He talks as if he knew everything.', a: '(1) 彼は具合が悪いように見える(本当に具合が悪いのかもしれないと話し手は思っている)。\n(2) 彼はまるで何でも知っているかのように話す(実際は知らないと話し手は思っている)。', exp: 'as if の後ろは、仮定法(過去形)だけでなく、直説法(現在形)も使われます。(1) の is は直説法で、話し手は「本当にそうかもしれない」と考えています。顔色などの根拠がある場合によく使われます。(2) の knew は仮定法で、今のことなのに過去形を使い、「実際はそうではない」という話し手の判断を示しています。つまり as if の後ろの時制は、内容が事実かどうかについての【話し手の判断】を表しているのです。入試の仮定法の問題では、過去形(過去完了)が基本の答えになります。' },
      { lv: 3, q: '和訳し、Suppose のはたらきを説明しよう。\nSuppose you won a million yen, what would you do with it?', a: 'もし100万円当たったら、あなたはそれで何をしますか。/Suppose は「〜と仮定してみよう」という意味で、if と同じように仮定の節を作る。', exp: 'Suppose(Supposing)+ S + V は、「〜だとしたら」という意味で、if 節の代わりに使われます。この文では、won(過去形)と would do が組み合わさった仮定法過去になっています。「実際には当たる可能性は低いが、もし当たったら」という想像の気持ちが出ます。Suppose it rains tomorrow, what will you do? のように直説法で使えば、「現実に起こりうること」として話していることになります。suppose には、動詞で「〜だと思う」(I suppose so.:そうだと思う)、be supposed to 〜(〜することになっている)の意味もあります。' }
    ],
    faq: [
      ['仮定法の主節では、would・could・might のどれを使えばいいの?', '言いたい意味で選びます。would は「〜するだろう」(結果の予測・意志)、could は「〜できるだろう」(可能)、might は「〜するかもしれない」(弱い可能性)です。例:If I had more time, I would travel.(旅行するだろう)/I could travel.(旅行できるだろう)/I might travel.(旅行するかもしれない)。和訳では、助動詞のちがいを訳し分けることが大切です。英作文で迷ったら、いちばん基本の would を使うと安全です。'],
      ['What if 〜? は、どんな意味なの?', '【What (would happen) if 〜?】の省略した形で、「もし〜したらどうなるだろう」という意味です。例:What if we miss the last train?(終電に乗り遅れたらどうしよう)。ほかに、「〜したらどう?」という提案にも使われます。例:What if we take a taxi?(タクシーに乗ったらどうかな)。後ろは、起こりうることなら現在形、ありそうにない想像なら過去形(仮定法)にします。会話文の問題で、相手の心配や提案を表す表現として出てきます。']
    ]
  });

  /* ===== e_emph 強調・倒置・省略・話法 ===== */
  add('e_emph', {
    secs: [
      {
        h: 'さらに深く:What 〜 is … の強調と、場所の倒置',
        t: '強調構文 It is 〜 that … のほかにも、英語には情報の並びを変えて大事な部分を目立たせる形があります。ここでは2つを学びます。\n1つ目は【What 〜 is …】の形です。I need a long holiday.(私には長い休みが必要だ)を、What I need is a long holiday.(私に必要なのは、長い休みだ)とすると、「必要なものは何か」という問いを先に立て、答えの a long holiday を【文の最後】に置くことができます。英語は文の最後に新しい情報(焦点)を置く傾向があるので、この形は答えを強く印象づけます。\nこの形は、動詞のかたまりにも使えます。What I did was (to) call the police.(私がしたのは、警察に電話することだった)。また、【All you have to do is (to) 〜】(あなたは〜しさえすればよい)も同じ仲間です。\n2つ目は、【場所の語句を文頭に出す倒置】です。An old castle stood on the top of the hill. を、On the top of the hill stood an old castle.(丘の上には、古い城が立っていた)とすると、すでに見えている場所(古い情報)から話を始め、新しく登場する主語(an old castle)を最後に置けます。物語の場面の描写でよく使われます。\nこの倒置は、主に be・stand・lie・come・go などの【存在・移動を表す自動詞】で起こります。Here comes the bus.(ほら、バスが来た)も同じです。ただし、主語が代名詞のときは倒置しません。Here it comes.(ほら、来た)が正しく、× Here comes it. とは言いません。代名詞はすでに分かっている古い情報なので、文末に置く理由がないからです。',
        key: 'What 〜 is … は答えを文末に置いて目立たせる形。場所の語句が文頭に出ると、存在・移動の自動詞の後ろに新しい主語が来る倒置が起こる(代名詞の主語では起こらない)。',
        ex: [{
          q: '次の文を、What で始まる強調の文に書きかえ、和訳しよう。\nI want to know the reason for his decision.',
          hint: '「私が知りたいのは〜だ」という形にする。',
          steps: [
            'もとの文で目立たせたいのは、知りたい内容である the reason for his decision です。',
            'それ以外の部分(I want to know)を、What の後ろに入れて主語のかたまりを作ります。What I want to know です。',
            'その後ろに is を置き、目立たせたい部分を文の最後に置きます。',
            'できあがりは、What I want to know is the reason for his decision. です。'
          ],
          a: 'What I want to know is the reason for his decision.(私が知りたいのは、彼がその決断をした理由だ)',
          check: 'What I want to know の what は「〜こと・もの」の関係代名詞で、know の目的語が欠けた不完全な形になっていることを確かめましょう。It is the reason for his decision that I want to know. と強調構文にしても、ほぼ同じ意味になります。'
        }]
      },
      {
        h: '実戦演習:長い否定語句の倒置を「もとの語順」に戻す',
        t: '難関大の和訳では、Never や Little のような1語の否定語だけでなく、【長い否定語句】が文頭に出た倒置がねらわれます。Under no circumstances(どんな事情があっても〜ない)、Not a single 〜(ただ1つの〜も…ない)、At no time(一度も〜ない)、In no way(決して〜ない)などです。また、Such is(was)〜 that …(〜はとても大きいので…)の倒置もよく出ます。\n戦略は、①文頭から、どこまでが前に出された語句かを見きわめる(直後に助動詞・be動詞 + S が来るところまで)、②その語句をもとの位置に戻して、ふつうの語順の文を作る、③ふつうの語順の文を訳してから、強調の気持ちを日本語に加える、の3段階です。\n落とし穴は、倒置のために出てきた did・should などの助動詞を、そのまま訳に入れてしまうことです。did は時制を示すためのもので、「した」と過去の意味になるだけです。',
        key: '倒置の文は、前に出た語句の範囲を決めて、もとの位置に戻してから訳す。did・does は時制を示すだけで、特別な意味はない。',
        ex: [
          {
            q: 'ふつうの語順の文に直し、和訳しよう。\nNot a single word did he say during the meeting.',
            hint: '前に出ているのは Not a single word。did he say がその後ろ。',
            steps: [
              '文頭の Not a single word(ただ1語も〜ない)が前に出され、その後ろが did he say という疑問文の語順になっています。',
              'もとの文に戻すと、he の後ろに否定の did not、動詞 say、目的語 a single word が来ます。He did not say a single word during the meeting. です。',
              '倒置の did は、say が過去のことだと示すためのもので、もとの文の did not の did にあたります。',
              '和訳は「彼は会議の間、ただの一言も話さなかった」です。前に出したことで「一言も」が強調されています。'
            ],
            a: 'He did not say a single word during the meeting./彼は会議の間、ただの一言も話さなかった。',
            check: 'He said not a single word … とも書けますが、ふつうは did not say a single word の形になります。倒置の文を見たら、疑問文の語順を平叙文に戻す作業で確かめましょう。'
          },
          {
            q: 'ふつうの語順の文に直し、和訳しよう。\nSuch was her surprise that she could not say a word.',
            hint: 'Such は、何の内容を表している?',
            steps: [
              '文頭の Such が前に出され、was her surprise と be動詞 + 主語 の順になっています。主語は her surprise です。',
              'もとの文は Her surprise was such that she could not say a word.(彼女の驚きはとても大きかったので、一言も言えなかった)です。',
              'ここで such は「それほど大きなもの」という意味で、that 以下がその程度(結果)を表しています。',
              'さらに自然な文にすると、She was so surprised that she could not say a word. と書きかえられます。'
            ],
            a: 'Her surprise was such that she could not say a word./彼女はあまりに驚いたので、一言も言えなかった。',
            check: 'Such was 〜 that … は、so 〜 that … の倒置(So difficult was the test that …)と同じ「程度と結果」の形です。such のかたまりがどこまでかを、be動詞の位置で見きわめましょう。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に入る最も適切なものを選ぼう。\nAll you have to do is ( ) here until I come back.\n① wait ② waiting ③ waited ④ to waiting', a: '① wait(to wait も可)', exp: 'All you have to do is (to) 〜 は「あなたは〜しさえすればよい」という意味です。直訳は「あなたがしなければならないすべてのことは、〜することだ」で、What 〜 is … の強調と同じく、答え(すること)を文末に置いています。is の後ろは補語で、to 不定詞が基本ですが、to を省いた原形もよく使われます。② waiting や ③ waited は、この形では使いません。until I come back は時の副詞節なので、未来のことでも現在形 come になっている点も確認しましょう。' },
      { lv: 3, q: '次の文の主語と動詞を答え、和訳しよう。\nAt the end of the long hallway stood a tall man in a black coat.', a: '主語:a tall man(in a black coat)、動詞:stood/長い廊下の突き当たりに、黒いコートを着た背の高い男が立っていた。', exp: '文頭の At the end of the long hallway は、前置詞で始まる場所の語句なので主語にはなりません。その後ろに動詞 stood が来て、主語の a tall man in a black coat が最後に置かれた、場所の倒置の文です。もとの語順は A tall man in a black coat stood at the end of the long hallway. です。場所から描写を始め、新しく登場する人物を最後に置くことで、読み手の目が廊下の先へ向かうような効果があります。hallway に冠詞 the がつき、man に a がついていることも、「場所=すでに分かっている」「男=新しく登場する」を示しています。' },
      { lv: 3, q: '和訳しよう。\nUnder no circumstances should you open this door without permission.', a: 'どんな事情があっても、許可なくこのドアを開けてはいけない。', exp: 'Under no circumstances(どんな状況のもとでも〜ない)という否定の語句が文頭に出たので、後ろが should you open と疑問文の語順になっています。もとの文は You should not open this door without permission under any circumstances. です。no の否定の意味が文全体にかかるので、「開けるべきではない(=開けてはいけない)」と訳します。注意書きや規則の文でよく使われる、強い禁止の表現です。circumstance は「状況・事情」で、この表現では複数形 circumstances を使います。' }
    ],
    faq: [
      ['場所の語句を文頭に出せば、いつでも倒置になるの?', 'いいえ。倒置が起こるのは、主に be・stand・lie・come・go などの存在や移動を表す自動詞の文で、しかも主語が名詞のときです。主語が代名詞なら倒置しません。例:Here he comes.(ほら、彼が来た)/Here it is.(はい、どうぞ・ほら、ここにある)。また、目的語をとる他動詞の文では、ふつう倒置は起こりません。In the park we played soccer.(公園で私たちはサッカーをした)は、場所を前に出しただけのふつうの語順です。'],
      ['強調構文 It is 〜 that … と、What 〜 is … は、どう使い分けるの?', 'It is 〜 that … は、強調したい語句を文の前のほうに出し、「ほかでもなく〜が」と対比の気持ちを強く出す形です。What 〜 is … は、まず「何が問題か」を示してから、答えを文の最後に置く形で、説明や意見を述べるときに便利です。また、強調構文では動詞のかたまりを強調しにくいのに対して、What I did was (to) call the police. のように、What 〜 is … なら動作を焦点にできます。英作文では、主張を印象づけたいときに What is important is 〜 がよく使われます。']
    ]
  });

  /* ===== ex_eng 文法問題の解き方 ===== */
  add('ex_eng', {
    secs: [
      {
        h: 'さらに深く:数えられる名詞・数えられない名詞と数量の語',
        t: '誤り指摘や空所補充でよくねらわれるのが、名詞の【数えられる(可算)・数えられない(不可算)】の区別です。日本語では名詞の数をあまり気にしないので、まちがえやすい分野です。\n英語では、名詞を「1つずつ形の決まったもの」として見るか、「全体としての量・種類」として見るかで区別します。たとえば chair(いす)は1脚ずつ数えられますが、【furniture】(家具)は、いす・机・たんすなどをまとめた「家具類」という種類の名前なので、数えられません。\n入試でよく出る不可算名詞:information(情報)、advice(忠告)、news(知らせ)、furniture(家具)、baggage・luggage(手荷物)、homework(宿題)、equipment(設備)、work(仕事)\nこれらには a がつかず、複数形にもなりません。数えたいときは【a piece of 〜】を使います。例:a piece of advice(1つの忠告)、two pieces of furniture(家具2点)\n数量を表す語も、名詞の種類で使い分けます。\n・可算名詞の複数形に:many、few・a few、a number of\n・不可算名詞に:much、little・a little、an amount of\n・どちらにも:a lot of・lots of、some、any、plenty of\n注意したいのは、【同じ語でも意味によって可算・不可算が変わる】ことです。work は「仕事」なら不可算ですが、「作品」なら可算で、the works of Shakespeare(シェイクスピアの作品)と言います。paper も「紙」なら不可算、「新聞・論文」なら可算です。\n選択肢に many と much、few と little が並んでいたら、名詞の数え方の問題だと気づき、後ろの名詞が可算か不可算かを最初に確かめましょう。',
        key: 'information・advice・furniture などは不可算で、a も -s もつかない。many・few は可算、much・little は不可算、a lot of・some はどちらにも使える。',
        ex: [{
          q: '次の文の誤りを直そう。\nShe gave me many useful advices about studying abroad.',
          hint: 'advice は数えられる名詞? 数えられない名詞?',
          steps: [
            'まず名詞 advice に注目します。advice は「忠告・助言」という意味の不可算名詞です。',
            '不可算名詞は複数形にならないので、advices は誤りで、advice にします。',
            'さらに、many は可算名詞の複数形にしか使えないので、不可算名詞に使える a lot of か much に変えます。',
            '肯定文では a lot of を使うのが自然なので、She gave me a lot of useful advice about studying abroad. とします。'
          ],
          a: 'She gave me a lot of useful advice about studying abroad.(彼女は留学について、役に立つ助言をたくさんくれた)',
          check: '数を表したいなら、many useful pieces of advice のように piece を使えば many が使えます。名詞を直したら、前の数量の語も合っているか、セットで確かめましょう。'
        }]
      },
      {
        h: '実戦演習:主語と動詞の一致 ― 近いほうに合わせる・まとまりで見る',
        t: '誤り指摘問題の定番は、主語と動詞の数の一致です。本文で学んだ Each of 〜・The number of 〜 のほかに、【2つの名詞を組み合わせた主語】と【まとまりとして見る主語】がよく出ます。\n①【either A or B・neither A nor B・not only A but also B】→ 動詞は【B(動詞に近いほう)】に合わせます。\n②【A as well as B】→ 中心は A なので、動詞は【A】に合わせます。\n③【時間・金額・距離】→ Ten years・Five thousand yen のように複数形でも、「1つのまとまり」として【単数扱い】にすることが多いです。\n④【the police】→ 警察官たちの集まりとして【複数扱い】です。\n戦略は、①主語のかたまりを丸ごと見つけ、②その中で動詞が合わせる「中心の名詞」を決め、③動詞の形(is・are、has・have、-s)を確かめる、の順です。落とし穴は、動詞のすぐ前の名詞に、反射的に合わせてしまうことです。',
        key: 'either / neither / not only 〜 but also は「近いほう」、A as well as B は「A」に合わせる。時間・金額のまとまりは単数、the police は複数。',
        ex: [
          {
            q: '( ) に入る最も適切なものを選ぼう。\nNeither my brother nor I ( ) going to the party tonight.\n① am ② is ③ are ④ be',
            hint: 'neither A nor B の動詞は、どちらに合わせる?',
            steps: [
              '主語は Neither my brother nor I(兄も私も〜ない)です。',
              'neither A nor B では、動詞は B、つまり動詞に近いほうの名詞に合わせます。B は I です。',
              'I に合う be動詞の現在形は am です。',
              'したがって、① am が正解です。'
            ],
            a: '① am(兄も私も、今夜のパーティーには行かない)',
            check: '「2人だから複数の are」と考えるのがひっかけです。形がぎこちなく感じるときは、My brother isn\'t going to the party tonight, and neither am I. のように書きかえることもできます。'
          },
          {
            q: '( ) に入る最も適切なものを選ぼう。\nThe teacher, as well as the students, ( ) surprised at the news.\n① was ② were ③ have been ④ are',
            hint: 'A as well as B の中心は、A と B のどちら?',
            steps: [
              '主語は The teacher, as well as the students(生徒たちだけでなく先生も)です。',
              'A as well as B は「B だけでなく A も」という意味で、文の中心は A(the teacher)です。',
              'そのため、動詞は単数の the teacher に合わせます。',
              '単数で過去の受動態の形になる ① was が正解です。'
            ],
            a: '① was(生徒たちだけでなく、先生もその知らせに驚いた)',
            check: '直前の the students(複数)につられて were を選ばないことが大切です。コンマではさまれた as well as the students を、いったんかっこでくくると、主語が The teacher だけだと見えます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に入る最も適切なものを選ぼう。\nCould you give me some ( ) on how to prepare for the interview?\n① advice ② advices ③ an advice ④ many advice', a: '① advice', exp: 'advice(忠告・助言)は不可算名詞なので、a(an)がつかず、複数形にもなりません。そのため ② advices と ③ an advice は誤りです。④ many は可算名詞の複数形に使う語なので、不可算名詞 advice には使えません。some は可算・不可算のどちらにも使えるので、some advice が正しい形です。advice の動詞形は advise(忠告する)で、つづりと発音(名詞は語末が /s/、動詞は /z/)がちがう点にも注意しましょう。' },
      { lv: 3, q: '( ) に入る最も適切なものを選ぼう。\nThe police ( ) searching for the missing boy all night.\n① is ② are ③ has ④ was', a: '② are', exp: 'the police は、警察官の集まりを表す名詞で、-s がつかなくても【複数扱い】にします。そのため、be動詞は are です。① is・③ has・④ was は単数の主語に合わせる形なので誤りです。一人の警察官を言うときは、a police officer を使い、a police とは言いません。the police と同じように複数扱いになる名詞に、cattle(牛)、people(人々)があります。people は「民族・国民」の意味のときは可算名詞で、peoples と複数形にもなります。' },
      { lv: 3, q: '次の文の誤りを直し、理由を説明しよう。\nTen years are a long time to wait for someone.', a: 'are → is', exp: 'Ten years は形の上では複数ですが、この文では「10年という1つの期間」をまとまりとして a long time(長い時間)と言いかえています。このように、時間・金額・距離を1つのまとまりとして見るときは、単数扱いにします。例:Five thousand yen is too expensive for a T-shirt.(Tシャツに5,000円は高すぎる)。一方、Ten years have passed since we met.(会ってから10年がたった)のように、1年1年が過ぎていくことを表すときは、複数扱いにすることもあります。数のまとまりで見るか、一つ一つで見るかを考えましょう。' }
    ],
    faq: [
      ['news や mathematics は、-s で終わるのに単数扱いなのはなぜ?', 'news は「新しいことがら」という意味の1つの名詞で、-s は複数を表す語尾ではありません。そのため、The news was surprising.(その知らせは驚くべきものだった)と単数扱いにします。mathematics(数学)、physics(物理学)、economics(経済学)のような学問の名前も、1つの分野を表すので単数扱いです。例:Mathematics is my favorite subject.。語尾の形ではなく、何を表している名詞かで考えましょう。'],
      ['family や team は、単数扱い? 複数扱い?', '集団を1つのまとまりとして見るときは単数、集団の一人一人を意識するときは複数扱いにします。例:My family is large.(私の家族は大家族だ)/My family are all early risers.(私の家族はみんな早起きだ)。複数扱いは、とくにイギリス英語でよく見られ、アメリカ英語では単数扱いが多いとされます。入試の文法問題では、文の意味が「まとまり」なのか「一人一人」なのかを手がかりに判断しましょう。']
    ]
  });

  /* ===== hd_eng 難関大の英語 ===== */
  add('hd_eng', {
    secs: [
      {
        h: 'さらに深く:名詞構文 ― 名詞を「文」に戻して訳す',
        t: '難関大の英文には、動詞や形容詞を名詞に変えて、1つの名詞のかたまりに情報を詰めこんだ表現がよく出ます。これを【名詞構文】といいます。直訳すると不自然な日本語になるので、【名詞を動詞に、形容詞を副詞に戻して】、文の形にして訳すのがコツです。\n例1:His sudden arrival surprised us.\n直訳:彼の突然の到着が、私たちを驚かせた。\n文に戻す:He arrived suddenly.(彼が突然やって来た)\n自然な訳:彼が突然やって来たので、私たちは驚いた。\nここでは、his が arrive の主語、sudden(形容詞)が suddenly(副詞)にあたります。\n例2:The discovery of penicillin saved millions of lives.\n文に戻す:Someone discovered penicillin.(ペニシリンが発見された)\n自然な訳:ペニシリンが発見されたことで、何百万もの命が救われた。\n名詞 + of + 名詞 の of の後ろは、【もとの動詞の主語】のことも、【目的語】のこともあります。the arrival of the train(電車が到着すること)は主語の関係、the discovery of penicillin(ペニシリンを発見すること)は目的語の関係です。見分けるには、もとの動詞が自動詞(arrive)か他動詞(discover)かを考えます。\n名詞構文は、無生物主語の文とよくいっしょに出てきます。どちらも「何が起きたか」を動詞に戻し、「〜したので」「〜したことで」と、人や出来事を主語にして訳すと、自然な日本語になります。',
        key: '名詞構文は、名詞を動詞に、形容詞を副詞に戻して「〜が…すること」と文の形にして訳す。of の後ろが主語か目的語かは、もとの動詞で決まる。',
        ex: [{
          q: '自然な日本語に訳そう。\nThe rapid spread of smartphones has changed the way young people communicate.',
          hint: 'The rapid spread of smartphones を「〜が…すること」に戻そう。',
          steps: [
            '主語は The rapid spread of smartphones で、動詞 spread(広がる)が名詞になっています。',
            '文に戻すと、Smartphones spread rapidly.(スマートフォンが急速に広まった)です。of の後ろの smartphones が主語の関係、rapid が副詞 rapidly にあたります。',
            '述語は has changed、目的語は the way young people communicate(若者が意思を伝え合う方法)です。the way の後ろは「〜する方法」を表す節です。',
            '無生物主語なので、「スマートフォンが急速に広まったことで、〜が変わった」と、出来事を理由のように訳すと自然です。'
          ],
          a: 'スマートフォンが急速に広まったことで、若者どうしの意思の伝え合い方が変わった。',
          check: '直訳の「スマートフォンの急速な広がりは、若者が伝え合う方法を変えた」と比べて、意味が同じかを確かめましょう。採点では、構造が正しくとれていれば、自然な日本語に直したほうが評価されやすくなります。'
        }]
      },
      {
        h: '実戦演習:誤読しやすい否定の慣用表現',
        t: '和訳問題では、否定語をふくむのに意味が肯定になる表現や、否定語がないのに意味が否定になる表現がねらわれます。形だけで判断すると、意味を正反対にとってしまう危険があります。\n代表的なものは、【anything but A】(決して A ではない)、【nothing but A】(A にすぎない・A だけ)、【far from A】(決して A ではない)、【cannot(never)… without 〜ing】(…すると必ず〜する)、【never fail to 〜】(必ず〜する)です。\n戦略は、①but・without・fail・from などの語を見たら、慣用表現ではないかを疑う、②but は「〜以外」、without は「〜なしで」と、部品の意味から直訳を作る、③直訳を自然な日本語に整える、の3段階です。直訳の段階で意味を確かめるので、丸暗記した訳をまちがえて当てはめることを防げます。',
        key: 'but は「〜以外」、without は「〜なしで」と部品から直訳を作ると、anything but・nothing but・cannot … without の意味を取りちがえない。',
        ex: [
          {
            q: '2つの文を和訳し、意味のちがいを説明しよう。\n(1) He is anything but a coward.\n(2) He is nothing but a child.',
            hint: 'but は「〜以外」。anything と nothing のちがいは?',
            steps: [
              'どちらの but も、「〜以外」という意味の前置詞です。',
              '(1) anything but a coward は、直訳すると「おくびょう者以外の何か」です。「何であっても、おくびょう者だけはちがう」ということになります。',
              'そこで (1) は「彼は決しておくびょう者ではない」と訳します。',
              '(2) nothing but a child は、「子ども以外の何ものでもない」です。つまり「ただの子どもにすぎない」と訳します。',
              '同じ but でも、anything(何でも)とつくか、nothing(何もない)とつくかで、意味が正反対になります。'
            ],
            a: '(1) 彼は決しておくびょう者ではない。\n(2) 彼はほんの子どもにすぎない。\n(1) は否定(〜ではない)、(2) は限定(〜だけだ)の意味になる。',
            check: '(1) は He is far from a coward. / He is not a coward at all. と、(2) は He is only a child. と言いかえられます。言いかえて意味が通るかで確かめましょう。'
          },
          {
            q: '和訳しよう。\nI never look at this photo without remembering my school days.',
            hint: 'never … without 〜 は、否定が2つ重なっている。',
            steps: [
              'never(決して〜ない)と without(〜なしで)の、2つの否定が重なっています。',
              '直訳すると、「学生時代を思い出すことなしに、この写真を見ることは決してない」です。',
              '否定が2つ重なると、強い肯定になります。「この写真を見れば、必ず学生時代を思い出す」ということです。',
              '自然な日本語では、「この写真を見るたびに、学生時代を思い出す」と訳せます。'
            ],
            a: 'この写真を見るたびに、私は必ず学生時代を思い出す。',
            check: 'Whenever I look at this photo, I remember my school days. と言いかえて、意味が同じになることを確かめましょう。「思い出さずに見ることはない」と直訳のままにすると、意味は正しくても日本語として不自然です。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '名詞構文に注意して、自然な日本語に訳そう。\nHer refusal to help us surprised everyone.', a: '彼女が私たちを手伝うのを断ったので、みんな驚いた。', exp: '主語の Her refusal to help us は、動詞 refuse(断る)が名詞 refusal になった名詞構文です。文に戻すと、She refused to help us.(彼女は私たちを手伝うのを断った)で、her が refuse の主語にあたります。refuse to 〜 の形が、名詞になっても refusal to 〜 と残っている点にも注目しましょう。直訳の「彼女の、私たちを手伝うことの拒否が、みんなを驚かせた」は不自然なので、出来事を理由にして「〜したので、みんな驚いた」と訳します。' },
      { lv: 3, q: '和訳しよう。\nHis explanation was far from satisfactory.', a: '彼の説明は、決して満足のいくものではなかった。', exp: 'far from 〜 は、直訳すると「〜から遠く離れている」で、そこから「決して〜ではない・〜にはほど遠い」という強い否定の意味になります。not などの否定語がないのに否定の意味になるので、見落としやすい表現です。far from の後ろには、名詞・形容詞・動名詞が来ます。satisfactory は「満足のいく・十分な」という形容詞で、satisfied(満足した:人の気持ち)と使い分けます。far には「遠い」のほか、比較級を強める「ずっと」(far better)の使い方もあります。' },
      { lv: 3, q: '名詞構文に注意して、自然な日本語に訳そう。\nThe failure of the plan was due to a lack of careful preparation.', a: 'その計画が失敗したのは、注意深い準備が足りなかったからだ。', exp: 'この文には、名詞構文が2つあります。1つ目の The failure of the plan は、The plan failed.(計画が失敗した)に戻せます。of の後ろの the plan は、自動詞 fail の主語の関係です。2つ目の a lack of careful preparation は、People did not prepare carefully enough.(十分注意深く準備しなかった)という内容で、lack は「不足・欠けていること」です。be due to 〜 は「〜が原因である」なので、「計画が失敗したのは、〜が足りなかったからだ」と原因を示す形で訳します。' }
    ],
    faq: [
      ['名詞構文は、どんな名詞のときに出てきやすいの?', '動詞や形容詞から作られた名詞のときです。arrival(到着 ← arrive)、discovery(発見 ← discover)、decision(決定 ← decide)、refusal(拒否 ← refuse)、failure(失敗 ← fail)、development(発達 ← develop)、importance(重要性 ← important)などが代表的です。-al・-ery・-sion・-ure・-ment・-ance などの語尾がついた名詞を見たら、もとの動詞・形容詞に戻して「〜が…すること」と読めないかを試しましょう。'],
      ['anything but と nothing but は、なぜ意味が逆になるの?', 'どちらの but も「〜以外」の意味で、ちがいは前の語にあります。anything but A は「A 以外なら何でも(あてはまる)」なので、A だけは当てはまらない、つまり「決して A ではない」になります。nothing but A は「A 以外は何もない」なので、「A だけ・A にすぎない」になります。all but A(A 以外はすべて → ほとんど A)という形もあり、He all but gave up.(彼はほとんどあきらめかけた)のように使います。部品から考えれば、丸暗記しなくても意味を導けます。']
    ]
  });

  /* ===== e_h5 語彙の増やし方 ===== */
  add('e_h5', {
    secs: [
      {
        h: 'さらに深く:コロケーション ― 単語の「相性」を覚える',
        t: '単語の意味を知っていても、英作文や語法問題でまちがえることがあります。その原因の多くは、【コロケーション】(よくいっしょに使われる語の組み合わせ)を知らないことです。\n日本語の言い方をそのまま英語にすると、不自然になる組み合わせがたくさんあります。\n・「値段が高い」→ ○ a high price/× an expensive price(expensive は物について使い、price には high を使う)\n・「強い雨」→ ○ heavy rain/× strong rain(雨や交通量は heavy、風は strong)\n・「薬を飲む」→ ○ take medicine/× drink medicine\n・「夢を見る」→ ○ have a dream/× see a dream\n・「まちがいをする」→ ○ make a mistake/× do a mistake\nなぜこうした相性があるのでしょうか。その一部は、動詞の中心のイメージで説明できます。make は「(新しく)作り出す」なので、make a decision(決定する)・make an effort(努力する)・make a mistake と、何かを生み出すものと結びつきます。take は「取りこむ」なので、take a break(休憩をとる)・take medicine・take a photo と結びつきます。do は「作業をこなす」なので、do homework・do the dishes(皿洗いをする)・do damage(損害を与える)と結びつきます。\nただし、すべてをイメージで説明できるわけではありません。単語帳で新しい語を覚えるときは、日本語訳だけでなく、【例文の中の組み合わせ】をかたまりで覚えましょう。英作文では、自信のない組み合わせを避け、確かに知っているコロケーションを使うことが、減点を防ぐいちばんの方法です。',
        key: '単語には「相性のよい組み合わせ」(コロケーション)がある。日本語の直訳ではなく、make a mistake・heavy rain のように、かたまりで覚える。',
        ex: [{
          q: '正しいほうを選ぼう。\n(1) The price of this bag is very (expensive / high).\n(2) We had (strong / heavy) rain last night.\n(3) Don\'t forget to (drink / take) this medicine after meals.',
          hint: '日本語の「高い」「強い」「飲む」につられないように。',
          steps: [
            '(1) 主語は the price(値段)です。値段が「高い・安い」は high・low で表し、expensive は「(物が)高価な」の意味で物について使います。答えは high です。',
            '(2) 雨の量が多いことは heavy rain と言います。strong は wind(風)などに使います。答えは heavy です。',
            '(3) 薬を「飲む」は、液体の薬であっても take medicine と言うのが基本です。take には「体に取りこむ」イメージがあります。答えは take です。',
            'どれも、日本語の言い方をそのまま英語にすると誤りになる組み合わせです。'
          ],
          a: '(1) high(このかばんの値段はとても高い) (2) heavy(昨夜は大雨だった) (3) take(食後にこの薬を飲むのを忘れないで)',
          check: '(1) は This bag is very expensive. と、主語を物にすれば expensive が使えます。主語が何かを確かめれば、high と expensive を正しく使い分けられます。'
        }]
      },
      {
        h: '実戦演習:長文の中の多義語の意味を決める',
        t: '入試の長文では、figure・account・observe・meet のように、よく知っているつもりの単語が、ちがう意味で使われます。下線部の語の意味を問う問題や、内容一致の選択肢の言いかえで、その意味が問われます。\n戦略は、①その語の品詞を、文の中の位置から決める(名詞か動詞か)、②目的語や前置詞など、いっしょに使われている語(コロケーション)を見る、③知っている意味を1つずつ当てはめて、文脈に合うものを選ぶ、の3段階です。\n落とし穴は、最初に覚えた意味(figure=姿、account=口座)のまま読んで、意味の通らない文を「そういうものだ」と受け入れてしまうことです。訳がおかしいと感じたら、別の意味を疑いましょう。',
        key: '多義語は、品詞 → いっしょに使われる語 → 文脈、の順で意味を決める。訳が不自然なら、別の意味を疑う。',
        ex: [
          {
            q: '次の英文の (1) figures (2) account の意味を答えよう。\nThe government says the number of tourists rose sharply last year, and the (1) figures in its report support this. However, the report does not take the weak yen into (2) account.\n(和訳は解答で示す)',
            hint: '(2) は take A into account という組み合わせになっている。',
            steps: [
              '(1) figures は、the number of tourists rose(旅行者の数が増えた)の話の中で、「報告書の中の〜がこれを裏づけている」と使われています。',
              'figure には「姿・人物・図」などの意味もありますが、ここでは数の話なので、「数字・統計」の意味が文脈に合います。',
              '(2) account は、take the weak yen into account という形で使われています。take A into account は「A を考慮に入れる」という決まった組み合わせです。',
              'したがって、account は「考慮」の意味です。「口座」や「説明」では、文の意味が通りません。'
            ],
            a: '(1) 数字・統計(数値) (2) 考慮(take A into account:A を考慮に入れる)\n和訳:政府は昨年旅行者の数が急増したと言っており、報告書の数字もそれを裏づけている。しかし、その報告書は円安を考慮に入れていない。',
            check: 'account には、「口座」(a bank account)、「説明・報告」(give an account of 〜)、account for(〜を説明する・〜の割合をしめる)などの意味があります。いっしょに使われる語で意味が決まることを確かめましょう。'
          },
          {
            q: '次の2文の observe の意味を、それぞれ答えよう。\n(1) Scientists observed the behavior of the birds for three years.\n(2) All drivers must observe the traffic rules.',
            hint: '目的語が何かに注目しよう。',
            steps: [
              'どちらの observe も、後ろに目的語をとる他動詞です。目的語のちがいに注目します。',
              '(1) の目的語は the behavior of the birds(鳥の行動)で、主語は scientists(科学者)です。3年間にわたって注意深く見ていたので、「観察する」の意味です。',
              '(2) の目的語は the traffic rules(交通規則)で、must(〜しなければならない)とともに使われています。規則は「見る」ものではなく、「守る」ものです。',
              'したがって、(2) は「(規則などを)守る」の意味です。'
            ],
            a: '(1) 観察する(科学者たちは3年間、その鳥の行動を観察した) (2) 守る(すべての運転者は交通規則を守らなければならない)',
            check: 'observe の名詞形も、意味によって分かれます。「観察」は observation、「(規則の)順守」は observance です。名詞形を思い浮かべると、意味のちがいを確かめられます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に入る最も適切な動詞を選ぼう。\nYou need to ( ) a decision by tomorrow.\n① do ② make ③ take ④ get', a: '② make', exp: '「決定する・決心する」は make a decision と言います。make には「新しく作り出す」というイメージがあり、決定・努力(make an effort)・まちがい(make a mistake)・進歩(make progress)など、何かを生み出すものと結びつきます。do は do homework・do the dishes のように「作業をこなす」もの、take は take a break・take a photo のように「取りこむ」ものと結びつきます。decision は動詞 decide の名詞形で、形容詞形は decisive(決定的な・決断力のある)です。' },
      { lv: 3, q: '下線の語に注意して和訳しよう。\nMy father is a heavy sleeper, so the alarm clock did not wake him up.', a: '父は眠りが深い人なので、目覚まし時計が鳴っても起きなかった。', exp: 'heavy sleeper は「眠りが深い人(なかなか起きない人)」という意味のコロケーションです。heavy は「重い」が中心の意味ですが、量や程度が大きいことも表し、heavy rain(大雨)、heavy traffic(交通渋滞)、a heavy smoker(たくさんたばこを吸う人)のように使います。反対に、眠りが浅い人は light sleeper です。直訳の「重い眠る人」では意味が通らないので、heavy が程度を表していると考えます。wake 人 up は「(人)を起こす」という意味です。' },
      { lv: 3, q: '下線の語の意味を答えよう。\nThis new bus service will meet the needs of elderly people in the town.', a: '(必要・要求などを)満たす', exp: 'meet の中心の意味は「会う」ですが、目的語が needs(必要)・demands(要求)・expectations(期待)などのときは、「満たす・応える」という意味になります。「必要と出会う」→「必要にぴったり合う」と考えると分かりやすいでしょう。この文は「この新しいバスの運行は、町の高齢者の必要を満たすだろう」という意味です。meet には、meet a deadline(締め切りに間に合わせる)という使い方もあります。service は「(バスなどの)運行・便」の意味で、「奉仕」だけではない点にも注意しましょう。' }
    ],
    faq: [
      ['コロケーションは、どうやって覚えればいいの?', '単語を1語ずつではなく、【例文や2〜3語のかたまり】で覚えるのがいちばんです。単語帳の例文を音読し、make a decision・heavy rain のように動詞 + 名詞、形容詞 + 名詞の組み合わせに印をつけておきましょう。また、長文を読んだ後に、気になった組み合わせをノートに書き出すのも効果的です。英作文では、自分で組み合わせを作るより、読んだことのあるかたまりを使うほうが安全です。'],
      ['単語帳の日本語訳を1つ覚えるだけでは、だめなの?', '最初の段階としては十分ですが、それだけでは長文や英作文で困ることがあります。1つの日本語訳だけを覚えると、多義語のほかの意味に気づけなかったり、日本語に引きずられた不自然な組み合わせを作ったりしやすいからです。基本の意味を覚えたら、2回目以降の復習で、例文・ほかの意味・品詞の変化を少しずつ足していきましょう。覚える量を一度に増やさず、復習のたびに情報を足すのが長続きするコツです。']
    ]
  });

  /* ===== e_idiom 英熟語 ===== */
  add('e_idiom', {
    secs: [
      {
        h: 'さらに深く:前置詞の中心イメージで熟語を読む',
        t: '「動詞 + 前置詞」の熟語は、前置詞の【中心のイメージ】を知ると、意味がつながって見えてきます。\n【on】「接触」→ 何かにくっついて支えられる → 依存・根拠。depend on(〜にたよる)、rely on(〜をあてにする)、insist on(〜を主張する:ある考えにしがみつく)\n【of】「全体の一部・構成」→ 何から成っているか。consist of(〜から成る)、be made of(〜でできている)\n【from】「起点・出どころ」→ 原因・区別。suffer from(〜に苦しむ:苦しみの出どころ)、result from(〜から生じる)、differ from(〜と異なる:〜から離れている)\n【in】「中に」→ 中身・結果の状態。result in(結果として〜になる)、succeed in(〜に成功する)、believe in(〜の存在・価値を信じる)\n【with】「〜とともに・相手」→ 対処する相手。deal with(〜を処理する)、cope with(〜にうまく対処する)、agree with(〜〈人・意見〉に同意する)\n【for】「方向・求めるもの」→ 求める対象。look for(〜をさがす)、ask for(〜を求める)、wait for(〜を待つ)\nこの見方で、まぎらわしい熟語も区別できます。たとえば、agree with は「人や意見に同意する」、agree to は「提案・計画に応じる」です。to は「到達点」のイメージなので、「提案に行き着いて受け入れる」と考えられます。\nただし、前置詞のイメージは意味を推測する助けにすぎず、すべての熟語をイメージだけで決めることはできません。まず熟語として覚え、イメージは「忘れたときに思い出す手がかり」として使いましょう。',
        key: 'on は接触・依存、of は構成、from は起点・原因、in は中身・結果、with は相手、for は求める対象。前置詞のイメージは、熟語を思い出す手がかりになる。',
        ex: [{
          q: '( ) に適切な前置詞を入れよう。\n(1) Japan depends ( ) other countries for most of its oil.\n(2) The team consists ( ) eleven players.\n(3) He is suffering ( ) a bad cold.',
          hint: 'それぞれ、依存・構成・出どころのどれにあたる?',
          steps: [
            '(1) 「日本は、石油の大部分をほかの国々にたよっている」という依存の意味です。依存は「接触して支えられる」on のイメージなので、depend on です。',
            '(2) 「チームは11人の選手から成る」という構成の意味です。構成は「全体の一部」の of のイメージなので、consist of です。',
            '(3) 「彼はひどいかぜに苦しんでいる」で、苦しみの出どころ(原因)がかぜです。起点の from のイメージなので、suffer from です。',
            'どれも、前置詞のイメージと熟語の意味が結びついています。'
          ],
          a: '(1) on (2) of (3) from',
          check: '(1) の depend on A for B は「B を A にたよる」という形です。for が「求めるもの(石油)」を表していることも、前置詞のイメージで確かめられます。'
        }]
      },
      {
        h: '実戦演習:前置詞1つで意味が逆になる熟語',
        t: '入試では、同じ動詞に別の前置詞がつくことで、意味が逆になったり大きく変わったりする熟語のペアがねらわれます。代表的なのは、【result in(〜という結果になる)と result from(〜から生じる)】、【be made of(材料:見て分かる)と be made from(原料:形が変わっている)】、【consist of(〜から成る)と consist in(〜にある)】です。\n戦略は、①空所の前の動詞を見て、ペアになる熟語があるかを思い出す、②文の中で「原因 → 結果」の向きや、「材料が見えるか」を確かめる、③前置詞のイメージ(from は出どころ、in は結果の中身)で答えを確かめる、の3段階です。\n落とし穴は、日本語訳が似ているので、向きを考えずに選んでしまうことです。とくに result in と result from は、主語が原因か結果かで決まります。',
        key: 'result in は「原因 → 結果」、result from は「結果 ← 原因」。主語が原因か結果かを確かめてから前置詞を選ぶ。',
        ex: [
          {
            q: '( ) に in か from を入れよう。\nLack of sleep can result ( ) poor performance at school. At the same time, poor performance often results ( ) stress and lack of sleep.',
            hint: '主語は原因?結果?',
            steps: [
              '1文目の主語は Lack of sleep(睡眠不足)、後ろは poor performance(成績の不振)です。睡眠不足が原因で、成績不振が結果です。',
              '主語が原因で、後ろに結果が来るので、result in(結果として〜になる)を使います。',
              '2文目の主語は poor performance で、後ろは stress and lack of sleep です。今度は、成績不振が結果で、ストレスや睡眠不足が原因です。',
              '主語が結果で、後ろに原因が来るので、result from(〜から生じる)を使います。'
            ],
            a: 'in / from(睡眠不足は、学校での成績不振につながることがある。同時に、成績不振は、ストレスや睡眠不足から生じることが多い)',
            check: 'result in = lead to・cause、result from = be caused by と言いかえて、意味が通るかを確かめましょう。from は「出どころ」なので、後ろに原因が来ると考えれば覚えやすくなります。'
          },
          {
            q: '( ) に of か from を入れよう。\n(1) Butter is made ( ) milk.\n(2) This chair is made ( ) wood.',
            hint: 'できあがった物を見て、もとの物が分かる?',
            steps: [
              '(1) バターは牛乳からできていますが、バターを見ても、もとの牛乳の形は残っていません。形や性質が変わった【原料】です。',
              '原料は「出どころ」を表す from を使い、be made from milk です。',
              '(2) いすは木でできていて、見れば木だと分かります。形や性質が変わっていない【材料】です。',
              '材料は「構成」を表す of を使い、be made of wood です。'
            ],
            a: '(1) from(バターは牛乳から作られる) (2) of(このいすは木でできている)',
            check: '「見て分かるなら of、分からないなら from」と確かめましょう。また、be made into 〜(〜に加工される:Milk is made into butter.)は、向きが逆になる表現です。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '( ) に適切な前置詞を入れよう。\nThis bag belongs ( ) my sister.', a: 'to', exp: 'belong to 〜 は「〜のものである・〜に所属する」という意味です。to は「到達点・行き先」のイメージで、「そのかばんは姉のところに行き着く(持ち主は姉だ)」と考えると覚えやすくなります。belong は状態を表す動詞なので、ふつう進行形にはしません(× is belonging to)。また、belong to のすぐ後ろには所有代名詞の mine ではなく、me などの目的格が来ます(This bag belongs to me.)。I belong to the tennis club.(テニス部に所属している)のように、所属の意味でも使います。' },
      { lv: 3, q: '( ) に適切な前置詞を入れ、和訳しよう。\nHappiness consists ( ) being satisfied with what you have.', a: 'in/幸せは、自分が持っているもので満足することにある。', exp: 'consist には、consist of 〜(〜から成る)と consist in 〜(〜にある・〜に存する)の2つの使い方があります。この文は「幸せが何から成り立っているか(部品)」ではなく、「幸せの本質がどこにあるか」を述べているので、consist in です。in の「中身」のイメージで、「幸せの中身は〜だ」と考えます。consist in はかたい書き言葉で使われる表現です。what you have は「あなたが持っているもの」で、what は関係代名詞です。どちらも進行形にはしない点も、belong と同じです。' },
      { lv: 3, q: '( ) に適切な前置詞を入れ、和訳しよう。\nShe attributes her success ( ) the support of her family.', a: 'to/彼女は、自分の成功は家族の支えのおかげだと考えている。', exp: 'attribute A to B は「A を B のおかげ(せい)だと考える」という意味です。to は「行き先」のイメージで、「成功(A)の原因を、家族の支え(B)に結びつける」と考えます。よい結果なら「〜のおかげ」、悪い結果なら「〜のせい」と訳し分けます。受動態にすると、Her success is attributed to the support of her family.(彼女の成功は家族の支えのおかげだとされている)です。同じ形をとるものに、owe A to B(A は B のおかげである)があります。' }
    ],
    faq: [
      ['前置詞のイメージだけで、熟語の意味を全部当てられるの?', '当てられない熟語もたくさんあります。make up(仲直りする・化粧する・作り上げる)のように、いくつもの意味をもつものや、歴史の中で意味が変わったものは、イメージだけでは説明できません。前置詞・副詞のイメージは、①覚えた熟語を整理する、②忘れたときに思い出す手がかりにする、③初めて見た熟語の意味を文脈と合わせて推測する、という3つの場面で使うのが効果的です。基本は、例文といっしょに熟語として覚えることです。'],
      ['be anxious about と be anxious for は、どうちがうの?', 'be anxious about 〜 は「〜を心配している」です。例:She is anxious about her exam results.(彼女は試験の結果を心配している)。be anxious for 〜 は「〜を切に望んでいる」です。例:We are anxious for news of the climbers.(私たちは登山者たちの知らせを待ち望んでいる)。about は「〜のまわり・〜について」、for は「求める対象」のイメージです。be anxious to 〜(〜したいと切望している)という形もあります。']
    ]
  });

  /* ===== e_h6 論理マーカー・パラグラフリーディング ===== */
  add('e_h6', {
    secs: [
      {
        h: 'さらに深く:文章全体の「型」を見抜く',
        t: '段落の中の構造(トピックセンテンスと支える文)だけでなく、文章全体にも、よく使われる【型】があります。型が分かると、読んでいる途中で「次に何が来るか」を予測でき、設問の答えがどこにあるかも見当がつきます。\n①【問題 → 解決型】問題点を示し、その解決策を述べる。目印:problem・issue・challenge(課題)/solution・one way to 〜・should。設問は「筆者が提案する解決策は何か」がねらわれます。\n②【原因 → 結果型】ある現象の原因や、その影響を説明する。目印:because of・due to・lead to・result in・as a result。設問は「〜の理由は何か」が中心です。\n③【比較・対照型】2つのものの共通点やちがいを述べる。目印:while・whereas・on the other hand・in contrast・similarly。設問は「A と B のちがい」がねらわれます。\n④【主張 → 反論 → 再反論型】筆者の主張を述べ、予想される反対意見を認めたうえで、もう一度主張を強める。目印:Some may argue that 〜・Of course 〜, but …・Still・Nevertheless。設問は「筆者の主張」が中心で、答えは再反論の部分にあります。\n実際の文章では、型が組み合わさっていることもよくあります。たとえば、問題 → 解決の後に「この方法がどこでも通用するわけではない」という譲歩を入れ、最後に主張をまとめる、という流れです。\n最初の段落を読んだら、「この文章はどの型か」を予想し、余白に「問題→解決?」などとメモしておきましょう。予想が外れたら、読みながら直せばかまいません。',
        key: '文章全体には、問題→解決・原因→結果・比較対照・主張→反論→再反論などの型がある。型を予想すると、答えの場所が予測できる。',
        ex: [{
          q: '次の英文は、どの型で書かれているか答えよう。\nIn many cities, traffic jams waste a lot of time and cause air pollution. One way to solve this problem is to make public transportation cheaper. If buses and trains cost less, more people will leave their cars at home.\n(和訳:多くの都市で、交通渋滞は多くの時間をむだにし、大気汚染を引き起こしている。この問題を解決する1つの方法は、公共交通機関を安くすることだ。バスや電車の料金が下がれば、より多くの人が車を家に置いていくだろう。)',
          hint: '目印になる語 problem・solve に注目しよう。',
          steps: [
            '1文目は、交通渋滞が時間をむだにし、大気汚染を引き起こしているという【問題】を述べています。',
            '2文目に One way to solve this problem(この問題を解決する1つの方法)とあり、【解決策】が示されています。',
            '3文目は、その解決策がなぜ効果的かという説明です。',
            'したがって、この英文は「問題 → 解決型」です。'
          ],
          a: '問題 → 解決型(問題:交通渋滞による時間のむだと大気汚染/解決策:公共交通機関を安くする)',
          check: '1文目の cause air pollution は「原因 → 結果」の表現ですが、文章全体の役割は「問題の提示」です。部分の表現と全体の型を区別して考えましょう。'
        }]
      },
      {
        h: '実戦演習:型と論理マーカーで、筆者の主張と段落の役割をつかむ',
        t: '入試の長文では、「筆者の主張として最も適切なもの」や「この段落の役割」を問う問題がよく出ます。どちらも、文章の型が分かっていれば、答えのある場所がしぼれます。\n戦略は、①最初の数文で型を予想する、②However・As a result・Of course・Still などのマーカーに印をつけ、型のどの部分にいるかを確かめる、③主張は「解決策」や「再反論」の部分、段落の役割は「その段落が型のどこにあたるか」で答える、の3段階です。\n落とし穴は、具体例(ある町の話・ある人の体験)を、筆者の主張そのものと取りちがえることです。具体例は主張を支える材料なので、「この例から筆者は何を言いたいのか」と一段抽象的に考えましょう。',
        key: '筆者の主張は、型の「解決策」や「再反論」の部分にある。具体例は主張を支える材料なので、例から一段抽象的に言いかえる。',
        ex: [
          {
            q: '次の英文を読んで、問いに答えよう。\nMany towns in Japan are losing young people. Shops close, and schools have fewer students every year. One town in the mountains tried a different approach. Instead of building large facilities, it offered empty houses to young families at a very low rent. It also opened a shared office so that people could work remotely. As a result, about thirty families moved there in five years. Of course, this method may not work everywhere; some towns are too far from hospitals, for example. Still, the case shows that small, practical changes can be more effective than expensive projects.\n(和訳:日本の多くの町で若者が減っている。店は閉まり、学校の生徒は毎年減っている。山間のある町は、ちがう方法を試した。大きな施設を建てる代わりに、空き家をとても安い家賃で若い家族に提供した。また、人々が遠隔で働けるように、共同のオフィスを開いた。その結果、5年間でおよそ30家族が移り住んだ。もちろん、この方法はどこでも通用するわけではない。たとえば、病院から遠すぎる町もある。それでも、この例は、小さく実際的な変化のほうが、費用のかかる計画より効果的な場合があることを示している。)\n問:筆者の主張として最も適切なものを選ぼう。\n① All towns should offer empty houses to young families.\n② Large facilities are necessary to attract young people.\n③ Small, practical measures can work better than costly projects.\n④ Towns far from hospitals will lose all their young people.',
            hint: 'Of course 〜 の後の Still 以下は、型のどの部分?',
            steps: [
              '最初の2文は、若者が減っているという【問題】です。',
              '3〜6文目は、ある町の【解決策の具体例】と、その結果(As a result)です。',
              'Of course 〜 で「どこでも通用するわけではない」と譲歩し、Still(それでも)で筆者の考えをまとめています。主張 → 譲歩 → 再反論の流れです。',
              '主張は Still 以下の「小さく実際的な変化は、費用のかかる計画より効果的な場合がある」なので、それを言いかえた ③ が正解です。'
            ],
            a: '③',
            check: '① は具体例をすべての町に広げた「言いすぎ」、② は本文と逆、④ は譲歩の部分の例を大げさにしたものです。can(〜な場合がある)が、正解の選択肢でも can work と保たれていることも確かめましょう。'
          },
          {
            q: '上の英文で、Of course, this method may not work everywhere; some towns are too far from hospitals, for example. の文は、文章の中でどんな役割をしているか、日本語で説明しよう。',
            hint: 'Of course の前と後ろの内容を比べよう。',
            steps: [
              'この文の前では、ある町の成功例(30家族が移り住んだ)が述べられています。',
              'この文は Of course(もちろん)で始まり、「この方法がどこでも通用するわけではない」と、成功例の限界を認めています。',
              'その後の Still(それでも)で、筆者は自分の主張を述べています。',
              'つまりこの文は、予想される反対意見を先に認めておき、その後の主張を説得力のあるものにする【譲歩】の役割をしています。'
            ],
            a: '成功例の方法には限界がある(すべての町で通用するわけではない)と認める譲歩の役割。予想される反論を先に認めることで、Still 以下の筆者の主張を説得力のあるものにしている。',
            check: '「筆者は、この方法に反対している」と答えるのは誤りです。Of course 〜, but(Still)… の型では、前半は筆者の主張ではなく、後半の主張のための前置きです。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '次の3つの文を、意味が通るように並べかえよう。\n(a) As a result, many of them feel tired during the day.\n(b) Many high school students use their phones late at night.\n(c) This shortens the time they spend sleeping.', a: '(b) → (c) → (a)', exp: 'まず、指示語や論理マーカーのない (b) が最初の文になります。(c) の This は、前の文の内容(夜遅くまでスマートフォンを使うこと)をまとめて受けているので、(b) の後に来ます。(a) の As a result(その結果)は、前の文の内容が原因で、後ろが結果であることを示すので、「睡眠時間が短くなる」の後に置きます。また、them は students を指しています。並べかえ問題では、指示語(this・they)と論理マーカーが、前の文とのつながりを示す手がかりになります。' },
      { lv: 3, q: '次の英文の内容に合うものを1つ選ぼう。\nWhile cats were first kept to catch mice in farmers\' houses, dogs were used for many different jobs, such as hunting, guarding and herding sheep.\n① Both cats and dogs were first kept only to catch mice.\n② Dogs had a wider range of jobs than cats.\n③ Cats were used for hunting and guarding.\n④ Dogs were kept mainly in farmers\' houses.', a: '②', exp: 'While は、ここでは「〜する一方で」という対比を表す接続詞です。前半は「猫は、最初は農家でネズミをとるために飼われた」、後半は「犬は、狩り・番・羊の群れの世話など、さまざまな仕事に使われた」です。猫の仕事が1つなのに対して、犬の仕事は多いので、「犬は猫よりはば広い仕事をした」と言いかえた ② が正解です。① は犬について誤り、③ は猫と犬を入れかえたひっかけ、④ は本文にない内容です。while には「〜する間」の意味もあるので、文脈で見分けましょう。' },
      { lv: 3, q: '次の英文の筆者の主張を、日本語1文でまとめよう。\nSome people argue that homework should be banned because it takes away children\'s free time. It is true that too much homework can cause stress. However, a small amount of homework helps students review what they learned and develop good study habits. Therefore, the problem is not homework itself, but how much of it is given.', a: '(例)宿題そのものが問題なのではなく、問題は出される量であり、適度な宿題は役に立つ。', exp: 'この英文は、主張 → 反論 → 再反論の型です。1文目は「宿題は禁止すべきだ」という他の人の意見、2文目の It is true that 〜 は「多すぎる宿題はストレスになる」という譲歩です。3文目の However で筆者の考え(少しの宿題は役に立つ)に転じ、4文目の Therefore で結論をまとめています。結論の not A but B(A ではなく B)の形が、主張の中心です。「宿題は禁止すべきだ」とまとめると、筆者の意見と逆になるので注意しましょう。' }
    ],
    faq: [
      ['文章の型は、最初の段落だけで分かるの?', '見当をつけることはできますが、確定できないこともあります。とくに、最初に一般論を述べてから However で主張に転じる文章や、途中で問題 → 解決から比較・対照に移る文章もあります。最初の段落で型を予想し、However・As a result などのマーカーが出るたびに予想を確かめ、必要なら修正しながら読みましょう。型の予想は「読みの道しるべ」であって、決めつけではありません。'],
      ['筆者の主張が、最後の段落にしかないこともあるの?', 'あります。英語の文章は、最初に主張を述べることが多いですが、問題を示してから考察を重ね、最後に結論を述べる文章もあります。In conclusion・To sum up・Therefore・In short などのマーカーがある最後の段落は、主張がまとめられていることが多いので、ていねいに読みましょう。最初と最後の段落の両方に主張が出てくる文章も多いので、2つを比べて、同じ内容が言いかえられていないかを確かめると、主張をより確実につかめます。']
    ]
  });

  /* ===== el_sound 音の変化 ===== */
  add('el_sound', {
    secs: [
      {
        h: 'さらに深く:数字の聞き取り ― 強勢の位置と「まとまり」の読み方',
        t: 'リスニングで失点しやすいのが、数字です。数字の聞きまちがいは、知識不足というより、【強勢の位置】と【数の読み方のまとまり】を知らないことから起こります。\n①【-teen と -ty】thirteen(13)と thirty(30)のように、つづりも音も似た数があります。手がかりは強勢の位置です。-teen は後ろの teen に強勢があり、長くはっきり /tiːn/ と聞こえます。-ty は前の音節に強勢があり、ty は短く弱く読まれます。アメリカ英語では、thirty の t が、ら行に近い音になることもあります(「サーディ」のように聞こえる)。ただし、数を数えるときなど、-teen の強勢が前に移ることもあるので、最後の音の長さ(/tiːn/ の n まで聞こえるか)もあわせて確かめます。\n②【大きな数】英語は、数を【3けたずつ】区切って読みます。1,000 は thousand、1,000,000 は million です。例:25,300 → twenty-five thousand three hundred。日本語の「万」の区切りとちがうので、「thousand の前の数 × 1,000」と考えます。また、1,500 は one thousand five hundred のほかに、fifteen hundred とも読まれます。\n③【年号・時刻・小数】1985 は nineteen eighty-five と2けたずつ、2026 は twenty twenty-six または two thousand (and) twenty-six と読みます。時刻の a quarter past seven は7時15分、ten to nine は8時50分(9時の10分前)です。2.5 million は two point five million で、250万です。\n数字は、聞いたらすぐに算用数字でメモするのが原則です。英語のまま覚えておこうとすると、次の情報を聞きのがします。',
        key: '-teen は後ろに強勢があり長い、-ty は前に強勢があり短い。大きな数は3けたずつ区切り、thousand・million の前の数をかけ算する。',
        ex: [{
          q: '次の英語を、算用数字で表そう。\n(1) fifteen hundred (2) a quarter past seven (3) nineteen eighty-five (4) two point five million',
          hint: '(1) は「15 × 100」、(2) の quarter は「4分の1」。',
          steps: [
            '(1) fifteen hundred は「15 × 100」で、1,500 です。one thousand five hundred と同じ数です。',
            '(2) quarter は「4分の1」で、1時間の4分の1は15分です。past は「〜を過ぎて」なので、「7時を15分過ぎた」7時15分です。',
            '(3) 年号は2けたずつ読むので、nineteen(19)+ eighty-five(85)で、1985年です。',
            '(4) two point five は 2.5、million は100万なので、2.5 × 1,000,000 = 2,500,000 です。'
          ],
          a: '(1) 1,500 (2) 7:15 (3) 1985(年) (4) 2,500,000',
          check: '(4) は、日本語にすると250万です。million を「100万」と覚えておき、「前の数 × 100万」と計算すれば、けたのまちがいを防げます。'
        }]
      },
      {
        h: '実戦演習:\'d と \'s の正体を文法で決める',
        t: '会話では、I\'d・he\'d・she\'s のような短縮形がとても弱く、速く発音されます。しかも \'d には had と would、\'s には is・has・us(Let\'s)・所有の \'s と、いくつもの正体があります。音だけでは区別できないので、【後ろの形から文法で決める】ことが大切です。\n\'d の見分け方:後ろが【過去分詞】なら had(He\'d already left.)。後ろが【原形】なら would(I\'d like to 〜・I\'d rather 〜)。ただし、had better は後ろが原形でも had です(You\'d better go.)。would have + 過去分詞 は \'d have と聞こえます。\n\'s の見分け方:後ろが【〜ing】なら is(He\'s going.)。後ろが【過去分詞】なら、has(He\'s gone.:完了)か is(It\'s made in Japan.:受動)で、文脈で決めます。Let\'s の \'s は us です。\n落とし穴は、\'d や \'s が聞こえずに、文全体の時制や意味を取りちがえることです。仮定法や完了形の文では、この小さな音が意味を決めています。',
        key: '\'d は後ろが過去分詞なら had、原形なら would(had better は例外)。\'s は後ろが〜ing なら is、過去分詞なら has か受動の is。',
        ex: [
          {
            q: '次の文の \'d が、had と would のどちらかを答えよう。\n(1) He\'d already left when I arrived.\n(2) I\'d rather stay home tonight.\n(3) You\'d better take an umbrella.',
            hint: '\'d の後ろの動詞の形を見よう。',
            steps: [
              '(1) \'d の後ろは already left で、left は leave の過去分詞です。過去分詞の前なので had で、had already left(もう出発していた)という過去完了です。',
              '(2) \'d の後ろは rather stay です。would rather + 原形(むしろ〜したい)の形なので would です。',
              '(3) \'d の後ろは better take です。had better + 原形(〜したほうがよい)の形なので had です。',
              '(3) は後ろが原形でも had になる例外なので、had better は形ごと覚えておきます。'
            ],
            a: '(1) had(私が着いたとき、彼はもう出発していた) (2) would(今夜はむしろ家にいたい) (3) had(かさを持っていったほうがいいよ)',
            check: '(1) は when I arrived(過去の基準)より前のことなので、過去完了になるという文法の面からも確かめられます。'
          },
          {
            q: '次の文の2つの \'d が、それぞれ had と would のどちらかを答え、和訳しよう。\nShe\'d have helped you if you\'d asked her.',
            hint: '仮定法過去完了の形を思い出そう。',
            steps: [
              '1つ目の She\'d の後ろは have helped で、助動詞 + have + 過去分詞 の形です。have は原形なので、\'d は would です。',
              '2つ目の you\'d の後ろは asked で、過去分詞です。そのため \'d は had で、if you had asked(もし頼んでいたら)となります。',
              '全体は、If + had + 過去分詞, would have + 過去分詞 の仮定法過去完了です。',
              '「もし彼女に頼んでいたら、彼女はあなたを手伝っていただろう」と訳します。実際には頼まなかったことになります。'
            ],
            a: 'She\'d = would、you\'d = had/もしあなたが頼んでいたら、彼女は手伝ってくれただろうに。',
            check: '\'d が聞き取れないと、She have helped you if you asked her. のように聞こえ、仮定法だと気づけません。仮定法の形を知っていると、聞こえにくい \'d を文法で補えます。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '放送で「The tickets are thirty dollars.」と流れた。thirteen と聞きまちがえないための手がかりを、2つ答えよう。', a: '(例)①強勢が前の thir にあり、後ろの ty は短く弱い。②最後に長い /tiːn/(ティーン)の音が聞こえない。', exp: 'thirty(30)は、前の音節 thir に強勢があり、後ろの ty は短く弱く読まれます。一方、thirteen(13)は、ふつう後ろの teen に強勢があり、/tiːn/ と長くはっきり読まれ、最後の n まで聞こえます。アメリカ英語では、thirty の t が、ら行に近い音に変わることもあります。どちらか迷ったときは、チケットの値段として自然か、合計金額と合うか、などの文脈も手がかりにします。数字は聞いたらすぐに算用数字でメモしましょう。' },
      { lv: 3, q: '次の文の \'s が、それぞれ何の短縮形かを答えよう。\n(1) He\'s gone to the library.\n(2) She\'s talking on the phone.\n(3) Let\'s take a break.', a: '(1) has (2) is (3) us', exp: '(1) は \'s の後ろが gone(go の過去分詞)です。go の完了形 has gone(行ってしまった)なので has です。受動の is gone とは考えません。(2) は後ろが talking(〜ing)なので、進行形の is です。(3) の Let\'s は Let us(〜しよう)の短縮形で、\'s は us です。\'s には、このほかに Tom\'s bag(トムのかばん)のような所有の意味もあります。音では区別できないので、後ろの形(過去分詞か 〜ing か)と文脈で決めることが大切です。' },
      { lv: 3, q: '次の英語が表す時刻・数を、算用数字で答えよう。\n(1) ten to nine (2) half past eleven (3) forty-two thousand six hundred', a: '(1) 8:50 (2) 11:30 (3) 42,600', exp: '(1) to は「〜まで・〜の前」なので、ten to nine は「9時まであと10分」、つまり8時50分です。to を見て「9時10分」とまちがえないようにしましょう。(2) half は「半分」で、1時間の半分は30分です。past は「〜を過ぎて」なので、11時30分です。(3) thousand の前の forty-two に1,000をかけて42,000、そこに six hundred(600)を足して42,600です。英語は3けたずつ区切るので、日本語の「4万2600」と区切りがちがう点に注意しましょう。' }
    ],
    faq: [
      ['数字は、聞きながら英語のままメモしたほうがいいですか。', '算用数字でメモするのがおすすめです。forty-two thousand のように英語で書こうとすると時間がかかり、次の情報を聞きのがしてしまいます。数字が出そうな問題では、先読みの段階で「値段」「人数」などの枠を作り、聞こえた数字をすぐに書きこみましょう。割引や合計の計算が必要な問題では、計算は放送が終わってからにし、聞いている間は数字を正確に書きとることに集中します。'],
      ['短縮形の \'ll も、聞き取りにくいですか。', 'とても聞き取りにくい音です。I\'ll・we\'ll・it\'ll の \'ll は、弱く短い /l/ の音だけになるので、I go と I\'ll go の区別がつきにくくなります。手がかりは、tomorrow・next week などの未来の語や、その場で決めた意志を表す場面かどうか、という文脈です。I\'ll be there. のように、\'ll の後ろに be が来ると比較的気づきやすいです。音読やディクテーションで、自分でも \'ll を発音する練習をすると、耳でも気づけるようになります。']
    ]
  });

  /* ===== el_short 短い対話 ===== */
  add('el_short', {
    secs: [
      {
        h: 'さらに深く:会話の決まり文句は「文字どおり」に訳さない',
        t: '短い対話の問題では、会話でよく使われる【決まり文句】の意味が分からないと、答えを正反対に選んでしまうことがあります。とくに、否定語が入っているのに意味は肯定、という表現に注意が必要です。\n【強い同意】I couldn\'t agree more.(大賛成だ)→ 直訳は「これ以上同意できない」ですが、「もうこれ以上ないほど同意している」という意味です。You can say that again.(本当にそのとおり)、Tell me about it.(ほんとにそうだよ)も同じ仲間です。\n【やんわり断る】I\'m afraid I can\'t make it.(残念だけど、都合がつかない)→ make it は「間に合う・都合をつける」。I\'ll pass.(私はやめておく)、I wish I could.(できればいいんだけど=できない)、Maybe some other time.(また今度ね)も断りの表現です。\n【判断を相手にまかせる】It\'s up to you.(あなたに任せる)、Either is fine with me.(どちらでもいいよ)\n【あいさつ・お礼への返事】Don\'t mention it.(どういたしまして)、No problem.(いいよ・どういたしまして)\n【控えめな否定】Not really.(あまり〜ない)→ Do you like horror movies? — Not really. は「あまり好きではない」です。\nなぜこうした表現が多いのでしょうか。会話では、相手との関係を保つために、はっきりした No を避けたり、気持ちを大げさに表したりすることがよくあります。決まり文句は、そうした気持ちを短く伝えるための「型」なのです。\n選択肢では、これらの表現が「B agrees with A strongly.」「B cannot come.」のように言いかえられます。決まり文句を見たら、【話し手の立場(賛成か反対か、行くか行かないか)】に置きかえて考えましょう。',
        key: 'I couldn\'t agree more は大賛成、I wish I could は断り。決まり文句は文字どおりに訳さず、話し手の立場(賛成・反対、行く・行かない)に置きかえる。',
        ex: [{
          q: '次の対話で、B は A の意見に賛成しているか、反対しているか答えよう。\nA: I think we should start preparing for the school festival earlier this year.\nB: I couldn\'t agree more. Last year we were in such a hurry.\n(和訳:A:今年は、学園祭の準備をもっと早く始めたほうがいいと思う。B:まったく同感だよ。去年はすごくあわただしかったからね。)',
          hint: 'couldn\'t の否定にまどわされないように。後ろの文もヒント。',
          steps: [
            'B の I couldn\'t agree more. は、直訳すると「これ以上同意することはできないだろう」です。',
            'これは「同意の度合いがもう最大で、これ以上は同意しようがない」という意味で、強い賛成を表す決まり文句です。',
            '続く Last year we were in such a hurry.(去年はとてもあわただしかった)は、早く準備を始めるべき理由になっていて、賛成の立場と合っています。',
            'したがって、B は A の意見に強く賛成しています。'
          ],
          a: '賛成している(強く賛成している)。',
          check: 'couldn\'t の否定だけを聞いて「反対」と選ぶのがひっかけです。決まり文句の後の文が、立場を確かめる手がかりになることが多いので、最後まで聞きましょう。'
        }]
      },
      {
        h: '実戦演習:「次に何をするか」「どこでの会話か」を問う問題',
        t: '短い対話では、「What will the woman do next?(女性は次に何をするか)」や「Where are they talking?(どこで話しているか)」という設問がよく出ます。\n「次の行動」の問題の戦略は、①対話に出てくる行動をすべてメモする、②first・before・after that・then などの【順番の語】に注意する、③提案や依頼に相手が応じたか(OK・Sure)を確かめる、の3段階です。落とし穴は、対話の中で最初に出た行動や、断られた提案を選んでしまうことです。\n「場所」の問題では、場所の名前が直接言われないことが多いので、【場所に結びつく語】(ticket・platform なら駅、prescription なら薬局、check in ならホテル・空港)から判断します。',
        key: '次の行動は、順番の語(first・then)と、提案が受け入れられたかで決まる。場所は、場所に結びつく語の組み合わせから判断する。',
        ex: [
          {
            q: '次の対話を読んで、女性が最初にすることを答えよう。\nW: I\'m going to the post office. Do you need anything?\nM: Actually, could you buy some stamps for me?\nW: Sure. Oh, but first I have to return this book to the library.\nM: The library closes at five, so you\'d better hurry.\n(和訳:女性:郵便局に行くけど、何か必要なものはある? 男性:実は、切手を買ってきてくれる? 女性:いいよ。あ、でも先にこの本を図書館に返さないと。男性:図書館は5時に閉まるから、急いだほうがいいよ。)',
            hint: 'first という語に注目しよう。',
            steps: [
              '対話に出てくる行動は、「郵便局に行く」「切手を買う」「図書館に本を返す」の3つです。',
              '女性は、最初に郵便局に行くと言っていますが、3回目の発言で but first I have to return this book to the library(でも先に、この本を図書館に返さないといけない)と言っています。',
              'first(最初に)という順番の語があるので、図書館に本を返すことが最初の行動です。',
              '男性の「5時に閉まるから急いだほうがいい」も、図書館に先に行くことと合っています。'
            ],
            a: '図書館に本を返しに行く。',
            check: '最初の発言に出た「郵便局に行く」を選ぶのがひっかけです。but first や Oh, wait などの合図の後で、予定の順番が変わっていないかを確かめましょう。'
          },
          {
            q: '次の対話を読んで、(1) 会話の場所、(2) 男性が次にすることを答えよう。\nM: Excuse me. Does this bus go to the city hospital?\nW: No, it doesn\'t. You need the Number 12. It leaves from the stop across the street.\nM: Oh, thank you. I\'ll go over there right away.\n(和訳:男性:すみません。このバスは市立病院に行きますか。女性:いいえ、行きません。12番のバスに乗る必要があります。通りの向かい側の停留所から出ます。男性:ああ、ありがとう。すぐにそちらに行きます。)',
            hint: 'this bus と the stop across the street から、今いる場所を考えよう。',
            steps: [
              '男性は this bus(このバス)と言っているので、バスのすぐ近く、つまりバス停にいると考えられます。',
              '女性の the stop across the street(通りの向かい側の停留所)という言い方も、今いる場所が別のバス停であることを示しています。',
              '男性の目的地は病院ですが、会話をしている場所は病院ではありません。',
              '男性は最後に I\'ll go over there right away.(すぐにそちらに行きます)と言っているので、次の行動は、通りの向かい側のバス停に行って12番のバスに乗ることです。'
            ],
            a: '(1) バス停(バスのそば) (2) 通りの向かい側のバス停に行き、12番のバスに乗る。',
            check: '「病院」という語が聞こえたので「病院」を選ぶのがひっかけです。目的地と、今いる場所を区別しましょう。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '次の対話で、B は映画に行くか答えよう。\nA: We\'re going to see a movie tonight. Do you want to come?\nB: I\'ll pass. I have a lot of homework to do.\n(和訳:A:今夜、映画を見に行くんだ。来る? B:私はやめておく。宿題がたくさんあるから。)', a: '行かない。', exp: 'I\'ll pass. は「(誘いなどを)やめておく・遠慮する」という意味の決まり文句です。pass には「通り過ぎる」という意味があり、「その誘いは通り過ぎる(=見送る)」と考えると分かりやすいでしょう。続く I have a lot of homework to do.(宿題がたくさんある)も、断る理由になっています。pass には、ほかに「(試験に)合格する」(pass the exam)、「(物を)手渡す」(Pass me the salt.)、「(時間が)たつ」(Time passes quickly.)などの意味もあります。' },
      { lv: 3, q: '次の対話で、B の発言の意味として最も適切なものを答えよう。\nA: This summer is so hot. I can\'t sleep at night.\nB: You can say that again.\n(和訳:A:今年の夏は本当に暑いね。夜も眠れないよ。B:(  )。)', a: 'まったくそのとおりだ(A の意見に強く同意している)。', exp: 'You can say that again. は、直訳すると「あなたはそれをもう一度言ってもいい」ですが、「もう一度言ってもいいくらい、そのとおりだ」という強い同意を表す決まり文句です。「もう一度言ってください」という聞き返しの意味ではありません。聞き返すときは、Could you say that again? や Pardon? を使います。似た形でも、can と could、主語や疑問文かどうかで意味がまったく変わるので、決まり文句はかたまりで覚えましょう。' },
      { lv: 3, q: '次の対話を読んで、男性が次にすることを答えよう。\nM: Shall I call the restaurant to book a table for tonight?\nW: Thanks, but I already did it this morning. Could you check the train times instead?\nM: Sure, I\'ll look them up now.\n(和訳:男性:今夜のレストランの席を予約するために、電話しようか。女性:ありがとう、でも今朝もう予約したの。代わりに電車の時刻を調べてくれる? 男性:いいよ、今調べるね。)', a: '電車の時刻を調べる。', exp: '男性は最初に「レストランに電話して予約しようか」と申し出ていますが、女性は Thanks, but I already did it(もう予約した)と断っています。そのうえで、instead(代わりに)を使って「電車の時刻を調べてくれる?」と別のことを頼み、男性が Sure, I\'ll look them up now.(いいよ、今調べる)と応じています。したがって、次の行動は電車の時刻を調べることです。最初に出た「レストランに電話する」を選ぶのがひっかけです。look up は「(辞書・時刻表などで)調べる」という意味で、代名詞 them は look と up の間に置かれています。' }
    ],
    faq: [
      ['会話の決まり文句は、どれくらい覚えればいいですか。', 'まずは、賛成・反対、誘いを受ける・断る、お礼・おわびへの返事など、【立場を表す表現】を優先して覚えましょう。I couldn\'t agree more・I\'ll pass・It\'s up to you・Not really・I wish I could などは、正解を決める手がかりになりやすい表現です。問題を解いていて知らない決まり文句に出会ったら、スクリプトで確かめ、場面といっしょにノートにまとめていくと、自然に数が増えていきます。'],
      ['Do you mind if 〜? と聞かれて、「いいですよ」と答えるときは Yes ですか。', '注意が必要な質問です。mind は「いやだと思う・気にする」という意味なので、Do you mind if I open the window? は「窓を開けたら、あなたはいやですか」とたずねています。「いいですよ」と答えるなら、No, not at all.(いいえ、全然かまいません)や Of course not. のように、否定の形で答えます。Yes と答えると「いやです」という意味になります。ただし実際の会話では、Sure. と答える人もいるので、リスニングでは返事の後の文や様子から判断しましょう。']
    ]
  });

  /* ===== el_long 長い英語(講義・議論) ===== */
  add('el_long', {
    secs: [
      {
        h: 'さらに深く:講義の「定義」と「強調」の合図を聞きのがさない',
        t: '講義では、新しい用語の【定義】と、話し手が特に大事だと考える【強調】の部分が、設問でねらわれやすくなります。どちらにも決まった言い方(合図)があるので、合図を知っておくと、聞くべき場所が分かります。\n【定義の合図】\n・X is called Y.(X は Y とよばれる)/X is known as Y.(X は Y として知られる)\n・Y refers to X.(Y とは X のことを指す)/By Y, I mean X.(Y というのは、X という意味です)\n・in other words(言いかえれば)/that is(つまり)\n例:Food that is thrown away even though it can still be eaten is called "food loss."(まだ食べられるのに捨てられる食品は「フードロス」とよばれる)\n専門用語が分からなくても、定義の合図の前後に、やさしい英語での説明があります。用語そのものより、その説明をメモしましょう。\n【強調の合図】\n・The key point is 〜(大切な点は〜)/What I want to stress is 〜(私が強調したいのは〜)\n・Remember that 〜(〜を覚えておいてください)/This is important because 〜\n強調の合図の後は、講義の要点です。設問の「講義の主な内容」や、内容一致の正解につながることが多くあります。\nさらに、【反対の情報で定義を固める】話し方もあります。This does not mean 〜. Rather, …(これは〜という意味ではない。むしろ…)は、よくある誤解を否定してから、正しい意味を示す型です。not の後ではなく、Rather の後が正しい説明です。',
        key: 'is called・refers to・in other words は定義、The key point is・Remember that は強調の合図。合図の後の説明や要点をメモする。',
        ex: [{
          q: '次の講義の一部を読んで、「フードマイレージ」とは何かを日本語で答えよう。\nWhen we buy food, we don\'t usually think about how far it has traveled. The distance food travels from where it is produced to where it is eaten is called "food miles." In other words, food miles tell us how far our food has come.\n(和訳は解答で示す)',
          hint: 'is called の前の部分と、In other words の後を見よう。',
          steps: [
            '定義の合図 is called が2文目にあります。is called の前の主語が、food miles の説明です。',
            '主語は The distance food travels from where it is produced to where it is eaten(食品が、生産された場所から食べられる場所まで移動する距離)です。',
            'さらに In other words(言いかえれば)の後で、「食品がどれくらい遠くから来たか」と、やさしく言いかえています。',
            'この2つから、food miles は「食品が生産地から消費される場所まで運ばれる距離」のことだと分かります。'
          ],
          a: '食品が、生産された場所から食べられる場所まで運ばれる距離(食品がどれだけ遠くから来たか)。\n和訳:食べ物を買うとき、私たちはふつう、それがどれだけ遠くから運ばれてきたかを考えない。食品が生産された場所から食べられる場所まで移動する距離は「フードマイレージ」とよばれる。言いかえれば、フードマイレージは、私たちの食べ物がどれくらい遠くから来たかを教えてくれる。',
          check: '用語(food miles)を知らなくても、定義の合図の前後を聞けば答えられることを確かめましょう。where it is produced と where it is eaten の where は「〜する場所」という意味です。'
        }]
      },
      {
        h: '実戦演習:講義を聞いてワークシートと内容一致に答える',
        t: '講義の問題では、1回しか聞けない長い英語から、①ワークシートの空欄の情報と、②講義全体の要点の両方を取り出す必要があります。\n戦略は、①先読みで、ワークシートの見出しと空欄に入る情報の種類(数字・割合・理由など)を確かめる、②講義の予告(There are two main reasons …)を聞いたら、メモに枠を作る、③定義・強調の合図と、However などの転換の合図に注意して、要点をメモする、④聞き終わったら、空欄をすぐに埋め、要点のメモから内容一致の選択肢を選ぶ、の4段階です。\n落とし穴は、具体的な数字の聞き取りに集中しすぎて、講義の結論(The key point is 〜)を聞きのがすことです。数字はメモに書いたら、すぐに話の流れに意識をもどしましょう。',
        key: '数字はメモに書いたらすぐに流れへもどる。結論は強調の合図や However の後に来るので、そこで要点をメモする。',
        ex: [
          {
            q: '次の講義の一部を読んで、ワークシートの空欄 ①・② を埋めよう。\n講義:Our city surveyed 500 households about food waste. About 40 percent of them said they throw away food at least once a week. There are two main reasons. The first is that people buy more food than they need. The second is that they forget about food in the back of the refrigerator.\nワークシート:調査した世帯数:500/週1回以上食品を捨てる世帯:約( ① )世帯/主な理由:必要以上に買う、( ② )\n(和訳:私たちの市は、食品の廃棄について500世帯を調査した。そのうち約40パーセントが、少なくとも週に1回は食品を捨てると答えた。主な理由は2つある。1つ目は、必要以上に食品を買うこと。2つ目は、冷蔵庫の奥の食品のことを忘れてしまうことだ。)',
            hint: '① は割合から世帯数を計算する。② は The second の後。',
            steps: [
              '先読みで、① は「世帯の数」、② は「理由」だと確かめておきます。',
              '① 講義では割合(About 40 percent)で言われているので、世帯数に直す必要があります。500 × 0.4 = 200 で、約200世帯です。',
              '② 講義の There are two main reasons. が予告で、The first … The second … と順に理由が述べられています。',
              '2つ目の理由は、they forget about food in the back of the refrigerator(冷蔵庫の奥の食品のことを忘れる)です。'
            ],
            a: '① 200 ② 冷蔵庫の奥の食品を忘れてしまう',
            check: '① で「40」と書くのがひっかけです。空欄の単位(世帯)と、講義の単位(パーセント)がちがうときは、計算が必要です。500 × 40 ÷ 100 = 200 と確かめましょう。'
          },
          {
            q: '講義の続きを読んで、講義の要点として最も適切なものを選ぼう。\n講義の続き:Some people think the best solution is to tell everyone to stop buying too much. However, that is not easy. The key point is that small changes in how we store food can make a big difference. For example, putting older food at the front of the refrigerator helps us remember to eat it.\n(和訳:食べ物を買いすぎないよう、みんなに呼びかけるのがいちばんの解決策だと考える人もいる。しかし、それは簡単ではない。大切な点は、食品の保存のしかたを少し変えるだけで、大きなちがいが生まれうるということだ。たとえば、古い食品を冷蔵庫の手前に置くと、それを食べることを思い出しやすくなる。)\n① Telling people to stop buying too much is the easiest solution.\n② Changing the way we store food can reduce food waste.\n③ People should buy a bigger refrigerator.\n④ Older food should be thrown away first.',
            hint: 'The key point is の後が要点。',
            steps: [
              '1文目の Some people think 〜 は、ほかの人の考え(一般論)です。',
              '2文目の However で、「それは簡単ではない」と一般論を否定しています。',
              '3文目に強調の合図 The key point is があり、その後の「食品の保存のしかたを少し変えるだけで、大きなちがいが生まれうる」が要点です。',
              '4文目の For example は、その要点の具体例です。要点を言いかえた ② が正解です。'
            ],
            a: '②',
            check: '① は However で否定された一般論、③ は本文にない内容、④ は具体例(古い食品を手前に置いて食べる)とは逆の内容です。make a big difference(大きなちがいを生む)が、選択肢では reduce food waste(食品の廃棄を減らす)と言いかえられていることも確かめましょう。'
          }
        ]
      }
    ],
    drill: [
      { lv: 2, q: '講義で次の英文が聞こえた。「ヒートアイランド現象」とは何かを、日本語で答えよう。\nCities are often warmer than the areas around them. This is known as the "heat island" effect.\n(和訳:都市は、まわりの地域よりも気温が高いことが多い。これは「ヒートアイランド」現象として知られている。)', a: '都市が、そのまわりの地域よりも気温が高くなる現象。', exp: '2文目の is known as(〜として知られている)が定義の合図です。主語の This は、前の文の内容「都市は、まわりの地域よりも暖かいことが多い」をまとめて受けています。つまり、heat island effect の説明は、This が指している1文目にあります。このように、定義の合図の前に説明が来ることもあれば、後に来ることもあります。指示語 This・These が何を指しているかを確かめると、用語の意味をつかめます。effect には「効果」のほか、「影響・結果」の意味もあり、ここでは「現象」と訳すと自然です。' },
      { lv: 3, q: '講義で次の英文が聞こえた。話し手が否定している考えと、正しいと述べている考えを、それぞれ日本語で答えよう。\nBeing bilingual does not mean that you speak two languages perfectly. Rather, it means that you can use two languages in your daily life.\n(和訳:バイリンガルであるということは、2つの言語を完ぺきに話せるという意味ではない。むしろ、日常生活で2つの言語を使えるという意味である。)', a: '否定している考え:2つの言語を完ぺきに話せることが、バイリンガルである。/正しいと述べている考え:日常生活で2つの言語を使えることが、バイリンガルである。', exp: 'does not mean 〜. Rather, …(〜という意味ではない。むしろ…)は、よくある誤解を否定してから、正しい意味を示す型です。話し手の考えは、not の後ではなく、Rather の後にあります。リスニングでは、bilingual・two languages・perfectly などの語が聞こえたところで答えを決めると、否定されている部分を正解だと思いこんでしまいます。not と Rather のセットを聞いたら、「前は誤解、後ろが正解」と整理しましょう。rather には、would rather(むしろ〜したい)や rather difficult(かなり難しい)の使い方もあります。' },
      { lv: 3, q: '講義で次の英文が聞こえた。最初の年の利用者数が4,000人だったとき、3年目の利用者数を答えよう。\nIn its second year, the number of people using the new library doubled. In the third year, it increased by another 2,000.\n(和訳:2年目に、新しい図書館の利用者の数は2倍になった。3年目には、さらに2,000人増えた。)', a: '10,000人', exp: '最初の年が4,000人で、2年目に doubled(2倍になった)ので、4,000 × 2 = 8,000人です。3年目は increased by another 2,000(さらに2,000人増えた)なので、8,000 + 2,000 = 10,000人です。by は「差」を表し、increase by 2,000 は「2,000だけ増える」、increase to 2,000 なら「2,000まで増える」です。another は「さらに・もう1つの」という意味で、前の増加に加えて増えたことを示しています。講義の数値の問題では、「何倍」と「何人増えた」を順番に計算する必要があるので、メモに年ごとの数を書きこんでおきましょう。' }
    ],
    faq: [
      ['講義の中で、定義の合図が聞き取れなかったらどうすればいいですか。', '合図の語そのものが聞き取れなくても、用語の前後に、やさしい言いかえや具体例が続くことがよくあります。知らない用語が聞こえたら、「この後に説明が来るはずだ」と予測して、説明の部分をメモしましょう。また、同じ用語が講義の中で何度もくり返されることもあります。1回目で意味が分からなくても、2回目、3回目に出てきたときの文脈から意味を補えます。'],
      ['講義の内容について、自分の知識で答えてもいいですか。', '答えは、必ず講義の内容にもとづいて選びます。背景知識は、内容を予測したり、聞き取りを助けたりするのに役立ちますが、講義で述べられていないことを正解にしてはいけません。とくに、一般によく言われていることでも、講義の話し手が否定している場合があります。「講義でそう言っていたか」をメモで確かめ、自分の知識と講義の内容がちがうときは、講義の内容を優先しましょう。']
    ]
  });

})(WPS.LESSONS);
