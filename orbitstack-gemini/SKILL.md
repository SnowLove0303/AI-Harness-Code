---
name: orbitstack-pstack-openspec
description: PStack-first Google Gemini and Antigravity adapter. Routes tasks through the pinned upstream poteto-mode, leverages native subagents and artifacts, dynamic model tiering (flash_lite/flash/pro), and uses OpenSpec as the only durable task record.
---

# PStack-first Gemini / Antigravity adapter

This adapter connects Google Gemini and Antigravity to the pinned upstream PStack source and OpenSpec. It does not replace PStack playbooks or add a competing task workflow.

## Task routing

1. Route every Gemini task through the full upstream `skills/poteto-mode/SKILL.md`. Restate the goal as PStack requires, select the matching playbook, and read it and each leaf skill or principle it triggers.
2. Copy the selected playbook steps verbatim into the active OpenSpec `tasks.md` before task-specific items. Use `figure-it-out` for a large cross-cutting run and `orchestrate` only for a standing program that exceeds one session's task scope.
3. PStack controls task execution. Proceed autonomously on reversible work within the user's request. Ask only for a genuine product decision, missing user authority, an explicit user-named gate, or an irreversible action. Direct user instructions and safety boundaries remain authoritative.
4. If Gemini lacks a specific PStack feature (e.g. Cursor-only automation), use the closest native Gemini equivalent or mark that step unavailable. Continue independent work and report the limitation.

## Spec-Kit zero-loss ingestion & dual-gate workflow

1. Phase 1 (Spec-Kit Zero-Loss Ingestion):
   - Capture user raw input verbatim without over-summarization or scope decay.
   - Construct a 1:1 Requirement Traceability Matrix (RTM): map every user point (1, 2, 3, 4) to an atomic `REQ-01`, `REQ-02`... preserving Count Parity (N_raw == N_matrix).
   - Expand each requirement with Spec-Kit's triad: Scenario/Scope, detailed functional assertion, and verifiable Acceptance Criteria.
   - Gate 1 (Detailed Brief): Present the comprehensive, uncompressed requirement dossier to the user. Do not proceed to OpenSpec drafting until the user gives explicit confirmation.
2. Phase 2 (Ps-openspec Expansion & Gate 2):
   - Upon Gate 1 confirmation, inject the 1:1 RTM into `proposal.md` and generate RFC 2119 specs for each requirement.
   - Decompose into atomic tasks in `tasks.md`, each bound to a specific verification command. Enforce Roo-Code/Cline single-focus execution (`[-]` lock: exactly one active in-progress task at a time).
   - Gate 2 (Plan & Dual-Checklist): Present the technical approach, architecture topology, and Dual-Checklist (Proposed Scope + Preserved Commitments). Await user explicit authorization before modifying source code.
3. Phase 3 (Bidirectional Delivery Checkoff):
   - In the final report, verify each original requirement (REQ-01...N) against measured command evidence with exit code 0.

## OpenSpec lifecycle

1. Resolve the target project root, run `openspec context --json` there, and verify the returned path.
2. If the project lacks OpenSpec, run `openspec init --tools gemini` at the verified root. Verify context and `.gemini/skills/openspec-*` files afterward. If the CLI is missing or too old, report its prerequisite and recovery command.
3. Use the installed OpenSpec skills for proposal, exploration, apply, update, sync, and archive. Keep one active change and one `tasks.md`. Reuse the active change when it owns the requested work.
4. Keep all PStack task status and evidence in OpenSpec. Do not create a Blackboard or a second persistent task ledger. Run `openspec validate --all --strict` before archive.

## OpenSpec Explore mode tooling (Phase 1 Thinking)

1. Explore mode is strictly for understanding, trade-off analysis, and architecture exploration. Absolutely no business code edits or file creation during Explore.
2. Resolve working context via `openspec context --json` to identify active changes and living specs.
3. Retrieve machine guidance and schema templates with `openspec instructions <artifact>` (e.g., `proposal`, `specs`, or `tasks`).
4. Persist exploration traces, calling topologies, and Mermaid diagrams into `<appDataDir>\brain\<conversation-id>` artifacts rather than flooding conversation context.
5. Once aligned with the user on design, present the Dual-Checklist and transition to Phase 2 (OpenSpec Propose).

