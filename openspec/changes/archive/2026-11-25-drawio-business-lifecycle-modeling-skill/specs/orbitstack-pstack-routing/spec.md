## ADDED Requirements

### Requirement: Structured Enterprise Lifecycle Modeling & Swimlane Grid Compiler (REQ-1, PROP-C, PROP-D, PROP-E)
When constructing dense business process or enterprise R&D lifecycle models for Draw.io MCP, agents SHALL model Stages, Swimlanes, Decision Gates, Loopbacks, and Deliverable Artifacts in structured IR (`ENTERPRISE_LIFECYCLE_STRUCTURED_MODELING`) and compile coordinates deterministically (`DETERMINISTIC_SWIMLANE_GRID_COMPILER`) with CJK/Latin text-fit sizing (`TEXT_FIT_MARGIN_ANTI_CLIPPING_RULE`) and optional L0/L1 multi-page `<diagram>` projection (`MULTI_PAGE_L0_L1_DIAGRAM_PROJECTION`).

#### Scenario: Compiler outputs non-overlapping multi-page Draw.io XML
- **WHEN** `compileBusinessLifecycleToDrawioXml` compiles a multi-lane, multi-stage lifecycle model with L1 subpages
- **THEN** the resulting XML SHALL contain valid `<mxfile>` and `<diagram>` elements and pass `validateDrawioXml` with 0 overlaps and 0 dangling edges.

### Requirement: Upgraded Draw.io Business Modeling Skill (`skills/drawio-mcp/SKILL.md`) (REQ-2)
The repository SHALL maintain `skills/drawio-mcp/SKILL.md` (`DRAWIO_SWIMLANE_&_GATE_STYLE_STANDARD`) specifying `mxGraphModel` swimlane styles, Stage-Gate diamond/artifact styles, `routing="libavoid"`, and `set_page` multi-page editing workflows.

#### Scenario: Skill file documents swimlanes, Stage-Gate styles, and guard command
- **WHEN** `tests/drawio-business-modeling.test.mjs` inspects `skills/drawio-mcp/SKILL.md`
- **THEN** it SHALL verify swimlane, Stage-Gate, `libavoid`, and `guard:drawio-model` guidance.

### Requirement: Diagram-as-Test L2 Draw.io XML Guard (REQ-3)
The repository SHALL provide `scripts/check-drawio-model.mjs` (`AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD`, registered as `npm run guard:drawio-model`) to detect overlapping sibling nodes (`DRAWIO_NODE_OVERLAP_BLOCKED`), dangling edges (`DRAWIO_DANGLING_EDGE_BLOCKED`), and invalid XML structure (`DRAWIO_INVALID_XML_BLOCKED`).

#### Scenario: Overlapping nodes or dangling edges fail guard with Exit Code 1
- **WHEN** `validateDrawioXml` inspects XML containing two overlapping sibling boxes or an edge referencing a missing `target` ID
- **THEN** it SHALL fail with `DRAWIO_NODE_OVERLAP_BLOCKED` or `DRAWIO_DANGLING_EDGE_BLOCKED`.

### Requirement: Axiom 76 Constitutional Codification & Parity (REQ-4)
The Draw.io business lifecycle modeling standard and Diagram-as-Test guard SHALL be codified as **Axiom 76** (`DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 73) using pure universal software engineering abstractions (`AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: L2 tests and three-mirror parity pass with Exit Code 0
- **WHEN** `tests/drawio-business-modeling.test.mjs` and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.
