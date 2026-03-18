<?php

namespace App\Middleware;

class AuthMiddleware
{
    public static function requireAuth(): void
    {
        if (empty($_SESSION['user'])) {
            $_SESSION['flash']['error'] = "Vous devez être connecté.";
            header("Location: " . url('user/login'));
            exit;
        }
    }

    public static function requireAdmin(): void
    {
        if (empty($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
            $_SESSION['flash']['error'] = "Accès réservé aux administrateurs.";
            header("Location: " . url('/'));
            exit;
        }
    }
}
