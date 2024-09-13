$(function() {
  $(".br").click(function() {
      // Cabeçalho
      $("#subtitle").text("O aplicativo ideal para gerenciar o tratamento de feridas");
      $(".language-selected").text("pt-BR");
      // Corpo do site
      $("#text").text("Eficiência no tratamento de feridas");
      $("#subtext").text("Com o Heal, você pode registrar, acompanhar e monitorar a evolução do tratamento de feridas de seus pacientes com facilidade. Acesse relatórios detalhados e mantenha seu consultório organizado.");
      $("#btn").text("Experimente Agora");
      // Seção de Como Funciona com Abas
      $("#explicacao").text("Como funciona o sistema?");
      // Conteúdo das Abas
      $("#gestao-pacientes-tab").text("Gestão de Pacientes");
      $("#prontuario-tab").text("Prontuário Eletrônico");
      $("#gestão").text("Gestão de Pacientes");
      $("#hist").text("Histórico de consultas, anamnese, evolução, prescrição, controle de retornos e mensagens personalizadas. Mantenha todas as informações do paciente organizadas em um só lugar, facilitando o acompanhamento e gestão.");
      $("#pront").text("Prontuário Eletrônico");
      $("#org").text("Organização, acesso rápido e segurança para informações dos pacientes, facilitando e melhorando a tomada de decisão com base em dados precisos e atualizados.");
      $("#app").text("Baixe o aplicativo");
      // Footer
      $("#copyright").text("© 2024 Heal - Todos os direitos reservados.");
      $("#policies").text("Política de Privacidade");
      $("#terms").text("Termos de Uso");
      $("#contact").text("Contato");
  });

  $(".en").click(function() {
      // Cabeçalho
      $("#subtitle").text("The ideal app for managing wound care");
      $(".language-selected").text("en-US");
      // Corpo do site
      $("#text").text("Wound care efficiency");
      $("#subtext").text("With Heal, you can easily register, track and monitor the progress of your patients' wound care. Access detailed reports and keep your office organized.");
      $("#btn").text("Try It Now");
      // Seção de Como Funciona com Abas
      $("#explicacao").text("How does the system work?");
      // Conteúdo das Abas
      $("#gestao-pacientes-tab").text("Patient Management");
      $("#prontuario-tab").text("Electronic medical records");
      $("#gestão").text("Patient Management");
      $("#hist").text("Appointment history, anamnesis, evolution, prescription, return control and personalized messages. Keep all patient information organized in one place, making it easier to monitor and manage.");
      $("#pront").text("Electronic medical records");
      $("#org").text("Organization, quick access and security for patient information, making decision-making easier and better based on accurate and up-to-date data.");
      $("#app").text("Download the app");
      // Footer
      $("#copyright").text("© 2024 Heal - All rights reserved.");
      $("#policies").text("Privacy Policy");
      $("#terms").text("Terms of use");
      $("#contact").text("Contact");
  });
});
