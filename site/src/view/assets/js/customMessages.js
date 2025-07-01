// public/js/customMessages.js - Lógica unificada para formulário de anamnese e navegação por passos.

// --- Configuração da API (Ajuste a base do seu projeto se necessário!) ---
// Define a base da API dinamicamente usando window.location.protocol e window.location.hostname.
// Ajuste "/site/public/api" conforme a pasta raiz do seu projeto no servidor web.
const API_BASE_URL = window.location.protocol + "//" + window.location.hostname + "/site/public/api"; 

const API_ENDPOINTS = {
    anamneses: `${API_BASE_URL}/anamnese`, 
    anamneseById: (id) => `${API_BASE_URL}/anamnese/${id}`,
    patients: `${API_BASE_URL}/anamnese`,
    upload: `${API_BASE_URL}/upload`, 
};

// --- Variáveis Globais (para este arquivo específico) ---
let editingAnamneseId = null; 
let currentStep = 0; // Inicializa a variável currentStep aqui!

// --- Função para exibir mensagens na UI ---
// Esta função pode ser chamada de qualquer lugar neste script.
function showMessage(message, type) {
    // Usar o mesmo sistema de message boxes do profile.html
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', type);
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.opacity = 1;
    }, 10);

    setTimeout(() => {
        messageBox.style.opacity = 0;
        messageBox.addEventListener('transitionend', () => messageBox.remove());
    }, 3000);
}

