# Technical Design: Enterprise R&D Lifecycle Draw.io Modeling & Diagram-as-Test Guard (Axiom 76)

## 1. Deterministic Swimlane Grid Compiler (`compileBusinessLifecycleToDrawioXml`)
Instead of forcing LLMs to hand-calculate 30+ `(x, y, w, h)` attributes in raw XML:
- Input JSON IR:
  - `title`: diagram title
  - `stages`: `[{ id, name }]` (horizontal columns)
  - `lanes`: `[{ id, name }]` (vertical swimlanes)
  - `nodes`: `[{ id, stageId, laneId, label, kind: 'task'|'gate'|'artifact', subpage? }]`
  - `edges`: `[{ source, target, label?, kind?: 'flow'|'loopback' }]`
  - `subpages`: optional `[{ name, stages, lanes, nodes, edges }]` for L1 detail pages
- Deterministic Layout Engine:
  - Computes CJK-aware text width (`calculateTextFitWidth(label)`): CJK chars ~14px, ASCII ~8px, min width 120px, padding 32px.
  - Allocates fixed column widths and lane row heights so sibling nodes never overlap.
  - Emits standard `mxfile` -> `<diagram>` -> `<mxGraphModel>` XML with `swimlane` containers, `rhombus` decision gates, `document` artifacts, and orthogonal `loopback` dashed edges.

## 2. Diagram-as-Test Validator (`validateDrawioXml`)
- Parses `<diagram>` pages, `<mxCell>` vertices (with `<mxGeometry x y width height>`), and edges (`source`, `target`).
- Checks:
  1. `DRAWIO_INVALID_XML_BLOCKED`: Missing `<mxGraphModel>` or `<root>`.
  2. `DRAWIO_NODE_OVERLAP_BLOCKED`: Axis-aligned bounding-box intersection between two sibling vertices sharing the same `parent` container.
  3. `DRAWIO_DANGLING_EDGE_BLOCKED`: Edge `source` or `target` referencing a non-existent cell ID.
