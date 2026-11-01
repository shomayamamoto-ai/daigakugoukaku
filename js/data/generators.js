/*
 * 問題の自動生成(全単元)
 * ------------------------------------------------------------
 * 単元ごとに「問題を作る関数」を用意しています。
 * 同じ「種(シード)」からは必ず同じ問題ができるので、
 * 単語帳で「忘れかけた頃に同じ問題をもう一度」出せます。
 *
 * 各関数が返すもの:
 *   { lv: 思考レベル(1知識/2理解/3応用), text: 問題文, choices: [正解, 誤答…],
 *     exp: 解説(改行あり), why: {誤答: その答えが違う理由}, say: 読み上げる英語,
 *     pic: 絵文字のイラスト, pics: {選択肢: 絵文字}, fig: 図のデータ }
 */
window.WPS = window.WPS || {};

(function () {
  /* ================= 共通の道具 ================= */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function nz(r, a, b) { var v; do { v = ri(r, a, b); } while (v === 0); return v; }
  function pk(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function shuffle(r, a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function num(n) { return String(Math.round(n * 1000) / 1000); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function frac(n, d) { var g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; }
  function term(c, v, first) {
    if (c === 0) return '';
    var abs = Math.abs(c), body = (abs === 1 && v) ? v : abs + v;
    return first ? (c < 0 ? '-' : '') + body : (c < 0 ? '-' : '＋') + body;
  }
  function poly(list) {
    var out = '', first = true;
    list.forEach(function (p) { var t = term(p[0], p[1], first); if (t) { out += t; first = false; } });
    return out || '0';
  }
  function sgn(n) { return n < 0 ? '(' + n + ')' : String(n); }
  // 正解＋候補から重複のない4択を作る(足りなければ数字をずらした誤答で補う)
  function choices(correct, cands) {
    var out = [String(correct)];
    cands.forEach(function (c) { c = String(c); if (out.length < 4 && out.indexOf(c) < 0) out.push(c); });
    var shifts = [1, -1, 2, -2, 3, -3, 5, 10, -10, 20];
    for (var k = 0; out.length < 4 && k < shifts.length * 3; k++) {
      var sh = shifts[k % shifts.length], idx = Math.floor(k / shifts.length), cnt = -1;
      var f = String(correct).replace(/\d+(\.\d+)?/g, function (m) { cnt++; return cnt === idx ? String(Math.abs(Math.round((+m + sh) * 1000) / 1000)) : m; });
      if (out.indexOf(f) < 0) out.push(f);
    }
    return out;
  }
  function numChoices(ans, cands) { return choices(num(ans), cands.map(num).concat([num(ans + 1), num(ans - 1), num(ans * 2 + 1)])); }
  function uniq(a) { return a.filter(function (x, i) { return x !== undefined && a.indexOf(x) === i; }); }
  function uniqBy(list, key) { var seen = {}; return list.filter(function (x) { if (seen[x[key]]) return false; seen[x[key]] = true; return true; }); }
  function Q(lv, text, ch, exp, extra) {
    var o = { lv: lv, text: text, choices: uniq(ch), exp: exp, why: {} };
    if (extra) Object.keys(extra).forEach(function (k) { o[k] = extra[k]; });
    return o;
  }
  // 種によって2つ以上の作り方を切り替える
  function mix(list) {
    return function (r, seed) { var g = list[seed % list.length]; return g(r, Math.floor(seed / list.length)); };
  }

  /* ================= 用語データから作る問題 ================= */
  // 型0:見出し→意味 / 型1:意味→見出し / 型2・3:正誤(○×)
  function fact(bankKey, o) {
    o = o || {};
    return function (r, seed) {
      var bank = WPS.BANK[bankKey], N = bank.length;
      var idx = seed % N, type = Math.floor(seed / N) % 2; // 正誤(○×)問題は出さず、日本語→英語/英語→日本語 の4択だけ
      var it = bank[idx];
      var others = uniqBy(shuffle(r, bank.filter(function (x) { return x.m !== it.m && x.t !== it.t; })), 'm');
      var ds = others.slice(0, 3);
      var tip = it.h ? '\n💡 ' + it.h : '';
      var note = o.note ? '\n' + o.note : '';
      var extra = {};
      if (o.en) extra.say = it.t;
      var q;
      if (type === 0) {
        q = Q(o.lv || 1, o.q0 ? o.q0(it) : '「' + it.t + '」の意味は?', [it.m].concat(ds.map(function (d) { return d.m; })),
          '「' + it.t + '」＝「' + it.m + '」' + tip + note, extra);
        ds.forEach(function (d) { q.why[d.m] = '「' + d.m + '」は「' + d.t + '」のことです。'; });
      } else if (type === 1) {
        q = Q(o.lv || 1, o.q1 ? o.q1(it) : '「' + it.m + '」にあてはまるのは?', [it.t].concat(ds.map(function (d) { return d.t; })),
          '「' + it.m + '」＝「' + it.t + '」' + tip + note, extra);
        ds.forEach(function (d) { q.why[d.t] = '「' + d.t + '」は「' + d.m + '」のことです。'; });
        if (o.en) {
          q.sayChoices = true;
        }
      } else {
        var truth = type === 2;
        var shown = truth ? it.m : ds[0].m;
        q = Q(2, '次の説明は正しい?\n「' + it.t + '」＝「' + shown + '」', truth ? ['正しい', '誤り'] : ['誤り', '正しい'],
          (truth ? '正しいです。' : '誤りです。「' + shown + '」は「' + ds[0].t + '」のこと。\n') + '「' + it.t + '」＝「' + it.m + '」' + tip, extra);
        q.why[truth ? '誤り' : '正しい'] = truth ? '「' + it.t + '」は、まさに「' + it.m + '」のことです。' : '「' + it.t + '」の正しい説明は「' + it.m + '」です。';
      }
      return q;
    };
  }

  /* ================= 歴史(年表)から作る問題 ================= */
  var ERA_JH = ['弥生', '飛鳥', '奈良', '平安', '鎌倉', '室町', '安土桃山', '江戸', '明治', '大正', '昭和', '平成'];
  var ERA_WH = ['古代', '中世', '近世', '近代', '現代'];
  function yl(y) { y = +y; return y < 0 ? '紀元前' + (-y) + '年' : y + '年'; }
  function history(bankKey, eras, o) {
    o = o || {};
    return function (r, seed) {
      var all = WPS.BANK[bankKey];
      var bank = eras ? all.filter(function (x) { return eras.indexOf(x.h) >= 0; }) : all;
      var N = bank.length, types = o.types || [0, 1, 2, 3];
      var it = bank[seed % N], type = types[Math.floor(seed / N) % types.length];
      var eraList = bankKey === 'whistory' ? ERA_WH : ERA_JH;
      var sorted = all.slice().sort(function (a, b) { return a.t - b.t; });
      var pos = sorted.indexOf(it);
      // 流れで覚えられるように「なぜ起きたか → どうなったか」と前後のできごとを解説に入れる
      var hc = (WPS.HCTX || {})[(bankKey === 'whistory' ? 'w:' : 'j:') + it.t];
      var ctx = (hc ? '\n\n【なぜ起きた?】' + hc[0] + '\n【どうなった?】' + hc[1] : '') +
        '\n\n【前後のできごと】' + (sorted[pos - 1] ? '\n・' + yl(sorted[pos - 1].t) + ' ' + sorted[pos - 1].m : '') + '\n・' + yl(it.t) + ' ' + it.m + ' ←これ' + (sorted[pos + 1] ? '\n・' + yl(sorted[pos + 1].t) + ' ' + sorted[pos + 1].m : '');
      var others = shuffle(r, bank.filter(function (x) { return x.t !== it.t; }));
      var q;
      if (type === 0) {
        var ds = others.slice(0, 3);
        q = Q(1, yl(it.t) + 'のできごとは?', [it.m].concat(ds.map(function (d) { return d.m; })), yl(it.t) + '(' + it.h + '時代)は「' + it.m + '」。' + ctx);
        ds.forEach(function (d) { q.why[d.m] = 'これは' + yl(d.t) + '(' + d.h + '時代)のできごとです。'; });
      } else if (type === 1) {
        var ys = others.slice(0, 3);
        q = Q(1, '「' + it.m + '」は何年?', [yl(it.t)].concat(ys.map(function (d) { return yl(d.t); })), '「' + it.m + '」は' + yl(it.t) + '。' + ctx);
        ys.forEach(function (d) { q.why[yl(d.t)] = yl(d.t) + 'は「' + d.m + '」の年です。'; });
      } else if (type === 2) {
        var wrong = shuffle(r, eraList.filter(function (e) { return e !== it.h; })).slice(0, 3);
        q = Q(2, '「' + it.m + '」が起きた時代は?', [it.h + (bankKey === 'whistory' ? '' : '時代')].concat(wrong.map(function (e) { return e + (bankKey === 'whistory' ? '' : '時代'); })),
          '「' + it.m + '」は' + yl(it.t) + '、' + it.h + (bankKey === 'whistory' ? '' : '時代') + 'のできごと。\n時代の順番:' + eraList.join(' → ') + ctx);
      } else {
        var pool = [it].concat(others.filter(function (x) { return x.t !== it.t; }).slice(0, 2));
        var right = pool.slice().sort(function (a, b) { return a.t - b.t; });
        function lab(list) { return list.map(function (x) { return x.m.length > 14 ? x.m.slice(0, 14) + '…' : x.m; }).join(' → '); }
        var perms = [[0, 2, 1], [1, 0, 2], [2, 1, 0], [1, 2, 0], [2, 0, 1]].map(function (p) { return lab(p.map(function (i) { return right[i]; })); });
        q = Q(3, '古い順に正しく並べたものは?', [lab(right)].concat(shuffle(r, perms).slice(0, 3)),
          '古い順:\n' + right.map(function (x) { var c = (WPS.HCTX || {})[(bankKey === 'whistory' ? 'w:' : 'j:') + x.t]; return '・' + yl(x.t) + ' ' + x.m + (c ? '\n　→ ' + c[1] : ''); }).join('\n') + '\n年号を覚えていなくても、「何が原因で、次に何が起きたか」の流れがわかれば並べられます。');
      }
      return q;
    };
  }

  WPS.EMOJI = WPS.EMOJI || {};
  var G = {};

  /* ================= 英語:共通データ ================= */
  var SUBJ = [['I', '1'], ['You', '2'], ['He', '3'], ['She', '3'], ['Ken', '3'], ['My sister', '3'], ['Our teacher', '3'], ['We', 'p'], ['They', 'p'], ['Tom and Lisa', 'p'], ['My parents', 'p'], ['The students', 'p']]
    .map(function (a) { return { t: a[0], p: a[1] }; });
  function low(s) { return /^(I|Ken|Tom)\b/.test(s.t) ? s.t : s.t.charAt(0).toLowerCase() + s.t.slice(1); }
  function pron(s) { return { I: 'I', You: 'you', He: 'he', She: 'she', Ken: 'he', 'My sister': 'she', 'Our teacher': 'he', We: 'we', They: 'they', 'Tom and Lisa': 'they', 'My parents': 'they', 'The students': 'they' }[s.t]; }
  function be(s) { return s.p === '1' ? 'am' : s.p === '3' ? 'is' : 'are'; }
  function bePast(s) { return (s.p === '1' || s.p === '3') ? 'was' : 'were'; }
  function have(s) { return s.p === '3' ? 'has' : 'have'; }
  function pdesc(s) {
    return s.p === '1' ? '主語は「I」(自分)' : s.p === '2' ? '主語は「you」(相手)'
      : s.p === '3' ? '主語の「' + s.t + '」は、自分でも相手でもない1人(3人称単数)' : '主語の「' + s.t + '」は2人以上(複数)';
  }
  // 原形, 3単現, 過去形, 過去分詞, ing形, 目的語, 意味
  var VERBS = [
    ['play', 'plays', 'played', 'played', 'playing', 'tennis', '(スポーツを)する'],
    ['study', 'studies', 'studied', 'studied', 'studying', 'English', '勉強する'],
    ['watch', 'watches', 'watched', 'watched', 'watching', 'TV', '見る'],
    ['go', 'goes', 'went', 'gone', 'going', 'to school', '行く'],
    ['eat', 'eats', 'ate', 'eaten', 'eating', 'lunch', '食べる'],
    ['write', 'writes', 'wrote', 'written', 'writing', 'a letter', '書く'],
    ['read', 'reads', 'read', 'read', 'reading', 'a book', '読む'],
    ['make', 'makes', 'made', 'made', 'making', 'a cake', '作る'],
    ['speak', 'speaks', 'spoke', 'spoken', 'speaking', 'English', '話す'],
    ['take', 'takes', 'took', 'taken', 'taking', 'pictures', '撮る'],
    ['see', 'sees', 'saw', 'seen', 'seeing', 'the movie', '見る'],
    ['buy', 'buys', 'bought', 'bought', 'buying', 'a bag', '買う'],
    ['use', 'uses', 'used', 'used', 'using', 'a computer', '使う'],
    ['clean', 'cleans', 'cleaned', 'cleaned', 'cleaning', 'the room', '掃除する'],
    ['swim', 'swims', 'swam', 'swum', 'swimming', 'in the sea', '泳ぐ'],
    ['run', 'runs', 'ran', 'run', 'running', 'in the park', '走る'],
    ['sing', 'sings', 'sang', 'sung', 'singing', 'a song', '歌う'],
    ['teach', 'teaches', 'taught', 'taught', 'teaching', 'math', '教える'],
    ['visit', 'visits', 'visited', 'visited', 'visiting', 'Kyoto', '訪れる'],
    ['cook', 'cooks', 'cooked', 'cooked', 'cooking', 'dinner', '料理する'],
    ['drink', 'drinks', 'drank', 'drunk', 'drinking', 'milk', '飲む'],
    ['have', 'has', 'had', 'had', 'having', 'breakfast', '食べる'],
    ['help', 'helps', 'helped', 'helped', 'helping', 'my mother', '手伝う'],
    ['write', 'writes', 'wrote', 'written', 'writing', 'an email', '書く']
  ].map(function (a) { return { base: a[0], s: a[1], past: a[2], pp: a[3], ing: a[4], obj: a[5], ja: a[6] }; });
  function sRule(v) {
    if (v.base === 'have') return '\n💡 have は特別に has になります。';
    if (/ies$/.test(v.s)) return '\n💡 「子音字＋y」で終わる動詞は、y を i にかえて es(study → studies)。';
    if (/(ches|shes|oes|sses|xes)$/.test(v.s)) return '\n💡 ch・sh・o・s・x で終わる動詞は es をつけます(' + v.base + ' → ' + v.s + ')。';
    return '';
  }
  function ingRule(v) {
    if (/(mm|nn|pp|tt)ing$/.test(v.ing)) return '\n💡 「短母音＋子音字」で終わる動詞は、最後の文字を重ねて ing(' + v.base + ' → ' + v.ing + ')。';
    if (/e$/.test(v.base) && !/ee$/.test(v.base)) return '\n💡 e で終わる動詞は、e をとって ing(' + v.base + ' → ' + v.ing + ')。';
    return '';
  }
  function pastRule(v) {
    if (v.past === v.base + 'ed' || v.past === v.base + 'd') return '\n💡 ' + v.base + ' は規則動詞。ed(d)をつけて ' + v.past + '。';
    if (/ied$/.test(v.past)) return '\n💡 「子音字＋y」は y を i にかえて ed(' + v.base + ' → ' + v.past + ')。';
    return '\n💡 ' + v.base + ' は不規則動詞。' + v.base + ' − ' + v.past + ' − ' + v.pp + ' とセットで覚えよう。';
  }
  var PAST_T = ['yesterday', 'last night', 'last Sunday', 'two days ago', 'last week'];
  function pickSV(r, seed) { var s = SUBJ[seed % SUBJ.length]; var v = VERBS[Math.floor(seed / SUBJ.length) % VERBS.length]; return { s: s, v: v, k: Math.floor(seed / (SUBJ.length * VERBS.length)) }; }

  /* ---------- be動詞 ---------- */
  G.e_m1 = function (r, seed) {
    var s = SUBJ[seed % 12], comps = ['happy', 'busy', 'from Japan', 'in the library', 'hungry', 'tired', 'very kind', 'at home'];
    var c = comps[Math.floor(seed / 12) % 8], type = Math.floor(seed / 96) % 3, b = be(s);
    var whyAll = { am: '「am」は主語が I のときだけ使います。', is: '「is」は主語が3人称単数(he・she・Ken など1人)のときに使います。', are: '「are」は主語が you か、2人以上(複数)のときに使います。', be: '「be」は原形です。現在の文では am・is・are のどれかに変えます。', Am: '「Am」は主語が I のときだけ。', Is: '「Is」は主語が3人称単数のとき。', Are: '「Are」は主語が you か複数のとき。', Do: '「Do」は一般動詞(play など)の疑問文で使います。この文には一般動詞がないので be動詞を使います。' };
    var rule = '\n【ルール】I → am ／ you・複数 → are ／ それ以外の1人 → is';
    var q;
    if (type === 0) q = Q(1, s.t + ' (   ) ' + c + '.', [b, 'am', 'is', 'are', 'be'].filter(function (x, i, a) { return a.indexOf(x) === i; }).slice(0, 4), pdesc(s) + '。\n→ be動詞は「' + b + '」' + rule, { say: s.t + ' ' + b + ' ' + c + '.' });
    else if (type === 1) q = Q(2, s.t + ' (   ) not ' + c + '.', [b, 'am', 'is', 'are', 'be'].filter(function (x, i, a) { return a.indexOf(x) === i; }).slice(0, 4), pdesc(s) + '。\n→ be動詞は「' + b + '」。否定文は be動詞のすぐ後ろに not を置きます。' + rule, { say: s.t + ' ' + b + ' not ' + c + '.' });
    else {
      var B = b.charAt(0).toUpperCase() + b.slice(1);
      q = Q(2, '(   ) ' + low(s) + ' ' + c + '?', [B, 'Am', 'Is', 'Are', 'Do'].filter(function (x, i, a) { return a.indexOf(x) === i; }).slice(0, 4), pdesc(s) + '。\n→ 疑問文は be動詞「' + b + '」を主語の前に出します。' + rule, { say: B + ' ' + low(s) + ' ' + c + '?' });
    }
    q.choices.slice(1).forEach(function (x) { q.why[x] = whyAll[x]; });
    return q;
  };

  /* ---------- 一般動詞の現在形・三単現 ---------- */
  G.e_pres = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 3, three = s.p === '3';
    var q;
    if (type === 0) {
      var c = three ? v.s : v.base;
      q = Q(2, s.t + ' (   ) ' + v.obj + ' every day.', [c, three ? v.base : v.s, be(s) + ' ' + v.base, v.ing],
        pdesc(s) + '。\n→ ' + (three ? '現在の文なので、動詞に s をつけて「' + v.s + '」。' + sRule(v) : '3人称単数ではないので、動詞はそのまま「' + v.base + '」。'), { say: s.t + ' ' + c + ' ' + v.obj + ' every day.' });
      q.why[three ? v.base : v.s] = three ? '主語が3人称単数で現在の文なら、s が必要です。' : 's をつけるのは主語が3人称単数(he・she など1人)のときだけです。';
      q.why[be(s) + ' ' + v.base] = 'be動詞(am・is・are)と一般動詞(' + v.base + ')は、1つの文にいっしょに使えません。';
      q.why[v.ing] = '「' + v.ing + '」だけでは文になりません。';
    } else if (type === 1) {
      var d = three ? 'does' : 'do';
      q = Q(2, s.t + ' (   ) not ' + v.base + ' ' + v.obj + '.', [d, three ? 'do' : 'does', be(s), 'did not'.split(' ')[0] === 'did' ? 'is' : 'is'].filter(function (x, i, a) { return a.indexOf(x) === i; }),
        pdesc(s) + '。\n→ 一般動詞の否定文は「' + d + ' not ＋ 動詞の原形」。' + (three ? '\n💡 does が s の役割を引き受けるので、後ろの動詞は原形(' + v.base + ')のまま。' : ''));
      if (q.choices.length < 4) q.choices.push(three ? 'are' : 'am');
      q.choices.slice(1).forEach(function (x) { q.why[x] = /^(is|are|am)$/.test(x) ? 'be動詞の否定文ではありません。' + v.base + ' は一般動詞なので do・does を使います。' : (x === 'does' ? 'does は主語が3人称単数のときだけです。' : 'do は主語が3人称単数ではないときに使います。'); });
    } else {
      var D = three ? 'Does' : 'Do';
      q = Q(2, '(   ) ' + low(s) + ' ' + v.base + ' ' + v.obj + '?', [D, three ? 'Do' : 'Does', be(s).charAt(0).toUpperCase() + be(s).slice(1), 'Did'].filter(function (x, i, a) { return a.indexOf(x) === i; }),
        pdesc(s) + '。\n→ 一般動詞の疑問文は「' + D + ' ＋ 主語 ＋ 動詞の原形 〜?」。', { say: D + ' ' + low(s) + ' ' + v.base + ' ' + v.obj + '?' });
      q.why.Did = 'Did は過去の疑問文です。この文は現在のことです。';
      q.why[three ? 'Do' : 'Does'] = three ? '主語が3人称単数なので Does を使います。' : 'Does は主語が3人称単数のときだけです。';
      q.choices.forEach(function (c) { if (/^(Is|Are|Am)$/.test(c)) q.why[c] = v.base + ' は一般動詞なので、be動詞ではなく Do・Does を使います。'; });
    }
    return q;
  };

  /* ---------- 現在進行形 ---------- */
  G.e_prog = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, c = be(s) + ' ' + v.ing;
    var t = x.k % 2 ? 'now' : 'right now';
    var q = Q(2, s.t + ' (   ) ' + v.obj + ' ' + t + '.', [c, s.p === '3' ? v.s : v.base, be(s) + ' ' + v.base, v.ing],
      '「今〜しているところ」は現在進行形 ＝ be動詞 ＋ 動詞のing形。\n' + pdesc(s) + 'なので be動詞は「' + be(s) + '」。\n→ ' + c + ingRule(v), { say: s.t + ' ' + c + ' ' + v.obj + ' ' + t + '.' });
    q.why[q.choices[1]] = 'これは「いつもすること(習慣)」を表す現在形。now(今)があるので進行形にします。';
    q.why[be(s) + ' ' + v.base] = 'be動詞の後ろは ing形にします。原形は使えません。';
    q.why[v.ing] = 'ing形だけでは文になりません。be動詞(' + be(s) + ')が必要です。';
    return q;
  };

  /* ---------- can・命令文 ---------- */
  G.e_can = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 3, q;
    if (type === 0) {
      q = Q(1, s.t + ' can (   ) ' + v.obj + '.', [v.base, v.s, 'to ' + v.base, v.ing], 'can などの助動詞の後ろは、主語が何でも動詞の原形。\n→ can ' + v.base, { say: s.t + ' can ' + v.base + ' ' + v.obj + '.' });
      q.why[v.s] = '助動詞の後ろは原形。主語が3人称単数でも s はつけません。';
      q.why['to ' + v.base] = 'can の後ろに to は入りません。';
      q.why[v.ing] = 'can の後ろは原形です。';
    } else if (type === 1) {
      q = Q(2, '(   ) ' + low(s) + ' ' + v.base + ' ' + v.obj + '?(〜することができますか)', ['Can', s.p === '3' ? 'Does' : 'Do', 'Will', 'Must'],
        '「〜できますか?」は Can ＋ 主語 ＋ 動詞の原形 〜?', { say: 'Can ' + low(s) + ' ' + v.base + ' ' + v.obj + '?' });
      q.why[q.choices[1]] = '「〜しますか」になり、「できる」の意味が出ません。';
      q.why.Will = 'Will は「〜するつもりですか」「〜してくれますか」の意味です。';
      q.why.Must = 'Must は「〜しなければなりませんか」の意味です。';
    } else {
      var neg = Math.floor(x.k / 3) % 2 === 1;
      if (neg) {
        q = Q(2, "Don't (   ) " + v.obj + ' here.', [v.base, v.s, v.ing, 'to ' + v.base], "「〜してはいけない」は Don't ＋ 動詞の原形。", { say: "Don't " + v.base + ' ' + v.obj + ' here.' });
      } else {
        var B = v.base.charAt(0).toUpperCase() + v.base.slice(1);
        q = Q(1, '(   ) ' + v.obj + ', please.(〜してください)', [B, v.s.charAt(0).toUpperCase() + v.s.slice(1), v.ing.charAt(0).toUpperCase() + v.ing.slice(1), 'To ' + v.base], '命令文は主語を省いて、動詞の原形で始めます。\n→ ' + B + ' 〜, please.', { say: B + ' ' + v.obj + ', please.' });
      }
      q.choices.slice(1).forEach(function (c) { q.why[c] = '命令文は動詞の原形を使います。'; });
    }
    return q;
  };

  /* ---------- 疑問詞 ---------- */
  G.e_wh = function (r, seed) {
    var items = [
      ['Where', '(   ) do you live?', 'I live in {city}.', ['When', 'Who', 'How many']],
      ['When', '(   ) is your birthday?', 'It is {month} {day}.', ['Where', 'Who', 'How old']],
      ['What time', '(   ) do you get up?', 'At {h}:00.', ['Where', 'Who', 'How many']],
      ['Who', '(   ) is that girl?', 'She is {name}.', ['Where', 'When', 'How many']],
      ['How many', '(   ) {noun} do you have?', 'I have {n} {noun}.', ['How much', 'What time', 'Where']],
      ['How old', '(   ) is your brother?', 'He is {n} years old.', ['How many', 'When', 'Where']],
      ['Whose', '(   ) bag is this?', "It's {name}'s.", ['Who', 'Which', 'Where']],
      ['How', '(   ) do you go to school?', 'By {vehicle}.', ['What', 'Where', 'When']],
      ['Why', '(   ) were you late?', 'Because I got up late.', ['When', 'Where', 'Who']],
      ['What', '(   ) do you want for your birthday?', 'I want a new {thing}.', ['Who', 'Where', 'When']]
    ];
    var fill = { city: ['Osaka', 'Kyoto', 'Sapporo', 'Fukuoka', 'Nagoya', 'Sendai'], month: ['April', 'May', 'June', 'July', 'August', 'October'], day: ['1st', '5th', '10th', '20th'],
      h: ['5', '6', '7', '8'], name: ['Yumi', 'my sister', 'Aya', 'Mika', "Ken's sister"], noun: ['books', 'pens', 'cats', 'CDs', 'bags'], n: ['3', '4', '5', '12', '15'], vehicle: ['bus', 'bike', 'train', 'car'], thing: ['bike', 'watch', 'bag', 'game'] };
    var it = items[seed % items.length], rr = rng(seed * 7 + 3);
    function f(s) { return s.replace(/\{(\w+)\}/g, function (_, k) { return pk(rr, fill[k]); }); }
    var qt = f(it[1]), at = f(it[2]);
    var mean = { Where: '場所(どこ)', When: '時(いつ)', 'What time': '時刻(何時)', Who: '人(だれ)', 'How many': '数(いくつ)', 'How old': '年齢(何歳)', Whose: '持ち主(だれの)', How: '方法(どうやって)', Why: '理由(なぜ)', What: 'もの(何)', 'How much': '値段・量(いくら)', Which: 'どちら' };
    var q = Q(2, '答えに合うように、疑問詞を選ぼう。\nQ: ' + qt + '\nA: ' + at, [it[0]].concat(it[3]),
      '答えが「' + at + '」なので、たずねているのは' + mean[it[0]] + '。\n→ ' + it[0], { say: qt.replace('(   )', it[0]) + ' ' + at });
    it[3].forEach(function (w) { q.why[w] = w + ' は' + (mean[w] || '') + 'をたずねる言葉です。'; });
    return q;
  };

  /* ---------- 過去形 ---------- */
  G.e_m2 = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 4, t = PAST_T[(seed >> 3) % PAST_T.length], q;
    if (type === 0) {
      var pres = s.p === '3' ? v.s : v.base;
      q = Q(1, s.t + ' (   ) ' + v.obj + ' ' + t + '.', [v.past, pres, bePast(s) + ' ' + v.base, v.pp !== v.past ? v.pp : 'did ' + v.past],
        '「' + t + '」は過去を表す言葉。だから動詞は過去形。\n→ ' + v.base + ' の過去形は「' + v.past + '」' + pastRule(v), { say: s.t + ' ' + v.past + ' ' + v.obj + ' ' + t + '.' });
      q.why[pres] = 'これは現在形です。' + t + ' があるので過去形にします。';
      q.why[bePast(s) + ' ' + v.base] = 'be動詞と一般動詞を並べることはできません。';
      if (v.pp !== v.past) q.why[v.pp] = '「' + v.pp + '」は過去分詞。have と組み合わせるか受け身で使います。'; else q.why['did ' + v.past] = 'did と過去形を重ねて使うことはできません。';
    } else if (type === 1) {
      var comps = ['busy', 'tired', 'at home', 'in Tokyo', 'happy'], c = comps[(seed >> 2) % 5];
      q = Q(1, s.t + ' (   ) ' + c + ' ' + t + '.', [bePast(s), be(s), bePast(s) === 'was' ? 'were' : 'was', 'did'],
        '過去の be動詞は2つだけ。\nI・3人称単数 → was ／ you・複数 → were\n' + pdesc(s) + 'なので「' + bePast(s) + '」。', { say: s.t + ' ' + bePast(s) + ' ' + c + ' ' + t + '.' });
      q.why[be(s)] = 'これは現在の be動詞です。';
      q.why[bePast(s) === 'was' ? 'were' : 'was'] = bePast(s) === 'was' ? 'were は主語が you か複数のとき。' : 'was は主語が I か3人称単数のとき。';
      q.why.did = 'did は一般動詞の疑問文・否定文で使います。';
    } else if (type === 2) {
      q = Q(2, 'Did ' + low(s) + ' (   ) ' + v.obj + ' ' + t + '?', [v.base, v.past, v.s, v.ing],
        'Did を使った疑問文では、動詞は原形にもどします。\n💡 did が「過去」の意味を引き受けてくれるからです。', { say: 'Did ' + low(s) + ' ' + v.base + ' ' + v.obj + ' ' + t + '?' });
      if (v.past !== v.base) q.why[v.past] = 'did があるので、過去形にはしません(過去が2回になってしまう)。';
      q.why[v.s] = 's はつけません。did の後ろは原形です。';
      q.why[v.ing] = 'did の後ろは原形です。';
    } else {
      q = Q(2, s.t + ' (   ) not ' + v.base + ' ' + v.obj + ' ' + t + '.', ['did', s.p === '3' ? 'does' : 'do', bePast(s), 'had'],
        '過去の否定文は「did not(didn\'t) ＋ 動詞の原形」。主語が何でも did です。');
      q.choices.slice(1).forEach(function (c) { q.why[c] = c === 'does' || c === 'do' ? c + ' は現在の文で使います。' : c === 'had' ? 'had not ＋ 原形 という形はありません。' : 'be動詞ではなく did を使います(' + v.base + ' は一般動詞)。'; });
    }
    return q;
  };

  /* ---------- 過去進行形 ---------- */
  G.e_pprog = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 2, q;
    var ts = ['at that time', 'at seven last night', 'when I called', 'when it started to rain'], t = ts[(seed >> 4) % 4];
    if (type === 0) {
      var c = bePast(s) + ' ' + v.ing;
      q = Q(2, s.t + ' (   ) ' + v.obj + ' ' + t + '.', [c, be(s) + ' ' + v.ing, v.past, bePast(s) + ' ' + v.base],
        '「過去のある時に〜しているところだった」は過去進行形 ＝ was/were ＋ ing形。\n' + pdesc(s) + 'なので「' + bePast(s) + '」。\n→ ' + c + ingRule(v), { say: s.t + ' ' + c + ' ' + v.obj + ' ' + t + '.' });
      q.why[be(s) + ' ' + v.ing] = 'これは現在進行形。「' + t + '」は過去のことです。';
      q.why[v.past] = '過去形は「〜した」。「〜しているところだった」なら進行形です。';
      q.why[bePast(s) + ' ' + v.base] = 'be動詞の後ろは ing形にします。';
    } else {
      q = Q(2, 'What (   ) ' + low(s) + ' doing ' + t + '?', [bePast(s), be(s), 'did', bePast(s) === 'was' ? 'were' : 'was'],
        '「何をしているところだったの?」は What ＋ was/were ＋ 主語 ＋ doing?\n' + pdesc(s) + 'なので「' + bePast(s) + '」。');
      q.why.did = 'doing(ing形)と組み合わせるのは be動詞です。';
      q.why[be(s)] = 'これは現在形です。' + t + ' は過去のことです。';
      q.why[bePast(s) === 'was' ? 'were' : 'was'] = '主語に合わない be動詞です。';
    }
    return q;
  };

  /* ---------- 未来形 ---------- */
  G.e_fut = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 3, q;
    var ft = ['tomorrow', 'next week', 'next Sunday', 'this weekend'][(seed >> 3) % 4];
    if (type === 0) {
      q = Q(1, s.t + ' will (   ) ' + v.obj + ' ' + ft + '.', [v.base, v.s, v.past, v.ing], 'will の後ろは、主語が何でも動詞の原形。\n→ will ' + v.base, { say: s.t + ' will ' + v.base + ' ' + v.obj + ' ' + ft + '.' });
      q.why[v.s] = 'will の後ろに s はつけません。'; q.why[v.past] = 'will の後ろは原形です。'; q.why[v.ing] = 'will の後ろは原形です。';
    } else if (type === 1) {
      q = Q(2, s.t + ' (   ) going to ' + v.base + ' ' + v.obj + ' ' + ft + '.', [be(s), 'will', bePast(s), be(s) === 'is' ? 'are' : 'is'],
        '「〜するつもりだ・〜する予定だ」は be going to ＋ 動詞の原形。\n' + pdesc(s) + 'なので be動詞は「' + be(s) + '」。', { say: s.t + ' ' + be(s) + ' going to ' + v.base + ' ' + v.obj + ' ' + ft + '.' });
      q.why.will = 'will going to という形はありません。'; q.why[bePast(s)] = ft + ' は未来なので過去形は使いません。';
    } else {
      q = Q(2, s.t + ' (   ) ' + v.base + ' ' + v.obj + ' ' + ft + '.', ['will', be(s), 'did', bePast(s)],
        ft + ' は未来を表す言葉。動詞の原形の前に置けるのは will。\n→ will ' + v.base, { say: s.t + ' will ' + v.base + ' ' + v.obj + ' ' + ft + '.' });
      q.why[be(s)] = 'be動詞と動詞の原形は並べられません(be going to なら OK)。'; q.why.did = 'did は過去です。'; q.why[bePast(s)] = '過去の be動詞です。';
    }
    return q;
  };

  /* ---------- 助動詞 ---------- */
  G.e_m3 = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v;
    var M = [['must', '〜しなければならない'], ['must not', '〜してはいけない'], ['may', '〜してもよい'], ['should', '〜するべきだ'], ['can', '〜することができる'], [s.p === '3' ? "doesn't have to" : "don't have to", '〜する必要はない']];
    var m = M[x.k % M.length];
    var others = shuffle(r, M.filter(function (z) { return z !== m; })).slice(0, 3);
    var q = Q(2, s.t + ' (   ) ' + v.base + ' ' + v.obj + '.\n(「' + m[1] + '」の意味にしたい)', [m[0]].concat(others.map(function (z) { return z[0]; })),
      '「' + m[1] + '」は「' + m[0] + '」。\n【まとめ】must＝〜しなければならない ／ must not＝〜してはいけない ／ may＝〜してもよい ／ should＝〜すべき ／ don\'t have to＝〜する必要はない\n💡 助動詞の後ろは動詞の原形。', { say: s.t + ' ' + m[0] + ' ' + v.base + ' ' + v.obj + '.' });
    others.forEach(function (z) { q.why[z[0]] = '「' + z[0] + '」は「' + z[1] + '」の意味です。'; });
    return q;
  };

  /* ---------- 不定詞 ---------- */
  G.e_m4 = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 3, q;
    if (type === 0) {
      var W = [['want', 'wants', '〜したい'], ['hope', 'hopes', '〜することを望む'], ['plan', 'plans', '〜するつもりだ'], ['need', 'needs', '〜する必要がある']][(seed >> 2) % 4];
      var w = s.p === '3' ? W[1] : W[0];
      q = Q(2, s.t + ' ' + w + ' (   ) ' + v.obj + '.', ['to ' + v.base, v.ing, v.base, 'to ' + v.s], '「' + W[2] + '」は ' + W[0] + ' ＋ to ＋ 動詞の原形(名詞的用法:「〜すること」)。\n💡 ' + W[0] + ' の後ろは to不定詞と決まっています。', { say: s.t + ' ' + w + ' to ' + v.base + ' ' + v.obj + '.' });
      q.why[v.ing] = W[0] + ' の後ろに ing形(動名詞)は使えません。'; q.why[v.base] = '動詞を2つ続けるときは to が必要です。'; q.why['to ' + v.s] = 'to の後ろは必ず原形です。';
    } else if (type === 1) {
      var P = [['library', 'study'], ['park', 'play soccer'], ['store', 'buy some milk'], ['station', 'meet a friend'], ['museum', 'see old pictures'], ['gym', 'practice basketball']][(seed >> 2) % 6];
      q = Q(2, s.t + ' went to the ' + P[0] + ' (   ) ' + P[1] + '.', ['to', 'for', 'by', 'with'], '「〜するために」は to ＋ 動詞の原形(副詞的用法)。\n→ ' + P[1] + ' するために ' + P[0] + ' へ行った。', { say: s.t + ' went to the ' + P[0] + ' to ' + P[1] + '.' });
      q.why.for = 'for の後ろは名詞。動詞(' + P[1].split(' ')[0] + ')を続けることはできません。'; q.why.by = 'by は「〜によって・〜のそばに」。'; q.why.with = 'with は「〜といっしょに」。';
    } else {
      var A = [['homework', 'do'], ['books', 'read'], ['water', 'drink'], ['things', 'do'], ['places', 'visit'], ['friends', 'help me']][(seed >> 2) % 6];
      var verb = A[1].split(' ')[0];
      q = Q(3, s.t + ' ' + have(s) + ' a lot of ' + A[0] + ' (   ).', ['to ' + A[1], verb + 'ing' + A[1].slice(verb.length), A[1], verb === 'do' ? 'did' : verb + 's' + A[1].slice(verb.length)].map(function (z) { return z.replace('doing', 'doing').replace('reading', 'reading'); }),
        '「〜するための・〜するべき」と名詞を後ろから説明するのは to ＋ 動詞の原形(形容詞的用法)。\n→ ' + A[0] + ' to ' + A[1] + '(' + A[1] + ' するための ' + A[0] + ')');
      q.choices.slice(1).forEach(function (c) { q.why[c] = '名詞(' + A[0] + ')を後ろから説明するときは to不定詞を使います。'; });
    }
    return q;
  };

  /* ---------- 動名詞 ---------- */
  G.e_ger = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 3, q;
    if (type === 0) {
      var E = [['enjoy', 'enjoys', '楽しむ'], ['finish', 'finishes', '終える'], ['stop', 'stops', 'やめる'], ['practice', 'practices', '練習する']][(seed >> 2) % 4];
      var e = s.p === '3' ? E[1] : E[0];
      q = Q(2, s.t + ' ' + e + ' (   ) ' + v.obj + '.', [v.ing, 'to ' + v.base, v.base, v.past], E[0] + '(' + E[2] + ')の後ろは ing形(動名詞)。\n💡 enjoy・finish・stop・practice・give up の後ろは ing形と覚えよう。', { say: s.t + ' ' + e + ' ' + v.ing + ' ' + v.obj + '.' });
      q.why['to ' + v.base] = E[0] + ' の後ろに to不定詞は使えません。'; q.why[v.base] = '動詞を2つ続けるには ing形か to が必要です。'; q.why[v.past] = '過去形は続けられません。';
    } else if (type === 1) {
      var Pp = [['is good at', '〜が得意だ'], ['is interested in', '〜に興味がある'], ['is fond of', '〜が好きだ']][(seed >> 2) % 3];
      var b = Pp[0].replace('is', be(s));
      q = Q(2, s.t + ' ' + b + ' (   ) ' + v.obj + '.', [v.ing, 'to ' + v.base, v.base, v.s], '前置詞(at・in・of など)の後ろに動詞を置くときは ing形。\n→ ' + b + ' ' + v.ing + '(' + Pp[1] + ')', { say: s.t + ' ' + b + ' ' + v.ing + ' ' + v.obj + '.' });
      q.choices.slice(1).forEach(function (c) { q.why[c] = '前置詞の後ろは名詞か ing形です。'; });
    } else {
      var en = s.p === '3' ? 'enjoys' : 'enjoy';
      q = Q(3, s.t + ' (   ) ' + v.ing + ' ' + v.obj + '.', [en, s.p === '3' ? 'wants' : 'want', s.p === '3' ? 'hopes' : 'hope', s.p === '3' ? 'decides' : 'decide'], '後ろが ing形なので、ing形をとる動詞 enjoy を選びます。\n💡 want・hope・decide の後ろは to不定詞。', { say: s.t + ' ' + en + ' ' + v.ing + ' ' + v.obj + '.' });
      q.choices.slice(1).forEach(function (c) { q.why[c] = c + ' の後ろは to不定詞(to ＋ 原形)です。'; });
    }
    return q;
  };

  /* ---------- 比較 ---------- */
  var ADJ = [
    ['tall', 'taller', 'tallest', '背が高い', 'Ken', 'Taro', 'in his class'], ['big', 'bigger', 'biggest', '大きい', 'This box', 'that one', 'of the three'],
    ['old', 'older', 'oldest', '年上だ', 'My father', 'my mother', 'in my family'], ['young', 'younger', 'youngest', '若い', 'Yumi', 'her sister', 'in her family'],
    ['long', 'longer', 'longest', '長い', 'This river', 'that one', 'in Japan'], ['high', 'higher', 'highest', '高い', 'Mt. Fuji', 'Mt. Takao', 'in Japan'],
    ['easy', 'easier', 'easiest', '簡単だ', 'This question', 'that one', 'of all'], ['hot', 'hotter', 'hottest', '暑い', 'Today', 'yesterday', 'this year'],
    ['good', 'better', 'best', 'よい', 'This plan', 'that one', 'of the five'], ['interesting', 'more interesting', 'most interesting', 'おもしろい', 'This book', 'that one', 'of the three'],
    ['popular', 'more popular', 'most popular', '人気がある', 'Soccer', 'baseball', 'in my class'], ['beautiful', 'more beautiful', 'most beautiful', '美しい', 'This flower', 'that one', 'in the garden'],
    ['difficult', 'more difficult', 'most difficult', '難しい', 'Math', 'English', 'of all subjects'], ['important', 'more important', 'most important', '大切だ', 'Health', 'money', 'of all'],
    ['famous', 'more famous', 'most famous', '有名だ', 'This temple', 'that one', 'in Kyoto'], ['fast', 'faster', 'fastest', '速い', 'This train', 'that one', 'in Japan']
  ];
  G.e_m5 = function (r, seed) {
    var a = ADJ[seed % ADJ.length], type = Math.floor(seed / ADJ.length) % 4, longW = /^more /.test(a[1]);
    var wrongEr = longW ? a[0] + 'er' : 'more ' + a[0];
    var bes = /^(Math|Health|Soccer|English|Today)/.test(a[4]) ? 'is' : 'is';
    var q;
    var rule = '\n【ルール】2つを比べる → 比較級＋than ／ 3つ以上で一番 → the＋最上級 ／ as〜as の間 → もとの形' + (longW ? '\n💡 ' + a[0] + ' のような長い語は more・most をつけます。' : (a[0] === 'good' ? '\n💡 good は better・best と不規則に変化します。' : ''));
    if (type === 0) {
      q = Q(2, a[4] + ' ' + bes + ' (   ) than ' + a[5] + '.', [a[1], a[0], a[2], wrongEr], 'than(〜よりも)があるので比較級。\n→ ' + a[1] + rule, { say: a[4] + ' is ' + a[1] + ' than ' + a[5] + '.' });
      q.why[a[0]] = 'than があるときは比較級にします。'; q.why[a[2]] = '最上級は「一番〜」のとき。'; q.why[wrongEr] = longW ? a[0] + ' に er はつけません(長い語は more)。' : a[0] + ' は er をつける語です(more はつけない)。';
    } else if (type === 1) {
      var sup = 'the ' + a[2];
      q = Q(2, a[4] + ' ' + bes + ' (   ) ' + a[6] + '.', [sup, a[1], 'the ' + a[0], 'the ' + wrongEr.replace('more', 'most')], '「' + a[6] + '」の中で一番なので最上級。\n→ ' + sup + rule, { say: a[4] + ' is ' + sup + ' ' + a[6] + '.' });
      q.why[a[1]] = '比較級は2つを比べるとき(than とセット)。'; q.why['the ' + a[0]] = '最上級の形にします。';
    } else if (type === 2) {
      q = Q(2, a[4] + ' ' + bes + ' as (   ) as ' + a[5] + '.', [a[0], a[1], a[2], 'the ' + a[0]], 'as 〜 as(…と同じくらい〜)の間は、もとの形(原級)。\n→ as ' + a[0] + ' as' + rule, { say: a[4] + ' is as ' + a[0] + ' as ' + a[5] + '.' });
      q.why[a[1]] = 'as 〜 as の間に比較級は入りません。'; q.why[a[2]] = 'as 〜 as の間に最上級は入りません。';
    } else {
      q = Q(3, a[4] + ' ' + bes + ' not as ' + a[0] + ' as ' + a[5] + '.\n→ この文と同じ意味は?', [a[5].charAt(0).toUpperCase() + a[5].slice(1) + ' is ' + a[1] + ' than ' + a[4].toLowerCase().replace(/^(ken|taro|yumi|mt\.)/i, function (m) { return m.charAt(0).toUpperCase() + m.slice(1); }) + '.', a[4] + ' is ' + a[1] + ' than ' + a[5] + '.', a[4] + ' is ' + a[2] + '.', a[4] + ' is as ' + a[0] + ' as ' + a[5] + '.'],
        'not as 〜 as … は「…ほど〜ではない」。\nつまり「' + a[5] + ' の方が ' + a[3] + '」ということ。');
      q.why[q.choices[1]] = '逆の意味になっています。'; q.why[q.choices[3]] = 'not がなくなって「同じくらい」の意味になっています。';
    }
    return q;
  };

  /* ---------- 接続詞 ---------- */
  G.e_conj = function (r, seed) {
    var s = SUBJ[seed % 12], p = pron(s), t = Math.floor(seed / 12) % 7;
    var T = [
      ['because', s.t + " didn't go out (   ) it was raining.", ['if', 'but', 'that'], '「〜なので(理由)」'],
      ['if', s.t + ' will stay home (   ) it rains tomorrow.', ['because', 'but', 'that'], '「もし〜なら(条件)」'],
      ['when', s.t + ' ' + bePast(s) + ' watching TV (   ) the phone rang.', ['because', 'if', 'that'], '「〜するとき」'],
      ['but', s.t + ' ' + bePast(s) + ' very tired, (   ) ' + p + ' finished the work.', ['because', 'if', 'that'], '「しかし(逆接)」'],
      ['so', 'It was raining, (   ) ' + p + ' stayed home.', ['because', 'if', 'though'], '「だから(結果)」'],
      ['that', s.t + ' ' + (s.p === '3' ? 'thinks' : 'think') + ' (   ) this book is interesting.', ['because', 'if', 'but'], '「〜ということ」(think の内容)'],
      ['though', s.t + ' went to school (   ) ' + p + ' had a cold.', ['because', 'if', 'so'], '「〜だけれども」']
    ][t];
    var mean = { because: '〜なので(理由)', if: 'もし〜なら(条件)', when: '〜するとき', but: 'しかし', so: 'だから', that: '〜ということ', though: '〜だけれども' };
    var q = Q(2, T[1], [T[0]].concat(T[2]), '前と後ろの関係を考えます。ここは' + T[3] + 'の関係なので「' + T[0] + '」。', { say: T[1].replace('(   )', T[0]) });
    T[2].forEach(function (c) { q.why[c] = c + ' は「' + mean[c] + '」の意味。文の意味が通りません。'; });
    return q;
  };

  /* ---------- 受動態 ---------- */
  G.e_m6 = function (r, seed) {
    var O = [['This letter', 's', 6, 'Ken'], ['These pictures', 'p', 9, 'my father'], ['English', 's', 8, null], ['The room', 's', 13, 'my brother'], ['This cake', 's', 7, 'my mother'],
      ['The song', 's', 16, 'many people'], ['Those books', 'p', 6, 'young people'], ['The computer', 's', 12, 'the students'], ['Math', 's', 17, 'Mr. Tanaka'], ['The window', 's', 13, 'Tom'], ['These letters', 'p', 5, 'Yumi'], ['The dinner', 's', 19, 'my father']];
    var o = O[seed % O.length], v = VERBS[o[2]], past = Math.floor(seed / O.length) % 2 === 1;
    var bv = past ? (o[1] === 'p' ? 'were' : 'was') : (o[1] === 'p' ? 'are' : 'is');
    var tail = (o[3] ? ' by ' + o[3] : (o[0] === 'English' ? ' in many countries' : '')) + (past ? ' yesterday' : (o[0] === 'English' ? '' : ' every day'));
    if (o[0] === 'English' && past) tail = ' in this school in the past';
    var c = bv + ' ' + v.pp;
    var q = Q(2, o[0] + ' (   )' + tail + '.', [c, bv + ' ' + v.base, v.past, bv + ' ' + v.ing],
      '主語(' + o[0] + ')は「〜される」側なので受け身 ＝ be動詞 ＋ 過去分詞。\n' + (past ? '過去の文なので be動詞は ' + bv + '。' : '現在の文なので be動詞は ' + bv + '。') + '\n→ ' + v.base + ' の過去分詞は「' + v.pp + '」' + (v.pp !== v.base + 'ed' ? '(不規則: ' + v.base + '−' + v.past + '−' + v.pp + ')' : ''), { say: o[0] + ' ' + c + tail + '.' });
    q.why[bv + ' ' + v.base] = 'be動詞の後ろに原形は置けません。過去分詞にします。';
    q.why[v.past] = 'これだと「' + o[0] + 'が〜した」になり、意味が通りません。';
    q.why[bv + ' ' + v.ing] = 'これは進行形(〜している)。「〜される」なら過去分詞です。';
    return q;
  };

  /* ---------- 現在完了 ---------- */
  G.e_m7 = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 4, h = have(s), q;
    if (type === 0) {
      var H = h.charAt(0).toUpperCase() + h.slice(1);
      q = Q(2, H + ' ' + low(s) + ' ever (   ) ' + v.obj + '?', [v.pp, v.past !== v.pp ? v.past : v.base, v.ing, v.s],
        '「今までに〜したことがある?(経験)」は Have/Has ＋ 主語 ＋ ever ＋ 過去分詞?\n→ ' + v.base + ' の過去分詞は「' + v.pp + '」', { say: H + ' ' + low(s) + ' ever ' + v.pp + ' ' + v.obj + '?' });
      q.choices.slice(1).forEach(function (c) { q.why[c] = 'have・has の後ろは過去分詞です。'; });
    } else if (type === 1) {
      q = Q(2, s.t + ' ' + h + ' just (   ) ' + v.obj + '.', [v.pp, v.base, v.ing, 'to ' + v.base],
        '「ちょうど〜したところだ(完了)」は have/has ＋ just ＋ 過去分詞。\n→ ' + v.pp, { say: s.t + ' ' + h + ' just ' + v.pp + ' ' + v.obj + '.' });
      q.choices.slice(1).forEach(function (c) { q.why[c] = 'have・has の後ろは過去分詞です。'; });
    } else if (type === 2) {
      q = Q(2, s.t + ' (   ) lived in Tokyo since 2020.', [h, h === 'has' ? 'have' : 'has', bePast(s), 'did'],
        'since(〜以来)があるので「ずっと〜している(継続)」の現在完了。\n' + pdesc(s) + 'なので「' + h + '」。');
      q.why[h === 'has' ? 'have' : 'has'] = '主語に合っていません。'; q.why[bePast(s)] = 'be動詞の後ろに lived は置けません。'; q.why.did = 'did ＋ 過去形 という形はありません。';
    } else {
      var D = [['ten years', 'for'], ['2015', 'since'], ['three months', 'for'], ['last year', 'since'], ['a long time', 'for'], ['I was a child', 'since']][(seed >> 3) % 6];
      q = Q(2, s.t + ' ' + h + ' lived here (   ) ' + D[0] + '.', [D[1], D[1] === 'for' ? 'since' : 'for', 'from', 'at'],
        'for ＋ 期間の長さ(10年間など) ／ since ＋ 始まった時点(2015年から など)\n「' + D[0] + '」は' + (D[1] === 'for' ? '期間の長さ' : '始まった時点') + 'なので「' + D[1] + '」。');
      q.why[D[1] === 'for' ? 'since' : 'for'] = D[1] === 'for' ? 'since は「始まった時点」のときに使います。' : 'for は「期間の長さ」のときに使います。';
      q.why.from = '現在完了の継続では from ではなく since を使います。'; q.why.at = 'at は時刻などに使います。';
    }
    return q;
  };

  /* ---------- 現在完了進行形 ---------- */
  G.e_pperfprog = function (r, seed) {
    var x = pickSV(r, seed), s = x.s, v = x.v, type = x.k % 2, h = have(s), q;
    var d = ['for two hours', 'since this morning', 'for three hours', 'since nine'][(seed >> 3) % 4];
    if (type === 0) {
      q = Q(2, s.t + ' ' + h + ' been (   ) ' + v.obj + ' ' + d + '.', [v.ing, v.pp, v.base, 'to ' + v.base], '「(今まで)ずっと〜し続けている」は have/has been ＋ ing形(現在完了進行形)。\n→ ' + v.ing + ingRule(v), { say: s.t + ' ' + h + ' been ' + v.ing + ' ' + v.obj + ' ' + d + '.' });
      q.why[v.pp] = 'been ＋ 過去分詞 は受け身になります。'; q.why[v.base] = 'been の後ろに原形は置けません。'; q.why['to ' + v.base] = 'been to は「〜へ行ったことがある」の意味です。';
    } else {
      q = Q(2, s.t + ' (   ) been ' + v.ing + ' ' + v.obj + ' ' + d + '.', [h, h === 'has' ? 'have' : 'has', bePast(s), be(s)], pdesc(s) + 'なので「' + h + ' been 〜ing」。');
      q.why[h === 'has' ? 'have' : 'has'] = '主語に合っていません。'; q.why[bePast(s)] = 'was/were been という形はありません。'; q.why[be(s)] = 'is/are been という形はありません。';
    }
    return q;
  };

  /* ---------- 関係代名詞 ---------- */
  G.e_m8 = function (r, seed) {
    var P = ['a friend', 'a boy', 'a teacher', 'the girl', 'the man'], T = ['a book', 'the bag', 'a car', 'the pictures', 'a watch'];
    var type = seed % 5, rr = rng(seed * 13 + 1), q;
    if (type === 0) { var p = pk(rr, P), pr = pk(rr, ['lives in Canada', 'plays the piano well', 'can speak French', 'is from Australia']);
      q = Q(2, 'I have ' + p + ' (   ) ' + pr + '.', ['who', 'which', 'whose', 'what'], '先行詞「' + p + '」は人。後ろに主語がない(→ ' + pr + ')ので主格の「who」。', { say: 'I have ' + p + ' who ' + pr + '.' }); }
    else if (type === 1) { var t = pk(rr, T), tr = pk(rr, ['was made in Japan', 'has a red cover', 'is on the desk', 'is very old']);
      q = Q(2, 'This is ' + t + ' (   ) ' + tr + '.', ['which', 'who', 'whose', 'where'], '先行詞「' + t + '」は物。後ろに主語がないので「which」。', { say: 'This is ' + t + ' which ' + tr + '.' }); }
    else if (type === 2) { var t2 = pk(rr, T), tr2 = pk(rr, ['I bought yesterday', 'my father gave me', 'I saw in the shop', 'Ken wants']);
      q = Q(2, 'This is ' + t2 + ' (   ) ' + tr2 + '.', ['which', 'who', 'whose', 'what'], '先行詞「' + t2 + '」は物。後ろの文は目的語が欠けている(' + tr2 + ' 〜を)ので目的格の「which」。', { say: 'This is ' + t2 + ' which ' + tr2 + '.' }); }
    else if (type === 3) { var p2 = pk(rr, P), pr2 = pk(rr, ['I met in Kyoto', 'we saw at the station', 'everyone likes', 'I want to see']);
      q = Q(2, 'She is ' + p2.replace(/^a /, 'the ') + ' (   ) ' + pr2 + '.', ['who', 'which', 'whose', 'where'], '先行詞は人。後ろの文は目的語が欠けている(' + pr2 + ' 〜を)ので「who」(whom も可)。', { say: 'She is ' + p2.replace(/^a /, 'the ') + ' who ' + pr2 + '.' }); }
    else { var p3 = pk(rr, P), pr3 = pk(rr, ['father is a doctor', 'sister is a singer', 'bag is red', 'name is Mike']);
      q = Q(3, 'I know ' + p3 + ' (   ) ' + pr3 + '.', ['whose', 'who', 'which', 'what'], '「その人の〜」と持ち主を表すので「whose」。\n→ ' + p3 + ' whose ' + pr3, { say: 'I know ' + p3 + ' whose ' + pr3 + '.' }); }
    var mean = { who: 'who は先行詞が「人」のとき。', which: 'which は先行詞が「物・動物」のとき。', whose: 'whose は「その〜の」と持ち主を表すとき。', what: 'what は先行詞を含む(〜すること・もの)ので、前に名詞があるときは使えません。', where: 'where は場所を表し、後ろが完全な文のとき。' };
    q.choices.slice(1).forEach(function (c) { q.why[c] = mean[c]; });
    q.exp += '\n💡 that も人・物の両方に使えます。';
    return q;
  };

  /* ---------- 分詞の形容詞的用法 ---------- */
  G.e_partm = function (r, seed) {
    var I = [['boy', 'run', 'running', 'in the park', 1], ['girl', 'play', 'playing', 'the piano', 1], ['dog', 'sleep', 'sleeping', 'under the tree', 1], ['man', 'talk', 'talking', 'with Ken', 1],
      ['bird', 'fly', 'flying', 'in the sky', 1], ['students', 'study', 'studying', 'in the library', 1], ['car', 'make', 'made', 'in Japan', 0], ['book', 'write', 'written', 'by Soseki', 0],
      ['pictures', 'take', 'taken', 'by my father', 0], ['language', 'speak', 'spoken', 'in Brazil', 0], ['window', 'break', 'broken', 'by Tom', 0], ['cake', 'make', 'made', 'by my mother', 0],
      ['letter', 'write', 'written', 'in English', 0], ['song', 'sing', 'sung', 'by many people', 0]];
    var F = ['Look at the', 'I know the', 'Do you know the', 'This is the'];
    var it = I[seed % I.length], f = F[Math.floor(seed / I.length) % 4];
    var other = it[4] ? it[1] + (it[1] === 'run' ? '' : 'ed').replace('ed', it[1] === 'fly' ? '' : 'ed') : it[1] + 'ing';
    var wrongOther = it[4] ? ({ run: 'ran', play: 'played', sleep: 'slept', talk: 'talked', fly: 'flown', study: 'studied' }[it[1]]) : ({ make: 'making', write: 'writing', take: 'taking', speak: 'speaking', break: 'breaking', sing: 'singing' }[it[1]]);
    var q = Q(2, f + ' ' + it[0] + ' (   ) ' + it[3] + '.', [it[2], wrongOther, it[1], 'to ' + it[1]],
      it[4] ? '「' + it[0] + '」は自分で「' + it[1] + 'している」側(能動)なので ing形。\n→ the ' + it[0] + ' ' + it[2] + ' ' + it[3] : '「' + it[0] + '」は「' + it[1] + 'される」側(受け身)なので過去分詞。\n→ the ' + it[0] + ' ' + it[2] + ' ' + it[3],
      { say: f + ' ' + it[0] + ' ' + it[2] + ' ' + it[3] + '.' });
    q.why[wrongOther] = it[4] ? 'これだと「〜される」の意味になります。' + it[0] + ' は自分でしている側です。' : 'これだと「〜している」の意味になります。' + it[0] + ' はされる側です。';
    q.why[it[1]] = '名詞の後ろから説明するときは、ing形か過去分詞にします。';
    q.why['to ' + it[1]] = 'to不定詞だと「〜するための」の意味になります。';
    q.exp += '\n💡 見分け方:名詞が「する側」→ ing形 ／「される側」→ 過去分詞';
    return q;
  };

  /* ---------- 間接疑問文 ---------- */
  G.e_indq = function (r, seed) {
    var S3 = [['he', 'he', 1], ['she', 'she', 1], ['they', 'they', 0], ['Ken', 'Ken', 1], ['your sister', 'your sister', 1], ['the students', 'the students', 0]];
    var W = [['where', 'live', 'lives', 'どこに住んでいるか'], ['what', 'want', 'wants', '何が欲しいか'], ['when', 'come', 'comes', 'いつ来るか'], ['what time', 'get up', 'gets up', '何時に起きるか'], ['why', 'study English', 'studies English', 'なぜ英語を勉強しているか'], ['how', 'go to school', 'goes to school', 'どうやって学校に行くか']];
    var s = S3[seed % 6], w = W[Math.floor(seed / 6) % 6], fr = ['Do you know', 'I don\'t know', 'Please tell me', 'I want to know'][Math.floor(seed / 36) % 4];
    var vf = s[2] ? w[2] : w[1], aux = s[2] ? 'does' : 'do';
    var correct = w[0] + ' ' + s[1] + ' ' + vf;
    var q = Q(3, fr + ' (   )' + (fr === 'Do you know' ? '?' : '.'), [correct, w[0] + ' ' + aux + ' ' + s[1] + ' ' + w[1], w[0] + ' ' + s[1] + ' ' + aux + ' ' + w[1], s[1] + ' ' + vf + ' ' + w[0]],
      '文の中に疑問文を入れる(間接疑問)ときは、「疑問詞 ＋ 主語 ＋ 動詞」のふつうの語順。\n→ ' + correct + '(' + w[3] + ')\n💡 do・does は使わず、動詞の形(' + vf + ')で時制と主語を表します。', { say: fr + ' ' + correct + (fr === 'Do you know' ? '?' : '.') });
    q.why[q.choices[1]] = '疑問文の語順のままです。文の中では「疑問詞＋主語＋動詞」にします。'; q.why[q.choices[2]] = 'do・does は入れません。'; q.why[q.choices[3]] = '疑問詞は先頭に置きます。';
    return q;
  };

  /* ---------- 文型 ---------- */
  var BUNKEI = [['Birds fly.', 'SV'], ['He runs fast.', 'SV'], ['The sun rises in the east.', 'SV'], ['My father works in Tokyo.', 'SV'], ['The baby cried.', 'SV'],
    ['She is a doctor.', 'SVC'], ['He became a teacher.', 'SVC'], ['You look tired.', 'SVC'], ['It got dark.', 'SVC'], ['This soup tastes good.', 'SVC'], ['She seems happy.', 'SVC'],
    ['I like music.', 'SVO'], ['He bought a new bike.', 'SVO'], ['We played soccer.', 'SVO'], ['She opened the door.', 'SVO'], ['I know his name.', 'SVO'],
    ['He gave me a book.', 'SVOO'], ['My mother made me a cake.', 'SVOO'], ['She told us a story.', 'SVOO'], ['I will show you my picture.', 'SVOO'], ['He bought his sister a bag.', 'SVOO'],
    ['We call him Ken.', 'SVOC'], ['The news made her happy.', 'SVOC'], ['He keeps his room clean.', 'SVOC'], ['They named the dog Pochi.', 'SVOC'], ['I found the book easy.', 'SVOC']];
  var BK = { SV: '第1文型 SV(主語＋動詞)', SVC: '第2文型 SVC(S＝Cの関係)', SVO: '第3文型 SVO(〜を)', SVOO: '第4文型 SVOO(人に物を)', SVOC: '第5文型 SVOC(O＝Cの関係)' };
  G.e_h1 = function (r, seed) {
    if (seed % 2 === 0) {
      var it = BUNKEI[Math.floor(seed / 2) % BUNKEI.length];
      var q = Q(2, '次の文の文型は?\n' + it[0], [BK[it[1]]].concat(shuffle(r, Object.keys(BK).filter(function (k) { return k !== it[1]; })).slice(0, 3).map(function (k) { return BK[k]; })),
        '「' + it[0] + '」は' + BK[it[1]] + '。\n【見分け方】\n・be/become/look などの後ろが主語の説明 → SVC\n・動詞の後ろに「人」と「物」→ SVOO\n・O＝C(彼＝ケン、彼女＝幸せ)→ SVOC', { say: it[0] });
      return q;
    }
    var k = Math.floor(seed / 2);
    var V2 = [['made', 'The news made'], ['keeps', 'This blanket keeps'], ['found', 'I found'], ['left', 'She left']][k % 4];
    var O2 = ['me', 'her', 'them', 'us'][Math.floor(k / 4) % 4];
    var A = [['happy', 'happily', 'happiness'], ['sad', 'sadly', 'sadness'], ['angry', 'angrily', 'anger'], ['warm', 'warmly', 'warmth'], ['kind', 'kindly', 'kindness'], ['busy', 'busily', 'business']][Math.floor(k / 16) % 6];
    var q2 = Q(3, V2[1] + ' ' + O2 + ' (   ).', [A[0], A[1], A[2], 'to ' + A[0]], '動詞 ＋ O ＋ C(第5文型)。C には「O がどんな状態か」を表す形容詞が入ります(' + O2 + ' ＝ ' + A[0] + ')。', { say: V2[1] + ' ' + O2 + ' ' + A[0] + '.' });
    q2.why[A[1]] = '副詞(〜に)は C になれません。'; q2.why[A[2]] = '名詞だと「O＝C」の関係が成り立ちません。'; q2.why['to ' + A[0]] = 'to の後ろに形容詞は置けません。';
    return q2;
  };

  /* ---------- 過去完了 ---------- */
  G.e_pastperf = function (r, seed) {
    var E = [['arrived at the station', 'the train', 'had already left', 'has already left', 'already leaves', 'will leave'], ['got to the theater', 'the movie', 'had already started', 'has already started', 'already starts', 'will start'],
      ['came home', 'my sister', 'had already eaten dinner', 'has already eaten dinner', 'already eats dinner', 'will eat dinner'], ['called her', 'she', 'had already gone to bed', 'has already gone to bed', 'already goes to bed', 'will go to bed'],
      ['reached the store', 'it', 'had already closed', 'has already closed', 'already closes', 'will close'], ['woke up', 'my father', 'had already gone to work', 'has already gone to work', 'already goes to work', 'will go to work']];
    var s = SUBJ[seed % 12], e = E[Math.floor(seed / 12) % 6];
    var q = Q(3, 'When ' + low(s) + ' ' + e[0] + ', ' + e[1] + ' (   ).', [e[2], e[3], e[4], e[5]],
      '「' + low(s) + ' が ' + e[0] + '(過去)」よりも前に終わっていたことなので、過去完了 ＝ had ＋ 過去分詞。\n📏 時間の流れ:[' + e[2].replace('had already ', '') + '] → [' + e[0] + '] → 今', { say: 'When ' + low(s) + ' ' + e[0] + ', ' + e[1] + ' ' + e[2] + '.' });
    q.why[e[3]] = '現在完了は「今」とつながる表現。基準が過去(when 〜)なので過去完了にします。'; q.why[e[4]] = '現在形では過去の話になりません。'; q.why[e[5]] = '未来の話ではありません。';
    return q;
  };

  /* ---------- 未来完了 ---------- */
  G.e_futperf = function (r, seed) {
    var s = SUBJ[seed % 12], A = [['live', 'lived', 'here'], ['study', 'studied', 'English'], ['work', 'worked', 'at this company'], ['teach', 'taught', 'math'], ['know', 'known', 'him']][Math.floor(seed / 12) % 5];
    var d = ['five years', 'ten years', 'three years'][Math.floor(seed / 60) % 3], c = 'will have ' + A[1];
    var q = Q(3, 'By next April, ' + low(s) + ' (   ) ' + A[2] + ' for ' + d + '.', [c, have(s) + ' ' + A[1], 'will ' + A[0], A[1]],
      '「来年の4月までに(未来のある時点まで)ずっと〜していることになる」は未来完了 ＝ will have ＋ 過去分詞。\n💡 主語が何でも will have(has にはならない)。', { say: 'By next April, ' + low(s) + ' ' + c + ' ' + A[2] + ' for ' + d + '.' });
    q.why[have(s) + ' ' + A[1]] = '現在完了は「今まで」。基準が未来(by next April)なので will have にします。'; q.why['will ' + A[0]] = '「〜まで続いている」という完了の意味が出ません。'; q.why[A[1]] = '過去形では未来の話になりません。';
    return q;
  };

  /* ---------- 時・条件の副詞節 ---------- */
  G.e_tense = function (r, seed) {
    var s = SUBJ[seed % 12], type = Math.floor(seed / 12) % 4, q, w = ['rain', 'rains', 'will rain', 'rained'], sn = ['snow', 'snows', 'will snow', 'snowed'];
    var W2 = Math.floor(seed / 48) % 2 ? sn : w;
    if (type === 0) {
      q = Q(3, 'If it (   ) tomorrow, ' + low(s) + ' will stay home.', [W2[1], W2[2], W2[3], W2[0]], '「もし〜なら(条件)」を表す if の中は、未来のことでも現在形。\n→ it ' + W2[1] + '(3人称単数なので s)');
      q.why[W2[2]] = 'ひっかけ!条件を表す if の中では will を使いません。'; q.why[W2[3]] = '過去形ではありません。'; q.why[W2[0]] = '主語 it は3人称単数なので s が必要です。';
    } else if (type === 1) {
      q = Q(3, 'When ' + low(s) + ' (   ) home, I will tell ' + (pron(s) === 'I' ? 'you' : { he: 'him', she: 'her', they: 'them', we: 'you', you: 'you' }[pron(s)]) + ' the news.', [s.p === '3' ? 'comes' : 'come', 'will come', 'came', s.p === '3' ? 'come' : 'comes'],
        '「〜するとき(時)」を表す when の中も、未来のことは現在形で表します。');
      q.why['will come'] = '時を表す when の中では will を使いません。'; q.why.came = '過去形ではありません。';
    } else if (type === 2) {
      q = Q(3, 'I don\'t know if it (   ) tomorrow.', [W2[2], W2[1], W2[3], W2[0]], 'この if は「〜かどうか」(know の目的語=名詞のかたまり)。\n名詞のかたまりの中では、未来のことは will を使います。\n💡 if が「もし〜なら」か「〜かどうか」かを見分けよう。');
      q.why[W2[1]] = '「〜かどうか」の if は名詞節なので、未来は will で表します。';
    } else {
      q = Q(3, low(s).charAt(0).toUpperCase() + low(s).slice(1) + ' will call you as soon as ' + pron(s).replace(/^i$/, 'I') + ' (   ) at the station.', [s.p === '3' ? 'arrives' : (pron(s) === 'I' ? 'arrive' : 'arrive'), 'will arrive', 'arrived', 'arriving'],
        'as soon as(〜するとすぐに)も時を表す接続詞。中は現在形。');
      q.why['will arrive'] = '時を表す接続詞の中では will を使いません。';
    }
    return q;
  };

  /* ---------- 仮定法 ---------- */
  G.e_h2 = function (r, seed) {
    var s = SUBJ[seed % 12], p = pron(s), type = Math.floor(seed / 12) % 5, q;
    var cap = function (x) { return x.charAt(0).toUpperCase() + x.slice(1); };
    if (type === 0) {
      q = Q(2, 'If ' + low(s) + ' (   ) rich, ' + p + ' would buy a big house.', ['were', be(s), 'will be', 'had been'], '「今、お金持ちではないけれど、もしそうなら」= 今の事実と反対の想像(仮定法過去)。\nif の中は過去形、be動詞は主語に関係なく were が基本。\n💡「1つ過去にずらすと、現実ではない話になる」と覚えよう。');
      q.why[be(s)] = '現在形だと「本当にそうかもしれない」話になります。'; q.why['will be'] = 'if の中に will は使いません。'; q.why['had been'] = '過去の事実と反対(仮定法過去完了)の形です。';
    } else if (type === 1) {
      q = Q(2, 'If ' + low(s) + ' had more time, ' + p + ' (   ) travel abroad.', ['would', 'will', 'can', 'did'], '仮定法過去の文の後半は「助動詞の過去形(would・could など) ＋ 原形」。\n→ would travel(〜するだろうに)');
      q.why.will = '仮定法では will ではなく would にします。'; q.why.can = 'can ではなく could にします。'; q.why.did = 'did ＋ 原形 は使えません。';
    } else if (type === 2) {
      q = Q(3, 'If ' + low(s) + ' had studied harder, ' + p + ' (   ) the exam.', ['would have passed', 'would pass', 'will pass', 'had passed'], '「あのとき勉強していたら(実際はしなかった)」= 過去の事実と反対の想像(仮定法過去完了)。\n形:If ＋ had ＋ 過去分詞, ＋ would have ＋ 過去分詞');
      q.why['would pass'] = 'これは今の話(仮定法過去)の形です。'; q.why['will pass'] = '仮定法では will を使いません。'; q.why['had passed'] = '後半は would have ＋ 過去分詞です。';
    } else if (type === 3) {
      q = Q(2, 'I wish ' + low(s) + ' (   ) here now.', ['were', be(s), 'will be', 'have been'], 'I wish ＋ 仮定法過去 で「(今)〜だったらいいのに」。\nbe動詞は were が基本。');
      q.why[be(s)] = 'I wish の後ろは仮定法なので、過去形(were)にします。'; q.why['will be'] = '仮定法では will を使いません。';
    } else {
      var N = ['your help', 'this map', 'his advice', 'water', 'the internet', 'your support'][Math.floor(seed / 60) % 6];
      q = Q(3, '(   ) ' + N + ', ' + p + ' would have failed.', ['Without', 'Unless', 'If', 'Because'], 'Without ＋ 名詞 で「〜がなかったら」(= If it had not been for 〜)。\n後ろが名詞(' + N + ')なので前置詞の Without。');
      q.why.Unless = 'Unless(〜しない限り)の後ろには文(主語＋動詞)がきます。'; q.why.If = 'If の後ろにも文がきます。'; q.why.Because = '意味が通りません。';
    }
    return q;
  };

  /* ---------- 分詞構文 ---------- */
  G.e_h3 = function (r, seed) {
    var ACT = [['Hearing', 'Heard', 'hear', 'the news', 'began to cry'], ['Walking', 'Walked', 'walk', 'along the street', 'met an old friend'], ['Seeing', 'Seen', 'see', 'the police officer', 'ran away'],
      ['Feeling', 'Felt', 'feel', 'tired', 'went to bed early'], ['Opening', 'Opened', 'open', 'the box', 'found a watch'], ['Listening', 'Listened', 'listen', 'to music', 'did the homework']];
    var PAS = [['Seen', 'Seeing', 'see', 'from the sky', 'the island looks like a heart'], ['Written', 'Writing', 'write', 'in easy English', 'this book is good for beginners'], ['Born', 'Bearing', 'bear', 'in Osaka', 'he loves takoyaki'],
      ['Surrounded', 'Surrounding', 'surround', 'by mountains', 'the village is very quiet'], ['Built', 'Building', 'build', '100 years ago', 'the house is still strong'], ['Compared', 'Comparing', 'compare', 'with last year', 'it is warm this year']];
    var PERF = [['Having finished', 'Finishing', 'finish', 'my homework', 'went out to play'], ['Having lived', 'Living', 'live', 'in London for five years', 'can speak English well'], ['Having read', 'Reading', 'read', 'the book before', 'knew the story']];
    var type = seed % 3, k = Math.floor(seed / 3), q;
    if (type === 0) {
      var a = ACT[k % ACT.length], s = SUBJ[Math.floor(k / ACT.length) % 12];
      q = Q(3, '(   ) ' + a[3] + ', ' + low(s) + ' ' + a[4] + '.', [a[0], a[1], a[2].charAt(0).toUpperCase() + a[2].slice(1), 'To ' + a[2]], '主語(' + low(s) + ')は自分で「' + a[2] + 'する」側(能動)なので ing形で始めます。\n→ ' + a[0] + ' 〜 =「〜して・〜しながら」');
      q.why[a[1]] = '過去分詞だと「〜される」の意味になります。';
    } else if (type === 1) {
      var b = PAS[k % PAS.length];
      q = Q(3, '(   ) ' + b[3] + ', ' + b[4] + '.', [b[0], b[1], b[2].charAt(0).toUpperCase() + b[2].slice(1), 'To ' + b[2]], '主語(' + b[4].split(' ').slice(0, 2).join(' ') + ')は「' + b[2] + 'される」側(受け身)なので過去分詞で始めます。\n💡 Being が省略された形です。');
      q.why[b[1]] = 'ing形だと「自分で〜する」の意味になります。';
    } else {
      var c = PERF[k % PERF.length], s2 = SUBJ[Math.floor(k / PERF.length) % 12];
      q = Q(3, '(   ) ' + c[3] + ', ' + low(s2) + ' ' + c[4] + '.', [c[0], c[1], c[2].charAt(0).toUpperCase() + c[2].slice(1), 'To ' + c[2]], '後半の文よりも「前に」終わったことは Having ＋ 過去分詞(完了形の分詞構文)。');
      q.why[c[1]] = '同時のことになり、「前に終わった」が表せません。';
    }
    q.choices.slice(2).forEach(function (x) { q.why[x] = '分詞構文は ing形か過去分詞で始めます。'; });
    return q;
  };

  /* ---------- 関係副詞・what ---------- */
  G.e_h4 = function (r, seed) {
    var type = seed % 5, rr = rng(seed * 31 + 5), q;
    if (type === 0) { var pl = pk(rr, ['the house', 'the town', 'the park', 'the hotel', 'the city']), cl = pk(rr, ['I was born', 'we first met', 'we stayed last summer', 'my father works']);
      q = Q(2, 'This is ' + pl + ' (   ) ' + cl + '.', ['where', 'which', 'when', 'what'], '先行詞が場所で、後ろが完全な文(' + cl + ')なので関係副詞「where」。'); q.why.which = 'which なら後ろの文に欠けている部分(主語か目的語)が必要です。'; }
    else if (type === 1) { var tm = pk(rr, ['the day', 'the year', 'the time']), cl2 = pk(rr, ['I first met her', 'we moved here', 'the earthquake happened']);
      q = Q(2, 'I remember ' + tm + ' (   ) ' + cl2 + '.', ['when', 'where', 'which', 'why'], '先行詞が時で、後ろが完全な文なので関係副詞「when」。'); q.why.which = '後ろの文に欠けている部分がないので which は使えません。'; }
    else if (type === 2) { var cl3 = pk(rr, ['he was late', 'she left the club', 'they got angry', 'he didn\'t come']);
      q = Q(2, 'Tell me the reason (   ) ' + cl3 + '.', ['why', 'where', 'which', 'when'], 'the reason(理由)の後ろは関係副詞「why」。'); }
    else if (type === 3) { var pl2 = pk(rr, ['the town', 'the museum', 'the city', 'the castle']), cl4 = pk(rr, ['I visited last year', 'we saw on TV', 'many people visit']);
      q = Q(3, 'This is ' + pl2 + ' (   ) ' + cl4 + '.', ['which', 'where', 'when', 'what'], 'ひっかけ!先行詞は場所だけど、後ろの文は目的語が欠けている(' + cl4 + ' 〜を)ので関係代名詞「which」。\n💡 完全な文 → where ／ 欠けている文 → which'); q.why.where = 'where の後ろは完全な文。visit(〜を訪れる)の「〜を」が欠けているので使えません。'; }
    else { var w = pk(rr, [['(   ) he said was true.', '彼が言ったこと'], ['(   ) I want is a new bike.', '私が欲しいもの'], ['This is (   ) I wanted to say.', '私が言いたかったこと'], ['I can\'t believe (   ) I saw.', '私が見たもの']]);
      q = Q(2, w[0], ['What', 'That', 'Which', 'Where'].map(function (x) { return /^\(/.test(w[0]) ? x : x.toLowerCase(); }), '「' + w[1] + '」は先行詞を含む関係代名詞「what」(＝the thing which)。'); }
    q.choices.forEach(function (c) { if (!q.why[c] && c !== q.choices[0]) q.why[c] = '文の形(先行詞と後ろの文の欠け方)に合いません。'; });
    return q;
  };

  /* ---------- 単語・熟語 ---------- */
  G.e_vocab_m = fact('en_m', { en: true, preferPic: true, q1: function (it) { return '「' + it.m + '」を選んでください'; } });
  G.e_h5 = fact('en_h', { en: true, q1: function (it) { return '「' + it.m + '」を表す英単語は?'; } });
  G.e_idiom = fact('en_idiom', { en: true, q1: function (it) { return '「' + it.m + '」を表す熟語は?'; } });
  G.e_h6 = fact('en_marker', { en: true, q0: function (it) { return '長文で「' + it.t + '」が出てきた。どんな合図?'; }, q1: function (it) { return '「' + it.m + '」の合図になる語句は?'; }, note: '💡 つなぎ言葉に印をつけて読むと、筆者の主張がどこにあるかがわかります。' });

  /* ================= 国語 ================= */
  G.j_kanji = fact('kanji', { noTF: true, q0: function (it) { return '「' + it.t + '」の読み方は?'; }, q1: function (it) { return '「' + it.m + '」を漢字で書くと?'; } });
  G.j_m1 = fact('goi', { q0: function (it) { return '「' + it.t + '」の意味は?'; }, q1: function (it) { return '次の意味をもつ言葉は?\n「' + it.m + '」'; } });
  G.j_m2 = fact('hinshi', { noTF: true, q0: function (it) { return '「' + it.t + '」の品詞は?'; }, q1: function (it) { return '品詞が「' + it.m + '」のものは?'; }, note: '【品詞の見分け方】言い切りの形が ウ段→動詞 ／ 〜い→形容詞 ／ 〜だ→形容動詞' });
  G.j_h5 = fact('setsuzoku', { noTF: true, q0: function (it) { return 'つなぎ言葉「' + it.t + '」の働きは?'; }, q1: function (it) { return '「' + it.m + '」の働きをするつなぎ言葉は?'; } });
  G.j_hyoron = fact('hyoron', { q0: function (it) { return '評論でよく出る言葉「' + it.t + '」の意味は?'; }, q1: function (it) { return '「' + it.m + '」を表す言葉は?'; } });
  G.j_h1 = fact('kana', { noTF: true, q0: function (it) { return '「' + it.t + '」を現代仮名遣いで読むと?'; }, q1: function (it) { return '「' + it.m + '」を歴史的仮名遣いで書いたものは?'; } });
  G.j_kogo = fact('kogo', { q0: function (it) { return '古語「' + it.t + '」の意味は?'; }, q1: function (it) { return '「' + it.m + '」という意味の古語は?'; } });
  G.j_keigo = function (r, seed) {
    var B = WPS.BANK.keigo, it = B[seed % B.length], type = Math.floor(seed / B.length) % 4, others = uniqBy(uniqBy(shuffle(r, B.filter(function (x) { return x !== it && x.s !== it.s && x.k !== it.k; })), 's'), 'k'), q;
    var table = '\n【覚えよう】' + it.v + ' → 尊敬語「' + it.s + '」/ 謙譲語「' + it.k + '」\n💡 尊敬語は「相手(目上)の動作」、謙譲語は「自分の動作」をへりくだる。';
    if (type === 0 || (type === 3 && /ない/.test(it.k))) {
      q = Q(1, '「' + it.v + '」の尊敬語は?', [it.s].concat(others.slice(0, 3).map(function (x) { return x.s; })), '「' + it.v + '」の尊敬語は「' + it.s + '」。' + table);
    } else if (type === 1 && !/ない/.test(it.k)) {
      q = Q(1, '「' + it.v + '」の謙譲語は?', [it.k].concat(others.filter(function (x) { return !/ない/.test(x.k); }).slice(0, 3).map(function (x) { return x.k; })), '「' + it.v + '」の謙譲語は「' + it.k + '」。' + table);
    } else if (type === 2 || /ない/.test(it.k)) {
      var w = it.s.split('・')[0];
      q = Q(2, '「' + w + '」は何という敬語?', ['尊敬語', '謙譲語', '丁寧語', '敬語ではない'], '「' + w + '」は「' + it.v + '」の尊敬語。' + table);
    } else {
      var who = Math.floor(seed / (B.length * 4)) % 2;
      if (who) q = Q(3, '「先生が私の作品を(' + it.v + ')。」を正しい敬語にすると?', [it.s.split('・')[0], it.k.split('・')[0], it.v + 'ます', it.v], '動作をするのは「先生」(目上)なので尊敬語。' + table);
      else q = Q(3, '「私が先生に(' + it.v + ')。」を正しい敬語にすると?', [it.k.split('・')[0], it.s.split('・')[0], it.v + 'ます', it.v], '動作をするのは「私」なので、へりくだる謙譲語。' + table);
      q.why[q.choices[1]] = who ? '謙譲語は自分の動作に使います。' : '尊敬語は相手(目上)の動作に使います。自分には使いません。';
    }
    return q;
  };
  G.j_h2 = function (r, seed) {
    var B = WPS.BANK.jodoushi, it = B[seed % B.length], type = Math.floor(seed / B.length) % 3, others = shuffle(r, B.filter(function (x) { return x.m !== it.m && x.c !== it.c || x.t !== it.t; })), q;
    var memo = '\n【' + it.t + '】意味:' + it.m + ' ／ 接続:' + it.c;
    if (type === 0) {
      var ds = uniqBy(others.filter(function (x) { return x.m !== it.m; }), 'm').slice(0, 3);
      q = Q(1, '助動詞「' + it.t + '」の意味は?', [it.m].concat(ds.map(function (x) { return x.m; })), '助動詞は「意味・接続・活用」の3点セットで覚えます。' + memo);
      ds.forEach(function (d) { q.why[d.m] = 'これは「' + d.t + '」の意味です。'; });
    } else if (type === 1) {
      var cs = shuffle(r, ['未然形', '連用形', '終止形(ラ変は連体形)', '体言・連体形', '連体形・助詞「が」「の」', 'サ変の未然形・四段の已然形', '体言'].filter(function (c) { return c !== it.c; })).slice(0, 3);
      q = Q(2, '助動詞「' + it.t + '」は何形に接続する?', [it.c].concat(cs), '「' + it.t + '」の直前は' + it.c + '。' + memo + '\n💡 接続がわかると、同じ形の助動詞(「ぬ」など)を見分けられます。');
    } else {
      var ds2 = uniqBy(others.filter(function (x) { return x.m !== it.m; }), 'm').slice(0, 3);
      q = Q(2, '「' + it.m + '」の意味をもつ助動詞は?', [it.t].concat(ds2.map(function (x) { return x.t; })), memo);
      ds2.forEach(function (d) { q.why[d.t] = '「' + d.t + '」の意味は' + d.m + 'です。'; });
    }
    return q;
  };
  G.j_h3 = function (r, seed) {
    var B = WPS.BANK.kokeigo, it = B[seed % B.length], type = Math.floor(seed / B.length) % 3, others = uniqBy(shuffle(r, B.filter(function (x) { return x !== it && x.m !== it.m; })), 'm'), q;
    var memo = '\n【' + it.t + '】' + it.k + '・' + it.m + '\n💡 尊敬語＝動作をする人への敬意 ／ 謙譲語＝動作を受ける人への敬意 ／ 丁寧語＝聞き手・読み手への敬意';
    if (type === 0) q = Q(1, '古文の「' + it.t + '」は何という敬語?', [it.k].concat(['尊敬語', '謙譲語', '丁寧語', '敬語ではない'].filter(function (x) { return x !== it.k; })).slice(0, 4), memo);
    else if (type === 1) { var ds = others.slice(0, 3); q = Q(1, '古文の「' + it.t + '」の意味は?', [it.m].concat(ds.map(function (x) { return x.m; })), memo); ds.forEach(function (d) { q.why[d.m] = 'これは「' + d.t + '」の意味です。'; }); }
    else { var ds2 = others.filter(function (x) { return x.m !== it.m; }).slice(0, 3); q = Q(2, '「' + it.m + '」にあたる敬語は?', [it.t].concat(ds2.map(function (x) { return x.t; })), memo); ds2.forEach(function (d) { q.why[d.t] = '「' + d.t + '」は' + d.m + '(' + d.k + ')。'; }); }
    return q;
  };
  G.j_katsuyo = function (r, seed) {
    var B = WPS.BANK.katsuyo, it = B[seed % B.length], type = Math.floor(seed / B.length) % 2, q;
    var tips = '\n【見分け方】「ず」をつけて、直前が a段→四段 ／ i段→上二段(上一段は覚える:ひいきにみゐる) ／ e段→下二段\n💡 カ変「来」・サ変「す・おはす」・ナ変「死ぬ・往ぬ」・ラ変「あり・をり・侍り・いまそかり」は覚える。';
    if (type === 0) {
      q = Q(2, '古文の動詞「' + it.t + '」の活用の種類は?', [it.k].concat(shuffle(r, ['四段活用', '上一段活用', '上二段活用', '下二段活用', 'カ行変格活用', 'サ行変格活用', 'ナ行変格活用', 'ラ行変格活用', '下一段活用'].filter(function (k) { return k !== it.k; })).slice(0, 3)),
        '「' + it.t + '」に「ず」をつけると「' + it.n + 'ず」。→ ' + it.k + tips);
    } else {
      var ds = shuffle(r, B.filter(function (x) { return x.n !== it.n; })).slice(0, 3);
      q = Q(2, '「' + it.t + '」に打消の「ず」をつけた形は?', [it.n + 'ず'].concat(ds.map(function (x) { return it.t.slice(0, 1) + x.n.slice(-1) + 'ず'; })).filter(function (x, i, a) { return a.indexOf(x) === i; }),
        '「ず」は未然形に接続。「' + it.t + '」(' + it.k + ')の未然形は「' + it.n + '」。' + tips);
    }
    return q;
  };
  G.j_h4 = function (r, seed) {
    var B = WPS.BANK.kuho, it = B[seed % B.length], type = Math.floor(seed / B.length) % 3, others = shuffle(r, B.filter(function (x) { return x.m !== it.m; })), q;
    var memo = '\n【' + it.f + '】読み:' + it.r + ' ／ 意味:' + it.m + '(' + it.k + ')';
    if (type === 0) { var ds = others.slice(0, 3); q = Q(1, '句法「' + it.f + '」の意味は?', [it.m].concat(ds.map(function (x) { return x.m; })), memo); ds.forEach(function (d) { q.why[d.m] = 'これは「' + d.f + '」(' + d.k + ')の意味です。'; }); }
    else if (type === 1) { var ds1 = others.filter(function (x) { return x.r !== it.r; }).slice(0, 3); q = Q(2, '「' + it.f + '」の書き下し(読み方)は?', [it.r].concat(ds1.map(function (x) { return x.r; })), memo + (it.k === '再読文字' ? '\n💡 再読文字は1字を2回読みます(1回目は副詞、2回目は助動詞)。' : '')); }
    else { var ds2 = others.slice(0, 3); q = Q(2, '「' + it.m + '」を表す句法は?', [it.f].concat(ds2.map(function (x) { return x.f; })), memo); }
    return q;
  };
  G.j_kanword = function (r, seed) {
    var B = WPS.BANK.kanword, it = B[seed % B.length], type = Math.floor(seed / B.length) % 2, others = shuffle(r, B.filter(function (x) { return x !== it; })), q;
    var memo = '\n【' + it.t + '】読み:' + it.r + ' ／ 意味:' + it.m;
    if (type === 0) q = Q(1, '漢文の「' + it.t + '」の読みは?', [it.r].concat(others.filter(function (x) { return x.r !== it.r; }).slice(0, 3).map(function (x) { return x.r; })), memo);
    else q = Q(1, '漢文の「' + it.t + '」の意味は?', [it.m].concat(others.filter(function (x) { return x.m !== it.m; }).slice(0, 3).map(function (x) { return x.m; })), memo);
    return q;
  };

  /* ================= 理科 ================= */
  function ohm(r) {
    var R = pk(r, [2, 4, 5, 10, 20, 30]), I = pk(r, [0.5, 1, 1.5, 2, 3]), V = R * I, t = ri(r, 0, 3);
    if (t === 0) return Q(1, R + 'Ωの抵抗に ' + I + 'A の電流が流れているとき、電圧は?', choices(num(V) + 'V', [num(R / I) + 'V', num(R + I) + 'V', num(V * 2) + 'V']), '【オームの法則】電圧(V)＝抵抗(R)×電流(I)\n→ ' + R + '×' + I + '＝' + num(V) + 'V\n💡「V＝R×I」は、たて書きの「V / R I」の図で覚えると便利。', { fig: { type: 'ohm', hl: 'V' } });
    if (t === 1) return Q(2, R + 'Ωの抵抗に ' + num(V) + 'V の電圧をかけたとき、流れる電流は?', choices(num(I) + 'A', [num(V * R) + 'A', num(R / V) + 'A', num(I * 2) + 'A']), '【オームの法則】電流＝電圧÷抵抗\n→ ' + num(V) + '÷' + R + '＝' + num(I) + 'A', { fig: { type: 'ohm', hl: 'I' } });
    if (t === 2) { var a = pk(r, [5, 10, 20]), b = pk(r, [10, 20, 30]); return Q(2, a + 'Ωと' + b + 'Ωの抵抗を直列につなぐと、全体の抵抗は?', choices((a + b) + 'Ω', [num(a * b / (a + b)) + 'Ω', Math.abs(a - b) + 'Ω', (a * b) + 'Ω']), '直列つなぎは、抵抗をそのままたし算。\n→ ' + a + '＋' + b + '＝' + (a + b) + 'Ω'); }
    var w = pk(r, [100, 600, 1200, 800]), h = pk(r, [1, 2, 3]);
    return Q(2, w + 'W の電気器具を ' + h + '時間使ったときの電力量は?', choices((w * h) + 'Wh', [(w / h) + 'Wh', (w + h) + 'Wh', (w * h * 60) + 'Wh']), '電力量(Wh)＝電力(W)×時間(h)\n→ ' + w + '×' + h + '＝' + (w * h) + 'Wh');
  }
  function pressure(r) {
    var F = pk(r, [10, 20, 30, 40, 60, 100]), S = pk(r, [0.1, 0.2, 0.5, 2, 4]), t = ri(r, 0, 2);
    if (t === 0) return Q(2, F + 'N の力が ' + S + 'm² の面に垂直にはたらくときの圧力は?', choices(num(F / S) + 'Pa', [num(F * S) + 'Pa', num(S / F) + 'Pa', num(F + S) + 'Pa']), '圧力(Pa)＝力(N)÷面積(m²)\n→ ' + F + '÷' + S + '＝' + num(F / S) + 'Pa\n💡 同じ力でも、面積が小さいほど圧力は大きい(くつより、ハイヒールの方が沈む)。');
    if (t === 1) { var k = pk(r, [2, 4, 5]), f = pk(r, [1, 2, 3, 6]); return Q(2, '1N で ' + k + 'cm のびるばねに ' + f + 'N の力を加えると、何cm のびる?', choices((k * f) + 'cm', [(k + f) + 'cm', num(f / k) + 'cm', (k * f * 2) + 'cm']), '【フックの法則】ばねののびは力に比例。\n→ ' + k + '×' + f + '＝' + (k * f) + 'cm'); }
    var air = pk(r, [2, 3, 5, 8]), water = air - pk(r, [1, 0.5, 1.5]);
    return Q(3, '空気中で ' + air + 'N、水中で ' + num(water) + 'N の物体にはたらく浮力は?', choices(num(air - water) + 'N', [num(air + water) + 'N', num(water) + 'N', num(air) + 'N']), '浮力＝空気中の重さ − 水中の重さ\n→ ' + air + '−' + num(water) + '＝' + num(air - water) + 'N');
  }
  function sound(r) {
    var t = pk(r, [2, 3, 4, 6]), type = ri(r, 0, 1);
    if (type === 0) return Q(2, '雷が光ってから ' + t + '秒後に音が聞こえた。雷までの距離は?(音の速さ 340m/s)', choices((340 * t) + 'm', [(340 * t / 2) + 'm', (340 + t) + 'm', (340 * t * 2) + 'm']), '光はほぼ一瞬で届くので、音が進んだ時間＝' + t + '秒。\n距離＝速さ×時間＝340×' + t + '＝' + (340 * t) + 'm');
    return Q(3, '山に向かって声を出したら ' + t + '秒後にこだまが返ってきた。山までの距離は?(音の速さ 340m/s)', choices((340 * t / 2) + 'm', [(340 * t) + 'm', (340 * t * 2) + 'm', (340 / t) + 'm']), 'こだまは「行って帰ってくる」ので、片道はその半分。\n→ 340×' + t + '÷2＝' + (340 * t / 2) + 'm');
  }
  function astro(r) {
    var type = ri(r, 0, 1);
    if (type === 0) { var h = pk(r, [2, 3, 4, 6]); return Q(2, '星は1時間に約何度動いて見える?また ' + h + '時間では?', choices('15度/' + (15 * h) + '度', ['30度/' + (30 * h) + '度', '1度/' + h + '度', '15度/' + (15 + h) + '度']), '地球は24時間で360度自転するので、1時間で 360÷24＝15度。\n→ ' + h + '時間で 15×' + h + '＝' + (15 * h) + '度'); }
    var m = pk(r, [1, 2, 3, 6]); return Q(2, '同じ時刻に見える星座は、' + m + 'か月で何度動いて見える?', choices((30 * m) + '度', [(15 * m) + '度', m + '度', (60 * m) + '度']), '地球は12か月で360度公転するので、1か月で30度。\n→ 30×' + m + '＝' + (30 * m) + '度');
  }
  G.s_m1 = mix([ohm, fact('denki')]);
  G.s_force = mix([pressure, fact('chikara')]);
  G.s_light = mix([sound, fact('hikari')]);
  G.s_m2 = mix([fact('kagakushiki', { noTF: true, q0: function (it) { return '「' + it.t + '」の化学式は?'; }, q1: function (it) { return '化学式「' + it.m + '」の物質は?'; } }), fact('kagaku_m')]);
  G.s_ion = fact('ion');
  G.s_m3 = fact('seibutsu_m');
  G.s_cell = fact('saibo');
  G.s_m4 = fact('daichi');
  G.s_space = mix([fact('tentai'), astro]);
  G.s_h2 = function (r) {
    var a = ri(r, 1, 5), t = ri(r, 2, 6), type = ri(r, 0, 3);
    if (type === 0) return Q(2, '静止状態から加速度 ' + a + 'm/s² で動き出した物体の、' + t + '秒後の速さは?', choices((a * t) + 'm/s', [(a + t) + 'm/s', (a * t * t) + 'm/s', (a * t / 2) + 'm/s']), '【等加速度運動】v＝v₀＋at(v₀＝0)\n→ ' + a + '×' + t + '＝' + (a * t) + 'm/s', { fig: { type: 'vt', a: a, t: t } });
    if (type === 1) { var a2 = a * 2; return Q(3, '静止状態から加速度 ' + a2 + 'm/s² で動き出した物体が、' + t + '秒間に進む距離は?', choices((a * t * t) + 'm', [(a2 * t) + 'm', (a2 * t * t) + 'm', (a * t * t / 2) + 'm']), 'x＝v₀t＋½at²(v₀＝0)\n→ ½×' + a2 + '×' + t + '²＝' + (a * t * t) + 'm\n💡 v-tグラフの三角形の面積が距離になります。', { fig: { type: 'vt', a: a2, t: t } }); }
    if (type === 2) { var tt = pk(r, [1, 2, 3]); return Q(2, '自由落下を始めて ' + tt + '秒後の速さは?(g＝9.8m/s²)', choices(num(9.8 * tt) + 'm/s', [num(4.9 * tt * tt) + 'm/s', num(9.8 * tt * tt) + 'm/s', num(9.8 + tt) + 'm/s']), '自由落下は初速0、加速度gの等加速度運動。v＝gt＝9.8×' + tt + '＝' + num(9.8 * tt) + 'm/s'); }
    var d = pk(r, [100, 120, 200, 300]), s = pk(r, [10, 20, 25, 40]); return Q(1, d + 'm を ' + s + '秒で進んだときの平均の速さは?', choices(num(d / s) + 'm/s', [num(d * s) + 'm/s', num(s / d) + 'm/s', num(d - s) + 'm/s']), '速さ＝距離÷時間 → ' + d + '÷' + s + '＝' + num(d / s) + 'm/s');
  };
  G.s_energy = function (r) {
    var type = ri(r, 0, 3), m = pk(r, [1, 2, 3, 4, 5]), v = pk(r, [2, 4, 6, 10]), h = pk(r, [2, 5, 10, 20]), F = pk(r, [10, 20, 50]), x = pk(r, [2, 3, 5]), t = pk(r, [2, 4, 5, 10]);
    if (type === 0) return Q(2, F + 'N の力で物体を力の向きに ' + x + 'm 動かしたときの仕事は?', choices((F * x) + 'J', [(F + x) + 'J', num(F / x) + 'J', (F * x * 2) + 'J']), '仕事(J)＝力(N)×力の向きに動いた距離(m)\n→ ' + F + '×' + x + '＝' + (F * x) + 'J');
    if (type === 1) return Q(2, (F * x) + 'J の仕事を ' + t + '秒で行ったときの仕事率は?', choices(num(F * x / t) + 'W', [num(F * x * t) + 'W', num(t / (F * x)) + 'W', num(F * x - t) + 'W']), '仕事率(W)＝仕事(J)÷時間(s)\n→ ' + (F * x) + '÷' + t + '＝' + num(F * x / t) + 'W');
    if (type === 2) return Q(3, '質量 ' + m + 'kg の物体が速さ ' + v + 'm/s で動いているときの運動エネルギーは?', choices(num(m * v * v / 2) + 'J', [num(m * v) + 'J', num(m * v * v) + 'J', num(m * v / 2) + 'J']), '運動エネルギー＝½mv²\n→ ½×' + m + '×' + v + '²＝' + num(m * v * v / 2) + 'J\n💡 速さが2倍になると、運動エネルギーは4倍。');
    return Q(3, '質量 ' + m + 'kg の物体が高さ ' + h + 'm にあるときの位置エネルギーは?(g＝9.8m/s²)', choices(num(m * 9.8 * h) + 'J', [num(m * h) + 'J', num(m * 9.8 * h / 2) + 'J', num(9.8 * h) + 'J']), '位置エネルギー＝mgh\n→ ' + m + '×9.8×' + h + '＝' + num(m * 9.8 * h) + 'J');
  };
  G.s_h1 = function (r) {
    var c = pk(r, [['H₂O', 18], ['CO₂', 44], ['O₂', 32], ['CH₄', 16], ['NaCl', 58.5], ['NH₃', 17], ['N₂', 28]]), n = pk(r, [0.5, 1, 2, 3, 0.25]), type = ri(r, 0, 2);
    var am = '(H＝1、C＝12、N＝14、O＝16、Na＝23、Cl＝35.5)';
    if (type === 0) return Q(2, c[0] + ' ' + num(c[1] * n) + 'g は何mol?' + am, choices(num(n) + 'mol', [num(n * 2) + 'mol', num(n / 2) + 'mol', num(c[1] * n) + 'mol']), '物質量(mol)＝質量(g)÷モル質量(g/mol)\n' + c[0] + ' のモル質量は ' + c[1] + 'g/mol(原子量の合計)。\n→ ' + num(c[1] * n) + '÷' + c[1] + '＝' + num(n) + 'mol');
    if (type === 1) return Q(2, c[0] + ' ' + num(n) + 'mol の質量は?' + am, choices(num(c[1] * n) + 'g', [num(c[1] / n) + 'g', num(c[1] + n) + 'g', num(n) + 'g']), '質量＝物質量×モル質量 → ' + num(n) + '×' + c[1] + '＝' + num(c[1] * n) + 'g');
    return Q(3, '気体 ' + num(n) + 'mol は、標準状態(0℃、1.013×10⁵Pa)で何L?', choices(num(22.4 * n) + 'L', [num(22.4 / n) + 'L', num(22.4 + n) + 'L', num(n) + 'L']), '標準状態の気体1molは22.4L。\n→ 22.4×' + num(n) + '＝' + num(22.4 * n) + 'L');
  };
  G.s_struct = mix([fact('genso', { noTF: true, q0: function (it) { return '元素「' + it.t + '」の元素記号は?'; }, q1: function (it) { return '元素記号「' + it.m + '」の元素は?'; } }), fact('busshitsu')]);
  G.s_acid = mix([function (r) {
    var type = ri(r, 0, 1);
    if (type === 0) { var n = ri(r, 1, 5); return Q(2, '水素イオン濃度 [H⁺]＝1.0×10⁻' + n + ' mol/L の水溶液の pH は?', choices(String(n), [String(14 - n), String(n + 1), String(-n)]), 'pH＝−log₁₀[H⁺]\n[H⁺]＝10⁻' + n + ' なら pH＝' + n + '。\n💡 pH が1小さくなると、[H⁺] は10倍になる。'); }
    var c1 = pk(r, [0.1, 0.2]), v1 = pk(r, [10, 20]), c2 = pk(r, [0.1, 0.2, 0.05]);
    var v2 = c1 * v1 / c2;
    return Q(3, c1 + 'mol/L の塩酸 ' + v1 + 'mL を中和するのに必要な ' + c2 + 'mol/L の水酸化ナトリウム水溶液は何mL?', choices(num(v2) + 'mL', [num(v1) + 'mL', num(v2 * 2) + 'mL', num(v2 / 2) + 'mL']), '中和の条件:酸の H⁺ の物質量＝塩基の OH⁻ の物質量\n(価数×濃度×体積が等しい)\n→ 1×' + c1 + '×' + v1 + '＝1×' + c2 + '×V より V＝' + num(v2) + 'mL');
  }, fact('sanenki')]);
  G.s_h3 = fact('seibutsu_h');
  G.s_eco = fact('seitaikei');
  G.s_geo = fact('chigaku_h');

  /* ================= 社会 ================= */
  function timezone(r) {
    var places = [['ロンドン', 0], ['ニューヨーク', -75], ['ロサンゼルス', -120], ['パリ', 15], ['シンガポール', 120], ['シドニー', 150]];
    var p = pk(r, places), diff = Math.abs(135 - p[1]) / 15;
    var dir = p[1] < 135 ? '日本の方が進んでいる' : '日本の方が遅れている';
    return Q(2, '日本(東経135度)と ' + p[0] + '(標準時の経線 ' + (p[1] < 0 ? '西経' + (-p[1]) : '東経' + p[1]) + '度)の時差は何時間?(サマータイムは考えない)', choices(diff + '時間', [(diff + 1) + '時間', (24 - diff) + '時間', (diff * 2) + '時間']),
      '経度15度で1時間の時差(360度÷24時間＝15度)。\n経度差:' + Math.abs(135 - p[1]) + '度 ÷ 15 ＝ ' + diff + '時間。\n東にある方が時刻が進んでいるので、' + dir + '。', { fig: { type: 'globe', a: 135, b: p[1], name: p[0] } });
  }
  G.c_m1 = mix([fact('wgeo', { q0: function (it) { return it.t + 'は?'; }, q1: function (it) { return '「' + it.m + '」にあてはまるのは?'; } }), timezone]);
  G.c_jgeo = fact('jgeo', { q0: function (it) { return it.t + 'は?'; }, q1: function (it) { return '「' + it.m + '」にあてはまるのは?'; } });
  G.c_ancient = history('jhistory', ['弥生', '飛鳥', '奈良', '平安']);
  G.c_medieval = history('jhistory', ['鎌倉', '室町']);
  G.c_early = history('jhistory', ['安土桃山', '江戸']);
  G.c_modern = history('jhistory', ['明治', '大正', '昭和'].slice(0, 2).concat(['昭和']));
  G.c_contemp = history('jhistory', ['昭和', '平成']);
  G.c_m2 = history('jhistory', null, { types: [2, 3] });
  G.c_h1 = history('jhistory', null);
  G.c_h2 = mix([history('whistory', null), fact('wperson', { q0: function (it) { return '「' + it.t + '」について正しい説明は?'; }, q1: function (it) { return '「' + it.m + '」人物は?'; } })]);
  G.c_m3 = fact('seiji');
  G.c_econ = mix([fact('keizai'), function (r) {
    var a = pk(r, [100, 110, 120, 130, 150]), b = pk(r, [80, 90, 100, 140, 160].filter(function (x) { return x !== a; })), price = pk(r, [10, 20, 50]);
    if (ri(r, 0, 1)) return Q(2, '1ドル＝' + a + '円が、1ドル＝' + b + '円になった。これは?', [b < a ? '円高' : '円安', b < a ? '円安' : '円高', 'インフレ', 'デフレ'], '1ドルと交換するのに必要な円が' + (b < a ? '少なくなった → 円の価値が上がった → 円高' : '多くなった → 円の価値が下がった → 円安') + '。\n💡 円高は輸入に有利、円安は輸出に有利。');
    return Q(3, '1ドル＝' + a + '円のとき、' + price + 'ドルの商品は何円?', choices((a * price) + '円', [(a + price) + '円', num(a / price) + '円', (a * price * 10) + '円']), price + 'ドル × ' + a + '円 ＝ ' + (a * price) + '円');
  }]);
  G.c_h3 = fact('kokyo');

  /* ================= 情報 ================= */
  G.i_h1 = function (r) {
    var n = ri(r, 5, 63), b = n.toString(2), type = ri(r, 0, 2);
    if (type === 0) return Q(1, '10進数の ' + n + ' を2進数で表すと?', choices(b, [(n + 1).toString(2), (n - 1).toString(2), b.split('').reverse().join('')]), n + ' を2でわり続け、余りを下から読むと ' + b + '。\n確かめ:' + b.split('').map(function (d, i) { return d + '×' + Math.pow(2, b.length - 1 - i); }).join('＋') + '＝' + n, { fig: { type: 'bits', b: b } });
    if (type === 1) return Q(2, '2進数の ' + b + ' を10進数で表すと?', numChoices(n, [n + 1, n - 1, parseInt(b.split('').reverse().join(''), 2)]), '右の桁から 1, 2, 4, 8, 16, 32 の重み。1 の桁の重みをたすと ' + n + '。', { fig: { type: 'bits', b: b } });
    var k = ri(r, 3, 10); return Q(2, k + 'ビットで表せる情報は何通り?', numChoices(Math.pow(2, k), [k * 2, k * k, Math.pow(2, k - 1)]), '1ビットで2通り。kビットなら 2をk回かけて 2^' + k + '＝' + Math.pow(2, k) + '通り。');
  };
  G.i_h2 = function (r) {
    var a = ri(r, 1, 9), b = ri(r, 1, 9), c = ri(r, 2, 4), lim = ri(r, 10, 30), x = (a + b) * c, y = x > lim ? x - 5 : x + 5;
    if (ri(r, 0, 1)) { var n = ri(r, 3, 6), s = 0; for (var i = 1; i <= n; i++) s += i; return Q(3, 's＝0 から始めて、i を 1 から ' + n + ' まで1ずつ増やしながら s＝s＋i をくり返した。最後の s は?', numChoices(s, [n, s + n, s - 1]), '1行ずつ追う(トレース):\n' + Array.from({ length: n }, function (_, k) { var acc = (k + 1) * (k + 2) / 2; return 'i＝' + (k + 1) + ' → s＝' + acc; }).join('\n')); }
    return Q(3, 'x＝' + a + ' → x＝x＋' + b + ' → x＝x×' + c + ' → もし x＞' + lim + ' なら x＝x−5、そうでなければ x＝x＋5。最後の x は?', numChoices(y, [x, x > lim ? x + 5 : x - 5, a + b * c]), '1行ずつ追うと:' + a + ' → ' + (a + b) + ' → ' + x + '\n' + x + (x > lim ? '＞' : '≦') + lim + ' なので → ' + y);
  };
  G.i_net = fact('joho');

  /* ================= 数学(中学) ================= */
  G.m_m1 = function (r) {
    var a = nz(r, -9, 9), b = nz(r, -9, 9), op = pk(r, ['＋', '−', '×', '÷']);
    if (op === '÷') { var c = a * b; return Q(1, sgn(c) + '÷' + sgn(b) + ' を計算すると?', numChoices(a, [-a, c * b, c + b]), '①符号:' + (c < 0 !== b < 0 ? 'マイナス÷プラス(またはその逆)→ マイナス' : '同じ符号どうし → プラス') + '\n②数:' + Math.abs(c) + '÷' + Math.abs(b) + '＝' + Math.abs(a) + '\n→ 答え ' + a); }
    var ans = op === '＋' ? a + b : op === '−' ? a - b : a * b;
    var steps = op === '×' ? '①符号:マイナスが' + ((a < 0) + (b < 0)) + '個 → ' + (((a < 0) + (b < 0)) % 2 ? 'マイナス' : 'プラス') + '\n②数:' + Math.abs(a) + '×' + Math.abs(b) + '＝' + Math.abs(ans) + '\n→ 答え ' + ans
      : (op === '−' ? '引き算は「符号を変えてたし算」にする:' + sgn(a) + '＋' + sgn(-b) + '\n' : '') + '数直線で、' + a + ' から ' + (op === '＋' ? b : -b) + ' 進むと ' + ans;
    return Q(1, sgn(a) + op + sgn(b) + ' を計算すると?', numChoices(ans, [-ans, op === '×' ? a + b : a * b, Math.abs(a) + Math.abs(b)]), steps, op === '×' ? {} : { fig: { type: 'numberline', a: a, d: op === '＋' ? b : -b } });
  };
  G.m_expr = function (r) {
    var a = nz(r, -6, 6), b = nz(r, -9, 9), c = nz(r, -6, 6), d = nz(r, -9, 9), k = nz(r, -4, 5), type = ri(r, 0, 2);
    if (type === 0) return Q(1, '(' + poly([[a, 'x'], [b, '']]) + ')＋(' + poly([[c, 'x'], [d, '']]) + ') を計算すると?', choices(poly([[a + c, 'x'], [b + d, '']]), [poly([[a + c, 'x'], [b - d, '']]), poly([[a - c, 'x'], [b + d, '']]), poly([[a * c, 'x'], [b * d, '']])]), '同じ文字の項どうし、数の項どうしをまとめる。\nx の項:' + a + '＋' + sgn(c) + '＝' + (a + c) + '\n数の項:' + b + '＋' + sgn(d) + '＝' + (b + d));
    if (type === 1) return Q(2, '(' + poly([[a, 'x'], [b, '']]) + ')−(' + poly([[c, 'x'], [d, '']]) + ') を計算すると?', choices(poly([[a - c, 'x'], [b - d, '']]), [poly([[a - c, 'x'], [b + d, '']]), poly([[a + c, 'x'], [b + d, '']]), poly([[a - c, 'x'], [d - b, '']])]), 'ひき算のかっこを外すときは、後ろのかっこの中の符号を全部変える!\n→ ' + poly([[a, 'x'], [b, '']]) + poly([[-c, 'x'], [-d, '']]).replace(/^(?!-)/, '＋') + '\n→ ' + poly([[a - c, 'x'], [b - d, '']]));
    return Q(2, k + '(' + poly([[a, 'x'], [b, '']]) + ') を展開すると?', choices(poly([[k * a, 'x'], [k * b, '']]), [poly([[k * a, 'x'], [b, '']]), poly([[k + a, 'x'], [k + b, '']]), poly([[k * a, 'x'], [-k * b, '']])]), '分配法則:かっこの中の「すべての項」に ' + k + ' をかける。\n' + k + '×' + sgn(a) + 'x＝' + (k * a) + 'x、' + k + '×' + sgn(b) + '＝' + (k * b));
  };
  G.m_m2 = function (r) {
    var x = ri(r, -6, 6), a = ri(r, 3, 8), c = ri(r, 1, a - 1), b = ri(r, -9, 9), d = (a - c) * x + b;
    return Q(2, poly([[a, 'x'], [b, '']]) + '＝' + poly([[c, 'x'], [d, '']]) + ' を解くと?', choices('x＝' + x, ['x＝' + (-x), 'x＝' + (x + 1), 'x＝' + (x - 1)]),
      '①x の項を左、数を右に移項(移項すると符号が変わる)\n　' + poly([[a, 'x'], [-c, 'x']]).replace(/x(?=[＋-])/, 'x') + '＝' + d + poly([[-b, '']]).replace(/^(?!-)/, '＋') + '\n②まとめる:' + (a - c) + 'x＝' + (d - b) + '\n③両辺を ' + (a - c) + ' でわる:x＝' + x + '\n💡 てんびんのイメージ:両側に同じことをしてもつり合ったまま。', { fig: { type: 'balance', l: poly([[a, 'x'], [b, '']]), r: poly([[c, 'x'], [d, '']]) } });
  };
  G.m_m3 = function (r) {
    var type = ri(r, 0, 1), a = nz(r, -5, 5), x0 = ri(r, 1, 5), x1; do { x1 = nz(r, -6, 6); } while (x1 === x0);
    if (type === 0) return Q(2, 'y は x に比例し、x＝' + x0 + ' のとき y＝' + (a * x0) + '。x＝' + x1 + ' のときの y は?', numChoices(a * x1, [-a * x1, a + x1, a * x0 + x1]), '①比例の式 y＝ax に代入:' + (a * x0) + '＝a×' + x0 + ' → a＝' + a + '\n②y＝' + a + 'x に x＝' + x1 + ' を代入 → y＝' + (a * x1), { fig: { type: 'line', m: a, b: 0 } });
    var k = pk(r, [6, 12, 18, 24, 36]), xs = [1, 2, 3, 4, 6].filter(function (v) { return k % v === 0; }), xa = pk(r, xs), xb = pk(r, xs.concat([-2, -3]).filter(function (v) { return v !== xa && k % v === 0; }));
    return Q(2, 'y は x に反比例し、x＝' + xa + ' のとき y＝' + (k / xa) + '。x＝' + xb + ' のときの y は?', numChoices(k / xb, [-k / xb, k * xb, xb]), '①反比例の式 y＝a/x。a＝x×y＝' + xa + '×' + (k / xa) + '＝' + k + '\n②y＝' + k + '/x に x＝' + xb + ' を代入 → y＝' + (k / xb));
  };
  G.m_m4 = function (r) {
    var x = ri(r, -5, 5), y = ri(r, -5, 5), a1 = ri(r, 1, 4), b1 = ri(r, 1, 4), a2 = ri(r, 1, 4), b2 = -ri(r, 1, 4);
    if (ri(r, 0, 2) === 0) {
      var p1 = pk(r, [[80, 'りんご'], [60, 'みかん'], [100, 'パン']]), p2 = pk(r, [[120, 'なし'], [150, 'ケーキ'], [200, 'ジュース']]), n = ri(r, 6, 12), k = ri(r, 1, n - 1);
      var tot = p1[0] * k + p2[0] * (n - k);
      return Q(3, '1個' + p1[0] + '円の' + p1[1] + 'と1個' + p2[0] + '円の' + p2[1] + 'を合わせて' + n + '個買い、代金は' + tot + '円。' + p1[1] + 'は何個?', choices(k + '個', [(n - k) + '個', (k + 1) + '個', (k - 1) + '個']),
        '①わからないものを文字に:' + p1[1] + 'を x 個、' + p2[1] + 'を y 個\n②個数の式:x＋y＝' + n + '\n③代金の式:' + p1[0] + 'x＋' + p2[0] + 'y＝' + tot + '\n④解くと x＝' + k + '、y＝' + (n - k) + '\n💡 表(単価・個数・代金)を書くと式が立てやすい。');
    }
    function s(xx, yy) { return 'x＝' + xx + ', y＝' + yy; }
    return Q(2, poly([[a1, 'x'], [b1, 'y']]) + '＝' + (a1 * x + b1 * y) + '、' + poly([[a2, 'x'], [b2, 'y']]) + '＝' + (a2 * x + b2 * y) + ' を解くと?', choices(s(x, y), [s(y, x), s(-x, y), s(x, -y)]), '加減法:どちらかの文字の係数をそろえて、2つの式をたす(ひく)と1つの文字が消える。\n→ x＝' + x + '、y＝' + y + '\n確かめ:もとの式に代入して両方成り立てばOK。');
  };
  G.m_m5 = function (r) {
    var m = nz(r, -4, 4), b = ri(r, -6, 6), x1 = ri(r, -3, 1), x2 = x1 + ri(r, 1, 4), y1 = m * x1 + b, y2 = m * x2 + b, type = ri(r, 0, 2);
    function f(mm, bb) { return 'y＝' + poly([[mm, 'x'], [bb, '']]); }
    if (type === 0) return Q(2, '2点(' + x1 + ', ' + y1 + ')、(' + x2 + ', ' + y2 + ')を通る直線の式は?', choices(f(m, b), [f(-m, b), f(m, -b), f(m, b + 1)]), '①傾き＝(yの増加量)÷(xの増加量)＝(' + y2 + '−' + sgn(y1) + ')÷(' + x2 + '−' + sgn(x1) + ')＝' + m + '\n②y＝' + m + 'x＋b に (' + x1 + ', ' + y1 + ') を代入して b＝' + b, { fig: { type: 'line', m: m, b: b, pts: [[x1, y1], [x2, y2]] } });
    if (type === 1) return Q(1, f(m, b) + ' の傾きと切片は?', choices('傾き' + m + '、切片' + b, ['傾き' + b + '、切片' + m, '傾き' + (-m) + '、切片' + b, '傾き' + m + '、切片' + (-b)]), 'y＝ax＋b の a が傾き(x が1増えると y がいくつ増えるか)、b が切片(y軸と交わる点)。', { fig: { type: 'line', m: m, b: b } });
    var m2 = m === 1 ? -1 : -m, X = ri(r, -3, 3), Y = m * X + b, b2 = Y - m2 * X;
    return Q(3, f(m, b) + ' と ' + f(m2, b2) + ' の交点の座標は?', choices('(' + X + ', ' + Y + ')', ['(' + Y + ', ' + X + ')', '(' + (-X) + ', ' + Y + ')', '(' + X + ', ' + (-Y) + ')']), '交点は「2つの式を両方満たす点」→ 連立方程式を解く。\n' + poly([[m, 'x'], [b, '']]) + '＝' + poly([[m2, 'x'], [b2, '']]) + ' → x＝' + X + '、y＝' + Y, { fig: { type: 'line', m: m, b: b, m2: m2, b2: b2, pts: [[X, Y]] } });
  };
  G.m_m6 = function (r) {
    var type = ri(r, 0, 2), n = ri(r, 5, 12);
    if (type === 0) return Q(2, n + '角形の内角の和は?', choices((180 * (n - 2)) + '°', [(180 * n) + '°', (180 * (n - 1)) + '°', '360°']), 'n角形は、1つの頂点から対角線をひくと (n−2) 個の三角形に分けられる。\n三角形1個は180°なので 180×(' + n + '−2)＝' + (180 * (n - 2)) + '°', { fig: { type: 'polygon', n: n } });
    var regs = [3, 4, 5, 6, 8, 9, 10, 12], m = pk(r, regs);
    if (type === 1) return Q(2, '正' + m + '角形の1つの内角は?', choices(num(180 * (m - 2) / m) + '°', [num(360 / m) + '°', num(180 * (m - 2)) + '°', num(180 - 360 / m + 10) + '°']), '①内角の和:180×(' + m + '−2)＝' + (180 * (m - 2)) + '°\n②正多角形はすべて等しいので ÷' + m + ' → ' + num(180 * (m - 2) / m) + '°', { fig: { type: 'polygon', n: m } });
    return Q(2, '正' + m + '角形の1つの外角は?', choices(num(360 / m) + '°', [num(180 * (m - 2) / m) + '°', num(180 / m) + '°', '360°']), '多角形の外角の和は、何角形でもいつも360°。\n→ 360÷' + m + '＝' + num(360 / m) + '°');
  };
  G.m_m7 = function (r) {
    var p = nz(r, -8, 8), q = nz(r, -8, 8);
    function f1(a, b) { return poly([[1, 'x²'], [a + b, 'x'], [a * b, '']]); }
    function fac(a, b) { return '(' + poly([[1, 'x'], [a, '']]) + ')(' + poly([[1, 'x'], [b, '']]) + ')'; }
    return Q(2, fac(p, q) + ' を展開すると?', choices(f1(p, q), [f1(-p, -q), poly([[1, 'x²'], [p * q, '']]), poly([[1, 'x²'], [p + q, 'x'], [-p * q, '']])]), '(x＋a)(x＋b)＝x²＋(a＋b)x＋ab\na＋b＝' + (p + q) + '、ab＝' + (p * q) + '\n💡 長方形の面積図で考えると、4つの部分(x²・ax・bx・ab)の合計になります。', { fig: { type: 'area', p: p, q: q } });
  };
  G.m_fact = function (r) {
    var p = nz(r, -8, 8), q = nz(r, -8, 8), type = ri(r, 0, 2);
    function fac(a, b) { return '(' + poly([[1, 'x'], [a, '']]) + ')(' + poly([[1, 'x'], [b, '']]) + ')'; }
    if (type === 0) return Q(2, poly([[1, 'x²'], [p + q, 'x'], [p * q, '']]) + ' を因数分解すると?', choices(fac(p, q), [fac(-p, -q), fac(p, -q), fac(-p, q)]), '「たして ' + (p + q) + '、かけて ' + (p * q) + '」になる2つの数を探す → ' + p + ' と ' + q + '\n→ ' + fac(p, q) + '\n💡 かけ算の組み合わせを先に書き出すと見つけやすい。');
    var a = ri(r, 1, 9);
    if (type === 1) return Q(2, 'x²−' + (a * a) + ' を因数分解すると?', choices('(x＋' + a + ')(x−' + a + ')', ['(x−' + a + ')²', '(x＋' + a + ')²', '(x−' + (a * a) + ')(x＋1)']), 'a²−b²＝(a＋b)(a−b)(和と差の積)\n' + (a * a) + '＝' + a + '² なので (x＋' + a + ')(x−' + a + ')');
    return Q(2, 'x²' + (p > 0 ? '＋' : '−') + (2 * Math.abs(p)) + 'x＋' + (p * p) + ' を因数分解すると?', choices('(' + poly([[1, 'x'], [p, '']]) + ')²', ['(' + poly([[1, 'x'], [-p, '']]) + ')²', '(' + poly([[1, 'x'], [p, '']]) + ')(' + poly([[1, 'x'], [-p, '']]) + ')', '(' + poly([[1, 'x'], [2 * p, '']]) + ')²']), 'x²＋2ax＋a²＝(x＋a)²\n真ん中 ' + (2 * p) + 'x の半分 ' + p + ' を2乗すると ' + (p * p) + ' になっている → (' + poly([[1, 'x'], [p, '']]) + ')²');
  };
  G.m_m8 = function (r) {
    var k = ri(r, 2, 6), m = pk(r, [2, 3, 5, 6, 7]), type = ri(r, 0, 2);
    if (type === 0) return Q(2, '√' + (k * k * m) + ' を簡単にすると?', choices(k + '√' + m, [m + '√' + k, (k * k) + '√' + m, (k + 1) + '√' + m]), '√ の中を「2乗の数×残り」に分ける:' + (k * k * m) + '＝' + k + '²×' + m + '\n2乗の数は √ の外に出せる → ' + k + '√' + m);
    if (type === 1) { var a = ri(r, 2, 5), b = ri(r, 1, 4); return Q(2, a + '√' + m + '＋' + b + '√' + m + ' を計算すると?', choices((a + b) + '√' + m, [(a + b) + '√' + (2 * m), (a * b) + '√' + m, (a + b) * m + '']), '√ の中が同じなら、文字式の x のようにまとめられる。\n' + a + '√' + m + '＋' + b + '√' + m + '＝(' + a + '＋' + b + ')√' + m); }
    return Q(2, '1/√' + m + ' の分母を有理化すると?', choices('√' + m + '/' + m, ['√' + m, m + '/√' + m, '1/' + m]), '分母と分子に同じ √' + m + ' をかける(分数の値は変わらない)。\n→ √' + m + '/(√' + m + '×√' + m + ')＝√' + m + '/' + m);
  };
  G.m_m9 = function (r) {
    var p = nz(r, -7, 7), q; do { q = nz(r, -7, 7); } while (q === p);
    function s(a, b) { return 'x＝' + Math.min(a, b) + ', ' + Math.max(a, b); }
    if (ri(r, 0, 3) === 0) { var c = pk(r, [2, 3, 5, 6, 7]); return Q(1, 'x²＝' + c + ' を解くと?', ['x＝±√' + c, 'x＝√' + c, 'x＝' + c + '/2', 'x＝±' + c], '2乗して ' + c + ' になる数は、プラスとマイナスの2つ。\n→ x＝±√' + c); }
    return Q(2, poly([[1, 'x²'], [-(p + q), 'x'], [p * q, '']]) + '＝0 を解くと?', choices(s(p, q), [s(-p, -q), s(p + 1, q + 1), s(p, -q)]), '①因数分解:(' + poly([[1, 'x'], [-p, '']]) + ')(' + poly([[1, 'x'], [-q, '']]) + ')＝0\n②「かけて0」なら、どちらかが0 → ' + s(p, q) + '\n💡 因数分解できないときは解の公式。', { fig: { type: 'parabola', a: 1, h: (p + q) / 2, k: -((p - q) * (p - q)) / 4, roots: [p, q] } });
  };
  G.m_m10 = function (r) {
    var a = nz(r, -3, 3), x1 = ri(r, -4, 2), x2 = x1 + ri(r, 1, 3), type = ri(r, 0, 1);
    if (type === 0) return Q(2, 'y＝' + poly([[a, 'x²']]) + ' で、x が ' + x1 + ' から ' + x2 + ' まで増えるときの変化の割合は?', numChoices(a * (x1 + x2), [-a * (x1 + x2), a * (x2 - x1), a * x2 * x2]), '変化の割合＝(yの増加量)÷(xの増加量)\ny は ' + (a * x1 * x1) + ' → ' + (a * x2 * x2) + '、x は ' + x1 + ' → ' + x2 + '\n(' + (a * x2 * x2) + '−' + sgn(a * x1 * x1) + ')÷' + (x2 - x1) + '＝' + (a * (x1 + x2)) + '\n💡 近道:a×(はじめのx＋終わりのx)', { fig: { type: 'parabola', a: a, h: 0, k: 0, pts: [[x1, a * x1 * x1], [x2, a * x2 * x2]] } });
    var aa = Math.abs(a), lo = -ri(r, 1, 3), hi = ri(r, 1, 4), ymax = aa * Math.max(lo * lo, hi * hi);
    return Q(3, 'y＝' + aa + 'x² で、x の変域が ' + lo + '≦x≦' + hi + ' のとき、y の変域は?', choices('0≦y≦' + ymax, [(aa * lo * lo) + '≦y≦' + (aa * hi * hi), (aa * Math.min(lo * lo, hi * hi)) + '≦y≦' + ymax, '0≦y≦' + (aa * hi * hi + 1)]), 'x の変域に 0 がふくまれるので、y の最小値は 0(グラフの谷底)!\n最大値は 0 から遠い方の端:x＝' + (Math.abs(lo) > hi ? lo : hi) + ' のとき y＝' + ymax, { fig: { type: 'parabola', a: aa, h: 0, k: 0, range: [lo, hi] } });
  };
  G.m_m11 = function (r) {
    var t = pk(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25]]), k = ri(r, 1, 3), a = t[0] * k, b = t[1] * k, c = t[2] * k;
    if (ri(r, 0, 1)) return Q(2, '直角をはさむ2辺が ' + a + ' と ' + b + ' の直角三角形。斜辺の長さは?', numChoices(c, [a + b, c + k, b + 1]), '【三平方の定理】a²＋b²＝c²(cは斜辺)\n' + a + '²＋' + b + '²＝' + (a * a) + '＋' + (b * b) + '＝' + (c * c) + '\n' + (c * c) + '＝' + c + '² なので 斜辺は ' + c, { fig: { type: 'righttri', a: a, b: b, c: c, ask: 'c' } });
    return Q(3, '斜辺が ' + c + '、1辺が ' + a + ' の直角三角形。残りの1辺の長さは?', numChoices(b, [c - a, b + k, a + 1]), c + '²−' + a + '²＝' + (c * c) + '−' + (a * a) + '＝' + (b * b) + '＝' + b + '²\n→ 残りの辺は ' + b, { fig: { type: 'righttri', a: a, b: b, c: c, ask: 'b' } });
  };
  G.m_sim = function (r) {
    var m = ri(r, 1, 4), n = m + ri(r, 1, 3), type = ri(r, 0, 2), base = ri(r, 2, 6);
    if (type === 0) return Q(2, '相似比が ' + m + ':' + n + ' の図形の面積比は?', [(m * m) + ':' + (n * n), m + ':' + n, (m * m * m) + ':' + (n * n * n), (2 * m) + ':' + (2 * n)], '面積は「たて×よこ」で長さを2回かけるので、相似比を2乗する。\n→ ' + m + '²:' + n + '²＝' + (m * m) + ':' + (n * n), { fig: { type: 'similar', m: m, n: n } });
    if (type === 1) return Q(2, '相似比が ' + m + ':' + n + ' の立体の体積比は?', [(m * m * m) + ':' + (n * n * n), (m * m) + ':' + (n * n), m + ':' + n, (3 * m) + ':' + (3 * n)], '体積は長さを3回かけるので、相似比を3乗する。\n→ ' + (m * m * m) + ':' + (n * n * n));
    return Q(2, '△ABC∽△DEF で、相似比が ' + m + ':' + n + '、BC＝' + (base * m) + ' のとき EF は?', numChoices(base * n, [base * m, base * n + 1, base * (n - m)]), '対応する辺の比はすべて ' + m + ':' + n + '。\n' + (base * m) + ':EF＝' + m + ':' + n + ' → EF＝' + (base * n));
  };
  G.m_m12 = function (r) {
    var type = ri(r, 0, 2);
    if (type === 0) { var s = ri(r, 3, 11), n = 6 - Math.abs(s - 7); return Q(2, 'さいころを2個投げて、目の和が ' + s + ' になる確率は?', choices(frac(n, 36), [frac(n, 6), frac(n + 1, 36), frac(s, 36)]), '目の出方は 6×6＝36通り(表を書くとわかりやすい)。\n和が ' + s + ' になるのは ' + n + '通り。\n→ ' + n + '/36＝' + frac(n, 36), { fig: { type: 'dice', s: s } }); }
    if (type === 1) { var k = ri(r, 2, 4); return Q(3, '硬貨を ' + k + '枚投げて、少なくとも1枚が表になる確率は?', choices(frac(Math.pow(2, k) - 1, Math.pow(2, k)), [frac(1, Math.pow(2, k)), frac(k, Math.pow(2, k)), '1/2']), '「少なくとも1枚表」の反対は「全部裏」。\n全部裏の確率＝1/' + Math.pow(2, k) + '\n→ 1−1/' + Math.pow(2, k) + '＝' + frac(Math.pow(2, k) - 1, Math.pow(2, k))); }
    var red = ri(r, 2, 5), white = ri(r, 1, 4), t = red + white;
    return Q(2, '赤玉' + red + '個、白玉' + white + '個の袋から1個取り出すとき、赤玉である確率は?', choices(frac(red, t), [frac(white, t), frac(red, white), frac(1, t)]), '全部で ' + t + '個、赤は ' + red + '個 → ' + frac(red, t));
  };
  G.m_data = function (r) {
    var n = pk(r, [5, 6, 7]), arr = Array.from({ length: n }, function () { return ri(r, 1, 20); }).sort(function (a, b) { return a - b; });
    var sum = arr.reduce(function (a, b) { return a + b; }, 0), type = ri(r, 0, 2);
    var med = n % 2 ? arr[(n - 1) / 2] : (arr[n / 2 - 1] + arr[n / 2]) / 2;
    if (type === 0) return Q(1, 'データ ' + shuffle(r, arr).join(', ') + ' の平均値は?', numChoices(Math.round(sum / n * 10) / 10, [med, sum, arr[n - 1] - arr[0]]), '平均値＝合計÷個数＝' + sum + '÷' + n + '＝' + num(Math.round(sum / n * 10) / 10));
    if (type === 1) return Q(2, 'データ ' + shuffle(r, arr).join(', ') + ' の中央値は?', numChoices(med, [Math.round(sum / n * 10) / 10, arr[0], arr[n - 1]]), '小さい順に並べる:' + arr.join(', ') + '\n真ん中の値' + (n % 2 ? 'は ' + med : '2つの平均は ' + med));
    return Q(1, 'データ ' + shuffle(r, arr).join(', ') + ' の範囲(レンジ)は?', numChoices(arr[n - 1] - arr[0], [arr[n - 1], med, arr[n - 1] + arr[0]]), '範囲＝最大値−最小値＝' + arr[n - 1] + '−' + arr[0] + '＝' + (arr[n - 1] - arr[0]));
  };

  /* ================= 数学(高校) ================= */
  G.m_h1 = function (r) {
    var h = ri(r, -5, 5), k = ri(r, -9, 9);
    function v(a, b) { return '(' + a + ', ' + b + ')'; }
    return Q(2, 'y＝' + poly([[1, 'x²'], [-2 * h, 'x'], [h * h + k, '']]) + ' の頂点は?', choices(v(h, k), [v(-h, k), v(h, -k), v(-h, -k)]),
      '平方完成:x の係数 ' + (-2 * h) + ' の半分 ' + (-h) + ' を使って\ny＝(' + poly([[1, 'x'], [-h, '']]) + ')² ' + (k >= 0 ? '＋' : '−') + Math.abs(k) + '\n→ 頂点は ' + v(h, k) + '\n💡 (x−p)² の p は符号が逆になるので注意。', { fig: { type: 'parabola', a: 1, h: h, k: k } });
  };
  G.m_qmax = function (r) {
    var h = ri(r, -2, 3), k = ri(r, -5, 5), lo = h - ri(r, 0, 3), hi = h + ri(r, 1, 4);
    function f(x) { return (x - h) * (x - h) + k; }
    var mx = Math.max(f(lo), f(hi)), mn = (lo <= h && h <= hi) ? k : Math.min(f(lo), f(hi));
    if (ri(r, 0, 1)) return Q(3, 'y＝' + poly([[1, 'x²'], [-2 * h, 'x'], [h * h + k, '']]) + '(' + lo + '≦x≦' + hi + ')の最大値は?', numChoices(mx, [k, f(lo) === mx ? f(hi) : f(lo), mx + 1]), '①頂点(' + h + ', ' + k + ')、軸は x＝' + h + '\n②下に凸なので、軸から遠い端で最大。\nx＝' + lo + ' → ' + f(lo) + ' ／ x＝' + hi + ' → ' + f(hi) + '\n→ 最大値 ' + mx, { fig: { type: 'parabola', a: 1, h: h, k: k, range: [lo, hi] } });
    return Q(3, 'y＝' + poly([[1, 'x²'], [-2 * h, 'x'], [h * h + k, '']]) + '(' + lo + '≦x≦' + hi + ')の最小値は?', numChoices(mn, [mx, k - 1, f(hi)]), '①頂点(' + h + ', ' + k + ')\n②軸 x＝' + h + ' が定義域の' + (lo <= h && h <= hi ? '中にあるので、頂点で最小 → ' + k : '外にあるので、軸に近い端で最小 → ' + mn), { fig: { type: 'parabola', a: 1, h: h, k: k, range: [lo, hi] } });
  };
  G.m_disc = function (r) {
    var b = ri(r, -6, 6), c = ri(r, -9, 9), D = b * b - 4 * c, type = ri(r, 0, 1);
    if (type === 0) return Q(2, '2次方程式 ' + poly([[1, 'x²'], [b, 'x'], [c, '']]) + '＝0 の実数解の個数は?', [D > 0 ? '2個' : D === 0 ? '1個(重解)' : '0個'].concat(['2個', '1個(重解)', '0個'].filter(function (x) { return x !== (D > 0 ? '2個' : D === 0 ? '1個(重解)' : '0個'); })), '判別式 D＝b²−4ac＝' + (b * b) + '−4×' + sgn(c) + '＝' + D + '\nD＞0 → 2個 ／ D＝0 → 1個 ／ D＜0 → 0個\n💡 グラフと x軸の交点の数と同じ。', { fig: { type: 'parabola', a: 1, h: -b / 2, k: c - b * b / 4 } });
    var p = ri(r, -4, 2), q = p + ri(r, 1, 5);
    return Q(3, '2次不等式 ' + poly([[1, 'x²'], [-(p + q), 'x'], [p * q, '']]) + '＜0 を解くと?', [p + '＜x＜' + q, 'x＜' + p + ', ' + q + '＜x', p + '≦x≦' + q, 'x＜' + q], '①因数分解:(' + poly([[1, 'x'], [-p, '']]) + ')(' + poly([[1, 'x'], [-q, '']]) + ')＜0\n②グラフが x軸より下(＜0)になるのは2つの解の間 → ' + p + '＜x＜' + q, { fig: { type: 'parabola', a: 1, h: (p + q) / 2, k: -((q - p) * (q - p)) / 4, roots: [p, q] } });
  };
  G.m_h2 = function (r) {
    var A = pk(r, [[30, '1/2', '√3/2', '1/√3'], [45, '√2/2', '√2/2', '1'], [60, '√3/2', '1/2', '√3'], [120, '√3/2', '-1/2', '-√3'], [135, '√2/2', '-√2/2', '-1'], [150, '1/2', '-√3/2', '-1/√3']]), f = ri(r, 0, 2);
    var names = ['sin', 'cos', 'tan'], vals = [A[1], A[2], A[3]];
    if (ri(r, 0, 2) === 0) { var t = pk(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17]]); return Q(2, 'sinθ＝' + t[0] + '/' + t[2] + '(0°＜θ＜90°)のとき、cosθ は?', [t[1] + '/' + t[2], t[0] + '/' + t[1], t[1] + '/' + t[0], (t[2] - t[0]) + '/' + t[2]], 'sin²θ＋cos²θ＝1 より\ncos²θ＝1−' + (t[0] * t[0]) + '/' + (t[2] * t[2]) + '＝' + (t[1] * t[1]) + '/' + (t[2] * t[2]) + '\nθ は鋭角なので cosθ＞0 → ' + t[1] + '/' + t[2], { fig: { type: 'righttri', a: t[1], b: t[0], c: t[2], ask: 'theta' } }); }
    return Q(1, names[f] + A[0] + '° の値は?', [vals[f]].concat(shuffle(r, ['1/2', '√3/2', '√2/2', '-1/2', '-√3/2', '1', '√3', '1/√3', '-1'].filter(function (x) { return x !== vals[f]; })).slice(0, 3)), '単位円で ' + A[0] + '° の点の座標は (' + A[2] + ', ' + A[1] + ')\nsin＝y座標、cos＝x座標、tan＝y÷x\n→ ' + names[f] + A[0] + '°＝' + vals[f], { fig: { type: 'unitcircle', deg: A[0] } });
  };
  G.m_sincos = function (r) {
    if (ri(r, 0, 1)) { var T = pk(r, [[3, 5, 120, 7], [5, 8, 60, 7], [3, 8, 60, 7], [5, 3, 120, 7], [7, 8, 120, 13]]);
      return Q(3, 'b＝' + T[0] + '、c＝' + T[1] + '、A＝' + T[2] + '° の三角形で、a は?', numChoices(T[3], [T[0] + T[1], T[3] + 1, Math.abs(T[1] - T[0])]), '【余弦定理】a²＝b²＋c²−2bc cosA\n＝' + (T[0] * T[0]) + '＋' + (T[1] * T[1]) + '−2×' + T[0] + '×' + T[1] + '×(' + (T[2] === 60 ? '1/2' : '−1/2') + ')\n＝' + (T[3] * T[3]) + ' → a＝' + T[3] + '\n💡 2辺とその間の角がわかるときは余弦定理。'); }
    var R = pk(r, [2, 3, 4, 5]), A = pk(r, [[30, '1/2', 1], [90, '1', 2], [150, '1/2', 1]]);
    return Q(3, '外接円の半径が ' + R + ' の三角形で、A＝' + A[0] + '° のとき、a は?', numChoices(R * A[2], [R, 2 * R * 2, R * A[2] + 1]), '【正弦定理】a/sinA＝2R\n→ a＝2R×sinA＝2×' + R + '×' + A[1] + '＝' + (R * A[2]) + '\n💡 外接円の半径が出てきたら正弦定理。');
  };
  G.m_h3 = function (r) {
    var n = ri(r, 5, 9), k = ri(r, 2, 4), P = 1, fk = 1; for (var i = 0; i < k; i++) P *= (n - i); for (var j = 2; j <= k; j++) fk *= j; var C = P / fk;
    if (ri(r, 0, 1)) return Q(2, n + '人から ' + k + '人を選ぶ方法は何通り?', choices(C + '通り', [P + '通り', (n * k) + '通り', (C + n) + '通り']), '「選ぶだけ」(順番は関係ない)なので組合せ ₙCᵣ。\n' + n + 'C' + k + '＝(' + n + 'P' + k + ')÷' + k + '!＝' + P + '÷' + fk + '＝' + C + '\n💡 並べるなら P、選ぶだけなら C。');
    return Q(2, n + '人から ' + k + '人を選んで1列に並べる方法は何通り?', choices(P + '通り', [C + '通り', (n * k) + '通り', Math.pow(n, k) + '通り']), '「並べる」(順番が大事)ので順列 ₙPᵣ。\n' + n + 'P' + k + '＝' + Array.from({ length: k }, function (_, i) { return n - i; }).join('×') + '＝' + P);
  };
  G.m_prob = function (r) {
    var red = ri(r, 2, 5), white = ri(r, 2, 4), t = red + white, type = ri(r, 0, 1);
    function C2(x) { return x * (x - 1) / 2; }
    if (type === 0) return Q(3, '赤玉' + red + '個・白玉' + white + '個の袋から2個同時に取り出すとき、2個とも赤の確率は?', choices(frac(C2(red), C2(t)), [frac(red * red, t * t), frac(red, t), frac(C2(white), C2(t))]), '全体:' + t + 'C2＝' + C2(t) + '通り\n2個とも赤:' + red + 'C2＝' + C2(red) + '通り\n→ ' + C2(red) + '/' + C2(t) + '＝' + frac(C2(red), C2(t)));
    var p = pk(r, [[1, 2], [1, 3], [2, 3], [1, 6]]), n = pk(r, [3, 4]), k = ri(r, 1, n - 1);
    var comb = 1; for (var i = 0; i < k; i++) comb = comb * (n - i) / (i + 1);
    var numer = comb * Math.pow(p[0], k) * Math.pow(p[1] - p[0], n - k), den = Math.pow(p[1], n);
    return Q(3, '1回で成功する確率が ' + p[0] + '/' + p[1] + ' の試行を ' + n + '回行うとき、ちょうど ' + k + '回成功する確率は?', choices(frac(numer, den), [frac(Math.pow(p[0], k), Math.pow(p[1], k)), frac(numer / comb, den), frac(comb, den)]), '【反復試行】ₙCₖ × p^k × (1−p)^(n−k)\n＝' + n + 'C' + k + '×(' + p[0] + '/' + p[1] + ')^' + k + '×(' + (p[1] - p[0]) + '/' + p[1] + ')^' + (n - k) + '＝' + frac(numer, den));
  };
  G.m_int = function (r) {
    var type = ri(r, 0, 2), a = ri(r, 2, 9) * ri(r, 2, 6), b = ri(r, 2, 9) * ri(r, 2, 6), g = gcd(a, b);
    if (type === 0) return Q(2, a + ' と ' + b + ' の最大公約数は?', numChoices(g, [a * b / g, Math.min(a, b), g * 2]), '素因数分解して、共通する部分をかける。\n→ 最大公約数＝' + g + '\n💡 ユークリッドの互除法:大きい数を小さい数でわった余りで、くり返しわる。');
    if (type === 1) return Q(2, a + ' と ' + b + ' の最小公倍数は?', numChoices(a * b / g, [a * b, g, a + b]), '最小公倍数＝a×b÷最大公約数＝' + a + '×' + b + '÷' + g + '＝' + (a * b / g));
    var n = pk(r, [12, 18, 24, 36, 48, 60, 72]), cnt = 0; for (var i = 1; i <= n; i++) if (n % i === 0) cnt++;
    return Q(3, n + ' の正の約数の個数は?', numChoices(cnt, [cnt - 1, cnt + 2, n / 2]), '素因数分解して、(指数＋1)をかけ合わせる。\n例:12＝2²×3 → (2＋1)×(1＋1)＝6個\n→ ' + n + ' の約数は ' + cnt + '個');
  };
  G.m_exp = function (r) {
    var a = pk(r, [2, 3, 5]), m = ri(r, 2, 5), n = ri(r, 1, 4), type = ri(r, 0, 2);
    if (type === 0) return Q(1, a + '^' + m + ' × ' + a + '^' + n + ' を計算すると?', choices(a + '^' + (m + n), [a + '^' + (m * n), a + '^' + (m - n), (a * a) + '^' + (m + n)]), '【指数法則】aᵐ×aⁿ＝aᵐ⁺ⁿ(かけ算は指数をたす)');
    if (type === 1) return Q(2, '(' + a + '^' + m + ')^' + n + ' を計算すると?', choices(a + '^' + (m * n), [a + '^' + (m + n), a + '^' + (Math.pow(m, n)), (a * n) + '^' + m]), '【指数法則】(aᵐ)ⁿ＝aᵐⁿ(累乗の累乗は指数をかける)');
    return Q(2, a + '^0 と ' + a + '^(−' + n + ') の値は?', ['1 と 1/' + Math.pow(a, n), '0 と −' + Math.pow(a, n), a + ' と 1/' + Math.pow(a, n), '1 と −' + Math.pow(a, n)], 'a⁰＝1(どんな数も0乗は1)\na⁻ⁿ＝1/aⁿ → 1/' + Math.pow(a, n));
  };
  G.m_h4 = function (r) {
    var a = pk(r, [2, 3, 5]), k = ri(r, 2, 5), sub = { 2: '₂', 3: '₃', 5: '₅' }[a], v = Math.pow(a, k), type = ri(r, 0, 2);
    if (type === 0) return Q(1, 'log' + sub + v + ' の値は?', numChoices(k, [k + 1, k - 1, v / a]), 'log' + sub + v + ' は「' + a + ' を何乗すると ' + v + ' になるか」。\n' + a + '^' + k + '＝' + v + ' なので答えは ' + k);
    if (type === 1) { var m = pk(r, [2, 4, 8]), n2 = pk(r, [4, 8, 16]); return Q(2, 'log₂' + m + ' ＋ log₂' + n2 + ' を計算すると?', numChoices(Math.log2(m * n2), [Math.log2(m) * Math.log2(n2), Math.log2(m + n2), Math.log2(n2)]), 'log の足し算は、中身のかけ算:log₂' + m + '＋log₂' + n2 + '＝log₂' + (m * n2) + '＝' + Math.log2(m * n2)); }
    var p = pk(r, [10, 20, 30, 40, 50]); var d = Math.floor(p * 0.3010) + 1;
    return Q(3, 'log₁₀2＝0.3010 とするとき、2^' + p + ' は何桁の数?', choices(d + '桁', [(d - 1) + '桁', (d + 1) + '桁', p + '桁']), 'log₁₀2^' + p + '＝' + p + '×0.3010＝' + num(p * 0.3010) + '\nつまり 10^' + (d - 1) + ' ≦ 2^' + p + ' ＜ 10^' + d + ' なので ' + d + '桁');
  };
  G.m_h5 = function (r) {
    var A = pk(r, [[30, 'π/6', '1/2'], [60, 'π/3', '√3/2'], [90, 'π/2', '1'], [120, '2π/3', '√3/2'], [150, '5π/6', '1/2'], [210, '7π/6', '-1/2'], [240, '4π/3', '-√3/2'], [270, '3π/2', '-1'], [300, '5π/3', '-√3/2'], [330, '11π/6', '-1/2']]), type = ri(r, 0, 2);
    if (type === 0) return Q(1, A[0] + '° をラジアンで表すと?', [A[1]].concat(shuffle(r, ['π/6', 'π/3', 'π/2', '2π/3', '5π/6', '7π/6', '4π/3', '3π/2', '5π/3', '11π/6', 'π/4'].filter(function (x) { return x !== A[1]; })).slice(0, 3)), '180°＝π なので、' + A[0] + '°＝π×' + A[0] + '/180＝' + A[1]);
    if (type === 1) return Q(2, 'sin(' + A[1] + ') の値は?', [A[2]].concat(shuffle(r, ['1/2', '√3/2', '1', '-1/2', '-√3/2', '-1', '0', '√2/2'].filter(function (x) { return x !== A[2]; })).slice(0, 3)), A[1] + '＝' + A[0] + '°。単位円の y座標が sin。\n→ ' + A[2], { fig: { type: 'unitcircle', deg: A[0] } });
    return Q(3, 'sin75° の値は?(加法定理を使う)', ['(√6＋√2)/4', '(√6−√2)/4', '√3/2', '(√3＋1)/2'], 'sin(45°＋30°)＝sin45°cos30°＋cos45°sin30°\n＝(√2/2)(√3/2)＋(√2/2)(1/2)＝(√6＋√2)/4');
  };
  G.m_h6 = function (r) {
    var a = ri(r, 1, 3), b = ri(r, -4, 4), c = ri(r, -5, 5), t = ri(r, -2, 3), type = ri(r, 0, 1);
    if (type === 0) { var d = 3 * a * t * t + 2 * b * t + c; return Q(2, 'f(x)＝' + poly([[a, 'x³'], [b, 'x²'], [c, 'x']]) + ' のとき、f′(' + t + ') の値は?', numChoices(d, [a * t * t * t + b * t * t + c * t, -d, d + 3 * a]), '①微分:(xⁿ)′＝nxⁿ⁻¹ → f′(x)＝' + poly([[3 * a, 'x²'], [2 * b, 'x'], [c, '']]) + '\n②x＝' + t + ' を代入 → ' + d + '\n💡 f′(' + t + ') はグラフの x＝' + t + ' での接線の傾き。'); }
    var p = ri(r, 1, 3), fmin = 2 * p * p * p - 3 * p * p * p;
    return Q(3, 'f(x)＝' + poly([[2, 'x³'], [-3 * p, 'x²']]) + ' の極小値は?', numChoices(-p * p * p, [0, p * p * p, -p]), "①f′(x)＝6x²−" + (6 * p) + "x＝6x(x−" + p + ")＝0 → x＝0, " + p + "\n②増減表:x＝0 で極大、x＝" + p + " で極小\n③f(" + p + ")＝" + (2 * p * p * p) + "−" + (3 * p * p * p) + "＝" + (-p * p * p));
  };
  G.m_h7 = function (r) {
    var a = ri(r, 1, 3), b = ri(r, -4, 4), k = ri(r, 1, 4), type = ri(r, 0, 1);
    if (type === 0) return Q(2, '∫₀^' + k + ' (' + poly([[2 * a, 'x'], [b, '']]) + ')dx の値は?', numChoices(a * k * k + b * k, [2 * a * k + b, a * k * k, a * k * k + b]), '①積分:∫(' + poly([[2 * a, 'x'], [b, '']]) + ')dx＝' + poly([[a, 'x²'], [b, 'x']]) + '\n②[ ]₀^' + k + ' に代入:' + (a * k * k + b * k) + '−0');
    return Q(3, 'y＝x² と x軸、x＝0、x＝' + k + ' で囲まれた部分の面積は?', choices(frac(k * k * k, 3), [String(k * k), frac(k * k, 2), String(k * k * k)]), '面積＝∫₀^' + k + ' x²dx＝[x³/3]₀^' + k + '＝' + frac(k * k * k, 3), { fig: { type: 'parabola', a: 1, h: 0, k: 0, area: [0, k] } });
  };
  G.m_h8 = function (r) {
    if (ri(r, 0, 1)) { var a = ri(r, -5, 9), d = nz(r, -4, 5), n = ri(r, 5, 15); return Q(1, '初項 ' + a + '・公差 ' + d + ' の等差数列の第 ' + n + ' 項は?', numChoices(a + (n - 1) * d, [a + n * d, a + (n - 2) * d, a * d + n]), '一般項 aₙ＝a＋(n−1)d\n第' + n + '項:' + a + '＋(' + n + '−1)×' + sgn(d) + '＝' + (a + (n - 1) * d) + '\n💡 第1項から第' + n + '項まで、公差を足す回数は ' + (n - 1) + ' 回。'); }
    var g = ri(r, 1, 4), q = pk(r, [2, 3, -2]), m = ri(r, 3, 6);
    return Q(1, '初項 ' + g + '・公比 ' + q + ' の等比数列の第 ' + m + ' 項は?', numChoices(g * Math.pow(q, m - 1), [g * Math.pow(q, m), g * q * m, -g * Math.pow(q, m - 1)]), '一般項 aₙ＝a×r^(n−1)\n→ ' + g + '×' + sgn(q) + '^' + (m - 1) + '＝' + (g * Math.pow(q, m - 1)));
  };
  G.m_sigma = function (r) {
    var n = ri(r, 5, 20), type = ri(r, 0, 2);
    if (type === 0) return Q(2, 'Σk(k＝1〜' + n + ')の値は?', numChoices(n * (n + 1) / 2, [n * n, n * (n - 1) / 2, n * (n + 1)]), 'Σk＝n(n＋1)/2\n→ ' + n + '×' + (n + 1) + '÷2＝' + (n * (n + 1) / 2) + '\n💡 1＋2＋…＋n と、逆順の n＋…＋1 をたすと (n＋1) が n 個 → それを半分に。');
    if (type === 1) return Q(3, 'Σk²(k＝1〜' + n + ')の値は?', numChoices(n * (n + 1) * (2 * n + 1) / 6, [n * (n + 1) / 2, n * n * n, n * (n + 1) * (2 * n + 1) / 3]), 'Σk²＝n(n＋1)(2n＋1)/6\n→ ' + n + '×' + (n + 1) + '×' + (2 * n + 1) + '÷6＝' + (n * (n + 1) * (2 * n + 1) / 6));
    var a = ri(r, 1, 5), d = ri(r, 1, 4); return Q(2, '初項 ' + a + '・公差 ' + d + ' の等差数列の、初項から第 ' + n + ' 項までの和は?', numChoices(n * (2 * a + (n - 1) * d) / 2, [n * (a + (n - 1) * d), a + (n - 1) * d, n * a]), '等差数列の和＝(初項＋末項)×項数÷2\n末項＝' + a + '＋' + (n - 1) + '×' + d + '＝' + (a + (n - 1) * d) + '\n→ (' + a + '＋' + (a + (n - 1) * d) + ')×' + n + '÷2＝' + (n * (2 * a + (n - 1) * d) / 2));
  };
  G.m_h9 = function (r) {
    var a1 = ri(r, -4, 4), a2 = ri(r, -4, 4), b1 = ri(r, -4, 4), b2 = ri(r, -4, 4), type = ri(r, 0, 2);
    if (type === 0) return Q(1, 'a＝(' + a1 + ', ' + a2 + ')、b＝(' + b1 + ', ' + b2 + ') のとき a＋b は?', choices('(' + (a1 + b1) + ', ' + (a2 + b2) + ')', ['(' + (a1 - b1) + ', ' + (a2 - b2) + ')', '(' + (a1 * b1) + ', ' + (a2 * b2) + ')', '(' + (a1 + a2) + ', ' + (b1 + b2) + ')']), '成分ごとにたす:(' + a1 + '＋' + sgn(b1) + ', ' + a2 + '＋' + sgn(b2) + ')', { fig: { type: 'vec', a: [a1, a2], b: [b1, b2] } });
    if (type === 1) return Q(2, 'a＝(' + a1 + ', ' + a2 + ')、b＝(' + b1 + ', ' + b2 + ') のとき内積 a・b は?', numChoices(a1 * b1 + a2 * b2, [a1 * b1 - a2 * b2, a1 * b2 + a2 * b1, a1 + b1 + a2 + b2]), '内積＝x成分どうしの積＋y成分どうしの積\n＝' + a1 + '×' + sgn(b1) + '＋' + a2 + '×' + sgn(b2) + '＝' + (a1 * b1 + a2 * b2) + '\n💡 内積が0なら、2つのベクトルは垂直。');
    var T = pk(r, [[2, 3, 3, 60, '1/2'], [2, 2, 0, 90, '0'], [3, 4, -6, 120, '−1/2'], [1, 2, 1, 60, '1/2'], [2, 4, 4, 60, '1/2']]);
    return Q(3, '|a|＝' + T[0] + '、|b|＝' + T[1] + '、a・b＝' + T[2] + ' のとき、a と b のなす角は?', [T[3] + '°'].concat(['30°', '45°', '60°', '90°', '120°', '150°'].filter(function (x) { return x !== T[3] + '°'; }).slice(0, 3)), 'cosθ＝a・b÷(|a||b|)＝' + T[2] + '÷' + (T[0] * T[1]) + '＝' + T[4] + '\n→ θ＝' + T[3] + '°');
  };

  WPS.GEN = G;
  WPS.rng = rng;
})();