// --- Lógica Principal: Executado após o DOM ser completamente carregado ---
document.addEventListener("DOMContentLoaded", async () => {
    // --- Referências de Elementos DOM ---
    const form = document.getElementById("anamnese-form");
    const steps = Array.from(document.querySelectorAll(".step"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn"); // Botão de submissão do formulário de anamnese
    const progressBar = document.getElementById("progress-bar");
    const stepCounter = document.getElementById("step-counter");
    const apagarTudoButton = document.getElementById("apagar-tudo");
    const finalizarDocumentacaoButton = document.getElementById("finalizar-documentacao");


    // --- Funções de Navegação por Passos ---
    function updateProgressBar() {
        if (!steps.length || !progressBar || !stepCounter) return; // Garante que os elementos existam

        const progress = (currentStep / (steps.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        stepCounter.textContent = `Passo ${currentStep + 1} de ${steps.length}`;

        prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
        nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "inline-block";
        
        // O submitBtn só aparece no último passo
        if (submitBtn) { // Verifique se o submitBtn existe antes de manipular
            submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";
        }

        const finalizationContainer = document.getElementById("finalizacao-container");
        if (finalizationContainer) { // Garante que o elemento existe
            if (currentStep === steps.length - 1) {
                finalizationContainer.style.display = "block";
                loadAnamnesesForList(); 
                loadPatientsForSelect(); 
            } else {
                finalizationContainer.style.display = "none";
            }
        }
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
        currentStep = stepIndex; // Atualiza a variável global currentStep
        updateProgressBar();
        
        // Rola para o topo do formulário sempre que mudar de passo
        const formContainer = document.getElementById('form-container');
        if (formContainer) {
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Fallback: rola para o topo da página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }


    // --- Funções de Validação de Campos ---
    // Atribui data-original-required para campos inicialmente obrigatórios
    document.querySelectorAll(".step input[required], .step select[required], .step textarea[required]")
        .forEach((field) => {
            field.setAttribute("data-original-required", "true");
        });

    // Função que verifica se os campos obrigatórios do passo atual estão preenchidos
    function validateCurrentStep() {
        const currentActiveStep = steps[currentStep];
        if (!currentActiveStep) return true; // Se não houver passo ativo, assume válido
        const requiredInputs = currentActiveStep.querySelectorAll('[required]');
        let allInputsValid = true;
        let firstInvalidInput = null;

        requiredInputs.forEach((input) => {
            if (input.type === 'file') {
                if (!input.files.length && !input.dataset.currentUrl) {
                    input.style.borderColor = 'red';
                    allInputsValid = false;
                    if (!firstInvalidInput) firstInvalidInput = input;
                } else {
                    input.style.borderColor = '';
                }
            } else if (!input.value.trim()) {
                input.style.borderColor = 'red';
                allInputsValid = false;
                if (!firstInvalidInput) firstInvalidInput = input;
            } else {
                input.style.borderColor = '';
            }
        });

        if (!allInputsValid) {
            showMessage('Por favor, preencha todos os campos obrigatórios para avançar.', 'error');
            if (firstInvalidInput) {
                firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalidInput.focus();
            }
            return false;
        }
        return true;
    }


    // --- Event Listeners dos Botões de Navegação ---
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (validateCurrentStep()) { // Valida o passo atual antes de avançar
                if (currentStep < steps.length - 1) {
                    showStep(currentStep + 1);
                }
            } else {
                // Se não validou, já está rolando e mostrando mensagem pelo validateCurrentStep
                // Mas garantimos que a mensagem e o scroll sempre aconteçam
                const currentActiveStep = steps[currentStep];
                const requiredInputs = currentActiveStep.querySelectorAll('[required]');
                let firstInvalidInput = null;
                requiredInputs.forEach((input) => {
                    if ((input.type === 'file' && !input.files.length && !input.dataset.currentUrl) || (!input.value.trim() && input.type !== 'file')) {
                        if (!firstInvalidInput) firstInvalidInput = input;
                    }
                });
                if (firstInvalidInput) {
                    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalidInput.focus();
                }
                showMessage('Por favor, preencha todos os campos obrigatórios para avançar.', 'error');
            }
        });
    }


    // --- Lógica de Inicialização da Página (Executada ao carregar o DOM) ---
    showStep(currentStep); // Exibe o primeiro passo ao carregar
    loadAnamnesesForList(); 
    loadPatientsForSelect(); 
    toggleTamanhoFeridaRequired(); 

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id"); 

    const h1Element = document.querySelector("h1");

    if (idParam) {
        editingAnamneseId = idParam; 
        if (h1Element) h1Element.textContent = "Editando Anamnese";
        if (submitBtn) { 
            submitBtn.textContent = "Atualizar Anamnese";
            submitBtn.innerHTML = 'Atualizar Anamnese <i class="fas fa-save"></i>';
        }
        await loadAnamneseData(idParam); 
    } else {
        editingAnamneseId = null; 
        if (h1Element) h1Element.textContent = "Ficha de Anamnese";
        if (submitBtn) { 
            submitBtn.textContent = "Salvar Anamnese";
            submitBtn.innerHTML = 'Salvar Anamnese <i class="fas fa-save"></i>';
        }
    }

    // Lógica para exibir mensagens de sucesso/erro vindas do dashboard (após redirecionamento)
    const messageType = urlParams.get("messageType");
    const messageText = urlParams.get("messageText");
    if (messageType && messageText) {
        showMessage(decodeURIComponent(messageText), messageType);
        history.replaceState(null, "", window.location.pathname); 
    }


    // --- Lógica Principal de Submissão do Formulário de Anamnese ---
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); 

            // Valida o passo atual antes de enviar
            if (!validateCurrentStep() && currentStep < steps.length -1) { 
                return;
            }

            const { data, filesToUpload } = getFormData(); 

            try {
                // 1. Upload de arquivos (se novos arquivos foram selecionados)
                for (const fileKey in filesToUpload) {
                    const file = filesToUpload[fileKey];
                    const uploadResult = await uploadFile(file, fileKey); 
                    if (uploadResult && uploadResult.url) {
                        data[fileKey] = uploadResult.url; 
                        showMessage(`Upload de ${fileKey.replace("_", " ")} concluído!`, "success");
                    } else {
                        showMessage(`Falha no upload de ${fileKey.replace("_", " ")}. Abortando salvamento.`, "error");
                        return; 
                    }
                }

                    if (editingAnamneseId) {
                        // Se estiver editando, atualiza e DEPOIS redireciona.
                        await updateAnamnese(editingAnamneseId, data);

                        window.location.href =
                            window.location.protocol + "//" + window.location.hostname + "/site/src/view/dashboard.html?messageType=success&messageText=" +
                            encodeURIComponent(`Anamnese atualizada com sucesso!`);

                    } else {
                        // Se estiver criando, apenas chama a função.
                        // O redirecionamento já está DENTRO de createAnamnese.
                        await createAnamnese(data);
                    }
                } catch (error) {
                    console.error("Erro no processo de submissão do formulário:", error);
                    showMessage(`Erro: ${error.message}`, "error");
                }
        });
    }

    // --- Lógica do botão "Apagar tudo" (resetar formulário) ---
    if (apagarTudoButton) {
        apagarTudoButton.addEventListener("click", () => {
            if (form) form.reset();
            resetPhotoPreviews();
            editingAnamneseId = null;
            const h1Element = document.querySelector("h1");
            if (h1Element) h1Element.textContent = "Ficha de Anamnese";
            if (submitBtn) { 
                submitBtn.textContent = "Salvar Anamnese"; 
                submitBtn.innerHTML = 'Salvar Anamnese <i class="fas fa-save"></i>';
            }
            showStep(0); // Volta para o primeiro passo
            showMessage("Formulário limpo e pronto para uma nova anamnese.", "info");
        });
    }

    // --- Lógica do botão "Finalizar Documentação" (Gerar PDF) ---
    if (finalizarDocumentacaoButton) {
        finalizarDocumentacaoButton.addEventListener("click", async () => {
            const nota = document.getElementById("nota") ? document.getElementById("nota").value : '';
            const pacienteIdElement = document.getElementById("paciente");
            const pacienteId = pacienteIdElement ? pacienteIdElement.value : '';

            if (!pacienteId && nota.trim() === "") {
                showMessage(
                    "Selecione um paciente ou adicione uma nota para finalizar a documentação.",
                    "error"
                );
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/generate-pdf`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        anamneseId: editingAnamneseId,
                        nota: nota,
                        pacienteId: pacienteId,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.message || "Erro ao gerar o PDF da documentação."
                    );
                }

                const result = await response.json();
                if (result.pdfUrl) {
                    window.open(result.pdfUrl, "_blank");
                    showMessage("PDF gerado com sucesso! Verifique a nova aba.", "success");
                } else {
                    showMessage(
                        "Documentação finalizada, mas nenhuma URL de PDF foi retornada.",
                        "info"
                    );
                }
            } catch (error) {
                console.error("Erro ao finalizar documentação e gerar PDF:", error);
                showMessage(`Erro ao gerar PDF: ${error.message}`, "error");
            }
        });
    }

    // --- Outras Funções Auxiliares de Interação com a API ---
    // (createAnamnese, updateAnamnese, loadAnamneseData, loadAnamnesesForList, deleteAnamnese, loadPatientsForSelect)
    // Essas funções podem continuar aqui ou serem movidas para um arquivo de "serviços" de API,
    // mas para a unificação, mantê-las aqui é aceitável.

    // ATENÇÃO: As funções abaixo foram movidas para dentro do DOMContentLoaded ou reorganizadas.
    // Certifique-se de que não haja duplicação em outros arquivos JS.

    /**
     * Coleta os dados do formulário e separa arquivos para upload
     * @returns {Object} Objeto com { data: Object, filesToUpload: Object }
     */
    function getFormData() {
        const formData = new FormData(form);
        const data = {};
        const filesToUpload = {};

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > 0) {
                    filesToUpload[key] = value;
                }
            } else {
                data[key] = value;
            }
        }

        // Processa checkboxes que não estão no FormData
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!data.hasOwnProperty(checkbox.name)) {
                data[checkbox.name] = checkbox.checked ? '1' : '0';
            }
        });

        return { data, filesToUpload };
    }

    /**
     * Envia um arquivo para o endpoint de upload da API.
     * @param {File} file - O objeto File a ser enviado.
     * @param {string} type - Um identificador para o tipo de arquivo (ex: 'foto_ferida', 'assinatura').
     * @returns {Promise<Object>} Promessa que resolve com a resposta da API (espera-se uma URL).
     */
    async function uploadFile(file, type) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type); 

        try {
            const response = await fetch(API_ENDPOINTS.upload, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro ao fazer upload de ${type}.`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro no upload de ${type}:`, error);
            throw error;
        }
    }

   async function createAnamnese(anamneseData) {
    try {
        const response = await fetch(API_ENDPOINTS.anamneses, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(anamneseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao salvar anamnese.");
        }

        const result = await response.json();
        console.log("Anamnese salva com sucesso:", result);

        // REDIRECIONAMENTO ADICIONADO AQUI!
        // Após o sucesso, redireciona imediatamente para o dashboard com a mensagem.
        window.location.href =
            window.location.protocol + "//" + window.location.hostname + "/site/src/view/dashboard.html?messageType=success&messageText=" +
            encodeURIComponent(`Anamnese criada com sucesso!`);

    } catch (error) {
        console.error("Erro ao criar anamnese:", error);
        throw error; // Relança o erro para o bloco catch do submit poder exibir a mensagem na tela.
    }
}
    async function updateAnamnese(id) {
    try {
        // updatedData.id = id; // <--- REMOVA OU COMENTE ESTA LINHA

        const response = await fetch(API_ENDPOINTS.anamneseById(id), {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            // O objeto 'updatedData' agora é enviado sem o campo 'id' extra.
            body: JSON.stringify(id), 
        });

        // O resto da sua função permanece exatamente o mesmo.
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao atualizar anamnese.");
        }

        const result = await response.json();
        console.log("Anamnese atualizada com sucesso:", result);

        // A partir daqui, você pode decidir se quer redirecionar ou limpar o formulário.
        // Se a intenção é ir para o dashboard, o redirecionamento é o ideal.
        window.location.href = 
            window.location.protocol + "//" + window.location.hostname + "/site/public/dashboard.html?messageType=success&messageText=" +
            encodeURIComponent("Anamnese atualizada com sucesso!");
        
    } catch (error) {
        console.error("Erro ao atualizar anamnese:", error);
        throw error;
    }
}

    async function loadAnamneseData(id) {
        try {
            const response = await fetch(API_ENDPOINTS.anamneseById(id));
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Erro ao carregar anamnese para edição."
                );
            }
            const data = await response.json();
            populateFormWithData(data);
            editingAnamneseId = id;
            showMessage("Anamnese carregada para edição.", "info");
        } catch (error) {
            console.error("Erro ao carregar anamnese:", error);
            showMessage(`Erro ao carregar anamnese: ${error.message}`, "error");
            window.location.href =
                window.location.protocol + "//" + window.location.hostname + "/site/public/dashboard.html?messageType=error&messageText=" + 
                encodeURIComponent(
                    `Não foi possível carregar a anamnese para edição: ${error.message}`
                );
        }
    }

    function loadAnamnesesForList() {
        const listContainer = document.getElementById("anamneses-list-ul"); 
        if (!listContainer) return; 
        listContainer.innerHTML = ""; 

        fetch(API_ENDPOINTS.anamneses)
            .then((response) => response.json())
            .then((data) => {
                listContainer.innerHTML = ""; 

                if (data.length === 0) {
                    listContainer.innerHTML =
                        '<p style="text-align: center; color: #888;">Nenhuma anamnese cadastrada ainda.</p>';
                    return;
                }

                data.forEach((anamnese) => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                            <strong>${
                                anamnese.nome_cliente || "Paciente sem nome"
                            }</strong> (ID: ${anamnese.id})<br>
                            <button class="edit-anamnese-btn" data-id="${
                                anamnese.id
                            }">Editar</button>
                            <button class="delete-anamnese-btn" data-id="${
                                anamnese.id
                            }">Excluir</button>
                        `;
                    listContainer.appendChild(li);
                });

                listContainer.querySelectorAll(".edit-anamnese-btn").forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        const id = e.target.dataset.id;
                        window.location.href = window.location.protocol + "//" + window.location.hostname + `/site/src/view/formulario.html?id=${id}`; 
                    });
                });

                listContainer.querySelectorAll(".delete-anamnese-btn").forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        const id = e.target.dataset.id;
                        deleteAnamnese(id); 
                    });
                });
            })
            .catch((error) => {
                console.error(
                    "Erro ao carregar anamneses para a lista de finalização:",
                    error
                );
                showMessage("Erro ao carregar anamneses para a lista.", "error");
            });
    }

    function populateFormWithData(data) {
        if (form) form.reset();
        resetPhotoPreviews();

        for (const key in data) {
            const input = document.getElementById(key);
            if (input) {
                if (input.type === "checkbox") {
                    input.checked = data[key] === 1 || data[key] === true;
                    input.dispatchEvent(new Event("change"));
                } else if (input.type === "file") {
                    if (data[key]) {
                        const imgPreview = document.getElementById(`${key}-preview-img`);
                        const previewText = document.getElementById(`${key}-preview-text`);
                        const removerBtn = document.getElementById(
                            `remover-${key.replace("_", "-")}`
                        );
                        if (imgPreview && previewText && removerBtn) {
                            imgPreview.src = data[key];
                            imgPreview.style.display = "block";
                            previewText.style.display = "block";
                            removerBtn.style.display = "inline-block";
                            input.dataset.currentUrl = data[key];
                        }
                    }
                } else if (input.tagName === "SELECT" || input.type === "radio") {
                    input.value = data[key];
                    input.dispatchEvent(new Event("change"));
                } else if (input.type === "date" && data[key]) {
                    input.value = data[key].split("T")[0];
                } else if (input.type === "range") {
                    input.value = data[key];
                    input.dispatchEvent(new Event("input"));
                } else {
                    input.value = data[key];
                }
            }
        }

        const conditionalDisplayMap = {
            usa_medicacao: "qual_medicacao",
            possui_doenca: "qual_doenca",
            possui_alergia: "qual_alergia",
            pratica_atividade_fisica: ["qual_atividade", "frequencia_atividade"],
            ingestao_alcool: "frequencia_alcool",
            tem_filhos: "quantos_filhos",
            realizou_cirurgias: "quais_cirurgias",
            cultura_realizada: "resultado_cultura",
            etiologia_ferida: "etiologia_outra",
            doenca_vascular: "funcao_vascular_group", 
            tunel_cavidade: "localizacao_tunel_cavidade_group", 
        };

        for (const parentId in conditionalDisplayMap) {
            const parentElement = document.getElementById(parentId);
            if (!parentElement) continue;

            const childrenIds = Array.isArray(conditionalDisplayMap[parentId])
                ? conditionalDisplayMap[parentId]
                : [conditionalDisplayMap[parentId]];
            const childrenElements = childrenIds
                .map((id) => document.getElementById(id))
                .filter((el) => el);

            let shouldShow = false;
            if (parentElement.tagName === "SELECT") {
                shouldShow = parentElement.value === "1" || parentElement.value === "outra";
            } else if (parentElement.type === "checkbox") {
                shouldShow = parentElement.checked;
            } else if (parentElement.type === "radio") {
                shouldShow = parentElement.checked;
            }

            childrenElements.forEach((child) => {
                child.style.display = shouldShow ? "block" : "none";
                if (
                    !shouldShow &&
                    (child.tagName === "INPUT" ||
                        child.tagName === "TEXTAREA" ||
                        child.tagName === "SELECT")
                ) {
                    if (child.type !== "checkbox" && child.type !== "radio") {
                        child.value = "";
                    }
                }
            });
        }

        const medicationCheckboxes = [
            "anti_hipertensivo", "corticoides", "hipoglicemiantes_orais", "aines",
            "insulina", "drogas_vasoativa", "suplemento", "anticoagulante",
            "vitaminico", "antirretroviral",
        ];

        medicationCheckboxes.forEach((checkboxId) => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                if (checkbox.checked) {
                    const nameInput = document.querySelector(
                        `input[name="${checkboxId}_nome"]`
                    );
                    const doseInput = document.querySelector(
                        `input[name="${checkboxId}_dose"]`
                    );

                    if (nameInput) {
                        nameInput.style.display = "block";
                        nameInput.value = data[`${checkboxId}_nome`] || ""; 
                    }
                    if (doseInput) {
                        doseInput.style.display = "block";
                        doseInput.value = data[`${checkboxId}_dose`] || ""; 
                    }
                } else {
                    const nameInput = document.querySelector(
                        `input[name="${checkboxId}_nome"]`
                    );
                    const doseInput = document.querySelector(
                        `input[name="${checkboxId}_dose"]`
                    );
                    if (nameInput) {
                        nameInput.style.display = "none";
                        nameInput.value = "";
                    }
                    if (doseInput) {
                        doseInput.style.display = "none";
                        doseInput.value = "";
                    }
                }
            }
        });

        const outrosHppInput = document.getElementById("outros_hpp");
        if (outrosHppInput && data.outros_hpp) {
            outrosHppInput.value = data.outros_hpp;
        }

        if (typeof window.updateTissueProgressBar === "function") {
            window.updateTissueProgressBar();
        }
        toggleTamanhoFeridaRequired();
    }

    async function deleteAnamnese(id) {
        if (
            !confirm(
                "Tem certeza que deseja excluir esta anamnese? Esta ação é irreversível."
            )
        ) {
            return;
        }
        try {
            const response = await fetch(API_ENDPOINTS.anamneseById(id), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao excluir anamnese.");
            }

            showMessage("Anamnese excluída com sucesso!", "success");
            loadAnamnesesForList(); 
            const urlParams = new URLSearchParams(window.location.search);
            const currentEditId = urlParams.get("id");

            if (currentEditId && currentEditId === id) {
                if (form) form.reset();
                resetPhotoPreviews();
                editingAnamneseId = null;
                const h1Element = document.querySelector("h1");
                if (h1Element) h1Element.textContent = "Ficha de Anamnese";
                showStep(0); // Volta para o primeiro passo
                history.replaceState(null, "", window.location.pathname);
            }
        } catch (error) {
            console.error("Erro ao excluir anamnese:", error);
            showMessage(`Erro ao excluir anamnese: ${error.message}`, "error");
        }
    }

    async function loadPatientsForSelect() {
        const patientSelect = document.getElementById("paciente");
        if (!patientSelect) return; 
        patientSelect.innerHTML = '<option value="">Inserir paciente</option>';

        try {
            const response = await fetch(API_ENDPOINTS.patients, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao carregar pacientes.");
            }

            const patients = await response.json();

            if (patients.length === 0) {
                const option = document.createElement("option");
                option.value = "";
                option.textContent = "Nenhum paciente cadastrado";
                patientSelect.appendChild(option);
                return;
            }

            patients.forEach((patient) => {
                const option = document.createElement("option");
                option.value = patient.id;
                option.textContent =
                    patient.nome_cliente || patient.nome || `Paciente ${patient.id}`;
                patientSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar pacientes:", error);
            showMessage(
                `Erro ao carregar pacientes para o seletor: ${error.message}`,
                "error"
            );
        }
    }

    function resetPhotoPreviews() {
        const photoInput = document.getElementById("foto_ferida");
        const signatureInput = document.getElementById("assinatura");
        const photoPreviewImg = document.getElementById("photo-preview-img");
        const photoPreviewText = document.getElementById("photo-preview-text");
        const removerFotoBtn = document.getElementById("remover-foto");
        const signaturePreviewImg = document.getElementById("assinatura-preview-img");
        const signaturePreviewText = document.getElementById(
            "assinatura-preview-text"
        );
        const removerAssinaturaBtn = document.getElementById("remover-assinatura");

        if (photoInput) photoInput.value = "";
        if (photoInput) photoInput.dataset.currentUrl = ""; 
        if (photoPreviewImg) photoPreviewImg.src = "";
        if (photoPreviewImg) photoPreviewImg.style.display = "none";
        if (photoPreviewText) photoPreviewText.style.display = "none";
        if (removerFotoBtn) removerFotoBtn.style.display = "none";

        if (signatureInput) signatureInput.value = "";
        if (signatureInput) signatureInput.dataset.currentUrl = ""; 
        if (signaturePreviewImg) signaturePreviewImg.src = "";
        if (signaturePreviewImg) signaturePreviewImg.style.display = "none";
        if (signaturePreviewText) signaturePreviewText.style.display = "none";
        if (removerAssinaturaBtn) removerAssinaturaBtn.style.display = "none";

        toggleTamanhoFeridaRequired();
    }

    function toggleTamanhoFeridaRequired() {
        const fotoFeridaInput = document.getElementById("foto_ferida");
        const feridaLarguraInput = document.querySelector(
            'input[name="ferida_largura"]'
        );
        const feridaComprimentoInput = document.querySelector(
            'input[name="ferida_comprimento"]'
        );
        const feridaProfundidadeInput = document.querySelector(
            'input[name="ferida_profundidade"]'
        );

        if (!fotoFeridaInput || !feridaLarguraInput || !feridaComprimentoInput || !feridaProfundidadeInput) {
            return;
        }

        const hasNewPhoto = fotoFeridaInput.files.length > 0;
        const hasExistingPhotoUrl =
            fotoFeridaInput.dataset.currentUrl &&
            fotoFeridaInput.dataset.currentUrl !== "";

        if (hasNewPhoto || hasExistingPhotoUrl) {
            feridaLarguraInput.removeAttribute("required");
            feridaComprimentoInput.removeAttribute("required");
            feridaProfundidadeInput.removeAttribute("required");
        } else {
            feridaLarguraInput.setAttribute("required", "required");
            feridaComprimentoInput.setAttribute("required", "required");
            feridaProfundidadeInput.setAttribute("required", "required");
        }
    }

    const abrirCameraButton = document.getElementById("abrir-camera");
    if (abrirCameraButton) {
        abrirCameraButton.addEventListener("click", () => {
            const fotoFeridaInput = document.getElementById("foto_ferida");
            if (fotoFeridaInput) fotoFeridaInput.click();
        });
    }

    const fotoFeridaInput = document.getElementById("foto_ferida");
    if (fotoFeridaInput) {
        fotoFeridaInput.addEventListener("change", function () {
            const file = this.files[0];
            const photoPreviewImg = document.getElementById("photo-preview-img");
            const photoPreviewText = document.getElementById("photo-preview-text");
            const removerFotoBtn = document.getElementById("remover-foto");

            if (file && photoPreviewImg && photoPreviewText && removerFotoBtn) {
                photoPreviewImg.src = URL.createObjectURL(file);
                photoPreviewImg.style.display = "block";
                photoPreviewText.style.display = "block";
                removerFotoBtn.style.display = "inline-block";
                this.dataset.currentUrl = ""; 
            } else if (this.dataset.currentUrl && photoPreviewImg && photoPreviewText && removerFotoBtn) {
                photoPreviewImg.src = this.dataset.currentUrl; 
                photoPreviewImg.style.display = "block";
                photoPreviewText.style.display = "block";
                removerFotoBtn.style.display = "inline-block";
            } else if (photoPreviewImg && photoPreviewText && removerFotoBtn) {
                photoPreviewImg.src = "";
                photoPreviewImg.style.display = "none";
                photoPreviewText.style.display = "none";
                removerFotoBtn.style.display = "none";
            }
            toggleTamanhoFeridaRequired();
        });
    }

    const removerFotoBtn = document.getElementById("remover-foto");
    if (removerFotoBtn) {
        removerFotoBtn.addEventListener("click", function () {
            const fotoFeridaInput = document.getElementById("foto_ferida");
            const photoPreviewImg = document.getElementById("photo-preview-img");
            const photoPreviewText = document.getElementById("photo-preview-text");

            if (fotoFeridaInput) fotoFeridaInput.value = ""; 
            if (fotoFeridaInput) fotoFeridaInput.dataset.currentUrl = ""; 
            if (photoPreviewImg) photoPreviewImg.src = "";
            if (photoPreviewImg) photoPreviewImg.style.display = "none";
            if (photoPreviewText) photoPreviewText.style.display = "none";
            this.style.display = "none";
            toggleTamanhoFeridaRequired();
        });
    }

    const abrirAssinaturaButton = document.getElementById("abrir-assinatura");
    if (abrirAssinaturaButton) {
        abrirAssinaturaButton.addEventListener("click", () => {
            const assinaturaInput = document.getElementById("assinatura");
            if (assinaturaInput) assinaturaInput.click();
        });
    }

    const assinaturaInput = document.getElementById("assinatura");
    if (assinaturaInput) {
        assinaturaInput.addEventListener("change", function () {
            const file = this.files[0];
            const signaturePreviewImg = document.getElementById("assinatura-preview-img");
            const signaturePreviewText = document.getElementById("assinatura-preview-text");
            const removerAssinaturaBtn = document.getElementById("remover-assinatura");

            if (file && signaturePreviewImg && signaturePreviewText && removerAssinaturaBtn) {
                signaturePreviewImg.src = URL.createObjectURL(file);
                signaturePreviewImg.style.display = "block";
                signaturePreviewText.style.display = "block";
                removerAssinaturaBtn.style.display = "inline-block";
                this.dataset.currentUrl = ""; 
            } else if (this.dataset.currentUrl && signaturePreviewImg && signaturePreviewText && removerAssinaturaBtn) {
                signaturePreviewImg.src = this.dataset.currentUrl;
                signaturePreviewImg.style.display = "block";
                signaturePreviewText.style.display = "block";
                removerAssinaturaBtn.style.display = "inline-block";
            } else if (signaturePreviewImg && signaturePreviewText && removerAssinaturaBtn) {
                signaturePreviewImg.src = "";
                signaturePreviewImg.style.display = "none";
                signaturePreviewText.style.display = "none";
                removerAssinaturaBtn.style.display = "none";
            }
        });
    }

    const removerAssinaturaBtn = document.getElementById("remover-assinatura");
    if (removerAssinaturaBtn) {
        removerAssinaturaBtn.addEventListener("click", function () {
            const assinaturaInput = document.getElementById("assinatura");
            const signaturePreviewImg = document.getElementById("assinatura-preview-img");
            const signaturePreviewText = document.getElementById("assinatura-preview-text");

            if (assinaturaInput) assinaturaInput.value = "";
            if (assinaturaInput) assinaturaInput.dataset.currentUrl = "";
            if (signaturePreviewImg) signaturePreviewImg.src = "";
            if (signaturePreviewImg) signaturePreviewImg.style.display = "none";
            if (signaturePreviewText) signaturePreviewText.style.display = "none";
            this.style.display = "none";
        });
    }
});
