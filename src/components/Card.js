export default class Card {
    constructor(cardData, cardTemplateSelector, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._template = document.querySelector(cardTemplateSelector).content;
        this._handleCardClick = handleCardClick;

        this._card = this._template.querySelector(".card").cloneNode(true);
        this._deleteButton = this._card.querySelector(".card__delete");
        this._cardPicture = this._card.querySelector(".card__picture");
        this._cardName = this._card.querySelector(".card__name");
        this._cardHeart = this._card.querySelector(".card__heart");
    }

    _addEventListeners() {

        // Like Unlike
        this._cardHeart.addEventListener("click", (event) => {
            event.target.classList.toggle("card__heart_active");
        });

        // Delete Card
        this._deleteButton.addEventListener("click", () => {
            this._card.remove();
            this._card = null;
        });

        // Image Popup
        this._cardPicture.addEventListener("click", () => {
            this._handleCardClick(this._link, this._name);
        });

    }

    render() {
        this._cardName.textContent = this._name;
        this._cardPicture.src = this._link;
        this._cardPicture.alt = `A picture of ${this._name}`;
        this._addEventListeners();
        return this._card;
    }
}
