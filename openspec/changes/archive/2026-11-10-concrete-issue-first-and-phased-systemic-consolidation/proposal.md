# Proposal: Concrete Issue Priority & Phased Systemic Consolidation Axiom

## Why

When agents receive user bug reports under Ps-openspec, a frequent failure mode emerges: agents prematurely hypothesize systemic root causes and spend excessive time modifying shared system code or docs, yet the user's concrete issue remains unresolved, and sweeping low-level mutations trigger cascading regressions.

To permanently eradicate this anti-pattern and align with Lauren Tan (@poteto) engineering principles (`principle-sequence-verifiable-units`, `blast-radius`, `principle-fix-root-causes`, `correct`), this proposal establishes the **Concrete Issue Priority & Phased Systemic Consolidation Axiom (`CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM`)**.

Gate 1 and Gate 2 explicitly decouple concrete issues from systemic hypotheses. Phase 1 enforces concrete issue resolution under `SYSTEM_CORE_READONLY_LOCK`. After human verification, Phase 2 consolidates systemic invariants backed by multi-scenario regression gates and atomic rollback.

## Original user request

> 继续补Ps-openspec 的任务执行准则：关于1、2 门禁，在确认的过程中需要区分：具体问题和通用改动（对系统底层或相关资料的改动），目前发现的核心问题是，Agent 使用Ps-openspec 时，核心聚焦于改动过多的系统底层或相关资料，但是最后在任务结束时都没有解决具体的问题，比如我发现A有问题，目前Agent会按照Ps-openspec 去找根因，但总会存在偏差，即花了较长时间去解决根因，但最终结果就是，我反馈的具体问题没有被解救，甚至对根因的改动还导致了一系列连串的问题，因此我觉得当存在具体问题时，应当优先保证具体问题被解决，经我确认后对系统底层进行确认和固化，或者你有没有更好的方案，参考poteto

- **Fact Fingerprint SHA-256**: `f3ab9945d468fe24e9752a2886191b7375413e45a6ac26bcd6a403ce6ef10f18`
- **Gate 1 Ingestion Dossier**: [`2026-11-10-concrete-issue-first-and-phased-systemic-consolidation-GATE1.md`](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/gate1-dossiers/2026-11-10-concrete-issue-first-and-phased-systemic-consolidation-GATE1.md)

## What Changes

- Legislate `CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM` (Axiom 54) in `GEMINI.md`:
  - Gate 1 dual-scope decoupling (`GATE1_DUAL_SCOPE_DECOUPLING_RULE`).
  - Phase 1 targeted resolution and system core read-only lock (`PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK`).
  - Human stage confirmation collaborative gate (`HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE`).
  - Phase 2 ground-truth-driven systemic consolidation and regression net (`PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET`).
  - Pure domain-neutral software engineering standard (`UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD`).
- Update `skills/pstack-openspec/SKILL.md` (Axiom 56) and `skills/ai-harness-openspec/SKILL.md` (Axiom 51).
- Codify new requirements into `openspec/specs/orbitstack-pstack-routing/spec.md`.
- Add Test 46 in `scripts/tests/gemini-adapter.test.mjs` verifying the invariant matrix.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- 关于1、2 门禁，在确认的过程中需要区分：具体问题和通用改动（对系统底层或相关资料的改动）
- 应当优先保证具体问题被解决，经我确认后对系统底层进行确认和固化，参考poteto

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify concrete issue priority, dual-scope decoupling, core read-only locks, and phased systemic consolidation requirements.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
