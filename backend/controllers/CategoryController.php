<?php
declare(strict_types=1);

namespace Prome\Controllers;

use Prome\Models\Category;
use Prome\Utils\Response;

class CategoryController
{
    private Category $categoryModel;

    public function __construct()
    {
        $this->categoryModel = new Category();
    }

    public function index(): void
    {
        $categories = $this->categoryModel->getAll();
        Response::success($categories, 'Categories retrieved successfully.');
    }

    public function show(string $slug): void
    {
        $category = $this->categoryModel->findBySlug($slug);
        if (!$category) {
            Response::notFound("Category '{$slug}' not found.");
        }
        Response::success($category);
    }
}
