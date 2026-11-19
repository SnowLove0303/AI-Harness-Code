# Proposal: Markdown Specification Deterministic Enforcement and Completion Hook Governance

## Why
When developing workflows or programs, agents frequently rely on Markdown documents to define rules, audit checklists, and execution details. However, agents often omit or skim these details due to context window attention decay and the advisory nature of natural language prose, leading to runtime failures. To ensure zero-omission compliance, the Ps-openspec system requires structured atomic Markdown specifications, lifecycle completion hooks (Stop Hooks), two-strike AST machine escalation, and automated compliance guards.

## What Changes
1. **Axiom 65 Legislation**: Codify `MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM` across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **Markdown Spec Atomic Structuring Protocol (`MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL`)**: Mandate structured specification formats with canonical IDs (`[SPEC-RULE-xx]`, `[AUDIT-CHECK-xx]`) over loose prose.
3. **Agent Lifecycle Completion Hook Gate (`AGENT_LIFECYCLE_COMPLETION_HOOK_GATE`)**: Establish Stop Hook completion guards intercepting agent finish signals and blocking termination with Exit Code 1 on unverified rules.
4. **Two-Strike AST Machine Escalation Mandate (`TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE`)**: Enforce machine-level AST rule or lint script creation for any Markdown rule violated twice.
5. **Workflow Step Single-Focus Statechart Standard (`WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD`)**: Enforce sequential task state machine progression (`[ ]` -> `[-]` -> `[x]`) on workflow details.
6. **Automated L2 Compliance Guard (`scripts/check-workflow-spec-compliance.mjs`)**: Provide mechanical clearance scanner registered as `npm run guard:workflow-spec`.
7. **Automated L2 Test Suite**: Implement `tests/workflow-spec-deterministic-enforcement.test.mjs` and adapter regressions.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求简述 | 详细契约与验收判据 |
| :--- | :--- | :--- |
| **REQ-1** | Markdown 规范与审计细节原子结构化规程 | 规范细节强制采用 `[SPEC-RULE-xx]` 结构化定义，杜绝散文隐匿。 |
| **REQ-2** | 工作流 Agent 完工断路器与生命周期拦截钩子规程 | 完工断路器（Stop Hook）在细节未全量实测通过时以 Exit Code 1 阻断退出。 |
| **REQ-3** | 自然语言细节两碰下沉为 AST/机器规则硬门禁 | 同类细节遗漏两次强制下沉为 AST 语法规则或校验脚本，禁止仅留散文。 |
| **REQ-4** | 工作流细节执行单焦点状态机锁定规程 | 工作流细节执行强制单焦点状态机串行流转，防注意力衰减与跳步。 |
| **REQ-5** | 自动化 L2 规范清算与断路器守卫工具链 | `scripts/check-workflow-spec-compliance.mjs` 静态守卫命令，违规 Exit Code 1 阻断。 |
| **REQ-6** | 最高宪法公理 65 立法与全系统三镜像同构固化 | 固化 Axiom 65 至三镜像，保持 100% 纯通用工程抽象与同构。 |
