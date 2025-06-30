document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.createElement('span');
    loader.id = 'foto-loader';
    loader.textContent = 'Carregando foto...';
    loader.style.display = 'none';
    loader.style.marginLeft = '10px';
    loader.style.color = '#2563eb';
    loader.style.fontWeight = 'bold';
    
    // Adiciona o loader ao lado do botão de avançar
    if (nextBtn && nextBtn.parentNode) {
        nextBtn.parentNode.insertBefore(loader, nextBtn.nextSibling);
    }

    document.getElementById('abrir-camera').addEventListener('click', function() {
        document.getElementById('foto_ferida').click();
    });

    document.getElementById('foto_ferida').addEventListener('change', function(event) {
        const img = document.getElementById('photo-preview-img');
        const text = document.getElementById('photo-preview-text');
        const removerBtn = document.getElementById('remover-foto');
        if (event.target.files && event.target.files[0]) {
            // Desabilita botões e mostra loader
            if (nextBtn) nextBtn.disabled = true;
            if (submitBtn) submitBtn.disabled = true;
            loader.style.display = 'inline-block';

            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                img.style.display = 'block';
                text.style.display = 'block';
                removerBtn.style.display = 'inline-block';
                // Habilita botões e esconde loader
                if (nextBtn) nextBtn.disabled = false;
                if (submitBtn) submitBtn.disabled = false;
                loader.style.display = 'none';
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            img.style.display = 'none';
            text.style.display = 'none';
            removerBtn.style.display = 'none';
            // Habilita botões e esconde loader
            if (nextBtn) nextBtn.disabled = false;
            if (submitBtn) submitBtn.disabled = false;
            loader.style.display = 'none';
        }
        event.target.value = '';
    });

    document.getElementById('remover-foto').addEventListener('click', function() {
        const fileInput = document.getElementById('foto_ferida');
        const img = document.getElementById('photo-preview-img');
        const text = document.getElementById('photo-preview-text');
        fileInput.value = '';
        img.src = '';
        img.style.display = 'none';
        text.style.display = 'none';
        this.style.display = 'none';
        // Habilita botões e esconde loader
        if (nextBtn) nextBtn.disabled = false;
        if (submitBtn) submitBtn.disabled = false;
        loader.style.display = 'none';
    });
});

            