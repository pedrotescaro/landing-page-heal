<?php
session_start();

// Conexão com o banco
$hostName = "localhost";
$dataBase = "paciente";
$user = "root";
$pass = "";

$connection = new mysqli($hostName, $user, $pass, $dataBase);
if ($connection->connect_error) {
    die("Conexão falhou: " . $connection->connect_error);
}
$connection->set_charset("utf8mb4");

// Processa login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $error = "Preencha email e senha.";
    } else {
        $sql = "SELECT user_id, user_name, user_password FROM users WHERE user_email = ?";
        $stmt = $connection->prepare($sql);
        if (!$stmt) {
            die("Erro no prepare: " . $connection->error);
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['user_password'])) {
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['user_name'] = $user['user_name'];
                header("Location: ../index.php");
                exit;
            } else {
                $error = "Senha incorreta.";
            }
        } else {
            $error = "Usuário não encontrado.";
        }
        $stmt->close();
    }
}
$connection->close();
?>

