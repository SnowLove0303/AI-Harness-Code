## ADDED Requirements

### Requirement: Self-Contained Unified Draw.io Skill Bundle
The `drawio-mcp` skill package MUST be self-contained under the global skills directory (`~/.gemini/config/skills/drawio-mcp/`) while keeping `scripts/drawio-toolkit.mjs` as the single authoritative source in the repository.

#### Scenario: Cross-workspace execution without repo path coupling
- **WHEN** an Agent in any workspace loads the `drawio-mcp` skill
- **THEN** the Agent finds complete Diagram IR schema documentation, runnable example IR files (`examples/flowchart.ir.json`, `examples/swimlane.ir.json`), and a runnable `scripts/drawio-toolkit.mjs` inside the skill's own directory
- **AND** `sync-to-global.mjs` synchronizes `scripts/drawio-toolkit.mjs` to `config/skills/drawio-mcp/scripts/drawio-toolkit.mjs` automatically without duplicating the script source in the repository.

### Requirement: Concise Skill-First Delivery Prompt
The delivered prompt MUST direct the Agent to read and execute the `drawio-mcp` skill package rather than duplicating toolkit implementation details inline.

#### Scenario: User delivers prompt to an Antigravity Agent
- **WHEN** the user pastes the delivery prompt with a business process description
- **THEN** the Agent loads `drawio-mcp`, compiles IR via the skill's bundled toolkit, verifies `validateDrawioGeometry` passes with Exit Code 0, renders via `drawio` / `drawio-cloud` MCP, and reports any encountered issues per Axiom 81.
