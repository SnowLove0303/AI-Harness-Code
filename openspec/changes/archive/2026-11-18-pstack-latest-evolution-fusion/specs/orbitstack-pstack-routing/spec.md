# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

### Requirement: Standalone Worker Constitution Standard
The system SHALL establish a standardized, repository-root `worker.md` specification governing all dispatched Swarm workers and asynchronous subagents (`STANDALONE_WORKER_CONSTITUTION_STANDARD`). The Lead Agent SHALL mandate that all subagent dispatch briefs begin with an explicit instruction to review `worker.md`. The specification SHALL enforce:
1. **Autonomous Reversible Decision Authority**: Workers SHALL make independent, reversible implementation choices without blocking the coordinator for trivial approvals.
2. **Mechanical Exit Code 0 Baseline**: Workers SHALL NOT report completion without achieving real measured process exit code 0 under strict linter and test suite runs.
3. **PR-Ready Clean Deliverable Standard**: Output SHALL be strictly formatted, devoid of unverified comments, debugging statements, or conversational slop.

#### Scenario: Dispatching a Swarm worker
- **WHEN** the coordinator dispatches any subagent worker
- **THEN** the initial line of the brief SHALL reference `worker.md`
- **AND** the worker SHALL govern execution according to its autonomous baseline.

#### Scenario: Subagent encounters an implementation detail
- **WHEN** a worker reaches a reversible implementation choice
- **THEN** it SHALL resolve the choice autonomously
- **AND** it SHALL NOT halt execution to poll the coordinator.

---

### Requirement: Mechanical L2 Unslop Assertion Gate
The system SHALL enforce a mechanical Layer 2 static analysis gate via an automated script (`scripts/check-unslop-purity.mjs`) checking for AI conversational filler and ungrounded prose (`MECHANICAL_L2_UNSLOP_ASSERTION_GATE`). The assertion dictionary SHALL reject:
1. Ungrounded participial clauses (e.g. trailing `ensuring...`, `highlighting...` without facts).
2. Known high-frequency AI buzzwords (e.g. `delve`, `crucial`, `landscape`, `pivotal`, `testament`, `underscore`, `vibrant`).
Any detected violation in checked documents SHALL trigger exit code 1 and halt CI/commit workflows.

#### Scenario: Running static unslop purity check
- **WHEN** the unslop validation script executes on shipped documentation and commit messages
- **THEN** it SHALL scan for banned patterns and filler syntax
- **AND** any match SHALL result in process exit code 1.

#### Scenario: Clean text validation
- **WHEN** text containing purely factual engineering descriptions is evaluated
- **THEN** the script SHALL pass with exit code 0.

---

### Requirement: Formal Statechart Shortest Path Protocol
The system SHALL mandate formal statechart verification standards for multi-state, concurrent, or transactional workflows (`FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL`). When architecting or refactoring complex state transitions, the agent MUST model states and transitions in a formal statechart, explicitly evaluate reachability invariants, and calculate the shortest path to potential invariant violations or deadlocks.

#### Scenario: Modeling complex state machine
- **WHEN** an agent designs a state machine
- **THEN** it SHALL formulate state transitions with explicit invariant constraints
- **AND** it SHALL prove that no reachable path violates terminal invariants.

---

### Requirement: All-Sites Defect Remediation Mandate
The system SHALL enforce an all-sites defect remediation mandate extending Axiom 59 (`ALL_SITES_DEFECT_REMEDIATION_MANDATE`). Whenever a specific fault pattern is resolved, the agent MUST execute a comprehensive search across all files, lifecycle phases, and mirrored specifications for identical or homologous fault patterns, documenting an exhaustive resolution ledger before change closure.

#### Scenario: Resolving a defect pattern
- **WHEN** a bug is diagnosed and resolved at a specific location
- **THEN** the agent SHALL search for all co-occurring instances across the codebase
- **AND** all confirmed homologous instances SHALL be resolved in the same change cycle.

---

### Requirement: Axiom 63 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 63 (`PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_PSTACK_FUSION_STANDARD`). Automated Layer 2 test suites SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 63 and its associated protocols
- **THEN** the specification SHALL contain only formal distributed delegation, AST linting, statechart verification, and regression terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.
