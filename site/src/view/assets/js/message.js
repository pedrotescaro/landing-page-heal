const steps = Array.from(document.querySelectorAll(".step"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progress-bar");
const stepCounter = document.getElementById("step-counter");

function showMessage(message, type) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box", type);
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.style.opacity = 1;
  }, 10);

  setTimeout(() => {
    messageBox.style.opacity = 0;
    messageBox.addEventListener("transitionend", () => messageBox.remove());
  }, 3000);
}
document
  .querySelectorAll(
    ".step input[required], .step select[required], .step textarea[required]"
  )
  .forEach((field) => {
    field.setAttribute("data-original-required", "true");
  });


  function updateProgressBar() {
  const progress = (currentStep / (steps.length - 1)) * 100;
  progressBar.style.width = `${progress}%`;
  stepCounter.textContent = `Passo ${currentStep + 1} de ${steps.length}`;

  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
  nextBtn.style.display =
    currentStep === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display =
    currentStep === steps.length - 1 ? "inline-block" : "none";

  const finalizationContainer = document.getElementById(
    "finalizacao-container"
  );
  if (currentStep === steps.length - 1) {
    finalizationContainer.style.display = "block";
    loadAnamnesesForList(); // Carrega a lista do BD ao ir para a última etapa
    loadPatientsForSelect(); // Carrega pacientes do BD para o select
  } else {
    finalizationContainer.style.display = "none";
  }
}

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
  currentStep = stepIndex;
  updateProgressBar();
}

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
});


nextBtn.addEventListener("click", () => {
  const currentActiveStep = steps[currentStep];
  const requiredInputs = currentActiveStep.querySelectorAll("[required]");
  let allInputsValid = true;

  requiredInputs.forEach((input) => {
    if (input.type === "file") {
      // Para arquivos, verifica se um arquivo foi selecionado OU se já existe uma URL de arquivo
      if (!input.files.length > 0 && !input.dataset.currentUrl) {
        input.style.borderColor = "red";
        allInputsValid = false;
      } else {
        input.style.borderColor = "";
      }
    } else if (!input.value.trim()) {
      input.style.borderColor = "red";
      allInputsValid = false;
    } else {
      input.style.borderColor = "";
    }
  });

  if (!allInputsValid) {
    showMessage(
      "Por favor, preencha todos os campos obrigatórios para avançar.",
      "error"
    );
    return;
  }

  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
});