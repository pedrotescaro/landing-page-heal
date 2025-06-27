// Declaração de variáveis globais (AGORA COM VERIFICAÇÃO DE EXISTÊNCIA)
const downloadModal = document.getElementById('downloadModal');
const closeModal = document.getElementById('closeModal');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const headerContainer = document.querySelector('.header-container'); // Este existe no HTML, mas suas sub-elementos podem não.

// Função para fechar menu mobile (só executa se navLinks e menuToggle existirem)
const closeMobileMenu = () => {
    if (navLinks && menuToggle) { // Garante que ambos os elementos existam
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) { // Verifique se o ícone existe
            icon.classList.replace('fa-times', 'fa-bars');
        }
    }
};

// Controle do Menu Mobile (só adiciona listener se menuToggle existir)
if (menuToggle) { // <-- AQUI ESTÁ A CHAVE: SÓ TENTA ADICIONAR SE menuToggle EXISTIR
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks) { // Verifique se navLinks existe antes de usá-lo
            navLinks.classList.toggle('active');
        }
        
        // Alternar ícone (verifique o ícone antes de alternar classes)
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Fechar menu ao clicar fora (só adiciona listener se headerContainer existir)
if (headerContainer) {
    document.addEventListener('click', (e) => {
        if (!headerContainer.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Fechar menu ao rolar (sempre seguro, não depende de elementos específicos)
window.addEventListener('scroll', () => {
    closeMobileMenu();
});

// Fechar menu ao clicar nos links (verifique se navLinks existe)
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}


// Controle do Modal (só adiciona listeners se downloadModal e closeModal existirem)
// Esta parte também precisa de verificação, pois os elementos do modal e o trigger podem estar em outras páginas
document.querySelectorAll('[data-modal-trigger]').forEach(button => {
    if (downloadModal) { // SÓ TENTA ADICIONAR SE downloadModal EXISTIR
        button.addEventListener('click', () => {
            closeMobileMenu(); // Fecha o menu antes de abrir o modal
            downloadModal.classList.remove('hidden');
        });
    }
});

// Fechar modal (só adiciona listener se closeModal e downloadModal existirem)
if (closeModal && downloadModal) { // SÓ TENTA ADICIONAR SE AMBOS EXISTIREM
    closeModal.addEventListener('click', () => {
        downloadModal.classList.add('hidden');
    });

    // Fechar modal ao clicar fora
    downloadModal.addEventListener('click', (e) => {
        if(e.target === downloadModal) {
            downloadModal.classList.add('hidden');
        }
    });
}


// Animação on Scroll (sempre adiciona listener, mas os elementos `.animate-fade-in-up` podem ou não existir)
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-fade-in-up');
    if (animateElements.length > 0) { // Apenas observe se há elementos para animar
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
    }

    // Smooth scrolling (sempre adiciona listener, mas os links podem ou não existir)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) { // Verifique se o alvo existe
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// FAQ Accordion (só adiciona listener se houver elementos '.faq-question')
// Note: Este bloco DOMContentLoaded está duplicado no seu HTML, certifique-se de que cada script
// é carregado uma vez ou combine-os adequadamente.
// Para este caso específico, a verificação `faqQuestions.length > 0` já ajuda.
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');
                
                // Fecha todos os itens
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                    const answer = el.querySelector('.faq-answer');
                    if (answer) { // Verifique se a resposta existe
                        answer.style.maxHeight = '0';
                    }
                });
                
                // Abre o item clicado se não estava ativo
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) { // Verifique se a resposta existe
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        });
    }
});
    