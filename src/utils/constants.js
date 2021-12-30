// Popup Edit Profile Constants
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupInputName = document.querySelector(".popup__form-input_type_name");
const profileName = document.querySelector(".profile__value-type-name");
const popupInputProfession = document.querySelector(".popup__form-input_type_profession");
const profileProfession = document.querySelector(".profile__value-type-profession");
const editButton = document.querySelector(".profile__edit-button");


const settingsConfig = {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-save-button",
    inactiveButtonClass: "popup__form-save-button_inactive",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-input-error_active"
};

// Popup Add Card Constants
const popupAddCard = document.querySelector(".popup_add-card");
const cardsList = document.querySelector(".cards__list");
const cardTemplateSelector = ".card-template";
const popupAddCardPopupFormSubmit = popupAddCard.querySelector(".popup__form-submit");
const addButton = document.querySelector(".profile__add-button");
const popupCardImage = document.querySelector(".popup_card-image");

const popupVerifyCardDelete = document.querySelector(".popup_verify-card-delete");

// Edit Avatar Constants
const profileEditAvatarButton = document.querySelector(".profile__edit-avatar-button");
const profileEditAvatarButtonPencil = document.querySelector(".profile__edit-avatar-button-pencil");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");



export {
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
};