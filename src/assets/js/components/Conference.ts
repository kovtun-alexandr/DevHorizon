import { formatDate } from "../utils/date.js"
import type { Conference, ConferenceLocation } from "../api/fetchData.js"
import createTitle from "./Title.js"

export default function createConference(data: Conference): HTMLElement {
    const blockEl = document.createElement('div')

    blockEl.classList.add('conference')

    blockEl.append(
        createTitle('h1', 'title', data.tagline),
        createConferenceDetails(data)
    )

    return blockEl
}

function createConferenceDetails(data: Conference): HTMLElement {
    const blockEl = document.createElement('div')

    blockEl.classList.add('details')

    blockEl.append(
        createConferenceDate(data),
        createConferenceLocation(data.location)
    )

    return blockEl
}

function createConferenceDate(data: Conference): HTMLSpanElement {
    const spanEl = document.createElement('span')

    const { year, shortMonth, day: startDay } = formatDate(data.startDate)
    const { day: endDay } = formatDate(data.endDate)

    spanEl.textContent = `${shortMonth} ${startDay}-${endDay}, ${year}`

    return spanEl
}

function createConferenceLocation(location: ConferenceLocation): HTMLSpanElement {
    const spanEl = document.createElement('span')

    spanEl.textContent = `${location.venue}, ${location.cityAbbreviation}`

    return spanEl
}