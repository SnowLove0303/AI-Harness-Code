## ADDED Requirements

### Requirement: Strict Human Approval Gate for Any Swarm or Subagent Spawn
Every thread MUST obtain explicit user approval (`humanAuthorized === true`) via a dedicated request before spawning any new Swarm member or Subagent, regardless of count (`concurrentCount >= 1`).

#### Scenario: Blocking unapproved single subagent spawn
- **WHEN** an agent attempts `action: "spawn"` with `concurrentCount: 1` and `humanAuthorized !== true`
- **THEN** `evaluateAgentLifecycleAction` MUST return `allowed: false` with `code: "UNAUTHORIZED_SPAWN_WITHOUT_USER_APPROVAL_BLOCKED"`.

### Requirement: Priority Reuse of Existing Role-Pinned Agents
Before requesting or executing a new agent spawn, the coordinator MUST inspect existing active/idle agents and reuse any matching `roleTag` via `send_message`.

#### Scenario: Enforcing reuse when same-role agent exists
- **WHEN** `existingAgents` contains a non-killed agent with `role === targetRole` (or `roleTag === targetRole`)
- **THEN** `evaluateAgentLifecycleAction` MUST block duplicate spawning with `code: "DUPLICATE_ROLE_INSTANCE_BLOCKED"` and recommend `REUSE_EXISTING_AGENT`.

### Requirement: Mandatory Role Metadata and Role-Matched Task Dispatch
Every Agent (including Subagents) MUST carry `roleTag` and `roleDetail`, and assigned tasks MUST match its pinned `roleTag`.

#### Scenario: Blocking missing role metadata or cross-role task assignment
- **WHEN** `roleTag` or `roleDetail` is empty, OR `taskRoleTag` differs from the agent's pinned `roleTag`
- **THEN** `evaluateAgentLifecycleAction` MUST return `allowed: false` with `MISSING_AGENT_ROLE_METADATA_BLOCKED` or `ROLE_TASK_MISMATCH_BLOCKED`.
