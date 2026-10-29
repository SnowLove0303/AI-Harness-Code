# Proposal

## Why

The current Ps-openspec V2.00 release is adapted for OpenAI Codex, leaving Gemini / Antigravity without a native adapter. This gap deprives Gemini of PStack-first routing, lossless handoffs, dynamic reasoning tiering, and native subagent/artifact workflows, while forcing installations to use Codex-specific configurations. Adapting Ps-openspec for Gemini and packaging a dedicated `Ps-openspec-V2.00-Gemini.zip` distribution provides first-class support for Gemini/Antigravity while keeping upstream PStack and Codex capabilities intact.

## Original user request

> 你需要做一个适应Gemini的版本
> 要深入制定方案
> 选项2 (单独生成专属的 Ps-openspec-V2.00-Gemini.zip 分发包)

## What Changes

- Add native Google Gemini / Antigravity host adapter `orbitstack-gemini/SKILL.md` routing through pinned upstream `poteto-mode`.
- Map PStack's `pstack-models` reasoning budgets to Gemini native model tiers (`flash_lite` for classification/linting, `flash` for coding/TDD, `pro` for architecture/arena judging).
- Connect PStack's Consolidated Scope and Fresh Subagents to Gemini's first-class `invoke_subagent` (with `Workspace="branch"` or `"share"`) and lossless handoff capsule (`pstack-handoff.mjs`).
- Bind PStack context-shielding principles to Gemini's `<appDataDir>\brain` artifact system and `vscode-review` MCP for diff inspection.
- Update `docs/pstack-openspec-route-map.json` with Gemini host capabilities and model tiers across all 23 playbooks.
- Update `scripts/install-to-harness.ps1` and `scripts/install-to-harness.sh` to install the Gemini adapter to `.gemini/skills/` and inject `.gemini/` and `GEMINI.md` pointer configurations.
- Update packaging script `scripts/package-bundle.ps1` to produce the dedicated `Ps-openspec-V2.00-Gemini.zip` release artifact (Option 2).
- Add automated regression tests `scripts/tests/gemini-adapter.test.mjs` verifying Gemini capsule dispatch, model tier resolution, and installer layout.

## Append directives

- 选项2

## Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Add Google Gemini / Antigravity native host routing, subagent mapping, model tiering (`flash_lite`, `flash`, `pro`), and artifact context shielding.
- `ps-openspec-distribution`: Add dedicated `Ps-openspec-V2.00-Gemini.zip` distribution package targeting Gemini / Antigravity harness environments.

## Impact

Adds `orbitstack-gemini/SKILL.md`, `docs/ps-openspec-gemini-system.md`, and `scripts/tests/gemini-adapter.test.mjs`. Updates `scripts/install-to-harness.ps1`, `scripts/install-to-harness.sh`, `scripts/package-bundle.ps1`, `docs/pstack-openspec-route-map.json`, and distribution artifacts. Upstream pinned PStack (573 files) and Codex adapter remain completely untouched and backward-compatible.
