document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("password-strength");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const matchError = document.getElementById("password-match-error");

  // Função para obter tradução
  function getTranslation(key) {
    return window.i18n ? window.i18n.getTranslation(key) : key;
  }

  // Função para mostrar mensagem traduzida
  function showTranslatedMessage(messageKey, type = 'error') {
    if (window.i18n && window.i18n.showTranslatedMessage) {
      window.i18n.showTranslatedMessage(messageKey, type);
    } else {
      showError(getTranslation(messageKey));
    }
  }

  // Só executa se os elementos existirem
  if (passwordInput && passwordStrength) {
    passwordInput.addEventListener("input", function () {
      const strength = avaliarForcaSenha(passwordInput.value);
      const currentLang = localStorage.getItem('language') || 'pt';

      switch (strength) {
        case "fraca":
          passwordStrength.textContent = currentLang === 'pt' ? "Força da senha: Fraca" : "Password strength: Weak";
          passwordStrength.style.color = "red";
          break;
        case "media":
          passwordStrength.textContent = currentLang === 'pt' ? "Força da senha: Média" : "Password strength: Medium";
          passwordStrength.style.color = "orange";
          break;
        case "forte":
          passwordStrength.textContent = currentLang === 'pt' ? "Força da senha: Forte" : "Password strength: Strong";
          passwordStrength.style.color = "green";
          break;
        default:
          passwordStrength.textContent = "";
      }
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      // Limpa mensagens anteriores
      if (matchError) {
        matchError.classList.add("hidden");
      }

      // Validação dos campos obrigatórios
      if (!name || !email || !password || !confirmPassword) {
        showTranslatedMessage("message.fillAllFields", "error");
        e.preventDefault();
        return;
      }

      // Validação do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showTranslatedMessage("message.invalidEmail", "error");
        e.preventDefault();
        return;
      }

      // Validação da senha
      const senhaSeguraRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
      if (!senhaSeguraRegex.test(password)) {
        showTranslatedMessage("message.passwordTooShort", "error");
        e.preventDefault();
        return;
      }

      // Confirmação de senha
      if (password !== confirmPassword) {
        showTranslatedMessage("message.passwordMismatch", "error");
        e.preventDefault();
        return;
      }
    });
  }

  // Função para exibir erros de forma mais elegante em todos os campos obrigatórios
  function showError(message) {
    if (!matchError) return;
    
    matchError.textContent = message;
    matchError.classList.remove("hidden");
    matchError.style.background = "#ffe0e0";
    matchError.style.color = "#b71c1c";
    matchError.style.border = "1px solid #ffb3b3";
    matchError.style.padding = "10px";
    matchError.style.borderRadius = "6px";
    matchError.style.marginTop = "10px";
    matchError.style.fontWeight = "bold";
    matchError.style.boxShadow = "0 2px 8px rgba(255,0,0,0.08)";
    
    // Aplica o estilo também nos campos obrigatórios que estão vazios
    const requiredFields = [
      document.getElementById("name"), 
      document.getElementById("email"), 
      passwordInput, 
      confirmPasswordInput
    ].filter(field => field !== null); // Remove campos nulos
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.border = "2px solid #ffb3b3";
        field.style.background = "#fff5f5";
      } else {
        field.style.border = "";
        field.style.background = "";
      }
    });
    
    setTimeout(() => {
      if (matchError) {
        matchError.classList.add("hidden");
        matchError.removeAttribute("style");
      }
      requiredFields.forEach(field => {
        if (field) {
          field.style.border = "";
          field.style.background = "";
        }
      });
    }, 3000);
  }

  function avaliarForcaSenha(senha) {
    let pontuacao = 0;
    if (senha.length >= 6) pontuacao++;
    if (/[A-Z]/.test(senha)) pontuacao++;
    if (/[a-z]/.test(senha)) pontuacao++;
    if (/[0-9]/.test(senha)) pontuacao++;
    if (/[\W_]/.test(senha)) pontuacao++;

    if (pontuacao <= 2) return "fraca";
    if (pontuacao === 3 || pontuacao === 4) return "media";
    if (pontuacao === 5) return "forte";
  }

  // Mostrar/Esconder Senha
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const input = document.getElementById(targetId);
      const icon = this.querySelector("i");

      if (input && icon) {
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  });

  // Função que verifica se as senhas digitadas são iguais  
  function checkPasswordMatch() {
    if (!matchError || !confirmPasswordInput || !passwordInput) return;
    
    if (confirmPasswordInput.value === "") {
      matchError.classList.add("hidden");
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      matchError.classList.remove("hidden");
      matchError.textContent = getTranslation("register.passwordMismatch");
    } else {
      matchError.classList.add("hidden");
    }
  }

  // Só adiciona event listeners se os elementos existirem
  if (passwordInput) {
    passwordInput.addEventListener("input", checkPasswordMatch);
  }
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", checkPasswordMatch);
  }

  // Event listener para mudança de idioma
  document.addEventListener('languageChanged', function(e) {
    // Atualizar mensagens de erro se estiverem visíveis
    if (matchError && !matchError.classList.contains('hidden')) {
      matchError.textContent = getTranslation("register.passwordMismatch");
    }
    
    // Atualizar força da senha se estiver visível
    if (passwordInput && passwordStrength && passwordStrength.textContent) {
      const strength = avaliarForcaSenha(passwordInput.value);
      const currentLang = e.detail.language;
      
      switch (strength) {
        case "fraca":
          passwordStrength.textContent = currentLang === 'pt' ? "Força da senha: Fraca" : "Password strength: Weak";
          break;
        case "media":
          passwordStrength.textContent = currentLang === 'pt' ? "Força da senha: Média" : "Password strength: Medium";
          break;
        case "forte":
          passwordStrength.textContent = currentLang === 'pt' ? "Força da senha: Forte" : "Password strength: Strong";
          break;
      }
    }
  });
});
