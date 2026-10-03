const STORAGE_KEY = 'conference_favorites';

/**
 * Додає або видаляє ID доповіді з обраного в localStorage
 * @param {string} talkId - Унікальний ID розмови (наприклад, talk.id)
 * @param {boolean} isActive - Поточний стан кнопки (true — додано, false — видалено)
 */
export function toggleFavoriteInStorage(talkId, isActive) {
    try {
        // 1. Читаємо поточний масив обраного з localStorage або створюємо порожній, якщо його ще немає
        const storedData = localStorage.getItem(STORAGE_KEY);
        let favorites = storedData ? JSON.parse(storedData) : [];

        if (isActive) {
            // 2. Якщо isActive === true, додаємо ID в масив (перевіряємо, щоб не було дублів)
            if (!favorites.includes(talkId)) {
                favorites.push(talkId);
            }
        } else {
            // 3. Якщо isActive === false, видаляємо ID з масиву за допомогою фільтрації
            favorites = favorites.filter(id => id !== talkId);
        }

        // 4. Записуємо оновлений масив назад у пам'ять браузера у форматі рядка
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Помилка роботи з localStorage:", error);
    }
}

/**
 * Додоткова функція: перевіряє, чи є конкретний ID в обраному
 * @param {string} talkId - ID розмови
 * @returns {boolean} - true, якщо елемент вже в обраному
 */
export function isFavorite(talkId) {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (!storedData) return false;

        const favorites = JSON.parse(storedData);
        return favorites.includes(talkId);
    } catch {
        return false;
    }
}