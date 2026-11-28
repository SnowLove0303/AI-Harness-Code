# PStack and OpenSpec V3.00 Quickstart

PStack controls task routing and execution. OpenSpec stores persistent requirements, tasks, evidence, and archive history. V3.00 packages a Single-Entry Hub for Antigravity/Gemini alongside cross-harness installers for Codex, Claude Code, and Cursor.

## 1. Antigravity / Gemini Global Setup

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-to-global.ps1
npm run guard:single-entry-hub
```

This deploys:
- `~/.gemini/config/GEMINI.md` (~4 KB single-entry switch)
- `~/.gemini/config/skills/orbitstack-pstack-openspec/` (sole auto-loaded entry skill)
- `~/.gemini/ps-hub/` + `~/.gemini/ps-toolbox-index.json` (on-demand skills, 82-axiom reference, and L2 guard scripts)

## 2. Install into Any Project (Codex / Claude Code / Cursor / Gemini)

Windows:
```powershell
.\scripts\install-to-harness.ps1 -TargetDir "D:\MyProject" -SkillLocation all
```

Linux or macOS:
```bash
./scripts/install-to-harness.sh /path/to/my-project all
```

## 3. Verify Setup

```powershell
openspec context --json
openspec list --specs
npm run guard:single-entry-hub
```
