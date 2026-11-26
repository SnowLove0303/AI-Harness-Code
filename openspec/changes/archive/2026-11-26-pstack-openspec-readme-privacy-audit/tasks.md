## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Complete read-only privacy/secret scan of 1,061 tracked files (0 secret leaks found; identified `.gitignore` gaps and `C:\Users\Administrator` path literals in `skills/tavily-search/SKILL.md` & `skills/xmind-cloud-mcp/SKILL.md`).
- [x] Author OpenSpec change and Gate 2 dossier and obtain user approval before editing files.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Update git `origin` remote URL to `https://github.com/SnowLove0303/Pstack-openspec.git`.
- [x] Harden `.gitignore` and sanitize personal host paths in `skills/tavily-search/SKILL.md` and `skills/xmind-cloud-mcp/SKILL.md`.
- [x] Create `scripts/check-secret-privacy.mjs`, register `guard:privacy` in `package.json` and `.harness/project-graph.json`, and author `tests/secret-privacy-guard.test.mjs`.
- [x] Rewrite `README.md` around `Pstack-openspec` architecture, philosophy, Mermaid topology, 10 skills, and 16 L2 guards.
- [x] Run `node scripts/sync-to-global.mjs`, all 16 `guard:*` scripts, and all test suites (`Exit Code 0`), and open core modified files in VS Code.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
