// 本轮改动的冒烟测试：黄金考点加载 / 小游戏配色修复 / 错题清零机制 / 分步讲题
const { chromium } = require('playwright');
const PORT = process.env.PORT || '8912';
const BASE = 'http://127.0.0.1:' + PORT;
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  // 离线校验：非本地请求一律拦截
  await page.route('**/*', r => { const u = r.request().url(); if (u.includes('127.0.0.1')) r.continue(); else r.abort(); });

  await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, { timeout: 20000 });
  await page.waitForTimeout(800);
  const R = {};

  // 1) 黄金考点数据
  R.goldPoints = await page.evaluate(() => {
    const g = window.GOLD_POINTS;
    if (!g) return { ok: false };
    return { ok: true, ver: g.ver, pol: (g.data.pol || []).length, mat: (g.data.mat || []).length, eng: (g.data.eng || []).length };
  });

  // 2) 黄金考点面板可渲染
  R.goldRender = await page.evaluate(() => {
    go('s-note'); noteSrc('gold');
    const cards = document.querySelectorAll('#gpList .card').length;
    const heads = document.querySelectorAll('#noteGoldWrap .card').length;
    return { visible: document.getElementById('noteGoldWrap').style.display !== 'none', cards, heads };
  });

  // 3) 小游戏配色：浅底卡片必须有深色文字（本次修复的核心）
  R.gameColor = await page.evaluate(() => {
    const mk = (cls, tag) => {
      const d = document.createElement(tag || 'div');
      d.className = cls; d.textContent = '测试文字';
      document.body.appendChild(d);
      const cs = getComputedStyle(d);
      const r = { cls, bg: cs.backgroundColor, color: cs.color };
      d.remove(); return r;
    };
    return [mk('mchip'), mk('ochip'), mk('gcard'), mk('gcard2'), mk('chatin')];
  });

  // 4) 错题清零：答错必须让队列变长，答对后欠账清零
  R.clearZero = await page.evaluate(() => {
    localStorage.clear();
    setSubject && setSubject('math');
    startDrill('all', 'normal');
    const d = S.drill;
    const before = { len: d.list.length, pend: d.pendingWrong, base: d.baseLen };
    // 故意答错第 1 题
    const q0 = d.list[0];
    drillVerdict(q0, false);
    const afterWrong = { len: d.list.length, pend: d.pendingWrong, requeued: d.list[d.list.length - 1].id === q0.id };
    // 再把这笔欠账答对
    drillVerdict(q0, true);
    const afterRight = { pend: d.pendingWrong, cleared: Object.keys(d.cleared).length };
    return { before, afterWrong, afterRight };
  });

  // 5) 状态条能渲染
  R.statusBar = await page.evaluate(() => {
    const d = S.drill;
    d.pendingWrong = 3;
    const el = drillStatusBar(d);
    return { hasCls: el.className.indexOf('taskbar') >= 0, hasWrong: el.className.indexOf('has-wrong') >= 0, text: el.textContent.replace(/\s+/g, ' ').slice(0, 80) };
  });

  // 6) 巩固模式：错一道要换成同考点的另一道
  R.solidMode = await page.evaluate(() => {
    startDrill('all', 'solid');
    const d = S.drill;
    const q0 = d.list[0];
    drillVerdict(q0, false);
    const last = d.list[d.list.length - 1];
    return { sameMod: last.m === q0.m, notSameQ: last.id !== q0.id, clearFor: last.__clearFor === q0.id };
  });

  // 7) 分步讲题存在每步检测结构（离线 AI 失败 → 走本地降级）
  R.stepQuiz = await page.evaluate(async () => {
    startDrill('all', 'normal');
    const q = S.drill.list[0];
    const steps = await buildStepQuiz(q);
    return { n: steps.length, allHaveABCD: steps.every(s => Array.isArray(s.o) && s.o.length >= 2 && typeof s.a === 'number') };
  });

  // 8) 语音函数存在
  R.tts = await page.evaluate(() => ({
    hasSpeak: typeof speak === 'function',
    isEn: isEnText('What is your name?') === true && isEnText('这是一道中文题') === false
  }));

  console.log(JSON.stringify(R, null, 1));
  console.log('pageerrors:', errs.length ? errs.slice(0, 5) : 'NONE');
  await browser.close();
  console.log('DONE');
})();
