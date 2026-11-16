import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: User-Centric Behavioral Emulation & Interaction Reproduction Gate Governance (Axiom 60)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'user-centric-behavioral-emulation-gate', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'user-centric-behavioral-emulation-gate', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 60 contains all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM'), 'Must contain Axiom 60 identifier');
    assert.ok(content.includes('USER_OBSERVATIONAL_VANTAGE_RULE'), 'Must contain user observational vantage rule');
    assert.ok(content.includes('BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL'), 'Must contain behavioral emulation reproduction first protocol');
    assert.ok(content.includes('HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD'), 'Must contain headless in-memory zero-intrusion standard');
    assert.ok(content.includes('MULTI_TIERED_COEXISTENT_VERIFICATION_GATE'), 'Must contain multi-tiered coexistent verification gate');
    assert.ok(content.includes('UNIVERSAL_BEHAVIORAL_EMULATION_STANDARD'), 'Must contain universal behavioral emulation standard');
    assert.ok(content.includes('用户可见视角'), 'Must contain "用户可见视角" core premise');
    assert.ok(content.includes('严禁纯代码自圆其说'), 'Must contain "严禁纯代码自圆其说" core premise');
    assert.ok(content.includes('未复现严禁改动业务代码'), 'Must contain "未复现严禁改动业务代码" core premise');
    assert.ok(content.includes('四维防线'), 'Must contain "四维防线" definition');
  });

  await t.test('2. Living Spec codification in repo-owned ai-harness-openspec', () => {
    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');

    assert.ok(harnessContent.includes('USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM'), 'ai-harness-openspec must contain Axiom 60 identifier');
    assert.ok(harnessContent.includes('USER_OBSERVATIONAL_VANTAGE_RULE'), 'ai-harness-openspec must contain user observational vantage rule');
    assert.ok(harnessContent.includes('BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL'), 'ai-harness-openspec must contain reproduction first protocol');
    assert.ok(harnessContent.includes('HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD'), 'ai-harness-openspec must contain headless zero-intrusion standard');
    assert.ok(harnessContent.includes('MULTI_TIERED_COEXISTENT_VERIFICATION_GATE'), 'ai-harness-openspec must contain multi-tiered verification gate');
    assert.ok(harnessContent.includes('UNIVERSAL_BEHAVIORAL_EMULATION_STANDARD'), 'ai-harness-openspec must contain universal standard');
    assert.ok(harnessContent.includes('用户可见视角'), 'ai-harness-openspec must reflect "用户可见视角"');
    assert.ok(harnessContent.includes('绝不允许纯代码自圆其说'), 'ai-harness-openspec must reflect anti-pure-code premise');
  });

  await t.test('3. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: User-Centric Behavioral Paradigm Axiom'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Behavioral Emulation Pre-Repair Reproduction Protocol'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Headless In-Memory Zero-Intrusion Standard'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Parallel Multi-Tiered Verification Gate Invariant'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 60 Constitutional Legislation and Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('4. User Observational Vantage Point vs Implementation Detail Myopia Simulation', () => {
    // Simulate UI component evaluation under implementation-detail vs user-observational perspective
    const evaluateComponent = (component, perspective) => {
      if (perspective === 'IMPLEMENTATION_DETAIL_MYOPIA') {
        // Flawed agent paradigm: only inspects if handler exists in source code
        return {
          verdict: typeof component.onClick === 'function' ? 'WORKING' : 'BROKEN',
          reason: 'Source code contains onClick handler'
        };
      }

      if (perspective === 'USER_OBSERVATIONAL_VANTAGE') {
        // User-centric paradigm: checks visibility, enabled state, pointer events, occlusion
        const isVisible = component.style?.display !== 'none' && component.style?.visibility !== 'hidden';
        const isEnabled = !component.disabled;
        const hasPointerEvents = component.style?.pointerEvents !== 'none';
        const isNotOccluded = !component.isOccludedByModalOrOverlay;

        const interactable = isVisible && isEnabled && hasPointerEvents && isNotOccluded;
        return {
          verdict: interactable ? 'WORKING' : 'BROKEN',
          reason: !isVisible ? 'Element is not visible' :
                  !isEnabled ? 'Element is disabled' :
                  !hasPointerEvents ? 'Element has pointer-events: none' :
                  !isNotOccluded ? 'Element is occluded by overlay' : 'Element is fully interactable'
        };
      }

      throw new Error(`Unknown perspective: ${perspective}`);
    };

    const occludedButton = {
      name: 'SubmitButton',
      onClick: () => { /* form submission */ },
      disabled: false,
      style: { display: 'block', visibility: 'visible', pointerEvents: 'auto' },
      isOccludedByModalOrOverlay: true
    };

    // Implementation myopia mistakenly passes
    const myopiaResult = evaluateComponent(occludedButton, 'IMPLEMENTATION_DETAIL_MYOPIA');
    assert.equal(myopiaResult.verdict, 'WORKING');

    // User observational vantage correctly catches the interactive defect
    const userVantageResult = evaluateComponent(occludedButton, 'USER_OBSERVATIONAL_VANTAGE');
    assert.equal(userVantageResult.verdict, 'BROKEN');
    assert.equal(userVantageResult.reason, 'Element is occluded by overlay');
  });

  await t.test('5. Behavioral Emulation Pre-Repair Reproduction Protocol Simulation', () => {
    // Gate function enforcing reproduction before modification
    const requestSourceCodeEdit = ({ defectId, reproductionTestPassed, reproductionTestExecuted }) => {
      if (!reproductionTestExecuted) {
        throw new Error(`BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL: Rejected edit for defect ${defectId}. No behavioral emulation test executed.`);
      }

      // Pre-repair reproduction test MUST fail on unfixed code (Exit Code != 0)
      if (reproductionTestPassed) {
        throw new Error(`BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL: Rejected edit for defect ${defectId}. Emulation test passed on defective code; failed to reproduce defect.`);
      }

      return {
        authorizedToEdit: true,
        status: 'REPRODUCTION_VERIFIED'
      };
    };

    // Attempting edit without reproduction test is blocked
    assert.throws(
      () => requestSourceCodeEdit({ defectId: 'BUG-101', reproductionTestExecuted: false, reproductionTestPassed: false }),
      /BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL/
    );

    // Attempting edit with a trivial test that passed on buggy code is blocked
    assert.throws(
      () => requestSourceCodeEdit({ defectId: 'BUG-101', reproductionTestExecuted: true, reproductionTestPassed: true }),
      /failed to reproduce defect/
    );

    // Genuine reproduction (test executed and failed on defective code) is authorized
    const auth = requestSourceCodeEdit({ defectId: 'BUG-101', reproductionTestExecuted: true, reproductionTestPassed: false });
    assert.equal(auth.authorizedToEdit, true);
    assert.equal(auth.status, 'REPRODUCTION_VERIFIED');
  });

  await t.test('6. Headless In-Memory Zero-Intrusion Event Cascade & Millisecond Execution Simulation', () => {
    const startTime = performance.now();

    // Virtual in-memory DOM representation
    const virtualDOM = {
      eventsLog: [],
      element: {
        role: 'button',
        ariaLabel: 'Save File',
        hovered: false,
        focused: false,
        clicked: false,
        state: 'idle'
      }
    };

    // Full event cascade execution in memory without visual display/popups
    const simulateUserClickCascade = (dom) => {
      const el = dom.element;
      
      // 1. Pointer move & hover
      el.hovered = true;
      dom.eventsLog.push('hover');

      // 2. Focus
      el.focused = true;
      dom.eventsLog.push('focus');

      // 3. Pointer down
      dom.eventsLog.push('pointerdown');

      // 4. Click & DOM Mutation
      el.clicked = true;
      el.state = 'saved';
      dom.eventsLog.push('click');
      dom.eventsLog.push('mutation');

      return {
        success: el.clicked && el.state === 'saved',
        events: dom.eventsLog
      };
    };

    const cascadeResult = simulateUserClickCascade(virtualDOM);
    const durationMs = performance.now() - startTime;

    assert.equal(cascadeResult.success, true);
    assert.deepEqual(cascadeResult.events, ['hover', 'focus', 'pointerdown', 'click', 'mutation']);
    // Execution must complete in milliseconds (well under 50ms)
    assert.ok(durationMs < 50, `Execution duration ${durationMs}ms must be under 50ms`);
  });

  await t.test('7. Parallel Multi-Tiered Verification Gate Co-existence Simulation', () => {
    const evaluateMultiTieredGate = (results) => {
      const tiers = [
        { name: 'Tier 1 (Compiler & Linter)', pass: results.compilerAndLintZeroWarnings },
        { name: 'Tier 2 (Domain & State Machine Unit Tests)', pass: results.unitTestsExitCodeZero },
        { name: 'Tier 3 (Headless Behavioral Emulation)', pass: results.behavioralEmulationExitCodeZero },
        { name: 'Tier 4 (Human Visual Diff Tactile Review)', pass: results.humanDiffApproved }
      ];

      const failedTier = tiers.find(t => !t.pass);
      if (failedTier) {
        throw new Error(`MULTI_TIERED_COEXISTENT_VERIFICATION_GATE: Verification blocked at ${failedTier.name}. All 4 tiers must pass concurrently.`);
      }

      return {
        verdict: 'APPROVED_FOR_RELEASE',
        exitCode: 0,
        tiersChecked: tiers.length
      };
    };

    // Behavioral emulation passing alone cannot bypass compiler or unit test failure
    assert.throws(
      () => evaluateMultiTieredGate({
        compilerAndLintZeroWarnings: false, // Compiler warning
        unitTestsExitCodeZero: true,
        behavioralEmulationExitCodeZero: true,
        humanDiffApproved: true
      }),
      /Verification blocked at Tier 1/
    );

    // Compiler passing cannot bypass behavioral emulation failure
    assert.throws(
      () => evaluateMultiTieredGate({
        compilerAndLintZeroWarnings: true,
        unitTestsExitCodeZero: true,
        behavioralEmulationExitCodeZero: false, // Emulation failed
        humanDiffApproved: true
      }),
      /Verification blocked at Tier 3/
    );

    // All four tiers passing concurrently succeeds
    const release = evaluateMultiTieredGate({
      compilerAndLintZeroWarnings: true,
      unitTestsExitCodeZero: true,
      behavioralEmulationExitCodeZero: true,
      humanDiffApproved: true
    });
    assert.equal(release.verdict, 'APPROVED_FOR_RELEASE');
    assert.equal(release.exitCode, 0);
    assert.equal(release.tiersChecked, 4);
  });

  await t.test('8. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const geminiContent = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom60Match = geminiContent.match(/60\.\s+\*\*用户交互拟态与行为复现硬门禁公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom60Match, 'Axiom 60 block must be extracted from GEMINI.md');
    const axiomText = axiom60Match[0];

    // Verify presence of formal software engineering terms
    assert.ok(axiomText.includes('USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM'));
    assert.ok(axiomText.includes('USER_OBSERVATIONAL_VANTAGE_RULE'));
    assert.ok(axiomText.includes('BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL'));
    assert.ok(axiomText.includes('HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD'));
    assert.ok(axiomText.includes('MULTI_TIERED_COEXISTENT_VERIFICATION_GATE'));
    assert.ok(axiomText.includes('UNIVERSAL_BEHAVIORAL_EMULATION_STANDARD'));

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 60 must not contain scenario token: ${token}`);
    }

    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    const harnessMatch = harnessContent.match(/57\.\s+\*\*用户交互拟态与行为复现硬门禁公理[\s\S]*?(?=---\n\n## 📚|\n\n\d+\.)/);
    assert.ok(harnessMatch, 'Axiom 60 block must be extracted from ai-harness-openspec');
    const harnessText = harnessMatch[0];

    for (const token of forbiddenScenarioTokens) {
      assert.ok(!harnessText.toLowerCase().includes(token), `ai-harness Axiom 60 must not contain scenario token: ${token}`);
    }
  });
});
