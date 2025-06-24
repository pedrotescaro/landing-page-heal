
document.addEventListener('DOMContentLoaded', function () {
    const culturaSelect = document.getElementById('cultura_realizada');
    const resultadoGroup = document.getElementById('resultado_cultura_group');
    const resultadoInput = document.getElementById('resultado_cultura');
    function toggleResultadoCultura() {
        if (culturaSelect.value === '1') {
            resultadoGroup.style.display = 'block';
        } else {
            resultadoGroup.style.display = 'none';
            resultadoInput.value = '';
        }
    }
    culturaSelect.addEventListener('change', toggleResultadoCultura);
    toggleResultadoCultura();
});
