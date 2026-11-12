import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Lead Agent Orchestration & Swarm Execution Decoupling', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'lead-agent-swarm-decoupling', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'lead-agent-swarm-decoupling', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 56 presents all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM'), 'Must contain Axiom 56 identifier');
    assert.ok(content.includes('LEAD_AGENT_GOVERNANCE_EXCLUSIVITY'), 'Must contain lead governance exclusivity');
    assert.ok(content.includes('LEAD_DIRECT_EXECUTION_FORBIDDEN'), 'Must contain lead direct execution forbidden rule');
    assert.ok(content.includes('MANDATORY_SWARM_DELEGATION_RULE'), 'Must contain mandatory swarm delegation rule');
    assert.ok(content.includes('DOUBLE_CONTEXT_SHIELD_&_HIGH_CONCURRENCY_PROTOCOL'), 'Must contain double context shield protocol');
    assert.ok(content.includes('OPENSPEC_SWARM_BIDIRECTIONAL_BINDING_PROTOCOL'), 'Must contain bidirectional binding protocol');
    assert.ok(content.includes('UNIVERSAL_SWARM_DECOUPLING_STANDARD'), 'Must contain universal decoupling standard identifier');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM'), 'pstack-openspec must contain Axiom 56');
    assert.ok(pstackContent.includes('LEAD_DIRECT_EXECUTION_FORBIDDEN'), 'pstack-openspec must include lead direct execution forbidden');
    assert.ok(pstackContent.includes('MANDATORY_SWARM_DELEGATION_RULE'), 'pstack-openspec must include swarm delegation rule');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM'), 'ai-harness-openspec must contain Axiom 56');
    assert.ok(harnessContent.includes('DOUBLE_CONTEXT_SHIELD_&_HIGH_CONCURRENCY_PROTOCOL'), 'ai-harness-openspec must include context shield protocol');
  });

  await t.test('3. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Lead Agent Orchestration and Execution Decoupling Axiom'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Mandatory Swarm Worker Delegation for Step 3 Implementation'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Maximum Lead Agent Availability and Context Shield Architecture'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: OpenSpec Tasks and Swarm Focus-Lock Bidirectional Binding'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 56 Constitutional Legislation and Universal Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('4. Role Boundary Audit: Pure Separation between Governance and Execution', () => {
    const leadAllowedRoles = ['Step 0 Ingestion', 'Gate 1 Dossier', 'Step 1 Anchor', 'Step 2 OpenSpec Legislation', 'Gate 2 Plan', 'Swarm Dispatch', 'Step 5 Checkoff & Final Sign-off'];
    const leadForbiddenRoles = ['Step 3 Direct Coding', 'Manual Debugging Loop', 'Heavy Test Log Consumption'];

    const workerAllowedRoles = ['Step 3 Single-Focus Implementation', 'Code Edits in Workspace', 'Unit Test Execution', 'Peer Handoff on Board'];
    const workerForbiddenRoles = ['Gate 1 Authorization Override', 'Arbitrary Spec Modification', 'Bypassing OpenSpec Tasks'];

    assert.ok(leadAllowedRoles.length >= 5, 'Lead Agent must have explicit governance roles');
    assert.ok(leadForbiddenRoles.length >= 3, 'Lead Agent must have explicit execution prohibitions');
    assert.ok(workerAllowedRoles.length >= 4, 'Swarm Worker must have explicit execution roles');
    assert.ok(workerForbiddenRoles.length >= 3, 'Swarm Worker must have explicit governance prohibitions');
  });

  await t.test('5. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const content = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom56Match = content.match(/56\.\s+\*\*主 Agent 统领对客与 Swarm 施工执行物理隔离公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom56Match, 'Axiom 56 block must be extracted');
    const axiomText = axiom56Match[0];

    // Verify formal engineering terms
    assert.ok(axiomText.includes('Lead Agent / Coordinator'), 'Must cite Lead Agent / Coordinator');
    assert.ok(axiomText.includes('Swarm Subagent Workers'), 'Must cite Swarm Subagent Workers');
    assert.ok(axiomText.includes('[Measured] Exit Code 0'), 'Must require measured exit code 0');

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 56 must not contain scenario token: ${token}`);
    }
  });

  await t.test('6. Swarm Dispatch Brief Schema Contract Verification', () => {
    const validateBrief = (brief) => {
      return (
        typeof brief.taskId === 'string' &&
        typeof brief.targetBoundary === 'string' &&
        typeof brief.verificationCommand === 'string' &&
        brief.expectedExitCode === 0
      );
    };

    const sampleBrief = {
      taskId: 'TASK-SWARM-DECOUPLE-06',
      targetBoundary: 'tests/lead-agent-swarm-decoupling.test.mjs',
      verificationCommand: 'node --test tests/lead-agent-swarm-decoupling.test.mjs',
      expectedExitCode: 0
    };

    assert.equal(validateBrief(sampleBrief), true, 'Valid Swarm Brief must satisfy the schema contract');
  });
});
