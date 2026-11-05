# Ps-openspec Gemini system reference

This document describes the Ps-openspec Gemini adaptation in this repository. It explains how tasks execute in Google Gemini and Antigravity, how PStack playbooks map to native Gemini tools and subagents, and how the system is installed and packaged.

## System boundary

Ps-openspec Gemini combines the pinned PStack plugin (573 files), OpenSpec, a native Gemini adapter (`orbitstack-gemini`), a route registry, and OrbitStack's lossless handoff and invariant-protection mechanisms.

```mermaid
flowchart TD
    U[User request and safety boundaries] --> G[GEMINI.md or AGENTS.md]
    G --> K1[Gate 1: Spec-Kit 1:1 RTM Detailed Brief]
    K1 --> P[Pinned PStack poteto-mode]
    P --> R[Selected playbook and triggered skills]
    R --> M[Dynamic model tiering: flash_lite / flash / pro]
    M --> O[One OpenSpec change and tasks.md]
    O --> K2[Gate 2: Ps-openspec Plan & Dual-Checklist]
    K2 --> A[Gemini adapter and route registry]
    A --> S[Native subagent invoke_subagent with branch workspace]
    S --> X[Handoff capsule with SHA-256 integrity]
    S --> K[Context shielding: <appDataDir>/brain artifacts]
    K --> V[Single-focus [-] apply and Zero-trust regression checks]
    V --> O
    O --> C[1:1 Bidirectional checkoff]
    C --> H[Validate and archive when complete]
```

## Authority and source of truth

| Concern | Authoritative source | Role |
|---|---|---|
| User intent | The current user request and later directives | Defines requested goals, constraints, and non-goals |
| Requirements intake | Spec-Kit 1:1 Requirement Traceability Matrix (RTM) | Preserves Count Parity (N_raw == N_matrix) without over-summarization |
| Execution method | `bundle/pstack-upstream/` (commit `c742dd61706fbacc1b95f1a20b7b988cf096ce6c`) | Supplies `poteto-mode`, 23 playbooks, 24 principles, 58 skills |
| Gemini adaptation | `orbitstack-gemini/SKILL.md` | Maps PStack routing, model tiering, subagents, and artifacts to Gemini |
| Playbook mapping | `docs/pstack-openspec-route-map.json` | Maps each PStack playbook to OpenSpec actions, Gemini capabilities, and model tiers |
| Persistent task state | One active OpenSpec change | Stores intent, requirements, tasks, evidence, and archive history |
| Code relationship map | Code Review Graph | Identifies changed symbols, callers, and flows (derived data) |
| Historical behavior protection | OpenSpec invariant metadata and regression checks | Enforces preservation or explicit supersession of protected behaviors |

## Gemini native integration

### 1. Dynamic reasoning budget (`pstack-models` -> Gemini model tiers)

PStack emphasizes matching reasoning budget to task difficulty:
- `flash_lite`: Low-latency classification, route selection, linting, syntax checking, and git status parsing.
- `flash` (or `inherit`): Standard implementation, feature development, bug fixing, refactoring, and TDD cycles.
- `pro`: Deep architectural exploration (`/architect`), red-team interrogation (`/interrogate`), and Arena blind evaluation judging (`/arena`).

### 2. Lossless subagent handoff via native `invoke_subagent`

1. The parent agent extracts task metadata and generates a cryptographic capsule from OpenSpec:
   `node .orbitstack/scripts/pstack-handoff.mjs generate --change <change-id> --task <task-id>`
2. The subagent is launched via Gemini's native `invoke_subagent` with `Workspace='branch'` (or `'share'`). The dispatch prompt carries the mandatory standard header:
   `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`
3. Reactive Wakeup: Parent agent avoids polling. The runtime resumes execution when the subagent finishes.
4. Return verification: The parent validates returned paths against declared write boundaries:
   `Get-Content returned-capsule.json | node .orbitstack/scripts/pstack-handoff.mjs verify-return --ack-task <id> --ack-digest <digest> --changed-path <paths>`
5. Zero-Trust verification: The parent independently re-runs acceptance checks in the main workspace before checking off tasks.

### 3. Context shielding and artifacts

- Subagents isolate heavy build, compilation, and scraping output.
- Multi-step reports, architectural analyses, and test traces are stored as structured artifacts in `<appDataDir>\brain\<conversation-id>`.
- Subagents reply with a high-density summary (1,000 to 2,000 tokens) pointing to the artifact, preventing parent context decay.

### 4. Native VS Code Diff review

- Code modifications prioritize the `vscode-review` MCP tool `review_diff_in_vscode`, presenting two-column diffs for user review before application.
- Fallback: `code --reuse-window --diff <base> <proposed>` if the MCP tool is not active.

### 5. OpenSpec Explore mode tooling (Phase 1 Thinking)

Antigravity natively structures Phase 1 (Explore) through tool-guided exploration:
1. Pure Read-Only Exploration: Model reasons over architecture without modifying or creating code files.
2. Context Resolution: Uses `openspec context --json` to verify workspace alignment.
3. Instruction Fetching: Uses `openspec instructions <artifact>` for structural guidance and template validation.
4. Brain Artifact Staging: Exploration topologies and decision matrices are saved to `<appDataDir>\brain\<conversation-id>` as persistent artifacts before proposing.

### 6. Specification dependencies and trace mapping

- Core routing specification `orbitstack-pstack-routing` anchors on the pinned upstream mirror `bundle/pstack-upstream/` and `docs/pstack-openspec-route-map.json`.
- Distribution package specification `ps-openspec-distribution` governs package construction and installer behavior.
- Invariant IDs (e.g. `INV-GEMINI-ROUTE-MAPPING`, `INV-PSTACK-ROUTE-SOURCE`, `INV-OPEN-SPEC-SINGLE-SOURCE`) provide durable bidirectional traceability between code anchors, regression checks, and specification requirements.

### 7. Spec-Kit zero-loss ingestion & dual-gate workflow

To prevent the multi-turn requirement evaporation defect ("1,2,3,4 -> 1,2,3 -> 1,2 -> 1"):
1. Gate 1 (Spec-Kit Zero-Loss Ingestion & Requirement Confirmation Gate):
   - Statutory Purpose: Pure 100% confirmation of "What" needs to be done and verifiable Acceptance Criteria before any design work begins.
   - Constructs a 1:1 Requirement Traceability Matrix (RTM) from the raw user prompt.
   - Demands Count Parity ($N_{\text{raw}} \equiv N_{\text{matrix}}$).
   - Absolute Prohibition: Strictly forbidden from discussing implementation details, code locations, or proposed file lists during Gate 1.
   - Reports an exhaustive, non-compressed requirement dossier and halts for user confirmation (Gate 1).
