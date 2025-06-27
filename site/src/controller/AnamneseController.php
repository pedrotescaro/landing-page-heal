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
        $dados = json_decode(file_get_contents("php://input"), true);
        if ($this->service->atualizarAnamnese((int)$id, $dados)) {
            $this->jsonResponse([
                "status" => "success",
                "message" => "Anamnese atualizada com sucesso"
            ]);
        } else {
            $this->jsonResponse([
                "status" => "error",
                "message" => "Erro ao atualizar anamnese"
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
