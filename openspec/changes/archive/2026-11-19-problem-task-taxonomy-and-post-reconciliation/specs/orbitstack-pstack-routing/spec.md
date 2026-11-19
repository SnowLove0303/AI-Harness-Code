# orbitstack-pstack-routing: Delta Specification for Problem Task Boundary Definition and Post-Execution Fact-Checking Reconciliation Governance

This delta specification defines statutory requirements for classifying Problem-Type Tasks and enforcing post-execution 1:1 reconciliation and empirical fact-checking audits against the Master Problem Ledger under Ps-openspec.

## Added Requirements

### Requirement: Problem-Type Task Boundary Definition and Taxonomy Disambiguation
When an engineering task is ingested in Step 0, the system SHALL evaluate the task against the standardized Problem Task Input Signature.
Input signatures that mandate Problem-Type Task classification include:
1. Error logs, stack traces, exceptions, timeouts, or crash dumps
2. Failing test assertions, regression reports, or broken system invariants
3. External defect lists, issue tickets, bug reports, audit discrepancy findings, or review annotations
4. Explicit user instructions requesting repair, rectification, or debugging of pre-existing functionality
The system SHALL apply a deterministic four-way disambiguation taxonomy:
- **Problem-Type Task**: Remediation of faults, bugs, or non-compliances in existing logic
- **Feature-Type Task**: Introduction of novel business capabilities, endpoints, or data models
- **Invocation-Type Task**: Execution of pre-existing tools with caller-only scope and immutable engine
- **Explore-Type Task**: Read-only behavioral or topological analysis without production edits
Any task containing one or more defect signatures SHALL be classified as a Problem-Type Task (or a composite task containing a problem sub-phase). Evading problem ledger ingestion by re-labeling defect repairs as feature adjustments SHALL be strictly FORBIDDEN.

#### Scenario: Deterministic Classification of Bug Report
- **GIVEN** a task prompt containing an error trace and a request to fix a calculation mismatch
- **WHEN** the agent performs Step 0 ingestion
- **THEN** the system SHALL classify the task as a Problem-Type Task
- **AND** require the generation of a Master Problem Ledger before proceeding.

---

### Requirement: Master Problem Ledger Ingestion and Fact Anchoring Preservation
When a task is classified as a Problem-Type Task, the agent SHALL slice the input into discrete, atomic problem items designated as `[ISSUE-01]` through `[ISSUE-K]`.
The count of ledger items $N_{\text{Ledger}}$ SHALL satisfy the mathematical invariance $N_{\text{Ledger}} \equiv K$.
For every `[ISSUE-xx]`, the agent SHALL capture:
1. Canonical Issue Identifier (`[ISSUE-xx]`)
2. Current code anchor (`file:///path#Lxx-Lyy`)
3. Initial failure reproduction command or empirical witness
4. Causal role (`[Root Source]` or `[Consumer Sink]`)
5. Independent acceptance criteria
Merging, dropping, or generalizing issues into unsegmented paragraphs SHALL trigger an immediate blocker: `PROBLEM_INGESTION_COMPRESSION_BLOCKED`.

#### Scenario: Zero-Compression Problem Ledger Slice
- **GIVEN** an external audit finding listing 4 specific security discrepancies
- **WHEN** the agent authors the Gate 1 dossier
- **THEN** the dossier SHALL contain exactly 4 discrete items: `[ISSUE-01]` through `[ISSUE-04]`
- **AND** each item SHALL retain its independent witness and acceptance criteria.

---

### Requirement: Post-Execution 1:1 Problem-to-Result Reconciliation Audit
Prior to Step 5 task closeout and delivery, the agent SHALL conduct a mandatory 1:1 Post-Execution Reconciliation Audit.
The final delivery dossier SHALL include a complete `1:1 Problem-to-Result Reconciliation Matrix` mapping every `[ISSUE-xx]` from Step 0 to its verified resolution.
For each issue, the reconciliation table SHALL specify:
1. Canonical Issue Identifier (`[ISSUE-xx]`)
2. Exact source code modification line anchors (`file:///path#Lxx-Lyy`)
3. Root-cause remediation explanation
4. Verified outcome status (`[x] RESOLVED`)
Omitting any issue from the reconciliation table SHALL trigger a fatal closeout failure: `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`.

#### Scenario: Post-Execution Reconciliation Validation
- **GIVEN** a task with 3 ingested issues `[ISSUE-01]` through `[ISSUE-03]`
- **WHEN** the agent compiles the Step 5 delivery report
- **THEN** the report SHALL include a 3-row reconciliation matrix matching each issue to its code line anchor
- **AND** a report listing only 2 rows SHALL be rejected with `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`.

---

### Requirement: Empirical Fact-Checking and False-Resolution Circuit Breaker
Every issue recorded in the reconciliation table SHALL undergo empirical fact-checking backed by verifiable proof.
Acceptable fact-checking evidence includes:
1. Terminal test execution command producing Exit Code 0 (`[Measured] Exit Code 0`)
2. Red-to-green witness showing failure on original code and success on remediated code
3. Mutation verification demonstrating that the fix resists boundary attacks
Superficial symptom-masking at consumer sinks (`SINK_PATCHING_BLOCKED`) or unsubstantiated claims of completion SHALL be treated as fact-checking failures.
If any issue fails empirical fact-checking or lacks measured proof, the system completion hook SHALL exit with status 1 and trigger: `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`.

#### Scenario: Interception of Unsubstantiated Completion Claim
- **GIVEN** an agent claiming `[ISSUE-02]` is fixed without providing a terminal exit code 0 log
- **WHEN** the completion hook evaluates the deliverable
- **THEN** the system SHALL reject completion with `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`
- **AND** force the agent back into Step 3 single-focus execution until empirical proof is measured.

---

### Requirement: Automated L2 Problem Reconciliation and Clearance Guard Standard
The system SHALL provide a static guard script (`scripts/check-issue-clearance.mjs`) registered as `npm run guard:issue-clearance`.
The guard SHALL:
1. Parse the Step 0 Gate 1 dossier and extract all $K$ canonical `[ISSUE-xx]` identifiers.
2. Verify that automated test files exist containing dedicated test assertions for each `[ISSUE-xx]`.
3. Verify that the final delivery report or test log contains 1:1 reconciliation entries for each `[ISSUE-xx]`.
If the count of verified issues $N_{\text{verified}} < K$, the guard SHALL exit with code 1 and emit `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`.

#### Scenario: Automated Guard Clearance Verification
- **GIVEN** a project with a Gate 1 dossier defining `[ISSUE-01]` and `[ISSUE-02]`
- **WHEN** `npm run guard:issue-clearance` is executed
- **THEN** the guard SHALL verify both issues in test assertions and reconciliation tables
- **AND** exit with code 0 only when all $K$ issues are fully accounted for.

---

### Requirement: Axiom 64 Evolution Constitutional Legislation and Domain Neutrality
The rules of Problem Task Boundary Definition, Master Problem Ledger Ingestion, and Post-Execution Fact-Checking Reconciliation SHALL be codified as Axiom 64 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Parity
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 64.
