<?php
declare(strict_types=1);

namespace Prome\Models;

use PDO;
use Prome\Config\Database;

class Inquiry
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function create(array $data): int
    {
        $sql = "INSERT INTO inquiries (name, email, phone, company, country, product_interest, estimated_volume, message, status)
                VALUES (:name, :email, :phone, :company, :country, :product_interest, :estimated_volume, :message, 'new')";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'name'             => $data['name'],
            'email'            => $data['email'],
            'phone'            => $data['phone'],
            'company'          => $data['company'] ?? null,
            'country'          => $data['country'] ?? 'Bangladesh',
            'product_interest' => $data['product_interest'] ?? 'General Inquiry',
            'estimated_volume' => $data['estimated_volume'] ?? null,
            'message'          => $data['message']
        ]);

        return (int)$this->db->lastInsertId();
    }

    public function getAll(): array
    {
        $stmt = $this->db->query("SELECT * FROM inquiries ORDER BY id DESC");
        return $stmt->fetchAll();
    }

    public function updateStatus(int $id, string $status): bool
    {
        $stmt = $this->db->prepare("UPDATE inquiries SET status = :status WHERE id = :id");
        return $stmt->execute(['id' => $id, 'status' => $status]);
    }
}
