## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Backport and clean `skills/drawio-mcp/USER_HARD_RULES_GUIDE.md` as the Draw.io root file.
- [x] Upgrade `skills/drawio-mcp/SKILL.md` and `GEMINI.md` / `pstack-openspec` / `ai-harness-openspec` to mandate reading `USER_HARD_RULES_GUIDE.md` first.
- [x] Upgrade `scripts/drawio-toolkit.mjs` with `DRW-01`~`DRW-08` layout & L2 validation + `replace-page` CLI.
- [x] Update `tests/drawio-toolkit.test.mjs`, run `sync-to-global.mjs`, all 17 `guard:*` scripts, and all 7 test suites (`Exit Code 0`).

## 4. Step 4 & Step 5 Archival
- [x] Open modified files in VS Code, validate & archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and deliver updated prompt.
