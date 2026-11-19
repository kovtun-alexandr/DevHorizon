import { NAVIGATION_LIST } from '../config/navigationList.js';
import createLink from './Link.js';

export default function createNavigation(
    className: string,
    page?: string,
    attributeName: string | null = null
): HTMLElement {
    const navEl = document.createElement('nav')

    navEl.classList.add(className)

    if (attributeName) {
        navEl.setAttribute('id', attributeName)
    }

    NAVIGATION_LIST.forEach((item) => {
        const linkEl = createLink(
            item.title,
            item.href
        )

        linkEl.dataset.page = item.page

        if (item.page === page) {
            linkEl.classList.add('isActive')
        }

        navEl.append(linkEl);
    });

    return navEl;
}