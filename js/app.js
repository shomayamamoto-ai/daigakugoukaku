/*
 * Weak-Point Sniper 画面(UI)
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
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  // ブラウザ標準の確認ダイアログが使えない環境(埋め込み表示など)でも動く、画面内のダイアログ
  var EMBED = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();
  function dialog(html, buttons) {
    var wrap = document.createElement('div');
    wrap.className = 'dlg-wrap';
    wrap.innerHTML = '<div class="dlg" role="dialog" aria-modal="true">' + html + '<div class="btns dlg-btns"></div></div>';
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
  function pinpo(size, mood) {
    mood = mood || 'normal';
    var eyes;
    if (mood === 'happy') {
      eyes = '<path d="M33 60 q9 -10 18 0" class="pp-line"/><path d="M69 60 q9 -10 18 0" class="pp-line"/>';
    } else {
      eyes = '<circle cx="42" cy="58" r="14" fill="#fff"/><circle cx="78" cy="58" r="14" fill="#fff"/>' +
        '<circle cx="42" cy="58" r="9" fill="none" stroke="#ef4444" stroke-width="2.5"/><circle cx="78" cy="58" r="9" fill="none" stroke="#ef4444" stroke-width="2.5"/>' +
        '<circle cx="42" cy="58" r="4" fill="#1e293b"/><circle cx="78" cy="58" r="4" fill="#1e293b"/>' +
        '<circle cx="44" cy="55" r="1.5" fill="#fff"/><circle cx="80" cy="55" r="1.5" fill="#fff"/>';
      if (mood === 'sad') eyes += '<path d="M28 50 q14 -6 28 2" class="pp-line"/><path d="M92 50 q-14 -6 -28 2" class="pp-line"/>';
      if (mood === 'think') eyes += '<path d="M30 42 l22 4" class="pp-line"/><path d="M90 42 l-22 4" class="pp-line"/>';
    }
    var cheeks = (mood === 'happy' || mood === 'cheer') ? '<ellipse cx="30" cy="74" rx="6" ry="4" fill="#fda4af" opacity=".8"/><ellipse cx="90" cy="74" rx="6" ry="4" fill="#fda4af" opacity=".8"/>' : '';
    var extra = mood === 'cheer' ? '<path d="M104 30 l4 -10 l4 10 l10 2 l-8 6 l2 10 l-8 -5 l-8 5 l2 -10 l-8 -6z" fill="#fbbf24"/>' : '';
    return '<svg class="pinpo" viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">' +
      '<path d="M22 40 L28 12 L46 30 Z" fill="#244aa8"/><path d="M98 40 L92 12 L74 30 Z" fill="#244aa8"/>' +
      '<ellipse cx="60" cy="70" rx="44" ry="44" fill="#2f5bd3"/>' +
      '<ellipse cx="60" cy="88" rx="27" ry="24" fill="#dbe7ff"/>' +
      '<path d="M48 82 q4 4 8 0 M60 90 q4 4 8 0 M52 98 q4 4 8 0" stroke="#9db7f5" stroke-width="2" fill="none"/>' +
      '<ellipse cx="17" cy="78" rx="8" ry="18" fill="#244aa8" transform="rotate(15 17 78)"/><ellipse cx="103" cy="78" rx="8" ry="18" fill="#244aa8" transform="rotate(-15 103 78)"/>' +
      eyes + cheeks +
      '<path d="M54 68 L66 68 L60 78 Z" fill="#f59e0b"/>' +
      '<path d="M48 113 l-4 5 M52 113 l0 6 M68 113 l0 6 M72 113 l4 5" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>' +
      extra + '</svg>';
  }
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
      a.classList.toggle('active', a.getAttribute('data-r') === route);
    });
    var fn = {
      home: renderHome, onboard: renderOnboard, test: renderTest, quiz: renderQuiz, result: renderResult,
      study: renderStudy, roadmap: renderRoadmap, cards: renderCards, tutor: renderTutor,
      memo: renderMemo, settings: renderSettings, share: renderShared, cloud: renderShared, records: renderRecords, parent: renderParent, univ: renderUniv
    }[route] || renderHome;
    view.innerHTML = fn(parts[1]);
    if (fn.after) fn.after(parts[1]);
    window.scrollTo(0, 0);
  }

  /* ========== オンボーディング ========== */
  function schoolOptions(selected) {
    var groups = { national: '国公立大学', private: '私立大学', high: '高校受験' };
    var html = '<option value="">選んでください</option>';
    Object.keys(groups).forEach(function (k) {
      html += '<optgroup label="' + groups[k] + '">';
      WPS.SCHOOLS.filter(function (s) { return s.kind === k; }).forEach(function (s) {
        html += '<option value="' + s.id + '"' + (s.id === selected ? ' selected' : '') + '>' + h(s.name) + '</option>';
      });
      html += '</optgroup>';
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
  function profileForm(p, submitLabel) {
    return '<form id="profileForm" class="form">' +
      '<label>ニックネーム<input name="name" required maxlength="20" value="' + h(p.name) + '" placeholder="例:しょーま"></label>' +
      '<label>いまの学年<select name="grade">' +
      ['中1', '中2', '中3', '高1', '高2', '高3', '既卒'].map(function (g) { return '<option' + (g === p.grade ? ' selected' : '') + '>' + g + '</option>'; }).join('') +
      '</select></label>' +
      '<label>志望校<select name="schoolId" id="schoolSel">' + schoolOptions(p.schoolId) + '</select></label>' +
      '<label>志望校名(学部など・自由入力)<input name="schoolName" maxlength="40" value="' + h(p.schoolName) + '" placeholder="例:〇〇大学 経済学部"></label>' +
      '<label>文系/理系(受験科目)<select name="track" id="trackSel">' + trackOptions(p.schoolId, p.track) + '</select></label>' +
      '<label id="kyotsuRow"' + (usesKyotsu(p.schoolId) ? '' : ' hidden') + '>共通テストの日(中間目標)<input type="date" name="kyotsuDate" id="kyotsuDate" value="' + h(p.kyotsuDate || WPS.EXAM_DATES.kyotsu.date) + '"></label>' +
      '<label>本番の日(最終目標:国公立は2次試験の日)<input type="date" name="examDate" id="examDate" value="' + h(p.examDate || defaultExamDate(p.schoolId)) + '"></label>' +
      '<p class="hint" id="examHint">志望校を選ぶと、目安の日付が入ります。正式な日程は必ず募集要項で確認してね。</p>' +
      '<label>1日に使える勉強時間<select name="minutes">' +
      [15, 30, 45, 60, 90, 120, 180, 240].map(function (m) { return '<option value="' + m + '"' + (+p.minutes === m ? ' selected' : '') + '>' + (m < 60 ? m + '分' : (m / 60) + '時間') + '</option>'; }).join('') +
      '</select></label>' +
      '<button class="btn primary big" type="submit">' + submitLabel + '</button></form>';
  }
  function bindProfileForm(onDone) {
    var f = document.getElementById('profileForm');
    var ss = document.getElementById('schoolSel');
    ss.addEventListener('change', function () {
      document.getElementById('trackSel').innerHTML = trackOptions(ss.value, '');
      var d = defaultExamDate(ss.value);
      if (d) document.getElementById('examDate').value = d;
      document.getElementById('kyotsuRow').hidden = !usesKyotsu(ss.value);
      var s = WPS.SCHOOL_MAP[ss.value];
      if (s) document.getElementById('examHint').textContent = '目安:' + s.exams.map(function (e) { return WPS.EXAM_DATES[e].label + ' ' + WPS.EXAM_DATES[e].date; }).join(' ／ ') + '。正式な日程は必ず募集要項で確認してね。';
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(f);
      var p = S.get().profile;
      ['name', 'grade', 'schoolId', 'schoolName', 'track', 'examDate', 'kyotsuDate'].forEach(function (k) { p[k] = (fd.get(k) || '').trim(); });
      p.minutes = +fd.get('minutes');
      S.save();
      onDone();
    });
  }
  function renderOnboard() {
    return '<section class="card hero">' + pinpo(110, 'cheer') +
      '<h1>はじめまして！ ぼくは<span class="brand">ピンポ</span></h1>' +
      '<p>きみの「本当の苦手」をピンポイントで見つけて、志望校までの近道をいっしょに作る、見習いスナイパーのフクロウだよ。<br>まずは、きみのことを教えてね。</p></section>' +
      '<section class="card">' + profileForm(S.get().profile, 'はじめる 🎯') + '</section>' +
      '<section class="card"><details><summary>別の端末で使っていたデータを引き継ぐ</summary>' +
      '<label>引き継ぎコード<input id="obTransfer" placeholder="前の端末の「設定 → 引き継ぎコード」"></label><button class="btn" id="obTransferBtn">引き継ぐ</button></details></section>';
  }
  renderOnboard.after = function () {
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
  function renderHome() {
    var s = S.get(), p = s.profile;
    var rm = R.build();
    var tt = R.todayTasks(rm);
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
    html += say('<b>' + h(p.name) + 'さん</b>、' + greet, studied ? 'happy' : 'normal', 72);

    // 連続記録
    var wk = WPS.Streak.week();
    html += '<section class="card streak"><div class="streak-main"><div class="flame ' + (studied ? 'on' : '') + '">🔥</div>' +
      '<div><div class="big-num">' + streak + '<small>日連続</small></div><div class="muted">最高記録 ' + WPS.Streak.best() + '日 ／ おやすみチケット ' + (s.freezes ? '🧊'.repeat(s.freezes) : 'なし') + '</div></div></div>' +
      '<div class="week">' + wk.map(function (d) {
        return '<div class="day ' + (d.state || '') + (d.d === D.today() ? ' today' : '') + '"><span>' + d.label + '</span><i>' + (d.state === 'study' ? '✓' : d.state === 'frozen' ? '🧊' : '') + '</i></div>';
      }).join('') + '</div></section>';

    // カウントダウン
    var t = rm.target;
    var phase = tt.week ? WPS.PHASES.filter(function (x) { return x.key === tt.week.phase; })[0] : null;
    html += '<section class="card countdown"><div><div class="muted">' + h(t.school ? t.school.name : '志望校未設定') + (p.schoolName ? '<br>' + h(p.schoolName) : '') + '</div>' +
      '<div class="big-num">あと ' + Math.max(0, D.diff(D.today(), t.exam)) + '<small>日</small></div><div class="muted">' + h(t.exam) + '</div>' + milestoneLine(t) + '</div>' +
      (phase ? '<div class="phase-badge">' + phase.emoji + ' いまは<br><b>' + phase.name + '</b></div>' : '') + '</section>';
    html += goalCard(p);

    // 診断がまだの場合
    if (!s.attempts.some(function (a) { return a.src === 'test'; })) {
      html += '<section class="card cta">' + say('まずは<b>診断テスト</b>で、きみの苦手を見つけよう！ 10分くらいで終わるよ。中学の内容からさかのぼって調べるから、安心してね。', 'cheer', 56) +
        '<a class="btn primary big" href="#test">診断テストを受ける</a></section>';
    }

    // 今日のやる事
    var doneN = tt.tasks.filter(function (x) { return x.done; }).length;
    html += '<section class="card"><div class="row-between"><h2>今日のやる事</h2><span class="muted">' + doneN + '/' + tt.tasks.length + ' 完了</span></div>' +
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

    html += '<section class="quick"><a href="#records">🏫 テスト結果を記録</a><a href="#memo">✏️ 質問メモ</a><a href="#univ">🏫 大学データ</a></section>';
    // 今週の単元
    if (tt.week && tt.week.units.length) {
      html += '<section class="card"><h2>今週ねらう単元</h2><div class="unit-list">' + tt.week.units.map(function (id) { return unitRow(id, rm.stats); }).join('') + '</div>' +
        '<a class="link" href="#roadmap">ロードマップ全体を見る →</a></section>';
    }
    return html;
  }
  renderHome.after = function () {
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
      if (!pool.length) pool = WPS.UNITS.filter(function (u) { return u.subj === sj && WPS.STAGES.indexOf(u.stage) <= Math.max(gi, 2); });
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
    if (!qs.length) return null;
    qs = shuffle(qs).sort(function (a, b) {
      var oa = okSet[a.id] ? 1 : 0, ob = okSet[b.id] ? 1 : 0;
      if (oa !== ob) return oa - ob;
      return Math.abs(a.level - prefLevel) - Math.abs(b.level - prefLevel);
    });
    // 自動生成できる単元では、固定の問題を正解済みなら(または半分の確率で)新しい数字の問題を出す
    if (WPS.UNIT_MAP[unitId].hasGen && (okSet[qs[0].id] || Math.random() < 0.5)) return WPS.genId(unitId);
    return qs[0].id;
  }
  // 単元の練習セット(固定の問題＋自動生成5問)
  function unitSet(u) {
    var ids = u.questions.map(function (q) { return q.id; });
    if (u.hasGen) for (var k = 0; k < 5; k++) ids.push(WPS.genId(u.id));
    return ids;
  }
  function unitCount(u) { return u.questions.length + (u.hasGen ? '問＋自動生成で無制限' : '問'); }

  function renderTest() {
    var t = R.target();
    var subs = Object.keys(t.weights).filter(function (k) { return t.weights[k] > 0; });
    var html = say('テストといっても、成績をつけるためじゃないよ。<b>きみの「つまずきポイント」を見つけるため</b>のものだから、わからない問題は「わからない」ボタンを押してね。高校の問題で間違えたら、自動で中学の単元までさかのぼって原因を調べるよ。', 'think', 64);
    html += '<section class="card"><h2>🎯 おまかせ診断(約15問・10分)</h2><p class="muted">志望校の受験科目から、きみの学年に合った問題を出すよ。</p>' +
      '<button class="btn primary big" data-start="all">診断をはじめる</button></section>';
    html += '<section class="card"><h2>科目をしぼって診断(8問)</h2><div class="grid-btns">' +
      subs.map(function (k) { var sj = WPS.SUBJECTS[k]; return '<button class="btn subj" style="--c:' + sj.color + '" data-start="' + k + '">' + sj.name + '</button>'; }).join('') +
      '</div></section>';
    var stats = A.allStats();
    html += '<section class="card"><h2>🏫 学校のテスト・模試の結果を記録</h2><p class="muted">定期テストや模試で間違えた単元を記録すると、分析とロードマップに反映されるよ。</p><a class="btn big" href="#records">結果を記録する</a></section>';
    html += '<section class="card"><h2>単元をえらんで練習</h2><p class="muted">中学1年の内容から順に並んでいるよ。気になる単元をタップしてね。</p>';
    Object.keys(WPS.SUBJECTS).forEach(function (k) {
      var us = WPS.UNITS.filter(function (u) { return u.subj === k; });
      html += '<details><summary>' + subjChip(k) + ' ' + us.length + '単元</summary><div class="unit-list">' + us.map(function (u) { return unitRow(u.id, stats); }).join('') + '</div></details>';
    });
    html += '</section>';
    return html;
  }
  renderTest.after = function () {
    view.querySelectorAll('[data-start]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-start');
        var items = buildDiagnostic(k === 'all' ? null : k);
        if (!items.length) { toast('この科目の問題がまだありません'); return; }
        startQuiz(items, 'test', k === 'all' ? 'おまかせ診断' : WPS.SUBJECTS[k].name + 'の診断');
      });
    });
  };

  function startQuiz(qids, src, title) {
    quiz = {
      items: qids.map(function (id) { return { q: id, dig: false }; }), i: 0, src: src, title: title,
      results: [], answered: false, order: null, asked: {}, digs: 0
    };
    qids.forEach(function (id) { quiz.asked[id] = true; });
    go('#quiz');
  }

  function renderQuiz() {
    if (!quiz) return renderTest();
    var it = quiz.items[quiz.i];
    var q = WPS.Q(it.q);
    var u = WPS.UNIT_MAP[q.unit];
    if (!quiz.order) quiz.order = shuffle(q.choices.map(function (_, i) { return i; }));
    var html = '<div class="quiz-head"><span>' + h(quiz.title) + '</span><span>' + (quiz.i + 1) + ' / ' + quiz.items.length + '</span></div>' +
      '<div class="progress"><i style="width:' + Math.round(quiz.i / quiz.items.length * 100) + '%"></i></div>';
    if (it.dig) html += say(pick(LINES.dig), 'think', 44);
    html += '<section class="card question"><div class="q-meta">' + subjChip(u.subj) + '<span>' + h(u.name) + '（' + u.stage + '）</span><span class="lv lv' + q.level + '">' + WPS.LEVELS[q.level] + '</span></div>' +
      '<p class="q-text">' + h(q.text) + '</p><div class="choices">' +
      quiz.order.map(function (ci, k) {
        return '<button class="choice" data-ci="' + ci + '"><b>' + 'ABCD'[k] + '</b>' + h(q.choices[ci]) + '</button>';
      }).join('') + '</div>' +
      '<button class="btn ghost unsure" data-ci="-1">🤔 わからない(先生に聞きたい)</button><div id="feedback"></div></section>';
    return html;
  }
  renderQuiz.after = function () {
    view.querySelectorAll('[data-ci]').forEach(function (b) {
      b.addEventListener('click', function () { answer(+b.getAttribute('data-ci')); });
    });
  };

  function answer(ci) {
    if (quiz.answered) return;
    quiz.answered = true;
    var it = quiz.items[quiz.i];
    var q = WPS.Q(it.q);
    var ok = ci === 0;
    var unsure = ci === -1;
    var s = S.get();
    s.attempts.push({ q: q.id, u: q.unit, s: q.subj, ok: ok, ch: unsure ? null : q.choices[ci], unsure: unsure, src: quiz.src, t: Date.now(), d: D.today() });
    if (unsure) {
      s.memos.push({ id: Date.now(), unit: q.unit, q: q.id, text: '「' + q.text + '」がわかりませんでした。', t: Date.now(), done: false, auto: true });
    }
    quiz.results.push({ q: q.id, ok: ok, unsure: unsure, dig: it.dig });
    WPS.Streak.touch();
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
    var mood = ok ? 'happy' : 'normal';
    var line = ok ? pick(LINES.correct) : unsure ? LINES.unsure[0] : pick(LINES.wrong);
    var last = quiz.i + 1 >= quiz.items.length;
    document.getElementById('feedback').innerHTML =
      '<div class="feedback ' + (ok ? 'ok' : 'ng') + '"><b>' + (ok ? '⭕ 正解！' : '正解は「' + h(q.answer) + '」') + '</b><p>' + h(q.exp) + '</p></div>' +
      say(line + (dug ? '<br><small>次は、つまずきの原因かもしれない前の単元から1問出すね。</small>' : ''), mood, 44) +
      '<button class="btn primary big" id="nextQ">' + (last ? '結果を見る' : '次へ') + '</button>';
    document.getElementById('nextQ').addEventListener('click', function () {
      if (last) { finishQuiz(); return; }
      quiz.i++; quiz.answered = false; quiz.order = null;
      render();
    });
    document.getElementById('nextQ').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function finishQuiz() {
    lastResult = quiz;
    quiz = null;
    go('#result');
  }

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
      '<div class="big-num">' + c + '<small> / ' + n + ' 問正解</small></div><p>' + msg + '</p></section>';
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
    var html = '<a class="link" href="javascript:history.back()">← もどる</a>' +
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
    var methods = WPS.SUBJECT_METHODS[u.subj] || [];
    html += '<section class="card"><h2>' + WPS.SUBJECTS[u.subj].name + 'の勉強のコツ</h2><ul class="bullets">' + methods.map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></section>';
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
  function renderRoadmap() {
    var rm = R.build();
    var t = rm.target, p = t.profile;
    var html = '';
    html += '<section class="card"><div class="row-between"><h1>🗺️ ' + h(p.name) + 'さん専用ロードマップ</h1><a class="btn small" href="#settings">志望校を変更</a></div>' +
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

    rm.warnings.forEach(function (x) { html += '<section class="info">💡 ' + h(x) + '</section>'; });

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

    // 勉強法
    html += '<section class="card"><h2>📖 科目別の勉強法</h2>' + Object.keys(w).filter(function (k) { return w[k] > 0; }).map(function (k) {
      return '<details><summary>' + subjChip(k) + '</summary><ul class="bullets">' + (WPS.SUBJECT_METHODS[k] || []).map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></details>';
    }).join('') + '</section>';
    return html;
  }
  renderRoadmap.after = function () {
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
    html += '<section class="card"><h2>単語帳に入っている単元</h2>';
    if (!units.length) html += '<p class="muted">まだありません。<a href="#test">診断テスト</a>を受けると、苦手単元が自動で入るよ。</p>';
    else html += '<p class="muted">タップすると、その単元だけをまとめて練習できるよ。</p><div class="unit-list">' + units.map(function (id) {
      var u = WPS.UNIT_MAP[id];
      return '<button class="unit-row" data-unit="' + id + '">' + subjChip(u.subj) + '<span class="u-name">' + h(u.name) + '<small>' + u.stage + '・' + (u.hasGen ? u.questions.length + '枚＋自動生成' : u.questions.length + '枚') + '</small></span>' + statusChip(stats[id].status) + '</button>';
    }).join('') + '</div>';
    html += '</section>';
    return html;
  }
  renderCards.after = function () {
    if (deck) return renderDeck.after();
    var b = document.getElementById('startDeck');
    if (b) b.addEventListener('click', function () { startDeck(WPS.SRS.session(), '今日の単語帳'); });
    view.querySelectorAll('[data-unit]').forEach(function (x) {
      x.addEventListener('click', function () {
        var u = WPS.UNIT_MAP[x.getAttribute('data-unit')];
        startDeck(shuffle(unitSet(u)), u.name);
      });
    });
  };

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
    return '<div class="quiz-head"><button class="btn small ghost" id="quitDeck">✕ やめる</button><span>' + h(deck.title) + '</span><span>' + (deck.i + 1) + ' / ' + deck.items.length + '</span></div>' +
      '<div class="progress"><i style="width:' + Math.round(deck.i / deck.items.length * 100) + '%"></i></div>' +
      '<div class="flash' + (deck.flipped ? ' flipped' : '') + '" id="flash" tabindex="0" role="button" aria-label="カードをめくる">' +
      '<div class="face front"><div class="q-meta">' + subjChip(u.subj) + '<span>' + h(u.name) + '</span></div><p class="q-text">' + h(q.text) + '</p>' +
      '<span class="tap">タップしてめくる</span></div>' +
      '<div class="face back"><small class="muted">答え</small><p class="answer">' + h(q.answer) + '</p><p>' + h(q.exp) + '</p></div></div>' +
      (deck.flipped ? '' : '<details class="hint-choices"><summary>ヒント:選択肢を見る</summary><ul>' + shuffle(q.choices).map(function (c) { return '<li>' + h(c) + '</li>'; }).join('') + '</ul></details>') +
      '<div class="grade' + (deck.flipped ? '' : ' hidden') + '">' +
      '<button class="btn g-again" data-g="again">😣 まだ</button><button class="btn g-hard" data-g="hard">🤔 あいまい</button><button class="btn g-good" data-g="good">😊 覚えた</button></div>' +
      '<p class="hint center">キーボード:スペースでめくる ／ 1・2・3 で評価</p>';
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
    flash.addEventListener('click', flip);
    document.getElementById('quitDeck').addEventListener('click', function () { deck = null; render(); });
    view.querySelectorAll('[data-g]').forEach(function (b) {
      b.addEventListener('click', function () { gradeCard(b.getAttribute('data-g')); });
    });
    renderDeck.flip = flip;
  };
  function gradeCard(g) {
    var qid = deck.items[deck.i];
    WPS.SRS.grade(qid, g);
    deck.done++;
    if (g === 'good') deck.good++;
    if (g === 'again' && !deck.again[qid]) { deck.again[qid] = true; deck.items.push(qid); } // もう一度出す
    deck.i++; deck.flipped = false;
    if (g === 'good' && Math.random() < 0.35) toast(pick(LINES.correct));
    render();
  }
  document.addEventListener('keydown', function (e) {
    if (!deck || (location.hash !== '#cards') || deck.i >= deck.items.length) return;
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === ' ') { e.preventDefault(); if (renderDeck.flip) renderDeck.flip(); }
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
      return html + '<section class="card">' + say('まだ診断データがありません。生徒に診断テストを受けてもらってから、生徒の端末の「先生にリンクで送る」で届いたリンクを開いてください。', 'think', 56) + '</section>';
    }

    // 科目別・思考レベル別
    var ss = A.subjectStats();
    html += '<section class="card"><h2>① 科目別・思考レベル別の正答率</h2><table class="grid"><tr><th>科目</th><th>全体</th><th>知識</th><th>理解</th><th>応用</th></tr>';
    var diags = '';
    Object.keys(WPS.SUBJECTS).forEach(function (k) {
      if (!ss[k].n) return;
      var ls = A.levelStats(k);
      function cell(x) { var v = x.n ? x.c / x.n : null; return '<td class="' + (v === null ? '' : v < 0.5 ? 'bad' : v < 0.8 ? 'mid' : 'good') + '">' + pct(v) + '<small>' + (x.n ? '(' + x.n + ')' : '') + '</small></td>'; }
      html += '<tr><th>' + WPS.SUBJECTS[k].name + '</th>' + cell(ss[k]) + cell(ls[1]) + cell(ls[2]) + cell(ls[3]) + '</tr>';
      diags += '<li><b>' + WPS.SUBJECTS[k].name + '</b>:' + h(A.levelDiagnosis(ls)) + '</li>';
    });
    html += '</table><h3>指導方針の診断</h3><ul class="bullets">' + diags + '</ul><p class="hint">知識=用語・公式を覚えているか／理解=それを使えるか／応用=組み合わせて解けるか。( )内は解答数。</p></section>';

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
        : '<div class="btns"><button class="btn small g-good" data-oral="' + id + '" data-ok="1">⭕ 説明できた</button><button class="btn small g-again" data-oral="' + id + '" data-ok="0">✕ 説明できなかった</button></div>') +
        (orals.length ? '<small class="muted">これまで:' + orals.slice(-5).map(function (a) { return (a.ok ? '⭕' : '✕') + a.d.slice(5).replace('-', '/'); }).join(' ') + '</small>' : '') + '</dd>';
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
    return html;
  }
  renderTutor.after = function () {
    var pb = document.getElementById('printBtn');
    if (pb) pb.addEventListener('click', function () { window.print(); });
    var sb = document.getElementById('shareTutor');
    if (sb) sb.addEventListener('click', shareLink);
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
      download('weak-point-sniper-reminder.ics', WPS.Notify.ics(), 'text/calendar');
    });
    document.getElementById('exportBtn').addEventListener('click', function () {
      download('weak-point-sniper_' + (s.profile.name || 'data') + '_' + D.today() + '.json', S.exportJSON(), 'application/json');
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

  /* ========== 大学データ(偏差値・共通テスト得点率) ========== */
  function goalLabel(g) { return g.univ + ' ' + g.dept + '(' + g.sched + ')'; }
  // 目標とのちがいを表示するカード
  function goalCard(p, inline) {
    var g = p.goal, est = A.estimate();
    var body;
    if (!g) {
      body = '<p class="muted">目標の大学・学部を設定すると、合格の目安(共通テスト得点率・偏差値)と、いまの推定位置を比べられるよ。</p><a class="btn small" href="#univ">🏫 大学データから目標を選ぶ</a>';
    } else {
      var rows = '<tr><th></th><th>目標(目安)</th><th>いまの推定</th><th>差</th></tr>';
      function row(label, goal, now, unit) {
        var diff = (goal !== null && now !== null) ? Math.round((now - goal) * 10) / 10 : null;
        return '<tr><th>' + label + '</th><td>' + (goal !== null ? goal + unit : '—') + '</td><td>' + (now !== null ? now + unit : '—') + '</td><td class="' + (diff === null ? '' : diff >= 0 ? 'good-t' : 'bad-t') + '">' + (diff === null ? '—' : (diff >= 0 ? '+' : '') + diff + unit) + '</td></tr>';
      }
      rows += row('共通テスト得点率', g.kyotsu, est.kyotsu, '%') + row('偏差値', g.hensa, est.hensa, '');
      body = '<p><b>🎯 ' + h(goalLabel(g)) + '</b></p><div class="table-scroll"><table class="kv goal-t">' + rows + '</table></div>' +
        (est.hensa === null ? '<p class="hint">推定には、テストや練習であと ' + Math.max(0, 15 - est.n) + ' 問の解答が必要です。</p>' :
          '<p class="hint">「いまの推定」は、このアプリの問題の正答状況から計算した目安です。模試の偏差値とは異なります。</p>') +
        (g.score ? '<p class="hint">共通テストのボーダー:' + h(g.score) + '点</p>' : '') + '<p class="hint">目安の出典:' + h(g.src || WPS.UNIV_SOURCES[g.year] || '') + '</p>';
    }
    return '<section class="card goal"><h2>📍 目標と現在地</h2>' + body + '</section>';
  }
  var univState = { q: '', field: '', sched: '', year: '' };
  function renderUniv() {
    var years = WPS.univYears();
    if (!univState.year) univState.year = years[0];
    var rows = WPS.univRows(univState.year);
    var fields = rows.map(function (r) { return r.field; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
    var est = A.estimate(), goal = S.get().profile.goal;
    var list = rows.filter(function (r) {
      return (!univState.field || r.field === univState.field) && (!univState.sched || r.schedKey === univState.sched) &&
        (!univState.q || (r.univ + r.dept).indexOf(univState.q) >= 0);
    }).sort(function (a, b) { return b.kyotsu - a.kyotsu || (b.hensa || 0) - (a.hensa || 0); });
    var html = say('志望校の「合格の目安」を調べられるよ。気になる学部の「目標にする」を押すと、ホームとロードマップに、いまの自分との差が出るようになるよ。', 'normal', 56);
    html += '<section class="card"><h1>🏫 大学データ(国公立大)</h1>' +
      '<div class="filters"><label>年度<select id="uYear">' + years.map(function (y) { return '<option' + (y === univState.year ? ' selected' : '') + '>' + y + '</option>'; }).join('') + '</select></label>' +
      '<label>系統<select id="uField"><option value="">すべて</option>' + fields.map(function (f) { return '<option' + (f === univState.field ? ' selected' : '') + '>' + h(f) + '</option>'; }).join('') + '</select></label>' +
      '<label>日程<select id="uSched"><option value="">すべて</option><option' + (univState.sched === '前期' ? ' selected' : '') + '>前期</option><option' + (univState.sched === '中期・後期' ? ' selected' : '') + '>中期・後期</option></select></label>' +
      '<label class="grow">大学名・学部で検索<input id="uQ" value="' + h(univState.q) + '" placeholder="例:大阪、データ"></label></div>' +
      (est.hensa !== null ? '<p class="hint">あなたの推定:共通テスト得点率 約' + est.kyotsu + '% ／ 偏差値 約' + est.hensa + '(アプリ内の問題からの目安)</p>' : '') +
      '<p class="muted">' + list.length + '件(共通テスト得点率の高い順)</p>' +
      '<div class="table-scroll"><table class="univ-t"><thead><tr><th>大学・学部</th><th>日程</th><th>共テ</th><th>偏差値</th><th></th></tr></thead><tbody>' +
      list.slice(0, 300).map(function (r) {
        var me = goal && goal.univ === r.univ && goal.dept === r.dept && goal.sched === r.sched;
        var reach = est.kyotsu !== null ? (est.kyotsu >= r.kyotsu ? 'reach-ok' : est.kyotsu >= r.kyotsu - 5 ? 'reach-near' : '') : '';
        return '<tr class="' + reach + (me ? ' is-goal' : '') + '"><td><b>' + h(r.univ) + '</b><br><small>' + h(r.dept) + '</small><br><small class="muted">' + h(r.field) + '・' + r.area + '</small></td><td>' + r.sched + '</td><td class="num">' + r.kyotsu + '%</td><td class="num">' + (r.hensa !== null ? r.hensa.toFixed(1) : '—') + '</td>' +
          '<td>' + (me ? '<span class="status st-good">目標</span>' : '<button class="btn small" data-goal="' + r.id + '">目標にする</button>') + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      (list.length > 300 ? '<p class="hint">上位300件を表示しています。検索でしぼりこんでください。</p>' : '') +
      '<p class="hint">共テ＝共通テストのボーダー得点率(合格の可能性が50%になる得点率の目安)／偏差値＝個別試験(2次)のボーダー偏差値。「—」は掲載なし。<br>出典:' + h(WPS.UNIV_SOURCES[univState.year] || '') + '／' + h(WPS.UNIV_REGION_SOURCE || '') + '<br>※ 登録済み:系統別5系統(法・政治、教育(総合科学)、生活科学、芸術・スポーツ科学、総合・環境・情報・人間)と、北海道地区の全学部。ほかは順次追加します。</p></section>';
    return html;
  }
  renderUniv.after = function () {
    function bind(id, key, ev) { var el = document.getElementById(id); el.addEventListener(ev || 'change', function () { univState[key] = el.value.trim(); if (key === 'q') { clearTimeout(bind.t); bind.t = setTimeout(rerender, 250); } else rerender(); }); }
    function rerender() { var y = window.scrollY; var f = document.activeElement && document.activeElement.id; view.innerHTML = renderUniv(); renderUniv.after(); if (f) { var el = document.getElementById(f); if (el) { el.focus(); if (el.setSelectionRange) el.setSelectionRange(el.value.length, el.value.length); } } window.scrollTo(0, y); }
    bind('uYear', 'year'); bind('uField', 'field'); bind('uSched', 'sched'); bind('uQ', 'q', 'input');
    view.querySelectorAll('[data-goal]').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = WPS.univRows(univState.year).filter(function (x) { return x.id === b.getAttribute('data-goal'); })[0];
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
      view.innerHTML = renderTutor();
      renderTutor.after();
    }).catch(function () {
      view.innerHTML = '<section class="card">' + say('ごめんね、共有データを読み込めませんでした。リンクが途中で切れていないか、生徒さんにもう一度送ってもらってね。', 'sad', 56) + '</section>';
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
