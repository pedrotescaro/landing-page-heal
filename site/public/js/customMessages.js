
// document.addEventListener('DOMContentLoaded', () => {
//     const steps = document.querySelectorAll('.step');
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const submitBtn = document.getElementById('submitBtn');
//     const progressBar = document.getElementById('progress-bar');
//     const stepCounter = document.getElementById('step-counter');
//     const anamneseForm = document.getElementById('anamnese-form');

//     let currentStep = 0;

//     const fotoFeridaInput = document.getElementById('foto_ferida');
//     const larguraFeridaInput = document.querySelector('input[name="ferida_largura"]');
//     const comprimentoFeridaInput = document.querySelector('input[name="ferida_comprimento"]');
//     const profundidadeFeridaInput = document.querySelector('input[name="ferida_profundidade"]');

//     // Function to display custom messages
//     function showMessageBox(message, type) {
//         const messageBox = document.createElement('div');
//         messageBox.classList.add('message-box', type);
//         messageBox.textContent = message;
//         document.body.appendChild(messageBox);

//         setTimeout(() => {
//             messageBox.style.opacity = 1;
//         }, 10);

//         setTimeout(() => {
//             messageBox.style.opacity = 0;
//             messageBox.addEventListener('transitionend', () => messageBox.remove());
//         }, 3000);
//     }

//     function toggleTamanhoFeridaRequired() {
//         if (fotoFeridaInput.files.length > 0) {
//             larguraFeridaInput.removeAttribute('required');
//             comprimentoFeridaInput.removeAttribute('required');
//             profundidadeFeridaInput.removeAttribute('required');
//         } else {
//             larguraFeridaInput.setAttribute('required', '');
//             comprimentoFeridaInput.setAttribute('required', '');
//             profundidadeFeridaInput.setAttribute('required', '');
//         }
//     }

//     function updateProgressBar() {
//         const progress = ((currentStep + 1) / steps.length) * 100;
//         progressBar.style.width = progress + '%';
//     }

//     function updateStepCounter() {
//         stepCounter.textContent = `Tela ${currentStep + 1} de ${steps.length}`;
//     }

//     function showStep(n) {
//         if (n < 0 || n >= steps.length) {
//             console.error(`Attempted to show invalid step: ${n}. Total steps: ${steps.length}`);
//             return;
//         }

//         steps.forEach(step => step.classList.remove('active'));
//         document.querySelectorAll('[data-original-required]').forEach(field => {
//             field.removeAttribute('required');
//         });

//         steps[n].classList.add('active');
//         currentStep = n;

//         steps[n].querySelectorAll('[data-original-required]').forEach(field => {
//             field.setAttribute('required', '');
//         });

//         if (currentStep === 0) {
//             toggleTamanhoFeridaRequired();
//         }

//         updateProgressBar();
//         updateStepCounter();

//         if (currentStep === 0) {
//             prevBtn.style.display = 'none';
//         } else {
//             prevBtn.style.display = 'inline-block';
//         }

//         if (currentStep === steps.length - 1) {
//             nextBtn.style.display = 'none';
//             submitBtn.style.display = 'inline-block';
//         } else {
//             nextBtn.style.display = 'inline-block';
//             submitBtn.style.display = 'none';
//         }
//     }

//     // Store original 'required' state for all elements on load
//     document.querySelectorAll('.step input[required], .step select[required], .step textarea[required]').forEach(field => {
//         field.setAttribute('data-original-required', 'true');
//     });

//     prevBtn.addEventListener('click', () => {
//         if (currentStep > 0) {
//             currentStep--;
//             window.scrollTo(0, 0);
//             showStep(currentStep);
//         }
//     });

//     nextBtn.addEventListener('click', () => {
//         const activeStep = steps[currentStep];
//         const requiredFields = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
//         let allFieldsValid = true;
//         let firstInvalidField = null;

//         requiredFields.forEach(field => {
//             // Check if field is visible and not disabled, and if it's empty
//             if (!field.value.trim() && field.offsetParent !== null && !field.disabled) {
//                 allFieldsValid = false;
//                 field.classList.add('is-invalid');
//                 if (!firstInvalidField) {
//                     firstInvalidField = field;
//                 }
//             } else {
//                 field.classList.remove('is-invalid');
//             }
//         });

//         if (allFieldsValid) {
//             if (currentStep < steps.length - 1) {
//                 currentStep++;
//                 window.scrollTo(0, 0);
//                 showStep(currentStep);
//             }
//         } else {
//             showMessageBox('Por favor, preencha todos os campos obrigatórios nesta tela antes de avançar.', 'error');
//             if (firstInvalidField) {
//                 firstInvalidField.focus();
//                 firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//         }
//     });

//     anamneseForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const formData = new FormData(anamneseForm);
//         const data = {};

