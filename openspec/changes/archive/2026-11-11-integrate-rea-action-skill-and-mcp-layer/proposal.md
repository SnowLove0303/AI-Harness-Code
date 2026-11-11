# Proposal: Integrate REA Reverse Engineering Action Skill & MCP Layer

## Why

Ps-openspec designates Section 3 as the Graph-Driven Methodology Governance and Action Skill Layer (`### 3.1 核心方法论原子技能库索引`), reserved for executable capability pillars (such as `desktop-exe-development` and `ui-ux-design-engineering`). Reverse engineering is a critical discipline for security auditing, protocol recovery, and closed-source software inspection.

The open-source project REA (`morluto/rea` / `rea-agents`) provides an agent-first reverse-engineering suite with a standard Model Context Protocol (MCP) server offering 50+ atomic reverse engineering tools across binaries, Electron, JavaScript, and Android.

This change provisions REA into the system runtime, connects its MCP server to the agent environment, authors the standardized Action Skill `skills/rea-reverse-engineering/SKILL.md`, and indexes it in `GEMINI.md` and living specifications with regression test coverage.

## Original user request

> 装REA，还记得我们给Ps-openspec预留的那个工具手脚层吗

- **Fact Fingerprint SHA-256**: `5b26242e59ccc394d8f22d9d590e81c6bcd10bad45c05fbce7d1f387841944e0`
- **Gate 1 Ingestion Dossier**: [`2026-11-11-rea-reverse-engineering-action-skill-GATE1.md`](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/gate1-dossiers/2026-11-11-rea-reverse-engineering-action-skill-GATE1.md)

## What Changes

- Install `rea-agents` globally and verify CLI availability (`rea --version`, `rea doctor`).
- Register `rea` MCP Server in `mcp_config.json` (`C:\Users\Administrator\.gemini\antigravity\mcp_config.json` & `C:\Users\Administrator\.gemini\config\mcp_config.json`).
- Create standard Action Skill `skills/rea-reverse-engineering/SKILL.md` in repository and sync to global config.
- Index `rea-reverse-engineering` in `GEMINI.md` and `skills/pstack-openspec/SKILL.md` under Section 3.1.
- Update `openspec/specs/orbitstack-pstack-routing/spec.md` with REA Action Skill requirements.
- Add Test 47 in `scripts/tests/gemini-adapter.test.mjs` verifying skill metadata, MCP server config, and index integrity.
- Execute full test suite, sync to global, and package release bundle.

## Append directives

- 装REA，还记得我们给Ps-openspec预留的那个工具手脚层吗

## Capabilities

### New Capabilities
- `rea-reverse-engineering`: Standardized Action Skill for reverse engineering native binaries, Electron applications, web bundles, and Android APKs via REA CLI and MCP tools.

### Modified Capabilities
- `orbitstack-pstack-routing`: Codify REA Action Skill and MCP server integration requirements.

## Impact

- `mcp_config.json`
- `skills/rea-reverse-engineering/SKILL.md`
- `GEMINI.md`
- `skills/pstack-openspec/SKILL.md`
- `openspec/specs/orbitstack-pstack-routing/spec.md`
- `scripts/tests/gemini-adapter.test.mjs`
