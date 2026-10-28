# OrbitStack PStack Routing

## Purpose
Provide complete upstream PStack capability through a Codex-compatible adapter while keeping OpenSpec the only durable project change lifecycle.

## ADDED Requirements

### Requirement: Complete upstream PStack mirror
The system SHALL vendor every distributable file under the official PStack plugin directory at one recorded upstream commit, without modifying upstream file contents.

#### Scenario: Upstream parity
- **WHEN** the vendored PStack tree is compared with the pinned upstream tree
- **THEN** every path and file hash matches, except explicitly documented host-generated artifacts that are not source distribution files

### Requirement: Codex task routing
The system SHALL expose one Codex-compatible PStack entry point that routes each task to the matching upstream playbook and supporting skills, without silently dropping unsupported host capabilities.

#### Scenario: Host capability unavailable
- **WHEN** an upstream playbook requests a Cursor-only model route, agent type, UI, or automation
- **THEN** the adapter selects an available Codex equivalent or records the exact unavailable step and safe fallback while preserving the playbook's objective and verification

### Requirement: OpenSpec single durable lifecycle
The system SHALL use the current project's OpenSpec root and active change as the only durable source for change intent, requirements, tasks, verification status, and archive history.

#### Scenario: Existing change exists
- **WHEN** a task maps to an existing active OpenSpec change
- **THEN** PStack routing continues within that change and does not create a parallel plan, task ledger, or second change

#### Scenario: No active change exists
- **WHEN** implementation changes project behavior
- **THEN** the system creates one OpenSpec change with proposal, applicable delta specs, design when needed, and tasks before implementation

### Requirement: OrbitStack authorization gates are preserved
The system SHALL retain the mandatory Step 0 user understanding confirmation and the pre-implementation dual checklist authorization gate.

#### Scenario: Implementation requested
- **WHEN** a task is ready to modify project artifacts
- **THEN** the agent presents the proposed-change and preserved-invariants checklists and waits for explicit authorization before writing implementation files

### Requirement: Existing project context is preserved
Installation SHALL preserve existing project-specific AGENTS instructions, architecture facts, tool routes, and build/test commands, merging only non-conflicting OrbitStack references.

#### Scenario: Existing project rules exist
- **WHEN** OrbitStack is installed into a project with local instructions or commands
- **THEN** those files and facts remain intact and are not replaced by a generic template

### Requirement: Initial routing audit
The system SHALL include an executable or reviewable audit matrix for representative task classes, proving the selected PStack route, OpenSpec lifecycle action, required authorization gates, and verification evidence.

#### Scenario: Audit each representative task
- **WHEN** the routing audit is run
- **THEN** investigation, bug fix, feature, refactor, performance, prototype, multi-phase, PR follow-up, and skill/eval tasks each have a documented expected route and pass/fail evidence
