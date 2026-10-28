# Design

## Context

The repository pins the complete upstream PStack tree and has a Codex adapter. The current route audit covers a representative subset but does not enumerate all official playbooks or evaluate actual model-selected routes.

## Goals / Non-Goals

**Goals:**
- Make one version-pinned route registry authoritative for every upstream playbook.
- Evaluate every registry entry against a task fixture and expected OpenSpec/gate behavior.
- Preserve PStack's full playbooks and OrbitStack Step 0/dual-checklist requirements.

**Non-Goals:**
- Do not edit upstream PStack content.
- Do not add a parallel task database or alter project build commands.
- Do not claim a structural test proves model runtime behavior.

## Decisions

- Use a JSON registry as the single mapping source. Each entry names the upstream skill/playbook path, task class, OpenSpec action, gate, durable task source, host mapping, and verification evidence.
- Have the audit script compare registry IDs with the pinned PStack playbook inventory and check required fields.
- Use task fixtures routed through the Codex entrypoint for behavior evaluation. Store expected and observed route, gates, OpenSpec action, and evidence in an audit result file.
- Separate structural inventory checks from behavioral evaluation results so one cannot be mistaken for the other.
- Keep PStack's `poteto-mode` as the classifier/dispatcher. The route registry is a contract and audit oracle, not a replacement router.
- Treat `figure-it-out` as a PStack fallback skill for large cross-cutting execution, not as one of the 23 playbooks. The 23 playbook IDs remain a one-to-one mapping with the upstream `poteto-mode/playbooks` inventory.

## Risks / Trade-offs

- A prompt fixture can be phrased so weakly that a route test passes while real tasks drift. Fixtures must resemble user prompts and include boundary cases.
- Some PStack playbooks depend on Cursor features. The registry must mark these as host-limited and evaluate a defined Codex fallback rather than silently omit them.
- Since the route selector is an LLM skill, deterministic script checks cannot alone prove semantic route correctness. A separate actual Codex/Subagent route run is required and its verdict must be reported honestly.
