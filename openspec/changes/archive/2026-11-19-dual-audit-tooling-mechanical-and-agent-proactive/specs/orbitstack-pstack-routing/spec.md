# orbitstack-pstack-routing: Delta Specification for Dual Audit Tooling Governance: Mechanical Audit and Agent Proactive Intervention Audit

This delta specification defines statutory requirements for Mechanical Audit and Agent Proactive Intervention Audit under Ps-openspec, establishing their boundaries, proactive behaviors, and strict domain-neutral software engineering abstraction.

## Added Requirements

### Requirement: Mechanical Audit Tool Generic Standard
When software components, web applications, scripts, or workflows undergo verification prior to release, the system SHALL execute a Mechanical Audit tool.
The Mechanical Audit tool SHALL:
1. Rely exclusively on deterministic automated scripts, compiler checks, static analysis linters, and test suites.
2. Forbid model-based subjective reasoning, probabilistic inference, or natural language rationalizations in the audit verdict.
3. Enforce zero compiler/linter warnings and zero errors (`--max-warnings=0`).
4. Evaluate pass/fail criteria strictly based on binary process exit codes (`Exit Code 0` for success, non-zero for failure).
5. Verify invariant preservation, structural file parity, and the absolute absence of hardcoded single-machine host environment paths.
If any deterministic check produces a non-zero exit code or warning, the Mechanical Audit tool SHALL immediately reject the deliverable and emit `MECHANICAL_AUDIT_BLOCKER`.

#### Scenario: Deterministic Static Check Enforcement
- **GIVEN** a modified codebase undergoing verification
- **WHEN** the mechanical audit tool executes static linting and tests
- **THEN** it SHALL emit `MECHANICAL_AUDIT_BLOCKER` if any rule violation or non-zero exit code occurs
- **AND** it SHALL completely block entry into the subsequent Agent audit phase until all mechanical checks are clean.

---

### Requirement: Agent Proactive Intervention Audit Tool Standard
When a software deliverable satisfies the Mechanical Audit entry baseline, the system SHALL invoke the Agent Proactive Intervention Audit tool.
The Agent Proactive Intervention Audit tool SHALL enforce active, cognitive verification and prohibit passive acceptance:
1. **Proactive Inspection**: The agent SHALL proactively inspect underlying physical source code lines to audit causality, data flows, and state machine integrity.
2. **Proactive Dynamic Testing**: The agent SHALL actively formulate and execute exploratory, edge-case, and boundary test probes against the running system rather than relying exclusively on pre-existing unit tests.
3. **Proactive Runtime Observation**: The agent SHALL proactively inspect runtime process logs, telemetry outputs, and exception traces to observe whether state transitions occur legitimately.
4. **Proactive Diff Review**: The agent SHALL proactively review all modified lines across the changeset to detect unauthorized regressions, invariant erosion, or code clutter.
5. **Proactive Falsification**: The agent SHALL actively seek edge cases that falsify the implementation, attempting boundary attacks to expose hidden brittle assumptions.
If the agent detects logical non-compliance or fails to provide active empirical inspection anchors (`file:///path#Lxx-Lyy`), the system SHALL reject the deliverable with `AGENT_SEMANTIC_AUDIT_REJECTED`.

#### Scenario: Active Boundary Testing by Agent
- **GIVEN** an implementation that passed all pre-existing static unit tests
- **WHEN** the Agent Proactive Intervention Audit tool executes
- **THEN** the agent SHALL actively craft and execute at least one novel boundary or adversarial input probe
- **AND** verify that the system handles the probe robustly without crashing or corrupting state.

---

### Requirement: Dual-Key Sequential Orchestration Contract
The system SHALL orchestrate verification through a strictly sequential two-key gate pipeline:
1. **Key 1 (Mechanical Entry Baseline / Necessary Condition)**: Mechanical Audit MUST execute first. If Mechanical Audit fails, the pipeline SHALL halt immediately with an exit status of 1; invoking the Agent audit under failing mechanical conditions is strictly FORBIDDEN.
2. **Key 2 (Agent Cognitive Falsification / Sufficiency Condition)**: Only upon measured Exit Code 0 across all mechanical checks SHALL the Agent Proactive Intervention Audit tool be invoked.
Both Key 1 and Key 2 must produce clean verification proofs before changes may be submitted for final human review.
Attempting to bypass Key 1 or Key 2 SHALL trigger `DUAL_KEY_AUDIT_BYPASS_BLOCKED`.

#### Scenario: Halting at Failed Mechanical Gate
- **GIVEN** an implementation with a minor linter warning
- **WHEN** the audit pipeline runs
- **THEN** Key 1 SHALL reject the deliverable immediately
- **AND** Key 2 (Agent audit) SHALL NOT be dispatched until Key 1 is completely resolved.

---

### Requirement: False-Pass Detection and Dynamic Falsification Standard
The Agent Proactive Intervention Audit tool SHALL actively inspect and test for false passes (trivial assertion fraud or hardcoded conditional shortcuts).
The agent SHALL:
1. Examine code modifications to verify that tests are not passing due to hardcoded return branches (e.g. `if (input === 'expected') return result;`).
2. Verify that test assertions are substantive, non-trivial, and assert meaningful state changes rather than empty truthy assertions (`assert.ok(true)`).
3. Actively inject mutation variations or unexpected inputs to prove that negative inputs properly trigger error handling.
Detecting any hardcoded shortcut or trivial assertion fraud SHALL trigger `FALSE_PASS_FRAUD_DETECTED`.

#### Scenario: Interception of Hardcoded Shortcut
- **GIVEN** an implementation that satisfies a test fixture via a hardcoded input check
- **WHEN** the agent performs proactive inspection and dynamic testing
- **THEN** the agent SHALL identify the shortcut
- **AND** reject the deliverable with `FALSE_PASS_FRAUD_DETECTED`.

---

### Requirement: Pure Universal Software Engineering Abstraction Standard
All specifications, rules, test cases, and documentation defining Mechanical Audit and Agent Proactive Intervention Audit SHALL maintain 100% universal software engineering abstraction.
The terminology SHALL be strictly restricted to generic software concepts:
- Systems, components, interfaces, modules, and functions
- Inputs, outputs, data flows, payloads, and state transitions
- Static rules, compilers, linters, exit codes, and assertions
- Dynamic probes, execution environments, processes, and telemetry
Zero domain-scenario or business-specific vocabulary SHALL be permitted.
Any detection of domain-scenario pollution SHALL trigger `DOMAIN_SCENARIO_POLLUTION_BLOCKED`.

#### Scenario: Domain Neutrality Verification
- **GIVEN** the dual audit tooling specifications
- **WHEN** static neutrality scanning is performed
- **THEN** all scenario-specific terms SHALL count as 0 hits
- **AND** the guard SHALL exit with code 0.

---

### Requirement: Axiom 68 Dual Audit Tooling Constitutional Legislation
The dual audit framework SHALL be codified as Axiom 68 (`DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 65).
The `worker.md` constitution SHALL be updated to instruct all worker agents to execute proactive inspection and dynamic testing during verification.
Automated regression tests SHALL verify constitutional parity across all three mirrors.

#### Scenario: Cross-Mirror Parity Verification
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite executes
- **THEN** all three mirrors SHALL contain identical sub-invariant tokens for Axiom 68.
