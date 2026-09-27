# v3.4.1 · 质量地基：假测试修复 + 数据校验门禁 + SW 加固 + 安全闭环

> 本轮由「6 模块分片盲审 → 交叉验证 → 共识清单 → 自动执行」全自动流程产出。
> 盲审 6 片共报 48 条，交叉验证复核 P0/P1 全部属实，去重仲裁后落地 19 项共识中的 18 项（1 项需人工吊销旧 Key）。

## P0 · 正确性

| # | 修复 | 说明 |
|---|---|---|
| 1 | **题库答案冲突修正** | `eng26qz1_049`（2026 模拟卷）与 `eng2019_053`（2019 真题）同题不同答，以真题解析定标为 A（原标 B 系错误复制），已改答案+解析。新增 data_check F4 断言此类冲突永久归零。 |
| 2 | **gap2_test 假测试修复** | 6 条断言失败也 `exit(0)` → 补 fail 计数 + 页面错误断言 + 非 0 退出。 |
| 3 | **games_test 假测试修复** | 10 个小游戏冒烟全程零断言 → 补 14 条汇总断言（9 游戏结算 + 抽卡 + 结算面板 + 页面错误）+ 非 0 退出。 |

## P1 · 安全

| # | 修复 | 说明 |
|---|---|---|
| 4 | **存储型 XSS 闭环** | 分步讲解 AI 返回的 `s.x` 未转义直拼 innerHTML（index.html:4056），同函数其他字段均已转义唯独它漏网，已补 `escapeHtml`。 |
| 5 | **`.gitignore` 补安全规则** | 新增 `ai-config.js`（代码注释声称已忽略但实际没有，Key 泄露重演风险）、`.env*`、`*.token`、`node_modules/`、`*.log`。 |
| 6 | **publish.js 密钥扫描** | 待推文件内容命中 `ghp_`/`github_pat_`/`sk-` 模式即拒推（`--allow-secrets` 显式放行）。 |

## P1 · 工程质量

| # | 修复 | 说明 |
|---|---|---|
| 7 | **data_check.js 新门禁** | 题库数据契约校验：F1 可解析导出 / F2 ID 唯一 / F3 答案越界 / F4 同题不同答 / F5 字段完整，挂 CI。堵上 dup_check 不扫 data/*.js 的盲区。 |
| 8 | **ver_check.js 新门禁** | APP_VER（index.html）/ CACHE_PREFIX（sw.js）/ README 徽章三处版本号一致性，挂 CI。 |
| 9 | **online_regression 纳入 CI** | 207 条断言（约占全库九成）此前只能人工本地跑：`channel:'msedge'` 写死改 `TEST_CHANNEL` 可配（CI 自动用 chromium），`TEST_URL` 指本地服务挂入流水线。 |
| 10 | **CI 效率与可观测** | playwright 锁版 1.48.2（package.json）+ 浏览器缓存；失败上传 artifact；单测 `timeout 300` 防死等；服务启动裸 sleep 改轮询 + 内容校验。 |
| 11 | **publish.js 加固** | pre-flight 四件套门禁；脏工作区检出（`--include-dirty` 放行）；多 commit 压扁提示；路径规范化（反斜杠/`..`/绝对路径）；ref 422 自动重取基线重放一次；收尾破坏性 `reset --hard` 建议改 `fetch + merge --ff-only`。 |

## P1 · PWA 与离线

| # | 修复 | 说明 |
|---|---|---|
| 12 | **发版窗口期版本错配修复** | data/*.js 由 cache-first 改 network-first——此前新 HTML 会命中旧前缀缓存里的旧题库 js，用户点「刷新」前一直跑新旧混排。 |
| 13 | **runtime 缓存与版本解耦** | `ck-rt` 固定名，升级只清旧 precache，不再每次发版清掉 27MB 模型/考点图（老用户弱网重下流量）。 |
| 14 | **缓存配额加固** | 全部 `cache.put` 经 `putQuiet()` 吞 QuotaExceeded——此前低端机磁盘满时网络成功的资源也会渲染失败。 |
| 15 | **precache 失败留痕** | 单项失败从静默吞掉改 `console.warn`，缺块可排查。 |
| 16 | **manifest 图标合规** | 原声明 512x512 的 `xue.jpg`/`ziyuan.jpg` 实为 900x1350 竖版立绘（虚报尺寸会被安装性检查判无效），且缺 192 档、maskable 误用满幅立绘。新生成真实 `icon-192.png` / `icon-512.png` / 带 40% 安全区的 `icon-maskable-512.png`。 |

## P2 · 治理

| # | 修复 | 说明 |
|---|---|---|
| 17 | **`.gitattributes` 新增** | `*.js eol=lf` / `*.html eol=crlf` / 二进制标记，防 Windows autocrlf 整文件假 diff（历史曾 4 文件漂移）。 |
| 18 | **LICENSE + 文档回写** | 新增 MIT LICENSE（素材版权单列说明）；README 体积数字 366KB→483KB 回写；隐私章节补「第三方 AI 数据传输告知」。另删孤儿资源 `models/ice.glb`（2.26MB，零引用，MATES 仅 6 角色）。 |

## 题库质量专家会议案（三视角合议，全文见《题库质量专家会议案.md》）

| # | 议案 | 落地 |
|---|---|---|
| 19 | **重复题 42 组数据层标注** | 保留整卷完整 + `src:'mock-copy'`/`ref:真题id` 标注 42 条；🔁 角标改 ref 优先；data_check F6/F7 门禁（ref 悬空、未标注 = FAIL）。 |
| 20 | **mathbank schema 固化** | 360 题固化 `subj:'math'`+`mod` 中文名（m1-m5 权威映射），运行时补丁退役；fill 题 ans 双轨契约化不改。 |
| 21 | **高数二大纲乱码修复** | 18 个 U+FFFD 归零：两个重要极限、第二换元法（√(a²−x²) 三角代换）按大纲标准文本恢复。 |
| 22 | **img 条目契约** | data_check F8：kind:img 无图 = FAIL（11 条现状健康、图片零缺失）。 |
| 23 | **宣称口径诚实化** | README：2327 题（含模拟卷复用真题 84 题）。hint/难度/考点标签规则回填经议案评估后列入下轮（留白优于造假）。 |

## 待人工处理（无法自动化）

- ⚠️ **旧硅基流动 API Key 吊销**：v3.0.0 前硬编码的 Key 仍存在于 git 历史。请到硅基流动控制台吊销旧 Key（唯一彻底手段），吊销后再考虑 filter-repo 清历史 + force push（破坏性操作，需单独决策）。

## 下轮 backlog（本轮 P2 延期项）

- `save()` 答题路径每题 2-3 次全量序列化写盘 → 防抖/批量落盘
- 题库字段（sol/hint/o）渲染全面转义（供应链 XSS 面）
- 首屏 1.15MB 题库同步加载 → boot 门控重构后再 defer
- kaodian「高数二考试大纲」U+FFFD 乱码修复（重跑 PDF 提取）
- 难度/考点标签回填（支撑宣称的「考点 ROI 择题」）
- prefetchBanks 强制兜底与 setInterval 计时器精度
- 28 组完全重复题标注 src 关系
