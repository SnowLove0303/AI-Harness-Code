# Spec Delta

## MODIFIED Requirements

### Requirement: Codex task routing
The system SHALL route Codex tasks through one entrypoint using the matching pinned PStack playbook and supporting skills. A versioned registry SHALL cover every upstream playbook and specify its OpenSpec action, OrbitStack gates, Codex host mapping/fallback, durable task source (`OpenSpec tasks.md`), and verification evidence. Each playbook SHALL have a representative fixture whose observed route and gate/lifecycle behavior are recorded separately from structural inventory checks.

#### Scenario: Host capability unavailable
- **WHEN** an upstream playbook requests a Cursor-only model route, agent type, UI, or automation
- **THEN** the adapter selects an available Codex equivalent or records the exact unavailable step and safe fallback while preserving the playbook's objective and verification

#### Scenario: Complete playbook inventory is mapped
- **WHEN** the pinned PStack upstream inventory is audited
- **THEN** each upstream playbook has exactly one route registry entry with OpenSpec action, gate policy, task source, host mapping, and evidence requirements, with no missing or duplicate playbook IDs

#### Scenario: Every route is behaviorally evaluated
- **WHEN** a task fixture for each PStack playbook is run through the Codex OrbitStack entrypoint
- **THEN** the audit records the expected route, observed route, OpenSpec action, gate behavior, and pass/fail evidence; structural file existence alone MUST NOT count as runtime route proof

#### Scenario: OpenSpec remains the only durable task source
- **WHEN** a PStack playbook creates an execution checklist
- **THEN** implementation progress and completion evidence are recorded in the active OpenSpec tasks.md, and no parallel persistent PStack task ledger is created

### Requirement: OpenSpec root verification and recovery
The system SHALL run OpenSpec from the actual root of the project named by the task and verify that the CLI resolves that same root.

#### Scenario: OpenSpec is missing or resolves another root
- **WHEN** the project is not initialized or `openspec context --json` reports another root
- **THEN** the agent initializes OpenSpec at the intended project root or corrects the working directory/configuration, reruns context, and proceeds only after the resolved path matches
