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