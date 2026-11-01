/*
 * Aqualium 同期・通知サーバー(任意)
 * ------------------------------------------------------------
 * このサーバーを動かすと、次のことができるようになります。
 *   1. クラウド同期 … スマホとPCなど、複数の端末で同じ学習データを使える
 *   2. 先生用リンク … 家庭教師の先生が、いつでも最新の分析レポートを見られる
 *   3. プッシュ通知 … アプリを閉じていても「記録が切れそう！」通知が届く
 *
 * アプリ本体(index.html など)も同じサーバーから配信します。
 * 起動方法は server/README.md を見てください。
 *
 * 必要なもの:Node.js 18 以上、npm パッケージ web-push
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const webpush = require('web-push');

const PORT = +process.env.PORT || 8787;
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(__dirname, 'data'));
const USERS_DIR = path.join(DATA_DIR, 'users');
const MAX_BODY = 5 * 1024 * 1024; // 5MB
const LAST_CALL_HOUR = 22;

fs.mkdirSync(USERS_DIR, { recursive: true });

/* ---------- VAPID 鍵(プッシュ通知用。初回起動時に自動生成) ---------- */
const vapidFile = path.join(DATA_DIR, 'vapid.json');
let vapid;
if (fs.existsSync(vapidFile)) {
  vapid = JSON.parse(fs.readFileSync(vapidFile, 'utf8'));
} else {
  vapid = webpush.generateVAPIDKeys();
  fs.writeFileSync(vapidFile, JSON.stringify(vapid), { mode: 0o600 });
}
webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:admin@example.com', vapid.publicKey, vapid.privateKey);

/* ---------- 保存まわり ---------- */
const ID_RE = /^[a-z0-9]{8,32}$/;
function rand(n) { return crypto.randomBytes(n).toString('hex'); }
function newId(len) {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let s = '';
  const b = crypto.randomBytes(len);
  for (let i = 0; i < len; i++) s += chars[b[i] % chars.length];
  return s;
}
function sha(s) { return crypto.createHash('sha256').update(s).digest('hex'); }
function userPath(id) { return path.join(USERS_DIR, id + '.json'); }
function loadUser(id) {
  if (!ID_RE.test(id)) return null;
  try { return JSON.parse(fs.readFileSync(userPath(id), 'utf8')); } catch (e) { return null; }
}
function saveUser(u) {
  const tmp = userPath(u.id) + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(u));
  fs.renameSync(tmp, userPath(u.id));
}
// 先生用コード → 生徒ID の対応表(起動時に作り直す)
const tutorIndex = {};
fs.readdirSync(USERS_DIR).filter((f) => f.endsWith('.json')).forEach((f) => {
  const u = loadUser(f.replace('.json', ''));
  if (u) tutorIndex[u.tutorCode] = u.id;
});

function authed(req, id) {
  const u = loadUser(id);
  if (!u) return null;
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!m) return null;
  const a = Buffer.from(sha(m[1])), b = Buffer.from(u.tokenHash);
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? u : null;
}

/* ---------- HTTP ---------- */
function send(res, code, obj, headers) {
  const body = typeof obj === 'string' ? obj : JSON.stringify(obj);
  res.writeHead(code, Object.assign({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  }, headers || {}));
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(new Error('too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon'
};
function serveStatic(req, res, urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.resolve(ROOT, '.' + p);
  // アプリ以外(サーバーのコード・データ・隠しファイル)は配信しない
  const rel = path.relative(ROOT, file);
  if (rel.startsWith('..') || rel.split(path.sep).some((s) => s.startsWith('.')) || /^(server|node_modules)(\/|\\|$)/.test(rel)) {
    return send(res, 404, { error: 'not found' });
  }
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, { error: 'not found' });
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}

async function api(req, res, parts) {
  const [, , name, id] = parts; // ['', 'api', name, id]
  if (req.method === 'OPTIONS') return send(res, 204, '');

  if (name === 'health' && req.method === 'GET') return send(res, 200, { ok: true, push: true });
  if (name === 'vapid' && req.method === 'GET') return send(res, 200, { publicKey: vapid.publicKey });

  if (name === 'register' && req.method === 'POST') {
    const token = rand(24);
    const u = { id: newId(10), tokenHash: sha(token), tutorCode: newId(14), state: null, meta: {}, subs: [], notified: {}, createdAt: Date.now(), updatedAt: 0 };
    saveUser(u);
    tutorIndex[u.tutorCode] = u.id;
    return send(res, 200, { id: u.id, token, tutorCode: u.tutorCode });
  }

  if (name === 'data') {
    const u = authed(req, id || '');
    if (!u) return send(res, 401, { error: 'unauthorized' });
    if (req.method === 'GET') return send(res, 200, { state: u.state, updatedAt: u.updatedAt });
    if (req.method === 'PUT') {
      const body = await readBody(req);
      if (!body.state || typeof body.state !== 'object' || !body.state.profile) return send(res, 400, { error: 'bad state' });
      u.state = body.state;
      u.updatedAt = +body.state.updatedAt || Date.now();
      u.meta = Object.assign({}, u.meta, sanitizeMeta(body.meta || {}));
      saveUser(u);
      return send(res, 200, { ok: true, updatedAt: u.updatedAt });
    }
  }

  if (name === 'share' && req.method === 'GET') {
    const sid = tutorIndex[id];
    const u = sid && loadUser(sid);
    if (!u || !u.state) return send(res, 404, { error: 'not found' });
    return send(res, 200, { state: u.state, updatedAt: u.updatedAt });
  }

  if (name === 'push') {
    const u = authed(req, id || '');
    if (!u) return send(res, 401, { error: 'unauthorized' });
    const body = await readBody(req);
    if (req.method === 'POST') {
      const sub = body.subscription;
      if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint)) return send(res, 400, { error: 'bad subscription' });
      u.subs = (u.subs || []).filter((s) => s.endpoint !== sub.endpoint).concat([sub]).slice(-5);
      if (body.meta) u.meta = Object.assign({}, u.meta, sanitizeMeta(body.meta));
      saveUser(u);
      return send(res, 200, { ok: true });
    }
    if (req.method === 'DELETE') {
      u.subs = (u.subs || []).filter((s) => s.endpoint !== body.endpoint);
      saveUser(u);
      return send(res, 200, { ok: true });
    }
  }
  return send(res, 404, { error: 'not found' });
}

