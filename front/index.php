<?php
session_start();
function formatUserName($fullName) {
    $parts = explode(' ', trim($fullName));
    if (count($parts) >= 2) {
        return $parts[0] . ' ' . end($parts); // primeiro e último
    }
    return $fullName; // nome único
}

$userName = $_SESSION['user_name'] ?? null;
$displayName = $userName ? formatUserName($userName) : null;

// Se não está logado, redireciona para login
/*
if (!isset($_SESSION['user_name'])) {
    header("Location: login.html");
    exit;
}
*/

?>

<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heal - Monitoramento Inteligente de Feridas</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script defer src="theme.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <link rel="icon" type="image/png" href="imgs/Logo_Heal4.png">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/generalcss.css">
    <link rel="stylesheet" href="css/style.css">

    <script>
        // Objeto de traduções
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
            document.getElementById('languageSwitcher').value = savedLang;
        });
    </script>

    <style>
        @import url(css/generalcss.css);
    </style>
</head>
<body>
  <!-- Header -->
<header>
   <div class="container header-container">
        <!-- Grupo Logo + Menu Toggle -->
        <div class="flex items-center gap-4 relative z-50">
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars text-sky-600"></i>
            </button>
            <div class="flex items-center gap-2">
                <img src="imgs/Logo_Heal4.png" alt="Heal Logo" class="w-12 object-contain">
                <div class="logo">Heal</div>
            </div>
        </div>

        <!-- Links de Navegação -->
        <nav class="nav-links" id="navLinks">
               <!-- Seletor de Idioma -->
               <select id="languageSwitcher" onchange="changeLanguage(this.value)" 
               class="language-selector bg-transparent border border-sky-300 rounded-lg px-2 py-1 text-sm">
                    <option value="pt">🇧🇷 Português</option>
                    <option value="en">🇺🇸 English</option>
                </select>
                
                <a href="#recursos" data-i18n="header.features"></a>
                <a href="#depoimentos" data-i18n="header.testimonials"></a>
                <a href="#precos" data-i18n="header.pricing"></a>
                <a href="#footer" data-i18n="header.contact"></a>
               
      <div class="cta-buttons">
        
    <?php if ($displayName): ?>
            <!-- Exibe o nome do usuário e botão logout -->
                <span class="user-name me-2">
                     <span data-i18n="header.hello">Olá</span>, <?= htmlspecialchars($displayName) ?>
                </span>
            <form action="php/logout.php" method="POST" style="display: inline;">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-sign-out-alt"></i>
                    <span data-i18n="header.logout">Logout</span>
                </button>
            </form>
        <?php else: ?>
            <!-- Se não logado, mostra botão login -->
            <button onclick="location.href='login.html'" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i>
                <span data-i18n="header.login">Login</span>
            </button>
        <?php endif; ?>
                      <button id="toggleDarkMode" class="btn btn-outline">
                        🌙
                    </button>
                </div>
            </nav>
        </div>
    </header>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <h1 data-i18n="hero.title"></h1>
            <p data-i18n="hero.subtitle"></p>
            <div class="hero-buttons">
                <button class="btn btn-primary" data-modal-trigger>
                    <i class="fas fa-download"></i> 
                    <span data-i18n="hero.downloadButton"></span>
                </button>
               <a href="login.html" class="btn btn-outline">
                <i class="fas fa-sign-out-alt"></i>
                <span data-i18n="hero.login"></span>
            </a>

            </div>
        </div>
    </div>
</section>


   <!-- Features Section com internacionalização -->
   <section id="recursos" class="features">
    <div class="container">
        <div class="section-header">
            <h2 data-i18n="features.title"></h2>
            <p data-i18n="features.subtitle"></p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <h3 data-i18n="feature1.title"></h3>
                <p data-i18n="feature1.text"></p>
            </div>
            <div class="feature-card">
                <h3 data-i18n="feature2.title"></h3>
                <p data-i18n="feature2.text"></p>
            </div>
            <div class="feature-card">
                <h3 data-i18n="feature3.title"></h3>
                <p data-i18n="feature3.text"></p>
            </div>
            </div>
        </div>
    </section>

<!-- Testimonials Section -->
<section id="depoimentos" class="testimonials">
    <div class="container">
        <div class="section-header animate-fade-in-up">
            <h2 data-i18n="testimonials.title"></h2>
            <p data-i18n="testimonials.subtitle"></p>
        </div>
        <div class="testimonials-grid">
            <div class="testimonial-card animate-fade-in-up" style="animation-delay: 0.1s;">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p data-i18n="testimonial1.text"></p>
                <div>
                    <p class="testimonial-author" data-i18n="testimonial1.author"></p>
                    <p class="testimonial-role" data-i18n="testimonial1.role"></p>
                </div>
            </div>
            <div class="testimonial-card animate-fade-in-up" style="animation-delay: 0.2s;">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p data-i18n="testimonial2.text"></p>
                <div>
                    <p class="testimonial-author" data-i18n="testimonial2.author"></p>
                    <p class="testimonial-role" data-i18n="testimonial2.role"></p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Pricing Section -->
