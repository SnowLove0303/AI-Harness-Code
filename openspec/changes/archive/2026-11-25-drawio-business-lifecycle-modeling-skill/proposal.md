# Change Proposal: Enterprise R&D Lifecycle & Business Model Draw.io Skill + Diagram-as-Test L2 Guard (Axiom 76)

## Why
Complex enterprise R&D lifecycle models (IPD, Stage-Gate, Cross-Functional Swimlanes, BPMN 2.0) involve dense multi-stage axes, parallel role lanes, decision gates, loopback feedback edges, and deliverable artifacts. Current Draw.io MCP guidance lacks structural intermediate representation (Diagram IR), deterministic swimlane grid layout, multi-page L0/L1 projection, and XML overlap/dangling-edge verification—causing AI agents to miscompute coordinates, clip labels, or cross connector lines. Synthesizing `Agents365-ai/drawio-skill` (10,927 ⭐) with `jgraph/drawio-mcp` (5,895 ⭐) equips Ps-openspec with a deterministic business lifecycle compiler (`scripts/check-drawio-model.mjs`), an upgraded `skills/drawio-mcp/SKILL.md`, and **Axiom 76**.

## What Changes
1. **REQ-1 (Structured Five-Element Enterprise Lifecycle Modeling)**: Mandate modeling Stages, Swimlanes, Decision Gates, Loopbacks, and Deliverable Artifacts via structured IR before XML generation, with L0 overview + L1 detail multi-page `<diagram>` support.
2. **REQ-2 (Upgraded `skills/drawio-mcp/SKILL.md`)**: Upgrade `skills/drawio-mcp/SKILL.md` with exact `mxGraphModel` swimlane container styles, Stage-Gate diamond/artifact styles, CJK/Latin text-width sizing rules, and `routing="libavoid"` / `set_page` protocols.
3. **REQ-3 ("Diagram-as-Test" L2 Draw.io XML Guard)**: Create `scripts/check-drawio-model.mjs` (`npm run guard:drawio-model`) to deterministically validate XML structure, bounding-box overlap (`DRAWIO_NODE_OVERLAP_BLOCKED`), dangling edges (`DRAWIO_DANGLING_EDGE_BLOCKED`), orphan nodes, and multi-page `<diagram>` integrity.
4. **REQ-4 (Axiom 76 Three-Mirror Codification)**: Codify Axiom 76 (`DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 73) using pure universal software engineering abstractions.
5. **PROP-C (Deterministic Swimlane Grid Compiler)**: Provide `compileBusinessLifecycleToDrawioXml(model)` in `scripts/check-drawio-model.mjs` to deterministically compute grid coordinates, text-fit widths, and multi-page `<diagram>` XML from clean JSON IR.
6. **PROP-D (Multi-Page L0/L1 Projection)**: Support L0 macro overview + L1 stage detail `<diagram>` pages natively in both the compiler and XML validator.
7. **PROP-E (CJK/Latin Text-Fit Margin Calculation)**: Compute minimum node dimensions from label character width to prevent text clipping.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Structured Five-Element Lifecycle Modeling | `ENTERPRISE_LIFECYCLE_STRUCTURED_MODELING` |
| REQ-2 | Upgraded Draw.io Business Modeling Skill | `DRAWIO_SWIMLANE_&_GATE_STYLE_STANDARD` |
| REQ-3 | Diagram-as-Test L2 Draw.io XML Guard | `AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD` |
| REQ-4 | Axiom 76 Three-Mirror Codification | `AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD` |
| PROP-C | Deterministic Swimlane Grid Compiler | `DETERMINISTIC_SWIMLANE_GRID_COMPILER` |
| PROP-D | Multi-Page L0/L1 `<diagram>` Projection | `MULTI_PAGE_L0_L1_DIAGRAM_PROJECTION` |
| PROP-E | CJK/Latin Text-Fit Margin Rule | `TEXT_FIT_MARGIN_ANTI_CLIPPING_RULE` |
