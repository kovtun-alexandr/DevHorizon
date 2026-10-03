import createSection from "../components/Section.js"
import createSpeakerList from "../components/speaker/SpeakerList.js"
import createTitle from "../components/Title.js"

export default function initSpeakers(data) {
    const mainEl = document.createElement('main')

    mainEl.classList.add('main-speakers', 'container')

    mainEl.append(
        createSection(
            'speakers',
            createTitle('h2', 'speakers-title', 'Speakers'),
            createSpeakerList(data.speakers, data, false)
        )
    )

    return mainEl
}