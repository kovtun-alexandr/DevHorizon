import { getFullSpeakerDetails } from "../../services/dataService.js";
import createSpeakerCard from "./SpeakerCard.js";

export default function createSpeakerList(speakers, data, biography) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('speaker-list')

    speakers.forEach(speaker => {
        const fullSpeakerDetail = getFullSpeakerDetails(speaker.id, data)
        blockEl.append(createSpeakerCard(fullSpeakerDetail, data, biography))
    });

    return blockEl
}