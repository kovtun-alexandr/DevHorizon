export default function createMenuButton() {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add('menu-button')
    buttonEl.type = 'button'
    buttonEl.setAttribute('aria-label', 'Toggle navigation menu')
    buttonEl.setAttribute('aria-expanded', 'false')
    buttonEl.setAttribute('aria-controls', 'main-navigation')

    const spanEl = document.createElement('span')

    buttonEl.addEventListener('click', headerActions)

    buttonEl.append(spanEl)

    return buttonEl
}

function headerActions(e) {
    const targetElement = e.target
    if (targetElement.closest('.menu-button')) {
        document.body.classList.toggle('menu-open')
    }
}