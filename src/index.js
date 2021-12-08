import "../pages/index.css";

import {
    // Popup Edit Profile Constants
    popupEditProfile,
    popupInputName,
    profileName,
    popupInputProfession,
    profileProfession,
    editButton,
    settingsConfig,

    // Popup Add Card Constants
    popupAddCard,
    cardsList,
    cardTemplateSelector,
    popupAddCardPopupFormSubmit,
    addButton,
    popupCardImage,

    initialCards
} from "./utils/constants.js";

import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////


const editProfileFormValidator = new FormValidator(settingsConfig, popupEditProfile.querySelector(".popup__form-submit"));
editProfileFormValidator.enableValidation();

const profileInfo = new UserInfo({ profileName, profileProfession });

const editProfilePopup = new PopupWithForm({
    popupSelector: popupEditProfile,
    handleFormSubmit: (item) => {
        profileInfo.setUserInfo({ popupInputName: item.fullName, popupInputProfession: item.profession });
        editProfilePopup.close();
    }
});

editProfilePopup.setEventListeners();


editButton.addEventListener("click", () => {
    const userInfoToDisplayInForm = profileInfo.getUserInfo();
    popupInputName.value = userInfoToDisplayInForm.name;
    popupInputProfession.value = userInfoToDisplayInForm.profession;
    editProfileFormValidator.checkInitialFormValidity();
    editProfilePopup.open();

});


//////////////////////////////////////////
//////////// six initial cards ///////////
//////////////////////////////////////////

const imagePopup = new PopupWithImage(popupCardImage);
imagePopup.setEventListeners();

const renderAndAddNewCard = (newCard) => {
    const newCardElement = newCard.render();
    listOfCards.addItem(newCardElement);
};

const listOfCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item, cardTemplateSelector, imagePopup.open);
        renderAndAddNewCard(newCard);
    }
}, cardsList);

listOfCards.renderItems();


///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


const addCardFormValidator = new FormValidator(settingsConfig, popupAddCardPopupFormSubmit);
addCardFormValidator.enableValidation();

const addCardPopup = new PopupWithForm({
    popupSelector: popupAddCard,
    handleFormSubmit: (item) => {
        const card = new Card(item, cardTemplateSelector, imagePopup.open);
        renderAndAddNewCard(card);
        addCardPopup.close();
    }
});

addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
    addCardFormValidator.checkInitialFormValidity();
    addCardPopup.open();
});
