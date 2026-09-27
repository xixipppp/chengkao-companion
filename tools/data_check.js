#!/usr/bin/env node
/* data_check.js —— 题库数据契约校验（v3.4.1 新增，CI 门禁）
   背景：dup_check.js 只扫 index.html 内联脚本，data/*.js（全库最大代码量）长期无检。
   校验项（FAIL = 阻断 CI）：
     F1 四个 data 文件可解析、导出预期全局变量
     F2 题 ID 全库唯一（跨 subjectbank + mathbank）
     F3 选择题答案索引在选项范围内
     F4 同题干+同选项但答案不同（答案冲突，曾真实发生 eng26qz1_049 vs eng2019_053）
     F5 题干/选项/解析非空
   告警项（WARN = 只报告不阻断）：
     W1 完全重复题（同卷整段复制真题属已知的题库策略）
     W2 正文含 U+FFFD 替换字符（PDF 提取残损）
   运行：node tools/data_check.js   退出码：0 全绿 / 1 有 FAIL */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let fail = 0, warn = 0;
const F = (id, msg) => { fail++; console.log('[FAIL] ' + id + ' ' + msg); };
const W = (id, msg) => { warn++; console.log('[WARN] ' + id + ' ' + msg); };
const P = (id, msg) => console.log('[ OK ] ' + id + ' ' + msg);

/* ---------- F1 加载 ---------- */
function loadData(file, globals) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) { F('F1', file + ' 不存在'); return null; }
  const sandbox = { window: {} };
  try {
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(fp, 'utf8'), sandbox, { filename: file });
  } catch (e) {
    F('F1', file + ' 解析失败：' + e.message);
    return null;
  }
  const missing = globals.filter(g => sandbox.window[g] === undefined);
  if (missing.length) { F('F1', file + ' 未导出：' + missing.join(', ')); return null; }
  P('F1', file + ' 加载成功（' + globals.join(', ') + '）');
  return sandbox.window;
}

const subj = loadData('data/subjectbank.js', ['SUBJ_BANK', 'SUBJ_PASSAGES', 'SUBJ_MODULES']);
const math = loadData('data/mathbank.js', ['MATH_BANK', 'MATH_BANK_META']);
const kd = loadData('data/kaodian.js', ['KAODIAN']);
const gp = loadData('data/goldpoints.js', ['GOLD_POINTS']);
if (!subj || !math) { console.log('\ndata_check: FAIL（核心题库加载失败）'); process.exit(1); }

const ALL = [].concat(subj.SUBJ_BANK || [], math.MATH_BANK || []);
console.log('题库总量（不含 index.html 内置 66 题）：' + ALL.length);

/* ---------- F2 ID 唯一 ---------- */
{
  const seen = new Map(); const dup = [];
  ALL.forEach(q => {
    if (!q || q.id == null) { dup.push('<缺失 id>'); return; }
    if (seen.has(q.id)) dup.push(q.id + '（' + seen.get(q.id) + ' / ' + (q.paper || '?') + '）');
    else seen.set(q.id, q.paper || '?');
  });
  dup.length ? F('F2', '题 ID 冲突 ' + dup.length + ' 个：' + dup.slice(0, 5).join('；'))
             : P('F2', '题 ID 全库唯一（' + seen.size + '）');
}

/* ---------- F3 答案越界 ---------- */
{
  const bad = ALL.filter(q => q && q.t !== 'fill' && Array.isArray(q.o) &&
    (typeof q.a !== 'number' || q.a < 0 || q.a >= q.o.length));
  bad.length ? F('F3', '答案越界/类型错误 ' + bad.length + ' 题：' + bad.slice(0, 5).map(q => q.id).join(','))
             : P('F3', '选择题答案索引全部在选项范围内');
}

/* ---------- F4 答案冲突（同题不同答） ---------- */
{
  const map = new Map(); const conflicts = [];
  ALL.forEach(q => {
    if (!q || q.t === 'fill' || !Array.isArray(q.o)) return;
    const k = String(q.q || '').trim() + '|' + JSON.stringify(q.o);
    if (map.has(k)) {
      const g = map.get(k);
      if (g[0].a !== q.a) conflicts.push(g[0].id + '(a=' + g[0].a + ') vs ' + q.id + '(a=' + q.a + ')');
      g.push(q);
    } else map.set(k, [q]);
  });
  conflicts.length ? F('F4', '同题不同答案 ' + conflicts.length + ' 组：' + conflicts.slice(0, 3).join('；'))
                   : P('F4', '无「同题干同选项不同答案」冲突');
}

