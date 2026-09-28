// v3.5.0 · 把 Anim2D 讲解动画离线渲染成真实 MP4（playwright 逐帧 + ffmpeg 合成）
// 用途：发布前人工验片 / 发版说明里贴样例；线上 App 内仍是实时 canvas 播放，不需要这些文件。
// 用法：node tools/render_anim2d.js [fps] [id1,id2,id3]
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');

const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if(!fs.existsSync(p) || fs.statSync(p).isDirectory()){ res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});

const FPS = parseInt(process.argv[2], 10) || 20;
const IDS = (process.argv[3] || 'mat26qz1_001,pol26qz1_001,eng26qz1_001').split(',');
const OUT = path.join(ROOT, 'tests', '_anim2d_out');

(async () => {
  await new Promise(r => server.listen(8901, r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 480, height: 960 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('http://localhost:8901/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => window.SUBJ_BANK && window.MATH_BANK, null, { timeout: 30000 });
  // anim2d.js 在 App 里是按需异步加载的（不占首屏），离线渲染这里手动注入
  await page.addScriptTag({ path: path.join(ROOT, 'data', 'anim2d.js') });
  const hasEngine = await page.evaluate(() => !!(window.Anim2D && window.Anim2D.build));
  if(!hasEngine){ console.log('ERR：anim2d.js 注入失败'); await browser.close(); server.close(); process.exit(1); }

  fs.mkdirSync(OUT, { recursive: true });
  const made = [];
  for(const id of IDS){
    const meta = await page.evaluate(qid => {
      const q = (window.SUBJ_BANK || []).concat(window.MATH_BANK || []).find(x => x.id === qid);
      if(!q) return null;
      const sp = window.Anim2D.build(q);
      window.__sp = sp;
      window.__cv = window.__cv || (function(){ const c = document.createElement('canvas'); c.width = 1080; c.height = 1920; return c; })();
      window.__ctx = window.__cv.getContext('2d');
      return { total: sp.total, scenes: sp.scenes.map(s => s.id), subj: sp.subj, caps: sp.caps.length };
    }, id);
    if(!meta){ console.log('找不到题目：' + id); continue; }
    const n = Math.ceil(meta.total * FPS);
    const dir = path.join(OUT, id);
    // 帧名定长且逐帧覆盖，不需要清空目录（避免批量删除）
    fs.mkdirSync(dir, { recursive: true });
    console.log('渲染 ' + id + ' (' + meta.subj + ') ' + n + ' 帧 @' + FPS + 'fps，成片 ' + meta.total.toFixed(1) + 's …');
    const B = 25;
    for(let s = 0; s < n; s += B){
      const batch = await page.evaluate(({ s, B, n, fps }) => {
        const out = [];
        for(let i = s; i < Math.min(s + B, n); i++){
          window.Anim2D.renderFrame(window.__ctx, window.__sp, i / fps);
          out.push(window.__cv.toDataURL('image/jpeg', 0.85));
        }
        return out;
      }, { s, B, n, fps: FPS });
      batch.forEach((d, k) => {
        fs.writeFileSync(path.join(dir, String(s + k).padStart(5, '0') + '.jpg'),
          Buffer.from(d.split(',')[1], 'base64'));
      });
    }
    made.push({ id, dir, total: meta.total, scenes: meta.scenes.join(','), caps: meta.caps });
  }
  await browser.close(); server.close();
  console.log('页面 JS 错误：' + errs.length + (errs.length ? ' → ' + errs.slice(0, 3).join(' | ') : ''));
  // 首帧另存为封面图，便于人工目视
  made.forEach(m => {
    fs.copyFileSync(path.join(m.dir, '00000.jpg'), path.join(OUT, 'cover_' + m.id + '.jpg'));
  });
  console.log(JSON.stringify(made, null, 2));
  console.log('FRAMES_DIR=' + OUT);
})().catch(e => { console.error('ERR', e); try{ server.close(); }catch(_){} process.exit(1); });
