import { isFavorite, toggleFavoriteInStorage } from "../../utils/storage.js"

export default function createFavoriteButton(talkId) {
    const buttonEl = document.createElement('button')
    buttonEl.type = 'button'
    buttonEl.classList.add('btn-favorite')

    buttonEl.setAttribute('data-talk-id', talkId)

    const isAlreadyFavorite = isFavorite(talkId);

    if (isAlreadyFavorite) {
        buttonEl.classList.add('is-active')
        buttonEl.setAttribute('aria-pressed', 'true')
        buttonEl.setAttribute('aria-label', 'Remove from favorites')
        buttonEl.title = 'Remove from favorites'
    } else {
        buttonEl.setAttribute('aria-pressed', 'false')
        buttonEl.setAttribute('aria-label', 'Add to favorites')
        buttonEl.title = 'Add to favorites'
    }

    buttonEl.addEventListener('click', (e) => {
        e.stopPropagation()

        const isActive = buttonEl.classList.toggle('is-active')

        buttonEl.setAttribute('aria-pressed', isActive ? 'true' : 'false')
        buttonEl.setAttribute('aria-label', isActive ? 'Remove from favorites' : 'Add to favorites')
        buttonEl.title = isActive ? 'Remove from favorites' : 'Add to favorites'

        toggleFavoriteInStorage(talkId, isActive)

        const event = new CustomEvent('favoritesUpdated')
        window.dispatchEvent(event)
    });

    return buttonEl;
}
