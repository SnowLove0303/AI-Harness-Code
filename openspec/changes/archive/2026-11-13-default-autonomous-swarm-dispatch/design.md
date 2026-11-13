# Design Document: Default Autonomous Swarm Dispatch in Ps-openspec Tasks

## 1. Architectural Overview & Dispatch Topology
In the OrbitStack Ps-openspec ecosystem, the Lead Agent functions strictly as the Chief Architect and Gate Guardian (Step 0, Step 1, Step 2, and Step 5). Previously under Axiom 56, the operational separation between the Lead Agent and Swarm Workers was codified, but the trigger mechanism lacked explicit default auto-activation semantics, creating ambiguity when users did not explicitly write "use Swarm".

This design formalizes **Default Autonomous Swarm Dispatch**:
```
User Prompt (Generic, no "swarm" keywords required)
   │
   ▼
Step 0: Spec-Kit Ingestion & Gate 1 (What & Acceptance Criteria)
   │
   ▼ User Approval
Step 1: Anchor & Plan First (PStack Playbook Resolution)
   │
   ▼
Step 2: Ps-openspec Legislation & Gate 2 (proposal.md, tasks.md with default Swarm delegation)
   │
   ▼ User "执行" / Approval
Step 3: Single-Focus Execution (Apply)
   │
   ├─► AUTOMATIC TRIGGER (No prompt keyword needed)
   │   │
   │   ├─► swarm(action="title", title="...")
   │   ├─► swarm(action="add", name="worker-N", brief="...")
   │   ├─► swarm(action="add", name="watchdog", brief="...")
   │   └─► swarm_wait(since=...)
   │
   ├─► Swarm Worker implements changes in isolated workspace
   ├─► Swarm Worker runs tests, posts [Measured] Exit Code 0 to @coordinator
   │
   ▼
Step 4: Audit & Commit (Atomic commits per validated phase)
   │
   ▼
Step 5: 1:1 Physical Checkoff & User Sign-Off
```

## 2. Invariants and Architectural Guarantees

1. **Zero-Prompt Autonomous Activation (`DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE` / `ZERO_PROMPT_SWARM_AUTO_DISPATCH_RULE`)**:
   Swarm execution is an intrinsic architectural invariant of Ps-openspec, not an optional user feature. The agent MUST NOT require prompt keywords to activate Swarm.
2. **Default Swarm Task Modeling in OpenSpec (`DEFAULT_SWARM_TASK_MODELING_RULE`)**:
   All concrete implementation tasks in `tasks.md` are inherently modeled as Swarm-delegated operations with structured brief contracts.
3. **Anti-Monolithic Execution Degradation Gate (`ANTI_MONOLITHIC_EXECUTION_BLOCKED`)**:
   Direct implementation by the Lead Agent in Step 3 is strictly blocked. Any attempt to modify business code or execute local test loops without Swarm worker delegation triggers a governance failure.
4. **Transparent Swarm UX Protocol (`TRANSPARENT_SWARM_UX_PROTOCOL`)**:
   Board interactions, `@mentions`, and worker lifecycle management are fully encapsulated behind the standard Ps-openspec gate interactions.
5. **Universal Abstraction Standard (`UNIVERSAL_SWARM_AUTO_ACTIVATION_STANDARD`)**:
   All constitutional definitions use strictly domain-neutral software engineering and distributed multi-agent terminology.

## 3. Blast Radius and Non-Interference
- **Modified Assets**:
  - `GEMINI.md`: Amendment to Axiom 56.
  - `skills/pstack-openspec/SKILL.md`: Amendment to item 58.
  - `skills/ai-harness-openspec/SKILL.md`: Amendment to item 53.
  - `openspec/specs/orbitstack-pstack-routing/spec.md`: Main specification synchronization.
  - `tests/default-autonomous-swarm-dispatch.test.mjs`: Automated L2 test suite.
- **Untouched Assets**:
  - Axiom 1 through 55 and Axiom 57 remain unmodified.
  - All Section 3.1 action skills (`desktop-exe-development`, `ui-ux-design-engineering`, `rea-reverse-engineering`) remain completely untouched.
  - Existing test suites remain preserved.
