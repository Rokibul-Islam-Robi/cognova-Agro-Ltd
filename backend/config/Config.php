<?php
declare(strict_types=1);

namespace Prome\Config;

/**
 * Prome Agro Foods Platform - Application Configuration
 */
class Config
{
    // Database Credentials
    public const DB_HOST = '127.0.0.1';
    public const DB_PORT = 3306;
    public const DB_NAME = 'prome_agro_db';
    public const DB_USER = 'root';
    public const DB_PASS = '';
    public const DB_CHARSET = 'utf8mb4';

    // App Information
    public const APP_NAME = 'Prome Agro Foods Limited';
    public const APP_URL = 'https://prome.com.bd/';
    public const APP_EMAIL = 'info@prome.com.bd';
    public const EXPORT_EMAIL = 'export@promefoods.com';
    public const HOTLINE = '+8809648230230';
    public const FACTORY_ADDRESS = '487, Gobindapur, Moinertek, Uttarkhan, Dhaka -1230, Bangladesh';

    // Security & Tokens
    public const JWT_SECRET = 'prome_agro_foods_secret_key_2026_cip_award';
    public const JWT_EXPIRY = 86400 * 7; // 7 days

    // Allowed CORS Origins
    public const ALLOWED_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:8000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:8000'
    ];

    public static function get(string $key, mixed $default = null): mixed
    {
        return defined("self::$key") ? constant("self::$key") : $default;
    }
}
