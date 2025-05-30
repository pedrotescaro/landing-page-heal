<?php   
namespace src\model\repository;

use src\config\connection;
use src\model\entity\Anamnese;
use PDO;

class AnamneseRepository{
    private $conn;
    private $table = "anamnese";

    public function __construct() {
        $db = new connection();
        $this->conn = $db->getConnection();;
    }

    // Método para inserir uma nova anamnese
    public function save(Anamnese $Anamnese) {
        $query = "INSERT INTO " . $this->table . " (
            nome_cliente, data_nascimento, telefone, email, profissao, estado_civil,
            objetivo_tratamento, usa_medicacao, qual_medicacao, possui_doenca, qual_doenca,
            possui_alergia, qual_alergia, pratica_atividade_fisica, qual_atividade, frequencia_atividade,
            ingestao_agua_dia, ingestao_alcool, frequencia_alcool, ciclo_menstrual_regular,
            usa_anticoncepcional, tem_filhos, quantos_filhos, realizou_cirurgias, quais_cirurgias,
            marca_pacemaker, diabetes, hipertensao, problemas_cardiacos, problemas_respiratorios,
            problemas_renais, problemas_hepaticos, fumante, historico_estetico
        ) VALUES (
            :nome_cliente, :data_nascimento, :telefone, :email, :profissao, :estado_civil,
            :objetivo_tratamento, :usa_medicacao, :qual_medicacao, :possui_doenca, :qual_doenca,
            :possui_alergia, :qual_alergia, :pratica_atividade_fisica, :qual_atividade, :frequencia_atividade,
            :ingestao_agua_dia, :ingestao_alcool, :frequencia_alcool, :ciclo_menstrual_regular,
            :usa_anticoncepcional, :tem_filhos, :quantos_filhos, :realizou_cirurgias, :quais_cirurgias,
            :marca_pacemaker, :diabetes, :hipertensao, :problemas_cardiacos, :problemas_respiratorios,
            :problemas_renais, :problemas_hepaticos, :fumante, :historico_estetico
        )";

        $stmt = $this->conn->prepare($query);

        // Bind de parâmetros
        $stmt->bindParam(':nome_cliente', $this->nome_cliente);
        $stmt->bindParam(':data_nascimento', $this->data_nascimento);
        $stmt->bindParam(':telefone', $this->telefone);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':profissao', $this->profissao);
        $stmt->bindParam(':estado_civil', $this->estado_civil);
        $stmt->bindParam(':objetivo_tratamento', $this->objetivo_tratamento);
        $stmt->bindParam(':usa_medicacao', $this->usa_medicacao);
        $stmt->bindParam(':qual_medicacao', $this->qual_medicacao);
        $stmt->bindParam(':possui_doenca', $this->possui_doenca);
        $stmt->bindParam(':qual_doenca', $this->qual_doenca);
        $stmt->bindParam(':possui_alergia', $this->possui_alergia);
        $stmt->bindParam(':qual_alergia', $this->qual_alergia);
        $stmt->bindParam(':pratica_atividade_fisica', $this->pratica_atividade_fisica);
        $stmt->bindParam(':qual_atividade', $this->qual_atividade);
        $stmt->bindParam(':frequencia_atividade', $this->frequencia_atividade);
        $stmt->bindParam(':ingestao_agua_dia', $this->ingestao_agua_dia);
        $stmt->bindParam(':ingestao_alcool', $this->ingestao_alcool);
        $stmt->bindParam(':frequencia_alcool', $this->frequencia_alcool);
        $stmt->bindParam(':ciclo_menstrual_regular', $this->ciclo_menstrual_regular);
        $stmt->bindParam(':usa_anticoncepcional', $this->usa_anticoncepcional);
        $stmt->bindParam(':tem_filhos', $this->tem_filhos);
        $stmt->bindParam(':quantos_filhos', $this->quantos_filhos);
        $stmt->bindParam(':realizou_cirurgias', $this->realizou_cirurgias);
        $stmt->bindParam(':quais_cirurgias', $this->quais_cirurgias);
        $stmt->bindParam(':marca_pacemaker', $this->marca_pacemaker);
        $stmt->bindParam(':diabetes', $this->diabetes);
        $stmt->bindParam(':hipertensao', $this->hipertensao);
        $stmt->bindParam(':problemas_cardiacos', $this->problemas_cardiacos);
        $stmt->bindParam(':problemas_respiratorios', $this->problemas_respiratorios);
        $stmt->bindParam(':problemas_renais', $this->problemas_renais);
        $stmt->bindParam(':problemas_hepaticos', $this->problemas_hepaticos);
        $stmt->bindParam(':fumante', $this->fumante);
        $stmt->bindParam(':historico_estetico', $this->historico_estetico);
        // Executa
        if ($stmt->execute()) {
            return true;
        }

        return $this->conn->lastInsertId();
    }

     public function findAll() {
            $query = "SELECT * FROM $this->table";
            $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_CLASS, 'Anamnese');
    }
}