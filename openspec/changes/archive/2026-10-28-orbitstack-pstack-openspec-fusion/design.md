# Design

## Context

PStack is a host plugin with skills, agents, playbooks, references, docs, and plugin metadata. OpenSpec is a separate lifecycle CLI and schema system. OrbitStack already contains a PStack-inspired port and a Codex global installation; this change must replace the partial port with a complete upstream mirror and keep host adaptation separate.

## Decisions

1. Pin PStack by immutable upstream commit and preserve its entire distributable subtree under `bundle/pstack-upstream/` byte-for-byte.
2. Put all Codex routing/adaptation and OpenSpec integration in a separate `orbitstack-codex/` layer. Do not patch upstream PStack files.
3. Route tasks through PStack playbooks. Use OpenSpec only for durable project changes; playbook todos are transient execution guidance and map to the single OpenSpec `tasks.md`.
4. Preserve Step 0 and dual-checklist explicit authorization gates from the installed OrbitStack charter.
5. Modify the current global Codex rules and skills only after preserving a recoverable backup. For project installation, merge into local rules and preserve existing commands/facts instead of replacing them.
6. Keep initial routing audit data in this change's OpenSpec artifacts; avoid adding a second durable task system.

## Risks

- Cursor-specific skill calls may not exist in Codex. The adapter must map them or report a bounded fallback without deleting their upstream definitions.
- The PStack subtree is large. Hash parity and a complete path manifest are required.
- OpenSpec may have different task granularity than PStack playbooks. `tasks.md` remains authoritative for durable progress; no duplicate persistent checklist is allowed.
- VS Code review MCP and PStack agent role names may be unavailable. Host support must be checked, not assumed.

## Execution findings (2026-10-28)

- Pinned upstream is `cursor/plugins/pstack` commit `c742dd61706fbacc1b95f1a20b7b988cf096ce6c`, plugin version `0.15.36`. The complete 573-file `pstack/` subtree is mirrored in both the repository bundle and Codex global vendor directory with zero hash mismatches. All 58 upstream skill directories are present in the Codex global skills directory with zero file mismatches.
- The Codex adapter is installed globally and preserves OrbitStack Step 0 and dual-checklist gates. The root installer now adds an adapter pointer to project `AGENTS.md` instead of replacing existing content. A smoke test retained a fixture build command and domain-engine invariant.
- Initial routing review found a first-pass deviation: this cross-cutting migration was first treated as a generic multi-phase plan. PStack routes large cross-cutting work to `figure-it-out`; that route was read, the audit matrix corrected, and the route audit now checks the proper skill path.
- Verification: `openspec validate orbitstack-pstack-openspec-fusion` passed; the 11-case structural PStack route audit passed; `pnpm guard:neutrality` passed; the versioned package was built and inspected to confirm it contains the full PStack source, adapter, installer, and audit document.
- Limitation: the route audit validates the full playbook destination set and adapter/gate wiring. It does not prove future model behavior by running a newly created user task; the current task's first-pass route defect is recorded above and corrected in the global entry rule.
