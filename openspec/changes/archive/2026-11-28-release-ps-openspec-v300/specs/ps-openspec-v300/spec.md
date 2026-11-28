# Specification: Ps-openspec V3.00 Release & Single-Entry Hub

## ADDED Requirements

### Requirement: Single-Entry Hub Size and Index Integrity Guard
The repository SHALL include `scripts/check-single-entry-hub.mjs` (wired to `npm run guard:single-entry-hub`) and `tests/single-entry-hub.test.mjs`, enforcing `GEMINI.md <= 16384 bytes` and verifying every path in `docs/toolbox-index.json` resolves on disk.

#### Scenario: Hub guard passes on valid 3.0 repo and fails on bloat
- **WHEN** `node scripts/check-single-entry-hub.mjs` runs against `release/ps-openspec-v3.00`
- **THEN** it SHALL exit with code `0`
- **AND** mutating `GEMINI.md` above 16KB or breaking a path in `docs/toolbox-index.json` SHALL fail with exit code `1`.

### Requirement: Antigravity and Cross-Harness Out-of-the-Box Onboarding
`README.md`, `AGENT_ONBOARDING.md`, `docs/ps-openspec-gemini-system.md`, and `bundle/orbitstack-ps-openspec/QUICKSTART.md` SHALL provide Agent-readable out-of-the-box setup instructions covering Antigravity (`GEMINI.md`, `AGENTS.md`, `rules`, `plugin`, `skill` Single-Entry Hub adjustments) as well as Codex, Claude Code, and Cursor.

#### Scenario: Agent reads onboarding docs for Antigravity or other harnesses
- **WHEN** an Agent or user reads `AGENT_ONBOARDING.md` or `README.md`
- **THEN** it SHALL find exact, up-to-date V3.00 commands for Antigravity (`sync-to-global.ps1` / `ps-toolbox-index.json`) and cross-harness installation (`install-to-harness.ps1` / `.sh`), with zero references to deprecated 250KB rule duplication.

### Requirement: Version 3.0.0 Release Packaging and Branch Publication
`package.json`, `bundle/orbitstack-ps-openspec/manifest.json`, and `scripts/package-bundle.ps1` SHALL package `V3.00` bundles into `dist/` and publish the complete tree to branch `release/ps-openspec-v3.00`.

#### Scenario: V3.00 bundle build and test suite green
- **WHEN** `pnpm pack:bundle` and the test/guard suites execute
- **THEN** `dist/Ps-openspec-V3.00-Gemini.zip` (and `dist/Ps-openspec-V3.00.zip`) SHALL be generated with exit code `0`
- **AND** `node --test scripts/tests/*.mjs tests/single-entry-hub.test.mjs` SHALL pass with 0 failures.
