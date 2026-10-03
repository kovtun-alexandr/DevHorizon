import { getFullSpeakerDetails, getFullTalkDetails } from "../services/dataService.js"
import { formatDate } from "../utils/date.js"
import createButton from "./buttons/Button.js"
import createPopup from "./Popup.js"
import createSpeakerInfo from "./speaker/SpeakerInfo.js"
import createTitle from "./Title"

export default function createKeynote(data) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('keynote')

    const keynoteTalks = data.talks.filter(talk => talk.id === "tk_0")

    keynoteTalks.forEach(talk => {
        const fullTalk = getFullTalkDetails(talk.id, data);
        const startTalkDate = data.conference.startDate

        blockEl.append(
            createTitle('h2', 'keynote-title', `Featured ${fullTalk.track.name}`),
            createSpeakerInfo(fullTalk.speaker),
            createKeynoteTalkInfo(fullTalk, startTalkDate, data)
        )
    })

    return blockEl
}

function createKeynoteTalkInfo(talk, date, data) {
    const fragment = document.createDocumentFragment()
    const buttonEl = createButton('View Talk', 'view-more', 'data-talkId', talk.id)

    const fullSpeakerDatail = getFullSpeakerDetails(talk.speaker.id, data)

    fragment.append(
        createTitle('h4', 'topic-talk', talk.title),
        createKeynoteTalkMeetingTime(talk, date),
        buttonEl
    )

    buttonEl.addEventListener('click', () => {
        createPopup(fullSpeakerDatail, data)
    })

    return fragment
}

function createKeynoteTalkMeetingTime(talk, data) {
    const textEl = document.createElement('p')

    textEl.classList.add('meeting-time')

    const { shortMonth, day } = formatDate(data)

    textEl.textContent = `${shortMonth} ${day} / ${talk.startTime} / ${talk.location}`

    return textEl
}