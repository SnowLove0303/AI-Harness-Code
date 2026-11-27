## ADDED Requirements

### Requirement: Unified Tri-Repo Draw.io Deterministic Builder & Incremental Mutator (REQ-01, REQ-02, PROP-A, PROP-C)
The tooling layer SHALL provide `scripts/drawio-toolkit.mjs` (`DRAWIO_TRI_REPO_TOOLING_FUSION_STANDARD`), fusing Diagram IR compilation (`buildFlowchartOrSwimlaneXml`), gap-routed orthogonal edge waypoints avoiding shape intersections, and cell/edge-level incremental XML mutations (`mutateDrawioXml`) compatible with `@drawio/mcp` and `drawio-cloud`.

#### Scenario: Building a cross-functional swimlane flowchart produces zero-overlap, gap-routed XML
- **WHEN** `buildFlowchartOrSwimlaneXml` compiles a multi-lane business process IR with decisions and back-edges
- **THEN** it SHALL output valid `<mxfile>` XML whose `validateDrawioGeometry` score is 100 with 0 overlaps, 0 dangling edges, and 0 edge-through-node crossings.

### Requirement: L2 Geometric Collision, Dangling Edge & Crossing Guard (REQ-02, PROP-B)
`validateDrawioGeometry` and `scripts/check-drawio-model.mjs` (`npm run guard:drawio-model`) SHALL detect and block duplicate IDs, overlapping vertex boxes (`VERTEX_OVERLAP_DETECTED`), dangling edge endpoints (`DANGLING_EDGE_TARGET_BLOCKED`), and orthogonal segments crossing intermediate shapes (`EDGE_CROSSES_NODE_BLOCKED`) (`DRAWIO_DETERMINISTIC_LAYOUT_AND_GEOMETRY_GUARD`).

#### Scenario: Overlapping shapes or dangling edge fails validation
- **WHEN** `validateDrawioGeometry` inspects XML with overlapping vertices or an edge referencing a nonexistent target
- **THEN** it SHALL return `valid: false` with `VERTEX_OVERLAP_DETECTED` or `DANGLING_EDGE_TARGET_BLOCKED`.

### Requirement: Tooling Layer Registration, Tests & Global Sync Parity (REQ-03)
`scripts/drawio-toolkit.mjs` SHALL be registered in `.harness/project-graph.json` and `scripts/sync-to-global.mjs`, documented in `skills/drawio-mcp/SKILL.md`, and verified by `tests/drawio-toolkit.test.mjs` alongside all 17 `guard:*` checks (`DRAWIO_TOOLKIT_GRAPH_AND_SYNC_PARITY`).

#### Scenario: All guards and Draw.io toolkit tests pass with Exit Code 0
- **WHEN** `node tests/drawio-toolkit.test.mjs` and `npm run guard:drawio-model` execute
- **THEN** both SHALL exit with Exit Code 0.
