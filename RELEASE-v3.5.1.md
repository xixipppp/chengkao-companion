# v3.5.1 · 仓库优化（数据补全 + 本地清理）

> 纯优化补丁，无功能变更；三处版本号一致：`index.html` / `sw.js` / `README` 均为 v3.5.1，`CACHE_PREFIX=ck-v3.5.1`（强制刷新本地缓存，拉到新数据）。

## 一、内容优化：补 eng2019 真题原文缺口

- **问题**：`eng2019` 整卷 60 题 `passage` 字段全空，用户刷 2019 年真题时看不到阅读原文。
- **修复**：v3.4.5 已确认「模拟二 Passage Three == 2019 真题」且题干/官方答案 4/4 一致；该原文（`英语2026全真模拟（二）|reading_3`，Alan Lakein「doing nothing」时间管理篇，1668 字）现同步挂到 `英语2019|reading_3`，并把 `eng2019_048~051` 的 `passage` 由空设为 `reading_3`。
- **验证**：`data_check` F11 passage 可解析率 **379/379 → 383/383（100%）**；其余 11 项门禁全 PASS。
- **已知剩余缺口**：`eng2019` 其余 4 篇阅读 + 完形原文仍缺源素材，暂未补（无对应文本来源）。

## 二、仓库卫生：清理本地 193MB 测试产物

- 删除 `tests/_anim2d_out/`（191MB，2D 动画逐帧渲染产物）与 `tests/_*.png`（测试截图）—— 二者均已被 `.gitignore` 排除、不入库、可随时由测试/工具重生成，纯属本地磁盘占用。
- 效果：仓库工作目录 `tests/` 由 **192MB → 200KB**。

## 三、验证链（全绿）

| 门禁 | 结果 |
| --- | --- |
| `data_check` | PASS（WARN 2：1 组模拟卷互重保留观察 / F11 缺 0 篇） |
| `ver_check` | PASS（三处 v3.5.1 一致） |
| `syntax_check` | PASS（4 个内联脚本） |
| `dup_check` | PASS（重名 0 / 悬空 0） |

## 四、改动文件清单

- `data/subjectbank.js` — 新增 `英语2019|reading_3` 原文键；`eng2019_048~051` 挂 `passage`
- `index.html` / `sw.js` / `README.md` — v3.5.0 → v3.5.1（含缓存前缀失效）
- `RELEASE-v3.5.1.md` — 本说明
