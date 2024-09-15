$(function() {
  function updateContent(language) {
    const texts = {
      "pt-BR": {
        subtitle: "O aplicativo ideal para gerenciar o tratamento de feridas",
        text: "Eficiência no tratamento de feridas",
        subtext: "Com o Heal, você pode registrar, acompanhar e monitorar a evolução do tratamento de feridas de seus pacientes com facilidade. Acesse relatórios detalhados e mantenha seu consultório organizado.",
        btn: "Experimente Agora",
        explicacao: "Como funciona o sistema?",
        gestao: "Gestão de Pacientes",
        prontuario: "Prontuário Eletrônico",
        gestaoDesc: "Histórico de consultas, anamnese, evolução, prescrição, controle de retornos e mensagens personalizadas. Mantenha todas as informações do paciente organizadas em um só lugar, facilitando o acompanhamento e gestão.",
        prontuarioDesc: "Organização, acesso rápido e segurança para informações dos pacientes, facilitando e melhorando a tomada de decisão com base em dados precisos e atualizados.",
        app: "Baixe o aplicativo",
        copyright: "© 2024 Heal - Todos os direitos reservados.",
        policies: "Política de Privacidade",
        terms: "Termos de Uso",
        contact: "Contato"
      },
      "en-US": {
        subtitle: "The ideal app for managing wound care",
        text: "Wound care efficiency",
        subtext: "With Heal, you can easily register, track and monitor the progress of your patients' wound care. Access detailed reports and keep your office organized.",
        btn: "Try It Now",
        explicacao: "How does the system work?",
        gestao: "Patient Management",
        prontuario: "Electronic medical records",
        gestaoDesc: "Appointment history, anamnesis, evolution, prescription, return control and personalized messages. Keep all patient information organized in one place, making it easier to monitor and manage.",
        prontuarioDesc: "Organization, quick access and security for patient information, making decision-making easier and better based on accurate and up-to-date data.",
        app: "Download the app",
        copyright: "© 2024 Heal - All rights reserved.",
        policies: "Privacy Policy",
        terms: "Terms of use",
        contact: "Contact"
      }
    };
    
    const t = texts[language];
    
    // Atualizar conteúdo
    $("#subtitle").text(t.subtitle);
    $(".language-selected").text(language);
    $("#text").text(t.text);
    $("#subtext").text(t.subtext);
    $("#btn .button-text").text(t.btn); // Atualizar o texto do botão
    $("#explicacao").text(t.explicacao);
    $("#gestao-pacientes-tab").text(t.gestao);
    $("#prontuario-tab").text(t.prontuario);
    $("#gestão").text(t.gestao);
    $("#hist").text(t.gestaoDesc);
    $("#pront").text(t.prontuario);
    $("#org").text(t.prontuarioDesc);
    $("#app").text(t.app);
    $("#copyright").text(t.copyright);
    $("#policies").text(t.policies);
    $("#terms").text(t.terms);
    $("#contact").text(t.contact);
  }

  $(".br").click(function() {
    updateContent("pt-BR");
  });

  $(".en").click(function() {
    updateContent("en-US");
  });
});
