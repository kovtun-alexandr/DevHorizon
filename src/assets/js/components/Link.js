export default function createLink(
    text,
    className,
    link
) {
    const linkEl = document.createElement('a')

    linkEl.classList.add(className)
    linkEl.href = link
    linkEl.textContent = text

    return linkEl
}