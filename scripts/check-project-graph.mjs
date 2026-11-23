import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VALID_RISK_TIERS = new Set(['standard', 'critical_load_bearing', 'hotspot_locked']);

/**
 * Validates a Project Architecture & Maintenance Graph against schema,
 * anti-staleness path resolution, dependency integrity, and hotspot circuit breakers.
 */
export function validateProjectGraph(graph, repoRoot) {
  const violations = [];

  if (!graph || typeof graph !== 'object') {
    violations.push({ code: 'INVALID_GRAPH_SCHEMA', message: 'Graph payload must be a JSON object.' });
    return { valid: false, violations };
  }

  if (!graph.schemaVersion || typeof graph.schemaVersion !== 'string') {
    violations.push({ code: 'INVALID_GRAPH_SCHEMA', message: 'Missing or invalid schemaVersion.' });
  }

  if (!Array.isArray(graph.modules) || graph.modules.length === 0) {
    violations.push({ code: 'INVALID_GRAPH_SCHEMA', message: 'Graph must define a non-empty modules array.' });
    return { valid: false, violations };
  }

  const moduleIds = new Set();
  for (const mod of graph.modules) {
    if (!mod.id || typeof mod.id !== 'string') {
      violations.push({ code: 'INVALID_GRAPH_SCHEMA', message: 'Every module must have a string id.' });
      continue;
    }
    if (moduleIds.has(mod.id)) {
      violations.push({ code: 'DUPLICATE_MODULE_ID', message: `Duplicate module id: ${mod.id}` });
    }
    moduleIds.add(mod.id);
  }

  for (const mod of graph.modules) {
    if (!mod.ownership || typeof mod.ownership !== 'string') {
      violations.push({ code: 'MISSING_MODULE_OWNERSHIP', message: `Module ${mod.id} lacks ownership.` });
    }

    if (!Array.isArray(mod.paths) || mod.paths.length === 0) {
      violations.push({ code: 'MISSING_MODULE_PATHS', message: `Module ${mod.id} must declare at least one path.` });
    } else if (repoRoot) {
      for (const relPath of mod.paths) {
        const absPath = path.resolve(repoRoot, relPath);
        if (!existsSync(absPath)) {
          violations.push({
            code: 'STALE_PROJECT_GRAPH_BLOCKED',
            message: `Module ${mod.id} references non-existent path: ${relPath}`,
          });
        }
      }
    }

    if (!VALID_RISK_TIERS.has(mod.riskTier)) {
      violations.push({
        code: 'INVALID_RISK_TIER',
        message: `Module ${mod.id} has invalid riskTier: ${mod.riskTier}`,
      });
    }

    if (!Array.isArray(mod.maintenanceItems)) {
      violations.push({
        code: 'MISSING_MAINTENANCE_LEDGER',
        message: `Module ${mod.id} must declare a maintenanceItems array.`,
      });
    }

    const errorCount = Number(mod.errorMutationCount ?? 0);
    const isHotspot = mod.riskTier === 'hotspot_locked' || errorCount >= 2;
    if (isHotspot) {
      const hasGuards = Array.isArray(mod.structuralGuards) && mod.structuralGuards.length > 0;
      if (!hasGuards) {
        violations.push({
          code: 'REPEATED_HOTSPOT_MUTATION_BLOCKED',
          message: `Module ${mod.id} is hotspot-locked (errorMutationCount=${errorCount}) without structuralGuards.`,
        });
      }
    }

    if (Array.isArray(mod.dependencies)) {
      for (const depId of mod.dependencies) {
        if (!moduleIds.has(depId)) {
          violations.push({
            code: 'DANGLING_DEPENDENCY_EDGE',
            message: `Module ${mod.id} depends on unknown module id: ${depId}`,
          });
        }
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Computes direct and transitive downstream dependents (blast radius) for a target module.
 */
export function computeBlastRadius(graph, targetModuleId) {
  if (!graph || !Array.isArray(graph.modules)) {
    return { found: false, directDependents: [], transitiveDependents: [], riskTier: 'unknown' };
  }

  const target = graph.modules.find((m) => m.id === targetModuleId);
  if (!target) {
    return { found: false, directDependents: [], transitiveDependents: [], riskTier: 'unknown' };
  }

  const directDependents = [];
  for (const mod of graph.modules) {
    if (Array.isArray(mod.dependencies) && mod.dependencies.includes(targetModuleId)) {
      directDependents.push(mod.id);
    }
  }

  const visited = new Set(directDependents);
  const queue = [...directDependents];
  while (queue.length > 0) {
    const currentId = queue.shift();
    for (const mod of graph.modules) {
      if (Array.isArray(mod.dependencies) && mod.dependencies.includes(currentId) && !visited.has(mod.id)) {
        if (mod.id !== targetModuleId) {
          visited.add(mod.id);
          queue.push(mod.id);
        }
      }
    }
  }

  return {
    found: true,
    targetModuleId,
    riskTier: target.riskTier,
    directDependents,
    transitiveDependents: Array.from(visited),
  };
}

/**
 * Generates an initial skeleton Project Architecture Graph via read-only directory discovery.
 */
export function bootstrapProjectGraph(repoRoot) {
  const ignoreSet = new Set(['.git', 'node_modules', 'dist', 'bundle', '.harness']);
  const entries = readdirSync(repoRoot, { withFileTypes: true });
  const modules = [];

  for (const entry of entries) {
    if (ignoreSet.has(entry.name)) continue;
    if (entry.isDirectory()) {
      modules.push({
        id: `mod-${entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name: `${entry.name} Module`,
        ownership: 'Unassigned',
        paths: [entry.name],
        entryPoints: [entry.name],
        dependencies: [],
        riskTier: 'standard',
        errorMutationCount: 0,
        structuralGuards: [],
        maintenanceItems: [],
      });
    }
  }

  if (modules.length === 0) {
    modules.push({
      id: 'mod-root',
      name: 'Root Module',
      ownership: 'Core',
      paths: ['.'],
      entryPoints: ['.'],
      dependencies: [],
      riskTier: 'standard',
      errorMutationCount: 0,
      structuralGuards: [],
      maintenanceItems: [],
    });
  }

  return {
    schemaVersion: '1.0.0',
    projectName: path.basename(repoRoot),
    lastSyncedAt: new Date().toISOString(),
    modules,
  };
}

function runCli() {
  const args = process.argv.slice(2);
  const repoRoot = process.cwd();
  const graphPath = path.join(repoRoot, '.harness', 'project-graph.json');

  if (args.includes('--init')) {
    if (existsSync(graphPath)) {
      console.log(`[INFO] Project graph already exists at ${graphPath}`);
      process.exit(0);
    }
    const skeleton = bootstrapProjectGraph(repoRoot);
    mkdirSync(path.dirname(graphPath), { recursive: true });
    writeFileSync(graphPath, JSON.stringify(skeleton, null, 2) + '\n', 'utf8');
    console.log(`[OK] Bootstrapped initial project graph at ${graphPath} (${skeleton.modules.length} modules).`);
    process.exit(0);
  }

  if (!existsSync(graphPath)) {
    console.error(`[FAIL] PROJECT_GRAPH_MISSING_BLOCKED: Missing ${graphPath}. Run with --init to bootstrap.`);
    process.exit(1);
  }

  let graph;
  try {
    graph = JSON.parse(readFileSync(graphPath, 'utf8'));
  } catch (err) {
    console.error(`[FAIL] INVALID_GRAPH_JSON: ${err.message}`);
    process.exit(1);
  }

  const blastIdx = args.indexOf('--blast-radius');
  if (blastIdx !== -1 && args[blastIdx + 1]) {
    const result = computeBlastRadius(graph, args[blastIdx + 1]);
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.found ? 0 : 1);
  }

  const validation = validateProjectGraph(graph, repoRoot);
  if (!validation.valid) {
    console.error('=== Project Architecture Graph Guard (AUTOMATED_L2_PROJECT_GRAPH_GUARD_STANDARD) ===');
    for (const v of validation.violations) {
      console.error(`[FAIL] ${v.code}: ${v.message}`);
    }
    process.exit(1);
  }

  console.log('=== Project Architecture Graph Guard (AUTOMATED_L2_PROJECT_GRAPH_GUARD_STANDARD) ===');
  console.log(`[PASS] Project Architecture Graph verified (${graph.modules.length} modules, 0 violations).`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
