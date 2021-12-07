export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-icon")) {
                this.close();
            }
        });
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
}
