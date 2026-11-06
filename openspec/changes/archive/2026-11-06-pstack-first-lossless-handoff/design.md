# Design

## Context

See `proposal.md` for the original request and conflict priority. The repository pins the complete PStack source and routes 23 playbooks through `orbitstack-codex/SKILL.md`. OpenSpec is already configured as `spec-driven`. The route report is a single-agent classification report, and the installed Code Review Graph currently reports `missing_graph` for this repository.

The current OrbitStack layer repeats some PStack rules, mandates Step 0 and dual confirmation even where PStack says to proceed, mentions a separate Blackboard, and contains cross-harness references tied to one local machine. The installer copies PStack and the OrbitStack adapter but does not configure OpenSpec's native Codex skills. The existing route registry omits per-route task-source metadata required by its spec.

**Current baseline.** `openspec context --json` resolves to this repository and OpenSpec is version 1.13.1 with the `core` skills profile. Code Review Graph was built at baseline commit `9317068ecab93f291cf36cab95b37deb95080eba`; its persisted graph reports 110 files, 1,035 nodes, and 9,246 edges. The untracked OpenSpec plan is newer than this code-graph snapshot. The graph is derived code structure and does not encode business invariants.

## Goals / Non-Goals

**Goals:**

- Make PStack's upstream mode, playbooks, principles, and skill triggers the default workflow.
- Use one OpenSpec change and `tasks.md` as the durable task and verification record.
- Preserve original intent and all follow-up directives across Agent delegation.
- Identify when code changes touch previously accepted fixes or optimizations and verify their regression guards.
- Keep Graph output derived and rebuildable, with a working fallback when Graph is not ready.
- Make a fresh Codex project install initialize the supported OpenSpec skill integration safely.

**Non-Goals:**

- Modify the pinned upstream PStack files.
- Treat the Graph database as a source of requirements, user intent, or task status.
- Keep an independent Blackboard or a second persistent task checklist.
- Require Step 0 confirmation or a dual checklist for every reversible task when PStack would proceed.
- Claim that an Agent instruction alone is a mechanical security boundary.

## Decisions

### 1. PStack-first policy precedence

The adapter will route through upstream `poteto-mode`, then the selected playbook and its leaf skills. OrbitStack rules will remain only where the user explicitly wants them or where PStack lacks a needed control. For PStack-versus-OrbitStack conflicts, PStack wins. Direct user task instructions and safety rules remain above both.

This replaces the universal Step 0 wait and repeated dual-approval gate. The agent still restates the goal as PStack requires and asks only when a genuine product decision, missing authority, or irreversible action requires the user.

### 2. OpenSpec is the sole durable work state

Each persistent task uses one active OpenSpec change. Its proposal preserves the original user request and later directives. Its specs hold accepted behavior and invariant IDs. Its `tasks.md` contains the selected PStack steps verbatim followed by task-specific work. The parent Agent is the only writer to shared change artifacts while delegated Agents use isolated branches or worktrees.

OpenSpec's supported Codex integration is initialized with `openspec init --tools codex` from a verified project root. Existing specs and project instructions remain intact. Setup checks the CLI prerequisite instead of installing runtimes or editing shell startup files.

### 3. Typed, generated handoff capsule

Use PStack's Fresh Subagents and Consolidated Scope mechanisms. The active OpenSpec proposal stores the exact original request and appended directives. The existing task entry stores task-scoped metadata in a machine-validated block. A generator validates those fields, reads the current Git state, and emits a canonical JSON capsule to the dispatcher without creating a second durable file. The capsule includes the exact original request, chronological appended directives, OpenSpec change/task IDs, selected playbook and copied steps, branch/commit, file scope, protected invariant IDs, prior verified work, non-goals, and acceptance evidence.

The generator parses the source fields from OpenSpec rather than accepting a second editable capsule file. It validates required fields and hashes canonical UTF-8 JSON with stable key ordering and line endings. The child acknowledges the task ID and capsule digest before editing. The parent verifies the acknowledgement, returned branch, changed paths, and acceptance evidence before updating `tasks.md`. A mismatch rejects the handoff result for review; the digest detects payload drift but is not an authorization or security boundary.

The capsule is a dispatch payload, not a second ledger. Its persistent facts come from OpenSpec and Git.

### 4. Graph is a derived impact view; OpenSpec owns semantic protection

