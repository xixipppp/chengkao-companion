// v3.10.0 · P3 冒烟：题级「做题步骤 + 考场速记口诀」+ 教授六段式讲解 + 播放器分段导航
// 在真实页面里跑（TEST_URL 指向本地服务），断言内置库覆盖与接线正确。
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { chromium } = require('playwright');

const TEST_URL = process.env.TEST_URL || 'http://127.0.0.1:8900/index.html';
let pass = 0, fail = 0;
function ok(cond, name, extra){
  if(cond){ pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); }
}

(async () => {
  console.log('=== p3_smoke @ ' + TEST_URL + ' ===');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 860 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(TEST_URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, null, { timeout: 30000 });
  /* anim2d.js 是按需懒加载的，测试里手动注入 */
  if(!(await page.evaluate(() => !!(window.Anim2D && window.Anim2D.build)))){
    await page.addScriptTag({ path: path.join(ROOT, 'data', 'anim2d.js') });
  }

  /* ① 三个内置库都已加载 */
  const libs = await page.evaluate(() => ({
    qstep: !!(window.QSTEP && window.QSTEP.build),
    lecture: !!(window.LECTURE && window.LECTURE.build),
    anim: !!(window.Anim2D && window.Anim2D.build),
    mnem: !!(window.MNEM_DATA && window.MNEM_DATA.rules)
  }));
  ok(libs.qstep, '题级步骤/口诀库 QSTEP 已加载');
  ok(libs.lecture, '教授讲解库 LECTURE 已加载');
  ok(libs.mnem, '考点口诀库 MNEM_DATA 已加载');

  /* ② 全库覆盖：每题都有做题步骤 + 速记口诀；题型命中率 */
  const cov = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    let noSteps = 0, noChant = 0, rule = 0, longChant = 0;
    ALL.forEach(q => {
      const b = window.QSTEP.build(q);
      if(!b.steps || !b.steps.length) noSteps++;
      if(!b.chant || !String(b.chant).trim()) noChant++;
      if(b.from === 'rule') rule++;
      if(String(b.chant).length > 40) longChant++;
    });
    return { n: ALL.length, noSteps, noChant, rule, longChant };
  });
  ok(cov.noSteps === 0, '全库 ' + cov.n + ' 题每题都有做题步骤', '缺 ' + cov.noSteps);
  ok(cov.noChant === 0, '全库每题都有考场速记口诀', '缺 ' + cov.noChant);
  ok(cov.rule / cov.n >= 0.85, '题型规则精准命中率 ≥ 85%', (cov.rule / cov.n * 100).toFixed(1) + '%');
  ok(cov.longChant / cov.n <= 0.01, '速记口诀保持短咒风格（≤40 字为主）', (cov.longChant / cov.n * 100).toFixed(1) + '% 超长');

  /* ③ 讲解库六段齐全 + 占位符不残留 */
  const lec = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    let badSeg = 0, badPh = 0, okSeg = 0;
    ALL.forEach(q => {
      const L = window.LECTURE.build(q, window.QSTEP.pick(q));
      const ids = (L.seg || []).map(s => s.id).join(',');
      if(/aim/.test(ids) && /brk/.test(ids) && /lead/.test(ids) && /trap/.test(ids) && /close/.test(ids)) okSeg++;
      else badSeg++;
      const all = JSON.stringify(L);
      if(/\{\w+\}/.test(all)) badPh++;
    });
    return { n: ALL.length, okSeg, badSeg, badPh };
  });
  ok(lec.badSeg === 0, '讲解六段式（定位/破题/为什么/推演/易错/带走）全覆盖', '缺段 ' + lec.badSeg);
  ok(lec.badPh === 0, '讲解文案无残留占位符', lec.badPh + ' 题残留');

  /* ④ 动画新分镜：lec 六段 + 考场默念，且讲解在答案揭晓之前 */
  const seq = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    let bad = 0, noMnem = 0, sample = '';
    ALL.slice(0, 120).forEach(q => {
      const sp = window.Anim2D.build(q);
      const ids = sp.scenes.map(s => s.id);
      const iRev = ids.indexOf('reveal');
      const lastLec = ids.reduce((a, id, i) => (/^lec_/.test(id) ? i : a), -1);
      if(!(iRev >= 0 && lastLec >= 0 && lastLec < iRev)) bad++;
      if(!ids.includes('mnem')) noMnem++;
      if(!sample) sample = ids.join(',');
    });
    return { bad, noMnem, sample };
  });
  ok(seq.bad === 0, '讲解段全部位于答案揭晓之前', seq.bad + ' 题乱序');
  ok(seq.noMnem === 0, '抽样 120 题都有「考场默念」场景', seq.noMnem + ' 题缺失');

  /* ⑤ 播放器分段导航条存在且可点跳 */
  const nav = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'm2' && /法线/.test(x.q)) || ALL[0];
    const pl = window.Anim2D.open(q, { silent: true });
    const ov = document.getElementById('anim2dOverlay');
    const html = ov ? ov.innerHTML : '';
    if(ov && ov.remove) ov.remove();
    return { opened: !!pl, hasNav: /④推演|⑤易错/.test(html), btns: (html.match(/<button/g) || []).length };
  });
  ok(nav.opened && nav.hasNav, '播放器含分段导航条（①定位…⑥带走）', 'opened=' + nav.opened + ' buttons=' + nav.btns);

  /* ⑥ 答题页接线：做题步骤 + 考场速记都渲染出来了 */
  const wired = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'p1') || ALL[0];
    const el = window.qMemoEl(q);
    const t = el ? el.textContent : '';
    return { hasChant: /考场速记/.test(t), hasSteps: /做题步骤/.test(t), len: t.length };
  });
  ok(wired.hasChant && wired.hasSteps, '答题页已展示「考场速记 + 做题步骤」');

  /* ⑦ v3.10.1 回归：复仇战必须是「重新答题」，不能一进来就是已答错画面 */
  const rev = await page.evaluate(async () => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'p1' && x.t === 'choice');
    window.__q0 = q;
    window.startDrill('p1', 'normal', { only: [q] });
    // 故意答错
    const k = (q.a + 1) % q.o.length;
    window.submitDrill(k, document.querySelectorAll('#drillBody .opt')[k]);
    // 点「下一题」推进到队尾 → 出复仇战分界页
    const nb = [].slice.call(document.querySelectorAll('#drillBody button')).find(b => /下一题/.test(b.textContent));
    if(nb) nb.click();
    window.renderDrill();
    const go = document.getElementById('rvGo');
    if(!go) return { reached: false };
    go.click();
    const opts = document.querySelectorAll('#drillBody .opt');
    return {
      reached: true,
      disabled: [].map.call(opts, o => o.classList.contains('dis')),
      solShown: !!document.querySelector('#drillBody .sol')
    };
  });
  ok(rev.reached, '答错后能进复仇战分界页');
  ok(rev.reached && !rev.solShown && rev.disabled.every(x => !x), '复仇战首屏是重新答题（无已答错解析、选项可点）',
     'sol=' + rev.solShown + ' disabled=' + JSON.stringify(rev.disabled));

  /* ⑧ v3.10.1 回归：题笔记同步落盘 + 笔记本可见（重载到干净页面，避免受刷题流程影响） */
  await page.reload({ waitUntil: 'load' });
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, null, { timeout: 30000 });
  await page.waitForTimeout(400);
  const nt = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'p1' && x.t === 'choice') || ALL[0];
    const host = document.createElement('div'); host.id = 'p3noteHost'; document.body.appendChild(host);
    host.appendChild(window.qNoteBar(q));
    host.querySelectorAll('button')[1].click();          // 打开笔记框
    const ta = document.getElementById('noteTa');
    if(!ta) return { err: 'noteTa 未创建', hostHtml: host.innerHTML.slice(0, 120) };
    ta.value = 'p3 回归测试笔记';
    const btns = [].slice.call(document.querySelectorAll('#noteBox button'));
    const labels = btns.map(b => b.textContent);
    const save = btns.find(b => /保存/.test(b.textContent));
    let clickErr = '';
    try{ if(save) save.click(); }catch(e){ clickErr = String(e); }
    const raw = JSON.parse(localStorage.getItem('ckmath_v3') || '{}');
    window.openNoteSheet();
    const sheet = document.getElementById('ckSheet');
    const txt = sheet ? sheet.textContent : '';
    if(sheet) sheet.remove();
    window.go('s-myNotes');
    const sec = document.getElementById('myQNoteSec');
    return {
      rawKeys: Object.keys(raw).slice(0, 8), labels: labels, clickErr: clickErr,
      saved: !!((raw.notes || {})[q.id]),
      text: (raw.notes || {})[q.id] || '',
      inSheet: /p3 回归测试笔记/.test(txt),
      inMyNotes: sec ? /p3 回归测试笔记/.test(sec.textContent) : false
    };
  });
  ok(nt.saved && nt.text === 'p3 回归测试笔记', '笔记保存后即时落盘', JSON.stringify(nt));
  ok(nt.inSheet, '「我的 · 我的笔记」里能看到这条笔记');
  ok(nt.inMyNotes, '「📒 我的笔记」页顶部也能看到这条笔记');

  /* ⑨ v3.10.1 回归：所有内联 onclick 都必须是可解析的合法 JS
     （历史坑：onclick="fn("id")" 里的双引号会把 HTML 属性提前闭合 → 按钮点了没反应） */
  const onclickSafe = await page.evaluate(() => {
    const ALL = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []);
    const q = ALL.find(x => x.m === 'p1' && x.t === 'choice') || ALL[0];
    if(window.toggleFav) window.toggleFav(q);          // 造一条收藏，让收藏弹层有按钮可检
    if(window.openFavSheet) window.openFavSheet();
    const els = document.querySelectorAll('[onclick]');
    const bad = [];
    [].forEach.call(els, el => {
      const code = el.getAttribute('onclick') || '';
      try{ new Function(code); }catch(e){ bad.push(code.slice(0, 40)); }
    });
    const sheet = document.getElementById('ckSheet'); if(sheet) sheet.remove();
    return { total: els.length, bad: bad };
  });
  ok(onclickSafe.total > 0 && onclickSafe.bad.length === 0,
     '收藏弹层内联 onclick 全部可解析（无属性截断）',
     'total=' + onclickSafe.total + ' bad=' + JSON.stringify(onclickSafe.bad));

  /* ⑩ 页面零 JS 错误 */
  ok(errs.length === 0, '页面无 JS 错误', errs.slice(0, 2).join(' | '));

  console.log('\n通过 ' + pass + ' / ' + (pass + fail));
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
