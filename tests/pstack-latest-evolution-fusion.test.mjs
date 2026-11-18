import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkContent,
  checkFile,
  BANNED_BUZZWORDS,
  BANNED_PARTICIPLES,
  stripCodeSpans,
} from '../scripts/check-unslop-purity.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Pstack Latest Evolution Deep Fusion & Subagent Autonomous Rigor (Axiom 63)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const workerMdPath = path.join(REPO_ROOT, 'worker.md');
  const unslopScriptPath = path.join(REPO_ROOT, 'scripts', 'check-unslop-purity.mjs');
  const packageJsonPath = path.join(REPO_ROOT, 'package.json');
  const deltaSpecPath = path.join(
    REPO_ROOT,
    'openspec',
    'changes',
    'pstack-latest-evolution-fusion',
    'specs',
    'orbitstack-pstack-routing',
    'spec.md'
  );

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 63 contains all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(
      content.includes('PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM'),
      'Must contain Axiom 63 identifier'
    );
    assert.ok(
      content.includes('STANDALONE_WORKER_CONSTITUTION_STANDARD'),
      'Must contain STANDALONE_WORKER_CONSTITUTION_STANDARD'
    );
    assert.ok(
      content.includes('MECHANICAL_L2_UNSLOP_ASSERTION_GATE'),
      'Must contain MECHANICAL_L2_UNSLOP_ASSERTION_GATE'
    );
    assert.ok(
      content.includes('FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL'),
      'Must contain FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL'
    );
    assert.ok(
      content.includes('ALL_SITES_DEFECT_REMEDIATION_MANDATE'),
      'Must contain ALL_SITES_DEFECT_REMEDIATION_MANDATE'
    );
    assert.ok(
      content.includes('UNIVERSAL_PSTACK_FUSION_STANDARD'),
      'Must contain UNIVERSAL_PSTACK_FUSION_STANDARD'
    );

    assert.ok(content.includes('根目录独立 Worker 施工法典标准'), 'Must contain Chinese title for Worker constitution');
    assert.ok(content.includes('机械化 L2 反口水词静态守卫门禁'), 'Must contain Chinese title for unslop gate');
    assert.ok(content.includes('形式化状态机验证与最短报错路径规程'), 'Must contain Chinese title for statechart protocol');
    assert.ok(content.includes('全景同源缺陷排查与清算规程'), 'Must contain Chinese title for all-sites mandate');
    assert.ok(content.includes('纯通用工程抽象硬门禁'), 'Must contain Chinese title for domain neutrality');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(
      pstackContent.includes('PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM'),
      'pstack-openspec must contain Axiom 63 identifier'
    );
    assert.ok(
      pstackContent.includes('STANDALONE_WORKER_CONSTITUTION_STANDARD'),
      'pstack-openspec must contain worker constitution invariant'
    );
    assert.ok(
      pstackContent.includes('MECHANICAL_L2_UNSLOP_ASSERTION_GATE'),
      'pstack-openspec must contain mechanical unslop gate invariant'
    );
    assert.ok(
      pstackContent.includes('FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL'),
      'pstack-openspec must contain statechart protocol invariant'
    );
    assert.ok(
      pstackContent.includes('ALL_SITES_DEFECT_REMEDIATION_MANDATE'),
      'pstack-openspec must contain all-sites mandate invariant'
    );
    assert.ok(
      pstackContent.includes('UNIVERSAL_PSTACK_FUSION_STANDARD'),
      'pstack-openspec must contain universal fusion standard'
    );

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(
      harnessContent.includes('PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM'),
      'ai-harness-openspec must contain Axiom 63 identifier'
    );
    assert.ok(
      harnessContent.includes('STANDALONE_WORKER_CONSTITUTION_STANDARD'),
      'ai-harness-openspec must contain worker constitution invariant'
    );
    assert.ok(
      harnessContent.includes('MECHANICAL_L2_UNSLOP_ASSERTION_GATE'),
      'ai-harness-openspec must contain mechanical unslop gate invariant'
    );
    assert.ok(
      harnessContent.includes('FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL'),
      'ai-harness-openspec must contain statechart protocol invariant'
    );
    assert.ok(
      harnessContent.includes('ALL_SITES_DEFECT_REMEDIATION_MANDATE'),
      'ai-harness-openspec must contain all-sites mandate invariant'
    );
    assert.ok(
      harnessContent.includes('UNIVERSAL_PSTACK_FUSION_STANDARD'),
      'ai-harness-openspec must contain universal fusion standard'
    );
  });

  await t.test('3. Standalone Worker Constitution (worker.md)', () => {
    assert.ok(fs.existsSync(workerMdPath), 'worker.md must exist at repository root');
    const workerContent = fs.readFileSync(workerMdPath, 'utf8');

    assert.ok(
      workerContent.includes('STANDALONE_WORKER_CONSTITUTION_STANDARD'),
      'worker.md must cite STANDALONE_WORKER_CONSTITUTION_STANDARD'
    );
    assert.ok(
      workerContent.includes('Line Cook'),
      'worker.md must define Focused Line Cook role'
    );
    assert.ok(
      workerContent.includes('Reversible Decision Authority'),
      'worker.md must specify reversible decision authority'
    );
    assert.ok(
      workerContent.includes('Measured Exit Code 0'),
      'worker.md must specify Exit Code 0 baseline'
    );
    assert.ok(
      workerContent.includes('Zero Slop & PR-Ready'),
      'worker.md must specify zero slop and PR-ready deliverable standard'
    );
  });

  await t.test('4. Mechanical L2 unslop assertion gate script and package.json registration', () => {
    assert.ok(fs.existsSync(unslopScriptPath), 'scripts/check-unslop-purity.mjs must exist');
    assert.ok(fs.existsSync(packageJsonPath), 'package.json must exist');
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(
      pkg.scripts && pkg.scripts['guard:unslop'],
      'package.json must register "guard:unslop" script'
    );
    assert.equal(
      pkg.scripts['guard:unslop'],
      'node scripts/check-unslop-purity.mjs',
      'guard:unslop must execute check-unslop-purity.mjs'
    );

    // Verify key buzzwords
    for (const word of ['delve', 'crucial', 'landscape', 'pivotal', 'testament', 'underscore', 'vibrant']) {
      assert.ok(BANNED_BUZZWORDS.includes(word), `BANNED_BUZZWORDS must include ${word}`);
    }

    // Verify participles
    for (const part of ['ensuring', 'highlighting', 'reflecting', 'showcasing', 'fostering']) {
      assert.ok(BANNED_PARTICIPLES.includes(part), `BANNED_PARTICIPLES must include ${part}`);
    }
  });

  await t.test('5. Unslop check clean text validation and code span stripping', () => {
    const cleanText = `# Technical Overview
The system parses tokens directly from the input stream.
It executes state transitions deterministically and writes output to disk.
`;
    const violations = checkContent(cleanText, 'clean-sample.md');
    assert.equal(violations.length, 0, 'Clean technical text must have zero violations');

    // Code span with buzzwords inside backticks must not trigger violations
    const codeSpanText = `We define a rule banning \`delve\` and \`crucial\` terms.`;
    const stripped = stripCodeSpans(codeSpanText);
    assert.ok(!stripped.includes('delve'), 'Code span should be stripped');
    const violationsCode = checkContent(codeSpanText, 'code-sample.md');
    assert.equal(violationsCode.length, 0, 'Terms in inline code backticks must not trigger false positives');
  });

  await t.test('6. Unslop check violation detection (Buzzwords and Trailing Participles)', () => {
    const buzzwordText = `We delve into the crucial architectural landscape.`;
    const buzzViolations = checkContent(buzzwordText, 'buzz-sample.md');
    assert.ok(buzzViolations.length >= 2, 'Must detect buzzword violations');
    assert.ok(buzzViolations.some((v) => v.rule.includes('Buzzword')), 'Must identify AI Buzzword rule');

    const participleText = `The module compiles successfully, ensuring seamless execution.`;
    const partViolations = checkContent(participleText, 'participle-sample.md');
    assert.ok(partViolations.length >= 1, 'Must detect ungrounded trailing participle');
    assert.ok(partViolations.some((v) => v.rule.includes('Participle')), 'Must identify Ungrounded Participle rule');
  });

  await t.test('7. Mutation anti-fraud sanity verification', () => {
    // Inject invalid unslop pattern into a mock file check to guarantee gate cannot be trivially passed
    const mutatedText = `This component stands as a pivotal testament to software excellence, highlighting core benefits.`;
    const detected = checkContent(mutatedText, 'mutation-test.md');
    assert.ok(detected.length >= 2, 'Mutation sanity check: must detect injected slop patterns');
  });

  await t.test('8. Formal statechart shortest path protocol simulation', () => {
    // Model a 4-state workflow: Init -> Pending -> Running -> Complete (and an unreachable/violation state: Error)
    const transitions = [
      { from: 'Init', to: 'Pending', cost: 1 },
      { from: 'Pending', to: 'Running', cost: 1 },
      { from: 'Running', to: 'Complete', cost: 1 },
      { from: 'Running', to: 'ViolationState', cost: 1 }, // Invariant breach
    ];

    // BFS shortest path finder to calculate shortest path to violation
    function findShortestViolationPath(startState, targetViolation) {
      const queue = [[startState]];
      const visited = new Set([startState]);

      while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];

        if (current === targetViolation) {
          return path;
        }

        const nextSteps = transitions.filter((t) => t.from === current);
        for (const step of nextSteps) {
          if (!visited.has(step.to)) {
            visited.add(step.to);
            queue.push([...path, step.to]);
          }
        }
      }
      return null;
    }

    const shortestPath = findShortestViolationPath('Init', 'ViolationState');
    assert.deepEqual(
      shortestPath,
      ['Init', 'Pending', 'Running', 'ViolationState'],
      'Statechart protocol must compute shortest path to invariant violation'
    );
  });

  await t.test('9. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(deltaSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(deltaSpecPath, 'utf8');

    assert.ok(
      specContent.includes('Requirement: Standalone Worker Constitution Standard'),
      'Must contain Standalone Worker Constitution Standard'
    );
    assert.ok(
      specContent.includes('Requirement: Mechanical L2 Unslop Assertion Gate'),
      'Must contain Mechanical L2 Unslop Assertion Gate'
    );
    assert.ok(
      specContent.includes('Requirement: Formal Statechart Shortest Path Protocol'),
      'Must contain Formal Statechart Shortest Path Protocol'
    );
    assert.ok(
      specContent.includes('Requirement: All-Sites Defect Remediation Mandate'),
      'Must contain All-Sites Defect Remediation Mandate'
    );
    assert.ok(
      specContent.includes('Requirement: Axiom 63 Constitutional Legislation and Domain Neutrality'),
      'Must contain Axiom 63 Legislation and Neutrality'
    );
  });

  await t.test('10. Domain neutrality and universal software engineering abstraction', () => {
    const filesToAudit = [workerMdPath, unslopScriptPath];
    const scenarioBannedTerms = [
      /\bMSDS\b/,
      /冠志/,
      /国材/,
      /\bREACH\b/,
      /\bRoHS\b/,
      /\bTDS\b/,
      /\bDSH_HOME\b/,
      /\.dsh\b/,
    ];

    for (const filePath of filesToAudit) {
      const text = fs.readFileSync(filePath, 'utf8');
      for (const pattern of scenarioBannedTerms) {
        assert.ok(
          !pattern.test(text),
          `File ${path.basename(filePath)} must not contain domain-specific token matching ${pattern}`
        );
      }
    }
  });
});
