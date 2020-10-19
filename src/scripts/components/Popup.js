export default class Popup {
    constructor(popup) {
        this.popup = popup;
    }

    // Открыть попап
    open() {
        this.popup.classList.toggle('popup_is-opened');
    }

    // Закрыть попап
    close() {
        this.popup.classList.toggle('popup_is-opened');
    }
}
