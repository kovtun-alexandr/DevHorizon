import createFilter from "../components/Filter.js"
import createSection from "../components/Section.js"
import createTalkList from "../components/talk/TalkList.js"
import createTitle from "../components/Title.js"
import { getFavorites } from "../utils/storage.js"

export default function initSchedule(data) {
    const mainEl = document.createElement('main')

    mainEl.classList.add('main-schedule', 'container')

    const sectionEl = createSection(
        'schedule',
        createTitle('h2', 'schedule-title', 'Schedule'),
    )

    const talks = data.talks

    const urlParams = new URLSearchParams(window.location.search)

    const trackParam = urlParams.get('track')
    const initialTracks = trackParam ? trackParam.split(',').filter(Boolean) : []

    const dayParam = urlParams.get('day')
    const initialDays = dayParam ? dayParam.split(',').map(Number).filter(Boolean) : []

    const favoritesParam = urlParams.get('favorites')
    const parsedFavorites = favoritesParam ? favoritesParam.split(',').filter(Boolean) : null
    const initialFavorites = (parsedFavorites && parsedFavorites.length > 0) ? parsedFavorites : null

    const activeFilters = {
        days: initialDays,
        trackIds: initialTracks,
        mySchedule: initialFavorites
    }

    function syncFiltersToURL(filters) {
        const params = new URLSearchParams()

        if (filters.mySchedule !== null && filters.mySchedule.length > 0) {
            params.set('favorites', [...filters.mySchedule].sort().join(','))
        } else {
            if (filters.days.length > 0) {
                params.set('day', [...filters.days].sort((a, b) => a - b).join(','))
            }
            if (filters.trackIds.length > 0) {
                params.set('track', [...filters.trackIds].sort().join(','))
            }
        }

        const queryString = params.toString()
        const newUrl = queryString
            ? `${window.location.pathname}?${queryString}`
            : window.location.pathname

        window.history.replaceState({}, document.title, newUrl)
    }

    const handleFilterChange = (filterActions) => {
        updateFiltersState(activeFilters, filterActions)

        syncFiltersToURL(activeFilters)

        const updatedTalks = getFilteredTalksArray(talks, activeFilters)

        const oldTalkList = sectionEl.querySelector('.talk-list')

        if (oldTalkList) {
            oldTalkList.remove()
        }

        const newTalkList = createTalkList(updatedTalks, data, true, true)

        sectionEl.append(newTalkList)

        return activeFilters
    }

    const filterComponent = createFilter(
        data,
        handleFilterChange,
        activeFilters
    )

    sectionEl.append(
        filterComponent,
        createTalkList(getFilteredTalksArray(talks, activeFilters), data, true, true)
    )

    mainEl.append(
        sectionEl
    )

    return mainEl
}

function updateFiltersState(filters, action) {
    if (action.type === 'clear-all') {
        filters.days = []
        filters.trackIds = []
        filters.mySchedule = null
        return
    }

    if (action.type === 'update-favorites') {
        filters.mySchedule = action.value
        return
    }

    if (action.type === 'my-schedule') {
        if (filters.mySchedule !== null) {
            filters.mySchedule = null
        } else {
            filters.mySchedule = action.value
            filters.days = []
            filters.trackIds = []
        }
        return
    }

    filters.mySchedule = null

    if (action.type === 'day') {
        if (filters.days.includes(action.value)) {
            filters.days = filters.days.filter(d => d !== action.value)
        } else {
            filters.days.push(action.value)
        }
    }

    if (action.type === 'track-id') {
        if (filters.trackIds.includes(action.value)) {
            filters.trackIds = filters.trackIds.filter(t => t !== action.value)
        } else {
            filters.trackIds.push(action.value)
        }
    }
}

function getFilteredTalksArray(talks, filters) {
    if (filters.mySchedule !== null) {
        return talks.filter(talk => filters.mySchedule.includes(talk.id))
    }

    return talks.filter(talk => {
        const matchDay = filters.days.length === 0 || filters.days.includes(talk.day)

        const matchTrack = filters.trackIds.length === 0 || filters.trackIds.includes(talk.trackId)

        return matchDay && matchTrack
    })
}