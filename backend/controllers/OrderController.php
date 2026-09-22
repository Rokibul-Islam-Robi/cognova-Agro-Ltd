<?php
declare(strict_types=1);

namespace Prome\Controllers;

use Prome\Models\Order;
use Prome\Utils\Response;
use Prome\Utils\Validator;
use Prome\Middleware\AuthMiddleware;

class OrderController
{
    private Order $orderModel;

    public function __construct()
    {
        $this->orderModel = new Order();
    }

    public function store(): void
    {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        $validator = (new Validator($input))
            ->required('customer_name')
            ->required('customer_email')->email('customer_email')
            ->required('customer_phone')
            ->required('shipping_address')
            ->required('total_amount')->numeric('total_amount');

        if (!$validator->passes()) {
            Response::error('Validation failed', 422, $validator->getErrors());
        }

        if (empty($input['items']) || !is_array($input['items'])) {
            Response::error('Order must contain at least one item.', 422);
        }

        $orderSummary = $this->orderModel->createOrder($validator->getData(), $input['items']);
        Response::success($orderSummary, 'Order placed successfully.', 201);
    }

    public function index(): void
    {
        AuthMiddleware::requireRole('admin');

        $filters = [
            'order_status' => $_GET['status'] ?? null,
            'order_type'   => $_GET['type'] ?? null
        ];

        $orders = $this->orderModel->getAll(array_filter($filters));
        Response::success($orders, 'Orders retrieved successfully.');
    }

    public function show(int $id): void
    {
        $order = $this->orderModel->findById($id);
        if (!$order) {
            Response::notFound("Order #{$id} not found.");
        }
        Response::success($order);
    }

    public function updateStatus(int $id): void
    {
        AuthMiddleware::requireRole('admin');

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($input['order_status'])) {
            Response::error("Field 'order_status' is required.", 422);
        }

        $updated = $this->orderModel->updateStatus($id, $input['order_status'], $input['payment_status'] ?? null);
        if (!$updated) {
            Response::error("Failed to update status for order #{$id}.", 400);
        }

        Response::success(null, "Order #{$id} status updated successfully.");
    }
}
