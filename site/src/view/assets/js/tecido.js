
document.addEventListener('DOMContentLoaded', function () {
    const tecidoIds = [
        'percentual_granulacao_leito',
        'percentual_epitelizacao_leito',
        'percentual_esfacelo_leito',
        'percentual_necrose_seca_leito'
    ];
    const progressBar = document.getElementById('tecido-progress-bar');
    const progressSegments = Array.from(progressBar.children);
    const tecidoInputs = tecidoIds.map(id => document.getElementById(id));
    const infoMessage = document.querySelector('.tecido-leito-wrapper .info-message');

    function updateProgressBar() {
        let total = 0;
        const values = tecidoInputs.map(input => parseInt(input.value, 10) || 0);
        total = values.reduce((a, b) => a + b, 0);

        let normalized = [0, 0, 0, 0];
        if (total > 0) {
            normalized = values.map(v => (v / total) * 100);
        }

        progressSegments.forEach((seg, idx) => {
            seg.style.width = normalized[idx] + '%';
        });

        tecidoInputs.forEach(el => {
            const parentDiv = el.closest('.tecido-item');
            if (parentDiv) {
                if (total === 100) {
                    parentDiv.style.boxShadow = '0 0 0 2px #27ae60';
                    infoMessage.style.color = '#2563eb';
                } else {
                    parentDiv.style.boxShadow = '0 0 0 2px #e74c3c';
                    infoMessage.style.color = '#e74c3c';
                }
            }
        });

        if (total !== 100) {
            infoMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> A soma dos percentuais deve ser 100%. Soma atual: ' + total + '%';
        } else {
            infoMessage.innerHTML = '<i class="fas fa-info-circle"></i> Informe o percentual aproximado de cada tipo de tecido presente no leito da ferida. A soma deve ser 100%.';
        }
    }

    tecidoInputs.forEach((input, idx) => {
        input.addEventListener('input', function () {
            let currentValue = parseInt(this.value, 10) || 0;
            let otherTotal = tecidoInputs.reduce((sum, el, i) => i !== idx ? sum + (parseInt(el.value, 10) || 0) : sum, 0);
            if (currentValue + otherTotal > 100) {
                currentValue = 100 - otherTotal;
                this.value = currentValue;
            }
            const valSpan = document.getElementById(this.id + '_val_range');
            if (valSpan) valSpan.textContent = this.value + '%';
            if (parseInt(this.value, 10) === 100) {
                tecidoInputs.forEach((otherInput, otherIdx) => {
                    if (otherIdx !== idx) {
                        otherInput.value = 0;
                        const otherValSpan = document.getElementById(otherInput.id + '_val_range');
                        if (otherValSpan) otherValSpan.textContent = '0%';
                    }
                });
            }
            updateProgressBar();
        });
    });

    updateProgressBar();
});
