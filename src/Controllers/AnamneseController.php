<?php
    require_once 'Models/Entity/Anamnese.php';
class AnamneseController {
    private $service;

    public function __construct(AnamneseService $service) {
        $this->service = $service;
    }

    // Criar nova anamnese
    public function criar($postData) {
        $anamnese = $this->service->criarAnamnese($postData);
        return json_encode([
            'status' => 'success',
            'message' => 'Anamnese criada com sucesso!',
            'data' => $anamnese
        ]);
    }

    // Buscar anamnese por ID
    public function buscar($id) {
        $anamnese = $this->service->buscarAnamnesePorId($id);
        if ($anamnese) {
            return json_encode([
                'status' => 'success',
                'data' => $anamnese
            ]);
        } else {
            return json_encode([
                'status' => 'error',
                'message' => 'Anamnese não encontrada.'
            ]);
        }
    }

    // Listar todas
    public function listar() {
        $anamneses = $this->service->listarTodasAnamneses();
        return json_encode([
            'status' => 'success',
            'data' => $anamneses
        ]);
    }

    // Deletar anamnese
    public function excluir($id) {
        $success = $this->service->excluirAnamnese($id);
        if ($success) {
            return json_encode([
                'status' => 'success',
                'message' => 'Anamnese excluída com sucesso.'
            ]);
        } else {
            return json_encode([
                'status' => 'error',
                'message' => 'Falha ao excluir anamnese.'
            ]);
        }
    }
}
?>
