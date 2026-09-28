/* anim2d 时长预算跑批校验（docs/anim2d_storyboard.md §6 的可执行版本）
 * 用途：不依赖 index.html / canvas，用真实题库验证 §6.2 的时长常量能保证
 *       全库成片落在 30~60s。
 * 用法：node tools/anim2d_dur_check.js           跑批全库，越界则 exit 1
 *       node tools/anim2d_dur_check.js --sample  额外打印 5 个样例的分场景时长
 * 说明：本文件只校验「时长」，不校验画面；画面以 data/anim2d.js 为准。
 *       两者时长口径若不一致，以本文件常量表（规范 §6.2）为准并回写实现。
 */
'use strict';
global.window = global;
const path = require('path');
const ROOT = path.join(__dirname, '..');
require(path.join(ROOT, 'data', 'subjectbank.js'));
require(path.join(ROOT, 'data', 'mathbank.js'));
const A = [].concat(window.SUBJ_BANK || [], window.MATH_BANK || []);

/* ── 常量：与 docs/anim2d_storyboard.md §6.2 DUR / FLOOR 表一一对应 ── */
const DUR = {
  READ_RATE: 5.5, MIN_DWELL: 1.2, MAX_DWELL: 4.8, GAP: 0.15,
  INTRO: 2.4, OUTRO: 3.0,
  T_MIN: 30, T_MAX: 60, T_SOFT_MAX: 56, T_SOFT_MIN: 31,
  MAX_STEPS: 8, RECAP_MAX: 6.0, STRETCH_MAX: 1.6, SHOW_HINT: true,
};
const FLOOR = {
  S01: [2.4, 2.4], S02: [3.2, 9.0], S03: [2.6, 6.5], S03B: [1.8, 4.4], S03F: [2.0, 4.2],
  S04: [1.2, 2.6], S04F: [1.4, 2.6], S05: [2.4, 4.2], STEP: [1.8, 5.2],
  S05F: [1.8, 5.2], S06F: [1.8, 3.0], S07: [2.6, 4.4], S08: [3.0, 3.0], S09: [2.0, 6.0],
};

const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const chW = c => { if (/\s/.test(c)) return 0; return /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(c) ? 1 : 0.5; };
function C(s) { let n = 0; for (const c of Array.from(String(s || ''))) n += chW(c); return n; }
/* 切屏：每屏 2 行 × 14 字 = 28 视觉字（视觉规范 §3.3） */
function screensOf(text, cap) {
  cap = cap || 28;
  const clauses = String(text || '').split(/(?<=[。！？；;，、,：:])/).filter(Boolean);
  const out = []; let cur = '';
  const chop = c => {
    const ps = []; let acc = 0, buf = '';
    for (const ch of Array.from(c)) {
      const w = chW(ch);
      if (acc + w > cap) { ps.push(buf); buf = ''; acc = 0; }
      buf += ch; acc += w;
    }
    if (buf) ps.push(buf);
    return ps;
  };
  for (const c of clauses) for (const p of (C(c) > cap ? chop(c) : [c])) {
    if (cur && C(cur) + C(p) > cap) { out.push(C(cur)); cur = p; } else cur += p;
    if (C(cur) >= cap) { out.push(C(cur)); cur = ''; }
  }
  if (cur) out.push(C(cur));
  return out.length ? out : [0];
}
const dwell = sc => sc.reduce((a, c) => a + cl(c / DUR.READ_RATE, DUR.MIN_DWELL, DUR.MAX_DWELL), 0);

