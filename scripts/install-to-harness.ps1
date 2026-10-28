#Requires -Version 5.1
[CmdletBinding()]
param (
    [Parameter(Mandatory = $false, Position = 0)]
    [string]$TargetDir = (Get-Location).Path,

    [Parameter(Mandatory = $false)]
    [ValidateSet("agents", "gemini", "claude", "cursor", "all")]
    [string]$SkillLocation = "agents",

    [Parameter(Mandatory = $false)]
    [switch]$Force
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
$releaseVersion = ([IO.File]::ReadAllText((Join-Path $repoRoot 'bundle\orbitstack-ps-openspec\manifest.json'), [Text.Encoding]::UTF8) | ConvertFrom-Json).releaseVersion
if (!(Test-Path -LiteralPath $TargetDir)) { throw "Target directory does not exist: $TargetDir" }
$TargetDir = (Resolve-Path -LiteralPath $TargetDir).Path

function Copy-ManagedFile {
    param([string]$Source,[string]$Destination,[bool]$AllowBackup)
    if (Test-Path -LiteralPath $Destination) {
        $sourceHash = (Get-FileHash -LiteralPath $Source -Algorithm SHA256).Hash
        $targetHash = (Get-FileHash -LiteralPath $Destination -Algorithm SHA256).Hash
        if ($sourceHash -eq $targetHash) { return }
        if (!$AllowBackup) { throw "Managed file differs from the Ps-openspec source. Use -Force to back it up and update: $Destination" }
        $backupPath = "$Destination.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Move-Item -LiteralPath $Destination -Destination $backupPath
        Write-Host "[Backup] Existing managed file moved to $backupPath" -ForegroundColor DarkGray
    }
    Copy-Item -LiteralPath $Source -Destination $Destination
}

function Test-ManagedTreeEqual {
    param([string]$Source,[string]$Destination)
    if (!(Test-Path -LiteralPath $Destination -PathType Container)) { return $false }
    $Source = Get-CanonicalExistingPath $Source
    $Destination = Get-CanonicalExistingPath $Destination
    $sourceFiles = @(Get-ChildItem -LiteralPath $Source -File -Recurse | ForEach-Object { $_.FullName.Substring($Source.Length).TrimStart('\') } | Sort-Object)
    $targetFiles = @(Get-ChildItem -LiteralPath $Destination -File -Recurse | ForEach-Object { $_.FullName.Substring($Destination.Length).TrimStart('\') } | Sort-Object)
    if (($sourceFiles -join "`n") -cne ($targetFiles -join "`n")) { return $false }
    foreach ($relativePath in $sourceFiles) {
        $sourceFile = Join-Path $Source $relativePath
        $targetFile = Join-Path $Destination $relativePath
        if ((Get-FileHash -LiteralPath $sourceFile -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $targetFile -Algorithm SHA256).Hash) { return $false }
    }
    return $true
}

if (-not ('PsOpenSpecPathCanonicalizer' -as [type])) {
    Add-Type -TypeDefinition @'
using System.Runtime.InteropServices;
using System.Text;
public static class PsOpenSpecPathCanonicalizer {
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern uint GetLongPathName(string shortPath, StringBuilder longPath, uint bufferLength);
}
'@
}
function Get-CanonicalExistingPath {
    param([string]$Path)
    $fullPath = [IO.Path]::GetFullPath($Path)
    $buffer = [Text.StringBuilder]::new(32768)
    $length = [PsOpenSpecPathCanonicalizer]::GetLongPathName($fullPath, $buffer, [uint32]$buffer.Capacity)
    if ($length -eq 0 -or $length -ge $buffer.Capacity) { throw "Cannot canonicalize existing path: $Path" }
    return $buffer.ToString().TrimEnd('\')
}

function Test-SamePath {
    param([string]$First,[string]$Second)
    return [string]::Equals((Get-CanonicalExistingPath $First),(Get-CanonicalExistingPath $Second),[StringComparison]::OrdinalIgnoreCase)
}
$skillTargets = switch ($SkillLocation) {
    "agents" { @((Join-Path $TargetDir ".agents\skills")) }
    "gemini" { @((Join-Path $TargetDir ".gemini\skills")) }
    "claude" { @((Join-Path $TargetDir ".claude\skills")) }
    "cursor" { @((Join-Path $TargetDir ".cursor\skills")) }
    "all" { @((Join-Path $TargetDir ".agents\skills"),(Join-Path $TargetDir ".gemini\skills"),(Join-Path $TargetDir ".claude\skills"),(Join-Path $TargetDir ".cursor\skills")) }
}

$openSpecTools = switch ($SkillLocation) {
    "agents" { "codex" }
    "gemini" { "gemini" }
    "claude" { "claude" }
    "cursor" { "cursor" }
    "all" { "codex,gemini,claude,cursor" }
}
$openSpecCommand = Get-Command openspec -ErrorAction SilentlyContinue
if (!$openSpecCommand) { throw "OpenSpec CLI is required. Install @fission-ai/openspec, then retry: npm install -g @fission-ai/openspec" }
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if (!$nodeCommand) { throw "Node.js 20.19 or newer is required by OpenSpec. Install Node.js, then retry." }
$nodeVersion = (& node --version).Trim().TrimStart('v')
try { $parsedNodeVersion = [version]$nodeVersion } catch { throw "Cannot parse Node.js version: $nodeVersion" }
if ($parsedNodeVersion -lt [version]'20.19.0') { throw "Node.js 20.19 or newer is required by OpenSpec. Found $nodeVersion." }
$openSpecVersionText = (& openspec --version).Trim()
$openSpecVersionMatch = [regex]::Match($openSpecVersionText, '\d+\.\d+\.\d+')
if (!$openSpecVersionMatch.Success) { throw "Cannot parse OpenSpec version: $openSpecVersionText" }
if ([version]$openSpecVersionMatch.Value -lt [version]'1.13.1') { throw "OpenSpec 1.13.1 or newer is required. Found $($openSpecVersionMatch.Value)." }

$contextJson = $null
Push-Location -LiteralPath $TargetDir
try {
    $contextOutput = & openspec context --json 2>$null
    $contextExitCode = $LASTEXITCODE
} finally { Pop-Location }
$hasLocalOpenSpecConfig = Test-Path -LiteralPath (Join-Path $TargetDir 'openspec\config.yaml')
if ($contextExitCode -eq 0) {
    try { $contextJson = ($contextOutput -join "`n") | ConvertFrom-Json } catch { throw "OpenSpec returned invalid context JSON for $TargetDir" }
    $resolvedOpenSpecRoot = [IO.Path]::GetFullPath($contextJson.root.path).TrimEnd('\')
    if (!(Test-SamePath $resolvedOpenSpecRoot $TargetDir)) {
        throw "TargetDir must be the OpenSpec root. Expected $resolvedOpenSpecRoot; received $TargetDir. Pass the project root to avoid creating a second OpenSpec root."
    }
} elseif ($hasLocalOpenSpecConfig) {
    throw "OpenSpec configuration exists in $TargetDir but context failed. Repair that root before installing PStack."
}

$needsOpenSpecSetup = $contextExitCode -ne 0
foreach ($skillsRoot in $skillTargets) {
    $openSpecSkillDirs = @(Get-ChildItem -LiteralPath $skillsRoot -Directory -Filter 'openspec-*' -ErrorAction SilentlyContinue)
    if ($openSpecSkillDirs.Count -eq 0) { $needsOpenSpecSetup = $true }
}
if ($needsOpenSpecSetup) {
    & openspec init --tools $openSpecTools $TargetDir
    if ($LASTEXITCODE -ne 0) { throw "OpenSpec initialization failed with exit code $LASTEXITCODE" }
}

Push-Location -LiteralPath $TargetDir
try {
    $contextOutput = & openspec context --json
    if ($LASTEXITCODE -ne 0) { throw 'OpenSpec context failed after initialization' }
    try { $contextJson = ($contextOutput -join "`n") | ConvertFrom-Json } catch { throw 'OpenSpec context returned invalid JSON after initialization' }
} finally { Pop-Location }
$resolvedOpenSpecRoot = [IO.Path]::GetFullPath($contextJson.root.path).TrimEnd('\')
if (!(Test-SamePath $resolvedOpenSpecRoot $TargetDir)) {
    throw "OpenSpec root mismatch after setup. Expected $TargetDir, got $($contextJson.root.path)"
}
foreach ($skillsRoot in $skillTargets) {
    $openSpecSkillDirs = @(Get-ChildItem -LiteralPath $skillsRoot -Directory -Filter 'openspec-*' -ErrorAction SilentlyContinue)
    if ($openSpecSkillDirs.Count -eq 0) { throw "OpenSpec skills were not installed under $skillsRoot" }
}

try {
$pstackSource = Join-Path $repoRoot "bundle\pstack-upstream"
$adapterSource = Join-Path $repoRoot "orbitstack-codex"
$routeMapSource = Join-Path $repoRoot "docs\pstack-openspec-route-map.json"
$handoffSource = Join-Path $scriptDir "pstack-handoff.mjs"
$protectedAuditSource = Join-Path $scriptDir "audit-protected-invariants.mjs"
$routeAuditSource = Join-Path $scriptDir "audit-pstack-openspec-routing.ps1"
$helperScriptsTarget = Join-Path $TargetDir ".orbitstack\scripts"
$routeMapTarget = Join-Path $TargetDir ".orbitstack\pstack-openspec-route-map.json"
$pstackTarget = Join-Path $TargetDir ".orbitstack\pstack-upstream"
if (!(Test-Path -LiteralPath $pstackSource)) { throw "Complete PStack source is missing: $pstackSource" }
if (Test-Path -LiteralPath $pstackTarget) {
    if (Test-ManagedTreeEqual -Source $pstackSource -Destination $pstackTarget) {
        Write-Host '[Skip] PStack mirror already matches the pinned source.' -ForegroundColor DarkGray
    } else {
        if (!$Force) { throw "PStack target differs from the pinned source. Use -Force to back it up and replace: $pstackTarget" }
        $backup = "$pstackTarget.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Move-Item -LiteralPath $pstackTarget -Destination $backup
        Write-Host "[Backup] Existing PStack mirror moved to $backup" -ForegroundColor DarkGray
        New-Item -ItemType Directory -Path (Split-Path -Parent $pstackTarget) -Force | Out-Null
        Copy-Item -LiteralPath $pstackSource -Destination $pstackTarget -Recurse
    }
} else {
    New-Item -ItemType Directory -Path (Split-Path -Parent $pstackTarget) -Force | Out-Null
    Copy-Item -LiteralPath $pstackSource -Destination $pstackTarget -Recurse
}
New-Item -ItemType Directory -Path $helperScriptsTarget -Force | Out-Null
Copy-ManagedFile -Source $routeMapSource -Destination $routeMapTarget -AllowBackup $Force
Copy-ManagedFile -Source $handoffSource -Destination (Join-Path $helperScriptsTarget "pstack-handoff.mjs") -AllowBackup $Force
Copy-ManagedFile -Source $protectedAuditSource -Destination (Join-Path $helperScriptsTarget "audit-protected-invariants.mjs") -AllowBackup $Force
Copy-ManagedFile -Source $routeAuditSource -Destination (Join-Path $helperScriptsTarget "audit-pstack-openspec-routing.ps1") -AllowBackup $Force

    foreach ($skillsRoot in $skillTargets) {
        $adapterTarget = Join-Path $skillsRoot "orbitstack-pstack-openspec"
        if (Test-Path -LiteralPath $adapterTarget) {
            if (Test-ManagedTreeEqual -Source $adapterSource -Destination $adapterTarget) {
                Write-Host "[Skip] Adapter already matches the release under $skillsRoot." -ForegroundColor DarkGray
                continue
            }
            if (!$Force) { throw "Adapter skill differs from this release. Use -Force to back it up and replace: $adapterTarget" }
            $adapterBackup = "$adapterTarget.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
            Move-Item -LiteralPath $adapterTarget -Destination $adapterBackup
            Write-Host "[Backup] Existing adapter skill moved to $adapterBackup" -ForegroundColor DarkGray
        }
        New-Item -ItemType Directory -Path $skillsRoot -Force | Out-Null
        Copy-Item -LiteralPath $adapterSource -Destination $adapterTarget -Recurse
    }

    $agentsFile = Join-Path $TargetDir "AGENTS.md"
    $marker = "<!-- OrbitStack PStack + OpenSpec adapter -->"
    $pointer = @"

$marker
For all tasks in this project, use the OrbitStack adapter at `.agents/skills/orbitstack-pstack-openspec/SKILL.md` (or the selected harness skill directory). The complete unmodified upstream PStack tree is at `.orbitstack/pstack-upstream/`; its single route registry is `.orbitstack/pstack-openspec-route-map.json`. Preserve this project's existing rules, architecture facts, build commands, and domain pipelines.
<!-- /OrbitStack PStack + OpenSpec adapter -->
"@
    if (Test-Path -LiteralPath $agentsFile) {
        $existing = Get-Content -LiteralPath $agentsFile -Raw
        if (!$existing.Contains($marker)) { Add-Content -LiteralPath $agentsFile -Value $pointer -Encoding utf8 }
    } else {
        $sourceAgent = Join-Path $repoRoot "bundle\orbitstack-ps-openspec\Agent.md"
        Copy-Item -LiteralPath $sourceAgent -Destination $agentsFile
        Add-Content -LiteralPath $agentsFile -Value $pointer -Encoding utf8
    }
    Write-Host "Ps-openspec $releaseVersion installed. Existing project instructions were preserved." -ForegroundColor Green
} catch {
    Write-Error $_
    exit 1
}
