export default function createSection(
    className: string,
    ...elements: Node[]
): HTMLElement {
    const sectionEl = document.createElement('section')

    sectionEl.classList.add(className)

    sectionEl.append(
        ...elements
    )

    return sectionEl
}