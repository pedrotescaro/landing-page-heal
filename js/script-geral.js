// Aumenta e diminui o tamanho da fonte
const increaseFontButton = document.querySelector('.js-increase-font-size');
const decreaseFontButton = document.querySelector('.js-decrease-font-size');
const body = document.querySelector('body');
let fontSize = 16;

increaseFontButton.addEventListener('click', increaseFontSize);
decreaseFontButton.addEventListener('click', decreaseFontSize);

function increaseFontSize() {
    if (fontSize < 24) {
        fontSize += 2;
        document.body.style.fontSize = fontSize + 'px';
    }
}

function decreaseFontSize(  ) {
    if (fontSize > 10) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
    }
}