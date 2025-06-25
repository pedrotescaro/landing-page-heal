<?php

namespace src\model\entity;

class Anamnese
{
    // Propriedades
    public $id; // Novo: anamneseId
    public $nome_cliente;
    public $data_nascimento;
    public $telefone;
    public $email;
    public $profissao;
    public $estado_civil;
    public $nivel_atividade; // Novo
    public $suporte_social; // Novo
    public $compreensao_adesao; // Novo

    // Dados Clínicos
    public $objetivo_tratamento;
    public $historico_cicatrizacao; // Novo
    public $estado_nutricional; // Novo
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
    public $tem_filhos; // Removido ciclo_menstrual_regular, usa_anticoncepcional
    public $quantos_filhos;
    public $realizou_cirurgias;
    public $quais_cirurgias;
    public $claudicacao_intermitente; // Novo
    public $dor_repouso; // Novo
    public $pulsos_perifericos; // Novo
    public $fumante;

    // HPP e Comorbidades (todos são checkboxes, então BOOLEAN)
    public $dmi; // Novo
    public $dmii; // Novo
    public $has; // Novo
    public $neoplasia; // Novo
    public $hiv_aids; // Novo
    public $obesidade; // Novo
    public $cardiopatia; // Novo
    public $dpoc; // Novo
    public $doenca_hematologica; // Novo
    public $doenca_vascular; // Novo
    public $demencia_senil; // Novo
    public $insuficiencia_renal; // Novo
    public $hanseniase; // Novo
    public $insuficiencia_hepatica; // Novo
    public $doenca_autoimune; // Novo
    public $outros_hpp; // Novo

    // Medicamento em uso
    public $anti_hipertensivo; // Novo
    public $anti_hipertensivo_nome; // Novo
    public $anti_hipertensivo_dose; // Novo
    public $corticoides; // Novo
    public $corticoides_nome; // Novo
    public $corticoides_dose; // Novo
    public $hipoglicemiantes_orais; // Novo
    public $hipoglicemiantes_orais_nome; // Novo
    public $hipoglicemiantes_orais_dose; // Novo
    public $aines; // Novo
    public $aines_nome; // Novo
    public $aines_dose; // Novo
    public $insulina; // Novo
    public $insulina_nome; // Novo
    public $insulina_dose; // Novo
    public $drogas_vasoativa; // Novo
    public $drogas_vasoativa_nome; // Novo
    public $drogas_vasoativa_dose; // Novo
    public $suplemento; // Novo
    public $suplemento_nome; // Novo
    public $suplemento_dose; // Novo
    public $anticoagulante; // Novo
    public $anticoagulante_nome; // Novo
    public $anticoagulante_dose; // Novo
    public $vitaminico; // Novo
    public $vitaminico_nome; // Novo
    public $vitaminico_dose; // Novo
    public $antirretroviral; // Novo
    public $antirretroviral_nome; // Novo
    public $antirretroviral_dose; // Novo
    public $outros_medicamento; // Novo

    // Tamanho e Características da Ferida
    public $foto_ferida; // Novo
    public $ferida_largura; // Novo
    public $ferida_comprimento; // Novo
    public $ferida_profundidade; // Novo

    // Avaliação da Ferida (TIMERS) - Parte 1
    public $localizacao_ferida; // Novo
    public $etiologia_ferida; // Novo
    public $etiologia_outra; // Novo
    public $tempo_evolucao; // Novo
    public $dor_escala; // Novo
    public $dor_fatores; // Novo

    // Avaliação da Ferida (TIMERS) - Tecido e Inflamação
    public $percentual_granulacao_leito; // Novo
    public $percentual_epitelizacao_leito; // Novo
    public $percentual_esfacelo_leito; // Novo
    public $percentual_necrose_seca_leito; // Novo

    public $inflamacao_rubor; // Novo
    public $inflamacao_calor; // Novo
    public $inflamacao_edema; // Novo
    public $inflamacao_dor_local; // Novo
    public $inflamacao_perda_funcao; // Novo

    // Avaliação da Ferida (TIMERS) - Infecção e Exsudato
    public $infeccao_eritema_perilesional; // Novo
    public $infeccao_calor_local; // Novo
    public $infeccao_edema; // Novo
    public $infeccao_dor_local; // Novo
    public $infeccao_exsudato; // Novo
    public $infeccao_odor; // Novo
    public $infeccao_retardo_cicatrizacao; // Novo
    public $cultura_realizada; // Novo
    public $resultado_cultura; // Novo

