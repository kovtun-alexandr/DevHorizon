import createTrackCard from "./TrackCard.js";
import { GENERAL_TRACK_ID } from '../../config/tracks.js';

export default function createTrackList(tracks) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('track-cards')

    const visibleTracks = tracks.filter(track => track.id !== GENERAL_TRACK_ID)

    visibleTracks.forEach(track => {
        const trackCard = createTrackCard(
            track.name,
            'card-link',
            `./schedule.html?track=${track.id}`,
            track.description,
            track?.color
        )

        blockEl.append(trackCard)
    });

    return blockEl
}