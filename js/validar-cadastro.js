document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("password-strength");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const matchError = document.getElementById("password-match-error");

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

  form.addEventListener("submit", function (e) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validação básica
    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      e.preventDefault();
      return;
    }

    // Verifica e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      e.preventDefault();
      return;
    }

    // Verifica senha: min 6 caracteres, 1 maiúscula, 1 caractere especial
    const senhaSeguraRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    if (!senhaSeguraRegex.test(password)) {
      alert("A senha deve ter no mínimo 6 caracteres, conter ao menos uma letra maiúscula e um caractere especial.");
      e.preventDefault();
      return;
    }

    // Verifica se as senhas conferem
    if (password !== confirmPassword) {
      alert("As senhas não conferem.");
      e.preventDefault();
      return;
    }
  });

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

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
      
      // Função que verifica se as senhas digitadas são iguais  
      function checkPasswordMatch() {
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

      passwordInput.addEventListener("input", checkPasswordMatch);
      confirmPasswordInput.addEventListener("input", checkPasswordMatch);
    });
  });
});
