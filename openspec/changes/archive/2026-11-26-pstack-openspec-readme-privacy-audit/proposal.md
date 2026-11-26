# Change Proposal: Pstack-openspec Rename Alignment, Architectural README Overhaul & Privacy/Secret Audit

## Why
The repository has officially been renamed to `SnowLove0303/Pstack-openspec`, serving as the **Agent Execution Strategy Layer** of the OrbitStack engineering system. Currently:
1. The local `origin` remote still points to the legacy `AI-Harness-Code.git` URL;
2. `README.md` does not yet present the complete `Pstack-openspec` architectural model (OrbitStack positioning, 5-layer trust pyramid, Step 0–Step 5 dual-gate SOP, 5-dim problem-handling brainstorm & 4-tier escalation, agent lifecycle lock, 10-skill ecosystem, and 15+ L2 static guards);
3. `.gitignore` lacks explicit rules for `.env*`, `*credentials*`, `*token*.json`, `*cookie*`, `*.pem`, `*.key`, and active skill docs (`skills/tavily-search/SKILL.md`, `skills/xmind-cloud-mcp/SKILL.md`) contain literal `C:\Users\Administrator` host paths, while no automated L2 secret/privacy guard exists to prevent future credential/PII leaks.

## What Changes
1. **REQ-01 (Repository Rename & Remote Alignment)**: Update git `origin` remote URL to `https://github.com/SnowLove0303/Pstack-openspec.git` and align all root naming/positioning to `Pstack-openspec` (OrbitStack Agent Execution Strategy Layer).
2. **REQ-02 & PROP-B/C (Comprehensive `Pstack-openspec` README Overhaul)**: Rewrite `README.md` with complete architectural philosophy, Mermaid dual-gate & OrbitStack topology diagram, 5-layer trust pyramid, problem-handling brainstorm & 4-tier escalation, 10-skill catalog, 16-guard L2 verification matrix, installation/global-sync guide, and neutrality/unslop compliance.
3. **REQ-03 & PROP-A (Full Privacy/Secret Audit, Sanitization & Automated `guard:privacy`)**:
   - Harden `.gitignore` against `.env*`, `*credentials*`, `*token*.json`, `*cookie*`, `*.pem`, `*.key`;
   - Sanitize literal `C:\Users\Administrator` paths in `skills/tavily-search/SKILL.md` and `skills/xmind-cloud-mcp/SKILL.md` to portable `~/.gemini/...` / `%USERPROFILE%\.gemini\...` placeholders;
   - Add `scripts/check-secret-privacy.mjs` (`npm run guard:privacy`, registered in `package.json` and `.harness/project-graph.json`) and `tests/secret-privacy-guard.test.mjs` to mechanically block leaked API keys, tokens, cookies, and private keys.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 | Rename & Remote URL Alignment (`Pstack-openspec`) | `PSTACK_OPENSPEC_IDENTITY_AND_REMOTE_ALIGNMENT` |
| REQ-02 & PROP-B/C | Architectural README Overhaul & Neutrality | `PSTACK_OPENSPEC_ARCHITECTURAL_README_STANDARD` |
| REQ-03 & PROP-A | Privacy/Secret Audit, `.gitignore` & `guard:privacy` | `AUTOMATED_L2_SECRET_AND_PRIVACY_GUARD_STANDARD` |
