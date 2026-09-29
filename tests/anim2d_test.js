// v3.5.0 · 2D 动画讲解引擎（data/anim2d.js）单元测试
// 关注四件事：① 时长落在 30~60 秒 ② 场景序列完整 ③ 不编造内容（文字全部可溯源）④ 残缺题目能降级不崩
const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = global;                       // 题库脚本是 window.xxx = ...
require(path.join(ROOT, 'data', 'anim2d.js'));
require(path.join(ROOT, 'data', 'subjectbank.js'));
require(path.join(ROOT, 'data', 'mathbank.js'));
require(path.join(ROOT, 'data', 'mnemonics.js'));   // v3.9.0：让「记忆口诀」场景也进入单测

const A = global.Anim2D;
const ALL = [].concat(global.SUBJ_BANK || [], global.MATH_BANK || []);

let pass = 0, fail = 0;
function ok(cond, name, extra){
  if(cond){ pass++; }
  else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); }
}
function plain(s){ return String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

/* 允许出现的「模板文案」（不含题目内容，属讲解串词） */
const TEMPLATE = [
  '先看清题目到底在问什么', '四个选项，先别急着选', '把每项都读一遍',
  '这题暂无文字解析，先记住套路', '填空题：先找已知，再找要你求什么', '答案要写最简形式',
  '再看一遍 ↻', '这题暂无文字解析，先看答案反推每一步'
];
function isTemplate(t){
  if(TEMPLATE.indexOf(t) >= 0) return true;
  if(/^先定方法：/.test(t)) return true;                      // v3.9.0 破题思路串词 + 题目 hint
  if(/^排除 [A-H]$/.test(t)) return true;                    // 排除 A
  if(/^第 \d+ 步 · /.test(t)) return true;                   // 第 N 步 · 内容截断
  if(/^记住：/.test(t)) return true;
  if(/^正确答案是 [A-H]$/.test(t)) return true;
  if(t === '答案揭晓') return true;
  if(/^答案：/.test(t)) return true;
  if(/^[A-H]\. /.test(t)) return true;
  return false;
}
function sourceText(q){
  return [q.q, (q.o || []).join(' '), (q.ans || []).join(' '), q.sol, q.hint, q.mod, q.paper]
    .map(plain).join('  ');
}
/* 字幕/画面文字必须能溯源到题面、选项、答案、解析、提示之一 */
function traceable(text, q){
  const t = plain(text);
  if(!t) return true;
  if(isTemplate(t)) return true;
  const src = sourceText(q);
  if(src.indexOf(t) >= 0) return true;
  // 片头卡是「科目 · 试卷 · 题号 · 模块」组合串，逐段校验
  if(t.indexOf(' · ') >= 0){
    return t.split(' · ').every(part => {
      const p = part.trim();
      if(!p) return true;
      if(['政治', '英语', '高数（二）'].indexOf(p) >= 0) return true;   // 科目名由 q.subj 派生
      if(/^第\s*\d+\s*题$/.test(p)) return true;
      if(p === q.id) return true;
      return src.indexOf(p) >= 0;
    });
  }
  // 「第 N 步 · xxx」「记住：xxx」这类前缀 + 截断内容：校验正文片段
  const body = t.replace(/^第 \d+ 步 · /, '').replace(/^记住：/, '').replace(/^答案：/, '').replace(/^先定方法：/, '')
                .replace(/^[A-H]\. /, '').replace(/^正确答案是 [A-H]$/, '');
  const cut = body.replace(/…$/, '').slice(0, 20);
  return cut.length >= 2 && src.indexOf(cut) >= 0;
}

console.log('=== anim2d 单元测试 ===');
ok(!!(A && A.build && A.open && A.renderFrame), '引擎导出 build/open/renderFrame', Object.keys(A || {}).join(','));
ok(ALL.length > 2000, '题库加载完成', '共 ' + ALL.length + ' 题');

/* ---------- ① 全库时长与结构 ---------- */
let badDur = [], badScene = [], badCap = [], bySubj = {};
ALL.forEach(q => {
  const sp = A.build(q);
  const k = sp.subj + '/' + sp.t;
  bySubj[k] = (bySubj[k] || 0) + 1;
  if(!(sp.total >= 29.9 && sp.total <= 60.1)) badDur.push(q.id + '=' + sp.total.toFixed(1));
  const ids = sp.scenes.map(s => s.id).join(',');
  /* v3.9.0 新分镜：片头 → 题干 → 破题思路 → 选项/求解目标 →（解析不足时才用）排除法
     → 解析推演（主体）→ 答案揭晓 → 记忆口诀 → 结尾记忆点
     硬规则：解析推演必须在答案揭晓之前（先讲清为什么，再给答案） */
  const has = id => sp.scenes.some(s => s.id === id);
  const need = ['cover', 'stem'];
  if(has('hint')) need.push('hint');
  need.push(sp.isChoice ? 'options' : 'ask');
  if(has('eliminate')) need.push('eliminate');
  need.push('solution', 'reveal');
  if(has('mnem')) need.push('mnem');
  need.push('outro');
  if(ids !== need.join(',')) badScene.push(q.id + '=' + ids);
  const iSol = sp.scenes.findIndex(s => s.id === 'solution');
  const iRev = sp.scenes.findIndex(s => s.id === 'reveal');
  if(!(iSol >= 0 && iRev >= 0 && iSol < iRev)) badScene.push(q.id + '@order');
  if(!sp.caps.length) badCap.push(q.id);
  // 时间轴必须首尾相接、无空洞
  let t = 0;
  sp.scenes.forEach(s => { if(Math.abs(s.t0 - t) > 1e-6) badCap.push(q.id + '@gap'); t = s.t1; });
  if(Math.abs(t - sp.total) > 1e-6) badCap.push(q.id + '@total');
});
console.log('覆盖题型：', JSON.stringify(bySubj));
ok(badDur.length === 0, '全库成片时长都在 30~60 秒', badDur.slice(0, 3).join(', ') + ' 共 ' + badDur.length);
ok(badScene.length === 0, '全库场景序列符合分镜（选择 7 场 / 填空 6 场）', badScene.slice(0, 3).join(' | ') + ' 共 ' + badScene.length);
ok(badCap.length === 0, '全库时间轴连续且字幕非空', badCap.slice(0, 3).join(', ') + ' 共 ' + badCap.length);

/* ---------- ② 不编造：字幕文字全部可溯源 ---------- */
let untrace = [];
const sample = [];
['pol', 'eng', 'math'].forEach(s => {
  const pick = ALL.filter(q => q.subj === s && q.t === 'choice');
  for(let i = 0; i < 20 && i < pick.length; i++) sample.push(pick[Math.floor(i * pick.length / 20)]);
});
ALL.filter(q => q.t === 'fill').slice(0, 20).forEach(q => sample.push(q));
sample.forEach(q => {
  const sp = A.build(q);
  sp.caps.forEach(c => { if(!traceable(c.text, q)) untrace.push(q.id + ' « ' + c.text); });
});
ok(untrace.length === 0, '抽样 ' + sample.length + " 题字幕全部可溯源（无编造）", untrace.slice(0, 3).join(' | ') + ' 共 ' + untrace.length);

/* ---------- ③ 内容保真：题面/选项/答案/解析与题库一致 ---------- */
let badProv = [];
sample.forEach(q => {
  const sp = A.build(q);
  const p = sp.prov;
  if(plain(p.stem) !== plain(q.q)) badProv.push(q.id + '@stem');
  if(sp.isChoice){
    if(p.opts.length !== q.o.length) badProv.push(q.id + '@optN');
    else q.o.forEach((o, i) => { if(plain(p.opts[i]) !== plain(o)) badProv.push(q.id + '@opt' + i); });
    if(plain(p.answer) !== plain(q.o[q.a])) badProv.push(q.id + '@ans');
  } else {
    if(plain(p.answer) !== plain((q.ans || []).join(' / '))) badProv.push(q.id + '@fillAns');
  }
  if(p.hasSol) p.steps.forEach(st => { if(plain(q.sol).indexOf(plain(st)) < 0) badProv.push(q.id + '@step'); });
});
ok(badProv.length === 0, '题面/选项/答案/解析步骤逐字一致', badProv.slice(0, 3).join(', ') + ' 共 ' + badProv.length);

/* ---------- ④ 三科差异化舞台确实生效 ---------- */
const mm = ['m1', 'm2', 'm3'].map(m => {
  const q = ALL.find(x => x.subj === 'math' && x.m === m);
  return q ? A.build(q) : null;
}).filter(Boolean);
ok(mm.length === 3, '高数三个模块（极限/导数/积分）都能取到题', '取到 ' + mm.length);
const pq = ALL.find(x => x.subj === 'pol');
const eq = ALL.find(x => x.subj === 'eng' && x.m === 'e4');
ok(pq && A.build(pq).kw.length >= 2, '政治题能抽出概念关键词', pq ? A.build(pq).kw.join('/') : '无题');
ok(eq && A.build(eq).ewords.length >= 3, '英语题能抽出词序列（聚光扫描）', eq ? A.build(eq).ewords.length + ' 词' : '无题');

/* ---------- ⑤ 残缺题目降级（不崩、不编造答案） ---------- */
let degenOk = true, degenMsg = '';
try{
  const d1 = A.build({ id:'t1', subj:'pol', m:'p1', t:'choice', q:'测试题干', o:['甲','乙','丙','丁'], a:2 });
  if(!(d1.total >= 29.9 && d1.total <= 60.1)) { degenOk = false; degenMsg = '无解析题时长 ' + d1.total; }
  if(d1.prov.hasSol || d1.prov.solFrom !== 'none') { /* hint 也没有 → none */ }
  if(d1.prov.answer !== '丙') { degenOk = false; degenMsg = '答案取错 ' + d1.prov.answer; }

  const d2 = A.build({ id:'t2', subj:'math', m:'m1', t:'fill', q:'求 x' });
  if(!(d2.total >= 29.9 && d2.total <= 60.1)) { degenOk = false; degenMsg = '无答案填空题时长 ' + d2.total; }
  if(d2.prov.answer !== '') { degenOk = false; degenMsg = '编造了答案：' + d2.prov.answer; }

  const d3 = A.build({ id:'t3', subj:'eng', m:'e2', t:'choice', q:'只有题干', sol:'只有解析。' });
  if(d3.isChoice) { degenOk = false; degenMsg = '无选项应降级为填空题型'; }
  if(!(d3.total >= 29.9 && d3.total <= 60.1)) { degenOk = false; degenMsg = '无选项降级时长 ' + d3.total; }

  const d4 = A.build(null);
  if(!(d4.total >= 29.9 && d4.total <= 60.1)) { degenOk = false; degenMsg = '空对象时长 ' + d4.total; }
}catch(e){ degenOk = false; degenMsg = '抛异常：' + e.message; }
ok(degenOk, '残缺题目（无解析/无答案/无选项/空题）能降级不崩且不编造', degenMsg);

/* ---------- ⑥ 确定性：同一题两次编译结果完全一致 ---------- */
const q0 = ALL[100];
const s1 = A.build(q0), s2 = A.build(q0);
ok(Math.abs(s1.total - s2.total) < 1e-9 && s1.caps.length === s2.caps.length,
   '同一题两次编译完全一致（可 seek / 可重放）', s1.total + ' vs ' + s2.total);

/* ---------- ⑦ 字幕样式硬规范：加大字号 + 黑色描边 ---------- */
const srcText = require('fs').readFileSync(path.join(ROOT, 'data', 'anim2d.js'), 'utf8');
ok(/strokeText/.test(srcText) && /fillText/.test(srcText), '文字先描边后填充（黑色描边硬规范）');
ok(/FS\.cap\s*=\s*64|cap:\s*64/.test(srcText), '字幕字号为 64（加大一号）');
ok(!/\(\?<=/.test(srcText), '未使用正则 lookbehind（iOS Safari 16.4 以下会语法错误）');

console.log('\n通过 ' + pass + ' / ' + (pass + fail));
console.log(fail === 0 ? 'anim2d_test: PASS' : 'anim2d_test: FAIL');
process.exit(fail === 0 ? 0 : 1);
