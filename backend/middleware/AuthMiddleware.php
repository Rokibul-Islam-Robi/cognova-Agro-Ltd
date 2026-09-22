<?php
declare(strict_types=1);

namespace Prome\Middleware;

use Prome\Utils\JWT;
use Prome\Utils\Response;

class AuthMiddleware
{
    public static function authenticate(): array
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            Response::unauthorized('Authorization token is missing or invalid.');
        }

        $token = $matches[1];
        $decoded = JWT::decode($token);

        if (!$decoded) {
            Response::unauthorized('Invalid or expired token.');
        }

        return $decoded;
    }

    public static function requireRole(string $requiredRole): array
    {
        $user = self::authenticate();
        if ($user['role'] !== $requiredRole && $user['role'] !== 'admin') {
            Response::forbidden("Access denied. '{$requiredRole}' privilege required.");
        }
        return $user;
    }
}
