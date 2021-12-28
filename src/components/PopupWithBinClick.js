import Popup from "./Popup.js";

export default class PopupWithBinClick extends Popup {
    constructor(popupSelector, { deleteCardHandle }) {
        super(popupSelector);
        this.open = this.open.bind(this);
        this._popupVerifyDeleteButton = this._popup.querySelector(".popup_verify-delete-button");
        this._deleteCardHandle = deleteCardHandle;
    }

    open(cardId, cardOnDome) {
        this._id = cardId;
        console.log("open ", cardId);
        super.open();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            console.log("listener ", cardId);
            const resOk = this._deleteCardHandle(this._id);
            //console.log(resOk);
            if (resOk) {
                cardOnDome.remove();
                this.close();
            }
        });
    }
}
