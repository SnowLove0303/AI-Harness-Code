import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  checkLocalUpstreamMirror,
  evaluateReframeTrigger,
  validateCitations,
} from '../scripts/check-pstack-sync.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Local pstack-upstream mirror is at v0.15.48+ and includes /reframe and /statechart', () => {
  const upstreamDir =
    process.env.PSTACK_UPSTREAM_DIR || path.join(os.homedir(), '.gemini', 'pstack-upstream');
  const result = checkLocalUpstreamMirror(upstreamDir);
  assert.equal(result.valid, true, `Upstream mirror issues: ${JSON.stringify(result.violations)}`);
});

test('2. Ambiguity threshold gate activates /reframe on vague prompts and bypasses on concrete technical anchors', () => {
  const vague = evaluateReframeTrigger('I need a better way to organize modules so repeated bugs stop happening');
  assert.equal(vague.trigger, 'REFRAME_REQUIRED');

  const explicitInvoke = evaluateReframeTrigger('/reframe this architecture problem');
  assert.equal(explicitInvoke.trigger, 'REFRAME_REQUIRED');
  assert.equal(explicitInvoke.reason, 'EXPLICIT_REFRAME_INVOCATION');

  const crisp = evaluateReframeTrigger('Fix TypeError in scripts/check-project-graph.mjs at L42');
  assert.equal(crisp.trigger, 'DIRECT_RTM_INGESTION');
});

test('3. Zero-fabricated-citation guard blocks unverified citations (UNVERIFIED_CITATION_BLOCKED)', () => {
  const invalid = validateCitations([
    { url: 'https://example.com/confirmed', verified: true },
    { url: 'https://example.com/hallucinated', verified: false },
  ]);
  assert.equal(invalid.valid, false);
  assert.ok(invalid.violations.some((v) => v.code === 'UNVERIFIED_CITATION_BLOCKED'));

  const valid = validateCitations([{ url: 'https://github.com/cursor/plugins', verified: true }]);
  assert.equal(valid.valid, true);
});

test('4. Route map registers /reframe under companionSkills while preserving 23-playbook invariant', () => {
  const routeMapPath = path.join(repoRoot, 'docs', 'pstack-openspec-route-map.json');
  assert.ok(existsSync(routeMapPath), 'route map must exist');
  const routeMap = JSON.parse(readFileSync(routeMapPath, 'utf8'));

  assert.equal(routeMap.routes.length, 23, 'Must preserve exact 23-playbook invariant');
  assert.ok(Array.isArray(routeMap.companionSkills), 'Must define companionSkills array');
  const reframe = routeMap.companionSkills.find((s) => s.id === 'reframe');
  assert.ok(reframe, 'companionSkills must include reframe');
  assert.equal(reframe.geminiModelTier, 'pro');
});

test('5. Axiom 72 is codified identically across all three constitutional mirrors', () => {
  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM',
    'UPSTREAM_PSTACK_V01548_MIRROR_SYNC',
    'REFRAME_STEP0_DISAMBIGUATION_PROTOCOL',
    'REFRAME_AMBIGUITY_THRESHOLD_GATE',
    'REFRAME_COMPANION_ROUTE_REGISTRATION',
    'WINDOWS_STATECHART_&_MODEL_ROUTING_PARITY',
    'UPSTREAM_PSTACK_SYNC_INSPECTOR_STANDARD',
    'ZERO_FABRICATED_CITATION_STANDARD',
    'AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'UNVERIFIED_CITATION_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
