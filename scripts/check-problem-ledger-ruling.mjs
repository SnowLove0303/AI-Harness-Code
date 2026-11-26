import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const AXIOM_80_REQUIRED_TOKENS = [
  'PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM',
  'PROBLEM_LEDGER_INCREMENTAL_MERGE_MANDATE',
  'PARTIAL_REPLY_COUNTER_QUESTIONING_GATE',
  'EXPLANATION_TO_DISPOSITION_CONFIRMATION_MANDATE',
  'AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD',
  'PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED',
  'UNRULING_LEDGER_ITEMS_PENDING_BLOCKED',
  'DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED',
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
 * Validates that no prior problem-ledger items were dropped, any explained item has an explicit
 * disposition, and no items remain pending_ruling before execution/closure.
 */
export function validateProblemLedgerRuling(ledger, prevLedger = null) {
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

  const clarificationIds = [];
  const pendingIds = [];
  for (const item of items) {
    const id = String(item.id);
    const status = String(item.status || 'pending_ruling');
    if (item.explanationProvided === true && !String(item.disposition || '').trim() && !FINAL_RULING_STATUSES.has(status)) {
      clarificationIds.push(id);
    }
    if (!FINAL_RULING_STATUSES.has(status)) {
      pendingIds.push(id);
    }
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
    for (const token of AXIOM_80_REQUIRED_TOKENS) {
      if (!content.includes(token)) {
        violations.push(`${relPath} missing Axiom 80 token: ${token}`);
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

  console.log('[PASS] Axiom 80 parity & problem-ledger ruling gate verified across 3 mirrors + worker.md (Exit Code 0).');
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
