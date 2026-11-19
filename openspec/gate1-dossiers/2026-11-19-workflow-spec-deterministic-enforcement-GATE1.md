# 需求全量追溯备忘录 (Gate 1 Intent Dossier)

> **任务标识**: `2026-11-19-workflow-spec-deterministic-enforcement`
> **法定阶段**: Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1 Detailed Brief)
> **法定公理依据**: 
> - Axiom 28: `MANDATORY_USER_SPECIFICATION_INGESTION_&_ACTIVE_POST_TASK_AGENT_AUDIT_AXIOM`
> - Axiom 50: `GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM`
> - Axiom 51: `PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM`
> - Axiom 63: `PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM`
> - Axiom 64: `PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM`

---

## 板块一：管理者的任务说明原文 100% 逐字镜像与事实指纹

### 1.1 原始用户指令逐字归仓 (Verbatim User Prompt)

```text
核心问题，目前工作流的开发，或是程序的开发，很多情况下Agent 都是用MD来定义规范和审计内容以及一些细节等等，比如当工作流执行时，如果Agent漏掉了这些细节，就会导致出错，你需要去github 找关于这方面的高星管控方案
```

### 1.2 事实指纹实体哈希冻结 (Fact Fingerprint Digest)
- **Hash 算法**: `SHA-256`
- **指纹摘要**: `316c25a4eb8b3cdc04d883877ccb8d4b381b885e8470720d57b0de0de7b8538d`
- **封印状态**: 🔒 已锁定不可篡改，作为全生命周期 1:1 双向物理核销的基准原点。

---

## 板块二：法医级第一门禁反馈与 1:1 需求物理对账矩阵 (RTM)

### 2.1 需求全量物理对账矩阵 (Requirement Traceability Matrix - 1:1 Conservation)

