<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require 'conexao.php'; // Arquivo com conexão ao banco

    $token = $_POST['token'] ?? '';
    $newPassword = $_POST['newPassword'];

    if (empty($token) || empty($newPassword)) {
        die("Token ou nova senha ausente.");
    }

    // Validar o token (implementação depende do seu sistema)
    $stmt = $connection->prepare("SELECT user_id FROM password_reset WHERE token = ? AND expires_at > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        $hashed = password_hash($newPassword, PASSWORD_DEFAULT);

        $stmt = $connection->prepare("UPDATE users SET user_password = ? WHERE user_id = ?");
        $stmt->bind_param("si", $hashed, $user['user_id']);
        $stmt->execute();

        // Remover o token
        $stmt = $connection->prepare("DELETE FROM password_reset WHERE token = ?");
        $stmt->bind_param("s", $token);
        $stmt->execute();

        echo "Senha atualizada com sucesso!";
    } else {
        echo "Token inválido ou expirado.";
    }
}
?>
