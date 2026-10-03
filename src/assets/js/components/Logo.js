import imgLogo from './../../images/logo.svg';

export default function createLogo() {
    const blockEl = document.createElement('div')

    blockEl.classList.add('logo')

    const path = window.location.pathname

    const isHomePage = path === '/' || path.endsWith('/index.html') || path === '';

    const imageLogoEl = logoImage()

    if (!isHomePage) {
        blockEl.append(
            logoLink('./', imageLogoEl)
        )
    } else {
        blockEl.append(imageLogoEl);
    }

    return blockEl
}

function logoImage() {
    const imgEl = document.createElement('img');

    imgEl.src = imgLogo;
    imgEl.alt = 'Tech Conference Logo';

    return imgEl
}

function logoLink(link, imgEl) {
    const linkEl = document.createElement('a')

    linkEl.href = link

    linkEl.append(imgEl)

    return linkEl
}