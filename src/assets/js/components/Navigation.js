import { NAVIGATION_LIST } from '../config/navigationList.js';
import createLink from './Link.js';

export default function createNavigation(className, page, attributeName = null) {
    const navEl = document.createElement('nav')

    navEl.classList.add(className)

    if (attributeName) {
        navEl.setAttribute('id', attributeName)
    }

    const currentPage = page

    NAVIGATION_LIST.forEach((item) => {
        const linkEl = createLink(
            item.title,
            false,
            item.href
        )

        linkEl.dataset.page = item.page

        if (item.page === currentPage) {
            linkEl.classList.add('isActive')
        }

        navEl.append(linkEl);
    });

    return navEl;
}