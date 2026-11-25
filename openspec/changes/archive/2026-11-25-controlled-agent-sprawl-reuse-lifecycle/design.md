# Technical Design: Anti-Sprawl, Role-Pinned Persistent Reuse & Lifecycle Lock (Axiom 77)

## 1. Decision Engine (`scripts/check-agent-lifecycle.mjs`)
Exports `evaluateAgentLifecycleAction(request)`:
Inputs:
- `action`: `'spawn' | 'swarm_add' | 'reuse' | 'kill' | 'kill_all'`
- `targetRole`: string
- `existingAgents`: `[{ id, role, status }]`
- `concurrentCount`: number (optional)
- `humanAuthorized`: boolean

Deterministic Rules:
1. **`kill` / `kill_all`**: If `humanAuthorized !== true` -> `{ allowed: false, code: 'UNAUTHORIZED_AGENT_TERMINATION_BLOCKED' }`.
2. **`spawn` / `swarm_add`**:
   - If `(concurrentCount > 1 || action === 'swarm_add') && humanAuthorized !== true` -> `{ allowed: false, code: 'UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED' }`.
   - If `existingAgents` already contains an active/idle agent with `agent.role === targetRole` -> `{ allowed: false, code: 'DUPLICATE_ROLE_INSTANCE_BLOCKED', recommendedAction: 'REUSE_EXISTING_AGENT', targetAgentId: match.id }`.
3. **`reuse`**:
   - Allowed when matching `existingAgents` entry exists and `focusedScope` is provided (`FOCUSED_REUSE_CHECKPOINT_HYGIENE`).

## 2. Constitutional Supersession Notice
In `GEMINI.md` Axiom 30 (`Fresh Subagents by Default`) and Axiom 61 (`PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT`), explicitly annotate `[SUPERSEDED BY AXIOM 77]` so no model reading Axiom 30/61 mistakenly spawns fresh subagents or kills idle ones without human authorization.
