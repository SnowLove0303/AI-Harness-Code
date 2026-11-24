import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROXY_ONLY_PATTERNS = [
  /^(?:exit\s*code\s*0|passed|tests?\s*pass(?:ed)?|all\s*green|ok|looks\s*good|success|lgtm)$/i,
];

/**
 * Validates a structured blind-audit trail enforcing:
 * 1. Physical isolation between implementer (executorId) and blind auditor (auditorId)
 * 2. Real-artifact witness slicing (rejecting proxy-only claims)
 * 3. Active adversarial falsification probes
 * 4. Bidirectional mechanical audit escalation when blind inspection uncovers defects missed by green mechanical checks
 */
export function validateBlindAuditTrail(trail) {
  const violations = [];

  if (!trail || typeof trail !== 'object') {
    violations.push({
      code: 'INVALID_AUDIT_TRAIL',
      message: 'Audit trail must be a JSON object.',
    });
    return { valid: false, violations };
  }

  if (!trail.executorId || !trail.auditorId || trail.executorId === trail.auditorId) {
    violations.push({
      code: 'SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED',
      message: `Blind auditor must be distinct from executor (executorId=${trail.executorId}, auditorId=${trail.auditorId}).`,
    });
  }

  if (!Array.isArray(trail.witnesses) || trail.witnesses.length === 0) {
    violations.push({
      code: 'PROXY_ONLY_AUDIT_REJECTED',
      message: 'Audit trail must include at least one real-artifact witness entry.',
    });
  } else {
    for (const w of trail.witnesses) {
      const slice = String(w?.observedSlice || '').trim();
      const isProxyOnly = !slice || PROXY_ONLY_PATTERNS.some((re) => re.test(slice));
      if (!w?.artifactPath || isProxyOnly) {
        violations.push({
          code: 'PROXY_ONLY_AUDIT_REJECTED',
          message: `Witness for ${w?.requirementId || 'unknown'} relies on proxy/empty evidence instead of a real artifact slice.`,
        });
      }

      if (trail.mechanicalPassed === true && w?.verdict === 'FAIL' && !w?.mechanicalEscalationGuard) {
        violations.push({
          code: 'MECHANICAL_BLIND_SPOT_UNMITIGATED_BLOCKED',
          message: `Real-artifact defect found on ${w.requirementId} despite green mechanical checks without mechanicalEscalationGuard.`,
        });
      }
    }
  }

  if (!Array.isArray(trail.adversarialProbes) || trail.adversarialProbes.length === 0) {
    violations.push({
      code: 'ADVERSARIAL_PROBE_MISSING_BLOCKED',
      message: 'Blind audit trail must record at least one active adversarial falsification probe.',
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

function runCli() {
  const repoRoot = process.cwd();
  const trailPath = path.join(repoRoot, '.harness', 'blind-audit-trail.json');

  if (!existsSync(trailPath)) {
    console.log('=== Automated L2 Blind Audit & Real-Artifact Witness Guard (AUTOMATED_L2_BLIND_AUDIT_GUARD_STANDARD) ===');
    console.log('[PASS] No active .harness/blind-audit-trail.json found (idle baseline).');
    process.exit(0);
  }

  let trail;
  try {
    trail = JSON.parse(readFileSync(trailPath, 'utf8'));
  } catch (err) {
    console.error(`[FAIL] INVALID_AUDIT_TRAIL_JSON: ${err.message}`);
    process.exit(1);
  }

  const res = validateBlindAuditTrail(trail);
  console.log('=== Automated L2 Blind Audit & Real-Artifact Witness Guard (AUTOMATED_L2_BLIND_AUDIT_GUARD_STANDARD) ===');
  if (!res.valid) {
    for (const v of res.violations) {
      console.error(`[FAIL] ${v.code}: ${v.message}`);
    }
    process.exit(1);
  }

  console.log(`[PASS] Blind audit trail verified (auditor=${trail.auditorId}, ${trail.witnesses.length} real-artifact witness(es), 0 violations).`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
