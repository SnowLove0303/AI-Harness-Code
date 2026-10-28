---
name: orbitstack-pstack-openspec
description: Codex adapter joining the complete upstream PStack skill system with OpenSpec as OrbitStack's sole durable change lifecycle. Invoke for every task and thread.
---

# OrbitStack Codex Adapter: PStack + OpenSpec

This adapter is integration glue only. The complete, immutable upstream PStack source is vendored at `bundle/pstack-upstream/` in the OrbitStack repository and at `C:\Users\Administrator\.codex\pstack-upstream` globally. Its pinned upstream commit is `c742dd61706fbacc1b95f1a20b7b988cf096ce6c`. Do not replace the upstream source with a summary or edit its files to add OpenSpec behavior.

## Single-entry routing

1. Treat every Codex task or thread as OrbitStack-governed. Run the mandatory Step 0 understanding and confirmation gate before opening OpenSpec or writing files.
2. Begin the PStack route with the complete upstream `skills/poteto-mode/SKILL.md`. Match the task to its upstream playbook. Read that playbook and all directly required skill/reference files in full before applying it. Resolve the registry from the active installation: repository source `docs/pstack-openspec-route-map.json`, project install `.orbitstack/pstack-openspec-route-map.json`, or global Codex `C:\Users\Administrator\.codex\pstack-openspec-route-map.json`. That registry covers all 23 upstream playbooks and supplies the OpenSpec action, gate, task source, host fallback, and verification requirement. If the mode's selected route disagrees with the registry, record and correct the discrepancy before execution. Keep PStack's playbook as the execution method; do not create a second persistent task ledger.
3. After Step 0, identify the actual root of the project named in the task, run `openspec context --json` from that root, and verify the returned root path. If OpenSpec is not initialized, run `openspec init` at that project root and verify context again. If context resolves to a different project, explicitly switch to the intended root and diagnose the CLI working-directory/config source until the paths match. A root mismatch or missing initialization is a recovery task, never a reason to skip OpenSpec. OpenSpec is the only durable source for project intent, requirements, tasks, verification, and archive history.
4. For read-only investigation, use PStack's investigation playbook and cite evidence. Do not create a change unless a durable project change is in scope.
5. For implementation, inherit the existing active OpenSpec change when present. Otherwise use OpenSpec's configured workflow to create one proposal, relevant delta specs, design when needed, and `tasks.md`. Map the chosen PStack playbook's steps into that `tasks.md`; do not duplicate its checklist as another durable task record.
6. Before implementation, present the OrbitStack dual checklist for proposed scope and preserved existing behavior/project facts/build commands, then wait for explicit authorization. Do not begin implementation until both Step 0 and the dual checklist gate are satisfied.
7. Execute PStack steps in verifiable units. Record results and evidence against the matching OpenSpec task. Keep independent work moving when one task is blocked, without marking blocked work complete.
8. Before completion, run the chosen PStack verification/review steps, perform the OpenSpec-required validation, confirm scope and preserved project context, then archive only when all completion criteria are met.

## Codex host mapping

- Read upstream PStack skills from `C:\Users\Administrator\.codex\pstack-upstream\skills\` and its playbooks/references in place. This preserves the source tree and sibling-relative references.
- Use Codex's available agent tools for upstream `poteto-agent` roles. Do not claim Cursor-specific custom modes, model routing, Bugbot, automations, or UI features ran unless Codex has an equivalent available. State an explicit fallback when a host-only step cannot run.
- Keep global Codex rules in `C:\Users\Administrator\.codex\AGENTS.md`. Project-local `AGENTS.md`, architecture facts, package scripts, build commands, and domain pipelines remain project-owned; merge instructions without replacing those facts.
- OpenSpec CLI and its project-local workflow files remain the OpenSpec implementation. PStack does not replace or fork OpenSpec.

## Required audit evidence

Use the active installation's `pstack-openspec-route-map.json` as the single route registry and `docs/pstack-openspec-routing-audit.md` plus `docs/pstack-openspec-route-evaluation.md` in the source/release package as route/eval evidence. A route passes only when the selected PStack playbook, OpenSpec action, gates, persistent task source, and verification evidence match the registry and evaluation result.
