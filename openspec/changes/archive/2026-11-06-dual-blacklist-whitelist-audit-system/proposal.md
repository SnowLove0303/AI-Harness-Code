# Proposal: Project Dual Blacklist-Whitelist Audit System & Dual-Specimen Sanity Gate

## Why

In current multi-agent workflows, audit systems suffer from two symmetrical failure modes:
1. False Positives (误报/误伤): Legitimate code, human-confirmed special patterns, and authoritative template formats are incorrectly flagged as defects or "code smell" by overly broad or naive audit heuristics, causing agents to overhaul or break working code.
2. False Negatives (漏报/漏判): Real defects, forbidden exogenous fabrications, and recurring historical regressions escape weak or non-existent checks because defect anti-patterns were never codified into deterministic, blocking blacklist rules.

This change legislates the Project Dual Blacklist-Whitelist Registry Axiom (`PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM`) across Ps-openspec: every project must maintain an explicit, dual-bipolar registry of Whitelist exemptions (human-confirmed legitimate structures and golden exemplars) and Blacklist interceptors (codified defect anti-patterns). Crucially, any proposed audit rule must pass the Dual-Specimen Sanity Gate (`DUAL_SPECIMEN_SANITY_GATE`): zero false-positives against the positive specimen set, and zero false-negatives against the negative mutant set.

## Original user request

> 继续围绕审计，我希望Agent能做好各自项目的审计体系，特别是黑白名单，目前还是太容易出现 明明正确的做法却被Agent审计归纳为错误的情况了，并且同时还很容易出现 错误做法审计缺漏的情况

## What Changes

- Legislate `PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM` (Axiom 45) in `GEMINI.md`: codify explicit project-level dual blacklist/whitelist registries, establishing Whitelist Supreme Immunity (`WHITELIST_SUPREME_IMMUNITY_AXIOM` & `FALSE_POSITIVE_OVERHAUL_BLOCKED`) to eliminate false positives, and Blacklist Mandatory Interception (`BLACKLIST_MANDATORY_INTERCEPTION_AXIOM` & `AUDIT_LEAKAGE_DETECTED`) to eliminate false negatives.
- Establish the Dual-Specimen Sanity Gate (`DUAL_SPECIMEN_SANITY_GATE`): every new or updated audit rule must be evaluated against positive golden specimens (100% pass, zero false-positives) and negative fault mutants (100% fail, zero false-negatives).
- Update `skills/pstack-openspec/SKILL.md` (Axiom 47) and `skills/ai-harness-openspec/SKILL.md` (Axiom 42) to inject the dual blacklist-whitelist governance model.
- Add automated regression test (Test 37) in `scripts/tests/gemini-adapter.test.mjs` verifying dual blacklist-whitelist rules, immunity axioms, and dual-specimen gate invariants.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- 执行

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Formally codify the Project Dual Blacklist-Whitelist Registry and Dual-Specimen Sanity Gate into the routing specification.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
