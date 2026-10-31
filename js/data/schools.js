/*
 * 志望校データ・勉強法データ
 * ------------------------------------------------------------
 * 【注意】入試科目・配点・日程は毎年変わります。
 * ここに入れているのは「対策の方向性」を決めるための
 * 一般的な傾向です。最終的には必ず各大学・各都道府県の
 * 最新の募集要項(入試要項)で確認してください。
 *
 * weights … 科目ごとの重要度(0〜1)。ロードマップの優先順位に使います。
 * features … その学校の入試の特徴(対策で意識すべき点)
 */
window.WPS = window.WPS || {};

// 2027年度入試(2026年度に受験)の日程の目安
// 共通テスト本試験:2027年1月16日(土)・17日(日)
//   出典:リセマム https://resemom.jp/article/2026/05/20/86119.html
// 国公立2次(前期)は例年2月25日から。私立一般は2月上旬が中心。
// 公立高校入試は都道府県ごとに異なる(2月〜3月)。
WPS.EXAM_DATES = {
  kyotsu:   { label: '大学入学共通テスト', date: '2027-01-16' },
  national: { label: '国公立大 2次試験(前期)', date: '2027-02-25' },
  private:  { label: '私立大 一般選抜(目安)', date: '2027-02-01' },
  high:     { label: '高校入試(目安・地域で異なる)', date: '2027-02-20' }
};

var W = {
  natBun:  { eng: 1, jpn: 1, math: 0.8, soc: 0.9, sci: 0.5, info: 0.4 },
  natRi:   { eng: 1, math: 1, sci: 1, jpn: 0.6, soc: 0.4, info: 0.4 },
  natMed:  { eng: 1, math: 1, sci: 1, jpn: 0.6, soc: 0.5, info: 0.4 },
  priBun:  { eng: 1, jpn: 1, soc: 0.9, math: 0.2, sci: 0, info: 0 },
  priRi:   { eng: 1, math: 1, sci: 1, jpn: 0, soc: 0, info: 0 },
  high:    { eng: 1, math: 1, jpn: 1, sci: 0.9, soc: 0.9, info: 0 },
  highPri: { eng: 1, math: 1, jpn: 1, sci: 0.3, soc: 0.3, info: 0 }
};

function nat(id, name, area, rank, features) {
  return {
    id: id, name: name, kind: 'national', area: area, rank: rank,
    tracks: { '文系': W.natBun, '理系': W.natRi },
    exams: ['kyotsu', 'national'],
    features: features
  };
}
function pri(id, name, area, rank, features) {
  return {
    id: id, name: name, kind: 'private', area: area, rank: rank,
    tracks: { '文系': W.priBun, '理系': W.priRi },
    exams: ['private'],
    features: features
  };
}

// 共通する特徴(何度も使うもの)
var F_KYOTSU = '共通テストは6教科8科目(情報Ⅰを含む)が基本。基礎〜標準の問題を、制限時間内に正確に解く力が問われます。';
var F_NIJI = '2次試験は記述式が中心。答えだけでなく「考え方を書く力」が必要です。';
var F_PRI3 = '一般選抜は3教科型が中心(文系:英語・国語・地歴公民/数学、理系:英語・数学・理科)。';
var F_ENG = '英語の配点が高い学部が多く、英語の出来が合否を大きく左右します。';

