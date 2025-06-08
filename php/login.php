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

if (!isset($_SESSION['user_id']) && isset($_COOKIE['remember_token'])) {
    $token = $_COOKIE['remember_token'];

    $connection = new mysqli($hostName, $user, $pass, $dataBase);
    if ($connection->connect_error) {
        die("Conexão falhou: " . $connection->connect_error);
    }
    $connection->set_charset("utf8mb4");

    $stmt = $connection->prepare("SELECT user_id, user_name FROM users WHERE remember_token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['user_name'] = $user['user_name'];

        // Redireciona para home (ou onde quiser)
        header("Location: ../index.php");
        exit;
    }
    $stmt->close();
    $connection->close();
}

// Processa login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $remember = isset($_POST['remember']);

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

                if ($remember) {
                    // Gerar token seguro
                    $token = bin2hex(random_bytes(32));

                    // Salvar token no banco
                    $update = $connection->prepare("UPDATE users SET remember_token = ? WHERE user_id = ?");
                    $update->bind_param("si", $token, $user['user_id']);
                    $update->execute();

                    // Definir cookie válido por 30 dias (ajuste conforme quiser)
                    setcookie("remember_token", $token, time() + (30 * 24 * 60 * 60), "/", "", true, true);
                }

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