OpenSpec specifications record each protected invariant with a stable ID, why it exists, the originating change/commit, implementation anchors, and regression tests or benchmarks. A structured table in the relevant spec is the source of record; no separate invariant database is added. Code Review Graph supplies changed symbols, call paths, and affected flows. The audit joins those findings to invariant anchors by repository path and qualified symbol name. The selected design is the typed-record plus generated-capsule option; independent persistent capsules and graph-only protection are rejected because they duplicate state or lack user-intent provenance.

The Graph plugin parses code structure. It does not store user intent or custom protection edges. No custom semantic edges are assumed. When the graph is missing or stale, a deterministic diff/path scan and the invariant's tests provide the fallback. This keeps work moving while preserving evidence.

Changing a protected behavior requires a new OpenSpec requirement that explicitly supersedes the existing invariant and supplies replacement evidence. Archived history remains untouched.

### 5. Machine checks enforce the contracts

The route audit will require per-route `taskSource` metadata and a `supportingSkillsSource` pointer to the selected upstream playbook. The playbook and `poteto-mode` remain the unique source for leaf-skill triggers, avoiding a duplicated skill catalog. Handoff and invariant checks validate required fields, task IDs, hashes, changed paths, and links to regression tests. Graph review remains a structured review step; the deterministic audit fails when required provenance or test evidence is missing, not merely when a Graph server is unavailable.

### 6. PStack Eval validates behavior

Use PStack's blinded candidate and judge method in sanitized workspaces. Organic tasks cover exact intent transfer, a protected historical optimization touched by a new fix, a legitimate explicit supersession, and an unrelated change. Read candidate transcripts to verify which artifacts they actually opened. Keep the prior 23/23 classification as route-selection evidence only.

## Definition of Done

- All 23 route entries identify their PStack source, per-route OpenSpec task source, and source-of-truth skill trigger policy; the structural audit rejects missing metadata.
- The generator preserves the original request and every directive in order, changes its digest when any field changes, and rejects invalid task IDs, missing scope metadata, or out-of-scope results.
- The Codex adapter and global/distributable rules consistently defer to PStack and no longer impose universal Step 0 or dual-approval waits.
- The handoff generator preserves the exact original request and appended directives, produces a stable digest, and rejects missing fields, changed digests, invalid task IDs, or out-of-scope changes.
- Every protected invariant record has provenance, source anchors, and a runnable regression check. Tests prove unauthorized regression fails and an explicit, verified supersession passes.
- Graph-assisted checks and the deterministic fallback both pass the same impact fixtures. A missing Graph does not block unrelated work.
- Blind PStack Eval covers the four required scenarios and transcript evidence supports each verdict.
- Fresh and existing Codex project installation checks pass without altering existing user specs or instructions; PStack upstream hashes remain unchanged.
- `openspec validate --all --strict`, route audit, installer checks, invariant regression checks, package checks, and `git diff --check` pass before archive and push.

## Risks / Trade-offs

- **Graph can miss semantic relationships.** Store the reason and required behavior in OpenSpec and use regression tests as the authoritative protection. Graph findings expand review coverage; they do not prove behavior by themselves.
- **Protected invariants can make legitimate changes harder.** Allow explicit supersession through a user-requested OpenSpec requirement and replacement test, while keeping old archive records immutable.
- **Codex and upstream PStack use different subagent roles.** Map `poteto-agent` to the available Codex worker/explorer roles and include the capsule contract in the dispatch prompt. Report unsupported model routing or Cursor-only features rather than claiming parity.
- **Codex OpenSpec setup may be unavailable in a target environment.** Detect the missing CLI or Node prerequisite, provide the exact setup path, and retain the task record in the current valid OpenSpec root while independent work continues.
- **The existing route eval is not a blinded behavior test.** Keep its 23/23 classification result clearly labeled and add the PStack-compliant candidate/judge evaluation before claiming runtime behavior passes.

## Migration Plan

1. Update the routing and handoff specifications in this change.
2. Refactor the global and distributable adapter rules to PStack-first precedence and remove duplicate Blackboard/task state.
3. Add per-route task-source fields and strengthen structural checks.
4. Update Codex installers to verify OpenSpec prerequisites and run the native Codex initialization without overwriting existing project content.
5. Add invariant provenance and graph-assisted/fallback audit steps, then run the blind Eval fixtures.
6. Run OpenSpec strict validation, installer tests in isolated projects, regression-protection tests, and package-content checks.
7. Archive and package only after all acceptance criteria pass; publish only on the already authorized Ps-openspec branch.

## Open Questions

None block this design. Exact CLI-version minimums and the mechanism used to run the deterministic protected-invariant check in CI will be resolved during implementation from the installed OpenSpec CLI and repository scripts, without changing the requirements above.