WPS.SCHOOLS = [
  // ---- 国公立(最難関) ----
  nat('todai', '東京大学', '関東', 'S', [
    F_KYOTSU,
    '共通テストは第1段階選抜(足切り)と、2次との合計点の両方に使われます。',
    '2次は全科目が記述式。文科は数学、理科は国語(古文・漢文を含む)も2次で必要です。',
    '英語は要約・英作文・リスニングなど出題形式が幅広いです。'
  ]),
  nat('kyodai', '京都大学', '関西', 'S', [
    F_KYOTSU,
    '2次は記述式中心。英語は和訳と英作文の比重が高いのが特徴です。',
    '理系学部でも2次で国語が課される学部が多いので、古文・漢文も早めに準備を。'
  ]),
  nat('hitotsubashi', '一橋大学', '関東', 'S', [
    F_KYOTSU, F_NIJI,
    '文系でも2次の数学が重要。整数・確率などの記述対策が欠かせません。'
  ]),
  nat('sciencetokyo', '東京科学大学(旧 東京工業大学・東京医科歯科大学)', '関東', 'S', [
    F_KYOTSU,
    '理工系は2次の数学・物理・化学の比重が大きく、数学の記述力が合否を分けます。'
  ]),
  // ---- 国公立(難関) ----
  nat('hokudai', '北海道大学', '北海道', 'A', [F_KYOTSU, F_NIJI, '総合入試(文系・理系)では入学後に学部を選べます。']),
  nat('tohoku', '東北大学', '東北', 'A', [F_KYOTSU, F_NIJI, '総合型選抜(AO入試)の募集も多いのが特徴です。']),
  nat('nagoya', '名古屋大学', '中部', 'A', [F_KYOTSU, F_NIJI]),
  nat('osaka', '大阪大学', '関西', 'A', [F_KYOTSU, F_NIJI, '英語の記述(和訳・英作文)の比重が高めです。']),
  nat('kyushu', '九州大学', '九州', 'A', [F_KYOTSU, F_NIJI]),
  nat('kobe', '神戸大学', '関西', 'A', [F_KYOTSU, F_NIJI]),
  nat('tsukuba', '筑波大学', '関東', 'A', [F_KYOTSU, F_NIJI]),
  nat('yokokoku', '横浜国立大学', '関東', 'B', [F_KYOTSU, F_NIJI]),
  nat('chiba', '千葉大学', '関東', 'B', [F_KYOTSU, F_NIJI]),
  nat('hiroshima', '広島大学', '中国', 'B', [F_KYOTSU, F_NIJI]),
  nat('local_nat', '地方国公立大学(その他の国公立)', '全国', 'B', [
    F_KYOTSU,
    '共通テストの配点比率が高い大学が多く、共通テストで取りこぼさないことが最重要です。',
    '2次は1〜2科目、または面接・小論文のみの学部もあります。'
  ]),
  {
    id: 'med_nat', name: '国公立大学 医学部医学科', kind: 'national', area: '全国', rank: 'S',
    tracks: { '理系': W.natMed, '文系': W.natMed },
    exams: ['kyotsu', 'national'],
    features: [
      '共通テストで高得点(8〜9割程度)が求められることが多いです。',
      '2次は英語・数学・理科2科目が中心で、面接が課されます。',
      '苦手科目を作らないことが何より大切です。'
    ]
  },
  // ---- 私立 ----
  pri('waseda', '早稲田大学', '関東', 'S', [
    '学部ごとに入試方式・科目が大きく異なります。志望学部の方式を必ず確認しましょう。',
    '一部の学部では、共通テストと独自試験を組み合わせた方式をとっています。',
    '国語では古文・漢文も出題されることが多いです。'
  ]),
  pri('keio', '慶應義塾大学', '関東', 'S', [
    '多くの学部で小論文(論述)が課されます。早めの対策が必要です。',
    '国語の試験がない学部が多く、英語の配点が高い傾向です。'
  ]),
  pri('sophia', '上智大学', '関東', 'A', [
    F_ENG,
    '英語外部試験のスコアを利用できる方式もあります。'
  ]),
  pri('march', 'MARCH(明治・青山学院・立教・中央・法政)', '関東', 'A', [
    F_PRI3, F_ENG,
    '全学部統一入試など、1回の受験で複数学部に出願できる方式があります。'
  ]),
  pri('kankandoritsu', '関関同立(関西・関西学院・同志社・立命館)', '関西', 'A', [
    F_PRI3, F_ENG,
    '全学部日程など、同じ問題で複数学部を受けられる方式があります。'
  ]),
  pri('nittoukomasen', '日東駒専(日本・東洋・駒澤・専修)', '関東', 'B', [
    F_PRI3,
    '基礎〜標準レベルの問題が中心。教科書レベルを完璧にすることが合格への近道です。'
  ]),
  pri('sankinkouryu', '産近甲龍(京都産業・近畿・甲南・龍谷)', '関西', 'B', [
    F_PRI3,
    '基礎〜標準レベルの問題が中心。教科書レベルを完璧にすることが合格への近道です。'
  ]),
  pri('other_pri', 'その他の私立大学', '全国', 'B', [
    F_PRI3,
    '2教科型や、得意科目の配点を高くできる方式がある大学もあります。'
  ]),
  // ---- 高校受験 ----
  {
    id: 'public_high', name: '公立高校(高校受験)', kind: 'high', area: '全国', rank: 'B',
    tracks: { '5教科': W.high },
    exams: ['high'],
    features: [
      '5教科(英語・数学・国語・理科・社会)の学力検査が基本です。',
      '学力検査に加えて、内申点(調査書)も合否に関わります。日々の定期テストも大切です。',
      '試験日程・問題・配点は都道府県ごとに異なります。'
    ]
  },
  {
    id: 'private_high', name: '私立高校(高校受験)', kind: 'high', area: '全国', rank: 'B',
    tracks: { '3教科': W.highPri, '5教科': W.high },
    exams: ['high'],
    features: [
      '英語・数学・国語の3教科型が中心です。',
      '学校独自の問題が出るため、志望校の過去問で出題傾向をつかむことが重要です。'
    ]
  }
];

