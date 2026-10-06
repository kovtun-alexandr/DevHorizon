export default function createLink(
    text,
    className = null,
    link
) {
    const linkEl = document.createElement('a')

    if (className) {
        linkEl.classList.add(className)
    }

    linkEl.href = link
    linkEl.textContent = text

    return linkEl
}