//         // Process form data
//         for (let [key, value] of formData.entries()) {
//             const inputElement = anamneseForm.querySelector(`[name="${key}"]`);
//             if (inputElement && inputElement.type === 'checkbox') {
//                 data[key] = inputElement.checked ? 1 : 0;
//             } else {
//                 data[key] = value;
//             }
//         }

//         // Handle hidden inputs that might not be in formData if they were hidden
//         anamneseForm.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
//             if (input.id.endsWith('_nome') || input.id.endsWith('_dose') || input.id === 'qual_doenca' || input.id === 'qual_alergia' || input.id === 'qual_atividade' || input.id === 'frequencia_atividade' || input.id === 'frequencia_alcool' || input.id === 'localizacao_tunel_cavidade' || input.id === 'tipo_edema_perilesional' || input.id === 'controle_glicemico' || input.id === 'pulsos_perifericos' || input.id === 'etiologia_outra' || input.id === 'pele_perilesional_extensao' || input.id === 'outros_hpp' || input.id === 'outros_medicamento' || input.id === 'quantos_filhos' || input.id === 'quais_cirurgias') {
//                 if (input.style.display === 'none') {
//                     data[input.name] = ''; // Clear value if input is hidden
//                 }
//             }
//         });

//         let storedAnamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
//         const editingIndex = localStorage.getItem('editingAnamneseIndex'); // Get index from localStorage

//         try {
//             if (editingIndex !== null) {
//                 // Editing existing anamnese
//                 storedAnamneses[parseInt(editingIndex)] = data;
//                 showMessageBox('Anamnese atualizada com sucesso!', 'success');
//             } else {
//                 // Adding new anamnese
//                 storedAnamneses.push(data);
//                 showMessageBox('Anamnese salva com sucesso!', 'success');
//             }
//             localStorage.setItem('anamneses', JSON.stringify(storedAnamneses));

//             // Clear temporary data used for editing
//             localStorage.removeItem('editingAnamneseData');
//             localStorage.removeItem('editingAnamneseIndex');

//             // Redirect back to dashboard with a success message
//             const encodedMessage = encodeURIComponent('Anamnese salva/atualizada com sucesso!');
//             window.location.href = `dashboard.html?messageType=success&messageText=${encodedMessage}`;

//         } catch (error) {
//             console.error('Erro ao salvar/atualizar anamnese:', error);
//             const encodedError = encodeURIComponent(`Erro ao salvar/atualizar anamnese: ${error.message}`);
//             window.location.href = `dashboard.html?messageType=error&messageText=${encodedError}`;
//         }
//     });

//     fotoFeridaInput.addEventListener('change', toggleTamanhoFeridaRequired);

//     // Initial call to set required fields for the first step and show it
//     showStep(currentStep);

//     // Conditional display for form fields (copied from your original script)
//     document.getElementById('diabetes').addEventListener('change', function () {
//         document.getElementById('controle_glicemico_group').style.display = this.value === '1' ? 'block' : 'none';
//     });
//     const etiologiaSelect = document.getElementById('etiologia_ferida');
//     const outraEtiologiaInput = document.getElementById('etiologia_outra');
//     etiologiaSelect.addEventListener('change', function () {
//         outraEtiologiaInput.style.display = this.value === 'outra' ? 'block' : 'none';
//     });
//     const doencaVascularCheckbox = document.getElementById('doenca_vascular');
//     const funcaoVascularGroup = document.getElementById('funcao_vascular_group');
//     doencaVascularCheckbox.addEventListener('change', function () {
//         funcaoVascularGroup.style.display = this.checked ? 'block' : 'none';
//     });

//     const possuiDoencaSelect = document.getElementById('possui_doenca');
//     possuiDoencaSelect.addEventListener('change', function () {
//         const temDoenca = this.value === '1';
//         const doencaText = document.getElementById('qual_doenca');
//         doencaText.style.display = temDoenca ? 'block' : 'none';
//         if (!temDoenca) {
//             doencaText.value = '';
//         }
//     });
//     const usaMedicacaoSelect = document.getElementById('usa_medicacao');
//     const qualMedicacaoInput = document.getElementById('qual_medicacao');
//     usaMedicacaoSelect.addEventListener('change', function () {
//         qualMedicacaoInput.style.display = this.value === '1' ? 'block' : 'none';
//         if (this.value !== '1') {
//             qualMedicacaoInput.value = '';
//         }
//     });
//     const possuiAlergiaSelect = document.getElementById('possui_alergia');
//     const qualAlergiaInput = document.getElementById('qual_alergia');
//     possuiAlergiaSelect.addEventListener('change', function () {
//         qualAlergiaInput.style.display = this.value === '1' ? 'block' : 'none';
//         if (this.value !== '1') {
//             qualAlergiaInput.value = '';
//         }
//     });
//     const praticaAtividadeFisicaSelect = document.getElementById('pratica_atividade_fisica');
//     const qualAtividadeInput = document.getElementById('qual_atividade');
//     const frequenciaAtividadeInput = document.getElementById('frequencia_atividade');
//     praticaAtividadeFisicaSelect.addEventListener('change', function () {
//         const pratica = this.value === '1';
//         qualAtividadeInput.style.display = pratica ? 'block' : 'none';
//         frequenciaAtividadeInput.style.display = pratica ? 'block' : 'none';
//         if (!pratica) {
//             qualAtividadeInput.value = '';
//             frequenciaAtividadeInput.value = '';
//         }
//     });
//     const ingestaAlcoolSelect = document.getElementById('ingestao_alcool');
//     const frequenciaAlcoolInput = document.getElementById('frequencia_alcool');
//     ingestaAlcoolSelect.addEventListener('change', function () {
//         frequenciaAlcoolInput.style.display = this.value === '1' ? 'block' : 'none';
//         if (this.value !== '1') {
//             frequenciaAlcoolInput.value = ''; // Corrected variable name
//         }
//     });