2. Gate 2 (Ps-openspec OpenSpec Authoring & Specification Authorization Gate):
   - Statutory Purpose: Formally write and present the OpenSpec change artifacts (`proposal.md`, `specs/`, `design.md`, `tasks.md`) under the Ps-openspec framework.
   - Embeds the RTM into `proposal.md`, maps requirements 1:1 to RFC 2119 specs (SHALL/WHEN/THEN), designs architecture and causal topologies in `design.md`, and binds tasks in `tasks.md` with explicit verification commands and single-focus lock (`[-]` lock).
   - Attaches the Dual-Checklist (Proposed Scope with causal self-proof + Preserved Invariants).
   - Absolute Prohibition: Strictly forbidden from touching or modifying business implementation code before Gate 2 OpenSpec artifacts are explicitly authorized by the user.
   - Halts for user authorization ("execute / approve") before moving to Phase 3 construction.
3. 1:1 Bidirectional Delivery Checkoff:
   - Final report must verify every numbered requirement against passing command evidence (`[Measured]` exit code 0).

### 8. Strict Lint and compiler hard blocker (Layer 2)

Static analysis and compilation errors possess non-negotiable one-vote veto authority:
1. Hard Blocker with Zero Tolerance: commands must pass with `--max-warnings=0` and exit code 0; warnings are treated as build failures.
2. Anti-Suppression Invariant: suppressing errors via `// @ts-ignore`, `// @ts-nocheck`, `/* eslint-disable */`, or `as any` casts without user authorization is strictly forbidden.
3. Single-Focus Task Lock Requisite: unlocking an active `[-]` task requires green verified execution of both functional tests and zero-warning compiler/lint passes.
4. Two-Strike Escalation: any recurrent defect corrected twice in review is escalated into an enforceable AST/ESLint rule.

### 9. Advanced defensive matrix against agent meta-pathologies

To counteract systemic pathologies identified in autonomous Agent development (such as case overfitting, defensive fabrication, and shallow verification):

1. **Verifier Isolation & Anti-Patching (Axiom 17)**:
   - Evaluator definitions and test suites reside in an isolated Validation Plane, strictly excluded from the agent's writable scope during implementation.
   - Forbids ad-hoc overfitting (e.g. `if (input === 'case') return special_val`).
   - Requires transformations and core logic to generalize through parameterized verification.
2. **Explicit Missing States & Anti-Fabrication (Axiom 18)**:
   - Distinguishes Unknown/Unprovided from False/NotApplicable.
   - Requires explicit algebraic types (`Option<T>`, `Result<T, E>`) and prohibits defensive fallbacks (`val || '未检出'`).
   - Unobserved fields must be preserved as explicit `UNKNOWN` or propagated as recoverable errors rather than hallucinating convenient defaults.
3. **Env-Authored Witness & Auto-Rollback (Axiom 19)**:
   - Neutralizes self-attestation bias by mandating untamperable witness proofs: CLI exit code 0, zero lint warnings (`--max-warnings=0`), and test runner output.
   - Automatic Atomic Rollback: When a compilation or lint regression occurs, the system triggers immediate atomic rollback (Git reset/stash) to the last clean baseline, preventing the stacking of broken patches.
4. **Ground-Truth Anchoring & 100% Fact Provenance (Axiom 20)**:
   - Computes and freezes cryptographic digests and fact fingerprints from raw user inputs and source assets at Step 0.
   - Enforces 100% fact provenance across all extraction, translation, and rendering steps, eliminating procrustean truncation and intent evaporation.
   - Delivery mandates a 1:1 bidirectional physical reconciliation table against the frozen fact fingerprint.

### 10. Graph-Driven Methodology Association & Governance Engine

To enable rapid discovery and disciplined execution of domain methodologies under the supreme governance of Ps-openspec:

1. **Supreme Framework vs. Subordinate Ingestion**:
   - Ps-openspec (OrbitStack) functions as the top-level standard across all sessions and agent threads.
   - Spec-Kit operates as a subordinate ingestion protocol within Step 0 to guarantee 1:1 Requirement Traceability without scope loss.
2. **Action Skill Layer for Execution Methodologies**:
   - Specific methodologies (e.g. Workflow Development—tooling ACI/MCP, SOP state machine execution, and trajectory crystallization into reusable skills; UI/UX Design—Experience First, visual parity with image diffs; and Engineering Practices—TDD, statecharts, unslop) reside modularly at the Action Skill Layer (`skills/<methodology>/SKILL.md`).
3. **Graph Topology & Rapid Discovery (Fast Discovery)**:
   - The system utilizes Graph relationships (Code Review Graph, Route Map, and Invariant DAG) to connect task domains to specific methodology skills.
   - During Step 1 (Anchor) and Step 2 (Propose), the agent traverses Graph nodes to bind the exact methodology required for the detected component.
4. **Graph-Enforced Blast Radius & Safety Guardrails**:
   - Graph topology defines write boundaries, strictly confining methodology actions within designated blast radiuses.
   - Quality checks stipulated by the methodology are compiled directly into `tasks.md` verification commands, barring false progress before external system verification.

### 11. Two-Step Dual-Scope Deep Audit Enforcement Engine

To eliminate over-reliance on purely mechanical exit code 0 passes, eradicate confirmation bias during self-reviews, and ensure comprehensive contract verification:

1. **Two-Step Audit Lifecycle (分阶审计生命周期)**:
   - **Step 1: Mechanical Deterministic Audit (Base Machine Admission Gate)**:
     - Verifier isolation quarantines test suites in the read-only Validation Plane. Unapproved changes trigger `VERIFIER_TAMPERING_DETECTED` and atomic rollback.
     - Mutation sanity injects adversarial bugs to ensure tests fail under mutation, blocking `TRIVIAL_ASSERTION_FRAUD`.
     - Compilers and linters enforce `--max-warnings=0`. Mandatory negative/boundary test ratio $\ge 30\%$.
     - Passing Step 1 is Key 1 (necessary prerequisite). Execution cannot transition to Step 2 without exit code 0.
   - **Step 2: Agent Cognitive & Specification Audit (Semantic Falsification Gate)**:
     - Builder agents are barred from self-auditing. A fresh independent subagent (`Model='pro'`, `Workspace='branch'`) executing Poteto's `/interrogate` playbook acts as adversarial auditor.
     - Requires micro-evidence anchoring with absolute file paths and line ranges (`file:///path#Lxx-Lyy`) plus verified logs.
     - Requires active adversarial falsification recording: demonstrating how the implementation withstands boundary attacks.
2. **Dual-Scope Specification Governance (双轨规范治理网)**:
   - **Global Specs (Macro Invariants)**: System-wide constitutions, architecture承重墙, immutable locks (`@ANTIGRAVITY_INVARIANT_LOCK`), explicit missing states, and 100% fact provenance.
   - **Local Specs (Micro Contracts)**: Module-level behavioral contracts (RFC 2119 SHALL/WHEN/THEN), domain boundaries, and state transition topologies.
   - **1:1 Itemized Reconciliation ($N_{\text{Global}} + M_{\text{Local}}$)**: The audit dossier must output an itemized reconciliation table containing every single spec item. Missing any clause triggers `SPEC_OMISSION_DETECTED`.
3. **Human Tactile Double-Key Release Gate**:
   - Both Key 1 (mechanical green) and Key 2 (cognitive specification green) must be achieved before presenting the VS Code native diff viewer (`review_diff_in_vscode`) for final human tactile authorization.

### 12. Agent-Execution-First Meta-Problem Framing & Ps-openspec Resolution Engine