    // Avaliação da Ferida (TIMERS) - Exsudato e Pele Perilesional
    public $quantidade_exsudato; // Novo
    public $tipo_exsudato; // Novo
    public $consistencia_exsudato; // Novo
    public $pele_perilesional_umidade; // Novo
    public $pele_perilesional_extensao; // Novo

    // Avaliação da Ferida (TIMERS) - Bordas e Cicatrização
    public $bordas_caracteristicas; // Novo
    public $fixacao_bordas; // Novo
    public $tunel_cavidade; // Novo
    public $localizacao_tunel_cavidade; // Novo
    public $velocidade_cicatrizacao; // Novo

    public $pele_perilesional_integra; // Novo
    public $pele_perilesional_eritematosa; // Novo
    public $pele_perilesional_macerada; // Novo
    public $pele_perilesional_seca_descamativa; // Novo
    public $pele_perilesional_eczematosa; // Novo
    public $pele_perilesional_hiperpigmentada; // Novo
    public $pele_perilesional_hipopigmentada; // Novo
    public $pele_perilesional_indurada; // Novo
    public $pele_perilesional_sensivel; // Novo
    public $pele_perilesional_edema; // Novo

    // Informações Adicionais
    public $observacoes; // Novo
    public $data_consulta; // Novo
    public $hora_consulta; // Novo
    public $profissional_responsavel; // Novo
    public $coren; // Novo
    public $assinatura; // Novo
    public $data_atualizacao; // Novo


    // Construtor que recebe um array associativo de dados
    public function __construct(array $dados = [])
    {
        foreach ($dados as $chave => $valor) {
            // Converte a chave de camelCase (se vier do formulário) ou mantém snake_case
            // Ex: nomeCliente -> nome_cliente, anamneseId -> anamnese_id
            $chave_formatada = strtolower(preg_replace('/([A-Z])/', '_$1', $chave));
            $chave_formatada = ltrim($chave_formatada, '_'); // Remove underscore inicial se houver

            if (property_exists($this, $chave_formatada)) {
                $this->$chave_formatada = $valor;
            }
        }
    }

    // Getters e Setters para anamnese_id
    public function getAnamneseId() { return $this->anamnese_id; }
    public function setAnamneseId($anamnese_id) { $this->anamnese_id = $anamnese_id; }

    // Getters e Setters para Dados Pessoais
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

    public function getNivelAtividade() { return $this->nivel_atividade; }
    public function setNivelAtividade($nivel_atividade) { $this->nivel_atividade = $nivel_atividade; }

    public function getSuporteSocial() { return $this->suporte_social; }
    public function setSuporteSocial($suporte_social) { $this->suporte_social = $suporte_social; }

    public function getCompreensaoAdesao() { return $this->compreensao_adesao; }
    public function setCompreensaoAdesao($compreensao_adesao) { $this->compreensao_adesao = $compreensao_adesao; }

    // Getters e Setters para Dados Clínicos
    public function getObjetivoTratamento() { return $this->objetivo_tratamento; }
    public function setObjetivoTratamento($objetivo_tratamento) { $this->objetivo_tratamento = $objetivo_tratamento; }

    public function getHistoricoCicatrizacao() { return $this->historico_cicatrizacao; }
    public function setHistoricoCicatrizacao($historico_cicatrizacao) { $this->historico_cicatrizacao = $historico_cicatrizacao; }

    public function getEstadoNutricional() { return $this->estado_nutricional; }
    public function setEstadoNutricional($estado_nutricional) { $this->estado_nutricional = $estado_nutricional; }

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

    public function getTemFilhos() { return $this->tem_filhos; }
    public function setTemFilhos($tem_filhos) { $this->tem_filhos = $tem_filhos; }

    public function getQuantosFilhos() { return $this->quantos_filhos; }
    public function setQuantosFilhos($quantos_filhos) { $this->quantos_filhos = $quantos_filhos; }

    public function getRealizouCirurgias() { return $this->realizou_cirurgias; }
    public function setRealizouCirurgias($realizou_cirurgias) { $this->realizou_cirurgias = $realizou_cirurgias; }

    public function getQuaisCirurgias() { return $this->quais_cirurgias; }
    public function setQuaisCirurgias($quais_cirurgias) { $this->quais_cirurgias = $quais_cirurgias; }

