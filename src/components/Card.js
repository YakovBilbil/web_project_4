export default class Card {
    constructor({ cardData, cardTemplateSelector, handleCardClick, handleCardDelete, userId, cardId, handleLikePut, handleLikeDelete }) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._userId = userId;
        this._cardData = cardData;


        if (cardData._id === undefined) {
            this._cardId = cardId;
        } else {
            this._cardId = cardData._id;
        }


        if (cardData.likes === undefined) {
            this._likesAmount = 0;
        } else {
            this._likesAmount = cardData.likes.length;
        }


        if (cardData.owner === undefined) {
            this._cardDataOwnerId = this._userId;
        } else {
            this._cardDataOwnerId = cardData.owner._id;
        }


        this._template = document.querySelector(cardTemplateSelector).content;
        this._handleCardClick = handleCardClick;

        this._card = this._template.querySelector(".card").cloneNode(true);
        this._deleteButton = this._card.querySelector(".card__delete");
        this._cardPicture = this._card.querySelector(".card__picture");
        this._cardName = this._card.querySelector(".card__name");
        this._cardHeart = this._card.querySelector(".card__heart");
        this._cardLikesAmount = this._card.querySelector(".card__likes-amount");

        this._handleCardDelete = handleCardDelete;
        //this._ownerID = cardData.owner._id;
        this._handleLikePut = handleLikePut;
        this._handleLikeDelete = handleLikeDelete;
    }

    _addEventListeners() {

        // Like Unlike
        this._cardHeart.addEventListener("click", (event) => {
            if (!event.target.classList.contains("card__heart_active")) {
                console.log("card id in the class ", this._cardId);
                this._handleLikePut(this._cardId);
                if (this._handleLikePut()) {
                    event.target.classList.toggle("card__heart_active");
                    this._likesAmount = this._cardData.likes.length;
                    this._cardLikesAmount.textContent = this._likesAmount;
                }
            } else {
                this._handleLikeDelete(this._cardId);
                if (this._handleLikeDelete()) {
                    event.target.classList.toggle("card__heart_active");
                    this._likesAmount = this._cardData.likes.length;
                    this._cardLikesAmount.textContent = this._likesAmount;
                }
            }
        });

        // Delete Card
        this._deleteButton.addEventListener("click", () => {
            this._handleCardDelete(this._cardId, this._card);
            //console.log(this._cardDataOwnerId);
            //this._card.remove();
            //this._card = null;
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
