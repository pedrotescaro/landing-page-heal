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
            $users[] = new User($row['user_name'], $row['user_email'], $row['user_password'], $row['user_id']);
        }
        return $users;
    }

    public function findById(int $user_id): ?User {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return new User($row['user_name'], $row['user_email'], $row['user_password'], $row['user_id']);
        }
        return null;
    }

    public function findByEmail(string $user_email): ?User {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE user_email = :user_email");
        $stmt->bindParam(':user_email', $user_email, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return new User($row['user_name'], $row['user_email'], $row['user_password'], $row['user_id']);
        }
        return null;
    }

    public function save(User $user): bool {
        $stmt = $this->conn->prepare("INSERT INTO {$this->table} (user_name, user_email, user_password) VALUES (:user_name, :user_email, :user_password)");

        $name = $user->getName();
        $email = $user->getEmail();
        $password = $user->getPassword();

        $stmt->bindParam(':user_name', $name);
        $stmt->bindParam(':user_email', $email);
        $stmt->bindParam(':user_password', $password);

 
        return $stmt->execute();
    }

    public function update(User $user): bool {
        $stmt = $this->conn->prepare("UPDATE {$this->table} SET user_name = :user_name, user_email = :user_email, user_password = :user_password WHERE user_id = :user_id");
        $stmt->bindParam(':user_name', $user->getName(), PDO::PARAM_STR);
        $stmt->bindParam(':user_email', $user->getEmail(), PDO::PARAM_STR);
        $stmt->bindParam(':user_password', $user->getPassword(), PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user->getId(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function delete(int $user_id): bool {
        $stmt = $this->conn->prepare("DELETE FROM {$this->table} WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
