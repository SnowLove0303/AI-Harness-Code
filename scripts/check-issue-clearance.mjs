#!/usr/bin/env node
/**
 * Issue Clearance & Post-Execution Reconciliation Static Guard
 * (ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER & POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL).
 *
 * 1. Pre-execution / Step 0: Classifies Problem-Type Tasks based on input signatures.
 * 2. Parses the Step 0 Gate 1 dossier for canonical [ISSUE-xx] identifiers.
 * 3. Mechanically verifies that every issue is covered by a dedicated automated test assertion.
 * 4. Step 5 Post-execution: Verifies 1:1 Problem-to-Result Reconciliation Matrix and empirical fact-checking.
 *
 * Exit code 0: All issues verified in tests and reconciliation, or non-issue task.
 * Exit code 1: Missing test assertions or unverified reconciliation entries.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

/**
 * Diagnostic signatures that mandate classification as a Problem-Type Task.
 */
export const PROBLEM_TASK_SIGNATURES = [
  /error:/i,
  /exception:/i,
  /traceback/i,
  /assertionerror/i,
  /failing\s+test/i,
  /stack\s+trace/i,
  /\[issue-\d{2}\]/i,
  /bug\s*(report|ticket|id)?/i,
  /defect/i,
  /discrepancy/i,
  /audit\s+finding/i,
  /regression/i,
  /修复/u,
  /报错/u,
  /异常/u,
  /故障/u,
  /缺陷/u,
  /排查/u,
];

/**
 * Evaluates whether text content or task prompt represents a Problem-Type Task.
 *
 * @param {string} text
 * @returns {{ isProblem: boolean, matchedSignatures: string[], classification: string }}
 */
export function isProblemTask(text) {
  if (!text || typeof text !== 'string') {
    return { isProblem: false, matchedSignatures: [], classification: 'Explore-Type Task' };
  }

  const matchedSignatures = [];
  for (const sig of PROBLEM_TASK_SIGNATURES) {
    if (sig.test(text)) {
      matchedSignatures.push(sig.source);
    }
  }

  const isProblem = matchedSignatures.length > 0;
  return {
    isProblem,
    matchedSignatures,
    classification: isProblem ? 'Problem-Type Task' : 'Feature-Type Task',
  };
}

/**
 * Extracts unique [ISSUE-xx] identifiers from text content.
 * @param {string} content
 * @returns {string[]} Sorted array of unique issue IDs (e.g. ['[ISSUE-01]', '[ISSUE-02]'])
 */
export function extractIssueIds(content) {
  if (!content || typeof content !== 'string') return [];
  const matches = content.match(/\[ISSUE-\d{2}\]/g);
  if (!matches) return [];
  return Array.from(new Set(matches)).sort();
}

/**
 * Extracts 1:1 reconciliation entries from delivery reports or markdown content.
 *
 * @param {string} content
 * @returns {Array<{ issueId: string, hasAnchor: boolean, hasProof: boolean, resolved: boolean }>}
 */
