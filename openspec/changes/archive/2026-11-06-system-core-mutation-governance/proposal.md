# Proposal: System Core Mutation Governance & Generality Preservation Axiom

## Why

In complex multi-agent engineering workflows, agents frequently react to local task friction, single-scenario requirements, or audit false positives by directly altering core system mechanics (e.g., engines, protocols, global dispatchers, state machine invariants). This reckless practice causes catastrophic systemic degeneration:
1. Scenario-locked System Degradation (系统情境化与单一化): Universal engines become bloated with special-case branches and one-off heuristics tailored to specific business contexts or individual document/product types.
2. Generality Destruction (通用性与泛用性丧失): Core components lose their neutrality and extensibility, turning reusable architectural platforms into fragile, bespoke scripts.
3. Hidden Regression Cascade (隐性退化链): Mutating core system logic to satisfy one local scenario inadvertently breaks unrelated workflows across the ecosystem.

This change legislates the System Core Mutation Dual-Gate Statutory Approval & Generality Preservation Axiom (`SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM`) across Ps-openspec:
1. Two-Tier Classification: Explicitly distinguish `[System Core Mutation]` (engine, protocol, global pipeline, core state machine) from `[Peripheral Non-Core]` (documentation, project-level tests, project audit graph rules, local configs).
2. Statutory Dual-Gate Special Approval: Any mutation to core system functionality MUST undergo dedicated dual-gate presentation, highlighting the systemic rationale, proving why peripheral/policy-layer modifications are insufficient, and securing explicit human authorization before a single line of core code is touched.
3. Generality Preservation Invariant: It is strictly prohibited to sacrifice system generality or inject scenario-specific heuristics into core engines to accommodate specific business scenarios or bypass audit false-positives (`SCENARIO_SYSTEM_MUTATION_BLOCKED`).
4. Mechanism-Policy Orthogonal Decoupling: Core engines provide general parameterizable mechanisms, while scenario-specific requirements must strictly reside in external calling policies or project-level configurations.

## Original user request

> 除了一些md和审计体系等之外，涉及到系统根本功能的事项修改时必须通过双门禁与我确认并重点说明，每个Agent在执行任务的时候都要区分好，哪些是需要改系统本身的，哪些是不需要改系统根本逻辑的，要区分好，因此一旦因为某个情境或审计误判改了系统本身，就会导致系统出现严重的单一化和情境化，会散失泛用性，我们绝不能因为某一具体的业务情境或问题去不限制的修改系统本身，不能以牺牲系统功能通用性为前提

## What Changes

- Legislate `SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM` (Axiom 46) in `GEMINI.md`:
  - Enforce Two-Tier Classification (`SYSTEM_MUTATION_CLASSIFICATION_AXIOM`) between System Core and Peripheral Non-Core.
  - Require dedicated dual-gate highlighting and approval (`SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE`) for any core mutation.
  - Block scenario-driven system degradation (`SCENARIO_SYSTEM_MUTATION_BLOCKED`) and mandate Generality Preservation (`GENERALITY_PRESERVATION_AXIOM`).
  - Mandate strict Mechanism-Policy Orthogonal Decoupling (`MECHANISM_POLICY_ORTHOGONAL_DECOUPLING`).
  - Enforce pure universal engineering abstraction and domain neutrality (`UNIVERSAL_SYSTEM_INTEGRITY_STANDARD`).
- Update `skills/pstack-openspec/SKILL.md` (Axiom 48) and `skills/ai-harness-openspec/SKILL.md` (Axiom 43) with the new axiom.
- Formally codify system core mutation governance in `openspec/specs/orbitstack-pstack-routing/spec.md`.
- Add Test 38 in `scripts/tests/gemini-adapter.test.mjs` verifying Axiom 46, two-tier classification, and `SCENARIO_SYSTEM_MUTATION_BLOCKED`.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- /goal 深度执行上述方案，务必落实到位

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify system core mutation classification, special dual-gate approval, and generality preservation requirements into the routing specification.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
