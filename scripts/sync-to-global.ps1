#Requires -Version 5.1
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mjsScript = Join-Path $scriptDir "sync-to-global.mjs"

if (!(Test-Path -LiteralPath $mjsScript)) {
    throw "sync-to-global.mjs not found at $mjsScript"
}

Write-Host "Running OrbitStack Global Gemini Synchronization..." -ForegroundColor Cyan
& node $mjsScript
if ($LASTEXITCODE -ne 0) {
    throw "Global sync failed with exit code $LASTEXITCODE"
}
Write-Host "Global Gemini Synchronization PASS." -ForegroundColor Green