WPS.SCHOOL_MAP = {};
WPS.SCHOOLS.forEach(function (s) { WPS.SCHOOL_MAP[s.id] = s; });

/*
 * 勉強法(時期別・科目別)
 * ------------------------------------------------------------
 * 予備校・高校の公開資料を参考に、一般的に推奨されている方法をまとめています。
 * 出典は sources に記載しています。
 */
WPS.METHOD_SOURCES = [
  { title: '静岡県教育委員会 進路だより(基礎力養成→応用力養成→実践力養成の3段階)', url: 'https://www.edu.pref.shizuoka.jp/_files/00083508/sinro_7.pdf' },
  { title: '東進ハイスクール 湘南台東口校「夏前に基礎を固める重要性」', url: 'https://www.toshin.com/shonandai/post/2026/06/21/%e5%a4%8f%e5%89%8d%e3%81%ab%e5%9f%ba%e7%a4%8e%e3%82%92%e5%9b%ba%e3%82%81%e3%82%8b%e9%87%8d%e8%a6%81%e6%80%a7/' },
  { title: '東進ハイスクール センター南駅前校「7月の高3の勉強」', url: 'https://www.toshin.com/centerminami/post/2023/07/09/7%e6%9c%88%e3%81%ae%e9%ab%983%e3%81%ae%e5%8b%89%e5%bc%b7/' },
  { title: '東進ハイスクール 三軒茶屋校「過去問は進んでいますか?」', url: 'https://www.toshin.com/sangenjaya/post/2025/08/18/%e3%80%90%e5%8f%97%e9%a8%93%e7%94%9f%e3%81%ae%e5%bf%85%e9%81%94%e7%9b%ae%e6%a8%99%ef%bc%81%e9%81%8e%e5%8e%bb%e5%95%8f%e3%81%af%e9%80%b2%e3%82%93%e3%81%a7%e3%81%84%e3%81%be%e3%81%99%e3%81%8b%ef%bc%9f/' },
  { title: 'リセマム「2027年度 大学入学共通テスト 実施日程」', url: 'https://resemom.jp/article/2026/05/20/86119.html' },
  { title: '東京大学 入学者選抜 出題教科・科目の予告(公式PDF)', url: 'https://www.u-tokyo.ac.jp/content/400227961.pdf' },
  { title: '河合塾 Kei-Net 大学入試科目検索', url: 'https://search.keinet.ne.jp/general/exam_subject/1280' }
];

// ロードマップの4つのフェーズ
WPS.PHASES = [
  {
    key: 'repair', name: '土台の修復', emoji: '🧱',
    desc: '高校の問題が解けない原因になっている、中学範囲の「穴」をふさぐ時期です。ここを飛ばすと、あとで必ずつまずきます。',
    howto: ['苦手単元の「要点」を読み、例題を声に出して解説してみる', '単語帳(問題集)で毎日少しずつ反復する', '間違えた問題は「なぜ間違えたか」を一言メモする']
  },
  {
    key: 'standard', name: '基礎〜標準の完成', emoji: '📘',
    desc: '受験で使う範囲の苦手単元を、標準問題が解けるレベルまで仕上げます。共通テストの問題は基礎が中心なので、ここが得点の土台になります。',
    howto: ['1単元ずつ「知識→理解→応用」の順に問題を解く', '週に1回、ミニ診断テストで克服できたか確認する', '解けない問題は、家庭教師の授業で質問する']
  },
  {
    key: 'practice', name: '実戦・過去問演習', emoji: '🎯',
    desc: '志望校の過去問や共通テスト形式の問題で、時間配分と得点の取り方を身につけます。過去問は「解くだけ」で終わらせず、間違いの原因分析までがセットです。',
    howto: ['過去問を時間を計って解く', '間違えた問題の単元を、このアプリで復習する', '時間配分と、解く順番の作戦を見直す']
  },
  {
    key: 'final', name: '直前の総仕上げ', emoji: '🌸',
    desc: '新しいことに手を広げず、これまで間違えた問題の総復習で「取れる問題を確実に取る」時期です。体調管理も実力のうちです。',
    howto: ['単語帳の「あいまい」「わからない」カードを総復習する', '本番と同じ時間割で問題を解いてみる', '睡眠時間を本番に合わせて整える']
  }
];

