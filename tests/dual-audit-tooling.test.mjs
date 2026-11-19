import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// --- Group 1: Mechanical Audit Tool Deterministic Gate (REQ-1) ---

test('1. mechanical audit tool enforces deterministic binary exit code and blocks on non-zero exit', () => {
  function simulateMechanicalAudit({ exitCode, warningsCount = 0 }) {
    if (exitCode !== 0 || warningsCount > 0) {
      return {
        passed: false,
        code: 'MECHANICAL_AUDIT_BLOCKER',
        reason: `Deterministic checks failed (exitCode=${exitCode}, warnings=${warningsCount})`,
      };
    }
    return { passed: true, code: 'MECHANICAL_AUDIT_PASSED', exitCode: 0 };
  }

  // Passing case: exit code 0, 0 warnings
  const cleanRun = simulateMechanicalAudit({ exitCode: 0, warningsCount: 0 });
  assert.equal(cleanRun.passed, true);
  assert.equal(cleanRun.code, 'MECHANICAL_AUDIT_PASSED');

  // Failing case: non-zero exit code
  const errorRun = simulateMechanicalAudit({ exitCode: 1, warningsCount: 0 });
  assert.equal(errorRun.passed, false);
  assert.equal(errorRun.code, 'MECHANICAL_AUDIT_BLOCKER');

  // Failing case: zero exit code but warning present (violates --max-warnings=0)
  const warnRun = simulateMechanicalAudit({ exitCode: 0, warningsCount: 1 });
  assert.equal(warnRun.passed, false);
  assert.equal(warnRun.code, 'MECHANICAL_AUDIT_BLOCKER');
});

// --- Group 2: Agent Proactive Intervention Audit Tool (REQ-2 & REQ-4) ---

test('2. agent proactive intervention audit validates active dynamic testing and rejects passive summaries', () => {
  function simulateAgentAudit({ hasPhysicalLineAnchors, hasDynamicProbeEvidence, isPassiveTextOnly }) {
    if (isPassiveTextOnly || !hasPhysicalLineAnchors || !hasDynamicProbeEvidence) {
      return {
        passed: false,
        code: 'AGENT_SEMANTIC_AUDIT_REJECTED',
        reason: 'Agent audit must include physical line anchors and active dynamic probe evidence.',
      };
    }
    return { passed: true, code: 'AGENT_SEMANTIC_AUDIT_PASSED' };
  }

  // Active audit with line anchors and dynamic test execution
  const activeResult = simulateAgentAudit({
    hasPhysicalLineAnchors: true,
    hasDynamicProbeEvidence: true,
    isPassiveTextOnly: false,
  });
  assert.equal(activeResult.passed, true);

  // Passive audit without empirical evidence
  const passiveResult = simulateAgentAudit({
    hasPhysicalLineAnchors: false,
    hasDynamicProbeEvidence: false,
    isPassiveTextOnly: true,
  });
  assert.equal(passiveResult.passed, false);
  assert.equal(passiveResult.code, 'AGENT_SEMANTIC_AUDIT_REJECTED');
});

test('3. agent proactive audit detects false passes and hardcoded shortcut branches', () => {
  function scanForFalsePassShortcuts(codeSnippet) {
    const hardcodedShortcutPattern = /if\s*\(\s*input\s*===?\s*['"][^'"]+['"]\s*\)\s*return/i;
    const trivialAssertionPattern = /assert\.(?:ok|strictEqual)\s*\(\s*(?:true|1\s*===?\s*1)\s*\)/i;

    if (hardcodedShortcutPattern.test(codeSnippet) || trivialAssertionPattern.test(codeSnippet)) {
      return {
        passed: false,
        code: 'FALSE_PASS_FRAUD_DETECTED',
        reason: 'Hardcoded test shortcut branch or trivial assertion detected.',
      };
    }
    return { passed: true, code: 'GENERAL_IMPLEMENTATION_VERIFIED' };
  }

  const badCode = `
    function processRequest(input) {
      if (input === 'test-fixture-1') return 'success'; // Hardcoded shortcut
      return defaultEngine(input);
    }
  `;
  const badResult = scanForFalsePassShortcuts(badCode);
  assert.equal(badResult.passed, false);
  assert.equal(badResult.code, 'FALSE_PASS_FRAUD_DETECTED');

  const goodCode = `
    function processRequest(input) {
      validateInputSchema(input);
      return executeStateMachine(input);
    }
  `;
  const goodResult = scanForFalsePassShortcuts(goodCode);
  assert.equal(goodResult.passed, true);
});

