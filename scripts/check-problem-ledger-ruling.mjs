import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const AXIOM_80_REQUIRED_TOKENS = [
  'PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM',
  'PROBLEM_LEDGER_INCREMENTAL_MERGE_MANDATE',
  'PARTIAL_REPLY_COUNTER_QUESTIONING_GATE',
  'EXPLANATION_TO_DISPOSITION_CONFIRMATION_MANDATE',
  'ATOMIC_ONE_DEFECT_ONE_ID_MANDATE',
  'APPEND_ONLY_SET_DIFFERENCE_RECONCILIATION_GATE',
  'AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD',
  'PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED',
  'UNRULING_LEDGER_ITEMS_PENDING_BLOCKED',
  'DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED',
  'BUNDLED_ISSUE_ID_BLOCKED',
  'LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED',
  'PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED',
  'POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE',
  'POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED',
];

export const AXIOM_81_REQUIRED_TOKENS = [
  'POST_TASK_MANDATORY_ISSUE_DISCLOSURE_&_JUDGMENT_AXIOM',
  'UNIVERSAL_TASK_INCIDENT_DISCLOSURE_MANDATE',
  'USER_JUDGMENT_INVITATION_REQUIRED',
  'AXIOM_81_PARITY_&_DISCLOSURE_STANDARD',
  'SILENT_INCIDENT_SUPPRESSION_BLOCKED',
  'USER_JUDGMENT_INVITATION_MISSING_BLOCKED',
];

const FINAL_RULING_STATUSES = new Set(['approved_fix', 'deferred', 'waived', 'resolved']);

/**
 * Incrementally merges user supplements or new items into an existing problem ledger
 * without overwriting or dropping prior items.
 */
export function mergeProblemLedgerDelta(prevLedger = [], deltaItems = []) {
  const merged = new Map();
  for (const item of Array.isArray(prevLedger) ? prevLedger : []) {
    merged.set(String(item.id), { ...item });
  }
  for (const delta of Array.isArray(deltaItems) ? deltaItems : []) {
    const id = String(delta.id);
    const existing = merged.get(id);
    if (existing) {
      const prevNotes = Array.isArray(existing.supplements) ? existing.supplements : [];
      const newNote = delta.supplement ? [delta.supplement] : [];
      merged.set(id, {
        ...existing,
        ...delta,
        id,
        supplements: [...prevNotes, ...newNote],
      });
    } else {
      merged.set(id, {
        ...delta,
        id,
        status: delta.status || 'pending_ruling',
        supplements: delta.supplement ? [delta.supplement] : [],
      });
    }
  }
  return Array.from(merged.values());
}

/**
 * Validates atomic one-defect-one-id decomposition, append-only set-difference conservation
 * against sourceAtomicIds, per-atomic waiver rationale, and counter-questioning on unruled items.
 */
export function validateProblemLedgerRuling(ledger, prevLedger = null, options = {}) {
  const violations = [];
  const items = Array.isArray(ledger) ? ledger : [];
  const currentIds = new Set(items.map((item) => String(item.id)));

  if (Array.isArray(prevLedger)) {
    const droppedIds = prevLedger
      .map((item) => String(item.id))
      .filter((id) => !currentIds.has(id));
    if (droppedIds.length > 0) {
      violations.push({
        code: 'PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED',
        droppedIds,
        message: `Problem ledger update dropped prior item(s): ${droppedIds.join(', ')}. Use incremental merge instead of replacement.`,
      });
    }
  }

  let missingFromSourceIds = [];
  if (Array.isArray(options.sourceAtomicIds)) {
    missingFromSourceIds = options.sourceAtomicIds
      .map((id) => String(id))
      .filter((id) => !currentIds.has(id));
    if (missingFromSourceIds.length > 0) {
      violations.push({
        code: 'LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED',
        missingFromSourceIds,
        message: `Set-difference reconciliation failed: source atomic ID(s) ${missingFromSourceIds.join(', ')} missing from current ledger.`,
      });
    }
  }

  const bundledIds = [];
  const unjustifiedWaiverIds = [];
  const clarificationIds = [];
  const pendingIds = [];

  for (const item of items) {
    const id = String(item.id);
    const status = String(item.status || 'pending_ruling');

    if (item.isBundled === true || (Array.isArray(item.subIssues) && item.subIssues.length > 1)) {
      bundledIds.push(id);
    }

    if (status === 'waived' && !String(item.waiverRationale || '').trim()) {
      unjustifiedWaiverIds.push(id);
    }

    if (item.explanationProvided === true && !String(item.disposition || '').trim() && !FINAL_RULING_STATUSES.has(status)) {
      clarificationIds.push(id);
    }

    if (!FINAL_RULING_STATUSES.has(status)) {
      pendingIds.push(id);
    }
  }

  if (bundledIds.length > 0) {
    violations.push({
      code: 'BUNDLED_ISSUE_ID_BLOCKED',
      bundledIds,
      message: `Bundled multi-defect entry detected for ID(s): ${bundledIds.join(', ')}. Split into independent atomic IDs (One-Defect-One-ID).`,
    });
  }

  if (unjustifiedWaiverIds.length > 0) {
    violations.push({
      code: 'PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED',
      unjustifiedWaiverIds,
      message: `Waived atomic ID(s) ${unjustifiedWaiverIds.join(', ')} require explicit per-item waiverRationale.`,
    });
  }

  if (clarificationIds.length > 0) {
    violations.push({
      code: 'DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED',
      clarificationIds,
      message: `Item(s) ${clarificationIds.join(', ')} received explanation without explicit disposition; confirm concrete handling action with user.`,
    });
  }

  if (pendingIds.length > 0) {
    violations.push({
      code: 'UNRULING_LEDGER_ITEMS_PENDING_BLOCKED',
      pendingIds,
      message: `Counter-question required: item(s) ${pendingIds.join(', ')} still lack final user ruling. Do not resolve only a subset.`,
    });
  }

  return {
    valid: violations.length === 0,
    pendingIds,
    missingFromSourceIds,
    bundledIds,
    unjustifiedWaiverIds,
    violations,
  };
}

