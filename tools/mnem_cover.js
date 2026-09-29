/* v3.9.0 · 口诀覆盖度体检
   用法：node tools/mnem_cover.js            全库统计
        node tools/mnem_cover.js math       只看某科目
   输出：① 每题都能拿到口诀（100% 兜底）② 考点规则命中率 ③ 各规则命中题数（0 命中的要改关键词）
*/
const path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'data', 'mnemonics.js'));
require(path.join(ROOT, 'data', 'subjectbank.js'));
require(path.join(ROOT, 'data', 'mathbank.js'));

const R = global.MNEM_DATA.rules;
const ALL = [].concat(global.SUBJ_BANK || [], global.MATH_BANK || []);
const onlySubj = process.argv[2] || '';

/* 与 index.html 里 mnemFor() 保持同一套逻辑（v3.10.2 起规则限同模块） */
function srcText(q){
  return [q.q, (q.o || []).join(' '), (q.ans || []).join(' '), q.sol, q.hint, q.mod]
    .map(s => String(s == null ? '' : s)).join(' ').toLowerCase();
}
function mnemHit(q){
  const s = srcText(q);
  const hit = [];
  for(const r of R){
    if(q.m && r.m && r.m !== q.m) continue;      // v3.10.2 跨模块串库修复（与 mnemFor 同步）
    for(const kw of r.k){
      if(s.indexOf(String(kw).toLowerCase()) >= 0){ hit.push(r); break; }
    }
    if(hit.length >= 3) break;
  }
  return hit;
}

const qs = onlySubj ? ALL.filter(q => q.subj === onlySubj) : ALL;
let withRule = 0;
const ruleCount = {}; R.forEach((r, i) => { ruleCount[i] = 0; });
qs.forEach(q => {
  const h = mnemHit(q);
  if(h.length) withRule++;
  h.forEach(r => { ruleCount[R.indexOf(r)]++; });
});
console.log('题库：' + qs.length + ' 题（' + (onlySubj || '全部') + '）  规则数：' + R.length);
console.log('考点规则命中：' + withRule + ' 题 = ' + (withRule / qs.length * 100).toFixed(1) + '%（其余走模块总纲兜底，仍有口诀）');
const zero = R.map((r, i) => [i, ruleCount[i], r.k[0]]).filter(x => x[1] === 0);
console.log('0 命中的规则：' + (zero.length ? zero.map(x => '#' + x[0] + '(' + x[2] + ')').join(' ') : '无'));
if(process.argv[3] === '-v'){
  R.forEach((r, i) => { if(ruleCount[i] > 0) console.log('  #' + i + ' ' + ruleCount[i] + ' 题  [' + r.k.slice(0, 3).join('/') + ']'); });
}
process.exit(zero.length > R.length * 0.25 ? 1 : 0);
