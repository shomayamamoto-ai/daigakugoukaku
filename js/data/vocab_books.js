/*
 * 英単語帳(本ごと・Partごと)。
 * 書式:1行に1語「見出し|意味」。派生語は行末に「|派」をつけ、もとの語のすぐ後に置きます。
 * 意味は、一般的な辞書的意味をもとに、このアプリ用に書いたものです。
 * いまは「大学受験 基礎」Part 1〜9・14 を入力済み。ほかは準備中(データを受け取りしだい追加)。
 */
window.WPS = window.WPS || {};
WPS.VBOOKS = [
  { id: 'base', name: '大学受験 基礎', bank: 'en_h', total: 3141,
    parts: [[188, 112], [217, 83], [217, 83], [236, 64], [239, 61], [289, 11], [248, 52], [206, 94], [220, 80], [241, 59], [250, 50], [235, 65], [211, 46], [144, 0, '基礎・標準の補充']] },
  { id: 'jh', name: '中学英単語', total: 1657 },
  { id: 'plus', name: '大学受験 中級', total: 1631 },
  { id: 'idiom', name: '英熟語', total: 1376 },
  { id: 'sokei', name: '早慶上理', note: '学部ごと', bank: 'en_sokei', named: 1,
    parts: [[106, 0, '早稲田 政治経済'], [144, 0, '慶應 文']] }
];
// 早慶上理:大学・学部ごとの予定語数(元の単語帳の画面で表示されていた数)。入力済みは parts の名前で判定
WPS.SOKEI_PLAN = [
  { univ: '早稲田', fac: [['政治経済学部', 106, '早稲田 政治経済']] },
  { univ: '慶應', all: 921, fac: [['文学部', 240], ['経済学部', 176], ['法学部', 158], ['商学部', 276], ['医学部', 211], ['薬学部', 255], ['理工学部', 280], ['総合政策学部', 397], ['環境情報学部', 339], ['看護医療学部', 122]] }
];
WPS.VBOOK_DATA = { base: {}, sokei: {} };
if (WPS.KOBUN_BOOK) { WPS.VBOOKS.push(WPS.KOBUN_BOOK); WPS.VBOOK_DATA.kobun = WPS.VBOOK_DATA_KOBUN; }
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
// 2 = 慶應 文学部(240語中144語を入力。画像のつなぎ目で抜けている語は、受け取りしだい追加)
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
