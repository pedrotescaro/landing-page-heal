<?php
require_once __DIR__ . '/../vendor/autoload.php';

use src\routes\Routes;
use src\controller\AnamneseController;

$router = new Routes();

// Definindo rotas da API

// Criar um anamnese (POST)    
$router->add('POST', '/site/public/index.php/api/anamnese', 
    [new AnamneseController(), 'save']);

// Listar todos os anamneses (GET)
$router->add('GET', '/site/public/index.php/api/anamnese', 
    [new AnamneseController(), 'findAll']);

// Visualizar um Anamnese pelo ID (GET)
$router->add('GET', '/site/public/index.php/api/anamnese/{id}', 
    [new AnamneseController(), 'visualizar']);

// Atualizar um Anamnese (PUT)
$router->add('PUT', '/site/public/index.php/api/anamnese/{id}', 
    [new AnamneseController(), 'atualizar']);

// Deletar um Anamnese (DELETE)
$router->add('DELETE', '/site/public/index.php/api/anamnese/{id}', 
    [new AnamneseController(), 'deletar']);

// Rota de teste (GET)
$router->add('GET', '/site/public/index.php/hello', 
    [new AnamneseController(), 'hello']);

// Iniciar o roteador
$router->handlerRequest();
