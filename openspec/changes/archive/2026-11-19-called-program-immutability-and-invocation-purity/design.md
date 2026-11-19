# Technical Design: Called Program Immutability and Invocation Purity Governance

## 1. Architectural Overview & Problem Analysis

In AI agent engineering workflows, agents are frequently tasked with using or running pre-existing tools, pipelines, CLIs, or services to accomplish a user goal. When friction or exceptions occur during execution, agents exhibit a hazardous cognitive bias:
**Task-Expediency Hacking**: The agent modifies the shared program's functional code (e.g. disabling input validation, hacking default parameters, or hardcoding return values) just to coerce the immediate task into passing.

This design introduces an architectural firewall separating the **Caller Plane** from the **Engine Plane**:

```mermaid
flowchart TD
    subgraph S0["Step 0: Classification"]
        Task["Task Ingestion"] --> Binary{"Task Nature?"}
        Binary -- Invocation --> InvockLock["CALLED_PROGRAM_READONLY_LOCK (Engine Plane Locked)"]
        Binary -- Development --> DevScope["Standard Engineering Change"]
    end

    subgraph S2["Step 2: Gate 2 Fence"]
        InvockLock --> Fence["Scope Inspection: Writable Paths"]
        Fence --> ScopeCheck{"Any Engine Code in Writable?"}
        ScopeCheck -- Yes --> Reject["ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED (Exit 1)"]
        ScopeCheck -- No --> Approved["Gate 2 Authorized"]
    end

    subgraph S3["Step 3: Caller Plane Execution"]
        Approved --> Run["Run Called Program"]
        Run --> Outcome{"Execution Result?"}
        Outcome -- Success --> Verify["Pass Test Witness"]
        Outcome -- Error --> Triage{"Error Origin?"}
        Triage -- Caller Data / Args --> CallerFix["Rectify in Caller Plane (Sanitize Input / Fix CLI Flags)"]
        CallerFix --> Run
        Triage -- Genuine Engine Bug --> Incident["Log [Incident: Upstream Engine Defect]"]
        Incident --> Pause["Halt & Escalate to Human User (No Silent Hacking)"]
    end

    subgraph S5["Step 5: Invocation Guard"]
        Verify --> Guard["check-invocation-purity.mjs"]
        Guard --> DiffCheck{"Git Diff contains Engine Modifications?"}
        DiffCheck -- Yes --> Tamper["CALLED_PROGRAM_TAMPERING_DETECTED (Exit 1)"]
        DiffCheck -- No --> Closeout["Task Completed (Exit 0)"]
    end
```

---

## 2. Component Specifications

### 2.1 Caller Plane vs. Engine Plane Physical Separation
- **Engine Plane (Read-Only)**:
  - Source files defining the program's functions, validation schemas, algorithms, libraries, and core engines.
  - Locked under `CALLED_PROGRAM_READONLY_LOCK`. Any write attempt triggers `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`.
- **Caller Plane (Permitted)**:
  - Invocation scripts, CLI command invocations, input data files, transformation mappings, and caller-side environment variables.

### 2.2 Error Triage & Escalation Protocol
When an invocation task encounters an error:
1. **Diagnosis**: Determine if the failure is caused by malformed input arguments, non-compliant input data, or a genuine upstream engine defect.
2. **Caller Remediation**: If caused by caller inputs, sanitize the input files or adjust parameters.
3. **Upstream Defect Escalation**: If caused by a bug in the engine, write a diagnostic report:
   ```markdown
   [Incident: Upstream Engine Defect]
   - Engine: <path/to/engine>
   - Repro Command: <command>
   - Failure Stack: <stack trace>
   - Status: Blocked pending independent Bug-Fix change
   ```
   Do not modify engine code. Pause execution for user decision.

### 2.3 Mechanical L2 Invocation Purity Guard (`scripts/check-invocation-purity.mjs`)
- Autonomous Node.js CLI script.
- Inspects Git staged and unstaged diffs for tasks labeled as invocation tasks.
- Verifies that zero modifications exist within protected engine directories.
- Provides mutation testing ensuring that modifying an engine file triggers an Exit Code 1 failure.
- Registered under `npm run guard:invocation-purity`.

### 2.4 State Transitions

```mermaid
stateDiagram-v2
    [*] --> InvocationMode: Task Classed as Invocation-Only
    InvocationMode --> CallerPlaneActive: Engine Plane Locked Read-Only
    
    state CallerPlaneActive {
        [*] --> ParameterSanitization: Validate Inputs
        ParameterSanitization --> ExecuteCall: Run CLI / Function
        ExecuteCall --> SuccessCheck: Process Returns Exit 0
        SuccessCheck --> [*]
    }
    
    CallerPlaneActive --> IncidentHalt: Upstream Bug Diagnosed
    IncidentHalt --> [*]: Await Human Direction
    CallerPlaneActive --> PurityAudit: Verify Output Artifacts
    PurityAudit --> Released: Git Diff on Engine is Zero
```
