document.getElementById("recoverForm").addEventListener("submit", function (e) {
  const email = document.getElementById("email").value.trim();
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailError.textContent = "";
  emailError.classList.add("hidden");

  if (!emailRegex.test(email)) {
    e.preventDefault();
    emailError.textContent = "Digite um e-mail válido.";
    emailError.classList.remove("hidden");
  }
}); 