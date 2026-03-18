<?php

namespace App\Model\User;

class User
{
    private ?int $id = null;
    private string $firstName;
    private string $lastName;
    private string $email;
    private string $password;
    private ?string $phoneNumber = null;
    private bool $cgvAccepted = false;
    private string $role = 'user';
    private ?string $addressLine1 = null;
    private ?string $addressLine2 = null;
    private ?string $postalCode = null;
    private ?string $city = null;
    private ?string $country = null;

    public function getId(): ?int { return $this->id; }
    public function getFirstName(): string { return $this->firstName; }
    public function getLastName(): string { return $this->lastName; }
    public function getEmail(): string { return $this->email; }
    public function getPassword(): string { return $this->password; }
    public function getPhoneNumber(): ?string { return $this->phoneNumber; }
    public function getCgvAccepted(): bool { return $this->cgvAccepted; }
    public function getRole(): string { return $this->role; }
    public function getAddressLine1(): ?string { return $this->addressLine1; }
    public function getAddressLine2(): ?string { return $this->addressLine2; }
    public function getPostalCode(): ?string { return $this->postalCode; }
    public function getCity(): ?string { return $this->city; }
    public function getCountry(): ?string { return $this->country; }

    public function setFirstName(string $firstName): void { $this->firstName = $firstName; }
    public function setLastName(string $lastName): void { $this->lastName = $lastName; }
    public function setEmail(string $email): void { $this->email = $email; }
    public function setPassword(string $password): void { $this->password = $password; }
    public function setPhoneNumber(?string $phoneNumber): void { $this->phoneNumber = $phoneNumber; }
    public function setCgvAccepted(bool $cgvAccepted): void { $this->cgvAccepted = $cgvAccepted; }
    public function setRole(string $role): void { $this->role = $role; }
    public function setAddressLine1(?string $addressLine1): void { $this->addressLine1 = $addressLine1; }
    public function setAddressLine2(?string $addressLine2): void { $this->addressLine2 = $addressLine2; }
    public function setPostalCode(?string $postalCode): void { $this->postalCode = $postalCode; }
    public function setCity(?string $city): void { $this->city = $city; }
    public function setCountry(?string $country): void { $this->country = $country; }

    public function isAdmin(): bool { return $this->role === 'admin'; }
}