/* メンタルコーチ と 離脱を防ぐしくみ
 * ・毎日の「こころのチェック」(気分・やる気・睡眠・ストレス・気になること)
 * ・状態に合わせたコーチの声かけ(根拠のある方法だけを使う)
 *     不安の書き出し …… Ramirez & Beilock (2011, Science):試験前に10分、不安を書き出した生徒は本番で点が下がりにくかった
 *     もし〜なら計画 …… Gollwitzer & Sheeran (2006):「いつ・どこで・何を」を決めると目標を達成しやすい(94の研究のまとめで中〜大の効果)
 *     5分だけルール・できたことの確認・休む判断・相談先の案内
 * ・離脱のサインを見つける(休みの日数・勉強量の急な減り・正答率の下がり・気分や睡眠の悪化)
 *     → 「おかえり」画面、今週は軽めモード、やさしい通知、先生用レポートへの表示
 * こころのチェックの中身(メモ・書き出し)はこの端末だけに保存し、先生用レポートにはサインの有無だけを出す。
 * 医療の代わりではない。つらさが強いときは、相談窓口や身近な大人につなぐ。
 */
window.WPS = window.WPS || {};
WPS.Mind = (function () {
  var D = WPS.date, C = null;
  function S() { return WPS.Store.get(); }
  function data() { var s = S(); if (!s.mind) s.mind = { logs: {}, plans: [], wins: {}, lite: null, back: '' }; var m = s.mind; m.logs = m.logs || {}; m.plans = m.plans || []; return m; }
  function save() { WPS.Store.save(); }
  function h(x) { return C ? C.h(x) : String(x == null ? '' : x); }

  /* ---------- 気分の顔(絵文字を使わない SVG) ---------- */
  var FACE = ['', 'とてもつらい', 'つらい', 'ふつう', 'いい感じ', 'とてもいい'];
  var FACE_C = ['', '#7c8db0', '#8fa7c9', '#b9b48e', '#7fbf9a', '#4fae84'];
  function face(n, size) {
    size = size || 34;
    var mouth = { 1: 'M12 25 q8 -7 16 0', 2: 'M13 25 q7 -4 14 0', 3: 'M13 24 h14', 4: 'M13 22 q7 5 14 0', 5: 'M12 21 q8 8 16 0' }[n];
    var brow = n <= 2 ? '<path d="M11 13 l5 2 M29 13 l-5 2" stroke="#25324a" stroke-width="1.8" stroke-linecap="round"/>' : '';
    return '<svg viewBox="0 0 40 40" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="' + FACE_C[n] + '"/>' + brow +
      '<circle cx="14.5" cy="17" r="2.2" fill="#25324a"/><circle cx="25.5" cy="17" r="2.2" fill="#25324a"/><path d="' + mouth + '" stroke="#25324a" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
  }

  /* ---------- 学習の記録から読みとる ---------- */
  function studyDays() { try { return WPS.Streak.studiedDays(); } catch (e) { return {}; } }
  function lastStudy() {
    var a = S().attempts, last = '';
    for (var i = a.length - 1; i >= 0; i--) { if (a[i].d && a[i].d > last) last = a[i].d; if (a.length - i > 400) break; }
    var sd = studyDays(); Object.keys(sd).forEach(function (d) { if (sd[d] === 'study' && d > last) last = d; });
    return last;
  }
  function countIn(from, to) { // from 日前〜to 日前 の解答数
    var a = S().attempts, lo = D.add(D.today(), -to), hi = D.add(D.today(), -from), n = 0;
    for (var i = a.length - 1; i >= 0; i--) { var d = a[i].d; if (!d) continue; if (d < lo) break; if (d <= hi) n++; }
    return n;
  }
  function accOf(list) { if (!list.length) return null; return list.filter(function (x) { return x.ok; }).length / list.length; }
  function recentLogs(n) {
    var m = data(), ks = Object.keys(m.logs).sort().slice(-n);
    return ks.map(function (k) { var o = m.logs[k]; o.d = k; return o; });
  }

  /* ---------- 離脱のサイン(リスク) ---------- */
  function risk() {
    var today = D.today(), last = lastStudy(), away = last ? D.diff(last, today) : null;
    var score = 0, reasons = [], acts = [];
    var started = S().attempts.length > 0;
    if (started && away !== null && away >= 2) {
      score += away >= 7 ? 4 : away >= 4 ? 3 : 2;
      reasons.push(away + '日間、勉強の記録がありません');
      acts.push('「5分だけ」「単語5個だけ」など、とても小さな再開を提案する');
    }
    var n7 = countIn(0, 6), nPrev = countIn(7, 20) / 2;
    if (nPrev >= 20 && n7 < nPrev * 0.5) {
      score += 2; reasons.push('この1週間の解答数が、その前の2週間の平均の半分以下に減っています(' + n7 + '問 ← 約' + Math.round(nPrev) + '問)');
      acts.push('負担が大きすぎないか確認し、今週は量を減らした計画にする');
    }
    var at = S().attempts.filter(function (x) { return x.q && x.src !== 'card'; });
    var a1 = accOf(at.slice(-30)), a0 = accOf(at.slice(-90, -30));
    if (a1 !== null && a0 !== null && at.length >= 60 && a0 - a1 >= 0.15) {
      score += 1; reasons.push('最近の正答率が下がっています(' + Math.round(a0 * 100) + '% → ' + Math.round(a1 * 100) + '%)');
      acts.push('難しすぎる単元が続いていないか確認し、得意な単元を混ぜて成功体験をつくる');
    }
    var lg = recentLogs(3);
    if (lg.length >= 2) {
      var mAvg = lg.reduce(function (s, x) { return s + (x.m || 3); }, 0) / lg.length;
      if (mAvg <= 2) { score += 2; reasons.push('気持ちのチェックで「つらい」が続いています'); acts.push('勉強の話の前に、最近どうか話を聞く'); }
      if (lg.filter(function (x) { return x.st >= 4; }).length >= 2) { score += 1; reasons.push('ストレスが高い日が続いています'); acts.push('不安の原因(成績・本番・人間関係など)を一緒に整理する'); }
      if (lg.filter(function (x) { return x.sl && x.sl < 6; }).length >= 2) { score += 1; reasons.push('睡眠が6時間未満の日が続いています'); acts.push('睡眠時間を確保するよう、夜の勉強量を調整する'); }
    }
    var level = score >= 6 ? 3 : score >= 4 ? 2 : score >= 2 ? 1 : 0;
    return { level: level, score: score, reasons: reasons, acts: acts, away: away, last: last, n7: n7 };
  }
  var LEVEL = ['安定', '注意', '要フォロー', '早めの声かけを'];

  /* ---------- 軽めモード ---------- */
  function lite() { var l = data().lite; return l && l.until >= D.today() ? l : null; }
  function setLite(days) { data().lite = { until: D.add(D.today(), days - 1), ratio: 0.5 }; save(); }
  function liteTasks(tasks) { var l = lite(); if (!l || !tasks || tasks.length <= 1) return tasks; return tasks.slice(0, Math.max(1, Math.ceil(tasks.length * l.ratio))); }

  /* ---------- コーチの声かけ ---------- */
  var CRISIS = /(死にたい|消えたい|自殺|しにたい|きえたい|いなくなりたい|生きてる意味|生きている意味)/;
  function coach(log) {
    var out = [], tags = log.tags || [];
    var crisis = CRISIS.test(log.note || '') || (log.m === 1 && recentLogs(3).filter(function (x) { return x.m === 1; }).length >= 2);
    if (crisis) out.push({ k: 'sos', t: 'とてもつらい気持ちを、話してくれてありがとう', b: 'ひとりで抱えなくて大丈夫です。今の気持ちを、信頼できる大人や相談窓口に話してみてください。勉強は、そのあとでいくらでも取りもどせます。', tool: 'sos' });
    if (log.st >= 4 || tags.indexOf('本番が不安') >= 0 || tags.indexOf('成績が不安') >= 0)
      out.push({ k: 'write', t: '不安を、10分だけ紙に書き出してみよう', b: '試験の前に、心配なことを10分間書き出した生徒は、本番で点が下がりにくかったという研究があります(Ramirez & Beilock, 2011)。頭の中の心配を外に出すと、考えるための力が戻りやすいと考えられています。', tool: 'write' });
    if (log.st >= 3 || tags.indexOf('本番が不安') >= 0)
      out.push({ k: 'breath', t: '1分だけ、ゆっくり呼吸しよう', b: '4秒で吸って、6秒でゆっくり吐きます。吐く息を長くすると、体が落ち着きやすくなります。', tool: 'breath' });
    if (log.e <= 2 || tags.indexOf('やる気が出ない') >= 0)
      out.push({ k: 'plan', t: '「5分だけ」と「もし〜なら」で始めよう', b: 'やる気は、始めてから出てくることが多いです。まずは5分だけ。さらに「もし夕食を食べ終わったら、単語を5個やる」のように、いつ・何をやるかを決めておくと、実行しやすくなることが多くの研究で分かっています(Gollwitzer & Sheeran, 2006)。', tool: 'plan' });
    if (log.sl && log.sl < 6)
      out.push({ k: 'sleep', t: '今日は早めに寝るのも、立派な勉強です', b: '眠っている間に、覚えたことが整理されると考えられています。睡眠を削って勉強時間を増やすより、今夜はしっかり寝るほうが、明日の伸びにつながります。', tool: 'lite' });
    if (log.m <= 2 || tags.indexOf('成績が不安') >= 0 || tags.indexOf('自信がない') >= 0)
      out.push({ k: 'wins', t: 'これまでに積み上げたものを見てみよう', b: 'まちがいは「どこを直せばいいか」を教えてくれる情報です。他の人ではなく、少し前の自分と比べてみましょう。', tool: 'wins' });
    if (tags.indexOf('時間が足りない') >= 0)
      out.push({ k: 'time', t: '全部をやろうとしなくて大丈夫', b: '今週は計画を軽くして、いちばん大事なところだけに集中しましょう。続けることが、いちばんの近道です。', tool: 'lite' });
    if (tags.indexOf('人間関係') >= 0 || tags.indexOf('家のこと') >= 0)
      out.push({ k: 'talk', t: '勉強以外の悩みも、話していいことです', b: '友だちや家のことで心が重いと、勉強に集中できないのは自然なことです。先生や保護者、相談窓口に話すと、気持ちが軽くなることがあります。', tool: 'sos' });
    if (!out.length) out.push({ k: 'good', t: (log.m >= 4 ? 'いい調子！ この流れを大事にしよう' : '今日も来てくれてありがとう'), b: (log.m >= 4 ? '調子がいい日は、少しだけ難しい問題に挑戦するチャンスです。' : 'ふつうの日をコツコツ積み重ねることが、いちばん力になります。今日の分を、いつも通り進めましょう。'), tool: 'go' });
    return out;
  }
  function tool(k) {
    if (k === 'write') return '<a class="btn small" href="#mind/write">10分 書き出す</a>';
    if (k === 'breath') return '<a class="btn small" href="#mind/breath">1分 呼吸する</a>';
    if (k === 'plan') return '<a class="btn small" href="#mind/plan">「もし〜なら」を決める</a><a class="btn small" href="#cards">5分だけやる</a>';
    if (k === 'lite') return lite() ? '<span class="muted small">いまは軽めモードです(' + lite().until.slice(5).replace('-', '/') + 'まで)</span>' : '<button type="button" class="btn small" data-mlite="7">今週は軽めにする</button>';
    if (k === 'wins') return '<a class="btn small" href="#mind/wins">できたことを見る</a>';
    if (k === 'sos') return '<a class="btn small" href="#mind/sos">相談できるところ</a>';
    return '<a class="btn small primary" href="#home">今日の学習へ</a>';
  }
  function coachHTML(log) {
    return '<div class="mc-list">' + coach(log).map(function (c) {
      return '<div class="mc-item mc-' + c.k + '"><b>' + h(c.t) + '</b><p>' + h(c.b) + '</p><div class="btns">' + tool(c.tool) + '</div></div>';
    }).join('') + '</div>';
  }

  /* ---------- ホームに出すカード ---------- */
  function homeCards() {
    var m = data(), today = D.today(), r = risk(), html = '';
    // おかえり(3日以上あいたとき、その日1回)
    if (r.away !== null && r.away >= 3 && m.back !== today) {
      html += '<section class="card mind-back">' + (C ? C.say('<b>おかえり！ また会えてうれしいよ。</b><br>休んでいた日のことは気にしなくて大丈夫。今日は、ほんの少しだけ再開してみよう。', 'happy', 56) : '') +
        '<div class="mb-opts"><a class="mb-opt" href="#cards" data-mback="1"><b>5分だけやる</b><small>単語カード5枚から</small></a>' +
        '<button type="button" class="mb-opt" data-mlite="7" data-mback="1"><b>今週は軽めにする</b><small>今日のやることを半分にする</small></button>' +
        '<a class="mb-opt" href="#mind" data-mback="1"><b>気持ちを話す</b><small>こころのチェックへ</small></a></div></section>';
    }
    // こころのチェック(まだの日)
    var lg = m.logs[today];
    if (!lg) {
      html += '<section class="card mind-q"><div class="row-between"><h2>今日のこころの調子は?</h2><a class="link small" href="#mind">くわしく</a></div>' +
        '<div class="mq-faces" role="group" aria-label="今日の気分">' + [1, 2, 3, 4, 5].map(function (n) {
          return '<button type="button" class="mq-face" data-mface="' + n + '" aria-label="' + FACE[n] + '">' + face(n, 38) + '<small>' + FACE[n] + '</small></button>';
        }).join('') + '</div><p class="hint">記録はこの端末だけに保存されます。気分に合わせて、ピンポが声をかけるよ。</p></section>';
    } else if (lg.m <= 2 || (r.level >= 2 && !(r.away >= 3))) {
      html += '<section class="card mind-q"><h2>こころのコーチから</h2>' + coachHTML(lg) + '</section>';
    }
    if (lite()) html += '<section class="info">今週は軽めモードです(' + lite().until.slice(5).replace('-', '/') + 'まで)。今日のやることを少なめにしています。<button type="button" class="link" data-mlite="0">ふつうに戻す</button></section>';
    // もし〜なら計画(今日の分)
    var pl = (m.plans || []).filter(function (p) { return p.on; })[0];
    if (pl) html += '<section class="info mind-plan">今日の約束:もし<b>' + h(pl.when) + '</b>なら、<b>' + h(pl.what) + '</b>をやる。</section>';
    return html;
  }
  function bindHome(view, rerender) {
    view.querySelectorAll('[data-mface]').forEach(function (b) {
      b.addEventListener('click', function () {
        var m = data(); m.logs[D.today()] = { m: +b.getAttribute('data-mface'), t: Date.now() }; save();
        if (rerender) rerender();
      });
    });
    view.querySelectorAll('[data-mlite]').forEach(function (b) {
      b.addEventListener('click', function () {
        var n = +b.getAttribute('data-mlite');
        if (n) { setLite(n); if (C) C.toast('今週は軽めモードにしたよ。できた分だけで十分！'); } else { data().lite = null; save(); }
        if (b.hasAttribute('data-mback')) { data().back = D.today(); save(); }
        if (rerender) rerender();
      });
    });
    view.querySelectorAll('a[data-mback]').forEach(function (a) { a.addEventListener('click', function () { data().back = D.today(); save(); }); });
  }

  /* ---------- こころの部屋(#mind) ---------- */
  var TAGS = ['本番が不安', '成績が不安', 'やる気が出ない', '自信がない', '時間が足りない', '人間関係', '家のこと', '体調'];
  function graph() {
    var m = data(), days = [], i;
    for (i = 13; i >= 0; i--) days.push(D.add(D.today(), -i));
    var W = 320, H = 90, x = function (k) { return 14 + k * (W - 28) / 13; }, y = function (v) { return H - 14 - (v - 1) * (H - 28) / 4; };
    var pts = days.map(function (d, k) { var l = m.logs[d]; return l && l.m ? [x(k), y(l.m), l.m] : null; });
    var path = pts.filter(Boolean).map(function (p, k) { return (k ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var st = studyDays();
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="mind-graph" role="img" aria-label="直近14日の気分">' +
      [1, 3, 5].map(function (v) { return '<line x1="10" x2="' + (W - 10) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="mg-grid"/>'; }).join('') +
      days.map(function (d, k) { return st[d] === 'study' ? '<rect x="' + (x(k) - 5) + '" y="' + (H - 8) + '" width="10" height="4" rx="2" class="mg-study"/>' : ''; }).join('') +
      (path ? '<path d="' + path + '" class="mg-line"/>' : '') +
      pts.map(function (p) { return p ? '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="' + FACE_C[p[2]] + '"/>' : ''; }).join('') +
      '</svg><p class="hint">点=気分(上ほど良い)/下の小さな帯=勉強した日</p>';
  }
  function wins() {
    var s = S(), today = D.today(), wk = D.add(today, -6), n = 0, ok = 0, units = {};
    s.attempts.forEach(function (a) { if (a.d && a.d >= wk) { n++; if (a.ok) ok++; if (a.u) units[a.u] = 1; } });
    var all = s.attempts.length, sd = studyDays(), days = Object.keys(sd).filter(function (d) { return sd[d] === 'study'; }).length;
    var list = [];
    if (all) list.push('これまでに <b>' + all.toLocaleString() + '問</b> に取り組みました');
    if (days) list.push('勉強した日は、ぜんぶで <b>' + days + '日</b>');
    if (n) list.push('この1週間で <b>' + n + '問</b>、そのうち <b>' + ok + '問</b> 正解');
    if (Object.keys(units).length) list.push('この1週間で <b>' + Object.keys(units).length + '単元</b> にふれました');
    try { var b = WPS.Streak.best(); if (b) list.push('連続記録の最高は <b>' + b + '日</b>'); } catch (e) { /* 無視 */ }
    return list.length ? '<ul class="mind-wins">' + list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p class="muted">まだ記録が少ないです。今日の1問が、最初の「できた」になります。</p>';
  }
  function sosHTML() {
    return '<section class="card mind-sos" id="mindSos"><h2>相談できるところ</h2>' +
      '<p>つらい気持ちが続くときや、ひとりで抱えきれないときは、身近な大人(家族・学校の先生・保健室の先生・塾の先生)か、次の窓口に相談してください。</p>' +
      '<div class="sos-list"><a class="sos-item" href="tel:0120078310"><b>24時間子供SOSダイヤル</b><span>0120-0-78310(なやみ言おう)</span><small>文部科学省。24時間・通話無料。いじめや学校・家庭の悩みなど</small></a>' +
      '<a class="sos-item" href="tel:0570064556"><b>こころの健康相談統一ダイヤル</b><span>0570-064-556</span><small>お住まいの都道府県の相談窓口につながります。受付時間は地域で異なり、通話料がかかります</small></a></div>' +
      '<p class="hint">危険がせまっているときは、ためらわずに 110番・119番 へ。受付時間などは変わることがあるので、最新の情報は各窓口の公式の案内で確認してください。</p></section>';
  }
  function page(arg) {
    var m = data(), today = D.today(), lg = m.logs[today] || {};
    if (arg === 'breath') return '<section class="card mind-breath"><h1>1分の呼吸</h1><p class="muted">円が大きくなる間に鼻から吸って、小さくなる間に口からゆっくり吐きます(4秒吸う・6秒吐く×6回)。</p>' +
      '<div class="br-stage"><div class="br-ring" id="brRing"></div><b id="brTxt">準備ができたら「はじめる」</b></div><div class="btns center"><button type="button" class="btn primary" id="brGo">はじめる</button><a class="btn" href="#mind">もどる</a></div></section>';
    if (arg === 'write') return '<section class="card mind-write"><h1>不安の書き出し(10分)</h1>' +
      '<p class="muted">いま心配なこと、本番で起きたらいやなこと、モヤモヤしていることを、思いつくまま書きます。きれいに書かなくて大丈夫。だれにも見せません(この端末だけに保存。いつでも消せます)。</p>' +
      '<div class="mw-timer" id="mwTimer">10:00</div><textarea id="mwText" rows="10" placeholder="例:数学の大問2でまた時間が足りなくなったらどうしよう…">' + h(m.write || '') + '</textarea>' +
      '<div class="btns"><button type="button" class="btn primary" id="mwGo">タイマーを始める</button><button type="button" class="btn" id="mwSave">保存</button><button type="button" class="btn" id="mwDel">消す</button><a class="btn" href="#mind">もどる</a></div>' +
      '<p class="hint">書き終えたら、「その心配が本当になったら、まず何をするか」を1行だけ足してみましょう。</p></section>';
    if (arg === 'plan') return '<section class="card mind-planf"><h1>「もし〜なら、〜する」計画</h1><p class="muted">いつ・何をするかを先に決めておくと、迷わず始められます。</p>' +
      '<label>もし<input id="mpWhen" maxlength="30" placeholder="例:夕ごはんを食べ終わったら" value=""></label><label>なら、<input id="mpWhat" maxlength="30" placeholder="例:単語を5個おぼえる" value=""></label>' +
      '<div class="mp-ex">' + ['学校から帰ってカバンを置いたら|計算問題を3問', '夕ごはんを食べ終わったら|単語を5個', 'スマホを見たくなったら|まず1問だけ解く', 'お風呂から出たら|今日の単語を見直す'].map(function (x) { var p = x.split('|'); return '<button type="button" class="chip" data-mpex="' + h(x) + '">' + h(p[0]) + '→' + h(p[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="btns"><button type="button" class="btn primary" id="mpSave">この約束にする</button><a class="btn" href="#mind">もどる</a></div>' +
      ((m.plans || []).length ? '<h3>いまの約束</h3><ul class="mind-plans">' + m.plans.map(function (p, i) { return '<li>もし<b>' + h(p.when) + '</b>なら、<b>' + h(p.what) + '</b><button type="button" class="link" data-mpdel="' + i + '">消す</button></li>'; }).join('') + '</ul>' : '') + '</section>';
    if (arg === 'wins') return '<section class="card"><h1>これまでにできたこと</h1>' + wins() + '<p class="hint">他の人とではなく、少し前の自分と比べましょう。続けてきたこと自体が、いちばんの力です。</p><a class="btn" href="#mind">もどる</a></section>';
    if (arg === 'sos') return sosHTML() + '<a class="btn" href="#mind">もどる</a>';
    var html = (C ? C.say('ここは、こころを整える場所だよ。勉強のことも、それ以外のことも、気軽に記録してね。', 'normal', 56) : '');
    html += '<section class="card mind-form"><h2>今日のこころのチェック</h2><form id="mindForm">' +
      '<div class="mf-row"><span>気分</span><div class="mq-faces" role="radiogroup" aria-label="気分">' + [1, 2, 3, 4, 5].map(function (n) { return '<label class="mq-face' + (lg.m === n ? ' on' : '') + '"><input type="radio" name="m" value="' + n + '"' + (lg.m === n ? ' checked' : '') + '>' + face(n, 34) + '<small>' + FACE[n] + '</small></label>'; }).join('') + '</div></div>' +
      '<div class="mf-row"><span>やる気</span>' + scale('e', lg.e, ['ない', '', 'ふつう', '', 'ある']) + '</div>' +
      '<div class="mf-row"><span>ストレス</span>' + scale('st', lg.st, ['低い', '', 'ふつう', '', '高い']) + '</div>' +
      '<div class="mf-row"><span>昨夜の睡眠</span><select name="sl"><option value="">選ぶ</option>' + [4, 5, 6, 7, 8, 9, 10].map(function (v) { return '<option value="' + v + '"' + (lg.sl === v ? ' selected' : '') + '>' + (v === 4 ? '4時間以下' : v === 10 ? '10時間以上' : v + '時間') + '</option>'; }).join('') + '</select></div>' +
      '<div class="mf-row"><span>気になること</span><div class="mf-tags">' + TAGS.map(function (t) { var on = (lg.tags || []).indexOf(t) >= 0; return '<label class="chip' + (on ? ' on' : '') + '"><input type="checkbox" name="tags" value="' + t + '"' + (on ? ' checked' : '') + '>' + t + '</label>'; }).join('') + '</div></div>' +
      '<label class="mf-note">ひとことメモ(この端末だけに保存)<textarea name="note" rows="3" maxlength="400" placeholder="今の気持ちを、自由に書いてね">' + h(lg.note || '') + '</textarea></label>' +
      '<button class="btn primary" type="submit">記録して、コーチに聞く</button></form></section>';
    if (lg.m) html += '<section class="card"><h2>コーチからのアドバイス</h2>' + coachHTML(lg) + '</section>';
    html += '<section class="card"><h2>気分の流れ(14日)</h2>' + graph() + '</section>';
    html += '<section class="card"><h2>こころを整える道具</h2><div class="mind-tools">' +
      '<a href="#mind/breath"><b>1分の呼吸</b><small>緊張したとき、寝る前に</small></a><a href="#mind/write"><b>不安の書き出し</b><small>試験前、モヤモヤするとき</small></a>' +
      '<a href="#mind/plan"><b>もし〜なら計画</b><small>やる気が出ないとき</small></a><a href="#mind/wins"><b>できたこと</b><small>自信がなくなったとき</small></a></div></section>';
    html += sosHTML();
    html += '<p class="hint">このコーチは、勉強を続けるための声かけをするもので、医療や専門のカウンセリングの代わりではありません。</p>';
    return html;
  }
  function scale(name, v, labels) {
    return '<div class="mf-scale" role="radiogroup">' + [1, 2, 3, 4, 5].map(function (n) { return '<label class="' + (v === n ? 'on' : '') + '"><input type="radio" name="' + name + '" value="' + n + '"' + (v === n ? ' checked' : '') + '><i>' + n + '</i>' + (labels[n - 1] ? '<small>' + labels[n - 1] + '</small>' : '') + '</label>'; }).join('') + '</div>';
  }
  var timers = [];
  function after(arg, view, rerender) {
    timers.forEach(clearInterval); timers = [];
    var m = data();
    bindHome(view, rerender);
    view.querySelectorAll('.mq-face input, .mf-scale input, .mf-tags input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var g = inp.closest('.mq-faces, .mf-scale, .mf-tags');
        if (inp.type === 'radio') g.querySelectorAll('label').forEach(function (l) { l.classList.toggle('on', l.contains(inp)); });
        else inp.closest('label').classList.toggle('on', inp.checked);
      });
    });
    var f = view.querySelector('#mindForm');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(f), mv = +fd.get('m');
      if (!mv) { if (C) C.toast('まず気分を選んでね'); return; }
      m.logs[D.today()] = { m: mv, e: +fd.get('e') || 0, st: +fd.get('st') || 0, sl: +fd.get('sl') || 0, tags: fd.getAll('tags'), note: String(fd.get('note') || '').slice(0, 400), t: Date.now() };
      // 古い記録は120日分だけ残す
      var ks = Object.keys(m.logs).sort(); while (ks.length > 120) delete m.logs[ks.shift()];
      save(); if (rerender) rerender();
      setTimeout(function () { var el = document.querySelector('.mc-list'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 80);
    });
    // 呼吸
    var go = view.querySelector('#brGo');
    if (go) go.addEventListener('click', function () {
      var ring = view.querySelector('#brRing'), txt = view.querySelector('#brTxt'), t0 = Date.now(); go.disabled = true;
      var iv = setInterval(function () {
        var s = (Date.now() - t0) / 1000;
        if (s >= 60) { clearInterval(iv); ring.style.transform = 'scale(.6)'; txt.textContent = 'おつかれさま。少し楽になったかな?'; go.disabled = false; go.textContent = 'もう1回'; return; }
        var c = s % 10, inh = c < 4, p = inh ? c / 4 : 1 - (c - 4) / 6;
        ring.style.transform = 'scale(' + (0.6 + 0.4 * p).toFixed(3) + ')';
        txt.textContent = (inh ? '吸って… ' + Math.ceil(4 - c) : '吐いて… ' + Math.ceil(10 - c)) + ' (' + (Math.floor(s / 10) + 1) + '/6)';
      }, 100); timers.push(iv);
    });
    // 書き出し
    var mw = view.querySelector('#mwGo');
    if (mw) {
      var ta = view.querySelector('#mwText'), tm = view.querySelector('#mwTimer');
      mw.addEventListener('click', function () {
        var end = Date.now() + 600000; mw.disabled = true; ta.focus();
        var iv = setInterval(function () { var r = Math.max(0, end - Date.now()); tm.textContent = Math.floor(r / 60000) + ':' + ('0' + Math.floor(r % 60000 / 1000)).slice(-2); if (!r) { clearInterval(iv); tm.textContent = '10分たちました。おつかれさま'; m.write = ta.value; save(); } }, 500); timers.push(iv);
      });
      view.querySelector('#mwSave').addEventListener('click', function () { m.write = ta.value; save(); if (C) C.toast('保存したよ(この端末だけ)'); });
      view.querySelector('#mwDel').addEventListener('click', function () { m.write = ''; ta.value = ''; save(); if (C) C.toast('消したよ'); });
    }
    // もし〜なら
    view.querySelectorAll('[data-mpex]').forEach(function (b) { b.addEventListener('click', function () { var p = b.getAttribute('data-mpex').split('|'); view.querySelector('#mpWhen').value = p[0]; view.querySelector('#mpWhat').value = p[1]; }); });
    var mp = view.querySelector('#mpSave');
    if (mp) mp.addEventListener('click', function () {
      var w = view.querySelector('#mpWhen').value.trim(), x = view.querySelector('#mpWhat').value.trim();
      if (!w || !x) { if (C) C.toast('「もし」と「なら」の両方を書いてね'); return; }
      m.plans = [{ when: w, what: x, on: 1, t: Date.now() }].concat((m.plans || []).map(function (p) { p.on = 0; return p; })).slice(0, 5); save();
      if (C) C.toast('約束したよ。ホームにも出しておくね'); if (rerender) rerender();
    });
    view.querySelectorAll('[data-mpdel]').forEach(function (b) { b.addEventListener('click', function () { m.plans.splice(+b.getAttribute('data-mpdel'), 1); if (m.plans[0]) m.plans[0].on = 1; save(); if (rerender) rerender(); }); });
  }

  /* ---------- 先生用レポート ---------- */
  function tutorSection() {
    var r = risk(), lg = recentLogs(7);
    var cls = ['ok', 'warn', 'alert', 'alert'][r.level];
    return '<section class="card mind-risk"><h2>継続のサイン(離脱を防ぐために)</h2>' +
      '<p class="mr-level ' + cls + '">いまの状態:<b>' + LEVEL[r.level] + '</b>' + (r.last ? '(最後に勉強した日:' + r.last + ')' : '') + '</p>' +
      (r.reasons.length ? '<h3>気になるサイン</h3><ul class="bullets">' + r.reasons.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul><h3>おすすめの声かけ・対応</h3><ul class="bullets">' + r.acts.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '<p class="muted">いまのところ、気になるサインはありません。</p>') +
      '<p class="hint">こころのチェックは ' + lg.length + '日分(直近7日)。生徒のメモや書き出しの内容は、プライバシーのため表示しません。</p></section>';
  }
  /* ---------- 通知の文面 ---------- */
  function notifyLine() {
    var r = risk();
    if (r.away !== null && r.away >= 3) return { title: 'ピンポより', body: '久しぶり！ 元気にしてる? 今日は単語5個だけ、いっしょにやってみない?' };
    if (r.level >= 2) return { title: 'ピンポより', body: '最近がんばりすぎてないかな。今日は5分だけでも十分だよ。' };
    return null;
  }

  return {
    init: function (ctx) { C = ctx; }, risk: risk, homeCards: homeCards, bindHome: bindHome, page: page, after: after,
    tutorSection: tutorSection, liteTasks: liteTasks, lite: lite, notifyLine: notifyLine, face: face
  };
})();
