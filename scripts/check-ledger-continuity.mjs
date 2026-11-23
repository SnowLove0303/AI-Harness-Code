import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VALID_STATUSES = new Set(['ACTIVE', 'MODIFIED', 'ADDED', 'SUPERSEDED']);
const ACTIVE_STATUSES = new Set(['ACTIVE', 'MODIFIED', 'ADDED']);

/**
 * Merges a new turn's requirement delta into the previous cumulative ledger,
 * enforcing conservation of all un-superseded prior requirements.
 */
export function mergeLedgerDelta(prevLedger, deltaEntries = [], options = {}) {
  const prevEntries = Array.isArray(prevLedger?.entries) ? prevLedger.entries : [];
  const nextEntriesMap = new Map();

  for (const entry of prevEntries) {
    nextEntriesMap.set(entry.id, { ...entry });
  }

  for (const delta of deltaEntries) {
    if (delta.supersedes) {
      const target = nextEntriesMap.get(delta.supersedes);
      if (target) {
        target.status = 'SUPERSEDED';
      }
    }

    if (nextEntriesMap.has(delta.id)) {
      const existing = nextEntriesMap.get(delta.id);
      nextEntriesMap.set(delta.id, {
        ...existing,
        ...delta,
        status: delta.status || 'MODIFIED',
      });
    } else {
      nextEntriesMap.set(delta.id, {
        ...delta,
        status: delta.status || 'ADDED',
      });
    }
  }

  return {
    schemaVersion: prevLedger?.schemaVersion || '1.0.0',
    ledgerVersion: (prevLedger?.ledgerVersion || 0) + 1,
    baselineConfirmed: options.baselineConfirmed ?? false,
    entries: Array.from(nextEntriesMap.values()),
  };
}

/**
 * Validates cumulative ledger conservation, atomic decomposition,
 * Re-Gating baseline lock, and end-to-end verification completeness.
 */
export function validateLedgerContinuity(ledger, prevLedger = null, options = {}) {
  const violations = [];

  if (!ledger || typeof ledger !== 'object' || !Array.isArray(ledger.entries)) {
    violations.push({
      code: 'INVALID_LEDGER_SCHEMA',
      message: 'Requirement ledger must be an object with an entries array.',
    });
    return { valid: false, violations };
  }

  if (options.requireConfirmedBaseline !== false && ledger.baselineConfirmed === false) {
    violations.push({
      code: 'RE_GATING_REQUIRED_BLOCKED',
      message: 'Scope drift detected: merged cumulative ledger baseline has not been re-confirmed.',
    });
  }

  const currentIds = new Set();
  for (const entry of ledger.entries) {
    if (!entry.id || typeof entry.id !== 'string') {
      violations.push({
        code: 'INVALID_LEDGER_SCHEMA',
        message: 'Every ledger entry must have a string id.',
      });
      continue;
    }

    if (!VALID_STATUSES.has(entry.status)) {
      violations.push({
        code: 'INVALID_ENTRY_STATUS',
        message: `Entry ${entry.id} has invalid status: ${entry.status}`,
      });
    }

    if (Array.isArray(entry.bundledItems) && entry.bundledItems.length > 1) {
      violations.push({
        code: 'LOSSY_REQUIREMENT_AGGREGATION_BLOCKED',
        message: `Entry ${entry.id} bundles ${entry.bundledItems.length} distinct items instead of atomic decomposition.`,
      });
    }

    if (options.requireVerified !== false && ACTIVE_STATUSES.has(entry.status)) {
      if (entry.verified !== true || !entry.verificationEvidence) {
        violations.push({
          code: 'CUMULATIVE_CHECKOFF_DEFICIT_BLOCKED',
          message: `Active entry ${entry.id} lacks verified=true or verificationEvidence.`,
        });
      }
    }

    currentIds.add(entry.id);
  }

  if (prevLedger && Array.isArray(prevLedger.entries)) {
    for (const prevEntry of prevLedger.entries) {
      if (!currentIds.has(prevEntry.id)) {
        violations.push({
          code: 'REQUIREMENT_CONSERVATION_VIOLATION_BLOCKED',
          message: `Prior entry ${prevEntry.id} was silently dropped without SUPERSEDED status.`,
        });
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Identifies earlier active requirements mapped to modules touched in subsequent turns
 * so they are re-verified against mid-execution overwrites.
 */
export function checkGraphCoupledRegressions(ledger, modifiedModuleIds = []) {
  if (!ledger || !Array.isArray(ledger.entries)) {
    return [];
  }
  const touchedSet = new Set(modifiedModuleIds);
  const impactedEntries = [];

  for (const entry of ledger.entries) {
    if (ACTIVE_STATUSES.has(entry.status) && entry.graphModuleId && touchedSet.has(entry.graphModuleId)) {
      impactedEntries.push(entry.id);
    }
  }
  return impactedEntries;
}

function runCli() {
  const repoRoot = process.cwd();
  const ledgerPath = path.join(repoRoot, '.harness', 'requirement-ledger.json');

  if (!existsSync(ledgerPath)) {
    console.log('=== Cumulative Requirement Ledger Guard (AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD) ===');
    console.log('[PASS] No active .harness/requirement-ledger.json found (idle baseline).');
    process.exit(0);
  }

  let ledger;
  try {
    ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
  } catch (err) {
    console.error(`[FAIL] INVALID_LEDGER_JSON: ${err.message}`);
    process.exit(1);
  }

  const result = validateLedgerContinuity(ledger, null, {
    requireConfirmedBaseline: true,
    requireVerified: true,
  });

  if (!result.valid) {
    console.error('=== Cumulative Requirement Ledger Guard (AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD) ===');
    for (const v of result.violations) {
      console.error(`[FAIL] ${v.code}: ${v.message}`);
    }
    process.exit(1);
  }

  console.log('=== Cumulative Requirement Ledger Guard (AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD) ===');
  console.log(`[PASS] Cumulative requirement ledger v${ledger.ledgerVersion} verified (${ledger.entries.length} entries, 0 violations).`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
