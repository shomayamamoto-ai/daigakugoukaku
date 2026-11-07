/*
 * 無料診断テスト(shindan.html)の問題データ js/data/shindan_q.js を作る。
 * 学習アプリの問題(手書き+自動生成)から、音声・図が要らない問題だけを抜き出し、
 * 「数学Ⅰ」「物理」「日本史」などの科目ごとに分ける。
 *   使い方: リポジトリのいちばん上で  node tools/build_shindan.js
 */
global.window = global; global.WPS = {}; global.document = {};
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const srcs = [...html.matchAll(/<script src="(js\/data\/[^"?]+)/g)].map(m => m[1]);
for (const f of srcs.slice(0, srcs.indexOf('js/data/build.js') + 1)) require(path.join(ROOT, f));

const S = WPS.STAGES, UM = WPS.UNIT_MAP;
const jh = u => S.indexOf(u.stage) <= 2;

/* 科目(並び順がそのままボタンの並び順になる)。[名前, 教科, 中学/高校, 色] */
const COURSE = {
  j_eng: ['英語', 'eng', 'jh', '#3b82f6'], j_math: ['数学', 'math', 'jh', '#ef4444'], j_jpn: ['国語', 'jpn', 'jh', '#10b981'],
  j_sci: ['理科', 'sci', 'jh', '#8b5cf6'], j_soc: ['社会', 'soc', 'jh', '#f59e0b'],
  eng_g: ['英文法・語法', 'eng', 'hs', '#3b82f6'], eng_r: ['英単語・読解', 'eng', 'hs', '#1d4ed8'],
  m1: ['数学Ⅰ', 'math', 'hs', '#ef4444'], ma: ['数学A', 'math', 'hs', '#f97316'], m2: ['数学Ⅱ', 'math', 'hs', '#dc2626'],
  mb: ['数学B', 'math', 'hs', '#e11d48'], mc: ['数学C', 'math', 'hs', '#be123c'], m3: ['数学Ⅲ', 'math', 'hs', '#9f1239'],
  gen: ['現代文', 'jpn', 'hs', '#10b981'], ko: ['古文', 'jpn', 'hs', '#059669'], kan: ['漢文', 'jpn', 'hs', '#0d9488'],
  pb: ['物理基礎', 'sci', 'hs', '#8b5cf6'], cb: ['化学基礎', 'sci', 'hs', '#a855f7'], bb: ['生物基礎', 'sci', 'hs', '#7c3aed'], eb: ['地学基礎', 'sci', 'hs', '#6366f1'],
  ph: ['物理', 'sci', 'hs', '#6d28d9'], ch: ['化学', 'sci', 'hs', '#9333ea'], bi: ['生物', 'sci', 'hs', '#5b21b6'], ea: ['地学', 'sci', 'hs', '#4f46e5'],
  sl: ['科学と人間生活', 'sci', 'hs', '#a78bfa'],
  rs: ['歴史総合', 'soc', 'hs', '#f59e0b'], jh: ['日本史', 'soc', 'hs', '#d97706'], wh: ['世界史', 'soc', 'hs', '#ea580c'],
  gg: ['地理', 'soc', 'hs', '#ca8a04'], pk: ['公共・政治経済', 'soc', 'hs', '#b45309'], ri: ['倫理', 'soc', 'hs', '#c2410c'],
  info: ['情報Ⅰ', 'info', 'hs', '#0ea5e9']
};
const ONE = {
  // 数学
  m_h1: 'm1', m_h2: 'm1', m_qmax: 'm1', m_disc: 'm1', m_sincos: 'm1',
  m_h3: 'ma', m_prob: 'ma', m_int: 'ma',
  m_h4: 'm2', m_h5: 'm2', m_h6: 'm2', m_h7: 'm2', m_exp: 'm2',
  m_h8: 'mb', m_sigma: 'mb', m_h9: 'mc',
  // 英語
  e_h5: 'eng_r', e_idiom: 'eng_r', e_h6: 'eng_r', ek_writing: 'eng_r', ex_eng: 'eng_g', hd_eng: 'eng_g',
  // 国語
  j_hyoron: 'gen', j_shinjo: 'gen', j_hyogen: 'gen', kt_ron: 'gen', kt_bun: 'gen', kt_jitsu: 'gen',
  j_h1: 'ko', j_h2: 'ko', j_h3: 'ko', j_kogo: 'ko', j_katsuyo: 'ko', kt_ko: 'ko',
  j_h4: 'kan', j_kanword: 'kan', kt_kan: 'kan',
  // 理科(高校の s_ は基礎科目)
  s_h1: 'cb', s_struct: 'cb', s_acid: 'cb', s_life: 'cb',
  s_h2: 'pb', s_energy: 'pb', s_wave: 'pb',
  s_h3: 'bb', s_eco: 'bb', s_geo: 'eb',
  // 社会
  c_h3: 'pk', c_h1: 'jh', hx_jhist: 'jh', hd_jsoc: 'jh', c_h2: 'wh', hx_whist: 'wh', hd_wsoc: 'wh'
};
const PRE = [[/^m1_/, 'm1'], [/^ma_/, 'ma'], [/^m2_/, 'm2'], [/^mb_/, 'mb'], [/^mc_/, 'mc'], [/^m3_/, 'm3'],
  [/^p4_/, 'ph'], [/^c4_/, 'ch'], [/^b4_/, 'bi'], [/^g4_/, 'ea'], [/^gb_/, 'eb'], [/^sl_/, 'sl'],
  [/^hs_/, 'rs'], [/^jh_/, 'jh'], [/^wh_/, 'wh'], [/^gg_/, 'gg'], [/^pk_/, 'pk'], [/^ri_/, 'ri'], [/^(i_|ix_|hd_info)/, 'info']];
