export default function createButton(
    text,
    className,
    attributeName = null,
    attributeValue = null
) {
    const buttonEl = document.createElement('button')

    buttonEl.classList.add(className)
    buttonEl.type = 'button'
    buttonEl.textContent = text

    if (attributeName && attributeValue) {
        buttonEl.setAttribute(attributeName, attributeValue)
    }

    return buttonEl
}