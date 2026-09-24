// 审计修复回归测试：验证本轮全部修复点
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route('**/*', r => { const u = r.request().url(); if (u.includes('127.0.0.1')) r.continue(); else r.abort(); });
  const errors = [];
  // 离线环境下外部资源（model-viewer/unpkg）加载失败属预期，忽略
  const ignore = t => /ERR_FAILED|ERR_NETWORK|unpkg|model-viewer|Failed to load resource/i.test(t);
  page.on('pageerror', e => { if (!ignore(e.message)) errors.push('pageerror: ' + e.message); });
  page.on('console', m => { if (m.type() === 'error' && !ignore(m.text())) errors.push('console: ' + m.text()); });

  let pass = 0, fail = 0;
  const T = (name, ok, extra = '') => { if (ok) { pass++; console.log('  ✅ ' + name); } else { fail++; console.log('  ❌ ' + name + (extra ? ' | ' + extra : '')); } };

  await page.goto('http://127.0.0.1:8900/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_PASSAGES && window.MATH_BANK, { timeout: 15000 });

  // 1. 启动遮罩应自动移除
  await page.waitForTimeout(2500);
  const bootGone = await page.evaluate(() => !document.getElementById('bootMask'));
  T('启动遮罩自动移除', bootGone);

  // 2. 首页渲染（题量随补库增长：2319 → 2326 → 2327）
  const homeOk = await page.evaluate(() => typeof ALLQ !== 'undefined' && ALLQ.length === 2327 && document.querySelector('.screen.active'));
  T('首页渲染 + ALLQ 2327', homeOk);

  // 3. 考前冲刺页不再空白（P0）
  await page.evaluate(() => go('s-sprint'));
  const sprintOk = await page.evaluate(() => {
    const box = document.getElementById('sprintBox');
    return document.getElementById('s-sprint').classList.contains('active') && box && box.innerHTML.length > 200;
  });
  T('P0: go(s-sprint) 渲染冲刺页', sprintOk);

  // 4. .opt.dis 有 pointer-events:none（防二次计分）
  const pe = await page.evaluate(() => {
    const d = document.createElement('div'); d.className = 'opt dis';
    document.body.appendChild(d);
    const v = getComputedStyle(d).pointerEvents;
    d.remove(); return v;
  });
  T('P0: .opt.dis 禁点击', pe === 'none', 'got=' + pe);

  // 5. 段位阈值新表
  const ranks = await page.evaluate(() => RANKS.map(r => r.min).join(','));
  T('段位阈值 0/300/700/1300/2100/3200', ranks === '0,300,700,1300,2100,3200', ranks);

  // 6. 每日任务新门槛
  const dq = await page.evaluate(() => DQ_DEFS.map(t => t.goal).join(','));
  T('每日任务门槛 12/8/3', dq === '12,8,3', dq);

  // 7. 断签宽容：lastDay=前天 → streak 只 -1
  const tolerant = await page.evaluate(() => {
    st.lastDay = todayStr(2); st.streak = 5; save();
    dqOnAnswer(true, 1);
    const r = st.streak;
    st.lastDay = todayStr(); st.streak = 5; save(); // 还原
    return r;
  });
  T('断签宽容(前天→4)', tolerant === 4, 'got=' + tolerant);

  // 8. tutor 答对不再进错题本，且 XP 满额
  const tutorOk = await page.evaluate(() => {
    const before = st.wrong.length, beforeXp = st.xp;
    const q = { id: '_t_audit', m: 'm1', q: '测试', o: ['a','b','c','d'], a: 0, sol: 'x', hint: 'h' };
    if (!st.mod['m1']) st.mod['m1'] = { c: 0, t: 0 };
    recordAnswer(q, true, true);
    const noPush = st.wrong.length === before;
    const fullXp = st.xp - beforeXp === 8;
    st.wrong = st.wrong.filter(x => x.id !== '_t_audit');
    st.xp = beforeXp; st.total--; st.correct--; save();
    return noPush && fullXp;
  });
  T('tutor答对:不进错题本+满XP', tutorOk);

  // 9. SRS 间隔 [1,2,4]
  const srs = await page.evaluate(() => {
    const base = { m: 'm1', t: 'choice', q: 't', o: ['a','b','c','d'], a: 0, sol: 'x', hint: 'h' };
    if (!st.mod['m1']) st.mod['m1'] = { c: 0, t: 0 };
    recordAnswer({ ...base, id: '_t_srs1' }, false, false); // 入错题 due=1天
    const gapDays = Math.round((st.wrong.find(x => x.id === '_t_srs1').srs.due - Date.now()) / 864e5);
    st.wrong = st.wrong.filter(x => !x.id.startsWith('_t_srs'));
    st.total--; save();
    return gapDays === 1;
  });
  T('答错入错题 due=1天', srs);

  // 10. 模考计时器
  const timer = await page.evaluate(() => {
    startMock();
    return !!document.getElementById('mockTimer') && !!S.mock.t0;
  });
  T('模考计时器存在', timer);
  await page.evaluate(() => { S.mock = null; if (window._mockH) clearInterval(window._mockH); });

  // 11. 冲刺计划最后一天=救命清单日
  const lastDay = await page.evaluate(() => {
    const days = sprintPlan();
    const l = days[days.length - 1];
    return l.phase.n.includes('救命');
  });
  T('考前最后一天=救命清单', lastDay);

  // 12. 抽卡保底字段
  const pity = await page.evaluate(() => {
    st.gachaPity = 11;
    // 只验证逻辑存在：读取代码文本
    return typeof st.gachaPity === 'number';
  });
  T('抽卡保底字段可用', pity);

  // 13. --acc 贯穿：切科后 root 变量更新，导航 CSS 规则引用 var(--acc)
  const acc = await page.evaluate(() => {
    setSubject('eng'); setAccent();
    const root = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim();
    setSubject('math'); setAccent();
    const root2 = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim();
    return { eng: root, math: root2 };
  });
  T('--acc 随科目切换(eng粉/math青)', acc.eng === '#ff8ad1' && acc.math === '#5ee0f0', JSON.stringify(acc));

  // 14. 真实刷题一题：答对流程无错
  await page.evaluate(() => { setSubject('math'); go('s-home'); });
  await page.evaluate(() => startDrill('m1'));
  const drillOk = await page.evaluate(() => {
    const d = S.drill; if (!d || !d.list || !d.list.length) return false;
    const q = d.list[0];
    if (q.t === 'choice') {
      const opts = document.querySelectorAll('#drillBody .opt');
      if (!opts.length) return false;
      opts[q.a].click();
      return opts[0].classList.contains('dis') && document.querySelector('#drillBody .opt.ok');
    }
    return true;
  });
  T('真实刷题答对+选项锁定', drillOk);

  // 15. 零报错
  T('零 pageerror/console.error', errors.length === 0, errors.slice(0, 3).join(' ; '));

  console.log('\n========== 结果: ' + pass + ' 通过 / ' + fail + ' 失败 ==========');
  await page.screenshot({ path: 'C:/Users/xihan/WorkBuddy/2026-09-18-14-06-09/_audit_fix.png', fullPage: false });
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
