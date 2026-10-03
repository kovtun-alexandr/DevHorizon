import { footerNavigationTitles } from '../config/footerNavigationTitles.js';
import { formatDate } from '../utils/date.js';
import createButton from './buttons/Button.js';
import createTitle from './Title.js';
import createTrackNavList from './track/TrackNavList.js';

export function renderFooter(logo, navigation, data) {
    const footer = document.createElement('footer');

    footer.classList.add('footer', 'container')

    const tracks = createTrackNavList(data.tracks)

    footer.append(
        createFooterBody(logo, navigation, tracks, data),
        createFooterBottom()
    )
    return footer;
}

// === Footer Body ===

function createFooterBody(logo, navigation, tracks, data) {
    const footerBody = document.createElement('div')

    footerBody.append(
        createFooterInfo(logo),
        createFooterNavigation(navigation, tracks, data)
    )

    return footerBody
}

function createFooterInfo(logo) {
    const footerInfo = document.createElement('div')
    footerInfo.classList.add('footer-info')

    footerInfo.append(
        logo,
        createFooterInfoDescription('A three-day conference for engineers who build the interfaces humans use every day.')
    )

    return footerInfo
}

function createFooterInfoDescription(descriptionText) {
    const description = document.createElement('p')
    description.textContent = descriptionText
    return description
}

function createFooterNavigation(navigation, tracks, data) {
    const footerNavigation = document.createElement('div')

    footerNavigation.classList.add('footer-navigation')

    footerNavigation.append(
        createFooterNavigationColumn(
            footerNavigationTitles.navigation,
            navigation
        ),
        createFooterNavigationColumn(
            footerNavigationTitles.tracks,
            tracks
        ),
        createFooterNavigationColumn(
            footerNavigationTitles.venue,
            createFooterVenue(data)
        )
    )

    return footerNavigation
}

function createFooterVenue(data) {
    const textEl = document.createElement('p')
    textEl.classList.add('venue')

    const venue = data.conference.location.venue
    const city = data.conference.location.city
    const state = data.conference.location.state
    const { year, shortMonth, day: startDay } = formatDate(data.conference.startDate)
    const { day: endDay } = formatDate(data.conference.endDate)

    textEl.textContent = `${venue} \n${city}, ${state} \n${shortMonth} ${startDay}-${endDay}, ${year}`

    return textEl
}

function createFooterNavigationColumn(title, blockEl) {
    const column = document.createElement('div')
    column.classList.add('navigation-column')

    column.append(
        createTitle('h3', 'navigation-title', title),
        blockEl
    )

    return column
}

// === Footer Bottom ===

function createFooterBottom() {
    const footerBottom = document.createElement('div')
    const backToTop = createButton('Back to Top', 'back-to-top')

    footerBottom.append(
        createCopyrightText('© 2026 DEVHORIZON. ALL RIGHTS RESERVED.'),
        backToTop
    )

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    return footerBottom
}

function createCopyrightText(text) {
    const copyright = document.createElement('p')
    copyright.textContent = text
    return copyright
}