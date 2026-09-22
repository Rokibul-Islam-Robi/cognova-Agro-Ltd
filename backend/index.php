<?php
declare(strict_types=1);

// ==============================================================================
// Prome Agro Foods Limited - Raw PHP RESTful API Gateway
// ==============================================================================

// 1. Autoloader for PSR-4 'Prome\' namespace
spl_autoload_register(function (string $class) {
    $prefix = 'Prome\\';
    $baseDir = __DIR__ . '/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    // Lowercase subfolder mapping for linux compatibility
    $parts = explode('/', str_replace('\\', '/', $relativeClass));
    $className = array_pop($parts);
    $subDir = strtolower(implode('/', $parts));
    $resolvedFile = $baseDir . ($subDir ? $subDir . '/' : '') . $className . '.php';

    if (file_exists($resolvedFile)) {
        require_once $resolvedFile;
    } elseif (file_exists($file)) {
        require_once $file;
    }
});

use Prome\Middleware\CorsMiddleware;
use Prome\Routes\Router;
use Prome\Controllers\AuthController;
use Prome\Controllers\CategoryController;
use Prome\Controllers\ProductController;
use Prome\Controllers\OrderController;
use Prome\Controllers\InquiryController;
use Prome\Controllers\MediaController;
use Prome\Controllers\DashboardController;
use Prome\Utils\Response;

// 2. Handle Global CORS Headers & Preflight
CorsMiddleware::handle();

// 3. Global Exception Handler
set_exception_handler(function (\Throwable $e) {
    error_log("Unhandled Exception: " . $e->getMessage() . "\n" . $e->getTraceAsString());
    Response::error($e->getMessage(), 500);
});

// 4. Initialize Router
$router = new Router();

// --- Authentication Routes ---
$router->post('/api/auth/login', [AuthController::class, 'login']);
$router->post('/api/auth/register', [AuthController::class, 'register']);
$router->get('/api/auth/me', [AuthController::class, 'me']);

// --- Categories Routes ---
$router->get('/api/categories', [CategoryController::class, 'index']);
$router->get('/api/categories/{slug}', [CategoryController::class, 'show']);

// --- Products Routes ---
$router->get('/api/products', [ProductController::class, 'index']);
$router->get('/api/products/{id}', [ProductController::class, 'show']);
$router->post('/api/products', [ProductController::class, 'store']);
$router->put('/api/products/{id}', [ProductController::class, 'update']);
$router->delete('/api/products/{id}', [ProductController::class, 'destroy']);

// --- Orders & Checkout Routes ---
$router->post('/api/orders', [OrderController::class, 'store']);
$router->get('/api/orders', [OrderController::class, 'index']);
$router->get('/api/orders/{id}', [OrderController::class, 'show']);
$router->put('/api/orders/{id}/status', [OrderController::class, 'updateStatus']);

// --- B2B Inquiries & Contact Routes ---
$router->post('/api/inquiries', [InquiryController::class, 'store']);
$router->get('/api/inquiries', [InquiryController::class, 'index']);
$router->put('/api/inquiries/{id}/status', [InquiryController::class, 'updateStatus']);

// --- Media & Hero Video Routes ---
$router->get('/api/media', [MediaController::class, 'index']);
$router->get('/api/media/hero-video', [MediaController::class, 'heroVideo']);

// --- Admin Dashboard & KPI Routes ---
$router->get('/api/dashboard/stats', [DashboardController::class, 'getStats']);

// 5. Dispatch Request
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

// If requested via subpath or query strings, trim base path
$basePath = '/backend';
if (str_starts_with($uri, $basePath)) {
    $uri = substr($uri, strlen($basePath));
}

$router->dispatch($method, $uri);
