# Design: Post-Task Problem Ledger Final Proofread Gate

1. **L2 Guard Extension (`scripts/check-problem-ledger-ruling.mjs`)**:
   - Export `validatePostTaskLedgerProofread(ledger, { sourceAtomicIds })`:
     - First runs `validateProblemLedgerRuling(ledger, null, { sourceAtomicIds })` (ensuring no dropped IDs, no bundled IDs, no pending rulings, and explicit rationale on waivers).
     - Then verifies every item is either `status === 'resolved'` OR (`status === 'waived' || status === 'deferred'`) with explicit `waiverRationale` / `exclusionRationale` (`interactiveExcluded === true` or rationale present).
     - Any other item (e.g. `approved_fix` not yet `resolved`) triggers `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED` with `unresolvedIds`.
2. **Constitutional & Documentation Parity**:
   - Add `POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE` & `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED` to `AXIOM_80_REQUIRED_TOKENS`, `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, `worker.md`, and `README.md`.
3. **Tests & Global Sync**:
   - Add positive and negative post-task proofread tests in `tests/problem-ledger-ruling.test.mjs`, run `sync-to-global.mjs`, all 17 `guard:*` + 5 test suites, archive, and push.
