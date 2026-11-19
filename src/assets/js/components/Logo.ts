import resolveAsset from "../utils/assets.js";

export default function createLogo(): HTMLDivElement {
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

function logoImage(): HTMLImageElement {
    const imgEl = document.createElement('img')
    imgEl.src = resolveAsset('images/logo.svg')
    imgEl.alt = 'Logo'

    return imgEl
}

function logoLink(link: string, imgEl: HTMLImageElement): HTMLAnchorElement {
    const linkEl = document.createElement('a')

    linkEl.href = link

    linkEl.append(imgEl)

    return linkEl
}