const SKIP = /^(mx_h|hd_m|sx_h|hd_sci|jx_std|hd_jpn|ek_eiken|ek_speaking|el_)/; // 複数科目のまとめ・音声・知識紹介の単元
function courseOf(u) {
  if (!u) return null;
  if (jh(u)) return 'j_' + u.subj in COURSE ? 'j_' + u.subj : null;
  if (SKIP.test(u.id)) return null;
  if (ONE[u.id]) return ONE[u.id];
  for (const [re, c] of PRE) if (re.test(u.id)) return c;
  if (u.subj === 'eng' && /^e_/.test(u.id)) return 'eng_g';
  return null;
}

/* 問題を集める(手書き+自動生成)。正解は choices[0] */
const BAD = /図|グラフ|下の|右の|左の|次の文章|本文|資料|音声|聞いて|写真|イラスト/;
function ok(q, u) {
  if (!q || !q.choices || q.choices.length < 3 || q.fig || q.say || q.sayChoices) return false;
  if (BAD.test(q.text) || /リスニング|発音|アクセント/.test(u.name)) return false;
  if (new Set(q.choices.map(String)).size !== q.choices.length) return false;
  return q.level >= 1 && q.level <= 3;
}
const byUnit = {}; // unit -> level -> [q]
function add(u, q) {
  const L = ((byUnit[u.id] = byUnit[u.id] || {})[q.level] = byUnit[u.id][q.level] || []);
  if (L.length >= 4 || L.some(x => x[2] === q.text)) return;
  L.push([u.id, q.level, q.text, q.choices.map(String), q.exp || '']);
}
Object.values(WPS.Q_MAP).forEach(q => { const u = UM[q.unit]; if (u && courseOf(u) && ok(q, u)) add(u, q); });
Object.values(UM).forEach(u => {
  if (!u.hasGen || !courseOf(u)) return;
  for (let s = 1; s <= 60; s++) { const q = WPS.Q('g~' + u.id + '~' + s); if (q && ok(q, u)) add(u, q); }
});

/* 科目×難しさごとに、単元がかたよらないように最大 CAP 問 */
const out = [], units = {}, CAP = c => COURSE[c][2] === 'jh' ? 40 : 14;
const cu = {}; Object.keys(byUnit).forEach(id => { const c = courseOf(UM[id]); (cu[c] = cu[c] || []).push(id); });
Object.keys(cu).forEach(c => [1, 2, 3].forEach(lv => {
  const lists = cu[c].map(id => (byUnit[id][lv] || []).slice()); let n = 0;
  for (let r = 0; n < CAP(c) && lists.some(l => l.length); r++) lists.forEach(l => { if (n < CAP(c) && l.length) { out.push(l.shift()); n++; } });
}));
const row = u => [u.name, u.stage, u.subj, (u.prereq || []).filter(p => UM[p] && !/リスニング/.test(UM[p].name)), courseOf(u) || ''];
out.forEach(x => { units[x[0]] = row(UM[x[0]]); });
Object.values(units).forEach(u => u[3].forEach(p => { if (!units[p]) units[p] = row(UM[p]); }));

const used = new Set(out.map(x => units[x[0]][4]));
const course = {}; Object.keys(COURSE).forEach(k => { if (used.has(k)) course[k] = COURSE[k]; });
const col = {}, subj = {}; Object.keys(WPS.SUBJECTS).forEach(k => { col[k] = WPS.SUBJECTS[k].color; subj[k] = WPS.SUBJECTS[k].name; });
const js = '/* 無料診断テスト用の問題(学習アプリの問題から tools/build_shindan.js で自動で抜き出したもの。音声・図が必要な問題はのぞく) */\n' +
  'window.SHINDAN={col:' + JSON.stringify(col) + ',stages:' + JSON.stringify(S) + ',subj:' + JSON.stringify(subj) + ',course:' + JSON.stringify(course) +
  ',units:' + JSON.stringify(units) + ',q:' + JSON.stringify(out) + '};\n';
fs.writeFileSync(path.join(ROOT, 'js/data/shindan_q.js'), js);
const cnt = {}; out.forEach(x => { const c = units[x[0]][4]; cnt[c] = cnt[c] || [0, 0, 0]; cnt[c][x[1] - 1]++; });
console.log(out.length + '問', Math.round(js.length / 1024) + 'KB');
Object.keys(course).forEach(k => console.log(course[k][0].padEnd(8, '　'), cnt[k].join('/')));