    public function getClaudicacaoIntermitente() { return $this->claudicacao_intermitente; }
    public function setClaudicacaoIntermitente($claudicacao_intermitente) { $this->claudicacao_intermitente = $claudicacao_intermitente; }

    public function getDorRepouso() { return $this->dor_repouso; }
    public function setDorRepouso($dor_repouso) { $this->dor_repouso = $dor_repouso; }

    public function getPulsosPerifericos() { return $this->pulsos_perifericos; }
    public function setPulsosPerifericos($pulsos_perifericos) { $this->pulsos_perifericos = $pulsos_perifericos; }

    public function getFumante() { return $this->fumante; }
    public function setFumante($fumante) { $this->fumante = $fumante; }

    // Getters e Setters para HPP e Comorbidades
    public function getDmi() { return $this->dmi; }
    public function setDmi($dmi) { $this->dmi = $dmi; }

    public function getDmii() { return $this->dmii; }
    public function setDmii($dmii) { $this->dmii = $dmii; }

    public function getHas() { return $this->has; }
    public function setHas($has) { $this->has = $has; }

    public function getNeoplasia() { return $this->neoplasia; }
    public function setNeoplasia($neoplasia) { $this->neoplasia = $neoplasia; }

    public function getHivAids() { return $this->hiv_aids; }
    public function setHivAids($hiv_aids) { $this->hiv_aids = $hiv_aids; }

    public function getObesidade() { return $this->obesidade; }
    public function setObesidade($obesidade) { $this->obesidade = $obesidade; }

    public function getCardiopatia() { return $this->cardiopatia; }
    public function setCardiopatia($cardiopatia) { $this->cardiopatia = $cardiopatia; }

    public function getDpoc() { return $this->dpoc; }
    public function setDpoc($dpoc) { $this->dpoc = $dpoc; }

    public function getDoencaHematologica() { return $this->doenca_hematologica; }
    public function setDoencaHematologica($doenca_hematologica) { $this->doenca_hematologica = $doenca_hematologica; }

    public function getDoencaVascular() { return $this->doenca_vascular; }
    public function setDoencaVascular($doenca_vascular) { $this->doenca_vascular = $doenca_vascular; }

    public function getDemenciaSenil() { return $this->demencia_senil; }
    public function setDemenciaSenil($demencia_senil) { $this->demencia_senil = $demencia_senil; }

    public function getInsuficienciaRenal() { return $this->insuficiencia_renal; }
    public function setInsuficienciaRenal($insuficiencia_renal) { $this->insuficiencia_renal = $insuficiencia_renal; }

    public function getHanseniase() { return $this->hanseniase; }
    public function setHanseniase($hanseniase) { $this->hanseniase = $hanseniase; }

    public function getInsuficienciaHepatica() { return $this->insuficiencia_hepatica; }
    public function setInsuficienciaHepatica($insuficiencia_hepatica) { $this->insuficiencia_hepatica = $insuficiencia_hepatica; }

    public function getDoencaAutoimune() { return $this->doenca_autoimune; }
    public function setDoencaAutoimune($doenca_autoimune) { $this->doenca_autoimune = $doenca_autoimune; }

    public function getOutrosHpp() { return $this->outros_hpp; }
    public function setOutrosHpp($outros_hpp) { $this->outros_hpp = $outros_hpp; }

    // Getters e Setters para Medicamento em uso
    public function getAntiHipertensivo() { return $this->anti_hipertensivo; }
    public function setAntiHipertensivo($anti_hipertensivo) { $this->anti_hipertensivo = $anti_hipertensivo; }

    public function getAntiHipertensivoNome() { return $this->anti_hipertensivo_nome; }
    public function setAntiHipertensivoNome($anti_hipertensivo_nome) { $this->anti_hipertensivo_nome = $anti_hipertensivo_nome; }

    public function getAntiHipertensivoDose() { return $this->anti_hipertensivo_dose; }
    public function setAntiHipertensivoDose($anti_hipertensivo_dose) { $this->anti_hipertensivo_dose = $anti_hipertensivo_dose; }

    public function getCorticoides() { return $this->corticoides; }
    public function setCorticoides($corticoides) { $this->corticoides = $corticoides; }

    public function getCorticoidesNome() { return $this->corticoides_nome; }
    public function setCorticoidesNome($corticoides_nome) { $this->corticoides_nome = $corticoides_nome; }

