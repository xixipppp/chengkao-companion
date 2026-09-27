/* 静态自检（0.2）：三段校验，防止「重复定义覆盖导致页面静默白屏」这类问题复发
 *   段1 重名函数/常量：同名 function / const / let 声明 ≥2 次 → FAIL（exit 1）
 *   段2 悬空 onclick  ：HTML 与 JS 字符串里的 onclick 处理器，在本文件找不到定义 → WARN
 *   段3 悬空 DOM id   ：getElementById('x') 的 x 在全文找不到 id="x" → WARN
 * 用法：node tools/dup_check.js [--strict]   （--strict 时 WARN 也 FAIL）
 * 复用：const { run } = require('./dup_check.js'); const r = run();  // 供回归测试进程内调用，免 spawn
 */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'index.html');

function run(opts) {
  opts = opts || {};
  const strict = !!opts.strict || process.argv.includes('--strict');
  const html = fs.readFileSync(file, 'utf8');

  /* 收集内联脚本代码（排除外链 script），并记录每行号到整份文件的行号偏移 */
  let js = '';
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const before = html.slice(0, m.index).split('\n').length - 1;
    js += '\n'.repeat(before - js.split('\n').length + 1) + m[1];
  }

  /* ---------- 段1：重名声明 ---------- */
  const dupFn = new Map();   // name -> [line]
  const lineOf = (idx) => js.slice(0, idx).split('\n').length;
  const declRe = /^\s*(?:function\s+([A-Za-z_$][\w$]*)\s*\(|(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=)/gm;
  let d;
  while ((d = declRe.exec(js))) {
    const name = d[1] || d[2];
    if (!name) continue;
    if (!dupFn.has(name)) dupFn.set(name, []);
    dupFn.get(name).push(lineOf(d.index));
  }
  /* 顶层重名：同一名字出现 >=2 次即视为覆盖风险（函数内局部同名由作用域隔离，用缩进初筛） */
  /* 只保留「顶层」声明：声明前到行首之间全是空白（无缩进）才算顶层 */
  const topLevel = (idx) => {
    const lineStart = js.lastIndexOf('\n', idx) + 1;
    return js.slice(lineStart, idx).length === 0;   // 行首到声明之间零字符 = 顶层
  };
  const dups = [];
  for (const [name, lines] of dupFn) {
    if (lines.length < 2) continue;
    const top = [];
    const re2 = new RegExp('(?:function\\s+' + name + '\\s*\\(|(?:const|let|var)\\s+' + name + '\\s*=)', 'g');
    let mm;
    while ((mm = re2.exec(js))) if (topLevel(mm.index)) top.push(lineOf(mm.index));
    if (top.length >= 2) dups.push({ name, lines: top });
  }

  /* ---------- 段2：悬空 onclick ---------- */
  const defined = new Set();
  const fnRe = /function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let f;
  while ((f = fnRe.exec(js))) defined.add(f[1]);
  const assignRe = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:function|async|\()/g;
  while ((f = assignRe.exec(js))) defined.add(f[1]);
  const winRe = /window\.([A-Za-z_$][\w$]*)\s*=/g;
  while ((f = winRe.exec(js))) defined.add(f[1]);
  const builtin = new Set(['go', 'toast', 'save', 'alert']);

  const onclickNames = new Map();
  const ocRe = /on(?:click|change|input|submit)\s*=\s*["']([^"']*)["']/g;
  let o;
  while ((o = ocRe.exec(html))) {
    const body = o[1];
    const callRe = /(^|[^.\w$])([A-Za-z_$][\w$]*)\s*\(/g;   // 排除 .method() 形式
    let c;
    while ((c = callRe.exec(body))) {
      const n = c[2];
      if (['if', 'for', 'while', 'return', 'function', 'typeof', 'catch', 'switch'].includes(n)) continue;
      if (!onclickNames.has(n)) onclickNames.set(n, html.slice(0, o.index).split('\n').length);
    }
  }
  const danglingHandler = [];
  for (const [n, ln] of onclickNames) {
    if (!defined.has(n) && !builtin.has(n)) danglingHandler.push({ name: n, line: ln });
  }

  /* ---------- 段3：悬空 getElementById ---------- */
  const ids = new Set();
  const idRe = /\bid\s*=\s*["']([^"']+)["']/g;
  while ((m = idRe.exec(html))) ids.add(m[1]);
  const gebRe = /getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;
  const danglingId = new Map();
  while ((m = gebRe.exec(js))) {
    const id = m[1];
    if (!ids.has(id) && !danglingId.has(id)) danglingId.set(id, lineOf(m.index));
  }

  return { dups, danglingHandler, danglingId: Array.from(danglingId, ([id, line]) => ({ id, line })), strict };
}

module.exports = { run };

if (require.main === module) {
  const r = run();
  let fail = 0, warn = 0;
  console.log('=== 段1 · 重名声明（覆盖风险） ===');
  if (!r.dups.length) console.log('  ✅ 无顶层重名声明');
  r.dups.forEach((x) => { fail++; console.log('  ❌ ' + x.name + ' 重复定义于行 ' + x.lines.join(' / ')); });

  console.log('=== 段2 · 悬空事件处理器 ===');
  if (!r.danglingHandler.length) console.log('  ✅ 全部可解析到定义');
  r.danglingHandler.forEach((x) => { warn++; console.log('  ⚠️ onclick 调用 ' + x.name + '()（行 ' + x.line + '）未找到定义'); });

  console.log('=== 段3 · 悬空 getElementById ===');
  if (!r.danglingId.length) console.log('  ✅ 全部能找到对应 id');
  r.danglingId.forEach((x) => { warn++; console.log('  ⚠️ getElementById("' + x.id + '")（行 ' + x.line + '）在 HTML 中无该 id'); });

  console.log('\n重名(FAIL)=' + fail + '  悬空(WARN)=' + warn);
  process.exit(fail || (r.strict && warn) ? 1 : 0);
}
