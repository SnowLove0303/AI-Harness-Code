# Proposal: Proactive Requirement Brainstorming and Universal Cross-Thread Ps-openspec Governance

## Why
Two critical governance bottlenecks persist in human-agent collaboration and multi-model operations:
1. **Shallow Requirement Understanding (The A, B -> C, D, E Iceberg Effect)**: Users naturally formulate immediate, explicit requirements (A, B). However, real-world software engineering always entails implicit downstream invariants, defensive boundary considerations, data migration resilience, and error handling (C, D, E). Agents either mechanically execute only A and B (producing brittle implementations) or make unauthorized assumptions without user alignment.
2. **Cross-Model and New-Thread Governance Drift**: When users switch to new models or open new conversation threads, agents frequently fail to follow Ps-openspec. Forensic diagnosis reveals that the global `GEMINI.md` has grown to 216 KB, causing host platforms to truncate 192 KB on prompt injection. New threads only receive the first ~24 KB, which lacked an unmissable, front-loaded mandatory bootstrap protocol.

To resolve these defects permanently, this change formalizes **Proactive Requirement Brainstorming and Universal Cross-Thread Governance** by codifying Axiom 69 (`PROACTIVE_REQUIREMENT_BRAINSTORMING_&_UNIVERSAL_CROSS_THREAD_GOVERNANCE_AXIOM`):
- Mandating a structured Proactive Requirement Brainstorming Protocol in Gate 1 that anticipates implicit companion needs (C, D, E) for explicit user confirmation.
- Restructuring `GEMINI.md` to front-load a non-truncatable, high-priority **Mandatory Bootstrap Protocol (MANDATORY_BOOTSTRAP_PROTOCOL)** within the first 20 KB safe zone.
- Deploying cross-thread workspace pointer anchors to guarantee 100% universal Ps-openspec inheritance across any model and thread.

## What Changes
1. **Proactive Requirement Brainstorming & Anticipation Protocol (`PROACTIVE_REQUIREMENT_BRAINSTORMING_&_ANTICIPATION_PROTOCOL`)**:
   - Step 0 Gate 1 captures explicit user requirements verbatim while proactively generating a dedicated `Proactive Requirement Brainstorming Matrix` (evaluating runtime safety, data migration, and maintainability).
2. **Gate 2 Brainstorming Ingestion & Legislation Gate (`GATE2_BRAINSTORMING_INGESTION_&_LEGISLATION_GATE`)**:
   - Only user-approved brainstormed items are converted into binding RFC 2119 specifications in `specs/`, architectural designs in `design.md`, and tasks in `tasks.md`.
3. **Universal Cross-Thread & Model Bootstrap Mandate (`UNIVERSAL_CROSS_THREAD_&_MODEL_BOOTSTRAP_MANDATE`)**:
   - An unmissable, front-loaded bootstrap protocol within the first 50 lines of `GEMINI.md` binding every model (Gemini, Claude, GPT, DeepSeek) and thread to Ps-openspec dual-gate execution upon first user instruction.
4. **Anti-Truncation Front-Loaded Architecture & Sync Standard (`ANTI_TRUNCATION_MODULAR_ARCHITECTURE_&_SYNC_STANDARD`)**:
   - Keeps the core governance charter, dual-gate SOP, and cold-boot mandate within the first 20 KB safe zone of `GEMINI.md`.
   - Distributes workspace pointer files (`.agents/rules/` and `GEMINI.md`) across active workspaces.
5. **Axiom 69 Constitutional Legislation across Three Mirrors**:
   - Codify Axiom 69 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 66).
6. **Automated L2 Test Suite**:
   - Authored `tests/proactive-brainstorming-governance.test.mjs` and expanded regression test assertions in `scripts/tests/gemini-adapter.test.mjs`.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **两道门禁用户需求前瞻性头脑风暴与隐含诉求推演规程**<br>(`PROACTIVE_REQUIREMENT_BRAINSTORMING_&_ANTICIPATION_PROTOCOL`) | **GIVEN** 管理者在 Step 0 给出明确指令 A 与 B；<br>**WHEN** 智能体编制 Gate 1 备忘录时；<br>**THEN** 系统 SHALL 100% 逐字保留 A 与 B 事实指纹，同时基于工程因果主动展开前瞻性头脑风暴推演，深挖伴生的隐含诉求 C、D、E；在备忘录中设立独立的《前瞻性扩展提案清单》，供管理者审阅确认。 | 1. Gate 1 备忘录必须包含显式需求与推演提案两个独立板块；<br>2. 提案 C、D、E 明确标注为建议项，严禁擅自并入已确认需求；<br>3. 严格等待管理者勾选确认哪些纳入本次实施。 |
