# Design: Problem Ledger Incremental Merge & Per-Item Final Ruling Gate (Axiom 80)

1. **L2 Static Guard & State Machine (`scripts/check-problem-ledger-ruling.mjs`)**:
   - Export `mergeProblemLedgerDelta(prevLedger, deltaItems)` for lossless incremental merge (never replace/drop).
   - Export `validateProblemLedgerRuling(ledger, prevLedger = null)` enforcing:
     - `PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED` if any prior item ID is missing;
     - `DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED` if an item has `explanationProvided: true` without an explicit disposition;
     - `UNRULING_LEDGER_ITEMS_PENDING_BLOCKED` returning `pendingIds` (e.g., `['1', '3', '4']`) whenever any item remains `pending_ruling`.
   - CLI runner checks Axiom 80 parity across the 3 constitutional mirrors + `worker.md`.
2. **Constitutional Codification**:
   - Add Axiom 80 to `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 77), and `worker.md` (Section 1p).
3. **Tests & Global Sync**:
   - Add `tests/problem-ledger-ruling.test.mjs` (including the historical `[1, 2, 3, 4]` partial-reply-on-2 counterexample) and `scripts/tests/gemini-adapter.test.mjs` assertions; run `sync-to-global.mjs`, all 17 `guard:*` scripts, and push to `origin/release/ps-openspec-v2.00`.
