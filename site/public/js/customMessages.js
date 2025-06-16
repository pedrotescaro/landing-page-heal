
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    const anamneseForm = document.getElementById('anamnese-form');

    let currentStep = 0;

    const fotoFeridaInput = document.getElementById('foto_ferida');
    const larguraFeridaInput = document.querySelector('input[name="ferida_largura"]');
    const comprimentoFeridaInput = document.querySelector('input[name="ferida_comprimento"]');
    const profundidadeFeridaInput = document.querySelector('input[name="ferida_profundidade"]');

    // Function to display custom messages
    function showMessageBox(message, type) {
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

    function toggleTamanhoFeridaRequired() {
        if (fotoFeridaInput.files.length > 0) {
            larguraFeridaInput.removeAttribute('required');
            comprimentoFeridaInput.removeAttribute('required');
            profundidadeFeridaInput.removeAttribute('required');
        } else {
            larguraFeridaInput.setAttribute('required', '');
            comprimentoFeridaInput.setAttribute('required', '');
            profundidadeFeridaInput.setAttribute('required', '');
        }
    }

    function updateProgressBar() {
        const progress = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = progress + '%';
    }

    function updateStepCounter() {
        stepCounter.textContent = `Tela ${currentStep + 1} de ${steps.length}`;
    }

    function showStep(n) {
        if (n < 0 || n >= steps.length) {
            console.error(`Attempted to show invalid step: ${n}. Total steps: ${steps.length}`);
            return;
        }

        steps.forEach(step => step.classList.remove('active'));
        document.querySelectorAll('[data-original-required]').forEach(field => {
            field.removeAttribute('required');
        });

        steps[n].classList.add('active');
        currentStep = n;

        steps[n].querySelectorAll('[data-original-required]').forEach(field => {
            field.setAttribute('required', '');
        });

        if (currentStep === 0) {
            toggleTamanhoFeridaRequired();
        }

        updateProgressBar();
        updateStepCounter();

        if (currentStep === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (currentStep === steps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    // Store original 'required' state for all elements on load
    document.querySelectorAll('.step input[required], .step select[required], .step textarea[required]').forEach(field => {
        field.setAttribute('data-original-required', 'true');
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            window.scrollTo(0, 0);
            showStep(currentStep);
        }
    });

    nextBtn.addEventListener('click', () => {
        const activeStep = steps[currentStep];
        const requiredFields = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
        let allFieldsValid = true;
        let firstInvalidField = null;

        requiredFields.forEach(field => {
            // Check if field is visible and not disabled, and if it's empty
            if (!field.value.trim() && field.offsetParent !== null && !field.disabled) {
                allFieldsValid = false;
                field.classList.add('is-invalid');
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (allFieldsValid) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                window.scrollTo(0, 0);
                showStep(currentStep);
            }
        } else {
            showMessageBox('Por favor, preencha todos os campos obrigatórios nesta tela antes de avançar.', 'error');
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    anamneseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(anamneseForm);
        const data = {};

        // Process form data
        for (let [key, value] of formData.entries()) {
            const inputElement = anamneseForm.querySelector(`[name="${key}"]`);
            if (inputElement && inputElement.type === 'checkbox') {
                data[key] = inputElement.checked ? 1 : 0;
            } else {
                data[key] = value;
            }
        }

        // Handle hidden inputs that might not be in formData if they were hidden
        anamneseForm.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
            if (input.id.endsWith('_nome') || input.id.endsWith('_dose') || input.id === 'qual_doenca' || input.id === 'qual_alergia' || input.id === 'qual_atividade' || input.id === 'frequencia_atividade' || input.id === 'frequencia_alcool' || input.id === 'localizacao_tunel_cavidade' || input.id === 'tipo_edema_perilesional' || input.id === 'controle_glicemico' || input.id === 'pulsos_perifericos' || input.id === 'etiologia_outra' || input.id === 'pele_perilesional_extensao' || input.id === 'outros_hpp' || input.id === 'outros_medicamento' || input.id === 'quantos_filhos' || input.id === 'quais_cirurgias') {
                if (input.style.display === 'none') {
                    data[input.name] = ''; // Clear value if input is hidden
                }
            }
        });

        let storedAnamneses = JSON.parse(localStorage.getItem('anamneses')) || [];
        const editingIndex = localStorage.getItem('editingAnamneseIndex'); // Get index from localStorage

        try {
            if (editingIndex !== null) {
                // Editing existing anamnese
                storedAnamneses[parseInt(editingIndex)] = data;
                showMessageBox('Anamnese atualizada com sucesso!', 'success');
            } else {
                // Adding new anamnese
                storedAnamneses.push(data);
                showMessageBox('Anamnese salva com sucesso!', 'success');
            }
            localStorage.setItem('anamneses', JSON.stringify(storedAnamneses));

            // Clear temporary data used for editing
            localStorage.removeItem('editingAnamneseData');
            localStorage.removeItem('editingAnamneseIndex');

            // Redirect back to dashboard with a success message
            const encodedMessage = encodeURIComponent('Anamnese salva/atualizada com sucesso!');
            window.location.href = `dashboard.html?messageType=success&messageText=${encodedMessage}`;

        } catch (error) {
            console.error('Erro ao salvar/atualizar anamnese:', error);
            const encodedError = encodeURIComponent(`Erro ao salvar/atualizar anamnese: ${error.message}`);
            window.location.href = `dashboard.html?messageType=error&messageText=${encodedError}`;
        }
    });

    fotoFeridaInput.addEventListener('change', toggleTamanhoFeridaRequired);

    // Initial call to set required fields for the first step and show it
    showStep(currentStep);

    // Conditional display for form fields (copied from your original script)
    document.getElementById('diabetes').addEventListener('change', function () {
        document.getElementById('controle_glicemico_group').style.display = this.value === '1' ? 'block' : 'none';
    });
    const etiologiaSelect = document.getElementById('etiologia_ferida');
    const outraEtiologiaInput = document.getElementById('etiologia_outra');
    etiologiaSelect.addEventListener('change', function () {
        outraEtiologiaInput.style.display = this.value === 'outra' ? 'block' : 'none';
    });
    const doencaVascularCheckbox = document.getElementById('doenca_vascular');
    const funcaoVascularGroup = document.getElementById('funcao_vascular_group');
    doencaVascularCheckbox.addEventListener('change', function () {
        funcaoVascularGroup.style.display = this.checked ? 'block' : 'none';
    });

    const possuiDoencaSelect = document.getElementById('possui_doenca');
    possuiDoencaSelect.addEventListener('change', function () {
        const temDoenca = this.value === '1';
        const doencaText = document.getElementById('qual_doenca');
        doencaText.style.display = temDoenca ? 'block' : 'none';
        if (!temDoenca) {
            doencaText.value = '';
        }
    });
    const usaMedicacaoSelect = document.getElementById('usa_medicacao');
    const qualMedicacaoInput = document.getElementById('qual_medicacao');
    usaMedicacaoSelect.addEventListener('change', function () {
        qualMedicacaoInput.style.display = this.value === '1' ? 'block' : 'none';
        if (this.value !== '1') {
            qualMedicacaoInput.value = '';
        }
    });
    const possuiAlergiaSelect = document.getElementById('possui_alergia');
    const qualAlergiaInput = document.getElementById('qual_alergia');
    possuiAlergiaSelect.addEventListener('change', function () {
        qualAlergiaInput.style.display = this.value === '1' ? 'block' : 'none';
        if (this.value !== '1') {
            qualAlergiaInput.value = '';
        }
    });
    const praticaAtividadeFisicaSelect = document.getElementById('pratica_atividade_fisica');
    const qualAtividadeInput = document.getElementById('qual_atividade');
    const frequenciaAtividadeInput = document.getElementById('frequencia_atividade');
    praticaAtividadeFisicaSelect.addEventListener('change', function () {
        const pratica = this.value === '1';
        qualAtividadeInput.style.display = pratica ? 'block' : 'none';
        frequenciaAtividadeInput.style.display = pratica ? 'block' : 'none';
        if (!pratica) {
            qualAtividadeInput.value = '';
            frequenciaAtividadeInput.value = '';
        }
    });
    const ingestaAlcoolSelect = document.getElementById('ingestao_alcool');
    const frequenciaAlcoolInput = document.getElementById('frequencia_alcool');
    ingestaAlcoolSelect.addEventListener('change', function () {
        frequenciaAlcoolInput.style.display = this.value === '1' ? 'block' : 'none';
        if (this.value !== '1') {
            frequenciaAlcoolInput.value = ''; // Corrected variable name
        }
    });

    // Populate form if in edit mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'edit') {
        const editingAnamneseData = JSON.parse(localStorage.getItem('editingAnamneseData'));
        if (editingAnamneseData) {
            document.querySelector('h1').textContent = 'Editar Anamnese';
            for (const key in editingAnamneseData) {
                const input = anamneseForm.elements[key];
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = editingAnamneseData[key] === 1;
                    } else {
                        input.value = editingAnamneseData[key];
                    }
                    // Trigger change event for dynamic fields
                    if (input.tagName === 'SELECT' || input.type === 'checkbox') {
                        input.dispatchEvent(new Event('change'));
                    }
                }
            }
            // Special handling for text inputs associated with checkboxes
            anamneseForm.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
                const associatedInputName = checkbox.name + '_nome' || checkbox.name + '_dose';
                const associatedInput = anamneseForm.elements[associatedInputName];
                if (associatedInput) {
                    if (checkbox.checked && editingAnamneseData[associatedInputName]) {
                        associatedInput.value = editingAnamneseData[associatedInputName];
                        associatedInput.style.display = 'block'; // Ensure it's visible
                    } else {
                        associatedInput.style.display = 'none'; // Ensure it's hidden if checkbox not checked
                    }
                }
            });

        } else {
            showMessageBox('Erro: Dados da anamnese para edição não encontrados.', 'error');
        }
    } else {
        // For new anamnese, clear any lingering editing data
        localStorage.removeItem('editingAnamneseData');
        localStorage.removeItem('editingAnamneseIndex');
    }
});