| **REQ-2** | **门禁 2 需求吸收与规格立法过滤规程**<br>(`GATE2_BRAINSTORMING_INGESTION_&_LEGISLATION_GATE`) | **GIVEN** 管理者在 Gate 1 对 A、B 以及头脑风暴提案 C、D、E 做出确认；<br>**WHEN** 智能体进入 Step 2 编制 OpenSpec 变更资产时；<br>**THEN** 系统 SHALL 仅将管理者明确批准的需求项转化为严格的 RFC 2119 行为契约、技术设计与单焦点任务；未获批准的推演提案 100% 排除在施工范围之外，严禁静默夹带。 | 1. Gate 2 proposal.md 中的需求项数与管理者批准项数 1:1 绝对守恒；<br>2. 任务清单中每个任务均有清晰的用户授权因果来源；<br>3. 未获批提案被封存或丢弃，违规夹带直接触发阻断。 |
| **REQ-3** | **跨模型跨线程全局绝对继承与前置冷启动硬门禁规程**<br>(`UNIVERSAL_CROSS_THREAD_&_MODEL_BOOTSTRAP_MANDATE`) | **GIVEN** 开启任何全新线程，或切换至任何第三方/轻量模型（GPT、Claude、DeepSeek、Gemini 等）；<br>**WHEN** 智能体接收到首条用户任务指令时；<br>**THEN** 全局规则系统 SHALL 在首屏前 50 行内强制触发冷启动硬阻断令（MANDATORY_BOOTSTRAP_PROTOCOL）：要求智能体必须强制进入 Ps-openspec 双门禁生命周期，严禁直接回答或擅自修改代码。 | 1. 任何新线程或新模型接收任务时，首个动作必须是 Step 0 立案；<br>2. 严禁新模型跳过门禁直接给出散漫口水回复或直接改码；<br>3. 全局规则首屏包含明确的冷启动阻断机制。 |
| **REQ-4** | **宪法首屏防截断架构与轻量全景索引标准**<br>(`ANTI_TRUNCATION_MODULAR_ARCHITECTURE_&_SYNC_STANDARD`) | **GIVEN** 宿主环境对超过 24 KB 的全局规则实施截断；<br>**WHEN** 维护和分发 `GEMINI.md` 与全局规则时；<br>**THEN** 系统 SHALL 重构全局规则物理布局：将全系统最高法定总纲、双门禁 SOP、冷启动指令与公理速查索引提炼至首部 20 KB 以内（绝对防截断安全区）；确保无论后续内容截断多少，新模型均能完整吸收 Ps-openspec 全部核心管辖律。 | 1. 全局 `GEMINI.md` 首屏 20 KB 内包含不可分割的完整治理闭环总纲；<br>2. 截断发生时核心双门禁与冷启动指令 100% 完好；<br>3. 全局同步工具链自动同步至所有相关全局与工作区目录。 |
| **REQ-5** | **自动化 L2 全局继承与头脑风暴门禁静态守卫规程**<br>(`AUTOMATED_L2_GLOBAL_GOVERNANCE_&_BRAINSTORMING_GUARD_STANDARD`) | **GIVEN** 构建、CI 流水线或执行静态合规测试时；<br>**WHEN** 守卫扫描 Gate 1 模板、全局规则与测试套件时；<br>**THEN** 守卫 SHALL 机械验证：（1）Gate 1 资产是否包含头脑风暴推演板块；（2）全局宪法首屏是否包含冷启动硬指令；（3）三镜像同构与纯通用工程抽象是否完全满足；测试全绿方可通过。 | 1. 新增 `tests/proactive-brainstorming-governance.test.mjs` 套件；<br>2. 验证首屏防截断安全性与头脑风暴结构守恒；<br>3. 真实退出码严格为 0。 |
| **REQ-6** | **最高宪法公理 69 立法与三镜像同构固化**<br>(`AXIOM_69_PROACTIVE_BRAINSTORMING_&_CROSS_THREAD_GOVERNANCE_LEGISLATION`) | **GIVEN** 完成头脑风暴推演与全局跨线程继承体系设计；<br>**WHEN** 固化至全系统核心宪法与规约时；<br>**THEN** 智能体 SHALL 将上述规程作为 Axiom 69，同步写入 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md`（第 66 项），并在 `worker.md` 注入执行指令，保持 100% 纯通用工程抽象与测试全绿。 | 1. 三份宪法镜像中 Axiom 69 语义 100% 同构；<br>2. `worker.md` 包含头脑风暴与跨线程继承的行为准则；<br>3. 自动化测试套件增补对应断言并测试全绿。 |
