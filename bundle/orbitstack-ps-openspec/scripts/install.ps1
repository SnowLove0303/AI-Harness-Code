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

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   OrbitStack (ps-openspec) Universal Harness Installer   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Target Directory: $TargetDir" -ForegroundColor Yellow

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundleRoot = Split-Path -Parent $scriptRoot

if (!(Test-Path $TargetDir)) {
    Write-Host "Target directory does not exist. Creating: $TargetDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

# 1. 备份并部署 Agent.md 与 AGENTS.md
$sourceAgent = Join-Path $bundleRoot "Agent.md"
$targetAgent = Join-Path $TargetDir "Agent.md"
$targetAgentsUpper = Join-Path $TargetDir "AGENTS.md"

if (Test-Path $targetAgent) {
    $bak = "$targetAgent.bak-" + (Get-Date -Format "yyyyMMdd-HHmmss")
    Copy-Item -Path $targetAgent -Destination $bak -Force
    Write-Host "[Backup] Existing Agent.md backed up to $bak" -ForegroundColor DarkGray
}

Copy-Item -Path $sourceAgent -Destination $targetAgent -Force
Copy-Item -Path $sourceAgent -Destination $targetAgentsUpper -Force
Write-Host "[OK] Deployed Agent.md & AGENTS.md to $TargetDir" -ForegroundColor Green

# 2. 部署技能目录
$skillTargets = @()
switch ($SkillLocation) {
    "agents" { $skillTargets += (Join-Path $TargetDir ".agents\skills") }
    "gemini" { $skillTargets += (Join-Path $TargetDir ".gemini\skills") }
    "claude" { $skillTargets += (Join-Path $TargetDir ".claude\skills") }
    "cursor" { $skillTargets += (Join-Path $TargetDir ".cursor\skills") }
    "all" {
        $skillTargets += (Join-Path $TargetDir ".agents\skills")
        $skillTargets += (Join-Path $TargetDir ".gemini\skills")
        $skillTargets += (Join-Path $TargetDir ".claude\skills")
    }
}

$sourceSkills = Join-Path $bundleRoot "skills"
foreach ($dest in $skillTargets) {
    if (!(Test-Path $dest)) {
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
    }
    Copy-Item -Path "$sourceSkills\*" -Destination $dest -Recurse -Force
    Write-Host "[OK] Deployed OrbitStack skills to $dest" -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   OrbitStack (ps-openspec) installed successfully!       " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "You can now use ps-openspec in this Harness." -ForegroundColor White
