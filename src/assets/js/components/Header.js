import createMenuButton from "./buttons/MenuButton.js";

export function renderHeader(logo, navigation) {
    const header = document.createElement('header')

    header.classList.add('header', 'container')

    header.append(
        logo,
        navigation,
        createMenuButton()
    );

    return header
}

document.addEventListener('click', headerActions)

function headerActions(e) {
    const targetElement = e.target
    if (targetElement.closest('.menu-button')) {
        document.body.classList.toggle('menu-open')
    }
}
