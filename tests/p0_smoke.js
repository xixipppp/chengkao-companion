/* v3.7.0 P0 冒烟：AI 连通测试 / 填空归一化+符号键盘 / 复仇战分界页 / 战报卡+每题口诀 */
const { chromium } = require('playwright');
const URL = process.env.TEST_URL || 'http://127.0.0.1:8900/index.html';
let pass = 0, fail = 0;
function T(id, name, ok, detail){ if(ok){ pass++; console.log('[PASS] ' + id + ' ' + name); } else { fail++; console.log('[FAIL] ' + id + ' ' + name + ' :: ' + detail); } }
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{ width:420, height:860 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(URL, { waitUntil:'load' });
  await page.waitForTimeout(1500);

  // A. 归一化判分
  const a = await page.evaluate(() => ({
    n1: normFill('３ / e²'), n2: normFill(' 3 / E^2 '),
    eq1: fillEq('3 / e²', '3/e2'), eq2: fillEq('3/e^2', '３ ÷ e²'),
    eq3: fillEq('0', '0 '), eq4: fillEq('x/2', 'x*2')   // x/2 != x*2 应为 false
  }));
  T('A1', 'normFill 全半角/上标/空格归一', a.n1 === '3/e^2' && a.n2 === '3/e^2', JSON.stringify(a));
  T('A2', 'fillEq 宽松匹配 e^2==e2、全半角混合', a.eq1 && a.eq2 && a.eq3, JSON.stringify(a));
  T('A3', 'fillEq 不误判 x/2 != x*2', a.eq4 === false, String(a.eq4));

  // B. 填空题出现符号键盘
  const kb = await page.evaluate(() => {
    const ALLQ_ = ALLQ.filter(q => q.t !== 'choice');
    const q = ALLQ_[0] || null;
    if(!q) return { has: false };
    S.drill = { mod:'all', list:[q], i:0, right:0, isWrong:false, label:'p0', mode:'normal', cleared:{}, pendingWrong:0, totalWrong:0, wrongN:{}, ansLog:{}, revengeQ:[], baseLen:1 };
    go('s-drill'); renderDrill();
    const sec = document.getElementById('s-drill');
    const keys = sec.querySelectorAll('button');
    let keypadN = 0; keys.forEach(b => { if(['²','³','√','π','∞'].indexOf(b.textContent) >= 0) keypadN++; });
    return { has: keypadN >= 5, keypadN };
  });
  T('B1', '填空题渲染数学符号键盘(≥5个键)', kb.has, JSON.stringify(kb));

  // C. 复仇战分界页：首轮结束 + 有错题 → 出现「只做这 N 道」
  const rv = await page.evaluate(() => {
    const qs = ALLQ.slice(0, 3);
    S.drill = { mod:'all', list: qs.map(q => Object.assign({}, q)), i: 3, right: 1, isWrong:false, label:'p0r', mode:'normal',
      cleared: { [qs[0].id]: 1 }, wrongN: { [qs[1].id]: 1, [qs[2].id]: 1 }, pendingWrong: 2, totalWrong: 2,
      ansLog: {}, revengeQ: [qs[1], qs[2]], baseLen: 3 };
    renderDrill();
    const go1 = document.getElementById('rvGo'), quit1 = document.getElementById('rvQuit');
    if(!go1) return { has:false };
    const txt = go1.textContent;
    go1.click();
    return { has:true, txt, lenAfter: S.drill.list.length, pendAfter: S.drill.pendingWrong };
  });
  T('C1', '复仇战分界页出现(只做错题按钮)', rv.has && /2/.test(rv.txt || ''), JSON.stringify(rv));
  T('C2', '点击复仇战后队列=错题2道', rv.lenAfter === 2, String(rv.lenAfter));

  // D. 非通关结束页战报卡：公式速查 + 思维导图 + 口诀按钮
  const rp = await page.evaluate(() => {
    const qs = ALLQ.slice(0, 4);
    S.drill = { mod:'all', list: qs.map(q => Object.assign({}, q)), i: 4, right: 4, isWrong:true, label:'p0rp', mode:'normal',
      cleared:{}, wrongN:{}, pendingWrong:0, totalWrong:0, ansLog:{}, revengeQ:[], baseLen:4 };
    renderDrill();
    return { f: !!document.getElementById('repF'), m: !!document.getElementById('mindBody2'),
             memo: !!document.getElementById('memoBtn2'), fLen: (document.getElementById('repF')||{innerHTML:''}).innerHTML.length };
  });
  T('D1', '结束页战报卡(公式速查/导图/口诀)齐全', rp.f && rp.m && rp.memo && rp.fLen > 50, JSON.stringify(rp));

  // E. 每题口诀 + AI 连通测试入口存在
  const e2 = await page.evaluate(() => ({
    memoFn: typeof qMemoEl === 'function',
    testFn: typeof aiTestConn === 'function',
    mnemN: Object.keys(MNEM_LOCAL).length,
    baseCfg: SF.base.indexOf('http') === 0
  }));
  T('E1', 'qMemoEl/aiTestConn 函数就位', e2.memoFn && e2.testFn, JSON.stringify(e2));
  T('E2', '内置口诀库 ≥16 考点', e2.mnemN >= 16, String(e2.mnemN));
  T('E3', 'SF.base 可配置(默认硅基流动)', e2.baseCfg, e2.baseCfg);

  // F. 零 JS 错误
  T('F1', '无未捕获 JS 错误', errs.length === 0, errs.join(' | ').slice(0, 200));

  console.log('\n===== 汇总 =====');
  console.log('PASS=' + pass + ' FAIL=' + fail);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('RUNNER ERROR', e); process.exit(1); });
