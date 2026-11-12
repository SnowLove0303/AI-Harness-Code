# Design Document: Lead Agent Orchestration & Swarm Subagent Execution Physical Decoupling

## 1. Architectural Topology & Rationale

### 1.1 Dual-Plane Topology: Governance vs Execution
```mermaid
flowchart TD
    subgraph GovernancePlane["Lead Agent Governance Plane (Coordinator / Architect)"]
        User["User Tasks / Directives"] --> Intake["Step 0: Intent Ingestion & Gate 1 Dossier"]
        Intake --> Anchor["Step 1: Anchor Discovery & Playbook Resolution"]
        Anchor --> Legislate["Step 2: Ps-openspec Legislation & Gate 2 Plans"]
        Legislate --> Dispatch["Swarm Dispatcher (spawn Workers with Tasks.md Briefs)"]
        Verify["Step 5: 1:1 Checkoff & Final Human Sign-off"] --> Delivery["Delivery Archive"]
    end

    subgraph SwarmExecutionPlane["Swarm Worker Execution Plane (Implementation Subagents)"]
        Dispatch --> Board[("Swarm Shared Message Board\n(sidecar://swarm/swarm_board/)")]
        Board <-->|"@mentions Handoff"| WorkerAuthor["Worker: Author / Dev\n(Isolated Workspace: branch/inherit)"]
        Board <-->|"@mentions Handoff"| WorkerAuditor["Worker: Auditor / Reviewer"]
        Board <-->|"@mentions Handoff"| WorkerVerifier["Worker: Verifier / Tester"]
        Monitor["Worker: Monitor\n(Stall Watchdog)"] -.-> Board
        WorkerVerifier -->|"@coordinator Result Capsule [Measured Exit 0]"| Verify
    end

    subgraph ContextShield["Double Context Shield"]
        WorkerAuthor -.-> PrivateSession["Heavy Test Traces & Control Logs (Quarantined)"]
        WorkerVerifier -.-> PrivateSession
    end
```

### 1.2 High-Concurrency Multi-Task Pipelining
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Lead as Lead Agent (Coordinator)
    participant Swarm1 as Swarm Task-1 Workers
    participant Swarm2 as Swarm Task-2 Workers

    User->>Lead: Submit Task 1
    Lead->>Lead: Gate 1 Dossier + Gate 2 OpenSpec
    Lead->>Swarm1: Spawn Workers & Brief on Board
    Note over Lead: Lead frees execution thread immediately!

    User->>Lead: Submit Task 2 (Concurrent!)
    Lead->>Lead: Gate 1 Dossier + Gate 2 OpenSpec (Task 2)
    Lead->>Swarm2: Spawn Workers & Brief on Board

    Swarm1-->>Lead: @coordinator Task 1 Verified [Measured Exit 0]
    Lead->>User: Task 1 Verification & Final Delivery Sign-off

    Swarm2-->>Lead: @coordinator Task 2 Verified [Measured Exit 0]
    Lead->>User: Task 2 Verification & Final Delivery Sign-off
```

---

## 2. Invariant Definition (Axiom 56)

> **Axiom 56: Lead Agent Orchestration & Swarm Execution Decoupling Axiom (`LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM`)**
> 1. **Lead Agent Governance Purity**: The Lead Agent must operate strictly as the system architect and client coordinator. Its responsibilities are confined to Step 0 intent intake, Step 1 architectural anchor, Step 2 OpenSpec legislation and Gate 2 plan presentation, Swarm dispatch, and Step 5 bidirectional verification. The Lead Agent is forbidden from performing direct Step 3 code modifications.
> 2. **Mandatory Swarm Delegation**: All concrete implementation tasks in Step 3 (code authoring, refactoring, test execution, error debugging) must be delegated to Swarm Workers.
> 3. **High-Concurrency Availability**: The Lead Agent must maintain an ultra-lightweight context to enable rapid, concurrent task acceptance and pipelining without stalling or waiting synchronously.
> 4. **Bidirectional OpenSpec Binding**: Swarm briefs must directly derive from OpenSpec `tasks.md`, and task sign-off requires verified empirical proof (`[Measured]` exit code 0) returned by the Worker.

---

## 3. Layer 2 Automated Linter & Guardrail Architecture

The automated validation suite (`tests/lead-agent-swarm-decoupling.test.mjs`) verifies:
1. **Constitutional Invariant Registry**: Verifies that `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` contain the complete Axiom 56 rules and blockers.
2. **OpenSpec Spec Parity**: Verifies all 5 RFC 2119 requirements and scenario blocks.
3. **Role Boundary Audit**: Asserts structural decoupling between Lead Agent governance and Swarm Worker implementation.
4. **Domain Neutrality & Anti-Scenario Leakage**: Verifies pure software engineering terminology across all Axiom 56 assets.
