export default function createMenuButton() {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add('menu-button')
    buttonEl.type = 'button'
    buttonEl.setAttribute('aria-label', 'Toggle navigation menu')
    buttonEl.setAttribute('aria-expanded', 'false')
    buttonEl.setAttribute('aria-controls', 'main-navigation')

    const spanEl = document.createElement('span')

    bindEvents(buttonEl)

    buttonEl.append(spanEl)

    return buttonEl
}

function bindEvents(button) {
    button.addEventListener('click', () => {
        const isOpen = button.classList.toggle('is-open')
        document.body.classList.toggle('menu-open', isOpen)
        button.setAttribute('aria-expanded', isOpen.toString())
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu(button)
            button.focus()
        }
    })

    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('menu-open')) return

        const navEl = document.getElementById('main-navigation')
        const clickedInsideNav = navEl && navEl.contains(e.target)
        const clickedOnButton = button.contains(e.target)

        if (!clickedInsideNav && !clickedOnButton) {
            closeMenu(button)
        }
    })
}

function closeMenu(button) {
    document.body.classList.remove('menu-open')
    button.classList.remove('is-open')
    button.setAttribute('aria-expanded', 'false')
}