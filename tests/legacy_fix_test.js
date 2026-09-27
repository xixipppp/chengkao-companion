const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8900/index.html';
let pass = 0, fail = 0;
function T(name, ok, extra){
  console.log((ok ? '✅' : '❌') + ' ' + name + (extra !== undefined ? ' | ' + extra : ''));
  ok ? pass++ : fail++;
}
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 } });
  const p = await ctx.newPage();
  await p.route('**/*', r => { const u = r.request().url(); if (u.includes('127.0.0.1')) r.continue(); else r.abort(); });
  const errs = [];
  const ignore = t => /ERR_FAILED|ERR_NETWORK|unpkg|model-viewer|Failed to load resource/i.test(t);
  p.on('pageerror', e => { if (!ignore(e.message)) errs.push(e.message); });
  p.on('console', m => { if (m.type() === 'error' && !ignore(m.text())) errs.push('console: ' + m.text()); });

  await p.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_PASSAGES && window.MATH_BANK, { timeout: 15000 });
  await p.waitForTimeout(2200);

  // 1. 加载零报错
  T('页面加载零 pageerror/console.error', errs.length === 0, errs.slice(0, 3).join(' ; '));

  // 2. inset 全部展开
  const insetCnt = await p.evaluate(() => {
    return (document.documentElement.outerHTML.match(/inset\s*:/g) || []).length;
  });
  T('CSS inset 简写清零（X5 兼容）', insetCnt === 0, '残留 ' + insetCnt);

  // 3. reduced-motion 生效
  const rm = await p.evaluate(() => {
    for (const sh of document.styleSheets) {
      try {
        for (const r of sh.cssRules) {
          if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) return true;
        }
      } catch (e) {}
    }
    return false;
  });
  T('prefers-reduced-motion 规则存在', rm);

  // 4. 复用真题映射正确性（P3-D 起改为惰性：裸引用 DUP_REAL → 调用 dupReal()）
  const dup = await p.evaluate(() => {
    const D = dupReal();
    return {
      f13: D['mat26qz1_f13'],   // 高数模拟一 ← 2019真题
      e36: D['eng26qz5_036'],   // 英语模拟五 ← 2016真题
      real: D['mat19_f15'],     // 真题本身不应有角标
      cnt: Object.keys(D).length,
      lazy: typeof dupReal === 'function'
    };
  });
  T('模拟卷题映射到真题年份', dup.f13 === '2019' && dup.e36 === '2016', JSON.stringify(dup));
  T('真题本身无角标', !dup.real, 'mat19_f15=' + dup.real);
  T('复用映射惰性可用（P3-D）', dup.lazy && dup.cnt > 0, 'cnt=' + dup.cnt);

  // 5. 真实刷题路径：开始刷题 → 答题 → 下一题 → 角标渲染
  const badge = await p.evaluate(async () => {
    setSubject('math');
    startDrill('m1');
    await new Promise(r => setTimeout(r, 400));
    // 本轮 20 题里找有角标资格的题：直接翻到有复用映射的题渲染
    const d = S.drill;
    const hit = d.list.findIndex(q => dupReal()[q.id]);
    if (hit >= 0) { d.i = hit; renderDrill(); }
    await new Promise(r => setTimeout(r, 300));
    return { hit, has: !!document.querySelector('#drillBody .dupbadge'), txt: (document.querySelector('#drillBody .dupbadge') || {}).textContent || '' };
  });
  if (badge.hit >= 0) T('真题复用角标渲染', badge.has, badge.txt);
  else console.log('ℹ️ 本轮前20题无复用题，跳过角标渲染断言（映射断言已过）');

  // 6. 中断恢复（真实点击路径）：答题 → 下一题 → 重载 → 进度恢复
  const s1 = await p.evaluate(async () => {
    setSubject('math');
    startDrill('m1');
    await new Promise(r => setTimeout(r, 400));
    // 定位到第一道选择题（填空题没有 .opt，点击驱动不了）
    const ci = S.drill.list.findIndex(q => q.t === 'choice');
    if (ci > 0) { S.drill.i = ci; renderDrill(); }
    await new Promise(r => setTimeout(r, 300));
    return { i0: S.drill.i, n: S.drill.list.length, isChoice: S.drill.list[S.drill.i].t === 'choice' };
  });
  await p.click('#drillBody .opt');          // 真实点击答题
  await p.waitForTimeout(400);
  const nextBtns = await p.$$(' #drillBody button');
  let clickedNext = false;
  for (const nb of nextBtns) {
    const t = (await nb.textContent()).trim();
    if (t.includes('下一题')) { await nb.click(); clickedNext = true; break; }
  }
  await p.waitForTimeout(300);
  const saved = await p.evaluate(() => st.drillSav ? { i: st.drillSav.i, ids: st.drillSav.ids.length } : null);
  T('答题推进后进度已落盘', clickedNext && saved && saved.i === s1.i0 + 1, JSON.stringify({ saved, clickedNext }));

  await p.reload({ waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2200);
  const resumed = await p.evaluate(() => S.drill ? { i: S.drill.i, n: S.drill.list.length, right: S.drill.right } : null);
  T('重载后刷题进度自动恢复', resumed && resumed.i === s1.i0 + 1, JSON.stringify(resumed));

  // 7. 恢复后的刷题页可正常渲染并继续答题
  const cont = await p.evaluate(async () => {
    go('s-drill');
    await new Promise(r => setTimeout(r, 300));
    const ci = S.drill.list.findIndex(q => q.t === 'choice');
    if (ci >= 0 && S.drill.list[S.drill.i].t !== 'choice') { S.drill.i = ci; renderDrill(); }
    await new Promise(r => setTimeout(r, 300));
    const opt = document.querySelector('#drillBody .opt');
    return { hasOpt: !!opt, prog: (document.querySelector('#drillBody .qbar') || {}).textContent || '' };
  });
  T('恢复后刷题页可继续作答', cont.hasOpt, cont.prog.replace(/\s+/g, ' ').slice(0, 40));

  // 8. 考点权重与 ROI —— v3.2.0 起 MOD_W 不再手写，改由 KD_SCORE 客观分值归一导出（1~2 星级）；
  //    ROI v2 把「学习成本」放进分母，且超纲模块（p4 史纲 / p6 思修）ROI 恒为 0。
  const roi = await p.evaluate(() => {
    const l = roiList('pol');
    const mx = Math.max.apply(null, Object.keys(KD_SCORE).map(k => KD_SCORE[k].obj));
    const want = k => Math.round((0.5 + 1.5 * KD_SCORE[k].obj / mx) * 100) / 100;
    return {
      top: l[0].mo.id,
      list: l.slice(0, 3).map(r => r.mo.id + ':' + r.roi),
      wP1: MOD_W.p1, wP2: MOD_W.p2,
      derived: Object.keys(KD_SCORE).every(k => Math.abs(MOD_W[k] - want(k)) < 1e-9),
      inRange: Object.keys(MOD_W).every(k => MOD_W[k] >= 0.5 && MOD_W[k] <= 2.0 + 1e-9),
      extZero: modRoi('p4') === 0 && modRoi('p6') === 0,
      /* 超纲模块可以「出现」在列表尾部（roi=0、带剔除理由），但绝不允许排进前 3 */
      noExtTop: l.slice(0, 3).every(r => !isExtMod(r.mo.id)),
      extAllZero: l.filter(r => isExtMod(r.mo.id)).every(r => r.roi === 0)
    };
  });
  T('政治 ROI 权重已校准（MOD_W 由 KD_SCORE 客观分值派生）', roi.derived && roi.inRange && roi.extZero, JSON.stringify(roi));
  T('政治 ROI 首位为分值最高的 p2（毛概 46.5 分），前三无超纲模块', roi.top === 'p2' && roi.noExtTop && roi.extAllZero, 'Top3: ' + roi.list.join(', '));

  // 9. 全库缺解析复查（在 App 数据层）
  const miss = await p.evaluate(() => {
    const m = window.MATH_BANK.filter(q => !q.sol || !String(q.sol).trim()).length;
    const e = window.SUBJ_BANK.filter(q => (q.subj || q.subject) === 'eng' && (!q.sol || !String(q.sol).trim())).length;
    const po = window.SUBJ_BANK.filter(q => (q.subj || q.subject) === 'pol' && (!q.sol || !String(q.sol).trim())).length;
    return { m, e, po };
  });
  T('三库缺解析清零', miss.m === 0 && miss.e === 0 && miss.po === 0, JSON.stringify(miss));

  // 10. 结束清理：完成本轮（把 i 推到末尾）→ 落盘应清除
  const fin = await p.evaluate(() => {
    const d = S.drill;
    const info = { before: { i: d.i, len: d.list.length, cleared: !!d.cleared, pend: d.pendingWrong, isWrong: !!d.isWrong } };
    d.i = d.list.length; renderDrill();
    info.sav = !!st.drillSav;
    /* 结算页有两种合法形态：普通轮次「本轮正确率 N%」；带错题清零的轮次走 drillClear 的「任务通关」战报页。
       （是否走战报取决于 d.cleared 是否为对象，而恢复自 drillSav 时可能是 null → 两种都要认） */
    info.endScreen = /正确率|任务通关/.test(document.getElementById('drillBody').textContent);
    info.body = document.getElementById('drillBody').textContent.replace(/\s+/g, ' ').slice(0, 60);
    info.savSnap = st.drillSav ? { i: st.drillSav.i, ids: (st.drillSav.ids || []).length } : null;
    return info;
  });
  T('刷完一轮后落盘清除', !fin.sav && fin.endScreen, JSON.stringify(fin));

  console.log('\n══════════ ' + pass + ' 通过 / ' + fail + ' 失败 ══════════');
  if (errs.length) console.log('页错误:\n' + errs.join('\n'));
  await b.close();
  process.exit(fail ? 1 : 0);
})();
