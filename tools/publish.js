#!/usr/bin/env node
/* ============================================================
 * publish.js —— 绕过 git 接收端点 502 的推送工具（GitHub Git Data API）
 *
 * 背景：沙箱/代理环境下 `git push` 常因 git-receive-pack 端点 502 失败，
 *       而 api.github.com 正常。本脚本用 REST API 做一次**原子提交**。
 *
 * 用法：
 *   GH_TOKEN=<PAT> node tools/publish.js                      # 推送 origin/main..HEAD 的全部改动文件
 *   GH_TOKEN=<PAT> node tools/publish.js index.html README.md # 只推指定文件
 *   GH_TOKEN=<PAT> node tools/publish.js -m "feat: xxx"       # 自定义提交信息
 *   GH_TOKEN=<PAT> node tools/publish.js --tag v2.4.1 --body notes.md  # 同时创建 Release
 *
 * 说明：
 *   - 只提交「已跟踪」文件的内容快照，不做本地 git 操作（本地历史需另行 fetch+reset 对齐）。
 *   - 令牌建议用细粒度 PAT（Contents: read/write + Metadata: read），用完即吊销轮换。
 * ============================================================ */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OWNER = process.env.GH_OWNER || 'xixipppp';
const REPO = process.env.GH_REPO || 'chengkao-companion';
const BRANCH = process.env.GH_BRANCH || 'main';
const TOKEN = process.env.GH_TOKEN;

const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'publish-js'
};

function fail(msg) { console.error('❌ ' + msg); process.exit(1); }

async function api(p, method = 'GET', body) {
  const res = await fetch(API + p, { headers: HEADERS, method, body: body ? JSON.stringify(body) : undefined });
  const txt = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${p} -> ${res.status} ${txt.slice(0, 200)}`);
  }
  return txt ? JSON.parse(txt) : {};
}

function git(args) {
  return execSync('git ' + args, { encoding: 'utf8', cwd: path.join(__dirname, '..') }).trim();
}

(async () => {
  if (!TOKEN) fail('缺少 GH_TOKEN 环境变量。用法：GH_TOKEN=<PAT> node tools/publish.js [paths...]');

  const argv = process.argv.slice(2);
  let msg = null, tag = null, bodyFile = null;
  const paths = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '-m' || argv[i] === '--msg') msg = argv[++i];
    else if (argv[i] === '--tag') tag = argv[++i];
    else if (argv[i] === '--body') bodyFile = argv[++i];
    else paths.push(argv[i]);
  }

  // 未显式指定文件时，取本地相对 origin 的改动（含未推送的本地提交）
  let files = paths.length ? paths : git(`diff --name-only origin/${BRANCH}..HEAD`).split('\n').filter(Boolean);
  if (!files.length) fail('没有待推送的文件（本地与 origin/' + BRANCH + ' 无差异）');

  const root = path.join(__dirname, '..');
  const missing = files.filter(f => !fs.existsSync(path.join(root, f)));
  if (missing.length) fail('以下文件在本地不存在：' + missing.join(', '));
  console.log('待推送文件(' + files.length + ')：' + files.join(', '));

  const ref = await api(`/git/ref/heads/${BRANCH}`);
  const base = await api(`/git/commits/${ref.object.sha}`);
  console.log('远端基线 commit: ' + ref.object.sha);

  const tree = [];
  for (const f of files) {
    const content = fs.readFileSync(path.join(root, f));
    const blob = await api('/git/blobs', 'POST', { content: content.toString('base64'), encoding: 'base64' });
    tree.push({ path: f, mode: '100644', type: 'blob', sha: blob.sha });
    console.log('  blob ' + f + ' -> ' + blob.sha.slice(0, 8));
  }

  const newTree = await api('/git/trees', 'POST', { base_tree: base.tree.sha, tree });
  const message = msg || git('log -1 --pretty=%s') || 'chore: publish via API';
  const commit = await api('/git/commits', 'POST', { message, tree: newTree.sha, parents: [ref.object.sha] });
  await api(`/git/refs/heads/${BRANCH}`, 'PATCH', { sha: commit.sha, force: false });
  console.log('✅ 已推送 ' + OWNER + '/' + REPO + '@' + BRANCH + ' -> ' + commit.sha);

  if (tag) {
    const body = bodyFile && fs.existsSync(path.join(root, bodyFile))
      ? fs.readFileSync(path.join(root, bodyFile), 'utf8') : (tag + ' release');
    const rel = await api('/releases', 'POST', { tag_name: tag, name: tag, body, target_commitish: BRANCH });
    console.log('✅ Release 已发布：' + rel.html_url);
  }

  console.log('\n提示：本地历史对齐请执行  git fetch origin ' + BRANCH + ' && git reset --hard origin/' + BRANCH);
})().catch(e => fail(e.message));
