import createMenuButton from "./buttons/MenuButton.js";

export function renderHeader(logo: HTMLDivElement, navigation: HTMLElement): HTMLElement {
    const header = document.createElement('header')

    header.classList.add('header', 'container')

    header.append(
        logo,
        createMenuButton(),
        navigation
    );

    return header
}