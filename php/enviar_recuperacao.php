<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';
require '../phpmailer/Exception.php';

$mail = new PHPMailer(true);

// Recebe o e-mail do POST
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

if (empty($email)) {
    echo 'Email não informado.';
    exit;
}

// Aqui você pode validar se o e-mail existe no banco de dados antes de enviar

// Cria o link de redefinição (simples – ideal seria gerar token único no banco)
$token = bin2hex(random_bytes(32));
$link = "http://localhost/projeto-heal/redefinir-senha.html?token=$token"; // ou uma URL válida no seu domínio

// Você pode armazenar esse token no banco vinculado ao usuário e com tempo de expiração

try {
    // Configurações do servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'healgrupo@gmail.com'; // Seu e-mail
    $mail->Password = 'secret'; // Senha de app do Gmail
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Remetente e destinatário
    $mail->setFrom('healgrupo@gmail.com', 'Heal');
    $mail->addAddress($email);

    // Conteúdo do e-mail
    $mail->isHTML(true);
    $mail->Subject = 'Recuperação de senha - Heal';
    $mail->Body = "
        <p>Olá!</p>
        <p>Recebemos uma solicitação para redefinir sua senha.</p>
        <p>Para criar uma nova senha, clique no link abaixo:</p>
        <p><a href='$link'>$link</a></p>
        <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
    ";

    $mail->send();
    echo 'E-mail de recuperação enviado com sucesso!';
} catch (Exception $e) {
    echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
}
?>
