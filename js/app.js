/*
 * Aqualium 画面(UI)
 * ------------------------------------------------------------
 * 画面はURLの「#〇〇」で切り替えます(1ファイルで動くシンプルな構成)。
 *   #home     ホーム(今日のやる事・連続記録)
 *   #test     診断テスト
 *   #study/ID 単元の学習ページ
 *   #roadmap  志望校別ロードマップ
 *   #cards    単語帳(苦手問題集)
 *   #tutor    家庭教師用 指導分析レポート
 *   #memo     先生への質問メモ
 *   #settings 設定
 */
(function () {
  var S = WPS.Store, A = WPS.Analysis, R = WPS.Roadmap, D = WPS.date;
  var view, quiz = null, deck = null, lastResult = null;

  /* ---------- 共通ヘルパー ---------- */
  function h(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pct(x) { return x === null || x === undefined ? '—' : Math.round(x * 100) + '%'; }
  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = noEmoji(msg);
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  // ブラウザ標準の確認ダイアログが使えない環境(埋め込み表示など)でも動く、画面内のダイアログ
  var EMBED = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();
  function dialog(html, buttons) {
    var wrap = document.createElement('div');
    wrap.className = 'dlg-wrap';
    wrap.innerHTML = noEmoji('<div class="dlg" role="dialog" aria-modal="true">' + html + '<div class="btns dlg-btns"></div></div>');
    var box = wrap.querySelector('.dlg-btns');
    buttons.forEach(function (b) {
      var el = document.createElement('button');
      el.className = 'btn ' + (b.cls || '');
      el.textContent = b.label;
      el.addEventListener('click', function () { if (!b.keep) wrap.remove(); if (b.fn) b.fn(wrap); });
      box.appendChild(el);
    });
    document.body.appendChild(wrap);
    var last = box.querySelector('button:last-child');
    if (last) last.focus();
    return wrap;
  }
  function ask(msg, okLabel, fn) {
    dialog('<p>' + h(msg) + '</p>', [{ label: 'やめる' }, { label: okLabel || 'OK', cls: 'primary', fn: fn }]);
  }
  // コピー用の文字を見せる(コピーボタン付き)
  function showText(title, text, note) {
    dialog('<h2>' + h(title) + '</h2><textarea class="copy-box" id="copyBox" readonly rows="4">' + h(text) + '</textarea>' + (note ? '<p class="hint">' + h(note) + '</p>' : ''),
      [{ label: '閉じる' }, { label: 'コピーする', cls: 'primary', keep: true, fn: function (w) {
        var ta = w.querySelector('textarea');
        ta.select();
        var p = navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject();
        p.then(function () { toast('コピーしたよ！'); w.remove(); }, function () { ta.select(); toast('選択したので、長押し(右クリック)でコピーしてね'); });
      } }]);
    setTimeout(function () { var t = document.getElementById('copyBox'); if (t) t.select(); }, 50);
  }
  function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
  function subjChip(subj) {
    var sj = WPS.SUBJECTS[subj];
    return '<span class="chip" style="--c:' + sj.color + '">' + h(sj.name) + '</span>';
  }
  var STATUS = {
    weak: { label: '苦手', cls: 'st-weak' },
    soso: { label: 'あと少し', cls: 'st-soso' },
    good: { label: '得意', cls: 'st-good' },
    untested: { label: '未診断', cls: 'st-none' }
  };
  function statusChip(st) { var x = STATUS[st]; return '<span class="status ' + x.cls + '">' + x.label + '</span>'; }

  /* ---------- オリジナルキャラクター「ピンポ」 ----------
   * 弱点を「ピンポイント」でねらい撃つ、見習いスナイパーのフクロウ。
   * 目が的(まと)の形になっているのがチャームポイント。
   */
  // ピンポ(機械じかけのフクロウ)の絵。3Dモデル(owl3d.js)と同じデザインの、小さな表示用の SVG
  var PP_BODY = '<defs><pattern id="ppScale" width="8" height="6" patternUnits="userSpaceOnUse"><rect width="8" height="6" fill="#0f6b64"/><circle cx="4" cy="0" r="4" fill="#1f9a8e"/><circle cx="0" cy="3" r="4" fill="#23a597"/><circle cx="8" cy="3" r="4" fill="#23a597"/><circle cx="4" cy="6" r="4" fill="#1f9a8e"/></pattern><radialGradient id="ppShade" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient><linearGradient id="ppCopper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d27a45"/><stop offset=".5" stop-color="#a24a22"/><stop offset="1" stop-color="#5e2410"/></linearGradient><linearGradient id="ppGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d98a"/><stop offset=".5" stop-color="#d4a646"/><stop offset="1" stop-color="#8c6420"/></linearGradient><radialGradient id="ppFace" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#e3f4ef"/><stop offset="1" stop-color="#9fcfc3"/></radialGradient></defs><ellipse cx="60" cy="112" rx="34" ry="6" fill="#15171c"/><ellipse cx="60" cy="109" rx="30" ry="5" fill="url(#ppGold)"/><ellipse cx="60" cy="109" rx="18" ry="3" fill="#15171c"/><path d="M30 104 q30 -14 46 -2" stroke="#4a2a16" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M24 38 L28 10 L44 28 Z" fill="url(#ppScale)"/><path d="M96 38 L92 10 L76 28 Z" fill="url(#ppScale)"/><path d="M28 12 L32 30" stroke="url(#ppGold)" stroke-width="1.5"/><path d="M92 12 L88 30" stroke="url(#ppGold)" stroke-width="1.5"/><ellipse cx="60" cy="74" rx="38" ry="34" fill="url(#ppScale)"/><ellipse cx="60" cy="74" rx="38" ry="34" fill="url(#ppShade)"/><ellipse cx="22" cy="80" rx="9" ry="20" fill="url(#ppScale)" transform="rotate(12 22 80)"/><ellipse cx="98" cy="80" rx="9" ry="20" fill="url(#ppScale)" transform="rotate(-12 98 80)"/><ellipse cx="60" cy="84" rx="22" ry="20" fill="url(#ppCopper)"/><path d="M44 80 l32 0 M42 88 l36 0 M45 96 l30 0" stroke="#5e2410" stroke-width=".8" opacity=".6"/><circle cx="88" cy="88" r="5" fill="url(#ppGold)"/><circle cx="88" cy="88" r="2" fill="#15171c"/><ellipse cx="60" cy="47" rx="34" ry="27" fill="url(#ppScale)"/><ellipse cx="60" cy="47" rx="34" ry="27" fill="url(#ppShade)"/><path d="M28 60 q32 12 64 0" stroke="url(#ppGold)" stroke-width="2.5" fill="none"/><ellipse cx="60" cy="50" rx="27" ry="20" fill="url(#ppFace)"/>';
  var PP_EYES = '<circle cx="47" cy="49" r="11" fill="url(#ppGold)"/><circle cx="73" cy="49" r="11" fill="url(#ppGold)"/><circle cx="47" cy="49" r="8" fill="#e0782a"/><circle cx="73" cy="49" r="8" fill="#e0782a"/><circle cx="47" cy="49" r="5" fill="#050608"/><circle cx="73" cy="49" r="5" fill="#050608"/><circle cx="49" cy="46.5" r="1.6" fill="#fff"/><circle cx="75" cy="46.5" r="1.6" fill="#fff"/>';
  var PP_BEAK = '<path d="M56 58 L64 58 L60 67 Z" fill="#1d1f24"/><path d="M56 58 L64 58" stroke="url(#ppGold)" stroke-width="1.2"/>';
  function pinpo(size, mood) {
    mood = mood || 'normal';
    var eyes = PP_EYES;
    if (mood === 'happy') eyes = '<circle cx="47" cy="49" r="11" fill="url(#ppGold)"/><circle cx="73" cy="49" r="11" fill="url(#ppGold)"/><circle cx="47" cy="49" r="8.5" fill="#bfe0d6"/><circle cx="73" cy="49" r="8.5" fill="#bfe0d6"/><path d="M41 51 q6 -7 12 0 M67 51 q6 -7 12 0" stroke="#050608" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    if (mood === 'sad') eyes += '<path d="M36 36 q11 -4 20 3 M84 36 q-11 -4 -20 3" stroke="#0b3f3d" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    if (mood === 'think') eyes += '<path d="M37 34 l19 4 M83 34 l-19 4" stroke="#0b3f3d" stroke-width="2.4" stroke-linecap="round"/>';
    var extra = mood === 'cheer' ? '<g fill="url(#ppGold)"><path d="M104 22 l3 -8 l3 8 l8 2 l-6 5 l2 8 l-7 -4 l-7 4 l2 -8 l-6 -5z"/><circle cx="14" cy="24" r="2.5"/><circle cx="108" cy="46" r="2"/></g>' : '';
    return '<svg class="pinpo" viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">' + PP_BODY + eyes + PP_BEAK + extra + '</svg>';
  }
  // 3Dのピンポを置く(WebGL が使えない環境では SVG の絵)
  function owl3dSlot(id, mood) { return '<div class="owl-3d-slot owl-stage-bg" id="' + id + '" data-mood="' + (mood || 'normal') + '">' + pinpo(120, mood) + '</div>'; }
  function mountOwl(id, explode) { var el = document.getElementById(id); if (el && WPS.Owl3D) WPS.Owl3D.mount(el, { explode: explode, fallback: pinpo(120, el.getAttribute('data-mood')) }); }
  // 装飾の絵文字は表示しない(「AIっぽい」装飾を減らし、文字だけで伝わる画面にする)
  var EMOJI_RE;
  try { EMOJI_RE = new RegExp('(?:\\p{Extended_Pictographic}|[\\u{1F1E6}-\\u{1F1FF}])(?:\\uFE0F|\\u200D\\p{Extended_Pictographic}|[\\u{1F3FB}-\\u{1F3FF}])*\\uFE0F?[ 　]?', 'gu'); } catch (e) { EMOJI_RE = null; }
  function noEmoji(html) { return EMOJI_RE ? String(html).replace(EMOJI_RE, '') : html; }
  function say(text, mood, size) {
    return '<div class="say">' + pinpo(size || 64, mood) + '<div class="bubble">' + text + '</div></div>';
  }

  var LINES = {
    greet: ['今日もきてくれて、うれしいな！', 'いっしょに弱点をねらい撃ちしよう 🎯', '小さな一歩でも、ちゃんと前に進んでいるよ。', '昨日の自分より、ちょっとだけ前へ。それで十分だよ。'],
    correct: ['すごい！ その調子だよ ✨', 'ねらいどおり！ 🎯', '完璧！ 自信をもっていいよ。', 'ナイス！ ちゃんと身についてるね。'],
    wrong: ['大丈夫。本番じゃなくて、今ここで間違えられたのはラッキーだよ。', 'まちがいは「伸びしろ」の場所。いっしょに覚えよう！', 'おしい！ 解説を読めば、次はきっと解けるよ。'],
    unsure: ['「わからない」と言えるのは強さだよ。先生への質問メモに入れておいたね。'],
    dig: ['ちょっとだけ前の単元にさかのぼって、つまずきの原因を探してみるね 🔍'],
    done: ['おつかれさま！ よくがんばったね 🌸', '今日のきみ、かっこよかったよ！', 'コツコツ続けるきみは、もう立派なスナイパーだ 🎯']
  };

  /* ---------- 画面の切り替え ---------- */
  function render() {
    var hash = (location.hash || '#home').slice(1);
    var parts = hash.split('/');
    var route = parts[0] || 'home';
    // 共有リンクの閲覧中以外は、自分のデータに戻す
    if (['share', 'cloud', 'tutor', 'parent'].indexOf(route) < 0 && S.isView()) S.setView(null);
    var p = S.get().profile;
    if (!p.name && ['onboard', 'tutor', 'share', 'cloud', 'parent'].indexOf(route) < 0) { route = 'onboard'; }
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-r') === route || (route === 'cards' && a.getAttribute('data-r') === 'vocab'));
    });
    var fn = {
      home: renderHome, onboard: renderOnboard, test: renderTest, quiz: renderQuiz, result: renderResult,
      study: renderStudy, roadmap: renderRoadmap, cards: renderCards, tutor: renderTutor,
      memo: renderMemo, settings: renderSettings, share: renderShared, cloud: renderShared, records: renderRecords, parent: renderParent, univ: renderUniv, words: renderWords, exam: renderExam, timer: renderTimer, vocab: renderVocab, ronjutsu: renderRon, whq: renderWhq, jhq: renderJhq, search: renderSearch, mock: renderMock, map: renderMap
    }[route] || renderHome;
    var band = (route === 'cards' && deck) || route === 'quiz' || (route === 'vocab' && VT.inMode && VT.inMode()) || (route === 'ronjutsu' && RJ.inMode()) || (route === 'whq' && WQ.inMode()) || (route === 'jhq' && JQ.inMode()) || (route === 'mock' && MK.inMode()) ? '' : pageBand(route);
    view.innerHTML = noEmoji(band + fn(parts[1]));
    if (fn.after) fn.after(parts[1]);
    pageTools();
    window.scrollTo(0, 0);
  }

  // ページの見出し帯(ホームページと同じ、筆記体の英字＋日本語)
  var BANDS = {
    home: ['Home', 'ホーム'], test: ['Diagnosis', '診断・練習'], roadmap: ['Roadmap', 'ロードマップ'], cards: ['Flashcards', '単語帳'],
    words: ['Words', '単語・用語の一覧'], tutor: ['For Tutors', '先生用・保護者用レポート'], parent: ['For Parents', '保護者用レポート'],
    univ: ['Universities', '大学データ'], settings: ['Settings', '設定'], memo: ['Questions', '先生への質問メモ'], records: ['Records', 'テスト・模試の記録'],
    study: ['Study', '単元の学習'], result: ['Result', '診断の結果'], onboard: ['Welcome', 'はじめまして'], share: ['Report', '共有レポート'], cloud: ['Report', '共有レポート'], exam: ['Admissions', '入試のしくみ・日程'], timer: ['Focus Timer', 'ポモドーロタイマー'], vocab: ['Vocabulary', '単語トレーニング'], ronjutsu: ['Essay Practice', '論述カットイン(日本史・世界史)'], whq: ['World History', '世界史 一問一答'], jhq: ['Japanese History', '日本史 一問一答'], search: ['Search', 'アプリ内検索'], mock: ['Mock Exam', '模試モード'], map: ['Unit Map', '単元マップ']
  };
  function pageBand(route) {
    var b = BANDS[route];
    if (!b) return '';
    return '<header class="page-band"><p class="pb-en">' + b[0] + '</p><h1 class="pb-ja">' + b[1] + '</h1></header>';
  }

  /* ========== オンボーディング ========== */
  // 志望校の選択肢:グループ(MARCH など)+ 大学データにある大学を1校ずつ(偏差値の目安つき)
  function schoolOptions(selected, q, only) {
    q = (q || '').trim();
    var hit = function (s) { return !q || s.name.indexOf(q) >= 0 || (s.univ && s.univ.indexOf(q) >= 0); };
    var groups = { national: '国公立大学(グループ)', private: '私立大学(グループ)', high: '高校受験' };
    var none = only === 'national' ? '受けない(私立のみ)' : only === 'private' ? '受けない(国公立のみ)' : '';
    var html = '<option value="">' + (q ? '「' + h(q) + '」の検索結果から選んでください' : '選んでください') + '</option>' + (none && !q ? '<option value="none"' + (selected === 'none' ? ' selected' : '') + '>' + none + '</option>' : '');
    Object.keys(groups).forEach(function (k) {
      if (only && k !== only) return;
      var list = WPS.SCHOOLS.filter(function (s) { return s.kind === k && hit(s); });
      if (!list.length) return;
      html += '<optgroup label="' + groups[k] + '">' + list.map(function (s) {
        return '<option value="' + s.id + '"' + (s.id === selected ? ' selected' : '') + '>' + h(s.name) + '</option>';
      }).join('') + '</optgroup>';
    });
    var us = WPS.univSchools ? WPS.univSchools() : [];
    [['national', '国公立大学(1校ずつ・偏差値の高い順)'], ['private', '私立大学(1校ずつ・偏差値の高い順)']].forEach(function (g) {
      if (only && g[0] !== only) return;
      var list = us.filter(function (s) { return s.kind === g[0] && (hit(s) || s.id === selected); });
      if (!list.length) return;
      html += '<optgroup label="' + g[1] + '">' + list.map(function (s) {
        return '<option value="' + h(s.id) + '"' + (s.id === selected ? ' selected' : '') + '>' + h(s.name) + (s.hensaMax ? '(' + (s.bf ? 'BF〜' + s.hensaMax.toFixed(1) : s.hensaMin === s.hensaMax ? s.hensaMax.toFixed(1) : s.hensaMin.toFixed(1) + '〜' + s.hensaMax.toFixed(1)) + ')' : '') + '</option>';
      }).join('') + '</optgroup>';
    });
    return html;
  }
  function trackOptions(schoolId, selected) {
    var s = WPS.SCHOOL_MAP[schoolId];
    var tracks = s ? Object.keys(s.tracks) : ['文系', '理系'];
    return tracks.map(function (t) { return '<option' + (t === selected ? ' selected' : '') + '>' + t + '</option>'; }).join('');
  }
  function defaultExamDate(schoolId) {
    var s = WPS.SCHOOL_MAP[schoolId];
    if (!s) return '';
    return WPS.EXAM_DATES[s.exams[s.exams.length - 1]].date;
  }
  function usesKyotsu(schoolId) {
    var s = WPS.SCHOOL_MAP[schoolId];
    return !!(s && s.exams.indexOf('kyotsu') >= 0);
  }
  // 志望校:先に「国公立/私立/高校受験」を聞き、国公立と私立の第一志望をそれぞれ選ぶ
  function schoolKindOf(p) {
    if (p.schoolMain) return p.schoolMain;
    var s0 = WPS.SCHOOL_MAP[p.schoolId];
    return s0 ? s0.kind : (WPS.isJHStudent(p.grade) ? 'high' : 'national');
  }
  function schoolPicker(p) {
    var main = schoolKindOf(p), isHigh = main === 'high';
    var natId = p.schoolNat || (WPS.SCHOOL_MAP[p.schoolId] && WPS.SCHOOL_MAP[p.schoolId].kind === 'national' ? p.schoolId : '');
    var priId = p.schoolPri || (WPS.SCHOOL_MAP[p.schoolId] && WPS.SCHOOL_MAP[p.schoolId].kind === 'private' ? p.schoolId : '');
    var highId = WPS.SCHOOL_MAP[p.schoolId] && WPS.SCHOOL_MAP[p.schoolId].kind === 'high' ? p.schoolId : '';
    var both = !!(WPS.SCHOOL_MAP[natId] && WPS.SCHOOL_MAP[priId]);
    function block(kind, label, id, ph) {
      return '<div class="sp-block" data-spblock="' + kind + '"' + (isHigh ? ' hidden' : '') + '><b class="sp-label">' + label + '</b>' +
        '<input class="sp-q" data-spq="' + kind + '" type="search" maxlength="20" placeholder="' + ph + '" autocomplete="off" aria-label="' + label + 'をさがす">' +
        '<select name="school_' + kind + '" data-spsel="' + kind + '" aria-label="' + label + '">' + schoolOptions(id, '', kind) + '</select></div>';
    }
    return '<fieldset class="sp"><legend>志望校</legend>' +
      '<div class="seg" role="group" aria-label="受験の種類">' + [['univ', '大学受験'], ['high', '高校受験']].map(function (k) {
        var on = (k[0] === 'high') === isHigh;
        return '<button type="button" class="seg-btn' + (on ? ' on' : '') + '" data-sptype="' + k[0] + '" aria-pressed="' + on + '">' + k[1] + '</button>';
      }).join('') + '</div>' +
      '<input type="hidden" name="schoolMain" value="' + main + '">' +
      block('national', '国公立の第一志望', natId, '大学名で絞りこむ(例:岩手、北海道)') +
      block('private', '私立の第一志望', priId, '大学名で絞りこむ(例:法政、湘南)') +
      // 本命は、国公立と私立の両方を選んだときだけ聞く(片方だけなら、そちらが自動で本命になる)
      '<div class="sp-block sp-main" data-spblock="main"' + (isHigh || !both ? ' hidden' : '') + '><b class="sp-label">どちらが本命?</b><div class="seg" role="group" aria-label="本命">' +
      [['national', '国公立が本命'], ['private', '私立が本命']].map(function (k) {
        return '<button type="button" class="seg-btn' + (main === k[0] ? ' on' : '') + '" data-spmain="' + k[0] + '" aria-pressed="' + (main === k[0]) + '">' + k[1] + '</button>';
      }).join('') + '</div><small class="muted">本命の試験日をゴールにして、もう一方は併願として中間目標に入れます。</small></div>' +
      '<div class="sp-block" data-spblock="high"' + (isHigh ? '' : ' hidden') + '><b class="sp-label">志望校(高校受験)</b><select name="school_high" data-spsel="high">' + schoolOptions(highId, '', 'high') + '</select></div>' +
      '<p class="hint" id="spNote"></p>' +
      '<p class="hint">片方しか受けない場合は「受けない」のままで大丈夫です。まだ決まっていなければ空欄のままでも保存でき、あとから設定で変えられます。( )内は偏差値の目安(河合塾 2027年度入試難易予想を参考。BF=ボーダー・フリー)。</p></fieldset>';
  }
  function spValid(v) { return !!(v && v !== 'none' && WPS.SCHOOL_MAP[v]); }
  // 選ばれている学校から、本命を自動で決める
  function spResolve(f) {
    var mainEl = f.querySelector('[name=schoolMain]');
    if (mainEl.value === 'high') return 'high';
    var n = spValid(f.querySelector('[data-spsel=national]').value), pr = spValid(f.querySelector('[data-spsel=private]').value);
    if (n && !pr) mainEl.value = 'national';
    else if (pr && !n) mainEl.value = 'private';
    else if (!n && !pr) mainEl.value = mainEl.value === 'private' ? 'private' : 'national';
    var box = f.querySelector('[data-spblock=main]');
    if (box) {
      box.hidden = !(n && pr);
      box.querySelectorAll('[data-spmain]').forEach(function (x) { var on = x.getAttribute('data-spmain') === mainEl.value; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    }
    var note = f.querySelector('#spNote');
    if (note) {
      var sel = f.querySelector('[data-spsel="' + mainEl.value + '"]'), nm = sel && spValid(sel.value) ? WPS.SCHOOL_MAP[sel.value].name : '';
      note.textContent = nm ? '本命:' + nm + '(この学校の試験日をゴールにします)' : '';
    }
    return mainEl.value;
  }
  function pickedSchool(f) {
    var main = spResolve(f);
    var v = f.querySelector('[data-spsel="' + main + '"]').value;
    return spValid(v) ? v : '';
  }
  function profileForm(p, submitLabel) {
    return '<form id="profileForm" class="form">' +
      '<label>ニックネーム<input name="name" required maxlength="20" value="' + h(p.name) + '" placeholder="例:しょーま"></label>' +
      '<label>いまの学年<select name="grade">' +
      ['中1', '中2', '中3', '高1', '高2', '高3', '既卒'].map(function (g) { return '<option' + (g === p.grade ? ' selected' : '') + '>' + g + '</option>'; }).join('') +
      '</select></label>' +
      schoolPicker(p) +
      '<label>志望校名(学部など・自由入力)<input name="schoolName" maxlength="40" value="' + h(p.schoolName) + '" placeholder="例:〇〇大学 経済学部"></label>' +
      '<label>文系/理系(受験科目)<select name="track" id="trackSel">' + trackOptions(p.schoolId, p.track) + '</select></label>' +
      '<label id="kyotsuRow"' + (usesKyotsu(p.schoolId) ? '' : ' hidden') + '>共通テストの日(中間目標)<input type="date" name="kyotsuDate" id="kyotsuDate" value="' + h(p.kyotsuDate || WPS.EXAM_DATES.kyotsu.date) + '"></label>' +
      '<label>本番の日(最終目標:国公立は2次試験の日)<input type="date" name="examDate" id="examDate" value="' + h(p.examDate || defaultExamDate(p.schoolId)) + '"></label>' +
      '<p class="hint" id="examHint">志望校を選ぶと、目安の日付が入ります。正式な日程は必ず募集要項で確認してね。</p>' +
      timeSelect('minutesWeekday', '平日(学校がある日)の勉強時間', +p.minutesWeekday || +p.minutes || 60) +
      timeSelect('minutesHoliday', '休日(土日・祝日)の勉強時間', +p.minutesHoliday || +p.minutes || 120) +
      '<fieldset><legend>受験で使う教科(大学・学部によって違います)</legend><div class="check-grid">' + Object.keys(WPS.SUBJECTS).map(function (k) {
        var on = p.subjects ? p.subjects.indexOf(k) >= 0 : true;
        return '<label class="ck"><input type="checkbox" name="subjects" value="' + k + '"' + (on ? ' checked' : '') + '> ' + WPS.SUBJECTS[k].name + '</label>';
      }).join('') + '</div><p class="hint">チェックした教科だけで、診断テストとロードマップを作ります。</p></fieldset>' +
      '<button class="btn primary big" type="submit">' + submitLabel + '</button></form>';
  }
  function timeSelect(name, label, cur) {
    return '<label>' + label + '<select name="' + name + '">' + WPS.Time.OPTIONS.map(function (m) { return '<option value="' + m + '"' + (cur === m ? ' selected' : '') + '>' + WPS.Time.label(m) + '</option>'; }).join('') + '</select></label>';
  }
  function bindProfileForm(onDone) {
    var f = document.getElementById('profileForm');
    function onSchool() {
      var id = pickedSchool(f);
      document.getElementById('trackSel').innerHTML = noEmoji(trackOptions(id, document.getElementById('trackSel').value));
      var d = defaultExamDate(id);
      if (d) document.getElementById('examDate').value = d;
      document.getElementById('kyotsuRow').hidden = !(usesKyotsu(id) || usesKyotsu(f.querySelector('[data-spsel=national]').value));
      var s0 = WPS.SCHOOL_MAP[id];
      if (s0) document.getElementById('examHint').textContent = '目安:' + s0.exams.map(function (e) { return WPS.EXAM_DATES[e].label + ' ' + WPS.EXAM_DATES[e].date; }).join(' ／ ') + '。正式な日程は必ず募集要項で確認してね。';
    }
    f.querySelectorAll('[data-sptype]').forEach(function (b) {
      b.addEventListener('click', function () {
        var high = b.getAttribute('data-sptype') === 'high';
        f.querySelector('[name=schoolMain]').value = high ? 'high' : 'national';
        f.querySelectorAll('[data-sptype]').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
        f.querySelectorAll('[data-spblock]').forEach(function (x) { var kb = x.getAttribute('data-spblock'); x.hidden = high ? kb !== 'high' : kb === 'high'; });
        onSchool();
      });
    });
    f.querySelectorAll('[data-spmain]').forEach(function (b) {
      b.addEventListener('click', function () { f.querySelector('[name=schoolMain]').value = b.getAttribute('data-spmain'); onSchool(); });
    });
    spResolve(f);
    f.querySelectorAll('[data-spq]').forEach(function (q) {
      q.addEventListener('input', function () {
        var kind = q.getAttribute('data-spq'), sel = f.querySelector('[data-spsel="' + kind + '"]'), cur = sel.value;
        sel.innerHTML = schoolOptions(cur, q.value, kind);
        var opts = sel.querySelectorAll('option[value]:not([value=""]):not([value="none"])');
        // 候補が1つ、またはまだ何も選んでいないときは、いちばん上の候補を選ぶ
        if (opts.length && (opts.length === 1 || !spValid(cur)) && sel.value !== opts[0].value) sel.value = opts[0].value;
        onSchool();
      });
    });
    f.querySelectorAll('[data-spsel]').forEach(function (sel) { sel.addEventListener('change', onSchool); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(f);
      var p = S.get().profile;
      pickedSchool(f); fd = new FormData(f);
      ['name', 'grade', 'schoolName', 'track', 'examDate', 'kyotsuDate'].forEach(function (k) { p[k] = (fd.get(k) || '').trim(); });
      p.schoolMain = fd.get('schoolMain');
      p.schoolNat = fd.get('school_national') || '';
      p.schoolPri = fd.get('school_private') || '';
      p.schoolId = pickedSchool(f);
      // 志望校を変えたら、ちがう大学の「目標」と、そこから自動で入れた志望校名を外す
      if (p.goal && !goalMatches(p.goal, WPS.SCHOOL_MAP[p.schoolId])) {
        if (p.schoolName === p.goal.univ + ' ' + p.goal.dept) p.schoolName = '';
        p.goal = null;
      }
      p.minutesWeekday = +fd.get('minutesWeekday');
      p.minutesHoliday = +fd.get('minutesHoliday');
      p.minutes = Math.round(WPS.Time.weeklyMinutes(p) / 7);
      var subs = fd.getAll('subjects');
      p.subjects = subs.length && subs.length < Object.keys(WPS.SUBJECTS).length ? subs : null;
      S.save();
      onDone();
    });
  }
  function renderOnboard() {
    return '<section class="card hero">' + owl3dSlot('owlOnboard', 'cheer') +
      '<h1>はじめまして！ ぼくは<span class="brand">ピンポ</span></h1>' +
      '<p>きみの「本当の苦手」をピンポイントで見つけて、志望校までの近道をいっしょに作る、見習いスナイパーのフクロウだよ。<br>まずは、きみのことを教えてね。</p></section>' +
      '<section class="card">' + profileForm(S.get().profile, '登録して診断テストへ進む') + '</section>' +
      '<section class="card"><details><summary>別の端末で使っていたデータを引き継ぐ</summary>' +
      '<label>引き継ぎコード<input id="obTransfer" placeholder="前の端末の「設定 → 引き継ぎコード」"></label><button class="btn" id="obTransferBtn">引き継ぐ</button></details></section>';
  }
  renderOnboard.after = function () {
    mountOwl('owlOnboard', true);
    // ニックネームを入れるまでボタンを押せないようにする(押した後に何が起きるかも文言で示す)
    var nm = view.querySelector('#profileForm [name=name]'), sb = view.querySelector('#profileForm [type=submit]');
    if (nm && sb) {
      var msg = document.createElement('small'); msg.className = 'field-msg'; nm.insertAdjacentElement('afterend', msg);
      var chk = function (show) { var ok = !!nm.value.trim(); sb.disabled = !ok; msg.textContent = ok ? '' : (show ? 'ニックネームを入力してください' : ''); nm.classList.toggle('invalid', !ok && show); };
      nm.addEventListener('input', function () { chk(true); }); nm.addEventListener('blur', function () { chk(true); }); chk(false);
    }
    bindProfileForm(function () { toast('よろしくね！ まずは診断テストから始めよう'); go('#test'); });
    document.getElementById('obTransferBtn').addEventListener('click', function () {
      try {
        WPS.Sync.useTransferCode(document.getElementById('obTransfer').value).then(function () {
          toast('おかえり！ データを引き継いだよ'); go('#home');
        }, function (e) { toast('引き継げませんでした:' + e.message); });
      } catch (e) { toast('コードが正しくありません'); }
    });
  };

  // 中間目標(共通テストなど)と最終目標の日付を並べて表示
  function milestoneLine(t) {
    if (!t.milestones || t.milestones.length < 2) return '';
    return '<div class="milestones">' + t.milestones.map(function (m) {
      var d = D.diff(D.today(), m.date);
      return '<span class="ms' + (d < 0 ? ' past' : '') + '">' + h(m.label) + ' <b>' + (d < 0 ? '終了' : 'あと' + d + '日') + '</b></span>';
    }).join('') + '</div>';
  }

  /* ========== ホーム ========== */
  /* ========== 入試のしくみ・日程 ========== */
  function renderExam() {
    var E = WPS.EXAM_INFO, today = D.today();
    var apDone = {}; try { apDone = JSON.parse(localStorage.getItem('wps_apply_ck') || '{}'); } catch (e) { apDone = {}; }
    var md = function (d) { return (+d.slice(5, 7)) + '月' + (+d.slice(8)) + '日'; };
    var kd = WPS.EXAM_DATES.kyotsu.date;
    var html = '<section class="card focal"><span class="pb-en">Next</span><h2>共通テスト本試験まで あと ' + Math.max(0, D.diff(today, kd)) + '日</h2>' +
      '<p class="muted">2027年1月16日・17日 ／ 出願期間は2026年9月15日(10時)〜10月2日(17時)のWeb出願</p></section>' +
      '<nav class="toc card"><b>このページの内容</b><ol class="steps">' + [['sched', 'スケジュール'], ['types', '入試方式の比較'], ['subjects', '受験科目の目安'], ['advice', '方式ごとの対策'], ['interview', '面接・小論文'], ['faculty', '学部・学科の選び方'], ['apply', '出願チェックリスト'], ['fees', '検定料・傾向']].map(function (x) {
        return '<li><a href="#exam" data-jump="' + x[0] + '">' + x[1] + '</a></li>';
      }).join('') + '</ol></nav>';
    // ロードマップ型のスケジュール(9月〜3月)
    var months = ['2026-09', '2026-10', '2026-11', '2026-12', '2027-01', '2027-02', '2027-03'];
    var pos = function (d) { var i = months.indexOf(d.slice(0, 7)); return i < 0 ? null : (i + (+d.slice(8) - 1) / 31) / months.length * 100; };
    var nowPos = pos(today);
    html += '<section class="card" id="sched"><h2>2027年度入試のスケジュール</h2><div class="gantt">' +
      '<div class="g-row g-head"><span></span><div class="g-track">' + months.map(function (m) { return '<i>' + (+m.slice(5)) + '月</i>'; }).join('') + '</div></div>' +
      E.schedule.map(function (r) {
        return '<div class="g-row"><span class="g-name">' + h(r.name) + '</span><div class="g-track">' + (nowPos !== null ? '<b class="g-now" style="left:' + nowPos.toFixed(1) + '%"></b>' : '') +
          r.items.map(function (it) { var x = pos(it[1]); return x === null ? '' : '<em style="left:' + x.toFixed(1) + '%" title="' + h(it[0]) + '"></em>'; }).join('') + '</div></div>';
      }).join('') + '</div><p class="hint">点が各日程の始まり、縦線が今日です。</p>' +
      E.schedule.map(function (r) {
        return '<h3>' + h(r.name) + '</h3><ul class="bullets">' + r.items.map(function (it) {
          var when = /^\d{1,2}月/.test(it[2]) ? it[2] : it[1].slice(0, 4) + '年' + md(it[1]) + it[2];
          return '<li><b>' + h(it[0]) + '</b>:' + h(when) + '</li>';
        }).join('') + '</ul>' + (r.note ? '<p class="hint">' + h(r.note) + '</p>' : '');
      }).join('') + '</section>';
    // 入試方式の比較
    html += '<section class="card" id="types"><h2>入試方式の比較</h2><div class="table-scroll"><table class="grid cmp"><thead><tr><th>方式</th><th>特徴</th><th>共通テスト</th><th>選考方法</th><th>個別試験の時期</th></tr></thead><tbody>' +
      E.types.map(function (t) { return '<tr><th>' + h(t.name) + '</th><td>' + h(t.feature) + '</td><td>' + h(t.kyotsu) + '</td><td>' + h(t.method) + '</td><td>' + h(t.when) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' + E.details.map(function (d) { return '<details class="guide-mini"><summary>' + h(d.name) + 'のくわしい特徴</summary><ul class="bullets">' + d.points.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></details>'; }).join('') + '</section>';
    // 受験科目の目安
    var ES = WPS.EXAM_SUBJECTS;
    if (ES) {
      html += '<section class="card" id="subjects"><h2>一般選抜の受験科目の目安</h2>' +
        '<div class="table-scroll"><table class="grid cmp"><thead><tr><th>入試方式</th><th>試験の時期</th></tr></thead><tbody>' + ES.periods.map(function (x) { return '<tr><th>' + h(x[0]) + '</th><td>' + h(x[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
        ES.groups.map(function (g) {
          return '<h3>' + h(g.name) + '</h3>' + (g.kyotsu.length ? '<b class="small">共通テスト(6教科8科目の例)</b><ul class="bullets">' + g.kyotsu.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            '<p class="small"><b>' + (g.kyotsu.length ? '個別試験(2次)' : '受験科目') + '</b>:' + h(g.indiv) + '</p>';
        }).join('') + '<ul class="bullets">' + ES.notes.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' +
        '<p class="hint">科目の組み合わせは大学・学部・方式で違います。必ず志望校の募集要項で確認してください。</p></section>';
    }
    // 対策
    html += '<section class="card" id="advice"><h2>方式ごとの対策</h2>' + E.advice.map(function (a) {
      return '<h3>' + h(a.name) + '</h3><ol class="steps">' + a.steps.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ol>';
    }).join('') + '</section>';
    // 面接・小論文
    var I = E.interview;
    html += '<section class="card" id="interview"><h2>面接・小論文の対策</h2><h3>どんな入試で課されるか</h3><ul class="bullets">' + I.when.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' +
      '<h3>面接の準備</h3><ol class="steps">' + I.mensetsu.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ol>' +
      (WPS.INTERVIEW_MANNER ? (function (M) {
        return '<h3>面接のマナー(入室から退室まで)</h3>' + M.flow.map(function (f, i) {
          return '<details class="guide-mini"' + (i === 0 ? ' open' : '') + '><summary>' + (i + 1) + '. ' + h(f.name) + '</summary><ul class="bullets">' + f.steps.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></details>';
        }).join('') +
        '<h3>面接での話し方・ふるまい</h3>' + M.tips.map(function (f) {
          return '<details class="guide-mini"><summary>' + h(f.name) + '</summary><ul class="bullets">' + f.steps.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></details>';
        }).join('') +
        '<h3>服装・身だしなみチェック</h3>' + M.dress.map(function (g, gi) {
          return '<b>' + h(g.name) + '</b><ul class="checklist">' + g.items.map(function (it, ii) {
            var k = 'd' + gi + '-' + ii;
            return '<li><label><input type="checkbox" data-apck="' + k + '"' + (apDone[k] ? ' checked' : '') + '> <span>' + h(it) + '</span></label></li>';
          }).join('') + '</ul>';
        }).join('') + '<p class="hint">本番の3日前までにすべてそろえ、前日と当日の朝にもう一度確認しましょう。</p>' +
        '<div class="table-scroll"><table class="grid cmp"><thead><tr><th>おじぎ</th><th>使う場面</th></tr></thead><tbody>' + M.bow.map(function (b) { return '<tr><th>' + h(b[0]) + '</th><td>' + h(b[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
        '<div class="table-scroll"><table class="grid cmp"><thead><tr><th>避けたい言い方</th><th>言いかえ</th></tr></thead><tbody>' + M.words.map(function (b) { return '<tr><td>' + h(b[0]) + '</td><td>' + h(b[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
        '';
      })(WPS.INTERVIEW_MANNER) : '') +
      '<h3>小論文の書き方</h3><ol class="steps">' + I.shoronbun.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ol>' +
      '<div class="guide-ng"><b>よくある失敗</b><ul class="bullets">' + I.ng.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></div>' +
      '<p class="hint">面接の形式や会場のルールは大学によって違います。当日は係の人や面接官の指示を優先しましょう。</p></section>';
    // 学部・学科の選び方
    var F = WPS.FACULTY_GUIDE;
    if (F) {
      html += '<section class="card" id="faculty"><h2>学部・学科の選び方</h2><ol class="steps">' + F.howTo.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ol>' +
        '<h3>学部の5つの系統</h3><div class="table-scroll"><table class="grid cmp"><tbody>' + F.systems.map(function (x) { return '<tr><th>' + h(x[0]) + '</th><td>' + h(x[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
        '<h3>分野と主な学部・学科</h3><div class="table-scroll"><table class="grid cmp"><tbody>' + F.fields.map(function (x) { return '<tr><th>' + h(x[0]) + '</th><td>' + h(x[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
        '<h3>学部・学科で学ぶこと(要約)</h3><div class="table-scroll"><table class="grid cmp"><thead><tr><th>学部・学科</th><th>学ぶこと</th><th>関係する主な資格・進路</th></tr></thead><tbody>' + F.details.map(function (d) {
          return '<tr><th>' + h(d[0]) + '</th><td>' + h(d[1]) + '</td><td>' + h(d[2]) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<p class="hint">くわしい内容は、各大学の公式サイトやパンフレット、オープンキャンパスで確認しましょう。</p></section>';
    }
    // 出願チェックリスト(チェックはこの端末に保存)
    var AC = WPS.APPLY_CHECK;
    if (AC) {
      var done = {}; try { done = JSON.parse(localStorage.getItem('wps_apply_ck') || '{}'); } catch (e) { done = {}; }
      var total = 0, cnt = 0;
      var body = AC.groups.map(function (g, gi) {
        return '<h3>' + h(g.name) + '</h3><ul class="checklist">' + g.items.map(function (it, ii) {
          var k = gi + '-' + ii; total++; if (done[k]) cnt++;
          return '<li><label><input type="checkbox" data-apck="' + k + '"' + (done[k] ? ' checked' : '') + '> <span>' + h(it) + '</span></label></li>';
        }).join('') + '</ul>';
      }).join('');
      html += '<section class="card" id="apply"><div class="row-between"><h2>出願(願書)チェックリスト</h2><span class="time-pill" id="apCount">' + cnt + ' / ' + total + '</span></div>' + body +
        '<p class="hint">細かいルールは大学によって違うので、必ず募集要項に従ってください。チェックはこの端末に保存されます。</p></section>';
    }
    // 検定料
    html += '<section class="card" id="fees"><h2>検定料(受験料)の目安</h2><div class="table-scroll"><table class="grid cmp"><thead><tr><th>試験</th><th>金額</th><th>補足</th></tr></thead><tbody>' +
      E.fees.map(function (f) { return '<tr><th>' + h(f[0]) + '</th><td class="num">' + h(f[1]) + '</td><td>' + h(f[2]) + '</td></tr>'; }).join('') + '</tbody></table></div></section>';
    // 傾向・共テとセンターの違い
    html += '<section class="card"><h2>最近の傾向</h2><ul class="bullets">' + E.trends.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' +
      '<h3>共通テストとセンター試験の違い</h3><ul class="bullets">' + E.kyotsuVsCenter.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' +
      '<p class="hint">' + h(E.source) + '。年度ごとに変わるので、必ず大学入試センター・各大学の最新の発表で確認してください。</p></section>';
    return html;
  }
  renderExam.after = function () {
    view.querySelectorAll('[data-jump]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); var t = document.getElementById(a.getAttribute('data-jump')); if (t) window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - 70); });
    });
    view.querySelectorAll('[data-apck]').forEach(function (c) {
      c.addEventListener('change', function () {
        var d = {}; try { d = JSON.parse(localStorage.getItem('wps_apply_ck') || '{}'); } catch (e) { d = {}; }
        if (c.checked) d[c.getAttribute('data-apck')] = 1; else delete d[c.getAttribute('data-apck')];
        try { localStorage.setItem('wps_apply_ck', JSON.stringify(d)); } catch (e) { /* 保存できない環境でも動く */ }
        var n = view.querySelectorAll('#apply [data-apck]:checked').length, t = view.querySelectorAll('#apply [data-apck]').length;
        document.getElementById('apCount').textContent = n + ' / ' + t;
      });
    });
  };
  /* ========== 学習ダッシュボード(KPI・推移・内訳・ランキング) ========== */
  // 数字は「直近7日」と「その前の7日」を比べて、増減を出す
  function dashData(s, stats) {
    var at = s.attempts.filter(function (a) { return a.src !== 'oral'; });
    var days = [];
    for (var i = 13; i >= 0; i--) days.push(D.add(D.today(), -i));
    var by = {}; days.forEach(function (d) { by[d] = { n: 0, c: 0 }; });
    at.forEach(function (a) { if (by[a.d]) { by[a.d].n++; if (a.ok) by[a.d].c++; } });
    function sum(list) { var r = { n: 0, c: 0 }; list.forEach(function (d) { r.n += by[d].n; r.c += by[d].c; }); return r; }
    var cur = sum(days.slice(7)), prev = sum(days.slice(0, 7));
    var st = { good: 0, soso: 0, weak: 0, untested: 0 };
    Object.keys(stats).forEach(function (id) { st[stats[id].status]++; });
    var weakRank = Object.keys(stats).filter(function (id) { return stats[id].n >= 2 && stats[id].status !== 'good'; })
      .sort(function (a, b) { return stats[a].acc - stats[b].acc; }).slice(0, 5);
    return { days: days, by: by, cur: cur, prev: prev, st: st, weakRank: weakRank };
  }
  function kpiTile(label, val, unit, delta, deltaUnit, spark, focal) {
    var dl = delta === undefined ? '' : delta === null ? '<span class="kpi-d">前の7日の記録なし</span>'
      : '<span class="kpi-d ' + (delta > 0 ? 'up' : delta < 0 ? 'down' : '') + '">' + (delta > 0 ? '▲ +' : delta < 0 ? '▼ ' : '± ') + delta + deltaUnit + '<small> 前の7日比</small></span>';
    return '<div class="kpi' + (focal ? ' focal' : '') + '"><span class="kpi-l">' + label + '</span><b class="kpi-v">' + val + '<small>' + unit + '</small></b>' + dl + (spark || '') + '</div>';
  }
  function sparkline(vals) {
    var max = Math.max.apply(null, vals.concat([1])), w = 120, hh = 28;
    var pts = vals.map(function (v, i) { return (i * w / (vals.length - 1)).toFixed(1) + ',' + (hh - 2 - v / max * (hh - 6)).toFixed(1); });
    return '<svg class="spark" viewBox="0 0 ' + w + ' ' + hh + '" preserveAspectRatio="none" aria-hidden="true"><polyline points="' + pts.join(' ') + '"/></svg>';
  }
  function dashboard(s, stats, opt) {
    opt = opt || {};
    var d = dashData(s, stats);
    var accCur = d.cur.n ? Math.round(d.cur.c / d.cur.n * 100) : null, accPrev = d.prev.n ? Math.round(d.prev.c / d.prev.n * 100) : null;
    var md = function (dd) { return (+dd.slice(5, 7)) + '/' + (+dd.slice(8)); };
    var html = '<section class="card dash"><div class="row-between"><h2>' + (opt.title || '学習ダッシュボード') + '</h2><span class="muted">直近14日</span></div>';
    // 結論(フォーカルポイント):いちばん大きいタイル
    html += '<div class="kpis">' +
      kpiTile('正答率(直近7日)', accCur === null ? '—' : accCur, accCur === null ? '' : '%', accCur !== null && accPrev !== null ? accCur - accPrev : null, 'pt', sparkline(d.days.slice(7).map(function (x) { return d.by[x].n ? d.by[x].c / d.by[x].n : 0; })), true) +
      kpiTile('解いた問題(直近7日)', d.cur.n, '問', d.prev.n ? d.cur.n - d.prev.n : null, '問', sparkline(d.days.slice(7).map(function (x) { return d.by[x].n; }))) +
      kpiTile('得意になった単元', d.st.good, '単元', undefined, '', '') +
      kpiTile('苦手の単元', d.st.weak, '単元', undefined, '', '') + '</div>';
    // 日別の解答数(棒)
    var maxN = Math.max.apply(null, d.days.map(function (x) { return d.by[x].n; }).concat([5]));
    var W = 320, H = 120, bw = W / 14;
    html += '<div class="dchart"><h3>日別の解答数</h3><svg viewBox="0 0 ' + W + ' ' + (H + 18) + '" class="dbars" role="img" aria-label="直近14日の日別の解答数">' +
      '<line class="ax" x1="0" y1="' + H + '" x2="' + W + '" y2="' + H + '"/>' +
      d.days.map(function (x, i) {
        var v = d.by[x].n, bh = v / maxN * (H - 14);
        return '<g><title>' + md(x) + ':' + v + '問(正解 ' + d.by[x].c + '問)</title><rect class="hit" x="' + (i * bw) + '" y="0" width="' + bw + '" height="' + H + '"/>' +
          (v ? '<rect class="bar' + (i >= 7 ? ' cur' : '') + '" x="' + (i * bw + 3).toFixed(1) + '" y="' + (H - bh).toFixed(1) + '" width="' + (bw - 6).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3"/>' : '') +
          (i % 2 === 1 ? '<text x="' + (i * bw + bw / 2).toFixed(1) + '" y="' + (H + 13) + '" text-anchor="middle">' + md(x) + '</text>' : '') + '</g>';
      }).join('') + '</svg><p class="hint">濃い棒が直近7日。棒にカーソルを合わせる(長押し)と、その日の問題数が出ます。</p></div>';
    // 正答率の推移(線)
    var pts = d.days.map(function (x, i) { var b = d.by[x]; return b.n ? { x: i * W / 13, y: H - (b.c / b.n) * (H - 10) - 2, v: Math.round(b.c / b.n * 100), d: x, n: b.n } : null; }).filter(Boolean);
    html += '<div class="dchart"><h3>正答率の推移</h3><svg viewBox="-4 0 ' + (W + 8) + ' ' + (H + 18) + '" class="dline" role="img" aria-label="直近14日の正答率の推移">' +
      [0, 50, 100].map(function (g) { var y = H - g / 100 * (H - 10) - 2; return '<line class="grid" x1="0" x2="' + W + '" y1="' + y + '" y2="' + y + '"/><text class="gl" x="0" y="' + (y - 3) + '">' + g + '%</text>'; }).join('') +
      '<line class="target" x1="0" x2="' + W + '" y1="' + (H - 0.8 * (H - 10) - 2) + '" y2="' + (H - 0.8 * (H - 10) - 2) + '"/><text class="gl tg" x="' + W + '" y="' + (H - 0.8 * (H - 10) - 5) + '" text-anchor="end">目標 80%</text>' +
      (pts.length > 1 ? '<polyline points="' + pts.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ') + '"/>' : '') +
      pts.map(function (p) { return '<g><title>' + md(p.d) + ':正答率 ' + p.v + '%(' + p.n + '問)</title><circle class="hit" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="10"/><circle class="dot" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="4"/></g>'; }).join('') +
      (pts.length ? '<text class="lbl" x="' + Math.min(W - 4, pts[pts.length - 1].x).toFixed(1) + '" y="' + (pts[pts.length - 1].y - 9).toFixed(1) + '" text-anchor="end">' + pts[pts.length - 1].v + '%</text>' : '') +
      '</svg>' + (pts.length ? '' : '<p class="muted">まだ記録がありません。</p>') + '</div>';
    // 単元の状態の内訳(ドーナツ)
    var parts = [['good', '得意', 'var(--ok)'], ['soso', 'あと少し', '#c27803'], ['weak', '苦手', 'var(--ng)'], ['untested', '未診断', 'var(--line)']];
    var tot = parts.reduce(function (a, p) { return a + d.st[p[0]]; }, 0) || 1, acc = 0, R0 = 42, C = 2 * Math.PI * R0;
    html += '<div class="dchart donut-row"><div><h3>単元の状態の内訳</h3><svg viewBox="0 0 110 110" class="donut" role="img" aria-label="単元の状態の内訳">' +
      parts.map(function (p) {
        var v = d.st[p[0]], len = v / tot * C, seg = '<circle r="' + R0 + '" cx="55" cy="55" stroke="' + p[2] + '" stroke-dasharray="' + Math.max(0, len - 2).toFixed(2) + ' ' + C.toFixed(2) + '" stroke-dashoffset="' + (-acc).toFixed(2) + '"><title>' + p[1] + ' ' + v + '単元</title></circle>';
        acc += len; return v ? seg : '';
      }).join('') + '<text x="55" y="53" text-anchor="middle" class="dn-v">' + Math.round(d.st.good / tot * 100) + '%</text><text x="55" y="68" text-anchor="middle" class="dn-l">得意の割合</text></svg></div>' +
      '<ul class="legend">' + parts.map(function (p) { return '<li><i style="background:' + p[2] + '"></i>' + p[1] + '<b>' + d.st[p[0]] + '</b></li>'; }).join('') + '</ul></div>';
    // 苦手単元ランキング(横棒)
    if (d.weakRank.length) {
      html += '<div class="dchart"><h3>正答率が低い単元(優先して復習)</h3><ol class="rank">' + d.weakRank.map(function (id) {
        var u = WPS.UNIT_MAP[id], v = Math.round(stats[id].acc * 100);
        return '<li><a href="#study/' + id + '"><span class="rk-n">' + h(u.name) + '<small>' + h(WPS.SUBJECTS[u.subj].name) + '・' + u.stage + '</small></span><span class="rk-bar"><i style="width:' + Math.max(2, v) + '%"></i></span><b>' + v + '%</b></a></li>';
      }).join('') + '</ol></div>';
    }
    return html + '</section>';
  }
  function renderHome() {
    var s = S.get(), p = s.profile;
    var rm = R.build();
    var tt = R.todayTasks(rm);
    vocabTasks(rm).forEach(function (x) { tt.tasks.push(x); });
    var streak = WPS.Streak.count();
    var studied = WPS.Streak.studiedToday();
    var left = Math.ceil(WPS.Streak.hoursLeft());
    var now = new Date();
    var remindMin = (+p.reminder.split(':')[0]) * 60 + (+p.reminder.split(':')[1] || 0);
    var html = '';

    // 連続記録のピンチ
    if (!studied && streak > 0 && now.getHours() * 60 + now.getMinutes() >= remindMin) {
      html += '<section class="alert">' + pinpo(48, 'sad') + '<div><b>あと' + left + '時間で、' + streak + '日連続の記録が切れちゃう…！</b><br>単語帳を1分開くだけでも記録はつながるよ。</div>' +
        '<a class="btn primary" href="#cards">1分だけやる</a></section>';
    }
    if (s.lastFreezeUsed && s.lastFreezeUsed === D.add(D.today(), -1) && !s.freezeNoticeShown) {
      s.freezeNoticeShown = true; S.save();
      html += '<section class="info">🧊 昨日はおやすみチケットを使って、記録を守っておいたよ。今日からまたいっしょにがんばろう！</section>';
    }
    if (s.justGranted) {
      s.justGranted = false; S.save();
      html += '<section class="info">🎁 7日連続達成のごほうびに「おやすみチケット」をプレゼント！ 1日休んでも記録が守られるよ。</section>';
    }

    var greet = studied ? pick(['今日もちゃんと進めたね！ えらい！', 'いい調子！ 今日のきみは一歩前進したよ 🌱']) : pick(LINES.greet);
    html += nextAction(tt);
    html += timeRing(tt);
    html += '<section class="card owl-card">' + owl3dSlot('owlHome', studied ? 'happy' : 'normal') + '<div class="bubble owl-bubble"><b>' + h(p.name) + 'さん</b>、' + greet + '<small>ピンポはドラッグで回せるよ。タップすると分解するよ。</small></div></section>';

    // 診断がまだの場合
    if (!s.attempts.some(function (a) { return a.src === 'test'; })) {
      html += '<section class="card cta">' + say('スタート地点を選ぼう！', 'cheer', 56) +
        '<div class="sp-choices"><a class="sp-choice rec" href="#test"><span class="sp-badge">おすすめ</span><b>ぴったりのレベルを見つける</b><small>診断テスト(10分くらい)で苦手を見つけて、きみに合ったところから始めるよ。中学の内容までさかのぼって調べるから安心してね。</small></a>' +
        '<button type="button" class="sp-choice" id="startBasic"><b>基礎からはじめる</b><small>いちばんやさしい「基礎」レベルの問題を10問。まずは手を動かしたい人向け。</small></button></div></section>';
    }

    // 連続記録
    var wk = WPS.Streak.week();
    html += '<section class="card streak"><div class="streak-main"><div class="flame ' + (studied ? 'on' : '') + '">🔥</div>' +
      '<div><div class="big-num">' + streak + '<small>日連続</small></div><div class="muted">最高記録 ' + WPS.Streak.best() + '日 ／ おやすみチケット ' + (s.freezes ? '🧊'.repeat(s.freezes) : 'なし') + '</div></div></div>' +
      '<div class="week">' + wk.map(function (d) {
        return '<div class="day ' + (d.state || '') + (d.d === D.today() ? ' today' : '') + '"><span>' + d.label + '</span><i>' + (d.state === 'study' ? '✓' : d.state === 'frozen' ? '🧊' : '') + '</i></div>';
      }).join('') + '</div></section>';
    html += WPS.Quest.card(h);

    if (s.attempts.length) html += dashboard(s, rm.stats);
    html += levelCard();
    // カウントダウン
    var t = rm.target;
    var phase = tt.week ? WPS.PHASES.filter(function (x) { return x.key === tt.week.phase; })[0] : null;
    html += '<section class="card countdown"><div><div class="muted">' + h(t.school ? t.school.name : '志望校未設定') + (p.schoolName ? '<br>' + h(p.schoolName) : '') + '</div>' +
      '<div class="big-num">あと ' + Math.max(0, D.diff(D.today(), t.exam)) + '<small>日</small></div><div class="muted">' + h(t.exam) + '</div>' + milestoneLine(t) + '</div>' +
      (phase ? '<div class="phase-badge">' + phase.emoji + ' いまは<br><b>' + phase.name + '</b></div>' : '') + '</section>';
    html += goalCard(p);

    // 今日のやる事
    var doneN = tt.tasks.filter(function (x) { return x.done; }).length;
    html += '<section class="card"><div class="row-between"><h2>今日のやる事</h2><span class="time-pill">' + (tt.holiday ? '🌞 休日' : '🏫 平日') + ' の目安 ' + WPS.Time.label(tt.minutesToday) + '</span></div><div class="row-between"><span class="muted">' + doneN + '/' + tt.tasks.length + ' 完了</span></div>' +
      '<div class="progress"><i style="width:' + Math.round(doneN / tt.tasks.length * 100) + '%"></i></div><ul class="tasks">' +
      tt.tasks.map(function (x) {
        var check = x.kind === 'manual'
          ? '<button class="check' + (x.done ? ' on' : '') + '" data-task="' + x.key + '" aria-label="完了にする">' + (x.done ? '✓' : '') + '</button>'
          : '<span class="check auto' + (x.done ? ' on' : '') + '">' + (x.done ? '✓' : '') + '</span>';
        return '<li class="' + (x.done ? 'done' : '') + '">' + check + '<div class="task-body"><b>' + x.icon + ' ' + h(x.title) + '</b><small>' + h(x.sub) + '</small></div>' +
          (x.progress ? '<span class="prog">' + x.progress + '</span>' : '') +
          (x.action ? '<a class="btn small" href="' + x.action + '">やる</a>' : '') + '</li>';
      }).join('') + '</ul>' +
      (doneN === tt.tasks.length ? say(pick(LINES.done), 'cheer', 48) : '') + '</section>';

    var wl = wrongList();
    if (wl.length) html += '<section class="card retry"><div class="row-between"><div><h2>間違い直し</h2><p class="muted small">まだ正解できていない問題が ' + wl.length + ' 問あります。解けるようになるまで、ここに残ります。</p></div><button class="btn primary" id="retryWrong">' + Math.min(10, wl.length) + '問 解き直す</button></div></section>';
    html += weekSummary();
    html += whyCard();
    html += '<section class="quick"><a href="#map">単元マップ</a><a href="#mock">模試モード</a><a href="#search">検索</a><a href="#jhq">日本史 一問一答</a><a href="#whq">世界史 一問一答</a><a href="#ronjutsu">論述カットイン</a><a href="#exam">入試のしくみ・日程</a><a href="#records">テスト結果を記録</a><a href="#memo">質問メモ</a><a href="#univ">大学データ</a></section>';
    // 今週の単元
    if (tt.week && tt.week.units.length) {
      html += '<section class="card"><h2>今週ねらう単元</h2><div class="unit-list">' + tt.week.units.map(function (id) { return unitRow(id, rm.stats); }).join('') + '</div>' +
        '<a class="link" href="#roadmap">ロードマップ全体を見る →</a></section>';
    }
    return html;
  }
  renderHome.after = function () {
    mountOwl('owlHome', true);
    var sb = document.getElementById('startBasic');
    if (sb) sb.addEventListener('click', function () { var ids = levelPick(1, null, 10); if (!ids.length) { toast('問題が見つかりませんでした'); return; } startQuiz(ids, 'study', '基礎レベル演習'); });
    var na = document.getElementById('naRetry'); if (na) na.addEventListener('click', function () { var r = document.getElementById('retryWrong'); if (r) r.click(); });
    var rw = document.getElementById('retryWrong');
    if (rw) rw.addEventListener('click', function () { startQuiz(wrongList().slice(0, 10), 'retry', '間違い直し'); });
    view.querySelectorAll('button[data-task]').forEach(function (b) {
      b.addEventListener('click', function () {
        var day = S.day();
        var k = b.getAttribute('data-task');
        day.checks[k] = !day.checks[k];
        WPS.Streak.touch();
        S.save();
        if (day.checks[k]) toast(pick(LINES.correct));
        render();
      });
    });
  };

  function unitRow(id, stats) {
    var u = WPS.UNIT_MAP[id], st = stats[id];
    return '<a class="unit-row" href="#study/' + id + '">' + subjChip(u.subj) + '<span class="u-name">' + h(u.name) + '<small>' + u.stage + '</small></span>' +
      statusChip(st.status) + '<span class="acc">' + pct(st.acc) + '</span></a>';
  }

  /* ========== 診断テスト ========== */
  function buildDiagnostic(subjFilter) {
    var t = R.target();
    var gi = R.gradeIndex(t.profile.grade);
    var stats = A.allStats();
    var subs = subjFilter ? [subjFilter] : Object.keys(t.weights).filter(function (k) { return t.weights[k] > 0; })
      .sort(function (a, b) { return t.weights[b] - t.weights[a]; });
    var perSubj = subjFilter ? 8 : Math.max(2, Math.round(15 / subs.length));
    var order = { untested: 0, weak: 1, soso: 2, good: 3 };
    var items = [];
    subs.forEach(function (sj) {
      var pool = WPS.UNITS.filter(function (u) {
        if (u.subj !== sj) return false;
        var si = WPS.STAGES.indexOf(u.stage);
        if (t.isHigh) return si <= Math.min(2, Math.max(gi, 0));
        if (gi <= 2) return si <= gi;
        return si >= 3 && si <= gi; // 高校生:まずは高校範囲で確認し、間違えたら中学へさかのぼる
      });
      if (!pool.length) pool = WPS.UNITS.filter(function (u) { return u.subj === sj && (gi <= 2 ? WPS.STAGES.indexOf(u.stage) <= 2 : WPS.STAGES.indexOf(u.stage) >= 3); });
      pool = shuffle(pool).sort(function (a, b) { return order[stats[a.id].status] - order[stats[b.id].status]; }).slice(0, perSubj);
      pool.forEach(function (u) { items.push(pickQuestion(u.id, 2)); });
    });
    return items.filter(Boolean).slice(0, subjFilter ? 8 : 16);
  }
  // 単元から1問選ぶ(まだ正解していない問題・指定レベルに近い問題を優先)
  function pickQuestion(unitId, prefLevel, exclude) {
    var s = S.get();
    var okSet = {};
    s.attempts.forEach(function (a) { if (a.ok) okSet[a.q] = true; });
    var qs = WPS.UNIT_MAP[unitId].questions.filter(function (q) { return !exclude || !exclude[q.id]; });
    if (!qs.length) return WPS.UNIT_MAP[unitId].hasGen ? WPS.genId(unitId) : null;
    qs = shuffle(qs).sort(function (a, b) {
      var oa = okSet[a.id] ? 1 : 0, ob = okSet[b.id] ? 1 : 0;
      if (oa !== ob) return oa - ob;
      return Math.abs(a.level - prefLevel) - Math.abs(b.level - prefLevel);
    });
    // 自動生成できる単元では、固定の問題を正解済みなら(または半分の確率で)新しい数字の問題を出す
    if (WPS.UNIT_MAP[unitId].hasGen && (okSet[qs[0].id] || Math.random() < 0.5)) return WPS.genId(unitId);
    return qs[0].id;
  }
  // 単元の練習セット(固定の問題から最大4問＋自動生成で合計10問)
  function unitSet(u) {
    var ids = shuffle(u.questions.map(function (q) { return q.id; })).slice(0, 4);
    if (u.hasGen) while (ids.length < 10) ids.push(WPS.genId(u.id));
    return ids;
  }
  function unitCount(u) { return u.hasGen ? '50問以上(数字や組み合わせを変えて出題)' : u.questions.length + '問'; }

  function renderTest() {
    var t = R.target();
    var subs = Object.keys(t.weights).filter(function (k) { return t.weights[k] > 0; });
    var html = say('テストといっても、成績をつけるためじゃないよ。<b>きみの「つまずきポイント」を見つけるため</b>のものだから、わからない問題は「わからない」ボタンを押してね。高校の問題で間違えたら、自動で中学の単元までさかのぼって原因を調べるよ。', 'think', 64);
    var chosen = t.profile.subjects || Object.keys(WPS.SUBJECTS);
    html += '<section class="card"><h2>📝 受験で使う教科をえらぶ</h2><p class="muted">大学・学部によって必要な教科は違うよ。使う教科だけをえらぶと、診断とロードマップがその教科だけになるよ。</p><div class="seg">' +
      Object.keys(WPS.SUBJECTS).map(function (k) { var on = chosen.indexOf(k) >= 0; return '<button type="button" class="seg-btn' + (on ? ' on' : '') + '" data-subj="' + k + '" aria-pressed="' + on + '">' + (on ? '✓ ' : '') + WPS.SUBJECTS[k].name + '</button>'; }).join('') + '</div></section>';
    html += '<section class="card"><h2>🎯 おまかせ診断(約15問・10分)</h2><p class="muted">えらんだ教科から、きみの学年に合った問題を出すよ。</p>' +
      '<button class="btn primary big" data-start="all">診断をはじめる</button></section>';
    html += '<section class="card"><h2>模試モード(時間を計って本番形式)</h2><p class="muted small">10〜30問を制限時間つきで解き、最後にまとめて採点。教科別・レベル別の得点率と時間配分がわかります。</p><a class="btn big" href="#mock">模試モードへ</a></section>';
    html += '<section class="card"><h2>暗記・論述(日本史・世界史)</h2><div class="hist-links"><a href="#jhq"><b>日本史</b><small>一問一答</small></a><a href="#whq"><b>世界史</b><small>一問一答</small></a><a href="#ronjutsu"><b>論述</b><small>カットイン</small></a></div></section>';
    var dl = +(t.profile.diffLevel || 1);
    html += '<section class="card lvl-card"><h2>レベル別演習(10問)</h2><p class="muted small">志望校のレベルに合わせて、問題の難しさを選べるよ。</p>' +
      '<div class="lvl-pick" role="group" aria-label="レベル">' + [1, 2, 3].map(function (d) {
        return '<button type="button" class="lvl-btn lv-d' + d + (dl === d ? ' on' : '') + '" data-diff="' + d + '" aria-pressed="' + (dl === d) + '"><b>' + ['', '①', '②', '③'][d] + ' ' + DIFF[d] + '</b><small>' + DIFF_NOTE[d] + '</small></button>';
      }).join('') + '</div><div class="grid-btns">' +
      '<button class="btn primary" data-lvstart="">全教科</button>' + subs.map(function (k) { var n = diffUnits(dl, k).length; return n ? '<button class="btn subj" style="--c:' + WPS.SUBJECTS[k].color + '" data-lvstart="' + k + '">' + WPS.SUBJECTS[k].name + '</button>' : ''; }).join('') +
      '</div>' + (subs.every(function (k) { return !diffUnits(dl, k).length; }) ? '<p class="muted small">このレベルの問題は、いまの学年ではまだありません。</p>' : '') + '</section>';
    html += '<section class="card"><h2>科目をしぼって診断(8問)</h2><div class="grid-btns">' +
      subs.map(function (k) { var sj = WPS.SUBJECTS[k]; return '<button class="btn subj" style="--c:' + sj.color + '" data-start="' + k + '">' + sj.name + '</button>'; }).join('') +
      '</div></section>';
    var stats = A.allStats();
    html += '<section class="card"><h2>🏫 学校のテスト・模試の結果を記録</h2><p class="muted">定期テストや模試で間違えた単元を記録すると、分析とロードマップに反映されるよ。</p><a class="btn big" href="#records">結果を記録する</a></section>';
    html += '<section class="card"><h2>単元をえらんで練習</h2><p class="muted">教科 → 科目 → 単元 の順にえらんでね。</p>' + courseBrowser('test', [], stats);
    html += '</section>';
    return html;
  }
  renderTest.after = function () {
    view.querySelectorAll('[data-subj]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = S.get().profile, all = Object.keys(WPS.SUBJECTS), cur = (p.subjects || all).slice(), k = b.getAttribute('data-subj'), i = cur.indexOf(k);
        if (i >= 0) { if (cur.length === 1) { toast('1教科はえらんでね'); return; } cur.splice(i, 1); } else cur.push(k);
        p.subjects = cur.length === all.length ? null : cur;
        S.save(); var y = window.scrollY; render(); window.scrollTo(0, y);
      });
    });
    bindCourseBrowser('test');
    view.querySelectorAll('.unit-row[data-unit]').forEach(function (x) { x.addEventListener('click', function () { go('#study/' + x.getAttribute('data-unit')); }); });
    view.querySelectorAll('[data-diff]').forEach(function (b) { b.addEventListener('click', function () { S.get().profile.diffLevel = +b.getAttribute('data-diff'); S.save(); var y = window.scrollY; render(); window.scrollTo(0, y); }); });
    view.querySelectorAll('[data-lvstart]').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = +(S.get().profile.diffLevel || 1), k = b.getAttribute('data-lvstart') || null, ids = levelPick(d, k, 10);
        if (!ids.length) { toast('このレベルの問題がまだありません'); return; }
        startQuiz(ids, 'study', DIFF[d] + 'レベル演習' + (k ? '(' + WPS.SUBJECTS[k].name + ')' : ''));
      });
    });
    view.querySelectorAll('[data-start]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-start');
        var items = buildDiagnostic(k === 'all' ? null : k);
        if (!items.length) { toast('この科目の問題がまだありません'); return; }
        startQuiz(items, 'test', k === 'all' ? 'おまかせ診断' : WPS.SUBJECTS[k].name + 'の診断');
      });
    });
  };

  // まだ正解できていない「間違えた問題」(新しい順)。同じ問題を後で正解していれば外す
  var MK = WPS.makeMock({ h: h, toast: toast, shuffle: shuffle, render: render, levelPick: levelPick, diffOf: diffOf, confirm: function (msg, fn, lab) { ask(msg, lab, fn); } });
  function renderMock() { return MK.render(); }
  renderMock.after = function () { MK.after(); };
  /* ---------- 単元マップ:全単元の定着度を色で一覧(ヒートマップ)。忘れかけも見える ---------- */
  var mapSubj = null;
  function unitLast(id) { var s = S.get(), t = 0; for (var i = s.attempts.length - 1; i >= 0; i--) { var a = s.attempts[i]; if (a.u === id) { t = a.t; break; } } return t; }
  function mapState(st, last) {
    if (st.status === 'untested') return 'un';
    if (st.status === 'good' && last && Date.now() - last > 21 * 864e5) return 'fade'; // 3週間以上さわっていない得意単元は「忘れかけ」
    return st.status;
  }
  function renderMap() {
    var p = S.get().profile, stats = A.allStats(), t = R.target(), subs = Object.keys(WPS.SUBJECTS).filter(function (k) { return t.weights[k] > 0; });
    if (!mapSubj || subs.indexOf(mapSubj) < 0) mapSubj = subs[0];
    var LBL = { good: '得意', soso: 'もう少し', weak: '苦手', fade: '忘れかけ', un: '未挑戦' };
    var all = WPS.UNITS.filter(function (u) { return WPS.unitAllowed(u, p.grade, stats); });
    var cnt = { good: 0, soso: 0, weak: 0, fade: 0, un: 0 };
    all.forEach(function (u) { if (t.weights[u.subj] > 0) cnt[mapState(stats[u.id], unitLast(u.id))]++; });
    var tot = Object.keys(cnt).reduce(function (a, k) { return a + cnt[k]; }, 0) || 1;
    var html = '<section class="card"><p class="muted small">受験で使う教科の全単元を、定着度で色分けしています。マスをタップすると、その単元の学習へ進みます。3週間以上解いていない「得意」は「忘れかけ」になります。</p>' +
      '<div class="map-total">' + ['good', 'soso', 'fade', 'weak', 'un'].map(function (k) { return '<i class="m-' + k + '" style="width:' + (cnt[k] / tot * 100).toFixed(1) + '%"></i>'; }).join('') + '</div>' +
      '<p class="map-leg">' + ['good', 'soso', 'fade', 'weak', 'un'].map(function (k) { return '<span><i class="m-' + k + '"></i>' + LBL[k] + ' ' + cnt[k] + '</span>'; }).join('') + '</p>' +
      '<div class="seg">' + subs.map(function (k) { return '<button type="button" class="seg-btn' + (k === mapSubj ? ' on' : '') + '" data-mapsub="' + k + '">' + WPS.SUBJECTS[k].name + '</button>'; }).join('') + '</div></section>';
    // 科目(コース)ごとにまとめる
    var groups = {};
    all.filter(function (u) { return u.subj === mapSubj; }).forEach(function (u) { var c = WPS.courseOfUnit ? WPS.courseOfUnit(u.id) : null, k = c ? c.short : u.stage; (groups[k] = groups[k] || []).push(u); });
    Object.keys(groups).forEach(function (g) {
      var us = groups[g];
      html += '<section class="card"><h2>' + h(g) + '<small class="muted"> ' + us.length + '単元</small></h2><div class="map-grid">' + us.map(function (u) {
        var stt = stats[u.id], ms = mapState(stt, unitLast(u.id));
        return '<a class="map-cell m-' + ms + '" href="#study/' + u.id + '" title="' + h(u.name + '・' + LBL[ms] + (stt.n ? '(正答率' + Math.round(stt.acc * 100) + '%)' : '')) + '"><b>' + h(u.name) + '</b><small>' + LBL[ms] + (stt.n ? ' ' + Math.round(stt.acc * 100) + '%' : '') + '</small></a>';
      }).join('') + '</div></section>';
    });
    var fade = all.filter(function (u) { return u.subj === mapSubj && mapState(stats[u.id], unitLast(u.id)) === 'fade'; });
    if (fade.length) html += '<section class="card"><h2>忘れかけの単元を確認</h2><p class="muted small">' + fade.length + '単元から1問ずつ出題します。</p><button type="button" class="btn primary" id="mapFade">' + Math.min(10, fade.length) + '問 解く</button></section>';
    return html;
  }
  renderMap.after = function () {
    view.querySelectorAll('[data-mapsub]').forEach(function (b) { b.addEventListener('click', function () { mapSubj = b.getAttribute('data-mapsub'); render(); }); });
    var f = document.getElementById('mapFade');
    if (f) f.addEventListener('click', function () {
      var p = S.get().profile, stats = A.allStats();
      var ids = shuffle(WPS.UNITS.filter(function (u) { return u.subj === mapSubj && WPS.unitAllowed(u, p.grade, stats) && mapState(stats[u.id], unitLast(u.id)) === 'fade'; })).slice(0, 10)
        .map(function (u) { return pickQuestion(u.id, 2, {}); }).filter(Boolean);
      if (!ids.length) { toast('問題が見つかりませんでした'); return; }
      startQuiz(ids, 'study', '忘れかけの確認');
    });
  };
  // アプリ内検索:単元・英単語・古文単語・用語・一問一答・論述をまとめて探す
  var srchQ = '';
  function srchIndex() {
    if (srchIndex.c) return srchIndex.c;
    var out = [];
    WPS.UNITS.forEach(function (u) { out.push({ k: '単元', t: u.name, m: WPS.SUBJECTS[u.subj].name + '・' + u.stage, href: '#study/' + u.id, u: u }); });
    WORD_LISTS.forEach(function (L) { (WPS.BANK[L[2]] || []).forEach(function (x) { out.push({ k: L[1], t: L[4] === 'year' ? x.t + '年' : x.t, m: x.m, L: L }); }); });
    (WPS.JHQ || []).forEach(function (q) { out.push({ k: '日本史', t: q.a, m: q.q, href: '#jhq' }); });
    (WPS.WHQ || []).forEach(function (q) { out.push({ k: '世界史', t: q.a, m: q.q, href: '#whq' }); });
    (WPS.RONJUTSU || []).forEach(function (q) { out.push({ k: '論述', t: q.topic, m: q.q, href: '#ronjutsu' }); });
    return (srchIndex.c = out);
  }
  function renderSearch() {
    var q = srchQ.trim().toLowerCase(), gr = S.get().profile.grade, st = A.allStats(), hits = [];
    if (q) srchIndex().forEach(function (x) {
      if (hits.length >= 60) return;
      if (x.u && !WPS.unitAllowed(x.u, gr, st)) return;
      if (x.L && !wordListOk(x.L, gr, st)) return;
      if (String(x.t).toLowerCase().indexOf(q) >= 0 || String(x.m).toLowerCase().indexOf(q) >= 0) hits.push(x);
    });
    return '<section class="card"><input id="srchIn" type="search" value="' + h(srchQ) + '" placeholder="単元名・単語・人物・できごとなど" aria-label="アプリ内検索" autocomplete="off">' +
      (q ? '<p class="muted small">' + (hits.length >= 60 ? '60件以上見つかりました(はじめの60件)' : hits.length + '件') + '</p><ul class="srch-list">' + hits.map(function (x) {
        var inner = '<em>' + h(x.k) + '</em><b>' + h(x.t) + '</b><span>' + h(x.m) + '</span>';
        return '<li>' + (x.href ? '<a href="' + x.href + '">' + inner + '</a>' : '<div>' + inner + '</div>') + '</li>';
      }).join('') + '</ul>' : '<p class="muted small">単元・英単語・古文単語・用語・日本史/世界史の一問一答・論述から探せます。</p>') + '</section>';
  }
  renderSearch.after = function () {
    var inp = document.getElementById('srchIn'), tm;
    inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
    inp.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { srchQ = inp.value; var y = window.scrollY; render(); window.scrollTo(0, y); }, 200); });
  };
  // 今日の学習時間:目標(平日/休日の設定)と実績をリングで比べる
  function timeRing(tt) {
    if (!S.get().attempts.length) return '';
    var goal = tt.minutesToday || 60, got = (VT.minutesByDay ? VT.minutesByDay() : {})[D.today()] || 0, p = Math.min(1, got / goal), C = 2 * Math.PI * 34;
    var msg = p >= 1 ? '今日の目標を達成！ よくがんばったね。' : got === 0 ? 'まずは5分。始めると、続けやすくなるよ。' : 'あと' + WPS.Time.label(goal - got) + 'で今日の目標。';
    return '<section class="card t-ring"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="bg"/><circle cx="40" cy="40" r="34" class="fg' + (p >= 1 ? ' done' : '') + '" style="stroke-dasharray:' + (C * p).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg>' +
      '<div><small>今日の学習時間</small><b>' + got + '<small>分</small> / ' + WPS.Time.label(goal) + '</b><p>' + msg + '</p></div><a class="btn small" href="#timer">集中タイマー</a></section>';
  }
  // 次の一手:いま一番効果が高い学習を1つだけ示す
  function nextAction(tt) {
    var s = S.get(), wl = wrongList(), sm = WPS.SRS.summary(), task = tt.tasks.filter(function (x) { return !x.done && x.action; })[0];
    var hasTest = s.attempts.some(function (a) { return a.src === 'test'; });
    var a = null;
    if (!hasTest) return '';
    if (wl.length >= 3) a = { t: '間違い直し ' + Math.min(10, wl.length) + '問', why: 'まちがえた問題は、時間をおかずに解き直すと定着しやすい。', id: 'naRetry' };
    else if (sm.due >= 5) a = { t: '復習カード ' + sm.due + '枚', why: '忘れかけたちょうど今が、思い出すのにいちばん効果的なタイミング。', href: '#cards' };
    else if (task) a = { t: task.title, why: '今日のやる事のうち、まだ終わっていないもの。', href: task.action };
    else a = { t: '単語トレーニング(自動出題)', why: '今日のやる事は完了。すき間時間に、忘れかけの単語を確認しよう。', href: '#vocab' };
    return '<section class="card next-act"><p class="na-lbl">次の一手</p><b class="na-t">' + h(a.t) + '</b><p class="na-why">' + h(a.why) + '</p>' +
      (a.id ? '<button type="button" class="btn primary big" id="' + a.id + '">今すぐやる</button>' : '<a class="btn primary big" href="' + a.href + '">今すぐやる</a>') + '</section>';
  }
  // まちがえた理由(ミスノート)
  var WHY = [['care', 'ケアレスミス'], ['know', '覚えていなかった'], ['under', '理解があいまい'], ['read', '問題の読み違い']];
  var WHY_TIP = {
    care: '解き終えたら、計算・符号・単位・選択肢の記号を見直す「確認の1分」を習慣に。',
    know: '単語帳・一問一答で、間隔をあけて何度も思い出す練習(間隔反復)を。',
    under: '単元ページの解説を読み直し、なぜそうなるかを自分の言葉で説明してみよう。',
    read: '問いの「〜でないもの」「すべて選べ」などに線を引いてから解こう。'
  };
  function whyStats(days) {
    var s = S.get(), since = Date.now() - (days || 30) * 864e5, c = {}, n = 0;
    s.attempts.forEach(function (a) { if (a.why && a.t >= since) { c[a.why] = (c[a.why] || 0) + 1; n++; } });
    return { c: c, n: n };
  }
  function whyCard(title) {
    var w = whyStats(30); if (w.n < 3) return '';
    var top = WHY.slice().sort(function (a, b) { return (w.c[b[0]] || 0) - (w.c[a[0]] || 0); })[0];
    return '<section class="card why-card"><h2>' + (title || 'ミスの原因(直近30日)') + '</h2><div class="why-bars">' + WHY.map(function (x) {
      var v = w.c[x[0]] || 0, p = Math.round(v / w.n * 100);
      return '<div class="why-row' + (x === top ? ' top' : '') + '"><span>' + x[1] + '</span><div class="why-track"><i style="width:' + p + '%"></i></div><b>' + v + '</b></div>';
    }).join('') + '</div><p class="why-tip"><b>いちばん多いのは「' + top[1] + '」</b>' + WHY_TIP[top[0]] + '</p></section>';
  }
  function wrongList() {
    var s = S.get(), last = {}, gr = s.profile.grade, st = A.allStats();
    s.attempts.forEach(function (a) { if (a.q && a.src !== 'card' && a.src !== 'oral') last[a.q] = a; });
    return Object.keys(last).filter(function (id) { var q = WPS.Q(id); return !last[id].ok && q && WPS.unitAllowed(q.unit, gr, st); })
      .sort(function (a, b) { return last[b].t - last[a].t; });
  }
  /* ---------- 問題の難易度(3段階) ----------
   * 1 基礎 … 偏差値40〜50の大学で出るレベル(各単元の知識・理解の問題)
   * 2 標準 … 偏差値50以上の大学で出るレベル(各単元の応用問題・入試レベルの総合)
   * 3 難関 … 偏差値65以上の大学で出るレベル(難関レベルの単元)
   */
  var DIFF = { 1: '基礎', 2: '標準', 3: '難関' }, DIFF_NOTE = { 1: '偏差値40〜50の大学レベル', 2: '偏差値50以上の大学レベル', 3: '偏差値65以上の難関大レベル' };
  function diffOf(q) { var u = WPS.UNIT_MAP[q.unit]; return u && u.rank ? u.rank : q.level === 3 ? 2 : 1; }
  function diffUnits(d, subj) {
    var p = S.get().profile, st = A.allStats(), t = R.target();
    return WPS.UNITS.filter(function (u) {
      if (subj ? u.subj !== subj : !(t.weights[u.subj] > 0)) return false;
      if (!WPS.unitAllowed(u, p.grade, st)) return false;
      if (d === 3) return u.rank === 3;
      if (d === 2) return u.rank === 2 || (!u.rank && (u.hasGen || u.questions.some(function (q) { return q.level === 3; })));
      return !u.rank;
    });
  }
  // 指定の難易度の問題を n 問選ぶ(自動生成の単元は、合う難易度の問題が出るまで種を変えて作る)
  function levelPick(d, subj, n) {
    var units = diffUnits(d, subj), out = [], seen = {};
    for (var k = 0; out.length < n && k < n * 30 && units.length; k++) {
      var u = units[Math.floor(Math.random() * units.length)], id = null;
      var stat = u.questions.filter(function (q) { return diffOf(q) === d && !seen[q.id]; });
      if (stat.length && (!u.hasGen || Math.random() < 0.3)) id = stat[Math.floor(Math.random() * stat.length)].id;
      else if (u.hasGen) for (var tr = 0; tr < 25 && !id; tr++) { var g = WPS.genId(u.id), q = WPS.Q(g); if (q && diffOf(q) === d) id = g; }
      if (id && !seen[id]) { seen[id] = true; out.push(id); }
    }
    return out;
  }
  // 答えた直後に、画面の中央に大きな ○ / ✕ を一瞬表示する
  function judgeMark(kind) {
    var old = document.getElementById('judge'); if (old) old.remove();
    var d = document.createElement('div');
    d.id = 'judge'; d.className = 'judge ' + kind; d.setAttribute('aria-hidden', 'true');
    d.textContent = kind === 'ok' ? '○' : kind === 'ng' ? '✕' : '?';
    document.body.appendChild(d);
    setTimeout(function () { d.classList.add('out'); }, 650);
    setTimeout(function () { if (d.parentNode) d.remove(); }, 1000);
  }
  function startQuiz(qids, src, title) {
    quiz = {
      items: qids.map(function (id) { return { q: id, dig: false }; }), i: 0, src: src, title: title,
      results: [], answered: false, order: null, asked: {}, digs: 0,
      t0: Date.now(), xp: 0, combo: 0, best: 0, first: !WPS.Streak.studiedToday()
    };
    qids.forEach(function (id) { quiz.asked[id] = true; });
    go('#quiz');
  }

  // 問題を解いている間は単元名を出さない(「未来完了」などの単元名で答えがわかってしまうため)。
  // 科目名と学年だけを表示し、単元名は答えた後の解説で見せる。
  function qLabel(u) {
    var c = WPS.courseOfUnit(u.id);
    return (c ? c.short : WPS.SUBJECTS[u.subj].name) + '・' + u.stage;
  }
  function renderQuiz() {
    if (!quiz) return renderTest();
    var it = quiz.items[quiz.i];
    var q = WPS.Q(it.q);
    var u = WPS.UNIT_MAP[q.unit];
    if (!quiz.order) quiz.order = shuffle(q.choices.map(function (_, i) { return i; }));
    var html = '<div class="quiz-head"><span>' + h(quiz.title) + '</span><span class="combo' + (quiz.combo >= 2 ? ' on' : '') + '" id="qCombo">' + (quiz.combo >= 2 ? 'コンボ x' + quiz.combo : '') + '</span><span>' + (quiz.i + 1) + ' / ' + quiz.items.length + '</span></div>' +
      '<div class="progress"><i style="width:' + Math.round(quiz.i / quiz.items.length * 100) + '%"></i></div>';
    if (it.dig) html += say(pick(LINES.dig), 'think', 44);
    if (it.sim) html += '<p class="sim-tag">類題:さっきの解説を思い出して解こう</p>';
    html += modeSwitch();
    html += '<section class="card question"><div class="q-meta">' + subjChip(u.subj) + '<span>' + h(qLabel(u)) + '</span><span class="lv lv' + q.level + '">' + WPS.LEVELS[q.level] + '</span><span class="df df' + diffOf(q) + '">' + DIFF[diffOf(q)] + '</span></div>' +
      (diffOf(q) === 3 ? '<p class="hard-tag">難しい問題</p>' : '') +
      '<p class="q-text">' + h(q.text) + '</p>' + (q.say && 'speechSynthesis' in window ? '<button class="btn small say-btn" id="qSay" type="button">🔊 英文を聞く</button>' : '') +
      (useWrite(q) ? writeBox('qWrite') : '<div class="choices">' +
      quiz.order.map(function (ci, k) {
        return '<button class="choice" data-ci="' + ci + '"><b>' + 'ABCD'[k] + '</b><span>' + h(q.choices[ci]) + '</span></button>';
      }).join('') + '</div>') +
      '<button class="btn ghost unsure" data-ci="-1">🤔 わからない(先生に聞きたい)</button><div id="feedback"></div></section>';
    return html;
  }
  renderQuiz.after = function () {
    var qs = document.getElementById('qSay');
    if (qs) qs.addEventListener('click', function () { var q = WPS.Q(quiz.items[quiz.i].q); speak(quiz.answered ? q.say : q.say.replace(q.answer, '...')); });
    view.querySelectorAll('[data-ci]').forEach(function (b) {
      b.addEventListener('click', function () { answer(+b.getAttribute('data-ci')); });
    });
    bindModeSwitch();
    bindWriteBox('qWrite', function (text) {
      var q = WPS.Q(quiz.items[quiz.i].q);
      if (isMatch(text, q.answer)) { answer(-2, { ok: true, text: text }); return; }
      selfCheck('qWrite', text, q.answer, function (ok) { answer(-2, { ok: ok, text: text }); });
    });
  };

  // ci:選んだ選択肢(0が正解)/ -1:わからない / -2:記述で答えた(w = {ok, text})
  function answer(ci, w) {
    if (quiz.answered) return;
    quiz.answered = true;
    var it = quiz.items[quiz.i];
    var q = WPS.Q(it.q);
    var ok = ci === -2 ? w.ok : ci === 0;
    var unsure = ci === -1;
    var chosen = ci === -2 ? w.text : unsure ? null : q.choices[ci];
    var s = S.get();
    s.attempts.push({ q: q.id, u: q.unit, s: q.subj, ok: ok, ch: chosen, unsure: unsure, mode: ci === -2 ? 'write' : 'choice', src: quiz.src, t: Date.now(), d: D.today() });
    if (unsure) {
      s.memos.push({ id: Date.now(), unit: q.unit, q: q.id, text: '「' + q.text + '」がわかりませんでした。', t: Date.now(), done: false, auto: true });
    }
    quiz.results.push({ q: q.id, ok: ok, unsure: unsure, dig: it.dig });
    WPS.Streak.touch();
    var xr = WPS.Quest.onAnswer(ok, { hard: diffOf(q) === 3 });
    quiz.xp += xr.xp; quiz.combo = ok ? quiz.combo + 1 : 0; if (quiz.combo > quiz.best) quiz.best = quiz.combo;
    var cbx = document.getElementById('qCombo');
    if (cbx) { cbx.textContent = quiz.combo >= 2 ? 'コンボ x' + quiz.combo : ''; cbx.classList.toggle('on', quiz.combo >= 2); }
    showMsgs(xr.msg);
    S.save();

    // 適応型:間違えたら前提単元にさかのぼって1問追加(最大6問まで)
    var dug = false;
    if (!ok && quiz.src === 'test' && quiz.digs < 6) {
      var u = WPS.UNIT_MAP[q.unit];
      for (var k = 0; k < u.prereq.length; k++) {
        var pid = u.prereq[k];
        var already = quiz.items.some(function (x) { return WPS.Q(x.q).unit === pid; });
        if (already) continue;
        var nq = pickQuestion(pid, 1, quiz.asked);
        if (nq) {
          quiz.items.splice(quiz.i + 1, 0, { q: nq, dig: true });
          quiz.asked[nq] = true; quiz.digs++; dug = true;
          break;
        }
      }
    }

    view.querySelectorAll('.choice').forEach(function (b) {
      var c = +b.getAttribute('data-ci');
      b.disabled = true;
      if (c === 0) b.classList.add('correct');
      else if (c === ci) b.classList.add('wrong');
    });
    view.querySelector('.unsure').disabled = true;
    judgeMark(ok ? 'ok' : unsure ? 'unsure' : 'ng');
    var wb = document.getElementById('qWrite'); if (wb) wb.querySelectorAll('input,button').forEach(function (x) { x.disabled = true; });
    var mood = ok ? 'happy' : 'normal';
    var line = ok ? pick(LINES.correct) : unsure ? LINES.unsure[0] : pick(LINES.wrong);
    var last = quiz.i + 1 >= quiz.items.length;
    document.getElementById('feedback').innerHTML = noEmoji(
      (xr.xp ? '<p class="xp-gain">+' + xr.xp + ' XP' + (quiz.combo >= 2 ? '<small>コンボ x' + quiz.combo + '</small>' : '') + '</p>' : '') +
      explainBox(q, ok, chosen) +
      (!ok && !unsure ? '<div class="why-box"><p>まちがえた理由は?(1つ選ぶと、苦手の分析に使います)</p><div class="why-btns">' + WHY.map(function (w) { return '<button type="button" class="btn small" data-why="' + w[0] + '">' + w[1] + '</button>'; }).join('') + '</div></div>' : '') +
      say(line + (dug ? '<br><small>次は、つまずきの原因かもしれない前の単元から1問出すね。</small>' : ''), mood, 44) +
      (!ok && !it.sim && quiz.src !== 'test' ? '<button class="btn big sim-btn" id="simQ" type="button">解説を読んだら、類題をもう1問</button>' : '') +
      '<button class="btn primary big" id="nextQ">' + (last ? '結果を見る' : '次へ') + '</button>');
    // 類題:同じ単元から別の問題を、次の1問として差し込む(すぐ使って定着させる)
    var simB = document.getElementById('simQ');
    if (simB) simB.addEventListener('click', function () {
      var nq = pickQuestion(q.unit, q.level, quiz.asked);
      if (!nq || nq === q.id) { toast('この単元には、ほかの問題がまだありません'); simB.disabled = true; return; }
      quiz.items.splice(quiz.i + 1, 0, { q: nq, dig: false, sim: true }); quiz.asked[nq] = true;
      quiz.i++; quiz.answered = false; quiz.order = null; render();
    });
    document.getElementById('nextQ').addEventListener('click', function () {
      if (last) { finishQuiz(); return; }
      quiz.i++; quiz.answered = false; quiz.order = null;
      render();
    });
    view.querySelectorAll('[data-why]').forEach(function (b) {
      b.addEventListener('click', function () {
        var st = S.get(), a = st.attempts[st.attempts.length - 1];
        if (a && a.q === q.id) { a.why = b.getAttribute('data-why'); S.save(); }
        view.querySelectorAll('[data-why]').forEach(function (x) { x.classList.toggle('primary', x === b); });
      });
    });
    document.getElementById('nextQ').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- 答え方(4択/記述/めくる)の切りかえ ---------- */
  function answerMode() { return S.get().profile.answerMode || 'choice'; }
  // ○×問題は、記述にしても2択で出す(長い答えは、書いた後に正解と見比べて自分で判定)
  function canWrite(q) { return q.choices.length > 2; }
  function useWrite(q) { return answerMode() === 'write' && canWrite(q); }
  function deckMode(q) { var m = S.get().profile.deckMode || 'flip'; return m === 'write' && !canWrite(q) ? 'choice' : m; }
  function modeSwitch(isDeck) {
    var cur = isDeck ? (S.get().profile.deckMode || 'flip') : answerMode();
    var opts = isDeck ? [['flip', '🃏 めくる'], ['choice', '🔤 4択'], ['write', '✍️ 記述']] : [['choice', '🔤 4択で答える'], ['write', '✍️ 記述で答える']];
    return '<div class="mode-sw" role="group" aria-label="答え方">' + opts.map(function (o) {
      return '<button type="button" class="seg-btn' + (o[0] === cur ? ' on' : '') + '" data-mode="' + o[0] + '" data-deck="' + (isDeck ? 1 : 0) + '" aria-pressed="' + (o[0] === cur) + '">' + o[1] + '</button>';
    }).join('') + '</div>';
  }
  function bindModeSwitch() {
    view.querySelectorAll('[data-mode]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = S.get().profile;
        if (b.getAttribute('data-deck') === '1') { p.deckMode = b.getAttribute('data-mode'); if (deck) { deck.flipped = false; deck.my = null; } }
        else { if (quiz && quiz.answered) { toast('次の問題から切りかわるよ'); } p.answerMode = b.getAttribute('data-mode'); }
        S.save();
        if (!(quiz && quiz.answered && b.getAttribute('data-deck') === '0')) render();
      });
    });
  }
  function writeBox(id) {
    return '<form class="write-box" id="' + id + '" autocomplete="off"><label for="' + id + 'In" class="muted">答えを入力してね</label><div class="write-row"><input id="' + id + 'In" type="text" enterkeyhint="done" autocapitalize="off" spellcheck="false"><button class="btn primary" type="submit">答える</button></div><div class="self-check"></div></form>';
  }
  function bindWriteBox(id, onSubmit) {
    var f = document.getElementById(id);
    if (!f) return;
    var inp = f.querySelector('input');
    setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e) { /* 無視 */ } }, 50);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = inp.value.trim();
      if (!t) { toast('答えを入力してね(わからないときは「わからない」)'); return; }
      onSubmit(t);
    });
  }
  // 自動で合っているか判定できないとき(言いかえ・表記ゆれ)は、正解を見て自分で判定する
  function selfCheck(id, text, ans, done) {
    var f = document.getElementById(id), box = f.querySelector('.self-check');
    f.querySelectorAll('input,button[type=submit]').forEach(function (x) { x.disabled = true; });
    box.innerHTML = noEmoji('<p>正解は「<b>' + h(ans) + '</b>」。あなたの答え「' + h(text) + '」は合っていた?</p><div class="btns"><button type="button" class="btn g-good" data-sc="1">○ 合っていた</button><button type="button" class="btn g-again" data-sc="0">✕ まちがい</button></div>');
    box.querySelectorAll('[data-sc]').forEach(function (b) { b.addEventListener('click', function () { done(b.getAttribute('data-sc') === '1'); }); });
  }
  // 表記ゆれ(全角/半角・大文字/小文字・空白・記号)を無視して比べる
  function norm(x) {
    return String(x).normalize('NFKC').toLowerCase().replace(/[\s　、。,.・「」『』()（）!！?？'’"]/g, '').replace(/[ー－―−]/g, '-').replace(/＝/g, '=');
  }
  function isMatch(text, ans) {
    var t = norm(text), a = norm(ans);
    if (!t) return false;
    if (t === a) return true;
    // 「A・B」「A/B」のように答えが複数書かれているときは、どれか1つと一致すればOK
    var parts = String(ans).split(/[・\/／、,]|または/).map(norm).filter(Boolean);
    if (parts.length > 1 && parts.indexOf(t) >= 0) return true;
    // かっこの補足を除いた形と一致すればOK(例:「謙譲語(〜)」)
    var core = norm(String(ans).replace(/[(（][^)）]*[)）]/g, ''));
    return core && t === core;
  }

  // くわしい解説:正解の理由・選んだ答えが違う理由・図・復習単元
  // 解説の下に出す「ポイント」は、その問題の内容と合うものだけにする。
  //  ・用語の問題 … その用語のヒント(なければ出さない)
  //  ・固定の問題 … 単元のポイントが問題・答え・解説と同じ言葉を含むときだけ出す(関係ない話題を出さない)
  //  ・文法などの自動生成問題 … 単元のテーマが1つなので、単元のポイントを出す
  function pointFor(q, u) {
    if (q.fact) return q.point || '';
    if (!u.point) return '';
    if (q.generated) return u.point;
    var hay = q.text + ' ' + q.answer + ' ' + q.exp; // ほかの選択肢(まちがいの選択肢)は見ない
    var words = (u.point.match(/[一-龯々ァ-ヶーA-Za-z]{2,}/g) || []).filter(function (w, i, a) { return a.indexOf(w) === i; });
    var hit = words.filter(function (w) { return hay.indexOf(w) >= 0; });
    return hit.length >= 2 || hit.some(function (w) { return w.length >= 3; }) ? u.point : '';
  }
  function explainBox(q, ok, chosen) {
    var u = WPS.UNIT_MAP[q.unit];
    var html = '<div class="feedback ' + (ok ? 'ok' : 'ng') + '"><b class="fb-title">' + (ok ? '<span class="mk-big ok" aria-hidden="true">○</span>正解！' : (chosen === null ? '<span class="mk-big unsure" aria-hidden="true">?</span>正解は「' + h(q.answer) + '」' : '<span class="mk-big ng" aria-hidden="true">✕</span>不正解 ／ 正解は「' + h(q.answer) + '」')) + '</b>';
    if (!ok && chosen !== null) {
      var why = (q.why && q.why[chosen]) || 'この問題では「' + q.answer + '」があてはまります。下の解説で、ルールを確認しよう。';
      html += '<div class="fb-why"><small>あなたの答え「' + h(chosen) + '」が違う理由</small><p>' + h(why) + '</p></div>';
    }
    html += '<div class="fb-exp"><small>' + (ok ? 'なぜ正解なの?' : 'くわしい解説') + '</small><p>' + h(q.exp) + '</p></div>';
    html += WPS.Fig.draw(q.fig);
    if (q.say && 'speechSynthesis' in window) html += '<button class="btn small say-btn" type="button" onclick="WPS.speak(' + h(JSON.stringify(q.say)) + ')">🔊 正しい英文を聞く</button>';
    var pt = pointFor(q, u);
    if (pt) html += '<details class="fb-point"><summary>📌 ' + (q.fact ? 'おぼえ方のヒント' : 'この単元(' + h(u.name) + ')のポイント') + '</summary><p>' + h(pt) + '</p></details>';
    else html += '<p class="fb-unit muted small">単元:' + h(u.name) + '</p>';
    if (!ok && u.prereq.length) {
      html += '<div class="fb-review"><small>🔍 つまずいたら、この単元にもどって復習しよう</small><div class="chips">' + u.prereq.map(function (pid) {
        var pu = WPS.UNIT_MAP[pid];
        return '<a class="review-chip" href="#study/' + pid + '">' + pu.stage + ' ' + h(pu.name) + '</a>';
      }).join('') + '</div></div>';
    }
    return html + '</div>';
  }

  function showMsgs(msgs) { (msgs || []).forEach(function (m, i) { setTimeout(function () { toast(m); }, 900 + i * 2400); }); }
  // 今週(月〜日)の学習した日
  function weekRow() {
    var set = WPS.Streak.studiedDays(), t = D.today(), off = (D.parse(t).getDay() + 6) % 7, out = '';
    for (var i = 0; i < 7; i++) {
      var d = D.add(t, i - off), st = set[d];
      out += '<div class="sw-d' + (st === 'study' ? ' on' : st === 'frozen' ? ' frz' : '') + (d === t ? ' today' : '') + '"><span>' + '月火水木金土日'[i] + '</span><i>' + (st === 'study' ? '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') + '</i></div>';
    }
    return '<div class="sw-row">' + out + '</div>';
  }
  WPS.weekRow = weekRow;
  function finishQuiz() {
    var n0 = quiz.results.length, c0 = quiz.results.filter(function (x) { return x.ok; }).length;
    quiz.sec = Math.round((Date.now() - (quiz.t0 || Date.now())) / 1000);
    showMsgs(WPS.Quest.onSession(n0, c0)); S.save();
    lastResult = quiz;
    quiz = null;
    go('#result');
  }

  // レッスン完了の成果(獲得XP・正解率・タイム)
  function lessonTiles(xp, ratio, sec, best) {
    sec = sec || 0;
    return '<div class="lc-tiles"><div class="lc lc-xp"><span>獲得XP</span><b>' + xp + '</b></div><div class="lc lc-acc"><span>正解率</span><b>' + Math.round(ratio * 100) + '%</b></div><div class="lc lc-time"><span>タイム</span><b>' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2) + '</b></div></div>' +
      (best >= 3 ? '<p class="lc-combo">最高コンボ <b>x' + best + '</b></p>' : '');
  }
  WPS.lessonTiles = lessonTiles;
  function streakCelebrate() {
    var n = WPS.Streak.count();
    return '<section class="card sc-card"><p class="sc-msg">' + (n <= 1 ? '新しい連続記録がスタートしたね! 毎日少しずつ続けて、記録をのばそう。' : '今日の分もクリア! ' + n + '日続いているよ。この調子!') + '</p>' +
      '<div class="sc-num">' + n + '</div><p class="sc-lbl">日連続記録</p>' + weekRow() + '</section>';
  }
  WPS.streakCelebrate = streakCelebrate;
  function renderResult() {
    var r = lastResult;
    if (!r) return renderTest();
    var n = r.results.length, c = r.results.filter(function (x) { return x.ok; }).length;
    var stats = A.allStats();
    var wrongUnits = {};
    r.results.forEach(function (x) { if (!x.ok) wrongUnits[WPS.Q(x.q).unit] = true; });
    var ratio = n ? c / n : 0;
    var mood = ratio >= 0.8 ? 'cheer' : ratio >= 0.5 ? 'happy' : 'normal';
    var msg = ratio >= 0.8 ? 'すごい！ ほとんど正解だよ。この調子で、応用問題にもチャレンジしよう！'
      : ratio >= 0.5 ? 'いいね！ 半分以上できてるよ。間違えたところが、きみの「伸びしろ」だね。'
      : '大丈夫！ 苦手が見つかったのは大きな一歩。ここから一気に伸ばしていこう！';
    var html = '<section class="card center">' + pinpo(96, mood) + '<h1>' + h(r.title) + ' の結果</h1>' +
      '<div class="big-num">' + c + '<small> / ' + n + ' 問正解</small></div><p>' + msg + '</p>' + lessonTiles(r.xp || 0, ratio, r.sec, r.best) + '</section>';
    if (r.first && WPS.Streak.studiedToday()) html = streakCelebrate() + html;
    var ids = Object.keys(wrongUnits);
    if (ids.length) {
      html += '<section class="card"><h2>見つかった苦手(つまずきポイント)</h2><div class="unit-list">';
      ids.forEach(function (id) {
        var roots = A.rootCauses(id, stats).filter(function (x) { return x.status !== 'untested'; });
        html += unitRow(id, stats);
        if (roots.length) {
          html += '<p class="root">🔍 原因は「' + roots.map(function (x) { return h(WPS.UNIT_MAP[x.id].name) + '(' + WPS.UNIT_MAP[x.id].stage + ')'; }).join('」「') + '」にあるかも。ここから先にやると近道だよ。</p>';
        }
      });
      html += '</div></section>';
    }
    html += '<section class="card"><h2>次にやること</h2><div class="stack">' +
      '<a class="btn primary big" href="#roadmap">🗺️ 自分専用のロードマップを見る</a>' +
      '<a class="btn big" href="#cards">🃏 苦手を単語帳で復習する</a>' +
      '<a class="btn big" href="#home">🏠 ホームへ</a></div>' +
      '<p class="muted">間違えた単元は、自動で単語帳とロードマップに追加されたよ。</p></section>';
    return html;
  }

  /* ========== 単元ページ ========== */
  function renderStudy(id) {
    var u = WPS.UNIT_MAP[id];
    if (!u) return renderTest();
    var stats = A.allStats();
    var st = stats[id];
    var roots = A.rootCauses(id, stats);
    var crs = WPS.courseOfUnit ? WPS.courseOfUnit(u.id) : null;
    var html = '<nav class="crumbs" aria-label="現在の位置"><a href="#test">診断・練習</a><span aria-hidden="true">›</span><span>' + WPS.SUBJECTS[u.subj].name + '</span>' + (crs ? '<span aria-hidden="true">›</span><span>' + h(crs.short) + '</span>' : '') + '<span aria-hidden="true">›</span><b>' + h(u.name) + '</b></nav>' +
      '<a class="link" href="javascript:history.back()">← もどる</a>' +
      '<section class="card"><div class="q-meta">' + subjChip(u.subj) + '<span>' + u.stage + '</span>' + statusChip(st.status) + '</div>' +
      '<h1>' + h(u.name) + '</h1>' +
      '<div class="stat-row"><div><b>' + pct(st.acc) + '</b><small>最近の正答率</small></div><div><b>' + st.total + '</b><small>解いた数</small></div><div><b>' + st.unsure + '</b><small>わからない</small></div></div></section>';
    html += '<section class="card"><h2>ここだけ押さえよう</h2>' + say(h(u.point), 'normal', 48) + '</section>';
    if (u.prereq.length) {
      html += '<section class="card"><h2>この単元の土台になる単元</h2>' +
        (roots.length ? '<p class="root">🔍 先にここを固めると、ぐっとわかりやすくなるよ。</p>' : '<p class="muted">土台はバッチリ！</p>') +
        '<div class="unit-list">' + u.prereq.map(function (p) { return unitRow(p, stats); }).join('') + '</div></section>';
    }
    html += '<section class="card"><div class="stack">' +
      '<button class="btn primary big" id="practice">✏️ 問題を解く(' + unitSet(u).length + '問)</button><p class="hint center">この単元の問題数:' + unitCount(u) + '</p>' +
      '<button class="btn big" id="toCards">🃏 この単元を単語帳で練習</button>' +
      '<a class="btn big" href="#memo/' + id + '">✏️ 先生に質問したいことを書く</a></div></section>';
    var gd = WPS.SUBJECT_GUIDE[u.subj];
    html += '<section class="card"><h2>' + WPS.SUBJECTS[u.subj].name + 'の勉強法</h2><p>' + h(gd.lead) + '</p>' + guideSteps(gd.steps) + '</section>';
    return html;
  }
  renderStudy.after = function (id) {
    var u = WPS.UNIT_MAP[id];
    if (!u) return;
    document.getElementById('practice').addEventListener('click', function () {
      startQuiz(shuffle(unitSet(u)), 'study', u.name);
    });
    document.getElementById('toCards').addEventListener('click', function () {
      var s = S.get();
      s.extraUnits = s.extraUnits || [];
      if (s.extraUnits.indexOf(id) < 0) s.extraUnits.push(id);
      S.save();
      startDeck(shuffle(unitSet(u)), u.name);
    });
  };

  /* ========== ロードマップ ========== */
  /* ========== ロードマップのカレンダー(受験日までの予定とやることリスト) ========== */
  var cal = { month: '', sel: '' };
  function calTodos() { var s = S.get(); s.calTodos = s.calTodos || {}; return s.calTodos; }
  function calData(rm) {
    var t = rm.target, today = D.today(), map = {};
    function add(d, item) { (map[d] = map[d] || []).push(item); }
    t.milestones.forEach(function (m) { add(m.date, { kind: 'exam', text: m.label }); });
    if (t.exam && !t.milestones.some(function (m) { return m.date === t.exam; })) add(t.exam, { kind: 'exam', text: '本番' });
    rm.weeks.forEach(function (w) {
      var ph = WPS.PHASES.filter(function (x) { return x.key === w.phase; })[0];
      add(w.start, { kind: 'week', text: (ph ? ph.name + ':' : '') + (w.units.length ? w.units.map(function (id) { return WPS.UNIT_MAP[id].name; }).join('・') + ' を仕上げる週' : '復習・演習の週'), week: w });
    });
    var todos = calTodos();
    Object.keys(todos).forEach(function (d) { todos[d].forEach(function (x, i) { add(d, { kind: 'todo', text: x.t, done: x.done, i: i }); }); });
    return map;
  }
  function weekOf(rm, d) { return rm.weeks.filter(function (w) { return w.start <= d && d <= w.end; })[0]; }
  function calendarSection(rm, plan) {
    var t = rm.target, today = D.today();
    if (!cal.month) cal.month = today.slice(0, 7);
    if (!cal.sel) cal.sel = today;
    var map = calData(rm), studied = WPS.Streak.studiedDays();
    (plan || []).forEach(function (x) { if (x.kind !== 'goal' && x.kind !== 'exam') (map[x.date] = map[x.date] || []).push({ kind: 'ms', text: x.title + ':' + x.detail }); });
    var y = +cal.month.slice(0, 4), m = +cal.month.slice(5, 7);
    var first = new Date(y, m - 1, 1), startDow = first.getDay(), nDays = new Date(y, m, 0).getDate();
    var lastMonth = t.exam.slice(0, 7), firstMonth = today.slice(0, 7);
    var html = '<section class="card" id="calendar"><div class="row-between"><h2>受験日までのカレンダー</h2><span class="muted">本番まで あと' + rm.days + '日</span></div>' +
      '<div class="cal-nav"><button type="button" class="btn small" data-calmove="-1"' + (cal.month <= firstMonth ? ' disabled' : '') + ' aria-label="前の月">←</button><b>' + y + '年' + m + '月</b><button type="button" class="btn small" data-calmove="1"' + (cal.month >= lastMonth ? ' disabled' : '') + ' aria-label="次の月">→</button></div>' +
      '<div class="cal-grid" role="grid">' + ['日', '月', '火', '水', '木', '金', '土'].map(function (d, i) { return '<span class="cal-dow' + (i === 0 ? ' sun' : i === 6 ? ' sat' : '') + '">' + d + '</span>'; }).join('');
    for (var i = 0; i < startDow; i++) html += '<span class="cal-cell empty"></span>';
    for (var d = 1; d <= nDays; d++) {
      var ds = cal.month + '-' + (d < 10 ? '0' : '') + d, items = map[ds] || [];
      var cls = ['cal-cell'];
      if (ds === today) cls.push('today');
      if (ds === cal.sel) cls.push('sel');
      if (ds < today) cls.push('past');
      if (ds > t.exam) cls.push('after');
      if (WPS.Time.isHoliday(ds)) cls.push('hol');
      var marks = '';
      if (items.some(function (x) { return x.kind === 'exam'; })) marks += '<i class="mk exam"></i>';
      if (items.some(function (x) { return x.kind === 'ms'; })) marks += '<i class="mk ms"></i>';
      if (items.some(function (x) { return x.kind === 'week'; })) marks += '<i class="mk week"></i>';
      if (items.some(function (x) { return x.kind === 'todo'; })) marks += '<i class="mk todo"></i>';
      if (studied[ds] === 'study') marks += '<i class="mk done"></i>';
      html += '<button type="button" class="' + cls.join(' ') + '" data-calday="' + ds + '" aria-label="' + m + '月' + d + '日"><span>' + d + '</span><span class="mks">' + marks + '</span></button>';
    }
    html += '</div><div class="cal-legend"><span><i class="mk exam"></i>試験日</span><span><i class="mk ms"></i>マイルストーン</span><span><i class="mk week"></i>週の目標の開始</span><span><i class="mk todo"></i>自分の予定</span><span><i class="mk done"></i>勉強した日</span></div>';
    // 選んだ日のくわしい予定
    var sd = cal.sel, items2 = map[sd] || [], w = weekOf(rm, sd), todos = calTodos()[sd] || [];
    html += '<div class="cal-day"><h3>' + D.label(sd) + (sd === today ? '(今日)' : '') + ' の予定</h3>';
    items2.filter(function (x) { return x.kind === 'exam'; }).forEach(function (x) { html += '<p class="cal-exam">試験:' + h(x.text) + '</p>'; });
    items2.filter(function (x) { return x.kind === 'ms'; }).forEach(function (x) { html += '<p class="cal-ms">マイルストーン:' + h(x.text) + '</p>'; });
    if (w && sd <= t.exam) {
      var ph = WPS.PHASES.filter(function (x) { return x.key === w.phase; })[0];
      html += '<p class="muted small">この週(' + D.label(w.start) + '〜' + D.label(w.end) + ')' + (ph ? '・' + h(ph.name) : '') + '</p>' +
        (w.units.length ? '<ol class="steps">' + w.units.map(function (id) { var u = WPS.UNIT_MAP[id]; return '<li><a href="#study/' + id + '">' + h(u.name) + '</a> <small class="muted">' + h(WPS.SUBJECTS[u.subj].name) + '・' + u.stage + '・' + STATUS[rm.stats[id].status].label + '</small></li>'; }).join('') + '</ol>' : '<p class="small">これまでの苦手単元の復習と、過去問・演習に取り組む週です。</p>') +
        '<p class="small">毎日のやること:単語帳の復習(5〜10分)+ その週の単元の練習' + (WPS.Time.isHoliday(sd) ? '(休日の目安 ' : '(平日の目安 ') + WPS.Time.label(WPS.Time.isHoliday(sd) ? (+p0().minutesHoliday || 120) : (+p0().minutesWeekday || 60)) + ')</p>';
    } else if (sd > t.exam) html += '<p class="muted small">本番の後の日です。</p>';
    html += '<b class="small">自分の予定・やること</b><ul class="checklist">' + todos.map(function (x, i) {
      return '<li><label><input type="checkbox" data-caldone="' + i + '"' + (x.done ? ' checked' : '') + '> <span>' + h(x.t) + '</span></label><button type="button" class="btn small ghost" data-caldel="' + i + '" aria-label="削除">×</button></li>';
    }).join('') + '</ul><div class="write-row"><input id="calNew" maxlength="40" placeholder="例:英単語100個、模試、学校の課題"><button type="button" class="btn small primary" id="calAdd">追加</button></div></div></section>';
    return html;
  }
  function p0() { return S.get().profile; }
  function bindCalendar() {
    function re() { var y = window.scrollY; render(); window.scrollTo(0, y); }
    view.querySelectorAll('[data-calmove]').forEach(function (b) { b.addEventListener('click', function () {
      var y = +cal.month.slice(0, 4), m = +cal.month.slice(5, 7) + +b.getAttribute('data-calmove');
      if (m < 1) { m = 12; y--; } if (m > 12) { m = 1; y++; }
      cal.month = y + '-' + (m < 10 ? '0' : '') + m; re();
    }); });
    view.querySelectorAll('[data-calday]').forEach(function (b) { b.addEventListener('click', function () { cal.sel = b.getAttribute('data-calday'); re(); }); });
    var add = document.getElementById('calAdd');
    if (add) add.addEventListener('click', function () {
      var v = document.getElementById('calNew').value.trim(); if (!v) return;
      var td = calTodos(); (td[cal.sel] = td[cal.sel] || []).push({ t: v, done: false }); S.save(); re();
    });
    var inp = document.getElementById('calNew'); if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); add.click(); } });
    view.querySelectorAll('[data-caldone]').forEach(function (c) { c.addEventListener('change', function () { var td = calTodos(); td[cal.sel][+c.getAttribute('data-caldone')].done = c.checked; S.save(); re(); }); });
    view.querySelectorAll('[data-caldel]').forEach(function (b) { b.addEventListener('click', function () { var td = calTodos(); td[cal.sel].splice(+b.getAttribute('data-caldel'), 1); if (!td[cal.sel].length) delete td[cal.sel]; S.save(); re(); }); });
  }

  /* ========== ポモドーロタイマー ========== */
  var POMO_KEY = 'wps_pomo';
  function pomoLoad() { try { return JSON.parse(localStorage.getItem(POMO_KEY) || 'null') || null; } catch (e) { return null; } }
  var pomo = pomoLoad() || { work: 25, short: 5, long: 15, mode: 'work', end: 0, left: 25 * 60, run: false, count: 0 };
  function pomoSave() { try { localStorage.setItem(POMO_KEY, JSON.stringify(pomo)); } catch (e) { /* 無視 */ } }
  function pomoLen(mode) { return (mode === 'work' ? pomo.work : mode === 'short' ? pomo.short : pomo.long) * 60; }
  function pomoRemain() { return pomo.run ? Math.max(0, Math.round((pomo.end - Date.now()) / 1000)) : pomo.left; }
  function beep() {
    try { var A = window.AudioContext || window.webkitAudioContext, ac = new A(); [0, .35, .7].forEach(function (t0) { var o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ac.destination); g.gain.setValueAtTime(.2, ac.currentTime + t0); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + .3); o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + .3); }); } catch (e) { /* 音が出せない環境 */ }
  }
  function pomoFinish() {
    var was = pomo.mode;
    if (was === 'work') {
      pomo.count++;
      var s = S.get(), d = D.today(); s.pomo = s.pomo || {}; s.pomo[d] = (s.pomo[d] || 0) + 1;
      WPS.Streak.touch(); S.save();
      pomo.mode = pomo.count % 4 === 0 ? 'long' : 'short';
    } else pomo.mode = 'work';
    pomo.run = false; pomo.left = pomoLen(pomo.mode); pomoSave(); beep();
    toast(was === 'work' ? '集中おつかれさま！ ' + (pomo.mode === 'long' ? pomo.long : pomo.short) + '分休もう' : '休けい終わり。次の集中をはじめよう');
    try { if (window.Notification && Notification.permission === 'granted') new Notification('Aqualium', { body: was === 'work' ? '集中タイム終了。休けいしよう' : '休けい終了。次の集中をはじめよう' }); } catch (e) { /* 無視 */ }
  }
  setInterval(function () {
    if (pomo.run && pomoRemain() <= 0) { pomoFinish(); if ((location.hash || '').slice(1) === 'timer') render(); }
    var el = document.getElementById('pomoTime');
    if (el) { var r = pomoRemain(); el.textContent = Math.floor(r / 60) + ':' + ('0' + r % 60).slice(-2); var ring = document.getElementById('pomoRing'); if (ring) ring.style.strokeDashoffset = (1 - r / pomoLen(pomo.mode)) * 628; }
  }, 500);
  function renderTimer() {
    var r = pomoRemain(), s = S.get(), today = (s.pomo || {})[D.today()] || 0;
    var labels = { work: '集中', short: '小休けい', long: '長い休けい' };
    var week = 0; for (var i = 0; i < 7; i++) week += (s.pomo || {})[D.add(D.today(), -i)] || 0;
    var html = '<section class="card pomo"><div class="seg" role="group" aria-label="モード">' + ['work', 'short', 'long'].map(function (k) { return '<button type="button" class="seg-btn' + (pomo.mode === k ? ' on' : '') + '" data-pmode="' + k + '">' + labels[k] + '</button>'; }).join('') + '</div>' +
      '<div class="pomo-dial ' + pomo.mode + '"><svg viewBox="0 0 220 220" aria-hidden="true"><defs><linearGradient id="pomoGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#04143a"/><stop offset=".55" stop-color="#1146d6"/><stop offset="1" stop-color="#0fa3b8"/></linearGradient></defs><circle cx="110" cy="110" r="100" class="pr-bg"/><circle id="pomoRing" cx="110" cy="110" r="100" class="pr-fg" style="stroke-dashoffset:' + ((1 - r / pomoLen(pomo.mode)) * 628) + '"/></svg>' +
      '<div class="pomo-num"><small>' + labels[pomo.mode] + '</small><b id="pomoTime">' + Math.floor(r / 60) + ':' + ('0' + r % 60).slice(-2) + '</b><small>' + (pomo.count % 4) + ' / 4 セット</small></div></div>' +
      '<div class="pomo-btns"><button type="button" class="btn primary big" id="pomoGo">' + (pomo.run ? '一時停止' : r < pomoLen(pomo.mode) ? '再開' : 'スタート') + '</button><button type="button" class="btn big" id="pomoReset">リセット</button><button type="button" class="btn big" id="pomoSkip">次へ</button></div>' +
      '<div class="kpis"><div class="kpi focal"><span class="kpi-l">今日の集中</span><b class="kpi-v">' + today + '<small>回(' + WPS.Time.label(today * pomo.work) + ')</small></b></div><div class="kpi"><span class="kpi-l">直近7日</span><b class="kpi-v">' + week + '<small>回</small></b></div></div></section>';
    html += '<section class="card"><h2>時間の設定</h2><div class="form-2">' + [['work', '集中(分)', [15, 20, 25, 30, 45, 50, 60]], ['short', '小休けい(分)', [3, 5, 10]], ['long', '長い休けい(分)', [10, 15, 20, 30]]].map(function (x) {
      return '<label>' + x[1] + '<select data-pset="' + x[0] + '">' + x[2].map(function (v) { return '<option' + (pomo[x[0]] === v ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select></label>';
    }).join('') + '</div><ol class="steps"><li>やることを1つ決めて、集中タイムをスタート(初期設定は25分)。</li><li>終わったら5分休けい。スマホやSNSは見ずに、目と体を休める。</li><li>4セットごとに長めの休けい(15分)をとる。</li></ol><p class="hint">集中タイムを1回終えると、その日は「勉強した日」として連続記録に数えます。ほかの画面に移ってもタイマーは進みます。</p></section>';
    return html;
  }
  renderTimer.after = function () {
    function re() { pomoSave(); render(); }
    document.getElementById('pomoGo').addEventListener('click', function () {
      if (pomo.run) { pomo.left = pomoRemain(); pomo.run = false; }
      else { pomo.end = Date.now() + pomoRemain() * 1000; pomo.run = true; try { if (window.Notification && Notification.permission === 'default') Notification.requestPermission(); } catch (e) { /* 無視 */ } }
      re();
    });
    document.getElementById('pomoReset').addEventListener('click', function () { pomo.run = false; pomo.left = pomoLen(pomo.mode); re(); });
    document.getElementById('pomoSkip').addEventListener('click', function () { pomo.run = false; pomo.mode = pomo.mode === 'work' ? (pomo.count % 4 === 3 ? 'long' : 'short') : 'work'; pomo.left = pomoLen(pomo.mode); re(); });
    view.querySelectorAll('[data-pmode]').forEach(function (b) { b.addEventListener('click', function () { pomo.mode = b.getAttribute('data-pmode'); pomo.run = false; pomo.left = pomoLen(pomo.mode); re(); }); });
    view.querySelectorAll('[data-pset]').forEach(function (sel) { sel.addEventListener('change', function () { pomo[sel.getAttribute('data-pset')] = +sel.value; if (!pomo.run) pomo.left = pomoLen(pomo.mode); re(); }); });
  };

  /* ========== ゴールから逆算したマイルストーン ========== */
  // 本番(ゴール)を起点に、さかのぼって「いつまでに・何を・どれだけ」を決める。
  function backPlan(rm) {
    var t = rm.target, p = t.profile, today = D.today(), exam = t.exam, est = A.estimate();
    var goal = activeGoal(p) || {}, nat = t.school && t.school.kind === 'national', high = t.isHigh;
    var gH = goal.hensa || (t.school && t.school.hensaMax) || null, gK = goal.kyotsu || null;
    var ph = {}; rm.phases.forEach(function (x) { ph[x.key] = x; });
    var kyo = (t.milestones.filter(function (m) { return m.key === 'kyotsu'; })[0] || {}).date;
    var plan = [];
    function add(date, title, detail, kind, check) { if (date && date >= today && date <= exam) plan.push({ date: date, title: title, detail: detail, kind: kind, check: check }); }
    // 進み具合:その日までに仕上げる予定の単元数(ロードマップの週の割り当てから数える)
    var known = rm.units.filter(function (id) { return rm.stats[id].status !== 'untested'; });
    function plannedBy(d) { var n = 0; rm.weeks.forEach(function (w) { if (w.end <= d) n += w.units.filter(function (id) { return known.indexOf(id) >= 0; }).length; }); return n; }
    var goodNow = known.filter(function (id) { return rm.stats[id].status === 'good'; }).length;
    // 偏差値の中間目標:いまの推定から目標まで、残り期間で直線的に上げる
    // 偏差値の中間目標は2段階:
    //  ① 実戦期の前まで:苦手単元の克服(基礎〜標準)で上げられるのは 60 前後まで(BASE_CAP)
    //  ② 実戦期〜直前期:過去問と標準・難関レベルの演習で、残りを目標まで上げる
    var BASE_CAP = 60;
    var baseCap = gH && est.hensa !== null ? Math.min(gH, Math.max(BASE_CAP, est.hensa)) : null;
    var prD = ph.practice ? ph.practice.start : D.add(exam, -60), finD = ph.final ? ph.final.start : exam;
    function hensaAt(d) {
      if (!gH || est.hensa === null) return null;
      var v;
      if (d <= prD) { var r1 = Math.min(1, Math.max(0, D.diff(today, d) / Math.max(1, D.diff(today, prD)))); v = est.hensa + (baseCap - est.hensa) * r1; }
      else { var r2 = Math.min(1, Math.max(0, D.diff(prD, d) / Math.max(1, D.diff(prD, finD)))); v = baseCap + (gH - baseCap) * r2; }
      return Math.round(v * 2) / 2;
    }
    function hz(d) { var v = hensaAt(d); return v ? '・模試で偏差値 ' + v + ' 前後' : ''; }
    // ① ゴール
    add(exam, '本番(ゴール)', (t.school ? t.school.name : '志望校') + (gH ? '・目標偏差値 ' + gH + (goal.approx || !goal.hensa ? '(大学データの目安)' : '') : '') + (gK ? '・共テ ' + gK + '%' : ''), 'goal');
    // ② 共通テスト
    if (kyo && kyo !== exam) add(kyo, '共通テスト本番', gK ? '目標得点率 ' + gK + '%' : '基礎〜標準問題を取りこぼさない', 'exam');
    t.milestones.forEach(function (m) { if (m.key !== 'kyotsu' && m.date !== exam) add(m.date, m.label, '併願校の試験。ここで合格を確保して、本命に集中できる状態をつくる', 'exam'); });
    // ③ 直前期の開始(新しい教材に手を出さず、総復習と体調管理)
    if (ph.final) add(ph.final.start, '直前期スタート', '新しい問題集には手を出さない。間違えた問題の解き直し・暗記ものの総復習・本番と同じ時間帯での演習', 'phase');
    // ④ 過去問の進み具合(本番から逆算)
    if (!high) {
      var fin = ph.final ? ph.final.start : D.add(exam, -14);
      add(D.add(exam, -100), '志望校の過去問 1年分', '時間を計って解き、配点と自分の得点の差を確認する(ゴールとの距離を知る)', 'past');
      add(D.add(exam, -60), '志望校の過去問 3年分', '大問ごとの得点を記録し、毎年落としている分野を単元の復習に戻す。標準・難関レベルの演習を毎日' + hz(D.add(exam, -60)), 'past');
      add(D.add(fin, -1), '志望校の過去問 5年分', '出題傾向をつかみ、時間配分を決める' + hz(D.add(fin, -1)), 'past');
      if (kyo) { add(D.add(kyo, -45), '共通テスト形式の演習 開始', '過去問・予想問題を全教科1回ずつ', 'past'); add(D.add(kyo, -14), '共通テスト形式 5回分', '本番と同じ時間割で通して解く', 'past'); }
    }
    // ⑤ 実戦期の開始=基礎〜標準の完成
    if (ph.practice) add(D.add(ph.practice.start, -1), '基礎〜標準の完成', '苦手単元をひととおり仕上げる(' + plannedBy(D.add(ph.practice.start, -1)) + '単元)' + (hensaAt(ph.practice.start) ? '・模試で偏差値 ' + hensaAt(ph.practice.start) + ' を目標' + (gH > baseCap ? '(苦手の克服で届く目安。目標 ' + gH + ' までの残りは、実戦期の過去問と標準・難関レベルの演習で上げる)' : '') : ''), 'base', { need: plannedBy(D.add(ph.practice.start, -1)) });
    // ⑥ 土台の修復の完了
    if (ph.repair) add(ph.repair.end, '中学範囲の土台の修復 完了', '診断でさかのぼった中学の苦手単元を「得意」にする', 'base');
    // ⑦ 毎月の中間目標(月末ごと)
    var limit = ph.practice ? ph.practice.start : exam, d0 = today, prevNeed = -1;
    for (var i = 0; i < 24; i++) {
      var y = +d0.slice(0, 4), m = +d0.slice(5, 7) + 1; if (m > 12) { m = 1; y++; }
      var me = D.add(y + '-' + (m < 10 ? '0' : '') + m + '-01', -1);
      if (me >= limit) break;
      var needM = plannedBy(me);
      if (D.diff(today, me) >= 7 && (needM !== prevNeed || hensaAt(me))) add(me, (+me.slice(5, 7)) + '月の中間目標', '累計 ' + plannedBy(me) + ' 単元を仕上げる' + (hensaAt(me) ? '・模試の偏差値 ' + hensaAt(me) + ' 前後' : ''), 'month', { need: plannedBy(me) });
      prevNeed = needM;
      d0 = D.add(me, 1);
    }
    plan.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    plan.goodNow = goodNow;
    return plan;
  }
  function backPlanSection(rm, plan) {
    var today = D.today();
    var html = '<section class="card" id="backplan"><h2>ゴールから逆算したマイルストーン</h2><p class="muted small">本番の日から逆にさかのぼって、「いつまでに何を終えるか」を決めています。いちばん近い目標から順に達成していこう。</p><ol class="bp">';
    var next = plan.filter(function (x) { return x.date >= today; })[0];
    plan.slice().reverse().forEach(function (x) {
      var dd = D.diff(today, x.date), prog = '';
      if (x.check && x.check.need) { var r = Math.min(1, plan.goodNow / x.check.need); prog = '<div class="bp-prog"><i style="width:' + Math.round(r * 100) + '%"></i></div><small class="muted">いま ' + plan.goodNow + ' / ' + x.check.need + ' 単元</small>'; }
      html += '<li class="bp-' + x.kind + (x === next ? ' next' : '') + '"><div class="bp-date"><b>' + D.label(x.date) + '</b><small>あと' + dd + '日</small></div><div class="bp-body"><b>' + h(x.title) + (x === next ? ' <span class="status st-soso">次の目標</span>' : '') + '</b><p>' + h(x.detail) + '</p>' + prog + '</div></li>';
    });
    html += '</ol><p class="hint">上がゴール、下が今日に近い目標です。目標偏差値は「大学データ」で志望学部を「目標にする」と入ります。診断を進めると、単元の数と時期が自動で更新されます。</p></section>';
    return html;
  }
  /* ========== ロードマップのタイムライン(ガントチャート形式) ========== */
  // 単語・暗記の計画:今日から「基礎〜標準の完成」までに、Part・分類を均等に割り振る(終わったPartは✓)
  function vocabPlan(rm) {
    var t = rm.target, today = D.today(), w = t.weights || {}, out = [];
    var std = rm.phases.filter(function (p) { return p.key === 'standard'; })[0], rep = rm.phases.filter(function (p) { return p.key === 'repair'; })[0];
    var until = std ? std.end : D.add(today, Math.round(D.diff(today, t.exam) * 0.7));
    if (until <= today) until = D.add(today, 30);
    function spread(name, color, units, href) {
      if (!units.length) return;
      var days = Math.max(units.length, D.diff(today, until) + 1), per = days / units.length, items = [];
      units.forEach(function (u, i) { var s0 = D.add(today, Math.round(i * per)), e0 = D.add(today, Math.max(Math.round((i + 1) * per) - 1, Math.round(i * per))); items.push({ s: s0, e: e0, label: u.label, done: u.done, href: href }); });
      var remain = units.reduce(function (a, u) { return a + (u.done ? 0 : u.n); }, 0), raw = Math.ceil(remain / Math.max(1, D.diff(today, until) + 1)), cap = name === '一問一答' ? 0 : +((t.profile.vocabCap === undefined ? 30 : t.profile.vocabCap));
      var per = cap && raw > cap ? cap : raw;
      out.push({ name: name, color: color, items: items, perDay: per, raw: raw, capped: per < raw, finish: per ? D.add(today, Math.ceil(remain / per)) : today, remain: remain, until: until, rest: units.filter(function (u) { return !u.done; }).length, total: units.length });
    }
    function bookUnits(bookId) {
      var b = (WPS.VBOOKS || []).filter(function (x) { return x.id === bookId; })[0]; if (!b || !b.bank || !WPS.BANK[b.bank]) return [];
      var pr = VT.bookProgress(b.bank);
      return Object.keys(pr.by).map(Number).sort(function (a, c) { return a - c; }).map(function (n) { var v = pr.by[n], info = b.parts[n - 1]; return { label: b.named && info ? info[2] : 'Part' + n, n: v[1], done: v[0] / v[1] >= 0.8 }; });
    }
    if (w.eng > 0) spread('英単語', '#2f6bf2', bookUnits('base'), '#vocab');
    if (w.jpn > 0 && !WPS.isJHStudent(t.profile.grade)) spread('古文単語', '#0f8a6b', bookUnits('kobun'), '#vocab');
    if (w.soc > 0 && !WPS.isJHStudent(t.profile.grade)) {
      var hq = [], mst = function (Q, key) { var r = (S.get()[key] || {}).r || {}, n = +((S.get()[key] || {}).cfg || {}).n || 1; return function (yo) { var qs = Q.filter(function (q) { return q.yo === yo; }); return { n: qs.length, done: qs.length && qs.filter(function (q) { return r[q.id] && r[q.id].s >= n; }).length / qs.length >= 0.8 }; }; };
      var jm = mst(WPS.JHQ || [], 'jhq'); (WPS.JHQ_META ? WPS.JHQ_META.yoko : []).forEach(function (y) { var v = jm(y[0]); if (v.n) hq.push({ label: '日本史 ' + y[1], n: v.n, done: v.done }); });
      var wm = mst(WPS.WHQ || [], 'whq'); (WPS.WHQ_META ? WPS.WHQ_META.yoko : []).forEach(function (y) { var v = wm(y[0]); if (v.n) hq.push({ label: '世界史 ' + y[1], n: v.n, done: v.done }); });
      spread('一問一答', '#c27803', hq, '#jhq');
    }
    return out;
  }
  // 今日のやる事に「単語・暗記のノルマ」を加える(単語トレーニングで学習した語数で自動チェック)
  function vocabTasks(rm) {
    if (!S.get().attempts.length) return [];
    var w = (S.get().vt || {}).w || {}, t0 = D.parse(D.today()).getTime(), out = [];
    function todayCount(bank) { var n = 0; Object.keys(w).forEach(function (k) { if (k.indexOf(bank + '|') === 0 && w[k].l >= t0) n++; }); return n; }
    vocabPlan(rm).forEach(function (v) {
      if (v.name === '一問一答' || !v.perDay) return;
      var dd = { u: todayCount(v.name === '英単語' ? 'en_h' : 'kobun_bk') };
      var cur = v.items.filter(function (it) { return !it.done; })[0]; if (!cur) return;
      out.push({ key: 'vp-' + v.name, kind: 'auto', icon: '', title: v.name + ' ' + v.perDay + '語', sub: cur.label + 'を単語トレーニングで(4択・赤シート・スワイプなど)', progress: Math.min(dd.u, v.perDay) + '/' + v.perDay, action: '#vocab', done: dd.u >= v.perDay });
    });
    return out;
  }
  // 週のまとめ:今週と先週を数字で比べる
  function weekSummary(title) {
    var s = S.get(), wk = weekKey(), pw = D.add(wk, -7), mins = VT.minutesByDay ? VT.minutesByDay() : {};
    function sum(from) {
      var to = D.add(from, 6), r = { q: 0, ok: 0, min: 0, words: 0, days: 0 };
      s.attempts.forEach(function (a) { if (a.d >= from && a.d <= to && a.src !== 'school') { r.q++; if (a.ok) r.ok++; } });
      for (var i = 0; i < 7; i++) { var d = D.add(from, i); if (mins[d]) { r.min += mins[d]; r.days++; } var v = ((s.vt || {}).daily || {})[d]; if (v) r.words += v.u; }
      return r;
    }
    var a = sum(wk), b = sum(pw);
    if (!a.q && !b.q && !a.words && !b.words) return '';
    function row(label, x, y, unit, fmt) { var d = x - y; return '<tr><th>' + label + '</th><td><b>' + (fmt ? fmt(x) : x) + '</b>' + unit + '</td><td class="' + (d > 0 ? 'up' : d < 0 ? 'down' : '') + '">' + (d > 0 ? '+' : d < 0 ? '−' : '±') + (fmt ? fmt(Math.abs(d)) : Math.abs(d)) + '</td></tr>'; }
    var acc = function (r) { return r.q ? Math.round(r.ok / r.q * 100) : 0; };
    return '<section class="card wk-sum"><h2>' + (title || '今週のまとめ') + '<small> 先週との比較</small></h2><table>' +
      row('学習した日', a.days, b.days, '日') + row('学習時間', a.min, b.min, '分') + row('解いた問題', a.q, b.q, '問') + row('正答率', acc(a), acc(b), '%') + row('学習した単語', a.words, b.words, '語') +
      '</table><p class="hint">学習時間は、問題を解いた時刻・単語トレーニング・集中タイマーから計算した目安です。週は月曜はじまりです。</p></section>';
  }
  function vocabPlanCard(rm) {
    var vp = vocabPlan(rm); if (!vp.length) return '';
    return '<section class="card"><h2>単語・暗記の進め方</h2><p class="muted small">' + h(vp[0].until.slice(5).replace('-', '/')) + '(基礎〜標準の完成)までに1周するペースです。8割を「覚えた」にすると、そのPart・分類に✓がつきます。</p><ul class="vp-list">' + vp.map(function (v) {
      var cur = v.items.filter(function (it) { return !it.done; })[0];
      return '<li style="--c:' + v.color + '"><b>' + h(v.name) + '</b><span>1日あたり 約<strong>' + v.perDay + '</strong>' + (v.name === '一問一答' ? '問' : '語') + '</span><small>残り ' + v.rest + ' / ' + v.total + (cur ? '・いま:' + h(cur.label) : '・完了') + (v.capped ? '<br><em class="vp-warn">上限に合わせたため、1周目の完了は' + h(v.finish.slice(5).replace('-', '/')) + 'ごろ(目標' + h(v.until.slice(5).replace('-', '/')) + ')</em>' : '') + '</small><a class="btn small" href="' + (v.name === '一問一答' ? '#jhq' : '#vocab') + '">進める</a></li>';
    }).join('') + '</ul><div class="vp-cap"><span>1日に覚える単語の上限</span><div class="seg">' + [[20, '20語'], [30, '30語'], [50, '50語'], [0, 'なし']].map(function (o) { var cur = rm.target.profile.vocabCap === undefined ? 30 : +rm.target.profile.vocabCap; return '<button type="button" class="seg-btn' + (cur === o[0] ? ' on' : '') + '" data-vcap="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div><p class="hint">英単語は「大学受験 基礎」、古文単語は全分類、一問一答は時代ごとで計算しています。2周目は、忘れかけ・苦手だけを「自動出題」でくり返すのが効率的です。</p></section>';
  }
  function ganttSection(rm, plan) {
    var t = rm.target, today = D.today(), start = today.slice(0, 7) + '-01', end = t.exam;
    var total = Math.max(1, D.diff(start, end) + 1);
    var pos = function (d) { return Math.max(0, Math.min(100, D.diff(start, d) / total * 100)); };
    var months = [], y = +start.slice(0, 4), m = +start.slice(5, 7);
    while ((y + '-' + (m < 10 ? '0' : '') + m) <= end.slice(0, 7)) { months.push([y, m]); m++; if (m > 12) { m = 1; y++; } }
    var W = Math.max(months.length * 220, 600);
    function bar(s0, e0, label, cls, href) {
      var l = pos(s0), r = pos(D.add(e0, 1)), w = Math.max(r - l, 1.2);
      return (href ? '<a href="' + href + '"' : '<span') + ' class="gt-bar ' + cls + '" style="left:' + l.toFixed(2) + '%;width:' + w.toFixed(2) + '%" title="' + h(label) + '">' + h(label) + (href ? '</a>' : '</span>');
    }
    var lanes = [];
    ganttSection.lastPx = undefined;
    // マイルストーン
    lanes.push(['マイルストーン', 'ms2', (plan || []).filter(function (x) { return x.kind !== 'goal' && x.kind !== 'exam'; }).map(function (x) {
      // 近すぎるマイルストーンは名前を出さず(点にふれると表示)、文字の重なりを防ぐ
      var l = pos(x.date), px = l / 100 * W, show = !(ganttSection.lastPx !== undefined && px - ganttSection.lastPx < 120);
      if (show) ganttSection.lastPx = px;
      return '<span class="gt-ms gt-ms2 bp-' + x.kind + '" style="left:' + l.toFixed(2) + '%" title="' + h(x.date + ' ' + x.title + ':' + x.detail) + '"><i></i>' + (show ? h(x.title.replace('の中間目標', '').replace('志望校の', '')) : '') + '</span>'; }).join('')]);
    lanes.unshift(['試験日', 'ms', t.milestones.map(function (mi) { return '<span class="gt-ms" style="left:' + pos(mi.date).toFixed(2) + '%" title="' + h(mi.label + ' ' + mi.date) + '"><i></i>' + h(mi.label.replace(/\(.*?\)/g, '').replace('大学入学', '').replace('(目安)', '')) + '</span>'; }).join('')]);
    // フェーズ
    lanes.push(['フェーズ', 'ph', rm.phases.map(function (ph) { return bar(ph.start, ph.end, ph.name, 'ph-' + ph.key); }).join('')]);
    // 教科ごとの単元(週ごと)
    Object.keys(WPS.SUBJECTS).forEach(function (sj) {
      var bars = '';
      rm.weeks.forEach(function (w) {
        var us = w.units.filter(function (id) { return WPS.UNIT_MAP[id].subj === sj; });
        if (us.length) bars += bar(w.start, w.end, us.map(function (id) { return WPS.UNIT_MAP[id].name; }).join('・'), 'sj', '#study/' + us[0]);
      });
      if (bars) lanes.push([WPS.SUBJECTS[sj].name, 'sj-' + sj, bars, WPS.SUBJECTS[sj].color]);
    });
    // 単語・暗記の進め方(本のPart・古文単語の分類・一問一答を、基礎〜標準の時期に割り振る)
    vocabPlan(rm).forEach(function (vp) {
      lanes.push([vp.name, 'vp', vp.items.map(function (it) { return bar(it.s, it.e, it.label + (it.done ? ' ✓' : ''), 'vp' + (it.done ? ' done' : ''), it.href); }).join(''), vp.color]);
    });
    // 自分の予定
    var td = calTodos(), my = '';
    Object.keys(td).forEach(function (d) { if (d >= start && d <= end) td[d].forEach(function (x) { my += bar(d, d, x.t, 'todo' + (x.done ? ' done' : '')); }); });
    if (my) lanes.push(['自分の予定', 'my', my]);
    var nowL = pos(today);
    var html = '<section class="card"><div class="row-between"><h2>受験日までのタイムライン</h2><span class="muted small">横にスクロールできます</span></div>' +
      '<div class="gantt2"><div class="gt-labels"><div class="gt-head"></div>' + lanes.map(function (L) { return '<div class="gt-lab ' + L[1] + '"' + (L[3] ? ' style="--c:' + L[3] + '"' : '') + '>' + h(L[0]) + '</div>'; }).join('') + '</div>' +
      '<div class="gt-scroll"><div class="gt-inner" style="width:' + W + 'px"><div class="gt-head">' + months.map(function (mm) { return '<span>' + (mm[1] === 1 || mm === months[0] ? mm[0] + '年' : '') + mm[1] + '月</span>'; }).join('') + '</div>' +
      lanes.map(function (L) { return '<div class="gt-row ' + L[1] + '"' + (L[3] ? ' style="--c:' + L[3] + '"' : '') + '>' + L[2] + '</div>'; }).join('') +
      '<b class="gt-now" style="left:' + nowL.toFixed(2) + '%"><small>今日</small></b></div></div></div>' +
      '<p class="hint">教科の行のバーは、その週に仕上げる単元です(タップすると単元の学習へ)。英単語・古文単語・一問一答の行は、Partや分類を進める時期です。診断を進めると、苦手に合わせて自動で組み直されます。</p></section>' + vocabPlanCard(rm);
    return html;
  }
  function renderRoadmap() {
    var rm = R.build();
    var t = rm.target, p = t.profile;
    var html = '';
    html += '<section class="card"><div class="row-between"><h1>🗺️ ' + h(p.name) + 'さん専用ロードマップ</h1><span class="btns"><a class="btn small" href="#map">単元マップ</a><a class="btn small" href="#settings">志望校を変更</a></span></div>' +
      '<div class="target"><div><b>' + h(t.school ? t.school.name : '志望校未設定') + '</b>' + (p.schoolName ? '<br><span class="muted">' + h(p.schoolName) + '</span>' : '') +
      '<br><span class="muted">' + h(p.track || '') + ' ／ 本番 ' + h(t.exam) + '</span></div><div class="big-num">あと' + rm.days + '<small>日</small></div></div>';
    html += milestoneLine(t) + goalCard(p, true);
    if (t.school) {
      html += '<h3>この学校の入試の特徴</h3><ul class="bullets">' + t.school.features.map(function (f) { return '<li>' + h(f) + '</li>'; }).join('') + '</ul>' +
        '<p class="hint">※ 入試科目・配点・日程は毎年変わります。必ず最新の募集要項で確認してください。</p>';
    }
    html += '<h3>公式情報で確認しよう</h3><ul class="sources">' +
      ((t.school && WPS.SCHOOL_LINKS[t.school.id]) || []).concat(WPS.COMMON_LINKS).map(function (l) {
        return '<li><a href="' + h(l[1]) + '" target="_blank" rel="noopener">' + h(l[0]) + '</a></li>';
      }).join('') + '</ul>';
    var w = t.weights;
    html += '<h3>科目の重要度(ロードマップの優先順位に反映)</h3>' +
      '<p class="hint">' + (t.custom ? '✅ 募集要項の配点をもとに、あなたが入力した重要度を使っています。' : '一般的な傾向から設定しています。<a href="#settings">設定</a>で、募集要項の配点に合わせて調整できます。') + '</p><div class="bars">' +
      Object.keys(w).filter(function (k) { return w[k] > 0; }).sort(function (a, b) { return w[b] - w[a]; }).map(function (k) {
        return '<div class="bar"><span>' + WPS.SUBJECTS[k].name + '</span><i style="width:' + Math.round(w[k] * 100) + '%;background:' + WPS.SUBJECTS[k].color + '"></i></div>';
      }).join('') + '</div></section>';

    var plan = backPlan(rm);
    html += backPlanSection(rm, plan) + ganttSection(rm, plan) + calendarSection(rm, plan);
    rm.warnings.forEach(function (x) { html += '<section class="info">💡 ' + h(x) + '</section>'; });

    html += seasonSection(t);
    // フェーズ
    html += '<section class="card"><h2>全体の流れ</h2><div class="timeline">' + rm.phases.map(function (ph) {
      var days = D.diff(ph.start, ph.end) + 1;
      return '<div class="tl tl-' + ph.key + '" style="flex:' + days + '"><b>' + ph.emoji + ' ' + ph.name + '</b><small>' + D.label(ph.start) + '〜</small></div>';
    }).join('') + '</div>' + rm.phases.map(function (ph) {
      return '<details><summary>' + ph.emoji + ' <b>' + ph.name + '</b> <span class="muted">' + D.label(ph.start) + '〜' + D.label(ph.end) + '</span></summary><p>' + h(ph.desc) + '</p><ul class="bullets">' +
        ph.howto.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></details>';
    }).join('') + '</section>';

    // 苦手マップ
    var weak = rm.units.filter(function (id) { return rm.stats[id].status !== 'untested'; });
    html += '<section class="card"><h2>🎯 ねらう苦手単元(優先順)</h2>';
    if (!weak.length) html += say('まだ苦手が見つかっていないよ。<a href="#test">診断テスト</a>を受けると、ここにきみだけの苦手リストができるよ。', 'think', 48);
    else {
      html += '<div class="unit-list">' + weak.map(function (id) {
        var roots = A.rootCauses(id, rm.stats).filter(function (x) { return x.status !== 'good'; });
        return unitRow(id, rm.stats) + (roots.length ? '<p class="root">↳ 土台:' + roots.map(function (x) { return h(WPS.UNIT_MAP[x.id].name) + '(' + STATUS[x.status].label + ')'; }).join('、') + '</p>' : '');
      }).join('') + '</div>';
    }
    html += '</section>';

    // 週ごとの計画
    var cw = R.currentWeek(rm);
    html += '<section class="card"><h2>📅 週ごとの計画</h2><p class="muted">1日' + p.minutes + '分の勉強で、週' + rm.pace + '単元のペース。テストを受けるたびに自動で更新されるよ。</p><div class="weeks">';
    rm.weeks.forEach(function (wk, i) {
      var ph = WPS.PHASES.filter(function (x) { return x.key === wk.phase; })[0];
      var cur = wk === cw;
      var extra = wk.phase === 'practice' ? '＋ 過去問演習(週2〜3回)' : wk.phase === 'final' ? '＋ 総復習・本番の時間割で演習' : '';
      html += '<div class="wk' + (cur ? ' current' : '') + (i > 7 ? ' more' : '') + '"><div class="wk-head"><b>' + (cur ? '▶ 今週 ' : '') + D.label(wk.start) + '〜' + D.label(wk.end) + '</b><span class="tag tl-' + wk.phase + '">' + ph.emoji + ' ' + ph.name + '</span></div>' +
        (wk.units.length ? '<div class="wk-units">' + wk.units.map(function (id) {
          var u = WPS.UNIT_MAP[id];
          return '<a href="#study/' + id + '" class="mini ' + STATUS[rm.stats[id].status].cls + '">' + WPS.SUBJECTS[u.subj].name + '：' + h(u.name) + '</a>';
        }).join('') + '</div>' : '') + (extra ? '<small class="muted">' + extra + '</small>' : '') + '</div>';
    });
    html += '</div>' + (rm.weeks.length > 8 ? '<button class="btn" id="moreWeeks">すべての週を表示</button>' : '') + '</section>';

    html += kptCard();
    // 勉強法
    html += guideSection(t, Object.keys(w).filter(function (k) { return w[k] > 0; }));
    return html;
  }
  function kptReport() {
    var kp = S.get().kpt || {}, kw = Object.keys(kp).sort().reverse().slice(0, 4);
    if (!kw.length) return '';
    return '<section class="card"><h2>生徒の振り返り(KPT・直近4週)</h2><ul class="kpt-list">' + kw.map(function (d) { var o = kp[d]; return '<li><b>' + h(d.slice(5).replace('-', '/')) + 'の週</b>' + (o.k ? '<span><em>K</em>' + h(o.k) + '</span>' : '') + (o.p ? '<span><em>P</em>' + h(o.p) + '</span>' : '') + (o.t ? '<span><em>T</em>' + h(o.t) + '</span>' : '') + '</li>'; }).join('') + '</ul></section>';
  }
  // 週の振り返り(KPT:続けること・問題・次に試すこと)
  function weekKey() { var t = D.today(), off = (D.parse(t).getDay() + 6) % 7; return D.add(t, -off); }
  function kptCard() {
    var s = S.get(), k = (s.kpt || {})[weekKey()] || {}, prev = Object.keys(s.kpt || {}).filter(function (x) { return x < weekKey(); }).sort().pop();
    var pk = prev ? s.kpt[prev] : null;
    return '<section class="card kpt"><h2>今週の振り返り(KPT)</h2><p class="muted small">週に1回、3つだけ書きます。書いた内容は先生用レポートにも残ります。</p>' +
      (pk && pk.t ? '<p class="kpt-prev"><b>先週「次に試す」と決めたこと</b>' + h(pk.t) + '</p>' : '') +
      [['k', 'Keep(続けること)', '例:朝の単語20語は毎日できた'], ['p', 'Problem(うまくいかなかったこと)', '例:数学の復習が週末にたまった'], ['t', 'Try(次の週に試すこと)', '例:数学は解いた日のうちに見直す']].map(function (x) {
        return '<label class="kpt-' + x[0] + '"><b>' + x[1] + '</b><textarea data-kpt="' + x[0] + '" rows="2" placeholder="' + x[2] + '">' + h(k[x[0]] || '') + '</textarea></label>';
      }).join('') + '<button type="button" class="btn primary" id="kptSave">振り返りを保存する</button></section>';
  }
  renderRoadmap.after = function () {
    view.querySelectorAll('[data-vcap]').forEach(function (b) { b.addEventListener('click', function () { S.get().profile.vocabCap = +b.getAttribute('data-vcap'); S.save(); var y = window.scrollY; render(); window.scrollTo(0, y); }); });
    bindCalendar();
    var ks = document.getElementById('kptSave');
    if (ks) ks.addEventListener('click', function () {
      var s = S.get(); s.kpt = s.kpt || {}; var o = {};
      view.querySelectorAll('[data-kpt]').forEach(function (t) { o[t.getAttribute('data-kpt')] = t.value.trim().slice(0, 300); });
      if (!o.k && !o.p && !o.t) { toast('どれか1つは書いてください'); return; }
      o.at = Date.now(); s.kpt[weekKey()] = o; S.save(); toast('今週の振り返りを保存しました');
    });
    view.querySelectorAll('[data-guide]').forEach(function (b) {
      b.addEventListener('click', function () {
        view.querySelectorAll('[data-guide]').forEach(function (x) { x.classList.toggle('on', x === b); });
        view.querySelectorAll('[data-panel]').forEach(function (pn) { pn.hidden = pn.getAttribute('data-panel') !== b.getAttribute('data-guide'); });
      });
    });
    var b = document.getElementById('moreWeeks');
    if (b) b.addEventListener('click', function () { view.querySelector('.weeks').classList.add('all'); b.remove(); });
  };

  /* ========== 単語帳 ========== */
  function startDeck(qids, title) {
    if (!qids.length) { toast('今日のカードはもう終わったよ！ えらい！'); return; }
    deck = { items: qids.slice(), i: 0, flipped: false, title: title || '今日の単語帳', again: {}, done: 0, good: 0 };
    go('#cards');
  }
  function renderCards() {
    if (deck) return renderDeck();
    var sm = WPS.SRS.summary();
    var units = WPS.SRS.deckUnits();
    var stats = A.allStats();
    var html = say(sm.due ? '忘れかけのカードが <b>' + sm.due + '枚</b> あるよ。今やると、記憶がぐっと長持ちするよ！' : '苦手単元の問題から、きみ専用の単語帳を作ったよ。1日数分でOK！', 'normal', 60);
    html += '<section class="card"><div class="stat-row"><div><b>' + sm.due + '</b><small>復習</small></div><div><b>' + sm.newToday + '</b><small>今日の新しいカード</small></div><div><b>' + sm.mastered + '</b><small>覚えた</small></div></div>' +
      '<button class="btn primary big" id="startDeck">🃏 今日のカードをはじめる</button>' +
      '<p class="hint">「覚えた」カードは 1日→3日→7日→14日→30日後…と、忘れかけた頃にまた出てくるよ(間隔反復)。</p></section>';
    html += '<section class="card vt-entry"><a class="vt-entry-a" href="#vocab"><b>単語トレーニング</b><small>4択テスト・赤シート・苦手選別・聞き流し・学習記録</small></a><a class="btn big" href="#words">単語・用語の一覧を見る(全単語・全熟語・年表など)</a></section>';
    html += cardUnitList(units, stats);
    return html;
  }
  // 単語帳の単元一覧(学校段階・教科・範囲をボタンで選ぶ)
  var cardFilter = { group: 'eng', course: 'all', scope: 'weak' };
  try { var cf = JSON.parse(localStorage.getItem('wps_card_filter') || 'null'); if (cf) cardFilter = cf; } catch (e) { /* 保存できない環境でも動く */ }
  function seg(name, opts, cur) {
    return '<div class="seg" role="group" aria-label="' + name + '">' + opts.map(function (o) {
      return '<button type="button" class="seg-btn' + (o[0] === cur ? ' on' : '') + '" data-f="' + name + '" data-v="' + o[0] + '" aria-pressed="' + (o[0] === cur) + '">' + o[1] + '</button>';
    }).join('') + '</div>';
  }
  // 教科 → 科目 → 単元 の3段階で選ぶ(診断ページと単語帳で共通)
  function courseBrowser(mode, weakUnits, stats) {
    var weakSet = {}; (weakUnits || []).forEach(function (id) { weakSet[id] = true; });
    var grade0 = S.get().profile.grade, jhS = WPS.isJHStudent(grade0);
    // 学年に合う単元が1つもない教科は出さない(中学生には高校の教科・高校向けの案内を出さない)
    var C = WPS.CURRICULUM.filter(function (g0) {
      if (g0.guideOnly) return !jhS;
      return g0.courses.some(function (x) { return x.guide ? !jhS : WPS.courseUnits(g0, x).some(function (u) { return WPS.unitAllowed(u, grade0, stats); }); });
    });
    var g = C.filter(function (x) { return x.id === cardFilter.group; })[0] || C[0];
    cardFilter.group = g.id;
    var c = g.courses.filter(function (x) { return x.id === cardFilter.course; })[0];
    var html = '<div class="tier"><span class="f-label">教科</span>' + seg('group', C.map(function (x) { return [x.id, x.guideOnly ? '他:' + x.name : x.name]; }), g.id) + '</div>';
    var grade = S.get().profile.grade;
    var visCourses = g.courses.filter(function (x) { return x.guide ? !jhS : WPS.courseUnits(g, x).some(function (u) { return WPS.unitAllowed(u, grade, stats); }); });
    if (c && visCourses.indexOf(c) < 0) { c = null; cardFilter.course = 'all'; }
    html += '<div class="tier tier2"><span class="f-label">科目</span>' + seg('course', [['all', g.guideOnly ? '概要' : 'すべて']].concat(visCourses.map(function (x) {
      var n = WPS.courseUnits(g, x).filter(function (u) { return WPS.unitAllowed(u, grade, stats); }).length;
      return [x.id, h(x.short || x.name) + (x.guide ? '' : '<small> ' + n + '</small>')];
    })), c ? c.id : 'all') + '</div>';
    // 文部科学省が求めている力
    html += '<details class="mext"><summary>📘 文部科学省が「' + h(g.name) + '」で求めている力</summary><ul class="bullets">' + g.mext.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul><p class="hint">出典:文部科学省 中央教育審議会 教育課程企画特別部会 資料(平成27年)の検討素案より要約</p></details>';
    function guideBox(x) {
      var gd = x.guide;
      return '<div class="guide-box"><h3>' + h(x.name) + '</h3>' + (gd.scope ? '<b>学ぶ内容</b><ul class="bullets">' + gd.scope.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul>' : '') + '<b>入試での使われ方</b><ul class="bullets">' + gd.exam.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul>' +
        '<b>勉強のしかた</b><ol class="steps">' + gd.how.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ol>' +
        '<div class="guide-ng"><b>よくある失敗</b><ul class="bullets">' + gd.ng.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></div></div>';
    }
    if (g.guideOnly) {
      html += '<p class="muted">この教科は共通テストの科目ではないため、問題はありません。入試での使われ方と勉強法を確認しよう。</p>';
      (c ? [c] : g.courses).forEach(function (x) { html += guideBox(x); });
      return html;
    }
    var courses = c ? [c] : visCourses;
    var total = 0, body = '';
    function unitRow(u) {
      return '<button class="unit-row" data-unit="' + u.id + '"><span class="stage-tag">' + u.stage + '</span><span class="u-name">' + h(u.name) + '<small>' + (u.hasGen ? '50問以上' : u.questions.length + '問') + '</small></span>' + statusChip(stats[u.id].status) + '</button>';
    }
    courses.forEach(function (x) {
      if (x.guide) { if (c) body += guideBox(x); else body += '<details class="guide-mini"><summary>' + h(x.name) + '(勉強法・入試での使われ方)</summary>' + guideBox(x) + '</details>'; return; }
      var ok = function (u) { return WPS.unitAllowed(u, S.get().profile.grade, stats) && (mode !== 'cards' || cardFilter.scope !== 'weak' || weakSet[u.id]); };
      var us = WPS.courseUnits(g, x).filter(ok);
      if (!us.length && !(c && x.areas)) return;
      total += us.length;
      body += '<h3 class="subj-head">' + h(x.name) + ' <span class="muted">' + us.length + '単元</span></h3>';
      if (x.areas) {
        x.areas.forEach(function (a) {
          var au = a.units.map(function (id) { return WPS.UNIT_MAP[id]; }).filter(function (u) { return u && ok(u); });
          if (!au.length && !c && (!a.topics || (mode === 'cards' && cardFilter.scope === 'weak'))) return;
          var tp = a.topics && a.topics.length ? '<p class="topics small"><span>' + (au.length ? 'ほかに学ぶ内容' : '学ぶ内容') + '</span>' + a.topics.map(h).join('/') + '</p>' : '';
          body += '<p class="area-head">' + h(a.name) + '</p>' + (au.length ? '<div class="unit-list">' + au.map(unitRow).join('') + '</div>' : '') + tp + (au.length ? '' : '<p class="muted small">この項目の問題は準備中です。</p>');
        });
      } else body += '<div class="unit-list">' + us.map(unitRow).join('') + '</div>';
    });
    if (!total) return html + body + '<p class="muted">' + (mode === 'cards' && cardFilter.scope === 'weak' ? 'この科目の苦手単元はないよ。「すべての単元」に切りかえると、ほかの単元も練習できるよ。' : 'この科目の単元はまだありません。') + '</p>';
    return html + '<div class="row-between list-head"><span class="muted">' + total + '単元</span><button class="btn small primary" id="startFiltered">この' + total + '単元をまとめて' + (mode === 'cards' ? '単語帳で練習' : '練習') + '</button></div>' + body;
  }
  function cardUnitList(weakUnits, stats) {
    return '<section class="card"><h2>単語帳をえらぶ</h2>' +
      '<div class="tier"><span class="f-label">範囲</span>' + seg('scope', [['weak', '🎯 苦手だけ(' + weakUnits.length + ')'], ['all', '📚 すべての単元']], cardFilter.scope) + '</div>' +
      courseBrowser('cards', weakUnits, stats) + '</section>';
  }
  function bindCourseBrowser(mode) {
    view.querySelectorAll('[data-f]').forEach(function (b) {
      var f = b.getAttribute('data-f');
      if (['group', 'course', 'scope'].indexOf(f) < 0) return;
      b.addEventListener('click', function () {
        cardFilter[f] = b.getAttribute('data-v');
        if (f === 'group') cardFilter.course = 'all';
        try { localStorage.setItem('wps_card_filter', JSON.stringify(cardFilter)); } catch (e) { /* 無視 */ }
        var y = window.scrollY; render(); window.scrollTo(0, y);
      });
    });
    var sf = document.getElementById('startFiltered');
    if (sf) sf.addEventListener('click', function () {
      var ids = [];
      view.querySelectorAll('[data-unit]').forEach(function (x) { ids = ids.concat(unitSet(WPS.UNIT_MAP[x.getAttribute('data-unit')])); });
      ids = shuffle(ids).slice(0, mode === 'cards' ? 30 : 15);
      if (mode === 'cards') startDeck(ids, '選んだ単元の単語帳'); else startQuiz(ids, 'study', '選んだ単元の練習');
    });
  }
  renderCards.after = function () {
    if (deck) return renderDeck.after();
    var b = document.getElementById('startDeck');
    if (b) b.addEventListener('click', function () { startDeck(WPS.SRS.session(), '今日の単語帳'); });
    bindCourseBrowser('cards');
    view.querySelectorAll('[data-unit]').forEach(function (x) {
      x.addEventListener('click', function () {
        var u = WPS.UNIT_MAP[x.getAttribute('data-unit')];
        startDeck(shuffle(unitSet(u)), u.name);
      });
    });
  };

  // 発音(ブラウザの読み上げ機能)。英語の問題・単語だけ対象
  function speakText(q) {
    if (!q || !('speechSynthesis' in window)) return '';
    if (q.say) return q.say;
    if (q.subj !== 'eng') return '';
    var t = q.text.replace(/\(\s*\)/, q.answer);
    if (/^[\x20-\x7E’]+$/.test(t)) return t;
    if (/^[A-Za-z][A-Za-z '\-]*$/.test(q.answer)) return q.answer;
    var m = q.text.match(/[A-Za-z][A-Za-z '\-]{2,}/);
    return m ? m[0] : '';
  }
  WPS.speak = function (t) { speak(t); };
  function speak(text) {
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.9;
      var v = speechSynthesis.getVoices().filter(function (x) { return /^en(-|_)/i.test(x.lang); })[0];
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { toast('この端末では読み上げが使えません'); }
  }

  function renderDeck() {
    if (deck.i >= deck.items.length) {
      var studied = WPS.Streak.count();
      var html = '<section class="card center">' + pinpo(110, 'cheer') + '<h1>' + h(deck.title) + ' 完了！</h1>' +
        '<p>' + deck.done + '枚がんばったね。そのうち「覚えた」は ' + deck.good + '枚！</p>' +
        '<div class="big-num">🔥 ' + studied + '<small>日連続</small></div><p>' + pick(LINES.done) + '</p>' +
        '<div class="stack"><a class="btn primary big" href="#home" id="endDeck">ホームへもどる</a></div></section>';
      return html;
    }
    var q = WPS.Q(deck.items[deck.i]);
    var u = WPS.UNIT_MAP[q.unit];
    var dm = deckMode(q);
    return '<div class="quiz-head"><button class="btn small ghost" id="quitDeck">✕ やめる</button><span>' + h(deck.title) + '</span><span>' + (deck.i + 1) + ' / ' + deck.items.length + '</span></div>' +
      '<div class="deck-nav"><button class="btn small" id="prevCard"' + (deck.i === 0 ? ' disabled' : '') + '>← 前のカード</button>' + (deck.back ? '<span class="muted">もどって見直し中(評価すると次へ進むよ)</span>' : '') + '</div>' +
      '<div class="progress"><i style="width:' + Math.round(deck.i / deck.items.length * 100) + '%"></i></div>' + modeSwitch(true) +
      '<div class="flash' + (deck.flipped ? ' flipped' : '') + '" id="flash" tabindex="0" role="button" aria-label="カードをめくる">' +
      '<div class="face front"><div class="q-meta">' + subjChip(u.subj) + '<span>' + h(qLabel(u)) + '</span></div><p class="q-text">' + h(q.text) + '</p>' +
      '<span class="tap">' + (dm === 'flip' ? 'タップしてめくる' : '下で答えてね') + '</span></div>' +
      '<div class="face back"><p class="back-q"><small class="muted">問題</small>' + h(q.text) + '</p>' + (deck.my ? '<p class="my-ans ' + (deck.my.ok ? 'ok' : 'ng') + '">あなたの答え:' + h(deck.my.text) + (deck.my.ok ? ' <span class="mk-in ok">○ 正解</span>' : ' <span class="mk-in ng">✕ 不正解</span>') + '</p>' : '') + '<small class="muted">答え</small><p class="answer">' + h(q.answer) + '</p><p class="exp">' + h(q.exp) + '</p></div></div>' +
      (speakText(q) ? '<button class="btn small say-btn" id="sayBtn">🔊 発音を聞く</button>' : '') +
      (deck.flipped ? '' : dm === 'choice' ? '<div class="choices deck-choices">' + shuffle(q.choices).map(function (c) { return '<button class="choice" data-dc="' + h(c) + '"><span>' + h(c) + '</span></button>'; }).join('') + '</div>'
        : dm === 'write' ? writeBox('dWrite') : '') +
      '<div class="grade' + (deck.flipped ? '' : ' hidden') + '">' +
      '<button class="btn g-again" data-g="again">😣 まだ</button><button class="btn g-hard" data-g="hard">🤔 あいまい</button><button class="btn g-good" data-g="good">😊 覚えた</button></div>' +
      '<p class="hint center">' + (dm === 'flip' ? 'キーボード:スペースでめくる ／ 1・2・3 で評価 ／ ← で前のカード' : '答えた後、1・2・3 で覚え具合を評価') + '</p>';
  }
  renderDeck.after = function () {
    var end = document.getElementById('endDeck');
    if (end) { end.addEventListener('click', function () { deck = null; }); return; }
    var flash = document.getElementById('flash');
    function flip() {
      deck.flipped = !deck.flipped;
      flash.classList.toggle('flipped', deck.flipped);
      view.querySelector('.grade').classList.toggle('hidden', !deck.flipped);
      var hc = view.querySelector('.hint-choices');
      if (hc) hc.style.display = deck.flipped ? 'none' : '';
    }
    var dq = WPS.Q(deck.items[deck.i]);
    if (deckMode(dq) === 'flip' || deck.flipped) flash.addEventListener('click', flip);
    bindModeSwitch();
    function showResult(text, ok) {
      deck.my = { text: text, ok: ok };
      judgeMark(ok ? 'ok' : 'ng');
      deck.flipped = true; render();
    }
    view.querySelectorAll('[data-dc]').forEach(function (b) { b.addEventListener('click', function () { var c = b.getAttribute('data-dc'); showResult(c, c === dq.answer); }); });
    bindWriteBox('dWrite', function (text) {
      if (isMatch(text, dq.answer)) { showResult(text, true); return; }
      selfCheck('dWrite', text, dq.answer, function (ok) { showResult(text, ok); });
    });
    document.getElementById('quitDeck').addEventListener('click', function () { deck = null; render(); });
    document.getElementById('prevCard').addEventListener('click', prevCard);
    var sb = document.getElementById('sayBtn');
    if (sb) sb.addEventListener('click', function (e) { e.stopPropagation(); speak(speakText(WPS.Q(deck.items[deck.i]))); });
    view.querySelectorAll('[data-g]').forEach(function (b) {
      b.addEventListener('click', function () { gradeCard(b.getAttribute('data-g')); });
    });
    renderDeck.flip = flip;
  };
  // 前のカードにもどる(答えを見た状態で表示する)
  function prevCard() {
    if (!deck || deck.i === 0) return;
    deck.i--; deck.flipped = true; deck.my = null; deck.back = true;
    render();
  }
  function gradeCard(g) {
    var qid = deck.items[deck.i];
    WPS.SRS.grade(qid, g);
    showMsgs(WPS.Quest.onAnswer(g === 'good', { small: true }).msg);
    deck.done++;
    if (g === 'good') deck.good++;
    if (g === 'again' && !deck.again[qid]) { deck.again[qid] = true; deck.items.push(qid); } // もう一度出す
    deck.i++; deck.flipped = false; deck.my = null; deck.back = false;
    if (g === 'good' && Math.random() < 0.35) toast(pick(LINES.correct));
    render();
  }
  document.addEventListener('keydown', function (e) {
    if (!deck || (location.hash !== '#cards') || deck.i >= deck.items.length) return;
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.target && e.target.closest && e.target.closest('form')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevCard(); return; }
    if (e.key === ' ') { if (deckMode(WPS.Q(deck.items[deck.i])) !== 'flip' && !deck.flipped) return; e.preventDefault(); if (renderDeck.flip) renderDeck.flip(); }
    else if (deck.flipped && { '1': 1, '2': 1, '3': 1 }[e.key]) gradeCard({ '1': 'again', '2': 'hard', '3': 'good' }[e.key]);
  });

  /* ========== 家庭教師用 指導分析レポート ========== */
  function renderTutor() {
    var s = S.get(), p = s.profile;
    var rm = R.build();
    var stats = rm.stats;
    var t = rm.target;
    var testAttempts = s.attempts.filter(function (a) { return a.src !== 'card'; });
    var last14 = 0;
    for (var i = 0; i < 14; i++) { if (WPS.Streak.studiedDays()[D.add(D.today(), -i)] === 'study') last14++; }

    var viewing = S.isView();
    var html = viewBanner(p) + '<div class="tabs"><a class="on" href="#tutor">👩‍🏫 先生用</a><a href="#parent">👪 保護者用</a></div>' +
      '<section class="card no-print-bg"><div class="row-between"><h1>👩‍🏫 指導分析レポート</h1><div class="btns">' +
      (EMBED ? '' : '<button class="btn small" id="printBtn">🖨️ 印刷</button>') +
      (viewing ? '' : '<button class="btn small" id="shareTutor">🔗 先生にリンクで送る</button><label class="btn small">📥 生徒データ読込<input type="file" id="importFile" accept="application/json" hidden></label>') + '</div></div>' +
      '<p class="muted">作成日:' + D.today() + ' ／ 生徒の解答データから自動で分析しています。</p>' +
      '<table class="kv"><tr><th>生徒</th><td>' + h(p.name || '(未設定)') + '(' + h(p.grade) + ')</td></tr>' +
      '<tr><th>志望校</th><td>' + h(t.school ? t.school.name : '未設定') + ' ' + h(p.schoolName) + ' ' + h(p.track) + '</td></tr>' +
      '<tr><th>本番まで</th><td>' + rm.days + '日(' + h(t.exam) + ')</td></tr>' +
      '<tr><th>学習の継続</th><td>連続 ' + WPS.Streak.count() + '日 ／ 直近14日のうち ' + last14 + '日学習</td></tr>' +
      '<tr><th>解答数</th><td>テスト・演習 ' + testAttempts.length + '問 ／ 単語帳 ' + (s.attempts.length - testAttempts.length) + '枚</td></tr></table></section>';

    if (!testAttempts.length) {
      html += kptReport();
      return html + '<section class="card">' + say('まだ診断データがありません。生徒に診断テストを受けてもらってから、生徒の端末の「先生にリンクで送る」で届いたリンクを開いてください。', 'think', 56) + '</section>';
    }

    // 科目別・思考レベル別
    var ss = A.subjectStats();
    html += dashboard(s, stats, { title: '学習状況ダッシュボード' });
    html += '<section class="card"><h2>① 教科・科目別、思考レベル別の正答率</h2><div class="table-scroll"><table class="grid grid2"><thead><tr><th>科目</th><th>全体</th><th>知識</th><th>理解</th><th>応用</th></tr></thead><tbody>';
    var diags = '';
    function cell(x) { var v = x.n ? x.c / x.n : null; return '<td class="' + (v === null ? '' : v < 0.5 ? 'bad' : v < 0.8 ? 'mid' : 'good') + '">' + pct(v) + '<small>' + (x.n ? '(' + x.n + ')' : '') + '</small></td>'; }
    // 科目ごとに、全体と思考レベル別の正答数を数える
    function courseStats(g, c) {
      var ids = {}; WPS.courseUnits(g, c).forEach(function (u) { ids[u.id] = true; });
      var r = { all: { n: 0, c: 0 }, 1: { n: 0, c: 0 }, 2: { n: 0, c: 0 }, 3: { n: 0, c: 0 } };
      s.attempts.forEach(function (a) {
        if (!ids[a.u] || a.src === 'card') return;
        r.all.n++; if (a.ok) r.all.c++;
        var q = a.q && WPS.Q(a.q);
        if (q) { r[q.level].n++; if (a.ok) r[q.level].c++; }
      });
      return r;
    }
    function unitStats(ids) {
      var set = {}; ids.forEach(function (id) { set[id] = true; });
      var r = { all: { n: 0, c: 0 }, 1: { n: 0, c: 0 }, 2: { n: 0, c: 0 }, 3: { n: 0, c: 0 } };
      s.attempts.forEach(function (a) {
        if (!set[a.u] || a.src === 'card') return;
        r.all.n++; if (a.ok) r.all.c++;
        var q = a.q && WPS.Q(a.q);
        if (q) { r[q.level].n++; if (a.ok) r[q.level].c++; }
      });
      return r;
    }
    var diagDone = {};
    WPS.CURRICULUM.filter(function (g) { return !g.guideOnly && ss[g.subj] && ss[g.subj].n; }).forEach(function (g) {
      var rows = g.courses.filter(function (c) { return !c.guide; }).map(function (c) { return { c: c, st: courseStats(g, c) }; }).filter(function (x) { return x.st.all.n; });
      if (!rows.length) return;
      var gIds = []; rows.forEach(function (x) { gIds = gIds.concat(x.c.units || []); });
      var gst = unitStats(gIds);
      html += '<tr class="g-head"><th colspan="5">' + h(g.name) + '</th></tr>';
      rows.forEach(function (x) {
        var tg = 'tg_' + x.c.id;
        html += '<tr class="c-row" data-tg="' + tg + '" tabindex="0" role="button" aria-expanded="false">' +
          '<td class="c-name"><span class="tg-arrow" aria-hidden="true">▸</span>' + h(x.c.short || x.c.name) + '</td>' + cell(x.st.all) + cell(x.st[1]) + cell(x.st[2]) + cell(x.st[3]) + '</tr>';
        // クリックで開く:項目 → 単元ごとの正答率
        var groups = x.c.areas || [{ name: '', units: x.c.units || [] }];
        var sub = '';
        groups.forEach(function (ar) {
          var us = ar.units.filter(function (id) { return unitStats([id]).all.n; });
          if (ar.name) sub += '<div class="u-area">' + h(ar.name) + (us.length ? '' : '<small>(未解答)</small>') + '</div>';
          us.forEach(function (id) {
            var st = unitStats([id]);
            sub += '<div class="u-line"><span>' + h(WPS.UNIT_MAP[id].name) + '</span>' + ['all', 1, 2, 3].map(function (k) { var v = st[k].n ? st[k].c / st[k].n : null; return '<i class="' + (v === null ? '' : v < 0.5 ? 'bad' : v < 0.8 ? 'mid' : 'good') + '">' + pct(v) + '</i>'; }).join('') + '</div>';
          });
        });
        html += '<tr class="u-rows" id="' + tg + '" hidden><td colspan="5"><div class="u-head"><span>単元</span><i>全体</i><i>知識</i><i>理解</i><i>応用</i></div>' + sub + '</td></tr>';
      });
      if (rows.length > 1) html += '<tr class="g-total"><td class="c-name">' + h(g.name) + 'の合計</td>' + cell(gst.all) + cell(gst[1]) + cell(gst[2]) + cell(gst[3]) + '</tr>';
      if (!diagDone[g.subj]) { diagDone[g.subj] = 1; diags += '<li><b>' + h(WPS.SUBJECTS[g.subj].name) + '</b>:' + h(A.levelDiagnosis(A.levelStats(g.subj))) + '</li>'; }
    });
    html += '</tbody>';
    html += '</table></div><h3>指導方針の診断</h3><ul class="bullets">' + diags + '</ul><p class="hint">科目名(数A など)をタップすると、項目・単元ごとの正答率が開きます。知識=用語・公式を覚えているか／理解=それを使えるか／応用=組み合わせて解けるか。( )内は解答数。</p></section>';

    // 最優先単元
    var focus = rm.units.filter(function (id) { return stats[id].status === 'weak' || stats[id].status === 'soso'; })
      .sort(function (a, b) { return A.priority(b, t.weights, stats) - A.priority(a, t.weights, stats); });
    // 根本原因を先に
    var ordered = [];
    focus.forEach(function (id) {
      A.rootCauses(id, stats).forEach(function (r) {
        if ((r.status === 'weak' || r.status === 'soso') && ordered.indexOf(r.id) < 0) ordered.push(r.id);
      });
      if (ordered.indexOf(id) < 0) ordered.push(id);
    });
    var top = ordered.slice(0, 6);
    html += '<section class="card"><h2>② 指導すべき単元(優先順)</h2><p class="muted">志望校での重要度 × 苦手度 × 「他の単元の土台になっているか」で順位をつけ、根本原因になっている単元を先に並べています。</p>';
    if (!top.length) html += '<p>現時点で大きな苦手は見つかっていません。応用問題・過去問演習を中心に指導してください。</p>';
    top.forEach(function (id, n) {
      var u = WPS.UNIT_MAP[id], st = stats[id];
      var roots = A.rootCauses(id, stats);
      var dependentsWeak = WPS.UNITS.filter(function (x) { return x.prereq.indexOf(id) >= 0 && (stats[x.id].status === 'weak' || stats[x.id].status === 'soso'); });
      var mis = A.mistakes(id).slice(0, 4);
      html += '<div class="tutor-unit"><h3>' + (n + 1) + '. ' + WPS.SUBJECTS[u.subj].name + '「' + h(u.name) + '」(' + u.stage + ') ' + statusChip(st.status) + ' <small>正答率 ' + pct(st.acc) + '(直近' + st.n + '問)</small></h3>';
      if (dependentsWeak.length) html += '<p class="root">⚠️ この単元は「' + dependentsWeak.map(function (x) { return h(x.name); }).join('」「') + '」の土台です。ここを直すと、上の単元もまとめて改善が見込めます。</p>';
      if (roots.length) html += '<p class="root">🔍 さらに前の単元:' + roots.map(function (r) { return h(WPS.UNIT_MAP[r.id].name) + '(' + WPS.UNIT_MAP[r.id].stage + '・' + STATUS[r.status].label + ')'; }).join(' → ') + (roots.some(function (r) { return r.status === 'untested'; }) ? '。未診断の単元は、授業の最初に口頭で確認してください。' : '') + '</p>';
      html += '<dl><dt>つまずきの原因と教え方</dt><dd>' + h(u.tip) + '</dd>' +
        '<dt>口頭試問(生徒に説明させる質問)</dt><dd><ul>' + u.oral.map(function (o) { return '<li>' + h(o) + '</li>'; }).join('') + '</ul></dd>';
      if (mis.length) {
        html += '<dt>誤答の記録(生徒が選んだ答え)</dt><dd><ul>' + mis.map(function (a) {
          var q = WPS.Q(a.q);
          return '<li>' + h(q.text) + '<br><span class="bad-t">生徒:' + (a.unsure ? 'わからない' : h(a.ch)) + '</span> ／ <span class="good-t">正解:' + h(q.answer) + '</span> <span class="lv lv' + q.level + '">' + WPS.LEVELS[q.level] + '</span></li>';
        }).join('') + '</ul></dd>';
      }
      var orals = s.attempts.filter(function (a) { return a.u === id && a.src === 'oral'; });
      html += '<dt>口頭試問の結果を記録</dt><dd>' + (viewing ? '<small class="muted">記録は生徒の端末で行います(授業中に生徒の端末で、この画面を開いてください)。</small>'
        : '<div class="btns"><button class="btn small g-good" data-oral="' + id + '" data-ok="1">○ 説明できた</button><button class="btn small g-again" data-oral="' + id + '" data-ok="0">✕ 説明できなかった</button></div>') +
        (orals.length ? '<small class="muted">これまで:' + orals.slice(-5).map(function (a) { return (a.ok ? '○' : '✕') + a.d.slice(5).replace('-', '/'); }).join(' ') + '</small>' : '') + '</dd>';
      html += '</dl></div>';
    });
    html += '</section>';
    html += recordsReport(s.records || []);

    // 質問メモ
    var memos = s.memos.filter(function (m) { return !m.done; });
    html += '<section class="card"><h2>③ 生徒からの質問(授業の最初に解消)</h2>' + (memos.length ? '<ul class="bullets">' + memos.slice(-10).map(function (m) {
      return '<li>' + (m.unit ? '[' + h(WPS.UNIT_MAP[m.unit].name) + '] ' : '') + h(m.text) + '</li>';
    }).join('') + '</ul>' : '<p class="muted">未解決の質問はありません。</p>') + '</section>';

    // 次回の授業プラン
    var main = top[0] ? WPS.UNIT_MAP[top[0]] : null;
    html += '<section class="card"><h2>④ 次回30分の授業プラン</h2><table class="plan">' +
      '<tr><th>0〜5分</th><td><b>質問の解消</b>:③の質問から優先度の高いものを解説' + (memos.length ? '(' + memos.length + '件)' : '') + '</td></tr>' +
      '<tr><th>5〜20分</th><td><b>根本単元の解説</b>:' + (main ? '「' + h(main.name) + '」— ' + h(main.tip) : '過去問の解き直し') + '</td></tr>' +
      '<tr><th>20〜30分</th><td><b>口頭試問</b>:' + (main ? main.oral.map(h).join(' ／ ') : '解き方の方針を生徒に説明させる') + '<br><small>→ 説明できなかった点は、次回までの宿題として単語帳に追加</small></td></tr></table>' +
      '<p class="hint">企画書の方針どおり、「問題を解かせる時間」は授業に入れず、事前の自習(単語帳・問題集)に回しています。</p></section>';

    // 1か月(8回)の指導計画
    html += '<section class="card"><h2>⑤ 今後8回(約1か月)の指導計画</h2><table class="plan">';
    for (var k = 0; k < 8; k++) {
      var uid = top.length ? top[Math.floor(k / 2) % top.length] : null;
      var uu = uid ? WPS.UNIT_MAP[uid] : null;
      var what = !uu ? '過去問演習の解説・答案添削' : (k % 2 === 0 ? '「' + h(uu.name) + '」の解説と口頭試問' : '「' + h(uu.name) + '」の定着確認(応用問題)→ 克服できたら次の単元へ');
      if (k === 7) what += '<br><small>＋ 再診断テストの結果を確認し、計画を更新</small>';
      html += '<tr><th>第' + (k + 1) + '回</th><td>' + what + '</td></tr>';
    }
    html += '</table></section>';
    html += MK.historyCard().replace('模試の記録', '生徒の模試の記録');
    html += weekSummary('生徒の今週のまとめ');
    html += whyCard('生徒のミスの原因(直近30日)');
    html += kptReport();
    return html;
  }
  renderTutor.after = function () {
    var pb = document.getElementById('printBtn');
    if (pb) pb.addEventListener('click', function () { window.print(); });
    var sb = document.getElementById('shareTutor');
    if (sb) sb.addEventListener('click', shareLink);
    // 科目の行をタップすると、項目・単元ごとの正答率を開く
    view.querySelectorAll('.c-row[data-tg]').forEach(function (r) {
      function tog() {
        var t = document.getElementById(r.getAttribute('data-tg'));
        var open = t.hidden; t.hidden = !open;
        r.setAttribute('aria-expanded', open); r.classList.toggle('open', open);
      }
      r.addEventListener('click', tog);
      r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
    });
    view.querySelectorAll('[data-oral]').forEach(function (b) {
      b.addEventListener('click', function () {
        var uid = b.getAttribute('data-oral'), ok = b.getAttribute('data-ok') === '1';
        var st = S.get();
        st.attempts.push({ q: null, u: uid, s: WPS.UNIT_MAP[uid].subj, ok: ok, ch: null, unsure: !ok, src: 'oral', t: Date.now(), d: D.today() });
        if (!ok) { // 説明できなかった単元は、次回までの宿題として単語帳に入れる
          st.extraUnits = st.extraUnits || [];
          if (st.extraUnits.indexOf(uid) < 0) st.extraUnits.push(uid);
        }
        S.save();
        toast(ok ? '記録しました。克服に一歩近づきました！' : '記録しました。この単元を単語帳の宿題に追加しました');
        render();
      });
    });
    var f = document.getElementById('importFile');
    if (f) f.addEventListener('change', function () { importFile(f.files[0], function () { render(); }); });
  };

  function importFile(file, cb) {
    if (!file) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        ask('この端末のデータを、読み込んだデータで置きかえます。よろしいですか?', '置きかえる', function () {
          try { S.importJSON(r.result); toast('データを読み込みました'); if (cb) cb(); } catch (e) { toast('読み込めませんでした:' + e.message); }
        });
      } catch (e) { alert('読み込めませんでした:' + e.message); }
    };
    r.readAsText(file);
  }

  /* ========== 質問メモ ========== */
  function renderMemo(unitId) {
    var s = S.get();
    var html = say('わからなかったことは、ここに書いておこう。家庭教師の先生の30分授業で、まとめて解決できるよ。', 'normal', 56);
    html += '<section class="card"><form id="memoForm" class="form"><label>単元(任意)<select name="unit"><option value="">選ばない</option>' +
      WPS.UNITS.map(function (u) { return '<option value="' + u.id + '"' + (u.id === unitId ? ' selected' : '') + '>' + WPS.SUBJECTS[u.subj].name + ':' + h(u.name) + '</option>'; }).join('') +
      '</select></label><label>質問したいこと<textarea name="text" rows="3" required placeholder="例:平方完成で、なぜ半分にして2乗するのかわからない"></textarea></label>' +
      '<button class="btn primary" type="submit">メモに追加</button></form></section>';
    var open = s.memos.filter(function (m) { return !m.done; }).reverse();
    var done = s.memos.filter(function (m) { return m.done; }).reverse();
    html += '<section class="card"><h2>未解決(' + open.length + ')</h2>' + memoList(open) + '</section>';
    if (done.length) html += '<section class="card"><details><summary>解決ずみ(' + done.length + ')</summary>' + memoList(done) + '</details></section>';
    return html;
  }
  function memoList(list) {
    if (!list.length) return '<p class="muted">ありません。</p>';
    return '<ul class="memos">' + list.map(function (m) {
      return '<li class="' + (m.done ? 'done' : '') + '"><div>' + (m.unit ? '<small>' + h(WPS.UNIT_MAP[m.unit].name) + '</small>' : '') + h(m.text) + '</div>' +
        '<button class="btn small" data-memo="' + m.id + '">' + (m.done ? '戻す' : '解決した') + '</button><button class="btn small ghost" data-del="' + m.id + '" aria-label="削除">🗑</button></li>';
    }).join('') + '</ul>';
  }
  renderMemo.after = function () {
    var s = S.get();
    document.getElementById('memoForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(e.target);
      s.memos.push({ id: Date.now(), unit: fd.get('unit') || null, text: fd.get('text').trim(), t: Date.now(), done: false });
      var day = S.day(); day.checks.memo = true;
      WPS.Streak.touch();
      S.save();
      toast('メモしたよ！ 先生に聞いてみよう');
      render();
    });
    view.querySelectorAll('[data-memo]').forEach(function (b) {
      b.addEventListener('click', function () {
        var m = s.memos.filter(function (x) { return String(x.id) === b.getAttribute('data-memo'); })[0];
        if (m) { m.done = !m.done; S.save(); if (m.done) toast('解決できたね、すごい！'); render(); }
      });
    });
    view.querySelectorAll('[data-del]').forEach(function (b) {
      b.addEventListener('click', function () {
        s.memos = s.memos.filter(function (x) { return String(x.id) !== b.getAttribute('data-del'); });
        S.save(); render();
      });
    });
  };

  /* ========== 設定 ========== */
  function renderSettings() {
    var s = S.get(), p = s.profile;
    var perm = WPS.Notify.permission();
    var permLabel = { granted: '✅ 許可されています', denied: '⛔ ブロックされています(ブラウザの設定から許可してください)', default: '未設定', unsupported: 'このブラウザは通知に対応していません' }[perm];
    var html = '<section class="card"><h2>プロフィール・志望校</h2>' + profileForm(p, '保存する') + '</section>';
    html += '<section class="card"><h2>テーマカラー</h2><p class="muted small">アプリ全体の色を選べます。文字の読みやすさ(コントラスト)は、どの色でも保つようにしています。</p><div class="pal-list">' + PALETTES.map(function (x) {
      return '<button type="button" class="pal' + ((p.palette || 'sky') === x[0] ? ' on' : '') + '" data-pal="' + x[0] + '" aria-pressed="' + ((p.palette || 'sky') === x[0]) + '"><span class="pal-sw">' + x[2].map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span><b>' + x[1] + '</b></button>';
    }).join('') + '</div></section>';
    var tg = R.target();
    html += '<section class="card"><h2>📊 配点を募集要項に合わせる</h2>' +
      '<p class="muted">志望校・学部の募集要項にある配点を見て、科目ごとの重要度を入れてください。一番配点が高い科目を100にして、ほかを割合で入れます。<br>例:英語200点・数学200点・国語100点 → 英語100、数学100、国語50(受験しない科目は0)</p>' +
      '<form id="weightsForm" class="weights-form">' + Object.keys(WPS.SUBJECTS).map(function (k) {
        var v = Math.round(((tg.custom ? tg.weights[k] : tg.defaultWeights[k]) || 0) * 100);
        return '<div class="wrow"><span>' + WPS.SUBJECTS[k].name + '</span><input type="range" min="0" max="100" step="5" name="' + k + '" value="' + v + '" aria-label="' + WPS.SUBJECTS[k].name + 'の重要度"><output>' + v + '</output></div>';
      }).join('') +
      '<div class="btns"><button class="btn primary" type="submit">この配点で保存</button><button class="btn" type="button" id="resetWeights">一般的な傾向に戻す</button></div></form>' +
      '<p class="hint">' + (tg.custom ? '✅ いまは、あなたが入力した配点を使っています。' : 'いまは、一般的な傾向の配点を使っています。') + '</p></section>';
    html += '<section class="card"><h2>🔔 連続記録のリマインド通知</h2>' +
      say('設定した時刻になっても今日の勉強がまだなら、ぼくがお知らせするよ。夜22時を過ぎたら「記録が切れそう！」ってもう一度教えるね。', 'normal', 48) +
      '<p>通知の状態:' + permLabel + '</p>' +
      '<label class="switch"><input type="checkbox" id="notifyOn"' + (p.notify ? ' checked' : '') + '> 通知を受け取る</label>' +
      '<label>お知らせする時刻<input type="time" id="remindAt" value="' + h(p.reminder) + '"></label>' +
      '<div class="btns"><button class="btn" id="testNotify">通知をテストする</button><button class="btn" id="icsBtn">📅 カレンダーに毎日のリマインドを登録</button></div>' +
      '<p class="hint">・アプリを開いている間、またはホーム画面に追加した場合(対応ブラウザ)に通知が届きます。<br>・iPhoneはSafariの「共有 → ホーム画面に追加」をしてから通知を許可してください(iOS 16.4以降)。<br>・確実に届けたい場合は「カレンダーに登録」がおすすめです。スマホのカレンダーアプリが毎日お知らせしてくれます。</p></section>';
    html += '<section class="card"><h2>📤 先生にデータを共有する</h2>' +
      '<p class="muted">ボタンを押すとリンクができます。LINEやメールで先生や保護者の方に送ると、リンクを開くだけで分析レポート(先生用・保護者用)を見られます(その時点のデータです)。</p>' +
      '<div class="btns"><button class="btn primary" id="shareBtn">🔗 先生に送るリンクを作る</button><a class="btn" href="#tutor">先生用レポートを見る</a></div>' +
      '<details><summary>ファイルでやり取りする</summary><div class="btns"><button class="btn" id="exportBtn">データを書き出す</button><label class="btn">データを読み込む<input type="file" id="importFile2" accept="application/json" hidden></label></div></details></section>';
    html += cloudSection();
    html += '<section class="card"><h2>リセット</h2><button class="btn danger" id="resetBtn">すべてのデータを消す</button></section>';
    return html;
  }
  renderSettings.after = function () {
    var s = S.get();
    bindProfileForm(function () { toast('保存したよ！ ロードマップも更新したよ'); render(); });
    var wf = document.getElementById('weightsForm');
    wf.querySelectorAll('input[type=range]').forEach(function (r) {
      r.addEventListener('input', function () { r.nextElementSibling.textContent = r.value; });
    });
    wf.addEventListener('submit', function (e) {
      e.preventDefault();
      var cw = {};
      wf.querySelectorAll('input[type=range]').forEach(function (r) { cw[r.name] = +r.value; });
      if (!Object.keys(cw).some(function (k) { return cw[k] > 0; })) { toast('どれか1つは0より大きくしてね'); return; }
      s.profile.customWeights = cw;
      S.save(); toast('配点を保存したよ！ ロードマップに反映したよ'); render();
    });
    document.getElementById('resetWeights').addEventListener('click', function () {
      s.profile.customWeights = null; S.save(); toast('一般的な傾向に戻したよ'); render();
    });
    document.getElementById('notifyOn').addEventListener('change', function (e) {
      if (e.target.checked) {
        WPS.Notify.request().then(function (perm) {
          s.profile.notify = perm === 'granted';
          if (perm === 'granted') WPS.Sync.subscribePush();
          S.save();
          toast(perm === 'granted' ? '通知をオンにしたよ！' : '通知が許可されませんでした');
          render();
        });
      } else { s.profile.notify = false; S.save(); }
    });
    document.getElementById('remindAt').addEventListener('change', function (e) {
      s.profile.reminder = e.target.value || '20:00';
      delete s.notified[D.today()];
      S.save(); toast('お知らせ時刻を ' + s.profile.reminder + ' にしたよ');
    });
    document.getElementById('testNotify').addEventListener('click', function () {
      var m = WPS.Notify.messages().last;
      WPS.Notify.show(m.title, m.body, 'wps-test').then(function (ok) {
        if (!ok) toast('通知を送れませんでした。先に「通知を受け取る」をオンにしてね');
      });
    });
    document.getElementById('icsBtn').addEventListener('click', function () {
      download('aqualium-reminder.ics', WPS.Notify.ics(), 'text/calendar');
    });
    document.getElementById('exportBtn').addEventListener('click', function () {
      download('aqualium_' + (s.profile.name || 'data') + '_' + D.today() + '.json', S.exportJSON(), 'application/json');
    });
    document.getElementById('importFile2').addEventListener('change', function (e) { importFile(e.target.files[0], render); });
    document.getElementById('shareBtn').addEventListener('click', shareLink);
    bindCloudSection();
    document.getElementById('resetBtn').addEventListener('click', function () {
      ask('本当にすべてのデータを消しますか?(元に戻せません)', '消す', function () { S.reset(); deck = null; quiz = null; go('#onboard'); });
    });
  };

  function download(name, text, type) {
    if (EMBED) { toast('この表示ではファイルを保存できません。アプリ単体で開くと使えます'); return; }
    var blob = new Blob([text], { type: type });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function viewBanner(p) {
    return S.isView() ? '<section class="info">👀 共有リンクから <b>' + h(p.name) + 'さん</b> のデータを表示しています(閲覧のみ・この端末には保存されません)。<a href="#home">自分の画面にもどる</a></section>' : '';
  }

  /* ========== 保護者向け 週間レポート ========== */
  function renderParent() {
    var s = S.get(), p = s.profile;
    var rm = R.build(), t = rm.target, stats = rm.stats;
    var today = D.today();
    function inRange(a, from, to) { return a.d >= from && a.d <= to; }
    var w1 = D.add(today, -6), w0 = D.add(today, -13), w0e = D.add(today, -7);
    var thisW = s.attempts.filter(function (a) { return inRange(a, w1, today) && a.src !== 'school'; });
    var lastW = s.attempts.filter(function (a) { return inRange(a, w0, w0e) && a.src !== 'school'; });
    function acc(list) { var q = list.filter(function (a) { return a.src !== 'card'; }); return q.length ? q.filter(function (a) { return a.ok; }).length / q.length : null; }
    var days = 0, set = WPS.Streak.studiedDays();
    for (var i = 0; i < 7; i++) if (set[D.add(today, -i)] === 'study') days++;
    // 克服した単元:以前に間違えたことがあり、いまは「得意」になった単元
    var overcome = WPS.UNITS.filter(function (u) {
      return stats[u.id].status === 'good' && s.attempts.some(function (a) { return a.u === u.id && !a.ok; });
    });
    var weakNow = rm.units.filter(function (id) { return stats[id].status === 'weak'; }).slice(0, 5);
    var w = R.currentWeek(rm);
    var phase = w ? WPS.PHASES.filter(function (x) { return x.key === w.phase; })[0] : null;
    var a1 = acc(thisW), a0 = acc(lastW);
    var trend = a1 === null || a0 === null ? '' : a1 > a0 + 0.02 ? '<span class="up">先週より ' + Math.round((a1 - a0) * 100) + 'ポイント上昇</span>' : a1 < a0 - 0.02 ? '<span class="down">先週より ' + Math.round((a0 - a1) * 100) + 'ポイント低下</span>' : '<span>先週と同じくらい</span>';
    var recs = (s.records || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 3);

    var comment;
    var newbie = p.created && D.diff(p.created, today) < 7;
    if (newbie && days < 5) comment = h(p.name) + 'さんは、学習を始めたばかりです。最初の1週間は「毎日少しでもアプリを開く」ことが目標です。始めたこと自体を、ぜひほめてあげてください。';
    else if (days >= 5) comment = 'この1週間、' + h(p.name) + 'さんは' + days + '日も学習に取り組みました。習慣がしっかり身についてきています。ぜひ「よく続いているね」と声をかけてあげてください。';
    else if (days >= 2) comment = 'この1週間の学習は' + days + '日でした。少しずつでも続けられています。「今日は何をやったの?」と、結果より取り組みに目を向けた声かけが効果的です。';
    else comment = 'この1週間は学習できた日が少なめでした。忙しい時期かもしれません。「1日5分だけ」から再開できるよう、責めずに見守っていただけると安心です。';

    var html = viewBanner(p) + '<div class="tabs"><a href="#tutor">👩‍🏫 先生用</a><a class="on" href="#parent">👪 保護者用</a></div>';
    html += '<section class="card"><h1>👪 保護者の方へ 週間レポート</h1><p class="muted">' + D.label(w1) + '〜' + D.label(today) + ' ／ ' + h(p.name) + 'さん(' + h(p.grade) + ')</p>' +
      '<div class="stat-row"><div><b>' + days + '<small>/7日</small></b><small>学習した日</small></div><div><b>' + thisW.length + '</b><small>解いた問題</small></div><div><b>' + pct(a1) + '</b><small>正答率</small></div></div>' +
      (trend ? '<p class="trend">正答率:' + trend + '</p>' : '') +
      say(comment, days >= 5 ? 'happy' : 'normal', 56) + '</section>';
    html += '<section class="card"><h2>志望校までの道のり</h2><table class="kv">' +
      '<tr><th>志望校</th><td>' + h(t.school ? t.school.name : '未設定') + ' ' + h(p.schoolName) + '</td></tr>' +
      '<tr><th>本番まで</th><td>あと' + rm.days + '日(' + h(t.exam) + ')' + milestoneLine(t) + '</td></tr>' +
      '<tr><th>いまの段階</th><td>' + (phase ? phase.emoji + ' ' + phase.name + '<br><small class="muted">' + h(phase.desc) + '</small>' : '—') + '</td></tr>' +
      '<tr><th>連続学習</th><td>' + WPS.Streak.count() + '日(最高 ' + WPS.Streak.best() + '日)</td></tr></table></section>';
    html += '<section class="card"><h2>🎉 克服した単元</h2>' + (overcome.length ? '<div class="chips">' + overcome.map(function (u) { return subjChip(u.subj) + ' <span class="ok-unit">' + h(u.name) + '</span>'; }).join('') + '</div><p class="hint">以前は間違えていたものの、最近の問題で8割以上正解できている単元です。</p>'
      : '<p class="muted">まだありません。苦手単元の練習を続けると、ここに増えていきます。</p>') + '</section>';
    html += '<section class="card"><h2>いま取り組んでいる苦手単元</h2>' + (weakNow.length ? '<div class="unit-list">' + weakNow.map(function (id) { return unitRow(id, stats); }).join('') + '</div>' : '<p class="muted">大きな苦手は見つかっていません。</p>') +
      (w && w.units.length ? '<p class="hint">今週の重点:' + w.units.map(function (id) { return h(WPS.UNIT_MAP[id].name); }).join('、') + '</p>' : '') + '</section>';
    if (recs.length) {
      html += '<section class="card"><h2>学校のテスト・模試</h2><ul class="bullets">' + recs.map(function (r) {
        return '<li>' + h(r.date) + ' ' + h(r.kind) + '・' + WPS.SUBJECTS[r.subj].name + ':' + r.score + '/' + r.max + '点</li>';
      }).join('') + '</ul></section>';
    }
    html += '<section class="card"><h2>ご家庭でできること</h2><ul class="bullets">' +
      '<li>点数よりも「続けていること」をほめてください。連続記録は本人の自信になります。</li>' +
      '<li>夜' + h(p.reminder) + 'ごろに、学習がまだのときはアプリから本人に通知が届きます。声かけはその後で十分です。</li>' +
      '<li>わからない問題は「先生への質問メモ」にたまり、30分の授業で解決します。家で教えきれなくても大丈夫です。</li></ul></section>';
    return html;
  }

  /* ========== 単語・用語の一覧(教科別) ========== */
  // [教科, 一覧の名前, データ名, 単元ID, 種類]
  var WORD_LISTS = [
    ['eng', '大学受験 基礎', 'en_h', 'e_h5', 'en'], ['eng', '早慶上理', 'en_sokei', null, 'en'], ['eng', '英単語(中学・仮)', 'en_m', 'e_vocab_m', 'en', 'jhOnly'], ['eng', '長文のつなぎ言葉', 'en_marker', 'e_h6', 'en'],
    ['jpn', '漢字の読み', 'kanji', 'j_kanji'], ['jpn', 'ことわざ・四字熟語・慣用句', 'goi', 'j_m1'], ['jpn', '品詞', 'hinshi', 'j_m2'], ['jpn', '敬語(現代)', 'keigo', 'j_keigo', 'keigo'], ['jpn', 'つなぎ言葉(接続語)', 'setsuzoku', 'j_h5'],
    ['jpn', '評論の重要語', 'hyoron', 'j_hyoron'], ['jpn', '歴史的仮名遣い', 'kana', 'j_h1'], ['jpn', '古文単語', 'kobun_bk', null, 'kobun'], ['jpn', '古文助動詞', 'jodoushi', 'j_h2', 'jodoushi'], ['jpn', '古文敬語', 'kokeigo', 'j_h3', 'kokeigo'],
    ['jpn', '漢文句法', 'kuho', 'j_h4', 'kuho'], ['jpn', '漢文の重要語', 'kanword', 'j_kanword', 'kanword'],
    ['sci', '電流と電気', 'denki', 's_m1'], ['sci', '力', 'chikara', 's_force'], ['sci', '光と音', 'hikari', 's_light'], ['sci', '化学変化', 'kagaku_m', 's_m2'], ['sci', '化学式', 'kagakushiki', 's_m2'], ['sci', 'イオン', 'ion', 's_ion'],
    ['sci', '元素記号', 'genso', 's_struct'], ['sci', '物質の構造', 'busshitsu', 's_struct'], ['sci', '酸と塩基', 'sanenki', 's_acid'], ['sci', '生物(中学)', 'seibutsu_m', 's_m3'], ['sci', '細胞・遺伝', 'saibo', 's_cell'],
    ['sci', '生物基礎', 'seibutsu_h', 's_h3'], ['sci', '生態系', 'seitaikei', 's_eco'], ['sci', '大地・天気', 'daichi', 's_m4'], ['sci', '天体', 'tentai', 's_space'], ['sci', '地学基礎', 'chigaku_h', 's_geo'],
    ['soc', '日本史 年表', 'jhistory', 'c_h1', 'year'], ['soc', '世界史 年表', 'whistory', 'c_h2', 'year'], ['soc', '世界史の人物', 'wperson', 'c_h2'], ['soc', '日本地理', 'jgeo', 'c_jgeo'], ['soc', '世界地理', 'wgeo', 'c_m1'],
    ['soc', '公民(政治)', 'seiji', 'c_m3'], ['soc', '公民(経済)', 'keizai', 'c_econ'], ['soc', '公共・政治経済', 'kokyo', 'c_h3'],
    ['info', '情報社会・ネットワーク', 'joho', 'i_net']
  ];
  // 旧データの中学英単語は、新しい中学英単語帳が入るまで中学生にだけ表示する
  function wordListOk(L, gr, stt) {
    if (L[5] === 'jhOnly' && !WPS.isJHStudent(gr)) return false;
    var u = WPS.UNIT_MAP[L[3]]; return !u || WPS.unitAllowed(u, gr, stt);
  }
  function wordItems(L) {
    var B = WPS.BANK[L[2]] || [], kind = L[4];
    return B.map(function (x) {
      if (kind === 'keigo') return { t: x.v, m: '尊敬語:' + x.s + ' ／ 謙譲語:' + x.k };
      if (kind === 'jodoushi') return { t: x.t, m: x.m, h: '接続:' + x.c };
      if (kind === 'kokeigo') return { t: x.t, m: x.m, h: x.k };
      if (kind === 'kuho') return { t: x.f, m: x.m, h: '読み:' + x.r + '(' + x.k + ')' };
      if (kind === 'kanword') return { t: x.t, m: x.m, h: '読み:' + x.r };
      if (kind === 'year') { var y = +x.t; return { t: (y < 0 ? '紀元前' + (-y) : y) + '年', m: x.m, h: x.h + (L[2] === 'jhistory' ? '時代' : '') }; }
      return { t: x.t, m: x.m, h: x.h, d: x.d, part: x.part, bk: x.bk };
    });
  }
  var wordState = { subj: 'eng', list: 0, q: '' };
  function renderWords() {
    var gr = S.get().profile.grade, stt = A.allStats();
    var okList = function (L) { return wordListOk(L, gr, stt); };
    var subs = Object.keys(WPS.SUBJECTS).filter(function (k) { return WORD_LISTS.some(function (x) { return x[0] === k && okList(x); }); });
    if (subs.indexOf(wordState.subj) < 0) wordState.subj = subs[0];
    var lists = WORD_LISTS.map(function (L, i) { return { L: L, i: i }; }).filter(function (x) { return x.L[0] === wordState.subj && okList(x.L); });
    if (!lists.some(function (x) { return x.i === wordState.list; })) wordState.list = lists[0].i;
    var L = WORD_LISTS[wordState.list], items = wordItems(L);
    var q = wordState.q, shown = items.filter(function (x) { return !q || (x.t + x.m + (x.h || '')).indexOf(q) >= 0; });
    var total = WORD_LISTS.filter(okList).reduce(function (n, x) { return n + (WPS.BANK[x[2]] || []).length; }, 0);
    var html = say('ここには、このアプリに入っている単語・用語がぜんぶ載っているよ(全' + total + '語)。眺めるだけでも記憶に残るよ。覚えたら「テスト」でたしかめよう！', 'normal', 56);
    html += '<section class="card"><h1>📖 単語・用語の一覧</h1>' +
      '<div class="filter-row"><span class="f-label">教科</span>' + seg('wsubj', subs.map(function (k) { return [k, WPS.SUBJECTS[k].name]; }), wordState.subj) + '</div>' +
      '<div class="filter-row"><span class="f-label">種類</span><div class="seg">' + lists.map(function (x) {
        return '<button type="button" class="seg-btn' + (x.i === wordState.list ? ' on' : '') + '" data-wlist="' + x.i + '">' + h(x.L[1]) + '<small> ' + (WPS.BANK[x.L[2]] || []).length + '</small></button>';
      }).join('') + '</div></div>' +
      '<label class="grow">検索<input id="wq" value="' + h(q) + '" placeholder="単語・意味で検索"></label>' +
      '<div class="btns word-acts"><button class="btn primary" id="wTest">✏️ この一覧で単語テスト(10問)</button><button class="btn" id="wDeck">🃏 単語帳で覚える</button><a class="btn" href="#vocab" id="wVt">単語トレーニング(赤シート・聞き流しなど)</a></div>' +
      '<div class="print-opts"><b class="small">印刷して使う</b><label class="small">印刷する範囲<select id="wRange">' + (function () {
        var n = shown.length, o = '';
        for (var a = 0; a < n; a += 100) o += '<option value="' + a + '">' + (a + 1) + '〜' + Math.min(n, a + 100) + '番</option>';
        return o + '<option value="all">すべて(' + n + '語)</option>';
      })() + '</select></label><div class="btns"><button class="btn small" data-wprint="list">一覧を印刷</button><button class="btn small" data-wprint="test-m">テスト用(意味をかくす)</button><button class="btn small" data-wprint="test-t">テスト用(見出しをかくす)</button></div><p class="hint">印刷画面で「PDFに保存」を選ぶと、PDFにもできます。検索でしぼりこんだ単語だけを印刷できます。</p></div></section>';
    html += '<section class="card"><h2>' + h(L[1]) + ' <small class="muted">' + shown.length + '語</small></h2><ul class="wordlist">' + shown.slice(0, wordState.limit || 200).map(function (x) {
      var sp = L[4] === 'en' && 'speechSynthesis' in window ? '<button class="btn small ghost w-say" data-say="' + h(x.t) + '" aria-label="' + h(x.t) + 'の発音を聞く">発音</button>' : '';
      return '<li><div class="w-body"><b>' + h(x.t) + '</b><span>' + h(x.m) + '</span>' + (x.h ? '<small>💡 ' + h(x.h) + '</small>' : '') + '</div>' + sp + '</li>';
    }).join('') + '</ul>' + (shown.length > (wordState.limit || 200) ? '<button class="btn big" id="wMore" type="button">続きを表示(あと' + (shown.length - (wordState.limit || 200)) + '語)</button>' : '') + '</section>';
    return html;
  }
  renderWords.after = function () {
    function re() { var y = window.scrollY, f = document.activeElement && document.activeElement.id; view.innerHTML = noEmoji(renderWords()); renderWords.after(); if (f === 'wq') { var el = document.getElementById('wq'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); } window.scrollTo(0, y); }
    var wm = document.getElementById('wMore'); if (wm) wm.addEventListener('click', function () { wordState.limit = (wordState.limit || 200) + 300; re(); });
    view.querySelectorAll('[data-f="wsubj"]').forEach(function (b) { b.addEventListener('click', function () { wordState.limit = 200; wordState.subj = b.getAttribute('data-v'); wordState.list = -1; wordState.q = ''; re(); }); });
    view.querySelectorAll('[data-wlist]').forEach(function (b) { b.addEventListener('click', function () { wordState.list = +b.getAttribute('data-wlist'); re(); }); });
    var wq = document.getElementById('wq'), tm;
    wq.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { wordState.q = wq.value.trim(); re(); }, 250); });
    view.querySelectorAll('[data-say]').forEach(function (b) { b.addEventListener('click', function () { speak(b.getAttribute('data-say')); }); });
    var L = WORD_LISTS[wordState.list], u = WPS.UNIT_MAP[L[3]];
    function ids(n) { var a = []; for (var i = 0; i < n; i++) a.push(WPS.genId(u.id)); return a; }
    // 印刷:今の一覧(検索でしぼりこんだ結果)を、紙で使いやすい表にして印刷する
    view.querySelectorAll('[data-wprint]').forEach(function (b) {
      b.addEventListener('click', function () {
        var mode = b.getAttribute('data-wprint'), L2 = WORD_LISTS[wordState.list], q2 = wordState.q;
        var items = wordItems(L2).filter(function (x) { return !q2 || (x.t + x.m + (x.h || '')).indexOf(q2) >= 0; });
        var rg = document.getElementById('wRange').value, base = rg === 'all' ? 0 : +rg;
        if (rg !== 'all') items = items.slice(base, base + 100);
        var hideM = mode === 'test-m', hideT = mode === 'test-t';
        var title = L2[1] + (mode === 'list' ? '' : hideM ? ' テスト(意味を書く)' : ' テスト(見出しを書く)');
        var rows = items.map(function (x, i) {
          return '<tr><td class="pn">' + (base + i + 1) + '</td><td class="pt">' + (hideT ? '' : h(x.t)) + '</td><td class="pm">' + (hideM ? '' : h(x.m)) + '</td><td class="pc"></td></tr>';
        }).join('');
        var html = '<div class="print-sheet"><div class="ps-head"><b>' + h(title) + '</b><span>' + (base + 1) + '〜' + (base + items.length) + '番(' + items.length + '語)</span><span>名前:____________</span><span>日付:____/____</span></div>' +
          '<table><thead><tr><th>No.</th><th>' + (L2[4] === 'year' ? '年' : '見出し') + '</th><th>意味</th><th>✓</th></tr></thead><tbody>' + rows + '</tbody></table>' +
          (mode === 'list' ? '' : '<p class="ps-note">答え合わせは、アプリの単語一覧で確認しよう。</p>') + '</div>';
        var old = document.getElementById('printArea'); if (old) old.remove();
        var div = document.createElement('div'); div.id = 'printArea'; div.innerHTML = html; document.body.appendChild(div);
        document.body.classList.add('printing-words');
        var done = function () { document.body.classList.remove('printing-words'); var a = document.getElementById('printArea'); if (a) a.remove(); window.removeEventListener('afterprint', done); };
        window.addEventListener('afterprint', done);
        if (EMBED) { toast('この画面では印刷できません。ブラウザで直接開いてください'); done(); return; }
        window.print();
        setTimeout(function () { if (!window.matchMedia || !window.matchMedia('print').matches) done(); }, 1500);
      });
    });
    document.getElementById('wTest').addEventListener('click', function () { startQuiz(ids(10), 'study', L[1] + 'のテスト'); });
    document.getElementById('wVt').addEventListener('click', function () { VT.setList(wordState.list); });
    document.getElementById('wDeck').addEventListener('click', function () { startDeck(ids(20), L[1]); });
  };



  /* ---------- 画面の演出(動きは0.3秒前後・控えめ。「動きを減らす」設定では出さない) ---------- */
  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = null;
  function motion() {
    // ページ切り替え:ふわっと表示
    view.classList.remove('pg-in'); void view.offsetWidth; if (!REDUCE) view.classList.add('pg-in');
    // スクロールでフェードイン(画面に入ったカードから)
    if (!REDUCE && 'IntersectionObserver' in window) {
      if (io) io.disconnect();
      io = new IntersectionObserver(function (es) { var k = 0; es.forEach(function (e) { if (e.isIntersecting) { e.target.style.transitionDelay = Math.min(k++, 4) * 70 + 'ms'; e.target.classList.add('fx-on'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
      [].slice.call(view.querySelectorAll('section.card, .page-toc')).forEach(function (el, i) {
        if (el.getBoundingClientRect().top < window.innerHeight) return; // 最初から見えているものは動かさない
        el.classList.add('fx'); io.observe(el);
      });
    }
    // 吹き出し・解説の太字に蛍光ペン
    [].slice.call(view.querySelectorAll('.bubble b, .exp b, .say b')).forEach(function (b) { b.classList.add('mk-hl'); });
    // スクロールの進み具合(長いページだけ)
    var bar = document.getElementById('scrollBar');
    if (!bar) { bar = document.createElement('div'); bar.id = 'scrollBar'; bar.className = 'scroll-bar'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar); window.addEventListener('scroll', motion.bar, { passive: true }); }
    motion.bar();
  }
  motion.bar = function () {
    // 目次などで一気に移動したとき、通り過ぎたカードも必ず表示する
    [].slice.call(document.querySelectorAll('#view .fx:not(.fx-on)')).forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('fx-on'); });
    var bar = document.getElementById('scrollBar'); if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > window.innerHeight * 1.5 ? Math.min(1, window.scrollY / h) : 0) + ')';
  };
  // 押した場所から波紋(リップル)
  document.addEventListener('pointerdown', function (e) {
    if (REDUCE) return;
    var t = e.target.closest && e.target.closest('.btn, .choice, .vt-ch, .seg-btn, .wq-chip, .vt-mode, .vb-book, .vk-item, .sp-choice');
    if (!t || t.disabled) return;
    var r = t.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, sp = document.createElement('span');
    sp.className = 'ripple'; sp.style.width = sp.style.height = d + 'px';
    sp.style.left = (e.clientX - r.left - d / 2) + 'px'; sp.style.top = (e.clientY - r.top - d / 2) + 'px';
    if (getComputedStyle(t).position === 'static') t.style.position = 'relative';
    t.classList.add('rp-host'); t.appendChild(sp);
    setTimeout(function () { sp.remove(); }, 550);
  }, { passive: true });
  /* ---------- テーマカラー(配色パレット) ---------- */
  var PALETTES = [
    ['sky', '晴天スカイ(標準)', ['#04143a', '#1146d6', '#0fa3b8']],
    ['sage', '朝露セージ', ['#2f4a3f', '#3f7a5e', '#8fb59a']],
    ['navy', '月光ネイビー', ['#1c2d4a', '#405d85', '#8199bb']],
    ['coral', '珊瑚の砂浜', ['#4a3a3a', '#c4574b', '#e7a99a']],
    ['grape', '霜のブルーベリー', ['#2e2a4d', '#5b4f9e', '#b7b6d6']],
    ['amber', 'シネマアンバー', ['#352f2a', '#9a5f22', '#d2ae6e']]
  ];
  function applyPalette() { var p = S.get().profile.palette || 'sky'; document.documentElement.setAttribute('data-palette', p); }
  WPS.applyPalette = applyPalette;
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-pal]'); if (!b) return;
    S.get().profile.palette = b.getAttribute('data-pal'); S.save(); applyPalette();
    view.querySelectorAll('[data-pal]').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    toast('テーマカラーを「' + b.querySelector('b').textContent + '」にしました');
  });
  // 数字を0から増やして見せる(カウントアップ。整数だけ・0.6秒)
  function countUp() {
    if (REDUCE) return;
    view.querySelectorAll('.big-num, .kpi-v, .vt-kpi b, .sc-num, .lc b, .vt-ring b, .st-top b').forEach(function (el) {
      var tn = [].slice.call(el.childNodes).filter(function (n) { return n.nodeType === 3 && /^\s*\d[\d,]*\s*$/.test(n.nodeValue); })[0];
      if (!tn) return;
      var end = +tn.nodeValue.replace(/[^\d]/g, ''), comma = tn.nodeValue.indexOf(',') >= 0; if (end < 2) return;
      var t0 = performance.now(), dur = 600;
      (function step(t) { var k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3))); tn.nodeValue = comma ? v.toLocaleString() : String(v); if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }
  /* ---------- 長いページの目次と「上へ」ボタン ---------- */
  function pageTools() {
    motion();
    countUp();
    var old = document.getElementById('toTop'); if (old) old.remove();
    var hs = [].slice.call(view.querySelectorAll('section.card > h2:first-child, section.card > .row-between > h2, section.card > div > h2:first-child')).filter(function (x) { return x.offsetParent !== null && x.textContent.trim(); });
    if (document.documentElement.scrollHeight > window.innerHeight * 3) {
      var b = document.createElement('button'); b.id = 'toTop'; b.type = 'button'; b.className = 'to-top'; b.setAttribute('aria-label', 'ページの上へ');
      b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg>';
      b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      document.body.appendChild(b);
      var onS = function () { b.classList.toggle('show', window.scrollY > window.innerHeight); };
      window.removeEventListener('scroll', pageTools.s || onS); pageTools.s = onS; window.addEventListener('scroll', onS, { passive: true }); onS();
    }
    if (hs.length < 6) return;
    var nav = document.createElement('nav'); nav.className = 'page-toc'; nav.setAttribute('aria-label', 'このページの目次');
    hs.forEach(function (x, i) {
      var id = 'sec-' + i; x.id = x.id || id;
      var a = document.createElement('a'); a.href = '#'; a.textContent = x.textContent.replace(/[(（].*$/, '').trim().slice(0, 14);
      a.addEventListener('click', function (e) { e.preventDefault(); var y = x.getBoundingClientRect().top + window.scrollY - nav.getBoundingClientRect().bottom - 8; window.scrollTo({ top: y, behavior: 'smooth' }); });
      nav.appendChild(a);
    });
    var band = view.querySelector('.page-band');
    if (band) band.insertAdjacentElement('afterend', nav); else view.insertBefore(nav, view.firstChild);
    var tb = document.querySelector('.topbar'); if (tb) nav.style.top = tb.getBoundingClientRect().height + 'px';
    // スクロールスパイ:いま読んでいる見出しを目次で光らせる
    var links = [].slice.call(nav.querySelectorAll('a'));
    var spy = function () {
      if (!nav.isConnected) { window.removeEventListener('scroll', spy); return; }
      var line = nav.getBoundingClientRect().bottom + 24, cur = 0;
      hs.forEach(function (x, i) { if (x.getBoundingClientRect().top <= line) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
      var on = links[cur]; if (on && (on.offsetLeft < nav.scrollLeft || on.offsetLeft + on.offsetWidth > nav.scrollLeft + nav.clientWidth)) nav.scrollLeft = on.offsetLeft - 12;
    };
    window.addEventListener('scroll', spy, { passive: true }); spy();
  }
  // 隠れるヘッダー:下へ読むと上のバーが隠れ、上へ戻すと出てくる
  (function () {
    var last = 0;
    window.addEventListener('scroll', function () {
      var tb = document.querySelector('.topbar'); if (!tb) return;
      var y = window.scrollY;
      tb.classList.toggle('tb-hide', y > 120 && y > last + 4);
      if (y < last - 4 || y < 120) tb.classList.remove('tb-hide');
      last = y;
    }, { passive: true });
  })();
  /* ========== 単語トレーニング(js/vocab.js) ========== */
  var VT = WPS.makeVocab({
    h: h, toast: toast, judgeMark: judgeMark, shuffle: shuffle, render: render, WORD_LISTS: WORD_LISTS, wordItems: wordItems,
    okList: function (L) { return wordListOk(L, S.get().profile.grade, A.allStats()); }
  });
  function renderVocab() { return VT.render(); }
  var RJ = WPS.makeRonjutsu({ h: h, toast: toast, shuffle: shuffle, render: render });
  function renderRon() { return RJ.render(); }
  var WQ = WPS.makeWhq({ h: h, toast: toast, shuffle: shuffle, judgeMark: judgeMark, render: render });
  var JQ = WPS.makeWhq({ h: h, toast: toast, shuffle: shuffle, judgeMark: judgeMark, render: render }, { key: 'jhq', route: '#jhq', name: '日本史', rs: 'jh', Q: function () { return WPS.JHQ; }, M: function () { return WPS.JHQ_META; }, yb: 'jhistory' });
  function renderWhq() { return WQ.render(); }
  renderWhq.after = function () { WQ.after(); };
  function renderJhq() { return JQ.render(); }
  renderJhq.after = function () { JQ.after(); };
  renderRon.after = function () { RJ.after(); };
  renderVocab.after = function () { VT.after(); };

  /* ========== 教科別の勉強法・季節ごとのミッション ========== */
  function guideSteps(steps) {
    return steps.map(function (st, i) {
      return '<details class="guide"' + (i === 0 ? ' open' : '') + '><summary>' + h(st[0]) + '</summary><ul class="bullets">' + st[1].map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul></details>';
    }).join('');
  }
  function guideSection(t, subs) {
    var html = '<section class="card"><h2>📖 教科別の勉強法</h2>';
    if (t.isHigh) html += '<div class="guide-box"><h3>🏫 高校受験の進め方</h3><p>' + h(WPS.HIGH_GUIDE.lead) + '</p>' + guideSteps(WPS.HIGH_GUIDE.steps) + '</div>';
    html += '<div class="seg guide-tabs" role="tablist">' + subs.map(function (k, i) {
      return '<button type="button" class="seg-btn' + (i === 0 ? ' on' : '') + '" data-guide="' + k + '">' + WPS.SUBJECTS[k].name + '</button>';
    }).join('') + '</div>';
    subs.forEach(function (k, i) {
      var g = WPS.SUBJECT_GUIDE[k];
      var cg = WPS.CURRICULUM.filter(function (x) { return x.subj === k; })[0];
      html += '<div class="guide-panel" data-panel="' + k + '"' + (i === 0 ? '' : ' hidden') + '><p class="guide-lead">' + h(g.lead) + '</p>' +
        (cg ? '<div class="mext-box"><b>📘 文部科学省が求めている力</b><ul class="bullets">' + cg.mext.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></div>' : '') + guideSteps(g.steps) +
        '<div class="guide-ng"><b>⚠️ よくある失敗</b><ul class="bullets">' + g.mistakes.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></div></div>';
    });
    html += '<details class="guide"><summary>📘 実技・探究の科目(体育・芸術・家庭・理数探究・総合的な探究)</summary><p class="muted">共通テストにはない科目ですが、実技試験や総合型選抜で使われることがあります。くわしくは「診断」→「単元をえらんで練習」の教科ボタンから見られます。</p><ul class="bullets">' +
      WPS.CURRICULUM.filter(function (x) { return x.guideOnly; }).map(function (x) { return '<li><b>' + h(x.name) + '</b>:' + x.courses.map(function (c) { return h(c.name); }).join('・') + '</li>'; }).join('') + '</ul></details>';
    return html + '</section>';
  }
  // 季節ごとのミッション(国公立志望は「共通テスト＋2次」の1年間の流れ)
  function seasonSection(t) {
    var p = t.profile, nat = t.school && t.school.kind === 'national';
    var S = nat ? [
      ['🌸 春', [3, 4, 5], '基礎固めの最重要時期', ['2次試験で使う主要科目(英語・数学など)の基礎を徹底的に仕上げる。', '6月末までに「中堅私大(日東駒専)レベルの基礎問題が確実に解ける」状態を目指す。', '「1年かけてゆっくり」ではなく、時期ごとの期限を意識する。春の基礎固めをおろそかにしないことが逆転合格のカギ。']],
      ['🌻 夏', [6, 7, 8], '演習と共通テスト対策の開始', ['主要科目は、難しめの問題演習(アウトプット)に進む。', '共通テストだけで使う科目(社会、理科の2科目目など)の対策を並行して始める。']],
      ['🍁 秋', [9, 10, 11], '志望校に合わせたバランス調整', ['志望校の配点(共通テストと2次の比率)に合わせて、2次対策と共通テスト対策のバランスを決める。', '模試の結果を基準に、共通テストの実戦演習を本格化させる。']],
      ['❄️ 冬', [12, 1, 2], '本番直前の対策', ['12月は予想問題集などで、共通テストの本番シミュレーションをくり返す。', '1月:共通テスト本番。', '共通テストが終わったら、2月25日からの2次試験に向けてすぐに対策を切りかえる。']]
    ] : t.isHigh ? [
      ['🌸 春', [3, 4, 5], '中1・中2の総復習', ['苦手単元を中1の内容までさかのぼって確認する。', '定期テスト対策で内申点を上げる。']],
      ['🌻 夏', [6, 7, 8], '弱点の克服', ['夏休みは1日6〜8時間が目安。5教科の苦手をまとめてつぶす。']],
      ['🍁 秋', [9, 10, 11], '過去問スタート', ['9月ごろから志望校の過去問を始める(5〜10年分)。', '2学期の定期テストまでが内申点に入ることが多い。']],
      ['❄️ 冬', [12, 1, 2], '仕上げ', ['本番と同じ時間割で過去問を解く。', '新しいことより、まちがえた問題の総復習を優先する。']]
    ] : [
      ['🌸 春', [3, 4, 5], '基礎固め', ['英語・数学・国語の基礎(単語・文法・計算)を固める。']],
      ['🌻 夏', [6, 7, 8], '演習の開始', ['基礎を固めつつ、志望校の過去問に触れて傾向をつかむ。']],
      ['🍁 秋', [9, 10, 11], '過去問演習', ['志望校の過去問を時間を計って解き、間違いの原因を分析する。']],
      ['❄️ 冬', [12, 1, 2], '直前の仕上げ', ['まちがえた問題の総復習。体調管理も大切。']]
    ];
    var m = new Date().getMonth() + 1;
    var html = '<section class="card"><h2>🗓️ 季節ごとのミッション' + (nat ? '(国公立志望)' : '') + '</h2><div class="seasons">';
    S.forEach(function (x) {
      var now = x[1].indexOf(m) >= 0;
      html += '<div class="season' + (now ? ' now' : '') + '"><div class="season-head"><b>' + x[0] + '</b><small>' + x[1].map(function (n) { return n + '月'; }).join('・') + '</small>' + (now ? '<span class="status st-good">いまここ</span>' : '') + '</div><p class="season-goal">' + h(x[2]) + '</p><ul class="bullets">' + x[3].map(function (y) { return '<li>' + h(y) + '</li>'; }).join('') + '</ul></div>';
    });
    return html + '</div></section>';
  }
  /* ========== レベル ========== */
  function levelCard() {
    var L = WPS.Level.info(), s = S.get();
    var up = s.lastLevel && L.level > s.lastLevel;
    if (s.lastLevel !== L.level) { s.lastLevel = L.level; S.save(); }
    if (up) setTimeout(function () { dialog('<div class="center">' + pinpo(96, 'cheer') + '<h2>🎉 レベルアップ！</h2><p class="lv-big">Lv.' + L.level + '</p><p>称号:<b>' + h(L.title) + '</b></p><p>ここまで続けてきたきみは、本当にすごいよ！</p></div>', [{ label: 'やったね！', cls: 'primary' }]); }, 300);
    return '<section class="card level"><div class="lv-row"><div class="lv-badge">Lv.' + L.level + '</div><div class="lv-main"><b>' + h(L.title) + '</b><div class="progress"><i style="width:' + L.pct + '%"></i></div><small class="muted">次のレベルまで ' + (L.to - L.xp) + ' XP' + (L.nextTitle ? ' ／ Lv.' + L.nextAt + 'で「' + h(L.nextTitle) + '」' : '') + '</small></div></div>' +
      '<p class="hint">問題を解く・単語帳・単語トレーニング・やる事のチェック・連続記録で経験値(XP)がたまるよ。まちがえても、挑戦した分の XP が入るよ。難関レベルの正解と5問連続正解には、ボーナスがつくよ。</p></section>';
  }

  /* ========== 大学データ(偏差値・共通テスト得点率) ========== */
  function goalLabel(g) { return g.approx ? g.univ + '(学部・方式で異なる)' : g.univ + ' ' + g.dept + '(' + g.sched + ')'; }
  // いまの志望校(本命)に合った目標だけを使う。
  //  ・大学データで選んだ学部が本命の大学と同じ → その学部の数値
  //  ・ちがう/未設定 → 本命の大学の偏差値の目安(登録データの最大値)
  function goalMatches(g, school) {
    if (!g || !school) return false;
    var u = school.univ || '';
    return u ? g.univ === u : school.name.indexOf(g.univ) >= 0;
  }
  function activeGoal(p) {
    var school = WPS.SCHOOL_MAP[p.schoolId];
    if (goalMatches(p.goal, school)) return p.goal;
    if (school && !school.hensaMax && school.kind !== 'high') {
      var alt = WPS.SCHOOL_MAP['u~' + (school.kind === 'national' ? 'nat' : 'pri') + '~' + school.name.replace(/大学$/, '')];
      if (alt && alt.hensaMax) school = alt;
    }
    if (school && school.hensaMax) return { univ: school.name, dept: '', sched: '', hensa: school.hensaMax, kyotsu: null, approx: true, src: school.kind === 'national' ? WPS.UNIV_SOURCES[2027] : WPS.UNIV_PRIVATE_SOURCE };
    return null;
  }
  // 目標とのちがいを表示するカード
  /* ========== 志望校との差の見える化(あとどれだけやればよいか) ========== */
  // 偏差値と正答率の関係は、アプリの推定式(engine.js の estimate)と同じ:偏差値 ＝ 50 ＋ 10×(正答率−0.6)÷0.18
  function accForHensa(hz) { return Math.max(0, Math.min(1, 0.6 + (hz - 50) * 0.018)); }
  function gapSection(p, g, est) {
    if (!g || !g.hensa) return '';
    var rm = R.build(), t = rm.target, today = D.today();
    var goalH = g.hensa, nowH = est.hensa;
    var html = '<div class="gap">';
    // ① 偏差値のものさし(35〜75)
    var lo = 35, hi = 75, pos = function (v) { return Math.max(0, Math.min(100, (v - lo) / (hi - lo) * 100)); };
    var plan = backPlan(rm).filter(function (x) { return x.kind === 'month' || x.kind === 'base'; });
    var cps = plan.map(function (x) { var m = (x.detail.match(/偏差値 ([\d.]+)/) || [])[1]; return m ? { d: x.date, v: +m } : null; }).filter(Boolean);
    html += '<h3>偏差値のものさし</h3><div class="ruler">' +
      '<div class="ruler-track">' + (nowH !== null ? '<i class="ruler-fill" style="left:' + pos(Math.min(nowH, goalH)) + '%;width:' + Math.abs(pos(goalH) - pos(nowH)) + '%"></i>' : '') +
      [40, 45, 50, 55, 60, 65, 70].map(function (v) { return '<b class="tick" style="left:' + pos(v) + '%"><small>' + v + '</small></b>'; }).join('') +
      cps.map(function (c) { return '<b class="cp" style="left:' + pos(c.v) + '%" title="' + D.label(c.d) + 'までに ' + c.v + '"></b>'; }).join('') +
      (nowH !== null ? '<span class="pin now" style="left:' + pos(nowH) + '%"><em>いま ' + nowH + '</em></span>' : '') +
      '<span class="pin goal" style="left:' + pos(goalH) + '%"><em>目標 ' + goalH + '</em></span></div></div>';
    if (nowH === null) return html + '<p class="hint">診断テストや練習であと ' + Math.max(0, 15 - est.n) + ' 問答えると、いまの位置と差が表示されます。</p></div>';
    var diff = Math.round((goalH - nowH) * 10) / 10;
    html += '<p class="gap-msg ' + (diff <= 0 ? 'ok' : '') + '">' + (diff <= 0 ? '目標ラインに届いています。このまま維持して、過去問で得点を安定させよう。' : '目標まで <b>あと ' + diff + '</b>(偏差値)。小さな点は、毎月の中間目標です。') + '</p>';
    // ② あとこれだけやれば(正答率・単元数・時間に置きかえる)
    var accNow = accForHensa(nowH), accGoal = accForHensa(goalH);
    var weak = rm.units.filter(function (id) { return rm.stats[id].status === 'weak' || rm.stats[id].status === 'soso'; });
    var untested = rm.units.filter(function (id) { return rm.stats[id].status === 'untested'; });
    var prStart = (rm.phases.filter(function (x) { return x.key === 'practice'; })[0] || {}).start || t.exam;
    var weeksLeft = Math.max(1, Math.ceil(D.diff(today, prStart) / 7)), daysLeft = Math.max(1, D.diff(today, prStart));
    // 未診断の単元にも、診断済みと同じ割合で苦手があると見込んで足す
    var pool = WPS.UNITS.filter(function (u) { return t.weights[u.subj] > 0 && WPS.unitAllowed(u, p.grade, rm.stats); });
    var testedU = pool.filter(function (u) { return rm.stats[u.id].status !== 'untested'; });
    var weakU = testedU.filter(function (u) { return rm.stats[u.id].status === 'weak' || rm.stats[u.id].status === 'soso'; });
    var ratio = testedU.length ? weakU.length / testedU.length : 0.5;
    var guess = Math.round(untested.length * ratio), need = weak.length + guess;
    var perWeek = Math.ceil(need / weeksLeft), minsPerDay = Math.ceil(need * 150 / daysLeft / 5) * 5;
    var probs = need * 30;
    var capH = Math.min(goalH, Math.max(60, nowH)), hardN = goalH > capH ? Math.ceil((goalH - capH) / 2.5) * 60 : 0;
    html += '<h3>あとこれだけやれば届く(目安)</h3>' +
      '<div class="two-step"><div><small>①苦手単元の克服(基礎〜標準)</small><b>' + nowH + ' → ' + capH + '</b></div>' + (hardN ? '<div><small>②標準・難関レベルの演習と過去問</small><b>' + capH + ' → ' + goalH + '</b></div>' : '') + '</div>' +
      '<div class="todo-grid">' +
      '<div class="tg"><small>正答率</small><div class="tg-bar"><i style="width:' + Math.round(accNow * 100) + '%"></i><b style="left:' + Math.round(accGoal * 100) + '%"></b></div><span>いま ' + Math.round(accNow * 100) + '% → 目標 ' + Math.round(accGoal * 100) + '%</span></div>' +
      '<div class="tg"><small>苦手単元を「得意」に</small><b class="tg-num">' + need + '<em>単元</em></b><span>判明 ' + weak.length + '＋未診断から見込み ' + guess + '/週 ' + perWeek + ' 単元(' + weeksLeft + '週)</span></div>' +
      '<div class="tg"><small>解く問題の目安</small><b class="tg-num">' + probs + '<em>問</em></b><span>1単元 約30問 × ' + need + '単元</span></div>' +
      (hardN ? '<div class="tg"><small>標準・難関レベルの問題</small><b class="tg-num">' + hardN + '<em>問</em></b><span>偏差値 ' + capH + '→' + goalH + ' の分(2.5 上げるごとに約60問)</span></div><div class="tg"><small>志望校の過去問</small><b class="tg-num">5<em>年分</em></b><span>実戦期から、時間を計って解く</span></div>' : '') +
      '<div class="tg"><small>1日の勉強時間の目安</small><b class="tg-num">' + WPS.Time.label(Math.max(15, minsPerDay)) + '</b><span>苦手単元の分(1単元 約150分)</span></div>' +
      '</div>' + (untested.length ? '<p class="hint">まだ診断していない単元が ' + untested.length + ' あります(今の苦手の割合から ' + guess + ' 単元を見込みに入れています)。診断を進めると、必要な量がより正確になります。</p>' : '');
    // ③ 教科ごとの差(どの教科を上げると近づくか)
    var subs = Object.keys(t.weights).filter(function (k) { return t.weights[k] > 0; }).map(function (k) { var e = A.estimate(k); return { k: k, h: e.hensa, w: t.weights[k] }; }).filter(function (x) { return x.h !== null; });
    if (subs.length) {
      subs.sort(function (a, b) { return (goalH - b.h) * b.w - (goalH - a.h) * a.w; });
      html += '<h3>教科ごとの差</h3><ul class="subj-gap">' + subs.map(function (x, i) {
        var d = Math.round((goalH - x.h) * 10) / 10;
        return '<li><span class="sg-name">' + h(WPS.SUBJECTS[x.k].name) + (i === 0 && d > 0 ? '<em>最優先</em>' : '') + '</span><span class="sg-bar"><i style="width:' + pos(x.h) + '%;background:' + WPS.SUBJECTS[x.k].color + '"></i><b style="left:' + pos(goalH) + '%"></b></span><span class="sg-v ' + (d > 0 ? 'ng' : 'ok') + '">' + (d > 0 ? 'あと' + d : '到達') + '</span></li>';
      }).join('') + '</ul><p class="hint">縦線が目標の偏差値。差 × 志望校での重要度が大きい順に並べています。</p>';
    }
    // ④ 大学のはしご(いまの位置〜目標の間にある大学)
    var kind = t.school ? t.school.kind : 'private', list = (WPS.univSchools ? WPS.univSchools() : []).filter(function (s) { return s.kind === kind && s.hensaMax; });
    if (list.length && diff > 0) {
      var steps = [], v;
      for (v = Math.floor(nowH / 2.5) * 2.5; v <= goalH + 0.01; v += 2.5) steps.push(v);
      var ladder = steps.reverse().map(function (sv) {
        var hits = list.filter(function (s) { return s.hensaMax === sv; }).slice(0, 3).map(function (s) { return s.name; });
        return { v: sv, names: hits };
      }).filter(function (x) { return x.names.length || x.v === steps[0]; }).slice(0, 7);
      html += '<h3>目標までの大学のはしご(' + (kind === 'national' ? '国公立' : '私立') + ')</h3><ol class="ladder">' + ladder.map(function (x) {
        var cls = x.v <= nowH ? 'reach' : x.v >= goalH ? 'goal' : '';
        return '<li class="' + cls + '"><b>' + x.v.toFixed(1) + '</b><span>' + (x.names.length ? h(x.names.join('・')) : '—') + '</span>' + (cls === 'reach' ? '<em>いま届く</em>' : cls === 'goal' ? '<em>目標</em>' : '') + '</li>';
      }).join('') + '</ol><p class="hint">大学データに登録された「その大学の最高の偏差値」で並べた目安です(河合塾 2027年度入試難易予想を参考)。学部・方式で違うので、必ず大学データで確認してください。</p>';
    }
    return html + '<p class="hint">「いま」はこのアプリの問題の正答状況からの推定で、模試の偏差値とは異なります。必要な量は「1単元 約30問・約150分」「苦手単元の克服で届くのは偏差値60前後まで」「そこから 2.5 上げるごとに標準・難関レベル約60問」と仮定した目安です。</p></div>';
  }
  function goalCard(p, inline) {
    var g = activeGoal(p), est = A.estimate();
    var body;
    if (!g) {
      body = '<p class="muted">目標の大学・学部を設定すると、合格の目安(共通テスト得点率・偏差値)と、いまの推定位置を比べられるよ。</p><a class="btn small" href="#univ">🏫 大学データから目標を選ぶ</a>';
    } else {
      var rows = '<tr><th></th><th>目標(目安)</th><th>いまの推定</th><th>差</th></tr>';
      function row(label, goal, now, unit) {
        var diff = (goal !== null && now !== null) ? Math.round((now - goal) * 10) / 10 : null;
        return '<tr><th>' + label + '</th><td>' + (goal !== null ? goal + unit : '—') + '</td><td>' + (now !== null ? now + unit : '—') + '</td><td class="' + (diff === null ? '' : diff >= 0 ? 'good-t' : 'bad-t') + '">' + (diff === null ? '—' : (diff >= 0 ? '+' : '') + diff + unit) + '</td></tr>';
      }
      rows += (g.kyotsu !== null && g.kyotsu !== undefined ? row('共通テスト得点率', g.kyotsu, est.kyotsu, '%') : '') + row('偏差値', g.hensa, est.hensa, '');
      body = '<p><b>🎯 ' + h(goalLabel(g)) + '</b></p>' + (g.approx ? '<p class="hint">大学全体の偏差値の目安(登録データの最大値)です。<a href="#univ">大学データ</a>で志望学部を「目標にする」と、学部ごとの数値になります。</p>' : '') + '<div class="table-scroll"><table class="kv goal-t">' + rows + '</table></div>' +
        (est.hensa === null ? '<p class="hint">推定には、テストや練習であと ' + Math.max(0, 15 - est.n) + ' 問の解答が必要です。</p>' :
          '<p class="hint">「いまの推定」は、このアプリの問題の正答状況から計算した目安です。模試の偏差値とは異なります。</p>') +
        (g.score ? '<p class="hint">共通テストのボーダー:' + h(g.score) + '点</p>' : '') + '<p class="hint">目安の出典:' + h(g.src || WPS.UNIV_SOURCES[g.year] || '') + '</p>';
    }
    return '<section class="card goal"><h2>📍 目標と現在地</h2>' + body + gapSection(p, g, est) + '</section>';
  }
  /* ========== 大学データ(条件を組み合わせて探す) ========== */
  var UF_KEY = 'wps_univ_filter', UF_SAVED = 'wps_univ_saved', UF_FAV = 'wps_univ_fav';
  function ufDefault() { return { year: '', kinds: { nat: 1, pri: 1 }, fields: {}, areas: {}, scheds: {}, subj: {}, hMin: '', hMax: '', kMin: '', kMax: '', q: '', fav: 0, shown: 0, open: { kind: 1, field: 1 } }; }
  function ufLoad(key) { try { var v = JSON.parse(localStorage.getItem(key) || 'null'); if (v) { var d = ufDefault(); Object.keys(d).forEach(function (k) { if (v[k] === undefined) v[k] = d[k]; }); return v; } } catch (e) { /* 保存できない環境でも動く */ } return null; }
  function ufStore(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* 無視 */ } }
  var uf = ufLoad(UF_KEY) || ufDefault();
  var univState = uf; // 旧コードとの互換
  function favSet() { try { return JSON.parse(localStorage.getItem(UF_FAV) || '{}'); } catch (e) { return {}; } }
  function rowKey(r) { return (r.kind === 'pri' ? 'p' : 'n') + '|' + r.univ + '|' + r.dept + '|' + r.sched; }
  function univAll(year) {
    var a = []; if (uf.kinds.nat) a = a.concat(WPS.univRows(year).map(function (r) { r.kind = r.kind || 'nat'; return r; }));
    if (uf.kinds.pri) a = a.concat(WPS.univPrivRows(year));
    return a;
  }
  function anyOn(o) { return Object.keys(o).some(function (k) { return o[k]; }); }
  function ufCount() {
    return (anyOn(uf.fields) ? 1 : 0) + (anyOn(uf.areas) ? 1 : 0) + (anyOn(uf.scheds) ? 1 : 0) + (anyOn(uf.subj) ? 1 : 0) +
      (uf.hMin || uf.hMax ? 1 : 0) + (uf.kMin || uf.kMax ? 1 : 0) + (uf.q ? 1 : 0) + (uf.fav ? 1 : 0);
  }
  function ufMatch(r, fav) {
    if (anyOn(uf.fields) && !uf.fields[r.field]) return false;
    if (anyOn(uf.areas) && !uf.areas[r.area]) return false;
    if (anyOn(uf.scheds) && !uf.scheds[r.kind === 'pri' ? '私立一般' : r.schedKey]) return false;
    if (anyOn(uf.subj)) { if (r.kind !== 'pri' || !uf.subj[r.subjects >= 4 ? '4' : String(r.subjects)]) return false; }
    if (uf.hMin && !(r.hensa !== null && r.hensa >= +uf.hMin)) return false;
    if (uf.hMax && !(r.hensa !== null && r.hensa <= +uf.hMax)) return false;
    if (uf.kMin && !(r.kyotsu !== null && r.kyotsu >= +uf.kMin)) return false;
    if (uf.kMax && !(r.kyotsu !== null && r.kyotsu <= +uf.kMax)) return false;
    if (uf.q && (r.univ + r.dept).indexOf(uf.q) < 0) return false;
    if (uf.fav && !fav[rowKey(r)]) return false;
    return true;
  }
  function ufSection(id, title, on, body) {
    return '<details class="uf-sec"' + (uf.open[id] ? ' open' : '') + ' data-ufsec="' + id + '"><summary><span class="uf-dot' + (on ? ' on' : '') + '" aria-hidden="true"></span>' + title +
      (on ? '<small class="uf-on">条件あり</small>' : '') + '</summary><div class="uf-body">' + body +
      (on ? '<button type="button" class="btn small ghost uf-clear" data-ufclear="' + id + '">× 条件をクリア</button>' : '') + '</div></details>';
  }
  function ufChecks(group, opts) {
    return '<div class="uf-checks">' + opts.map(function (o) {
      var v = Array.isArray(o) ? o[0] : o, lab = Array.isArray(o) ? o[1] : o;
      return '<label class="uf-ck"><input type="checkbox" data-ufg="' + group + '" value="' + h(v) + '"' + (uf[group][v] ? ' checked' : '') + '> <span>' + h(lab) + '</span></label>';
    }).join('') + '</div>';
  }
  function ufSelect(id, val, opts, ph) {
    return '<select data-ufv="' + id + '"><option value="">' + ph + '</option>' + opts.map(function (v) { return '<option' + (String(v) === String(val) ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select>';
  }
  function renderUniv() {
    var years = WPS.univYears();
    if (!uf.year) uf.year = years[0];
    var all = [].concat(WPS.univRows(uf.year).map(function (r) { r.kind = r.kind || 'nat'; return r; }), WPS.univPrivRows(uf.year));
    var rows = univAll(uf.year), fav = favSet();
    var uniq = function (arr) { return arr.filter(function (x, i, a) { return x && a.indexOf(x) === i; }); };
    var fields = uniq(all.map(function (r) { return r.field; }));
    var areas = uniq(all.map(function (r) { return r.area; }));
    var list = rows.filter(function (r) { return ufMatch(r, fav); });
    var nUniv = uniq(list.map(function (r) { return r.univ; })).length;
    var est = A.estimate(), goal = S.get().profile.goal;
    var hOpts = []; for (var x = 35; x <= 75; x += 2.5) hOpts.push(x.toFixed(1));
    var kOpts = []; for (var y = 40; y <= 95; y += 5) kOpts.push(y);
    var html = say('条件を組み合わせて、志望校の候補をさがそう。気になる学部は「目標にする」を押すと、ホームとロードマップに今の自分との差が出るよ。', 'normal', 56);
    html += '<section class="card uf"><div class="row-between"><h2>各種条件から探す</h2>' +
      '<label class="uf-year">年度 ' + ufSelect('year', uf.year, years, '年度') + '</label></div>' +
      '<p class="muted">学部系統・地域・難易度・入試日程などで、大学をしぼりこめます。</p>' +
      ufSection('kind', '設置区分', !(uf.kinds.nat && uf.kinds.pri), '<div class="uf-checks"><label class="uf-ck"><input type="checkbox" data-ufkind="nat"' + (uf.kinds.nat ? ' checked' : '') + '> <span>国公立</span></label><label class="uf-ck"><input type="checkbox" data-ufkind="pri"' + (uf.kinds.pri ? ' checked' : '') + '> <span>私立</span></label></div>') +
      ufSection('field', '学部系統', anyOn(uf.fields), '<button type="button" class="btn small" data-ufall="fields">すべて選択</button>' + ufChecks('fields', fields) + '<p class="hint">国公立の「北海道地区(全学部)」は、地区別の一覧表のデータです。</p>') +
      ufSection('area', '地域', anyOn(uf.areas), ufChecks('areas', areas)) +
      ufSection('level', '入試難易度(ボーダーライン)', !!(uf.hMin || uf.hMax || uf.kMin || uf.kMax),
        '<div class="uf-range"><span>偏差値</span>' + ufSelect('hMin', uf.hMin, hOpts, '下限なし') + '<span>〜</span>' + ufSelect('hMax', uf.hMax, hOpts, '上限なし') + '</div>' +
        '<div class="uf-range"><span>共テ得点率(%)</span>' + ufSelect('kMin', uf.kMin, kOpts, '下限なし') + '<span>〜</span>' + ufSelect('kMax', uf.kMax, kOpts, '上限なし') + '</div>' +
        (est.hensa !== null ? '<button type="button" class="btn small" data-ufme="1">いまの推定(偏差値 約' + est.hensa + ')の前後で探す</button>' : '') +
        '<p class="hint">共テ得点率は、国公立大のデータだけにあります。</p>') +
      ufSection('sched', '入試日程・方式', anyOn(uf.scheds), ufChecks('scheds', [['前期', '国公立 前期'], ['中期・後期', '国公立 中期・後期'], ['私立一般', '私立 一般選抜']])) +
      ufSection('subj', '入試科目数(私立)', anyOn(uf.subj), ufChecks('subj', [['1', '1科目'], ['2', '2科目'], ['3', '3科目'], ['4', '4科目以上']])) +
      ufSection('name', '大学名・学部名', !!uf.q, '<input class="uf-q" data-ufv="q" value="' + h(uf.q) + '" placeholder="例:北海道、心理、獣医">') +
      ufSection('fav', 'お気に入り', !!uf.fav, '<label class="uf-ck"><input type="checkbox" data-ufav="1"' + (uf.fav ? ' checked' : '') + '> <span>お気に入り(★)だけ表示(' + Object.keys(fav).length + '件)</span></label>') +
      '</section>';
    // 下に固定する操作バー
    html += '<div class="uf-bar"><div class="uf-count"><small>該当</small><b>' + nUniv + '</b>校<small>(' + list.length + '件)</small></div>' +
      '<button type="button" class="btn primary" id="ufShow"' + (ufCount() ? '' : ' disabled') + '>この条件で表示</button>' +
      '<div class="uf-acts"><button type="button" class="btn small" id="ufSave">条件を保存</button>' + (ufLoad(UF_SAVED) ? '<button type="button" class="btn small" id="ufLoadSaved">保存した条件</button>' : '') + '<button type="button" class="btn small ghost" id="ufReset">× すべてクリア</button></div></div>';
    // 結果(著作権への配慮:条件でしぼりこんだ結果を、最大50件だけ表示)
    var LIM = 50;
    html += '<section class="card" id="ufResult"><h2>検索結果</h2>';
    if (!ufCount()) html += '<p class="muted">学部系統・地域・難易度・大学名などの条件を1つ以上選び、「この条件で表示」を押してください。</p>';
    else if (!uf.shown) html += '<p class="muted">条件を選んだら「この条件で表示」を押してください。</p>';
    else {
      list.sort(function (a, b) { return (b.hensa || 0) - (a.hensa || 0) || (b.kyotsu || 0) - (a.kyotsu || 0); });
      html += '<p class="muted">' + nUniv + '校・' + list.length + '件(偏差値の高い順' + (list.length > LIM ? '・上位' + LIM + '件を表示。条件を追加してしぼりこんでください' : '') + ')</p>' +
        '<ul class="uf-list">' +
        list.slice(0, LIM).map(function (r) {
          var me = goal && goal.univ === r.univ && goal.dept === r.dept && goal.sched === r.sched;
          var k = rowKey(r), isF = !!fav[k];
          var reach = est.hensa !== null && r.hensa !== null ? (est.hensa >= r.hensa ? 'reach-ok' : est.hensa >= r.hensa - 2.5 ? 'reach-near' : '') : (est.kyotsu !== null && r.kyotsu ? (est.kyotsu >= r.kyotsu ? 'reach-ok' : est.kyotsu >= r.kyotsu - 5 ? 'reach-near' : '') : '');
          return '<li class="uf-item ' + reach + (me ? ' is-goal' : '') + '"><button type="button" class="uf-star' + (isF ? ' on' : '') + '" data-ufstar="' + h(k) + '" aria-label="お気に入り" aria-pressed="' + isF + '">' + (isF ? '★' : '☆') + '</button>' +
            '<div class="uf-main"><div><span class="uf-kind ' + r.kind + '">' + (r.kind === 'pri' ? '私立' : '国公立') + '</span> <b>' + h(r.univ) + '</b></div><div class="uf-dept">' + h(r.dept) + '</div>' +
            '<small class="muted">' + h(r.field) + '・' + h(r.area) + '・' + (r.kind === 'pri' ? (r.subjects ? r.subjects + '科目' : '科目数—') : h(r.sched)) + '</small></div>' +
            '<div class="uf-num"><span class="uf-h"><small>偏差値</small><b>' + (r.hensa !== null ? r.hensa.toFixed(1) : '—') + '</b></span>' + (r.kyotsu ? '<span class="uf-k"><small>共テ</small>' + r.kyotsu + '%</span>' : '') +
            (me ? '<span class="status st-good">目標</span>' : '<button class="btn small" data-goal="' + r.id + '">目標に</button>') + '</div></li>';
        }).join('') + '</ul>' +
        '<p class="hint">左の線が緑=いまの推定で届いている/黄=あと少し。共テ=共通テストのボーダー得点率、偏差値=ボーダー偏差値(合格の可能性50%の目安)。<br>数値の出典:' + h(WPS.UNIV_PRIVATE_SOURCE) + '、' + h(WPS.UNIV_SOURCES[uf.year] || '') + '。最新の情報は必ず各大学の募集要項で確認してください。</p>';
    }
    return html + '</section>';
  }
  renderUniv.after = function () {
    function save() { ufStore(UF_KEY, uf); }
    function rerender(scrollToRes) {
      var y = window.scrollY; save(); view.innerHTML = noEmoji(renderUniv()); renderUniv.after();
      if (scrollToRes) { var t = document.getElementById('ufResult'); if (t) window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - 70); } else window.scrollTo(0, y);
    }
    view.querySelectorAll('[data-ufsec]').forEach(function (d) { d.addEventListener('toggle', function () { uf.open[d.getAttribute('data-ufsec')] = d.open ? 1 : 0; save(); }); });
    view.querySelectorAll('[data-ufkind]').forEach(function (c) { c.addEventListener('change', function () { uf.kinds[c.getAttribute('data-ufkind')] = c.checked ? 1 : 0; if (!uf.kinds.nat && !uf.kinds.pri) uf.kinds = { nat: 1, pri: 1 }; uf.shown = 0; rerender(); }); });
    view.querySelectorAll('[data-ufg]').forEach(function (c) { c.addEventListener('change', function () { uf[c.getAttribute('data-ufg')][c.value] = c.checked ? 1 : 0; uf.shown = 0; rerender(); }); });
    view.querySelectorAll('[data-ufall]').forEach(function (b) { b.addEventListener('click', function () { var g = b.getAttribute('data-ufall'); view.querySelectorAll('[data-ufg="' + g + '"]').forEach(function (c) { uf[g][c.value] = 1; }); uf.shown = 0; rerender(); }); });
    view.querySelectorAll('select[data-ufv]').forEach(function (s) { s.addEventListener('change', function () { uf[s.getAttribute('data-ufv')] = s.value; uf.shown = s.getAttribute('data-ufv') === 'year' ? uf.shown : 0; rerender(); }); });
    var q = view.querySelector('input[data-ufv="q"]');
    if (q) q.addEventListener('input', function () { clearTimeout(rerender.t); rerender.t = setTimeout(function () { uf.q = q.value.trim(); uf.shown = 0; rerender(); var n = view.querySelector('input[data-ufv="q"]'); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 300); });
    var fv = view.querySelector('[data-ufav]'); if (fv) fv.addEventListener('change', function () { uf.fav = fv.checked ? 1 : 0; uf.shown = 0; rerender(); });
    var me = view.querySelector('[data-ufme]'); if (me) me.addEventListener('click', function () { var e = A.estimate().hensa; var r = function (v) { return (Math.round(v / 2.5) * 2.5).toFixed(1); }; uf.hMin = r(Math.max(35, e - 5)); uf.hMax = r(Math.min(75, e + 5)); uf.shown = 0; rerender(); });
    view.querySelectorAll('[data-ufclear]').forEach(function (b) { b.addEventListener('click', function (ev) {
      ev.preventDefault();
      var id = b.getAttribute('data-ufclear');
      if (id === 'kind') uf.kinds = { nat: 1, pri: 1 }; if (id === 'field') uf.fields = {}; if (id === 'area') uf.areas = {}; if (id === 'sched') uf.scheds = {}; if (id === 'subj') uf.subj = {};
      if (id === 'level') { uf.hMin = uf.hMax = uf.kMin = uf.kMax = ''; } if (id === 'name') uf.q = ''; if (id === 'fav') uf.fav = 0;
      uf.shown = 0; rerender();
    }); });
    view.querySelectorAll('[data-ufstar]').forEach(function (b) { b.addEventListener('click', function () { var f = favSet(), k = b.getAttribute('data-ufstar'); if (f[k]) delete f[k]; else f[k] = 1; ufStore(UF_FAV, f); rerender(); }); });
    var sh = document.getElementById('ufShow'); if (sh) sh.addEventListener('click', function () { uf.shown = 1; rerender(true); });
    document.getElementById('ufReset').addEventListener('click', function () { var y = uf.year; uf = univState = ufDefault(); uf.year = y; rerender(); });
    document.getElementById('ufSave').addEventListener('click', function () { var c = JSON.parse(JSON.stringify(uf)); c.shown = 0; ufStore(UF_SAVED, c); toast('検索条件を保存したよ'); rerender(); });
    var ls = document.getElementById('ufLoadSaved'); if (ls) ls.addEventListener('click', function () { var c = ufLoad(UF_SAVED); if (c) { uf = univState = c; uf.shown = 1; rerender(true); } });
    view.querySelectorAll('[data-goal]').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = univAll(uf.year).filter(function (x) { return x.id === b.getAttribute('data-goal'); })[0];
        if (!r) return;
        var p = S.get().profile;
        p.goal = { univ: r.univ, dept: r.dept, sched: r.sched, kyotsu: r.kyotsu, hensa: r.hensa, year: r.year, field: r.field, src: r.src, score: r.score };
        if (!p.schoolName) p.schoolName = r.univ + ' ' + r.dept;
        S.save();
        toast('「' + r.univ + ' ' + r.dept + '」を目標にしたよ！');
        rerender();
      });
    });
  };

  /* ========== 学校のテスト・模試の記録 ========== */
  function renderRecords() {
    var s = S.get();
    var subjOpts = Object.keys(WPS.SUBJECTS).map(function (k) { return '<option value="' + k + '">' + WPS.SUBJECTS[k].name + '</option>'; }).join('');
    var html = say('学校の定期テストや模試の結果も、だいじな分析データだよ。<b>間違えた問題がどの単元か</b>を選んでね。わからなければ、点数だけでも大丈夫！', 'normal', 56);
    html += '<section class="card"><h2>結果を記録する</h2><form id="recForm" class="form">' +
      '<div class="form-2"><label>種類<select name="kind"><option>定期テスト</option><option>模試</option><option>小テスト</option><option>過去問</option></select></label>' +
      '<label>日付<input type="date" name="date" value="' + D.today() + '" required></label></div>' +
      '<div class="form-2"><label>科目<select name="subj" id="recSubj">' + subjOpts + '</select></label>' +
      '<label>点数 / 満点<span class="score-in"><input type="number" name="score" min="0" max="1000" required inputmode="numeric"> / <input type="number" name="max" min="1" max="1000" value="100" required inputmode="numeric"></span></label></div>' +
      '<fieldset><legend>間違えた・自信がなかった単元(いくつでも)</legend><div id="recUnits" class="check-grid"></div></fieldset>' +
      '<details><summary>よくできた単元も記録する(任意)</summary><div id="recGood" class="check-grid"></div></details>' +
      '<button class="btn primary big" type="submit">記録する</button></form></section>';
    var recs = (s.records || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    html += '<section class="card"><h2>これまでの記録</h2>' + (recs.length ? recordsChart(s.records) + '<ul class="memos">' + recs.map(function (r) {
      return '<li><div><small>' + h(r.date) + '・' + h(r.kind) + '</small><b>' + WPS.SUBJECTS[r.subj].name + ' ' + r.score + ' / ' + r.max + '点</b>(' + Math.round(r.score / r.max * 100) + '%)' +
        (r.wrong.length ? '<br><span class="muted">間違えた単元:' + r.wrong.map(function (id) { return h(WPS.UNIT_MAP[id].name); }).join('、') + '</span>' : '') + '</div>' +
        '<button class="btn small ghost" data-delrec="' + r.id + '" aria-label="削除">🗑</button></li>';
    }).join('') + '</ul>' : '<p class="muted">まだ記録がありません。</p>') + '</section>';
    return html;
  }
  renderRecords.after = function () {
    var sel = document.getElementById('recSubj');
    function fill() {
      var us = WPS.UNITS.filter(function (u) { return u.subj === sel.value; });
      ['recUnits', 'recGood'].forEach(function (box, bi) {
        document.getElementById(box).innerHTML = us.map(function (u) {
          return '<label class="ck"><input type="checkbox" name="' + (bi ? 'good' : 'wrong') + '" value="' + u.id + '"> ' + h(u.name) + '<small>' + u.stage + '</small></label>';
        }).join('');
      });
    }
    sel.addEventListener('change', fill);
    fill();
    document.getElementById('recForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(e.target), s = S.get();
      var score = +fd.get('score'), max = +fd.get('max');
      if (score > max) { toast('点数が満点をこえているよ'); return; }
      var rec = { id: Date.now(), date: fd.get('date'), kind: fd.get('kind'), subj: fd.get('subj'), score: score, max: max, wrong: fd.getAll('wrong'), good: fd.getAll('good') };
      s.records = s.records || [];
      s.records.push(rec);
      var t = WPS.date.parse(rec.date).getTime();
      rec.wrong.forEach(function (id) { s.attempts.push({ q: null, u: id, s: rec.subj, ok: false, ch: null, unsure: false, src: 'school', t: t, d: rec.date }); });
      rec.good.forEach(function (id) { s.attempts.push({ q: null, u: id, s: rec.subj, ok: true, ch: null, unsure: false, src: 'school', t: t, d: rec.date }); });
      s.attempts.sort(function (a, b) { return a.t - b.t; });
      S.save();
      toast(rec.wrong.length ? '記録したよ！ 間違えた単元をロードマップに入れたよ' : '記録したよ！');
      render();
    });
    view.querySelectorAll('[data-delrec]').forEach(function (b) {
      b.addEventListener('click', function () {
        var s = S.get(), id = +b.getAttribute('data-delrec');
        var r = (s.records || []).filter(function (x) { return x.id === id; })[0];
        if (!r) return;
        ask('この記録を削除しますか?', '削除する', function () {
          var t = WPS.date.parse(r.date).getTime();
          s.records = s.records.filter(function (x) { return x.id !== id; });
          s.attempts = s.attempts.filter(function (a) { return !(a.src === 'school' && a.t === t && (r.wrong.concat(r.good)).indexOf(a.u) >= 0); });
          S.save(); render();
        });
      });
    });
  };
  // 科目ごとの得点率の推移(折れ線)
  function recordsChart(recs) {
    var bySubj = {};
    recs.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; }).forEach(function (r) {
      (bySubj[r.subj] = bySubj[r.subj] || []).push(r);
    });
    var W = 320, H = 140, P = 24;
    var lines = Object.keys(bySubj).map(function (k) {
      var list = bySubj[k].slice(-8);
      var pts = list.map(function (r, i) {
        var x = P + (list.length === 1 ? (W - 2 * P) / 2 : i * (W - 2 * P) / (list.length - 1));
        var y = H - P - (r.score / r.max) * (H - 2 * P);
        return [x, y];
      });
      return '<polyline fill="none" stroke="' + WPS.SUBJECTS[k].color + '" stroke-width="2.5" points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '"/>' +
        pts.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="' + WPS.SUBJECTS[k].color + '"/>'; }).join('');
    }).join('');
    var grid = [0, 50, 100].map(function (v) { var y = H - P - v / 100 * (H - 2 * P); return '<line x1="' + P + '" x2="' + (W - 8) + '" y1="' + y + '" y2="' + y + '" class="gridline"/><text x="2" y="' + (y + 4) + '" class="axis">' + v + '%</text>'; }).join('');
    var legend = Object.keys(bySubj).map(function (k) { return '<span class="chip" style="--c:' + WPS.SUBJECTS[k].color + '">' + WPS.SUBJECTS[k].name + '</span>'; }).join(' ');
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="chart" role="img" aria-label="得点率の推移">' + grid + lines + '</svg><div class="legend">' + legend + '</div>';
  }
  // 先生用レポートの「学校のテスト・模試」欄
  function recordsReport(recs) {
    if (!recs.length) return '';
    var list = recs.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 10);
    return '<section class="card"><h2>学校のテスト・模試の結果</h2>' + recordsChart(recs) + '<table class="plan">' + list.map(function (r) {
      return '<tr><th>' + h(r.date.slice(5).replace('-', '/')) + '</th><td>' + h(r.kind) + '・' + WPS.SUBJECTS[r.subj].name + ' <b>' + r.score + '/' + r.max + '</b>' +
        (r.wrong.length ? '<br><small>間違えた単元:' + r.wrong.map(function (id) { return h(WPS.UNIT_MAP[id].name); }).join('、') + '</small>' : '') + '</td></tr>';
    }).join('') + '</table></section>';
  }

  /* ========== 共有リンク・クラウド同期 ========== */
  function copyOrShare(url, title) {
    if (navigator.share && !EMBED) {
      return navigator.share({ title: title, url: url }).catch(function (e) {
        if (!e || e.name !== 'AbortError') showText('共有リンク', url, 'このリンクをLINEやメールで送ってください。');
      });
    }
    showText('共有リンク', url, 'このリンクをLINEやメールで送ってください。開くと分析レポートが見られます。');
  }
  function shareLink() {
    var link = WPS.Sync.enabled() ? Promise.resolve(WPS.Sync.tutorLink()) : WPS.Share.link();
    link.then(function (url) {
      if (url.length > 60000) toast('データが多いため、リンクが長くなっています。届かない場合は「ファイルでやり取り」を使ってね');
      copyOrShare(url, (S.get().profile.name || '生徒') + 'さんの学習レポート');
    }).catch(function () { toast('リンクを作れませんでした'); });
  }

  // 共有リンクで開いたとき(#share/データ または #cloud/コード@サーバー)
  function renderShared() {
    return '<section class="card center">' + pinpo(80, 'think') + '<p>共有されたデータを読み込んでいます…</p></section>';
  }
  renderShared.after = function (arg) {
    var route = (location.hash.slice(1).split('/')[0]);
    var data = location.hash.slice(route.length + 2);
    var p;
    if (route === 'share') p = WPS.Share.decode(data);
    else {
      var at = data.lastIndexOf('@');
      p = WPS.Sync.fetchShared(data.slice(0, at), decodeURIComponent(data.slice(at + 1)));
    }
    p.then(function (st) {
      S.setView(st);
      view.innerHTML = noEmoji(renderTutor());
      renderTutor.after();
    }).catch(function () {
      view.innerHTML = noEmoji('<section class="card">' + say('ごめんね、共有データを読み込めませんでした。リンクが途中で切れていないか、生徒さんにもう一度送ってもらってね。', 'sad', 56) + '</section>');
    });
  };

  function cloudSection() {
    var c = WPS.Sync.cfg();
    var html = '<section class="card"><h2>☁️ クラウド同期(任意)</h2>';
    if (!c) {
      html += '<p class="muted">同期サーバー(server フォルダ)を動かしている場合に使えます。オンにすると、<br>・スマホとPCなど、複数の端末で同じデータを使えます<br>・先生用リンクが、いつでも最新のレポートになります<br>・アプリを閉じていても「記録が切れそう！」通知が届きます</p>' +
        '<label>同期サーバーのURL<input id="syncServer" placeholder="例:https://wps.example.com" inputmode="url"></label>' +
        '<div class="btns"><button class="btn primary" id="syncStart">同期を始める</button></div>' +
        '<details><summary>別の端末とつなぐ(引き継ぎコード)</summary><label>引き継ぎコード<input id="transferIn" placeholder="もう一方の端末に表示されたコード"></label><button class="btn" id="transferBtn">つなぐ</button></details>';
    } else {
      html += '<p>✅ 同期中:' + h(c.server) + '<br><span class="muted">最終同期:' + (c.last ? new Date(c.last).toLocaleString('ja-JP') : 'まだ') + '</span></p>' +
        '<div class="btns"><button class="btn" id="syncNow">今すぐ同期</button><button class="btn" id="showTransfer">引き継ぎコードを表示</button><button class="btn danger" id="syncStop">同期をやめる</button></div>' +
        '<p class="hint">引き継ぎコードは、あなたのデータの合言葉です。先生や友だちには送らないでね(先生には「先生に送るリンク」を使ってね)。</p>';
    }
    return html + '</section>';
  }
  function bindCloudSection() {
    function on(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener('click', fn); }
    var input = document.getElementById('syncServer');
    if (input) WPS.Sync.detect().then(function (u) { if (u && !input.value) input.value = u; });
    on('syncStart', function () {
      var url = input.value.trim();
      if (!/^https?:\/\//.test(url)) { toast('URLを入力してね(https:// から)'); return; }
      WPS.Sync.setup(url).then(function () { toast('同期を始めたよ！'); render(); }, function (e) { toast('つなげませんでした:' + e.message); });
    });
    on('transferBtn', function () {
      try {
        WPS.Sync.useTransferCode(document.getElementById('transferIn').value).then(function () { toast('つながったよ！ データを読み込んだよ'); render(); }, function (e) { toast('つなげませんでした:' + e.message); });
      } catch (e) { toast('コードが正しくありません'); }
    });
    on('syncNow', function () {
      WPS.Sync.push().then(function () { return WPS.Sync.pull(false); }).then(function () { toast('同期したよ'); render(); }, function (e) { toast('同期できませんでした:' + e.message); });
    });
    on('showTransfer', function () { showText('引き継ぎコード', WPS.Sync.transferCode(), '別の端末の「引き継ぎコード」に入力してください。先生や友だちには送らないでね。'); });
    on('syncStop', function () { ask('この端末の同期をやめますか?(データはこの端末に残ります)', 'やめる', function () { WPS.Sync.disable(); render(); }); });
  }

  /* ---------- 起動 ---------- */
  function boot() {
    view = document.getElementById('view');
    applyPalette();
    if (WPS.univSchools) WPS.univSchools(); // 大学データの大学を志望校として使えるようにする
    S.load();
    WPS.Streak.maintain();
    window.addEventListener('hashchange', function () {
      if (location.hash !== '#cards') deck = deck && deck.i >= deck.items.length ? null : deck;
      render();
    });
    render();
    WPS.Notify.start();
    WPS.Sync.boot().then(function (changed) { if (changed) { toast('クラウドの最新データを読み込んだよ'); render(); } });
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      navigator.serviceWorker.register('sw.js').catch(function () { /* オフライン機能なしでも動作する */ });
    }
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
