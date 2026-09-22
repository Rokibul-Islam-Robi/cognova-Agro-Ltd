<?php
declare(strict_types=1);

namespace Prome\Controllers;

use Prome\Models\Inquiry;
use Prome\Utils\Response;
use Prome\Utils\Validator;
use Prome\Middleware\AuthMiddleware;

class InquiryController
{
    private Inquiry $inquiryModel;

    public function __construct()
    {
        $this->inquiryModel = new Inquiry();
    }

    public function store(): void
    {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        $validator = (new Validator($input))
            ->required('name')
            ->required('email')->email('email')
            ->required('phone')
            ->required('country')
            ->required('message');

        if (!$validator->passes()) {
            Response::error('Validation failed', 422, $validator->getErrors());
        }

        $id = $this->inquiryModel->create($validator->getData());
        Response::success(['id' => $id], 'Your export / wholesale inquiry has been submitted. Our export desk will contact you within 24 hours.', 201);
    }

    public function index(): void
    {
        AuthMiddleware::requireRole('admin');
        $inquiries = $this->inquiryModel->getAll();
        Response::success($inquiries, 'Inquiries retrieved successfully.');
    }

    public function updateStatus(int $id): void
    {
        AuthMiddleware::requireRole('admin');
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        if (empty($input['status'])) {
            Response::error("Field 'status' is required.", 422);
        }

        $this->inquiryModel->updateStatus($id, $input['status']);
        Response::success(null, "Inquiry #{$id} updated to '{$input['status']}'.");
    }
}
