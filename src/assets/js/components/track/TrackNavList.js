import createLink from "../Link.js";

export default function createTrackNavList(tracks) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('track-nav')

    const visibleTracks = tracks.filter(track => track.id !== 'tr_0')

    visibleTracks.forEach(track => {
        const trackLink = createLink(
            track.name,
            false,
            `./schedule.html?track=${track.id}`
        )
        blockEl.append(trackLink)
    });

    return blockEl;
}