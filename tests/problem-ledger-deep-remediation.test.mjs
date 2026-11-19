import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractIssueIds,
  verifyClearance,
  findTestFiles,
  loadTestFilesMap,
  runClearanceGuard,
  isProblemTask,
  extractReconciliationEntries,
  verifyReconciliation,
} from '../scripts/check-issue-clearance.mjs';
import { checkContent } from '../scripts/check-unslop-purity.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Problem Ledger Ingestion & Zero-Omission Deep Remediation (Axiom 64)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const workerMdPath = path.join(REPO_ROOT, 'worker.md');
  const clearanceScriptPath = path.join(REPO_ROOT, 'scripts', 'check-issue-clearance.mjs');
  const packageJsonPath = path.join(REPO_ROOT, 'package.json');
  const deltaSpecPath = fs.existsSync(
    path.join(
      REPO_ROOT,
      'openspec',
      'changes',
      'problem-task-taxonomy-and-post-reconciliation',
      'specs',
      'orbitstack-pstack-routing',
      'spec.md'
    )
  )
    ? path.join(
        REPO_ROOT,
        'openspec',
        'changes',
        'problem-task-taxonomy-and-post-reconciliation',
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
          '2026-11-18-problem-ledger-deep-remediation',
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
        '2026-11-18-problem-ledger-deep-remediation',
        'specs',
        'orbitstack-pstack-routing',
        'spec.md'
      )
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 64 statutory sub-invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(
      content.includes('PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM'),
      'Must contain Axiom 64 identifier'
    );
    assert.ok(
      content.includes('PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'),
      'Must contain PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'
    );
    assert.ok(
      content.includes('MASTER_PROBLEM_LEDGER_INGESTION_PROTOCOL'),
      'Must contain MASTER_PROBLEM_LEDGER_INGESTION_PROTOCOL'
    );
    assert.ok(
      content.includes('ISSUE_TO_TASK_BIJECTIVE_INVARIANT'),
      'Must contain ISSUE_TO_TASK_BIJECTIVE_INVARIANT'
    );
    assert.ok(
      content.includes('FOUR_TIER_DEEP_REMEDIATION_LADDER'),
      'Must contain FOUR_TIER_DEEP_REMEDIATION_LADDER'
    );
    assert.ok(
      content.includes('SINGLE_ISSUE_FOCUS_LOCK_STANDARD'),
      'Must contain SINGLE_ISSUE_FOCUS_LOCK_STANDARD'
    );
    assert.ok(
      content.includes('POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'),
      'Must contain POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'
    );
    assert.ok(
      content.includes('ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER'),
      'Must contain ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER'
    );
    assert.ok(
      content.includes('PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'),
      'Must contain PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'
    );
    assert.ok(
      content.includes('PROBLEM_RECONCILIATION_OMISSION_BLOCKED'),
      'Must contain PROBLEM_RECONCILIATION_OMISSION_BLOCKED'
    );
    assert.ok(
      content.includes('UNIVERSAL_PROBLEM_REMEDIATION_STANDARD'),
      'Must contain UNIVERSAL_PROBLEM_REMEDIATION_STANDARD'
    );

    assert.ok(content.includes('问题清单全量账本化与零遗漏深度根治公理'), 'Must contain Chinese title for Axiom 64');
    assert.ok(content.includes('问题型任务界定消歧与《问题清单总账本》全量切片规程'), 'Must contain Chinese title for taxonomy & ledger ingestion');
    assert.ok(content.includes('问题与原子任务 1:1 双射法定公理与严禁任务打包门禁'), 'Must contain Chinese title for bijective invariant');
    assert.ok(content.includes('四阶深度根治阶梯规程'), 'Must contain Chinese title for 4-tier ladder');
    assert.ok(content.includes('单问题串行专注锁与子智能体无遗漏派发规程'), 'Must contain Chinese title for single-issue lock');
    assert.ok(content.includes('完工后 1:1 对照审计、事实核查与零遗漏断路器规程'), 'Must contain Chinese title for reconciliation & circuit breaker');
    assert.ok(content.includes('纯通用工程抽象硬门禁'), 'Must contain Chinese title for domain neutrality');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec mirrors', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');

    assert.ok(
      pstackContent.includes('PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM'),
      'pstack-openspec must contain Axiom 64 identifier'
    );
    assert.ok(
      pstackContent.includes('PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'),
      'pstack-openspec must contain PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'
    );
    assert.ok(
      pstackContent.includes('POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'),
      'pstack-openspec must contain POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'
    );
    assert.ok(
      pstackContent.includes('PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'),
      'pstack-openspec must contain PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'
    );
    assert.ok(
      pstackContent.includes('PROBLEM_RECONCILIATION_OMISSION_BLOCKED'),
      'pstack-openspec must contain PROBLEM_RECONCILIATION_OMISSION_BLOCKED'
    );

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');

    assert.ok(
      harnessContent.includes('PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM'),
      'ai-harness-openspec must contain Axiom 64 identifier'
    );
    assert.ok(
      harnessContent.includes('PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'),
      'ai-harness-openspec must contain PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'
    );
    assert.ok(
      harnessContent.includes('POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'),
      'ai-harness-openspec must contain POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'
    );
    assert.ok(
      harnessContent.includes('PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'),
      'ai-harness-openspec must contain PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'
    );
    assert.ok(
      harnessContent.includes('PROBLEM_RECONCILIATION_OMISSION_BLOCKED'),
      'ai-harness-openspec must contain PROBLEM_RECONCILIATION_OMISSION_BLOCKED'
    );
  });

  await t.test('3. Master Problem Ledger extraction, conservation ($N \\equiv K$), and [ISSUE-01] verification', () => {
    const sampleGate1 = `
# Gate 1 Dossier
## Master Problem Ledger
- [ISSUE-01]: Null pointer dereference in parser
  - Anchor: file:///src/parser.js#L42
  - Witness: node tests/parser-null.test.mjs
  - Role: [Root Source]
  - Acceptance: Exit Code 0
- [ISSUE-02]: Race condition in worker handoff
  - Anchor: file:///src/worker.js#L88
  - Witness: node tests/worker-race.test.mjs
  - Role: [Root Source]
  - Acceptance: Exit Code 0
- [ISSUE-03]: Memory leak in event bus
  - Anchor: file:///src/bus.js#L12
  - Witness: node tests/event-bus-leak.test.mjs
  - Role: [Root Source]
  - Acceptance: Exit Code 0
`;
    const issues = extractIssueIds(sampleGate1);
    assert.equal(issues.length, 3, 'Must extract exactly 3 distinct issues');
    assert.deepEqual(issues, ['[ISSUE-01]', '[ISSUE-02]', '[ISSUE-03]'], 'Must preserve canonical IDs');
    assert.ok(issues.includes('[ISSUE-01]'), 'Master Problem Ledger must verify [ISSUE-01]');
  });

  await t.test('4. Issue-to-Task Bijective Invariant and anti-bundling enforcement', () => {
    function validateTasksBijectivity(issueIds, tasksContent) {
      const violations = [];
      for (const id of issueIds) {
        const idRegex = new RegExp(`\\[${id.replace(/[\[\]]/g, '')}\\]`, 'g');
        const matches = tasksContent.match(idRegex);
        if (!matches || matches.length === 0) {
          violations.push({ issue: id, error: 'MISSING_TASK_FOR_ISSUE' });
        }
      }

      const bundledRegex = /\[ISSUE-\d{2}\].*?and.*?\[ISSUE-\d{2}\]/i;
      if (bundledRegex.test(tasksContent)) {
        violations.push({ error: 'BUNDLED_ISSUE_TASK_FORBIDDEN' });
      }

      return violations;
    }

    const validTasks = `
## Tasks
- [ ] Implement [ISSUE-01] red witness and root remediation
- [ ] Implement [ISSUE-02] red witness and root remediation
`;
    assert.equal(validateTasksBijectivity(['[ISSUE-01]', '[ISSUE-02]'], validTasks).length, 0);

    const bundledTasks = `
## Tasks
- [ ] Resolve [ISSUE-01] and [ISSUE-02] concurrently
`;
    const bundledViolations = validateTasksBijectivity(['[ISSUE-01]', '[ISSUE-02]'], bundledTasks);
    assert.ok(
      bundledViolations.some((v) => v.error === 'BUNDLED_ISSUE_TASK_FORBIDDEN'),
      'Must reject bundled issue tasks'
    );
  });

  await t.test('5. Four-Tier Deep Remediation Ladder state transitions & anti-sink-patching', () => {
    function evaluateProposedScope(proposedFiles) {
      const hasRootFix = proposedFiles.some((f) => f.role === '[Root Source]');
      const hasSinkFix = proposedFiles.some((f) => f.role === '[Consumer Sink]');

      if (hasSinkFix && !hasRootFix) {
        return { authorized: false, error: 'SINK_PATCHING_BLOCKED' };
      }
      return { authorized: true, error: null };
    }

    const sinkOnlyProposal = [
      { path: 'src/view/render.js', role: '[Consumer Sink]' },
    ];
    const sinkResult = evaluateProposedScope(sinkOnlyProposal);
    assert.equal(sinkResult.authorized, false);
    assert.equal(sinkResult.error, 'SINK_PATCHING_BLOCKED');

    const deepProposal = [
      { path: 'src/model/state.js', role: '[Root Source]' },
      { path: 'src/view/render.js', role: '[Consumer Sink]' },
    ];
    const deepResult = evaluateProposedScope(deepProposal);
    assert.equal(deepResult.authorized, true);
    assert.equal(deepResult.error, null);
  });

  await t.test('6. Single-Issue Focus Lock and Reconciliation Mandate in worker.md', () => {
    assert.ok(fs.existsSync(workerMdPath), 'worker.md must exist at root');
    const workerContent = fs.readFileSync(workerMdPath, 'utf8');

    assert.ok(
      workerContent.includes('SINGLE_ISSUE_FOCUS_LOCK_STANDARD'),
      'worker.md must cite SINGLE_ISSUE_FOCUS_LOCK_STANDARD'
    );
    assert.ok(
      workerContent.includes('PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'),
      'worker.md must cite PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL'
    );
    assert.ok(
      workerContent.includes('POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'),
      'worker.md must cite POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL'
    );
    assert.ok(
      workerContent.includes('PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'),
      'worker.md must cite PROBLEM_RECONCILIATION_DEFICIT_BLOCKED'
    );
  });

  await t.test('7. Mechanical L2 Clearance Guard script and package.json registration', () => {
    assert.ok(fs.existsSync(clearanceScriptPath), 'scripts/check-issue-clearance.mjs must exist');
    assert.ok(fs.existsSync(packageJsonPath), 'package.json must exist');

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    assert.ok(
      pkg.scripts && pkg.scripts['guard:issue-clearance'],
      'package.json must register "guard:issue-clearance"'
    );
    assert.equal(
      pkg.scripts['guard:issue-clearance'],
      'node scripts/check-issue-clearance.mjs',
      'guard:issue-clearance script must point to check-issue-clearance.mjs'
    );
  });

  await t.test('8. Clearance Guard Mutation Anti-Fraud (PROBLEM_OMISSION_CIRCUIT_BREAKER)', () => {
    const syntheticLedgerIssues = ['[ISSUE-01]', '[ISSUE-02]', '[ISSUE-03]', '[ISSUE-04]'];
    const completeTestContent = `
      test('reproduce and verify [ISSUE-01]', () => assert.ok(true));
      test('reproduce and verify [ISSUE-02]', () => assert.ok(true));
      test('reproduce and verify [ISSUE-03]', () => assert.ok(true));
      test('reproduce and verify [ISSUE-04]', () => assert.ok(true));
    `;

    const passResult = verifyClearance(syntheticLedgerIssues, completeTestContent);
    assert.equal(passResult.pass, true, 'All 4 issues verified');
    assert.equal(passResult.verified.length, 4);
    assert.equal(passResult.missing.length, 0);

    const mutatedTestContent = `
      test('reproduce and verify [ISSUE-01]', () => assert.ok(true));
      test('reproduce and verify [ISSUE-02]', () => assert.ok(true));
      test('reproduce and verify [ISSUE-03]', () => assert.ok(true));
    `;
    const failResult = verifyClearance(syntheticLedgerIssues, mutatedTestContent);
    assert.equal(failResult.pass, false, 'Must fail when [ISSUE-04] is omitted');
    assert.deepEqual(failResult.missing, ['[ISSUE-04]'], 'Must isolate missing issue');
  });

  await t.test('9. Problem Task Boundary Taxonomy: isProblemTask input signature detection', () => {
    const errorTraceInput = 'Error: Cannot read property "name" of undefined at render (view.js:12)';
    const res1 = isProblemTask(errorTraceInput);
    assert.equal(res1.isProblem, true);
    assert.equal(res1.classification, 'Problem-Type Task');

    const chineseReportInput = '系统在导出PDF时报错并且抛出异常，请排查并修复该缺陷';
    const res2 = isProblemTask(chineseReportInput);
    assert.equal(res2.isProblem, true);
    assert.equal(res2.classification, 'Problem-Type Task');

    const auditDiscrepancyInput = 'Security audit finding: Discrepancy detected in password hash validation';
    const res3 = isProblemTask(auditDiscrepancyInput);
    assert.equal(res3.isProblem, true);
    assert.equal(res3.classification, 'Problem-Type Task');

    const pureFeatureInput = 'Add a new dark mode toggle component to the navigation bar';
    const res4 = isProblemTask(pureFeatureInput);
    assert.equal(res4.isProblem, false);
    assert.equal(res4.classification, 'Feature-Type Task');
  });

  await t.test('10. Post-Execution Reconciliation & Fact-Checking: verifyReconciliation', () => {
    const issues = ['[ISSUE-01]', '[ISSUE-02]'];

    const validReport = `
# Delivery Report
| Issue ID | Root Anchor | Proof | Status |
| :--- | :--- | :--- | :---: |
| [ISSUE-01] | file:///src/parser.js#L42 | [Measured] Exit Code 0 | [x] RESOLVED |
| [ISSUE-02] | file:///src/worker.js#L88 | [Measured] Exit Code 0 | [x] RESOLVED |
`;
    const passRecon = verifyReconciliation(issues, validReport);
    assert.equal(passRecon.pass, true, 'Valid 1:1 reconciliation must pass');
    assert.equal(passRecon.verified.length, 2);

    // Omission failure: [ISSUE-02] missing
    const omittedReport = `
# Delivery Report
| [ISSUE-01] | file:///src/parser.js#L42 | [Measured] Exit Code 0 | [x] RESOLVED |
`;
    const omitRecon = verifyReconciliation(issues, omittedReport);
    assert.equal(omitRecon.pass, false, 'Must fail when issue is missing from reconciliation');
    assert.deepEqual(omitRecon.missing, ['[ISSUE-02]']);

    // Deficit failure: lacks empirical [Measured] proof or line anchor
    const unprovedReport = `
# Delivery Report
| [ISSUE-01] | file:///src/parser.js#L42 | [Measured] Exit Code 0 | [x] RESOLVED |
| [ISSUE-02] | modified worker | fixed manually without proof | [x] RESOLVED |
`;
    const unprovedRecon = verifyReconciliation(issues, unprovedReport);
    assert.equal(unprovedRecon.pass, false, 'Must fail when issue lacks proof or code anchor');
    assert.deepEqual(unprovedRecon.unproved, ['[ISSUE-02]']);
  });

  await t.test('11. Domain Neutrality and Anti-Slop validation', () => {
    const filesToCheck = [
      geminiMdPath,
      pstackSkillPath,
      harnessSkillPath,
      workerMdPath,
      clearanceScriptPath,
    ];

    for (const f of filesToCheck) {
      const content = fs.readFileSync(f, 'utf8');
      const violations = checkContent(content, path.basename(f));
      assert.equal(
        violations.length,
        0,
        `File ${path.basename(f)} must have 0 unslop violations. Found: ${JSON.stringify(violations)}`
      );
    }
  });
});