function sanitizeMeta(m) {
  return {
    notify: !!m.notify,
    reminder: /^\d{2}:\d{2}$/.test(m.reminder || '') ? m.reminder : '20:00',
    tz: Number.isFinite(+m.tz) ? Math.max(-840, Math.min(840, +m.tz)) : -540,
    lastStudy: /^\d{4}-\d{2}-\d{2}$/.test(m.lastStudy || '') ? m.lastStudy : '',
    streak: Math.max(0, Math.min(100000, +m.streak || 0)),
    name: String(m.name || '').slice(0, 20)
  };
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || '/';
  const parts = urlPath.split('?')[0].split('/');
  if (parts[1] === 'api') {
    api(req, res, parts).catch((e) => send(res, 400, { error: String(e.message || e) }));
  } else if (req.method === 'GET' || req.method === 'HEAD') {
    serveStatic(req, res, urlPath);
  } else {
    send(res, 405, { error: 'method not allowed' });
  }
});

/* ---------- 毎分のチェック:記録が切れそうな生徒にプッシュ通知 ---------- */
function localNow(tz) { // tz は getTimezoneOffset() の値(日本なら -540)
  return new Date(Date.now() - tz * 60000);
}
function ymdUTC(d) { return d.toISOString().slice(0, 10); }

async function tick() {
  const files = fs.readdirSync(USERS_DIR).filter((f) => f.endsWith('.json'));
  for (const f of files) {
    const u = loadUser(f.replace('.json', ''));
    if (!u || !u.meta || !u.meta.notify || !u.subs || !u.subs.length) continue;
    const now = localNow(u.meta.tz);
    const today = ymdUTC(now);
    if (u.meta.lastStudy === today) continue;
    const mins = now.getUTCHours() * 60 + now.getUTCMinutes();
    const [rh, rm] = u.meta.reminder.split(':').map(Number);
    const flags = u.notified[today] || {};
    let kind = null;
    if (now.getUTCHours() >= LAST_CALL_HOUR && !flags.last) kind = 'last';
    else if (mins >= rh * 60 + rm && !flags.remind) kind = 'remind';
    if (!kind) continue;

    const y = new Date(now.getTime() - 86400000);
    const alive = u.meta.lastStudy === ymdUTC(y) && u.meta.streak > 0;
    const hours = 24 - now.getUTCHours();
    const payload = JSON.stringify(kind === 'last' && alive
      ? { title: '🔥 あと' + hours + '時間で記録が切れちゃう…！', body: u.meta.streak + '日間がんばってきた記録、ここで止めるのはもったいないよ。1分だけ、単語帳を開いてみよう！', tag: 'wps-last' }
      : { title: 'ピンポより 🦉', body: alive ? u.meta.streak + '日連続の記録、今日もいっしょにつなごう！ カード5枚だけでも大丈夫だよ。' : '今日の5分、いっしょにやってみない？ 小さな一歩が、合格への近道だよ。', tag: 'wps-' + kind });

    const alive2 = [];
    for (const sub of u.subs) {
      try { await webpush.sendNotification(sub, payload, { TTL: 3600 }); alive2.push(sub); }
      catch (e) { if (e.statusCode !== 404 && e.statusCode !== 410) alive2.push(sub); }
    }
    u.subs = alive2;
    flags[kind] = true;
    if (kind === 'last') flags.remind = true;
    u.notified = { [today]: flags }; // 古い日付の記録は残さない
    saveUser(u);
  }
}

if (require.main === module) {
  server.listen(PORT, () => {
    console.log('Aqualium server: http://localhost:' + PORT);
  });
  setInterval(() => { tick().catch((e) => console.error('tick error', e)); }, 60 * 1000);
}

module.exports = { server, tick };
