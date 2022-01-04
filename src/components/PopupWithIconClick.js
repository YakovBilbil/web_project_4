import Popup from "./Popup.js";

export default class PopupWithIconClick extends Popup {
    constructor(popupSelector, { handler }) {
        super(popupSelector);
        this._handler = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", async(evt) => {
            evt.preventDefault();
            await this._handler(this._data);
            this.close();
        });

    }

    open(data) {
        super.open();
        this._data = data;
    }
}
