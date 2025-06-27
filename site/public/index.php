<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// CORS headers – adicione no topo do arquivo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Add all methods your API uses
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Add all custom headers you might send
header("Access-Control-Allow-Credentials: true"); // If you're sending cookies or authorization headers
header("Content-Type: application/json"); // Ensure this is set for your JSON responses
header("Access-Control-Max-Age: 86400");


// Responder requisição OPTIONS (pré-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Sem conteúdo
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';

use src\routes\Routes;
use src\controller\AnamneseController;
use src\controller\UserController;

$router = new Routes();

// Definindo rotas da API

// Criar um anamnese (POST)    
$router->add('POST', '/site/public/api/anamnese', 
    [new AnamneseController(), 'save']);

// Listar todos os anamneses (GET)
$router->add('GET', '/site/public/api/anamnese', 
    [new AnamneseController(), 'findAll']);

// Visualizar um Anamnese pelo ID (GET)
$router->add('GET', '/site/public/api/anamnese/{id}', 
    [new AnamneseController(), 'buscarPorId']);

// Atualizar um Anamnese (PUT)
$router->add('PUT', '/site/public/api/anamnese/{id}', 
    [new AnamneseController(), 'update']);

// Deletar um Anamnese (DELETE)
$router->add('DELETE', '/site/public/api/anamnese/{id}', 
    [new AnamneseController(), 'deletar']);

 // A rota POST para '/login' é onde o formulário envia os dados.
$router->add('POST', '/site/public/api/login', 
    [new UserController, 'login']);

// A rota POST para '/login' é onde o formulário envia os dados.
$router->add('POST', '/site/public/api/register', 
    [new UserController, 'register']);

// Rota de teste (GET)
$router->add('GET', 'site/public/index.php/hello', 
    [new AnamneseController(), 'hello']);

// Iniciar o roteador
$router->handlerRequest();
