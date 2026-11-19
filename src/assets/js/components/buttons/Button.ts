export default function createButton(
    text: string,
    className: string,
    attributeName?: string,
    attributeValue?: string
): HTMLButtonElement {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add(className)
    buttonEl.type = 'button'
    buttonEl.textContent = text

    if (attributeName && attributeValue) {
        buttonEl.setAttribute(attributeName, attributeValue)
    }

    return buttonEl
}