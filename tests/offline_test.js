const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8900/index.html';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  const external = [];   // 任何非 127.0.0.1 的请求
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  page.on('request', r => {
    const u = r.url();
    if (!u.includes('127.0.0.1')) external.push(u);
  });
  page.on('requestfailed', r => {
    // 仅记录外部失败（本地失败单独看）
    if (!r.url().includes('127.0.0.1')) external.push('FAILED ' + r.url());
  });

  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.includes('127.0.0.1')) r.continue();
    else r.abort(); // 强行阻断外部，模拟纯离线
  });

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK && window.SUBJ_PASSAGES, { timeout: 15000 });

  // 验证 vendor/model-viewer.min.js 已成功以本地 ES module 加载（自定义元素被定义）
  const mvDefined = await page.evaluate(() => !!customElements.get('model-viewer'));

  // 打开 3D 模型弹层（澄 · cheng）
  await page.evaluate(() => openMV('cheng'));
  await page.waitForTimeout(4000); // 让 model-viewer 初始化 + 加载 glb

  const state = await page.evaluate(() => {
    const ov = document.getElementById('mvOverlay');
    const el = document.getElementById('mvEl');
    return {
      overlayShown: ov.classList.contains('show'),
      mvSrc: el.getAttribute('src'),
      mvDisplay: el.style.display,
      fbDisplay: document.getElementById('mvFallback').style.display,
      name: document.getElementById('mvName').textContent
    };
  });

  console.log('=== OFFLINE TEST ===');
  console.log('model-viewer 自定义元素已定义(本地module生效):', mvDefined);
  console.log('外部请求(应为空):', external.length ? external : 'NONE');
  console.log('页面错误:', errs.length ? errs : 'NONE');
  console.log('3D弹层状态:', JSON.stringify(state));
  const ok = external.length === 0 && errs.length === 0 && mvDefined;
  console.log('RESULT:', ok ? 'PASS ✅ 离线完全干净' : 'FAIL ❌');
  await browser.close();
  process.exit(ok ? 0 : 1);
})();
