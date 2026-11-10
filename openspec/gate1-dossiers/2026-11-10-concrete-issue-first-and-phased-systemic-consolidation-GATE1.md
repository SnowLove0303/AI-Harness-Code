# Ps-openspec 门禁 1 (Gate 1) 需求全量物理对账备忘录

## 0. 元数据与事实指纹存证 (Metadata & Fact Fingerprint)
- **立案时间 (Timestamp)**: 2026-11-10T15:11:00+08:00
- **工作区 (Workspace)**: `D:\APP\AI app\Antigravity\AI-Harness-Code`
- **治理体系 (System)**: OrbitStack (Ps-openspec 轨道工程体系)
- **法定门禁阶段 (Gate Phase)**: Step 0 门禁 1 (Spec-Kit Ingestion & Intent Confirmation Gate)
- **需求指纹 (SHA-256 Fact Fingerprint)**: `f3ab9945d468fe24e9752a2886191b7375413e45a6ac26bcd6a403ce6ef10f18`

---

## 1. 用户原始需求逐字存证 (Raw User Prompt 100% Verbatim)
```text
继续补Ps-openspec 的任务执行准则：关于1、2 门禁，在确认的过程中需要区分：具体问题和通用改动（对系统底层或相关资料的改动），目前发现的核心问题是，Agent 使用Ps-openspec 时，核心聚焦于改动过多的系统底层或相关资料，但是最后在任务结束时都没有解决具体的问题，比如我发现A有问题，目前Agent会按照Ps-openspec 去找根因，但总会存在偏差，即花了较长时间去解决根因，但最终结果就是，我反馈的具体问题没有被解救，甚至对根因的改动还导致了一系列连串的问题，因此我觉得当存在具体问题时，应当优先保证具体问题被解决，经我确认后对系统底层进行确认和固化，或者你有没有更好的方案，参考poteto
```

---

## 2. 深度病理透视与 Poteto 原则对齐深度方案 (Deep Pathology & Poteto Alignment)

### 2.1 现实执行中的三大致命病理 (The Three Fatal Pathologies)
1. **根因脑补推演偏差 (Root Cause Hallucination & Deviation)**：
   - 当用户提出“具体问题 A”时，Agent 往往跳过现场第一时间的精准复现（Reproduce First）与最小范围插桩观测（Instrument），而是直接在大脑中进行抽象因果推演。由于模型认知局限与幻觉，推演出的“系统底层根因”极大概率存在微小或重大偏差；
2. **大海捞针式过度重构底座 (Premature Systemic Churn & Boiling the Ocean)**：
   - Agent 凭借存在偏差的“根因假说”，立刻铺开大面积修改系统底层基类、核心流程与全量规范资料。在此期间消耗了巨额 Token 与时间，把本应用于解决具体问题 A 的精力全部浪费在虚假的底层调整上；
3. **“原发问题未解，次生灾害雪崩” (Issue Unresolved & Cascading Regressions)**：
   - 任务结束时，用户反馈的原发具体问题 A **根本没有得到实际解决与实测闭环**；更恶劣的是，大面积被修改的系统底层打破了系统原有的隐式假设与既有契约，引发全系统其他场景的连环破坏与雪崩退化。

### 2.2 对齐 Poteto (@poteto) 原生工程哲学与综合最优解
在 Poteto 上游工程体系（`pstack-upstream`）中，有四大承重墙原则与此高度呼应：
- **`principle-sequence-verifiable-units`（时序化可验证单元）**：
  工作必须拆解为小步可独立检查的单元，必须是“先写失败测试，然后靶向通过测试（红 -> 绿）”，再进行重构；严禁把“针对性修复”与“大架构重塑”捆绑成不可拆解的大爆炸任务；
- **`blast-radius`（爆炸半径严控）**：
  严禁轻信 Agent 自己的分析报告（Writeup is worthless without proof）。任何修改必须先找到那一条“证明它安全的核心物理事实”，先用最小受控代码跑通；
- **`principle-fix-root-causes`（纠正根因的反偏门法则）**：
   upstream 原则明确指出："Reproduce first... Instrument, do not guess." 真正合规的根因分析必须建立在**已观测到的真实错误与已跑通的针对性验证**基础之上，严禁跳过针对性解决直接猜想底层；
- **`correct`（纠错固化分阶法则）**：
  "Fix the mistake now, prove it fails on past mistake, then consolidate at the highest level." 先立刻解决当前错误并证明，再在最高层（类型/Lint/状态机）沉淀长效防线。

### 2.3 最佳工程落地架构：【具体问题靶向优先闭环与双阶见证固化机制】
针对门禁 1 与门禁 2，确立以下双阶解耦机制：
1. **Gate 1 显式解耦【具体故障】与【底层假说】**：
   - 必须独立列出【具体问题条目 (`[Concrete Issue]`)】，界定其复现步骤、失败现象与靶向验收标准；
   - 任何针对系统底层改动的构想，在 Gate 1 严格降级为【待验假说 (`[Inferred Hypothesis]`)】，绝对禁止将其作为首要验收替代品。
