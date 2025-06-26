// public/js/script.js

// --- Configuração da API (Atualize com suas URLs reais!) ---
const API_BASE_URL = "http://localhost/site/public/index.php/api/anamnese"; // Exemplo, ajuste se o seu index.php estiver em outro lugar
const API_ENDPOINTS = {
  anamneses: `${API_BASE_URL}/anamnese`, // Para GET (todos), POST (criar)
  anamneseById: (id) => `${API_BASE_URL}//${id}`, // Para GET (único), PUT (atualizar), DELETE (deletar)
  patients: `${API_BASE_URL}`, // Exemplo de endpoint para listar pacientes (se você tiver um)
  upload: `${API_BASE_URL}/upload`, // Exemplo de endpoint para upload de arquivos (se você tiver um)
};

// --- Funções auxiliares (manter como estão, se existirem em customMessages.js) ---


  

// --- Elementos do Formulário e Lógica de Navegação (existentes) ---
const form = document.getElementById("anamnese-form");


// Variável para armazenar o ID da anamnese em edição
let editingAnamneseId = null; // Mantenha esta linha aqui, no escopo global ou superior
let currentStep = 0;







// --- Função para extrair dados do formulário ---
function getFormData() {
  const formData = new FormData(form);
  const data = {};
  const filesToUpload = {}; // Para armazenar arquivos (File objects)

  // Percorre todos os elementos do formulário
  for (const [key, value] of formData.entries()) {
    const element = form.elements[key]; // Pega o elemento DOM para verificar seu tipo

    if (element.type === "checkbox") {
      data[key] = element.checked ? 1 : 0; // Converte checkbox para 1 ou 0
    } else if (element.type === "file") {
      if (element.files.length > 0) {
        // Se um novo arquivo foi selecionado, armazene-o para upload separado
        filesToUpload[key] = element.files[0];
        // Remove a URL antiga se um novo arquivo for selecionado para que o backend não use a antiga
        data[key] = null;
      } else if (element.dataset.currentUrl) {
        // Se NÃO há novo arquivo, mas há uma URL de um arquivo existente (em edição)
        data[key] = element.dataset.currentUrl;
      } else {
        // Se não há arquivo e não há URL existente
        data[key] = null;
      }
    } else if (value.trim() !== "") {
      data[key] = value.trim();
    } else {
      data[key] = null; // Campos vazios podem ser tratados como null na API
    }
  }

  // Tratamento dos campos de medicamento (nome e dose)
  const medications = [
    "anti_hipertensivo",
    "corticoides",
    "hipoglicemiantes_orais",
    "aines",
    "insulina",
    "drogas_vasoativa",
    "suplemento",
    "anticoagulante",
    "vitaminico",
    "antirretroviral",
  ];
  medications.forEach((medId) => {
    const checkbox = document.getElementById(medId);
    if (checkbox) {
      // Verifica se o checkbox está marcado
      if (checkbox.checked) {
        const nameInput = document.querySelector(`input[name="${medId}_nome"]`);
        const doseInput = document.querySelector(`input[name="${medId}_dose"]`);
        // Pega os valores, garantindo que são trim() ou null se vazios
        data[`${medId}_nome`] = (nameInput && nameInput.value.trim()) || null;
        data[`${medId}_dose`] = (doseInput && doseInput.value.trim()) || null;
      } else {
        // Se o checkbox NÃO está marcado, define os campos associados como null
        data[`${medId}_nome`] = null;
        data[`${medId}_dose`] = null;
      }
    }
  });

  // Converte strings numéricas para números reais (se sua API esperar números)
  [
    "ferida_largura",
    "ferida_comprimento",
    "ferida_profundidade",
    "dor_escala",
    "percentual_granulacao_leito",
    "percentual_epitelizacao_leito",
    "percentual_esfacelo_leito",
    "percentual_necrose_seca_leito",
    "quantos_filhos",
  ].forEach((field) => {
    if (
      data[field] !== null &&
      data[field] !== undefined &&
      data[field] !== ""
    ) {
      data[field] = parseFloat(data[field]);
    } else {
      data[field] = null;
    }
  });

  // Inclui o ID da anamnese se estiver em modo de edição
  // Isso é CRÍTICO para que o backend saiba qual anamnese atualizar
  if (editingAnamneseId) {
    data.id = editingAnamneseId;
  }

  return { data, filesToUpload };
}

