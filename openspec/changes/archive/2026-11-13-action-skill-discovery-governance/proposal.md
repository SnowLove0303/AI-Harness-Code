# Proposal: Action Skill Layer Proactive Discovery & Mandatory Adoption Governance

## Why
Ps-openspec maintains an Action Skill Layer (Section 3.1) housing specialized, battle-tested engineering skills (such as reverse engineering, desktop application development, frontend UI/UX design, and deep search). However, in practical execution, AI agents frequently suffer from "action skill blindness"—relying solely on general model training rather than proactively discovering and utilizing the environment's dedicated skills. This results in fragile ad-hoc solutions, wasted specialized tooling, and repeated errors.

To eliminate this gap, Ps-openspec must establish an automatic, mandatory skill discovery and adoption mechanism. When receiving any task, the Agent must scan the execution layer's skill inventory, explicitly declare matched skills in Gate 1 and Gate 2, and strictly inject the matched skill's SOPs and toolchains into `tasks.md` and Swarm worker briefs.

## What Changes
1. Codify **Axiom 57: Action Skill Proactive Discovery & Mandatory Adoption Axiom (`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`)** across system constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`).
2. Codify explicit RFC 2119 requirements in `openspec/specs/orbitstack-pstack-routing/spec.md`:
   - Task-time semantic scanning against Section 3.1 action skills;
   - Mandatory explicit declaration of matched skills in Gate 1 and Gate 2;
   - Prohibition of bypassing matching skills, with mandatory SOP and tool injection;
   - Swarm worker brief skill inheritance;
   - Constitutional legislation and universal domain neutrality.
3. Establish Layer 2 automated verification suite (`tests/action-skill-discovery-governance.test.mjs`) to mechanically enforce proactive discovery and prevent skill bypassing.

## 1:1 Requirement Traceability Matrix (Spec-Kit RTM)

| Requirement ID | Canonical Requirement Title | User Story | Detailed Functional Contract (RFC 2119) | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | Task-Time Action Skill Discovery & Semantic Matching Axiom | As a user, I require the system to automatically analyze incoming task details and match them against Ps-openspec's execution layer skills. | When a task is ingested, the system SHALL extract task semantic characteristics and scan Section 3.1 action skills. The system SHALL determine whether specialized skills exist for the domain. | 1. Task ingestion includes automated action skill scanning;<br>2. Evaluates triggers across registered action skills;<br>3. Matching results include clear rationale. |
| **REQ-02** | Explicit Skill Match Declaration in Gate 1 and Gate 2 | As a project reviewer, I require Gate 1 dossiers and Gate 2 proposals to explicitly declare whether any action skill matched. | Gate 1 dossiers and Gate 2 proposals SHALL include an explicit "Action Skill Match Declaration" section naming matched skills or explicitly declaring `[None - Standard Engineering Playbook]`. | 1. Gate 1 and Gate 2 assets contain structured skill declaration;<br>2. Format is standardized and zero-omission;<br>3. Static checks verify declaration presence. |
| **REQ-03** | Mandatory Active Adoption & Constraint Injection Gate | As a system lead, I require agents to proactively adopt matched skills rather than writing fragile ad-hoc workarounds. | When an action skill matches, the agent SHALL adopt it. The agent SHALL inject the skill's SOP stages, MCP tools, and quality assertions into `tasks.md`. Bypassing matching skills SHALL be prohibited. | 1. Skill SOP mapped to `tasks.md` atomic tasks;<br>2. Execution strictly follows skill SOP and quality gates;<br>3. Bypassing matching skills is rejected by static checks. |
| **REQ-04** | Swarm Worker Brief Skill Inheritance | As an architect, I require the Lead Agent to pass matching skill contracts to Swarm Workers so execution remains compliant end-to-end. | When dispatching tasks to Swarm Workers, the Lead Agent SHALL inject `🚨 [MANDATORY ACTION SKILL: <name>]` into the brief. Workers SHALL load and execute under the designated skill SOP. | 1. Swarm brief explicitly cites matching Action Skill;<br>2. Worker reports evidence satisfying skill quality gates;<br>3. End-to-end skill compliance achieved. |
| **REQ-05** | Constitutional Axiom 57 Legislation & Universal Domain Neutrality | As chief architect, I require these rules to be codified as Axiom 57 in Ps-openspec with 100% domain-neutral software engineering terminology. | Codify Axiom 57 (`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`. Implement automated Layer 2 tests and synchronize global system mirrors. | 1. Axiom 57 codified in constitutions;<br>2. Automated L2 regression tests passing (exit code 0);<br>3. Global mirrors and living specs synchronized. |
