# Change Proposal: Ps-openspec Repository Maintenance, Global Sync Parity & Documentation Alignment

## Why
After rapid evolution of Axioms 72–79 and 15 automated L2 static guards (`guard:*`), the `Ps-openspec` (`AI-Harness-Code`) repository's entry documentation (`README.md`) and global synchronization manifest (`scripts/sync-to-global.mjs`) lag behind the actual system capabilities: `sync-to-global.mjs` omits 3 repository skills (`spec-driven-workflow`, `tavily-search`, `xmind-cloud-mcp`) and 9 newer L2 guard scripts, and `README.md` does not reflect the complete L2 guard matrix, 10-skill ecosystem, or global sync workflow.

## What Changes
1. **REQ-01 & PROP-A (Complete Global Sync Coverage)**: Refactor `scripts/sync-to-global.mjs` to use a declarative, table-driven list covering all 10 `skills/*` directories and all L2 guard/helper scripts, and execute `node scripts/sync-to-global.mjs` so global `~/.gemini` and session `GEMINI.md` are 100% synchronized.
2. **REQ-02 & PROP-B/C (Repository Organization & Documentation Alignment)**: Update `README.md` to accurately document the current `Ps-openspec` architecture, 15 `guard:*` static gates, 10-skill catalog, `sync-to-global.mjs` usage, and `release/ps-openspec-v2.00` maintenance status while preserving `packages/ai-harness/` neutrality (`guard:neutrality`, `guard:unslop` Exit Code 0).
3. **REQ-03 (Full Verification & Remote Push)**: Run all 15 `guard:*` scripts and test suites, archive the OpenSpec change, and push to `origin/release/ps-openspec-v2.00`.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 | Global Sync Completeness & Execution | `GLOBAL_SYNC_COMPLETE_SKILL_AND_GUARD_PARITY` |
| REQ-02 | Repository Cleanup & README Alignment | `REPOSITORY_ENTRY_DOCS_ALIGNMENT_AND_NEUTRALITY` |
| REQ-03 | Full Verification & Remote Push | `MAINTENANCE_FULL_GUARD_AND_REMOTE_SYNC_GATE` |
| PROP-A | Table-Driven Skill & Script Sync | `GLOBAL_SYNC_COMPLETE_SKILL_AND_GUARD_PARITY` |
| PROP-B | Release Branch Maintenance Alignment | `REPOSITORY_ENTRY_DOCS_ALIGNMENT_AND_NEUTRALITY` |
| PROP-C | Packaged Docs Neutrality Preservation | `REPOSITORY_ENTRY_DOCS_ALIGNMENT_AND_NEUTRALITY` |
