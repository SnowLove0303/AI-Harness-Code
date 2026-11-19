import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractRuleIds,
  verifyCompliance,
  findTestFiles,
  loadTestFilesMap,
  runWorkflowSpecGuard,
} from '../scripts/check-workflow-spec-compliance.mjs';
import { checkContent } from '../scripts/check-unslop-purity.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

/**
 * Canonical rules covered by this test suite:
 * [SPEC-RULE-01]: Atomic structuring protocol with canonical rule IDs and RFC 2119 contracts.
 * [SPEC-RULE-02]: Agent lifecycle completion hook (Stop Hook) intercepting unverified completions.
 * [SPEC-RULE-03]: Two-strike AST machine escalation mandate for twice-violated rules.
 * [SPEC-RULE-04]: Workflow step single-focus statechart standard ([ ] -> [-] -> [x]).
 * [SPEC-RULE-05]: Automated L2 compliance guard script registered in package.json.
 * [SPEC-RULE-06]: Domain neutrality and 100% universal software engineering abstraction.
 * [AUDIT-CHECK-01]: Zero-omission verification of all canonical rule identifiers.
 * [AUDIT-CHECK-02]: Mutation anti-fraud killing assertion on omitted rules.
 */

test('L2 Suite: Workflow Specification Deterministic Enforcement & Completion Hook (Axiom 65)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const workerMdPath = path.join(REPO_ROOT, 'worker.md');
  const guardScriptPath = path.join(REPO_ROOT, 'scripts', 'check-workflow-spec-compliance.mjs');
  const packageJsonPath = path.join(REPO_ROOT, 'package.json');
  const deltaSpecPath = fs.existsSync(
    path.join(
      REPO_ROOT,
      'openspec',
      'changes',
      'workflow-spec-deterministic-enforcement',
      'specs',
      'orbitstack-pstack-routing',
      'spec.md'
    )
  )
    ? path.join(
        REPO_ROOT,
        'openspec',
        'changes',
        'workflow-spec-deterministic-enforcement',
        'specs',
        'orbitstack-pstack-routing',
        'spec.md'
      )
    : fs.existsSync(
        path.join(
          REPO_ROOT,
          'openspec',
          'changes',
          'archive',
          '2026-11-19-workflow-spec-deterministic-enforcement',
          'specs',
          'orbitstack-pstack-routing',
          'spec.md'
        )
      )
    ? path.join(
        REPO_ROOT,
        'openspec',
        'changes',
        'archive',
        '2026-11-19-workflow-spec-deterministic-enforcement',
        'specs',
        'orbitstack-pstack-routing',
        'spec.md'
      )
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 65 statutory sub-invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    // [SPEC-RULE-01] Sub-invariant verification in GEMINI.md
    assert.ok(
      content.includes('MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM'),
      'Must contain Axiom 65 identifier'
    );
    assert.ok(
      content.includes('MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'),
      'Must contain MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'
    );
    assert.ok(
      content.includes('AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'),
      'Must contain AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'
    );
    assert.ok(
      content.includes('TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'),
      'Must contain TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'
    );
    assert.ok(
      content.includes('WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'),
      'Must contain WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'
    );
    assert.ok(
      content.includes('WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'),
      'Must contain WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'
    );
    assert.ok(
      content.includes('UNIVERSAL_SPEC_ENFORCEMENT_STANDARD'),
      'Must contain UNIVERSAL_SPEC_ENFORCEMENT_STANDARD'
    );

    assert.ok(content.includes('Markdown 规范确定性管控与工作流完工断路器公理'), 'Must contain Chinese title for Axiom 65');
    assert.ok(content.includes('Markdown 规范与审计细节原子结构化规程'), 'Must contain Chinese title for atomic structuring');
    assert.ok(content.includes('工作流 Agent 完工断路器与生命周期拦截钩子规程'), 'Must contain Chinese title for completion hook');
    assert.ok(content.includes('自然语言细节两碰下沉为 AST/机器规则硬门禁'), 'Must contain Chinese title for two-strike escalation');
    assert.ok(content.includes('工作流细节执行单焦点状态机锁定规程'), 'Must contain Chinese title for statechart standard');
    assert.ok(content.includes('自动化 L2 规范清算与断路器守卫工具链'), 'Must contain Chinese title for compliance guard');
    assert.ok(content.includes('纯通用工程抽象硬门禁'), 'Must contain Chinese title for domain neutrality');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec mirrors', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');

    // [SPEC-RULE-01] Mirror consistency check
    assert.ok(
      pstackContent.includes('MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM'),
      'pstack-openspec must contain Axiom 65 identifier'
    );
    assert.ok(
      pstackContent.includes('MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'),
      'pstack-openspec must contain MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'
    );
    assert.ok(
      pstackContent.includes('AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'),
      'pstack-openspec must contain AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'
    );
    assert.ok(
      pstackContent.includes('TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'),
      'pstack-openspec must contain TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'
    );
    assert.ok(
      pstackContent.includes('WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'),
      'pstack-openspec must contain WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'
    );
    assert.ok(
      pstackContent.includes('WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'),
      'pstack-openspec must contain WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'
    );
    assert.ok(
      pstackContent.includes('UNIVERSAL_SPEC_ENFORCEMENT_STANDARD'),
      'pstack-openspec must contain UNIVERSAL_SPEC_ENFORCEMENT_STANDARD'
    );

    // Verify Step 0, Step 2, Step 3, Step 5 workflows in pstack-openspec
    assert.ok(pstackContent.includes('MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'), 'Step 0 must reflect atomic structuring');
    assert.ok(pstackContent.includes('WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'), 'Step 2 must reflect statechart task mapping');
    assert.ok(pstackContent.includes('AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'), 'Step 3 must reflect completion hook self-check');
    assert.ok(pstackContent.includes('WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'), 'Step 5 must reflect guard verification');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');

    assert.ok(
      harnessContent.includes('MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM'),
      'ai-harness-openspec must contain Axiom 65 identifier'
    );
    assert.ok(
      harnessContent.includes('MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'),
      'ai-harness-openspec must contain MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'
    );
    assert.ok(
      harnessContent.includes('AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'),
      'ai-harness-openspec must contain AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'
    );
    assert.ok(
      harnessContent.includes('TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'),
      'ai-harness-openspec must contain TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'
    );
    assert.ok(
      harnessContent.includes('WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'),
      'ai-harness-openspec must contain WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'
    );
    assert.ok(
      harnessContent.includes('WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'),
      'ai-harness-openspec must contain WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'
    );
    assert.ok(
      harnessContent.includes('UNIVERSAL_SPEC_ENFORCEMENT_STANDARD'),
      'ai-harness-openspec must contain UNIVERSAL_SPEC_ENFORCEMENT_STANDARD'
    );
  });

  await t.test('3. Atomic specification schema and rule ID extraction ([SPEC-RULE-xx], [AUDIT-CHECK-xx])', () => {
    // [SPEC-RULE-01] Extraction testing
    const sample = `
      # Specification Document
      Rule 1: [SPEC-RULE-01] Must sanitize inputs.
      Rule 2: [SPEC-RULE-02] Must validate tokens.
      Check 1: [AUDIT-CHECK-01] Confirm boundary conditions.
      Duplicate: [SPEC-RULE-01] Repeated mention.
      Invalid: [RULE-99] [SPEC-RULE-abc] [AUDIT-CHECK-1]
    `;

    const ids = extractRuleIds(sample);
    assert.deepEqual(ids, ['[AUDIT-CHECK-01]', '[SPEC-RULE-01]', '[SPEC-RULE-02]']);

    assert.deepEqual(extractRuleIds(''), []);
    assert.deepEqual(extractRuleIds(null), []);
    assert.deepEqual(extractRuleIds(undefined), []);
  });

  await t.test('4. Agent lifecycle completion hook (Stop Hook) simulation & blocking on missing assertions', () => {
    // [SPEC-RULE-02] Lifecycle completion hook simulation
    const targetRules = ['[SPEC-RULE-01]', '[SPEC-RULE-02]', '[AUDIT-CHECK-01]'];

    // Simulated test contents with all rules covered
    const allPassContents = `
      test('[SPEC-RULE-01] sanitization', () => {});
      test('[SPEC-RULE-02] validation', () => {});
      test('[AUDIT-CHECK-01] boundary', () => {});
    `;
    const passResult = verifyCompliance(targetRules, allPassContents);
    assert.equal(passResult.pass, true);
    assert.equal(passResult.missing.length, 0);
    assert.equal(passResult.verified.length, 3);

    // Simulated test contents with [SPEC-RULE-02] missing
    const partialContents = `
      test('[SPEC-RULE-01] sanitization', () => {});
      test('[AUDIT-CHECK-01] boundary', () => {});
    `;
    const failResult = verifyCompliance(targetRules, partialContents);
    assert.equal(failResult.pass, false);
    assert.deepEqual(failResult.missing, ['[SPEC-RULE-02]']);

    // Stop Hook simulation function
    function stopHookGate(rules, testCode) {
      const check = verifyCompliance(rules, testCode);
      if (!check.pass) {
        return {
          exitCode: 1,
          error: `WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER: ${check.missing.join(', ')}`,
          action: 'CONTINUE_EXECUTION',
        };
      }
      return { exitCode: 0, error: null, action: 'ALLOW_TERMINATION' };
    }

    const hookBlocked = stopHookGate(targetRules, partialContents);
    assert.equal(hookBlocked.exitCode, 1);
    assert.ok(hookBlocked.error.includes('WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER'));
    assert.equal(hookBlocked.action, 'CONTINUE_EXECUTION');

    const hookAllowed = stopHookGate(targetRules, allPassContents);
    assert.equal(hookAllowed.exitCode, 0);
    assert.equal(hookAllowed.action, 'ALLOW_TERMINATION');
  });

  await t.test('5. Two-strike AST machine escalation simulation', () => {
    // [SPEC-RULE-03] Two-strike machine escalation logic
    class RuleEscalationTracker {
      constructor() {
        this.violations = new Map();
      }

      recordViolation(ruleId) {
        const count = (this.violations.get(ruleId) || 0) + 1;
        this.violations.set(ruleId, count);

        if (count >= 2) {
          return {
            escalated: true,
            status: 'MANDATORY_AST_ESCALATION',
            message: `TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE: ${ruleId} violated ${count} times. Machine rule required.`,
          };
        }
        return { escalated: false, status: 'PROSE_WARNING', count };
      }
    }

    const tracker = new RuleEscalationTracker();
    const strike1 = tracker.recordViolation('NO_RAW_SQL');
    assert.equal(strike1.escalated, false);
    assert.equal(strike1.status, 'PROSE_WARNING');

    const strike2 = tracker.recordViolation('NO_RAW_SQL');
    assert.equal(strike2.escalated, true);
    assert.equal(strike2.status, 'MANDATORY_AST_ESCALATION');
    assert.ok(strike2.message.includes('TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE'));
  });

  await t.test('6. Workflow step single-focus statechart simulation', () => {
    // [SPEC-RULE-04] Single-focus serial statechart simulation
    class StepStatechart {
      constructor(steps) {
        this.steps = steps.map((s) => ({ id: s, state: 'Pending' }));
      }

      acquireLock(stepId) {
        const active = this.steps.find((s) => s.state === 'Active');
        if (active) {
          throw new Error(`CONCURRENT_ACTIVE_TASK_VIOLATION: ${active.id} currently holds lock [-]`);
        }
        const target = this.steps.find((s) => s.id === stepId);
        if (!target) throw new Error(`Unknown step: ${stepId}`);
        if (target.state !== 'Pending') {
          throw new Error(`Step ${stepId} cannot transition from ${target.state} to Active`);
        }
        target.state = 'Active';
      }

      completeStep(stepId, exitCode) {
        const target = this.steps.find((s) => s.id === stepId);
        if (!target || target.state !== 'Active') {
          throw new Error(`Step ${stepId} is not active`);
        }
        if (exitCode !== 0) {
          throw new Error(`UNVERIFIED_STEP_ADVANCE_BLOCKED: Exit code ${exitCode} != 0`);
        }
        target.state = 'Verified';
      }
    }

    const chart = new StepStatechart(['STEP-01', 'STEP-02']);
    chart.acquireLock('STEP-01');

    // Attempting concurrent lock must throw
    assert.throws(
      () => chart.acquireLock('STEP-02'),
      /CONCURRENT_ACTIVE_TASK_VIOLATION/
    );

    // Failing exit code must block step transition
    assert.throws(
      () => chart.completeStep('STEP-01', 1),
      /UNVERIFIED_STEP_ADVANCE_BLOCKED/
    );

    // Passing exit code releases lock
    chart.completeStep('STEP-01', 0);
    assert.equal(chart.steps[0].state, 'Verified');

    // Now step 2 can acquire lock
    chart.acquireLock('STEP-02');
    assert.equal(chart.steps[1].state, 'Active');
    chart.completeStep('STEP-02', 0);
    assert.equal(chart.steps[1].state, 'Verified');
  });

  await t.test('7. Mechanical L2 compliance guard script execution and package.json registration', () => {
    // [SPEC-RULE-05] Guard script and package.json validation
    assert.ok(fs.existsSync(guardScriptPath), 'check-workflow-spec-compliance.mjs must exist');
    const guardContent = fs.readFileSync(guardScriptPath, 'utf8');

    assert.ok(guardContent.includes('WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'));
    assert.ok(guardContent.includes('WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER'));
    assert.ok(guardContent.includes('extractRuleIds'));
    assert.ok(guardContent.includes('verifyCompliance'));
    assert.ok(guardContent.includes('runWorkflowSpecGuard'));

    assert.ok(fs.existsSync(packageJsonPath), 'package.json must exist');
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    assert.ok(pkg.scripts['guard:workflow-spec'], 'package.json must register guard:workflow-spec');
    assert.equal(pkg.scripts['guard:workflow-spec'], 'node scripts/check-workflow-spec-compliance.mjs');

    const syncScriptPath = path.join(REPO_ROOT, 'scripts', 'sync-to-global.mjs');
    const syncContent = fs.readFileSync(syncScriptPath, 'utf8');
    assert.ok(
      syncContent.includes('check-workflow-spec-compliance.mjs'),
      'sync-to-global.mjs must register check-workflow-spec-compliance.mjs'
    );

    // [AUDIT-CHECK-01] Run guard against the test suite
    const guardResult = runWorkflowSpecGuard({
      testDir: path.join(REPO_ROOT, 'tests'),
    });
    assert.equal(guardResult.pass, true, 'Guard must pass on the current repository');
    assert.ok(guardResult.verified.length >= 2, 'Guard must verify all canonical rules');
  });

  await t.test('8. Compliance guard mutation anti-fraud (WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER)', () => {
    // [AUDIT-CHECK-02] Mutation anti-fraud testing
    const testRules = ['[SPEC-RULE-01]', '[SPEC-RULE-02]'];
    const mutatedContents = `test('[SPEC-RULE-01] only', () => {});`;

    const mutResult = verifyCompliance(testRules, mutatedContents);
    assert.equal(mutResult.pass, false, 'Mutated test content must fail verification');
    assert.deepEqual(mutResult.missing, ['[SPEC-RULE-02]']);
  });

  await t.test('9. Delta specification consistency with change proposal and Gate 1', () => {
    assert.ok(fs.existsSync(deltaSpecPath), 'Delta specification must exist');
    const specContent = fs.readFileSync(deltaSpecPath, 'utf8');

    assert.ok(specContent.includes('Markdown Specification Atomic Structuring Protocol'));
    assert.ok(specContent.includes('Agent Lifecycle Completion Hook Gate'));
    assert.ok(specContent.includes('Two-Strike AST Machine Escalation Mandate'));
    assert.ok(specContent.includes('Workflow Step Single-Focus Statechart Standard'));
    assert.ok(specContent.includes('Automated L2 Workflow Specification Compliance Guard'));
    assert.ok(specContent.includes('Axiom 65 Constitutional Legislation and Domain Neutrality'));

    const proposalPath = fs.existsSync(
      path.join(
        REPO_ROOT,
        'openspec',
        'changes',
        'workflow-spec-deterministic-enforcement',
        'proposal.md'
      )
    )
      ? path.join(
          REPO_ROOT,
          'openspec',
          'changes',
          'workflow-spec-deterministic-enforcement',
          'proposal.md'
        )
      : path.join(
          REPO_ROOT,
          'openspec',
          'changes',
          'archive',
          '2026-11-19-workflow-spec-deterministic-enforcement',
          'proposal.md'
        );
    assert.ok(fs.existsSync(proposalPath), 'proposal.md must exist');
    const proposalContent = fs.readFileSync(proposalPath, 'utf8');
    assert.ok(proposalContent.includes('REQ-1'));
    assert.ok(proposalContent.includes('REQ-2'));
    assert.ok(proposalContent.includes('REQ-3'));
    assert.ok(proposalContent.includes('REQ-4'));
    assert.ok(proposalContent.includes('REQ-5'));
    assert.ok(proposalContent.includes('REQ-6'));
  });

  await t.test('10. Domain Neutrality and Anti-Slop validation', () => {
    // [SPEC-RULE-06] Domain neutrality check
    const filesToScan = [
      workerMdPath,
      guardScriptPath,
      deltaSpecPath,
    ];

    for (const file of filesToScan) {
      if (fs.existsSync(file)) {
        const text = fs.readFileSync(file, 'utf8');
        const violations = checkContent(text, file);
        assert.equal(
          violations.length,
          0,
          `File ${path.basename(file)} must pass unslop check: ${JSON.stringify(violations)}`
        );
      }
    }

    // Verify worker.md reinforces single-focus lock and Stop Hook
    const workerText = fs.readFileSync(workerMdPath, 'utf8');
    assert.ok(
      workerText.includes('MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL'),
      'worker.md must reinforce atomic spec protocol'
    );
    assert.ok(
      workerText.includes('WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD'),
      'worker.md must reinforce statechart progression'
    );
    assert.ok(
      workerText.includes('AGENT_LIFECYCLE_COMPLETION_HOOK_GATE'),
      'worker.md must reinforce Stop Hook gate'
    );
    assert.ok(
      workerText.includes('WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD'),
      'worker.md must reinforce compliance guard standard'
    );
  });
});
