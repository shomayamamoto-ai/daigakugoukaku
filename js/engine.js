/*
 * Aqualium エンジン
 * ------------------------------------------------------------
 *  1. Store     … データの保存(この端末のブラウザ内 localStorage)
 *  2. Analysis  … テスト結果から苦手単元・思考レベル・根本原因を分析
 *  3. Roadmap   … 志望校×苦手分析から、週ごとの計画と今日のやる事を作成
 *  4. SRS       … 単語帳(忘れかけた頃に出題する間隔反復)
 *  5. Streak    … 連続学習記録(おやすみチケット付き)
 */
window.WPS = window.WPS || {};

/* ---------- 日付ユーティリティ ---------- */
WPS.date = {
  ymd: function (d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  },
  parse: function (s) {
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  },
  add: function (s, n) {
    var d = WPS.date.parse(s);
    d.setDate(d.getDate() + n);
    return WPS.date.ymd(d);
  },
  diff: function (a, b) { // b - a(日数)
    return Math.round((WPS.date.parse(b) - WPS.date.parse(a)) / 86400000);
  },
  today: function () { return WPS.date.ymd(new Date()); },
  label: function (s) {
    var d = WPS.date.parse(s);
    return (d.getMonth() + 1) + '/' + d.getDate() + '(' + '日月火水木金土'[d.getDay()] + ')';
  }
};

/* ========== 1. Store ========== */
WPS.Store = (function () {
  var KEY = 'wps_state_v1';
  var state = null;

  function defaults() {
    return {
      v: 1,
      profile: {
        name: '', grade: '高2', schoolId: '', schoolName: '', track: '',
        examDate: '', kyotsuDate: '', customWeights: null, minutes: 60, minutesWeekday: 0, minutesHoliday: 0, subjects: null, reminder: '20:00', notify: false,
        created: WPS.date.today()
      },
      attempts: [],   // {q, u, s, ok, ch, unsure, src, t, d}
      cards: {},      // qid -> {box, due, n}
      days: {},       // 'YYYY-MM-DD' -> {checks:{taskKey:true}, cards:n}
      freezes: 0,
      frozen: [],
      grantedAt: 0,
      notified: {},   // 'YYYY-MM-DD' -> {remind:true, last:true}
      memos: [],      // {id, text, unit, t, done}
      records: []     // 学校の定期テスト・模試の結果 {id, date, kind, subj, score, max, wrong:[], good:[]}
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : defaults();
      var d = defaults();
      Object.keys(d).forEach(function (k) { if (state[k] === undefined) state[k] = d[k]; });
      Object.keys(d.profile).forEach(function (k) { if (state.profile[k] === undefined) state.profile[k] = d.profile[k]; });
    } catch (e) {
      state = defaults();
    }
    return state;
  }
  var view = null; // 先生が共有リンクで開いた「他の生徒のデータ」(閲覧のみ)
  function save(keepTime) {
    if (view) return; // 閲覧中のデータは保存しない
    if (!keepTime) state.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 容量不足などは無視 */ }
    if (WPS.Notify && WPS.Notify.syncToSW) WPS.Notify.syncToSW();
    if (!keepTime && WPS.Sync && WPS.Sync.onSave) WPS.Sync.onSave();
  }
  function get() { return view || state || load(); }
  function setView(v) {
    if (v) {
      var d = defaults();
      Object.keys(d).forEach(function (k) { if (v[k] === undefined) v[k] = d[k]; });
      Object.keys(d.profile).forEach(function (k) { if (v.profile[k] === undefined) v.profile[k] = d.profile[k]; });
    }
    view = v || null;
  }
  function isView() { return !!view; }
  function reset() { state = defaults(); save(); }
  function exportJSON() { return JSON.stringify(state || load(), null, 2); }
  // keepTime=true … クラウドから取り込むとき(更新日時をそのまま残し、送り返さない)
  function importJSON(text, keepTime) {
    var obj = JSON.parse(text);
    if (!obj || !obj.profile || !Array.isArray(obj.attempts)) throw new Error('形式が正しくありません');
    localStorage.setItem(KEY, JSON.stringify(obj));
    load(); // 不足しているキーを補完
    save(keepTime);
  }
  function day(ds) {
    var s = get();
    ds = ds || WPS.date.today();
    if (!s.days[ds]) s.days[ds] = { checks: {}, cards: 0 };
    return s.days[ds];
  }
  return { load: load, save: save, get: get, reset: reset, exportJSON: exportJSON, importJSON: importJSON, day: day, setView: setView, isView: isView };
})();

