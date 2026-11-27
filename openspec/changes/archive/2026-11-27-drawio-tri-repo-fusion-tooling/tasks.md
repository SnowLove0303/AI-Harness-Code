## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 1 & Step 2 OpenSpec & Gate 2
- [x] Shallow-clone and analyze `next-ai-draw-io`, `drawio-skill`, and `drawio-mcp-server` in isolated scratch directory.
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing repo files.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Create `scripts/drawio-toolkit.mjs` (`buildFlowchartOrSwimlaneXml`, `mutateDrawioXml`, `validateDrawioGeometry`, plus CLI).
- [x] Wire `validateDrawioGeometry` into `scripts/check-drawio-model.mjs` (`guard:drawio-model`).
- [x] Update `skills/drawio-mcp/SKILL.md`, `.harness/project-graph.json`, `scripts/sync-to-global.mjs`, and `README.md`.
- [x] Author `tests/drawio-toolkit.test.mjs`, run `node scripts/sync-to-global.mjs`, all 17 `guard:*` scripts, and all 6 test suites (`Exit Code 0`).
- [x] Open modified core files in VS Code for review.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
