// Aumenta e diminui o tamanho da fonte
const increaseFontButton = document.querySelector('.js-increase-font-size');
const decreaseFontButton = document.querySelector('.js-decrease-font-size');
const body = document.querySelector('body');
let fontSize = 16;

increaseFontButton.addEventListener('click', increaseFontSize);
decreaseFontButton.addEventListener('click', decreaseFontSize);

function increaseFontSize() {
    if (fontSize < 24) {
        fontSize += 2;
        document.body.style.fontSize = fontSize + 'px';
    }
}

function decreaseFontSize() {
    if (fontSize > 10) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
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
        
        //feedback
        "feedback.title": "Sua Opinião é Fundamental",
        "feedback.typeLabel": "Tipo de Feedback",
        "feedback.options.suggestion": "Sugestão",
        "feedback.options.problem": "Problema",
        "feedback.options.praise": "Elogio",
        "feedback.options.other": "Outro",
        "feedback.messageLabel": "Mensagem",
        "feedback.submitButton": "Enviar Feedback",

        //modal
        "modal.title": "Baixe o Aplicativo Heal",
        "modal.iosDownload": "Download para iOS",
        "modal.androidDownload": "Download para Android",
        "modal.choosePlatform": "Escolha a plataforma de sua preferência",
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
        "footer.copyright": "© 2025 Heal. Todos os direitos reservados."
        
        // E todas as outras strings necessárias
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

    //feedback
    "feedback.title": "Your Opinion is Essential",
    "feedback.typeLabel": "Feedback Type",
    "feedback.options.suggestion": "Suggestion",
    "feedback.options.problem": "Problem",
    "feedback.options.praise": "Praise",
    "feedback.options.other": "Other",
    "feedback.messageLabel": "Message",
    "feedback.submitButton": "Send Feedback",

    //modal
    "modal.title": "Download the Heal App",
    "modal.iosDownload": "Download for iOS",
    "modal.androidDownload": "Download for Android",
    "modal.choosePlatform": "Choose your preferred platform",

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
    "footer.copyright": "© 2025 Heal. All rights reserved."
    }
};

 // Função para mudar idioma
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    // Atualizar todos os elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = translations[lang][key];
    });
}

// Carregar idioma salvo
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'pt';
    changeLanguage(savedLang);
    
    const languageSwitcher = document.getElementById('languageSwitcher');

    if (languageSwitcher) {
        languageSwitcher.value = savedLang;
    }
});