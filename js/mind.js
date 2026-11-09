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
  var FACE = ['', 'とても\u200bつらい', 'つらい', 'ふつう', 'いい感じ', 'とても\u200bいい'];
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

  /* ---------- 離脱のサイン(リスク) ----------
   * 決まった基準ではなく「その生徒のふだん」と比べる(個人のベースライン)。
   *  ・休み:ふだんの「勉強日と勉強日の間かく」の2.5倍(最低2日)をこえたら
   *  ・勉強量:この7日の解答数を、その前の3週間の「1週間あたりの中央値」と比べる
   *  ・正答率:最近30問とその前60問の差が、たまたまの差(統計の誤差)より大きいときだけ
   *  ・夜ふかし:この7日の解答のうち、0〜4時が3割以上
   *  ・がんばりすぎ:勉強量がふだんの1.6倍以上 かつ 睡眠不足・ストレス高
   *  ・気分:直近の気分が下がり続けている(傾き)/つらいが続く
   * 記録が少ないうちは「判定のための記録が少ない」と表示する。 */
  function dayCounts(days) {
    var a = S().attempts, from = D.add(D.today(), -(days - 1)), c = {}, late = 0, tot7 = 0, w7 = D.add(D.today(), -6);
    for (var i = a.length - 1; i >= 0; i--) {
      var x = a[i]; if (!x.d) continue; if (x.d < from) break;
      c[x.d] = (c[x.d] || 0) + 1;
      if (x.d >= w7 && x.t) { tot7++; var hr = new Date(x.t).getHours(); if (hr < 4) late++; }
    }
    return { c: c, late: late, tot7: tot7 };
  }
  function median(v) { if (!v.length) return 0; v = v.slice().sort(function (a, b) { return a - b; }); var m = v.length >> 1; return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2; }
  function risk() {
    var today = D.today(), last = lastStudy(), away = last ? D.diff(last, today) : null;
    var score = 0, reasons = [], acts = [], types = {};
    var started = S().attempts.length > 0;
    var dc = dayCounts(35), sd = studyDays();
    // ふだんの勉強の間かく(直近35日の勉強日から)
    var sdays = [];
    for (var k = 34; k >= 0; k--) { var d = D.add(today, -k); if ((dc.c[d] || 0) > 0 || sd[d] === 'study') sdays.push(d); }
    var gaps = []; for (var g = 1; g < sdays.length; g++) gaps.push(D.diff(sdays[g - 1], sdays[g]));
    var gapAvg = gaps.length ? gaps.reduce(function (s, x) { return s + x; }, 0) / gaps.length : 1;
    var awayTh = Math.max(2, Math.ceil(gapAvg * 2.5));
    var enough = sdays.length >= 6;
    if (started && away !== null && away >= awayTh) {
      score += away >= awayTh * 2.5 ? 4 : away >= awayTh * 1.6 ? 3 : 2; types.dropout = 1;
      reasons.push(away + '日間、勉強の記録がありません(この生徒のふだんの間かくは約' + Math.max(1, Math.round(gapAvg * 10) / 10) + '日)');
      acts.push('「5分だけ」「単語5個だけ」など、とても小さな再開を提案する');
    }
    // 勉強量(1週間ごと)
    var wk = [0, 0, 0, 0];
    Object.keys(dc.c).forEach(function (d) { var i = Math.floor(D.diff(d, today) / 7); if (i >= 0 && i < 4) wk[i] += dc.c[d]; });
    var base = median(wk.slice(1));
    if (base >= 20 && wk[0] < base * 0.5) {
      score += wk[0] < base * 0.25 ? 3 : 2; types.dropout = 1;
      reasons.push('この1週間の解答数(' + wk[0] + '問)が、ふだんの1週間(約' + Math.round(base) + '問)の半分以下です');
      acts.push('負担が大きすぎないか確認し、今週は量を減らした計画にする');
    }
    // 正答率(たまたまの差では反応しない)
    var at = S().attempts.filter(function (x) { return x.q && x.src !== 'card'; });
    var r1 = at.slice(-30), r0 = at.slice(-90, -30);
    if (r1.length >= 25 && r0.length >= 40) {
      var p1 = accOf(r1), p0 = accOf(r0), pp = (p1 * r1.length + p0 * r0.length) / (r1.length + r0.length);
      var se = Math.sqrt(pp * (1 - pp) * (1 / r1.length + 1 / r0.length)), z = se > 0 ? (p0 - p1) / se : 0;
      if (z > 1.96 && p0 - p1 >= 0.1) {
        score += p0 - p1 >= 0.3 ? 2 : 1; types.struggle = 1;
        reasons.push('最近の正答率がはっきり下がっています(' + Math.round(p0 * 100) + '% → ' + Math.round(p1 * 100) + '%)');
        acts.push('難しすぎる単元が続いていないか確認し、得意な単元を混ぜて「できた」を増やす');
      }
    }
    // 夜ふかし
    if (dc.tot7 >= 20 && dc.late / dc.tot7 >= 0.3) {
      score += 1; types.burnout = 1;
      reasons.push('この1週間、解答の' + Math.round(dc.late / dc.tot7 * 100) + '%が深夜0〜4時です');
      acts.push('夜型の勉強が続いていないか確認し、寝る時間を決める');
    }
    // 気分・睡眠・ストレス
    var lg = recentLogs(7), l3 = lg.slice(-3);
    var lowSleep = l3.filter(function (x) { return x.sl && x.sl < 6; }).length >= 2, hiStress = l3.filter(function (x) { return x.st >= 4; }).length >= 2;
    if (l3.length >= 2) {
      var mAvg = l3.reduce(function (s, x) { return s + (x.m || 3); }, 0) / l3.length;
      if (mAvg <= 2) { score += 2; types.mood = 1; reasons.push('こころのチェックで「つらい」が続いています'); acts.push('勉強の話の前に、最近どうか話を聞く'); }
      if (hiStress) { score += 1; types.mood = 1; reasons.push('ストレスが高い日が続いています'); acts.push('不安の原因(成績・本番・人間関係など)を一緒に整理する'); }
      if (lowSleep) { score += 1; types.burnout = 1; reasons.push('睡眠が6時間未満の日が続いています'); acts.push('睡眠時間を確保するよう、夜の勉強量を調整する'); }
    }
    if (lg.length >= 4) {
      var n = lg.length, xs = 0, ys = 0, xy = 0, xx = 0;
      lg.forEach(function (x, i) { xs += i; ys += x.m || 3; xy += i * (x.m || 3); xx += i * i; });
      var slope = (n * xy - xs * ys) / Math.max(1e-6, n * xx - xs * xs);
      if (slope <= -0.3 && (lg[n - 1].m || 3) <= 2 && !types.mood) { score += 1; types.mood = 1; reasons.push('気分が、ここ数日で下がり続けています'); acts.push('何か変わったこと(テストの結果・人間関係など)がなかったか聞く'); }
    }
    // がんばりすぎ(やめる前の燃えつき)
    if (base >= 20 && wk[0] >= base * 1.6 && (lowSleep || hiStress)) {
      score += 2; types.burnout = 1;
      reasons.push('勉強量がふだんの' + (Math.round(wk[0] / base * 10) / 10) + '倍に増え、睡眠不足やストレスも出ています(がんばりすぎのサイン)');
      acts.push('休む日を決める・睡眠を優先するよう伝える(燃えつきの予防)');
    }
    // 本人のふだんの気分と比べる(直近3日の平均が、その前の平均より1.2以上低い)
    var allL = recentLogs(60).filter(function (x) { return x.m; });
    if (allL.length >= 8 && !types.mood) {
      var rec = allL.slice(-3), old = allL.slice(0, -3);
      var mr = rec.reduce(function (a, x) { return a + x.m; }, 0) / rec.length, mo = old.reduce(function (a, x) { return a + x.m; }, 0) / old.length;
      if (mo - mr >= 1.2) { score += 2; types.mood = 1; reasons.push('ここ数日の気分(平均' + mr.toFixed(1) + ')が、この生徒のふだん(平均' + mo.toFixed(1) + ')よりはっきり低いです'); acts.push('「最近いつもと様子がちがうね」と、責めずに声をかける'); }
    }
    // こころのチェックが急に途切れた(前はよくしていたのに、4日以上していない)
    var ks = Object.keys(data().logs).sort(), lastLog = ks[ks.length - 1];
    if (ks.length >= 7 && lastLog && D.diff(lastLog, today) >= 4 && ks.filter(function (d) { return d >= D.add(today, -21); }).length >= 7) {
      score += 1; types.dropout = 1; reasons.push('毎日のようにしていたこころのチェックが、' + D.diff(lastLog, today) + '日止まっています'); acts.push('アプリの外で、様子を聞いてみる');
    }
    var level = score >= 6 ? 3 : score >= 4 ? 2 : score >= 2 ? 1 : 0;
    return { level: level, score: score, reasons: reasons, acts: acts, away: away, last: last, n7: wk[0], base: base, types: types, enough: enough, gapAvg: gapAvg };
  }
  /* ---------- 軽めモード ---------- */
  function lite() { var l = data().lite; return l && l.until >= D.today() ? l : null; }
  function setLite(days) { data().lite = { until: D.add(D.today(), days - 1), ratio: 0.5 }; save(); }
  function liteTasks(tasks) { var l = lite(); if (!l || !tasks || tasks.length <= 1) return tasks; return tasks.slice(0, Math.max(1, Math.ceil(tasks.length * l.ratio))); }

  var LEVEL = ['安定', '注意', '要フォロー', '早めの声かけを'];

  /* ---------- メモの文章から、気持ちのテーマを読みとる(キーワード) ---------- */
  var LEX = [
    ['不安', /(不安|心配|こわい|怖い|緊張|プレッシャー|焦|あせ|やばい|間に合わ)/],
    ['疲れ', /(疲れ|つかれ|だるい|眠い|ねむい|寝不足|しんどい|限界|休みたい)/],
    ['比較', /(あの子|友達は|友だちは|みんな|周り|まわり|比べ|くらべ|自分だけ)/],
    ['自己否定', /(自分なんか|どうせ|向いてない|むいてない|だめだ|ダメだ|バカ|ばか|才能がない|無理だ|むりだ)/],
    ['家族', /(親|母|父|お母さん|お父さん|家族|兄|姉|弟|妹|家で)/],
    ['友人', /(友達|友だち|クラス|部活|先輩|後輩|ライン|LINE)/],
    ['いじめ', /(いじめ|無視され|悪口|仲間はずれ|なぐられ|殴られ|嫌がらせ)/],
    ['体調', /(頭痛|頭が痛|お腹|おなか|熱|体調|気持ち悪|吐き)/],
    ['先延ばし', /(スマホ|ゲーム|動画|ユーチューブ|YouTube|やる気|集中できない|サボ)/]
  ];
  var CRISIS = /(死にたい|しにたい|消えたい|きえたい|自殺|いなくなりたい|生きてる意味|生きている意味|リスカ|自分を傷つけ)/;
  function themes(note) { var t = {}; LEX.forEach(function (x) { if (x[1].test(note || '')) t[x[0]] = 1; }); return t; }

  /* ---------- 生徒のデータから、根拠になる事実を拾う ---------- */
  function unitTrend() {
    var a = S().attempts.filter(function (x) { return x.u && x.src !== 'card'; }), wk = D.add(D.today(), -6), by = {};
    a.forEach(function (x) { var o = by[x.u] || (by[x.u] = { n0: 0, k0: 0, n1: 0, k1: 0 }); if (x.d >= wk) { o.n1++; if (x.ok) o.k1++; } else { o.n0++; if (x.ok) o.k0++; } });
    var up = [], weak = [];
    Object.keys(by).forEach(function (u) {
      var o = by[u], nm = WPS.UNIT_MAP[u] ? WPS.UNIT_MAP[u].name : u;
      if (o.n1 >= 5 && o.n0 >= 5) { var d = o.k1 / o.n1 - o.k0 / o.n0; if (d >= 0.15) up.push([nm, Math.round(d * 100)]); }
      if (o.n1 >= 6 && o.k1 / o.n1 < 0.4) weak.push([nm, Math.round(o.k1 / o.n1 * 100)]);
    });
    up.sort(function (x, y) { return y[1] - x[1]; }); weak.sort(function (x, y) { return x[1] - y[1]; });
    return { up: up.slice(0, 2), weak: weak.slice(0, 2) };
  }
  function examDays() { try { var t = WPS.Roadmap.target(); return t && t.exam ? D.diff(D.today(), t.exam) : null; } catch (e) { return null; } }
  // 生徒ごとの「気分・睡眠」と「正答率」の関係(記録が十分あるときだけ)
  function insights() {
    var m = data(), a = S().attempts, byDay = {};
    a.forEach(function (x) { if (x.d && x.q && x.src !== 'card') { var o = byDay[x.d] || (byDay[x.d] = { n: 0, k: 0 }); o.n++; if (x.ok) o.k++; } });
    var g = { sGood: [0, 0], sBad: [0, 0], mGood: [0, 0], mBad: [0, 0] }, nd = 0;
    Object.keys(m.logs).forEach(function (d) {
      var l = m.logs[d], o = byDay[d]; if (!o || o.n < 5) return; nd++;
      if (l.sl) { var k = l.sl >= 7 ? 'sGood' : l.sl <= 5 ? 'sBad' : null; if (k) { g[k][0] += o.k; g[k][1] += o.n; } }
      if (l.m) { var j = l.m >= 4 ? 'mGood' : l.m <= 2 ? 'mBad' : null; if (j) { g[j][0] += o.k; g[j][1] += o.n; } }
    });
    var out = [];
    function pc(x) { return Math.round(x[0] / x[1] * 100); }
    if (g.sGood[1] >= 30 && g.sBad[1] >= 30 && Math.abs(pc(g.sGood) - pc(g.sBad)) >= 5) out.push('よく眠れた日(7時間以上)の正答率は <b>' + pc(g.sGood) + '%</b>、寝不足の日(5時間以下)は <b>' + pc(g.sBad) + '%</b> でした。');
    if (g.mGood[1] >= 30 && g.mBad[1] >= 30 && Math.abs(pc(g.mGood) - pc(g.mBad)) >= 5) out.push('気分がいい日の正答率は <b>' + pc(g.mGood) + '%</b>、つらい日は <b>' + pc(g.mBad) + '%</b> でした。');
    return { list: out, days: nd };
  }

  /* ---------- コーチの声かけ ----------
   * 1) チェックの内容(気分・やる気・睡眠・ストレス・気になること)
   * 2) メモの文章のテーマ  3) 学習データ(離脱・燃えつき・つまずき)  4) 本番までの日数
   * から候補を集め、5) その生徒に「役に立った」と言われた方法を上に出す(役に立った回数を学習)。 */
  function coach(log) {
    var out = [], tags = log.tags || [], th = themes(log.note), r = risk(), ut = unitTrend(), ed = examDays();
    function add(k, pri, t, b, tool) { if (!out.some(function (x) { return x.k === k; })) out.push({ k: k, pri: pri, t: t, b: b, tool: tool }); }
    var crisis = CRISIS.test(log.note || '') || th['いじめ'] || (log.m === 1 && recentLogs(3).filter(function (x) { return x.m === 1; }).length >= 2);
    if (crisis) add('sos', 100, 'つらい気持ちを、話してくれてありがとう', 'ひとりで抱えなくて大丈夫です。今の気持ちを、信頼できる大人(家族・学校や塾の先生・保健室の先生)か、相談窓口に話してください。勉強は、そのあとでいくらでも取りもどせます。', 'sos');
    var anx = log.st >= 4 || tags.indexOf('本番が不安') >= 0 || tags.indexOf('成績が不安') >= 0 || th['不安'];
    if (anx) add('write', 60, '不安を、10分だけ書き出してみよう', '試験の前に、心配なことを10分間書き出した生徒は、本番で点が下がりにくかったという研究があります(Ramirez & Beilock, 2011)。頭の中の心配を外に出すと、考えるための力が戻りやすいと考えられています。', 'write');
    if (anx && ed !== null && ed >= 0 && ed <= 45) add('exam', 65, '本番まであと' + ed + '日。ドキドキは「準備ができた」サイン', '試験前の心臓のドキドキを「体が本番に向けて準備している」と考えるよう伝えられた学生は、数学の点が高かったという研究があります(Jamieson ほか, 2010)。緊張を消そうとせず、味方にしましょう。', 'exam');
    if (log.st >= 5 || /(パニック|息が苦し|頭が真っ白|涙が止まら)/.test(log.note || '')) add('ground', 70, 'まずは「いま・ここ」にもどろう', '不安でいっぱいのときは、見えるもの・聞こえる音を順番に見つけていくと、頭が少し落ち着きます(5・4・3・2・1 グラウンディング)。', 'ground');
    if (th['自己否定'] || log.m === 1) add('kind', 56, '自分を責めすぎないでね', '大切な友だちにかけるような、やさしい言葉を自分にかけてみましょう。自分に思いやりを向ける練習は、落ちこみから立ち直る助けになると考えられています。', 'kind');
    if (log.st >= 3 || tags.indexOf('本番が不安') >= 0) add('breath', 40, '1分だけ、ゆっくり呼吸しよう', '4秒で吸って、6秒でゆっくり吐きます。吐く息を長くすると、体が落ち着きやすくなります。', 'breath');
    if (th['自己否定'] || th['比較'] || tags.indexOf('自信がない') >= 0) add('think', 58, '頭に浮かんだ考えを、もう一度ながめてみよう', '「どうせ無理」「みんなはできるのに」と考えたときは、その考えを書き出して「友だちが同じことを言ったら、なんて声をかける?」と考えてみましょう。考えの見方を変える練習は、気持ちを立て直す助けになるとされています。', 'think');
    if (log.e <= 2 || tags.indexOf('やる気が出ない') >= 0 || th['先延ばし']) add('plan', 55, '「5分だけ」と「もし〜なら」で始めよう', 'やる気は、始めてから出てくることが多いです。まずは5分だけ。さらに「もし夕食を食べ終わったら、単語を5個やる」のように、いつ・何をやるかを決めておくと実行しやすくなることが、多くの研究で分かっています(Gollwitzer & Sheeran, 2006)。', 'plan');
    if ((log.sl && log.sl < 6) || th['疲れ'] || r.types.burnout) add('sleep', r.types.burnout ? 62 : 50, r.types.burnout ? 'がんばりすぎのサインが出ています' : '今日は早めに寝るのも、立派な勉強です', (r.types.burnout ? '最近は勉強量が多く、睡眠やストレスにも影響が出ています。' : '') + '眠っている間に、覚えたことが整理されると考えられています。睡眠を削るより、今夜はしっかり寝るほうが明日の伸びにつながります。', 'lite');
    if (log.m <= 2 || tags.indexOf('成績が不安') >= 0 || tags.indexOf('自信がない') >= 0 || r.types.struggle) {
      var fact = ut.up.length ? 'この1週間で「' + ut.up[0][0] + '」の正答率が +' + ut.up[0][1] + '% 上がっています。' : '';
      add('wins', 45, 'これまでに積み上げたものを見てみよう', fact + 'まちがいは「どこを直せばいいか」を教えてくれる情報です。他の人ではなく、少し前の自分と比べてみましょう。', 'wins');
    }
    if (r.types.struggle && ut.weak.length) add('easy', 52, '「' + ut.weak[0][0] + '」は、1つ前にもどって大丈夫', '最近この単元の正答率が ' + ut.weak[0][1] + '% です。むずかしい問題が続くと、自信もやる気も下がりやすくなります。基礎の問題や、前の単元から解き直して「できた」を増やしましょう。', 'books');
    if (tags.indexOf('時間が足りない') >= 0) add('time', 48, '全部をやろうとしなくて大丈夫', '今週は計画を軽くして、いちばん大事なところだけに集中しましょう。続けることが、いちばんの近道です。', 'lite');
    if (log.m <= 2 && !crisis) add('values', 35, 'なぜ勉強しているのか、思い出してみよう', '自分が大切にしていること(夢・家族・好きなこと)を数分書くと、気持ちが落ち着くことがあります。効果は研究によって分かれますが、試す価値のある方法です(Cohen ほか, 2006)。', 'values');
    if (tags.indexOf('人間関係') >= 0 || tags.indexOf('家のこと') >= 0 || th['家族'] || th['友人']) add('talk', 47, '勉強以外の悩みも、話していいことです', '友だちや家のことで心が重いと、勉強に集中できないのは自然なことです。先生や保護者、相談窓口に話すと、気持ちが軽くなることがあります。', 'sos');
    if (tags.indexOf('体調') >= 0 || th['体調']) add('body', 49, '体調がよくないときは、休むことを優先しよう', '体調が悪い日に無理をすると、回復がおそくなります。今日は軽めにして、続くようなら保護者や病院に相談しましょう。', 'lite');
    if (!out.length) add('good', 10, (log.m >= 4 ? 'いい調子！ この流れを大事にしよう' : '今日も来てくれてありがとう'), (log.m >= 4 ? '調子がいい日は、少しだけ難しい問題に挑戦するチャンスです。' : 'ふつうの日をコツコツ積み重ねることが、いちばん力になります。今日の分を、いつも通り進めましょう。'), 'go');
    // その生徒に合った方法を上に(役に立った+、いまいち−)
    var fb = data().fb || {};
    out.forEach(function (x) { var f = fb[x.k] || { u: 0, d: 0 }; x.score = x.pri + (x.k === 'sos' ? 0 : (f.u * 8 - f.d * 10)); });
    out.sort(function (x, y) { return y.score - x.score; });
    return out;
  }
  function tool(k) {
    if (k === 'write') return '<a class="btn small" href="#mind/write">10分 書き出す</a>';
    if (k === 'breath') return '<a class="btn small" href="#mind/breath">1分 呼吸する</a>';
    if (k === 'plan') return '<a class="btn small" href="#mind/plan">「もし〜なら」を決める</a><a class="btn small" href="#cards">5分だけやる</a>';
    if (k === 'lite') return (data().sleep ? '' : '<a class="btn small" href="#mind/sleep">睡眠の目標を決める</a>') + (lite() ? '<span class="muted small">いまは軽めモードです(' + lite().until.slice(5).replace('-', '/') + 'まで)</span>' : '<button type="button" class="btn small" data-mlite="7">今週は軽めにする</button>');
    if (k === 'wins') return '<a class="btn small" href="#mind/wins">できたことを見る</a>';
    if (k === 'sos') return '<a class="btn small" href="#mind/sos">相談できるところ</a>';
    if (k === 'think') return '<a class="btn small" href="#mind/think">考えを整理する</a>';
    if (k === 'exam') return '<a class="btn small" href="#mind/exam">本番の心の準備</a>';
    if (k === 'values') return '<a class="btn small" href="#mind/values">大切なことを書く</a>';
    if (k === 'ground') return '<a class="btn small" href="#mind/ground">5・4・3・2・1 をやる</a>';
    if (k === 'kind') return '<a class="btn small" href="#mind/kind">自分にやさしく</a>';
    if (k === 'books') return '<a class="btn small" href="#books">テキストで基礎にもどる</a>';
    return '<a class="btn small primary" href="#home">今日の学習へ</a>';
  }
  function coachHTML(log, max) {
    var list = coach(log), fb = data().fb || {}, shown = list.slice(0, max || 3), rest = list.slice(max || 3);
    function one(c) {
      var f = fb[c.k];
      return '<div class="mc-item mc-' + c.k + '"><b>' + h(c.t) + '</b><p>' + h(c.b) + '</p><div class="btns">' + tool(c.tool) + '</div>' +
        (c.k === 'sos' || c.k === 'good' ? '' : '<div class="mc-fb"><span>この提案は?</span><button type="button" class="' + (f && f.last === 'u' ? 'on' : '') + '" data-mfb="' + c.k + '" data-v="u">役に立った</button><button type="button" class="' + (f && f.last === 'd' ? 'on' : '') + '" data-mfb="' + c.k + '" data-v="d">いまいち</button></div>') + '</div>';
    }
    return '<div class="mc-list">' + shown.map(one).join('') + (rest.length ? '<details class="mc-more"><summary>ほかの提案(' + rest.length + ')</summary>' + rest.map(one).join('') + '</details>' : '') + '</div>';
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
      html += '<section class="card mind-q"><h2>こころのコーチから</h2>' + coachHTML(lg, 2) + '</section>';
    }
    var wd = new Date().getDay(), wkv = (m.weeks || {})[weekKey()];
    if ((wd === 0 || wd === 6) && !wkv) html += '<section class="info">週末だね。<a href="#mind/week">今週のふり返り</a>(5分)で、できたことを確かめよう。</section>';
    var lastWk = (function () { var ks = Object.keys(m.weeks || {}).sort(); return ks.length ? m.weeks[ks[ks.length - 1]] : null; })();
    if (lastWk && lastWk.goal) html += '<section class="info mind-plan">今週の目標:<b>' + h(lastWk.goal) + '</b></section>';
    var sg = m.sleep;
    if (sg && sg.on && sg.bed) { var bm = toMin(sg.bed), nm = new Date().getHours() * 60 + new Date().getMinutes(), dd = (bm - nm + 1440) % 1440; if (dd <= 60) html += '<section class="info">そろそろ寝る準備の時間だよ(目標 ' + h(sg.bed) + ')。今日の分は、ここまでで十分。おやすみ前に、覚えた単語を1回だけ見直そう。</section>'; }
    var ed = examDays();
    if (ed !== null && ed >= 0 && ed <= 7) html += '<section class="info">本番まであと' + ed + '日。<a href="#mind/exam">本番の心の準備</a>を見ておこう。</section>';
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
    view.querySelectorAll('[data-mfb]').forEach(function (b) {
      b.addEventListener('click', function () {
        var m = data(), k = b.getAttribute('data-mfb'), v = b.getAttribute('data-v'); m.fb = m.fb || {};
        var f = m.fb[k] || (m.fb[k] = { u: 0, d: 0 });
        if (f.last === v) return; if (f.last) f[f.last] = Math.max(0, f[f.last] - 1);
        f[v]++; f.last = v; save();
        b.parentNode.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        if (C) C.toast(v === 'u' ? 'ありがとう！ これからはこの方法を先に出すね' : 'ありがとう。次からは別の方法を先に出すね');
      });
    });
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
      '<p>つらい気持ちが続くときや、ひとりで抱えきれないときは、身近な大人(家族・学校の先生・保健室の先生・塾の先生)に相談してください。</p>' +
      '</section>';
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
    if (arg === 'talk') return talkPage();
    if (arg === 'ground') return '<section class="card mind-ground"><h1>5・4・3・2・1 グラウンディング</h1><p class="muted">不安で頭がいっぱいのときや、パニックになりそうなときに、意識を「いま・ここ」にもどす方法です。ゆっくり、声に出さなくてよいので順番に見つけてください。</p>' +
      '<ol class="gr-steps">' + [['5', '見えるものを5つ', '例:机、ペン、窓、時計、自分の手'], ['4', 'さわれるものを4つ', '例:服の生地、いすの背もたれ、髪、ノートの紙'], ['3', '聞こえる音を3つ', '例:エアコンの音、車の音、自分の呼吸'], ['2', 'においを2つ', '例:部屋のにおい、手のにおい(なければ好きなにおいを思い出す)'], ['1', '味を1つ', '例:口の中の味、飲み物をひと口']].map(function (x, i) {
        return '<li><button type="button" class="gr-step" data-gr="' + i + '"><b>' + x[0] + '</b><span>' + x[1] + '<small>' + x[2] + '</small></span></button></li>'; }).join('') + '</ol>' +
      '<p class="gr-done" id="grDone" hidden>おつかれさま。少し落ち着いたら、ゆっくり呼吸をしてから続けよう。</p><div class="btns"><a class="btn" href="#mind/breath">1分 呼吸する</a><a class="btn" href="#mind">もどる</a></div></section>';
    if (arg === 'kind') return '<section class="card mind-kind"><h1>自分にやさしくする3ステップ</h1><p class="muted">失敗したとき、つい自分を責めてしまう人のための方法です。自分に思いやりを向ける練習は、落ちこみから立ち直る助けになると考えられています(セルフ・コンパッション)。</p>' +
      '<ol class="mx-list"><li><b>いま、つらいと認める</b> ― 「いま、苦しい気持ちなんだな」と心の中で言う。</li><li><b>みんな同じだと思い出す</b> ― 「受験生ならだれでも、うまくいかない日はある」。</li><li><b>自分にやさしい言葉をかける</b> ― 大切な友だちに言うように、「ここまでよくがんばってきたね」と言う。</li></ol>' +
      '<label class="mf-note">自分にかけたい言葉を書いてみよう<textarea id="kText" rows="3" maxlength="200" placeholder="例:今日はうまくいかなかったけど、毎日続けてきたことは本当だよ">' + h(m.kind || '') + '</textarea></label>' +
      '<div class="btns"><button type="button" class="btn primary" id="kSave">保存</button><a class="btn" href="#mind">もどる</a></div></section>';
    if (arg === 'sleep') {
      var sg = m.sleep || { bed: '23:30', wake: '06:30' };
      var sl = recentLogs(7).filter(function (x) { return x.sl; }), avg = sl.length ? sl.reduce(function (a, x) { return a + x.sl; }, 0) / sl.length : null;
      return '<section class="card mind-sleep"><h1>睡眠の目標</h1><p class="muted">中高生には8〜10時間の睡眠がすすめられています(米国睡眠医学会など)。寝る時間を決めて、その1時間前にはスマホと勉強を終える準備をしましょう。</p>' +
        (avg !== null ? '<p class="mx-count">この1週間の平均睡眠:<b>' + avg.toFixed(1) + '</b>時間(記録 ' + sl.length + '日分)</p>' : '') +
        '<div class="sl-row"><label>寝る時間<input type="time" id="slBed" value="' + h(sg.bed) + '"></label><label>起きる時間<input type="time" id="slWake" value="' + h(sg.wake) + '"></label></div>' +
        '<p id="slHours" class="hint"></p><label class="switch"><input type="checkbox" id="slOn"' + (sg.on ? ' checked' : '') + '> 寝る1時間前に、ホームで「そろそろ寝る準備」を出す</label>' +
        '<div class="btns"><button type="button" class="btn primary" id="slSave">保存</button><a class="btn" href="#mind">もどる</a></div></section>';
    }
    if (arg === 'think') {
      var ts = (m.thinks || []).slice(0, 5);
      return '<section class="card mind-think"><h1>考えの整理(5ステップ)</h1><p class="muted">いやな気持ちになったときの「頭に浮かんだ考え」を書き出して、別の見方をさがします。認知行動療法で使われる方法を、やさしくしたものです。</p><form id="thForm">' +
        '<label>1. どんなことがあった?<textarea name="ev" rows="2" maxlength="200" placeholder="例:模試の数学が45点だった"></textarea></label>' +
        '<label>2. そのとき頭に浮かんだ考えは?<textarea name="th" rows="2" maxlength="200" placeholder="例:自分は数学に向いてない。どうせ合格できない"></textarea></label>' +
        '<label>3. その考えをどのくらい信じている?<input type="range" name="b1" min="0" max="100" step="10" value="80"><output>80%</output></label>' +
        '<div class="th-hints"><b>4. 別の見方をさがすヒント</b><ul><li>その考えが正しいといえる証拠と、ちがうといえる証拠は?</li><li>友だちが同じことを言ったら、なんて声をかける?</li><li>1か月後の自分から見たら、どう見える?</li><li>「いつも」「ぜったい」「どうせ」が入っていない?</li></ul></div>' +
        '<label>4. 別の見方<textarea name="alt" rows="3" maxlength="300" placeholder="例:45点でも大問1は全部できていた。まちがえた所が分かったのは収穫。まだ本番まで時間はある"></textarea></label>' +
        '<label>5. いま、最初の考えをどのくらい信じている?<input type="range" name="b2" min="0" max="100" step="10" value="50"><output>50%</output></label>' +
        '<button class="btn primary" type="submit">記録する</button></form>' +
        (ts.length ? '<h3>これまでの記録(この端末だけ)</h3><ul class="th-list">' + ts.map(function (x) { return '<li><small>' + h(x.d) + '</small><b>' + h(x.th) + '</b>→ ' + h(x.alt) + '<em>' + x.b1 + '% → ' + x.b2 + '%</em></li>'; }).join('') + '</ul>' : '') +
        '<a class="btn" href="#mind">もどる</a></section>';
    }
    if (arg === 'values') {
      var VS = ['家族', '友だち', '将来の夢', '好きなこと・趣味', 'だれかの役に立つこと', '自分の成長', '知る楽しさ', '自由', '健康', '地元・ふるさと'];
      var vv = m.values || { pick: [], text: '' };
      return '<section class="card mind-values"><h1>大切にしていること</h1><p class="muted">自分にとって大切なことを1〜2つ選んで、なぜ大切なのかを数分書きます。気持ちが落ち着き、勉強の理由を思い出す助けになることがあります(効果は研究によって分かれます)。</p>' +
        '<div class="mf-tags">' + VS.map(function (x) { var on = vv.pick.indexOf(x) >= 0; return '<label class="chip' + (on ? ' on' : '') + '"><input type="checkbox" name="vpick" value="' + x + '"' + (on ? ' checked' : '') + '>' + x + '</label>'; }).join('') + '</div>' +
        '<label class="mf-note">なぜ大切? それは勉強とどうつながっている?<textarea id="vText" rows="5" maxlength="600" placeholder="例:看護師だった祖母のように、だれかを助けられる人になりたい。そのために看護学部に行きたい">' + h(vv.text) + '</textarea></label>' +
        '<div class="btns"><button type="button" class="btn primary" id="vSave">保存</button><a class="btn" href="#mind">もどる</a></div></section>';
    }
    if (arg === 'exam') {
      var ed = examDays();
      return '<section class="card mind-exam"><h1>本番の心の準備</h1>' + (ed !== null && ed >= 0 ? '<p class="mx-count">本番まで あと <b>' + ed + '</b> 日</p>' : '') +
        '<div class="mc-item mc-exam"><b>ドキドキは「準備ができた」サイン</b><p>試験前の心臓のドキドキや手の汗は、体が本番に向けて力を出す準備をしている合図です。緊張を「悪いもの」と考えず、「体がやる気を出している」と考えた学生のほうが、数学の点が高かったという研究があります(Jamieson ほか, 2010)。</p></div>' +
        '<h3>前日</h3><ul class="mx-list"><li>新しい問題より、まちがえた問題の見直し</li><li>持ち物(受験票・筆記用具・時計・昼食)をそろえる</li><li>いつもの時間に寝る(睡眠は記憶の整理に大切です)</li></ul>' +
        '<h3>当日の朝・試験の直前</h3><ul class="mx-list"><li>心配なことがあれば、10分だけ紙に書き出す</li><li>1分の呼吸で、吐く息を長く</li><li>「ドキドキ=準備OK」と心の中で言う</li><li>最初の1問は、解ける問題から</li></ul>' +
        '<h3>試験の間に頭が真っ白になったら</h3><ul class="mx-list"><li>ペンを置いて、ゆっくり3回呼吸</li><li>その問題はとばして、次の解ける問題へ</li><li>「1問のミスで合否は決まらない」と思い出す</li></ul>' +
        '<div class="btns"><a class="btn" href="#mind/write">10分 書き出す</a><a class="btn" href="#mind/breath">1分 呼吸する</a><a class="btn" href="#mind">もどる</a></div></section>';
    }
    if (arg === 'week') {
      var wv = (m.weeks || {})[weekKey()] || {};
      return '<section class="card mind-week"><h1>今週のふり返り</h1><p class="muted">よかったことを思い出すと、次の週のやる気につながります。</p>' + wins() +
        '<form id="wkForm"><label class="mf-note">今週よかったこと・できたこと(3つまで)<textarea name="good" rows="3" maxlength="300" placeholder="例:毎日単語をやれた/二次関数がわかってきた">' + h(wv.good || '') + '</textarea></label>' +
        '<label class="mf-note">うまくいかなかったこと(あれば)<textarea name="bad" rows="2" maxlength="200">' + h(wv.bad || '') + '</textarea></label>' +
        '<label class="mf-note">来週の小さな目標(1つ)<input name="goal" maxlength="60" value="' + h(wv.goal || '') + '" placeholder="例:平日は毎日15分、数学の計算をやる"></label>' +
        '<div class="btns"><button class="btn primary" type="submit">保存</button><a class="btn" href="#mind">もどる</a></div></form></section>';
    }
    if (arg === 'wins') return '<section class="card"><h1>これまでにできたこと</h1>' + wins() + '<p class="hint">他の人とではなく、少し前の自分と比べましょう。続けてきたこと自体が、いちばんの力です。</p><a class="btn" href="#mind">もどる</a></section>';
    if (arg === 'sos') return sosHTML() + '<a class="btn" href="#mind">もどる</a>';
    var html = (C ? C.say('ここは、こころを整える場所だよ。勉強のことも、それ以外のことも、気軽に記録してね。', 'normal', 56) : '');
    html += '<a class="talk-cta" href="#mind/talk"><b>ピンポと話す</b><small>いまの気持ちを、質問に答えながら整理しよう(3分)</small></a>';
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
    var ins = insights();
    html += '<section class="card"><h2>あなたのデータから分かること</h2>' + (ins.list.length ? '<ul class="mind-wins">' + ins.list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul><p class="hint">こころのチェックをした日のうち、5問以上解いた日(' + ins.days + '日)で比べています。</p>' : '<p class="muted">こころのチェックと勉強の記録がたまると、「よく眠れた日は正答率が高い」など、あなただけの傾向がここに出ます(目安:2週間ほど)。</p>') + '</section>';
    html += '<section class="card"><h2>こころを整える道具</h2><div class="mind-tools">' +
      '<a href="#mind/breath"><b>1分の呼吸</b><small>緊張したとき、寝る前に</small></a><a href="#mind/write"><b>不安の書き出し</b><small>試験前、モヤモヤするとき</small></a>' +
      '<a href="#mind/plan"><b>もし〜なら計画</b><small>やる気が出ないとき</small></a><a href="#mind/wins"><b>できたこと</b><small>自信がなくなったとき</small></a>' +
      '<a href="#mind/think"><b>考えの整理</b><small>「どうせ無理」と思ったとき</small></a><a href="#mind/values"><b>大切にしていること</b><small>勉強の理由を見失ったとき</small></a>' +
      '<a href="#mind/exam"><b>本番の心の準備</b><small>試験が近いとき</small></a><a href="#mind/week"><b>今週のふり返り</b><small>週末に5分</small></a>' +
      '<a href="#mind/ground"><b>5・4・3・2・1</b><small>パニックになりそうなとき</small></a><a href="#mind/kind"><b>自分にやさしく</b><small>自分を責めてしまうとき</small></a>' +
      '<a href="#mind/sleep"><b>睡眠の目標</b><small>寝る時間を決める</small></a></div></section>';
    html += sosHTML();
    html += '<p class="hint">このコーチは、勉強を続けるための声かけをするもので、医療や専門のカウンセリングの代わりではありません。</p>';
    return html;
  }
  function toMin(t) { var p = String(t || '0:0').split(':'); return (+p[0]) * 60 + (+p[1] || 0); }
  /* ---------- ピンポと話す(質問に答えていく会話) ---------- */
  var TALK = {
    start: { q: 'いま、いちばん近い気持ちはどれ?', a: [['不安・あせり', 'anx'], ['やる気が出ない', 'mot'], ['つかれている', 'tired'], ['自信がない・落ちこむ', 'low'], ['人間関係・家のことがつらい', 'rel'], ['特にないけど話したい', 'ok']] },
    anx: { q: '何についての不安が大きい?', a: [['本番・入試のこと', 'anx_exam'], ['成績・模試の結果', 'anx_score'], ['勉強が間に合うか', 'anx_time'], ['よく分からないけど不安', 'anx_vague']] },
    anx_exam: { end: ['exam', 'write', 'breath'], say: '本番のことを考えると、こわくなるよね。その気持ちは、本気でがんばっている証拠だよ。' },
    anx_score: { end: ['think', 'wins', 'write'], say: '結果が思うように出ないと、自分がだめに思えてくるよね。でも点数は「いまの位置」で、「きみの価値」じゃないよ。' },
    anx_time: { end: ['lite', 'plan', 'write'], say: '「間に合わないかも」と思うと、何から手をつけていいか分からなくなるよね。全部はやらなくていい。大事なところからにしよう。' },
    anx_vague: { end: ['ground', 'write', 'breath'], say: '理由がはっきりしない不安も、ちゃんとした気持ちだよ。まずは体と頭を「いま・ここ」にもどしてみよう。' },
    mot: { q: 'やる気が出ないのは、どんな感じ?', a: [['何から始めればいいか分からない', 'mot_start'], ['スマホや動画がやめられない', 'mot_phone'], ['なんのために勉強してるか分からない', 'mot_why'], ['ずっと続いていて、何をしても楽しくない', 'mot_long']] },
    mot_start: { end: ['plan', 'go'], say: '始める前がいちばん重いんだよね。5分だけやって、やめてもいいことにしよう。' },
    mot_phone: { end: ['plan', 'go'], say: 'スマホは、やめようと思うほど気になるもの。「スマホを見たくなったら、まず1問だけ解く」と決めておくのがおすすめだよ。' },
    mot_why: { end: ['values', 'plan'], say: '目的が見えないと、がんばるのはむずかしいよね。自分が大切にしていることを、少し書いてみよう。' },
    mot_long: { end: ['sos', 'kind', 'lite'], say: '何をしても楽しくない状態が2週間以上続いているなら、こころがつかれているサインかもしれない。勉強の前に、信頼できる大人に話してみてほしいな。' },
    tired: { q: 'いちばん近いのは?', a: [['寝不足', 'tired_sleep'], ['勉強しすぎて限界', 'tired_burn'], ['体調がよくない', 'tired_body']] },
    tired_sleep: { end: ['sleep', 'lite'], say: '寝不足だと、覚えたことが残りにくくなるよ。今夜は早めに寝るのも立派な勉強だよ。' },
    tired_burn: { end: ['lite', 'kind', 'sleep'], say: 'ここまで本当によくがんばってきたね。休むことは、さぼることじゃなくて、走り続けるための準備だよ。' },
    tired_body: { end: ['lite', 'go'], say: '体調が悪い日は、休むことを優先しよう。続くようなら、保護者や病院に相談してね。' },
    low: { q: 'どんなときに、そう感じる?', a: [['人と比べたとき', 'low_cmp'], ['まちがえたとき・失敗したとき', 'low_fail'], ['ずっと自分を責めてしまう', 'low_self']] },
    low_cmp: { end: ['think', 'wins'], say: '人と比べると、自分の足りないところばかり見えてくるよね。比べる相手を「少し前の自分」に変えてみよう。' },
    low_fail: { end: ['kind', 'wins', 'think'], say: 'まちがいは、「どこを直せばいいか」を教えてくれる情報だよ。失敗した自分を責めすぎないでね。' },
    low_self: { end: ['kind', 'think', 'sos'], say: '自分を責める気持ちが続くのは、とてもつらいよね。ひとりで抱えずに、話せる人がいたら話してみてほしいな。' },
    rel: { q: '話せる範囲で、近いものを選んでね', a: [['友だち・クラス・部活のこと', 'rel_friend'], ['家族のこと', 'rel_family'], ['いやなことをされている', 'rel_bully']] },
    rel_friend: { end: ['talkto', 'write'], say: '人間関係のことで心が重いと、勉強どころじゃなくなるのは自然なことだよ。' },
    rel_family: { end: ['talkto', 'write'], say: '家のことは、だれにも言いにくいよね。話してくれてありがとう。' },
    rel_bully: { end: ['sos'], say: 'つらいことを話してくれてありがとう。いやなことをされているなら、きみは悪くないよ。ひとりで抱えずに、信頼できる大人か相談窓口に、今日話してほしい。' },
    ok: { end: ['go', 'week'], say: '話しに来てくれてうれしいよ。今日の調子を、いっしょに確かめていこう。' }
  };
  var TALK_TOOL = { exam: ['本番の心の準備', '#mind/exam'], write: ['10分 書き出す', '#mind/write'], breath: ['1分 呼吸する', '#mind/breath'], think: ['考えを整理する', '#mind/think'], wins: ['できたことを見る', '#mind/wins'],
    lite: ['今週は軽めにする', 'lite'], plan: ['「もし〜なら」を決める', '#mind/plan'], ground: ['5・4・3・2・1', '#mind/ground'], go: ['今日の学習へ', '#home'], values: ['大切なことを書く', '#mind/values'],
    sos: ['相談できるところ', '#mind/sos'], kind: ['自分にやさしく', '#mind/kind'], sleep: ['睡眠の目標', '#mind/sleep'], talkto: ['相談できるところ', '#mind/sos'], week: ['今週のふり返り', '#mind/week'] };
  function talkPage() {
    var m = data(), path = (m.talkPath || ['start']), node = TALK[path[path.length - 1]] || TALK.start;
    var hist = path.slice(0, -1).map(function (k, i) { var n = TALK[k], next = path[i + 1], a = (n.a || []).filter(function (x) { return x[1] === next; })[0]; return '<div class="tk-q">' + h(n.q) + '</div>' + (a ? '<div class="tk-a">' + h(a[0]) + '</div>' : ''); }).join('');
    var body;
    if (node.end) {
      var fb = m.fb || {}, ends = node.end.slice().sort(function (x, y) { var fx = fb[x] || { u: 0, d: 0 }, fy = fb[y] || { u: 0, d: 0 }; return (fy.u - fy.d) - (fx.u - fx.d); });
      body = '<div class="tk-q">' + h(node.say) + '</div><div class="tk-q">こんなことを試してみない?</div><div class="tk-tools">' + ends.map(function (k) { var t = TALK_TOOL[k]; return t[1] === 'lite' ? '<button type="button" class="tk-tool" data-mlite="7">' + t[0] + '</button>' : '<a class="tk-tool" href="' + t[1] + '">' + t[0] + '</a>'; }).join('') + '</div>' +
        '<div class="btns"><button type="button" class="btn" id="tkReset">はじめから話す</button><a class="btn" href="#mind">こころの部屋へ</a></div>';
    } else body = '<div class="tk-q">' + h(node.q) + '</div><div class="tk-opts">' + node.a.map(function (a) { return '<button type="button" class="tk-opt" data-tk="' + a[1] + '">' + h(a[0]) + '</button>'; }).join('') + '</div>' + (path.length > 1 ? '<button type="button" class="link" id="tkBack">ひとつもどる</button>' : '');
    return '<section class="card mind-talk"><h1>ピンポと話す</h1>' + (C ? C.say('話せる範囲で、近いものを選んでね。正解はないよ。', 'normal', 48) : '') + '<div class="tk-log">' + hist + body + '</div></section>' +
      '<p class="hint">ここで選んだ内容は、この端末だけに保存されます。</p>';
  }
  function weekKey() { var d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return D.ymd ? D.ymd(d) : d.toISOString().slice(0, 10); }
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
    // ピンポと話す
    view.querySelectorAll('[data-tk]').forEach(function (b) { b.addEventListener('click', function () { m.talkPath = (m.talkPath || ['start']).concat(b.getAttribute('data-tk')); var end = TALK[b.getAttribute('data-tk')]; if (end && end.end) { m.talks = [{ d: D.today(), path: m.talkPath.slice(1) }].concat(m.talks || []).slice(0, 30); } save(); if (rerender) rerender(); }); });
    var tb = view.querySelector('#tkBack'); if (tb) tb.addEventListener('click', function () { m.talkPath = (m.talkPath || ['start']).slice(0, -1); if (!m.talkPath.length) m.talkPath = ['start']; save(); if (rerender) rerender(); });
    var tr = view.querySelector('#tkReset'); if (tr) tr.addEventListener('click', function () { m.talkPath = ['start']; save(); if (rerender) rerender(); });
    // 5・4・3・2・1
    view.querySelectorAll('[data-gr]').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('on'); var all = view.querySelectorAll('[data-gr]'), on = view.querySelectorAll('[data-gr].on'); var d = view.querySelector('#grDone'); if (d) d.hidden = on.length < all.length; }); });
    // 自分にやさしく
    var ks2 = view.querySelector('#kSave'); if (ks2) ks2.addEventListener('click', function () { m.kind = view.querySelector('#kText').value.slice(0, 200); save(); if (C) C.toast('保存したよ。落ちこんだときに読み返してね'); });
    // 睡眠の目標
    var slS = view.querySelector('#slSave');
    if (slS) {
      var bed = view.querySelector('#slBed'), wake = view.querySelector('#slWake'), hrs = view.querySelector('#slHours');
      var calc = function () { var d = (toMin(wake.value) - toMin(bed.value) + 1440) % 1440; hrs.textContent = '睡眠時間:約' + (Math.round(d / 6) / 10) + '時間' + (d < 420 ? '(7時間より短いので、寝る時間を早めるのがおすすめ)' : ''); };
      bed.addEventListener('input', calc); wake.addEventListener('input', calc); calc();
      slS.addEventListener('click', function () { m.sleep = { bed: bed.value, wake: wake.value, on: view.querySelector('#slOn').checked }; save(); if (C) C.toast('睡眠の目標を保存したよ'); });
    }
    // 考えの整理
    var th = view.querySelector('#thForm');
    if (th) {
      th.querySelectorAll('input[type=range]').forEach(function (r) { r.addEventListener('input', function () { r.nextElementSibling.textContent = r.value + '%'; }); });
      th.addEventListener('submit', function (e) {
        e.preventDefault(); var fd = new FormData(th);
        if (!String(fd.get('th') || '').trim() || !String(fd.get('alt') || '').trim()) { if (C) C.toast('2と4を書いてね'); return; }
        m.thinks = [{ d: D.today(), ev: String(fd.get('ev') || ''), th: String(fd.get('th')), alt: String(fd.get('alt')), b1: +fd.get('b1'), b2: +fd.get('b2') }].concat(m.thinks || []).slice(0, 30); save();
        var dd = +fd.get('b1') - +fd.get('b2');
        if (C) C.toast(dd > 0 ? '信じる気持ちが ' + dd + '% 下がったね。見方を変えられた証拠だよ' : '記録したよ。書き出せただけでも一歩前進！');
        if (rerender) rerender();
      });
    }
    // 大切にしていること
    var vs = view.querySelector('#vSave');
    if (vs) vs.addEventListener('click', function () {
      m.values = { pick: Array.prototype.map.call(view.querySelectorAll('input[name=vpick]:checked'), function (x) { return x.value; }), text: view.querySelector('#vText').value.slice(0, 600), d: D.today() }; save();
      if (C) C.toast('保存したよ。つらいときに読み返してね');
    });
    // 今週のふり返り
    var wf = view.querySelector('#wkForm');
    if (wf) wf.addEventListener('submit', function (e) {
      e.preventDefault(); var fd = new FormData(wf); m.weeks = m.weeks || {};
      m.weeks[weekKey()] = { good: String(fd.get('good') || ''), bad: String(fd.get('bad') || ''), goal: String(fd.get('goal') || '') };
      var ks = Object.keys(m.weeks).sort(); while (ks.length > 20) delete m.weeks[ks.shift()];
      save(); if (C) C.toast('ふり返りを保存したよ。来週の目標はホームにも出すね'); if (rerender) rerender();
    });
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
      (r.types.burnout ? '<p class="mr-type">タイプ:<b>がんばりすぎ・燃えつき</b>のサインがあります。量を増やすより、休息と睡眠を優先してください。</p>' : r.types.dropout ? '<p class="mr-type">タイプ:<b>学習から離れつつある</b>サインがあります。責めずに、小さな再開を一緒に決めてください。</p>' : '') +
      (r.enough ? '' : '<p class="hint">勉強の記録がまだ少ないため、判定の確かさは低めです。</p>') +
      '<p class="hint">判定は、この生徒のふだんの勉強ペース(勉強日の間かく 約' + (Math.round(r.gapAvg * 10) / 10) + '日、1週間の解答 約' + Math.round(r.base) + '問)と比べています。こころのチェックは直近7日で ' + lg.length + '日分。生徒のメモや書き出しの内容は、プライバシーのため表示しません。</p></section>';
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
