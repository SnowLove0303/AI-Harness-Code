# Proposal: Release Ps-openspec V3.00 (Single-Entry Hub & Cross-Harness Onboarding)

## Why
Merge the latest `release/ps-openspec-v2.00` baseline, PR #1 (`feat/optimize-gemini-quota-pstack-alignment`), and local Single-Entry Hub optimizations into a unified **Ps-openspec 3.0.0** release branch (`release/ps-openspec-v3.00`), featuring an Antigravity-first `GEMINI.md` / `AGENTS.md` / `rules` / `plugin` / `skill` out-of-the-box guide, cross-harness onboarding (Codex / Claude Code / Cursor), L2 hub guard (`check-single-entry-hub.mjs`), and V3.00 distribution bundles.

## What Changes
- **REQ-01**: Reconcile `release/ps-openspec-v2.00`, PR #1, and local hub layout into unified v3.0.0 source (`GEMINI.md`, `docs/toolbox-index.json`, `scripts/sync-to-global.mjs`, `scripts/check-single-entry-hub.mjs`).
- **REQ-02**: Rebuild Antigravity Agent out-of-the-box guide (`AGENT_ONBOARDING.md`, `docs/ps-openspec-gemini-system.md`, `README.md`) detailing `GEMINI.md`, `AGENTS.md`, `rules`, `plugin`, and `skill` adjustments.
- **REQ-03**: Update cross-harness onboarding (`README.md`, `AGENT_ONBOARDING.md`, `bundle/orbitstack-ps-openspec/QUICKSTART.md`) for Codex, Claude Code, and Cursor.
- **REQ-04**: Bump version to `3.0.0` (`V3.00`) in `package.json` & `bundle/orbitstack-ps-openspec/manifest.json`, update `scripts/package-bundle.ps1` to include Single-Entry Hub assets, and build `dist/Ps-openspec-V3.00*.zip`.
- **REQ-05**: Fix remaining test assertions (`gemini-adapter.test.mjs` L192 & optional `rea` MCP check), verify all guards/tests pass, and push to `origin release/ps-openspec-v3.00`.
