// Controle do Modal
const downloadModal = document.getElementById('downloadModal');
const closeModal = document.getElementById('closeModal');

// Abrir modal
document.querySelectorAll('[data-modal-trigger]').forEach(button => {
    button.addEventListener('click', () => {
        downloadModal.classList.remove('hidden');
    });
});

// Fechar modal
closeModal.addEventListener('click', () => {
    downloadModal.classList.add('hidden');
});

// Fechar ao clicar fora
downloadModal.addEventListener('click', (e) => {
    if(e.target === downloadModal) {
        downloadModal.classList.add('hidden');
    }
});