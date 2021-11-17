import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup, escHandler, clickHandler, addButtonHandler } from "./utils.js";

///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////

const [
    popupEditProfile,
    popupInputName,
    profileName,
    popupInputProfession,
    profileProfession,
    editButton,
    popupFormSubmit
] = [
    document.querySelector(".popup_edit-profile"),
    document.querySelector(".popup__form-input_type_name"),
    document.querySelector(".profile__value-type-name"),
    document.querySelector(".popup__form-input_type_profession"),
    document.querySelector(".profile__value-type-profession"),
    document.querySelector(".profile__edit-button"),
    document.querySelector(".popup__form-submit")
];


function submitEditProfilePopup(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup(popupEditProfile);
}


editButton.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    const formValidator = new FormValidator(settingsConfig, popupEditProfile.querySelector(".popup__form-submit"));
    formValidator.checkInitialFormValidity();
    openPopup(popupEditProfile);
    document.addEventListener("keydown", escHandler);
});

clickHandler();

popupFormSubmit.addEventListener("submit", submitEditProfilePopup);


///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////

const [
    popupAddCard,
    addCardName,
    addCardLink,
    cardsList,
    cardTemplateSelector
] = [
    document.querySelector(".popup_add-card"),
    document.querySelector(".popup__form-input_type_title"),
    document.querySelector(".popup__form-input_type_image-link"),
    document.querySelector(".cards__list"),
    ".card-template"
];

const popupAddCardPopupFormSubmit = popupAddCard.querySelector(".popup__form-submit");


addButtonHandler();


function createNewCard(event) {
    event.preventDefault();
    const cardData = {
        name: addCardName.value,
        link: addCardLink.value
    };
    const newCard = new Card(cardData, cardTemplateSelector);
    cardsList.prepend(newCard.render());
    popupAddCardPopupFormSubmit.reset();
    const formValidator = new FormValidator(settingsConfig, popupAddCardPopupFormSubmit);
    formValidator.checkInitialFormValidity();
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
    const card = new Card(initialCardData, cardTemplateSelector);
    cardsList.prepend(card.render());
});


/////////////////////////////
//////// Validation ////////
///////////////////////////

const formSelector = ".popup__form-submit";

const settingsConfig = {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-save-button",
    inactiveButtonClass: "popup__form-save-button_inactive",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-input-error_active"
};

const formList = Array.from(document.querySelectorAll(formSelector));

formList.forEach((formElement) => {
    const formValidator = new FormValidator(settingsConfig, formElement);

    formValidator.enableValidation();
});
