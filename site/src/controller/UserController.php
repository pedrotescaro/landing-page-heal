<?php
namespace src\controller;

use src\service\UserService;
// Remova 'use config\connection;' se não estiver usando diretamente no UserController.
// Geralmente, conexão é tratada na camada de Repository.

class UserController {
    private UserService $service;

    public function __construct() {
        // O ideal é injetar a dependência: public function __construct(UserService $service)
        // Mas se a estrutura atual exige, instancie aqui.
        $this->service = new UserService();
    }

    public function register() {
        // Define o Content-Type para JSON para todas as respostas deste método.
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents("php://input"), true);

        // Adiciona um tratamento para garantir que as chaves existam,
        // mesmo que o frontend já as envie. Isso evita "Undefined array key".
        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $confirmPassword = $data['confirm-password'] ?? null; // CHAVE CORRIGIDA

        try {
            // Passa as variáveis tratadas para o serviço
            if ($this->service->register($name, $email, $password, $confirmPassword)) {
                http_response_code(201); // 201 Created para sucesso no cadastro
                echo json_encode([
                    "status" => "success", // AGORA INCLUI A CHAVE STATUS
                    "message" => "Usuário cadastrado com sucesso"
                ]);
            } else {
                // Este else só é alcançado se o serviço retornar false sem lançar exceção.
                // O ideal é que o serviço sempre lance exceção em caso de falha.
                http_response_code(500);
                echo json_encode([
                    "status" => "error", // Adicionado "status"
                    "message" => "Erro desconhecido ao cadastrar o usuário."
                ]);
            }
        } catch (\InvalidArgumentException $e) { // Para validações de input
            http_response_code(400); // 400 Bad Request
            echo json_encode([
                "status" => "error", // Adicionado "status"
                "message" => $e->getMessage()
            ]);
        } catch (\Exception $e) { // Para outros erros, como e-mail duplicado
            // Se o erro for de e-mail duplicado, 409 Conflict é mais apropriado.
            $statusCode = ($e->getMessage() === "Este email já está cadastrado.") ? 409 : 500;
            http_response_code($statusCode);
            echo json_encode([
                "status" => "error", // Adicionado "status"
                "message" => $e->getMessage() // Ou uma mensagem mais genérica em produção
            ]);
        }
    }

    public function list() {
        header('Content-Type: application/json');
        echo json_encode($this->service->getAll());
    }

    public function delete($id) {
        header('Content-Type: application/json');
        if ($this->service->delete($id)) {
            echo json_encode([
                "status" => "success",
                "message" => "Usuário deletado"
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Usuário não encontrado"
            ]);
        }
    }

    public function update($id) {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents("php://input"), true);

        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        // Se 'confirm-password' for enviado para update, trate aqui também
        // $confirmPassword = $data['confirm-password'] ?? null;

        try {
            // Certifique-se de que o método update do service aceita os parâmetros corretamente
            if ($this->service->update($id, $name, $email, $password)) {
                 echo json_encode([
                    "status" => "success",
                    "message" => "Usuário atualizado"
                ]);
            } else {
                 http_response_code(500);
                 echo json_encode([
                    "status" => "error",
                    "message" => "Erro desconhecido ao atualizar o usuário."
                ]);
            }
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }

    public function login() {
        // Inicia a sessão se ainda não estiver iniciada.
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        header('Content-Type: application/json'); // Garante que a resposta será JSON

        $data = json_decode(file_get_contents("php://input"), true);
        
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        try {
            $user = $this->service->login($email, $password); // Chama o método login do UserService
            
            // Login bem-sucedido: Armazena dados na sessão
            $_SESSION['user_id'] = $user->getId();
            $_SESSION['user_name'] = $user->getName();
            $_SESSION['user_email'] = $user->getEmail(); // Adicionado para consistência

            echo json_encode([
                "status" => "success", // Adicionado "status"
                "message" => "Login realizado com sucesso!",
                "redirect" => "/landing-page.html" // Sugere redirecionamento para o frontend
            ]);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400); // Bad Request
            echo json_encode([
                "status" => "error", // Adicionado "status"
                "message" => $e->getMessage()
            ]);
        } catch (\Exception $e) {
            http_response_code(401); // Unauthorized (para credenciais inválidas)
            echo json_encode([
                "status" => "error", // Adicionado "status"
                "message" => "Erro no login: " . $e->getMessage()
            ]);
        }
    }

    // Você precisará de um método logout se este UserController for responsável por ele
    public function logout(): void
    {
        // Certifique-se que session_start() já foi chamado (pode ser no init.php)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $this->service->logout(); // Assume que UserService tem um método logout()
        // Após logout, redireciona o cliente via JS no frontend, ou força aqui.
        // Para uma API, o ideal é retornar JSON e o frontend redirecionar.
        // Para um logout direto do PHP, um header("Location: /index.html"); exit; seria usado.
        header('Content-Type: application/json');
        echo json_encode([
            "status" => "success",
            "message" => "Logout realizado com sucesso.",
            "redirect" => "/landing-page.html"
        ]);
        exit; // Garante que nenhum outro output seja enviado.
    }
}