/* ========== 2. Analysis ========== */
WPS.Analysis = (function () {
  var RECENT = 6; // 単元ごとに直近6回の解答で判定(克服の様子が反映されるように)

  function attemptsOf(unitId) {
    return WPS.Store.get().attempts.filter(function (a) { return a.u === unitId; });
  }

  function unitStat(unitId) {
    var all = attemptsOf(unitId);
    var rec = all.slice(-RECENT);
    var n = rec.length;
    var c = rec.filter(function (a) { return a.ok; }).length;
    var acc = n ? c / n : null;
    var status = 'untested';
    if (n) status = acc < 0.5 ? 'weak' : acc < 0.8 ? 'soso' : 'good';
    return {
      id: unitId, n: n, total: all.length, correct: c, acc: acc, status: status,
      unsure: all.filter(function (a) { return a.unsure; }).length
    };
  }

  function allStats() {
    var m = {};
    WPS.UNITS.forEach(function (u) { m[u.id] = unitStat(u.id); });
    return m;
  }

  // 科目×思考レベルの正答率
  function levelStats(subj) {
    var res = { 1: { n: 0, c: 0 }, 2: { n: 0, c: 0 }, 3: { n: 0, c: 0 } };
    WPS.Store.get().attempts.forEach(function (a) {
      if (subj && a.s !== subj) return;
      var q = WPS.Q(a.q);
      if (!q) return;
      res[q.level].n++;
      if (a.ok) res[q.level].c++;
    });
    return res;
  }

  function subjectStats() {
    var res = {};
    Object.keys(WPS.SUBJECTS).forEach(function (k) { res[k] = { n: 0, c: 0 }; });
    WPS.Store.get().attempts.forEach(function (a) {
      if (!res[a.s]) return;
      res[a.s].n++;
      if (a.ok) res[a.s].c++;
    });
    return res;
  }

  // 苦手の「根本原因」をさかのぼる(前提単元のうち、苦手 or 未確認のもの)
  function rootCauses(unitId, stats, seen) {
    stats = stats || allStats();
    seen = seen || {};
    var out = [];
    var u = WPS.UNIT_MAP[unitId];
    if (!u) return out;
    u.prereq.forEach(function (pid) {
      if (seen[pid]) return;
      seen[pid] = true;
      var st = stats[pid];
      if (st.status === 'weak' || st.status === 'soso' || st.status === 'untested') {
        out.push({ id: pid, status: st.status });
        out = out.concat(rootCauses(pid, stats, seen));
      }
    });
    return out;
  }

  // 他のいくつの単元の前提になっているか(土台としての重要度)
  var dependents = {};
  WPS.UNITS.forEach(function (u) {
    u.prereq.forEach(function (p) { dependents[p] = (dependents[p] || 0) + 1; });
  });

  function depth(unitId, memo) {
    memo = memo || {};
    if (memo[unitId] !== undefined) return memo[unitId];
    var u = WPS.UNIT_MAP[unitId];
    var d = 0;
    u.prereq.forEach(function (p) { d = Math.max(d, depth(p, memo) + 1); });
    memo[unitId] = d;
    return d;
  }

  // 優先度スコア(志望校での重要度 × 苦手度 × 土台としての重要度)
  function priority(unitId, weights, stats) {
    var u = WPS.UNIT_MAP[unitId];
    var st = stats[unitId];
    var w = weights ? (weights[u.subj] || 0) : 1;
    var weakness = st.acc === null ? 0.5 : 1 - st.acc;
    var base = 1 + 0.25 * (dependents[unitId] || 0);
    return w * weakness * base;
  }

  // 思考レベルの傾向から、指導方針の診断文を作る
  function levelDiagnosis(ls) {
    function r(x) { return x.n ? x.c / x.n : null; }
    var k = r(ls[1]), u = r(ls[2]), a = r(ls[3]);
    if (k === null && u === null && a === null) return 'まだデータがありません。';
    if (k !== null && k < 0.6) return '知識(用語・公式・単語)の段階で抜けがあります。まずは単語帳で基本事項の暗記を固めるのが最優先です。';
    if (u !== null && u < 0.6) return '知識はあるものの「使い方」の理解が不十分です。授業では「なぜそうなるのか」を生徒自身に説明させる口頭試問が効果的です。';
    if (a !== null && a < 0.6) return '基本は身についています。複数の知識を組み合わせる応用問題で失点しています。解き方の「方針の立て方」を中心に指導してください。';
    return 'バランスよく得点できています。過去問演習で時間配分と得点の取り方を磨く段階です。';
  }

  // 誤答の一覧(どの選択肢を選んだか)
  function mistakes(unitId) {
    var seen = {};
    return attemptsOf(unitId).filter(function (a) { return !a.ok && a.q && a.src !== 'card'; }).reverse().filter(function (a) {
      if (seen[a.q]) return false;
      seen[a.q] = true;
      return true;
    });
  }

  // アプリ内の問題の正答状況から、偏差値と共通テスト得点率を「推定」する(あくまで目安)
  function estimate(subj) {
    var list = WPS.Store.get().attempts.filter(function (a) { return a.src !== 'card' && a.q && (!subj || a.s === subj); }).slice(-200);
    if (list.length < 15) return { n: list.length, hensa: null, kyotsu: null };
    var W = { 1: 0.8, 2: 1, 3: 1.3 }, sum = 0, ok = 0, basic = 0, basicOk = 0;
    list.forEach(function (a) {
      var q = WPS.Q(a.q), lv = q ? q.level : 2, w = W[lv] || 1;
      sum += w; if (a.ok) ok += w;
      if (lv <= 2) { basic++; if (a.ok) basicOk++; }
    });
    var acc = ok / sum;
    var hensa = Math.max(30, Math.min(75, Math.round((50 + 10 * (acc - 0.6) / 0.18) * 2) / 2));
    var kyotsu = basic ? Math.max(20, Math.min(95, Math.round(basicOk / basic * 100))) : null;
    return { n: list.length, hensa: hensa, kyotsu: kyotsu };
  }

  return {
    unitStat: unitStat, allStats: allStats, levelStats: levelStats, subjectStats: subjectStats,
    rootCauses: rootCauses, priority: priority, depth: depth, levelDiagnosis: levelDiagnosis, estimate: estimate,
    mistakes: mistakes, dependents: dependents
  };
})();

