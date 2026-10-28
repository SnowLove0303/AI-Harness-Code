# Design

## Context

See proposal.md. The existing package keeps OrbitStack folder paths for compatibility; the public artifact identity can change independently. The current branch contains the uncommitted full PStack/OpenSpec integration that must be included in the new release branch.

## Goals / Non-Goals

**Goals:**
- Provide one unambiguous V2.00 archive name and machine version.
- Package the full mirror and adapter from the current repository tree.
- Preserve original Git history and publish only a new branch.

**Non-Goals:**
- No merge, PR, Git tag, GitHub Release, npm publish, or deletion of existing package artifacts.
- No changes to unrelated project-local configurations or global Codex files.

## Decisions

- Keep legacy internal bundle paths where installers depend on them; set manifest identity to `ps-openspec`, machine version `2.0.0`, and display version `V2.00`.
- Name the zip `Ps-openspec-V2.00.zip` and package the complete `bundle/`, `orbitstack-codex/`, installer, and routing audit using a temporary staging directory.
- Before branch creation, verify the worktree diff is scoped to the current system, packaging changes, and OpenSpec records. Create `release/ps-openspec-v2.00` from the current branch head plus working changes, commit, and push that branch only.
- Keep the current OrbitStack source directory and existing package versions; do not remove or overwrite prior artifacts.

## Risks / Trade-offs

- The machine version format differs from the user-facing V2.00 label. Keep them explicitly mapped in one manifest field pair.
- GitHub push is an external write. It is authorized by the user request but must happen only after local package and repository checks pass.
