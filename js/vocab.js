/*
 * 単語トレーニング(#vocab)
 * ------------------------------------------------------------
 * 単語・用語の一覧(WORD_LISTS)を使って、次の学び方ができる画面です。
 *   ・4択テスト(制限時間・パス・わからない・読み上げ・○✕表示)
 *   ・結果(正解率の円グラフ、品詞ごとの正解率、正解/不正解の単語)
 *   ・赤シート(意味をかくして一気に確認、覚えていない語にマーカー)
 *   ・苦手選別(6語から苦手をタップ、長押しで意味)
 *   ・聞き流し(英語→日本語を自動で読み上げ)
 *   ・単語リスト(記憶度・「覚えた/忘れかけ/苦手/未学習」を自動で整理)
 *   ・学習記録(今日・累計の学習時間、連続日数、月のカレンダー)
 * 記録は state.vt に保存します(端末内。クラウド同期を使うときは一緒に送られます)。
 */
window.WPS = window.WPS || {};
WPS.makeVocab = function (ctx) {
  var h = ctx.h, toast = ctx.toast, judgeMark = ctx.judgeMark, shuffle = ctx.shuffle;
  var S = WPS.Store, D = WPS.date;
  var SEC = 50; // 1セクションの語数

  /* ---------- 保存データ ---------- */
  function vt() {
    var s = S.get();
    if (!s.vt) s.vt = {};
    var v = s.vt;
    v.w = v.w || {}; v.min = v.min || {}; v.cfg = v.cfg || {};
    var c = v.cfg, d = { order: 'rand', dir: 'e2j', n: 10, timer: 0, speak: 1, lang: 'both', rate: 'normal', voice: 'female', hide: 'm' };
    Object.keys(d).forEach(function (k) { if (c[k] === undefined) c[k] = d[k]; });
    return v;
  }
  function save() { S.save(); }
  function addTime(sec) {
    if (S.isView() || !(sec > 0)) return;
    var v = vt(), d = D.today();
    v.min[d] = (v.min[d] || 0) + Math.min(sec, 120);
  }

  /* ---------- 一覧と単語 ---------- */
  var st = { list: -1, subj: 'eng', src: 'all', mode: null, q: '', filt: 'all', limit: 100 };
  function lists() {
    return ctx.WORD_LISTS.map(function (L, i) { return { L: L, i: i }; }).filter(function (x) { return ctx.okList(x.L) && (WPS.BANK[x.L[2]] || []).length; });
  }
  function curList() {
    var ls = lists();
    if (!ls.some(function (x) { return x.i === st.list; })) {
      var en = ls.filter(function (x) { return x.L[4] === 'en'; });
      st.list = (en[0] || ls[0]).i;
    }
    return ctx.WORD_LISTS[st.list];
  }
  function isEn(L) { return L[4] === 'en'; }
  function items(L) {
    return ctx.wordItems(L).map(function (x, i) { x.i = i; x.key = L[2] + '|' + x.t; return x; });
  }

  /* ---------- 記憶度(忘却曲線の目安) ---------- */
  var STAB = [0.6, 1.5, 4, 9, 20, 45, 90]; // 連続正解の回数ごとの「記憶が半分ほどになるまでの日数」の目安
  function memOf(rec) {
    if (!rec) return null;
    if (!rec.k) return 10;
    var days = (Date.now() - rec.l) / 864e5;
    return Math.max(5, Math.round(100 * Math.pow(0.5, days / STAB[Math.min(rec.k, STAB.length) - 1])));
  }
  function statusOf(rec) {
    if (!rec) return 'new';
    if (rec.f) return 'weak';
    var m = memOf(rec);
    if (m >= 70) return 'ok';
    if (rec.k > 0) return 'fade';
    return 'weak';
  }
  var STATUS = { ok: '覚えた', fade: '忘れかけ', weak: '苦手', new: '未学習' };
  function mark(x, ok) {
    if (S.isView()) return;
    var w = vt().w, r = w[x.key] || (w[x.key] = { c: 0, x: 0, k: 0, l: 0 });
    if (ok) { r.c++; r.k++; if (r.k >= 2) delete r.f; }
    else { r.x++; r.k = 0; r.f = 1; }
    r.l = Date.now();
  }
  function flag(x, on) {
    if (S.isView()) return;
    var w = vt().w, r = w[x.key];
    if (on) { r = r || (w[x.key] = { c: 0, x: 0, k: 0, l: Date.now() }); r.f = 1; r.k = 0; }
    else if (r) { delete r.f; if (!r.k) { r.k = 1; r.l = Date.now(); } }
  }

  /* ---------- 品詞(意味の語尾から推定する目安) ---------- */
  var POS = ['名詞', '動詞', '形容詞', '副詞', 'その他'];
  function posOf(L, x) {
    if (!isEn(L)) return 'その他';
    if (L[2] !== 'en_m' && L[2] !== 'en_h') return 'その他';
    var m = String(x.m).split(/[、,・;／\/(（]/)[0].trim();
    if (/ly$/.test(x.t) && /[にくと]$/.test(m)) return '副詞';
    if (/^(めったに|ほとんど|決して|まったく|少しも).*ない$/.test(m)) return '副詞';
    if (/(する|させる|される|になる)$/.test(m)) return '動詞';
    if (/[^もこ]の$/.test(m)) return '形容詞';
    if (/(的な|な|しい|い)$/.test(m) && !/(違い|集い|争い|戦い|扱い|払い|行い|思い|願い|迷い|祝い|笑い|間違い)$/.test(m)) return '形容詞';
    if (/[うくぐすつぬぶむる]$/.test(m) && !/(物|事|者|所|人|家|日|会|界|館|性|力|法|品|際|場|類|器|室)$/.test(m)) return '動詞';
    if (/(に|く|ずつ|ほど|だけ|まで|ながら|しばしば|ときどき|ちょうど|すでに|かつて)$/.test(m)) return '副詞';
    return '名詞';
  }

  /* ---------- 読み上げ ---------- */
  var VOICE = {
    female: /(female|samantha|karen|victoria|moira|tessa|fiona|allison|ava|susan|zira|aria|jenny|kyoko|o-ren|nanami|haruka|ayumi|sayaka|google us english|google 日本語)/i,
    male: /(male|alex|daniel|fred|tom|aaron|arthur|oliver|david|guy|mark|otoya|hattori|keita|ichiro|google uk english male)/i
  };
  function pickVoice(lang, pref) {
    var vs = [];
    try { vs = speechSynthesis.getVoices(); } catch (e) { return null; }
    var re = lang === 'ja' ? /^ja/i : /^en/i;
    var same = vs.filter(function (v) { return re.test(v.lang); });
    var want = same.filter(function (v) { return VOICE[pref].test(v.name) && !(pref === 'female' && /\bmale\b/i.test(v.name)); });
    return want[0] || same[0] || null;
  }
  function say1(text, lang, done) {
    if (!('speechSynthesis' in window) || !text) { if (done) setTimeout(done, 300); return; }
    try {
      var c = vt().cfg, u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'ja' ? 'ja-JP' : 'en-US';
      u.rate = { fast: 1.25, normal: 0.95, slow: 0.7 }[c.rate] * (st.listenRate || 1);
      var v = pickVoice(lang, c.voice); if (v) u.voice = v;
      if (done) { u.onend = done; u.onerror = done; }
      speechSynthesis.speak(u);
    } catch (e) { if (done) done(); }
  }
  function stopSpeak() { try { speechSynthesis.cancel(); } catch (e) { /* 無視 */ } }
  // 単語(見出し)と意味を、設定の言語で読み上げる
  function sayItem(L, x, force) {
    var c = vt().cfg;
    if (!force && !c.speak) return;
    stopSpeak();
    var tl = isEn(L) ? 'en' : 'ja';
    if (c.lang === 'en') { if (tl === 'en') say1(x.t, 'en'); return; }
    if (c.lang === 'ja') { say1(x.m, 'ja'); return; }
    say1(x.t, tl, function () { say1(x.m, 'ja'); });
  }
  var canSpeak = 'speechSynthesis' in window;
  var IC = {'prev': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg>', 'next': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>', 'play': '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>', 'pause': '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'};
  function spBtn(i, cls) { return canSpeak ? '<button type="button" class="vt-say ' + (cls || '') + '" data-vsay="' + i + '" aria-label="読み上げ"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg></button>' : ''; }

  /* ---------- 出題範囲 ---------- */
  function pool(L, all) {
    var w = vt().w, src = st.src;
    if (src === 'all') return all;
    if (/^s\d+$/.test(src)) { var k = +src.slice(1); return all.slice(k * SEC, k * SEC + SEC); }
    return all.filter(function (x) { return statusOf(w[x.key]) === src; });
  }
  function ordered(arr) {
    var o = vt().cfg.order;
    if (o === 'seq') return arr.slice();
    if (o === 'rev') return arr.slice().reverse();
    return shuffle(arr);
  }
  function srcLabel(src, n) {
    if (src === 'all') return 'すべて';
    if (/^s\d+$/.test(src)) { var k = +src.slice(1); return 'Section ' + (k + 1) + '(' + (k * SEC + 1) + '〜' + Math.min(n, k * SEC + SEC) + '番)'; }
    return STATUS[src];
  }

  /* ---------- 学習時間(目安) ---------- */
  // 問題を解いた時刻の間かく(1問あたり最大2分)+単語トレーニングの時間+集中タイマー、の大きいほう
  function minutesByDay() {
    var s = S.get(), by = {}, last = {};
    s.attempts.slice().sort(function (a, b) { return a.t - b.t; }).forEach(function (a) {
      if (!a.t || a.src === 'school') return;
      var gap = last[a.d] ? (a.t - last[a.d]) / 1000 : 30;
      by[a.d] = (by[a.d] || 0) + Math.max(5, Math.min(120, gap));
      last[a.d] = a.t;
    });
    var v = s.vt || {}, out = {};
    Object.keys(v.min || {}).forEach(function (d) { by[d] = (by[d] || 0) + v.min[d]; });
    var pw = 25; try { pw = (JSON.parse(localStorage.getItem('wps_pomo') || 'null') || {}).work || 25; } catch (e) { /* 無視 */ }
    Object.keys(s.pomo || {}).forEach(function (d) { by[d] = Math.max(by[d] || 0, s.pomo[d] * pw * 60); });
    Object.keys(by).forEach(function (d) { out[d] = Math.round(by[d] / 60); });
    return out;
  }
  function hm(min) { return min >= 60 ? Math.floor(min / 60) + '<small>時間</small>' + (min % 60) + '<small>分</small>' : min + '<small>分</small>'; }
  function recordCard() {
    var mins = minutesByDay(), today = D.today(), tot = 0, days = 0;
    Object.keys(mins).forEach(function (d) { if (mins[d] > 0) { tot += mins[d]; days++; } });
    var set = WPS.Streak.studiedDays ? WPS.Streak.studiedDays() : {};
    var ym = st.month || today.slice(0, 7), y = +ym.slice(0, 4), m = +ym.slice(5, 7);
    var first = new Date(y, m - 1, 1), nd = new Date(y, m, 0).getDate(), lead = (first.getDay() + 6) % 7, mon = 0;
    var exam = S.get().profile.examDate;
    var cells = '';
    for (var i = 0; i < lead; i++) cells += '<span class="vc-d empty"></span>';
    for (var d = 1; d <= nd; d++) {
      var ds = ym + '-' + (d < 10 ? '0' : '') + d, on = set[ds] === 'study' || mins[ds] > 0;
      if (mins[ds]) mon += mins[ds];
      var prev = D.add(ds, -1), next = D.add(ds, 1), col = (lead + d - 1) % 7;
      var pOn = col > 0 && (set[prev] === 'study' || mins[prev] > 0), nOn = col < 6 && d < nd && (set[next] === 'study' || mins[next] > 0);
      cells += '<span class="vc-d' + (on ? ' on' : '') + (on && pOn ? ' jl' : '') + (on && nOn ? ' jr' : '') + (ds === today ? ' today' : '') + (ds === exam ? ' exam' : '') + '" title="' + ds + (mins[ds] ? ' ' + mins[ds] + '分' : '') + '"><b>' + d + '</b></span>';
    }
    return '<section class="card vt-rec"><h2>学習記録</h2>' +
      '<div class="vt-kpi"><div><span>今日の学習</span><b>' + hm(mins[today] || 0) + '</b></div><div><span>累計学習</span><b>' + hm(tot) + '</b></div></div>' +
      '<p class="vt-streak"><span>連続 <b>' + WPS.Streak.count() + '</b>日</span><span>総合 <b>' + days + '</b>日</span></p>' +
      '<div class="vc-head"><button type="button" class="vc-nav" data-vmon="-1" aria-label="前の月">‹</button><span>' + y + '年' + m + '月 <b>' + hm(mon) + '</b></span><button type="button" class="vc-nav" data-vmon="1" aria-label="次の月">›</button></div>' +
      '<div class="vc-grid">' + ['月', '火', '水', '木', '金', '土', '日'].map(function (w) { return '<span class="vc-w">' + w + '</span>'; }).join('') + cells + '</div>' +
      '<p class="hint">学習時間は、問題を解いた時刻・単語トレーニング・集中タイマーから計算した目安です。' + (exam ? '旗のついた日が受験日です。' : '') + '</p></section>';
  }

  /* ========== トップ画面 ========== */
  function renderTop() {
    var L = curList(), all = items(L), w = vt().w, c = vt().cfg;
    var cnt = { ok: 0, fade: 0, weak: 0, new: 0 };
    all.forEach(function (x) { cnt[statusOf(w[x.key])]++; });
    var n = all.length, pc = function (k) { return Math.round(cnt[k] / Math.max(1, n) * 100); };
    var ls = lists(), subs = [];
    ls.forEach(function (x) { if (subs.indexOf(x.L[0]) < 0) subs.push(x.L[0]); });
    if (subs.indexOf(st.subj) < 0 || L[0] !== st.subj) st.subj = L[0];
    var html = recordCard();
    html += '<section class="card"><h2>覚える単語帳</h2>' +
      '<div class="filter-row"><span class="f-label">教科</span><div class="seg">' + subs.map(function (k) { return '<button type="button" class="seg-btn' + (k === st.subj ? ' on' : '') + '" data-vsubj="' + k + '">' + WPS.SUBJECTS[k].name + '</button>'; }).join('') + '</div></div>' +
      '<div class="filter-row"><span class="f-label">種類</span><div class="seg">' + ls.filter(function (x) { return x.L[0] === st.subj; }).map(function (x) {
        return '<button type="button" class="seg-btn' + (x.i === st.list ? ' on' : '') + '" data-vlist="' + x.i + '">' + h(x.L[1]) + '<small> ' + (WPS.BANK[x.L[2]] || []).length + '</small></button>';
      }).join('') + '</div></div>' +
      '<div class="vt-sum"><span class="vt-n">' + n + '語</span>' +
      '<div class="vt-bar" aria-hidden="true"><i class="ok" style="width:' + pc('ok') + '%"></i><i class="fade" style="width:' + pc('fade') + '%"></i><i class="weak" style="width:' + pc('weak') + '%"></i></div>' +
      '<p class="vt-legend"><span class="ok">覚えた ' + pc('ok') + '%</span><span class="fade">忘れかけ ' + cnt.fade + '語</span><span class="weak">苦手 ' + cnt.weak + '語</span><span>未学習 ' + cnt.new + '語</span></p></div></section>';
    // 出題範囲
    var secs = Math.ceil(n / SEC);
    html += '<section class="card"><h2>出題範囲 <small class="muted">' + h(srcLabel(st.src, n)) + '</small></h2><div class="seg">' +
      [['all', 'すべて ' + n], ['weak', '苦手 ' + cnt.weak], ['fade', '忘れかけ ' + cnt.fade], ['new', '未学習 ' + cnt.new], ['ok', '覚えた ' + cnt.ok]].map(function (o) {
        return '<button type="button" class="seg-btn' + (st.src === o[0] ? ' on' : '') + '" data-vsrc="' + o[0] + '">' + o[1] + '</button>';
      }).join('') + '</div>' +
      '<details class="vt-secs"' + (/^s/.test(st.src) ? ' open' : '') + '><summary>' + SEC + '語ずつのセクションから選ぶ(全' + secs + 'セクション)</summary><div class="vt-sec-list">';
    for (var k = 0; k < secs; k++) {
      var part = all.slice(k * SEC, k * SEC + SEC), okn = part.filter(function (x) { return statusOf(w[x.key]) === 'ok'; }).length;
      html += '<button type="button" class="vt-sec' + (st.src === 's' + k ? ' on' : '') + '" data-vsrc="s' + k + '"><b>Section ' + (k + 1) + '</b><small>' + h(part[0].t) + ' 〜</small><span class="vt-sec-bar"><i style="width:' + Math.round(okn / part.length * 100) + '%"></i></span><em>' + okn + '/' + part.length + '</em></button>';
    }
    html += '</div></details></section>';
    // 学び方
    var m = [
      ['quiz', '4択テスト', 'テンポよく答えて、○✕ですぐ確認。結果は品詞ごとにわかる'],
      ['sheet', '赤シート', SEC + '語を一気に確認。タップでめくり、覚えていない語にマーカー'],
      ['sort', '苦手選別', '6語から苦手をタップで選ぶ。長押しで意味を確認'],
      ['listen', '聞き流し', '英語→日本語を自動で読み上げ。移動中やスキマ時間に'],
      ['list', '単語リスト', '記憶度つき。覚えた/忘れかけ/苦手を自動で整理']
    ];
    html += '<section class="card"><h2>学び方を選ぶ</h2><div class="vt-modes">' + m.map(function (x) {
      var dis = x[0] === 'listen' && !canSpeak;
      return '<button type="button" class="vt-mode m-' + x[0] + '" data-vmode="' + x[0] + '"' + (dis ? ' disabled' : '') + '><b>' + x[1] + '</b><small>' + (dis ? 'この端末では読み上げが使えません' : x[2]) + '</small></button>';
    }).join('') + '</div></section>';
    // 設定
    function opt(name, label, os) {
      return '<div class="vt-opt"><span>' + label + '</span><div class="seg">' + os.map(function (o) { return '<button type="button" class="seg-btn' + (String(c[name]) === String(o[0]) ? ' on' : '') + '" data-vcfg="' + name + '" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div>';
    }
    html += '<section class="card"><details class="vt-cfg"><summary><b>設定</b><small>出題順・問題数・読み上げなど</small></summary>' +
      opt('order', '出題順', [['rand', 'ランダム'], ['seq', '単語帳の順番'], ['rev', '単語帳の逆順']]) +
      opt('dir', '出題形式', [['e2j', '見出し→意味'], ['j2e', '意味→見出し']]) +
      opt('n', '問題数', [[10, '10問'], [20, '20問'], [50, '50問']]) +
      opt('timer', '制限時間', [[0, 'なし'], [10, '1問10秒'], [5, '1問5秒']]) +
      (canSpeak ? opt('speak', '読み上げ確認', [[1, 'オン'], [0, 'オフ']]) +
        opt('lang', '読み上げ言語', [['both', '英語と日本語'], ['en', '英語のみ'], ['ja', '日本語のみ']]) +
        opt('rate', '読み上げスピード', [['fast', '早い'], ['normal', '普通'], ['slow', '遅い']]) +
        opt('voice', '読み上げ声色', [['female', '女性'], ['male', '男性']]) +
        '<p class="hint">声色は、端末に入っている声から近いものを選びます。端末によっては変わらないことがあります。</p>' : '') +
      '</details></section>';
    return html;
  }

  /* ========== 4択テスト ========== */
  var qz = null;
  function startQuiz(L, list) {
    var all = items(L), c = vt().cfg;
    list = list || ordered(pool(L, all));
    if (!list.length) { toast('この範囲には単語がありません'); return false; }
    qz = { L: L, all: all, items: list.slice(0, +c.n), i: 0, res: [], t0: Date.now() };
    prepQ();
    return true;
  }
  function prepQ() {
    var x = qz.items[qz.i], c = vt().cfg, L = qz.L, p = posOf(L, x);
    var others = qz.all.filter(function (y) { return y.t !== x.t && y.m !== x.m; });
    var same = shuffle(others.filter(function (y) { return posOf(L, y) === p; }));
    var picks = same.slice(0, 3);
    if (picks.length < 3) picks = picks.concat(shuffle(others).filter(function (y) { return picks.indexOf(y) < 0; }).slice(0, 3 - picks.length));
    qz.ch = shuffle([x].concat(picks));
    qz.dir = c.dir; qz.ans = null; qz.start = Date.now();
  }
  function quizHTML() {
    var x = qz.items[qz.i], L = qz.L, c = vt().cfg, e2j = qz.dir === 'e2j';
    var prompt = e2j ? x.t : x.m, lab = function (y) { return e2j ? y.m : y.t; };
    var done = !!qz.ans;
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vqQuit">中断</button><b>' + (qz.i + 1) + '問目<small> / ' + qz.items.length + '</small></b><button type="button" class="vt-link" id="vqPass"' + (done ? ' disabled' : '') + '>パス</button></div>' +
      '<div class="progress"><i style="width:' + Math.round(qz.i / qz.items.length * 100) + '%"></i></div>' +
      (+c.timer && !done ? '<div class="vt-timebar"><i id="vqTime" style="animation-duration:' + c.timer + 's"></i></div>' : '') +
      '<section class="card vt-qcard">' + (isEn(L) || canSpeak ? spBtn('q', 'vt-say-q') : '') +
      '<p class="vt-prompt' + (e2j && isEn(L) ? ' en' : '') + '">' + h(prompt) + '</p>' + (x.h && !e2j ? '' : '') +
      (done ? '<p class="vt-reveal ' + (qz.ans.ok ? 'ok' : 'ng') + '"><b>' + (qz.ans.ok ? '○ 正解' : qz.ans.kind === 'pass' ? 'パス' : qz.ans.kind === 'idk' ? 'わからない' : qz.ans.kind === 'time' ? '時間切れ' : '✕ 不正解') + '</b>' + h(x.t) + ' ＝ ' + h(x.m) + (x.h ? '<small>' + h(x.h) + '</small>' : '') + '</p>' : '') +
      '</section><div class="vt-choices">' + qz.ch.map(function (y, i) {
        var cls = '';
        if (done) { if (y === x) cls = ' right'; else if (qz.ans.pick === i) cls = ' wrong'; else cls = ' dim'; }
        return '<button type="button" class="vt-ch' + cls + '" data-vch="' + i + '"' + (done ? ' disabled' : '') + '>' + h(lab(y)) + (done && y === x ? '<span class="vt-ok">○</span>' : '') + '</button>';
      }).join('') + '</div>' +
      (done ? '<button type="button" class="btn primary big vt-next" id="vqNext">' + (qz.i + 1 >= qz.items.length ? '結果を見る' : '次へ') + '</button>' : '<button type="button" class="vt-link vt-idk" id="vqIdk">わからない</button>');
  }
  var tmr = null;
  function clearT() { if (tmr) { clearTimeout(tmr); tmr = null; } }
  function answer(kind, pick) {
    if (!qz || qz.ans) return;
    clearT();
    var x = qz.items[qz.i], ok = kind === 'pick' && qz.ch[pick] === x;
    qz.ans = { ok: ok, kind: ok ? 'ok' : kind, pick: pick };
    addTime((Date.now() - qz.start) / 1000 + 2);
    mark(x, ok);
    qz.res.push({ x: x, ok: ok });
    save();
    if (kind === 'pick') judgeMark(ok ? 'ok' : 'ng');
    sayItem(qz.L, x);
    ctx.render();
    if (ok) tmr = setTimeout(function () { if (qz && qz.ans && location.hash === '#vocab') next(); }, 1300);
  }
  function next() {
    clearT();
    if (!qz) return;
    qz.i++;
    if (qz.i >= qz.items.length) { st.mode = 'result'; }
    else prepQ();
    ctx.render();
  }
  function quizAfter(view) {
    var x = qz.items[qz.i], c = vt().cfg;
    view.querySelector('#vqQuit').addEventListener('click', function () {
      clearT(); stopSpeak();
      if (qz.res.length) st.mode = 'result'; else { qz = null; st.mode = null; }
      ctx.render();
    });
    var ps = view.querySelector('#vqPass'); if (ps && !qz.ans) ps.addEventListener('click', function () { answer('pass', -1); });
    var idk = view.querySelector('#vqIdk'); if (idk) idk.addEventListener('click', function () { answer('idk', -1); });
    view.querySelectorAll('[data-vch]').forEach(function (b) { b.addEventListener('click', function () { answer('pick', +b.getAttribute('data-vch')); }); });
    var nx = view.querySelector('#vqNext'); if (nx) { nx.addEventListener('click', next); nx.focus(); }
    var sb = view.querySelector('[data-vsay="q"]');
    if (sb) sb.addEventListener('click', function () { sayItem(qz.L, x, true); });
    if (!qz.ans) {
      // 問題が出たら見出し(英語)だけを読み上げる(答えが聞こえないように)
      if (c.speak && qz.dir === 'e2j' && c.lang !== 'ja') { stopSpeak(); say1(x.t, isEn(qz.L) ? 'en' : 'ja'); }
      if (+c.timer) { clearT(); tmr = setTimeout(function () { if (qz && !qz.ans && location.hash === '#vocab') answer('time', -1); }, +c.timer * 1000); }
    }
  }

  /* ========== 結果 ========== */
  function resultHTML() {
    var r = qz.res, okN = r.filter(function (y) { return y.ok; }).length, p = Math.round(okN / Math.max(1, r.length) * 100);
    var C = 2 * Math.PI * 70;
    var html = '<section class="card vt-result"><h2>結果</h2><p class="muted small">' + h(qz.L[1]) + '・' + r.length + '問</p>' +
      '<div class="vt-ring"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="70" class="bg"/><circle cx="80" cy="80" r="70" class="fg" style="stroke-dasharray:' + (C * p / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><div><small>正解率</small><b>' + p + '<small>%</small></b><span>' + okN + ' / ' + r.length + '問</span></div></div>';
    if (isEn(qz.L) && (qz.L[2] === 'en_m' || qz.L[2] === 'en_h')) {
      var by = {}; POS.forEach(function (k) { by[k] = [0, 0]; });
      r.forEach(function (y) { var k = posOf(qz.L, y.x); by[k][1]++; if (y.ok) by[k][0]++; });
      html += '<h3>品詞ごとの正解率</h3><div class="vt-pos">' + POS.map(function (k, i) {
        var n = by[k][1], v = n ? Math.round(by[k][0] / n * 100) : null;
        return '<div class="vt-pcol p' + i + (n ? '' : ' none') + '"><span>' + (v === null ? '—' : v + '%') + '</span><div class="vt-ptrack"><i style="height:' + (v || 0) + '%"></i></div><small>' + k + '<em>' + n + '問</em></small></div>';
      }).join('') + '</div><p class="hint">品詞は意味の書き方から判定した目安です。</p>';
    }
    html += '<div class="btns vt-rbtns">' + (okN < r.length ? '<button type="button" class="btn primary" id="vrWrong">間違えた' + (r.length - okN) + '語をもう一度</button>' : '') + '<button type="button" class="btn" id="vrAgain">同じ範囲でもう一度</button><button type="button" class="btn ghost" id="vrBack">終了</button></div></section>';
    [['ng', '覚え直す単語', r.filter(function (y) { return !y.ok; })], ['ok', '正解した単語', r.filter(function (y) { return y.ok; })]].forEach(function (g) {
      if (!g[2].length) return;
      html += '<section class="card"><h2 class="vt-rh ' + g[0] + '">' + g[1] + ' <small>' + g[2].length + '語</small></h2><ul class="vt-rlist">' + g[2].map(function (y, i) {
        return '<li><div><b>' + h(y.x.t) + '</b><span>' + h(y.x.m) + '</span></div><em class="vt-pos-tag">' + posOf(qz.L, y.x) + '</em>' + spBtn(g[0] + i) + '</li>';
      }).join('') + '</ul></section>';
    });
    return html;
  }
  function resultAfter(view) {
    var r = qz.res;
    view.querySelectorAll('[data-vsay]').forEach(function (b) {
      var k = b.getAttribute('data-vsay'), g = k.slice(0, 2), i = +k.slice(2);
      var arr = r.filter(function (y) { return g === 'ok' ? y.ok : !y.ok; });
      b.addEventListener('click', function () { sayItem(qz.L, arr[i].x, true); });
    });
    var w = view.querySelector('#vrWrong');
    if (w) w.addEventListener('click', function () { var L = qz.L; if (startQuiz(L, shuffle(r.filter(function (y) { return !y.ok; }).map(function (y) { return y.x; })))) { st.mode = 'quiz'; ctx.render(); } });
    view.querySelector('#vrAgain').addEventListener('click', function () { if (startQuiz(qz.L)) { st.mode = 'quiz'; ctx.render(); } });
    view.querySelector('#vrBack').addEventListener('click', function () { qz = null; st.mode = null; ctx.render(); });
  }

  /* ========== 赤シート ========== */
  var sh = null;
  function sheetHTML() {
    var L = sh.L, w = vt().w, hideM = vt().cfg.hide === 'm';
    var rows = sh.items.map(function (x, i) {
      var on = sh.open[i], mk = !!(w[x.key] && w[x.key].f);
      return '<li class="vs-row' + (on ? ' open' : '') + (mk ? ' marked' : '') + '"><button type="button" class="vs-mark" data-vmark="' + i + '" aria-pressed="' + mk + '" aria-label="覚えていない語にマーカー">' + (mk ? '苦手' : '印') + '</button>' +
        '<button type="button" class="vs-cell" data-vopen="' + i + '"><span class="vs-t' + (hideM ? '' : ' cover') + '">' + h(x.t) + '</span><span class="vs-m' + (hideM ? ' cover' : '') + '">' + h(x.m) + '</span></button></li>';
    }).join('');
    var opened = sh.open.filter(Boolean).length;
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vsBack">戻る</button><b>赤シート<small> ' + opened + ' / ' + sh.items.length + '</small></b><button type="button" class="vt-link" id="vsUndo"' + (sh.hist.length ? '' : ' disabled') + '>1つ戻す</button></div>' +
      '<section class="card vs-card"><div class="vs-tools"><div class="seg"><button type="button" class="seg-btn' + (hideM ? ' on' : '') + '" data-vhide="m">意味をかくす</button><button type="button" class="seg-btn' + (!hideM ? ' on' : '') + '" data-vhide="t">見出しをかくす</button></div>' +
      '<button type="button" class="btn small" id="vsAll">' + (opened === sh.items.length ? 'ぜんぶかくす' : 'ぜんぶめくる') + '</button></div>' +
      '<p class="hint">行をタップするとめくれます。覚えていない語は左の「印」を押すと、苦手に入ります。</p>' +
      '<ul class="vs-list">' + rows + '</ul>' +
      (sh.more ? '<button type="button" class="btn big" id="vsNext">次の' + SEC + '語へ</button>' : '') + '</section>';
  }
  function startSheet(L, from) {
    var all = items(L), list = /^s\d+$/.test(st.src) || st.src !== 'all' ? pool(L, all) : all;
    if (vt().cfg.order === 'rand' && !/^s\d+$/.test(st.src)) list = shuffle(list);
    else if (vt().cfg.order === 'rev') list = list.slice().reverse();
    from = from || 0;
    if (!list.length) { toast('この範囲には単語がありません'); return false; }
    sh = { L: L, src: list, from: from, items: list.slice(from, from + SEC), open: [], hist: [], more: list.length > from + SEC };
    return true;
  }
  function sheetAfter(view) {
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelector('#vsBack').addEventListener('click', function () { sh = null; st.mode = null; ctx.render(); });
    view.querySelector('#vsUndo').addEventListener('click', function () { var i = sh.hist.pop(); if (i !== undefined) sh.open[i] = false; re(); });
    view.querySelector('#vsAll').addEventListener('click', function () { var all = sh.open.filter(Boolean).length === sh.items.length; sh.items.forEach(function (x, i) { sh.open[i] = !all; }); sh.hist = []; re(); });
    view.querySelectorAll('[data-vhide]').forEach(function (b) { b.addEventListener('click', function () { vt().cfg.hide = b.getAttribute('data-vhide'); save(); sh.open = []; sh.hist = []; re(); }); });
    view.querySelectorAll('[data-vopen]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-vopen');
        sh.open[i] = !sh.open[i];
        if (sh.open[i]) { sh.hist.push(i); addTime(4); sayItem(sh.L, sh.items[i]); }
        var li = b.parentNode; li.classList.toggle('open', !!sh.open[i]);
        var head = view.querySelector('.vt-qhead small'); if (head) head.textContent = ' ' + sh.open.filter(Boolean).length + ' / ' + sh.items.length;
        view.querySelector('#vsUndo').disabled = !sh.hist.length;
      });
    });
    view.querySelectorAll('[data-vmark]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-vmark'), x = sh.items[i], r = vt().w[x.key], on = !(r && r.f);
        flag(x, on); save();
        b.parentNode.classList.toggle('marked', on); b.textContent = on ? '苦手' : '印'; b.setAttribute('aria-pressed', on);
      });
    });
    var nx = view.querySelector('#vsNext'); if (nx) nx.addEventListener('click', function () { var L = sh.L, src = sh.src, f = sh.from + SEC; sh = { L: L, src: src, from: f, items: src.slice(f, f + SEC), open: [], hist: [], more: src.length > f + SEC }; ctx.render(); });
  }

  /* ========== 苦手選別 ========== */
  var so = null;
  function startSort(L) {
    var list = ordered(pool(L, items(L)));
    if (list.length < 2) { toast('この範囲には単語が足りません'); return false; }
    so = { L: L, list: list, at: 0, round: 1, sel: {}, picked: 0, seen: 0 };
    return true;
  }
  function sortHTML() {
    var six = so.list.slice(so.at, so.at + 6), n = Object.keys(so.sel).filter(function (k) { return so.sel[k]; }).length;
    if (!six.length) {
      return '<section class="card center vt-done"><h2>苦手選別 おわり</h2><p>' + so.seen + '語を見て、<b>' + so.picked + '語</b>を苦手に入れました。</p>' +
        '<div class="btns"><button type="button" class="btn primary" id="voWeak">苦手だけ4択で確認</button><button type="button" class="btn" id="voBack">戻る</button></div></section>';
    }
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="voBack">戻る</button><b>苦手選別<small> ' + so.round + '回目・選んだ ' + so.picked + '語</small></b><span></span></div>' +
      '<p class="hint">苦手だと感じる単語をタップ。わからない語は長押しで意味を確認できます。</p>' +
      '<div class="vo-grid">' + six.map(function (x, i) {
        return '<button type="button" class="vo-card' + (so.sel[i] ? ' on' : '') + '" data-vo="' + i + '"><span class="vo-chk" aria-hidden="true"></span><b class="vo-t">' + h(x.t) + '</b><span class="vo-m">' + h(x.m) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="vo-foot"><button type="button" class="btn" id="voEnd">完了</button><button type="button" class="btn primary" id="voNext">' + (n ? n + '語を選んで次へ' : '苦手なし。次へ') + '</button></div>';
  }
  function sortAfter(view) {
    var back = view.querySelector('#voBack'); if (back) back.addEventListener('click', function () { so = null; st.mode = null; ctx.render(); });
    var wk = view.querySelector('#voWeak');
    if (wk) wk.addEventListener('click', function () { var L = so.L; st.src = 'weak'; so = null; if (startQuiz(L)) st.mode = 'quiz'; else st.mode = null; ctx.render(); });
    view.querySelectorAll('[data-vo]').forEach(function (b) {
      var i = +b.getAttribute('data-vo'), lp = null, long = false;
      b.addEventListener('pointerdown', function () { long = false; lp = setTimeout(function () { long = true; b.classList.add('peek'); }, 450); });
      function up() { clearTimeout(lp); if (long) setTimeout(function () { b.classList.remove('peek'); }, 900); }
      b.addEventListener('pointerup', up); b.addEventListener('pointerleave', up); b.addEventListener('pointercancel', up);
      b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      b.addEventListener('click', function () {
        if (long) { long = false; return; }
        so.sel[i] = !so.sel[i]; b.classList.toggle('on', so.sel[i]);
        var n = Object.keys(so.sel).filter(function (k) { return so.sel[k]; }).length;
        view.querySelector('#voNext').textContent = n ? n + '語を選んで次へ' : '苦手なし。次へ';
      });
    });
    function commit() {
      var six = so.list.slice(so.at, so.at + 6);
      six.forEach(function (x, i) { if (so.sel[i]) { flag(x, true); so.picked++; } else flag(x, false); });
      so.seen += six.length; addTime(six.length * 3); save();
      so.at += 6; so.round++; so.sel = {};
    }
    var nx = view.querySelector('#voNext'); if (nx) nx.addEventListener('click', function () { commit(); ctx.render(); });
    var en = view.querySelector('#voEnd'); if (en) en.addEventListener('click', function () { commit(); so.at = so.list.length; ctx.render(); });
  }

  /* ========== 聞き流し ========== */
  var ls = null;
  function startListen(L) {
    var list = ordered(pool(L, items(L)));
    if (!list.length) { toast('この範囲には単語がありません'); return false; }
    ls = { L: L, list: list, i: 0, play: false, gen: 0, t: 0 };
    return true;
  }
  function listenHTML() {
    var x = ls.list[ls.i], r = st.listenRate || 1;
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vlBack">戻る</button><b>聞き流し<small> ' + (ls.i + 1) + ' / ' + ls.list.length + '</small></b><span></span></div>' +
      '<section class="card vl-card"><p class="muted small">' + h(ls.L[1]) + '・' + h(srcLabel(st.src, items(ls.L).length)) + '</p>' +
      '<p class="vl-t" id="vlT">' + h(x.t) + '</p><p class="vl-m" id="vlM">' + h(x.m) + '</p>' +
      '<div class="progress"><i id="vlBar" style="width:' + Math.round((ls.i + 1) / ls.list.length * 100) + '%"></i></div>' +
      '<div class="vl-ctl"><button type="button" class="vl-b" id="vlPrev" aria-label="前の単語">' + IC.prev + '</button><button type="button" class="vl-b main" id="vlPlay" aria-label="再生・一時停止">' + (ls.play ? IC.pause : IC.play) + '</button><button type="button" class="vl-b" id="vlNext" aria-label="次の単語">' + IC.next + '</button></div>' +
      '<div class="seg vl-rate">' + [[0.75, '0.75x'], [1, '1x'], [1.25, '1.25x'], [1.5, '1.5x']].map(function (o) { return '<button type="button" class="seg-btn' + (r === o[0] ? ' on' : '') + '" data-vrate="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<p class="hint">読み上げの言語・声色は、単語トレーニングの「設定」で変えられます。画面を消すと止まる端末があります。</p></section>';
  }
  function playLoop() {
    if (!ls || !ls.play) return;
    var g = ++ls.gen, x = ls.list[ls.i], c = vt().cfg, tl = isEn(ls.L) ? 'en' : 'ja';
    function show() {
      var t = document.getElementById('vlT'), m = document.getElementById('vlM'), b = document.getElementById('vlBar'), s = document.querySelector('#view .vt-qhead small');
      if (t) t.textContent = x.t; if (m) m.textContent = x.m;
      if (b) b.style.width = Math.round((ls.i + 1) / ls.list.length * 100) + '%';
      if (s) s.textContent = ' ' + (ls.i + 1) + ' / ' + ls.list.length;
    }
    show();
    function step() {
      if (!ls || g !== ls.gen || !ls.play) return;
      addTime((Date.now() - ls.t) / 1000); ls.t = Date.now();
      setTimeout(function () {
        if (!ls || g !== ls.gen || !ls.play) return;
        ls.i++;
        if (ls.i >= ls.list.length) { ls.i = 0; }
        save(); playLoop();
      }, 700);
    }
    ls.t = Date.now();
    stopSpeak();
    if (c.lang === 'ja') say1(x.m, 'ja', step);
    else if (c.lang === 'en' && tl === 'en') say1(x.t, 'en', function () { setTimeout(function () { say1(x.t, 'en', step); }, 500); });
    else say1(x.t, tl, function () { if (!ls || g !== ls.gen) return; setTimeout(function () { say1(x.m, 'ja', step); }, 350); });
  }
  function listenAfter(view) {
    view.querySelector('#vlBack').addEventListener('click', function () { if (ls) { ls.play = false; ls.gen++; } stopSpeak(); save(); ls = null; st.mode = null; ctx.render(); });
    view.querySelector('#vlPlay').addEventListener('click', function () {
      ls.play = !ls.play; this.innerHTML = ls.play ? IC.pause : IC.play;
      if (ls.play) playLoop(); else { ls.gen++; stopSpeak(); save(); }
    });
    function jump(d) { ls.i = (ls.i + d + ls.list.length) % ls.list.length; ls.gen++; stopSpeak(); if (ls.play) playLoop(); else ctx.render(); }
    view.querySelector('#vlPrev').addEventListener('click', function () { jump(-1); });
    view.querySelector('#vlNext').addEventListener('click', function () { jump(1); });
    view.querySelectorAll('[data-vrate]').forEach(function (b) { b.addEventListener('click', function () { st.listenRate = +b.getAttribute('data-vrate'); view.querySelectorAll('[data-vrate]').forEach(function (y) { y.classList.toggle('on', y === b); }); if (ls.play) { ls.gen++; stopSpeak(); playLoop(); } }); });
  }

  /* ========== 単語リスト(記憶度つき) ========== */
  function listHTML() {
    var L = curList(), all = items(L), w = vt().w, q = st.q;
    var cnt = { all: all.length, ok: 0, fade: 0, weak: 0, new: 0 };
    all.forEach(function (x) { cnt[statusOf(w[x.key])]++; });
    var shown = all.filter(function (x) { return (st.filt === 'all' || statusOf(w[x.key]) === st.filt) && (!q || (x.t + x.m).toLowerCase().indexOf(q.toLowerCase()) >= 0); });
    var html = '<div class="vt-qhead"><button type="button" class="vt-link" id="vwBack">戻る</button><b>' + h(L[1]) + '<small> ' + all.length + '語</small></b><span></span></div>' +
      '<section class="card"><div class="vt-sum"><div class="vt-bar" aria-hidden="true"><i class="ok" style="width:' + Math.round(cnt.ok / Math.max(1, all.length) * 100) + '%"></i><i class="fade" style="width:' + Math.round(cnt.fade / Math.max(1, all.length) * 100) + '%"></i><i class="weak" style="width:' + Math.round(cnt.weak / Math.max(1, all.length) * 100) + '%"></i></div>' +
      '<p class="vt-legend"><span class="ok">覚えた ' + Math.round(cnt.ok / Math.max(1, all.length) * 100) + '%</span><span class="weak">苦手 ' + Math.round(cnt.weak / Math.max(1, all.length) * 100) + '%</span></p></div>' +
      '<div class="seg">' + [['all', 'すべて'], ['weak', '苦手'], ['fade', '忘れかけ'], ['ok', '覚えた'], ['new', '未学習']].map(function (o) {
        return '<button type="button" class="seg-btn' + (st.filt === o[0] ? ' on' : '') + '" data-vfilt="' + o[0] + '">' + o[1] + '<small> ' + cnt[o[0]] + '</small></button>';
      }).join('') + '</div>' +
      '<div class="vw-tools"><input id="vwq" value="' + h(q) + '" placeholder="単語・意味で検索" aria-label="単語・意味で検索"><button type="button" class="btn small" id="vwHide">' + (st.hideW ? '意味を表示' : '意味をかくす') + '</button></div>' +
      (st.filt !== 'all' && shown.length ? '<button type="button" class="btn primary" id="vwQuiz">この' + shown.length + '語で4択テスト</button>' : '') + '</section>';
    html += '<section class="card"><ul class="vw-list' + (st.hideW ? ' hidem' : '') + '">' + shown.slice(0, st.limit).map(function (x) {
      var r = w[x.key], s = statusOf(r), m = memOf(r);
      return '<li>' + spBtn(x.i) + '<div class="vw-body"><b>' + h(x.t) + '</b><span><em class="vt-pos-tag">' + posOf(L, x) + '</em><i class="vw-m">' + h(x.m) + '</i></span></div>' +
        '<div class="vw-st"><em class="st-' + s + '">' + STATUS[s] + '</em>' + (m === null ? '' : '<small>記憶度 ' + m + '%</small>') + '</div></li>';
    }).join('') + '</ul>' + (shown.length > st.limit ? '<button type="button" class="btn big" id="vwMore">続きを表示(あと' + (shown.length - st.limit) + '語)</button>' : '') +
      (shown.length ? '' : '<p class="muted">この条件の単語はありません。</p>') +
      '<p class="hint">記憶度は、正解した回数と最後に学習した日から計算した目安です。時間がたつと下がり、「忘れかけ」に入ります。</p></section>';
    return html;
  }
  function listAfter(view) {
    function re() { var y = window.scrollY, f = document.activeElement && document.activeElement.id; ctx.render(); if (f === 'vwq') { var el = document.getElementById('vwq'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); } window.scrollTo(0, y); }
    var L = curList(), all = items(L);
    view.querySelector('#vwBack').addEventListener('click', function () { st.mode = null; ctx.render(); });
    view.querySelectorAll('[data-vfilt]').forEach(function (b) { b.addEventListener('click', function () { st.filt = b.getAttribute('data-vfilt'); st.limit = 100; re(); }); });
    var q = view.querySelector('#vwq'), tm; q.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { st.q = q.value.trim(); st.limit = 100; re(); }, 250); });
    view.querySelector('#vwHide').addEventListener('click', function () { st.hideW = !st.hideW; re(); });
    view.querySelectorAll('.vw-list.hidem li').forEach(function (li) { li.addEventListener('click', function (e) { if (e.target.closest('[data-vsay]')) return; li.classList.toggle('show'); }); });
    var mo = view.querySelector('#vwMore'); if (mo) mo.addEventListener('click', function () { st.limit += 300; re(); });
    view.querySelectorAll('[data-vsay]').forEach(function (b) { b.addEventListener('click', function () { sayItem(L, all[+b.getAttribute('data-vsay')], true); }); });
    var qb = view.querySelector('#vwQuiz'); if (qb) qb.addEventListener('click', function () { st.src = st.filt; if (startQuiz(L)) { st.mode = 'quiz'; ctx.render(); } });
  }

  /* ========== 画面の組み立て ========== */
  function render() {
    if (st.mode === 'quiz' && qz) return quizHTML();
    if (st.mode === 'result' && qz) return resultHTML();
    if (st.mode === 'sheet' && sh) return sheetHTML();
    if (st.mode === 'sort' && so) return sortHTML();
    if (st.mode === 'listen' && ls) return listenHTML();
    if (st.mode === 'list') return listHTML();
    st.mode = null;
    return renderTop();
  }
  function after() {
    var view = document.getElementById('view');
    if (st.mode === 'quiz') return quizAfter(view);
    if (st.mode === 'result') return resultAfter(view);
    if (st.mode === 'sheet') return sheetAfter(view);
    if (st.mode === 'sort') return sortAfter(view);
    if (st.mode === 'listen') return listenAfter(view);
    if (st.mode === 'list') return listAfter(view);
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelectorAll('[data-vmon]').forEach(function (b) {
      b.addEventListener('click', function () {
        var ym = st.month || D.today().slice(0, 7), y = +ym.slice(0, 4), m = +ym.slice(5, 7) + +b.getAttribute('data-vmon');
        if (m < 1) { m = 12; y--; } if (m > 12) { m = 1; y++; }
        st.month = y + '-' + (m < 10 ? '0' : '') + m; re();
      });
    });
    view.querySelectorAll('[data-vsubj]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-vsubj'); var f = lists().filter(function (x) { return x.L[0] === k; })[0]; if (f) st.list = f.i; st.src = 'all'; re(); }); });
    view.querySelectorAll('[data-vlist]').forEach(function (b) { b.addEventListener('click', function () { st.list = +b.getAttribute('data-vlist'); st.src = 'all'; re(); }); });
    view.querySelectorAll('[data-vsrc]').forEach(function (b) { b.addEventListener('click', function () { st.src = b.getAttribute('data-vsrc'); re(); }); });
    view.querySelectorAll('[data-vcfg]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-vcfg'), v = b.getAttribute('data-v');
        vt().cfg[k] = /^\d+$/.test(v) ? +v : v; save();
        view.querySelectorAll('[data-vcfg="' + k + '"]').forEach(function (y) { y.classList.toggle('on', y === b); });
        if (k === 'voice' || k === 'rate' || k === 'lang') sayItem(curList(), items(curList())[0], true);
      });
    });
    view.querySelectorAll('[data-vmode]').forEach(function (b) {
      b.addEventListener('click', function () {
        var m = b.getAttribute('data-vmode'), L = curList(), ok = true;
        if (m === 'quiz') ok = startQuiz(L);
        else if (m === 'sheet') ok = startSheet(L);
        else if (m === 'sort') ok = startSort(L);
        else if (m === 'listen') ok = startListen(L);
        else if (m === 'list') { st.filt = 'all'; st.q = ''; st.limit = 100; }
        if (ok) { st.mode = m; ctx.render(); }
      });
    });
  }
  // 画面を離れたら、読み上げとタイマーを止める
  window.addEventListener('hashchange', function () {
    if (location.hash !== '#vocab') { clearT(); if (ls) { ls.play = false; ls.gen++; } stopSpeak(); }
  });
  // キーボード:1〜4で選ぶ、Enterで次へ
  document.addEventListener('keydown', function (e) {
    if (location.hash !== '#vocab' || st.mode !== 'quiz' || !qz) return;
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (!qz.ans && /^[1-4]$/.test(e.key)) { e.preventDefault(); answer('pick', +e.key - 1); }
    else if (qz.ans && e.key === 'Enter' && document.activeElement && document.activeElement.id !== 'vqNext') { e.preventDefault(); next(); }
  });
  function inMode() { return !!st.mode; }
  function setList(i) { st.list = i; st.src = 'all'; st.mode = null; }
  return { render: render, after: after, inMode: inMode, setList: setList, statusOf: statusOf, memOf: memOf, posOf: posOf, minutesByDay: minutesByDay };
};