/* ========== 3. Roadmap ========== */
WPS.Roadmap = (function () {
  var D = WPS.date;

  function gradeIndex(grade) {
    var i = WPS.STAGES.indexOf(grade);
    return i < 0 ? 5 : i; // 既卒は高3扱い
  }

  function target() {
    var p = WPS.Store.get().profile;
    var school = WPS.SCHOOL_MAP[p.schoolId] || null;
    var weights = null;
    if (school) {
      weights = school.tracks[p.track] || school.tracks[Object.keys(school.tracks)[0]];
    }
    if (!weights) {
      var isJH = gradeIndex(p.grade) <= 2;
      weights = isJH ? { eng: 1, math: 1, jpn: 1, sci: 0.9, soc: 0.9, info: 0 }
                     : { eng: 1, math: 1, jpn: 1, sci: 0.7, soc: 0.7, info: 0.4 };
    }
    var defaultWeights = weights;
    // 募集要項の配点を生徒が入力していれば、そちらを優先する
    var custom = false;
    if (p.customWeights && Object.keys(p.customWeights).length) {
      weights = {};
      Object.keys(WPS.SUBJECTS).forEach(function (k) { weights[k] = Math.max(0, Math.min(1, (+p.customWeights[k] || 0) / 100)); });
      custom = true;
    }
    // 受験で使う教科を選んでいれば、選んでいない教科は重要度0にする
    if (p.subjects && p.subjects.length) {
      var w2 = {};
      Object.keys(WPS.SUBJECTS).forEach(function (k) { w2[k] = p.subjects.indexOf(k) >= 0 ? Math.max(weights[k] || 0, 0.5) : 0; });
      weights = w2;
    }
    var isHigh = school ? school.kind === 'high' : gradeIndex(p.grade) <= 2;
    var keys = school ? school.exams : [isHigh ? 'high' : 'kyotsu'];
    // 最終目標は「最後の試験」(国公立なら2次試験)。途中の試験は「中間目標」として扱う
    var exam = p.examDate || WPS.EXAM_DATES[keys[keys.length - 1]].date;
    var milestones = keys.map(function (k) {
      var d = (k === 'kyotsu' && p.kyotsuDate) ? p.kyotsuDate : WPS.EXAM_DATES[k].date;
      if (k === keys[keys.length - 1] && p.examDate) d = p.examDate;
      return { key: k, label: WPS.EXAM_DATES[k].label, date: d };
    });
    return { profile: p, school: school, weights: weights, defaultWeights: defaultWeights, custom: custom, isHigh: isHigh, exam: exam, milestones: milestones };
  }

  // 対象となる単元を選ぶ
  function candidateUnits(t, stats) {
    var gi = gradeIndex(t.profile.grade);
    var list = [];
    var weakSet = {};
    WPS.UNITS.forEach(function (u) {
      var st = stats[u.id];
      if (st.status === 'weak' || st.status === 'soso') weakSet[u.id] = true;
    });
    // 苦手単元の根本原因(未確認の中学単元など)も含める
    var rootSet = {};
    Object.keys(weakSet).forEach(function (id) {
      WPS.Analysis.rootCauses(id, stats).forEach(function (r) { rootSet[r.id] = true; });
    });
    WPS.UNITS.forEach(function (u) {
      if (!(t.weights[u.subj] > 0)) return;
      var si = WPS.STAGES.indexOf(u.stage);
      if (t.isHigh && si > 2) return;                // 高校受験は中学範囲まで
      var st = stats[u.id];
      var include = false;
      if (weakSet[u.id] || rootSet[u.id]) include = true;
      else if (st.status === 'untested') {
        // 未診断:受験学年までの範囲は「確認が必要」として後ろに入れる
        if (t.isHigh ? si <= Math.max(gi, 2) : si >= 3) include = true;
      }
      if (include) list.push(u.id);
    });
    return list;
  }

  function build() {
    var s = WPS.Store.get();
    var t = target();
    var stats = WPS.Analysis.allStats();
    var today = D.today();
    var totalDays = Math.max(7, D.diff(today, t.exam));
    var warnings = [];

    var ids = candidateUnits(t, stats);
    // 並べ方:①苦手(判定済み) → 未診断 ②中学(土台)→高校 ③前提の深さが浅い順 ④優先度が高い順
    var memo = {};
    ids.sort(function (a, b) {
      var ta = stats[a].status === 'untested' ? 1 : 0, tb = stats[b].status === 'untested' ? 1 : 0;
      if (ta !== tb) return ta - tb;
      var ja = WPS.STAGES.indexOf(WPS.UNIT_MAP[a].stage) <= 2 ? 0 : 1;
      var jb = WPS.STAGES.indexOf(WPS.UNIT_MAP[b].stage) <= 2 ? 0 : 1;
      if (!t.isHigh && ja !== jb) return ja - jb;
      var da = WPS.Analysis.depth(a, memo), db = WPS.Analysis.depth(b, memo);
      if (da !== db) return da - db;
      return WPS.Analysis.priority(b, t.weights, stats) - WPS.Analysis.priority(a, t.weights, stats);
    });

    // フェーズの区切り
    var finalDays = Math.min(21, Math.max(3, Math.round(totalDays * 0.12)));
    var practiceDays = Math.min(t.isHigh ? 60 : 90, Math.round(totalDays * 0.35));
    var practiceStart = D.add(t.exam, -(finalDays + practiceDays));
    var finalStart = D.add(t.exam, -finalDays);
    if (D.diff(today, practiceStart) < 0) practiceStart = today;

    // 1週間で仕上げられる単元数(1単元に約150分かかる想定)
    var minutes = Math.max(15, WPS.Time.weeklyMinutes(s.profile) / 7);
    var pace = Math.max(1, Math.min(5, Math.round(minutes * 7 / 150)));
    var learnWeeks = Math.max(1, Math.floor(D.diff(today, practiceStart) / 7));
    var knownWeak = ids.filter(function (id) { return stats[id].status !== 'untested'; }).length;
    if (knownWeak > learnWeeks * pace) {
      var need = Math.ceil(knownWeak / learnWeeks);
      warnings.push('苦手単元の数に対して残り時間が少なめです。1日の勉強時間を少し増やすか、優先度の高い単元から順に取り組みましょう(目安:週' + need + '単元)。');
      pace = Math.min(6, need);
    }

    // 中学範囲の穴が多いときは「土台の修復」フェーズを設ける
    var repairUnits = ids.filter(function (id) {
      return !t.isHigh && WPS.STAGES.indexOf(WPS.UNIT_MAP[id].stage) <= 2 && stats[id].status !== 'untested';
    });

    var weeks = [];
    var cursor = today;
    var queue = ids.slice();
    var idx = 0;
    while (D.diff(cursor, t.exam) > 0) {
      var end = D.add(cursor, 6);
      if (D.diff(end, t.exam) < 0) end = t.exam;
      var phase;
      if (D.diff(cursor, finalStart) <= 0) phase = 'final';
      else if (D.diff(cursor, practiceStart) <= 0) phase = 'practice';
      else if (repairUnits.indexOf(queue[idx]) >= 0) phase = 'repair';
      else phase = 'standard';
      var n = phase === 'practice' ? Math.max(1, Math.floor(pace / 2)) : phase === 'final' ? 0 : pace;
      var units = queue.slice(idx, idx + n);
      idx += units.length;
      weeks.push({ start: cursor, end: end, phase: phase, units: units });
      cursor = D.add(end, 1);
      if (weeks.length > 120) break;
    }

    // フェーズの期間をまとめる
    var phases = [];
    weeks.forEach(function (w) {
      var last = phases[phases.length - 1];
      if (last && last.key === w.phase) last.end = w.end;
      else phases.push({ key: w.phase, start: w.start, end: w.end });
    });
    phases.forEach(function (p) {
      var def = WPS.PHASES.filter(function (x) { return x.key === p.key; })[0];
      p.name = def.name; p.emoji = def.emoji; p.desc = def.desc; p.howto = def.howto;
    });

    var untested = ids.filter(function (id) { return stats[id].status === 'untested'; }).length;
    if (untested > 0 && knownWeak === 0) {
      warnings.push('まだ診断テストのデータが少ないため、学年相当の単元を順番に並べています。診断テストを受けると、あなた専用のロードマップに変わります。');
    }

    return {
      target: t, today: today, days: totalDays, weeks: weeks, phases: phases,
      units: ids, stats: stats, pace: pace, warnings: warnings
    };
  }

  function currentWeek(rm) {
    var today = rm.today;
    for (var i = 0; i < rm.weeks.length; i++) {
      var w = rm.weeks[i];
      if (D.diff(w.start, today) >= 0 && D.diff(today, w.end) >= 0) return w;
    }
    return rm.weeks[0] || null;
  }

  // 今日のやる事リスト
  function todayTasks(rm) {
    var s = WPS.Store.get();
    var today = D.today();
    var day = WPS.Store.day(today);
    var w = currentWeek(rm);
    var tasks = [];
    var todays = s.attempts.filter(function (a) { return a.d === today; });
    var minutesToday = WPS.Time.minutesFor(s.profile, today);

    // ① 単語帳
    var due = WPS.SRS.dueCards().length;
    var goal = Math.max(5, Math.min(20, due || 10));
    tasks.push({
      key: 'cards', kind: 'auto', icon: '🃏',
      title: '単語帳で復習する(' + goal + '枚)',
      sub: due ? '忘れかけのカードが ' + due + ' 枚あるよ' : '新しいカードで、苦手を少しずつ覚えよう',
      done: (day.cards || 0) >= goal, progress: Math.min(day.cards || 0, goal) + '/' + goal,
      action: '#cards'
    });

    // ② 今週の重点単元
    if (w && w.units.length) {
      var stats = rm.stats;
      var focus = w.units.filter(function (id) { return stats[id].status !== 'good'; })[0] || w.units[0];
      var u = WPS.UNIT_MAP[focus];
      var cnt = todays.filter(function (a) { return a.u === focus; }).length;
      tasks.push({
        key: 'unit:' + focus, kind: 'auto', icon: '🎯',
        title: '「' + u.name + '」を攻略する',
        sub: WPS.SUBJECTS[u.subj].name + '・' + u.stage + ' ／ 要点を読んで、問題を3問解こう',
        done: cnt >= 3, progress: Math.min(cnt, 3) + '/3',
        action: '#study/' + focus
      });
    }

    // ③ フェーズごとのタスク
    var phase = w ? w.phase : 'standard';
    var dow = new Date().getDay();
    if (phase === 'practice') {
      var kt = rm.target.milestones.filter(function (m) { return m.key === 'kyotsu'; })[0];
      if (kt && D.diff(today, kt.date) >= 0) {
        tasks.push({ key: 'past', kind: 'manual', icon: '📝', title: '共通テストの過去問・予想問題を1科目、時間を計って解く', sub: '共通テストまであと' + D.diff(today, kt.date) + '日。間違えた単元はこのアプリで復習しよう' });
      } else {
        tasks.push({ key: 'past', kind: 'manual', icon: '📝', title: '志望校の過去問を1科目、時間を計って解く', sub: '記述問題は、答案を家庭教師の先生に添削してもらおう' });
      }
    } else if (phase === 'final') {
      tasks.push({ key: 'review', kind: 'manual', icon: '🌸', title: '本番と同じ時間割で、1科目解いてみる', sub: '新しいことより、今まで間違えた問題の見直しを優先しよう' });
    } else if (dow === 0 || dow === 3) {
      var mini = todays.filter(function (a) { return a.src === 'test'; }).length;
      tasks.push({ key: 'minitest', kind: 'auto', icon: '🔍', title: 'ミニ診断テストで成長をチェック', sub: '週2回(水・日)の実力チェック。苦手が克服できたか確かめよう', done: mini >= 5, progress: Math.min(mini, 5) + '/5', action: '#test' });
    } else {
      tasks.push({ key: 'method', kind: 'manual', icon: '📖', title: '教科書・ノートで、今週の単元の例題を1つ解説してみる', sub: '「人に説明できる」が、本当にわかったサインだよ' });
    }

    // ④ 先生への質問メモ
    tasks.push({ key: 'memo', kind: 'manual', icon: '✏️', title: 'わからなかったことを「先生への質問メモ」に書く', sub: '30分の授業を、疑問の解決だけに使えるようにしよう', action: '#memo' });

    tasks.forEach(function (t) { if (t.kind === 'manual') t.done = !!day.checks[t.key]; });
    return { week: w, tasks: tasks, minutesToday: minutesToday, holiday: WPS.Time.isHoliday(today) };
  }

  return { build: build, target: target, currentWeek: currentWeek, todayTasks: todayTasks, gradeIndex: gradeIndex };
})();

