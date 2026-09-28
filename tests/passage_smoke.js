// 冒烟：v3.4.5 英语全真模拟卷原文补录后，UI 侧 passageOf / passageBox 取用正确
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');

const ROOT = __dirname + '/..';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.glb': 'model/gltf-binary', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp3': 'audio/mpeg' };

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(8899, r));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('http://localhost:8899/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => window.SUBJ_BANK && window.SUBJ_BANK.length > 100, null, { timeout: 20000 });

  const r = await page.evaluate(() => {
    const out = { total: 0, hit: 0, miss: [], lens: {}, boxMissing: [], boxOk: 0 };
    ['一', '二', '三', '四', '五', '六'].forEach(n => {
      const paper = '英语2026全真模拟（' + n + '）';
      ['cloze_1', 'reading_1', 'reading_2', 'reading_3', 'reading_4', 'reading_5'].forEach(pid => {
        const q = window.SUBJ_BANK.find(x => x.paper === paper && x.passage === pid);
        if (!q) return;                       // 该卷无此题（模拟二缺 44-47）
        out.total++;
        const t = passageOf(q);
        if (t && String(t).length > 50) { out.hit++; out.lens[paper + '|' + pid] = String(t).length; }
        else out.miss.push(paper + '|' + pid);
        // 渲染层
        const box = passageBox(q);
        if (box && box.className.indexOf('missing') >= 0) out.boxMissing.push(paper + '|' + pid);
        else if (box) out.boxOk++;
      });
    });
    // 原文完整性抽样：完形空格编号
    const cq = window.SUBJ_BANK.find(x => x.paper === '英语2026全真模拟（四）' && x.passage === 'cloze_1');
    const ct = passageOf(cq) || '';
    out.cloze4HasAllBlanks = [];
    for (let i = 21; i <= 35; i++) if (!new RegExp('(^|\\D)' + i + '(\\D|$)').test(ct)) out.cloze4HasAllBlanks.push(i);
    out.cloze4Head = ct.slice(0, 60);
    out.ver = (document.getElementById('verTag') || {}).textContent || window.APP_VER || '?';
    return out;
  });

  console.log('题目(带passage引用)总数:', r.total);
  console.log('取到原文:', r.hit, '| 解析率:', (r.hit / r.total * 100).toFixed(1) + '%');
  console.log('缺原文:', r.miss.length ? r.miss.join(', ') : '无');
  console.log('渲染 passbox 正常:', r.boxOk, '| 降级提示(missing):', r.boxMissing.length ? r.boxMissing.join(', ') : '无');
  console.log('模拟四完形空格编号缺失:', r.cloze4HasAllBlanks.length ? r.cloze4HasAllBlanks.join(',') : '无');
  console.log('模拟四完形开头:', r.cloze4Head);
  console.log('页面版本:', r.ver);
  console.log('运行期 JS 错误:', errs.length, errs.slice(0, 3).join(' | '));

  const ok = r.hit === 36 && r.miss.length === 0 && r.boxMissing.length === 0
    && errs.length === 0 && r.cloze4HasAllBlanks.length === 0;
  console.log(ok ? '\n冒烟: PASS' : '\n冒烟: FAIL');
  await browser.close(); server.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('ERR', e); server.close(); process.exit(1); });
