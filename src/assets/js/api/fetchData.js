import resolveAsset from '../utils/assets.js';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getConferenceData() {
    const url = resolveAsset('./data/data.json');
    return await fetchData(url);
}