# Change Proposal: Sync pstack v0.15.48 & Fuse `/reframe` Requirement Reframing Protocol (Axiom 72)

## Why
Upstream `cursor/plugins/pstack` advanced from `v0.15.36` to `v0.15.48`, introducing the `/reframe` skill (for teaching expert terminology, disambiguating vague operator descriptions, borrowing analogies from neighboring domains, and rewriting requirements with verified references), native Windows `/statechart` support (`\r\n` TLC line endings), and updated Gemini 4 model routing. Synchronizing the local upstream mirror and integrating `/reframe` into Step 0 Gate 1 (coupled with ambiguity-threshold gating and strict anti-fabrication citation rules) strengthens requirement precision across the entire Ps-openspec lifecycle.

## What Changes
1. **REQ-1 (Upstream `pstack v0.15.48` Mirror Sync)**: Sync `C:\Users\Administrator\.gemini\pstack-upstream\` to `v0.15.48`, adding `skills/reframe/SKILL.md`, updated `skills/statechart/` (Windows `\r\n` fix), and `plugin.json` (`0.15.48`).
2. **REQ-2 (Step 0 Gate 1 `/reframe` Disambiguation & Reframing Integration)**: Integrate `/reframe` into Step 0 Gate 1 so vague or multi-meaning descriptions trigger problem disambiguation (2–3 candidate definitions with distinguishing signs), impact-ranked expert terms, neighboring-field analogies, unmentioned concerns, and precise requirement rewriting alongside Axiom 69 brainstorming.
3. **REQ-3 (Global Route Map & Skill Catalog Registration)**: Register `/reframe` in `docs/pstack-openspec-route-map.json` (under `companionSkills` to preserve the 23-playbook invariant) and `skills/pstack-openspec/references/playbooks-catalog.md`.
4. **REQ-4 (Windows `/statechart` Compatibility & Model Routing Alignment)**: Preserve Windows native `/statechart` compatibility and Gemini 4 model routing alignment.
5. **REQ-5 (Axiom 72 Constitutional Codification & Parity)**: Codify Axiom 72 (`PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 69) using pure universal software engineering abstractions.
6. **PROP-C (Ambiguity Threshold Gate)**: Trigger full `/reframe` reframing only when the user input is ambiguous, colloquial, or multi-interpretable; pass precise engineering specifications straight through without verbosity overhead.
7. **PROP-D (Read-Only Upstream Sync Inspector)**: Provide `scripts/check-pstack-sync.mjs` (`npm run guard:pstack-sync` / `--check-remote`) to compare local `pstack-upstream` version and skills against upstream.
8. **PROP-E (Zero-Fabricated-Citation Standard)**: Enforce `UNVERIFIED_CITATION_BLOCKED` prohibiting unverified URLs, papers, or external references during `/reframe` term explanations.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Upstream `pstack v0.15.48` Sync | `UPSTREAM_PSTACK_V01548_MIRROR_SYNC` |
| REQ-2 | Step 0 `/reframe` Disambiguation | `REFRAME_STEP0_DISAMBIGUATION_PROTOCOL` |
| REQ-3 | Route Map & Catalog Registration | `REFRAME_COMPANION_ROUTE_REGISTRATION` |
| REQ-4 | Windows `/statechart` & Model Alignment | `WINDOWS_STATECHART_&_MODEL_ROUTING_PARITY` |
| REQ-5 | Axiom 72 Three-Mirror Codification | `AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD` |
| PROP-C | Ambiguity Threshold Gate | `REFRAME_AMBIGUITY_THRESHOLD_GATE` |
| PROP-D | Upstream Sync Inspector Tool | `UPSTREAM_PSTACK_SYNC_INSPECTOR_STANDARD` |
| PROP-E | Zero-Fabricated-Citation Standard | `ZERO_FABRICATED_CITATION_STANDARD` |
