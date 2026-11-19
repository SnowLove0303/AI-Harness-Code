# 需求全量追溯备忘录 (Gate 1 Intent Dossier)

> **任务标识**: `2026-11-19-called-program-immutability-and-invocation-purity`
> **法定阶段**: Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1 Detailed Brief)
> **法定公理依据**: 
> - Axiom 28: `MANDATORY_USER_SPECIFICATION_INGESTION_&_ACTIVE_POST_TASK_AGENT_AUDIT_AXIOM`
> - Axiom 50: `GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM`
> - Axiom 51: `PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM`
> - Axiom 63: `PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM`
> - Axiom 64: `PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM`
> - Axiom 65: `MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM`

---

## 板块一：管理者的任务说明原文 100% 逐字镜像与事实指纹

### 1.1 原始用户指令逐字归仓 (Verbatim User Prompt)

```text
必须给我严格限制，调用程序功能执行任务时，就必须只是调用，不准遇到问题就为了完成任务而改动相关功能代码
```

### 1.2 事实指纹实体哈希冻结 (Fact Fingerprint Digest)
- **Hash 算法**: `SHA-256`
- **指纹摘要**: `7e1050ba9034ef278725e479e7c9b29896c5238c16fa5932303145159f2c7f1e`
- **封印状态**: 🔒 已锁定不可篡改，作为全生命周期 1:1 双向物理核销的基准原点。

---

## 板块二：法医级第一门禁反馈与 1:1 需求物理对账矩阵 (RTM)

### 2.1 需求全量物理对账矩阵 (Requirement Traceability Matrix - 1:1 Conservation)

| 需求编号 | 需求简述 | 场景故事 (User Story) | 详细功能契约 (RFC 2119 SHALL) | 独立验收判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-1** | **调用型任务二分判定与被调用程序只读锁硬阻断规程** | 作为架构师，当任务目标是“调用既有程序、管线、CLI、服务或工具函数来执行业务任务（如跑批、生成文档、数据处理）”时，系统必须自动将任务定性为【纯调用型任务】，被调用的程序本体代码强制上锁进入只读模式。 | 系统在 Step 0 与 Step 1 **SHALL** 显式二分判定【程序开发/修改型任务】与【纯调用执行型任务】；对于纯调用型任务，被调用程序本体代码享有最高只读豁免，系统底层工具拦截网 **SHALL** 拦截任何针对被调用程序源码的修改尝试，违者直接触发 `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED` 阻断。 | 在纯调用型任务下，若出现针对被调用程序本体的写操作，门禁与静态检查强制抛出 `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`（Exit Code 1）。 |
| **REQ-2** | **严禁为单次任务权宜篡改底座与消费端适配优先公理** | 作为工程管理者，必须彻底根除“Agent 遇到校验报错或执行摩擦，为了完成当前单次任务而顺手改动被调用代码（如注释掉校验、改大公差、硬编码特判、篡改返回值）”的权宜破坏恶习。 | 当调用程序遇到异常、报错或失败时，Agent 的排错与调整作用域 **SHALL** 严格收敛在【调用端平面（Caller Plane）】（包括：调整输入参数、清洗输入数据集、修改调用端脚本/配置）；**FORBIDDEN** 在被调用程序内部做任何针对单次任务的特判硬编码或防御性降级。 | 代码审查与守卫扫描核验，被调用程序代码在调用型任务中的 Git Diff 必须严格为空；若有变更，必须证明获得了显式的“底层程序重构专项授权”。 |
| **REQ-3** | **底层真缺陷隔离与双轨工单停等升级规程** | 作为质量把关人，若调用失败确实是被调用程序本身的底层 Bug（而非调用端输入问题），Agent 不得自行在当前调用任务中“顺手修掉”。 | 当排查证明确实属于被调用程序内部的根本性缺陷时，Agent **SHALL** 保持调用程序只读现状，出具法医级缺陷诊断报告（包含复现命令、报错栈与根因分析），并在当前任务中停机向用户呈报升级；严格等待用户授权开启独立的“程序修复变更”并经历多场景回归验证后方可动工，绝对禁止在调用任务生命周期内暗度陈仓篡改底座。 | 遇到程序真 Bug 时，Agent 记录 `[Incident: Upstream Engine Defect]` 存证并停等用户决策，不得伪装成调用端任务自行偷改代码。 |
| **REQ-4** | **门禁 2 拟变范围白名单与调用端物理围栏硬拦截** | 作为安全主管，在动工前的 Step 2 门禁 2 呈报中，必须对拟变范围实施物理围栏限制，防止被调用程序被列入拟变清单。 | 在纯调用型任务的门禁 2 【拟变更范围清单】中，可写路径（Writable Paths）必须 100% 局限于调用端文件（如调用脚本、输入数据、配置文件）；凡检测到拟变清单中包含被调用程序、核心引擎或共享库文件的，门禁 2 直接触发 `ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED` 阻断，一票否决！ | 门禁 2 校验器自动扫描 `tasks.md` 与拟变清单，若纯调用任务包含引擎文件写权限，直接判定为非法提权并驳回。 |
| **REQ-5** | **自动化 L2 调用纯净度守卫工具链** | 为了使上述机制在任何本地开发或 CI/CD 流程中均具备机械拦截力，系统必须提供独立的、不依赖大模型主观判定的 L2 静态守卫脚本。 | 系统 **SHALL** 提供 `scripts/check-invocation-purity.mjs`（注册为 `npm run guard:invocation-purity`）；该脚本自动比对任务性质与 Git Diff，若任务标识为调用型但修改了受保护的程序代码，强制退出码 1 并打印 `CALLED_PROGRAM_TAMPERING_DETECTED`。 | 执行 `npm run guard:invocation-purity` 输出 Exit Code 0；人为修改被调用程序时脚本强制输出 Exit Code 1 阻断。 |
| **REQ-6** | **最高宪法公理 66 立法与三镜像同构固化** | 作为系统最高治理者，必须将上述调用纯净度管控机制正式立法为全系统的最高法定宪法。 | 系统 **SHALL** 在 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md` 中同步固化 **公理 66：被调用程序最高只读豁免与调用纯净度公理 (`CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM`)**，保持三镜像 100% 纯通用工程抽象与同构。 | 自动化 L2 套件 `tests/called-program-immutability.test.mjs` 与适配器回归测试全部以 Exit Code 0 通过。 |

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