//     // Populate form if in edit mode
//     const urlParams = new URLSearchParams(window.location.search);
//     if (urlParams.get('mode') === 'edit') {
//         const editingAnamneseData = JSON.parse(localStorage.getItem('editingAnamneseData'));
//         if (editingAnamneseData) {
//             document.querySelector('h1').textContent = 'Editar Anamnese';
//             for (const key in editingAnamneseData) {
//                 const input = anamneseForm.elements[key];
//                 if (input) {
//                     if (input.type === 'checkbox') {
//                         input.checked = editingAnamneseData[key] === 1;
//                     } else {
//                         input.value = editingAnamneseData[key];
//                     }
//                     // Trigger change event for dynamic fields
//                     if (input.tagName === 'SELECT' || input.type === 'checkbox') {
//                         input.dispatchEvent(new Event('change'));
//                     }
//                 }
//             }
//             // Special handling for text inputs associated with checkboxes
//             anamneseForm.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
//                 const associatedInputName = checkbox.name + '_nome' || checkbox.name + '_dose';
//                 const associatedInput = anamneseForm.elements[associatedInputName];
//                 if (associatedInput) {
//                     if (checkbox.checked && editingAnamneseData[associatedInputName]) {
//                         associatedInput.value = editingAnamneseData[associatedInputName];
//                         associatedInput.style.display = 'block'; // Ensure it's visible
//                     } else {
//                         associatedInput.style.display = 'none'; // Ensure it's hidden if checkbox not checked
//                     }
//                 }
//             });

//         } else {
//             showMessageBox('Erro: Dados da anamnese para edição não encontrados.', 'error');
//         }
//     } else {
//         // For new anamnese, clear any lingering editing data
//         localStorage.removeItem('editingAnamneseData');
//         localStorage.removeItem('editingAnamneseIndex');
//     }
// });


// public/js/script.js

// --- Configuração da API (Atualize com suas URLs reais!) ---
const API_BASE_URL = 'http://localhost/site/public/index.php/api'; // Exemplo, ajuste se o seu index.php estiver em outro lugar
const API_ENDPOINTS = {
    anamneses: `${API_BASE_URL}/anamnese`, // Para GET (todos), POST (criar)
    anamneseById: (id) => `${API_BASE_URL}/anamnese/${id}`, // Para GET (único), PUT (atualizar), DELETE (deletar)
    patients: `${API_BASE_URL}/patients`, // Exemplo de endpoint para listar pacientes (se você tiver um)
    upload: `${API_BASE_URL}/upload`, // Exemplo de endpoint para upload de arquivos (se você tiver um)
};

// --- Funções auxiliares (manter como estão, se existirem em customMessages.js) ---
function showMessage(message, type = 'success') {
    if (typeof window.showMessage === 'function') {
        window.showMessage(message, type);
    } else {
        console.log(`Mensagem (${type}): ${message}`);
        alert(message);
    }
}

