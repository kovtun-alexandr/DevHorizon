export interface FormatedDate {
    year: number;
    month: string;
    shortMonth: string;
    day: number;
}

export function formatDate(dateString: string, locale = 'en-US'): FormatedDate {
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