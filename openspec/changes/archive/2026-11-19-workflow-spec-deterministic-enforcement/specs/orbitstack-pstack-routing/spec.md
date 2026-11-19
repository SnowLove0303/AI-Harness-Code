# orbitstack-pstack-routing: Delta Specification for Markdown Specification Deterministic Enforcement and Completion Hook Governance

This delta specification defines statutory requirements for deterministic enforcement of Markdown specifications and completion hook architecture under Ps-openspec.

## Added Requirements

### Requirement: Markdown Specification Atomic Structuring Protocol
When defining guidelines, audit checklists, or operational workflows in Markdown documents, the system SHALL enforce an atomic structuring standard.
Key constraints, invariants, and validation rules SHALL be assigned canonical, immutable identifiers formatted as `[SPEC-RULE-xx]` or `[AUDIT-CHECK-xx]`.
Each structured specification entry SHALL explicitly state:
1. Canonical Rule Identifier
2. Target Scope and Preconditions
3. Observable Contract (RFC 2119 SHALL/SHALL NOT)
4. Empirical Verification Command or Assertion

Unstructured natural language prose paragraphs describing critical business logic or constraints without atomic rule identifiers are FORBIDDEN in core workflow specifications.

#### Scenario: Rejection of Vague Prose Specifications
- **GIVEN** a workflow specification defining data sanitization rules
- **WHEN** the rules are authored as unstructured narrative paragraphs without rule identifiers
- **THEN** the specification linter SHALL flag the document as non-compliant
- **AND** require structured conversion to discrete `[SPEC-RULE-xx]` items.

---

### Requirement: Agent Lifecycle Completion Hook Gate
The system SHALL provide a completion guard mechanism (Stop Hook) intercepting an agent's completion signal or task closeout command.
Before releasing execution control or marking a workflow step complete, the Stop Hook SHALL execute a deterministic compliance inspection against the target specification's atomic rule set.
If any atomic rule lacks an empirical `[Measured] Exit Code 0` test execution proof or exhibits unverified assertions, the Stop Hook SHALL reject completion with Exit Code 1 (`WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER`).
The rejection payload SHALL feed the exact missing rule identifiers back to the agent, mandating continued execution until zero omissions remain.

#### Scenario: Completion Interception on Unverified Rule
- **GIVEN** an active workflow with rules `[SPEC-RULE-01]` and `[SPEC-RULE-02]`
- **WHEN** an agent claims task completion while `[SPEC-RULE-02]` lacks test verification
- **THEN** the completion guard SHALL reject the finish signal with Exit Code 1
- **AND** return `WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER: [SPEC-RULE-02] unverified`.

---

### Requirement: Two-Strike AST Machine Escalation Mandate
The system SHALL enforce a strict machine escalation mandate for natural language rules.
If an agent fails to adhere to, or omits, a specific rule defined in Markdown documentation twice within a project's lifecycle, the rule SHALL NOT remain solely in natural language.
The system SHALL mandate the codification of an automated AST rule, linter script, or deterministic test asserting the constraint with real Exit Code 1 blocking authority.
Merging changes or closing the change lifecycle without the escalated machine asset is strictly FORBIDDEN.

#### Scenario: Mandatory Escalation After Two Breaches
- **GIVEN** a Markdown guideline stating that direct access to raw sockets is prohibited
- **WHEN** an agent violates this rule for the second time in human review or audit
- **THEN** the system SHALL mandate the creation of an AST check (e.g. `ast-grep` or ESLint rule)
- **AND** reject the pull request until the machine rule is committed.

---

### Requirement: Workflow Step Single-Focus Statechart Standard
During workflow and program execution, the agent SHALL model atomic checklist rules as a sequential statechart.
Each atomic rule SHALL transition strictly across states: `Pending [ ]` -> `Active [-]` -> `Verified [x]`.
Only one rule MAY occupy the `Active [-]` state at any given moment.
The agent SHALL NOT advance to the subsequent rule until the active rule achieves empirical Exit Code 0 verification.
Skipping or batch-checking multiple unverified rules is strictly prohibited.

#### Scenario: Strict Sequential Task Transition
- **GIVEN** a list of three sequential workflow verification steps
- **WHEN** step 1 is actively running under the `[-]` focus lock
- **THEN** steps 2 and 3 SHALL remain in `Pending [ ]`
- **AND** step 1 SHALL NOT transition to `[x]` without measured test proof.

---

### Requirement: Automated L2 Workflow Specification Compliance Guard
The system SHALL provide a standalone static guard script (`scripts/check-workflow-spec-compliance.mjs`) registered in `package.json` as `guard:workflow-spec`.
The guard SHALL parse active workflow specifications and Gate 1 dossiers, extract all canonical rule identifiers, and verify that:
1. Each rule identifier is covered by an automated test assertion.
2. The final checkoff report provides an exact 1:1 match with measured exit codes.
If any rule is omitted or unverified, the script SHALL terminate with Exit Code 1 and print `WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER`.

#### Scenario: Zero-Omission Guard Verification
- **GIVEN** an audit spec with 3 rules where rule 3 lacks an automated assertion
- **WHEN** `npm run guard:workflow-spec` is executed
- **THEN** the script SHALL exit with code 1
- **AND** print the exact identifier of the unverified rule.

---

### Requirement: Axiom 65 Constitutional Legislation and Domain Neutrality
The rules of Markdown Specification Deterministic Enforcement and Completion Hook Governance SHALL be codified as Axiom 65 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Parity
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 65.
