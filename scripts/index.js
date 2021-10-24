///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////

const [
    allPopups,
    popupEditProfile,
    popupInputName,
    profileName,
    popupInputProfession,
    profileProfession,
    editButton,
    allCloseButtons,
    popupFormSubmit
] = [
    document.querySelectorAll(".popup"),
    document.querySelector(".popup_edit-profile"),
    document.querySelector(".popup__form-input_type_name"),
    document.querySelector(".profile__value-type-name"),
    document.querySelector(".popup__form-input_type_profession"),
    document.querySelector(".profile__value-type-profession"),
    document.querySelector(".profile__edit-button"),
    document.querySelectorAll(".popup__form-close-button"),
    document.querySelector(".popup__form-submit")
];



function openPopup(popupType) {
    popupType.classList.add("popup_opened");
}

function closePopup(popupType) {
    popupType.classList.remove("popup_opened");
}


function submitEditProfilePopup(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup(popupEditProfile);
}



editButton.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    checkInitialFormValidity(popupEditProfile.querySelector(".popup__form-submit"), settingsConfig);
    openPopup(popupEditProfile);
    document.addEventListener("keydown", escHandler);
});



allPopups.forEach(popup => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-icon")) {
            closePopup(popup);
        }
    });
});



popupFormSubmit.addEventListener("submit", submitEditProfilePopup);



///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////

const [
    popupAddCard,
    addButton,
    addCardName,
    addCardLink,
    cardsList,
    popupCardImage,
    popupImagePhoto,
    cardTemplate
] = [
    document.querySelector(".popup_add-card"),
    document.querySelector(".profile__add-button"),
    document.querySelector(".popup__form-input_type_title"),
    document.querySelector(".popup__form-input_type_image-link"),
    document.querySelector(".cards__list"),
    document.querySelector(".popup_card-image"),
    document.querySelector(".popup__image-photo"),
    document.querySelector(".card-template").content
];

const popupAddCardPopupFormSubmit = popupAddCard.querySelector(".popup__form-submit");


addButton.addEventListener("click", () => {
    openPopup(popupAddCard);
    document.addEventListener("keydown", escHandler);
});


function createCard(cardData) { // cardData = {name, link}

    const card = cardTemplate.querySelector(".card").cloneNode(true);

    const [
        deleteButton,
        cardPicture,
        cardName,
        cardHeart
    ] = [
        card.querySelector(".card__delete"),
        card.querySelector(".card__picture"),
        card.querySelector(".card__name"),
        card.querySelector(".card__heart")
    ];

    cardName.textContent = cardData.name;

    cardPicture.src = cardData.link;

    cardPicture.alt = `A picture of ${cardData.name}`;



    ///////////////////////////////
    /////////Like Unlike ////////
    /////////////////////////////

    cardHeart.addEventListener("click", (event) => {
        event.target.classList.toggle("card__heart_active");
    });


    /////////////////////////////
    /////// Delete Card /////////
    ////////////////////////////

    deleteButton.addEventListener("click", () => {
        const listItem = deleteButton.closest(".card");
        listItem.remove();
    });


    /////////////////////////////
    /////// Image Popup /////////
    ////////////////////////////

    cardPicture.addEventListener("click", () => {
        popupCardImage.querySelector(".popup__image-title").textContent = cardData.name;
        popupImagePhoto.src = cardData.link;
        popupImagePhoto.alt = `A picture of ${cardData.name}`;
        openPopup(popupCardImage);
        document.addEventListener("keydown", escHandler);
    });




    return card;
}



//////////////////////////////
////// Add a new Card/////////
/////////////////////////////

function createNewCard(event) {
    event.preventDefault();
    const newCard = {
        name: addCardName.value,
        link: addCardLink.value
    };
    cardsList.prepend(createCard(newCard));
    popupAddCardPopupFormSubmit.reset();
    checkInitialFormValidity(popupAddCardPopupFormSubmit, settingsConfig);
    closePopup(popupAddCard);
}


popupAddCard.addEventListener("submit", createNewCard);



//////////////////////////////////////////
//////////// six initial cards ///////////
//////////////////////////////////////////


initialCards.forEach(initialCardData => {
    cardsList.prepend(createCard(initialCardData));

});


//////////////////////////////////////
/////////////// Esc Key Handler///////////
//////////////////////////////////////


function escHandler(event) {
    allPopups.forEach((popup) => {
        if ((event.key === "Escape") && (popup.classList.contains("popup_opened"))) {
            closePopup(popup);
            document.removeEventListener("keydown", escHandler);
        }
    });
}
