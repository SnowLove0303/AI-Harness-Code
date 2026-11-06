# ui-ux-design-engineering

## ADDED Requirements

### Requirement: Radical Text Economy Invariant (少字公理)
The UI engineering skill SHALL define and enforce the Radical Text Economy Axiom ("少字原则"), stating that user interfaces must express intent, state, and hierarchy through visual affordance, layout geometry, iconography, and spatial rhythm rather than relying on textual explanations. When visual clarity can be achieved through layout and affordance, textual explanation SHALL be omitted.

#### Scenario: Agent designs an operational card or action panel
- **WHEN** an agent generates or refactors an operational UI component (card, panel, form, toolbar)
- **THEN** it SHALL NOT insert boilerplate explanatory prose, subtitles, or descriptive paragraphs unless strictly required for irreversible destructive actions
- **AND** the component SHALL convey hierarchy and status through typographic weight, spacing, badges, and icons.

### Requirement: Ultra-Minimalist Microcopy and Zero Explanatory Bloat
The UI engineering skill SHALL enforce concise microcopy constraints where action buttons and interactive labels are strictly bounded to 1 to 3 words or Chinese characters, and operational cards are prohibited from featuring explanatory boilerplate paragraphs.

#### Scenario: Agent authors button labels and form fields
- **WHEN** an agent authors interactive buttons or form fields
- **THEN** button labels SHALL consist of 1 to 3 concise action words (e.g. "保存", "导出", "重试", "连接")
- **AND** form fields SHALL rely on concise labels and placeholders without persistent multi-line explanatory paragraphs.

### Requirement: Anti-Textual-AI-Slop Guardrail
The UI engineering skill SHALL classify explanatory bloat, paragraph prose pollution in operational modules, and redundant "how-to" descriptions in operational cards as explicit AI-slop defects subject to immediate rejection.

#### Scenario: Code review against AI-slop criteria
- **WHEN** the agent or reviewer inspects UI markup against Anti-AI-Slop guidelines
- **THEN** the presence of multi-line static explanatory paragraphs in operational views SHALL trigger an anti-pattern violation.
