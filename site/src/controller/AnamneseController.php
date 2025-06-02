<?php
namespace src\controller;

use src\service\AnamneseService;

header('Content-Type: application/json');
class AnamneseController {
    private AnamneseService $service;


    public function __construct() {
        $this->service = new AnamneseService();
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

            echo json_encode([
                "status" => "success",
                "message" => "Anamnese criada com sucesso",
                "data" => $anamneseSalva    
            ]);

        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao criar anamnese"
            ]);
        }
    }

    /**
     * Lista todas as anamneses (GET)
     */
    public function findAll() {
        $resultados = $this->service->listarAnamneses();
        echo json_encode($resultados);
    }

    /**
     * Busca uma anamnese por ID (GET)
     */
    public function buscarPorId($id) {
        $anamnese = $this->service->buscarPorId((int)$id);
        if ($anamnese) {
            echo json_encode($anamnese);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Anamnese não encontrada"
            ]);
        }
    }

    /**
     * Atualiza uma anamnese existente (PUT)
     */
    public function update($id) {
        $dados = json_decode(file_get_contents("php://input"), true);
        if ($this->service->atualizarAnamnese((int)$id, $dados)) {
            echo json_encode([
                "status" => "success",
                "message" => "Anamnese atualizada com sucesso"
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao atualizar anamnese"
            ]);
        }
    }

    /**
     * Exclui uma anamnese (DELETE)
     */
    public function deletar($id) {
        if ($this->service->excluirAnamnese((int)$id)) {
            echo json_encode([
                "status" => "success",
                "message" => "Anamnese excluida com sucesso"
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao excluir anamnese"
            ]);
        }
    }
    //funçao de teste 
    public function hello() {
        echo "Olá! Método hello() funcionando.";
    }
}
