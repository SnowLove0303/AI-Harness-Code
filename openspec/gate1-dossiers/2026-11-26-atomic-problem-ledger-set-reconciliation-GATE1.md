# Step 0 需求全量对账备忘录（门禁 1 / Gate 1）

- **任务代号**: `atomic-problem-ledger-set-reconciliation`
- **立案时间**: `2026-11-26T16:05:00+08:00`
- **适用体系**: `OrbitStack (Pstack-openspec)` — Step 0 Spec-Kit 需求零损耗立案协议

## 1. 原始用户输入（100% 逐字留存 / Fact Fingerprint）
> 你去github看看别人的思路，参考poteto的思路，结合实际案例，以通用性为基本准则构建优化方案

## 2. 1:1 需求物理对账矩阵 (RTM)

### REQ-01：原子拆条与禁止复合打包（One-Defect-One-ID / SARIF 原子发现模型）
- **场景故事**：在真实多轮审计案例中，Agent 将多个互不相同的原子缺陷捆绑塞入同一编号（如将拓扑规范子项、标点缺失子项、空行子项打包在同一 ID 下），导致用户对其中一项的豁免裁定连带吞掉了同编号下的其他真实缺陷。
- **详细功能契约**：
  - 确立**一缺陷一原子 ID 原则**：任何进入问题台账的记录必须是不可再分的最小原子单元（单一根因、单一位置）；禁止将多个子问题打包在同一个 ID 中或以“子项 1/2/3”合并入账（复合打包条目触发 `BUNDLED_ISSUE_ID_BLOCKED`）；
  - 若上游报告存在多子项，入账时必须拆分为独立原子 ID（如 `ISSUE-04a`、`ISSUE-04b`、`ISSUE-04c`）并各自拥有独立裁定状态。
- **独立验收指标**：
  - 规范与 L2 校验逻辑明确拦截包含多子项/复合描述的打包问题条目，确保每个原子缺陷拥有独立 ID 与独立状态机。

### REQ-02：只增不减的持久化问题台账与“源集 ↔ 当前集”物理集合差值核销（Append-Only + Set-Difference）
- **场景故事**：参考 GitHub `agent-lab-kit`（Append-Only `FINDINGS.md` + `labkit cover`）与 `ECC` 决策台账思路，多轮对话中 Agent 靠记忆重写清单极易在聚焦某一问题后丢失其他条目。必须用只增不减账本和数学集合差值替代口头记忆。
- **详细功能契约**：
  - 在多轮问题交互中，问题清单必须作为**只增不减台账（Append-Only Ledger）**持久化维护，禁止凭记忆重写覆盖；
  - 每次向用户呈报改动方案或写入 OpenSpec 前，必须执行**集合差值核销（Set-Difference Reconciliation）**：
    $$\text{Source\_Atomic\_Set} - (\text{Actionable\_Fix\_Set} \cup \text{Explicit\_Per\_Item\_Waived\_Set}) = \emptyset$$
    任何差集非空（存在失踪条目）即触发 `LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED` 阻断；
  - 任何豁免/保留现状归档必须显式绑定**原子级 ID** 与**对应用户裁定依据**，禁止整包隐式豁免或自行脚注带过。
- **独立验收指标**：
  - 校验函数可精确返回 `missingFromSourceIds` 与 `unruledAtomicIds` 集合差值，非空即返回失败并列出精确漏项 ID。

### REQ-03：纯通用化结构固化与历史真实案例反证（poteto `Encode Lessons in Structure`）
- **场景故事**：遵循 poteto 原则，不靠新增空泛提示词“别漏问题”，而是将上述原子拆条、集合差值核销与逐原子豁免检查下沉为 `Pstack-openspec` 全局规范与 L2 自动化守卫，并用真实历史漏斗案例反证必红。
- **详细功能契约**：
  - 以纯通用软件工程语言将 REQ-01 与 REQ-02 增补固化至 `Pstack-openspec` 三处宪法镜像（`GEMINI.md`、`pstack-openspec`、`ai-harness-openspec`）与 `worker.md`；
  - 升级 L2 静态守卫 `scripts/check-problem-ledger-ruling.mjs`（`npm run guard:problem-ruling`）及 `tests/problem-ledger-ruling.test.mjs`，加入“复合打包 ID 拦截”与“多轮聚焦重写导致原子集差值非零拦截”的必红反证用例。
- **独立验收指标**：
  - 全部 17 项 `guard:*` 守卫与全部测试套件（含新增历史漏斗反证用例）退出码为 0，并完成全局同步与仓库推送。

## 3. 前瞻性扩展提案清单（供确认）
- **提案 A（整包豁免连坐阻断）**：在校验层明确检查“同一父源拆出的兄弟原子 ID（如 `04a`/`04b`）中，仅允许被用户点名豁免的原子 ID 标记为 `waived`，其余兄弟 ID 必须保持 `pending_ruling` 并触发反问”。
- **提案 B（OpenSpec 立案前集合差值前置自检）**：在写入或更新 OpenSpec 变更前，强制通过集合差值核销，杜绝将缩水清单固化进规格文件。
- **提案 C（同步更新 `README.md` 与全局环境）**：同步刷新文档说明与全局配置，确保所有后续线程立即继承该零漏斗防线。
