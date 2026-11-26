# Step 0 需求全量对账备忘录（门禁 1 / Gate 1）

- **任务代号**: `post-task-problem-ledger-proofread-gate`
- **立案时间**: `2026-11-26T16:25:00+08:00`
- **适用体系**: `OrbitStack (Pstack-openspec)` — Step 0 Spec-Kit 需求零损耗立案协议

## 1. 原始用户输入（100% 逐字留存 / Fact Fingerprint）
> 在完成任务处理后必须对问题清单进行校对，确保一开始的问题完全被解决（除了经过交互排除的除外）

## 2. 1:1 需求物理对账矩阵 (RTM)

### REQ-01：任务完成后的问题清单终局校对门禁（Post-Task Ledger Proofread）
- **场景故事**：即使任务前确认了问题清单、过程中修复了代码，Agent 在收尾宣布“完成”时，仍可能遗漏最初清单中的某几条问题（修复中途漏改、验证未覆盖或仅修了焦点项）。必须在任务处理完成后增加一道强制校对门禁，对照最开始的完整问题清单逐条核验。
- **详细功能契约**：
  - 在任务处理完成、准备向用户交付收口前，Agent **必须对初始问题清单（`sourceAtomicIds`）执行全量终局校对**：
    1. 每一条初始问题必须达到**已完全解决（`resolved`）**状态并附带实测验证凭据；
    2. 唯一允许未解决的例外情况是：**经过与用户交互确认排除的条目**（即带有用户显式排除/豁免/暂缓裁定依据的 `waived` / `deferred` 条目）；
    3. 任何非交互排除的初始问题若仍处于未解决（如 `pending_ruling`、`approved_fix` 未实测闭环或从清单丢失），**严禁宣布任务完成**，必须阻断收口并列出未闭环条目（`POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED`）。
- **独立验收指标**：
  - 规范与 L2 守卫明确提供任务完成后的终局校对模式（`phase: 'post_task'`），对非交互排除却未达到 `resolved` 的初始问题返回阻断错误并列出未解决 ID。

### REQ-02：纳入 `Pstack-openspec` 全局规范、L2 守卫与自动化反证闭环
- **场景故事**：遵循 poteto 结构化固化原则，将任务后问题清单终局校对门禁下沉至宪法三镜像、`worker.md` 与 `guard:problem-ruling` 自动化校验中，并配备正负向测试反证。
- **详细功能契约**：
  - 以纯通用软件工程语言增补固化至 `GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md`、`worker.md` 与 `README.md`；
  - 在 `scripts/check-problem-ledger-ruling.mjs` 增补任务后终局校对校验能力，并在 `tests/problem-ledger-ruling.test.mjs` 增加对应正负向用例。
- **独立验收指标**：
  - 全部 17 项 `guard:*` 守卫与全部测试套件退出码为 0，并完成全局同步与仓库推送。

## 3. 前瞻性扩展提案清单（供确认）
- **提案 A（交互排除条目显式证据要求）**：任务后校对中，凡以“经过交互排除”豁免的条目，必须同步核验其带有显式用户交互排除依据（`waiverRationale` / `exclusionRationale`），防止 Agent 事后私自补标排除。
- **提案 B（与 Step 5 1:1 双向物理核销表联动）**：在规范中明确规定任务完成汇报必须输出“初始问题清单逐条核销对照表（已解决 + 交互排除 = 100% 初始清单）”。
- **提案 C（一键全局同步与仓库推送）**：完成后执行 `sync-to-global.mjs` 并推送至 `SnowLove0303/Pstack-openspec`。