// --- Lógica Principal de Submissão (Unificada) ---
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  const { data, filesToUpload } = getFormData(); // Chama a função para coletar todos os dados

  try {
    // 1. **Upload de arquivos (se novos arquivos foram selecionados)**
    for (const fileKey in filesToUpload) {
      const file = filesToUpload[fileKey];
      const uploadResult = await uploadFile(file, fileKey); // fileKey será 'foto_ferida' ou 'assinatura'
      if (uploadResult && uploadResult.url) {
        data[fileKey] = uploadResult.url; // Armazena a URL retornada pela API no payload principal
        showMessage(
          `Upload de ${fileKey.replace("_", " ")} concluído!`,
          "success"
        );
      } else {
        // Se o upload falhar, precisamos decidir o que fazer.
        // Uma opção é manter a URL antiga se for uma edição e não houver novo arquivo
        // ou simplesmente abortar o salvamento. Optamos por abortar para garantir integridade.
        showMessage(
          `Falha no upload de ${fileKey.replace(
            "_",
            " "
          )}. Abortando salvamento.`,
          "error"
        );
        return; // Impede o salvamento da anamnese se o upload falhar
      }
    }

    // 2. **Envio dos dados principais da anamnese para o backend**
    if (editingAnamneseId) {
      // Se estamos editando, use o ID existente
      await updateAnamnese(editingAnamneseId, data);
    } else {
      // Caso contrário, crie uma nova anamnese
      await createAnamnese(data);
    }
    // Redireciona para o dashboard após o sucesso
    window.location.href =
      "dashboard.html?messageType=success&messageText=" +
      encodeURIComponent(
        `Anamnese ${editingAnamneseId ? "atualizada" : "criada"} com sucesso!`
      );
  } catch (error) {
    console.error("Erro no processo de submissão do formulário:", error);
    showMessage(`Erro: ${error.message}`, "error");
  }
});

// --- Funções para Interação com a API (mantidas) ---

/**
 * Envia um arquivo para o endpoint de upload da API.
 * @param {File} file - O objeto File a ser enviado.
 * @param {string} type - Um identificador para o tipo de arquivo (ex: 'foto_ferida', 'assinatura').
 * @returns {Promise<Object>} Promessa que resolve com a resposta da API (espera-se uma URL).
 */
async function uploadFile(file, type) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type); // Pode ser útil para o backend identificar o tipo de upload

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

/**
 * Envia os dados de uma nova anamnese para a API.
 * @param {Object} anamneseData - Os dados da anamnese a serem criados.
 */
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
    form.reset();
    resetPhotoPreviews();
    editingAnamneseId = null;
    document.querySelector("h1").textContent = "Ficha de Anamnese";
    showStep(0);
  } catch (error) {
    console.error("Erro ao criar anamnese:", error);
    throw error;
  }
}

/**
 * Atualiza uma anamnese existente na API.
 * @param {string} id - O ID da anamnese a ser atualizada.
 * @param {Object} updatedData - Os dados atualizados da anamnese.
 */
async function updateAnamnese(id, updatedData) {
  try {
    // Certifique-se de que o ID esteja presente nos dados a serem enviados
    // embora sua API possa já pegá-lo da URL, é bom garantir consistência.
    updatedData.id = id;

    const response = await fetch(API_ENDPOINTS.anamneseById(id), {
      method: "PUT", // Ou 'PATCH', dependendo da sua API PHP
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar anamnese.");
    }

    const result = await response.json();
    console.log("Anamnese atualizada com sucesso:", result);
    form.reset();
    resetPhotoPreviews();
    editingAnamneseId = null;
    document.querySelector("h1").textContent = "Ficha de Anamnese";
    showStep(0);
  } catch (error) {
    console.error("Erro ao atualizar anamnese:", error);
    throw error;
  }
}

/**
 * Carrega os dados de uma anamnese específica da API e preenche o formulário.
 * @param {string} id - O ID da anamnese a ser carregada.
 */
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
    // Define o editingAnamneseId aqui para garantir que o submit saiba que é uma edição
    editingAnamneseId = id;
    showMessage("Anamnese carregada para edição.", "info");
  } catch (error) {
    console.error("Erro ao carregar anamnese:", error);
    showMessage(`Erro ao carregar anamnese: ${error.message}`, "error");
    // Redireciona de volta para o dashboard se a anamnese não puder ser carregada
    window.location.href =
      "dashboard.html?messageType=error&messageText=" +
      encodeURIComponent(
        `Não foi possível carregar a anamnese para edição: ${error.message}`
      );
  }
}

