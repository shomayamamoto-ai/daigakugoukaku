/* 読み上げの声えらび(アプリ全体で共通)
 * ブラウザの読み上げ機能(Web Speech API)に入っている声の中から、
 * 機械っぽくない自然な声(ニューラル音声・高品質音声)を優先して、女性の声を選ぶ。
 * 声の種類は端末やブラウザによって違うので、名前から点数をつけていちばん良い声を使う。 */
window.WPS = window.WPS || {};
(function () {
  var ok = 'speechSynthesis' in window, list = [];
  function load() { try { list = speechSynthesis.getVoices() || []; } catch (e) { list = []; } }
  if (ok) {
    load();
    try { speechSynthesis.addEventListener('voiceschanged', load); } catch (e) { speechSynthesis.onvoiceschanged = load; }
  }
  // 自然に聞こえる声(ニューラル音声・高品質版)
  var NATURAL = /(natural|neural|online|enhanced|premium|拡張|高品質|siri)/i;
  // 女性の声として知られている名前
  var FEMALE = /女性|google 日本語|\b(female|samantha|ava|allison|susan|zoe|serena|karen|moira|tessa|fiona|victoria|kate|stephanie|nicky|aria|jenny|michelle|emma|ana|sonia|libby|natasha|clara|zira|hazel|google us english|google uk english female|kyoko|o-ren|nanami|aoi|mayu|shiori|haruka|ayumi|sayaka)\b/i;
  var MALE = /男性|\b(male|alex|daniel|fred|tom|aaron|arthur|oliver|david|guy|mark|ryan|christopher|eric|roger|steffan|brian|andrew|george|james|otoya|hattori|keita|ichiro|daichi|naoki)\b/i;
  // 機械っぽい声・おもしろ用の声(使わない)
  var ROBOT = /\b(compact|espeak|eloquence|albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley|fred)\b/i;
  function score(v, gender) {
    var n = v.name || '', s = 0;
    if (NATURAL.test(n)) s += 50;
    if (/google/i.test(n)) s += 20;              // Chrome のネット経由の声は比較的自然
    if (v.localService === false) s += 5;
    if (/desktop/i.test(n)) s -= 15;             // Windows の古い声は機械っぽい
    if (ROBOT.test(n)) s -= 80;
    var f = FEMALE.test(n) && !/\bmale\b/i.test(n.replace(/female/i, '')), m = MALE.test(n) && !/female/i.test(n);
    if (gender === 'male') s += m ? 40 : f ? -40 : 0;
    else s += f ? 40 : m ? -60 : 0;
    if (v.default) s += 2;
    return s;
  }
  // lang: 'ja' / 'en'、gender: 'female'(ふつう) / 'male'
  function pick(lang, gender) {
    if (!ok) return null;
    if (!list.length) load();
    var re = lang === 'ja' ? /^ja/i : /^en/i, pre = lang === 'ja' ? /^ja[-_]JP/i : /^en[-_]US/i;
    var same = list.filter(function (v) { return re.test(v.lang); });
    if (!same.length) return null;
    var best = null, bs = -1e9;
    same.forEach(function (v) { var s = score(v, gender || 'female') + (pre.test(v.lang) ? 3 : 0); if (s > bs) { bs = s; best = v; } });
    return best;
  }
  // 読み上げ用の発話を作る(声・言語・速さをそろえる)。pitch は変えない(高さをいじると不自然になる)
  function utter(text, lang, opt) {
    opt = opt || {};
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'ja' ? 'ja-JP' : 'en-US';
    var v = pick(lang, opt.gender); if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = opt.rate || 0.95; u.pitch = 1;
    return u;
  }
  WPS.Voice = { ok: ok, pick: pick, utter: utter, list: function () { if (!list.length) load(); return list; } };
})();
