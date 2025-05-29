<?php

require_once 'Anamnese.php';
require_once 'AnamneseRepository.php';
require_once 'AnamneseService.php';
require_once 'AnamneseController.php';

class Route {
    private $host = 'localhost';
    private $db_name = 'paciente';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new \PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8mb4");
        } catch(\PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

$repository = new AnamneseRepository($conn);
$service = new AnamneseService($repository);
$controller = new AnamneseController($service);

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if ($method == 'POST' && strpos($uri, '/anamnese/criar') !== false) {
    $postData = $_POST;
    echo $controller->criar($postData);

} elseif ($method == 'GET' && preg_match('/\/anamnese\/buscar\/(\d+)/', $uri, $matches)) {
    $id = $matches[1];
    echo $controller->buscar($id);

} elseif ($method == 'GET' && strpos($uri, '/anamnese/listar') !== false) {
    echo $controller->listar();

} elseif ($method == 'DELETE' && preg_match('/\/anamnese\/excluir\/(\d+)/', $uri, $matches)) {
    $id = $matches[1];
    echo $controller->excluir($id);

} else {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Rota não encontrada.']);
}

$conn->close();
?>
