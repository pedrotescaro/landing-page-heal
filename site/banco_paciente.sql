

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE anamnese (
    anamneseId INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da ficha de anamnese',
    
    -- Dados Pessoais
    nome_cliente VARCHAR(255) NOT NULL COMMENT 'Nome completo do cliente',
    data_nascimento DATE COMMENT 'Data de nascimento do cliente',
    telefone VARCHAR(20) COMMENT 'Telefone de contato do cliente',
    email VARCHAR(100) COMMENT 'Endereço de e-mail do cliente',
    profissao VARCHAR(100) COMMENT 'Profissão do cliente',
    estado_civil VARCHAR(50) COMMENT 'Estado civil do cliente (Solteiro(a), Casado(a), etc.)',
    nivel_atividade VARCHAR(50) COMMENT 'Nível de atividade ou mobilidade do cliente (Acamado, Ativo, etc.)',
    suporte_social TEXT COMMENT 'Descrição do suporte social e cuidadores do cliente',
    compreensao_adesao VARCHAR(50) COMMENT 'Nível de compreensão e adesão do cliente ao tratamento (Boa, Regular, Baixa)',

    -- Dados Clínicos
    objetivo_tratamento TEXT COMMENT 'Objetivo principal do tratamento da ferida',
    historico_cicatrizacao TEXT COMMENT 'Experiências anteriores de cicatrização do cliente',
    estado_nutricional TEXT COMMENT 'Avaliação do estado nutricional (alimentação, peso, etc.)',
    usa_medicacao BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente usa medicação (0=Não, 1=Sim)',
    qual_medicacao VARCHAR(255) COMMENT 'Nome da medicação utilizada, se usa (aparece condicionalmente)',
    possui_doenca BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente possui alguma doença (0=Não, 1=Sim)',
    qual_doenca VARCHAR(255) COMMENT 'Nome da doença, se possui (aparece condicionalmente)',
    possui_alergia BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente possui alguma alergia (0=Não, 1=Sim)',
    qual_alergia VARCHAR(255) COMMENT 'Tipo de alergia, se possui (aparece condicionalmente)',
    pratica_atividade_fisica BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente pratica atividade física (0=Não, 1=Sim)',
    qual_atividade VARCHAR(255) COMMENT 'Tipo de atividade física, se pratica (aparece condicionalmente)',
    frequencia_atividade VARCHAR(100) COMMENT 'Frequência da atividade física, se pratica (aparece condicionalmente)',
    ingestao_agua_dia VARCHAR(50) COMMENT 'Quantidade de água ingerida por dia',
    ingestao_alcool BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente ingere álcool (0=Não, 1=Sim)',
    frequencia_alcool VARCHAR(100) COMMENT 'Frequência do consumo de álcool, se ingere (aparece condicionalmente)',
    tem_filhos BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente tem filhos (0=Não, 1=Sim)',
    quantos_filhos INT COMMENT 'Número de filhos, se tem (aparece condicionalmente)',
    realizou_cirurgias BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente realizou cirurgias (0=Não, 1=Sim)',
    quais_cirurgias TEXT COMMENT 'Nomes das cirurgias realizadas, se realizou (aparece condicionalmente)',
    claudicacao_intermitente BOOLEAN DEFAULT FALSE COMMENT 'Função Vascular: Claudicação Intermitente (aparece condicionalmente)',
    dor_repouso BOOLEAN DEFAULT FALSE COMMENT 'Função Vascular: Dor em Repouso (aparece condicionalmente)',
    pulsos_perifericos VARCHAR(255) COMMENT 'Função Vascular: Descrição dos Pulsos Periféricos (aparece condicionalmente)',
    fumante BOOLEAN DEFAULT FALSE COMMENT 'Indica se o cliente é fumante (0=Não, 1=Sim)',

    -- HPP e Comorbidades (todos são checkboxes, então BOOLEAN)
    dmi BOOLEAN DEFAULT FALSE COMMENT 'Histórico de DMI (Diabetes Mellitus Tipo I)',
    dmii BOOLEAN DEFAULT FALSE COMMENT 'Histórico de DMII (Diabetes Mellitus Tipo II)',
    has BOOLEAN DEFAULT FALSE COMMENT 'Histórico de HAS (Hipertensão Arterial Sistêmica)',
    neoplasia BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Neoplasia',
    hiv_aids BOOLEAN DEFAULT FALSE COMMENT 'Histórico de HIV/SIDA',
    obesidade BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Obesidade',
    cardiopatia BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Cardiopatia',
    dpoc BOOLEAN DEFAULT FALSE COMMENT 'Histórico de DPOC (Doença Pulmonar Obstrutiva Crônica)',
    doenca_hematologica BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Doença Hematológica',
    doenca_vascular BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Doença Vascular',
    demencia_senil BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Demência Senil',
    insuficiencia_renal BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Insuficiência Renal',
    hanseniase BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Hanseníase',
    insuficiencia_hepatica BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Insuficiência Hepática',
    doenca_autoimune BOOLEAN DEFAULT FALSE COMMENT 'Histórico de Doença Autoimune',
    outros_hpp TEXT COMMENT 'Outras doenças ou condições no histórico médico',

    -- Medicamento em uso
    anti_hipertensivo BOOLEAN DEFAULT FALSE COMMENT 'Uso de Anti-hipertensivo',
    anti_hipertensivo_nome VARCHAR(255) COMMENT 'Nome do Anti-hipertensivo',
    anti_hipertensivo_dose VARCHAR(100) COMMENT 'Dose do Anti-hipertensivo',
    corticoides BOOLEAN DEFAULT FALSE COMMENT 'Uso de Corticoides',
    corticoides_nome VARCHAR(255) COMMENT 'Nome do Corticoide',
    corticoides_dose VARCHAR(100) COMMENT 'Dose do Corticoide',
    hipoglicemiantes_orais BOOLEAN DEFAULT FALSE COMMENT 'Uso de Hipoglicemiantes Orais',
    hipoglicemiantes_orais_nome VARCHAR(255) COMMENT 'Nome do Hipoglicemiante Oral',
    hipoglicemiantes_orais_dose VARCHAR(100) COMMENT 'Dose do Hipoglicemiante Oral',
    aines BOOLEAN DEFAULT FALSE COMMENT 'Uso de AINES',
    aines_nome VARCHAR(255) COMMENT 'Nome do AINES',
    aines_dose VARCHAR(100) COMMENT 'Dose do AINES',
    insulina BOOLEAN DEFAULT FALSE COMMENT 'Uso de Insulina',
    insulina_nome VARCHAR(255) COMMENT 'Nome da Insulina',
    insulina_dose VARCHAR(100) COMMENT 'Dose da Insulina',
    drogas_vasoativa BOOLEAN DEFAULT FALSE COMMENT 'Uso de Drogas Vasoativas',
    drogas_vasoativa_nome VARCHAR(255) COMMENT 'Nome da Droga Vasoativa',
    drogas_vasoativa_dose VARCHAR(100) COMMENT 'Dose da Droga Vasoativa',
    suplemento BOOLEAN DEFAULT FALSE COMMENT 'Uso de Suplemento',
    suplemento_nome VARCHAR(255) COMMENT 'Nome do Suplemento',
    suplemento_dose VARCHAR(100) COMMENT 'Dose do Suplemento',
    anticoagulante BOOLEAN DEFAULT FALSE COMMENT 'Uso de Anticoagulante',
    anticoagulante_nome VARCHAR(255) COMMENT 'Nome do Anticoagulante',
    anticoagulante_dose VARCHAR(100) COMMENT 'Dose do Anticoagulante',
    vitaminico BOOLEAN DEFAULT FALSE COMMENT 'Uso de Vitamínico',
    vitaminico_nome VARCHAR(255) COMMENT 'Nome do Vitamínico',
    vitaminico_dose VARCHAR(100) COMMENT 'Dose do Vitamínico',
    antirretroviral BOOLEAN DEFAULT FALSE COMMENT 'Uso de Antirretroviral',
    antirretroviral_nome VARCHAR(255) COMMENT 'Nome do Antirretroviral',
    antirretroviral_dose VARCHAR(100) COMMENT 'Dose do Antirretroviral',
    outros_medicamento TEXT COMMENT 'Outros medicamentos em uso',

    -- Tamanho e Características da Ferida
    foto_ferida VARCHAR(255) COMMENT 'Caminho do arquivo da foto da ferida',
    ferida_largura DECIMAL(5,2) NOT NULL COMMENT 'Largura da ferida em cm',
    ferida_comprimento DECIMAL(5,2) NOT NULL COMMENT 'Comprimento da ferida em cm',
    ferida_profundidade DECIMAL(5,2) NOT NULL COMMENT 'Profundidade da ferida em cm',

    -- Avaliação da Ferida (TIMERS) - Parte 1
    localizacao_ferida VARCHAR(255) NOT NULL COMMENT 'Localização anatômica da ferida',
    etiologia_ferida VARCHAR(100) NOT NULL COMMENT 'Etiologia da ferida (pressao, vascular_arterial, etc.)',
    etiologia_outra VARCHAR(255) COMMENT 'Especificação de outra etiologia da ferida',
    tempo_evolucao VARCHAR(100) NOT NULL COMMENT 'Tempo de evolução da ferida (ex: 3 semanas, 1 mês)',
    dor_escala INT COMMENT 'Intensidade da dor na escala EVA (0-10)',
    dor_fatores VARCHAR(255) COMMENT 'Fatores que aliviam ou pioram a dor',

    -- Avaliação da Ferida (TIMERS) - Tecido e Inflamação
    percentual_granulacao_leito DECIMAL(5,2) NOT NULL COMMENT 'Percentual de tecido de granulação no leito da ferida',
    percentual_epitelizacao_leito DECIMAL(5,2) NOT NULL COMMENT 'Percentual de tecido de epitelização no leito da ferida',
    percentual_esfacelo_leito DECIMAL(5,2) NOT NULL COMMENT 'Percentual de esfacelo no leito da ferida',
    percentual_necrose_seca_leito DECIMAL(5,2) NOT NULL COMMENT 'Percentual de necrose seca no leito da ferida',
    
    inflamacao_rubor BOOLEAN DEFAULT FALSE COMMENT 'Sinal de inflamação: Rubor (Vermelhidão)',
    inflamacao_calor BOOLEAN DEFAULT FALSE COMMENT 'Sinal de inflamação: Calor',
    inflamacao_edema BOOLEAN DEFAULT FALSE COMMENT 'Sinal de inflamação: Edema (Inchaço)',
    inflamacao_dor_local BOOLEAN DEFAULT FALSE COMMENT 'Sinal de inflamação: Dor Local',
    inflamacao_perda_funcao BOOLEAN DEFAULT FALSE COMMENT 'Sinal de inflamação: Perda de Função',

    -- Avaliação da Ferida (TIMERS) - Infecção e Exsudato
    infeccao_eritema_perilesional BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Eritema Perilesional',
    infeccao_calor_local BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Calor Local',
    infeccao_edema BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Edema',
    infeccao_dor_local BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Dor Local',
    infeccao_exsudato BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Exsudato Purulento',
    infeccao_odor BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Odor Fétido',
    infeccao_retardo_cicatrizacao BOOLEAN DEFAULT FALSE COMMENT 'Sinal de infecção local: Retardo na Cicatrização',
    cultura_realizada BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Indica se a cultura da ferida foi realizada (0=Não, 1=Sim)',
    resultado_cultura TEXT COMMENT 'Resultado da cultura da ferida (microrganismos identificados)',

    -- Avaliação da Ferida (TIMERS) - Exsudato e Pele Perilesional
    quantidade_exsudato VARCHAR(50) NOT NULL COMMENT 'Quantidade de exsudato (Ausente, Escasso, etc.)',
    tipo_exsudato VARCHAR(50) NOT NULL COMMENT 'Tipo de exsudato (Seroso, Sanguinolento, Purulento, etc.)',
    consistencia_exsudato VARCHAR(50) NOT NULL COMMENT 'Consistência do exsudato (Fina/Fluida, Viscosa, etc.)',
    pele_perilesional_umidade VARCHAR(50) NOT NULL COMMENT 'Umidade da pele perilesional (Seca, Hidratada, Macerada)',
    pele_perilesional_extensao VARCHAR(255) COMMENT 'Extensão da alteração perilesional',

    -- Avaliação da Ferida (TIMERS) - Bordas e Cicatrização
    bordas_caracteristicas TEXT NOT NULL COMMENT 'Características das bordas da ferida (Regulares, Irregulares, etc.)',
    fixacao_bordas VARCHAR(50) NOT NULL COMMENT 'Fixação das bordas ao leito (Aderidas, Não Aderidas)',
    tunel_cavidade BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Presença de túneis ou cavidade (0=Não, 1=Sim)',
    localizacao_tunel_cavidade VARCHAR(255) COMMENT 'Localização dos túneis ou cavidade',
    velocidade_cicatrizacao VARCHAR(50) NOT NULL COMMENT 'Velocidade de cicatrização observada (Rápida, Lenta, Estagnada, Regredindo)',
    
    pele_perilesional_integra BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Íntegra',
    pele_perilesional_eritematosa BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Eritematosa (Vermelha)',
    pele_perilesional_macerada BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Macerada',
    pele_perilesional_seca_descamativa BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Seca e Descamativa',
    pele_perilesional_eczematosa BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Eczematosa',
    pele_perilesional_hiperpigmentada BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Hiperpigmentada',
    pele_perilesional_hipopigmentada BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Hipopigmentada',
    pele_perilesional_indurada BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Indurada',
    pele_perilesional_sensivel BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Sensível',
    pele_perilesional_edema BOOLEAN DEFAULT FALSE COMMENT 'Condição da pele perilesional: Edema',

    -- Informações Adicionais
    observacoes TEXT COMMENT 'Observações adicionais sobre a anamnese',
    data_consulta DATE NOT NULL COMMENT 'Data da consulta da anamnese',
    hora_consulta TIME NOT NULL COMMENT 'Hora da consulta da anamnese',
    profissional_responsavel VARCHAR(255) COMMENT 'Nome do profissional responsável pela anamnese',
    coren VARCHAR(50) COMMENT 'Número COREN/CRM do profissional',
    assinatura VARCHAR(255) COMMENT 'Caminho do arquivo da assinatura do profissional',
    data_atualizacao DATE NOT NULL COMMENT 'Data da última atualização da anamnese'
);