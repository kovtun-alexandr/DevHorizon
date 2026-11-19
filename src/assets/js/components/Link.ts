export default function createLink(
    text: string,
    link: string,
    className: string | null = null
): HTMLAnchorElement {
    const linkEl = document.createElement('a')

    linkEl.textContent = text
    linkEl.href = link

    if (className) {
        linkEl.classList.add(className)
    }

    return linkEl
}