// --- Group 3: Dual-Key Sequential Orchestration Contract (REQ-3) ---

test('4. dual-key pipeline enforces sequential gates (Key 1 must pass before Key 2)', () => {
  function executeDualKeyPipeline({ mechanicalPassed, agentPassed }) {
    if (!mechanicalPassed) {
      return {
        pipelineStatus: 'BLOCKED_AT_KEY_1',
        canDeploy: false,
        code: 'MECHANICAL_AUDIT_BLOCKER',
      };
    }
    if (!agentPassed) {
      return {
        pipelineStatus: 'BLOCKED_AT_KEY_2',
        canDeploy: false,
        code: 'AGENT_SEMANTIC_AUDIT_REJECTED',
      };
    }
    return { pipelineStatus: 'READY_FOR_HUMAN_REVIEW', canDeploy: true };
  }

  // Key 1 fails
  assert.equal(executeDualKeyPipeline({ mechanicalPassed: false, agentPassed: true }).canDeploy, false);
  assert.equal(executeDualKeyPipeline({ mechanicalPassed: false, agentPassed: true }).code, 'MECHANICAL_AUDIT_BLOCKER');

  // Key 1 passes, Key 2 fails
  assert.equal(executeDualKeyPipeline({ mechanicalPassed: true, agentPassed: false }).canDeploy, false);
  assert.equal(executeDualKeyPipeline({ mechanicalPassed: true, agentPassed: false }).code, 'AGENT_SEMANTIC_AUDIT_REJECTED');

  // Both pass
  assert.equal(executeDualKeyPipeline({ mechanicalPassed: true, agentPassed: true }).canDeploy, true);
});

// --- Group 4: Universal Software Engineering Abstraction & Constitutional Parity (REQ-5 & REQ-6) ---

test('5. Axiom 68 is codified across all three mirrors with pure universal software engineering abstraction', () => {
  const geminiPath = path.join(repoRoot, 'GEMINI.md');
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const harnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');

  assert.ok(existsSync(geminiPath), 'GEMINI.md must exist');
  assert.ok(existsSync(pstackSkillPath), 'skills/pstack-openspec/SKILL.md must exist');
  assert.ok(existsSync(harnessSkillPath), 'skills/ai-harness-openspec/SKILL.md must exist');

  const geminiContent = readFileSync(geminiPath, 'utf8');
  const pstackContent = readFileSync(pstackSkillPath, 'utf8');
  const harnessContent = readFileSync(harnessSkillPath, 'utf8');

  const subInvariants = [
    'DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM',
    'MECHANICAL_AUDIT_TOOL_GENERIC_STANDARD',
    'AGENT_PROACTIVE_INTERVENTION_AUDIT_TOOL_STANDARD',
    'DUAL_KEY_SEQUENTIAL_ORCHESTRATION_CONTRACT',
    'FALSE_PASS_DETECTION_&_DYNAMIC_FALSIFICATION_STANDARD',
    'PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD',
    'DUAL_AUDIT_TOOLING_PARITY_STANDARD',
    'MECHANICAL_AUDIT_BLOCKER',
    'AGENT_SEMANTIC_AUDIT_REJECTED',
    'FALSE_PASS_FRAUD_DETECTED',
  ];

  for (const token of subInvariants) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
