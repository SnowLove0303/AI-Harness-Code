## ADDED Requirements

### Requirement: Pstack-openspec Identity & Remote Alignment (REQ-01)
The repository identity and git `origin` remote SHALL align with `SnowLove0303/Pstack-openspec` (`PSTACK_OPENSPEC_IDENTITY_AND_REMOTE_ALIGNMENT`), positioning the repository as the Agent Execution Strategy Layer of the OrbitStack engineering system.

#### Scenario: Git origin remote points to SnowLove0303/Pstack-openspec.git
- **WHEN** `git remote get-url origin` is inspected
- **THEN** it SHALL return `https://github.com/SnowLove0303/Pstack-openspec.git`.

### Requirement: Architectural README Standard & Neutrality (REQ-02, PROP-B, PROP-C)
`README.md` SHALL document the `Pstack-openspec` Agent Execution Strategy Layer architecture, OrbitStack 5-layer trust pyramid, Step 0–Step 5 dual-gate SOP with Mermaid topology, 5-dim problem-handling brainstorm, 10-skill catalog, and L2 guard matrix while passing `npm run guard:neutrality`, `npm run guard:unslop`, and `npm run guard:portability` (`PSTACK_OPENSPEC_ARCHITECTURAL_README_STANDARD`).

#### Scenario: Rewritten README passes neutrality and unslop static guards
- **WHEN** `npm run guard:neutrality` and `npm run guard:unslop` execute on the updated `README.md`
- **THEN** both guards SHALL report 0 violations and exit with Exit Code 0.

### Requirement: Automated L2 Secret & Privacy Guard and Sanitization (REQ-03, PROP-A)
The repository SHALL include `.gitignore` exclusions for credential/token/cookie/key files, sanitize personal host username paths in active skill documentation (`skills/tavily-search/SKILL.md`, `skills/xmind-cloud-mcp/SKILL.md`), and enforce `scripts/check-secret-privacy.mjs` (`npm run guard:privacy`, `AUTOMATED_L2_SECRET_AND_PRIVACY_GUARD_STANDARD`) to block API keys, tokens, cookies, and private keys.

#### Scenario: Secret/cookie pattern triggers Exit Code 1 in guard:privacy
- **WHEN** `scanTextForSecrets` inspects text containing an API key, token, cookie header, or private key block
- **THEN** it SHALL fail with `SECRET_OR_PRIVACY_LEAK_BLOCKED`.
