<?php

namespace App\Core;

class Router
{
    public function run(): void
    {
        $uri = $_GET['url'] ?? '/';
        $segments = explode('/', trim($uri, '/'));

        if (!empty($segments[0]) && $segments[0] === 'api') {
            $namespace = 'App\\Controller\\Api\\';
            $controller = isset($segments[1])
                ? ucfirst($segments[1]) . 'ApiController'
                : 'HomeApiController';
            $method = $segments[2] ?? 'index';
            $params = array_slice($segments, 3);
        } elseif (!empty($segments[0]) && $segments[0] === 'admin') {
            $namespace = 'App\\Controller\\Admin\\';
            $controller = isset($segments[1])
                ? ucfirst($segments[1]) . 'Controller'
                : 'DashboardController';
            $method = $segments[2] ?? 'index';
            $params = array_slice($segments, 3);
        } else {
            $namespace = 'App\\Controller\\';
            $controller = !empty($segments[0])
                ? ucfirst($segments[0]) . 'Controller'
                : 'HomeController';
            $method = $segments[1] ?? 'index';
            $params = array_slice($segments, 2);
        }

        $controllerClass = $namespace . $controller;

        if (class_exists($controllerClass) && method_exists($controllerClass, $method)) {
            call_user_func_array([new $controllerClass, $method], $params);
            return;
        }

        http_response_code(404);
        echo '404 - Page not found';
    }
}