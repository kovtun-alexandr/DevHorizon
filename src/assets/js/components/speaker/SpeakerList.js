import { getFullSpeakerDetails } from "../../services/dataService.js";
import createSpeakerCard from "./SpeakerCard";

export default function createSpeakerList(speackers, data, biography) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('speaker-list')

    speackers.forEach(speacker => {
        const fullSpeakerDatail = getFullSpeakerDetails(speacker.id, data)
        blockEl.append(createSpeakerCard(fullSpeakerDatail, data, biography))
    });

    return blockEl
}