# Ps-openspec execution guide

Ps-openspec connects the pinned upstream PStack workflow to OpenSpec in Codex. PStack is the primary execution method. OpenSpec is the only durable record for project intent, requirements, tasks, evidence, and archive history.

## Run a task

1. Start with upstream `poteto-mode`, select the matching playbook, and read its steps and triggered skills in full.
2. Resolve the actual project root with `openspec context --json`. For a new Codex project, run `openspec init --tools codex` and verify the root and installed skills.
3. Reuse one active OpenSpec change or create one before persistent implementation. Copy PStack playbook steps verbatim to the top of the same `tasks.md`.
4. Execute PStack steps in verifiable units. Proceed on reversible in-scope work. Ask only when a genuine user decision, explicit user gate, missing authority, or irreversible action requires it.
5. Use `openspec validate --all --strict` before archive.

## Delegate work without losing intent

Follow PStack's Fresh Subagents and Consolidated Scope instructions. Generate a capsule from the OpenSpec change and Git state. Include the exact original request, appended directives in order, PStack playbook and steps, OpenSpec IDs, source instruction hashes, branch state, write scope, protected invariants, prior verified work, non-goals, and acceptance evidence. Require the receiving agent to echo the task ID and capsule digest. Keep task status in OpenSpec. The parent agent owns updates to shared task files.

## Protect accepted fixes and optimizations

Record protected behavior in OpenSpec specs with a stable ID, source change or commit, code anchor, and regression check. Review code impact with Code Review Graph and run the linked checks. Require explicit OpenSpec supersession and replacement evidence to change protected behavior. Use diff, symbol search, and regression checks if Graph is stale or unavailable. Keep archived history unchanged.

## Source locations

- PStack upstream and version lock: `bundle/pstack-upstream/`, `bundle/pstack-upstream.lock.json`.
- Codex adapter: `orbitstack-codex/SKILL.md`.
- PStack route registry: `docs/pstack-openspec-route-map.json`.
- Route audit: `scripts/audit-pstack-openspec-routing.ps1` in the source repository; `.orbitstack/scripts/audit-pstack-openspec-routing.ps1` in installed projects.
- Handoff capsule tool: `scripts/pstack-handoff.mjs` in the source repository; `.orbitstack/scripts/pstack-handoff.mjs` in installed projects.
- OpenSpec spec source: `openspec/specs/`.

## Package checks

```powershell
openspec validate --all --strict
.\scripts\audit-pstack-openspec-routing.ps1
node --test scripts/tests/pstack-handoff.test.mjs
```
