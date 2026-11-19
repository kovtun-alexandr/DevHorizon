const STORAGE_KEY = 'conference_favorites';

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}

export function getFavorites(): string[] {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY)

        if (!storedData) return []

        const parsed: unknown = JSON.parse(storedData)

        return isStringArray(parsed) ? parsed : []
    } catch (error) {
        console.error('Error reading localStorage:', error);
        return []
    }
}

export function toggleFavoriteInStorage(talkId: string, isActive: boolean): void {
    try {
        // Read the current array of selected items from localStorage, or create an empty one if it doesn't exist yet.
        let favorites = getFavorites();

        if (isActive) {
            // If isActive === true, add the ID to the array (checking for duplicates)
            if (!favorites.includes(talkId)) {
                favorites.push(talkId);
            }
        } else {
            // If isActive === false, remove the ID from the array using filtering
            favorites = favorites.filter(id => id !== talkId);
        }

        // Write the updated array back to the browser's storage in string format
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Error working with localStorage:', error);
    }
}

export function isFavorite(talkId: string): boolean {
    return getFavorites().includes(talkId)
}