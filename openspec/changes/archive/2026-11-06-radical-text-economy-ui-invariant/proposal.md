# Proposal: UI Radical Text Economy Invariant (少字原则)

## Why

AI agents tend to over-explain when generating user interfaces—producing verbose subtitles beneath card titles, multi-line explanations under form inputs, and verbose explanatory paragraphs in operational UI blocks. This causes "textual AI-slop", diluting information density, destroying visual whitespace, and cheapening the interface aesthetic. This change codifies the "少字原则" (Radical Text Economy & Microcopy Minimalism Axiom) into the system's UI/UX engineering methodology and validates it as an inviolable front-line invariant.

## Original user request

> 关于UI的技能，我不知道有没有提到 UI的界面开发 必须遵从 少字原则，宁可不写字，也要避免产生过多的文本说明影响视觉

## What Changes

- Formalize `RADICAL_TEXT_ECONOMY_AXIOM` ("少字公理") within `skills/ui-ux-design-engineering/SKILL.md`: prioritize visual affordance, spatial whitespace, and typographic contrast over textual crutches; rather omit text entirely than compromise visual hierarchy with explanatory clutter.
- Enforce strict microcopy standards: button labels and operational triggers must strictly adhere to 1-3 words/characters; operational cards and modules are prohibited from embedding boilerplate explanatory prose paragraphs.
- Add an explicit Anti-Textual-AI-Slop gate prohibiting paragraphs of prose, redundant explanatory tooltips, and explanatory subtitles in operational UI surfaces.
- Enhance the UI/UX design engineering skill asset and synchronize it globally across the workspace and user profile via `scripts/sync-to-global.mjs`.
- Add regression test coverage in `scripts/tests/gemini-adapter.test.mjs` (Test 35) to permanently verify that the UI skill assets encode the Radical Text Economy invariant.

## Append directives

- 执行

## Capabilities

### New Capabilities
- `ui-ux-design-engineering`: Establishes the Radical Text Economy and microcopy minimalism invariant alongside Anthropic Frontend Design and VoltAgent/Bergside tokens.

### Modified Capabilities

## Impact

- `skills/ui-ux-design-engineering/SKILL.md`
- `C:\Users\Administrator\.gemini\config\skills\ui-ux-design-engineering\SKILL.md` (via sync)
- `scripts/tests/gemini-adapter.test.mjs`
