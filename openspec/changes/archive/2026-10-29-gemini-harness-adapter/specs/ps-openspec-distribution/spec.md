# Spec Delta

## ADDED Requirements

### Requirement: Dedicated Gemini distribution package
The system MUST support generating a dedicated standalone `Ps-openspec-V2.00-Gemini.zip` archive containing the Gemini adapter, pinned PStack upstream mirror, route registry with Gemini mappings, installers, and reference documentation.

#### Scenario: Build dedicated Gemini archive
- **WHEN** the package build script is invoked with the Gemini target flag
- **THEN** it generates `Ps-openspec-V2.00-Gemini.zip` in the output directory containing the complete 573-file PStack mirror, the `orbitstack-gemini` adapter, and the Gemini-aware installer

#### Scenario: Install Gemini package into target harness
- **WHEN** the installer is executed with `-SkillLocation gemini` in a target directory
- **THEN** it deploys `orbitstack-gemini` into `.gemini/skills/orbitstack-pstack-openspec/`, configures `.orbitstack/`, and injects the Gemini adapter reference into `GEMINI.md` or `AGENTS.md` without overwriting pre-existing user instructions
