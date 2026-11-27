# Change Proposal: Tri-Repo Draw.io Tooling Layer Fusion (next-ai-draw-io + drawio-skill + drawio-mcp-server)

## Why
Agents authoring business flowcharts and cross-functional swimlane diagrams via raw Draw.io MCP XML frequently produce overlapping boxes, edges crossing through intermediate shapes, stacked parallel connectors, broken `source`/`target` references, and layout regressions when rewriting whole XML documents. By fusing the highest-value engineering mechanisms from GitHub's top three Draw.io projects—`DayuanJiang/next-ai-draw-io` (37.2k ⭐ gap-routed orthogonal edges & visual/drawing rules), `Agents365-ai/drawio-skill` (10.9k ⭐ Diagram IR & scored geometry validation), and `lgazo/drawio-mcp-server` (1.5k ⭐ fine-grained cell/edge/layer incremental primitives)—into our unified tooling layer, agents gain a deterministic, zero-overlap Draw.io builder, incremental mutator, and L2 geometric validator.

## What Changes
1. **REQ-01 (Tri-Repo Mechanism Synthesis)**: Synthesize gap-routed orthogonal layout (`next-ai-draw-io`), Diagram IR + scored validation (`drawio-skill`), and cell-level incremental operations (`drawio-mcp-server`) without vendoring third-party bloat into the main repo.
2. **REQ-02 & PROP-A/B/C (Unified `scripts/drawio-toolkit.mjs` & Enhanced `guard:drawio-model`)**:
   - Create `scripts/drawio-toolkit.mjs` exporting `buildFlowchartOrSwimlaneXml(ir)`, `mutateDrawioXml(xml, ops)`, and `validateDrawioGeometry(xml)` plus a CLI (`build`, `mutate`, `validate`);
   - Enhance `scripts/check-drawio-model.mjs` (`npm run guard:drawio-model`) to reuse `validateDrawioGeometry` for collision, dangling-edge, and edge-crossing checks;
   - Upgrade `skills/drawio-mcp/SKILL.md` to route all flowchart/swimlane/MCP tasks through `scripts/drawio-toolkit.mjs` + `@drawio/mcp` / `drawio-cloud`.
3. **REQ-03 (Graph Registration, Tests, Global Sync & Push)**: Register `scripts/drawio-toolkit.mjs` in `.harness/project-graph.json` and `scripts/sync-to-global.mjs`, add `tests/drawio-toolkit.test.mjs`, pass all 17 `guard:*` + 6 test suites, sync globally, archive OpenSpec, and push.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 | Tri-Repo Draw.io Mechanism Synthesis | `DRAWIO_TRI_REPO_TOOLING_FUSION_STANDARD` |
| REQ-02 & PROP-A/B/C | Deterministic Builder, Incremental Mutator & Geometry Guard | `DRAWIO_DETERMINISTIC_LAYOUT_AND_GEOMETRY_GUARD` |
| REQ-03 | Tooling Layer Integration, Tests & Global Sync | `DRAWIO_TOOLKIT_GRAPH_AND_SYNC_PARITY` |
