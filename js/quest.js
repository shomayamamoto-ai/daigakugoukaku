/*
 * デイリークエスト・XP・コンボ
 * ------------------------------------------------------------
 * ・正解するとXP(経験値)がもらえる(正解10、難関レベル15、5問連続ごとに+5)。
 * ・毎日3つのクエスト(1つは「30XP」、残り2つは日替わり)。3つ全部で「おやすみチケット」1枚(最大2枚)。
 * ・記録は state.xp に保存(端末内。クラウド同期を使うときは一緒に送られます)。
 */
window.WPS = window.WPS || {};
WPS.Quest = (function () {
  var S = WPS.Store, D = WPS.date;
  function X() { var s = S.get(); if (!s.xp) s.xp = { days: {}, extra: 0, got: {} }; s.xp.got = s.xp.got || {}; s.xp.extra = s.xp.extra || 0; return s.xp; }
  function day(ds) {
    var x = X(); ds = ds || D.today();
    return x.days[ds] || (x.days[ds] = { xp: 0, ans: 0, ok: 0, combo: 0, best: 0, vocab: 0, hard: 0, perfect: 0, talk: 0 });
  }
  function peek(ds) { return X().days[ds || D.today()] || { xp: 0, ans: 0, ok: 0, combo: 0, best: 0, vocab: 0, hard: 0, perfect: 0, talk: 0 }; }

  var POOL = [
    { id: 'combo', t: '10問連続で正解する', goal: 10, v: function (d) { return d.best; } },
    { id: 'ans', t: '20問に答える', goal: 20, v: function (d) { return d.ans; } },
    { id: 'vocab', t: '単語トレーニングで20語学習する', goal: 20, v: function (d) { return d.vocab; } },
    { id: 'hard', t: '難関レベルの問題に3問正解する', goal: 3, v: function (d) { return d.hard; }, high: true },
    { id: 'perfect', t: '10問以上のテストを正答率90%以上で終える', goal: 1, v: function (d) { return d.perfect; } },
    { id: 'pomo', t: '集中タイマーを1回やりきる', goal: 1, v: function (d, ds) { return (S.get().pomo || {})[ds] || 0; } },
    { id: 'talk', t: '場面別英会話を1場面練習する', goal: 1, v: function (d) { return d.talk; } }
  ];
  var XPQ = { id: 'xp', t: '30XPをゲットする', goal: 30, v: function (d) { return d.xp; } };
  function hash(str) { var n = 7; for (var i = 0; i < str.length; i++) n = (n * 31 + str.charCodeAt(i)) % 100003; return n; }
  function questsFor(ds) {
    var jh = WPS.isJHStudent && WPS.isJHStudent(S.get().profile.grade);
    var pool = POOL.filter(function (q) { return !(q.high && jh); });
    var h = hash(ds), a = h % pool.length, b = (a + 1 + (Math.floor(h / 7) % (pool.length - 1))) % pool.length;
    return [XPQ, pool[a], pool[b]];
  }
  function progress(ds) {
    ds = ds || D.today();
    var d = peek(ds);
    return questsFor(ds).map(function (q) { var v = Math.min(q.goal, q.v(d, ds) || 0); return { q: q, v: v, done: v >= q.goal }; });
  }
  // クエストの達成とごほうびを確認する(新しく達成したものを返す)
  function check(before) {
    var ds = D.today(), after = progress(ds), x = X(), msg = [];
    after.forEach(function (p, i) { if (p.done && before && !before[i].done) msg.push('クエスト達成:' + p.q.t); });
    if (after.every(function (p) { return p.done; }) && !x.got[ds]) {
      x.got[ds] = 1;
      var s = S.get();
      if ((s.freezes || 0) < 2) { s.freezes = (s.freezes || 0) + 1; msg.push('3つのクエストをすべて達成!「おやすみチケット」を1枚もらったよ'); }
      else { day().xp += 50; x.extra += 50; msg.push('3つのクエストをすべて達成! チケットは上限なので、50XPのボーナス'); }
    }
    return msg;
  }
  // 1問答えたとき。opt: {hard:true(難関), vocab:true(単語トレーニング), small:true(単語帳カード), extra:true(その他の練習)}
  // XPはレベル(WPS.Level)と同じルール:問題 正解10・不正解4/カード 4・2/単語トレーニング 5・2。
  // 難関レベルの正解+5、5問連続正解ごとに+5のボーナス。解答の記録に残らない分は extra としてレベルにも加える。
  function onAnswer(ok, opt) {
    opt = opt || {};
    if (S.isView()) return { xp: 0, combo: 0, msg: [] };
    var before = progress(), d = day(), x = X();
    d.ans++;
    if (opt.vocab) d.vocab++;
    var base = opt.small ? (ok ? 4 : 2) : (opt.vocab || opt.extra) ? (ok ? 5 : 2) : (ok ? 10 : 4), bonus = 0;
    if (ok) {
      d.ok++; d.combo++; if (d.combo > d.best) d.best = d.combo;
      if (opt.hard) { d.hard++; bonus += 5; }
      if (d.combo % 5 === 0) bonus += 5;
    } else d.combo = 0;
    d.xp += base + bonus;
    x.extra += bonus + (opt.vocab || opt.extra ? base : 0);
    return { xp: base + bonus, combo: d.combo, msg: check(before) };
  }
  function bump(key, n) {
    if (S.isView()) return [];
    var before = progress(); day()[key] += n || 1;
    return check(before);
  }
  function onSession(n, okN) {
    if (n >= 10 && okN / n >= 0.9) return bump('perfect', 1);
    return [];
  }
  function chest(open) {
    return '<svg class="q-chest' + (open ? ' open' : '') + '" viewBox="0 0 48 40" width="48" height="40" aria-hidden="true">' +
      (open ? '<path d="M6 14 L42 14 L38 4 L10 4 Z" fill="#e8b468"/>' : '<path d="M6 16 Q24 4 42 16 Z" fill="currentColor" opacity=".9"/>') +
      '<rect x="5" y="15" width="38" height="21" rx="4" fill="currentColor"/><rect x="5" y="22" width="38" height="3" fill="rgba(0,0,0,.18)"/>' +
      '<rect x="20" y="19" width="8" height="9" rx="2" fill="#fff" opacity=".85"/><circle cx="24" cy="23" r="1.6" fill="rgba(0,0,0,.45)"/></svg>';
  }
  function hoursLeft() { var now = new Date(), end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); return Math.max(1, Math.ceil((end - now) / 3600000)); }
  function card(h) {
    var ps = progress(), d = peek(), all = ps.every(function (p) { return p.done; });
    return '<section class="card quest"><div class="q-head"><div><h2>デイリークエスト</h2><p class="muted small">3つ全部で「おやすみチケット」を1枚(最大2枚)</p></div><span class="q-left" title="今日の残り時間">あと' + hoursLeft() + '時間</span></div>' +
      '<ul class="q-list">' + ps.map(function (p) {
        return '<li class="' + (p.done ? 'done' : '') + '"><div class="q-body"><b>' + h(p.q.t) + '</b><div class="q-bar"><i style="width:' + Math.round(p.v / p.q.goal * 100) + '%"></i><span>' + p.v + ' / ' + p.q.goal + '</span></div></div>' + chest(p.done) + '</li>';
      }).join('') +
      '<li class="locked"><div class="q-body"><b>明日のクエスト</b><span class="muted small">公開まであと' + hoursLeft() + '時間</span></div>' + chest(false) + '</li></ul>' +
      '<p class="q-xp">今日 <b>' + d.xp + '</b> XP ／ 累計 <b>' + WPS.Level.info().xp + '</b> XP' + (d.best >= 2 ? ' ／ 今日の最高コンボ <b>' + d.best + '</b>' : '') + (all ? ' ／ <b class="ok">今日のクエスト完了!</b>' : '') + '</p></section>';
  }
  return { onAnswer: onAnswer, bump: bump, onSession: onSession, progress: progress, card: card, today: peek };
})();
