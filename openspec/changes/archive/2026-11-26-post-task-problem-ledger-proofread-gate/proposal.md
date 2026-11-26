# Change Proposal: Post-Task Problem Ledger Final Proofread Gate (Axiom 80 Completion Closure)

## Why
Even when a multi-item problem ledger is confirmed up front, an agent finishing remediation can still declare completion while leaving one or more non-excluded initial issues unresolved or unverified. A mandatory **Post-Task Problem Ledger Final Proofread Gate** is required to verify that 100% of initial atomic issues are `resolved`, except those explicitly excluded via interactive user ruling (`waived` / `deferred` with explicit rationale).

## What Changes
1. **REQ-01 & PROP-A/B (Post-Task Ledger Proofread Gate)**: Add `POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE` to Axiom 80 and `validatePostTaskLedgerProofread(ledger, options)` to `scripts/check-problem-ledger-ruling.mjs`, blocking completion with `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED` whenever any initial item is neither `resolved` nor explicitly excluded via interactive ruling (`waived`/`deferred` with rationale).
2. **REQ-02 & PROP-C (Constitutional Mirrors, Docs & Tests)**: Update `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, `worker.md`, `README.md`, and `tests/problem-ledger-ruling.test.mjs`, then run `sync-to-global.mjs`, all 17 `guard:*` + 5 test suites, archive OpenSpec, and push.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 & PROP-A/B | Post-Task Ledger Proofread & Interactive Exclusion Gate | `POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE` |
| REQ-02 & PROP-C | Axiom 80 Parity, Tests & Global Sync | `AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD` |
