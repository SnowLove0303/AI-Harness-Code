---
name: orbitstack-pstack-openspec
description: PStack-first Codex adapter. Routes tasks through the pinned upstream poteto-mode and uses OpenSpec as the only durable task record, with lossless handoff and historical-invariant protection.
---

# PStack-first Codex adapter

This adapter connects Codex to the pinned PStack source and OpenSpec. It does not replace PStack playbooks or add a competing task workflow.

## Task routing

1. Route every Codex task through the full upstream `skills/poteto-mode/SKILL.md`. Restate the goal as PStack requires, select the matching playbook, and read it and each leaf skill or principle it triggers.
2. Copy the selected playbook steps verbatim into the active OpenSpec `tasks.md` before task-specific items. Use `figure-it-out` for a large cross-cutting run and `orchestrate` only for a standing program that exceeds one session's task scope.
3. PStack controls task execution. Proceed on reversible work within the user's request. Ask only for a genuine product decision, missing user authority, an explicit user-named gate, or an irreversible action. Direct user instructions and safety boundaries remain authoritative.
4. If Codex lacks a PStack host capability, use a documented Codex equivalent or mark that step unavailable. Continue independent work and report the limitation.

## OpenSpec lifecycle

1. Resolve the target project root, run `openspec context --json` there, and verify the returned path.
2. If the project lacks OpenSpec, run `openspec init --tools codex` at the verified root. Verify the context and `.agents/skills/openspec-*` files afterward. If the CLI is missing or too old, report its prerequisite and recovery command.
3. Use the installed OpenSpec skills for proposal, exploration, apply, update, sync, and archive. Keep one active change and one `tasks.md`. Reuse the active change when it owns the requested work.
4. Keep all PStack task status and evidence in OpenSpec. Do not create a Blackboard or a second persistent task ledger. Run `openspec validate --all --strict` before archive.

## Lossless PStack handoff

Use PStack's Fresh Subagents and Consolidated Scope methods. Generate a dispatch capsule from the OpenSpec proposal/task metadata and Git state with `node <helper-path>/pstack-handoff.mjs generate --change <change-id> --task <task-id>`. In the source repository, `<helper-path>` is `scripts`; in an installed project, it is `.orbitstack/scripts`. The capsule carries the original user request, appended directives in order, OpenSpec IDs, PStack steps, source-instruction hashes, branch and dirty-tree digest, writable and read-only paths, prior verified work, protected invariant IDs, non-goals, and acceptance checks.

The receiver acknowledges the task ID and capsule digest before editing. Check the result by piping the returned capsule into `node <helper-path>/pstack-handoff.mjs verify-return --ack-task <task-id> --ack-digest <capsule-digest> --changed-path <path> --root <project-root>`; repeat `--changed-path` for every changed path. The parent alone updates shared OpenSpec task status. Use an isolated branch or worktree for each parallel writer.

## Historical-invariant review with Graph

1. Call Code Review Graph `get_minimal_context_tool` first. Rebuild/update when it reports stale or missing data, then run change and affected-flow analysis for the changed symbols and paths. Inspect those results for links to protected invariant IDs in OpenSpec specs.
2. Run each linked regression test or benchmark. Require a new OpenSpec requirement that explicitly supersedes the old invariant when the user asks to change protected behavior. Keep archived history unchanged.
3. Treat Graph as derived code-structure evidence. If its graph is absent, stale, or unavailable, use `git diff`, path and symbol search, and the mapped regression checks. A missing Graph never blocks unrelated PStack work.

## Codex host mapping

- Read the immutable upstream copy at `C:\Users\Administrator\.codex\pstack-upstream\skills\` for global tasks, or `.orbitstack/pstack-upstream/skills/` for project installs. Resolve every playbook through the matching route registry.
- Read global rules at `C:\Users\Administrator\.codex\AGENTS.md`. Preserve the target project's existing AGENTS instructions, architecture facts, build commands, and official domain pipelines.
- Open code changes in VS Code for review. Use the configured review MCP when available; otherwise use `code --reuse-window --diff <base> <proposed>`.
- PStack custom agent roles such as `poteto-agent` and `comment-sicko` may be unavailable in Codex. Use the closest Codex agent capability and include the full capsule; do not claim the PStack-specific role ran.

## Route evidence

Use the repository route registry at `docs/pstack-openspec-route-map.json`; installed projects use `.orbitstack/pstack-openspec-route-map.json`. Run `scripts/audit-pstack-openspec-routing.ps1` in the source repository or `.orbitstack/scripts/audit-pstack-openspec-routing.ps1` in an installed project. A route is behaviorally verified only by a PStack-compliant blinded Eval with observed routes, actual task/gate behavior, transcript evidence, and an independent judge. Classification-only results remain labeled as such.
