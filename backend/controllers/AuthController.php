<?php
declare(strict_types=1);

namespace Prome\Controllers;

use Prome\Models\User;
use Prome\Utils\Response;
use Prome\Utils\Validator;
use Prome\Utils\JWT;
use Prome\Middleware\AuthMiddleware;

class AuthController
{
    private User $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function login(): void
    {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $validator = (new Validator($input))
            ->required('email')->email('email')
            ->required('password');

        if (!$validator->passes()) {
            Response::error('Validation failed', 422, $validator->getErrors());
        }

        $data = $validator->getData();
        $user = $this->userModel->findByEmail($data['email']);

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            Response::error('Invalid email or password credentials.', 401);
        }

        if ($user['status'] !== 'active') {
            Response::forbidden('Your account has been deactivated or is awaiting approval.');
        }

        $payload = [
            'id'           => $user['id'],
            'name'         => $user['name'],
            'email'        => $user['email'],
            'role'         => $user['role'],
            'company_name' => $user['company_name']
        ];

        $token = JWT::encode($payload);

        Response::success([
            'token' => $token,
            'user'  => $payload
        ], 'Login successful.');
    }

    public function register(): void
    {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $validator = (new Validator($input))
            ->required('name')
            ->required('email')->email('email')
            ->required('password')->minLength('password', 6)
            ->in('role', ['customer', 'dealer']);

        if (!$validator->passes()) {
            Response::error('Validation failed', 422, $validator->getErrors());
        }

        $data = $validator->getData();
        if ($this->userModel->findByEmail($data['email'])) {
            Response::error('An account with this email already exists.', 409);
        }

        $userId = $this->userModel->create($data);
        $user = $this->userModel->findById($userId);

        $payload = [
            'id'           => $user['id'],
            'name'         => $user['name'],
            'email'        => $user['email'],
            'role'         => $user['role'],
            'company_name' => $user['company_name']
        ];
        $token = JWT::encode($payload);

        Response::success([
            'token' => $token,
            'user'  => $payload
        ], 'Registration successful.', 201);
    }

    public function me(): void
    {
        $authUser = AuthMiddleware::authenticate();
        $user = $this->userModel->findById((int)$authUser['id']);
        if (!$user) {
            Response::notFound('User profile not found.');
        }
        Response::success($user);
    }
}
