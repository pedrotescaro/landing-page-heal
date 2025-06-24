
// Escala EVA customizada: só muda texto nos pares, mantém cores
function updateEvaLabel(val) {
    val = parseInt(val, 10);
    const evaValue = document.getElementById('eva-value');
    const evaLabel = document.getElementById('eva-label');
    const range = document.getElementById('dor_escala');
    let label = '';
    let color = '';
    let accent = '';
    switch (val) {
        case 0:
            label = 'Sem dor';
            color = '#14532d'; // verde escuro
            accent = '#14532d';
            break;
        case 2:
            label = 'Dor leve';
            color = '#22c55e'; // verde claro
            accent = '#22c55e';
            break;
        case 4:
            label = 'Moderada';
            color = '#eab308'; // amarelo
            accent = '#eab308';
            break;
        case 6:
            label = 'Severa';
            color = '#fb923c'; // laranja
            accent = '#fb923c';
            break;
        case 8:
            label = 'Dor muito severa';
            color = '#ef4444'; // vermelho
            accent = '#ef4444';
            break;
        case 10:
            label = 'Pior dor possível';
            color = '#991b1b'; // vermelho escuro
            accent = '#991b1b';
            break;
        default:
            label = '';
            // Cores intermediárias para impares
            if (val === 1) { color = '#22c55e'; accent = '#22c55e'; label = 'Dor leve'; }
            else if (val === 3) { color = '#eab308'; accent = '#eab308'; label = 'Moderada'; }
            else if (val === 5) { color = '#fb923c'; accent = '#fb923c'; label = 'Severa'; }
            else if (val === 7) { color = '#ef4444'; accent = '#ef4444'; label = 'Muito severa'; }
            else if (val === 9) { color = '#991b1b'; accent = '#991b1b'; label = 'Pior dor possível'; }
            else { color = '#14532d'; accent = '#14532d'; }
    }
    evaValue.textContent = val;
    evaValue.style.color = color;
    evaLabel.textContent = label;
    evaLabel.style.color = color;
    range.style.accentColor = accent;
}
// Inicializa ao carregar
document.addEventListener('DOMContentLoaded', function () {
    updateEvaLabel(document.getElementById('dor_escala').value);
});
