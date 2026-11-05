/* 図解・第2弾(担当:hseng) */
(function (L) {
  function put(id, idx, key, val) { var x = L[id]; if (!x || !x.secs[idx]) return; var s = x.secs[idx]; if (s.fig || s.flow || s.tmap || s.chain) return; s[key] = val; }

  // ---------- e_h1 文型 ----------
  put('e_h1', 3, 'flow', { title: 'SVOC をとる主な動詞(O is C が成り立つ)', cols: 3, head: ['動詞', '意味', '例'], rows: [
    [['make', 'b'], ['O を C にする', 'k'], ['The news made her happy.', 'gr', 1, 'she is happy']],
    [['keep・leave', 'b'], ['O を C のままにしておく', 'k'], ['Keep the door open.', 'gr', 1, 'the door is open']],
    [['call・name', 'b'], ['O を C と呼ぶ・名づける', 'k'], ['We call him Ken.', 'gr', 1, 'he is Ken']],
    [['find・think', 'b'], ['O が C だとわかる・思う', 'k'], ['I found the book easy.', 'gr', 1, 'the book is easy']],
    [['見分け:O の後ろに be動詞を入れて「O is ○○」が成り立てば SVOC、成り立たなければ SVOO', 'g', 3]]] });
  put('e_h1', 4, 'flow', { title: 'まぎらわしい自動詞と他動詞', cols: 2, head: ['自動詞(O をとらない)', '他動詞(O をとる)'], rows: [
    [['lie - lay - lain', 'b', 1, '横になる・ある'], ['lay - laid - laid', 'r', 1, '〜を置く・横たえる']],
    [['rise - rose - risen', 'b', 1, '上がる(The sun rises.)'], ['raise - raised - raised', 'r', 1, '〜を上げる(raise your hand)']],
    [['lie の過去形と lay の原形は同じ lay → 後ろに O があれば他動詞', 'g', 2]],
    [['前置詞をつけない他動詞', 'o', 2, 'discuss the plan・marry him・enter the room・reach the station・approach the town(× about・with・into・to)']]],
    legend: [['b', '自動詞'], ['r', '他動詞']] });

  // ---------- e_pastperf 過去完了 ----------
  put('e_pastperf', 2, 'flow', { title: '過去のある時点まで「ずっと続いていた」', cols: 2, head: ['動作の動詞(wait・study・rain)', '状態の動詞(know・like)'], rows: [
    [['過去完了進行形', 'r', 1, 'had been + 〜ing'], ['過去完了(継続)', 'b', 1, 'had + 過去分詞(ふつう進行形にしない)']],
    [['I had been waiting for an hour when she finally came.', 'k'], ['I had known him for ten years when he moved away.', 'k']],
    [['どちらも「基準の過去の時点」までの継続。基準は when 〜 などの過去形の節', 'g', 2]]] });
  put('e_pastperf', 7, 'chain', { title: '物語の過去完了:回想の入口と出口', items: [
    ['今の場面', 'Mika stood in front of the old school.', '過去形 stood が「今の場面」の基準'],
    ['入口', 'She had studied there for six years.', '過去完了 → ここから基準より前の思い出'],
    ['回想', 'She had often played in the yard with her friends, …', '長い回想では、最初の1〜2文だけ過去完了で、あとは過去形のことも'],
    ['結果', 'She smiled and walked in.', '今の場面の動作が過去形で出る → 回想の出口(今の場面に戻る)']] });

  // ---------- e_futperf 未来完了 ----------
  put('e_futperf', 1, 'flow', { title: '未来完了の用法と目印', cols: 3, head: ['用法', '意味', '例'], rows: [
    [['完了', 'r', 1, 'by the time 〜 など'], ['〜してしまっているだろう', 'b'], ['The train will have left by the time we get to the station.', 'k']],
    [['経験', 'r', 1, '回数'], ['〜したことになる', 'b'], ['I will have seen it three times.', 'k']],
    [['継続', 'r', 1, 'for 〜'], ['(ずっと)〜していることになる', 'b'], ['By next year, I will have lived here for ten years.', 'k']],
    [['継続の強調', 'o', 1, '未来完了進行形'], ['will have been 〜ing', 'b'], ['By five o\'clock, I will have been studying for three hours.', 'k']]] });
  put('e_futperf', 7, 'flow', { title: '未来の一点で、動作はどの段階か', cols: 2, head: ['未来進行形 will be 〜ing', '未来完了 will have + 過去分詞'], rows: [
    [['その時点で「進行中」', 'b'], ['その時点で「完了済み」', 'r']],
    [['一点:at five・this time tomorrow・then', 'b'], ['期限:by five・by the time 〜', 'r']],
    [['This time tomorrow, I will be flying to London.', 'k'], ['By this time tomorrow, I will have arrived in London.', 'k']],
    [['継続の期間 = 基準の時点 − 始まりの時点(今から数えない)', 'g', 2]]] });

  // ---------- e_tense 時制 ----------
  put('e_tense', 8, 'flow', { title: '未来を表す5つの形と気持ち', cols: 3, head: ['形', '気持ち', '例'], rows: [
    [['① will + 原形', 'b'], ['その場で決めた意志・予測', 'k'], ['"The phone is ringing." "I\'ll get it."', 'k']],
    [['② be going to', 'b'], ['前からの予定・今の兆候からの予測', 'k'], ['Look at those clouds. It\'s going to rain.', 'k']],
    [['③ 現在進行形', 'b'], ['手配済みの近い予定', 'k'], ['I\'m meeting Ken at five.', 'k']],
    [['④ 現在形', 'r'], ['確定した予定(時刻表など)', 'k'], ['The train leaves at 7:10.', 'k']],
    [['⑤ be about to', 'b'], ['まさに〜しようとしている', 'k'], ['The game is about to start.', 'k']],
    [['④の「確定・前提」のはたらき → 副詞節の現在形(If it rains tomorrow)と同じ原理', 'g', 3]]] });
  put('e_tense', 9, 'chain', { title: '1つの文に節が2つあるときの時制の決め方', items: [
    ['手順1', '接続詞すべてに印をつける', 'if・when・while・until・as soon as・as long as など'],
    ['手順2', '節の種類を判定する', '取り除いても文が成り立つ → 副詞節/動詞などの目的語 → 名詞節/名詞の直後 → 形容詞節'],
    ['手順3', '副詞節だけを現在形にする', '完了の意味なら現在完了。名詞節の未来は will'],
    ['結果', '答えが「現在形」と「will」に分かれることが多い', '未来の語(tomorrow など)がどの節にあるかまで確かめ、全部を will にしない']] });

  // ---------- e_aux 助動詞・受動態 ----------
  put('e_aux', 4, 'flow', { title: 'SVOO・SVOC の受動態', cols: 3, head: ['能動態', '受動態', 'ポイント'], rows: [
    [['He gave me a book.', 'b', 1, 'SVOO'], ['I was given a book by him.', 'r'], ['人が主語', 'k']],
    [['(同じ文)', 'b', 1, 'SVOO は2通り'], ['A book was given to me by him.', 'r'], ['物が主語 → 人の前に to', 'k']],
    [['They named the baby Hana.', 'o', 1, 'SVOC'], ['The baby was named Hana.', 'r'], ['C は後ろに残す。C は主語にできない', 'k']],
    [['by 〜 は、だれがしたかが重要でないときや、一般の人(they・people)のとき省略', 'g', 3]]] });
  put('e_aux', 8, 'flow', { title: 'could have・might have の2つの読み', cols: 2, head: ['① 過去についての推量', '② 実現しなかった過去の可能性'], rows: [
    [['〜したかもしれない', 'b', 1, 'may have とほぼ同じ'], ['〜できたのに・〜したかもしれないのに', 'r', 1, '仮定法過去完了の主節と同じ']],
    [['He could have taken the wrong bus.', 'k'], ['You could have called me. I was home all evening.', 'k']],
    [['実際どうだったかは分からない', 'b'], ['実際はそうならなかった(文脈に書かれている)', 'r']],
    [['見分け:if 節を補えれば②(If you had been unlucky, you might have had an accident.)', 'g', 2]]] });

  // ---------- e_inf 不定詞・分詞 ----------
  put('e_inf', 3, 'flow', { title: '分詞は名詞との関係で決める', cols: 3, head: ['', '現在分詞 〜ing', '過去分詞'], rows: [
    [['名詞との関係', 'g'], ['名詞が「する」側(能動)', 'b'], ['名詞が「される」側(受動)', 'r']],
    [['1語 → 名詞の前', 'g'], ['a sleeping baby', 'b'], ['a broken window', 'r']],
    [['語句つき → 名詞の後ろ', 'g'], ['the boy playing tennis', 'b'], ['a car made in Japan', 'r']],
    [['感情', 'g'], ['The game was exciting.', 'b', 1, 'わくわくさせる'], ['I was excited.', 'r', 1, 'わくわくさせられた']]] });
  put('e_inf', 7, 'flow', { title: '名詞 + to 不定詞 の3つの関係', cols: 3, head: ['関係', '名詞 + to 不定詞', 'もとの文'], rows: [
    [['① 名詞が主語', 'b'], ['a friend to help me', 'k'], ['A friend helps me.', 'k']],
    [['② 名詞が目的語', 'r'], ['a book to read', 'k'], ['I read a book.', 'k']],
    [['③ 同格(内容)', 'gr'], ['his decision to leave', 'k'], ['He decided to leave.', 'k']],
    [['前置詞が残る', 'o', 1, 'もとの文に前置詞'], ['a house to live in / a chair to sit on', 'k'], ['live in a house / sit on a chair', 'k']]] });

  // ---------- e_h4 関係詞 ----------
  put('e_h4', 3, 'flow', { title: 'コンマのない関係詞・コンマのある関係詞', cols: 2, head: ['制限用法(コンマなし)', '非制限用法(コンマあり)'], rows: [
    [['先行詞を限定する', 'b'], ['「ちなみに〜」と付け足す', 'r']],
    [['He has two sons who are doctors.', 'k'], ['He has two sons, who are doctors.', 'k']],
    [['医者でない息子がほかにいるかもしれない', 'b'], ['息子は2人だけ(2人とも医者)', 'r']],
    [['that も使える', 'b'], ['that は使えない/which は前の文全体も受けられる', 'r']]] });
  put('e_h4', 7, 'flow', { title: 'もとの2文に戻して関係詞を選ぶ', cols: 2, head: ['もとの2文', '関係詞でつないだ形'], rows: [
    [['He has three sons. All of them are doctors.', 'k'], ['He has three sons, all of whom are doctors.', 'b', 1, 'them(人)→ whom']],
    [['I bought five books. Two of them were very difficult.', 'k'], ['I bought five books, two of which were very difficult.', 'b', 1, 'them(物)→ which']],
    [['I met a girl. Her father is a famous pianist.', 'k'], ['I met a girl whose father is a famous pianist.', 'r', 1, 'her → whose(持ち主と持ち物)']],
    [['前置詞 of の後ろなので who ではなく whom。whose は物にも使える(a house whose roof is red)', 'g', 2]]] });

  // ---------- e_h3 分詞構文 ----------
  put('e_h3', 4, 'flow', { title: 'O が「する」側か「される」側か', cols: 2, rows: [
    [['with + O + 分詞 =「O を〜した状態で」', 'g', 2]],
    [['with her dog following her', 'b', 1, '犬がついてくる → 〜ing'], ['with his eyes closed', 'r', 1, '目が閉じられる → 過去分詞']],
    [['have + O + 過去分詞 =「O を〜してもらう・〜される」', 'g', 2]],
    [['I had my bike repaired.', 'r', 1, '修理してもらった'], ['I had my wallet stolen.', 'r', 1, '盗まれた']],
    [['確かめ:O を主語にした文(His arms were folded.)が成り立つか', 'k', 2]]],
    legend: [['b', 'O がする側'], ['r', 'O がされる側']] });
  put('e_h3', 7, 'chain', { title: '文頭のかたまりの正体を見分ける', items: [
    ['手順1', 'かたまりのすぐ後ろを見る', 'すぐ動詞が来る → 動名詞の主語(Reading books is fun.)'],
    ['手順2', 'コンマ + 主語 + 動詞が続けば分詞構文', 'Reading the letter, she smiled.'],
    ['手順3', '形容詞・名詞・過去分詞で始まるなら (Being) を補う', 'Unable to sleep, … / A kind man, … / Born in Canada, …'],
    ['結果', 'コンマの後ろの主語が、かたまりの意味上の主語', 'Born in Canada, she … → she was born in Canada']] });

  // ---------- e_comp 比較 ----------
  put('e_comp', 1, 'flow', { title: '比較級の2つの重要表現', cols: 2, head: ['the 比較級, the 比較級', '比較級の強調'], rows: [
    [['〜すればするほど、ますます…', 'b', 1, '2つの変化が比例'], ['ずっと〜', 'r', 1, '差が大きい']],
    [['The more you practice, the better you become.', 'k'], ['This book is much more interesting than that one.', 'k']],
    [['前半・後半のどちらにも the', 'b'], ['much・far・even・still・a lot(× very)', 'r']]] });
  put('e_comp', 4, 'flow', { title: 'no longer・クジラの構文・not so much', cols: 2, head: ['表現', '意味'], rows: [
    [['no longer', 'b', 1, '= not … any longer'], ['もはや〜ない', 'k']],
    [['A is no more B than C is D', 'r', 1, 'クジラの構文'], ['C が D でないのと同じように、A も B ではない', 'k', 1, 'no =「差がゼロ」']],
    [['not so much A as B', 'o'], ['A というよりむしろ B', 'k']],
    [['A whale is no more a fish than a horse is. → than の後ろ(馬は魚ではない)から先に訳す', 'g', 2]]] });

  // ---------- e_h2 仮定法 ----------
  put('e_h2', 4, 'flow', { title: 'Without・But for は主節の形で時を決める', cols: 2, head: ['今のこと', '過去のこと'], rows: [
    [['主節:would + 原形', 'b'], ['主節:would + have + 過去分詞', 'r']],
    [['= If it were not for 〜', 'b'], ['= If it had not been for 〜', 'r']],
    [['If it were not for water, nothing could live.', 'k'], ['Without your help, I would have failed.', 'k']],
    [['Without・But for の後ろは名詞(S + V の文は続けない)', 'g', 2]]] });
  put('e_h2', 8, 'flow', { title: '仮定法でていねいに・控えめに言う', cols: 2, head: ['表現', '意味'], rows: [
    [['I would appreciate it if you could 〜', 'b'], ['〜していただけるとありがたいのですが', 'k']],
    [['It would be great if you could 〜', 'b'], ['〜していただけたらうれしいです', 'k']],
    [['Would you mind if I + 過去形 〜?', 'o'], ['〜してもかまいませんか', 'k', 1, 'かまわないなら Not at all.']],
    [['I would say 〜 / I would think 〜', 'gr'], ['(私としては)〜だと思います', 'k', 1, '意見をやわらげる']],
    [['過去形 would・could =「現実から一歩離れる」→ 相手との距離 = ていねいさ', 'g', 2]]] });

  // ---------- e_emph 強調・倒置 ----------
  put('e_emph', 2, 'flow', { title: '「〜するとすぐに」と「S もそうだ」の倒置', cols: 2, rows: [
    [['No sooner had S + 過去分詞 than 〜 / Hardly(Scarcely)had S + 過去分詞 when(before)〜', 'g', 2]],
    [['No sooner had I left home', 'b', 1, '先のこと → 過去完了'], ['than it began to rain.', 'r', 1, '後のこと → 過去形']],
    [['No sooner と組む → than', 'k'], ['Hardly・Scarcely と組む → when・before', 'k']],
    [['So / Neither(Nor)+ 助動詞・be動詞 + S', 'g', 2]],
    [['"I like cats." "So do I."', 'b', 1, '肯定に → So'], ['"I can\'t swim." "Neither can I."', 'r', 1, '否定に → Neither・Nor']]] });
  put('e_emph', 3, 'flow', { title: '省略は補い、挿入は外して読む', cols: 3, head: ['種類', '例', '読み方'], rows: [
    [['S + be動詞の省略', 'b', 1, '副詞節で主語が主節と同じ'], ['When (I was) young, I lived in Kobe.', 'k'], ['省かれた語を補う', 'gr']],
    [['it is の省略', 'b'], ['Fill in this form if (it is) necessary.', 'k'], ['省かれた語を補う', 'gr']],
    [['動詞のくり返しの省略', 'b'], ['You can go if you want to (go).', 'k'], ['前に出た動詞を補う', 'gr']],
    [['挿入', 'r', 1, 'コンマ・ダッシュではさむ'], ['He is, I think, the best player on the team.', 'k'], ['かっこで外す → He is the best player', 'gr']]] });

  // ---------- ex_eng 文法の実戦 ----------
  put('ex_eng', 2, 'flow', { title: '仮定法・提案の that 節の目印', cols: 2, head: ['目印', '答えの形'], rows: [
    [['主節に would have + 過去分詞', 'b'], ['if 節は had + 過去分詞', 'r']],
    [['if 節が過去完了 + 主節に now・today', 'b'], ['主節は would + 原形(混合型)', 'r']],
    [['文頭の Were・Had・Should', 'b'], ['if が省略された仮定法', 'r']],
    [['Without 〜・But for 〜', 'b'], ['主節の形で今か過去かを決める', 'r']],
    [['suggest・insist・demand・propose・recommend + that', 'o'], ['(should +)原形', 'r', 1, '3単現の -s なし・過去形にしない']]] });
  put('ex_eng', 9, 'flow', { title: '動詞はどの名詞に合わせるか', cols: 2, head: ['主語の形', '動詞が合わせるもの'], rows: [
    [['either A or B / neither A nor B / not only A but also B', 'b'], ['B(動詞に近いほう)', 'r']],
    [['A as well as B', 'b'], ['A(中心の名詞)', 'r']],
    [['時間・金額・距離(Ten years・Five thousand yen)', 'b'], ['単数扱い(1つのまとまり)', 'r']],
    [['the police', 'b'], ['複数扱い', 'r']],
    [['Neither my brother nor I am going to the party tonight.', 'g', 2, '動詞のすぐ前の名詞に反射的に合わせない']]] });

  // ---------- hd_eng 難関の英語 ----------
  put('hd_eng', 8, 'flow', { title: '名詞構文を「文」に戻して訳す', cols: 3, head: ['名詞構文', '文に戻す', '自然な訳'], rows: [
    [['His sudden arrival surprised us.', 'b'], ['He arrived suddenly.', 'k', 1, 'sudden → suddenly'], ['彼が突然やって来たので、私たちは驚いた', 'gr']],
    [['The discovery of penicillin saved millions of lives.', 'b'], ['Someone discovered penicillin.', 'k'], ['ペニシリンが発見されたことで、何百万もの命が救われた', 'gr']],
    [['of の後ろは?', 'o'], ['自動詞なら主語', 'k', 1, 'the arrival of the train'], ['他動詞なら目的語', 'k', 1, 'the discovery of penicillin']]] });
  put('hd_eng', 9, 'flow', { title: '否定の慣用表現は部品から直訳する', cols: 3, head: ['表現', '部品からの直訳', '意味'], rows: [
    [['anything but A', 'b'], ['A 以外なら何でも', 'k'], ['決して A ではない', 'r']],
    [['nothing but A', 'b'], ['A 以外の何ものでもない', 'k'], ['A にすぎない・A だけ', 'r']],
    [['far from A', 'b'], ['A から遠い', 'k'], ['決して A ではない', 'r']],
    [['cannot(never)… without 〜ing', 'b'], ['〜しないで…することはない', 'k'], ['…すると必ず〜する', 'r']],
    [['never fail to 〜', 'b'], ['〜しそこなうことがない', 'k'], ['必ず〜する', 'r']]] });

  // ---------- e_h5 単語 ----------
  put('e_h5', 4, 'flow', { title: '多義語は中心の意味から広げる', cols: 3, head: ['単語', '中心の意味', '広がった意味'], rows: [
    [['address', 'b'], ['住所', 'k'], ['(相手に向けて話す)→ 演説する・(問題に)取り組む', 'r']],
    [['issue', 'b'], ['問題(論点)', 'k'], ['(雑誌の)号・発行する', 'r']],
    [['run', 'b'], ['走る', 'k'], ['経営する(run a shop)・(液体が)流れる', 'r']],
    [['cover', 'b'], ['おおう', 'k'], ['(範囲を)ふくむ・取材する・(費用を)まかなう', 'r']],
    [['case', 'b'], ['場合', 'k'], ['事例・事件・箱', 'r']],
    [['知っている意味で訳して文がおかしい → 別の意味を疑う', 'g', 3]]] });
  put('e_h5', 7, 'flow', { title: 'コロケーション:動詞の中心のイメージ', cols: 3, head: ['make(作り出す)', 'take(取りこむ)', 'do(作業をこなす)'], rows: [
    [['make a mistake', 'b'], ['take medicine', 'r'], ['do homework', 'gr']],
    [['make a decision', 'b'], ['take a break', 'r'], ['do the dishes', 'gr']],
    [['make an effort', 'b'], ['take a photo', 'r'], ['do damage', 'gr']],
    [['× do a mistake', 'k'], ['× drink medicine', 'k'], ['', 'e']],
    [['ほかに:heavy rain(× strong rain)・a high price(× an expensive price)・have a dream(× see a dream)', 'g', 3]]] });

  // ---------- e_idiom 熟語 ----------
  put('e_idiom', 2, 'flow', { title: 'to が前置詞の熟語(後ろは名詞・〜ing)', cols: 2, head: ['熟語', '意味・例'], rows: [
    [['look forward to 〜ing', 'r'], ['〜するのを楽しみに待つ', 'k', 1, 'I\'m looking forward to seeing you.']],
    [['be used to 〜ing', 'r'], ['〜するのに慣れている', 'k', 1, 'She is used to getting up early.']],
    [['object to 〜ing', 'r'], ['〜することに反対する', 'k']],
    [['when it comes to 〜ing', 'r'], ['〜することになると', 'k']],
    [['What do you say to 〜ing?', 'r'], ['〜するのはどうですか', 'k']],
    [['used to + 原形(別の表現)', 'b', 1, 'be動詞なし'], ['以前はよく〜した', 'k', 1, 'I used to get up early.']]],
    legend: [['r', 'to は前置詞 → 〜ing'], ['b', 'to + 原形']] });
  put('e_idiom', 7, 'flow', { title: '前置詞の中心イメージと熟語', cols: 3, head: ['前置詞', 'イメージ', '熟語'], rows: [
    [['on', 'b'], ['接触 → 依存・根拠', 'k'], ['depend on・rely on・insist on', 'gr']],
    [['of', 'b'], ['全体の一部・構成', 'k'], ['consist of・be made of', 'gr']],
    [['from', 'b'], ['起点・出どころ', 'k'], ['suffer from・result from・differ from', 'gr']],
    [['in', 'b'], ['中に → 中身・結果の状態', 'k'], ['result in・succeed in・believe in', 'gr']],
    [['with', 'b'], ['〜とともに・相手', 'k'], ['deal with・cope with・agree with', 'gr']],
    [['for', 'b'], ['方向・求めるもの', 'k'], ['look for・ask for・wait for', 'gr']],
    [['agree with(人・意見に同意)と agree to(提案に応じる:to =到達点)', 'g', 3]]] });

  // ---------- e_h6 長文読解 ----------
  put('e_h6', 6, 'flow', { title: '事実と意見・選択肢の言いすぎ', cols: 2, head: ['事実(fact)', '意見(opinion)'], rows: [
    [['確かめられる情報', 'b', 1, '数字・日付・実際の出来事'], ['書き手の評価・判断', 'r', 1, 'best・should・I think・interesting']],
    [['The museum opened in 1990.', 'k'], ['The museum is the best place to visit.', 'k']],
    [['だれが確かめても同じ答え', 'b'], ['人によって感じ方がちがう', 'r']],
    [['選択肢の言いすぎ:本文 some → 選択肢 all、本文 suggest → 選択肢 prove は本文と合わない', 'o', 2]]] });
  put('e_h6', 7, 'flow', { title: '文章全体の4つの型', cols: 3, head: ['型', '目印', 'ねらわれる設問'], rows: [
    [['① 問題 → 解決', 'b'], ['problem・issue・challenge / solution・one way to 〜・should', 'k'], ['筆者が提案する解決策', 'gr']],
    [['② 原因 → 結果', 'r'], ['because of・due to・lead to・result in・as a result', 'k'], ['〜の理由', 'gr']],
    [['③ 比較・対照', 'o'], ['while・whereas・on the other hand・in contrast・similarly', 'k'], ['A と B のちがい', 'gr']],
    [['④ 主張 → 反論 → 再反論', 'p'], ['Some may argue that 〜・Of course 〜, but …・Still・Nevertheless', 'k'], ['筆者の主張(答えは再反論の部分)', 'gr']]] });

  // ---------- el_sound 音の変化 ----------
  put('el_sound', 3, 'flow', { title: '同化:/t/・/d/・/s/ + you の /j/', cols: 3, head: ['組み合わせ', '混ざった音', '例'], rows: [
    [['/t/ + /j/', 'b'], ['/tʃ/', 'r', 1, 'church の最初の音'], ['meet you・don\'t you・Can\'t you …?', 'k']],
    [['/d/ + /j/', 'b'], ['/dʒ/', 'r', 1, 'jump の最初の音'], ['did you・would you・Could you …?', 'k']],
    [['/s/ + /j/', 'b'], ['/ʃ/', 'r', 1, 'she の最初の音'], ['miss you・this year', 'k']],
    [['舌の位置が近いので混ざる → ひとまとまりの音として覚える', 'g', 3]]] });
  put('el_sound', 9, 'flow', { title: '数字の聞き取りのポイント', cols: 2, head: ['数字', '聞き方・読み方'], rows: [
    [['thirteen(13)', 'b'], ['後ろの teen に強勢・/tiːn/ と長く、n まで聞こえる', 'k']],
    [['thirty(30)', 'r'], ['前に強勢・ty は短く弱い', 'k']],
    [['25,300', 'o'], ['twenty-five thousand three hundred(3けたずつ区切る)', 'k']],
    [['1,500', 'o'], ['one thousand five hundred / fifteen hundred', 'k']],
    [['1985', 'gr'], ['nineteen eighty-five(2けたずつ)', 'k']],
    [['a quarter past seven / ten to nine', 'gr'], ['7時15分 / 8時50分', 'k']],
    [['2.5 million', 'o'], ['two point five million = 250万', 'k']]] });

  // ---------- el_short 短い対話 ----------
  put('el_short', 8, 'flow', { title: '会話の決まり文句:直訳と本当の意味', cols: 3, head: ['表現', '直訳', '本当の意味'], rows: [
    [['I couldn\'t agree more.', 'gr'], ['これ以上同意できない', 'k'], ['大賛成だ', 'gr']],
    [['I wish I could.', 'r'], ['できればいいのに', 'k'], ['(残念だけど)できない', 'r']],
    [['It\'s up to you.', 'b'], ['あなた次第だ', 'k'], ['あなたに任せる', 'b']],
    [['Don\'t mention it.', 'o'], ['それを口にしないで', 'k'], ['どういたしまして', 'o']],
    [['Not really.', 'p'], ['本当にではない', 'k'], ['あまり〜ない(控えめな否定)', 'p']]],
    legend: [['gr', '強い同意'], ['r', 'やんわり断る'], ['b', '相手にまかせる'], ['o', 'お礼への返事'], ['p', '控えめな否定']] });
  put('el_short', 9, 'chain', { title: '「次に何をするか」問題の解き方', items: [
    ['手順1', '対話に出てくる行動をすべてメモする', '例:郵便局に行く・切手を買う・本を図書館に返す'],
    ['手順2', '順番の語に注意する', 'first・before・after that・then'],
    ['手順3', '提案や依頼に相手が応じたか確かめる', 'OK・Sure なら実行。断られた提案は選ばない'],
    ['結果', '最初に出た行動にとびつかない', 'but first I have to return this book → 最初にするのは本を返すこと']] });

  // ---------- el_long 長い英語 ----------
  put('el_long', 2, 'flow', { title: 'メモは記号で短く・速く', cols: 4, rows: [
    [['↑', 'b', 1, '増える'], ['↓', 'b', 1, '減る'], ['→', 'b', 1, '結果・変化'], ['=', 'b', 1, '同じ']],
    [['≠', 'r', 1, 'ちがう'], ['×', 'r', 1, 'だめ・反対'], ['○', 'r', 1, 'よい・賛成'], ['?', 'r', 1, '疑問・不明']],
    [['文ではなくキーワード(名詞・数字・固有名詞)だけを書く。英語でも日本語でもよい', 'g', 4]],
    [['2回読みの短い問題などでは、メモせず聞くことに集中するのも手', 'k', 4]]] });
  put('el_long', 8, 'flow', { title: '講義の「定義」と「強調」の合図', cols: 2, head: ['合図', '次に来るもの'], rows: [
    [['X is called Y. / X is known as Y.', 'b'], ['定義:用語 Y の説明', 'k', 1, 'やさしい英語の説明をメモ']],
    [['Y refers to X. / By Y, I mean X.', 'b'], ['定義:Y とは X のこと', 'k']],
    [['in other words / that is', 'b'], ['言いかえ', 'k']],
    [['The key point is 〜 / What I want to stress is 〜', 'r'], ['強調:講義の要点', 'k', 1, '主な内容・内容一致の正解に']],
    [['Remember that 〜 / This is important because 〜', 'r'], ['強調:覚えておくべき点', 'k']]],
    legend: [['b', '定義・言いかえ'], ['r', '強調']] });

  // ---------- el_strategy リスニング戦略 ----------
  put('el_strategy', 0, 'flow', { title: '共通テスト・リスニングの流れ', cols: 2, head: ['前半:2回読み', '後半:1回読み'], rows: [
    [['短い英語を正確に聞き取る', 'b'], ['長い英語から必要な情報を取り出す', 'r']],
    [['1回目で見当 → 2回目で確かめる', 'b'], ['先読みでどこを聞くか決める・即決', 'r']],
    [['音声は最後まで止まらない → 流れに合わせて動く', 'k', 2]],
    [['問題冊子の日本語の場面説明(誰が・どこで・何について)が大きな手がかり', 'g', 2]]] });
  put('el_strategy', 9, 'flow', { title: '英語の語順のまま、チャンクごとに意味をとる', cols: 2, head: ['英語の順(チャンク)', '前から意味をとる'], rows: [
    [['The man', 'b'], ['その男性は', 'k']],
    [['who lives next door', 'r', 1, 'who =「その人は」'], ['(その人は)となりに住んでいて', 'k']],
    [['told me', 'b'], ['私に言った', 'k']],
    [['that the station', 'r', 1, 'that =「〜ということを」'], ['駅が', 'k']],
    [['will be closed', 'b'], ['閉鎖されると', 'k']],
    [['for repairs / next month', 'b'], ['修理のために / 来月', 'k']],
    [['日本語として不自然でも、この順で意味がつかめていれば理解できている', 'g', 2]]] });

  // ---------- ek_eiken 英検 ----------
  put('ek_eiken', 0, 'flow', { title: '英検の級とレベルの目安(低い級 → 高い級)', cols: 4, rows: [
    [['5級', 'k', 1, '中学初級程度'], ['4級', 'k', 1, '中学中級程度'], ['3級', 'k', 1, '中学卒業程度'], ['準2級', 'b', 1, '高校中級程度']],
    [['準2級+', 'b', 1, '準2級プラス・2級との間(2025年度〜)'], ['2級', 'b', 1, '高校卒業程度'], ['準1級', 'r', 1, '大学中級程度'], ['1級', 'r', 1, '大学上級程度']],
    [['高校生の主な目標:準2級・2級・準1級(2級は大学入試の目安になりやすい)', 'g', 4]]],
    legend: [['k', '中学'], ['b', '高校'], ['r', '大学']] });
  put('ek_eiken', 8, 'flow', { title: '上の級へ進むと求められる力', cols: 3, head: ['観点', '下の級', '上の級'], rows: [
    [['① 話題', 'g'], ['身近(学校・家族・趣味)', 'b'], ['社会的(環境・技術・教育・健康)', 'r']],
    [['② 語彙', 'g'], ['具体的(bike・lunch)', 'b'], ['抽象的(environment・responsibility・effect)', 'r']],
    [['③ 文章', 'g'], ['短い文', 'b'], ['関係詞・分詞構文をふくむ長い文・複数の段落', 'r']],
    [['④ 意見の根拠', 'g'], ['個人的(バスが好きだから)', 'b'], ['社会的(車が減れば渋滞や大気汚染が減るから)', 'r']]] });

  // ---------- ek_writing ライティング ----------
  put('ek_writing', 2, 'chain', { title: 'Body:1つの理由の書き方', items: [
    ['観点', '重ならない観点を選ぶ', '個人にとって・社会にとって/時間・お金・健康・人間関係'],
    ['理由', '理由の文を書く', 'First, students can learn about different cultures.'],
    ['具体例', '具体例・説明で理由を支える', 'For example, if they study abroad, they can make friends from many countries.'],
    ['結果', '1つの理由 = 2〜3文', 'ほとんど同じ理由を2つ書くと、1つ分の評価になることがある']] });
  put('ek_writing', 9, 'flow', { title: '主張の強さを調整する表現', cols: 3, head: ['観点', '強すぎる', '調整した表現'], rows: [
    [['① 頻度', 'g'], ['always', 'r'], ['often・usually・sometimes', 'b']],
    [['② 範囲', 'g'], ['all・every', 'r'], ['many・most・some', 'b']],
    [['③ 確実さ', 'g'], ['will・must', 'r'], ['can・may・is likely to', 'b']],
    [['④ 証明の強さ', 'g'], ['prove', 'r'], ['suggest・show', 'b']],
    [['⑤ 一般化', 'g'], ['Students are 〜', 'r'], ['Students tend to 〜・In many cases, 〜', 'b']],
    [['Smartphones always make students lazy. → Smartphones can distract some students from studying.', 'k', 3]]] });

  // ---------- ek_speaking スピーキング ----------
  put('ek_speaking', 3, 'flow', { title: 'イラストを説明する形', cols: 3, head: ['場面', '形', '例'], rows: [
    [['今まさにしている動作', 'b'], ['現在進行形 be + 〜ing', 'k'], ['A man is washing the dishes.', 'k']],
    [['これからしようとしている', 'r'], ['be going to', 'k'], ['A woman is going to open the window.', 'k']],
    [['位置', 'o'], ['on・under・next to・in front of', 'k'], ['A girl is reading a book under a tree.', 'k']],
    [['分からない単語', 'gr'], ['知っている語で言いかえる', 'k'], ['He is cleaning the floor.(「ほうき」が出てこないとき)', 'k']]] });
  put('ek_speaking', 5, 'flow', { title: '聞き返し・つなぎのことば', cols: 2, head: ['場面', '表現'], rows: [
    [['質問が聞き取れない', 'b', 1, 'だまらず英語で聞き返す'], ['Could you say that again, please? / Pardon? / I\'m sorry, could you repeat the question?', 'k']],
    [['考える時間がほしい', 'o', 1, 'だまりこまない'], ['Well, let me see. / That\'s a difficult question, but …', 'k']],
    [['使いすぎは×:1回程度にして、短くても答えを言い切る', 'r', 2]]] });
})(WPS.LESSONS);
