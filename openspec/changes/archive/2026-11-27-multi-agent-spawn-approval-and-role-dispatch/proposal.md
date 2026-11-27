# Proposal: Strict Human Spawn Approval, Priority Role Reuse & Poteto Multi-Agent Role Dispatch (`multi-agent-spawn-approval-and-role-dispatch`)

## Why
Uncontrolled creation of new Swarm workers or Subagents across threads causes context fragmentation, duplicate effort, and unapproved resource usage. Simultaneously, poteto's multi-agent architecture (`orchestrate.md` & `poteto-agent.md`) demonstrates that coordinator-worker separation, explicit role/path boundaries, and follow-up reuse outperform ad-hoc spawning.

## What Changes
- Codify **Axiom 82 (`STRICT_HUMAN_SPAWN_APPROVAL_PRIORITY_REUSE_&_ROLE_DISPATCH_AXIOM`)** across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 79), `worker.md` (Section 1r), and `README.md`.
- Upgrade `scripts/check-agent-lifecycle.mjs` so **every** `spawn` or `swarm_add` (even `concurrentCount === 1`) requires `humanAuthorized === true`, enforces priority reuse of existing same-role agents, mandates `roleTag` + `roleDetail` metadata, and blocks role-mismatched task dispatch (`ROLE_TASK_MISMATCH_BLOCKED`).
- Add comprehensive unit tests in `tests/agent-lifecycle-governance.test.mjs` and `scripts/tests/gemini-adapter.test.mjs`.

## 1:1 Spec-Kit RTM

| Req ID | Summary | Acceptance Criteria |
|---|---|---|
| **REQ-01** | Zero unapproved Swarm/Subagent spawning in any thread | `spawn` (even count=1) and `swarm_add` without `humanAuthorized: true` are blocked with `UNAUTHORIZED_SPAWN_WITHOUT_USER_APPROVAL_BLOCKED`. |
| **REQ-02** | Priority reuse of existing same-role agents | Active/idle agents with matching `roleTag` trigger `DUPLICATE_ROLE_INSTANCE_BLOCKED` / `REUSE_EXISTING_AGENT` before any new spawn. |
| **REQ-03** | Mandatory `roleTag` + `roleDetail` and role-matched task dispatch | Missing `roleTag`/`roleDetail` triggers `MISSING_AGENT_ROLE_METADATA_BLOCKED`; cross-role task dispatch triggers `ROLE_TASK_MISMATCH_BLOCKED`. |
| **REQ-04** | Poteto multi-agent architecture alignment | Constitution & `worker.md` explicitly integrate poteto coordinator-worker separation, explicit scope boundaries, and verifier independence alongside Axiom 82. |
