# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## 全智能体通用化解题、问题类抽象举一反三与反特指向性固化体系 (Axiom 78 - 融合 Anthropic Property-Based / Ousterhout Eliminating Special Cases / ast-grep 思想)

- **立案时间**: 2026-11-25T15:52:00+08:00
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **GitHub 标杆借鉴**: Anthropic Property-Based Bug-Class Remediation + John Ousterhout *Eliminating Special Cases* + `ast-grep` Anti-Overfitting Static Guards

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

```text
还是要解决一个问题，必须让全部Agent 基于通用性的角度去解决问题，而不是只解决当前的问题，后面相同问题复发又要再改一次代码解决一次，并且，解决的问题要举一反三，禁止将系统/代码 为解决单个问题而进行特指向性固化；
```

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **“问题类抽象”前置转换门禁（Fix the Problem Class, Not the Instance）** | **GIVEN** 任何 Agent 收到一个具体故障、缺陷或单点需求；<br>**WHEN** 进入 Step 1 分析与 Step 2 方案设计时；<br>**THEN** Agent SHALL 强制将该单点现象抽象为通用的**“问题类别（Problem Class）”**与共性根因模式，禁止就事论事直接针对当前单一实例设计补丁。 | 1. 方案设计必须显式声明【当前实例 $\rightarrow$ 抽象问题类】映射；<br>2. 仅针对单一实例输入打补丁的提案被门禁驳回；<br>3. 覆盖全仓库所有主 Agent、Subagent 与 Swarm Worker。 |
| **REQ-2** | **举一反三同源泛化清扫（Analogous Pattern Sweep）** | **GIVEN** 某类问题的共性根因已被定位；<br>**WHEN** 实施修复与验证时；<br>**THEN** Agent SHALL 主动举一反三，在全工程架构（参考 Project Graph）中排查所有可能触发同一问题类的兄弟模块、对等分支与相似数据处理路径，在同一次变更中彻底根除整类隐患，杜绝日后同类问题反复再改一次代码。 | 1. 必须输出举一反三排查清单（Sibling / Analogous Sites）；<br>2. 必须证明整类相似路径已采用统一通用机制处理；<br>3. 不得遗留已知同源隐患待下次再修。 |
| **REQ-3** | **严禁特指向性固化与分支过拟合（Anti-Special-Casing & Table-Driven Generalization）** | **GIVEN** 面对特定输入值、特定文件或特定场景出现的报错；<br>**WHEN** 编写业务代码与规则配置时；<br>**THEN** 系统 SHALL 严禁为解决单个问题而在通用代码路径中硬编码特指向性分支（如 `if (id === 'case_X')`、`if (name.includes('specific'))` 或单点魔数补丁）；必须通过通用算法、参数化抽象或外部声明式策略配置消除特例（Eliminate Special Cases）。 | 1. 通用代码路径零特指向性硬编码特判；<br>2. 差异化行为必须抽离为外部声明式表/策略；<br>3. 静态/规则守卫检出特指向性固化直接 Exit Code 1 阻断。 |
| **REQ-4** | **基于性质的多变体泛化验证 + Axiom 78 三镜像立法与 L2 守卫** | **GIVEN** 需确保所有 Agent 严格落地通用化解题与反特指向性固化；<br>**WHEN** 立法并验证修改结果时；<br>**THEN** 系统 SHALL 要求修复后至少通过 2–3 组正交变体（Property-Based Variants）测试（证明非针对单一输入过拟合），并将本规范确立为 **Axiom 78** 同步写入三份宪法镜像与 `worker.md`，配备 L2 静态守卫与测试套件（100% 纯通用工程抽象），退出码 0。 | 1. 配备 L2 反特指向性固化静态守卫脚本与多变体验证门禁；<br>2. 三份宪法镜像同构写入 **Axiom 78**；<br>3. 全套测试与守卫退出码均为 0。 |

---

### 2. 本次任务专属：《前瞻性扩展提案清单 (Proactive Requirement Brainstorming Matrix)》

| 提案编号 | 推演伴生诉求 | 衍生技术背景与工程价值 | 建议处理方式 |
| :--- | :--- | :--- | :--- |
| **PROP-C** | **L2 反特指向性固化与魔数特判静态守卫 (`guard:anti-hardcoding`)** | 仅靠 Prompt 要求 Agent “不要写特判”，大模型在赶时间或卡住时依然会偷偷写 `if (input === 'xxx')` 过关。必须铸造机器级的静态模式守卫自动扫出这类过拟合分支。 | **建议纳入**：创建 `scripts/check-anti-hardcoding.mjs` 并注册 `npm run guard:anti-hardcoding`。 |
| **PROP-D** | **泛化变体测试最低配额（Property-Based Variant Quota $\ge 2$）** | 如果某个修复只写了一个“刚好等于用户报错输入”的测试用例，根本无法证明通用性。 | **建议纳入**：在规范与校验中要求：修复类验证必须包含除原始报错实例之外的至少 2 个正交变体或边界用例。 |
| **PROP-E** | **“三层机制策略隔离”重构触发阈值（Special-Case Refactor Trigger）** | 参考 John Ousterhout 理论：当同一通用模块出现连续特例化趋势时，强制将其重构为“通用引擎 + 外部映射表”。 | **建议纳入**：在 L2 守卫与 Axiom 78 中明确“超过 1 处特指向性字面量分流即触发重构警报”。 |

---

## 板块三：法定门禁物理隔离禁令确认

> 🛑 **【门禁 1 物理禁令】**：本备忘录纯粹确认“做什么与验收标准”，未修改任何代码或宪法文件；现等待您确认 `REQ-1 ~ REQ-4` 及 `PROP-C / D / E` 后进入 Step 2 OpenSpec 规格立法。
