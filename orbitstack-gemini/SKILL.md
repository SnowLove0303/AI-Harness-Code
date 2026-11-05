---
name: orbitstack-pstack-openspec
description: PStack-first Google Gemini and Antigravity adapter. Routes tasks through the pinned upstream poteto-mode, leverages native subagents and artifacts, dynamic model tiering (flash_lite/flash/pro), and uses OpenSpec as the only durable task record.
---

# PStack-first Gemini / Antigravity adapter

This adapter connects Google Gemini and Antigravity to the pinned upstream PStack source and OpenSpec. It does not replace PStack playbooks or add a competing task workflow.

## Task routing

1. Route every Gemini task through the full upstream `skills/poteto-mode/SKILL.md`. Restate the goal as PStack requires, select the matching playbook, and read it and each leaf skill or principle it triggers.
2. Copy the selected playbook steps verbatim into the active OpenSpec `tasks.md` before task-specific items. Use `figure-it-out` for a large cross-cutting run and `orchestrate` only for a standing program that exceeds one session's task scope.
3. PStack controls task execution. Proceed autonomously on reversible work within the user's request. Ask only for a genuine product decision, missing user authority, an explicit user-named gate, or an irreversible action. Direct user instructions and safety boundaries remain authoritative.
4. If Gemini lacks a specific PStack feature (e.g. Cursor-only automation), use the closest native Gemini equivalent or mark that step unavailable. Continue independent work and report the limitation.

## Spec-Kit zero-loss ingestion & dual-gate workflow (Subordinate to Ps-openspec)

Ps-openspec (OrbitStack) is the supreme governance framework. Spec-Kit operates as a subordinate requirement-ingestion protocol at Step 0, capturing user requirements without loss before handing off to Ps-openspec lifecycle:

1. Phase 1 (Spec-Kit Zero-Loss Ingestion & Gate 1):
   - Capture user raw input verbatim without over-summarization or scope decay.
   - Construct a 1:1 Requirement Traceability Matrix (RTM): map every user point (1, 2, 3, 4) to an atomic `REQ-01`, `REQ-02`... preserving Count Parity (N_raw == N_matrix).
   - Expand each requirement with Spec-Kit's triad: Scenario/Scope, detailed functional assertion, and verifiable Acceptance Criteria.
   - Gate 1 (Requirement Confirmation): Present the comprehensive, uncompressed requirement dossier to the user. Purely confirm "What" and Acceptance Criteria. Strictly forbidden from discussing implementation code, file changes, or premature solutions. Do not proceed to OpenSpec drafting until the user gives explicit confirmation.
2. Phase 2 (Ps-openspec OpenSpec Authoring & Gate 2):
   - Gate 2 Purpose: Formally write, author, and present the OpenSpec change artifacts under Ps-openspec.
   - Upon Gate 1 confirmation, inject the 1:1 RTM into `proposal.md` and generate RFC 2119 specs for each requirement.
   - Decompose into atomic tasks in `tasks.md`, each bound to a specific verification command. Enforce Roo-Code/Cline single-focus execution (`[-]` lock: exactly one active in-progress task at a time). Releasing the lock requires both behavioral test passes and strict compiler/lint zero-warning passes (`--max-warnings=0` with exit code 0). Anti-suppression is absolute: no `@ts-ignore`, `eslint-disable`, or `any` casts are permitted without explicit user signoff.
   - Gate 2 (OpenSpec Specification & Dual-Checklist): Present the formal OpenSpec specification dossier, architecture topology, and Dual-Checklist (Proposed Scope with causal self-proof + Preserved Commitments). Strictly forbidden from modifying business code before explicit user authorization. Await user explicit authorization ("execute / approve") before moving to implementation.
3. Phase 3 (Bidirectional Delivery Checkoff):
   - In the final report, verify each original requirement (REQ-01...N) against measured command evidence with exit code 0.

## Strict Lint and compiler hard blocker (Layer 2)

1. Static analysis and compiler verification possess unconditional one-vote veto authority (Hard Blocker).
2. Zero Warnings, Zero Errors: any lint warning is treated as a build failure (`--max-warnings=0`).
3. Anti-Suppression Invariant: agents must never inject `// @ts-ignore`, `// @ts-nocheck`, `/* eslint-disable */`, or `as any` type escapes to bypass checks.
4. Two-strike escalation: any defect corrected twice by human review must be converted into an AST/ESLint rule with actionable fix guidance.
5. Zero-trust subagent verification: capsules dispatched across threads mandate build and lint exit code 0 verification before merging.

## Advanced defensive matrix (Verifier isolation, env-witness, ground-truth anchoring)

1. Verifier Isolation & Anti-Patching (Axiom 17):
   - Decouple verification definitions from the agent's writable scope.
   - Forbid ad-hoc input-case overfitting (e.g. `if (raw_input === 'XYZ') return special_val`).
   - Structural transformations and business logic must generalize across unseen inputs.
2. Explicit Missing States & Anti-Fabrication (Axiom 18):
   - Distinguish Missing / Unknown / Untested from False / Not Applicable.
   - Require explicit algebraic optional/enum types (`Option<T>`, `Result<T, E>`) for unobserved fields.
   - Strictly prohibit defensive fabrication (e.g., `val || '未检出'`, `val || default_value`) and hallucinatory defaults.
3. Env-Authored Witness & Auto-Rollback (Axiom 19):
   - Reject unverified agent self-attestation.
   - Acceptance must be witnessed by external system processes: untamperable CLI exit code 0, zero compiler warnings (`--max-warnings=0`), and test suites.
   - If a step introduces compilation or lint regression, mandate immediate atomic rollback (git reset / discard patch) before trying an alternative fix.
4. Ground-Truth Anchoring & 100% Fact Provenance (Axiom 20):
   - Freeze input cryptographic digests and fact fingerprints at Step 0.
   - Enforce 100% provenance: every synthesized or formatted fact in deliverables must trace directly to ground truth without procrustean truncation or intent evaporation.
   - Final checkoff requires 1:1 bidirectional reconciliation against the frozen fact fingerprint.

## Execution methodology skills & Graph-driven governance

