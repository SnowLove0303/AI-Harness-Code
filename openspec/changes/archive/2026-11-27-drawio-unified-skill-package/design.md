# Design: Unified Self-Contained `drawio-mcp` Skill Package

## Architecture & Single-Source-of-Truth Sync
To satisfy **REQ-01** without duplicating `scripts/drawio-toolkit.mjs` in git:
1. `scripts/drawio-toolkit.mjs` remains the single authoritative source in `AI-Harness-Code`.
2. `scripts/sync-to-global.mjs` copies `skills/drawio-mcp/` (including `SKILL.md` and `examples/*.ir.json`) AND copies `scripts/drawio-toolkit.mjs` into `~/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs`.
3. `skills/drawio-mcp/SKILL.md` documents:
   - Self-contained skill script invocation (`~/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs`)
   - Complete Diagram IR JSON schema (`title`, `direction`, `lanes`, `nodes`, `edges`) and node/edge types
   - Incremental editing API (`mutateDrawioXml`)
   - L2 geometric scoring gate (`validate`)
   - Dual-channel MCP rendering (`drawio` `open_drawio_xml` / `drawio-cloud` `create_diagram`)
   - Post-task Axiom 81 disclosure
4. `skills/drawio-mcp/examples/` provides `flowchart.ir.json` and `swimlane.ir.json` as minimal valid IR templates, which are verified by running the bundled `drawio-toolkit.mjs build` + `validate`.
