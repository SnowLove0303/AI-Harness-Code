# 需求全量追溯备忘录 (Gate 1 Intent Dossier)

> **任务标识**: `2026-11-18-problem-ledger-deep-remediation`
> **法定阶段**: Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1 Detailed Brief)
> **法定公理依据**: 
> - Axiom 28: `MANDATORY_USER_SPECIFICATION_INGESTION_&_ACTIVE_POST_TASK_AGENT_AUDIT_AXIOM`
> - Axiom 50: `GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM`
> - Axiom 51: `PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM`
> - Axiom 59: `PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM`
> - Axiom 63: `PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM`

---

## 板块一：管理者的任务说明原文 100% 逐字镜像与事实指纹

### 1.1 原始用户指令逐字归仓 (Verbatim User Prompt)

```text
关于两道门禁，目前又一种情况是：我有时会要求 让Agent去审计出问题MD，然后再让Agent 按照这个MD去解决问题，虽然会过两道门禁然后去解决问题，但是目前对问题的解决情况还不够有深度，偶尔会出现，确认问题1、2、3、4，但是最终只解决了1 或 1、2 的情况，会漏问题，也就是对于问题型 任务，需要通过Ps-openspec 体系构建问题清单，并保证在最后 所有问题得到解决，你去排一下现有的Ps-openspec 体系相关内容，然后找优化方案
```

### 1.2 事实指纹实体哈希冻结 (Fact Fingerprint Digest)
- **Hash 算法**: `SHA-256`
- **指纹摘要**: `114c1c059ab3ec7b003c5235cbb469c2ad09fda1c38b67740887aecc88772e54`
- **封印状态**: 🔒 已锁定不可篡改，作为全生命周期 1:1 双向物理核销的基准原点。

---

## 板块二：法医级第一门禁反馈与 1:1 需求物理对账矩阵 (RTM)

### 2.1 需求全量物理对账矩阵 (Requirement Traceability Matrix - 1:1 Conservation)

| 需求编号 | 需求简述 | 场景故事 (User Story) | 详细功能契约 (RFC 2119 SHALL) | 独立验收判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-1** | **问题型任务判定与《问题清单总账本》全量切片规程** | 作为架构师，当用户输入指向外部“问题 MD”、审计清单或缺陷报告时，系统必须自动识别为“问题型任务（Problem/Issue Remediation Task）”，并对外部文档的所有问题进行原子化全量切片，生成不可篡改的问题清单总账本，严禁压缩截断。 | 系统在 Step 0 **SHALL** 自动激活问题清单规程，将输入文档中的每个问题提取为独立的 `[ISSUE-01]` ~ `[ISSUE-K]` 条目，并显式记录【缺陷标识】、【现状与代码锚点】、【初始复现命令/报错日志】、【涉及链路因果角色】及【独立验收判据】。 | 当外部输入包含 $K$ 项独立问题时，Step 0 备忘录中解析生成的问题账本项数必须严格满足 $N_{\text{Ledger}} \equiv K$；少于 $K$ 项触发需求截断阻断。 |
| **REQ-2** | **问题与原子任务 1:1 双射法定公理与严禁任务打包门禁** | 作为开发团队，必须防止在 Step 2 制定施工图纸时将多个缺陷粗放打包到同一大任务中导致后序问题被静默遗漏。 | 系统在 Step 2 编写 `tasks.md` 时 **SHALL** 强制落实问题与原子任务的 1:1 双射映射。每一个 `[ISSUE-xx]` 必须拥有专属独立的任务单元；**FORBIDDEN** 将不同 Issue 混合聚合为单一任务（`BUNDLED_ISSUE_TASK_FORBIDDEN`）。 | 静态分析检查 `tasks.md` 中属于问题修复的任务组数量必须 $\ge K$；任何多 Issue 合并打包任务在门禁 2 审查时一票否决。 |
| **REQ-3** | **四阶深度根治阶梯规程 (Four-Tier Deep Remediation)** | 作为工程审计员，必须防止 Agent 采取就事论事创可贴修补、在调用消费端加 `if (!x) return` 兜底导致问题解决缺乏深度。 | 针对账本中的每一个 `[ISSUE-xx]`，施工过程 **SHALL** 严格遵循四阶深度阶梯：① Tier 1 见证红灯（先写失败反例单测，Exit Code $\ne 0$）；② Tier 2 源头根治（数据流穿透至 Origin Producer 修复，严禁只改 Consumer Sink）；③ Tier 3 结构免疫（显式状态机、类型收窄或 AST 规则）；④ Tier 4 全景同源清算（全仓检索同类模式）。 | 每个 Issue 必须提供在修复前失败的测试见证；拟变范围清单中所有涉及修改必须标明 `[Root Source]` 源头修复证据。 |
| **REQ-4** | **单问题串行专注锁与子智能体派发规程** | 作为主协调者，必须防止解决前 1、2 个问题后因上下文膨胀或注意力衰减导致后续问题被遗忘或提前满足退出。 | 系统在 Step 3 **SHALL** 将单任务专注锁（`[-] lock`）的粒度严格收敛至单 Issue 级别，严格串行执行；前一个 Issue 未获真实退出码 0 验证通过前，严禁开启下一个 Issue；Swarm 派发必须按独立 Issue 封装 Brief，严禁向单一 Worker 粗放打包全量问题。 | 任务推进日志呈现严格的单 Issue 串行状态转移轨迹；每个 Issue 拥有独立的构建、测试和提交见证。 |
| **REQ-5** | **零遗漏机械清算断路器与终审绝对守恒门禁** | 作为质量把关人，必须防止“测试套件全绿”掩盖了部分问题未被测试、未被解决的假通现象。 | 系统 **SHALL** 引入机械化 L2 静态守卫脚本（`scripts/check-issue-clearance.mjs`，注册 `npm run guard:issue-clearance`），自动比对 Step 0 问题账本中的 $K$ 项 Issue 与测试套件/交付核销表中的独立测试用例；若经过独立实测证明的项数 $N_{\text{verified}} < K$，脚本直接以 Exit Code 1 阻断，抛出 `PROBLEM_OMISSION_CIRCUIT_BREAKER`，死锁发布与归档。 | 执行 `npm run guard:issue-clearance` 输出 Exit Code 0；人为变异注入（故意删减一项 Issue 的测试断言）时，脚本强制输出 Exit Code 1 阻断。 |
| **REQ-6** | **最高宪法公理 64 立法与全镜像同构固化** | 作为系统架构治理者，必须将上述问题型任务全链路闭环规则上升为最高法定宪法，使全系统智能体与蜂群永久受控。 | 系统 **SHALL** 在 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 及 `skills/ai-harness-openspec/SKILL.md` 中同步固化 **公理 64：`PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM`**，保持跨环境三镜像 100% 纯通用工程抽象与同构。 | 适配器回归测试 `gemini-adapter.test.mjs` 与自动化 L2 套件 `tests/problem-ledger-deep-remediation.test.mjs` 均以 Exit Code 0 通过。 |

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
