document.addEventListener('DOMContentLoaded', () => {
    const createAnamneseForm = document.getElementById('anamnese-form');

    // Função para lidar com a criação de uma nova anamnese
    createAnamneseForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(createAnamneseForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/site/public/index.php/api/anamnese', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Anamnese salva com sucesso!', result);
            alert('Anamnese salva com sucesso!');
            createAnamneseForm.reset();
        } catch (error) {
            console.error('Erro ao salvar anamnese:', error);
            alert('Erro ao salvar anamnese.');
        }
    });
});