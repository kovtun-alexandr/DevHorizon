import imgCross from './../../../images/icon-cross.svg';

export default function createCloseButton(onClickAction) {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add('popup-close');
    buttonEl.type = 'button'
    buttonEl.setAttribute('aria-label', 'Close popup window');

    buttonEl.append(createCloseIcon())

    if (onClickAction) {
        buttonEl.addEventListener('click', onClickAction);
    }

    return buttonEl
}

function createCloseIcon() {
    const imgEl = document.createElement('img')

    imgEl.src = imgCross;
    imgEl.alt = 'icon'

    return imgEl
}