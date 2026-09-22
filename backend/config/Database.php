<?php
declare(strict_types=1);

namespace Prome\Config;

use PDO;
use PDOException;

/**
 * Singleton PDO Database Manager
 * Follows strict parameterized prepared statements for OWASP SQLi protection
 */
class Database
{
    private static ?PDO $instance = null;

    private function __construct() {}
    private function __clone() {}

    public static function getConnection(): PDO
    {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: Config::DB_HOST;
            $port = getenv('DB_PORT') ?: Config::DB_PORT;
            $db   = getenv('DB_NAME') ?: Config::DB_NAME;
            $user = getenv('DB_USER') ?: Config::DB_USER;
            $pass = getenv('DB_PASS') ?: Config::DB_PASS;
            $charset = Config::DB_CHARSET;

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$charset} COLLATE utf8mb4_unicode_ci"
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // If database connection fails in local preview without running MySQL daemon,
                // log error gracefully
                error_log("Database Connection Failed: " . $e->getMessage());
                throw new PDOException("Database connection error. Please ensure MySQL is running: " . $e->getMessage());
            }
        }

        return self::$instance;
    }
}