    public function getCorticoidesDose() { return $this->corticoides_dose; }
    public function setCorticoidesDose($corticoides_dose) { $this->corticoides_dose = $corticoides_dose; }

    public function getHipoglicemiantesOrais() { return $this->hipoglicemiantes_orais; }
    public function setHipoglicemiantesOrais($hipoglicemiantes_orais) { $this->hipoglicemiantes_orais = $hipoglicemiantes_orais; }

    public function getHipoglicemiantesOraisNome() { return $this->hipoglicemiantes_orais_nome; }
    public function setHipoglicemiantesOraisNome($hipoglicemiantes_orais_nome) { $this->hipoglicemiantes_orais_nome = $hipoglicemiantes_orais_nome; }

    public function getHipoglicemiantesOraisDose() { return $this->hipoglicemiantes_orais_dose; }
    public function setHipoglicemiantesOraisDose($hipoglicemiantes_orais_dose) { $this->hipoglicemiantes_orais_dose = $hipoglicemiantes_orais_dose; }

    public function getAines() { return $this->aines; }
    public function setAines($aines) { $this->aines = $aines; }

    public function getAinesNome() { return $this->aines_nome; }
    public function setAinesNome($aines_nome) { $this->aines_nome = $aines_nome; }

    public function getAinesDose() { return $this->aines_dose; }
    public function setAinesDose($aines_dose) { $this->aines_dose = $aines_dose; }

    public function getInsulina() { return $this->insulina; }
    public function setInsulina($insulina) { $this->insulina = $insulina; }

    public function getInsulinaNome() { return $this->insulina_nome; }
    public function setInsulinaNome($insulina_nome) { $this->insulina_nome = $insulina_nome; }

    public function getInsulinaDose() { return $this->insulina_dose; }
    public function setInsulinaDose($insulina_dose) { $this->insulina_dose = $insulina_dose; }

    public function getDrogasVasoativa() { return $this->drogas_vasoativa; }
    public function setDrogasVasoativa($drogas_vasoativa) { $this->drogas_vasoativa = $drogas_vasoativa; }

    public function getDrogasVasoativaNome() { return $this->drogas_vasoativa_nome; }
    public function setDrogasVasoativaNome($drogas_vasoativa_nome) { $this->drogas_vasoativa_nome = $drogas_vasoativa_nome; }

    public function getDrogasVasoativaDose() { return $this->drogas_vasoativa_dose; }
    public function setDrogasVasoativaDose($drogas_vasoativa_dose) { $this->drogas_vasoativa_dose = $drogas_vasoativa_dose; }

    public function getSuplemento() { return $this->suplemento; }
    public function setSuplemento($suplemento) { $this->suplemento = $suplemento; }

    public function getSuplementoNome() { return $this->suplemento_nome; }
    public function setSuplementoNome($suplemento_nome) { $this->suplemento_nome = $suplemento_nome; }

    public function getSuplementoDose() { return $this->suplemento_dose; }
    public function setSuplementoDose($suplemento_dose) { $this->suplemento_dose = $suplemento_dose; }

    public function getAnticoagulante() { return $this->anticoagulante; }
    public function setAnticoagulante($anticoagulante) { $this->anticoagulante = $anticoagulante; }

    public function getAnticoagulanteNome() { return $this->anticoagulante_nome; }
    public function setAnticoagulanteNome($anticoagulante_nome) { $this->anticoagulante_nome = $anticoagulante_nome; }

    public function getAnticoagulanteDose() { return $this->anticoagulante_dose; }
    public function setAnticoagulanteDose($anticoagulante_dose) { $this->anticoagulante_dose = $anticoagulante_dose; }

    public function getVitaminico() { return $this->vitaminico; }
    public function setVitaminico($vitaminico) { $this->vitaminico = $vitaminico; }

    public function getVitaminicoNome() { return $this->vitaminico_nome; }
    public function setVitaminicoNome($vitaminico_nome) { $this->vitaminico_nome = $vitaminico_nome; }

    public function getVitaminicoDose() { return $this->vitaminico_dose; }
    public function setVitaminicoDose($vitaminico_dose) { $this->vitaminico_dose = $vitaminico_dose; }

    public function getAntirretroviral() { return $this->antirretroviral; }
    public function setAntirretroviral($antirretroviral) { $this->antirretroviral = $antirretroviral; }

