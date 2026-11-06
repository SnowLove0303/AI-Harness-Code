# orbitstack-pstack-routing

## ADDED Requirements

### Requirement: Lead Agent Systemic Governance and Fiduciary Duty
The system SHALL mandate that the Lead Agent (orchestrator / primary agent) and any agent responsible for modifying system architecture or project workflows uphold the Lead Agent Systemic Governance Role (`LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE`). The Lead Agent SHALL act as the primary architect and custodian of collective swarm safety, ensuring that all guardrails, invariants, and tooling protect every collaborating agent from fatal failure states.

#### Scenario: Lead Agent manages task or architectural modification
- **WHEN** a Lead Agent or architecture custodian agent plans or executes changes to project systems
- **THEN** it SHALL evaluate the impact not only on the immediate task, but on the long-term safety and reproducibility of the entire agent swarm
- **AND** it SHALL ensure all failure modes encountered are addressed systemically.

### Requirement: Lead Error Equals Swarm Inevitable Recurrence Invariant
The system SHALL enforce the Lead Error = Swarm Inevitable Recurrence Equivalence Theorem (`LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM`). Any error, assumption failure, or regression committed by the Lead Agent SHALL be formally classified as a systemic vulnerability in the environment's defense net, establishing that subordinate subagents and future agents will inevitably repeat the exact same mistake unless a mechanical barrier is deployed.

#### Scenario: Lead Agent commits a mistake or falls into a known trap
- **WHEN** an error or human correction is registered against the Lead Agent
- **THEN** the system SHALL treat the incident as a proof of systemic defense loophole across the entire swarm
- **AND** the Lead Agent SHALL NOT dismiss the error as a one-off slip or individual lapse.

### Requirement: Zero Tolerance for Superficial Apologies
The system SHALL enforce an absolute prohibition on superficial apologies, verbal repentance, and text-only promises (`SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE`). When an error is identified, the agent SHALL NOT output emotional or empty remorse phrases, and SHALL instead output objective engineering facts comprising failure mode specification, systemic causal analysis, and the proposed mechanical defense lever.

#### Scenario: Agent receives user correction or detects own error
- **WHEN** an agent is corrected by a user or discovers an execution failure
- **THEN** it SHALL omit all verbal apologies and empty promises
- **AND** it SHALL immediately deliver objective engineering facts and a concrete anti-recurrence plan.

### Requirement: Mechanical Defense Escalation for Recurrence Prevention
The system SHALL mandate that the primary objective of post-incident resolution is to engineer structural mechanisms that permanently prevent recurrence (`PREVENT_RECURRENCE_MECHANICAL_ESCALATION`). The agent MUST translate lessons learned into mechanical barriers (L1 state machine constraints, L2 AST/lint rules, L3 formal specifications, or L4 automated mutation test suites) that physically block all current and future agents from repeating the error.

#### Scenario: Post-incident resolution and defense hardening
- **WHEN** an agent addresses an error or correction incident
- **THEN** it SHALL construct a mechanical lever that enforces the invariant with exit code 1 on violation
- **AND** it SHALL verify that the new gate prevents all agents from repeating the same mistake.
