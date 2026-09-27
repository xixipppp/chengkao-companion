const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8900/index.html';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  const jsErrs = [];     // 只收应用级 JS 异常（pageerror）——这才是「功能坏了」的硬信号
  const external = [];   // 任何非 127.0.0.1 的请求
  let offlineNow = false;
  const offlineMiss = [];  // 断网阶段取不到的本地资源（PWA 预缓存覆盖缺口，诊断用）
  page.on('pageerror', e => { jsErrs.push('pageerror: ' + e.message); errs.push('pageerror: ' + e.message); });
  page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  page.on('request', r => {
    const u = r.url();
    if (!u.includes('127.0.0.1')) external.push(u);
  });
  page.on('requestfailed', r => {
    if (offlineNow && r.url().includes('127.0.0.1')) offlineMiss.push(r.url().replace(/^https?:\/\/[^/]+/, ''));
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

  // P3-A 之后 3D 引擎是**按需加载**的：开机不应该已经定义自定义元素（首屏省 ~1.07MB + draco）
  const mvAtBoot = await page.evaluate(() => !!customElements.get('model-viewer'));

  // 打开 3D 模型弹层（澄 · cheng）→ 触发 __ckLoadMV() 动态 import
  await page.evaluate(() => openMV('cheng'));
  // 等惰性模块真正被加载并完成自定义元素定义（离线场景下也应能从 127.0.0.1 取到）
  let mvDefined = false;
  try {
    await page.waitForFunction(() => !!customElements.get('model-viewer'), { timeout: 20000 });
    mvDefined = true;
  } catch (e) { mvDefined = false; }
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

  // ===== PWA（2.8）：Service Worker 真激活 + 预缓存落盘 =====
  const sw = await page.evaluate(async () => {
    try {
      const r = await navigator.serviceWorker.ready;
      return { active: !!(r.active && r.active.state === 'activated'), ctrl: !!navigator.serviceWorker.controller };
    } catch (e) { return { active: false, ctrl: false, err: String(e) }; }
  });
  const pre = await page.evaluate(async () => {
    try {
      const ks = await caches.keys();
      const k = ks.find(x => x.indexOf('-pre') >= 0);
      if (!k) return { key: '', n: 0 };
      const c = await caches.open(k);
      return { key: k, n: (await c.keys()).length };
    } catch (e) { return { key: '', n: 0, err: String(e) }; }
  });

  // ===== 最硬的离线证据：断网后整页重载，题库与界面仍须完整 =====
  const errsOnline = errs.length;    // 断网前的控制台错误数（此阶段应为 0）
  /* 版本号不写死：取重载前的实际值来比对（否则每次发版都要来改测试，
     而「断网后仍是同一个版本」才是有意义的断言） */
  const verOnline = await page.evaluate(() => (document.getElementById('appVer') || {}).textContent || '');
  let off = null;
  try {
    offlineNow = true;
    await page.context().setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForFunction(() => typeof ALLQ !== 'undefined' && ALLQ.length > 2000, { timeout: 20000 });
    /* v3.4.0：两份按需题库（kaodian 501KB / goldpoints 380KB）在**断网**下也必须能从 SW 预缓存拿到 */
    await page.waitForFunction(() => window.__ckBanksReady === true, { timeout: 20000 }).catch(() => {});
    off = await page.evaluate(() => ({ ver: (document.getElementById('appVer') || {}).textContent || '', q: ALLQ.length,
      banks: window.__ckBanksReady === true,
      kaodian: Array.isArray(window.KAODIAN) ? window.KAODIAN.length : -1,
      gp: Object.keys((window.GOLD_POINTS && window.GOLD_POINTS.data) || {}).length }));
  } catch (e) { off = { err: String(e) }; }
  await page.context().setOffline(false);
  offlineNow = false;
  /* 离线阶段允许出现「未预缓存的图片取不到」这类资源级报错（浏览器行为，非功能缺陷），
     但**核心资产**（HTML / 四份题库）绝不允许出现缺口。 */
  const coreMiss = offlineMiss.filter(u => /index\.html$|data\/(subjectbank|mathbank|kaodian|goldpoints)\.js$/.test(u));

  console.log('=== OFFLINE TEST ===');
  console.log('开机即定义 model-viewer（P3-A 后应为 false）:', mvAtBoot);
  console.log('点开 3D 后惰性加载成功（本地 module 生效）:', mvDefined);
  console.log('Service Worker 激活并接管:', JSON.stringify(sw));
  console.log('预缓存桶与条目数:', JSON.stringify(pre));
  console.log('断网整页重载:', JSON.stringify(off));
  console.log('断网阶段资源缺口(非核心可忽略):', offlineMiss.length ? offlineMiss : 'NONE');
  console.log('外部请求(应为空):', external.length ? external : 'NONE');
  console.log('应用级 JS 异常(全程应为 0):', jsErrs.length ? jsErrs : 'NONE');
  console.log('联网阶段控制台错误数:', errsOnline);
  console.log('3D弹层状态:', JSON.stringify(state));
  const ok = external.length === 0 && jsErrs.length === 0 && errsOnline === 0 && coreMiss.length === 0
    && !mvAtBoot && mvDefined
    && state.overlayShown && state.mvDisplay === 'block' && state.fbDisplay === 'none'
    && sw.active && sw.ctrl && pre.n >= 10 && !!off && off.q > 2000
    && off.ver === verOnline && /^v\d+\.\d+\.\d+$/.test(off.ver || '')
    && off.banks === true && off.kaodian > 20 && off.gp >= 3;
  console.log('RESULT:', ok ? 'PASS ✅ 离线完全干净 + 3D 惰性加载可用 + 按需题库断网可用 + 断网重载可启动' : 'FAIL ❌');
  await browser.close();
  process.exit(ok ? 0 : 1);
})();
