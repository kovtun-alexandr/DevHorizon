import createNavigation from './components/Navigation.js';
import createLogo from './components/Logo.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { fetchData } from './api/fetchData.js';
import initHome from './pages/home.js';
import initSchedule from './pages/schedule.js';
import initSpeakers from './pages/speakers.js';

const body = document.querySelector('body')
const page = body.dataset.page

body.append(renderHeader(createLogo(), createNavigation('header-nav', page)))

const pageContentContainer = document.createElement('div')

pageContentContainer.classList.add('page-content-loading')
pageContentContainer.innerText = 'Loading...'

body.append(pageContentContainer);

const dataFetch = async () => {
    try {
        return await fetchData('./data/data.json')
    } catch (error) {
        console.error('Error fetching data:', error);

        pageContentContainer.textContent = 'Failed to load schedule data. Please try again later.'

        return null
    }
};

const initApp = async () => {
    const data = await dataFetch()

    pageContentContainer.replaceChildren()
    pageContentContainer.className = 'page-content'

    switch (page) {
        case 'home':
            pageContentContainer.append(initHome(data));
            break;
        case 'schedule':
            pageContentContainer.append(initSchedule(data));
            break;
        case 'speakers':
            pageContentContainer.append(initSpeakers(data));
            break;
        default:
            console.warn(`Unknown page type: ${page}`);
    }

    body.append(renderFooter(createLogo(), createNavigation('footer-nav', page), data));
}

initApp()