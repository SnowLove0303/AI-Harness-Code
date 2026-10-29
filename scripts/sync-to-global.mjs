#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const userProfile = process.env.USERPROFILE || 'C:\\Users\\Administrator';
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
      return false; // Identical
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

export function syncAllToGlobal() {
  console.log(`=== OrbitStack Global Gemini Auto-Sync Starting ===`);
  console.log(`Source Repo Root: ${repoRoot}`);
  console.log(`Target Global Gemini: ${globalGeminiRoot}`);

  let updatedCount = 0;

  // 1. Sync GEMINI.md core rules to global config
  const repoGeminiMd = join(repoRoot, 'GEMINI.md');
  const globalGeminiMd = join(globalGeminiRoot, 'config', 'GEMINI.md');
  if (existsSync(repoGeminiMd)) {
    if (syncFile(repoGeminiMd, globalGeminiMd)) updatedCount++;
  } else if (existsSync(globalGeminiMd)) {
    // If repo root doesn't have it yet, seed from global
    syncFile(globalGeminiMd, repoGeminiMd);
  }

  // 2. Sync orbitstack-gemini adapter to both global skills
  const adapterDir = join(repoRoot, 'orbitstack-gemini');
  updatedCount += syncDirectory(adapterDir, join(globalGeminiRoot, 'config', 'skills', 'orbitstack-gemini'));
  updatedCount += syncDirectory(adapterDir, join(globalGeminiRoot, 'config', 'skills', 'orbitstack-pstack-openspec'));

  // 3. Sync skills/pstack-openspec
  const pstackSkillSrc = join(repoRoot, 'skills', 'pstack-openspec');
  const pstackSkillDest = join(globalGeminiRoot, 'config', 'skills', 'pstack-openspec');
  if (existsSync(pstackSkillSrc)) {
    updatedCount += syncDirectory(pstackSkillSrc, pstackSkillDest);
  }

  // 4. Sync skills/ai-harness-openspec
  const harnessSkillSrc = join(repoRoot, 'skills', 'ai-harness-openspec');
  const harnessSkillDest = join(globalGeminiRoot, 'config', 'skills', 'ai-harness-openspec');
  if (existsSync(harnessSkillSrc)) {
    updatedCount += syncDirectory(harnessSkillSrc, harnessSkillDest);
  }

  // 5. Sync route registry
  const routeMapSrc = join(repoRoot, 'docs', 'pstack-openspec-route-map.json');
  const routeMapDest = join(globalGeminiRoot, 'pstack-openspec-route-map.json');
  if (syncFile(routeMapSrc, routeMapDest)) updatedCount++;

  // 6. Sync helper scripts
  const scriptsToSync = [
    'pstack-handoff.mjs',
    'audit-protected-invariants.mjs',
    'audit-pstack-openspec-routing.ps1'
  ];
  for (const s of scriptsToSync) {
    const sSrc = join(repoRoot, 'scripts', s);
    const sDest = join(globalGeminiRoot, 'scripts', s);
    if (syncFile(sSrc, sDest)) updatedCount++;
  }

  console.log(`[OK] Global sync completed successfully. Total files updated: ${updatedCount}`);
  return updatedCount;
}

// Direct execution
if (process.argv[1] && process.argv[1].endsWith('sync-to-global.mjs')) {
  try {
    syncAllToGlobal();
    process.exit(0);
  } catch (err) {
    console.error(`[Error] Global sync failed:`, err);
    process.exit(1);
  }
}
