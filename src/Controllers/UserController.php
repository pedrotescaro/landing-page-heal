<?php
require_once 'models/Entity/User.php';

class UserController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createUser($email, $password) {
        $user = new User($email, $password);
        $stmt = $this->conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $user->email, $user->password);
        return $stmt->execute();
    }

    public function getUserByEmail($email) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>