export function extractReconciliationEntries(content) {
  if (!content || typeof content !== 'string') return [];

  const lines = content.split(/\r?\n/);
  const entries = [];

  for (const line of lines) {
    const issueMatch = line.match(/\[ISSUE-\d{2}\]/);
    if (!issueMatch) continue;

    const issueId = issueMatch[0];
    const hasAnchor = /file:\/\/\/[^\s#]+#L\d+/i.test(line) || /#L\d+/i.test(line) || /`[^`]+\.(js|mjs|ts|md|json)#L\d+/i.test(line);
    const hasProof = /\[Measured\]/i.test(line) || /Exit\s+Code\s+0/i.test(line) || /PASS/i.test(line);
    const resolved = /\[x\]/i.test(line) || /RESOLVED/i.test(line) || /已解决/u.test(line);

    entries.push({
      issueId,
      hasAnchor,
      hasProof,
      resolved,
      rawLine: line,
    });
  }

  return entries;
}

/**
 * Verifies that each issue ID has a valid 1:1 reconciliation entry with code anchor and proof.
 *
 * @param {string[]} issueIds
 * @param {string} reportContent
 * @returns {{ verified: string[], missing: string[], unproved: string[], pass: boolean, total: number }}
 */
export function verifyReconciliation(issueIds, reportContent) {
  const entries = extractReconciliationEntries(reportContent);
  const entryMap = new Map();

  for (const e of entries) {
    if (!entryMap.has(e.issueId)) {
      entryMap.set(e.issueId, e);
    }
  }

  const verified = [];
  const missing = [];
  const unproved = [];

  for (const issueId of issueIds) {
    const entry = entryMap.get(issueId);
    if (!entry) {
      missing.push(issueId);
    } else if (!entry.hasProof || !entry.hasAnchor) {
      unproved.push(issueId);
    } else {
      verified.push(issueId);
    }
  }

  return {
    verified,
    missing,
    unproved,
    pass: missing.length === 0 && unproved.length === 0,
    total: issueIds.length,
  };
}

/**
 * Recursively scans directory for test files.
 * @param {string} dir
 * @returns {string[]} File paths
 */
export function findTestFiles(dir) {
  if (!existsSync(dir)) return [];
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTestFiles(fullPath));
    } else if (
      entry.isFile() &&
      /\.(test|spec)\.(mjs|js|ts)$/.test(entry.name)
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Reads test files into a map of filePath -> content.
 * @param {string[]} filePaths
 * @returns {Record<string, string>}
 */
export function loadTestFilesMap(filePaths) {
  const map = {};
  for (const p of filePaths) {
    if (existsSync(p)) {
      map[p] = readFileSync(p, 'utf8');
    }
  }
  return map;
}

/**
 * Verifies that each issue ID is present in at least one test file's content.
 * @param {string[]} issueIds
 * @param {Record<string, string> | string} testContents
 * @returns {{ verified: string[], missing: string[], pass: boolean, total: number }}
 */
export function verifyClearance(issueIds, testContents) {
  const verified = [];
  const missing = [];
  const allContent =
    typeof testContents === 'string'
      ? testContents
      : Object.values(testContents).join('\n');

  for (const issueId of issueIds) {
    if (allContent.includes(issueId)) {
      verified.push(issueId);
    } else {
      missing.push(issueId);
    }
  }

  return {
    verified,
    missing,
    pass: missing.length === 0,
    total: issueIds.length,
  };
}

/**
 * Locates the most recent Gate 1 dossier or specified path, sorted lexicographically descending.
 * @param {string} [customPath]
 * @returns {string | null}
 */
export function locateGate1Dossier(customPath) {
  if (customPath && existsSync(customPath)) {
    return customPath;
  }

  const dossiersDir = join(repoRoot, 'openspec', 'gate1-dossiers');
  if (existsSync(dossiersDir)) {
    const files = readdirSync(dossiersDir)
      .filter((f) => f.endsWith('.md'))
      .sort((a, b) => b.localeCompare(a)); // Lexicographical YYYY-MM-DD descending

    if (files.length > 0) {
      return join(dossiersDir, files[0]);
    }
  }

  return null;
}

/**
 * Main execution runner.
 */
export function runClearanceGuard(options = {}) {
  const dossierPath = locateGate1Dossier(options.dossier);
  if (!dossierPath) {
    console.log('[Clearance Guard] No Gate 1 dossier found. Skipping clearance check. (Status: PASS)');
    return { pass: true, total: 0, verified: [], missing: [] };
  }

  console.log(`[Clearance Guard] Parsing Gate 1 dossier: ${dossierPath}`);
  const dossierContent = readFileSync(dossierPath, 'utf8');
  const issueIds = extractIssueIds(dossierContent);

  if (issueIds.length === 0) {
    console.log('[Clearance Guard] No canonical [ISSUE-xx] identifiers detected. Non-problem-ledger task or 0 issues. (Status: PASS)');
    return { pass: true, total: 0, verified: [], missing: [] };
  }

  console.log(`[Clearance Guard] Detected ${issueIds.length} canonical issue(s): ${issueIds.join(', ')}`);

  // 1. Verify test assertions in test suite
  const testDir = options.testDir || join(repoRoot, 'tests');
  const testFiles = findTestFiles(testDir);
  const testMap = loadTestFilesMap(testFiles);

  const testResult = verifyClearance(issueIds, testMap);

  if (!testResult.pass) {
    console.error(
      `[Clearance Guard] PROBLEM_OMISSION_CIRCUIT_BREAKER: ${testResult.missing.length} issue(s) missing verified test assertions: ${testResult.missing.join(', ')}`
    );
    return testResult;
  }

  console.log(
    `[Clearance Guard] All ${testResult.verified.length} canonical issues verified in test suite: ${testResult.verified.join(', ')} (Status: PASS)`
  );

  // 2. If report/deliverable content is supplied, verify 1:1 reconciliation and empirical fact-checking
  if (options.reportContent) {
    const reconResult = verifyReconciliation(issueIds, options.reportContent);
    if (!reconResult.pass) {
      if (reconResult.missing.length > 0) {
        console.error(
          `[Clearance Guard] PROBLEM_RECONCILIATION_OMISSION_BLOCKED: ${reconResult.missing.length} issue(s) missing from reconciliation matrix: ${reconResult.missing.join(', ')}`
        );
      }
      if (reconResult.unproved.length > 0) {
        console.error(
          `[Clearance Guard] PROBLEM_RECONCILIATION_DEFICIT_BLOCKED: ${reconResult.unproved.length} issue(s) lack physical anchor or [Measured] Exit Code 0 evidence: ${reconResult.unproved.join(', ')}`
        );
      }
      return { pass: false, ...reconResult };
    }
    console.log(
      `[Clearance Guard] 1:1 Reconciliation Matrix & Fact-Checking verified for all ${reconResult.verified.length} issues (Status: PASS)`
    );
  }

  return testResult;
}

// Direct CLI execution
if (process.argv[1] && process.argv[1].endsWith('check-issue-clearance.mjs')) {
  let customDossier = null;
  const dossierIdx = process.argv.indexOf('--dossier');
  if (dossierIdx !== -1 && process.argv[dossierIdx + 1]) {
    customDossier = resolve(process.cwd(), process.argv[dossierIdx + 1]);
  }

  const result = runClearanceGuard({ dossier: customDossier });
  if (!result.pass) {
    process.exit(1);
  }
  process.exit(0);
}