// 科目別の勉強法(一般的に推奨されている方法)
WPS.SUBJECT_METHODS = {
  eng: ['単語・熟語は毎日少しずつ。1日でまとめてやるより、毎日10分を続ける方が記憶に残ります。', '文法は「なぜその形になるか」を説明できるまで。', '長文は つなぎ言葉(However など)に印をつけて読む。'],
  math: ['解き方を「覚える」のではなく「なぜその解き方か」を説明できるようにする。', '計算ミスは途中式を書く習慣で減らせます。', '高校数学がわからないときは、中学の単元にさかのぼるのが近道です。'],
  jpn: ['現代文は「答えの根拠は本文のどこか」を必ず確認する。', '古文は単語と助動詞が土台。毎日の単語帳が効きます。', '漢文は句法の数が少ないので、短期間で得点源にできます。'],
  sci: ['用語は「何のためにあるか(はたらき)」とセットで覚える。', '計算問題は単位をつけて計算すると、ミスに気づきやすくなります。', 'グラフや図は自分で描いて説明できるようにする。'],
  soc: ['まず時代や地域の大きな流れをつかみ、その後で細かい用語を覚える。', '「なぜ起きたか」「その結果どうなったか」をセットで覚える。', '資料の読み取り問題に慣れておく。'],
  info: ['2進数などの計算は、手を動かして練習する。', 'プログラム問題は、変数の値を表に書いて1行ずつ追いかける(トレース)。']
};

/*
 * 公式サイト(入試情報は各大学の公式サイト・募集要項が最も正確です)
 * グループ(MARCH など)は、各大学の公式サイトを並べています。
 */
WPS.SCHOOL_LINKS = {
  todai: [['東京大学', 'https://www.u-tokyo.ac.jp/']],
  kyodai: [['京都大学', 'https://www.kyoto-u.ac.jp/']],
  hitotsubashi: [['一橋大学', 'https://www.hit-u.ac.jp/']],
  sciencetokyo: [['東京科学大学', 'https://www.isct.ac.jp/']],
  hokudai: [['北海道大学', 'https://www.hokudai.ac.jp/']],
  tohoku: [['東北大学', 'https://www.tohoku.ac.jp/']],
  nagoya: [['名古屋大学', 'https://www.nagoya-u.ac.jp/']],
  osaka: [['大阪大学', 'https://www.osaka-u.ac.jp/']],
  kyushu: [['九州大学', 'https://www.kyushu-u.ac.jp/']],
  kobe: [['神戸大学', 'https://www.kobe-u.ac.jp/']],
  tsukuba: [['筑波大学', 'https://www.tsukuba.ac.jp/']],
  yokokoku: [['横浜国立大学', 'https://www.ynu.ac.jp/']],
  chiba: [['千葉大学', 'https://www.chiba-u.jp/']],
  hiroshima: [['広島大学', 'https://www.hiroshima-u.ac.jp/']],
  waseda: [['早稲田大学', 'https://www.waseda.jp/']],
  keio: [['慶應義塾大学', 'https://www.keio.ac.jp/']],
  sophia: [['上智大学', 'https://www.sophia.ac.jp/']],
  march: [['明治大学', 'https://www.meiji.ac.jp/'], ['青山学院大学', 'https://www.aoyama.ac.jp/'], ['立教大学', 'https://www.rikkyo.ac.jp/'], ['中央大学', 'https://www.chuo-u.ac.jp/'], ['法政大学', 'https://www.hosei.ac.jp/']],
  kankandoritsu: [['関西大学', 'https://www.kansai-u.ac.jp/'], ['関西学院大学', 'https://www.kwansei.ac.jp/'], ['同志社大学', 'https://www.doshisha.ac.jp/'], ['立命館大学', 'https://www.ritsumei.ac.jp/']],
  nittoukomasen: [['日本大学', 'https://www.nihon-u.ac.jp/'], ['東洋大学', 'https://www.toyo.ac.jp/'], ['駒澤大学', 'https://www.komazawa-u.ac.jp/'], ['専修大学', 'https://www.senshu-u.ac.jp/']],
  sankinkouryu: [['京都産業大学', 'https://www.kyoto-su.ac.jp/'], ['近畿大学', 'https://www.kindai.ac.jp/'], ['甲南大学', 'https://www.konan-u.ac.jp/'], ['龍谷大学', 'https://www.ryukoku.ac.jp/']]
};
// どの学校にも共通して使える公式・準公式の情報源
WPS.COMMON_LINKS = [
  ['大学入試センター(共通テストの公式情報)', 'https://www.dnc.ac.jp/'],
  ['河合塾 Kei-Net(大学ごとの入試科目・配点を検索)', 'https://search.keinet.ne.jp/']
];
