// Phase2 · 知识世界树回归测试
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

  // 1) 页面与结构
  await p.evaluate(() => go('s-tree'));
  const t1 = await p.evaluate(() => ({
    nodes: document.querySelectorAll('#treeWrap .tree-node').length,
    lines: document.querySelectorAll('#treeWrap .branchline').length,
    legend: document.querySelectorAll('#treeLegend .lg').length,
    sum: (document.getElementById('treeSummary') || {}).textContent || '',
    sel: !!document.querySelector('#treeWrap .tree-node.sel')
  }));
  T('16 个模块节点', t1.nodes === 16, 'nodes=' + t1.nodes);
  T('三条科分支', t1.lines === 3);
  T('图例 5 项', t1.legend === 5);
  T('摘要含点亮率', t1.sum.indexOf('点亮率') >= 0);
  T('默认选中节点', t1.sel);

  // 2) 注入进度 → 掌握度档位与文案
  await p.evaluate(() => {
    st.mod = { m1:{c:18,t:20}, m2:{c:9,t:14}, m3:{c:26,t:30}, m4:{c:3,t:6}, m5:{c:0,t:0},
      p1:{c:12,t:18}, p2:{c:5,t:12}, p3:{c:16,t:18}, p4:{c:2,t:5}, p5:{c:0,t:0}, p6:{c:0,t:0},
      e1:{c:8,t:10}, e2:{c:6,t:14}, e3:{c:0,t:0}, e4:{c:14,t:16}, e5:{c:0,t:0} };
    st.wrong = []; save(); renderTree();
  });
  const t2 = await p.evaluate(() => ({
    m3pct: document.querySelector('#treeWrap .tree-node[data-mod="m3"] .npct').textContent,
    m5pct: document.querySelector('#treeWrap .tree-node[data-mod="m5"] .npct').textContent,
    lit: [...document.querySelectorAll('#treeWrap .tree-node')].filter(g => {
      const pct = g.querySelector('.npct').textContent; return pct !== '未刷' && pct !== '0%';
    }).length,
    avg: (document.getElementById('treeSummary').textContent.match(/点亮率 (\d+)%/) || [])[1]
  }));
  T('掌握度计算(m3=93)', t2.m3pct === '93%', t2.m3pct);
  T('未刷节点显示未刷', t2.m5pct === '未刷', t2.m5pct);
  T('已点亮 11/16', t2.lit === 11, 'lit=' + t2.lit);
  T('总点亮率有值', !!t2.avg, t2.avg);

  // 3) 真实点击节点 → 详情面板
  await p.locator('#treeWrap .tree-node[data-mod="m3"]').click();
  const t3 = await p.evaluate(() => {
    const det = document.getElementById('treeDetail').textContent;
    return { det, hasBtn: !!document.querySelector('#treeDetail button') };
  });
  T('详情面板显示积分模块', t3.det.indexOf('积分') >= 0 && t3.det.indexOf('掌握度') >= 0);
  T('详情含操作按钮', t3.hasBtn);

  // 4) 跨科目点击 → 自动切科 + 进入刷题
  await p.evaluate(() => { setSubject('eng'); });
  await p.locator('#treeWrap .tree-node[data-mod="m1"]').click();
  await p.locator('#treeDetail button:has-text("刷这个模块")').click();
  const t4 = await p.evaluate(() => ({
    subj: FILTER.subj, mod: S.drill && S.drill.mod,
    chat: !!document.querySelector('#drillBody .chat'),
    active: document.getElementById('s-drill').classList.contains('active')
  }));
  T('跨科目自动切科', t4.subj === 'math', t4.subj);
  T('进入 m3 刷题且气泡渲染', t4.mod === 'm1' && t4.chat && t4.active, JSON.stringify(t4));

  // 5) 看这模块笔记 → 跳转并自动展开
  await p.evaluate(() => go('s-tree'));
  await p.locator('#treeWrap .tree-node[data-mod="m3"]').click();
  await p.locator('#treeDetail button:has-text("看这模块笔记")').click();
  const t5 = await p.evaluate(() => ({
    page: document.getElementById('s-myNotes').classList.contains('active'),
    subj: MYNOTE_SUBJ,
    expanded: [...document.querySelectorAll('#myNoteList .card')].some(c =>
      [...c.querySelectorAll('.mn-sec')].some(s => s.textContent.indexOf('模块要点') >= 0))
  }));
  T('从树跳笔记并展开', t5.page && t5.subj === 'math' && t5.expanded, JSON.stringify(t5));

  T('零 pageerror/console.error', errs.length === 0, errs.slice(0, 3).join(' ; '));
  console.log('\n========== ' + pass + ' 通过 / ' + fail + ' 失败 ==========');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