| 需求编号 | 需求简述 | 场景故事 (User Story) | 详细功能契约 (RFC 2119 SHALL) | 独立验收判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-1** | **Markdown 规范与审计细节原子结构化规程** | 作为架构师与工作流开发者，在编写或使用 Markdown 文档定义规范、审计条目或操作流程时，系统必须强制将其结构化为带有唯一标识的原子清单，严禁将关键规则散落在大段自然语言散文中。 | 系统在 Step 0 与 Step 1 **SHALL** 确立 Markdown 规范资产的结构化标准（借鉴 `contextlint` / `github/spec-kit`），每个规范条目必须包含：唯一规则标识（如 `[SPEC-RULE-xx]`）、边界条件/输入合法域、预期行为契约（RFC 2119 SHALL）、违规判定依据及自验证方法。 | 所有指导工作流执行的规范文档中的关键约束项数必须 100% 可解析为独立规则标识列表；非结构化散装长段落触发规范机检警告。 |
| **REQ-2** | **工作流 Agent 完工断路器与生命周期拦截钩子规程** | 借鉴 Claude Code 官方 `Stop Hook` 与 `PreToolUse` 钩子模式，必须防止 Agent 在工作流执行过程中“自认为完成”而草率结束，漏掉关键细节。 | 系统 **SHALL** 建立统一的完工断路器机制（Completion Guard / Stop Hook）。当 Agent 准备宣布任务完成或释放控制权时，系统自动拉起前置校验钩子，逐项扫描生成物是否满足目标 MD 中定义的所有原子规则与清单；若存在任何未满足项或未测项，系统强制阻断退出，并将未完成的细节错误反馈给 Agent 强制继续执行。 | 当任何一项原子规范细节未得到实测验证时，完工断路器必须以 Exit Code 1 阻断任务结束；只有当全部细节均有凭据通过时才输出 Exit Code 0 准出。 |
| **REQ-3** | **自然语言细节两碰下沉为 AST/机器规则硬门禁** | 借鉴 `ast-grep` (7.5k★) 与 `semgrep` (10k★) 工业级实践，终结“同类规则在 MD 提示词里反复提醒但 Agent 反复漏掉”的恶性循环。 | 系统 **SHALL** 严格落实金字塔第二层“两碰立项机检下沉”法定化：凡在 Markdown 规范中明确规定、但 Agent 在执行或代码评审中漏掉达到 2 次的细节规则，严禁继续仅停留在 Markdown 散文说教层面，必须在该周期内强制立项下沉为一条具备真实退出码 1 阻断力的 AST 规则（如 `ast-grep` / ESLint / 静态校验脚本）。 | 同类遗漏发生 2 次时，变更必须包含对应的机器机检脚本或 AST 规则提交，否则禁止合流。 |
| **REQ-4** | **工作流细节执行单焦点状态机锁定规程** | 借鉴 Roo-Code / Cline (20k★) 交互式 Checkbox 状态机，防止 Agent 在面对多步骤工作流时长程注意力衰减导致后序细节跳步。 | 系统在执行多步骤工作流或复杂程序时，**SHALL** 将 Markdown 中的原子清单映射为串行状态机（Pending `[ ]` ➔ Active `[-]` ➔ Verified `[x]`）；同一时刻严格只允许一个细节处于激活状态，完成该细节的针对性测试验证（Exit Code 0）后方可解锁并流转至下一项。 | 工作流执行轨迹呈现严格的单焦点状态转移，不可跨步或批量伪放行。 |
| **REQ-5** | **自动化 L2 规范清算与断路器守卫工具链** | 为了使上述机制在任何本地开发或 CI/CD 流程中均具备机械拦截力，系统必须提供独立的、不依赖大模型主观判定的 L2 静态守卫脚本。 | 系统 **SHALL** 提供 `scripts/check-workflow-spec-compliance.mjs`（注册为 `npm run guard:workflow-spec`），自动扫描工作流/程序中的规范 Markdown 文档与产物，比对原子规则清单与测试/实现断言；存在规则遗漏或未核销项时强制退出码 1。 | 执行 `npm run guard:workflow-spec` 输出 Exit Code 0；人工注入遗漏规则时脚本强制输出 Exit Code 1 并打印 `WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER`。 |
| **REQ-6** | **最高宪法公理 65 立法与全系统三镜像同构固化** | 作为系统最高治理者，必须将上述高星管控机制正式立法为全系统的法定总纲条款，对跨线程、跨智能体具备永久拦截效力。 | 系统 **SHALL** 在 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md` 中同步固化 **公理 65：Markdown 规范确定性管控与工作流完工断路器公理 (`MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM`)**，保持三镜像 100% 纯通用工程抽象与同构。 | 自动化 L2 套件 `tests/workflow-spec-deterministic-enforcement.test.mjs` 与适配器回归测试全部以 Exit Code 0 通过。 |

---

## 🛑 门禁 1 物理禁令合规声明 (Gate 1 Compliance Declaration)

- **绝对禁止讨论具体实现细节**：本备忘录 100% 严格聚焦于“确认解决什么问题（What）与独立验收指标（Acceptance Criteria）”，绝不讨论具体代码实现。
- **绝对禁止列出拟变文件清单**：拟变文件清单、架构拓扑与因果分析严格留待 Step 2（门禁 2）双清单阶段呈报。

---

## 🚨 法定门禁 1：需求全量确认门禁驻留说明 (Gate 1 Hold)

根据 **OrbitStack（Ps-openspec 轨道工程体系）最高法定总纲**：
当前主协调 Agent 已严格停等在 **Step 0 门禁 1** 节点，除生成本项目专属的 Gate 1 物理实体备忘录外，**未调用任何修改代码、创建实现文件或变更系统配置的工具**。

请您核对上述 1:1 需求物理对账矩阵（REQ-1 ~ REQ-6）：
**严格等待您明确确认回复（如“需求确认/正确/执行”）后，系统方可获得通行证，正式开启 Step 1 底座感知与 Step 2 Ps-openspec OpenSpec 增量规格立法！**
