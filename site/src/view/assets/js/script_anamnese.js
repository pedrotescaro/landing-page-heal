document.addEventListener('DOMContentLoaded', () => {
    const createAnamneseForm = document.getElementById('anamnese-form');
    const listaAnamneses = document.getElementById('anamneses-list-ul');

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
            const novaAnamnese = result.data;
            
            // Inserir nova anamnese na lista
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${novaAnamnese.nome_cliente}</strong> - 
                Data: ${novaAnamnese.data_nascimento} - 
                Email: ${novaAnamnese.email}
            `;
            listaAnamneses.appendChild(li);
            
            alert('Anamnese salva com sucesso!');
            createAnamneseForm.reset();
        } catch (error) {
            console.error('Erro ao salvar anamnese:', error);
            alert('Erro ao salvar anamnese.');
        }
    });
});