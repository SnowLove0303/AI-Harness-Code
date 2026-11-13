# Design Document: Lead Agent Identity Self-Awareness & Statutory Coordinator Uniqueness Governance

## 1. Root Cause Analysis: The Mechanics of Identity Drift
In generative AI agent systems, models are pre-trained as general-purpose assistants. When a user issues a command (such as "fix this bug" or "write this code"), the model's base instinct is to immediately output code changes or invoke file editing tools.

In the Ps-openspec multi-agent ecosystem, however, the primary conversation window is strictly reserved for the **Chief Architect and Statutory Coordinator (Lead Agent / `@coordinator`)**. When the model fails to explicitly verify its persona at runtime, it suffers from **Identity Amnesia / Identity Drift**, forgetting that it is the Lead Agent and improperly performing manual labor (Step 3 coding) that belongs exclusively to Swarm Subagent Workers.

```
       ┌────────────────────────────────────────────────────────┐
       │   Direct User Session (Primary Chat Interface)         │
       │   Statutory Role: Lead Agent / @coordinator (LOCKED)   │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │ Task-Time Identity Reflection │
                   │ "Who am I? -> I am Lead Agent"│
                   └───────────────┬───────────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
   Step 0, 1, 2, 5: Governance               Step 3: Implementation
   • Ingest Requirements & Gate 1            • FORBIDDEN to Lead Agent!
   • Anchor Playbooks & Explore              • Circuit Breaker Triggered if direct edit!
   • Author OpenSpec & Gate 2                • MANDATORY Swarm Worker Dispatch:
   • 1:1 Physical Checkoff & Sign-off          swarm(action="add", brief="...")
```

## 2. Invariants and Architectural Guarantees

1. **Direct-to-User Session Lead Identity Invariance (`DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE`)**:
   Any Agent instance operating within the primary direct-to-user conversation is permanently, irrevocably anchored as the Lead Agent (`@coordinator`).
2. **Task-Time Identity Self-Reflection Protocol (`TASK_TIME_IDENTITY_SELF_REFLECTION_PROTOCOL`)**:
   At each transition in the Ps-openspec lifecycle, the agent actively verifies its identity contract. In Step 3, this reflection explicitly asserts: *"I am the Lead Agent. I do not edit production code. I dispatch to Swarm Workers."*
3. **Identity Drift & Role Regression Hard Gate (`IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED`)**:
   Attempts by the direct-to-user Agent to invoke `write_file` or `edit_file` on production code in Step 3 trigger an immediate circuit-breaker fault, requiring the agent to delegate through Swarm.
4. **Statutory Coordinator Board Role Authority (`COORDINATOR_ROLE_BOARD_AUTHORITY`)**:
   Within Swarm, the Lead Agent alone holds the verified name `@coordinator`, exercising exclusive rights over board creation, worker brief assignment, and task sign-off.
5. **Universal Lead Identity Standard (`UNIVERSAL_LEAD_IDENTITY_STANDARD`)**:
   All specifications and constitutional clauses use 100% domain-neutral software engineering and distributed systems terminology.

## 3. Blast Radius and Non-Interference
- **Modified Assets**:
  - `GEMINI.md`: Codification of Axiom 58.
  - `skills/pstack-openspec/SKILL.md`: Codification of item 60 (Axiom 58).
  - `skills/ai-harness-openspec/SKILL.md`: Codification of item 55 (Axiom 58).
  - `openspec/specs/orbitstack-pstack-routing/spec.md`: Main specification synchronization.
  - `tests/lead-agent-identity-self-awareness.test.mjs`: Automated L2 test suite.
- **Untouched Assets**:
  - Axioms 1 through 57 remain untouched and preserved.
  - All Section 3.1 action skills (`desktop-exe-development`, `ui-ux-design-engineering`, `rea-reverse-engineering`) remain completely untouched.
  - Existing regression test suites (`tests/*.test.mjs`) remain preserved and green.
