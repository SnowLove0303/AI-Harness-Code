# Proposal: Dual Audit Tooling Governance: Mechanical Audit and Agent Proactive Intervention Audit

## Why
In multi-agent systems and software engineering lifecycles, auditing methodologies frequently suffer from boundary ambiguity and cognitive passivity:
1. **Mechanical and Semantic Entanglement**: Teams confuse deterministic automated test execution with semantic behavioral validation, either relying solely on static exit codes (which can be fooled by hardcoded false passes) or substituting conversational LLM summaries for hard machine assertions.
2. **Agent Passivity & Checklist Theater**: In audit stages, agents frequently degenerate into passive readers who merely echo test outputs, without proactively inspecting physical source files, actively authoring and running exploratory boundary test cases, or probing runtime state machines.
3. **Domain Scenario Pollution**: Auditing definitions frequently leak domain-specific vocabulary (e.g. business forms, specialized workflows), destroying the universal applicability across CLI utilities, web applications, libraries, and pipelines.

To permanently resolve these defects, this change formalizes **Dual Audit Tooling Governance** into Ps-openspec by codifying Axiom 68 (`DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM`):
- **Mechanical Audit Tool**: Pure, deterministic, rule-based, static analysis, type checking, and binary exit-code gate (Exit Code 0 vs non-zero, zero warnings `--max-warnings=0`) with zero model hallucination.
- **Agent Proactive Intervention Audit Tool**: Proactive inspection, dynamic boundary probing, runtime state observation, diff review, and dynamic falsification executed actively by the agent.
- **100% Domain-Neutral Universal Abstraction**: Completely decoupled from specific business contexts.

## What Changes
1. **Mechanical Audit Tool Generic Standard (`MECHANICAL_AUDIT_TOOL_GENERIC_STANDARD`)**:
   - Deterministic rule and compiler gates, `--max-warnings=0`, binary exit-code enforcement, single-machine path exclusion, structural invariant parity.
2. **Agent Proactive Intervention Audit Tool Standard (`AGENT_PROACTIVE_INTERVENTION_AUDIT_TOOL_STANDARD`)**:
   - Mandate proactive inspection of source files, proactive dynamic probe testing, proactive runtime state observation, proactive line-by-line diff review, and proactive falsification attacks.
3. **Dual-Key Sequential Orchestration Contract (`DUAL_KEY_SEQUENTIAL_ORCHESTRATION_CONTRACT`)**:
   - Mechanical audit serves as Key 1 (Entry Baseline / Necessary Condition); Agent proactive audit serves as Key 2 (Behavioral Falsification / Sufficiency Condition).
4. **False-Pass Detection & Dynamic Falsification Standard (`FALSE_PASS_DETECTION_&_DYNAMIC_FALSIFICATION_STANDARD`)**:
   - Proactive boundary probing to detect hardcoded test shortcuts, bypassed assertions, and fragile error-masking.
5. **Universal Software Engineering Abstraction Standard (`PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD`)**:
   - Zero domain-scenario token leakage; 100% neutral software engineering terminology.
6. **Axiom 68 Codification across Three Mirrors**:
   - Codify Axiom 68 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 65).
7. **Worker Constitution & Testing Assets**:
   - Update `worker.md` with explicit proactive inspection and dynamic testing instructions.
   - Author automated L2 test suite `tests/dual-audit-tooling.test.mjs` and expand `scripts/tests/gemini-adapter.test.mjs`.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **机械审计工具纯通用标准定义与判定规程**<br>(`MECHANICAL_AUDIT_TOOL_GENERIC_STANDARD`) | **GIVEN** 任何通用系统、Web 界面、脚本或工作流的工程交付；<br>**WHEN** 触发机械审计阶段时；<br>**THEN** 系统 SHALL 调用确定性脚本、编译器、静态分析器与测试套件；零模型主观推理，基于预定义规则、类型完整性、结构不变量与退出码（Exit Code 0）二值判定；强制 `--max-warnings=0`；违规一票否决。 | 1. 审计判定 100% 依赖确定性代码规则与机器退出码；<br>2. 0 引入大模型主观推理与文本解释；<br>3. 违规直接抛出 `MECHANICAL_AUDIT_BLOCKER`。 |
