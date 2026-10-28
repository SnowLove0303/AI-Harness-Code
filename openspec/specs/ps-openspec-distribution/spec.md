# ps-openspec-distribution Specification

## Purpose
The Ps-openspec distribution packages the complete OrbitStack PStack + OpenSpec system as an identifiable, verifiable release artifact and publishes its source changes on a non-destructive branch.

## Requirements

### Requirement: Formal distribution identity
The distribution MUST use the formal name Ps-openspec and identify this release as V2.00 while retaining a valid machine-readable package version.

#### Scenario: Build V2.00 archive
- **WHEN** the package build runs for this release
- **THEN** it produces a uniquely named Ps-openspec V2.00 archive and the manifest reports a compatible machine version

### Requirement: Complete package contents
The release archive MUST include the complete pinned PStack upstream subtree, the OpenSpec integration adapter, routing audit, and installer required to install the full system.

#### Scenario: Inspect package archive
- **WHEN** the generated archive is inspected
- **THEN** it contains the pinned PStack poteto-mode entry, complete upstream mirror, adapter, and installer

### Requirement: Preserve existing project and repository content
Packaging and installation MUST preserve existing repository files, project-specific AGENTS instructions, architecture facts, build commands, and history.

#### Scenario: Package existing repository
- **WHEN** V2.00 changes are added to the source repository
- **THEN** pre-existing files remain present and unchanged except for explicitly listed release-facing metadata/documentation

### Requirement: Publish through a new branch only
The V2.00 source changes MUST be pushed to the user-authorized Ps-openspec branch without force-updating it or publishing a tag, release, or PR unless separately requested.

#### Scenario: Push the authorized V2.00 branch
- **WHEN** the package and checks pass and the user has authorized the branch
- **THEN** the verified commit is pushed to that branch, its remote SHA matches the local commit, the default branch remains unchanged, and no tag, release, or PR is created
