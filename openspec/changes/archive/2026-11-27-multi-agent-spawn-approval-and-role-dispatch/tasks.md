## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and complete Step 1 poteto architecture exploration.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Upgrade `scripts/check-agent-lifecycle.mjs` with Axiom 82 (`humanAuthorized` gate for all spawns, priority reuse, `roleTag` + `roleDetail` enforcement, `ROLE_TASK_MISMATCH_BLOCKED`, and 3-mirror + `worker.md` parity).
- [x] Codify Axiom 82 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 79), `worker.md` (Section 1r), and `README.md`.
- [x] Add `tests/agent-lifecycle-governance.test.mjs` and update `scripts/tests/gemini-adapter.test.mjs`.
- [x] Run `node scripts/sync-to-global.mjs`, all 17 `guard:*` scripts, and all test suites (`Exit Code 0`), and open modified files in VS Code.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
