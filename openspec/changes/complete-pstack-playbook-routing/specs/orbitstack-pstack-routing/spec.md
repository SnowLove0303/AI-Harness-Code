# Spec Delta

## MODIFIED Requirements

### Requirement: Codex task routing
The system SHALL expose one Codex-compatible PStack entry point that routes each task to the matching upstream playbook and supporting skills, without silently dropping unsupported host capabilities. The system MUST maintain an explicit mapping for every playbook in the pinned upstream PStack inventory, including OpenSpec lifecycle action, OrbitStack gates, Codex host support/fallback, and verification evidence. The route registry MUST name OpenSpec tasks.md as the single durable task source. The system MUST evaluate representative prompts for every playbook and record observed route behavior separately from structural file-presence checks.

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
