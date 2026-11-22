export function syncFiltersToURL(filters) {
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

export function updateFiltersState(filters, action) {
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

export function getFilteredTalksArray(talks, filters) {
    if (filters.mySchedule !== null) {
        return talks.filter(talk => filters.mySchedule.includes(talk.id))
    }

    return talks.filter(talk => {
        const matchDay = filters.days.length === 0 || filters.days.includes(talk.day)

        const matchTrack = filters.trackIds.length === 0 || filters.trackIds.includes(talk.trackId)

        return matchDay && matchTrack
    })
}