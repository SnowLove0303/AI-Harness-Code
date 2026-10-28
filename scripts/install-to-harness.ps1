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
if (!(Test-Path -LiteralPath $TargetDir)) { throw "Target directory does not exist: $TargetDir" }
try {
$pstackSource = Join-Path $repoRoot "bundle\pstack-upstream"
$adapterSource = Join-Path $repoRoot "orbitstack-codex"
$pstackTarget = Join-Path $TargetDir ".orbitstack\pstack-upstream"
if (!(Test-Path -LiteralPath $pstackSource)) { throw "Complete PStack source is missing: $pstackSource" }
if (Test-Path -LiteralPath $pstackTarget) {
    if (!$Force) { throw "PStack target already exists. Use -Force to back it up and replace: $pstackTarget" }
    $backup = "$pstackTarget.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Move-Item -LiteralPath $pstackTarget -Destination $backup
    Write-Host "[Backup] Existing PStack mirror moved to $backup" -ForegroundColor DarkGray
}
New-Item -ItemType Directory -Path (Split-Path -Parent $pstackTarget) -Force | Out-Null
Copy-Item -LiteralPath $pstackSource -Destination $pstackTarget -Recurse

    $skillTargets = switch ($SkillLocation) {
        "agents" { @((Join-Path $TargetDir ".agents\skills")) }
        "gemini" { @((Join-Path $TargetDir ".gemini\skills")) }
        "claude" { @((Join-Path $TargetDir ".claude\skills")) }
        "cursor" { @((Join-Path $TargetDir ".cursor\skills")) }
        "all" { @((Join-Path $TargetDir ".agents\skills"),(Join-Path $TargetDir ".gemini\skills"),(Join-Path $TargetDir ".claude\skills"),(Join-Path $TargetDir ".cursor\skills")) }
    }
    foreach ($skillsRoot in $skillTargets) {
        $adapterTarget = Join-Path $skillsRoot "orbitstack-pstack-openspec"
        if (Test-Path -LiteralPath $adapterTarget) {
            if (!$Force) { throw "Adapter skill already exists. Use -Force to back it up and replace: $adapterTarget" }
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
For all tasks in this project, use the OrbitStack adapter at `.agents/skills/orbitstack-pstack-openspec/SKILL.md` (or the selected harness skill directory). The complete unmodified upstream PStack tree is at `.orbitstack/pstack-upstream/`. Preserve this project's existing rules, architecture facts, build commands, and domain pipelines.
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
    Write-Host "Ps-openspec V2.00 installed. Existing AGENTS.md content was preserved." -ForegroundColor Green
} catch {
    Write-Error $_
    exit 1
}