/* ========== 4. SRS(単語帳) ========== */
WPS.SRS = (function () {
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // 箱ごとの次の出題までの日数
  var NEW_PER_DAY = 10;

  // 単語帳に入れる単元(苦手・あと少し・ロードマップ今週の単元・自分で追加した単元)
  function deckUnits() {
    var s = WPS.Store.get();
    var stats = WPS.Analysis.allStats();
    var set = {};
    WPS.UNITS.forEach(function (u) {
      if (stats[u.id].status === 'weak' || stats[u.id].status === 'soso') set[u.id] = true;
    });
    try {
      var rm = WPS.Roadmap.build();
      var w = WPS.Roadmap.currentWeek(rm);
      if (w) w.units.forEach(function (id) { set[id] = true; });
    } catch (e) { /* ロードマップ未作成時は無視 */ }
    (s.extraUnits || []).forEach(function (id) { set[id] = true; });
    return Object.keys(set);
  }

  function dueCards() {
    var s = WPS.Store.get();
    var today = WPS.date.today();
    return Object.keys(s.cards).filter(function (qid) {
      return WPS.Q(qid) && s.cards[qid].due <= today;
    });
  }

  function newCards(units) {
    var s = WPS.Store.get();
    var today = WPS.date.today();
    var introduced = Object.keys(s.cards).filter(function (q) { return s.cards[q].added === today; }).length;
    var room = Math.max(0, NEW_PER_DAY - introduced);
    // 単元ごとの候補(固定の問題＋自動生成なら今日の3問)を作り、
    // 1つの単元にかたよらないよう、順番に1問ずつ取り出す
    var lists = (units || deckUnits()).map(function (uid) {
      var u = WPS.UNIT_MAP[uid];
      var ids = u.questions.map(function (q) { return q.id; });
      if (u.hasGen) {
        for (var k = 0; k < 3; k++) ids.push(WPS.genId(uid, WPS.daySeed(uid, today, k)));
      }
      return ids.filter(function (id) { return !s.cards[id]; });
    });
    var out = [];
    for (var round = 0; out.length < room; round++) {
      var any = false;
      lists.forEach(function (l) { if (l[round] && out.length < room) { out.push(l[round]); any = true; } });
      if (!any) break;
    }
    return out;
  }

  // 今日のセッション(復習 → 新規)
  function session(units) {
    var due = dueCards();
    if (units) due = due.filter(function (q) { return units.indexOf(WPS.Q(q).unit) >= 0; });
    return due.concat(newCards(units));
  }

  // grade: 'again'(まだ) / 'hard'(あいまい) / 'good'(覚えた)
  function grade(qid, g) {
    var s = WPS.Store.get();
    var today = WPS.date.today();
    var c = s.cards[qid] || { box: 0, due: today, n: 0, added: today };
    c.n++;
    if (g === 'again') { c.box = 0; c.due = today; }
    else if (g === 'hard') { c.box = Math.max(1, c.box); c.due = WPS.date.add(today, 1); }
    else { c.box = Math.min(INTERVALS.length - 1, c.box + 1); c.due = WPS.date.add(today, INTERVALS[c.box]); }
    s.cards[qid] = c;
    var q = WPS.Q(qid);
    s.attempts.push({ q: qid, u: q.unit, s: q.subj, ok: g === 'good', ch: null, unsure: g === 'again', src: 'card', t: Date.now(), d: today });
    WPS.Store.day(today).cards = (WPS.Store.day(today).cards || 0) + 1;
    WPS.Streak.touch();
    WPS.Store.save();
  }

  function summary() {
    var s = WPS.Store.get();
    var keys = Object.keys(s.cards);
    return {
      total: keys.length,
      due: dueCards().length,
      mastered: keys.filter(function (k) { return s.cards[k].box >= 4; }).length,
      learning: keys.filter(function (k) { return s.cards[k].box < 4; }).length,
      newToday: newCards().length
    };
  }

  return { deckUnits: deckUnits, dueCards: dueCards, session: session, grade: grade, summary: summary, INTERVALS: INTERVALS };
})();

