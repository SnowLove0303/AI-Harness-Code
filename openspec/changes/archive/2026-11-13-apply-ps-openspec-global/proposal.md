# Proposal

## Why

Codex global instructions, the pinned PStack mirror, and the Codex adapter already match the repository source, but the global route map is stale and three legacy broad workflow skills still expose Gemini or OpenSpec-only instructions. Backing up those conflicting skill entries and syncing the route map makes the global PStack adapter the single task-routing entry point while keeping OpenSpec action skills available as supporting tools.

## What Changes

- Copy the repository route map to the configured global route-map path after backing up the current global copy.
- Move the global `pstack-openspec`, `ai-harness-openspec`, and `spec-driven-workflow` directories into a timestamped backup.
- Keep the Codex adapter, pinned PStack tree, PStack-first global instructions, and OpenSpec operation skills in place.

## Capabilities

### New Capabilities

### Modified Capabilities

This task changes machine-local Codex configuration only. It does not change repository behavior, so `.openspec.yaml` declares `skip_specs: true`.

## Impact

Updates `C:\Users\Administrator\.codex\pstack-openspec-route-map.json` and moves three legacy skills under `C:\Users\Administrator\.codex\skill-backups\`. The current repository's PStack upstream, Codex adapter, global rules, OpenSpec operation skills, and remote source branches remain unchanged.

## Request Record

Original user request (verbatim):

> [https://github.com/SnowLove0303/AI-Harness-Code](https://github.com/SnowLove0303/AI-Harness-Code) 这是我全新开发的针对Gemini Antigravity比较完整的任务执行体系，你去完整搬下来，完整改编成适配 Codex的体系，请注意，改变完后请推送到新分支，禁止污染已有仓库

Later directives (chronological):

> 继续
>
> Codex全局应用Ps-openspec 体系，替换原来的单openspec体系
>
> 允许
