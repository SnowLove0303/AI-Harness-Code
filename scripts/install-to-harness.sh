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
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"
if command -v cygpath >/dev/null 2>&1; then
  TARGET_NATIVE_PATH="$(cygpath -aw "$TARGET_DIR")"
else
  TARGET_NATIVE_PATH="$(realpath "$TARGET_DIR")"
fi

case "$SKILL_LOCATION" in
  agents) SKILL_DIRS=("$TARGET_DIR/.agents/skills"); OPEN_SPEC_TOOLS="codex" ;;
  gemini) SKILL_DIRS=("$TARGET_DIR/.gemini/skills"); OPEN_SPEC_TOOLS="gemini" ;;
  claude) SKILL_DIRS=("$TARGET_DIR/.claude/skills"); OPEN_SPEC_TOOLS="claude" ;;
  cursor) SKILL_DIRS=("$TARGET_DIR/.cursor/skills"); OPEN_SPEC_TOOLS="cursor" ;;
  all) SKILL_DIRS=("$TARGET_DIR/.agents/skills" "$TARGET_DIR/.gemini/skills" "$TARGET_DIR/.claude/skills" "$TARGET_DIR/.cursor/skills"); OPEN_SPEC_TOOLS="codex,gemini,claude,cursor" ;;
  *) echo "Invalid SkillLocation: $SKILL_LOCATION" >&2; exit 1 ;;
esac

if ! command -v openspec >/dev/null 2>&1; then
  echo "OpenSpec CLI is required. Install it with: npm install -g @fission-ai/openspec" >&2
  exit 1
fi
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20.19 or newer is required by OpenSpec." >&2
  exit 1
fi
if ! node -e 'const [a,b,c]=process.versions.node.split(".").map(Number); if (a<20 || (a===20 && b<19)) process.exit(1)'; then
  echo "Node.js 20.19 or newer is required by OpenSpec." >&2
  exit 1
fi
RELEASE_VERSION="$(node -e 'const fs=require("fs");console.log(JSON.parse(fs.readFileSync(process.argv[1],"utf8")).releaseVersion)' "$REPO_ROOT/bundle/orbitstack-ps-openspec/manifest.json")"
OPEN_SPEC_VERSION="$(openspec --version)"
if ! node -e 'const m=process.argv[1].match(/\d+\.\d+\.\d+/); if (!m) process.exit(1); const [a,b,c]=m[0].split(".").map(Number); if (a<1 || (a===1 && b<13) || (a===1 && b===13 && c<1)) process.exit(1)' "$OPEN_SPEC_VERSION"; then
  echo "OpenSpec 1.13.1 or newer is required. Found: $OPEN_SPEC_VERSION" >&2
  exit 1
fi

OPEN_SPEC_ROOT_VALID=0
if OPEN_SPEC_CONTEXT="$(cd "$TARGET_DIR" && openspec context --json 2>/dev/null)"; then
  if ! printf '%s' "$OPEN_SPEC_CONTEXT" | node -e 'const fs=require("fs");const path=require("path");const canon=p=>process.platform==="win32"?path.win32.normalize(p).replace(/\\+$/g,"").toLowerCase():path.resolve(p);const target=canon(process.argv[1]);const context=JSON.parse(fs.readFileSync(0,"utf8"));if(!context.root||canon(context.root.path)!==target)process.exit(1)' "$TARGET_NATIVE_PATH"; then
    echo "TargetDir must be the OpenSpec root; refusing to create a second root: $TARGET_DIR" >&2
    exit 1
  fi
  OPEN_SPEC_ROOT_VALID=1
elif [[ -f "$TARGET_DIR/openspec/config.yaml" ]]; then
  echo "OpenSpec configuration exists but context failed; repair that root before installing PStack." >&2
  exit 1
fi

NEEDS_OPEN_SPEC_SETUP=0
if [[ "$OPEN_SPEC_ROOT_VALID" != "1" ]]; then NEEDS_OPEN_SPEC_SETUP=1; fi
for SKILL_DIR in "${SKILL_DIRS[@]}"; do
  if ! find "$SKILL_DIR" -maxdepth 1 -type d -name 'openspec-*' -print -quit 2>/dev/null | grep -q .; then
    NEEDS_OPEN_SPEC_SETUP=1
  fi
done
if [[ "$NEEDS_OPEN_SPEC_SETUP" == "1" ]]; then
  if ! openspec init --tools "$OPEN_SPEC_TOOLS" "$TARGET_DIR"; then
    echo "OpenSpec initialization failed." >&2
    exit 1
  fi
fi

if ! OPEN_SPEC_CONTEXT="$(cd "$TARGET_DIR" && openspec context --json)"; then
  echo "OpenSpec context failed after setup." >&2
  exit 1
fi
if ! printf '%s' "$OPEN_SPEC_CONTEXT" | node -e 'const fs=require("fs");const path=require("path");const canon=p=>process.platform==="win32"?path.win32.normalize(p).replace(/\\+$/g,"").toLowerCase():path.resolve(p);const target=canon(process.argv[1]);const context=JSON.parse(fs.readFileSync(0,"utf8"));if(!context.root||canon(context.root.path)!==target)process.exit(1)' "$TARGET_NATIVE_PATH"; then
  echo "OpenSpec root verification failed for: $TARGET_DIR" >&2
  exit 1
