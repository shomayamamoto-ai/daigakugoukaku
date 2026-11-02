/*
 * 英単語帳(本ごと・Partごと)。
 * 書式:1行に1語「見出し|意味」。派生語は行末に「|派」をつけ、もとの語のすぐ後に置きます。
 * 意味は、一般的な辞書的意味をもとに、このアプリ用に書いたものです。
 * いまは「大学受験 基礎」Part 1 だけ入力済み。ほかは準備中(データを受け取りしだい追加)。
 */
window.WPS = window.WPS || {};
WPS.VBOOKS = [
  { id: 'base', name: '大学受験 基礎', bank: 'en_h', total: 3141,
    parts: [[188, 112], [217, 83], [217, 83], [236, 64], [239, 61], [289, 11], [248, 52], [206, 94], [220, 80], [241, 59], [250, 50], [235, 65], [211, 46], [144, 0, '基礎・標準の補充']] },
  { id: 'jh', name: '中学英単語', total: 1657 },
  { id: 'plus', name: '大学受験 中級', total: 1631 },
  { id: 'idiom', name: '英熟語', total: 1376 },
  { id: 'sokei', name: '早慶上理', note: '学部ごと' }
];
WPS.VBOOK_DATA = { base: {} };
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
        var it = { t: c[0].trim(), m: c[1].trim(), part: n };
        if (c[2] === '派') it.d = 1;
        out.push(it);
      });
    });
    b.done = out.length;
    WPS.BANK[b.bank] = out;
  });
})();
