#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const userProfile = process.env.USERPROFILE || homedir();
const globalGeminiRoot = resolve(userProfile, '.gemini');

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function syncFile(src, dest) {
  if (dest.toLowerCase().includes('.codex')) {
    throw new Error(`Safety Violation: Attempted to write to protected Codex path: ${dest}`);
  }
  if (!existsSync(src)) {
    console.warn(`[Skip] Source file does not exist: ${src}`);
    return false;
  }
  mkdirSync(dirname(dest), { recursive: true });
  const srcBuf = readFileSync(src);
  if (existsSync(dest)) {
    const destBuf = readFileSync(dest);
    if (sha256(srcBuf) === sha256(destBuf)) {
      return false;
    }
  }
  writeFileSync(dest, srcBuf);
  console.log(`[Sync] Updated: ${dest}`);
  return true;
}

function syncDirectory(srcDir, destDir) {
  if (destDir.toLowerCase().includes('.codex')) {
    throw new Error(`Safety Violation: Attempted to write to protected Codex path: ${destDir}`);
  }
  if (!existsSync(srcDir)) return 0;
  mkdirSync(destDir, { recursive: true });
  let count = 0;
  const entries = readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);
    if (entry.isDirectory()) {
      count += syncDirectory(srcPath, destPath);
    } else {
      if (syncFile(srcPath, destPath)) count++;
    }
  }
  return count;
}

