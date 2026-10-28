# Structural acceptance check for the complete upstream PStack-to-OpenSpec route registry.
$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Split-Path -Parent $PSScriptRoot)).Path
$pstack = Join-Path $repoRoot 'bundle\pstack-upstream'
$adapter = Join-Path $repoRoot 'orbitstack-codex\SKILL.md'
$registryPath = Join-Path $repoRoot 'docs\pstack-openspec-route-map.json'
$globalRegistry = 'C:\Users\Administrator\.codex\pstack-openspec-route-map.json'
$globalAgent = 'C:\Users\Administrator\.codex\AGENTS.md'

if (!(Test-Path -LiteralPath $registryPath)) { throw "Missing route registry: $registryPath" }
$registry = Get-Content -LiteralPath $registryPath -Raw | ConvertFrom-Json
if ([string]::IsNullOrWhiteSpace([string]$registry.durableTaskSource) -or $registry.durableTaskSource -ne 'OpenSpec tasks.md') { throw 'Route registry must declare OpenSpec tasks.md as its single durable task source' }
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
    foreach ($field in 'fixture','openSpec','gate','codex','verify') {
        if ([string]::IsNullOrWhiteSpace([string]$route.$field)) { throw "Route $($route.id) has no $field mapping" }
    }
    Write-Output "PASS playbook=$($route.id) OpenSpec mapping and gate metadata present"
}

$fallbacks = @($registry.fallbackSkills)
if ($fallbacks.Count -ne 1 -or $fallbacks[0].id -ne 'figure-it-out') { throw 'Large-work figure-it-out fallback must be mapped exactly once' }
foreach ($fallback in $fallbacks) {
    if (!(Test-Path -LiteralPath (Join-Path $pstack $fallback.source))) { throw "Missing fallback source: $($fallback.source)" }
    foreach ($field in 'trigger','openSpec','gate','taskSource') {
        if ([string]::IsNullOrWhiteSpace([string]$fallback.$field)) { throw "Fallback $($fallback.id) has no $field" }
    }
}

$adapterText = Get-Content -LiteralPath $adapter -Raw
foreach ($required in 'Step 0','dual checklist','openspec context','pstack-openspec-route-map.json','tasks.md') {
    if ($adapterText -notmatch [regex]::Escape($required)) { throw "Adapter is missing integration rule: $required" }
}
$agentText = Get-Content -LiteralPath $globalAgent -Raw
if ($agentText -notmatch [regex]::Escape($globalRegistry)) { throw 'Global AGENTS.md does not reference the globally installed route registry' }
$globalMap = Get-Content -LiteralPath $globalRegistry -Raw | ConvertFrom-Json
if (@($globalMap.routes).Count -ne $routeIds.Count) { throw 'Global route registry differs in route count from repository source' }
$repoRoutesJson = ConvertTo-Json -InputObject @($registry.routes) -Depth 20 -Compress
$globalRoutesJson = ConvertTo-Json -InputObject @($globalMap.routes) -Depth 20 -Compress
if ($repoRoutesJson -cne $globalRoutesJson) { throw 'Global route entries differ from repository registry source' }

$context = openspec context --json | ConvertFrom-Json
if (!$context.root -or $context.root.path -ne $repoRoot) { throw "OpenSpec root mismatch. Expected $repoRoot, got $($context.root.path)" }
Write-Output "PASS complete upstream inventory=$($upstreamPlaybooks.Count), fallback=figure-it-out, OpenSpec root=$repoRoot"
Write-Output 'STRUCTURAL ROUTE AUDIT PASS. Model behavior still requires the fixture evaluation report.'
