# Design: Autonomous Swarm & Subagent Proactive Dispatch Architecture

## Context & Problem Formulation
In previous iterations, we codified Axiom 56 (Lead Agent Orchestration & Swarm Decoupling) and Axiom 58 (Lead Agent Identity Self-Awareness). However, observation revealed that Lead Agents frequently experience "Role Amnesia" or "Activation Energy Barrier":
1. **Tool Ingestion Bias**: Native agent scaffolding provides direct edit tools (`edit_file`, `write_file`), prompting agents to bypass Swarm due to lower cognitive resistance.
2. **Dispatch Tooling Friction**: Parameter uncertainty (such as `workspace="share"` failing on non-standard VCS, or model selection dilemmas) causes agents to abandon worker dispatch.
3. **Tool Confusion**: Overlapping boundaries between `invoke_subagent` (platform subagents) and `swarm` (collaborative message-board workers) create decision paralysis.

## Architectural Decision
We architect a **Zero-Friction Dual-Engine Dispatch Architecture** comprising three foundational pillars:

```text
┌────────────────────────────────────────────────────────────────────────┐
│             【Dual-Engine Deterministic Dispatch Architecture】          │
│                                                                        │
│   🌐 Engine A: Visual / UI Subagent (invoke_subagent)                  │
│      • Trigger: Browser interaction, UI bug reproduction, DOM visuals │
│      • Target: `invoke_subagent(TypeName="browser", ...)`              │
│                                                                        │
│   🐝 Engine B: Engineering Swarm (swarm)                               │
│      • Trigger: Code editing, refactoring, tests, adversarial audit    │
│      • Target: `swarm(action="add", workspace="inherit", ...)`        │
│      • Baseline: Default model inheritance, zero VCS friction          │
│                                                                        │
│   🔒 Structural Task Gate: `tasks.md` Delegation Ticketing             │
│      • Mandatory annotation: `[-] [Swarm: <name>]` or `[Subagent: <T>]`│
│      • Static validation rejects monolithic untargeted tasks           │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Dual-Engine Dispatch Router Matrix
| Task Dimension | Primary Tool | Target Persona / Type | Default Workspace |
| :--- | :--- | :--- | :--- |
| **UI Interaction / Browser Reproduction** | `invoke_subagent` | `browser` | Built-in sandbox |
| **Code Implementation & Refactoring** | `swarm` | Worker (`<feature>-impl`) | `workspace="inherit"` |
| **Automated Testing & L2 Linters** | `swarm` | Tester (`<feature>-test`) | `workspace="inherit"` |
| **Adversarial / Falsification Audit** | `swarm` | Auditor (`<feature>-audit`) | `workspace="inherit"` |

### 2. Mandatory Delegation Ticketing in `tasks.md`
To eliminate Lead Agent monolithic temptation at the planning phase, every implementation task in Step 2 `tasks.md` must be explicitly tagged:
- Correct: `- [ ] [Swarm: worker-auth] Implement token verification handler in src/auth.ts`
- Correct: `- [ ] [Subagent: browser] Reproduce UI button unclickable issue on /login`
- Strictly Rejected: `- [ ] Implement token verification handler` (Lacks delegation target)

### 3. Scope & Blast Radius
- `GEMINI.md`: Codify constitutional Axiom 61.
- `skills/pstack-openspec/SKILL.md`: Synchronize Axiom 61.
- `skills/ai-harness-openspec/SKILL.md`: Synchronize Axiom 61.
- `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs`: Create comprehensive L2 automated test suite.
- `scripts/tests/gemini-adapter.test.mjs`: Add regression test assertion.
