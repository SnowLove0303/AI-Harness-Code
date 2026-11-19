# orbitstack-pstack-routing: Delta Specification for Called Program Immutability and Invocation Purity Governance

This delta specification defines statutory requirements for restricting agent modifications during invocation tasks under Ps-openspec.

## Added Requirements

### Requirement: Invocation Task Classification and Called Program Read-Only Lock
When an engineering task involves calling, running, executing, or invoking an existing program, tool, service, pipeline, or CLI to produce business output, the system SHALL classify the task as an Invocation-Only Task in Step 0.
For any task classified as Invocation-Only, the source code, internal modules, shared libraries, and core engines of the called program SHALL be placed under an immutable read-only lock (`CALLED_PROGRAM_READONLY_LOCK`).
The system tool barrier SHALL intercept and reject any write, edit, or delete operations directed at the called program's source files with a fatal violation: `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`.

#### Scenario: Rejection of Called Program Modification
- **GIVEN** a task assigned to invoke an export CLI to generate a report
- **WHEN** the agent attempts to modify the export CLI's source code to bypass a parameter check
- **THEN** the system SHALL reject the tool call with `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`
- **AND** require the agent to adjust the caller parameters instead.

---

### Requirement: Anti-Expediency Mutation and Caller Adaptation Mandate
During an invocation task, when errors, exceptions, or timeouts occur, the agent's problem-solving scope SHALL be strictly confined to the Caller Plane.
Acceptable caller-plane interventions include:
1. Sanitizing, validating, and formatting input data files
2. Adjusting invocation arguments, configuration flags, or environment variables
3. Authoring or refining caller-side adapter scripts
The agent is strictly FORBIDDEN from performing task-expediency hacking inside the called program (such as commenting out assertions, widening tolerance thresholds, hardcoding return values, or altering default behaviors).

#### Scenario: Caller Data Sanitization Enforcement
- **GIVEN** an invocation task where the target engine rejects a non-standard date format
- **WHEN** the agent diagnoses the issue
- **THEN** the agent SHALL reformat the date in the input dataset or caller script
- **AND** the agent SHALL NOT modify the date parsing logic inside the engine.

---

### Requirement: Upstream Defect Isolation and Escalation Protocol
If an invocation failure is proven by forensic diagnosis to be caused by a genuine defect or bug within the called program itself (rather than caller data or invocation arguments), the agent SHALL NOT attempt to patch the program in the active invocation task.
The agent SHALL:
1. Log an immutable forensic incident: `[Incident: Upstream Engine Defect]` containing the reproduction command, call stack, and root cause diagnosis.
2. Maintain the called program in its read-only state.
3. Pause execution and escalate to the human user for authorization.
Fixing the upstream defect SHALL require an independent, dedicated Bug-Fix change lifecycle under Ps-openspec complete with multi-scenario regression testing.

#### Scenario: Upstream Bug Incident Escalation
- **GIVEN** a legitimate crash bug in a shared PDF generation library during an invocation task
- **WHEN** the agent confirms the bug resides in the shared library
- **THEN** the agent SHALL record an incident report and halt at an escalation breakpoint
- **AND** the agent SHALL NOT alter the library in the current task.

---

### Requirement: Gate 2 Caller Scope Physical Fence
In Step 2 of an invocation task, the proposed scope in the Gate 2 submission SHALL enforce a physical fence.
The writable paths declared in Gate 2 SHALL be 100% limited to caller files (caller scripts, input datasets, task configuration files, output destinations).
Any inclusion of the called program's source code, core engine, or shared dependencies within the writable scope SHALL trigger an immediate rejection: `ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED`.

#### Scenario: Gate 2 Scope Rejection
- **GIVEN** an invocation task proposal
- **WHEN** the agent includes `src/core/engine.ts` in the proposed writable files list
- **THEN** Gate 2 validation SHALL fail with `ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED`
- **AND** prevent transition to Step 3.

---

### Requirement: Automated L2 Invocation Purity Guard
The system SHALL provide a standalone static guard script (`scripts/check-invocation-purity.mjs`) registered in `package.json` as `guard:invocation-purity`.
The guard SHALL inspect the active Git diff and task metadata. If the task is designated as invocation-only, the guard SHALL verify that:
1. Zero changes exist within protected engine and shared program directories.
2. All modifications are strictly confined to caller scripts and data files.
If any prohibited modification is detected, the script SHALL exit with status 1 and emit `CALLED_PROGRAM_TAMPERING_DETECTED`.

#### Scenario: Invocation Purity Guard Verification
- **GIVEN** an invocation task with an accidental modification to a core utility
- **WHEN** `npm run guard:invocation-purity` is executed
- **THEN** the command SHALL exit with code 1
- **AND** print `CALLED_PROGRAM_TAMPERING_DETECTED: Prohibited modification in engine directory`.

---

### Requirement: Axiom 66 Constitutional Legislation and Domain Neutrality
The rules of Called Program Immutability and Invocation Purity SHALL be codified as Axiom 66 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Parity
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 66.
