import { navigationsList } from '../config/navigationsList.js';
import createLink from './Link.js';

export default function createNavigation(className, page) {
    const navEl = document.createElement('nav')

    navEl.classList.add(className)

    const currentPage = page

    navigationsList.forEach((item) => {
        const linkEl = createLink(
            item.title,
            false,
            item.href
        )

        // linkEl.classList.add('navigation-link')

        // linkEl.href = item.href
        // linkEl.textContent = item.title

        linkEl.dataset.page = item.page

        if (item.page === currentPage) {
            linkEl.classList.add('isActive')
        }

        navEl.append(linkEl);
    });

    return navEl;
}