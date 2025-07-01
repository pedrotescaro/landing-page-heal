// Theme Manager - Script centralizado para gerenciar o tema em todas as páginas
// Este script deve ser incluído em todas as páginas para aplicar o tema automaticamente

(function() {
    'use strict';

    // Função para aplicar o tema
    function applyTheme(isDark) {
        const body = document.body;
        
        if (isDark) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
        
        // Força a atualização das cores
        forceColorUpdate();
    }

    // Função para forçar a atualização das cores
    function forceColorUpdate() {
        // Força o reflow para garantir que as mudanças sejam aplicadas
        document.body.offsetHeight;
        
        // Atualiza elementos específicos se necessário
        const registerLeft = document.querySelector('.register-left');
        const loginRight = document.querySelector('.login-right');
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], select, textarea');
        
        if (registerLeft) {
            registerLeft.style.transition = 'none';
            setTimeout(() => {
                registerLeft.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            }, 10);
        }
        
        if (loginRight) {
            loginRight.style.transition = 'none';
            setTimeout(() => {
                loginRight.style.transition = 'background-image 0.3s ease';
            }, 10);
        }
        
        inputs.forEach(input => {
            input.style.transition = 'none';
            setTimeout(() => {
                input.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
            }, 10);
        });
    }

    // Função para inicializar o tema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme === 'dark';
        
        applyTheme(isDark);
        
        // Se houver um botão de toggle na página, configure-o
        const toggleButton = document.getElementById('toggleDarkMode');
        if (toggleButton) {
            const icon = toggleButton.querySelector('i');
            
            // Atualiza o ícone do botão
            if (icon) {
                if (isDark) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
            
            // Adiciona event listener para o botão
            toggleButton.addEventListener('click', function() {
                const currentIsDark = document.body.classList.contains('dark');
                const newTheme = !currentIsDark;
                
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme ? 'dark' : 'light');
                
                // Atualiza o ícone
                if (icon) {
                    if (newTheme) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                }
                
                // Mostra mensagem de confirmação se a função existir
                if (typeof showMessageBox === 'function') {
                    showMessageBox(`Tema ${newTheme ? 'escuro' : 'claro'} ativado!`, 'success');
                }
            });
        }
    }

    // Inicializa o tema quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Exporta funções para uso global se necessário
    window.ThemeManager = {
        applyTheme: applyTheme,
        forceColorUpdate: forceColorUpdate,
        initTheme: initTheme
    };

})(); 