1. Action Skill Layer for Methodologies:
   - Domain execution methodologies—including Workflow Development (ACI/MCP tool building, SOP state machines, trace crystallization to reusable skills), UI/UX Design (Experience First, pixel-exact visual parity), and Engineering Practices (TDD, Statechart, unslop)—are anchored as modular skills at the Action Skill Layer (`skills/<methodology>/SKILL.md`).
2. Graph-Driven Association & Rapid Discovery:
   - The Code Review Graph, Route Map, and Invariant DAG connect task types, target components, and domain keywords directly to the matching execution methodology skill.
   - At Step 1 (Anchor) and Step 2 (Propose), Gemini queries the Graph to rapidly bind the required methodology skill without manual wandering.
3. Graph Safety & Blast Radius Guardrails:
   - The Graph bounds each methodology skill's writable scope to prevent collateral changes.
   - Quality gates defined by the methodology (e.g. zero visual diff, `--max-warnings=0`, passing test suite with exit code 0) are enforced as prerequisites before releasing the single-focus task lock (`[-] lock`).

## Two-step dual-scope deep audit enforcement (High-enforceability verification matrix)

1. Step 1: Mechanical Deterministic Audit (Base Machine Admission Gate):
   - Verifier Isolation & Anti-Tampering: Test suites (`tests/**`, `specs/**`, and golden specimens) are strictly excluded from writable paths; unauthorized edits trigger `VERIFIER_TAMPERING_DETECTED` rollback.
   - Mutation Sanity & Anti-Trivial Assertions: Automated probes inject known adversarial mutations before running test suites. Passing under mutation triggers `TRIVIAL_ASSERTION_FRAUD`, locking the task.
   - Mandatory Negative Test Ratio: Compiler and linters run under `--max-warnings=0`. Mandatory negative/boundary test ratio $\ge 30\%$ asserting expected domain errors.
   - Role: Mechanical green is Key 1 (necessary prerequisite). Execution cannot proceed to Step 2 without exit code 0.
2. Step 2: Agent Cognitive & Specification Audit (Semantic Falsification Gate):
   - Adversarial Red-Team Interrogation (Fresh Auditor Subagent): Self-review by builder agents is prohibited. A fresh subagent (`Model='pro'`, `Workspace='branch'`) running Poteto's `/interrogate` playbook executes adversarial audits.
   - 100% Fact Provenance Checkoff & Code Pointer Anchoring: Every specification clause must be backed by exact source file paths, line ranges (`file:///path#Lxx-Lyy`), and `[Measured]` logs.
   - Active Adversarial Falsification: The auditor must record boundary falsification attacks, proving the codebase deterministically resists attacks.
3. Dual-Scope Specification Governance:
   - Global Specs: Cross-cutting invariants, system-wide constitutions, architecture承重墙, and immutable locks (`@ANTIGRAVITY_INVARIANT_LOCK`).
   - Local Specs: Module-specific behavioral contracts (RFC 2119 SHALL/WHEN/THEN), domain boundaries, and state transition topologies.
   - 1:1 Itemized Reconciliation ($N_{\text{Global}} + M_{\text{Local}}$): Zero omission permitted. Missing any spec clause triggers `SPEC_OMISSION_DETECTED`.
4. Human Tactile Gate via VS Code:
   - Mechanical pass (Key 1) + Cognitive specification pass (Key 2) are mandatory prerequisites before pulling up the VS Code native diff viewer (`review_diff_in_vscode`) for human tactile signoff.

## Agent-execution-first meta-problem framing (Ps-openspec resolution)

1. Abstract Beyond Isolated Cases:
   - When encountering failures, regressions, or user challenges, strictly avoid reducing analysis to isolated business instances or specific product payloads.
   - Immediately elevate the issue to systemic Agent execution failure modes: greedy local overfitting, dead-code control-flow shadowing, self-verification conflicts leading to trivial assertions, and macro-statistical evading of microscopic facts.
2. Direct Resolution via Ps-openspec Governance:
   - Solve every failure mode exclusively through Ps-openspec architectural mechanisms:
     - Fact Fingerprinting and 1:1 RTM ingestion at Step 0 to stop payload substitution.
     - L1 architectural invariants and AST linters at Step 1-2 to prevent hardcoded constants.
     - Validation plane isolation and single-focus locks at Step 3 to separate judges from workers.
     - Mutation sanity and adversarial red-team interrogation at Step 4 to defeat trivial exit-0 assertions.
     - 1:1 physical reconciliation and human tactile double-key signoff at Step 5.

## Execution friction journaling & defense escalation retro

1. In-Execution Friction Journaling (Step 3):
   - Whenever execution encounters test failures, compilation errors, brittle dependencies, or tool exceptions requiring retries, the agent must record an `[Incident: Friction/Bug]` entry in local task memory or `tasks.md`.
   - Silent swallowing of friction is strictly barred: all diagnostic attempts, root causes, and temporary patches must be preserved.
2. Mandatory Post-Task Retro Dossier (Step 5 Delivery):
   - Delivery reports must be triad: 1:1 Requirement Checkoff + Execution Friction Journal + Long-Term Defense Escalation Proposal.
   - For every recorded incident, the agent must propose a durable escalation following the Trust Pyramid:
     - L1: Type-level state machine constraints making invalid states unrepresentable.
     - L2: Static AST/Lint rules with auto-fix guidance blocking reintroduction.
     - L3: Closed-scope constitutional constraints in `AGENTS.md`.
     - L4: Automated mutation test vectors asserting domain rejection.
   - Propose explicit actionable hardening steps that the user can authorize for immediate in-situ hardening.

## State legitimacy & anti-symptom-masking (Root-cause causal back-tracing)

1. State Legitimacy Dichotomy:
   - When a defect, runtime error, or invalid payload surfaces at a Consumer Sink, the agent must trace dataflow backward from sink to Origin Producer before generating patches.
   - If the state is legitimate within domain semantics but unhandled: the Consumer Sink lacks handling; patch the sink.
   - If the state is illegitimate (violates schema, missing mandatory invariant, corrupted structure): the Consumer Sink must NOT mask it. Patching the sink via fallback defaults, swallowed errors, or scattered guards is strictly forbidden (Symptom Masking / 脚痛医脚). The agent must backtrace to the Origin Producer and eliminate the illegal state generation at the source.
