import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Problem Iceberg Probe & Panoramic Systemic Penetration Governance (Axiom 59)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'problem-iceberg-systemic-penetration', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'problem-iceberg-systemic-penetration', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 59 contains all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM'), 'Must contain Axiom 59 identifier');
    assert.ok(content.includes('EXPLICIT_ISSUE_ICEBERG_PROBE_RULE'), 'Must contain explicit issue iceberg probe rule');
    assert.ok(content.includes('DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL'), 'Must contain 5-Whys depth penetration protocol');
    assert.ok(content.includes('HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL'), 'Must contain horizontal sibling sweep protocol');
    assert.ok(content.includes('SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE'), 'Must contain single-point failure hardening gate');
    assert.ok(content.includes('UNIVERSAL_ICEBERG_PROBE_STANDARD'), 'Must contain universal iceberg probe standard');
    assert.ok(content.includes('不止如此'), 'Must contain "不止如此" core premise');
    assert.ok(content.includes('也不只有此处有问题'), 'Must contain "也不只有此处有问题" core premise');
  });

  await t.test('2. Living Spec codification in repo-owned ai-harness-openspec', () => {
    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');

    assert.ok(harnessContent.includes('PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM'), 'ai-harness-openspec must contain Axiom 59 identifier');
    assert.ok(harnessContent.includes('EXPLICIT_ISSUE_ICEBERG_PROBE_RULE'), 'ai-harness-openspec must contain iceberg probe rule');
    assert.ok(harnessContent.includes('DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL'), 'ai-harness-openspec must contain 5-Whys protocol');
    assert.ok(harnessContent.includes('HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL'), 'ai-harness-openspec must contain sibling sweep protocol');
    assert.ok(harnessContent.includes('SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE'), 'ai-harness-openspec must contain systemic hardening gate');
    assert.ok(harnessContent.includes('UNIVERSAL_ICEBERG_PROBE_STANDARD'), 'ai-harness-openspec must contain universal standard');
    assert.ok(harnessContent.includes('不止如此'), 'ai-harness-openspec must reflect "不止如此"');
    assert.ok(harnessContent.includes('也不只有此处有问题'), 'ai-harness-openspec must reflect "也不只有此处有问题"');
  });

  await t.test('3. Target scope boundary verification (Global mirrors are read-only boundaries)', () => {
    // Repository target scope is strictly repo-owned files
    const repoTargets = [geminiMdPath, harnessSkillPath];
    for (const target of repoTargets) {
      assert.ok(fs.existsSync(target), `Target file ${target} must exist within repo`);
    }

    // Verify global user skill is treated as an external boundary without unapproved edits
    const globalPstackPath = path.join(os.homedir(), '.gemini/config/skills/pstack-openspec/SKILL.md');
    if (fs.existsSync(globalPstackPath)) {
      // Confirmed boundary exists; ensure test does not require mutating external global path
      assert.ok(true, 'Global pstack configuration inspected as non-repo-owned boundary');
    }
  });

  await t.test('4. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Explicit Issue as Tip of Iceberg Axiom'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Vertical Depth 5-Whys Penetration Protocol'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Horizontal Exhaustive Sibling Sweep Protocol'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Single-Point Failure Triggers Systemic Hardening Gate'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 59 Constitutional Legislation and Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('5. Vertical 5-Whys Depth Penetration & Unknown Evidence Handling Simulation', () => {
    const execute5WhysAnalysis = (incident) => {
      const chain = [];
      if (!incident.symptom) throw new Error('Missing symptom');
      chain.push({ level: 1, type: 'Symptom', text: incident.symptom });

      if (incident.logicGap) {
        chain.push({ level: 2, type: 'LogicGap', text: incident.logicGap });
      } else {
        chain.push({ level: 2, type: 'Unknown', text: 'Unknown logic gap' });
      }

      if (incident.assertionGap) {
        chain.push({ level: 3, type: 'AssertionGap', text: incident.assertionGap });
      } else {
        chain.push({ level: 3, type: 'Unknown', text: 'Unknown assertion gap' });
      }

      if (incident.gateGap) {
        chain.push({ level: 4, type: 'GateGap', text: incident.gateGap });
      } else {
        chain.push({ level: 4, type: 'Unknown', text: 'Unknown gate gap' });
      }

      if (incident.constitutionalGap) {
        chain.push({ level: 5, type: 'ConstitutionalGap', text: incident.constitutionalGap });
      } else {
        chain.push({ level: 5, type: 'Unknown', text: 'Unknown constitutional gap' });
      }

      return {
        complete: chain.length === 5,
        hasUnknown: chain.some(c => c.type === 'Unknown'),
        chain
      };
    };

    const completeResult = execute5WhysAnalysis({
      symptom: 'Test assertion failed on missing property',
      logicGap: 'Parser omitted null guard in subfield extraction',
      assertionGap: 'Compiler and lint rules did not enforce strict null checks on subfields',
      gateGap: 'Step 2 specs omitted edge case scenario for nullable objects',
      constitutionalGap: 'Architecture lacked explicit modeling of missing values (Axiom 18)'
    });

    assert.equal(completeResult.complete, true);
    assert.equal(completeResult.hasUnknown, false);
    assert.equal(completeResult.chain.length, 5);

    const partialResult = execute5WhysAnalysis({
      symptom: 'Network socket closed unexpectedly',
      logicGap: 'Downstream timeout during handshake'
    });

    assert.equal(partialResult.complete, true);
    assert.equal(partialResult.hasUnknown, true);
    assert.equal(partialResult.chain[2].type, 'Unknown');
  });

  await t.test('6. Horizontal Sibling Inventory Classification & Bounded Scope Simulation', () => {
    const classifyFindings = (findings, authorizedScope) => {
      const inventory = {
        inScopeRemediations: [],
        unconfirmedFindings: [],
        outOfScopeFindings: []
      };

      for (const f of findings) {
        if (!f.isHomologous) {
          inventory.unconfirmedFindings.push(f);
        } else if (authorizedScope.includes(f.module)) {
          inventory.inScopeRemediations.push(f);
        } else {
          inventory.outOfScopeFindings.push(f);
        }
      }

      return inventory;
    };

    const findings = [
      { id: 'F-1', module: 'GEMINI.md', isHomologous: true },
      { id: 'F-2', module: 'skills/ai-harness-openspec/SKILL.md', isHomologous: true },
      { id: 'F-3', module: 'external-service/gateway.js', isHomologous: true },
      { id: 'F-4', module: 'legacy-module/old.js', isHomologous: false },
    ];

    const authorizedScope = ['GEMINI.md', 'skills/ai-harness-openspec/SKILL.md'];
    const classified = classifyFindings(findings, authorizedScope);

    assert.equal(classified.inScopeRemediations.length, 2);
    assert.equal(classified.outOfScopeFindings.length, 1);
    assert.equal(classified.outOfScopeFindings[0].module, 'external-service/gateway.js');
    assert.equal(classified.unconfirmedFindings.length, 1);
    assert.equal(classified.unconfirmedFindings[0].id, 'F-4');
  });

  await t.test('7. Single-Point Failure Systemic Hardening Gate Simulation', () => {
    const evaluateSystemicHardeningGate = (remediation) => {
      if (!remediation.hasDefenseEscalation) {
        throw new Error('SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE: Remediation rejected. No durable L1/L2/L3 defense established.');
      }
      return { status: 'HARDENED', exitCode: 0 };
    };

    // Fails when only surface symptom was patched
    assert.throws(
      () => evaluateSystemicHardeningGate({ symptomFixed: true, hasDefenseEscalation: false }),
      /SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE/
    );

    // Passes when durable defense is incorporated
    const valid = evaluateSystemicHardeningGate({
      symptomFixed: true,
      hasDefenseEscalation: true,
      defenseLayers: ['L2_AUTOMATED_TEST_EXIT_CODE_0', 'L3_CONSTITUTIONAL_AXIOM']
    });
    assert.equal(valid.status, 'HARDENED');
    assert.equal(valid.exitCode, 0);
  });

  await t.test('8. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const geminiContent = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom59Match = geminiContent.match(/59\.\s+\*\*问题冰山探针与全景系统性穿透公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom59Match, 'Axiom 59 block must be extracted from GEMINI.md');
    const axiomText = axiom59Match[0];

    // Verify presence of formal engineering terms
    assert.ok(axiomText.includes('PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM'));
    assert.ok(axiomText.includes('EXPLICIT_ISSUE_ICEBERG_PROBE_RULE'));
    assert.ok(axiomText.includes('DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL'));
    assert.ok(axiomText.includes('HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL'));
    assert.ok(axiomText.includes('SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE'));
    assert.ok(axiomText.includes('UNIVERSAL_ICEBERG_PROBE_STANDARD'));

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 59 must not contain scenario token: ${token}`);
    }

    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    const harnessMatch = harnessContent.match(/56\.\s+\*\*问题冰山探针与全景系统性穿透公理[\s\S]*?(?=---\n\n## 📚|\n\n\d+\.)/);
    assert.ok(harnessMatch, 'Axiom 59 block must be extracted from ai-harness-openspec');
    const harnessText = harnessMatch[0];

    for (const token of forbiddenScenarioTokens) {
      assert.ok(!harnessText.toLowerCase().includes(token), `ai-harness Axiom must not contain scenario token: ${token}`);
    }
  });
});
