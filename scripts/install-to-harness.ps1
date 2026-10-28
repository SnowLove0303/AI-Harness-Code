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
$installer = Join-Path $scriptDir "..\bundle\orbitstack-ps-openspec\scripts\install.ps1"

if (Test-Path $installer) {
    & $installer -TargetDir $TargetDir -SkillLocation $SkillLocation -Force:$Force
} else {
    Write-Error "Installer not found at $installer"
}
