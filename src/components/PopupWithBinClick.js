import Popup from "./Popup.js";

export default class PopupWithBinClick extends Popup {
    constructor(popupSelector, { deleteCardHandle }) {
        super(popupSelector);
        this.open = this.open.bind(this);
        this._popupVerifyDeleteButton = this._popup.querySelector(".popup_verify-delete-button");
        this._deleteCardHandle = deleteCardHandle;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", async(evt) => {
            evt.preventDefault();
            await this._deleteCardHandle(this._cardId, this._cardOnDome);
            this.close();
        });

    }

    open(cardId, cardOnDome) {
        super.open();
        this._cardId = cardId;
        this._cardOnDome = cardOnDome;
        console.log("ready to delete ", cardId);
    }
}