To prevent superficial and ad-hoc reasoning when analyzing errors, user challenges, and quality incidents:

1. **Meta-Problem Elevation (Beyond Isolated Case Symptoms)**:
   - Analysis must strictly avoid getting lost in micro-domain trivia or single-case narratives.
   - Any quality breach is immediately elevated to systemic Agent execution pathology: greedy local overfitting (hardcoding to satisfy a single sample), dead-code shadowing (unreachable branches created by hurried condition insertions), self-verification bias (weak assertions passing invalid outputs), and macro-statistical evading (using superficial character lengths or token similarity to mask microscopic payload replacement).
2. **Deterministic Resolution via Ps-openspec Invariants**:
   - Every identified execution defect must be resolved through Ps-openspec governance mechanisms:
     - Freezing micro-entity Fact Fingerprints and 1:1 RTM mappings during Step 0.
     - Enforcing L1 architectural invariants and AST linters to reject hardcoded constants during Step 1-2.
     - Imposing verifier isolation, single-focus locks, and `--max-warnings=0` during Step 3.
     - Subjecting test assertions to automated mutation sanity checks and fresh Pro red-team interrogation during Step 4.
     - Requiring 1:1 physical checkoff tables and VS Code native diff human tactile gates during Step 5.
     - Escalating recurrent patterns down the trust pyramid (L1 state machine, L2 AST lint, or L3 invariant constitution).

### 13. Execution Friction Journaling & Defense Escalation Retro Engine

To prevent myopic in-situ patching and eliminate silent swallowing of execution frictions:

1. **In-Execution Friction Journaling (Step 3)**:
   - During task execution under the single-focus lock (`[-] lock`), whenever an agent encounters failed test runs, compiler diagnostic errors, brittle dependency mismatches, or tool-level exceptions requiring retries, it must log an immutable `[Incident: Friction/Bug]` entry into local task memory or `tasks.md`.
   - Agents are forbidden from sanitizing diagnostic traces: the friction signature, root cause hypotheses, and initial patches must be transparently preserved.
2. **Mandatory Post-Task Retro Dossier (Step 5 Delivery)**:
   - Final release dossiers must be triad: 1:1 Requirement Checkoff + Encountered Friction Journal + Durable Escalation Proposals.
   - For every recorded incident, the agent must formulate a durable escalation plan across the Trust Pyramid:
     - L1 (Type/Architecture): Making invalid states unrepresentable via algebraic data types or state machines.
     - L2 (Static Lint/AST): Hard mechanical AST rules with auto-fix guidance blocking defect recurrence.
     - L3 (Constitutional Rules): Closed-scope admission constraints in `AGENTS.md`.
     - L4 (Verification): Adversarial mutation tests validating active domain error rejection.
3. **Actionable Hardening Tasks**:
   - The retro dossier must conclude with concrete, actionable hardening tasks. With single-phrase user authorization ("批准下沉"), the agent immediately executes and commits these hardening assets.

### 14. State Legitimacy & Anti-Symptom-Masking Engine

To prevent myopic symptom patching ("脚痛医脚") and enforce root-cause resolution:

1. **State Legitimacy Dichotomy (状态合法性二分判定)**:
   - When a defect, unhandled case, or invalid payload manifests at a Consumer Sink, the agent must trace dataflow backward to the Origin Producer before proposing fixes.
   - If the state is legitimate within domain semantics but unhandled: the Consumer Sink lacks handling; patch the sink.
   - If the state is illegitimate (violates schema, missing mandatory invariant, corrupted structure): the Consumer Sink must NOT mask it. Patching the sink via fallback defaults, swallowed errors, or scattered guards is strictly forbidden (Symptom Masking). The agent must backtrace to the Origin Producer and eliminate the illegal state generation at the source.
2. **Five Forbidden Masking Anti-Patterns (五大受限掩盖反模式)**:
   - Scattered Guards (`if (!x) return`), Swallowed Errors (`catch (e) {}`), Clamped / Coerced Values (`val || default_value` or `Math.max/min`), Discarded State (silent filtering of unparseable items), and Shotgun Validation (redundant inner checks violating boundary guarantees).
