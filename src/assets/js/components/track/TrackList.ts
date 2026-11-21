import type { Track } from "../../api/fetchData.js";
import createTrackCard from "./TrackCard.js";
import { GENERAL_TRACK_ID } from '../../config/tracks.js';

export default function createTrackList(tracks: Track[]): HTMLDivElement {
    const blockEl = document.createElement('div')

    blockEl.classList.add('track-cards')

    tracks.filter(track => track.id !== GENERAL_TRACK_ID)
        .forEach(track => {
            blockEl.append(
                createTrackCard({
                    text: track.name,
                    className: 'card-link',
                    link: `./schedule.html?track=${track.id}`,
                    description: track.description,
                    color: track.color
                })
            )
        })

    return blockEl
}