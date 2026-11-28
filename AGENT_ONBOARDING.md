# Ps-openspec V3.00 — Agent Out-of-the-Box Onboarding & Configuration Guide

> **For any AI Agent or Engineer reading this file**: Ps-openspec V3.00 integrates Lauren Tan's pinned **PStack** (`bundle/pstack-upstream/`), **OpenSpec**, and **AI-Harness** L2 guards into a **Single-Entry Hub** that preserves 100% of governance rigor while eliminating always-on token bloat.

---

## 1. Antigravity (Google Gemini) — Out-of-the-Box Setup & Surface Adjustments

Antigravity loads `GEMINI.md`, `rules/*.md`, `plugins/`, and `<skills>` metadata on every turn. To avoid 200+ KB truncation and 3x–4x quota drain, V3.00 structures Antigravity's 5 surfaces as follows:

| Surface | Path | V3.00 Role & Adjustment | Per-Turn Overhead |
| :--- | :--- | :--- | :--- |
| **`GEMINI.md`** | `~/.gemini/config/GEMINI.md` | **Sole always-on global switch** (~4 KB, capped at 16 KB by `guard:single-entry-hub`). Enforces Dual-Gate SOP, Ps-openspec Tool Routing, and Role Boundaries + Subagent/Swarm Reuse. | ~4 KB (zero truncation) |
| **`AGENTS.md`** | `<repo>/AGENTS.md` | **Project-level constitution**. Read on-demand when working in a repository; never duplicated into global `GEMINI.md`. | 0 global overhead |
| **`rules`** | `~/.gemini/config/rules/` (global) vs `<project>/.agent/rules/` (local) | **Keep global `config/rules/` clean**. Archive duplicate `ps-openspec-v210-governance.md` and `openspec-mandatory.md`; place project-specific rules inside `<project>/.agent/rules/`. | 0 duplicate rules |
| **`plugin`** | `~/.gemini/config/plugins/` | Enable only plugins active in the current workflow. Remove duplicate `openspec-*` copies from `<project>/.agents/skills/` when the `openspec` plugin is active. | Minimal MCP/skill headers |
| **`skill`** | `~/.gemini/config/skills/` vs `~/.gemini/ps-hub/skills/` | Register **only 1 entry skill** (`orbitstack-pstack-openspec`) in `~/.gemini/config/skills/`. Store all other Ps-openspec skills and L2 scripts in `~/.gemini/ps-hub/` (indexed by `~/.gemini/ps-toolbox-index.json`) and private/local skills in `~/.gemini/ps-toolbox/` (`local-index.json`). | 1 skill entry |

### One-Command Antigravity Global Sync
```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-to-global.ps1
npm run guard:single-entry-hub
```

### How an Antigravity Agent Executes a Task in V3.00
1. **Step 0 (Gate 1)**: Capture raw request verbatim, present 1:1 RTM + Proactive Proposals, and halt for user confirmation (read-only `Investigation` routes skip Gate 1). If the input is a **Problem/Issue Task** (errors, defects, audit findings, repair requests), Gate 1 also establishes a detailed `[ISSUE-01]..[ISSUE-K]` ledger (symptom/repro, anchor, Root Source vs. Consumer Sink, acceptance criteria) with append-only multi-turn merging and mandatory counter-questioning on any unruled `pending_ruling` items.
2. **Step 1 (Explore)**: Query `~/.gemini/pstack-openspec-route-map.json` to bind a PStack Playbook, and look up `~/.gemini/ps-toolbox-index.json` (plus `~/.gemini/ps-toolbox/local-index.json` if needed) to `read_file` only the relevant skill/reference.
3. **Step 2 (Gate 2)**: Author OpenSpec artifacts (`proposal.md`, `specs/`, `design.md`, `tasks.md` — 1:1 bijective task block per `[ISSUE-xx]`) + Dual-Checklist, and halt for approval.
4. **Step 3–5 (Apply, Verify, Archive)**: Main agent executes routine changes directly under `[-]` lock (dispatch subagents/Swarm only for bulk context shielding, parallel fan-out, or contested `/interrogate`; reuse existing same-role agents first). Run zero-token L2 guards (`~/.gemini/ps-hub/scripts/check-*.mjs`), open VS Code Diff, deliver 1:1 checkoff (plus an item-by-item **Issue Ledger Final Audit Confirmation Table** for Problem Tasks, explicitly inviting user confirmation), and run `openspec validate --all --strict`.

---

## 2. Cross-Harness Out-of-the-Box Setup (Codex, Claude Code, Cursor & Others)

Ps-openspec V3.00 ships with cross-platform installers that inject the pinned PStack source, route registry, OpenSpec setup, and harness-specific adapters into any target project:

- **Windows PowerShell**:
  ```powershell
  .\scripts\install-to-harness.ps1 -TargetDir "D:\MyProject" -SkillLocation all
  ```
  (`-SkillLocation` accepts `agents`, `gemini`, `claude`, `cursor`, or `all`.)
- **Linux / macOS**:
  ```bash
  ./scripts/install-to-harness.sh /path/to/my-project all
  ```

### Harness Entrypoints
| Harness | Entry / Constitution | Skill Discovery Path | OpenSpec Init |
| :--- | :--- | :--- | :--- |
| **Antigravity / Gemini** | `~/.gemini/config/GEMINI.md` | `~/.gemini/config/skills/orbitstack-pstack-openspec/` + `~/.gemini/ps-toolbox-index.json` | `openspec init --tools gemini` |
| **Codex** | `Agent.md` / `AGENTS.md` | `.agents/skills/openspec-*` + `orbitstack-codex/SKILL.md` | `openspec init --tools codex` |
| **Claude Code** | `CLAUDE.md` / `AGENTS.md` | `.claude/skills/` | `openspec init --tools claude` |
| **Cursor** | `.cursor/rules/` / `AGENTS.md` | `.cursor/skills/` + `bundle/pstack-upstream/` | `openspec init --tools cursor` |

---

## 3. Source Locations & Package Verification

- Complete system reference: `docs/ps-openspec-system.md` and `docs/ps-openspec-gemini-system.md`
- PStack upstream mirror: `bundle/pstack-upstream/` (`bundle/pstack-upstream.lock.json`)
- Toolbox & route registries: `docs/toolbox-index.json`, `docs/pstack-openspec-route-map.json`
- Handoff capsule tool: `scripts/pstack-handoff.mjs`

```powershell
openspec validate --all --strict
npm run guard:single-entry-hub
.\scripts\audit-pstack-openspec-routing.ps1
node --test scripts/tests/pstack-handoff.test.mjs scripts/tests/sync-to-global.test.mjs tests/single-entry-hub.test.mjs
```
