# Design: Mature Application Reverse Engineering & Deep Deconstruction Architecture

## Context & Problem Formulation
Building complex applications (such as rich-text/collaborative block editors, productivity suites, or interactive tools) requires deep insights into state management, interaction cascades, and data synchronization. Developers often waste weeks struggling with edge cases that mature software solved years ago.

Traditional approaches suffer from two extremes:
1. **Visual-Only Copying**: Taking screenshots or scraping CSS leads to brittle interfaces with broken underlying state machines and non-functional selection logic.
2. **Proprietary Source Leaks**: Direct code lifting introduces legal, architectural, and security liabilities.

## Architectural Decision
We architect an industrial-grade **Dual-Track Reverse Deconstruction Engine** crystallized as an actionable Ps-openspec skill (`app-reverse-deconstruction`):

```text
┌────────────────────────────────────────────────────────────────────────┐
│             【Dual-Track Reverse Deconstruction Architecture】           │
│                                                                        │
│   🔍 Track A: Dynamic Black-Box Behavioral Tracing                     │
│      • CDP / DOM Mutation Observers / Accessibility Tree Traversal     │
│      • Full User Event Cascades: Keyboard shortcut -> Focus -> Edit    │
│      • Network & WebSocket Protocol Delta Interception (HAR / Wire)    │
│                                                                        │
│   🔬 Track B: Static White-Box Architectural Modeling                  │
│      • AST Reconstitution: Block Schema, Node Tree, Attributes         │
│      • Transaction Statecharts: Steps, Inverses (Undo/Redo), Bounds    │
│      • Collaboration Primitives: CRDT / Yjs data model mapping         │
│                                                                        │
│   📋 Output: Clean-Room Specification (`DECONSTRUCT_SPEC.md`)          │
│      • 100% Functional Specification decoupled from proprietary code   │
│      • Immutable Evidence Graph (Tamper-evident verification JSON)     │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Document Application Five-Tier Benchmark
For document and editing applications, the deconstruction engine enforces coverage across all five fundamental layers:
1. **Tier 1 (Block Schema)**: Hierarchical tree structure, parent-child relations, fractional indexing.
2. **Tier 2 (Selection & Caret Engine)**: Selection ranges, anchor/focus nodes, cross-block boundary traversal.
3. **Tier 3 (Transaction & History)**: Invariant step transitions, document immutability, undo/redo inverse operations.
4. **Tier 4 (Command & Interaction)**: Slash `/` trigger registries, markdown shortcut rules, floating format toolbars.
5. **Tier 5 (Data Sync & CRDT)**: Local-first persistence, incremental binary update protocols, conflict resolution.

### 2. Action Skill Layer Integration
- Packaged as `skills/app-reverse-deconstruction/SKILL.md`.
- Deeply integrates with REA MCP tools (`analyze-javascript-application`, `recover-javascript-sources`, `evidence-export`) and `browser` Subagent.
- Indexed in `GEMINI.md` Section 3.1 for instant discovery.

### 3. Scope & Blast Radius
- `GEMINI.md`: Codify constitutional Axiom 62 and index `app-reverse-deconstruction`.
- `skills/pstack-openspec/SKILL.md`: Synchronize Axiom 62.
- `skills/ai-harness-openspec/SKILL.md`: Synchronize Axiom 62.
- `skills/app-reverse-deconstruction/SKILL.md`: Create complete action skill specification.
- `tests/mature-app-reverse-deconstruction-system.test.mjs`: Create automated L2 test suite.
- `scripts/tests/gemini-adapter.test.mjs`: Add regression test assertion.