fi
for SKILL_DIR in "${SKILL_DIRS[@]}"; do
  if ! find "$SKILL_DIR" -maxdepth 1 -type d -name 'openspec-*' -print -quit 2>/dev/null | grep -q .; then
    echo "OpenSpec skills were not installed under $SKILL_DIR." >&2
    exit 1
  fi
done

PSTACK_SOURCE="$REPO_ROOT/bundle/pstack-upstream"
ADAPTER_SOURCE="$REPO_ROOT/orbitstack-codex"
ROUTE_MAP_SOURCE="$REPO_ROOT/docs/pstack-openspec-route-map.json"
HANDOFF_SOURCE="$SCRIPT_DIR/pstack-handoff.mjs"
PROTECTED_AUDIT_SOURCE="$SCRIPT_DIR/audit-protected-invariants.mjs"
ROUTE_AUDIT_SOURCE="$SCRIPT_DIR/audit-pstack-openspec-routing.ps1"
PSTACK_TARGET="$TARGET_DIR/.orbitstack/pstack-upstream"
ROUTE_MAP_TARGET="$TARGET_DIR/.orbitstack/pstack-openspec-route-map.json"
HELPER_SCRIPTS_TARGET="$TARGET_DIR/.orbitstack/scripts"
if [[ ! -d "$PSTACK_SOURCE" ]]; then
  echo "Complete PStack source is missing: $PSTACK_SOURCE" >&2
  exit 1
fi
tree_matches() {
  local source="$1" target="$2"
  [[ -d "$target" ]] && diff -qr "$source" "$target" >/dev/null
}
if [[ -e "$PSTACK_TARGET" ]]; then
  if tree_matches "$PSTACK_SOURCE" "$PSTACK_TARGET"; then
    echo "[Skip] PStack mirror already matches the pinned source."
  else
    if [[ "$FORCE" != "--force" ]]; then
      echo "PStack target differs from the pinned source. Pass --force to back it up and replace: $PSTACK_TARGET" >&2
      exit 1
    fi
    mv "$PSTACK_TARGET" "$PSTACK_TARGET.bak-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$(dirname "$PSTACK_TARGET")"
    cp -a "$PSTACK_SOURCE" "$PSTACK_TARGET"
  fi
else
  mkdir -p "$(dirname "$PSTACK_TARGET")"
  cp -a "$PSTACK_SOURCE" "$PSTACK_TARGET"
fi
cp -f "$ROUTE_MAP_SOURCE" "$ROUTE_MAP_TARGET"
mkdir -p "$HELPER_SCRIPTS_TARGET"
cp -f "$HANDOFF_SOURCE" "$HELPER_SCRIPTS_TARGET/pstack-handoff.mjs"
cp -f "$PROTECTED_AUDIT_SOURCE" "$HELPER_SCRIPTS_TARGET/audit-protected-invariants.mjs"
cp -f "$ROUTE_AUDIT_SOURCE" "$HELPER_SCRIPTS_TARGET/audit-pstack-openspec-routing.ps1"

MARKER="<!-- OrbitStack PStack + OpenSpec adapter -->"
for SKILL_DIR in "${SKILL_DIRS[@]}"; do
  ADAPTER_TARGET="$SKILL_DIR/orbitstack-pstack-openspec"
  if [[ -e "$ADAPTER_TARGET" ]]; then
    if tree_matches "$ADAPTER_SOURCE" "$ADAPTER_TARGET"; then
      echo "[Skip] Adapter already matches the release under $SKILL_DIR."
      continue
    else
      if [[ "$FORCE" != "--force" ]]; then
        echo "Adapter skill differs from this release. Pass --force to back it up and replace: $ADAPTER_TARGET" >&2
        exit 1
      fi
      mv "$ADAPTER_TARGET" "$ADAPTER_TARGET.bak-$(date +%Y%m%d-%H%M%S)"
    fi
  fi
  mkdir -p "$SKILL_DIR"
  cp -a "$ADAPTER_SOURCE" "$ADAPTER_TARGET"
done

AGENTS_FILE="$TARGET_DIR/AGENTS.md"
POINTER="\n$MARKER\nFor all tasks in this project, use the OrbitStack adapter at .agents/skills/orbitstack-pstack-openspec/SKILL.md (or the selected harness skill directory). The complete unmodified upstream PStack tree is at .orbitstack/pstack-upstream/; its single route registry is .orbitstack/pstack-openspec-route-map.json. Preserve this project's existing rules, architecture facts, build commands, and domain pipelines.\n<!-- /OrbitStack PStack + OpenSpec adapter -->\n"
if [[ -f "$AGENTS_FILE" ]]; then
  if ! grep -Fq "$MARKER" "$AGENTS_FILE"; then printf '%b' "$POINTER" >> "$AGENTS_FILE"; fi
else
  cp "$REPO_ROOT/bundle/orbitstack-ps-openspec/Agent.md" "$AGENTS_FILE"
  printf '%b' "$POINTER" >> "$AGENTS_FILE"
fi

echo "Ps-openspec $RELEASE_VERSION installed. Existing project instructions were preserved."
