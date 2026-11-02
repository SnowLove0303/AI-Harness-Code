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
1. Gate 1 (Spec-Kit Zero-Loss Ingestion):
   - Constructs a 1:1 Requirement Traceability Matrix (RTM) from the raw user prompt.
   - Demands Count Parity ($N_{\text{raw}} \equiv N_{\text{matrix}}$).
   - Reports an exhaustive, non-compressed requirement dossier and halts for user confirmation (Gate 1).
2. Gate 2 (Ps-openspec Architectural Expansion):
   - Embeds the RTM into `proposal.md`, maps requirements 1:1 to RFC 2119 specs, and binds tasks in `tasks.md` with explicit verification commands.
   - Enforces Roo-Code single-focus execution (`[-]` lock: exactly one in-progress task at a time).
   - Submits technical architecture and Dual-Checklist (Proposed Scope + Preserved Invariants) and halts for user authorization (Gate 2).
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

### 11. Deep Audit Enforcement & High-Enforceability Verification Engine

To prevent autonomous agents from bypassing audits, fabricating false exit code 0 results, or writing trivial assertions that pass despite broken logic:

1. **Verifier Isolation & Anti-Tampering (Validation Plane vs Construction Plane)**:
   - Test suites, golden baselines, and spec contracts are quarantined in the Validation Plane.
   - Any agent attempting to loosen assertions, delete tests, or modify test definitions directly triggers `VERIFIER_TAMPERING_DETECTED`, immediately halting execution and rolling back uncommitted changes.
2. **Mutation Sanity & Anti-Trivial Assertion Gate**:
   - Grounded in Lauren Tan (@poteto)'s "Prove It Works" axiom: automated mutation probes inject known adversarial mutations into business logic before running test suites.
   - If a test suite passes under deliberate mutation, it is flagged for trivial assertion fraud (`TRIVIAL_ASSERTION_FRAUD`) and task completion is strictly blocked.
3. **Adversarial Red-Team Interrogation Subagent**:
   - Self-review within a contaminated session context is prohibited. Final release requires invoking an independent fresh subagent (`Model='pro'`, `Workspace='branch'`) running Poteto's `/interrogate` playbook.
   - The red-team subagent conducts boundary and crash attacks from a clean context, producing an immutable adversarial audit log.
4. **Mandatory Negative Test Ratio ($\ge 30\%$)**:
   - Test suites must contain at least 30% negative and boundary test cases explicitly asserting that invalid inputs and missing fields raise expected domain errors rather than defaulting to false success.
5. **100% Fact Provenance Checkoff**:
   - Delivery mandates a mechanical reconciliation table matching final deliverables 1:1 against the frozen Step 0 Fact Fingerprint with terminal command strings, exit code 0 logs, and exact line ranges.
6. **Human Tactile Double-Key Gate via VS Code**:
   - Passing automated tests is only Key 1 (necessary). Human inspection and signoff in VS Code native diff viewer (`review_diff_in_vscode`) is mandatory Key 2 (sufficient) before final acceptance.

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

## Installation and layout for Gemini

When installed via `scripts/install-to-harness.ps1 -SkillLocation gemini`:
- Upstream PStack mirror is deployed to `.orbitstack/pstack-upstream/`.
- Route registry and helper scripts deployed to `.orbitstack/`.
- Gemini adapter installed to `.gemini/skills/orbitstack-pstack-openspec/SKILL.md`.
- Target project `GEMINI.md` or `AGENTS.md` receives an adapter pointer without modifying existing user rules.
