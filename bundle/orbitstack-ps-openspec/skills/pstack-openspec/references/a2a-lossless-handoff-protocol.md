# Lossless PStack subagent handoff

This extension adds provenance fields to PStack's Consolidated Scope capsule. PStack remains the handoff method. OpenSpec remains the only durable task record.

## Capsule source

Generate the dispatch capsule from the active OpenSpec proposal, `tasks.md`, relevant specs, and Git state. Preserve the original user request exactly as recorded in the proposal. Preserve each appended directive in chronological order. Include:

- OpenSpec change ID and task ID.
- Selected PStack playbook and its steps.
- Current branch, base commit, and working-tree status digest.
- Writable and read-only paths.
- Prior verified work and failures that affect the task.
- Protected invariant IDs and regression checks.
- Non-goals and acceptance commands.
- Paths and content hashes for governing instructions and skill sources.

The capsule is an ephemeral message generated from OpenSpec and Git. It is not a second stored task plan. Any persistent task state stays in OpenSpec.

## Dispatch and return

1. The parent chooses the PStack playbook and identifies the OpenSpec task.
2. The capsule generator validates the task metadata and computes a SHA-256 digest over canonical JSON.
3. The parent dispatches a fresh subagent with the PStack playbook steps, capsule, and source-file pointers.
4. The subagent acknowledges the OpenSpec task ID and capsule digest before editing.
5. The parent checks the acknowledgement, branch, diff paths, and evidence against the capsule.
6. The parent independently runs acceptance checks and updates `tasks.md`.

A changed instruction file, task description, or capsule field changes the digest. The parent regenerates the capsule before dispatching a follow-up.

## Shared state and failure handling

Each parallel writer uses an isolated worktree or branch. The parent is the only writer to shared OpenSpec change files. A missing task ID, digest mismatch, source-hash mismatch, or out-of-scope path makes the handoff unverified. The parent rejects that result and reissues a corrected PStack capsule.

If a Codex host cannot create the PStack `poteto-agent` role, map the work to an available Codex agent and state the host fallback in the capsule. Keep the PStack playbook and its intent intact.
