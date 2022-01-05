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

    popupVerifyCardDelete,

    // Edit Avatar Constants
    profileEditAvatarButton,
    profileEditAvatarButtonPencil,
    popupEditAvatar
} from "./utils/constants.js";

import Api from "./components/Api.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

import PopupWithIconClick from "./components/PopupWithIconClick.js";



////////////////////////////////////////////
///////////////// edit avatar //////////////
///////////////////////////////////////////

profileEditAvatarButton.addEventListener("mouseover", () => {
    profileEditAvatarButtonPencil.classList.remove("not-visible");
});

profileEditAvatarButton.addEventListener("mouseout", () => {
    profileEditAvatarButtonPencil.classList.add("not-visible");
});


const editAvatarFormValidator = new FormValidator(settingsConfig, popupEditAvatar.querySelector(".popup__form-submit"));
editAvatarFormValidator.enableValidation();


const editAvatarPopup = new PopupWithForm({
    popupSelector: popupEditAvatar,
    handleFormSubmit: async(data) => {
        try {
            const updatedUserData = await api.changeProfilePicture(data.link);
            profileInfo.setUserAvatar({ popupInputAvatarLink: updatedUserData.avatar });
            editAvatarPopup.close();
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }
});

editAvatarPopup.setEventListeners();


profileEditAvatarButtonPencil.addEventListener("click", () => {
    editAvatarPopup.open();
});


///////////////////////
//////// API///////////
//////////////////////

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "eba68a1e-4841-45cc-961e-923f0a471f18"
});



///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////

const editProfileFormValidator = new FormValidator(settingsConfig, popupEditProfile.querySelector(".popup__form-submit"));
editProfileFormValidator.enableValidation();

const profileInfo = new UserInfo({ profileName, profileProfession });

const editProfilePopup = new PopupWithForm({
    popupSelector: popupEditProfile,
    handleFormSubmit: async(data) => {
        try {
            await api.editProfile(data.fullName, data.profession);
            profileInfo.setUserInfo({ popupInputName: data.fullName, popupInputProfession: data.profession });
            editProfilePopup.close();
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
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


const deleteCardPopup = new PopupWithIconClick(popupVerifyCardDelete, {
    handler: async({ cardId, cardOnDome }) => {
        try {
            await api.deleteCard(cardId);
            cardOnDome.remove();
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }
});


deleteCardPopup.setEventListeners();


const createCard = ({ cardData, userId }) => {
    const newCard = new Card({
        cardData,
        cardTemplateSelector,
        handleCardClick: imagePopup.open,
        handleCardDelete: deleteCardPopup.open,
        userId,
        getCardLikesData: async(cardId) => {
            try {
                const cardData = await api.getCardLikesData(cardId);
                return cardData;
            } catch (error) {
                console.log("CAUGHT ERROR", error);
            }
        },
        handleLikePut: async(cardId) => {
            try {
                const cardData = await api.handleLikePut(cardId);
                return cardData;
            } catch (error) {
                console.log("CAUGHT ERROR", error);
            }
        },
        handleLikeDelete: async(cardId) => {
            try {
                const cardData = await api.handleLikeDelete(cardId);
                return cardData;
            } catch (error) {
                console.log("CAUGHT ERROR", error);
            }
        }
    });

    const newCardElement = newCard.render();
    listOfCards.addItem(newCardElement);
};


const listOfCards =
    new Section({
        renderer: (item, userId) => {
            createCard({ cardData: item, userId });
        },
    }, cardsList);



///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


const addCardFormValidator = new FormValidator(settingsConfig, popupAddCardPopupFormSubmit);
addCardFormValidator.enableValidation();

const addCardPopup = new PopupWithForm({
    popupSelector: popupAddCard,
    handleFormSubmit: async(data) => {
        try {
            const newCardData = await api.addCard(data.name, data.link);
            createCard({ cardData: newCardData, userId: newCardData.owner._id });
            addCardPopup.close();
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }
});


addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
    addCardFormValidator.checkInitialFormValidity();
    addCardPopup.open();
});



async function init() {
    try {
        const [initialCards,
            userData,
        ] = await Promise.all([
            api.getInitialCards(),
            api.getUserData()
        ]);

        const userId = userData._id;
        listOfCards.renderItems(initialCards, userId);
        profileInfo.setUserInfo({ popupInputName: userData.name, popupInputProfession: userData.about });
        profileInfo.setUserAvatar({ popupInputAvatarLink: userData.avatar });
        return userId;
    } catch (error) {
        console.log("CAUGHT ERROR", error);
    }
}

const userId = init();