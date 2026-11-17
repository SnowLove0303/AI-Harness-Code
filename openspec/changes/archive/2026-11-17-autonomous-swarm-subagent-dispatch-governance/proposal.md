# Change Proposal: Autonomous Swarm & Subagent Proactive Dispatch Governance

## Why
Despite previous constitutional codification mandating that the Lead Agent acts purely as an orchestrator and coordinator (Axiom 56 & Axiom 58), empirical observation reveals that many Lead Agents still fail to proactively utilize Swarm and Subagent mechanisms. Agents frequently regress to monolithic single-agent behavior, writing code directly in the primary context or hesitating to dispatch workers due to tooling friction, high activation energy, ambiguous tool boundaries between `invoke_subagent` and `swarm`, and the absence of pre-execution structural delegation enforcement.

To permanently eradicate this systemic failure mode, this change introduces **Axiom 61: Autonomous Swarm & Subagent Proactive Dispatch Axiom (`AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM`)**. This axiom establishes a deterministic dual-engine dispatch router, mandates zero-friction execution defaults (eliminating model hesitation and workspace crashes), enforces mandatory delegation ticketing in Step 2 `tasks.md`, and incorporates pre-execution role regression hard gates.

## Action Skill Match Declaration
依据公理 57（`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`），本变更在 Step 0 / Step 1 阶段对执行层技能库进行前置扫描与深度匹配：
- **匹配结果**：
  - `pstack-openspec` (`C:\Users\Administrator\.gemini\config\skills\pstack-openspec\SKILL.md`)：统领多 Agent 协作信任金字塔、裁执物理隔离与四位一体任务交接。
  - `ai-harness-openspec` (`C:\Users\Administrator\.gemini\config\skills\ai-harness-openspec\SKILL.md`)：统领单任务专注锁 `[-] lock`、双清单门禁与 OpenSpec 生命周期。

## What Changes
1. **Constitutional Axiom 61 Legislation**: Formally legislate Axiom 61 (`AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **Dual-Engine Deterministic Dispatch Routing Protocol**: Define an unequivocal, non-overlapping routing specification segregating browser/UI tasks (`invoke_subagent` with `browser`) from code implementation/multi-file refactoring tasks (`swarm`) (`DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL`).
3. **Zero-Friction Default Dispatch Standard**: Codify zero-friction parameter baselines (`workspace="inherit"`, automatic model inheritance) to eliminate startup friction, parameter hesitation, and workspace VCS errors (`ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD`).
4. **Mandatory Delegation Ticketing Invariant**: Enforce that all implementation and multi-file tasks defined in Step 2 `tasks.md` MUST explicitly format task items with delegation target annotations (e.g., `[-] [Swarm: <worker-name>]`), structurally prohibiting monolithic self-execution (`MANDATORY_DELEGATION_TICKETING_INVARIANT`).
5. **Anti-Monolithic Pre-Execution Hook Gate**: Establish a pre-execution structural gate blocking any direct business code modification by the Lead Agent in Step 3 without active Swarm dispatch evidence (`ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE`).
6. **Automated L2 Test Suite & Mirror Alignment**: Implement `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` verifying all invariants, accompanied by regression assertions in `scripts/tests/gemini-adapter.test.mjs`.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| Req ID | User Requirement & Scenario | Specification Requirement | Verification Target |
| :--- | :--- | :--- | :--- |
| **REQ-01** | Global application of latest Ps-openspec across all mirrors | Universal Ps-openspec Mirror Synchronization | `node scripts/sync-to-global.mjs` & test suites (Exit Code 0) |
| **REQ-02** | Proactively eliminate Lead Agent reluctance to utilize Swarm/Subagents | Proactive Autonomous Delegation Invariant | `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` (Test 1 & 4) |
| **REQ-03** | Minimal dual-engine deterministic routing (clear division of labor) | Dual-Engine Deterministic Dispatch Routing Protocol | `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` (Test 2 & 5) |
| **REQ-04** | Eliminate dispatch friction and parameter hesitation | Zero-Friction Default Dispatch Standard | `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` (Test 3) |
| **REQ-05** | Mandatory delegation ticketing in `tasks.md` | Mandatory Delegation Ticketing Invariant | `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` (Test 4 & 6) |
| **REQ-06** | Constitutional codification & domain neutrality (Axiom 61) | Axiom 61 Constitutional Legislation and Domain Neutrality | `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` (Test 1, 2, 7, 8) |