    public function getAntirretroviralNome() { return $this->antirretroviral_nome; }
    public function setAntirretroviralNome($antirretroviral_nome) { $this->antirretroviral_nome = $antirretroviral_nome; }

    public function getAntirretroviralDose() { return $this->antirretroviral_dose; }
    public function setAntirretroviralDose($antirretroviral_dose) { $this->antirretroviral_dose = $antirretroviral_dose; }

    public function getOutrosMedicamento() { return $this->outros_medicamento; }
    public function setOutrosMedicamento($outros_medicamento) { $this->outros_medicamento = $outros_medicamento; }

    // Getters e Setters para Tamanho e Características da Ferida
    public function getFotoFerida() { return $this->foto_ferida; }
    public function setFotoFerida($foto_ferida) { $this->foto_ferida = $foto_ferida; }

    public function getFeridaLargura() { return $this->ferida_largura; }
    public function setFeridaLargura($ferida_largura) { $this->ferida_largura = $ferida_largura; }

    public function getFeridaComprimento() { return $this->ferida_comprimento; }
    public function setFeridaComprimento($ferida_comprimento) { $this->ferida_comprimento = $ferida_comprimento; }

    public function getFeridaProfundidade() { return $this->ferida_profundidade; }
    public function setFeridaProfundidade($ferida_profundidade) { $this->ferida_profundidade = $ferida_profundidade; }

    // Getters e Setters para Avaliação da Ferida (TIMERS) - Parte 1
    public function getLocalizacaoFerida() { return $this->localizacao_ferida; }
    public function setLocalizacaoFerida($localizacao_ferida) { $this->localizacao_ferida = $localizacao_ferida; }

    public function getEtiologiaFerida() { return $this->etiologia_ferida; }
    public function setEtiologiaFerida($etiologia_ferida) { $this->etiologia_ferida = $etiologia_ferida; }

    public function getEtiologiaOutra() { return $this->etiologia_outra; }
    public function setEtiologiaOutra($etiologia_outra) { $this->etiologia_outra = $etiologia_outra; }

    public function getTempoEvolucao() { return $this->tempo_evolucao; }
    public function setTempoEvolucao($tempo_evolucao) { $this->tempo_evolucao = $tempo_evolucao; }

    public function getDorEscala() { return $this->dor_escala; }
    public function setDorEscala($dor_escala) { $this->dor_escala = $dor_escala; }

    public function getDorFatores() { return $this->dor_fatores; }
    public function setDorFatores($dor_fatores) { $this->dor_fatores = $dor_fatores; }

    // Getters e Setters para Avaliação da Ferida (TIMERS) - Tecido e Inflamação
    public function getPercentualGranulacaoLeito() { return $this->percentual_granulacao_leito; }
    public function setPercentualGranulacaoLeito($percentual_granulacao_leito) { $this->percentual_granulacao_leito = $percentual_granulacao_leito; }

    public function getPercentualEpitelizacaoLeito() { return $this->percentual_epitelizacao_leito; }
    public function setPercentualEpitelizacaoLeito($percentual_epitelizacao_leito) { $this->percentual_epitelizacao_leito = $percentual_epitelizacao_leito; }

    public function getPercentualEsfaceloLeito() { return $this->percentual_esfacelo_leito; }
    public function setPercentualEsfaceloLeito($percentual_esfacelo_leito) { $this->percentual_esfacelo_leito = $percentual_esfacelo_leito; }

    public function getPercentualNecroseSecaLeito() { return $this->percentual_necrose_seca_leito; }
    public function setPercentualNecroseSecaLeito($percentual_necrose_seca_leito) { $this->percentual_necrose_seca_leito = $percentual_necrose_seca_leito; }

    public function getInflamacaoRubor() { return $this->inflamacao_rubor; }
    public function setInflamacaoRubor($inflamacao_rubor) { $this->inflamacao_rubor = $inflamacao_rubor; }

    public function getInflamacaoCalor() { return $this->inflamacao_calor; }
    public function setInflamacaoCalor($inflamacao_calor) { $this->inflamacao_calor = $inflamacao_calor; }

    public function getInflamacaoEdema() { return $this->inflamacao_edema; }
    public function setInflamacaoEdema($inflamacao_edema) { $this->inflamacao_edema = $inflamacao_edema; }

