# Design Document: Action Skill Layer Proactive Discovery & Mandatory Adoption Governance

## 1. Architectural Topology & Rationale

### 1.1 Task-Time Semantic Discovery & Mandatory Adoption Flowchart
```mermaid
flowchart TD
    UserTask["User Task Input"] --> Step0["Step 0: Intent Ingestion"]
    Step0 --> SemanticScan["Semantic Feature Scanner\n(Extract keywords: UI, EXE, Reversing, Search, etc.)"]

    subgraph SkillRegistry["Ps-openspec Action Skill Layer (Section 3.1)"]
        Skill1["skills/rea-reverse-engineering"]
        Skill2["skills/desktop-exe-development"]
        Skill3["skills/ui-ux-design-engineering"]
        Skill4["skills/tavily-search"]
        SkillOther["Other Action Skills..."]
    end

    SemanticScan <-->|"Scan Triggers & Domains"| SkillRegistry

    SemanticScan --> Decision{"Specialized Skill\nMatched?"}
    Decision -->|"Yes (Matched)"| DeclareMatched["Declare in Gate 1 & Gate 2:\nMatched Skill: [skill-id]"]
    Decision -->|"No (None)"| DeclareNone["Declare in Gate 1 & Gate 2:\n[None - Generic Playbook]"]

    DeclareMatched --> InjectSOP["Mandatory SOP & MCP Tool Injection\n(Translate Skill SOP into tasks.md atomic tasks)"]
    DeclareNone --> StandardTasks["Standard OpenSpec Tasks"]

    InjectSOP --> SwarmBrief["Swarm Dispatch Brief with Directive:\n🚨 [MANDATORY ACTION SKILL: <name>]"]
    StandardTasks --> SwarmBriefGeneric["Swarm Dispatch Brief (Generic Playbook)"]

    SwarmBrief --> WorkerExec["Swarm Worker: Loads Skill & Executes SOP"]
    WorkerExec --> QualityGate["Measured Evidence satisfying Skill Quality Gate"]
```

### 1.2 State Machine of Skill Adoption Lifecycle
```mermaid
stateDiagram-v2
    [*] --> Ingested: User Submits Task
    Ingested --> Scanning: Step 0 Feature Extraction
    state Decision <<choice>>
    Scanning --> Decision: Registry Match Check
    Decision --> Matched: Trigger Matched in Section 3.1
    Decision --> Unmatched: No Specialized Skill Applicable
    Matched --> GateDeclared: Statutory Declaration in Gate 1 & 2
    Unmatched --> GateDeclared: Explicit [None - Generic Playbook]
    GateDeclared --> SOPInjected: Skill SOP & MCP Bound to tasks.md
    SOPInjected --> BriefInherited: Injected into Swarm Worker Brief
    BriefInherited --> Executed: Swarm Worker Executes under Skill
    Executed --> QualityVerified: Output meets Skill Quality Assertions
    QualityVerified --> [*]: 1:1 Checkoff & Final Delivery
```

---

## 2. Invariant Definition (Axiom 57)

> **Axiom 57: Action Skill Proactive Discovery & Mandatory Adoption Axiom (`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`)**
> 1. **Pre-Execution Skill Scanning**: Upon receiving any task, the agent must perform an automated semantic scan across Ps-openspec's Action Skill Layer (Section 3.1 in `GEMINI.md`). The agent must evaluate whether a specialized skill covers the domain.
> 2. **Statutory Skill Match Declaration**: Gate 1 dossiers and Gate 2 proposals must include an explicit section declaring either the matched skill or `[None - Standard Engineering Playbook]`. Silent omission is prohibited.
> 3. **Mandatory Active Adoption**: When an Action Skill matches, the agent is strictly prohibited from bypassing it to write fragile ad-hoc workarounds. The agent must inject the skill's SOPs, toolchains, and quality assertions into `tasks.md`.
> 4. **Swarm Brief Inheritance**: The Lead Agent must pass the matching Action Skill directive (`🚨 [MANDATORY ACTION SKILL: <name>]`) into Swarm briefs, ensuring compliance end-to-end.

---

## 3. Layer 2 Automated Linter & Guardrail Architecture

The automated validation suite (`tests/action-skill-discovery-governance.test.mjs`) verifies:
1. **Constitutional Invariant Registry**: Verifies that `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` contain the complete Axiom 57 rules and blockers.
2. **OpenSpec Spec Parity**: Verifies all 5 RFC 2119 requirements and scenario blocks.
3. **Semantic Matching Simulator**: Tests candidate queries against the Action Skill registry to assert correct discovery.
4. **Domain Neutrality & Anti-Scenario Leakage**: Verifies pure software engineering terminology across all Axiom 57 assets.
