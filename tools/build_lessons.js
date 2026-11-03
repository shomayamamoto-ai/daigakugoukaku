#!/usr/bin/env node
/*
 * テキスト本文を、単元ごとの小さなファイルに分ける。
 *  もと:js/data/lessons_*.js(書くときはこちらを編集する)
 *  できあがり:js/lessons/<単元ID>.js(アプリは、開いた単元のファイルだけを読み込む)
 * 使い方:node tools/build_lessons.js
 */
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..');
// 読み込む順番が大事(あとのファイルが前の単元に図や節を書き足すことがある)
var SRC = ['lessons_1', 'lessons_2', 'lessons_3', 'lessons_4', 'lessons_5', 'lessons_6', 'lessons_7', 'lessons_8', 'lessons_9', 'lessons_10',
  'lessons_new_hsogo', 'lessons_new_geo', 'lessons_new_rinri', 'lessons_new_phys', 'lessons_new_chem', 'lessons_new_bio', 'lessons_new_earth',
  'lessons_new_kyotsu', 'lessons_new_englis', 'lessons_new_life', 'lessons_new_jhlang', 'lessons_new_jhmss', 'lessons_new_jhist',
  'lessons_new_whista', 'lessons_new_whistb', 'lessons_new_civics', 'lessons_new_geob', 'lessons_zukai'];
// あとから足す「深掘り」のファイル(あれば読む)
fs.readdirSync(path.join(ROOT, 'js/data')).filter(function (f) { return /^lessons_more_.*\.js$/.test(f); }).sort().forEach(function (f) { SRC.push(f.replace(/\.js$/, '')); });
global.window = global; global.WPS = {};
SRC.forEach(function (f) { require(path.join(ROOT, 'js/data', f + '.js')); });
var OUT = path.join(ROOT, 'js/lessons');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
fs.readdirSync(OUT).forEach(function (f) { if (/\.js$/.test(f)) fs.unlinkSync(path.join(OUT, f)); });
var ids = Object.keys(WPS.LESSONS), total = 0;
ids.forEach(function (id) {
  if (!/^[A-Za-z0-9_]+$/.test(id)) throw new Error('bad id ' + id);
  var js = '(window.WPS=window.WPS||{}).LESSONS=WPS.LESSONS||{};WPS.LESSONS[' + JSON.stringify(id) + ']=' + JSON.stringify(WPS.LESSONS[id]) + ';\n';
  fs.writeFileSync(path.join(OUT, id + '.js'), js); total += js.length;
});
console.log('units', ids.length, 'files', SRC.length, 'total bytes', total, 'avg', Math.round(total / ids.length));
