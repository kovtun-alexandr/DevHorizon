interface TrackCardOptions {
    text: string;
    className: string;
    link: string;
    description: string;
    color: string;
}

export default function createTrackCard(options: TrackCardOptions): HTMLAnchorElement {
    const linkEl = document.createElement('a')

    linkEl.classList.add(options.className)
    linkEl.href = options.link

    const spanEl = document.createElement('span')
    const textEl = document.createElement('p')

    spanEl.textContent = options.text.toLowerCase()
    spanEl.style.color = options.color
    textEl.textContent = options.description

    linkEl.append(
        spanEl,
        textEl
    )

    return linkEl
}