document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleDarkMode');
    const bodyElement = document.body;

    if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        
        if (icon) {
            // Verifica o modo salvo
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                bodyElement.classList.add('dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }

            toggleButton.addEventListener('click', () => {
                bodyElement.classList.toggle('dark');
                const isDark = bodyElement.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                icon.classList.toggle('fa-moon', !isDark);
                icon.classList.toggle('fa-sun', isDark);
                
                // Força a atualização das cores
                forceColorUpdate();
            });

            // Garante o tema correto ao recarregar
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') {
                bodyElement.classList.add('dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                bodyElement.classList.remove('dark');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            
            // Força a atualização das cores na inicialização
            forceColorUpdate();
        }
    }
    
    // Função para forçar a atualização das cores
    function forceColorUpdate() {
        // Força o reflow para garantir que as mudanças sejam aplicadas
        document.body.offsetHeight;
        
        // Atualiza elementos específicos se necessário
        const registerLeft = document.querySelector('.register-left');
        const loginRight = document.querySelector('.login-right');
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        
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
});