#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
INSTALLER="$REPO_ROOT/scripts/install-to-harness.sh"
if [[ ! -f "$INSTALLER" ]]; then
  echo "The complete Ps-openspec distribution installer is missing: $INSTALLER" >&2
  exit 1
fi
exec bash "$INSTALLER" "$@"
