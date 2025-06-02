<?php
namespace src\service;

use src\model\entity\Anamnese;
use src\model\repository\AnamneseRepository;

class AnamneseService {
    private AnamneseRepository $repository;

    public function __construct() {
        $this->repository = new AnamneseRepository();
    }

    /**
     * Cria uma nova anamnese.
     *
     * @param array $dados Dados do formulário (geralmente $_POST sanitizado).
     * @return bool True sea inserido com sucesso, false caso contrário.
     */
    public function saveAnamnese(array $dados): int|false{
        $anamnese = new Anamnese($dados);
        $anamnese->data_cadastro = date('Y-m-d H:i:s'); // Adiciona a data atual
        return $this->repository->save($anamnese);
    }

    /**
     * Lista todas as anamneses cadastradas.
     *
     * @return array Lista de objetos Anamnese.
     */
    public function listarAnamneses(): array {
        return $this->repository->findAll();
    }

    /**
     * Busca uma anamnese pelo ID.
     *
     * @param int $id
     * @return Anamnese|null
     */
    public function buscarPorId(int $id): ?Anamnese {
        return $this->repository->getById($id);
    }

    /**
     * Atualiza uma anamnese existente.
     *
     * @param int $id
     * @param array $dados
     * @return bool
     */
    public function atualizarAnamnese(int $id, array $dados): bool {
        $anamnese = new Anamnese($dados);
        $anamnese->id = $id;
        return $this->repository->updatePartial($id, $dados);
    }

    /**
     * Exclui uma anamnese.
     *
     * @param int $id
     * @return bool
     */
    public function excluirAnamnese(int $id): bool {
        return $this->repository->excluir($id);
    }
}