// --- Elementos do Formulário e Lógica de Navegação (existentes) ---
const form = document.getElementById('anamnese-form');
const steps = Array.from(document.querySelectorAll('.step'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progress-bar');
const stepCounter = document.getElementById('step-counter');

let currentStep = 0;
// Variável para armazenar o ID da anamnese em edição, substituindo localStorage
let editingAnamneseId = null;

function updateProgressBar() {
    const progress = (currentStep / (steps.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
    stepCounter.textContent = `Passo ${currentStep + 1} de ${steps.length}`;

    prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-block' : 'none';

    const finalizationContainer = document.getElementById('finalizacao-container');
    if (currentStep === steps.length - 1) {
        finalizationContainer.style.display = 'block';
        loadAnamnesesForList(); // Carrega a lista do BD ao ir para a última etapa
        loadPatientsForSelect(); // Carrega pacientes do BD para o select
    } else {
        finalizationContainer.style.display = 'none';
    }
}

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    currentStep = stepIndex;
    updateProgressBar();
}

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
});

nextBtn.addEventListener('click', () => {
    const currentActiveStep = steps[currentStep];
    const requiredInputs = currentActiveStep.querySelectorAll('[required]');
    let allInputsValid = true;

    requiredInputs.forEach(input => {
        if (input.type === 'file') {
            // Para arquivos, verifica se um arquivo foi selecionado OU se já existe uma URL de arquivo
            if (!input.files.length > 0 && !input.dataset.currentUrl) {
                 input.style.borderColor = 'red';
                 allInputsValid = false;
            } else {
                 input.style.borderColor = '';
            }
        } else if (!input.value.trim()) {
            input.style.borderColor = 'red';
            allInputsValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!allInputsValid) {
        showMessage('Por favor, preencha todos os campos obrigatórios para avançar.', 'error');
        return;
    }

    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
    }
});

// --- Adaptação da Submissão do Formulário para a API ---
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(form);
    const data = {};
    const filesToUpload = {}; // Para armazenar arquivos (File objects)

    for (const [key, value] of formData.entries()) {
        const element = form.elements[key];

        if (element.type === 'checkbox') {
            data[key] = element.checked ? 1 : 0; // Converte checkbox para 1 ou 0
        } else if (element.type === 'file') {
            if (element.files.length > 0) {
                // Se um novo arquivo foi selecionado, armazene-o para upload separado
                filesToUpload[key] = element.files[0];
            } else if (element.dataset.currentUrl) {
                // Se não há novo arquivo, mas há uma URL de um arquivo existente (em edição)
                data[key] = element.dataset.currentUrl;
            } else {
                // Se não há arquivo e não há URL existente
                data[key] = null;
            }
        } else if (value.trim() !== '') {
            data[key] = value.trim();
        } else {
            data[key] = null; // Campos vazios podem ser tratados como null na API
        }
    }

    // Tratamento dos campos de medicamento e outros campos dinâmicos
    const medications = [
        'anti_hipertensivo', 'corticoides', 'hipoglicemiantes_orais', 'aines',
        'insulina', 'drogas_vasoativa', 'suplemento', 'anticoagulante',
        'vitaminico', 'antirretroviral'
    ];
    medications.forEach(medId => {
        const checkbox = document.getElementById(medId);
        if (checkbox) { // Verifica se o checkbox existe
            if (checkbox.checked) {
                const nameInput = document.querySelector(`input[name="${medId}_nome"]`);
                const doseInput = document.querySelector(`input[name="${medId}_dose"]`);
                data[`${medId}_nome`] = (nameInput && nameInput.value.trim()) || null;
                data[`${medId}_dose`] = (doseInput && doseInput.value.trim()) || null;
            } else {
                data[`${medId}_nome`] = null;
                data[`${medId}_dose`] = null;
            }
        }
    });

    // Converte strings numéricas para números reais (se sua API esperar números)
    ['ferida_largura', 'ferida_comprimento', 'ferida_profundidade', 'dor_escala',
     'percentual_granulacao_leito', 'percentual_epitelizacao_leito',
     'percentual_esfacelo_leito', 'percentual_necrose_seca_leito',
     'quantos_filhos'
    ].forEach(field => {
        if (data[field] !== null && data[field] !== undefined && data[field] !== '') {
            data[field] = parseFloat(data[field]);
        } else {
            data[field] = null;
        }
    });

    try {
        // 1. **Upload de arquivos (se novos arquivos foram selecionados)**
        for (const fileKey in filesToUpload) {
            const file = filesToUpload[fileKey];
            const uploadResult = await uploadFile(file, fileKey); // fileKey será 'foto_ferida' ou 'assinatura'
            if (uploadResult && uploadResult.url) {
                data[fileKey] = uploadResult.url; // Armazena a URL retornada pela API no payload principal
                showMessage(`Upload de ${fileKey.replace('_', ' ')} concluído!`, 'success');
            } else {
                showMessage(`Falha no upload de ${fileKey.replace('_', ' ')}. Abortando salvamento.`, 'error');
                return; // Impede o salvamento da anamnese se o upload falhar
            }
        }

        // 2. **Envio dos dados principais da anamnese para o backend**
        if (editingAnamneseId) {
            await updateAnamnese(editingAnamneseId, data);
        } else {
            await createAnamnese(data);
        }

    } catch (error) {
        console.error('Erro no processo de submissão do formulário:', error);
        showMessage(`Erro: ${error.message}`, 'error');
    }
});

// --- Novas Funções para Interação com a API ---

/**
 * Envia um arquivo para o endpoint de upload da API.
 * @param {File} file - O objeto File a ser enviado.
 * @param {string} type - Um identificador para o tipo de arquivo (ex: 'foto_ferida', 'assinatura').
 * @returns {Promise<Object>} Promessa que resolve com a resposta da API (espera-se uma URL).
 */
