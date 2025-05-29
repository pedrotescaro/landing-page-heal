<?php
     require_once 'connect.php';

     $id = $_GET['user_id'];

     if($_SESSION['REQUEST_METHOD' === 'POST']){

        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm-password'];

        //Validações
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("Email inválido.");
        }

        if ($password !== $confirm_password) {
            die("As senhas não conferem.");
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Verifica se email já existe
        $sql_check = "SELECT user_email FROM `users` WHERE user_email = ?";
        $stmt_check = $connection->prepare($sql_check);
        if (!$stmt_check) {
            die("Erro no prepare: " . $connection->error);
        }
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            die("Este email já está cadastrado.");
        }
        $stmt_check->close();


        // Atualiza usuário
        $sql = "UPDATE `users` SET user_name=?, user_email=?, user_password=? WHERE id =?";
        $stmt = $connection->prepare($sql);
        if (!$stmt) {
            die("Erro no prepare: " . $connection->error);
        }
        $stmt->bind_param("sssi", $name, $email, $hashed_password, $id);

        if ($stmt->execute()) {
            echo "Cadastro atualizado com sucesso! <a href='../login.html'>Ir para login</a>";
        } else {
            echo "Erro na atualização: " . $stmt->error;
        }

        $stmt->close();
        $connection->close();

        } else {
            echo "Método inválido.";
    }
   