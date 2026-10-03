export default function createTrackCard(
    text,
    className,
    link,
    description,
    color
) {
    const linkEl = document.createElement('a')

    linkEl.classList.add(className)
    linkEl.href = link

    const spanEl = document.createElement('span')
    const textEl = document.createElement('p')

    const lowerText = text.toLowerCase()

    spanEl.textContent = lowerText
    spanEl.style.color = color
    textEl.textContent = description

    linkEl.append(
        spanEl,
        textEl
    )

    return linkEl
}