## Dynamic reasoning budget (pstack-models -> Gemini model tiers)

Map PStack reasoning budgets dynamically to Gemini model tiers when invoking subagents or running tasks:
- `flash_lite` (Fast / Low-overhead): Route classification, syntax checking, fast search, linting, and git status parsing.
- `flash` or `inherit` (Balanced / Daily coding): Feature construction, bug fixing, refactoring, prototyping, and test-driven development (TDD) loops.
- `pro` (High-reasoning / Critical analysis): Architecture review (`/architect`), red-team interrogation (`/interrogate`), Arena blind evaluation judging (`/arena`), and deep metric hillclimbing (`/hillclimb`).

## Lossless PStack handoff via native subagents

Use PStack's Fresh Subagents and Consolidated Scope methods backed by Gemini's native agent capabilities:
1. Generate a dispatch capsule from OpenSpec and Git state using `node <helper-path>/pstack-handoff.mjs generate --change <change-id> --task <task-id>`. (In the source repo, `<helper-path>` is `scripts`; in installed projects, it is `.orbitstack/scripts`).
2. Dispatch the subagent via native `invoke_subagent` with `Workspace='branch'` (or `'share'`) and the appropriate `Model` tier. Inject the capsule into the dispatch prompt under the mandatory execution header:
   `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`
3. Reactive Wakeup: Do not poll or query in a loop. The system automatically resumes the parent agent when the background subagent completes or delivers a message.
4. Verify returned work before updating OpenSpec: pipe the returned capsule into `node <helper-path>/pstack-handoff.mjs verify-return --ack-task <task-id> --ack-digest <capsule-digest> --changed-path <path> --root <project-root>`. Check every changed path.
5. Zero-Trust re-verification: The parent agent independently re-runs acceptance checks in the main environment. Only when verified with exit code 0 does the parent mark the task complete in `tasks.md`.

## Context shielding & artifacts

- Subagents must not flood the parent conversation context with raw compiler outputs, build traces, or diff streams.
- Multi-step reports, diff analyses, and architectural diagrams must be preserved as structured Markdown documents in `<appDataDir>\brain\<conversation-id>`.
- The subagent delivers a concise fact capsule (1,000 to 2,000 tokens) pointing to the artifact, keeping parent context clean and preventing context decay.

## Historical-invariant review with Graph

1. Call Code Review Graph `get_minimal_context_tool` first. Rebuild/update when it reports stale or missing data, then run change and affected-flow analysis for the changed symbols and paths. Inspect those results for links to protected invariant IDs in OpenSpec specs.
2. Run each linked regression test or benchmark. Require a new OpenSpec requirement that explicitly supersedes the old invariant when the user asks to change protected behavior. Keep archived history unchanged.
3. Treat Graph as derived code-structure evidence. If its graph is absent, stale, or unavailable, use `git diff`, path and symbol search, and the mapped regression checks. A missing Graph never blocks unrelated PStack work.

## Gemini host mapping

- Read the immutable upstream copy at `C:\Users\Administrator\.gemini\pstack-upstream\skills\` for global tasks, or `.orbitstack/pstack-upstream/skills/` for project installs. Resolve every playbook through the matching route registry.
- Read global rules at `C:\Users\Administrator\.gemini\config\GEMINI.md` or `.gemini/` in workspace. Preserve the target project's existing instructions, architecture facts, build commands, and official domain pipelines.
- Open code changes in VS Code for review. Prioritize the `vscode-review` MCP tool `review_diff_in_vscode`; fallback to `code --reuse-window --diff <base> <proposed>` if MCP is unavailable.

## Route evidence & specification dependencies

- Specification dependencies: `orbitstack-pstack-routing` anchors on `bundle/pstack-upstream/` (SHA-256 pinned) and `docs/pstack-openspec-route-map.json`. The package release depends on `ps-openspec-distribution`.
- Use the repository route registry at `docs/pstack-openspec-route-map.json`; installed projects use `.orbitstack/pstack-openspec-route-map.json`. Run `scripts/audit-pstack-openspec-routing.ps1` in the source repository or `.orbitstack/scripts/audit-pstack-openspec-routing.ps1` in an installed project.
