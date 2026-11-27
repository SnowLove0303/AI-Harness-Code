# Design: Draw.io Root Authority (`USER_HARD_RULES_GUIDE.md`) & DRW-01~DRW-08 Unification

1. **Root File Placement**: `skills/drawio-mcp/USER_HARD_RULES_GUIDE.md` is the canonical root file in `AI-Harness-Code`, synced automatically by `scripts/sync-to-global.mjs` to `C:\Users\Administrator\.gemini\config\skills\drawio-mcp\USER_HARD_RULES_GUIDE.md`.
2. **Mandatory Read-First Gate**:
   - `skills/drawio-mcp/SKILL.md` places a prominent `【最高法定根文件】` gate at the very top requiring every Agent to read `USER_HARD_RULES_GUIDE.md` first.
   - `GEMINI.md` (and `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) adds the `drawio-mcp` root-file mandate in the Action Skill Layer Index / Axiom 76 binding.
3. **Toolkit (`scripts/drawio-toolkit.mjs`) Enhancements**:
   - `NODE_STYLE_MAP` and swimlane styles use the `DRW-01` monochrome whitelist (`#FFFFFF`, `#F8F8F8`, `#000000`, `#333333`, `#666666`).
   - `buildFlowchartOrSwimlaneXml` supports `LR` vertical centering (`DRW-07`), `0.5` midpoint ports (`DRW-05`), and single-trunk `trunkX` 90-degree branching (`DRW-08`).
   - `validateDrawioGeometry` enforces `NON_MONOCHROME_STYLE_BLOCKED`, `CANVAS_SIZE_EXCEEDED_BLOCKED` (`3200x1300`), `NON_MIDPOINT_PORT_DETECTED`, and `NON_VERTICALLY_CENTERED_LR`.
   - CLI supports `replace-page <master.drawio> <pageId> <singlePage.drawio>` (`DRW-06`).
