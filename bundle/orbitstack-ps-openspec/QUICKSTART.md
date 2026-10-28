# PStack and OpenSpec quickstart

PStack controls task routing and execution. OpenSpec stores persistent requirements, tasks, evidence, and archive history. The installer configures the OpenSpec skills for the selected Harness and preserves existing project files.

## Install into a project

Windows:

```powershell
.\scripts\install-to-harness.ps1 -TargetDir "D:\MyProject" -SkillLocation agents
```

Linux or macOS:

```bash
./scripts/install-to-harness.sh /path/to/my-project agents
```

The installer checks the OpenSpec CLI and Node.js version, initializes OpenSpec from the target root, verifies the resolved root, then installs the pinned PStack source, route registry, and Codex adapter. It does not install runtimes or edit shell startup files.

## Use the system

1. Start each Codex task through upstream `poteto-mode` and follow the selected playbook.
2. Run `openspec context --json` from the project root and confirm the returned path.
3. Use the installed OpenSpec skills to create or update one change and track its PStack steps in `tasks.md`.
4. For delegated work, create a PStack handoff capsule from the OpenSpec task and Git state. Keep the original user request and follow-up instructions intact.
5. Review affected code paths with Code Review Graph and run the linked regression checks for protected behavior.

## Verify setup

```powershell
openspec context --json
openspec list --specs
```

The Codex skills are installed under `.agents/skills/openspec-*`. The PStack source is stored under `.orbitstack/pstack-upstream/`, and the PStack route registry is `.orbitstack/pstack-openspec-route-map.json`.
