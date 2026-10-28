# Ps-openspec V2.00

This release combines the complete pinned PStack source with OpenSpec as the only durable task record. The Codex adapter preserves PStack routing and host limits, with two OrbitStack extensions for lossless Agent handoff and protection of accepted behavior.

## Start here

- [Agent instructions](bundle/orbitstack-ps-openspec/Agent.md) and [AGENTS-compatible instructions](bundle/orbitstack-ps-openspec/AGENTS.md)
- [Codex adapter](orbitstack-codex/SKILL.md)
- [PStack upstream source](bundle/pstack-upstream/skills/poteto-mode/SKILL.md) and [pinned source lock](bundle/pstack-upstream.lock.json)
- [OpenSpec setup quickstart](bundle/orbitstack-ps-openspec/QUICKSTART.md)
- [Complete system reference](docs/ps-openspec-system.md)
- [Install into a project](scripts/install-to-harness.ps1) (Windows) or [Bash installer](scripts/install-to-harness.sh)

## Routing and protection

- [PStack route registry](docs/pstack-openspec-route-map.json)
- [Structural routing audit](docs/pstack-openspec-routing-audit.md)
- [Route evaluation and evidence boundary](docs/pstack-openspec-route-evaluation.md)
- [Lossless handoff helper](scripts/pstack-handoff.mjs)
- [Protected-invariant audit helper](scripts/audit-protected-invariants.mjs)
- [Compatibility skill and its two extensions](bundle/orbitstack-ps-openspec/skills/pstack-openspec/SKILL.md)
- [OpenSpec specifications](openspec/specs/)

The vendored PStack tree is pinned and unmodified. Project-specific OpenSpec specs, Agent instructions, architecture facts, and official domain pipelines must be preserved when installing.
