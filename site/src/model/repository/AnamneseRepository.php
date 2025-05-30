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
        $stmt->bindParam(':nome_cliente', $Anamnese->nome_cliente);
        $stmt->bindParam(':data_nascimento', $Anamnese->data_nascimento);
        $stmt->bindParam(':telefone', $Anamnese->telefone);
        $stmt->bindParam(':email', $Anamnese->email);
        $stmt->bindParam(':profissao', $Anamnese->profissao);
        $stmt->bindParam(':estado_civil', $Anamnese->estado_civil);
        $stmt->bindParam(':objetivo_tratamento', $Anamnese->objetivo_tratamento);
        $stmt->bindParam(':usa_medicacao', $Anamnese->usa_medicacao);
        $stmt->bindParam(':qual_medicacao', $Anamnese->qual_medicacao);
        $stmt->bindParam(':possui_doenca', $Anamnese->possui_doenca);
        $stmt->bindParam(':qual_doenca', $Anamnese->qual_doenca);
        $stmt->bindParam(':possui_alergia', $Anamnese->possui_alergia);
        $stmt->bindParam(':qual_alergia', $Anamnese->qual_alergia);
        $stmt->bindParam(':pratica_atividade_fisica', $Anamnese->pratica_atividade_fisica);
        $stmt->bindParam(':qual_atividade', $Anamnese->qual_atividade);
        $stmt->bindParam(':frequencia_atividade', $Anamnese->frequencia_atividade);
        $stmt->bindParam(':ingestao_agua_dia', $Anamnese->ingestao_agua_dia);
        $stmt->bindParam(':ingestao_alcool', $Anamnese->ingestao_alcool);
        $stmt->bindParam(':frequencia_alcool', $Anamnese->frequencia_alcool);
        $stmt->bindParam(':ciclo_menstrual_regular', $Anamnese->ciclo_menstrual_regular);
        $stmt->bindParam(':usa_anticoncepcional', $Anamnese->usa_anticoncepcional);
        $stmt->bindParam(':tem_filhos', $Anamnese->tem_filhos);
        $stmt->bindParam(':quantos_filhos', $Anamnese->quantos_filhos);
        $stmt->bindParam(':realizou_cirurgias', $Anamnese->realizou_cirurgias);
        $stmt->bindParam(':quais_cirurgias', $Anamnese->quais_cirurgias);
        $stmt->bindParam(':marca_pacemaker', $Anamnese->marca_pacemaker);
        $stmt->bindParam(':diabetes', $Anamnese->diabetes);
        $stmt->bindParam(':hipertensao', $Anamnese->hipertensao);
        $stmt->bindParam(':problemas_cardiacos', $Anamnese->problemas_cardiacos);
        $stmt->bindParam(':problemas_respiratorios', $Anamnese->problemas_respiratorios);
        $stmt->bindParam(':problemas_renais', $Anamnese->problemas_renais);
        $stmt->bindParam(':problemas_hepaticos', $Anamnese->problemas_hepaticos);
        $stmt->bindParam(':fumante', $Anamnese->fumante);
        $stmt->bindParam(':historico_estetico', $Anamnese->historico_estetico);
        // Executa
        if ($stmt->execute()) {
            return true;
        }

        return $this->conn->lastInsertId();
    }

     public function findAll() {
            $query = "SELECT * FROM $this->table";
            $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_CLASS, Anamnese::class);
    }
    public function excluir($id) {
        $query = "DELETE FROM $this->table WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute(); // retorna true se deletou com sucesso
        return $stmt->rowCount(); 
    }

}