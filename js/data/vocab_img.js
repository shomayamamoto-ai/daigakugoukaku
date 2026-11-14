/* 単語のイラストがある語の一覧(tools/build_vimg.js が作る) */
window.WPS = window.WPS || {};
WPS.VIMG = {};
["hello","him","me","they"].forEach(function (s) { WPS.VIMG[s] = 1; });
