<?php
namespace src\model\entity;
class Anamnese {
    private $conn;
    private $table = "anamnese";

    // Propriedades
    public $id;
    public $nome_cliente;
    public $data_nascimento;
    public $telefone;
    public $email;
    public $profissao;
    public $estado_civil;
    public $objetivo_tratamento;
    
    public $usa_medicacao;
    public $qual_medicacao;

    public $possui_doenca;
    public $qual_doenca;

    public $possui_alergia;
    public $qual_alergia;

    public $pratica_atividade_fisica;
    public $qual_atividade;
    public $frequencia_atividade;

    public $ingestao_agua_dia;
    public $ingestao_alcool;
    public $frequencia_alcool;

    public $ciclo_menstrual_regular;
    public $usa_anticoncepcional;
    public $tem_filhos;
    public $quantos_filhos;

    public $realizou_cirurgias;
    public $quais_cirurgias;

    public $marca_pacemaker;
    public $diabetes;
    public $hipertensao;
    public $problemas_cardiacos;
    public $problemas_respiratorios;
    public $problemas_renais;
    public $problemas_hepaticos;
    public $fumante;

    public $historico_estetico;
    public $data_cadastro;

    // Construtor recebe conexão PDO
    public function __construct($db) {
        $this->conn = $db;
    }

    
}
?>
