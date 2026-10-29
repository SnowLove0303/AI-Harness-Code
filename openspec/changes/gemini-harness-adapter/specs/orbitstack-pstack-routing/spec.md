# Spec Delta

## ADDED Requirements

### Requirement: Gemini native task routing
The system SHALL route Google Gemini and Antigravity tasks through the pinned upstream PStack `poteto-mode`, the selected playbook, and applicable leaf skills. PStack SHALL remain the primary execution method for Gemini environments. The route registry SHALL provide Gemini host mappings and reasoning model tiers (`flash_lite`, `flash`, `pro`) for each of the 23 upstream playbooks. Gemini subagent dispatch SHALL utilize native `invoke_subagent` with isolated workspaces (`branch` or `share`), and complex analysis or multi-turn execution logs SHALL be written to `<appDataDir>\brain` artifacts to maintain context shielding for the parent conversation.

**Invariant ID:** `INV-GEMINI-ROUTE-MAPPING`
**Origin:** `openspec/changes/gemini-harness-adapter/specs/orbitstack-pstack-routing/spec.md`
**Code anchors:** `orbitstack-gemini/SKILL.md`; `docs/pstack-openspec-route-map.json#routes`
**Expected behavior:** Every pinned playbook has a Gemini host mapping and model tier assignment, and the Gemini adapter routes tasks through PStack without mandatory confirmation loops on reversible work.
**Regression checks:** `node --test scripts/tests/gemini-adapter.test.mjs`

#### Scenario: Gemini subagent dispatch with isolated workspace
- **WHEN** a task requires delegated worker execution in a Gemini host
- **THEN** the parent agent dispatches a subagent via `invoke_subagent` using an isolated `branch` workspace and passes the machine-validated lossless handoff capsule generated from OpenSpec

#### Scenario: Gemini dynamic model tier mapping
- **WHEN** a PStack playbook is selected in Gemini
- **THEN** the adapter maps the playbook's reasoning requirement to the appropriate Gemini model tier (`flash_lite` for classification/linting, `flash` for standard features/bugfixes, `pro` for architecture/arena judging)

#### Scenario: Gemini artifact context shielding
- **WHEN** a delegated subagent or complex playbook generates extensive output, diffs, or logs
- **THEN** the output is preserved as a structured artifact in `<appDataDir>\brain\<conversation-id>` while the direct response to the parent remains a high-density summary under 2,000 tokens

#### Scenario: Gemini route inventory mapping
- **WHEN** the route registry is audited for Gemini capabilities
- **THEN** all 23 pinned playbooks contain explicit `geminiCapability` and `geminiModelTier` entries
