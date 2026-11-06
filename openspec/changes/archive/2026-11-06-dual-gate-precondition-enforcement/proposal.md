# Proposal: Statutory Dual-Gate Entry Precondition & Anti-Premature Execution Enforcement

## Why

In session `7f4d4b46-78e6-435a-aa29-f0d6ec194caa` (Step 21502), the agent received a multi-part defect and architecture directive, but bypassed both Step 0 Gate 1 (Requirement Confirmation Dossier) and Step 2 Gate 2 (OpenSpec Proposal & Dual-Checklist authorization). Instead, it immediately began writing scripts, modifying code, and triggering pipelines unilaterally based on a misinterpretation of "PStack autonomy", resulting in fundamentally misdiagnosed root causes and user frustration.
This change legislates the Statutory Dual-Gate Entry Precondition Axiom (`STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM`) across the entire Ps-openspec system: every incoming task must strictly halt at Gate 1 for 1:1 requirement alignment and halt at Gate 2 for specification authorization. PStack autonomy is strictly restricted to Step 3 single-focus execution. Unauthorized autonomous execution without prior requirement alignment is explicitly prohibited.

## Original user request

> 7f4d4b46-78e6-435a-aa29-f0d6ec194caa  接收任务后没有与我做双门禁确认，你去重新排一下Ps-openspec体系

## Append directives

> 执行，另外要限制一下，有些Agent老是尚自不经确认就执行或者没有先好好理解需求就去执行了

## What Changes

- Legislate `STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM` (Axiom 44) in `GEMINI.md`: upon receiving any new user request or problem report, the agent is strictly prohibited from invoking file-modifying, code-writing, or pipeline-triggering tools in turn 1. It must present the full Spec-Kit Requirement Confirmation Dossier (Gate 1) and halt for user confirmation.
- Restrict PStack autonomy scope: PStack inner-loop autonomy is strictly bounded within Step 3 under the single-focus execution lock `[-]`. Autonomy is explicitly stripped from Step 0 and Step 2.
- Enforce mandatory requirement comprehension: agents are strictly forbidden from premature execution without thorough requirement understanding and mutual alignment.
- Update `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md` to reflect the statutory dual-gate precondition and anti-premature execution constraint.
- Refactor `pstack-openspec-route-map.json` gate definitions to eliminate misleading blanket autonomy phrasing and declare Gate 1 / Gate 2 preconditions.
- Add automated regression test (Test 36) in `scripts/tests/gemini-adapter.test.mjs` verifying dual-gate preconditions and autonomy boundary enforcement.
- Synchronize all updated assets to the global environment via `scripts/sync-to-global.mjs`.

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Formally codify the Statutory Dual-Gate Entry Precondition and Anti-Premature Execution Invariant into the routing specification.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `orbitstack-gemini/SKILL.md`
- `docs/pstack-openspec-route-map.json` and global route map
- `scripts/tests/gemini-adapter.test.mjs`
