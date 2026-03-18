<?php

namespace App\Controller\Api;

use App\Model\User\User;
use App\Model\User\UserDAO;

class AuthApiController
{
    private UserDAO $userDAO;

    public function __construct()
    {
        $this->userDAO = new UserDAO();
    }

    private function json(array $data, int $status = 200): void
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

    public function me(): void
    {
        if (empty($_SESSION['user'])) {
            $this->json([
                'authenticated' => false,
                'user' => null
            ]);
            return;
        }

        $this->json([
            'authenticated' => true,
            'user' => $_SESSION['user']
        ]);
    }

    public function login(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Méthode non autorisée'], 405);
            return;
        }

        $data = $this->getJsonInput();

        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if ($email === '' || $password === '') {
            $this->json(['error' => 'Email et mot de passe requis.'], 422);
            return;
        }

        $user = $this->userDAO->findByEmail($email);

        if (!$user || !password_verify($password, $user->getPassword())) {
            $this->json(['error' => 'Identifiants incorrects.'], 401);
            return;
        }

        $_SESSION['user'] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'role' => $user->getRole(),
            'first_name' => $user->getFirstName(),
            'last_name' => $user->getLastName()
        ];

        $this->json([
            'message' => 'Connexion réussie.',
            'user' => $_SESSION['user']
        ]);
    }

    public function register(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Méthode non autorisée'], 405);
            return;
        }

        $data = $this->getJsonInput();

        $firstName = trim($data['first_name'] ?? '');
        $lastName = trim($data['last_name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $confirm = $data['confirm'] ?? '';
        $phoneNumber = trim($data['phone_number'] ?? '');
        $addressLine1 = trim($data['address_line1'] ?? '');
        $addressLine2 = trim($data['address_line2'] ?? '');
        $postalCode = trim($data['postal_code'] ?? '');
        $city = trim($data['city'] ?? '');
        $country = trim($data['country'] ?? '');
        $cgvAccepted = !empty($data['cgv']);

        $requiredFields = [
            $firstName, $lastName, $email, $password, $confirm,
            $phoneNumber, $addressLine1, $postalCode, $city, $country
        ];

        foreach ($requiredFields as $field) {
            if ($field === '') {
                $this->json(['error' => 'Tous les champs obligatoires doivent être remplis.'], 422);
                return;
            }
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->json(['error' => "L'adresse email n'est pas valide."], 422);
            return;
        }

        if (strlen($password) < 8) {
            $this->json(['error' => 'Le mot de passe doit contenir au moins 8 caractères.'], 422);
            return;
        }

        if ($password !== $confirm) {
            $this->json(['error' => 'Les mots de passe ne correspondent pas.'], 422);
            return;
        }

        if ($this->userDAO->findByEmail($email)) {
            $this->json(['error' => 'Cet email est déjà utilisé.'], 409);
            return;
        }

        if (!$cgvAccepted) {
            $this->json(['error' => 'Vous devez accepter les CGV.'], 422);
            return;
        }

        $user = new User();
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setEmail($email);
        $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
        $user->setPhoneNumber($phoneNumber);
        $user->setCgvAccepted(true);
        $user->setAddressLine1($addressLine1);
        $user->setAddressLine2($addressLine2);
        $user->setPostalCode($postalCode);
        $user->setCity($city);
        $user->setCountry($country);

        $this->userDAO->create($user);

        $createdUser = $this->userDAO->findByEmail($email);

        $_SESSION['user'] = [
            'id' => $createdUser->getId(),
            'email' => $createdUser->getEmail(),
            'role' => $createdUser->getRole(),
            'first_name' => $createdUser->getFirstName(),
            'last_name' => $createdUser->getLastName()
        ];

        $this->json([
            'message' => 'Inscription réussie.',
            'user' => $_SESSION['user']
        ], 201);
    }

    public function logout(): void
    {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        session_destroy();

        $this->json(['message' => 'Déconnexion réussie.']);
    }
}