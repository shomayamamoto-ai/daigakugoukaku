/*
 * 追加の単語データ(vocab_*.js)を、もとの単語帳(WPS.BANK)に合流させる。
 * すでにある見出し語は追加しない(先に登録したヒントつきのデータを優先)。
 */
(function () {
  var M = WPS.MORE || {};
  Object.keys(M).forEach(function (key) {
    var bank = WPS.BANK[key] || (WPS.BANK[key] = []);
    var seen = {};
    bank.forEach(function (x) { seen[x.t.toLowerCase()] = true; });
    // 中学の単語と高校の単語が重ならないようにする(中学で覚える語は中学の単語帳へ)
    if (key === 'en_h' && WPS.BANK.en_m) WPS.BANK.en_m.forEach(function (x) { seen[x.t.toLowerCase()] = true; });
    WPS.parseBank(M[key]).forEach(function (x) {
      var k = x.t.toLowerCase();
      if (seen[k]) return;
      seen[k] = true;
      bank.push(x);
    });
  });
  delete WPS.MORE;
})();
