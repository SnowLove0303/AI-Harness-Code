#Requires -Version 5.1
[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$ProjectRoot = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = [IO.Path]::GetFullPath($ProjectRoot)

$sourceLayout = (Test-Path -LiteralPath (Join-Path $ProjectRoot 'bundle\pstack-upstream')) -and
                (Test-Path -LiteralPath (Join-Path $ProjectRoot 'orbitstack-codex\SKILL.md'))

if ($sourceLayout) {
    $pstack = Join-Path $ProjectRoot 'bundle\pstack-upstream'
    $registryPath = Join-Path $ProjectRoot 'docs\pstack-openspec-route-map.json'
    $adapter = Join-Path $ProjectRoot 'orbitstack-codex\SKILL.md'
} else {
    $pstack = Join-Path $ProjectRoot '.orbitstack\pstack-upstream'
    $registryPath = Join-Path $ProjectRoot '.orbitstack\pstack-openspec-route-map.json'
    $adapterCandidates = @(
        '.agents\skills\orbitstack-pstack-openspec\SKILL.md',
        '.claude\skills\orbitstack-pstack-openspec\SKILL.md',
        '.gemini\skills\orbitstack-pstack-openspec\SKILL.md',
        '.cursor\skills\orbitstack-pstack-openspec\SKILL.md'
    )
    $adapter = $null
    foreach ($candidate in $adapterCandidates) {
        $candidatePath = Join-Path $ProjectRoot $candidate
        if (Test-Path -LiteralPath $candidatePath) { $adapter = $candidatePath; break }
    }
    if (!$adapter) { throw "Installed OrbitStack adapter is missing under $ProjectRoot" }
}

if (!(Test-Path -LiteralPath $registryPath)) { throw "Missing route registry: $registryPath" }
if (!(Test-Path -LiteralPath (Join-Path $pstack 'skills\poteto-mode\playbooks'))) { throw "Missing PStack source: $pstack" }
$registry = Get-Content -LiteralPath $registryPath -Raw | ConvertFrom-Json
if ([string]::IsNullOrWhiteSpace([string]$registry.durableTaskSource) -or $registry.durableTaskSource -ne 'OpenSpec tasks.md') { throw 'Route registry must declare OpenSpec tasks.md as its single durable task source' }
if ([string]::IsNullOrWhiteSpace([string]$registry.supportingSkillPolicy)) { throw 'Route registry must define its single supporting-skill resolution policy' }
$routeIds = @($registry.routes | ForEach-Object id)
$upstreamPlaybooks = @(Get-ChildItem -LiteralPath (Join-Path $pstack 'skills\poteto-mode\playbooks') -File -Filter '*.md' | ForEach-Object { $_.BaseName } | Sort-Object)
$missing = @($upstreamPlaybooks | Where-Object { $_ -notin $routeIds })
$extra = @($routeIds | Where-Object { $_ -notin $upstreamPlaybooks })
$duplicates = @($routeIds | Group-Object | Where-Object Count -gt 1)
if ($upstreamPlaybooks.Count -ne 23 -or $routeIds.Count -ne 23 -or $missing.Count -or $extra.Count -or $duplicates.Count) {
    throw "PStack inventory mismatch. Upstream=$($upstreamPlaybooks.Count), registry=$($routeIds.Count), missing=[$($missing -join ',')], extra=[$($extra -join ',')], duplicates=[$($duplicates.Name -join ',')]"
}

foreach ($route in $registry.routes) {
    $source = Join-Path $pstack $route.source
    if (!(Test-Path -LiteralPath $source)) { throw "Missing upstream route source for $($route.id): $source" }
    foreach ($field in 'fixture','openSpec','gate','codex','geminiCapability','geminiModelTier','verify','taskSource','supportingSkills') {
        if ([string]::IsNullOrWhiteSpace([string]$route.$field)) { throw "Route $($route.id) has no $field mapping" }
    }
    if ($route.taskSource -ne 'OpenSpec tasks.md') { throw "Route $($route.id) has an unsupported durable task source" }
    if ($route.supportingSkills -ne $registry.supportingSkillPolicy) { throw "Route $($route.id) does not use the PStack-source skill resolver" }
    Write-Output "PASS playbook=$($route.id) OpenSpec mapping and metadata present"
}

$fallbacks = @($registry.fallbackSkills)
if ($fallbacks.Count -ne 1 -or $fallbacks[0].id -ne 'figure-it-out') { throw 'Large-work figure-it-out fallback must be mapped exactly once' }
foreach ($fallback in $fallbacks) {
    if (!(Test-Path -LiteralPath (Join-Path $pstack $fallback.source))) { throw "Missing fallback source: $($fallback.source)" }
    foreach ($field in 'trigger','openSpec','gate','codex','geminiCapability','geminiModelTier','verify','taskSource','supportingSkills') {
        if ([string]::IsNullOrWhiteSpace([string]$fallback.$field)) { throw "Fallback $($fallback.id) has no $field" }
    }
    if ($fallback.taskSource -ne 'OpenSpec tasks.md' -or $fallback.supportingSkills -ne $registry.supportingSkillPolicy) { throw 'Fallback metadata does not match the single-task-source or skill-resolution policy' }
}

$adapterText = Get-Content -LiteralPath $adapter -Raw
foreach ($required in 'PStack controls task execution','poteto-mode','openspec context','openspec init --tools codex','original user request','capsule digest','tasks.md','Code Review Graph') {
    if ($adapterText -notmatch [regex]::Escape($required)) { throw "Adapter is missing integration rule: $required" }
}
if ($adapterText -match 'mandatory Step 0|dual checklist gate|wait for explicit authorization before writing') { throw 'Adapter retains an approval gate that conflicts with PStack-first execution' }

if ($sourceLayout) {
    $geminiAdapter = Join-Path $ProjectRoot 'orbitstack-gemini\SKILL.md'
    if (!(Test-Path -LiteralPath $geminiAdapter)) { throw "Gemini adapter is missing at $geminiAdapter" }
    $geminiText = Get-Content -LiteralPath $geminiAdapter -Raw
    foreach ($required in 'PStack controls task execution','poteto-mode','openspec context','openspec init --tools gemini','invoke_subagent','flash_lite','tasks.md') {
        if ($geminiText -notmatch [regex]::Escape($required)) { throw "Gemini adapter is missing integration rule: $required" }
    }
}

$contextOutput = openspec context --json | ConvertFrom-Json
if (!$contextOutput.root -or [IO.Path]::GetFullPath($contextOutput.root.path).TrimEnd('\') -ne $ProjectRoot.TrimEnd('\')) {
    throw "OpenSpec root mismatch. Expected $ProjectRoot, got $($contextOutput.root.path)"
}

if ($sourceLayout) {
    $globalRegistry = 'C:\Users\Administrator\.codex\pstack-openspec-route-map.json'
    $globalAgent = 'C:\Users\Administrator\.codex\AGENTS.md'
    $globalAdapter = 'C:\Users\Administrator\.codex\skills\orbitstack-pstack-openspec\SKILL.md'
    if (!(Test-Path -LiteralPath $globalRegistry) -or !(Test-Path -LiteralPath $globalAdapter)) { throw 'Global PStack/OpenSpec mirrors are missing' }
    if ((Get-FileHash -LiteralPath $adapter -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $globalAdapter -Algorithm SHA256).Hash) { throw 'Global Codex adapter differs from repository source' }
    $agentText = Get-Content -LiteralPath $globalAgent -Raw
    if ($agentText -notmatch [regex]::Escape($globalRegistry)) { throw 'Global AGENTS.md does not reference the installed route registry' }
    $globalMap = Get-Content -LiteralPath $globalRegistry -Raw | ConvertFrom-Json
    if (@($globalMap.routes).Count -ne $routeIds.Count) { throw 'Global route registry differs in route count from source' }
    if ((ConvertTo-Json -InputObject @($registry.routes) -Depth 20 -Compress) -cne (ConvertTo-Json -InputObject @($globalMap.routes) -Depth 20 -Compress)) { throw 'Global route entries differ from repository source' }
}

Write-Output "PASS PStack playbooks=$($upstreamPlaybooks.Count), fallback=$($fallbacks[0].id), sourceMode=$sourceLayout, OpenSpec root=$ProjectRoot"
Write-Output "STRUCTURAL ROUTE AUDIT PASS. Blinded PStack Eval is a separate acceptance check."
