import { getFullTalkDetails } from "../../services/dataService.js";
import TalkCard from "./TalkCard.js";

export default function createTalkList(
    talks,
    data,
    showMore,
    favorite
) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('talk-list')

    if (!talks || talks.length === 0) {
        const emptyEl = document.createElement('p')
        emptyEl.classList.add('empty-message')
        emptyEl.textContent = 'No talks found matching the selected filters.'
        blockEl.append(emptyEl)
        return blockEl
    }

    talks.forEach(talk => {
        const fullTalk = getFullTalkDetails(talk.id, data)
        blockEl.append(
            new TalkCard(fullTalk, showMore, favorite).element
        )
    });

    return blockEl
}