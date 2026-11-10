# Proposal: Tri-Phase Global Task Execution Strategy & System Mutation vs Scenario Triage

## Why

In multi-agent collaborative engineering, two opposing anti-patterns persistently degrade system quality and generality:
1. **Symptom-Level Patching (就事论事创可贴)**: Agents encounter a concrete business defect and immediately apply ad-hoc, surface-level fixes at the calling site or peripheral wrapper, without abstracting the root architectural flaw. Consequently, the identical failure mode recurs whenever the context shifts to another scenario or project.
2. **Scenario-Polluted System Narrowing (情境化篡改底层)**: Agents attempting to fix system core engines introduce single-scenario branch logic, concrete business identifiers, or hardcoded heuristics tailored to one isolated case. This corrupts the orthogonality of the underlying mechanism, narrows engine generality, and causes regressions across other legitimate scenarios.

To permanently harmonize thorough problem resolution with universal platform integrity, the project manager has decreed a mandatory global execution paradigm:
> "改变下全局任务执行策略，务必是遵循以下步骤：1.排出具体存在的业务问题；2.通过业务问题抽象出通用问题并通过系统底层解决（并非聚焦于单个任务情境的，而是为了让整个系统适配所以情境，防止所有情境下出现相同的问题）；3.通过系统通用性修改解决具体业务问题并验证；需要注意的是，一定要区分好 什么情况下应该改系统，什么情况下只针对情境去解决，防止通过系统底层修改导致只聚焦于单一情境限制程序通用性"

This change legislates **公理五十二：全局任务执行三阶闭环与底层修改分流公理 (`TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM`)**:
- **Tri-Phase Global Task Execution Strategy (`TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY`)**: Phase 1 (Enumerate concrete business defects) -> Phase 2 (Abstract universal root cause and resolve in system core) -> Phase 3 (Resolve concrete defect via generalized capability and verify empirically).
- **Universal Abstraction & Cross-Scenario Immunity (`UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL`)**: Core system changes must solve the general class of problem, providing immunity across all scenarios rather than patching an isolated context.
- **System Mutation vs Scenario Policy Triage (`SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM`)**: Explicit decision criteria for when to mutate system core (mechanism gaps, state machine invariants, cross-cutting rules) versus when to resolve within scenario policies (custom formatting, single-case business rules, project whitelists).
- **Anti-Scenario System Narrowing Blocker (`ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED`)**: Statically blocks injecting scenario-specific identifiers or single-case branches into core engines.
- **Universal Engineering Purity (`UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD`)**: 100% domain-neutral and verified via automated test suites.

## Original user request

> 改变下全局任务执行策略，务必是遵循以下步骤：1.排出具体存在的业务问题；2.通过业务问题抽象出通用问题并通过系统底层解决（并非聚焦于单个任务情境的，而是为了让整个系统适配所以情境，防止所有情境下出现相同的问题）；3.通过系统通用性修改解决具体业务问题并验证；需要注意的是，一定要区分好 什么情况下应该改系统，什么情况下只针对情境去解决，防止通过系统底层修改导致只聚焦于单一情境限制程序通用性
> 执行

- **Fact Fingerprint SHA-256**: `7fe624c185171430b84b0929ce7e1ccf65ac6b6dba44b4fec3fa3e52a3c87b5e`
- **Gate 1 Ingestion Dossier**: [`2026-11-10-tri-phase-global-task-execution-strategy-GATE1.md`](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/gate1-dossiers/2026-11-10-tri-phase-global-task-execution-strategy-GATE1.md)

## What Changes

- Legislate `TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM` (Axiom 52) in `GEMINI.md`:
  - Codify the mandatory 3-phase execution cycle.
  - Establish universal abstraction and cross-scenario immunity standards.
  - Define system mutation vs scenario policy triage decision boundaries.
  - Deploy `ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED` static gate.
- Update `skills/pstack-openspec/SKILL.md` (Axiom 54) and `skills/ai-harness-openspec/SKILL.md` (Axiom 49).
- Codify new requirements into `openspec/specs/orbitstack-pstack-routing/spec.md`.
- Add Test 44 in `scripts/tests/gemini-adapter.test.mjs` verifying the invariant matrix.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- 改变下全局任务执行策略，务必是遵循以下步骤：1.排出具体存在的业务问题；2.通过业务问题抽象出通用问题并通过系统底层解决（并非聚焦于单个任务情境的，而是为了让整个系统适配所以情境，防止所有情境下出现相同的问题）；3.通过系统通用性修改解决具体业务问题并验证；需要注意的是，一定要区分好 什么情况下应该改系统，什么情况下只针对情境去解决，防止通过系统底层修改导致只聚焦于单一情境限制程序通用性
- 执行

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify tri-phase global task execution cycle, universal abstraction immunity, and system-vs-scenario triage decision topology.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
