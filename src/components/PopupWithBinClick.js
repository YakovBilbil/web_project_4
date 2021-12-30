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
            /*
              const resOk = await this._deleteCardHandle(this._id);
              if (resOk.message === "This post has been deleted") { //see how can I check
                  cardOnDome.remove();
                  console.log(cardId, "was deleted ");
                  this.close();
              }
              */
        });
        /*
          this._popup.addEventListener("click", (evt) => {
              if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-icon")) {
                  this.close();
              }
          });

          this._popup.addEventListener("submit", (evt) => {
              evt.preventDefault();
              this._handleFormSubmit(this._getInputValues());
          });
          */
    }

    open(cardId, cardOnDome) {
            super.open();
            this._cardId = cardId;
            this._cardOnDome = cardOnDome;
            console.log("ready to delete ", cardId);
        }
        /*
            close() {
                super.close();
                this._popup.removeEventListener("submit", this._handleEscClose);
            }
            */
}
