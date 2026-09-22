<?php
declare(strict_types=1);

namespace Prome\Models;

use PDO;
use Prome\Config\Database;

class Order
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function createOrder(array $orderData, array $items): array
    {
        $this->db->beginTransaction();

        try {
            $orderNumber = 'PRM-' . date('Y') . '-' . strtoupper(substr(uniqid(), -6));
            
            $sql = "INSERT INTO orders (order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, order_type, destination_country, total_amount, payment_method, payment_status, order_status, notes)
                    VALUES (:order_number, :user_id, :customer_name, :customer_email, :customer_phone, :shipping_address, :order_type, :destination_country, :total_amount, :payment_method, :payment_status, 'pending', :notes)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                'order_number'        => $orderNumber,
                'user_id'             => $orderData['user_id'] ?? null,
                'customer_name'       => $orderData['customer_name'],
                'customer_email'      => $orderData['customer_email'],
                'customer_phone'      => $orderData['customer_phone'],
                'shipping_address'    => $orderData['shipping_address'],
                'order_type'          => $orderData['order_type'] ?? 'retail',
                'destination_country' => $orderData['destination_country'] ?? 'Bangladesh',
                'total_amount'        => $orderData['total_amount'],
                'payment_method'      => $orderData['payment_method'] ?? 'Cash on Delivery',
                'payment_status'      => $orderData['payment_status'] ?? 'unpaid',
                'notes'               => $orderData['notes'] ?? null
            ]);

            $orderId = (int)$this->db->lastInsertId();

            $itemSql = "INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
                        VALUES (:order_id, :product_id, :product_name, :quantity, :unit_price, :subtotal)";
            $itemStmt = $this->db->prepare($itemSql);

            foreach ($items as $item) {
                $subtotal = $item['quantity'] * $item['unit_price'];
                $itemStmt->execute([
                    'order_id'     => $orderId,
                    'product_id'   => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'quantity'     => $item['quantity'],
                    'unit_price'   => $item['unit_price'],
                    'subtotal'     => $subtotal
                ]);
            }

            $this->db->commit();

            return [
                'order_id'     => $orderId,
                'order_number' => $orderNumber,
                'total_amount' => $orderData['total_amount'],
                'items_count'  => count($items)
            ];
        } catch (\Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    public function getAll(array $filters = []): array
    {
        $sql = "SELECT o.*, COUNT(oi.id) as total_items 
                FROM orders o 
                LEFT JOIN order_items oi ON o.id = oi.order_id 
                WHERE 1=1";
        $params = [];

        if (!empty($filters['order_status'])) {
            $sql .= " AND o.order_status = :order_status";
            $params['order_status'] = $filters['order_status'];
        }

        if (!empty($filters['order_type'])) {
            $sql .= " AND o.order_type = :order_type";
            $params['order_type'] = $filters['order_type'];
        }

        if (!empty($filters['user_id'])) {
            $sql .= " AND o.user_id = :user_id";
            $params['user_id'] = (int)$filters['user_id'];
        }

        $sql .= " GROUP BY o.id ORDER BY o.id DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM orders WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $order = $stmt->fetch();

        if ($order) {
            $itemStmt = $this->db->prepare("SELECT * FROM order_items WHERE order_id = :order_id");
            $itemStmt->execute(['order_id' => $id]);
            $order['items'] = $itemStmt->fetchAll();
        }

        return $order ?: null;
    }

    public function updateStatus(int $id, string $status, ?string $paymentStatus = null): bool
    {
        $sql = "UPDATE orders SET order_status = :status";
        $params = ['id' => $id, 'status' => $status];

        if ($paymentStatus !== null) {
            $sql .= ", payment_status = :payment_status";
            $params['payment_status'] = $paymentStatus;
        }

        $sql .= " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }
}
