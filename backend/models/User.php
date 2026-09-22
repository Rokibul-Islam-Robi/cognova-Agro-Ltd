<?php
declare(strict_types=1);

namespace Prome\Models;

use PDO;
use Prome\Config\Database;

class User
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();
        return $user ?: null;
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare("SELECT id, name, email, role, phone, company_name, country, status, created_at FROM users WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch();
        return $user ?: null;
    }

    public function create(array $data): int
    {
        $sql = "INSERT INTO users (name, email, password_hash, role, phone, company_name, country, status) 
                VALUES (:name, :email, :password_hash, :role, :phone, :company_name, :country, :status)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password_hash' => password_hash($data['password'], PASSWORD_BCRYPT),
            'role'          => $data['role'] ?? 'customer',
            'phone'         => $data['phone'] ?? null,
            'company_name'  => $data['company_name'] ?? null,
            'country'       => $data['country'] ?? 'Bangladesh',
            'status'        => 'active'
        ]);

        return (int)$this->db->lastInsertId();
    }

    public function getAllDealers(): array
    {
        $stmt = $this->db->query("SELECT id, name, email, phone, company_name, country, status, created_at FROM users WHERE role = 'dealer' ORDER BY id DESC");
        return $stmt->fetchAll();
    }

    public function getAllUsers(): array
    {
        $stmt = $this->db->query("SELECT id, name, email, role, phone, company_name, country, status, created_at FROM users ORDER BY id DESC");
        return $stmt->fetchAll();
    }
}
