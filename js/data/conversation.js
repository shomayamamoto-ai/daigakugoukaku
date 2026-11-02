/* 場面別英会話(オリジナルの会話文)。lines: [話す人(A=相手 / B=あなた), 英語, 和訳] */
window.WPS = window.WPS || {};
WPS.TALK = [
  {
    title: 'カフェでの注文', who: '店員', en: 'You are at a coffee shop and want to order a drink.',
    lines: [
      ['A', 'Hi, what can I get for you?', 'いらっしゃいませ。ご注文は何にしますか?'],
      ['B', 'Can I have a medium iced coffee, please?', 'アイスコーヒーのMサイズをください。'],
      ['A', 'Sure. Would you like milk or sugar?', 'かしこまりました。ミルクか砂糖は入れますか?'],
      ['B', 'Just a little milk, please.', 'ミルクを少しだけお願いします。'],
      ['A', 'For here or to go?', '店内でお召し上がりですか、お持ち帰りですか?'],
      ['B', 'To go, please. How much is it?', '持ち帰りでお願いします。いくらですか?'],
      ['A', "That'll be three fifty.", '3ドル50セントです。'],
      ['B', 'Here you are. Thank you.', 'はい、どうぞ。ありがとうございます。']
    ],
    tips: [['Can I have ~, please?', '〜をください(ていねいな注文)'], ['For here or to go?', '店内か持ち帰りか'], ['Here you are.', 'はい、どうぞ(物を渡すとき)']]
  },
  {
    title: 'ホテルのチェックイン', who: 'フロント', en: 'You are checking into a hotel for your vacation.',
    lines: [
      ['A', 'Good evening. How may I help you?', 'こんばんは。ご用件をうかがいます。'],
      ['B', "Hi, I'd like to check in. I have a reservation under the name Sato.", 'チェックインをお願いします。佐藤の名前で予約しています。'],
      ['A', 'Let me check. Yes, a single room for three nights.', '確認します。はい、シングルルームで3泊ですね。'],
      ['B', "That's right. What time is breakfast?", 'そうです。朝食は何時ですか?'],
      ['A', 'From seven to ten on the second floor.', '7時から10時まで、2階でご用意しています。'],
      ['B', 'Great. Is there free Wi-Fi in the room?', 'いいですね。部屋で無料のWi-Fiは使えますか?'],
      ['A', 'Yes. The password is on your key card holder.', 'はい。パスワードはカードキーのケースに書いてあります。'],
      ['B', 'Thank you very much.', 'どうもありがとうございます。']
    ],
    tips: [["I'd like to ~.", '〜したいのですが(ていねいな希望)'], ['under the name ~', '〜の名前で(予約)']]
  },
  {
    title: 'レストランでの食事', who: '店員', en: 'You are dining at a restaurant and ready to order.',
    lines: [
      ['A', 'Are you ready to order?', 'ご注文はお決まりですか?'],
      ['B', 'Yes. What do you recommend?', 'はい。おすすめは何ですか?'],
      ['A', 'The grilled salmon is very popular.', '焼いたサーモンがとても人気です。'],
      ['B', "Then I'll have the salmon, please.", 'では、サーモンをお願いします。'],
      ['A', 'Would you like soup or salad with that?', 'スープかサラダをおつけしますか?'],
      ['B', "Salad, please. And could I get some water?", 'サラダでお願いします。それと、お水をいただけますか?'],
      ['A', "Of course. I'll be right back.", 'かしこまりました。すぐお持ちします。'],
      ['B', 'Excuse me, could we have the check, please?', 'すみません、お会計をお願いできますか?']
    ],
    tips: [['What do you recommend?', 'おすすめは何ですか'], ["I'll have ~.", '〜にします(注文)'], ['the check', 'お会計・伝票']]
  },
  {
    title: 'ショッピング', who: '店員', en: 'You are shopping for clothes at a department store.',
    lines: [
      ['A', 'Hello. Are you looking for anything special?', 'こんにちは。何かお探しですか?'],
      ['B', "I'm just looking, thanks. Actually, do you have this shirt in blue?", '見ているだけです。あ、このシャツの青はありますか?'],
      ['A', 'Yes. What size are you?', 'ございます。サイズはいくつですか?'],
      ['B', 'Medium, I think. Can I try it on?', 'たぶんMです。試着してもいいですか?'],
      ['A', 'Sure. The fitting room is over there.', 'どうぞ。試着室はあちらです。'],
      ['B', "It's a little tight. Do you have a larger one?", '少しきついです。もう少し大きいものはありますか?'],
      ['A', "Here's a large. How does it fit?", 'こちらがLです。いかがですか?'],
      ['B', "It's perfect. I'll take it.", 'ぴったりです。これをください。']
    ],
    tips: [["I'm just looking.", '見ているだけです'], ['Can I try it on?', '試着してもいいですか'], ["I'll take it.", 'これにします(買います)']]
  },
  {
    title: '空港での会話', who: '係員', en: 'You are at the airport check-in counter.',
    lines: [
      ['A', 'May I see your passport, please?', 'パスポートを見せていただけますか?'],
      ['B', 'Here it is.', 'はい、これです。'],
      ['A', 'Do you have any bags to check?', '預ける荷物はありますか?'],
      ['B', 'Yes, just this suitcase.', 'はい、このスーツケースだけです。'],
      ['A', 'Would you like a window seat or an aisle seat?', '窓側と通路側、どちらの席がよろしいですか?'],
      ['B', 'A window seat, please. What time does boarding start?', '窓側でお願いします。搭乗は何時からですか?'],
      ['A', 'Boarding starts at 2:30 at Gate 15.', '2時30分から、15番ゲートで搭乗開始です。'],
      ['B', 'Thank you. Have a nice day.', 'ありがとうございます。よい一日を。']
    ],
    tips: [['a window seat / an aisle seat', '窓側の席/通路側の席'], ['boarding', '搭乗']]
  },
  {
    title: '道案内を聞く', who: '通りの人', en: 'You are lost and asking a local for directions.',
    lines: [
      ['B', 'Excuse me. Could you tell me how to get to the station?', 'すみません。駅への行き方を教えていただけますか?'],
      ['A', 'Sure. Go straight down this street for two blocks.', 'いいですよ。この道を2ブロックまっすぐ行ってください。'],
      ['B', 'Two blocks. And then?', '2ブロックですね。それから?'],
      ['A', "Turn left at the bank. You'll see it on your right.", '銀行のところを左に曲がると、右手に見えます。'],
      ['B', 'How long does it take on foot?', '歩いてどのくらいかかりますか?'],
      ['A', 'About ten minutes.', '10分くらいです。'],
      ['B', 'Thank you so much for your help.', '助けていただき、本当にありがとうございます。'],
      ['A', "You're welcome. Have a good trip!", 'どういたしまして。よい旅を!']
    ],
    tips: [['Could you tell me how to get to ~?', '〜への行き方を教えてもらえますか'], ['turn left / right', '左/右に曲がる'], ['on foot', '歩いて']]
  },
  {
    title: '病院での受診', who: '医師', en: 'You are visiting a doctor because you do not feel well.',
    lines: [
      ['A', 'What seems to be the problem?', 'どうされましたか?'],
      ['B', "I have a headache and a sore throat.", '頭が痛くて、のども痛いです。'],
      ['A', 'When did it start?', 'いつからですか?'],
      ['B', 'It started yesterday evening.', '昨日の夕方からです。'],
      ['A', 'Do you have a fever?', '熱はありますか?'],
      ['B', 'Yes, a little. About 37.8 degrees.', 'はい、少し。37.8度くらいです。'],
      ['A', "It looks like a cold. Take this medicine after meals and get some rest.", 'かぜのようですね。この薬を食後に飲んで、休んでください。'],
      ['B', 'I see. Thank you, doctor.', 'わかりました。ありがとうございます、先生。']
    ],
    tips: [['I have a headache / a sore throat.', '頭痛がする/のどが痛い'], ['have a fever', '熱がある'], ['after meals', '食後に']]
  },
  {
    title: 'ホームステイ先であいさつ', who: 'ホストファミリー', en: 'You meet your host family for the first time.',
    lines: [
      ['A', 'Welcome! You must be Haruka. How was your flight?', 'ようこそ!あなたがはるかさんね。飛行機はどうだった?'],
      ['B', 'It was long, but I slept well. Nice to meet you.', '長かったけれど、よく眠れました。はじめまして。'],
      ['A', 'Nice to meet you, too. Please make yourself at home.', 'こちらこそ。自分の家だと思ってくつろいでね。'],
      ['B', 'Thank you. This is a small gift from Japan.', 'ありがとうございます。日本からの小さなおみやげです。'],
      ['A', "Oh, how kind of you! What is it?", 'まあ、ご親切に!これは何かしら?'],
      ['B', "They're Japanese sweets. I hope you like them.", '日本のお菓子です。気に入ってもらえるとうれしいです。'],
      ['A', "I'm sure we will. Are you hungry?", 'きっと気に入るわ。おなかはすいている?'],
      ['B', 'A little. Is there anything I can help with?', '少し。何か手伝えることはありますか?']
    ],
    tips: [['Make yourself at home.', 'くつろいでください'], ['How kind of you!', 'ご親切に'], ['Is there anything I can help with?', '何か手伝えることはありますか']]
  }
];
