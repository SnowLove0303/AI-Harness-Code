import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { checkUiContent } from '../scripts/check-ui-slop.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Blocks nested card containers (UI_SLOP_NESTED_CARD_BLOCKED)', () => {
  const badMarkup = `
    <Card>
      <div className="p-4">
        <Card>Nested box inside a card</Card>
      </div>
    </Card>
  `;
  const res = checkUiContent(badMarkup, 'Dashboard.tsx');
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'UI_SLOP_NESTED_CARD_BLOCKED'));
});

test('2. Enforces three-mode badge density budget (UI_SLOP_EXCESSIVE_BADGES_BLOCKED)', () => {
  const fourBadges = `
    <div>
      <Badge>Alpha</Badge>
      <Badge>Beta</Badge>
      <Badge>Gamma</Badge>
      <Badge>Delta</Badge>
    </div>
  `;
  // operate mode allows max 3 badges -> blocks 4
  const operateRes = checkUiContent(fourBadges, 'Console.tsx', { mode: 'operate' });
  assert.equal(operateRes.valid, false);
  assert.ok(operateRes.violations.some((v) => v.code === 'UI_SLOP_EXCESSIVE_BADGES_BLOCKED'));

  // persuade mode allows max 4 badges -> passes 4
  const persuadeRes = checkUiContent(fourBadges, 'Landing.tsx', { mode: 'persuade' });
  assert.equal(persuadeRes.valid, true);
});

test('3. Blocks redundant eyebrow/kicker labels above headings (UI_SLOP_EYEBROW_CLUTTER_BLOCKED)', () => {
  const eyebrowMarkup = `
    <section>
      <span className="uppercase tracking-widest text-xs text-slate-400">SYSTEM OVERVIEW</span>
      <h1>Operations</h1>
    </section>
  `;
  const res = checkUiContent(eyebrowMarkup, 'Overview.tsx');
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'UI_SLOP_EYEBROW_CLUTTER_BLOCKED'));
});

test('4. Blocks verbose explanatory prose and purple-glow AI clichés', () => {
  const sloppyMarkup = `
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-purple-500/50">
      <p>Click here to configure and manage all your settings effortlessly inside this unified dashboard panel with zero friction.</p>
    </div>
  `;
  const res = checkUiContent(sloppyMarkup, 'SlopPanel.tsx', { mode: 'operate' });
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'UI_SLOP_VERBOSE_PROSE_BLOCKED'));
  assert.ok(res.violations.some((v) => v.code === 'UI_SLOP_PURPLE_GLOW_CLICHE_BLOCKED'));
});

test('5. Distilled, high-craft operational UI passes cleanly with 0 violations', () => {
  const cleanMarkup = `
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Build Queue</h2>
        <Badge>Active</Badge>
      </header>
      <div className="tabular-nums text-sm text-slate-700">128ms</div>
    </section>
  `;
  const res = checkUiContent(cleanMarkup, 'BuildQueue.tsx', { mode: 'operate' });
  assert.equal(res.valid, true, `Unexpected violations: ${JSON.stringify(res.violations)}`);
});

test('6. UI skill upgrade and Axiom 73 parity across all three constitutional mirrors', () => {
  const uiSkill = readFileSync(path.join(repoRoot, 'skills/ui-ux-design-engineering/SKILL.md'), 'utf8');
  assert.match(uiSkill, /impeccable/i);
  assert.match(uiSkill, /Shape -> Distill -> Polish/);
  assert.match(uiSkill, /tabular-nums/);
  assert.match(uiSkill, /guard:ui-slop/);

  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'UI_CRAFT_DISTILL_&_AUTOMATED_SLOP_GUARD_AXIOM',
    'UI_CRAFT_FLOOR_&_ANTI_PLAINNESS_STANDARD',
    'UI_DISTILL_PURIFICATION_&_ZERO_CLUTTER_PROTOCOL',
    'UI_SHAPE_DISTILL_POLISH_EXECUTION_ORDER',
    'UI_THREE_MODE_DENSITY_BUDGET_STANDARD',
    'AUTOMATED_L2_UI_SLOP_GUARD_STANDARD',
    'CROSS_FRAMEWORK_UI_DIAGNOSTIC_STANDARD',
    'AXIOM_73_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'UI_SLOP_NESTED_CARD_BLOCKED',
    'UI_SLOP_EXCESSIVE_BADGES_BLOCKED',
    'UI_SLOP_EYEBROW_CLUTTER_BLOCKED',
    'UI_SLOP_VERBOSE_PROSE_BLOCKED',
    'UI_SLOP_PURPLE_GLOW_CLICHE_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
