import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Default Autonomous Swarm Dispatch Governance', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'default-autonomous-swarm-dispatch', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'default-autonomous-swarm-dispatch', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 56 contains auto-dispatch invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE'), 'Must contain default auto-dispatch rule');
    assert.ok(content.includes('ZERO_PROMPT_SWARM_AUTO_DISPATCH_RULE'), 'Must contain zero-prompt rule');
    assert.ok(content.includes('ANTI_MONOLITHIC_EXECUTION_BLOCKED'), 'Must contain anti-monolithic degradation gate');
    assert.ok(content.includes('DEFAULT_SWARM_TASK_MODELING_RULE'), 'Must contain default swarm task modeling rule');
    assert.ok(content.includes('TRANSPARENT_SWARM_UX_PROTOCOL'), 'Must contain transparent UX protocol');
    assert.ok(content.includes('UNIVERSAL_SWARM_AUTO_ACTIVATION_STANDARD'), 'Must contain universal auto-activation standard');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE'), 'pstack-openspec must contain auto-dispatch rule');
    assert.ok(pstackContent.includes('ANTI_MONOLITHIC_EXECUTION_BLOCKED'), 'pstack-openspec must contain anti-monolithic blocked');
    assert.ok(pstackContent.includes('DEFAULT_SWARM_TASK_MODELING_RULE'), 'pstack-openspec must contain default task modeling');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE'), 'ai-harness-openspec must contain auto-dispatch rule');
    assert.ok(harnessContent.includes('ANTI_MONOLITHIC_EXECUTION_BLOCKED'), 'ai-harness-openspec must contain anti-monolithic blocked');
  });

  await t.test('3. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Zero-Prompt Swarm Auto-Dispatch Invariance'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Default Swarm Task Modeling in OpenSpec'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Anti-Monolithic Execution Degradation Gate'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Transparent Swarm UX and Seamless Collaboration'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 56 Autonomous Dispatch Amendment and Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('4. Anti-Monolithic Execution Degradation Gate Simulation', () => {
    const executeStep3 = (executionPlan) => {
      if (!executionPlan.swarmDelegated) {
        throw new Error('ANTI_MONOLITHIC_EXECUTION_BLOCKED: Lead Agent cannot execute Step 3 directly without Swarm Worker delegation');
      }
      return { status: 'DISPATCHED_TO_SWARM', exitCode: 0 };
    };

    assert.throws(
      () => executeStep3({ swarmDelegated: false, agentRole: 'lead' }),
      /ANTI_MONOLITHIC_EXECUTION_BLOCKED/
    );

    const validResult = executeStep3({ swarmDelegated: true, agentRole: 'worker' });
    assert.equal(validResult.status, 'DISPATCHED_TO_SWARM');
    assert.equal(validResult.exitCode, 0);
  });

  await t.test('5. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const content = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom56Match = content.match(/56\.\s+\*\*主 Agent 统领对客与 Swarm 施工执行物理隔离公理[\s\S]*?(?=57\.\s+\*\*)/);
    assert.ok(axiom56Match, 'Axiom 56 block must be extracted');
    const axiomText = axiom56Match[0];

    // Verify formal engineering terms
    assert.ok(axiomText.includes('DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE'), 'Must cite auto-dispatch invariant');
    assert.ok(axiomText.includes('ANTI_MONOLITHIC_EXECUTION_BLOCKED'), 'Must cite anti-monolithic blocked invariant');

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 56 must not contain scenario token: ${token}`);
    }
  });

  await t.test('6. Zero-Prompt Autonomous Activation Simulation', () => {
    const resolveExecutionEngine = (userPrompt, currentPhase) => {
      if (currentPhase === 'Step 3: Single-Focus Execution') {
        // Must activate Swarm regardless of whether user mentioned "swarm"
        return {
          engine: 'swarm',
          autonomous: true,
          boardRequired: true
        };
      }
      return { engine: 'lead', autonomous: false, boardRequired: false };
    };

    const promptsWithoutSwarm = ['执行', '继续', '请修复该缺陷并验证', 'approve plan', 'go ahead'];
    for (const prompt of promptsWithoutSwarm) {
      const decision = resolveExecutionEngine(prompt, 'Step 3: Single-Focus Execution');
      assert.equal(decision.engine, 'swarm');
      assert.equal(decision.autonomous, true);
      assert.equal(decision.boardRequired, true);
    }
  });
});
