# Design: User-Centric Behavioral Emulation & Interaction Reproduction Gate Architecture

## Context & Problem Formulation
In multi-agent systems, agents operate primarily in code-symbol space (ASTs, file strings, compiler error messages). When a human user interacts with an application, defects frequently emerge at the human-computer boundary—such as pointer occlusion, misconfigured event listeners, broken client-side routing, accessibility tree voids, or unhandled async rendering delays.

Current agent workflows suffer from "Implementation Detail Myopia": agents examine internal logic, conclude that functions and variables are syntactically sound, and fail to diagnose or reproduce actual runtime interaction bugs. Conversely, heavy browser-driven testing often requires full Chromium visual windows that steal desktop focus, interrupting user work.

## Architectural Decision
We architect a **Parallel Four-Tiered Verification Defense Grid** augmented with **Headless Behavioral Emulation**:
1. **Layer 2.1 (Compiler & AST Linter)**: Enforces syntax, strict types, zero warnings, and anti-pattern rules (e.g., forbidding raw mock event dispatching when user simulation is required).
2. **Layer 2.2 (Pure Unit & Domain Logic)**: Tests business algorithms, statechart transitions, and database/API schemas in isolation.
3. **Layer 2.3 (Headless User Behavioral Emulation - NEW)**: Runs in-memory DOM simulation (`user-event` style event cascades) evaluating interactability, pointer accessibility, and observable DOM mutations without opening visual browser windows.
4. **Layer 5 (Human Tactile Diff Review)**: Retains final human review in VS Code diff editors.

```text
┌────────────────────────────────────────────────────────────────────────┐
│               【Parallel Multi-Tiered Verification Grid】              │
│                                                                        │
│   ⚙️ Tier 1: Static Compiler & Lint (TS, ESLint --max-warnings=0)      │
│   🧪 Tier 2: Core Domain Logic & State Machine Unit Tests              │
│   🚨 Tier 3 [NEW]: Headless In-Memory User Behavioral Emulation        │
│      • Interaction Reproduction Ticket prior to code edit              │
│      • Semantic Accessibility Querying (`getByRole`, `getByLabelText`) │
│      • Full event cascade: hover -> pointerdown -> click -> mutation   │
│      • Millisecond in-memory execution (0 visual popups)               │
│   👁️ Tier 4: Human Visual Diff Tactile Gate (VS Code review)           │
└────────────────────────────────────────────────────────────────────────┘
```

## Key Protocols & Rules
1. **Behavioral Emulation Pre-Repair Reproduction Protocol**:
   - When an interactive defect is identified, the agent must construct a headless test simulating the user interaction steps.
   - The test must fail (Exit Code != 0) on the existing codebase, confirming reproduction of the user's reported symptom.
2. **Post-Repair Verification**:
   - The fix is applied. The exact same emulation test must now succeed (Exit Code 0).
3. **Additive Invariant**:
   - Emulation tests do not replace unit tests; both must pass with Exit Code 0.

## Scope & Blast Radius
- `GEMINI.md`: Codify constitutional Axiom 60.
- `skills/ai-harness-openspec/SKILL.md`: Synchronize Axiom 60 in the living skill specification.
- `tests/user-centric-behavioral-emulation-gate.test.mjs`: Provide automated L2 test suite verifying the invariants and zero scenario-token leakage.
- `scripts/tests/gemini-adapter.test.mjs`: Add regression assertions for Axiom 60.
