<?php
// app/Repositories/UserRepository.php

namespace src\model\repository;

use src\config\Connection;
use src\model\entity\User;
use PDO;

class UserRepository
{
    private $conn;
    private $table = "users";

    public function __construct()
    {
        $db = new Connection();
        $this->conn = $db->getConnection();
    }

    public function findAll(): array {
        $stmt = $this->conn->query("SELECT * FROM {$this->table}");
        $users = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $users[] = $this->createUserFromRow($row);
        }
        return $users;
    }

    public function findById(int $user_id): ?User {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return $this->createUserFromRow($row);
        }
        return null;
    }

    public function findByEmail(string $user_email): ?User {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE user_email = :user_email");
        $stmt->bindParam(':user_email', $user_email, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return $this->createUserFromRow($row);
        }
        return null;
    }

    public function save(User $user): bool {
        $stmt = $this->conn->prepare("
            INSERT INTO {$this->table} 
            (user_name, user_email, user_password, user_phone, user_date_of_birth, user_profession, user_marital_status, user_coren, user_avatar_url) 
            VALUES 
            (:user_name, :user_email, :user_password, :user_phone, :user_date_of_birth, :user_profession, :user_marital_status, :user_coren, :user_avatar_url)
        ");

        $name = $user->getName();
        $email = $user->getEmail();
        $password = $user->getPassword();
        $phone = $user->getPhone();
        $dateOfBirth = $user->getDateOfBirth();
        $profession = $user->getProfession();
        $maritalStatus = $user->getMaritalStatus();
        $coren = $user->getCoren();
        $avatarUrl = $user->getAvatarUrl();

        $stmt->bindParam(':user_name', $name);
        $stmt->bindParam(':user_email', $email);
        $stmt->bindParam(':user_password', $password);
        $stmt->bindParam(':user_phone', $phone);
        $stmt->bindParam(':user_date_of_birth', $dateOfBirth);
        $stmt->bindParam(':user_profession', $profession);
        $stmt->bindParam(':user_marital_status', $maritalStatus);
        $stmt->bindParam(':user_coren', $coren);
        $stmt->bindParam(':user_avatar_url', $avatarUrl);

        return $stmt->execute();
    }

    public function update(User $user): bool {
        $stmt = $this->conn->prepare("
            UPDATE {$this->table} 
            SET user_name = :user_name, 
                user_email = :user_email, 
                user_password = :user_password,
                user_phone = :user_phone,
                user_date_of_birth = :user_date_of_birth,
                user_profession = :user_profession,
                user_marital_status = :user_marital_status,
                user_coren = :user_coren,
                user_avatar_url = :user_avatar_url
            WHERE user_id = :user_id
        ");
        
        $stmt->bindParam(':user_name', $user->getName(), PDO::PARAM_STR);
        $stmt->bindParam(':user_email', $user->getEmail(), PDO::PARAM_STR);
        $stmt->bindParam(':user_password', $user->getPassword(), PDO::PARAM_STR);
        $stmt->bindParam(':user_phone', $user->getPhone(), PDO::PARAM_STR);
        $stmt->bindParam(':user_date_of_birth', $user->getDateOfBirth(), PDO::PARAM_STR);
        $stmt->bindParam(':user_profession', $user->getProfession(), PDO::PARAM_STR);
        $stmt->bindParam(':user_marital_status', $user->getMaritalStatus(), PDO::PARAM_STR);
        $stmt->bindParam(':user_coren', $user->getCoren(), PDO::PARAM_STR);
        $stmt->bindParam(':user_avatar_url', $user->getAvatarUrl(), PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user->getId(), PDO::PARAM_INT);
        
        return $stmt->execute();
    }

    public function updateProfile(User $user): bool {
        $stmt = $this->conn->prepare("
            UPDATE {$this->table} 
            SET user_name = :user_name, 
                user_phone = :user_phone,
                user_date_of_birth = :user_date_of_birth,
                user_profession = :user_profession,
                user_marital_status = :user_marital_status,
                user_coren = :user_coren,
                user_avatar_url = :user_avatar_url
            WHERE user_id = :user_id
        ");
        
        $stmt->bindParam(':user_name', $user->getName(), PDO::PARAM_STR);
        $stmt->bindParam(':user_phone', $user->getPhone(), PDO::PARAM_STR);
        $stmt->bindParam(':user_date_of_birth', $user->getDateOfBirth(), PDO::PARAM_STR);
        $stmt->bindParam(':user_profession', $user->getProfession(), PDO::PARAM_STR);
        $stmt->bindParam(':user_marital_status', $user->getMaritalStatus(), PDO::PARAM_STR);
        $stmt->bindParam(':user_coren', $user->getCoren(), PDO::PARAM_STR);
        $stmt->bindParam(':user_avatar_url', $user->getAvatarUrl(), PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user->getId(), PDO::PARAM_INT);
        
        return $stmt->execute();
    }

    public function delete(int $user_id): bool {
        $stmt = $this->conn->prepare("DELETE FROM {$this->table} WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function createUserFromRow(array $row): User {
        return new User(
            $row['user_name'],
            $row['user_email'],
            $row['user_password'],
            $row['user_phone'] ?? null,
            $row['user_date_of_birth'] ?? null,
            $row['user_profession'] ?? null,
            $row['user_marital_status'] ?? null,
            $row['user_coren'] ?? null,
            $row['user_avatar_url'] ?? null,
            $row['user_id'] ?? null,
            $row['created_at'] ?? null
        );
    }
}
