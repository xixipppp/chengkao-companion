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
 *   GH_TOKEN=<PAT> node tools/publish.js --files-from list.txt # 从清单文件读待推送文件（每行一个，# 开头为注释）
 *   GH_TOKEN=<PAT> node tools/publish.js -m "feat: xxx"       # 自定义提交信息
 *   GH_TOKEN=<PAT> node tools/publish.js --dry-run            # 只打印将推送什么，不做任何写操作
 *   GH_TOKEN=<PAT> node tools/publish.js --tag v2.4.1 --body notes.md  # 同时创建 Release
 *
 * 令牌来源（按优先级）：
 *   1. 环境变量 GH_TOKEN
 *   2. 环境变量 GH_TOKEN_FILE 指向的文件内容（避免令牌出现在命令行/进程列表）
 *
 * v3.4.0 修复：
 *   - git 调用改为**容错**：部分沙箱会拦截 execSync（spawn cmd.exe EBUSY），
 *     旧版会直接抛错中断；现在 git 不可用时只要已显式给出文件与提交信息就能正常推送。
 *   - 新增 --files-from / --dry-run。
 *   - 新增对 5xx / 网络错误的自动重试（3 次，指数退避）。
 *
 * v3.4.1 加固（盲审共识 C9）：
 *   - pre-flight：推送前自动跑 syntax_check + dup_check + ver_check + data_check（--skip-checks 可跳过）；
 *   - 脏工作区检查：git 模式下存在未提交/未跟踪改动时列出并告警（--include-dirty 显式放行）；
 *   - 路径规范化：反斜杠统一转正斜杠，拒绝 .. 与绝对路径（防 tree 条目错乱）；
 *   - 密钥扫描：待推文件内容命中 ghp_/github_pat_/sk- 模式即拒绝（--allow-secrets 显式放行）；
 *   - 多 commit 压扁提示：本地领先 >1 个 commit 时明确告警；
 *   - ref 更新 422（远端已前进）自动重取基线重放一次；
 *   - 收尾提示由破坏性的 reset --hard 改为 fetch + 状态确认。
 *
 * 说明：
 *   - 只提交「已跟踪」文件的内容快照，不做本地 git 操作（本地历史需另行 fetch+reset 对齐）。
 *   - 令牌建议用细粒度 PAT（Contents: read/write + Metadata: read），用完即吊销轮换。
 * ============================================================ */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const OWNER = process.env.GH_OWNER || 'xixipppp';
const REPO = process.env.GH_REPO || 'chengkao-companion';
const BRANCH = process.env.GH_BRANCH || 'main';

const API = `https://api.github.com/repos/${OWNER}/${REPO}`;

function fail(msg) { console.error('❌ ' + msg); process.exit(1); }
function warn(msg) { console.warn('⚠️  ' + msg); }
function info(msg) { console.log(msg); }

function readToken() {
  if (process.env.GH_TOKEN) return String(process.env.GH_TOKEN).trim();
  const f = process.env.GH_TOKEN_FILE;
  if (f) {
    try { return fs.readFileSync(f, 'utf8').trim(); } catch (_) { return null; }
  }
  return null;
}

/* git 可能完全不可用（部分沙箱连 spawn 子进程都被拦截：spawnSync git EBUSY）。
 * 所有 git 调用一律容错返回 null，不中断流程。
 * 用 spawnSync(shell:false) + 参数数组，避免 cmd.exe 与命令行转义问题。 */
function gitOut(args, binary) {
  try {
    const r = spawnSync('git', args, {
      encoding: binary ? 'buffer' : 'utf8',
      shell: false,
      windowsHide: true,
      cwd: path.join(__dirname, '..'),
      maxBuffer: 256 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    if (r.error || r.status !== 0 || !r.stdout) return null;
    return r.stdout;
  } catch (_) { return null; }
}
function git(args) { const o = gitOut(args, false); return o === null ? null : String(o).trim(); }
function gitBuf(args) { return gitOut(args, true); }

let GIT_OK = null;
function gitWorks() {
  if (GIT_OK === null) GIT_OK = git(['rev-parse', '--is-inside-work-tree']) === 'true';
  return GIT_OK;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* HEADERS 需在拿到 token 后再构造 */
function makeApi(TOKEN) {
  const HEADERS = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'publish-js'
  };
  return async function api(p, method = 'GET', body) {
    let lastErr = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(API + p, {
          headers: HEADERS,
          method,
          body: body ? JSON.stringify(body) : undefined
        });
        const txt = await res.text();
        // 5xx 视为可重试；4xx 直接失败（重试也无用）
        if (res.status >= 500) { lastErr = new Error(`${method} ${p} -> ${res.status} ${txt.slice(0, 200)}`); }
        else if (!res.ok) { throw Object.assign(new Error(`${method} ${p} -> ${res.status} ${txt.slice(0, 200)}`), { fatal: true }); }
        else { return txt ? JSON.parse(txt) : {}; }
      } catch (e) {
        if (e && e.fatal) throw e;
        lastErr = e;
      }
      if (attempt < 3) {
        warn(`${p} 第 ${attempt} 次失败，${attempt * 800}ms 后重试：${lastErr && lastErr.message}`);
        await sleep(attempt * 800);
      }
    }
    throw lastErr;
  };
}

