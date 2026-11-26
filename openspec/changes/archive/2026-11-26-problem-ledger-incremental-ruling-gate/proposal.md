# Change Proposal: Problem Ledger Incremental Merge & Per-Item Final Ruling Counter-Questioning Gate (Axiom 80)

## Why
When an Agent holds a multi-item Problem Ledger (whether generated during execution/audit or supplied by the user, e.g. items `1, 2, 3, 4`) and asks the user for confirmation, users frequently supplement or explain only a subset of items (e.g. supplementing item `2`). Agents often mistakenly overwrite the ledger or treat the partial reply as scope to fix only item `2` while silently dropping items `1, 3, 4`.

## What Changes
1. **REQ-01 (Incremental Merge, Never Replace)**: Mandate `PROBLEM_LEDGER_INCREMENTAL_MERGE_MANDATE` for both task-generated and user-provided problem ledgers—supplements and new items merge incrementally via `mergeProblemLedgerDelta`, blocking any replacement/drop of prior items (`PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED`).
2. **REQ-02 & PROP-A/B (Per-Item Final Ruling State Machine & Active Counter-Questioning)**: Require explicit per-item ruling states (`pending_ruling`, `approved_fix`, `deferred`, `waived`, `resolved`). When a user explains an item without a concrete disposition (`DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED`) or rules only on a subset (e.g. item `2`), block premature closure (`UNRULING_LEDGER_ITEMS_PENDING_BLOCKED`) and require active counter-questioning on all remaining unruled items (`1, 3, 4`) until 100% of items have explicit final rulings.
3. **REQ-03 & PROP-C (L2 Guard & Three-Mirror Parity)**: Add `scripts/check-problem-ledger-ruling.mjs` (`npm run guard:problem-ruling`), register in `package.json` & `.harness/project-graph.json`, codify **Axiom 80** across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Invariant 77), and `worker.md` (Section 1p), and add `tests/problem-ledger-ruling.test.mjs` + `scripts/tests/gemini-adapter.test.mjs` assertions.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 | Incremental Merge for Both Ledger Sources | `PROBLEM_LEDGER_INCREMENTAL_MERGE_MANDATE` |
| REQ-02 & PROP-A | Active Counter-Questioning & Final Ruling Gate | `PARTIAL_REPLY_COUNTER_QUESTIONING_GATE` |
| REQ-03 & PROP-B/C | L2 `guard:problem-ruling` & Axiom 80 Parity | `AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD` |
