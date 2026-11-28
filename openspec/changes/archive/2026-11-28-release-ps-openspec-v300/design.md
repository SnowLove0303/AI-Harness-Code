# Design: Ps-openspec V3.00 Consolidation & Packaging

## 1. Architecture Summary
- Consolidates `release/ps-openspec-v2.00` + PR #1 (`82ecb8e`) + Single-Entry Hub guard (`check-single-entry-hub.mjs`).
- **Antigravity Surface Adjustment**:
  - `GEMINI.md` (~4 KB): sole always-on global instruction switch.
  - `AGENTS.md`: project-level repo constitution (not globally injected every turn).
  - `config/rules/`: empty globally; project rules belong in `<project>/.agent/rules/`.
  - `config/plugins/`: enable only actively needed plugins (`openspec`); avoid duplicate `.agents/skills/openspec-*`.
  - `config/skills/`: only `orbitstack-pstack-openspec` registered globally; all other skills & L2 scripts live in `~/.gemini/ps-hub/` (indexed by `ps-toolbox-index.json`) and `~/.gemini/ps-toolbox/` (local private skills).

## 2. Dual-Checklist (双清单)
### 拟变范围清单 (Planned Changes)
- `[Root Source]` `package.json`, `bundle/orbitstack-ps-openspec/manifest.json` (bump to `3.0.0` / `V3.00`)
- `[L2 Guard]` `scripts/check-single-entry-hub.mjs`, `tests/single-entry-hub.test.mjs`, `scripts/sync-to-global.mjs`
- `[Onboarding Docs]` `README.md`, `AGENT_ONBOARDING.md`, `docs/ps-openspec-gemini-system.md`, `bundle/orbitstack-ps-openspec/QUICKSTART.md`
- `[Packaging & Tests]` `scripts/package-bundle.ps1`, `scripts/tests/gemini-adapter.test.mjs`
- `[Distribution]` `dist/Ps-openspec-V3.00-Gemini.zip`, `dist/Ps-openspec-V3.00.zip`

### 保持现状承诺清单 (Leave-As-Is Commitments)
- `bundle/pstack-upstream/` (SHA-256 pinned upstream mirror)
- `C:\Users\52882\.gemini\ps-toolbox\` (private local skills such as `msds-*` never committed to Git)
- Existing `scripts/check-*.mjs` L2 guards and `docs/pstack-openspec-route-map.json`
