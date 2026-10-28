# Tasks

## 1. Inventory and route contract
- [x] 1.1 Enumerate all 23 playbooks from the pinned PStack source and verify the expected IDs against the upstream tree. Structural audit reports 23 upstream playbooks with no missing, extra, or duplicate routes.
- [x] 1.2 Add one authoritative route registry with OpenSpec, gates, task source, host mapping, and evidence fields for every playbook. Registry is `docs/pstack-openspec-route-map.json`; OpenSpec `tasks.md` remains the sole durable task source.
- [x] 1.3 Update the global and repository Codex adapter to use the registry as a complete crosswalk without changing upstream PStack files. Adapter and route registry global mirrors match repository SHA-256.

## 2. Audit harness
- [x] 2.1 Update the structural audit to fail on missing/duplicate/stale routes and malformed/missing fields. `scripts/audit-pstack-openspec-routing.ps1` passes against the repository OpenSpec root and global registry.
- [x] 2.2 Add a realistic prompt fixture for every playbook and OpenSpec/gate acceptance checks. All 23 fixtures and expected mappings are in the authoritative registry.
- [x] 2.3 Run a Subagent against all prompt fixtures using the global OrbitStack entry, record expected and observed routes and gate results, then independently audit its results. Independent classification matched 23/23; evidence boundary and method are recorded in `docs/pstack-openspec-route-evaluation.md`.

## 3. Verification and closeout
- [x] 3.1 Run the structural audit, prompt fixture evaluation, OpenSpec strict validation, PStack mirror parity, and project-preservation checks. Structural audit, `openspec validate --all --strict`, `git diff --check`, and 573-file SHA-256 mirror comparison pass; PowerShell/Bash scripts parse, and isolated installer smoke confirms 573 upstream files plus all 23 routes while preserving existing AGENTS.md content.
- [x] 3.2 Correct failures and rerun the full audit until all playbook mappings pass or explicitly identify an upstream-host limitation with evidence. First-pass multi-phase route was corrected to the PStack `figure-it-out` fallback; remaining host-dependent behavior is explicitly marked as unmeasured in the audit.
- [ ] 3.3 Archive this OpenSpec change and push the verified update to the existing Ps-openspec V2.00 release branch; preserve existing branch history.
