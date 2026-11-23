import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  bootstrapProjectGraph,
  computeBlastRadius,
  validateProjectGraph,
} from '../scripts/check-project-graph.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Repository canonical .harness/project-graph.json passes schema, anti-staleness, and hotspot guards', () => {
  const graphPath = path.join(repoRoot, '.harness', 'project-graph.json');
  assert.ok(existsSync(graphPath), '.harness/project-graph.json must exist');

  const graph = JSON.parse(readFileSync(graphPath, 'utf8'));
  const result = validateProjectGraph(graph, repoRoot);
  assert.equal(result.valid, true, `Graph violations: ${JSON.stringify(result.violations)}`);
  assert.ok(graph.modules.length >= 5, 'Graph should model core repository modules');
});

test('2. Anti-staleness guard detects non-existent module paths (STALE_PROJECT_GRAPH_BLOCKED)', () => {
  const staleGraph = {
    schemaVersion: '1.0.0',
    modules: [
      {
        id: 'mod-ghost',
        name: 'Ghost Module',
        ownership: 'Core',
        paths: ['non-existent-directory/ghost-file.mjs'],
        dependencies: [],
        riskTier: 'standard',
        errorMutationCount: 0,
        structuralGuards: [],
        maintenanceItems: [],
      },
    ],
  };

  const result = validateProjectGraph(staleGraph, repoRoot);
  assert.equal(result.valid, false);
  assert.ok(
    result.violations.some((v) => v.code === 'STALE_PROJECT_GRAPH_BLOCKED'),
    'Must report STALE_PROJECT_GRAPH_BLOCKED for missing paths'
  );
});

test('3. Repeated-mutation hotspot circuit breaker blocks unguarded hotspots (REPEATED_HOTSPOT_MUTATION_BLOCKED)', () => {
  const hotspotGraph = {
    schemaVersion: '1.0.0',
    modules: [
      {
        id: 'mod-fragile',
        name: 'Fragile Module',
        ownership: 'Core',
        paths: ['package.json'],
        dependencies: [],
        riskTier: 'standard',
        errorMutationCount: 2,
        structuralGuards: [],
        maintenanceItems: [],
      },
    ],
  };

  const blocked = validateProjectGraph(hotspotGraph, repoRoot);
  assert.equal(blocked.valid, false);
  assert.ok(
    blocked.violations.some((v) => v.code === 'REPEATED_HOTSPOT_MUTATION_BLOCKED'),
    'Must block module with errorMutationCount >= 2 lacking structuralGuards'
  );

  // Mitigate by adding a structural guard
  hotspotGraph.modules[0].structuralGuards = ['tests/project-architecture-graph.test.mjs'];
  const mitigated = validateProjectGraph(hotspotGraph, repoRoot);
  assert.equal(mitigated.valid, true, 'Adding structuralGuards must clear hotspot lock');
});

test('4. Multi-hop blast radius calculation traces direct and transitive dependents', () => {
  const sampleGraph = {
    schemaVersion: '1.0.0',
    modules: [
      { id: 'mod-core', dependencies: [], riskTier: 'critical_load_bearing' },
      { id: 'mod-service', dependencies: ['mod-core'], riskTier: 'standard' },
      { id: 'mod-api', dependencies: ['mod-service'], riskTier: 'standard' },
      { id: 'mod-isolated', dependencies: [], riskTier: 'standard' },
    ],
  };

  const blast = computeBlastRadius(sampleGraph, 'mod-core');
  assert.equal(blast.found, true);
  assert.equal(blast.riskTier, 'critical_load_bearing');
  assert.deepEqual(blast.directDependents, ['mod-service']);
  assert.deepEqual(blast.transitiveDependents.sort(), ['mod-api', 'mod-service']);
});

test('5. Cold-start bootstrap scaffolds a valid Graph skeleton for new repositories', () => {
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), 'graph-bootstrap-'));
  try {
    mkdirSync(path.join(tmpDir, 'src'));
    mkdirSync(path.join(tmpDir, 'tests'));

    const skeleton = bootstrapProjectGraph(tmpDir);
    const validation = validateProjectGraph(skeleton, tmpDir);
    assert.equal(validation.valid, true, `Bootstrapped graph invalid: ${JSON.stringify(validation.violations)}`);
    assert.ok(skeleton.modules.some((m) => m.id === 'mod-src'));
    assert.ok(skeleton.modules.some((m) => m.id === 'mod-tests'));
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('6. Axiom 70 is codified identically across all three constitutional mirrors', () => {
  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM',
    'PROJECT_ARCHITECTURE_GRAPH_MANDATE',
    'GRAPH_GUIDED_DIAGNOSIS_&_BLAST_RADIUS_PROTOCOL',
    'REPEATED_HOTSPOT_MUTATION_CIRCUIT_BREAKER',
    'GRAPH_MAINTENANCE_LEDGER_&_SYNC_PROTOCOL',
    'AUTOMATED_L2_PROJECT_GRAPH_GUARD_STANDARD',
    'COLD_START_GRAPH_BOOTSTRAP_STANDARD',
    'MODULE_RISK_TIERING_&_ESCALATED_REVIEW_GATE',
    'AXIOM_70_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'PROJECT_GRAPH_MISSING_BLOCKED',
    'UNLOCATED_MODULE_MUTATION_BLOCKED',
    'REPEATED_HOTSPOT_MUTATION_BLOCKED',
    'STALE_PROJECT_GRAPH_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
