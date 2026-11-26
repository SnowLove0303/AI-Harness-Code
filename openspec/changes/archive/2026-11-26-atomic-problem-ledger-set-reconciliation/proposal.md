# Change Proposal: Atomic Problem Ledger & Set-Difference Reconciliation Gate (Axiom 80 Enhancement)

## Why
Forensic analysis of multi-turn issue-resolution sessions revealed two remaining funnel-leakage vectors even when an initial issue list is confirmed:
1. **Bundled/Compound Issue IDs**: Packing multiple distinct defects under one ID (e.g., topology rule + missing punctuation + blank line) causes a user waiver on the primary sub-issue to silently swallow valid sibling defects.
2. **Multi-Turn Rewrite Evaporation**: Rewriting summaries from memory after deep-diving into one focal item drops non-focal items unless enforced by an append-only ledger and mathematical set-difference reconciliation against the original atomic source set.

## What Changes
1. **REQ-01 (Atomic One-Defect-One-ID Mandate)**: Prohibit bundled multi-defect entries (`BUNDLED_ISSUE_ID_BLOCKED`); require splitting multi-part findings into independent atomic IDs (`ATOMIC_ONE_DEFECT_ONE_ID_MANDATE`).
2. **REQ-02 & PROP-A/B (Append-Only Ledger & Set-Difference Reconciliation)**: Enforce `Source_Atomic_Set - (Actionable_Fix_Set ∪ Explicit_Per_Item_Waived_Set) == ∅` (`LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED`) and require explicit per-atomic-ID `waiverRationale` (`PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED`) before presenting plans or authoring OpenSpec specs.
3. **REQ-03 & PROP-C (L2 Guard, Mirrors & Historical Counterexamples)**: Upgrade `scripts/check-problem-ledger-ruling.mjs`, `tests/problem-ledger-ruling.test.mjs`, `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, `worker.md`, and `README.md`.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 | Atomic One-Defect-One-ID & Anti-Bundling | `ATOMIC_ONE_DEFECT_ONE_ID_MANDATE` |
| REQ-02 & PROP-A/B | Set-Difference Reconciliation & Per-Atomic Waiver | `APPEND_ONLY_SET_DIFFERENCE_RECONCILIATION_GATE` |
| REQ-03 & PROP-C | L2 Guard, Mirrors & Historical Counterexamples | `AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD` |
