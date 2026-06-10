<?php
/**
 * Calk OTA — self-hosted Capgo live-update endpoint (VPS / PHP 8.1+).
 *
 * Implements the @capgo/capacitor-updater self-hosted contract:
 *   POST (JSON body) -> { "version", "url", "checksum" }  (or {} when up to date)
 *
 * Bundle zips are served as plain static files by Nginx from /bundles/<app>/<ver>.zip,
 * so this script only answers the version check. One endpoint serves the whole Calk
 * network — add apps to APP_BY_ID and the publish script handles the rest.
 *
 * Layout (this file sits at the docroot of ota.calk-au.com):
 *   updates.php            <- this file
 *   manifest/<app>.json    <- { "version": "1.0.1", "checksum": "<sha256 hex>" }
 *   bundles/<app>/<ver>.zip
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/** Map a native appId -> short app key used in manifest/bundle paths. */
const APP_BY_ID = [
    'com.cryptocalk.calculator' => 'crypto',
    // 'com.calkca.calculators' => 'ca',
    // 'com.calknz.calculators' => 'nz',
];

/** Public base URL used to build bundle links. Override via env for local testing. */
function public_base(): string
{
    $env = getenv('OTA_PUBLIC_BASE');
    return $env !== false && $env !== '' ? rtrim($env, '/') : 'https://ota.cryptocalk.com';
}

function out(array $data): never
{
    // Empty -> "{}" (a JSON object, as the plugin expects), not PHP's "[]".
    echo $data === [] ? '{}' : json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

/** Compare dotted numeric versions. 1 if a>b, -1 if a<b, 0 if equal. */
function cmp_versions(string $a, string $b): int
{
    $pa = array_map('intval', explode('.', $a));
    $pb = array_map('intval', explode('.', $b));
    $len = max(count($pa), count($pb));
    for ($i = 0; $i < $len; $i++) {
        $x = $pa[$i] ?? 0;
        $y = $pb[$i] ?? 0;
        if ($x > $y) return 1;
        if ($x < $y) return -1;
    }
    return 0;
}

// Health check / browser hit.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    out(['ok' => true, 'service' => 'cryptocalk-ota']);
}

$body = json_decode(file_get_contents('php://input') ?: '{}', true);
if (!is_array($body)) {
    out([]); // malformed -> "no update"
}

$app = APP_BY_ID[(string)($body['app_id'] ?? '')] ?? null;
if ($app === null) {
    out([]);
}

$manifestFile = __DIR__ . "/manifest/{$app}.json";
if (!is_file($manifestFile)) {
    out([]);
}
$manifest = json_decode((string)file_get_contents($manifestFile), true);
if (!is_array($manifest) || empty($manifest['version'])) {
    out([]);
}

// While running the bundle embedded in the native binary, the plugin reports
// version_name "builtin" — compare against the native build number so each OTA
// version (always > the shipped build) is offered exactly once and never downgrades.
$vName = (string)($body['version_name'] ?? '');
$reported = ($vName === '' || $vName === 'builtin')
    ? (string)($body['version_build'] ?? '0.0.0')
    : $vName;

$version = (string)$manifest['version'];
if (cmp_versions($version, $reported) <= 0) {
    out([]); // already up to date
}

out([
    'version'  => $version,
    'url'      => public_base() . "/bundles/{$app}/{$version}.zip",
    'checksum' => (string)($manifest['checksum'] ?? ''),
]);
