# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## 反智能体蔓延、专职角色持久复用与启停人工授权门禁体系 (Axiom 77 - 借鉴 Anthropic / LangGraph Anti-Sprawl 最佳实践)

- **立案时间**: 2026-11-25T10:48:00+08:00
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **GitHub 标杆借鉴**: Anthropic / LangGraph / CrewAI Multi-Agent Anti-Sprawl & Role-Pinning Best Practices

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

```text
调整一下Ps-openspec，让各Agent/线程/主线程，没我运行不要随意开启多个Subagent/Swarm，优先给特定Agent 定好职责后持续复用，此外，没我运行禁止随意关闭
```
> （注：语义核对确认“没我运行”为“未经管理者/用户允许”）

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **禁止未经允许随意开启多个 Subagent / Swarm（反蔓延门禁）** | **GIVEN** 主线程或任意协调 Agent 处于日常规划与施工流程中；<br>**WHEN** 任务可在单主控或单个已有专职 Agent 闭环内完成，且未获得管理者明确授权开启并发多智能体时；<br>**THEN** 系统 SHALL 禁止擅自启动多个并行 Subagent 或新开 Swarm 集群（`UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED`）；若确需并发多智能体，必须在 Gate 2 或事前申请获得用户明文许可后方可拉起。 | 1. 明确修订/覆盖 Axiom 30 与 Axiom 61 中的无条件自动并发派发条款；<br>2. 默认单主控或单专职 Agent 顺序执行，多开必须经用户明文允许；<br>3. 未经授权的多开请求在契约与守卫层触发阻断。 |
| **REQ-2** | **特定 Agent 职责锚定与持续复用优先原则（Role-Pinned Persistent Reuse）** | **GIVEN** 系统中已存在负责特定职责的活跃或空闲 Subagent / Swarm 成员（如编码专员、审计专员、浏览器专员）；<br>**WHEN** 出现同职责后续任务、返工修复或连续交互时；<br>**THEN** 主协调者 SHALL 先检索 `manage_subagents(Action='list')` 或 `swarm(action='status')`，优先通过 `send_message` / `@mention` 向对应职责的既有特定 Agent 持续派发任务，严禁抛弃旧专员另起炉灶（`ROLE_PINNED_AGENT_REUSE_MANDATE`）。 | 1. 派发前必须先探查既有成员与职责映射；<br>2. 同职责任务 100% 优先通过消息队列持续复用既有 Agent；<br>3. 每个常驻 Agent 拥有清晰单一的 Role 职责边界。 |
| **REQ-3** | **禁止未经允许随意关闭 / 销毁 Subagent 或 Swarm 成员（Lifecycle Termination Lock）** | **GIVEN** 既有的 Subagent 或 Swarm 成员已完成阶段性任务或处于 `waiting` / `idle` 待命状态；<br>**WHEN** 主协调者或子智能体试图调用 `manage_subagents(Action='kill'/'kill_all')` 或 `swarm(action='kill')` 时；<br>**THEN** 系统 SHALL 严格禁止在未经用户明文指令允许的情况下擅自关闭或销毁任何智能体实例（`UNAUTHORIZED_AGENT_TERMINATION_BLOCKED`）；空闲智能体零 Token 消耗保持常驻待命以备后续持续复用。 | 1. 明确禁止私自调用 `kill` / `kill_all` 关闭活跃或空闲的子智能体；<br>2. 关闭或销毁智能体必须有用户明确指令授权；<br>3. 闲置智能体保持 `idle`/`waiting` 以便持续复用。 |
| **REQ-4** | **Axiom 77 三镜像宪法修订（正式接管 Axiom 30/61）与 L2 守卫验证** | **GIVEN** 需将该智能体启停与复用纪律固化进 Ps-openspec 全局体系；<br>**WHEN** 修订规则与验证工具时；<br>**THEN** 系统 SHALL 以正式修订方式确立 **Axiom 77** 同步写入三份宪法镜像与 `worker.md`，并配备 L2 静态/规则守卫与测试套件（100% 纯通用工程抽象），全部验证退出码 0。 | 1. 三份宪法镜像同构写入 Axiom 77 并显式标明取代 Axiom 30/61 的并发/销毁旧条款；<br>2. L2 守卫与测试套件全部退出码 0。 |

---

### 2. 本次任务专属：《前瞻性扩展提案清单 (Proactive Requirement Brainstorming Matrix)》

| 提案编号 | 推演伴生诉求 | 衍生技术背景与工程价值 | 建议处理方式 |
| :--- | :--- | :--- | :--- |
| **PROP-C** | **专职角色注册表（Role-Pinned Registry）与单实例上限约束** | 借鉴 GitHub 上 LangGraph/Anthropic 的 Role-Pinning 最佳实践：为常驻复用的特定 Agent 确立标准角色名（如 `role-implementer`、`role-auditor`、`role-browser`），同一角色严格限制只保留 1 个常驻实例，防止“同名角色开出 3 个分身”。 | **建议纳入**：确立“一职一员”单实例复用原则。 |
| **PROP-D** | **常驻复用防上下文污染策略（Checkpoint Summary / Context Hygiene）** | 持续复用同一个专职 Agent 几十轮后，上下文会变长；如何在“不关掉重开”的前提下保持其高精度？ | **建议纳入**：规定每次通过 `send_message` 复用时，附带清晰的阶段边界提示与最新聚焦文件锚点，避免无关历史噪声干扰。 |
| **PROP-E** | **自动化 L2 生命周期治理校验脚本 (`guard:agent-lifecycle`)** | 把“禁止未经允许并发多开”、“优先复用既有同职责 Agent”、“禁止未经允许 kill”下沉为可测试的策略决策校验函数。 | **建议纳入**：创建 `scripts/check-agent-lifecycle.mjs` 并注册 `npm run guard:agent-lifecycle`。 |

---

## 板块三：法定门禁物理隔离禁令确认

> 🛑 **【门禁 1 物理禁令】**：本备忘录纯粹确认“做什么与验收标准”，未修改任何代码或宪法文件；现等待您确认 `REQ-1 ~ REQ-4` 及 `PROP-C / D / E` 后进入 Step 2 OpenSpec 规格立法。
