/* v3.10.0 · 教授级讲解库覆盖度体检
   跑法：node tools/lecture_cover.js             —— 汇总
         node tools/lecture_cover.js m2 1        —— 看某模块一题的完整六段讲解
   判定：① 每题必须六段齐全且内容非空
        ② 规则命中率（from==='rule'）
        ③ 讲解里不允许残留 {占位符} 或空值
*/
const path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'data', 'stepmnem.js'));
require(path.join(ROOT, 'data', 'lecture.js'));
require(path.join(ROOT, 'data', 'subjectbank.js'));
require(path.join(ROOT, 'data', 'mathbank.js'));

const ALL = [].concat(global.SUBJ_BANK || [], global.MATH_BANK || []);
const L = global.LECTURE, QS = global.QSTEP;

let bad = [], dirty = [], rule = 0, leadEmpty = 0;
const NEED = ['aim', 'brk', 'why', 'lead', 'trap', 'close'];
const byMod = {};
ALL.forEach(q => {
  const v = QS.pick(q);
  const r = L.build(q, v);
  const ids = r.seg.map(s => s.id);
  const miss = NEED.filter(n => ids.indexOf(n) < 0);
  const empty = r.seg.some(s => !s.lines.some(x => String(x).trim().length > 4));
  if (miss.length || empty) bad.push(q.id + '|缺:' + miss.join(',') + (empty ? '|空段' : ''));
  const allTxt = r.seg.map(s => s.lines.join(' ')).join(' ');
  if (/\{\w+\}/.test(allTxt)) dirty.push(q.id + '|' + allTxt.slice(0, 60));
  const ld = r.seg.find(s => s.id === 'lead');
  if (!ld || ld.lines.length < 2) leadEmpty++;
  if (r.from === 'rule') rule++;
  const b = byMod[q.m] || (byMod[q.m] = { n: 0, rule: 0 });
  b.n++; if (r.from === 'rule') b.rule++;
});

console.log('题库总数 ' + ALL.length);
console.log('规则命中 ' + rule + ' (' + (rule / ALL.length * 100).toFixed(1) + '%)  其余走科目骨架 + 解析分句');
console.log('段缺失/空段 ' + bad.length + '   残留占位符 ' + dirty.length + '   推演不足2步 ' + leadEmpty);
if (bad.length) console.log('  例: ' + bad.slice(0, 4).join('  '));
if (dirty.length) console.log('  例: ' + dirty.slice(0, 4).join('  ||  '));
console.log('--- 分模块命中率 ---');
console.log(Object.keys(byMod).sort().map(m => {
  const b = byMod[m], p = (b.rule / b.n * 100).toFixed(0);
  return m + ':' + p + '%';
}).join('  '));

const a = process.argv[2];
if (a) {
  const q = ALL.find(x => x.m === a);
  if (q) {
    const v = QS.pick(q);
    const r = L.build(q, v);
    console.log('\n===== 完整讲解演示：' + a + ' =====');
    console.log('题：' + String(q.q).replace(/\s+/g, ' ').slice(0, 70));
    r.seg.forEach(s => {
      console.log('\n【' + s.name + '】');
      s.lines.forEach(x => console.log('  · ' + x));
    });
  }
}
process.exit(bad.length || dirty.length ? 1 : 0);
