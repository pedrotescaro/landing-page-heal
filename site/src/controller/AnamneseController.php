<?php
namespace src\controller;

use src\service\AnamneseService;

header('Content-Type: application/json');
class AnamneseController {
    private AnamneseService $service;

    // Injeção de dependência via construtor
    public function __construct(AnamneseService $service) {
        $this->service = $service;
    }

    /**
     * Serve a view HTML do formulário de anamnese (GET)
     */
    public function viewForm() {
        require __DIR__ . '/../view/formulario.html';
    }

    /**
     * Cria uma nova anamnese (POST)
     */
    public function save() {
        $dados = json_decode(file_get_contents("php://input"), true);
        $success = $this->service->saveAnamnese($dados);
        if ($success) {
            $id = $success;
            $anamneseSalva = $this->service->buscarPorId($id);
            $this->jsonResponse([
                "status" => "success",
                "message" => "Anamnese criada com sucesso",
                "data" => $anamneseSalva
            ]);
        } else {
            $this->jsonResponse([
                "status" => "error",
                "message" => "Erro ao criar anamnese"
            ], 500);
        }
    }

    /**
     * Lista todas as anamneses (GET)
     */
    public function findAll() {
        $resultados = $this->service->listarAnamneses();
        $this->jsonResponse($resultados);
    }

    /**
     * Busca uma anamnese por ID (GET)
     */
    public function buscarPorId($id) {
        $anamnese = $this->service->buscarPorId((int)$id);
        if ($anamnese) {
            $this->jsonResponse($anamnese);
        } else {
            $this->jsonResponse([
                "status" => "error",
                "message" => "Anamnese não encontrada"
            ], 404);
        }
    }

    /**
     * Atualiza uma anamnese existente (PUT)
     */
    public function update($id) {
    try {
        // Decodifica os dados recebidos no corpo da requisição
        $dados = json_decode(file_get_contents("php://input"), true);

        // Chama o serviço para tentar atualizar os dados
        $success = $this->service->atualizarAnamnese((int)$id, $dados);

        if ($success) {
            // Se a atualização for bem-sucedida, retorna uma resposta de sucesso.
            $this->jsonResponse([
                "status" => "success",
                "message" => "Anamnese atualizada com sucesso"
            ]);
        } else {
            // Se o serviço retornar 'false', indica um erro nos dados enviados.
            // O código 400 (Bad Request) é mais apropriado que 500 aqui.
            $this->jsonResponse([
                "status" => "error",
                "message" => "Não foi possível atualizar. Verifique se os dados estão corretos."
            ], 400);
        }

    } catch (\Throwable $e) {
        // Captura QUALQUER erro ou exceção que ocorrer no bloco 'try'.
        // Isso impede que o PHP gere uma resposta HTML.

        // (Opcional, mas recomendado) Registra o erro real no log do servidor para você depurar.
        error_log("Erro ao atualizar anamnese: " . $e->getMessage());

        // Envia uma resposta JSON genérica e segura para o cliente.
        $this->jsonResponse([
            "status" => "error",
            "message" => "Ocorreu um erro interno no servidor."
        ], 500);
    }
}

    /**
     * Exclui uma anamnese (DELETE)
     */
    public function deletar($id) {
        if ($this->service->excluirAnamnese((int)$id)) {
            $this->jsonResponse([
                "status" => "success",
                "message" => "Anamnese excluída com sucesso"
            ]);
        } else {
            $this->jsonResponse([
                "status" => "error",
                "message" => "Erro ao excluir anamnese"
            ], 500);
        }
    }

    //função de teste 
    public function hello() {
        echo "Olá! Método hello() funcionando.";
    }

    // Método utilitário para resposta JSON padronizada
    private function jsonResponse($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
