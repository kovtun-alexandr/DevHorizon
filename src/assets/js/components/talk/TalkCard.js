import createButton from "../buttons/Button.js"
import createFavoriteButton from "../buttons/FavoriteButton.js"
import createTitle from "../Title.js"

export default function createTalkCard(talk, showMore = null, favorite = null) {
    const blockEl = document.createElement('article')

    blockEl.classList.add('talk')
    blockEl.style.border = `1px solid ${talk.track.color}`

    blockEl.append(
        createTalkLabel(talk.track),
        createTalkBody(talk, showMore),
        createTalkTime(talk, favorite)
    )

    return blockEl
}

function createTalkLabel(track) {
    const blockEl = document.createElement('div')
    const textEl = document.createElement('p')

    blockEl.classList.add('label')

    textEl.textContent = track.name.toUpperCase()
    textEl.style.color = track.color

    blockEl.append(textEl)

    return blockEl
}

function createTalkBody(talk, showMore) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('talk-body')
    blockEl.style.backgroundColor = talk.track.color

    const elements = [
        createTitle('h3', 'topic', talk.title),
        createTalkSpeaker(talk.speaker)
    ]

    if (showMore) {
        elements.push(createTalkDetailsWrap(talk));
    }

    blockEl.append(...elements)

    return blockEl
}

function createTalkSpeaker(speaker) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('speaker')

    blockEl.append(
        createSpeakerName(speaker.name),
        createSpeakerCompany(speaker.company)
    )

    return blockEl
}

function createSpeakerName(name) {
    const spanEl = document.createElement('span')

    spanEl.textContent = `${name} // `

    return spanEl
}

function createSpeakerCompany(company) {
    const spanEl = document.createElement('span')

    spanEl.textContent = company

    return spanEl
}

function createTalkDetailsWrap(talk) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('wrap-details')

    const toggleBtn = createButton('Show details', 'show-details')

    toggleBtn.addEventListener('click', () => {
        const isOpened = blockEl.classList.toggle('isActive')

        toggleBtn.classList.toggle('isActive', isOpened)

        toggleBtn.textContent = isOpened ? 'Hide details' : 'Show details'
    })

    blockEl.append(
        createTalkDetails(talk),
        toggleBtn
    )

    return blockEl
}




function createTalkDetails(talk) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('talk-details')

    const innerBlockEl = document.createElement('div')

    innerBlockEl.classList.add('details-inner')

    innerBlockEl.append(
        createTalkDescription(talk.description),
        createTalkLocation(talk.location)
    )

    blockEl.append(
        innerBlockEl
    )

    return blockEl
}

function createTalkDescription(text) {
    const textEl = document.createElement('p')

    textEl.textContent = text

    return textEl
}

function createTalkLocation(text) {
    const textEl = document.createElement('p')

    textEl.textContent = `Location: ${text}`

    return textEl
}

function createTalkTime(talk, favorite) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('talk-time')
    blockEl.style.backgroundColor = talk.track.color

    blockEl.append(
        createTalkStartToEndTime(talk.startTime, talk.endTime),
        createTalkBarcode('/images/pattern-barcode.svg'),
        favorite
            ? createFavoriteButton(talk.id)
            : createTalkDay(talk.day)
    )

    return blockEl
}

function createTalkStartToEndTime(...times) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('start-end')

    times.forEach(time => {
        const spanEl = document.createElement('span')
        spanEl.textContent = time
        blockEl.append(spanEl)
    })

    return blockEl
}

function createTalkBarcode(url) {
    const imgEl = document.createElement('img')

    imgEl.classList.add('barcode')

    const basePath = import.meta.env.BASE_URL

    imgEl.src = `${basePath}${url}`
    imgEl.alt = 'Barcode'

    return imgEl
}

function createTalkDay(text) {
    const textEl = document.createElement('p')

    textEl.classList.add('day')

    textEl.textContent = `Day ${text}`

    return textEl
}