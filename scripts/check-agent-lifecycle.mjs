import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const AXIOM_82_REQUIRED_TOKENS = [
  'STRICT_HUMAN_SPAWN_APPROVAL_PRIORITY_REUSE_&_ROLE_DISPATCH_AXIOM',
  'ZERO_UNAPPROVED_SPAWN_IN_ANY_THREAD',
  'PRIORITY_REUSE_BEFORE_SPAWN_REQUEST',
  'MANDATORY_ROLE_TAG_DETAIL_&_MATCHED_DISPATCH',
  'POTETO_MULTI_AGENT_ROLE_ARCHITECTURE_ALIGNMENT',
  'UNAUTHORIZED_SPAWN_WITHOUT_USER_APPROVAL_BLOCKED',
  'MISSING_AGENT_ROLE_METADATA_BLOCKED',
  'ROLE_TASK_MISMATCH_BLOCKED',
];

/**
 * Deterministic L2 Agent Lifecycle Governance Evaluator (Axiom 77 + Axiom 82):
 * Enforces zero unapproved Swarm/Subagent spawns in ANY thread, priority reuse of
 * existing same-role agents, mandatory roleTag + roleDetail metadata, role-matched
 * task dispatch (aligned with poteto orchestrate/poteto-agent architecture), and
 * human-authorized termination lock.
 */
export function evaluateAgentLifecycleAction(request) {
  if (!request || typeof request !== 'object') {
    return { allowed: false, code: 'INVALID_LIFECYCLE_REQUEST', message: 'Request must be an object.' };
  }

  const {
    action,
    targetRole = '',
    roleTag = targetRole,
    roleDetail = '',
    taskRoleTag = roleTag,
    existingAgents = [],
    concurrentCount = 1,
    humanAuthorized = false,
    focusedScope = '',
  } = request;

  // 1. Human-Authorized Termination Lock
  if (action === 'kill' || action === 'kill_all') {
    if (humanAuthorized !== true) {
      return {
        allowed: false,
        code: 'UNAUTHORIZED_AGENT_TERMINATION_BLOCKED',
        message: `Termination action '${action}' is blocked without explicit human authorization.`,
      };
    }
    return { allowed: true, code: 'TERMINATION_AUTHORIZED' };
  }

  const effectiveRole = String(roleTag || targetRole || '').trim();

  // 2. Strict Human Approval Gate & Priority Reuse for ANY Spawn / Swarm Add
  if (action === 'spawn' || action === 'swarm_add') {
    const activeOrIdleMatch = existingAgents.find(
      (a) => a && (a.roleTag === effectiveRole || a.role === effectiveRole) && a.status !== 'killed'
    );
    if (activeOrIdleMatch) {
      return {
        allowed: false,
        code: 'DUPLICATE_ROLE_INSTANCE_BLOCKED',
        recommendedAction: 'REUSE_EXISTING_AGENT',
        targetAgentId: activeOrIdleMatch.id,
        message: `Role '${effectiveRole}' is already held by '${activeOrIdleMatch.id}'. Reuse via send_message instead of spawning a new agent.`,
      };
    }

    if (humanAuthorized !== true) {
      return {
        allowed: false,
        code: 'UNAUTHORIZED_SPAWN_WITHOUT_USER_APPROVAL_BLOCKED',
        message: `Spawning any new Swarm/Subagent (${action}, count=${concurrentCount}) in any thread requires explicit user approval first.`,
      };
    }

    if (!effectiveRole || !String(roleDetail || '').trim()) {
      return {
        allowed: false,
        code: 'MISSING_AGENT_ROLE_METADATA_BLOCKED',
        message: 'Every Agent/Subagent must carry explicit roleTag and roleDetail before creation.',
      };
    }

    return { allowed: true, code: 'SPAWN_AUTHORIZED', roleTag: effectiveRole };
  }

  // 3. Role-Pinned Persistent Reuse & Role-Matched Task Dispatch
  if (action === 'reuse' || action === 'dispatch') {
    const match = existingAgents.find(
      (a) => a && (a.roleTag === effectiveRole || a.role === effectiveRole) && a.status !== 'killed'
    );
    if (!match) {
      return {
        allowed: false,
        code: 'REUSE_TARGET_NOT_FOUND',
        message: `No active or idle agent found for role '${effectiveRole}'. Request user approval before spawning a new one.`,
      };
    }

    const pinnedRole = String(match.roleTag || match.role || '').trim();
    const pinnedDetail = String(match.roleDetail || roleDetail || '').trim();
    if (!pinnedRole || !pinnedDetail) {
      return {
        allowed: false,
        code: 'MISSING_AGENT_ROLE_METADATA_BLOCKED',
        message: `Agent '${match.id}' must have both roleTag and roleDetail before task dispatch.`,
      };
    }

    const requestedTaskRole = String(taskRoleTag || pinnedRole).trim();
    if (requestedTaskRole !== pinnedRole) {
      return {
        allowed: false,
        code: 'ROLE_TASK_MISMATCH_BLOCKED',
        message: `Task role '${requestedTaskRole}' does not match agent '${match.id}' pinned role '${pinnedRole}'.`,
      };
    }

    if (!String(focusedScope || '').trim()) {
      return {
        allowed: false,
        code: 'UNFOCUSED_REUSE_HANDOFF_BLOCKED',
        message: 'Reusing/dispatching an agent via send_message requires focusedScope task boundaries.',
      };
    }
    return {
      allowed: true,
      code: 'REUSE_EXISTING_AGENT',
      targetAgentId: match.id,
      roleTag: pinnedRole,
    };
  }

  return { allowed: false, code: 'UNKNOWN_LIFECYCLE_ACTION', message: `Unsupported action: ${action}` };
}

function runCli() {
  const repoRoot = process.cwd();
  const mirrors = [
    { name: 'GEMINI.md', file: path.join(repoRoot, 'GEMINI.md') },
    { name: 'skills/pstack-openspec/SKILL.md', file: path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md') },
    { name: 'skills/ai-harness-openspec/SKILL.md', file: path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md') },
    { name: 'worker.md', file: path.join(repoRoot, 'worker.md') },
  ];

  console.log('=== Automated L2 Agent Lifecycle Guard (AUTOMATED_L2_AGENT_LIFECYCLE_GUARD_STANDARD) ===');
  const violations = [];
  for (const m of mirrors) {
    if (!existsSync(m.file)) {
      violations.push(`MISSING_FILE: ${m.name}`);
      continue;
    }
    const content = readFileSync(m.file, 'utf8');
    if (m.name === 'GEMINI.md' && !content.includes('ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM')) {
      violations.push('AXIOM_77_MISSING_FROM_GEMINI');
    }
    if (m.name !== 'worker.md') {
      for (const token of AXIOM_82_REQUIRED_TOKENS) {
        if (!content.includes(token)) {
          violations.push(`AXIOM_82_MISSING_TOKEN [${m.name}]: ${token}`);
        }
      }
    } else if (!content.includes('STRICT_HUMAN_SPAWN_APPROVAL_PRIORITY_REUSE_&_ROLE_DISPATCH_AXIOM')) {
      violations.push('AXIOM_82_MISSING_FROM_WORKER');
    }
  }

  if (violations.length > 0) {
    for (const v of violations) console.error(`[FAIL] ${v}`);
    process.exit(1);
  }
  console.log('[PASS] Anti-sprawl, strict human spawn approval, priority reuse, and role-matched dispatch verified across 3 mirrors + worker.md (Exit Code 0).');
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
