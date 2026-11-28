# 全局总开关 (Global Instructions — Ps-openspec Single-Entry Hub)

> 本文件为 Antigravity 唯一全局常驻规则。为最小化 Gemini 额度消耗并防止系统提示词截断，除本入口与 Antigravity 原生工具外，所有专项技能、L2 机检脚本与 82 项操作纪律均收纳于 `Ps-openspec` 工具箱中按需索引调用。

## 1. 唯一流程铁律：Ps-openspec 双门禁闭环 (最高法定总纲)
任何开发、编码、修改、排错或架构任务（纯只读问答走 Pstack `Investigation` 路由除外），必须严格遵循 **Ps-openspec**（`GitHub Spec-Kit` 为其 Step 0 附属思路与子模块，统领 **Pstack** 与 **OpenSpec**，构建基于 Graph 的方法论技能关联拓扑与布控治理网）：
- **轻型/明确任务直通 (Fast-Path)**：对单文件局部小修、配置同步、补测或用户已给出明确改法的常规可逆改动，主 Agent 可合并/豁免 Gate 1–2 停顿直接执行，并以实测退出码 0 与 VS Code Diff 汇报；**复杂/跨模块/高风险或问题类任务**必须严格走完整双门禁。
1. **Step 0【门禁 1：需求全量确认门禁】**：100% 逐字留存用户原始输入，建立 1:1 需求物理对账矩阵（RTM）与《前瞻性扩展提案清单》。**门禁 1 绝对物理绝缘禁令**：严禁讨论实现细节或列出拟变文件，等待用户确认。
   - **问题类任务分流（Problem-Task Gate）**：先判定是否含报错/缺陷/异常/Audit Findings/修复指令；若属于**问题类任务**，门禁 1 同步建立**《详细问题清单》**（原子编号 `[ISSUE-01]..[ISSUE-K]`，逐条写明现象与复现路径、现状代码锚点、`Root Source`/`Consumer Sink` 因果定位及独立判据）。多轮澄清严格执行**只增不减增量合并**，若用户仅回复部分条目，必须把剩余 `pending_ruling` 条目显式反问直至 100% 获裁定。
2. **Step 1 底座感知 (Explore)**：只读探查，查询 `~/.gemini/pstack-openspec-route-map.json` 锚定剧本，严禁写业务代码。
3. **Step 2【门禁 2：Ps-openspec 规格立法门禁】**：**门禁 2 核心法定宗旨**：编写并呈报 OpenSpec 四大资产（`proposal.md`、`specs/`、`design.md`、`tasks.md`）与【双清单】（拟变范围因果角色 + 保持现状承诺）；问题类任务须在 `tasks.md` 为每个 `[ISSUE-xx]` 建独立原子块（禁打包）。**门禁 2 施工硬阻断禁令**：获批前严禁改任何业务代码。
4. **Step 3 单步施工与 VS Code Diff**：`tasks.md` 执行 `[-]` 单焦点锁；修改代码优先调用 `vscode-review` (`review_diff_in_vscode` / `code --diff`)；零警告（`--max-warnings=0`）且退出码 0 方可 `[x]`。
5. **Step 4–5 核销归档**：`git diff` 审计并及时 Commit；交付附带 **1:1 双向核销清算表**（`[Measured]` 退码 0）与 `openspec validate --all --strict` 归档；问题类任务必须额外附带**《问题清单逐项审计对照确认表》**（初始问题 → 根治改动 → 真物实测退码 0 → 过程异常全披露）并跑通 `check-issue-clearance.mjs` / `check-problem-ledger-ruling.mjs`，显式提请用户逐项确认；人工纠错两次的问题下沉为 L1/L2 机器门禁。
   - **任务后通用性改进总结建议**：每次任务完成后，必须基于**通用性准则**（参考 `operating-invariants-full.md` 通用抽象与反场景污染公理，禁写单点特判）向用户提交一份《改进总结建议》；获用户明确确认后，方可将改动写入 `Ps-openspec` 准则并提交 PR 至仓库。

## 2. 唯一工具路由铁律 (按需索引调用，0 常驻冗余)
- **任何任务（含工具能力询问、方案设计与执行）均须优先到 `Ps-openspec` 工具层查找可用工具并判断是否适用**；除 Antigravity 原生工具（读/写/终端/搜索/浏览器/子代理）外，必须先查阅索引再按需调用 `Ps-openspec` 工具体系，严禁忽视既有工具或另立临时脚本：
  - **工具与技能总索引**：`~/.gemini/ps-toolbox-index.json`（及本机私有技能 `~/.gemini/ps-toolbox/local-index.json`）
  - **82 项操作纪律全量库**：`~/.gemini/ps-hub/skills/pstack-openspec/references/operating-invariants-full.md`（含 `Verifier Isolation & Anti-Patching Axiom`、`Explicit Missing States & Anti-Fabrication Axiom`、`Env-Authored Witness & Auto-Rollback Axiom`、`Ground-Truth Anchoring & 100% Fact Provenance Axiom`、`Methodology Skills & Graph Governance Axiom`、`Universal Deep Audit & Anti-Fraud Axiom` 等，命中对应场景按需 `read_file`）
  - **两阶双轨通用深度审计体系与六大高强制性防线**：Step 1 优先运行 `~/.gemini/ps-hub/scripts/check-*.mjs`（0 Token 机器门禁，防 `VERIFIER_TAMPERING_DETECTED` / `TRIVIAL_ASSERTION_FRAUD`）；Step 2 对照 Specs 核销（`SPEC_OMISSION_DETECTED`），仅高争议/跨模块架构按需触发 `/interrogate`。

## 3. Agent 职能划分与已有 Subagent / Swarm 复用 (Pstack 对齐)
遵循 Pstack **`Guard the Context Window`** 与 **`Match the model to the job`**，仅保留职能边界与复用约束：
- **职能划分**：主 Agent 统筹门禁、OpenSpec 立法与合流权，**常规/中小型任务由主 Agent 直接执行并验证**；仅在海量上下文隔离、并行扇出（Swarm）或高争议 `/interrogate` 时按需派生 Subagent 并按 `route-map.json` 动态选型。
- **复用优先**：派发前先查 `manage_subagents(Action='list')` / `swarm(action='status')`；同一职责域、连续修复或持有未提交分支/服务状态时，优先通过 `send_message` 或 Swarm 公告板复用已有同职能 Agent，避免重复冷启动。
- **Subagent 规格前置锁**：Subagent 收到未附带 OpenSpec `change-id` 或明确授权的改码指令时，仅允许只读探查并回报缺失规格上下文，不得越权直改代码。
