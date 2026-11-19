export type PageName = 'home' | 'schedule' | 'speakers';

export interface NavigationItem {
    readonly title: string;
    readonly href: string;
    readonly page: PageName;
}

export const NAVIGATION_LIST: readonly NavigationItem[] = Object.freeze([
    {
        title: 'Home',
        href: './',
        page: 'home'
    },
    {
        title: 'Schedule',
        href: './schedule.html',
        page: 'schedule'
    },
    {
        title: 'Speakers',
        href: './speakers.html',
        page: 'speakers'
    },
])