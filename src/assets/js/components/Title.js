const ALLOWED_TITLE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export default function createTitle(tagName, className, text) {
    if (!ALLOWED_TITLE_TAGS.some(t => t === tagName)) {
        throw new TypeError(
            `${tagName} does not match desired tagname: ${ALLOWED_TITLE_TAGS.toString()}`
        )
    }

    const titleEl = document.createElement(tagName)

    titleEl.classList.add(className)
    titleEl.textContent = text

    return titleEl
}