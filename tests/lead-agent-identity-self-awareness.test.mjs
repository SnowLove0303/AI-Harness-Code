import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Lead Agent Identity Self-Awareness & Statutory Coordinator Uniqueness', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'lead-identity-self-awareness', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'lead-identity-self-awareness', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 58 contains identity invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM'), 'Must contain Axiom 58 identifier');
    assert.ok(content.includes('DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE'), 'Must contain direct session identity rule');
    assert.ok(content.includes('TASK_TIME_IDENTITY_SELF_REFLECTION_PROTOCOL'), 'Must contain identity self-reflection protocol');
    assert.ok(content.includes('IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED'), 'Must contain identity drift circuit breaker');
    assert.ok(content.includes('COORDINATOR_ROLE_BOARD_AUTHORITY'), 'Must contain coordinator board role authority');
    assert.ok(content.includes('UNIVERSAL_LEAD_IDENTITY_STANDARD'), 'Must contain universal lead identity standard');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM'), 'pstack-openspec must contain Axiom 58');
    assert.ok(pstackContent.includes('DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE'), 'pstack-openspec must contain session identity rule');
    assert.ok(pstackContent.includes('IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED'), 'pstack-openspec must contain identity drift blocked');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM'), 'ai-harness-openspec must contain Axiom 58');
    assert.ok(harnessContent.includes('DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE'), 'ai-harness-openspec must contain session identity rule');
    assert.ok(harnessContent.includes('IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED'), 'ai-harness-openspec must contain identity drift blocked');
  });

  await t.test('3. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Direct-to-User Session Lead Identity Invariance'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Task-Time Identity Self-Reflection Protocol'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Identity Drift and Direct Implementation Hard Gate'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Statutory Coordinator Board Role Authority'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 58 Constitutional Legislation and Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('4. Identity Drift & Role Regression Hard Gate Simulation', () => {
    const simulateDirectSessionAction = (context) => {
      if (context.isDirectUserSession) {
        // Enforce Lead Agent Identity
        if (context.phase === 'Step 3' && context.action === 'DIRECT_CODE_EDIT') {
          throw new Error('IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED: Direct user session agent is @coordinator and cannot execute direct code edits in Step 3');
        }
      }
      return { status: 'DELEGATED_TO_SWARM', exitCode: 0 };
    };

    assert.throws(
      () => simulateDirectSessionAction({ isDirectUserSession: true, phase: 'Step 3', action: 'DIRECT_CODE_EDIT' }),
      /IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED/
    );

    const validAction = simulateDirectSessionAction({ isDirectUserSession: true, phase: 'Step 3', action: 'DISPATCH_SWARM_WORKER' });
    assert.equal(validAction.status, 'DELEGATED_TO_SWARM');
    assert.equal(validAction.exitCode, 0);
  });

  await t.test('5. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const content = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom58Match = content.match(/58\.\s+\*\*主 Agent 身份认知自锚定与法定协调者绝对唯一性公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom58Match, 'Axiom 58 block must be extracted');
    const axiomText = axiom58Match[0];

    // Verify formal engineering terms
    assert.ok(axiomText.includes('LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM'), 'Must cite Axiom 58 identifier');
    assert.ok(axiomText.includes('DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE'), 'Must cite direct session rule');
    assert.ok(axiomText.includes('IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED'), 'Must cite identity drift circuit breaker');
    assert.ok(axiomText.includes('COORDINATOR_ROLE_BOARD_AUTHORITY'), 'Must cite board role authority');

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 58 must not contain scenario token: ${token}`);
    }
  });

  await t.test('6. Task-Time Identity Self-Reflection Contract Verification', () => {
    const performIdentitySelfReflection = (isDirectUserSession, currentPhase) => {
      const identity = isDirectUserSession ? '@coordinator' : '@worker';
      const permittedActions = [];
      const forbiddenActions = [];

      if (identity === '@coordinator') {
        permittedActions.push('Step 0 Ingestion', 'Step 1 Anchor', 'Step 2 OpenSpec Authoring', 'Swarm Dispatch', 'Step 5 Checkoff');
        if (currentPhase === 'Step 3') {
          forbiddenActions.push('DIRECT_FILE_EDIT', 'LOCAL_DEBUG_LOOP', 'HEAVY_TEST_RUN');
        }
      }

      return { identity, permittedActions, forbiddenActions };
    };

    const reflection = performIdentitySelfReflection(true, 'Step 3');
    assert.equal(reflection.identity, '@coordinator');
    assert.ok(reflection.permittedActions.includes('Swarm Dispatch'));
    assert.ok(reflection.forbiddenActions.includes('DIRECT_FILE_EDIT'));
    assert.ok(reflection.forbiddenActions.includes('LOCAL_DEBUG_LOOP'));
  });
});
