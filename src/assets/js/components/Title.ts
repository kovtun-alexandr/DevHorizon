const ALLOWED_TITLE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

export type TitleTag = typeof ALLOWED_TITLE_TAGS[number]

export default function createTitle(
    tagName: TitleTag, 
    className: string, 
    text: string
): HTMLHeadingElement {
    const titleEl = document.createElement(tagName)

    titleEl.classList.add(className)
    titleEl.textContent = text

    return titleEl
}