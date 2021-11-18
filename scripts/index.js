import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup, clickHandler, addButtonHandler } from "./utils.js";

///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////


const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupInputName = document.querySelector(".popup__form-input_type_name");
const profileName = document.querySelector(".profile__value-type-name");
const popupInputProfession = document.querySelector(".popup__form-input_type_profession");
const profileProfession = document.querySelector(".profile__value-type-profession");
const editButton = document.querySelector(".profile__edit-button");
const popupFormSubmit = document.querySelector(".popup__form-submit");

const settingsConfig = {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-save-button",
    inactiveButtonClass: "popup__form-save-button_inactive",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-input-error_active"
};

const editProfileFormValidator = new FormValidator(settingsConfig, popupEditProfile.querySelector(".popup__form-submit"));

editProfileFormValidator.enableValidation();


function submitEditProfilePopup(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup(popupEditProfile);
}


editButton.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    editProfileFormValidator.checkInitialFormValidity();
    openPopup(popupEditProfile);
});


clickHandler();

popupFormSubmit.addEventListener("submit", submitEditProfilePopup);


///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


const popupAddCard = document.querySelector(".popup_add-card");
const addCardName = document.querySelector(".popup__form-input_type_title");
const addCardLink = document.querySelector(".popup__form-input_type_image-link");
const cardsList = document.querySelector(".cards__list");
const cardTemplateSelector = ".card-template";
const popupAddCardPopupFormSubmit = popupAddCard.querySelector(".popup__form-submit");

const addCardFormValidator = new FormValidator(settingsConfig, popupAddCardPopupFormSubmit);

addCardFormValidator.enableValidation();

addButtonHandler();


function createCardInstanceAndRender(cardData, cardTemplateSelector) {
    const newCard = new Card(cardData, cardTemplateSelector);
    cardsList.prepend(newCard.render());
}


function createNewCard(event) {
    event.preventDefault();
    const cardData = {
        name: addCardName.value,
        link: addCardLink.value
    };
    createCardInstanceAndRender(cardData, cardTemplateSelector);
    popupAddCardPopupFormSubmit.reset();
    addCardFormValidator.checkInitialFormValidity();
    closePopup(popupAddCard);
}


popupAddCard.addEventListener("submit", createNewCard);



//////////////////////////////////////////
//////////// six initial cards ///////////
//////////////////////////////////////////


const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


initialCards.forEach(initialCardData => {
    createCardInstanceAndRender(initialCardData, cardTemplateSelector);
});
