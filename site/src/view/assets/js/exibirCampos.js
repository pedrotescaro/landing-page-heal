
// Exibe ou oculta campos de acordo com SIM/NÃO
document.addEventListener('DOMContentLoaded', function () {
    function toggleField(selectId, inputId) {
        const select = document.getElementById(selectId);
        const input = document.getElementById(inputId);
        if (!select || !input) return;
        function update() {
            input.style.display = select.value === '1' ? 'block' : 'none';
            if (select.value !== '1') input.value = '';
        }
        select.addEventListener('change', update);
        update();
    }
    toggleField('usa_medicacao', 'qual_medicacao');
    toggleField('possui_doenca', 'qual_doenca');
    toggleField('possui_alergia', 'qual_alergia');
    toggleField('pratica_atividade_fisica', 'qual_atividade');
    toggleField('pratica_atividade_fisica', 'frequencia_atividade');
    toggleField('ingestao_alcool', 'frequencia_alcool');
    toggleField('tem_filhos', 'quantos_filhos');
    toggleField('realizou_cirurgias', 'quais_cirurgias');
});
