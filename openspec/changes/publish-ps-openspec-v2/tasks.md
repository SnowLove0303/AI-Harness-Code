# Tasks

## 1. Release metadata and package
- [x] 1.1 Update bundle identity/version and release-facing documentation to Ps-openspec V2.00; verify manifest and release labels agree.
- [x] 1.2 Update packager to produce Ps-openspec-V2.00.zip with complete PStack, OpenSpec context/spec, adapter, installers, and audit file; inspect archive contents.

## 2. Validation
- [x] 2.1 Run OpenSpec strict validation, route audit, package neutrality guard, PowerShell parser checks, package build, and archive content inspection; checks passed.
- [x] 2.2 Review Git status/diff and confirm no deleted files, unrelated project configuration changes, or changes to package.json/pnpm-lock.yaml.

## 3. New-branch publication
- [ ] 3.1 Confirm release branch does not already exist, create release/ps-openspec-v2.00, and commit the scoped full system plus V2.00 updates.
- [ ] 3.2 Push only the new branch to origin and verify the remote branch head equals the local commit; do not merge, tag, open PR, or publish a release.

## 4. Close
- [ ] 4.1 Archive this OpenSpec change after publication verification and report branch, commit, artifact, checks, and remaining items.
