<?php
declare(strict_types=1);

namespace Prome\Controllers;

use PDO;
use Prome\Config\Database;
use Prome\Utils\Response;
use Prome\Middleware\AuthMiddleware;

class DashboardController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getStats(): void
    {
        AuthMiddleware::requireRole('admin');

        // Total Revenue
        $revStmt = $this->db->query("SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM orders WHERE payment_status = 'paid'");
        $totalRevenue = (float)$revStmt->fetchColumn();

        // Total Orders
        $orderStmt = $this->db->query("SELECT COUNT(*) as total_orders FROM orders");
        $totalOrders = (int)$orderStmt->fetchColumn();

        // Total Products
        $prodStmt = $this->db->query("SELECT COUNT(*) as total_products FROM products");
        $totalProducts = (int)$prodStmt->fetchColumn();

        // Pending Inquiries
        $inqStmt = $this->db->query("SELECT COUNT(*) as total_inquiries FROM inquiries WHERE status IN ('new', 'in_review')");
        $totalInquiries = (int)$inqStmt->fetchColumn();

        // Recent Orders
        $recentStmt = $this->db->query("SELECT * FROM orders ORDER BY id DESC LIMIT 5");
        $recentOrders = $recentStmt->fetchAll();

        // Category breakdown
        $catStmt = $this->db->query("
            SELECT c.name, COUNT(p.id) as product_count, COALESCE(SUM(oi.subtotal), 0) as category_sales
            FROM categories c
            LEFT JOIN products p ON c.id = p.category_id
            LEFT JOIN order_items oi ON p.id = oi.product_id
            GROUP BY c.id
            ORDER BY category_sales DESC
        ");
        $categoryBreakdown = $catStmt->fetchAll();

        Response::success([
            'kpis' => [
                'total_revenue'   => $totalRevenue,
                'total_orders'    => $totalOrders,
                'total_products'  => $totalProducts,
                'total_inquiries' => $totalInquiries,
                'export_countries'=> 32,
                'cip_awards'      => 5
            ],
            'recent_orders'       => $recentOrders,
            'category_breakdown'  => $categoryBreakdown
        ], 'Dashboard statistics retrieved successfully.');
    }
}
