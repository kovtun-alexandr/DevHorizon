export default function createLogo() {
    const blockEl = document.createElement('div')

    blockEl.classList.add('logo')

    const path = window.location.pathname
    const basePath = import.meta.env.BASE_URL

    const isHomePage =
        path === basePath ||
        path === `${basePath}index.html` ||
        path === ''

    const imageLogoEl = logoImage()

    if (!isHomePage) {
        blockEl.append(
            logoLink('./', imageLogoEl)
        )
    } else {
        blockEl.append(imageLogoEl)
    }

    return blockEl
}

function logoImage() {
    const imgEl = document.createElement('img')

    const basePath = import.meta.env.BASE_URL

    imgEl.src = `${basePath}images/logo.svg`
    imgEl.alt = 'Logo'

    return imgEl
}

function logoLink(link, imgEl) {
    const linkEl = document.createElement('a')

    linkEl.href = link

    linkEl.append(imgEl)

    return linkEl
}