async function uploadFile(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type); // Pode ser útil para o backend identificar o tipo de upload

    try {
        const response = await fetch(API_ENDPOINTS.upload, {
            method: 'POST',
            body: formData, // FormData é enviado diretamente, fetch define o Content-Type correto (multipart/form-data)
            // Inclua cabeçalhos de autenticação se sua API exigir
            // headers: { 'Authorization': 'Bearer SEU_TOKEN_AQUI' },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ao fazer upload de ${type}.`);
        }

        return await response.json(); // Espera-se que a API retorne um JSON com a URL do arquivo, ex: { url: "caminho/do/arquivo.jpg" }
    } catch (error) {
        console.error(`Erro no upload de ${type}:`, error);
        throw error; // Re-lança o erro para ser capturado no bloco catch principal
    }
}

/**
 * Envia os dados de uma nova anamnese para a API.
 * @param {Object} anamneseData - Os dados da anamnese a serem criados.
 */
async function createAnamnese(anamneseData) {
    try {
        const response = await fetch(API_ENDPOINTS.anamneses, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
            },
            body: JSON.stringify(anamneseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar anamnese.');
        }

        const result = await response.json();
        console.log('Anamnese salva com sucesso:', result);
        showMessage('Anamnese salva com sucesso!', 'success');
        form.reset();
        resetPhotoPreviews();
        editingAnamneseId = null; // Garante que não estamos em modo de edição
        document.querySelector('h1').textContent = 'Ficha de Anamnese'; // Restaura o título
        showStep(0); // Volta para o primeiro passo
        loadAnamnesesForList(); // Recarrega a lista para mostrar a nova anamnese

    } catch (error) {
        console.error('Erro ao criar anamnese:', error);
        showMessage(`Erro ao salvar anamnese: ${error.message}`, 'error');
    }
}

/**
 * Atualiza uma anamnese existente na API.
 * @param {string} id - O ID da anamnese a ser atualizada.
 * @param {Object} updatedData - Os dados atualizados da anamnese.
 */
async function updateAnamnese(id, updatedData) {
    try {
        const response = await fetch(API_ENDPOINTS.anamneseById(id), {
            method: 'PUT', // Ou 'PATCH', dependendo da sua API PHP
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar anamnese.');
        }

        const result = await response.json();
        console.log('Anamnese atualizada com sucesso:', result);
        showMessage('Anamnese atualizada com sucesso!', 'success');
        form.reset();
        resetPhotoPreviews();
        editingAnamneseId = null; // Sai do modo de edição
        document.querySelector('h1').textContent = 'Ficha de Anamnese'; // Restaura o título
        showStep(0);
        loadAnamnesesForList(); // Recarrega a lista para mostrar a anamnese atualizada

    } catch (error) {
        console.error('Erro ao atualizar anamnese:', error);
        showMessage(`Erro ao atualizar anamnese: ${error.message}`, 'error');
    }
}

/**
 * Carrega a lista de anamneses da API para a seção de finalização.
 */
async function loadAnamnesesForList() {
    const anamnesesListUl = document.getElementById('anamneses-list-ul');
    anamnesesListUl.innerHTML = ''; // Limpa a lista existente

    try {
        const response = await fetch(API_ENDPOINTS.anamneses, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao carregar anamneses.');
        }

        const anamneses = await response.json();

        if (anamneses.length === 0) {
            anamnesesListUl.innerHTML = '<li>Nenhuma anamnese cadastrada.</li>';
            return;
        }

        anamneses.forEach(anamnese => {
            const listItem = document.createElement('li');
            listItem.classList.add('anamnese-item');
            listItem.innerHTML = `
                <strong>${anamnese.nome_cliente || 'Paciente sem nome'}</strong> -
                ${new Date(anamnese.data_consulta).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                <button type="button" class="view-anamnese-btn" data-id="${anamnese.id}" style="margin-left: 10px;">Ver/Editar</button>
                <button type="button" class="delete-anamnese-btn" data-id="${anamnese.id}" style="margin-left: 5px; background-color: #f44336;">Excluir</button>
            `;
            anamnesesListUl.appendChild(listItem);
        });

        // Adiciona event listeners para os botões "Ver/Editar"
        anamnesesListUl.querySelectorAll('.view-anamnese-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const anamneseId = event.target.dataset.id;
                fetchAnamneseById(anamneseId);
            });
        });

        // Adiciona event listeners para os botões "Excluir"
        anamnesesListUl.querySelectorAll('.delete-anamnese-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const anamneseId = event.target.dataset.id;
                if (confirm('Tem certeza que deseja excluir esta anamnese?')) {
                    deleteAnamnese(anamneseId);
                }
            });
        });

    } catch (error) {
        console.error('Erro ao carregar anamneses:', error);
        showMessage(`Erro ao carregar anamneses: ${error.message}`, 'error');
    }
}

/**
 * Popula os campos do formulário com os dados de uma anamnese.
 * @param {Object} data - O objeto de dados da anamnese retornado pela API.
 */
