#!/usr/bin/env node
/**
 * Invocation Purity Static Guard (INVOCATION_PURITY_GUARD_STANDARD).
 *
 * Scans Git diff or supplied diff text for modifications in engine directories
 * during invocation-classified tasks. Enforces CALLED_PROGRAM_READONLY_LOCK.
 *
 * Exit code 0: Clean diff or non-invocation task.
 * Exit code 1: CALLED_PROGRAM_TAMPERING_DETECTED or execution error.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

/**
 * Engine/core directory prefixes that must not be modified during invocation tasks.
 * Universal: applies to any project using engine-plane separation.
 */
export const ENGINE_DIRECTORIES = [
  'src/',
  'core/',
  'engine/',
  'lib/',
  'dist/',
  'build/',
  'vendor/',
  'node_modules/',
  'packages/',
];

/**
 * Determine if a task is classified as an invocation-only task.
 * Checks for an INVOCATION_TASK marker in the task metadata file or env var.
 *
 * @param {string} [taskMetadataPath] - Optional path to a task metadata JSON file.
 * @returns {boolean}
 */
export function isInvocationTask(taskMetadataPath) {
  // Allow explicit override via environment variable
  if (process.env.INVOCATION_TASK === 'true') return true;
  if (process.env.INVOCATION_TASK === 'false') return false;

  // Check task metadata file if provided
  if (taskMetadataPath && existsSync(taskMetadataPath)) {
    try {
      const meta = JSON.parse(readFileSync(taskMetadataPath, 'utf8'));
      if (meta.invocationTask === true) return true;
      if (meta.taskType === 'invocation') return true;
    } catch {
      // Malformed metadata: safe default is non-invocation
    }
  }

  // Default: not classified as invocation task → guard passes
  return false;
}

/**
 * Scan a diff text for modifications in engine directories.
 *
 * @param {string} diffText - Unified diff output.
 * @returns {{ violations: string[], clean: boolean }}
 */
export function scanDiffForEngineModifications(diffText) {
  const violations = [];
  const lines = diffText.split(/\r?\n/);

  for (const line of lines) {
    // Unified diff file header lines: +++ b/<path> or --- a/<path>
    if (!line.startsWith('+++ b/') && !line.startsWith('--- b/')) continue;
    // Strip prefix
    const filePath = line.slice(6).trim();
    if (filePath === '/dev/null') continue;

    for (const engineDir of ENGINE_DIRECTORIES) {
      if (filePath.startsWith(engineDir) || filePath.includes(`/${engineDir}`)) {
        violations.push(filePath);
        break;
      }
    }
  }

  return { violations, clean: violations.length === 0 };
}

/**
 * Run the full invocation purity check against the current Git diff.
 *
 * @param {object} [options]
 * @param {string} [options.diffText]          - Explicit diff text (bypasses git).
 * @param {string} [options.taskMetadataPath]  - Path to task metadata JSON.
 * @returns {{ passed: boolean, reason: string, violations: string[] }}
 */
export function checkInvocationPurity({ diffText, taskMetadataPath } = {}) {
  if (!isInvocationTask(taskMetadataPath)) {
    return { passed: true, reason: 'Non-invocation task: guard not applicable.', violations: [] };
  }

  let diff = diffText;
  if (!diff) {
    try {
      diff = execSync('git diff HEAD', { cwd: repoRoot, encoding: 'utf8' });
    } catch (err) {
      return {
        passed: false,
        reason: `Git diff failed: ${err.message}`,
        violations: [],
      };
    }
  }

  const { violations, clean } = scanDiffForEngineModifications(diff);

  if (!clean) {
    return {
      passed: false,
      reason: 'CALLED_PROGRAM_TAMPERING_DETECTED: Prohibited modification in engine directory.',
      violations,
    };
  }

  return { passed: true, reason: 'Invocation purity verified: all changes in caller plane.', violations: [] };
}

/**
 * CLI entry point.
 */
export function runInvocationPurityGuard() {
  console.log('=== Invocation Purity Static Guard (INVOCATION_PURITY_GUARD_STANDARD) ===');

  const taskMetadataPath = process.env.INVOCATION_TASK_META
    ? resolve(process.env.INVOCATION_TASK_META)
    : resolve(repoRoot, '.invocation-task.json');

  const result = checkInvocationPurity({ taskMetadataPath });

  if (!result.passed) {
    console.error(`[FAIL] ${result.reason}`);
    if (result.violations.length > 0) {
      console.error('Prohibited engine modifications detected:');
      for (const v of result.violations) {
        console.error(`  - ${v}`);
      }
    }
    process.exit(1);
  } else {
    console.log(`[PASS] ${result.reason}`);
    process.exit(0);
  }
}

// Direct execution
if (process.argv[1] && process.argv[1].endsWith('check-invocation-purity.mjs')) {
  runInvocationPurityGuard();
}