<section id="precos" class="pricing">
    <div class="container">
        <div class="section-header">
            <h2 data-i18n="pricing.title"></h2>
            <p data-i18n="pricing.subtitle"></p>
        </div>
        <div class="pricing-grid">
            <div class="pricing-card flex flex-col justify-between">
                <div>
                    <h3 data-i18n="plan1.title"></h3>
                    <div class="price" data-i18n="plan1.price"></div>
                    <div class="features-list">
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span data-i18n="plan1.feature1"></span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span data-i18n="plan1.feature2"></span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span data-i18n="plan1.feature3"></span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-outline" style="width: 100%;" data-i18n="plan1.button"></button>
            </div>
            <div class="pricing-card">
                <h3 data-i18n="plan2.title"></h3>
                <div class="price" data-i18n="plan2.price"></div>
                <div class="features-list">
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span data-i18n="plan2.feature1"></span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span data-i18n="plan2.feature2"></span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span data-i18n="plan2.feature3"></span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span data-i18n="plan2.feature4"></span>
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%;" data-i18n="plan2.button"></button>
            </div>
        </div>
    </div>
</section>


<!-- FAQ Section -->
<section id="faq" class="faq">
    <div class="container">
        <div class="section-header animate-fade-in-up">
            <h2 data-i18n="faq.title"></h2>
            <p data-i18n="faq.subtitle"></p>
        </div>
        <div class="faq-container">
            <!-- Item 1 -->
            <div class="faq-item animate-fade-in-up" style="animation-delay: 0.1s;">
                <div class="faq-question" data-i18n="faq1.question"></div>
                <div class="faq-answer" data-i18n="faq1.answer"></div>
            </div>

            <!-- Item 2 -->
            <div class="faq-item animate-fade-in-up" style="animation-delay: 0.2s;">
                <div class="faq-question" data-i18n="faq2.question"></div>
                <div class="faq-answer" data-i18n="faq2.answer"></div>
            </div>

            <!-- Item 3 -->
            <div class="faq-item animate-fade-in-up" style="animation-delay: 0.3s;">
                <div class="faq-question" data-i18n="faq3.question"></div>
                <div class="faq-answer" data-i18n="faq3.answer"></div>
            </div>

            <!-- Item 4 -->
            <div class="faq-item animate-fade-in-up" style="animation-delay: 0.4s;">
                <div class="faq-question" data-i18n="faq4.question"></div>
                <div class="faq-answer" data-i18n="faq4.answer"></div>
            </div>

            <!-- Item 5 -->
            <div class="faq-item animate-fade-in-up" style="animation-delay: 0.5s;">
                <div class="faq-question" data-i18n="faq5.question"></div>
                <div class="faq-answer" data-i18n="faq5.answer"></div>
            </div>
        </div>
    </div>
</section>
<!-- Feedback Section - Tema Claro -->
<section id="feedback" class="container mx-auto px-4 mb-32">
    <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center text-sky-600" data-i18n="feedback.title"></h2>
        <form class="space-y-6 bg-white rounded-2xl p-6 border border-sky-200 shadow-lg">
            <div>
                <label class="block text-sm font-medium mb-2 text-gray-800" data-i18n="feedback.typeLabel"></label>
                <select class="w-full px-4 py-3 rounded-lg bg-white border border-sky-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-gray-800 transition-all">
                    <option data-i18n="feedback.options.suggestion"></option>
                    <option data-i18n="feedback.options.problem"></option>
                    <option data-i18n="feedback.options.praise"></option>
                    <option data-i18n="feedback.options.other"></option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2 text-gray-800" data-i18n="feedback.messageLabel"></label>
                <textarea rows="4" required class="w-full px-4 py-3 rounded-lg bg-white border border-sky-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-gray-800 resize-none transition-all">
                </textarea>
            </div>
            <button type="submit"
                class="w-full py-3 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-sky-200"
                data-i18n="feedback.submitButton">
            </button>
        </form>
    </div>
</section>


