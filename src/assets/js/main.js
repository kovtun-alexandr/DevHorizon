import createNavigation from './components/Navigation.js';
import createLogo from './components/Logo.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { getConferenceData } from './api/fetchData.js';
import initHome from './pages/home.js';
import initSchedule from './pages/schedule.js';
import initSpeakers from './pages/speakers.js';

const body = document.querySelector('body')
const page = body.dataset.page

body.append(renderHeader(createLogo(), createNavigation('header-nav', page, 'main-navigation')))

const pageContentContainer = document.createElement('div')

pageContentContainer.classList.add('page-content-loading')
pageContentContainer.innerText = 'Loading...'

body.append(pageContentContainer);

const initApp = async () => {
    try {
        const data = await getConferenceData();

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
    } catch (error) {
        console.error('Error fetching data:', error);
        pageContentContainer.innerText = 'Failed to load data. Please try again later.';
    }
}

initApp()