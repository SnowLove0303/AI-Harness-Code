# Proposal: Establish USER_HARD_RULES_GUIDE.md as Mandatory Root Authority for Draw.io (`drawio-guide-root-authority`)

## Why
Currently `USER_HARD_RULES_GUIDE.md` (`DRW-01`~`DRW-08`) only existed in the global skill directory without being version-controlled in `AI-Harness-Code`, and `SKILL.md` / `GEMINI.md` did not enforce reading it as the mandatory root authority file. Meanwhile, `scripts/drawio-toolkit.mjs` in the repository lacked the `DRW-01`~`DRW-08` monochrome, canvas ceiling, midpoint port, `replace-page`, LR vertical centering, and single-trunk branching enhancements.

## What Changes
- Bring `skills/drawio-mcp/USER_HARD_RULES_GUIDE.md` into `AI-Harness-Code` as the version-controlled **Root Authority** for the Draw.io system (and resolve internal `DRW-06` vs `open_drawio_xml` conflict).
- Elevate `USER_HARD_RULES_GUIDE.md` as a **mandatory read-first gate** at the top of `skills/drawio-mcp/SKILL.md` and in `GEMINI.md` / `skills/pstack-openspec/SKILL.md` / `skills/ai-harness-openspec/SKILL.md` (Axiom 76 / Action Skill Index).
- Backport and unify `DRW-01`~`DRW-08` into `scripts/drawio-toolkit.mjs` (`NON_MONOCHROME_STYLE_BLOCKED`, `CANVAS_SIZE_EXCEEDED_BLOCKED`, `NON_MIDPOINT_PORT_DETECTED`, `NON_VERTICALLY_CENTERED_LR`, `replace-page`, single-trunk `trunkX` branching).
- Add regression tests in `tests/drawio-toolkit.test.mjs` verifying root-file enforcement and `DRW-01`~`DRW-08` L2 checks.

## 1:1 Spec-Kit RTM

| Req ID | Summary | Acceptance Criteria |
|---|---|---|
| **REQ-01** | Establish `USER_HARD_RULES_GUIDE.md` as Draw.io root authority | `skills/drawio-mcp/USER_HARD_RULES_GUIDE.md` is version-controlled, synced via `sync-to-global.mjs`, internally consistent (`DRW-01`~`DRW-08`), and backed by `drawio-toolkit.mjs` L2 checks. |
| **REQ-02** | Any Agent using the Draw.io system MUST read this guide first | `skills/drawio-mcp/SKILL.md`, `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` explicitly mandate reading `USER_HARD_RULES_GUIDE.md` before any Draw.io operation, verified by automated tests. |
