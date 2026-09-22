<?php
declare(strict_types=1);

namespace Prome\Routes;

use Prome\Utils\Response;

class Router
{
    private array $routes = [];

    public function get(string $pattern, array $handler): void
    {
        $this->addRoute('GET', $pattern, $handler);
    }

    public function post(string $pattern, array $handler): void
    {
        $this->addRoute('POST', $pattern, $handler);
    }

    public function put(string $pattern, array $handler): void
    {
        $this->addRoute('PUT', $pattern, $handler);
    }

    public function delete(string $pattern, array $handler): void
    {
        $this->addRoute('DELETE', $pattern, $handler);
    }

    private function addRoute(string $method, string $pattern, array $handler): void
    {
        // Normalize pattern, e.g. /api/products/{id} -> regex
        $regex = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $pattern);
        $regex = "#^" . $regex . "$#";

        $this->routes[] = [
            'method'  => $method,
            'pattern' => $pattern,
            'regex'   => $regex,
            'handler' => $handler
        ];
    }

    public function dispatch(string $method, string $uri): void
    {
        $parsedUrl = parse_url($uri, PHP_URL_PATH);
        $cleanUri = rtrim($parsedUrl, '/') ?: '/';

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            if (preg_match($route['regex'], $cleanUri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                [$controllerClass, $action] = $route['handler'];

                $controller = new $controllerClass();
                call_user_func_array([$controller, $action], $params);
                return;
            }
        }

        Response::notFound("Endpoint '{$method} {$cleanUri}' not found.");
    }
}
