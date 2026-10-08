import createCloseButton from "./buttons/CloseButton.js"
import SpeakerInfo from "./speaker/SpeakerInfo.js"
import createTalkList from "./talk/TalkList.js"
import createTitle from "./Title.js"

export default function createPopup(speaker, data) {
    const dialogEl = document.createElement('dialog')

    dialogEl.classList.add('popup-modal')

    const closeBtn = createCloseButton(() => dialogEl.close())
    const speakerEl = new SpeakerInfo(speaker, true, speaker.talks[0].track.color).element
    const titleEl = createTitle('h3', 'modal-title', 'Talk')
    const talkEl = createTalkList(speaker.talks, data, false, true)

    dialogEl.append(closeBtn, speakerEl, titleEl, talkEl)

    dialogEl.addEventListener('click', (e) => {
        if (e.target === dialogEl) {
            dialogEl.close();
        }
    });

    dialogEl.addEventListener('close', () => {
        dialogEl.remove();
    })

    document.body.append(dialogEl)
    dialogEl.showModal()
}