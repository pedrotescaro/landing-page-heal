document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("password-strength");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const matchError = document.getElementById("password-match-error");

  // Só executa se os elementos existirem
  if (passwordInput && passwordStrength) {
    passwordInput.addEventListener("input", function () {
      const strength = avaliarForcaSenha(passwordInput.value);

      switch (strength) {
        case "fraca":
          passwordStrength.textContent = "Força da senha: Fraca";
          passwordStrength.style.color = "red";
          break;
        case "media":
          passwordStrength.textContent = "Força da senha: Média";
          passwordStrength.style.color = "orange";
          break;
        case "forte":
          passwordStrength.textContent = "Força da senha: Forte";
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
        showError("Por favor, preencha todos os campos.");
        e.preventDefault();
        return;
      }

      // Validação do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError("E-mail inválido. Tente novamente.");
        e.preventDefault();
        return;
      }

      // Validação da senha
      const senhaSeguraRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
      if (!senhaSeguraRegex.test(password)) {
        showError("A senha precisa de 6+ caracteres, 1 letra maiúscula e 1 caractere especial.");
        e.preventDefault();
        return;
      }

      // Confirmação de senha
      if (password !== confirmPassword) {
        showError("As senhas não conferem.");
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
});
