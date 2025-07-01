document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resetPasswordForm");
  const passwordInput = document.getElementById("newPassword");
  const confirmInput = document.getElementById("confirmPassword");
  const feedback = document.getElementById("passwordFeedback");

  // Alternar ícone/visibilidade da senha
  document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
      const targetId = icon.dataset.target;
      const input = document.getElementById(targetId);

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    });
  });

  // Validação antes do envio
  form.addEventListener("submit", function (e) {
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    if (!regex.test(password)) {
      feedback.textContent = "A senha deve ter no mínimo 6 caracteres, uma letra maiúscula e um caractere especial.";
      e.preventDefault();
      return;
    }

    if (password !== confirm) {
      feedback.textContent = "As senhas não coincidem.";
      e.preventDefault();
      return;
    }

    feedback.textContent = "";
  });
});
