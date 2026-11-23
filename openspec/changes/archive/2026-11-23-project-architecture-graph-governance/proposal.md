# Change Proposal: Project Architecture & Maintenance Graph Governance (Axiom 70)

## Why
In complex multi-module engineering repositories, agents and developers frequently suffer from two structural failures: (1) inability to accurately locate the responsible module when bugs or maintenance requests arise, resulting in blind global edits or superficial symptom patching; and (2) repeated erroneous modifications at the exact same code location or module without structural escalation. Referencing Lauren Tan (`@poteto`) Pstack principles (`how`, `architect`, `blast-radius`, `principle-fix-root-causes`, and `principle-encode-lessons-in-structure`), every managed project must maintain a living **Project Architecture & Maintenance Graph** that maps module ownership, dependency blast radius, maintenance items, and repeated-mutation hotspots.

## What Changes
1. **REQ-1 (Mandatory Project Architecture & Maintenance Graph Standard)**: Require every Ps-openspec managed project to maintain a machine-readable and human-auditable Project Architecture & Maintenance Graph (module boundaries, ownership, dependencies, entry points, and maintenance ledger).
2. **REQ-2 (Graph-Guided Root-Cause Localization & Blast Radius Protocol)**: Mandate querying the Project Graph during Step 1 problem diagnosis to isolate the Origin Producer module and trace multi-hop downstream blast radius (`how` & `blast-radius`) prior to modification.
3. **REQ-3 (Repeated-Error-Mutation Hotspot Circuit Breaker)**: Track mutation error frequency per module/location in the Graph; trigger a hard circuit breaker (`REPEATED_HOTSPOT_MUTATION_BLOCKED`) at $\ge 2$ erroneous edits, forcing root-cause penetration and structural encoding (`fix-root-causes` & `encode-lessons-in-structure`).
4. **REQ-4 (Maintenance Ledger & Lifecycle Synchronization)**: Enforce synchronous updates of module topology and maintenance items in the Graph prior to task archival.
5. **REQ-5 (Constitutional Codification as Axiom 70)**: Codify Axiom 70 (`PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 67) using 100% pure universal software engineering abstractions.
6. **PROP-C (Anti-Staleness Graph Guard)**: Provide a deterministic L2 guard (`scripts/check-project-graph.mjs` / `npm run guard:graph`) to detect missing graphs, schema violations, stale module mappings, and unmitigated hotspot locks.
7. **PROP-D (Cold-Start Graph Bootstrap Protocol)**: Standardize a read-only discovery and bootstrap workflow so new or legacy repositories can initialize a valid Project Graph rapidly.
8. **PROP-E (Module Risk Tiering & Escalated Review Gate)**: Support node risk/stability tiers (`critical_load_bearing`, `hotspot_locked`, `standard`) in the Graph schema, enforcing stricter blast-radius proofs for high-risk modules.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Mandatory Project Architecture & Maintenance Graph | `PROJECT_ARCHITECTURE_GRAPH_MANDATE` |
| REQ-2 | Graph-Guided Diagnosis & Blast Radius Tracing | `GRAPH_GUIDED_DIAGNOSIS_&_BLAST_RADIUS_PROTOCOL` |
| REQ-3 | Repeated-Mutation Hotspot Circuit Breaker | `REPEATED_MUTATION_HOTSPOT_CIRCUIT_BREAKER` |
| REQ-4 | Maintenance Ledger & Graph Lifecycle Sync | `GRAPH_MAINTENANCE_LEDGER_&_SYNC_PROTOCOL` |
| REQ-5 | Axiom 70 Constitutional Codification & Parity | `AXIOM_70_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD` |
| PROP-C | Automated L2 Anti-Staleness Graph Guard | `AUTOMATED_L2_PROJECT_GRAPH_GUARD_STANDARD` |
| PROP-D | Cold-Start Graph Bootstrap Standard | `COLD_START_GRAPH_BOOTSTRAP_STANDARD` |
| PROP-E | Module Risk Tiering & Escalated Review | `MODULE_RISK_TIERING_&_ESCALATED_REVIEW_GATE` |
