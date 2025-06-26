<?php
$hostName = "localhost";
$dataBase = "paciente";
$user = "root";
$pass = "";

$connection = new mysqli($hostName, $user, $pass, $dataBase);

if ($connection->connect_error) {
    die("Conexão falhou: " . $connection->connect_error);
}

$connection->set_charset("utf8mb4");
?>
