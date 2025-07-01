
document.addEventListener('DOMContentLoaded', function () {
    const tunelSelect = document.getElementById('tunel_cavidade');
    const localizacaoGroup = document.getElementById('localizacao_tunel_cavidade_group');
    const localizacaoInput = document.getElementById('localizacao_tunel_cavidade');
    function toggleLocalizacaoTunel() {
        if (tunelSelect.value === '1') {
            localizacaoGroup.style.display = 'block';
        } else {
            localizacaoGroup.style.display = 'none';
            localizacaoInput.value = '';
        }
    }
    tunelSelect.addEventListener('change', toggleLocalizacaoTunel);
    toggleLocalizacaoTunel();
});
