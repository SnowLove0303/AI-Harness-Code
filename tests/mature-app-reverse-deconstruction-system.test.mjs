import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Mature Application Reverse Engineering & Deep Deconstruction System (Axiom 62)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const appReverseSkillPath = path.join(REPO_ROOT, 'skills', 'app-reverse-deconstruction', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'mature-app-reverse-deconstruction-system', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'mature-app-reverse-deconstruction-system', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 62 contains all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM'), 'Must contain Axiom 62 identifier');
    assert.ok(content.includes('DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD'), 'Must contain dual-track engine standard');
    assert.ok(content.includes('DOCUMENT_APP_DECONSTRUCTION_BENCHMARK'), 'Must contain document app deconstruction benchmark');
    assert.ok(content.includes('ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT'), 'Must contain action skill reverse deconstruction invariant');
    assert.ok(content.includes('CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE'), 'Must contain clean-room specification and evidence gate');
    assert.ok(content.includes('UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD'), 'Must contain universal reverse deconstruction standard');
    assert.ok(content.includes('双轨解构引擎标准'), 'Must contain "双轨解构引擎标准" phrase');
    assert.ok(content.includes('文档应用五层深度解构基准'), 'Must contain "文档应用五层深度解构基准" phrase');
    assert.ok(content.includes('动作技能层法定化规程'), 'Must contain "动作技能层法定化规程" phrase');
    assert.ok(content.includes('净室规格书与不可变证据链门禁'), 'Must contain "净室规格书与不可变证据链门禁" phrase');

    // Section 3.1 action skill index
    assert.ok(content.includes('skills/app-reverse-deconstruction/SKILL.md'), 'GEMINI.md Section 3.1 must index app-reverse-deconstruction skill');
    assert.ok(content.includes('成熟应用逆向解构工程技能'), 'GEMINI.md Section 3.1 must contain descriptive title');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM'), 'pstack-openspec must contain Axiom 62 identifier');
    assert.ok(pstackContent.includes('DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD'), 'pstack-openspec must contain dual-track engine standard');
    assert.ok(pstackContent.includes('DOCUMENT_APP_DECONSTRUCTION_BENCHMARK'), 'pstack-openspec must contain document app deconstruction benchmark');
    assert.ok(pstackContent.includes('ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT'), 'pstack-openspec must contain action skill invariant');
    assert.ok(pstackContent.includes('CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE'), 'pstack-openspec must contain clean-room specification and evidence gate');
    assert.ok(pstackContent.includes('UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD'), 'pstack-openspec must contain universal standard');
    assert.ok(pstackContent.includes('skills/app-reverse-deconstruction/SKILL.md'), 'pstack-openspec Section 4.1 must index app-reverse-deconstruction skill');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM'), 'ai-harness-openspec must contain Axiom 62 identifier');
    assert.ok(harnessContent.includes('DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD'), 'ai-harness-openspec must contain dual-track engine standard');
    assert.ok(harnessContent.includes('DOCUMENT_APP_DECONSTRUCTION_BENCHMARK'), 'ai-harness-openspec must contain document app deconstruction benchmark');
    assert.ok(harnessContent.includes('ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT'), 'ai-harness-openspec must contain action skill invariant');
    assert.ok(harnessContent.includes('CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE'), 'ai-harness-openspec must contain clean-room specification and evidence gate');
    assert.ok(harnessContent.includes('UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD'), 'ai-harness-openspec must contain universal standard');
  });

  await t.test('3. Action skill authoring in skills/app-reverse-deconstruction/SKILL.md', () => {
    assert.ok(fs.existsSync(appReverseSkillPath), 'app-reverse-deconstruction SKILL.md must exist');
    const skillContent = fs.readFileSync(appReverseSkillPath, 'utf8');

    // Frontmatter check
    assert.match(skillContent, /^---\s*\nname:\s*app-reverse-deconstruction/m, 'Must have frontmatter with skill name');
    assert.ok(skillContent.includes('deconstruct-spec'), 'Must contain trigger deconstruct-spec');
    assert.ok(skillContent.includes('clean-room'), 'Must contain trigger clean-room');

    // Architecture & Tooling Layer
    assert.ok(skillContent.includes('Dual-Track Reverse Deconstruction Architecture'), 'Must describe dual-track architecture');
    assert.ok(skillContent.includes('analyze-javascript-application'), 'Must include REA tool analyze-javascript-application');
    assert.ok(skillContent.includes('recover-javascript-sources'), 'Must include REA tool recover-javascript-sources');
    assert.ok(skillContent.includes('evidence-export'), 'Must include REA tool evidence-export');

    // Five-Tier Benchmark
    assert.ok(skillContent.includes('Tier 1: 块级模式与层级'), 'Must include Tier 1');
    assert.ok(skillContent.includes('Tier 2: 选区与光标状态机'), 'Must include Tier 2');
    assert.ok(skillContent.includes('Tier 3: 事务与不可变步骤引擎'), 'Must include Tier 3');
    assert.ok(skillContent.includes('Tier 4: 交互指令与快捷表面'), 'Must include Tier 4');
    assert.ok(skillContent.includes('Tier 5: 协同与持久化协议'), 'Must include Tier 5');

    // Four-Phase SOP
    assert.ok(skillContent.includes('Phase 1: 动态黑盒行为追踪'), 'Must include SOP Phase 1');
    assert.ok(skillContent.includes('Phase 2: 静态白盒架构建模'), 'Must include SOP Phase 2');
    assert.ok(skillContent.includes('Phase 3: 净室规格书编制'), 'Must include SOP Phase 3');
    assert.ok(skillContent.includes('Phase 4: 不可变证据链核销与门禁对账'), 'Must include SOP Phase 4');

    // Deliverable Templates
    assert.ok(skillContent.includes('DECONSTRUCT_SPEC.md'), 'Must define DECONSTRUCT_SPEC.md template');
    assert.ok(skillContent.includes('evidence.json'), 'Must define evidence.json structure');
  });

  await t.test('4. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Dual-Track Deconstruction Engine Standard'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Document Application Deconstruction Benchmark'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Action Skill Layer Crystallization'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Clean-Room Specification & Immutable Evidence Gate'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 62 Constitutional Legislation and Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('5. Dual-Track Deconstruction Engine Standard Simulation', () => {
    const executeDeconstruction = ({ dynamicTracing, staticModeling, visualOnly }) => {
      if (visualOnly && (!dynamicTracing || !staticModeling)) {
        throw new Error('DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD: Visual-only copying rejected. Must execute both dynamic behavioral tracing and static architectural modeling.');
      }
      if (!dynamicTracing || !staticModeling) {
        throw new Error('DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD: Both dynamic behavioral tracing and static structural modeling are mandatory.');
      }
      return {
        status: 'SUCCESS',
        dynamicArtifacts: ['event-cascade.json', 'dom-mutation-trace.json', 'network-deltas.har'],
        staticArtifacts: ['ast-schema.json', 'transaction-statechart.mermaid', 'persistence-model.json']
      };
    };

    // Visual-only analysis fails
    assert.throws(
      () => executeDeconstruction({ dynamicTracing: false, staticModeling: false, visualOnly: true }),
      /DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD/
    );

    // Missing static modeling fails
    assert.throws(
      () => executeDeconstruction({ dynamicTracing: true, staticModeling: false, visualOnly: false }),
      /DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD/
    );

    // Full dual-track passes
    const result = executeDeconstruction({ dynamicTracing: true, staticModeling: true, visualOnly: false });
    assert.equal(result.status, 'SUCCESS');
    assert.equal(result.dynamicArtifacts.length, 3);
    assert.equal(result.staticArtifacts.length, 3);
  });

  await t.test('6. Document Application Five-Tier Benchmark Extraction Simulation', () => {
    const validateDocumentDeconstruction = (model) => {
      const requiredTiers = ['blockHierarchy', 'selectionStatechart', 'transactionEngine', 'commandSurface', 'collaborationProtocol'];
      for (const tier of requiredTiers) {
        if (!model[tier]) {
          throw new Error(`DOCUMENT_APP_DECONSTRUCTION_BENCHMARK: Missing mandatory document architecture tier: ${tier}`);
        }
      }
      return {
        compliant: true,
        tiersExtracted: requiredTiers.length
      };
    };

    // Incomplete model missing collaboration throws error
    assert.throws(
      () => validateDocumentDeconstruction({
        blockHierarchy: { nodes: ['paragraph', 'heading', 'list'] },
        selectionStatechart: { anchor: 0, focus: 10 },
        transactionEngine: { steps: ['ReplaceStep'] },
        commandSurface: { slashMenu: ['/h1', '/todo'] }
      }),
      /DOCUMENT_APP_DECONSTRUCTION_BENCHMARK/
    );

    // Complete five-tier model passes
    const completeModel = {
      blockHierarchy: { nodes: ['paragraph', 'heading', 'list', 'code', 'table'] },
      selectionStatechart: { anchor: 0, focus: 10, crossBlock: true },
      transactionEngine: { steps: ['ReplaceStep', 'AddNodeStep'], inversePairs: true },
      commandSurface: { slashMenu: ['/h1', '/table'], markdownShortcuts: true },
      collaborationProtocol: { crdt: 'Yjs', wireFormat: 'UpdateBinary' }
    };
    const validation = validateDocumentDeconstruction(completeModel);
    assert.equal(validation.compliant, true);
    assert.equal(validation.tiersExtracted, 5);
  });

  await t.test('7. Clean-Room Specification & Immutable Evidence Gate Simulation', () => {
    const verifyCleanRoomGate = (deliverables) => {
      if (!deliverables.specFile || deliverables.specFile !== 'DECONSTRUCT_SPEC.md') {
        throw new Error('CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE: Missing validated DECONSTRUCT_SPEC.md specification.');
      }
      if (!deliverables.evidence || !deliverables.evidence.dynamicTraceHash || !deliverables.evidence.measuredExitCode === 0) {
        throw new Error('CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE: Missing tamper-evident evidence graph or measured Exit Code 0.');
      }
      if (deliverables.proprietarySourceIncluded) {
        throw new Error('CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE: Clean-room violation: Proprietary source code must not be included in specification.');
      }
      return {
        passed: true,
        gateStatus: 'CLEAN_ROOM_VERIFIED'
      };
    };

    // Missing spec file fails
    assert.throws(
      () => verifyCleanRoomGate({ evidence: { dynamicTraceHash: 'abc', measuredExitCode: 0 } }),
      /CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE/
    );

    // Proprietary source leakage fails
    assert.throws(
      () => verifyCleanRoomGate({
        specFile: 'DECONSTRUCT_SPEC.md',
        evidence: { dynamicTraceHash: 'abc', measuredExitCode: 0 },
        proprietarySourceIncluded: true
      }),
      /CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE/
    );

    // Valid clean-room deliverable passes
    const passedGate = verifyCleanRoomGate({
      specFile: 'DECONSTRUCT_SPEC.md',
      evidence: { dynamicTraceHash: 'sha256:1234567890abcdef', measuredExitCode: 0 },
      proprietarySourceIncluded: false
    });
    assert.equal(passedGate.passed, true);
    assert.equal(passedGate.gateStatus, 'CLEAN_ROOM_VERIFIED');
  });

  await t.test('8. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];

    // GEMINI.md Axiom 62 audit
    const geminiContent = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom62Gemini = geminiContent.match(/62\.\s+\*\*成熟应用逆向工程与深度解构体系公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom62Gemini, 'Axiom 62 block must be extracted from GEMINI.md');
    const geminiText = axiom62Gemini[0];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!geminiText.toLowerCase().includes(token), `GEMINI.md Axiom 62 must not contain scenario token: ${token}`);
    }

    // pstack-openspec SKILL.md Axiom 62 audit
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    const axiom62Pstack = pstackContent.match(/62\.\s+\*\*成熟应用逆向工程与深度解构体系公理[\s\S]*?(?=### 4\.1|\n\n\d+\.)/);
    assert.ok(axiom62Pstack, 'Axiom 62 block must be extracted from pstack-openspec');
    const pstackText = axiom62Pstack[0];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!pstackText.toLowerCase().includes(token), `pstack-openspec Axiom 62 must not contain scenario token: ${token}`);
    }

    // ai-harness-openspec SKILL.md Item 59 (Axiom 62) audit
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    const axiom62Harness = harnessContent.match(/59\.\s+\*\*成熟应用逆向工程与深度解构体系公理[\s\S]*?(?=---\n\n## 📚|\n\n\d+\.)/);
    assert.ok(axiom62Harness, 'Item 59 block must be extracted from ai-harness-openspec');
    const harnessText = axiom62Harness[0];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!harnessText.toLowerCase().includes(token), `ai-harness Item 59 must not contain scenario token: ${token}`);
    }

    // app-reverse-deconstruction SKILL.md audit
    const skillContent = fs.readFileSync(appReverseSkillPath, 'utf8');
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!skillContent.toLowerCase().includes(token), `app-reverse-deconstruction SKILL.md must not contain scenario token: ${token}`);
    }
  });

  await t.test('9. Cross-reference file links and route map compatibility', () => {
    assert.ok(fs.existsSync(appReverseSkillPath), 'Skill file must exist on disk');
    const geminiContent = fs.readFileSync(geminiMdPath, 'utf8');
    assert.ok(geminiContent.includes('file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/skills/app-reverse-deconstruction/SKILL.md'), 'GEMINI.md must link to exact file path');

    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/skills/app-reverse-deconstruction/SKILL.md'), 'pstack-openspec must link to exact file path');
  });
});
