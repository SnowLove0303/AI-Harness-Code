## ADDED Requirements

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
