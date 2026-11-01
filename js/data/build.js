/*
 * 単元データの組み立て
 *  ・units.js の問題に、units_extra.js の追加問題を合流させる
 *  ・すべての問題に ID を振る
 *  ・自動生成問題(generators.js)も WPS.Q(id) で同じように取り出せるようにする
 */
window.WPS = window.WPS || {};

WPS.QUESTIONS = [];
WPS.UNIT_MAP = {};
WPS.Q_MAP = {};

WPS.UNITS.forEach(function (u) {
  WPS.UNIT_MAP[u.id] = u;
  var all = u.qs.concat((WPS.EXTRA_QS && WPS.EXTRA_QS[u.id]) || []);
  u.questions = all.map(function (q, i) {
    var obj = {
      id: u.id + '-' + (i + 1), unit: u.id, subj: u.subj,
      level: q[0], text: q[1], choices: q[2], answer: q[2][0], exp: q[3]
    };
    WPS.QUESTIONS.push(obj);
    WPS.Q_MAP[obj.id] = obj;
    return obj;
  });
  u.hasGen = !!(WPS.GEN && WPS.GEN[u.id]);
});

// 自動生成問題の ID は「g~単元ID~種」
WPS.genId = function (unitId, seed) {
  if (seed === undefined) seed = Math.floor(Math.random() * 2147483647);
  return 'g~' + unitId + '~' + seed;
};
// 日付と番号から決まる種(同じ日なら同じ問題になる)
WPS.daySeed = function (unitId, dateStr, k) {
  var s = unitId + '|' + dateStr + '|' + k, h = 2166136261;
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

var GEN_CACHE = {};
WPS.Q = function (id) {
  if (!id) return null;
  if (WPS.Q_MAP[id]) return WPS.Q_MAP[id];
  if (GEN_CACHE[id]) return GEN_CACHE[id];
  if (id.indexOf('g~') !== 0) return null;
  var p = id.split('~');
  var u = WPS.UNIT_MAP[p[1]], g = WPS.GEN && WPS.GEN[p[1]];
  if (!u || !g) return null;
  try {
    var q = g(WPS.rng(+p[2]), +p[2]);
    if (Array.isArray(q)) q = { lv: q[0], text: q[1], choices: q[2], exp: q[3], why: {} };
    GEN_CACHE[id] = {
      id: id, unit: u.id, subj: u.subj, level: q.lv, text: q.text,
      choices: q.choices, answer: q.choices[0], exp: q.exp, why: q.why || {},
      say: q.say, pic: q.pic, pics: q.pics, fig: q.fig, sayChoices: q.sayChoices, generated: true
    };
    return GEN_CACHE[id];
  } catch (e) { return null; }
};
