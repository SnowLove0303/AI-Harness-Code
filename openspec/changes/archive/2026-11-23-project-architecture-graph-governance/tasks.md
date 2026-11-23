## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-5 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` aligned with `@poteto` Pstack principles (`how`, `architect`, `blast-radius`, `fix-root-causes`, `encode-lessons-in-structure`).
- [x] Validate OpenSpec change assets with `npx openspec validate project-architecture-graph-governance --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Build `.harness/project-graph.json` for this repository covering all core governance, scripts, tests, and OpenSpec modules.
- [x] Create deterministic L2 guard & bootstrapper `scripts/check-project-graph.mjs` and register `guard:graph` in `package.json`.
- [x] Codify Axiom 70 (`PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM`) in `GEMINI.md` (and update top 20 KB safe-zone index).
- [x] Synchronize Axiom 70 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md` (Invariant 67).
- [x] Update `worker.md` with Graph-guided diagnosis, blast-radius check, and hotspot circuit-breaker rules.
- [x] Author automated L2 test suite `tests/project-architecture-graph.test.mjs` covering schema, anti-staleness, hotspot lock, blast-radius computation, and mirror parity.
- [x] Add Axiom 70 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `npm run guard:graph` and confirm Exit Code 0.
- [x] Execute `node tests/project-architecture-graph.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards (`guard:neutrality`, `guard:unslop`, `guard:workflow-spec`, `guard:invocation-purity`, `guard:issue-clearance`, `guard:portability`) and confirm Exit Code 0.
- [x] Run `node scripts/sync-to-global.mjs` to synchronize global and workspace anchors.
- [x] Validate and archive change with `npx openspec archive project-architecture-graph-governance --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
