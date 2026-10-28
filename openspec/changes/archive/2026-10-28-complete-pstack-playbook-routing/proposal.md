# Proposal

## Why

The complete upstream PStack is present, but the current OrbitStack/OpenSpec integration maps only a subset of its playbooks and the audit only checks that route files exist. The user's target requires all PStack playbooks to be deliberately bound to OpenSpec and behaviorally evaluated, with OrbitStack gates and project facts preserved.

## What Changes

- Create one authoritative registry for all 23 upstream PStack playbooks, including OpenSpec action, gates, task source, Codex host support/fallback, and verification evidence.
- Make the Codex adapter and global entrypoint use that registry as the complete routing contract.
- Replace the partial 11-route structural audit with inventory parity and task-fixture evaluation covering all 23 playbooks.
- Keep OpenSpec the only durable project task/spec/change source; PStack todo lists remain execution guidance.

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Expand from representative route coverage to complete PStack playbook mapping and behavior-oriented route evaluation.

## Impact

Affected are the OrbitStack Codex adapter, global entry rule, route registry/audit fixtures, and the existing PStack routing capability. The immutable upstream PStack mirror, Step 0/dual-checklist gates, project-local facts/build commands, and Ps-openspec V2.00 release branch are preserved.
