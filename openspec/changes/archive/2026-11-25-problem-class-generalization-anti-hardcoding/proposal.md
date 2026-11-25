# Change Proposal: Universal Problem-Class Generalization, Analogous Pattern Sweep & Anti-Special-Casing Guard (Axiom 78)

## Why
Agents frequently resolve reported bugs by patching only the exact failing input instance or hardcoding special-case conditional branches (`if (x === 'specific_case')`), causing identical root defects to recur in sibling modules or slightly different inputs. Synthesizing Anthropic Property-Based Bug-Class Remediation, John Ousterhout's *Eliminating Special Cases* principle, and `ast-grep`-style anti-overfitting static checks, this change requires all agents to abstract every defect into a general **Problem Class**, sweep analogous sibling paths, ban instance-specific hardcoding, and verify across orthogonal variants.

## What Changes
1. **REQ-1 (Problem-Class Abstraction Gate)**: Require mapping every concrete issue instance to a general `Problem Class` before designing fixes (`PROBLEM_CLASS_ABSTRACTION_MANDATE`).
2. **REQ-2 (Analogous Pattern Sweep)**: Mandate sweeping sibling modules and analogous data flows in `.harness/project-graph.json` to eliminate the entire defect class in one pass (`ANALOGOUS_PATTERN_SWEEP_MANDATE`).
3. **REQ-3 (Anti-Special-Casing & Table-Driven Generalization)**: Prohibit hardcoding instance-specific literals, filenames, or ad-hoc `if/else` special-case branches in generic execution paths (`ANTI_SPECIAL_CASING_OVERFIT_BLOCKED`).
4. **REQ-4 (Property-Based Multi-Variant Verification & Axiom 78 Codification)**: Require $\ge 2$ orthogonal variant test cases beyond the original repro (`VARIANT_QUOTA_DEFICIT_BLOCKED`), and codify **Axiom 78** (`UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 75).
5. **PROP-C (Automated L2 Anti-Hardcoding Guard)**: Create `scripts/check-anti-hardcoding.mjs` (`npm run guard:anti-hardcoding`) to detect special-case overfitting branches and validate generalization metadata.
6. **PROP-D (Minimum Variant Test Quota)**: Enforce $\ge 2$ orthogonal test variants for non-trivial fixes.
7. **PROP-E (Table-Driven Refactor Trigger)**: Trigger `SPECIAL_CASE_TABLE_REFACTOR_REQUIRED` when multiple literal special-case branches accumulate in generic logic.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Problem-Class Abstraction Gate | `PROBLEM_CLASS_ABSTRACTION_MANDATE` |
| REQ-2 | Analogous Sibling Pattern Sweep | `ANALOGOUS_PATTERN_SWEEP_MANDATE` |
| REQ-3 | Anti-Special-Casing & Table-Driven Design | `ANTI_SPECIAL_CASING_GENERALIZATION_STANDARD` |
| REQ-4 | Variant Verification & Axiom 78 Parity | `AXIOM_78_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD` |
| PROP-C | Automated L2 `guard:anti-hardcoding` | `AUTOMATED_L2_ANTI_HARDCODING_GUARD_STANDARD` |
| PROP-D | Property-Based Variant Quota ($\ge 2$) | `PROPERTY_BASED_VARIANT_QUOTA_STANDARD` |
| PROP-E | Table-Driven Refactor Trigger | `TABLE_DRIVEN_REFACTOR_TRIGGER_THRESHOLD` |