(async () => {
  const argv = process.argv.slice(2);
  let msg = null, tag = null, bodyFile = null, filesFrom = null, dryRun = false;
  let skipChecks = false, includeDirty = false, allowSecrets = false;
  const paths = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '-m' || argv[i] === '--msg') msg = argv[++i];
    else if (argv[i] === '--tag') tag = argv[++i];
    else if (argv[i] === '--body') bodyFile = argv[++i];
    else if (argv[i] === '--files-from') filesFrom = argv[++i];
    else if (argv[i] === '--dry-run') dryRun = true;
    else if (argv[i] === '--skip-checks') skipChecks = true;
    else if (argv[i] === '--include-dirty') includeDirty = true;
    else if (argv[i] === '--allow-secrets') allowSecrets = true;
    else paths.push(argv[i]);
  }

  const root = path.join(__dirname, '..');

  /* ---------- 0. pre-flight 质量门禁（v3.4.1） ---------- */
  if (!skipChecks && !dryRun) {
    for (const t of ['syntax_check', 'dup_check', 'ver_check', 'data_check']) {
      const tp = path.join(__dirname, t + '.js');
      if (!fs.existsSync(tp)) continue;
      const r = spawnSync(process.execPath, [tp], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      if (r.status !== 0) {
        console.error(String(r.stdout || '').slice(-2000));
        console.error(String(r.stderr || '').slice(-1000));
        fail('pre-flight 未通过：tools/' + t + '.js（--skip-checks 可强制跳过，但不推荐）');
      }
      info('pre-flight ✅ tools/' + t + '.js');
    }
  }

  /* ---------- 1. 解析待推送文件 ---------- */
  let files = paths.slice();

  if (!files.length && filesFrom) {
    const fp = path.isAbsolute(filesFrom) ? filesFrom : path.join(root, filesFrom);
    if (!fs.existsSync(fp)) fail('清单文件不存在：' + filesFrom);
    files = fs.readFileSync(fp, 'utf8')
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('#'));
    info('已从清单读取 ' + files.length + ' 个文件：' + filesFrom);
  }

  if (!files.length) {
    /* -c core.quotepath=false：否则中文路径会被转义成 "\344\270\223..." */
    const d = git(['-c', 'core.quotepath=false', 'diff', '--name-only', `origin/${BRANCH}..HEAD`]);
    if (d === null) {
      fail('git 不可用且未指定文件。请显式传入路径，或用 --files-from <清单文件>。');
    }
    files = d.split('\n').filter(Boolean);

    /* v3.4.1 脏工作区检查：commit 级 diff 不含未提交改动，静默漏推曾真实发生 */
    const dirty = git(['status', '--porcelain']);
    if (dirty) {
      const lines = dirty.split('\n').filter(Boolean);
      warn('工作区存在 ' + lines.length + ' 处未提交/未跟踪改动，本次推送**不包含**它们：');
      lines.slice(0, 10).forEach(l => warn('  ' + l));
      if (!includeDirty) fail('请先提交或 stash 这些改动，或加 --include-dirty 显式放行。');
    }
    /* v3.4.1 多 commit 压扁提示 */
    const ahead = git(['rev-list', '--count', `origin/${BRANCH}..HEAD`]);
    if (ahead && parseInt(ahead, 10) > 1) {
      warn('本地领先 ' + ahead + ' 个 commit，将全部压扁为 1 个 API 提交（提交信息取最近一条）。');
    }
  }

  /* v3.4.1 路径规范化：反斜杠→正斜杠，拒绝 .. 与绝对路径（防 tree 条目错乱） */
  files = files.map(f => String(f).replace(/\\/g, '/').replace(/^\/+/, ''));
  const badPath = files.filter(f => !f || f.includes('..') || path.isAbsolute(f));
  if (badPath.length) fail('非法路径（含 .. 或绝对路径）：' + badPath.join(', '));

  if (!files.length) fail('没有待推送的文件（本地与 origin/' + BRANCH + ' 无差异）');

  const missing = files.filter(f => !fs.existsSync(path.join(root, f)));
  if (missing.length) fail('以下文件在本地不存在：' + missing.join(', '));
  info('待推送文件(' + files.length + ')：' + files.join(', '));

  /* v3.4.1 密钥扫描：疑似凭据内容直接拒推（历史上 Key 曾三次暴露） */
  if (!allowSecrets) {
    const SECRET_RE = /gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}/;
    const hit = files.filter(f => {
      try { return SECRET_RE.test(fs.readFileSync(path.join(root, f), 'utf8')); } catch (_) { return false; }
    });
    if (hit.length) fail('疑似密钥内容，拒绝推送：' + hit.join(', ') + '（确认误报可加 --allow-secrets）');
  }

  /* ---------- 2. 提交信息 ---------- */
  if (!msg) {
    msg = git(['log', '-1', '--pretty=%s']) || 'chore: publish via API';
    if (msg === 'chore: publish via API') warn('git 不可用，使用默认提交信息。建议用 -m 显式指定。');
  }

  if (dryRun) {
    info('\n[dry-run] 提交信息：' + msg);
    info('[dry-run] 分支：' + BRANCH + '  仓库：' + OWNER + '/' + REPO);
    if (tag) info('[dry-run] 将创建 Release：' + tag + (bodyFile ? '（正文来自 ' + bodyFile + '）' : ''));
    info('[dry-run] 未做任何写操作。');
    return;
  }

  /* ---------- 3. 令牌 ---------- */
  const TOKEN = readToken();
  if (!TOKEN) fail('缺少令牌。请设置 GH_TOKEN 环境变量，或 GH_TOKEN_FILE 指向含令牌的文件。');
  if (!/^(gh[pousr]_|github_pat_)/.test(TOKEN)) {
    warn('令牌前缀不像 GitHub PAT（期望 gh*_ 或 github_pat_），可能仍会返回 401 Bad credentials。');
  }
  const api = makeApi(TOKEN);

  /* ---------- 4. 原子提交（v3.4.1：ref 更新 422 = 远端已前进，重取基线自动重放一次） ---------- */
  let pushed = null;
  for (let round = 1; round <= 2 && !pushed; round++) {
    const ref = await api(`/git/ref/heads/${BRANCH}`);
    const base = await api(`/git/commits/${ref.object.sha}`);
    info('远端基线 commit: ' + ref.object.sha + (round > 1 ? '（第 ' + round + ' 次重放）' : ''));

    if (!gitWorks()) {
      warn('git 不可用：文件内容将取自「工作区」。');
      warn('  若仓库 core.autocrlf=true，工作区可能是 CRLF 而 git 对象为 LF，');
      warn('  这样推上去会造成换行符漂移（正常 git push 不会发生）。');
      warn('  建议改为在有 git 的环境运行，或先确认待推文件的换行符。');
    }

    const tree = [];
    for (const f of files) {
      /* 权威内容取 git 已提交对象：autocrlf=true 时工作区会被 smudge 成 CRLF，
         只有 git 对象里的才是仓库真正的内容。取不到（新文件/git 不可用）再退回工作区。 */
      let content = null, src = 'git-object', mode = '100644';
      if (gitWorks()) {
        const sha = git(['rev-parse', 'HEAD:' + f]);
        if (sha) {
          content = gitBuf(['cat-file', 'blob', sha]);
          const m = git(['ls-files', '--format=%(objectmode)', '--', f]);   // 需 git >= 2.38，失败则保持 100644
          if (m) mode = String(m).split('\n')[0].trim() || '100644';
        }
      }
      if (!content) { content = fs.readFileSync(path.join(root, f)); src = 'working-tree'; }

      const blob = await api('/git/blobs', 'POST', { content: content.toString('base64'), encoding: 'base64' });
      tree.push({ path: f, mode: mode, type: 'blob', sha: blob.sha });
      info('  blob ' + f + ' -> ' + blob.sha.slice(0, 8) + '（' + content.length + ' B, ' + src + ', ' + mode + '）');
    }

    const newTree = await api('/git/trees', 'POST', { base_tree: base.tree.sha, tree });
    const commit = await api('/git/commits', 'POST', { message: msg, tree: newTree.sha, parents: [ref.object.sha] });
    try {
      await api(`/git/refs/heads/${BRANCH}`, 'PATCH', { sha: commit.sha, force: false });
      pushed = commit;
    } catch (e) {
      if (round < 2 && /422/.test(e.message)) {
        warn('ref 更新被拒（远端已前进），重取基线后重放一次……');
        continue;
      }
      throw e;
    }
  }
  info('✅ 已推送 ' + OWNER + '/' + REPO + '@' + BRANCH + ' -> ' + pushed.sha);

  /* ---------- 5. Release ---------- */
  if (tag) {
    const body = bodyFile && fs.existsSync(path.join(root, bodyFile))
      ? fs.readFileSync(path.join(root, bodyFile), 'utf8') : (tag + ' release');
    const rel = await api('/releases', 'POST', { tag_name: tag, name: tag, body, target_commitish: BRANCH });
    info('✅ Release 已发布：' + rel.html_url);
  }

  /* v3.4.1：不再建议 reset --hard（会销毁本地未推 commit 与工作区改动） */
  info('\n提示：本地历史对齐请先  git fetch origin ' + BRANCH + ' && git status 确认工作区干净，');
  info('      再执行  git merge --ff-only origin/' + BRANCH + '（fast-forward，不会丢本地改动）。');
})().catch(e => fail(e.message));
