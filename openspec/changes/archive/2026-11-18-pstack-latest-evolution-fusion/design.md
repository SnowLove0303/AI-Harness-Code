# Design: Pstack Latest Evolution Deep Fusion & Subagent Autonomous Rigor Architecture

## Context & Problem Formulation
The Pstack ecosystem under Lauren Tan (@poteto) has evolved with refined engineering discipline:
1. **Subagent Execution Friction**: Dispatched workers frequently stall, waiting for trivial direction or returning unvetted draft code. A dedicated, universally referenced `worker.md` resolves this by codifying execution expectations.
2. **AI Filler & Prose Degradation**: Natural language instructions alone fail to stop LLM verbose prose. A mechanical L2 AST/linter script turns prompt recommendations into hard build gates.
3. **Complex State Verification**: System state machines require formal verification to expose edge-case deadlocks and state violations before code deployment.

## Architectural Decision
We architect an integrated enhancement across three layers:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               【Pstack Latest Evolution Fusion Architecture】          │
│                                                                        │
│   📜 Constitutional & Autonomous Execution (Layer 1 & 3):              │
│      • Axiom 63 in GEMINI.md, pstack-openspec, ai-harness-openspec    │
│      • Root `worker.md`: Reversible Decision Authority + PR Standards │
│                                                                        │
│   ⚙️ Mechanical L2 Linter Enforcement (Layer 2):                       │
│      • `scripts/check-unslop-purity.mjs`: Hard exit code 1 blocker    │
│      • Intercepts filler buzzwords & ungrounded trailing participles  │
│                                                                        │
│   🔬 Formal Statechart Verification (Layer 4):                         │
│      • Formal state invariant modeling                                │
│      • Shortest error path calculation for multi-state protocols       │
│                                                                        │
│   🔍 All-Sites Defect Remediation:                                     │
│      • Systematic multi-site search ledger extending Axiom 59         │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. `worker.md` Specification Architecture
- Located at repository root `D:\APP\AI app\Antigravity\AI-Harness-Code\worker.md` and synced globally.
- Formally specifies:
  - Identity & Role (Focused Line Cook)
  - Reversible Decision Standard (Own small choices, escalate true architectural forks)
  - Zero Slop Mandate (No conversational chatter in source files)
  - Strict Exit Code 0 Verification Requirement

### 2. `scripts/check-unslop-purity.mjs` Engine Design
- Automated Node.js script.
- Scans target Markdown and source files.
- Banned AI buzzwords dictionary: `delve`, `crucial`, `landscape`, `pivotal`, `testament`, `underscore`, `vibrant`, `foster`, `enhance`, `showcase`.
- Banned ungrounded trailing participial clauses: e.g. `, ensuring `, `, highlighting `.
- Enforces strict exit code 1 upon detection.

### 3. Scope & Blast Radius
- `GEMINI.md`: Codify constitutional Axiom 63.
- `skills/pstack-openspec/SKILL.md`: Synchronize Axiom 63.
- `skills/ai-harness-openspec/SKILL.md`: Synchronize Axiom 63.
- `worker.md`: Author root-level worker constitution.
- `scripts/check-unslop-purity.mjs`: Create mechanical L2 unslop check script.
- `package.json`: Add `guard:unslop` script.
- `tests/pstack-latest-evolution-fusion.test.mjs`: Create automated L2 test suite.
- `scripts/tests/gemini-adapter.test.mjs`: Add regression test assertion.
