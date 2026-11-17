import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Autonomous Swarm & Subagent Proactive Dispatch Governance (Axiom 61)', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'autonomous-swarm-subagent-dispatch-governance', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'autonomous-swarm-subagent-dispatch-governance', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 61 contains all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM'), 'Must contain Axiom 61 identifier');
    assert.ok(content.includes('PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT'), 'Must contain proactive autonomous delegation invariant');
    assert.ok(content.includes('DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL'), 'Must contain dual-engine deterministic routing protocol');
    assert.ok(content.includes('ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD'), 'Must contain zero-friction default dispatch standard');
    assert.ok(content.includes('MANDATORY_DELEGATION_TICKETING_INVARIANT'), 'Must contain mandatory delegation ticketing invariant');
    assert.ok(content.includes('ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE'), 'Must contain anti-monolithic pre-execution hook gate');
    assert.ok(content.includes('UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD'), 'Must contain universal autonomous dispatch standard');
    assert.ok(content.includes('主动自动化委派'), 'Must contain "主动自动化委派" phrase');
    assert.ok(content.includes('双引擎确定性路由'), 'Must contain "双引擎确定性路由" phrase');
    assert.ok(content.includes('零摩擦默认参数'), 'Must contain "零摩擦默认参数" phrase');
    assert.ok(content.includes('施工图纸任务委派工单锁定'), 'Must contain "施工图纸任务委派工单锁定" phrase');
    assert.ok(content.includes('反单体越界预执行'), 'Must contain "反单体越界预执行" phrase');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM'), 'pstack-openspec must contain Axiom 61 identifier');
    assert.ok(pstackContent.includes('PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT'), 'pstack-openspec must contain proactive autonomous delegation invariant');
    assert.ok(pstackContent.includes('DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL'), 'pstack-openspec must contain dual-engine routing protocol');
    assert.ok(pstackContent.includes('ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD'), 'pstack-openspec must contain zero-friction default dispatch standard');
    assert.ok(pstackContent.includes('MANDATORY_DELEGATION_TICKETING_INVARIANT'), 'pstack-openspec must contain mandatory delegation ticketing invariant');
    assert.ok(pstackContent.includes('ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE'), 'pstack-openspec must contain anti-monolithic pre-execution hook gate');
    assert.ok(pstackContent.includes('UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD'), 'pstack-openspec must contain universal autonomous dispatch standard');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM'), 'ai-harness-openspec must contain Axiom 61 identifier');
    assert.ok(harnessContent.includes('PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT'), 'ai-harness-openspec must contain proactive autonomous delegation invariant');
    assert.ok(harnessContent.includes('DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL'), 'ai-harness-openspec must contain dual-engine routing protocol');
    assert.ok(harnessContent.includes('ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD'), 'ai-harness-openspec must contain zero-friction default dispatch standard');
    assert.ok(harnessContent.includes('MANDATORY_DELEGATION_TICKETING_INVARIANT'), 'ai-harness-openspec must contain mandatory delegation ticketing invariant');
    assert.ok(harnessContent.includes('ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE'), 'ai-harness-openspec must contain anti-monolithic pre-execution hook gate');
    assert.ok(harnessContent.includes('UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD'), 'ai-harness-openspec must contain universal autonomous dispatch standard');
  });

  await t.test('3. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Proactive Autonomous Delegation Invariant'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Dual-Engine Deterministic Dispatch Routing Protocol'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Zero-Friction Default Dispatch Standard'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Mandatory Delegation Ticketing Invariant'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Anti-Monolithic Pre-Execution Hook Gate'), 'Must contain Req 5');
    assert.ok(specContent.includes('Requirement: Axiom 61 Constitutional Legislation and Domain Neutrality'), 'Must contain Req 6');
  });

  await t.test('4. Proactive Autonomous Delegation & Lead Monolithic Circuit Breaker Simulation', () => {
    const handleStep3Execution = ({ role, action, workerDispatched }) => {
      if (role === 'LEAD_COORDINATOR') {
        if (!workerDispatched && (action === 'WRITE_CODE' || action === 'EDIT_CODE' || action === 'RUN_TESTS')) {
          throw new Error('PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT: Lead Agent cannot execute monolithic implementation in Step 3. Workers must be dispatched autonomously.');
        }
        return { authorized: true, mode: 'COORDINATION_AND_REVIEW' };
      }
      if (role === 'SWARM_WORKER') {
        return { authorized: true, mode: 'DELEGATED_EXECUTION' };
      }
      throw new Error(`Unknown role: ${role}`);
    };

    // Monolithic execution by Lead Agent throws error
    assert.throws(
      () => handleStep3Execution({ role: 'LEAD_COORDINATOR', action: 'EDIT_CODE', workerDispatched: false }),
      /PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT/
    );

    // Lead Agent coordinating with dispatched worker passes
    const leadResult = handleStep3Execution({ role: 'LEAD_COORDINATOR', action: 'EDIT_CODE', workerDispatched: true });
    assert.equal(leadResult.authorized, true);
    assert.equal(leadResult.mode, 'COORDINATION_AND_REVIEW');

    // Worker executing implementation passes
    const workerResult = handleStep3Execution({ role: 'SWARM_WORKER', action: 'EDIT_CODE', workerDispatched: true });
    assert.equal(workerResult.authorized, true);
    assert.equal(workerResult.mode, 'DELEGATED_EXECUTION');
  });

  await t.test('5. Dual-Engine Deterministic Dispatch Routing Protocol Simulation', () => {
    const routeTaskToEngine = (task) => {
      const isUI = /browser|ui|dom|visual|click|render/i.test(task.description);
      const isCode = /code|refactor|test|audit|impl|backend|logic|api/i.test(task.description);

      if (isUI && !isCode) {
        return {
          engine: 'invoke_subagent',
          target: 'browser',
          reason: 'UI / browser interaction requires visual subagent'
        };
      }

      if (isCode || task.category === 'CODEBASE_MODIFICATION') {
        return {
          engine: 'swarm',
          target: task.assignedWorker || 'worker-impl',
          workspace: 'inherit',
          reason: 'Codebase modification routes to engineering swarm'
        };
      }

      throw new Error(`DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL: Ambiguous task routing for ${task.description}`);
    };

    const uiTask = { description: 'Reproduce modal dialog z-index overlay defect in browser', category: 'VISUAL_DEFECT' };
    const uiRoute = routeTaskToEngine(uiTask);
    assert.equal(uiRoute.engine, 'invoke_subagent');
    assert.equal(uiRoute.target, 'browser');

    const codeTask = { description: 'Implement token verification middleware in src/auth.ts', category: 'CODEBASE_MODIFICATION', assignedWorker: 'worker-auth' };
    const codeRoute = routeTaskToEngine(codeTask);
    assert.equal(codeRoute.engine, 'swarm');
    assert.equal(codeRoute.target, 'worker-auth');
    assert.equal(codeRoute.workspace, 'inherit');
  });

  await t.test('6. Zero-Friction Default Dispatch Standard Simulation', () => {
    const validateDispatchParams = (params) => {
      // workspace must default to 'inherit' unless explicit isolated clone requested
      if (!params.workspace) {
        params.workspace = 'inherit';
      }
      if (params.workspace !== 'inherit' && params.workspace !== 'branch' && params.workspace !== 'share') {
        throw new Error('ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD: Invalid workspace mode');
      }

      // Brief validation: Must contain 4 essential elements
      const brief = params.brief || '';
      const hasFiles = /files|owned/i.test(brief);
      const hasContext = /context|reference|specs/i.test(brief);
      const hasExitCriteria = /exit|criteria|measured|done/i.test(brief);
      const hasMention = brief.includes('@coordinator');

      if (!hasFiles || !hasContext || !hasExitCriteria || !hasMention) {
        throw new Error('ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD: Brief must contain owned files, context, exit criteria, and @coordinator mention');
      }

      return {
        valid: true,
        workspace: params.workspace,
        modelInherited: params.model === undefined
      };
    };

    // Valid zero-friction dispatch
    const validParams = {
      name: 'worker-impl',
      brief: 'Owned files: src/auth.ts. Reference context: specs/auth/spec.md. Exit criteria: [Measured] Exit Code 0. Report to @coordinator.'
    };
    const validated = validateDispatchParams(validParams);
    assert.equal(validated.valid, true);
    assert.equal(validated.workspace, 'inherit');
    assert.equal(validated.modelInherited, true);

    // Incomplete brief missing @coordinator tag throws error
    assert.throws(
      () => validateDispatchParams({
        name: 'worker-impl',
        brief: 'Owned files: src/auth.ts. Reference context: specs/auth. Exit criteria: Exit Code 0.'
      }),
      /ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD/
    );
  });

  await t.test('7. Mandatory Delegation Ticketing Invariant on tasks.md Simulation', () => {
    const validateTaskItem = (line) => {
      const match = line.match(/^\s*-\s*\[([ x\-])\]\s*(.*)$/);
      if (!match) return { isTask: false };

      const taskDesc = match[2].trim();
      const isImplementationTask = /implement|codify|synchronize|write|edit|refactor|test suite|assertion|reproduce|verify/i.test(taskDesc);

      if (!isImplementationTask) {
        return { isTask: true, valid: true, description: taskDesc };
      }

      // Implementation tasks MUST have explicit delegation target
      const delegationMatch = taskDesc.match(/^\[(Swarm:\s*[\w\-]+|Subagent:\s*[\w\-]+)\]/i);
      if (!delegationMatch) {
        throw new Error(`MANDATORY_DELEGATION_TICKETING_INVARIANT: Implementation task "${taskDesc}" lacks explicit [Swarm: <worker>] or [Subagent: <type>] delegation ticket annotation.`);
      }

      return {
        isTask: true,
        valid: true,
        target: delegationMatch[1],
        description: taskDesc
      };
    };

    // Valid delegated tasks pass
    const validSwarm = validateTaskItem('- [ ] [Swarm: worker-axiom61] Codify constitutional Axiom 61 in GEMINI.md.');
    assert.equal(validSwarm.valid, true);
    assert.equal(validSwarm.target, 'Swarm: worker-axiom61');

    const validSubagent = validateTaskItem('- [ ] [Subagent: browser] Reproduce UI button click issue.');
    assert.equal(validSubagent.valid, true);
    assert.equal(validSubagent.target, 'Subagent: browser');

    // Untargeted monolithic implementation task fails
    assert.throws(
      () => validateTaskItem('- [ ] Implement token verification handler in src/auth.ts'),
      /MANDATORY_DELEGATION_TICKETING_INVARIANT/
    );
  });

  await t.test('8. Anti-Monolithic Pre-Execution Hook Gate Simulation', () => {
    const preExecutionHook = ({ toolName, callerRole, isProductionAsset }) => {
      const isModificationTool = (toolName === 'edit_file' || toolName === 'write_file');

      if (isModificationTool && isProductionAsset && callerRole === 'LEAD_COORDINATOR') {
        throw new Error('ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE: Direct execution by Lead Coordinator blocked. Modify code via Swarm workers or specialized Subagents.');
      }

      return { allowed: true, executedBy: callerRole };
    };

    // Direct edit by Lead Coordinator on production asset is intercepted
    assert.throws(
      () => preExecutionHook({ toolName: 'edit_file', callerRole: 'LEAD_COORDINATOR', isProductionAsset: true }),
      /ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE/
    );

    // Edit by Swarm Worker is authorized
    const workerCall = preExecutionHook({ toolName: 'edit_file', callerRole: 'SWARM_WORKER', isProductionAsset: true });
    assert.equal(workerCall.allowed, true);
    assert.equal(workerCall.executedBy, 'SWARM_WORKER');

    // Scratchpad write by Lead Coordinator is permitted
    const scratchCall = preExecutionHook({ toolName: 'write_file', callerRole: 'LEAD_COORDINATOR', isProductionAsset: false });
    assert.equal(scratchCall.allowed, true);
  });

  await t.test('9. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];

    // GEMINI.md Axiom 61 audit
    const geminiContent = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom61Gemini = geminiContent.match(/61\.\s+\*\*主 Agent 主动化利用 Swarm 与 Subagent 治理公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom61Gemini, 'Axiom 61 block must be extracted from GEMINI.md');
    const geminiText = axiom61Gemini[0];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!geminiText.toLowerCase().includes(token), `GEMINI.md Axiom 61 must not contain scenario token: ${token}`);
    }

    // pstack-openspec SKILL.md Axiom 61 audit
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    const axiom61Pstack = pstackContent.match(/61\.\s+\*\*主 Agent 主动化利用 Swarm 与 Subagent 治理公理[\s\S]*?(?=### 4\.1|\n\n\d+\.)/);
    assert.ok(axiom61Pstack, 'Axiom 61 block must be extracted from pstack-openspec');
    const pstackText = axiom61Pstack[0];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!pstackText.toLowerCase().includes(token), `pstack-openspec Axiom 61 must not contain scenario token: ${token}`);
    }

    // ai-harness-openspec SKILL.md Item 58 (Axiom 61) audit
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    const axiom61Harness = harnessContent.match(/58\.\s+\*\*主 Agent 主动化利用 Swarm 与 Subagent 治理公理[\s\S]*?(?=---\n\n## 📚|\n\n\d+\.)/);
    assert.ok(axiom61Harness, 'Item 58 block must be extracted from ai-harness-openspec');
    const harnessText = axiom61Harness[0];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!harnessText.toLowerCase().includes(token), `ai-harness Item 58 must not contain scenario token: ${token}`);
    }
  });
});