function populateFormWithData(data) {
    form.reset(); // Limpa o formulário
    resetPhotoPreviews(); // Limpa pré-visualizações e URLs antigas

    for (const key in data) {
        const input = document.getElementById(key);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = (data[key] === 1 || data[key] === true);
                input.dispatchEvent(new Event('change')); // Dispara para atualizar campos dependentes
            } else if (input.type === 'file') {
                if (data[key]) { // Se a API retornou uma URL para o arquivo
                    const imgPreview = document.getElementById(`${key}-preview-img`);
                    const previewText = document.getElementById(`${key}-preview-text`);
                    const removerBtn = document.getElementById(`remover-${key.replace('_', '-')}`);
                    if (imgPreview && previewText && removerBtn) {
                        imgPreview.src = data[key];
                        imgPreview.style.display = 'block';
                        previewText.style.display = 'block';
                        removerBtn.style.display = 'inline-block';
                        input.dataset.currentUrl = data[key]; // Guarda a URL para re-envio
                    }
                }
            } else if (input.tagName === 'SELECT' || input.type === 'radio') {
                input.value = data[key];
                input.dispatchEvent(new Event('change')); // Dispara para atualizar campos dependentes
            } else if (input.type === 'date' && data[key]) {
                // Formata a data para 'YYYY-MM-DD' para o input type="date"
                input.value = data[key].split('T')[0]; // Supondo formato ISO 8601 (2024-06-17T10:00:00)
            } else if (input.type === 'range') {
                input.value = data[key];
                input.dispatchEvent(new Event('input')); // Dispara para atualizar displays de range
            } else {
                input.value = data[key];
            }
        }
    }

    // Lógica para preencher campos associados a checkboxes e selects (adaptação da sua lógica original)
    // Isso é crucial porque seu HTML usa `display: none` e `display: block`
    // em muitos lugares. `populateFormWithData` precisa "reconstruir" o estado visual.
    const conditionalDisplayMap = {
        'usa_medicacao': 'qual_medicacao',
        'possui_doenca': 'qual_doenca',
        'possui_alergia': 'qual_alergia',
        'pratica_atividade_fisica': ['qual_atividade', 'frequencia_atividade'],
        'ingestao_alcool': 'frequencia_alcool',
        'tem_filhos': 'quantos_filhos',
        'realizou_cirurgias': 'quais_cirurgias',
        'cultura_realizada': 'resultado_cultura',
        'etiologia_ferida': 'etiologia_outra',
        'doenca_vascular': 'funcao_vascular_group'
    };

    for (const parentId in conditionalDisplayMap) {
        const parentElement = document.getElementById(parentId);
        if (!parentElement) continue;

        const childrenIds = Array.isArray(conditionalDisplayMap[parentId]) ? conditionalDisplayMap[parentId] : [conditionalDisplayMap[parentId]];
        const childrenElements = childrenIds.map(id => document.getElementById(id)).filter(el => el);

        let shouldShow = false;
        if (parentElement.tagName === 'SELECT') {
            shouldShow = (parentElement.value === '1' || parentElement.value === 'outra');
        } else if (parentElement.type === 'checkbox') {
            shouldShow = parentElement.checked;
        }

        childrenElements.forEach(child => {
            child.style.display = shouldShow ? 'block' : 'none';
            if (!shouldShow) child.value = ''; // Limpa o valor se ocultado
        });
    }

    // Re-trigger the specific medication fields visibility (from HPP section)
    const medicalConditionCheckboxes = [
        'dmi', 'dmii', 'has', 'neoplasia', 'hiv_aids', 'obesidade',
        'cardiopatia', 'dpoc', 'doenca_hematologica', 'doenca_vascular',
        'demencia_senil', 'insuficiencia_renal', 'hanseniase',
        'insuficiencia_hepatica', 'doenca_autoimune'
    ];
    medicalConditionCheckboxes.forEach(checkboxId => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = (data[checkboxId] === 1 || data[checkboxId] === true);
            // Se houver campos de texto associados a esses checkboxes, re-mostre-os
            // (Assumindo que eles têm o padrão `checkboxId_nome` ou `checkboxId_dose`)
            const nameInput = document.querySelector(`input[name="${checkboxId}_nome"]`);
            const doseInput = document.querySelector(`input[name="${checkboxId}_dose"]`);
            if (nameInput) nameInput.style.display = checkbox.checked ? 'block' : 'none';
            if (doseInput) doseInput.style.display = checkbox.checked ? 'block' : 'none';
            if (!checkbox.checked) {
                if (nameInput) nameInput.value = '';
                if (doseInput) doseInput.value = '';
            }
        }
    });

    if (data.outros_hpp) {
        document.getElementById('outros_hpp').value = data.outros_hpp;
    }

    // Recarrega as porcentagens de tecido na barra de progresso (do tecido.js)
    if (typeof window.updateTissueProgressBar === 'function') {
        window.updateTissueProgressBar();
    }
     // Re-executa toggleTamanhoFeridaRequired para ajustar 'required' após carregar foto/medidas
    toggleTamanhoFeridaRequired();
}


