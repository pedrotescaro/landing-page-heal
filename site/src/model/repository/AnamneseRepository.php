<?php   
namespace src\model\repository;

use src\config\connection;
use src\model\entity\Anamnese;
use PDO;
use ReflectionClass; // Adicionado para introspecção de classes
use ReflectionProperty;

class AnamneseRepository{
    private $conn;
    private $table = "anamnese";

    public function __construct() {
        $db = new connection();
        $this->conn = $db->getConnection();
    }

   public function save(Anamnese $anamnese) {
        // Usa Reflection para obter todas as propriedades públicas do objeto Anamnese
        $reflection = new ReflectionClass($anamnese);
        $properties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);

        $columns = [];
        $placeholders = [];
        $params = [];

        foreach ($properties as $property) {
            $columnName = $property->getName();
            
            // Ignora a chave primária 'anamnese_id' pois é AUTO_INCREMENT
            if ($columnName === 'id') {
                continue;
            }

            // Garante que a propriedade existe no objeto e seu valor pode ser lido
            if ($property->isInitialized($anamnese) || $property->getValue($anamnese) === null) {
                $columns[] = $columnName;
                $placeholders[] = ":" . $columnName;
                $params[":" . $columnName] = $property->getValue($anamnese);
            }
        }

        $columnList = implode(", ", $columns);
        $placeholderList = implode(", ", $placeholders);

        $query = "INSERT INTO " . $this->table . " ({$columnList}) VALUES ({$placeholderList})";

        $stmt = $this->conn->prepare($query);

        // --- INÍCIO: LOGGING PARA DEBUG ---
        // Estas linhas irão imprimir a query SQL e os parâmetros no log de erros do PHP (php_error.log no XAMPP)
        // Isso é crucial para entender o que está sendo enviado ao banco de dados.
        error_log("SQL Query (SAVE): " . $query);
        error_log("Number of columns (SAVE): " . count($columns));
        error_log("Number of bound parameters (SAVE): " . count($params));
        error_log("Bound Parameters Data (SAVE): " . json_encode($params));
        // --- FIM: LOGGING PARA DEBUG ---

        try {
            // Executa a query passando o array de parâmetros diretamente
            if ($stmt->execute($params)) {
                return $this->conn->lastInsertId();
            }
        } catch (PDOException $e) {
            // Captura e loga a exceção PDO detalhada
            error_log("PDOException during Anamnese save: " . $e->getMessage() . " - SQL: " . $query . " - Params: " . json_encode($params));
            throw $e; // Re-lança a exceção para que ela possa ser tratada em níveis superiores
        }

        // Se a execução falhar por outros motivos (ex: violação de integridade)
        error_log("Erro desconhecido ao salvar anamnese (SQLSTATE): " . implode(" - ", $stmt->errorInfo()));
        return false;
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

    public function getById($id) {
    $query = "SELECT * FROM $this->table WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, Anamnese::class);
    return $stmt->fetch(); // retorna um objeto Anamnese ou false
}

public function updatePartial($id, array $dados) {
    $campos = [];
    foreach ($dados as $campo => $valor) {
        $campos[] = "$campo = :$campo";
    }

    $query = "UPDATE $this->table SET " . implode(", ", $campos) . " WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    foreach ($dados as $campo => $valor) {
        $stmt->bindValue(":$campo", $valor);
    }

    $stmt->bindValue(":id", $id, PDO::PARAM_INT);

    return $stmt->execute();
}


   

}