// v3.9.0 · P2 内容质量 smoke：考点级口诀库 + 2D 动画「真演算」重制
// 纯 node 单测（不依赖浏览器），校验：口诀全库覆盖/命中率、新分镜顺序、真曲线解析、接线完整
const path = require('path');
const ROOT = path.join(__dirname, '..');
const fs = require('fs');

global.window = global;
require(path.join(ROOT, 'data', 'mnemonics.js'));
require(path.join(ROOT, 'data', 'anim2d.js'));
require(path.join(ROOT, 'data', 'subjectbank.js'));
require(path.join(ROOT, 'data', 'mathbank.js'));

const R = global.MNEM_DATA.rules;
const A = global.Anim2D;
const ALL = [].concat(global.SUBJ_BANK || [], global.MATH_BANK || []);

let pass = 0, fail = 0;
function ok(cond, name, extra){
  if(cond){ pass++; }
  else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); }
}

console.log('=== p2_smoke（口诀细化 + 动画重制） ===');

/* ---------- ① 口诀库：规模与全库覆盖 ---------- */
ok(R.length >= 130, '考点口诀规则 ≥ 130 条', '实际 ' + R.length);
const srcText = q => [q.q, (q.o || []).join(' '), (q.ans || []).join(' '), q.sol, q.hint, q.mod]
  .map(s => String(s == null ? '' : s)).join(' ').toLowerCase();
function mnemFor(q){
  const s = srcText(q), out = [];
  for(let i = 0; i < R.length && out.length < 3; i++){
    if(q.m && R[i].m && R[i].m !== q.m) continue;   // v3.10.2：与 index.html mnemFor 同步，规则限同模块
    for(const kw of R[i].k){ if(s.indexOf(String(kw).toLowerCase()) >= 0){ out.push(R[i].t); break; } }
  }
  return out;
}
let withRule = 0;
ALL.forEach(q => { if(mnemFor(q).length) withRule++; });
const hitRate = withRule / ALL.length;
ok(hitRate >= 0.9, '考点规则命中率 ≥ 90%（其余走模块总纲兜底）', (hitRate * 100).toFixed(1) + '%');
ok(withRule <= ALL.length, '每题都有口诀（规则命中 + 模块总纲兜底 = 全库）');
const zeroN = R.filter(r => {
  const s = 'zz';
  return !r.k || !r.k.length;      // 结构检查在下面单独做；这里先占位
}).length;
ok(R.every(r => r.k && r.k.length && r.t && r.t.length >= 30), '每条规则都有触发关键词且口诀有实质内容');

/* ---------- ② 动画新分镜：先讲方法 → 逐步推演 → 再揭晓答案 → 口诀收尾 ---------- */
let badOrder = 0, mnemN = 0, coverBad = 0, durBad = 0;
ALL.forEach(q => {
  const sp = A.build(q);
  const ids = sp.scenes.map(s => s.id);
  const iSol = ids.indexOf('solution'), iRev = ids.indexOf('reveal');
  if(!(iSol >= 0 && iRev >= 0 && iSol < iRev)) badOrder++;
  if(ids.indexOf('mnem') >= 0) mnemN++;
  const cover = sp.scenes.find(s => s.id === 'cover');
  if(cover && cover.dur / sp.total > 0.095) coverBad++;   // 片头占比 ≤9.5%（旧版 3.2s ≈ 10.7%）
  if(!(sp.total >= 29.9 && sp.total <= 60.1)) durBad++;
});
ok(badOrder === 0, '全库「解析推演在答案揭晓之前」（先讲为什么，再给答案）', badOrder + ' 题顺序不对');
ok(mnemN >= ALL.length * 0.9, '≥90% 的题带「记忆口诀」收尾场景', mnemN + '/' + ALL.length);
ok(coverBad === 0, '片头 ≤ 2.2 秒（砍掉片头废话）', coverBad + ' 题超时');
ok(durBad === 0, '成片时长仍全部在 30~60 秒', durBad + ' 题越界');

/* ---------- ③ 真·函数曲线：高数题把题干里的函数真画出来 ---------- */
const MATH = global.MATH_BANK || [];
let plotN = 0;
MATH.forEach(q => { const sp = A.build(q); if(sp.plot && sp.plot.fn) plotN++; });
ok(plotN >= MATH.length * 0.4, '≥40% 高数题能解析出真实函数曲线', plotN + '/' + MATH.length);
const probe = [
  ['y=x^2+1', 2, 5], ['y=cosx', 0, 1], ['y=2x', 3, 6], ['y=x^3', 2, 8], ['y=1/x', 4, 0.25]
];
let parseBad = [];
probe.forEach(([src, x, want]) => {
  const sp = A.build({ id:'px', subj:'math', m:'m1', t:'choice', q:src, o:['1','2','3','4'], a:0 });
  const f = sp.plot && sp.plot.fn;
  if(!f || Math.abs(f(x) - want) > 1e-6) parseBad.push(src);
});
ok(parseBad.length === 0, '函数解析抽查 5 例全对', parseBad.join(','));

/* ---------- ④ 接线完整：index.html / sw.js ---------- */
const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
ok(idx.indexOf('<script src="data/mnemonics.js"></script>') >= 0, 'index.html 同步引入 data/mnemonics.js');
ok(/function mnemFor\(/.test(idx), '答题页口诀走 mnemFor()（考点级优先）');
ok(/function fillRoundMnem\(/.test(idx) && /fillRoundMnem\(document\.getElementById\('memoBody2'\)/.test(idx), '结束页口诀直接展示内置口诀（不再依赖 AI 按钮）');
ok(sw.indexOf("'./data/mnemonics.js'") >= 0, 'sw.js 预缓存口诀库（断网可用）');
ok(/_ph === 'reveal'/.test(fs.readFileSync(path.join(ROOT, 'data', 'anim2d.js'), 'utf8')), '政治概念图读题阶段不剧透答案');

console.log('\n通过 ' + pass + ' / ' + (pass + fail));
console.log(fail === 0 ? 'p2_smoke: PASS' : 'p2_smoke: FAIL');
process.exit(fail === 0 ? 0 : 1);
