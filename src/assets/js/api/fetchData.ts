import resolveAsset from '../utils/assets.js';

export interface Conference {
    brandCode: string;
    endDate: string;
    location: ConferenceLocation;
    name: string;
    startDate: string;
    tagline: string;
}

export interface ConferenceLocation {
    city: string;
    cityAbbreviation: string;
    state: string;
    venue: string;
}

export interface Speaker {
    avatar: string;
    bio: string;
    company: string;
    featured: boolean;
    id: string;
    name: string;
    role: string;
}

export interface Talk {
    day: number;
    description: string;
    endTime: string;
    highlighted: boolean;
    id: string;
    location: string;
    speakerId: Speaker['id'];
    startTime: string;
    title: string;
    trackId: Track['id'];
}

export interface Track {
    color: string;
    description: string;
    id: string;
    name: string;
}

export interface ConferenceData {
    conference: Conference;
    speakers: Speaker[];
    talks: Talk[];
    tracks: Track[];
}

async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return (await response.json()) as T
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}

let cachedPromise: Promise<ConferenceData> | null = null

export async function getConferenceData(): Promise<ConferenceData> {
    if (!cachedPromise) {
        const url = resolveAsset('./data/data.json')
        cachedPromise = fetchData < ConferenceData > (url)
    }
    return cachedPromise;
}