  const toggleButton = document.getElementById('toggleDarkMode');
            const icon = toggleButton.querySelector('i');
            const bodyElement = document.body;

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
            });

            // Garante o tema correto ao recarregar
            document.addEventListener('DOMContentLoaded', () => {
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
            });