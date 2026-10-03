import createTitle from "../Title.js";


export default function createSpeakerInfo(
    speaker,
    biography = null,
    bgColor = null
) {
    const fragmentEl = document.createDocumentFragment()

    const elements = [
        createSpeakerAvatar(speaker.avatar, speaker.name, bgColor),
        createrSpicerBodyWrap(
            createTitle('h3', 'name', speaker.name),
            createSpeakerRoleAndCompany(speaker.role, speaker.company),
        ),
        biography ? createSpeakerBiography(speaker.bio) : null
    ];

    fragmentEl.append(...elements.filter(Boolean))

    return fragmentEl
}

function createSpeakerAvatar(url, altText, bgColor) {
    const blokEl = document.createElement('div')
    const imgEl = document.createElement('img')

    blokEl.classList.add('avatar')

    imgEl.src = url
    imgEl.alt = altText

    if (bgColor) {
        blokEl.style.backgroundColor = bgColor
    }

    blokEl.append(imgEl)

    return blokEl
}

function createrSpicerBodyWrap(...elements) {
    const blokEl = document.createElement('div')

    blokEl.classList.add('body-wrap')

    blokEl.append(...elements)

    return blokEl
}

function createSpeakerRoleAndCompany(role, company) {
    const textEl = document.createElement('p')

    textEl.classList.add('role')
    textEl.textContent = `${role} @${company}`

    return textEl
}

function createSpeakerBiography(text) {
    const textEl = document.createElement('p')

    textEl.classList.add('biography')
    textEl.textContent = text

    return textEl
}