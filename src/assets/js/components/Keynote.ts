import type { ConferenceData, Talk } from "../api/fetchData.js"
import type { TalkWithDetails } from "../services/dataService.js"
import { getFullSpeakerDetails, getFullTalkDetails } from "../services/dataService.js"
import { formatDate } from "../utils/date.js"
import createButton from "./buttons/Button.js"
import openPopup from "./Popup.js"
import SpeakerInfo from "./speaker/SpeakerInfo.js"
import createTitle from "./Title.js"

export default function createKeynote(data: ConferenceData): HTMLDivElement {
    const blockEl = document.createElement('div')

    blockEl.classList.add('keynote')

    const keynoteTalks = data.talks.filter(talk => talk.id === "tk_0")

    keynoteTalks.forEach(talk => {
        const fullTalk = getFullTalkDetails(talk.id, data);
        const startTalkDate = data.conference.startDate

        blockEl.append(
            createTitle('h2', 'keynote-title', `Featured ${fullTalk.track.name}`),
            new SpeakerInfo(fullTalk.speaker).element,
            createKeynoteTalkInfo(fullTalk, startTalkDate, data)
        )
    })

    return blockEl
}

function createKeynoteTalkInfo(
    talk: TalkWithDetails,
    date: string,
    data: ConferenceData
): DocumentFragment {
    const fragment = document.createDocumentFragment()
    const buttonEl = createButton('View Talk', 'view-more', 'data-talkId', talk.id)

    const fullSpeakerDetail = getFullSpeakerDetails(talk.speaker.id, data)

    fragment.append(
        createTitle('h4', 'topic', talk.title),
        createKeynoteTalkMeetingTime(talk, date),
        buttonEl
    )

    buttonEl.addEventListener('click', () => {
        openPopup(fullSpeakerDetail, data)
    })

    return fragment
}

function createKeynoteTalkMeetingTime(
    talk: Talk,
    date: string
): HTMLParagraphElement {
    const textEl = document.createElement('p')

    textEl.classList.add('meeting')

    const { shortMonth, day } = formatDate(date)

    textEl.textContent = `${shortMonth} ${day} / ${talk.startTime} / ${talk.location}`

    return textEl
}