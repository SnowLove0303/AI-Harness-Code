# Design

## Context

See `proposal.md` for motivation. The V2.10 package builder already assembles the pinned 573-file PStack mirror and selects a Codex or Gemini adapter by target. It currently copies the Gemini-only system reference into both archives and has no dedicated pnpm alias for Codex.

## Goals / Non-Goals

**Goals:**
- Give maintainers a direct command for the existing Codex package target.
- Keep Codex and Gemini archive contents aligned with their selected adapters.
- Keep the existing version collision protection.

**Non-Goals:**
- Create another adapter, installer, or PStack source copy.
- Change the pinned upstream PStack tree or existing V2.10 archive.
- Publish a package, tag, or release.

## Decisions

1. **Reuse the existing target-aware package builder.** Add a pnpm alias for `-TargetHarness codex`. This keeps archive assembly, version naming, and collision handling in one script. A separate Codex bundler was rejected because it would duplicate the file inventory and drift from the existing Gemini and all-harness targets.
2. **Copy the Gemini system reference only for the Gemini target.** Shared PStack, OpenSpec, route, and audit documents remain in both archives. The Gemini-only reference belongs only in `Ps-openspec-<releaseVersion>-Gemini.zip`.
3. **Leave the versioned archive untouched during verification.** Build into a fresh temporary output directory. Do not pass `-Force` for the repository's committed V2.10 archive.

## Risks / Trade-offs

- [Risk] The archive contents change while the release version remains V2.10 → Build the verification archive in a temporary directory and keep the committed versioned artifact unchanged. Apply the next release version through the existing release process.
- [Risk] A target-specific asset can be accidentally added to both archives later → Keep the conditional in the single package builder and verify required and excluded ZIP entries for both harness targets.

## Source selection and architecture review

The repository's default `main` branch predates the pinned PStack mirror and the `orbitstack-codex/SKILL.md` entry named in the project instructions. This change uses `release/ps-openspec-v2.00`, whose Codex packer, installer, route registry, and complete upstream mirror match those instructions.

The architecture review compared the existing target-aware builder with a new Codex-specific assembler. Two independent reviews favored reusing the existing builder. It already owns the PStack copy, route map, adapter selection, and version collision policy. A second assembler would duplicate those rules and could drift.

## Evidence and preservation

- Base commit: `dbfec446f4ab980d55413fd872aece2e8138ba8c`, branch `release/ps-openspec-v2.00`.
- Working branch: `codex-adaptation`.
- Writable paths: `scripts/package-bundle.ps1`, `package.json`, root `README.md`, `.changeset/`, and this OpenSpec change.
- Protected paths: `bundle/pstack-upstream/`, `bundle/pstack-upstream.lock.json`, `orbitstack-codex/`, `orbitstack-gemini/`, `docs/pstack-openspec-route-map.json`, and the committed V2.10 ZIP artifacts.
- Acceptance commands: `openspec validate --all --strict`; `pnpm pack:codex -- -OutDir <temporary-directory>`; `powershell -ExecutionPolicy Bypass -File scripts/package-bundle.ps1 -TargetHarness gemini -OutDir <temporary-directory>`; archive entry and path checks; `git diff --check`.
- The V2.10 Codex and Gemini archives are already tracked. Verification writes to a new temporary output directory and leaves both tracked archives untouched.
- PR creation is out of scope. The user asked for a new branch push.
