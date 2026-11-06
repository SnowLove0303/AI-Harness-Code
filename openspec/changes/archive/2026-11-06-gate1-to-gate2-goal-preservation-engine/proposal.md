# Proposal: Gate 1 Markdown Materialization & End-to-End Zero Goal Loss Axiom

## Why

In multi-phase agent workflows, a pervasive architectural failure is "Layered Goal Loss" (层层目标丢失 / Goal Degradation Cascade):
1. **Gate 1 (Step 0) Ingestion Degradation**: The initial user instruction and the thorough feedback analysis are treated as ephemeral chat text, vulnerable to context truncation, summarization loss, and amnesia across turns.
2. **Gate 2 (Step 2) Specification Loss**: When transitioning to OpenSpec authoring (`proposal.md`, `specs/`, `design.md`, `tasks.md`), agents often drop hard-won constraints, weaken acceptance criteria, or omit specific consensus items agreed upon in Gate 1.
3. **Execution (Step 3) Implementation Drift**: During code construction or subagent delegation, the execution agent focuses narrowly on abbreviated task labels, completely detached from the Gate 1 consensus and Gate 2 specifications, resulting in delivered code that fails the user's original intent.

This change legislates the Gate 1 Markdown Materialization & End-to-End Zero Goal Loss Axiom (`GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM`) across Ps-openspec:
- **Gate 1 Markdown Materialization (`GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL`)**: Mandate that Gate 1 physically generate an immutable `.md` asset containing two non-negotiable sections: Section A (100% verbatim raw user instruction with SHA-256 fact fingerprint) and Section B (deep forensic feedback, fact reconciliation, and acceptance criteria).
- **Gate 2 OpenSpec Zero Goal Loss Inheritance (`GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE`)**: Mandate that OpenSpec authoring strictly ingest the Gate 1 Markdown asset as ground truth; every consensus point in Gate 1 must map 1:1 to an RFC 2119 requirement and an atomic task.
- **Execution Goal Invariance Lock (`EXECUTION_PHASE_GOAL_INVARIANCE_LOCK`)**: Enforce that the execution phase inherits the complete Gate 1-Gate 2 contract via Four-in-One capsules; tasks can only be completed upon satisfying Gate 1 acceptance criteria.
- **Layered Goal Degradation Circuit Breaker (`GOAL_DEGRADATION_DETECTED`)**: Automatically halt any pipeline where downstream assets omit, dilute, or contradict Gate 1 requirements.
- **Universal Engineering Language (`UNIVERSAL_GOAL_PRESERVATION_STANDARD`)**: 100% domain-neutral and scenario-agnostic.

## Original user request

> 另外还是调整双门禁体系，第一道门禁先用md记录接收的来源于我的完整的任务说明以及给我的反馈，比如txt那样，第二道是基于md使用Ps-openspec 体系@[c:\Users\Administrator\Desktop\新建 文本文档.txt]
> 执行，重点解决第一门禁讨论的结果到第二门禁再到执行的层层目标丢失问题

## What Changes

- Legislate `GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM` (Axiom 49) in `GEMINI.md`:
  - Require Gate 1 physical Markdown materialization with Section A and Section B.
  - Require Gate 2 OpenSpec 1:1 inheritance from Gate 1 Markdown.
  - Enforce Execution-Phase Goal Invariance Lock.
  - Deploy `GOAL_DEGRADATION_DETECTED` circuit breaker.
  - Enforce universal domain-agnostic software engineering abstraction.
- Update `skills/pstack-openspec/SKILL.md` (Axiom 51) and `skills/ai-harness-openspec/SKILL.md` (Axiom 46).
- Codify new requirements in `openspec/specs/orbitstack-pstack-routing/spec.md`.
- Add Test 41 in `scripts/tests/gemini-adapter.test.mjs` verifying the complete invariant matrix.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- 执行，重点解决第一门禁讨论的结果到第二门禁再到执行的层层目标丢失问题

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify Gate 1 Markdown persistence, Gate 2 OpenSpec inheritance, and end-to-end zero goal loss requirements into routing specifications.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
