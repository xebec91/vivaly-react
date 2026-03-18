<?php

namespace App\Controller;

use App\Model\User\User;
use App\Model\User\UserDAO;

class UserController extends AbstractController
{
    public function register(): void
    {
        if ($this->isPost()) {
            if ($this->verifyCsrfToken()) {
                // Validation des champs requis
                $requiredFields = ['first_name', 'last_name', 'email', 'password', 'confirm', 'phone_number', 'address_line1', 'postal_code', 'city', 'country'];
                foreach ($requiredFields as $field) {
                    if (empty($_POST[$field])) {
                        $this->flash('error', "Tous les champs obligatoires doivent être remplis.");
                        $this->redirect(url('user/register'));
                    }
                }

                $firstName = trim($_POST['first_name']);
                $lastName = trim($_POST['last_name']);
                $email = trim($_POST['email']);
                $password = $_POST['password'];
                $confirm = $_POST['confirm'];
                $phoneNumber = trim($_POST['indicatif'] . $_POST['phone_number']);
                $addressLine1 = trim($_POST['address_line1']);
                $addressLine2 = trim($_POST['address_line2'] ?? '');
                $postalCode = trim($_POST['postal_code']);
                $city = trim($_POST['city']);
                $country = trim($_POST['country']);
                $cgvAccepted = isset($_POST['cgv']);

                // Validation de l'email
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $this->flash('error', "L'adresse email n'est pas valide.");
                    $this->redirect(url('user/register'));
                }

                // Validation du mot de passe (au moins 8 caractères)
                if (strlen($password) < 8) {
                    $this->flash('error', "Le mot de passe doit contenir au moins 8 caractères.");
                    $this->redirect(url('user/register'));
                }

                // Vérification que l'email n'existe pas déjà
                if ((new UserDAO())->findByEmail($email)) {
                    $this->flash('error', "Cet email est déjà utilisé.");
                    $this->redirect(url('user/register'));
                }

                // Vérification de la correspondance des mots de passe
                if ($password !== $confirm) {
                    $this->flash('error', "Les mots de passe ne correspondent pas.");
                    $this->redirect(url('user/register'));
                }

                // Validation du numéro de téléphone (9 à 15 chiffres après l'indicatif)
                if (!preg_match('/^\+[0-9]{1,3}[0-9]{9,15}$/', $phoneNumber)) {
                    $this->flash('error', "Le numéro de téléphone n'est pas valide.");
                    $this->redirect(url('user/register'));
                }

                // Validation du code postal (exemple : 5 chiffres, à adapter selon le pays)
                if (!preg_match('/^[0-9]{5}$/', $postalCode)) {
                    $this->flash('error', "Le code postal n'est pas valide.");
                    $this->redirect(url('user/register'));
                }

                // Validation des CGV
                if (!$cgvAccepted) {
                    $this->flash('error', "Vous devez accepter les CGV et la politique de confidentialité.");
                    $this->redirect(url('user/register'));
                }

                // Création de l'utilisateur
                $user = new User();
                $user->setFirstName($firstName);
                $user->setLastName($lastName);
                $user->setEmail($email);
                $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
                $user->setPhoneNumber($phoneNumber);
                $user->setCgvAccepted($cgvAccepted);
                $user->setAddressLine1($addressLine1);
                $user->setAddressLine2($addressLine2);
                $user->setPostalCode($postalCode);
                $user->setCity($city);
                $user->setCountry($country);

                (new UserDAO())->create($user);
                $this->flash('success', "Compte créé. Vous pouvez vous connecter.");
                $this->redirect(url('user/login'));
            }
        }

        // Récupérer les pays et indicatifs via API
        $countries = $this->fetchCountries();
        $title = "Inscription";
        $csrfToken = $this->generateCsrfToken();
        $this->view('user/register', [
            'title' => $title,
            'csrfToken' => $csrfToken,
            'countries' => $countries
        ]);
    }

    private function fetchCountries(): array
    {
        try {
            $response = file_get_contents('https://restcountries.com/v3.1/all?fields=name,idd');
            $countries = json_decode($response, true);
            usort($countries, fn($a, $b) => strcmp($a['name']['common'], $b['name']['common']));
            return $countries;
        } catch (\Exception $e) {
            $this->flash('error', "Impossible de charger les pays/indicatifs.");
            return [];
        }
    }

    public function login(): void
    {
        if ($this->isPost()) {
            $email = $_POST['email'];
            $password = $_POST['password'];

            $user = (new UserDAO())->findByEmail($email);

            if (!$user || !password_verify($password, $user->getPassword())) {
                $this->flash('error', "Identifiants incorrects.");
                $this->redirect(url('user/login'));
            }

            $_SESSION['user'] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'first_name' => $user->getFirstName(),
                'last_name' => $user->getLastName()
            ];

            $this->flash('success', "Connexion réussie !");
            $this->redirect(url('/'));
        }

        $title = "Connexion";
        $this->view('user/login', ['title' => $title]);
    }

    public function logout(): void
    {
        session_destroy();
        $this->flash('success', "Déconnexion réussie.");
        $this->redirect(url('/'));
    }

    public function account(): void
    {
        // Vérifier que l'utilisateur est connecté
        if (!is_logged_in()) {
            $this->redirect(url('user/login'));
        }

        $userDAO = new \App\Model\User\UserDAO();
        $user = $userDAO->findById($_SESSION['user']['id']);

        if ($this->isPost()) {
            $email = trim($_POST['email']);
            $password = $_POST['password'];

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->flash('error', 'Email invalide.');
            } else {
                $user->setEmail($email);
                if (!empty($password)) {
                    $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
                }
                $userDAO->update($user);
                $_SESSION['user']['email'] = $email;
                $this->flash('success', 'Compte mis à jour.');
                $this->redirect(url('user/account'));
            }
        }

        $title = "Mon compte";
        $this->view('user/account', compact('title', 'user'));
    }
}