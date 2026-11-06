# Proposal: Project-Canonical OpenSpec Gate 1 Dossier Directory Invariant

## Why

In previous Ps-openspec gate enforcement iterations, Step 0 Gate 1 materialized immutable `.md` dossiers into local conversation brain artifacts (such as `<appDataDir>\brain\<conversation-id>\`). While this eliminated ephemeral chat amnesia, it created an architectural decoupling between the agent's runtime environment and the project's source repository:
1. **Repository-Session Decoupling**: Conversation brain directories are host-local and not tracked in the project's Git repository. When switching agents, branching workspaces, running CI, or collaborating across devices, subsequent agents and human developers cannot access historical Gate 1 dossiers within the project.
2. **Missing Canonical Directory Structure**: Standard `openspec/` layouts historically defined `changes/` and `specs/`, but lacked a standardized, dedicated top-level directory requirement for persisting pre-change Step 0 intent dossiers.
3. **Loss of Native Provenance**: Downstream specifications (`proposal.md`, `tasks.md`) referenced host-specific absolute paths rather than deterministic project-relative paths.

To eliminate this gap, the project manager issued a binding instruction:
> "每个Agent 负责的对应的项目的openspec 上需要补一个文件夹要求，专门用来存放第一门禁产生的md文档"

This proposal legislates **公理五十一：项目级 OpenSpec 第一门禁专属物理目录规范公理 (`PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM` / `PROJECT_OPENSPEC_GATE1_DIRECTORY_INVARIANT`)**:
- **Project Canonical Directory Standard (`PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION`)**: Every project managed by an Agent must maintain a dedicated, version-controlled directory under `openspec/`: `openspec/gate1-dossiers/`.
- **Physical Ingestion & Storage Contract (`GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT`)**: All Step 0 Gate 1 dossiers must be materialized directly into `openspec/gate1-dossiers/<YYYY-MM-DD-slug>-GATE1.md` containing Section A (100% verbatim user instruction + SHA-256) and Section B (deep forensic feedback + RTM).
- **Project Directory Missing Blocker (`GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED`)**: Pipeline statically blocks any workflow attempting to modify code if the project lacks this directory or fails to persist the Gate 1 dossier inside it.
- **Native Project Asset Binding (`GATE1_TO_OPENSPEC_PROJECT_INHERITANCE`)**: Step 2 OpenSpec authoring losslessly links to this project-relative file for bidirectional auditability.
- **Universal Engineering Purity (`UNIVERSAL_GATE1_DIRECTORY_STANDARD`)**: 100% domain-neutral software engineering vocabulary.

## Original user request

> 每个Agent 负责的对应的项目的openspec 上需要补一个文件夹要求，专门用来存放第一门禁产生的md文档
> 执行

- **Fact Fingerprint SHA-256**: `d824ebc74f713dabfe44703323e7fdcbb3e6daeff9fdfa072a88973bd906c6f0`
- **Gate 1 Ingestion Dossier**: [`GATE1_INTENT_DOSSIER_PROJECT_OPENSPEC_DIRECTORY.md`](file:///C:/Users/Administrator/.gemini/antigravity/brain/f4ffcfe4-7334-4817-bf6f-7fa4c1c59770/GATE1_INTENT_DOSSIER_PROJECT_OPENSPEC_DIRECTORY.md)

## What Changes

- Legislate `PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM` (Axiom 51) in `GEMINI.md`:
  - Require `openspec/gate1-dossiers/` directory in every managed project.
  - Require Gate 1 dossiers to be saved to `openspec/gate1-dossiers/` under Git tracking.
  - Deploy `GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED` static breaker.
  - Enforce native project asset binding and domain neutrality.
- Create `openspec/gate1-dossiers/` in the local repository and archive this task's Gate 1 dossier.
- Update `skills/pstack-openspec/SKILL.md` (Axiom 53) and `skills/ai-harness-openspec/SKILL.md` (Axiom 48).
- Codify new requirements into `openspec/specs/orbitstack-pstack-routing/spec.md`.
- Add Test 43 in `scripts/tests/gemini-adapter.test.mjs` verifying the invariant matrix.
- Synchronize all assets across the system via `scripts/sync-to-global.mjs`.

## Append directives

- 每个Agent 负责的对应的项目的openspec 上需要补一个文件夹要求，专门用来存放第一门禁产生的md文档
- 执行

## Capabilities

### New Capabilities

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify project-canonical OpenSpec Gate 1 dossier directory requirement, storage contract, and missing directory circuit breaker.

## Impact

- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `skills/ai-harness-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
- `openspec/gate1-dossiers/` (new directory)
