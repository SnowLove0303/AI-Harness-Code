## ADDED Requirements

### Requirement: UI Craft Floor & Anti-Plainness Standard (REQ-1, PROP-C, PROP-D)
The UI engineering workflow SHALL follow the `Shape -> Distill -> Polish` execution order (`UI_SHAPE_DISTILL_POLISH_EXECUTION_ORDER`), calibrate density by surface mode (`operate`, `read`, `persuade` under `UI_THREE_MODE_DENSITY_BUDGET_STANDARD`), and enforce `impeccable` craft-floor invariants (`UI_CRAFT_FLOOR_&_ANTI_PLAINNESS_STANDARD`) including browser surface polish (custom scrollbars, selection tint, focus rings, `tabular-nums`), directional shadow depth, and strict bans on nested cards, gradient text, and identical lazy card grids.

#### Scenario: Surface craft discipline replaces plain default templates
- **WHEN** an agent designs or refactors a user interface
- **THEN** `skills/ui-ux-design-engineering/SKILL.md` SHALL prescribe intentional typography scale, surface-mode calibration, and browser surface polish rather than plain default scaffolds.

### Requirement: `distill` Purification & Zero-Clutter Protocol (REQ-2)
Every UI deliverable SHALL undergo a mandatory `distill` pass (`UI_DISTILL_PURIFICATION_&_ZERO_CLUTTER_PROTOCOL`) prohibiting eyebrow/kicker labels above headings, redundant explanatory prose paragraphs inside operational components, excessive decorative badges, and non-informational `01/02/03` section markers.

#### Scenario: Redundant explanatory labels and prose clutter are stripped
- **WHEN** operational UI markup contains decorative eyebrow kickers or multi-sentence explanatory prose inside interactive cards
- **THEN** the `distill` protocol SHALL require stripping them so every remaining element justifies its place.

### Requirement: Automated L2 `guard:ui-slop` Static Guard (REQ-3, PROP-E)
The repository SHALL provide a deterministic Layer 2 static guard (`scripts/check-ui-slop.mjs`, registered as `npm run guard:ui-slop`) scanning frontend component files (`.tsx`, `.jsx`, `.vue`, `.svelte`, `.html`, `.css`) across frameworks (`AUTOMATED_L2_UI_SLOP_GUARD_STANDARD`, `CROSS_FRAMEWORK_UI_DIAGNOSTIC_STANDARD`) to detect and block UI slop violations with Exit Code 1:
- `UI_SLOP_NESTED_CARD_BLOCKED`
- `UI_SLOP_EXCESSIVE_BADGES_BLOCKED`
- `UI_SLOP_EYEBROW_CLUTTER_BLOCKED`
- `UI_SLOP_VERBOSE_PROSE_BLOCKED`
- `UI_SLOP_PURPLE_GLOW_CLICHE_BLOCKED`

#### Scenario: Negative UI slop specimens fail guard with Exit Code 1 while clean specimens pass
- **WHEN** `checkUiContent` inspects UI markup containing nested cards, excessive badge density, eyebrow kickers, verbose explanatory prose, or purple-glow AI clichés
- **THEN** it SHALL fail with Exit Code 1 and emit the exact violation code; clean minimal UI markup SHALL pass with Exit Code 0.

### Requirement: Axiom 73 Constitutional Codification & Parity (REQ-4)
The UI craft, `distill` purification, and `guard:ui-slop` governance system SHALL be codified as **Axiom 73** (`UI_CRAFT_DISTILL_&_AUTOMATED_SLOP_GUARD_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 70) using 100% pure universal software engineering abstractions (`AXIOM_73_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Three-mirror parity check passes with Exit Code 0
- **WHEN** `tests/ui-craft-distill-guard.test.mjs` and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all three constitutional mirrors SHALL contain identical Axiom 73 tokens and exit with Exit Code 0.
