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
    v.daily = v.daily || {};
    var c = v.cfg, d = { grad: 2, allm: 0, retry: 1, order: 'rand', dir: 'e2j', n: 10, timer: 0, speak: 1, lang: 'both', rate: 'normal', voice: 'female', hide: 'm' };
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
  // my単語帳(自分で作った単語帳)
  function mySets() { var v = vt(); return v.sets || (v.sets = []); }
  function setOf(L) { var id = String(L[2]).slice(3); return mySets().filter(function (x) { return x.id === id; })[0]; }
  function myList(set) {
    var en = set.items.length && set.items.every(function (x) { return /^[\x20-\x7E’]+$/.test(x.t); });
    return ['my', set.name, 'my:' + set.id, null, en ? 'en' : 'my'];
  }
  function lists() {
    return ctx.WORD_LISTS.map(function (L, i) { return { L: L, i: i }; }).filter(function (x) { return ctx.okList(x.L) && (WPS.BANK[x.L[2]] || []).length; })
      .concat(mySets().filter(function (x) { return x.items.length; }).map(function (x) { return { L: myList(x), i: 'my:' + x.id }; }));
  }
  function listById(id) {
    if (typeof id === 'string' && id.indexOf('my:') === 0) { var se = mySets().filter(function (x) { return 'my:' + x.id === id; })[0]; return se ? myList(se) : null; }
    return ctx.WORD_LISTS[id];
  }
  function countOf(L) { return L[0] === 'my' ? (setOf(L) || { items: [] }).items.length : (WPS.BANK[L[2]] || []).length; }
  function subjName(k) { return k === 'my' ? 'my単語帳' : WPS.SUBJECTS[k].name; }
  function curList() {
    var ls = lists();
    if (!ls.some(function (x) { return x.i === st.list; })) {
      var en = ls.filter(function (x) { return x.L[4] === 'en'; });
      st.list = (en[0] || ls[0]).i;
    }
    return listById(st.list);
  }
  function isEn(L) { return L[4] === 'en'; }
  function items(L) {
    var raw = L[0] === 'my' ? (setOf(L) || { items: [] }).items : ctx.wordItems(L);
    return raw.map(function (x, i) { return { t: x.t, m: x.m, h: x.h, p: x.p, d: x.d, part: x.part, i: i, key: L[2] + '|' + x.t }; });
  }
  // セクション:本の単語帳はPartごと、それ以外は50語ずつ
  function secsOf(all) {
    var out = [];
    if (all.length && all[0].part) {
      all.forEach(function (x, i) { var last = out[out.length - 1]; if (!last || last.part !== x.part) out.push({ part: x.part, from: i, to: i + 1 }); else last.to = i + 1; });
      var bk = (WPS.VBOOKS || []).filter(function (b) { return b.parts; })[0];
      out.forEach(function (o) { var info = bk && bk.parts[o.part - 1]; o.label = 'Part ' + o.part + (info && info[2] ? '(' + info[2] + ')' : ''); });
      return out;
    }
    for (var k = 0; k * SEC < all.length; k++) out.push({ from: k * SEC, to: Math.min(all.length, k * SEC + SEC), label: 'Section ' + (k + 1) });
    return out;
  }
  function derTag(x) { return x.d ? '<em class="vt-der">派生</em>' : '';
  }
  // しおり(my単語帳に入れる印)
  function bmap() { var v = vt(); return v.bm || (v.bm = {}); }
  function isBm(x) { return !!bmap()[x.key]; }
  function toggleBm(x) { if (S.isView()) return false; var b = bmap(); if (b[x.key]) delete b[x.key]; else b[x.key] = Date.now(); save(); return !!b[x.key]; }
  var BM_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 3h12v18l-6-4.5L6 21z" fill="currentColor"/></svg>';
  function bmBtn(id, on) { return '<button type="button" class="vt-bm' + (on ? ' on' : '') + '" data-vbm="' + id + '" aria-pressed="' + on + '" aria-label="しおり">' + BM_SVG + '</button>'; }
  // 熟語カットイン:覚えた単語を含む熟語を探す
  var IDX = null;
  function idiomsWith(L, x) {
    if (!L || (L[2] !== 'en_m' && L[2] !== 'en_h') || !WPS.BANK.en_idiom) return [];
    if (!IDX) {
      IDX = {};
      WPS.BANK.en_idiom.forEach(function (it) {
        String(it.t).toLowerCase().replace(/[~〜()（）.,!?]/g, ' ').split(/\s+/).forEach(function (w) { if (w.length > 1) (IDX[w] = IDX[w] || []).push(it); });
      });
    }
    var w = String(x.t).toLowerCase(), forms = [w, w + 's', w + 'es', w + 'ed', w + 'd', w + 'ing', w.replace(/e$/, '') + 'ing'];
    var out = [];
    forms.forEach(function (f) { (IDX[f] || []).forEach(function (it) { if (out.indexOf(it) < 0) out.push(it); }); });
    return out.slice(0, 3);
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
  // fast:すばやく(4秒以内)正解したか。苦手の「卒業」は、すばやい連続正解が設定の回数に達したとき
  function mark(x, ok, fast) {
    if (S.isView()) return;
    var v = vt(), w = v.w, r = w[x.key], isNew = !r;
    r = r || (w[x.key] = { c: 0, x: 0, k: 0, l: 0 });
    var dd = daily(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    dd.a++; if (!r.l || r.l < t0.getTime()) dd.u++;
    if (ok) {
      r.c++; r.k++;
      r.g = fast ? (r.g || 0) + 1 : 0;
      if (r.f && r.g >= +v.cfg.grad) { delete r.f; r.g = 0; delete r.mm; dd.ok++; }
      else if (!r.f && r.k === 2) dd.ok++;
    } else { r.x++; r.k = 0; r.g = 0; if (!r.f) dd.weak++; r.f = 1; }
    if (isNew && ok && r.k === 1 && fast) { /* 初見ですばやく正解:知っていた語 */ }
    r.l = Date.now();
  }
  function daily(ds) { var v = vt(); ds = ds || D.today(); return v.daily[ds] || (v.daily[ds] = { a: 0, u: 0, ok: 0, weak: 0 }); }
  // 意味を1つずつに分ける(「、」「,」「;」区切り)
  function meanings(m) { return String(m || '').split(/[、,;；／]/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function meaningsHTML(x, cls) {
    var ms = meanings(x.m), all = +vt().cfg.allm, head = all ? ms : ms.slice(0, 2), rest = all ? [] : ms.slice(2);
    var tag = posTag(x);
    return '<div class="vm-means ' + (cls || '') + '">' + head.map(function (m) { return '<p>' + (tag ? '<em class="vt-pos-tag">' + tag + '</em>' : '') + '<b>' + h(m) + '</b></p>'; }).join('') +
      (rest.length ? '<details class="vm-more"><summary>ほかの意味(' + rest.length + ')</summary>' + rest.map(function (m) { return '<p>' + h(m) + '</p>'; }).join('') + '</details>' : '') + '</div>';
  }
  function posTag(x) { return x.p || ''; }
  function flag(x, on) {
    if (S.isView()) return;
    var w = vt().w, r = w[x.key];
    if (on) { r = r || (w[x.key] = { c: 0, x: 0, k: 0, l: Date.now() }); r.f = 1; r.k = 0; }
    else if (r) { delete r.f; if (!r.k) { r.k = 1; r.l = Date.now(); } }
  }

  /* ---------- 品詞(意味の語尾から推定する目安) ---------- */
  var POS = ['名詞', '動詞', '形容詞', '副詞', 'その他'];
  function posOf(L, x) {
    if (x.p) return /動詞/.test(x.p) && x.p !== '助動詞' ? '動詞' : ['名詞', '形容詞', '副詞'].indexOf(x.p) >= 0 ? x.p : 'その他';
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
    if (/^s\d+$/.test(src)) { var sc = secsOf(all)[+src.slice(1)]; return sc ? all.slice(sc.from, sc.to) : all; }
    if (/^r\d+-\d+$/.test(src)) { var ab = src.slice(1).split('-'); return all.slice(+ab[0] - 1, +ab[1]); }
    if (src === 'bm') return all.filter(isBm);
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
    if (/^s\d+$/.test(src)) { var sc = secsOf(items(curList()))[+src.slice(1)]; return sc ? sc.label + '(' + (sc.from + 1) + '〜' + sc.to + '番)' : 'すべて'; }
    if (/^r\d+-\d+$/.test(src)) { var ab = src.slice(1).split('-'); return 'No.' + ab[0] + '〜' + Math.min(n, +ab[1]); }
    if (src === 'bm') return 'しおり';
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

  // 英単語帳の本棚(入力済みのPartまで使える。ほかは準備中)
  function shelf(L) {
    if (!WPS.VBOOKS || L[0] !== 'eng') return '';
    return '<section class="card"><h2>英単語帳</h2><div class="vb-shelf">' + WPS.VBOOKS.map(function (b) {
      var id = b.bank && b.done ? lists().filter(function (o) { return o.L[2] === b.bank; })[0] : null, on = id && L[2] === b.bank;
      var sub = id ? (on ? '使用中・' : '') + b.done.toLocaleString() + ' / ' + b.total.toLocaleString() + '語 入力済み' : (b.note ? b.note + '・' : '') + '準備中' + (b.total ? '(' + b.total.toLocaleString() + '語)' : '');
      return '<button type="button" class="vb-book' + (on ? ' on' : '') + (id ? '' : ' off') + '"' + (id ? ' data-vlist="' + id.i + '"' : ' disabled') + '><b>' + h(b.name) + '</b><small>' + sub + '</small></button>';
    }).join('') + '</div></section>';
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
    var td = vt().daily[D.today()] || { a: 0, u: 0 };
    var html = '';
    html += '<section class="card vt-quick"><button type="button" class="vt-auto" data-vmode="auto"><b>自動出題</b><small>忘れかけ→苦手→新しい語の順に、いま復習すると効果が高い語を選んで出題</small></button>' +
      '<div class="vt-quick2"><button type="button" class="vt-weakc" data-vweak="1"><b>苦手な単語</b><span>' + cnt.weak + '<small>語</small></span></button>' +
      (canSpeak ? '<button type="button" class="vt-weakl" data-vweak="listen"' + (cnt.weak ? '' : ' disabled') + '><i aria-hidden="true">' + IC.play + '</i><b>苦手の聞き流し</b></button>' : '') + '</div>' +
      '<p class="vt-today">今日 <b>' + td.a + '</b>回答 ・ <b>' + td.u + '</b>語</p></section>';
    html += recordCard() + WPS.Quest.card(h);
    html += shelf(L);
    html += '<section class="card"><h2>覚える単語帳</h2>' +
      '<div class="filter-row"><span class="f-label">教科</span><div class="seg">' + subs.map(function (k) { return '<button type="button" class="seg-btn' + (k === st.subj ? ' on' : '') + '" data-vsubj="' + k + '">' + subjName(k) + '</button>'; }).join('') + '</div></div>' +
      '<div class="filter-row"><span class="f-label">種類</span><div class="seg">' + ls.filter(function (x) { return x.L[0] === st.subj; }).map(function (x) {
        return '<button type="button" class="seg-btn' + (x.i === st.list ? ' on' : '') + '" data-vlist="' + x.i + '">' + h(x.L[1]) + '<small> ' + countOf(x.L) + '</small></button>';
      }).join('') + '</div></div>' +
      '<div class="vt-sum"><span class="vt-n">' + n + '語</span>' +
      '<div class="vt-bar" aria-hidden="true"><i class="ok" style="width:' + pc('ok') + '%"></i><i class="fade" style="width:' + pc('fade') + '%"></i><i class="weak" style="width:' + pc('weak') + '%"></i></div>' +
      '<p class="vt-legend"><span class="ok">覚えた ' + pc('ok') + '%</span><span class="fade">忘れかけ ' + cnt.fade + '語</span><span class="weak">苦手 ' + cnt.weak + '語</span><span>未学習 ' + cnt.new + '語</span></p></div>' + diagLast(L) +
      '<button type="button" class="btn small vt-mysets" data-vmode="sets">my単語帳を作る・編集する</button></section>';
    // 出題範囲
    var SS = secsOf(all), secs = SS.length, isBook = !!(all[0] && all[0].part);
    html += '<section class="card"><h2>出題範囲 <small class="muted">' + h(srcLabel(st.src, n)) + '</small></h2><div class="seg">' +
      [['all', 'すべて ' + n], ['bm', 'しおり ' + all.filter(isBm).length], ['weak', '苦手 ' + cnt.weak], ['fade', '忘れかけ ' + cnt.fade], ['new', '未学習 ' + cnt.new], ['ok', '覚えた ' + cnt.ok]].map(function (o) {
        return '<button type="button" class="seg-btn' + (st.src === o[0] ? ' on' : '') + '" data-vsrc="' + o[0] + '">' + o[1] + '</button>';
      }).join('') + '</div>' +
      '<div class="vt-range"><span>番号で指定</span><label>No.<input type="number" id="vrA" min="1" max="' + n + '" value="' + (/^r/.test(st.src) ? st.src.slice(1).split('-')[0] : 1) + '" inputmode="numeric"></label><span>〜</span><label>No.<input type="number" id="vrB" min="1" max="' + n + '" value="' + (/^r/.test(st.src) ? st.src.slice(1).split('-')[1] : Math.min(n, 50)) + '" inputmode="numeric"></label><button type="button" class="btn small" id="vrGo">この範囲にする</button></div>' +
      '<details class="vt-secs"' + (/^s/.test(st.src) ? ' open' : '') + '><summary>' + (isBook ? 'Partから選ぶ(全' + secs + 'Part)' : SEC + '語ずつのセクションから選ぶ(全' + secs + 'セクション)') + '</summary><div class="vt-sec-list">';
    for (var k = 0; k < secs; k++) {
      var part = all.slice(SS[k].from, SS[k].to), dn = part.filter(function (x) { return x.d; }).length, okn = part.filter(function (x) { return statusOf(w[x.key]) === 'ok'; }).length;
      html += '<button type="button" class="vt-sec' + (st.src === 's' + k ? ' on' : '') + '" data-vsrc="s' + k + '"><b>' + h(SS[k].label) + '</b><small>' + (isBook ? '見出し' + (part.length - dn) + '・派生' + dn : h(part[0].t) + ' 〜') + '</small><span class="vt-sec-bar"><i style="width:' + Math.round(okn / part.length * 100) + '%"></i></span><em>' + okn + '/' + part.length + '</em></button>';
    }
    html += '</div></details></section>';
    // 学び方
    var m = [
      ['quiz', '4択テスト', 'テンポよく答えて、○✕ですぐ確認。結果は品詞ごとにわかる'],
      ['sheet', '赤シート', SEC + '語を一気に確認。タップでめくり、覚えていない語にマーカー'],
      ['sort', '苦手選別', '6語から苦手をタップで選ぶ。長押しで意味を確認'],
      ['listen', '聞き流し', '英語→日本語を自動で読み上げ。移動中やスキマ時間に'],
      ['list', '単語リスト', '記憶度つき。覚えた/忘れかけ/苦手を自動で整理'],
      ['diag', '語彙力診断', '約5分・30問で、この単語帳の何語を知っているかを推定'],
      ['swipe', 'スワイプ', '右にスワイプで「自信あり」、左で「自信なし」。テンポよく仕分ける'],
      ['index', '索引・単語追加', '全部の単語帳から検索。自分で単語を1語ずつ追加'],
      ['stats', '分析', '解いた単語数・覚えた数・苦手の数を日ごとにカレンダーで']
    ];
    if (st.subj === 'eng') m.push(['talk', '場面別英会話', 'カフェ・空港・病院など8つの場面。聞いて、役になって話す']);
    m.push(['sets', 'my単語帳', '自分で作る・ノートから一括で作る・友だちと共有']);
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
      opt('retry', '間違えた問題', [[1, '最後にもう一度出す'], [0, '出さない']]) +
      opt('grad', '苦手な単語の卒業', [[1, '1回'], [2, '2回'], [3, '3回'], [4, '4回'], [5, '5回']]) +
      '<p class="hint">苦手な単語から外すまでの、連続正解(4秒以内)の回数です。</p>' +
      opt('allm', 'すべての意味を表示する', [[1, 'オン'], [0, 'オフ']]) +
      '<p class="hint">オフのときは、答えのカードに意味を2つまで出して、3つ目からは「ほかの意味」の中にしまいます。</p>' +
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
  function startQuiz(L, list, diag) {
    var all = items(L), c = vt().cfg;
    list = list || ordered(pool(L, all));
    if (!list.length) { toast('この範囲には単語がありません'); return false; }
    if (all.length < 4) { toast('4択にするには4語以上が必要です'); return false; }
    var its = list.slice(0, diag ? 30 : +c.n);
    qz = { L: L, all: all, items: its, base: its.length, again: {}, diag: !!diag, i: 0, res: [], t0: Date.now(), xp: 0, combo: 0, best: 0, first: !WPS.Streak.studiedToday() };
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
    var done = !!qz.ans, retry = qz.i >= qz.base;
    var cut = done ? idiomsWith(L, x) : [];
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vqQuit">中断</button><b>' + (qz.combo >= 2 ? '<span class="combo on">コンボ x' + qz.combo + '</span>' : '') + (qz.diag ? '語彙力診断 ' : '') + (qz.i + 1) + '問目<small> / ' + qz.items.length + '</small></b><button type="button" class="vt-link" id="vqPass"' + (done ? ' disabled' : '') + '>パス</button></div>' +
      '<div class="progress"><i style="width:' + Math.round(qz.i / qz.items.length * 100) + '%"></i></div>' +
      (+c.timer && !done ? '<div class="vt-timebar"><i id="vqTime" style="animation-duration:' + c.timer + 's"></i></div>' : '') +
      '<section class="card vt-qcard">' + (retry ? '<span class="vt-again">もう一度やってみましょう</span>' : '') + bmBtn('q', isBm(x)) + (isEn(L) || canSpeak ? spBtn('q', 'vt-say-q') : '') +
      '<p class="vt-prompt' + (e2j && isEn(L) ? ' en' : '') + '">' + h(prompt) + '</p>' + (x.h && !e2j ? '' : '') +
      (done ? '<p class="vt-reveal ' + (qz.ans.ok ? 'ok' : 'ng') + '"><b>' + (qz.ans.ok ? '○ 正解' : qz.ans.kind === 'pass' ? 'パス' : qz.ans.kind === 'idk' ? 'わからない' : qz.ans.kind === 'time' ? '時間切れ' : '✕ 不正解') + '</b>' + h(x.t) + (meanings(x.m).length > 1 ? '' : ' ＝ ' + h(x.m)) + (x.h ? '<small>' + h(x.h) + '</small>' : '') + '</p>' + (meanings(x.m).length > 1 ? meaningsHTML(x, 'in-reveal') : '') : '') +
      (cut.length ? '<div class="vt-cut"><p><span class="vt-cut-tag">熟語</span><em>' + h(x.t) + ' を含む熟語</em></p><ul>' + cut.map(function (it) { return '<li><b>' + h(it.t) + '</b><span>' + h(it.m) + '</span></li>'; }).join('') + '</ul></div>' : '') +
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
    mark(x, ok, Date.now() - qz.start <= 4000);
    var xr = WPS.Quest.onAnswer(ok, { vocab: true });
    qz.xp += xr.xp; qz.combo = ok ? qz.combo + 1 : 0; if (qz.combo > qz.best) qz.best = qz.combo;
    toasts(xr.msg);
    if (qz.i < qz.base) qz.res.push({ x: x, ok: ok, kind: kind });
    // 学習モード:間違えた単語は最後にもう一度出す(1回だけ)
    if (!ok && !qz.diag && +vt().cfg.retry && !qz.again[x.key]) { qz.again[x.key] = 1; qz.items.push(x); }
    save();
    if (kind === 'pick') judgeMark(ok ? 'ok' : 'ng');
    sayItem(qz.L, x);
    ctx.render();
    if (ok) tmr = setTimeout(function () { if (qz && qz.ans && location.hash === '#vocab') next(); }, 1300);
  }
  function toasts(ms) { (ms || []).forEach(function (m, i) { setTimeout(function () { toast(m); }, 900 + i * 2400); }); }
  function next() {
    clearT();
    if (!qz) return;
    qz.i++;
    if (qz.i >= qz.items.length) {
      st.mode = 'result';
      qz.sec = Math.round((Date.now() - qz.t0) / 1000);
      toasts(WPS.Quest.onSession(qz.res.length, qz.res.filter(function (y) { return y.ok; }).length)); save();
      if (qz.diag && !S.isView()) { var d = diagCalc(qz.res), v = vt(); v.diag = (v.diag || []).concat([{ d: D.today(), list: qz.L[2], p: Math.round(d.p * 1000) / 1000, est: round10(d.p * qz.all.length) }]).slice(-30); save(); }
    }
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
    var bq = view.querySelector('[data-vbm="q"]');
    if (bq) bq.addEventListener('click', function () { var on = toggleBm(x); bq.classList.toggle('on', on); bq.setAttribute('aria-pressed', on); toast(on ? 'しおりをつけました(出題範囲「しおり」で出題できます)' : 'しおりを外しました'); });
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
    if (qz.diag) return diagHTML(r, C);
    var html = '<section class="card vt-result"><h2>結果</h2><p class="muted small">' + h(qz.L[1]) + '・' + r.length + '問</p>' +
      '<div class="vt-ring"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="70" class="bg"/><circle cx="80" cy="80" r="70" class="fg" style="stroke-dasharray:' + (C * p / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><div><small>正解率</small><b>' + p + '<small>%</small></b><span>' + okN + ' / ' + r.length + '問</span></div></div>' +
      (WPS.lessonTiles ? WPS.lessonTiles(qz.xp, okN / Math.max(1, r.length), qz.sec, qz.best) : '');
    if (qz.first && WPS.streakCelebrate && WPS.Streak.studiedToday()) html = WPS.streakCelebrate() + html;
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
  // 語彙力診断の結果:当てずっぽうで当たる分(4択なので誤答の1/3)を差し引いて、知っている割合を推定する
  function diagCalc(r) {
    var n = r.length, okN = 0, wrongPick = 0;
    r.forEach(function (y) { if (y.ok) okN++; else if (y.kind === 'pick') wrongPick++; });
    var p = Math.max(0, Math.min(1, (okN - wrongPick / 3) / Math.max(1, n)));
    var se = Math.sqrt(Math.max(p * (1 - p), 0.0025) / Math.max(1, n));
    return { p: p, lo: Math.max(0, p - 1.96 * se), hi: Math.min(1, p + 1.96 * se), n: n, ok: okN };
  }
  function round10(v) { return v >= 100 ? Math.round(v / 10) * 10 : Math.round(v); }
  function diagHTML(r, C) {
    var d = diagCalc(r), N = qz.all.length, est = round10(d.p * N), pp = Math.round(d.p * 100);
    var msg = pp >= 80 ? 'この単語帳はほぼ身についています。忘れかけの確認と、次の単語帳へ進むのがおすすめです。' : pp >= 50 ? '半分以上は知っています。苦手選別で知らない語だけを集めると、効率よく覚えられます。' : pp >= 25 ? 'これから伸びる段階です。50語ずつのセクションを、赤シートと4択で1つずつ進めましょう。' : 'まだ知らない語が多い単語帳です。前の段階の単語帳から始めるか、1日1セクションずつ進めましょう。';
    return '<section class="card vt-result"><h2>語彙力診断の結果</h2><p class="muted small">' + h(qz.L[1]) + '(全' + N + '語)から' + d.n + '問</p>' +
      '<div class="vt-ring"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="70" class="bg"/><circle cx="80" cy="80" r="70" class="fg" style="stroke-dasharray:' + (C * pp / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><div><small>知っている語(推定)</small><b>' + est + '<small>語</small></b><span>' + pp + '%・正解 ' + d.ok + '/' + d.n + '</span></div></div>' +
      '<p class="vt-diag-range">推定のはば:およそ <b>' + round10(d.lo * N) + '〜' + round10(d.hi * N) + '語</b></p><p>' + msg + '</p>' +
      '<p class="hint">30問だけで全体を推定しているため、誤差があります。4択はあてずっぽうでも4回に1回当たるので、その分を差し引いて計算しています(「わからない」は差し引きません)。模試や検定のスコアを予測するものではありません。</p>' +
      '<div class="btns vt-rbtns"><button type="button" class="btn primary" id="vrBack">終了</button></div></section>';
  }
  function diagLast(L) {
    var hs = (vt().diag || []).filter(function (x) { return x.list === L[2]; });
    if (!hs.length) return '';
    var last = hs[hs.length - 1], prev = hs[hs.length - 2];
    return '<p class="vt-diag-last">語彙力診断(' + h(last.d.slice(5).replace('-', '/')) + '):約<b>' + last.est + '語</b>' + (prev ? '<small>(前回 ' + prev.est + '語)</small>' : '') + '</p>';
  }
  function resultAfter(view) {
    var r = qz.res;
    if (qz.diag) { view.querySelector('#vrBack').addEventListener('click', function () { qz = null; st.mode = null; ctx.render(); }); return; }
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
        '<button type="button" class="vs-cell" data-vopen="' + i + '"><span class="vs-t' + (hideM ? '' : ' cover') + '">' + h(x.t) + '</span><span class="vs-m' + (hideM ? ' cover' : '') + '">' + derTag(x) + h(x.m) + '</span></button></li>';
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
        if (sh.open[i]) { sh.hist.push(i); addTime(4); sayItem(sh.L, sh.items[i]); toasts(WPS.Quest.bump('vocab', 1)); save(); }
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
      so.seen += six.length; addTime(six.length * 3); toasts(WPS.Quest.bump('vocab', six.length)); save();
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
    cnt.bm = all.filter(isBm).length;
    var shown = all.filter(function (x) { return (st.filt === 'all' || (st.filt === 'bm' ? isBm(x) : statusOf(w[x.key]) === st.filt)) && (!q || (x.t + x.m).toLowerCase().indexOf(q.toLowerCase()) >= 0); });
    var html = '<div class="vt-qhead"><button type="button" class="vt-link" id="vwBack">戻る</button><b>' + h(L[1]) + '<small> ' + all.length + '語</small></b><span></span></div>' +
      '<section class="card"><div class="vt-sum"><div class="vt-bar" aria-hidden="true"><i class="ok" style="width:' + Math.round(cnt.ok / Math.max(1, all.length) * 100) + '%"></i><i class="fade" style="width:' + Math.round(cnt.fade / Math.max(1, all.length) * 100) + '%"></i><i class="weak" style="width:' + Math.round(cnt.weak / Math.max(1, all.length) * 100) + '%"></i></div>' +
      '<p class="vt-legend"><span class="ok">覚えた ' + Math.round(cnt.ok / Math.max(1, all.length) * 100) + '%</span><span class="weak">苦手 ' + Math.round(cnt.weak / Math.max(1, all.length) * 100) + '%</span></p></div>' +
      '<div class="seg">' + [['all', 'すべて'], ['bm', 'しおり'], ['weak', '苦手'], ['fade', '忘れかけ'], ['ok', '覚えた'], ['new', '未学習']].map(function (o) {
        return '<button type="button" class="seg-btn' + (st.filt === o[0] ? ' on' : '') + '" data-vfilt="' + o[0] + '">' + o[1] + '<small> ' + cnt[o[0]] + '</small></button>';
      }).join('') + '</div>' +
      '<div class="vw-tools"><input id="vwq" value="' + h(q) + '" placeholder="単語・意味で検索" aria-label="単語・意味で検索"><button type="button" class="btn small" id="vwHide">' + (st.hideW ? '意味を表示' : '意味をかくす') + '</button></div>' +
      (st.filt !== 'all' && shown.length ? '<button type="button" class="btn primary" id="vwQuiz">この' + shown.length + '語で4択テスト</button>' : '') + '</section>';
    html += '<section class="card"><ul class="vw-list' + (st.hideW ? ' hidem' : '') + '">' + shown.slice(0, st.limit).map(function (x) {
      var r = w[x.key], s = statusOf(r), m = memOf(r);
      return '<li>' + spBtn(x.i) + '<div class="vw-body"><b>' + h(x.t) + '</b><span>' + derTag(x) + '<em class="vt-pos-tag">' + (x.p || posOf(L, x)) + '</em><i class="vw-m">' + h(x.m) + '</i></span>' + (r && r.mm ? '<small class="vw-mm">まちがえた意味:' + h(r.mm.join('、')) + '</small>' : '') + '</div>' +
        '<div class="vw-st"><em class="st-' + s + '">' + STATUS[s] + '</em>' + (m === null ? '' : '<small>記憶度 ' + m + '%</small>') + '</div>' + bmBtn(x.i, isBm(x)) + '</li>';
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
    view.querySelectorAll('.vw-list.hidem li').forEach(function (li) { li.addEventListener('click', function (e) { if (e.target.closest('[data-vsay],[data-vbm]')) return; li.classList.toggle('show'); }); });
    var mo = view.querySelector('#vwMore'); if (mo) mo.addEventListener('click', function () { st.limit += 300; re(); });
    view.querySelectorAll('[data-vsay]').forEach(function (b) { b.addEventListener('click', function () { sayItem(L, all[+b.getAttribute('data-vsay')], true); }); });
    view.querySelectorAll('[data-vbm]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var on = toggleBm(all[+b.getAttribute('data-vbm')]); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); });
    var qb = view.querySelector('#vwQuiz'); if (qb) qb.addEventListener('click', function () { st.src = st.filt; if (startQuiz(L)) { st.mode = 'quiz'; ctx.render(); } });
  }

  /* ========== my単語帳(作る・ノートから一括作成・共有) ========== */
  // 1行に1語。「見出し|意味」「見出し：意味」「見出し<タブ>意味」「見出し = 意味」「見出し - 意味」「見出し,意味」のどれでもOK
  function parseLines(text) {
    var out = [], seen = {};
    String(text || '').split(/\r?\n/).forEach(function (line) {
      line = line.replace(/^\s*(?:[・\-*●○◆■□▪︎]|\d+[.)．、]|[①-⑳])\s*/, '').trim();
      if (!line) return;
      var seps = ['\t', '|', '｜', '：', ':', '＝', '=', ' - ', ' – ', '…', ',', '、'], t = null, m = null;
      for (var i = 0; i < seps.length; i++) {
        var k = line.indexOf(seps[i]);
        if (k > 0 && k < line.length - seps[i].length) { t = line.slice(0, k).trim(); m = line.slice(k + seps[i].length).trim(); break; }
      }
      if (!t || !m || seen[t]) return;
      seen[t] = 1; out.push({ t: t.slice(0, 120), m: m.slice(0, 300) });
    });
    return out;
  }
  function setsHTML() {
    var sets = mySets(), ed = st.edit;
    var html = '<div class="vt-qhead"><button type="button" class="vt-link" id="vmBack">戻る</button><b>my単語帳<small> ' + sets.length + '冊</small></b><span></span></div>';
    if (ed) {
      var n = parseLines(ed.text).length;
      return html + '<section class="card vm-form"><h2>' + (ed.id ? '単語帳を編集' : '新しい単語帳') + '</h2>' +
        '<label>名前<input id="vmName" maxlength="40" value="' + h(ed.name) + '" placeholder="例:英語の小テスト 第3回"></label>' +
        '<label>単語と意味(1行に1つ)<textarea id="vmText" rows="12" placeholder="apple|りんご\n細胞膜：細胞をつつむうすい膜\n円錐の体積 = 底面積×高さ÷3">' + h(ed.text) + '</textarea></label>' +
        '<p class="hint">「見出し|意味」「見出し：意味」「見出し = 意味」「見出し - 意味」、表計算ソフトからのコピー(タブ区切り)に対応しています。授業ノートを「用語:説明」の形で書いておけば、そのまま貼り付けて単語カードにできます。行頭の「・」や番号は自動で外します。</p>' +
        '<p class="vm-count" id="vmCount">読み取れた語:<b>' + n + '</b>語</p>' +
        '<div class="btns"><button type="button" class="btn primary" id="vmSave">保存する</button><button type="button" class="btn ghost" id="vmCancel">やめる</button></div></section>';
    }
    html += '<section class="card"><div class="btns"><button type="button" class="btn primary" id="vmNew">新しく作る</button><label class="btn vm-file">ファイルから読みこむ<input type="file" id="vmFile" accept=".txt,.csv,.tsv,.json,text/plain"></label></div>' +
      '<p class="hint">作った単語帳は、4択・赤シート・苦手選別・聞き流しなど、すべての学び方で使えます。「書き出す」でファイルにすると、友だちや先生と共有できます。</p></section>';
    if (!sets.length) html += '<section class="card"><p class="muted">まだ単語帳がありません。「新しく作る」から作ってみましょう。</p></section>';
    sets.forEach(function (se, i) {
      html += '<section class="card vm-set"><div class="vm-head"><b>' + h(se.name) + '</b><small>' + se.items.length + '語</small></div>' +
        '<p class="vm-peek">' + se.items.slice(0, 4).map(function (x) { return h(x.t); }).join('、') + (se.items.length > 4 ? ' …' : '') + '</p>' +
        '<div class="btns"><button type="button" class="btn small primary" data-vmuse="' + i + '"' + (se.items.length ? '' : ' disabled') + '>学習する</button><button type="button" class="btn small" data-vmedit="' + i + '">編集</button><button type="button" class="btn small" data-vmexp="' + i + '">書き出す</button><button type="button" class="btn small ghost" data-vmdel="' + i + '">削除</button></div></section>';
    });
    return html;
  }
  function download(name, text) {
    try {
      var a = document.createElement('a'), url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      a.href = url; a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 500);
    } catch (e) { toast('この端末では書き出せませんでした'); }
  }
  function setsAfter(view) {
    function re() { ctx.render(); }
    view.querySelector('#vmBack').addEventListener('click', function () { if (st.edit) { st.edit = null; re(); } else { st.mode = null; re(); } });
    var nw = view.querySelector('#vmNew'); if (nw) nw.addEventListener('click', function () { st.edit = { id: null, name: '', text: '' }; re(); });
    var tx = view.querySelector('#vmText');
    if (tx) {
      tx.addEventListener('input', function () { st.edit.text = tx.value; view.querySelector('#vmCount b').textContent = parseLines(tx.value).length; });
      view.querySelector('#vmName').addEventListener('input', function () { st.edit.name = this.value; });
      view.querySelector('#vmCancel').addEventListener('click', function () { st.edit = null; re(); });
      view.querySelector('#vmSave').addEventListener('click', function () {
        if (S.isView()) return;
        var its = parseLines(tx.value), name = (view.querySelector('#vmName').value || '').trim() || 'my単語帳';
        if (!its.length) { toast('単語が読み取れませんでした。「見出し|意味」の形で書いてください'); return; }
        var sets = mySets(), se = st.edit.id ? sets.filter(function (x) { return x.id === st.edit.id; })[0] : null;
        if (se) { var oldP = {}; se.items.forEach(function (x) { if (x.p) oldP[x.t] = x.p; }); its.forEach(function (x) { if (oldP[x.t]) x.p = oldP[x.t]; }); se.name = name; se.items = its; } else { se = { id: Date.now().toString(36), name: name, items: its }; sets.push(se); }
        save(); st.edit = null; st.list = 'my:' + se.id; st.src = 'all'; st.mode = null;
        toast('「' + name + '」を保存しました(' + its.length + '語)'); re();
      });
    }
    var fl = view.querySelector('#vmFile');
    if (fl) fl.addEventListener('change', function () {
      var f = fl.files && fl.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        var text = String(rd.result || ''), name = f.name.replace(/\.[^.]+$/, '');
        try { var js = JSON.parse(text); if (js && js.items) { name = js.name || name; text = js.items.map(function (x) { return x.t + '|' + x.m; }).join('\n'); } } catch (e) { /* テキストとして読む */ }
        st.edit = { id: null, name: name, text: text }; re();
      };
      rd.readAsText(f);
    });
    view.querySelectorAll('[data-vmuse]').forEach(function (b) { b.addEventListener('click', function () { var se = mySets()[+b.getAttribute('data-vmuse')]; st.list = 'my:' + se.id; st.subj = 'my'; st.src = 'all'; st.mode = null; re(); }); });
    view.querySelectorAll('[data-vmedit]').forEach(function (b) { b.addEventListener('click', function () { var se = mySets()[+b.getAttribute('data-vmedit')]; st.edit = { id: se.id, name: se.name, text: se.items.map(function (x) { return x.t + '|' + x.m; }).join('\n') }; re(); window.scrollTo(0, 0); }); });
    view.querySelectorAll('[data-vmexp]').forEach(function (b) { b.addEventListener('click', function () { var se = mySets()[+b.getAttribute('data-vmexp')]; download(se.name + '.txt', se.items.map(function (x) { return x.t + '|' + x.m; }).join('\n') + '\n'); }); });
    view.querySelectorAll('[data-vmdel]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-vmdel'), se = mySets()[i];
        if (!window.confirm('「' + se.name + '」を削除します。よろしいですか?')) return;
        mySets().splice(i, 1); if (st.list === 'my:' + se.id) st.list = -1; save(); re();
      });
    });
  }

  /* ========== 場面別英会話 ========== */
  function talkHTML() {
    var T = WPS.TALK || [];
    if (!st.talk) {
      return '<div class="vt-qhead"><button type="button" class="vt-link" id="vkBack">戻る</button><b>場面別英会話</b><span></span></div>' +
        '<section class="card"><p class="hint">場面を選ぶと、会話を聞いたり、「あなた」の役になって話す練習ができます。</p><div class="vk-list">' + T.map(function (sc, i) {
          return '<button type="button" class="vk-item" data-vk="' + i + '"><span class="vk-no">' + ('0' + (i + 1)).slice(-2) + '</span><span><b>' + h(sc.title) + '</b><small>' + h(sc.en) + '</small></span><i aria-hidden="true">›</i></button>';
        }).join('') + '</div></section>';
    }
    var sc = T[st.talk.i], role = st.talk.role, ja = st.talk.ja !== false;
    if (st.talk.build) return st.talk.build.end ? buildEnd(sc) : buildHTML(sc);
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vkBack">一覧へ</button><b>' + h(sc.title) + '</b><span></span></div>' +
      '<section class="card"><p class="vk-scene">' + h(sc.en) + '</p>' +
      '<div class="seg"><button type="button" class="seg-btn' + (!role && !st.talk.build ? ' on' : '') + '" data-vkrole="0">会話を見る</button><button type="button" class="seg-btn' + (st.talk.build ? ' on' : '') + '" data-vkrole="2">並べかえ練習</button><button type="button" class="seg-btn' + (role ? ' on' : '') + '" data-vkrole="1">ロールプレイ(あなたの番をかくす)</button><button type="button" class="seg-btn' + (ja ? ' on' : '') + '" id="vkJa">和訳</button></div>' +
      (canSpeak ? '<button type="button" class="btn primary vk-all" id="vkAll">会話をぜんぶ聞く</button>' : '') +
      '<ol class="vk-lines">' + sc.lines.map(function (ln, i) {
        var me = ln[0] === 'B', hid = role && me && !st.talk.open[i];
        return '<li class="vk-line ' + (me ? 'me' : 'you') + (hid ? ' hid' : '') + '" data-vkl="' + i + '"><span class="vk-who">' + (me ? 'あなた' : h(sc.who || '相手')) + '</span><div class="vk-bub"><p class="vk-en">' + h(ln[1]) + '</p>' + (ja ? '<p class="vk-ja">' + h(ln[2]) + '</p>' : '') + (hid ? '<p class="vk-hint">' + h(ln[2]) + '<small>英語で言ってみてから、タップで答えを確認</small></p>' : '') + '</div>' + (canSpeak ? spBtn('k' + i) : '') + '</li>';
      }).join('') + '</ol>' +
      (sc.tips ? '<div class="vk-tips"><b>使える表現</b><ul>' + sc.tips.map(function (t) { return '<li><b>' + h(t[0]) + '</b><span>' + h(t[1]) + '</span></li>'; }).join('') + '</ul></div>' : '') + '</section>';
  }
  function talkAfter(view) {
    var T = WPS.TALK || [];
    view.querySelector('#vkBack').addEventListener('click', function () { stopSpeak(); if (st.talk) st.talk = null; else st.mode = null; ctx.render(); window.scrollTo(0, 0); });
    view.querySelectorAll('[data-vk]').forEach(function (b) { b.addEventListener('click', function () { st.talk = { i: +b.getAttribute('data-vk'), role: false, open: {}, ja: true }; ctx.render(); window.scrollTo(0, 0); }); });
    if (!st.talk) return;
    var sc = T[st.talk.i];
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelectorAll('[data-vkrole]').forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-vkrole'); stopSpeak(); talkGen++; st.talk.build = null; if (v === '2') st.talk.build = newBuild(sc, 0); st.talk.role = v === '1'; st.talk.open = {}; if (st.talk.role) st.talk.ja = false; re(); }); });
    if (st.talk.build) return buildAfter(view, sc);
    view.querySelector('#vkJa').addEventListener('click', function () { st.talk.ja = !(st.talk.ja !== false); re(); });
    view.querySelectorAll('[data-vkl]').forEach(function (li) {
      li.addEventListener('click', function (e) {
        if (e.target.closest('[data-vsay]')) return;
        var i = +li.getAttribute('data-vkl');
        if (li.classList.contains('hid')) { st.talk.open[i] = true; addTime(6); if (sc.lines.every(function (ln, j) { return ln[0] !== 'B' || st.talk.open[j]; })) talkDone(); re(); if (canSpeak) { stopSpeak(); say1(sc.lines[i][1], 'en'); } }
      });
    });
    view.querySelectorAll('[data-vsay^="k"]').forEach(function (b) { b.addEventListener('click', function () { stopSpeak(); say1(sc.lines[+b.getAttribute('data-vsay').slice(1)][1], 'en'); }); });
    var all = view.querySelector('#vkAll');
    if (all) all.addEventListener('click', function () {
      stopSpeak(); var g = ++talkGen, i = 0;
      (function step() {
        if (g === talkGen && i >= sc.lines.length) talkDone();
        if (g !== talkGen || i >= sc.lines.length || location.hash !== '#vocab') return;
        var ln = sc.lines[i], el = view.querySelector('[data-vkl="' + i + '"]');
        view.querySelectorAll('.vk-line.now').forEach(function (x) { x.classList.remove('now'); }); if (el) el.classList.add('now');
        var c = vt().cfg, keep = c.voice; c.voice = ln[0] === 'B' ? (keep === 'male' ? 'female' : 'male') : keep;
        say1(ln[1], 'en', function () { setTimeout(function () { i++; step(); }, 450); });
        c.voice = keep; addTime(4);
      })();
    });
  }
  var talkGen = 0, talkDoneMap = {};
  function talkDone() { var k = D.today() + ':' + st.talk.i; if (talkDoneMap[k]) return; talkDoneMap[k] = 1; toasts(WPS.Quest.bump('talk', 1)); save(); }
  // 並べかえ練習:和訳を見て、単語カードを正しい順に並べて英文を作る
  function newBuild(sc, li) {
    var ln = sc.lines[li], words = ln[1].split(' ');
    var others = [];
    sc.lines.forEach(function (o, j) { if (j !== li) o[1].split(' ').forEach(function (w) { if (words.indexOf(w) < 0 && others.indexOf(w) < 0) others.push(w); }); });
    var extra = shuffle(others).slice(0, Math.min(3, Math.max(2, Math.round(words.length / 3))));
    var tiles = shuffle(words.concat(extra).map(function (w, k) { return { w: w, k: k } }));
    return { li: li, words: words, tiles: tiles, picked: [], res: null, okN: 0 };
  }
  function buildHTML(sc) {
    var b = st.talk.build, ln = sc.lines[b.li], done = b.li >= sc.lines.length;
    var head = '<div class="vt-qhead"><button type="button" class="vt-link" id="vkBack">一覧へ</button><b>' + h(sc.title) + '</b><span></span></div>' +
      '<section class="card"><div class="seg"><button type="button" class="seg-btn" data-vkrole="0">会話を見る</button><button type="button" class="seg-btn on" data-vkrole="2">並べかえ練習</button><button type="button" class="seg-btn" data-vkrole="1">ロールプレイ(あなたの番をかくす)</button></div>';
    var used = {}; b.picked.forEach(function (k) { used[k] = 1; });
    return head + '<div class="progress"><i style="width:' + Math.round(b.li / sc.lines.length * 100) + '%"></i></div>' +
      '<p class="vb-ask">この文を英語にしてください<small>' + (ln[0] === 'B' ? 'あなた' : h(sc.who || '相手')) + 'のセリフ ' + (b.li + 1) + ' / ' + sc.lines.length + '</small></p>' +
      '<div class="vb-ja">' + h(ln[2]) + '</div>' +
      '<div class="vb-ans' + (b.res ? (b.res.ok ? ' ok' : ' ng') : '') + '" aria-label="あなたの答え">' + (b.picked.length ? b.picked.map(function (k) { var t = b.tiles.filter(function (x) { return x.k === k; })[0]; return '<button type="button" class="vb-tile in" data-vbout="' + k + '"' + (b.res ? ' disabled' : '') + '>' + h(t.w) + '</button>'; }).join('') : '<span class="muted small">下の単語をタップして並べよう</span>') + '</div>' +
      '<div class="vb-bank">' + b.tiles.map(function (t) { return '<button type="button" class="vb-tile' + (used[t.k] ? ' used' : '') + '" data-vbin="' + t.k + '"' + (used[t.k] || b.res ? ' disabled' : '') + '>' + h(t.w) + '</button>'; }).join('') + '</div>' +
      (b.res ? '<div class="vb-res ' + (b.res.ok ? 'ok' : 'ng') + '"><b>' + (b.res.ok ? '○ 正解! よくできました' : '✕ おしい! 正しい文はこちら') + '</b><p class="vk-en">' + h(ln[1]) + '</p>' + (canSpeak ? '<button type="button" class="btn small" id="vbSay">英文を聞く</button>' : '') + '</div>' +
        '<button type="button" class="btn primary big vt-next" id="vbNext">' + (b.li + 1 >= sc.lines.length ? '結果を見る' : '次へ') + '</button>'
        : '<div class="vb-btns"><button type="button" class="btn" id="vbClear"' + (b.picked.length ? '' : ' disabled') + '>やり直す</button><button type="button" class="btn primary" id="vbCheck"' + (b.picked.length ? '' : ' disabled') + '>答え合わせ</button></div>') + '</section>';
  }
  function buildEnd(sc) {
    var b = st.talk.build;
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vkBack">一覧へ</button><b>' + h(sc.title) + '</b><span></span></div>' +
      '<section class="card center"><h2>並べかえ練習 おわり</h2><p>' + sc.lines.length + '文のうち <b>' + b.okN + '文</b> 正解しました。</p><div class="btns" style="justify-content:center"><button type="button" class="btn primary" data-vkrole="2">もう一度</button><button type="button" class="btn" data-vkrole="0">会話を見る</button></div></section>';
  }
  function buildAfter(view, sc) {
    var b = st.talk.build;
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelectorAll('[data-vbin]').forEach(function (x) { x.addEventListener('click', function () { b.picked.push(+x.getAttribute('data-vbin')); re(); }); });
    view.querySelectorAll('[data-vbout]').forEach(function (x) { x.addEventListener('click', function () { var k = +x.getAttribute('data-vbout'); b.picked.splice(b.picked.indexOf(k), 1); re(); }); });
    var cl = view.querySelector('#vbClear'); if (cl) cl.addEventListener('click', function () { b.picked = []; re(); });
    var ck = view.querySelector('#vbCheck');
    if (ck) ck.addEventListener('click', function () {
      var ans = b.picked.map(function (k) { return b.tiles.filter(function (x) { return x.k === k; })[0].w; }).join(' ');
      var ok = ans === b.words.join(' ');
      b.res = { ok: ok }; if (ok) b.okN++;
      judgeMark(ok ? 'ok' : 'ng'); addTime(10);
      toasts(WPS.Quest.onAnswer(ok, { extra: true }).msg); save();
      if (canSpeak) { stopSpeak(); say1(sc.lines[b.li][1], 'en'); }
      re();
    });
    var sy = view.querySelector('#vbSay'); if (sy) sy.addEventListener('click', function () { stopSpeak(); say1(sc.lines[b.li][1], 'en'); });
    var nx = view.querySelector('#vbNext');
    if (nx) nx.addEventListener('click', function () {
      if (b.li + 1 >= sc.lines.length) { talkDone(); b.li = sc.lines.length; b.end = true; ctx.render(); window.scrollTo(0, 0); return; }
      var okN = b.okN; st.talk.build = newBuild(sc, b.li + 1); st.talk.build.okN = okN; ctx.render();
    });
  }

  /* ========== 自動出題 ========== */
  // 忘れかけ(記憶度の低い順)→苦手→未学習 の順に、設定の問題数だけ選ぶ
  function autoPick(L) {
    var all = items(L), w = vt().w, n = +vt().cfg.n;
    var fade = all.filter(function (x) { return statusOf(w[x.key]) === 'fade'; }).sort(function (a, b) { return memOf(w[a.key]) - memOf(w[b.key]); });
    var weak = shuffle(all.filter(function (x) { return statusOf(w[x.key]) === 'weak'; }));
    var nw = all.filter(function (x) { return statusOf(w[x.key]) === 'new'; });
    var pick = fade.slice(0, Math.ceil(n * 0.5));
    pick = pick.concat(weak.slice(0, n - pick.length));
    pick = pick.concat(nw.slice(0, n - pick.length));
    if (pick.length < n) pick = pick.concat(shuffle(all.filter(function (x) { return pick.indexOf(x) < 0; })).slice(0, n - pick.length));
    return shuffle(pick);
  }

  /* ========== スワイプ(自信あり/自信なし) ========== */
  var sw = null;
  function startSwipe(L) {
    var list = ordered(pool(L, items(L))).slice(0, +vt().cfg.n);
    if (!list.length) { toast('この範囲には単語がありません'); return false; }
    sw = { L: L, list: list, i: 0, phase: 'q', yes: 0, no: 0, miss: {}, t: Date.now(), first: !WPS.Streak.studiedToday() };
    return true;
  }
  function swipeHTML() {
    var head = '<div class="vt-qhead"><button type="button" class="vt-link" id="vsQuit">中断</button><b>スワイプ<small> ' + Math.min(sw.i + 1, sw.list.length) + ' / ' + sw.list.length + '</small></b><span></span></div>' +
      '<div class="progress"><i style="width:' + Math.round(sw.i / sw.list.length * 100) + '%"></i></div>';
    if (sw.i >= sw.list.length) {
      return head + '<section class="card center vt-done"><h2>スワイプ おわり</h2><p>自信あり <b>' + sw.yes + '</b>語 ・ 自信なし <b>' + sw.no + '</b>語</p>' +
        '<div class="btns"><button type="button" class="btn primary" id="vsWeak"' + (sw.no ? '' : ' disabled') + '>自信なしの語を4択で確認</button><button type="button" class="btn" id="vsBack2">戻る</button></div></section>';
    }
    var x = sw.list[sw.i], L = sw.L;
    if (sw.phase === 'q') {
      return head + '<div class="sw-stage"><div class="sw-card" id="swCard" tabindex="0" role="group" aria-label="右にスワイプで自信あり、左で自信なし">' + bmBtn('s', isBm(x)) + (canSpeak ? spBtn('s', 'vt-say-q') : '') +
        '<p class="sw-word' + (isEn(L) ? ' en' : '') + '">' + h(x.t) + '</p><p class="muted small sw-tip">右へ:自信あり ／ 左へ:自信なし</p>' +
        '<div class="sw-ov yes">自信あり</div><div class="sw-ov no">自信なし</div></div></div>' +
        '<div class="sw-btns"><button type="button" class="btn sw-no" id="swNo">自信なし</button><button type="button" class="btn sw-yes" id="swYes">自信あり</button></div>';
    }
    var ms = meanings(x.m), yes = sw.phase === 'yes';
    return head + '<section class="card sw-ans">' + bmBtn('s', isBm(x)) + (canSpeak ? spBtn('s', 'vt-say-q') : '') +
      '<p class="sw-word sm' + (isEn(L) ? ' en' : '') + '">' + h(x.t) + '</p>' + meaningsHTML(x) +
      (yes ? '<p class="muted small">合っていたら「次へ」。思っていた意味とちがったら「実はちがった」。</p><div class="sw-btns"><button type="button" class="btn" id="swWrong">実はちがった</button><button type="button" class="btn primary" id="swNext">次へ</button></div>'
        : (ms.length > 1 ? '<div class="sw-miss"><p class="muted small">どの意味を間違えた?(複数選べます)</p>' + ms.map(function (m, i) { return '<button type="button" class="sw-mi' + (sw.miss[i] ? ' on' : '') + '" data-swm="' + i + '"><span>' + h(m) + '</span><i aria-hidden="true"></i></button>'; }).join('') + '</div>' : '') +
          '<button type="button" class="btn primary big vt-next" id="swNext">次へ</button>') + '</section>';
  }
  function swipeAfter(view) {
    function re() { ctx.render(); }
    var x = sw.list[sw.i];
    view.querySelector('#vsQuit').addEventListener('click', function () { sw = null; st.mode = null; stopSpeak(); re(); });
    var bk = view.querySelector('#vsBack2'); if (bk) bk.addEventListener('click', function () { sw = null; st.mode = null; re(); });
    var wk = view.querySelector('#vsWeak');
    if (wk) wk.addEventListener('click', function () { var L = sw.L, list = sw.no ? sw.list.filter(function (y) { return y.sw === 'no'; }) : []; sw = null; if (startQuiz(L, shuffle(list))) { st.mode = 'quiz'; re(); } });
    if (!x) return;
    var bq = view.querySelector('[data-vbm="s"]'); if (bq) bq.addEventListener('click', function (e) { e.stopPropagation(); var on = toggleBm(x); bq.classList.toggle('on', on); });
    var sb = view.querySelector('[data-vsay="s"]'); if (sb) sb.addEventListener('click', function (e) { e.stopPropagation(); sayItem(sw.L, x, true); });
    function decide(yes) {
      if (sw.phase !== 'q') return;
      var fast = Date.now() - sw.t <= 4000;
      sw.phase = yes ? 'yes' : 'no'; sw.miss = {}; x.sw = yes ? 'yes' : 'no';
      if (yes) sw.yes++; else sw.no++;
      mark(x, yes, fast); addTime((Date.now() - sw.t) / 1000 + 2);
      toasts(WPS.Quest.onAnswer(yes, { vocab: true }).msg); save();
      sayItem(sw.L, x); re();
    }
    var card = view.querySelector('#swCard');
    if (card) {
      if (sw.phase === 'q' && vt().cfg.speak && vt().cfg.lang !== 'ja') { stopSpeak(); say1(x.t, isEn(sw.L) ? 'en' : 'ja'); }
      var sx = null, dx = 0;
      card.addEventListener('pointerdown', function (e) { if (e.target.closest('button')) return; sx = e.clientX; dx = 0; card.setPointerCapture(e.pointerId); card.classList.add('drag'); });
      card.addEventListener('pointermove', function (e) {
        if (sx === null) return; dx = e.clientX - sx;
        card.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 18) + 'deg)';
        card.querySelector('.sw-ov.yes').style.opacity = Math.max(0, Math.min(1, dx / 90));
        card.querySelector('.sw-ov.no').style.opacity = Math.max(0, Math.min(1, -dx / 90));
      });
      function end() {
        if (sx === null) return; sx = null; card.classList.remove('drag');
        if (Math.abs(dx) > 90) { card.style.transform = 'translateX(' + (dx > 0 ? 600 : -600) + 'px) rotate(' + (dx > 0 ? 25 : -25) + 'deg)'; var y = dx > 0; setTimeout(function () { decide(y); }, 180); }
        else { card.style.transform = ''; card.querySelectorAll('.sw-ov').forEach(function (o) { o.style.opacity = 0; }); }
      }
      card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
      card.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') decide(true); if (e.key === 'ArrowLeft') decide(false); });
      view.querySelector('#swYes').addEventListener('click', function () { decide(true); });
      view.querySelector('#swNo').addEventListener('click', function () { decide(false); });
    }
    view.querySelectorAll('[data-swm]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-swm'); sw.miss[i] = !sw.miss[i]; b.classList.toggle('on', sw.miss[i]); }); });
    var wr = view.querySelector('#swWrong');
    if (wr) wr.addEventListener('click', function () {
      var r = vt().w[x.key]; if (r) { r.c = Math.max(0, r.c - 1); r.k = 0; r.g = 0; r.f = 1; r.x++; }
      sw.yes--; sw.no++; x.sw = 'no'; sw.phase = 'no'; save(); re();
    });
    var nx = view.querySelector('#swNext');
    if (nx) nx.addEventListener('click', function () {
      if (sw.phase === 'no') {
        var ms = meanings(x.m), sel = ms.filter(function (m, i) { return sw.miss[i]; }), r = vt().w[x.key];
        if (r && sel.length) r.mm = sel;
      }
      save(); sw.i++; sw.phase = 'q'; sw.t = Date.now(); stopSpeak(); re();
    });
  }

  /* ========== 索引(全単語の検索)・単語追加 ========== */
  var POS_CHIPS = ['品詞なし', '名詞', '動詞', '他動詞', '自動詞', '形容詞', '副詞', '前置詞', '接続詞', '代名詞', '助動詞', '熟語'];
  function addedSet() {
    var sets = mySets(), se = sets.filter(function (x) { return x.id === 'added'; })[0];
    if (!se) { se = { id: 'added', name: '追加した単語', items: [] }; sets.unshift(se); }
    return se;
  }
  function indexHTML() {
    var q = (st.iq || '').trim().toLowerCase(), hits = [], total = 0;
    lists().forEach(function (o) {
      var its = items(o.L); total += its.length;
      if (!q) return;
      its.forEach(function (x) { if (hits.length < 80 && (x.t.toLowerCase().indexOf(q) >= 0 || String(x.m).indexOf(st.iq.trim()) >= 0)) hits.push({ x: x, L: o.L, id: o.i }); });
    });
    var w = vt().w, a = st.add, ad = (mySets().filter(function (x) { return x.id === 'added'; })[0] || { items: [] }).items.length;
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="viBack">戻る</button><b>索引<small> 全' + total.toLocaleString() + '語</small></b><span></span></div>' +
      '<section class="card"><input id="viq" value="' + h(st.iq || '') + '" placeholder="単語・意味を検索" aria-label="単語・意味を検索">' +
      (q ? (hits.length ? '<ul class="vi-list">' + hits.map(function (o, i) { var s = statusOf(w[o.x.key]); return '<li><div class="vw-body"><b>' + h(o.x.t) + '</b><span><i class="vw-m">' + h(o.x.m) + '</i></span><small class="muted">' + h(o.L[1]) + '</small></div><div class="vw-st"><em class="st-' + s + '">' + STATUS[s] + '</em></div>' + (canSpeak ? spBtn('i' + i) : '') + '</li>'; }).join('') + '</ul>' + (hits.length >= 80 ? '<p class="hint">80件まで表示しています。ことばを足してしぼりこんでください。</p>' : '') : '<p class="muted">見つかりませんでした。下から追加できます。</p>') : '<p class="muted center small">単語を入力すると、すべての単語帳から検索できます</p>') + '</section>' +
      '<section class="card"><button type="button" class="vi-mine" id="viMine"><span><b>あなたの追加単語を見る</b><small>記憶度つきの一覧・4択などで学習</small></span><em>' + ad + '語 ›</em></button></section>' +
      '<section class="card vi-add"><h2>単語を追加</h2><input id="viT" value="' + h(a.t) + '" placeholder="単語(例:resilience)" aria-label="単語">' +
      a.ms.map(function (m, i) { return '<input class="vi-m" data-vim="' + i + '" value="' + h(m) + '" placeholder="意味' + (a.ms.length > 1 ? (i + 1) : '') + '(例:回復力)" aria-label="意味">'; }).join('') +
      '<div class="vi-pos">' + POS_CHIPS.map(function (p) { var v = p === '品詞なし' ? '' : p; return '<button type="button" class="seg-btn' + ((a.p || '') === v ? ' on' : '') + '" data-vipos="' + v + '">' + p + '</button>'; }).join('') + '</div>' +
      '<button type="button" class="vi-more" id="viMore">+ 意味を追加</button><button type="button" class="btn primary big" id="viSave">追加する</button></section>';
  }
  function indexAfter(view) {
    function re(focusId) { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); if (focusId) { var el = document.getElementById(focusId); if (el) { el.focus(); try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) { /* 無視 */ } } } }
    view.querySelector('#viBack').addEventListener('click', function () { st.mode = null; ctx.render(); });
    var q = view.querySelector('#viq'), tm;
    q.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { st.iq = q.value; re('viq'); }, 250); });
    view.querySelectorAll('[data-vsay^="i"]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-vsay').slice(1), qq = (st.iq || '').trim().toLowerCase(), hits = [];
        lists().forEach(function (o) { items(o.L).forEach(function (x) { if (hits.length < 80 && (x.t.toLowerCase().indexOf(qq) >= 0 || String(x.m).indexOf(st.iq.trim()) >= 0)) hits.push({ x: x, L: o.L }); }); });
        if (hits[i]) sayItem(hits[i].L, hits[i].x, true);
      });
    });
    var a = st.add;
    view.querySelector('#viT').addEventListener('input', function () { a.t = this.value; });
    view.querySelectorAll('[data-vim]').forEach(function (el) { el.addEventListener('input', function () { a.ms[+el.getAttribute('data-vim')] = el.value; }); });
    view.querySelectorAll('[data-vipos]').forEach(function (b) { b.addEventListener('click', function () { a.p = b.getAttribute('data-vipos'); view.querySelectorAll('[data-vipos]').forEach(function (y) { y.classList.toggle('on', y === b); }); }); });
    view.querySelector('#viMore').addEventListener('click', function () { if (a.ms.length < 6) { a.ms.push(''); re(); } });
    view.querySelector('#viMine').addEventListener('click', function () {
      var se = addedSet(); if (!se.items.length) { toast('まだ追加した単語はありません'); return; }
      save(); st.list = 'my:added'; st.subj = 'my'; st.filt = 'all'; st.q = ''; st.limit = 100; st.mode = 'list'; ctx.render();
    });
    view.querySelector('#viSave').addEventListener('click', function () {
      if (S.isView()) return;
      var t = (a.t || '').trim(), ms = a.ms.map(function (m) { return (m || '').trim(); }).filter(Boolean);
      if (!t || !ms.length) { toast('単語と意味を入力してください'); return; }
      var se = addedSet(), old = se.items.filter(function (x) { return x.t === t; })[0];
      if (old) { old.m = ms.join('、'); old.p = a.p || undefined; } else se.items.push({ t: t, m: ms.join('、'), p: a.p || undefined });
      save(); toast('「' + t + '」を追加しました(追加した単語:' + se.items.length + '語)');
      st.add = { t: '', ms: [''], p: '' }; re();
    });
  }

  /* ========== 分析(日ごとのカレンダー) ========== */
  function statsHTML() {
    var v = vt(), studied = Object.keys(v.w).length, unl = 0;
    lists().forEach(function (o) { items(o.L).forEach(function (x) { if (!v.w[x.key]) unl++; }); });
    var tab = st.stab || 'u', key = { u: 'u', ok: 'ok', weak: 'weak' }[tab], label = { u: '総単語数', ok: '覚えた単語', weak: '苦手な単語' };
    var ym = st.smonth || D.today().slice(0, 7), y = +ym.slice(0, 4), m = +ym.slice(5, 7);
    var first = new Date(y, m - 1, 1), nd = new Date(y, m, 0).getDate(), lead = (first.getDay() + 6) % 7, today = D.today(), max = 1, sum = 0;
    for (var d0 = 1; d0 <= nd; d0++) { var k0 = ym + '-' + (d0 < 10 ? '0' : '') + d0; max = Math.max(max, (v.daily[k0] || {})[key] || 0); }
    var cells = '';
    for (var i = 0; i < lead; i++) cells += '<span class="st-d empty"></span>';
    for (var d = 1; d <= nd; d++) {
      var ds = ym + '-' + (d < 10 ? '0' : '') + d, n = (v.daily[ds] || {})[key] || 0, deg = Math.round(n / max * 360);
      sum += n;
      cells += '<span class="st-d' + (ds === today ? ' today' : '') + (ds > today ? ' future' : '') + '"><small>' + d + '</small><i class="tab-' + tab + '" style="--deg:' + deg + 'deg">' + (n || (ds <= today ? '' : '')) + '</i></span>';
    }
    return '<div class="vt-qhead"><button type="button" class="vt-link" id="vaBack">戻る</button><b>分析</b><span></span></div>' +
      '<section class="card"><div class="st-top"><div><span class="muted small">今まで解いた総単語数</span><b>' + studied.toLocaleString() + '<small>語</small></b></div><div><span class="muted small">未学習</span><b class="sm">' + unl.toLocaleString() + '<small>語</small></b></div></div>' +
      '<div class="seg st-tabs">' + ['u', 'ok', 'weak'].map(function (t) { return '<button type="button" class="seg-btn' + (tab === t ? ' on' : '') + '" data-vstab="' + t + '">' + label[t] + '</button>'; }).join('') + '</div>' +
      '<div class="vc-head"><button type="button" class="vc-nav" data-vsmon="-1" aria-label="前の月">‹</button><span>' + y + '年' + m + '月 <b>' + sum + '</b>語</span><button type="button" class="vc-nav" data-vsmon="1" aria-label="次の月">›</button></div>' +
      '<div class="st-grid">' + ['月', '火', '水', '木', '金', '土', '日'].map(function (w) { return '<span class="vc-w">' + w + '</span>'; }).join('') + cells + '</div>' +
      '<p class="hint">総単語数:その日に学習した語の数(同じ語は1日1回だけ数えます)。覚えた単語:2回続けて正解した語・苦手から卒業した語の数。苦手な単語:その日に新しく苦手になった語の数。円の長さは、その月でいちばん多い日を基準にしています。</p></section>';
  }
  function statsAfter(view) {
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelector('#vaBack').addEventListener('click', function () { st.mode = null; ctx.render(); });
    view.querySelectorAll('[data-vstab]').forEach(function (b) { b.addEventListener('click', function () { st.stab = b.getAttribute('data-vstab'); re(); }); });
    view.querySelectorAll('[data-vsmon]').forEach(function (b) {
      b.addEventListener('click', function () {
        var ym = st.smonth || D.today().slice(0, 7), y = +ym.slice(0, 4), m = +ym.slice(5, 7) + +b.getAttribute('data-vsmon');
        if (m < 1) { m = 12; y--; } if (m > 12) { m = 1; y++; }
        st.smonth = y + '-' + (m < 10 ? '0' : '') + m; re();
      });
    });
  }

  /* ========== 画面の組み立て ========== */
  function render() {
    if (st.mode === 'quiz' && qz) return quizHTML();
    if (st.mode === 'result' && qz) return resultHTML();
    if (st.mode === 'sheet' && sh) return sheetHTML();
    if (st.mode === 'sort' && so) return sortHTML();
    if (st.mode === 'listen' && ls) return listenHTML();
    if (st.mode === 'list') return listHTML();
    if (st.mode === 'sets') return setsHTML();
    if (st.mode === 'talk') return talkHTML();
    if (st.mode === 'swipe' && sw) return swipeHTML();
    if (st.mode === 'index') return indexHTML();
    if (st.mode === 'stats') return statsHTML();
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
    if (st.mode === 'sets') return setsAfter(view);
    if (st.mode === 'talk') return talkAfter(view);
    if (st.mode === 'swipe') return swipeAfter(view);
    if (st.mode === 'index') return indexAfter(view);
    if (st.mode === 'stats') return statsAfter(view);
    view.querySelectorAll('[data-vweak]').forEach(function (b) {
      b.addEventListener('click', function () {
        var L = curList(); st.src = 'weak';
        if (b.getAttribute('data-vweak') === 'listen') { if (startListen(L)) { st.mode = 'listen'; ls.play = true; ctx.render(); playLoop(); } }
        else { st.filt = 'weak'; st.q = ''; st.limit = 100; st.mode = 'list'; ctx.render(); }
      });
    });
    function re() { var y = window.scrollY; ctx.render(); window.scrollTo(0, y); }
    view.querySelectorAll('[data-vmon]').forEach(function (b) {
      b.addEventListener('click', function () {
        var ym = st.month || D.today().slice(0, 7), y = +ym.slice(0, 4), m = +ym.slice(5, 7) + +b.getAttribute('data-vmon');
        if (m < 1) { m = 12; y--; } if (m > 12) { m = 1; y++; }
        st.month = y + '-' + (m < 10 ? '0' : '') + m; re();
      });
    });
    view.querySelectorAll('[data-vsubj]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-vsubj'); var f = lists().filter(function (x) { return x.L[0] === k; })[0]; if (f) st.list = f.i; st.src = 'all'; re(); }); });
    view.querySelectorAll('[data-vlist]').forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-vlist'); st.list = /^my:/.test(v) ? v : +v; st.src = 'all'; re(); }); });
    var rg = view.querySelector('#vrGo');
    if (rg) rg.addEventListener('click', function () {
      var n = items(curList()).length, a = Math.max(1, Math.min(n, parseInt(view.querySelector('#vrA').value, 10) || 1)), b = Math.max(a, Math.min(n, parseInt(view.querySelector('#vrB').value, 10) || n));
      st.src = 'r' + a + '-' + b; re();
    });
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
        else if (m === 'diag') { var all = items(L); ok = startQuiz(L, shuffle(all), true); if (ok) m = 'quiz'; }
        else if (m === 'sets') { st.edit = null; }
        else if (m === 'talk') { st.talk = null; }
        else if (m === 'swipe') ok = startSwipe(L);
        else if (m === 'auto') { ok = startQuiz(L, autoPick(L)); if (ok) m = 'quiz'; }
        else if (m === 'index') { st.iq = ''; st.add = st.add || { t: '', ms: [''], p: '' }; }
        else if (m === 'stats') { st.stab = st.stab || 'u'; }
        if (ok) { st.mode = m; ctx.render(); }
      });
    });
  }
  // 画面を離れたら、読み上げとタイマーを止める
  window.addEventListener('hashchange', function () {
    if (location.hash !== '#vocab') { clearT(); talkGen++; if (ls) { ls.play = false; ls.gen++; } stopSpeak(); }
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
