#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-$(pwd)}"
SKILL_LOCATION="agents"
FORCE=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --skills)
      SKILL_LOCATION="$2"
      shift 2
      ;;
    --force)
      FORCE="--force"
      shift
      ;;
    *)
      if [[ "$1" != "$TARGET_DIR" ]]; then
        TARGET_DIR="$1"
      fi
      shift
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RELEASE_VERSION="$(node -p 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).releaseVersion' "$REPO_ROOT/bundle/orbitstack-ps-openspec/manifest.json")"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"
TARGET_NATIVE_PATH="$TARGET_DIR"
if command -v cygpath >/dev/null 2>&1; then
  TARGET_NATIVE_PATH="$(cygpath -w "$TARGET_DIR")"
fi

SKILL_DIRS=()
case "$SKILL_LOCATION" in
  agents) SKILL_DIRS=("$TARGET_DIR/.agents/skills") ;;
  gemini) SKILL_DIRS=("$TARGET_DIR/.gemini/skills") ;;
  claude) SKILL_DIRS=("$TARGET_DIR/.claude/skills") ;;
  cursor) SKILL_DIRS=("$TARGET_DIR/.cursor/skills") ;;
  all) SKILL_DIRS=("$TARGET_DIR/.agents/skills" "$TARGET_DIR/.gemini/skills" "$TARGET_DIR/.claude/skills" "$TARGET_DIR/.cursor/skills") ;;
  *)
    echo "Unknown skill location: $SKILL_LOCATION" >&2
    exit 1
    ;;
esac

OPENSPEC_TOOLS="codex"
case "$SKILL_LOCATION" in
  agents) OPENSPEC_TOOLS="codex" ;;
  gemini) OPENSPEC_TOOLS="gemini" ;;
  claude) OPENSPEC_TOOLS="claude" ;;
  cursor) OPENSPEC_TOOLS="cursor" ;;
  all) OPENSPEC_TOOLS="codex,gemini,claude,cursor" ;;
esac

command -v openspec >/dev/null 2>&1 || { echo "OpenSpec CLI is required." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js 20.19 or newer is required." >&2; exit 1; }
NODE_VERSION="$(node -v | sed 's/^v//')"
node -e 'const [major,minor]=process.argv[1].split(".").map(Number);if(major<20||(major===20&&minor<19))process.exit(1)' "$NODE_VERSION" || {
  echo "Node.js 20.19 or newer is required. Found $NODE_VERSION" >&2
  exit 1
}
OPENSPEC_VERSION="$(openspec --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -n1)"
node -e 'const [major,minor,patch]=process.argv[1].split(".").map(Number);if(major<1||(major===1&&minor<13)||(major===1&&minor===13&&patch<1))process.exit(1)' "$OPENSPEC_VERSION" || {
  echo "OpenSpec 1.13.1 or newer is required. Found $OPENSPEC_VERSION" >&2
  exit 1
}

OPEN_SPEC_CONTEXT="$(cd "$TARGET_DIR" && openspec context --json 2>/dev/null || true)"
NEEDS_SETUP=0
if [[ -z "$OPEN_SPEC_CONTEXT" ]]; then
  NEEDS_SETUP=1
else
  if ! printf '%s' "$OPEN_SPEC_CONTEXT" | node -e 'const fs=require("fs");const path=require("path");const canon=p=>process.platform==="win32"?path.win32.normalize(p).replace(/\\+$/g,"").toLowerCase():path.resolve(p);const target=canon(process.argv[1]);const context=JSON.parse(fs.readFileSync(0,"utf8"));if(!context.root||canon(context.root.path)!==target)process.exit(1)' "$TARGET_NATIVE_PATH"; then
    echo "TargetDir must be the OpenSpec root." >&2
    exit 1
  fi
fi

for SKILL_DIR in "${SKILL_DIRS[@]}"; do
  if ! find "$SKILL_DIR" -maxdepth 1 -type d -name 'openspec-*' -print -quit 2>/dev/null | grep -q .; then
    NEEDS_SETUP=1
  fi
done

if [[ "$NEEDS_SETUP" -eq 1 ]]; then
  if ! openspec init --tools "$OPENSPEC_TOOLS" "$TARGET_DIR"; then
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
  if [[ "$SKILL_DIR" == *".gemini/skills"* ]]; then
    CURRENT_ADAPTER_SOURCE="$REPO_ROOT/orbitstack-gemini"
  else
    CURRENT_ADAPTER_SOURCE="$REPO_ROOT/orbitstack-codex"
  fi
  ADAPTER_TARGET="$SKILL_DIR/orbitstack-pstack-openspec"
  if [[ -e "$ADAPTER_TARGET" ]]; then
    if tree_matches "$CURRENT_ADAPTER_SOURCE" "$ADAPTER_TARGET"; then
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
  cp -a "$CURRENT_ADAPTER_SOURCE" "$ADAPTER_TARGET"
done

RULES_FILE="$TARGET_DIR/AGENTS.md"
TARGET_SKILL_REL=".agents/skills/orbitstack-pstack-openspec/SKILL.md"
if [[ -f "$TARGET_DIR/GEMINI.md" ]]; then
  RULES_FILE="$TARGET_DIR/GEMINI.md"
elif [[ -f "$TARGET_DIR/AGENTS.md" ]]; then
  RULES_FILE="$TARGET_DIR/AGENTS.md"
elif [[ "$SKILL_LOCATION" == "gemini" ]]; then
  RULES_FILE="$TARGET_DIR/GEMINI.md"
fi

if [[ "$SKILL_LOCATION" == "gemini" ]]; then
  TARGET_SKILL_REL=".gemini/skills/orbitstack-pstack-openspec/SKILL.md"
fi

POINTER="

$MARKER
For all tasks in this project, use the OrbitStack adapter at \`$TARGET_SKILL_REL\` (or the selected harness skill directory). The complete unmodified upstream PStack tree is at \`.orbitstack/pstack-upstream/\`; its single route registry is \`.orbitstack/pstack-openspec-route-map.json\`. Preserve this project's existing rules, architecture facts, build commands, and domain pipelines.
<!-- /OrbitStack PStack + OpenSpec adapter -->"

if [[ -f "$RULES_FILE" ]]; then
  if ! grep -qF "$MARKER" "$RULES_FILE"; then
    printf '%s\n' "$POINTER" >> "$RULES_FILE"
  fi
else
  cp "$REPO_ROOT/bundle/orbitstack-ps-openspec/Agent.md" "$RULES_FILE"
  printf '%s\n' "$POINTER" >> "$RULES_FILE"
fi

echo "Ps-openspec $RELEASE_VERSION installed. Existing project instructions were preserved."
