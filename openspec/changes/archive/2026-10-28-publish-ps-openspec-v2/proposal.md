# Proposal

## Why

The repository now contains the complete PStack + OpenSpec OrbitStack system, but its bundle identity and generated archive still use the legacy OrbitStack name and version. The user requested a formal Ps-openspec V2.00 package on a new GitHub branch while preserving every existing repository file and history.

## What Changes

- Rename the distributable identity to `Ps-openspec`, with display release version `V2.00` and machine version `2.0.0`.
- Build a versioned archive containing the complete pinned PStack mirror, OpenSpec adapter, audit material, and safe installer.
- Update release-facing README/quickstart/installer labels without removing legacy source content or project facts.
- Commit all current complete-system changes and V2.00 packaging changes on `release/ps-openspec-v2.00`, then push that new branch to `origin` without force-pushing, merging, tagging, or opening a PR.

## Capabilities

### New Capabilities
- `ps-openspec-distribution`: Produce and publish a versioned complete Ps-openspec distribution while preserving the source repository.

### Modified Capabilities

## Impact

Affected are the bundle manifest, package naming/build script, release-facing documentation, and the new branch commit. Existing repository files and history remain intact. Global Codex installation and unrelated project configuration are not changed by this release task.
