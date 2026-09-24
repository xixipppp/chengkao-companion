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

  // 4. DUP_REAL 映射正确性
  const dup = await p.evaluate(() => ({
    f13: DUP_REAL['mat26qz1_f13'],   // 高数模拟一 ← 2019真题
    e36: DUP_REAL['eng26qz5_036'],   // 英语模拟五 ← 2016真题
    real: DUP_REAL['mat19_f15'],     // 真题本身不应有角标
    cnt: Object.keys(DUP_REAL).length
  }));
  T('模拟卷题映射到真题年份', dup.f13 === '2019' && dup.e36 === '2016', JSON.stringify(dup));
  T('真题本身无角标', !dup.real, 'mat19_f15=' + dup.real);

  // 5. 真实刷题路径：开始刷题 → 答题 → 下一题 → 角标渲染
  const badge = await p.evaluate(async () => {
    setSubject('math');
    startDrill('m1');
    await new Promise(r => setTimeout(r, 400));
    // 本轮 20 题里找有角标资格的题：直接翻到有 DUP_REAL 的题渲染
    const d = S.drill;
    const hit = d.list.findIndex(q => DUP_REAL[q.id]);
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

  // 8. ROI 权重校准：政治首位模块合理 & 权重生效
  const roi = await p.evaluate(() => {
    const l = roiList('pol');
    return { top: l[0].mo.id, w: MOD_W.p1, list: l.slice(0, 3).map(r => r.mo.id + ':' + r.roi) };
  });
  T('政治 ROI 权重已校准(p1=1.35)', roi.w === 1.35, 'Top3: ' + roi.list.join(', '));

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
    S.drill.i = S.drill.list.length; renderDrill();
    return { sav: !!st.drillSav, endScreen: document.getElementById('drillBody').textContent.includes('正确率') };
  });
  T('刷完一轮后落盘清除', !fin.sav && fin.endScreen);

  console.log('\n══════════ ' + pass + ' 通过 / ' + fail + ' 失败 ══════════');
  if (errs.length) console.log('页错误:\n' + errs.join('\n'));
  await b.close();
  process.exit(fail ? 1 : 0);
})();
