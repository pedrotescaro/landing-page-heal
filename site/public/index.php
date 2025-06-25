<?php
// CORS headers – adicione no topo do arquivo
header("Access-Control-Allow-Origin: *"); // ou substitua * pelo domínio específico, ex: http://localhost:3000
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 86400");

// Responder requisição OPTIONS (pré-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Sem conteúdo
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';

use src\routes\Routes;
use src\controller\AnamneseController;

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

// Rota de teste (GET)
$router->add('GET', 'site/public/index.php/hello', 
    [new AnamneseController(), 'hello']);

// Iniciar o roteador
$router->handlerRequest();
