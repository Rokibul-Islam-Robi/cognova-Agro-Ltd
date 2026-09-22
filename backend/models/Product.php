<?php
declare(strict_types=1);

namespace Prome\Models;

use PDO;
use Prome\Config\Database;

class Product
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getAll(array $filters = []): array
    {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                JOIN categories c ON p.category_id = c.id 
                WHERE 1=1";
        $params = [];

        if (!empty($filters['category_id'])) {
            $sql .= " AND p.category_id = :category_id";
            $params['category_id'] = (int)$filters['category_id'];
        }

        if (!empty($filters['category_slug'])) {
            $sql .= " AND c.slug = :category_slug";
            $params['category_slug'] = $filters['category_slug'];
        }

        if (isset($filters['is_featured'])) {
            $sql .= " AND p.is_featured = :is_featured";
            $params['is_featured'] = (int)$filters['is_featured'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (p.name LIKE :search OR p.description LIKE :search OR p.sku LIKE :search)";
            $params['search'] = "%{$filters['search']}%";
        }

        $sql .= " ORDER BY p.is_featured DESC, p.id DESC";

        if (!empty($filters['limit'])) {
            $sql .= " LIMIT " . (int)$filters['limit'];
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE p.id = :id LIMIT 1
        ");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): int
    {
        $sql = "INSERT INTO products (category_id, name, slug, sku, weight_volume, price, wholesale_price, stock, image_url, description, ingredients, is_featured, is_export_ready) 
                VALUES (:category_id, :name, :slug, :sku, :weight_volume, :price, :wholesale_price, :stock, :image_url, :description, :ingredients, :is_featured, :is_export_ready)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'category_id'     => $data['category_id'],
            'name'            => $data['name'],
            'slug'            => $data['slug'] ?? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data['name']), '-')),
            'sku'             => $data['sku'] ?? 'PRM-' . strtoupper(substr(uniqid(), -6)),
            'weight_volume'   => $data['weight_volume'],
            'price'           => $data['price'],
            'wholesale_price' => $data['wholesale_price'] ?? $data['price'] * 0.8,
            'stock'           => $data['stock'] ?? 100,
            'image_url'       => $data['image_url'] ?? '',
            'description'     => $data['description'] ?? '',
            'ingredients'     => $data['ingredients'] ?? '',
            'is_featured'     => $data['is_featured'] ?? 0,
            'is_export_ready' => $data['is_export_ready'] ?? 1
        ]);

        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = ['id' => $id];

        foreach (['category_id', 'name', 'weight_volume', 'price', 'wholesale_price', 'stock', 'image_url', 'description', 'ingredients', 'is_featured', 'is_export_ready'] as $col) {
            if (isset($data[$col])) {
                $fields[] = "`{$col}` = :{$col}";
                $params[$col] = $data[$col];
            }
        }

        if (empty($fields)) return false;

        $sql = "UPDATE products SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM products WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
