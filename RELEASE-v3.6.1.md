# v3.6.1 — 修复首次点「朗读」弹「朗读失败：interrupted」

## 根因
v3.6.0 的「首手势预热」代码在朗读一句静音预热句后，设置了 60ms 的 `speechSynthesis.cancel()` 定时器。用户点「朗读」时：`pointerdown` 先触发预热 → `click` 紧接着开始正式朗读 → 60ms 定时器一到把正式朗读掐死，`onerror` 抛 `interrupted` 并弹「朗读失败：interrupted」。**首次点朗读必现**。

## 修复（3 处）
1. **去掉预热后的定时 `cancel()`** —— 预热句 volume=0 且只有一个空格，会立即自然结束，无需强杀。
2. **`speak()` cancel→speak 错拍** —— 有语音在播时，`cancel()` 后延后 80ms 再播（安卓 X5/部分 WebView 同拍 cancel→speak 会把新句打成 interrupted）。
3. **`onerror` 对 `interrupted/canceled` 静音** —— 主动点「停止」或重读时的取消不再误弹失败提示。

## 顺带修复
- `tests/online_regression.js` V13 夹具时间敏感缺陷：原写死 `start:'00:10'`，凌晨 00:00–00:40 跑测试时该块还是未来块，语义翻转导致假失败；改为相对当前时间推算（已过块 = 完全结束的块）。

## 验证
- 本地 `audio_smoke` 15/15
- 本地 `online_regression` 219/219（含修复后的 V13）

## 其他
- `APP_VER = 'v3.6.1'`，缓存前缀 `ck-v3.6.1`（强制刷新旧缓存）。
