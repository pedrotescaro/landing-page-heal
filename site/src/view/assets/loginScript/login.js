document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de cadastro
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const formMessage = document.getElementById('form-message');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatchError = document.getElementById('password-match-error');

    // Função para obter tradução
    function getTranslation(key) {
        return window.i18n ? window.i18n.getTranslation(key) : key;
    }

    // Função para exibir mensagem
    function showMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.classList.remove('hidden', 'error', 'success');
        formMessage.classList.add(type);
    }

    // Função para exibir mensagem com transição (usada no login)
    function showMessageWithTransition(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.classList.remove('hidden', 'error', 'success');
        formMessage.classList.add(type, 'visible');
        setTimeout(() => {
            formMessage.classList.remove('visible');
            formMessage.classList.add('hidden');
        }, 5000);
    }

    // Função para mostrar mensagem traduzida
    function showTranslatedMessage(messageKey, type = 'error') {
        const message = getTranslation(messageKey);
        if (type === 'error') {
            showMessage(message, 'error');
        } else {
            showMessageWithTransition(message, 'success');
        }
    }

    // Validação de senhas em tempo real (para cadastro)
    function validatePasswords() {
        if (!passwordInput || !confirmPasswordInput || !passwordMatchError) return true;
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordMatchError.classList.remove('hidden');
            passwordMatchError.textContent = getTranslation("register.passwordMismatch");
            return false;
        } else {
            passwordMatchError.classList.add('hidden');
            return true;
        }
    }

    // Código específico para página de cadastro
    if (registerForm) {
        if (passwordInput && confirmPasswordInput) {
            passwordInput.addEventListener('input', validatePasswords);
            confirmPasswordInput.addEventListener('input', validatePasswords);
        }

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (formMessage) {
                formMessage.classList.add('hidden');
                formMessage.textContent = '';
                formMessage.classList.remove('error', 'success');
            }

            if (!validatePasswords()) {
                showTranslatedMessage("message.passwordMismatch", "error");
                return;
            }

            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const password = passwordInput ? passwordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

            // Validações básicas
            if (!name || !email || !password || !confirmPassword) {
                showTranslatedMessage("message.fillAllFields", "error");
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showTranslatedMessage("message.invalidEmail", "error");
                return;
            }

            // Validação de senha
            if (password.length < 6) {
                showTranslatedMessage("message.passwordTooShort", "error");
                return;
            }

            try {
                const response = await fetch('/site/public/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password, 'confirm-password': confirmPassword })
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    showTranslatedMessage("message.registerSuccess", "success");
                    setTimeout(() => {
                        window.location.href = '/site/src/view/index.html'; 
                    }, 1500);
                } else {
                    showMessage(data.message || getTranslation("message.registerError"), 'error');
                }
            } catch (error) {
                console.error('Erro na requisição de cadastro:', error);
                showTranslatedMessage("message.networkError", "error");
            }
        });
    }

    // Código específico para página de login
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (formMessage) {
                formMessage.classList.remove('visible');
                formMessage.classList.add('hidden');
                formMessage.textContent = '';
                formMessage.classList.remove('error', 'success');
            }

            const email = document.getElementById('email')?.value || '';
            const password = document.getElementById('password')?.value || '';

            // Validações básicas
            if (!email || !password) {
                showTranslatedMessage("message.fillAllFields", "error");
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showTranslatedMessage("message.invalidEmail", "error");
                return;
            }

            try {
                const response = await fetch('/site/public/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    showTranslatedMessage("message.loginSuccess", "success");
                    setTimeout(() => {
                        window.location.href = '/site/src/view/dashboard.html'; 
                    }, 1500);
                } else {
                    showMessage(data.message || getTranslation("message.loginError"), 'error');
                }
            } catch (error) {
                console.error('Erro na requisição de login:', error);
                showTranslatedMessage("message.networkError", "error");
            }
        });
    }

    // Event listener para mudança de idioma
    document.addEventListener('languageChanged', function(e) {
        // Atualizar mensagens de erro se estiverem visíveis
        if (passwordMatchError && !passwordMatchError.classList.contains('hidden')) {
            passwordMatchError.textContent = getTranslation("register.passwordMismatch");
        }
        
        if (formMessage && !formMessage.classList.contains('hidden')) {
            // Se houver uma mensagem de erro visível, atualizar com a nova tradução
            const currentText = formMessage.textContent;
            const currentLang = e.detail.language;
            
            // Mapear mensagens comuns para suas chaves de tradução
            const messageMap = {
                'As senhas não conferem.': 'message.passwordMismatch',
                'Por favor, preencha todos os campos.': 'message.fillAllFields',
                'E-mail inválido. Tente novamente.': 'message.invalidEmail',
                'A senha precisa de 6+ caracteres, 1 letra maiúscula e 1 caractere especial.': 'message.passwordTooShort',
                'Erro ao conectar com o servidor. Tente novamente.': 'message.networkError',
                'Login realizado com sucesso!': 'message.loginSuccess',
                'Conta criada com sucesso!': 'message.registerSuccess',
                'Email ou senha incorretos': 'message.loginError',
                'Erro ao criar conta': 'message.registerError'
            };
            
            // Verificar se a mensagem atual tem uma tradução correspondente
            for (const [portugueseText, translationKey] of Object.entries(messageMap)) {
                if (currentText === portugueseText) {
                    formMessage.textContent = getTranslation(translationKey);
                    break;
                }
            }
        }
    });
});