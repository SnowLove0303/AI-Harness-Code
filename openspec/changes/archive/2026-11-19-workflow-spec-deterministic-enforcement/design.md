# Technical Design: Markdown Specification Deterministic Enforcement and Completion Hook Governance

## 1. Architectural Overview & Problem Analysis

In AI-driven software development and automated workflow execution, natural language Markdown is the ubiquitous medium for defining architecture rules, coding guidelines, and audit checklists. However, when treated solely as text prompts, LLMs exhibit three systemic failure modes:
1. **Attention Decay (Needle-in-a-Haystack)**: As context windows expand with code diffs and execution logs, specific Markdown rules located in long documents are neglected.
2. **Advisory Fallacy**: Natural language statements ("Must not do X", "Always ensure Y") are treated as soft suggestions rather than deterministic barriers.
3. **Premature Completion**: Agents self-declare task completion upon reaching a partial milestone, falsely confident because general tests pass, while specific audit constraints remain unfulfilled.

This technical design establishes an enforceable closed-loop governance framework:

```mermaid
flowchart TD
    subgraph SpecLayer["1. Structured Specification Layer"]
        MD["Markdown Spec / Checklist"] --> Parser["Atomic Spec Parser"]
        Parser --> Rules["[SPEC-RULE-xx] / [AUDIT-CHECK-xx]"]
    end

    subgraph StatechartLayer["2. Execution Statechart & Lock"]
        Rules --> Lock["Single-Focus Statechart Lock [-]"]
        Lock --> Exec["Worker Executes Scope"]
        Exec --> Repro["TDD & Empirical Witness"]
    end

    subgraph InterceptionLayer["3. Lifecycle Interception (Stop Hook)"]
        Exec --> Finish["Agent Attempts Task Finish / Merge"]
        Finish --> Hook["Stop Hook (Completion Guard)"]
        Hook --> Check{"All Rules Verified with Exit Code 0?"}
        Check -- No --> Reject["WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER (Exit 1)"]
        Reject --> Feedback["Error Fed Back to Agent Loop"]
        Feedback --> Lock
        Check -- Yes --> Approved["Task Release Approved (Exit 0)"]
    end

    subgraph EscalationLayer["4. Machine Escalation (Two-Strike)"]
        Repeat{"Rule Violated >= 2 Times?"}
        Repeat -- Yes --> AST["Escalate to ast-grep / ESLint / L2 Script"]
        AST --> MachineGate["Hard Mechanical Compiler Gate"]
    end
```

---

## 2. Component Specifications

### 2.1 Atomic Specification Schema
Structured Markdown rules must satisfy canonical patterns:
- Rule ID: `^\[(SPEC-RULE|AUDIT-CHECK)-\d{2}\]$`
- Fields:
  - `Precondition`: Input domain or context criteria
  - `Contract`: RFC 2119 keyword (`SHALL`, `SHALL NOT`, `MUST`, `MUST NOT`)
  - `Verification`: Exact command or test file covering the rule

### 2.2 Completion Hook (Stop Hook) Architecture
The Stop Hook runs before task completion:
1. Gathers all canonical rule IDs from the target specification.
2. Inspects test execution outputs and source code diffs.
3. Asserts a 1:1 bijection: every rule ID must be bound to a test assertion exhibiting a measured Exit Code 0.
4. If $N_{\text{verified}} < N_{\text{rules}}$, terminates with status code 1 and outputs the list of unverified rules.

### 2.3 Mechanical L2 Compliance Guard (`scripts/check-workflow-spec-compliance.mjs`)
- Autonomous Node.js CLI script.
- Scans `openspec/gate1-dossiers/`, change proposals, and workflow specifications.
- Validates that all extracted `[SPEC-RULE-xx]` and `[AUDIT-CHECK-xx]` identifiers have matching automated test assertions in `tests/`.
- Provides an automated mutation test mode demonstrating that omitting an assertion triggers an Exit Code 1 failure.
- Registered under `npm run guard:workflow-spec`.

### 2.4 Invariant State Transitions

```mermaid
stateDiagram-v2
    [*] --> Pending: Rule Registered [ ]
    Pending --> Active: Single-Focus Lock Acquired [-]
    
    state Active {
        [*] --> RunVerification: Execute Test Witness
        RunVerification --> FixCode: Exit Code != 0 (Red)
        FixCode --> RunVerification: Implement Rule Logic
        RunVerification --> VerifiedProof: Exit Code 0 (Green)
        VerifiedProof --> [*]
    }
    
    Active --> Verified: Rule Transition to [x]
    Verified --> Pending: Next Rule in Sequence
    Verified --> StopHook: All Rules Marked [x]
    StopHook --> Released: Guard Verification Pass (Exit 0)
    StopHook --> Active: Omission Detected (Exit 1 Block)
```
