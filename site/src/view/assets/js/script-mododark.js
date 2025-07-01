document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleDarkMode');
    const htmlElement = document.documentElement;

    if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        let savedTheme = localStorage.getItem('theme');

        // Inicializa o tema salvo
        if (savedTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        toggleButton.addEventListener('click', () => {
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';
            htmlElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
            icon.classList.toggle('fa-moon', isDark);
            icon.classList.toggle('fa-sun', !isDark);
        });
    }
});