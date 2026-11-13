# Spec Delta

## ADDED Requirements

### Requirement: Dedicated Codex distribution archive

The distribution SHALL provide a direct Codex packaging command that uses the pinned PStack source and existing Codex adapter. The Codex archive MUST contain the complete PStack mirror, its source lock, the Codex adapter, route registry, Codex-capable installer, and shared system references. It MUST exclude the Gemini-specific adapter and Gemini-only system reference. The Gemini archive MUST retain its adapter and Gemini system reference.

#### Scenario: Build the Codex archive
- **WHEN** a maintainer runs the Codex packaging command for a release whose versioned archive does not exist
- **THEN** the command creates `Ps-openspec-<releaseVersion>.zip` with the complete Codex package contents and without Gemini-only assets

#### Scenario: Preserve the Gemini archive
- **WHEN** a maintainer builds a Gemini-target archive
- **THEN** the archive still contains the Gemini adapter and Gemini system reference

#### Scenario: Inspect required Codex assets
- **WHEN** the Codex archive is inspected
- **THEN** it contains `orbitstack-codex/SKILL.md`, the pinned `skills/poteto-mode/SKILL.md`, the route registry, and the cross-platform installer

#### Scenario: Protect an existing versioned archive
- **WHEN** the Codex archive path already exists
- **THEN** the packaging command preserves it and requires an explicit force option to replace it
