<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';
require '../phpmailer/Exception.php';

$mail = new PHPMailer(true);

try {
    // Configurações do servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'healgrupo@gmail.com'; // Seu e-mail
    $mail->Password = 'secret'; // Senha de app do Gmail
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $email = trim($_POST['email']);
    

    // Remetente e destinatário
    $mail->setFrom('healgrup@gmail.com', 'Heal');
    $mail->addAddress($email); // Substitua com o e-mail do usuário

    // Conteúdo do e-mail
    $mail->isHTML(true);
    $mail->Subject = 'Recuperação de senha';
    $mail->Body = "Olá!<br>Para redefinir sua senha, clique no link abaixo:<br><a href='$link'>$link</a>";

    $mail->send();
    echo 'E-mail enviado com sucesso!';
} catch (Exception $e) {
    echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
}
?>
