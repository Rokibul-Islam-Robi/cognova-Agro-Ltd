<?php
declare(strict_types=1);

namespace Prome\Models;

use PDO;
use Prome\Config\Database;

class Category
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getAll(): array
    {
        $stmt = $this->db->query("
            SELECT c.*, COUNT(p.id) as product_count 
            FROM categories c 
            LEFT JOIN products p ON c.id = p.category_id 
            GROUP BY c.id 
            ORDER BY c.sort_order ASC
        ");
        return $stmt->fetchAll();
    }

    public function findBySlug(string $slug): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM categories WHERE slug = :slug LIMIT 1");
        $stmt->execute(['slug' => $slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}
