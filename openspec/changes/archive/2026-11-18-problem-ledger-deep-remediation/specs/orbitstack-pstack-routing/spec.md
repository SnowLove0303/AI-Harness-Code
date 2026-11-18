# orbitstack-pstack-routing: Delta Specification for Problem Ledger Ingestion and Zero-Omission Deep Remediation

This delta specification defines the statutory requirements for problem-driven task governance under the Ps-openspec framework.

## Added Requirements

### Requirement: Master Problem Ledger Ingestion Protocol
When an engineering task references an external problem document, audit report, or defect list, the system SHALL automatically classify the task as a Problem/Issue Remediation Task in Step 0.
The system SHALL atomize all defects identified in the source document into distinct, immutable entries designated as `[ISSUE-01]` through `[ISSUE-K]`, establishing a Master Problem Ledger in the Gate 1 dossier.
Each entry in the Master Problem Ledger SHALL define:
1. Canonical Issue Identifier (`[ISSUE-xx]`)
2. Defect Title, Observed Symptom, and Source Code Anchor
3. Initial Reproduction Command or Failing Test Specimen (Witness)
4. Causal Classification (`[Root Source]` or `[Consumer Sink]`)
5. Independent Acceptance Assertion Criteria

The ledger item count $N_{\text{Ledger}}$ SHALL strictly equal the count $K$ of atomic issues in the source document ($N_{\text{Ledger}} \equiv K$). Any omission or compression of source issues SHALL trigger a `PROBLEM_INGESTION_COMPRESSION_BLOCKED` circuit breaker.

#### Scenario: Problem Document Ingestion Conservation
- **GIVEN** an external audit Markdown document containing 4 distinct defects
- **WHEN** the agent processes the user instruction to resolve defects according to the document
- **THEN** the Gate 1 dossier SHALL generate a Master Problem Ledger containing exactly 4 entries (`[ISSUE-01]` to `[ISSUE-04]`)
- **AND** the agent SHALL NOT truncate or aggregate the defects into a single generic item.

---

### Requirement: Issue-to-Task Bijective Invariant
In Step 2 of the Ps-openspec lifecycle, task decomposition in `tasks.md` SHALL maintain a 1:1 bijective relationship with the Master Problem Ledger.
Every canonical issue `[ISSUE-xx]` SHALL correspond to an independent, dedicated task block in `tasks.md`.
The system is FORBIDDEN from bundling or aggregating multiple distinct issues into a single composite task (`BUNDLED_ISSUE_TASK_FORBIDDEN`).
Each issue task block SHALL contain discrete sub-tasks covering failing reproduction, root cause remediation, structural immunity, verified passing, and sibling sweeps.

#### Scenario: Bijective Task Structure Enforcement
- **GIVEN** a Master Problem Ledger containing $K$ entries
- **WHEN** the agent authors `tasks.md` for Gate 2 approval
- **THEN** `tasks.md` SHALL contain at least $K$ dedicated issue task groups
- **AND** any task definition attempting to group two or more disparate issues SHALL trigger `BUNDLED_ISSUE_TASK_FORBIDDEN` and be rejected.

---

### Requirement: Four-Tier Deep Remediation Ladder
During implementation of each issue in Step 3, the agent SHALL strictly progress through a four-tier deep remediation ladder:
1. **Tier 1 (Red Witness)**: The agent SHALL establish a failing reproduction test or witness command demonstrating an Exit Code $\ne 0$ prior to modifying production code. Ad-hoc editing without failing reproduction is FORBIDDEN.
2. **Tier 2 (Origin Tracing)**: The agent SHALL trace data flow to the Origin Producer. Remediation MUST repair the Origin Producer; patching only the Consumer Sink with defensive fallbacks SHALL trigger `SINK_PATCHING_BLOCKED`.
3. **Tier 3 (Structural Immunity)**: The agent SHALL enforce structural invariants at the type level, state machine level, or AST/Lint level to make the illegal state unrepresentable.
4. **Tier 4 (All-Sites Sweep)**: The agent SHALL perform a repository-wide sweep for identical anti-patterns per the All-Sites remediation mandate.

#### Scenario: Rejection of Consumer Sink Fallback Patching
- **GIVEN** an issue where an unvalidated null value causes a downstream crash
- **WHEN** the agent attempts to resolve the issue merely by inserting `if (!val) return;` at the sink
- **THEN** the gate SHALL reject the proposed modification as a superficial band-aid (`SINK_PATCHING_BLOCKED`)
- **AND** require tracing the invalid null to its originating producer.

---

### Requirement: Single-Issue Focus Lock Standard
During Step 3 execution, the single-task focus lock (`[-] lock`) SHALL operate at the granularity of a single canonical issue.
Only one issue may hold the `[-]` active execution lock at any given moment.
An issue lock SHALL NOT be unlocked or marked complete (`[x]`) until its dedicated reproducer test passes with Exit Code 0 and its All-Sites sweep is clean.
Transitioning to the subsequent issue is strictly forbidden while the current issue remains unresolved.
Swarm dispatch briefs SHALL encapsulate single-issue scopes, prohibiting multi-issue dumping on individual subagents.

#### Scenario: Strict Sequential Issue Lock Progression
- **GIVEN** issues `[ISSUE-01]` and `[ISSUE-02]` in `tasks.md`
- **WHEN** the agent is actively executing `[ISSUE-01]`
- **THEN** `[ISSUE-01]` SHALL hold the `[-]` lock
- **AND** `[ISSUE-02]` SHALL remain pending (`[ ]`) until `[ISSUE-01]` passes verification and transitions to `[x]`.

---

### Requirement: Zero-Omission Problem Circuit Breaker
The system SHALL provide an automated static guard script (`scripts/check-issue-clearance.mjs`) registered as `npm run guard:issue-clearance`.
The clearance guard SHALL parse the Master Problem Ledger from the Step 0 Gate 1 dossier, extract all $K$ issue identifiers, and verify that:
1. Each issue identifier maps to a dedicated automated test case or assertion in the test suite.
2. Each issue is documented in the final Step 5 clearance report with an empirical `[Measured] Exit Code 0` test execution record.
If the count of verified issues $N_{\text{verified}} < K$, the script SHALL exit with code 1 and emit `PROBLEM_OMISSION_CIRCUIT_BREAKER`, blocking pull requests, archiving, and release.

#### Scenario: Blocked Archiving on Unproven Issue
- **GIVEN** a task with 4 ingested issues where issue `[ISSUE-04]` lacks a dedicated test assertion
- **WHEN** `npm run guard:issue-clearance` is executed
- **THEN** the command SHALL exit with code 1
- **AND** report `PROBLEM_OMISSION_CIRCUIT_BREAKER: [ISSUE-04] missing verified test assertion`.

---

### Requirement: Axiom 64 Constitutional Legislation and Domain Neutrality
The core rules of Problem Ledger Ingestion and Zero-Omission Deep Remediation SHALL be codified as Axiom 64 in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test cases, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Consistency
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors (`GEMINI.md`, `pstack-openspec`, `ai-harness-openspec`) SHALL exhibit identical sub-invariants for Axiom 64.
