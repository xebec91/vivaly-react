<?php

namespace App\Controller\Api;

use App\Model\User\UserDAO;
use App\Middleware\AuthMiddleware;

class AdminUserApiController
{
    private function json($data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    private function getJsonInput(): array
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        return is_array($data) ? $data : [];
    }

    public function __construct()
    {
        AuthMiddleware::requireAdmin();
    }

    public function users(): void
    {
        $users = (new UserDAO())->findAll();

        $payload = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
            ];
        }, $users);

        $this->json($payload);
    }

    public function show(int $id): void
    {
        $user = (new UserDAO())->findById($id);

        if (!$user) {
            $this->json(['error' => 'Utilisateur introuvable.'], 404);
            return;
        }

        $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'role' => $user->getRole(),
        ]);
    }

    public function update(int $id): void
    {
        $dao = new UserDAO();
        $user = $dao->findById($id);

        if (!$user) {
            $this->json(['error' => 'Utilisateur introuvable.'], 404);
            return;
        }

        $data = $this->getJsonInput();

        $email = trim($data['email'] ?? '');
        $role = $data['role'] ?? 'user';
        $password = $data['password'] ?? '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->json(['error' => 'Email invalide.'], 422);
            return;
        }

        $user->setEmail($email);
        $user->setRole($role);

        if (!empty($password)) {
            $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
        }

        $dao->update($user);

        $this->json(['success' => true]);
    }

    public function delete(int $id): void
    {
        $dao = new UserDAO();
        $dao->delete($id);

        $this->json(['success' => true]);
    }
}