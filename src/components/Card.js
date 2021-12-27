export default class Card {
    constructor(cardData, cardTemplateSelector, handleCardClick, handleCardDelete, userId, cardId) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._userId = userId;
        /*
קודם כל ברגע שהשגנו את הדאטא העדכנית מהשרת של כל הכרטיסים אז אולי כדאי למצוא דרך
טובה יותר למצוא את מספר הלייקים של הכרטיס החדש וגם את האיי די של האוונר שלו בלי כל האיפים

דבר שני ויותר חשוב זה למצוא את האיי די של הקארד החדש שנוצר. אולי למצוא את האיבר האחרון שנוצר
אולי הוא הראשון או האחרון צריך לראות מה קרוה כשיוצרים כרטיס חדש
איפה הוא ממוקם במערך

*/


        if (cardData._id === undefined) { //ךמצוא איבר אחרון או ראשון) {
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
    }

    _addEventListeners() {

        // Like Unlike
        this._cardHeart.addEventListener("click", (event) => {
            event.target.classList.toggle("card__heart_active");
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
