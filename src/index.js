import "./index.css";

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
} from "../scripts/utils/constants.js";

import FormValidator from "../scripts/utils/FormValidator.js";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

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

const initialCardList = new Section({
    item: initialCards,
    renderer: (item) => {

        const newCard = new Card(item, cardTemplateSelector, imagePopup.open);
        const newCardElement = newCard.render();
        initialCardList.addItem(newCardElement);
    }
}, cardsList);

initialCardList.renderItems();


///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


const addCardFormValidator = new FormValidator(settingsConfig, popupAddCardPopupFormSubmit);
addCardFormValidator.enableValidation();

const addCardPopup = new PopupWithForm({
    popupSelector: popupAddCard,
    handleFormSubmit: (item) => {
        const card = new Card(item, cardTemplateSelector, imagePopup.open);
        const cardElement = card.render();
        cardsList.prepend(cardElement);
        addCardPopup.close();
    }
});

addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
    addCardPopup.open();
});
