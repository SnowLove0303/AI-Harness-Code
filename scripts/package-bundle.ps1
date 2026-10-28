#Requires -Version 5.1
[CmdletBinding()]
param (
    [string]$OutDir = ""
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($OutDir)) {
    $OutDir = Join-Path $repoRoot "dist"
}

$pstackBundle = Join-Path $repoRoot "bundle\pstack-upstream"
$pstackLock = Join-Path $repoRoot "bundle\pstack-upstream.lock.json"
$compatBundle = Join-Path $repoRoot "bundle\orbitstack-ps-openspec"
$adapterDir = Join-Path $repoRoot "orbitstack-codex"
$installScript = Join-Path $repoRoot "scripts\install-to-harness.ps1"
$installShell = Join-Path $repoRoot "scripts\install-to-harness.sh"
$auditDoc = Join-Path $repoRoot "docs\pstack-openspec-routing-audit.md"
$routeMap = Join-Path $repoRoot "docs\pstack-openspec-route-map.json"
$routeEvaluation = Join-Path $repoRoot "docs\pstack-openspec-route-evaluation.md"
$systemReference = Join-Path $repoRoot "docs\ps-openspec-system.md"
$readme = Join-Path $repoRoot "docs\ps-openspec-package-readme.md"
$onboarding = Join-Path $repoRoot "AGENT_ONBOARDING.md"
$openSpecRoot = Join-Path $repoRoot "openspec"
$manifest = [IO.File]::ReadAllText((Join-Path $repoRoot "bundle\orbitstack-ps-openspec\manifest.json"), [Text.Encoding]::UTF8) | ConvertFrom-Json
$releaseVersion = $manifest.releaseVersion
$stageDir = Join-Path $OutDir (".orbitstack-stage-" + [guid]::NewGuid().ToString("N"))

if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$zipPath = Join-Path $OutDir "Ps-openspec-$releaseVersion.zip"
if (Test-Path -LiteralPath $zipPath) { throw "Versioned package already exists; bump the bundle release version before rebuilding: $zipPath" }
try {
    New-Item -ItemType Directory -Path $stageDir -Force | Out-Null
    $stageBundle = Join-Path $stageDir "bundle"
    $stageCompat = Join-Path $stageBundle "orbitstack-ps-openspec"
    New-Item -ItemType Directory -Path $stageCompat -Force | Out-Null
    Copy-Item -LiteralPath $pstackBundle -Destination $stageBundle -Recurse
    Copy-Item -LiteralPath $pstackLock -Destination $stageBundle
    foreach ($name in 'Agent.md','AGENTS.md','AGENT_ONBOARDING.md','QUICKSTART.md','manifest.json') {
        Copy-Item -LiteralPath (Join-Path $compatBundle $name) -Destination (Join-Path $stageCompat $name)
    }
    New-Item -ItemType Directory -Path (Join-Path $stageCompat 'scripts') -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path $compatBundle 'scripts\install.ps1') -Destination (Join-Path $stageCompat 'scripts\install.ps1')
    Copy-Item -LiteralPath (Join-Path $compatBundle 'scripts\install.sh') -Destination (Join-Path $stageCompat 'scripts\install.sh')
    $stageSkill = Join-Path $stageCompat 'skills\pstack-openspec'
    New-Item -ItemType Directory -Path $stageSkill -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path $compatBundle 'skills\pstack-openspec\SKILL.md') -Destination (Join-Path $stageSkill 'SKILL.md')
    New-Item -ItemType Directory -Path (Join-Path $stageSkill 'references') -Force | Out-Null
    foreach ($name in 'a2a-lossless-handoff-protocol.md','anti-regression-charter.md') {
        Copy-Item -LiteralPath (Join-Path $compatBundle "skills\pstack-openspec\references\$name") -Destination (Join-Path $stageSkill "references\$name")
    }
    Copy-Item -LiteralPath $adapterDir -Destination $stageDir -Recurse
    Copy-Item -LiteralPath $readme -Destination (Join-Path $stageDir "README.md")
    Copy-Item -LiteralPath $onboarding -Destination (Join-Path $stageDir "AGENT_ONBOARDING.md")
    New-Item -ItemType Directory -Path (Join-Path $stageDir "scripts") -Force | Out-Null
    Copy-Item -LiteralPath $installScript -Destination (Join-Path $stageDir "scripts\install-to-harness.ps1")
    Copy-Item -LiteralPath $installShell -Destination (Join-Path $stageDir "scripts\install-to-harness.sh")
    Copy-Item -LiteralPath (Join-Path $repoRoot "scripts\pstack-handoff.mjs") -Destination (Join-Path $stageDir "scripts\pstack-handoff.mjs")
    Copy-Item -LiteralPath (Join-Path $repoRoot "scripts\audit-protected-invariants.mjs") -Destination (Join-Path $stageDir "scripts\audit-protected-invariants.mjs")
    Copy-Item -LiteralPath (Join-Path $repoRoot "scripts\audit-pstack-openspec-routing.ps1") -Destination (Join-Path $stageDir "scripts\audit-pstack-openspec-routing.ps1")
    New-Item -ItemType Directory -Path (Join-Path $stageDir "docs") -Force | Out-Null
    Copy-Item -LiteralPath $auditDoc -Destination (Join-Path $stageDir "docs\pstack-openspec-routing-audit.md")
    Copy-Item -LiteralPath $routeMap -Destination (Join-Path $stageDir "docs\pstack-openspec-route-map.json")
    Copy-Item -LiteralPath $routeEvaluation -Destination (Join-Path $stageDir "docs\pstack-openspec-route-evaluation.md")
    Copy-Item -LiteralPath $systemReference -Destination (Join-Path $stageDir "docs\ps-openspec-system.md")
    New-Item -ItemType Directory -Path (Join-Path $stageDir "openspec") -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path $openSpecRoot "config.yaml") -Destination (Join-Path $stageDir "openspec\config.yaml")
    Copy-Item -LiteralPath (Join-Path $openSpecRoot "specs") -Destination (Join-Path $stageDir "openspec") -Recurse
    if (Test-Path -LiteralPath (Join-Path $openSpecRoot "changes\archive")) {
        Copy-Item -LiteralPath (Join-Path $openSpecRoot "changes\archive") -Destination (Join-Path $stageDir "openspec\changes") -Recurse
    }
    Compress-Archive -Path (Join-Path $stageDir "*") -DestinationPath $zipPath
    Write-Host "[OK] Packaged PStack + OpenSpec V$($manifest.version) bundle into: $zipPath" -ForegroundColor Green
} finally {
    if (Test-Path -LiteralPath $stageDir) { Remove-Item -LiteralPath $stageDir -Recurse -Force }
}