2. Five Forbidden Masking Anti-Patterns:
   - Scattered Guards (`if (!x) return`), Swallowed Errors (`catch (e) {}`), Clamped / Coerced Values (`val || default_value` or `Math.max/min`), Discarded State (silent filtering of unparseable items), and Shotgun Validation (redundant inner checks violating boundary guarantees).
3. Boundary Parsing (*Parse, don't validate*):
   - Untrusted inputs must be parsed and structured into strict domain types at the ingestion boundary. Internal functions operate on guaranteed valid models without defensive boilerplate.
4. Fail-Fast & Non-Masking:
   - Invariant violations must fail fast near the source with explicit domain errors.
5. Gate 2 Causal Role Self-Proof (`SINK_PATCHING_BLOCKED`):
   - Proposed changes in Gate 2 must classify modified units as `[Root Source]`, `[State Transition]`, or `[Consumer Sink]`. Proposing patches that only modify `[Consumer Sink]` without touching or proving `[Root Source]` triggers immediate `SINK_PATCHING_BLOCKED` rejection.

## Generic asset anti-tampering & mechanism-policy separation

1. Mechanism vs. Policy Physical Separation:
   - Generic utilities, engines, and tool pipelines provide domain-neutral mechanisms (transforms, calculations, execution primitives).
   - Task-specific logic, idiosyncratic data formats, and business parameters represent policy. Policy belongs strictly in the caller/adapter layer and must never infiltrate generic assets.
2. Caller-Side Adaptation First:
   - When friction or failures occur due to task-specific input nuances or non-standard payloads, the generic program remains read-only under `@ANTIGRAVITY_INVARIANT_LOCK`.
   - The agent must implement adapters, pre-parsers, or transformers at the caller boundary rather than modifying the core generic tool.
3. Four Laws of General Evolution:
   - When core generic capabilities must be extended, changes must obey:
     - Zero task-specific identifiers or single-task branch conditions.
     - Parametric abstraction (generic configuration, options, or strategy injection).
     - Strict backward compatibility (zero regression for historical callers).
     - Generalized verification (parameterized test matrices + mutation sanity).
4. Gate 2 Generality Self-Proof (`TASK_SPECIFIC_POLLUTION_BLOCKED`):
   - Proposed changes touching generic assets must supply an explicit generality proof. Introducing task-specific hardcoded branches triggers immediate `TASK_SPECIFIC_POLLUTION_BLOCKED` rejection.
5. Invariant Contract Non-Weakening:
   - Agents are forbidden from loosening validation thresholds, widening tolerances, or commenting out guard assertions in generic programs to force single-task passes.

## Mandatory user-specification ingestion & active post-task agent audit

1. Full-Text User Standards Ingestion:
   - When the user provides explicit correct practices, formal specifications, reference exemplars, or audit schemes, every agent (main or subagent) must read them 100% in full before designing or coding.
   - Relying on generic LLM pre-training assumptions or skimming/truncating user-provided rules is strictly prohibited.
2. Two-Step Audit with Active Bug Hunting:
   - Mechanical verification (compilers, linters, tests, exit code 0) serves as Step 1 (machine baseline).
   - Upon completing mechanical passes, the agent must execute Step 2 (Agent Cognitive Audit): actively hunting for hidden defects, unhandled edge cases, negative space regressions, and state machine deadlocks.
   - Passive confirmation bias ("looks good to me") is strictly barred; findings survive through active adversarial falsification.
3. Universal Cross-Agent Propagation:
   - Dispatched subagents and handoff capsules inherit user-provided rules and must return explicit proof of post-task active cognitive auditing before task signoff.

## Mutation anti-fraud & negative proof deep audit gate

1. Mutation Sanity Gate (`TRIVIAL_ASSERTION_FRAUD`):
   - All test suites and automated verifiers must demonstrate mutation kill power. Deliberate fault injections (inverting conditions, skipping core validations, mutating return payloads) must cause tests to fail.
   - Passing tests under mutation triggers `TRIVIAL_ASSERTION_FRAUD`, immediately locking task execution.
2. Negative Proof Gate & Mandatory Adversarial Quota:
   - For all non-trivial tasks, an audit report reporting "0 issues / perfectly clean" without evidence of active stress testing is rejected as a superficial pseudo-audit.
   - The auditor agent must provide at least 1-2 active counter-factual falsification attempts with reproduction commands, proving the system deterministically rejected or survived invalid inputs.
3. Fresh Pro Auditor Enforcement & Architectural Lock:
   - Builder agents are fundamentally barred from marking tasks `[x]` or issuing release signoffs.
   - A fresh, independent auditor subagent (`Model='pro'`, `Workspace='branch'`) running the `/interrogate` playbook acts as the sole adversary.
4. Two-Strike Machine Escalation:
   - Recurring human-identified defects cannot remain as natural language advice in prompts. Any issue corrected twice by a human must be converted into a machine-enforced AST/Lint rule or deterministic test with a non-zero exit code.

## Autonomous subagent swarm & four-in-one handoff gate

1. Auto-Dispatch by Default & Coordinator Bar:
   - The coordinator (Main Agent) receiving user instructions acts strictly as architect and supreme auditor; the coordinator is fundamentally barred from directly modifying or writing business code.
   - All concrete construction and execution tasks must be automatically dispatched to an Executor Subagent.
2. Subagent Reuse vs. Fresh Decision Tree (`manage_subagents`):
   - Prior to dispatch, the coordinator must call `manage_subagents(Action='list')` to inspect active subagents.
   - Reuse via `send_message`: Permitted strictly when subsequent work continues the same unbroken task breakpoint, or when the subagent holds non-persisted, expensive-to-migrate transient state (e.g., active Git branch, running test daemon/watcher/server).
   - Fresh by default via `invoke_subagent`: New scopes, refactoring tasks, triage pivots, or retries after failure must launch fresh subagents (`Workspace='branch'`) to prevent interrupt-chain prompt pollution.
3. Four-in-One Lossless Handoff Capsule:
   - Task handoff cannot be casually summarized; it must package four indivisible elements:
     ① `ps-openspec`: Architectural contract (proposal, RFC 2119 specs, atomic `tasks.md` item, non-zero exit acceptance commands).
     ② `skill`: Explicit methodological and operational skills (e.g. `pstack-openspec`, `unslop`, `tdd`).
     ③ `Context`: Writable scope boundaries, read-only paths, invariant locks (`@ANTIGRAVITY_INVARIANT_LOCK`), base commit, and frozen fact fingerprints.
     ④ `Prompt`: Focused single-responsibility directive with explicit Non-Goals.
4. Active Completion Report & Reactive Wakeup:
   - Upon completion, the executor subagent must deliver a structured report with `[Measured]` exit code 0 log evidence, mutation kill records, and changed file paths.
   - The system reactively wakes up the coordinator without polling; the coordinator initiates deep two-step cognitive audit.
5. Verifier-Only Merge Authority & Workspace Sandboxing:
   - Executor subagents run in isolated branch workspaces (`Workspace='branch'`) and are physically prevented from mutating the main tree or self-merging.
   - Final code merge and status signoff authority belongs exclusively to the coordinator/auditor after 100% audit verification.

## Universal engineering anti-phantom & structural fidelity gate (The 6 Invariants)

1. Zero-Unverified-Effect & `SILENT_NO_OP_FRAUD`:
   - Functions and transformation primitives are barred from silent exits (e.g., `if (!x) return;`).
   - Any invocation with unmet preconditions or contract violations must fail fast by throwing fatal exceptions.
   - Any state-mutating primitive must provide a differential unit test witness proving red light before and green light after execution.
2. Clean Construction & Zero-Boundary-Leakage:
   - Dynamic collection appends must instantiate clean nodes via canonical constructors.
   - Deep-cloning existing populated nodes is prohibited to prevent terminal delimiters, boundary flags, and local caches from contaminating peer items.
3. Single-Pipeline Invariance & Zero-Variance Assembly:
   - Peer elements in a homogeneous collection must be generated exclusively by a single canonical normalizer pipeline.
   - Dual-track assembly (mixing residual template state with fresh generation) is prohibited; micro-layout attributes must maintain zero variance across peers.
4. Source Topology Invariance & Anti-Speculative-Synthesis:
   - Output topology must strictly preserve the physical topology of the source specification ($T_{\text{out}} \subseteq \Phi(T_{\text{in}})$).
   - Agents must never speculatively invent wrapper tiers, synthetic preamble rows, or unrequested structural nodes based on LLM semantic associations.
5. Mandatory Slot Completeness & `EMPTY_MANDATORY_SLOT_BLOCKED`:
   - Extraction and generation schemas must define mandatory terminal slots.
   - Any mandatory slot resolving to null, undefined, or empty whitespace triggers `EMPTY_MANDATORY_SLOT_BLOCKED` fatal halt; attributes must not drift into adjacent slots.
6. Terminal Leaf-Node Deterministic Audit:
   - Verification suites and auditor subagents must assert on deepest physical leaf-node attributes and discrete values.
   - High-level exit code 0, regex presence, or macro-statistical word-count metrics are strictly insufficient for signoff.

## Autonomous spec & audit gate co-evolution gate

1. Anti-Patch-and-Forget Invariant:
   - When resolving defects under human guidance or feedback, patching business code alone is prohibited as an incomplete fix.
   - Tasks cannot be signed off until project specifications, audit guidance, and deterministic gates are proactively updated.
2. Fuzzy Probing of Project Guidance:
   - The agent must probe and discover existing specification and audit documents across the project (`specs/`, `docs/`, `guidelines/`, `audit_guide.md`, `qa_rules.md`, or custom guidelines).
   - If missing, the agent initiates and establishes the project's living specification structure.
3. The Trinity Self-Augmentation Procedure:
   - Living Specification: Translate the remediation into explicit RFC 2119 requirement clauses (SHALL / SHALL NOT) to define legal vs. illegal states.
   - Audit Guidance & Checklists: Add the concrete failure mode, counter-example attack vectors, and inspection steps to project audit manuals.
   - Build the Lever (Deterministic Gate): Construct an executable regression test, pre-commit hook, or AST/Lint rule that produces a non-zero exit code upon failure.
4. Permanent Baseline Inheritance:
   - Augmented specifications and gates become permanent baseline assets under version control. Subsequent agent dispatches and review tasks must automatically inherit and enforce these gates.

## Spec supremacy, invariant immunity & constitutional amendment exclusivity gate

1. Spec Supremacy & SPEC_IMMUNITY_PROTECTED:
   - Verification suites, static analyzers, and auditor subagents are executors of specifications and possess zero legislative authority.
   - Code implementing living specifications, protected by `@ANTIGRAVITY_INVARIANT_LOCK`, or backed by baseline acceptance tests activates `SPEC_IMMUNITY_PROTECTED`.
   - Auditors are strictly prohibited from classifying compliant code as defect or error under subjective pretexts ("over-engineering", "redundancy", "slop"). Violations trigger `SPEC_INVERSION_FRAUD` and immediate hard rejection.
2. Beyoncé Pinning & Mutation Tests:
   - Non-standard, historical, or customized correct logic must be anchored with high-fidelity pinning tests (Google Beyoncé Rule: "If you liked it, then you shoulda put a test on it").
   - Pinning tests must possess negative mutation kill capability: tampering code to generic or standard conventions must trigger a hard non-zero exit code (Exit 1). Exit 0 under mutation is rejected as trivial assertion fraud.
3. Chesterton's Fences & Why-Not-Just Labels:
   - Customized defensive logic must be labeled with: ① Living Spec contract ID; ② `[Why-Not-Just]` counter-reflection explaining why standard implementations fail edge cases; ③ `[Origin Commit / PR]` provenance trace.
   - Auditors cannot propose removing or simplifying fences without proving why the fence was erected and how the environment made it obsolete.
4. Monotonic Ratchet & Supersession RFC:
   - Specifications evolve monotonically. Deprecating or adjusting historical specifications requires a formal Supersession RFC with explicit replacement clauses, root-cause evidence, and human Diff signoff. Implicit overrides in routine tasks are blocked.
5. Constitutional Amendment Exclusivity & Anti-Subversive-Trojan Axiom:
   - Constitutional files (`GEMINI.md`, `GLOBAL-RULES.md`, `AGENTS.md`, and top-level governance invariants) are strictly immutable without explicit human instruction.
   - Stealthily embedding constitutional modifications or waivers inside routine task contexts is strictly prohibited (Zero tolerance for Trojan amendments).
   - Constitutional changes must be explicitly initiated by the human user, or submitted as a standalone top-level Constitutional Amendment RFC. Unauthorized modification attempts trigger `CONSTITUTIONAL_TAMPERING_DETECTED` and atomic rollback.

## Universal program purity, anti-scenario-pollution & cross-scenario invariance gate

1. Three-Tier Physical Isolation Architecture:
   - Universal Mechanism Engine: Pure mathematical/geometric transformations, abstract AST rewrites, and stateless statechart operations. Zero scenario-specific vocabulary, zero caller-specific naming, and zero hardcoded exception branches.
   - Anti-Corruption Ingestion Layer: Normalizes, cleanses, and converts scenario inputs into standard domain structures at the ingestion boundary. Prevents ad-hoc raw inputs from penetrating into core engines.
   - Declarative Policies & Strategy Injection: Scenario variations (e.g. alignment styles, column policies, rule flags) must be injected as pure declarative configurations or strategy plugins. When introducing a new scenario, core engine code changes must strictly be 0.
2. SCENARIO_POLLUTION_BLOCKED:
   - The core pipeline and shared primitives are statically protected against caller leakage. Introducing hardcoded branches matching specific cases (`if (case === 'X')`), specific file names, or magic constants immediately triggers `SCENARIO_POLLUTION_BLOCKED` and hard rejection.
3. SINK_POLLUTION_BLOCKED:
   - Masking upstream defects inside consumer sinks or downstream formatting nodes with defensive branches is strictly barred. Faulty states must be back-traced to the root producer or normalized at the anti-corruption boundary. Violations trigger `SINK_POLLUTION_BLOCKED`.
4. Cross-Scenario Orthogonal Regression Matrix:
   - Modifications to universal primitives require validation across an orthogonal matrix of at least 2 to 3 distinct scenario fixtures (e.g. minimal, oversized, deeply nested).
5. Zero-Variance Invariance Across Scenarios:
   - Universal enhancements for one scenario must yield zero unintended behavioral or layout variance on all other scenarios ($\text{Var}_{\text{cross}} \equiv 0$). Any cross-scenario drift blocks signoff.

## Pure universal engineering abstraction & anti-scenario-anchoring gate

1. Absolute Anti-Scenario-Anchoring Mandatory Standard:
   - All system rules, architectural designs, and review gates must be 100% formulated in pure computer science, software engineering, and statechart abstraction.
   - Agents must never anchor onto task-specific business domains, ad-hoc file types, or proprietary formats. Introducing scenario-specific heuristics into universal governance triggers `SCENARIO_ANCHORING_POLLUTION`.
2. Clean-Slate Zero-State Invariant:
   - Any state container, buffer, or execution context entering a processing pipeline must be deterministically proven to be reset to initial zero state. Processing uncleaned containers triggers `UNCLEANED_CONTAINER_POLLUTION`.
3. Anti-Coarse-Grained-Exemption:
   - Protection and exemptions must follow the principle of least privilege. Bypassing validation or cleaning across entire containers, modules, or sections to protect sub-elements is strictly prohibited (`BROAD_SCOPE_EXEMPTION_BLOCKED`). Exemptions must strictly target discrete leaf identifiers.
4. Closed Bipolar Invariant Assertion:
   - Unilateral positive assertions are rejected as asymmetric bias (`ASYMMETRIC_POSITIVE_BIAS`). Verifications must establish a bipolar closure: positive assertion of required ground truth + negative exclusion of unauthorized residuals and dirty states.
5. Zero-Synthetic-Fallback:
   - Data absence must remain an explicit empty state (`Option::None`, `null`, `Empty`) or fail fast. Synthesizing plausible-sounding fallback prose or hardcoding domain assumptions inside generic pipelines triggers `PHANTOM_DEFAULT_FRAUD`.
6. Container Compactness & Homomorphic Invariance:
   - Containers must undergo active compaction/pruning to remove unallocated slots. Projections of identical source data across multiple targets must have zero structural topological variance ($\text{Var}_{\text{topology}} \equiv 0$).
7. Popperian Adversarial Verification:
   - The verifier must be physically separated from the implementer, with the sole objective of falsifying assumptions. Exit code 0 alone cannot authorize completion. Mutating output data must deterministically break test suites; failing to catch mutations triggers `META_AUDIT_FAILURE`.

## Mandatory lint-escalation engine & anti-superficial-apology gate

1. Human-Correction State Machine & Escalation Blocker:
   - Tracks all human correction interactions during task execution (`correction_incident_counter`).
   - If $\text{Counter} \ge 2$, triggers `CORRECTION_INCIDENT_ESCALATION` and injects an unavoidable blocking subtask into `tasks.md`: `[-] Task: 固化机器级 AST/Lint/变异门禁并实测 Exit 1 阻断`.
   - The single-focus task lock (`[-] lock`) physically deadlocks until this machine lint gate is solidified and verified with real non-zero exit codes.
2. Pre-Commit Delivery Interceptor & Anti-Free-Apology Gate:
   - At delivery/signoff, if human corrections occurred ($\text{Counter} \ge 1$), the system inspects the Git staged diff.
   - The staged diff MUST contain newly created or modified lint rules, AST inspection scripts, static analysis configs, or mutation assertions.
   - If the staged diff lacks machine enforcement assets, the system halts with `NO_LINT_DELIVERY_BLOCKED` and atomic rollback.
3. Anti-Superficial-Apology Protocol:
   - Cheap, tokenized conversational apologies ("非常抱歉", "我深刻反省", "下次一定记住") are strictly forbidden. Emitting hollow apologies triggers `SUPERFICIAL_APOLOGY_REJECTED`.
   - Under `ANTI_SUPERFICIAL_APOLOGY_PROTOCOL`, the agent's first response must exclusively deliver three engineering facts:
     ① Failure Mode Specification (precise violation abstraction and pattern characteristics);
     ② Proposed Machine Lever (AST visitor, lint rule, compiler check, or mutation assertion file);
     ③ Falsification Proof (measured execution evidence showing Exit 1 on failing patterns and Exit 0 on compliant code).
4. Permanent Lint Reservoir & Swarm Cold-Start Invariance:
   - Codified lint rules must be committed to permanent project lint reservoirs (`scripts/lint/`, `package.json`, or Git pre-commit hooks) under `PERMANENT_LINT_RESERVOIR`.
   - All newly initialized subagents across the swarm during cold-start environment perception (Step 1) must inherit and run the full reservoir suite, ensuring zero organizational amnesia.
5. Lint Domain-Neutrality Standard:
   - All codified AST / Lint rules and verification scripts must operate strictly on AST syntax node patterns (e.g. CallExpression, ImportDeclaration, ThrowStatement) and language-level state machine constraints (`LINT_DOMAIN_NEUTRALITY_STANDARD`).
   - Hardcoding domain business entity keywords, proprietary codes, or scenario-specific format heuristics inside lint rules triggers immediate `SCENARIO_ANCHORING_LINT_BLOCKED` rejection.

## Generic tooling crystallization & anti-one-off-scripting gate

1. Upstream Poteto Principles Coupling:
   - Deeply couples with Lauren Tan (@poteto)'s `principle-build-the-lever` (build rerunnable tools that do or prove the work) and `principle-encode-lessons-in-structure` (encode lessons into structural tools and checks rather than repeated text).
2. Lifecycle Separation & Tooling Crystallization:
   - Scratch scripts are strictly confined to Phase 1 (Explore) read-only diagnostic probing.
   - When moving to implementation and delivery, the solution must undergo `GENERIC_TOOLING_CRYSTALLIZATION`, elevating disposable scripts into reusable, parameterized tools within `scripts/tools/` or CLI packages.
3. Anti-One-Off-Scripting Blocker:
   - Submitting disposable, single-use scripts that hardcode paths or scenario-specific constants triggers immediate `ONE_OFF_SCRIPT_TRAP_BLOCKED` failure and atomic rollback.
4. The Three Physical Tooling Contracts:
   - ① Parameterized Invariance (`PARAMETERIZED_INVARIANCE`): Zero magic strings or hardcoded paths; inputs must be supplied via CLI flags, configs, or streams;
   - ② Deterministic Machine Lever (`DETERMINISTIC_LEVER_CONTRACT`): Returns standard UNIX exit codes (0 for pass, non-zero for explicit failure) with structured diagnostics; safely rerunnable and idempotent;
   - ③ Self-Testing Sanity: Accompanied by unit tests or mutation checks proving it allows valid inputs and blocks defect patterns.
5. Dual-Purpose Leverage:
   - Crystallized tools must explicitly serve at least one statutory objective under `DUAL_PURPOSE_LEVERAGE`:
     ① Prevention Gate (CI/Pre-commit/Lint gate halting future occurrences with Exit 1);
     ② Acceleration Lever (parameterized CLI reducing future diagnosis and resolution from hours to seconds).

## Project-canonical single audit system & Audit Graph handoff gate

1. Project-Canonical Single Audit Base:
   - Each project under Ps-openspec governance must maintain exactly one canonical audit system baseline registered in its managed audit root (`PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM`).
   - Any attempt to introduce duplicate, ad-hoc, or fragmented audit standards across agents or sessions triggers immediate `DUPLICATE_AUDIT_SYSTEM_BLOCKED` rejection.
2. Audit Graph Topology Engine:
   - The canonical audit system models governance invariants as an explicit directed acyclic graph (Audit Graph DAG) (`AUDIT_GRAPH_TOPOLOGY_ENGINE`).
   - Nodes: `Specification` (RFC 2119 contracts), `Invariant` (`@ANTIGRAVITY_INVARIANT_LOCK`), `SourceAnchor` (code ranges), `Evidence` (measured exit code 0 / mutation kills), and `HumanGuidance` (user directives).
   - Edges: `governs`, `anchors_to`, `verified_by`, and `derived_from_guidance`. Unanchored audit islands are blocked by `UNANCHORED_AUDIT_ISLAND_BLOCKED`.
3. Human-Guidance Continuous Evolution:
   - User reviews, corrections, and instructions serve as the supreme evolutionary driver (`HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION`), ingested as `HumanGuidance` nodes and escalated into L1 state machines, L2 AST/Lint checks, or L3 OpenSpec contracts.
4. Lossless Agent Handoff Truth Baseline:
   - Serves as the sole statutory truth baseline across agents and sessions (`LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE`).
   - Handoff capsules (`pstack-handoff`) bind the relevant Audit Graph slice to eliminate cognitive drift (`AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED`). Task checkoff strictly requires measured exit code 0 evidence.
5. Domain-Neutrality Standard:
   - All Audit Graph entities and rules must strictly adhere to pure computer science and software engineering primitives (`UNIVERSAL_AUDIT_ABSTRACTION_STANDARD`), with zero scenario-specific keywords.

## Cognitive triad evolution & kitchen-brigade scheduling gate

1. Upstream Poteto Innovations Grounding:
   - Deeply couples with Lauren Tan (@poteto)'s latest open-source breakthroughs: `poteto/brainmaxxing` (3-tier learning loop), `poteto/noodle` (kitchen brigade task dispatch), and `poteto/how` (fan-out exploration & critique rubric).
2. Cognitive Triad Evolution Engine (`COGNITIVE_TRIAD_EVOLUTION_ENGINE`):
   - ① `/reflect`: Immediate extraction of failure modes and defense strategies into `brain/` and Audit Graph upon task delivery or correction (`UNREFLECTED_DELIVERY_BLOCKED`).
   - ② `/ruminate`: Periodic crawling across session logs to surface latent user preferences and recurrent traps.
   - ③ `/meditate`: Bidirectional reconciliation between memory notes and living specs, pruning dead rules and escalating repeated corrections to L1 statecharts or L2 Lint rules.
3. Kitchen-Brigade Order Protocol (`KITCHEN_BRIGADE_ORDER_PROTOCOL`):
   - `Mise en place`: Orchestrator agent aggregates system context, invariants, and backlog without editing business code.
   - `Orders-next`: Emits decoupled atomic task orders. Direct business code modifications by orchestrators trigger `ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED`.
   - Line Cooks: Dispatched worker agents execute in isolated workspaces (`Workspace='branch'` or Git Worktree) holding single-focus lock (`[-] lock`).
4. Fan-Out Exploration & Adversarial Critique (`FANOUT_EXPLORATION_CRITIQUE_RUBRIC`):
   - Phase 1 Explore supports 2–4 parallel fan-out subagent probes, synthesized into 5 standard dimensions (`Overview`, `Key Concepts`, `How It Works`, `Where Things Live`, `Gotchas`).
   - Gate 5 delivery mandates adversarial critique under strict rubrics (`TRIVIAL_SELF_AUDIT_FRAUD`).
5. Domain-Neutrality Standard:
   - 100% specified using formal statecharts, DAG topologies, and process exit codes (`UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD`), with zero business scenario keywords.

## Mandatory audit escalation proposal & human confirmation gate

1. Mandatory Audit Escalation Abstraction:
   - Every agent (orchestrator, dispatched subagent swarm, session successor), upon diagnosing, resolving, or implementing any fix or feature, MUST NOT terminate merely at functional code (`MANDATORY_AUDIT_ESCALATION_ABSTRACTION`).
   - The agent must perform reverse audit causality analysis ("Why did the canonical audit system fail to block or immediately expose this failure mode earlier in the lifecycle?"), abstracting root causes into a structured audit system escalation proposal (`AUDIT_ESCALATION_PROPOSAL_CONTRACT`).
   - Delivery without an audit escalation proposal is physically blocked by `NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED`.
2. Audit Escalation Proposal Statutory Contract (`AUDIT_ESCALATION_PROPOSAL_CONTRACT`):
   - The escalation proposal must strictly and exclusively contain four engineering elements:
     ① Failure Mode Specification: Invariant breach pattern, reproduction conditions, and blast radius.
     ② Proposed Audit Graph Invariants: Concrete new DAG nodes (`Specification`, `Invariant`, `SourceAnchor`, `Evidence`) and causal edges (`governs`, `anchors_to`, `verified_by`) for the project canonical Audit Graph.
     ③ Proposed Machine Lever: Concrete static analysis check, AST visitor rule, linter configuration, or mutation test suite providing hard blocking capability (`Exit 1`).
     ④ Measured Verification Evidence: Empirical proof of detection and non-zero exit code (`Exit 1`) on the offending pattern, and clean zero exit code (`Exit 0`) on compliant implementations.
3. Human Audit Confirmation Gate (`HUMAN_AUDIT_CONFIRMATION_GATE`):
   - The escalation proposal MUST be presented explicitly to the human user for review, scrutiny, and authorization.
   - Directly mutating the project canonical audit system, baseline specs, or Audit Graph without explicit human confirmation is strictly blocked with `UNAUTHORIZED_AUDIT_MUTATION_BLOCKED`.
4. Audit Proposal Lifecycle & Monotonic Versioning (`AUDIT_PROPOSAL_LIFECYCLE_VERSIONING`):
   - Approved audit proposals are committed into the project's canonical audit baseline (`.orbitstack/audit/` or `audit-graph.json`) with monotonic version increments, establishing permanent immunizations across all future agent swarms.
5. Domain-Neutrality Standard:
   - The engine operates strictly on pure software engineering primitives (AST, DAG, lint, mutation tests, exit codes) (`UNIVERSAL_AUDIT_ESCALATION_STANDARD`) with zero scenario-specific keywords.

## Production-driven proactive system evolution & anti-scenario myopia gate

1. Anti-Scenario Myopia & Meta-Filter:
   - Every agent across the swarm must apply a meta-abstraction filter to all business tasks and defects, stripping away scenario-specific vocabulary and local sample quirks (`ANTI_SCENARIO_MYOPIA_AXIOM`).
   - Problems must be elevated to computer science primitives: dataflow topology, state machine legitimacy, algebraic invariants, and boundary parsing contracts.
   - Masking defects with ad-hoc business conditionals or local fallback data triggers immediate `SCENARIO_MYOPIA_BLOCKED` failure.
2. Production Friction as Evolutionary Fuel & Dual-Tier Evolution Rhythm:
   - Every build failure, compiler error, and retry trace (`[Incident: Friction/Bug]`) is preserved as a live stress-test witness of the underlying system architecture (`PRODUCTION_FRICTION_AS_EVOLUTION_FUEL`).
   - Dual-Tier Rhythm (`DUAL_TIER_EVOLUTION_RHYTHM`):
     ① Tier 1 (Micro-Reflection per Delivery): Every task signoff mandates a structured *Micro System Architecture Insight* in the delivery dossier; omission triggers `NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED`.
     ② Tier 2 (Major Evolution RFC on Recurrence): When identical architectural deficits recur $\ge 2$ times across tasks, the system automatically escalates to a formal *Major System Evolution RFC*.
3. Two-Levels-Up Reverse Interrogation & Proactive Systemic Improvement Contract:
   - Agents must simultaneously execute three levels of causal analysis (`TWO_LEVELS_UP_SYSTEMIC_INTERROGATION`):
     - Level 0 (Surface): Safe minimal-causal-set functional fix without polluting generic engines;
     - Level 1 (Mechanism): Component-level parametric abstraction and orthogonal decoupling;
     - Level 2 (Architecture): Root-cause systemic interrogation of the project architecture and governance framework.
   - The proactive recommendation contract (`PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT`) requires: ① Systemic Deficit Abstraction, ② Universal Architectural Blueprint, ③ Blast Radius & Trade-offs, and ④ Human Decision Gate Interface.
4. Audit Graph System Evolution Node & Cross-Agent Inheritance:
   - All system evolution proposals are committed as first-class `SystemEvolutionProposal` DAG nodes in the canonical Audit Graph (`AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE`).
   - Governed by state machine: `PROPOSED_PENDING_HUMAN` ──[human approval]──> `HUMAN_APPROVED` / `HUMAN_REJECTED` ──> `EVOLVED_INTO_SPEC_OR_ENGINE`.
   - New agents inherit all unmerged evolution proposals during Step 1 cold-start perception (`CROSS_AGENT_EVOLUTION_INHERITANCE`), eliminating cognitive drift across sessions.
5. Domain-Neutrality Standard:
   - System evolution advice serves strictly as a proposal for the human architect (`HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE`). Autonomous large-scale core mutations without explicit human approval trigger `UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED`.
   - 100% formulated in formal statecharts, DAG topologies, RFC 2119 specs, and standard process exit codes (`UNIVERSAL_SYSTEM_EVOLUTION_STANDARD`), with zero business scenario keywords.

## OpenSpec lifecycle

1. Resolve the target project root, run `openspec context --json` there, and verify the returned path.
2. If the project lacks OpenSpec, run `openspec init --tools gemini` at the verified root. Verify context and `.gemini/skills/openspec-*` files afterward. If the CLI is missing or too old, report its prerequisite and recovery command.
3. Use the installed OpenSpec skills for proposal, exploration, apply, update, sync, and archive. Keep one active change and one `tasks.md`. Reuse the active change when it owns the requested work.
4. Keep all PStack task status and evidence in OpenSpec. Do not create a Blackboard or a second persistent task ledger. Run `openspec validate --all --strict` before archive.

## OpenSpec Explore mode tooling (Phase 1 Thinking)

1. Explore mode is strictly for understanding, trade-off analysis, and architecture exploration. Absolutely no business code edits or file creation during Explore.
2. Resolve working context via `openspec context --json` to identify active changes and living specs.
3. Retrieve machine guidance and schema templates with `openspec instructions <artifact>` (e.g., `proposal`, `specs`, or `tasks`).
4. Persist exploration traces, calling topologies, and Mermaid diagrams into `<appDataDir>\brain\<conversation-id>` artifacts rather than flooding conversation context.
5. Once aligned with the user on design, present the Dual-Checklist and transition to Phase 2 (OpenSpec Propose).

## Dynamic reasoning budget (pstack-models -> Gemini model tiers)

Map PStack reasoning budgets dynamically to Gemini model tiers when invoking subagents or running tasks:
- `flash_lite` (Fast / Low-overhead): Route classification, syntax checking, fast search, linting, and git status parsing.
- `flash` or `inherit` (Balanced / Daily coding): Feature construction, bug fixing, refactoring, prototyping, and test-driven development (TDD) loops.
- `pro` (High-reasoning / Critical analysis): Architecture review (`/architect`), red-team interrogation (`/interrogate`), Arena blind evaluation judging (`/arena`), and deep metric hillclimbing (`/hillclimb`).

## Lossless PStack handoff via native subagents

Use PStack's Fresh Subagents and Consolidated Scope methods backed by Gemini's native agent capabilities:
1. Generate a dispatch capsule from OpenSpec and Git state using `node <helper-path>/pstack-handoff.mjs generate --change <change-id> --task <task-id>`. (In the source repo, `<helper-path>` is `scripts`; in installed projects, it is `.orbitstack/scripts`).
2. Dispatch the subagent via native `invoke_subagent` with `Workspace='branch'` (or `'share'`) and the appropriate `Model` tier. Inject the capsule into the dispatch prompt under the mandatory execution header:
   `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`
3. Reactive Wakeup: Do not poll or query in a loop. The system automatically resumes the parent agent when the background subagent completes or delivers a message.
4. Verify returned work before updating OpenSpec: pipe the returned capsule into `node <helper-path>/pstack-handoff.mjs verify-return --ack-task <task-id> --ack-digest <capsule-digest> --changed-path <path> --root <project-root>`. Check every changed path.
5. Zero-Trust re-verification: The parent agent independently re-runs acceptance checks in the main environment. Only when verified with exit code 0 does the parent mark the task complete in `tasks.md`.

## Context shielding & artifacts

- Subagents must not flood the parent conversation context with raw compiler outputs, build traces, or diff streams.
- Multi-step reports, diff analyses, and architectural diagrams must be preserved as structured Markdown documents in `<appDataDir>\brain\<conversation-id>`.
- The subagent delivers a concise fact capsule (1,000 to 2,000 tokens) pointing to the artifact, keeping parent context clean and preventing context decay.

## Historical-invariant review with Graph

1. Call Code Review Graph `get_minimal_context_tool` first. Rebuild/update when it reports stale or missing data, then run change and affected-flow analysis for the changed symbols and paths. Inspect those results for links to protected invariant IDs in OpenSpec specs.
2. Run each linked regression test or benchmark. Require a new OpenSpec requirement that explicitly supersedes the old invariant when the user asks to change protected behavior. Keep archived history unchanged.
3. Treat Graph as derived code-structure evidence. If its graph is absent, stale, or unavailable, use `git diff`, path and symbol search, and the mapped regression checks. A missing Graph never blocks unrelated PStack work.

## Gemini host mapping

- Read the immutable upstream copy at `C:\Users\Administrator\.gemini\pstack-upstream\skills\` for global tasks, or `.orbitstack/pstack-upstream/skills/` for project installs. Resolve every playbook through the matching route registry.
- Read global rules at `C:\Users\Administrator\.gemini\config\GEMINI.md` or `.gemini/` in workspace. Preserve the target project's existing instructions, architecture facts, build commands, and official domain pipelines.
- Open code changes in VS Code for review. Prioritize the `vscode-review` MCP tool `review_diff_in_vscode`; fallback to `code --reuse-window --diff <base> <proposed>` if MCP is unavailable.

## Route evidence & specification dependencies

- Specification dependencies: `orbitstack-pstack-routing` anchors on `bundle/pstack-upstream/` (SHA-256 pinned) and `docs/pstack-openspec-route-map.json`. The package release depends on `ps-openspec-distribution`.
- Use the repository route registry at `docs/pstack-openspec-route-map.json`; installed projects use `.orbitstack/pstack-openspec-route-map.json`. Run `scripts/audit-pstack-openspec-routing.ps1` in the source repository or `.orbitstack/scripts/audit-pstack-openspec-routing.ps1` in an installed project.