    public function getInflamacaoDorLocal() { return $this->inflamacao_dor_local; }
    public function setInflamacaoDorLocal($inflamacao_dor_local) { $this->inflamacao_dor_local = $inflamacao_dor_local; }

    public function getInflamacaoPerdaFuncao() { return $this->inflamacao_perda_funcao; }
    public function setInflamacaoPerdaFuncao($inflamacao_perda_funcao) { $this->inflamacao_perda_funcao = $inflamacao_perda_funcao; }

    // Getters e Setters para Avaliação da Ferida (TIMERS) - Infecção e Exsudato
    public function getInfeccaoEritemaPerilesional() { return $this->infeccao_eritema_perilesional; }
    public function setInfeccaoEritemaPerilesional($infeccao_eritema_perilesional) { $this->infeccao_eritema_perilesional = $infeccao_eritema_perilesional; }

    public function getInfeccaoCalorLocal() { return $this->infeccao_calor_local; }
    public function setInfeccaoCalorLocal($infeccao_calor_local) { $this->infeccao_calor_local = $infeccao_calor_local; }

    public function getInfeccaoEdema() { return $this->infeccao_edema; }
    public function setInfeccaoEdema($infeccao_edema) { $this->infeccao_edema = $infeccao_edema; }

    public function getInfeccaoDorLocal() { return $this->infeccao_dor_local; }
    public function setInfeccaoDorLocal($infeccao_dor_local) { $this->infeccao_dor_local = $infeccao_dor_local; }

    public function getInfeccaoExsudato() { return $this->infeccao_exsudato; }
    public function setInfeccaoExsudato($infeccao_exsudato) { $this->infeccao_exsudato = $infeccao_exsudato; }

    public function getInfeccaoOdor() { return $this->infeccao_odor; }
    public function setInfeccaoOdor($infeccao_odor) { $this->infeccao_odor = $infeccao_odor; }

    public function getInfeccaoRetardoCicatrizacao() { return $this->infeccao_retardo_cicatrizacao; }
    public function setInfeccaoRetardoCicatrizacao($infeccao_retardo_cicatrizacao) { $this->infeccao_retardo_cicatrizacao = $infeccao_retardo_cicatrizacao; }

    public function getCulturaRealizada() { return $this->cultura_realizada; }
    public function setCulturaRealizada($cultura_realizada) { $this->cultura_realizada = $cultura_realizada; }

    public function getResultadoCultura() { return $this->resultado_cultura; }
    public function setResultadoCultura($resultado_cultura) { $this->resultado_cultura = $resultado_cultura; }

    // Getters e Setters para Avaliação da Ferida (TIMERS) - Exsudato e Pele Perilesional
    public function getQuantidadeExsudato() { return $this->quantidade_exsudato; }
    public function setQuantidadeExsudato($quantidade_exsudato) { $this->quantidade_exsudato = $quantidade_exsudato; }

    public function getTipoExsudato() { return $this->tipo_exsudato; }
    public function setTipoExsudato($tipo_exsudato) { $this->tipo_exsudato = $tipo_exsudato; }

    public function getConsistenciaExsudato() { return $this->consistencia_exsudato; }
    public function setConsistenciaExsudato($consistencia_exsudato) { $this->consistencia_exsudato = $consistencia_exsudato; }

    public function getPelePerilesionalUmidade() { return $this->pele_perilesional_umidade; }
    public function setPelePerilesionalUmidade($pele_perilesional_umidade) { $this->pele_perilesional_umidade = $pele_perilesional_umidade; }

    public function getPelePerilesionalExtensao() { return $this->pele_perilesional_extensao; }
    public function setPelePerilesionalExtensao($pele_perilesional_extensao) { $this->pele_perilesional_extensao = $pele_perilesional_extensao; }

    // Getters e Setters para Avaliação da Ferida (TIMERS) - Bordas e Cicatrização
    public function getBordasCaracteristicas() { return $this->bordas_caracteristicas; }
    public function setBordasCaracteristicas($bordas_caracteristicas) { $this->bordas_caracteristicas = $bordas_caracteristicas; }

    public function getFixacaoBordas() { return $this->fixacao_bordas; }
    public function setFixacaoBordas($fixacao_bordas) { $this->fixacao_bordas = $fixacao_bordas; }

    public function getTunelCavidade() { return $this->tunel_cavidade; }
    public function setTunelCavidade($tunel_cavidade) { $this->tunel_cavidade = $tunel_cavidade; }

