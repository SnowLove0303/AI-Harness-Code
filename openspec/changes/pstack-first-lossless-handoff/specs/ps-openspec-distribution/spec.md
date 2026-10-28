# Spec Delta

## MODIFIED Requirements

### Requirement: Formal distribution identity
The distribution MUST use the formal name Ps-openspec and identify this release as V2.00 while retaining a valid machine-readable package version.

#### Scenario: Build V2.00 archive
- **WHEN** the package build runs for this release
- **THEN** it produces a uniquely named Ps-openspec V2.00 archive and the manifest reports a compatible machine version

### Requirement: Publish through a new branch only
The V2.00 source changes MUST be pushed to the user-authorized Ps-openspec branch without force-updating it or publishing a tag, release, or PR unless separately requested.

#### Scenario: Push the authorized V2.00 branch
- **WHEN** the package and checks pass and the user has authorized the branch
- **THEN** the verified commit is pushed to that branch, its remote SHA matches the local commit, the default branch remains unchanged, and no tag, release, or PR is created
