# PStack-first Codex execution

This file connects the pinned upstream PStack workflow to OpenSpec for this repository. The upstream PStack source in `bundle/pstack-upstream/` is authoritative and immutable. The Codex adapter is `orbitstack-codex/SKILL.md`.

For Codex, keep the global PStack source, adapter, and route registry aligned with the versions installed by the selected host. Project installs use `.orbitstack/pstack-upstream/`, `.agents/skills/orbitstack-pstack-openspec/`, and `.orbitstack/pstack-openspec-route-map.json`.

## Authority and routing

- Follow the user's current request and safety boundaries first. PStack is the primary execution method. OrbitStack rules only fill gaps explicitly named in this file.
- Route every Codex task through upstream PStack. Use `poteto-mode` to select the matching playbook, including Investigation for read-only questions. Read the full mode and selected playbook, copy playbook steps into OpenSpec `tasks.md` when a persistent change is in scope, and load each named PStack skill or principle when its trigger fires.
- Use PStack's goal restatement and autonomous progression. Proceed on reversible work within the requested scope. Pause only for a genuine user decision, an explicit user-named gate, a missing authorization, or an irreversible action.
- A Codex host limitation requires an honest equivalent or a named unavailable step. Never report a Cursor-only agent, model route, automation, or control surface as run in Codex.
- Keep one authoritative instance of each application, config, port, version line, or production artifact. Search the project and Graph impact before creating another instance. Treat user-authorized parallel versions as explicit exceptions.

## OpenSpec task lifecycle

- Resolve the OpenSpec root from the project the user named. Run `openspec context --json` there and verify its returned path. If OpenSpec is absent, run `openspec init --tools codex` at that root and verify context again. Correct a wrong root before continuing.
- Use one active OpenSpec change for persistent work. Store intent and appended directives in `proposal.md`, behavior and preservation requirements in specs, and the PStack playbook steps and task progress in `tasks.md`.
- Keep OpenSpec as the only durable task state. Do not add a parallel checklist, Blackboard, or task database. A dispatch capsule is generated from OpenSpec and Git when needed; it is not another source of truth.
- Use the installed OpenSpec skills for propose, explore, apply, update, sync, and archive. Use `openspec instructions` or `openspec status` when the next artifact or task state is unclear. Run `openspec validate --all --strict` before archive.
- Preserve existing project specs, AGENTS instructions, architecture facts, build commands, and domain pipelines during setup or updates.

## Extension 1: lossless PStack handoff

Use PStack's Fresh Subagents and Consolidated Scope methods. Add only the data needed to prevent intent loss:

- The original user request verbatim and each later directive in chronological order.
- OpenSpec change and task IDs, selected playbook, copied playbook steps, branch and base commit.
- Writable and read-only paths, prior verified work, non-goals, protected invariant IDs, and acceptance evidence.
- A canonical capsule digest. The receiver acknowledges the task ID and digest before editing.

Give each worker an isolated branch or worktree. The parent Agent is the only writer to shared OpenSpec task state. Review the returned diff and independently rerun the acceptance checks before marking a task complete.

## Extension 2: protect accepted behavior with OpenSpec and Graph

- Record a protected behavior as an OpenSpec requirement with a stable invariant ID, source change or commit, implementation anchor, and runnable regression check.
- Before accepting a code change, call Code Review Graph `get_minimal_context_tool` first. Rebuild or update a missing/stale graph, then run the change and affected-flow analysis for changed symbols and paths. Check any linked invariants and regression tests, and record the graph's compared commit in OpenSpec evidence.
- Treat Graph as a derived code map. OpenSpec owns the reason a behavior is protected and its task state. If Graph is absent or stale, use `git diff`, path and symbol search, and the mapped regression checks.
- A change to a protected behavior needs an explicit OpenSpec requirement that supersedes the old one and evidence that the replacement works. Keep archived records unchanged.
- For a project with an official domain engine or controlled artifact pipeline, preserve that project's existing route and use it for its artifacts.

## Codex review and evidence

- Open the active project in VS Code for code changes. Use the configured review MCP if available; otherwise open the relevant `code --reuse-window --diff <base> <proposed>` views.
- Use the relevant PStack verification and review steps. Label evidence as measured, inferred, or unknown. A completed task must point to a real artifact or command result.
- For multi-step work, keep a concise decision trail in the active OpenSpec change. PStack's Correct or Reflect workflow owns recurring-error learning; do not write duplicate process documents.
