import createLink from "../Link.js";

export default function createTrackNavList(tracks) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('track-navs')

    const visibleTracks = tracks.filter(track => track.id !== 'tr_0')

    visibleTracks.forEach(track => {
        const trackLink = createLink(
            track.name,
            'nav-link',
            `./schedule.html?track=${track.id}`
        )
        blockEl.append(trackLink)
    });

    return blockEl;
}