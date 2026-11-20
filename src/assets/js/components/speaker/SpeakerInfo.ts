import type { Speaker } from "../../api/fetchData.js";
import resolveAsset from "../../utils/assets.js";
import createTitle from "../Title.js";

export default class SpeakerInfo {
    readonly speaker: Speaker;
    readonly showBiography: boolean | null;
    readonly bgColor: string | null;
    readonly avatarUrl: string;
    readonly element: HTMLElement;

    constructor(
        speaker: Speaker,
        showBiography: boolean | null = null,
        bgColor: string | null = null
    ) {
        this.speaker = speaker;
        this.showBiography = showBiography;
        this.bgColor = bgColor;
        this.avatarUrl = resolveAsset(this.speaker.avatar)

        this.element = this.render();
    }

    private avatar(): HTMLDivElement {
        const blockEl = document.createElement('div')
        const imgEl = document.createElement('img')

        blockEl.classList.add('avatar')

        imgEl.src = this.avatarUrl;
        imgEl.alt = this.speaker.name
        imgEl.loading = 'lazy';
        imgEl.decoding = 'async';

        if (this.bgColor) {
            blockEl.style.backgroundColor = this.bgColor
        }

        blockEl.append(imgEl)

        return blockEl
    }

    private body(): HTMLDivElement {
        const blockEl = document.createElement('div')

        blockEl.classList.add('body-wrap')

        blockEl.append(
            createTitle('h3', 'name', this.speaker.name),
            this.roleAndCompany()
        )

        return blockEl
    }

    private roleAndCompany(): HTMLParagraphElement {
        const textEl = document.createElement('p')

        const { role, company } = this.speaker

        textEl.classList.add('role')
        textEl.textContent = `${role} @${company}`

        return textEl
    }

    private biography(): HTMLParagraphElement {
        const textEl = document.createElement('p')

        textEl.classList.add('biography')
        textEl.textContent = this.speaker.bio

        return textEl
    }

    render(): HTMLElement {
        const blockEl = document.createElement('div')

        blockEl.classList.add('speaker-info')

        const elements: HTMLElement[] = [
            this.avatar(),
            this.body()
        ]

        if (this.showBiography) {
            elements.push(this.biography())
        }

        blockEl.append(...elements)

        return blockEl
    }
}