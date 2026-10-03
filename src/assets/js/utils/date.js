export function formatDate(dateString, locale = 'en-US') {
    const date = new Date(`${dateString}T00:00:00`);

    return {
        year: date.getFullYear(),

        month: date.toLocaleDateString(locale, {
            month: 'long'
        }),

        shortMonth: date.toLocaleDateString(locale, {
            month: 'short'
        }),

        day: date.getDate()
    };
}