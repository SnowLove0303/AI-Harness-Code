# Proposal: Unified Self-Contained Draw.io Skill Package (`drawio-unified-skill-package`)

## 1. 1:1 Spec-Kit Requirement Traceability Matrix (RTM)

| Req ID | Requirement Summary | Acceptance Criteria |
|---|---|---|
| **REQ-01** | Package a unified, self-contained `drawio-mcp` skill bundle (`SKILL.md`, IR schema & examples, bundled `drawio-toolkit.mjs`, and MCP rendering workflow) synced automatically via `sync-to-global.mjs` with zero code duplication in git. | `C:\Users\Administrator\.gemini\config\skills\drawio-mcp\` contains `SKILL.md`, `scripts/drawio-toolkit.mjs`, `examples/flowchart.ir.json`, and `examples/swimlane.ir.json`; running `node .../.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs build ...` works from any directory; `tests/drawio-toolkit.test.mjs` and all L2 guards pass (`Exit Code 0`). |
| **REQ-02** | Provide a concise, copy-pasteable prompt instructing any Antigravity Agent to read and follow the unified `drawio-mcp` skill package. | The prompt references `drawio-mcp` directly without embedding verbose script internals and guides the Agent through IR -> compile/validate -> MCP render -> Axiom 81 disclosure. |
