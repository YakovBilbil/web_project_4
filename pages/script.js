///////////////////////////////////////
//////////// Edit Profile Popup //////
/////////////////////////////////////

let allPopups = document.querySelectorAll(".popup");

let popupEditProfile = document.querySelector(".popup_edit-profile");

let popupInputName = document.querySelector(".popup__form-input_type_name");

let profileName = document.querySelector(".profile__value-type-name");

let popupInputProfession = document.querySelector(".popup__form-input_type_profession");

let profileProfession = document.querySelector(".profile__value-type-profession");

let editButton = document.querySelector(".profile__edit-button");

let allCloseButtons = document.querySelectorAll(".popup__form-close-button");

let popupFormSubmit = document.querySelector(".popup__form-submit");



function togglePopup(popupType) {
    popupType.classList.toggle("popup_opened");
    if (popupEditProfile.classList.contains("popup_opened")) {
        popupInputName.value = profileName.textContent;
        popupInputProfession.value = profileProfession.textContent;
    }
}


function save(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    togglePopup(popupEditProfile);
}



editButton.addEventListener("click", () => togglePopup(popupEditProfile));

allCloseButtons.forEach(btn => btn.addEventListener("click", () => {
    allPopups.forEach(popup => popup.classList.remove("popup_opened"));
}));

popupFormSubmit.addEventListener("submit", save);





///////////////////////////////////////
//////////// Add Card Popup /////////////
/////////////////////////////////////


let popupAddCard = document.querySelector(".popup_add-card");

let addButton = document.querySelector(".profile__add-button");

let addCardName = document.querySelector(".popup__form-input_type_title");

let addCardLink = document.querySelector(".popup__form-input_type_image-link");

let cardsList = document.querySelector(".cards__list");

let popupCardImage = document.querySelector(".popup_card-image");


addButton.addEventListener("click", () => togglePopup(popupAddCard));




function createCard(cardData) { // cardData = {name, link}


    const card = document.createElement("li");

    card.className += "card";

    cardsList.append(card);

    const deleteButton = document.createElement("button");

    deleteButton.className += "card__delete";

    card.append(deleteButton);

    const cardPicture = document.createElement("img");

    cardPicture.className += "card__picture";

    card.append(cardPicture);

    const cardNameHeart = document.createElement("div");

    cardNameHeart.className += "card__name-heart";

    card.append(cardNameHeart);

    const cardName = document.createElement("h2");

    cardName.className += "card__name";

    cardNameHeart.append(cardName);

    const cardHeart = document.createElement("button");

    cardHeart.className += "card__heart";

    cardNameHeart.append(cardHeart);


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
        popupCardImage.querySelector(".popup__image").style.backgroundImage = cardData.link;
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



/////////////////////////////
/////// Image Popup /////////
////////////////////////////

//const allCardPictures = querySelectorAll(".");




/*
allCardPictures.addEventListener("click", () => {
    popupCardImage.querySelector(".popup__image-title").textContent = cardData.name;
    popupCardImage.querySelector(".popup__image").style.backgroundImage = cardData.link;
    togglePopup(popupCardImage);
});
*/

/*
allCardPictures.forEach((el) => {
    el.addEventListener("click", () => {
        console.log("popup");
        popupCardImage.querySelector(".popup__image-title").textContent = cardData.name;
        popupCardImage.querySelector(".popup__image").style.backgroundImage = cardData.link;
        togglePopup(popupCardImage);
    });
});
*/

/*
allCardPictures.forEach(btn => btn.addEventListener("click", (event) => {
    event.querySelector(".popup__image-title").textContent = cardData.name;
    event.querySelector(".popup__image").style.backgroundImage = cardData.link;
    togglePopup(popupCardImage);
}));
*/


/*
      cardHeart.forEach((el) => {
          el.addEventListener("click", (event) => {
              event.target.classList.toggle("card__heart_active");
          });
      });

      */


/*
      cardPicture.addEventListener("click", () => {
          popupCardImage.querySelector(".popup__title").textContent = cardData.name;
          popupCardImage.querySelector(".popup__image").src = cardData.link;
          togglePopup(popupCardImage);
      });
   */
