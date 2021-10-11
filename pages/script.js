///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////

const allPopups = document.querySelectorAll(".popup");

const popupEditProfile = document.querySelector(".popup_edit-profile");

const popupInputName = document.querySelector(".popup__form-input_type_name");

const profileName = document.querySelector(".profile__value-type-name");

const popupInputProfession = document.querySelector(".popup__form-input_type_profession");

const profileProfession = document.querySelector(".profile__value-type-profession");

const editButton = document.querySelector(".profile__edit-button");

const allCloseButtons = document.querySelectorAll(".popup__form-close-button");

const popupFormSubmit = document.querySelector(".popup__form-submit");



function togglePopup(popupType) {
    popupType.classList.toggle("popup_opened");
}


function save(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    togglePopup(popupEditProfile);
}



editButton.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    togglePopup(popupEditProfile);
});


allCloseButtons.forEach(btn => btn.addEventListener("click", () => {
    allPopups.forEach(popup => {
        if (popup.classList.contains("popup_opened")) {
            togglePopup(popup);
        }
    });
}));


popupFormSubmit.addEventListener("submit", save);



///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


const popupAddCard = document.querySelector(".popup_add-card");

const addButton = document.querySelector(".profile__add-button");

const addCardName = document.querySelector(".popup__form-input_type_title");

const addCardLink = document.querySelector(".popup__form-input_type_image-link");

const cardsList = document.querySelector(".cards__list");

const popupCardImage = document.querySelector(".popup_card-image");

const cardTemplate = document.querySelector(".card-template").content;



addButton.addEventListener("click", () => togglePopup(popupAddCard));



function createCard(cardData) { // cardData = {name, link}

    const card = cardTemplate.querySelector(".card").cloneNode(true);

    const deleteButton = card.querySelector(".card__delete");

    const cardPicture = card.querySelector(".card__picture");

    const cardName = card.querySelector(".card__name");

    const cardHeart = card.querySelector(".card__heart");


    cardName.textContent = cardData.name;

    cardPicture.src = cardData.link;


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
        popupCardImage.querySelector(".popup__image-photo").src = cardData.link;
        togglePopup(popupCardImage);
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
    addCardName.value = "";
    addCardLink.value = "";
    togglePopup(popupAddCard);
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
    cardsList.prepend(createCard(initialCardData));

});
