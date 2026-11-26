# Design: Pstack-openspec Rename Alignment, Architectural README & Privacy Guard

1. **Remote & Identity Alignment**:
   - Run `git remote set-url origin https://github.com/SnowLove0303/Pstack-openspec.git`.
2. **Architectural `README.md` Overhaul**:
   - Rewrite `README.md` around `Pstack-openspec` as the **Agent Execution Strategy Layer** of **OrbitStack**, including a Mermaid dual-gate topology diagram, 5-layer trust pyramid, problem-handling brainstorm + 4-tier `/correct` escalation, 10-skill catalog, 16-guard L2 matrix, and installation/sync instructions.
3. **Privacy Hardening & L2 `guard:privacy`**:
   - Update `.gitignore` with `.env*`, `*credentials*.json`, `*token*.json`, `*cookie*`, `*.pem`, `*.key`.
   - Sanitize `C:\Users\Administrator` in `skills/tavily-search/SKILL.md` and `skills/xmind-cloud-mcp/SKILL.md` to `~/.gemini/...`.
   - Create `scripts/check-secret-privacy.mjs` (`npm run guard:privacy`), register in `package.json` & `.harness/project-graph.json`, and add `tests/secret-privacy-guard.test.mjs`.
4. **Global Sync & Push**:
   - Run `node scripts/sync-to-global.mjs`, all 16 `guard:*` scripts, and all 4 test suites; archive OpenSpec; commit and push to `origin/release/ps-openspec-v2.00`.
