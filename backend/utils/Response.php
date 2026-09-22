<?php
declare(strict_types=1);

namespace Prome\Utils;

/**
 * Standardized JSON API Response Helper
 */
class Response
{
    public static function json(mixed $data = null, int $statusCode = 200, string $message = 'Success', array $meta = []): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=UTF-8');

        $payload = [
            'status' => $statusCode >= 200 && $statusCode < 300 ? 'success' : 'error',
            'code' => $statusCode,
            'message' => $message,
            'data' => $data
        ];

        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function success(mixed $data = null, string $message = 'Operation successful', int $statusCode = 200, array $meta = []): void
    {
        self::json($data, $statusCode, $message, $meta);
    }

    public static function error(string $message = 'An error occurred', int $statusCode = 400, mixed $errors = null): void
    {
        self::json($errors, $statusCode, $message);
    }

    public static function notFound(string $message = 'Resource not found'): void
    {
        self::json(null, 404, $message);
    }

    public static function unauthorized(string $message = 'Unauthorized access'): void
    {
        self::json(null, 401, $message);
    }

    public static function forbidden(string $message = 'Access forbidden'): void
    {
        self::json(null, 403, $message);
    }
}
