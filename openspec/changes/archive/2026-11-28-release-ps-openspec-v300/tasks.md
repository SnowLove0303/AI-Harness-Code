# Tasks: release-ps-openspec-v300

- [x] 1.1 Create branch `release/ps-openspec-v3.00` from current unified tree and wire `check-single-entry-hub.mjs` into `scripts/sync-to-global.mjs` (Verify: `npm run guard:single-entry-hub` exit 0)
- [x] 1.2 Fix `scripts/tests/gemini-adapter.test.mjs` (L192 & optional `rea` MCP check) so all 4 core test suites + `tests/single-entry-hub.test.mjs` pass 100% (Verify: `node --test` exit 0)
- [x] 2.1 Rewrite `AGENT_ONBOARDING.md`, `README.md`, `docs/ps-openspec-gemini-system.md`, and `bundle/orbitstack-ps-openspec/QUICKSTART.md` for V3.00 Antigravity (`GEMINI.md` / `AGENTS.md` / `rules` / `plugin` / `skill`) and cross-harness (Codex / Claude Code / Cursor) out-of-the-box setup (Verify: `npm run guard:neutrality && npm run guard:unslop` exit 0)
- [x] 3.1 Bump version to `3.0.0` (`V3.00`) in `package.json` & `manifest.json`, update `scripts/package-bundle.ps1`, and build `dist/Ps-openspec-V3.00-Gemini.zip` & `dist/Ps-openspec-V3.00.zip` (Verify: `Test-Path` exit 0)
- [x] 3.2 Run full guard/test checks, sync to local `~/.gemini/`, commit, and push `release/ps-openspec-v3.00` to `origin` (Verify: `git status` clean & push exit 0)
