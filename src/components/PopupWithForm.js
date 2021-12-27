import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this.close = this.close.bind(this);
    }

    _getInputValues() {

        this._inputList = this._popup.querySelectorAll(".popup__form-input");
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-icon")) {
                this.close();
            }
        });

        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popup.querySelector(".popup__form-submit").reset();
    }
}
