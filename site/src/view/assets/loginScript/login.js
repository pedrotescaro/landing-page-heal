document.addEventListener('DOMContentLoaded', () => {
            const registerForm = document.getElementById('register-form');
            const formMessage = document.getElementById('form-message');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const passwordMatchError = document.getElementById('password-match-error');

            // Função para exibir mensagem
            function showMessage(message, type) {
                formMessage.textContent = message;
                formMessage.classList.remove('hidden', 'error', 'success');
                formMessage.classList.add(type);
            }

            // Validação de senhas em tempo real (mantido do seu original)
            function validatePasswords() {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    passwordMatchError.classList.remove('hidden');
                    return false;
                } else {
                    passwordMatchError.classList.add('hidden');
                    return true;
                }
            }

            passwordInput.addEventListener('input', validatePasswords);
            confirmPasswordInput.addEventListener('input', validatePasswords);


            registerForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Impede o envio padrão do formulário

                // Limpa mensagens anteriores
                formMessage.classList.add('hidden');
                formMessage.textContent = '';
                formMessage.classList.remove('error', 'success');
                
                // Valida as senhas antes de enviar
                if (!validatePasswords()) {
                    showMessage('As senhas não conferem.', 'error');
                    return;
                }

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;

                try {
                    const response = await fetch('/site/public/api/register', { // Ajuste a URL para a sua rota de registro
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, password, 'confirm-password': confirmPassword })
                    });

                    const data = await response.json();

                    if (response.ok && data.status === 'success') {
                        // Cadastro bem-sucedido
                        showMessage(data.message, 'success');
                        // Redireciona para a tela de login após um pequeno atraso
                        setTimeout(() => {
                            window.location.href = '/site/src/view/login.html'; 
                        }, 1500); // 1.5 segundos de atraso
                    } else {
                        // Cadastro falhou
                        showMessage(data.message || 'Erro desconhecido ao cadastrar.', 'error');
                    }
                } catch (error) {
                    // Erro de rede ou outro erro no fetch
                    console.error('Erro na requisição de cadastro:', error);
                    showMessage('Erro ao conectar com o servidor. Tente novamente.', 'error');
                }
            });
        });


         document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('login-form');
            const formMessage = document.getElementById('form-message');

            // Função para exibir mensagem (melhorada para visibilidade)
            function showMessage(message, type) {
                formMessage.textContent = message;
                formMessage.classList.remove('hidden', 'error', 'success');
                formMessage.classList.add(type, 'visible'); // Adiciona 'visible' para transição
                setTimeout(() => {
                    formMessage.classList.remove('visible');
                    formMessage.classList.add('hidden');
                }, 5000); // Mensagem some após 5 segundos
            }

            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Impede o envio padrão do formulário

                // Limpa mensagens anteriores
                formMessage.classList.remove('visible');
                formMessage.classList.add('hidden');
                formMessage.textContent = '';
                formMessage.classList.remove('error', 'success');

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await fetch('/site/public/api/login', { // Ajuste a URL para a sua rota de login
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok && data.status === 'success') {
                        // Login bem-sucedido
                        showMessage(data.message, 'success');
                        // Redireciona para o dashboard após um pequeno atraso
                        setTimeout(() => {
                            // ATENÇÃO: Ajuste esta URL para corresponder à base do seu projeto.
                            // Se seu projeto estiver em http://localhost/site/, então a rota seria '/site/public/dashboard.html'
                            // Se estiver em http://localhost/, a rota seria '/dashboard.html'
                            window.location.href = '/site/src/view/dashboard.html'; 
                        }, 1500); // 1.5 segundos de atraso
                    } else {
                        // Login falhou
                        showMessage(data.message || 'Erro desconhecido ao fazer login.', 'error');
                    }
                } catch (error) {
                    // Erro de rede ou outro erro no fetch
                    console.error('Erro na requisição de login:', error);
                    showMessage('Erro ao conectar com o servidor. Tente novamente.', 'error');
                }
            });
        });