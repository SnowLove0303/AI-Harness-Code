#!/usr/bin/env node
/**
 * Workflow Specification Compliance Static Guard (WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD).
 *
 * Parses Gate 1 dossiers, change proposals, and workflow specifications for
 * canonical atomic identifiers formatted as [(SPEC-RULE|AUDIT-CHECK)-\d{2}] and
 * mechanically verifies that every rule is covered by a dedicated automated
 * test assertion in the test suite.
 *
 * Exit code 0: All canonical rules verified or non-rule specification.
 * Exit code 1: Missing test assertions (WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER).
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

/**
 * Extracts unique [(SPEC-RULE|AUDIT-CHECK)-\d{2}] identifiers from text content.
 * @param {string} content
 * @returns {string[]} Sorted array of unique rule IDs (e.g. ['[SPEC-RULE-01]', '[AUDIT-CHECK-01]'])
 */
export function extractRuleIds(content) {
  if (!content || typeof content !== 'string') return [];
  const matches = content.match(/\[(SPEC-RULE|AUDIT-CHECK)-\d{2}\]/g);
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
 * Verifies that each rule ID is present in at least one test file's content.
 * @param {string[]} ruleIds
 * @param {Record<string, string> | string} testContents
 * @returns {{ verified: string[], missing: string[], pass: boolean, total: number }}
 */
export function verifyCompliance(ruleIds, testContents) {
  const verified = [];
  const missing = [];
  const allContent =
    typeof testContents === 'string'
      ? testContents
      : Object.values(testContents).join('\n');

  for (const ruleId of ruleIds) {
    if (allContent.includes(ruleId)) {
      verified.push(ruleId);
    } else {
      missing.push(ruleId);
    }
  }

  return {
    verified,
    missing,
    pass: missing.length === 0,
    total: ruleIds.length,
  };
}

/**
 * Locates the most relevant specification or Gate 1 dossier.
 * Priority:
 * 1. Explicitly provided custom path
 * 2. Active change spec files in openspec/changes/
 * 3. Most recent Gate 1 dossier in openspec/gate1-dossiers/
 * @param {{ spec?: string, dossier?: string }} [options]
 * @returns {string | null}
 */
export function locateTargetSpec(options = {}) {
  if (options.spec && existsSync(options.spec)) {
    return options.spec;
  }
  if (options.dossier && existsSync(options.dossier)) {
    return options.dossier;
  }

  // Check active changes in openspec/changes/
  const changesDir = join(repoRoot, 'openspec', 'changes');
  if (existsSync(changesDir)) {
    const changes = readdirSync(changesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && e.name !== 'archive')
      .map((e) => join(changesDir, e.name));

    for (const changePath of changes) {
      // Check specs/
      const specsSubDir = join(changePath, 'specs');
      if (existsSync(specsSubDir)) {
        const specFiles = [];
        const scan = (d) => {
          for (const ent of readdirSync(d, { withFileTypes: true })) {
            const full = join(d, ent.name);
            if (ent.isDirectory()) scan(full);
            else if (ent.isFile() && ent.name.endsWith('.md')) specFiles.push(full);
          }
        };
        scan(specsSubDir);
        if (specFiles.length > 0) {
          // If any spec file contains rule IDs, return it
          for (const sf of specFiles) {
            const c = readFileSync(sf, 'utf8');
            if (extractRuleIds(c).length > 0) return sf;
          }
          return specFiles[0];
        }
      }

      // Check proposal.md
      const proposal = join(changePath, 'proposal.md');
      if (existsSync(proposal)) {
        const c = readFileSync(proposal, 'utf8');
        if (extractRuleIds(c).length > 0) return proposal;
      }
    }
  }

  // Check archived changes in openspec/changes/archive/
  const archiveDir = join(repoRoot, 'openspec', 'changes', 'archive');
  if (existsSync(archiveDir)) {
    const archives = readdirSync(archiveDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => join(archiveDir, e.name))
      .sort((a, b) => b.localeCompare(a));

    for (const archivePath of archives) {
      const specsSubDir = join(archivePath, 'specs');
      if (existsSync(specsSubDir)) {
        const specFiles = [];
        const scan = (d) => {
          for (const ent of readdirSync(d, { withFileTypes: true })) {
            const full = join(d, ent.name);
            if (ent.isDirectory()) scan(full);
            else if (ent.isFile() && ent.name.endsWith('.md')) specFiles.push(full);
          }
        };
        scan(specsSubDir);
        for (const sf of specFiles) {
          const c = readFileSync(sf, 'utf8');
          if (extractRuleIds(c).length > 0) return sf;
        }
      }
    }
  }

  // Check living specs
  const livingSpec = join(repoRoot, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');
  if (existsSync(livingSpec)) {
    const c = readFileSync(livingSpec, 'utf8');
    if (extractRuleIds(c).length > 0) return livingSpec;
  }

  // Check gate1-dossiers
  const dossiersDir = join(repoRoot, 'openspec', 'gate1-dossiers');
  if (existsSync(dossiersDir)) {
    const files = readdirSync(dossiersDir)
      .filter((f) => f.endsWith('.md'))
      .sort((a, b) => b.localeCompare(a)); // Lexicographically newest first (YYYY-MM-DD)

    for (const f of files) {
      const fullPath = join(dossiersDir, f);
      const c = readFileSync(fullPath, 'utf8');
      if (extractRuleIds(c).length > 0) {
        return fullPath;
      }
    }

    if (files.length > 0) {
      return join(dossiersDir, files[0]);
    }
  }

  return null;
}

/**
 * Main execution runner for Workflow Specification Compliance Guard.
 * @param {{ spec?: string, dossier?: string, testDir?: string }} [options]
 * @returns {{ pass: boolean, total: number, verified: string[], missing: string[] }}
 */
export function runWorkflowSpecGuard(options = {}) {
  const specPath = locateTargetSpec(options);
  if (!specPath) {
    console.log('[Workflow Spec Guard] No specification or Gate 1 dossier found. Skipping compliance check. (Status: PASS)');
    return { pass: true, total: 0, verified: [], missing: [] };
  }

  console.log(`[Workflow Spec Guard] Parsing specification asset: ${specPath}`);
  const specContent = readFileSync(specPath, 'utf8');
  const ruleIds = extractRuleIds(specContent);

  if (ruleIds.length === 0) {
    console.log('[Workflow Spec Guard] No canonical [(SPEC-RULE|AUDIT-CHECK)-xx] identifiers detected. Non-rule specification or 0 rules. (Status: PASS)');
    return { pass: true, total: 0, verified: [], missing: [] };
  }

  console.log(`[Workflow Spec Guard] Detected ${ruleIds.length} canonical rule(s): ${ruleIds.join(', ')}`);

  const testDir = options.testDir || join(repoRoot, 'tests');
  const testFiles = findTestFiles(testDir);
  const testMap = loadTestFilesMap(testFiles);

  const result = verifyCompliance(ruleIds, testMap);

  if (!result.pass) {
    console.error(
      `[Workflow Spec Guard] WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER: ${result.missing.length} rule(s) missing verified test assertions: ${result.missing.join(', ')}`
    );
    return result;
  }

  console.log(
    `[Workflow Spec Guard] All ${result.verified.length} canonical rules verified in test suite: ${result.verified.join(', ')} (Status: PASS)`
  );
  return result;
}

// Direct CLI execution
if (process.argv[1] && process.argv[1].endsWith('check-workflow-spec-compliance.mjs')) {
  let customSpec = null;
  let customDossier = null;
  let customTestDir = null;

  const specIdx = process.argv.indexOf('--spec');
  if (specIdx !== -1 && process.argv[specIdx + 1]) {
    customSpec = resolve(process.cwd(), process.argv[specIdx + 1]);
  }

  const dossierIdx = process.argv.indexOf('--dossier');
  if (dossierIdx !== -1 && process.argv[dossierIdx + 1]) {
    customDossier = resolve(process.cwd(), process.argv[dossierIdx + 1]);
  }

  const testDirIdx = process.argv.indexOf('--testDir');
  if (testDirIdx !== -1 && process.argv[testDirIdx + 1]) {
    customTestDir = resolve(process.cwd(), process.argv[testDirIdx + 1]);
  }

  const result = runWorkflowSpecGuard({
    spec: customSpec,
    dossier: customDossier,
    testDir: customTestDir,
  });

  if (!result.pass) {
    process.exit(1);
  }
  process.exit(0);
}
