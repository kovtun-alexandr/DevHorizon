export default function createTitle(el, className, text) {
    const titleEl = document.createElement(el)

    titleEl.classList.add(className)
    titleEl.textContent = text

    return titleEl
}