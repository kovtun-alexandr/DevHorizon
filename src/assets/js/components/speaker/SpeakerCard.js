import createPopup from "../Popup.js"
import createTitle from "../Title.js"
import SpeakerInfo from "./SpeakerInfo.js"

export default function createSpeakerCard(speaker, data, biography) {
    const blockEl = document.createElement('article')


    blockEl.classList.add('speaker-card')
    blockEl.tabIndex = 0
    blockEl.setAttribute('role', 'button')


    const bgColor = speaker.talks[0].track.color

    bgColor
        ? blockEl.append(
            new SpeakerInfo(speaker, biography, bgColor).element
        )
        : blockEl.append(
            new SpeakerInfo(speaker, biography).element
        )

    speaker.talks.forEach(talk => {
        blockEl.append(
            createTitle('h4', 'topic', talk.title)
        )
    })

    blockEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            createPopup(speaker, data)
        }
    })

    blockEl.addEventListener('click', () => {
        createPopup(speaker, data)
    })

    return blockEl
}