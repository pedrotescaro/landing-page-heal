document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de cadastro
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const formMessage = document.getElementById('form-message');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatchError = document.getElementById('password-match-error');

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

    // Validação de senhas em tempo real (para cadastro)
    function validatePasswords() {
        if (!passwordInput || !confirmPasswordInput || !passwordMatchError) return true;
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordMatchError.classList.remove('hidden');
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
                showMessage('As senhas não conferem.', 'error');
                return;
            }

            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const password = passwordInput ? passwordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

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
                    showMessage(data.message, 'success');
                    setTimeout(() => {
                        window.location.href = '/site/src/view/dashboard.html'; 
                    }, 1500);
                } else {
                    showMessage(data.message || 'Erro desconhecido ao cadastrar.', 'error');
                }
            } catch (error) {
                console.error('Erro na requisição de cadastro:', error);
                showMessage('Erro ao conectar com o servidor. Tente novamente.', 'error');
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
                    showMessageWithTransition(data.message, 'success');
                    setTimeout(() => {
                        window.location.href = '/site/src/view/dashboard.html'; 
                    }, 1500);
                } else {
                    showMessageWithTransition(data.message || 'Erro desconhecido ao fazer login.', 'error');
                }
            } catch (error) {
                console.error('Erro na requisição de login:', error);
                showMessageWithTransition('Erro ao conectar com o servidor. Tente novamente.', 'error');
            }
        });
    }
});