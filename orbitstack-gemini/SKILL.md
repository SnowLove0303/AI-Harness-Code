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

1. Phase 1 (Spec-Kit Zero-Loss Ingestion):
   - Capture user raw input verbatim without over-summarization or scope decay.
   - Construct a 1:1 Requirement Traceability Matrix (RTM): map every user point (1, 2, 3, 4) to an atomic `REQ-01`, `REQ-02`... preserving Count Parity (N_raw == N_matrix).
   - Expand each requirement with Spec-Kit's triad: Scenario/Scope, detailed functional assertion, and verifiable Acceptance Criteria.
   - Gate 1 (Detailed Brief): Present the comprehensive, uncompressed requirement dossier to the user. Do not proceed to OpenSpec drafting until the user gives explicit confirmation.
2. Phase 2 (Ps-openspec Expansion & Gate 2):
   - Upon Gate 1 confirmation, inject the 1:1 RTM into `proposal.md` and generate RFC 2119 specs for each requirement.
   - Decompose into atomic tasks in `tasks.md`, each bound to a specific verification command. Enforce Roo-Code/Cline single-focus execution (`[-]` lock: exactly one active in-progress task at a time). Releasing the lock requires both behavioral test passes and strict compiler/lint zero-warning passes (`--max-warnings=0` with exit code 0). Anti-suppression is absolute: no `@ts-ignore`, `eslint-disable`, or `any` casts are permitted without explicit user signoff.
   - Gate 2 (Plan & Dual-Checklist): Present the technical approach, architecture topology, and Dual-Checklist (Proposed Scope + Preserved Commitments). Await user explicit authorization before modifying source code.
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
