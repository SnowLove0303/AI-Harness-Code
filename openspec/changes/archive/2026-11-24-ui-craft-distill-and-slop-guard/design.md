# Technical Design: UI Craft Elevation, Distill Purification & `guard:ui-slop` (Axiom 73)

## 1. Synthesis of Top Open-Source UI Systems
- **`pbakaus/impeccable` (115k+ ⭐)**:
  - **`distill` Protocol**: Strip everything that does not earn its place—redundant labels, repeated information, decorative borders, and eyebrow kickers.
  - **`craft-floor` Standards**: Browser surface polish (`tabular-nums`, selection tint, custom scrollbar, focus rings), directional shadows, type measure (65–75ch), and strict bans on nested cards, identical icon+heading+text card grids, and gradient text.
  - **Three-Mode Calibration**: `operate` (high-density workspace), `read` (editorial rhythm), `persuade` (intentional visual hierarchy).
- **`nextlevelbuilder/ui-ux-pro-max-skill` (153k+ ⭐)**:
  - Intentional aesthetic world-building (palette pairing, typography pairing, surface hierarchy) before writing markup.
- **`vercel-labs/agent-skills` (`web-design-guidelines`, 34k+ ⭐)**:
  - Actionable `file:line` audit diagnostics with concrete remediation hints.

## 2. Deterministic L2 Guard (`scripts/check-ui-slop.mjs`)
Exports `checkUiContent(content, filePath, options)` and `scanUiDirectory(targetDir, options)`:
1. **`UI_SLOP_NESTED_CARD_BLOCKED`**: Detects nested card containers (e.g., `<Card>...<Card>` or nested `rounded-* border` card wrappers inside another card).
2. **`UI_SLOP_EXCESSIVE_BADGES_BLOCKED`**: Counts badge/tag/chip elements (`<Badge`, `class="...badge..."`, `rounded-full ... text-xs`) per component file; blocks when exceeding mode budget (default `maxBadges: 3` for `operate`, `2` for `read`, `4` for `persuade`).
3. **`UI_SLOP_EYEBROW_CLUTTER_BLOCKED`**: Detects eyebrow/kicker label patterns (`eyebrow`, `kicker`, `uppercase tracking-widest text-xs` immediately preceding headings).
4. **`UI_SLOP_VERBOSE_PROSE_BLOCKED`**: Detects overly verbose static explanatory paragraphs inside operational components (e.g., `<p>` blocks exceeding 160 characters or boilerplate `"用于对...进行..."` / `"Manage and configure your..."` fillers inside cards).
5. **`UI_SLOP_PURPLE_GLOW_CLICHE_BLOCKED`**: Detects default AI-slop dark-purple neon gradient combinations (`from-purple-.*to-indigo` / `from-violet-.*to-fuchsia` / `shadow-purple-500/50`).

When executed via CLI (`npm run guard:ui-slop`) in a repository with no frontend files yet, reports `[PASS] 0 frontend files violated` cleanly with Exit Code 0; when run against frontend projects (or test fixtures), enforces all 5 deterministic gates.
