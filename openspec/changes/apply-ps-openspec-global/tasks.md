# Tasks

## 1. PStack Feature Playbook

- [x] 1.1 `how` over the affected subsystem. Verify completion with the global file inventory and source hash comparison in `design.md`.
- [x] 1.2 `architect` for parallel design exploration. Verify completion with the chosen replacement scope and retained OpenSpec helpers recorded in `design.md`.
- [x] 1.3 Write the throughput checkpoint as four todo items. A dimension that genuinely does not apply (single file, no fan-out) keeps its item with `n/a: <reason>` rather than being dropped:
  - **Blocking first steps.** Gates run before fan-out.
  - **Independent workstreams.** Disjoint files, services, or layers parallelize. Shared writes serialize.
  - **Shared mutable state.** Default to splitting the target (the **separate-before-serializing-shared-state** principle skill). Serialize only for real invariants.
  - **Smallest safe decomposition.** If one worker is best, name why.
- [x] 1.4 Delegate code-writing to a subagent using your configured feature model (default `grok-4.7-xhigh-fast`) with a specific scope (file paths, named data shape and its organizing structure per **principle-model-the-domain**, a state machine over scattered booleans, a table/registry over branching, a typed model over repeated shape assumptions, chosen before the delegate writes logic, and success criteria). Pick each subagent's reasoning level and fast or standard speed for the job, per the Subagents section. When the implementation admits multiple valid shapes (error handling, abstraction layer, test structure), delegate via the **arena** skill instead so the runners surface the alternatives and the cross-judge guards the pick. Mandatory: no skip-with-reason escape, and Laziness Protocol does not override it (the gain is review separation, not lines saved). A subagent forbidden to spawn satisfies this by owning the diff directly with the same review separation. No "standing by" reply that waits on a nested agent. Comments per **Comments**. Surgical edits, re-ground against the source for upstream-derived files. Port shared-primitive improvements to all consumers and verify each. Commit liberally. `n/a`: no code-writing is in scope; the global settings directory is one shared mutable target and requires a single writer.
- [x] 1.5 Verify on the matching surface. "Inconclusive" or wrong-surface is not a pass. Flag it. Verify global hashes and the active Codex skills.
- [x] 1.6 Rebase into small, ordered commits. Stack follow-ups.
  Use the **sequence-verifiable-units** principle, building, verifying, and committing each small unit before the next. Verify ordered commits on `codex-adaptation` and a clean final status.
- [x] 1.7 If the design is contested, `interrogate` before shipping. Verify from the design review record whether a contested choice remains; if none, record `n/a: one PStack entry point with OpenSpec action skills is already established`.
- [x] 1.8 Run **Opening a PR**. Skip PR creation because the user authorized global application and a branch push only.

## 2. Throughput Checkpoint

- [x] 2.1 **Blocking first steps.** Gates run before fan-out. Verify the repository root, release branch, global file inventory, hashes, and OpenSpec context before writing.
- [x] 2.2 **Independent workstreams.** Disjoint files, services, or layers parallelize. Shared writes serialize. Use one isolated read-only audit of legacy skill references; the parent owns all global writes.
- [x] 2.3 **Shared mutable state.** Default to splitting the target (the **separate-before-serializing-shared-state** principle skill). Global Codex settings are one shared target, so use one writer and backup before mutation.
- [x] 2.4 **Smallest safe decomposition.** If one worker is best, name why. One writer is safest because Codex may load these global skills while this task runs.

## 3. Global application

- [x] 3.1 Record both user requests, repository branch and base, global writable/protected paths, backup path, and acceptance commands in OpenSpec.
- [x] 3.2 Have a read-only agent audit that active PStack instructions and OpenSpec action skills do not depend on the three legacy broad skills. Verify with an audit report.
- [x] 3.3 Create a timestamped backup of the current global route map and the three legacy broad skill directories. Verify the backup contains each original path.
- [x] 3.4 Copy the repository route map to the global Codex route-map path. Verify SHA-256 equality with `docs/pstack-openspec-route-map.json`.
- [x] 3.5 Move the legacy `pstack-openspec`, `ai-harness-openspec`, and `spec-driven-workflow` directories out of active global skill discovery into the backup. Keep the `openspec-*` action skills active. Verify legacy names are absent from the active skills directory.
- [x] 3.6 Verify the PStack tree, Codex adapter, `AGENTS.md`, and `Agent.md` still match repository sources; verify all OpenSpec action skills remain installed.
- [x] 3.7 Run `openspec validate --all --strict` and record the result.
- [x] 3.8 Commit and push the global-application evidence to `codex-adaptation`; verify `main` and the release branch remain unchanged.
- [x] 3.9 Skip PR creation. The user authorized global installation and a branch push, not a PR.
