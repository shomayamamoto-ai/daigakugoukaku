/*
 * ホームページなどに出している「数字」(単元数・単語数・一問一答の問題数など)を、
 * アプリのデータから数え直して書きかえる。単語を追加したら、このスクリプトを実行する。
 *   使い方: リポジトリのいちばん上で  node tools/update_stats.js
 */
global.window = global; global.WPS = {}; global.document = {};
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const m of html.matchAll(/<script (?:defer )?src="(js\/data\/[^"?]+)/g)) { try { require(path.join(ROOT, m[1])); } catch (e) { /* 画面用のファイルは飛ばす */ } }
require(path.join(ROOT, 'js/data/vocab_terms.js')); // 単語帳を開いたときだけ読み込むファイル

const books = WPS.VBOOKS.filter(b => b.done > 0);
const S = {
  units: Object.keys(WPS.UNIT_MAP).length,
  words: books.reduce((a, b) => a + b.done, 0),
  books: books.length,
  jhq: (WPS.JHQ || []).length,
  whq: (WPS.WHQ || []).length,
  ron: (WPS.RONJUTSU || []).length,
  iq: Object.keys(WPS.IQ || {}).reduce((a, k) => a + WPS.IQ[k].length, 0),
  iqn: Object.keys(WPS.IQ || {}).length
};
S.hq = S.jhq + S.whq + S.iq;
const fmt = n => n.toLocaleString('en-US');

// home.html:data-stat の付いた数字を書きかえる
let home = fs.readFileSync(path.join(ROOT, 'home.html'), 'utf8');
home = home.replace(/(data-stat="(\w+)">)[\d,]+(<)/g, (all, a, k, c) => S[k] === undefined ? all : a + fmt(S[k]) + c);
fs.writeFileSync(path.join(ROOT, 'home.html'), home);

// llms-full.txt / llms.txt(AI向けの説明)
let full = fs.readFileSync(path.join(ROOT, 'llms-full.txt'), 'utf8');
full = full.replace(/- [\d,]+単元すべてに/, '- ' + S.units + '単元すべてに')
  .replace(/- [\d,]+語 英単語・英熟語・古文の単語帳\(\d+冊\)/, '- ' + fmt(S.words) + '語 英単語・英熟語・古文の単語帳(' + S.books + '冊)')
  .replace(/- [\d,]+問(日本史・世界史|全教科)の一問一答/, '- ' + S.hq + '問全教科の一問一答')
  .replace(/- [\d,]+題(歴史|全教科)の論述/, '- ' + S.ron + '題全教科の論述')
  .replace(/全[\d,]+単元に/g, '全' + S.units + '単元に');
fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), full);
let lite = fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8');
lite = lite.replace(/全[\d,]+単元/g, '全' + S.units + '単元');
fs.writeFileSync(path.join(ROOT, 'llms.txt'), lite);

console.log(JSON.stringify(S));
console.log(books.map(b => b.name + ' ' + b.done).join(' / '));
