#!/usr/bin/env node
/**
 * Unslop Purity Static Guard (MECHANICAL_L2_UNSLOP_ASSERTION_GATE).
 *
 * Scans documentation and source files for conversational filler,
 * AI buzzwords, and ungrounded trailing participial clauses.
 *
 * Exit code 0: Clean, zero violations.
 * Exit code 1: Violations detected or file error.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

export const BANNED_BUZZWORDS = [
  'delve',
  'crucial',
  'landscape',
  'pivotal',
  'testament',
  'underscore',
  'vibrant',
  'foster',
  'enhance',
  'showcase',
];

export const BANNED_PARTICIPLES = [
  'ensuring',
  'highlighting',
  'reflecting',
  'showcasing',
  'fostering',
];

const BUZZWORD_REGEX_G = new RegExp(`\\b(?:${BANNED_BUZZWORDS.join('|')})\\b`, 'gi');
const PARTICIPLE_REGEX_G = new RegExp(`,\\s*(?:${BANNED_PARTICIPLES.join('|')})\\b`, 'gi');

/**
 * Remove fenced code blocks and inline backtick code spans
 * to prevent false positives when defining rules or quoting syntax.
 */
export function stripCodeSpans(text) {
  // Replace fenced code blocks with empty lines preserving line count
  const withoutCodeBlocks = text.replace(/```[\s\S]*?```/g, (match) => {
    const lines = match.split('\n');
    return '\n'.repeat(lines.length - 1);
  });
  // Strip inline code spans
  return withoutCodeBlocks.replace(/`[^`\n]+`/g, ' ');
}

/**
 * Check a string content for unslop violations.
 * Returns array of { line, rule, snippet }.
 */
export function checkContent(content, filename = 'inline') {
  const violations = [];
  const sanitized = stripCodeSpans(content);
  const lines = sanitized.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    if (!trimmed) return;

    const buzzMatches = [...line.matchAll(BUZZWORD_REGEX_G)];
    for (const match of buzzMatches) {
      violations.push({
        file: filename,
        line: lineNum,
        rule: `AI Buzzword (${match[0]})`,
        snippet: trimmed.slice(0, 120),
      });
    }

    const partMatches = [...line.matchAll(PARTICIPLE_REGEX_G)];
    for (const match of partMatches) {
      violations.push({
        file: filename,
        line: lineNum,
        rule: `Ungrounded Participle (${match[0].trim()})`,
        snippet: trimmed.slice(0, 120),
      });
    }
  });

  return violations;
}

/**
 * Check a single file on disk.
 */
export function checkFile(filePath) {
  const fullPath = resolve(filePath);
  if (!existsSync(fullPath)) {
    return [{
      file: filePath,
      line: 0,
      rule: 'File not found',
      snippet: fullPath,
    }];
  }
  const content = readFileSync(fullPath, 'utf8');
  return checkContent(content, filePath);
}

/**
 * Default scan targets if no arguments are provided.
 */
export const DEFAULT_TARGETS = [
  'worker.md',
  'README.md',
  'packages/ai-harness/README.md',
  'packages/ai-harness/CHANGELOG.md',
];

export function runCLI(targets = process.argv.slice(2)) {
  const scanTargets = targets.length > 0 ? targets : DEFAULT_TARGETS;
  let totalViolations = 0;
  let scannedFiles = 0;

  console.log(`=== Unslop Purity Static Guard (MECHANICAL_L2_UNSLOP_ASSERTION_GATE) ===`);

  for (const rel of scanTargets) {
    const targetPath = resolve(repoRoot, rel);
    if (!existsSync(targetPath)) {
      // Optional default files may not exist yet in fresh clone; skip with note
      continue;
    }

    scannedFiles += 1;
    const violations = checkFile(targetPath);
    if (violations.length > 0) {
      console.error(`✗ ${rel} — ${violations.length} violation(s):`);
      for (const v of violations) {
        console.error(`  Line ${v.line} [${v.rule}]: ${v.snippet}`);
      }
      totalViolations += violations.length;
    } else {
      console.log(`✓ ${rel} — Clean`);
    }
  }

  console.log(`\nScanned ${scannedFiles} file(s), ${totalViolations} violation(s) found.`);

  if (totalViolations > 0) {
    console.error(`[FAIL] Unslop purity gate rejected changes with Exit Code 1.`);
    process.exit(1);
  } else {
    console.log(`[PASS] Unslop purity gate verified with Exit Code 0.`);
    process.exit(0);
  }
}

// Execute when run directly as CLI
if (process.argv[1] && process.argv[1].endsWith('check-unslop-purity.mjs')) {
  runCLI();
}
