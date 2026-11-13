# Change Proposal: Default Autonomous Swarm Dispatch in Ps-openspec Tasks

## Why
Under Axiom 56 (`LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM`), the Lead Agent is strictly prohibited from writing code or running heavy debugging loops in Step 3. However, user experience and operational reality dictate that the user should not be required to explicitly say "use Swarm" in natural language prompts. 

When an agent operates under the Ps-openspec engineering framework, Swarm multi-agent execution must be the **intrinsic, default, and autonomous execution engine** for Step 3 implementation and verification. The agent must automatically instantiate Swarm sessions, formulate structured worker briefs, and dispatch subagent workers without waiting for specific prompt keywords.

## Action Skill Match Declaration
依据公理 57（`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`），在 Step 0 / Step 1 阶段对执行层技能库进行前置扫描：
- **匹配结果**：`[None - Standard Engineering Playbook]`
- **判定依据**：本任务属于系统治理核心体系（`ps-openspec` 轨道工程总纲调度机理）的自演进，不涉及 Section 3.1 的专用领域技能（`desktop-exe-development`、`ui-ux-design-engineering`、`rea-reverse-engineering`），遵循标准工程宪法立法与双门禁体系。

## What Changes
1. **Constitutional Axiom 56 Amendment**: Formally codify the Zero-Prompt Swarm Auto-Dispatch Invariant (`DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE` & `ZERO_PROMPT_SWARM_AUTO_DISPATCH_RULE`) as an integral clause of Axiom 56 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **OpenSpec Default Swarm Task Modeling**: Update specifications so that during Step 2 authoring of `tasks.md`, Step 3 implementation and verification tasks are automatically structured as Swarm-delegated operations (`DEFAULT_SWARM_TASK_MODELING_RULE`).
3. **Anti-Monolithic Execution Degradation Gate**: Enforce strict architectural blocking (`ANTI_MONOLITHIC_EXECUTION_BLOCKED`) against any attempt by the Lead Agent to bypass Swarm and implement tasks monolithically.
4. **Transparent User Experience**: Ensure user-facing interactions remain focused on requirements, plans, and final sign-offs, with internal multi-agent orchestration fully automated.
5. **Automated L2 Test Suite**: Implement `tests/default-autonomous-swarm-dispatch.test.mjs` verifying the new invariants and zero scenario-token leakage.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| Req ID | User Requirement & Scenario | Specification Requirement | Verification Target |
| :--- | :--- | :--- | :--- |
| **REQ-01** | Zero-prompt auto-dispatch without explicit keywords | Requirement: Zero-Prompt Swarm Auto-Dispatch Invariance | `tests/default-autonomous-swarm-dispatch.test.mjs` (Test 1 & 4) |
| **REQ-02** | Default Swarm task modeling in OpenSpec `tasks.md` | Requirement: Default Swarm Task Modeling in OpenSpec | `tests/default-autonomous-swarm-dispatch.test.mjs` (Test 2 & 6) |
| **REQ-03** | Anti-monolithic execution degradation gate | Requirement: Anti-Monolithic Execution Degradation Gate | `tests/default-autonomous-swarm-dispatch.test.mjs` (Test 4) |
| **REQ-04** | Zero-overhead transparent Swarm UX | Requirement: Transparent Swarm UX and Seamless Collaboration | `tests/default-autonomous-swarm-dispatch.test.mjs` (Test 6) |
| **REQ-05** | Constitutional legislation & universal engineering abstraction | Requirement: Axiom 56 Autonomous Dispatch Amendment | `tests/default-autonomous-swarm-dispatch.test.mjs` (Test 1, 2, 5) |
