<?php
declare(strict_types=1);

namespace Prome\Models;

use PDO;
use Prome\Config\Database;

class Media
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getAll(string $category = ''): array
    {
        $sql = "SELECT * FROM media_gallery";
        $params = [];

        if (!empty($category)) {
            $sql .= " WHERE category = :category";
            $params['category'] = $category;
        }

        $sql .= " ORDER BY is_hero_featured DESC, id DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function getHeroVideo(): ?array
    {
        $stmt = $this->db->query("SELECT * FROM media_gallery WHERE media_type = 'video' AND is_hero_featured = 1 LIMIT 1");
        $video = $stmt->fetch();
        return $video ?: null;
    }
}
