# Proposal: Pipeline Core Generality Invariant & Anti-Single-Task Hardcoding Axiom

## Why

In pipeline-driven architectures (such as batch compilation, multi-format artifact rendering, and automated delivery pipelines), a recurring systemic failure occurs when agents attempt to fulfill a single task:
1. **Single-Task Driven Underlying Corruption (单情境满足驱动的底层窄化)**: When assigned to compile or refactor deliverables for a specific target specification, an agent frequently introduces hardcoded conditionals or specialized geometry/layout adjustments directly into the core engine (`if (target === '...')`), narrow-tailoring the engine to pass the immediate task at the cost of regressing other parallel or future pipelines.
2. **Scenario Identifier Leakage in Core & Governance Documentation (情境词汇泄漏至系统底座与说明)**: Agents often document task-specific product codes, individual batch labels, or scenario-specific tokens in core system rule files, commit messages, or living specifications, causing governance text to lose generality and become tightly coupled to ephemeral business instances.
3. **Absence of Multi-Scenario Collaborative Regression Gates (缺乏多情境协同回归门禁)**: Core engine modifications are tested solely against the single active task specimen, masking silent regressions across all other existing golden specimens.

To permanently eradicate this failure mode, the project manager has decreed an absolute governance law:
> "特别是流水线任务程序，禁止为了满足特定单一任务情境而修改底层程序，但凡修改底层就必须考虑以满足多个任务情境，要考虑通用型...要杜绝在系统内，包括任何的说明出现任何具体到单个流水线任务的改动和说明"

Crucially, as instructed by the user, this change itself is strictly domain-neutral and scenario-agnostic, formulated purely through universal software engineering principles.

This change legislates **公理五十三：流水线任务程序底层通用型保全与反单一任务硬编码公理 (`PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM`)**:
- **Pipeline Core Generality Invariant (`PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM`)**: Prohibit modifying pipeline core engines to satisfy a single task context; any core modification must satisfy and be verified against multiple task scenarios.
- **Zero Scenario-Pollution in Core & Docs (`ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM`)**: Strictly prohibit any single-task identifiers, concrete product codes, or specialized task labels inside core code, templates, or system specifications (`SINGLE_TASK_HARDCODING_BLOCKED`).
- **Multi-Scenario Collaborative Regression Gate (`MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE`)**: Mandate that underlying engine modifications execute concurrent regression verification across multiple golden specimens representing distinct scenarios.
- **Task Fact Parameterization & Engine Decoupling (`TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM`)**: Enforce physical decoupling where all instance-specific facts reside purely in external payloads/configs, while the engine remains a pure data-driven parameterizable mechanism.
- **Universal Pipeline Generality Standard (`UNIVERSAL_PIPELINE_GENERALITY_STANDARD`)**: 100% domain-neutral and validated by automated test suites.

## Original user request

> 还要再继续补充强调，特别是流水线任务程序，禁止为了满足特定单一任务情境而修改底层程序，但凡修改底层就必须考虑以满足多个任务情境，要考虑通用型，举个例子：比如Agent要通过底层重构后的流水线重新编译 PU-2346A 标准 8 格式交付物，那么这种情况下，需要改动底层的情况就不能只考虑满足PU-2346A进行系统硬编码，而应到考虑系统底层的改动会不会影响到其他型号的流水线任务，即，要杜绝在系统内，包括任何的说明出现任何具体到单个流水线任务的改动和说明，懂我意思？
> 执行，你写的时候，也要充分考虑到，本次对Ps-openspec 体系的改动也不能针对我说的这个流水线例子去改

- **Fact Fingerprint SHA-256**: `fb619d76445fe6418b135e0aec205337ab19671fee7930bd171952bb971d7e0e`
- **Gate 1 Ingestion Dossier**: [`2026-11-10-pipeline-task-generality-and-anti-single-task-hardcoding-GATE1.md`](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/gate1-dossiers/2026-11-10-pipeline-task-generality-and-anti-single-task-hardcoding-GATE1.md)

## What Changes

- Legislate `PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM` (Axiom 53) in `GEMINI.md`:
  - Enforce pipeline core multi-scenario generality invariant.
  - Ban single-task hardcoding and scenario token leakage in system core and docs (`SINGLE_TASK_HARDCODING_BLOCKED`).
  - Deploy `MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE`.
  - Mandate physical decoupling between external runtime payloads and general engines.
- Update `skills/pstack-openspec/SKILL.md` (Axiom 55) and `skills/ai-harness-openspec/SKILL.md` (Axiom 50).
- Codify new requirements into `openspec/specs/orbitstack-pstack-routing/spec.md`.
- Add Test 45 in `scripts/tests/gemini-adapter.test.mjs` verifying the invariant matrix.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- 还要再继续补充强调，特别是流水线任务程序，禁止为了满足特定单一任务情境而修改底层程序，但凡修改底层就必须考虑以满足多个任务情境，要考虑通用型
- 执行，你写的时候，也要充分考虑到，本次对Ps-openspec 体系的改动也不能针对我说的这个流水线例子去改

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify pipeline core generality invariance, anti-single-task hardcoding, and multi-scenario collaborative regression requirements.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
