#Requires -Version 5.1
[CmdletBinding()]
param (
    [string]$OutDir = "",

    [Parameter(Mandatory = $false)]
    [ValidateSet("codex", "gemini", "all")]
    [string]$TargetHarness = "gemini",

    [Parameter(Mandatory = $false)]
    [switch]$Force
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
$codexAdapterDir = Join-Path $repoRoot "orbitstack-codex"
$geminiAdapterDir = Join-Path $repoRoot "orbitstack-gemini"
$installScript = Join-Path $repoRoot "scripts\install-to-harness.ps1"
$installShell = Join-Path $repoRoot "scripts\install-to-harness.sh"
$auditDoc = Join-Path $repoRoot "docs\pstack-openspec-routing-audit.md"
$routeMap = Join-Path $repoRoot "docs\pstack-openspec-route-map.json"
$routeEvaluation = Join-Path $repoRoot "docs\pstack-openspec-route-evaluation.md"
$systemReference = Join-Path $repoRoot "docs\ps-openspec-system.md"
$geminiSystemReference = Join-Path $repoRoot "docs\ps-openspec-gemini-system.md"
$readme = Join-Path $repoRoot "docs\ps-openspec-package-readme.md"
$onboarding = Join-Path $repoRoot "AGENT_ONBOARDING.md"
$openSpecRoot = Join-Path $repoRoot "openspec"
$manifest = [IO.File]::ReadAllText((Join-Path $repoRoot "bundle\orbitstack-ps-openspec\manifest.json"), [Text.Encoding]::UTF8) | ConvertFrom-Json
$releaseVersion = $manifest.releaseVersion

if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

function Build-PackageArchive {
    param (
        [string]$HarnessName,
        [string]$ZipFileName
    )

    $targetZip = Join-Path $OutDir $ZipFileName
    if (Test-Path -LiteralPath $targetZip) {
        if (!$Force) {
            throw "Versioned package already exists; pass -Force to overwrite or bump version: $targetZip"
        }
        Remove-Item -LiteralPath $targetZip -Force
    }

    $stageDir = Join-Path $OutDir (".orbitstack-stage-" + [guid]::NewGuid().ToString("N"))
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

        if ($HarnessName -eq 'gemini') {
            Copy-Item -LiteralPath $geminiAdapterDir -Destination $stageDir -Recurse
        } elseif ($HarnessName -eq 'codex') {
            Copy-Item -LiteralPath $codexAdapterDir -Destination $stageDir -Recurse
        } else {
            Copy-Item -LiteralPath $codexAdapterDir -Destination $stageDir -Recurse
            Copy-Item -LiteralPath $geminiAdapterDir -Destination $stageDir -Recurse
        }

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
        if (Test-Path -LiteralPath $geminiSystemReference) {
            Copy-Item -LiteralPath $geminiSystemReference -Destination (Join-Path $stageDir "docs\ps-openspec-gemini-system.md")
        }

        New-Item -ItemType Directory -Path (Join-Path $stageDir "openspec") -Force | Out-Null
        Copy-Item -LiteralPath (Join-Path $openSpecRoot "config.yaml") -Destination (Join-Path $stageDir "openspec\config.yaml")
        Copy-Item -LiteralPath (Join-Path $openSpecRoot "specs") -Destination (Join-Path $stageDir "openspec") -Recurse
        if (Test-Path -LiteralPath (Join-Path $openSpecRoot "changes\archive")) {
            Copy-Item -LiteralPath (Join-Path $openSpecRoot "changes\archive") -Destination (Join-Path $stageDir "openspec\changes") -Recurse
        }

        Compress-Archive -Path (Join-Path $stageDir "*") -DestinationPath $targetZip
        Write-Host "[OK] Packaged Ps-openspec ($HarnessName) bundle into: $targetZip" -ForegroundColor Green
    } finally {
        if (Test-Path -LiteralPath $stageDir) { Remove-Item -LiteralPath $stageDir -Recurse -Force }
    }
}

if ($TargetHarness -eq 'gemini') {
    Build-PackageArchive -HarnessName "gemini" -ZipFileName "Ps-openspec-$releaseVersion-Gemini.zip"
} elseif ($TargetHarness -eq 'codex') {
    Build-PackageArchive -HarnessName "codex" -ZipFileName "Ps-openspec-$releaseVersion.zip"
} else {
    Build-PackageArchive -HarnessName "gemini" -ZipFileName "Ps-openspec-$releaseVersion-Gemini.zip"
    Build-PackageArchive -HarnessName "codex" -ZipFileName "Ps-openspec-$releaseVersion.zip"
}

if ($TargetHarness -eq 'gemini' -or $TargetHarness -eq 'all') {
    $syncScript = Join-Path $scriptDir "sync-to-global.ps1"
    if (Test-Path -LiteralPath $syncScript) {
        Write-Host "Triggering automated global Gemini synchronization from package-bundle..." -ForegroundColor Cyan
        & $syncScript
    }
}
