export default class Card {
    constructor({ cardData, cardTemplateSelector, getCardLikesData, handleCardClick, handleCardDelete, userId, handleLikePut, handleLikeDelete }) {
        this._cardData = cardData;
        this._template = document.querySelector(cardTemplateSelector).content;
        this._getCardLikesData = getCardLikesData;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._userId = userId;
        this._handleLikePut = handleLikePut;
        this._handleLikeDelete = handleLikeDelete;

        this._name = cardData.name;
        this._link = cardData.link;
        this._cardId = cardData._id;
        this._cardDataOwnerId = cardData.owner._id;
        this._likesAmount = cardData.likes.length;

        this._card = this._template.querySelector(".card").cloneNode(true);
        this._deleteButton = this._card.querySelector(".card__delete");
        this._cardPicture = this._card.querySelector(".card__picture");
        this._cardName = this._card.querySelector(".card__name");
        this._cardHeart = this._card.querySelector(".card__heart");
        this._cardLikesAmount = this._card.querySelector(".card__likes-amount");

        const iLikedIt = cardData.likes.some(like => like._id === this._userId);
        if (iLikedIt) {
            this._cardHeart.classList.toggle("card__heart_active");
        }
    }


    async _addEventListeners() {
        this._cardHeart.addEventListener("click", async(event) => {
            if (!event.target.classList.contains("card__heart_active")) {
                const cardData = await this._handleLikePut(this._cardId);
                if (cardData) {
                    event.target.classList.toggle("card__heart_active");
                    this._likesAmount = cardData.likes.length;
                    this._cardLikesAmount.textContent = this._likesAmount;
                }
            } else {
                const cardData = await this._handleLikeDelete(this._cardId);
                if (cardData) {
                    event.target.classList.toggle("card__heart_active");
                    this._likesAmount = cardData.likes.length;
                    this._cardLikesAmount.textContent = this._likesAmount;
                }
            }
        });

        // Delete Card
        this._deleteButton.addEventListener("click", () => {
            this._handleCardDelete({ cardId: this._cardId, cardOnDome: this._card });
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
        this._cardLikesAmount.textContent = this._likesAmount;
        if (this._cardDataOwnerId !== this._userId) {
            this._deleteButton.classList.add("not-visible");
        }
        this._addEventListeners();
        return this._card;
    }
}