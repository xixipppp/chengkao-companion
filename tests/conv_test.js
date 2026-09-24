// 补全对话 30 题 conv_1 注入回归：每套模拟卷取一题，验证 SUBJ_PASSAGES 命中 + 刷题页渲染 .passbox
const { chromium } = require('playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const R = { total: 0, pass: 0, fails: [] };
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route('**/*', r => { const u = r.request().url(); if (u.includes('127.0.0.1')) r.continue(); else r.abort(); });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('http://127.0.0.1:8900/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_PASSAGES, { timeout: 15000 });
  await sleep(300);

  const papers = ['英语2026全真模拟（一）','英语2026全真模拟（二）','英语2026全真模拟（三）',
                  '英语2026全真模拟（四）','英语2026全真模拟（五）','英语2026全真模拟（六）'];

  for (const pap of papers) {
    // 在 SUBJ_BANK 中找该卷一道 conv 题
    const info = await page.evaluate((pap) => {
      const bank = window.SUBJ_BANK || [];
      const q = bank.find(q => q.subj === 'eng' && q.paper === pap && q.passage === 'conv_1');
      if (!q) return { found: false };
      const key = pap + '|conv_1';
      const txt = (window.SUBJ_PASSAGES && window.SUBJ_PASSAGES[key]) || null;
      return { found: true, id: q.id, hasPassage: !!txt, len: txt ? txt.length : 0, has56: txt ? /56\./.test(txt) : false };
    }, pap);
    R.total++;
    if (info.found && info.hasPassage && info.has56) {
      R.pass++;
      console.log(`OK  ${pap}: id=${info.id} passlen=${info.len} has56=${info.has56}`);
    } else {
      R.fails.push({ pap, info });
      console.log(`FAIL ${pap}:`, JSON.stringify(info));
    }
  }

  // 真实点击路径：进入英语刷题，定位一道 conv 题，确认 .passbox 渲染
  await page.evaluate(() => { window.setSubject && window.setSubject('eng'); window.renderStudy && window.renderStudy(); });
  await sleep(400);
  const box = await page.evaluate(() => {
    const bank = window.SUBJ_BANK || [];
    const q = bank.find(q => q.subj === 'eng' && q.passage === 'conv_1');
    if (!q) return { ok: false, why: 'no conv q' };
    // 直接构造 passageBox 验证
    const pb = window.passageBox ? window.passageBox(q) : null;
    if (!pb) return { ok: false, why: 'passageBox null' };
    const html = pb.outerHTML || '';
    return { ok: html.includes('passbox'), len: html.length };
  });
  console.log('passageBox render:', JSON.stringify(box));

  await browser.close();
  console.log('SUMMARY', JSON.stringify(R));
  console.log('pageerrors:', errs.length, errs.slice(0,3));
  const allok = R.pass === R.total && box.ok && errs.length === 0;
  console.log(allok ? 'ALL_GREEN' : 'RED');
  process.exit(allok ? 0 : 1);
})();
