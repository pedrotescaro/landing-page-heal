// Aumenta e diminui o tamanho da fonte
const increaseFontButton = document.querySelector('.js-increase-font-size');
const decreaseFontButton = document.querySelector('.js-decrease-font-size');
const body = document.querySelector('body');
let fontSize = 16;

if (increaseFontButton) {
    increaseFontButton.addEventListener('click', increaseFontSize);
}
if (decreaseFontButton) {
    decreaseFontButton.addEventListener('click', decreaseFontSize);
}

function increaseFontSize() {
    if (fontSize < 24) {
        fontSize += 2;
        if (body) {
            body.style.fontSize = fontSize + 'px';
        }
    }
}

function decreaseFontSize() {
    if (fontSize > 10) {
        fontSize -= 2;
        if (body) {
            body.style.fontSize = fontSize + 'px';
        }
    }
}

// Altera idioma do site
const translations = {
    "pt": {
        // Header
        "header.features": "Recursos",
        "header.testimonials": "Depoimentos",
        "header.pricing": "Preços",
        "header.contact": "Contato",
        "header.download": "Baixar Aplicativo",
        "header.login": "Faça login",
        "header.logout": "Sair",
        "header.hello": "Olá",
        
        // Hero
        "hero.title": "<span class='heal-text'>Heal</span><br>Monitoramento Inteligente de Feridas",
        "hero.subtitle": "A solução completa para profissionais da saúde acompanharem a evolução de tratamentos com precisão e eficiência.",
        "hero.downloadButton": "Baixar Aplicativo",
        "hero.login": "Faça login",
        
        // Features
        "features.title": "Recursos Principais",
        "features.subtitle": "Tudo que você precisa para um atendimento eficiente",
        "feature1.title": "Registro de Pacientes",
        "feature1.text": "Cadastre pacientes e acompanhe o histórico completo de tratamentos com fotos e anotações detalhadas.",
        "feature2.title": "Agenda Integrada",
        "feature2.text": "Gerencie consultas e procedimentos com um calendário intuitivo sincronizado em todos os dispositivos.",
        "feature3.title": "Relatórios Inteligentes",
        "feature3.text": "Gere relatórios automatizados com análises detalhadas sobre a evolução dos tratamentos.",
        
        // Testimonials
        "testimonials.title": "Depoimentos",
        "testimonials.subtitle": "O que nossos usuários dizem sobre o Heal",

        "testimonial1.text": "\"O Heal revolucionou minha forma de trabalhar. Agora consigo acompanhar a evolução dos pacientes com muito mais precisão.\"",
        "testimonial1.author": "Dra. Maria Silva",
        "testimonial1.role": "Enfermeira Especialista",

        "testimonial2.text": "\"A praticidade do app é impressionante. Os relatórios automáticos economizam horas do meu tempo toda semana.\"",
        "testimonial2.author": "Dr. João Santos",
        "testimonial2.role": "Médico Dermatologista",
        
            // Pricing
        "pricing.title": "Nossos Planos",
        "pricing.subtitle": "Escolha o plano ideal para suas necessidades",
        
        "plan1.title": "Básico",
        "plan1.price": "Grátis",
        "plan1.feature1": "Até 10 pacientes",
        "plan1.feature2": "Registro básico de feridas",
        "plan1.feature3": "Calendário simples",
        "plan1.button": "Começar Agora",
        
        "plan2.title": "Premium",
        "plan2.price": "R$ 99/mês",
        "plan2.feature1": "Pacientes ilimitados",
        "plan2.feature2": "Análise avançada de feridas",
        "plan2.feature3": "Relatórios personalizados",
        "plan2.feature4": "Suporte prioritário",
        "plan2.button": "Começar Agora",
        
        // FAQ
        "faq.title": "Perguntas Frequentes",
        "faq.subtitle": "Tire suas dúvidas sobre o Heal",
        
        "faq1.question": "Como o Heal ajuda no acompanhamento de feridas?",
        "faq1.answer": "O Heal permite registrar fotos, medidas e observações de cada ferida, criando um histórico completo e organizado. O app também gera relatórios automáticos de evolução e oferece lembretes para próximos atendimentos.",
        
        "faq2.question": "Quais profissionais podem utilizar o Heal?",
        "faq2.answer": "Médicos, enfermeiros e profissionais de saúde especializados em tratamento de feridas.",
        
        "faq3.question": "Os dados dos pacientes ficam seguros?",
        "faq3.answer": "Utilizamos criptografia de ponta a ponta e seguimos rigorosamente as normas da LGPD para garantir total segurança das informações.",
        
        "faq4.question": "Posso usar o Heal em mais de um dispositivo?",
        "faq4.answer": "Sim! Seus dados são sincronizados em tempo real entre todos os dispositivos conectados à sua conta.",
        
        "faq5.question": "Como funciona o suporte técnico?",
        "faq5.answer": "Nossa equipe está disponível 24/7 por chat, e-mail e telefone para auxiliar com qualquer necessidade.",
        
        // Feedback
        "feedback.title": "Sua Opinião é Fundamental",
        "feedback.typeLabel": "Tipo de Feedback",
        "feedback.options.suggestion": "Sugestão",
        "feedback.options.problem": "Problema",
        "feedback.options.praise": "Elogio",
        "feedback.options.other": "Outro",
        "feedback.messageLabel": "Mensagem",
        "feedback.submitButton": "Enviar Feedback",

        // Modal
        "modal.title": "Baixe o Aplicativo Heal",
        "modal.iosDownload": "Download para iOS",
        "modal.androidDownload": "Download para Android",
        "modal.choosePlatform": "Escolha a plataforma de sua preferência",

        // Login
        "login.title": "Bem-vindo de volta",
        "login.subtitle": "Faça login para acessar seu histórico de tratamentos",
        "login.email": "Email",
        "login.emailPlaceholder": "seu@email.com",
        "login.password": "Senha",
        "login.forgotPassword": "Esqueceu a senha?",
        "login.rememberMe": "Lembrar de mim",
        "login.submitButton": "Entrar",
        "login.noAccount": "Não tem uma conta?",
        "login.signUp": "Cadastre-se",
        "login.backToHome": "Voltar para a página inicial",

        // Register
        "register.title": "Crie sua conta",
        "register.subtitle": "Preencha os dados abaixo para começar",
        "register.fullName": "Nome Completo",
        "register.email": "Email",
        "register.password": "Senha",
        "register.confirmPassword": "Confirmar Senha",
        "register.passwordMismatch": "As senhas não conferem",
        "register.submitButton": "Cadastrar",
        "register.haveAccount": "Já possui uma conta?",
        "register.signIn": "Entrar",
        "register.backToHome": "Voltar para a página inicial",

        // Common
        "common.back": "Voltar",
        "common.loading": "Carregando...",
        "common.error": "Erro",
        "common.success": "Sucesso",
        "common.warning": "Aviso",
        "common.info": "Informação",
        "common.close": "Fechar",
        "common.cancel": "Cancelar",
        "common.save": "Salvar",
        "common.edit": "Editar",
        "common.delete": "Excluir",
        "common.confirm": "Confirmar",
        "common.yes": "Sim",
        "common.no": "Não",

        // Messages
        "message.loginSuccess": "Login realizado com sucesso!",
        "message.loginError": "Email ou senha incorretos",
        "message.registerSuccess": "Conta criada com sucesso!",
        "message.registerError": "Erro ao criar conta",
        "message.emailRequired": "Email é obrigatório",
        "message.passwordRequired": "Senha é obrigatória",
        "message.nameRequired": "Nome é obrigatório",
        "message.passwordMismatch": "As senhas não conferem",
        "message.invalidEmail": "Email inválido",
        "message.passwordTooShort": "Senha deve ter pelo menos 6 caracteres",
        "message.networkError": "Erro de conexão. Tente novamente.",
        "message.fillAllFields": "Por favor, preencha todos os campos.",

        // Footer
        "footer.contact": "Contato",
        "footer.navigation": "Navegação",
        "footer.connect": "Conecte-se",
        "footer.followUs": "Siga-nos para atualizações",
        "footer.links.home": "Home",
        "footer.links.features": "Recursos",
        "footer.links.testimonials": "Depoimentos",
        "footer.links.pricing": "Planos",
        "footer.links.faq": "Perguntas Frequentes",
        "footer.policies.terms": "Termos de Uso",
        "footer.policies.privacy": "Privacidade",
        "footer.policies.cookies": "Cookies",
        "footer.policies.accessibility": "Acessibilidade",
        "footer.copyright": "© 2025 Heal. Todos os direitos reservados.",

        // Features (alternativos para telas de login/cadastro)
        "feature1b.title": "Registro fotográfico",
        "feature1b.text": "Capture e organize fotos para acompanhar a evolução visual do tratamento.",
        "feature2b.title": "Medidas e observações",
        "feature2b.text": "Registre dimensões, características e notas importantes sobre cada ferida.",
        "feature3b.title": "Relatórios automáticos",
        "feature3b.text": "Gere relatórios detalhados de evolução para compartilhar com a equipe médica.",
    },
    "en": {
    // Header
    "header.features": "Features",
    "header.testimonials": "Testimonials",
    "header.pricing": "Pricing",
    "header.contact": "Contact",
    "header.download": "Download App",
    "header.login": "Sign In",
    "header.logout": "Sign Out",
    "header.hello": "Hello",

    // Hero
    "hero.title": "<span class='heal-text'>Heal</span><br>Smart Wound Monitoring",
    "hero.subtitle": "The complete solution for healthcare professionals to track treatment progress with precision and efficiency.",
    "hero.downloadButton": "Download App",
    "hero.login": "Sign In",

    // Features
    "features.title": "Main Features",
    "features.subtitle": "Everything you need for efficient care",
    "feature1.title": "Patient Records",
    "feature1.text": "Register patients and track complete treatment history with photos and detailed notes.",
    "feature2.title": "Integrated Scheduler",
    "feature2.text": "Manage consultations and procedures with an intuitive calendar synchronized across all devices.",
    "feature3.title": "Smart Reports",
    "feature3.text": "Generate automated reports with detailed analysis of treatment progress.",

    // Testimonials
    "testimonials.title": "Testimonials",
    "testimonials.subtitle": "What our users say about Heal",

    "testimonial1.text": "\"Heal has revolutionized the way I work. Now I can track patient progress much more accurately.\"",
    "testimonial1.author": "Dr. Maria Silva",
    "testimonial1.role": "Specialist Nurse",

    "testimonial2.text": "\"The app's convenience is impressive. The automatic reports save me hours every week.\"",
    "testimonial2.author": "Dr. João Santos",
    "testimonial2.role": "Dermatologist",

    // Pricing
    "pricing.title": "Our Plans",
    "pricing.subtitle": "Choose the plan that best fits your needs",

    "plan1.title": "Basic",
    "plan1.price": "Free",
    "plan1.feature1": "Up to 10 patients",
    "plan1.feature2": "Basic wound registration",
    "plan1.feature3": "Simple calendar",
    "plan1.button": "Start Now",

    "plan2.title": "Premium",
    "plan2.price": "$19/month", 
    "plan2.feature1": "Unlimited patients",
    "plan2.feature2": "Advanced wound analysis",
    "plan2.feature3": "Custom reports",
    "plan2.feature4": "Priority support",
    "plan2.button": "Start Now",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Get your questions about Heal answered",

    "faq1.question": "How does Heal assist in wound monitoring?",
    "faq1.answer": "Heal allows you to record photos, measurements, and observations for each wound, creating a complete and organized history. The app also generates automatic progress reports and offers reminders for upcoming appointments.",

    "faq2.question": "Which professionals can use Heal?",
    "faq2.answer": "Doctors, nurses, and healthcare professionals specialized in wound care.",

    "faq3.question": "Are patient data secure?",
    "faq3.answer": "We use end-to-end encryption and strictly follow GDPR standards to ensure total information security.",

    "faq4.question": "Can I use Heal on more than one device?",
    "faq4.answer": "Yes! Your data is synchronized in real-time across all devices connected to your account.",

    "faq5.question": "How does technical support work?",
    "faq5.answer": "Our team is available 24/7 via chat, email, and phone to assist with any needs.",

        // Feedback
    "feedback.title": "Your Opinion is Essential",
    "feedback.typeLabel": "Feedback Type",
    "feedback.options.suggestion": "Suggestion",
    "feedback.options.problem": "Problem",
    "feedback.options.praise": "Praise",
    "feedback.options.other": "Other",
    "feedback.messageLabel": "Message",
    "feedback.submitButton": "Send Feedback",

        // Modal
    "modal.title": "Download the Heal App",
    "modal.iosDownload": "Download for iOS",
    "modal.androidDownload": "Download for Android",
    "modal.choosePlatform": "Choose your preferred platform",

        // Login
        "login.title": "Welcome back",
        "login.subtitle": "Sign in to access your treatment history",
        "login.email": "Email",
        "login.emailPlaceholder": "your@email.com",
        "login.password": "Password",
        "login.forgotPassword": "Forgot password?",
        "login.rememberMe": "Remember me",
        "login.submitButton": "Sign In",
        "login.noAccount": "Don't have an account?",
        "login.signUp": "Sign up",
        "login.backToHome": "Back to home page",

        // Register
        "register.title": "Create your account",
        "register.subtitle": "Fill in the data below to get started",
        "register.fullName": "Full Name",
        "register.email": "Email",
        "register.password": "Password",
        "register.confirmPassword": "Confirm Password",
        "register.passwordMismatch": "Passwords don't match",
        "register.submitButton": "Sign Up",
        "register.haveAccount": "Already have an account?",
        "register.signIn": "Sign In",
        "register.backToHome": "Back to home page",

        // Common
        "common.back": "Back",
        "common.loading": "Loading...",
        "common.error": "Error",
        "common.success": "Success",
        "common.warning": "Warning",
        "common.info": "Information",
        "common.close": "Close",
        "common.cancel": "Cancel",
        "common.save": "Save",
        "common.edit": "Edit",
        "common.delete": "Delete",
        "common.confirm": "Confirm",
        "common.yes": "Yes",
        "common.no": "No",

        // Messages
        "message.loginSuccess": "Login successful!",
        "message.loginError": "Incorrect email or password",
        "message.registerSuccess": "Account created successfully!",
        "message.registerError": "Error creating account",
        "message.emailRequired": "Email is required",
        "message.passwordRequired": "Password is required",
        "message.nameRequired": "Name is required",
        "message.passwordMismatch": "Passwords don't match",
        "message.invalidEmail": "Invalid email",
        "message.passwordTooShort": "Password must be at least 6 characters",
        "message.networkError": "Connection error. Try again.",
        "message.fillAllFields": "Please fill in all fields.",

    // Footer
    "footer.contact": "Contact",
    "footer.navigation": "Navigation",
    "footer.connect": "Connect",
    "footer.followUs": "Follow us for updates",
    "footer.links.home": "Home",
    "footer.links.features": "Features",
    "footer.links.testimonials": "Testimonials",
    "footer.links.pricing": "Pricing",
    "footer.links.faq": "FAQ",
    "footer.policies.terms": "Terms of Use",
    "footer.policies.privacy": "Privacy",
    "footer.policies.cookies": "Cookies",
    "footer.policies.accessibility": "Accessibility",
    "footer.copyright": "© 2025 Heal. All rights reserved.",

    // Features (alternatives for login/register screens)
    "feature1b.title": "Photo Records",
    "feature1b.text": "Capture and organize photos to track the visual progress of treatment.",
    "feature2b.title": "Measurements and Notes",
    "feature2b.text": "Record dimensions, characteristics, and important notes about each wound.",
    "feature3b.title": "Automatic Reports",
    "feature3b.text": "Generate detailed progress reports to share with the medical team.",
    }
};

 // Função para mudar idioma
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    // Atualizar todos os elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
        element.innerHTML = translations[lang][key];
        }
    });

    // Atualizar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Atualizar títulos das páginas
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const currentPage = window.location.pathname;
        if (currentPage.includes('login.html')) {
            pageTitle.textContent = lang === 'pt' ? 'Login - Heal' : 'Login - Heal';
        } else if (currentPage.includes('cadastrar.html')) {
            pageTitle.textContent = lang === 'pt' ? 'Cadastro - Heal' : 'Register - Heal';
        }
    }

    // Atualizar seletor de idioma
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.value = lang;
    }

    // Disparar evento customizado para outros scripts
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

