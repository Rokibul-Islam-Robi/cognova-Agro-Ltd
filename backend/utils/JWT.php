<?php
declare(strict_types=1);

namespace Prome\Utils;

use Prome\Config\Config;

/**
 * Lightweight Pure PHP JWT Handler (HS256)
 */
class JWT
{
    public static function encode(array $payload, int $expiry = Config::JWT_EXPIRY): string
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['iat'] = time();
        $payload['exp'] = time() + $expiry;
        $payloadJson = json_encode($payload);

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payloadJson);

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, Config::JWT_SECRET, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode(string $jwt): ?array
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return null;
        }

        [$header64, $payload64, $sig64] = $parts;

        $signature = self::base64UrlDecode($sig64);
        $expectedSignature = hash_hmac('sha256', $header64 . "." . $payload64, Config::JWT_SECRET, true);

        if (!hash_equals($signature, $expectedSignature)) {
            return null;
        }

        $payload = json_decode(self::base64UrlDecode($payload64), true);
        if (!is_array($payload)) {
            return null;
        }

        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null; // Expired
        }

        return $payload;
    }

    private static function base64UrlEncode(string $data): string
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    private static function base64UrlDecode(string $data): string
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $padLen = 4 - $remainder;
            $data .= str_repeat('=', $padLen);
        }
        return (string)base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
    }
}
