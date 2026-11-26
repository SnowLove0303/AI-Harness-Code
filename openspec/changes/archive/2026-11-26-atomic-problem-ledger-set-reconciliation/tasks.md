## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Upgrade `scripts/check-problem-ledger-ruling.mjs` with `BUNDLED_ISSUE_ID_BLOCKED`, `LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED`, and `PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED`.
- [x] Update Axiom 80 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, `worker.md`, and `README.md`.
- [x] Add historical funnel counterexample tests to `tests/problem-ledger-ruling.test.mjs`.
- [x] Run `node scripts/sync-to-global.mjs`, all 17 `guard:*` scripts, and all 5 test suites (`Exit Code 0`), and open modified files in VS Code.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
