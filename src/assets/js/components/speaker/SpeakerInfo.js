import createTitle from "../Title.js";

export default class SpeakerInfo {
    constructor(speaker, showBiography = null, bgColor = null) {
        this.speaker = speaker;
        this.showBiography = showBiography;
        this.bgColor = bgColor;

        this.importPath = import.meta.env.BASE_URL;
        this.cleanAvatarPath = this.speaker.avatar.replace(/^\//, '');

        this.element = this.render();
    }

    avatar() {
        const blockEl = document.createElement('div')
        const imgEl = document.createElement('img')

        blockEl.classList.add('avatar')

        imgEl.src = `${this.importPath}${this.cleanAvatarPath}`;
        imgEl.alt = this.speaker.name

        if (this.bgColor) {
            blockEl.style.backgroundColor = this.bgColor
        }

        blockEl.append(imgEl)

        return blockEl
    }

    body() {
        const blockEl = document.createElement('div')

        blockEl.classList.add('body-wrap')

        blockEl.append(
            createTitle('h3', 'name', this.speaker.name),
            this.roleAndCompany()
        )

        return blockEl
    }

    roleAndCompany() {
        const textEl = document.createElement('p')

        const { role, company } = this.speaker

        textEl.classList.add('role')
        textEl.textContent = `${role} @${company}`

        return textEl
    }

    biography() {
        const textEl = document.createElement('p')

        textEl.classList.add('biography')
        textEl.textContent = this.speaker.bio

        return textEl
    }

    render() {
        const blockEl = document.createElement('div')

        blockEl.classList.add('speaker-info')

        const elements = [
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