// Declaração de variáveis globais
    const downloadModal = document.getElementById('downloadModal');
    const closeModal = document.getElementById('closeModal');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const headerContainer = document.querySelector('.header-container');

    // Função para fechar menu mobile
    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    };

    // Controle do Menu Mobile
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        
        // Alternar ícone
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!headerContainer.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Fechar menu ao rolar
    window.addEventListener('scroll', () => {
        closeMobileMenu();
    });

    // Fechar menu ao clicar nos links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Controle do Modal
    document.querySelectorAll('[data-modal-trigger]').forEach(button => {
        button.addEventListener('click', () => {
            closeMobileMenu(); // Fecha o menu antes de abrir o modal
            downloadModal.classList.remove('hidden');
        });
    });

    // Fechar modal
    closeModal.addEventListener('click', () => {
        downloadModal.classList.add('hidden');
    });

    // Fechar modal ao clicar fora
    downloadModal.addEventListener('click', (e) => {
        if(e.target === downloadModal) {
            downloadModal.classList.add('hidden');
        }
    });

    // Animação on Scroll
    document.addEventListener('DOMContentLoaded', function() {
        const animateElements = document.querySelectorAll('.animate-fade-in-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    });

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
