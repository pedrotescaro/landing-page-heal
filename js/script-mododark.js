    const toggleButton = document.getElementById('toggleDarkMode');
    const bodyElement = document.body; // Renomeado para evitar conflito

    // Verifica o modo salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        bodyElement.classList.add('dark');
    }

    toggleButton.addEventListener('click', () => {
        bodyElement.classList.toggle('dark');
        const isDark = bodyElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggleButton.innerText = isDark ? '☀️' : '🌙';
    });