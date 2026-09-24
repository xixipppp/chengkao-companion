// 10 个小游戏全流程冒烟测试
const { chromium } = require('playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route('**/*', r => { const u = r.request().url(); if (u.includes('127.0.0.1')) r.continue(); else r.abort(); });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('http://127.0.0.1:8900/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_PASSAGES && window.MATH_BANK, { timeout: 15000 });
  await page.waitForTimeout(900);
  await page.evaluate(() => { localStorage.clear(); location.reload(); });
  await page.waitForTimeout(1200);

  const R = {};

  // 0) 游戏中心列表 + 入口
  R.center = await page.evaluate(() => {
    go('s-games');
    return { cards: document.querySelectorAll('#gameList .gcard').length, coinsShown: document.getElementById('gcCoins').textContent };
  });

  // 通用：开一局并等待结算出现
  async function openAndWait(id, driver, maxMs) {
    await page.evaluate(gid => openGame(gid), id);
    const t0 = Date.now();
    while (Date.now() - t0 < maxMs) {
      if (await page.locator('#gReplay').count()) return true;
      await driver();
      await sleep(250);
    }
    return !!await page.locator('#gReplay').count();
  }

  // ① 极限秒答：点第一个选项 → 下一题
  R.lim = await openAndWait('lim', async () => {
    if (await page.locator('#gameBody .opt:not(.dis)').count()) await page.locator('#gameBody .opt:not(.dis)').first().click();
    else if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click();
  }, 30000);

  // ③ 核心收割机
  R.harvest = await openAndWait('harvest', async () => {
    if (await page.locator('#gameBody .opt:not(.dis)').count()) await page.locator('#gameBody .opt:not(.dis)').first().click();
    else if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click();
  }, 30000);

  // ② 公式连连看：用 MATCH_POOLS 数据精确配对
  R.match = await openAndWait('match', async () => {
    await page.evaluate(() => {
      const pools = MATCH_POOLS;
      const lefts = [...document.querySelectorAll('#mcolL .mchip')];
      const rights = [...document.querySelectorAll('#mcolR .mchip')];
      if (!lefts.length) return;
      // 找到左边第一个未配对的，从所有池里找它对应右边文本
      const target = lefts.find(c => !c.classList.contains('ok'));
      if (!target) return;
      let val = null;
      for (const p of pools) for (const pr of p.pairs) if (pr[0] === target.textContent) val = pr[1];
      const right = rights.find(c => c.textContent === val && !c.classList.contains('ok'));
      target.click(); if (right) right.click();
    });
  }, 20000);

  // ④ 词汇翻牌：确定性穷举配对（每轮重翻目标牌，避免随机游走超时抖动）
  await page.evaluate(() => openGame('flip'));
  const fT0 = Date.now();
  R.flip = false;
  const fEnded = () => page.evaluate(() => !!document.querySelector('#gReplay') || !document.getElementById('fgrid'));
  while (Date.now() - fT0 < 75000) {
    if (await fEnded()) { if (await page.locator('#gReplay').count()) R.flip = true; break; }
    const t = await page.evaluate(() => [...document.querySelectorAll('#fgrid .fcard')].findIndex(c => !c.classList.contains('done')));
    if (t < 0) break;
    let matched = false;
    for (let k = 0; k < 12 && !matched; k++) {
      if (k === t) continue;
      if (await fEnded()) { matched = true; break; }
      const kDone = await page.evaluate(i => { const cs = document.querySelectorAll('#fgrid .fcard'); return cs[i] && cs[i].classList.contains('done'); }, k);
      if (kDone) continue;
      await page.evaluate(i => { const c = document.querySelectorAll('#fgrid .fcard')[i]; if (c && !c.classList.contains('open') && !c.classList.contains('done')) c.click(); }, t);
      await sleep(90);
      await page.evaluate(i => { const c = document.querySelectorAll('#fgrid .fcard')[i]; if (c && !c.classList.contains('open') && !c.classList.contains('done')) c.click(); }, k);
      await sleep(820);
      if (await fEnded()) { matched = true; break; }
      matched = await page.evaluate(i => { const cs = document.querySelectorAll('#fgrid .fcard'); return cs[i] && cs[i].classList.contains('done'); }, t);
    }
  }

  // ⑤ 步骤接龙：从 ALLQ 反查正确顺序
  R.order = await openAndWait('order', async () => {
    await page.evaluate(() => {
      const qt = document.querySelector('#gameBody .qtext');
      if (!qt) return;
      const q = ALLQ.find(x => x.q === qt.textContent);
      if (!q) return;
      const steps = splitSol(q.sol);
      const doneCount = [...document.querySelectorAll('#oSlots .mchip')].filter(s => !s.textContent.includes('……')).length;
      const chip = [...document.querySelectorAll('#oChips .ochip')].find(c => !c.dataset.done && c.textContent === steps[doneCount]);
      if (chip) chip.click();
    });
  }, 20000);

  // ⑥ 速记图猜考点：点第一个选项 → 下一题
  R.pic = await openAndWait('pic', async () => {
    const opt = await page.locator('#picOpts .ochip').first();
    if (await opt.count() && await page.locator('#picOpts .ochip').count() && await page.evaluate(() => !document.getElementById('picOpts').style.pointerEvents && document.querySelectorAll('#picOpts .ochip:not([style*="pointer-events: none"])').length === document.querySelectorAll('#picOpts .ochip').length)) await opt.click();
    else if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click();
  }, 25000);

  // ⑦ 限时 Boss 快攻：60 秒「游戏内」计时（答错停表 1.4s），窗口放宽到 185s + 慢速驱动
  await page.evaluate(() => openGame('rush'));
  const rushT0 = Date.now();
  R.rush = false;
  while (Date.now() - rushT0 < 185000) {
    if (await page.locator('#gReplay').count()) { R.rush = true; break; }
    const opt = page.locator('#gameBody .opt:not(.dis)').first();
    if (await opt.count()) await opt.click().catch(() => {});
    await sleep(1000);
  }

  // ⑧ 对话情景卡
  R.chat = await openAndWait('chat', async () => {
    if (await page.locator('#gcChatOpts .chatline').count()) {
      const clicked = await page.evaluate(() => {
        const lines = [...document.querySelectorAll('#gcChatOpts .chatline')];
        const live = lines.find(l => l.style.pointerEvents !== 'none');
        if (live) { live.click(); return true; }
        return false;
      });
      if (!clicked && await page.locator('#gameBody button:has-text("下一句")').count()) await page.locator('#gameBody button:has-text("下一句")').click();
    } else if (await page.locator('#gameBody button:has-text("下一句")').count()) await page.locator('#gameBody button:has-text("下一句")').click();
  }, 30000);

  // ⑨ 陷阱扫雷：点前两个芯片排雷 → 继续点 → 下一题
  R.mine = await openAndWait('mine', async () => {
    await page.evaluate(() => {
      const chips = [...document.querySelectorAll('#mineOpts .mchip')];
      const live = chips.find(c => c.style.pointerEvents !== 'none' && !c.classList.contains('ok'));
      if (live) live.click();
      else if (!chips.length) return;
    });
    if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click();
  }, 30000);

  // ⑩ 学习扭蛋：先加币 → 免费+付费抽 → 图鉴
  R.gacha = await page.evaluate(() => {
    openGame('gacha');
    st.coins = 200; save();
    const free = document.getElementById('gDraw').textContent.includes('免费');
    document.getElementById('gDraw').click();            // 免费抽
    document.getElementById('gDraw').click();            // 付费抽
    const stageHasCard = document.getElementById('gachaStage').textContent.includes('·');
    document.getElementById('gColl').click();
    const gridN = document.querySelectorAll('#gachaGrid .gcard2').length;
    return { free, stageHasCard, gridN, coinsAfter: st.coins, owned: Object.keys(st.gacha).length };
  });

  // 结算面板元素完整性（用 lim 再开一局后直接看）
  R.settleCheck = await page.evaluate(() => {
    openGame('lim');
    return { coins: st.coins > 0, wrongPool: Array.isArray(st.wrong), best: st.gameBest && Object.keys(st.gameBest).length > 0 };
  });

  console.log(JSON.stringify(R, null, 1));
  console.log('pageerrors:', errs.length ? errs : 'NONE');
  await browser.close();
  console.log('DONE');
})();
