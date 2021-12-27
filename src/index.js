import "core-js/stable";
import "regenerator-runtime/runtime";
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

    popupVerifyCardDelete
    //initialCards,
} from "./utils/constants.js";

import Api from "./utils/api.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

import PopupWithBinClick from "./components/PopupWithBinClick.js";



///////////////////////
//////// API///////////
//////////////////////

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "eba68a1e-4841-45cc-961e-923f0a471f18"
        /*
        headers: {
            authorization: "eba68a1e-4841-45cc-961e-923f0a471f18",
            // "Content-Type": "application/json"
        }
        */
});



///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////

const editProfileFormValidator = new FormValidator(settingsConfig, popupEditProfile.querySelector(".popup__form-submit"));
editProfileFormValidator.enableValidation();

const profileInfo = new UserInfo({ profileName, profileProfession });

/*
api.getUserData() // get user info from server
    .then((userData) => {
        profileInfo.setUserInfo({ popupInputName: userData.name, popupInputProfession: userData.about });
    });

    */

const editProfilePopup = new PopupWithForm({
    popupSelector: popupEditProfile,
    handleFormSubmit: async(data) => {
        const profile = await api.editProfile(data.fullName, data.profession);
        if (profile) {
            profileInfo.setUserInfo({ popupInputName: data.fullName, popupInputProfession: data.profession });
        }
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


///////////////////////////////////////
//////////// Initial cards ///////////
//////////////////////////////////////

const imagePopup = new PopupWithImage(popupCardImage);
imagePopup.setEventListeners();


////////////////////////////////
//// Delete Card Popup //////////
///////////////////////////////

const deleteCardPopup = new PopupWithBinClick(popupVerifyCardDelete, {
    deleteCardHandle: async(cardId) => {
        await api.deleteCard(cardId);
    }
});
/*   api.deleteCard
handleFormSubmit: async(data) => {
const profile = await api.editProfile(data.fullName, data.profession);
if (profile) {
    profileInfo.setUserInfo({ popupInputName: data.fullName, popupInputProfession: data.profession });
}
editProfilePopup.close();
}
});
*/


// When we build the delete method we'll have to check first if the owner ID is my ID, so I can delete because I can delete only my cards. and only than the trash symbol will appear

deleteCardPopup.setEventListeners();





const renderAndAddNewCard = (newCard) => {
    const newCardElement = newCard.render();
    listOfCards.addItem(newCardElement);
};

const listOfCards = new Section({
    renderer: (item, userId) => {
        const newCard = new Card(item, cardTemplateSelector, imagePopup.open, deleteCardPopup.open, userId);
        renderAndAddNewCard(newCard);
    }
}, cardsList);

/*
api.
getInitialCards()
    .then((initialCards) => {
        listOfCards.renderItems(initialCards);
    });
    */




///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


const addCardFormValidator = new FormValidator(settingsConfig, popupAddCardPopupFormSubmit);
addCardFormValidator.enableValidation();

const addCardPopup = new PopupWithForm({
    popupSelector: popupAddCard,
    handleFormSubmit: async(data) => {
        const card = await api.addCard(data.name, data.link);
        if (card) {
            const actualCardsDataFromServer = await api.getInitialCards();
            const cardId = actualCardsDataFromServer[0]._id;
            const newCard = new Card(data, cardTemplateSelector, imagePopup.open, deleteCardPopup.open, userId, cardId);
            renderAndAddNewCard(newCard);
        }
        addCardPopup.close();
    }
});


addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
    addCardFormValidator.checkInitialFormValidity();
    addCardPopup.open();
});



async function init() {
    const [initialCards,
        userData,
    ] = await Promise.all([
        api.getInitialCards(),
        api.getUserData()
    ]);

    const userId = userData._id;
    listOfCards.renderItems(initialCards, userId);
    profileInfo.setUserInfo({ popupInputName: userData.name, popupInputProfession: userData.about });
    return userId;
}

const userId = init();





/* To Do:

   find why the userId is undefined by the Card class
   with the Id verify to remove trash
   then find out how to remove the specific card, maybe with its id it is wriiten in the site

const userId = userData._id;
זה צריך להיות מחוץ לפונקציה או שהפונקציה תחזיר אותו
const x = init();
ואז לשים אותו כאריומנט
   */
