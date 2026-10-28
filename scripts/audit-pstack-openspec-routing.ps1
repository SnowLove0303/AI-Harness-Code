# Table-driven structural acceptance audit for the Codex PStack/OpenSpec adapter.
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$pstack = Join-Path $repoRoot 'bundle\pstack-upstream'
$adapter = Join-Path $repoRoot 'orbitstack-codex\SKILL.md'
$matrix = Join-Path $repoRoot 'docs\pstack-openspec-routing-audit.md'

$cases = @(
    @{ Name='investigation'; Label='Investigation'; Path='skills\poteto-mode\playbooks\investigation.md' },
    @{ Name='bug-fix'; Label='Bug fix'; Path='skills\poteto-mode\playbooks\bug-fix.md' },
    @{ Name='feature'; Label='Feature'; Path='skills\poteto-mode\playbooks\feature.md' },
    @{ Name='refactoring'; Label='Refactor'; Path='skills\poteto-mode\playbooks\refactoring.md' },
    @{ Name='performance'; Label='Performance'; Path='skills\poteto-mode\playbooks\perf-issue.md' },
    @{ Name='prototype'; Label='Prototype'; Path='skills\poteto-mode\playbooks\prototype.md' },
    @{ Name='large-migration'; Label='Large cross-cutting'; Path='skills\figure-it-out\SKILL.md' },
    @{ Name='standing-program'; Label='Standing multi-day'; Path='skills\poteto-mode\playbooks\orchestrate.md' },
    @{ Name='pr-follow-up'; Label='PR follow-up'; Path='skills\poteto-mode\playbooks\babysit.md' },
    @{ Name='skill-authoring'; Label='Skill authoring'; Path='skills\poteto-mode\playbooks\authoring-a-skill.md' },
    @{ Name='eval'; Label='Eval'; Path='skills\poteto-mode\playbooks\eval.md' }
)

$adapterText = Get-Content -LiteralPath $adapter -Raw
foreach ($case in $cases) {
    $playbook = Join-Path $pstack $case.Path
    if (!(Test-Path -LiteralPath $playbook)) { throw "Missing PStack route for $($case.Name): $playbook" }
    if ($adapterText -notmatch 'Step 0' -or $adapterText -notmatch 'dual checklist' -or $adapterText -notmatch 'openspec context') {
        throw 'Adapter is missing a mandatory OrbitStack gate or OpenSpec root resolution step.'
    }
    Write-Output "PASS $($case.Name) -> $($case.Path) -> OpenSpec mapping documented"
}

if (!(Test-Path -LiteralPath $matrix)) { throw "Missing audit matrix: $matrix" }
$auditText = Get-Content -LiteralPath $matrix -Raw
foreach ($case in $cases) {
    if ($auditText -notmatch [regex]::Escape($case.Label)) { throw "Audit matrix has no case for $($case.Label)" }
}
Write-Output "PASS $($cases.Count) route cases; upstream playbooks, mandatory gates, and OpenSpec mapping are present."
