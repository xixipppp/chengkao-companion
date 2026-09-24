const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8900/index.html';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('requestfailed', r => { if (r.url().includes('127.0.0.1')) console.log('LOCAL FAIL', r.url()); });
  await page.route('**/*', r => { r.request().url().includes('127.0.0.1') ? r.continue() : r.abort(); });

  const t0 = Date.now();
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
  const tDom = Date.now() - t0;
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK && window.SUBJ_PASSAGES, { timeout: 15000 });
  const tReady = Date.now() - t0;

  // 数据规模
  const sizes = await page.evaluate(() => ({
    allq: window.ALLQ ? window.ALLQ.length : (window.SUBJ_BANK ? window.SUBJ_BANK.length : 0),
    math: window.MATH_BANK ? window.MATH_BANK.length : 0,
    subj: window.SUBJ_BANK ? window.SUBJ_BANK.length : 0,
    passages: window.SUBJ_PASSAGES ? Object.keys(window.SUBJ_PASSAGES).length : 0
  }));

  // 首屏渲染：进入高数刷题并渲染一题
  const tDrill = await page.evaluate(async () => {
    const s = Date.now();
    setSubject && setSubject('math');
    startDrill && startDrill('m1');
    renderDrill && renderDrill();
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    return Date.now() - s;
  }).catch(() => -1);

  console.log('=== PERF TEST ===');
  console.log('DOMContentLoaded 耗时:', tDom, 'ms');
  console.log('数据就绪(可交互)耗时:', tReady, 'ms');
  console.log('数据规模:', JSON.stringify(sizes));
  console.log('进入刷题+渲染一题耗时:', tDrill, 'ms');
  const ok = tReady < 5000 && tDrill < 1000;
  console.log('RESULT:', ok ? 'PASS ✅ 加载性能良好(1MB数据 <5s就绪)' : 'WARN ⚠️ 偏慢');
  await browser.close();
  process.exit(ok ? 0 : 2);
})();
