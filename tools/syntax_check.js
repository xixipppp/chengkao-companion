/* 语法自检：抽取 index.html 内联 <script> 块，逐个用 new Function 解析（只解析不执行） */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, i = 0, bad = 0;
while ((m = re.exec(html))) {
  i++;
  const code = m[1];
  const line = html.slice(0, m.index).split('\n').length;
  if(/\btype\s*=\s*["']module["']/i.test(m[0])){
    console.log('[SKIP] ' + i + ' (起于第 ' + line + ' 行, module 脚本，跳过)');
    continue;
  }
  try {
    new Function(code);
    console.log('[OK]  ' + i + ' (起于第 ' + line + ' 行, ' + code.length + ' 字符)');
  } catch (e) {
    bad++;
    console.log('[ERR] ' + i + ' (起于第 ' + line + ' 行): ' + e.message);
  }
}
console.log(bad ? ('\n共 ' + i + ' 个内联脚本，' + bad + ' 个存在语法错误') : ('\n共 ' + i + ' 个内联脚本，全部通过语法检查'));
process.exit(bad ? 1 : 0);
