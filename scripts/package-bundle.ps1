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

$bundleDir = Join-Path $repoRoot "bundle"
$adapterDir = Join-Path $repoRoot "orbitstack-codex"
$installScript = Join-Path $repoRoot "scripts\install-to-harness.ps1"
$installShell = Join-Path $repoRoot "scripts\install-to-harness.sh"
$auditDoc = Join-Path $repoRoot "docs\pstack-openspec-routing-audit.md"
$readme = Join-Path $repoRoot "README.md"
$onboarding = Join-Path $repoRoot "AGENT_ONBOARDING.md"
$openSpecRoot = Join-Path $repoRoot "openspec"
$manifest = Get-Content -LiteralPath (Join-Path $repoRoot "bundle\orbitstack-ps-openspec\manifest.json") -Raw | ConvertFrom-Json
$releaseVersion = $manifest.releaseVersion
$stageDir = Join-Path $OutDir (".orbitstack-stage-" + [guid]::NewGuid().ToString("N"))

if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$zipPath = Join-Path $OutDir "Ps-openspec-$releaseVersion.zip"
if (Test-Path -LiteralPath $zipPath) { throw "Versioned package already exists; bump the bundle release version before rebuilding: $zipPath" }
try {
    New-Item -ItemType Directory -Path $stageDir -Force | Out-Null
    Copy-Item -LiteralPath $bundleDir -Destination $stageDir -Recurse
    Copy-Item -LiteralPath $adapterDir -Destination $stageDir -Recurse
    Copy-Item -LiteralPath $readme -Destination (Join-Path $stageDir "README.md")
    Copy-Item -LiteralPath $onboarding -Destination (Join-Path $stageDir "AGENT_ONBOARDING.md")
    New-Item -ItemType Directory -Path (Join-Path $stageDir "scripts") -Force | Out-Null
    Copy-Item -LiteralPath $installScript -Destination (Join-Path $stageDir "scripts\install-to-harness.ps1")
    Copy-Item -LiteralPath $installShell -Destination (Join-Path $stageDir "scripts\install-to-harness.sh")
    New-Item -ItemType Directory -Path (Join-Path $stageDir "docs") -Force | Out-Null
    Copy-Item -LiteralPath $auditDoc -Destination (Join-Path $stageDir "docs\pstack-openspec-routing-audit.md")
    New-Item -ItemType Directory -Path (Join-Path $stageDir "openspec") -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path $openSpecRoot "config.yaml") -Destination (Join-Path $stageDir "openspec\config.yaml")
    Copy-Item -LiteralPath (Join-Path $openSpecRoot "specs") -Destination (Join-Path $stageDir "openspec") -Recurse
    if (Test-Path -LiteralPath (Join-Path $openSpecRoot "changes\archive")) {
        Copy-Item -LiteralPath (Join-Path $openSpecRoot "changes\archive") -Destination (Join-Path $stageDir "openspec\changes") -Recurse
    }
    Compress-Archive -Path (Join-Path $stageDir "*") -DestinationPath $zipPath
    Write-Host "[OK] Packaged full PStack + OpenSpec bundle into: $zipPath" -ForegroundColor Green
} finally {
    if (Test-Path -LiteralPath $stageDir) { Remove-Item -LiteralPath $stageDir -Recurse -Force }
}
