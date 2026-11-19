import createLink from "../Link.js";
import type { Track } from "../../api/fetchData.js";
import { GENERAL_TRACK_ID } from '../../config/tracks.js';

export default function createTrackNavList(tracks: Track[]): HTMLDivElement {
    const blockEl = document.createElement('div')

    blockEl.classList.add('track-nav')

    tracks.filter(track => track.id !== GENERAL_TRACK_ID)
        .forEach(track => {
            const trackLink = createLink(
                track.name,
                `./schedule.html?track=${track.id}`
            )
            blockEl.append(trackLink)
        });

    return blockEl;
}