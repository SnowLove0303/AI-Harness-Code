import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { evaluateAgentLifecycleAction } from '../scripts/check-agent-lifecycle.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Blocks unauthorized multi-agent spawning and Swarm creation (UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED)', () => {
  const multiSpawn = evaluateAgentLifecycleAction({
    action: 'spawn',
    targetRole: 'implementer',
    concurrentCount: 3,
    humanAuthorized: false,
  });
  assert.equal(multiSpawn.allowed, false);
  assert.equal(multiSpawn.code, 'UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED');

  const swarmSpawn = evaluateAgentLifecycleAction({
    action: 'swarm_add',
    targetRole: 'worker-impl',
    humanAuthorized: false,
  });
  assert.equal(swarmSpawn.allowed, false);
  assert.equal(swarmSpawn.code, 'UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED');

  const authorizedMulti = evaluateAgentLifecycleAction({
    action: 'spawn',
    targetRole: 'implementer',
    concurrentCount: 2,
    humanAuthorized: true,
  });
  assert.equal(authorizedMulti.allowed, true);
});

test('2. Enforces single-instance-per-role cap and persistent reuse via send_message', () => {
  const existing = [{ id: 'sub-impl-01', role: 'implementer', status: 'idle' }];

  const dupSpawn = evaluateAgentLifecycleAction({
    action: 'spawn',
    targetRole: 'implementer',
    existingAgents: existing,
    concurrentCount: 1,
    humanAuthorized: false,
  });
  assert.equal(dupSpawn.allowed, false);
  assert.equal(dupSpawn.code, 'DUPLICATE_ROLE_INSTANCE_BLOCKED');
  assert.equal(dupSpawn.recommendedAction, 'REUSE_EXISTING_AGENT');
  assert.equal(dupSpawn.targetAgentId, 'sub-impl-01');

  const reuseOk = evaluateAgentLifecycleAction({
    action: 'reuse',
    targetRole: 'implementer',
    existingAgents: existing,
    focusedScope: 'Fix edge validation in scripts/check-project-graph.mjs#L40-L60',
  });
  assert.equal(reuseOk.allowed, true);
  assert.equal(reuseOk.code, 'REUSE_EXISTING_AGENT');
  assert.equal(reuseOk.targetAgentId, 'sub-impl-01');
});

test('3. Blocks unauthorized kill/kill_all termination (UNAUTHORIZED_AGENT_TERMINATION_BLOCKED)', () => {
  const killBlocked = evaluateAgentLifecycleAction({
    action: 'kill',
    targetRole: 'implementer',
    humanAuthorized: false,
  });
  assert.equal(killBlocked.allowed, false);
  assert.equal(killBlocked.code, 'UNAUTHORIZED_AGENT_TERMINATION_BLOCKED');

  const killAllBlocked = evaluateAgentLifecycleAction({
    action: 'kill_all',
    humanAuthorized: false,
  });
  assert.equal(killAllBlocked.allowed, false);
  assert.equal(killAllBlocked.code, 'UNAUTHORIZED_AGENT_TERMINATION_BLOCKED');

  const killAuthorized = evaluateAgentLifecycleAction({
    action: 'kill',
    targetRole: 'implementer',
    humanAuthorized: true,
  });
  assert.equal(killAuthorized.allowed, true);
});

test('4. Axiom 30 supersession notice and Axiom 77 parity across all three constitutional mirrors', () => {
  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  assert.match(geminiContent, /\[SUPERSEDED BY AXIOM 77\]/, 'GEMINI.md must explicitly mark supersession on Axiom 30/61');

  const requiredTokens = [
    'ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM',
    'HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE',
    'ROLE_PINNED_PERSISTENT_REUSE_MANDATE',
    'SINGLE_INSTANCE_PER_ROLE_CAP',
    'FOCUSED_REUSE_CHECKPOINT_HYGIENE',
    'HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK',
    'AUTOMATED_L2_AGENT_LIFECYCLE_GUARD_STANDARD',
    'AXIOM_77_PARITY_&_SUPERSESSION_STANDARD',
    'UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED',
    'DUPLICATE_ROLE_INSTANCE_BLOCKED',
    'UNAUTHORIZED_AGENT_TERMINATION_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
