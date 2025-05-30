-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS paciente;
USE paciente;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS anamnese (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100),
    data_nascimento DATE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    profissao VARCHAR(100),
    estado_civil VARCHAR(20),
    objetivo_tratamento TEXT,
    
    usa_medicacao BOOLEAN,
    qual_medicacao TEXT,
    
    possui_doenca BOOLEAN,
    qual_doenca TEXT,
    
    possui_alergia BOOLEAN,
    qual_alergia TEXT,
    
    pratica_atividade_fisica BOOLEAN,
    qual_atividade VARCHAR(100),
    frequencia_atividade VARCHAR(100),
    
    ingestao_agua_dia DECIMAL(4,2),
    ingestao_alcool BOOLEAN,
    frequencia_alcool VARCHAR(100),
    
    ciclo_menstrual_regular BOOLEAN,
    usa_anticoncepcional BOOLEAN,
    tem_filhos BOOLEAN,
    quantos_filhos INT,
    
    realizou_cirurgias BOOLEAN,
    quais_cirurgias TEXT,
    
    marca_pacemaker BOOLEAN,
    diabetes BOOLEAN,
    hipertensao BOOLEAN,
    problemas_cardiacos BOOLEAN,
    problemas_respiratorios BOOLEAN,
    problemas_renais BOOLEAN,
    problemas_hepaticos BOOLEAN,
    fumante BOOLEAN,
    
    historico_estetico TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
