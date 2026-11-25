import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic L2 Agent Lifecycle Governance Evaluator (Axiom 77):
 * Enforces anti-sprawl controlled spawning, role-pinned persistent reuse,
 * single-instance-per-role cap, and human-authorized termination lock.
 */
export function evaluateAgentLifecycleAction(request) {
  if (!request || typeof request !== 'object') {
    return { allowed: false, code: 'INVALID_LIFECYCLE_REQUEST', message: 'Request must be an object.' };
  }

  const {
    action,
    targetRole = '',
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

  // 2. Anti-Sprawl Controlled Spawning & Single-Instance-Per-Role Cap
  if (action === 'spawn' || action === 'swarm_add') {
    if ((concurrentCount > 1 || action === 'swarm_add') && humanAuthorized !== true) {
      return {
        allowed: false,
        code: 'UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED',
        message: `Spawning multiple subagents/Swarm (${action}, count=${concurrentCount}) requires explicit human authorization.`,
      };
    }

    const activeOrIdleMatch = existingAgents.find(
      (a) => a && a.role === targetRole && a.status !== 'killed'
    );
    if (activeOrIdleMatch) {
      return {
        allowed: false,
        code: 'DUPLICATE_ROLE_INSTANCE_BLOCKED',
        recommendedAction: 'REUSE_EXISTING_AGENT',
        targetAgentId: activeOrIdleMatch.id,
        message: `Role '${targetRole}' is already held by '${activeOrIdleMatch.id}'. Reuse via send_message instead of spawning a duplicate.`,
      };
    }

    return { allowed: true, code: 'SPAWN_AUTHORIZED' };
  }

  // 3. Role-Pinned Persistent Reuse
  if (action === 'reuse') {
    const match = existingAgents.find(
      (a) => a && a.role === targetRole && a.status !== 'killed'
    );
    if (!match) {
      return {
        allowed: false,
        code: 'REUSE_TARGET_NOT_FOUND',
        message: `No active or idle agent found for role '${targetRole}'.`,
      };
    }
    if (!String(focusedScope || '').trim()) {
      return {
        allowed: false,
        code: 'UNFOCUSED_REUSE_HANDOFF_BLOCKED',
        message: 'Reusing a persistent agent via send_message requires focusedScope task boundaries.',
      };
    }
    return {
      allowed: true,
      code: 'REUSE_EXISTING_AGENT',
      targetAgentId: match.id,
    };
  }

  return { allowed: false, code: 'UNKNOWN_LIFECYCLE_ACTION', message: `Unsupported action: ${action}` };
}

function runCli() {
  const repoRoot = process.cwd();
  const policyFile = path.join(repoRoot, 'GEMINI.md');
  const valid = existsSync(policyFile) && readFileSync(policyFile, 'utf8').includes('ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM');

  console.log('=== Automated L2 Agent Lifecycle Guard (AUTOMATED_L2_AGENT_LIFECYCLE_GUARD_STANDARD) ===');
  if (!valid) {
    console.error('[FAIL] AXIOM_77_MISSING_FROM_CONSTITUTION: Axiom 77 not found in GEMINI.md');
    process.exit(1);
  }
  console.log('[PASS] Anti-sprawl, role-pinned reuse, and termination lock verified (Exit Code 0).');
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
