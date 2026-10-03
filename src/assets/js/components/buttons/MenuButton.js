export default function createMenuButton() {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add('menu-button')
    buttonEl.type = 'button'
    buttonEl.setAttribute('aria-label', 'Toggle navigation menu')
    buttonEl.setAttribute('aria-expanded', 'false')
    buttonEl.setAttribute('aria-controls', 'main-navigation')

    const spanEl = document.createElement('span')

    buttonEl.append(spanEl)

    return buttonEl
}