# Proposal

## Why

OrbitStack currently reimplements a large workflow layer while omitting the complete upstream PStack skill and playbook set. This creates drift, duplicated routing rules, and weak compatibility with PStack's host-specific capabilities. The requested target is a complete, version-pinned PStack mirror with a Codex adapter and OpenSpec as the sole durable change/spec/task lifecycle.

## What Changes

- Vendor the complete official `cursor/plugins/pstack` tree at a pinned commit without editing upstream content.
- Add a Codex routing adapter that maps PStack playbooks and agent roles onto capabilities actually available in Codex.
- Integrate OpenSpec as the unique persistent source of project change intent, requirements, tasks, verification, and archive state.
- Preserve OrbitStack user-confirmation and dual-checklist gates, project-local facts/build commands, and existing project configuration.
- Add an initial-task routing audit covering representative task classes and recording expected route, OpenSpec treatment, gates, and evidence.

## Capabilities

### New Capabilities
- `orbitstack-pstack-routing`: Complete PStack-based task routing with Codex host adaptation and OpenSpec lifecycle integration.

### Modified Capabilities


## Impact

Affected: the PStack bundle and Codex integration in this repository, its OpenSpec specifications, and the Codex global skill/rule installation. No unrelated project workspace configuration is to be overwritten. PStack upstream files remain byte-identical to the pinned source; local adaptation lives outside that subtree.