| **REQ-2** | **Agent 介入审计工具主动探查与动态测试标准定义**<br>(`AGENT_PROACTIVE_INTERVENTION_AUDIT_TOOL_STANDARD`) | **GIVEN** 系统已通过机械准入底座；<br>**WHEN** 触发 Agent 介入审计阶段时；<br>**THEN** 智能体 SHALL 主动执行查阅底层源码、主动构造边界探针用例并驱动执行、主动观测运行时状态机转移、主动逐行审阅版本变更 Diff，出具微观物理行号证据链，严禁消极放行。 | 1. Agent 必须出具主动查看与动态测试的实测证据（输入、输出与行号锚点）；<br>2. 严禁仅做被动文本总结与形式主义打勾；<br>3. 发现逻辑不自洽时抛出 `AGENT_SEMANTIC_AUDIT_REJECTED`。 |
| **REQ-3** | **两阶双钥匙正交协同与递进流水线契约**<br>(`DUAL_KEY_SEQUENTIAL_ORCHESTRATION_CONTRACT`) | **GIVEN** 软件交付必须同时满足物理正确与逻辑合规；<br>**WHEN** 执行端到端审计流水线时；<br>**THEN** 系统 SHALL 实施严格的串联递进门禁：机械审计未通过前，严禁调用 Agent 审计浪费算力；机械全绿后，Agent 介入执行主动证伪；两把钥匙全绿方可进入人工终审。 | 1. 机械未通过时直接阻断；<br>2. 机械通过但 Agent 审计存疑时，强制回退单步修复；<br>3. 交付物中必须完整包含两把钥匙的物理核销凭证。 |
| **REQ-4** | **伪通与特判主动证伪测试规程**<br>(`FALSE_PASS_DETECTION_&_DYNAMIC_FALSIFICATION_STANDARD`) | **GIVEN** 现有基准测试输出 Exit Code 0；<br>**WHEN** Agent 执行主动介入审计时；<br>**THEN** Agent SHALL 审查是否存在局部假特判（硬编码返回值）、弱断言空跑或防御缺失；通过主动注入异常探针参数，验证系统底层机制的通用鲁棒性，根除“测试绿灯但实际不可用”的虚假繁荣。 | 1. 具备主动反向变异与异常探针注入测试记录；<br>2. 检出针对单一用例硬编码特判时判定为欺诈阻断；<br>3. 验证真实逻辑覆盖度与状态转移鲁棒性。 |
| **REQ-5** | **全系统 100% 纯通用软件工程抽象与情境彻底解耦门禁**<br>(`PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD`) | **GIVEN** 制定、编码、测试与固化双审计工具的全部规范与资产；<br>**WHEN** 编写宪法、规则、文档、测试用例与守卫脚本时；<br>**THEN** 系统 SHALL 100% 使用纯通用软件工程词汇（组件、接口、状态机、契约、断言、退出码、边界、数据流等）；严禁引入任何具体业务领域、行业规则或特定产品的专属词汇。 | 1. 规约与脚本中特定业务情境词汇命中数为 0；<br>2. 审计工具对 CLI、Web 应用、底层服务与工作流 100% 通用适用；<br>3. 领域中立性守卫（`npm run guard:neutrality`）实测 Exit Code 0。 |
| **REQ-6** | **最高宪法公理 68 立法与三镜像同构固化**<br>(`AXIOM_68_DUAL_AUDIT_TOOLING_CONSTITUTIONAL_LEGISLATION`) | **GIVEN** 完成双审计工具标准规程制定；<br>**WHEN** 固化至全系统核心宪法与规约时；<br>**THEN** 智能体 SHALL 将双审计工具规范作为 Axiom 68，同步写入 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md`（第 65 项），并在 `worker.md` 注入主动查看与测试的行为约束，保持 100% 纯通用工程抽象与测试全绿。 | 1. 三份宪法镜像中 Axiom 68 语义 100% 同构；<br>2. `worker.md` 包含 Agent 主动查看、主动测试的行为准则；<br>3. 自动化测试套件增补对应断言并实测全绿。 |
