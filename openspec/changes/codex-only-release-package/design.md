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

## Implementation decision trail

- Reused the existing target-aware builder. The worker changed only the Gemini-reference condition in `scripts/package-bundle.ps1` and committed `3d438ce7a8dbd00a84ae4fa77a844264a33a3960` on isolated branch `codex-codex-package`. The parent reviewed that single-file diff before cherry-picking it as `d45ae1b`.
- Added `pack:codex` to `package.json` and documented the Codex target in the root README. No Changesets entry was added because the root package is not part of the pnpm workspace and the npm package is unchanged.
- Code Review Graph was built against the worker commit `3d438ce7a8dbd00a84ae4fa77a844264a33a3960`. It reported 0 affected flows, 0 changed functions, 0 test gaps, and risk 0.00 for the package-builder condition.
- Measured package verification: Codex ZIP has 743 entries including directories and 573 PStack files. Gemini ZIP has 745 entries including directories and 573 PStack files. The Codex ZIP contains `orbitstack-codex/SKILL.md` and excludes `orbitstack-gemini/SKILL.md` and `docs/ps-openspec-gemini-system.md`. The Gemini ZIP retains its adapter and Gemini system reference and excludes the Codex adapter.
- The package builder automatically invoked the repository's Gemini global synchronization script after Gemini packaging. It reported `Total files updated: 0`. The committed V2.10 ZIPs remained unchanged.
- The first temporary output path was too deep for the staging copy and failed. Re-running with the shorter temporary root `C:\cc075f5` built both archives successfully.

## Final review evidence

- Measured: `pnpm pack:codex -- -OutDir <short-temp-dir>` and the Gemini target builder both completed. ZIP checks found 573 PStack files in each archive. The Codex ZIP included its adapter and excluded the Gemini adapter and Gemini-only system reference. The Gemini ZIP retained its own adapter and system reference and excluded the Codex adapter.
- Measured: the committed `dist/Ps-openspec-V2.10.zip` and `dist/Ps-openspec-V2.10-Gemini.zip` remained unchanged because both builds used temporary output directories.
- Measured: `openspec validate --all --strict` passed. `pnpm changeset status` passed and reported no packages to bump. The root `ai-harness-code` package is not in the pnpm workspace, so no Changesets entry was added for the unrelated `@hujiale2609/ai-harness` npm package.
- Measured: Code Review Graph compared against `d45ae1b2db49b182cf14bcb9442a51cc4b166fdf`, analyzed five changed paths, reported risk 0.00, zero changed functions, zero test gaps, and zero affected flows.
- Measured: `code --reuse-window` opened the project and `code --reuse-window --diff` opened the `scripts/package-bundle.ps1` change against the release base.
- Measured: the Gemini build invoked the existing global synchronization hook, which reported `Total files updated: 0`.
- Measured: an initial build into a longer temporary path failed during staging copy. Re-running in the shorter `C:\cc075f5` temporary directory built both archives successfully.

## Branch delivery

- Measured: the new `codex-adaptation` branch was pushed to `origin` at `c7319f31033079b9773efc036d16147b6ef3c9f8`.
- Measured: `origin/codex-adaptation` resolves to the same SHA. `origin/main` remains `fac43a5411781f6a12a7511472dbf0255a42eae4` and `origin/release/ps-openspec-v2.00` remains `dbfec446f4ab980d55413fd872aece2e8138ba8c`.
- The user requested a branch push only. No pull request, tag, or release was created.
