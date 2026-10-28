---
name: pstack-openspec
description: PStack-first bridge for OpenSpec-backed task state, lossless subagent handoff, and protected-behavior review.
---

# PStack and OpenSpec bridge

PStack is the primary execution method. Start with the pinned upstream `poteto-mode`, read the selected playbook and the leaf skills it triggers, and follow the playbook in order. OpenSpec records persistent intent, requirements, task progress, verification, and archive history.

## OpenSpec setup

Run `openspec context --json` from the project the user named and confirm the reported root. Configure Codex with `openspec init --tools codex` when the project has no OpenSpec Codex skills. Use the installed OpenSpec skills for the current schema and profile. Do not maintain a separate task ledger.

## Lossless subagent handoff

Use PStack's Fresh Subagents and Consolidated Scope rules. Add exact original user intent, chronological appended directives, OpenSpec change/task IDs, PStack playbook steps, Git state, file scope, prior verified work, protected invariants, non-goals, and acceptance evidence. Generate the capsule from OpenSpec and Git; do not maintain another durable copy. The parent reviews the returned diff and verifies it before updating shared tasks.

See [`references/a2a-lossless-handoff-protocol.md`](references/a2a-lossless-handoff-protocol.md) for the OrbitStack handoff extension.

## Protect accepted behavior

Record protected behavior in OpenSpec requirements with stable IDs, provenance, implementation anchors, and runnable regression checks. Use Code Review Graph to find affected symbols and flows. Use deterministic diff and regression checks when Graph is unavailable or stale. A behavior change requires an explicit superseding OpenSpec requirement and evidence for the replacement. Keep archived history unchanged.

See [`references/anti-regression-charter.md`](references/anti-regression-charter.md) for the audit extension.

## Host mapping

Use the full upstream tree at `bundle/pstack-upstream/` or `.orbitstack/pstack-upstream/`. Codex does not provide Cursor custom agent roles or every Cursor control skill. Use the closest available Codex agent, name unavailable steps, and continue independent work. Do not claim that a host-only capability ran.
