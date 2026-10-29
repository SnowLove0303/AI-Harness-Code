# Design

## Context

See `proposal.md` for background and user request. Ps-openspec V2.00 currently supports OpenAI Codex through `orbitstack-codex/SKILL.md` and distribution archive `Ps-openspec-V2.00.zip`. Google Gemini and Antigravity provide native agent primitives (`invoke_subagent` with isolated workspaces, dynamic model selection, `<appDataDir>\brain` structured artifacts, and MCP tools) that allow a direct, zero-impedance implementation of Lauren Tan's PStack mechanisms.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated, native `orbitstack-gemini/SKILL.md` adapter mapping PStack playbooks, principles, and handoff workflows to Gemini primitives.
- Map PStack's `pstack-models` reasoning budgets to Gemini models (`flash_lite`, `flash`, `pro`).
- Extend `docs/pstack-openspec-route-map.json` with Gemini host capabilities and model tiers across all 23 playbooks.
- Update installers (`scripts/install-to-harness.ps1`, `scripts/install-to-harness.sh`) to support `-SkillLocation gemini` cleanly.
- Build a dedicated, standalone `Ps-openspec-V2.00-Gemini.zip` release archive (User Option 2) alongside the Codex archive.
- Ensure regression tests and strict OpenSpec validation pass with zero errors.

**Non-Goals:**
- Alter the pinned upstream 573 PStack files in `bundle/pstack-upstream/`.
- Break or alter the existing Codex adapter (`orbitstack-codex`) or its regression checks.
- Overwrite existing user-defined rules in target projects.

## Decisions

### 1. Dedicated Gemini Adapter Directory (`orbitstack-gemini/`)
Create `orbitstack-gemini/SKILL.md` rather than overloading `orbitstack-codex/SKILL.md` with multi-host conditionals.
*Rationale*: Keeps host-specific prompts, path resolution conventions (`.gemini/skills/` vs `.agents/skills/`), and tool dispatch rules clean and auditable.
*Alternative considered*: Single parameterized adapter file. Rejected because prompt size increases and host-specific instructions become cluttered.

### 2. Native Dynamic Model Tiering (`pstack-models` -> Gemini Models)
- `flash_lite`: Low-latency classification, linting, syntax validation, and route resolution.
- `flash` (or `inherit`): Daily implementation, feature development, bug fixes, and unit test execution.
- `pro`: High-budget architectural reasoning (`/architect`), red-team interrogation (`/interrogate`), and arena judging (`/arena`).
*Rationale*: Maps PStack's core tenet ("Match reasoning budget to task difficulty") directly to Gemini's native API parameters.

### 3. Native Subagent Handoff via `invoke_subagent` and `pstack-handoff.mjs`
Parent agents dispatch workers using:
`invoke_subagent(TypeName='self', Role='Consolidated Worker', Workspace='branch', Model=<tier>, Prompt=<capsule>)`.
*Rationale*: Leverages Gemini's background subagent execution with isolated worktrees/branches and reactive wakeup (no polling), while enforcing cryptographic capsule digests and path boundary checks via `pstack-handoff.mjs`.

### 4. Dedicated Standalone Package Distribution (`Ps-openspec-V2.00-Gemini.zip`)
Implement user-selected Option 2:
- Update `scripts/package-bundle.ps1` to accept `-TargetHarness [codex|gemini|all]`.
- Packaging with `-TargetHarness gemini` generates `dist/Ps-openspec-V2.00-Gemini.zip` with `orbitstack-gemini`, the pinned PStack mirror, Gemini route mappings, and Gemini installer instructions.

## Risks / Trade-offs

- **[Risk] Path differences between global and local installs** → *Mitigation*: Both the adapter and installer resolve `.orbitstack/` locally in projects first, falling back to `C:\Users\Administrator\.gemini\` for global tasks.
- **[Risk] Gemini CLI vs IDE environment variations** → *Mitigation*: The adapter provides deterministic CLI fallbacks (e.g. `code --diff` when `vscode-review` MCP is unavailable).

## Migration Plan

1. Author `orbitstack-gemini/SKILL.md` and comprehensive system documentation in `docs/ps-openspec-gemini-system.md`.
2. Augment `docs/pstack-openspec-route-map.json` with Gemini host capabilities and model tier mappings.
3. Update `scripts/install-to-harness.ps1` and `.sh` to deploy the Gemini adapter on `-SkillLocation gemini`.
4. Add `scripts/tests/gemini-adapter.test.mjs` unit and contract tests.
5. Update `scripts/package-bundle.ps1` and generate `dist/Ps-openspec-V2.00-Gemini.zip`.
6. Run full verification suite (`node --test`, `openspec validate --all --strict`, route audit).

## Open Questions

None. The user has explicitly selected Option 2 (dedicated Gemini distribution package).
