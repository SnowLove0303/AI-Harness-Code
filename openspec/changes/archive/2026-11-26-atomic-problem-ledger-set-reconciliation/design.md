# Design: Atomic Problem Ledger & Set-Difference Reconciliation Gate

1. **L2 Guard Enhancement (`scripts/check-problem-ledger-ruling.mjs`)**:
   - Extend `AXIOM_80_REQUIRED_TOKENS` with `ATOMIC_ONE_DEFECT_ONE_ID_MANDATE`, `APPEND_ONLY_SET_DIFFERENCE_RECONCILIATION_GATE`, `BUNDLED_ISSUE_ID_BLOCKED`, `LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED`, `PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED`.
   - Extend `validateProblemLedgerRuling(ledger, prevLedger = null, options = {})` to check:
     - `isBundled === true` or `Array.isArray(item.subIssues) && item.subIssues.length > 1` -> `BUNDLED_ISSUE_ID_BLOCKED`;
     - `options.sourceAtomicIds` set difference (`missingFromSourceIds`) -> `LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED`;
     - `status === 'waived'` without non-empty `waiverRationale` -> `PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED`.
2. **Constitutional Mirrors & Docs**:
   - Update Axiom 80 in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 77), `worker.md` (Section 1p), and `README.md`.
3. **Tests & Global Sync**:
   - Add historical funnel counterexample tests in `tests/problem-ledger-ruling.test.mjs`, run `sync-to-global.mjs` and all 17 `guard:*` + 5 test suites, archive OpenSpec, and push.
