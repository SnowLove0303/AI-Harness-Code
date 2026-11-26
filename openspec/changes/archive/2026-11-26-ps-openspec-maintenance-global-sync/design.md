# Design: Ps-openspec Maintenance, Global Sync Parity & Documentation Alignment

1. **Table-Driven `scripts/sync-to-global.mjs`**:
   - Replace repetitive per-skill sync blocks with a declarative `SKILLS_TO_SYNC` array covering all 10 skills in `skills/`, and expand `scriptsToSync` to include all L2 `check-*.mjs` guards plus helper scripts.
2. **Updated `README.md`**:
   - Refresh the asset table, add the 15 `guard:*` static verification matrix, document `node scripts/sync-to-global.mjs`, and summarize the `Ps-openspec` governance lifecycle without violating `guard:neutrality` or `guard:unslop`.
3. **Verification & Archival**:
   - Run `node scripts/sync-to-global.mjs`, all 15 `guard:*` scripts, and all test suites; validate and archive OpenSpec; commit and push to `origin/release/ps-openspec-v2.00`.
