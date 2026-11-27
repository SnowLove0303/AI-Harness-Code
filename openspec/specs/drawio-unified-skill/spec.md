# drawio-unified-skill Specification

## Purpose
TBD - created by archiving change drawio-unified-skill-package. Update Purpose after archive.

## Requirements

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

### Requirement: Draw.io Root Authority File Mandate
`skills/drawio-mcp/USER_HARD_RULES_GUIDE.md` MUST serve as the single root authority file for the Draw.io modeling and rendering system, synchronized to `~/.gemini/config/skills/drawio-mcp/USER_HARD_RULES_GUIDE.md`.

#### Scenario: Enforcing mandatory read-first gate in skill and constitution
- **WHEN** any Agent loads `drawio-mcp` or invokes the Draw.io system from `GEMINI.md`
- **THEN** the entry point MUST explicitly require reading `USER_HARD_RULES_GUIDE.md` in full before constructing IR or generating `.drawio` artifacts.

### Requirement: Unified DRW-01 through DRW-08 L2 Enforcement in drawio-toolkit.mjs
`scripts/drawio-toolkit.mjs` MUST enforce `DRW-01` monochrome palette, `DRW-02` canvas size ceiling (`3200x1300`), `DRW-05` midpoint ports (`0.5`), `DRW-06` in-place `replace-page`, `DRW-07` LR vertical centering, and `DRW-08` single-trunk orthogonal branching.

#### Scenario: Rejecting non-monochrome or oversized or off-center LR diagrams
- **WHEN** `validateDrawioGeometry` inspects a diagram violating `DRW-01`, `DRW-02`, `DRW-05`, or `DRW-07`
- **THEN** it MUST fail validation with the corresponding blocking error code (`NON_MONOCHROME_STYLE_BLOCKED`, `CANVAS_SIZE_EXCEEDED_BLOCKED`, `NON_MIDPOINT_PORT_DETECTED`, or `NON_VERTICALLY_CENTERED_LR`).
