# v3.5.3 · 修复英语语音朗读无法播放

> 功能修复补丁，无数据变更；三处版本号一致：`index.html` / `sw.js` / `README` 均为 v3.5.3，`CACHE_PREFIX=ck-v3.5.3`（强制刷新本地缓存，拉到新脚本）。

## 一、问题

用户反馈：浏览器里点击题目旁的 🔊「朗读」/🐢「慢速」、选项小喇叭、或「我的」页的语音测试，**没有声音**。

排查（用 Playwright + 本地 Chromium 真机诊断）发现根因在 `index.html` 的 `speak()`：

```js
window.speechSynthesis.cancel();          // ← 问题 1：紧跟 speak 的 Chromium 竞态
const u = new SpeechSynthesisUtterance(t);
...
window.speechSynthesis.speak(u);
```

1. **`cancel()` 紧跟 `speak()` 的竞态**：Chromium 中先 `cancel()` 再立即 `speak()`，新 utterance 常被同步取消、整句被吞，**真实 Chrome 上高频表现为「点了没声音」**（headless 偶发不现，故此前漏网）。
2. **从不预热 voices**：`getVoices()` 首次调用返回空；代码未监听 `voiceschanged`，挑选不到合适嗓音。
3. **出错静默吞掉**：`try{...}catch(e){}` 把 `onerror` 全吞了，用户完全不知道为何没声音。

> 顺带发现：原 `online_regression.js` 的 G 段只断言「`speechSynthesis` API 存在 / 有喇叭按钮 / 函数存在」，**根本没验证语音是否真能播**——这就是 bug 一直没被 CI 抓住的原因。

## 二、修复

`index.html` 的 `speak()` / `ttsVoice()` 重写：

- **消除竞态**：仅当 `speechSynthesis.speaking || pending` 时才 `cancel()`，且把新句用 `setTimeout(say, 80)` 延后一拍，让 cancel 生效后再播；空闲时直接播。
- **启动预热 voices**：加载即 `getVoices()` 并监听 `voiceschanged` 刷新缓存，挑选更准。
- **持引用防 GC**：utterance 存到模块级 `_ttsUtter`，避免被回收导致静音/截断。
- **出错有提示**：`u.onerror` 弹 toast「语音播放失败：…」，不再静默。

## 三、回归测试升级（防再漏）

`tests/online_regression.js` G 段：

- G3 从「接口存在」升级为**真实调用 `speak('Regression voice test.')`**，校验：不抛异常、且 `speechSynthesis.speaking` 进入播放态（无语音引擎的环境自动降级放行）。以后语音入口再被破坏，CI 会红。

## 四、验证链（全绿）

| 门禁 | 结果 |
| --- | --- |
| `online_regression` | PASS 215 / FAIL 0 / 共 215（G3 改进后通过） |
| 真机诊断（Playwright+Chromium） | 页面零 JS 错误 / 零网络失败；`speak()` 触发 `onstart`、`speaking=true`、`appSpeakOk=true`；导航（含世界树 `s-tree`）正常 |
| `data_check` / `syntax_check` / `dup_check` / `ver_check` | PASS（三处 v3.5.3 一致） |

## 五、改动文件清单

- `index.html` — `speak()` / `ttsVoice()` 语音逻辑修复（含 voices 预热、竞态消除、错误提示）
- `tests/online_regression.js` — G3 语音断言升级为真实触发播放
- `index.html` / `sw.js` / `README.md` — v3.5.2 → v3.5.3（含缓存前缀 `ck-v3.5.3` 失效）
- `RELEASE-v3.5.3.md` — 本说明