/* ========== 5. Streak(連続学習記録) ========== */
WPS.Streak = (function () {
  var D = WPS.date;

  function studiedDays() {
    var s = WPS.Store.get();
    var set = {};
    s.attempts.forEach(function (a) { set[a.d] = 'study'; });
    Object.keys(s.days).forEach(function (d) {
      var day = s.days[d];
      if (Object.keys(day.checks || {}).some(function (k) { return day.checks[k]; })) set[d] = 'study';
    });
    (s.frozen || []).forEach(function (d) { if (!set[d]) set[d] = 'frozen'; });
    return set;
  }

  function studiedToday() {
    return studiedDays()[D.today()] === 'study';
  }

  function count() {
    var set = studiedDays();
    var d = D.today();
    if (!set[d]) d = D.add(d, -1); // 今日まだでも、昨日までの記録は生きている
    var n = 0;
    while (set[d]) { if (set[d] === 'study') n++; d = D.add(d, -1); }
    return n;
  }

  function best() {
    var set = studiedDays();
    var days = Object.keys(set).sort();
    var bestN = 0, cur = 0, prev = null;
    days.forEach(function (d) {
      cur = (prev && D.diff(prev, d) === 1) ? cur + (set[d] === 'study' ? 1 : 0) : (set[d] === 'study' ? 1 : 0);
      bestN = Math.max(bestN, cur);
      prev = d;
    });
    return bestN;
  }

  // アプリを開いたときに実行:1日だけ空いた場合は「おやすみチケット」を自動で使う
  function maintain() {
    var s = WPS.Store.get();
    var set = studiedDays();
    var y = D.add(D.today(), -1), yy = D.add(D.today(), -2);
    if (!set[y] && set[yy] && s.freezes > 0) {
      s.frozen.push(y);
      s.freezes--;
      s.lastFreezeUsed = y;
      WPS.Store.save();
      return { usedFreeze: true };
    }
    return { usedFreeze: false };
  }

  // 学習したときに呼ぶ:7日ごとにチケットを1枚(最大2枚)プレゼント
  function touch() {
    var s = WPS.Store.get();
    var n = count();
    if (n > 0 && n % 7 === 0 && s.grantedAt !== n) {
      s.grantedAt = n;
      if (s.freezes < 2) { s.freezes++; s.justGranted = true; }
    }
  }

  // 直近7日間のカレンダー
  function week() {
    var set = studiedDays();
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var d = D.add(D.today(), -i);
      out.push({ d: d, state: set[d] || null, label: '日月火水木金土'[D.parse(d).getDay()] });
    }
    return out;
  }

  // 今日の残り時間(記録が切れるまで)
  function hoursLeft() {
    var now = new Date();
    var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return Math.max(0, (end - now) / 3600000);
  }

  return { count: count, best: best, studiedToday: studiedToday, maintain: maintain, touch: touch, week: week, hoursLeft: hoursLeft, studiedDays: studiedDays };
})();


