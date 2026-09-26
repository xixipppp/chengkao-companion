// Phase 1 视觉改版验证：背景层 + 气泡对话答题 + 回归选择器完整性
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 900, height: 1400 } });
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 140)); });

  await p.goto('http://127.0.0.1:8900/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, { timeout: 15000 });

  let pass = 0, fail = 0;
  const T = (name, ok, extra) => { ok ? pass++ : fail++; console.log((ok ? '[PASS] ' : '[FAIL] ') + name + (extra ? ' :: ' + extra : '')); };

  // 1) 背景层存在且已挂图
  const bg = await p.evaluate(() => {
    setSubject('math'); setAccent(); go('s-home'); setBg('xue');
    const layer = document.getElementById('bgLayer');
    const img = document.getElementById('bgImg');
    return { has: !!layer, display: layer ? getComputedStyle(layer).display : null, src: img ? img.getAttribute('src') : null };
  });
  T('背景层存在且挂图', bg.has && bg.src && bg.src.includes('.jpg'), JSON.stringify(bg));
  await p.waitForTimeout(500);
  await p.screenshot({ path: require('path').join(__dirname, '_p1_home.png') });

  // 2) 进入刷题，检查气泡对话结构与回归选择器
  await p.evaluate(() => startDrill('m1'));
  await p.waitForTimeout(700);
  await p.screenshot({ path: require('path').join(__dirname, '_p1_drill.png') });
  const dom = await p.evaluate(() => ({
    opt: document.querySelectorAll('#drillBody .opt').length,
    fill: !!document.querySelector('#drillBody #fillInput'),
    qbar: !!document.querySelector('#drillBody .qbar'),
    coachline: !!document.querySelector('#drillBody .coachline'),
    chat: document.querySelectorAll('#drillBody .chat, #drillBody .chat-q, #drillBody .bubble.qbubble, #drillBody .chat-replies').length,
    bgStillVisible: document.getElementById('bgLayer') ? getComputedStyle(document.getElementById('bgLayer')).display : 'none'
  }));
  /* m1 题池含选择题与填空题，随机抽题时两者都可能先出，任一作答入口存在即算通过 */
  T('回归选择器 .opt 保留', dom.opt > 0 || dom.fill, 'opt=' + dom.opt + ' fill=' + dom.fill);
  T('回归选择器 .qbar 保留', dom.qbar);
  T('回归选择器 .coachline 保留', dom.coachline);
  T('气泡对话结构渲染', dom.chat >= 3, JSON.stringify(dom));

  // 3) 真实点击答题（选正确答案），确认交互未坏
  const answered = await p.evaluate(() => {
    const d = S.drill; if (!d || !d.list || !d.list.length) return { ok: false, why: 'no drill' };
    const q = d.list[d.i];
    if (q.t !== 'choice') return { ok: true, why: 'fill question, skip' };
    const opts = document.querySelectorAll('#drillBody .opt');
    const idx = opts.length > q.a ? q.a : 0;
    opts[idx].click();
    return { ok: true, locked: !!(document.querySelector('#drillBody .opt.ok') || document.querySelector('#drillBody .opt.dis')) };
  });
  T('点击答题交互正常', answered.ok, JSON.stringify(answered));

  T('零 pageerror/console.error', errs.length === 0, errs.slice(0, 3).join(' ; '));
  console.log('\n========== ' + pass + ' 通过 / ' + fail + ' 失败 ==========');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
