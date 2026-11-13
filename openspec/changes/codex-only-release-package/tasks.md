# Tasks

## 1. PStack Feature Playbook

- [x] 1.1 `how` over the affected subsystem. Verify completion with a recorded package flow and file ownership map in `design.md`.
- [x] 1.2 `architect` for parallel design exploration. Verify completion with a documented choice and rejected alternative in `design.md`.
- [x] 1.3 Write the throughput checkpoint as four todo items. A dimension that genuinely does not apply (single file, no fan-out) keeps its item with `n/a: <reason>` rather than being dropped:
  - **Blocking first steps.** Gates run before fan-out.
  - **Independent workstreams.** Disjoint files, services, or layers parallelize. Shared writes serialize.
  - **Shared mutable state.** Default to splitting the target (the **separate-before-serializing-shared-state** principle skill). Serialize only for real invariants.
  - **Smallest safe decomposition.** If one worker is best, name why.
- [x] 1.4 Delegate code-writing to a subagent using your configured feature model (default `grok-4.7-xhigh-fast`) with a specific scope (file paths, named data shape and its organizing structure per **principle-model-the-domain**, a state machine over scattered booleans, a table/registry over branching, a typed model over repeated shape assumptions, chosen before the delegate writes logic, and success criteria). Pick each subagent's reasoning level and fast or standard speed for the job, per the Subagents section. When the implementation admits multiple valid shapes (error handling, abstraction layer, test structure), delegate via the **arena** skill instead so the runners surface the alternatives and the cross-judge guards the pick. Mandatory: no skip-with-reason escape, and Laziness Protocol does not override it (the gain is review separation, not lines saved). A subagent forbidden to spawn satisfies this by owning the diff directly with the same review separation. No "standing by" reply that waits on a nested agent. Comments per **Comments**. Surgical edits, re-ground against the source for upstream-derived files. Port shared-primitive improvements to all consumers and verify each. Commit liberally. Verify the worker task ID and capsule digest are acknowledged, and review its diff against the agreed package-builder scope.
- [x] 1.5 Verify on the matching surface. "Inconclusive" or wrong-surface is not a pass. Flag it. Verify the Codex and Gemini package archives in a temporary directory.
- [x] 1.6 Rebase into small, ordered commits. Stack follow-ups.
  Use the **sequence-verifiable-units** principle, building, verifying, and committing each small unit before the next. Verify ordered commits on `codex-adaptation` and a clean final status.
- [x] 1.7 If the design is contested, `interrogate` before shipping. Verify from the design review record whether a contested choice remains; if none, record `n/a: the existing single package builder already owns both target archives`.
- [x] 1.8 Run **Opening a PR**. Skip PR creation because the user asked for a new branch only; record that scope decision in `proposal.md`.

## 2. Throughput Checkpoint

- [x] 2.1 **Blocking first steps.** Gates run before fan-out. Verify with the OpenSpec context, existing package-flow review, and clean base `dbfec44` on `release/ps-openspec-v2.00`.
- [x] 2.2 **Independent workstreams.** Disjoint files, services, or layers parallelize. Shared writes serialize. Verify the worker owns only `scripts/package-bundle.ps1`, while the parent owns OpenSpec, `package.json`, and docs.
- [x] 2.3 **Shared mutable state.** Default to splitting the target (the **separate-before-serializing-shared-state** principle skill). Serialize only for real invariants. Verify the worker worktree is isolated and the parent is the only OpenSpec writer.
- [x] 2.4 **Smallest safe decomposition.** If one worker is best, name why. Verify one worker edits the existing package builder, whose assembly logic must remain coherent in one file.

## 3. Implementation Units

- [x] 3.1 Record the verbatim request, later directive, branch, base commit, protected paths, and acceptance commands in OpenSpec. Verify the proposal and design from disk.
- [x] 3.2 Add the `pack:codex` command and Codex package instructions. Verify the command points to the existing builder with `TargetHarness codex`.
- [x] 3.3 Limit the Gemini-specific reference to Gemini archives. Verify the Codex archive excludes the Gemini adapter and Gemini-only reference, while the Gemini archive retains them.
- [x] 3.4 Confirm release metadata does not apply to the root package. Verify the root package is outside the pnpm workspace and leave out a Changesets record for the unrelated npm package.
- [x] 3.5 Build Codex and Gemini archives in isolated temporary directories. Verify required adapter, PStack source, route map, and installers in the Codex ZIP, and verify Gemini-specific assets stay in the Gemini ZIP.
- [x] 3.6 Review `git diff`, Code Review Graph change/flow analysis or its fallback, OpenSpec strict validation, and the final branch status. Record the compared commit and command results.
- [x] 3.7 Open the relevant code diff in VS Code if available, or report the editor fallback accurately.
- [ ] 3.8 Push the completed changes to the new `codex-adaptation` branch. Verify the remote head matches the final local SHA and that the release and main branches remain unchanged.
- [x] 3.9 Skip PR creation. The user asked for a branch push, and PR creation is outside that authorization.
