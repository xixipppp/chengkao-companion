/* v3.10.0 · 题级「做题步骤 + 考场口诀」覆盖度体检
   跑法：node tools/step_cover.js           —— 汇总
         node tools/step_cover.js m2 8      —— 抽样看某模块 N 题的真实输出
   判定：① 每题必须有 steps(≥2 步) 与 chant(≥8 字)
        ② 规则命中率（from==='rule'）越高越贴合，目标 ≥85%
        ③ 口诀里出现「''」「{}」等空填充 → 计为污染
*/
const path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'data', 'stepmnem.js'));
require(path.join(ROOT, 'data', 'subjectbank.js'));
require(path.join(ROOT, 'data', 'mathbank.js'));

const ALL = [].concat(global.SUBJ_BANK || [], global.MATH_BANK || []);
const QS = global.QSTEP;

let bad = [], dirty = [], rule = 0, mod = 0, subj = 0;
const byMod = {};
ALL.forEach(q => {
  const r = QS.build(q);
  const ok = r.steps.length >= 2 && r.chant.length >= 8;
  if (!ok) bad.push(q.id + '|' + q.m);
  if (/\{\w+\}|''|\s{2,}|（\s*）/.test(r.chant)) dirty.push(q.id + '|' + r.chant);
  if (r.from === 'rule') rule++; else if (r.from === 'module') mod++; else subj++;
  const b = byMod[q.m] || (byMod[q.m] = { n: 0, rule: 0 });
  b.n++; if (r.from === 'rule') b.rule++;
});

console.log('题库总数 ' + ALL.length);
console.log('规则命中 ' + rule + ' (' + (rule / ALL.length * 100).toFixed(1) + '%)  模块兜底 ' + mod + '  科目兜底 ' + subj);
console.log('无输出/不合格 ' + bad.length + '   口诀有空填充 ' + dirty.length);
if (bad.length) console.log('  例: ' + bad.slice(0, 5).join(', '));
if (dirty.length) console.log('  例: ' + dirty.slice(0, 5).join('  ||  '));
console.log('--- 分模块命中率 ---');
Object.keys(byMod).sort().forEach(m => {
  const b = byMod[m];
  const p = (b.rule / b.n * 100).toFixed(0);
  console.log('  ' + m + ': ' + b.rule + '/' + b.n + ' (' + p + '%)' + (p < 70 ? '  ⚠️偏低' : ''));
});

const a = process.argv[2];
if (a) {
  const n = parseInt(process.argv[3] || '6', 10);
  console.log('\n===== 抽样：' + a + ' =====');
  ALL.filter(q => q.m === a).slice(0, n).forEach(q => {
    const r = QS.build(q);
    console.log('\n【题】' + String(q.q).replace(/\s+/g, ' ').slice(0, 70));
    console.log('  答案: ' + (q.t === 'choice' && q.o ? q.o[q.a] : (q.ans || []).join(',')) + '   [' + r.from + ']');
    r.steps.forEach(s => console.log('   ' + s));
    console.log('  🎵 ' + r.chant);
  });
}
process.exit(bad.length || dirty.length ? 1 : 0);
