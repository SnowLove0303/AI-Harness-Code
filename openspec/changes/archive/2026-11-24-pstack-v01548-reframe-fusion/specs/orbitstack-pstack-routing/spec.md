## ADDED Requirements

### Requirement: Upstream `pstack v0.15.48` Mirror Sync & Windows Compatibility (REQ-1, REQ-4)
The local upstream mirror SHALL be synchronized to `pstack v0.15.48` (`UPSTREAM_PSTACK_V01548_MIRROR_SYNC`), incorporating `skills/reframe/SKILL.md`, Windows native `/statechart` `\r\n` compatibility (`WINDOWS_STATECHART_&_MODEL_ROUTING_PARITY`), and updated model routing metadata.

#### Scenario: Upstream mirror version and `/reframe` skill presence check
- **WHEN** `scripts/check-pstack-sync.mjs` inspects the local upstream mirror
- **THEN** `plugin.json` SHALL report version `0.15.48` (or newer) and `skills/reframe/SKILL.md` SHALL exist on disk.

### Requirement: Step 0 `/reframe` Disambiguation & Ambiguity Threshold Gate (REQ-2, PROP-C, PROP-E)
During Step 0 Gate 1, when an operator's description is ambiguous, colloquial, or could refer to multiple distinct engineering problems (`REFRAME_AMBIGUITY_THRESHOLD_GATE`), the agent SHALL invoke the `/reframe` protocol (`REFRAME_STEP0_DISAMBIGUATION_PROTOCOL`) to list 2–3 candidate problem definitions with distinguishing signs, teach impact-ranked expert terms, surface neighboring-domain analogies, highlight unmentioned concerns, and rewrite the requirement precisely. Precise technical specifications SHALL bypass `/reframe` verbosity. All external citations or URLs in `/reframe` outputs MUST be verified; unverified citations SHALL be blocked (`UNVERIFIED_CITATION_BLOCKED`, `ZERO_FABRICATED_CITATION_STANDARD`).

#### Scenario: Precise technical input bypasses verbose reframing while ambiguous input triggers disambiguation
- **WHEN** `evaluateReframeTrigger(input)` evaluates a multi-meaning vague request vs. a precise file-and-stacktrace request
- **THEN** the vague request SHALL trigger `REFRAME_REQUIRED` while the precise request SHALL proceed directly to standard RTM ingestion (`DIRECT_RTM_INGESTION`).

### Requirement: Global Route Map Companion Registration (REQ-3)
The `/reframe` skill SHALL be registered in `docs/pstack-openspec-route-map.json` under `companionSkills` (`REFRAME_COMPANION_ROUTE_REGISTRATION`) while preserving the 23-playbook `routes.length === 23` invariant, and SHALL be indexed in `skills/pstack-openspec/references/playbooks-catalog.md`.

#### Scenario: Route map registers `/reframe` without breaking 23-playbook invariant
- **WHEN** `scripts/tests/gemini-adapter.test.mjs` validates `docs/pstack-openspec-route-map.json`
- **THEN** `routes.length` SHALL equal 23 and `companionSkills` SHALL contain a valid `reframe` entry with `geminiCapability` and `geminiModelTier`.

### Requirement: Upstream Sync Inspector & Axiom 72 Codification (REQ-5, PROP-D)
The repository SHALL provide `scripts/check-pstack-sync.mjs` (`UPSTREAM_PSTACK_SYNC_INSPECTOR_STANDARD`, registered as `npm run guard:pstack-sync`) to verify local upstream mirror integrity and optionally compare against remote `cursor/plugins/pstack`, and SHALL codify **Axiom 72** (`PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 69) using pure universal software engineering abstractions (`AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Axiom 72 mirror drift or missing `/reframe` guard fails with Exit Code 1
- **WHEN** any constitutional mirror omits Axiom 72 tokens or `guard:pstack-sync` detects a missing `/reframe` skill in the local mirror
- **THEN** the verification suite SHALL exit with Exit Code 1.
