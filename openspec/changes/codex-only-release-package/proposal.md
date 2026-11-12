# Proposal

## Why

The V2.10 release already contains the full pinned PStack source, Codex adapter, route registry, and target-aware installer. The Codex archive builder still includes a Gemini-specific system document, and there is no direct package command for the Codex target.

## What Changes

- Add a `pack:codex` command that invokes the existing package builder with its Codex target.
- Include the Gemini-specific system reference only in the Gemini archive.
- Document the Codex package command and its versioned output.

## Capabilities

### New Capabilities

### Modified Capabilities
- `ps-openspec-distribution`: Define the contents and build command for the dedicated Codex archive.

## Impact

Changes `package.json`, `scripts/package-bundle.ps1`, the root README, the Changesets queue, and the `ps-openspec-distribution` spec. The pinned PStack mirror, shared Codex adapter, route registry, and existing V2.10 archives remain unchanged.

## Request Record

Original user request (verbatim):

> [https://github.com/SnowLove0303/AI-Harness-Code](https://github.com/SnowLove0303/AI-Harness-Code) 这是我全新开发的针对Gemini Antigravity比较完整的任务执行体系，你去完整搬下来，完整改编成适配 Codex的体系，请注意，改变完后请推送到新分支，禁止污染已有仓库

Later user directives: none.
