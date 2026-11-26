## ADDED Requirements

### Requirement: Comprehensive Pstack-openspec Architectural Manual Standard (REQ-01, REQ-02, PROP-A, PROP-B)
`README.md` SHALL serve as a complete architectural manual for `Pstack-openspec` (OrbitStack Agent Execution Strategy Layer), covering design rationale, tri-core synthesis (`PStack` + `OpenSpec` + `AI-Harness`), two Mermaid topology diagrams, the 5-layer trust pyramid, Step 0–Step 5 dual-gate SOP, Two-Step Dual-Scope Deep Audit, an Anti-Pattern vs. Defense table, and core Axioms 1–80 (`PSTACK_OPENSPEC_COMPREHENSIVE_MANUAL_STANDARD`).

#### Scenario: Expanded README covers all governance pillars cleanly
- **WHEN** `README.md` is inspected against `guard:neutrality`, `guard:unslop`, `guard:privacy`, and `guard:portability`
- **THEN** it SHALL contain zero violations and exit with Exit Code 0.

### Requirement: Complete Skill, Playbook, Guard & Operations Reference Parity (REQ-03, PROP-C)
`README.md` SHALL accurately document all 10 managed skills, the 23-playbook routing registry, all 17 `npm run guard:*` static checks, global sync (`node scripts/sync-to-global.mjs`), cross-repo installers, and `@hujiale2609/ai-harness` maintenance boundaries (`COMPREHENSIVE_README_FULL_GUARD_PARITY`).

#### Scenario: Full verification suite passes after README expansion
- **WHEN** all 17 `guard:*` checks and 5 test suites run after updating `README.md`
- **THEN** every check SHALL exit with Exit Code 0.
