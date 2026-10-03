export default function createSection(className, ...elements) {
    const sectionEl = document.createElement('section')

    sectionEl.classList.add(className)

    sectionEl.append(
        ...elements
    )

    return sectionEl
}