<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../app/Core/helpers.php';

use App\Core\Router;

// Au démarrage de la session
session_start([
    'cookie_secure' => true,    // En HTTPS seulement
    'cookie_httponly' => true,  // Empêche l'accès JS au cookie
    'cookie_samesite' => 'Strict' // Protection CSRF additionnelle
]);

// Dynamique : base du projet (ex: /TestProjetPHPLGC2025/public)
$scriptName = dirname($_SERVER['SCRIPT_NAME']);
define('BASE_URL', rtrim($scriptName, '/\\'));


$router = new Router();
$router->run();
