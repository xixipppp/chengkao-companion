// 缺口第二批回归：英语2023 Q47 可答 + 阅读短文可渲染 + reading_p4 完整
const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'load' });
  await p.waitForTimeout(1800);

  const r = await p.evaluate(async () => {
    const out = {};
    out.allq = ALLQ.length;
    // Q47 数据
    const q47 = ALLQ.find(q => q.id === 'eng2023p3_047');
    out.q47 = q47 ? { a: q47.a, ans: q47.o[q47.a], hasPassage: !!q47.passage } : null;
    // 短文导出
    out.passKeys = Object.keys(SUBJ_PASSAGES).filter(k => k.startsWith('英语2023'));
    out.p4head = String(SUBJ_PASSAGES['英语2023|reading_p4'] || '').slice(0, 45);

    // 真实路径：英语阅读理解 drill → 找有短文的题 → 渲染
    setSubject('eng');
    startDrill('e4');
    await new Promise(r => setTimeout(r, 400));
    const d = S.drill;
    const idx = d.list.findIndex(q => q.passage && SUBJ_PASSAGES[q.paper + '|' + q.passage]);
    out.foundPassageQ = idx >= 0;
    if (idx >= 0) {
      d.i = idx;
      renderDrill();
      await new Promise(r => setTimeout(r, 300));
      const box = document.querySelector('#drillBody .passbox');
      out.boxRendered = !!box;
      out.boxText = box ? (box.textContent || '').length : 0;
    }
    // 切到 Q47 所在题并作答（若 drill 内包含）
    return out;
  });

  const T = (n, ok, extra) => console.log((ok ? '✅' : '❌') + ' ' + n + (extra !== undefined ? '  → ' + extra : ''));
  T('ALLQ = 2327', r.allq === 2327, r.allq);
  T('Q47 存在且答案=D', !!r.q47 && r.q47.a === 3, r.q47 && r.q47.ans);
  T('Q47 带 passage 字段', !!r.q47 && r.q47.hasPassage);
  T('英语2023 短文 5 篇', r.passKeys.length === 5, r.passKeys.join(','));
  T('reading_p4 首段已补(含 Wildhood)', /Wildhood/.test(r.p4head), r.p4head);
  T('阅读理解 drill 渲染出短文框', r.boxRendered === true, '文本长度=' + r.boxText);

  console.log('pageerrors:', errs.length ? errs : 'NONE');
  await b.close();
  process.exit(0);
})();
