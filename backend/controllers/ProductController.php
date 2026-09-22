<?php
declare(strict_types=1);

namespace Prome\Controllers;

use Prome\Models\Product;
use Prome\Utils\Response;
use Prome\Utils\Validator;
use Prome\Middleware\AuthMiddleware;

class ProductController
{
    private Product $productModel;

    public function __construct()
    {
        $this->productModel = new Product();
    }

    public function index(): void
    {
        $filters = [
            'category_id'   => $_GET['category_id'] ?? null,
            'category_slug' => $_GET['category'] ?? null,
            'is_featured'   => isset($_GET['featured']) ? (int)$_GET['featured'] : null,
            'search'        => $_GET['q'] ?? null,
            'limit'         => $_GET['limit'] ?? null
        ];

        $products = $this->productModel->getAll(array_filter($filters, fn($v) => $v !== null && $v !== ''));
        Response::success($products, 'Products retrieved successfully.', 200, ['total' => count($products)]);
    }

    public function show(int $id): void
    {
        $product = $this->productModel->findById($id);
        if (!$product) {
            Response::notFound("Product with ID {$id} not found.");
        }
        Response::success($product);
    }

    public function store(): void
    {
        AuthMiddleware::requireRole('admin');

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $validator = (new Validator($input))
            ->required('name')
            ->required('category_id')->numeric('category_id')
            ->required('weight_volume')
            ->required('price')->numeric('price');

        if (!$validator->passes()) {
            Response::error('Validation failed', 422, $validator->getErrors());
        }

        $productId = $this->productModel->create($validator->getData());
        $newProduct = $this->productModel->findById($productId);

        Response::success($newProduct, 'Product created successfully.', 201);
    }

    public function update(int $id): void
    {
        AuthMiddleware::requireRole('admin');

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $updated = $this->productModel->update($id, $input);

        if (!$updated) {
            Response::error('Failed to update product or no fields changed.', 400);
        }

        $product = $this->productModel->findById($id);
        Response::success($product, 'Product updated successfully.');
    }

    public function destroy(int $id): void
    {
        AuthMiddleware::requireRole('admin');
        
        $deleted = $this->productModel->delete($id);
        if (!$deleted) {
            Response::error("Failed to delete product #{$id}.", 400);
        }
        Response::success(null, 'Product deleted successfully.');
    }
}
