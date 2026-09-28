/* ============================================================
 * 心动成考·乙女陪练 — 音频系统冒烟测试（音效引擎 + 语音朗读加固 + 云端兜底）
 * 目标：确认 SFX 不抛错、speak 队列/分段正常、各模块都有朗读入口、设置 UI 存在。
 * 运行：TEST_URL=... node tests/audio_smoke.js
 * ============================================================ */
const { chromium } = require('playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const URL = process.env.TEST_URL || 'https://chengkao.xixipp.cloud/index.html';
const CHANNEL = process.env.TEST_CHANNEL || (process.env.CI ? undefined : 'msedge');

(async () => {
  const browser = await chromium.launch({ channel: CHANNEL, args: ['--no-sandbox', '--no-first-run', '--no-proxy-server'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text().slice(0, 150)); });

  let pass = 0, fail = 0;
  const results = [];
  const T = (id, name, ok, extra) => { ok ? pass++ : fail++; results.push({ id, name, ok }); console.log((ok ? '[PASS] ' : '[FAIL] ') + id + ' ' + name + (extra !== undefined ? ' :: ' + extra : '')); };
  const sect = s => console.log('\n===== ' + s + ' =====');

  console.log('>>> 目标环境: ' + URL);
  let loaded = false, lastErr = '';
  for (let attempt = 1; attempt <= 4 && !loaded; attempt++) {
    try {
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_PASSAGES && window.MATH_BANK, { timeout: 30000 });
      loaded = true;
    } catch (e) { lastErr = e.message.split('\n')[0]; console.log('  [goto 第' + attempt + '次失败] ' + lastErr); await sleep(4000); }
  }
  if (!loaded) { console.log('!! 加载失败：' + lastErr); await browser.close(); process.exit(2); }
  await sleep(600);

  sect('A. 音效引擎（SFX）');
  const a = await page.evaluate(() => {
    const out = { has: typeof window.SFX === 'object' && typeof window.SFX.play === 'function', threw: false, names: [] };
    try {
      ['correct','wrong','click','tap','coin','win','levelup','combo','special','heart','open'].forEach(n => { window.SFX.play(n); out.names.push(n); });
    } catch (e) { out.threw = e.message; }
    return out;
  });
  T('A1', 'SFX 引擎存在且 play 可调用', a.has === true);
  T('A2', '连续播放 11 种音效不抛错', a.threw === false, 'threw=' + a.threw);
  T('A3', '音效默认开启（st.sfxOn!==false）', await page.evaluate(() => window.SFX.on === true));

  sect('B. 语音朗读加固（队列 / 分段 / 云端兜底）');
  const b = await page.evaluate(() => {
    const out = { speakFn: typeof speak === 'function', cloudFn: typeof cloudSpeak === 'function', narrateFn: typeof window.anim2dNarrate === 'function', threw: false, chunks: 0, cloud: null };
    try {
      out.cloud = typeof st.cloudTts === 'object' && 'enabled' in st.cloudTts && 'endpoint' in st.cloudTts;
      const longZh = '这是第一句话。这是第二句话需要被切分。这是第三句话仍然很长应该继续分开。这是第四句话用来验证分段逻辑是否正确工作。这是第五句话确保足够长以触发多次切分。';
      out.chunks = (typeof _chunk === 'function') ? _chunk(longZh, 'zh-CN').length : -1;
      speak('音频冒烟测试一句话。');   // 不应抛错
    } catch (e) { out.threw = e.message; }
    return out;
  });
  T('B1', 'speak / cloudSpeak / anim2dNarrate 入口存在', b.speakFn && b.cloudFn && b.narrateFn);
  T('B2', '调用 speak 不抛错', b.threw === false, 'threw=' + b.threw);
  T('B3', '长中文按句分段（>1 段）', b.chunks > 1, 'chunks=' + b.chunks);
  T('B4', '云端朗读配置结构存在（enabled/endpoint）', b.cloud === true);

  sect('C. 所有题目都有朗读按钮');
  const c = await page.evaluate(() => {
    const eng = ALLQ.find(x => x.subj === 'eng' && x.t === 'choice');
    const pol = ALLQ.find(x => x.subj === 'pol' && x.t === 'choice');
    const math = ALLQ.find(x => x.subj === 'math' && x.t === 'choice');
    function count(q){ S.drill = { mod:'all', list:[q], i:0, right:0, isWrong:false, label:'音频核对', mode:'normal', cleared:{}, pendingWrong:0, totalWrong:0, wrongN:{}, ansLog:{} }; go('s-drill'); renderDrill(); const sec = document.getElementById('s-drill'); return sec.querySelectorAll('.ttsbar').length; }
    return { eng: count(eng), pol: count(pol), math: count(math) };
  });
  T('C1', '英语题有朗读按钮(.ttsbar)', c.eng > 0, 'n=' + c.eng);
  T('C2', '政治题有朗读按钮(.ttsbar)', c.pol > 0, 'n=' + c.pol);
  T('C3', '高数题有朗读按钮(.ttsbar)', c.math > 0, 'n=' + c.math);

  sect('D. 动画讲解有「朗读讲解」按钮');
  const d = await page.evaluate(() => {
    const q = ALLQ.find(x => x.t === 'choice');
    go('s-games'); renderGames();
    try { if (typeof Anim2D !== 'undefined' && Anim2D.build) { const spec = Anim2D.build(q); window.__spec = spec; } } catch(e){}
    return { hasNarrate: typeof window.anim2dNarrate === 'function' };
  });
  T('D1', 'window.anim2dNarrate 可调用', d.hasNarrate === true);

  sect('E. 「我的」设置 UI（音效 / 云端朗读）');
  const e = await page.evaluate(() => {
    go('s-me'); renderMe();
    return {
      sfx: !!document.getElementById('sfxToggle'),
      cloudBtn: !!document.getElementById('cloudTtsBtn'),
      cloudBox: !!document.getElementById('cloudTtsBox'),
      ep: !!document.getElementById('ctEndpoint'),
      tk: !!document.getElementById('ctToken')
    };
  });
  T('E1', '音效开关存在(#sfxToggle)', e.sfx);
  T('E2', '云端朗读开关存在(#cloudTtsBtn)', e.cloudBtn);
  T('E3', '云端朗读配置框与输入框存在', e.cloudBox && e.ep && e.tk);

  sect('F. 运行时错误');
  T('F1', '无未捕获 JS 错误', errs.length === 0, errs.slice(0,3).join(' | '));

  console.log('\n===== 汇总 =====');
  console.log('PASS=' + pass + ' FAIL=' + fail);
  await browser.close();
  process.exit(fail === 0 ? 0 : 1);
})();
