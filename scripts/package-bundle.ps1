#Requires -Version 5.1
[CmdletBinding()]
param (
    [string]$OutDir = ""
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir

if ([string]::IsNullOrWhiteSpace($OutDir)) {
    $OutDir = Join-Path $repoRoot "dist"
}

$bundleDir = Join-Path $repoRoot "bundle\orbitstack-ps-openspec"

if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$zipPath = Join-Path $OutDir "orbitstack-ps-openspec-bundle.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$bundleDir\*" -DestinationPath $zipPath -Force
Write-Host "[OK] Packaged bundle into: $zipPath" -ForegroundColor Green
