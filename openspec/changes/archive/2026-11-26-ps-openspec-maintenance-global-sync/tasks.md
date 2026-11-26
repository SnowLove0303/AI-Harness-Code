## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author `proposal.md`, `specs/orbitstack-pstack-routing/spec.md`, `design.md`, `tasks.md` and validate via `npx openspec validate ps-openspec-maintenance-global-sync --strict`.
- [x] Create Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Refactor `scripts/sync-to-global.mjs` to table-driven sync covering all 10 skills and all L2 guard scripts.
- [x] Update `README.md` to reflect current 15 `guard:*` gates, 10 skills, and global sync workflow while passing `guard:neutrality` and `guard:unslop`.
- [x] Run `node scripts/sync-to-global.mjs`, all 15 `guard:*` scripts, and test suites (`Exit Code 0`).
- [x] Open modified files in VS Code for review.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