3. **Boundary Parsing (Parse, don't validate)**:
   - Untrusted inputs must be parsed and structured into strict domain types at the ingestion boundary. Internal functions operate on guaranteed valid models without defensive boilerplate.
4. **Fail-Fast & Non-Masking**:
   - Invariant violations must fail fast near the source with explicit domain errors.
5. **Gate 2 Causal Role Self-Proof (`SINK_PATCHING_BLOCKED`)**:
   - Proposed changes in Gate 2 must classify modified units as `[Root Source]`, `[State Transition]`, or `[Consumer Sink]`. Proposing patches that only modify `[Consumer Sink]` without touching or proving `[Root Source]` triggers immediate `SINK_PATCHING_BLOCKED` rejection.

### 15. Generic Asset Anti-Tampering & Mechanism-Policy Separation Engine

To prevent single-task pollution and preserve generic infrastructure assets:

1. **Mechanism vs. Policy Physical Separation (机制与策略物理隔离)**:
   - Generic utilities and engine tools provide domain-neutral mechanisms (transforms, calculations, execution primitives).
   - Task-specific logic, idiosyncratic data formats, and business parameters represent policy. Policy belongs strictly in the caller/adapter layer and must never infiltrate generic assets.
2. **Caller-Side Adaptation First (调用端适配优先)**:
   - When friction or failures occur due to task-specific input nuances or non-standard payloads, the generic program remains read-only under `@ANTIGRAVITY_INVARIANT_LOCK`.
   - The agent must implement adapters, pre-parsers, or transformers at the caller boundary rather than modifying the core generic tool.
3. **Four Laws of General Evolution (通用演进四严律)**:
   - When core generic capabilities must be extended, changes must obey:
     - Zero task-specific identifiers or single-task branch conditions.
     - Parametric abstraction (generic configuration, options, or strategy injection).
     - Strict backward compatibility (zero regression for historical callers).
     - Generalized verification (parameterized test matrices + mutation sanity).
4. **Gate 2 Generality Self-Proof (`TASK_SPECIFIC_POLLUTION_BLOCKED`)**:
   - Proposed changes touching generic assets must supply an explicit generality proof. Introducing task-specific hardcoded branches triggers immediate `TASK_SPECIFIC_POLLUTION_BLOCKED` rejection.
5. **Invariant Contract Non-Weakening**:
   - Agents are forbidden from loosening validation thresholds, widening tolerances, or commenting out guard assertions in generic programs to force single-task passes.

### 16. Mandatory User-Specification Ingestion & Active Agent Audit Engine

To eliminate superficial reading of human intent and eradicate passive confirmation bias during audit:

1. **Zero-Omission Ingestion of User Standards (用户法定规范全量通读)**:
   - When the user provides explicit correct practices, formal specifications, reference exemplars, or audit schemes, every agent (main or subagent) must read them 100% in full before designing or coding.
   - Relying on generic LLM pre-training assumptions or skimming/truncating user-provided rules is strictly prohibited.
2. **Two-Step Audit with Active Bug Hunting (双阶结合与主动找茬)**:
   - Mechanical verification (compilers, linters, tests, exit code 0) serves as Step 1 (machine baseline).
   - Upon completing mechanical passes, the agent must execute Step 2 (Agent Cognitive Audit): actively hunting for hidden defects, unhandled edge cases, negative space regressions, and state machine deadlocks.
   - Passive confirmation bias ("looks good to me") is strictly barred; findings survive through active adversarial falsification.
3. **Universal Cross-Agent Propagation (跨智能体穿透约束)**:
   - Dispatched subagents and handoff capsules inherit user-provided rules and must return explicit proof of post-task active cognitive auditing before task signoff.

### 17. Mutation Anti-Fraud & Negative Proof Deep Audit Engine

To break the agent self-verification paradox and eliminate superficial "0-issue" pseudo-audits:

1. **Mutation Sanity Gate & TRIVIAL_ASSERTION_FRAUD**:
   - Automated test suites must exhibit genuine mutation killing power. When deliberate fault mutations (condition inversion, guard skipping, payload tampering) are injected, the test suite must produce a red-light failure.
   - If a test suite reports exit code 0 under mutation, it is flagged as weak assertion fraud (`TRIVIAL_ASSERTION_FRAUD`), and the single-focus execution lock (`[-] lock`) remains strictly locked.
2. **Negative Proof Gate & Mandatory Adversarial Quota**:
   - For non-trivial engineering tasks, audit reports claiming "0 issues / all passed" trigger `ZERO_FINDING_SUSPICION` circuit breaker rejection.
   - The auditor agent MUST supply at least 1–2 documented counter-factual boundary attack records proving the system rejected invalid inputs, or provide 1 mutation-kill witness before signoff.
3. **Fresh Pro Auditor Enforcement & Physical Lockout**:
   - Builder agents are physically barred from auditing their own work or granting release signoffs.
   - Final audit must be delegated to a fresh, independent Subagent (`Model='pro'`, `Workspace='branch'`) running the `/interrogate` adversarial playbook.
4. **Two-Strike Machine Escalation Axiom (两碰立项机器化下沉)**:
   - Admonishments in prompts are the weakest form of defense. Any defect or audit omission caught twice by human review must be converted into deterministic machine-executable assets (AST/ESLint rules, pre-commit hooks, or parameterized mutation tests with exit code 1).

### 18. Autonomous Subagent Swarm & Four-in-One Handoff Engine

To solve context window saturation, handoff transmission loss, and executor-verifier conflict of interest:

1. **Auto-Dispatch by Default & Coordinator Architectural Lock**:
   - The coordinator agent (Main Agent) receiving user instructions serves strictly as system architect, gatekeeper, and supreme auditor. The coordinator is barred from directly writing or modifying business code.
   - All concrete construction, bug fixing, and refactoring tasks must be automatically dispatched to an Executor Subagent.
2. **Subagent Reuse vs. Fresh Decision Tree (`manage_subagents`)**:
   - Before spawning, the coordinator invokes `manage_subagents(Action='list')` to survey active agents.
   - *Stateful Continuity Reuse (`send_message`)*: Only when following up on an unfinished breakpoint of the same active task, or when the subagent holds non-persisted transient state (active Git worktree branch, running test daemon/watcher/server).
   - *Fresh by Default (`invoke_subagent`)*: New tasks, scope changes, triage pivots, or retries after failure must spawn a fresh subagent with `Workspace='branch'` to prevent interrupt-chain prompt contamination.
3. **Four-in-One Lossless Handoff Capsule**:
   - Dispatches cannot rely on casual oral summaries; they must package the Four-in-One Capsule:
     - `ps-openspec`: Architectural contract (proposal, RFC 2119 specs, single-focus `[-]` task, non-zero exit acceptance commands).
     - `skill`: Methodological action skills (`pstack-openspec`, `unslop`, `tdd`).
     - `Context`: Physical writable file bounds, read-only invariants (`@ANTIGRAVITY_INVARIANT_LOCK`), base commit SHA, and frozen fact fingerprints.
     - `Prompt`: Single-responsibility directive with explicit Non-Goals.
4. **Active Completion Report & Reactive Wakeup**:
   - Upon completion, the executor subagent actively submits a structured completion report containing `[Measured]` exit code 0 log evidence, mutation kill records, and changed file paths.
   - The coordinator agent is reactively resumed by system event without polling loops, immediately triggering two-step cognitive and adversarial audit.
5. **Verifier-Only Merge Authority & Workspace Sandboxing**:
   - Executor subagents run strictly in isolated branch workspaces (`Workspace='branch'`), physically preventing direct mutations or autonomous merges into the main tree.
   - Merge authority belongs exclusively to the coordinator/auditor after passing 100% mechanical verification and adversarial interrogation.

### 19. Universal Engineering Anti-Phantom & Structural Fidelity Engine

To eradicate phantom execution, prototype contamination, dual-track layout variance, hallucinatory structural bloat, and surface pseudo-audits across all automated engineering:

1. **Zero-Unverified-Effect & Fail-Fast Assertion (`SILENT_NO_OP_FRAUD`)**:
   - Primitives and transform handlers are strictly barred from silent exits (e.g., `if (!node) return;`). Any unexpected input structure must fail fast with fatal exceptions.
   - All mutating primitives require differential unit tests demonstrating pre-state failure and post-state transition.
2. **Clean Construction & Zero-Boundary-Leakage**:
   - Collection expansions must construct fresh nodes via atomic schema constructors rather than deep-cloning existing populated nodes, preventing terminal and boundary-specific properties from cascading to peers.
3. **Single-Pipeline Invariance & Zero-Variance Assembly**:
   - Peer entities in homogeneous sets must be generated exclusively via a unified normalizer pipeline; dual-track assembly mixing residual state with ad-hoc creation is prohibited. Layout variance across peers must evaluate to 0.
4. **Source Topology Invariance & Anti-Speculative-Synthesis**:
   - Output structural topology strictly mirrors input specification geometry ($T_{\text{out}} \subseteq \Phi(T_{\text{in}})$). Speculative invention of synthetic wrapper tiers, preamble blocks, or unrequested nodes is an invariant violation.
5. **Mandatory Slot Completeness & Anti-Attribute-Drift (`EMPTY_MANDATORY_SLOT_BLOCKED`)**:
   - Mandatory terminal slots resolving to null, undefined, or empty whitespace trigger immediate `EMPTY_MANDATORY_SLOT_BLOCKED` halt. Attribute values are strictly bound to designated slots without spilling over to neighboring entities.
6. **Terminal Leaf-Node Deterministic Audit**:
   - Audits and verification suites must assert against the deepest physical discrete leaf attributes; macro exit code 0 or substring matching alone cannot certify compliance.

### 20. Autonomous Spec & Audit Gate Co-Evolution Engine

To eradicate patch-and-forget remediation and ensure human-guided corrections permanently elevate project defenses:

1. **Anti-Patch-and-Forget Invariant**:
   - Resolving defects or implementing fixes under human guidance or review never concludes with code changes alone. Stopping at local code remediation without elevating project specifications and audit gates constitutes an incomplete delivery violation.
2. **Fuzzy Probing of Living Guidance & Project Standards**:
   - The agent proactively searches context, root directories, and documentation paths for living guidelines, specifications, and QA criteria (matching patterns like `specs/`, `docs/`, `guidelines/`, `standards/`, `audit_guide.md`, `qa_rules.md`, or custom project guidance). If no consolidated specification exists, the agent initiates and formalizes a living specification document in the standard path.
3. **The Trinity Self-Augmentation Procedure**:
   - **Living Specification Augmentation**: Extracts RFC 2119 requirement clauses (`SHALL` / `SHALL NOT`) defining newly identified valid and invalid operational domains.
   - **Audit Guidance & Inspection Checklist Enrichment**: Codifies newly captured failure modes, edge-case attack vectors, and step-by-step verification instructions into project audit playbooks.
   - **Deterministic Gate Construction (`principle-build-the-lever`)**: Encodes lessons into machine-enforced test assertions, pre-commit checks, or AST/Lint rules throwing non-negotiable exit code 1 on regression.
4. **Permanent Baseline Elevation & Universal Swarm Inheritance**:
   - Once reviewed and merged via VS Code Diff review, augmented specifications and deterministic gates become non-negotiable baselines for all subsequent sessions and subagent swarms. Every future agent or subagent touching related modules automatically inherits and executes these gates, preventing regression cycles.

### 21. Spec Supremacy & Constitutional Inviolability Engine

To safeguard historical project specifications against invalid auditor regression and preserve the absolute exclusivity of constitutional changes:

1. **Spec Supremacy & Protected Invariant Immunity (`SPEC_IMMUNITY_PROTECTED`)**:
   - Verification suites, static linters, and auditor subagents are bound to execute and verify existing specifications; they hold zero constitutional or re-interpretation authority.
   - Code that explicitly fulfills Living Specifications, is encapsulated by `@ANTIGRAVITY_INVARIANT_LOCK`, or is backed by passing baseline acceptance tests automatically acquires `SPEC_IMMUNITY_PROTECTED`.
   - Auditors are strictly barred from reclassifying compliant code as defects or code smells under subjective pretexts ("redundancy", "over-engineering", "clean code style"). Violations immediately trigger `SPEC_INVERSION_FRAUD` and hard rejection.
2. **Beyoncé Pinning & Mutation Tests**:
   - Historical, non-standard, or specialized defensive code must be locked with high-fidelity pinning tests following Google's Beyoncé Rule ("If you liked it, then you shoulda put a test on it").
   - Pinning tests require negative mutation kill efficacy: modifying specialized code to generic or standard conventions must trigger a deterministic non-zero exit code (Exit 1). Exit 0 under mutation is rejected as trivial assertion fraud.
3. **Chesterton's Fences & Why-Not-Just Provenance**:
   - Defensive implementations must be tagged with Chesterton's three-element labels: ① Living Spec contract ID; ② `[Why-Not-Just]` counter-reflection explaining why naive implementations fail; ③ `[Origin Commit / PR]` provenance trace.
   - Auditors cannot propose removing or refactoring fences without establishing why the original constraint was created and verifying that environment conditions have completely obviated it.
4. **Monotonic Ratchet & Supersession RFC Protocol**:
   - Governance criteria and specifications evolve monotonically. Modifying or deprecating existing rules requires a formal Supersession RFC with explicit replacement clauses, root-cause evidence, and human signoff. Routine engineering tasks cannot implicitly supersede rules.
5. **Constitutional Amendment Exclusivity & Anti-Subversive-Trojan Axiom**:
   - Constitutional files (`GEMINI.md`, `GLOBAL-RULES.md`, `AGENTS.md`, and supreme system invariants) are strictly inviolable without explicit human instruction.
   - Camouflaging constitutional adjustments, rule relaxations, or silent overrides inside task-specific changes is strictly prohibited (Zero Trojan amendments).
   - Any constitutional amendment must be explicitly initiated by the user or submitted as an independent top-level Constitutional Amendment RFC. Unauthorized changes trigger `CONSTITUTIONAL_TAMPERING_DETECTED` and immediate atomic rollback.

### 22. Universal Program Purity & Cross-Scenario Invariance Engine

To prevent single-scenario fixes from polluting shared codebases and preserve generic architecture integrity:

1. **Three-Tier Physical Isolation Architecture**:
   - **Universal Mechanism Engine**: Executes pure mathematical, geometric, and AST transformations. Strictly contains zero scenario-specific vocabulary, zero caller naming, and zero ad-hoc special-case branching.
   - **Anti-Corruption Ingestion Layer (ACL)**: Cleanses and converts raw scenario inputs into canonical domain structures at the ingestion boundary, isolating idiosyncratic noise from internal pipelines.
   - **Declarative Policies & Extension Injection**: Scenario variations are modeled as declarative policies, schemas, or strategy plugins. Adding or modifying scenarios incurs zero modifications to core engine code.
2. **Deterministic Anti-Pollution Gates**:
   - `SCENARIO_POLLUTION_BLOCKED`: Introducing hardcoded case branching (`if (case === 'X')`), specific file names, or non-parameterized magic values into shared engines triggers immediate AST blockage.
   - `SINK_POLLUTION_BLOCKED`: Masking upstream errors inside downstream consumer sinks or output formatting nodes is prohibited; anomalies must be back-traced to origin producers or normalized at the ACL boundary.
3. **Cross-Scenario Orthogonal Regression Matrix & Zero-Variance Invariance**:
   - Universal engine adjustments must be verified against an orthogonal matrix of at least 2 to 3 distinct scenario fixtures.
   - Verifies cross-scenario zero-variance ($\text{Var}_{\text{cross}} \equiv 0$): improvements for one scenario must yield zero unintended behavioral or layout regressions across all other scenarios.

### 23. Pure Universal Engineering Abstraction & Anti-Scenario-Anchoring Engine

To establish absolute domain neutrality and prevent AI agents from contaminating universal governance with task-specific scenarios:

1. **Absolute Anti-Scenario-Anchoring Mandatory Standard**:
   - All system rules, architectural invariants, and verification gates must be 100% formulated in pure computer science, software engineering, statechart theory, and formal verification terms.
   - Anchoring rules onto specific business domains, arbitrary file types, or ad-hoc formats triggers immediate `SCENARIO_ANCHORING_POLLUTION` blockage.
2. **Clean-Slate Zero-State Invariant**:
   - Reusable state containers, buffers, and assembly contexts entering a pipeline must be deterministically proven to be in an initial zero state. Processing uncleaned containers triggers `UNCLEANED_CONTAINER_POLLUTION`.
3. **Anti-Coarse-Grained-Exemption**:
   - Bypassing validations across entire containers or modules to protect sub-elements violates least privilege and triggers `BROAD_SCOPE_EXEMPTION_BLOCKED`. Protection scopes must strictly target discrete leaf identifiers.
4. **Closed Bipolar Invariant Assertion**:
   - Verifications must form a bipolar closure: positive assertion of required ground truth + negative exclusion of unauthorized residuals. Unilateral existence checks trigger `ASYMMETRIC_POSITIVE_BIAS`.
5. **Zero-Synthetic-Fallback**:
   - Missing data must remain an explicit empty state (`Option::None`, `null`, `Empty`) or fail fast. Synthesizing plausible-sounding fallback prose or hardcoding domain assumptions inside generic pipelines triggers `PHANTOM_DEFAULT_FRAUD`.
6. **Container Compactness & Homomorphic Invariance**:
   - Collections must undergo active compaction/pruning to remove unallocated slots. Projections of identical source data across multiple targets must have zero structural topological variance ($\text{Var}_{\text{topology}} \equiv 0$).
7. **Popperian Adversarial Verification**:
   - Verifiers must be physically separated from implementers, operating with the sole objective of falsification. Mutating output data must deterministically break test suites; failing to catch mutations triggers `META_AUDIT_FAILURE`.

### 24. Mandatory Lint-Escalation Engine & Anti-Superficial-Apology Engine

To eliminate superficial apologetic loops and force AI agents to mechanistically codify human feedback into durable automated lint and AST verification gates:

1. **Human-Correction State Machine & Escalation Blocker**:
   - The harness maintains a dynamic human-correction incident counter (`correction_incident_counter`).
   - Any explicit rebuke, rejection, or quality correction from the human user increments the counter and logs a `[Correction Incident]`.
   - When the counter reaches $\ge 2$, the system triggers `CORRECTION_INCIDENT_ESCALATION` and injects an unavoidable blocking subtask into `tasks.md`: `[-] Task: 固化机器级 AST/Lint/变异门禁并实测 Exit 1 阻断`.
   - The single-focus task lock (`[-] lock`) physically deadlocks until the linter rule or AST checker is created, executed against bad code, and proven to emit a real non-zero exit code (`Exit 1`).
2. **Pre-Commit Delivery Interceptor & Anti-Free-Apology Gate**:
   - At delivery, merge, and signoff checkpoints, if the session recorded human corrections ($\text{Counter} \ge 1$), the system audits the Git Staged Diff.
   - The staged diff MUST contain newly added or modified static analysis checks, AST visitor rules, linter configurations, or mutation test assertions.
   - If the staged diff contains only implementation code or prose documents without machine enforcement assets, the system aborts delivery with `NO_LINT_DELIVERY_BLOCKED` and executes an atomic rollback.
3. **Anti-Superficial-Apology Protocol**:
   - Conversational, tokenized prose apologies ("非常抱歉", "我深刻反省", "下次一定注意") are physically banned; detecting such boilerplate triggers `SUPERFICIAL_APOLOGY_REJECTED`.
   - Under `ANTI_SUPERFICIAL_APOLOGY_PROTOCOL`, the agent's first response to human correction must strictly and exclusively output three engineering facts:
     ① **Failure Mode Specification**: Precise formal definition of the violated invariant and the code pattern characteristics;
     ② **Proposed Machine Lever**: The exact AST script, lint rule, or mutation test file being introduced;
     ③ **Falsification Proof**: Execution proof demonstrating real exit code 1 when the bad pattern is detected, and exit code 0 when compliant.
4. **Permanent Lint Reservoir & Swarm Cold-Start Invariance**:
   - Solidified lint gates are preserved in permanent project repositories (`scripts/lint/`, `package.json`, or Git pre-commit hooks) under `PERMANENT_LINT_RESERVOIR`.
   - All newly spawned subagents across the swarm during cold-start environment perception (Step 1) must inherit and run the full reservoir suite, ensuring organizational memory persists across agents and threads.
5. **Lint Domain-Neutrality Standard & Anti-Scenario Coupling Gate**:
   - All machine lint gates, AST inspectors, and compiler rules produced under this engine must enforce pure software engineering and AST syntax constraints (`LINT_DOMAIN_NEUTRALITY_STANDARD`).
   - Lint rules hardcoding business domain keywords, specific product codes, or ad-hoc format strings are strictly rejected with `SCENARIO_ANCHORING_LINT_BLOCKED` to preserve global neutrality.

### 25. Generic Tooling Crystallization & Anti-One-Off-Scripting Engine

To prevent AI agents from accumulating ephemeral, hardcoded scratch scripts and force solutions into reusable, durable software engineering leverage:

1. **Poteto Principles Grounding**:
   - Deeply coupled with Lauren Tan (@poteto)'s `principle-build-the-lever` (build rerunnable tools that do or prove the work) and `principle-encode-lessons-in-structure` (encode lessons into structural tools and checks rather than repeated prose).
2. **Lifecycle Separation & Tooling Crystallization (`GENERIC_TOOLING_CRYSTALLIZATION`)**:
   - Disposable scratch scripts are strictly confined to Phase 1 (Explore) read-only diagnostic probing.
   - Upon moving to implementation and delivery, the solution must undergo `GENERIC_TOOLING_CRYSTALLIZATION`, elevating disposable scripts into reusable, parameterized tools within `scripts/tools/` or CLI packages.
3. **Anti-One-Off-Scripting Blocker (`ONE_OFF_SCRIPT_TRAP_BLOCKED`)**:
   - Submitting disposable, single-use scripts that hardcode paths or scenario-specific constants triggers immediate `ONE_OFF_SCRIPT_TRAP_BLOCKED` failure and atomic rollback.
4. **The Three Physical Tooling Contracts**:
   - ① **Parameterized Invariance (`PARAMETERIZED_INVARIANCE`)**: Zero magic strings or hardcoded paths; inputs must be supplied via CLI flags, configs, or streams;
   - ② **Deterministic Machine Lever (`DETERMINISTIC_LEVER_CONTRACT`)**: Returns standard UNIX exit codes (0 for pass, non-zero for explicit failure) with structured diagnostics; safely rerunnable and idempotent;
   - ③ **Self-Testing Sanity**: Accompanied by unit tests or mutation checks proving it allows valid inputs and blocks defect patterns.
5. **Dual-Purpose Leverage (`DUAL_PURPOSE_LEVERAGE`)**:
   - Crystallized tools must explicitly serve at least one statutory objective under `DUAL_PURPOSE_LEVERAGE`:
     ① **Prevention Gate**: Integrated into CI / Pre-commit / Lint pipelines to halt future regressions with Exit 1;
     ② **Acceleration Lever**: Parameterized CLI reducing future diagnosis and resolution from hours to seconds.

### 26. Project-Canonical Single Audit System & Audit Graph Handoff Engine

To prevent multiple fragmented audit standards across agents and ensure lossless verification handoff through structured causal topology:

1. **Project-Canonical Single Audit Base (`PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM`)**:
   - Each project must maintain one and only one canonical audit system baseline registered in its managed audit root.
   - Creating parallel, ad-hoc, or duplicate audit standards is strictly blocked by `DUPLICATE_AUDIT_SYSTEM_BLOCKED`.
2. **Audit Graph Topology Engine (`AUDIT_GRAPH_TOPOLOGY_ENGINE`)**:
   - The canonical audit system models governance invariants as an explicit directed acyclic graph (Audit Graph DAG).
   - Nodes consist of `Specification` (RFC 2119 contracts), `Invariant` (`@ANTIGRAVITY_INVARIANT_LOCK`), `SourceAnchor` (code physical ranges), `Evidence` (measured exit code 0 / mutation kills), and `HumanGuidance` (user decisions).
   - Edges explicitly define causal flow: `governs`, `anchors_to`, `verified_by`, and `derived_from_guidance`. Unanchored audit islands trigger `UNANCHORED_AUDIT_ISLAND_BLOCKED`.
3. **Human-Guidance Continuous Evolution (`HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION`)**:
   - User reviews, corrections, and instructions serve as the supreme evolutionary driver, immediately ingested as `HumanGuidance` nodes and escalated into L1 state machines, L2 AST/Lint checks, or L3 OpenSpec contracts.
4. **Lossless Agent Handoff Baseline (`LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE`)**:
   - Serves as the sole statutory truth baseline across agents and sessions. Handoff capsules (`pstack-handoff`) bind the relevant Audit Graph slice to eliminate cognitive drift (`AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED`).
5. **Universal Pure Engineering Abstraction (`UNIVERSAL_AUDIT_ABSTRACTION_STANDARD`)**:
   - Audit Graph and rules are 100% specified using computer science and software engineering primitives (DAG, statecharts, exit codes), with zero scenario-specific keywords.

### 27. Cognitive Triad Evolution & Kitchen-Brigade Scheduling Engine

Absorbing Lauren Tan (@poteto)'s latest architectural breakthroughs (`brainmaxxing`, `noodle`, `how`) into the OrbitStack Ps-openspec system:

1. **Cognitive Triad Evolution Engine (`COGNITIVE_TRIAD_EVOLUTION_ENGINE`)**:
   - Implements a three-tier self-learning loop:
     ① `/reflect`: Immediate lesson extraction after corrections or deliveries, written to `brain/` and Audit Graph (`UNREFLECTED_DELIVERY_BLOCKED`);
     ② `/ruminate`: Periodic log crawling across historical sessions to unearth implicit preferences and recurrent failure patterns;
     ③ `/meditate`: Bi-directional reconciliation between memory notes and living specs/lint rules, pruning dead rules and escalating repeated corrections to L1/L2 invariants.
2. **Kitchen-Brigade Order Protocol (`KITCHEN_BRIGADE_ORDER_PROTOCOL`)**:
   - `Mise en place`: Orchestrator agent aggregates system context, invariants, and backlog without editing business code;
   - `Orders-next`: Orchestrator emits decoupled, atomic task orders. Direct business code modifications by orchestrators are strictly blocked (`ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED`);
   - Line Cooks: Dispatched worker agents execute tasks in isolated workspaces (`Workspace='branch'` or Git Worktree) with single-focus lock (`[-] lock`).
3. **Fan-Out Exploration & Critique Rubric (`FANOUT_EXPLORATION_CRITIQUE_RUBRIC`)**:
   - Phase 1 Explore supports 2–4 parallel fan-out subagent probes, synthesized into 5 standard dimensions (`Overview`, `Key Concepts`, `How It Works`, `Where Things Live`, `Gotchas`).
   - Gate 5 delivery mandates adversarial critique under strict rubrics (`TRIVIAL_SELF_AUDIT_FRAUD`).
4. **Audit Graph & Markdown Vault Interoperability (`AUDIT_GRAPH_OBSIDIAN_INTEROP`)**:
   - Both Audit Graph and memory vault persist as clean, Obsidian-compatible Markdown for seamless human auditability.
5. **Universal Pure Engineering Abstraction (`UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD`)**:
   - 100% specified using formal statecharts, DAG topologies, and process exit codes, with zero business scenario keywords.

### 28. Mandatory Audit System Escalation Proposal & Human Confirmation Gate Engine

To eliminate superficial problem resolution, enforce project audit baseline continuous immunization, and preserve human sovereignty over canonical verification topologies:

1. **Mandatory Audit Escalation Abstraction (`MANDATORY_AUDIT_ESCALATION_ABSTRACTION`)**:
   - Every agent (orchestrator, dispatched subagent, session successor), upon diagnosing, resolving, or implementing any fix or feature, MUST NOT terminate merely at functional code.
   - The agent must perform reverse audit causality analysis ("Why did the canonical audit system fail to block or immediately expose this failure mode earlier in the lifecycle?"), abstracting root causes into a structured audit system escalation proposal (`AUDIT_ESCALATION_PROPOSAL_CONTRACT`).
   - Delivery without an audit escalation proposal is physically blocked by `NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED`.
2. **Audit Escalation Proposal Statutory Contract (`AUDIT_ESCALATION_PROPOSAL_CONTRACT`)**:
   - The escalation proposal must strictly and exclusively contain four engineering elements:
     ① **Failure Mode Specification**: Precise formal definition of the violated invariant, reproduction conditions, and blast radius;
     ② **Proposed Audit Graph Invariants**: Concrete new DAG nodes (`Specification`, `Invariant`, `SourceAnchor`, `Evidence`) and causal edges (`governs`, `anchors_to`, `verified_by`) for the project canonical Audit Graph;
     ③ **Proposed Machine Lever**: Concrete static analysis check, AST visitor rule, linter configuration, or mutation test suite providing hard blocking capability (`Exit 1`);
     ④ **Measured Verification Evidence**: Empirical proof demonstrating detection and non-zero exit code (`Exit 1`) on the offending pattern, and clean zero exit code (`Exit 0`) on compliant implementations.
3. **Human Audit Confirmation Gate (`HUMAN_AUDIT_CONFIRMATION_GATE`)**:
   - The escalation proposal MUST be presented explicitly to the human user for review, scrutiny, and authorization.
   - Directly mutating the project canonical audit system, baseline specs, or Audit Graph without explicit human confirmation is strictly blocked with `UNAUTHORIZED_AUDIT_MUTATION_BLOCKED`.
4. **Audit Proposal Lifecycle & Monotonic Versioning (`AUDIT_PROPOSAL_LIFECYCLE_VERSIONING`)**:
   - Approved audit proposals are committed into the project's canonical audit baseline (`.orbitstack/audit/` or `audit-graph.json`) with monotonic version increments, establishing permanent immunizations across all future agent swarms.
5. **Universal Pure Engineering Abstraction (`UNIVERSAL_AUDIT_ESCALATION_STANDARD`)**:
   - The engine operates strictly on pure software engineering primitives (AST, DAG, lint, mutation tests, exit codes) with zero scenario-specific keywords.

### 29. Production-Driven Proactive System Evolution & Anti-Scenario-Myopia Engine

To eliminate scenario myopia, transform continuous production and troubleshooting friction into architectural evolutionary fuel, and proactively supply the human architect with durable project system improvements:

1. **Anti-Scenario Myopia & Meta-Filter (`ANTI_SCENARIO_MYOPIA_AXIOM` & `SCENARIO_MYOPIA_BLOCKED`)**:
   - Every agent across the swarm must apply a meta-abstraction filter to all business tasks and defects, stripping away scenario-specific vocabulary and local sample quirks.
   - Problems must be elevated to computer science primitives: dataflow topology, state machine legitimacy, algebraic invariants, and boundary parsing contracts.
   - Masking defects with ad-hoc business conditionals or local fallback data triggers immediate `SCENARIO_MYOPIA_BLOCKED` failure.
2. **Production Friction as Evolutionary Fuel & Dual-Tier Evolution Rhythm (`PRODUCTION_FRICTION_AS_EVOLUTION_FUEL` & `DUAL_TIER_EVOLUTION_RHYTHM`)**:
   - Every build failure, compiler error, and retry trace (`[Incident: Friction/Bug]`) is preserved as a live stress-test witness of the underlying system architecture.
   - Dual-Tier Rhythm:
     ① **Tier 1 (Micro-Reflection per Delivery)**: Every task signoff mandates a structured *Micro System Architecture Insight* in the delivery dossier; omission triggers `NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED`.
     ② **Tier 2 (Major Evolution RFC on Recurrence)**: When identical architectural deficits recur $\ge 2$ times across tasks, the system automatically escalates to a formal *Major System Evolution RFC*.
3. **Two-Levels-Up Reverse Interrogation (`TWO_LEVELS_UP_SYSTEMIC_INTERROGATION` & `PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT`)**:
   - Agents must simultaneously execute three levels of causal analysis:
     - Level 0 (Surface): Safe minimal-causal-set functional fix without polluting generic engines;
     - Level 1 (Mechanism): Component-level parametric abstraction and orthogonal decoupling;
     - Level 2 (Architecture): Root-cause systemic interrogation of the project architecture and governance framework.
   - The proactive recommendation contract requires: ① Systemic Deficit Abstraction, ② Universal Architectural Blueprint, ③ Blast Radius & Trade-offs, and ④ Human Decision Gate Interface.
4. **Audit Graph System Evolution Node & Cross-Agent Inheritance (`AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE` & `CROSS_AGENT_EVOLUTION_INHERITANCE`)**:
   - All system evolution proposals are committed as first-class `SystemEvolutionProposal` DAG nodes in the canonical Audit Graph (Axiom 38).
   - Governed by state machine: `PROPOSED_PENDING_HUMAN` ──[human approval]──> `HUMAN_APPROVED` / `HUMAN_REJECTED` ──> `EVOLVED_INTO_SPEC_OR_ENGINE`.
   - New agents inherit all unmerged evolution proposals during Step 1 cold-start perception, eliminating cognitive drift across sessions.
5. **Human Sovereignty Gate & Universal Engineering Abstraction (`HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE` & `UNIVERSAL_SYSTEM_EVOLUTION_STANDARD`)**:
   - System evolution advice serves strictly as a proposal for the human architect. Autonomous large-scale core mutations without explicit human approval trigger `UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED`.
   - 100% formulated in formal statecharts, DAG topologies, RFC 2119 specs, and standard process exit codes, with zero business scenario keywords.


### 30. Subagent Full-Lifecycle Job Ticket & Diagnostic Completeness Engine

To eliminate shallow overview dispatch and lazy rebuke across multi-agent swarms, enforce physical self-containment for task dispatch, and ensure full diagnostic closures for rework:

1. **Anti-Shallow Dispatch & Mandatory Job Ticket Completeness (`ANTI_SHALLOW_DISPATCH_AXIOM` & `MANDATORY_JOB_TICKET_COMPLETENESS`)**:
   - Orchestrator agents are strictly forbidden from dispatching vague summaries or abstract overviews to subagents (`SHALLOW_OVERVIEW_DISPATCH_BLOCKED`).
   - Every initial dispatch ticket must be self-contained and provide 6 mandatory elements:
     ① `[Header & Unique Ticket ID]` (metadata, model tier, workspace isolation mode);
     ② `[Atomic Mission Directive]` (single atomic objective);
     ③ `[Verbatim 1:1 RTM Specifications & Contract]` (uncompressed RFC 2119 clauses);
     ④ `[Explicit Target Files & Exact Line Anchor Ranges]` (`file:///path#Lxx-Lyy` coordinates);
     ⑤ `[Exclusion Bounds & Non-Goals]` (blast radius whitelist and preserved invariants);
     ⑥ `[Deterministic Exit Code 0 Verification Command]` (executable CLI command asserting exit code 0).
2. **Rework Diagnostic Closure Protocol (`REWORK_DIAGNOSTIC_CLOSURE_AXIOM` & `LAZY_REBUKE_DISPATCH_BLOCKED`)**:
   - Vague admonitions ("fix this bug", "logic is wrong") are strictly banned as lazy rebuke (`LAZY_REBUKE_DISPATCH_BLOCKED`).
   - All rework, bug-fixing, and triage directives must provide 6-dimensional physical diagnostic materials:
     ① `[Raw Uncut Stderr Stack Trace & Exit Code]` (full stderr/stdout logs + non-zero exit code);
     ② `[Deterministic One-Click CLI Reproduction Command]` (zero-dependency standalone repro command);
     ③ `[Bipolar Expected vs Observed Delta Table]` (quantified gap between expected vs actual);
     ④ `[Target Code Slice & Coordinate Anchors]` (offending code snippet with line numbers);
     ⑤ `[Causal Hypothesis Tree & Known Invariants]` (orchestrator hypothesis + inviolable constraints);
     ⑥ `[Spatial Blast Radius Whitelist]` (bounded file/function modification scope).
3. **Four Lifecycle Ticket Archetypes (`FOUR_LIFECYCLE_TICKET_ARCHETYPES` & `JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED`)**:
   - Subagent tasks are classified into 4 strict archetypes:
     ① `PROBE_EXPLORE_TICKET`: strictly readonly, zero code modification, Mermaid topology output;
     ② `CONSTRUCTION_TICKET`: bound to `[-]` single-focus lock, targeted line ranges, exit code 0;
     ③ `INCIDENT_TRIAGE_TICKET`: mandatory 6-dimensional diagnostic closure, minimal causal root-cause analysis;
     ④ `VERIFICATION_REJECTION_TICKET`: VS Code diff delta alignment and exact failed assertion coordinates.
   - Violating archetype boundaries triggers `JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED`.
4. **Subagent Pushback Right & Empirical Falsification (`SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL`, `TASK_DISPATCH_REJECTED` & `SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT`)**:
   - Subagents possess the statutory right and duty to reject tickets missing the 6 ticket elements or 6 diagnostic items via `TASK_DISPATCH_REJECTED: <Missing Elements>`.
   - Subagents have statutory empirical falsification rights to disprove orchestrator hypotheses via exit code 0/1 empirical runs and physical logs without being overruled.
5. **Universal Engineering Abstraction (`UNIVERSAL_DISPATCH_STANDARD`)**:
   - Operates 100% on universal computer science primitives (process pipes, exit codes, stderr/stdout, code slices, AST, RFC 2119) with zero scenario-specific keywords.

## Installation and layout for Gemini

When installed via `scripts/install-to-harness.ps1 -SkillLocation gemini`:
- Upstream PStack mirror is deployed to `.orbitstack/pstack-upstream/`.
- Route registry and helper scripts deployed to `.orbitstack/`.
- Gemini adapter installed to `.gemini/skills/orbitstack-pstack-openspec/SKILL.md`.
- Target project `GEMINI.md` or `AGENTS.md` receives an adapter pointer without modifying existing user rules.
