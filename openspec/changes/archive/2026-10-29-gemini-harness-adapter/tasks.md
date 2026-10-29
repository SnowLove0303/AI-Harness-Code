# Tasks

## 1. Gemini Adapter and Architecture Documentation

- [x] 1.1 Create `orbitstack-gemini/SKILL.md` defining the PStack-first Gemini adapter with native subagents, model tiering (`flash_lite`, `flash`, `pro`), and artifact context shielding. Evidence: `orbitstack-gemini/SKILL.md` created with valid frontmatter and verified in test suite.
- [x] 1.2 Create `docs/ps-openspec-gemini-system.md` detailing the Gemini architecture, host mapping, and execution workflows. Evidence: Document created with architecture flowchart, tool mappings, and verified reference links.

## 2. Route Registry Gemini Capability Mapping

- [x] 2.1 Update `docs/pstack-openspec-route-map.json` adding `geminiCapability` and `geminiModelTier` for all 23 pinned playbooks. Evidence: All 23 playbooks and fallback have non-empty Gemini capabilities and valid model tiers, verified by structural audit and unit tests.

## 3. Installer Support for Gemini Harness

- [x] 3.1 Update `scripts/install-to-harness.ps1` to deploy `orbitstack-gemini` to `.gemini/skills/orbitstack-pstack-openspec/` when `-SkillLocation gemini` is passed. Evidence: PowerShell test verified deployment of `orbitstack-gemini` and `GEMINI.md` pointer in an isolated temporary directory.
- [x] 3.2 Update `scripts/install-to-harness.sh` to mirror the Gemini adapter installation logic. Evidence: Bash syntax verified with exit code 0.

## 4. Automated Tests and Invariant Regression Verification

- [x] 4.1 Create `scripts/tests/gemini-adapter.test.mjs` testing route mappings, model tier resolution, and installer layout. Evidence: `node --test scripts/tests/gemini-adapter.test.mjs` passes 5/5 tests.
- [x] 4.2 Run full Node.js test suite across all test files. Evidence: `node --test scripts/tests/*.test.mjs` passes 21/21 tests with zero failures.

## 5. Standalone Packaging and Strict OpenSpec Validation

- [x] 5.1 Update `scripts/package-bundle.ps1` to support `-TargetHarness [codex|gemini|all]`. Evidence: Parameters added and tested with `-TargetHarness gemini`.
- [x] 5.2 Generate dedicated `dist/Ps-openspec-V2.00-Gemini.zip` archive (Option 2). Evidence: Archive generated at `dist/Ps-openspec-V2.00-Gemini.zip` (3.58 MB) containing 573 pinned PStack files, Gemini adapter, route map, and installer.
- [x] 5.3 Run `openspec validate --all --strict` and route audit. Evidence: `openspec validate --all --strict` passed 5/5 items; `audit-pstack-openspec-routing.ps1` passed 23/23 routes.
