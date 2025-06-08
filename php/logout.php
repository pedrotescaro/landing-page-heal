<?php
session_start();

// Limpa todas as variáveis da sessão
$_SESSION = array();

// Destrói a sessão
session_destroy();

// Apagar cookie (tempo passado)
setcookie("remember_token", "", time() - 3600, "/", "", true, true);

// Redireciona para a página de login
header("Location: ../index.php");
exit;
