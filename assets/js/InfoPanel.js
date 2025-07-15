export class InfoPanel {
    constructor(panelId, overlayId) {
        this.panel = document.getElementById(panelId);
        this.overlay = document.getElementById(overlayId);
        this.titleElement = this.panel.querySelector('#panel-title');
        this.contentElement = this.panel.querySelector('#panel-content');
        const closeButton = this.panel.querySelector('#panel-close-button');

        closeButton.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', () => this.hide());
    }

    show() {
        this.overlay.classList.remove('hidden');
        this.panel.classList.add('visible');
    }

    hide() {
        this.panel.classList.remove('visible');
        setTimeout(() => this.overlay.classList.add('hidden'), 300);
    }

    setTitle(text) {
        this.titleElement.textContent = text;
    }

    setContent(text) {
        this.contentElement.innerHTML = text;
    }
}