2. **Gate 2 施工图纸与执行强制切分为双阶段 (Two-Phase Execution)**：
   - **Phase 1: 靶向解决具体问题（Targeted Concrete Fix）**：
     - 单焦点专注锁聚焦于具体问题 A；
     - 必须先写针对性复现测试（红），然后实施最小因果修复使测试变绿（绿）；
     - **底座保护锁**：Phase 1 期间系统底层引擎和共享资料**绝对只读（Read-Only Lock）**，严禁在未出具具体问题绿灯凭证前触碰底座；
     - **阶段性见证**：出具具体问题真实退出码 0 与实测报告。
   - **Phase 2: 人机确认与系统底层通用性固化（Human-Confirmed Systemic Consolidation）**：
     - **人机阶段性门禁**：Phase 1 完成后呈报用户，由用户确认具体问题已妥善解决；
     - **基于实测真相推演通用化**：在具体问题已经被解决的客观事实基础上，推演系统底层如何抽象通用机制，防止猜想偏差；
     - **多情境协同回归与防退化回滚安全网**：底层修改必须通过目标任务 + $\ge 2$ 个异质黄金标本协同回归实测（退出码 0）；若任何既有标本红灯，立即原子回滚至 Phase 1 安全状态，杜绝次生灾害！

---

## 3. 1:1 需求物理对账矩阵 (Requirement Traceability Matrix - RTM)

| 需求 ID | 用户法定原始意图 | 场景故事 (User Story) | 详细功能契约 (Detailed Functional Contract) | 独立验收指标 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | 门禁 1 与门禁 2 显式区分具体问题与通用底层改动 | 作为用户，当我报告具体问题 A 时，我希望 Agent 在 Gate 1 和 Gate 2 中严格将具体问题与底层通用改动区分开来，而不是直接混为一谈。 | Gate 1 必须设立二元物理分类：明确标定 `[Concrete Issue]`（具体故障现象、复现方法、独立验收标尺）与 `[Systemic Scope]`（通用底层假说，标记为待验证）。严禁将底层改动置于具体问题之上。 | 1. Gate 1 备忘录中包含显式的二元分流矩阵；<br>2. 具体问题具备独立的靶向测试/复现指标；<br>3. 底层改动被明确定义为假说。 |
| **REQ-02** | 确立“具体问题优先解决与实测闭环”硬门禁（Phase 1 止血） | 作为用户，我要求 Agent 在动工时优先保证我反馈的具体问题被完全解决，而不是先花时间空转改底层。 | Gate 2 与施工任务流必须将任务切分为双阶段。Phase 1 严格锁定于具体问题解决；在 Phase 1 阶段实施 `SYSTEM_CORE_READONLY_LOCK`，严禁未经实测见证前改动底层系统；必须出具具体问题退出码 0 的实测凭据。 | 1. tasks.md 显式划分 Phase 1 与 Phase 2；<br>2. Phase 1 阶段底层代码零改动；<br>3. 具体问题复现用例真实退出码 0。 |
| **REQ-03** | 确立人机阶段性确认门禁（Human Stage Confirmation Gate） | 作为用户，我需要在具体问题解决后由我先行确认，再决定是否批准对系统底层进行固化。 | Phase 1 完成并出具实测证据后，系统设立显式的人机协同确认断点。在用户未确认具体问题解决有效前，严禁自作主张推进 Phase 2 底层重构。 | 1. Phase 1 完成后呈报阶段性见证清单；<br>2. 明确等待用户对具体问题解决结论的确认回复。 |
| **REQ-04** | 确立“基于实测真相的系统底层通用固化与防退化回滚机制”（Phase 2 固化） | 作为用户，我不希望 Agent 凭空猜想改底层引发连环次生破坏，底层的改动必须基于已知事实且具备回归保障。 | Phase 2 系统底层修改必须由 Phase 1 验证通过的物理事实指导推演；底层改动强制挂载多情境协同回归门禁（$\ge 2$ 异质标本通过）；若发生既有标本退化，立即触发原子回滚退守至 Phase 1 状态。 | 1. Phase 2 提案明确说明由具体问题事实推导的通用抽象；<br>2. 挂载多情境协同回归测试用例；<br>3. 具备原子回滚机制。 |
| **REQ-05** | 保持 100% 领域中立与 Ps-openspec 宪法化权威立法 | 作为系统总架构师，本次准则补充必须立法为 Ps-openspec 的正式公理，并保持纯粹的软件工程中立术语。 | 确立“公理五十四：具体问题靶向优先闭环与系统底层双阶固化公理 (`CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM`)”，同步更新 GEMINI.md、pstack-openspec、ai-harness-openspec 及活文档规范，添加自动化测试用例，全网同步分发。 | 1. 核心宪章公理五十四建立；<br>2. 活文档规范与测试用例全绿；<br>3. 全球同步与分发包生成。 |

---

## 4. 🛑 门禁 1 物理禁令合规自查 (Gate 1 Compliance Verification)
- [x] **纯粹聚焦“做什么与验收标准” (What & Acceptance Only)**：完全聚焦于如何对具体问题与通用底层改动进行分流与分阶治理，以及验收指标定义；
- [x] **零具体实现代码泄露 (Zero Implementation Details)**：未编写任何业务实现代码，未修改现有底层逻辑；
- [x] **零拟变文件清单 (Zero File Diff Lists)**：未列出任何拟变文件的行号或差异比对；
- [x] **事实指纹不可篡改核销**：用户原始指令 100% 逐字保留，SHA-256 指纹已固化；
- [x] **等待用户授权**：在此严格停机等待用户确认回复，获得批准后方可开启 OpenSpec 编制（Gate 2）。
