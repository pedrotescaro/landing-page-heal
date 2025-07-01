<?php
// app/Models/User.php

namespace src\model\entity;

class User
{
    private $id;
    private $name;
    private $email;
    private $password; // Armazena a senha já hashed
    private $phone;
    private $dateOfBirth;
    private $profession;
    private $maritalStatus;
    private $coren;
    private $avatarUrl;
    private $createdAt;

    public function __construct(
        string $name, 
        string $email, 
        string $password, 
        ?string $phone = null,
        ?string $dateOfBirth = null,
        ?string $profession = null,
        ?string $maritalStatus = null,
        ?string $coren = null,
        ?string $avatarUrl = null,
        ?int $id = null,
        ?string $createdAt = null
    ) {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->phone = $phone;
        $this->dateOfBirth = $dateOfBirth;
        $this->profession = $profession;
        $this->maritalStatus = $maritalStatus;
        $this->coren = $coren;
        $this->avatarUrl = $avatarUrl;
        $this->id = $id;
        $this->createdAt = $createdAt;
    }

    // Getters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getDateOfBirth(): ?string
    {
        return $this->dateOfBirth;
    }

    public function getProfession(): ?string
    {
        return $this->profession;
    }

    public function getMaritalStatus(): ?string
    {
        return $this->maritalStatus;
    }

    public function getCoren(): ?string
    {
        return $this->coren;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function getCreatedAt(): ?string
    {
        return $this->createdAt;
    }

    // Setters
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    public function setDateOfBirth(?string $dateOfBirth): void
    {
        $this->dateOfBirth = $dateOfBirth;
    }

    public function setProfession(?string $profession): void
    {
        $this->profession = $profession;
    }

    public function setMaritalStatus(?string $maritalStatus): void
    {
        $this->maritalStatus = $maritalStatus;
    }

    public function setCoren(?string $coren): void
    {
        $this->coren = $coren;
    }

    public function setAvatarUrl(?string $avatarUrl): void
    {
        $this->avatarUrl = $avatarUrl;
    }

    public function setCreatedAt(?string $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    // Método para converter para array (útil para APIs)
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'dateOfBirth' => $this->dateOfBirth,
            'profession' => $this->profession,
            'maritalStatus' => $this->maritalStatus,
            'coren' => $this->coren,
            'avatarUrl' => $this->avatarUrl,
            'createdAt' => $this->createdAt
        ];
    }
}