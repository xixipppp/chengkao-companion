# RELEASE v3.4.2 · 效率与体验纵深（backlog 清零轮）

承接 v3.4.1「质量地基」，本轮清零其 P2 延期 backlog 中的 4 项（另 2 项评估后改判），全部走「议案 → 脚本迁移 → 门禁防回潮 → 回归验证」链路。

## 修复清单

| # | 修复 | 说明 |
|---|---|---|
| 1 | **save() 防抖批量落盘** | 新增 `saveSoon()`（600ms 尾沿合并）+ `saveFlush()`（pagehide / beforeunload / visibilitychange:hidden 强制落盘）。答题热路径 14 处转换（addXp / addAff / dqOnAnswer / recordAnswer 链 / rush·steps·变式·AI 统计），单题全量序列化写盘 3-4 次 → 合并为 ≤1 次。结构性操作（清空错题/导出/笔记/存档）仍走同步 save()，不丢数据。 |
| 2 | **题库字段渲染全面转义** | 16 处 innerHTML 注入点闭环：q.q / q.o / q.sol / q.hint / ansText(q) 全部 escapeHtml（drill 解析、mock 回顾、rush/boss/mine/chat/order 小游戏、AI steps、coach hint）。数据层实测零 HTML 标签零危险模式，转义无渲染副作用；data_check 新增 **F9**（字段含 script/事件/js协议 = FAIL，含 HTML 标签 = WARN）双保险防回潮。 |
| 3 | **diff 难度档 + hint 规则回填**（议案议题4） | `diff` 回填 2261 题（math 模块档 m1/m5=1、m2/m3=2、m4=3；pol 默认 2 / 否定式题干 3；eng 补全对话 1 / 阅读 2；fill 一律 3），分布 易/中/难 = 156/1920/185；内置 66 题 ALLQ 聚合同规则补齐。`hint` 空值率 **59.9% → 0%**：1355 题回填所属模块 ds（教研已审定文案，零编造零泄露）；顺手修复既有数据 pol2016_017 hint 剧透答案。data_check 新增 **F10**（diff 越界 / hint 泄露 = FAIL）。 |
| 4 | **计时器时间戳化** | gqTimed 快答管线（游戏 1/3）与 gameRush 60 秒全局预算由「interval 递减」改「Date.now() 差值锚定」——后台标签页 setInterval 被节流时倒计时不再冻结，切后台刷题不能偷时间。mockTick 原本已是时间戳法，无需改。 |
| 5 | **prefetchBanks 兜底加固** | ensureBank 修复「脚本 200 但全局未定义时 promise 缓存被毒化、永远返回 false」的隐蔽 bug（现在清缓存允许重试）；prefetch 失败 3s 退避重试一次，仍失败由各视图按需 ensureBank 兜底。 |

## 评估后改判（不做及理由）

| 项 | 裁决 |
|---|---|
| kp 考点标签回填 | **延期**：全库消费端为 0，「留白优于造假」，待有消费端（难度/考点筛选 UI）时一并做。 |
| 首屏 1.15MB 题库 boot 门控重构 | **再延期**：跨 script 顶层 const 引用，defer 门控会全断，需独立 boot 重构轮，不与数据迁移同发。 |

## 验证

- 四件套门禁全绿：syntax_check / dup_check / ver_check（v3.4.2 三处一致）/ data_check（26 项 OK，F1-F10 全过，仅 1 项已知 WARN：mathbank 模拟卷间互重 1 组保留观察）。
- 浏览器冒烟：ALLQ=2327 不变、零页面错误、diff 聚合补齐生效。
- playwright 回归套件本地全过后推送；CI（含 online_regression 215 断言）护航。

## 待人工处理（沿自 v3.4.1）

- ⚠️ 旧硅基流动 API Key 吊销（git 历史残留，唯一彻底手段是到控制台吊销）。
