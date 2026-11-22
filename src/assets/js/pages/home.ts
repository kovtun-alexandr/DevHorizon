import type { ConferenceData } from "../api/fetchData.js"
import createSection from "../components/Section.js"
import createTitle from "../components/Title.js"
import createConference from "../components/Conference.js"
import createKeynote from "../components/Keynote.js"
import createLink from "../components/Link.js"
import createTrackList from "../components/track/TrackList.js"
import createSpeakerList from "../components/speaker/SpeakerList.js"
import createTalkList from "../components/talk/TalkList.js"

export default function initHome(data: ConferenceData): HTMLElement {
    const mainEl = document.createElement('main')

    mainEl.classList.add('main-home', 'container')

    const filteredTalks = data.talks.filter(talk => talk.highlighted)
    const filteredSpeakers = data.speakers.filter(speaker => speaker.featured)

    mainEl.append(
        createSection(
            'hero',
            createConference(data.conference),
            createKeynote(data)
        ),
        createSection(
            'tracks',
            createTitle('h2', 'tracks-title', 'tracks'),
            createTrackList(data.tracks)
        ),
        createSection(
            'speakers',
            createTitle('h2', 'speakers-title', 'Featured_speakers'),
            createSpeakerList(filteredSpeakers, data, false),
            createLink('View all speakers', './speakers.html', 'view-all-link')
        ),
        createSection(
            'schedule',
            createTitle('h2', 'schedule-title', 'Schedule_highlights'),
            createTalkList(filteredTalks, data, true, false),
            createLink('View full schedule', './schedule.html', 'view-all-link')
        )
    )

    return mainEl
}