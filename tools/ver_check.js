#!/usr/bin/env node
/* ver_check.js —— 版本号一致性校验（v3.4.1 新增，CI 门禁）
   背景：APP_VER（index.html）与 CACHE_PREFIX（sw.js）长期靠人肉双处同步，
   漏改任一处会导致「SW 不换版旧缓存复活」或「缓存白清」。
   校验三处同源：
     ① index.html  const APP_VER = 'vX.Y.Z'
     ② sw.js       const CACHE_PREFIX = 'ck-vX.Y.Z'
     ③ README.md   badge/release-vX.Y.Z
   运行：node tools/ver_check.js   退出码：0 一致 / 1 不一致 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function grab(file, re, name) {
  const s = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const m = s.match(re);
  if (!m) { console.log('[FAIL] ' + name + ' 未找到版本号（' + file + '）'); process.exit(1); }
  return m[1];
}

const app = grab('index.html', /const APP_VER = '([^']+)'/, 'APP_VER');
const sw = grab('sw.js', /const CACHE_PREFIX = 'ck-([^']+)'/, 'CACHE_PREFIX');
const rd = grab('README.md', /badge\/release-([^-\)]+)-/, 'README 徽章');

console.log('index.html APP_VER    = ' + app);
console.log('sw.js CACHE_PREFIX    = ' + sw);
console.log('README.md 徽章        = ' + rd);

if (app === sw && sw === rd) {
  console.log('ver_check: PASS（三处一致 ' + app + '）');
  process.exit(0);
}
console.log('ver_check: FAIL（版本号不一致，请三处同步）');
process.exit(1);
