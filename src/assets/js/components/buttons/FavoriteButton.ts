import { isFavorite, toggleFavoriteInStorage } from "../../utils/storage.js"
import { FAVORITES_UPDATED_EVENT } from "../../config/events.js"

export default function createFavoriteButton(
    talkId: string
): HTMLButtonElement {
    const buttonEl = document.createElement('button')
    buttonEl.type = 'button'
    buttonEl.classList.add('btn-favorite')

    buttonEl.setAttribute('data-talk-id', talkId)

    applyState(buttonEl, isFavorite(talkId))

    buttonEl.addEventListener('click', (e) => {
        e.stopPropagation()

        const isActive = !buttonEl.classList.contains('is-active')

        applyState(buttonEl, isActive)
        toggleFavoriteInStorage(talkId, isActive)

        const event = new CustomEvent(FAVORITES_UPDATED_EVENT)
        window.dispatchEvent(event)
    });

    return buttonEl;
}

function applyState(buttonEl: HTMLButtonElement, isActive: boolean) {
    const label = isActive ? 'Remove from favorites' : 'Add to favorites'

    buttonEl.classList.toggle('is-active', isActive)
    buttonEl.setAttribute('aria-pressed', String(isActive))
    buttonEl.setAttribute('aria-label', label)
    buttonEl.title = label
}