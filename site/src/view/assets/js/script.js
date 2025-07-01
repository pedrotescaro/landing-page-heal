// Elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const headerContainer = document.querySelector('.header-container');
const downloadModal = document.getElementById('downloadModal');
const closeModal = document.getElementById('closeModal');

// Function to display custom messages (replaces alert() for better UX)
function showMessageBox(message, type) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', type);
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.opacity = 1;
    }, 10);

    setTimeout(() => {
        messageBox.style.opacity = 0;
        messageBox.addEventListener('transitionend', () => messageBox.remove());
    }, 3000);
}

// Função para fechar menu mobile (só executa se navLinks e menuToggle existirem)
const closeMobileMenu = () => {
    if (navLinks && menuToggle) { // Garante que ambos os elementos existam
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) { // Verifique se o ícone existe
            icon.classList.replace('fa-times', 'fa-bars');
        }
        // Remove o overlay se existir (REMOVIDO)
        // const overlay = document.querySelector('.mobile-menu-overlay');
        // if (overlay) {
        //     overlay.classList.remove('active');
        //     setTimeout(() => overlay.remove(), 300); // espera animação
        // }
        // Restaura o scroll do body (REMOVIDO)
        // document.body.style.overflow = '';
    }
};

// Função para abrir menu mobile
const openMobileMenu = () => {
    if (navLinks && menuToggle) {
        navLinks.classList.add('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-bars', 'fa-times');
        }
        // NÃO CRIA MAIS OVERLAY
        // Bloqueia o scroll do body (REMOVIDO)
        // document.body.style.overflow = 'hidden';
    }
};

// Controle do Menu Mobile (só adiciona listener se menuToggle existir)
if (menuToggle) { // <-- AQUI ESTÁ A CHAVE: SÓ TENTA ADICIONAR SE menuToggle EXISTIR
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks) { // Verifique se navLinks existe antes de usá-lo
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    });
    
    // Adiciona suporte a teclado
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        }
    });
}

// Fechar menu ao clicar fora (só adiciona listener se headerContainer existir)
if (headerContainer) {
    document.addEventListener('click', (e) => {
        if (!headerContainer.contains(e.target) && navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Fechar menu ao rolar (sempre seguro, não depende de elementos específicos)
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (navLinks && navLinks.classList.contains('active')) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            closeMobileMenu();
        }, 100);
    }
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

// Fechar menu ao redimensionar a tela
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

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
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !downloadModal.classList.contains('hidden')) {
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
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Smooth scrolling (sempre adiciona listener, mas os links podem ou não existir)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) { // Verifique se o alvo existe
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// FAQ Accordion (melhorado com mais verificações)
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que as traduções foram carregadas
    setTimeout(() => {
        console.log('=== INICIANDO FAQ ===');
        
        const faqQuestions = document.querySelectorAll('.faq-question');
        console.log('Perguntas do FAQ encontradas:', faqQuestions.length);
        
        if (faqQuestions.length > 0) {
            faqQuestions.forEach((question, index) => {
                console.log(`Configurando FAQ ${index + 1}:`, question.textContent.trim());
                
                // Garantir que a pergunta seja clicável
                question.style.cursor = 'pointer';
                question.setAttribute('tabindex', '0');
                question.setAttribute('role', 'button');
                question.setAttribute('aria-expanded', 'false');
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`FAQ ${index + 1} clicado!`);
                    
                    const item = this.parentElement;
                    const isActive = item.classList.contains('active');
                    const answer = item.querySelector('.faq-answer');
                    
                    console.log('Item ativo antes:', isActive);
                    console.log('Resposta encontrada:', !!answer);
                    
                    // Fecha todos os itens
                    document.querySelectorAll('.faq-item').forEach(el => {
                        el.classList.remove('active');
                        const answerEl = el.querySelector('.faq-answer');
                        const questionEl = el.querySelector('.faq-question');
                        
                        if (answerEl) {
                            answerEl.style.maxHeight = '0';
                            answerEl.style.overflow = 'hidden';
                        }
                        if (questionEl) {
                            questionEl.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Abre o item clicado se não estava ativo
                    if (!isActive && answer) {
                        item.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                        
                        // Força um reflow para calcular a altura correta
                        answer.style.maxHeight = 'none';
                        const scrollHeight = answer.scrollHeight;
                        answer.style.maxHeight = '0';
                        
                        // Usa requestAnimationFrame para garantir que a transição funcione
                        requestAnimationFrame(() => {
                            answer.style.maxHeight = scrollHeight + 'px';
                            answer.style.overflow = 'hidden';
                            console.log('Resposta aberta, altura:', scrollHeight);
                        });
                    }
                    
                    console.log('Item ativo depois:', item.classList.contains('active'));
                });
                
                // Adiciona suporte a teclado para FAQ
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
                
                // Adiciona hover visual
                question.addEventListener('mouseenter', function() {
                    this.style.color = 'hsl(var(--primary))';
                });
                
                question.addEventListener('mouseleave', function() {
                    if (!this.parentElement.classList.contains('active')) {
                        this.style.color = '';
                    }
                });
            });
            
            console.log('FAQ configurado com sucesso!');
        } else {
            console.log('❌ Nenhuma pergunta do FAQ encontrada!');
        }
    }, 100); // Aguarda 100ms para garantir que as traduções foram carregadas
});

// Feedback form handling
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector('#feedback form');
    const feedbackSubmit = document.getElementById('feedback-submit');
    
    if (feedbackForm && feedbackSubmit) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const type = document.getElementById('feedback-type-select').value;
            const message = document.getElementById('feedback-message').value;
            
            if (!message.trim()) {
                showMessageBox('Por favor, preencha a mensagem.', 'error');
                return;
            }
            
            // Simula envio do feedback
            feedbackSubmit.textContent = 'Enviando...';
            feedbackSubmit.disabled = true;
            
            setTimeout(() => {
                showMessageBox('Obrigado pelo seu feedback!', 'success');
                feedbackForm.reset();
                feedbackSubmit.textContent = 'Enviar Feedback';
                feedbackSubmit.disabled = false;
            }, 1000);
        });
    }
});
    