/* ========== 6. 勉強時間(平日・休日) ========== */
WPS.Time = (function () {
  // 国民の祝日(振替休日を含む)。毎年追加してください。
  var HOLIDAYS = {
    '2026-01-01': '元日', '2026-01-12': '成人の日', '2026-02-11': '建国記念の日', '2026-02-23': '天皇誕生日', '2026-03-20': '春分の日',
    '2026-04-29': '昭和の日', '2026-05-03': '憲法記念日', '2026-05-04': 'みどりの日', '2026-05-05': 'こどもの日', '2026-05-06': '振替休日',
    '2026-07-20': '海の日', '2026-08-11': '山の日', '2026-09-21': '敬老の日', '2026-09-22': '国民の休日', '2026-09-23': '秋分の日',
    '2026-10-12': 'スポーツの日', '2026-11-03': '文化の日', '2026-11-23': '勤労感謝の日',
    '2027-01-01': '元日', '2027-01-11': '成人の日', '2027-02-11': '建国記念の日', '2027-02-23': '天皇誕生日', '2027-03-21': '春分の日', '2027-03-22': '振替休日',
    '2027-04-29': '昭和の日', '2027-05-03': '憲法記念日', '2027-05-04': 'みどりの日', '2027-05-05': 'こどもの日', '2027-07-19': '海の日',
    '2027-08-11': '山の日', '2027-09-20': '敬老の日', '2027-09-23': '秋分の日', '2027-10-11': 'スポーツの日', '2027-11-03': '文化の日', '2027-11-23': '勤労感謝の日'
  };
  function isHoliday(ds) {
    var d = WPS.date.parse(ds).getDay();
    return d === 0 || d === 6 || !!HOLIDAYS[ds];
  }
  function holidayName(ds) { return HOLIDAYS[ds] || (WPS.date.parse(ds).getDay() % 6 === 0 ? '土日' : ''); }
  function wd(p) { return +p.minutesWeekday || +p.minutes || 60; }
  function hd(p) { return +p.minutesHoliday || +p.minutes || 60; }
  function minutesFor(p, ds) { return isHoliday(ds) ? hd(p) : wd(p); }
  function weeklyMinutes(p) { return wd(p) * 5 + hd(p) * 2; }
  function label(m) { m = +m; return m < 60 ? m + '分' : (m % 60 ? Math.floor(m / 60) + '時間' + (m % 60) + '分' : (m / 60) + '時間'); }
  // 選べる時間:15分〜18時間
  var OPTIONS = [15, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080];
  return { isHoliday: isHoliday, holidayName: holidayName, minutesFor: minutesFor, weeklyMinutes: weeklyMinutes, label: label, OPTIONS: OPTIONS };
})();

