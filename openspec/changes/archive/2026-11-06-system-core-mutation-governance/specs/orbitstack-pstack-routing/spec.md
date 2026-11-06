# orbitstack-pstack-routing

## ADDED Requirements

### Requirement: System Core vs. Peripheral Mutation Classification and Disambiguation
The system SHALL mandate that every task, proposal, and dual-checklist explicitly categorize proposed modifications into two mutually exclusive tiers (`SYSTEM_MUTATION_CLASSIFICATION_AXIOM`):
1. `[System Core Mutation]`: Modifications touching core engines, protocol handlers, global dispatchers, living specs, or fundamental state machines.
2. `[Peripheral Non-Core]`: Modifications restricted to documentation, project-level unit tests, project audit graph registries (whitelists/blacklists), and local configuration files.

#### Scenario: Agent prepares proposal and double checklist
- **WHEN** an agent evaluates candidate files for modification
- **THEN** it SHALL label every file as either `[System Core Mutation]` or `[Peripheral Non-Core]`
- **AND** if any file belongs to System Core, it SHALL activate the special approval protocol.

### Requirement: Statutory Dual-Gate Special Approval for System Core Mutation
The system SHALL require that any change categorized as `[System Core Mutation]` undergo dedicated dual-gate presentation and explicit user approval (`SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE`). The agent MUST provide a dedicated justification demonstrating why the requirement cannot be solved at the peripheral or policy layer, and submit a formal generality preservation proof before requesting execution authorization.

#### Scenario: Proposing modification to system core engines
- **WHEN** a change touches core system mechanics or cross-cutting runtime engines
- **THEN** the agent SHALL present a dedicated `【系统核心机制拟变专项说明】` in the dual-gate dossier
- **AND** the agent SHALL NOT modify any core files until the user explicitly authorizes the core mutation.

### Requirement: Generality Preservation and Anti-Scenario System Degradation
The system SHALL enforce that core system mechanics remain strictly domain-neutral and scenario-agnostic (`GENERALITY_PRESERVATION_AXIOM`). Any attempt to alter system core logic to satisfy a specific business scenario, hardcode single-scenario heuristics, or bypass an audit false-positive SHALL trigger an immediate static block (`SCENARIO_SYSTEM_MUTATION_BLOCKED`).

#### Scenario: Attempting to introduce single-scenario branch into core engine
- **WHEN** an agent attempts to insert scenario-specific branches or concrete business identifiers into a core system engine
- **THEN** the system SHALL reject the change with `SCENARIO_SYSTEM_MUTATION_BLOCKED`
- **AND** the agent SHALL redirect the requirement to the external calling policy or project whitelist.

### Requirement: Mechanism-Policy Decoupling and Orthogonal Architecture
The system SHALL mandate that system core components provide parameterizable, composable mechanisms only (`MECHANISM_POLICY_ORTHOGONAL_DECOUPLING`). All scenario-specific business logic, formatting rules, and audit triage decisions MUST reside in caller policies, project configurations, or project-level blacklist/whitelist registries.

#### Scenario: Handling edge-case formatting or validation request
- **WHEN** a specialized scenario demands custom behavior from a general-purpose engine
- **THEN** the agent SHALL configure or extend caller-level policy parameters
- **AND** the agent SHALL NOT mutate the internal mechanics of the general engine.
