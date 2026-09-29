// v3.10.0 · P3 冒烟：题级「做题步骤 + 考场速记口诀」+ 教授六段式讲解 + 播放器分段导航
// 在真实页面里跑（TEST_URL 指向本地服务），断言内置库覆盖与接线正确。
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { chromium } = require('playwright');

const TEST_URL = process.env.TEST_URL || 'http://127.0.0.1:8900/index.html';
let pass = 0, fail = 0;
function ok(cond, name, extra){
  if(cond){ pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); }
}

(async () => {
  console.log('=== p3_smoke @ ' + TEST_URL + ' ===');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 860 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(TEST_URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, null, { timeout: 30000 });
  /* anim2d.js 是按需懒加载的，测试里手动注入 */
  if(!(await page.evaluate(() => !!(window.Anim2D && window.Anim2D.build)))){
    await page.addScriptTag({ path: path.join(ROOT, 'data', 'anim2d.js') });
  }

  /* ① 三个内置库都已加载 */
  const libs = await page.evaluate(() => ({
    qstep: !!(window.QSTEP && window.QSTEP.build),
    lecture: !!(window.LECTURE && window.LECTURE.build),
    anim: !!(window.Anim2D && window.Anim2D.build),
    mnem: !!(window.MNEM_DATA && window.MNEM_DATA.rules)
  }));
  ok(libs.qstep, '题级步骤/口诀库 QSTEP 已加载');
  ok(libs.lecture, '教授讲解库 LECTURE 已加载');
  ok(libs.mnem, '考点口诀库 MNEM_DATA 已加载');

  /* ② 全库覆盖：每题都有做题步骤 + 速记口诀；题型命中率 */
  const cov = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    let noSteps = 0, noChant = 0, rule = 0, longChant = 0;
    ALL.forEach(q => {
      const b = window.QSTEP.build(q);
      if(!b.steps || !b.steps.length) noSteps++;
      if(!b.chant || !String(b.chant).trim()) noChant++;
      if(b.from === 'rule') rule++;
      if(String(b.chant).length > 40) longChant++;
    });
    return { n: ALL.length, noSteps, noChant, rule, longChant };
  });
  ok(cov.noSteps === 0, '全库 ' + cov.n + ' 题每题都有做题步骤', '缺 ' + cov.noSteps);
  ok(cov.noChant === 0, '全库每题都有考场速记口诀', '缺 ' + cov.noChant);
  ok(cov.rule / cov.n >= 0.85, '题型规则精准命中率 ≥ 85%', (cov.rule / cov.n * 100).toFixed(1) + '%');
  ok(cov.longChant / cov.n <= 0.01, '速记口诀保持短咒风格（≤40 字为主）', (cov.longChant / cov.n * 100).toFixed(1) + '% 超长');

  /* ③ 讲解库六段齐全 + 占位符不残留 */
  const lec = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    let badSeg = 0, badPh = 0, okSeg = 0;
    ALL.forEach(q => {
      const L = window.LECTURE.build(q, window.QSTEP.pick(q));
      const ids = (L.seg || []).map(s => s.id).join(',');
      if(/aim/.test(ids) && /brk/.test(ids) && /lead/.test(ids) && /trap/.test(ids) && /close/.test(ids)) okSeg++;
      else badSeg++;
      const all = JSON.stringify(L);
      if(/\{\w+\}/.test(all)) badPh++;
    });
    return { n: ALL.length, okSeg, badSeg, badPh };
  });
  ok(lec.badSeg === 0, '讲解六段式（定位/破题/为什么/推演/易错/带走）全覆盖', '缺段 ' + lec.badSeg);
  ok(lec.badPh === 0, '讲解文案无残留占位符', lec.badPh + ' 题残留');

  /* ④ 动画新分镜：lec 六段 + 考场默念，且讲解在答案揭晓之前 */
  const seq = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    let bad = 0, noMnem = 0, sample = '';
    ALL.slice(0, 120).forEach(q => {
      const sp = window.Anim2D.build(q);
      const ids = sp.scenes.map(s => s.id);
      const iRev = ids.indexOf('reveal');
      const lastLec = ids.reduce((a, id, i) => (/^lec_/.test(id) ? i : a), -1);
      if(!(iRev >= 0 && lastLec >= 0 && lastLec < iRev)) bad++;
      if(!ids.includes('mnem')) noMnem++;
      if(!sample) sample = ids.join(',');
    });
    return { bad, noMnem, sample };
  });
  ok(seq.bad === 0, '讲解段全部位于答案揭晓之前', seq.bad + ' 题乱序');
  ok(seq.noMnem === 0, '抽样 120 题都有「考场默念」场景', seq.noMnem + ' 题缺失');

  /* ⑤ 播放器分段导航条存在且可点跳 */
  const nav = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'm2' && /法线/.test(x.q)) || ALL[0];
    const pl = window.Anim2D.open(q, { silent: true });
    const ov = document.getElementById('anim2dOverlay');
    const html = ov ? ov.innerHTML : '';
    if(ov && ov.remove) ov.remove();
    return { opened: !!pl, hasNav: /④推演|⑤易错/.test(html), btns: (html.match(/<button/g) || []).length };
  });
  ok(nav.opened && nav.hasNav, '播放器含分段导航条（①定位…⑥带走）', 'opened=' + nav.opened + ' buttons=' + nav.btns);

  /* ⑥ 答题页接线：做题步骤 + 考场速记都渲染出来了 */
  const wired = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'p1') || ALL[0];
    const el = window.qMemoEl(q);
    const t = el ? el.textContent : '';
    return { hasChant: /考场速记/.test(t), hasSteps: /做题步骤/.test(t), len: t.length };
  });
  ok(wired.hasChant && wired.hasSteps, '答题页已展示「考场速记 + 做题步骤」');

  /* ⑦ 页面零 JS 错误 */
  ok(errs.length === 0, '页面无 JS 错误', errs.slice(0, 2).join(' | '));

  console.log('\n通过 ' + pass + ' / ' + (pass + fail));
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