    public function getLocalizacaoTunelCavidade() { return $this->localizacao_tunel_cavidade; }
    public function setLocalizacaoTunelCavidade($localizacao_tunel_cavidade) { $this->localizacao_tunel_cavidade = $localizacao_tunel_cavidade; }

    public function getVelocidadeCicatrizacao() { return $this->velocidade_cicatrizacao; }
    public function setVelocidadeCicatrizacao($velocidade_cicatrizacao) { $this->velocidade_cicatrizacao = $velocidade_cicatrizacao; }

    public function getPelePerilesionalIntegra() { return $this->pele_perilesional_integra; }
    public function setPelePerilesionalIntegra($pele_perilesional_integra) { $this->pele_perilesional_integra = $pele_perilesional_integra; }

    public function getPelePerilesionalEritematosa() { return $this->pele_perilesional_eritematosa; }
    public function setPelePerilesionalEritematosa($pele_perilesional_eritematosa) { $this->pele_perilesional_eritematosa = $pele_perilesional_eritematosa; }

    public function getPelePerilesionalMacerada() { return $this->pele_perilesional_macerada; }
    public function setPelePerilesionalMacerada($pele_perilesional_macerada) { $this->pele_perilesional_macerada = $pele_perilesional_macerada; }

    public function getPelePerilesionalSecaDescamativa() { return $this->pele_perilesional_seca_descamativa; }
    public function setPelePerilesionalSecaDescamativa($pele_perilesional_seca_descamativa) { $this->pele_perilesional_seca_descamativa = $pele_perilesional_seca_descamativa; }

    public function getPelePerilesionalEczematosa() { return $this->pele_perilesional_eczematosa; }
    public function setPelePerilesionalEczematosa($pele_perilesional_eczematosa) { $this->pele_perilesional_eczematosa = $pele_perilesional_eczematosa; }

    public function getPelePerilesionalHiperpigmentada() { return $this->pele_perilesional_hiperpigmentada; }
    public function setPelePerilesionalHiperpigmentada($pele_perilesional_hiperpigmentada) { $this->pele_perilesional_hiperpigmentada = $pele_perilesional_hiperpigmentada; }

    public function getPelePerilesionalHipopigmentada() { return $this->pele_perilesional_hipopigmentada; }
    public function setPelePerilesionalHipopigmentada($pele_perilesional_hipopigmentada) { $this->pele_perilesional_hipopigmentada = $pele_perilesional_hipopigmentada; }

    public function getPelePerilesionalIndurada() { return $this->pele_perilesional_indurada; }
    public function setPelePerilesionalIndurada($pele_perilesional_indurada) { $this->pele_perilesional_indurada = $pele_perilesional_indurada; }

    public function getPelePerilesionalSensivel() { return $this->pele_perilesional_sensivel; }
    public function setPelePerilesionalSensivel($pele_perilesional_sensivel) { $this->pele_perilesional_sensivel = $pele_perilesional_sensivel; }

    public function getPelePerilesionalEdema() { return $this->pele_perilesional_edema; }
    public function setPelePerilesionalEdema($pele_perilesional_edema) { $this->pele_perilesional_edema = $pele_perilesional_edema; }

    // Getters e Setters para Informações Adicionais
    public function getObservacoes() { return $this->observacoes; }
    public function setObservacoes($observacoes) { $this->observacoes = $observacoes; }

    public function getDataConsulta() { return $this->data_consulta; }
    public function setDataConsulta($data_consulta) { $this->data_consulta = $data_consulta; }

    public function getHoraConsulta() { return $this->hora_consulta; }
    public function setHoraConsulta($hora_consulta) { $this->hora_consulta = $hora_consulta; }

    public function getProfissionalResponsavel() { return $this->profissional_responsavel; }
    public function setProfissionalResponsavel($profissional_responsavel) { $this->profissional_responsavel = $profissional_responsavel; }

    public function getCoren() { return $this->coren; }
    public function setCoren($coren) { $this->coren = $coren; }

    public function getAssinatura() { return $this->assinatura; }
    public function setAssinatura($assinatura) { $this->assinatura = $assinatura; }

    public function getDataAtualizacao() { return $this->data_atualizacao; }
    public function setDataAtualizacao($data_atualizacao) { $this->data_atualizacao = $data_atualizacao; }
}
?>
