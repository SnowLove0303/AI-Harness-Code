#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALLER="$SCRIPT_DIR/../bundle/orbitstack-ps-openspec/scripts/install.sh"

if [ -f "$INSTALLER" ]; then
    bash "$INSTALLER" "$@"
else
    echo "Error: Installer not found at $INSTALLER" >&2
    exit 1
fi
