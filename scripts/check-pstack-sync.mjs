import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIN_UPSTREAM_VERSION = '0.15.48';

function compareSemver(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const va = pa[i] || 0;
    const vb = pb[i] || 0;
    if (va > vb) return 1;
    if (va < vb) return -1;
  }
  return 0;
}

/**
 * Inspects the local pstack upstream mirror for minimum version and required v0.15.48 skills.
 */
export function checkLocalUpstreamMirror(upstreamDir) {
  const violations = [];
  const pluginJsonPath = path.join(upstreamDir, 'plugin.json');

  if (!existsSync(pluginJsonPath)) {
    violations.push({
      code: 'UPSTREAM_MIRROR_MISSING',
      message: `Missing plugin.json at ${pluginJsonPath}`,
    });
    return { valid: false, version: null, violations };
  }

  let plugin;
  try {
    plugin = JSON.parse(readFileSync(pluginJsonPath, 'utf8'));
  } catch (err) {
    violations.push({
      code: 'UPSTREAM_PLUGIN_JSON_INVALID',
      message: `Invalid plugin.json: ${err.message}`,
    });
    return { valid: false, version: null, violations };
  }

  if (!plugin.version || compareSemver(plugin.version, MIN_UPSTREAM_VERSION) < 0) {
    violations.push({
      code: 'UPSTREAM_VERSION_OUTDATED',
      message: `Local pstack version ${plugin.version} is older than required ${MIN_UPSTREAM_VERSION}`,
    });
  }

  const reframeSkillPath = path.join(upstreamDir, 'skills', 'reframe', 'SKILL.md');
  if (!existsSync(reframeSkillPath)) {
    violations.push({
      code: 'REFRAME_SKILL_MISSING',
      message: 'Missing skills/reframe/SKILL.md in upstream mirror.',
    });
  }

  const statechartSkillPath = path.join(upstreamDir, 'skills', 'statechart', 'SKILL.md');
  if (!existsSync(statechartSkillPath)) {
    violations.push({
      code: 'STATECHART_SKILL_MISSING',
      message: 'Missing skills/statechart/SKILL.md in upstream mirror.',
    });
  }

  return {
    valid: violations.length === 0,
    version: plugin.version,
    violations,
  };
}

/**
 * Ambiguity Threshold Gate (PROP-C):
 * Determines whether an operator input warrants full /reframe disambiguation & terminology
 * reframing or should proceed directly to 1:1 RTM ingestion.
 */
export function evaluateReframeTrigger(inputText) {
  const text = String(inputText || '').trim();
  if (!text) {
    return { trigger: 'REFRAME_REQUIRED', reason: 'EMPTY_OR_UNDERSPECIFIED_INPUT' };
  }

  if (/\/reframe\b/i.test(text)) {
    return { trigger: 'REFRAME_REQUIRED', reason: 'EXPLICIT_REFRAME_INVOCATION' };
  }

  const hasConcreteFileOrPath = /\b[\w\-./\\]+\.(mjs|js|ts|tsx|py|json|md|ps1|sh)\b/i.test(text);
  const hasConcreteErrorOrCode = /\b(Error:|TypeError:|Exit Code\s*\d+|L\d+|#[a-f0-9]{6,}|[A-Z_]{4,}_(BLOCKED|FAILED|ERROR))\b/.test(text);

  if (hasConcreteFileOrPath || hasConcreteErrorOrCode) {
    return { trigger: 'DIRECT_RTM_INGESTION', reason: 'CONCRETE_TECHNICAL_ANCHORS_PRESENT' };
  }

  return { trigger: 'REFRAME_REQUIRED', reason: 'AMBIGUOUS_OR_COLLOQUIAL_DESCRIPTION' };
}

/**
 * Zero-Fabricated-Citation Guard (PROP-E):
 * Ensures every external citation in /reframe outputs has been explicitly verified.
 */
export function validateCitations(citations = []) {
  const violations = [];
  for (const cite of citations) {
    if (!cite || cite.verified !== true || !cite.url) {
      violations.push({
        code: 'UNVERIFIED_CITATION_BLOCKED',
        message: `Citation lacks verified=true confirmation: ${cite?.url || 'missing-url'}`,
      });
    }
  }
  return {
    valid: violations.length === 0,
    violations,
  };
}

async function runCli() {
  const args = process.argv.slice(2);
  const upstreamDir =
    process.env.PSTACK_UPSTREAM_DIR || path.join(os.homedir(), '.gemini', 'pstack-upstream');

  const result = checkLocalUpstreamMirror(upstreamDir);

  if (args.includes('--check-remote')) {
    try {
      const res = await fetch('https://raw.githubusercontent.com/cursor/plugins/main/pstack/plugin.json', {
        headers: { 'User-Agent': 'antigravity-pstack-sync-check' },
      });
      if (res.ok) {
        const remote = await res.json();
        console.log(`[Remote] Latest upstream pstack version: ${remote.version}`);
      }
    } catch (err) {
      console.warn(`[Warn] Remote check skipped: ${err.message}`);
    }
  }

  console.log('=== Upstream PStack Sync & Reframe Guard (UPSTREAM_PSTACK_SYNC_INSPECTOR_STANDARD) ===');
  if (!result.valid) {
    for (const v of result.violations) {
      console.error(`[FAIL] ${v.code}: ${v.message}`);
    }
    process.exit(1);
  }

  console.log(`[PASS] Local pstack-upstream v${result.version} verified (/reframe & /statechart present, 0 violations).`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
