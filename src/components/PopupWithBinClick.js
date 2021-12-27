import Popup from "./Popup.js";

export default class PopupWithBinClick extends Popup {
    constructor(popupSelector, { deleteCardHandle }) {
        super(popupSelector);
        this.open = this.open.bind(this);
        this._popupVerifyDeleteButton = this._popup.querySelector(".popup_verify-delete-button");
        this._deleteCardHandle = deleteCardHandle;
    }

    open(cardId, cardOnDome) {
        console.log(cardId);
        super.open();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const res = this._deleteCardHandle(cardId);
            console.log(res);
            if (res) {
                cardOnDome.remove();
                this.close();
            }
        });
    }
}