/* ========== 7. レベル(経験値) ========== */
WPS.Level = (function () {
  var TITLES = [[1, '見習いスナイパー'], [3, 'ルーキー'], [5, 'ねらい撃ちの名人'], [8, '百発百中'], [12, '弱点ハンター'], [16, 'エーススナイパー'], [20, '伝説のスナイパー'], [30, '合格請負人']];
  function xp() {
    var s = WPS.Store.get(), x = 0;
    s.attempts.forEach(function (a) {
      if (a.src === 'card') x += a.ok ? 4 : 2;
      else if (a.src === 'oral' || a.src === 'school') x += 5;
      else x += a.ok ? 10 : 4; // 間違えても挑戦した分の経験値が入る
    });
    Object.keys(s.days).forEach(function (d) { var c = s.days[d].checks || {}; Object.keys(c).forEach(function (k) { if (c[k]) x += 15; }); });
    x += (s.memos || []).length * 5;
    x += WPS.Streak.best() * 10;
    return x;
  }
  function need(L) { return 30 * L * (L + 1); } // レベルLになるのに必要な合計経験値(L≧1。レベル1は0から)
  function info() {
    var x = xp(), L = 1;
    while (x >= need(L)) L++;
    var from = L === 1 ? 0 : need(L - 1), to = need(L);
    var title = TITLES.filter(function (t) { return L >= t[0]; }).pop()[1];
    var next = TITLES.filter(function (t) { return t[0] > L; })[0];
    return { xp: x, level: L, from: from, to: to, pct: Math.round((x - from) / (to - from) * 100), title: title, nextTitle: next ? next[1] : null, nextAt: next ? next[0] : null };
  }
  return { info: info };
})();
