const resylt = document.querySelector('.resylt');
const buttonPlus = document.querySelector('.counter__button-plus');
const buttonReset = document.querySelector('.counter__button-reset');

const opened_className = 'open';
let counter = 0;

inner()

function inner() {
    buttonPlus.addEventListener('click', function () {
        counter += 1;
        resylt.innerHTML = counter;
        addClassOpen(buttonReset);
    })
    buttonReset.addEventListener('click', function () {
        this.classList.remove('open');
        counter = 0;
        resylt.innerHTML = counter;
    })
}

function addClassOpen(name) {
    if (name.classList.contains(opened_className)) {
    } else {
        name.classList.add(opened_className);
    };
}