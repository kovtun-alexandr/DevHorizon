import type { TalkWithDetails } from "../../services/dataService.js";
import resolveAsset from "../../utils/assets.js";
import createButton from "../buttons/Button.js"
import createFavoriteButton from "../buttons/FavoriteButton.js"
import createTitle from "../Title.js"

interface DetailsDom {
    wrapper: HTMLDivElement;
    toggleButton: HTMLButtonElement;
}

export default class TalkCard {
    readonly talk: TalkWithDetails;
    readonly talkColor: string;
    readonly showMore: boolean | null;
    readonly favorite: boolean | null;
    readonly favoriteButton: HTMLButtonElement | null;
    readonly imgUrl: string;
    readonly element: HTMLElement;

    constructor(
        talk: TalkWithDetails,
        showMore: boolean | null = null,
        favorite: boolean | null = null,
    ) {
        this.talk = talk;
        this.talkColor = talk.track.color || 'var(--cyan-100)';
        this.showMore = showMore;
        this.favorite = favorite;

        this.favoriteButton = this.favorite
            ? createFavoriteButton(this.talk.id)
            : null;
        this.imgUrl = resolveAsset('images/pattern-barcode.svg');

        this.element = this.render();
    }

    private actions(dom: DetailsDom): void {
        dom.toggleButton.addEventListener('click', () => {
            this.toggleDetails(dom)
        })
    }

    private toggleDetails(dom: DetailsDom): void {
        const isOpened = dom.wrapper.classList.toggle('isActive')

        dom.toggleButton.classList.toggle('isActive', isOpened)
        dom.toggleButton.setAttribute('aria-expanded', isOpened ? 'true' : 'false');

        dom.toggleButton.textContent = isOpened
            ? 'Hide details'
            : 'Show details'
    }

    private label(): HTMLDivElement {
        const blockEl = document.createElement('div')
        const textEl = document.createElement('p')

        blockEl.classList.add('label')
        textEl.textContent = this.talk.track.name.toUpperCase()
        textEl.style.color = this.talkColor

        blockEl.append(textEl)

        return blockEl
    }

    private body(): HTMLDivElement {
        const blockEl = document.createElement('div')

        blockEl.classList.add('talk-body')
        blockEl.style.backgroundColor = this.talkColor

        const elements: HTMLElement[] = [
            createTitle('h3', 'topic', this.talk.title),
            this.speaker()
        ]

        if (this.showMore) {
            elements.push(this.details())
        }

        blockEl.append(...elements)

        return blockEl
    }

    private speaker(): HTMLDivElement {
        const dom = {
            block: document.createElement('div'),
            name: document.createElement('span'),
            company: document.createElement('span')
        }

        const { name: speakerName, company: speakerCompany } = this.talk.speaker

        dom.block.classList.add('speaker')
        dom.name.textContent = `${speakerName} // `
        dom.company.textContent = speakerCompany

        dom.block.append(
            dom.name,
            dom.company
        )

        return dom.block
    }

    private details(): HTMLDivElement {
        const dom = {
            wrapper: document.createElement('div'),
            block: document.createElement('div'),
            inner: document.createElement('div'),
            toggleButton: createButton('Show details', 'show-details'),
            description: document.createElement('p'),
            location: document.createElement('p'),
        };

        dom.wrapper.classList.add('wrap-details')
        dom.block.classList.add('talk-details')
        dom.inner.classList.add('details-inner')
        dom.toggleButton.setAttribute('aria-expanded', 'false');
        dom.description.textContent = this.talk.description
        dom.location.textContent = `Location: ${this.talk.location}`

        this.actions(dom)

        dom.inner.append(
            dom.description,
            dom.location
        )

        dom.block.append(dom.inner)
        dom.wrapper.append(
            dom.block,
            dom.toggleButton
        )

        return dom.wrapper
    }

    private time(): HTMLDivElement {
        const blockEl = document.createElement('div')

        blockEl.classList.add('talk-time')
        blockEl.style.backgroundColor = this.talkColor

        const favoriteOrDay = this.favoriteButton ?? this.day()

        blockEl.append(
            this.startToEndTime(
                this.talk.startTime,
                this.talk.endTime
            ),
            this.barcode(),
            favoriteOrDay
        )

        return blockEl
    }

    private startToEndTime(...times: string[]): HTMLDivElement {
        const blockEl = document.createElement('div')

        blockEl.classList.add('start-end')

        times.forEach(time => {
            const spanEl = document.createElement('span')
            spanEl.textContent = time
            blockEl.append(spanEl)
        })

        return blockEl
    }

    private barcode(): HTMLImageElement {
        const imgEl = document.createElement('img')

        imgEl.classList.add('barcode')
        imgEl.src = this.imgUrl
        imgEl.alt = 'Barcode'

        return imgEl
    }

    private day(): HTMLParagraphElement {
        const textEl = document.createElement('p')

        textEl.classList.add('day')
        textEl.textContent = `Day ${this.talk.day}`

        return textEl
    }

    render(): HTMLElement {
        const blockEl = document.createElement('article')

        blockEl.classList.add('talk')
        blockEl.style.border = `1px solid ${this.talkColor}`

        blockEl.append(
            this.label(),
            this.body(),
            this.time()
        )

        return blockEl
    }
}