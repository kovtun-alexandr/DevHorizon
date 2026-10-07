import createButton from "../buttons/Button.js"
import createFavoriteButton from "../buttons/FavoriteButton.js"
import createTitle from "../Title.js"

export default class TalkCard {
    constructor(
        talk,
        showMore = null,
        favorite = null,
    ) {
        this.talk = talk;
        this.showMore = showMore;
        this.favorite = favorite;

        this.favoriteButton = this.favorite
            ? createFavoriteButton(this.talk.id)
            : null;
        this.importPath = import.meta.env.BASE_URL;
        this.imgUrl = '/images/pattern-barcode.svg';

        this.element = this.render();
    }

    actions(dom) {
        dom.toggleButton.addEventListener('click', () => {
            this.toggleDetails(dom)
        })
    }

    toggleDetails(dom) {
        const isOpened = dom.wrapper.classList.toggle('isActive')

        dom.toggleButton.classList.toggle('isActive', isOpened)

        dom.toggleButton.textContent = isOpened
            ? 'Hide details'
            : 'Show details'
    }

    label() {
        const blockEl = document.createElement('div')
        const textEl = document.createElement('p')

        blockEl.classList.add('label')
        textEl.textContent = this.talk.track.name.toUpperCase()
        textEl.style.color = this.talk.track.color

        blockEl.append(textEl)

        return blockEl
    }

    body() {
        const blockEl = document.createElement('div')

        blockEl.classList.add('talk-body')
        blockEl.style.backgroundColor = this.talk.track.color

        const elements = this.showMore
            ? [
                createTitle('h3', 'topic', this.talk.title),
                this.speaker(),
                this.details()
            ]
            : [
                createTitle('h3', 'topic', this.talk.title),
                this.speaker()
            ]

        blockEl.append(...elements)

        return blockEl
    }

    speaker() {
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

    details() {
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

    time() {
        const blockEl = document.createElement('div')

        blockEl.classList.add('talk-time')
        blockEl.style.backgroundColor = this.talk.track.color

        const favoriteOrDay = this.favorite
            ? this.favoriteButton
            : this.day()

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

    startToEndTime(...times) {
        const blockEl = document.createElement('div')

        blockEl.classList.add('start-end')

        times.forEach(time => {
            const spanEl = document.createElement('span')
            spanEl.textContent = time
            blockEl.append(spanEl)
        })

        return blockEl
    }

    barcode() {
        const imgEl = document.createElement('img')

        imgEl.classList.add('barcode')
        imgEl.src = `${this.importPath}${this.imgUrl}`
        imgEl.alt = 'Barcode'

        return imgEl
    }

    day() {
        const textEl = document.createElement('p')

        textEl.classList.add('day')
        textEl.textContent = `Day ${this.talk.day}`

        return textEl
    }

    render() {
        const blockEl = document.createElement('article')

        blockEl.classList.add('talk')
        blockEl.style.border = `1px solid ${this.talk.track.color}`

        blockEl.append(
            this.label(),
            this.body(),
            this.time()
        )

        return blockEl
    }
}