/* ---------- F5 字段完整性 ---------- */
{
  const badQ = ALL.filter(q => !q || !String(q.q || '').trim());
  const badO = ALL.filter(q => q && q.t !== 'fill' && (!Array.isArray(q.o) || q.o.length < 2 || q.o.some(x => !String(x || '').trim())));
  const badA = ALL.filter(q => q && q.t === 'fill' && (!Array.isArray(q.ans) || !q.ans.length));
  const badS = ALL.filter(q => q && !String(q.sol || '').trim());
  // v3.4.1 议案 A：mathbank 须在数据层固化 subj/mod，不允许再靠运行时补丁
  const badM = (math.MATH_BANK || []).filter(q => q.subj !== 'math' || !q.mod);
  badQ.length ? F('F5', '题干为空 ' + badQ.length + ' 题') : P('F5', '题干无空值');
  badO.length ? F('F5', '选项缺失/含空项 ' + badO.length + ' 题：' + badO.slice(0, 5).map(q => q.id).join(','))
              : P('F5', '选项完整无空项');
  badA.length ? F('F5', '填空题缺 ans ' + badA.length + ' 题') : P('F5', '填空题 ans 齐全');
  badM.length ? F('F5', 'mathbank 缺 subj/mod ' + badM.length + ' 题（议案 A 回归）')
              : P('F5', 'mathbank subj/mod 数据层全覆盖');
  badS.length ? W('F5', '解析为空 ' + badS.length + ' 题（不阻断）') : P('F5', '解析无空值');
}

/* ---------- F6/F7 重复题标注契约（v3.4.1 议案 B：与 index.html dupReal 同构的归一化键） ---------- */
{
  const norm = s => (s || '').replace(/\s+/g, '').replace(/[，。、,.;；:：？?！!]/g, '');
  const keyOf = q => (q.subj || '') + '|' + norm(q.q) + '|' + (q.o ? norm(q.o.join('#')) : (q.ans ? norm(q.ans.join('#')) : norm(q.answer || '')));
  const isMock = q => /模拟|押题|揭秘|考前/.test(q.paper || '');
  const ids = new Set(ALL.map(q => q.id));
  const byId = new Map(ALL.map(q => [q.id, q]));

  // F6：src='mock-copy' 的 ref 必须指向存在的、非模拟卷的题
  const marked = ALL.filter(q => q && q.src === 'mock-copy');
  const dangling = marked.filter(q => !ids.has(q.ref));
  const toMock = marked.filter(q => { const t = byId.get(q.ref); return t && isMock(t); });
  (dangling.length || toMock.length)
    ? F('F6', 'mock-copy 标注异常：ref 悬空 ' + dangling.length + ' / ref 指向模拟卷 ' + toMock.length)
    : P('F6', 'mock-copy 标注 ref 全部有效（' + marked.length + ' 条）');

  // F7：归一化重复组中，凡有真题源的模拟卷题必须带标注（未标注 = FAIL）
  const byKey = new Map();
  ALL.forEach(q => { if (!q) return; const k = keyOf(q); (byKey.get(k) || byKey.set(k, []).get(k)).push(q); });
  let unmarked = 0, mockOnlyGroups = 0, groups = 0;
  byKey.forEach(g => {
    if (g.length < 2) return;
    const mocks = g.filter(isMock), reals = g.filter(q => !isMock(q));
    if (mocks.length && reals.length) { groups++; unmarked += mocks.filter(q => q.src !== 'mock-copy').length; }
    else if (mocks.length > 1) mockOnlyGroups++;
  });
  unmarked ? F('F7', '重复题未标注 src/ref ' + unmarked + ' 条（应跑 tools 迁移或补标）')
           : P('F7', '重复组全部完成标注（' + groups + ' 组）');
  if (mockOnlyGroups) W('F7', '模拟卷间互重 ' + mockOnlyGroups + ' 组（无真题源可指，保留观察）');
}

/* ---------- W2 U+FFFD 乱码 ---------- */
[['data/kaodian.js', kd && kd.KAODIAN], ['data/goldpoints.js', gp && gp.GOLD_POINTS]].forEach(([f, obj]) => {
  // goldpoints 为 {ver,data:{...}} 结构，kaodian 为数组；统一扁平化为文本条目再扫
  let arr = [];
  if (Array.isArray(obj)) arr = obj;
  else if (obj && obj.data) Object.keys(obj.data).forEach(k => { (obj.data[k] || []).forEach(ch => {
    (ch.pts || [ch]).forEach(p => arr.push(p));
  }); });
  if (!arr.length) { W('W2', f + ' 未参与扫描（结构为空或未识别）'); return; }
  const bad = arr.filter(x => x && /�/.test(JSON.stringify(x)));
  bad.length ? W('W2', f + ' 含 U+FFFD 乱码 ' + bad.length + ' 条（PDF 提取残损，待重跑生成脚本）')
             : P('W2', f + ' 无乱码');
});

/* ---------- F8 kaodian img 条目契约（v3.4.1 议案 D） ---------- */
if (kd && Array.isArray(kd.KAODIAN)) {
  const bad = kd.KAODIAN.filter(d => d && d.kind === 'img' && !(Array.isArray(d.imgs) && d.imgs.length));
  bad.length ? F('F8', 'kind:img 但无图的条目 ' + bad.length + ' 条：' + bad.slice(0, 3).map(d => d.title).join('；'))
             : P('F8', 'img 条目均有图（' + kd.KAODIAN.filter(d => d && d.kind === 'img').length + ' 条）');
}

console.log('\ndata_check: ' + (fail ? ('FAIL ' + fail + ' 项') : 'PASS') + (warn ? '（WARN ' + warn + ' 项）' : ''));
process.exit(fail ? 1 : 0);
