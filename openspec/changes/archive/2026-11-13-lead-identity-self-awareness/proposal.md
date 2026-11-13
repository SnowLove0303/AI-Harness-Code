# Change Proposal: Lead Agent Identity Self-Awareness & Statutory Coordinator Uniqueness Governance

## Why
Despite previous codification of Lead Agent decoupling (Axiom 56) and default autonomous Swarm dispatch, empirical instances still occur where the Lead Agent in the primary user session fails to invoke Swarm and attempts to perform Step 3 implementation directly. 

The ultimate root cause is **Self-Identity Amnesia (认知身份漂移)**: because the agent is initialized as a generic LLM assistant in a conversational context, it fails to realize that by virtue of being in a direct user session, its immutable statutory role is the **Lead Agent / Coordinator (`@coordinator`)**. It consequently falls back into the single-turn assistant habit of directly modifying code and running test loops.

This change formally introduces **Axiom 58: Lead Agent Identity Self-Awareness & Statutory Coordinator Uniqueness Axiom (`LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM`)** to anchor the agent's identity irrevocably in the user session, establish task-time identity self-reflection, and enforce hard circuit-breaking against identity drift and monolithic role regression.

## Action Skill Match Declaration
依据公理 57（`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`），在 Step 0 / Step 1 阶段对执行层技能库进行前置扫描：
- **匹配结果**：`[None - Standard Engineering Playbook]`
- **判定依据**：本任务属于多智能体核心调度身份体系与治理宪法演进，不涉及 Section 3.1 的专用领域技能（`desktop-exe-development`、`ui-ux-design-engineering`、`rea-reverse-engineering`），遵循标准工程宪法立法与双门禁体系。

## What Changes
1. **Constitutional Axiom 58 Legislation**: Formally legislate Axiom 58 (`LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **Direct-to-User Session Identity Invariance**: Codify the rule that any Agent instance communicating directly with the user in the primary conversation window is irrevocably the Lead Agent (`@coordinator`) (`DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE`).
3. **Task-Time Identity Self-Reflection Protocol**: Mandate active cognitive self-reflection across all steps (Step 0 through Step 5) to continuously verify and anchor the `@coordinator` persona (`TASK_TIME_IDENTITY_SELF_REFLECTION_PROTOCOL`).
4. **Identity Drift & Role Regression Hard Gate**: Enforce a strict architectural circuit breaker (`IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED`) that halts execution if the direct-to-user agent attempts Step 3 implementation directly.
5. **Statutory Coordinator Board Monopoly**: Formally codify the Lead Agent's exclusive board dispatch and sign-off authority (`COORDINATOR_ROLE_BOARD_AUTHORITY`).
6. **Automated L2 Test Suite**: Implement `tests/lead-agent-identity-self-awareness.test.mjs` verifying the new invariants and zero scenario-token leakage.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| Req ID | User Requirement & Scenario | Specification Requirement | Verification Target |
| :--- | :--- | :--- | :--- |
| **REQ-01** | Lead Agent fails to realize it is the Lead Agent | Requirement: Direct-to-User Session Lead Identity Invariance | `tests/lead-agent-identity-self-awareness.test.mjs` (Test 1 & 4) |
| **REQ-02** | Oblivious to coordinator role across task lifecycle | Requirement: Task-Time Identity Self-Reflection Protocol | `tests/lead-agent-identity-self-awareness.test.mjs` (Test 2 & 6) |
| **REQ-03** | Instances still occur where Lead Agent doesn't use Swarm | Requirement: Identity Drift and Direct Implementation Hard Gate | `tests/lead-agent-identity-self-awareness.test.mjs` (Test 4) |
| **REQ-04** | Explicit coordinator authority in multi-agent network | Requirement: Statutory Coordinator Board Role Authority | `tests/lead-agent-identity-self-awareness.test.mjs` (Test 6) |
| **REQ-05** | Constitutional codification & universal engineering abstraction | Requirement: Axiom 58 Constitutional Legislation and Domain Neutrality | `tests/lead-agent-identity-self-awareness.test.mjs` (Test 1, 2, 5) |
