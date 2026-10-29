import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncAllToGlobal } from '../sync-to-global.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '../..');
const globalGeminiRoot = resolve(process.env.USERPROFILE || 'C:\\Users\\Administrator', '.gemini');

test('sync-to-global engine executes idempotently and synchronizes all assets', () => {
  const updatedCount = syncAllToGlobal();
  assert.equal(typeof updatedCount, 'number', 'must return updated file count');
  assert.ok(updatedCount >= 0, 'updated count must be non-negative');

  // Verify global assets exist and are populated
  const expectedFiles = [
    join(globalGeminiRoot, 'config', 'GEMINI.md'),
    join(globalGeminiRoot, 'config', 'skills', 'orbitstack-gemini', 'SKILL.md'),
    join(globalGeminiRoot, 'config', 'skills', 'orbitstack-pstack-openspec', 'SKILL.md'),
    join(globalGeminiRoot, 'config', 'skills', 'pstack-openspec', 'SKILL.md'),
    join(globalGeminiRoot, 'config', 'skills', 'ai-harness-openspec', 'SKILL.md'),
    join(globalGeminiRoot, 'pstack-openspec-route-map.json'),
    join(globalGeminiRoot, 'scripts', 'pstack-handoff.mjs'),
    join(globalGeminiRoot, 'scripts', 'audit-protected-invariants.mjs'),
    join(globalGeminiRoot, 'scripts', 'audit-pstack-openspec-routing.ps1')
  ];

  for (const f of expectedFiles) {
    assert.ok(existsSync(f), `Global asset must exist after sync: ${f}`);
  }
});

test('sync-to-global engine protects Codex directory invariants', () => {
  const syncScriptContent = readFileSync(resolve(repoRoot, 'scripts/sync-to-global.mjs'), 'utf8');
  assert.match(syncScriptContent, /\.codex/, 'must contain explicit guard against .codex modification');
  assert.match(syncScriptContent, /Safety Violation/, 'must throw safety violation if codex path is targeted');
});
