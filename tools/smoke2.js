const { chromium } = require('playwright');
const PORT = process.env.PORT || 8912;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push('console:' + m.text()); });
  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const R = {};
  // 管家仪表盘
  R.dash = await page.evaluate(() => {
    go('s-butler'); butlerTab('dash');
    const body = document.getElementById('butlerBody');
    return { blocks: body.children.length, hasDonut: !!body.querySelector('svg'), hasBars: body.querySelectorAll('.mbar').length };
  });
  // 每日规划：课表总学习分钟应=720
  R.plan = await page.evaluate(() => {
    butlerTab('plan');
    const blocks = genDailyPlan();
    let study = 0, relax = 0;
    blocks.forEach(b => { if (b.type === 'study') study += b.dur; if (b.type === 'relax') relax += b.dur; });
    return { slots: blocks.length, studyMin: study, relaxMin: relax, hasStage: !!document.getElementById('butlerBody').querySelector('.slot') };
  });
  // 诊断
  R.diag = await page.evaluate(() => { butlerTab('diag'); const b = document.getElementById('butlerBody'); return { hasOk: b.innerHTML.includes('今日已完成'), hasWeak: b.innerHTML.includes('薄弱') }; });
  // 冲刺
  R.sprint = await page.evaluate(() => { butlerTab('sprint'); const b = document.getElementById('butlerBody'); return { days: b.querySelectorAll('.sprint-day').length, hasActivate: b.innerHTML.includes('激活') }; });
  // 存档
  R.arc = await page.evaluate(() => { butlerTab('arc'); const b = document.getElementById('butlerBody'); return { hasExport: b.innerHTML.includes('导出'), hasImport: b.innerHTML.includes('导入') }; });
  // 阅读动画
  R.anime = await page.evaluate(() => {
    go('s-readanime'); openLesson('strategy');
    const stage = document.getElementById('animeStage');
    const hasStage = !!stage && stage.children.length > 0;
    animeFinish();
    const slot = document.getElementById('animeQuizSlot');
    const hasQuizBtn = slot && slot.innerHTML.includes('开始配套练习');
    return { hasStage, frameCount: READ_LESSONS[0].frames.length, hasQuizBtn };
  });
  // 路由返回（缺陷1复验）
  R.route = await page.evaluate(() => {
    const q = ALLQ.find(x => x.t === 'choice');
    S.drill = { mod: q.m, list: [q], i: 0, right: 0, total: 1, label: 't', isWrong: false };
    go('s-drill'); renderDrill();
    markChatFrom(q); go('s-chat');
    chatBack();
    return { backToDrill: document.getElementById('s-drill').classList.contains('active'), drillIdx: S.drill ? S.drill.i : -1 };
  });
  R.pageerrors = errors;
  console.log(JSON.stringify(R, null, 2));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
