/* 2.8 Service Worker —— 让「离线可用」名副其实
   缓存策略三层（AI 工程专家建议）：
     ① precache（安装时一次性）：index.html + 4 个题库 + 启动画面 + 6 张立绘 + 应用图标，约 4.7MB
        （离线实测补入 assets/heroine.jpg——它是开机启动画面，原来只有它能被断网漏掉；
         assets/kaodian/ 171 张 webp 共 13MB 属运行期按需缓存，**绝不 precache**）
     ② runtime cache-first：vendor/ 与 models/*.glb —— 13MB 模型**绝不 precache**，
        首次真正用到才写缓存，避免低端机直接 QuotaExceeded
     ③ HTML network-first：保证发版能被拿到，离线时回落缓存
   更新提示：install 阶段**不** skipWaiting（否则会打断正在使用的旧页面）；
     页面侧检测到 waiting worker 后显示「新版本已就绪 · 刷新」，用户点击才 postMessage SKIP_WAITING。
   红线 R7：Cache Storage 与 localStorage 是两个池子，这里只碰 Cache Storage。
   v3.4.1 加固：
     - data/*.js 由 cache-first 改 network-first（修复发版窗口期「新 HTML + 旧题库」版本错配）；
     - runtime 缓存名与版本解耦（ck-rt 固定），升级不再清掉 27MB 模型/考点图；
     - cache.put 全部吞配额异常（QuotaExceeded 不再让网络成功的资源渲染失败）；
     - precache 单项失败从静默改 console.warn，便于排查缺块。 */
const CACHE_PREFIX = 'ck-v3.7.0';
const PRECACHE = CACHE_PREFIX + '-pre';
const RUNTIME = 'ck-rt';   // 与版本解耦：升级只清旧 precache，保留运行期缓存

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './data/subjectbank.js',
  './data/mathbank.js',
  './data/kaodian.js',
  './data/goldpoints.js',
  './data/anim2d.js',          // v3.5.0 · 2D 动画讲解引擎（按需加载，断网也要能播）
  './assets/heroine.jpg',
  './assets/xue.jpg',
  './assets/luo.jpg',
  './assets/cheng.jpg',
  './assets/qing.jpg',
  './assets/ziyuan.jpg',
  './assets/ye.jpg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

function putQuiet(cache, req, res){
  /* 配额满（低端机磁盘紧张）时静默放弃写缓存，绝不能让网络成功的响应因 put 抛错而渲染失败 */
  try { const p = cache.put(req, res); if (p && p.catch) p.catch(() => {}); } catch (e) {}
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE);
    // 逐个 add：任何单个资源失败（例如题库改名）都不能让整个安装失败，但要留痕
    await Promise.all(PRECACHE_URLS.map(u => cache.add(u).catch(err => {
      try { console.warn('[sw] precache 失败：' + u, err); } catch (e) {}
    })));
    // 不调用 skipWaiting：等页面提示用户刷新
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // 只清「旧版本前缀」的缓存（含历史版本号命名的 -rt），保留固定名的 ck-rt
    await Promise.all(keys
      .filter(k => k !== RUNTIME && k.indexOf(CACHE_PREFIX) !== 0)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isRuntimeAsset(url){
  return url.pathname.indexOf('/vendor/') >= 0 || /\/models\/.*\.(glb|gltf)$/i.test(url.pathname)
      || /\.(png|jpg|jpeg|webp|svg|woff2?)$/i.test(url.pathname);
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;          // 跨域（含 AI 接口）一律直连，不介入

  // ③ HTML：network-first，离线回落缓存
  const isHTML = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
  if (isHTML) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(PRECACHE);
        putQuiet(cache, req, fresh.clone());
        return fresh;
      } catch (e) {
        const hit = await caches.match(req) || await caches.match('./index.html');
        if (hit) return hit;
        throw e;
      }
    })());
    return;
  }

  // ② 大体积运行期资源：cache-first，按需写入
  if (isRuntimeAsset(url)) {
    event.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.status === 200 && res.type === 'basic') {
          const cache = await caches.open(RUNTIME);
          putQuiet(cache, req, res.clone());
        }
        return res;
      } catch (e) {
        const again = await caches.match(req);
        if (again) return again;
        throw e;
      }
    })());
    return;
  }

  // ④ data/*.js 题库：与 HTML 同版本耦合 → network-first（修发版窗口期新旧错配），离线回落缓存
  if (url.pathname.indexOf('/data/') === 0 || url.pathname.indexOf('/data/') > 0) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.status === 200 && fresh.type === 'basic') {
          const cache = await caches.open(PRECACHE);
          putQuiet(cache, req, fresh.clone());
        }
        return fresh;
      } catch (e) {
        const hit = await caches.match(req);
        if (hit) return hit;
        throw e;
      }
    })());
    return;
  }

  // 其余：先缓存，未命中再网络
  event.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') {
        const cache = await caches.open(PRECACHE);
        putQuiet(cache, req, res.clone());
      }
      return res;
    } catch (e) {
      const again = await caches.match(req);
      if (again) return again;
      throw e;
    }
  })());
});
