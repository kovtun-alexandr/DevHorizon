export default function createMenuButton(): HTMLButtonElement {
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

function bindEvents(button: HTMLButtonElement) {
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

        const target = e.target

        if (!(target instanceof Node)) return

        const navEl = document.getElementById('main-navigation')
        const clickedInsideNav = navEl?.contains(target) ?? false
        const clickedOnButton = button.contains(target)

        if (!clickedInsideNav && !clickedOnButton) {
            closeMenu(button)
        }
    })
}

function closeMenu(button: HTMLButtonElement) {
    document.body.classList.remove('menu-open')
    button.classList.remove('is-open')
    button.setAttribute('aria-expanded', 'false')
}