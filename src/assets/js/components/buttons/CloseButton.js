export default function createCloseButton(onClickAction) {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add('popup-close')
    buttonEl.type = 'button'
    buttonEl.setAttribute('aria-label', 'Close popup window')

    if (onClickAction) {
        buttonEl.addEventListener('click', onClickAction)
    }

    return buttonEl
}