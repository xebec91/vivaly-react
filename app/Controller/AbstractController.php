<?php

namespace App\Controller;

use App\Model\User\UserDAO;

abstract class AbstractController
{
    protected function view(string $path, array $params = []): void
    {
        extract($params);
        $view = __DIR__ . '/../View/' . $path . '.php';
        require __DIR__ . '/../View/layout/base.php';
    }


    protected function redirect(string $url): never
    {
        header("Location: $url");
        exit;
    }

    protected function isPost(): bool
    {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }

    protected function flash(string $type, string $message): void
    {
        $_SESSION['flash'][$type] = $message;
    }

    protected function generateCsrfToken(): string
    {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    protected function verifyCsrfToken(): bool
    {
        if (empty($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
            return false;
        }
        return true;
    }
}
