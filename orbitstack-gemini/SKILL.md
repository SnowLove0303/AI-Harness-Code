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
