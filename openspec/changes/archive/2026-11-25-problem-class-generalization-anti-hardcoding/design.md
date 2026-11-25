# Technical Design: Problem-Class Generalization & Anti-Special-Casing Guard (Axiom 78)

## 1. L2 Static Guard (`scripts/check-anti-hardcoding.mjs`)
Exports two pure verification primitives plus a repository CLI runner:
1. `scanCodeForSpecialCasing(sourceCode, filePath)`:
   - Detects instance-specific special-case overfitting patterns in generic logic:
     - Hardcoded case/item/file literal branches (`if\s*\([^)]*(?:===|includes\()\s*['"](?:case_|issue_|ticket_|sample_|test-case-|bug-)[^'"]+['"]`)
     - High density of literal `=== '...'` special-case `if/else if` chains ($\ge 3$ literal equality branches inside one function/block) without table-driven lookup -> emits `SPECIAL_CASE_OVERFITTING_BLOCKED` / `TABLE_DRIVEN_REFACTOR_REQUIRED`.
2. `validateGeneralizationEvidence(record)`:
   - Requires `record.problemClass` (non-empty string) and `Array.isArray(record.analogousSitesChecked)` (`PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED`).
   - Requires `Array.isArray(record.orthogonalVariants) && record.orthogonalVariants.length >= 2` (`VARIANT_QUOTA_DEFICIT_BLOCKED`).
3. CLI Runner (`npm run guard:anti-hardcoding`):
   - Scans `scripts/` (excluding `scripts/tests/` and `scripts/check-anti-hardcoding.mjs` itself) for special-case overfitting patterns and exits with Exit Code 0 when clean, Exit Code 1 on violations.
