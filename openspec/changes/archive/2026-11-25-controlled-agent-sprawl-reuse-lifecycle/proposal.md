# Change Proposal: Anti-Sprawl Controlled Spawning, Role-Pinned Persistent Reuse & Human-Authorized Termination Lock (Axiom 77)

## Why
Unrestricted subagent/swarm spawning (`Fresh Subagents by Default` in Axiom 30 and unconditional multi-worker dispatch in Axiom 61) causes unnecessary token sprawl, duplicated context discovery, and loss of accumulated domain knowledge, while unprompted `kill`/`kill_all` calls prematurely destroy reusable specialized agents. Aligning with Anthropic, LangGraph, and CrewAI anti-sprawl & role-pinning best practices, this change formally supersedes conflicting clauses in Axiom 30 and Axiom 61 with **Axiom 77**: human authorization is mandatory before spawning multiple subagents/swarms or terminating any agent, and role-pinned specialized agents must be persistently reused via `send_message`.

## What Changes
1. **REQ-1 (Anti-Sprawl Controlled Spawning)**: Prohibit spawning multiple concurrent subagents or initiating a Swarm without explicit human authorization (`UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED`), formally superseding unconditional multi-dispatch clauses in Axiom 30 and Axiom 61.
2. **REQ-2 (Role-Pinned Persistent Reuse)**: Require inspecting active/idle agents first and reusing existing role-matched agents via `send_message` rather than spawning duplicates (`ROLE_PINNED_AGENT_REUSE_MANDATE`).
3. **REQ-3 (Human-Authorized Termination Lock)**: Prohibit calling `kill`/`kill_all` on any subagent or Swarm worker without explicit human permission (`UNAUTHORIZED_AGENT_TERMINATION_BLOCKED`); keep idle agents parked at zero token cost for future reuse.
4. **REQ-4 (Axiom 77 Three-Mirror Codification)**: Codify Axiom 77 (`ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 74), with Supersession notes on Axiom 30/61.
5. **PROP-C (Single-Instance-Per-Role Cap)**: Enforce a strict 1-instance-per-role ceiling for persistent specialized agents (`DUPLICATE_ROLE_INSTANCE_BLOCKED`).
6. **PROP-D (Focused Checkpoint Handoff Hygiene)**: Require focused task boundaries and file anchors on `send_message` reuse to prevent context drift without terminating the agent.
7. **PROP-E (Automated L2 Agent Lifecycle Guard)**: Create `scripts/check-agent-lifecycle.mjs` (`npm run guard:agent-lifecycle`) to deterministically validate spawn, reuse, and termination decisions.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Human-Authorized Multi-Agent Spawning | `HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE` |
| REQ-2 | Role-Pinned Persistent Agent Reuse | `ROLE_PINNED_PERSISTENT_REUSE_MANDATE` |
| REQ-3 | Human-Authorized Termination Lock | `HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK` |
| REQ-4 | Axiom 77 Codification & Axiom 30/61 Supersession | `AXIOM_77_PARITY_&_SUPERSESSION_STANDARD` |
| PROP-C | Single-Instance-Per-Role Cap | `SINGLE_INSTANCE_PER_ROLE_CAP` |
| PROP-D | Focused Reuse Message Hygiene | `FOCUSED_REUSE_CHECKPOINT_HYGIENE` |
| PROP-E | Automated L2 Agent Lifecycle Guard | `AUTOMATED_L2_AGENT_LIFECYCLE_GUARD_STANDARD` |