/**
 * Exclui uma anamnese da API.
 * @param {string} id - O ID da anamnese a ser excluída.
 */
async function deleteAnamnese(id) {
    try {
        const response = await fetch(API_ENDPOINTS.anamneseById(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir anamnese.');
        }

        showMessage('Anamnese excluída com sucesso!', 'success');
        loadAnamnesesForList(); // Recarrega a lista após a exclusão
    } catch (error) {
        console.error('Erro ao excluir anamnese:', error);
        showMessage(`Erro ao excluir anamnese: ${error.message}`, 'error');
    }
}

/**
 * Busca a lista de pacientes da API e preenche o select de pacientes.
 */
async function loadPatientsForSelect() {
    const patientSelect = document.getElementById('paciente');
    patientSelect.innerHTML = '<option value="">Inserir paciente</option>'; // Opção padrão

    try {
        // Altere este endpoint se seus pacientes estiverem em uma rota diferente
        const response = await fetch(API_ENDPOINTS.patients, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao carregar pacientes.');
        }

        const patients = await response.json();

        if (patients.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Nenhum paciente cadastrado';
            patientSelect.appendChild(option);
            return;
        }

        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id; // Supondo que 'id' é o identificador do paciente
            option.textContent = patient.nome_cliente || patient.nome || `Paciente ${patient.id}`; // Adapte ao nome do campo do paciente na sua API
            patientSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
        showMessage(`Erro ao carregar pacientes para o seletor: ${error.message}`, 'error');
    }
}

// --- Funções de manipulação de pré-visualização de arquivos (Foto e Assinatura) ---

function resetPhotoPreviews() {
    const photoInput = document.getElementById('foto_ferida');
    const signatureInput = document.getElementById('assinatura');
    const photoPreviewImg = document.getElementById('photo-preview-img');
    const photoPreviewText = document.getElementById('photo-preview-text');
    const removerFotoBtn = document.getElementById('remover-foto');
    const signaturePreviewImg = document.getElementById('assinatura-preview-img');
    const signaturePreviewText = document.getElementById('assinatura-preview-text');
    const removerAssinaturaBtn = document.getElementById('remover-assinatura');

    // Limpa o input file (importante para que .files.length seja 0 se nenhum novo arquivo for selecionado)
    photoInput.value = '';
    // Limpa a URL armazenada no dataset
    photoInput.dataset.currentUrl = '';
    photoPreviewImg.src = '';
    photoPreviewImg.style.display = 'none';
    photoPreviewText.style.display = 'none';
    removerFotoBtn.style.display = 'none';

    signatureInput.value = '';
    signatureInput.dataset.currentUrl = '';
    signaturePreviewImg.src = '';
    signaturePreviewImg.style.display = 'none';
    signaturePreviewText.style.display = 'none';
    removerAssinaturaBtn.style.display = 'none';

    toggleTamanhoFeridaRequired(); // Reajusta o required do tamanho da ferida
}


// A função `toggleTamanhoFeridaRequired` é importante e precisa verificar
// se há uma foto (seja recém-selecionada ou uma URL existente da API)
// ou se os campos de medida são obrigatórios.
function toggleTamanhoFeridaRequired() {
    const fotoFeridaInput = document.getElementById('foto_ferida');
    const feridaLarguraInput = document.querySelector('input[name="ferida_largura"]');
    const feridaComprimentoInput = document.querySelector('input[name="ferida_comprimento"]');
    const feridaProfundidadeInput = document.querySelector('input[name="ferida_profundidade"]');

    const hasNewPhoto = fotoFeridaInput.files.length > 0;
    const hasExistingPhotoUrl = fotoFeridaInput.dataset.currentUrl && fotoFeridaInput.dataset.currentUrl !== '';

    if (hasNewPhoto || hasExistingPhotoUrl) {
        // Se há foto (nova ou existente), os campos de medida são opcionais
        feridaLarguraInput.removeAttribute('required');
        feridaComprimentoInput.removeAttribute('required');
        feridaProfundidadeInput.removeAttribute('required');
    } else {
        // Se não há foto, os campos de medida são obrigatórios
        feridaLarguraInput.setAttribute('required', 'required');
        feridaComprimentoInput.setAttribute('required', 'required');
        feridaProfundidadeInput.setAttribute('required', 'required');
    }
}

// Event Listeners para botões de foto/assinatura e remoção
document.getElementById('abrir-camera').addEventListener('click', () => {
    document.getElementById('foto_ferida').click();
});

document.getElementById('foto_ferida').addEventListener('change', function() {
    const file = this.files[0];
    const photoPreviewImg = document.getElementById('photo-preview-img');
    const photoPreviewText = document.getElementById('photo-preview-text');
    const removerFotoBtn = document.getElementById('remover-foto');

    if (file) {
        photoPreviewImg.src = URL.createObjectURL(file);
        photoPreviewImg.style.display = 'block';
        photoPreviewText.style.display = 'block';
        removerFotoBtn.style.display = 'inline-block';
        this.dataset.currentUrl = ''; // Limpa a URL antiga se um novo arquivo for selecionado
    } else {
        // Mantém a imagem existente se não houver novo arquivo e for edição
        if (!this.dataset.currentUrl) { // Se não tem URL existente, oculta
            photoPreviewImg.src = '';
            photoPreviewImg.style.display = 'none';
            photoPreviewText.style.display = 'none';
            removerFotoBtn.style.display = 'none';
        }
    }
    toggleTamanhoFeridaRequired();
});

document.getElementById('remover-foto').addEventListener('click', function() {
    const fotoFeridaInput = document.getElementById('foto_ferida');
    fotoFeridaInput.value = ''; // Limpa o input file
    fotoFeridaInput.dataset.currentUrl = ''; // Remove a URL armazenada
    document.getElementById('photo-preview-img').src = '';
    document.getElementById('photo-preview-img').style.display = 'none';
    document.getElementById('photo-preview-text').style.display = 'none';
    this.style.display = 'none';
    toggleTamanhoFeridaRequired();
});

document.getElementById('abrir-assinatura').addEventListener('click', () => {
    document.getElementById('assinatura').click();
});

document.getElementById('assinatura').addEventListener('change', function() {
    const file = this.files[0];
    const signaturePreviewImg = document.getElementById('assinatura-preview-img');
    const signaturePreviewText = document.getElementById('assinatura-preview-text');
    const removerAssinaturaBtn = document.getElementById('remover-assinatura');

    if (file) {
        signaturePreviewImg.src = URL.createObjectURL(file);
        signaturePreviewImg.style.display = 'block';
        signaturePreviewText.style.display = 'block';
        removerAssinaturaBtn.style.display = 'inline-block';
        this.dataset.currentUrl = ''; // Limpa a URL antiga se um novo arquivo for selecionado
    } else {
        if (!this.dataset.currentUrl) { // Se não tem URL existente, oculta
            signaturePreviewImg.src = '';
            signaturePreviewImg.style.display = 'none';
            signaturePreviewText.style.display = 'none';
            removerAssinaturaBtn.style.display = 'none';
        }
    }
});

document.getElementById('remover-assinatura').addEventListener('click', function() {
    const assinaturaInput = document.getElementById('assinatura');
    assinaturaInput.value = '';
    assinaturaInput.dataset.currentUrl = '';
    document.getElementById('assinatura-preview-img').src = '';
    document.getElementById('assinatura-preview-img').style.display = 'none';
    document.getElementById('assinatura-preview-text').style.display = 'none';
    this.style.display = 'none';
});

// --- Lógica de inicialização da página ---
document.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep); // Exibe o primeiro passo
    loadAnamnesesForList(); // Carrega as anamneses ao carregar a página
    loadPatientsForSelect(); // Carrega os pacientes para o select
    toggleTamanhoFeridaRequired(); // Define o estado inicial dos campos de tamanho da ferida
});


