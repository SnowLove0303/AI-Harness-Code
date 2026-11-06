# Proposal

## Why

The current system vendors all pinned PStack files, but OrbitStack rules still duplicate or override parts of PStack, and the cross-agent and historical-regression protections rely too heavily on prose. This change makes PStack the primary execution method, keeps OpenSpec as the only durable task record, and adds only the missing intent-preservation and graph-assisted regression protections.

## Original user request

> 不完整的部分以及冲突的的部分你给我汇报一个完整的解决方案和思路，需要注意的是，如果Pstack与OrbitStack 有冲突，应当以Pstack为主，Orbitstack 其中的两个：跨Agent任务发布以及审计（防止问题复现与旧优化性改动被篡改）如果Pstack的解决思考更好的话就用Pstack，如果Pstack没有就补上，核心是规避Subagent传递过程中的原始意图以及需求传递不清晰问题以及对过去问题的优化性修改在新问题的优化时被恶意篡改，导致旧问题复发问题，建议融合Graph思想

## What Changes

- Make upstream PStack `poteto-mode`, its selected playbook, and applicable leaf skills the primary execution route. Keep OpenSpec as the sole durable record for task intent, requirements, task progress, verification, and archive history.
- Replace the OrbitStack-specific duplicate confirmation workflow with PStack's goal-restatement and autonomy rules. Pause only for a genuine user decision, an explicit user gate, or an irreversible action.
- Extend PStack's consolidated subagent handoff with verbatim original user intent, chronological appended directives, OpenSpec change/task references, branch state, file boundaries, prior verified work, protected behavior, and acceptance evidence. Generate the capsule from OpenSpec artifacts; do not create a parallel Blackboard or task ledger.
- Use OpenSpec specs and regression tests as the durable record of accepted historical fixes and optimizations. Use Code Review Graph as a derived code-structure and impact view. Require explicit supersession and new evidence when a change alters a protected behavior.
- Add a deterministic fallback audit for protected behaviors when Code Review Graph is unavailable or stale.
- Complete Codex OpenSpec setup through the supported OpenSpec Codex skill integration, and keep the installer from replacing existing project instructions or specs.
- Repair route-registry and structural-audit gaps, and replace the current route-classification-only result with a PStack-compliant blinded behavior evaluation.
- Remove or correct duplicate, stale, machine-specific, and non-authoritative OrbitStack guidance that conflicts with PStack or duplicates OpenSpec.

## Append directives

- 执行
- 确认

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Set PStack precedence, require complete per-route metadata and real behavior evidence, define lossless handoff, protect accepted behavior, and integrate Codex's native OpenSpec workflow.

## Impact

The Codex adapter, global and distributable Agent instructions, OpenSpec route registry and audit, installer scripts, bundled OrbitStack skills and references, and routing specs. The pinned PStack upstream tree remains immutable. The Code Review Graph database remains derived and is not an alternate task or requirements store.
