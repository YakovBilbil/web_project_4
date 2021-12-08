import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.open = this.open.bind(this);
    }

    open(link, name) {
        const popupImagePhoto = this._popup.querySelector(".popup__image-photo");
        this._popup.querySelector(".popup__image-title").textContent = name;
        popupImagePhoto.src = link;
        popupImagePhoto.alt = `A picture of ${name}`;
        super.open();
    }
}
