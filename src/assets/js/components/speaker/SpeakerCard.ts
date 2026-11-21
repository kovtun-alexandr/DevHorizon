import type { ConferenceData } from "../../api/fetchData.js"
import type { SpeakerWithTalks, TalkWithTrack } from "../../services/dataService.js"
import openPopup from "../Popup.js"
import createTitle from "../Title.js"
import SpeakerInfo from "./SpeakerInfo.js"

export default function createSpeakerCard(
    speaker: SpeakerWithTalks,
    data: ConferenceData,
    biography: boolean
): HTMLElement {
    const blockEl = document.createElement('article')

    blockEl.classList.add('speaker-card')
    blockEl.tabIndex = 0
    blockEl.setAttribute('role', 'button')

    const bgColor = speaker.talks[0]?.track.color || 'var(--cyan-100)'

    blockEl.append(
        new SpeakerInfo(speaker, biography, bgColor).element,
        ...createTalks(speaker.talks)
    )

    bindEvents(blockEl, speaker, data)

    return blockEl
}

function createTalks(talks: TalkWithTrack[]): HTMLHeadingElement[] {
    return talks.map(talk =>
        createTitle('h4', 'topic', talk.title)
    )
}

function bindEvents(
    element: HTMLElement,
    speaker: SpeakerWithTalks,
    data: ConferenceData
) {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPopup(speaker, data)
        }
    })

    element.addEventListener('click', () => {
        openPopup(speaker, data)
    })
}