import type { ConferenceData } from "../api/fetchData.js"
import type { ActiveFilters, FilterChangeHandler } from "../components/Filter.js"
import createFilter from "../components/Filter.js"
import createSection from "../components/Section.js"
import createTalkList from "../components/talk/TalkList.js"
import createTitle from "../components/Title.js"
import { getFilteredTalksArray, syncFiltersToURL, updateFiltersState } from "../utils/filters.js"

export default function initSchedule(data: ConferenceData): HTMLElement {
    const mainEl = document.createElement('main')

    mainEl.classList.add('main-schedule', 'container')

    const sectionEl = createSection(
        'schedule',
        createTitle('h2', 'schedule-title', 'Schedule')
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

    const activeFilters: ActiveFilters = {
        days: initialDays,
        trackIds: initialTracks,
        mySchedule: initialFavorites
    }

    const handleFilterChange: FilterChangeHandler = (filterActions) => {
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