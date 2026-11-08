/*
 * 英単語帳(本ごと・Partごと)。
 * 書式:1行に1語「見出し|意味」。派生語は行末に「|派」をつけ、もとの語のすぐ後に置きます。
 * 意味は、一般的な辞書的意味をもとに、このアプリ用に書いたものです。
 * いまは Base(旧「大学受験 基礎」)Part 1〜14 を入力済み。ほかは準備中(データを受け取りしだい追加)。
 */
window.WPS = window.WPS || {};
WPS.VBOOKS = [
  { id: 'jh', name: '中学英単語', total: 1657, bank: 'en_jhb', named: 1, desc: '高校入試レベルの基本語。高校生は中学の復習用にも使えます。',
    parts: [[569, 0, '小学校の復習'], [275, 0, '中学1年'], [425, 0, '中学2年'], [388, 0, '中学3年']] },
  { id: 'base', name: 'Base', desc: '共通テスト〜中堅大学レベルの基本語。まずはこの1冊を固めます。', bank: 'en_h', total: 3141,
    parts: [[188, 112], [217, 83], [217, 83], [236, 64], [239, 61], [289, 11], [248, 52], [206, 94], [220, 80], [241, 59], [250, 50], [235, 65], [211, 46], [144, 0, '基礎・標準の補充']] },
  { id: 'plus', name: 'Plus', total: 1631, bank: 'en_plus', desc: 'Base の次に覚える、国公立2次・難関私大レベルの語。',
    parts: [[226, 31], [229, 25], [270, 14], [293, 7], [229, 19], [218, 14], [166, 3]] }, // Part 1〜7。見出し1631語＋派生113語
  { id: 'idiom', name: '英熟語', total: 1376, bank: 'en_idm', named: 1, desc: '共通テスト〜MARCH レベルでよく出る熟語。',
    parts: [[100, 0, '共通テスト①'], [100, 0, '共通テスト②'], [54, 0, '共通テスト③'], [100, 0, 'MARCH①'], [100, 0, 'MARCH②'], [100, 0, 'MARCH③'], [100, 0, 'MARCH④'], [100, 0, 'MARCH⑤'], [100, 0, 'MARCH⑥'], [100, 0, 'MARCH⑦'], [100, 0, 'MARCH⑧'], [78, 0, 'MARCH⑨'], [100, 0, '早慶①'], [100, 0, '早慶②'], [44, 0, '早慶③']] },
  { id: 'gmarch', name: 'GMARCH', desc: 'GMARCH の入試でよく出る語(準備中)。' },
  { id: 'kankan', name: '関関同立', desc: '関関同立の入試でよく出る語(準備中)。' },
  { id: 'sokei', name: '早慶上理', note: '学部別に選べる', bank: 'en_sokei', named: 1, desc: '早稲田・慶應・上智・東京理科大の入試に出た語を、大学・学部ごとに選べます。',
    parts: [[106, 0, '早稲田 政治経済'], [240, 0, '慶應 文'], [124, 0, '早稲田 理工'], [122, 0, '慶應 看護医療'], [141, 0, '早稲田 国際教養'], [176, 0, '慶應 経済']] },
  { id: 'nankoku', name: '難関国立大学', desc: '難関国立大学の2次試験でよく出る語(準備中)。' },
  { id: 'kyutei', name: '旧帝国大学', desc: '旧帝国大学の入試でよく出る語(準備中)。' },
  { id: 'ikka', name: '東京一科', desc: '東京大・一橋大・東京科学大の入試でよく出る語(準備中)。' },
  { id: 'toeic', name: 'TOEIC®頻出', grp: 'more', desc: 'TOEIC® L&R でよく出るビジネス・日常の語(準備中)。' },
  { id: 'igaku', name: '医学部頻出', grp: 'more', desc: '医学部の長文によく出る医療・生命科学の語(準備中)。' }
];
// 早慶上理:大学・学部ごとの予定語数(元の単語帳の画面で表示されていた数)。入力済みは parts の名前で判定
WPS.SOKEI_PLAN = [
  { univ: '早稲田', all: 898, fac: [['政治経済学部', 106, '早稲田 政治経済'], ['法学部', 252], ['商学部', 128], ['文学部', 264], ['文化構想学部', 268], ['教育学部', 295], ['社会科学部', 209], ['国際教養学部', 141, '早稲田 国際教養'], ['人間科学部', 186], ['スポーツ科学部', 125], ['理工(基幹・創造・先進)', 124, '早稲田 理工']] },
  { univ: '慶應', all: 921, fac: [['文学部', 240], ['経済学部', 176, '慶應 経済'], ['法学部', 158], ['商学部', 276], ['医学部', 211], ['薬学部', 255], ['理工学部', 280], ['総合政策学部', 397], ['環境情報学部', 339], ['看護医療学部', 122, '慶應 看護医療']] }
];
WPS.VBOOK_DATA = { base: {}, sokei: {}, idiom: {}, jh: {}, plus: {} }; // jh:1=小学校の復習 2=中学1年 3=中学2年 4=中学3年
// 古文単語は3冊に分ける:古典単語(共テ 品詞別)/難関私大(MARCH早稲田)/古典常識(分野別)
if (WPS.KOBUN_BOOK) {
  var KB = WPS.KOBUN_BOOK.parts, KD = WPS.VBOOK_DATA_KOBUN;
  [['kobun', '古典単語', 'kobun_bk', 1, 8, function (n) { return n.replace(/^共テ /, ''); }],
   ['kobun_nk', '難関私大 古文単語', 'kobun_nk', 9, 11, function (n) { return n.replace('MARCH早稲田 ', 'MARCH・早稲田 '); }],
   ['kobun_jo', '古典常識', 'kobun_jo', 12, 18, function (n) { return n; }]].forEach(function (c) {
    var parts = [], data = {};
    for (var i = c[3]; i <= c[4]; i++) { var pr = KB[i - 1]; parts.push([pr[0], pr[1], c[5](pr[2])]); data[i - c[3] + 1] = KD[i]; }
    WPS.VBOOKS.push({ id: c[0], name: c[1], bank: c[2], named: 1, subj: 'jpn', parts: parts, total: parts.reduce(function (a, x) { return a + x[0]; }, 0) });
    WPS.VBOOK_DATA[c[0]] = data;
  });
}
WPS.VBOOK_DATA.base[1] = `
blame|～を責める、～のせいにする
claim|主張する、要求する、主張、(命を)奪う
evidence|証拠、根拠
budget|予算、予算を立てる
fare|運賃、乗車料金
pretend|～のふりをする
admit|認める、入場を許す
admission|入場(料)、入学、承認|派
awful|ひどい、恐ろしい
raw|生の、未加工の
protest|抗議する、抗議
fulfill|(義務を)果たす、(条件を)満たす、(夢を)実現する
fulfilled|満ち足りた、実現した|派
fulfillment|実現、達成(感)|派
gender|(社会的な)性、性別
victim|犠牲者、被害者
forbid|禁止する
reject|拒否する、断る
rejection|拒絶、不合格|派
struggle|奮闘する、もがく、苦闘
regard|～を…とみなす、尊敬、点
regardless|(～に)関係なく|派
disregard|無視する、無視|派
regarding|～に関して|派
reveal|明らかにする、暴露する
prove|証明する、～だとわかる
proof|証拠、証明|派
disprove|反証する|派
proven|証明された|派
owe|借りがある、(成功などを)～のおかげとする
attempt|試みる、試み
principle|原理、原則、主義
military|軍の、軍隊
tip|先端、助言、チップ、傾ける
complain|不平を言う、訴える
celebrate|祝う
celebration|祝賀、お祝い|派
celebrated|名高い、有名な|派
admire|感心する、称賛する
research|研究、調査、研究する
researcher|研究者|派
achieve|達成する、成し遂げる
achievement|達成、業績|派
stress|ストレス、強調、強調する
stressful|ストレスの多い|派
suffer|苦しむ、(損害を)受ける
sufferer|苦しむ人、患者|派
ancestor|先祖、祖先
treasure|宝物、大切にする
treasury|国庫、財務省|派
vote|投票する、投票、票
fee|料金、謝礼
wealth|富、財産、豊富さ
wander|歩き回る、さまよう
wanderer|放浪者|派
issue|問題(点)、(雑誌の)号、発行する
draw|描く、引く、(注意を)引きつける、(結論を)導く、引き分け
drawing|絵、線画|派
operate|操作する、作動する、手術する、経営する
pour|注ぐ、(雨が)激しく降る
survive|生き残る、～より長生きする
represent|代表する、表す、相当する
representation|表現、代表|派
contain|含む、(感情を)抑える
container|容器、コンテナ|派
containment|封じ込め、抑制|派
subject|科目、話題、主語、被験者、(～を)受けやすい
subjective|主観的な|派
quit|やめる
predict|予測する
prediction|予測、予言|派
compare|比べる、たとえる
comparable|匹敵する、同等の|派
focus|焦点、焦点を合わせる、集中する
landscape|風景、(社会の)状況
reflect|反射する、反映する、よく考える
reflection|反射、反映、熟考|派
feature|特徴、特集(記事)、特徴とする
convenient|便利な、都合のよい
inconvenient|不便な、都合の悪い|派
common|共通の、ふつうの、よくある
increase|増える、増やす、増加
quarter|4分の1、15分、地区、四半期
figure|数字、人物、図、姿、(figure outで)理解する
adjust|調整する、慣れる
adjustment|調整、適応|派
apply|申し込む、当てはめる、適用する、塗る
applicant|応募者、志願者|派
application|申し込み(書)、応用、適用|派
greet|あいさつする、出迎える
novel|小説、目新しい
novelist|小説家|派
mean|意味する、～するつもりだ、意地の悪い、平均
meaning|意味|派
meaningful|意味のある、有意義な|派
meaningless|意味のない|派
regret|後悔する、後悔
affect|影響を与える、作用する
affection|愛情|派
demand|要求する、要求、需要
refer|言及する、参照する、指す
reference|言及、参照|派
mention|述べる、言及する
theory|理論、学説
chemical|化学の、化学物質
nuclear|核の、原子力の
civil|市民の、国内の、礼儀正しい
civility|礼儀正しさ|派
civilize|文明化する|派
civilian|一般市民、民間人|派
duty|義務、職務、関税
income|収入、所得
consume|消費する
import|輸入する、輸入(品)
importation|輸入|派
consist|(consist ofで)～から成る
consistent|一貫した、矛盾のない|派
inconsistent|一貫しない、矛盾した|派
harm|害、害を与える
harmless|無害な|派
melt|溶ける、溶かす
advance|進歩、前進する、(説を)唱える
advanced|進歩した、上級の|派
deal|(deal withで)扱う、取引、(deal inで)商う
handle|扱う、処理する、取っ手
clue|手がかり、ヒント
adopt|採用する、養子にする
adoption|採用、養子縁組|派
occur|起こる、(考えが)心に浮かぶ
occurrence|発生、出来事|派
suppose|思う、仮定する、(be supposed toで)～することになっている
supposing|もし～ならば|派
forgive|許す
resource|資源、資質
resourceful|機転のきく、工夫に富む|派
agriculture|農業
agricultural|農業の|派
atmosphere|大気、雰囲気
forecast|予報、予測する
species|(生物の)種
feed|えさを与える、(feed onで)～を常食とする
feeder|えさをやる人・装置|派
brave|勇敢な
afford|～する余裕がある、与える
affordable|手ごろな(値段の)|派
eager|熱心な、～したがっている
eagerness|熱心さ、熱意|派
obvious|明らかな、明白な
available|利用できる、手に入る
availability|利用できること、入手可能性|派
narrow|狭い、狭める、しぼる
measure|測る、対策、尺度
measurement|測定、寸法|派
occasion|場合、機会、行事
current|現在の、流れ、電流、風潮
supply|供給する、供給
replace|取り替える、～に取って代わる
replacement|交換、代わりのもの|派
replaceable|取り替えられる|派
exchange|交換する、交換、両替
deliver|配達する、(演説を)する、出産を助ける
indicate|示す、指し示す
indication|兆候、しるし|派
seek|探し求める
alarm|ぎょっとさせる、警報、不安
alarming|不安にさせる、驚くべき|派
upset|動揺させる、動揺した
arrest|逮捕する、逮捕、(進行を)止める
defend|守る、弁護する
defensive|防御の、守りの|派
defendant|被告(人)|派
defense|防御、防衛|派
concept|概念、考え
conception|概念、構想、妊娠|派
shade|日陰、(意味の)わずかな違い
wildlife|野生生物
quantity|量
exhibit|展示する、(性質を)示す
exhibition|展覧会、展示|派
merit|長所、利点、～に値する
minor|小さな、重要でない、未成年者
minority|少数派|派
argue|主張する、言い争う
argument|議論、主張、口論|派
offer|申し出る、提供する、申し出
suggest|提案する、それとなく示す
suggestion|提案、示唆|派
suggestive|示唆に富む、暗示的な|派
recommend|勧める、推薦する
recommendation|推薦、勧告|派
apologize|謝る、わびる
award|賞、(賞を)与える
describe|説明する、描写する
description|描写、説明|派
express|表現する、急行
expression|表現、表情|派
material|材料、資料、物質的な
artificial|人工の、不自然な
skill|技術、技能
skilled|熟練した|派
talent|才能
talented|才能のある|派
practice|練習、習慣、実践、練習する、(医業などを)営む
practical|実用的な、現実的な|派
impractical|実用的でない|派
manage|何とか～する、経営する、管理する
management|経営、管理|派
manager|経営者、管理者|派
improve|改善する、向上させる
improvement|改善、向上|派
produce|生産する、生み出す、農産物
reproduce|繁殖する、再現する、複製する|派
productive|生産的な|派
production|生産、製作|派
product|製品、産物|派
productivity|生産性|派
producer|生産者、制作者|派
establish|設立する、確立する
establishment|設立、確立、(the establishmentで)体制側|派
patient|患者、忍耐強い
physical|身体の、物理的な、物質の
physically|身体的に、物理的に|派
taste|～の味がする、味、好み
role|役割
habit|(個人の)習慣、癖
custom|(社会の)慣習、(customsで)税関
survey|調査、調査する
value|価値、重んじる、(valuesで)価値観
valuation|評価、査定|派
nation|国家、国民
national|国家の、国民の|派
nationality|国籍|派
bill|請求書、紙幣、法案
trade|貿易、取引、商売、取引する
trader|商人、貿易業者|派
task|仕事、課題
earn|稼ぐ、得る
earnings|収入、所得|派
hurt|傷つける、痛む
injure|けがをさせる
damage|損害、損害を与える
destroy|破壊する
destruction|破壊|派
audience|聴衆、観客
author|著者、作家
authority|権威、権限、(the authoritiesで)当局|派
likely|～しそうだ、ありそうな
certain|確かな、ある(一定の)
uncertain|不確かな|派
certainly|確かに、もちろん|派
avoid|避ける
solve|解決する、解く
encourage|励ます、促す
encouraging|励みになる|派
encouragement|激励|派
prevent|防ぐ、妨げる
prevention|予防、防止|派
enable|可能にする
enabling|可能にする|派
repair|修理する、修理
explore|探検する、調査する
explorer|探検家|派
exploration|探検、調査|派
include|含む
including|～を含めて|派
own|自分自身の、所有する
share|共有する、分ける、分け前、株
decide|決める
decision|決定、決心|派
judge|判断する、裁判官
retire|引退する、退職する
remind|思い出させる
reminder|思い出させるもの、注意|派
realize|気づく、理解する、実現する
realization|実現、理解|派
appreciate|感謝する、正しく評価する
consider|よく考える、～とみなす
considerable|かなりの|派
consideration|考慮、思いやり|派
wonder|～かなと思う、驚き
wonderful|すばらしい|派
allow|許す、許可する
allowance|こづかい、手当|派
sight|光景、視力、見ること
bloom|(花が)咲く、花
harvest|収穫、収穫する
freeze|凍る、凍らせる
freezing|凍えるほど寒い|派
rude|失礼な、無礼な
strict|厳しい、厳密な
intelligent|知能の高い、賢い
silly|ばかげた、愚かな
awake|目が覚めて
attitude|態度、考え方
character|性格、登場人物、文字
characterize|特徴づける|派
detail|詳細
advantage|利点、有利
disadvantage|不利な点|派
disadvantaged|恵まれない|派
`;
WPS.VBOOK_DATA.base[2] = `
quality|質、品質、特性
correct|正しい、訂正する
correction|訂正、修正|派
major|主要な、大きな、専攻する
majority|大多数、過半数|派
terrible|ひどい、恐ろしい
similar|似ている、同様の
similarly|同様に|派
similarity|類似(点)|派
reduce|減らす
reduction|減少、削減|派
pile|積み重ね、山、積み重ねる
prepare|準備する
preparation|準備|派
opportunity|機会、好機
ancient|古代の、昔からの
rent|借りる、賃貸する、家賃
rental|賃貸(の)、レンタル|派
present|現在の、出席している、贈り物、提示する、贈る
presence|存在、出席|派
diet|食事、ダイエット、(日本の)国会
site|場所、用地、(ウェブ)サイト
instrument|器具、楽器
tune|曲、調子、(楽器を)調律する
pronounce|発音する
sign|しるし、兆候、標識、署名する
publish|出版する、公表する
display|展示する、表示、展示
trust|信頼する、信頼
depend|(depend onで)～しだいである、頼る
dependent|頼っている、依存している|派
independent|独立した|派
rely|(rely onで)頼る、当てにする
reliability|信頼性|派
pray|祈る
prefer|～のほうを好む
preference|好み|派
hate|ひどく嫌う、憎む
anxious|心配して、(anxious toで)しきりに～したがる
bother|面倒をかける、悩ませる
disturb|邪魔をする、乱す
disturbance|妨害、騒ぎ|派
favor|親切な行為、支持する、好意
favorable|好意的な、有利な|派
result|結果、(result inで)～という結果になる、(result fromで)～から生じる
effect|影響、効果、結果、(変化を)もたらす
effective|効果的な|派
effectively|効果的に|派
influence|影響、影響を与える
purpose|目的
complete|完全な、完成させる
completely|完全に|派
completion|完成、完了|派
insist|(insist onで)主張する、言い張る
insistent|しつこい、強く主張する|派
insistence|主張、強要|派
object|物体、目的、(object toで)反対する
objective|客観的な、目標|派
praise|ほめる、称賛
reply|返事をする、返事
whisper|ささやく、ささやき
observe|観察する、(規則を)守る、(意見を)述べる
observation|観察、(観察に基づく)意見|派
observer|観察者|派
experiment|実験、実験する
experimental|実験の、実験的な|派
overcome|克服する、打ち勝つ
aim|ねらう、目指す、目的
challenge|難題、挑戦、異議を唱える、挑む
challenging|やりがいのある、難しいが面白い|派
mental|精神の、心の
mentally|精神的に|派
recover|(recover fromで)回復する、取り戻す
citizen|市民、国民
citizenship|市民権|派
impact|影響、衝撃
religion|宗教
benefit|利益、恩恵、(benefit fromで)恩恵を受ける、～のためになる
official|公式の、役人
volunteer|ボランティア、自ら進んで申し出る
policy|政策、方針、保険証券
charge|料金、責任、(料金を)請求する、(罪で)告発する、充電する
occupation|職業、占領
structure|構造、建造物
structural|構造の|派
architecture|建築(様式)
surface|表面
edge|端、ふち、優位
connect|つなぐ、結びつける
connection|つながり、関係|派
crime|犯罪
punish|罰する
enemy|敵
destination|目的地、行き先
transportation|交通機関、輸送
treat|扱う、治療する、(treat A to Bで)AにBをおごる
refuse|断る、拒む
refusal|拒否|派
spread|広がる、広げる
bend|曲げる、曲がる
bow|おじぎ(をする)、弓
strike|打つ、(考えが)思い浮かぶ、(災害が)襲う、ストライキ
striking|目立つ、印象的な|派
beat|打ち負かす、繰り返したたく、(心臓が)鼓動する
participate|(participate inで)参加する
participation|参加|派
exist|存在する
existence|存在|派
require|必要とする、要求する
requirement|必要条件|派
required|必須の、必要な|派
last|続く、最後の、この前の
examine|調べる、検査する
examination|試験、検査|派
gain|得る、増す
search|捜す、捜索
recognize|認識する、それとわかる
notice|気づく、通知、掲示
noticeable|目立つ、顕著な|派
aware|気づいている、知っている
awareness|意識、認識|派
unaware|気づいていない|派
doubt|疑う、疑い
doubtful|疑わしい|派
remove|取り除く
removable|取り外せる|派
disaster|災害、大惨事
environment|環境
proper|適切な、ふさわしい
improper|不適切な|派
sort|種類、分類する
positive|前向きな、確かな、陽性の
pure|純粋な、混じりけのない
negative|否定的な、陰性の
rough|粗い、大まかな、(天候・海が)荒れた
contrast|対比、対照
calm|落ち着いた、静かな
tend|～する傾向がある、世話をする
tendency|傾向|派
general|一般的な、全体の、将軍
ordinary|普通の、平凡な
dozen|ダース、12個
match|合う、好敵手、試合
reward|報酬、ほうび、報いる
rewarding|やりがいのある|派
flavor|風味、味
bitter|苦い、つらい
track|足跡、線路、追跡する
locate|(位置を)突き止める、置く
location|位置、場所|派
surround|取り囲む
surrounding|周囲の|派
define|定義する
definition|定義|派
announce|発表する、知らせる
envy|うらやむ、ねたみ
envious|うらやましがる|派
respect|尊敬する、尊敬、点
respectful|敬意を表する、礼儀正しい|派
respectively|それぞれ|派
emotion|感情
courage|勇気
discourage|やる気をなくさせる、(discourage A from doingで)Aに～するのを思いとどまらせる|派
method|方法
medium|中くらいの、媒体、手段
ray|光線
pain|痛み、苦痛
painful|痛い、つらい|派
thumb|親指
committee|委員会
poverty|貧困
origin|起源、生まれ
original|元の、独創的な|派
originally|もともと|派
project|計画、事業、予測する、投影する
element|要素、元素
link|つながり、結びつける
murder|殺人、殺す
rob|(人から)奪う、強盗をする
robber|強盗|派
float|浮かぶ、漂う
floating|浮かんでいる|派
address|住所、演説、(問題に)取り組む、話しかける
approach|近づく、取り組み方、接近
warn|警告する
warning|警告|派
force|力、強いる
appeal|(appeal toで)訴える・興味を引く、魅力、上訴
react|(react toで)反応する
reaction|反応|派
reactive|反応しやすい|派
principal|主要な、校長
mobile|動かせる、移動式の、携帯電話
unit|単位、一団
era|時代
remote|遠い、遠く離れた
altogether|完全に、全部で
somehow|何とかして、どういうわけか
poison|毒、毒を入れる
recipe|調理法、秘訣
factor|要因、要素
creature|生き物
recent|最近の
recently|最近|派
lecture|講義、講演
weapon|武器
discuss|話し合う、議論する
excuse|言い訳、許す
explain|説明する
explanation|説明|派
technology|科学技術
technological|科学技術の|派
invent|発明する
develop|発達する、開発する、(病気を)発症する
development|発達、開発|派
developer|開発者、(土地の)開発業者|派
effort|努力
create|創造する、生み出す
creation|創造、創作|派
save|救う、節約する、保存する
saving|節約、(savingsで)貯金|派
medicine|薬、医学
breathe|呼吸する
thirsty|のどが渇いた
fever|熱
tear|涙、引き裂く
tradition|伝統
traditional|伝統的な|派
native|母国の、生まれつきの、その土地の
local|地元の、地域の
fashion|流行、方法、形作る
fashionable|流行の|派
fashioned|(old-fashionedで)時代遅れの|派
public|公共の、一般の人々
publicity|宣伝、世間の注目|派
capital|首都、資本、大文字(の)
cost|費用、(費用が)かかる
company|会社、仲間、一緒にいること
crowd|群衆、群がる
passenger|乗客
elderly|年配の
probably|おそらく
support|支える、支援する、支持する
mistake|間違い、(mistake A for Bで)AをBと間違える
check|調べる、阻止する、小切手
hide|隠す、隠れる
sew|縫う
raise|上げる、育てる、(問題を)提起する、(資金を)集める
serve|(料理を)出す、仕える、役に立つ、(serve asで)～の役目を果たす
servant|使用人|派
bear|耐える、(費用・責任を)負う、(子を)産む、クマ
happen|起こる
appear|現れる、～のように見える
disappear|消える|派
appearance|外見、出現|派
remain|～のままである、残る
belong|(belong toで)所属している、～のものである
base|基礎、(base A on Bで)AをBに基づかせる
basement|地下室|派
accept|受け入れる
acceptance|受け入れ、受諾|派
mind|気にする、心、知性
concentrate|(concentrate onで)集中する
concentration|集中|派
ground|地面、根拠
view|眺め、見解、～とみなす
seed|種
senior|年上の、上級の
graduate|(graduate fromで)卒業する、卒業生
graduation|卒業|派
review|復習、批評、見直す
imagine|想像する
guess|推測する、推測
expect|期待する、予想する
expecting|妊娠している|派
insect|昆虫
earthquake|地震
temperature|温度、体温
degree|(温度などの)度、程度、学位
flood|洪水、あふれさせる
polite|礼儀正しい、丁寧な
lonely|孤独な、寂しい
lazy|怠惰な
ugly|醜い
fault|欠点、責任、断層
ideal|理想的な、理想
matter|重要である、問題、事柄、物質
false|誤った、偽の
tight|きつい、ぴんと張った
empty|空の
direct|直接の、指揮する、(注意を)向ける
direction|方向、指示|派
director|監督、取締役|派
familiar|よく知られた、(be familiar withで)～をよく知っている
unfamiliar|よく知らない、不慣れな|派
unfamiliarity|不慣れ|派
add|加える
count|数える、重要である、(count onで)当てにする
countless|無数の|派
rate|割合、速度、評価する
`;
WPS.VBOOK_DATA.base[3] = `
lack|不足、欠いている
ready|用意ができている、進んで～する
readily|すぐに、快く、たやすく|派
suit|(人に)合う、似合う、訴訟、スーツ
case|場合、事例、訴訟、容器
scene|場面、光景、現場
chance|機会、可能性、偶然
minute|分、ごく小さい、(minutesで)議事録
delay|遅らせる、延期する、遅れ
borrow|借りる
lend|貸す
provide|提供する、与える
provided|もし～ならば|派
providing|もし～ならば|派
board|板、(乗り物に)乗る、委員会、(下宿の)食事
garbage|ごみ
item|品目、項目
wheel|車輪、(車の)ハンドル
stuff|もの、物質、詰め込む
leisure|余暇、レジャー
furniture|家具
traffic|交通(量)
wear|身につけている、すり減らす
marry|結婚する
bottom|底、下部
row|列、(ボートを)こぐ
background|背景、経歴
culture|文化、教養
cultural|文化の|派
sentence|文、判決、判決を下す
article|記事、品物、(法律の)条項
passage|(文章の)一節、通路、通過
spell|つづる、(天気などが続く)期間、呪文
spelling|つづり|派
beg|懇願する、乞う
worry|心配する、心配させる
reason|理由、理性、推論する
reasonable|理にかなった、(値段が)手ごろな|派
reasoning|推論、論理的な考え方|派
reasonably|理にかなって、かなり|派
cause|原因、引き起こす、主義・大義
causal|因果関係の|派
almost|ほとんど
even|～さえ、さらに、偶数の、平らな
uneven|でこぼこの、不均等な|派
therefore|それゆえに、したがって
instead|その代わりに
except|～を除いて
exception|例外|派
exceptional|並外れた、例外的な|派
debate|討論、討論する
respond|(respond toで)返答する、反応する
respondent|回答者|派
response|返答、反応|派
responsible|責任がある|派
irresponsible|無責任な|派
responsibility|責任|派
responsive|すぐ反応する|派
cancer|がん
muscle|筋肉
equal|等しい、平等な、～に等しい
equality|平等|派
unequal|不平等な|派
inequality|不平等|派
trend|傾向、流行
trendy|流行の|派
service|サービス、奉仕、(交通機関の)便
charity|慈善(団体)
community|地域社会、共同体
tax|税金、課税する
waste|むだにする、浪費、廃棄物
wasteful|むだの多い|派
career|職業、経歴
function|機能、機能する
functional|機能的な|派
thief|泥棒
flow|流れる、流れ
limit|制限する、限界
limited|限られた|派
promote|促進する、昇進させる
promotion|昇進、促進|派
hug|抱きしめる
perform|行う、演じる
performance|遂行、公演、性能、成績|派
escape|逃れる、逃亡
fold|折りたたむ
folder|紙ばさみ、フォルダー|派
release|解放する、発表する、公開
protect|守る
shake|振る、揺れる
attend|出席する、(attend toで)～に注意を向ける・世話をする
attendant|付き添い人、係員|派
attendance|出席|派
maintain|維持する、主張する
maintenance|維持、整備|派
care|世話、注意、気にかける
careful|注意深い|派
careless|不注意な|派
planet|惑星
horizon|地平線、水平線、(horizonsで)視野
climate|気候、(社会の)風潮
stupid|ばかな
serious|深刻な、真剣な
active|活動的な、積極的な
activity|活動|派
activist|活動家|派
inactive|不活発な|派
rapid|速い、急速な
vivid|鮮やかな、生き生きとした
scale|規模、目盛り、はかり、うろこ
amount|量、(amount toで)合計～になる・～に等しい
fit|(大きさが)合う、健康な
fitness|健康、適性|派
emergency|緊急事態
tale|物語、話
term|用語、期間、学期、(termsで)条件、～と呼ぶ
translate|翻訳する
translation|翻訳|派
translator|翻訳者|派
attract|引きつける
attractive|魅力的な|派
oxygen|酸素
secretary|秘書、(米国の)長官、(英国の)大臣
breeze|そよ風
desert|砂漠、見捨てる
path|小道、進路
web|クモの巣、(the Webで)ウェブ
huge|巨大な
souvenir|記念品、土産
ambition|野心、大望
process|過程、処理する
procession|行列|派
host|主催する、主人役、(a host ofで)多数の～
wheat|小麦
intersection|交差点
rush|急いで行く、殺到
contact|連絡を取る、接触
instant|即座の、瞬間
instantly|すぐに|派
overseas|海外へ、海外の
nearly|ほとんど、危うく
frame|枠、骨組み
plastic|プラスチック(の)、柔軟な
decrease|減る、減らす、減少
trap|わな、わなにかける
fire|解雇する、発砲する、火、火事
master|主人、達人、習得する
court|裁判所、宮廷、(テニスなどの)コート
design|設計する、デザイン
designer|デザイナー、設計者|派
score|得点、楽譜
ladder|はしご
athlete|運動選手
fantastic|すばらしい、空想的な
throughout|～の間ずっと、～じゅうで
shape|形、(健康などの)状態、形作る
symbol|象徴、記号
fiction|小説、作り話
fictional|架空の|派
assist|手伝う
assistant|助手|派
assistance|援助、手助け|派
select|選ぶ
selection|選択、選ばれたもの|派
selective|選択的な、えり好みする|派
technique|技術、手法
technical|専門的な、技術的な|派
beneath|～の下に
rescue|救助する、救助
continent|大陸
logic|論理
logical|論理的な|派
illogical|筋の通らない|派
sour|すっぱい
export|輸出する、輸出(品)
decline|減少する、断る、衰退
agree|(agree withで)賛成する、同意する
disagree|意見が合わない|派
agreement|同意、協定|派
promise|約束する、約束、見込み
promising|前途有望な|派
discover|発見する
ability|能力
inability|～できないこと|派
form|形、用紙、形成する
formation|形成|派
condition|状態、条件、体調、条件づける
conditional|条件つきの、～しだいの|派
unconditional|無条件の|派
exercise|運動、練習、(権利を)行使する
rule|規則、支配する
society|社会
law|法律、(科学の)法則
abroad|海外へ
state|州、国家、状態、述べる
statement|声明、発言|派
price|価格
cheer|声援を送る、元気づける
cheerful|元気のいい、陽気な|派
miss|のがす、～がいなくて寂しく思う
fail|失敗する、～できない
failure|失敗|派
join|～に加わる
throw|投げる、(throw awayで)捨てる
collect|集める
collective|集団の、共同の|派
gather|集める、集まる
history|歴史
grade|学年、成績、等級
choose|選ぶ
choice|選択|派
remember|覚えている、思い出す
seem|～のように思われる
nature|自然、性質
natural|自然の、当然の|派
plant|植物、(大規模な)工場、植える
fair|公正な、かなりの、晴れた、見本市
famous|有名な
elementary|初歩的な
bright|明るい、賢い
lively|生き生きとした
thin|薄い、やせた
loose|ゆるい
smooth|滑らかな、順調な
experience|経験、経験する
experienced|経験を積んだ、熟練した|派
age|年齢、時代
modern|現代の
spend|(時間・お金を)費やす
note|メモ、注記、紙幣、注意する、指摘する
noted|有名な|派
refrigerator|冷蔵庫
pay|支払う、割に合う、給料
clothes|衣服
order|順序、秩序、命令、注文(する)、命令する
disorder|混乱、(心身の)不調|派
yard|庭、ヤード
art|芸術、技術
cartoon|漫画
end|終わり、端、目的、終える
right|正しい、右、権利、ちょうど
indeed|実際に、本当に
besides|そのうえ、～に加えて
chat|おしゃべりする
rest|休息、残り
restless|落ち着かない|派
unrest|(社会の)不安、動揺|派
disease|病気
ambulance|救急車
sense|感覚、意味、分別、感じ取る
sensation|感覚、大評判|派
sensible|分別のある、賢明な|派
nonsense|ばかげたこと|派
sweat|汗、汗をかく
global|世界的な
standard|基準、標準的な
priceless|非常に貴重な|派
neighbor|近所の人
neighborhood|近所、地域|派
staff|職員(全体)
customer|(店の)客
female|女性の、雌の
travel|旅行する
pass|通り過ぎる、合格する、手渡す、(時が)たつ
trouble|問題、困難
hire|雇う
branch|枝、支店
lead|導く、(lead toで)～につながる、鉛
leading|主要な、一流の|派
mislead|誤解させる|派
misleading|誤解を招く|派
leadership|指導力、リーダーシップ|派
rise|上がる、増える、上昇
tie|結ぶ、(家族などの)きずな、ネクタイ
tricky|扱いにくい、厄介な|派
fear|恐怖、恐れる
fearful|恐れて|派
moreover|そのうえ
chest|胸
vision|視力、構想、将来像
slave|奴隷
biology|生物学
biologist|生物学者|派
fix|固定する、修理する、決める
press|押す、報道機関
burn|燃える、焼ける、やけど
sharp|鋭い、急激な、(時刻が)きっかりの
alike|似ている、同様に
unique|独特の、特有の
uniquely|比類なく|派
envelope|封筒
trick|いたずら、策略、だます
canal|運河
statue|像
journal|専門誌、日誌
sound|音、～に聞こえる、健全な
live|住む、生きる、生の、生放送の
life|生命、一生、生活|派
smell|においをかぐ、においがする、におい
watch|見守る、注意して見る、腕時計
`;
WPS.VBOOK_DATA.base[4] = `
catch|捕まえる、(乗り物に)間に合う、(病気に)かかる、理解する
drive|運転する、駆り立てる、(drive A to doで)Aを～させる
laugh|笑う
fun|楽しみ、楽しいこと
difficult|難しい
hard|難しい、硬い、熱心に
hardly|ほとんど～ない|派
hardship|苦難、困窮|派
help|助ける、手伝う、助け
helpful|役に立つ|派
helpless|無力な|派
far|遠くに、はるかに
still|まだ、それでも、いっそう、静止した
once|一度、かつて、いったん～すれば
moment|瞬間、時点
paper|紙、新聞、論文
another|もう1つの、別の
perhaps|ひょっとすると、たぶん
clear|明らかな、澄んだ、取り除く
clearly|明らかに|派
fresh|新鮮な、新しい
refresh|元気づける、さわやかにする|派
refreshing|すがすがしい、さわやかな|派
refreshment|軽食、元気回復|派
forward|前方へ、転送する
agent|代理人、薬剤、(スパイなどの)工作員
bomb|爆弾
dinosaur|恐竜
nest|巣
bite|かむ、かみつく
power|力、権力、電力、大国
army|軍隊、陸軍
question|質問、問題(点)、疑問に思う
shoot|撃つ、撮影する
childhood|子ども時代
luck|運、幸運
hold|持つ、保つ、(会を)開く、持ちこたえる、収容できる
castle|城
record|記録、記録する、録音する
commercial|商業の、広告放送
opposite|正反対の、向かい側の
work|働く、うまくいく、仕事、作品
worker|労働者|派
safe|安全な、金庫
unsafe|安全でない|派
break|壊す、壊れる、休憩
late|遅い、遅れて、故人の
lately|最近|派
spot|場所、点、見つける
turn|回る、向きを変える、～になる、順番
while|～する間に、～だが一方、しばらくの間
enjoy|楽しむ、(権利などを)享受する
dress|服を着せる、ドレス
hit|打つ、たたく、(災害が)襲う
pack|詰める、包み
balance|均衡、バランス、残高
imbalance|不均衡|派
hunt|狩る、捜す
expert|専門家
president|大統領、社長
century|世紀
million|100万(の)
several|いくつかの
past|過去、過去の、～を過ぎて
main|主要な
mainly|主に|派
final|最後の、最終的な
basic|基礎的な、基本の
ahead|前方へ、先に
especially|特に
apart|離れて、ばらばらに
forever|永遠に
vegetable|野菜
meal|食事
absent|欠席して、不在の
absence|不在、欠席|派
future|未来、将来
position|位置、立場、職
accident|事故、偶然
accidental|偶然の|派
center|中心
average|平均、平均的な
middle|中央、真ん中の
plenty|たくさん、豊富
plentiful|豊富な|派
area|地域、分野、面積
countryside|田舎、田園地帯
adventure|冒険
international|国際的な
cash|現金
space|空間、宇宙、余地
skin|皮膚、肌
war|戦争
victory|勝利
wave|波、手を振る
rhythm|リズム
simply|単に、簡単に
wheelchair|車いす
continue|続ける、続く
reach|着く、届く、達する
risk|危険、危険にさらす
spirit|精神、気分
spiritually|精神的に|派
brain|脳、頭脳
private|個人の、私的な、私立の
male|男性の、雄の
unlike|～と違って
text|文章、本文、メッセージを送る
period|期間、時代
behavior|行動、ふるまい
misbehavior|不品行、非行|派
source|源、出所
distance|距離
professor|教授
youth|若者、青年時代
scholar|学者
scholarship|奨学金、学識|派
universe|宇宙
universal|普遍的な、全世界の|派
favorite|お気に入りの
excellent|非常に優れた
theme|テーマ、主題
bay|湾
shy|恥ずかしがりの、内気な
wind|風、巻く、(道が)曲がりくねる
mayor|市長
mark|印、点数、印をつける、特徴づける
marked|際立った、著しい|派
model|模型、手本、モデル
image|イメージ、像
repeat|繰り返す
repetitive|繰り返しの多い|派
memory|記憶、思い出
mild|穏やかな
section|部門、区画、節
license|免許
race|人種、競争、競走する
guard|警備員、守る
leave|去る、残す、～のままにしておく、休暇
request|要請する、依頼
idea|考え
necessary|必要な
necessarily|必ず、必然的に|派
situation|状況
topic|話題
topical|時事問題の|派
possible|可能な、ありうる
impossible|不可能な|派
convince|確信させる、説得する
convinced|確信している|派
relate|関連づける、関係がある
relative|親戚、相対的な|派
related|関連した|派
relation|関係|派
relationship|関係、間柄|派
relatively|比較的|派
unrelated|無関係の|派
follow|～についていく、(規則に)従う、(it follows thatで)当然～ということになる
following|次の|派
preserve|保存する、保護する
preservation|保存、保護|派
abandon|捨てる、断念する
abandonment|放棄|派
grant|与える、認める、補助金、(take A for grantedで)Aを当然と思う
amuse|楽しませる
amusing|おもしろい|派
amused|おもしろがった|派
amusement|楽しみ、娯楽|派
acquire|習得する、獲得する
acquired|後天的な、習得した|派
acquisition|習得、獲得|派
appropriate|適切な
inappropriate|不適切な、ふさわしくない|派
estimate|見積もる、推定する、見積もり
estimated|見積もりの、推定の|派
estimation|評価、判断|派
remark|発言、述べる
remarkable|注目すべき、著しい|派
confuse|混乱させる、混同する
confused|困惑した|派
confusing|紛らわしい、わかりにくい|派
confusion|混乱|派
clerk|店員、事務員
uniform|制服、同一の
alone|1人で、～だけで
early|早く、早い
sell|売る
sale|販売、特売|派
line|線、列、路線、せりふ
until|～まで
system|制度、体系、装置
baggage|手荷物
wake|目が覚める、(in the wake ofで)～の後に・～の結果として
total|全体の、合計
ankle|足首
forehead|額
liberty|自由
sink|沈む、流し
sinking|沈んでいく|派
scream|悲鳴を上げる、悲鳴
screaming|悲鳴を上げている|派
listen|聞く、耳を傾ける
listener|聞き手|派
dislike|嫌う
though|～だけれども
none|どれも…ない、誰も…ない
slim|ほっそりした、(可能性が)わずかな
label|ラベル、レッテルを貼る
country|国、田舎
photograph|写真
photographer|写真家|派
such|そのような
hero|英雄、主人公
square|正方形、広場、2乗
flight|飛行、(飛行機の)便、逃走
avenue|大通り
valley|谷
season|季節、味つけする
seasonal|季節の|派
top|頂上、最上部、上に乗せる
double|2倍の、倍増する
level|水準、高さ
goal|目標
studio|スタジオ、仕事場
throat|のど
something|何か
set|置く、設定する、一組
setting|環境、背景、設定|派
film|映画、撮影する
filming|撮影|派
cancel|取り消す、キャンセルする
date|日付、デート、(date fromで)～にさかのぼる
shout|叫ぶ
bark|ほえる
honey|はちみつ
single|たった1つの、独身の
flat|平らな、(英国の)集合住宅の一室
else|そのほかに
apartment|アパート、マンション
entrance|入り口、入学
costume|衣装
tournament|トーナメント、勝ち抜き戦
sunset|日没
portable|持ち運びできる
loud|大声の、うるさい
afraid|恐れて、怖がって
beauty|美、美しさ
prize|賞
journey|旅行
factory|工場
engine|エンジン
engineer|技師、エンジニア|派
engineering|工学|派
signal|合図、信号
soldier|兵士
coast|海岸
rival|競争相手
angle|角度、観点
essay|随筆、小論文
cave|洞窟
flour|小麦粉
twin|双子の一方
beyond|～を越えて、～の向こうに
within|～以内で、～の中で
nor|～もまた…ない
unless|…でない限り
whether|～かどうか
shelf|棚
storm|嵐
kid|冗談を言う、子ども
inner|内部の、内面の
trash|ごみ
leather|革
dust|ほこり
chapter|章
change|変える、変わる、変化、つり銭
learn|学ぶ、知る
learned|学識のある|派
need|必要とする、必要
ask|尋ねる、頼む、求める
cook|料理する、料理人
talk|話す
speak|話す
speech|演説、スピーチ|派
meet|会う、(要求を)満たす
buy|買う
build|建てる
rebuild|再建する|派
building|建物|派
close|閉める、閉まる、近い、親密な、近くに
move|動かす、動く、感動させる、引っ越す
movement|動き、運動|派
motionless|動かない|派
plan|計画、計画する
lose|失う、負ける
loss|損失|派
stand|立つ、我慢する、立場、台
grow|栽培する、成長する、～になる
hope|望む、希望
example|例
`;
WPS.VBOOK_DATA.base[5] = `
place|場所、置く
placement|配置、職業の紹介|派
part|部分、役割
partly|部分的に、ある程度|派
trip|旅行
problem|問題
point|点、要点、指し示す
language|言語
health|健康
report|報告、報道する
event|出来事、行事
step|歩み、段階、踏む
popular|人気のある、大衆の
popularity|人気|派
kind|種類、親切な
enough|十分な、必要なだけの
special|特別な
specialist|専門家|派
bad|悪い
short|短い、不足して
carry|運ぶ、持ち歩く
carrier|運送業者、運ぶもの|派
arrive|着く、到着する
arrival|到着|派
fall|落ちる、倒れる、秋
cover|覆う、扱う、含む、(費用を)まかなう、報道する、表紙
introduce|紹介する、導入する
reintroduce|再導入する|派
introduction|紹介、導入|派
clean|清潔な、掃除する
pick|選ぶ、摘む
die|死ぬ
dead|死んでいる|派
death|死|派
deadly|致命的な|派
return|戻る、返す、返却、収益
fly|飛ぶ
cut|切る、削減する
kill|殺す
hurry|急ぐ
light|光、明るい、軽い、火をつける
lightning|稲妻|派
Internet|インターネット
piece|一片、部分
heat|熱、暑さ、熱する
heating|暖房|派
holiday|休日
course|進路、講座、(物事の)経過
farm|農場
heavy|重い、激しい
sick|病気の
dear|親愛な、大切な
dark|暗い
sad|悲しい
free|自由な、無料の、暇な、解放する
freedom|自由|派
low|低い
angry|怒った
lucky|幸運な
unlucky|不運な|派
soft|柔らかい
back|後ろ、背中、戻って、支援する
maybe|もしかしたら
suddenly|突然
since|～して以来、～だから
through|～を通り抜けて、～を通じて
control|支配する、管理する、制御
attack|攻撃、攻撃する
mystery|謎
ceremony|式、儀式
schedule|予定(表)
action|行動
type|型、タイプ
tool|道具
couple|夫婦、2つ・2人、結びつける
honest|正直な
whole|全体の
smart|頭のよい、洗練された
lovely|すてきな
crazy|正気でない、夢中になって
funny|おもしろい、奇妙な
secret|秘密
pull|引く
print|印刷する
lift|持ち上げる、(制限を)解除する、(英国の)エレベーター
separate|分ける、離れた
blow|(風が)吹く、打撃
let|～に…させる
act|行動する、行為、法律
activate|作動させる、活性化する|派
shine|輝く
harmony|調和
pattern|型、パターン
stage|段階、舞台
battle|戦い
contest|コンテスト、競争
blank|空白の
quiet|静かな
chief|主な、長
dirty|汚い
normal|標準の、普通の
normally|普通は|派
full|いっぱいの
simple|簡単な
violent|暴力的な、激しい
rich|裕福な、豊富な
perfect|完全な
weak|弱い
drop|落とす、やめる、しずく
ghost|幽霊
error|誤り
above|～の上に
below|～の下に
per|～につき
outside|～の外に
outsider|部外者|派
inside|～の中に
husband|夫
wife|妻
job|仕事
royal|王の
office|事務所、公職
officer|警官、役人|派
bank|銀行、土手
temple|寺
block|区画、妨げる
zone|地帯
slope|坂
port|港
key|かぎ、手がかり、重要な
plate|皿
sheet|(紙などの)1枚、シーツ
formal|正式の
informal|形式ばらない|派
silk|絹
dessert|デザート
mix|混ぜる
fry|油でいためる、揚げる
boil|ゆでる、沸騰する
hobby|趣味
magic|魔法
guide|案内する、案内人
guidance|指導|派
win|勝つ、獲得する
ocean|海、大洋
mud|泥
wood|木材、(woodsで)森
root|根、根源
human|人間の、人間
humanity|人類、(the humanitiesで)人文科学|派
birth|誕生
adult|大人
fat|太った、脂肪
ill|病気で
illness|病気|派
touch|触れる、感動させる
heart|心臓、心
stomach|胃
blood|血液
mad|怒っている、気が狂った
panic|パニック
humor|ユーモア
friendly|親しみのある
gentle|優しい、穏やかな
comment|論評、コメント
magazine|雑誌
mathematics|数学
university|大学
enter|入る
science|科学
scientist|科学者|派
machine|機械
automatic|自動の
energy|エネルギー
gas|ガス、気体
earth|地球
cheap|安い
steal|盗む
fight|戦う、けんか
break out|(戦争・火事などが)勃発する
die out|絶滅する
show|示す、見せる
give|与える、催す
find|見つける、～だとわかる
finding|発見、(調査の)結果|派
keep|保つ、～し続ける、飼う、(約束を)守る
call|呼ぶ、電話をかける、電話
understand|理解する
misunderstand|誤解する|派
understanding|理解、合意|派
misunderstanding|誤解|派
believe|信じる
belief|信念|派
lie|横たわる、うそをつく、うそ
lay|横たえる、(卵を)産む
tell|伝える、見分ける
feel|感じる
feeling|感情、感覚|派
stop|止める、やめる
finish|終える
start|始める
try|試みる
forget|忘れる
air|空気、雰囲気、(意見を)公に述べる
police|警察
guest|客
fact|事実
daily|毎日の
tired|疲れた、飽きて
able|～できる
unable|～できない|派
sure|確信して
clever|賢い、利口な
wise|賢明な
foolish|愚かな
important|重要な
wrong|間違った
fast|速い、断食する
deep|深い
depth|深さ|派
wide|広い
widen|広くする|派
width|幅|派
pretty|かわいい、かなり
just|ちょうど、ほんの、公正な
usually|たいてい
make it|間に合う、成功する
show up|現れる
receive|受け取る
reception|歓迎会、受け取ること、受付|派
attention|注意
field|畑、分野
wish|願う
fill|満たす
opinion|意見
real|実在する、本当の
reality|現実|派
thick|厚い、濃い
least|最小、(least＋形容詞・副詞で)最も～でない
rather|むしろ、かなり
quite|まったく、かなり
somewhere|どこかで
also|～もまた
however|しかし、どんなに～でも
although|～にもかかわらず
true|本当の、あてはまる
truth|真実|派
anyway|とにかく
suspect|～ではないかと思う、容疑者
ruin|台無しにする、破滅、(ruinsで)遺跡
contribute|(contribute toで)貢献する・一因となる
contribution|貢献|派
oppose|反対する
opposition|反対|派
associate|連想する、(associate withで)付き合う、仲間
association|連想、協会、関連|派
spoil|台無しにする、甘やかす、腐る
spoilage|腐敗|派
grateful|感謝している
extend|延長する、広げる
extension|延長、拡大|派
persuade|説得して～させる
expand|拡大する
expansion|拡大|派
involve|含む、巻き込む
involved|関係している|派
involvement|関与|派
bore|退屈させる
bored|退屈して|派
engage|(engage inで)従事する、(注意・関心を)引く、雇う
engaging|魅力のある|派
engagement|約束、婚約|派
political|政治的な
politically|政治的に|派
politician|政治家|派
politics|政治|派
adapt|(adapt toで)適応する、(小説などを)脚色する
adaptable|適応できる|派
adaptation|適応、翻案|派
sum|合計、金額
fascinate|魅了する
fascination|魅了されること|派
fascinating|魅力的な|派
amaze|驚かせる
amazing|驚くべき|派
amazed|驚いた|派
found|設立する
founder|創設者|派
frighten|怖がらせる
wait|待つ
stay|滞在する、～のままでいる
write|書く
writer|作家|派
rain|雨、雨が降る
teach|教える
teacher|先生|派
thing|物、事
color|色
colored|色つきの|派
word|単語、言葉、約束、知らせ
`;
WPS.VBOOK_DATA.base[6] = `
month|月、1か月
week|週
computer|コンピューター
festival|祭り
message|伝言、メッセージ
most|大部分の、最も
mostly|主に、たいてい|派
same|同じ
great|すばらしい、大きな
greatly|大いに、非常に|派
open|開いている、開ける、開く
answer|答える、答え
invite|招待する、(災難・批判を)招く
wash|洗う
cry|泣く、叫ぶ
push|押す
climb|登る
smile|ほほえむ、ほほえみ
side|側、側面
front|前、正面
concert|コンサート
village|村
lesson|授業、教訓
weather|天気
voice|声、(意見を)述べる
fan|ファン、扇風機
dream|夢、夢を見る
meter|メートル、計器
land|土地、陸、着陸する
hundred|100(の)
thousand|1000(の)
evening|夕方、晩
noon|正午
forest|森林
hole|穴
cloud|雲
phone|電話
sorry|すまなく思って、気の毒に思って
glad|うれしい
cute|かわいい
foreign|外国の
foreigner|外国人|派
soon|すぐに
away|離れて
together|一緒に
ago|～前に
straight|まっすぐに、まっすぐな
slowly|ゆっくりと
around|～のまわりに、～のあちこちを、およそ
over|～を超えて、～の上に、終わって
without|～なしに
between|(2つ)の間に
during|～の間に(ずっと)
behind|～の後ろに
along|～に沿って
come from|～の出身である、～から来ている
come true|実現する
cut off|切り取る、(供給を)止める
do one's best|全力を尽くす
get off|(乗り物から)降りる
get on|(乗り物に)乗る
get to|～に到着する
go through|一通り調べる、目を通す、経験する
grow up|成長する
hear of|～のことを耳にする
help oneself to|～を自由にとって食べる
look for|探す
look forward to|～を楽しみに待つ
look like|～に似ている、～しそうだ
pick up|拾い上げる、(車で)迎えに行く
speak to / speak with|～と話す
take care of|～の世話をする
take off|脱ぐ、離陸する
take part in|～に参加する
think of|～を思いつく、～のことを考える
after school|放課後に
all over|～の至る所に
all the time|いつも
at first|最初は
at home|在宅して、くつろいで
at last|ついに
at that time|その時に
at the same time|同時に
for a long time|長い間
for the first time|初めて
in the end|結局
in the future|将来
in this way|このようにして
more than|～より多い
of course|もちろん
on one's way to|～へ行く途中で
over there|あそこに
these days|近ごろ
a kind of|一種の
a lot of / lots of|たくさんの
A such as B|BのようなA
and so on|～など
here is [are]|ここに～がある、これが～です
How about ~ ?|～はいかがですか
no longer|もはや～ない
not only A but (also) B|AだけでなくBも
so ~ that|とても～なので…
too ~ to|あまりに～なので…できない
used to|以前はよく～した、以前は～だった
would like to|～したいと思う
cross|横切る、渡る
partner|相手、仲間
central|中心の
regular|定期的な、通常の
regularly|定期的に|派
paint|塗る、(絵の具で)描く
roll|転がる、巻く
pressure|圧力、重圧
bit|少し
cycle|周期、循環
recycle|再利用する、リサイクルする|派
wet|濡れた
quick|すばやい
silent|無言の、静かな
upper|上の方の
dig|掘る
wrap|包む
knock|ノックする、たたく
copy|写し、写しをとる
kick|蹴る
shut|閉める
percent|パーセント
sample|見本
shadow|影
hunger|飢え、空腹
second|秒、2番目の
midnight|夜の12時、真夜中
nowadays|近ごろ
toward|～の方へ
beside|～のそばに
against|～に反対して、～にもたれて
plus|～を加えて
across|～を横切って
bring back|返す、思い出させる
carry out|実行する
date back to|～にさかのぼる
find out|わかる、知る
get together|集まる
give off|(においなどを)発する
hand in|提出する
hang up|電話を切る
hold up|支えている、遅らせる
live on|～で生計を立てる、～を常食とする
look after|～の世話をする
look out|注意する
look up|(辞書などで)調べる
major in|～を専攻する
name after|～にちなんで名付ける
put down|書き留める
see off|見送る
take a look|ちょっと見る
take away|片付ける、取り去る
take one's time|ゆっくりやる、時間をかける
think of A as B|AをBと見なす
be about to|まさに～しようとしている
be born into|～の家庭に生まれる
be faced with|～に直面している
be good at|～が上手だ
be in need of|～を必要としている
be made of [from]|～でできている
be short of|～が足りない
be up to|～次第である
be worried about|～のことを心配している
by oneself|ひとりで
on one's own|自分ひとりで
above all|とりわけ
across from|～の向かい側に
after all|結局は
at a time|一度に
by accident|偶然
by mistake|間違って
day after day|来る日も来る日も
for free|無料で
from on|～以降
from time to time|時々
in a hurry|急いで
in favor of|～に賛成して
in order to|～するために
in the past|昔は
in those days|その当時は
on purpose|故意に、わざと
over and over|何度も
upside down|逆さまに
a large number of|たくさんの
a series of|一連の
as long as|～である限り、～しさえすれば
as soon as|～するとすぐに
had better|～したほうがよい
more and more|ますます多くの
not at all|まったく～ない
not A but B|AではなくてB
the first time|初めて～したとき
when it comes to|～のこととなると
parent|親
cousin|いとこ
interview|面接、インタビュー
artist|芸術家
actor|俳優
nurse|看護師
nursing|看護|派
chairperson|議長
leader|指導者、リーダー
queen|女王
prince|王子
hall|会館、ホール
library|図書館
gym|体育館
museum|博物館、美術館
theater|劇場
stadium|競技場
shrine|神社
tower|塔
exit|出口
corner|曲がり角、すみ
market|市場
ride|乗る
railroad|鉄道
subway|地下鉄
automobile|自動車
airport|空港
stair|(stairsで)階段
upstairs|上の階に
floor|床、階
roof|屋根
closet|クローゼット、押し入れ
shower|シャワー、にわか雨
housework|家事
glass|グラス、ガラス、(glassesで)眼鏡
brush|ブラシ
comb|くし
blanket|毛布
style|様式、スタイル
button|ボタン
ring|指輪、鳴る、鳴らす
jewel|宝石
wallet|財布
umbrella|傘
cotton|綿
feather|羽
supper|夕食
snack|軽食
chopstick|箸(ふつうはchopsticks)
delicious|とてもおいしい
steam|蒸気、蒸す
bake|(オーブンで)焼く
meat|肉
salt|塩
menu|献立、メニュー
comic|漫画、喜劇の
portrait|肖像画
tour|旅行、ツアー
tourism|観光(業)|派
tourist|旅行者|派
sightseeing|観光
camp|キャンプ
professional|プロの、専門職の
coach|コーチ
train|訓練する、列車、(a train of thoughtで)思考の流れ
indoor|屋内の
flag|旗
thunder|雷
sunlight|日光
sunshine|日差し
island|島
shore|岸
sand|砂
rock|岩
wild|野生の
bush|茂み
grass|草
leaf|葉
person|人
personal|個人の|派
personality|性格、個性|派
people|人々、民族
teenager|10代の若者
junior|年少の、年少者
hospital|病院
headache|頭痛
pat|軽くたたく
cheek|頬
lip|唇
tooth|歯
shoulder|肩、(責任を)担う
elbow|肘
finger|指
nail|爪、くぎ
toe|つま先、足の指
bone|骨
anger|怒り
joy|喜び
frank|率直な
frankly|率直に|派
e-mail|Eメール
joke|冗談
`;
WPS.VBOOK_DATA.base[7] = `
newspaper|新聞
title|題名、肩書き、権利
poem|詩
textbook|教科書
dictionary|辞書
college|大学
quiz|小テスト
homework|宿題
battery|電池
oil|石油、油
coal|石炭
metal|金属
steel|鋼鉄
astronaut|宇宙飛行士
drug|薬、薬物
come across|偶然出会う、偶然見つける
come out|発売される、出てくる
come up with|思いつく
count on [upon]|頼る、当てにする
cut down [back] on|減らす
drop in [on]|ちょっと立ち寄る
feel free to|自由に～する、遠慮なく～する
get along (with)|仲よくやっていく
get out of|～から逃れる、～から出る
get over|～から回復する、乗り越える
get through|切り抜ける、終える
give way (to)|譲歩する、崩れる
go along with|賛成する、従う
head for|～へ向かう
keep [bear] in mind|心に留めておく
keep [stay] in touch (with)|連絡を取り続ける
learn (how) to|～できるようになる
look back (on)|振り返る
look into|調査する、のぞき込む
look over|目を通す
look up to|尊敬する
make a difference (to)|影響がある、違いを生む
make [earn] a living|生計を立てる
make up|構成する、でっち上げる、(make up forで)埋め合わせる
pass away|亡くなる
point out|指摘する
put off|延期する、やる気をなくさせる
put together|組み立てる、まとめる
put up with|我慢する
run after|追いかける
run away (from)|逃げる
run out of|使い果たす
stand for|表す、意味する
stand out|目立つ、ずば抜けている
take A for B|AをBだと思う(間違える)
take place|起こる、行われる
take up|始める、(時間・場所を)占める
work on|取り組む
all at once|突然
all the way|はるばる、ずっと
along with|～と一緒に
at least|少なくとも
at (the) most|せいぜい、多くても
by way of|～を通って、～経由で
for some time|かなり長い間
face to face (with)|面と向かって
first of all|まず第一に
in advance|あらかじめ
in all|全部で
in place of|～の代わりに
in return (for)|お返しに
in the long run|長い目で見れば
in time (for)|間に合うように
on sale|販売されて、特売中で
on time|時間通りに
one by one|1つずつ
out of the question|論外で、不可能で
side by side (with)|並んで
become|～になる、似合う
take|連れて行く、持って行く、(時間・労力を)要する、～と受け取る
put|置く、言い表す
bring|持ってくる、連れてくる
send|送る
make|作る、～にする、～させる
know|知っている
knowledge|知識|派
hear|聞こえる、耳にする
begin|始める、始まる
cloth|布
clothing|衣類|派
iron|鉄、アイロン
peace|平和、静けさ
other|ほかの、別の、(the otherで)もう一方
each|それぞれ(の)
both|両方(の)
either|どちらか(の)、(否定文で)～もまた
neither|どちらも～ない
anything|(疑問文・条件文で)何か、(肯定文で)何でも
nothing|何も～ない
everything|すべての物
everyone|みんな
someone|誰か
anyone|(疑問文で)誰か、(肯定文で)誰でも
nobody|誰も～ない
asleep|眠って
alive|生きている
excited|興奮して、わくわくして
strange|奇妙な、見知らぬ
stranger|見知らぬ人、不案内な人|派
few|(a fewで)少しの、ほとんどない
little|(a littleで)少しの、ほとんどない、小さい
well|健康で、上手に、十分に、井戸
already|すでに、もう
yet|(否定文で)まだ、(疑問文で)もう、それにもかかわらず
ever|これまでに、いつか
twice|2度、2倍
only|～だけ、唯一の
always|いつも
sometimes|時々
whatever|何が～しようとも、～するものは何でも
whichever|どちらが～しようとも
whenever|～するときはいつでも
wherever|～する所ならどこでも
believe in|～の存在を信じる、～を信頼する
bring out|引き出す、出版する
bring up|育てる、(話題を)持ち出す
call for|必要とする、要求する
call off|中止する
decide on [upon]|決める
feel like (-ing)|～したい気がする
give up (-ing)|～することをやめる、あきらめる
go on (-ing)|～し続ける
have [be] nothing to do with|何も関係がない
lie in [with]|～にある
make oneself understood|自分の考えを伝える
pass on|伝える、回す
put away|片付ける
put on|身につける
take [have] a walk|散歩する
take time (to do)|(～するのに)時間がかかる
tell A from B|AとBを区別する
throw away|捨てる
try on|試着する
turn A into B|AをBに変える
turn off|(電気などを)消す
turn on|(電気などを)つける
turn out to be|～であることがわかる
turn over|ひっくり返す
be known for|～のことで有名だ
be unable to|～することができない
be used to (-ing)|～することに慣れている
be willing to|～してもかまわない、進んで～する
as ~ as ever|相変わらず～で
as usual|いつものように
as well|～もまた
at a loss|途方に暮れて
at present|現在
at the age of|～歳で
before long|間もなく
for a while|しばらくの間
for sure [certain]|確かに
for the sake of|～のために
in a [one] way|ある意味で
in danger of|～の恐れがあって
in (actual) fact|実際には
in turn|順番に、今度は逆に、その結果として
little by little|少しずつ
no doubt|きっと、疑いなく
one after another [the other]|次々と
right away [off]|直ちに
so far|これまでのところ
the other day|先日
to one's surprise|驚いたことに
as [so] far as|～する限りは
as many [much] as|～も多くの
both A and B|AもBも
either A or B|AかBのどちらか
each other|お互い
every other|1つおきの、～おきに
something is wrong with|～はどこか調子が悪い
What is ~ like?|～はどのようなものですか
program|計画、番組、プログラム
friendship|友情、交友関係
dry|乾燥した、乾かす
lock|鍵をかける、錠
list|一覧表、リスト
noise|騒音、物音
circle|円、仲間
proud|誇りに思って
fortunately|幸運にも
unfortunately|不運にも、残念ながら|派
less|より少なく、より少ない
because|なぜなら、～なので
identify|特定する、(identify withで)共感する
misidentify|誤認する|派
identification|特定、身分証明書|派
manufacture|製造する、製造
manufacturer|製造業者|派
occupy|占める、占領する
advise|忠告する
advice|助言、忠告|派
expose|さらす、暴露する
cure|治療する、治療法
region|地域
shift|変化、移す、移る、交替勤務
embarrass|恥ずかしい思いをさせる
approve|承認する、(approve ofで)賛成する
approval|承認|派
impress|感銘を与える
impressive|印象的な|派
impression|印象|派
concern|関係する、心配させる、懸念、関心事
concerned|関心を持っている、心配している、関係のある|派
concerning|～に関して|派
disappoint|失望させる
employ|雇う、用いる
employment|雇用|派
unemployment|失業|派
encounter|偶然出会う、遭遇
puzzle|戸惑わせる、難問
combine|結びつける、組み合わせる
combination|組み合わせ|派
determine|決める、決心させる
determination|決心、決定|派
individual|個人、個々の
vary|さまざまである、異なる
various|さまざまな|派
variety|種類、多様性|派
variable|変数、変わりやすい|派
variation|変化、変動|派
varied|さまざまな、変化に富んだ|派
medical|医療の
particular|特定の、(be particular aboutで)～にうるさい
particularly|特に|派
range|範囲、(range from A to Bで)AからBに及ぶ
specific|特定の、具体的な
due|(due toで)～が原因で、予定されている、支払期限の来た
characteristic|特徴、特有の
despite|～にもかかわらず
potential|潜在的な、可能性、潜在能力
account|(account forで)占める・説明する、口座、説明
accounting|経理、会計|派
stretch|伸ばす、広がる
stretcher|担架|派
congratulate|祝う
store|保存する、蓄える、店
cell|細胞、独房
decade|10年
communicate|伝える、意思を通じ合う
communication|伝達、コミュニケーション|派
arrange|手配する、並べる
arrangement|手配、配置|派
property|財産、(物質の)特性、不動産
efficient|効率的な
efficiency|能率、効率|派
delight|喜ばせる、喜び
delightful|楽しい、愉快な|派
access|利用(する権利)、接近、アクセスする
accessible|利用しやすい、近づきやすい|派
industry|産業、勤勉
industrial|産業の|派
economy|経済、節約
economic|経済の、経済学上の|派
economical|経済的な、節約になる|派
economist|経済学者|派
aspect|側面
spill|こぼす
accord|一致、協定、与える
according|(according toで)～によれば|派
interest|関心、利益、利子、興味を持たせる
interested|興味を持って|派
interesting|おもしろい|派
complex|複雑な、複合体、コンプレックス
complexity|複雑さ|派
significant|重要な、かなりの
significance|重要性|派
essential|不可欠な
perceive|認識する、気づく
perception|認識、知覚|派
weigh|～の重さがある、重さを測る、比較検討する
weight|重さ、体重|派
face|直面する、～に面する、顔
decorate|装飾する
decoration|飾り|派
decorative|装飾の|派
mass|大量、大衆、質量
massive|大量の、巨大な|派
eventually|最終的に、結局
revolution|革命、回転
previous|前の
deny|否定する、与えない
superior|より優れている、上司
electric|電気の、電動の
electricity|電気|派
electrical|電気の|派
succeed|(succeed inで)成功する、(家業などを)継ぐ
successful|成功した|派
success|成功|派
successor|後継者|派
successfully|うまく|派
succession|連続、継承|派
fundamental|根本的な
fundamentalism|原理主義|派
conduct|行う、(熱・電気を)伝える、指揮する、行動
moral|道徳的な、教訓
`;
WPS.VBOOK_DATA.base[8] = `
intend|～するつもりだ、意図する
intention|意図|派
intentional|故意の|派
unite|団結する、結びつける
united|団結した|派
evil|悪い、悪
conflict|対立、衝突
conflicting|相反する|派
annoy|いらいらさせる
progress|進歩、進む
progressive|進歩的な|派
capacity|能力、容量
reserve|予約する、取っておく、蓄え、保護区
reservation|予約、疑念、留保|派
reserved|控えめな|派
minister|大臣、牧師
curious|好奇心が強い、奇妙な
behave|ふるまう
danger|危険
dangerous|危険な|派
consequence|結果、重要性
worth|～の価値がある、価値
financial|財政的な、金融の
head|頭、責任者、向かう、率いる
recall|思い出す、回収する
entire|全体の
entirely|まったく、完全に|派
absorb|吸収する、没頭させる
absorption|吸収、没頭|派
capable|能力がある、(be capable ofで)～できる
former|前者、元の
seat|座らせる、座席、議席
generate|生み出す
generation|世代、発生|派
generator|発電機|派
conscious|意識している
consciousness|意識|派
domestic|国内の、家庭の
brilliant|すばらしい、輝かしい、明るく輝く
brilliance|輝き、才気|派
obtain|得る
pardon|許す、許し
agency|機関、代理店
fuel|燃料、(感情などを)あおる
legal|合法の、法律の
illegal|違法の|派
legally|法的に|派
instance|例
ignore|無視する
ignorant|無知の|派
ignorance|無知|派
strategy|戦略
strategic|戦略の|派
differ|(differ fromで)違う
different|違った|派
difference|違い|派
indifferent|無関心な|派
bargain|お買い得品、交渉する
contrary|反対の、(on the contraryで)それどころか
propose|提案する、結婚を申し込む
proposal|提案|派
thus|それゆえ、このように
divide|分ける
division|部門、分割、対立|派
assume|当然のことと思う、仮定する、(責任などを)引き受ける、(態度を)帯びる
assumption|仮定、想定|派
satisfy|満足させる、(条件を)満たす
dissatisfy|不満に思わせる|派
satisfied|満足して|派
desire|願望、強く望む
jam|渋滞、詰め込む
device|装置
colleague|同僚
content|内容、満足して、含有量、(contentsで)中身・目次
discontent|不満|派
phrase|句、言い回し
crop|作物、収穫
whereas|～だが一方
status|地位
anniversary|記念日
option|選択肢
laughter|笑い
emerge|現れる
emergence|出現|派
context|文脈、背景、状況
permit|許可する
permission|許可|派
basis|基礎、根拠
inform|知らせる
information|情報|派
informed|情報に通じた|派
demonstrate|示す、実演する、デモをする
demonstration|デモ、実演、立証|派
bilingual|2か国語を話す
possibly|ひょっとすると
perspective|視点、見通し
criticize|批判する
psychology|心理学、心理
psychologist|心理学者|派
cognitive|認知の
possess|所有している
possession|所有、所有物|派
vast|広大な、膨大な
vastness|広大さ|派
resemble|似ている
resemblance|類似|派
statistics|統計、統計学
pursue|追求する、追う
pursuit|追求|派
devote|ささげる、(devote oneself toで)～に専念する
devoted|献身的な|派
overall|全体的な、全体として
phenomenon|現象
phenomenal|驚異的な|派
urban|都市の
urbanization|都市化|派
symptom|症状
enormous|莫大な、巨大な
profit|利益
nonprofit|非営利の|派
stick|くっつける、くっつく、突き出す、棒、(stick toで)守り続ける
accuse|非難する、告発する
accusation|非難、告発|派
accused|(the accusedで)被告人|派
latest|最新の
tough|たくましい、困難な、硬い
honor|名誉、(約束を)守る、敬意を表す
afterward|その後
convey|伝える、運ぶ
emphasize|強調する
exaggerate|誇張する
occasionally|時々
gene|遺伝子
crisis|危機
seldom|めったに～ない
academic|学問の、大学の
relax|くつろぐ
relaxed|くつろいだ|派
lot|(a lot ofで)たくさん、運命、くじ、一区画の土地
soil|土、土壌
discrimination|差別、識別
invest|(invest inで)投資する
investment|投資|派
profession|職業、(特に専門的な)職業
defeat|打ち負かす、敗北
resist|抵抗する、我慢する
resistance|抵抗|派
resistant|抵抗力のある|派
cheat|ごまかす、カンニングする
classify|分類する
cruel|残酷な
steady|着実な、安定した
flexible|柔軟な
stable|安定した、馬小屋
stability|安定(性)|派
stabilize|安定させる|派
vague|曖昧な
shallow|浅い
consult|相談する、調べる
transfer|乗り換える、転勤する、移す
transference|移転|派
ingredient|材料、成分
district|地区
frustrate|いらだたせる、(計画を)くじく
frustrating|いらだたしい|派
frustration|いらだち、欲求不満|派
reluctant|気が進まない
reluctance|気が進まないこと|派
subtle|かすかな、微妙な
subtlety|微妙さ|派
declare|宣言する、申告する
molecule|分子
dedicate|捧げる
dedication|献身|派
organ|臓器、(組織の)機関、オルガン
organism|生物、有機体|派
contract|契約、(病気に)感染する、縮む、縮める
council|議会、評議会
wound|傷、傷つける
dominate|支配する
enhance|向上させる、高める
confirm|確認する
confirmation|確認|派
confirmed|確認された|派
resolve|解決する、決心する
resolute|断固とした|派
resolution|決心、解決、決議、解像度|派
detect|探知する、見つける
mutual|相互の
category|部門、カテゴリー
initial|最初の、頭文字
tremendous|すさまじい、巨大な
tremendously|非常に|派
illustrate|説明する、図解する
innovation|革新
abuse|虐待、乱用、乱用する、虐待する
component|構成要素
alter|変える
alteration|変更|派
shrink|縮む
deceive|だます
deception|だますこと、ごまかし|派
sustain|維持する、(損害・けがを)受ける、支える
sustainable|持続可能な|派
sustainability|持続可能性|派
assess|評価する
grain|穀物、粒
mammal|哺乳類
crucial|極めて重要な、重大な
decent|まともな、きちんとした
abundant|豊富な
abundance|豊富|派
ultimate|究極の
ultimately|最終的に|派
extra|余分な
manner|方法、態度、(mannersで)礼儀作法
accomplish|やり遂げる
accomplished|熟練した|派
compete|(compete withで)競争する
competition|競争|派
competitive|競争力のある、競争の|派
stream|小川、流れ
notion|概念、考え
accurate|正確な
inaccurate|不正確な|派
strive|努力する
rare|珍しい、まれな
trial|試み、裁判
firm|会社、(土台・信念などが)固い
dizzy|めまいがして
extreme|極端な
extremely|非常に|派
appetite|食欲
appetizer|前菜|派
severe|厳しい、深刻な
vocabulary|語彙
rumor|うわさ
circumstance|状況、事情
aged|年老いた、～歳の
educate|教育する
education|教育|派
educator|教育者|派
bet|賭ける、きっと～だと思う
document|書類、記録する
campaign|運動、キャンペーン
weep|しくしく泣く
fund|資金、資金を提供する
funding|資金提供|派
version|解釈、版
conclude|結論を下す、終える、終わる
conclusion|結論|派
conclusive|決定的な|派
pity|残念なこと、哀れみ
burden|重荷、負担
prejudice|偏見
expense|費用
expensive|高価な|派
debt|借金
compose|構成する、作曲する
attach|取り付ける、添付する
attachment|添付ファイル、愛着|派
invade|侵略する
invasion|侵略|派
interrupt|中断する、邪魔をする
obey|従う
persist|持続する、(persist inで)固執する
persistent|執拗な、持続する|派
persistence|粘り強さ|派
distinguish|区別する
distinguished|際立った、著名な|派
aggressive|攻撃的な、積極的な
delicate|繊細な、壊れやすい
passive|受動的な、消極的な
casual|気楽な、普段着の
urgent|緊急の
tragedy|悲劇
entertain|楽しませる、もてなす、(考え・疑いを)心に抱く
entertainment|娯楽|派
entertainer|芸人|派
ashamed|恥じて
hesitate|ためらう
sympathy|同情、共感
sorrow|悲しみ
sorrowful|悲しんでいる|派
imply|暗に意味する
implication|暗示、予想される影響|派
satellite|人工衛星
cooperate|協力する
cooperation|協力|派
cooperative|協力的な|派
affair|情勢、出来事、事柄
republic|共和国
stock|株、在庫
constitute|構成する
constitution|憲法、体質、構成|派
deprive|(deprive A of Bで)AからBを奪う
endure|耐える
endurance|忍耐|派
enduring|持続する、長続きする|派
investigate|調査する
`;
WPS.VBOOK_DATA.base[9] = `
investigation|調査|派
investigator|調査員|派
caution|用心、警告、警告する
evaluate|評価する
evaluation|評価|派
ridiculous|ばかげた
intense|強烈な、激しい
intensive|集中的な|派
intensity|強さ、激しさ|派
inevitable|避けられない
inevitability|避けられないこと|派
inevitably|必然的に|派
brief|手短な、短い
briefing|状況説明(会)|派
substantial|かなりの、実質的な
superstition|迷信
distribute|配る、分配する
distribution|分配、分布|派
faith|信仰、信頼
faithful|忠実な、誠実な|派
command|命令、(言語を)使いこなす力、命じる、(尊敬などを)集める
incredible|信じられない、すばらしい
evolution|進化、発展
therapy|治療、療法
donate|寄付する、(臓器などを)提供する
commerce|商業、通商
corporation|企業、法人
cope|(cope withで)うまく対処する
reverse|逆転させる、逆の、裏面、後退する
cease|やめる、～しなくなる
anticipate|予想する、楽しみに待つ
assure|保証する、安心させる
keen|鋭い、熱心な
relieve|和らげる、安心させる
diminish|減少する、減らす
postpone|延期する
tease|からかう
insult|侮辱、侮辱する
nutrition|栄養
ought|(ought toで)～すべきである、～のはずだ
in spite of|～にもかかわらず
fossil|化石
fossilize|化石化する|派
story|物語、(建物の)階
sake|(for the sake ofで)～のため
welfare|福祉、幸福、生活保護
target|目標、標的、ねらう
rural|田舎の
time|時間、時代、～回・～倍
starve|飢える、飢えさせる
starvation|飢餓|派
spring|春、ばね、泉、飛び出す、(spring fromで)～から生じる
surgery|手術、外科
biological|生物学の、生物の
sufficient|十分な
insufficient|不十分な|派
sufficiency|十分(な量)|派
sufficiently|十分に|派
temporary|一時的な
temporarily|一時的に|派
used|(used toで)以前は～だった、(be used toで)～に慣れている、中古の
impose|課す、押しつける
primitive|原始的な
literature|文学、文献
first|第1の、最初に
sore|痛い、ひりひりする
swell|ふくらむ、腫れる
threat|脅威、恐れ
infant|乳児
typical|典型的な、特有の
typically|典型的に、通常|派
faint|かすかな、気絶する
solid|固体(の)、しっかりした
disabled|障がいのある
stiff|硬い、凝った
stiffen|堅くする、こわばる|派
deposit|預金、保証金、堆積物、預ける
depository|貯蔵所、保管所|派
purchase|購入する、購入
horror|恐怖
recession|不況、後退
outcome|結果
billion|10億
analysis|分析
trait|特性、特徴
confidence|自信、信頼
string|ひも、弦、一続き
settle|解決する、定住する、(代金を)支払う、落ち着かせる
settlement|解決、入植地|派
household|世帯、家族、家庭の
evolve|進化する、発展する
resign|辞職する、(resign oneself toで)～をしかたなく受け入れる
resignation|辞職、あきらめ|派
facility|施設、設備、才能
aid|援助、助ける
organize|組織する、まとめる、準備する
organization|組織、団体|派
organizer|主催者|派
proceed|進む、続ける
elect|(選挙で)選ぶ
election|選挙|派
emit|排出する、(光・音などを)発する
emission|排出、排出物|派
sneeze|くしゃみをする、くしゃみ
bury|埋める、埋葬する
modest|謙虚な、控えめな、ささやかな
precise|正確な、精密な
precision|正確さ|派
plain|明白な、質素な、平原
plainly|明らかに、はっきりと|派
abstract|抽象的な、要旨
abstraction|抽象(概念)|派
spare|予備の、余分な、(時間などを)割く、(spare A Bで)AにBを免れさせる
credit|信用、功績、(大学の)単位、(credit A with Bで)BをAの功績と認める、信用取引
despair|絶望、絶望する
shame|恥、残念なこと
otherwise|さもなければ、ほかの点では、別のやり方で
heal|治す、治る
infect|感染させる
infection|感染(症)|派
infectious|伝染性の|派
labor|労働、労働者
union|(労働)組合、連合、結合
reunion|再会、同窓会|派
editor|編集者
client|依頼人、顧客
chase|追いかける
ecology|生態学、生態系
ecologist|生態学者|派
philosophy|哲学、理念
dull|退屈な、鈍い
meanwhile|その間に、一方では
soul|魂、精神
gravity|重力、重大さ
scent|香り、におい
instinct|本能
optimistic|楽観的な
noble|高潔な、貴族の
dense|密集した、濃い
density|密度|派
legend|伝説
literacy|読み書きの能力、(特定分野の)知識・能力
deaf|耳が聞こえない
distinct|明らかに異なる、はっきりした
distinctive|他と区別できる、独特の|派
distinction|区別、卓越、特徴|派
pale|青白い、(色が)淡い
concrete|具体的な、コンクリート
virus|ウイルス
ensure|確実にする、保証する
reputation|評判
room|部屋、余地
way|方法、道、点
ban|禁止、禁止する
eliminate|排除する、取り除く
elimination|除去、排除|派
accompany|同行する、～に伴う
commit|(罪を)犯す、(commit oneself toで)～に専念する・約束する
commitment|約束、献身、責任|派
tribe|部族
norm|規範、標準
sensitive|敏感な、傷つきやすい
actual|実際の
actually|実は、実際に|派
actuality|現実|派
intellectual|知的な、知識人
restrict|制限する
restrictive|制限する、制限的な|派
immigrant|(外国からの)移民
numerous|多くの
inspire|奮起させる、着想を与える
inspiration|ひらめき、霊感|派
violence|暴力
interact|(interact withで)交流する、相互に作用する
interaction|交流、相互作用|派
interactive|双方向の|派
trace|たどる、跡、痕跡
traceability|追跡可能性|派
abolish|廃止する
abolition|廃止|派
permanent|永久的な
stimulate|刺激する
stimulating|刺激的な|派
violate|違反する
violation|違反|派
contemporary|現代の、同時代の、同時代の人
cough|咳をする、咳
bound|(be bound toで)きっと～する、(bound forで)～行きの、(bound byで)～に拘束された
boundless|無限の|派
laboratory|研究室、実験室
nevertheless|それにもかかわらず
carbon|炭素
exhaust|疲れ果てさせる、使い果たす、排気ガス
exhausted|疲れ果てた|派
exhaustion|極度の疲労、枯渇|派
extent|程度、範囲
obstacle|障害(物)
transmit|伝える、送る
transmission|伝達、伝送|派
transmitter|送信機|派
wage|賃金
burst|破裂する、(burst intoで)突然～しだす
dismiss|退ける、解雇する
breed|繁殖する、育てる、品種
prohibit|禁じる
prohibition|禁止|派
racial|人種の
diversity|多様性
grasp|つかむ、理解する
collapse|崩壊する、倒れる、崩壊
advertise|宣伝する、広告する
advertising|広告(業)|派
advertisement|広告|派
overlook|見落とす、見下ろす、大目に見る
suburb|郊外
qualify|資格がある、資格を与える、(発言に)条件をつける
qualified|有能な、資格のある|派
disqualified|資格を失った|派
qualitative|質の、質的な|派
qualification|資格|派
assign|割り当てる、任命する
assignment|課題、任務|派
register|登録する、記録する
commute|通勤する、通学する
proportion|割合、釣り合い
hang|掛ける、掛かっている、絞首刑にする
memorize|暗記する
extinct|絶滅した
extinction|絶滅|派
volume|体積、音量、(本の)巻、量
nap|昼寝
height|高さ、身長
heighten|高める|派
depress|憂うつにさせる、(景気を)悪化させる
depression|憂うつ、不景気|派
depressed|元気のない、落ち込んだ|派
largely|大部分は、主に
bless|祝福する
blessing|ありがたいもの、恵み|派
prison|刑務所
prisoner|囚人|派
horrible|ひどい、恐ろしい
lessen|減らす、少なくなる
heaven|天国
absolute|絶対的な、完全な
absolutely|まったく、絶対に|派
bully|いじめる、いじめっ子
bullying|いじめ|派
primary|主な、最初の、初等の
thorough|徹底的な
thoroughly|徹底的に|派
fine|立派な、元気な、晴れた、細かい、罰金、罰金を科す
mineral|鉱物、ミネラル
rear|育てる、後部、後ろの
precisely|正確に、まさに
mood|気分、雰囲気
currency|通貨
ambitious|野心的な
religious|宗教的な、信心深い
pollute|汚染する
pollution|汚染|派
pollutant|汚染物質|派
physics|物理学
construct|建設する、組み立てる
construction|建設|派
reconstruct|再建する、復元する|派
inferior|より劣った
inferiority|劣っていること|派
curve|曲線、カーブ
pessimistic|悲観的な
interpret|解釈する、通訳する
retail|小売り
retailer|小売業者|派
convert|変換する、転向させる
conversion|転換、変換|派
mate|連れ合い、仲間
goods|商品
transform|(すっかり)変える
transformation|変化、変形|派
nod|うなずく
makeup|構成、化粧
arise|起こる、生じる
code|規定、暗号
capture|捕らえる、(心を)つかむ
lean|寄りかかる、傾く、やせた、無駄のない
substitute|代わりに使う、代用品
substitution|代用、置き換え|派
boost|高める、押し上げる
resort|行楽地、(resort toで)～に訴える・頼る
widespread|広範囲にわたる
confront|直面する、立ち向かう
confrontation|対立|派
motive|動機
equip|装備させる、備え付ける
equipment|装備、機器|派
linguistic|言語の
annual|年に1度の、毎年の
bleed|出血する
crash|衝突する、墜落する、衝突
specialize|(specialize inで)専門にする
`;
// Part 10:画面写真から全300語(見出し241・派生59)を入力
WPS.VBOOK_DATA.base[10] = `
prompt|迅速な、促す
withdraw|引っ込める、引き出す
interfere|(interfere withで)干渉する
gaze|見つめる
launch|打ち上げる、始める
glance|ちらりと見る
insight|洞察／見識
insightful|洞察に満ちた|派
foster|育む
stumble|つまずく
oblige|義務づける
obligation|義務|派
stem|茎、(stem fromで)〜に由来する
scratch|ひっかく
embrace|抱きしめる、受け入れる
via|〜経由で
border|国境
astonish|驚かせる
dialect|方言
correspond|(correspond toで)一致する、やりとりする、(correspond toで)相当する
correspondence|通信|派
correspondent|特派員|派
will|意志、遺言書
hand|手、(時計の)針
handful|一握りの量|派
now|今
so|だから
emphasis|強調
weaken|弱める
body|体、死体、団体
elder|年上の
motivate|〜に動機を与える
motivation|モチベーション|派
say|言う、書いてある
saying|ことわざ|派
must|〜しなければならない、〜に違いない
data|データ
as|〜として、〜するとき、〜なので、〜するように、〜につれて
then|その時
identity|身元、同一性
peak|頂点
eyesight|視力
wealthy|裕福な
addition|追加
additional|追加の|派
palace|宮殿
confident|自信のある
confidential|機密の|派
primarily|主に
willing|嫌がらずに〜する|派
unwilling|したがらない|派
evident|明らかな
evidently|明らかに|派
afterward(s)|その後
long|(long forで)切望する、長い、長い間
length|長さ|派
sit|座る
quickly|速く
naturally|自然に
blind|目の見えない
healthy|健康な
silence|沈黙
chemistry|化学
instruct|指示する
instruction|指示、教育|派
closely|密接に、注意深く
intentionally|故意に
broad|広い
superstitious|迷信的な
subsequently|その後
alongside|〜のそばに
lawyer|弁護士
transport|輸送する
exact|正確な
exactly|正確に|派
globe|地球
globalism|グローバリズム|派
exclude|除外する
excluding|除いて|派
exclusion|除外|派
depart|出発する
department|部門|派
departure|出発|派
cast|投げる、配役、(光・疑いを)投げかける
scatter|まき散らす
attribute|〜のせいだとする、特性
stereotype|固定観念
stereotypical|固定観念的な|派
stereotypically|型どおりに、固定観念で|派
neglect|怠る、放置する
scare|おびえさせる
scared|怖がって|派
rank|位置づける
stir|かき混ぜる
stir-fry|炒める|派
stirring|感動的な|派
enthusiasm|熱意
tiny|とても小さな
witness|目撃者、目撃する
imitate|まねる
substance|物質、実質／内容
equivalent|同等の
undertake|引き受ける
multiple|複数の
drown|溺れ死ぬ
split|割る
constant|絶え間ない、一定の
constantly|絶えず|派
stomachache|腹痛
descend|降下する
descendant|子孫|派
irritate|いらいらさせる
visual|視覚の
visually|視覚的に|派
enterprise|企業、事業、進取の気性
counterpart|対応する人
install|設置する
installation|取り付け|派
load|荷、積む
urge|強く勧める
urgency|さし迫ったこと|派
odd|奇妙な、奇数の
bump|ぶつかる
bumper|バンパー|派
bumpy|でこぼこの|派
strain|負担、(生物の)系統、無理に力を加える
cultivate|耕す、育む
temper|気性
stare|じっと見つめる
tongue|舌、言語
endanger|危険にさらす
endangered|絶滅の危機にある|派
glimpse|ちらりと見る
faculty|能力、(大学の)学部、(大学の)教員団
somewhat|いくぶん
drag|引きずる
vehicle|乗り物、伝達手段
yawn|あくびをする
alien|異質な、外国人
alienate|疎外する|派
administration|経営、政権
accidentally|偶然、誤って
candidate|候補者
love|愛している
handsome|ハンサムな
money|お金
want|欲しい
juice|ジュース
again|再び
happy|うれしい
thank|感謝する
sweet|甘い
surprise|驚かす
surprised|驚いて|派
straw|ストロー、わら
package|包み
turtle|カメ
finally|とうとう
beach|浜辺
rope|ロープ
look|見る、見える
dish|皿、料理
surprisingly|驚くほど
eco-friendly|環境にやさしい
church|教会
number|数
jog|ジョギング
differently|異なって
indoors|屋内で
world|世界
worldwide|世界的な
fortunate|幸運な
often|しばしば
think|思う
thought|考え|派
thoughtful|思いやりがある|派
thoughtless|不注意な、思いやりのない|派
gift|贈り物、才能
rarely|めったに…ない
business|商売、会社
backward|後ろへ
team|チーム
fool|愚か者、だます、(make a fool ofで)ばかにする
contradictory|矛盾している
conserve|保護する、節約する
conservation|保護|派
conservationist|自然保護論者|派
breath|息
breathing|呼吸|派
bath|入浴、浴槽
use|使う
useful|役に立つ|派
useless|役に立たない|派
marriage|結婚
tail|しっぽ
later|あとで
musical|音楽の
run|立候補する、経営する、走る、作動する、(実験・プログラムを)実行する
carefully|注意深く
angel|天使
animal|動物
group|グループ
please|喜ばせる
pleasant|楽しい|派
pleasure|喜び|派
pleased|喜んで|派
unpleasant|不愉快な|派
strong|強い
strength|力|派
strengthen|強くする|派
city|都市
creative|創造力のある
creativity|創造性|派
next|次の
exciting|わくわくさせる
romantic|恋愛の
warm|暖かい
slow|遅い
unbelievable|信じられない
test|検査
summary|要約
reader|読者
journalist|ジャーナリスト
well-known|よく知られている
impatient|いらいらしている
reluctantly|いやいやながら
poor|貧しい
wall|壁
like|好む、〜のような
hungry|空腹の
family|家族
study|勉強、研究、書斎、勉強する／研究する
sleepy|眠い
economics|経済学
institute|研究所、設ける
institution|機関、制度|派
secondary|第2の
difficulty|困難
lifestyle|生活様式
drink|飲む
cool|冷える
social|社会の、社交の
toward(s)|の方へ
tiring|疲れさせる
doctor|医者、博士
vitamin|ビタミン
small|小さい
corn|トウモロコシ
bean|豆
alcohol|アルコール
alcoholism|アルコール依存症|派
smoke|煙
calorie|カロリー
farmer|農家
noisy|騒々しい
pan|フライパン
shell|殻
shock|衝撃
shocked|ショックを受けた|派
tightly|ぴったりと
grammar|文法
interpretation|解釈
importantly|重要なことには
mirror|鏡
garden|庭
prey|餌食
routine|日課
distress|苦しみ
distressful|苦しみを引き起こす|派
twist|ひねる
twisted|ねじれた|派
appoint|任命する
appointment|予約、約束、任命|派
threaten|脅かす
threatened|絶滅の危機に瀕した|派
discipline|しつけ、(学問の)分野、規律、訓練する
rid|取り除く
dye|染める
rub|こする
dip|浸す
lag|遅れる
apt|〜する傾向がある、適切な
myth|神話、根拠のない通念
stroke|脳卒中、なでる、一打
hypothesis|仮説
physician|医師
peer|仲間、じっと見る
shelter|避難住居
vessel|管、船
colony|植民地、群落
territory|領土、縄張り
layer|層
advent|到来
leak|漏れる
vital|不可欠な
vitality|元気|派
clap|たたく
divorce|離婚する
virtual|仮想の、事実上の
virtually|事実上|派
`;
// Part 11:画面写真から全300語(見出し250・派生50)を入力
WPS.VBOOK_DATA.base[11] = `
spectator|観客
extraordinary|並外れた
immediate|即座の
immediately|すぐに|派
span|期間、(橋の)径間／幅
dimension|側面、寸法、次元
tap|軽くたたく、(資源を)利用する、蛇口
calculate|計算する
fate|運命
fatality|死亡者|派
fade|薄れる
dose|服用量
toll|犠牲者、(道路の)通行料
folk|人々
soak|浸す
soaked|ずぶぬれの|派
bond|きずな、公債
roam|歩き回る
roaming|放浪|派
genuine|本物の
sigh|ため息をつく
sophisticated|高度な、洗練された
sophistication|洗練|派
overnight|一晩
fellow|仲間
charm|魅力
charming|魅力的な|派
incident|出来事
incidental|付随して起こる|派
peculiar|独特な
venture|事業
stubborn|頑固な
stubbornly|頑固に|派
stubbornness|頑固さ|派
comfort|快適さ、慰め
comfortable|快適な|派
discomfort|不快|派
strip|細長い一片、はぎ取る
relevant|関連のある
irrelevant|無関係の|派
relevance|関連性|派
dawn|夜明け
barrier|障壁
skip|飛ばす、サボる
outlook|見通し
awkward|ぎこちない、気まずい
awkwardly|ぎこちなく|派
output|出力
polish|磨く
mine|鉱山、地雷
wit|機知
sin|罪
log|丸太
kingdom|王国
boundary|境界
broaden|広げる
habitat|生息地
tide|潮
fasten|締める、固定する
prime|最重要な、素数
outstanding|傑出した、未払いの／未解決の
unknown|不明の
humid|湿気が多い
internal|内部の
do|する、行う、与える、間に合う／十分である
AI|人工知能
pesticide|農薬
mature|成熟した
monitor|監視する、画面
parallel|平行の、類似
loan|ローン
generous|寛大な、気前のよい
visible|見える
invisible|見えない|派
visibility|視界|派
bold|大胆な
tidy|きちんとした
vain|無駄な
vice|悪徳、悪習
grab|つかむ
bind|縛る、義務づける、(本を)綴じる
binding|拘束力のある|派
mess|乱雑
messy|乱雑な|派
dare|思い切って〜する
daring|大胆な|派
cite|引用する
germ|細菌
jury|陪審
pose|引き起こす
flaw|欠点
neat|きちんとした
neatly|きちんと|派
mock|模擬の、あざける
ease|容易さ、和らげる
sole|唯一の、足の裏、靴底
tomb|墓
shed|流す、小屋、(葉・毛を)落とす
cram|詰め込み勉強をする
omit|省く
riot|暴動
bulk|大半
unexpected|思いがけない
guarantee|保証する
ethnic|民族の
ethnicity|民族的特徴|派
intimate|親密な
democracy|民主主義
minimum|最小限度
latter|後者の
sacrifice|犠牲にする
mission|任務
valid|有効な、妥当な
invalid|無効な|派
validity|妥当性、有効性|派
route|経路
inquiry|調査、質問
retain|保持する
sincere|誠実な
sincerity|誠実|派
random|無作為の
profile|プロフィール、横顔、知名度
desperate|必死の、絶望的な
convention|慣習、大会、条約
conventional|従来の|派
craft|工芸
pop|ひょいと動く
jar|びん
frontier|辺境
exceed|超える
precious|貴重な
vacant|空いている
vacancy|空き|派
inherit|受け継ぐ
ethic|倫理
ethical|倫理的な|派
sweep|掃く
boast|(boast ofで)自慢する、(優れたものを)持っている
orbit|軌道
seize|つかむ、押収する
steep|急な
steeply|急に|派
usage|用法
curse|呪い、呪う
fluid|流体、流動的な
rebel|反逆者
crawl|這って進む
smash|粉砕する
alert|油断のない、警告する
decay|腐る、衰える
harsh|厳しい
swift|素早い
ample|十分な
gross|総計の、ひどい
draft|下書き、徴兵
dread|恐れる
mercy|慈悲
merciful|慈悲深い|派
exert|働かせる
bribe|賄賂
bribery|贈賄|派
terminal|末期の、終点
guilty|有罪の、罪悪感がある
predator|捕食動物
deserve|値する
modify|修正する
modification|修正|派
undergo|経験する
dramatic|劇的な
acknowledge|認める
acknowledgment|承認、謝辞|派
tropical|熱帯の
patent|特許
assert|主張する
assertion|主張|派
assertive|自己主張の強い|派
verbal|言葉による
nonverbal|言葉を使わない|派
vein|静脈
bare|むき出しの
barely|かろうじて|派
heir|相続人
slap|平手打ちする
foul|不快な、反則
lure|誘い込む
pill|錠剤
herd|群れ
mode|方式
jail|刑務所
grip|握る
deed|行為、証書
fame|名声
rational|理性的な
irrational|不合理な|派
sequence|連続
restore|回復する、修復する
restoration|修復|派
fake|偽の
innocent|無実の、無邪気な
immigration|移民
punctual|時間を守る
lord|神
motion|動き、動議
regulate|規制する
regulation|規則|派
bar|禁じる、棒、障害
HIV|HIV
LED|発光ダイオード
inn|旅館
tag|札
gap|差
rug|敷物
cab|タクシー
fur|毛皮
naked|裸の
core|核心、芯
tense|緊張した、時制
tension|緊張|派
submit|提出する、服従する
submission|服従|派
submissive|従順な|派
enclose|同封する、囲む
enclosure|囲い|派
means|手段、(特定な表現で)財産
chaos|大混乱
flock|群れ
grace|優美さ
graceful|優雅な|派
fancy|高級な
pause|休止
mourn|嘆く
probe|探査機、探針、調査する
yield|産出する、屈する、収穫量／収益
weary|疲れている
flesh|肉
erect|直立した、建てる
erection|建設|派
reign|統治
asset|資産
drift|漂う
flame|炎
grave|墓、(形容詞で)重大な
graveyard|墓地|派
realm|領域
phase|段階
adore|熱愛している
utter|発する、まったくの
utterly|まったく|派
surge|急増
frown|眉をひそめる
cling|(cling toで)しがみつく、固執する
evoke|呼び起こす
token|しるし
quest|探求
scorn|軽蔑
stray|野良の、道に迷った
naive|世間知らずの
prone|〜しがちである
dispute|論争
manual|手作業の、手引き書
conquer|征服する、克服する
weed|雑草
pollen|花粉
accordingly|従って
fragment|破片
luxury|ぜいたく
prospect|見込み
bias|偏見、偏り
biased|偏った|派
tissue|組織、ティッシュ
solar|太陽の
dialogue|対話
privilege|特権
justice|正義
ripe|熟した
ripen|熟する|派
greedy|貪欲な
weird|奇妙な
mend|修理する
coin|硬貨、(新語を)作り出す
wane|衰える
post|投稿する、地位／職、郵便
hive|ミツバチの巣
slip|滑る
knot|結び目
flip|裏返す
shortage|不足
vanish|消える
selfish|自分勝手な
attain|達成する
attainment|達成|派
hazard|危険
bounce|跳ねる
revise|修正する
sphere|球体、領域
plague|疫病
immune|免疫がある、免れた
scheme|計画、陰謀
treaty|条約
compel|強制する
`;
// Part 12:画面写真から全300語(見出し235・派生65)を入力
WPS.VBOOK_DATA.base[12] = `
compelling|説得力のある|派
divert|そらす
diversion|気晴らし|派
betray|裏切る、(感情・秘密を)うっかり示す
rotate|回転する
revive|生き返る
resume|再開する、履歴書
hybrid|交配種
humble|謙虚な、卑しい
thrive|繁栄する、よく育つ
gloomy|薄暗い
exotic|異国風の
exoticism|異国情緒|派
expire|期限が切れる
domain|分野、領域／縄張り
intake|摂取
ritual|儀式
legacy|遺産
depict|描く
depiction|描写|派
resent|憤慨する
resentful|怒った|派
resentment|怒り|派
slight|わずかな
hinder|妨げる
pledge|誓う
famine|飢饉
staple|主食
reform|改革する
reformation|改革|派
federal|連邦の
heritage|遺産
secondhand|中古の
deadline|締め切り
virtue|美徳、長所
protein|たんぱく質
miserable|悲惨な
wipe|拭く
fond|好きだ
disability|障害
outweigh|〜に勝る
adequate|十分な
inadequate|不十分な|派
unify|統一する
prior|〜より前の
priority|優先事項|派
shrug|すくめる
crack|割れる
haste|急ぐこと
infer|推測する
inferred|推測する|派
erupt|噴火する
eruption|噴火|派
skull|頭蓋骨
haunt|つきまとう
haunted|取りつかれた|派
stain|シミ
stainless|ステンレス製の|派
slang|俗語
vomit|吐く
flush|紅潮する
enact|制定する
timid|臆病な
stern|厳しい
irony|皮肉
nerve|神経
nervous|緊張して|派
theft|窃盗
steer|操縦する
renew|更新する
renewal|更新|派
chart|グラフ
ratio|比率
rationalism|理性主義|派
rationalist|合理主義者|派
rationalize|正当化する|派
erase|消す
eraser|消しゴム|派
queue|列
leap|跳ぶ
mankind|人類
session|期間
derive|(derive fromで)由来する、引き出す
derivation|由来|派
derivative|派生した|派
secure|確保する、安全な、固定する
security|安全|派
energetic|活発な
nice|やさしい
easy|簡単な
uneasy|不安な|派
easily|たやすく|派
much|たくさん
doze|うたた寝する
NEET|ニート
zeal|熱意
zealous|熱心な|派
wary|用心深い
skim|拾い読みする
boom|ブームになる、急成長する
AIDS|エイズ
coma|昏睡
mist|霧
atom|原子
grit|根性
clay|粘土
poet|詩人
edit|編集する
edition|版|派
busy|忙しい
lost|紛失した
home|生息地、家／家庭
geek|オタク
ogre|鬼
axis|軸
mail|郵便物
snob|俗物
rein|手綱
sail|航海をする
boss|上司
euro|ユーロ
claw|爪
scar|傷跡
lens|レンズ
glacier|氷河
primate|霊長類
imaginative|想像力豊かな
risky|危険な
remedy|治療法
agenda|協議事項
debris|破片
voyage|航海
enrich|豊かにする
priest|神父
divine|神の
divinity|神であること|派
Muslim|イスラム教徒
comply|(comply withで)従う
estate|財産
margin|余白、差、利幅
marginal|わずかな|派
marginally|わずかに|派
spouse|配偶者
tackle|取り組む
worsen|悪化する
induce|引き起こす
induction|導入|派
inducement|促すこと|派
insert|差し込む
insertion|挿入|派
thesis|論文、テーマ
galaxy|銀河
defect|欠陥
clumsy|不器用な
innate|生まれつきの
innately|生まれつき|派
tender|柔らかい、優しい
thrill|ぞくぞくさせる
thrilled|とてもうれしい|派
liable|〜しがちだ、(liable forで)〜に法的責任がある
pierce|突き刺す
embody|具体化する
census|国勢調査
vacuum|真空
wicked|悪意のある
scarce|乏しい
scarcity|不足|派
broadcast|放送する
destiny|運命
destined|運命づけられた、(be destined forで)〜行きの／〜宛ての|派
crew|乗組員
tone|口調、音色
wisdom|知恵
brand-new|新品の
mere|単なる
merely|単に|派
coward|臆病者
civilization|文明
blossom|花が咲く
lower|下げる
given|決められた、〜を考慮すると
vowel|母音
agony|苦痛
endow|授ける
endowed|恵まれた|派
sober|酔っていない
await|待つ
awaiting|待つ|派
greed|強欲
click|クリックする
drone|ドローン
fatal|致命的な
mimic|まねる
vapor|蒸気
fairy|妖精
brand|ブランド
swing|揺らす
basin|流域、盆地、洗面器
spray|吹きかける
blend|混ぜる
blade|刃
stalk|忍び寄る、茎
repay|返済する
isolate|孤立させる
isolation|孤立|派
isolated|孤立した|派
scarcely|ほとんど〜ない
recruit|採用する
triumph|勝利
triumphant|勝ち誇った|派
uncover|明らかにする
cherish|大切にする
supreme|最高の
funeral|葬式
microbe|微生物
microbial|微生物の|派
fatigue|疲労
consent|合意
hygiene|衛生
conform|(conform toで)合わせる
conformity|順応|派
enforce|施行する
enforcement|実施|派
revenue|歳入、収益
hostile|敵意のある
confine|閉じ込める、制限する
utilize|利用する
utilization|利用|派
conceal|隠す
prevail|普及している、勝る
tuition|授業料
drought|干ばつ
fertile|肥沃な
fertility|肥沃|派
fertilizer|肥料|派
obscure|わかりにくい、あまり知られていない、見えにくくする
fragile|壊れやすい
fragility|壊れやすさ|派
precede|先行する
precedent|先例|派
confess|白状する
furious|激怒した
impulse|衝動
radical|根本的な、急進的な
radicalism|急進主義|派
radically|根本的に|派
trivial|ささいな
triviality|取るに足らないこと|派
surpass|上回る
dictate|命令する、左右する
dictator|独裁者|派
provoke|引き起こす、怒らせる
provocation|挑発|派
provocative|挑発的な|派
disgust|嫌悪を抱かせる
disgusting|むかつくような|派
surplus|余剰
cuisine|料理
questionnaire|アンケート
opponent|対戦相手、反対者
discount|割引、割り引く、重要でないとみなす
quote|引用する
portion|部分、1人前
moderate|適度な
laundry|洗濯
incentive|動機づけ
clarify|明らかにする
clarification|明確化|派
grocery|食料品店
grocer|食料品店の主人|派
fortune|財産、運
particle|粒子
correlation|相関
frequent|頻繁な、しばしば訪れる
frequently|頻繁に|派
offend|怒らせる
offensive|不快な、攻撃的な|派
offending|怒らせる|派
empire|帝国
emperor|皇帝|派
accent|なまり、アクセント
namely|すなわち
lament|嘆く
behalf|(on behalf ofで)〜のために／〜を代表して
esteem|尊敬する、尊敬
Arctic|北極の
summit|首脳会議、頂上
allege|主張する
allegation|主張|派
marine|海の
ascend|上がる
delete|削除する
procedure|手続き
aisle|通路
radiation|放射線
forth|前へ
elite|エリート
transplant|移植する
transplantation|移植|派
congress|議会
`;
// Part 13:画面写真から全257語(見出し211・派生46)を入力
WPS.VBOOK_DATA.base[13] = `
congressman|国会議員|派
script|台本
haven|避難所
shoes|靴
scary|恐ろしい
where|〜するところで
widow|未亡人
gloss|光沢
sneer|あざ笑う
creep|這う
query|質問
entry|記事、入ること、記入項目
emoji|絵文字
moist|湿った
clone|クローン
taboo|タブー
creed|信条
abide|(abide byで)従う
epoch|時代
olive|オリーブ
villa|別荘
house|収容する、家
manga|マンガ
deity|神
broth|だし
table|表、食卓／テーブル
paste|貼る、のり
kneel|ひざまずく
scrub|ごしごし磨く
water|水辺、水をやる、水
video|映像
lapse|経過する
might|かもしれない、(名詞で)力
badly|下手に、ひどく
owner|所有者
ownership|所有権|派
madam|奥様
usual|いつもの
unusual|珍しい|派
puppy|子犬
aloud|声を出して
geography|地理
geographer|地理学者|派
geographical|地理の|派
geographic|地理的な|派
biography|伝記
proverb|ことわざ
proverbial|ことわざの|派
asteroid|小惑星
fluent|流暢な
fluently|流ちょうに|派
fluency|流暢さ|派
neutral|中立の、(色が)控えめな
eternal|永遠の
oppress|圧迫する
oppression|抑圧|派
trigger|引き起こす、(銃の)引き金
formula|公式、方法、(数学の)公式
formulaic|決まり文句の|派
formulation|定式化、策定|派
nourish|栄養を与える
dignity|威厳
pension|年金
deficit|赤字
distort|歪める
distortion|ゆがみ|派
refrain|(refrain fromで)控える
squeeze|搾る
execute|実行する、処刑する
executive|幹部|派
suspend|吊るす、中断する
extract|抽出する、抜粋
inspect|検査する
inspection|検査|派
inspector|視察官|派
erosion|侵食
exploit|利用する、搾取する
exploitation|搾取|派
nurture|育てる
ongoing|進行中の
worship|崇拝
startle|驚かせる
startling|驚くべき|派
despise|軽蔑する
discard|捨てる
inhibit|抑制する
inhibition|抑制、ためらい／遠慮|派
inhibitor|阻害物質|派
prolong|長引かせる
posture|姿勢
sibling|兄弟姉妹
immense|莫大な
migrate|移住する、渡る
fuss|大騒ぎ
quarrel|口論する
pregnant|妊娠した
astronomy|天文学
passion|情熱
guideline|ガイドライン
genius|天賦の才
subscribe|定期購読する、(subscribe toで)賛同する
subscriber|加入者|派
hemisphere|半球
skeleton|骨格
companion|仲間
artistic|芸術的な
antibiotic|抗生物質
antibiotics|抗生物質|派
ponder|熟考する
dismay|うろたえさせる
asylum|亡命
feudal|封建制の
solemn|厳粛な
notify|知らせる
mortal|致命的な、死を免れない
mortality|死亡率|派
finite|有限の
infinite|無限の|派
infinitely|無限に|派
utmost|最大限の
excess|過剰
excessive|過度の|派
versus|〜対〜
awaken|目覚めさせる
litter|散らかす
refuge|避難
aspire|(aspire toで)熱望する
aspiration|熱望|派
clinic|診療所
clinical|臨床の|派
overdo|やり過ぎる
gently|優しく
series|連続
literary|文学の
liberal|自由主義の、(liberal artsで)一般教養の、寛大な
compliment|褒め言葉
perfume|香水
feast|宴会
highlight|強調する
monument|記念碑
bankrupt|倒産した
suppress|抑える
overtake|追い抜く
disguise|変装する、隠す、変装
altitude|標高
courtesy|礼儀正しさ
medieval|中世の
retrieve|回収する
distract|気を散らす
distraction|気をそらすもの|派
disclose|公表する
disclosure|暴露|派
restrain|抑制する
restraint|抑制|派
friction|摩擦
epidemic|流行
diabetes|糖尿病
monopoly|独占
tremble|震える
jealous|嫉妬した
apparent|明白な、一見〜らしい
apparently|どうやら〜らしい|派
compound|化合物、複合的な、(問題を)悪化させる
merchant|商人
yell|叫ぶ
motor|モーター
cattle|ウシ
loyal|忠実な
negotiate|交渉する
negotiation|交渉|派
good|良い、善、利益、商品(通常 goods)
league|連盟
maximum|最大限
storage|貯蔵
partial|部分的な、不公平な、(be partial toで)〜が好きな
partially|部分的に|派
intrude|立ち入る
anatomy|解剖学／身体の構造
naughty|いたずらな
console|慰める
consolation|慰め|派
flatter|〜にお世辞を言う
inflict|(苦痛や損害)を与える
discern|見分ける
eminent|著名な
spatial|空間の
degrade|質を低下させる、劣化する／分解する
corrupt|堕落させる、買収する、堕落した／破損した
corruption|腐敗|派
antique|骨董の
antiquity|古代|派
dispose|(dispose ofで)処分する
equator|赤道
notable|注目に値する
gradual|緩やかな
gradually|徐々に|派
allergy|アレルギー
profound|深い
likewise|同様に
farewell|別れ
liquid|液体
sue|訴える
vending machine|自動販売機
platform|プラットフォーム
sector|部門
channel|チャンネル
illusion|錯覚
refugee|難民
circumstances|状況
mechanism|仕組み
reside|住む
resident|住人|派
residence|住宅|派
residential|住宅の|派
marvel|驚く
marvelous|素晴らしい|派
malice|悪意
detest|ひどく嫌う
shiver|震える
appall|ぞっとさせる
appalling|ぞっとするような|派
obsess|取り憑く
obsessed|取りつかれて|派
obsession|取りつかれること|派
scroll|スクロールする
upload|アップロードする
censor|検閲する
censorship|検閲|派
facial|顔の
resumé|履歴書
merger|合併
saliva|唾液
autism|自閉症
skinny|やせこけた
mumble|ぶつぶつ言う
mutter|つぶやく
neural|神経の
gluten|グルテン
pelvis|骨盤
myriad|無数
widely|広く
paragraph|段落
highly|非常に
consumer|消費者
lifetime|生涯
apology|謝罪
hint|ヒント
calculation|計算
gesture|身ぶり
believer|信者
arena|競技場
imitation|模倣
marketplace|市場
vulnerability|脆弱性
loop|輪
laborer|労働者
radar|レーダー
`;
WPS.VBOOK_DATA.base[14] = `
adjective|形容詞
advertiser|広告主
alphabetical|アルファベット順の
anchor|錨、固定する
arch|アーチ
attraction|魅力、呼び物
autobiography|自伝
automation|自動化
backup|予備、バックアップ
bathe|水浴びする、入浴させる
beloved|最愛の
billionaire|億万長者
bin|ごみ箱、容器
birthplace|出生地
birthrate|出生率
boot|長靴、起動する
cabin|小屋、客室
cautious|慎重な
cautiously|用心深く
childcare|保育
circular|円形の
climax|最高潮
coastline|海岸線
commentator|解説者
comparatively|比較的
consultant|相談役、コンサルタント
controller|制御装置、管理者
copyright|著作権
counselor|相談員、カウンセラー
dam|ダム
deepen|深める
detector|探知機
disastrous|悲惨な
disbelief|信じられない気持ち、不信
disobedient|従順でない
divider|仕切り
downstream|下流の、下流へ
echo|反響、こだま
episode|出来事、(番組の)1回分
environmentalist|環境保護主義者
exceptionally|並外れて
expectation|期待、予想
explosive|爆発性の、爆発物
factual|事実の、事実に基づく
farmland|農地
firsthand|直接の、じかに
flash|閃光、ぱっと光る
flowering|開花
gadget|小道具、便利な道具
gamble|賭け、賭ける
gateway|入口、玄関口
gatherer|採集者
genre|ジャンル
grader|採点者、～年生
grammatical|文法の
grooming|身だしなみ
hardware|ハードウェア、金物
herb|ハーブ、薬草
hook|フック、留め金
humankind|人類
hunter|狩人
icon|アイコン、象徴的な人物
icy|凍った、冷たい
idiom|慣用句
illustration|挿絵、実例
innocence|無罪、無邪気
lifelong|生涯の
lifespan|寿命
lobby|ロビー、圧力団体、(議員に)働きかける
lyric|歌詞
marker|目印、マーカー
mathematically|数学的に
miraculously|奇跡的に
multinational|多国籍の
nationwide|全国的な
negotiator|交渉者
oak|オーク(ナラ・カシの類の木)
obedience|服従
obedient|従順な
objection|異議、反対
outgoing|社交的な、退任する、出ていく
overeating|食べ過ぎ
overweight|太りすぎの
pamphlet|小冊子、パンフレット
passionate|情熱的な
pessimism|悲観主義
pipeline|輸送管、パイプライン
pleasurable|楽しい、心地よい
praiseworthy|称賛に値する
proofreading|校正
pupil|生徒、瞳孔
quotation|引用、見積もり
rail|線路、手すり
railway|鉄道
razor|かみそり
responsibly|責任をもって
robotic|ロボットの
rod|棒、さお
rower|こぎ手
ruler|支配者、定規
sack|袋、解雇する
seminar|ゼミ、セミナー
settler|入植者
sexual|性的な、性の
shopper|買い物客
slogan|標語、スローガン
sociable|社交的な
solo|単独の、独唱
spotlight|注目、スポットライト
spreadsheet|表計算ソフト
standpoint|観点、立場
starter|始める人、合図係、始動装置
stingy|けちな
stylishly|粋に、おしゃれに
sugary|甘ったるい
swap|交換する
syllable|音節
sympathetic|同情的な、共感する
taxpayer|納税者
theoretically|理論上は
throne|王座
toast|乾杯、トースト
toss|軽く投げる
trillion|1兆
uncomfortably|心地悪く
undo|元に戻す、ほどく
unproductive|非生産的な
unreasonably|不当に、理不尽に
unscientific|非科学的な
unseen|目に見えない
unsuccessful|失敗した、うまくいかない
unwelcome|歓迎されない
upgrade|格上げする、性能を上げる
uphill|上り坂の、困難な
upward|上向きに、上向きの
usable|使用可能な
veteran|ベテラン、退役軍人
volcanic|火山の
wartime|戦時
wastewater|廃水
waterway|水路
wholeheartedly|心から
wire|針金、電線
workshop|研修会、作業場
`;
// 早慶上理:学部ごと。1 = 早稲田 政治経済
WPS.VBOOK_DATA.sokei[1] = `
innovator|革新者、新しいものを生み出す人
bishop|司教、主教
capitalist|資本主義の、資本家
grassroot|草の根の、一般民衆の(ふつうはgrassroots)
neuroscience|神経科学
practitioner|実践者、開業医
reproductive|生殖の、繁殖の
abound|たくさんある、満ちている
administrative|行政の、管理の
administrator|管理者、行政官
affiliation|所属、提携
airborne|空気で運ばれる、空中の
amphibian|両生類
antidote|解毒剤、(問題の)解決策
appraisal|評価、査定
approximation|近似(値)、概算
aristocrat|貴族
biodiversity|生物多様性
bloc|(国家・政党などの)連合、陣営
byproduct|副産物
chant|唱える、(繰り返し)叫ぶ
coercive|強制的な、威圧的な
colonist|入植者、植民地開拓者
compassionate|思いやりのある、情け深い
concur|同意する、一致する
counterintuitive|直感に反する
credible|信頼できる、信用できる
cubic|立方の、3乗の
culinary|料理の
democrat|民主主義者
demographer|人口統計学者
differentiate|区別する
diversify|多様化する
dual|二重の
expenditure|支出、経費
fishery|漁業、漁場
foremost|第一の、最も重要な
genesis|起源、発生
geothermal|地熱の
goodwill|善意、好意
groundbreaking|画期的な
hub|拠点、中心
instability|不安定
legislative|立法の
linguist|言語学者
longstanding|長年の
mechanization|機械化
mercury|水銀
misconception|誤解、思い違い
moratorium|一時停止、(支払いの)猶予
obsolescence|時代遅れになること、陳腐化
optimum|最適の、最適条件
parameter|変数、(判断の)要素・範囲
propaganda|(政治的な)宣伝
republican|共和制の、共和主義者
resonance|共鳴、反響
ruthless|無慈悲な、冷酷な
safeguard|守る、保護する、安全策
secular|世俗的な、宗教と関係のない
segregation|(人種などの)分離、隔離
shareholder|株主
shelve|棚上げにする、(計画を)延期する
socioeconomic|社会経済的な
synchronize|同期させる、同時に起こる
telegraph|電信
totalitarian|全体主義の
turbine|タービン
tusk|(ゾウなどの)牙
undeniably|否定できないほど、明らかに
utilitarian|功利主義の、実用本位の
vibrant|活気のある、鮮やかな
vintage|年代物の、(ワインの)醸造年
whereby|それによって～する
wrongdoing|不正行為、悪事
skeptical|懐疑的な、疑い深い
vulnerable|傷つきやすい、弱い
incorporate|取り入れる、組み込む
comprise|～から成る、構成する
consensus|合意、一致した意見
aesthetic|美的な、美学の
criteria|基準(criterionの複数形)
underlie|～の根底にある
paradox|逆説、矛盾
subsequent|その後の、続いて起こる
legislation|法律、立法
nonetheless|それにもかかわらず
disrupt|混乱させる、かき乱す
controversy|論争
sanitation|公衆衛生、下水設備
counterproductive|逆効果の
regime|政権、体制
bureaucracy|官僚制度、官僚主義
ideology|イデオロギー、思想
adverse|不利な、有害な
peril|危険、危機
deem|～だと考える、見なす
onset|始まり、(病気の)発症
replicate|複製する、再現する
plausible|もっともらしい
constrain|制約する、強いる
affiliate|提携させる、加入する、関連会社
coalition|連立、連合
facilitate|促進する、容易にする
counterfeit|偽造の、偽物
exponential|指数関数的な、急激な
humanitarian|人道的な、人道主義者
`;
// 2 = 慶應 文学部(240語)
WPS.VBOOK_DATA.sokei[2] = `
hike|引き上げ、値上げ、ハイキング
albeit|～ではあるが、～とはいえ
bizarre|奇妙な、異様な
brew|醸造する、(茶などを)いれる、(よくないことが)起こりかける
calculus|微積分
cult|カルト、熱狂的な崇拝
dopamine|ドーパミン
eccentricity|風変わりなこと、奇抜さ
imperative|必須の、絶対に必要なこと、命令形の
lethal|致命的な
linguist|言語学者
loom|(危険などが)迫る、ぼんやり現れる、織機
mundane|ありふれた、平凡な
revelation|暴露、(意外な)新事実
seamless|継ぎ目のない、途切れのない
splinter|破片、裂ける
aberration|逸脱、異常
abort|中止する、中断する
abound|たくさんある、満ちている
adversary|敵、対戦相手
afloat|浮かんで、(経営が)破たんせずに
aftermath|余波、(災害などの)直後の状況
aggregate|集計する、総計、総計の
allure|魅力、誘惑する
altruistic|利他的な
amid|～の真っただ中で
analytic|分析的な
anomaly|異常、例外
appreciation|感謝、正しい理解、(価値の)上昇
archaic|古風な、時代遅れの
artifice|策略、巧妙な工夫
astrology|占星術
attribution|(原因・作者などを)～に帰すること、帰属
aura|(独特の)雰囲気、オーラ
automaton|自動機械、ロボットのような人
aversion|嫌悪、強い反感
barbarian|野蛮人
benevolence|善意、慈悲
bloc|(国家・政党などの)連合、陣営
bombardment|砲撃、(質問などの)集中攻撃
brisk|きびきびした、活発な
cacophony|不協和音、騒音
capitalist|資本主義の、資本家
catharsis|心の浄化、カタルシス
champion|擁護者、擁護する、優勝者
chaotic|混沌とした、無秩序な
churn|かき回す、激しく揺れ動く
circuitry|電子回路
clockwork|時計仕掛け、規則正しさ
communal|共同の、共有の
conceptualize|概念化する
conundrum|難問
coronary|冠状動脈の
correlate|相関する、関連づける
credible|信頼できる、もっともらしい
curator|学芸員
daunting|ひるませるような、気が遠くなるような
detritus|残骸、がらくた
dire|悲惨な、差し迫った
dubious|疑わしい、怪しい
ego|自我、自尊心
elusive|捉えどころのない、つかまえにくい
enthusiast|熱心な人、愛好家
equinox|春分・秋分
err|誤る
erratic|不規則な、気まぐれな
escalate|段階的に拡大する、激化する
escalation|段階的な拡大、激化
expansive|広範な、広々とした
facet|側面、(宝石などの)面
fidelity|忠実さ、正確さ
flicker|ちらつく、明滅する
flint|火打ち石
forefront|最前線、先頭
fraud|詐欺
genesis|起源、発生
gig|単発の仕事、(音楽などの)出演
hallmark|特徴、品質証明
hoax|でっち上げ、悪ふざけ
idiosyncratic|特有の、独特な
immediacy|即時性、直接性
impediment|障害、妨げ
incessant|絶え間ない
incremental|漸進的な、少しずつ増える
indicator|指標、表示器
ingenuity|創意工夫、独創性
inscription|碑文、(本の)献辞
institutional|制度の、組織の
intensify|強める、強まる
interrogation|尋問、取り調べ
iteration|反復、くり返し
laden|(荷物などを)たくさん積んだ、満ちた
lexical|語彙の
liberation|解放
lofty|高尚な、非常に高い
manifestation|現れ、表明
manifold|多様な、多数の
milestone|画期的な出来事、節目
mindset|考え方、心構え
momentarily|一瞬、(主に米)間もなく
mystify|当惑させる、煙に巻く
nag|小言を言う、しつこく悩ませる
neurological|神経の、神経学の
nexus|結びつき、つながり
nobility|高貴さ、貴族階級
obsolescence|時代遅れになること、陳腐化
olfactory|嗅覚の
overarching|包括的な、全体にかかわる
pacifist|平和主義者
palpable|明白な、手で触れられる
parameter|変数、(判断の)要素・範囲
pathology|病理学
peripheral|周辺の、重要でない
phonetic|音声の
plea|嘆願、訴え
polemic|論争、激しい議論
preposterous|ばかげた、不合理な
proliferation|急増、拡散
prophecy|予言
prowess|卓越した技量、優れた能力
proxy|代理(人)
quantify|数量化する
queer|風変わりな、奇妙な
radiant|輝く、晴れやかな
rationale|論理的根拠
raucous|騒々しい、耳ざわりな
replica|複製
reproductive|生殖の、繁殖の
rite|儀式
scant|乏しい、わずかな
scour|探し回る、こすって磨く
selflessness|無私、無欲
snobbish|気取った、お高くとまった
staggering|途方もない、驚くほどの
starkly|厳然と、はっきりと
strut|気取って歩く
sublime|崇高な、壮大な
susceptibility|影響の受けやすさ、感受性
synonymous|同義の、～と同じ意味の
systematically|体系的に、組織的に
takeover|買収、乗っ取り
tandem|連携、二人乗り自転車(in tandemで協力して)
temporal|時間の、世俗の
theorist|理論家
trauma|トラウマ、心の傷
trek|長旅、(苦労して)旅をする
ubiquity|どこにでもあること、遍在
unpalatable|まずい、受け入れがたい
veterinary|獣医の
vibrant|活気のある、鮮やかな
ascribe|(ascribe A to Bで)AをBのせいにする・Bに帰する
inherent|固有の、本来備わっている
designate|指定する、任命する
elaborate|手の込んだ、詳しく述べる
notorious|悪名高い
vulnerable|傷つきやすい、弱い
advocate|提唱者、擁護者、主張する
manifest|明らかな、明らかに示す
intrigue|興味をそそる、陰謀
incorporate|取り入れる、組み込む
presume|推定する、思い込む
repress|抑える、抑圧する
concise|簡潔な
implant|植えつける、埋め込む
comprise|～から成る、構成する
prescribe|処方する、規定する
consensus|合意、一致した意見
undermine|弱める、むしばむ
arbitrary|独断的な、恣意的な、任意の
illuminate|照らす、解明する
comprehend|理解する
underlie|～の根底にある
paradox|逆説、矛盾
ingenious|独創的な、巧妙な
withhold|与えずにおく、差し控える
subsequent|その後の、続いて起こる
compatible|両立できる、互換性がある
indigenous|(その土地に)固有の、先住の
render|～にする、(援助などを)提供する、翻訳する
contemplate|熟考する、じっと見つめる
fluctuate|変動する
integrity|誠実さ、完全性
prevalent|広く行き渡っている
formulate|(計画などを)まとめる、明確に述べる
premise|前提、(premisesで)建物と敷地、～を前提とする
nonetheless|それにもかかわらず
ubiquitous|至る所にある
accommodate|収容する、適応させる、(要望に)応じる
disrupt|混乱させる、かき乱す
sanctuary|聖域、保護区
entrepreneur|起業家
innumerable|数えきれないほどの
sentiment|感情、心情
counterproductive|逆効果の
interdisciplinary|学際的な
reconcile|調和させる、和解させる
tyranny|圧政、暴政
converse|逆の、正反対のもの、会話する
municipal|市の、地方自治体の
spur|駆り立てる、拍車
curb|抑制する、歩道の縁石
proclaim|宣言する
constraint|制約
ideology|イデオロギー、思想
autonomy|自治、自主性
coherent|首尾一貫した
integral|不可欠な
entity|存在、実体
deem|～だと考える、見なす
onset|始まり、(病気の)発症
intrinsic|固有の、本質的な
preliminary|予備的な
bureaucrat|官僚
acoustic|音響の
potent|強力な、効き目のある
lest|～しないように
conspire|陰謀を企てる、共謀する
cynical|冷笑的な、皮肉な
entail|(必然的に)伴う
immerse|没頭させる、浸す
encompass|含む、取り囲む
transcend|超える、超越する
sinister|邪悪な、不吉な
alleviate|軽減する、和らげる
fallacy|誤った考え、誤謬
fabricate|でっち上げる、製造する
confer|授与する、相談する
connotation|言外の意味、含意
propel|推進する
redundant|余分な、不要な
converge|集まる、一点に集中する
adept|熟練した
futile|無駄な
devoid|(devoid ofで)～が欠けている
mediate|調停する、仲介する
nuance|微妙な違い、ニュアンス
trajectory|軌道、軌跡
rampant|はびこった、蔓延した
suffice|十分である
propensity|傾向、性向
`;
// 3 = 早稲田 理工(基幹・創造・先進)
WPS.VBOOK_DATA.sokei[3] = `
abound|たくさんある、満ちている
correlate|相関する、関連づける
fishery|漁業、漁場
optimize|最適化する
parameter|変数、(判断の)要素・範囲
administrative|行政の、管理の
administrator|管理者、行政官
affiliation|所属、提携
altruistic|利他的な
appraisal|評価、査定
aqueous|水の、水性の
authoritarian|権威主義の
aversion|嫌悪、強い反感
benevolence|善意、慈悲
benevolent|慈悲深い、善意の
biodiversity|生物多様性
biotechnology|生命工学、バイオテクノロジー
breach|違反、破れ目、(約束などを)破る
calculus|微積分
caloric|カロリーの
capitulation|降伏
cognition|認知
composite|複合の、合成物
continuum|連続体
cult|カルト、熱狂的な崇拝
defection|離反、亡命
depletion|枯渇、減少
dietary|食事の
dire|悲惨な、差し迫った
divisive|分裂を招く
dosage|服用量
eccentricity|風変わりなこと、奇抜さ
efficacy|効能、有効性
enticing|心をそそる、魅力的な
epistemic|認識の、知識に関する
eventual|最終的な、結果として起こる
explanatory|説明的な
exploratory|探査の、探索的な
fiscal|財政の、会計の
hike|引き上げ、値上げ、ハイキング
hippocampus|海馬
inequity|不公平
innovator|革新者、新しいものを生み出す人
intensify|強める、強まる
iteration|反復、くり返し
lofty|高尚な、非常に高い
logarithm|対数
maneuver|巧みに動かす、策略
maximal|最大の
mindset|考え方、心構え
molecular|分子の
moratorium|一時停止、(支払いの)猶予
negligible|無視できるほどの
neurobiological|神経生物学の
neuroscience|神経科学
onward|前へ、先へ
operational|運用上の、作動可能な
optimal|最適な
optimum|最適の、最適条件
pathology|病理学
payoff|見返り、成果
pest|害虫、厄介者
proposition|提案、命題
quantitative|量的な
reciprocal|相互の、互恵的な
reciprocity|相互性、互恵
rigorous|厳密な、厳しい
sect|宗派、分派
socioeconomic|社会経済的な
stark|明白な、まったくの
stressor|ストレス要因
systematically|体系的に、組織的に
temporal|時間の、世俗の
textual|本文の、文章上の
tranquility|静けさ、平穏
trawler|トロール漁船
unison|一致、(in unisonで)声をそろえて
wastage|浪費、損耗
ascribe|(ascribe A to Bで)AをBのせいにする・Bに帰する
inherent|固有の、本来備わっている
contradict|矛盾する、反論する
monetary|金銭の、通貨の
protocol|議定書、手順、規約
incorporate|取り入れる、組み込む
comprise|～から成る、構成する
undermine|弱める、むしばむ
intuition|直感
comprehend|理解する
criteria|基準(criterionの複数形)
integrity|誠実さ、完全性
formulate|(計画などを)まとめる、明確に述べる
compliance|(法令などに)従うこと、順守
curb|抑制する、歩道の縁石
artifact|人工物、遺物
autonomy|自治、自主性
adverse|不利な、有害な
coherent|首尾一貫した
integral|不可欠な
entity|存在、実体
intrinsic|固有の、本質的な
empirical|経験による、実証的な
preliminary|予備的な
potent|強力な、効き目のある
custody|親権、拘留、保護管理
proponent|支持者、提唱者
plausible|もっともらしい
coalition|連立、連合
pervasive|広く行き渡った
encompass|含む、取り囲む
alleviate|軽減する、和らげる
eradicate|根絶する
mitigate|緩和する、和らげる
fallacy|誤った考え、誤謬
altruism|利他主義
bilateral|二国間の、双方の
pivotal|極めて重要な
detrimental|有害な
robust|頑強な、しっかりした
scrutiny|精査、綿密な調査
equilibrium|均衡、平衡
resilience|回復力、しなやかさ
exemplify|例証する、よい例となる
deplete|使い果たす、激減させる
propensity|傾向、性向
`;
// 4 = 慶應 看護医療学部(122語)
WPS.VBOOK_DATA.sokei[4] = `
hike|引き上げ、値上げ、ハイキング
vintage|年代物の、(ワインの)醸造年
appreciation|感謝、正しい理解、(価値の)上昇
compassionate|思いやりのある、情け深い
lineage|血統、系統
receptor|受容体
spite|悪意、(in spite ofで)～にもかかわらず
systematically|体系的に、組織的に
abnormal|異常な
achiever|成功者、達成した人
ailment|(軽い)病気、不調
allure|魅力、誘惑する
altruistic|利他的な
antidote|解毒剤、(問題の)解決策
ascertain|突き止める、確かめる
authoritative|権威ある、信頼できる
avian|鳥の、鳥類の
awe|畏敬の念
blatant|露骨な、あからさまな
bliss|至福、この上ない喜び
brim|(容器の)縁、帽子のつば
byproduct|副産物
cardiac|心臓の
catharsis|心の浄化、カタルシス
cathartic|浄化作用のある
chemotherapy|化学療法
comprehensible|理解できる、わかりやすい
consolidate|統合する、強化する
continuum|連続体
cosmic|宇宙の
daunting|ひるませるような、気が遠くなるような
dopamine|ドーパミン
embryo|胚、胎児
equinox|春分・秋分
felicity|至福、(表現の)適切さ
flare|ぱっと燃え上がる、(感情などが)激化する
fort|砦、要塞
generalization|一般化
hippocampus|海馬
imperative|必須の、絶対に必要なこと、命令形の
intensify|強める、強まる
linguist|言語学者
logistic|物流の、兵站の
mantle|外套、マント、(地球の)マントル
menthol|メントール
mint|ミント、造幣局、作り出す
monastic|修道院の、修道士の
neurobiology|神経生物学
neurological|神経の、神経学の
optimal|最適な
pediatrician|小児科医
perfectionism|完璧主義
preconception|先入観
proliferate|急増する、拡散する
qualitatively|質的に
quantitative|量的な
ranger|森林警備隊員
reciprocity|相互性、互恵
replete|満ちた、(replete withで)～でいっぱいの
resonance|共鳴、反響
resuscitation|蘇生
rigorously|厳密に、厳格に
ripple|さざ波、波紋
scour|探し回る、こすって磨く
shepherd|羊飼い、導く
snobbish|気取った、お高くとまった
sodium|ナトリウム
spike|急増、とげ、急上昇する
spiral|らせん、悪循環、らせん状に動く
splinter|破片、裂ける
stimuli|刺激(stimulusの複数形)
sulfate|硫酸塩
supervise|監督する
synchronization|同期、同時性
synchronize|同期させる、同時に起こる
tardiness|遅刻、遅れ
temporal|時間の、世俗の
trauma|トラウマ、心の傷
unkempt|だらしない、手入れされていない
upbeat|楽観的な、陽気な
vegan|完全菜食主義者
villain|悪役、悪党
vocalization|発声
designate|指定する、任命する
skeptical|懐疑的な、疑い深い
contradict|矛盾する、反論する
vulnerable|傷つきやすい、弱い
advocate|提唱者、擁護者、主張する
manifest|明らかな、明らかに示す
incorporate|取り入れる、組み込む
illuminate|照らす、解明する
comprehend|理解する
discreet|慎重な、思慮深い
dispense|分配する、(dispense withで)～なしで済ませる
fluctuate|変動する
integrity|誠実さ、完全性
nonetheless|それにもかかわらず
ubiquitous|至る所にある
acute|深刻な、鋭い、急性の
disrupt|混乱させる、かき乱す
deficient|不足している、欠けている
controversy|論争
compliance|(法令などに)従うこと、順守
sanction|制裁、認可、認可する
contend|争う、(強く)主張する
physiological|生理的な、生理学の
proclaim|宣言する
deduce|推定する、推論する
resilient|回復力のある、しなやかな
susceptible|影響を受けやすい、かかりやすい
onset|始まり、(病気の)発症
intrinsic|固有の、本質的な
lest|～しないように
immerse|没頭させる、浸す
culprit|犯人、(問題の)元凶
threshold|始まり、しきい値、限界点、敷居
altruism|利他主義
propel|推進する
devoid|(devoid ofで)～が欠けている
physiology|生理学
disperse|分散させる、散らばる
attest|証明する、証言する
`;
// 5 = 早稲田 国際教養学部(画面写真から全141語)
WPS.VBOOK_DATA.sokei[5] = `
prevalence|普及
rebellion|反乱
abound|豊富にある
advocacy|擁護
analytic|分析的な
appreciation|感謝、理解
ardent|熱心な
aristocrat|貴族
ascertain|突き止める
beet|ビート
benevolent|慈悲深い
bluntly|単刀直入に
breadth|幅広さ
caloric|カロリーの
cognition|認知
cohesion|結束
conceptual|概念的な
conceptualize|概念化する
concur|同意する
concussion|脳震盪
condenser|凝縮器
confluence|合流
conviction|確信、有罪判決
correlate|相関する
corrosion|腐食
coveted|切望される
critique|批評
customary|慣習的な
demarcation|境界設定
demise|消滅
democrat|民主主義者
downplay|軽く扱う
elusive|捉えどころのない
equity|公平、株式
escalate|拡大する
expenditure|支出
flare|燃え上がる
fractal|フラクタル
habitually|習慣的に
havoc|大混乱
histological|組織学の
hitherto|今まで
hoax|でっち上げ
humane|人道的な
humility|謙虚さ
inadvertently|うっかり
institutional|制度の
intuitively|直感的に
jurisdiction|管轄権
maize|トウモロコシ
manifestation|現れ
metaphysical|形而上の
mindset|考え方
mint|ミント、造幣局
municipality|地方自治体
myopia|近視
mystify|当惑させる
negligible|無視できるほどの
notwithstanding|～にもかかわらず
perseverance|忍耐
pest|害虫
philanthropic|慈善の
phonetic|音声の
physiologist|生理学者
porcelain|磁器
prominence|卓越
proposition|提案、命題
purification|浄化
raucous|騒々しい
reciprocal|相互の
retrograde|後退する
retrospective|回顧の
rigorously|厳密に
semantic|意味の
sociolinguistic|社会言語学の
spite|悪意
staggering|途方もない
strand|立ち往生させる、糸／一筋、(議論などの)要素
successively|連続して
supervise|監督する
temporal|時間の、世俗の
tenable|擁護できる
theorist|理論家
thereafter|その後
toxin|毒素
veterinary|獣医の
wreak|引き起こす
zoologist|動物学者
inherent|固有の
designate|指定する
contradict|矛盾する、反論する
advocate|提唱者、提唱する
manifest|明らかな、明らかに示す
obsolete|廃れた
prescribe|処方する、規定する
consensus|合意
intuition|直感
criteria|基準
intervene|介入する
subsequent|続いて起こる
indigenous|固有の
integrity|誠実、完全性
legislation|法律
disrupt|かき乱す
entrepreneur|起業家
unprecedented|前例のない
conscientious|良心的な
regime|政権
tyranny|圧政
irrigation|灌漑
impair|損なう
physiological|生理的な
curb|抑制する
discourse|話し合い
ideology|イデオロギー
apparatus|装置
coherent|一貫している
integral|不可欠な
bureaucrat|官僚
potent|強力な
encompass|含む
sinister|邪悪な
eradicate|根絶する
harness|利用する
evade|逃れる
holistic|全体的な
facilitate|促進する
threshold|始まり、しきい値／限界点
stigma|汚名
falsify|偽造する
connotation|言外の意味
complementary|相補的な
converge|集まる
methodology|方法論
tangible|触れられる、明確な
viable|実行可能な
physiology|生理学
humanitarian|人道的な
nuance|微妙な違い
augment|増強する
affinity|親和性
`;
// 6 = 慶應 経済学部(画面写真から全176語)
WPS.VBOOK_DATA.sokei[6] = `
slot|枠
appreciation|感謝、理解
diversify|多様化する
foremost|第一の
caregiver|介護者
cornerstone|礎
critique|批評
enthusiast|熱心な人
equitable|公平な
fishery|漁業
ravage|荒廃させる
secrecy|秘密保持
skepticism|懐疑論
slowdown|減速
spite|悪意
virgin|手つかずの
administrative|管理の
administrator|管理者
amidst|～の真っただ中に
apparel|衣料品
aristocrat|貴族
arrogance|傲慢さ
authoritarian|権威主義の
autocratic|独裁的な
automotive|自動車の
beneficiary|受益者
biodiversity|生物多様性
captive|捕らわれた
chaotic|混沌とした
consolidation|統合
constitutional|憲法の
conundrum|難問
cubic|立方の
cult|カルト
demographer|人口統計学者
domination|支配
downplay|軽く扱う
erode|侵食する
evaporation|蒸発
expenditure|支出
falsehood|虚偽
fiscal|財政の
formidable|手ごわい
fort|砦
fraud|詐欺
geopolitical|地政学的な
geothermal|地熱の
grassroot|草の根の
hack|切り刻む、不正侵入する
hindsight|後知恵
humane|人道的な
hydroelectric|水力発電の
idiomatic|慣用的な
imperative|必須の、必須の課題、命令形の
indicator|指標
innovator|革新者
instability|不安定
intermittent|断続的な
legislative|立法の
lesbian|同性愛の女性
lockdown|封鎖
loom|迫る、織機
minimalist|最小限主義の
misconception|誤解
patron|後援者、常連客
proclamation|宣言
proliferate|急増する
quake|揺れる
qualitatively|質的に
referendum|国民投票
reservoir|貯水池
resonate|共鳴する
sect|宗派
secular|世俗的な
seismic|地震の
shareholder|株主
shelve|棚上げにする
skeptic|懐疑論者
staggering|途方もない
stagnation|停滞
stakeholder|利害関係者
supervise|監督する
telecommunication|電気通信
totalitarian|全体主義の
turbine|タービン
unpalatable|まずい、受け入れがたい
upfront|率直な、前もって
uranium|ウラン
vicinity|近所
viral|ウイルスの、急速に広まる
zoologist|動物学者
ascribe|(ascribe A to Bで)AをBに帰する
designate|指定する
notorious|悪名高い
authentic|本物の
skeptical|懐疑的な
contradict|矛盾する、反論する
vulnerable|傷つきやすい
advocate|提唱者、提唱する
monetary|金銭的な
obsolete|廃れた
incorporate|取り入れる
concise|簡潔な
comprise|～から成る、占める
consensus|合意
undermine|弱める
ambiguous|あいまいな
mandatory|義務的な
longevity|長寿
comprehend|理解している
compensate|補償する
displace|取って代わる
intervene|介入する
subsequent|続いて起こる
compatible|適合する、互換性がある
render|～にする、(援助・奉仕を)提供する、翻訳する
disparity|格差
prevalent|広く行き渡っている
legislation|法律
spontaneous|自然発生的な
nonetheless|それにもかかわらず
accommodate|収容する、適応させる
disrupt|かき乱す
authorize|権限を与える
patronage|ひいき
demographic|人口統計上の
entrepreneur|起業家
controversy|論争
unprecedented|前例のない
synthetic|合成の
tuberculosis|結核
reconcile|調和させる、和解させる
regime|政権
irrigation|灌漑
bureaucracy|官僚制度
autonomous|自治の、自律的な
embark|着手する
spur|駆り立てる
curb|抑制する
proclaim|宣言する
ideology|イデオロギー
rhetoric|修辞
adverse|不利な
integral|不可欠な
susceptible|影響を受けやすい
conspicuous|目立つ
bureaucrat|官僚
convict|有罪判決を下す
administer|管理する、(薬を)投与する
potent|強力な
stance|立場
proponent|支持者
plausible|もっともらしい
forge|築く、偽造する
testament|あかし
amend|修正する
livelihood|生計
synthesis|合成
mitigate|緩和する
evade|逃れる
exemption|免除
facilitate|促進する
confer|授与する、相談する
deterrent|抑止するもの
stigma|汚名
bilateral|二国間の
detrimental|有害な
robust|頑強な
viable|実行可能な
proportional|比例した
legitimacy|正当性
deter|思いとどまらせる
magnitude|大きさ
nuance|微妙な違い
exemplify|例証する
sovereignty|主権
`;
// 中学英単語:1 = 小学校の復習(画面写真から入力。続きは受け取りしだい追加)
WPS.VBOOK_DATA.jh[1] = `
hello|こんにちは、もしもし
hi|やあ、こんにちは
goodbye|さようなら
bye|じゃあね、さようなら
yes|はい
no|いいえ、1つも～ない
please|どうぞ、どうか
thank|～に感謝する
sorry|すまなく思って、残念に思って
I|私は、私が
you|あなたは、あなたが、あなたを、あなたに
he|彼は、彼が
she|彼女は、彼女が
it|それは、それが、それを、それに
we|私たちは、私たちが
they|彼らは、彼らが、それらは
me|私を、私に
him|彼を、彼に
her|彼女の、彼女を、彼女に
us|私たちを、私たちに
them|彼らを、彼らに、それらを
my|私の
your|あなたの、あなたたちの
his|彼の、彼のもの
its|その、それの
our|私たちの
their|彼らの、それらの
this|これ、この
that|あれ、それ、あの、その
these|これら、これらの
those|あれら、あれらの
a|1つの、1人の
an|1つの、1人の
the|その
what|何、何の
who|だれ
where|どこに、どこで
when|いつ、～するとき
why|なぜ
how|どのように、どれくらい
which|どちら、どれ、どちらの
whose|だれの、だれのもの
be|～である、(～に)いる、ある
do|～をする
have|～を持っている、～を食べる、飲む
like|～が好きだ
want|～がほしい
play|(スポーツ)をする、(楽器)をひく、遊ぶ
go|行く
come|来る
eat|～を食べる
drink|～を飲む、飲み物
see|～が見える、～を見る、～に会う
look|見る、～に見える
watch|～を見る、腕時計
listen|聞く
read|～を読む
write|～を書く
speak|～を話す
study|勉強する、勉強
swim|泳ぐ
run|走る
walk|歩く、散歩
jump|跳ぶ、ジャンプする
dance|おどる、ダンス
sing|歌う
cook|料理する、料理人
make|～を作る
get|～を手に入れる、もらう、着く
live|住む
sleep|眠る
wash|～を洗う
clean|～をそうじする、きれいな
help|～を手伝う、助ける、手伝い
open|～を開ける、開いている
close|～を閉める、閉じる
stand|立つ
sit|座る
can|～できる
turn|曲がる、～を回す、順番
stop|止まる、～を止める、停留所
touch|～にさわる
draw|(絵)をかく、(線)を引く
ride|～に乗る
skate|スケートをする
ski|スキーをする、スキー板
enjoy|～を楽しむ
buy|～を買う
use|～を使う
know|～を知っている
think|～と思う、考える
fly|飛ぶ
one|1、1つ(の)
two|2、2つ(の)
three|3、3つ(の)
four|4、4つ(の)
five|5、5つ(の)
six|6、6つ(の)
seven|7、7つ(の)
eight|8、8つ(の)
nine|9、9つ(の)
ten|10(の)
eleven|11(の)
twelve|12(の)
thirteen|13(の)
fourteen|14(の)
fifteen|15(の)
sixteen|16(の)
seventeen|17(の)
eighteen|18(の)
nineteen|19(の)
twenty|20(の)
thirty|30(の)
forty|40(の)
fifty|50(の)
sixty|60(の)
seventy|70(の)
eighty|80(の)
ninety|90(の)
hundred|100(の)
first|1番目(の)、最初に
second|2番目(の)、秒
third|3番目(の)
fourth|4番目(の)
fifth|5番目(の)
sixth|6番目(の)
seventh|7番目(の)
eighth|8番目(の)
ninth|9番目(の)
tenth|10番目(の)
eleventh|11番目(の)
twelfth|12番目(の)
twentieth|20番目(の)
thirtieth|30番目(の)
Sunday|日曜日
Monday|月曜日
Tuesday|火曜日
Wednesday|水曜日
Thursday|木曜日
Friday|金曜日
Saturday|土曜日
January|1月
February|2月
March|3月
April|4月
May|5月
June|6月
July|7月
August|8月
September|9月
October|10月
November|11月
December|12月
spring|春
summer|夏
fall|秋、落ちる
autumn|秋
winter|冬
season|季節
sunny|晴れた
rainy|雨の
cloudy|くもりの
snowy|雪の降る
windy|風の強い
hot|暑い、熱い、からい
cold|寒い、冷たい、かぜ
warm|暖かい、温かい
cool|すずしい、かっこいい
weather|天気
day|日、1日、昼間
week|週
month|月、1か月
year|年、1年、～歳
today|今日、今日は
tomorrow|明日、明日は
yesterday|昨日、昨日は
morning|朝、午前
afternoon|午後
evening|夕方、晩
night|夜
time|時間、時刻、～回
hour|1時間
o'clock|～時
birthday|誕生日
weekend|週末
holiday|休日、祝日
red|赤い、赤
blue|青い、青
yellow|黄色い、黄色
green|緑の、緑
white|白い、白
black|黒い、黒
pink|ピンクの、ピンク
orange|オレンジ、オレンジ色(の)
purple|むらさきの、むらさき
brown|茶色の、茶色
gray|灰色の、灰色
color|色
family|家族
father|父、お父さん
mother|母、お母さん
brother|兄、弟
sister|姉、妹
grandfather|祖父、おじいさん
grandmother|祖母、おばあさん
dad|お父さん、パパ
mom|お母さん、ママ
baby|赤ちゃん
friend|友だち
boy|男の子、少年
girl|女の子、少女
man|男の人、男性
woman|女の人、女性
child|子ども
head|頭
face|顔
eye|目
ear|耳
nose|鼻
mouth|口
hair|髪の毛、髪
hand|手
arm|腕
leg|脚、足
foot|足
finger|指
knee|ひざ
tooth|歯
body|体
cap|(ふちのない)ぼうし
hat|(ふちのある)ぼうし
shirt|シャツ
T-shirt|Tシャツ
sweater|セーター
jacket|ジャケット、上着
coat|コート
shoe|くつ
sock|くつ下
pants|ズボン
skirt|スカート
dress|ドレス、ワンピース
bag|かばん、ふくろ
glove|手ぶくろ、グローブ
food|食べ物
rice|米、ごはん
bread|パン
egg|卵
meat|肉
fish|魚
chicken|鶏肉、ニワトリ
beef|牛肉
pork|豚肉
salad|サラダ
soup|スープ
curry|カレー
pizza|ピザ
hamburger|ハンバーガー
sandwich|サンドイッチ
spaghetti|スパゲッティ
steak|ステーキ
noodle|めん
cake|ケーキ
ice cream|アイスクリーム
chocolate|チョコレート
candy|あめ、キャンディー
cookie|クッキー
pie|パイ
pudding|プリン
donut|ドーナツ
juice|ジュース
milk|牛乳、ミルク
tea|お茶、紅茶
water|水
coffee|コーヒー
breakfast|朝食、朝ごはん
lunch|昼食、昼ごはん
dinner|夕食、晩ごはん
spoon|スプーン
fork|フォーク
knife|ナイフ
chopsticks|はし
apple|りんご
banana|バナナ
grape|ぶどう
lemon|レモン
melon|メロン
peach|もも
strawberry|いちご
cherry|さくらんぼ、桜
pineapple|パイナップル
watermelon|すいか
tomato|トマト
potato|じゃがいも
onion|玉ねぎ
carrot|にんじん
cabbage|キャベツ
corn|とうもろこし
cucumber|きゅうり
mushroom|きのこ
pumpkin|かぼちゃ
vegetable|野菜
fruit|果物
animal|動物
pet|ペット
dog|犬
cat|ねこ
bird|鳥
horse|馬
cow|牛
pig|ブタ
rabbit|ウサギ
mouse|ネズミ、マウス
monkey|サル
lion|ライオン
tiger|トラ
elephant|ゾウ
bear|クマ
panda|パンダ
koala|コアラ
giraffe|キリン
zebra|シマウマ
gorilla|ゴリラ
snake|ヘビ
frog|カエル
penguin|ペンギン
dolphin|イルカ
whale|クジラ
shark|サメ
sheep|ヒツジ
duck|アヒル、カモ
owl|フクロウ
spider|クモ
ant|アリ
bee|ミツバチ、ハチ
butterfly|チョウ
insect|昆虫、虫
turtle|カメ
fox|キツネ
wolf|オオカミ
deer|シカ
kangaroo|カンガルー
sport|スポーツ
baseball|野球
soccer|サッカー
basketball|バスケットボール
volleyball|バレーボール
tennis|テニス
table tennis|卓球
badminton|バドミントン
swimming|水泳
dodgeball|ドッジボール
rugby|ラグビー
`;
// 中学英単語:2 = 中学1年(画面写真から全275語)
WPS.VBOOK_DATA.jh[2] = `
arrive|着く、到着する
ask|～をたずねる、～に頼む
answer|～に答える、答え
become|～になる
begin|始まる、～を始める
bring|～を持ってくる、～を連れてくる
brush|～をみがく、ブラシ
build|～を建てる
call|～に電話する、～を呼ぶ
carry|～を運ぶ
catch|～をつかまえる、～を捕る
change|～を変える、変わる
check|～を確かめる、～を調べる
cheer|～を応援する、～を元気づける
climb|～に登る
collect|～を集める
cut|～を切る
drive|～を運転する、車で行く
excuse|～を許す
feel|～と感じる、～の気分だ
find|～を見つける
finish|～を終える、終わる
forget|～を忘れる
give|～を与える、～をあげる
grow|～を育てる、育つ
hear|～が聞こえる、～を聞く
hope|～を望む、希望
hurry|急ぐ
introduce|～を紹介する
invite|～を招待する
join|～に参加する、～に加わる
keep|～を保つ、～をとっておく
learn|～を学ぶ、～を覚える
leave|～を出発する、～を置いていく
let|～させる
lose|～をなくす、～に負ける
love|～を愛する、～が大好きだ
meet|～に会う
miss|～をのがす、～がいなくてさびしい
move|動く、～を動かす、引っ越す
need|～を必要とする
practice|～を練習する、練習
put|～を置く
remember|～を覚えている、～を思い出す
say|～と言う
send|～を送る
show|～を見せる
spend|～を過ごす、～を使う
start|～を始める、始まる
stay|滞在する、とどまる
take|～を取る、～を持っていく、～に乗る
talk|話す
teach|～を教える
tell|～を話す、～に教える
try|～をやってみる、～を試す
understand|～を理解する、～がわかる
visit|～を訪れる
wait|待つ
wake|目が覚める、～を起こす
wear|～を着ている、～を身につけている
welcome|ようこそ、～を歓迎する
win|～に勝つ
work|働く、仕事
worry|心配する
busy|忙しい
dear|親愛なる
difficult|難しい
early|早く、早い
easy|簡単な、やさしい
every|毎～、どの～も
famous|有名な
free|ひまな、自由な、無料の
glad|うれしい
hard|一生懸命に、難しい、かたい
important|大切な、重要な
large|大きい、広い
late|遅れた、遅い、遅く
little|小さい、少し
ready|用意ができた
right|右(の)、正しい
same|同じ
sick|病気の
slow|遅い、ゆっくりした
special|特別な
sure|もちろん、確信して
wrong|間違った、具合が悪い
quiet|静かな
other|ほかの
another|もう1つの、別の
each|それぞれの、それぞれ
both|両方の、両方
own|自分自身の
next|次の
last|この前の、最後の
only|～だけ、ただ1つの
aunt|おば
uncle|おじ
cousin|いとこ
parent|親、両親
grandparent|祖父母
son|息子
daughter|娘
wife|妻
husband|夫
people|人々
person|人
member|一員、メンバー
classmate|同級生、クラスメート
everyone|みんな、だれでも
someone|だれか
anyone|だれか、だれも
something|何か
anything|何か、何も
nothing|何も～ない
everything|すべてのもの、何でも
captain|キャプテン、主将
fan|ファン、扇風機
activity|活動
band|バンド、楽団
chorus|合唱、合唱団
club|部、クラブ
concert|コンサート、演奏会
contest|コンテスト、コンクール
event|行事、出来事
homework|宿題
interview|インタビュー、面接
message|伝言、メッセージ
musician|音楽家、ミュージシャン
newspaper|新聞
picnic|ピクニック
poster|ポスター
program|番組、プログラム
race|競走、レース
rule|規則、ルール
uniform|制服、ユニフォーム
lesson|授業、レッスン
question|質問、問題
test|テスト、試験
word|単語、言葉
sentence|文
page|ページ
letter|手紙、文字
e-mail|Eメール
story|物語、話
idea|考え、アイデア
example|例
problem|問題
thing|もの、こと
world|世界
life|生活、命、人生
language|言語、言葉
minute|分、ちょっとの間
moment|ちょっとの間、瞬間
grade|学年、成績
history|歴史
drama|ドラマ、劇
song|歌
video|動画、ビデオ
photo|写真
hobby|趣味
vacation|休み、休暇
date|日付
end|終わり、終わる
place|場所
menu|メニュー
dessert|デザート
snack|おやつ、軽食
hiking|ハイキング
fishing|釣り
camping|キャンプ
shopping|買い物
hometown|故郷
temple|寺
shrine|神社
map|地図
way|道、方法
corner|角、すみ
left|左(の)
straight|まっすぐに
block|区画、ブロック
building|建物、ビル
bridge|橋
bedroom|寝室
living room|居間、リビング
floor|床、階
key|かぎ
yen|円
money|お金
also|～もまた
ago|～前に
around|～のまわりに、約
before|～の前に、以前に
after|～のあとに
behind|～の後ろに
between|～の間に
during|～の間に、～の間ずっと
into|～の中へ
over|～の上に、～を越えて
through|～を通り抜けて、～を通して
across|～を横切って、～の向こう側に
along|～に沿って
inside|中に、～の中に
outside|外に、～の外に
together|いっしょに
tonight|今夜
soon|すぐに、まもなく
later|あとで
maybe|たぶん
often|よく、しばしば
once|1回、かつて
twice|2回、2倍
then|そのとき、それから
still|まだ、今でも
just|ちょうど、ただ～だけ
lot|たくさん
mine|私のもの
yours|あなたのもの
hers|彼女のもの
ours|私たちのもの
theirs|彼らのもの
myself|私自身
yourself|あなた自身
thousand|1000、千(の)
road|道路、道
magazine|雑誌
match|試合
coach|コーチ、監督
player|選手、演奏者
table|テーブル
sofa|ソファー
shower|シャワー
towel|タオル
clothes|服、衣服
glasses|めがね
cheese|チーズ
leaf|葉
grass|草、芝生
restroom|トイレ、お手洗い
noon|正午
half|半分、半分の
past|～を過ぎて、過去
bad|悪い
nickname|あだ名、ニックネーム
tournament|トーナメント、大会
bank|銀行
basket|かご、バスケット
bathroom|浴室、トイレ
bell|ベル、鐘
blackboard|黒板
board|黒板、板
bowl|おわん、ボウル
butter|バター
cafe|カフェ、喫茶店
camp|キャンプ、キャンプする
cartoon|漫画、アニメ
castle|城
chalk|チョーク
chef|料理人、シェフ
church|教会
cream|クリーム
far|遠い、遠くに
hall|ホール、会館
more|もっと多くの、もっと
most|最も多くの、ほとんどの、最も
note|メモ、短い手紙
radio|ラジオ
rose|バラ
stadium|競技場、スタジアム
stairs|階段
telephone|電話
television|テレビ
theater|劇場、映画館
toilet|トイレ
Mr.|～さん(男性)、～先生(男性)
Ms.|～さん(女性)、～先生(女性)
`;
// 英熟語:2 = 共通テスト②(画面写真から全100語)
WPS.VBOOK_DATA.idiom[2] = `
come up with|～を思いつく
at the end of|～の終わりに
these days|近頃
regardless of|～に関係なく
require A to|Aに～するよう要求する
wait for|～を待つ
as soon as|～するとすぐに
belong to|～に属する
provide A with|Aに…を提供する
connect to|～につながる
consist of|～から成る
in addition to|～に加えて
make sense|意味をなす、道理にかなう
teach A to|Aに～することを教える
benefit from|～から恩恵を受ける
all the time|いつも、その間ずっと
come out|出版される、明らかになる
worried about|～を心配している
go into|～を詳しく調べる、～に入る
succeed in|～に成功する
take up|～を始める、(時間・場所を)取る、(時間・場所を)占める
concerned about|～を心配している
interact with|～と交流する、相互作用する
take part in|～に参加する
begin with|～から始める
on top of|～に加えて、～の上に
in advance|前もって
over the years|長年にわたって
start with|～から始める
afraid of|～を恐れている
prefer A to|Aを…より好む
ready for|～の準備ができている
satisfied with|～に満足している
appropriate for|～にふさわしい
suitable for|～に適している
proud of|～を誇りに思っている
stick to|～に固執する、～を貫く
at the beginning of|～の初めに
hear from|～から便りがある
by chance|偶然に
fond of|～が好きである
look out|気をつける
in trouble|困って
sell out|売り切れる
A enough to do|…するほど～
find out|～を突き止める
in terms of|～の観点から
the rest of|～の残り
account for|(割合を)占める、説明する
engage in|～に従事する、～を行う
as to|～に関して
regard A as|Aを…と見なす
set up|～を設立する、設置する
search for|～を探し求める
over time|時とともに
a series of|一連の
on one's own|独力で、一人で
good at|～が得意である
carry out|～を実行する
ask for|～を求める
plenty of|たくさんの
a couple of|2、3の
expect A to|Aが～することを期待する
think of A as|Aを…と見なす
point to|～を指し示す、示唆する
in particular|特に
in turn|順番に、今度は逆に／その結果として
far from|決して～ではない
wish to|～したいと思う
or so|～かそこら
arrive at|(結論など)に達する
as long as S V|～する限り
slow down|速度を落とす
get out|外に出る、広まる
take over|～を引き継ぐ
find oneself|気がつくと～にいる
appeal to|～に訴える、～の心に響く
go through|～を経験する、詳しく調べる
exposed to|～にさらされている
look up|(辞書で)調べる、見上げる
take advantage of|～を利用する
in the end|最終的に
open to|～に開かれている、～を受け入れる
not A until|～まで…しない、～して初めて…する
put in|～を差し込む、(時間)を費やす
by the end of|～の終わりまでには
ahead of|～より先に
in a way|ある意味で
at risk|危険にさらされて
for a while|しばらくの間
known for|～で知られている
on time|時間どおりに
connect A with|AをBと結びつける
concerned with|～に関係している
look forward to|～を楽しみに待つ
such A that|とても～なので…
in common|共通して
concentrate on|～に集中する
put up|～を建てる、掲げる
go down|下がる、沈む
`;
// 英熟語:3 = 共通テスト③(画面写真から全54語)
WPS.VBOOK_DATA.idiom[3] = `
ever since|それ以来ずっと
bring up|～を育てる、(話題を)持ち出す
disagree with|～に反対する
no matter how|どんなに～でも
apart from|～は別として
be said to do|～すると言われている
essential to|～に不可欠である
at the age of|～歳のときに
get lost|道に迷う
complain about|～について不平を言う
have access to|～を利用できる
specialize in|～を専門にする
be about to do|まさに～しようとしている
familiar with|～をよく知っている
hang out|遊んで過ごす
come down|下がる、落ちる
get used to|～に慣れる
move on|先へ進む
even so|たとえそうでも
now that S V|今や～なので
faced with|～に直面している
agree on|～について合意する
struggle with|～に苦しむ、取り組む
do one's best|全力を尽くす
differ from|～と異なる
go with|～に合う、～に伴う
characteristic of|～に特有である
go wrong|うまくいかない
look into|～を調査する
harmful to|～に有害である
put off|～を延期する、気をそぐ
prepared for|～の準備ができている
turn away|～を追い返す
in total|合計で
on behalf of|～を代表して
as usual|いつものように
would rather A than B|BよりむしろAしたい
change one's mind|考えを変える
have difficulty -ing|～するのに苦労する
grow into|成長して～になる
in detail|詳細に
in full|全額、全部
fall on|(日付が)～に当たる
in the course of|～の間に
pleased with|～に満足している
familiar to|(人に)よく知られている
take A into consideration|～を考慮に入れる
take a look at|～を見てみる
in comparison with|～と比較して
pull up|止まる
submit to|～に服従する
jealous of|～をねたんでいる
try on|～を試着する
go on with|～を続ける
`;
// 英熟語:4 = MARCH①(画面写真から全100語)
WPS.VBOOK_DATA.idiom[4] = `
thousands of|何千もの
as much as|～ほども
return to|～に戻る
grow up|成長する
happen to|たまたま～する
end up|最終的に～になる
attempt to|～しようと試みる
pay for|～の代金を払う、～の報いを受ける
millions of|何百万もの
along with|～と一緒に
nevertheless|それにもかかわらず
take place|行われる、起こる
after all|結局、何といっても
force A to|Aに～することを強いる
compare with|～と比較する
figure out|～を理解する、解明する
suffer from|～に苦しむ
the moment|～するとすぐに
at work|働いて、作用して
on earth|(疑問詞強調)一体全体
prevent A from|Aが…するのを妨げる
in general|一般に
take to|～が好きになる、～し始める
in spite of|～にもかかわらず
responsible for|～に責任がある
published in|～に掲載された
designed to|～するように設計されている
call for|～を必要とする、要求する
a matter of|～の問題
adapt to|～に適応する
but for|～がなければ
as a result of|～の結果として
apply to|～に当てはまる
right now|今すぐ
affected by|～の影響を受けている
in -ing|～する際に
approach to|～への取り組み方
capable of|～する能力がある
by the time|～するまでには
in the middle of|～の最中に
on average|平均して
turn to|～に頼る、～の方を向く
not necessarily|必ずしも～ではない
train A to|Aを～するよう訓練する
filled with|～で満ちている
fill in|～に記入する
intend to|～するつもりである
put on|～を身につける
add to|～を増やす
and so on|～など
as far as|～する範囲では
and yet|それにもかかわらず
as for|～について言えば
live on|～を主食にする、～で生活する
when it comes to|～のこととなると
take on|～を引き受ける、帯びる
get out of|～から出る、～を免れる
care for|～の世話をする、～を好む
struggle to|～しようと奮闘する
at a time|一度に
work out|～を解決する、うまくいく
choose to|～することを選ぶ
result from|～から生じる
adapted from|～から脚色・改作された
bring about|～をもたらす
care about|～を気にかける
in short|要するに
in part|一部は
protect A from|Aを…から守る
what is called|いわゆる
be forced to do|～せざるを得ない
mentioned in|～で言及された
in public|人前で
keep up|～を維持する
break down|故障する、決裂する、分解する
except for|～を除いて
at once|すぐに、同時に
get in|入る、到着する
limited to|～に限られている
at the moment|今のところ
look to|～に期待する
turn into|～に変わる
nonetheless|それにもかかわらず
if not|そうでないとしても
take off|離陸する、(服を)脱ぐ
get up|起きる
available to|～が利用できる
graduate from|～を卒業する
as a whole|全体として
have on|～を身につけている
go up|上がる
remind A of|Aに…を思い出させる
invest in|～に投資する
wake up|目を覚ます
afford to|～する余裕がある
together with|～と一緒に
show up|現れる
go for|～を選ぶ、～に当てはまる
pay attention to|～に注意を払う
make for|～に役立つ、～の方へ向かう
`;
// 英熟語:12 = MARCH⑨(画面写真から全78語)
WPS.VBOOK_DATA.idiom[12] = `
take the lead|先頭に立つ
as A as ever|相変わらず～
get ready for|～の準備をする
on demand|要求に応じて
up to date|最新の
wear on|(時が)過ぎる
at the mercy of|～のなすがままで
bored with|～に退屈している
shut up|黙る
eligible for|～の資格がある
get down to|～に取りかかる
keep pace with|～と歩調を合わせる
set down|～を書き留める
to the full|十分に、心ゆくまで
break off|～を中断する
exempt from|～を免除されている
go out of business|廃業する
look on A as|Aを…と見なす
pass out|気を失う
plug in|～のプラグを差し込む
take note of|～に注意する
bound for|～行きである
in earnest|本格的に、真剣に
jump at|～に飛びつく
make oneself understood|自分の意思を伝える
meet the demand|需要を満たす
on schedule|予定どおりに
run across|～に偶然出会う
talk over|～について話し合う
press for|～を強く要求する
hold one's breath|息を止める、固唾をのむ
make do with|～で間に合わせる
make friends with|～と親しくなる
send for|～を呼びにやる
behind schedule|予定より遅れて
catch one's eye|～の目を引く
do over|～をやり直す
eager for|～を切望している
go after|～を追い求める
if it were not for|もし～がなければ
let down|～を失望させる
lose track of|～を見失う
on the move|移動中で、活発で
pride oneself on|～を誇りに思う
pull over|車を路肩に寄せる
start over|やり直す
talk A into|Aを説得して…させる
think over|～をじっくり考える
to a large extent|大部分は
to say the least|控えめに言っても
without doubt|疑いなく
at full speed|全速力で
be at a loss|途方に暮れている
burn out|燃え尽きる
congratulate A on|…のことでAを祝う
die down|静まる
do up|～を包む、ボタンを留める
in keeping with|～と調和して
in tears|泣いて
look out for|～に気をつける
lose face|面目を失う
make off|逃げる
none the less|それでもなお
run errands|使い走りをする
to a great extent|大いに
to say nothing of|～は言うまでもなく
under no circumstances|どんな状況でも～ない
watch out for|～に気をつける
play down|～を軽視する
take root|根付く
for the present|当分は
keep from|～を控える
leave a message|伝言を残す
on condition that|～という条件で
on duty|勤務中で
sell off|～を売り払う
stand to reason|道理にかなう
stand up to|～に立ち向かう
`;
// 英熟語:13 = 早慶①(画面写真から全100語)
WPS.VBOOK_DATA.idiom[13] = `
in the hands of|～の手中に、～に委ねられて
to a certain extent|ある程度まで
in a sense|ある意味で
strive for|～を得ようと努力する
inherent in|～に固有である
at large|全体としての、逃亡中で
deprived of|～を奪われている
lose sight of|～を見失う
put forward|～を提案する
watch over|～を見守る
what is more|その上
in one's own right|それ自体の力で、本来の資格で
to the contrary|それと反対の
take account of|～を考慮する
cautious about|～に用心深い
for one's part|～としては
in the name of|～の名のもとに
argue against|～に反対の主張をする
by and large|概して
compatible with|～と両立する
in agreement with|～と一致して
so to speak|いわば
be obliged to do|～せざるを得ない
comply with|～に従う
content with|～に満足している
stand up for|～を擁護する
at all costs|どんな犠牲を払っても
draw attention to|～に注意を引く
for the moment|当面は
kick off|始まる
come under|～を受ける
in large part|大部分は
keep out|～を締め出す
at first glance|一見したところ
at one's disposal|～の自由になる
applicable to|～に適用できる
at odds with|～と対立して
cover up|～を隠す
peculiar to|～に特有である
apologize to|～に謝る
bump into|～に偶然出会う
cut back on|～を削減する
fall apart|ばらばらになる
let go of|～を手放す
hold to|～を守る
in silence|黙って
scores of|多数の
take shape|形になる
at a distance|少し離れて
fall short of|～に達しない
fluent in|～が流暢である
needless to say|言うまでもなく
pin down|～を突き止める
at the latest|遅くとも
immune to|～に免疫がある
irrespective of|～に関係なく
start off|始める
tolerant of|～に寛容である
as it happens|実は、たまたま
boast of|～を自慢する
in the interest of|～のために
no A whatsoever|全く～ない
from the point of view of|～の観点から
allergic to|～にアレルギーがある
lag behind|～に遅れをとる
work up|～を奮い起こす
gain access to|～を利用できるようになる
on fire|燃えて
lead up to|～に至る
run the risk of|～の危険を冒す
under pressure|プレッシャーを受けて
wary of|～を警戒している
at length|詳細に、ついに
deserve to|～するに値する
for fear of|～を恐れて
have something to do with|～と何か関係がある
live off|～に頼って生きる
preferable to|～より好ましい
acquainted with|～を知っている、面識がある
at the cost of|～を犠牲にして
miss the point|要点を外す
ashamed of|～を恥じている
hand in hand|手を取り合って
liable to|～しがちである
responsive to|～に敏感に反応する
win over|～を味方につける
at heart|心の底では
distinct from|～と異なっている
dress up|着飾る
irrelevant to|～に無関係である
track down|～を追跡して見つける
bet on|～に賭ける
carry over|～を持ち越す
consist in|～にある、存する
go hand in hand|密接に関連している
in conjunction with|～と併せて
in harmony with|～と調和して
knock out|～を打ち負かす
pull off|～をやり遂げる
a good deal of|多量の
`;
// 英熟語:14 = 早慶②(画面写真から全100語)
WPS.VBOOK_DATA.idiom[14] = `
by virtue of|～のおかげで
knock down|～を打ち倒す、取り壊す
in recognition of|～を認めて
with the aim of|～を目的として
come of age|成年に達する
in cash|現金で
phase out|～を段階的に廃止する
from now on|今後は
set forth|～を述べる
at any rate|とにかく
dig up|～を掘り出す
break through|～を突破する
brush up|～を磨き直す
mess up|～を台なしにする
step up|～を強化する
at stake|危機に瀕して
bear A in mind|～を心に留める
carry away|～を夢中にさせる
crowded with|～で混雑している
drop off|～を降ろす、減少する
look back on|～を回想する
on and off|断続的に
or else|さもないと
persist in|～に固執する
put pressure on|～に圧力をかける
seeing that|～であるから
cry out|叫ぶ
fall back on|～に頼る
fit in with|～と調和する
in one's favor|～に有利に
oblivious to|～に気づいていない
shut out|～を締め出す
take responsibility for|～の責任を取る
that is to say|すなわち
come down with|(病気)にかかる
find fault with|～のあら探しをする
get hold of|～を手に入れる、つかむ
indispensable to|～に不可欠である
one after another|次々に
put A into practice|～を実行に移す
think through|～を考え抜く
call up|～に電話する、思い出す
on the air|放送中で
opt out|手を引く
out of place|場違いで
put aside|～を脇に置く、蓄える
within reach|手の届く範囲に
abide by|～に従う
beyond the reach of|～の手の届かない所に
in the event of|～の場合には
in the short run|短期的には
in the wake of|～の直後に、～の結果として
loyal to|～に忠実である
nothing short of|まさに～同然で
on the decline|減少中で
parallel to|～と平行している
pay the price|代償を払う
that is because|それは～だからである
tired from|～で疲れている
as regards|～に関しては
come to light|明るみに出る
face up to|～に立ち向かう
follow suit|先例にならう
incompatible with|～と両立しない
insensitive to|～に鈍感である
notorious for|～で悪名高い
cannot help -ing|～せずにいられない
fight off|～を撃退する
make a fortune|財を成す
blessed with|～に恵まれている
detrimental to|～に有害である
hardly A when|～するかしないうちに…
in all probability|おそらく
indicative of|～を示している
lead a life|生活を送る
step by step|一歩ずつ
in association with|～と共同で
on one's part|～の側の
tell a lie|嘘をつく
wash away|～を洗い流す
go a long way|大いに役立つ
grateful to|～に感謝している
on the point of|まさに～しようとして
tear down|～を取り壊す
a piece of cake|朝飯前
amazed at|～に驚いている
come around|意見を変える、回復する
fall through|失敗に終わる
fall victim to|～の犠牲になる
get in the way of|～の邪魔になる
if it had not been for|もし～がなかったなら
in conclusion|結論として
keep in touch with|～と連絡を保つ
leave off|～をやめる
lose one's temper|かっとなる
on the grounds that|～という理由で
settle for|～で妥協する
at the earliest|早くても
break even|損益なしになる
bridge the gap|溝を埋める
`;
// 英熟語:15 = 早慶③(画面写真から全44語)
WPS.VBOOK_DATA.idiom[15] = `
by mistake|間違って
come off|成功する、取れる
come to mind|心に浮かぶ
fed up with|～にうんざりしている
in honor of|～に敬意を表して
in order that|～するために
keen on|～に熱中している
keep away from|～に近づかない
out of the blue|突然に
pass over|～を見過ごす
play a part in|～で役割を果たす
take effect|効力を生じる
under construction|建設中で
wrap up|～を終える、包む
at any cost|どんな犠牲を払っても
by heart|暗記して
certain of|～を確信している
for nothing|無料で、無駄に
from the viewpoint of|～の観点から
it goes without saying|～は言うまでもない
keep off|～に近づかない
on the go|忙しく動き回って
set fire to|～に火をつける
step down|辞任する
talk back|口答えする
under the influence of|～の影響下で
without question|疑いなく
at the risk of|～の危険を冒して
come into play|作用し始める
come to life|生き返る、活気づく
confident of|～を確信している
count for|～の価値がある
do harm to|～に害を与える
dwell on|～をくよくよ考える
hostile to|～に敵対的である
in retrospect|振り返ってみると
it is no use -ing|～しても無駄だ
make much of|～を重視する
set the stage for|～の下地を作る
split up|分かれる
stand a chance|見込みがある
take charge of|～を担当する
take the trouble to|わざわざ～する
to make matters worse|さらに悪いことに
`;
// Plus Part 1(画面写真から全257語:見出し226・派生31)
WPS.VBOOK_DATA.plus[1] = `
insure|保険をかける
insurance|保険|派
terror|恐怖
Mozart|モーツァルト
ethics|倫理
soften|柔らかくする
radius|半径
unwind|ほどく、くつろぐ
parlor|店
superb|素晴らしい
pickup|迎えに行くこと
pagoda|塔
batter|衣をつける、激しく繰り返したたく、(揚げ物の)衣／(パンケーキの)生地
pickle|ピクルス
rocket|ロケット、急増する
unpack|取り出す
unplug|プラグを抜く
vacate|空ける
vacation|休暇|派
trifle|些細なこと
whiten|白くする
vanity|見栄
curfew|門限
pigeon|ハト
nearby|近くの
fairly|公平に、かなり
unfairly|不当に|派
ballet|バレエ
puppet|操り人形
chilly|寒い
laptop|ラップトップ型パソコン
buffet|ビュッフェ
salary|給料
classic|典型的な、名作、最高級の
classical|クラシックの|派
curriculum|カリキュラム
dissolve|溶ける、(議会を)解散する
dissolution|解散|派
diligent|勤勉な
diligence|勤勉|派
diameter|直径
specimen|標本
assemble|組み立てる、集まる
prestige|名声
coincide|(coincide withで)同時に起こる、一致する
coincidence|偶然の一致|派
tolerate|我慢する
tolerable|耐えられる|派
conceive|思いつく、妊娠する
misconceive|誤解する|派
conceivable|考えられる|派
vertical|垂直の
fraction|ごく一部、分数
metaphor|比喩
metaphorical|比喩的な|派
reassure|安心させる
reassurance|安心|派
reassuring|安心させる|派
mutation|突然変異
dementia|認知症
latitude|緯度、裁量の余地
juvenile|青少年の
affluent|裕福な
reckless|無謀な
recite|暗唱する
surrender|降伏する
distant|遠い
pedestrian|歩行者、平凡な
penalty|罰、罰金
implement|実行する、道具
infrastructure|インフラ
prominent|目立った、著名な
poetry|詩
adolescent|思春期の若者
pioneer|先駆者
chuckle|くすくす笑う
animate|活気づける
animation|アニメ|派
hostage|人質
terrify|怖がらせる
luggage|荷物
literal|文字どおりの
literally|文字どおりに|派
durable|丈夫な
furnish|備えつける、(情報などを)提供する
furnished|家具付きの|派
counter|反論する、売り場の台、逆に
anxiety|不安
shatter|粉々にする
vicious|悪意のある
dilemma|ジレンマ
wrinkle|しわ
slender|ほっそりした
reptile|爬虫類
genetic|遺伝子の
mixture|混合
utility|公共事業、有用性
testify|証言する
gallery|美術館
rubbish|ごみ
dynamic|活動的な
tighten|固く締める
analyze|分析する
diagram|図
inquire|尋ねる
sponsor|資金を提供する
justify|正当化する
justification|正当化|派
checkup|健康診断
scenery|景色
pharmacy|薬局
elaboration|詳しく述べること
sculpture|彫刻
personnel|職員
reinforce|補強する
nightmare|悪夢
acid|酸性の
acidity|酸性度|派
poll|世論調査
lung|肺
workforce|労働人口
wed|結婚する
wedding|結婚式|派
suicide|自殺
tempt|誘惑する
glory|栄光
conservative|保守的な
transition|移行
prefecture|県
warranty|保証
semester|学期
flourish|繁栄する
flourishing|栄えている|派
brochure|パンフレット
cosmetic|化粧品
heredity|遺伝
parasite|寄生虫
splendid|素晴らしい
splendor|輝き|派
renowned|有名な
intriguing|興味深い
carriage|馬車
headline|見出し
terrific|素晴らしい
feminine|女らしい
purse|財布
ape|類人猿
bullet|弾丸
mount|取り付ける、増加する
revolve|回転する
incline|する気にさせる
inclined|～する傾向がある|派
inclination|意向|派
farther|もっと遠い
further|さらに
commend|ほめる
crucify|はりつけにする
tribute|賛辞
conceit|うぬぼれ
persona|ペルソナ
big data|ビッグデータ
privacy|プライバシー
enlarge|拡大する
toddler|よちよち歩きの幼児
migrant|移住者
would-be|～になるつもりの
dis[diss]|ディスる
nanobot|ナノボット
mammoth|マンモス、巨大な
gimmick|しかけ
revival|復興
newborn|生まれたばかりの
cleanse|きれいにする
ostrich|ダチョウ
heroine|ヒロイン
cottage|別荘
receipt|領収書、受領
cashier|レジ係
karaoke|カラオケ
Article 9|憲法第9条
Pacific|太平洋の
lacquer|漆
ferment|発酵させる
tsunami|津波
stapler|ホチキス
pastime|気晴らし
bouquet|花束
Celsius|摂氏
amateur|アマチュア
sharpen|鋭くする
remains|残り、遺跡、遺体
cunning|ずるがしこい
luckily|運よく
anymore|もはや
rapidly|急速に
mansion|大豪邸
network|ネットワーク
eagerly|熱心に
proudly|誇らしげに
tornado|竜巻
organic|有機の
supervisor|監督者
mall|ショッピングモール
neuron|ニューロン
youngster|子供
parliament|議会
anonymous|匿名の
recipient|受け取る人
competent|有能な
competence|能力|派
ambiguity|あいまいさ
speculation|推測
offspring|子孫
appliance|器具
arbitrarily|独断的に
integrate|統合する
ecological|環境の
overwhelm|圧倒する
overwhelming|圧倒的な|派
telescope|望遠鏡
according to|～によれば、～に応じて
chip|小片
applause|拍手
definite|明確な
definitely|絶対に|派
indefinite|限定されない|派
fabulous|素敵な
overhear|偶然耳にする
exposure|さらされること
decisive|決定的な
relocate|移転させる
underlying|根底にある
equation|方程式
criminal|犯人
maximize|最大限にする
gigantic|巨大な
puncture|パンクさせる
bachelor|独身の男性、学士
accuracy|正確さ
compensation|補償
scan|スキャンする
refined|洗練された
refinement|洗練
trail|小道、跡
arouse|呼び起こす
arousal|覚醒|派
accelerate|加速する
acceleration|加速|派
accelerator|アクセル|派
accumulate|蓄積する
accumulation|蓄積|派
retreat|撤退する
digest|消化する、理解する
imaginary|想像上の
plot|筋、陰謀
orphan|孤児
displacement|置き換え
`;
// Plus Part 7(画面写真から全169語:見出し166・派生3)
WPS.VBOOK_DATA.plus[7] = `
lenient|寛大な
vertebrate|脊椎動物
perilous|とても危険な
abrupt|突然の
abruptly|突然|派
democratic|民主主義の
revolt|暴動を起こす
demote|降格する
autograph|サイン
eject|取り出す
obstruct|ふさぐ
pilgrim|巡礼者
salvation|救済
delegation|代表団
vulgar|下品な
recede|後退する
scrape|こすり取る
bait|餌
petition|請願
ransom|身代金
fragrance|芳香
conquest|征服
tariff|関税
outcast|見捨てられた人
scandal|スキャンダル
pillar|柱
tentatively|暫定的に
future-oriented|未来志向の
coarse|粗い
slack|たるんだ
premature|早過ぎる
attentive|注意深い
persuasive|説得力のある
perishable|腐りやすい
delinquent|非行の
sway|揺れる
renovate|改修する
opt|選ぶ
outnumber|より数で勝る
buzz|ざわつく
disconnect|接続を切る
gossip|うわさ話をする
trespass|侵入する
graze|牧草を食べる
entrust|AにBを任せる
meantime|その間
chatter|くだらないおしゃべり
bundle|束
canyon|峡谷
fountain|噴水
grassland|草原
needle|針
rubber|ゴム
detention|拘置
ignition|点火装置
sane|正気の
insane|正気でない|派
interpersonal|人間関係の
tolerant|寛容な
ironic|皮肉な
ironically|皮肉なことに|派
feasibility|実現可能性
abridged|簡約された
recurrent|繰り返される
irresistible|抵抗できない
dejected|落胆した
fictitious|架空の
gracious|親切な
upcoming|今度の
devise|考案する
horrify|怖がらせる
lodge|申し立てる
mediation|調停
mingle|交流する
perspire|汗をかく
waver|揺れ動く
exhale|吐き出す
rebound|跳ね返る
gratify|喜ばせる
relay|伝達する
align|一直線に並べる
deflate|しぼむ
outburst|爆発
swarm|大群
sequel|続編
clause|条項、節
downfall|破滅
fusion|融合
fracture|骨折
setback|妨げ
tumble|転倒、暴落
autopsy|検死
blast|爆発
aquatic|水生の
frantic|大急ぎの
deceptive|人を惑わすような
mellow|円熟した
cordial|心温まる
admirable|賞賛に値する
informative|有益な
diverse|多様な
intelligence|知能、諜報情報
solution|解決策、溶液
employee|従業員
philosopher|哲学者
pandemic|感染症の世界的流行
dominant|支配的な
judgment|判断
employer|雇用主
mathematical|数学的な
restriction|制限
destructive|破壊的な
corporate|企業の
essence|本質
evolutionary|進化の
chain|鎖
comprehension|理解力
noun|名詞
optimism|楽観主義
loyalty|忠誠心
dominance|優位
clarity|明快さ
guilt|罪悪感
voter|有権者
migration|移住
relief|安心、救済
suspicion|疑い
elegant|優雅な
ceiling|天井、上限
theoretical|理論的な
flexibility|柔軟性
cruelty|残酷さ
elevate|高める
revolutionary|革命的な
generosity|寛大さ
integration|統合
pronunciation|発音
advancement|進歩
paraphrase|言い換える
auditory|聴覚の
warfare|戦争行為
stimulus|刺激
contradiction|矛盾
separation|分離
upside|良い面
compass|方位磁針
aggression|攻撃性
credibility|信頼性
systematic|体系的な
intuitive|直感的な
publisher|出版社
newcomer|新参者
inclusive|包括的な
miracle|奇跡
spectacular|壮観な
devotion|献身
exaggeration|誇張
halfway|中間の
protagonist|主人公
assessment|評価
lavish|ぜいたくな
legendary|伝説的な
underneath|～の下に
backdrop|背景
chunk|塊
counsel|助言
eternity|永遠
lease|賃貸借契約
oversee|監督する
`;
// 英熟語:1 = 共通テスト①
WPS.VBOOK_DATA.idiom[1] = `
according to|～によれば、～に従って
for example|例えば
such as|～のような、例えば～
likely to|～しそうである、～する可能性が高い
because of|～のために、～が原因で
used to do|(以前は)よく～したものだ、以前は～だった
talk about|～について話す
based on|～に基づいている
at least|少なくとも
in fact|実際は、実は
come from|～の出身である、～に由来する
get A to|Aに～させる、Aに～してもらう
go on|続く、起こる、(go on -ingで)～し続ける
on the other hand|他方では、一方で
allow A to|Aが～するのを許す、Aが～できるようにする
as well as|～だけでなく、～と同様に
up to|～まで、～次第で
refer to|～に言及する、～を指す、～を参照する
not only A but also B|AだけでなくBも
even though|～であるにもかかわらず
so A that|とてもAなので…
interested in|～に興味がある
related to|～と関係がある
make sure|確かめる、確実に～するようにする
a variety of|さまざまな
tend to|～する傾向がある
depend on|～に頼る、～次第である
listen to|～を聞く、～に耳を傾ける
ask A to|Aに～するよう頼む
for instance|例えば
make up|～を構成する、でっち上げる、(make up forで)埋め合わせる
result in|～という結果になる
rely on|～に頼る
different from|～と異なる
in front of|～の前で
tell A to|Aに～するよう言う
participate in|～に参加する
in order to do|～するために
due to|～が原因で、～のために
focus on|～に焦点を当てる、～に集中する
encourage A to|Aに～するよう促す・励ます
worry about|～を心配する
contribute to|～に貢献する、～の一因となる
in addition|その上、さらに
give up|～をあきらめる、～をやめる
come up|(話題に)のぼる、生じる、近づく
at the same time|同時に、しかし一方で
find it A to do|…するのはAだとわかる・思う
lead A to|Aを～する気にさせる、Aを～に導く
enable A to|Aが～できるようにする
as long as|～する限り、～しさえすれば
full of|～でいっぱいである
whether or not|～かどうか、～であろうとなかろうと
for the first time|初めて
in contrast|対照的に、それに対して
in time|間に合って、やがて
deal with|～を扱う、～に対処する
as a result|その結果
too A to do|あまりにAで…できない
help A to|Aが～するのを手伝う
associated with|～と関連している
cause A to|Aに～させる(原因となる)
point out|～を指摘する
involved in|～に関わっている、～に参加している
hundreds of|何百もの
at first|最初は
thanks to|～のおかげで
in other words|言い換えれば、つまり
go out|外出する、(火・明かりが)消える
so far|今のところ、これまでのところ
pick up|～を拾う、車で迎えに行く、(自然に)身につける
respond to|～に反応する、～に答える
come in|入る、(流行などが)現れる
at that|その上、しかも、それで
agree with|～に同意する、(気候・食べ物が)～に合う
supposed to|～することになっている、～するはずだ
help A with|Aの…を手伝う
as A as possible|できるだけA
not always|いつも～とは限らない
take care of|～の世話をする、～を処理する
by oneself|一人で、独力で
prepare for|～に備える、～の準備をする
in the way|邪魔になって
apply for|～に応募する、～を申し込む
hand in|～を提出する
famous for|～で有名である
even if|たとえ～でも
instead of|～の代わりに、～しないで
want A to|Aに～してほしい
look for|～を探す
as if / as though|まるで～かのように
known as|～として知られている
turn out|～だと判明する、生産する、(会などに)出てくる
work on|～に取り組む
a number of|多くの、いくつかの
for all|～にもかかわらず
similar to|～と似ている
aware of|～に気づいている
willing to|進んで～する、～するのをいとわない
the 比較級, the 比較級|～すればするほど…
`;
// 本のデータを単語の一覧(WPS.BANK)に組み立てる。入力済みのPartだけが入る
(function () {
  WPS.VBOOKS.forEach(function (b) {
    var data = WPS.VBOOK_DATA[b.id];
    if (!data || !b.bank) return;
    var out = [];
    Object.keys(data).map(Number).sort(function (a, c) { return a - c; }).forEach(function (n) {
      data[n].split('\n').forEach(function (line) {
        var c = line.split('|');
        if (c.length < 2 || !c[0].trim()) return;
        var it = { t: c[0].trim(), m: c[1].trim(), part: n, bk: b.id };
        if (c[2] === '派') it.d = 1;
        out.push(it);
      });
    });
    b.done = out.length;
    b.doneMain = out.filter(function (x) { return !x.d; }).length;
    WPS.BANK[b.bank] = out;
  });
})();
