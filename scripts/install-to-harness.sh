#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET_DIR="${1:-$PWD}"
SKILL_LOCATION="${2:-agents}"
FORCE="${3:-}"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi

PSTACK_SOURCE="$REPO_ROOT/bundle/pstack-upstream"
ADAPTER_SOURCE="$REPO_ROOT/orbitstack-codex"
PSTACK_TARGET="$TARGET_DIR/.orbitstack/pstack-upstream"
if [[ ! -d "$PSTACK_SOURCE" ]]; then
  echo "Complete PStack source is missing: $PSTACK_SOURCE" >&2
  exit 1
fi
if [[ -e "$PSTACK_TARGET" ]]; then
  if [[ "$FORCE" != "--force" ]]; then
    echo "PStack target already exists. Pass --force to back it up and replace: $PSTACK_TARGET" >&2
    exit 1
  fi
  mv "$PSTACK_TARGET" "$PSTACK_TARGET.bak-$(date +%Y%m%d-%H%M%S)"
fi
mkdir -p "$(dirname "$PSTACK_TARGET")"
cp -a "$PSTACK_SOURCE" "$PSTACK_TARGET"

case "$SKILL_LOCATION" in
  agents) SKILL_DIRS=("$TARGET_DIR/.agents/skills") ;;
  gemini) SKILL_DIRS=("$TARGET_DIR/.gemini/skills") ;;
  claude) SKILL_DIRS=("$TARGET_DIR/.claude/skills") ;;
  cursor) SKILL_DIRS=("$TARGET_DIR/.cursor/skills") ;;
  all) SKILL_DIRS=("$TARGET_DIR/.agents/skills" "$TARGET_DIR/.gemini/skills" "$TARGET_DIR/.claude/skills" "$TARGET_DIR/.cursor/skills") ;;
  *) echo "Invalid SkillLocation: $SKILL_LOCATION" >&2; exit 1 ;;
esac

MARKER="<!-- OrbitStack PStack + OpenSpec adapter -->"
for SKILL_DIR in "${SKILL_DIRS[@]}"; do
  ADAPTER_TARGET="$SKILL_DIR/orbitstack-pstack-openspec"
  if [[ -e "$ADAPTER_TARGET" ]]; then
    if [[ "$FORCE" != "--force" ]]; then
      echo "Adapter skill already exists. Pass --force to back it up and replace: $ADAPTER_TARGET" >&2
      exit 1
    fi
    mv "$ADAPTER_TARGET" "$ADAPTER_TARGET.bak-$(date +%Y%m%d-%H%M%S)"
  fi
  mkdir -p "$SKILL_DIR"
  cp -a "$ADAPTER_SOURCE" "$ADAPTER_TARGET"
done

AGENTS_FILE="$TARGET_DIR/AGENTS.md"
POINTER="\n$MARKER\nFor all tasks in this project, use the OrbitStack adapter at .agents/skills/orbitstack-pstack-openspec/SKILL.md (or the selected harness skill directory). The complete unmodified upstream PStack tree is at .orbitstack/pstack-upstream/. Preserve this project's existing rules, architecture facts, build commands, and domain pipelines.\n<!-- /OrbitStack PStack + OpenSpec adapter -->\n"
if [[ -f "$AGENTS_FILE" ]]; then
  if ! grep -Fq "$MARKER" "$AGENTS_FILE"; then printf '%b' "$POINTER" >> "$AGENTS_FILE"; fi
else
  cp "$REPO_ROOT/bundle/orbitstack-ps-openspec/Agent.md" "$AGENTS_FILE"
  printf '%b' "$POINTER" >> "$AGENTS_FILE"
fi

echo "Ps-openspec V2.00 installed. Existing AGENTS.md content was preserved."