// --- Lógica do botão "Apagar tudo" (resetar formulário) ---
document.getElementById('apagar-tudo').addEventListener('click', () => {
    form.reset();
    resetPhotoPreviews(); // Limpa as pré-visualizações e URLs
    editingAnamneseId = null; // Garante que não está em modo de edição
    document.querySelector('h1').textContent = 'Ficha de Anamnese'; // Restaura o título
    showStep(0); // Volta ao primeiro passo
    showMessage('Formulário limpo e pronto para uma nova anamnese.', 'info');
});

// --- Lógica do botão "Finalizar Documentação" (Gerar PDF) ---
document.getElementById('finalizar-documentacao').addEventListener('click', async () => {
    const nota = document.getElementById('nota').value;
    const pacienteId = document.getElementById('paciente').value;

    if (!pacienteId && nota.trim() === '') {
        showMessage('Selecione um paciente ou adicione uma nota para finalizar a documentação.', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/generate-pdf`, { // Endpoint para gerar PDF na sua API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
            },
            body: JSON.stringify({
                anamneseId: editingAnamneseId, // Opcional: ID da anamnese para incluir no PDF, se estiver editando
                nota: nota,
                pacienteId: pacienteId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao gerar o PDF da documentação.');
        }

        const result = await response.json();
        if (result.pdfUrl) { // Sua API deve retornar a URL do PDF gerado
            window.open(result.pdfUrl, '_blank'); // Abre o PDF em nova aba
            showMessage('PDF gerado com sucesso! Verifique a nova aba.', 'success');
        } else {
            showMessage('Documentação finalizada, mas nenhuma URL de PDF foi retornada.', 'info');
        }

    } catch (error) {
        console.error('Erro ao finalizar documentação e gerar PDF:', error);
        showMessage(`Erro ao gerar PDF: ${error.message}`, 'error');
    }
});
