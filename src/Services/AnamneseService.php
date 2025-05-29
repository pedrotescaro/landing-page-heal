<?php
    require_once 'Repository/AnamneseRepository.php';   
class AnamneseService {
    private $repository;

    public function __construct(AnamneseRepository $repository) {
        $this->repository = $repository;
    }

    public function criarAnamnese($data) {
        $anamnese = new Anamnese($data);
        $this->repository->save($anamnese);
        return $anamnese;
    }

    public function buscarAnamnesePorId($id) {
        return $this->repository->findById($id);
    }

    public function listarTodasAnamneses() {
        return $this->repository->findAll();
    }

    public function excluirAnamnese($id) {
        return $this->repository->delete($id);
    }
}
?>
