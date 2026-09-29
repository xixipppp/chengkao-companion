/* v3.8.0 P1 冒烟：全站按钮层级 + 笔记收藏 + 雷达行动卡 + AI 内置 Key/模型可配
   用法：CI=1 TEST_URL=http://127.0.0.1:8900/index.html node tests/p1_smoke.js */
const { chromium } = require('playwright-core');
const URL = process.env.TEST_URL || 'http://127.0.0.1:8900/index.html';
let PASS = 0, FAIL = 0;
function T(name, cond, extra){
  if(cond){ PASS++; console.log('  ✅ ' + name); }
  else{ FAIL++; console.log('  ❌ ' + name + (extra ? '  → ' + JSON.stringify(extra) : '')); }
}
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:390, height:844} });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e.message || e)));
  page.on('console', m => { if(m.type() === 'error') errs.push('console: ' + m.text()); });
  await page.goto(URL, { waitUntil:'domcontentloaded' });
  await page.waitForTimeout(1200);

  console.log('\n=== A. 全站按钮层级与触控 ===');
  const a = await page.evaluate(() => {
    const bt = document.createElement('div'); bt.className = 'btns';
    bt.innerHTML = '<button class="btn keep" id="t1">主</button><button class="btn" id="t2">次1</button><button class="btn" id="t3">次2</button>';
    document.body.appendChild(bt);
    const g = id => getComputedStyle(document.getElementById(id));
    const s1 = g('t1'), s2 = g('t2'), s3 = g('t3');
    const h1 = document.getElementById('t1').getBoundingClientRect().height;
    const h2 = document.getElementById('t2').getBoundingClientRect().height;
    const btnAll = Array.from(document.querySelectorAll('.btn'));
    const small = btnAll.filter(b => b.getBoundingClientRect().height > 0 && b.getBoundingClientRect().height < 36).length;
    /* 注意：必须在 remove() 之前取值 —— getComputedStyle 是 live 对象，元素脱离文档后会读空 */
    const res = { mainBg: s1.backgroundImage, secBg: s2.backgroundColor, secBorder: s2.borderTopWidth,
             sec2Bg: s3.backgroundColor, h1: Math.round(h1), h2: Math.round(h2), btnCount: btnAll.length, tooSmall: small };
    bt.remove();
    return res;
  });
  T('A1 主操作为渐变实心（keep）', /gradient/.test(a.mainBg), a.mainBg);
  T('A2 同容器后续按钮自动降为次要（非渐变）', !/gradient/.test(a.secBg) && !/gradient/.test(a.sec2Bg), a);
  T('A3 次要按钮有描边', parseFloat(a.secBorder) > 0, a.secBorder);
  T('A4 按钮触控热区 ≥40px', a.h1 >= 40 && a.h2 >= 40, a);
  T('A5 页面按钮数量合理（>5 个）', a.btnCount > 5, a.btnCount);

  console.log('\n=== B. 输入框字号 ≥16px（防 iOS 聚焦缩放） ===');
  const b = await page.evaluate(() => {
    const ins = Array.from(document.querySelectorAll('input, textarea'));
    const small = ins.filter(i => { const fs = parseFloat(getComputedStyle(i).fontSize); return fs > 0 && fs < 16; });
    return { total: ins.length, smallN: small.length, smallFs: small.map(i => getComputedStyle(i).fontSize) };
  });
  T('B1 无小于 16px 的输入框', b.smallN === 0, b);

  console.log('\n=== C. 笔记与收藏 ===');
  const c = await page.evaluate(() => {
    st.notes = {}; st.favs = [];
    const q = ALLQ[0];
    const bar = qNoteBar(q);
    document.body.appendChild(bar);
    const btns = Array.from(bar.querySelectorAll('button')).map(x => x.textContent);
    toggleFav(q, bar.querySelector('button'));
    const afterFav = { has: favHas(q.id), n: (st.favs || []).length, txt: bar.querySelector('button').textContent };
    saveNoteTest = null;
    // 模拟保存笔记
    const box = document.createElement('div'); box.id = 'noteBox';
    const ta = document.createElement('textarea'); ta.id = 'noteTa'; ta.value = '我的笔记内容';
    box.appendChild(ta); document.body.appendChild(box);
    saveNote(q.id);
    const noteSaved = (st.notes || {})[q.id];
    bar.remove(); document.getElementById('noteBox');
    return { btns, afterFav, noteSaved, sheetExists: typeof openSheet === 'function' };
  });
  T('C1 每题有收藏+笔记两个按钮', c.btns.length === 2 && /收藏/.test(c.btns[0]) && /笔记/.test(c.btns[1]), c.btns);
  T('C2 收藏生效并可取消识别', c.afterFav.has === true && c.afterFav.n === 1, c.afterFav);
  T('C3 收藏后按钮文案变为已收藏', /已收藏/.test(c.afterFav.txt), c.afterFav.txt);
  T('C4 笔记可保存', c.noteSaved === '我的笔记内容', c.noteSaved);
  T('C5 底部弹层函数存在', c.sheetExists === true);

  console.log('\n=== D. 掌握度雷达改行动卡 ===');
  const d = await page.evaluate(() => {
    // 空数据
    st.mod = {};
    const box = document.getElementById('radarCard');
    renderRadar();
    const empty = box.innerHTML;
    const hasGuide = /去练习/.test(empty);
    // 造数据：两个模块，一弱一强
    const ids = curMods().map(m => m.id);
    st.mod = {}; st.mod[ids[0]] = { c:2, t:10 }; st.mod[ids[1]] = { c:9, t:10 };
    renderRadar();
    const withData = box.innerHTML;
    const attackN = (withData.match(/去攻克/g) || []).length;
    const hasPct = /正确率 20%/.test(withData);
    return { hasGuide, attackN, hasPct, emptyShell: /先去刷几道题/.test(empty) };
  });
  T('D1 空数据时给练习引导（不再是纯空壳）', d.hasGuide === true && d.emptyShell === false, d);
  T('D2 有数据时列出薄弱项并给攻克入口', d.attackN >= 1, d.attackN);
  T('D3 行动卡显示正确率', d.hasPct === true, d);

  console.log('\n=== E. AI 接入（内置 Key / 模型可配 / 错误明示） ===');
  const e = await page.evaluate(() => {
    const k = SF.key;
    const m = SF.model;
    SF.model = 'TestModel/XYZ'; const m2 = SF.model; SF.model = '';
    return { hasKey: !!k && /^sk-/.test(k), keyLen: k.length, model: m, modelSet: m2,
             builtin: typeof BUILTIN_KEY !== 'undefined' && BUILTIN_KEY.length > 10,
             testFn: typeof aiTestConn === 'function' };
  });
  T('E1 内置 Key 已生效（SF.key 为 sk- 开头）', e.hasKey === true, { len:e.keyLen });
  T('E2 内置 Key 常量存在', e.builtin === true);
  T('E3 默认模型为用户指定的在架模型', e.model === 'Pro/Qwen/Qwen2.5-7B-Instruct', e.model);
  T('E4 模型名可配置（写读一致）', e.modelSet === 'TestModel/XYZ', e.modelSet);
  T('E5 连通测试函数存在', e.testFn === true);

  console.log('\n=== F. 零 JS 错误 ===');
  T('F1 全程无 JS 报错', errs.length === 0, errs.slice(0, 5));

  console.log('\n=== 结果：PASS=' + PASS + ' FAIL=' + FAIL + ' ===');
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('测试异常：', e); process.exit(1); });
