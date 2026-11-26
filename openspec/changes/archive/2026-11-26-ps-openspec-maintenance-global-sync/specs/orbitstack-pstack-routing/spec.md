## ADDED Requirements

### Requirement: Complete Global Sync Coverage for Skills and L2 Guards (REQ-01, PROP-A)
`scripts/sync-to-global.mjs` SHALL synchronize all 10 managed skill directories under `skills/` and all L2 static guard scripts under `scripts/` using a declarative table-driven manifest (`GLOBAL_SYNC_COMPLETE_SKILL_AND_GUARD_PARITY`), exiting with code 0 when global configuration is fully aligned.

#### Scenario: Running global sync updates all missing skills and guard scripts cleanly
- **WHEN** `node scripts/sync-to-global.mjs` executes
- **THEN** it SHALL synchronize all 10 skills and all L2 guard scripts without touching protected `.codex` paths and exit with Exit Code 0.

### Requirement: Repository Entry Documentation Alignment & Neutrality (REQ-02, PROP-B, PROP-C)
`README.md` SHALL accurately document the current 15-guard L2 verification matrix, 10-skill ecosystem, `sync-to-global.mjs` workflow, and active maintenance branch (`release/ps-openspec-v2.00`), while passing `npm run guard:neutrality` and `npm run guard:unslop` with 0 violations (`REPOSITORY_ENTRY_DOCS_ALIGNMENT_AND_NEUTRALITY`).

#### Scenario: Updated README passes neutrality and unslop static guards
- **WHEN** `npm run guard:neutrality` and `npm run guard:unslop` run after updating `README.md`
- **THEN** both guards SHALL report 0 violations and exit with Exit Code 0.

### Requirement: Maintenance Full Guard & Remote Push Gate (REQ-03)
Before archiving and pushing to `origin/release/ps-openspec-v2.00`, all 15 `guard:*` scripts and test suites SHALL pass with Exit Code 0 (`MAINTENANCE_FULL_GUARD_AND_REMOTE_SYNC_GATE`).

#### Scenario: All guards and tests pass prior to remote push
- **WHEN** the full verification suite runs after final edits
- **THEN** every guard and test suite SHALL exit with Exit Code 0.
