## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Create `scripts/check-problem-ledger-ruling.mjs` and register `guard:problem-ruling` in `package.json` and `.harness/project-graph.json`.
- [x] Codify Axiom 80 (`PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 77), and `worker.md` (Section 1p).
- [x] Author `tests/problem-ledger-ruling.test.mjs` and add Axiom 80 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Run `node scripts/sync-to-global.mjs`, all 17 `guard:*` scripts, and all 5 test suites (`Exit Code 0`), and open modified core files in VS Code.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
