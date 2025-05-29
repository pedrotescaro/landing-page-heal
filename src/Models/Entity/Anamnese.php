<?php
class Anamnese {
    private $id;
    private $user_id;
    private $nome_completo;
    private $data_nascimento;
    private $idade;
    private $sexo;
    private $endereco;
    private $estado_civil;

    // Comorbidades
    private $obesidade;
    private $cardiopatia;
    private $tuberculose;
    private $dpoc;
    private $doenca_hematologica;
    private $doenca_vascular;
    private $demencia_senil;
    private $insuficiencia_renal;
    private $hanseniase;
    private $insuficiencia_hepatica;
    private $outras_comorbidades;

    // Medicamentos
    private $anti_hipertensivo;
    private $hipoglicemiantes_oral;
    private $insulina;
    private $unidades_insulina;
    private $drogas_vasoativa;
    private $corticosteroides;
    private $antibioticos;
    private $suplementos;
    private $anticoagulante;
    private $vitaminico;
    private $antiretroviral;

    // Estilo de vida
    private $tabagismo;
    private $cigarros_dia;
    private $etilismo;
    private $sedentarismo;
    private $drogas_ilicitas;
    private $alergias;
    private $eliminacao_vesical;
    private $eliminacao_intestinal;
    private $higiene_bucal;
    private $hidratacao_oral;
    private $padrao_sono;

    // Ferida
    private $primeira_vez_ferida;
    private $recidiva_ferida;
    private $evolucao_aguda;
    private $evolucao_cronica;
    private $etiologia_ferida;
    private $outros_etiologia;
    private $duracao_ferida;
    private $tratamentos_anteriores;
    private $localizacao_ferida;
    private $comprimento_ferida;
    private $largura_ferida;
    private $profundidade_ferida;

    // Leito da ferida
    private $tecido_granulacao;
    private $hipergranulacao;
    private $epitelizacao;
    private $fibrina;
    private $necrose_coagulacao;
    private $necrose_liquefacao;
    private $exsudato_nivel;
    private $exsudato_tipo;
    private $exsudato_odor;
    private $sinais_infeccao;

    // Observações
    private $observacoes;
    private $data_registro;

    public function __construct($data = []) {
        foreach ($data as $key => $value) {
            if(property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function __get($name) {
        if(property_exists($this, $name)) {
            return $this->$name;
        }
        return null;
    }

    public function __set($name, $value) {
        if(property_exists($this, $name)) {
            $this->$name = $value;
        }
    }

    // Alternativamente, se quiser gerar getters e setters individualizados para cada propriedade:
    // Exemplo:

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getUserId() {
        return $this->user_id;
    }

    public function setUserId($user_id) {
        $this->user_id = $user_id;
    }

    // ... repete para todas as demais propriedades ...

}
?>
