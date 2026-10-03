import createButton from "./buttons/Button.js";

export default function createFilter(data, onFilterChange, initialFilters) {
    const blockEl = document.createElement('div')

    blockEl.classList.add('filter')

    blockEl.append(
        createFilterButtonList(data)
    )

    let currentFiltersState = initialFilters || { days: [], trackIds: [], mySchedule: null }

    updateVisualButtonsState(blockEl, currentFiltersState);

    blockEl.addEventListener('click', (e) => {
        const button = e.target.closest('button')

        if (!button) return

        let action = {}

        if (button.dataset.action === 'clear') {
            action = { type: 'clear-all' }
        } else if (button.dataset.action === 'schedule') {
            const favorites = JSON.parse(localStorage.getItem('conference_favorites')) || []
            action = { type: 'my-schedule', value: favorites }
        } else if (button.dataset.day) {
            action = { type: 'day', value: Number(button.dataset.day) }
        } else if (button.dataset.trackId) {
            action = { type: 'track-id', value: button.dataset.trackId }
        } else {
            return
        }

        currentFiltersState = onFilterChange(action)

        updateVisualButtonsState(blockEl, currentFiltersState)
    })

    window.addEventListener('favoritesUpdated', () => {
        const favorites = JSON.parse(localStorage.getItem('conference_favorites')) || []

        if (currentFiltersState.mySchedule !== null) {
            if (favorites.length === 0) {
                currentFiltersState = onFilterChange({ type: 'clear-all' })
            } else {
                currentFiltersState = onFilterChange({ type: 'update-favorites', value: favorites })
            }
        }

        updateVisualButtonsState(blockEl, currentFiltersState)
    })

    return blockEl
}

function updateVisualButtonsState(element, filters) {
    if (!filters) return;

    const buttons = element.querySelectorAll('button')

    const favorites = JSON.parse(localStorage.getItem('conference_favorites')) || []
    const isFavoritesEmpty = favorites.length === 0;

    const isAnyFilterActive =
        filters.days.length > 0 ||
        filters.trackIds.length > 0 ||
        filters.mySchedule !== null

    buttons.forEach(button => {
        if (button.dataset.action === 'schedule') {
            if (filters.mySchedule !== null) {
                button.classList.add('is-active')
            } else {
                button.classList.remove('is-active')
            }

            button.disabled = isFavoritesEmpty
        }

        else if (button.dataset.action === 'clear') {
            button.disabled = !isAnyFilterActive
        }

        else if (button.dataset.day) {
            const dayValue = Number(button.dataset.day);
            if (filters.days.includes(dayValue)) {
                button.classList.add('is-active')
            } else {
                button.classList.remove('is-active')
            }
        }

        else if (button.dataset.trackId) {
            const trackIdValue = button.dataset.trackId
            if (filters.trackIds.includes(trackIdValue)) {
                button.classList.add('is-active')
            } else {
                button.classList.remove('is-active')
            }
        }
    });
}

function createFilterButtonList(data) {
    const fragmentEl = document.createDocumentFragment()
    const filterData = sortList(data)

    const favorites = JSON.parse(localStorage.getItem('conference_favorites')) || []
    const isFavoritesEmpty = favorites.length === 0

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

    for (const value of Object.values(filterData)) {
        value.forEach((element => {
            const key = Object.keys(element)[0]
            const value = element[key]

            if (key === 'day') {
                const buttonEl = createButton(
                    `${key} ${String(value).padStart(2, '0')}`,
                    `${key}-btn`,
                    `data-${key}`,
                    value
                )

                fragmentEl.append(buttonEl)
            } else {
                const track = data.tracks.filter(track => track.id === element.trakId)
                const buttonEl = createButton(
                    track[0].name,
                    'track-btn',
                    'data-track-id',
                    track[0].id
                )

                fragmentEl.append(buttonEl)
            }
        }))
    }

    fragmentEl.append(
        myScheduleBtn,
        clearBtn
    )

    return fragmentEl
}

function sortList(data) {
    const unicateDays = new Set(data.talks.map(talk => talk.day))

    const days = [...unicateDays].map(day => ({ day }))

    const traks = data.tracks
        .filter(track => track.id !== 'tr_0')
        .map(track => ({ trakId: track.id }))

    return {
        days,
        traks
    }
}