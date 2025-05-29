CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Use a tabela 'anamnese' que defini anteriormente (com ajustes para FK)
ALTER TABLE anamnese ADD COLUMN user_id INT NOT NULL AFTER id;
ALTER TABLE anamnese ADD FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE anamnese (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    /* Identificação (Imagem 1) */
    nome_completo VARCHAR(100),
    data_nascimento DATE,
    idade INT,
    sexo ENUM('F', 'M'),
    endereco TEXT,
    estado_civil VARCHAR(50),
    
    /* Comorbidades (Imagem 1) */
    obesidade BOOLEAN,
    cardiopatia BOOLEAN,
    tuberculose BOOLEAN,
    dpoc BOOLEAN,
    doenca_hematologica BOOLEAN,
    doenca_vascular BOOLEAN,
    demencia_senil BOOLEAN,
    insuficiencia_renal BOOLEAN,
    hanseniase BOOLEAN,
    insuficiencia_hepatica BOOLEAN,
    outras_comorbidades TEXT,
    
    /* Medicamentos (Imagem 1) */
    anti_hipertensivo BOOLEAN,
    hipoglicemiantes_oral BOOLEAN,
    insulina BOOLEAN,
    unidades_insulina INT,
    drogas_vasoativa BOOLEAN,
    corticosteroides BOOLEAN,
    antibioticos BOOLEAN,
    suplementos BOOLEAN,
    anticoagulante BOOLEAN,
    vitaminico BOOLEAN,
    antiretroviral BOOLEAN,
    
    /* Estilo de Vida (Imagem 1) */
    tabagismo BOOLEAN,
    cigarros_dia INT,
    etilismo BOOLEAN,
    sedentarismo BOOLEAN,
    drogas_ilicitas BOOLEAN,
    alergias TEXT,
    eliminacao_vesical ENUM('Presente', 'Ausente'),
    eliminacao_intestinal ENUM('Presente', 'Ausente'),
    higiene_bucal ENUM('Razoável', 'Precária'),
    hidratacao_oral TEXT,
    padrao_sono TEXT,
    
    /* Ferida (Imagem 2) */
    primeira_vez_ferida BOOLEAN,
    recidiva_ferida BOOLEAN,
    evolucao_aguda BOOLEAN,
    evolucao_cronica BOOLEAN,
    etiologia_ferida ENUM(
        'Lesão por pressão',
        'Pé diabético',
        'Cirúrgica',
        'Queimadura',
        'Oncológica',
        'Arterial',
        'Traumática',
        'Mista',
        'Neuropática',
        'Venosa',
        'Erisipela',
        'Autoimune',
        'Outros'
    ),
    outros_etiologia TEXT,
    duracao_ferida VARCHAR(50),
    tratamentos_anteriores TEXT,
    localizacao_ferida VARCHAR(100),
    comprimento_ferida DECIMAL(5,2),
    largura_ferida DECIMAL(5,2),
    profundidade_ferida DECIMAL(5,2),
    
    /* Leito da Ferida (Imagem 2) */
    tecido_granulacao DECIMAL(5,2),
    hipergranulacao DECIMAL(5,2),
    epitelizacao DECIMAL(5,2),
    fibrina DECIMAL(5,2),
    necrose_coagulacao DECIMAL(5,2),
    necrose_liquefacao DECIMAL(5,2),
    exsudato_nivel ENUM('Seco', 'Baixo', 'Moderado', 'Alto'),
    exsudato_tipo ENUM('Seroso', 'Sanguinolento', 'Serosanguinolento', 'Purulento', 'Seropurulento'),
    exsudato_odor ENUM('Ausente', 'Característico', 'Fétido', 'Pútrido'),
    sinais_infeccao TEXT,
    
    /* Observações Gerais */
    observacoes TEXT,
    
    /* Timestamp Automático */
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
