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
  var NATURAL = /(natural|neural|online|enhanced|premium|拡張|高品質|プレミアム|siri)/i;
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
  // この端末で選んだ声(声は端末ごとに違うので、端末に保存する)
  function saved(lang) { try { return localStorage.getItem('wpsVoice_' + lang) || ''; } catch (e) { return ''; } }
  function setSaved(lang, name) { try { if (name) localStorage.setItem('wpsVoice_' + lang, name); else localStorage.removeItem('wpsVoice_' + lang); } catch (e) { /* 保存できなくても動く */ } }
  function voices(lang) {
    if (!list.length) load();
    var re = lang === 'ja' ? /^ja/i : /^en/i;
    return list.filter(function (v) { return re.test(v.lang) && !ROBOT.test(v.name || ''); })
      .sort(function (a, b) { return score(b, 'female') - score(a, 'female'); });
  }
  // lang: 'ja' / 'en'、gender: 'female'(ふつう) / 'male'
  function pick(lang, gender) {
    if (!ok) return null;
    if (!list.length) load();
    var re = lang === 'ja' ? /^ja/i : /^en/i, pre = lang === 'ja' ? /^ja[-_]JP/i : /^en[-_]US/i;
    var same = list.filter(function (v) { return re.test(v.lang); });
    if (!same.length) return null;
    var sv = gender !== 'male' && saved(lang), hit = sv && same.filter(function (v) { return v.name === sv; })[0];
    if (hit) return hit;
    var best = null, bs = -1e9;
    same.forEach(function (v) { var s = score(v, gender || 'female') + (pre.test(v.lang) ? 3 : 0); if (s > bs) { bs = s; best = v; } });
    return best;
  }
  // 読み上げ用の発話を作る(声・言語・速さをそろえる)。pitch は変えない(高さをいじると不自然になる)
  // 読み上げる前に文を整える:読みがな〔 〕は読みを使い、記号は読まずに間(ま)にする
  function clean(text, lang) {
    var t = String(text || '');
    if (lang === 'ja') {
      t = t.replace(/[^\s〔〕()（）]+〔([^〕]+)〕/g, '$1')         // 漢字〔よみ〕 → よみ
        .replace(/[〜～~]/g, '').replace(/[／/|]/g, '、').replace(/[・]/g, '、')
        .replace(/[「」『』【】《》〈〉]/g, '').replace(/[()（）]/g, '、').replace(/[①-⑳]/g, '、')
        .replace(/→|⇒|[;；]/g, '、').replace(/=|＝/g, '、');
    } else {
      t = t.replace(/[〜～~]/g, '').replace(/\bsb\b/g, 'somebody').replace(/\bsth\b/g, 'something')
        .replace(/[\/|]/g, ', ').replace(/[()（）\[\]]/g, ', ');
    }
    return t.replace(/\s+([,、])/g, '$1').replace(/(、\s*){2,}/g, '、').replace(/(,\s*){2,}/g, ', ').replace(/^[、,\s]+|[、,\s]+$/g, '').replace(/\s{2,}/g, ' ');
  }
  function utter(text, lang, opt) {
    opt = opt || {};
    text = clean(text, lang);
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'ja' ? 'ja-JP' : 'en-US';
    var v = pick(lang, opt.gender); if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = opt.rate || 0.95; u.pitch = 1;
    return u;
  }
  // 試し聞き
  function preview(lang, name) {
    if (!ok) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(lang === 'ja' ? 'こんにちは。今日も一緒に、単語を覚えていきましょう。' : 'Hello. Let us learn some new words together today.');
      var v = list.filter(function (x) { return x.name === name; })[0] || pick(lang);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = lang === 'ja' ? 'ja-JP' : 'en-US';
      u.rate = 0.95; speechSynthesis.speak(u);
    } catch (e) { /* 読み上げできない端末 */ }
  }
  // 声の種類を、人が読める説明に(自然な声には印をつける)
  function label(v) { var n = v.name || ''; return n.replace(/\s*\(.*?\)\s*$/, '').replace(/^Microsoft\s+/, '').replace(/\s+-\s+.*$/, '') + (NATURAL.test(n) || /google/i.test(n) ? '(自然な声)' : ''); }
  WPS.Voice = { ok: ok, pick: pick, utter: utter, clean: clean, voices: voices, saved: saved, setSaved: setSaved, preview: preview, label: label, onChange: function (f) { try { speechSynthesis.addEventListener('voiceschanged', f); } catch (e) { /* 古い端末 */ } }, list: function () { if (!list.length) load(); return list; } };
})();
