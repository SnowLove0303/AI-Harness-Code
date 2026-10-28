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

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
$installer = Join-Path $repoRoot "scripts\install-to-harness.ps1"
if (!(Test-Path -LiteralPath $installer)) {
    throw "The complete Ps-openspec distribution installer is missing: $installer"
}
& $installer -TargetDir $TargetDir -SkillLocation $SkillLocation -Force:$Force
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
