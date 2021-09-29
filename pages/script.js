let profileName = document.querySelector(".profile__value-type-name");

let profileProfession = document.querySelector(".profile__value-type-profession");

let editButton = document.querySelector(".profile__edit-button");

let addButton = document.querySelector(".profile__add-button");

let popup = document.querySelector(".popup");

let popupForm = document.querySelector(".popup__form");

let saveButton = popup.querySelector(".popup__form-save-button");

let closeButton = popup.querySelector(".popup__form-close-button");

let popupInputName = popup.querySelector(".popup__form-input_type_name");

let popupInputProfession = popup.querySelector(".popup__form-input_type_profession");

let popupFormSubmit = document.querySelector(".popup__form-submit");

let heart = document.querySelectorAll(".card__heart");





function openPopup() {
    popup.classList.add("popup_opened");
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function save(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup();
}






editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

popupFormSubmit.addEventListener("submit", save);
