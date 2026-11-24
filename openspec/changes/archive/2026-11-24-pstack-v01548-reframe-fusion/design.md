# Technical Design: Sync `pstack v0.15.48` & Fuse `/reframe` Protocol (Axiom 72)

## 1. Upstream Mirror Sync (`v0.15.36 -> v0.15.48`)
Sync target: `C:\Users\Administrator\.gemini\pstack-upstream\`
Key assets fetched/updated from `https://raw.githubusercontent.com/cursor/plugins/main/pstack/`:
- `plugin.json` (`0.15.48`)
- `skills/reframe/SKILL.md` (new skill)
- `skills/statechart/SKILL.md` and `skills/statechart/scripts/` (if updated for Windows `\r\n` TLC output)
- `skills/poteto-mode/SKILL.md` (check if `/reframe` is referenced)

## 2. Ambiguity Threshold Gate (`evaluateReframeTrigger`)
To avoid verbose terminology lectures on crisp engineering directives (e.g., exact file paths, stack traces, explicit formula specs), `/reframe` activates strictly when:
1. The user explicitly invokes `/reframe`, OR
2. The input exhibits ambiguity/colloquial abstraction without concrete technical anchors (no explicit file path/symbol/error code AND matches multi-interpretation/broad goal patterns).

## 3. Zero-Fabricated-Citation Rule (`UNVERIFIED_CITATION_BLOCKED`)
Per upstream `/reframe`: *"Open every link and confirm it uses the term that way. Cut any citation you can't confirm."*
In `scripts/check-pstack-sync.mjs` and Axiom 72, any citation validator checks that external citations are marked as verified or omitted.

## 4. Route Map Preservation (`routes.length === 23`)
`docs/pstack-openspec-route-map.json` maintains `routes` at exactly 23 entries to satisfy existing invariant assertions in `scripts/tests/gemini-adapter.test.mjs`, and adds `companionSkills` containing:
```json
{
  "id": "reframe",
  "source": "skills/reframe/SKILL.md",
  "openSpec": "Step 0 Gate 1 disambiguation & terminology reframing",
  "geminiCapability": "disambiguate vague operator prompts, teach impact-ranked terms, and rewrite requirements",
  "geminiModelTier": "pro"
}
```