/**
 * Carrega a lista de anamneses da API para a seção de finalização.
 */
function loadAnamnesesForList() {
  // Esta função é chamada na Finalização para listar anamneses
  // Para o dashboard, a lógica está no script do dashboard
  const listContainer = document.getElementById("anamneses-list-ul"); // ID correto do UL na página de anamnese
  if (!listContainer) return; // Garante que só executa se o elemento existir

  fetch(API_ENDPOINTS.anamneses)
    .then((response) => response.json())
    .then((data) => {
      listContainer.innerHTML = ""; // Limpa a lista existente

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

      // Adiciona event listeners para os botões recém-criados
      listContainer.querySelectorAll(".edit-anamnese-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          window.location.href = `index_template.html?id=${id}`; // Redireciona para a página de edição
        });
      });

      listContainer.querySelectorAll(".delete-anamnese-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          deleteAnamnese(id); // Usa a função global deleteAnamnese
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

/**
 * Popula os campos do formulário com os dados de uma anamnese.
 * @param {Object} data - O objeto de dados da anamnese retornado pela API.
 */
function populateFormWithData(data) {
  form.reset();
  resetPhotoPreviews();

  for (const key in data) {
    const input = document.getElementById(key);
    if (input) {
      if (input.type === "checkbox") {
        input.checked = data[key] === 1 || data[key] === true;
        // Importante disparar 'change' para que a lógica de exibir/ocultar campos dependentes funcione
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
            // Armazena a URL existente para que não seja perdida se o usuário não selecionar um novo arquivo
            input.dataset.currentUrl = data[key];
          }
        }
      } else if (input.tagName === "SELECT" || input.type === "radio") {
        input.value = data[key];
        // Importante disparar 'change' para que a lógica de exibir/ocultar campos dependentes funcione
        input.dispatchEvent(new Event("change"));
      } else if (input.type === "date" && data[key]) {
        input.value = data[key].split("T")[0];
      } else if (input.type === "range") {
        input.value = data[key];
        // Importante disparar 'input' para atualizar o display visual da escala EVA
        input.dispatchEvent(new Event("input"));
      } else {
        input.value = data[key];
      }
    }
  }

  // --- Lógica para preencher campos associados a checkboxes e selects (medicações, etc.) ---
  // Esta parte é crucial para que os campos de texto como 'qual_medicacao' ou 'anti_hipertensivo_nome'
  // sejam preenchidos e exibidos corretamente com base nos checkboxes/selects.

  // 1. Campos de texto que aparecem/desaparecem com SELECTs (usa_medicacao, possui_doenca, etc.)
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
    doenca_vascular: "funcao_vascular_group", // Grupo de checkboxes
    tunel_cavidade: "localizacao_tunel_cavidade_group", // Novo grupo de input
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
      // Para selects, exibe se o valor for '1' (Sim) ou 'outra'
      shouldShow =
        parentElement.value === "1" || parentElement.value === "outra";
    } else if (parentElement.type === "checkbox") {
      shouldShow = parentElement.checked;
    } else if (parentElement.type === "radio") {
      // Se você tiver radios
      shouldShow = parentElement.checked;
    }

    childrenElements.forEach((child) => {
      child.style.display = shouldShow ? "block" : "none";
      // Limpa o valor do campo se ele for ocultado
      if (
        !shouldShow &&
        (child.tagName === "INPUT" ||
          child.tagName === "TEXTAREA" ||
          child.tagName === "SELECT")
      ) {
        if (child.type !== "checkbox" && child.type !== "radio") {
          // Evita limpar checkboxes/radios
          child.value = "";
        }
      }
    });
  }

  // 2. Campos de texto de MEDICAÇÕES (nome e dose) associados aos checkboxes individuais
  const medicationCheckboxes = [
    "anti_hipertensivo",
    "corticoides",
    "hipoglicemiantes_orais",
    "aines",
    "insulina",
    "drogas_vasoativa",
    "suplemento",
    "anticoagulante",
    "vitaminico",
    "antirretroviral",
  ];

  medicationCheckboxes.forEach((checkboxId) => {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      // Se o checkbox está marcado, exibe e preenche os campos de nome e dose
      if (checkbox.checked) {
        const nameInput = document.querySelector(
          `input[name="${checkboxId}_nome"]`
        );
        const doseInput = document.querySelector(
          `input[name="${checkboxId}_dose"]`
        );

        if (nameInput) {
          nameInput.style.display = "block";
          nameInput.value = data[`${checkboxId}_nome`] || ""; // Preenche com o valor do banco de dados
        }
        if (doseInput) {
          doseInput.style.display = "block";
          doseInput.value = data[`${checkboxId}_dose`] || ""; // Preenche com o valor do banco de dados
        }
      } else {
        // Se o checkbox NÃO está marcado, oculta e limpa os campos de nome e dose
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

  // Campo "Outros" da HPP
  const outrosHppInput = document.getElementById("outros_hpp");
  if (outrosHppInput && data.outros_hpp) {
    outrosHppInput.value = data.outros_hpp;
  }

  // Recarrega as porcentagens de tecido na barra de progresso (do tecido.js)
  if (typeof window.updateTissueProgressBar === "function") {
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
    loadAnamnesesForList(); // Recarrega a lista após a exclusão
    // Se estiver na página de edição e a anamnese excluída for a que está sendo editada,
    // limpa o formulário e retorna ao modo de criação.
    const urlParams = new URLSearchParams(window.location.search);
    const currentEditId = urlParams.get("id");

    if (currentEditId && currentEditId === id) {
      form.reset();
      resetPhotoPreviews();
      editingAnamneseId = null;
      document.querySelector("h1").textContent = "Ficha de Anamnese";
      showStep(0);
      // Limpa o parâmetro 'id' da URL
      history.replaceState(null, "", window.location.pathname);
    }
  } catch (error) {
    console.error("Erro ao excluir anamnese:", error);
    showMessage(`Erro ao excluir anamnese: ${error.message}`, "error");
  }
}

/**
 * Busca a lista de pacientes da API e preenche o select de pacientes.
 */
async function loadPatientsForSelect() {
  const patientSelect = document.getElementById("paciente");
  if (!patientSelect) return; // Garante que o elemento existe
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

// --- Funções de manipulação de pré-visualização de arquivos (Foto e Assinatura) ---

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

  photoInput.value = "";
  photoInput.dataset.currentUrl = ""; // Limpa a URL antiga do dataset
  photoPreviewImg.src = "";
  photoPreviewImg.style.display = "none";
  photoPreviewText.style.display = "none";
  removerFotoBtn.style.display = "none";

  signatureInput.value = "";
  signatureInput.dataset.currentUrl = ""; // Limpa a URL antiga do dataset
  signaturePreviewImg.src = "";
  signaturePreviewImg.style.display = "none";
  signaturePreviewText.style.display = "none";
  removerAssinaturaBtn.style.display = "none";

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

// Event Listeners para botões de foto/assinatura e remoção (mantidos)
document.getElementById("abrir-camera").addEventListener("click", () => {
  document.getElementById("foto_ferida").click();
});

document.getElementById("foto_ferida").addEventListener("change", function () {
  const file = this.files[0];
  const photoPreviewImg = document.getElementById("photo-preview-img");
  const photoPreviewText = document.getElementById("photo-preview-text");
  const removerFotoBtn = document.getElementById("remover-foto");

  if (file) {
    photoPreviewImg.src = URL.createObjectURL(file);
    photoPreviewImg.style.display = "block";
    photoPreviewText.style.display = "block";
    removerFotoBtn.style.display = "inline-block";
    this.dataset.currentUrl = ""; // Limpa a URL antiga se um novo arquivo for selecionado
  } else {
    // Se nenhum novo arquivo for selecionado, mas houver uma URL existente, mantenha a imagem
    if (this.dataset.currentUrl) {
      photoPreviewImg.src = this.dataset.currentUrl; // Restaura a URL existente
      photoPreviewImg.style.display = "block";
      photoPreviewText.style.display = "block";
      removerFotoBtn.style.display = "inline-block";
    } else {
      // Se não tem URL existente, oculta
      photoPreviewImg.src = "";
      photoPreviewImg.style.display = "none";
      photoPreviewText.style.display = "none";
      removerFotoBtn.style.display = "none";
    }
  }
  toggleTamanhoFeridaRequired();
});

document.getElementById("remover-foto").addEventListener("click", function () {
  const fotoFeridaInput = document.getElementById("foto_ferida");
  fotoFeridaInput.value = ""; // Limpa o input file
  fotoFeridaInput.dataset.currentUrl = ""; // Remove a URL armazenada
  document.getElementById("photo-preview-img").src = "";
  document.getElementById("photo-preview-img").style.display = "none";
  document.getElementById("photo-preview-text").style.display = "none";
  this.style.display = "none";
  toggleTamanhoFeridaRequired();
});

document.getElementById("abrir-assinatura").addEventListener("click", () => {
  document.getElementById("assinatura").click();
});

document.getElementById("assinatura").addEventListener("change", function () {
  const file = this.files[0];
  const signaturePreviewImg = document.getElementById("assinatura-preview-img");
  const signaturePreviewText = document.getElementById(
    "assinatura-preview-text"
  );
  const removerAssinaturaBtn = document.getElementById("remover-assinatura");

  if (file) {
    signaturePreviewImg.src = URL.createObjectURL(file);
    signaturePreviewImg.style.display = "block";
    signaturePreviewText.style.display = "block";
    removerAssinaturaBtn.style.display = "inline-block";
    this.dataset.currentUrl = ""; // Limpa a URL antiga se um novo arquivo for selecionado
  } else {
    if (this.dataset.currentUrl) {
      signaturePreviewImg.src = this.dataset.currentUrl;
      signaturePreviewImg.style.display = "block";
      signaturePreviewText.style.display = "block";
      removerAssinaturaBtn.style.display = "inline-block";
    } else {
      signaturePreviewImg.src = "";
      signaturePreviewImg.style.display = "none";
      signaturePreviewText.style.display = "none";
      removerAssinaturaBtn.style.display = "none";
    }
  }
});

document
  .getElementById("remover-assinatura")
  .addEventListener("click", function () {
    const assinaturaInput = document.getElementById("assinatura");
    assinaturaInput.value = "";
    assinaturaInput.dataset.currentUrl = "";
    document.getElementById("assinatura-preview-img").src = "";
    document.getElementById("assinatura-preview-img").style.display = "none";
    document.getElementById("assinatura-preview-text").style.display = "none";
    this.style.display = "none";
  });

// --- Lógica de inicialização da página ---
document.addEventListener("DOMContentLoaded", async () => {
  showStep(currentStep); // Exibe o primeiro passo
  loadAnamnesesForList(); // Carrega as anamneses ao carregar a página
  loadPatientsForSelect(); // Carrega os pacientes para o select
  toggleTamanhoFeridaRequired(); // Define o estado inicial dos campos de tamanho da ferida

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id"); // Obtém o parâmetro 'id' da URL

  if (idParam) {
    editingAnamneseId = idParam; // Define o ID da anamnese para edição
    document.querySelector("h1").textContent = "Editando Anamnese";
    // Altere o botão de "Salvar Anamnese" para "Atualizar Anamnese"
    submitBtn.textContent = "Atualizar Anamnese";
    submitBtn.innerHTML = 'Atualizar Anamnese <i class="fas fa-save"></i>';
    await loadAnamneseData(idParam); // Carrega os dados da anamnese para preencher o formulário
  } else {
    // Se não há 'id' na URL, estamos criando uma nova anamnese
    editingAnamneseId = null; // Garante que não há ID de edição
    document.querySelector("h1").textContent = "Ficha de Anamnese";
    submitBtn.textContent = "Salvar Anamnese";
    submitBtn.innerHTML = 'Salvar Anamnese <i class="fas fa-save"></i>';
  }

  // Lógica para exibir mensagens de sucesso/erro vindas do dashboard
  const messageType = urlParams.get("messageType");
  const messageText = urlParams.get("messageText");
  if (messageType && messageText) {
    showMessage(decodeURIComponent(messageText), messageType);
    history.replaceState(null, "", window.location.pathname); // Limpa os parâmetros da URL
  }
});

// --- Lógica do botão "Apagar tudo" (resetar formulário) ---
document.getElementById("apagar-tudo").addEventListener("click", () => {
  form.reset();
  resetPhotoPreviews();
  editingAnamneseId = null;
  document.querySelector("h1").textContent = "Ficha de Anamnese";
  submitBtn.textContent = "Salvar Anamnese"; // Restaura o texto do botão
  submitBtn.innerHTML = 'Salvar Anamnese <i class="fas fa-save"></i>';
  showStep(0);
  showMessage("Formulário limpo e pronto para uma nova anamnese.", "info");
});

// --- Lógica do botão "Finalizar Documentação" (Gerar PDF) ---
document
  .getElementById("finalizar-documentacao")
  .addEventListener("click", async () => {
    const nota = document.getElementById("nota").value;
    const pacienteId = document.getElementById("paciente").value;

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