function timeline(q) {
  const S = [];
  const push = (id, dur, f) => S.push({ id: id, dur: cl(dur, f[0], f[1]), min: f[0], max: f[1] });
  push('S01', DUR.INTRO, FLOOR.S01);
  const perW = q.subj === 'eng' ? 26 : (q.subj === 'math' ? 22 : 20);
  const L = Math.max(1, Math.ceil(C(q.q) / perW));
  let sc = screensOf(q.q);
  if (C(q.q) > 84) sc = sc.slice(0, 2);                        // §6.5 长题干截断
  push('S02', Math.max(0.42 + 0.09 * (L - 1), dwell(sc)) + DUR.GAP, FLOOR.S02);
  const isF = q.t === 'fill';
  const n = (q.o || []).length;
  if (isF) {
    push('S03F', Math.max(0.42 + 0.09 * (L - 1), cl(C(q.q) / DUR.READ_RATE, 1.2, 3.0)) + DUR.GAP, FLOOR.S03F);
  } else {
    const Cmax = Math.max.apply(null, (q.o || []).map(x => C(x)));
    push('S03', (0.48 + 0.11 * (n - 1)) + cl(Cmax / DUR.READ_RATE, 1.2, 3.6) + DUR.GAP, FLOOR.S03);
  }
  if (DUR.SHOW_HINT) push('S03B', 0.42 + cl(C(q.hint) / DUR.READ_RATE, 1.5, 4.0) + DUR.GAP, FLOOR.S03B);
  if (isF) {
    push('S04F', 0.36 + cl(8 / DUR.READ_RATE, 1.2, 2.0) + DUR.GAP, FLOOR.S04F);
  } else {
    push('S04', (0.46 + 0.22 * (n - 2)) + 0.5 + DUR.GAP, FLOOR.S04);
  }
  let steps = String(q.sol || '').split(/[。；;]/).map(s => s.trim()).filter(s => s.length > 1);
  if (steps.length > DUR.MAX_STEPS) steps = steps.slice(0, DUR.MAX_STEPS - 1).concat([steps[steps.length - 1]]);
  if (isF) {
    steps.forEach(st => push('S05F', 0.42 + cl(C(st) / DUR.READ_RATE, DUR.MIN_DWELL, DUR.MAX_DWELL) + DUR.GAP, FLOOR.STEP));
    push('S06F', 0.62 + cl((C((q.ans || [])[0]) + 4) / DUR.READ_RATE, 1.4, 2.6) + DUR.GAP, FLOOR.S06F);
  } else {
    push('S05', 0.62 + cl((C((q.o || [])[q.a]) + 4) / DUR.READ_RATE, 1.4, 3.4) + DUR.GAP, FLOOR.S05);
    steps.forEach(st => push('S06', 0.42 + cl(C(st) / DUR.READ_RATE, DUR.MIN_DWELL, DUR.MAX_DWELL) + DUR.GAP, FLOOR.STEP));
  }
  const mem = (steps[steps.length - 1]) || q.hint || '';
  push('S07', 0.42 + 0.56 + cl(C(mem) / DUR.READ_RATE, DUR.MIN_DWELL, 3.4) + DUR.GAP, FLOOR.S07);
  push('S08', DUR.OUTRO, FLOOR.S08);

  const FIXED = ['S01', 'S08'];
  const FLEX = ['S02', 'S03', 'S03B', 'S03F', 'S05F', 'S06', 'S06F', 'S07'];
  const sum = () => S.reduce((a, s) => a + s.dur, 0);
  let T = sum(); const raw = T; let recap = 0;

  if (T > DUR.T_SOFT_MAX) {                                    // A. 压缩
    const k = DUR.T_SOFT_MAX / T;
    S.forEach(s => { if (FLEX.indexOf(s.id) >= 0) s.dur = Math.max(s.dur * k, s.min * 0.85); });
    T = sum();
    if (T > DUR.T_MAX) { const k2 = DUR.T_MAX / T; S.forEach(s => { if (FIXED.indexOf(s.id) < 0) s.dur *= k2; }); T = sum(); }
  }
  if (T < DUR.T_SOFT_MIN) {                                    // B. 先补内容，再轻度拉伸
    recap = cl(DUR.T_SOFT_MIN - T, 2.0, DUR.RECAP_MAX); T += recap;
    if (T < DUR.T_SOFT_MIN) {
      const k = Math.min(DUR.T_SOFT_MIN / (T - recap), DUR.STRETCH_MAX);
      S.forEach(s => { if (FLEX.indexOf(s.id) >= 0) s.dur = Math.min(s.dur * k, s.max * 1.5); });
      T = sum() + recap;
    }
    if (recap > 0) S.push({ id: 'S09', dur: recap, min: FLOOR.S09[0], max: FLOOR.S09[1] });
    if (T < DUR.T_MIN) T = DUR.T_MIN + 0.5;
  }
  T = Math.round(T * 1000) / 1000;                             // 消除浮点漂移（务必保留）
  return { scenes: S, raw: +raw.toFixed(1), recap: +recap.toFixed(1), total: T };
}

/* ── 跑批 ── */
const raw = [], tot = []; const bad = []; let nrecap = 0;
A.forEach(q => {
  const r = timeline(q);
  raw.push(r.raw); tot.push(r.total);
  if (r.recap > 0) nrecap++;
  if (r.total < DUR.T_MIN || r.total > DUR.T_MAX) bad.push([q.id, r.total]);
});
const srt = a => a.slice().sort((x, y) => x - y);
const p = (a, x) => srt(a)[Math.floor(a.length * x)].toFixed(1);
console.log('anim2d 时长预算跑批 · 题库 n=' + A.length);
console.log('  raw  : p10=' + p(raw, .1) + '  p50=' + p(raw, .5) + '  p90=' + p(raw, .9) + '  max=' + srt(raw)[raw.length - 1].toFixed(1));
console.log('  T    : min=' + srt(tot)[0].toFixed(1) + '  p10=' + p(tot, .1) + '  p50=' + p(tot, .5) + '  p90=' + p(tot, .9) + '  max=' + srt(tot)[tot.length - 1].toFixed(1));
console.log('  补 S09 比例=' + (nrecap / A.length * 100).toFixed(0) + '%   越界=' + bad.length);

if (process.argv.indexOf('--sample') >= 0) {
  console.log('\n样例：');
  const e4 = A.filter(x => x.m === 'e4');
  const fl = A.filter(x => x.t === 'fill');
  const pick = [
    A.find(x => x.id === 'pol26qz1_001'),
    e4[Math.floor(e4.length / 2)],
    e4.slice().sort((a, b) => (b.sol || '').length - (a.sol || '').length)[0],
    fl.slice().sort((a, b) => C(a.q) - C(b.q))[0],
    fl.slice().sort((a, b) => C(b.q) - C(a.q))[0],
  ];
  pick.forEach(q => {
    if (!q) return;
    const r = timeline(q);
    console.log('  ' + q.id + ' [' + q.subj + '/' + q.m + '/' + q.t + '] raw=' + r.raw + ' recap=' + r.recap + ' T=' + r.total);
    console.log('     ' + r.scenes.map(s => s.id + ':' + s.dur.toFixed(2)).join('  '));
  });
}
if (bad.length) {
  console.error('\n[FAIL] 越界（<30 或 >60）：' + bad.length + ' 题，示例 ' + JSON.stringify(bad.slice(0, 5)));
  process.exit(1);
}
console.log('\n[OK] 全库 ' + A.length + ' 题成片时长均落在 [30,60] 秒');
