# PStack + OpenSpec Routing Audit

## Scope and source

The upstream PStack source is pinned to `cursor/plugins/pstack` commit `c742dd61706fbacc1b95f1a20b7b988cf096ce6c` (plugin version `0.15.36`). Its complete 573-file tree is vendored under `bundle/pstack-upstream/`; the matching global Codex copy is `C:\Users\Administrator\.codex\pstack-upstream`. The pinned source includes all skills, principles, agents, playbooks, references, scripts, assets, and metadata. Upstream files remain unmodified.

`docs/pstack-openspec-route-map.json` is the single route registry for the 23 `poteto-mode` playbooks. It also records `figure-it-out` as the upstream fallback skill, not a 24th playbook. OpenSpec `tasks.md` is the sole durable task/progress source. PStack supplies the primary execution method; the two OrbitStack extensions add lossless handoff and accepted-behavior protection. Codex host fallbacks are documented without adding a second workflow.

## Structural inventory result

`scripts/audit-pstack-openspec-routing.ps1` compares every registry ID with the pinned upstream playbook filenames, rejects missing/extra/duplicate routes, checks required route and fallback fields, confirms the global registry and global Agent entry, and verifies the active OpenSpec root. The audit result is recorded with the validation command output at release time.

## Behavioral route evaluation

All 23 organic task fixtures were independently classified by a fresh read-only Subagent against the full upstream `poteto-mode` and the selected playbook rules, then compared with the registry. Result: **23/23 route matches**. The route-by-route outcomes and method are in [`pstack-openspec-route-evaluation.md`](pstack-openspec-route-evaluation.md).

This is a model route-classification evaluation, not 23 end-to-end task executions and not a fresh independent Codex desktop thread invocation. The evaluator did not execute fixture tasks or edit files. Host-dependent UI, model-routing, automation, and forge actions remain marked as capability-gated fallbacks in the registry; they are not claimed as measured passes.

## Known first-pass issue and correction

During this migration, the first route selection used a generic `multi-phase-plan` framing. Reading the pinned upstream selection guidance showed that an authorized large cross-cutting implementation belongs on the `figure-it-out` fallback. The active work was rerouted to that workflow and kept in one OpenSpec change. This correction is retained as audit history; it is not counted as a clean first-pass route.

The audit also found that the global entrypoint required `openspec context --json` but did not specify recovery when the CLI resolved a stale project root or the project had not been initialized. The global OrbitStack rule, distributable Agent files, and Codex adapter now require root-path verification, project-root initialization when missing, and explicit correction/retry when a different root is returned. The strict validation and structural audit are rerun from the intended repository root.

## Verdict

The pinned PStack source is complete, the registry covers all 23 playbooks, and the independent fixture classification agrees with all 23 registry mappings. The evidence supports complete source inclusion and route-map consistency. It does not establish that every Codex thread automatically invokes the global adapter or that every host-specific PStack capability is executable in Codex. Such claims require runtime evidence from those exact surfaces.
