<?php
class User {
    public $id;
    public $email;
    public $password;
    public $created_at;

    public function __construct($email, $password) {
        $this->email = $email;
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }
}
?>
