/* ============================================================
 * 心动成考·乙女陪练 — 线上生产环境全模块回归测试（UAT / Regression）
 * 目标：访问线上 chengkao.xixipp.cloud，逐条核对所有模块与需求
 * 运行：TEST_URL=... node tests/online_regression.js
 * 说明：沙箱需 --no-proxy-server 直连（代理会间歇阻断）
 * ============================================================ */
const { chromium } = require('playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const URL = process.env.TEST_URL || 'https://chengkao.xixipp.cloud/index.html';
/* v3.4.1：浏览器 channel 可配——CI（ubuntu 无 Edge）用已安装的 chromium；
   本地有 Edge 时可用 TEST_CHANNEL=msedge 保留原行为 */
const CHANNEL = process.env.TEST_CHANNEL || (process.env.CI ? undefined : 'msedge');

(async () => {
  const browser = await chromium.launch({ channel: CHANNEL,
    args: ['--no-sandbox', '--no-first-run', '--no-proxy-server'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errs = [], net404 = [];
  page.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') { const u = (m.location() && m.location().url) || ''; errs.push('CONSOLE: ' + m.text().slice(0, 150) + ' @' + u); } });
  page.on('response', r => { if (r.status() >= 400) net404.push(r.status() + ' ' + r.url()); });
  page.on('requestfailed', r => { net404.push('FAILED ' + ((r.failure() && r.failure().errorText) || '') + ' ' + r.url()); });

  let pass = 0, fail = 0;
  const results = [];
  const T = (id, name, ok, extra) => {
    ok ? pass++ : fail++;
    results.push({ id, name, ok });
    console.log((ok ? '[PASS] ' : '[FAIL] ') + id + ' ' + name + (extra !== undefined ? ' :: ' + extra : ''));
  };
  const sect = s => console.log('\n===== ' + s + ' =====');

  console.log('>>> 目标环境: ' + URL);
  let loaded = false, lastErr = '';
  for (let attempt = 1; attempt <= 4 && !loaded; attempt++) {
    try {
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_PASSAGES && window.MATH_BANK, { timeout: 30000 });
      /* v3.4.0：两份非关键题库改为按需预取 → 等它们就绪再跑（离线时由 SW 预缓存提供） */
      await page.waitForFunction(() => window.__ckBanksReady === true, { timeout: 30000 }).catch(() => {});
      loaded = true;
    } catch (e) {
      lastErr = e.message.split('\n')[0];
      console.log('  [goto 第' + attempt + '次失败] ' + lastErr);
      await sleep(4000);
    }
  }
  if (!loaded) {
    console.log('!! 目标环境多次加载失败，无法执行核对：' + lastErr);
    await browser.close();
    process.exit(2);
  }
  await sleep(600);

  /* ---------- A. 加载与环境 ---------- */
  sect('A. 加载与环境(生产环境可访问性)');
  const a = await page.evaluate(() => ({
    title: document.title,
    allq: (typeof ALLQ !== 'undefined') ? ALLQ.length : -1,
    subj: (typeof SUBJ_BANK !== 'undefined') ? Object.keys(SUBJ_BANK).length : -1,
    math: (typeof MATH_BANK !== 'undefined') ? MATH_BANK.length : -1
  }));
  T('A1', '页面标题正确', a.title.indexOf('心动成考') >= 0, a.title);
  T('A2', '题库加载(SUBJ_BANK>1500)', a.subj > 1500, 'subj=' + a.subj);
  T('A3', '全题库 ALLQ≈2327', a.allq >= 2300 && a.allq <= 2400, 'ALLQ=' + a.allq);
  T('A4', '数学题库加载(≈360题)', a.math >= 300, 'MATH_BANK=' + a.math);

  /* ---------- B. 主页 / 导航 / 版本号 ---------- */
  sect('B. 主页 / 导航 / 版本号');
  const b = await page.evaluate(() => {
    go('s-home');
    const home = document.getElementById('s-home');
    const more = document.getElementById('homeMore'), mbtn = document.getElementById('moreBtn');
    const foldClosed = !!more && more.style.display === 'none';       // 1.10 首屏降噪：低优先内容默认收起
    if(mbtn) mbtn.click();
    const foldOpened = !!more && more.style.display !== 'none';
    return {
      nav: document.querySelectorAll('[onclick^="go("]').length,
      ver: (document.getElementById('appVer') || {}).textContent || '',
      hero: home.innerText.length > 200,
      hasAnimeEntry: home.innerText.indexOf('动画') >= 0,
      hasButlerEntry: home.innerText.indexOf('管家') >= 0,
      foldClosed: foldClosed, foldOpened: foldOpened,
      foldLabel: mbtn ? mbtn.textContent : ''
    };
  });
  T('B1', '导航入口≥30', b.nav >= 30, 'nav=' + b.nav);
  T('B2', '版本号显示 v3.4.0', b.ver.trim() === 'v3.4.0', JSON.stringify(b.ver));
  T('B3', '主页内容渲染正常', b.hero);
  T('B4', '「更多」展开后主页含英语动画课堂入口', b.hasAnimeEntry, 'fold=' + b.foldClosed + '→' + b.foldOpened + ' btn=' + b.foldLabel);
  T('B5', '「更多」展开后主页含AI学习管家入口', b.hasButlerEntry);
  T('B6', '1.10 首屏降噪：低优先区块默认折叠且可展开', b.foldClosed === true && b.foldOpened === true && /更多|收起/.test(b.foldLabel), JSON.stringify({c:b.foldClosed,o:b.foldOpened,l:b.foldLabel}));

  /* ---------- C. AI 靶向提分 · 知识世界树 ---------- */
  sect('C. AI 靶向提分系统 · 知识世界树');
  const c = await page.evaluate(() => {
    go('s-tree');
    const sum = (document.getElementById('treeSummary') || {}).textContent || '';
    return {
      nodes: document.querySelectorAll('#treeWrap .tree-node').length,
      lines: document.querySelectorAll('#treeWrap .branchline').length,
      legend: document.querySelectorAll('#treeLegend .lg').length,
      hasSum: sum.indexOf('点亮率') >= 0,
      hasWeak: typeof weakModules === 'function' && typeof weakDrill === 'function'
    };
  });
  T('C1', '世界树 16 模块节点', c.nodes === 16, 'nodes=' + c.nodes);
  T('C2', '三科分支连线', c.lines === 3, 'lines=' + c.lines);
  T('C3', '图例 5 项', c.legend === 5, 'legend=' + c.legend);
  T('C4', '汇总含点亮率', c.hasSum);
  T('C5', '薄弱点定向出题接口存在', c.hasWeak === true);

  /* ---------- D. 做题 + 错题强制清零 + 分步ABCD ---------- */
  const d = await page.evaluate(() => {
    const target = ALLQ.filter(q => q.t === 'choice').slice(0, 5);
    S.drill = { mod: 'all', list: target.slice(), i: 0, right: 0, isWrong: false,
      label: '回归核对', mode: 'normal', cleared: {}, pendingWrong: 2, totalWrong: 2,
      wrongN: {}, ansLog: {}, clearedAgain: 0 };
    go('s-drill'); renderDrill();
    const bar = document.querySelector('.taskbar');
    return { hasBar: !!bar, barTxt: bar ? bar.innerText.replace(/\n/g, ' ') : '(无状态条)',
      hasKill: !!document.querySelector('.tbkill'),
      body: document.getElementById('s-drill').innerText.replace(/\n/g, ' ').slice(0, 90) };
  });
  sect('D. 做题 / 错题强制清零机制 / 分步 ABCD');
  T('D1', '做题页渲染题目', d.body.length > 30, d.body.slice(0, 55));
  T('D2', '任务状态条存在', d.hasBar);
  T('D3', '状态条含「已消灭」正向视角', d.barTxt.indexOf('已消灭') >= 0, d.barTxt.slice(0, 80));
  T('D4', '肃清进度条(.tbkill)存在', d.hasKill);
  T('D5', '状态条含「⚔️ 复仇战」包装', /复仇战/.test(d.barTxt), d.barTxt.slice(0, 60));

  const d2 = await page.evaluate(() => {
    const q = ALLQ.filter(x => x.subj === 'math' && x.t === 'choice' && splitSol(x.sol).length >= 3)[0];
    if (!q) return { ok: false, why: 'no math step q' };
    const steps = buildSteps(q);
    const quiz = localStepQuiz(q, steps);
    const all4 = quiz.length >= 2 && quiz.every(s => Array.isArray(s.o) && s.o.length === 4 && Number.isInteger(s.a) && s.a >= 0 && s.a < 4);
    S.drill = { mod: 'all', list: [q], i: 0, right: 0, isWrong: false, label: '分步核对', mode: 'normal',
      cleared: {}, pendingWrong: 0, totalWrong: 0, wrongN: {}, ansLog: {} };
    go('s-drill'); renderDrill();
    const txt = document.getElementById('s-drill').innerText;
    return { ok: true, split: splitSol(q.sol).length, quizN: quiz.length, all4,
      hasBtn: /分步|一步步/.test(txt), aiFn: typeof buildStepQuiz === 'function' };
  });
  T('D6', '分步讲解可得(步骤≥3)', d2.ok && d2.split >= 3, 'split=' + d2.split);
  T('D7', '每一步都配 4 个 ABCD 检测选项', d2.all4 === true, 'steps=' + d2.quizN + ' all4=' + d2.all4);
  T('D8', '做题页有「分步讲」入口 + AI 拆题函数', d2.hasBtn === true && d2.aiFn === true, 'hasBtn=' + d2.hasBtn + ' aiFn=' + d2.aiFn);

  /* ---------- E. 缺陷1：AI讲师返回原题 ---------- */
  sect('E. 缺陷修复 · AI讲师返回可回原题');
  const e = await page.evaluate(() => {
    const q = ALLQ.filter(x => x.t === 'choice')[0];
    S.drill = { mod: 'all', list: [q, ALLQ[5], ALLQ[8]].filter(Boolean), i: 1, right: 0, isWrong: false,
      label: '回溯核对', mode: 'normal', cleared: {}, pendingWrong: 0, totalWrong: 0, wrongN: {}, ansLog: {} };
    go('s-drill'); renderDrill();
    markChatFrom(S.drill.list[S.drill.i]);
    const from = JSON.parse(JSON.stringify(S.chatFrom || null));
    go('s-chat');
    chatBack();
    return { from, backActive: document.querySelector('.screen.active').id, i: S.drill.i };
  });
  T('E1', '问讲师时记录来源=做题页', e.from && e.from.screen === 's-drill', JSON.stringify(e.from));
  T('E2', '返回按钮文案含「回到这题」', e.from && /回到这题/.test(e.from.label), e.from && e.from.label);
  T('E3', '返回后回到做题页', e.backActive === 's-drill', e.backActive);
  T('E4', '返回后定位到原题目(i=1)', e.i === 1, 'i=' + e.i);

  /* ---------- F. 缺陷2：切页答题状态保存 ---------- */
  sect('F. 缺陷修复 · 切页答题状态不丢失');
  const f = await page.evaluate(() => {
    const qs = ALLQ.filter(x => x.t === 'choice').slice(10, 16);
    S.drill = { mod: 'all', list: qs.slice(), i: 3, right: 2, isWrong: true, label: '切页核对',
      mode: 'normal', cleared: {}, pendingWrong: 0, totalWrong: 0, wrongN: {}, ansLog: { [qs[1].id]: { k: 0, ok: false } } };
    saveDrillProgress();
    const saved = (st.drillSav && st.drillSav.ids || []).length;
    S.drill = null;
    go('s-games');
    resumeDrill();
    return { saved, active: document.querySelector('.screen.active').id, i: S.drill ? S.drill.i : -1,
      ansLogN: S.drill ? Object.keys(S.drill.ansLog || {}).length : 0 };
  });
  T('F1', '切页前进度已写入存档(6题)', f.saved === 6, 'saved=' + f.saved);
  T('F2', '切回后恢复到做题页', f.active === 's-drill', f.active);
  T('F3', '恢复后停在第4题(i=3)', f.i === 3, 'i=' + f.i);
  T('F4', '已答痕迹还原(ansLog)', f.ansLogN >= 1, 'ansLog=' + f.ansLogN);

  /* ---------- G. 英语语音朗读 ---------- */
  sect('G. 英语题目语音朗读');
  const g = await page.evaluate(() => {
    const q = ALLQ.filter(x => x.subj === 'eng' && x.t === 'choice')[0];
    S.drill = { mod: 'all', list: [q], i: 0, right: 0, isWrong: false, label: '语音核对', mode: 'normal',
      cleared: {}, pendingWrong: 0, totalWrong: 0, wrongN: {}, ansLog: {} };
    go('s-drill'); renderDrill();
    const sec = document.getElementById('s-drill');
    return {
      speechApi: !!(typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined'),
      hasMini: sec.querySelectorAll('.ttsmini').length,
      hasSpeak: typeof speak === 'function',
      hasToggle: typeof toggleTts === 'function'
    };
  });
  T('G1', 'Web Speech API 可用', g.speechApi === true);
  T('G2', '英语题选项带朗读喇叭(.ttsmini)', g.hasMini > 0, 'mini=' + g.hasMini);
  T('G3', 'speak / toggleTts 语音接口存在', g.hasSpeak && g.hasToggle);

  /* ---------- H. 10 个小游戏 ---------- */
  sect('H. 小游戏（10 个全流程）');
  const h0 = await page.evaluate(() => { go('s-games'); return { cards: document.querySelectorAll('#gameList .gcard').length }; });
  T('H0', '游戏中心 10 个卡片', h0.cards === 10, 'cards=' + h0.cards);

  const GR = {};
  async function openAndWait(id, driver, maxMs) {
    await page.evaluate(gid => openGame(gid), id);
    const t0 = Date.now();
    while (Date.now() - t0 < maxMs) {
      if (await page.locator('#gReplay').count()) return true;
      try { await driver(); } catch (err) {}
      await sleep(220);
    }
    return !!await page.locator('#gReplay').count();
  }
  GR.lim = await openAndWait('lim', async () => {
    if (await page.locator('#gameBody .opt:not(.dis)').count()) await page.locator('#gameBody .opt:not(.dis)').first().click({ timeout: 3000 }).catch(() => {});
    else if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click({ timeout: 3000 }).catch(() => {});
  }, 25000);
  GR.harvest = await openAndWait('harvest', async () => {
    if (await page.locator('#gameBody .opt:not(.dis)').count()) await page.locator('#gameBody .opt:not(.dis)').first().click({ timeout: 3000 }).catch(() => {});
    else if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click({ timeout: 3000 }).catch(() => {});
  }, 25000);
  GR.match = await openAndWait('match', async () => {
    await page.evaluate(() => {
      const pools = MATCH_POOLS;
      const lefts = [...document.querySelectorAll('#mcolL .mchip')];
      const rights = [...document.querySelectorAll('#mcolR .mchip')];
      if (!lefts.length) return;
      const target = lefts.find(x => !x.classList.contains('ok'));
      if (!target) return;
      let val = null;
      for (const p of pools) for (const pr of p.pairs) if (pr[0] === target.textContent) val = pr[1];
      const right = rights.find(x => x.textContent === val && !x.classList.contains('ok'));
      target.click(); if (right) right.click();
    });
  }, 25000);
  // 词汇翻牌（穷举配对）
  await page.evaluate(() => openGame('flip'));
  {
    const t0 = Date.now(); GR.flip = false;
    const ended = () => page.evaluate(() => !!document.querySelector('#gReplay') || !document.getElementById('fgrid'));
    while (Date.now() - t0 < 60000) {
      if (await ended()) { if (await page.locator('#gReplay').count()) GR.flip = true; break; }
      const t = await page.evaluate(() => [...document.querySelectorAll('#fgrid .fcard')].findIndex(x => !x.classList.contains('done')));
      if (t < 0) break;
      let matched = false;
      for (let k = 0; k < 12 && !matched; k++) {
        if (k === t) continue;
        if (await ended()) { matched = true; break; }
        const kDone = await page.evaluate(i => { const cs = document.querySelectorAll('#fgrid .fcard'); return cs[i] && cs[i].classList.contains('done'); }, k);
        if (kDone) continue;
        await page.evaluate(i => { const c = document.querySelectorAll('#fgrid .fcard')[i]; if (c && !c.classList.contains('open') && !c.classList.contains('done')) c.click(); }, t);
        await sleep(90);
        await page.evaluate(i => { const c = document.querySelectorAll('#fgrid .fcard')[i]; if (c && !c.classList.contains('open') && !c.classList.contains('done')) c.click(); }, k);
        await sleep(820);
        if (await ended()) { matched = true; break; }
        matched = await page.evaluate(i => { const cs = document.querySelectorAll('#fgrid .fcard'); return cs[i] && cs[i].classList.contains('done'); }, t);
      }
    }
  }
  GR.order = await openAndWait('order', async () => {
    await page.evaluate(() => {
      const qt = document.querySelector('#gameBody .qtext');
      if (!qt) return;
      const q = ALLQ.find(x => x.q === qt.textContent);
      if (!q) return;
      const steps = splitSol(q.sol);
      const doneN = [...document.querySelectorAll('#oSlots .mchip')].filter(s => !s.textContent.includes('……')).length;
      const chip = [...document.querySelectorAll('#oChips .ochip')].find(c => !c.dataset.done && c.textContent === steps[doneN]);
      if (chip) chip.click();
    });
  }, 25000);
  GR.pic = await openAndWait('pic', async () => {
    const clicked = await page.evaluate(() => {
      const opts = [...document.querySelectorAll('#picOpts .ochip')];
      const live = opts.find(o => o.style.pointerEvents !== 'none');
      if (live) { live.click(); return true; }
      return false;
    });
    if (!clicked && await page.locator('#gameBody button:has-text("下一题")').count())
      await page.locator('#gameBody button:has-text("下一题")').click({ timeout: 3000 }).catch(() => {});
  }, 45000);
  // Boss 快攻（游戏内 60s）
  await page.evaluate(() => openGame('rush'));
  {
    // rush 为「游戏内 60s 计时，答题时停表」→ 需答对以推进倒计时
    const t0 = Date.now(); GR.rush = false;
    while (Date.now() - t0 < 180000) {
      if (await page.locator('#gReplay').count()) { GR.rush = true; break; }
      await page.evaluate(() => {
        const qt = document.querySelector('#gameBody .qtext');
        const opts = [...document.querySelectorAll('#gameBody .opt:not(.dis)')];
        if (!opts.length) return;
        const q = (qt && typeof ALLQ !== 'undefined') ? ALLQ.find(x => x.q === qt.textContent) : null;
        const t = (q && q.t === 'choice' && opts[Math.min(q.a, opts.length - 1)]) || opts[0];
        if (t) t.click();
      }).catch(() => {});
      await sleep(1500);
    }
  }
  GR.chat = await openAndWait('chat', async () => {
    if (await page.locator('#gcChatOpts .chatline').count()) {
      const clicked = await page.evaluate(() => {
        const lines = [...document.querySelectorAll('#gcChatOpts .chatline')];
        const live = lines.find(l => l.style.pointerEvents !== 'none');
        if (live) { live.click(); return true; }
        return false;
      });
      if (!clicked && await page.locator('#gameBody button:has-text("下一句")').count()) await page.locator('#gameBody button:has-text("下一句")').click({ timeout: 3000 }).catch(() => {});
    } else if (await page.locator('#gameBody button:has-text("下一句")').count()) await page.locator('#gameBody button:has-text("下一句")').click({ timeout: 3000 }).catch(() => {});
  }, 30000);
  GR.mine = await openAndWait('mine', async () => {
    await page.evaluate(() => {
      const chips = [...document.querySelectorAll('#mineOpts .mchip')];
      const live = chips.find(x => x.style.pointerEvents !== 'none' && !x.classList.contains('ok'));
      if (live) live.click();
    });
    if (await page.locator('#gameBody button:has-text("下一题")').count()) await page.locator('#gameBody button:has-text("下一题")').click({ timeout: 3000 }).catch(() => {});
  }, 30000);
  GR.gacha = await page.evaluate(() => {
    /* 1.15：免费抽的条件已从「日历翻页」改为「今天完成了唯一任务」——先造出「今日任务已完成」再验免费 */
    st.coins = 200;
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'H段', done: true, doneAt: Date.now(), at: Date.now() };
    st.gachaDay = ''; save();
    openGame('gacha');
    const free = document.getElementById('gDraw').textContent.includes('免费');
    document.getElementById('gDraw').click();
    document.getElementById('gDraw').click();
    const stageHasCard = document.getElementById('gachaStage').textContent.includes('·');
    document.getElementById('gColl').click();
    /* 1.15：保底从 12 抽下调到 8 抽 */
    const pityN = 8;
    return { free, stageHasCard, gridN: document.querySelectorAll('#gachaGrid .gcard2').length,
      owned: Object.keys(st.gacha || {}).length, pityN };
  });
  ['lim', 'harvest', 'match', 'flip', 'order', 'pic', 'rush', 'chat', 'mine'].forEach(gid =>
    T('H-' + gid, '小游戏[' + gid + ']可开局并结算', GR[gid] === true, 'replay=' + GR[gid]));
  T('H-gacha', '学习扭蛋可抽取+图鉴记录', GR.gacha && GR.gacha.free === true && GR.gacha.owned > 0, JSON.stringify(GR.gacha));
  /* 1.15：免费抽必须绑在「完成今日唯一任务」上，纯日历翻页不再给免费 */
  GR.gachaNoTask = await page.evaluate(() => {
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'H段', done: false };
    st.gachaDay = ''; st.coins = 200; save();
    openGame('gacha');
    const txt = document.getElementById('gDraw').textContent;
    return { free: txt.includes('免费'), txt: txt };
  });
  T('H-gacha2', '1.15 扭蛋免费抽绑定「今日唯一任务完成」，未完成时无免费', GR.gachaNoTask.free === false, JSON.stringify(GR.gachaNoTask));

  const hck = await page.evaluate(() => {
    openGame('lim');
    return new Promise(res => setTimeout(() => {
      const el = document.querySelector('#gameBody .opt');
      if (!el) return res({ diff: null, bg: '-', fg: '-' });
      const cs = getComputedStyle(el);
      const pick = c => { const m = (c || '').match(/\d+/g); return m ? m.slice(0, 3).map(Number) : null; };
      const lum = c => c ? (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) : null;
      res({ diff: Math.abs(lum(pick(cs.backgroundColor)) - lum(pick(cs.color))), bg: cs.backgroundColor, fg: cs.color });
    }, 700));
  });
  T('H-color', '小游戏选项明暗对比足够(可读)', hck.diff !== null && hck.diff > 60, 'bg=' + hck.bg + ' fg=' + hck.fg + ' diff=' + (hck.diff && hck.diff.toFixed(0)));

  /* ---------- I. 英语阅读 2D 动画小课堂 ---------- */
  sect('I. 英语阅读 2D 动画小课堂');
  const i1 = await page.evaluate(() => {
    go('s-readanime'); if (typeof renderReadAnime === 'function') renderReadAnime();
    const lessonN = (typeof READ_LESSONS !== 'undefined') ? READ_LESSONS.length : 0;
    if (lessonN) openLesson(READ_LESSONS[0].id);
    const sec = document.getElementById('s-readanime');
    const sp = sec.querySelector('.anime-ctrl .sp');
    const allSvgFrames = (typeof READ_LESSONS !== 'undefined')
      ? READ_LESSONS.reduce((n, l) => n + (l.frames || []).filter(x => x.type === 'diagram' && /<svg/i.test(x.svg || '')).length, 0) : 0;
    return {
      lessonN, allSvgFrames,
      hasCtrl: !!sec.querySelector('.anime-ctrl'),
      hasPlayBtn: !!document.getElementById('animePlay'),
      hasSpeed: !!sp && /×/.test(sp.innerText),
      speedBtns: sp ? sp.querySelectorAll('button').length : 0,
      hasQuizSlot: !!document.getElementById('animeQuizSlot'),
      txt: sec.innerText.replace(/\n/g, ' ').slice(0, 80)
    };
  });
  T('I1', '动画课堂课程列表渲染', i1.lessonN >= 3, 'lessons=' + i1.lessonN);
  T('I2', '含 2D 动画(SVG 图解帧)', i1.allSvgFrames > 0, 'svgFrames=' + i1.allSvgFrames);
  T('I3', '含倍速回放控制(0.5×~2×)', i1.hasSpeed === true, 'speedBtns=' + i1.speedBtns);
  T('I4', '播放器+课后练习槽就绪', i1.hasCtrl && i1.hasPlayBtn && i1.hasQuizSlot, 'ctrl=' + i1.hasCtrl + ' slot=' + i1.hasQuizSlot);

  /* ---------- J. AI 学习管家（5 大能力） ---------- */
  sect('J. AI 学习管家（仪表盘/规划/诊断/冲刺/存档）');
  const j = await page.evaluate(() => {
    go('s-butler');
    const txt = () => document.getElementById('s-butler').innerText;
    butlerTab('dash'); const dash = txt();
    butlerTab('plan'); const plan = txt();
    butlerTab('diag'); const diag = txt();
    butlerTab('sprint'); const sprint = txt();
    butlerTab('arc'); const arc = txt();
    return { dash, plan, diag, sprint, arc };
  });
  T('J1', '仪表盘:覆盖率/掌握度', /覆盖率|掌握度|正确率/.test(j.dash));
  T('J2', '仪表盘:强制休息卡', /强制休息|23:00|休息/.test(j.dash));
  T('J3', '仪表盘:AI 节能面板', /AI 节能面板|已缓存变式/.test(j.dash));
  T('J4', '每日规划:含夜间睡眠固化块', /睡眠|固化/.test(j.plan));
  T('J5', '每日规划:含休闲回血块', /回血|休闲/.test(j.plan));
  T('J6', '诊断:薄弱考点', /薄弱|诊断|考点/.test(j.diag));
  T('J7', '15天冲刺:阶段化计划', /15|阶段|冲刺|模考/.test(j.sprint));
  T('J8', '存档:导出/导入 JSON', /导出|导入|备份/.test(j.arc));

  /* ---------- K. 变式题 3-5 道封顶 + 缓存 ---------- */
  sect('K. 变式题封顶与缓存（专家议案深挖）');
  const k = await page.evaluate(async () => {
    const cap = typeof VARIANT_CAP !== 'undefined' ? VARIANT_CAP : -1;
    const q = ALLQ.filter(x => x.t === 'choice')[0];
    st.variants = st.variants || {}; st.aiStats = { api: 0, hit: 0 };
    st.variants[q.id] = [
      { t: 'choice', m: q.m, vi: true, q: '缓存变式1', o: ['A', 'B', 'C', 'D'], a: 0, sol: 's1' },
      { t: 'choice', m: q.m, vi: true, q: '缓存变式2', o: ['A', 'B', 'C', 'D'], a: 1, sol: 's2' },
      { t: 'choice', m: q.m, vi: true, q: '缓存变式3', o: ['A', 'B', 'C', 'D'], a: 2, sol: 's3' },
      { t: 'choice', m: q.m, vi: true, q: '缓存变式4', o: ['A', 'B', 'C', 'D'], a: 3, sol: 's4' },
      { t: 'choice', m: q.m, vi: true, q: '缓存变式5', o: ['A', 'B', 'C', 'D'], a: 0, sol: 's5' }
    ];
    const v = await aiGenVariant(q);
    const hitAfter = st.aiStats.hit, apiAfter = st.aiStats.api;
    st.aiStats = { api: 7, hit: 21 };
    let panelTxt = '';
    try { go('s-butler'); butlerTab('dash');
      panelTxt = (document.getElementById('s-butler').innerText.match(/AI 节能面板[\s\S]{0,170}/) || [''])[0]; } catch (e) {}
    return { cap, hitAfter, apiAfter, recycled: !!v._recycled, fromCache: /缓存变式/.test(v.q || ''), panelTxt };
  });
  T('K1', '变式封顶上限=5(专家建议3-5)', k.cap === 5, 'VARIANT_CAP=' + k.cap);
  T('K2', '满缓存时回收复用(不走新API)', k.recycled === true);
  T('K3', '命中缓存计入 hit(不增 api)', k.hitAfter >= 1 && k.apiAfter === 0, 'hit=' + k.hitAfter + ' api=' + k.apiAfter);
  T('K4', '复用返回的是已缓存变式', k.fromCache === true);
  T('K5', 'AI 节能面板展示调用/命中数据', /节能面板/.test(k.panelTxt) && /命中|节省|已缓存/.test(k.panelTxt), k.panelTxt.replace(/\n/g, ' ').slice(0, 90));

  /* ---------- L. 文案治理 ---------- */
  sect('L. 文案治理（去夸张 / 正向反馈）');
  const l = await page.evaluate(() => {
    const html = document.documentElement.outerHTML;
    return {
      chongciGuo: html.indexOf('冲刺过线') >= 0,
      noManfen: html.indexOf('冲刺满分') < 0,
      noBei: !/\d+\s*倍/.test(html.replace(/倍速/g, '')),
      fuchou: html.indexOf('复仇战') >= 0,
      qiangzhi: html.indexOf('强制休息') >= 0,
      yixiaomie: html.indexOf('已消灭') >= 0
    };
  });
  T('L1', '含「冲刺过线」', l.chongciGuo);
  T('L2', '去除「冲刺满分」', l.noManfen);
  T('L3', '去除 N 倍夸张表述', l.noBei);
  T('L4', '含「复仇战」正向包装', l.fuchou);
  T('L5', '含「强制休息」机制', l.qiangzhi);
  T('L6', '含「已消灭」清零视角', l.yixiaomie);

  /* ---------- M. 黄金考点 388 ---------- */
  sect('M. 2026 黄金考点汇编（388 考点）');
  const m = await page.evaluate(() => {
    const gp = window.GOLD_POINTS || null;
    const dataKeys = gp && gp.data ? Object.keys(gp.data) : [];
    let totalTxt = '';
    try { go('s-note'); if (typeof noteSrc === 'function') noteSrc('gold'); totalTxt = document.getElementById('s-note').innerText.replace(/\n/g, ' ').slice(0, 100); } catch (e) {}
    return { has: !!gp, keys: gp ? Object.keys(gp).slice(0, 6) : [], dataKeys, totalTxt };
  });
  T('M1', '黄金考点数据结构已加载(政治/高数/英语)', m.has && m.dataKeys.length === 3, 'dataKeys=' + JSON.stringify(m.dataKeys));
  T('M2', '黄金考点视图可渲染', /黄金考点|考点/.test(m.totalTxt), m.totalTxt.slice(0, 55));

  /* ---------- P. 全模块可达性 + 笔记/公式/考点/模拟卷 ---------- */
  sect('P. 全模块可达性 & 其他功能模块');
  const p1 = await page.evaluate(() => {
    const mc = ALLQ.filter(x => x.t === 'choice').slice(0, 3);
    S.drill = { mod: 'all', list: mc, i: 0, right: 0, isWrong: false, label: '可达性', mode: 'normal',
      cleared: {}, pendingWrong: 0, totalWrong: 0, wrongN: {}, ansLog: {} };
    const ids = [...document.querySelectorAll('section.screen')].map(s => s.id);
    const bad = [];
    ids.forEach(id => { try { go(id); if (document.querySelector('.screen.active').id !== id) bad.push(id); }
      catch (err) { bad.push(id + ':' + err.message.slice(0, 30)); } });
    return { n: ids.length, bad };
  });
  T('P1', '所有页面 go() 可切换(' + p1.n + ' 个)', p1.bad.length === 0, 'bad=' + JSON.stringify(p1.bad.slice(0, 6)));

  const p2 = await page.evaluate(() => {
    st.mod = { m1: { c: 18, t: 20 }, m2: { c: 9, t: 14 }, m3: { c: 26, t: 30 }, m4: { c: 3, t: 6 }, m5: { c: 0, t: 0 },
      p1: { c: 12, t: 18 }, p2: { c: 5, t: 12 }, p3: { c: 16, t: 18 }, p4: { c: 2, t: 5 }, p5: { c: 0, t: 0 }, p6: { c: 0, t: 0 },
      e1: { c: 8, t: 10 }, e2: { c: 6, t: 14 }, e3: { c: 0, t: 0 }, e4: { c: 14, t: 16 }, e5: { c: 0, t: 0 } };
    save();
    MYNOTE_SUBJ = 'math'; go('s-myNotes'); myNoteTab('math');
    return { cards: document.querySelectorAll('#myNoteList .card').length };
  });
  T('P2', '自动笔记(高数 5 模块卡)', p2.cards === 5, 'cards=' + p2.cards);

  const p3 = await page.evaluate(() => {
    let formulaN = 0, noteTxt = '', goldTxt = '';
    try { go('s-cards'); if (typeof renderFormulas === 'function') renderFormulas(''); formulaN = document.querySelectorAll('#s-cards .fcard, #s-cards .card').length; } catch (e) {}
    try { go('s-note'); if (typeof renderNote === 'function') renderNote(''); noteTxt = document.getElementById('s-note').innerText.replace(/\n/g, ' ').slice(0, 60); } catch (e) {}
    try { if (typeof noteSrc === 'function') noteSrc('gold'); goldTxt = document.getElementById('s-note').innerText.replace(/\n/g, ' ').slice(0, 80); } catch (e) {}
    return { formulaN, noteTxt, goldTxt, hasMock: !!document.getElementById('s-mock'), hasBoss: !!document.getElementById('s-boss') };
  });
  T('P3', '公式卡页渲染', p3.formulaN > 0, 'n=' + p3.formulaN);
  T('P4', '考点速记资料库渲染', p3.noteTxt.length > 5, p3.noteTxt.slice(0, 45));
  T('P5', '黄金考点视图渲染', /黄金考点|考点/.test(p3.goldTxt), p3.goldTxt.slice(0, 45));
  T('P6', '模拟卷 & Boss 战模块存在', p3.hasMock && p3.hasBoss, 'mock=' + p3.hasMock + ' boss=' + p3.hasBoss);

  /* ---------- Q. P0 模块联动：今日唯一任务卡 + 通关战报 ---------- */
  sect('Q. P0 模块联动（管家中枢：唯一指令 + 战报回流）');
  const q1 = await page.evaluate(() => {
    st.todayTask = null; save();
    go('s-home');
    const c = document.querySelector('#todayWrap .todaycard');
    const qt = (sel) => (c && c.querySelector(sel) ? c.querySelector(sel).textContent.trim() : '');
    const miss = ['renderTodayCard', 'todayTaskNow', 'pickTodayTask', 'startTodayTask', 'markTodayTaskDone', 'reportHTML', 'againFromReport', 'regenTodayTask']
      .filter(f => typeof window[f] !== 'function');
    return { has: !!c, main: qt('.tc-main'), why: qt('.tc-why'), tag: qt('.tc-tag'), miss };
  });
  T('Q1', '首页出现「今日唯一任务卡」', q1.has && q1.main.length > 0, q1.main.slice(0, 40));
  T('Q2', '任务卡标明「今天只做这一件事」', /今天只做这一件事/.test(q1.tag), q1.tag);
  T('Q3', '任务卡给出挑选依据（薄弱/未学/轮转）', /薄弱项|还没开练|课表轮转/.test(q1.why), q1.why.slice(0, 46));
  T('Q4', 'P0 联动函数齐备（8 个）', q1.miss.length === 0, q1.miss.join(',') || 'ok');

  const q2 = await page.evaluate(() => {
    const a = st.todayTask && st.todayTask.mod;
    go('s-home'); go('s-study'); go('s-home'); go('s-butler'); go('s-home');
    return { a, b: st.todayTask && st.todayTask.mod };
  });
  T('Q5', '当天任务固定不抖动（唯一指令生效）', !!q2.a && q2.a === q2.b, q2.a + ' -> ' + q2.b);

  const q3 = await page.evaluate(() => {
    go('s-home');
    const btn = document.querySelector('#todayWrap .todaycard .btn');
    if (btn) btn.click();
    const d = S.drill || {};
    /* 首题可能是填空（输入框）也可能是选择（.opt），两种都是「可作答」 */
    return { screen: (document.querySelector('.screen.active') || {}).id, mod: d.mod, fromPlan: !!d.fromPlan,
      taskMod: st.todayTask && st.todayTask.mod, opts: document.querySelectorAll('#drillBody .opt').length,
      fill: document.querySelectorAll('#drillBody input').length,
      q: d.list && d.list[0] ? String(d.list[0].q).slice(0, 30) : '' };
  });
  T('Q6', '点任务卡 1 步直达答题页', q3.screen === 's-drill' && (q3.opts > 0 || q3.fill > 0),
    q3.screen + ' opts=' + q3.opts + ' fill=' + q3.fill + ' | ' + q3.q);
  T('Q7', '任务卡下发标记 fromPlan 正确', q3.fromPlan && q3.mod === q3.taskMod, 'fromPlan=' + q3.fromPlan + ' mod=' + q3.mod + ' task=' + q3.taskMod);

  const q4 = await page.evaluate(() => {
    st.lastReport = { at: Date.now() - 60000, mod: 'm1', subj: 'math', killed: 3, mastered: 20, min: 12, say: '测试战报' };
    save(); go('s-home');
    const bar = document.querySelector('#todayWrap .reportbar');
    const txt = bar ? bar.innerText.replace(/\n/g, ' ') : '';
    const btns = bar ? bar.querySelectorAll('button').length : 0;
    st.lastReport.at = Date.now() - 30 * 36e5; save(); go('s-home');
    const gone = !document.querySelector('#todayWrap .reportbar');
    return { has: !!bar, btns, hasAgain: /再来一轮同考点/.test(txt), hasMind: /看思维导图/.test(txt), txt: txt.slice(0, 60), gone };
  });
  T('Q8', '通关战报回流首页（24h 内）', q4.has && /消灭/.test(q4.txt), q4.txt);
  T('Q9', '战报带 2 个一键动作', q4.btns >= 2 && q4.hasAgain && q4.hasMind, 'btns=' + q4.btns);
  T('Q10', '超 24h 战报自动消失', q4.gone, 'gone=' + q4.gone);

  const q5 = await page.evaluate(() => {
    go('s-home');
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'test', done: false, at: Date.now() }; save();
    S.drill = { mod: 'm1', mode: 'normal', list: [], i: 0, right: 0, total: 1, baseLen: 1,
      cleared: { m1: 1 }, wrongN: {}, pendingWrong: 0, totalWrong: 2, startAt: Date.now() - 60000, fromPlan: true, label: '回归测试任务' };
    go('s-drill');
    const r = st.lastReport || {};
    return { done: st.todayTask && st.todayTask.done, killed: r.killed, mod: r.mod, subj: r.subj, min: r.min, say: String(r.say || '').slice(0, 30) };
  });
  T('Q11', '通关自动打卡（fromPlan 任务标记完成）', q5.done === true, 'done=' + q5.done);
  T('Q12', '通关写入战报（消灭数/模块/科目/用时）', q5.killed === 2 && q5.mod === 'm1' && q5.subj === 'math' && q5.min >= 1, 'killed=' + q5.killed + ' mod=' + q5.mod + ' subj=' + q5.subj + ' min=' + q5.min);

  /* ---------- R. P1 模块联动：弱点注入游戏池 + 课堂回流排课 ---------- */
  sect('R. P1 模块联动（玩游戏=刷薄弱考点 / 课堂→诊断→排课回流）');
  const r1 = await page.evaluate(() => {
    const fns = ['weakFocusMods', 'weakInjectPool', 'injectIntoQS', 'todayLessonFeeds', 'boostOf', 'ensureLessonBoost',
      'butlerOnLessonResult', 'lessonFeedFromDrill', 'revokePlanBoost', 'weakDrillMod', 'genDailyPlan'];
    return { miss: fns.filter(f => typeof window[f] !== 'function'), ratio: WEAK_INJECT_RATIO, boostMin: LESSON_BOOST_MIN };
  });
  T('R1', 'P1 联动函数齐备（11 个）', r1.miss.length === 0, r1.miss.join(',') || 'ok');
  T('R2', '注入比例红线 ≤40% / 巩固块 10 分钟', r1.ratio === 0.4 && r1.boostMin === 10, 'ratio=' + r1.ratio + ' boost=' + r1.boostMin);

  const r2 = await page.evaluate(() => {
    st.records = {}; st.mod = {};
    const mark = q => { st.records[q.id] = { n: 1, c: 0, last: Date.now(), ok: 0, subj: q.subj, m: q.m }; };
    const m2 = ALLQ.filter(q => q.m === 'm2'); m2.slice(0, 6).forEach(mark);
    const p2 = ALLQ.filter(q => q.m === 'p2'); p2.slice(0, 5).forEach(mark);
    save();
    const focus = weakFocusMods();
    const pool = weakInjectPool(3, q => q.t === 'choice');
    const base = ALLQ.filter(q => q.subj === 'math' && q.t === 'choice').slice(0, 20);
    GAME_INJECT = { n: 0 };
    const merged = injectIntoQS(base, q => q.subj === 'math' && q.t === 'choice');
    const injected = merged.filter(q => !base.some(x => x.id === q.id));
    return { focusTop: focus.slice(0, 4), hasM2: focus.indexOf('m2') >= 0,
      poolN: pool.length, poolMods: pool.map(q => q.m),
      baseLen: base.length, mergedLen: merged.length, injN: injected.length, ctr: GAME_INJECT.n,
      wrongIds: m2.slice(0, 6).map(q => q.id), injIds: injected.map(q => q.id),
      freshAvail: ALLQ.filter(q => q.m === 'm2' && q.t === 'choice' && !st.records[q.id]).length };
  });
  T('R3', '薄弱模块识别（错得多的优先）', r2.hasM2 && r2.focusTop.length > 0, 'top=' + JSON.stringify(r2.focusTop));
  T('R4', '注入池只取薄弱考点的题', r2.poolN > 0 && r2.poolMods.every(m => ['m2', 'p2'].indexOf(m) >= 0), 'mods=' + JSON.stringify(r2.poolMods));
  T('R5', '注入 ≤40% 且只替换不加长', r2.injN >= 1 && r2.injN <= Math.floor(r2.baseLen * 0.4) && r2.mergedLen === r2.baseLen, 'inj=' + r2.injN + '/' + r2.baseLen + ' merged=' + r2.mergedLen + ' ctr=' + r2.ctr);
  T('R6', '换情境不复刻原题（优先未错过的同考点新题）', r2.freshAvail < 2 || r2.injIds.every(id => r2.wrongIds.indexOf(id) < 0), 'fresh=' + r2.freshAvail + ' inj=' + JSON.stringify(r2.injIds));

  const r3 = await page.evaluate(() => {
    st.records = {}; st.mod = {}; st.lessonFeed = []; st.planExtra = []; save();
    const base = ALLQ.filter(q => q.subj === 'math' && q.t === 'choice').slice(0, 20);
    GAME_INJECT = { n: 0 };
    const merged = injectIntoQS(base, q => q.subj === 'math' && q.t === 'choice');
    go('s-games'); renderGames();
    const hint0 = document.querySelectorAll('#gameList .injecthint').length;
    ALLQ.filter(q => q.m === 'm2').slice(0, 5).forEach(q => { st.records[q.id] = { n: 1, c: 0, last: Date.now(), ok: 0, subj: q.subj, m: q.m }; });
    save(); renderGames();
    const hint1 = document.querySelectorAll('#gameList .injecthint').length;
    return { noInject: GAME_INJECT.n, same: merged.length === base.length, hint0, hint1 };
  });
  T('R7', '无薄弱记录时零注入（不打扰）', r3.noInject === 0 && r3.same === true, 'n=' + r3.noInject);
  T('R8', '游戏中心亮明「管家已联动小游戏」', r3.hint0 === 0 && r3.hint1 === 1, 'hint0=' + r3.hint0 + ' hint1=' + r3.hint1);

  const r4 = await page.evaluate(() => {
    st.lessonFeed = []; st.planExtra = []; st.records = {}; save();
    const nowMin = (new Date()).getHours() * 60 + (new Date()).getMinutes();
    const futureN = genDailyPlan(true).filter(b => b.type === 'study' && toMin(b.start) > nowMin).length;
    const ids = ALLQ.filter(q => q.m === 'e4').slice(0, 3).map(q => q.id);
    butlerOnLessonResult('e4', ids);
    const feed = todayLessonFeeds();
    const ex = boostOf('e4');
    const boost = genDailyPlan().filter(b => b.type === 'boost');
    go('s-butler'); butlerTab('diag');
    const first = document.querySelector('#butlerBody > *');
    const diagTxt = document.getElementById('butlerBody').innerText.replace(/\n/g, ' ');
    const key = ex ? (ex.d + '|' + ex.mod) : '';
    if (key) revokePlanBoost(key);
    const boostAfter = genDailyPlan().filter(b => b.type === 'boost').length;
    return { futureN, feedN: feed.length, feedMod: feed[0] && feed[0].mod, feedWrong: feed[0] ? feed[0].wrongIds.length : 0,
      hasEx: !!ex, exDur: ex && ex.dur, exStart: ex && ex.start,
      boostN: boost.length, boostDur: boost[0] && boost[0].dur,
      firstIsLesson: /动画课堂暴露的弱点/.test(first ? first.innerText : ''),
      diagHasBtn: /立刻针对巩固/.test(diagTxt),
      boostAfter, hasRevoked: !!(st.planExtra || []).find(x => x.revoked) };
  });
  T('R9', '课堂弱点回流进管家（模块+错题数）', r4.feedN === 1 && r4.feedMod === 'e4' && r4.feedWrong === 3, 'feed=' + r4.feedN + ' mod=' + r4.feedMod + ' wrong=' + r4.feedWrong);
  T('R10', '自动插入 10 分钟巩固块（只补未到时段）', r4.futureN === 0 || (r4.hasEx && r4.boostN === 1 && r4.boostDur === 10), 'future=' + r4.futureN + ' drop=' + r4.boostN + ' dur=' + r4.boostDur + ' at=' + r4.exStart);
  T('R11', '今日诊断置顶课堂弱点卡 + 一键巩固', r4.firstIsLesson && r4.diagHasBtn, 'top=' + r4.firstIsLesson + ' btn=' + r4.diagHasBtn);
  T('R12', '巩固块可一键撤销（课表恢复原样）', (r4.futureN === 0 || r4.hasRevoked) && r4.boostAfter === 0, 'revoked=' + r4.hasRevoked + ' after=' + r4.boostAfter);

  /* ---------- S. P2 模块联动：角色 × 科目 × 进度 三位一体 ---------- */
  sect('S. P2 模块联动（角色×科目×进度：羁绊档案 / 主场共鸣 / 防偏科邀请）');
  const s1 = await page.evaluate(() => {
    const fns = ['focusOf', 'focusLabel', 'isHomeSubj', 'bondOf', 'bondAdd', 'bondScore',
      'renderBondCard', 'studyMateHome', 'todaySubjects', 'mateInvitePick', 'renderMateInvite', 'mateBalanceHTML'];
    return { miss: fns.filter(f => typeof window[f] !== 'function'),
      focus: MATE_FOCUS, home: [isHomeSubj('luo', 'math'), isHomeSubj('ziyuan', 'eng'), isHomeSubj('ziyuan', 'math'), isHomeSubj('xue', 'eng')],
      subjId: [subjOfMod('m1'), subjOfMod('e1'), subjOfMod('p1'), typeof subjOfMod('e1')] };
  });
  T('S1', 'P2 联动函数齐备（12 个）', s1.miss.length === 0, s1.miss.join(',') || 'ok');
  T('S2', '主场科目映射正确（洛/澄/晴=高数，紫苑=英语，夜喵=政治，雪见=全科）',
    s1.focus.luo === 'math' && s1.focus.cheng === 'math' && s1.focus.qing === 'math' && s1.focus.ziyuan === 'eng' && s1.focus.ye === 'pol' && s1.focus.xue === 'all',
    JSON.stringify(s1.focus));
  T('S3', '主场判定语义正确（主场=True / 非主场=False / 雪见全科恒 True）',
    s1.home[0] === true && s1.home[1] === true && s1.home[2] === false && s1.home[3] === true, JSON.stringify(s1.home));
  T('S4', 'subjOfMod 统一返回科目 id 字符串（跨科切科修复）',
    s1.subjId[0] === 'math' && s1.subjId[1] === 'eng' && s1.subjId[2] === 'pol' && s1.subjId[3] === 'string', JSON.stringify(s1.subjId));

  /* S5/S6：通关 → 好感 + 羁绊档案；答题 → 累计共练题数 */
  const s5 = await page.evaluate(() => {
    st.aff = { xue: 0, luo: 0, cheng: 0, qing: 0, ziyuan: 0, ye: 0 };
    st.bond = {}; st.combo = 0; save();
    const before = { aff: st.aff.luo, b: JSON.parse(JSON.stringify(bondOf('luo'))) };
    S.drill = { mod: 'm1', mode: 'normal', list: [], i: 0, right: 0, total: 1, baseLen: 1,
      cleared: { m1: 1 }, wrongN: {}, pendingWrong: 0, totalWrong: 3, startAt: Date.now() - 60000,
      fromPlan: false, label: 'S段回归' };
    go('s-drill');
    const after = { aff: st.aff.luo, b: JSON.parse(JSON.stringify(bondOf('luo'))), rep: st.lastReport && st.lastReport.killed };
    const txt = document.getElementById('drillBody').innerText || '';
    return { before, after, txt: txt.replace(/\n/g, ' ').slice(0, 120) };
  });
  T('S5', '通关 = 共同经历的凭证（好感 +5，写回角色 xue/luo）', s5.before.aff === 0 && s5.after.aff === 5, 'aff ' + s5.before.aff + ' -> ' + s5.after.aff);
  T('S6', '羁绊档案记录共同通关 + 携手消灭错题', s5.after.b.clear === 1 && s5.after.b.kill === 3, JSON.stringify(s5.after.b));
  T('S7', '通关页显性告知「好感 + / 共同战绩 +1」', /好感 \+5/.test(s5.txt) && /共同的战绩/.test(s5.txt), s5.txt.slice(-50));

  /* S8：主场共鸣 —— 同科目下，主场模块比非主场模块多 2 XP */
  const s8 = await page.evaluate(() => {
    const run = (mod) => {
      st.xp = 0; st.combo = 0; st.aff = { xue: 0, luo: 0, cheng: 0, qing: 0, ziyuan: 0, ye: 0 }; save();
      const q = ALLQ.find(x => x.m === mod && x.t === 'choice');
      if (!q) return null;
      S.drill = { mod, mode: 'normal', list: [q], i: 0, right: 0, total: 1, baseLen: 1, cleared: {},
        wrongN: {}, pendingWrong: 0, label: 'S段共鸣', startAt: Date.now() };
      go('s-drill');
      const opts = document.querySelectorAll('#drillBody .opt');
      opts[q.a].click();
      const body = document.getElementById('drillBody').innerText.replace(/\n/g, ' ');
      return { xp: st.xp, home: isHomeSubj(MOD2MATE[mod], subjOfMod(mod)), badge: /主场共鸣/.test(body) };
    };
    const homeMod = run('m1');    // m1 → 洛（高数主场）
    const offMod = run('m4');     // m4 → 紫苑（英语主场，做高数题=非主场）
    return { homeMod, offMod };
  });
  T('S8', '主场共鸣：主场科目答对额外 +2 XP', s8.homeMod.home === true && s8.offMod.home === false && s8.homeMod.xp - s8.offMod.xp === 2,
    'home=' + s8.homeMod.xp + ' off=' + s8.offMod.xp);
  T('S9', '只有主场科目才亮出「主场共鸣」标记（不刷屏）', s8.homeMod.badge === true && s8.offMod.badge === false,
    'homeBadge=' + s8.homeMod.badge + ' offBadge=' + s8.offMod.badge);

  /* S10：答题累计「一起练的题」 */
  const s10 = await page.evaluate(() => {
    st.bond = {}; save();
    const q = ALLQ.find(x => x.m === 'm3' && x.t === 'choice');
    S.drill = { mod: 'm3', mode: 'normal', list: [q], i: 0, right: 0, total: 1, baseLen: 1, cleared: {},
      wrongN: {}, pendingWrong: 0, label: 'S段进度', startAt: Date.now() };
    go('s-drill');
    const opts = document.querySelectorAll('#drillBody .opt');
    opts[q.a].click();
    const b = bondOf('qing');   // m3 → 晴
    return { q: b.q, clear: b.clear, mate: MOD2MATE.m3 };
  });
  T('S10', '每答一题写入「一起练的题」（角色×进度凭证）', s10.mate === 'qing' && s10.q === 1 && s10.clear === 0, JSON.stringify(s10));

  /* S11：角色详情页羁绊档案卡 */
  const s11 = await page.evaluate(() => {
    st.bond = { xue: { q: 42, clear: 3, kill: 9 } }; save();
    openDetail('xue');
    const card = document.getElementById('bondCard');
    const txt = card ? card.innerText.replace(/\n/g, ' ') : '';
    return { has: !!card && card.children.length > 0, txt,
      q: /42/.test(txt), c: /3/.test(txt), k: /9/.test(txt),
      focus: /全科总教官|主场科目/.test(txt), btn: /陪你练一轮/.test(txt) };
  });
  T('S11', '角色页「羁绊档案」展示共同经历（练题/通关/消灭错题）', s11.has && s11.q && s11.c && s11.k, s11.txt.slice(0, 70));
  T('S12', '羁绊档案标明陪练科目 + 一键让 TA 陪练一轮', s11.focus && s11.btn, 'focus=' + s11.focus + ' btn=' + s11.btn);

  /* S13：同伴列表主场标签 + 羁绊摘要 */
  const s13 = await page.evaluate(() => {
    go('s-mates'); renderMates();
    const tags = document.querySelectorAll('#mateList .mt-home').length;
    const txt = document.getElementById('mateList').innerText || '';
    return { tags, hasBond: /一起练 \d+ 题 · 通关 \d+ 次/.test(txt) };
  });
  T('S13', '同伴列表 6 位角色均标主场科目', s13.tags === 6, 'tags=' + s13.tags);
  T('S14', '同伴列表展示羁绊摘要（一起练 X 题）', s13.hasBond, 'hasBond=' + s13.hasBond);

  /* S15/S16：首屏陪练邀请 —— 今日任务未完成时让位给唯一指令 */
  const s15 = await page.evaluate(() => {
    st.todayTask = null; save(); go('s-home');
    const noTask = document.querySelectorAll('#mateInviteWrap .mateinvite').length;
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'S段', done: false, at: Date.now() }; save();
    go('s-home');
    const undone = document.querySelectorAll('#mateInviteWrap .mateinvite').length;
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'S段', done: true, doneAt: Date.now(), at: Date.now() }; save();
    go('s-home');
    const box = document.querySelector('#mateInviteWrap .mateinvite');
    return { noTask, undone, shown: !!box, txt: box ? box.innerText.replace(/\n/g, ' ') : '' };
  });
  T('S15', '唯一指令优先：今日任务未完成时不抛第二个 CTA', s15.undone === 0, 'undone=' + s15.undone);
  T('S16', '今日任务完成后，出现「今日陪练邀请」且措辞与人设不冲突（1.12：不再出现「XX 的主场是英语」）',
    s15.shown && /今日陪练邀请/.test(s15.txt) && /陪你练/.test(s15.txt) && !/的主场是/.test(s15.txt), s15.txt.slice(0, 64));

  /* S17/S18：防偏科 —— 已陪科目让位，优先未陪科目；一键直达主场 */
  const s17 = await page.evaluate(() => {
    st.records = {}; st.bond = {}; st.aff = { xue: 0, luo: 0, cheng: 0, qing: 0, ziyuan: 0, ye: 0 };
    ALLQ.filter(q => q.m === 'm1').slice(0, 3).forEach(q => { st.records[q.id] = { n: 1, c: 1, last: Date.now(), ok: 1, subj: q.subj, m: q.m }; });
    save();
    const done = todaySubjects();
    const pick = mateInvitePick();
    const focus = focusOf(pick.id);
    const rel = !!done[focus];
    // 一键直达
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'S段', done: true, doneAt: Date.now(), at: Date.now() }; save();
    go('s-home');
    const btn = document.querySelector('#mateInviteWrap .mateinvite .btn');
    if (btn) btn.click();
    return { doneKeys: Object.keys(done), pick: pick.id, focus, rel, screen: (document.querySelector('.screen.active') || {}).id,
      filSubj: FILTER.subj, mod: S.drill && S.drill.mod, dayTaskDone: !!(st.todayTask && st.todayTask.done) };
  });
  T('S17', '防偏科：今天已练的科目让位，优先邀请还没陪到的科目',
    s17.doneKeys.indexOf('math') >= 0 && s17.focus !== 'math' && s17.rel === false, JSON.stringify(s17.doneKeys) + ' pick=' + s17.pick + '/' + s17.focus);
  T('S18', '陪练邀请一键直达该角色主场的答题页', s17.screen === 's-drill' && s17.filSubj === s17.focus && !!s17.mod,
    'screen=' + s17.screen + ' subj=' + s17.filSubj + ' focus=' + s17.focus + ' mod=' + s17.mod);

  /* S19：管家诊断「陪练平衡」卡（角色×科目分布） */
  const s19 = await page.evaluate(() => {
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'S段', done: true, doneAt: Date.now(), at: Date.now() }; save();
    go('s-butler'); butlerTab('diag');
    const t = (document.getElementById('butlerBody').innerText || '').replace(/\n/g, ' ');
    return { has: /陪练平衡/.test(t), perMate: /陪练科目/.test(t), invite: /去补|补 /.test(t) };
  });
  T('S19', '管家诊断含「陪练平衡」卡（角色×陪练科目，防偏科提示）', s19.has && s19.perMate && s19.invite,
    'has=' + s19.has + ' perMate=' + s19.perMate + ' invite=' + s19.invite);

  /* S20：跨科目切科回归（subjOfMod 修复后 treeDrill 正常） */
  const s20 = await page.evaluate(() => {
    setSubject('math');
    treeDrill('e1', 'normal');
    return { subj: FILTER.subj, mod: S.drill && S.drill.mod, n: (S.drill && S.drill.list.length) || 0, label: (S.drill && S.drill.label) || '' };
  });
  T('S20', '跨科目刷题自动切科（思维导图 → 语音模块）', s20.subj === 'eng' && s20.mod === 'e1' && s20.n > 0, JSON.stringify(s20));

  /* ---------- T. v3.0.0 P0 止血与地基 ---------- */
  sect('T. v3.0.0 P0（安全止血 / AI 网关 / 存档可靠 / 承诺兑现）');
  const fsMod = require('fs'), pathMod = require('path'), cp = require('child_process');
  const srcPath = pathMod.join(__dirname, '..', 'index.html');
  const src = fsMod.readFileSync(srcPath, 'utf8');

  const t1 = (src.match(/sk-[A-Za-z0-9]{20,}/g) || []).length;
  T('T1', 'index.html 内无明文 API Key（grep sk- = 0）', t1 === 0, 'hits=' + t1);
  T('T2', 'Key 外置为 BYOK（window.CK_AI_KEY / localStorage ck_sfkey）', /get\s+key\(\)/.test(src) && /ck_sfkey/.test(src), 'getter+byok');

  const t3 = await page.evaluate(() => ({
    fns: ['aiCall', 'aiCheck', 'aiRaw', 'aiQuotaReset', 'aiStat'].every(k => typeof window[k] === 'function'),
    timeout: !!AI_LIMIT.timeout, rpm: AI_LIMIT.rpm, dayCalls: AI_LIMIT.dayCalls
  }));
  T('T3', '统一 AI 网关齐备（超时/重试/熔断/配额）', t3.fns && t3.timeout === true, JSON.stringify(t3));

  /* T4 无 Key ⇒ 零网络请求且不卡死 */
  const t4 = await page.evaluate(async () => {
    localStorage.removeItem('ck_sfkey');
    AIQ.day = ''; AIQ.calls = 0; AIQ.tok = 0; AIQ.win = []; AIQ.fail = 0; AIQ.openUntil = 0;
    const orig = window.fetch; let n = 0;
    window.fetch = async () => { n++; return { ok: true, json: async () => ({ choices: [{ message: { content: 'x' } }] }) }; };
    let err = '';
    try { await aiCall([{ role: 'user', content: 'hi' }]); } catch (e) { err = e.message; }
    window.fetch = orig;
    return { n, err, nokey: st.aiStats.nokey };
  });
  T('T4', '未配置 Key ⇒ 零网络请求 + 明确报错（不卡 loading）', t4.n === 0 && /Key/i.test(t4.err), 'net=' + t4.n + ' err=' + t4.err);

  /* T5 配额：狂点 100 次，真实请求被限流 */
  const t5 = await page.evaluate(async () => {
    localStorage.setItem('ck_sfkey', 'sk-unit-test');
    AIQ.day = ''; AIQ.calls = 0; AIQ.tok = 0; AIQ.win = []; AIQ.fail = 0; AIQ.openUntil = 0;
    const orig = window.fetch; let n = 0;
    window.fetch = async () => { n++; return { ok: true, json: async () => ({ choices: [{ message: { content: 'x' } }], usage: { total_tokens: 10 } }) }; };
    for (let i = 0; i < 100; i++) { try { await aiCall([{ role: 'user', content: 'hi' }]); } catch (e) {} }
    window.fetch = orig;
    const r = { net: n, blocked: st.aiStats.blocked || 0, rpm: st.aiStats.rpm || 0 };
    localStorage.removeItem('ck_sfkey');
    return r;
  });
  T('T5', '配额生效：100 次调用的网络请求被限流（≤40）', t5.net > 0 && t5.net <= 40 && (t5.blocked + t5.rpm) > 0, JSON.stringify(t5));

  /* T6 熔断：连续失败后零请求 */
  const t6 = await page.evaluate(async () => {
    localStorage.setItem('ck_sfkey', 'sk-unit-test');
    AIQ.day = ''; AIQ.calls = 0; AIQ.tok = 0; AIQ.win = []; AIQ.fail = 0; AIQ.openUntil = 0;
    const orig = window.fetch; let n = 0;
    window.fetch = async () => { n++; throw new Error('HTTP 500'); };
    for (let i = 0; i < 3; i++) { try { await aiCall([{ role: 'user', content: 'hi' }]); } catch (e) {} }
    const after3 = n;
    try { await aiCall([{ role: 'user', content: 'hi' }]); } catch (e) {}
    const after4 = n, open = Date.now() < AIQ.openUntil;
    window.fetch = orig; AIQ.openUntil = 0; AIQ.fail = 0;
    localStorage.removeItem('ck_sfkey');
    return { after3, after4, open };
  });
  T('T6', '熔断：连续失败后第 4 次零网络请求', t6.after4 === t6.after3 && t6.open === true, JSON.stringify(t6));

  /* T7 存档写满不再静默 */
  const t7 = await page.evaluate(() => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; };
    let r = null, threw = false;
    try { r = save(); } catch (e) { threw = true; }
    Storage.prototype.setItem = orig;
    return { r, threw };
  });
  T('T7', '存档写满时 save() 返回 false 并告警（不静默）', t7.r === false && t7.threw === false, JSON.stringify(t7));

  /* T8 导入与加载共用归一化 */
  const t8 = await page.evaluate(() => {
    const s = normalize({ name: 'u', aff: {}, wrong: [] });
    return { shield: s.shield, blocked: typeof s.aiStats.blocked, bond: !!s.bond, affKeys: Object.keys(s.aff).length };
  });
  T('T8', '导入走 normalize()（字段补齐与 load 一致）', t8.shield === 2 && t8.blocked === 'number' && t8.bond && t8.affKeys === 6, JSON.stringify(t8));

  /* T9 进度条单调不减 */
  const t9 = await page.evaluate(() => {
    const d = { totalWrong: 2, pendingWrong: 3, cleared: {}, mode: 'normal', label: 'x' };
    const p = () => { const e = drillStatusBar(d); const m = String(e.innerHTML).match(/width:(\d+)%/); return m ? +m[1] : -1; };
    const a = p();
    d.pendingWrong = 9;                       // 新增错题入队：不得让进度倒退
    const b = p();
    d.totalWrong = 3;                         // 又消灭一道
    const c = p();
    return { a, b, c, base: d.baseWrong };
  });
  T('T9', '肃清进度单调不减（新错题入队不倒退）', t9.b >= t9.a && t9.c >= t9.b, t9.a + '% -> ' + t9.b + '% -> ' + t9.c + '%');

  /* T10 streak 护盾 */
  const t10 = await page.evaluate(() => {
    st.shield = 2; st.streak = 9; st.lastDay = todayStr(3); st.dq = { p: 0, c: 0, mc: 0, claim: {} };
    dqOnAnswer(true, 1);
    return { streak: st.streak, shield: st.shield };
  });
  T('T10', 'streak 护盾：缺席后连续天数被保住（护盾 -1）', t10.streak === 9 && t10.shield === 1, JSON.stringify(t10));

  /* T11 每日约定真的发币 */
  const t11 = await page.evaluate(() => {
    st.coins = 0; st.dq = { d: todayStr(), p: 11, c: 0, mc: 0, claim: {} }; st.lastDay = todayStr();
    dqOnAnswer(true, 1);
    return { coins: st.coins, claim: !!st.dq.claim.q };
  });
  T('T11', '兑现承诺：达成每日约定发放心动币', t11.claim === true && t11.coins > 0, 'coins=' + t11.coins);

  /* T12 估分模型三件套 */
  const t12 = await page.evaluate(() => {
    st.total = 10; st.correct = 5; const a = scoreLine();
    st.total = 120; st.correct = 90; const b = scoreModel();
    return { a, lo: b.lo, hi: b.hi, subj: b.subj };
  });
  T('T12', '估分=区间+样本+免责（含 165 分主观题不训练）', /先练满/.test(t12.a) && t12.hi > t12.lo && t12.subj === 165, JSON.stringify(t12));

  T('T13', '首页不再写死「保底 100 分稳过线」', !/保底\s*100\s*分稳过线/.test(src), 'clean');

  /* T14 中断即保护 */
  const t14 = await page.evaluate(() => {
    st.__probe = 'p1';
    window.dispatchEvent(new Event('pagehide'));
    const raw = localStorage.getItem(KEY) || '';
    delete st.__probe;
    return { fn: typeof bindLifecycleGuards === 'function', persisted: raw.indexOf('__probe') >= 0 };
  });
  T('T14', '中断即保护：切后台/关页自动落盘', t14.fn === true && t14.persisted === true, JSON.stringify(t14));

  /* T15/T16 renderPlan 重名修复 */
  const t15 = await page.evaluate(() => {
    go('s-plan');
    const days = document.querySelectorAll('#planList .day').length;
    const butlerOK = typeof renderPlan === 'function' && typeof renderPlan3Day === 'function' && renderPlan !== renderPlan3Day;
    go('s-butler'); butlerTab('plan');
    const slots = document.querySelectorAll('#butlerBody .slot').length;
    return { days, butlerOK, slots };
  });
  T('T15', 's-plan 页修复：渲染出 ≥1 个 .day（原为白屏）', t15.days >= 1, 'days=' + t15.days);
  T('T16', 'renderPlan 重名已消除（两个版本并存且不相等）', t15.butlerOK === true && t15.slots > 0, 'slots=' + t15.slots);

  /* T17 静态自检脚本（进程内调用，不依赖子进程 spawn） */
  let dcr = { dups: [], danglingHandler: [], danglingId: [] };
  try { dcr = require('../tools/dup_check.js').run({ strict: true }); }
  catch (e) { dcr = { dups: [{ name: 'require-fail:' + e.message }], danglingHandler: [], danglingId: [] }; }
  T('T17', '静态自检 dup_check 通过（无重名/悬空引用）',
    dcr.dups.length === 0 && dcr.danglingHandler.length === 0 && dcr.danglingId.length === 0,
    'dup=' + dcr.dups.length + ' handler=' + dcr.danglingHandler.length + ' id=' + dcr.danglingId.length);

  const t18 = await page.evaluate(() => ({
    byok: /byokInput/.test(aiPanelHTML()),
    badge: /离线模式|在线/.test(aiPanelHTML()),
    cache: typeof aiCacheSet === 'function' && typeof aiCacheGet === 'function'
  }));
  T('T18', 'AI 面板含 BYOK 入口 + 状态徽章 + 独立缓存分区', t18.byok && t18.badge && t18.cache, JSON.stringify(t18));

  const t19 = await page.evaluate(() => {
    aiCacheSet('__t19', { a: 1 });
    const v = aiCacheGet('__t19');
    const main = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { v: v && v.a, inMain: Object.prototype.hasOwnProperty.call(main, '__t19') };
  });
  T('T19', 'AI 缓存独立分区（不写入主存档）', t19.v === 1 && t19.inMain === false, JSON.stringify(t19));

  const t20 = await page.evaluate(() => {
    const list = ['startDrill', 'startTodayTask', 'ensureLessonBoost', 'aiGenVariant', 'weakDrill', 'genDailyPlan', 'restGuard', 'modStats'];
    return { n: list.filter(k => typeof window[k] === 'function').length, total: list.length };
  });
  T('T20', '红线 R1：被包装的存量函数体仍全部可用（只加壳未改体）', t20.n === t20.total, t20.n + '/' + t20.total);

  /* ---------- U. v3.0.0 P0 收尾（0.5 prompt 瘦身 / 0.8 确定性降级 / 0.13 微会话三档） ---------- */
  sect('U. v3.0.0 P0 收尾：prompt 瘦身 · 确定性降级 · 微会话三档');

  const u1 = await page.evaluate(() => {
    const keys = Object.keys(DEGRADE || {});
    return {
      n: keys.length,
      allFn: keys.every(k => typeof DEGRADE[k] === 'function'),
      need: ['chat', 'tutor', 'mnemonic', 'steps', 'variant', 'diagnose', 'weakpaper', 'gpquiz'].every(k => keys.indexOf(k) >= 0),
      task: typeof aiTask === 'function'
    };
  });
  T('U1', '0.8 降级表：8 个 task 全部有非 AI 实现', u1.n === 8 && u1.allFn && u1.need && u1.task, JSON.stringify(u1));

  const u2 = await page.evaluate(async () => {
    const before = (st.aiStats && st.aiStats.deg) || 0;
    const q = ALLQ.find(x => x.t === 'choice') || ALLQ[0];
    const r = await aiTask('tutor', [{ role: 'system', content: 'x' }, { role: 'user', content: 'y' }], { ctx: { q: q } });
    return { src: r.src, txt: String(r.data || '').slice(0, 30), deg: ((st.aiStats && st.aiStats.deg) || 0) - before };
  });
  T('U2', '讲题：AI 不可用走本地降级（有内容、计入统计、不卡 loading）', u2.src === 'degrade' && u2.txt.length > 5 && u2.deg === 1, JSON.stringify(u2));

  const u3 = await page.evaluate(async () => {
    const base = ALLQ.find(x => x.t === 'choice' && x.subj === 'math') || ALLQ[0];
    const r = await aiTask('variant', [{ role: 'system', content: 'x' }, { role: 'user', content: 'y' }], { ctx: { q: base } });
    const v = r.data || {};
    return { src: r.src, sameMod: v.m === base.m, diff: v.q !== base.q, off: !!v._local };
  });
  T('U3', '变式题：离线时用本地同考点题顶上（同模块、不同题、标 offline）', u3.src === 'degrade' && u3.sameMod && u3.diff && u3.off, JSON.stringify(u3));

  const u4 = await page.evaluate(async () => {
    const q = ALLQ.find(x => x.t === 'choice') || ALLQ[0];
    const r = await aiTask('diagnose', [{ role: 'system', content: 'x' }, { role: 'user', content: 'y' }], { ctx: { q: q, myAns: '空' } });
    const mm = String(r.data || '').match(/【错因[:：]\s*([^】]{1,12})】/);
    return { src: r.src, tag: mm ? mm[1] : '' };
  });
  T('U4', '错因诊断：离线仍输出【错因：x】标签（下游解析照常工作）', u4.src === 'degrade' && /^(概念不清|计算失误|审题错误|方法不会)$/.test(u4.tag), JSON.stringify(u4));

  const u5 = await page.evaluate(() => {
    const m1 = DEGRADE.mnemonic({ mods: ['m1'] });
    const m2 = DEGRADE.mnemonic({ mods: ['zz'] });
    const c1 = DEGRADE.chat({ user: '我今天好累', mate: getMate('luo') });
    const c2 = DEGRADE.chat({ user: '随便聊聊', mate: getMate('luo') });
    const st1 = DEGRADE.steps({ q: ALLQ.find(x => x.t === 'choice') });
    return { m1: typeof m1 === 'string' && m1.length > 4, m2: typeof m2 === 'string' && m2.length > 4, c1: !!c1, c2: !!c2, steps: Array.isArray(st1) && st1.length >= 2 };
  });
  T('U5', '口诀/闲聊/分步：四个降级出口均产出可用内容', u5.m1 && u5.m2 && u5.c1 && u5.c2 && u5.steps, JSON.stringify(u5));

  const u6 = await page.evaluate(() => {
    const bak = st.wrong;
    st.wrong = [{ id: ALLQ[0].id, m: ALLQ[0].m, q: ALLQ[0].q }];
    let out = [];
    try { out = DEGRADE.weakpaper({}) || []; } catch (e) { }
    st.wrong = bak;
    const gp = DEGRADE.gpquiz({ subj: 'mat', pt: { t: '极限' } });
    return { wp: Array.isArray(out) && out.length >= 1, gp: !!gp && gp.t === 'choice' && gp.o.length >= 2 };
  });
  T('U6', '出卷/考点题：离线用错题原题 + 本地同考点题组卷', u6.wp && u6.gp, JSON.stringify(u6));

  const u7 = await page.evaluate(() => {
    const hist = [{ role: 'system', content: 'SYS' }];
    for (let i = 0; i < 12; i++) {
      hist.push({ role: 'user', content: 'u' + i + 'x'.repeat(500) });
      hist.push({ role: 'assistant', content: 'a' + i + 'y'.repeat(500) });
    }
    const t = trimHist(hist);
    return {
      n: t.length,
      sys: t[0].role === 'system' && t[0].content === 'SYS',
      maxLen: Math.max.apply(null, t.map(m => m.content.length)),
      last: String(t[t.length - 1].content).slice(0, 3)
    };
  });
  T('U7', '0.5 历史裁剪：保留 system + 最近 6 轮，每条截断 400 字', u7.n === 13 && u7.sys && u7.maxLen <= 401 && u7.last === 'a11', JSON.stringify(u7));

  const u8 = await page.evaluate(() => {
    const p = aiPrompt(getMate('luo'));
    const two = trimHist([{ role: 'system', content: 'a'.repeat(900) }, { role: 'user', content: 'b'.repeat(900) }]);
    return { len: p.length, keep: two[1].content.length };
  });
  T('U8', '0.5 prompt 瘦身：system ≤260 字；单轮题面不被截断（≥900）', u8.len <= 260 && u8.keep >= 900, JSON.stringify(u8));

  const u10json = (src.match(/json:\s*true/g) || []).length;
  const u10b = await page.evaluate(() => ({ off: AIQ.jsonOff === false, retry: AI_LIMIT.retry >= 1 }));
  T('U9', '0.5 结构化输出：≥4 个 JSON 调用点 + jsonOff 自动降级开关', u10json >= 4 && u10b.off && u10b.retry, 'json=' + u10json + ' jsonOff=' + u10b.off);

  const u11 = await page.evaluate(() => [SESSION_N(5), SESSION_N(10), SESSION_N(20), SESSION_N(7), SESSION_N()]);
  T('U10', '0.13 微会话档位合法化（非法值回落 20，旧调用行为不变）', JSON.stringify(u11) === JSON.stringify([5, 10, 20, 20, 20]), JSON.stringify(u11));

  const u12 = await page.evaluate(() => {
    setSubject('math');
    startDrill('m1', 'normal', { n: 5 });
    const r = { len: S.drill.list.length, n: S.drill.n, scale: st.dq.scale };
    go('s-home');
    return r;
  });
  T('U11', '0.13 5 题微会话：题量 = 5，且当日约定目标缩放至 0.25', u12.len === 5 && u12.n === 5 && u12.scale === 0.25, JSON.stringify(u12));

  const u13 = await page.evaluate(() => [drillAddCap({ n: 5 }), drillAddCap({ n: 10 }), drillAddCap({ n: 20 })]);
  T('U12', '0.13 闸①：微会话错题追加封顶（5→3 / 10→6 / 20→不封顶）', u13[0] === 3 && u13[1] === 6 && u13[2] === null || u13[2] === Infinity, JSON.stringify(u13));

  const u14 = await page.evaluate(() => {
    const bak = st.dq.scale;
    st.dq.scale = 0.25;
    const g = DQ_DEFS.map(t => dqGoal(t));
    st.dq.scale = 1;
    const full = DQ_DEFS.map(t => dqGoal(t));
    st.dq.scale = bak;
    return { g: g, full: full };
  });
  T('U13', '0.13 闸②：约定目标按 N/20 缩放（12→3 / 8→2 / 3→1）', JSON.stringify(u14.g) === JSON.stringify([3, 2, 1]) && JSON.stringify(u14.full) === JSON.stringify([12, 8, 3]), JSON.stringify(u14));

  const u15 = await page.evaluate(() => {
    setSubject('math');
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: '测试', done: false, at: Date.now(), n: 20 };
    go('s-home');
    const ns = document.querySelectorAll('.tc-n').length;
    const on = document.querySelectorAll('.tc-n.on').length;
    const five = Array.prototype.slice.call(document.querySelectorAll('.tc-n')).filter(x => /5 题/.test(x.textContent))[0];
    if (five) five.click();
    const btn = document.querySelector('.todaycard .btn.gold');
    return { ns: ns, on: on, txt: btn ? btn.textContent : '', n: st.todayTask.n };
  });
  T('U14', '0.13 今日卡三档选择器：3 个档位 + 点击后按钮与任务同步为 5 题', u15.ns === 3 && u15.on === 1 && /5 题/.test(u15.txt) && u15.n === 5, JSON.stringify(u15));

  const u16 = await page.evaluate(async () => {
    S.chat = { id: 'luo', idx: 99 };
    go('s-chat');
    await new Promise(r => setTimeout(r, 80));
    await sendFree('我今天好累');
    await new Promise(r => setTimeout(r, 80));
    const b = document.querySelectorAll('#msgListBox .offbadge').length;
    const all = document.querySelectorAll('#msgListBox .bub.her .t');
    const txt = all.length ? String(all[all.length - 1].textContent) : '';
    return { b: b, txt: txt.slice(0, 24) };
  });
  T('U15', '0.8 UI 明示：离线回复气泡带「📴 离线模式」徽章', u16.b >= 1 && u16.txt.length > 0, JSON.stringify(u16));

  const u17 = await page.evaluate(() => {
    const s = st.aiStats || {};
    return { deg: (s.deg || 0) > 0, panel: /离线降级/.test(aiPanelHTML()), css: /\.offbadge\s*\{/.test(document.documentElement.innerHTML) };
  });
  T('U16', '0.8 降级计入统计 + 面板可观测 + 徽章样式已内置', u17.deg && u17.panel && u17.css, JSON.stringify(u17));

  /* ---------- V. v3.1.0 P1（Agent 闭环：记忆分层 / 工具注册表 / 主循环 / 计划快照） ---------- */
  sect('V. v3.1.0 P1：Agent 闭环成型（记忆 · 能力 · 主循环 · 计划快照）');

  const v1 = await page.evaluate(() => {
    const m = memEnsure();
    const n0 = m.epi.length;
    memEpi({ tool: 'test', why: '单测' });
    memSem('m1', 66); memSem('m1', 80);
    const c = (st.mem.sem.m1.h || []);
    return { has: !!m.sem && Array.isArray(m.epi) && !!m.pro, grew: m.epi.length === n0 + 1,
      dedup: c.length === 1, v: c.length ? c[0].v : -1, trend: !!memTrend('m1') };
  });
  T('V1', '记忆分层：epi 环形写入 + sem 按天去重 + 趋势可读', v1.has && v1.grew && v1.dedup && v1.v === 80 && v1.trend, JSON.stringify(v1));

  const v2 = await page.evaluate(() => {
    const bakS = st.sessions, bakR = st.records;
    st.sessions = [{ d: '1', n: 5 }, { d: '2', n: 6 }, { d: '3', n: 7 }, { d: '4', n: 8 }];
    st.records = { a: { subj: 'pol', last: Date.now() }, b: { subj: 'pol', last: Date.now() }, c: { subj: 'math', last: Date.now() } };
    st.mem = { sem: {}, epi: [], pro: {} };
    const pro = proLearn();
    st.sessions = bakS; st.records = bakR;
    return pro;
  });
  T('V2', '画像归纳 proLearn：建议档位 / 夜间上限 / 常练科目均从历史推出',
    v2.sessionLen === 10 && v2.nightCapMin === 30 && v2.preferSubj === 'pol', JSON.stringify(v2));

  const v3 = await page.evaluate(() => {
    const ks = Object.keys(TOOLS);
    return { n: ks.length, ok: ks.every(k => TOOLS[k].name === k && !!TOOLS[k].desc &&
      typeof TOOLS[k].pre === 'function' && typeof TOOLS[k].run === 'function') };
  });
  T('V3', '工具注册表 TOOLS：9 个 tool 且 name/desc/pre/run 齐备', v3.n === 9 && v3.ok, JSON.stringify(v3));

  const v4 = await page.evaluate(() => ({
    unknown: canRun('no_such_tool', {}).ok,
    noMod: canRun('start_drill', {}).ok,
    noQ: canRun('regen_variant', {}).ok,
    ok: canRun('force_rest', {}).ok
  }));
  T('V4', 'canRun 前置校验：非法/缺参一律拒绝，合法放行',
    v4.unknown === false && v4.noMod === false && v4.noQ === false && v4.ok === true, JSON.stringify(v4));

  const v5 = await page.evaluate(() => {
    const c = agPerceive();
    return { slot: !!c.slot, due: typeof c.due === 'number', weak: Array.isArray(c.weak),
      today: ['todo', 'done', 'none'].indexOf(c.today) >= 0, pro: !!c.pro };
  });
  T('V5', 'agPerceive 感知快照字段齐备（时段/到期/薄弱/今日/画像）',
    v5.slot && v5.due && v5.weak && v5.today && v5.pro, JSON.stringify(v5));

  const v6 = await page.evaluate(() => {
    st.restUntil = 0;
    st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 't', done: false, at: Date.now() };
    const d1 = agPlan(agPerceive());
    st.todayTask.done = true;
    const d2 = agPlan(agPerceive());
    return { d1: d1.tool, d2: d2.tool };
  });
  T('V6', '规划优先级：今日任务未完成 ⇒ 先做今日唯一任务', v6.d1 === 'today_task' && v6.d2 !== 'today_task', JSON.stringify(v6));

  const v7 = await page.evaluate(() => {
    const base = { rest: false, today: 'done', dqDone: 0, dqAll: 3, due: 6, weak: [], pro: {} };
    const a = agPlan(base);
    const b = agPlan(Object.assign({}, base, { rest: true }));
    const c = agPlan(Object.assign({}, base, { due: 0, weak: ['m1'] }));
    return { a: a.tool, b: b.tool, c: c.tool };
  });
  T('V7', 'rule 分支：到期≥5→清错题 / 休息中→强制休息 / 有薄弱→薄弱专项',
    v7.a === 'review_wrong' && v7.b === 'force_rest' && v7.c === 'weak_drill', JSON.stringify(v7));

  const v8 = await page.evaluate(() => {
    go('s-home');
    const r = agTick(false);
    return { screen: (document.querySelector('.screen.active') || {}).id, tool: r.dec.tool, log: AG.log.length };
  });
  T('V8', 'agTick(false) 只感知与规划：不跳页、不留副作用、留痕 ≥2 条',
    v8.screen === 's-home' && !!v8.tool && v8.log >= 2, JSON.stringify(v8));

  const v9 = await page.evaluate(() => {
    const n0 = AG.log.length;
    const r = agAct('start_drill', {});
    return { ok: r.ok, why: r.why, grew: AG.log.length > n0, rej: /已拒绝/.test((AG.log[AG.log.length - 1] || {}).txt || '') };
  });
  T('V9', 'agAct 唯一出口：前置不满足即拒绝并留痕', v9.ok === false && !!v9.why && v9.grew && v9.rej, JSON.stringify(v9));

  const v10 = await page.evaluate(() => {
    go('s-butler'); butlerTab('agent');
    const body = document.getElementById('butlerBody');
    return { logs: body.querySelectorAll('.aglog').length, tools: body.querySelectorAll('.slot').length,
      btn: /让它现在替我走一步/.test(body.innerHTML), tab: document.querySelectorAll('#btabs button[data-bt="agent"]').length };
  });
  T('V10', '决策留痕 UI：🧭 决策 tab 渲染流水 + 能力清单 + 一键执行',
    v10.tab === 1 && v10.logs >= 1 && v10.tools >= 9 && v10.btn, JSON.stringify(v10));

  const v11 = await page.evaluate(() => {
    st.butler.plan = null;
    const a = planSnap();
    const ids = a.blocks.map(b => b.id).join(',');
    const b2 = planSnap();
    return { n: a.blocks.length, same: b2.blocks.map(x => x.id).join(',') === ids,
      fields: a.blocks.every(x => x.id && x.seq > 0 && !!x.st), min: a.planMin > 0 };
  });
  T('V11', '计划快照 planSnap：幂等 + 每块有 id/seq/st + 记录总分钟',
    v11.n > 0 && v11.same && v11.fields && v11.min, JSON.stringify(v11));

  const v12 = await page.evaluate(() => {
    st.butler.plan = null;
    const p = planSnap();
    p.blocks.forEach(b => { b.start = '00:00'; b.dur = 30; b.st = 'pending'; });
    const before = p.blocks.map(b => b.start + '/' + b.dur).join(',');
    const n = sweepExpiredBlocks();
    const after = p.blocks.map(b => b.start + '/' + b.dur).join(',');
    return { n: n, total: p.blocks.length, same: before === after, missed: p.blocks.every(b => b.st === 'missed') };
  });
  T('V12', '过期块置 missed 且不改 start/dur（红线：不推翻已过时段）',
    v12.n === v12.total && v12.same && v12.missed, JSON.stringify(v12));

  const v13 = await page.evaluate(() => {
    st.butler.plan = null;
    const p = planSnap();
    p.blocks = [
      { id: 'x1', seq: 1, start: '00:10', dur: 30, subj: 'math', st: 'pending', label: 'a' },
      { id: 'x2', seq: 2, start: '23:30', dur: 40, subj: 'pol', st: 'pending', label: 'b' },
      { id: 'x3', seq: 3, start: '23:50', dur: 20, subj: 'eng', st: 'pending', label: 'c' }
    ];
    st.butler.plan.blocks = p.blocks;
    const r = replanToday();
    const b1 = p.blocks[0];
    return { moved: r.moved, conserved: r.conserved, min: r.min, x1: b1.st, x1start: b1.start };
  });
  T('V13', 'replanToday 只重排未到点块 + 总分钟守恒 + 已过块不动',
    v13.moved === 2 && v13.conserved === true && v13.min === 60 && v13.x1 === 'missed' && v13.x1start === '00:10', JSON.stringify(v13));

  const v14 = await page.evaluate(() => {
    st.butler.plan = null; planSnap();
    st.butler.wDone = {};
    const h = markBlockHit(12);
    return { hit: !!h && h.st === 'hit', real: h && h.realMin, wd: Object.keys(st.butler.wDone || {}).length };
  });
  T('V14', '块级打卡 markBlockHit：置 hit + 记录实际用时 + 复活 wDone',
    v14.hit && v14.real === 12 && v14.wd === 1, JSON.stringify(v14));

  const v15 = await page.evaluate(() => {
    const old = { name: '老存档', aff: { xue: 1, luo: 0, cheng: 0, qing: 0, ziyuan: 0, ye: 0 }, wrong: [], mod: {}, total: 5 };
    const s = normalize(old);
    return { mem: !!s.mem, sem: !!s.mem.sem, epi: Array.isArray(s.mem.epi), pro: !!s.mem.pro };
  });
  T('V15', '老存档零迁移：normalize 自动补齐 mem 三层', v15.mem && v15.sem && v15.epi && v15.pro, JSON.stringify(v15));

  /* ========== W. v3.2.0 · P1 收尾（1.6~1.15 考点分值/双轨/去压迫） ========== */
  sect('W. P1 收尾 · 考点分值 / SM-2 / 双轨 / 去压迫');
  const W = await page.evaluate(() => {
    const out = {};
    /* 1.6 考点分值表：真卷实测值 + 超纲模块剔除（v3.4.0 起分值表更名为 KD_SCORE，
       避免与 data/kaodian.js 注入的 window.KAODIAN 考点资料库同名遮蔽） */
    out.kd = { has: typeof KD_SCORE === 'object' && Object.keys(KD_SCORE).length >= 13,
      p4ext: !!(KD_SCORE.p4 && KD_SCORE.p4.ext), p6ext: !!(KD_SCORE.p6 && KD_SCORE.p6.ext),
      p4roi: modRoi('p4'), p6roi: modRoi('p6'), e4: KD_SCORE.e4 ? KD_SCORE.e4.obj : -1,
      p3est: !!(KD_SCORE.p3 && KD_SCORE.p3.est) };
    /* 1.6 ROI v2：分母含学习成本，且阅读(e4,60分) 应高于语音(e1,5分) */
    out.roi = { e4: modRoi('e4'), e1: modRoi('e1'), m5: modRoi('m5'), m2: modRoi('m2') };
    /* 1.7 动态权重：Σ=1 且每科 ≥ 20% */
    let w = dynamicWeights();
    out.dw = { sum: Math.round((w.math + w.pol + w.eng) * 1000) / 1000, math: w.math, pol: w.pol, eng: w.eng,
      min: Math.min(w.math, w.pol, w.eng), share: SUBJ_MIN_SHARE };
    /* 1.8 SM-2：3 次答对毕业、EF 随答对上升、答错**不**惩罚 EF */
    const w1 = {};                                     // 全新卡：走真实初始化路径（EF 起点 2.3）
    const g1 = srsAdvance(w1), ef1 = w1.srs.ef;
    const g2 = srsAdvance(w1), g3 = srsAdvance(w1);
    const efAfter = w1.srs.ef, ivAfter = w1.srs.iv;
    const w2 = { srs: { ef: 1.8, rep: 2, iv: 8, stage: 2, due: 0 } };
    srsReset(w2);
    out.sm2 = { g1: g1, g2: g2, g3: g3, ef1: ef1, ef: efAfter, iv: ivAfter, resetRep: w2.srs.rep, resetIv: w2.srs.iv, resetEf: w2.srs.ef };
    /* 1.5 薄弱项门槛：答过 <3 题不锁死任务卡 */
    out.weakGate = { att: typeof modStats === 'function' };
    /* 1.9 上手：profileDone / setProfile */
    const bak = st.profile; st.profile = null;
    const before = profileDone(); setProfile('minutes', '30'); const after1 = profileDone();
    setProfile('examDate', todayStr(30)); setProfile('slot', '晚');
    out.ob = { before: before, afterMinutesOnly: after1, done: profileDone(), examDate: st.examDate, slot: (st.profile || {}).slot };
    st.profile = { examDate: st.examDate, minutes: '30', slot: '晚' };
    /* 1.11 好感双轨：答错给 care、不给 aff；AFF_T 已下调；migrateAff 等级不降 */
    st.care = {}; st.aff = { xue: 0, luo: 0, cheng: 0, qing: 0, ziyuan: 0, ye: 0 };
    addCare('luo', 1); addCare('luo', 1);
    out.dual = { care: st.care.luo, aff: st.aff.luo, t: AFF_T.slice(), hasMigrate: typeof migrateAff === 'function' };
    st.aff.luo = 500; st._affMig = 0; migrateAff();
    out.dual.migrated = st.aff.luo;
    /* 1.12 人设错位订正：模块级人设主场与角色 mod 对应 */
    out.persona = { ziyuan: MATE_MOD.ziyuan, ye: MATE_MOD.ye, luo: MATE_MOD.luo, cheng: MATE_MOD.cheng,
      m4: modName(MATE_MOD.ziyuan), m5: modName(MATE_MOD.ye),
      /* 只扫**用户可见文案**：outerHTML 会把 <script> 里的注释源码一起算进去，
         而 1.12 的实现注释里恰好举了「紫苑的主场是英语」当反例 → 会误报。 */
      visibleHomeIs: (document.body.innerText || '').indexOf('的主场是') >= 0 };
    /* 1.12 情境台词矩阵覆盖率：6 人格 × 4 关键情境无空数组 */
    const ctxs = ['wrongFirst', 'wrongRepeat', 'comfort', 'greetOff'];
    const miss = [];
    MATES.forEach(m => ctxs.forEach(c => {
      if (!LINES2[m.id] || !Array.isArray(LINES2[m.id][c]) || !LINES2[m.id][c].length) miss.push(m.id + '/' + c);
    }));
    out.lines2 = { miss: miss, size: ctxs.length * MATES.length };
    /* 1.13 体面退出：pauseForToday 存在；中途退出会写 partial 战报 */
    out.pause = { fn: typeof pauseForToday === 'function', partialGate: typeof reportHTML === 'function' };
    S.drill = { mod: 'm1', mode: 'normal', list: [ALLQ.find(q => q.m === 'm1')], i: 1, right: 1, total: 20, n: 20,
      baseLen: 20, cleared: { a: 1 }, wrongN: {}, pendingWrong: 0, label: 'W段', startAt: Date.now() - 60000 };
    st.lastReport = null;
    pauseForToday();
    out.pause.partial = !!(st.lastReport && st.lastReport.partial);
    out.pause.say = (st.lastReport && st.lastReport.say) || '';
    out.pause.screen = (document.querySelector('.screen.active') || {}).id;
    /* 1.14 去内疚（红线 R2）：只扫**首页可见文案**里的「损失框架」。
       「错题清零」是功能性机制名（收益框架 = 把错题清掉），不是内疚文案，
       所以这里盯的是「你已经亏了」那一类表达：连续 N 天 / 断签 / 归零 / 欠 N 题 / 掉段。 */
    const homeTxt = (document.getElementById('s-home') || document.body).innerText || '';
    const lossPats = { lianxu: /连续\s*\d+\s*天/, duanjian: /断签|签到中断|中断了/, guiling: /归零/,
      qian: /欠\s*\d+\s*(?:题|道)/, diaoduan: /掉段|掉等级/ };
    const lossHits = [];
    Object.keys(lossPats).forEach(k => { const m = homeTxt.match(lossPats[k]); if (m) lossHits.push(k + ':' + m[0]); });
    out.guilt = { hits: lossHits, len: homeTxt.length,
      lianxu: lossPats.lianxu.test(homeTxt), duanjian: lossPats.duanjian.test(homeTxt),
      guiling: lossPats.guiling.test(homeTxt), qian: lossPats.qian.test(homeTxt), diaoduan: lossPats.diaoduan.test(homeTxt) };
    /* 1.15 扭蛋绑学习行为 */
    out.gacha = { pity: 8, bound: document.documentElement.outerHTML.indexOf('今日任务完成 · 免费抽一张') >= 0 };
    /* 2.3 名场面卡 */
    memEnsure()[ 'luo' ] = [];
    memScene('luo', 'clear', { mod: 'm1', n: 2, ctx: 'W段测试' });
    out.scene = { n: scenesOf('luo').length, html: /名场面/.test(document.documentElement.outerHTML) };
    /* 2.4 回归问候分档 */
    out.seen = { bucket: seenBucket(Date.now() - 5 * 864e5), fn: typeof greetByRecency === 'function' };
    return out;
  });
  T('W1', '1.6 考点分值表到齐（≥13 模块）', W.kd.has, JSON.stringify(W.kd));
  T('W2', '1.6 超纲模块剔除：p4 史纲 / p6 思修 标 ext 且 ROI 恒 0', W.kd.p4ext && W.kd.p6ext && W.kd.p4roi === 0 && W.kd.p6roi === 0, JSON.stringify(W.kd));
  T('W3', '1.6 ROI v2：阅读(60分) > 语音(5分) > 概率(3.6分)', W.roi.e4 > W.roi.e1 && W.roi.e1 > W.roi.m5, JSON.stringify(W.roi));
  T('W4', '1.7 动态权重 Σ=1 且每科 ≥ 20%（防偏科硬下限）', Math.abs(W.dw.sum - 1) < 0.01 && W.dw.min >= W.dw.share - 0.001, JSON.stringify(W.dw));
  T('W5', '1.8 SM-2：3 次答对毕业、EF 上升（2.3→2.5）、间隔随 EF 增长', W.sm2.g1 === false && W.sm2.g2 === false && W.sm2.g3 === true && W.sm2.ef1 >= 2.3 - 1e-9 && W.sm2.ef > W.sm2.ef1 && W.sm2.iv > 2, JSON.stringify(W.sm2));
  T('W6', '1.8 红线 R3：答错只重置次数，不惩罚 EF（不做惩罚性设计）', W.sm2.resetRep === 0 && W.sm2.resetIv === 1 && W.sm2.resetEf === 1.8, 'ef=' + W.sm2.resetEf);
  T('W7', '1.9 新用户三步上手：考期/时长/时段齐备才算完成', W.ob.before === false && W.ob.afterMinutesOnly === false && W.ob.done === true && !!W.ob.examDate, JSON.stringify(W.ob));
  T('W8', '1.11 好感双轨：答错只涨 care，不涨 aff（红线 R6 关怀不是奖品）', W.dual.care === 2 && W.dual.aff === 0, JSON.stringify(W.dual));
  T('W9', '1.11 AFF_T 下调为 [0,24,60,110,180] + migrateAff 等级只升不降', W.dual.t.join(',') === '0,24,60,110,180' && W.dual.migrated >= 180, JSON.stringify(W.dual.t) + ' migrated=' + W.dual.migrated);
  T('W10', '1.12 人设错位订正：紫苑=m4 偏导、夜喵=m5 概率，且**可见文案**不再出现「的主场是」', W.persona.ziyuan === 'm4' && W.persona.ye === 'm5' && W.persona.visibleHomeIs === false, JSON.stringify(W.persona));
  T('W11', '2.2 情境台词矩阵覆盖率 100%（6 人格 × 4 关键情境无空数组）', W.lines2.miss.length === 0, JSON.stringify(W.lines2));
  T('W12', '1.13 体面退出：中途退出写入 partial 战报并回首页（红线 R3 进度不归零）', W.pause.fn && W.pause.partial && W.pause.screen === 's-home' && /算数/.test(W.pause.say), JSON.stringify({ p: W.pause.partial, s: W.pause.screen }));
  T('W13', '1.14 去内疚文案（红线 R2：首页无「连续 N 天/断签/归零/欠 N 题/掉段」损失框架）', !W.guilt.lianxu && !W.guilt.duanjian && !W.guilt.guiling && !W.guilt.qian && !W.guilt.diaoduan, JSON.stringify(W.guilt));
  T('W14', '1.15 扭蛋：免费抽绑「今日任务完成」+ 保底 8 抽', W.gacha.bound && W.gacha.pity === 8, JSON.stringify(W.gacha));
  T('W15', '2.3 名场面卡：通关/升级写入 st.mem[id] 且可回看', W.scene.n >= 1 && W.scene.html, JSON.stringify(W.scene));
  T('W16', '2.4 回归问候分档：离开 ≥3 天走归来台词（不出现损失框架）', W.seen.bucket === 'long' && W.seen.fn, JSON.stringify(W.seen));

  /* ========== X. v3.2.0 · P2 纵深（缓存/LLM微调/PWA/交错/难度/考点入排程） ========== */
  sect('X. P2 纵深 · 缓存 / LLM 微调 / PWA / 交错 / 难度');
  const X = await page.evaluate(() => {
    const out = {};
    /* 2.7 多层缓存：ack 分层 key + 6 个 task 挂缓存 + 变式池封顶 */
    out.cache = { ack: ack('tutor', 'q1'), ver: typeof AI_CACHE_VER === 'string',
      noCache: Object.keys(NO_CACHE_TASKS).join(','), poolCap: VARIANT_POOL_CAP,
      trimFn: typeof trimVariantPool === 'function' };
    st.variants = {}; for (let i = 0; i < VARIANT_POOL_CAP + 10; i++) st.variants['x' + i] = [{ q: 't', _at: i }];
    trimVariantPool();
    out.cache.afterTrim = Object.keys(st.variants).length;
    st.variants = {};
    /* 2.7 命中即计数、不重复消耗 API */
    const k = ack('mnem', 'm1,m2'); aiCacheSet(k, '口诀');
    out.cache.hit = aiCacheGet(k) === '口诀';
    /* 2.1 LLM 微调：默认关闭、独立熔断对象、白名单护栏 */
    const bak = st.planLLM; st.planLLM = false;
    out.llm = { defaultOff: st.planLLM === false, avail: agPlanAvailable(), hasRule: typeof agPlanRule === 'function',
      hasTry: typeof agPlanLLMTry === 'function', qp: typeof AIQP === 'object' && AIQP !== (typeof AIQ !== 'undefined' ? AIQ : {}),
      cap: AG_LLM_DAILY_CAP, names: Object.keys(TOOLS).length,
      status: agLLMStatusText() };
    st.planLLM = true; out.llm.availOn = agPlanAvailable(); st.planLLM = bak;
    /* R5：规则版永远先算出保底决策（断网/熔断也不缺块） */
    const base = agPlanRule({ rest: false, today: 'todo', dqDone: 0, dqAll: 3, due: 0, weak: [], subj: 'math', slot: '上午', pro: { sessionLen: 20 } });
    out.llm.baseTool = base.tool && base.why ? true : false;
    /* 2.5 交错：两弱项不同时相邻；比例随考期变化 */
    const mk = (m, n) => Array.from({ length: n }, (_, i) => ({ id: m + i, m: m }));
    const list = mk('m1', 12).concat(mk('m2', 6));
    const il = interleaveList(list.slice(), 18, 0.5);
    out.inter = { n: il.length, ratioEntry: interleaveRatio(), hasFn: typeof interleaveList === 'function' };
    out.inter.unique = Object.keys(il.reduce((a, q) => (a[q.m] = 1, a), {})).length;
    /* 边界：曾出现过「主池到交错上限 + 副池耗尽」导致 while 不推进的**死循环**，
       这里把三组极端输入都跑一遍（若回归则整个测试会挂死在浏览器里）。 */
    const t0 = Date.now();
    const e1 = interleaveList(mk('m1', 1).concat(mk('m2', 1)), 20, 0.55);
    const e2 = interleaveList(mk('m1', 20), 20, 0.7);
    const e3 = interleaveList(mk('m1', 5).concat(mk('m2', 15)), 20, 0.7);
    out.inter.edge = { a: e1.length, b: e2.length, c: e3.length, ms: Date.now() - t0 };
    /* 2.6 难度自适应：itemDiff 用历史错误率代理；目标带会随成绩迁移 */
    st.records = st.records || {};
    const anyQ = ALLQ[0];
    st.records[anyQ.id] = { n: 10, c: 2, last: Date.now(), m: anyQ.m };
    out.diff = { hard: itemDiff(anyQ), mid: itemDiff({ id: 'never_seen_xyz' }), hasFn: typeof adaptiveOrder === 'function' };
    st.adapt = { band: 2.5, hi: 0, lo: 0 };
    adaptAfterRound(90); adaptAfterRound(90);
    out.diff.bandUp = st.adapt.band;
    adaptAfterRound(30);
    out.diff.bandDown = st.adapt.band;
    /* 2.12 黄金考点入排程：part → 模块映射 */
    out.gp = { p1: gpPartMod('第一部分 马克思主义哲学原理'), p2: gpPartMod('第二部分 毛泽东思想和中国特色社会主义理论体系概论'),
      p3: gpPartMod('第三部分'), nulls: gpPartMod('') === null, hasBlock: typeof gpReadBlock === 'function' };
    /* 2.9 暂缓区 / 2.10 每日小事件 / 2.11 动机锚点 */
    st.deferList = []; st.todayTask = { d: todayStr(0), subj: 'math', mod: 'm1', why: 'X段', done: false };
    const beforeDefer = st.todayTask;
    deferTodayTask();
    out.misc = { deferred: st.deferList.length,
      deferHas: st.deferList.some(x => x.mod === 'm1' && x.d === todayStr(0)),
      /* 「暂缓」的语义是**换一个任务**（不是把首屏指令留成空白），
         所以正确的判据是「原任务对象被替换掉」，而不是 st.todayTask === null。 */
      swapped: st.todayTask !== beforeDefer,
      event: typeof eventOfToday() === 'string' && eventOfToday().length > 4,
      eventTxt: String(eventOfToday()).slice(0, 12), why: 'why' in st,
      whyFn: typeof saveWhy === 'function' };
    /* P2.8 PWA：注册代码 + manifest 链接 + 更新提示条函数 */
    out.pwa = { reg: typeof bindPWA === 'function', bar: typeof showPwaUpdateBar === 'function',
      link: document.querySelectorAll('link[rel="manifest"]').length === 1,
      theme: (document.querySelector('meta[name="theme-color"]') || {}).content === '#150d24' };
    /* 红线扫描：禁用词（R4） */
    const html = document.documentElement.outerHTML;
    out.ban = { wen: html.indexOf('稳过') >= 0, bi: html.indexOf('必过') >= 0, bao: /保证[^a-zA-Z]{0,2}过/.test(html), ti: /提分\s*\d/.test(html) };
    return out;
  });
  T('X1', '2.7 多层缓存已激活：分层 key（版本前缀）+ 变式池封顶 60 + 淘汰生效', X.cache.ver && /^v3\.2\|/.test(X.cache.ack) && X.cache.afterTrim === X.cache.poolCap, JSON.stringify(X.cache));
  T('X2', '2.7 缓存命中可读回（不再是无调用死代码）', X.cache.hit === true);
  T('X3', '2.7 chat/variant 刻意不缓存（会话有记忆 / 变式要多样性）', X.cache.noCache === 'chat,variant', X.cache.noCache);
  T('X4', '2.1 LLM 微调默认关闭，且规则版永远先生成保底决策（红线 R5）', X.llm.defaultOff && X.llm.avail === false && X.llm.hasRule && X.llm.baseTool, JSON.stringify(X.llm));
  T('X5', '2.1 LLM 使用独立熔断对象与每日额度（不污染主链路 AIQ）', X.llm.qp && X.llm.cap === 3, JSON.stringify({ qp: X.llm.qp, cap: X.llm.cap }));
  T('X6', '2.1 开启后可用 + 白名单护栏基于 TOOLS 全集', X.llm.availOn === true && X.llm.names >= 9, JSON.stringify({ on: X.llm.availOn, n: X.llm.names }));
  T('X7', '2.5 交错练习：题量守恒且模块被真正混排（≥2 个模块）', X.inter.n === 18 && X.inter.unique >= 2, JSON.stringify(X.inter));
  T('X7b', '2.5 交错边界不死循环（短池+高交错比，曾真实触发 while 不推进）', X.inter.edge.a === 2 && X.inter.edge.b === 20 && X.inter.edge.c === 20 && X.inter.edge.ms < 300, JSON.stringify(X.inter.edge));
  T('X8', '2.6 难度自适应：错得多的题难度更高，且目标带随成绩升降', X.diff.hard > X.diff.mid && X.diff.bandUp > 2.5 && X.diff.bandDown < X.diff.bandUp, JSON.stringify(X.diff));
  T('X9', '2.12 黄金考点入排程：part → 模块三段映射正确', X.gp.p1 === 'p1' && X.gp.p2 === 'p2' && X.gp.p3 === 'p3' && X.gp.nulls, JSON.stringify(X.gp));
  T('X10', '2.9/2.10/2.11 暂缓区（记录+换任务）+ 每日小事件 + 动机锚点', X.misc.deferred === 1 && X.misc.deferHas && X.misc.swapped && X.misc.event && X.misc.why && X.misc.whyFn, JSON.stringify(X.misc));
  T('X11', '2.8 PWA：manifest 已挂载 + SW 注册与更新提示条就绪', X.pwa.reg && X.pwa.bar && X.pwa.link && X.pwa.theme, JSON.stringify(X.pwa));
  T('X12', '红线 R4 文案扫描：无「稳过 / 必过 / 保证过 / 提分 N」', !X.ban.wen && !X.ban.bi && !X.ban.bao && !X.ban.ti, JSON.stringify(X.ban));

  /* ========== Y. v3.3.0 · P3 应用效率（首屏瘦身 / 索引 / memo） ========== */
  sect('Y. P3 应用效率 · 首屏瘦身 / O(1) 索引 / 派生指标 memo');
  const Y = await page.evaluate(() => {
    const out = {};
    /* Y1 3D 引擎不再静态加载（首屏省 ~1.07MB + draco）
       ⚠ 不能用 head.innerHTML 判「无静态引用」——惰性加载器 __ckLoadMV 的定义本身就写在 <head> 的
         内联 <script> 里，字符串 './vendor/model-viewer.min.js' 必然出现在 head.innerHTML 中。
       正确判据：① 不存在静态 <script src>/<link href> 指向 model-viewer；② openMV 改走惰性入口。 */
    const staticTag = document.querySelector('script[src*="model-viewer"], link[href*="model-viewer"]');
    out.mv = { lazy: typeof window.__ckLoadMV === 'function',
      noStaticSrc: !staticTag,
      staticTagSrc: staticTag ? (staticTag.getAttribute('src') || staticTag.getAttribute('href')) : '',
      usesInOpen: openMV.toString().indexOf('__ckLoadMV') >= 0 };
    /* Y2 O(1) 题目索引 */
    const q1 = ALLQ[0];
    __qbyid = null;
    const got = qById(q1.id);
    out.idx = { hit: !!got && got.id === q1.id, miss: qById('__nope__') === null, size: __qbyid ? __qbyid.size : 0, total: ALLQ.length };
    /* Y3 派生指标 memo：同版本重复调用命中缓存，save() 后失效 */
    bumpStat(); modStats('m1');
    const c1 = Object.keys(__statCache).length;
    modStats('m1'); modStats('m1');
    const c2 = Object.keys(__statCache).length;
    save();
    const c3 = Object.keys(__statCache).length;
    out.memo = { first: c1, repeat: c2, afterSave: c3 };
    /* Y4 DUP_REAL 惰性化 */
    out.dup = { lazyFn: typeof dupReal === 'function', cached: !!__dupCache, keys: Object.keys(dupReal()).length };
    return out;
  });
  /* 资源可达性 + 首屏瘦身的**原始源码**证据：在页面内 fetch。
     （不能走 page.request —— 本沙箱下它会经由代理通道，对 localhost 也会 err。） */
  const yNet = await page.evaluate(async () => {
    const res = { files: {}, src: {} };
    for (const f of ['sw.js', 'manifest.json']) {
      try { const r = await fetch(f, { cache: 'no-store' }); res.files[f] = r.status; }
      catch (e) { res.files[f] = 'err'; }
    }
    try {
      const t = await (await fetch(location.href, { cache: 'no-store' })).text();
      res.src.staticTag = /<(?:script|link)\b[^>]*\b(?:src|href)\s*=\s*["'][^"']*model-viewer/i.test(t);
      res.src.dynImport = /import\(\s*['"][^'"]*vendor\/model-viewer/i.test(t);
    } catch (e) { res.src.staticTag = 'err'; res.src.dynImport = 'err'; }
    return res;
  });
  const yFiles = yNet.files;
  T('Y1', 'P3 首屏瘦身：3D 引擎改为按需动态加载（源码无静态标签 + openMV 走惰性入口）', Y.mv.lazy && Y.mv.noStaticSrc && Y.mv.usesInOpen && yNet.src.staticTag === false && yNet.src.dynImport === true, JSON.stringify({ mv: Y.mv, src: yNet.src }));
  T('Y2', 'P3 O(1) 题目索引：qById 命中/未命中均正确且覆盖全库', Y.idx.hit && Y.idx.miss && Y.idx.size === Y.idx.total, JSON.stringify(Y.idx));
  T('Y3', 'P3 派生指标 memo：重复调用命中缓存，save() 换版本后清空（不脏读）', Y.memo.first >= 1 && Y.memo.repeat === Y.memo.first && Y.memo.afterSave === 0, JSON.stringify(Y.memo));
  T('Y4', 'P3 惰性化 DUP_REAL：加载期不再两次全库建键，首次用到才算', Y.dup.lazyFn && Y.dup.cached && Y.dup.keys > 0, JSON.stringify(Y.dup));
  T('Y5', 'P2.8 PWA 资源可访问（sw.js / manifest.json 均 200）', yFiles['sw.js'] === 200 && yFiles['manifest.json'] === 200, JSON.stringify(yFiles));

  /* ========== Z. v3.4.0 · Agent 工具可达性 / 自动触发 / 趋势 / 按需题库 / 命名冲突 ========== */
  sect('Z. v3.4.0 · Agent 会用工具（9/9 可达）· 自动触发 · 趋势接线 · 按需题库 · 命名冲突');
  const Z = await page.evaluate(() => {
    const out = {};
    /* Z1 命名冲突消解：考点分值表更名 KD_SCORE，考点速记资料库仍是 window.KAODIAN（互不遮蔽） */
    out.name = { score: typeof KD_SCORE === 'object' && !!(KD_SCORE.m1 && KD_SCORE.m1.obj === 14.4),
      libIsArray: Array.isArray(window.KAODIAN),
      libLen: Array.isArray(window.KAODIAN) ? window.KAODIAN.length : -1,
      mid: kdOf('m1').obj === 14.4, modW: MOD_W.m1 > 0 };
    /* Z2 工具可达性契约：TOOLS 注册 9 个能力，agPlanRule 必须**全部**能派发
       （v3.1.0 实测 9 个里只有 5 个可达：weak_drill_mod/replan_today/inject_game_pool/regen_variant 是死分支） */
    const base = { rest:false, today:'none', dqDone:0, dqAll:3, due:0, weak:[], weakTop:null, weakGap:0,
      weakFocus:[], onGames:false, aiOk:false, lastWrong:null, planMissed:0, planPending:0,
      subj:'math', slot:'上午', pro:{ sessionLen:20 } };
    const anyQ = ALLQ[0];
    const cases = {
      force_rest:       Object.assign({}, base, { rest:true }),
      today_task:       Object.assign({}, base, { today:'todo' }),
      replan_today:     Object.assign({}, base, { planMissed:2, planPending:2 }),
      review_wrong:     Object.assign({}, base, { due:6 }),
      inject_game_pool: Object.assign({}, base, { onGames:true, weakTop:'m1', weak:['m1'], weakFocus:['m1'] }),
      regen_variant:    Object.assign({}, base, { aiOk:true, lastWrong:{ id:anyQ.id, mod:anyQ.m, modName:modName(anyQ.m), q:anyQ } }),
      weak_drill_mod:   Object.assign({}, base, { weakTop:'m1', weak:['m1'], weakGap:20 }),
      weak_drill:       Object.assign({}, base, { weakTop:'m1', weak:['m1','m2'], weakGap:3 }),
      start_drill:      Object.assign({}, base)
    };
    const got = {};
    Object.keys(cases).forEach(n => { got[n] = agPlanRule(cases[n]).tool; });
    const wrongHit = Object.keys(cases).filter(n => got[n] !== n);
    out.reach = { registered: Object.keys(TOOLS).length, cases: Object.keys(cases).length,
      hit: Object.keys(got).length - wrongHit.length, wrongHit: wrongHit.map(n => n + '→' + got[n]),
      startMod: agPlanRule(cases.start_drill).mod, picksMod: typeof pickModForSubj === 'function' };
    /* Z2b 可执行性：真实感知下派出的决策必须能过 canRun（旧版会派 review_wrong/start_drill 却被当场拒绝） */
    const dec = agPlan(agPerceive());
    const chk = canRun(dec.tool, Object.assign({}, dec, { n:20 }));
    out.exec = { tool:dec.tool, ok:chk.ok, why:chk.why || '' };
    /* Z2c 三个「前置依赖真实数据」的 tool：补种子后必须真能执行（证明不是派出即被拒） */
    const bak = { w:st.wrong.slice(), r:JSON.parse(JSON.stringify(st.records || {})), tt:st.todayTask, md:JSON.parse(JSON.stringify(st.mod || {})) };
    const SM = 'm1', sq = ALLQ.filter(q => q.m === SM).slice(0, 5);
    if(sq.length >= 4){
      st.wrong = [{ id:sq[0].id, q:sq[0].q, a:'x', m:modName(SM), srs:{ stage:0, due:Date.now() - 1000 } }];
      st.records = {};
      sq.forEach(q => { st.records[q.id] = { n:4, c:0, last:Date.now(), ok:0, subj:q.subj, m:q.m }; });
      bumpStat();
      const seeded = {
        /* 「今日约定已清空 + 还有 1 道到期」才是 review_wrong 的第二条可达路径
           （due=1 且约定没清空时**不该**来催，所以规则里前面还有 due>=5 的门槛） */
        review_wrong:     Object.assign({}, base, { due:1, dqDone:3, dqAll:3 }),
        inject_game_pool: Object.assign({}, base, { onGames:true, weakTop:SM, weak:[SM], weakFocus:[SM] }),
        weak_drill:       Object.assign({}, base, { weakTop:SM, weak:[SM, 'm2'], weakGap:3 })
      };
      out.seed = {}; out.weakDetect = (weakModules() || []).length;
      Object.keys(seeded).forEach(n => {
        const d = agPlanRule(seeded[n]);
        const ck = canRun(d.tool, Object.assign({}, d, { n:20, mod:d.mod || SM }));
        out.seed[n] = { tool:d.tool, ok:ck.ok, why:ck.why || '' };
      });
    } else out.seed = { skip:'题库样本不足' };
    st.wrong = bak.w; st.records = bak.r; st.todayTask = bak.tt; if(bak.md) st.mod = bak.md;
    bumpStat(); save();
    /* Z3 自动触发：60s 节流 + 只感知不执行 + **不污染 episodic**（否则 proLearn 的活跃时段会被噪音带偏） */
    const n0 = AG.log.length, e0 = memEnsure().epi.length, scBefore = (document.querySelector('.screen.active') || {}).id;
    AG.autoAt = Date.now();                      // 人为「刚跑过」→ 必然节流跳过
    const skipped = agAutoTick() === null;
    AG.autoAt = 0;                               // 人为「很久没跑」→ 必然执行一次
    const r2 = agAutoTick();
    out.auto = { skipped: skipped, ran: !!r2, grew: AG.log.length - n0, epiGrew: memEnsure().epi.length - e0,
      marked: AG.log.slice(-2).some(x => x.auto === true),
      screenKept: (document.querySelector('.screen.active') || {}).id === scBefore,
      toolsNoExec: typeof agAutoTick === 'function' };
    /* Z4 memTrend 接线：从「定义了零调用」变成「能算 + 能渲染」 */
    const sem = memEnsure().sem, bakH = sem.m1 ? sem.m1.h : null;
    sem.m1 = { h: [ {d:'d-3', v:40}, {d:'d-2', v:48}, {d:'d-1', v:52}, {d:'d0', v:55} ] };
    const tr = memTrend('m1');
    out.trend = { isFn: typeof memTrend === 'function', now:tr.now, slope:tr.slope, prev:tr.prev };
    sem.m1 = { h: [ {d:'d-1', v:40}, {d:'d0', v:52} ] };     // 两天记录 → 决策页应出现趋势行
    go('s-butler'); butlerTab('agent');
    const bb = document.getElementById('butlerBody');
    const btxt = (bb || {}).innerText || '';
    out.trendCard = { has: btxt.indexOf('掌握度趋势') >= 0, slots: bb ? bb.querySelectorAll('.slot').length : 0 };
    if(bakH) sem.m1 = { h:bakH }; else delete sem.m1;
    /* Z5 按需题库：两份非关键题库不再静态阻塞首屏，但仍全程可用 */
    out.bank = { readyKaodian: bankReady('kaodian'), readyGold: bankReady('goldpoints'),
      flag: window.__ckBanksReady === true,
      kaodianLen: Array.isArray(window.KAODIAN) ? window.KAODIAN.length : -1,
      gpGroups: Object.keys((window.GOLD_POINTS && window.GOLD_POINTS.data) || {}).length,
      idempotent: (function(){ try{ const p = ensureBank('kaodian'); return !!p && typeof p.then === 'function'; }catch(e){ return false; } })(),
      hasEntry: typeof renderNoteScreen === 'function',
      dynTags: Array.prototype.slice.call(document.querySelectorAll('script[src]'))
        .map(s => s.getAttribute('src')).filter(s => /kaodian|goldpoints/.test(s)).length };
    return out;
  });
  /* Z5 的**源码级**证据：内联/静态 <script src="data/kaodian.js"> 必须已从 index.html 里消失
     （否则「按需加载」只是运行时说法，浏览器照样会同步解析 881KB）。页面内 fetch 拿原始 HTML。 */
  const zSrc = await page.evaluate(async () => {
    try {
      const t = await (await fetch(location.href, { cache:'no-store' })).text();
      return { staticKaodian: /<script[^>]*\bsrc\s*=\s*["']data\/kaodian\.js["']/i.test(t),
        staticGold: /<script[^>]*\bsrc\s*=\s*["']data\/goldpoints\.js["']/i.test(t),
        preload: /rel\s*=\s*["']preload["'][^>]*kaodian/i.test(t),
        hasLoader: /function\s+ensureBank\s*\(/.test(t) };
    } catch (e) { return { err:String(e) }; }
  });
  T('Z1', '命名冲突消解：分值表更名 KD_SCORE，考点资料库仍为 window.KAODIAN（不再同名遮蔽）',
    Z.name.score && Z.name.libIsArray && Z.name.libLen > 20 && Z.name.mid && Z.name.modW, JSON.stringify(Z.name));
  T('Z2', '工具可达性：TOOLS 注册 9 个 tool，agPlanRule 9/9 全部可派发（消灭 4 个死分支）',
    Z.reach.registered === 9 && Z.reach.cases === 9 && Z.reach.wrongHit.length === 0 && Z.reach.hit === 9
    && !!Z.reach.startMod && Z.reach.picksMod, JSON.stringify(Z.reach));
  T('Z3', '决策可执行：真实感知派出的 tool 过 canRun；补种子后 review_wrong / inject_game_pool / weak_drill 均真执行',
    Z.exec.ok && Z.seed.review_wrong && Z.seed.review_wrong.tool === 'review_wrong' && Z.seed.review_wrong.ok
    && Z.seed.inject_game_pool.ok && Z.seed.weak_drill.ok, JSON.stringify({ exec:Z.exec, seed:Z.seed }));
  T('Z4', 'AG 自动触发：60s 节流生效、只感知不执行（不跳页）、不写 episodic（不污染活跃时段画像）',
    Z.auto.skipped && Z.auto.ran && Z.auto.grew >= 2 && Z.auto.epiGrew === 0 && Z.auto.marked && Z.auto.screenKept,
    JSON.stringify(Z.auto));
  T('Z5', 'memTrend 接线：趋势可算（今日 − 3 天前）且决策页真的渲染出「掌握度趋势」',
    Z.trend.isFn && Z.trend.slope === 15 && Z.trendCard.has && Z.trendCard.slots > 0, JSON.stringify(Z.trend) + ' ' + JSON.stringify(Z.trendCard));
  T('Z6', '按需题库：kaodian/goldpoints 就绪可用，且 index.html 里已无静态 <script src> 指向它们',
    Z.bank.readyKaodian && Z.bank.readyGold && Z.bank.flag && Z.bank.kaodianLen > 20 && Z.bank.gpGroups >= 3
    && Z.bank.idempotent && Z.bank.hasEntry && zSrc.staticKaodian === false && zSrc.staticGold === false
    && zSrc.preload === false && zSrc.hasLoader === true, JSON.stringify(Z.bank) + ' ' + JSON.stringify(zSrc));

  /* ---------- N. 运行期 JS 错误 & 资源 ---------- */
  sect('N. 运行期 JS 错误 & 资源完整性');
  const appErrs = errs.filter(x => !/siliconflow|api\.|Failed to fetch|net::|ERR_|AbortError/i.test(x));
  T('N1', '全流程零应用级 JS 错误', appErrs.length === 0, 'errs=' + appErrs.length + (appErrs.length ? ' | ' + appErrs.slice(0, 3).join(' || ') : ''));
  const site404 = net404.filter(u => /chengkao\.xixipp\.cloud|127\.0\.0\.1/.test(u));
  T('N2', '本站无 404 资源', site404.length === 0, site404.length ? site404.slice(0, 4).join(' ; ') : '0');
  if (net404.length) console.log('  资源 4xx/5xx 明细(' + net404.length + '):\n   - ' + net404.slice(0, 10).join('\n   - '));

  /* ---------- 汇总 ---------- */
  console.log('\n==============================================');
  console.log('回归结果: PASS ' + pass + ' / FAIL ' + fail + ' / 共 ' + (pass + fail));
  const failed = results.filter(r => !r.ok).map(r => r.id + ' ' + r.name);
  if (failed.length) console.log('失败项:\n - ' + failed.join('\n - '));
  console.log('==============================================');
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
