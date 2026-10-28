# PStack + OpenSpec Route Evaluation

**Scope.** Independent read-only route classification of all 23 PStack playbook fixtures in `docs/pstack-openspec-route-map.json`.

**Method.** A fresh read-only Subagent read the global OrbitStack instructions, Codex adapter, upstream `poteto-mode` skill and each selected PStack playbook. It classified each organic task fixture from upstream PStack rules first, then compared the result with the registry. The parent reviewed the complete returned table. The Subagent did not edit files or execute the example tasks.

**Result.** 23 of 23 selected playbooks match the registry. `figure-it-out` is separately retained as the upstream fallback skill for large cross-cutting execution, not counted as a 24th playbook. No route mismatches were reported.

| PStack playbook | Expected task class | OpenSpec action | Gate summary | Route result |
|---|---|---|---|---|
| investigation | Read-only question | Context-only unless persistent change requested | Step 0; no implementation gate | Match |
| bug-fix | Reproducible defect | Reuse or create one fix change | Step 0 + dual checklist before code | Match |
| perf-issue | Measured slowdown | Reuse/create change with objective and baseline | Step 0 + dual checklist before code | Match |
| hillclimb | Sustained metric optimization | One change tracks target and iterations | Step 0 + dual checklist before code | Match |
| runtime-forensics | Live runtime diagnosis | Context-only unless fix requested | Step 0; dual checklist before code | Match |
| trace-forensics | Captured trace analysis | Context-only unless fix requested | Step 0; no edits requested | Match |
| feature | New behavior | Proposal/spec/design/tasks | Step 0 + dual checklist before code | Match |
| refactoring | Behavior-preserving restructuring | Scoped change as needed | Step 0 + dual checklist before code | Match |
| prototype | Isolated design experiment | Record decision in one change when relevant | Step 0; dual checklist before production edit | Match |
| visual-parity | Pixel-level UI equivalence | Change with visual requirements/evidence | Step 0 + dual checklist before UI edits | Match |
| authoring-a-skill | Persistent skill change | One change for persistent skill behavior | Step 0 + dual checklist before skill writes | Match |
| eval | Evaluate skill/router behavior | Context-only unless routing contract changes | Step 0 + dual checklist for rule changes | Match |
| babysit | Existing PR/stack follow-up | Reuse existing change/PR context | Step 0; gate new implementation scope | Match |
| shipping | Land verified stack | Reuse change; archive after verified ship | Step 0 + dual checklist + explicit publish/merge authority | Match |
| autonomous-run | Long bounded task | One active change/tasks.md | Step 0 + dual checklist; no routine re-approval | Match |
| orchestrate | Standing multi-day program | One parent change; child work references task IDs | Step 0 + dual checklist at parent scope | Match |
| autopilot-full | Authorized PR queue through merge | Parent change with child PR tasks | Step 0 + dual checklist + explicit merge authority | Match |
| autopilot-stack | Build/verify stack without merge | Parent change with ordered PR tasks | Step 0 + dual checklist; no merge | Match |
| session-pickup | Resume active work | Reuse the same active change | Step 0 re-grounding; preserve approved scope | Match |
| pause-safely | Suspend incomplete work | Keep existing change active | Honor pause; do not archive incomplete work | Match |
| multi-phase-plan | Plan-only deliverable | Record phases in design/tasks | Step 0; dual checklist before later implementation | Match |
| worktree-cleanup | Cleanup exact resources | Context-only unless part of change | Explicit authorization for destructive targets | Match |
| opening-a-pr | Create ready PR | Attach to existing change | Step 0 + dual checklist for code + explicit external PR authority | Match |

## Evidence boundary

This proves independent playbook classification against the pinned PStack rules and OpenSpec/OrbitStack mapping. It does **not** prove that 23 separate fresh Codex threads automatically invoke the adapter, and it does not execute all 23 task examples. The structural audit script separately verifies all 23 upstream playbook files and registry entries. A fresh-session invocation and any host-specific live UI/forge behavior remain runtime checks, not claimed passes.