// Função para obter tradução
function getTranslation(key, lang = null) {
    const currentLang = lang || localStorage.getItem('language') || 'pt';
    return translations[currentLang] && translations[currentLang][key] ? translations[currentLang][key] : key;
}

// Função para mostrar mensagens traduzidas
function showTranslatedMessage(messageKey, type = 'info', duration = 3000) {
    const message = getTranslation(messageKey);
    showMessage(message, type, duration);
}

// Função para mostrar mensagens (pode ser usada por outros scripts)
function showMessage(message, type = 'info', duration = 3000) {
    // Remove mensagens existentes
    const existingMessages = document.querySelectorAll('.message-box');
    existingMessages.forEach(msg => msg.remove());

    // Cria nova mensagem
    const messageBox = document.createElement('div');
    messageBox.className = `message-box ${type}`;
    messageBox.textContent = message;
    messageBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Define cores baseadas no tipo
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    messageBox.style.backgroundColor = colors[type] || colors.info;

    // Adiciona ao DOM
    document.body.appendChild(messageBox);

    // Anima entrada
    setTimeout(() => {
        messageBox.style.opacity = '1';
        messageBox.style.transform = 'translateX(0)';
    }, 10);

    // Remove após duração
    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.style.transform = 'translateX(100%)';
        setTimeout(() => messageBox.remove(), 300);
    }, duration);
}

// Carregar idioma salvo
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'pt';
    changeLanguage(savedLang);
    
    // Adicionar event listener para mudança de idioma
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});

// Exportar funções para uso em outros scripts
window.i18n = {
    changeLanguage,
    getTranslation,
    showTranslatedMessage,
    showMessage
};