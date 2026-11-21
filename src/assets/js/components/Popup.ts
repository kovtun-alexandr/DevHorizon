import type { ConferenceData } from "../api/fetchData.js"
import type { SpeakerWithTalks } from "../services/dataService.js"
import createCloseButton from "./buttons/CloseButton.js"
import SpeakerInfo from "./speaker/SpeakerInfo.js"
import createTalkList from "./talk/TalkList.js"
import createTitle from "./Title.js"

export default function openPopup(
    speaker: SpeakerWithTalks,
    data: ConferenceData
): void {
    const dialogEl = document.createElement('dialog')

    dialogEl.classList.add('popup-modal')

    const closeBtn = createCloseButton(() => dialogEl.close())

    const speakerEl = new SpeakerInfo(
        speaker,
        true,
        speaker.talks[0].track.color || 'var(--cyan-100)'
    ).element

    const titleEl = createTitle(
        'h3',
        'modal-title',
        'Talk'
    )

    const talkEl = createTalkList(
        speaker.talks,
        data,
        false,
        true
    )

    dialogEl.append(
        closeBtn,
        speakerEl,
        titleEl,
        talkEl
    )

    bindEvents(dialogEl)

    document.body.append(dialogEl)
    document.body.classList.add('modal-open')
    dialogEl.showModal()
}

function bindEvents(element: HTMLDialogElement) {
    element.addEventListener('click', (e) => {
        if (e.target === element) {
            element.close();
        }
    });

    element.addEventListener('close', () => {
        document.body.classList.remove('modal-open');
        element.remove();
    })
}