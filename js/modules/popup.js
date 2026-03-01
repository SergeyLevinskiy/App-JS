const POPUP_OPENED_CLASSNAME = 'popup__change-limit-open';
const BODY_FIXED_CLASSNAME = 'body-fixed';

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.popup');
const btnOpenNode = document.querySelector('.expense-info__limit-img-change');
const popupContentNode = document.querySelector('.popup__content')
const btnCloseNode = document.querySelector('.popup__close-btn');

btnOpenNode.addEventListener('click', togglePopup);
btnCloseNode.addEventListener('click', togglePopup);

popupNode.addEventListener('click', (event) => {
    const isClickOutsideContent = !event.composedPath().includes(popupContentNode)

    if (isClickOutsideContent) {
        togglePopup();
    }
})

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}
