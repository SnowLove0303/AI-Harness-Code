# Initial PStack + OpenSpec Routing Audit

Pinned upstream PStack: `cursor/plugins/pstack` at commit `c742dd61706fbacc1b95f1a20b7b988cf096ce6c` (plugin version `0.15.36`). The complete 573-file upstream subtree is stored at `bundle/pstack-upstream/`; the Codex global mirror is `C:\Users\Administrator\.codex\pstack-upstream`. Source metadata is recorded in `bundle/pstack-upstream.lock.json`.

| Input class | PStack route | OpenSpec action | Gates | Durable task source | Pass evidence |
|---|---|---|---|---|---|
| Read-only question / codebase explanation | Investigation | Resolve context; no change artifact unless user asks for persistent change | Step 0 understanding confirmation; no implementation gate | None | Source-backed answer; no files changed |
| Reproducible defect | Bug Fix | Reuse active change or create one with behavior delta and tasks | Step 0, dual checklist before edits | OpenSpec `tasks.md` | Original repro fails before fix and passes after; relevant regression checks |
| New product behavior | Feature | Proposal, delta specs, design if needed, tasks | Step 0, dual checklist before edits | OpenSpec `tasks.md` | Scenarios pass and implementation conforms to delta spec |
| Behavior-preserving restructure | Refactoring | Change only when persistent scope warrants; state behavior-preservation criteria | Step 0, dual checklist before edits | OpenSpec `tasks.md` when a change is created | Existing behavior tests pass; scope diff checked |
| Measured performance issue | Perf Issue / Hillclimb | Record target and measurement contract in one active change | Step 0, dual checklist before edits | OpenSpec `tasks.md` | Reproducible baseline and post-change measurements with same workload |
| Throwaway design experiment | Prototype | Record decision evidence in active change only if it informs implementation | Step 0; dual gate before production edits | OpenSpec tasks for production work | Prototype isolated; measured result determines branch |
| Large cross-cutting migration | Figure-it-out | One parent OpenSpec change with phased tasks; no parallel durable ledger | Step 0 + dual checklist; each irreversible/external action stays gated | Parent OpenSpec `tasks.md` | Phase evidence; parent independently verifies delegated results |
| Standing multi-day program | Orchestrate | One parent OpenSpec change; child work references assigned tasks | Step 0 + dual checklist at authorized scope; subagents inherit capsule | Parent OpenSpec `tasks.md` | Each PR/phase has independent evidence and owner |
| PR follow-up | Babysit | Reference existing change/PR and record task status in existing source | User authorized actions; dual gate before new implementation scope | Existing OpenSpec change when applicable | CI/review state read from authoritative sources; fixes verified |
| Skill/workflow modification | Authoring a Skill + Eval | One OpenSpec change for runtime-visible workflow changes; include eval criteria | Step 0, dual checklist | OpenSpec `tasks.md` | Full skill evaluation and routing matrix results |

## Audit verdict

The structural audit confirms that each route family maps to a real upstream playbook and the adapter retains both authorization gates and OpenSpec as the single task source. It does not prove that a fresh Codex session invokes the adapter. Runtime discovery remains a separate acceptance item. The current implementation initially entered through a generic multi-phase route, then was corrected to PStack `figure-it-out` after reading the upstream selection rule for large cross-cutting work. This is a first-pass routing defect that was corrected during the audit, not a clean first-pass pass.

| Case | Prompt / fixture | Expected route | Observed route | OpenSpec action | Gate result | Evidence | Verdict |
|---|---|---|---|---|---|---|---|
| Investigation | Read-only explanation | Investigation | Not exercised in fresh session | Context-only; no change | Step 0 | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Bug fix | Reproducible defect | Bug Fix | Not exercised in fresh session | Reuse/create one fix change | Step 0 + dual checklist | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Feature | New user behavior | Feature | Not exercised in fresh session | Proposal/spec/design/tasks | Step 0 + dual checklist | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Refactor | Preserve behavior, change structure | Refactoring | Not exercised in fresh session | One scoped change if tracked | Step 0 + dual checklist | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Performance | Measured slowdown | Perf Issue / Hillclimb | Not exercised in fresh session | Measurement change | Step 0 + dual checklist | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Prototype | Compare isolated approaches | Prototype | Not exercised in fresh session | Record decision; production change later | Step 0; dual checklist before production | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Large cross-cutting | Current PStack/OpenSpec migration | Initially multi-phase; corrected to Figure-it-out after reading upstream rule | Corrective reroute recorded | One OpenSpec change with phased tasks | Both gates retained | OpenSpec change validates; script confirms route artifacts | Corrected; verify final completion under Figure-it-out |
| PR follow-up | Resolve CI/review comments | Babysit | Not exercised in fresh session | Existing change/PR | Step 0; dual checklist for new code | Playbook path and adapter mapping present | Structural pass; runtime pending |
| Standing multi-day | Many independent PR owners across days | Orchestrate | Not exercised in fresh session | One parent change | Step 0 + dual checklist | Upstream playbook exists | Structural pass; runtime pending |
| Skill authoring | Change skill routing or guidance | Authoring a Skill | Not exercised in fresh session | One workflow change | Step 0 + dual checklist | Upstream playbook exists | Structural pass; runtime pending |
| Eval | Detect routing regression | Eval | Not exercised in fresh session | One workflow change | Step 0 + dual checklist | Upstream playbook exists | Structural pass; runtime pending |
