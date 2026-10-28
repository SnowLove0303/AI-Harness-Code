#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-.}"
SKILL_LOC="${2:-agents}"

echo "=========================================================="
echo "   OrbitStack (ps-openspec) Universal Harness Installer   "
echo "=========================================================="
echo "Target Directory: $TARGET_DIR"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUNDLE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

mkdir -p "$TARGET_DIR"

# 1. 备份并部署 Agent.md 与 AGENTS.md
SOURCE_AGENT="$BUNDLE_ROOT/Agent.md"
TARGET_AGENT="$TARGET_DIR/Agent.md"
TARGET_AGENTS_UPPER="$TARGET_DIR/AGENTS.md"

if [ -f "$TARGET_AGENT" ]; then
    BAK="$TARGET_AGENT.bak-$(date +%Y%m%d-%H%M%S)"
    cp "$TARGET_AGENT" "$BAK"
    echo "[Backup] Existing Agent.md backed up to $BAK"
fi

cp "$SOURCE_AGENT" "$TARGET_AGENT"
cp "$SOURCE_AGENT" "$TARGET_AGENTS_UPPER"
echo "[OK] Deployed Agent.md & AGENTS.md to $TARGET_DIR"

# 2. 部署技能目录
case "$SKILL_LOC" in
    agents)
        DEST_SKILLS="$TARGET_DIR/.agents/skills"
        ;;
    gemini)
        DEST_SKILLS="$TARGET_DIR/.gemini/skills"
        ;;
    claude)
        DEST_SKILLS="$TARGET_DIR/.claude/skills"
        ;;
    *)
        DEST_SKILLS="$TARGET_DIR/.agents/skills"
        ;;
esac

mkdir -p "$DEST_SKILLS"
cp -r "$BUNDLE_ROOT/skills/"* "$DEST_SKILLS/"
echo "[OK] Deployed OrbitStack skills to $DEST_SKILLS"

echo "=========================================================="
echo "   OrbitStack (ps-openspec) installed successfully!       "
echo "=========================================================="
