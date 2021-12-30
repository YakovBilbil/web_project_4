export default class Card {
    constructor({ cardData, cardTemplateSelector, getCardLikesData, handleCardClick, handleCardDelete, userId, cardId, handleLikePut, handleLikeDelete }) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._userId = userId;
        this._cardData = cardData;

        //ומה שאדוארד אמר
        // וגם לעשות קונסול לוג להכל עם האיי די והאיי פי איי באותיות גדולות

        if (cardData._id === undefined) {
            this._cardId = cardId;
        } else {
            this._cardId = cardData._id;
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
        this._getCardLikesData = getCardLikesData;
        this._handleLikePut = handleLikePut;
        this._handleLikeDelete = handleLikeDelete;


        if (cardData.likes === undefined) {
            this._likesAmount = 0;
        } else {
            this._likesAmount = cardData.likes.length;
            let iLikedIt = false;
            cardData.likes.forEach((like) => {
                if (like._id === this._userId) {
                    iLikedIt = true;
                }
            });
            if (iLikedIt) {
                this._cardHeart.classList.toggle("card__heart_active");
            }
        }
    }



    async _addEventListeners() {

        // Like Unlike

        //console.log(this._cardId);
        //const cardLikesData = await this._getCardLikesData(this._cardId);
        /*
          if ((cardLikesData.likes !== undefined) && (cardLikesData.likes)) {} else {
              this._likesAmount = cardData.likes.length;
          }
          */
        //console.log(cardLikesData);

        this._cardHeart.addEventListener("click", async(event) => {
            if (!event.target.classList.contains("card__heart_active")) {
                const cardData = await this._handleLikePut(this._cardId);
                //if (likesAmount) {צריך למצוא דרך לבדוק כאן אולי בגוגל או בשיעורים קודמים
                event.target.classList.toggle("card__heart_active");
                console.log("Like added by you to card: ", this._cardId);
                this._likesAmount = cardData.likes.length;
                this._cardLikesAmount.textContent = this._likesAmount;
            } else {
                const cardData = await this._handleLikeDelete(this._cardId);
                //if (resOk)
                event.target.classList.toggle("card__heart_active");
                console.log("Like deleted by you from card: ", this._cardId);
                this._likesAmount = cardData.likes.length;
                this._cardLikesAmount.textContent = this._likesAmount;
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
