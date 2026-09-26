/* ============================================================
 * 心动成考·乙女陪练 — 线上生产环境全模块回归测试（UAT / Regression）
 * 目标：访问线上 chengkao.xixipp.cloud，逐条核对所有模块与需求
 * 运行：TEST_URL=... node tests/online_regression.js
 * 说明：沙箱需 --no-proxy-server 直连（代理会间歇阻断）
 * ============================================================ */
const { chromium } = require('playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const URL = process.env.TEST_URL || 'https://chengkao.xixipp.cloud/index.html';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge',
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
    return {
      nav: document.querySelectorAll('[onclick^="go("]').length,
      ver: (document.getElementById('appVer') || {}).textContent || '',
      hero: home.innerText.length > 200,
      hasAnimeEntry: home.innerText.indexOf('动画') >= 0,
      hasButlerEntry: home.innerText.indexOf('管家') >= 0
    };
  });
  T('B1', '导航入口≥30', b.nav >= 30, 'nav=' + b.nav);
  T('B2', '版本号显示 v2.2.0', b.ver.trim() === 'v2.2.0', JSON.stringify(b.ver));
  T('B3', '主页内容渲染正常', b.hero);
  T('B4', '主页含英语动画课堂入口', b.hasAnimeEntry);
  T('B5', '主页含AI学习管家入口', b.hasButlerEntry);

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
    openGame('gacha');
    st.coins = 200; save();
    const free = document.getElementById('gDraw').textContent.includes('免费');
    document.getElementById('gDraw').click();
    document.getElementById('gDraw').click();
    const stageHasCard = document.getElementById('gachaStage').textContent.includes('·');
    document.getElementById('gColl').click();
    return { free, stageHasCard, gridN: document.querySelectorAll('#gachaGrid .gcard2').length, owned: Object.keys(st.gacha || {}).length };
  });
  ['lim', 'harvest', 'match', 'flip', 'order', 'pic', 'rush', 'chat', 'mine'].forEach(gid =>
    T('H-' + gid, '小游戏[' + gid + ']可开局并结算', GR[gid] === true, 'replay=' + GR[gid]));
  T('H-gacha', '学习扭蛋可抽取+图鉴记录', GR.gacha && GR.gacha.free === true && GR.gacha.owned > 0, JSON.stringify(GR.gacha));

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
    return { screen: (document.querySelector('.screen.active') || {}).id, mod: d.mod, fromPlan: !!d.fromPlan,
      taskMod: st.todayTask && st.todayTask.mod, opts: document.querySelectorAll('#drillBody .opt').length,
      q: d.list && d.list[0] ? String(d.list[0].q).slice(0, 30) : '' };
  });
  T('Q6', '点任务卡 1 步直达答题页', q3.screen === 's-drill' && q3.opts > 0, q3.screen + ' opts=' + q3.opts + ' | ' + q3.q);
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
