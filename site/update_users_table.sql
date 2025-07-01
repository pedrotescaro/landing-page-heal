-- Script para atualizar a tabela users com os campos do perfil
-- Execute este script no seu banco de dados MySQL

-- Adicionar novas colunas à tabela users
ALTER TABLE users 
ADD COLUMN user_phone VARCHAR(20) NULL COMMENT 'Telefone do usuário',
ADD COLUMN user_date_of_birth DATE NULL COMMENT 'Data de nascimento do usuário',
ADD COLUMN user_profession VARCHAR(100) NULL COMMENT 'Profissão do usuário',
ADD COLUMN user_marital_status VARCHAR(50) NULL COMMENT 'Estado civil do usuário',
ADD COLUMN user_coren VARCHAR(100) NULL COMMENT 'COREN/CRM do usuário',
ADD COLUMN user_avatar_url TEXT NULL COMMENT 'URL do avatar do usuário';

-- Inserir dados de exemplo para o usuário padrão
-- Primeiro, vamos verificar se já existe um usuário com o email profissional@clinica.com
INSERT INTO users (user_name, user_email, user_password, user_phone, user_date_of_birth, user_profession, user_marital_status, user_coren, user_avatar_url, created_at)
SELECT 
    'Profissional da Saúde',
    'profissional@clinica.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- senha: password
    '(11) 98765-4321',
    '1985-05-15',
    'Enfermeiro(a)',
    'Casado(a)',
    'COREN-SP 123456',
    NULL,
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE user_email = 'profissional@clinica.com'
);

-- Atualizar usuário existente se já existir
UPDATE users 
SET 
    user_name = 'Profissional da Saúde',
    user_phone = '(11) 98765-4321',
    user_date_of_birth = '1985-05-15',
    user_profession = 'Enfermeiro(a)',
    user_marital_status = 'Casado(a)',
    user_coren = 'COREN-SP 123456'
WHERE user_email = 'profissional@clinica.com';

-- Verificar se a atualização foi bem-sucedida
SELECT 
    user_id AS 'ID do Usuário',
    user_name AS 'Nome',
    user_email AS 'Email',
    user_phone AS 'Telefone',
    user_date_of_birth AS 'Data de Nascimento',
    user_profession AS 'Profissão',
    user_marital_status AS 'Estado Civil',
    user_coren AS 'COREN/CRM',
    created_at AS 'Data de Criação'
FROM users 
WHERE user_email = 'profissional@clinica.com'; 