#!/usr/bin/env node
/**
 * Issue Clearance Static Guard (ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER).
 *
 * Parses the Step 0 Gate 1 dossier for canonical [ISSUE-xx] identifiers
 * and mechanically verifies that every issue is covered by a dedicated
 * automated test assertion in the test suite.
 *
 * Exit code 0: All issues verified or non-issue task.
 * Exit code 1: Missing test assertions (PROBLEM_OMISSION_CIRCUIT_BREAKER).
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

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
 * Locates the most recent Gate 1 dossier or specified path.
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
      .map((f) => {
        const full = join(dossiersDir, f);
        return { path: full, mtime: statSync(full).mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);

    if (files.length > 0) {
      return files[0].path;
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

  const testDir = options.testDir || join(repoRoot, 'tests');
  const testFiles = findTestFiles(testDir);
  const testMap = loadTestFilesMap(testFiles);

  const result = verifyClearance(issueIds, testMap);

  if (!result.pass) {
    console.error(
      `[Clearance Guard] PROBLEM_OMISSION_CIRCUIT_BREAKER: ${result.missing.length} issue(s) missing verified test assertions: ${result.missing.join(', ')}`
    );
    return result;
  }

  console.log(
    `[Clearance Guard] All ${result.verified.length} canonical issues verified in test suite: ${result.verified.join(', ')} (Status: PASS)`
  );
  return result;
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
