#!/usr/bin/env node
/*
 * 単語のイラスト(img/vocab/<slug>.webp)の一覧を js/data/vocab_img.js に書き出す。
 * アプリは、この一覧にある語だけイラストを表示する。
 * 使い方:node tools/build_vimg.js
 */
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..'), DIR = path.join(ROOT, 'img/vocab');
var list = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(function (f) { return /^[a-z0-9-]+\.webp$/.test(f); }).map(function (f) { return f.slice(0, -5); }).sort() : [];
fs.writeFileSync(path.join(ROOT, 'js/data/vocab_img.js'), '/* 単語のイラストがある語の一覧(tools/build_vimg.js が作る) */\nwindow.WPS = window.WPS || {};\nWPS.VIMG = {};\n' + JSON.stringify(list) + '.forEach(function (s) { WPS.VIMG[s] = 1; });\n');
console.log('イラスト', list.length, '語');
