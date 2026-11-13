# Design

## Context

See `proposal.md` for the user's requested global migration. The current Codex global `AGENTS.md`, `Agent.md`, 573-file PStack mirror, and `orbitstack-pstack-openspec` adapter already match the repository source byte-for-byte. The global route map does not. Three older skills named `pstack-openspec`, `ai-harness-openspec`, and `spec-driven-workflow` remain active and contain Gemini or OpenSpec-first workflow text. The global `openspec-*` skills provide proposal, apply, sync, and archive operations used by the PStack adapter.

## Goals / Non-Goals

**Goals:**
- Make the Codex global route map byte-identical to the repository source.
- Remove old broad workflow prompts from active skill discovery while keeping a reversible backup.
- Preserve the OpenSpec skills that perform lifecycle operations under PStack routing.

**Non-Goals:**
- Re-copy the PStack mirror, Codex adapter, `AGENTS.md`, or `Agent.md` because their hashes already match.
- Delete global OpenSpec action skills, change the Codex account config, or change any project source.
- Add a second workflow or change the repository's OpenSpec specifications.

## Decisions

Use the repository's global source map at `docs/pstack-openspec-route-map.json` for `C:\Users\Administrator\.codex\pstack-openspec-route-map.json`. Back up the previous route map before replacing it.

Move the three legacy broad workflow directories to a unique backup under `.codex/skill-backups/`. A move preserves their files and removes them from active skill discovery. Keep the six `openspec-*` action skills because `orbitstack-pstack-openspec/SKILL.md` calls them for OpenSpec lifecycle operations. Keep `orbitstack-pstack-openspec`, the pinned upstream tree, and global instructions in place because each is already identical to repository source.

A second OpenSpec-led workflow would remain available by skill-name discovery and could compete with the adapter. Deleting the OpenSpec operation skills would break the adapter's proposal, apply, sync, and archive steps. Backing up only the three broad legacy skills resolves both cases.

## Risks / Trade-offs

- [Risk] Moving a legacy skill changes global skill discovery → Move its full directory to a timestamped backup so it can be restored.
- [Risk] Copying the wrong route registry could silently select a stale playbook mapping → Verify the global SHA-256 matches the repository file after copying.

## Evidence and preservation

- Repository branch: `codex-adaptation` at `f6b2d283662e27efcd34e8a167eeeead06510df3` before this global-install task.
- Global route map source hash: `5DAF25EB6C46C596DC54681318B97687A7229590D56E2D284A2D7AEEB8F84D3E`; old global hash: `458250CBFC603CEB33128413832F01E443F564553D6647E98A943AC5502A92A7`.
- The global PStack tree has 573 files and matches the repository tree. The Codex adapter, `AGENTS.md`, and `Agent.md` also match their source hashes.
- Writable global paths: route map file and the three named legacy skill directories, moved to backup.
- Protected global paths: `pstack-upstream/`, `skills/orbitstack-pstack-openspec/`, `AGENTS.md`, `Agent.md`, and the `openspec-*` action skills.
- Acceptance: byte-identical hashes for the route map and preserved sources; legacy entries absent from active `skills/` and present under the backup; OpenSpec action skills remain installed; `openspec validate --all --strict` passes.

## Execution evidence

- Repository branch: `codex-adaptation` at `f6b2d283662e27efcd34e8a167eeeead06510df3` before this global-application change.
- Source paths: `bundle/pstack-upstream/`, `orbitstack-codex/SKILL.md`, `docs/pstack-openspec-route-map.json`, root `AGENTS.md`, and `Agent.md`.
- Global targets: `C:\Users\Administrator\.codex\pstack-upstream`, `C:\Users\Administrator\.codex\skills\orbitstack-pstack-openspec`, `C:\Users\Administrator\.codex\pstack-openspec-route-map.json`, `C:\Users\Administrator\.codex\AGENTS.md`, and `Agent.md`.
- Initial measurements: PStack global tree 573 files with 0 missing, 0 different, and 0 extra. Codex adapter tree 1 file with 0 missing, 0 different, and 0 extra. Global `AGENTS.md` and `Agent.md` both match repository source. Global route-map SHA-256 was `458250CBFC603CEB33128413832F01E443F564553D6647E98A943AC5502A92A7`; repository source SHA-256 was `5DAF25EB6C46C596DC54681318B97687A7229590D56E2D284A2D7AEEB8F84D3E`.
- Global legacy skill directories: `pstack-openspec`, `ai-harness-openspec`, and `spec-driven-workflow`. The active global AGENTS, Codex adapter, and OpenSpec action skills contain no references to these legacy skill paths. The OpenSpec action skills remain required by the adapter's lifecycle section.
- The global route map and the three legacy skill directories will be backed up before any write.
