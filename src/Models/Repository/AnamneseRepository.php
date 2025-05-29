<?php

class AnamneseRepository {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function save(Anamnese $anamnese) {
        $stmt = $this->pdo->prepare("
            INSERT INTO anamneses (user_id, nome_completo, data_nascimento, idade, sexo, endereco, estado_civil, obesidade, cardiopatia, tuberculose, dpoc, doenca_hematologica, doenca_vascular, demencia_senil, insuficiencia_renal, hanseniase, insuficiencia_hepatica, outras_comorbidades, anti_hipertensivo, hipoglicemiantes_oral, insulina, unidades_insulina, drogas_vasoativa, corticosteroides, antibioticos, suplementos, anticoagulante, vitaminico, antiretroviral, tabagismo, cigarros_dia, etilismo, sedentarismo, drogas_ilicitas, alergias, eliminacao_vesical, eliminacao_intestinal, higiene_bucal, hidratacao_oral, padrao_sono, primeira_vez_ferida, recidiva_ferida, evolucao_aguda, evolucao_cronica, etiologia_ferida, outros_etiologia, duracao_ferida, tratamentos_anteriores, localizacao_ferida, comprimento_ferida, largura_ferida, profundidade_ferida, tecido_granulacao, hipergranulacao, epitelizacao, fibrina, necrose_coagulacao, necrose_liquefacao, exsudato_nivel, exsudato_tipo, exsudato_odor, sinais_infeccao, observacoes, data_registro) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ");

        $stmt->execute([
            $anamnese->getUserId(),
            $anamnese->getNomeCompleto(),
            $anamnese->getDataNascimento(),
            $anamnese->getIdade(),
            $anamnese->getSexo(),
            $anamnese->getEndereco(),
            $anamnese->getEstadoCivil(),
            $anamnese->getObesidade(),
            $anamnese->getCardiopatia(),
            $anamnese->getTuberculose(),
            $anamnese->getDpoc(),
            $anamnese->getDoencaHematologica(),
            $anamnese->getDoencaVascular(),
            $anamnese->getDemenciaSenil(),
            $anamnese->getInsuficienciaRenal(),
            $anamnese->getHanseniase(),
            $anamnese->getInsuficienciaHepatica(),
            $anamnese->getOutrasComorbidades(),
            $anamnese->getAntiHipertensivo(),
            $anamnese->getHipoglicemiantesOral(),
            $anamnese->getInsulina(),
            $anamnese->getUnidadesInsulina(),
            $anamnese->getDrogasVasoativa(),
            $anamnese->getCorticosteroides(),
            $anamnese->getAntibioticos(),
            $anamnese->getSuplementos(),
            $anamnese->getAnticoagulante(),
            $anamnese->getVitaminico(),
            $anamnese->getAntiretroviral(),
            $anamnese->getTabagismo(),
            $anamnese->getCigarrosDia(),
            $anamnese->getEtilismo(),
            $anamnese->getSedentarismo(),
            $anamnese->getDrogasIlicitas(),
            $anamnese->getAlergias(),
            $anamnese->getEliminacaoVesical(),
            $anamnese->getEliminacaoIntestinal(),
            $anamnese->getHigieneBucal(),
            $anamnese->getHidratacaoOral(),
            $anamnese->getPadraoSono(),
            $anamnese->getPrimeiraVezFerida(),
            $anamnese->getRecidivaFerida(),
            $anamnese->getEvolucaoAguda(),
            $anamnese->getEvolucaoCronica(),
            $anamnese->getEtiologiaFerida(),
            $anamnese->getOutrosEtiologia(),
            $anamnese->getDuracaoFerida(),
            $anamnese->getTratamentosAnteriores(),
            $anamnese->getLocalizacaoFerida(),
            $anamnese->getComprimentoFerida(),
            $anamnese->getLarguraFerida(),
            $anamnese->getProfundidadeFerida(),
            $anamnese->getTecidoGranulacao(),
            $anamnese->getHipergranulacao(),
            $anamnese->getEpitelizacao(),
            $anamnese->getFibrina(),
            $anamnese->getNecroseCoagulacao(),
            $anamnese->getNecroseLiquefacao(),
            $anamnese->getExsudatoNivel(),
            $anamnese->getExsudatoTipo(),
            $anamnese->getExsudatoOdor(),
            $anamnese->getSinaisInfeccao(),
            $anamnese->getObservacoes(),
            $anamnese->getDataRegistro()
        ]);
    }

    public function findById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM anamneses WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findAll() {
        $stmt = $this->pdo->query("SELECT * FROM anamneses");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM anamneses WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