/**
 * Post-task final proofread gate: verifies that 100% of initial atomic issues are 'resolved',
 * except those explicitly excluded via interactive user ruling ('waived' or 'deferred' with rationale).
 */
export function validatePostTaskLedgerProofread(ledger, options = {}) {
  const base = validateProblemLedgerRuling(ledger, null, options);
  const violations = [...base.violations];
  const items = Array.isArray(ledger) ? ledger : [];
  const unresolvedIds = [];

  for (const item of items) {
    const id = String(item.id);
    const status = String(item.status || 'pending_ruling');
    const hasInteractiveExclusionRationale =
      (status === 'waived' || status === 'deferred') &&
      Boolean(String(item.waiverRationale || item.exclusionRationale || '').trim());

    if (status !== 'resolved' && !hasInteractiveExclusionRationale) {
      unresolvedIds.push(id);
    }
  }

  if (unresolvedIds.length > 0) {
    violations.push({
      code: 'POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED',
      unresolvedIds,
      message: `Post-task proofread failed: initial issue(s) ${unresolvedIds.join(', ')} are neither resolved nor interactively excluded with rationale.`,
    });
  }

  return {
    valid: violations.length === 0,
    unresolvedIds,
    missingFromSourceIds: base.missingFromSourceIds,
    violations,
  };
}

/**
 * Validates that all incidents encountered during any task—even if resolved mid-task—
 * are proactively disclosed at task completion and the user is invited to judge.
 */
export function validatePostTaskIssueDisclosure(record) {
  const violations = [];
  const encountered = Array.isArray(record?.incidentsEncountered) ? record.incidentsEncountered : [];
  const disclosed = Array.isArray(record?.disclosedIncidents) ? record.disclosedIncidents : [];
  const disclosedIds = new Set(disclosed.map((d) => String(d.id || d)));

  const undisclosedIds = [];
  for (const inc of encountered) {
    const id = String(inc.id || inc);
    if (!disclosedIds.has(id)) {
      undisclosedIds.push(id);
    }
  }

  if (undisclosedIds.length > 0) {
    violations.push({
      code: 'SILENT_INCIDENT_SUPPRESSION_BLOCKED',
      undisclosedIds,
      message: `Encountered incident(s) ${undisclosedIds.join(', ')} were omitted from final disclosure (even resolved mid-task incidents must be reported).`,
    });
  }

  if (encountered.length > 0 && record?.userJudgmentInvited !== true) {
    violations.push({
      code: 'USER_JUDGMENT_INVITATION_MISSING_BLOCKED',
      message: 'Final task report must explicitly invite user judgment on all encountered issues.',
    });
  }

  return {
    valid: violations.length === 0,
    undisclosedIds,
    violations,
  };
}

function runCli() {
  const repoRoot = process.cwd();
  const mirrorPaths = [
    'GEMINI.md',
    'skills/pstack-openspec/SKILL.md',
    'skills/ai-harness-openspec/SKILL.md',
  ];
  const violations = [];

  for (const relPath of mirrorPaths) {
    const absPath = path.join(repoRoot, relPath);
    if (!existsSync(absPath)) {
      violations.push(`Missing constitutional mirror: ${relPath}`);
      continue;
    }
    const content = readFileSync(absPath, 'utf8');
    for (const token of [...AXIOM_80_REQUIRED_TOKENS, ...AXIOM_81_REQUIRED_TOKENS]) {
      if (!content.includes(token)) {
        violations.push(`${relPath} missing Axiom 80/81 token: ${token}`);
      }
    }
  }

  const workerPath = path.join(repoRoot, 'worker.md');
  if (!existsSync(workerPath)) {
    violations.push('Missing worker.md');
  } else {
    const workerContent = readFileSync(workerPath, 'utf8');
    for (const token of [
      'PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM',
      'PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED',
      'UNRULING_LEDGER_ITEMS_PENDING_BLOCKED',
      'DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED',
      'BUNDLED_ISSUE_ID_BLOCKED',
      'LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED',
      'PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED',
      'POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE',
      'POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED',
      'POST_TASK_MANDATORY_ISSUE_DISCLOSURE_&_JUDGMENT_AXIOM',
      'SILENT_INCIDENT_SUPPRESSION_BLOCKED',
      'USER_JUDGMENT_INVITATION_MISSING_BLOCKED',
    ]) {
      if (!workerContent.includes(token)) {
        violations.push(`worker.md missing Axiom 80 token: ${token}`);
      }
    }
  }

  console.log('=== Automated L2 Problem Ledger Incremental Merge & Ruling Guard ===');
  if (violations.length > 0) {
    for (const v of violations) {
      console.error(`[FAIL] ${v}`);
    }
    process.exit(1);
  }

  console.log('[PASS] Axiom 80 parity, atomic decomposition & set-difference reconciliation verified across 3 mirrors + worker.md (Exit Code 0).');
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
