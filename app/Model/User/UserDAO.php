<?php

namespace App\Model\User;

use App\Core\Database;
use PDO;

class UserDAO
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::getPDO();
    }

    public function create(User $user): void
    {
        // Insérer dans la table users
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (first_name, last_name, email, password, phone_number, cgv_accepted, role) 
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $user->getFirstName(),
            $user->getLastName(),
            $user->getEmail(),
            $user->getPassword(),
            $user->getPhoneNumber(),
            $user->getCgvAccepted() ? 1 : 0,
            $user->getRole()
        ]);

        // Récupérer l'ID de l'utilisateur créé
        $userId = $this->pdo->lastInsertId();

        // Insérer l'adresse dans la table addresses
        if ($user->getAddressLine1() && $user->getPostalCode() && $user->getCity() && $user->getCountry()) {
            $stmt = $this->pdo->prepare(
                "INSERT INTO addresses (id_user, address_line1, address_line2, postal_code, city, country) 
                 VALUES (?, ?, ?, ?, ?, ?)"
            );
            $stmt->execute([
                $userId,
                $user->getAddressLine1(),
                $user->getAddressLine2(),
                $user->getPostalCode(),
                $user->getCity(),
                $user->getCountry()
            ]);
        }
    }

    public function findByEmail(string $email): ?User
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $data = $stmt->fetch();

        if (!$data) return null;

        return $this->map($data);
    }

    public function findById(int $id): ?User
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $data = $stmt->fetch();

        if (!$data) return null;

        return $this->map($data);
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM users");
        $users = [];
        while ($data = $stmt->fetch()) {
            $users[] = $this->map($data);
        }
        return $users;
    }

    public function update(User $user): void
    {
        $stmt = $this->pdo->prepare(
            "UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?"
        );
        $stmt->execute([
            $user->getEmail(),
            $user->getPassword(),
            $user->getRole(),
            $user->getId()
        ]);
    }

    public function delete(int $id): void
    {
        // Supprime l'utilisateur et ses adresses associées (grâce au ON DELETE CASCADE)
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$id]);
    }

    private function map(array $data): User
    {
        $user = new User();
        $user->setFirstName($data['first_name']);
        $user->setLastName($data['last_name']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setPhoneNumber($data['phone_number']);
        $user->setCgvAccepted($data['cgv_accepted'] == 1);
        $user->setRole($data['role']);

        $ref = new \ReflectionProperty(User::class, 'id');
        $ref->setAccessible(true);
        $ref->setValue($user, $data['id']);

        // Récupérer l'adresse associée
        $stmt = $this->pdo->prepare("SELECT * FROM addresses WHERE id_user = ? LIMIT 1");
        $stmt->execute([$data['id']]);
        $addressData = $stmt->fetch();

        if ($addressData) {
            $user->setAddressLine1($addressData['address_line1']);
            $user->setAddressLine2($addressData['address_line2']);
            $user->setPostalCode($addressData['postal_code']);
            $user->setCity($addressData['city']);
            $user->setCountry($addressData['country']);
        }

        return $user;
    }
}