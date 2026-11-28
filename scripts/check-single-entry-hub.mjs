#!/usr/bin/env node
/**
 * Single-Entry Hub & Toolbox Index Guard
 *
 * 1. Prevents GEMINI.md from bloating beyond 16KB (16384 bytes).
 * 2. Validates docs/toolbox-index.json schema and verifies all referenced skill/guard paths exist.
 *
 * Exit code 0: All invariants satisfied.
 * Exit code 1: Violation detected.
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, '..');

export const MAX_GEMINI_MD_BYTES = 16 * 1024;
const PS_HUB_PREFIX = '~/.gemini/ps-hub/';
const SKILL_PATH_FIELDS = ['path', 'references', 'hardRules', 'script'];

/**
 * Resolves a toolbox path into a concrete filesystem path.
 * `~/.gemini/ps-hub/<rel>` maps to `<repoRoot>/<rel>` (the repository source of truth).
 */
export function resolveToolboxPath(rawPath, repoRoot, homeDir = os.homedir()) {
  const normalized = String(rawPath || '').trim();
  if (!normalized) return '';

  if (normalized.startsWith(PS_HUB_PREFIX)) {
    const rel = normalized.slice(PS_HUB_PREFIX.length);
    return path.resolve(repoRoot, rel);
  }
  if (normalized.startsWith('~/') || normalized.startsWith('~\\')) {
    return path.resolve(homeDir, normalized.slice(2));
  }
  if (path.isAbsolute(normalized)) {
    return path.resolve(normalized);
  }
  return path.resolve(repoRoot, normalized);
}

/**
 * Checks that GEMINI.md exists and does not exceed maxBytes (default 16KB).
 */
export function checkGeminiMdSize(geminiPath, maxBytes = MAX_GEMINI_MD_BYTES) {
  const violations = [];
  if (!existsSync(geminiPath)) {
    violations.push({
      code: 'GEMINI_MD_MISSING',
      file: geminiPath,
      message: `Missing GEMINI.md at ${geminiPath}`,
    });
    return { valid: false, size: 0, maxBytes, violations };
  }

  const size = statSync(geminiPath).size;
  if (size > maxBytes) {
    violations.push({
      code: 'GEMINI_MD_SIZE_EXCEEDED',
      file: geminiPath,
      size,
      maxBytes,
      message: `GEMINI.md size (${size} bytes) exceeds ${maxBytes} bytes (16KB) limit.`,
    });
  }

  return {
    valid: violations.length === 0,
    size,
    maxBytes,
    violations,
  };
}

/**
 * Validates docs/toolbox-index.json JSON structure and verifies all referenced paths exist.
 */
export function checkToolboxIndex(indexPath, repoRoot, homeDir = os.homedir()) {
  const violations = [];
  let checkedCount = 0;

  if (!existsSync(indexPath)) {
    violations.push({
      code: 'TOOLBOX_INDEX_MISSING',
      file: indexPath,
      message: `Missing toolbox index at ${indexPath}`,
    });
    return { valid: false, checkedCount, violations };
  }

  let data;
  try {
    data = JSON.parse(readFileSync(indexPath, 'utf8'));
  } catch (err) {
    violations.push({
      code: 'TOOLBOX_INDEX_INVALID_JSON',
      file: indexPath,
      message: `Invalid JSON in ${indexPath}: ${err.message}`,
    });
    return { valid: false, checkedCount, violations };
  }

  if (!data || typeof data !== 'object' || !Array.isArray(data.skills)) {
    violations.push({
      code: 'TOOLBOX_INDEX_SCHEMA_INVALID',
      file: indexPath,
      message: 'Toolbox index must contain a "skills" array.',
    });
    return { valid: false, checkedCount, violations };
  }

  const verifyTarget = (label, rawPath) => {
    checkedCount++;
    const resolved = resolveToolboxPath(rawPath, repoRoot, homeDir);
    if (!resolved || !existsSync(resolved)) {
      violations.push({
        code: 'TOOLBOX_PATH_NOT_FOUND',
        target: label,
        rawPath,
        resolvedPath: resolved,
        message: `Toolbox reference "${label}" points to missing path: ${rawPath} (resolved: ${resolved})`,
      });
    }
  };

  for (const skill of data.skills) {
    const skillId = skill?.id || '<unknown-skill>';
    if (!skill || typeof skill !== 'object' || !skill.path) {
      violations.push({
        code: 'TOOLBOX_SKILL_PATH_MISSING',
        target: skillId,
        message: `Skill entry "${skillId}" is missing required "path" field.`,
      });
      continue;
    }

    for (const field of SKILL_PATH_FIELDS) {
      if (skill[field] !== undefined) {
        verifyTarget(`skills.${skillId}.${field}`, skill[field]);
      }
    }
  }

  if (data.l2Guards !== undefined) {
    if (!data.l2Guards || typeof data.l2Guards !== 'object' || Array.isArray(data.l2Guards)) {
      violations.push({
        code: 'TOOLBOX_INDEX_SCHEMA_INVALID',
        file: indexPath,
        message: 'Toolbox index "l2Guards" must be an object mapping guard names to paths.',
      });
    } else {
      for (const [guardName, guardPath] of Object.entries(data.l2Guards)) {
        verifyTarget(`l2Guards.${guardName}`, guardPath);
      }
    }
  }

  return {
    valid: violations.length === 0,
    checkedCount,
    violations,
  };
}

/**
 * Runs the full Single-Entry Hub & Toolbox Index check against a repository root.
 */
export function checkSingleEntryHub({
  repoRoot = defaultRepoRoot,
  maxGeminiBytes = MAX_GEMINI_MD_BYTES,
  homeDir = os.homedir(),
} = {}) {
  const gemini = checkGeminiMdSize(path.join(repoRoot, 'GEMINI.md'), maxGeminiBytes);
  const toolbox = checkToolboxIndex(path.join(repoRoot, 'docs', 'toolbox-index.json'), repoRoot, homeDir);
  const violations = [...gemini.violations, ...toolbox.violations];

  return {
    valid: violations.length === 0,
    gemini,
    toolbox,
    violations,
  };
}

function runCli() {
  const result = checkSingleEntryHub({ repoRoot: defaultRepoRoot });

  console.log('=== Single-Entry Hub & Toolbox Index Guard ===');
  console.log(`GEMINI.md size: ${result.gemini.size} / ${result.gemini.maxBytes} bytes`);
  console.log(`Toolbox paths checked: ${result.toolbox.checkedCount}`);

  if (!result.valid) {
    for (const v of result.violations) {
      console.error(`[FAIL] ${v.code}: ${v.message}`);
    }
    process.exit(1);
  }

  console.log('[PASS] GEMINI.md is within 16KB limit and all docs/toolbox-index.json paths are valid.');
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  runCli();
}
