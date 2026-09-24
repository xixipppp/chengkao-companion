// Phase2 · 自动笔记（规则版）回归测试
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 900 } });
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 140)); });
  await p.goto('http://127.0.0.1:8900/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, { timeout: 15000 });

  let pass = 0, fail = 0;
  const T = (name, ok, extra) => { ok ? pass++ : fail++; console.log((ok ? '[PASS] ' : '[FAIL] ') + name + (extra ? ' :: ' + extra : '')); };

  // 注入进度 + 错题（真实题 id，保证笔记易错区有内容）
  await p.evaluate(() => {
    st.mod = { m1:{c:18,t:20}, m2:{c:9,t:14}, m3:{c:26,t:30}, m4:{c:3,t:6}, m5:{c:0,t:0},
      p1:{c:12,t:18}, p2:{c:5,t:12}, p3:{c:16,t:18}, p4:{c:2,t:5}, p5:{c:0,t:0}, p6:{c:0,t:0},
      e1:{c:8,t:10}, e2:{c:6,t:14}, e3:{c:0,t:0}, e4:{c:14,t:16}, e5:{c:0,t:0} };
    st.wrong = [];
    ALLQ.filter(q => q.m === 'm2' && q.t === 'choice').slice(0, 3).forEach(q =>
      st.wrong.push({id: q.id, q: q.q, a: q.o[q.a], m: 'm2', srs: {stage: 0, due: Date.now() + 864e5}}));
    save();
  });

  // 1) 三科 tab 卡片数
  await p.evaluate(() => { MYNOTE_SUBJ = 'math'; go('s-myNotes'); });
  const n1 = await p.evaluate(() => document.querySelectorAll('#myNoteList .card').length);
  T('高数 5 个模块卡', n1 === 5, 'n=' + n1);
  await p.evaluate(() => myNoteTab('pol'));
  const n2 = await p.evaluate(() => document.querySelectorAll('#myNoteList .card').length);
  T('政治 6 个模块卡', n2 === 6, 'n=' + n2);
  await p.evaluate(() => myNoteTab('eng'));
  const n3 = await p.evaluate(() => document.querySelectorAll('#myNoteList .card').length);
  T('英语 5 个模块卡', n3 === 5, 'n=' + n3);

  // 2) 展开卡片 → 三大区块 + 解析折叠
  await p.evaluate(() => myNoteTab('math'));
  await p.locator('#myNoteList .mn-top').nth(1).click(); // m2 微分（有错题）
  const t2 = await p.evaluate(() => {
    const secs = [...document.querySelectorAll('#myNoteList .mn-sec')].map(s => s.querySelector('.h').textContent);
    return {
     要点: secs.some(s => s.indexOf('模块要点') >= 0),
      易错: secs.some(s => s.indexOf('我的易错') >= 0 && s.indexOf('3 题') >= 0),
      必刷: secs.some(s => s.indexOf('精选必刷') >= 0),
      tags: document.querySelectorAll('#myNoteList .tag').length,
      wrongItems: document.querySelectorAll('#myNoteList .mn-item .wa').length
    };
  });
  T('要点/易错/必刷三区块', t2.要点 && t2.易错 && t2.必刷, JSON.stringify(t2));
  T('标签渲染', t2.tags >= 2);
  T('易错题带正确答案', t2.wrongItems >= 3);

  // 3) 展开解析折叠交互
  const t3 = await p.evaluate(() => {
    const btn = [...document.querySelectorAll('#myNoteList button')].find(x => x.textContent.indexOf('展开解析') >= 0);
    if (!btn) return { has: false };
    btn.click();
    const sol = btn.parentElement.querySelector('.mn-sol');
    const opened = sol && sol.style.display === 'block' && sol.textContent.length > 5;
    btn.click();
    return { has: true, opened, closed: sol.style.display === 'none' };
  });
  T('解析展开/收起', t3.has && t3.opened && t3.closed, JSON.stringify(t3));

  // 4) 关键词搜索过滤
  await p.evaluate(() => { myNoteTab('math'); });
  await p.fill('#myNoteSearch', '洛必达');
  const t4 = await p.evaluate(() => ({
    n: document.querySelectorAll('#myNoteList .card').length,
    hit: document.getElementById('myNoteList').textContent.indexOf('洛必达') >= 0
  }));
  T('搜索过滤(洛必达→极限)', t4.n === 1 && t4.hit, JSON.stringify(t4));

  // 5) 复制按钮存在且点击无异常
  const t5 = await p.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(x => x.textContent.indexOf('复制本页笔记') >= 0);
    if (!btn) return { has: false };
    btn.click(); return { has: true };
  });
  T('复制按钮可用', t5.has === true);

  // 6) 入口存在（自习室两枚新按钮）
  const t6 = await p.evaluate(() => {
    go('s-study');
    const txt = document.getElementById('s-study').textContent;
    return { tree: txt.indexOf('知识世界树') >= 0, note: txt.indexOf('我的笔记') >= 0 };
  });
  T('自习室入口齐备', t6.tree && t6.note);

  T('零 pageerror/console.error', errs.length === 0, errs.slice(0, 3).join(' ; '));
  console.log('\n========== ' + pass + ' 通过 / ' + fail + ' 失败 ==========');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