<footer id="footer" class="bg-gray-900 py-12 px-4 mt-32">
    <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Contato -->
            <div class="space-y-4">
                <h3 class="text-xl font-bold text-sky-400" data-i18n="footer.contact"></h3>
                <div class="text-gray-300 space-y-2">
                    <p class="flex items-center">
                        <i class="fas fa-envelope mr-2 text-sky-300"></i>
                        healgrupo@gmail.com
                    </p>
                </div>
            </div>

            <!-- Navegação -->
            <div class="space-y-4">
                <h3 class="text-xl font-bold text-sky-400" data-i18n="footer.navigation"></h3>
                <ul class="space-y-2">
                    <li><a href="#home" class="text-gray-300 hover:text-sky-300 transition-colors" data-i18n="footer.links.home"></a></li>
                    <li><a href="#recursos" class="text-gray-300 hover:text-sky-300 transition-colors" data-i18n="footer.links.features"></a></li>
                    <li><a href="#depoimentos" class="text-gray-300 hover:text-sky-300 transition-colors" data-i18n="footer.links.testimonials"></a></li>
                    <li><a href="#precos" class="text-gray-300 hover:text-sky-300 transition-colors" data-i18n="footer.links.pricing"></a></li>
                    <li><a href="#faq" class="text-gray-300 hover:text-sky-300 transition-colors" data-i18n="footer.links.faq"></a></li>
                </ul>
            </div>

            <!-- Redes Sociais -->
            <div class="space-y-4">
                <h3 class="text-xl font-bold text-sky-400" data-i18n="footer.connect"></h3>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-300 hover:text-sky-400 transition-colors transform hover:scale-110">
                        <i class="fab fa-whatsapp text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-300 hover:text-sky-400 transition-colors transform hover:scale-110">
                        <i class="fab fa-linkedin text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-300 hover:text-sky-400 transition-colors transform hover:scale-110">
                        <i class="fab fa-youtube text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-300 hover:text-sky-400 transition-colors transform hover:scale-110">
                        <i class="fab fa-instagram text-2xl"></i>
                    </a>
                </div>
                <p class="text-gray-400 text-sm" data-i18n="footer.followUs"></p>
            </div>
        </div>

        <!-- Rodapé Inferior -->
        <div class="border-t border-gray-700 mt-12 pt-8 text-center">
            <p class="text-gray-400 text-sm" data-i18n="footer.copyright"></p>
            <div class="flex justify-center space-x-6 mt-4">
                <a href="#" class="text-gray-400 hover:text-sky-300 text-sm" data-i18n="footer.policies.terms"></a>
                <a href="#" class="text-gray-400 hover:text-sky-300 text-sm" data-i18n="footer.policies.privacy"></a>
                <a href="#" class="text-gray-400 hover:text-sky-300 text-sm" data-i18n="footer.policies.cookies"></a>
                <a href="#" class="text-gray-400 hover:text-sky-300 text-sm" data-i18n="footer.policies.accessibility"></a>
            </div>
        </div>
    </div>
</footer>


<!-- WhatsApp Button -->
<a href="https://wa.me/5511972015304" target="_blank" class="whatsapp-button">
    <i class="fab fa-whatsapp"></i>
</a>

<!-- Modal Download -->
<div id="downloadModal" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative bg-white rounded-2xl p-8 max-w-md w-full animate-fade-in">
            <button id="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
                <i class="fas fa-times text-xl"></i>
            </button>
            
            <h2 class="text-2xl font-bold text-blue-900 mb-6 text-center" data-i18n="modal.title"></h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" class="download-btn group">
                    <div class="bg-blue-50 rounded-xl p-4 transition-all hover:bg-blue-100 hover:-translate-y-1">
                        <i class="fab fa-apple text-3xl text-gray-800 mb-2 group-hover:text-blue-600"></i>
                        <p class="font-semibold text-gray-800 group-hover:text-blue-600" data-i18n="modal.iosDownload"></p>
                    </div>
                </a>
                
                <a href="#" class="download-btn group">
                    <div class="bg-green-50 rounded-xl p-4 transition-all hover:bg-green-100 hover:-translate-y-1">
                        <i class="fab fa-google-play text-3xl text-gray-800 mb-2 group-hover:text-green-600"></i>
                        <p class="font-semibold text-gray-800 group-hover:text-green-600" data-i18n="modal.androidDownload"></p>
                    </div>
                </a>
            </div>
            
            <p class="text-center text-gray-600 mt-6 text-sm" data-i18n="modal.choosePlatform"></p>
        </div>
    </div>
</div>
    <div class="hidden lg:flex flex-col gap-2 fixed right-3 top-40">
        <button class="js-increase-font-size text-white bg-[#1F71D0] border border-solid border-white/50 hover:bg-white hover:text-[#1F71D0] hover:border-[#1F71D0]/50 transition-colors duration-300 h-[40px] rounded w-[40px] px-2 text-2xl flex justify-center">+</button>
        <button class="js-decrease-font-size text-white bg-[#1F71D0] border border-solid border-white/50 hover:bg-white hover:text-[#1F71D0] hover:border-[#1F71D0]/50 transition-colors duration-300 h-[40px] rounded w-[40px] text-2xl flex justify-center">-</button>
    </div>
    <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
            <div class="vw-plugin-top-wrapper"></div>
        </div>
    </div>
    <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
    <script>
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    </script>
    <script src="js/script.js"></script>
    <script src="js/script-geral.js"></script>
    <script src="js/script-mododark.js"></script>
<script>
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
</script>


</body>
</html>