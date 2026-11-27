## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Create `skills/drawio-mcp/examples/flowchart.ir.json` and `skills/drawio-mcp/examples/swimlane.ir.json`.
- [x] Upgrade `skills/drawio-mcp/SKILL.md` into a complete, self-contained execution manual with IR schema, CLI commands, MCP rendering rules, and Axiom 81 checklist.
- [x] Update `scripts/sync-to-global.mjs` to sync `scripts/drawio-toolkit.mjs` into `config/skills/drawio-mcp/scripts/drawio-toolkit.mjs` and add a smoke test in `tests/drawio-toolkit.test.mjs` verifying the example IR templates compile & validate cleanly.
- [x] Run `node scripts/sync-to-global.mjs`, `node tests/drawio-toolkit.test.mjs`, `npm run guard:drawio-model`, and `npm run guard:privacy` (`Exit Code 0`), and verify the global bundled `drawio-toolkit.mjs` builds & validates both example IRs.

## 4. Step 4 & Step 5 Archival
- [x] Open modified files in VS Code, validate & archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and deliver the concise skill-first prompt.
