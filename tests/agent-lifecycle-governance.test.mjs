import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import {
  AXIOM_82_REQUIRED_TOKENS,
  evaluateAgentLifecycleAction,
} from '../scripts/check-agent-lifecycle.mjs';

test('evaluateAgentLifecycleAction blocks single or multi spawn without explicit user approval', () => {
  const singleRes = evaluateAgentLifecycleAction({
    action: 'spawn',
    roleTag: 'codebase-researcher',
    roleDetail: 'Read-only codebase discovery',
    concurrentCount: 1,
    humanAuthorized: false,
  });
  assert.equal(singleRes.allowed, false);
  assert.equal(singleRes.code, 'UNAUTHORIZED_SPAWN_WITHOUT_USER_APPROVAL_BLOCKED');

  const swarmRes = evaluateAgentLifecycleAction({
    action: 'swarm_add',
    roleTag: 'impl-worker',
    roleDetail: 'Implements module X',
    humanAuthorized: false,
  });
  assert.equal(swarmRes.allowed, false);
  assert.equal(swarmRes.code, 'UNAUTHORIZED_SPAWN_WITHOUT_USER_APPROVAL_BLOCKED');
});

test('evaluateAgentLifecycleAction enforces priority reuse of existing same-role agents before spawning', () => {
  const res = evaluateAgentLifecycleAction({
    action: 'spawn',
    roleTag: 'codebase-researcher',
    roleDetail: 'Read-only codebase discovery',
    humanAuthorized: true,
    existingAgents: [{ id: 'agent-1', roleTag: 'codebase-researcher', roleDetail: 'Read-only', status: 'idle' }],
  });
  assert.equal(res.allowed, false);
  assert.equal(res.code, 'DUPLICATE_ROLE_INSTANCE_BLOCKED');
  assert.equal(res.recommendedAction, 'REUSE_EXISTING_AGENT');
  assert.equal(res.targetAgentId, 'agent-1');
});

test('evaluateAgentLifecycleAction requires roleTag and roleDetail and blocks role-mismatched dispatch', () => {
  const missingMeta = evaluateAgentLifecycleAction({
    action: 'spawn',
    roleTag: 'verifier',
    roleDetail: '',
    humanAuthorized: true,
  });
  assert.equal(missingMeta.allowed, false);
  assert.equal(missingMeta.code, 'MISSING_AGENT_ROLE_METADATA_BLOCKED');

  const mismatch = evaluateAgentLifecycleAction({
    action: 'dispatch',
    roleTag: 'codebase-researcher',
    taskRoleTag: 'code-author',
    focusedScope: 'Edit auth module',
    existingAgents: [
      { id: 'agent-r1', roleTag: 'codebase-researcher', roleDetail: 'Read-only explorer', status: 'idle' },
    ],
  });
  assert.equal(mismatch.allowed, false);
  assert.equal(mismatch.code, 'ROLE_TASK_MISMATCH_BLOCKED');

  const validDispatch = evaluateAgentLifecycleAction({
    action: 'dispatch',
    roleTag: 'codebase-researcher',
    taskRoleTag: 'codebase-researcher',
    focusedScope: 'Inspect auth token refresh path',
    existingAgents: [
      { id: 'agent-r1', roleTag: 'codebase-researcher', roleDetail: 'Read-only explorer', status: 'idle' },
    ],
  });
  assert.equal(validDispatch.allowed, true);
  assert.equal(validDispatch.code, 'REUSE_EXISTING_AGENT');
});

test('Axiom 82 parity across GEMINI.md, pstack-openspec, ai-harness-openspec, and worker.md', () => {
  for (const rel of ['GEMINI.md', 'skills/pstack-openspec/SKILL.md', 'skills/ai-harness-openspec/SKILL.md']) {
    const text = readFileSync(path.resolve(rel), 'utf8');
    for (const token of AXIOM_82_REQUIRED_TOKENS) {
      assert.ok(text.includes(token), `${rel} must include ${token}`);
    }
  }
  const workerText = readFileSync(path.resolve('worker.md'), 'utf8');
  assert.ok(workerText.includes('STRICT_HUMAN_SPAWN_APPROVAL_PRIORITY_REUSE_&_ROLE_DISPATCH_AXIOM'));
});
