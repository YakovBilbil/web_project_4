import { openPopup } from "./utils.js";


const popupCardImage = document.querySelector(".popup_card-image");
const popupImagePhoto = document.querySelector(".popup__image-photo");


export default class Card {
    constructor(cardData, cardTemplateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._template = document.querySelector(cardTemplateSelector).content;
    }

    _addEventListeners() {

        const deleteButton = this._card.querySelector(".card__delete");
        const cardPicture = this._card.querySelector(".card__picture");
        const cardName = this._card.querySelector(".card__name");
        const cardHeart = this._card.querySelector(".card__heart");

        cardName.textContent = this._name;
        cardPicture.src = this._link;
        cardPicture.alt = `A picture of ${this._name}`;


        ///////////////////////////////
        /////////Like Unlike ////////
        /////////////////////////////

        cardHeart.addEventListener("click", (event) => {
            event.target.classList.toggle("card__heart_active");
        });


        /////////////////////////////
        /////// Delete Card /////////
        ////////////////////////////

        deleteButton.addEventListener("click", () => {
            const listItem = deleteButton.closest(".card");
            listItem.remove();
        });


        /////////////////////////////
        /////// Image Popup /////////
        ////////////////////////////

        cardPicture.addEventListener("click", () => {
            popupCardImage.querySelector(".popup__image-title").textContent = this._name;
            popupImagePhoto.src = this._link;
            popupImagePhoto.alt = `A picture of ${this._name}`;
            openPopup(popupCardImage);
        });

    }

    render() {
        this._card = this._template.querySelector(".card").cloneNode(true);
        this._addEventListeners();
        return this._card;
    }
}
