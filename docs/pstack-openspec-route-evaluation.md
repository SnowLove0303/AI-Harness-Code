# PStack + OpenSpec Route Evaluation

**Scope.** Independent read-only route classification of all 23 PStack playbook fixtures in `docs/pstack-openspec-route-map.json`.

**Method.** A fresh read-only Subagent read the global OrbitStack instructions, Codex adapter, upstream `poteto-mode` skill and each selected PStack playbook. It classified each organic task fixture from upstream PStack rules first, then compared the result with the registry. The parent reviewed the complete returned table. The Subagent did not edit files or execute the example tasks.

**Result.** 23 of 23 selected playbooks match the registry. `figure-it-out` is separately retained as the upstream fallback skill for large cross-cutting execution, not counted as a 24th playbook. No route mismatches were reported.

| PStack playbook | Expected task class | OpenSpec action | Gate summary | Route result |
|---|---|---|---|---|
| investigation | Read-only question | Context-only unless persistent change requested | PStack Investigation; no edit unless requested | Match |
| bug-fix | Reproducible defect | Reuse or create one fix change | PStack autonomy; pause only for user decisions, explicit gates, or irreversible actions | Match |
| perf-issue | Measured slowdown | Reuse/create change with objective and baseline | PStack autonomy; pause only for user decisions, explicit gates, or irreversible actions | Match |
| hillclimb | Sustained metric optimization | One change tracks target and iterations | PStack autonomy; pause only for user decisions, explicit gates, or irreversible actions | Match |
| runtime-forensics | Live runtime diagnosis | Context-only unless fix requested | PStack diagnosis; use implementation route before edits | Match |
| trace-forensics | Captured trace analysis | Context-only unless fix requested | PStack diagnosis; no edits requested | Match |
| feature | New behavior | Proposal/spec/design/tasks | PStack autonomy; pause only for user decisions, explicit gates, or irreversible actions | Match |
| refactoring | Behavior-preserving restructuring | Scoped change as needed | PStack autonomy; pause only for user decisions, explicit gates, or irreversible actions | Match |
| prototype | Isolated design experiment | Record decision in one change when relevant | PStack prototype; protect production decision boundary | Match |
| visual-parity | Pixel-level UI equivalence | Change with visual requirements/evidence | PStack visual parity with verification evidence | Match |
| authoring-a-skill | Persistent skill change | One change for persistent skill behavior | PStack skill-authoring playbook | Match |
| eval | Evaluate skill/router behavior | Context-only unless routing contract changes | PStack Eval playbook; persistent routing change uses OpenSpec | Match |
| babysit | Existing PR/stack follow-up | Reuse existing change/PR context | PStack babysit; preserve existing PR/change context | Match |
| shipping | Land verified stack | Reuse change; archive after verified ship | PStack shipping checks; external publish/merge requires explicit authority | Match |
| autonomous-run | Long bounded task | One active change/tasks.md | PStack autonomous progression within authorized scope | Match |
| orchestrate | Standing multi-day program | One parent change; child work references task IDs | PStack orchestrate; one parent task owns OpenSpec state | Match |
| autopilot-full | Authorized PR queue through merge | Parent change with child PR tasks | PStack autopilot; merge requires explicit authority | Match |
| autopilot-stack | Build/verify stack without merge | Parent change with ordered PR tasks | PStack autonomy within scope; no merge | Match |
| session-pickup | Resume active work | Reuse the same active change | PStack session pickup; resume same scope and OpenSpec change | Match |
| pause-safely | Suspend incomplete work | Keep existing change active | Honor pause; do not archive incomplete work | Match |
| multi-phase-plan | Plan-only deliverable | Record phases in design/tasks | PStack plan-only route; later implementation follows its own request | Match |
| worktree-cleanup | Cleanup exact resources | Context-only unless part of change | Explicit authorization for destructive targets | Match |
| opening-a-pr | Create ready PR | Attach to existing change | PStack PR workflow; explicit authorization for external PR creation | Match |

## Evidence boundary

This proves independent playbook classification against the pinned PStack rules and the PStack-first OpenSpec mapping. It does **not** prove that 23 separate fresh Codex threads automatically invoke the adapter, and it does not execute all 23 task examples. The structural audit script separately verifies all 23 upstream playbook files and registry entries. A fresh-session invocation and any host-specific live UI/forge behavior remain runtime checks, not claimed passes.
