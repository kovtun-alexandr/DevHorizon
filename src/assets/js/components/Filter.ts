import type { ConferenceData, Track } from "../api/fetchData.js";
import { getFavorites } from "../utils/storage.js";
import createButton from "./buttons/Button.js";
import { GENERAL_TRACK_ID } from '../config/tracks.js';
import { FAVORITES_UPDATED_EVENT } from "../config/events.js";

export interface ActiveFilters {
    days: number[];
    trackIds: string[];
    mySchedule: string[] | null;
}

export type FilterActions =
    | { type: 'clear-all' }
    | { type: 'my-schedule'; value: string[] }
    | { type: 'update-favorites'; value: string[] }
    | { type: 'day'; value: number }
    | { type: 'track-id'; value: string };

export type FilterChangeHandler = (filterAction: FilterActions) => ActiveFilters

interface FilterContext {
    element: HTMLDivElement;
    onFilterChange: FilterChangeHandler;
    currentFiltersState: ActiveFilters;
}

interface FilterData {
    days: number[];
    tracks: Track[];
}

export default function createFilter(
    data: ConferenceData,
    onFilterChange: FilterChangeHandler,
    initialFilters?: ActiveFilters
): HTMLDivElement {
    const blockEl = document.createElement('div')

    blockEl.classList.add('filter')

    blockEl.append(
        createFilterButtonList(data)
    )

    const filterContext: FilterContext = {
        element: blockEl,
        onFilterChange,
        currentFiltersState: initialFilters || {
            days: [],
            trackIds: [],
            mySchedule: null
        }
    }

    updateVisualButtonsState(
        filterContext.element,
        filterContext.currentFiltersState
    )

    bindEvents(filterContext)

    return blockEl
}

function bindEvents(context: FilterContext): void {
    const { element } = context

    element.addEventListener('click', (e) => {
        handleFilterChange(e, context)
    })

    window.addEventListener(FAVORITES_UPDATED_EVENT, () => {
        handleFavoritesUpdate(context)
    })
}

function handleFilterChange(
    e: MouseEvent,
    context: FilterContext
): void {
    const { element, onFilterChange } = context

    if (!(e.target instanceof Element)) return

    const button = e.target.closest('button')

    if (!button) return

    const action = getActionFromButton(button)

    if (!action) return

    context.currentFiltersState = onFilterChange(action)

    updateVisualButtonsState(
        element,
        context.currentFiltersState
    )
}

function getActionFromButton(
    button: HTMLButtonElement
): FilterActions | null {
    const { action, day, trackId } = button.dataset

    if (action === 'clear') {
        return { type: 'clear-all' }
    }

    if (action === 'schedule') {
        return { type: 'my-schedule', value: getFavorites() }
    }

    if (day) {
        return { type: 'day', value: Number(day) }
    }

    if (trackId) {
        return { type: 'track-id', value: trackId }
    }

    return null
}

function handleFavoritesUpdate(context: FilterContext): void {
    const { element, onFilterChange } = context
    const favorites = getFavorites()

    if (context.currentFiltersState.mySchedule !== null) {
        if (favorites.length === 0) {
            context.currentFiltersState = onFilterChange({ type: 'clear-all' })
        } else {
            context.currentFiltersState = onFilterChange({ type: 'update-favorites', value: favorites })
        }
    }

    updateVisualButtonsState(
        element,
        context.currentFiltersState
    )
}

function updateVisualButtonsState(
    element: HTMLElement,
    filters: ActiveFilters
): void {
    const buttons = element.querySelectorAll('button')

    const isFavoritesEmpty = getFavorites().length === 0

    const isAnyFilterActive =
        filters.days.length > 0 ||
        filters.trackIds.length > 0 ||
        filters.mySchedule !== null

    buttons.forEach(button => {
        const { action, day, trackId } = button.dataset

        if (action === 'schedule') {
            const isUserScheduleActive = !isFavoritesEmpty && filters.mySchedule !== null

            button.classList.toggle('is-active', isUserScheduleActive)
            button.disabled = isFavoritesEmpty
        } else if (action === 'clear') {
            button.disabled = !isAnyFilterActive
        } else if (day) {
            button.classList.toggle('is-active', filters.days.includes(Number(day)))
        } else if (trackId) {
            button.classList.toggle('is-active', filters.trackIds.includes(trackId))
        }
    })
}

function createFilterButtonList(data: ConferenceData): DocumentFragment {
    const fragmentEl = document.createDocumentFragment()
    const filterData = sortList(data)

    const isFavoritesEmpty = getFavorites().length === 0

    const myScheduleBtn = createButton(
        'My Schedule',
        'schedule-btn',
        'data-action',
        'schedule'
    )

    myScheduleBtn.disabled = isFavoritesEmpty

    const clearBtn = createButton(
        'Clear',
        'clear-btn',
        'data-action',
        'clear'
    )

    clearBtn.disabled = true

    filterData.days.forEach(day => {
        fragmentEl.append(createButton(`day ${String(day).padStart(2, '0')}`, 'day-btn', 'data-day', String(day)))
    })

    filterData.tracks.forEach(track => {
        fragmentEl.append(createButton(track.name, 'track-btn', 'data-track-id', track.id))
    })

    fragmentEl.append(
        myScheduleBtn,
        clearBtn
    )

    return fragmentEl
}

function sortList(data: ConferenceData): FilterData {
    const days = [...new Set(data.talks.map(talk => talk.day))]
    const tracks = data.tracks.filter(track => track.id !== GENERAL_TRACK_ID)

    return {
        days,
        tracks
    }
}