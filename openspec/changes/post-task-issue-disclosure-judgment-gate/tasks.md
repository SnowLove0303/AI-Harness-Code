## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [ ] Add `validatePostTaskIssueDisclosure` and `AXIOM_81_REQUIRED_TOKENS` parity check to `scripts/check-problem-ledger-ruling.mjs`.
- [ ] Codify Axiom 81 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 78), `worker.md` (Section 1q), and `README.md`.
- [ ] Add Axiom 81 tests to `tests/problem-ledger-ruling.test.mjs` and `scripts/tests/gemini-adapter.test.mjs`.
- [ ] Run `node scripts/sync-to-global.mjs`, all 17 `guard:*` scripts, and all 5 test suites (`Exit Code 0`), and open modified files in VS Code.

## 4. Step 4 & Step 5 Archival
- [ ] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
