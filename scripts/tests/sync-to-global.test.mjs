import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncAllToGlobal } from '../sync-to-global.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '../..');

test('sync-to-global engine executes idempotently and deploys Single-Entry Ps-openspec Hub', () => {
  const tempRoot = mkdtempSync(join(tmpdir(), 'ps-openspec-sync-'));
  try {
    const updatedCount = syncAllToGlobal(tempRoot);
    assert.equal(typeof updatedCount, 'number', 'must return updated file count');
    assert.ok(updatedCount > 0, 'initial sync must deploy hub files');

    const secondRun = syncAllToGlobal(tempRoot);
    assert.equal(secondRun, 0, 'second sync run must be idempotent (0 updates)');

    const expectedFiles = [
      join(tempRoot, 'config', 'GEMINI.md'),
      join(tempRoot, 'config', 'skills', 'orbitstack-pstack-openspec', 'SKILL.md'),
      join(tempRoot, 'ps-hub', 'skills', 'pstack-openspec', 'SKILL.md'),
      join(tempRoot, 'ps-hub', 'skills', 'pstack-openspec', 'references', 'operating-invariants-full.md'),
      join(tempRoot, 'ps-hub', 'skills', 'ai-harness-openspec', 'SKILL.md'),
      join(tempRoot, 'ps-toolbox-index.json'),
      join(tempRoot, 'pstack-openspec-route-map.json'),
      join(tempRoot, 'ps-hub', 'scripts', 'pstack-handoff.mjs'),
      join(tempRoot, 'ps-hub', 'scripts', 'check-single-entry-hub.mjs'),
      join(tempRoot, 'scripts', 'pstack-handoff.mjs'),
      join(tempRoot, 'scripts', 'audit-protected-invariants.mjs'),
      join(tempRoot, 'scripts', 'audit-pstack-openspec-routing.ps1'),
      join(tempRoot, 'config', 'plugins', 'ps-openspec', 'plugin.json'),
      join(tempRoot, 'config', 'plugins', 'ps-openspec', 'skills', 'mech-audit', 'SKILL.md'),
      join(tempRoot, 'config', 'plugins', 'ps-openspec', 'skills', 'ortho-audit', 'SKILL.md'),
      join(tempRoot, 'config', 'plugins', 'ps-openspec', 'skills', 'ps-guide', 'SKILL.md')
    ];

    for (const f of expectedFiles) {
      assert.ok(existsSync(f), `Global asset must exist after sync: ${f}`);
    }
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('sync-to-global engine protects Codex directory invariants', () => {
  const syncScriptContent = readFileSync(resolve(repoRoot, 'scripts/sync-to-global.mjs'), 'utf8');
  assert.match(syncScriptContent, /\.codex/, 'must contain explicit guard against .codex modification');
  assert.match(syncScriptContent, /Safety Violation/, 'must throw safety violation if codex path is targeted');
});
