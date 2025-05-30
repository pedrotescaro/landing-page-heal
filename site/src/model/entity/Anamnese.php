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
    public function __construct(array $dados = []) {
    foreach ($dados as $chave => $valor) {
        $chave_formatada = strtolower(preg_replace('/([A-Z])/', '_$1', $chave)); // nomeCliente -> nome_cliente
        $chave_formatada = ltrim($chave_formatada, '_');
        if (property_exists($this, $chave_formatada)) {
            $this->$chave_formatada = $valor;
        }
    }
}


    // Getters e Setters
    public function getId() { return $this->id; }
    public function setId($id) { $this->id = $id; }

    public function getNomeCliente() { return $this->nome_cliente; }
    public function setNomeCliente($nome_cliente) { $this->nome_cliente = $nome_cliente; }

    public function getDataNascimento() { return $this->data_nascimento; }
    public function setDataNascimento($data_nascimento) { $this->data_nascimento = $data_nascimento; }

    public function getTelefone() { return $this->telefone; }
    public function setTelefone($telefone) { $this->telefone = $telefone; }

    public function getEmail() { return $this->email; }
    public function setEmail($email) { $this->email = $email; }

    public function getProfissao() { return $this->profissao; }
    public function setProfissao($profissao) { $this->profissao = $profissao; }

    public function getEstadoCivil() { return $this->estado_civil; }
    public function setEstadoCivil($estado_civil) { $this->estado_civil = $estado_civil; }

    public function getObjetivoTratamento() { return $this->objetivo_tratamento; }
    public function setObjetivoTratamento($objetivo_tratamento) { $this->objetivo_tratamento = $objetivo_tratamento; }

    public function getUsaMedicacao() { return $this->usa_medicacao; }
    public function setUsaMedicacao($usa_medicacao) { $this->usa_medicacao = $usa_medicacao; }

    public function getQualMedicacao() { return $this->qual_medicacao; }
    public function setQualMedicacao($qual_medicacao) { $this->qual_medicacao = $qual_medicacao; }

    public function getPossuiDoenca() { return $this->possui_doenca; }
    public function setPossuiDoenca($possui_doenca) { $this->possui_doenca = $possui_doenca; }

    public function getQualDoenca() { return $this->qual_doenca; }
    public function setQualDoenca($qual_doenca) { $this->qual_doenca = $qual_doenca; }

    public function getPossuiAlergia() { return $this->possui_alergia; }
    public function setPossuiAlergia($possui_alergia) { $this->possui_alergia = $possui_alergia; }

    public function getQualAlergia() { return $this->qual_alergia; }
    public function setQualAlergia($qual_alergia) { $this->qual_alergia = $qual_alergia; }

    public function getPraticaAtividadeFisica() { return $this->pratica_atividade_fisica; }
    public function setPraticaAtividadeFisica($pratica_atividade_fisica) { $this->pratica_atividade_fisica = $pratica_atividade_fisica; }

    public function getQualAtividade() { return $this->qual_atividade; }
    public function setQualAtividade($qual_atividade) { $this->qual_atividade = $qual_atividade; }

    public function getFrequenciaAtividade() { return $this->frequencia_atividade; }
    public function setFrequenciaAtividade($frequencia_atividade) { $this->frequencia_atividade = $frequencia_atividade; }

    public function getIngestaoAguaDia() { return $this->ingestao_agua_dia; }
    public function setIngestaoAguaDia($ingestao_agua_dia) { $this->ingestao_agua_dia = $ingestao_agua_dia; }

    public function getIngestaoAlcool() { return $this->ingestao_alcool; }
    public function setIngestaoAlcool($ingestao_alcool) { $this->ingestao_alcool = $ingestao_alcool; }

    public function getFrequenciaAlcool() { return $this->frequencia_alcool; }
    public function setFrequenciaAlcool($frequencia_alcool) { $this->frequencia_alcool = $frequencia_alcool; }

    public function getCicloMenstrualRegular() { return $this->ciclo_menstrual_regular; }
    public function setCicloMenstrualRegular($ciclo_menstrual_regular) { $this->ciclo_menstrual_regular = $ciclo_menstrual_regular; }

    public function getUsaAnticoncepcional() { return $this->usa_anticoncepcional; }
    public function setUsaAnticoncepcional($usa_anticoncepcional) { $this->usa_anticoncepcional = $usa_anticoncepcional; }

    public function getTemFilhos() { return $this->tem_filhos; }
    public function setTemFilhos($tem_filhos) { $this->tem_filhos = $tem_filhos; }

    public function getQuantosFilhos() { return $this->quantos_filhos; }
    public function setQuantosFilhos($quantos_filhos) { $this->quantos_filhos = $quantos_filhos; }

    public function getRealizouCirurgias() { return $this->realizou_cirurgias; }
    public function setRealizouCirurgias($realizou_cirurgias) { $this->realizou_cirurgias = $realizou_cirurgias; }

    public function getQuaisCirurgias() { return $this->quais_cirurgias; }
    public function setQuaisCirurgias($quais_cirurgias) { $this->quais_cirurgias = $quais_cirurgias; }

    public function getMarcaPacemaker() { return $this->marca_pacemaker; }
    public function setMarcaPacemaker($marca_pacemaker) { $this->marca_pacemaker = $marca_pacemaker; }

    public function getDiabetes() { return $this->diabetes; }
    public function setDiabetes($diabetes) { $this->diabetes = $diabetes; }

    public function getHipertensao() { return $this->hipertensao; }
    public function setHipertensao($hipertensao) { $this->hipertensao = $hipertensao; }

    public function getProblemasCardiacos() { return $this->problemas_cardiacos; }
    public function setProblemasCardiacos($problemas_cardiacos) { $this->problemas_cardiacos = $problemas_cardiacos; }

    public function getProblemasRespiratorios() { return $this->problemas_respiratorios; }
    public function setProblemasRespiratorios($problemas_respiratorios) { $this->problemas_respiratorios = $problemas_respiratorios; }

    public function getProblemasRenais() { return $this->problemas_renais; }
    public function setProblemasRenais($problemas_renais) { $this->problemas_renais = $problemas_renais; }

    public function getProblemasHepaticos() { return $this->problemas_hepaticos; }
    public function setProblemasHepaticos($problemas_hepaticos) { $this->problemas_hepaticos = $problemas_hepaticos; }

    public function getFumante() { return $this->fumante; }
    public function setFumante($fumante) { $this->fumante = $fumante; }

    public function getHistoricoEstetico() { return $this->historico_estetico; }
    public function setHistoricoEstetico($historico_estetico) { $this->historico_estetico = $historico_estetico; }

    public function getDataCadastro() { return $this->data_cadastro; }
    public function setDataCadastro($data_cadastro) { $this->data_cadastro = $data_cadastro; }
}
?>
