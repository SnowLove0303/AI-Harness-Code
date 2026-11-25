## ADDED Requirements

### Requirement: Human-Authorized Multi-Agent Spawning & Single-Instance-Per-Role Cap (REQ-1, PROP-C)
Agents and coordinators SHALL NOT spawn multiple concurrent subagents or initiate a Swarm without explicit human authorization (`HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE`), and SHALL enforce a strict single-instance-per-role cap (`SINGLE_INSTANCE_PER_ROLE_CAP`) superseding `Fresh Subagents by Default` in Axiom 30 and unconditional multi-worker dispatch in Axiom 61.

#### Scenario: Unauthorized multi-agent spawn or duplicate role instance is blocked
- **WHEN** `evaluateAgentLifecycleAction` evaluates a `spawn` or `swarm_add` action requesting multiple concurrent agents without `humanAuthorized: true`, or targeting a role already held by an active/idle agent
- **THEN** it SHALL fail with `UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED` or `DUPLICATE_ROLE_INSTANCE_BLOCKED`.

### Requirement: Role-Pinned Persistent Agent Reuse & Focused Handoff (REQ-2, PROP-D)
Prior to delegating any task, the coordinator SHALL inspect existing subagents/Swarm members and reuse any existing agent matching the required `role` via `send_message` with focused task boundaries and file anchors (`ROLE_PINNED_PERSISTENT_REUSE_MANDATE`, `FOCUSED_REUSE_CHECKPOINT_HYGIENE`).

#### Scenario: Existing role-matched agent is reused instead of spawning a new one
- **WHEN** an active or idle agent already holds the target `role` and a new task for that `role` arrives
- **THEN** the lifecycle evaluator SHALL select `REUSE_EXISTING_AGENT` via `send_message` and block redundant spawning.

### Requirement: Human-Authorized Agent Termination Lock (REQ-3)
Agents SHALL NOT call `kill` or `kill_all` on any subagent or Swarm worker without explicit human authorization (`HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK`). Idle agents SHALL remain parked for future reuse.

#### Scenario: Unprompted kill/kill_all action is blocked
- **WHEN** `evaluateAgentLifecycleAction` evaluates a `kill` or `kill_all` action with `humanAuthorized !== true`
- **THEN** it SHALL fail with `UNAUTHORIZED_AGENT_TERMINATION_BLOCKED`.

### Requirement: Automated L2 Agent Lifecycle Guard & Axiom 77 Parity (REQ-4, PROP-E)
The repository SHALL provide `scripts/check-agent-lifecycle.mjs` (`AUTOMATED_L2_AGENT_LIFECYCLE_GUARD_STANDARD`, registered as `npm run guard:agent-lifecycle`) and codify **Axiom 77** (`ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 74) using pure universal software engineering abstractions (`AXIOM_77_PARITY_&_SUPERSESSION_STANDARD`).

#### Scenario: L2 tests and three-mirror parity pass with Exit Code 0
- **WHEN** `npm run guard:agent-lifecycle`, `tests/controlled-agent-lifecycle.test.mjs`, and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.
