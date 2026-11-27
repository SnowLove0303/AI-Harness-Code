# Design: Tri-Repo Draw.io Tooling Layer Fusion

1. **Unified Engine (`scripts/drawio-toolkit.mjs`)**:
   - **`buildFlowchartOrSwimlaneXml(ir)`**:
     - Supports `type: 'flowchart' | 'swimlane'`, `direction: 'TB' | 'LR'`, `lanes: [{ id, label }]`, `nodes: [{ id, label, lane?, kind?: 'process'|'decision'|'start'|'end'|'datastore' }]`, `edges: [{ id?, from, to, label? }]`.
     - Computes deterministic grid rows/columns (topological layering + lane grouping), allocates inter-row/inter-column gap tracks for multi-edges and back-edges, assigns distinct `exitX/exitY/entryX/entryY` anchors, and emits `<Array as="points">` orthogonal waypoints that route strictly through gaps.
   - **`mutateDrawioXml(xml, ops)`**:
     - Supports `add-node`, `add-edge`, `update-cell`, `delete-cell` (automatically cascades connected edges), and `set-parent` without rewriting unrelated cells.
   - **`validateDrawioGeometry(xml)`**:
     - Parses `<mxCell>` elements, computes absolute coordinates (resolving parent container offsets), checks duplicate IDs, vertex overlaps (`VERTEX_OVERLAP_DETECTED`), dangling edges (`DANGLING_EDGE_TARGET_BLOCKED`), orthogonal segment-box intersections (`EDGE_CROSSES_NODE_BLOCKED`), and returns `{ valid, score, errors, warnings }`.
2. **Guard & Skill Integration**:
   - Wire `validateDrawioGeometry` into `scripts/check-drawio-model.mjs` (`npm run guard:drawio-model`).
   - Update `skills/drawio-mcp/SKILL.md` with the 3-repo fused workflow (`build` -> `validate` -> `@drawio/mcp` / `drawio-cloud` -> `mutate` -> 2-round max visual/DOM check).
   - Register `scripts/drawio-toolkit.mjs` in `.harness/project-graph.json` and `scripts/sync-to-global.mjs`.