export function syncAllToGlobal(targetRoot = globalGeminiRoot) {
  console.log(`=== OrbitStack Single-Entry Ps-openspec Hub Sync Starting ===`);
  console.log(`Source Repo Root: ${repoRoot}`);
  console.log(`Target Global Gemini: ${targetRoot}`);

  let updatedCount = 0;
  const psHubRoot = join(targetRoot, 'ps-hub');

  // 1. Sync compact GEMINI.md single-entry switch to global config
  const repoGeminiMd = join(repoRoot, 'GEMINI.md');
  const globalGeminiMd = join(targetRoot, 'config', 'GEMINI.md');
  if (existsSync(repoGeminiMd)) {
    if (syncFile(repoGeminiMd, globalGeminiMd)) updatedCount++;
  }

  // 1b. Sync worker.md to global Gemini root
  const repoWorkerMd = join(repoRoot, 'worker.md');
  const globalWorkerMd = join(targetRoot, 'worker.md');
  if (existsSync(repoWorkerMd)) {
    if (syncFile(repoWorkerMd, globalWorkerMd)) updatedCount++;
  }

  // 1c. Deduplicate legacy rule snapshot so it does not double-load alongside GEMINI.md
  const legacyRule = join(targetRoot, 'config', 'rules', 'ps-openspec-v210-governance.md');
  if (existsSync(legacyRule)) {
    const backupDir = join(targetRoot, 'backup-legacy-rules');
    mkdirSync(backupDir, { recursive: true });
    renameSync(legacyRule, join(backupDir, 'ps-openspec-v210-governance.md'));
    console.log(`[Dedup] Archived legacy duplicate rule: ps-openspec-v210-governance.md`);
    updatedCount++;
  }

  // 2. Single-Entry Skill: Only orbitstack-pstack-openspec is registered in config/skills
  const adapterDir = join(repoRoot, 'orbitstack-gemini');
  updatedCount += syncDirectory(adapterDir, join(targetRoot, 'config', 'skills', 'orbitstack-pstack-openspec'));

  // 3. Store all Ps-openspec skills inside ~/.gemini/ps-hub/skills/ for on-demand lookup
  updatedCount += syncDirectory(adapterDir, join(psHubRoot, 'skills', 'orbitstack-gemini'));

  // @PROTOCOL_INVARIANT_ALLOWLIST: built-in hub skill directory manifest
  const SKILLS_TO_HUB = [
    'pstack-openspec',
    'ai-harness-openspec',
    'spec-driven-workflow',
    'desktop-exe-development',
    'ui-ux-design-engineering',
    'drawio-mcp',
    'rea-reverse-engineering',
    'app-reverse-deconstruction',
    'tavily-search',
    'xmind-cloud-mcp',
    'ortho-audit',
  ];
  for (const skillName of SKILLS_TO_HUB) {
    const skillSrc = join(repoRoot, 'skills', skillName);
    const skillDest = join(psHubRoot, 'skills', skillName);
    if (existsSync(skillSrc)) {
      updatedCount += syncDirectory(skillSrc, skillDest);
    }
    // Remove duplicate from auto-loaded config/skills so Antigravity does not inject it every turn
    const oldConfigSkill = join(targetRoot, 'config', 'skills', skillName);
    if (existsSync(oldConfigSkill)) {
      rmSync(oldConfigSkill, { recursive: true, force: true });
      console.log(`[Hub] Moved out of auto-loaded config/skills: ${skillName}`);
      updatedCount++;
    }
  }
  const oldOrbitGemini = join(targetRoot, 'config', 'skills', 'orbitstack-gemini');
  if (existsSync(oldOrbitGemini)) {
    rmSync(oldOrbitGemini, { recursive: true, force: true });
    console.log(`[Hub] Deduplicated config/skills/orbitstack-gemini (kept orbitstack-pstack-openspec)`);
    updatedCount++;
  }

  // 4. Sync route registry, toolbox index, and upstream pstack mirror
  if (syncFile(join(repoRoot, 'docs', 'pstack-openspec-route-map.json'), join(targetRoot, 'pstack-openspec-route-map.json'))) updatedCount++;
  if (syncFile(join(repoRoot, 'docs', 'toolbox-index.json'), join(targetRoot, 'ps-toolbox-index.json'))) updatedCount++;
  updatedCount += syncDirectory(join(repoRoot, 'bundle', 'pstack-upstream'), join(targetRoot, 'pstack-upstream'));

  // 5. Sync helper & L2 guard scripts into ps-hub/scripts (and core handoff scripts in ~/.gemini/scripts)
  const scriptsToSync = [
    'pstack-handoff.mjs',
    'audit-protected-invariants.mjs',
    'audit-pstack-openspec-routing.ps1',
    'check-packaged-docs-neutrality.mjs',
    'check-unslop-purity.mjs',
    'check-issue-clearance.mjs',
    'check-workflow-spec-compliance.mjs',
    'check-invocation-purity.mjs',
    'check-universal-portability.mjs',
    'check-project-graph.mjs',
    'check-ledger-continuity.mjs',
    'check-pstack-sync.mjs',
    'check-single-entry-hub.mjs',
    'check-ui-slop.mjs',
    'check-blind-audit.mjs',
    'check-drawio-model.mjs',
    'check-agent-lifecycle.mjs',
    'check-anti-hardcoding.mjs',
    'check-problem-brainstorm.mjs',
    'check-secret-privacy.mjs',
    'check-problem-ledger-ruling.mjs',
    'drawio-toolkit.mjs',
  ];
  for (const s of scriptsToSync) {
    const sSrc = join(repoRoot, 'scripts', s);
    if (syncFile(sSrc, join(psHubRoot, 'scripts', s))) updatedCount++;
  }
  for (const coreScript of ['pstack-handoff.mjs', 'audit-protected-invariants.mjs', 'audit-pstack-openspec-routing.ps1']) {
    const sSrc = join(repoRoot, 'scripts', coreScript);
    if (syncFile(sSrc, join(targetRoot, 'scripts', coreScript))) updatedCount++;
  }

  // 6. Sync Ps-openspec slash-command plugin (skills/<cmd>/SKILL.md + plugin.json)
  const workflowsSrc = join(repoRoot, 'workflows');
  if (existsSync(workflowsSrc)) {
    const pluginDest = join(targetRoot, 'config', 'plugins', 'ps-openspec');
    mkdirSync(pluginDest, { recursive: true });
    const manifestJson = JSON.stringify(
      {
        name: 'ps-openspec',
        description: 'Ps-openspec dual-gate workflow and OrthoAudit/MechAudit slash commands for Antigravity',
        version: '3.0.0',
      },
      null,
      2
    ) + '\n';
    const manifestDest = join(pluginDest, 'plugin.json');
    if (!existsSync(manifestDest) || readFileSync(manifestDest, 'utf8') !== manifestJson) {
      writeFileSync(manifestDest, manifestJson, 'utf8');
      console.log(`[Sync] Updated: ${manifestDest}`);
      updatedCount++;
    }
    for (const entry of readdirSync(workflowsSrc, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      const cmdName = entry.name.slice(0, -3);
      const raw = readFileSync(join(workflowsSrc, entry.name), 'utf8');
      const skillContent = /^---\r?\n[\s\S]*?\bname:\s*/m.test(raw)
        ? raw
        : raw.replace(/^---\r?\n/, `---\nname: ${cmdName}\n`);
      const skillDir = join(pluginDest, 'skills', cmdName);
      mkdirSync(skillDir, { recursive: true });
      const skillDest = join(skillDir, 'SKILL.md');
      if (!existsSync(skillDest) || readFileSync(skillDest, 'utf8') !== skillContent) {
        writeFileSync(skillDest, skillContent, 'utf8');
        console.log(`[Sync] Updated: ${skillDest}`);
        updatedCount++;
      }
    }
  }

  console.log(`[OK] Global Single-Entry Hub sync completed. Total operations: ${updatedCount}`);
  return updatedCount;
}

if (process.argv[1] && process.argv[1].endsWith('sync-to-global.mjs')) {
  try {
    syncAllToGlobal();
    process.exit(0);
  } catch (err) {
    console.error(`[Error] Global sync failed:`, err);
    process.exit(1);
  }
}
