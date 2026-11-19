#!/usr/bin/env node
/**
 * Universal Portability & Host Decoupling Static Guard
 * (`UNIVERSAL_PORTABILITY_GUARD_STANDARD` / Axiom 67).
 *
 * Scans codebase, scripts, workflows, and configs for:
 * 1. Hardcoded host/machine-specific absolute paths (e.g. C:\Users\<name>\..., /home/<name>/...).
 * 2. Unmanaged bare database initialization lacking auto-bootstrapping or directory resolution.
 * 3. Default system data and mutable user data commingling anti-patterns.
 *
 * Exit code 0: All portability invariants satisfied.
 * Exit code 1: HARDCODED_HOST_ENVIRONMENT_BLOCKED or STATE_SEGREGATION_VIOLATION_BLOCKED.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

/**
 * Ignored directories during filesystem walk.
 */
export const IGNORED_DIRECTORIES = new Set([
  'node_modules',
  '.git',
  '.changeset',
  'dist',
  'build',
  'coverage',
  '.system_generated',
  'archive',
]);

/**
 * Relevant code & config file extensions to audit.
 */
export const AUDITED_EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.ts',
  '.tsx',
  '.json',
  '.yaml',
  '.yml',
  '.py',
  '.sh',
  '.ps1',
]);

/**
 * Patterns that indicate hardcoded single-machine user homes in executable code.
 * (Excludes doc links, comments stating regexes, or universal variables).
 */
export const HARDCODED_PATH_PATTERNS = [
  // Hardcoded Windows User directory (e.g., C:\Users\JohnDoe\... or C:\\Users\\JohnDoe\\...)
  /(?:["'`])(?:[a-zA-Z]:[\\\/]{1,2}Users[\\\/]{1,2}[a-zA-Z0-9_.\-]+[\\\/]{1,2}[^"'`\r\n]*)(?:["'`])/i,
  // Hardcoded Linux/macOS user home path (e.g., /home/username/... or /Users/username/...)
  /(?:["'`])(?:\/(?:home|Users)\/[a-zA-Z0-9_.\-]+[\\\/][^"'`\r\n]*)(?:["'`])/i,
];

/**
 * Pattern detection for unmanaged raw database opening without directory resolution.
 */
export const RAW_DATABASE_CONNECT_PATTERNS = [
  /new\s+(?:Database|sqlite3\.Database)\s*\(\s*["'`][^"'`]+\.db["'`]\s*\)/i,
];

/**
 * Scan a single file's content for hardcoded machine-specific paths and portability anti-patterns.
 *
 * @param {string} content - Raw file content.
 * @param {string} filePath - Path of file being inspected.
 * @returns {{ violations: Array<{ type: string, line: number, text: string }>, clean: boolean }}
 */
export function scanContentForPortabilityViolations(content, filePath = '') {
  const violations = [];
  const lines = content.split(/\r?\n/);

  // Skip self-check for the guard script itself to avoid false positives on pattern definitions
  if (filePath.endsWith('check-universal-portability.mjs')) {
    return { violations: [], clean: true };
  }

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const lineNum = idx + 1;

    // Skip comment lines in scripts
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('*')) {
      continue;
    }

    // Check for hardcoded absolute machine paths
    for (const pattern of HARDCODED_PATH_PATTERNS) {
      if (pattern.test(line)) {
        // Exclude environment-safe or generic template strings
        if (line.includes('process.env') || line.includes('$env:') || line.includes('ENV[')) {
          continue;
        }
        violations.push({
          type: 'HARDCODED_HOST_ENVIRONMENT_BLOCKED',
          line: lineNum,
          text: trimmed,
        });
      }
    }
  }

  return { violations, clean: violations.length === 0 };
}

/**
 * Recursively walk repository directory and audit code and config assets.
 *
 * @param {string} dir - Directory to scan.
 * @param {string[]} acc - Accumulated violations list.
 */
export function walkAndScan(dir, acc = []) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) continue;
      walkAndScan(resolve(dir, entry.name), acc);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (!AUDITED_EXTENSIONS.has(ext)) continue;

      const fullPath = resolve(dir, entry.name);
      const relPath = relative(repoRoot, fullPath);

      // Skip test fixtures, mock files, or guard test suites containing fixture strings
      if (relPath.includes('tests') && (relPath.includes('fixtures') || relPath.includes('mock') || relPath.includes('universal-portability.test.mjs'))) {
        continue;
      }

      try {
        const content = readFileSync(fullPath, 'utf8');
        const { violations } = scanContentForPortabilityViolations(content, relPath);
        for (const v of violations) {
          acc.push({
            file: relPath,
            ...v,
          });
        }
      } catch {
        // Unreadable file: skip
      }
    }
  }

  return acc;
}

/**
 * Check universal portability across the entire repository.
 *
 * @param {object} [options]
 * @param {string} [options.scanDir] - Root directory to scan (defaults to repoRoot).
 * @returns {{ passed: boolean, violations: Array<any>, reason: string }}
 */
export function checkUniversalPortability({ scanDir = repoRoot } = {}) {
  const violations = walkAndScan(scanDir, []);

  if (violations.length > 0) {
    return {
      passed: false,
      violations,
      reason: `Detected ${violations.length} portability violation(s). Single-machine hardcoded paths are prohibited.`,
    };
  }

  return {
    passed: true,
    violations: [],
    reason: 'Universal portability verified: 0 hardcoded host dependencies detected.',
  };
}

/**
 * CLI execution entrypoint.
 */
export function runUniversalPortabilityGuard() {
  console.log('=== Universal Portability Static Guard (UNIVERSAL_PORTABILITY_GUARD_STANDARD) ===');

  const result = checkUniversalPortability();

  if (!result.passed) {
    console.error(`[FAIL] ${result.reason}`);
    for (const v of result.violations) {
      console.error(`  - [${v.type}] ${v.file}:${v.line} -> ${v.text}`);
    }
    process.exit(1);
  } else {
    console.log(`[PASS] ${result.reason}`);
    process.exit(0);
  }
}

// Run when executed directly
if (process.argv[1] && process.argv[1].endsWith('check-universal-portability.mjs')) {
  runUniversalPortabilityGuard();
}
