import { navigationsList } from '../config/navigationsList.js';

export default function createNavigation(page) {
    const navEl = document.createElement('nav')

    navEl.classList.add('navigation')

    const currentPage = page

    navigationsList.forEach((item) => {
        const linkEl = document.createElement('a')

        linkEl.classList.add('nav-link')

        linkEl.href = item.href
        linkEl.textContent = item.title
        linkEl.dataset.page = item.page

        if (item.page === currentPage) {
            linkEl.classList.add('isActive')
        }

        navEl.append(linkEl);
    });

    return navEl;
}